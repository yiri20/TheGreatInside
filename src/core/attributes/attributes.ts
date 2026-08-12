/**
 * CANONICAL ATTRIBUTE TAXONOMY — taxonomy_v1 -> taxonomy_v1.1 (Phase 6.6)
 *
 * 34 attributes across 7 facets. Facets thinking/creativity/work_style/
 * resilience/social/motivation map 1:1 onto the six original category match
 * scores; `world_sense` (added Phase 6.6) is the seventh, added to house
 * three genuinely new, externally-directed attributes that didn't fit any
 * existing facet without stretching its meaning — see CLAUDE.md "Phase 6.6"
 * and `docs/phase6.5b-taxonomy-quiz-design.md` §7 for the full facet-
 * architecture evaluation (three alternatives tested, this one chosen).
 *
 * taxonomy_v1.1 additions (all four retain every one of the original 30
 * attributes unmodified — id, facet, contributionShape, reference all
 * unchanged for those 30):
 *   opportunity_sensing  -> world_sense  (new)
 *   resourcefulness      -> world_sense  (new)
 *   proactive_agency     -> world_sense  (new)
 *   belief_updating      -> thinking     (new)
 * Full rationale, differentiation-from-existing-attributes argument, and
 * bipolar (high-cost/low-benefit) formulation for each is in
 * `docs/phase6.5-taxonomy-audit.md` §4 and
 * `docs/phase6.5b-taxonomy-quiz-design.md` §6.
 *
 * Consolidation decisions vs. the original brainstorm list (taxonomy_v1,
 * Phase 0) are documented in CLAUDE.md ("Attribute taxonomy"). Summary of
 * merges:
 *   analytical_thinking + (rigor)          -> analytical_rigor
 *   systems_thinking + abstract_thinking   -> systems_abstraction
 *   creative_divergence + originality      -> creative_originality
 *   cross_disciplinary_thinking + generalist orientation -> cross_domain_range
 *   discipline + consistency               -> discipline
 *   decision_speed                         -> decisiveness (moved to resilience facet)
 *   independence (social) + autonomy       -> autonomy_need
 *   recognition_motivation                 -> dropped (weak discriminative value, high social-desirability bias)
 *   aesthetic_sensitivity                  -> added (needed to separate creative profiles)
 *
 * `perfectionism`/`detail_orientation` were reviewed for a possible merge
 * during the Phase 6.5B decision-check and resolved as KEEP BOTH: computed
 * directly against all 35 people, r=0.728 but real, biographically coherent
 * dissociation (Buffett 58/85, Gandhi 72/55 — reversed direction from
 * Buffett). Not touched in this revision.
 *
 * IMPORTANT SEMANTICS
 * - A score is a LOCATION on a dimension (0-100 intensity/orientation).
 *   It is never a goodness rating. See CLAUDE.md "Score is not impact".
 * - `contributionShape` describes how the attribute relates to observed
 *   achievement patterns. It is an internal modelling concept used by the
 *   Greatness Potential engine. It is NOT shown to users as jargon.
 * - `baseWeight` is the matching weight. Higher = the attribute discriminates
 *   more between real profiles. Weights are deliberately close to 1.0; large
 *   spreads make matches hard to explain.
 */

export const FACETS = [
  "thinking",
  "creativity",
  "work_style",
  "resilience",
  "social",
  "motivation",
  "world_sense",
] as const;

export type Facet = (typeof FACETS)[number];

/**
 * How an attribute relates to achievement patterns in the dataset.
 * Deliberately NOT "good/bad".
 */
export type TraitContributionShape =
  /** Across nearly every observed pathway, more tends to help — with diminishing returns. */
  | "higher_can_help"
  /** Across nearly every observed pathway, lower tends to help. */
  | "lower_can_help"
  /** Extremes in either direction carry costs; mid-high band is the productive zone. */
  | "balanced"
  /** Usefulness depends entirely on situation; no directional claim. */
  | "contextual"
  /** Only helps in combination with specific other traits (archetype-specific). */
  | "cluster_dependent";

export interface AttributeDefinition {
  id: AttributeId;
  facet: Facet;
  /** Matching weight. Normalised at use time; absolute magnitude is irrelevant. */
  baseWeight: number;
  contributionShape: TraitContributionShape;
  /**
   * Reference distribution assumption used for distinctiveness / z-scores.
   * This is a MODELLING ASSUMPTION (documented in CLAUDE.md), not measured
   * population data. Versioned with `referenceVersion`.
   */
  reference: { mean: number; sd: number };
}

/**
 * REFERENCE DISTRIBUTION — reference_v1 -> reference_v2 (Phase 4)
 *
 * There are three genuinely different things that could be meant by "the
 * reference distribution for attribute X", and this codebase only ever had
 * one of them:
 *   (a) REAL POPULATION NORMS — how a general population actually scores on
 *       this attribute. NOT AVAILABLE. The Great Inside has never run a
 *       normed general-population study, and reference_v1/v2 make no claim
 *       to be one — see CLAUDE.md "Attribute taxonomy": "a stated modelling
 *       assumption, not measured population data".
 *   (b) SIMULATED QUIZ-OUTPUT DISTRIBUTIONS — what `quiz_v1` actually
 *       produces when run against 5,000-10,000 simulated latent profiles
 *       (`src/dev/trait-diagnostic.ts` simMean/simSd). This is real,
 *       reproducible data, but it measures the INSTRUMENT, not a population:
 *       Phase 4 proved several attributes' simMean sits 15-33 points above
 *       reference_v1 purely because of one-sided choice-item scoring (see
 *       "PHASE 4" in bank.ts), not because of anything true about people.
 *   (c) THE MODELLING REFERENCE — the actual `mean`/`sd` values below, used
 *       only as a stable yardstick for z-scoring how distinctive one trait is
 *       relative to a user's OTHER traits (signature trait, trait
 *       constellation, Greatness distinctiveness). This is (c), and it is
 *       deliberately NOT set equal to (b).
 *
 * WHY reference_v2 KEEPS reference_v1's NUMBERS UNCHANGED, ATTRIBUTE BY
 * ATTRIBUTE: after the Phase 4 quiz expansion (32 -> 52 -> 54 items,
 * `quiz_v1`) and its two rounds of targeted bidirectional-item fixes,
 * `correlation(oneSidedShare, meanDiff)` across all 30 attributes is still
 * 0.717 (was 0.851 pre-fix) — the causal mechanism that makes (b) an
 * unreliable stand-in for (c) is reduced, not eliminated. Only 4 of 30
 * attributes have reached the low one-sidedness (<=22%) that let
 * reference_v1 validate cleanly against simulated data in the first place:
 * persistence, conflict_tolerance, creative_originality (already near-zero
 * meanDiff, unchanged since Phase 0) and intuitive_synthesis (Phase 2 fix).
 * None of them show a meanDiff large enough to justify moving their mean.
 * Every attribute still showing a large meanDiff (collaboration +24.3,
 * execution_speed +20.4, analytical_rigor +20.0, planning_orientation
 * +19.8, deep_focus +17.2, decisiveness +17.0 as of the Phase 4 checkpoint)
 * ALSO still has oneSidedShare well above that bar (82%, 60%, 47%, 53%,
 * 52%, 45% respectively) — exactly the pattern that would be expected if
 * the residual gap is still substantially instrument artifact, not signal.
 * Moving the reference mean toward a still-biased simulated distribution
 * would launder that bias into the yardstick itself, defeating the point of
 * having an independent reference at all (the exact trap CLAUDE.md's
 * Phase-4 root-cause writeup already warned against for reference_v1).
 *
 * bumped to reference_v2 anyway, deliberately, because "re-reviewed against
 * quiz_v1 and reconfirmed, with this reasoning on record" is a different,
 * more evidenced claim than reference_v1's original "considered reasonable
 * at authoring time" — and future readers should be able to tell the two
 * apart. A future revision is warranted once a specific attribute's
 * oneSidedShare diagnostic drops meaningfully further (rough bar: below
 * ~20%, the range where reference_v1 already validated cleanly) AND a
 * meanDiff still persists at that point — that combination is the actual
 * evidence bar for "the reference was wrong", as opposed to "the instrument
 * was still asymmetric when we measured it".
 *
 * REFERENCE_VERSION -> reference_v3 (Phase 6.6 Stage 2, taxonomy_v1.1)
 *
 * Bumped when `opportunity_sensing`, `resourcefulness`, `proactive_agency`,
 * `belief_updating` were added — they need SOME reference entry to exist at
 * all, and the codebase's own precedent (reference_v1's original launch) is
 * to state an explicit assumption (mean 50 / sd 18, matching this
 * taxonomy's typical `contextual`-shape attribute) rather than invent false
 * precision from zero data. At Stage 2 this was flagged, on the record, as
 * unreviewed: "a stated assumption with zero real data... full reference
 * methodology work is Stage 6, not done yet."
 *
 * Stage 6 (Phase 6.6, 2026-08) — DIAGNOSTIC REVIEW, VALUES UNCHANGED.
 *
 * Ran the same evidence-bar test the reference_v1->v2 bump established
 * (oneSidedShare must clear ~20% AND a meanDiff must still persist at that
 * point) against LIVE quiz_v2 (64 items) output, for all 34 attributes —
 * `pnpm exec tsx src/dev/trait-diagnostic.ts`, n=5,000, cross-checked at
 * n=10,000 via `simulate.ts quiz`. Full figures in
 * `docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 6". Result: NO
 * attribute — none of the original 30, none of the 4 new ones — clears
 * that bar with a meanDiff large enough to justify moving its assumed
 * mean. Specifically for the four new attributes:
 *   - `opportunity_sensing` (0% oneSided) and `belief_updating` (0%
 *     oneSided) already measure CLEANLY at 64 items — meanDiff +4.8 and
 *     +1.7 respectively, both small, exactly the healthy pattern the
 *     reference_v2 precedent predicts for a well-measured attribute whose
 *     assumed mean happens to be close to correct. Nothing to correct.
 *   - `resourcefulness` and `proactive_agency` remain 34% one-sided —
 *     under the instrument-asymmetry mechanism CLAUDE.md's "Known open
 *     issues" #2b already tracks for older attributes, not yet clean
 *     enough to trust a mean correction either way.
 *   - All four DO carry the highest simSd/refSd ratios in the entire
 *     34-attribute bank (1.41-1.53, vs. a bank median near 1.1) — a
 *     variance-side signal, mechanically distinct from the mean-side
 *     `oneSidedShare`/`meanDiff` test above. Per explicit instruction, this
 *     is NOT treated as evidence to inflate `sd` (that would launder
 *     residual quiz-item bimodality into the yardstick, the same trap
 *     reference_v2 was created to avoid on the mean side) — it is a
 *     genuinely open question about the QUESTIONNAIRE, tracked as its own
 *     item in CLAUDE.md "Known open issues", not folded into a reference
 *     change here.
 *
 * NOT bumped to a new version string: no `mean`/`sd` value changed for any
 * of the 34 attributes as a result of this review (verified: the 30
 * original values are locked by a regression test in `attributes.test.ts`
 * and were not touched; the 4 new attributes' values are still their Stage
 * 2 stated assumption, 50/18). A version bump exists to let downstream code
 * distinguish "before this data changed" from "after" — since nothing
 * changed, `reference_v3` keeps its name; this comment block, not a new
 * constant, is the record that the review happened. See CLAUDE.md "Phase
 * 6.6 Stage 6" for the full writeup, including what reference_v3
 * deliberately does NOT claim to be (a general-population norm).
 */
export const REFERENCE_VERSION = "reference_v3";
export const TAXONOMY_VERSION = "taxonomy_v1.1";

export const ATTRIBUTE_IDS = [
  // --- thinking ---
  "curiosity",
  "analytical_rigor",
  "intuitive_synthesis",
  "systems_abstraction",
  "independent_thinking",
  "belief_updating",
  // --- creativity ---
  "creative_originality",
  "experimentation",
  "cross_domain_range",
  "aesthetic_sensitivity",
  // --- work_style ---
  "discipline",
  "deep_focus",
  "detail_orientation",
  "perfectionism",
  "execution_speed",
  "planning_orientation",
  // --- resilience ---
  "persistence",
  "adaptability",
  "risk_tolerance",
  "ambiguity_tolerance",
  "decisiveness",
  // --- social ---
  "social_assertiveness",
  "collaboration",
  "leadership_drive",
  "persuasiveness",
  "conflict_tolerance",
  // --- motivation ---
  "mastery_orientation",
  "achievement_drive",
  "competitiveness",
  "autonomy_need",
  "impact_motivation",
  // --- world_sense (added in taxonomy_v1.1, Phase 6.6 — see CLAUDE.md) ---
  "opportunity_sensing",
  "resourcefulness",
  "proactive_agency",
] as const;

export type AttributeId = (typeof ATTRIBUTE_IDS)[number];

const def = (
  id: AttributeId,
  facet: Facet,
  baseWeight: number,
  contributionShape: TraitContributionShape,
  mean: number,
  sd: number,
): AttributeDefinition => ({ id, facet, baseWeight, contributionShape, reference: { mean, sd } });

export const ATTRIBUTES: Readonly<Record<AttributeId, AttributeDefinition>> = Object.freeze({
  // ---------------------------------------------------------------- thinking
  curiosity: def("curiosity", "thinking", 1.15, "higher_can_help", 55, 17),
  analytical_rigor: def("analytical_rigor", "thinking", 1.0, "balanced", 52, 18),
  intuitive_synthesis: def("intuitive_synthesis", "thinking", 0.95, "contextual", 50, 17),
  systems_abstraction: def("systems_abstraction", "thinking", 1.0, "cluster_dependent", 50, 18),
  independent_thinking: def("independent_thinking", "thinking", 1.15, "higher_can_help", 50, 18),
  belief_updating: def("belief_updating", "thinking", 1.0, "balanced", 50, 18),

  // -------------------------------------------------------------- creativity
  creative_originality: def("creative_originality", "creativity", 1.1, "cluster_dependent", 50, 18),
  experimentation: def("experimentation", "creativity", 1.0, "higher_can_help", 50, 17),
  cross_domain_range: def("cross_domain_range", "creativity", 0.9, "contextual", 48, 18),
  aesthetic_sensitivity: def("aesthetic_sensitivity", "creativity", 0.85, "contextual", 50, 19),

  // -------------------------------------------------------------- work_style
  discipline: def("discipline", "work_style", 1.15, "higher_can_help", 55, 17),
  deep_focus: def("deep_focus", "work_style", 1.05, "higher_can_help", 52, 18),
  detail_orientation: def("detail_orientation", "work_style", 0.9, "contextual", 52, 18),
  perfectionism: def("perfectionism", "work_style", 1.0, "balanced", 52, 19),
  execution_speed: def("execution_speed", "work_style", 0.95, "balanced", 50, 17),
  planning_orientation: def("planning_orientation", "work_style", 0.9, "contextual", 52, 18),

  // -------------------------------------------------------------- resilience
  persistence: def("persistence", "resilience", 1.2, "higher_can_help", 55, 17),
  adaptability: def("adaptability", "resilience", 1.0, "higher_can_help", 53, 17),
  risk_tolerance: def("risk_tolerance", "resilience", 1.1, "cluster_dependent", 48, 19),
  ambiguity_tolerance: def("ambiguity_tolerance", "resilience", 1.0, "higher_can_help", 48, 18),
  decisiveness: def("decisiveness", "resilience", 0.9, "balanced", 50, 17),

  // ------------------------------------------------------------------ social
  social_assertiveness: def("social_assertiveness", "social", 1.0, "contextual", 50, 19),
  collaboration: def("collaboration", "social", 1.0, "cluster_dependent", 55, 18),
  leadership_drive: def("leadership_drive", "social", 1.05, "cluster_dependent", 48, 19),
  persuasiveness: def("persuasiveness", "social", 0.95, "cluster_dependent", 50, 18),
  conflict_tolerance: def("conflict_tolerance", "social", 0.9, "contextual", 45, 19),

  // -------------------------------------------------------------- motivation
  mastery_orientation: def("mastery_orientation", "motivation", 1.1, "higher_can_help", 55, 17),
  achievement_drive: def("achievement_drive", "motivation", 1.05, "balanced", 55, 18),
  competitiveness: def("competitiveness", "motivation", 0.95, "contextual", 50, 19),
  autonomy_need: def("autonomy_need", "motivation", 1.0, "contextual", 52, 18),
  impact_motivation: def("impact_motivation", "motivation", 1.0, "higher_can_help", 52, 18),

  // ------------------------------------------------------------- world_sense
  // Added in taxonomy_v1.1 (Phase 6.6). Reference mean/sd are STATED
  // ASSUMPTIONS with zero real data behind them at launch, exactly like
  // reference_v1's original attributes were — see REFERENCE_VERSION history
  // below and CLAUDE.md "Phase 6.6" for why 50/18 was chosen (matches this
  // taxonomy's typical "contextual"-shape attribute) rather than derived.
  opportunity_sensing: def("opportunity_sensing", "world_sense", 1.0, "contextual", 50, 18),
  resourcefulness: def("resourcefulness", "world_sense", 1.0, "contextual", 50, 18),
  proactive_agency: def("proactive_agency", "world_sense", 1.0, "contextual", 50, 18),
});

export const ATTRIBUTES_BY_FACET: Readonly<Record<Facet, readonly AttributeId[]>> = Object.freeze(
  FACETS.reduce(
    (acc, facet) => {
      acc[facet] = ATTRIBUTE_IDS.filter((id) => ATTRIBUTES[id].facet === facet);
      return acc;
    },
    {} as Record<Facet, readonly AttributeId[]>,
  ),
);

export function isAttributeId(value: string): value is AttributeId {
  return Object.prototype.hasOwnProperty.call(ATTRIBUTES, value);
}

export function attributeDef(id: AttributeId): AttributeDefinition {
  const d = ATTRIBUTES[id];
  if (!d) throw new Error(`Unknown attribute: ${id}`);
  return d;
}
