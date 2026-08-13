/**
 * RESULT SNAPSHOT BUILDER — Phase 10C, Strategy A.
 *
 * Computes a `ResultSnapshotV1` ONCE, by calling `computeResultView`
 * (`resultView.ts`) — the SAME shared orchestration `/results/page.tsx`
 * calls on every anonymous render — and translating its combined output
 * into the small, JSON-serialisable, id-and-number-only shape `snapshot.ts`
 * defines. No selection/scoring logic of its own lives here; parity with
 * `/results` is structural (one shared function), not merely conventional
 * (two call sites happening to agree) — see `resultView.ts`'s own doc
 * comment for why that distinction was worth a dedicated module.
 *
 * The correctness of "this snapshot equals what the user actually saw"
 * does NOT come from anything in this file — it comes from the CALLER
 * (`saveCompletedResult.ts`) only ever invoking this function after it has
 * just confirmed completion-time provenance still equals current
 * provenance (the Phase 10C claim-time drift guard). This file has no
 * awareness of that guard and does not need one: given a `UserProfile` and
 * a `people` roster, it always computes the same honest snapshot of
 * "what would `/results` show for this input, right now" — same input,
 * same output, forever, per this project's `src/core` purity rule.
 */
import { ATTRIBUTE_IDS, ATTRIBUTES } from "../attributes/attributes.js";
import type { Person, TraitComparison, UserProfile } from "../types.js";
import { computeResultView } from "./resultView.js";
import { RESULT_SNAPSHOT_SCHEMA_VERSION, type ResultSnapshotV1, type SnapshotTraitComparison } from "./snapshot.js";

function toComparison(c: TraitComparison): SnapshotTraitComparison {
  return { attributeId: c.attributeId, userScore: c.userScore, personScore: c.personScore };
}

export function buildResultSnapshot(user: UserProfile, people: readonly Person[]): ResultSnapshotV1 {
  const { results, greatness, signature, highlights, resultArchetype, advantage } = computeResultView(user, people);
  const closest = results.closest;

  const traits: ResultSnapshotV1["traits"] = {};
  for (const id of ATTRIBUTE_IDS) {
    const score = user.scores[id] ?? 50;
    const confidence = user.confidence[id] ?? 0.2;
    const ref = ATTRIBUTES[id].reference;
    traits[id] = { score, confidence, z: (score - ref.mean) / ref.sd };
  }

  const dualEdgedTop = greatness.dualEdgedContributors[0];

  const personNames: Record<string, string> = {};
  if (closest) personNames[closest.person.id] = closest.person.canonicalName;
  for (const cm of results.categoryMatches) {
    const p = people.find((pp) => pp.id === cm.personId);
    if (p) personNames[p.id] = p.canonicalName;
  }

  return {
    snapshotSchemaVersion: RESULT_SNAPSHOT_SCHEMA_VERSION,
    traits,
    highlights: highlights.map((h) => h.attributeId),
    signature: signature
      ? {
          attributeId: signature.attributeId,
          score: signature.score,
          confidence: user.confidence[signature.attributeId] ?? 0.2,
        }
      : undefined,
    greatness: {
      score: greatness.score,
      rawScore: greatness.rawScore,
      bandId: greatness.bandId,
      components: { ...greatness.components },
      primaryArchetypeId: greatness.primaryArchetypeId,
      secondaryArchetypeId: greatness.secondaryArchetypeId,
      dualEdged: dualEdgedTop ? { attributeId: dualEdgedTop.attributeId, score: dualEdgedTop.score } : undefined,
    },
    resultArchetype,
    closest: closest
      ? {
          personId: closest.personId,
          overallMatch: closest.overallMatch,
          explanationTrait: closest.closestTraits[0] ? toComparison(closest.closestTraits[0]) : undefined,
        }
      : undefined,
    comparison: {
      closestTraits: (closest?.closestTraits ?? []).slice(0, 4).map(toComparison),
      userHigherTraits: (closest?.userHigherTraits ?? []).slice(0, 3).map(toComparison),
      personHigherTraits: (closest?.personHigherTraits ?? []).slice(0, 3).map(toComparison),
      advantage: advantage.map(toComparison),
    },
    categoryMatches: results.categoryMatches.map((cm) => ({ facet: cm.facet, personId: cm.personId, match: cm.match })),
    personNames,
  };
}
