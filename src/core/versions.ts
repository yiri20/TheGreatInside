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
import { MATCHING_VERSION, ELIGIBILITY_VERSION } from "./matching/similarity.js";
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
 *
 * `eligibilityVersion` added in Roster-1000 session 10 (2026-08) —
 * `similarity.ts`'s `ELIGIBILITY_VERSION`/`ELIGIBILITY` govern WHICH
 * people are candidates for matching at all (`rankMatches` filters on
 * `isMatchEligible`, itself computed by `evaluateMatchEligibility`), a
 * genuine output-affecting methodology fact exactly like `matchingVersion`
 * — a rare, semantically-named formula identifier, not per-person
 * generated data (that distinction is why this belongs here and not in
 * `personDataFingerprint`; see that module's own doc comment for the same
 * reasoning applied to the dispersion/calibration tables it DOES cover).
 * `eligibility_v1` (the historical, implicit, unversioned admission rule)
 * is preserved below as its own `KNOWN_VERSION_SNAPSHOTS` entry, per this
 * module's append-only invariant, BEFORE `CURRENT_VERSIONS` moved to
 * `eligibility_v2` — this is the first time that invariant has ever
 * actually been exercised with a real second combination, not merely
 * exercised in a test fixture. See `docs/roster-1000-checkpoint.md`
 * SS63-64 for the full decision record, including why this session
 * deliberately did NOT add a matching `eligibility_version` DB column:
 * the drift guard's correctness (`saveCompletedResult.ts`'s
 * `snapshotsEqual` comparison) is a pure in-memory check performed before
 * any database write, so it is already fully correct with zero schema
 * change — an explicit persisted column remains a legitimate but
 * strictly optional future auditability enhancement, not a correctness
 * requirement, following the exact same reasoning `personDataFingerprint`
 * already established for the dispersion/calibration tables (some
 * `VersionSnapshot`-tracked facts need no DB column to be enforced
 * correctly, only to be independently queryable later).
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
  eligibilityVersion: string;
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
  eligibilityVersion: ELIGIBILITY_VERSION,
};

/** The exact combination that shipped before this session's `eligibility_v2`
 *  bump — every field identical to `CURRENT_VERSIONS` except
 *  `eligibilityVersion`, which was implicitly `"eligibility_v1"` (no
 *  constant existed for it before this session; the literal string here
 *  is what that implicit rule is retroactively named). Required by this
 *  module's own append-only invariant: the snapshot about to be replaced
 *  must be preserved as its own permanent entry before `CURRENT_VERSIONS`
 *  moves on, so an anonymous pending completion saved under the old
 *  eligibility rule remains a KNOWN (though, correctly, drift-checked-
 *  and-rejected-if-actually-claimed-late) combination rather than an
 *  unrecognized one. */
const ELIGIBILITY_V1_SNAPSHOT: VersionSnapshot = {
  ...CURRENT_VERSIONS,
  eligibilityVersion: "eligibility_v1",
};

/** Append-only. See module doc above — never remove or mutate an existing
 *  entry, only ever add a new one ahead of a future CURRENT_VERSIONS bump. */
export const KNOWN_VERSION_SNAPSHOTS: readonly VersionSnapshot[] = [
  ELIGIBILITY_V1_SNAPSHOT,
  CURRENT_VERSIONS,
];

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
    a.interpretationVersion === b.interpretationVersion &&
    a.eligibilityVersion === b.eligibilityVersion
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
