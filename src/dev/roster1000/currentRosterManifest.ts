/**
 * CURRENT ROSTER MANIFEST -- the single place a roster cycle bumps the cumulative counts.
 *
 * Before this module every roster edited ~40 old audit tests (`toHaveLength(<production>)`, titles carrying the
 * count, the Directory e2e count text, ...) merely because the total grew. Those assertions now either derive from
 * the live data (SEED_PEOPLE / PEOPLE_INDEX agreement) or import these constants, and `currentRosterState.test.ts`
 * is the ONE test that pins the live data to this manifest.
 *
 * Dev/test-only and DEPENDENCY-FREE on purpose (no imports): the Playwright specs under `e2e/` import it, and it
 * must never pull the roster data into a browser or runtime bundle. Not imported by anything under `app/` or
 * `src/core`.
 *
 * Update procedure (normally done by `wireRoster.ts`): change the numbers and `latestRoster` together, then run
 * the full Vitest suite. Values are verified, never trusted: `currentRosterState.test.ts` recomputes
 * production / directory-visible / match-eligible from `SEED_PEOPLE` and the candidate-file count from disk.
 *
 * Historical snapshot assertions (a past roster's own final count, checkpoint before/after counts, legacy
 * remediation baselines) deliberately stay literal elsewhere and are NOT derived from this manifest.
 */
export const CURRENT_ROSTER_MANIFEST = {
  /** Highest roster number registered in `SEED_PEOPLE` (the `rosterN` label in the lineage registry). */
  latestRoster: 68,
  /** `SEED_PEOPLE.length` and `PEOPLE_INDEX.length`. */
  production: 844,
  /** People with `isDirectoryVisible` (the Directory's default "N people" count). */
  directoryVisible: 843,
  /** People with `isMatchEligible`. */
  matchEligible: 114,
  /** `data-pipeline/candidates/*.json` files (shipped, held and backlog candidates). */
  candidateJson: 1027,
} as const;

export type CurrentRosterManifest = typeof CURRENT_ROSTER_MANIFEST;
