import { describe, expect, it } from "vitest";
import { ATTRIBUTE_IDS, TAXONOMY_VERSION, type AttributeId } from "../attributes/attributes.js";
import type { TraitComparison, UserProfile } from "../types.js";
import { missingKeys, t, tOptional, translationCoverage } from "../i18n/index.js";
import { en } from "../i18n/en.js";
import {
  advantageTraits,
  distinctiveTraits,
  learnFromTraits,
  renderComparison,
  selectComparisonTemplate,
  selectResultArchetype,
  signatureTrait,
} from "./rules.js";
import { bandForScore, missingDevelopmentGuides, selectDevelopmentGuides } from "./development.js";

function profile(scores: Partial<Record<AttributeId, number>>, fill = 50): UserProfile {
  const full = {} as Record<AttributeId, number>;
  const confidence = {} as Record<AttributeId, number>;
  for (const id of ATTRIBUTE_IDS) {
    full[id] = scores[id] ?? fill;
    confidence[id] = 1;
  }
  return {
    id: "u",
    quizVersion: "test",
    scoringVersion: "test",
    taxonomyVersion: TAXONOMY_VERSION,
    scores: full,
    confidence,
    completedAt: "2026-01-01T00:00:00.000Z",
  };
}

const comparison = (attributeId: AttributeId, userScore: number, personScore: number): TraitComparison => ({
  attributeId,
  userScore,
  personScore,
  delta: personScore - userScore,
  absDelta: Math.abs(personScore - userScore),
  effectiveWeight: 1,
  impact: "neutral",
  confidence: 0.9,
});

describe("template selection is numeric and locale-free", () => {
  it("picks by threshold", () => {
    expect(selectComparisonTemplate(0)).toBe("tpl.match_extremely_close");
    expect(selectComparisonTemplate(-4)).toBe("tpl.match_extremely_close");
    expect(selectComparisonTemplate(9)).toBe("tpl.match_similar");
    expect(selectComparisonTemplate(15)).toBe("tpl.person_higher");
    expect(selectComparisonTemplate(-15)).toBe("tpl.user_higher");
    expect(selectComparisonTemplate(35)).toBe("tpl.person_significantly_higher");
    expect(selectComparisonTemplate(-35)).toBe("tpl.user_significantly_higher");
  });

  it("resolves the same template key in every locale", () => {
    const c = comparison("curiosity", 60, 92);
    const key = selectComparisonTemplate(c.delta);
    const english = renderComparison("en-US", c, "Marie Curie");
    const korean = renderComparison("ko-KR", c, "마리 퀴리");
    expect(english).not.toBe(korean);
    expect(english).toContain("Curiosity");
    expect(korean).toContain("호기심");
    // Same numbers in, same branch chosen — only the string differs.
    expect(selectComparisonTemplate(c.delta)).toBe(key);
  });

  it("interpolates every placeholder it is given", () => {
    const rendered = renderComparison("en-US", comparison("perfectionism", 40, 95), "Hayao Miyazaki");
    expect(rendered).not.toMatch(/\{\w+\}/);
    expect(rendered).toContain("Hayao Miyazaki");
  });

  it("leaves unknown placeholders untouched rather than printing undefined", () => {
    expect(t("en-US", "tpl.match_similar", {})).toContain("{trait}");
  });
});

describe("i18n bundles", () => {
  it("falls back to English for untranslated keys", () => {
    expect(t("ja-JP", "label.closest_match")).toBe(en["label.closest_match"]);
  });

  it("tOptional resolves a real key exactly like t() does", () => {
    expect(tOptional("en-US", "label.closest_match")).toBe(t("en-US", "label.closest_match"));
  });

  it("tOptional returns undefined for an unauthored key instead of throwing", () => {
    expect(() => tOptional("en-US", "polity.not_authored_yet")).not.toThrow();
    expect(tOptional("en-US", "polity.not_authored_yet")).toBeUndefined();
    expect(tOptional("ko-KR", "polity.not_authored_yet")).toBeUndefined();
  });

  it("has a Korean name for every canonical attribute", () => {
    for (const id of ATTRIBUTE_IDS) {
      const key = `attribute.${id}` as const;
      expect(t("ko-KR", key), id).not.toBe(en[key]);
    }
  });

  it("reports what each locale still needs", () => {
    expect(translationCoverage("en-US")).toBe(1);
    expect(missingKeys("en-US")).toEqual([]);
    // Phase 8 (2026-08): Korean reached full parity — all 64 quiz items,
    // the full development-guide corpus (dev.*), dontcopy.generic.*, and
    // dontcopy.tradeoff.* were translated (previously the last deliberate
    // English-first gaps, tracked here since Phase 7). This assertion is
    // now a straightforward regression guard: any FUTURE key that ships
    // without Korean coverage must fail this test immediately, the same
    // day it's added, rather than silently falling back to English.
    expect(translationCoverage("ko-KR")).toBe(1);
    expect(missingKeys("ko-KR")).toEqual([]);
  });
});

describe("distinctiveness, not magnitude", () => {
  it("prefers the trait furthest from the reference mean over the highest raw score", () => {
    // conflict_tolerance has reference mean 45; discipline has mean 55.
    // The lower raw score is the more distinctive one.
    const user = profile({ conflict_tolerance: 88, discipline: 90 });
    expect(signatureTrait(user)?.attributeId).toBe("conflict_tolerance");
  });

  it("ignores attributes the quiz did not really measure", () => {
    const user = profile({ conflict_tolerance: 95 });
    user.confidence.conflict_tolerance = 0.2;
    expect(distinctiveTraits(user).some((d) => d.attributeId === "conflict_tolerance")).toBe(false);
  });

  it("only nominates a high-side trait as the signature trait", () => {
    const user = profile({ competitiveness: 2, curiosity: 80 });
    expect(signatureTrait(user)?.z).toBeGreaterThan(0);
  });
});

describe("your advantage", () => {
  it("surfaces only meaningful gaps where the user is higher", () => {
    const result = advantageTraits([
      comparison("collaboration", 82, 48),
      comparison("curiosity", 70, 72),
      comparison("competitiveness", 44, 87),
    ]);
    expect(result.map((c) => c.attributeId)).toEqual(["collaboration"]);
  });

  it("excludes purely contextual traits, so the section never implies the user is simply better", () => {
    // aesthetic_sensitivity is "contextual": being higher carries no general claim.
    const result = advantageTraits([comparison("aesthetic_sensitivity", 90, 40)]);
    expect(result).toEqual([]);
  });
});

/**
 * Phase 7 human-review checkpoint (Genghis Khan round 1): the user reported
 * an apparent directional bug where a near-ceiling user compared against a
 * uniformly-lower target seemed to show user-higher traits as if they were
 * target-higher, and "What You Could Learn From Them" appeared empty despite
 * what looked like large target-higher gaps. Investigation traced this to a
 * mistake in how the assistant hand-built a chat summary table, not a code
 * defect — direct DOM extraction confirmed the real values were correctly
 * user-higher throughout. This fixture pins that exact profile shape
 * (near-ceiling user, target lower across the board, one small target-higher
 * gap on a contextual-shaped attribute that's both under threshold AND
 * excluded by shape) as a regression test, so a repeat of this reporting
 * confusion is caught by a failing assertion instead of requiring another
 * round of manual DOM inspection.
 */
describe("advantageTraits/learnFromTraits: near-ceiling user vs. uniformly lower target", () => {
  const comparisons = [
    comparison("collaboration", 100, 55), // cluster_dependent, user higher by 45
    comparison("analytical_rigor", 100, 65), // balanced, user higher by 35
    comparison("ambiguity_tolerance", 100, 78), // higher_can_help, user higher by 22
    comparison("conflict_tolerance", 90, 95), // contextual, target higher by only 5 (< moderate threshold)
  ];

  it("credits all three meaningfully user-higher, non-contextual traits to the user, not the target", () => {
    const result = advantageTraits(comparisons, 5);
    expect(result.map((c) => c.attributeId).sort()).toEqual(
      ["ambiguity_tolerance", "analytical_rigor", "collaboration"].sort(),
    );
    // Every one of them must actually be user > target, not the reverse.
    for (const c of result) {
      expect(c.userScore).toBeGreaterThan(c.personScore);
    }
  });

  it("produces no learn-from-them suggestions when no target-higher gap clears the threshold", () => {
    expect(learnFromTraits(comparisons, 5)).toEqual([]);
  });

  it("never lets a contextual small target-higher gap leak into advantageTraits", () => {
    const result = advantageTraits(comparisons, 5);
    expect(result.some((c) => c.attributeId === "conflict_tolerance")).toBe(false);
  });
});

describe("result archetypes", () => {
  it("turns a low top match plus strong potential into a distinctive profile, not a disappointment", () => {
    expect(
      selectResultArchetype({
        topMatch: 68,
        greatnessScore: 78,
        distinctiveness: 0.7,
        unexpectedIsCrossField: false,
      }),
    ).toBe("distinctive_profile");
  });

  it("labels a cross-field strong match", () => {
    expect(
      selectResultArchetype({
        topMatch: 86,
        greatnessScore: 70,
        distinctiveness: 0.6,
        unexpectedIsCrossField: true,
      }),
    ).toBe("cross_field_match");
  });

  it("is deterministic", () => {
    const input = {
      topMatch: 75,
      greatnessScore: 60,
      distinctiveness: 0.3,
      unexpectedIsCrossField: false,
    };
    expect(selectResultArchetype(input)).toBe(selectResultArchetype(input));
  });
});

describe("development guides", () => {
  it("bands by the user's own score", () => {
    expect(bandForScore(20)).toBe("low");
    expect(bandForScore(55)).toBe("medium");
    expect(bandForScore(85)).toBe("high");
  });

  it("has content for the high band too, so 'more' is never the only advice", () => {
    const selected = selectDevelopmentGuides({ perfectionism: 92 }, ["perfectionism"]);
    expect(selected[0]?.band).toBe("high");
    expect(selected[0]?.guide.experimentKeys.length).toBeGreaterThan(0);
    expect(selected[0]?.guide.cautionKeys.length).toBeGreaterThan(0);
  });

  it("has authored all 34 taxonomy_v1.1 attributes as of Phase 7 Stage 7C — missingDevelopmentGuides() is empty", () => {
    // Phase 0 shipped 10 of 30; Phase 7 (first pass) completed the
    // remaining 20 of the original taxonomy_v1 30. Phase 6.6 Stage 9 added
    // opportunity_sensing/resourcefulness/proactive_agency/belief_updating
    // to the taxonomy with NO guide content yet, deliberately deferred to
    // avoid authoring mid-migration (see development.ts header). Phase 7
    // Stage 7C completed all 4. Asserting `[]` (not a fixed list) is what
    // keeps this a live regression guard: any FUTURE attribute silently
    // missing guide content is still caught, exactly as before.
    expect(missingDevelopmentGuides()).toEqual([]);
  });

  it("skips a genuinely unknown attribute id rather than inventing advice or crashing", () => {
    const fakeId = "not_a_real_attribute" as AttributeId;
    expect(selectDevelopmentGuides({ [fakeId]: 80 }, [fakeId])).toEqual([]);
  });

  it("resolves real English text — not the raw key — for every attribute in every band, including the 4 taxonomy_v1.1 additions", () => {
    const bandScores = { low: 20, medium: 55, high: 85 } as const;
    expect(TAXONOMY_VERSION).toBe("taxonomy_v1.1");
    expect(ATTRIBUTE_IDS.length).toBe(34);
    for (const attributeId of ATTRIBUTE_IDS) {
      for (const [, score] of Object.entries(bandScores)) {
        const [selected] = selectDevelopmentGuides({ [attributeId]: score }, [attributeId]);
        expect(selected, attributeId).toBeDefined();
        for (const key of [...selected!.guide.experimentKeys, ...selected!.guide.cautionKeys]) {
          const resolved = t("en-US", key as never);
          expect(resolved, key).not.toBe(key);
          expect(resolved.length, key).toBeGreaterThan(10);
        }
      }
    }
  });

  it("the 4 taxonomy_v1.1 additions resolve real guide content, completing Stage 9's temporary gap (Phase 7 Stage 7C)", () => {
    // Supersedes the Stage 9 test that asserted the OPPOSITE (these 4
    // returned `[]` from selectDevelopmentGuides, deliberately, because no
    // content existed yet — see development.ts header for that history).
    // Now that Stage 7C has authored all 4, they must resolve exactly like
    // any other attribute, not be silently skipped.
    const newAttributes: readonly AttributeId[] = [
      "opportunity_sensing",
      "resourcefulness",
      "proactive_agency",
      "belief_updating",
    ];
    for (const attributeId of newAttributes) {
      const selected = selectDevelopmentGuides({ [attributeId]: 55 }, [attributeId]);
      expect(selected.length, attributeId).toBe(1);
      expect(selected[0]!.guide.experimentKeys.length, attributeId).toBeGreaterThan(0);
      expect(selected[0]!.guide.cautionKeys.length, attributeId).toBeGreaterThan(0);
    }
  });
});
