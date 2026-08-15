/**
 * Roster-1000 candidate validator/reporter.
 *
 * Reads every `data-pipeline/candidates/*.json` file, validates structure
 * (including live checks against the real region/tag i18n vocabularies —
 * never a hardcoded duplicate list, so this can never silently drift out of
 * sync with `src/core/i18n`), converts each candidate through the exact same
 * `build()`/`evaluateMatchEligibility` pipeline a real committed person goes
 * through, and runs the same `runRosterQualityGates` gates the real roster
 * is held to. Prints a per-candidate and aggregate report. Never writes
 * anything — promotion into a real roster file is a separate, explicit step
 * (see `docs/roster-1000-checkpoint.md` §4).
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ATTRIBUTE_IDS, type AttributeId } from "../../core/attributes/attributes.js";
import { en } from "../../core/i18n/en.js";
import { ko } from "../../core/i18n/ko.js";
import { evaluateMatchEligibility } from "../../core/matching/similarity.js";
import { build } from "../../data/people/builder.js";
import { runRosterQualityGates } from "../../core/people/rosterQuality.js";
import { CANDIDATE_SCHEMA_VERSION, toPersonSeed, type Candidate } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");

function knownIds(prefix: string): Set<string> {
  const out = new Set<string>();
  for (const key of Object.keys(en)) {
    if (key.startsWith(prefix)) out.add(key.slice(prefix.length));
  }
  return out;
}

const KNOWN_REGIONS = knownIds("region.");
const KNOWN_TAGS = knownIds("tag.");

function loadCandidates(): Candidate[] {
  let files: string[];
  try {
    files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  return files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
}

interface ValidationIssue {
  slug: string;
  severity: "error" | "warning";
  message: string;
}

function validateOne(c: Candidate): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const err = (message: string) => issues.push({ slug: c.slug, severity: "error", message });
  const warn = (message: string) => issues.push({ slug: c.slug, severity: "warning", message });

  if (c.schemaVersion !== CANDIDATE_SCHEMA_VERSION) {
    err(`schemaVersion "${c.schemaVersion}" does not match ${CANDIDATE_SCHEMA_VERSION}`);
  }
  if (!c.identity?.canonicalName) err("missing identity.canonicalName");
  if (!c.identity?.regionCode) {
    err("missing identity.regionCode");
  } else if (!KNOWN_REGIONS.has(c.identity.regionCode)) {
    err(`regionCode "${c.identity.regionCode}" is not in the controlled 11-region vocabulary (region.* in en.ts)`);
  }
  for (const tag of c.classification?.tagIds ?? []) {
    if (!KNOWN_TAGS.has(tag)) {
      err(`tagIds contains "${tag}", not in the existing tag vocabulary (tag.* in en.ts) — add it as a newTagProposal instead of using it directly`);
    }
  }
  for (const tag of c.classification?.newTagProposals ?? []) {
    warn(`newTagProposal "${tag}" needs EN+KO text authored in i18n before this candidate can be committed`);
  }
  const rowIds = Object.keys(c.rows ?? {}) as AttributeId[];
  for (const id of rowIds) {
    if (!ATTRIBUTE_IDS.includes(id)) err(`rows contains unknown attributeId "${id}"`);
  }
  for (const [id, row] of Object.entries(c.rows ?? {})) {
    if (!row.rationale || row.rationale.trim().length < 10) {
      warn(`rows.${id} has no meaningful rationale (evidence audit trail is required, not just a number)`);
    }
  }
  if (c.status === "held" && !c.holdReason) err('status is "held" but holdReason is missing');
  if (c.status === "rejected" && !c.rejectReason) err('status is "rejected" but rejectReason is missing');
  if (c.portrait && (c.portrait.status === "held" || c.portrait.status === "rejected") && !c.portrait.reason) {
    err(`portrait.status is "${c.portrait.status}" but portrait.reason is missing`);
  }
  if (c.portrait?.status === "found" && !c.portrait.sourcePageUrl) {
    warn("portrait.status is \"found\" but no sourcePageUrl recorded for future re-verification");
  }

  return issues;
}

function main() {
  const candidates = loadCandidates();
  if (candidates.length === 0) {
    console.log(`No candidates found in ${CANDIDATES_DIR} (this is expected before the first batch).`);
    return;
  }

  console.log(`Loaded ${candidates.length} candidate(s) from ${CANDIDATES_DIR}\n`);

  const byStatus: Record<string, number> = {};
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const c of candidates) {
    byStatus[c.status] = (byStatus[c.status] ?? 0) + 1;
    const issues = validateOne(c);
    const errors = issues.filter((i) => i.severity === "error");
    const warnings = issues.filter((i) => i.severity === "warning");
    totalErrors += errors.length;
    totalWarnings += warnings.length;

    console.log(`— ${c.slug} [${c.status}]`);
    for (const i of errors) console.log(`    ERROR: ${i.message}`);
    for (const i of warnings) console.log(`    warn:  ${i.message}`);

    if (errors.length === 0 && rowIsScoreable(c)) {
      const person = build(toPersonSeed(c));
      const eligibility = evaluateMatchEligibility(person);
      const gates = runRosterQualityGates([person]);
      console.log(
        `    eligibility: scored=${Object.keys(c.rows).length} avgConf=${eligibility.averageConfidence.toFixed(3)} coverage=${eligibility.coverage.toFixed(3)} eligible=${eligibility.eligible}`,
      );
      const gateFailureCount =
        gates.duplicates.duplicateIds.length +
        gates.duplicates.duplicateSlugs.length +
        gates.duplicates.duplicateWikidataIds.length +
        gates.chronologyErrors.length +
        gates.traitErrors.length +
        gates.contentQualityFailures.length;
      if (gateFailureCount > 0) {
        console.log(`    QUALITY GATE FAILURES: ${JSON.stringify(gates)}`);
      }
    }
  }

  console.log("\n--- Summary ---");
  console.log("By status:", byStatus);
  console.log(`Total errors: ${totalErrors}, total warnings: ${totalWarnings}`);
  if (totalErrors > 0) {
    process.exitCode = 1;
  }
}

function rowIsScoreable(c: Candidate): boolean {
  return c.identity?.canonicalName !== undefined && Object.keys(c.rows ?? {}).length > 0;
}

main();
