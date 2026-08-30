import { describe, expect, it } from "vitest";
import { ATTRIBUTE_IDS, ATTRIBUTES, ATTRIBUTES_BY_FACET, FACETS, TAXONOMY_VERSION } from "./attributes.js";
import { en } from "../i18n/en.js";
import { ko } from "../i18n/ko.js";

// taxonomy_v1.1 (Phase 6.6) invariant guards — see CLAUDE.md "Phase 6.6" and
// docs/phase6.5b-taxonomy-quiz-design.md for the migration this locks in.

describe("taxonomy_v1.1 structural invariants", () => {
  it("is versioned as taxonomy_v1.1", () => {
    expect(TAXONOMY_VERSION).toBe("taxonomy_v1.1");
  });

  it("has exactly 34 canonical attributes", () => {
    expect(ATTRIBUTE_IDS.length).toBe(34);
  });

  it("has no duplicate attribute ids", () => {
    expect(new Set(ATTRIBUTE_IDS).size).toBe(ATTRIBUTE_IDS.length);
  });

  it("has exactly 7 facets, including the new world_sense facet", () => {
    expect(FACETS.length).toBe(7);
    expect(FACETS).toContain("world_sense");
  });

  it("assigns every attribute to a facet that exists in FACETS", () => {
    for (const id of ATTRIBUTE_IDS) {
      expect(FACETS, id).toContain(ATTRIBUTES[id].facet);
    }
  });

  it("has a complete, non-overlapping facet partition covering all 34 attributes", () => {
    const seen = new Set<string>();
    let total = 0;
    for (const facet of FACETS) {
      const ids = ATTRIBUTES_BY_FACET[facet];
      total += ids.length;
      for (const id of ids) {
        expect(seen.has(id), `${id} assigned to more than one facet`).toBe(false);
        seen.add(id);
      }
    }
    expect(total).toBe(34);
    expect(seen.size).toBe(34);
  });

  it("assigns the four taxonomy_v1.1 additions to their designed facets", () => {
    expect(ATTRIBUTES.opportunity_sensing.facet).toBe("world_sense");
    expect(ATTRIBUTES.resourcefulness.facet).toBe("world_sense");
    expect(ATTRIBUTES.proactive_agency.facet).toBe("world_sense");
    expect(ATTRIBUTES.belief_updating.facet).toBe("thinking");
  });

  it("retains all 30 taxonomy_v1 attributes unmodified in shape and reference", () => {
    // Locks the migration promise: the original 30 keep their id, facet,
    // contributionShape, and reference exactly as taxonomy_v1 shipped them.
    const original: Record<string, { facet: string; shape: string; mean: number; sd: number }> = {
      curiosity: { facet: "thinking", shape: "higher_can_help", mean: 55, sd: 17 },
      analytical_rigor: { facet: "thinking", shape: "balanced", mean: 52, sd: 18 },
      intuitive_synthesis: { facet: "thinking", shape: "contextual", mean: 50, sd: 17 },
      systems_abstraction: { facet: "thinking", shape: "cluster_dependent", mean: 50, sd: 18 },
      independent_thinking: { facet: "thinking", shape: "higher_can_help", mean: 50, sd: 18 },
      creative_originality: { facet: "creativity", shape: "cluster_dependent", mean: 50, sd: 18 },
      experimentation: { facet: "creativity", shape: "higher_can_help", mean: 50, sd: 17 },
      cross_domain_range: { facet: "creativity", shape: "contextual", mean: 48, sd: 18 },
      aesthetic_sensitivity: { facet: "creativity", shape: "contextual", mean: 50, sd: 19 },
      discipline: { facet: "work_style", shape: "higher_can_help", mean: 55, sd: 17 },
      deep_focus: { facet: "work_style", shape: "higher_can_help", mean: 52, sd: 18 },
      detail_orientation: { facet: "work_style", shape: "contextual", mean: 52, sd: 18 },
      perfectionism: { facet: "work_style", shape: "balanced", mean: 52, sd: 19 },
      execution_speed: { facet: "work_style", shape: "balanced", mean: 50, sd: 17 },
      planning_orientation: { facet: "work_style", shape: "contextual", mean: 52, sd: 18 },
      persistence: { facet: "resilience", shape: "higher_can_help", mean: 55, sd: 17 },
      adaptability: { facet: "resilience", shape: "higher_can_help", mean: 53, sd: 17 },
      risk_tolerance: { facet: "resilience", shape: "cluster_dependent", mean: 48, sd: 19 },
      ambiguity_tolerance: { facet: "resilience", shape: "higher_can_help", mean: 48, sd: 18 },
      decisiveness: { facet: "resilience", shape: "balanced", mean: 50, sd: 17 },
      social_assertiveness: { facet: "social", shape: "contextual", mean: 50, sd: 19 },
      collaboration: { facet: "social", shape: "cluster_dependent", mean: 55, sd: 18 },
      leadership_drive: { facet: "social", shape: "cluster_dependent", mean: 48, sd: 19 },
      persuasiveness: { facet: "social", shape: "cluster_dependent", mean: 50, sd: 18 },
      conflict_tolerance: { facet: "social", shape: "contextual", mean: 45, sd: 19 },
      mastery_orientation: { facet: "motivation", shape: "higher_can_help", mean: 55, sd: 17 },
      achievement_drive: { facet: "motivation", shape: "balanced", mean: 55, sd: 18 },
      competitiveness: { facet: "motivation", shape: "contextual", mean: 50, sd: 19 },
      autonomy_need: { facet: "motivation", shape: "contextual", mean: 52, sd: 18 },
      impact_motivation: { facet: "motivation", shape: "higher_can_help", mean: 52, sd: 18 },
    };
    expect(Object.keys(original).length).toBe(30);
    for (const [id, expected] of Object.entries(original)) {
      const def = ATTRIBUTES[id as keyof typeof ATTRIBUTES];
      expect(def.facet, id).toBe(expected.facet);
      expect(def.contributionShape, id).toBe(expected.shape);
      expect(def.reference.mean, id).toBe(expected.mean);
      expect(def.reference.sd, id).toBe(expected.sd);
    }
  });

  it("gives each of the four new attributes a non-checklist contribution shape", () => {
    // None of the four new attributes should be flatly higher_can_help —
    // per docs/phase6.5-taxonomy-audit.md §6, all four are deliberately
    // contextual/balanced, not "more is better".
    for (const id of ["opportunity_sensing", "resourcefulness", "proactive_agency", "belief_updating"] as const) {
      expect(ATTRIBUTES[id].contributionShape, id).not.toBe("higher_can_help");
      expect(ATTRIBUTES[id].contributionShape, id).not.toBe("lower_can_help");
    }
  });

  it("orders ATTRIBUTE_IDS deterministically (same array identity across imports)", () => {
    // A literal array is deterministic by construction; this guards against a
    // future refactor accidentally deriving it from an unordered source
    // (e.g. Object.keys on a plain object, whose key order is not a language
    // guarantee for non-integer-like string keys in the way array order is).
    const a = [...ATTRIBUTE_IDS];
    const b = [...ATTRIBUTE_IDS];
    expect(a).toEqual(b);
    expect(Array.isArray(ATTRIBUTE_IDS)).toBe(true);
  });

  it("has an English and Korean display name for every attribute and facet (locale coverage, not locale-dependent numerics)", () => {
    for (const id of ATTRIBUTE_IDS) {
      expect(en[`attribute.${id}` as keyof typeof en], id).toBeTruthy();
      expect(ko[`attribute.${id}` as keyof typeof ko], id).toBeTruthy();
    }
    for (const facet of FACETS) {
      expect(en[`facet.${facet}` as keyof typeof en], facet).toBeTruthy();
      expect(ko[`facet.${facet}` as keyof typeof ko], facet).toBeTruthy();
      expect(en[`facet.match.${facet}` as keyof typeof en], facet).toBeTruthy();
      expect(ko[`facet.match.${facet}` as keyof typeof ko], facet).toBeTruthy();
    }
  });

  it("has an English and Korean definition for every attribute (Profile Trait Explanation UX, 2026-08)", () => {
    // The one centralized attribute-definition source — see
    // src/core/interpretation/traitScoreBands.ts and TraitExplanationDialog.tsx.
    for (const id of ATTRIBUTE_IDS) {
      const enDef = en[`attribute.description.${id}` as keyof typeof en];
      const koDef = ko[`attribute.description.${id}` as keyof typeof ko];
      expect(enDef, id).toBeTruthy();
      expect(koDef, id).toBeTruthy();
      // A definition describes the dimension, never a goodness judgement —
      // a cheap lexical tripwire, not a substitute for human review.
      expect(enDef?.toLowerCase(), id).not.toMatch(/\b(good|bad|better|worse|superior|inferior)\b/);
    }
  });

  it("keeps attribute identity (id, facet, shape, reference) locale-independent", () => {
    // Swapping which locale's strings render must never change what an
    // attribute IS — only en/ko display names differ; every other field on
    // AttributeDefinition is plain data with no locale dimension at all, so
    // this is really asserting there is no hidden per-locale attribute table.
    for (const id of ATTRIBUTE_IDS) {
      const def = ATTRIBUTES[id];
      expect(def.id).toBe(id);
      expect(typeof def.facet).toBe("string");
      expect(typeof def.baseWeight).toBe("number");
      expect(typeof def.reference.mean).toBe("number");
      expect(typeof def.reference.sd).toBe("number");
    }
  });
});
