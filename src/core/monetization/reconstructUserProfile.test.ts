import { describe, expect, it } from "vitest";
import { ATTRIBUTE_IDS } from "../attributes/attributes.js";
import { RESULT_SNAPSHOT_SCHEMA_VERSION, type ResultSnapshotV1 } from "../results/snapshot.js";
import { reconstructUserProfileFromResultSnapshot } from "./reconstructUserProfile.js";

function fixtureSnapshot(): ResultSnapshotV1 {
  const traits: ResultSnapshotV1["traits"] = {};
  for (const id of ATTRIBUTE_IDS) {
    traits[id] = { score: 60, confidence: 0.8, z: 0.5 };
  }
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

describe("reconstructUserProfileFromResultSnapshot", () => {
  it("carries every attribute's frozen score/confidence forward exactly", () => {
    const snapshot = fixtureSnapshot();
    const user = reconstructUserProfileFromResultSnapshot(snapshot, {
      quizVersion: "quiz_v2",
      scoringVersion: "scoring_v1",
      taxonomyVersion: "taxonomy_v1.1",
      completedAt: "2026-08-01T00:00:00.000Z",
    });
    for (const id of ATTRIBUTE_IDS) {
      expect(user.scores[id]).toBe(60);
      expect(user.confidence[id]).toBe(0.8);
    }
  });

  it("preserves the completion-time provenance passed in, not any live value", () => {
    const user = reconstructUserProfileFromResultSnapshot(fixtureSnapshot(), {
      quizVersion: "quiz_v2",
      scoringVersion: "scoring_v1",
      taxonomyVersion: "taxonomy_v1.1",
      completedAt: "2026-08-01T00:00:00.000Z",
    });
    expect(user.quizVersion).toBe("quiz_v2");
    expect(user.completedAt).toBe("2026-08-01T00:00:00.000Z");
  });

  it("falls back to neutral 50 / floor confidence 0.2 for a missing attribute", () => {
    const snapshot = fixtureSnapshot();
    const firstId = ATTRIBUTE_IDS[0]!;
    delete (snapshot.traits as Record<string, unknown>)[firstId];
    const user = reconstructUserProfileFromResultSnapshot(snapshot, {
      quizVersion: "quiz_v2",
      scoringVersion: "scoring_v1",
      taxonomyVersion: "taxonomy_v1.1",
      completedAt: "2026-08-01T00:00:00.000Z",
    });
    expect(user.scores[firstId]).toBe(50);
    expect(user.confidence[firstId]).toBe(0.2);
  });
});
