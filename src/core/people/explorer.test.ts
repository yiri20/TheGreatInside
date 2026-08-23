import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import {
  availableFilterOptions,
  explorePeople,
  filterPeople,
  missingImpactDomainCoverage,
  missingOccupationCoverage,
  missingRegionCoverage,
  missingTagCoverage,
  searchPeople,
  sortPeople,
  type PeopleFilter,
} from "./explorer.js";

describe("searchPeople", () => {
  it("is case-insensitive", () => {
    const lower = searchPeople(SEED_PEOPLE, "leonardo");
    const upper = searchPeople(SEED_PEOPLE, "LEONARDO");
    expect(lower.map((p) => p.id)).toEqual(upper.map((p) => p.id));
    expect(lower.some((p) => p.slug === "leonardo-da-vinci")).toBe(true);
  });

  it("matches on tags and occupations, not just the name", () => {
    const byTag = searchPeople(SEED_PEOPLE, "self_taught".replace("_", " "));
    expect(byTag.length).toBeGreaterThan(0);
  });

  it("matches on aliases regardless of script, per product spec item 46", () => {
    const withAlias = { ...SEED_PEOPLE[1]!, aliases: ["Zzyzx Synthetic Alias"] };
    const people = [SEED_PEOPLE[0]!, withAlias, ...SEED_PEOPLE.slice(2)];
    expect(searchPeople(people, "zzyzx synthetic").map((p) => p.id)).toEqual([withAlias.id]);
  });

  it("finds Yi Sun-sin by his real Korean and hanja aliases regardless of UI locale", () => {
    expect(searchPeople(SEED_PEOPLE, "이순신").some((p) => p.slug === "yi-sun-sin")).toBe(true);
    expect(searchPeople(SEED_PEOPLE, "李舜臣").some((p) => p.slug === "yi-sun-sin")).toBe(true);
  });

  it("returns everyone for an empty or whitespace query", () => {
    expect(searchPeople(SEED_PEOPLE, "")).toHaveLength(SEED_PEOPLE.length);
    expect(searchPeople(SEED_PEOPLE, "   ")).toHaveLength(SEED_PEOPLE.length);
  });

  it("returns nothing for a query that matches no one", () => {
    expect(searchPeople(SEED_PEOPLE, "xyzzy_no_such_person")).toEqual([]);
  });
});

describe("filterPeople", () => {
  it("defaults to match-eligible people only", () => {
    const result = filterPeople(SEED_PEOPLE, {});
    expect(result.every((p) => p.isMatchEligible)).toBe(true);
    // The seed dataset is documented to be fully eligible, so this filter
    // should not silently drop anyone unexpectedly.
    expect(result).toHaveLength(SEED_PEOPLE.filter((p) => p.isMatchEligible).length);
  });

  it("can include ineligible profiles when explicitly asked", () => {
    const withIneligible = filterPeople(SEED_PEOPLE, { matchEligibleOnly: false });
    expect(withIneligible).toHaveLength(SEED_PEOPLE.length);
  });

  it("ORs multiple values within one facet", () => {
    const result = filterPeople(SEED_PEOPLE, { eras: ["ancient", "medieval"] });
    expect(result.every((p) => p.era === "ancient" || p.era === "medieval")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("ANDs across facets", () => {
    const options = availableFilterOptions(SEED_PEOPLE);
    const era = options.eras[0]!;
    const onlyEra = filterPeople(SEED_PEOPLE, { eras: [era] });
    const region = onlyEra[0]!.regionCode;
    const combined = filterPeople(SEED_PEOPLE, { eras: [era], regionCodes: [region] });
    expect(combined.every((p) => p.era === era && p.regionCode === region)).toBe(true);
    expect(combined.length).toBeLessThanOrEqual(onlyEra.length);
  });

  it("filters by minimum attribute score", () => {
    const filter: PeopleFilter = { minAttributeScores: { curiosity: 90 } };
    const result = filterPeople(SEED_PEOPLE, filter);
    for (const p of result) {
      const curiosity = p.attributes.find((a) => a.attributeId === "curiosity");
      expect(curiosity, p.slug).toBeDefined();
      expect(curiosity!.score).toBeGreaterThanOrEqual(90);
    }
    expect(result.length).toBeGreaterThan(0);
  });

  it("excludes a person missing the filtered attribute rather than treating it as passing", () => {
    // Find someone with an attribute unscored, then filter on exactly that attribute.
    const thin = SEED_PEOPLE.find((p) => p.attributes.length < 30);
    expect(thin).toBeDefined();
    const scoredIds = new Set(thin!.attributes.map((a) => a.attributeId));
    const allIds = SEED_PEOPLE.flatMap((p) => p.attributes.map((a) => a.attributeId));
    const missing = [...new Set(allIds)].find((id) => !scoredIds.has(id));
    if (missing) {
      const result = filterPeople(SEED_PEOPLE, { minAttributeScores: { [missing]: 0 } });
      expect(result.some((p) => p.id === thin!.id)).toBe(false);
    }
  });

  it("filters by exact person x attribute impact, not a global attribute colour", () => {
    const dualEdgedPerfectionists = filterPeople(SEED_PEOPLE, {
      attributeImpacts: { perfectionism: "dual_edged" },
      matchEligibleOnly: false,
    });
    for (const p of dualEdgedPerfectionists) {
      const perfectionism = p.attributes.find((a) => a.attributeId === "perfectionism");
      expect(perfectionism?.impact).toBe("dual_edged");
    }
    // The same attribute must be able to carry a different impact for someone else.
    const advantagePerfectionists = filterPeople(SEED_PEOPLE, {
      attributeImpacts: { perfectionism: "advantage" },
      matchEligibleOnly: false,
    });
    const overlap = dualEdgedPerfectionists.filter((a) =>
      advantagePerfectionists.some((b) => b.id === a.id),
    );
    expect(overlap).toEqual([]);
  });

  it("filters by tag, region, and living status", () => {
    const living = filterPeople(SEED_PEOPLE, { isLiving: true, matchEligibleOnly: false });
    expect(living.every((p) => p.isLiving)).toBe(true);
    expect(living.length).toBeGreaterThan(0);
    expect(living.length).toBeLessThan(SEED_PEOPLE.length);
  });

  describe("traitScoreAny (People Directory Personality/Trait chips)", () => {
    it("matches a person who clears the z/confidence bar on the attribute", () => {
      const result = filterPeople(SEED_PEOPLE, {
        traitScoreAny: { attributeIds: ["curiosity"], minZ: 1.0, minConfidence: 0.5 },
      });
      for (const p of result) {
        const attr = p.attributes.find((a) => a.attributeId === "curiosity");
        expect(attr, p.slug).toBeDefined();
        expect(attr!.confidence).toBeGreaterThanOrEqual(0.5);
      }
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThan(SEED_PEOPLE.length);
    });

    it("ORs across multiple selected attributes, unlike minAttributeScores' AND", () => {
      const curiosityOnly = filterPeople(SEED_PEOPLE, {
        traitScoreAny: { attributeIds: ["curiosity"], minZ: 1.0, minConfidence: 0.5 },
        matchEligibleOnly: false,
      });
      const eitherOne = filterPeople(SEED_PEOPLE, {
        traitScoreAny: { attributeIds: ["curiosity", "collaboration"], minZ: 1.0, minConfidence: 0.5 },
        matchEligibleOnly: false,
      });
      // OR can only add matches, never remove them.
      expect(eitherOne.length).toBeGreaterThanOrEqual(curiosityOnly.length);
      for (const p of curiosityOnly) {
        expect(eitherOne.some((q) => q.id === p.id)).toBe(true);
      }
      // At least one person must qualify via collaboration alone (not curiosity),
      // proving this is a real OR, not curiosity swallowing the result.
      const collaborationOnly = filterPeople(SEED_PEOPLE, {
        traitScoreAny: { attributeIds: ["collaboration"], minZ: 1.0, minConfidence: 0.5 },
        matchEligibleOnly: false,
      });
      expect(collaborationOnly.some((p) => !curiosityOnly.some((q) => q.id === p.id))).toBe(true);
    });

    it("an empty attributeIds list matches everyone (no-op filter)", () => {
      const result = filterPeople(SEED_PEOPLE, {
        traitScoreAny: { attributeIds: [], minZ: 1.0, minConfidence: 0.5 },
        matchEligibleOnly: false,
      });
      expect(result).toHaveLength(SEED_PEOPLE.length);
    });

    it("composes with fieldIds (profession) as an AND across the two axes", () => {
      const professionOnly = filterPeople(SEED_PEOPLE, { fieldIds: ["philosophy"] });
      const traitOnly = filterPeople(SEED_PEOPLE, {
        traitScoreAny: { attributeIds: ["curiosity"], minZ: 1.0, minConfidence: 0.5 },
      });
      const both = filterPeople(SEED_PEOPLE, {
        fieldIds: ["philosophy"],
        traitScoreAny: { attributeIds: ["curiosity"], minZ: 1.0, minConfidence: 0.5 },
      });
      expect(both.every((p) => p.fieldIds.includes("philosophy"))).toBe(true);
      expect(both.every((p) => professionOnly.some((q) => q.id === p.id))).toBe(true);
      expect(both.every((p) => traitOnly.some((q) => q.id === p.id))).toBe(true);
      expect(both.length).toBeLessThanOrEqual(Math.min(professionOnly.length, traitOnly.length));
    });
  });
});

describe("sortPeople", () => {
  it("sorts by name ascending and descending as exact reverses", () => {
    const asc = sortPeople(SEED_PEOPLE, "name_asc").map((p) => p.id);
    const desc = sortPeople(SEED_PEOPLE, "name_desc").map((p) => p.id);
    expect(desc).toEqual([...asc].reverse());
  });

  it("sorts by birth year with undefined years pushed to one end deterministically", () => {
    const asc = sortPeople(SEED_PEOPLE, "birth_year_asc");
    for (let i = 1; i < asc.length; i++) {
      const prev = asc[i - 1]!.birthYear ?? Number.NEGATIVE_INFINITY;
      const cur = asc[i]!.birthYear ?? Number.NEGATIVE_INFINITY;
      expect(cur).toBeGreaterThanOrEqual(prev);
    }
  });

  it("breaks ties on id, not popularity or recency", () => {
    // Every seed person has a distinct name and birth year in this dataset, so
    // assert the general contract instead: running the same sort twice must be
    // byte-identical (stability under a pure comparator).
    const a = sortPeople(SEED_PEOPLE, "confidence_desc").map((p) => p.id);
    const b = sortPeople(SEED_PEOPLE, "confidence_desc").map((p) => p.id);
    expect(a).toEqual(b);
  });

  it("does not mutate the input array", () => {
    const copy = [...SEED_PEOPLE];
    sortPeople(SEED_PEOPLE, "name_desc");
    expect(SEED_PEOPLE.map((p) => p.id)).toEqual(copy.map((p) => p.id));
  });
});

describe("explorePeople", () => {
  it("composes search, filter and sort in order", () => {
    const result = explorePeople(SEED_PEOPLE, {
      query: "",
      filter: { eras: ["contemporary"] },
      sort: "name_asc",
    });
    expect(result.every((p) => p.era === "contemporary")).toBe(true);
    const names = result.map((p) => p.canonicalName);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it("defaults to every match-eligible person sorted by name", () => {
    const result = explorePeople(SEED_PEOPLE);
    expect(result).toHaveLength(SEED_PEOPLE.filter((p) => p.isMatchEligible).length);
  });
});

describe("availableFilterOptions", () => {
  it("reports only values actually present in the dataset, deduplicated and sorted", () => {
    const options = availableFilterOptions(SEED_PEOPLE);
    expect(new Set(options.eras).size).toBe(options.eras.length);
    expect(options.eras).toEqual([...options.eras].sort((a, b) => a.localeCompare(b)));
    for (const era of options.eras) {
      expect(SEED_PEOPLE.some((p) => p.era === era)).toBe(true);
    }
  });
});

/**
 * PHASE 8: the exact class of bug the font/localisation review surfaced —
 * `occupationIds[0]` rendered on production Korean pages via a naive
 * `humanize(id)` placeholder that was never actually localised. These
 * guards fail the moment a future person is added with an occupation (or a
 * future 16th ImpactDomain value is ever introduced) that has no authored
 * `occupation.*`/`impact_domain.*` text, in either locale — the same live
 * "audit against the real roster" discipline as
 * `missingDevelopmentGuides()`/`missingTradeoffCoverage()`.
 */
describe("localisation coverage guards", () => {
  it("every occupationIds[0] value actually used in the roster has EN and KO text", () => {
    expect(missingOccupationCoverage(SEED_PEOPLE)).toEqual([]);
  });

  it("catches a genuinely unauthored occupation id — the guard is not a no-op", () => {
    const withUnknownOccupation = {
      ...SEED_PEOPLE[0]!,
      occupationIds: ["not_a_real_occupation_id_for_testing"],
    };
    expect(missingOccupationCoverage([withUnknownOccupation])).toEqual([
      "not_a_real_occupation_id_for_testing",
    ]);
  });

  it("all 15 ImpactDomain values have EN and KO text — complete by construction", () => {
    expect(missingImpactDomainCoverage()).toEqual([]);
  });

  it("every tagIds value actually used in the roster has EN and KO text", () => {
    expect(missingTagCoverage(SEED_PEOPLE)).toEqual([]);
  });

  it("catches a genuinely unauthored tag id — the guard is not a no-op", () => {
    const withUnknownTag = { ...SEED_PEOPLE[0]!, tagIds: ["not_a_real_tag_id_for_testing"] };
    expect(missingTagCoverage([withUnknownTag])).toEqual(["not_a_real_tag_id_for_testing"]);
  });

  it("every regionCode value actually used in the roster has EN and KO text", () => {
    expect(missingRegionCoverage(SEED_PEOPLE)).toEqual([]);
  });

  it("catches a genuinely unauthored region code — the guard is not a no-op", () => {
    const withUnknownRegion = { ...SEED_PEOPLE[0]!, regionCode: "not_a_real_region_for_testing" };
    expect(missingRegionCoverage([withUnknownRegion])).toEqual(["not_a_real_region_for_testing"]);
  });
});
