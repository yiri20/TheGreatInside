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
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/checkScoringLockIntegrity.ts
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

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
}

main();
