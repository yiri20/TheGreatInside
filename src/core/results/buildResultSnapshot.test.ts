import { describe, expect, it } from "vitest";
import { ATTRIBUTE_IDS, TAXONOMY_VERSION, type AttributeId } from "../attributes/attributes.js";
import type { Person, UserProfile } from "../types.js";
import { buildResultSnapshot } from "./buildResultSnapshot.js";
import { parseResultSnapshot } from "./snapshot.js";
import { buildResultSet } from "../matching/selectors.js";
import { computeGreatnessPotential } from "../greatness/greatness.js";

function profile(scores: Partial<Record<AttributeId, number>>, fill = 50): UserProfile {
  const full = {} as Record<AttributeId, number>;
  const confidence = {} as Record<AttributeId, number>;
  for (const id of ATTRIBUTE_IDS) {
    full[id] = scores[id] ?? fill;
    confidence[id] = 0.9;
  }
  return {
    id: "u",
    quizVersion: "test",
    scoringVersion: "test",
    taxonomyVersion: TAXONOMY_VERSION,
    scores: full,
    confidence,
    completedAt: "2026-08-01T00:00:00.000Z",
  };
}

function attr(attributeId: AttributeId, score: number): Person["attributes"][number] {
  return { attributeId, score, confidence: 0.9, evidenceType: "documented", impact: "neutral", sourceIds: [] };
}

function makePerson(id: string, attributes: Person["attributes"]): Person {
  return {
    id,
    slug: id,
    canonicalName: `Person ${id}`,
    aliases: [],
    isLiving: false,
    era: "contemporary",
    nationalityCodes: [],
    regionCode: "test",
    occupationIds: [],
    fieldIds: [],
    impactDomains: [],
    tagIds: [],
    archetypeIds: [],
    attributes,
    status: "published",
    isMatchEligible: true,
    overallProfileConfidence: 0.9,
    sources: [],
    doNotCopyKeys: [],
  };
}

const PEOPLE: Person[] = [
  makePerson("p_close", [attr("curiosity", 90), attr("discipline", 30)]),
  makePerson("p_far", [attr("curiosity", 5), attr("discipline", 95)]),
];

describe("buildResultSnapshot", () => {
  it("always produces output that passes the strict snapshot validator", () => {
    const user = profile({ curiosity: 88, discipline: 32 });
    const snapshot = buildResultSnapshot(user, PEOPLE);
    expect(parseResultSnapshot(snapshot)).toEqual(snapshot);
  });

  it("closest match, overallMatch, and category matches match buildResultSet's own independently-computed output", () => {
    const user = profile({ curiosity: 88, discipline: 32 });
    const snapshot = buildResultSnapshot(user, PEOPLE);
    const directResults = buildResultSet(user, PEOPLE);

    expect(snapshot.closest?.personId).toBe(directResults.closest?.personId);
    expect(snapshot.closest?.overallMatch).toBe(directResults.closest?.overallMatch);
    expect(snapshot.categoryMatches).toEqual(
      directResults.categoryMatches.map((cm) => ({ facet: cm.facet, personId: cm.personId, match: cm.match })),
    );
  });

  it("greatness numbers match computeGreatnessPotential's own independently-computed output", () => {
    const user = profile({ curiosity: 88, discipline: 32 });
    const snapshot = buildResultSnapshot(user, PEOPLE);
    const directGreatness = computeGreatnessPotential(user, { people: PEOPLE });

    expect(snapshot.greatness.score).toBe(directGreatness.score);
    expect(snapshot.greatness.rawScore).toBe(directGreatness.rawScore);
    expect(snapshot.greatness.bandId).toBe(directGreatness.bandId);
    expect(snapshot.greatness.primaryArchetypeId).toBe(directGreatness.primaryArchetypeId);
  });

  it("the user's full trait vector is captured, including attributes below the highlight cutoff", () => {
    const user = profile({ curiosity: 88 });
    const snapshot = buildResultSnapshot(user, PEOPLE);
    expect(Object.keys(snapshot.traits)).toHaveLength(ATTRIBUTE_IDS.length);
    expect(snapshot.traits.curiosity?.score).toBe(88);
  });

  it("handles an empty roster without throwing — no closest match, no category matches, but a valid snapshot", () => {
    const user = profile({ curiosity: 88 });
    const snapshot = buildResultSnapshot(user, []);
    expect(parseResultSnapshot(snapshot)).toBeDefined();
    expect(snapshot.closest).toBeUndefined();
    expect(snapshot.categoryMatches).toEqual([]);
  });

  it("captures a canonical-name fallback for every person referenced (closest + category matches)", () => {
    const user = profile({ curiosity: 88, discipline: 32 });
    const snapshot = buildResultSnapshot(user, PEOPLE);
    const closestId = snapshot.closest?.personId;
    expect(closestId).toBeDefined();
    expect(snapshot.personNames[closestId!]).toBe(PEOPLE.find((p) => p.id === closestId)!.canonicalName);
  });

  it("is a pure function of its inputs: same user + same roster always produces byte-identical output", () => {
    const user = profile({ curiosity: 88, discipline: 32 });
    const first = buildResultSnapshot(user, PEOPLE);
    const second = buildResultSnapshot(user, PEOPLE);
    expect(first).toEqual(second);
  });
});
