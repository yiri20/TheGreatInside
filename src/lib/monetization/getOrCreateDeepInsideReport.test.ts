import { describe, expect, it, vi } from "vitest";
import { SEED_PEOPLE } from "@data/people/seed";
import { ATTRIBUTE_IDS } from "@core/attributes/attributes";
import { RESULT_SNAPSHOT_SCHEMA_VERSION, type ResultSnapshotV1 } from "@core/results/snapshot";
import { DEEP_INSIDE_REPORT_SCHEMA_VERSION } from "@core/monetization/deepInsideSnapshot";
import {
  getOrCreateDeepInsideReport,
  type GetOrCreateDeepInsideReportDeps,
  type SavedResultRow,
} from "./getOrCreateDeepInsideReport";

function fixtureFreeSnapshot(): ResultSnapshotV1 {
  const traits: ResultSnapshotV1["traits"] = {};
  for (const id of ATTRIBUTE_IDS) traits[id] = { score: 60, confidence: 0.8, z: 0.3 };
  return {
    snapshotSchemaVersion: RESULT_SNAPSHOT_SCHEMA_VERSION,
    traits,
    highlights: [],
    signature: undefined,
    greatness: {
      score: 50,
      rawScore: 0.5,
      bandId: "emerging_pattern",
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
}

function fixtureRow(overrides: Partial<SavedResultRow> = {}): SavedResultRow {
  return {
    quizVersion: "quiz_v2",
    scoringVersion: "scoring_v1",
    taxonomyVersion: "taxonomy_v1.1",
    completedAt: "2026-08-01T00:00:00.000Z",
    resultSnapshot: fixtureFreeSnapshot(),
    deepReportSnapshot: null,
    ...overrides,
  };
}

function baseDeps(overrides: Partial<GetOrCreateDeepInsideReportDeps> = {}): GetOrCreateDeepInsideReportDeps {
  return {
    fetchResultRow: vi.fn(async () => fixtureRow()),
    saveDeepReportSnapshot: vi.fn(async () => ({ ok: true })),
    people: SEED_PEOPLE,
    now: () => "2026-08-21T00:00:00.000Z",
    ...overrides,
  };
}

describe("getOrCreateDeepInsideReport", () => {
  it("returns not_found when no matching saved result exists", async () => {
    const deps = baseDeps({ fetchResultRow: vi.fn(async () => undefined) });
    const result = await getOrCreateDeepInsideReport(deps, "user-1", "quiz_v2.abc");
    expect(result).toEqual({ ok: false, reason: "not_found" });
  });

  it("generates and persists a new report when none exists yet", async () => {
    const save = vi.fn(async () => ({ ok: true }));
    const deps = baseDeps({ saveDeepReportSnapshot: save });
    const result = await getOrCreateDeepInsideReport(deps, "user-1", "quiz_v2.abc");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.report.schemaVersion).toBe(DEEP_INSIDE_REPORT_SCHEMA_VERSION);
      expect(result.report.generatedAt).toBe("2026-08-21T00:00:00.000Z");
    }
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("user-1", "quiz_v2.abc", expect.objectContaining({ schemaVersion: DEEP_INSIDE_REPORT_SCHEMA_VERSION }));
  });

  it("returns the ALREADY-frozen report unchanged when one already exists, never recomputing", async () => {
    const frozenReport = {
      schemaVersion: DEEP_INSIDE_REPORT_SCHEMA_VERSION,
      versions: {
        quizVersion: "quiz_v1_old",
        scoringVersion: "scoring_v0",
        taxonomyVersion: "taxonomy_v0",
        referenceVersion: "reference_v0",
        dispersionVersion: "dispersion_v0",
        greatnessScoringVersion: "greatness_v0",
        archetypesVersion: "archetypes_v0",
        matchingVersion: "matching_v0",
        calibrationVersion: "calibration_v0",
        interpretationVersion: "interpretation_v0",
      },
      generatedAt: "2020-01-01T00:00:00.000Z",
      whyMatchesFit: [],
      historicalCircle: [],
      signatureCombination: [],
      counterpart: undefined,
      strengthsTradeoffs: [],
      personNames: {},
    };
    const save = vi.fn(async () => ({ ok: true }));
    const deps = baseDeps({
      fetchResultRow: vi.fn(async () => fixtureRow({ deepReportSnapshot: frozenReport })),
      saveDeepReportSnapshot: save,
    });
    const result = await getOrCreateDeepInsideReport(deps, "user-1", "quiz_v2.abc");
    expect(result).toEqual({ ok: true, report: frozenReport });
    expect(save).not.toHaveBeenCalled();
  });

  it("rejects when the free result_snapshot itself is missing or malformed", async () => {
    const deps = baseDeps({ fetchResultRow: vi.fn(async () => fixtureRow({ resultSnapshot: null })) });
    const result = await getOrCreateDeepInsideReport(deps, "user-1", "quiz_v2.abc");
    expect(result).toEqual({ ok: false, reason: "invalid_free_snapshot" });
  });

  it("surfaces a persistence failure as a typed error", async () => {
    const deps = baseDeps({ saveDeepReportSnapshot: vi.fn(async () => ({ ok: false })) });
    const result = await getOrCreateDeepInsideReport(deps, "user-1", "quiz_v2.abc");
    expect(result).toEqual({ ok: false, reason: "db_error" });
  });
});
