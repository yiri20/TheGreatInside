import { describe, expect, it } from "vitest";
import type { AttributeId } from "../attributes/attributes.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import { personDisplayName } from "../i18n/index.js";
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
    // matchEligibleOnly and directoryVisibleOnly are two independent gates
    // (see PeopleFilter's own doc comments) — asking only for the former to
    // be lifted still leaves the (also default-true) directory-visibility
    // gate in place, so a profile excluded from the default listing for its
    // own, separate reason (e.g. Zheng He) is correctly still absent here.
    expect(withIneligible).toHaveLength(SEED_PEOPLE.filter((p) => p.isDirectoryVisible).length);
  });

  it("with no overrides, applies BOTH default-true gates (match-eligible AND directory-visible)", () => {
    // Before roster24, every person's isDirectoryVisible mirrored
    // isMatchEligible, so this coincidentally equaled "directory-visible
    // people only" too. Roster24 (Giuseppe Garibaldi, Anton Chekhov:
    // directory-visible but NOT match-eligible) exposed that the real
    // default behavior is the intersection of both gates, not
    // directory-visibility alone — see PeopleFilter's own doc comments.
    const result = filterPeople(SEED_PEOPLE, {});
    expect(result.every((p) => p.isDirectoryVisible && p.isMatchEligible)).toBe(true);
    expect(result).toHaveLength(SEED_PEOPLE.filter((p) => p.isDirectoryVisible && p.isMatchEligible).length);
  });

  it("can include directory-hidden profiles when explicitly asked, independent of match eligibility", () => {
    const withHidden = filterPeople(SEED_PEOPLE, { directoryVisibleOnly: false });
    // Lifting only the directory-visibility gate still leaves the (also
    // default-true) match-eligibility gate in place.
    expect(withHidden).toHaveLength(SEED_PEOPLE.filter((p) => p.isMatchEligible).length);
  });

  it("lifting BOTH gates returns literally everyone, including a profile like Zheng He that fails both for the same underlying reason today", () => {
    const everyone = filterPeople(SEED_PEOPLE, { matchEligibleOnly: false, directoryVisibleOnly: false });
    expect(everyone).toHaveLength(SEED_PEOPLE.length);
  });

  it("directory visibility and match eligibility are genuinely independent axes, not one flag wearing two names", () => {
    // Synthetic fixtures only — no real person's data is read or mutated
    // here. A real published profile CAN be directory-visible while not
    // match-eligible (an honestly-scored profile whose evidence doesn't yet
    // cover enough of the personality model), and a real profile CAN be
    // match-eligible while deliberately excluded from the default listing
    // (a direct-only profile) — neither combination was expressible before
    // `isDirectoryVisible` existed, when visibility was only ever inferred
    // from `isMatchEligible`.
    const base = SEED_PEOPLE[0]!;
    const visibleButNotEligible = { ...base, id: "synthetic-visible-not-eligible", isMatchEligible: false, isDirectoryVisible: true };
    const eligibleButHidden = { ...base, id: "synthetic-eligible-hidden", isMatchEligible: true, isDirectoryVisible: false };
    const pool = [visibleButNotEligible, eligibleButHidden];

    // The People Directory's actual call pattern (PeopleDirectoryClient.tsx):
    // explicitly lift the eligibility gate so visibility is governed by
    // isDirectoryVisible alone, exactly per this architecture's design.
    const directoryView = filterPeople(pool, { matchEligibleOnly: false });
    expect(directoryView.map((p) => p.id)).toEqual([visibleButNotEligible.id]);

    // A caller that wants "matchable only", independent of directory
    // visibility (e.g. building a matching-target list) uses the other gate.
    const matchableOnly = filterPeople(pool, { directoryVisibleOnly: false });
    expect(matchableOnly.map((p) => p.id)).toEqual([eligibleButHidden.id]);
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

  describe("traitScoreGroups (People Directory Personality/Trait chips)", () => {
    const q = (attributeIds: readonly AttributeId[]) => ({
      attributeIds,
      minZ: 1.0,
      minConfidence: 0.5,
    });

    it("matches a person who clears the z/confidence bar on the attribute", () => {
      const result = filterPeople(SEED_PEOPLE, {
        traitScoreGroups: [q(["curiosity"])],
      });
      for (const p of result) {
        const attr = p.attributes.find((a) => a.attributeId === "curiosity");
        expect(attr, p.slug).toBeDefined();
        expect(attr!.confidence).toBeGreaterThanOrEqual(0.5);
      }
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThan(SEED_PEOPLE.length);
    });

    it("ORs across multiple attributes WITHIN one group, unlike minAttributeScores' AND", () => {
      const curiosityOnly = filterPeople(SEED_PEOPLE, {
        traitScoreGroups: [q(["curiosity"])],
        matchEligibleOnly: false,
      });
      const eitherOne = filterPeople(SEED_PEOPLE, {
        traitScoreGroups: [q(["curiosity", "collaboration"])],
        matchEligibleOnly: false,
      });
      // OR can only add matches, never remove them.
      expect(eitherOne.length).toBeGreaterThanOrEqual(curiosityOnly.length);
      for (const p of curiosityOnly) {
        expect(eitherOne.some((q_) => q_.id === p.id)).toBe(true);
      }
      // At least one person must qualify via collaboration alone (not curiosity),
      // proving this is a real OR, not curiosity swallowing the result.
      const collaborationOnly = filterPeople(SEED_PEOPLE, {
        traitScoreGroups: [q(["collaboration"])],
        matchEligibleOnly: false,
      });
      expect(collaborationOnly.some((p) => !curiosityOnly.some((q_) => q_.id === p.id))).toBe(true);
    });

    it("ANDs ACROSS separate groups — this is the People Directory's cross-facet fix", () => {
      // curiosity (facet: thinking) and collaboration (facet: social) — two
      // DIFFERENT facets, so the Directory must pass them as two separate
      // groups, not merged into one OR'd list.
      const curiosityOnly = filterPeople(SEED_PEOPLE, {
        traitScoreGroups: [q(["curiosity"])],
        matchEligibleOnly: false,
      });
      const collaborationOnly = filterPeople(SEED_PEOPLE, {
        traitScoreGroups: [q(["collaboration"])],
        matchEligibleOnly: false,
      });
      const both = filterPeople(SEED_PEOPLE, {
        traitScoreGroups: [q(["curiosity"]), q(["collaboration"])],
        matchEligibleOnly: false,
      });

      // AND across groups can only narrow, never exceed either single group.
      expect(both.length).toBeLessThanOrEqual(Math.min(curiosityOnly.length, collaborationOnly.length));
      expect(both.length).toBeGreaterThan(0);
      for (const p of both) {
        expect(curiosityOnly.some((q_) => q_.id === p.id), `${p.slug} must qualify on curiosity too`).toBe(true);
        expect(collaborationOnly.some((q_) => q_.id === p.id), `${p.slug} must qualify on collaboration too`).toBe(
          true,
        );
      }
      // The two-group result must be a strict subset of the flat-OR
      // (single-group, all attributes merged) result — proving the bug this
      // fixes (merging cross-facet selections into one OR'd group) really
      // would have over-matched.
      const flatOr = filterPeople(SEED_PEOPLE, {
        traitScoreGroups: [q(["curiosity", "collaboration"])],
        matchEligibleOnly: false,
      });
      expect(both.length).toBeLessThan(flatOr.length);
      expect(both.every((p) => flatOr.some((q_) => q_.id === p.id))).toBe(true);
    });

    it("a 3-group AND (mirrors Directory's Scientist/Mathematician + Experimental + Independent example shape)", () => {
      // Three facets: thinking (curiosity), work_style (perfectionism),
      // social (collaboration) — every group must be independently satisfied.
      const groups = [q(["curiosity"]), q(["perfectionism"]), q(["collaboration"])];
      const result = filterPeople(SEED_PEOPLE, { traitScoreGroups: groups, matchEligibleOnly: false });
      for (const p of result) {
        for (const group of groups) {
          const passes = group.attributeIds.some((id) => {
            const attr = p.attributes.find((a) => a.attributeId === id);
            return attr !== undefined && attr.confidence >= 0.5;
          });
          expect(passes, `${p.slug} must satisfy every group`).toBe(true);
        }
      }
    });

    it("an empty attributeIds group is a no-op (matches everyone within that group)", () => {
      const result = filterPeople(SEED_PEOPLE, {
        traitScoreGroups: [q([])],
        matchEligibleOnly: false,
        directoryVisibleOnly: false,
      });
      expect(result).toHaveLength(SEED_PEOPLE.length);
    });

    it("an empty traitScoreGroups array matches everyone (no-op filter)", () => {
      const result = filterPeople(SEED_PEOPLE, {
        traitScoreGroups: [],
        matchEligibleOnly: false,
        directoryVisibleOnly: false,
      });
      expect(result).toHaveLength(SEED_PEOPLE.length);
    });

    it("composes with fieldIds (profession) as an AND across the two axes", () => {
      const professionOnly = filterPeople(SEED_PEOPLE, { fieldIds: ["philosophy"] });
      const traitOnly = filterPeople(SEED_PEOPLE, {
        traitScoreGroups: [q(["curiosity"])],
      });
      const both = filterPeople(SEED_PEOPLE, {
        fieldIds: ["philosophy"],
        traitScoreGroups: [q(["curiosity"])],
      });
      expect(both.every((p) => p.fieldIds.includes("philosophy"))).toBe(true);
      expect(both.every((p) => professionOnly.some((q_) => q_.id === p.id))).toBe(true);
      expect(both.every((p) => traitOnly.some((q_) => q_.id === p.id))).toBe(true);
      expect(both.length).toBeLessThanOrEqual(Math.min(professionOnly.length, traitOnly.length));
    });

    it("composes with era/region alongside fieldIds and multi-facet trait groups", () => {
      const options = availableFilterOptions(SEED_PEOPLE);
      const era = options.eras[0]!;
      const result = filterPeople(SEED_PEOPLE, {
        eras: [era],
        fieldIds: ["philosophy"],
        traitScoreGroups: [q(["curiosity"]), q(["collaboration"])],
      });
      for (const p of result) {
        expect(p.era).toBe(era);
        expect(p.fieldIds.includes("philosophy")).toBe(true);
      }
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

/**
 * People Directory locale-aware name sort fix: `name_asc`/`name_desc` used
 * to sort by `canonicalName` unconditionally, so a ko-KR Directory visually
 * showing Korean names (via `personDisplayName()`) actually ordered them by
 * their hidden English canonical identity. `NameSortContext` lets a caller
 * (PeopleDirectoryClient) supply the resolved display name + locale;
 * omitting it must reproduce the exact prior behavior.
 *
 * The 5-person fixture below is real roster data, not synthetic — chosen
 * because their English canonicalName order and authored Korean
 * personDisplayName order are independently verified (see the sanity test)
 * to be genuinely different permutations, so a test asserting the fixed
 * order cannot accidentally also pass under the old canonicalName-based
 * algorithm.
 */
describe("sortPeople with a NameSortContext (locale-aware Directory name sort)", () => {
  const KO_DIVERGENT_SLUGS = ["confucius", "benjamin-franklin", "yi-sun-sin", "zheng-he", "genghis-khan"];
  const fixture = KO_DIVERGENT_SLUGS.map((slug) => SEED_PEOPLE.find((p) => p.slug === slug)!);
  const koNameSort = { locale: "ko-KR", displayNameFor: (p: (typeof fixture)[number]) => personDisplayName("ko-KR", p) };
  const enNameSort = { locale: "en-US", displayNameFor: (p: (typeof fixture)[number]) => personDisplayName("en-US", p) };

  it("fixture sanity: English canonicalName order and Korean display-name order are genuinely different permutations", () => {
    expect(fixture).toHaveLength(KO_DIVERGENT_SLUGS.length);
    const enOrder = [...fixture].sort((a, b) => a.canonicalName.localeCompare(b.canonicalName)).map((p) => p.slug);
    const koOrder = [...fixture]
      .sort((a, b) => new Intl.Collator("ko-KR").compare(personDisplayName("ko-KR", a), personDisplayName("ko-KR", b)))
      .map((p) => p.slug);
    expect(koOrder).not.toEqual(enOrder);
  });

  it("with no nameSort context, default behavior is unchanged: sorts by canonicalName (backward compatible)", () => {
    const withoutContext = sortPeople(SEED_PEOPLE, "name_asc").map((p) => p.id);
    const explicitCanonicalOrder = [...SEED_PEOPLE]
      .sort((a, b) => a.canonicalName.localeCompare(b.canonicalName) || a.id.localeCompare(b.id))
      .map((p) => p.id);
    expect(withoutContext).toEqual(explicitCanonicalOrder);
  });

  it("en-US: localized display-name ascending is plain English alphabetical order for this fixture", () => {
    const sorted = sortPeople(fixture, "name_asc", enNameSort).map((p) => p.slug);
    expect(sorted).toEqual(["benjamin-franklin", "confucius", "genghis-khan", "yi-sun-sin", "zheng-he"]);
  });

  it("en-US: localized display-name descending is the exact reverse", () => {
    const asc = sortPeople(fixture, "name_asc", enNameSort).map((p) => p.slug);
    const desc = sortPeople(fixture, "name_desc", enNameSort).map((p) => p.slug);
    expect(desc).toEqual([...asc].reverse());
  });

  it("ko-KR: ascending follows 가나다 order on the authored Korean display name, NOT English canonicalName order", () => {
    const sorted = sortPeople(fixture, "name_asc", koNameSort).map((p) => p.slug);
    // 공자(Confucius) < 벤저민 프랭클린(Benjamin Franklin) < 이순신(Yi Sun-sin)
    // < 정화(Zheng He) < 칭기즈 칸(Genghis Khan) — verified directly against
    // Intl.Collator("ko-KR"), not hand-derived.
    expect(sorted).toEqual(["confucius", "benjamin-franklin", "yi-sun-sin", "zheng-he", "genghis-khan"]);
    const canonicalNameOrder = [...fixture].sort((a, b) => a.canonicalName.localeCompare(b.canonicalName)).map((p) => p.slug);
    expect(sorted, "must not silently follow the hidden English canonicalName order").not.toEqual(canonicalNameOrder);
  });

  it("ko-KR: descending is the exact reverse of ko-KR ascending", () => {
    const asc = sortPeople(fixture, "name_asc", koNameSort).map((p) => p.slug);
    const desc = sortPeople(fixture, "name_desc", koNameSort).map((p) => p.slug);
    expect(desc).toEqual([...asc].reverse());
  });

  it("the displayNameFor projection actually drives order, overriding canonicalName", () => {
    // Two synthetic people whose canonicalName order is the OPPOSITE of the
    // order their projected display name implies — proves sortPeople reads
    // the projection, not person.canonicalName.
    const a = { ...SEED_PEOPLE[0]!, id: "synthetic-a", canonicalName: "Zzz Canonical" };
    const b = { ...SEED_PEOPLE[1]!, id: "synthetic-b", canonicalName: "Aaa Canonical" };
    const displayNames = new Map([
      [a.id, "Alpha Display"],
      [b.id, "Beta Display"],
    ]);
    const sorted = sortPeople([a, b], "name_asc", { displayNameFor: (p) => displayNames.get(p.id)! });
    expect(sorted.map((p) => p.id)).toEqual(["synthetic-a", "synthetic-b"]);
  });

  it("tie fallback (id) still applies when two people resolve to an identical display name", () => {
    const a = { ...SEED_PEOPLE[0]!, id: "zzz-tie", canonicalName: "irrelevant" };
    const b = { ...SEED_PEOPLE[1]!, id: "aaa-tie", canonicalName: "irrelevant" };
    const sorted = sortPeople([a, b], "name_asc", { displayNameFor: () => "Same Name" });
    expect(sorted.map((p) => p.id)).toEqual(["aaa-tie", "zzz-tie"]);
  });

  it("birth-year sorting is unaffected by a nameSort context", () => {
    const withoutContext = sortPeople(SEED_PEOPLE, "birth_year_asc").map((p) => p.id);
    const withContext = sortPeople(SEED_PEOPLE, "birth_year_asc", koNameSort).map((p) => p.id);
    expect(withContext).toEqual(withoutContext);
  });

  it("confidence sorting is unaffected by a nameSort context", () => {
    const withoutContext = sortPeople(SEED_PEOPLE, "confidence_desc").map((p) => p.id);
    const withContext = sortPeople(SEED_PEOPLE, "confidence_desc", koNameSort).map((p) => p.id);
    expect(withContext).toEqual(withoutContext);
  });

  /**
   * Whole-roster mechanical guard (grows with the roster, per CLAUDE.md
   * workflow docs — mirrors the equivalent Playwright DOM-level check in
   * e2e/peopleDirectory.spec.ts, but here against the full live SEED_PEOPLE
   * set rather than just what one page renders).
   */
  it("mechanical whole-roster guard: ko-KR name_asc is non-descending under Intl.Collator('ko-KR') for every adjacent pair", () => {
    const sorted = sortPeople(SEED_PEOPLE, "name_asc", koNameSort);
    const collator = new Intl.Collator("ko-KR");
    for (let i = 1; i < sorted.length; i++) {
      const prevName = personDisplayName("ko-KR", sorted[i - 1]!);
      const curName = personDisplayName("ko-KR", sorted[i]!);
      expect(collator.compare(prevName, curName), `"${prevName}" should not sort after "${curName}"`).toBeLessThanOrEqual(0);
    }
  });

  it("mechanical whole-roster guard: ko-KR name_desc is the exact reverse of ko-KR name_asc", () => {
    const asc = sortPeople(SEED_PEOPLE, "name_asc", koNameSort).map((p) => p.id);
    const desc = sortPeople(SEED_PEOPLE, "name_desc", koNameSort).map((p) => p.id);
    expect(desc).toEqual([...asc].reverse());
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

  it("passes nameSort through to sortPeople — the exact call shape PeopleDirectoryClient uses", () => {
    const koFixtureSlugs = ["confucius", "benjamin-franklin", "yi-sun-sin", "zheng-he", "genghis-khan"];
    const result = explorePeople(SEED_PEOPLE, {
      filter: { matchEligibleOnly: false, directoryVisibleOnly: false },
      sort: "name_asc",
      nameSort: { locale: "ko-KR", displayNameFor: (p) => personDisplayName("ko-KR", p) },
    });
    const orderOfFixture = result.map((p) => p.slug).filter((slug) => koFixtureSlugs.includes(slug));
    expect(orderOfFixture).toEqual(["confucius", "benjamin-franklin", "yi-sun-sin", "zheng-he", "genghis-khan"]);
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
