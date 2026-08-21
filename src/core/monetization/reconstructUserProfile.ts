/**
 * Rebuilds a `UserProfile` from an already-frozen `ResultSnapshotV1` — used
 * ONLY to generate the Deep Inside report from a result that was already
 * saved (and whose free snapshot already stores every attribute's score/
 * confidence). Deliberately reuses the frozen scores rather than re-running
 * `scoreQuiz` against the original quiz responses: this is simpler (no quiz
 * bank/response decoding needed in the Deep Inside code path at all) and
 * strictly safer against drift, since it can only ever reflect what the
 * free result already, verifiably, showed the user — never a value scoring
 * logic might compute differently after some future change.
 *
 * Missing an attribute (should not happen for a real completed result, but
 * handled defensively) falls back to the SAME neutral 50 / floor-confidence
 * 0.2 convention `scoreQuiz` itself uses for an unanswered question.
 */
import { ATTRIBUTE_IDS, type AttributeId } from "../attributes/attributes.js";
import type { ResultSnapshotV1 } from "../results/snapshot.js";
import type { UserProfile } from "../types.js";

export function reconstructUserProfileFromResultSnapshot(
  snapshot: ResultSnapshotV1,
  provenance: { quizVersion: string; scoringVersion: string; taxonomyVersion: string; completedAt: string },
): UserProfile {
  const scores = {} as Record<AttributeId, number>;
  const confidence = {} as Record<AttributeId, number>;
  for (const id of ATTRIBUTE_IDS) {
    const trait = snapshot.traits[id];
    scores[id] = trait?.score ?? 50;
    confidence[id] = trait?.confidence ?? 0.2;
  }
  return {
    id: "deep_inside_reconstructed",
    quizVersion: provenance.quizVersion,
    scoringVersion: provenance.scoringVersion,
    taxonomyVersion: provenance.taxonomyVersion,
    scores,
    confidence,
    completedAt: provenance.completedAt,
  };
}
