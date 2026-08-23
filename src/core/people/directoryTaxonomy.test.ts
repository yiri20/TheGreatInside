import { describe, expect, it } from "vitest";
import { ATTRIBUTE_IDS, ATTRIBUTES, FACETS, isAttributeId } from "../attributes/attributes.js";
import { en } from "../i18n/en.js";
import { ko } from "../i18n/ko.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import {
  DIRECTORY_FIELD_IDS,
  DIRECTORY_TRAIT_ATTRIBUTE_IDS,
  MAX_QUALIFYING_SHARE,
  MIN_CONFIDENT_N,
  MIN_QUALIFYING_SHARE,
  PERSONALITY_TAXONOMY,
  PROFESSION_CATEGORIES,
  missingProfessionFieldCoverage,
  personExhibitsTrait,
  traitQualification,
} from "./directoryTaxonomy.js";

describe("PROFESSION_CATEGORIES", () => {
  it("has no empty category", () => {
    for (const category of PROFESSION_CATEGORIES) {
      expect(category.fieldIds.length, category.id).toBeGreaterThan(0);
    }
  });

  it("has no duplicate fieldId across categories", () => {
    const seen = new Set<string>();
    for (const id of DIRECTORY_FIELD_IDS) {
      expect(seen.has(id), `${id} appears in more than one category`).toBe(false);
      seen.add(id);
    }
  });

  it("every curated fieldId actually exists in the live roster's fieldIds", () => {
    const rosterFieldIds = new Set(SEED_PEOPLE.flatMap((p) => p.fieldIds));
    for (const id of DIRECTORY_FIELD_IDS) {
      expect(rosterFieldIds.has(id), `${id} is not used by anyone in SEED_PEOPLE`).toBe(true);
    }
  });

  it("every fieldId used by >=2 people in the live roster is represented somewhere in the taxonomy", () => {
    // Independent re-derivation of the curation rule against live data — not
    // a mirror of the constant list, so roster growth that pushes a
    // currently-excluded fieldId over the 2-person floor is caught here.
    const counts = new Map<string, number>();
    for (const p of SEED_PEOPLE) {
      for (const id of p.fieldIds) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    const shouldBeCurated = [...counts.entries()].filter(([, count]) => count >= 2).map(([id]) => id);
    const curated = new Set(DIRECTORY_FIELD_IDS);
    for (const id of shouldBeCurated) {
      expect(curated.has(id), `${id} occurs for >=2 people but is not in any PROFESSION_CATEGORIES group`).toBe(
        true,
      );
    }
  });

  it("has EN and KO labels for every category and every curated fieldId", () => {
    for (const category of PROFESSION_CATEGORIES) {
      expect(en[category.labelKey], category.labelKey).toBeDefined();
      expect(ko[category.labelKey], category.labelKey).toBeDefined();
    }
    expect(missingProfessionFieldCoverage(en, ko)).toEqual([]);
  });

  it("catches a genuinely unauthored field id — the guard is not a no-op", () => {
    const partial: Record<string, string> = { ...en };
    delete partial[`field.${DIRECTORY_FIELD_IDS[0]}`];
    expect(missingProfessionFieldCoverage(partial, ko)).toEqual([DIRECTORY_FIELD_IDS[0]]);
  });
});

describe("PERSONALITY_TAXONOMY", () => {
  it("covers every facet exactly once, in FACETS order", () => {
    expect(PERSONALITY_TAXONOMY.map((g) => g.facet)).toEqual([...FACETS]);
  });

  it("has no empty group and no duplicate attributeId across groups", () => {
    const seen = new Set<string>();
    for (const group of PERSONALITY_TAXONOMY) {
      expect(group.attributeIds.length, group.facet).toBeGreaterThan(0);
      for (const id of group.attributeIds) {
        expect(seen.has(id), `${id} appears in more than one personality group`).toBe(false);
        seen.add(id);
        expect(isAttributeId(id), `${id} is not a real AttributeId`).toBe(true);
      }
    }
  });

  it("every curated attribute belongs to the facet its group claims", () => {
    // isAttributeId() confirms it's a real id; this confirms the taxonomy
    // didn't accidentally file an attribute under the wrong facet heading.
    for (const group of PERSONALITY_TAXONOMY) {
      for (const id of group.attributeIds) {
        expect(ATTRIBUTES[id].facet, id).toBe(group.facet);
      }
    }
  });

  it("has EN and KO labels for every facet heading and every curated attribute", () => {
    for (const group of PERSONALITY_TAXONOMY) {
      expect(en[group.labelKey], group.labelKey).toBeDefined();
      expect(ko[group.labelKey], group.labelKey).toBeDefined();
    }
    for (const id of DIRECTORY_TRAIT_ATTRIBUTE_IDS) {
      expect(en[`attribute.${id}`], id).toBeDefined();
      expect(ko[`attribute.${id}`], id).toBeDefined();
    }
  });

  it("every curated attribute is currently within the qualifying band against the live roster", () => {
    // Guards against roster drift silently invalidating the curation: if a
    // change to SEED_PEOPLE pushes an attribute's qualifying share outside
    // [MIN_QUALIFYING_SHARE, MAX_QUALIFYING_SHARE], or its confidently-scored
    // count below MIN_CONFIDENT_N, this fails — a signal to re-curate, not
    // silently ship a now-degenerate filter chip (near-empty or near-universal).
    for (const id of DIRECTORY_TRAIT_ATTRIBUTE_IDS) {
      const { qualifyingShare, confidentN } = traitQualification(SEED_PEOPLE, id);
      expect(confidentN, id).toBeGreaterThanOrEqual(MIN_CONFIDENT_N);
      expect(qualifyingShare, id).toBeGreaterThanOrEqual(MIN_QUALIFYING_SHARE);
      expect(qualifyingShare, id).toBeLessThanOrEqual(MAX_QUALIFYING_SHARE);
    }
  });

  it("excludes near-universal attributes in this roster (independent_thinking, persistence)", () => {
    // Documents WHY these two, among the most product-relevant sounding
    // trait names, are deliberately absent from the curated set.
    expect(DIRECTORY_TRAIT_ATTRIBUTE_IDS).not.toContain("independent_thinking");
    expect(DIRECTORY_TRAIT_ATTRIBUTE_IDS).not.toContain("persistence");
    const independent = traitQualification(SEED_PEOPLE, "independent_thinking");
    const persistence = traitQualification(SEED_PEOPLE, "persistence");
    expect(independent.qualifyingShare).toBeGreaterThan(MAX_QUALIFYING_SHARE);
    expect(persistence.qualifyingShare).toBeGreaterThan(MAX_QUALIFYING_SHARE);
  });
});

describe("personExhibitsTrait", () => {
  it("is deterministic: same person, same attribute, same answer every time", () => {
    const person = SEED_PEOPLE.find((p) => p.attributes.some((a) => a.attributeId === "curiosity"))!;
    const first = personExhibitsTrait(person, "curiosity");
    const second = personExhibitsTrait(person, "curiosity");
    expect(first).toBe(second);
  });

  it("returns false for a low-confidence score even if the raw score is high", () => {
    const person = SEED_PEOPLE.find((p) => p.attributes.some((a) => a.attributeId === "curiosity"))!;
    const lowConfidence = {
      ...person,
      attributes: person.attributes.map((a) => (a.attributeId === "curiosity" ? { ...a, score: 99, confidence: 0.1 } : a)),
    };
    expect(personExhibitsTrait(lowConfidence, "curiosity")).toBe(false);
  });

  it("returns false when the attribute isn't scored for this person at all", () => {
    const person = SEED_PEOPLE.find((p) => p.attributes.some((a) => a.attributeId === "curiosity"))!;
    const withoutCuriosity = { ...person, attributes: person.attributes.filter((a) => a.attributeId !== "curiosity") };
    expect(personExhibitsTrait(withoutCuriosity, "curiosity")).toBe(false);
  });
});

describe("attribute coverage sanity (all 34, not just curated)", () => {
  it("every canonical attribute has EN/KO labels — a precondition for any future curation change", () => {
    for (const id of ATTRIBUTE_IDS) {
      expect(en[`attribute.${id}`], id).toBeDefined();
      expect(ko[`attribute.${id}`], id).toBeDefined();
    }
  });
});
