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
});
