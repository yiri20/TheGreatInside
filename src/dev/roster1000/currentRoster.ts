/**
 * Live (derived) current-roster state for tests and dev tooling.
 *
 * Everything here is computed from canonical data -- `SEED_PEOPLE`, `PEOPLE_INDEX`, the lineage registry and the
 * candidate directory -- never from a hand-maintained number. `CURRENT_ROSTER_MANIFEST` (the one pinned copy of
 * these numbers) is compared against it by `currentRosterState.test.ts`.
 *
 * Dev/test-only: reads the file system for the candidate count, so it must never be imported by `app/` or
 * `src/core` (and therefore never reaches a browser or runtime bundle).
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import { PEOPLE_INDEX } from "../../data/people/peopleIndex.generated.js";
import { buildLineageMap } from "./audits/matchPoolIntegrityAudit.js";
import { rosterNumber } from "./rosterMembership.js";

export interface CurrentRosterCounts {
  production: number;
  productionIndex: number;
  directoryVisible: number;
  matchEligible: number;
  latestRoster: number;
}

export function currentRosterCounts(): CurrentRosterCounts {
  let latest = 0;
  for (const label of new Set(buildLineageMap().values())) {
    const n = rosterNumber(label);
    if (n !== undefined && n > latest) latest = n;
  }
  return {
    production: SEED_PEOPLE.length,
    productionIndex: PEOPLE_INDEX.length,
    directoryVisible: SEED_PEOPLE.filter((p) => p.isDirectoryVisible).length,
    matchEligible: SEED_PEOPLE.filter((p) => p.isMatchEligible).length,
    latestRoster: latest,
  };
}

/** Number of `data-pipeline/candidates/*.json` files (shipped, held and backlog candidates). */
export function candidateJsonCount(root: string = process.cwd()): number {
  return readdirSync(join(root, "data-pipeline/candidates")).filter((f) => f.endsWith(".json")).length;
}
