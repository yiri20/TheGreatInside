/**
 * RULE-BASED INTERPRETATION — interpretation_v1
 *
 * Every user-facing sentence about a comparison is produced by selecting a
 * template key from numeric thresholds and interpolating localised trait and
 * person names. No generative model is involved at runtime, and none is needed:
 * the set of things that can be said about "two numbers on one dimension" is
 * small and enumerable.
 *
 * Selection happens on NUMBERS ONLY, so the same comparison yields the same
 * template key in every locale — the locale only decides which string that key
 * maps to. That is what makes localisation safe here.
 */

import { ATTRIBUTES, ATTRIBUTE_IDS, type AttributeId } from "../attributes/attributes.js";
import { t, type MessageKey } from "../i18n/index.js";
import type { Locale, TraitComparison, UserProfile } from "../types.js";

export const INTERPRETATION_VERSION = "interpretation_v1";

export const DIFFERENCE_THRESHOLDS = {
  extremelyClose: 5,
  similar: 10,
  moderate: 20,
} as const;

export type ComparisonTemplateKey = Extract<
  MessageKey,
  | "tpl.match_extremely_close"
  | "tpl.match_similar"
  | "tpl.match_moderate_gap"
  | "tpl.user_higher"
  | "tpl.person_higher"
  | "tpl.user_significantly_higher"
  | "tpl.person_significantly_higher"
>;

/** Pure numeric -> template key selection. Deliberately locale-free. */
export function selectComparisonTemplate(delta: number): ComparisonTemplateKey {
  const abs = Math.abs(delta);
  if (abs <= DIFFERENCE_THRESHOLDS.extremelyClose) return "tpl.match_extremely_close";
  if (abs <= DIFFERENCE_THRESHOLDS.similar) return "tpl.match_similar";
  if (abs <= DIFFERENCE_THRESHOLDS.moderate) {
    return delta < 0 ? "tpl.user_higher" : "tpl.person_higher";
  }
  return delta < 0 ? "tpl.user_significantly_higher" : "tpl.person_significantly_higher";
}

export function attributeName(locale: Locale, attributeId: AttributeId): string {
  return t(locale, `attribute.${attributeId}` as MessageKey);
}

export function renderComparison(
  locale: Locale,
  comparison: TraitComparison,
  personDisplayName: string,
): string {
  return t(locale, selectComparisonTemplate(comparison.delta), {
    trait: attributeName(locale, comparison.attributeId),
    person: personDisplayName,
  });
}

/* --------------------------------------------------- distinctive traits */

/**
 * Signature trait = most DISTINCTIVE, not highest. A user at 95 on a trait where
 * everyone scores high is less characteristic of them than a user at 78 on a
 * trait where most people sit near 45. Distance from the reference mean in
 * standard deviations is the right measure; the raw score is not.
 *
 * Confidence gates the result so an unmeasured attribute cannot become someone's
 * headline trait.
 */
export interface DistinctiveTrait {
  attributeId: AttributeId;
  score: number;
  z: number;
}

export function distinctiveTraits(user: UserProfile, limit = 5): DistinctiveTrait[] {
  return ATTRIBUTE_IDS.map((attributeId) => {
    const score = user.scores[attributeId] ?? 50;
    const ref = ATTRIBUTES[attributeId].reference;
    return { attributeId, score, z: (score - ref.mean) / ref.sd };
  })
    .filter((d) => (user.confidence[d.attributeId] ?? 0) >= 0.5)
    .sort((a, b) => Math.abs(b.z) - Math.abs(a.z) || a.attributeId.localeCompare(b.attributeId))
    .slice(0, limit);
}

export function signatureTrait(user: UserProfile): DistinctiveTrait | undefined {
  // Only traits on the HIGH side can be a "signature trait" — a strikingly low
  // score is interesting but is not what the label promises.
  return distinctiveTraits(user, ATTRIBUTE_IDS.length).find((d) => d.z > 0);
}

/* ---------------------------------------------------------- your advantage */

/**
 * Shapes where "the higher side of this pair is the one worth learning from"
 * is a claim the model actually supports. `contextual` is deliberately
 * excluded — by definition its usefulness has no general direction, so
 * neither side of a `contextual` gap is "the advantage". Shared by
 * `advantageTraits` (Phase 6, the user's side) and `learnFromTraits`
 * (Phase 7, the target's side) so both read the same shape the same way.
 */
export const HELPS_WHEN_HIGHER_SHAPES = new Set(["higher_can_help", "balanced", "cluster_dependent"]);

/**
 * Traits where the user meaningfully exceeds the person AND where being higher
 * is plausibly useful. Excludes shapes where "more" carries no general claim,
 * so the section never implies the user is simply better.
 */
export function advantageTraits(
  comparisons: readonly TraitComparison[],
  limit = 3,
): TraitComparison[] {
  return comparisons
    .filter(
      (c) =>
        c.delta <= -DIFFERENCE_THRESHOLDS.moderate &&
        HELPS_WHEN_HIGHER_SHAPES.has(ATTRIBUTES[c.attributeId].contributionShape) &&
        c.confidence >= 0.5,
    )
    .sort((a, b) => a.delta - b.delta || a.attributeId.localeCompare(b.attributeId))
    .slice(0, limit);
}

/* ------------------------------------------------------- learn from them */

/**
 * Phase 7: the mirror of `advantageTraits`, from the TARGET's side. A trait
 * is a "learn from them" candidate when the target is meaningfully higher (or,
 * for `lower_can_help` traits, meaningfully LOWER) AND the shape says that
 * direction is plausibly useful AND the target's own evidence for that trait
 * is strong enough to build a suggestion on. This is deliberately NOT "the
 * biggest numeric gaps" — see CLAUDE.md "Phase 7" for the shape-driven
 * rationale.
 */
export function learnFromTraits(
  comparisons: readonly TraitComparison[],
  limit = 3,
): TraitComparison[] {
  return comparisons
    .filter((c) => {
      if (c.confidence < 0.5) return false;
      const shape = ATTRIBUTES[c.attributeId].contributionShape;
      if (shape === "lower_can_help") return c.delta <= -DIFFERENCE_THRESHOLDS.moderate;
      return HELPS_WHEN_HIGHER_SHAPES.has(shape) && c.delta >= DIFFERENCE_THRESHOLDS.moderate;
    })
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta) || a.attributeId.localeCompare(b.attributeId))
    .slice(0, limit);
}

/* ---------------------------------------------------------- result archetype */

export type ResultArchetypeId =
  | "strong_match"
  | "distinctive_profile"
  | "cross_field_match"
  | "balanced_profile"
  | "unusual_combination";

export interface ResultArchetypeInput {
  topMatch: number;
  greatnessScore: number;
  distinctiveness: number;
  unexpectedIsCrossField: boolean;
}

/**
 * Deterministic UX state for the result page. Thresholds are explicit so the
 * copy, imagery, and share card can branch without any model call — and so a
 * lower top match becomes an interesting result rather than a disappointing one.
 */
export function selectResultArchetype(input: ResultArchetypeInput): ResultArchetypeId {
  if (input.topMatch < 72 && input.greatnessScore >= 70) return "distinctive_profile";
  if (input.topMatch < 65) return "unusual_combination";
  if (input.topMatch >= 82) return input.unexpectedIsCrossField ? "cross_field_match" : "strong_match";
  if (input.distinctiveness < 0.45) return "balanced_profile";
  return "strong_match";
}
