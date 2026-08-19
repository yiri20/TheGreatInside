/**
 * One-time generator: converts the roster-1000 session-11 fresh candidate
 * batch into `src/data/people/roster8.ts`.
 *
 * REVISED after a session-11 scoring-integrity re-audit (docs/roster-1000-
 * checkpoint.md SS76): the original 20-candidate batch's confidence-tier
 * reclassification was found to be threshold-driven for a real subset of
 * rows. A blind re-review (row content judged against scoring-rubric-v1
 * SS2/SS3 without reference to eligibility outcome) reverted the
 * threshold-driven rows, and re-running eligibility_v2 against the locked,
 * repaired scoring left only 3 of the original 20 candidates eligible:
 * benito-juarez, joan-of-arc, julius-caesar. The other 17 candidates'
 * JSON files remain in `data-pipeline/candidates/` with `status: "held"`
 * and an honest `holdReason` -- their evidence and scores were NOT deleted,
 * only correctly reclassified as not currently clearing eligibility_v2.
 *
 * Follows `roster7.ts`'s exact pattern -- an explicit slug allowlist, NOT a
 * blanket "every qa_passed candidate" filter, which would silently
 * duplicate already-promoted people from earlier batches. Never run
 * automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster8.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster8.ts");

const BATCH_8_SLUGS = new Set([
  "benito-juarez",
  "joan-of-arc",
  "julius-caesar",
]);

function loadBatch8(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_8_SLUGS.has(c.slug))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

function tsString(s: string): string {
  return JSON.stringify(s);
}

function tsStringArray(arr: readonly string[]): string {
  return `[${arr.map(tsString).join(", ")}]`;
}

function renderSource(id: string, kind: string, title: string, url?: string): string {
  const fields = [`id: ${tsString(id)}`, `kind: ${tsString(kind)}`, `title: ${tsString(title)}`];
  if (url) fields.push(`url: ${tsString(url)}`);
  return `{ ${fields.join(", ")} }`;
}

function renderPerson(candidate: Candidate): string {
  const seed = toPersonSeed(candidate);
  const rows = Object.entries(candidate.rows) as Array<[AttributeId, CandidateAttributeRow]>;
  const rowLines = rows
    .map(([attributeId, row]) => {
      const evCode = { documented: "d", strong_inference: "s", inference: "i" }[row.evidenceType];
      const imCode = { advantage: "A", dual_edged: "D", risk: "R", neutral: "N" }[row.impact];
      return `      // ${row.rationale}\n      ${attributeId}: [${row.score}, ${row.confidence}, "${evCode}", "${imCode}"],`;
    })
    .join("\n");

  return `  {
    id: ${tsString(seed.id)},
    slug: ${tsString(seed.slug)},
    canonicalName: ${tsString(seed.canonicalName)},
    ${seed.aliases ? `aliases: ${tsStringArray(seed.aliases)},\n    ` : ""}birthYear: ${seed.birthYear},
    ${seed.deathYear !== undefined ? `deathYear: ${seed.deathYear},\n    ` : ""}isLiving: ${seed.isLiving},
    era: ${tsString(seed.era)},
    nationalityCodes: ${tsStringArray(seed.nationalityCodes)},
    regionCode: ${tsString(seed.regionCode)},
    ${seed.historicalPolityKey ? `historicalPolityKey: ${tsString(seed.historicalPolityKey)},\n    ` : ""}occupationIds: ${tsStringArray(seed.occupationIds)},
    fieldIds: ${tsStringArray(seed.fieldIds)},
    impactDomains: ${tsStringArray(seed.impactDomains)},
    tagIds: ${tsStringArray(seed.tagIds)},
    archetypeIds: ${tsStringArray(seed.archetypeIds)},
    externalIdentity: { wikidataId: ${tsString(candidate.identity.wikidataId ?? "")} },
    sources: [${seed.sources.map((s) => renderSource(s.id, s.kind, s.title, s.url)).join(", ")}],
    rows: {
${rowLines}
    },
  }`;
}

function main() {
  const candidates = loadBatch8();
  if (candidates.length !== BATCH_8_SLUGS.size) {
    console.error(
      `Expected ${BATCH_8_SLUGS.size} qa_passed batch-8 candidates, found ${candidates.length}. Aborting.`,
    );
    process.exitCode = 1;
    return;
  }

  const source = `/**
 * ROSTER 8 — roster-1000 session 11 (${candidates.length} people, revised after
 * the session-11 scoring-integrity re-audit).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed) via
 * \`src/dev/roster1000/generateRoster8.ts\`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use.
 *
 * Session 11 originally researched 20 candidates and, after a confidence-
 * band reclassification pass, all 20 initially cleared \`eligibility_v2\`.
 * A subsequent audit (docs/roster-1000-checkpoint.md §75) found that
 * reclassification pass was threshold-driven for a real subset of rows —
 * some rows were reclassified primarily because the numeric eligibility
 * bar required it, not because the rubric independently supported the
 * higher confidence tier. A blind re-review (§76) re-judged every
 * touched row against \`scoring-rubric-v1.md\` §2/§3 without reference to
 * eligibility outcome, reverted the threshold-driven rows, and only THEN
 * re-ran \`eligibility_v2\` against the locked result. **Only 3 of the
 * original 20 candidates remained eligible: benito-juarez, joan-of-arc,
 * julius-caesar.** The other 17 are preserved, unscored-value-unchanged,
 * as \`held\` candidates in \`data-pipeline/candidates/\` with an honest
 * \`holdReason\` — nothing about their underlying evidence was deleted,
 * only the confidence-tier assignment that had been inflated to cross
 * the threshold.
 *
 * Korean display names for these people were added to \`person.name.*\` in
 * \`src/core/i18n/ko.ts\` in session 11, before the re-audit; they remain
 * valid for the 3 who stayed eligible.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_8: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
