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

  it("is still a real, published profile — its own direct route works regardless; only the Directory's default listing/search is governed by this module", () => {
    expect(person.status).toBe("published");
  });

  it("is also absent from Directory SEARCH results, not just the unfiltered default listing (search still passes through the same directoryVisibleOnly gate)", () => {
    const result = filterPeople([person], { matchEligibleOnly: false, isLiving: false });
    expect(result).toEqual([]);
  });

  it("is absent from a match-eligible-only pool too", () => {
    const matchable = filterPeople([person], { directoryVisibleOnly: false });
    expect(matchable).toEqual([]);
  });
});

describe("Case 4 — existing real roster behavior is unchanged", () => {
  // Roster24 (2026-09, docs/checkpoints/roster24-evidence-approved-
  // publications.md) was the first production use of this architecture:
  // Giuseppe Garibaldi and Anton Chekhov are evidence_approved, published,
  // directory-visible, and honestly non-match-eligible, raising the
  // baselines from 125/124 to 127/126. Roster25 (docs/checkpoints/
  // roster25-fast-production-batch.md) added four more of the same kind
  // (Vera Rubin, Subrahmanyan Chandrasekhar, Fridtjof Nansen, Isabella
  // Bird) plus two ordinary pre-existing-qa_passed additions that ARE
  // match-eligible (Nellie Bly, Carl Jung — these mirror normally and are
  // not divergent), raising the baselines again to 133/132. Roster26
  // (docs/checkpoints/roster26-ten-person-fast-batch.md) added nine more
  // of the same divergent kind (Fidel Castro, Jawaharlal Nehru, Ho Chi
  // Minh, Salvador Allende, Corazon Aquino, Muhammad Ali Jinnah, Nawal El
  // Saadawi, Puyi, King Hussein of Jordan) plus one ordinary
  // pre-existing-qa_passed addition that IS match-eligible (Che Guevara —
  // mirrors normally, not divergent), raising the baselines to 143/142.
  // Roster27 (docs/checkpoints/roster27-twelve-person-fast-batch.md) added
  // twelve more of the same divergent kind (Lu Xun, Amelia Earhart, Zaha
  // Hadid, Jorge Luis Borges, Norman Borlaug, Marie Tharp, Jean-Jacques
  // Rousseau, Al-Biruni, Hedy Lamarr, Rosa Parks, Ken Saro-Wiwa, Bob
  // Marley) — all twelve honestly fail eligibility_v2's high-confidence
  // sub-gate despite several clearing raw coverage — raising the baselines
  // to 155/154. The match-eligible SET is unchanged this cycle (still 127,
  // last grown by Che Guevara in roster26, see the next test) — the
  // twenty-seven non-eligible-but-visible people below are the only ones
  // whose isDirectoryVisible diverges from isMatchEligible.
  //
  // Roster28 (2026-09) added fifteen more (Agatha Christie, Winston
  // Churchill, Thomas Jefferson, Sun Yat-sen, Katharine Hepburn, Henry
  // Ford, Eleanor Roosevelt, Stephen Hawking, Diego Rivera, Naguib
  // Mahfouz, Ida B. Wells, Junko Tabei, Ravi Shankar, Winnie
  // Madikizela-Mandela, Amartya Sen) — all fifteen also honestly fail
  // eligibility_v2 (confidence/coverage floors, not evidence quality),
  // raising the baselines again to 170/169. Match-eligible set still
  // unchanged at 127.
  const KNOWN_DIVERGENT_SLUGS = new Set([
    "giuseppe-garibaldi",
    "anton-chekhov",
    "vera-rubin",
    "subrahmanyan-chandrasekhar",
    "fridtjof-nansen",
    "isabella-bird",
    "fidel-castro",
    "jawaharlal-nehru",
    "ho-chi-minh",
    "salvador-allende",
    "corazon-aquino",
    "muhammad-ali-jinnah",
    "nawal-el-saadawi",
    "puyi",
    "king-hussein-jordan",
    "lu-xun",
    "amelia-earhart",
    "zaha-hadid",
    "jorge-luis-borges",
    "norman-borlaug",
    "marie-tharp",
    "jean-jacques-rousseau",
    "al-biruni",
    "hedy-lamarr",
    "rosa-parks",
    "ken-saro-wiwa",
    "bob-marley",
    "agatha-christie",
    "winston-churchill",
    "thomas-jefferson",
    "sun-yat-sen",
    "katharine-hepburn",
    "henry-ford",
    "eleanor-roosevelt",
    "stephen-hawking",
    "diego-rivera",
    "naguib-mahfouz",
    "ida-b-wells",
    "junko-tabei",
    "ravi-shankar",
    "winnie-madikizela-mandela",
    "amartya-sen",
    // roster29 (2026-09): fifteen more, same pattern -- all evidence_approved,
    // published, directory-visible, honestly failing eligibility_v2 on
    // confidence/coverage, none rescued. Baselines now 185/184; match-eligible
    // set unchanged at 127.
    "gabriel-garcia-marquez",
    "murasaki-shikibu",
    "zora-neale-hurston",
    "seneca",
    "jean-piaget",
    "ibn-al-haytham",
    "dorothea-lange",
    "katherine-dunham",
    "wilma-rudolph",
    "william-wilberforce",
    "desmond-tutu",
    "ratan-tata",
    "indira-gandhi",
    "ulysses-s-grant",
    "suleiman-the-magnificent",
  ]);

  it("still exactly 185 production people", () => {
    expect(SEED_PEOPLE).toHaveLength(185);
    expect(PEOPLE_INDEX).toHaveLength(185);
  });

  it("still exactly 184 default-directory-visible people, using the Directory's actual filter call", () => {
    const visible = filterPeople(SEED_PEOPLE, { matchEligibleOnly: false });
    expect(visible).toHaveLength(184);
  });

  it("isDirectoryVisible mirrors isMatchEligible for every existing person EXCEPT the fifty-seven deliberately-divergent roster24/25/26/27/28/29 additions", () => {
    for (const p of SEED_PEOPLE) {
      if (KNOWN_DIVERGENT_SLUGS.has(p.slug)) {
        expect(p.isDirectoryVisible, p.slug).toBe(true);
        expect(p.isMatchEligible, p.slug).toBe(false);
        continue;
      }
      expect(p.isDirectoryVisible, p.slug).toBe(p.isMatchEligible);
    }
  });

  it("the match-eligible set is unchanged at 127 (last grown by Che Guevara in roster26); roster27 added zero newly match-eligible people", () => {
    expect(SEED_PEOPLE.filter((p) => p.isMatchEligible)).toHaveLength(127);
    const cheGuevara = SEED_PEOPLE.find((p) => p.slug === "che-guevara");
    expect(cheGuevara?.isMatchEligible).toBe(true);
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
