import { describe, expect, it } from "vitest";
import type { Person, PersonEditorialItem } from "../types.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import { personTraitExplanationItem } from "./traitExplanation.js";

const person = (slug: string): Person => {
  const p = SEED_PEOPLE.find((x) => x.slug === slug);
  if (!p) throw new Error(`missing seed person ${slug}`);
  return p;
};

/** Only `editorial` is read by the function under test — a minimal fixture
 *  covering just that field, per this project's own precedent for narrow
 *  pure-function fixtures (see PortraitCredit's `basePortrait` in ui.test.ts). */
function fixture(editorial: Person["editorial"]): Person {
  return { editorial } as unknown as Person;
}

const item = (overrides: Partial<PersonEditorialItem>): PersonEditorialItem => ({
  id: overrides.id ?? "fixture-item",
  textKey: "fixture.text",
  ...overrides,
});

describe("personTraitExplanationItem", () => {
  it("returns undefined when the person has no editorial content at all", () => {
    expect(personTraitExplanationItem(fixture(undefined), "curiosity")).toBeUndefined();
  });

  it("returns undefined when no item references the requested attribute", () => {
    const p = fixture({
      achievements: [item({ attributeId: "discipline", interpretationKey: "x" })],
      moments: [],
      turningPoints: [],
    });
    expect(personTraitExplanationItem(p, "curiosity")).toBeUndefined();
  });

  it("does NOT match an item whose attributeId matches but has no interpretationKey (fact-only item)", () => {
    const p = fixture({
      achievements: [item({ attributeId: "curiosity" })], // no interpretationKey
      moments: [],
      turningPoints: [],
    });
    expect(personTraitExplanationItem(p, "curiosity")).toBeUndefined();
  });

  it("finds a matching item in achievements", () => {
    const target = item({ id: "a-1", attributeId: "curiosity", interpretationKey: "a-1-interp" });
    const p = fixture({ achievements: [target], moments: [], turningPoints: [] });
    expect(personTraitExplanationItem(p, "curiosity")?.id).toBe("a-1");
  });

  it("prefers achievements over moments over turning points over complexities, in that order", () => {
    const p = fixture({
      achievements: [item({ id: "achievement", attributeId: "risk_tolerance", interpretationKey: "i1" })],
      moments: [item({ id: "moment", attributeId: "risk_tolerance", interpretationKey: "i2" })],
      turningPoints: [item({ id: "turning-point", attributeId: "risk_tolerance", interpretationKey: "i3" })],
      complexities: [item({ id: "complexity", attributeId: "risk_tolerance", interpretationKey: "i4" })],
    });
    expect(personTraitExplanationItem(p, "risk_tolerance")?.id).toBe("achievement");
  });

  it("falls through to a later category when an earlier one has no match for this attribute", () => {
    const p = fixture({
      achievements: [item({ id: "achievement", attributeId: "discipline", interpretationKey: "i1" })],
      moments: [item({ id: "moment", attributeId: "curiosity", interpretationKey: "i2" })],
      turningPoints: [],
    });
    expect(personTraitExplanationItem(p, "curiosity")?.id).toBe("moment");
  });

  it("real profile: Thomas Edison's planning_orientation achievement is findable", () => {
    // src/data/people/editorial.ts — thomas-edison.achievement.2 carries
    // attributeId "planning_orientation" + an interpretationKey.
    const edison = person("thomas-edison");
    const found = personTraitExplanationItem(edison, "planning_orientation");
    expect(found?.attributeId).toBe("planning_orientation");
    expect(found?.interpretationKey).toBeDefined();
  });

  it("real profile: an attribute with no tied episode on that person returns undefined, not a guess", () => {
    // Every seed person has far more scored attributes (up to 34) than
    // editorial items carrying an attributeId — find one whose editorial
    // content never references "aesthetic_sensitivity" and confirm it
    // stays undefined rather than falling back to any other item.
    const edison = person("thomas-edison");
    const referenced = new Set(
      [
        ...(edison.editorial?.achievements ?? []),
        ...(edison.editorial?.moments ?? []),
        ...(edison.editorial?.turningPoints ?? []),
        ...(edison.editorial?.complexities ?? []),
      ].map((i) => i.attributeId),
    );
    expect(referenced.has("aesthetic_sensitivity")).toBe(false);
    expect(personTraitExplanationItem(edison, "aesthetic_sensitivity")).toBeUndefined();
  });
});
