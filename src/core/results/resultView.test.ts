import { describe, expect, it } from "vitest";
import { ATTRIBUTE_IDS, TAXONOMY_VERSION, type AttributeId } from "../attributes/attributes.js";
import type { Person, UserProfile } from "../types.js";
import { computeResultView } from "./resultView.js";
import { buildResultSet } from "../matching/selectors.js";
import { computeGreatnessPotential } from "../greatness/greatness.js";
import { advantageTraits, distinctiveTraits, selectResultArchetype, signatureTrait } from "../interpretation/rules.js";

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

function makePerson(id: string, attributes: Person["attributes"], fieldIds: string[] = []): Person {
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
    fieldIds,
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
  makePerson("p_close", [attr("curiosity", 90), attr("discipline", 30)], ["science"]),
  makePerson("p_far", [attr("curiosity", 5), attr("discipline", 95)], ["politics"]),
];

/**
 * PARITY GUARD (Phase 10C pre-migration hardening). `/results/page.tsx` and
 * `buildResultSnapshot.ts` both call `computeResultView` directly now, so
 * their agreement is structural. This test independently re-derives what
 * `computeResultView` SHOULD produce by calling each underlying function by
 * hand — the same way `/results/page.tsx` did before this refactor — and
 * asserts `computeResultView`'s output matches exactly. If a future edit
 * changes `computeResultView` without a corresponding intentional change
 * here, this test is the tripwire.
 */
describe("computeResultView — parity with independently-composed underlying functions", () => {
  it("matches a hand-composed pipeline for every field the view exposes", () => {
    const user = profile({ curiosity: 88, discipline: 32 });

    const view = computeResultView(user, PEOPLE);

    const expectedResults = buildResultSet(user, PEOPLE);
    const expectedGreatness = computeGreatnessPotential(user, { people: PEOPLE });
    const expectedSignature = signatureTrait(user);
    const expectedHighlights = distinctiveTraits(user, 6);
    const expectedClosest = expectedResults.closest;
    const expectedResultArchetype = expectedClosest
      ? selectResultArchetype({
          topMatch: expectedClosest.overallMatch,
          greatnessScore: expectedGreatness.score,
          distinctiveness: expectedGreatness.components.distinctiveness,
          unexpectedIsCrossField:
            expectedResults.unexpected !== undefined &&
            expectedResults.unexpected.person.fieldIds.every((f) => !expectedClosest.person.fieldIds.includes(f)),
        })
      : undefined;
    const expectedAdvantage = expectedClosest
      ? advantageTraits(
          [...expectedClosest.closestTraits, ...expectedClosest.userHigherTraits, ...expectedClosest.personHigherTraits],
          3,
        )
      : [];

    expect(view.results).toEqual(expectedResults);
    expect(view.greatness).toEqual(expectedGreatness);
    expect(view.signature).toEqual(expectedSignature);
    expect(view.highlights).toEqual(expectedHighlights);
    expect(view.resultArchetype).toEqual(expectedResultArchetype);
    expect(view.advantage).toEqual(expectedAdvantage);
  });

  it("is a pure function: same user + same roster always produces byte-identical output", () => {
    const user = profile({ curiosity: 88, discipline: 32 });
    expect(computeResultView(user, PEOPLE)).toEqual(computeResultView(user, PEOPLE));
  });

  it("handles an empty roster (no closest match) without throwing, with advantage as an empty array not undefined", () => {
    const user = profile({ curiosity: 88 });
    const view = computeResultView(user, []);
    expect(view.results.closest).toBeUndefined();
    expect(view.resultArchetype).toBeUndefined();
    expect(view.advantage).toEqual([]);
  });
});
