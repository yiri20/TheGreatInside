/**
 * Live identity preflight for roster-1000 candidates.
 *
 * For each candidate (or a specific slug passed on argv), fetches the
 * live Wikidata entity the file's `wikidataId` claims, and checks the
 * candidate's `canonicalName` plausibly matches that entity's label/
 * aliases -- NOT just that no other candidate happens to claim the same
 * QID (a duplicate-QID check alone would have missed most of session
 * 12's 14 wrong QIDs, since they were mostly wrong in DIFFERENT,
 * unrelated ways, not duplicates of each other).
 *
 * This is a live-network tool, deliberately kept OUT of `vitest run` (see
 * identityVerification.test.ts for the deterministic, fixture-based unit
 * tests of the matching logic itself) so the production test suite never
 * depends on internet access or Wikidata's uptime.
 *
 * Usage:
 *   corepack pnpm@10 exec tsx src/dev/roster1000/identityPreflight.ts            # all candidates
 *   corepack pnpm@10 exec tsx src/dev/roster1000/identityPreflight.ts <slug>...  # specific slugs
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { checkIdentity, fetchWikidataEntity } from "./identityVerification.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");

interface Candidate {
  slug: string;
  identity: { canonicalName: string; wikidataId?: string };
}

function loadCandidates(slugs: string[]): Candidate[] {
  const files =
    slugs.length > 0
      ? slugs.map((s) => `${s}.json`)
      : readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  return files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
}

async function main() {
  const argSlugs = process.argv.slice(2);
  const candidates = loadCandidates(argSlugs);

  // duplicate-QID / duplicate-slug check, retained as a cheap first pass
  const qidMap = new Map<string, string>();
  const dupes: string[] = [];
  for (const c of candidates) {
    if (!c.identity.wikidataId) continue;
    const prior = qidMap.get(c.identity.wikidataId);
    if (prior) dupes.push(`${prior} and ${c.slug} both claim ${c.identity.wikidataId}`);
    else qidMap.set(c.identity.wikidataId, c.slug);
  }

  let mismatchCount = 0;
  let fetchFailCount = 0;
  let matchCount = 0;

  for (const c of candidates) {
    if (!c.identity.wikidataId) {
      console.log(`— ${c.slug}: NO wikidataId set, skipping live check`);
      continue;
    }
    // small delay between requests -- Wikidata throttles rapid sequential
    // fetches, confirmed by a run over the full corpus producing spurious
    // "fetch failed" results without it
    await new Promise((r) => setTimeout(r, 150));
    const entity = await fetchWikidataEntity(c.identity.wikidataId);
    const result = checkIdentity(c.slug, c.identity.canonicalName, c.identity.wikidataId, entity);
    if (result.verdict === "match") {
      matchCount++;
      console.log(`✓ ${c.slug.padEnd(22)} ${c.identity.wikidataId} -> "${result.entityLabel}" (${result.entityDescription ?? "no description"})`);
    } else if (result.verdict === "mismatch") {
      mismatchCount++;
      console.log(`✗ MISMATCH ${c.slug.padEnd(14)} ${c.identity.wikidataId} -> "${result.entityLabel}" (${result.entityDescription ?? "no description"}) -- does NOT match candidate name "${c.identity.canonicalName}"`);
    } else {
      fetchFailCount++;
      console.log(`? FETCH FAILED ${c.slug.padEnd(11)} ${c.identity.wikidataId} -- could not verify (network or missing entity)`);
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`Checked: ${candidates.length}, match: ${matchCount}, MISMATCH: ${mismatchCount}, fetch failed: ${fetchFailCount}`);
  if (dupes.length > 0) {
    console.log(`Duplicate QIDs: ${dupes.join("; ")}`);
  } else {
    console.log(`Duplicate QIDs: none`);
  }
  if (mismatchCount > 0) process.exitCode = 1;
}

main();
