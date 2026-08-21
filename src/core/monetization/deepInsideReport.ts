/**
 * DEEP INSIDE REPORT — pure compute logic (Monetization v1).
 *
 * Deterministic, no generative AI, reusing the SAME matching/interpretation
 * primitives every other view in this product already uses — no new
 * scoring or matching algorithm is introduced here. Each section is
 * documented against exactly which existing, already-reviewed data it
 * draws from:
 *
 *   - Why Your Matches Fit: `rankMatches`'s own per-person
 *     `closestTraits`/`personHigherTraits`/`userHigherTraits` breakdowns
 *     (`matching/similarity.ts`), for the top 3 ranked people.
 *   - Historical Circle: the next tier of `rankMatches`'s own ranking,
 *     unmodified — a wider slice of the same honest ranking Results
 *     already shows the top of, never a re-scored or re-ordered list.
 *   - Signature Combination: `distinctiveTraits` (`interpretation/rules.ts`,
 *     the SAME selector Results' own Signature Trait uses) for the
 *     "combination" case, and `TENSION_PAIRS` (`greatness.ts`'s own
 *     reviewed coherence-penalty list — the exact threshold coherence()
 *     itself uses, 75) for the "tension" case. No new pair list, no new
 *     threshold invented for this feature.
 *   - Counterpart: `selectOppositeProfile`'s candidate (the least-similar
 *     eligible person), reusing its own `largestDifferences`/
 *     `closestTraits` breakdowns.
 *   - Strengths & Trade-offs: `distinctiveTraits` + `bandForScore`
 *     (`development.ts`) to select which authored `dev.*` guide band
 *     applies — the view resolves the actual experiment/caution copy via
 *     `t()` at render time; this module stores only the attribute id and
 *     band, never English prose.
 */
import { ATTRIBUTE_IDS } from "../attributes/attributes.js";
import type { Person, TraitComparison, UserProfile } from "../types.js";
import { rankMatches, type RankedMatch } from "../matching/similarity.js";
import { selectOppositeProfile } from "../matching/selectors.js";
import { distinctiveTraits } from "../interpretation/rules.js";
import { TENSION_PAIRS } from "../greatness/greatness.js";
import { bandForScore } from "../interpretation/development.js";
import { CURRENT_VERSIONS } from "../versions.js";
import {
  DEEP_INSIDE_REPORT_SCHEMA_VERSION,
  type DeepInsideCircleMember,
  type DeepInsideCombination,
  type DeepInsideCounterpart,
  type DeepInsideMatchExplanation,
  type DeepInsideReportV1,
  type DeepInsideStrengthTradeoff,
} from "./deepInsideSnapshot.js";
import type { SnapshotTraitComparison } from "../results/snapshot.js";

/** How many ranked matches make up "Your Historical Circle". Neither a
 *  round number nor arbitrary — the spec's own "8-12 people" target,
 *  landed at the wide end so the top-3 "Why Your Matches Fit" people are
 *  a proper subset shown in more depth, not a disjoint second list. */
export const HISTORICAL_CIRCLE_SIZE = 12;
export const WHY_MATCHES_FIT_COUNT = 3;

/** Same threshold `coherence()` (`greatness.ts`) already uses to decide
 *  whether a tension pair is "being claimed in both directions" — reused
 *  verbatim so this section can never disagree with what Greatness itself
 *  already treats as a real tension for this exact profile. */
const TENSION_CLAIM_THRESHOLD = 75;

function toComparison(t: TraitComparison): SnapshotTraitComparison {
  return { attributeId: t.attributeId, userScore: t.userScore, personScore: t.personScore };
}

function matchExplanation(match: RankedMatch, rank: number): DeepInsideMatchExplanation {
  const differing = [...match.personHigherTraits, ...match.userHigherTraits]
    .sort((a, b) => b.absDelta - a.absDelta || a.attributeId.localeCompare(b.attributeId))
    .slice(0, 4);
  return {
    personId: match.personId,
    rank,
    overallMatch: match.overallMatch,
    alignedTraits: match.closestTraits.slice(0, 4).map(toComparison),
    differingTraits: differing.map(toComparison),
  };
}

/** Top 2 of the user's own highest-z distinctive traits, both on the high
 *  side — reusing `signatureTrait`'s own filter (`z > 0`) so "combination"
 *  never surfaces a strikingly LOW pair, which is a real, separate finding
 *  this section does not claim to make. */
function signatureCombination(user: UserProfile): DeepInsideCombination[] {
  const combos: DeepInsideCombination[] = [];

  const highDistinctive = distinctiveTraits(user, ATTRIBUTE_IDS.length)
    .filter((d) => d.z > 0)
    .slice(0, 2);
  if (highDistinctive.length === 2) {
    const [a, b] = highDistinctive;
    combos.push({
      kind: "combination",
      attributeIds: [a!.attributeId, b!.attributeId],
      userScores: [a!.score, b!.score],
    });
  }

  for (const [a, b] of TENSION_PAIRS) {
    const sa = user.scores[a];
    const sb = user.scores[b];
    if (sa !== undefined && sb !== undefined && sa >= TENSION_CLAIM_THRESHOLD && sb >= TENSION_CLAIM_THRESHOLD) {
      combos.push({ kind: "tension", attributeIds: [a, b], userScores: [sa, sb] });
      break; // the single strongest/first-found reviewed tension — narrow by design, not exhaustive.
    }
  }

  return combos;
}

function counterpart(ranked: readonly RankedMatch[]): DeepInsideCounterpart | undefined {
  const opposite = selectOppositeProfile(ranked);
  if (!opposite) return undefined;
  return {
    personId: opposite.personId,
    overallMatch: opposite.overallMatch,
    differingTraits: opposite.largestDifferences.slice(0, 4).map(toComparison),
    sharedTraits: opposite.closestTraits.slice(0, 3).map(toComparison),
  };
}

/** The user's top 3 highest-side distinctive traits with authored
 *  development-guide content available for their current band — same
 *  "confidence >= 0.5, high side only" gate `signatureTrait`/
 *  `distinctiveTraits` already apply, so this can never surface an
 *  unmeasured or low-confidence attribute. */
function strengthsTradeoffs(user: UserProfile): DeepInsideStrengthTradeoff[] {
  return distinctiveTraits(user, 3)
    .filter((d) => d.z > 0)
    .map((d) => ({ attributeId: d.attributeId, score: d.score, band: bandForScore(d.score) }));
}

function personNamesFor(ids: readonly string[], people: readonly Person[]): Record<string, string> {
  const byId = new Map(people.map((p) => [p.id, p]));
  const out: Record<string, string> = {};
  for (const id of ids) {
    const p = byId.get(id);
    if (p) out[id] = p.canonicalName;
  }
  return out;
}

/**
 * `generatedAt` is caller-supplied (never `Date.now()` inside `src/core`,
 * per this project's purity rule) — the `src/lib` wrapper that actually
 * persists this report is responsible for stamping the real generation
 * time.
 */
export function buildDeepInsideReport(
  user: UserProfile,
  people: readonly Person[],
  generatedAt: string,
): DeepInsideReportV1 {
  const ranked = rankMatches(user, people, { breakdownSize: 6 });
  const top3 = ranked.slice(0, WHY_MATCHES_FIT_COUNT);
  const circleSlice = ranked.slice(0, HISTORICAL_CIRCLE_SIZE);

  const whyMatchesFit = top3.map((m, i) => matchExplanation(m, i + 1));
  const historicalCircle: DeepInsideCircleMember[] = circleSlice.map((m, i) => ({
    personId: m.personId,
    rank: i + 1,
    overallMatch: m.overallMatch,
  }));

  const cp = counterpart(ranked);

  const referencedIds = new Set<string>([
    ...whyMatchesFit.map((m) => m.personId),
    ...historicalCircle.map((m) => m.personId),
    ...(cp ? [cp.personId] : []),
  ]);

  return {
    schemaVersion: DEEP_INSIDE_REPORT_SCHEMA_VERSION,
    versions: CURRENT_VERSIONS,
    generatedAt,
    whyMatchesFit,
    historicalCircle,
    signatureCombination: signatureCombination(user),
    counterpart: cp,
    strengthsTradeoffs: strengthsTradeoffs(user),
    personNames: personNamesFor([...referencedIds], people),
  };
}
