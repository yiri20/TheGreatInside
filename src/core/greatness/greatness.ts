/**
 * GREATNESS POTENTIAL — greatness_v1
 *
 * WHAT IT IS: an entertainment-oriented profile metric describing how strongly a
 * user's measured trait pattern aligns with the range of achievement patterns
 * represented in The Great Inside dataset.
 *
 * WHAT IT IS NOT: a probability of success. The dataset contains extraordinary
 * people only — there is no control group of people who did not become notable,
 * so no base rate exists and no probability can be estimated. The product must
 * never render this as a percentage or call it a success probability. It is
 * always displayed as "N / 100".
 *
 * COMPOSITION (each component in [0,1]):
 *
 *   A  archetypeAffinity   0.50  best-fitting achievement patterns, top-2 blended
 *   D  distinctiveness     0.22  does the profile have pronounced tendencies at all
 *   C  coherence           0.13  is the combination internally consistent
 *   E  engineTraits        0.15  traits that support nearly every observed pathway,
 *                                with diminishing returns AND a deliberate rollover
 *
 *   raw = 0.50A + 0.22D + 0.13C + 0.15E   ->  calibrated to 0-100
 *
 * WHY NOT AN AVERAGE OF TRAIT SCORES: that would encode "higher is always
 * better" for all 30 attributes, which is false and is the single most important
 * thing this engine must not assert. Band-based archetype fit means overshooting
 * a target earns nothing, and several archetypes have deliberately LOW targets.
 *
 * DELIBERATE PROPERTIES:
 *   - High Greatness Potential does not require a high individual match, and a
 *     high individual match does not guarantee high potential. These are
 *     different questions and are never combined into one number.
 *   - Metadata (nationality, era, fame, wealth, gender, locale) is not an input.
 *   - Pure and deterministic: same vector in, same score out, forever, for a
 *     given greatnessScoringVersion.
 */

import { ATTRIBUTES, ATTRIBUTE_IDS, type AttributeId } from "../attributes/attributes.js";
import type { Person, UserProfile } from "../types.js";
import {
  ARCHETYPE_IDS,
  deriveArchetypeCentroids,
  type ArchetypeDefinition,
  type ArchetypeId,
} from "./archetypes.js";
import { interpolateAnchors } from "../matching/calibration.js";

export const GREATNESS_SCORING_VERSION = "greatness_v1";

export const GREATNESS_WEIGHTS = {
  archetypeAffinity: 0.5,
  distinctiveness: 0.22,
  coherence: 0.13,
  engineTraits: 0.15,
} as const;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* --------------------------------------------------- component: affinity */

/** Distance outside the band, in points. Inside the band costs nothing. */
function bandShortfall(score: number, target: number, tolerance: number): number {
  const low = target - tolerance;
  const high = target + tolerance;
  if (score < low) return low - score;
  if (score > high) return score - high;
  return 0;
}

export function archetypeAffinity(
  scores: Readonly<Record<AttributeId, number>>,
  archetype: ArchetypeDefinition,
): number {
  let num = 0;
  let den = 0;
  for (const band of archetype.signature) {
    const score = scores[band.attributeId];
    if (score === undefined) continue;
    const d = bandShortfall(score, band.target, band.tolerance) / 100;
    num += band.weight * d * d;
    den += band.weight;
  }
  if (den === 0) return 0;
  // Rescaled: a shortfall of 50 points on every signature trait floors at 0.
  return clamp01(1 - Math.sqrt(num / den) / 0.5);
}

/* ---------------------------------------------- component: distinctiveness */

/** Mean |z| of the five most pronounced traits, capped so extremity plateaus. */
export function distinctiveness(scores: Readonly<Record<AttributeId, number>>): number {
  const Z_CAP = 2.2;
  const zs = ATTRIBUTE_IDS.map((id) => {
    const ref = ATTRIBUTES[id].reference;
    const score = scores[id];
    return score === undefined ? 0 : Math.min(Z_CAP, Math.abs((score - ref.mean) / ref.sd));
  }).sort((a, b) => b - a);
  const top = zs.slice(0, 5);
  return clamp01(top.reduce((s, z) => s + z, 0) / (top.length * Z_CAP));
}

/* --------------------------------------------------- component: coherence */

/**
 * Internal-consistency check. Certain trait pairs pull against each other; a
 * profile maxed on both sides of a tension is usually a response-style artefact
 * rather than a real pattern, and it is not a combination observed among the
 * people in the dataset.
 *
 * v1 uses a small reviewed list of tension pairs. Once the dataset passes ~150
 * reviewed profiles this is replaced by the empirical correlation structure —
 * a correlation matrix estimated from 10-30 people would be noise.
 */
export const TENSION_PAIRS: ReadonlyArray<readonly [AttributeId, AttributeId, number]> = [
  ["perfectionism", "execution_speed", 1.0],
  ["planning_orientation", "ambiguity_tolerance", 0.7],
  ["autonomy_need", "collaboration", 0.8],
  ["competitiveness", "collaboration", 0.6],
  ["decisiveness", "analytical_rigor", 0.5],
  ["risk_tolerance", "detail_orientation", 0.5],
  ["deep_focus", "cross_domain_range", 0.6],
];

export function coherence(scores: Readonly<Record<AttributeId, number>>): number {
  const THRESHOLD = 75;
  let penalty = 0;
  let maxPenalty = 0;
  for (const [a, bId, w] of TENSION_PAIRS) {
    maxPenalty += w;
    const sa = scores[a];
    const sb = scores[bId];
    if (sa === undefined || sb === undefined) continue;
    // Both far above the threshold => the tension is being claimed in both directions.
    const overA = Math.max(0, sa - THRESHOLD) / (100 - THRESHOLD);
    const overB = Math.max(0, sb - THRESHOLD) / (100 - THRESHOLD);
    penalty += w * overA * overB;
  }
  return maxPenalty === 0 ? 1 : clamp01(1 - penalty / maxPenalty);
}

/* ----------------------------------------------- component: engine traits */

/**
 * The narrow set of attributes that show up as supportive across essentially
 * every pathway in the dataset. Even here the curve ROLLS OVER above 90: a
 * profile pinned at 100 on discipline and persistence is not the peak of the
 * model, because extreme rigidity carries its own costs.
 */
export const ENGINE_TRAITS: readonly AttributeId[] = [
  "persistence",
  "curiosity",
  "discipline",
  "mastery_orientation",
  "adaptability",
];

export function engineTraitPlateau(score: number): number {
  if (score <= 80) return clamp01(score / 80);
  return clamp01(1 - ((score - 80) / 20) * 0.12);
}

export function engineTraits(scores: Readonly<Record<AttributeId, number>>): number {
  const values = ENGINE_TRAITS.map((id) => engineTraitPlateau(scores[id] ?? 50));
  return values.reduce((s, v) => s + v, 0) / values.length;
}

/* -------------------------------------------------------------- calibration */

/**
 * Fitted by `pnpm calibrate` against 10,000 simulated profiles (2026-08,
 * refreshed after the Phase 4 quiz expansion — `quiz_v1` grew from 32 to 56
 * items across three rounds of bidirectionality fixes, which shifts the
 * simulated distribution this curve is fit against even though the
 * distinctiveness (D) component's `reference_v2` z-score values are
 * numerically unchanged from `reference_v1` — see CLAUDE.md "Phase 4"). Row
 * comments give the percentile of the simulated raw distribution each anchor
 * came from. Target shape: median 58, usable spread across roughly 20-90, no
 * floor inflation. Deliberately NOT tuned so that everyone lands above 70.
 *
 * Refit (Phase 6.6 Stage 8, 2026-08) against `pnpm calibrate quiz 50000`,
 * 50,000 simulated `quiz_v2` profiles under `taxonomy_v1.1` (34 attributes) —
 * stability confirmed at a second, independent seed offset. `greatness_v1`'s
 * FORMULA was not touched (still `0.50A + 0.22D + 0.13C + 0.15E`); only this
 * presentation curve moved, because the underlying raw distribution moved.
 * That raw shift is itself a real, traced consequence, not display drift
 * layered on display drift: `archetypeAffinity` (A), `coherence` (C), and
 * `engineTraits` (E) don't reference any of the four Phase 6.6 attributes at
 * all (closed, unchanged lists/bands), so the entire shift is mechanically
 * confined to `distinctiveness` (D) — driven by `quiz_v2`'s item rewrites
 * changing users' simulated scores on the ORIGINAL 30 attributes relative to
 * their unchanged `reference_v3` means, not by anything Greatness-specific.
 * Same target table (median 58, no floor inflation) as every prior fit —
 * unchanged, not re-tuned. See CLAUDE.md "Phase 6.6 Stage 8" and
 * `docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 8" for the full
 * before/after distribution and the reasoning for why this is display
 * recalibration, not a `greatness_v1` redesign.
 */
export const GREATNESS_CALIBRATION_ANCHORS: ReadonlyArray<readonly [number, number]> = [
  [0.0, 1],
  [0.6488, 8], // p0.1
  [0.6943, 17], // p1
  [0.7331, 27], // p5
  [0.753, 34], // p10
  [0.7867, 46], // p25
  [0.8247, 58], // p50
  [0.8604, 70], // p75
  [0.8902, 80], // p90
  [0.9077, 86], // p95
  [0.9353, 93], // p99
  [0.9593, 97], // p99.9
  [1.0, 99],
];

export function calibrateGreatness(raw: number): number {
  return Math.round(interpolateAnchors(clamp01(raw), GREATNESS_CALIBRATION_ANCHORS));
}

/* ------------------------------------------------------- interpretation bands */

export interface GreatnessBand {
  id: string;
  min: number;
  max: number;
  labelKey: string;
}

/**
 * Neutral, non-insulting language. No band is framed as failure or weakness —
 * a low band means "this measured pattern is less common in this dataset", which
 * is a statement about a curated dataset, not about the person.
 */
export const GREATNESS_BANDS: readonly GreatnessBand[] = [
  { id: "uncommon_alignment", min: 0, max: 39, labelKey: "greatness.band.uncommon_alignment" },
  { id: "emerging_pattern", min: 40, max: 59, labelKey: "greatness.band.emerging_pattern" },
  { id: "strong_pattern", min: 60, max: 74, labelKey: "greatness.band.strong_pattern" },
  { id: "high_alignment", min: 75, max: 89, labelKey: "greatness.band.high_alignment" },
  { id: "exceptional_alignment", min: 90, max: 100, labelKey: "greatness.band.exceptional_alignment" },
];

export function bandFor(score: number): GreatnessBand {
  return GREATNESS_BANDS.find((b) => score >= b.min && score <= b.max) ?? GREATNESS_BANDS[0]!;
}

/* ------------------------------------------------------- category potential */

export const POTENTIAL_CATEGORIES = {
  creative: ["creative_creator", "independent_creator"],
  scientific: ["scientific_explorer", "scholarly_specialist"],
  entrepreneurial: ["entrepreneurial_builder", "technical_innovator"],
  leadership: ["organizational_leader", "social_influencer"],
  independent: ["independent_creator", "cross_disciplinary_generalist"],
} as const satisfies Record<string, readonly ArchetypeId[]>;

export type PotentialCategory = keyof typeof POTENTIAL_CATEGORIES;

/* ------------------------------------------------------------------ output */

export interface AttributeContribution {
  attributeId: AttributeId;
  score: number;
  /** Signed contribution to the best-fitting archetype's affinity. */
  effect: number;
}

export interface GreatnessResult {
  score: number;
  rawScore: number;
  bandId: string;
  components: {
    archetypeAffinity: number;
    distinctiveness: number;
    coherence: number;
    engineTraits: number;
  };
  /** Descending affinity across all archetypes. */
  archetypeAffinities: Array<{ archetypeId: ArchetypeId; affinity: number }>;
  primaryArchetypeId: ArchetypeId;
  secondaryArchetypeId: ArchetypeId | undefined;
  categoryPotential: Record<PotentialCategory, number>;
  strongContributors: AttributeContribution[];
  dualEdgedContributors: AttributeContribution[];
  growthOpportunities: AttributeContribution[];
  greatnessScoringVersion: string;
}

export interface GreatnessOptions {
  /** Dataset used to shrink archetype centroids toward observed profiles. */
  people?: readonly Person[];
}

export function computeGreatnessPotential(
  user: UserProfile,
  options: GreatnessOptions = {},
): GreatnessResult {
  const centroids = deriveArchetypeCentroids(options.people ?? []);
  const scores = user.scores;

  const affinities = ARCHETYPE_IDS.map((archetypeId) => ({
    archetypeId,
    affinity: archetypeAffinity(scores, centroids[archetypeId]),
  })).sort((a, b) => b.affinity - a.affinity || a.archetypeId.localeCompare(b.archetypeId));

  const first = affinities[0]!;
  const second = affinities[1];
  // Top-2 blend: aligning with more than one pathway is itself meaningful, but
  // the best fit dominates so a broadly mediocre profile cannot accumulate.
  const A = 0.75 * first.affinity + 0.25 * (second?.affinity ?? first.affinity);

  const D = distinctiveness(scores);
  const C = coherence(scores);
  const E = engineTraits(scores);

  const rawScore = clamp01(
    GREATNESS_WEIGHTS.archetypeAffinity * A +
      GREATNESS_WEIGHTS.distinctiveness * D +
      GREATNESS_WEIGHTS.coherence * C +
      GREATNESS_WEIGHTS.engineTraits * E,
  );
  const score = calibrateGreatness(rawScore);

  const categoryPotential = {} as Record<PotentialCategory, number>;
  for (const [category, ids] of Object.entries(POTENTIAL_CATEGORIES) as Array<
    [PotentialCategory, readonly ArchetypeId[]]
  >) {
    const best = Math.max(...ids.map((id) => archetypeAffinity(scores, centroids[id])));
    // Category scores reuse the same calibration curve as the headline score so
    // "82 overall / 91 creative" means the same thing on both axes.
    categoryPotential[category] = calibrateGreatness(
      GREATNESS_WEIGHTS.archetypeAffinity * best +
        GREATNESS_WEIGHTS.distinctiveness * D +
        GREATNESS_WEIGHTS.coherence * C +
        GREATNESS_WEIGHTS.engineTraits * E,
    );
  }

  // Breakdown is computed against the primary archetype's bands, so "growth
  // opportunity" always means "relative to this pattern", never "deficiency".
  const primary = centroids[first.archetypeId];
  const contributions: AttributeContribution[] = primary.signature.map((band) => {
    const score_ = scores[band.attributeId] ?? 50;
    const shortfall = bandShortfall(score_, band.target, band.tolerance);
    return { attributeId: band.attributeId, score: score_, effect: -shortfall * band.weight };
  });

  const dualEdgedShapes = new Set(["balanced", "cluster_dependent"]);
  const inBand = contributions.filter((c) => c.effect === 0);
  const dualEdgedContributors = inBand
    .filter((c) => dualEdgedShapes.has(ATTRIBUTES[c.attributeId].contributionShape) && c.score >= 70)
    .sort((a, b) => b.score - a.score);
  const dualEdgedIds = new Set(dualEdgedContributors.map((c) => c.attributeId));

  return {
    score,
    rawScore,
    bandId: bandFor(score).id,
    components: { archetypeAffinity: A, distinctiveness: D, coherence: C, engineTraits: E },
    archetypeAffinities: affinities,
    primaryArchetypeId: first.archetypeId,
    secondaryArchetypeId: second?.archetypeId,
    categoryPotential,
    strongContributors: inBand
      .filter((c) => !dualEdgedIds.has(c.attributeId))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5),
    dualEdgedContributors: dualEdgedContributors.slice(0, 3),
    growthOpportunities: contributions
      .filter((c) => c.effect < 0)
      .sort((a, b) => a.effect - b.effect)
      .slice(0, 3),
    greatnessScoringVersion: GREATNESS_SCORING_VERSION,
  };
}
