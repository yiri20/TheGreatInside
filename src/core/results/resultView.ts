/**
 * SHARED RESULT ORCHESTRATION — Phase 10C parity hardening.
 *
 * Before this file existed, `app/[locale]/results/page.tsx` and
 * `buildResultSnapshot.ts` each independently called the same sequence of
 * pure functions (`buildResultSet`, `computeGreatnessPotential`,
 * `signatureTrait`, `distinctiveTraits`, `selectResultArchetype`,
 * `advantageTraits`) with the same arguments, written out twice. Given
 * `src/core`'s purity guarantee, two call sites passing identical inputs to
 * identical functions were already guaranteed to produce identical
 * outputs — but "guaranteed by two people writing the same thing correctly
 * twice" is a weaker, more fragile property than "guaranteed by there only
 * being one thing to write." A future edit to one call site (e.g. adding a
 * `MatchOptions` override) without mirroring it in the other would have
 * been a silent, hard-to-notice parity bug. This module is the single
 * orchestration both callers now use, making parity structural rather than
 * conventional.
 *
 * Pure — no I/O, no Supabase, no locale/presentation concerns. `/results`
 * additionally reads `results.unexpected`/`results.opposite`/`results.top10`
 * directly from the returned `results: ResultSet` for sections this view
 * doesn't otherwise surface (`ResultSnapshotV1` deliberately does not
 * persist those — see snapshot.ts's own scoping note); this module exposes
 * the full `ResultSet`, not a pre-trimmed one, so `/results`'s existing
 * behavior for those sections is completely unaffected by this refactor.
 */
import type { Person, TraitComparison, UserProfile } from "../types.js";
import { buildResultSet, type ResultSet } from "../matching/selectors.js";
import { computeGreatnessPotential, type GreatnessResult } from "../greatness/greatness.js";
import {
  advantageTraits,
  distinctiveTraits,
  selectResultArchetype,
  signatureTrait,
  type DistinctiveTrait,
  type ResultArchetypeId,
} from "../interpretation/rules.js";

export interface ResultView {
  results: ResultSet;
  greatness: GreatnessResult;
  signature: DistinctiveTrait | undefined;
  /** `distinctiveTraits(user, 6)` — the "What Stands Out Most" highlights. */
  highlights: DistinctiveTrait[];
  resultArchetype: ResultArchetypeId | undefined;
  /** `advantageTraits(...)` over the closest match's three comparison
   *  pools — empty (not undefined) when there is no closest match, so
   *  callers can treat this as a plain array uniformly. */
  advantage: TraitComparison[];
}

export function computeResultView(user: UserProfile, people: readonly Person[]): ResultView {
  const results = buildResultSet(user, people);
  const greatness = computeGreatnessPotential(user, { people });
  const closest = results.closest;
  const signature = signatureTrait(user);
  const highlights = distinctiveTraits(user, 6);

  const resultArchetype = closest
    ? selectResultArchetype({
        topMatch: closest.overallMatch,
        greatnessScore: greatness.score,
        distinctiveness: greatness.components.distinctiveness,
        unexpectedIsCrossField:
          results.unexpected !== undefined &&
          results.unexpected.person.fieldIds.every((f) => !closest.person.fieldIds.includes(f)),
      })
    : undefined;

  const advantage = closest
    ? advantageTraits([...closest.closestTraits, ...closest.userHigherTraits, ...closest.personHigherTraits], 3)
    : [];

  return { results, greatness, signature, highlights, resultArchetype, advantage };
}
