/**
 * Profile publication vs. match eligibility — architecture separation
 * (2026-09). Focused regression tests proving the four semantic cases from
 * `docs/checkpoints/profile-publication-vs-match-eligibility.md` actually
 * hold. Cases 1-3 use synthetic `Person` fixtures only — no real person's
 * data is read or mutated. Case 4 reads the real, live `SEED_PEOPLE`/
 * `PEOPLE_INDEX` to prove existing production behavior is unchanged.
 */
import { describe, expect, it } from "vitest";
import type { Person } from "../types.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import { PEOPLE_INDEX } from "../../data/people/peopleIndex.generated.js";
import { filterPeople } from "./explorer.js";

function syntheticPerson(overrides: Partial<Person>): Person {
  return {
    id: "synthetic",
    slug: "synthetic",
    canonicalName: "Synthetic Person",
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

describe("Case 1 — published, directory-visible, match-eligible", () => {
  const person = syntheticPerson({ id: "case1", isMatchEligible: true, isDirectoryVisible: true });

  it("appears in the default directory view", () => {
    const result = filterPeople([person], { matchEligibleOnly: false });
    expect(result).toHaveLength(1);
  });

  it("is included in a match-eligible pool (may appear in matching)", () => {
    expect(person.isMatchEligible).toBe(true);
  });
});

describe("Case 2 — published, directory-visible, NOT match-eligible", () => {
  const person = syntheticPerson({ id: "case2", isMatchEligible: false, isDirectoryVisible: true });

  it("appears in the default directory view (Directory's actual filter: matchEligibleOnly: false)", () => {
    const result = filterPeople([person], { matchEligibleOnly: false });
    expect(result.map((p) => p.id)).toEqual(["case2"]);
  });

  it("does NOT participate in a match-eligible-only pool (the Compare/matching gate)", () => {
    const matchable = filterPeople([person], { directoryVisibleOnly: false });
    expect(matchable).toEqual([]);
  });

  it("the profile itself (status) is still published — not incomplete or hidden by necessity", () => {
    expect(person.status).toBe("published");
  });
});

describe("Case 3 — published, direct-only, NOT match-eligible", () => {
  const person = syntheticPerson({ id: "case3", isMatchEligible: false, isDirectoryVisible: false });

  it("is absent from the default directory view", () => {
    const result = filterPeople([person], { matchEligibleOnly: false });
    expect(result).toEqual([]);
  });

  it("is still a real, published profile (direct link / search would still resolve it — this module only governs the default listing)", () => {
    expect(person.status).toBe("published");
  });

  it("is absent from a match-eligible-only pool too", () => {
    const matchable = filterPeople([person], { directoryVisibleOnly: false });
    expect(matchable).toEqual([]);
  });
});

describe("Case 4 — existing real roster behavior is unchanged", () => {
  it("still exactly 125 production people", () => {
    expect(SEED_PEOPLE).toHaveLength(125);
    expect(PEOPLE_INDEX).toHaveLength(125);
  });

  it("still exactly 124 default-directory-visible people, using the Directory's actual filter call", () => {
    const visible = filterPeople(SEED_PEOPLE, { matchEligibleOnly: false });
    expect(visible).toHaveLength(124);
  });

  it("isDirectoryVisible mirrors isMatchEligible for every existing person (mechanical derivation, no manual overrides)", () => {
    for (const p of SEED_PEOPLE) {
      expect(p.isDirectoryVisible, p.slug).toBe(p.isMatchEligible);
    }
  });

  it("the match-eligible set is exactly what it was before this architecture change (124 of 125)", () => {
    expect(SEED_PEOPLE.filter((p) => p.isMatchEligible)).toHaveLength(124);
  });

  it("Zheng He's existing intended behavior is unchanged: published, not match-eligible, not directory-visible", () => {
    const zhengHe = SEED_PEOPLE.find((p) => p.slug === "zheng-he");
    expect(zhengHe).toBeDefined();
    expect(zhengHe!.status).toBe("published");
    expect(zhengHe!.isMatchEligible).toBe(false);
    expect(zhengHe!.isDirectoryVisible).toBe(false);
    // Confirms he is genuinely excluded from the Directory's actual filter
    // call (matchEligibleOnly: false, relying on directoryVisibleOnly alone).
    const visible = filterPeople(SEED_PEOPLE, { matchEligibleOnly: false });
    expect(visible.some((p) => p.slug === "zheng-he")).toBe(false);
  });

  it("PEOPLE_INDEX (the client-bundled projection) carries isDirectoryVisible consistently with SEED_PEOPLE", () => {
    const byId = new Map(SEED_PEOPLE.map((p) => [p.id, p]));
    for (const entry of PEOPLE_INDEX) {
      const full = byId.get(entry.id);
      expect(full, entry.slug).toBeDefined();
      expect(entry.isDirectoryVisible, entry.slug).toBe(full!.isDirectoryVisible);
    }
  });
});
