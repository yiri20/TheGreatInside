import { describe, expect, it } from "vitest";
import { parseResultSnapshot, RESULT_SNAPSHOT_SCHEMA_VERSION, type ResultSnapshotV1 } from "./snapshot.js";

function validSnapshot(overrides: Partial<ResultSnapshotV1> = {}): ResultSnapshotV1 {
  return {
    snapshotSchemaVersion: RESULT_SNAPSHOT_SCHEMA_VERSION,
    traits: { curiosity: { score: 70, confidence: 0.8, z: 1.2 } },
    highlights: ["curiosity"],
    signature: { attributeId: "curiosity", score: 70, confidence: 0.8 },
    greatness: {
      score: 58,
      rawScore: 0.5,
      bandId: "steady_pattern",
      components: { archetypeAffinity: 0.5, distinctiveness: 0.4, coherence: 0.9, engineTraits: 0.6 },
      primaryArchetypeId: "independent_creator",
      secondaryArchetypeId: undefined,
      dualEdged: undefined,
    },
    resultArchetype: "balanced_profile",
    closest: { personId: "p_test", overallMatch: 78, explanationTrait: { attributeId: "curiosity", userScore: 70, personScore: 80 } },
    comparison: {
      closestTraits: [{ attributeId: "curiosity", userScore: 70, personScore: 80 }],
      userHigherTraits: [],
      personHigherTraits: [],
      advantage: [],
    },
    categoryMatches: [{ facet: "thinking", personId: "p_test", match: 78 }],
    personNames: { p_test: "Test Person" },
    ...overrides,
  };
}

describe("parseResultSnapshot", () => {
  it("accepts a well-formed snapshot and returns it", () => {
    const s = validSnapshot();
    expect(parseResultSnapshot(s)).toEqual(s);
  });

  it("accepts a minimal snapshot with every optional field absent (new user, no closest match, no signature)", () => {
    const minimal: ResultSnapshotV1 = {
      snapshotSchemaVersion: RESULT_SNAPSHOT_SCHEMA_VERSION,
      traits: {},
      highlights: [],
      signature: undefined,
      greatness: {
        score: 10,
        rawScore: 0.1,
        bandId: "quiet_signal",
        components: { archetypeAffinity: 0.1, distinctiveness: 0.1, coherence: 0.5, engineTraits: 0.1 },
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
    expect(parseResultSnapshot(minimal)).toEqual(minimal);
  });

  it.each([null, undefined, "a string", 42, [], true])("rejects non-object top-level values (%s)", (v) => {
    expect(parseResultSnapshot(v)).toBeUndefined();
  });

  it("rejects a payload with the wrong or missing schema version — never blindly trusts arbitrary JSONB", () => {
    expect(parseResultSnapshot({ ...validSnapshot(), snapshotSchemaVersion: "result_snapshot_v2" })).toBeUndefined();
    const { snapshotSchemaVersion: _drop, ...noVersion } = validSnapshot();
    expect(parseResultSnapshot(noVersion)).toBeUndefined();
  });

  it("rejects malformed traits (non-finite score)", () => {
    const bad = validSnapshot();
    bad.traits = { curiosity: { score: NaN, confidence: 0.8, z: 1 } };
    expect(parseResultSnapshot(bad)).toBeUndefined();
  });

  it("rejects a malformed greatness block (missing components field)", () => {
    const bad: Record<string, unknown> = { ...validSnapshot() };
    bad.greatness = { score: 50, rawScore: 0.5, bandId: "x", primaryArchetypeId: "independent_creator" };
    expect(parseResultSnapshot(bad)).toBeUndefined();
  });

  it("rejects a malformed closest block (missing overallMatch)", () => {
    const bad: Record<string, unknown> = { ...validSnapshot() };
    bad.closest = { personId: "p_test" };
    expect(parseResultSnapshot(bad)).toBeUndefined();
  });

  it("rejects a malformed comparison array entry", () => {
    const bad = validSnapshot();
    (bad.comparison.closestTraits as unknown[]) = [{ attributeId: "curiosity", userScore: "not-a-number", personScore: 80 }];
    expect(parseResultSnapshot(bad)).toBeUndefined();
  });

  it("rejects a malformed categoryMatches entry", () => {
    const bad: Record<string, unknown> = { ...validSnapshot(), categoryMatches: [{ facet: "thinking" }] };
    expect(parseResultSnapshot(bad)).toBeUndefined();
  });

  it("rejects a personNames map with a non-string value", () => {
    const bad: Record<string, unknown> = { ...validSnapshot(), personNames: { p_test: 42 } };
    expect(parseResultSnapshot(bad)).toBeUndefined();
  });

  it("does NOT validate attribute or person ids against any current taxonomy/roster — an old snapshot may reference an id a later revision removed", () => {
    const withUnknownIds = validSnapshot();
    withUnknownIds.traits = { some_removed_attribute: { score: 40, confidence: 0.5, z: -0.5 } };
    withUnknownIds.highlights = ["some_removed_attribute" as never];
    withUnknownIds.closest = { personId: "p_no_longer_exists", overallMatch: 60, explanationTrait: undefined };
    expect(parseResultSnapshot(withUnknownIds)).toBeDefined();
  });
});
