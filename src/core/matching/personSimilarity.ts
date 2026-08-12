/**
 * PERSON-TO-PERSON SIMILARITY — reuses matching_v2 unchanged.
 *
 * A person profile page needs "Similar People" and "Opposite Profiles" (product
 * spec item 37), which is person-vs-person rather than user-vs-person. Rather
 * than reimplement the level/scatter/pattern formula a second time — a
 * duplication that would silently drift the moment matching_v2 is revised —
 * this adapts one person into the shape `matchUserToPerson` already expects and
 * calls it completely unchanged. `similarity.ts` is not modified by this file.
 *
 * THE ADAPTER: a person's unscored attributes are filled with the exact same
 * neutral value and floor confidence that `scoreQuiz` (scoring_v1) assigns to
 * an unanswered quiz question — not an arbitrary choice, but the existing
 * "we have essentially no information here" convention applied to the other
 * data source that can be incomplete. Because match weight already multiplies
 * by both sides' confidence, an attribute neither person has strong evidence
 * for barely moves the result rather than being silently treated as "both
 * exactly average and therefore identical".
 *
 * ONE DIRECTIONAL SIMPLIFICATION, documented rather than hidden: `coverage` on
 * the returned result reflects only the second person's scored-attribute
 * count (matchUserToPerson's existing behaviour — it was written to describe
 * "how much of the person we could compare against", and that framing still
 * holds here). The first person's thinness is still fully reflected in the
 * similarity NUMBER via the confidence-weighted terms above; it just isn't
 * double-counted into the coverage-shrinkage input a second time. Both people
 * must already pass `evaluateMatchEligibility` (coverage >= 0.6) to be ranked
 * at all, so neither side is ever catastrophically thin.
 */

import { ATTRIBUTE_IDS, TAXONOMY_VERSION, type AttributeId } from "../attributes/attributes.js";
import type { Confidence, MatchResult, Person, Score, UserProfile } from "../types.js";
import { SCORING_CONSTANTS } from "../quiz/scoring.js";
import { contextualDistance } from "./selectors.js";
import { matchUserToPerson, type MatchOptions } from "./similarity.js";

export const PERSON_SIMILARITY_VERSION = "person_similarity_v1";

/** Fixed, not Date.now(): src/core stays pure — same input, same output, forever. */
const ADAPTER_EPOCH = "1970-01-01T00:00:00.000Z";

function personAsUserProfile(person: Person): UserProfile {
  const byId = new Map(person.attributes.map((a) => [a.attributeId, a]));
  const scores = {} as Record<AttributeId, Score>;
  const confidence = {} as Record<AttributeId, Confidence>;
  for (const id of ATTRIBUTE_IDS) {
    const attr = byId.get(id);
    scores[id] = attr ? attr.score : SCORING_CONSTANTS.NEUTRAL_SCORE;
    confidence[id] = attr ? attr.confidence : SCORING_CONSTANTS.MIN_CONFIDENCE;
  }
  return {
    id: `person_as_user_${person.id}`,
    quizVersion: "n/a",
    scoringVersion: "n/a",
    taxonomyVersion: TAXONOMY_VERSION,
    scores,
    confidence,
    completedAt: ADAPTER_EPOCH,
  };
}

export interface PersonSimilarity extends MatchResult {
  person: Person;
}

/** Symmetric in spirit (both sides' confidence is used), but not literally
 *  commutative — matchUserToPerson's coverage framing anchors on the second
 *  argument, per the header note above. Compare a <- b for the reverse view. */
export function personToPersonSimilarity(
  a: Person,
  b: Person,
  options: MatchOptions = {},
): PersonSimilarity {
  return { ...matchUserToPerson(personAsUserProfile(a), b, options), person: b };
}

/**
 * Ranks every OTHER match-eligible person by similarity to `anchor`. Excludes
 * the anchor itself. Ties break on person id — never popularity or recency,
 * consistent with `rankMatches`.
 */
export function rankSimilarPeople(
  anchor: Person,
  people: readonly Person[],
  options: MatchOptions = {},
): PersonSimilarity[] {
  return people
    .filter((p) => p.isMatchEligible && p.id !== anchor.id)
    .map((p) => personToPersonSimilarity(anchor, p, options))
    .sort((x, y) => y.rawSimilarity - x.rawSimilarity || x.personId.localeCompare(y.personId));
}

/** Lowest similarity among other eligible people. Framed as curiosity, not a
 *  judgement — identical spirit to `selectOppositeProfile` in selectors.ts. */
export function selectOppositePerson(
  anchor: Person,
  people: readonly Person[],
  options: MatchOptions = {},
): PersonSimilarity | undefined {
  const ranked = rankSimilarPeople(anchor, people, options);
  return ranked.length === 0 ? undefined : ranked[ranked.length - 1];
}

/** Re-exported for convenience: person pages want the same "how different is
 *  their world" signal the Unexpected Match selector already uses. */
export { contextualDistance };
