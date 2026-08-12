/**
 * RESULT SELECTORS — closest / unexpected / opposite / category matches.
 *
 * Rule: these selectors NEVER modify a similarity score. They only *filter and
 * re-order an already-computed honest ranking*. Diversity criteria decide which
 * of several similar candidates gets surfaced, not how similar they are.
 */

import { FACETS, type Facet } from "../attributes/attributes.js";
import type { Person } from "../types.js";
import { calibrateMatch, interpolateAnchors, MATCH_CALIBRATION_ANCHORS } from "./calibration.js";
import { facetSimilarity, type RankedMatch, type MatchOptions, rankMatches } from "./similarity.js";
import type { UserProfile } from "../types.js";

export interface CategoryMatch {
  facet: Facet;
  personId: string;
  match: number;
}

export interface ResultSet {
  ranked: RankedMatch[];
  closest: RankedMatch | undefined;
  top10: RankedMatch[];
  unexpected: UnexpectedMatch | undefined;
  opposite: RankedMatch | undefined;
  categoryMatches: CategoryMatch[];
}

export interface UnexpectedMatch extends RankedMatch {
  /** 0..1, how far this person sits from the closest match in field/era/region. */
  distinctnessScore: number;
}

/* ------------------------------------------------------- unexpected match */

/**
 * Candidate pool = people whose similarity is still genuinely high (within
 * `similarityWindow` of the top raw similarity, and above `minRaw`). Among
 * those we pick the one MOST distant in field, era and region from the #1
 * match — the surprise comes from context, not from a manipulated number.
 */
/**
 * `similarityWindow` is RELATIVE to the user's own top match, not an absolute
 * raw-similarity floor. An absolute floor makes the feature dataset-dependent:
 * the first version used minRaw 0.72 and surfaced an Unexpected Match for only
 * 7.5% of simulated users, because raw similarity to an extraordinary profile
 * is rarely that high in the first place. Relative windowing asks the right
 * question — "who else is nearly as close as my #1?" — and stays meaningful
 * whatever the dataset does to the raw scale.
 */
export const UNEXPECTED_CONFIG = {
  similarityWindow: 0.015,
  poolSize: 10,
  /** Below this the two lives are not different enough to be a surprise. */
  minContextualDistance: 0.45,
  weights: { field: 0.5, era: 0.3, region: 0.2 },
} as const;

const ERA_ORDER = [
  "ancient",
  "medieval",
  "early_modern",
  "19th_century",
  "20th_century",
  "contemporary",
] as const;

function jaccardDistance(a: readonly string[], b: readonly string[]): number {
  if (a.length === 0 && b.length === 0) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  let inter = 0;
  for (const x of setA) if (setB.has(x)) inter++;
  const union = setA.size + setB.size - inter;
  return union === 0 ? 0 : 1 - inter / union;
}

function eraDistance(a: Person, b: Person): number {
  const ia = ERA_ORDER.indexOf(a.era);
  const ib = ERA_ORDER.indexOf(b.era);
  if (ia < 0 || ib < 0) return 0;
  return Math.abs(ia - ib) / (ERA_ORDER.length - 1);
}

export function contextualDistance(a: Person, b: Person): number {
  const { weights } = UNEXPECTED_CONFIG;
  const field = jaccardDistance([...a.fieldIds, ...a.occupationIds], [...b.fieldIds, ...b.occupationIds]);
  const era = eraDistance(a, b);
  const region = a.regionCode === b.regionCode ? 0 : 1;
  return weights.field * field + weights.era * era + weights.region * region;
}

export function selectUnexpectedMatch(ranked: readonly RankedMatch[]): UnexpectedMatch | undefined {
  const top = ranked[0];
  if (!top) return undefined;
  const pool = ranked
    .slice(1, 1 + UNEXPECTED_CONFIG.poolSize)
    .filter((m) => top.rawSimilarity - m.rawSimilarity <= UNEXPECTED_CONFIG.similarityWindow);
  if (pool.length === 0) return undefined;

  let best: UnexpectedMatch | undefined;
  for (const candidate of pool) {
    const distinctnessScore = contextualDistance(top.person, candidate.person);
    if (
      !best ||
      distinctnessScore > best.distinctnessScore ||
      (distinctnessScore === best.distinctnessScore &&
        candidate.personId.localeCompare(best.personId) < 0)
    ) {
      best = { ...candidate, distinctnessScore };
    }
  }
  // If nothing is actually from a different world, there is no surprise to show.
  return best && best.distinctnessScore >= UNEXPECTED_CONFIG.minContextualDistance
    ? best
    : undefined;
}

/* ---------------------------------------------------------------- opposite */

/** Lowest similarity among eligible people. Framed as curiosity, never as "worst match". */
export function selectOppositeProfile(ranked: readonly RankedMatch[]): RankedMatch | undefined {
  return ranked.length === 0 ? undefined : ranked[ranked.length - 1];
}

/* -------------------------------------------------------- category matches */

/**
 * Phase 6: category matches walk facets in a FIXED order (`FACETS`) and
 * prefer a person not already used for an earlier facet — but only when that
 * costs little. `maxDiversityCost` is a raw-similarity budget, the same
 * order of magnitude as `UNEXPECTED_CONFIG.similarityWindow` above: small
 * enough that once a genuinely better (not just different) match exists for
 * a facet, relevance always wins over variety. This never touches
 * `facetSimilarity` itself — same "select, don't re-score" rule as every
 * other function in this file.
 */
export const CATEGORY_DIVERSITY_CONFIG = {
  maxDiversityCost: 0.02,
} as const;

export function selectCategoryMatches(
  user: UserProfile,
  people: readonly Person[],
): CategoryMatch[] {
  const eligible = people.filter((p) => p.isMatchEligible);
  const used = new Set<string>();
  const out: CategoryMatch[] = [];

  for (const facet of FACETS) {
    const ranked = eligible
      .map((person) => ({ person, raw: facetSimilarity(user, person, facet) }))
      .sort((a, b) => b.raw - a.raw || a.person.id.localeCompare(b.person.id));
    const best = ranked[0];
    if (!best) continue;

    const notYetUsed = ranked.find((r) => !used.has(r.person.id));
    const pick =
      notYetUsed && best.raw - notYetUsed.raw <= CATEGORY_DIVERSITY_CONFIG.maxDiversityCost
        ? notYetUsed
        : best;

    used.add(pick.person.id);
    out.push({ facet, personId: pick.person.id, match: calibrateMatch(pick.raw) });
  }
  return out;
}

/* ------------------------------------------------------------ full result */

export function buildResultSet(
  user: UserProfile,
  people: readonly Person[],
  options: MatchOptions = {},
): ResultSet {
  const ranked = rankMatches(user, people, options);
  return {
    ranked,
    closest: ranked[0],
    top10: ranked.slice(0, 10),
    unexpected: selectUnexpectedMatch(ranked),
    opposite: selectOppositeProfile(ranked),
    categoryMatches: selectCategoryMatches(user, people),
  };
}

/** Exposed for the calibration tooling and the debug dashboard. */
export const calibrationInternals = { interpolateAnchors, MATCH_CALIBRATION_ANCHORS };
