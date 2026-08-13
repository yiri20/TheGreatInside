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
import { TAXONOMY_VERSION, REFERENCE_VERSION } from "./attributes/attributes.js";
import { GREATNESS_SCORING_VERSION } from "./greatness/greatness.js";
import { ARCHETYPES_VERSION } from "./greatness/archetypes.js";
import { MATCHING_VERSION } from "./matching/similarity.js";
import { CALIBRATION_VERSION } from "./matching/calibration.js";
import { DISPERSION_VERSION } from "./matching/dispersion.js";
import { INTERPRETATION_VERSION } from "./interpretation/rules.js";

/**
 * Phase 10C hardening: the original six fields (quiz/scoring/taxonomy/
 * greatness/matching/calibration) covered most, but not all, of what can
 * change a rendered `/results` output. A dependency audit for historical
 * result fidelity found FOUR more code-level version constants that
 * `/results` genuinely depends on (via `ATTRIBUTES[id].reference` for
 * z-scoring, `discriminativeWeight()` inside the matching sum, archetype
 * target-shrinkage inside Greatness, and `rules.ts`'s selection functions)
 * but that were never threaded into this snapshot — silently unguarded.
 * Added here rather than left as a known gap. This snapshot deliberately
 * does NOT cover the person/roster dataset itself, which has no code-level
 * version constant at all — see `src/core/people/dataVersion.ts`'s
 * `personDataFingerprint`, a SEPARATE, sibling concept (a live data
 * fingerprint compared for equality, not a "known shipped combination"
 * checked against an allowlist the way every field below is).
 */
export interface VersionSnapshot {
  quizVersion: string;
  scoringVersion: string;
  taxonomyVersion: string;
  referenceVersion: string;
  dispersionVersion: string;
  greatnessScoringVersion: string;
  archetypesVersion: string;
  matchingVersion: string;
  calibrationVersion: string;
  interpretationVersion: string;
}

export const CURRENT_VERSIONS: VersionSnapshot = {
  quizVersion: QUIZ_VERSION,
  scoringVersion: SCORING_VERSION,
  taxonomyVersion: TAXONOMY_VERSION,
  referenceVersion: REFERENCE_VERSION,
  dispersionVersion: DISPERSION_VERSION,
  greatnessScoringVersion: GREATNESS_SCORING_VERSION,
  archetypesVersion: ARCHETYPES_VERSION,
  matchingVersion: MATCHING_VERSION,
  calibrationVersion: CALIBRATION_VERSION,
  interpretationVersion: INTERPRETATION_VERSION,
};

/** Append-only. See module doc above — never remove or mutate an existing
 *  entry, only ever add a new one ahead of a future CURRENT_VERSIONS bump. */
export const KNOWN_VERSION_SNAPSHOTS: readonly VersionSnapshot[] = [CURRENT_VERSIONS];

/** Exported (Phase 10C) for the claim-time drift guard in
 *  `saveCompletedResult.ts`, which needs the identical field-by-field
 *  comparison for a different question: not "is this a combination we've
 *  ever shipped" (that's `isKnownVersionSnapshot` below), but "is this
 *  combination what's current RIGHT NOW" — see that file's own doc comment. */
export function snapshotsEqual(a: VersionSnapshot, b: VersionSnapshot): boolean {
  return (
    a.quizVersion === b.quizVersion &&
    a.scoringVersion === b.scoringVersion &&
    a.taxonomyVersion === b.taxonomyVersion &&
    a.referenceVersion === b.referenceVersion &&
    a.dispersionVersion === b.dispersionVersion &&
    a.greatnessScoringVersion === b.greatnessScoringVersion &&
    a.archetypesVersion === b.archetypesVersion &&
    a.matchingVersion === b.matchingVersion &&
    a.calibrationVersion === b.calibrationVersion &&
    a.interpretationVersion === b.interpretationVersion
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
