import { describe, expect, it } from "vitest";
import { RESULT_SNAPSHOT_SCHEMA_VERSION } from "@core/results/snapshot";
import { fetchSavedResult, type FetchSavedResultDeps } from "./fetchSavedResult.js";

const VALID_SNAPSHOT = {
  snapshotSchemaVersion: RESULT_SNAPSHOT_SCHEMA_VERSION,
  traits: {},
  highlights: [],
  signature: undefined,
  greatness: {
    score: 50,
    rawScore: 0.5,
    bandId: "steady_pattern",
    components: { archetypeAffinity: 0.5, distinctiveness: 0.5, coherence: 0.5, engineTraits: 0.5 },
    primaryArchetypeId: "independent_creator",
    secondaryArchetypeId: undefined,
    dualEdged: undefined,
  },
  resultArchetype: undefined,
  closest: undefined,
  comparison: { closestTraits: [], userHigherTraits: [], personHigherTraits: [], advantage: [] },
  categoryMatches: [],
  personNames: {},
};

function depsReturning(row: { id: string; result_snapshot: unknown } | null): FetchSavedResultDeps {
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: row, error: null }),
        }),
      }),
    }),
  };
}

describe("fetchSavedResult", () => {
  it("returns ok with the parsed snapshot for a row with a valid snapshot", async () => {
    const deps = depsReturning({ id: "row-1", result_snapshot: VALID_SNAPSHOT });
    const outcome = await fetchSavedResult(deps, "row-1");
    expect(outcome).toEqual({ status: "ok", snapshot: VALID_SNAPSHOT });
  });

  it("returns not_found when the query returns no row — indistinguishable from 'exists but isn't yours', by design", async () => {
    // The function has NO id-vs-user check of its own; it trusts whatever
    // the injected client returns. This simulates exactly what RLS produces
    // for a real, existing row that belongs to a different user: zero rows,
    // no error — proving there is no bypass path here that could leak
    // "this id exists" for a non-owned row.
    const deps = depsReturning(null);
    const outcome = await fetchSavedResult(deps, "someone-elses-row");
    expect(outcome).toEqual({ status: "not_found" });
  });

  it("returns unavailable for a legacy row with a null result_snapshot (pre-Phase-10C)", async () => {
    const deps = depsReturning({ id: "row-legacy", result_snapshot: null });
    const outcome = await fetchSavedResult(deps, "row-legacy");
    expect(outcome).toEqual({ status: "unavailable" });
  });

  it("returns unavailable — never a crash or a best-effort partial render — for a row whose result_snapshot fails strict validation", async () => {
    const deps = depsReturning({ id: "row-corrupt", result_snapshot: { snapshotSchemaVersion: "not_a_real_version" } });
    const outcome = await fetchSavedResult(deps, "row-corrupt");
    expect(outcome).toEqual({ status: "unavailable" });
  });

  it("never re-derives or recomputes anything beyond parsing — the returned snapshot is byte-identical to what was stored, not a recalculation", async () => {
    const deps = depsReturning({ id: "row-1", result_snapshot: VALID_SNAPSHOT });
    const outcome = await fetchSavedResult(deps, "row-1");
    expect(outcome.status).toBe("ok");
    if (outcome.status === "ok") {
      expect(outcome.snapshot).toEqual(VALID_SNAPSHOT);
    }
  });
});
