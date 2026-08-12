/**
 * VERSION PROVENANCE — Phase 9 Stage 9C.
 *
 * A completed quiz result can be produced anonymously and saved to an
 * account much later, after the app itself has moved on to newer
 * scoring/matching/calibration/greatness versions. `VersionSnapshot` is the
 * shape that travels with a result to record which versions actually
 * produced it — never re-derived from "whatever the current constants say"
 * at save time, which would silently rewrite history.
 *
 * `KNOWN_VERSION_SNAPSHOTS` is an append-only registry, not a synonym for
 * "equals CURRENT_VERSIONS". INVARIANT: before `CURRENT_VERSIONS` is ever
 * changed in a future release (any of the six fields bumping), the snapshot
 * it is about to replace must first be added to this array as its own
 * permanent entry. Anonymous pending completions saved under an older
 * version combination must remain migratable after a deployment that moves
 * matching/calibration/scoring/etc forward — dropping an old entry here
 * would silently orphan them. This module has no such historical entries
 * yet (nothing has shipped a second version combination), so the array is
 * `[CURRENT_VERSIONS]` today; this is the seam a future legacy-version
 * addition extends, not a shape that needs to change to support it.
 */
import { QUIZ_VERSION } from "./quiz/bank.js";
import { SCORING_VERSION } from "./quiz/scoring.js";
import { TAXONOMY_VERSION } from "./attributes/attributes.js";
import { GREATNESS_SCORING_VERSION } from "./greatness/greatness.js";
import { MATCHING_VERSION } from "./matching/similarity.js";
import { CALIBRATION_VERSION } from "./matching/calibration.js";

export interface VersionSnapshot {
  quizVersion: string;
  scoringVersion: string;
  taxonomyVersion: string;
  greatnessScoringVersion: string;
  matchingVersion: string;
  calibrationVersion: string;
}

export const CURRENT_VERSIONS: VersionSnapshot = {
  quizVersion: QUIZ_VERSION,
  scoringVersion: SCORING_VERSION,
  taxonomyVersion: TAXONOMY_VERSION,
  greatnessScoringVersion: GREATNESS_SCORING_VERSION,
  matchingVersion: MATCHING_VERSION,
  calibrationVersion: CALIBRATION_VERSION,
};

/** Append-only. See module doc above — never remove or mutate an existing
 *  entry, only ever add a new one ahead of a future CURRENT_VERSIONS bump. */
export const KNOWN_VERSION_SNAPSHOTS: readonly VersionSnapshot[] = [CURRENT_VERSIONS];

function snapshotsEqual(a: VersionSnapshot, b: VersionSnapshot): boolean {
  return (
    a.quizVersion === b.quizVersion &&
    a.scoringVersion === b.scoringVersion &&
    a.taxonomyVersion === b.taxonomyVersion &&
    a.greatnessScoringVersion === b.greatnessScoringVersion &&
    a.matchingVersion === b.matchingVersion &&
    a.calibrationVersion === b.calibrationVersion
  );
}

/**
 * `registry` defaults to the real, live `KNOWN_VERSION_SNAPSHOTS` — the
 * parameter exists so tests can exercise the append-only design (an older
 * snapshot remaining valid alongside a newer `CURRENT_VERSIONS`) without
 * mutating the real exported constant, which must stay append-only in
 * actual use.
 */
export function isKnownVersionSnapshot(
  v: VersionSnapshot,
  registry: readonly VersionSnapshot[] = KNOWN_VERSION_SNAPSHOTS,
): boolean {
  return registry.some((k) => snapshotsEqual(k, v));
}
