/**
 * DISCRIMINATIVE WEIGHTING — dispersion_v1
 *
 * PROBLEM THIS SOLVES: with plain weighted distance, the person whose vector
 * sits nearest the centre of the user population wins a disproportionate share
 * of #1 matches. In the first simulation run one seed profile took 65% of all
 * top slots and another took 0%. That is centroid domination, and it makes the
 * headline result feel arbitrary.
 *
 * WHY IT HAPPENS: attributes on which every extraordinary person scores about
 * the same (persistence, mastery orientation, curiosity) carry almost no
 * information about WHICH person you resemble, yet they consume a large share of
 * the distance budget. Attributes where notable people genuinely differ
 * (leadership drive, collaboration, competitiveness, aesthetic sensitivity) are
 * what actually separates one profile from another.
 *
 * THE ADJUSTMENT: scale each attribute's weight by how much the dataset varies
 * on it, blended with the base weight so no attribute is ever ignored.
 *
 *     discriminative_i = (1 - L) + L * (sd_i / meanSd)      clamped to [0.55, 1.6]
 *
 * WHY THE TABLE IS FROZEN AND COMMITTED, not computed at request time: if these
 * weights were derived live from the current dataset, adding one person would
 * silently change every saved user's match percentages. The table is a versioned
 * snapshot regenerated deliberately via `pnpm calibrate`, exactly like the
 * calibration anchors. Historical results stay interpretable.
 *
 * It does NOT change what is compared — only how much each dimension counts
 * when separating one person from another. Metadata still never enters.
 */

import type { AttributeId } from "../attributes/attributes.js";
import { DISPERSION_TABLE, DISPERSION_VERSION } from "./dispersion.generated.js";

export const DISCRIMINATIVE_LAMBDA = 0.5;
export const DISCRIMINATIVE_BOUNDS = { min: 0.55, max: 1.6 } as const;

export { DISPERSION_VERSION, DISPERSION_TABLE };

export function discriminativeWeight(attributeId: AttributeId): number {
  return DISPERSION_TABLE[attributeId] ?? 1;
}

/** Shared by the runtime and by the generator so both agree on the formula. */
export function dispersionToWeight(sd: number, meanSd: number): number {
  if (meanSd <= 0) return 1;
  const raw = 1 - DISCRIMINATIVE_LAMBDA + DISCRIMINATIVE_LAMBDA * (sd / meanSd);
  return Math.min(DISCRIMINATIVE_BOUNDS.max, Math.max(DISCRIMINATIVE_BOUNDS.min, raw));
}
