import { describe, expect, it } from "vitest";
import { ATTRIBUTE_IDS, ATTRIBUTES, TAXONOMY_VERSION, type AttributeId } from "../attributes/attributes.js";
import type { Person, UserProfile } from "../types.js";
import { matchUserToPerson } from "../matching/similarity.js";
import { t } from "../i18n/index.js";
import {
  helpsWhenKey,
  missingTradeoffCoverage,
  preservesKey,
  selectDoNotCopy,
  selectLearnFromSuggestions,
  selectWorthExploring,
} from "./targetComparison.js";

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

function attr(
  attributeId: AttributeId,
  score: number,
  overrides: Partial<Person["attributes"][number]> = {},
): Person["attributes"][number] {
  return {
    attributeId,
    score,
    confidence: 0.9,
    evidenceType: "documented",
    impact: "neutral",
    sourceIds: [],
    ...overrides,
  };
}

function makePerson(id: string, attributes: Person["attributes"], doNotCopyKeys: string[] = []): Person {
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
    attributes,
    status: "published",
    isMatchEligible: true,
    overallProfileConfidence: 0.9,
    sources: [],
    doNotCopyKeys,
  };
}

describe("selectLearnFromSuggestions", () => {
  it("connects a real target advantage to an authored development guide, banded by the USER's score", () => {
    // planning_orientation: contextual shape -> not eligible on its own; use
    // mastery_orientation (higher_can_help) instead, where target is well
    // ahead and the user sits in the "low" band.
    const target = makePerson("target", [attr("mastery_orientation", 90, { confidence: 0.9 })]);
    const user = profile({ mastery_orientation: 25 });
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    const suggestions = selectLearnFromSuggestions(comparisons, 3);
    const found = suggestions.find((s) => s.attributeId === "mastery_orientation");
    expect(found).toBeDefined();
    expect(found!.userBand).toBe("low");
    expect(found!.guide.experimentKeys.length).toBeGreaterThan(0);
  });

  it("excludes a shape where 'higher' carries no general claim (contextual)", () => {
    // planning_orientation is "contextual" — target being much higher must
    // not produce a directional suggestion.
    const target = makePerson("target", [attr("planning_orientation", 95, { confidence: 0.9 })]);
    const user = profile({ planning_orientation: 20 });
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    expect(selectLearnFromSuggestions(comparisons, 3).some((s) => s.attributeId === "planning_orientation")).toBe(
      false,
    );
  });

  it("excludes a target trait with low confidence, even if the gap is large", () => {
    const target = makePerson("target", [attr("curiosity", 95, { confidence: 0.3 })]);
    const user = profile({ curiosity: 20 });
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    expect(selectLearnFromSuggestions(comparisons, 3).some((s) => s.attributeId === "curiosity")).toBe(false);
  });

  it("excludes a gap below the meaningful threshold", () => {
    const target = makePerson("target", [attr("curiosity", 60, { confidence: 0.9 })]);
    const user = profile({ curiosity: 55 }); // delta well under DIFFERENCE_THRESHOLDS.moderate
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    expect(selectLearnFromSuggestions(comparisons, 3).some((s) => s.attributeId === "curiosity")).toBe(false);
  });

  it("is deterministic for the same inputs", () => {
    const target = makePerson("target", [
      attr("curiosity", 92, { confidence: 0.9 }),
      attr("discipline", 88, { confidence: 0.8 }),
    ]);
    const user = profile({ curiosity: 20, discipline: 25 });
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    expect(selectLearnFromSuggestions(comparisons, 3)).toEqual(selectLearnFromSuggestions(comparisons, 3));
  });

  /**
   * Phase 6.6 Stage 9 found `belief_updating` is `taxonomy_v1.1`'s only new
   * attribute whose shape (`balanced`) qualifies for `HELPS_WHEN_HIGHER_
   * SHAPES`, so it IS reachable here with a real target/user pair — unlike
   * `opportunity_sensing`/`resourcefulness`/`proactive_agency` (`contextual`,
   * never eligible via this selector regardless of guide content, by
   * design — same as any other `contextual`-shaped attribute). Before the
   * Stage 9 fix, this exact scenario crashed (`development.ts` built
   * `DEVELOPMENT_GUIDES` from the full 34-attribute `ATTRIBUTE_IDS` before
   * any of the 4 had content). Phase 7 Stage 7C then authored real content
   * for all 4, so this now must resolve correctly, not be skipped.
   */
  it("includes belief_updating now that Stage 7C has authored its guide content", () => {
    const target = makePerson("target", [attr("belief_updating", 90, { confidence: 0.9 })]);
    const user = profile({ belief_updating: 20 });
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    expect(comparisons.some((c) => c.attributeId === "belief_updating")).toBe(true); // sanity: the gap IS real and large
    const found = selectLearnFromSuggestions(comparisons, 3).find((s) => s.attributeId === "belief_updating");
    expect(found).toBeDefined();
    expect(found!.guide.experimentKeys.length).toBeGreaterThan(0);
  });

  /**
   * The three `contextual`-shaped new attributes must stay unreachable via
   * this selector even though they now HAVE guide content — the gate is
   * `HELPS_WHEN_HIGHER_SHAPES` (shape-based), not content-availability.
   * Confirms Stage 7C's content authoring didn't accidentally change
   * `learnFromTraits`' selection logic.
   */
  it("still excludes the 3 contextual-shaped new attributes even with authored guide content", () => {
    const target = makePerson("target", [
      attr("opportunity_sensing", 90, { confidence: 0.9 }),
      attr("resourcefulness", 90, { confidence: 0.9 }),
      attr("proactive_agency", 90, { confidence: 0.9 }),
    ]);
    const user = profile({ opportunity_sensing: 20, resourcefulness: 20, proactive_agency: 20 });
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    const suggestions = selectLearnFromSuggestions(comparisons, 5);
    expect(suggestions.some((s) => s.attributeId === "opportunity_sensing")).toBe(false);
    expect(suggestions.some((s) => s.attributeId === "resourcefulness")).toBe(false);
    expect(suggestions.some((s) => s.attributeId === "proactive_agency")).toBe(false);
  });
});

describe("selectWorthExploring", () => {
  // resourcefulness is `contextual`-shaped — confirmed by reading
  // attributes.ts directly, not assumed — so it's a real, live example of
  // the exact gap this selector exists to fill (learnFromTraits never
  // surfaces it in either direction).
  it("surfaces a meaningful TARGET-HIGHER difference on a contextual-shaped attribute that selectLearnFromSuggestions cannot", () => {
    const target = makePerson("target", [attr("resourcefulness", 90, { confidence: 0.9 })]);
    const user = profile({ resourcefulness: 40 });
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    // Sanity: confirms learnFromTraits' own exclusion, the premise of this test.
    expect(selectLearnFromSuggestions(comparisons, 3).some((s) => s.attributeId === "resourcefulness")).toBe(false);

    const explored = selectWorthExploring(comparisons, 2);
    const found = explored.find((s) => s.attributeId === "resourcefulness");
    expect(found).toBeDefined();
    expect(found!.helpsWhenKey).toBe("dev.resourcefulness.helps_when");
    expect(found!.preservesKey).toBe("dev.resourcefulness.preserves");
  });

  /**
   * Phase 7 human-review Stage, second pass (Issue 5 continued): a real,
   * live example was Benjamin Franklin's Resourcefulness, where the user's
   * score (53) landed in the MEDIUM band — and the dev-guide's MEDIUM-band
   * caution was never written to defend a low pole (it warns about
   * inconsistent switching between strategies instead), so the reused
   * content answered the wrong question. `preservesKey` is unbanded by
   * design: same content regardless of the user's exact score, since the
   * point is always "the lower side of this specific gap," not "the cost
   * of this absolute band."
   */
  it("preservesKey does not vary with the user's score band — unlike the old banded-caution approach it replaced", () => {
    const target = makePerson("target", [attr("resourcefulness", 90, { confidence: 0.9 })]);
    const lowUser = profile({ resourcefulness: 15 });
    const mediumUser = profile({ resourcefulness: 53 });
    const lowComparisons = matchUserToPerson(lowUser, target).largestDifferences;
    const mediumComparisons = matchUserToPerson(mediumUser, target).largestDifferences;
    const lowFound = selectWorthExploring(lowComparisons, 2).find((s) => s.attributeId === "resourcefulness");
    const mediumFound = selectWorthExploring(mediumComparisons, 2).find((s) => s.attributeId === "resourcefulness");
    expect(lowFound?.preservesKey).toBe("dev.resourcefulness.preserves");
    expect(mediumFound?.preservesKey).toBe("dev.resourcefulness.preserves");
  });

  /**
   * Phase 7 human-review Stage, revised (Issue 1 — the directional
   * semantics bug): a real, live example was Benjamin Franklin's
   * Conflict Tolerance, where the USER leaned higher and it still
   * appeared under "What You Could Learn From Them" — backwards, since
   * nothing is learned FROM the target when the user is the one further
   * in that direction. This is the direct regression test for that fix:
   * a user-higher contextual difference must NOT appear here at all.
   */
  it("does NOT surface a difference when the USER is the one leaning higher — this belongs under Where You Bring Something Different instead", () => {
    const target = makePerson("target", [attr("resourcefulness", 30, { confidence: 0.9 })]);
    const user = profile({ resourcefulness: 85 });
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    expect(selectWorthExploring(comparisons, 3).some((s) => s.attributeId === "resourcefulness")).toBe(false);
  });

  it("excludes a shape learnFromTraits already credits — no overlap between the two selectors", () => {
    // mastery_orientation is higher_can_help, already selectLearnFromSuggestions' territory.
    const target = makePerson("target", [attr("mastery_orientation", 92, { confidence: 0.9 })]);
    const user = profile({ mastery_orientation: 20 });
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    expect(selectWorthExploring(comparisons, 3).some((s) => s.attributeId === "mastery_orientation")).toBe(false);
  });

  it("excludes a low-confidence target trait, even with a large gap", () => {
    const target = makePerson("target", [attr("resourcefulness", 95, { confidence: 0.3 })]);
    const user = profile({ resourcefulness: 20 });
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    expect(selectWorthExploring(comparisons, 3).some((s) => s.attributeId === "resourcefulness")).toBe(false);
  });

  it("does not force a suggestion when there is no meaningful difference", () => {
    const target = makePerson("target", [attr("resourcefulness", 55, { confidence: 0.9 })]);
    const user = profile({ resourcefulness: 50 }); // delta well under DIFFERENCE_THRESHOLDS.moderate
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    expect(selectWorthExploring(comparisons, 3).some((s) => s.attributeId === "resourcefulness")).toBe(false);
  });

  it("is deterministic for the same inputs", () => {
    const target = makePerson("target", [attr("resourcefulness", 90, { confidence: 0.9 })]);
    const user = profile({ resourcefulness: 30 });
    const comparisons = matchUserToPerson(user, target).largestDifferences;
    expect(selectWorthExploring(comparisons, 2)).toEqual(selectWorthExploring(comparisons, 2));
  });
});

describe("selectDoNotCopy", () => {
  // Neutral scores (all attributes = 50) unless a test overrides one —
  // matches the "unanswered = neutral" convention selectDoNotCopy itself
  // uses when a user score is absent.
  const neutralUser: Partial<Record<AttributeId, number>> = {};

  it("always surfaces editorial doNotCopyKeys first, independent of the user", () => {
    const target = makePerson("target", [attr("curiosity", 50)], ["dontcopy.target.editorial_example"]);
    const items = selectDoNotCopy(target, neutralUser, 3);
    expect(items[0]).toEqual({ reason: "editorial", key: "dontcopy.target.editorial_example" });
  });

  it("flags a trait with authored risk impact regardless of the user's own score", () => {
    const target = makePerson("target", [attr("risk_tolerance", 60, { impact: "risk" })]);
    // User shares an even higher score — risk/dual_edged are editorial
    // judgements independent of the user, unlike extreme_score/shape_mismatch.
    const items = selectDoNotCopy(target, { risk_tolerance: 90 }, 3);
    expect(items.some((i) => i.attributeId === "risk_tolerance" && i.reason === "risk")).toBe(true);
  });

  it("flags a trait with authored dual_edged impact regardless of the user's own score", () => {
    const target = makePerson("target", [attr("perfectionism", 65, { impact: "dual_edged" })]);
    const items = selectDoNotCopy(target, { perfectionism: 90 }, 3);
    expect(items.some((i) => i.attributeId === "perfectionism" && i.reason === "dual_edged")).toBe(true);
  });

  /**
   * Phase 7 human-review checkpoint follow-up: the dual_edged branch used to
   * always render the generic "cuts both ways" sentence, never attaching a
   * tradeoffKey even when real trait-specific content was authored for the
   * attribute (unlike extreme_score/shape_mismatch, which already did this).
   * discipline IS in TRADEOFF_ATTRIBUTE_IDS, so a dual_edged discipline item
   * should now get the same specific content extreme_score/shape_mismatch
   * items get.
   */
  it("attaches a trait-specific tradeoffKey to a dual_edged item when one is authored", () => {
    const target = makePerson("target", [attr("discipline", 65, { impact: "dual_edged" })]);
    const items = selectDoNotCopy(target, { discipline: 50 }, 3);
    const found = items.find((i) => i.attributeId === "discipline" && i.reason === "dual_edged");
    expect(found?.tradeoffKey).toBe("dontcopy.tradeoff.discipline");
  });

  /**
   * conflict_tolerance is one of the 8 deliberately-uncovered attributes
   * (missingTradeoffCoverage()) — the exact case that surfaced this gap in
   * live review (Genghis Khan's Conflict Tolerance, dual_edged, 95). Even
   * after wiring tradeoffKeyFor into the dual_edged branch, an uncovered
   * attribute must still fall back to the generic sentence rather than
   * getting invented content.
   */
  it("leaves tradeoffKey undefined for a dual_edged item on an uncovered attribute", () => {
    const target = makePerson("target", [attr("conflict_tolerance", 95, { impact: "dual_edged", confidence: 0.72 })]);
    const items = selectDoNotCopy(target, { conflict_tolerance: 90 }, 3);
    const found = items.find((i) => i.attributeId === "conflict_tolerance" && i.reason === "dual_edged");
    expect(found?.tradeoffKey).toBeUndefined();
    expect(found?.key).toBe("dontcopy.generic.dual_edged");
  });

  it("flags an extreme score when the user is far from it", () => {
    const target = makePerson("target", [attr("discipline", 97, { impact: "neutral" })]);
    const items = selectDoNotCopy(target, { discipline: 40 }, 3);
    expect(items.some((i) => i.attributeId === "discipline" && i.reason === "extreme_score")).toBe(true);
  });

  /**
   * Phase 7 human-review Stage, revised (Issue 3 — the direct regression
   * test): a real, live example was Benjamin Franklin's Cross-Domain Range
   * (target 95, user 100 — the user's own score was already HIGHER). This
   * is not something the user could meaningfully "copy" from the target,
   * so it must not appear at all, even though 95 clears the raw
   * EXTREME_HIGH threshold on its own.
   */
  it("does NOT flag an extreme-high score when the user already matches or exceeds it", () => {
    const target = makePerson("target", [attr("cross_domain_range", 95, { impact: "neutral", confidence: 0.9 })]);
    const items = selectDoNotCopy(target, { cross_domain_range: 100 }, 3);
    expect(items.some((i) => i.attributeId === "cross_domain_range")).toBe(false);
  });

  it("does NOT flag an extreme-high score when the user is close but not meaningfully behind", () => {
    const target = makePerson("target", [attr("curiosity", 95, { impact: "neutral", confidence: 0.9 })]);
    // gap of 1, well under DIFFERENCE_THRESHOLDS.moderate (20)
    const items = selectDoNotCopy(target, { curiosity: 94 }, 3);
    expect(items.some((i) => i.attributeId === "curiosity")).toBe(false);
  });

  it("does NOT flag an extreme-low score when the user already shares it", () => {
    const target = makePerson("target", [attr("competitiveness", 5, { impact: "neutral", confidence: 0.9 })]);
    const items = selectDoNotCopy(target, { competitiveness: 10 }, 3);
    expect(items.some((i) => i.attributeId === "competitiveness")).toBe(false);
  });

  /**
   * Phase 7 human-review Stage, revised (Issue 3/4): before this fix, every
   * extreme_score item rendered the exact same generic sentence with only
   * the trait name swapped — several such items for one exceptional person
   * read as repetitive. `tradeoffKey` carries a NEUTRAL, THIRD-PERSON
   * trade-off sentence — a separate authored set from the second-person
   * dev-guide captions (see targetComparison.ts's TRADEOFF_ATTRIBUTE_IDS
   * comment for why the dev-guide captions are the wrong voice here).
   */
  it("attaches a trait-specific, neutral tradeoffKey to an extreme_score item", () => {
    const target = makePerson("target", [attr("curiosity", 95, { impact: "neutral", confidence: 0.9 })]);
    const items = selectDoNotCopy(target, { curiosity: 30 }, 3);
    const found = items.find((i) => i.attributeId === "curiosity" && i.reason === "extreme_score");
    expect(found?.tradeoffKey).toBe("dontcopy.tradeoff.curiosity");
  });

  it("two different extreme-score attributes get two different tradeoffKeys, not the same repeated line", () => {
    const target = makePerson("target", [
      attr("curiosity", 95, { impact: "neutral", confidence: 0.9 }),
      attr("experimentation", 93, { impact: "neutral", confidence: 0.9 }),
    ]);
    const items = selectDoNotCopy(target, { curiosity: 30, experimentation: 30 }, 5);
    const curiosityKey = items.find((i) => i.attributeId === "curiosity")?.tradeoffKey;
    const experimentationKey = items.find((i) => i.attributeId === "experimentation")?.tradeoffKey;
    expect(curiosityKey).toBeDefined();
    expect(experimentationKey).toBeDefined();
    expect(curiosityKey).not.toBe(experimentationKey);
  });

  it("leaves tradeoffKey undefined for an attribute with no authored trade-off content yet", () => {
    // belief_updating is one of the 8 deliberately-uncovered attributes —
    // see TRADEOFF_ATTRIBUTE_IDS's comment in targetComparison.ts.
    const target = makePerson("target", [attr("belief_updating", 95, { impact: "neutral", confidence: 0.9 })]);
    const items = selectDoNotCopy(target, { belief_updating: 30 }, 3);
    const found = items.find((i) => i.attributeId === "belief_updating");
    expect(found).toBeDefined();
    expect(found?.tradeoffKey).toBeUndefined();
    expect(found?.key).toBe("dontcopy.generic.extreme"); // falls back cleanly, never invents content
  });

  it("does not flag an ordinary, non-extreme, neutral-impact trait", () => {
    const target = makePerson("target", [attr("curiosity", 58, { impact: "neutral", confidence: 0.3 })]);
    expect(selectDoNotCopy(target, neutralUser, 5)).toEqual([]);
  });

  it("carries the target's confidence on every deterministic item, for the UI to soften language on", () => {
    const target = makePerson("target", [attr("risk_tolerance", 70, { impact: "risk", confidence: 0.35 })]);
    const items = selectDoNotCopy(target, neutralUser, 3);
    expect(items[0]?.confidence).toBe(0.35);
  });

  it("respects the limit and prioritises editorial over deterministic reasons", () => {
    const target = makePerson(
      "target",
      [attr("risk_tolerance", 60, { impact: "risk" }), attr("perfectionism", 65, { impact: "dual_edged" })],
      ["dontcopy.a", "dontcopy.b"],
    );
    const items = selectDoNotCopy(target, neutralUser, 2);
    expect(items).toHaveLength(2);
    expect(items.every((i) => i.reason === "editorial")).toBe(true);
  });

  it("is deterministic for the same target and user", () => {
    const target = makePerson("target", [
      attr("risk_tolerance", 60, { impact: "risk" }),
      attr("perfectionism", 97, { impact: "neutral" }),
    ]);
    const userScores = { perfectionism: 30 };
    expect(selectDoNotCopy(target, userScores, 5)).toEqual(selectDoNotCopy(target, userScores, 5));
  });
});

describe("helpsWhenKey", () => {
  it("resolves real English text — not the raw key — for every one of the 34 attributes", () => {
    for (const id of ATTRIBUTE_IDS) {
      const key = helpsWhenKey(id);
      expect(key, id).toBe(`dev.${id}.helps_when`);
      const resolved = t("en-US", key as never);
      expect(resolved, key).not.toBe(key);
      expect(resolved.length, key).toBeGreaterThan(10);
    }
  });
});

describe("preservesKey", () => {
  const CONTEXTUAL_IDS: readonly AttributeId[] = [
    "intuitive_synthesis",
    "cross_domain_range",
    "aesthetic_sensitivity",
    "detail_orientation",
    "planning_orientation",
    "social_assertiveness",
    "conflict_tolerance",
    "competitiveness",
    "autonomy_need",
    "opportunity_sensing",
    "resourcefulness",
    "proactive_agency",
  ];

  it("resolves real English text — not the raw key — for every one of the 12 contextual attributes", () => {
    for (const id of CONTEXTUAL_IDS) {
      const key = preservesKey(id);
      expect(key, id).toBe(`dev.${id}.preserves`);
      const resolved = t("en-US", key as never);
      expect(resolved, key).not.toBe(key);
      expect(resolved.length, key).toBeGreaterThan(10);
    }
  });

  it("covers exactly the 12 contextual-shaped attributes selectWorthExploring can surface — confirmed against the live taxonomy, not assumed", () => {
    const contextualInTaxonomy = ATTRIBUTE_IDS.filter((id) => ATTRIBUTES[id].contributionShape === "contextual");
    expect(contextualInTaxonomy.slice().sort()).toEqual(CONTEXTUAL_IDS.slice().sort());
  });
});

describe("missingTradeoffCoverage", () => {
  it("names exactly the 8 attributes with no authored trade-off content yet, as a live regression guard", () => {
    // Mirrors missingDevelopmentGuides()'s pattern (development.ts):
    // asserting the EXACT set, not just non-empty, is what keeps this a
    // live guard — a NINTH attribute silently missing coverage would still
    // be caught, while these 8 stay visibly tracked rather than the guard
    // being loosened into a no-op.
    expect(missingTradeoffCoverage().slice().sort()).toEqual(
      [
        "belief_updating",
        "perfectionism",
        "adaptability",
        "risk_tolerance",
        "collaboration",
        "conflict_tolerance",
        "competitiveness",
        "proactive_agency",
      ]
        .slice()
        .sort(),
    );
  });
});
