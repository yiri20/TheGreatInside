import { describe, expect, it } from "vitest";
import type { Person } from "../types.js";
import { personDataFingerprint } from "./dataVersion.js";

function makePerson(id: string, overrides: Partial<Person> = {}): Person {
  return {
    id,
    slug: id,
    canonicalName: id,
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
    attributes: [
      { attributeId: "curiosity", score: 70, confidence: 0.8, evidenceType: "documented", impact: "neutral", sourceIds: [] },
    ],
    status: "published",
    isMatchEligible: true,
    overallProfileConfidence: 0.8,
    sources: [],
    doNotCopyKeys: [],
    ...overrides,
  };
}

describe("personDataFingerprint", () => {
  it("is deterministic: the same roster produces the same fingerprint every time", () => {
    const people = [makePerson("a"), makePerson("b")];
    expect(personDataFingerprint(people)).toBe(personDataFingerprint(people));
    expect(personDataFingerprint([...people])).toBe(personDataFingerprint(people));
  });

  it("is order-independent — re-ordering the ROSTER array must not change the fingerprint", () => {
    const a = makePerson("a");
    const b = makePerson("b");
    expect(personDataFingerprint([a, b])).toBe(personDataFingerprint([b, a]));
  });

  it("is order-independent — re-ordering one person's ATTRIBUTES array must not change the fingerprint", () => {
    const attrs = [
      { attributeId: "curiosity" as const, score: 70, confidence: 0.8, evidenceType: "documented" as const, impact: "neutral" as const, sourceIds: [] },
      { attributeId: "discipline" as const, score: 40, confidence: 0.7, evidenceType: "documented" as const, impact: "neutral" as const, sourceIds: [] },
    ];
    const forward = [makePerson("a", { attributes: attrs })];
    const reversed = [makePerson("a", { attributes: [...attrs].reverse() })];
    expect(personDataFingerprint(forward)).toBe(personDataFingerprint(reversed));
  });

  it("is order-independent — re-ordering one person's ARCHETYPEIDS array must not change the fingerprint", () => {
    const forward = [makePerson("a", { archetypeIds: ["independent_creator", "disciplined_builder"] })];
    const reversed = [makePerson("a", { archetypeIds: ["disciplined_builder", "independent_creator"] })];
    expect(personDataFingerprint(forward)).toBe(personDataFingerprint(reversed));
  });

  it("is immune to JS object property insertion order — semantically identical people built with differently-ordered object literals fingerprint the same", () => {
    const a: Person = {
      id: "a",
      slug: "a",
      canonicalName: "a",
      isMatchEligible: true,
      status: "published",
      overallProfileConfidence: 0.8,
      aliases: [],
      era: "contemporary",
      isLiving: false,
      nationalityCodes: [],
      regionCode: "test",
      occupationIds: [],
      fieldIds: [],
      impactDomains: [],
      tagIds: [],
      archetypeIds: [],
      sources: [],
      doNotCopyKeys: [],
      attributes: [{ attributeId: "curiosity", score: 70, confidence: 0.8, evidenceType: "documented", impact: "neutral", sourceIds: [] }],
    };
    const b = makePerson("a");
    expect(personDataFingerprint([a])).toBe(personDataFingerprint([b]));
  });

  it("changes when a person's score changes", () => {
    const before = [makePerson("a")];
    const after = [makePerson("a", { attributes: [{ ...before[0]!.attributes[0]!, score: 71 }] })];
    expect(personDataFingerprint(before)).not.toBe(personDataFingerprint(after));
  });

  it("changes when a person's confidence changes (even if score is unchanged)", () => {
    const before = [makePerson("a")];
    const after = [makePerson("a", { attributes: [{ ...before[0]!.attributes[0]!, confidence: 0.5 }] })];
    expect(personDataFingerprint(before)).not.toBe(personDataFingerprint(after));
  });

  it("changes when a person's impact changes", () => {
    const before = [makePerson("a")];
    const after = [makePerson("a", { attributes: [{ ...before[0]!.attributes[0]!, impact: "risk" }] })];
    expect(personDataFingerprint(before)).not.toBe(personDataFingerprint(after));
  });

  it("changes when a person is added", () => {
    const before = [makePerson("a")];
    const after = [makePerson("a"), makePerson("b")];
    expect(personDataFingerprint(before)).not.toBe(personDataFingerprint(after));
  });

  it("changes when a person is removed", () => {
    const before = [makePerson("a"), makePerson("b")];
    const after = [makePerson("a")];
    expect(personDataFingerprint(before)).not.toBe(personDataFingerprint(after));
  });

  it("changes when a person's eligibility changes", () => {
    const before = [makePerson("a", { isMatchEligible: true })];
    const after = [makePerson("a", { isMatchEligible: false })];
    expect(personDataFingerprint(before)).not.toBe(personDataFingerprint(after));
  });

  it("changes when a person's archetype assignments change (feeds Greatness's target-shrinkage)", () => {
    const before = [makePerson("a", { archetypeIds: ["independent_creator"] })];
    const after = [makePerson("a", { archetypeIds: ["disciplined_builder"] })];
    expect(personDataFingerprint(before)).not.toBe(personDataFingerprint(after));
  });

  it("does NOT change for presentation-only metadata edits — name, era, region, tags, sources, doNotCopyKeys", () => {
    const before = [makePerson("a")];
    const after = [
      makePerson("a", {
        canonicalName: "A Different Display Name",
        era: "medieval",
        regionCode: "somewhere-else",
        tagIds: ["new_tag"],
        sources: [{ id: "s1", kind: "wikipedia", title: "x" }],
        doNotCopyKeys: ["a.something"],
      }),
    ];
    expect(personDataFingerprint(before)).toBe(personDataFingerprint(after));
  });

  it("handles an empty roster without throwing", () => {
    expect(() => personDataFingerprint([])).not.toThrow();
    expect(typeof personDataFingerprint([])).toBe("string");
  });

  /**
   * Session 4 provenance audit: dispersion.generated.ts's DISPERSION_TABLE
   * regenerating (its weight VALUES changing, not DISPERSION_VERSION,
   * which is a hand-written literal that has never been bumped) was found
   * to be invisible to every existing provenance signal, even though those
   * weights are multiplied directly into similarity.ts's distance
   * computation and therefore can change a saved result's displayed
   * Match%. Fixed by widening this exact fingerprint (not a new, parallel
   * one) to also hash the dispersion table — these tests are the direct
   * regression guard for that fix, using dependency injection (the
   * function's second, defaulted parameter) to prove the fingerprint
   * genuinely responds to the table without needing to mutate the real
   * generated file.
   */
  describe("dispersion-table sensitivity (session 4 provenance fix)", () => {
    it("changes when a dispersion weight changes, roster held fixed", () => {
      const people = [makePerson("a")];
      const before = personDataFingerprint(people, { curiosity: 1.0 });
      const after = personDataFingerprint(people, { curiosity: 1.2 });
      expect(before).not.toBe(after);
    });

    it("changes when a dispersion table gains or loses an attribute entry", () => {
      const people = [makePerson("a")];
      const before = personDataFingerprint(people, { curiosity: 1.0 });
      const after = personDataFingerprint(people, { curiosity: 1.0, discipline: 0.9 });
      expect(before).not.toBe(after);
    });

    it("is order-independent for the dispersion table's own key order", () => {
      const people = [makePerson("a")];
      const forward = personDataFingerprint(people, { curiosity: 1.0, discipline: 0.9 });
      const reversed = personDataFingerprint(people, { discipline: 0.9, curiosity: 1.0 });
      expect(forward).toBe(reversed);
    });

    it("defaults to the real, live DISPERSION_TABLE when no table is passed — always current by construction", () => {
      // Confirms the default-parameter wiring actually reaches the real
      // generated table, not an empty/stub object — the whole point of
      // this fix is that ordinary call sites (personDataFingerprint(people)
      // with one argument) need no change to pick up dispersion drift.
      const people = [makePerson("a")];
      const withExplicitEmptyTable = personDataFingerprint(people, {});
      const withDefaultLiveTable = personDataFingerprint(people);
      expect(withDefaultLiveTable).not.toBe(withExplicitEmptyTable);
    });

    it("the fingerprint algorithm tag was bumped (person_data_v1 -> v2) so a pre-widening stored value can never coincidentally match a post-widening one", () => {
      const fp = personDataFingerprint([makePerson("a")], { curiosity: 1.0 });
      expect(fp.startsWith("person_data_v3:")).toBe(true);
    });
  });

  /**
   * Session 5 provenance audit (Part B): the analogous gap to session 4's
   * dispersion-table fix — MATCH_CALIBRATION_ANCHORS/GREATNESS_CALIBRATION_
   * ANCHORS directly determine a saved result's displayed Match%/Greatness
   * score (calibrateMatch/calibrateGreatness are pure functions of these
   * tables), but CALIBRATION_VERSION is a hand-written literal that session
   * 4 itself refreshed the anchor DATA without bumping. Fixed by widening
   * this same fingerprint further, with the same DI-parameter pattern.
   */
  describe("calibration-anchor sensitivity (session 5 provenance fix)", () => {
    const anchors: ReadonlyArray<readonly [number, number]> = [
      [0, 1],
      [0.5, 50],
      [1, 99],
    ];
    const shiftedAnchors: ReadonlyArray<readonly [number, number]> = [
      [0, 1],
      [0.52, 50],
      [1, 99],
    ];

    it("changes when the match-calibration anchor table changes, everything else held fixed", () => {
      const people = [makePerson("a")];
      const before = personDataFingerprint(people, { curiosity: 1.0 }, anchors, anchors);
      const after = personDataFingerprint(people, { curiosity: 1.0 }, shiftedAnchors, anchors);
      expect(before).not.toBe(after);
    });

    it("changes when the greatness-calibration anchor table changes, everything else held fixed", () => {
      const people = [makePerson("a")];
      const before = personDataFingerprint(people, { curiosity: 1.0 }, anchors, anchors);
      const after = personDataFingerprint(people, { curiosity: 1.0 }, anchors, shiftedAnchors);
      expect(before).not.toBe(after);
    });

    it("defaults to the real, live calibration anchor tables when none are passed", () => {
      const people = [makePerson("a")];
      const withExplicitStubAnchors = personDataFingerprint(people, { curiosity: 1.0 }, anchors, anchors);
      const withDefaultLiveAnchors = personDataFingerprint(people, { curiosity: 1.0 });
      expect(withDefaultLiveAnchors).not.toBe(withExplicitStubAnchors);
    });

    it("the fingerprint algorithm tag was bumped again (person_data_v2 -> v3) for this second widening", () => {
      const fp = personDataFingerprint([makePerson("a")], { curiosity: 1.0 }, anchors, anchors);
      expect(fp.startsWith("person_data_v3:")).toBe(true);
    });
  });
});
