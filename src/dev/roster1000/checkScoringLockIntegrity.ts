/**
 * Roster-1000 scoring-lock integrity guard.
 *
 * The smallest useful deterministic safeguard against a real, confirmed
 * failure mode: session 11 iteratively nudged confidence/evidenceType
 * values after seeing eligibility_v2 fail, until candidates crossed the
 * threshold (see docs/roster-1000-checkpoint.md §75-77 and
 * docs/scoring-rubric-v1.md §10's A/B/C/D confidence-change policy).
 * This is not a large workflow platform -- it is one comparison: for
 * every candidate file that already has a committed (HEAD) version, diff
 * its `rows` against the working-tree version. Any row whose `confidence`
 * or `evidenceType` changed, but whose file's `provenance.notes` does not
 * mention one of the three allowed change reasons (NEW_EVIDENCE,
 * RUBRIC_CORRECTION, ERROR_CORRECTION), is flagged.
 *
 * This is a WARNING tool, not a CI gate -- per the project's own
 * instruction to prefer an audit trail over a brittle hard failure. It
 * never blocks a commit by itself; a human (or a future automated gate
 * built on top of this) decides what to do with the flags. Score set
 * changes (adding/removing an attribute entirely) are not flagged -- that
 * is normal, expected scoring-in-progress behavior, never itself evidence
 * of eligibility gaming. Only a same-attribute confidence/evidenceType
 * DRIFT on an already-committed row is suspicious.
 *
 * LEGACY EXTENSION (2026-09, docs/checkpoints/match-pool-integrity-post-
 * roster32.md): 35 production people (the original roster1/roster2
 * hand-authored cohort) predate the candidate-JSON pipeline and have no
 * `data-pipeline/candidates/*.json` file, so the JSON-diff check above
 * cannot see them at all -- a real, confirmed blind spot, not a
 * hypothetical one. `checkLegacyScoringLock()` below closes it with the
 * same discipline applied to a different data shape: it diffs each such
 * person's CURRENT built `Person.attributes` against a committed
 * fingerprint baseline (`audits/legacyScoringLock.generated.ts`,
 * regenerated via `audits/generateLegacyScoringLock.ts`) and flags any
 * score/confidence/evidenceType/impact drift or added/removed row. This
 * baseline is a drift guard, not a claim that row-level rationale exists
 * for these people (mostly it doesn't -- see the checkpoint doc); a
 * legitimate future correction to one of them must regenerate and commit
 * the baseline in the same PR, exactly like updating `provenance.notes`
 * for a JSON-backed candidate.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/checkScoringLockIntegrity.ts
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import type { Person } from "../../core/types.js";
import { LEGACY_SCORING_BASELINE, type LegacyRowFingerprint } from "./audits/legacyScoringLock.generated.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const ALLOWED_REASONS = ["NEW_EVIDENCE", "RUBRIC_CORRECTION", "ERROR_CORRECTION"];

interface Row {
  score: number;
  confidence: number;
  evidenceType: string;
}

function committedVersion(relPath: string): string | undefined {
  try {
    return execFileSync("git", ["show", `HEAD:${relPath}`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return undefined; // new/untracked file -- nothing to diff against
  }
}

export interface LegacyLockViolation {
  slug: string;
  kind: "missing_from_production" | "row_added" | "row_removed" | "row_drifted";
  detail: string;
}

/** Read-only: compares a committed legacy baseline against a CURRENT set
 *  of built people and returns every drift. Never mutates either input.
 *  Defaults to the real baseline/`SEED_PEOPLE`; parameters exist so tests
 *  can inject a synthetic baseline/person list without touching either. */
export function checkLegacyScoringLock(
  baseline: Readonly<Record<string, readonly LegacyRowFingerprint[]>> = LEGACY_SCORING_BASELINE,
  people: readonly Person[] = SEED_PEOPLE,
): LegacyLockViolation[] {
  const violations: LegacyLockViolation[] = [];

  for (const [slug, baselineRows] of Object.entries(baseline)) {
    const person = people.find((p) => p.slug === slug);
    if (!person) {
      violations.push({ slug, kind: "missing_from_production", detail: "baseline slug no longer exists in SEED_PEOPLE" });
      continue;
    }

    const baselineByAttr = new Map(baselineRows.map((r) => [r.attributeId, r]));
    const currentByAttr = new Map(person.attributes.map((a) => [a.attributeId, a]));

    for (const [attributeId, baseline] of baselineByAttr) {
      const current = currentByAttr.get(attributeId);
      if (!current) {
        violations.push({ slug, kind: "row_removed", detail: `${attributeId} present in baseline, absent from production` });
        continue;
      }
      const drifted: string[] = [];
      if (current.score !== baseline.score) drifted.push(`score ${baseline.score}->${current.score}`);
      if (current.confidence !== baseline.confidence) drifted.push(`confidence ${baseline.confidence}->${current.confidence}`);
      if (current.evidenceType !== baseline.evidenceType) drifted.push(`evidenceType ${baseline.evidenceType}->${current.evidenceType}`);
      if (current.impact !== baseline.impact) drifted.push(`impact ${baseline.impact}->${current.impact}`);
      if (drifted.length > 0) {
        violations.push({ slug, kind: "row_drifted", detail: `${attributeId}: ${drifted.join(", ")}` });
      }
    }

    for (const attributeId of currentByAttr.keys()) {
      if (!baselineByAttr.has(attributeId)) {
        violations.push({ slug, kind: "row_added", detail: `${attributeId} present in production, absent from baseline` });
      }
    }
  }

  return violations;
}

function reportLegacyLock(): number {
  const violations = checkLegacyScoringLock();
  const coveredCount = Object.keys(LEGACY_SCORING_BASELINE).length;
  if (violations.length === 0) {
    console.log(`\nLegacy scoring lock: ${coveredCount} pre-pipeline production people covered, 0 flagged.`);
    return 0;
  }
  console.log(`\nLegacy scoring lock: ${coveredCount} pre-pipeline production people covered, ${violations.length} flagged:`);
  for (const v of violations) console.log(`  FLAGGED [${v.kind}] ${v.slug}: ${v.detail}`);
  console.log(
    "  If this drift is an intentional, documented correction, regenerate and commit legacyScoringLock.generated.ts in the same PR.",
  );
  return violations.length;
}

function main() {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  let flaggedCount = 0;
  let checkedCount = 0;

  for (const f of files) {
    const relPath = `data-pipeline/candidates/${f}`;
    const committedRaw = committedVersion(relPath);
    if (!committedRaw) continue; // brand-new file, nothing to compare

    checkedCount++;
    const before = JSON.parse(committedRaw);
    const after = JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8"));
    const beforeRows: Record<string, Row> = before.rows ?? {};
    const afterRows: Record<string, Row> = after.rows ?? {};
    const notes: string = after.provenance?.notes ?? "";
    const hasAllowedReason = ALLOWED_REASONS.some((r) => notes.includes(r));

    const drifted: string[] = [];
    for (const [attr, afterRow] of Object.entries(afterRows)) {
      const beforeRow = beforeRows[attr];
      if (!beforeRow) continue; // newly added row -- not a drift
      if (beforeRow.confidence !== afterRow.confidence || beforeRow.evidenceType !== afterRow.evidenceType) {
        drifted.push(
          `${attr}: confidence ${beforeRow.confidence}->${afterRow.confidence}, evidenceType ${beforeRow.evidenceType}->${afterRow.evidenceType}`,
        );
      }
    }

    if (drifted.length > 0 && !hasAllowedReason) {
      flaggedCount++;
      console.log(`FLAGGED: ${after.slug} -- ${drifted.length} row(s) changed confidence/evidenceType with no NEW_EVIDENCE/RUBRIC_CORRECTION/ERROR_CORRECTION note in provenance.notes:`);
      for (const d of drifted) console.log(`    ${d}`);
    }
  }

  console.log(`\nChecked ${checkedCount} previously-committed candidate file(s) against HEAD. ${flaggedCount} flagged.`);
  console.log("This is a warning tool, not a hard gate -- review flags by hand, per the A/B/C/D policy.");

  const legacyFlagged = reportLegacyLock();
  if (legacyFlagged > 0) flaggedCount += legacyFlagged;
}

const isDirectRun = (() => {
  try {
    return process.argv[1] !== undefined && fileURLToPath(import.meta.url) === process.argv[1];
  } catch {
    return false;
  }
})();

if (isDirectRun) {
  main();
}
