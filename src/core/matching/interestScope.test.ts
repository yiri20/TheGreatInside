import { describe, expect, it } from "vitest";
import type { Person } from "../types.js";
import type { RankedMatch } from "./similarity.js";
import { parseInterestScope, selectInterestMatch, type InterestScope } from "./interestScope.js";

function person(overrides: Partial<Person> & { id: string; fieldIds: string[] }): Person {
  return {
    slug: overrides.id,
    canonicalName: overrides.id,
    aliases: [],
    isLiving: false,
    era: "contemporary",
    nationalityCodes: [],
    regionCode: "test",
    occupationIds: [],
    impactDomains: [],
    tagIds: [],
    archetypeIds: [],
    attributes: [],
    status: "published",
    isMatchEligible: true,
    isDirectoryVisible: true,
    overallProfileConfidence: 0.8,
    sources: [],
    doNotCopyKeys: [],
    ...overrides,
  };
}

function rankedMatch(overrides: { personId: string; fieldIds: string[]; overallMatch: number; rawSimilarity: number }): RankedMatch {
  return {
    personId: overrides.personId,
    overallMatch: overrides.overallMatch,
    rawSimilarity: overrides.rawSimilarity,
    coverage: 1,
    facetMatches: {} as RankedMatch["facetMatches"],
    closestTraits: [],
    largestDifferences: [],
    userHigherTraits: [],
    personHigherTraits: [],
    matchingVersion: "test",
    person: person({ id: overrides.personId, fieldIds: overrides.fieldIds }),
  };
}

describe("parseInterestScope", () => {
  it("defaults missing/undefined to all", () => {
    expect(parseInterestScope(undefined)).toBe("all");
    expect(parseInterestScope(null)).toBe("all");
  });

  it("accepts every valid ProfessionCategoryId", () => {
    const valid: InterestScope[] = ["science_knowledge", "arts_culture", "leadership_society", "building_discovery"];
    for (const id of valid) expect(parseInterestScope(id)).toBe(id);
  });

  it("falls back to all for any invalid/unrecognized value", () => {
    expect(parseInterestScope("bogus")).toBe("all");
    expect(parseInterestScope("")).toBe("all");
    expect(parseInterestScope("Arts_Culture")).toBe("all"); // case-sensitive, not fuzzy-matched
    expect(parseInterestScope("all")).toBe("all");
  });
});

describe("selectInterestMatch", () => {
  const ranked: RankedMatch[] = [
    rankedMatch({ personId: "p1", fieldIds: ["business"], overallMatch: 92, rawSimilarity: 0.9 }),
    rankedMatch({ personId: "p2", fieldIds: ["literature"], overallMatch: 88, rawSimilarity: 0.85 }),
    rankedMatch({ personId: "p3", fieldIds: ["mathematics", "literature"], overallMatch: 80, rawSimilarity: 0.7 }),
    rankedMatch({ personId: "p4", fieldIds: ["art"], overallMatch: 70, rawSimilarity: 0.5 }),
  ];

  it("returns undefined for scope 'all'", () => {
    expect(selectInterestMatch(ranked, "all")).toBeUndefined();
  });

  it("returns the highest-ranked person whose fieldIds belong to the category", () => {
    // arts_culture includes "literature" and "art" -- p2 outranks p4, so p2 wins.
    const match = selectInterestMatch(ranked, "arts_culture");
    expect(match?.personId).toBe("p2");
  });

  it("returns a person via any of their multiple fieldIds", () => {
    // p3 has both mathematics (science_knowledge) and literature (arts_culture).
    expect(selectInterestMatch(ranked, "science_knowledge")?.personId).toBe("p3");
  });

  it("does not alter the underlying match score -- same object as in `ranked`", () => {
    const match = selectInterestMatch(ranked, "building_discovery"); // p1 (business)
    expect(match).toBe(ranked[0]);
    expect(match?.overallMatch).toBe(92);
    expect(match?.rawSimilarity).toBe(0.9);
  });

  it("returns undefined when no ranked person belongs to the category", () => {
    const noneMatch = selectInterestMatch(ranked, "leadership_society");
    expect(noneMatch).toBeUndefined();
  });

  it("only ever considers people already present in `ranked` (match-eligible by construction)", () => {
    // A person who is NOT match-eligible would simply never appear in `ranked`
    // in the first place (rankMatches filters that upstream) -- this function
    // has no separate eligibility check of its own, by design.
    const ineligiblePerson = rankedMatch({ personId: "p5", fieldIds: ["business"], overallMatch: 99, rawSimilarity: 0.99 });
    ineligiblePerson.person = { ...ineligiblePerson.person, isMatchEligible: false };
    const rankedWithoutP5 = ranked; // p5 was never added to `ranked`
    const match = selectInterestMatch(rankedWithoutP5, "building_discovery");
    expect(match?.personId).not.toBe("p5");
    expect(match?.personId).toBe("p1");
  });
});
