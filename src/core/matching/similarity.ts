/**
 * MATCHING ENGINE — matching_v2
 *
 * Deterministic. No AI. No randomness. No I/O.
 *
 * METHOD: a three-component decomposition of profile distance — LEVEL, SCATTER,
 * and PATTERN — following the classic Cronbach & Gleser (1953) elevation /
 * scatter / shape breakdown of profile similarity, computed over confidence- and
 * dispersion-weighted attributes rescaled to [0,1].
 *
 * WHY THREE COMPONENTS, NOT TWO (this is a versioned correction — see
 * "matching_v1 -> v2" below for the defect that forced it):
 *
 *   level_i   = weighted mean score, each side                 (how high overall)
 *   scatter_i = weighted RMS deviation from own level, each side (how much internal spread)
 *   pattern_i = each side's deviations divided by ITS OWN scatter (which traits
 *               stand out RELATIVE TO THAT PERSON'S OWN BASELINE, direction only)
 *
 *   raw = 1 - sqrt( PATTERN_WEIGHT · patternTerm + SCATTER_WEIGHT · scatterTerm
 *                   + LEVEL_WEIGHT · levelTerm )
 *
 * `discriminative_i` (dispersion.ts) is a frozen, versioned per-attribute factor
 * reflecting how much the DATASET varies on that attribute; it scales attribute
 * weight the same way in all three components.
 *
 * WHY EUCLIDEAN, NOT COSINE OR MANHATTAN (unchanged from v1):
 *   - Cosine ignores magnitude, and since every attribute is non-negative all
 *     vectors sit in the positive orthant and cosine collapses to ~0.9-1.0.
 *   - Manhattan treats one 60-point gap like six 10-point gaps; the squared
 *     term matches how people actually read a single huge difference.
 *
 * MISSING ATTRIBUTES: excluded from every sum, so an unscored trait neither
 * helps nor penalises. It lowers `coverage` instead, which gates eligibility.
 *
 * NEVER an input: nationality, region, gender, era, wealth, fame, occupation,
 * popularity, or locale. Those are metadata and are filtered/labelled only.
 *
 * ---------------------------------------------------------------------------
 * matching_v1 -> v2: the flat-profile defect
 * ---------------------------------------------------------------------------
 * v1 used a two-part level/shape split:
 *
 *     shapeSq = (1/Σw) Σ w_i · ((person_i - personLevel) - (user_i - userLevel))²
 *
 * At n=10 this fixed a worse bug (whoever had the least extreme overall LEVEL
 * dominated). But it conflates two different things: how much a person's OWN
 * profile varies (scatter) and whether two profiles vary in the SAME DIRECTIONS
 * (true pattern). If a person's deviations are all near zero — a FLAT profile,
 * elevated everywhere with little internal peak/valley structure — shapeSq
 * collapses to approximately the USER's own variance on those attributes,
 * which has nothing to do with the person at all. Such a person then reads as
 * "close" to nearly every user, regardless of the user's actual shape.
 *
 * Confirmed at n=35 (Phase 2 dataset expansion): Zheng He (own-profile scatter
 * 9.2, the lowest in the dataset) took 27.7% of #1 matches in 5,000 simulated
 * quiz profiles — uniform would be ~2.9%, the 20%-at-n≥30 threshold set in
 * Phase 0 was exceeded. Correlation across all 35 match-eligible people between
 * own-scatter and mean raw similarity was r = -0.624; with #1 frequency,
 * r = -0.281. A causal check (taking a fully-scored person and recomputing
 * their score with Zheng He's exact 18-attribute omission pattern) showed
 * omission pattern alone moves mean similarity by well under 1 point — scatter,
 * not missing-value handling, was the mechanism. See src/dev/investigate-*.ts.
 *
 * v2 fixes this by z-normalising each side's deviations by ITS OWN scatter
 * before comparing pattern, exactly as Cronbach's shape component requires. A
 * flat person's normalised pattern vector is (near) zero, and compared against
 * a user whose OWN normalised deviations have unit variance by construction,
 * the pattern term now lands near its NEUTRAL value (~1, i.e. "uncorrelated")
 * rather than near 0 ("identical"). Flat profiles stop getting a free pass.
 *
 * This reduced Zheng He's #1 frequency from 27.7% to ~21%, still marginally
 * over the 20% threshold and stable across sample sizes, not simulation
 * noise. A second, smaller mechanism remained: see `applyCoverageShrinkage`
 * below for the residual fix (thin, low-evidence profiles narrow the
 * comparison to a less-idiosyncratic attribute subspace). Combined, both
 * bring #1 frequency to within threshold — see CLAUDE.md "Seed dataset" for
 * final simulation results.
 */

import {
  ATTRIBUTES,
  ATTRIBUTES_BY_FACET,
  ATTRIBUTE_IDS,
  FACETS,
  type AttributeId,
  type Facet,
} from "../attributes/attributes.js";
import type {
  Confidence,
  FacetScores,
  MatchResult,
  Person,
  PersonAttribute,
  TraitComparison,
  UserProfile,
} from "../types.js";
import { calibrateMatch } from "./calibration.js";
import { discriminativeWeight } from "./dispersion.js";

export const MATCHING_VERSION = "matching_v2";

/** Eligibility thresholds. Incomplete profiles stay browsable but never match. */
export const ELIGIBILITY = {
  minScoredAttributes: 18,
  minAverageConfidence: 0.55,
  minCoverage: 0.6,
  eligibleStatuses: new Set(["approved", "published"]),
} as const;

/** A trait must differ by at least this much to be called a real difference. */
export const MEANINGFUL_DELTA = 12;
/** A trait must be within this to be called "close". */
export const CLOSE_DELTA = 10;

interface PairwiseTerm {
  attributeId: AttributeId;
  facet: Facet;
  userScore: number;
  personScore: number;
  delta: number;
  weight: number;
  /** w * d^2 — the term's actual contribution to the distance. */
  contribution: number;
  personAttr: PersonAttribute;
}

function personAttributeMap(person: Person): Map<AttributeId, PersonAttribute> {
  return new Map(person.attributes.map((a) => [a.attributeId, a]));
}

function buildTerms(user: UserProfile, person: Person): PairwiseTerm[] {
  const byId = personAttributeMap(person);
  const terms: PairwiseTerm[] = [];
  for (const attributeId of ATTRIBUTE_IDS) {
    const pa = byId.get(attributeId);
    if (!pa) continue; // unscored: excluded entirely, see header
    const userScore = user.scores[attributeId];
    if (userScore === undefined) continue;
    const userConfidence = user.confidence[attributeId] ?? 1;
    const def = ATTRIBUTES[attributeId];
    const weight =
      def.baseWeight * discriminativeWeight(attributeId) * pa.confidence * userConfidence;
    if (weight <= 0) continue;
    const d = (pa.score - userScore) / 100;
    terms.push({
      attributeId,
      facet: def.facet,
      userScore,
      personScore: pa.score,
      delta: pa.score - userScore,
      weight,
      contribution: weight * d * d,
      personAttr: pa,
    });
  }
  return terms;
}

/**
 * Component weights. Sum to 1. PATTERN carries the most weight (matching v1's
 * philosophy that "which traits stand out relative to your own baseline"
 * should count for more than raw level), SCATTER is new in v2 and captures
 * "how much do you vary at all" as its own, smaller signal, and LEVEL is
 * unchanged from v1's reasoning: dropping it would let a uniformly low profile
 * match a uniformly high one perfectly just because the peaks line up.
 */
export const PATTERN_WEIGHT = 0.5;
export const SCATTER_WEIGHT = 0.2;
export const LEVEL_WEIGHT = 0.3;

/**
 * Floor for the scatter used as a pattern-normalisation denominator, in raw
 * 0-100 score units. Guards the near-flat case: without a floor, a profile
 * with scatter just above zero would produce huge normalised deviations from
 * tiny floating-point noise. Below the floor, a profile is treated as having
 * too little internal shape to normalise meaningfully — its pattern
 * contribution shrinks toward zero rather than exploding.
 */
const PATTERN_NORMALISATION_FLOOR = 6;

interface LevelScatter {
  level: number;
  scatter: number;
}

function levelAndScatter(
  terms: readonly PairwiseTerm[],
  den: number,
  pick: (t: PairwiseTerm) => number,
): LevelScatter {
  let level = 0;
  for (const t of terms) level += t.weight * pick(t);
  level /= den;

  let variance = 0;
  for (const t of terms) {
    const d = pick(t) - level;
    variance += t.weight * d * d;
  }
  variance /= den;

  return { level, scatter: Math.sqrt(variance) };
}

function similarityFrom(terms: readonly PairwiseTerm[]): number {
  let den = 0;
  for (const t of terms) den += t.weight;
  if (den === 0) return 0;

  const user = levelAndScatter(terms, den, (t) => t.userScore);
  const person = levelAndScatter(terms, den, (t) => t.personScore);

  // Pattern: each side's deviation from ITS OWN level, divided by ITS OWN
  // scatter (floored). This is what makes it a true SHAPE comparison rather
  // than an absolute-deviation comparison — a flat person's normalised
  // deviations are all near zero, so they no longer masquerade as "close to
  // everyone" the way an un-normalised deviation would. See file header.
  const userScatterDenom = Math.max(user.scatter, PATTERN_NORMALISATION_FLOOR);
  const personScatterDenom = Math.max(person.scatter, PATTERN_NORMALISATION_FLOOR);

  let patternSq = 0;
  for (const t of terms) {
    const userDev = (t.userScore - user.level) / userScatterDenom;
    const personDev = (t.personScore - person.level) / personScatterDenom;
    const d = userDev - personDev;
    patternSq += t.weight * d * d;
  }
  patternSq /= den;
  // By construction each side's own weighted mean-square normalised deviation
  // is <= 1 (== 1 when scatter exceeds the floor), so patternSq has a natural
  // ceiling around 4 (perfectly opposite patterns). /4 rescales to [0,1].
  const patternTerm = Math.min(1, patternSq / 4);

  const scatterDiff = (person.scatter - user.scatter) / 100;
  const scatterTerm = scatterDiff * scatterDiff;

  const levelDiff = (person.level - user.level) / 100;
  const levelTerm = levelDiff * levelDiff;

  return (
    1 -
    Math.sqrt(PATTERN_WEIGHT * patternTerm + SCATTER_WEIGHT * scatterTerm + LEVEL_WEIGHT * levelTerm)
  );
}

function toComparison(t: PairwiseTerm): TraitComparison {
  return {
    attributeId: t.attributeId,
    userScore: t.userScore,
    personScore: t.personScore,
    delta: t.delta,
    absDelta: Math.abs(t.delta),
    effectiveWeight: t.weight,
    impact: t.personAttr.impact,
    confidence: t.personAttr.confidence,
  };
}

/** Total base weight of the taxonomy, used as the coverage denominator. */
const TOTAL_BASE_WEIGHT = ATTRIBUTE_IDS.reduce((s, id) => s + ATTRIBUTES[id].baseWeight, 0);

/**
 * Coverage-confidence shrinkage.
 *
 * Even after the pattern/scatter/level fix above, a residual advantage
 * remained for thin, low-evidence profiles: Zheng He (18 of 30 attributes
 * scored, coverage ~0.6) still took 20.7-20.9% of #1 matches at n=35 across
 * 10,000 simulated quiz profiles — stable across sample sizes, not noise, and
 * just over the 20%-at-n>=30 threshold. The mechanism is a second-order
 * version of the same problem: for ancient/medieval figures, the traits with
 * enough surviving evidence to score confidently (discipline, leadership,
 * decisiveness) are disproportionately the LESS idiosyncratic ones, while the
 * traits genuinely hardest to infer from fragmentary sources (aesthetic
 * sensitivity, cross-domain range, experimentation) are exactly the ones the
 * quiz bank produces the spikiest, most individuating user scores on. Scoring
 * only the former narrows the comparison to a subspace where users themselves
 * vary less — a real, defensible consequence of what ancient evidence
 * supports, not an authoring error, but one the similarity score should not
 * silently reward with false extremity.
 *
 * FIX: shrink raw similarity toward a neutral baseline in proportion to how
 * much of the taxonomy was actually measured — the same empirical-Bayes idea
 * already used for archetype centroids (`deriveArchetypeCentroids`,
 * greatness.ts), applied here at the whole-profile level instead of per
 * attribute. Full coverage (30 of 30) leaves the score untouched; a profile at
 * the eligibility floor (~0.6) has its claimed similarity pulled about 40%
 * toward "typical", because we have proportionally less evidence to justify an
 * unusual reading.
 *
 * NEUTRAL_RAW is the observed all-pairs median raw similarity from simulation
 * (see CLAUDE.md "Matching") — the safe assumption for "an arbitrary person
 * compared with an arbitrary user" when there is not enough evidence to claim
 * otherwise. It is a documented constant, not derived at runtime, so it cannot
 * drift silently as the dataset changes; recheck it during calibration.
 */
export const NEUTRAL_RAW_SIMILARITY = 0.45;

function applyCoverageShrinkage(rawSimilarity: number, coverage: number): number {
  const confidence = Math.min(1, Math.max(0, coverage));
  return NEUTRAL_RAW_SIMILARITY + (rawSimilarity - NEUTRAL_RAW_SIMILARITY) * confidence;
}

export interface MatchOptions {
  /** How many traits to surface in each breakdown list. */
  breakdownSize?: number;
}

export function matchUserToPerson(
  user: UserProfile,
  person: Person,
  options: MatchOptions = {},
): MatchResult {
  const breakdownSize = options.breakdownSize ?? 5;
  const terms = buildTerms(user, person);

  const coverage =
    terms.reduce((s, t) => s + ATTRIBUTES[t.attributeId].baseWeight, 0) / TOTAL_BASE_WEIGHT;
  // Coverage shrinkage applies only to the headline, all-attribute similarity
  // that drives ranking and the displayed Profile Match — not to facet-level
  // calls (facetMatches below), which are naturally small subsets by design
  // and already labelled as partial views rather than the primary score.
  const rawSimilarity = applyCoverageShrinkage(similarityFrom(terms), coverage);

  const facetMatches = {} as FacetScores;
  for (const facet of FACETS) {
    const facetTerms = terms.filter((t) => t.facet === facet);
    facetMatches[facet] = facetTerms.length === 0 ? 0 : calibrateMatch(similarityFrom(facetTerms));
  }

  // Ties broken by attribute id so ranking is fully deterministic.
  const byCloseness = [...terms].sort(
    (a, b) =>
      Math.abs(a.delta) - Math.abs(b.delta) || a.attributeId.localeCompare(b.attributeId),
  );
  // Difference ranking uses weighted contribution, not raw gap: a large gap on a
  // low-confidence trait should not headline the explanation.
  const byDifference = [...terms].sort(
    (a, b) => b.contribution - a.contribution || a.attributeId.localeCompare(b.attributeId),
  );

  const closestTraits = byCloseness
    .filter((t) => Math.abs(t.delta) <= CLOSE_DELTA)
    .slice(0, breakdownSize)
    .map(toComparison);

  const largestDifferences = byDifference
    .filter((t) => Math.abs(t.delta) >= MEANINGFUL_DELTA)
    .slice(0, breakdownSize)
    .map(toComparison);

  const userHigherTraits = byDifference
    .filter((t) => t.delta <= -MEANINGFUL_DELTA)
    .slice(0, breakdownSize)
    .map(toComparison);

  const personHigherTraits = byDifference
    .filter((t) => t.delta >= MEANINGFUL_DELTA)
    .slice(0, breakdownSize)
    .map(toComparison);

  return {
    personId: person.id,
    overallMatch: calibrateMatch(rawSimilarity),
    rawSimilarity,
    coverage,
    facetMatches,
    closestTraits,
    largestDifferences,
    userHigherTraits,
    personHigherTraits,
    matchingVersion: MATCHING_VERSION,
  };
}

export interface EligibilityReport {
  eligible: boolean;
  scoredAttributes: number;
  averageConfidence: Confidence;
  coverage: number;
  reasons: string[];
}

export function evaluateMatchEligibility(person: Person): EligibilityReport {
  const reasons: string[] = [];
  const scored = person.attributes.length;
  const averageConfidence =
    scored === 0 ? 0 : person.attributes.reduce((s, a) => s + a.confidence, 0) / scored;
  const coverage =
    person.attributes.reduce((s, a) => s + (ATTRIBUTES[a.attributeId]?.baseWeight ?? 0), 0) /
    TOTAL_BASE_WEIGHT;

  if (scored < ELIGIBILITY.minScoredAttributes) {
    reasons.push(`only ${scored} scored attributes (need ${ELIGIBILITY.minScoredAttributes})`);
  }
  if (averageConfidence < ELIGIBILITY.minAverageConfidence) {
    reasons.push(`average confidence ${averageConfidence.toFixed(2)} below threshold`);
  }
  if (coverage < ELIGIBILITY.minCoverage) {
    reasons.push(`coverage ${coverage.toFixed(2)} below threshold`);
  }
  if (!ELIGIBILITY.eligibleStatuses.has(person.status)) {
    reasons.push(`status "${person.status}" is not publishable`);
  }
  return { eligible: reasons.length === 0, scoredAttributes: scored, averageConfidence, coverage, reasons };
}

export interface RankedMatch extends MatchResult {
  person: Person;
}

/**
 * Ranks a user against every eligible person. Pure and stable: equal scores are
 * broken by person id, never by popularity, nationality, or recency.
 */
export function rankMatches(
  user: UserProfile,
  people: readonly Person[],
  options: MatchOptions = {},
): RankedMatch[] {
  return people
    .filter((p) => p.isMatchEligible)
    .map((person) => ({ ...matchUserToPerson(user, person, options), person }))
    .sort((a, b) => b.rawSimilarity - a.rawSimilarity || a.personId.localeCompare(b.personId));
}

/** Facet-restricted similarity, for "Closest Thinking Match" style categories. */
export function facetSimilarity(user: UserProfile, person: Person, facet: Facet): number {
  const ids = new Set<AttributeId>(ATTRIBUTES_BY_FACET[facet]);
  return similarityFrom(buildTerms(user, person).filter((t) => ids.has(t.attributeId)));
}
