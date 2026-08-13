import { describe, expect, it } from "vitest";
import { RESULT_SNAPSHOT_SCHEMA_VERSION, type ResultSnapshotV1 } from "@core/results/snapshot";
import { resolveSavedResultPageState } from "./savedResultPageState.js";

const VALID_SNAPSHOT: ResultSnapshotV1 = {
  snapshotSchemaVersion: RESULT_SNAPSHOT_SCHEMA_VERSION,
  traits: {},
  highlights: [],
  signature: undefined,
  greatness: {
    score: 61,
    rawScore: 0.6,
    bandId: "strong_pattern",
    components: { archetypeAffinity: 0.6, distinctiveness: 0.5, coherence: 0.6, engineTraits: 0.6 },
    primaryArchetypeId: "independent_creator",
    secondaryArchetypeId: undefined,
    dualEdged: undefined,
  },
  resultArchetype: undefined,
  closest: { personId: "p_benjamin_franklin", overallMatch: 70, explanationTrait: undefined },
  comparison: { closestTraits: [], userHigherTraits: [], personHigherTraits: [], advantage: [] },
  categoryMatches: [],
  personNames: {},
};

describe("resolveSavedResultPageState", () => {
  it("saved-result route while unauthenticated: always auth_required, regardless of what outcome would otherwise say", () => {
    expect(resolveSavedResultPageState(false, undefined)).toEqual({ kind: "auth_required" });
    expect(resolveSavedResultPageState(false, { status: "ok", snapshot: VALID_SNAPSHOT })).toEqual({ kind: "auth_required" });
    expect(resolveSavedResultPageState(false, { status: "not_found" })).toEqual({ kind: "auth_required" });
  });

  it("sign out while viewing a saved-result page transitions to auth_required, never to not_found — the exact production bug this fixes", () => {
    // Simulates the reported scenario: the same lookup (an outcome that
    // WOULD render fine while signed in) must resolve to auth_required
    // the moment signedIn flips to false, never fall through to the
    // generic not-found state.
    const outcomeThatWouldSucceedIfSignedIn = { status: "ok" as const, snapshot: VALID_SNAPSHOT };
    expect(resolveSavedResultPageState(true, outcomeThatWouldSucceedIfSignedIn)).toEqual({
      kind: "ok",
      snapshot: VALID_SNAPSHOT,
    });
    expect(resolveSavedResultPageState(false, outcomeThatWouldSucceedIfSignedIn)).toEqual({ kind: "auth_required" });
  });

  it("authenticated owner sees the snapshot", () => {
    expect(resolveSavedResultPageState(true, { status: "ok", snapshot: VALID_SNAPSHOT })).toEqual({
      kind: "ok",
      snapshot: VALID_SNAPSHOT,
    });
  });

  it("authenticated + legacy null-snapshot row: unavailable state", () => {
    expect(resolveSavedResultPageState(true, { status: "unavailable" })).toEqual({ kind: "unavailable" });
  });

  it("authenticated + nonexistent OR another user's id: the SAME generic not_found state either way — the privacy boundary this must never weaken", () => {
    // fetchSavedResult.test.ts already proves the DB layer can't tell these
    // apart (RLS returns zero rows for both); this proves the page-state
    // layer doesn't reintroduce a distinction on top of that.
    expect(resolveSavedResultPageState(true, { status: "not_found" })).toEqual({ kind: "not_found" });
    expect(resolveSavedResultPageState(true, undefined)).toEqual({ kind: "not_found" }); // defensive default, same state
  });
});
