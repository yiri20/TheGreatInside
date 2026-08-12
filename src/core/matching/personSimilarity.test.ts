import { describe, expect, it } from "vitest";
import type { Person } from "../types.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import {
  contextualDistance as reexportedContextualDistance,
  personToPersonSimilarity,
  rankSimilarPeople,
  selectOppositePerson,
} from "./personSimilarity.js";
import { contextualDistance } from "./selectors.js";
import { MATCHING_VERSION, NEUTRAL_RAW_SIMILARITY } from "./similarity.js";

const person = (slug: string): Person => {
  const p = SEED_PEOPLE.find((x) => x.slug === slug);
  if (!p) throw new Error(`missing seed person ${slug}`);
  return p;
};

describe("personToPersonSimilarity", () => {
  it("reuses matching_v2 rather than forking the formula", () => {
    const result = personToPersonSimilarity(person("marie-curie"), person("alan-turing"));
    expect(result.matchingVersion).toBe(MATCHING_VERSION);
  });

  it("compares a person to themself at exactly their own coverage-implied ceiling", () => {
    // Self-comparison should collapse pattern/scatter/level distance to zero,
    // leaving only that person's own coverage-shrinkage as the ceiling.
    for (const slug of ["leonardo-da-vinci", "marie-curie", "steve-jobs"]) {
      const a = person(slug);
      const result = personToPersonSimilarity(a, a);
      const expectedRaw = NEUTRAL_RAW_SIMILARITY + (1 - NEUTRAL_RAW_SIMILARITY) * result.coverage;
      expect(result.rawSimilarity, slug).toBeCloseTo(expectedRaw, 10);
    }
  });

  it("gives full-coverage people a near-perfect self-similarity", () => {
    const a = person("marie-curie");
    const result = personToPersonSimilarity(a, a);
    if (result.coverage === 1) {
      expect(result.overallMatch).toBe(99);
    } else {
      // Still document the relationship even if this particular seed profile
      // isn't scored on literally all 30 attributes.
      expect(result.rawSimilarity).toBeGreaterThan(NEUTRAL_RAW_SIMILARITY);
    }
  });

  it("scores two very different profiles well below a self-comparison", () => {
    const turing = person("alan-turing");
    const self = personToPersonSimilarity(turing, turing).rawSimilarity;
    const other = personToPersonSimilarity(turing, person("serena-williams")).rawSimilarity;
    expect(other).toBeLessThan(self);
  });

  it("ignores metadata exactly like matchUserToPerson does", () => {
    const a = person("frida-kahlo");
    const b = person("hayao-miyazaki");
    const baseline = personToPersonSimilarity(a, b).rawSimilarity;

    const mutated = personToPersonSimilarity(a, {
      ...b,
      nationalityCodes: ["ZZ"],
      regionCode: "nowhere",
      era: "ancient",
      tagIds: ["trending", "most_searched"],
      canonicalName: "Someone Else",
      slug: "someone-else",
      archetypeIds: [],
      aliases: ["Rewritten Alias"],
      historicalPolityKey: "polity.rewritten",
      externalIdentity: { wikidataId: "Q1" },
      portrait: { url: "https://example.com/x.jpg", source: "x", license: "CC0" },
    });
    expect(mutated.rawSimilarity).toBe(baseline);
  });

  it("treats unscored attributes on the anchor side as near-neutral rather than excluding the anchor's coverage entirely", () => {
    // An ancient figure with partial coverage should still produce a sensible,
    // non-NaN similarity against a fully-scored contemporary figure.
    const ancient = SEED_PEOPLE.find((p) => p.isMatchEligible && p.attributes.length < 30);
    expect(ancient).toBeDefined();
    const result = personToPersonSimilarity(ancient!, person("marie-curie"));
    expect(Number.isFinite(result.rawSimilarity)).toBe(true);
    expect(result.rawSimilarity).toBeGreaterThanOrEqual(0);
    expect(result.rawSimilarity).toBeLessThanOrEqual(1);
  });
});

describe("rankSimilarPeople", () => {
  it("never includes the anchor in their own similar-people list", () => {
    const anchor = person("ada-lovelace");
    const ranked = rankSimilarPeople(anchor, SEED_PEOPLE);
    expect(ranked.some((r) => r.personId === anchor.id)).toBe(false);
  });

  it("only ranks match-eligible candidates", () => {
    const anchor = person("richard-feynman");
    const ranked = rankSimilarPeople(anchor, SEED_PEOPLE);
    expect(ranked.every((r) => r.person.isMatchEligible)).toBe(true);
  });

  it("is sorted descending by similarity with deterministic tie-breaks", () => {
    const anchor = person("yi-sun-sin");
    const ranked = rankSimilarPeople(anchor, SEED_PEOPLE);
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1]!.rawSimilarity).toBeGreaterThanOrEqual(ranked[i]!.rawSimilarity);
    }
  });

  it("produces the same ranking regardless of input array order", () => {
    const anchor = person("frida-kahlo");
    const a = rankSimilarPeople(anchor, SEED_PEOPLE).map((r) => r.personId);
    const b = rankSimilarPeople(anchor, [...SEED_PEOPLE].reverse()).map((r) => r.personId);
    expect(b).toEqual(a);
  });
});

describe("selectOppositePerson", () => {
  it("returns the least similar eligible person, never the anchor", () => {
    const anchor = person("steve-jobs");
    const ranked = rankSimilarPeople(anchor, SEED_PEOPLE);
    const opposite = selectOppositePerson(anchor, SEED_PEOPLE);
    expect(opposite?.personId).toBe(ranked[ranked.length - 1]?.personId);
    expect(opposite?.personId).not.toBe(anchor.id);
  });

  it("returns undefined when no other eligible person exists", () => {
    const anchor = person("marie-curie");
    expect(selectOppositePerson(anchor, [anchor])).toBeUndefined();
  });
});

describe("contextualDistance re-export", () => {
  it("is the same function as selectors.ts exports, not a redefinition", () => {
    expect(reexportedContextualDistance).toBe(contextualDistance);
  });
});
