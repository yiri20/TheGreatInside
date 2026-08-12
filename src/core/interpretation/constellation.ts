/**
 * TRAIT CONSTELLATION — constellation_v1
 *
 * Selects 8-12 traits for a person profile page (product spec item 38). The
 * point is "this person is complicated", not "this person has ten amazing
 * traits" — so this is deliberately NOT the person's highest raw scores.
 *
 * SELECTION LOGIC
 *  1. Rank candidates by DISTINCTIVENESS: |z| against `reference_v3`, exactly
 *     the same measure `distinctiveTraits` already uses for a user's signature
 *     trait (interpretation/rules.ts) — a score of 95 on a dimension where
 *     everyone scores high is less characteristic than a 78 on one where the
 *     dataset spreads out. High-confidence only: an inferred, low-evidence
 *     score cannot headline someone's profile.
 *  2. Cap how much of the constellation any ONE impact type can claim
 *     (default 50%), so the result structurally cannot be all-advantage. This
 *     is what turns "here are my best traits" into "here is a complicated
 *     person" — a mandatory mix of advantage / dual-edged / risk / neutral,
 *     not a curated highlight reel.
 *
 * Both steps run on real per-person data; nothing here is templated text.
 */

import { ATTRIBUTES, type AttributeId } from "../attributes/attributes.js";
import type { Person, TraitImpact } from "../types.js";

export const CONSTELLATION_VERSION = "constellation_v1";

export const CONSTELLATION_CONFIG = {
  minSize: 8,
  maxSize: 12,
  /** Below this, an inferred score is too uncertain to headline a profile. */
  minConfidence: 0.5,
  /** No single impact type may exceed this share of the result, when enough
   *  alternatives exist — the mechanism that guarantees a mix. */
  maxImpactShare: 0.5,
} as const;

export interface ConstellationTrait {
  attributeId: AttributeId;
  score: number;
  confidence: number;
  impact: TraitImpact;
  /** Standard deviations from `reference_v3`'s assumed population mean. */
  z: number;
}

function byDistinctiveness(a: ConstellationTrait, b: ConstellationTrait): number {
  return Math.abs(b.z) - Math.abs(a.z) || a.attributeId.localeCompare(b.attributeId);
}

export function traitConstellation(
  person: Person,
  size: number = CONSTELLATION_CONFIG.maxSize,
): ConstellationTrait[] {
  const candidates: ConstellationTrait[] = person.attributes
    .filter((a) => a.confidence >= CONSTELLATION_CONFIG.minConfidence)
    .map((a) => {
      const ref = ATTRIBUTES[a.attributeId].reference;
      return {
        attributeId: a.attributeId,
        score: a.score,
        confidence: a.confidence,
        impact: a.impact,
        z: (a.score - ref.mean) / ref.sd,
      };
    })
    .sort(byDistinctiveness);

  const target = Math.min(size, candidates.length);
  const cap = Math.ceil(target * CONSTELLATION_CONFIG.maxImpactShare);

  const selected: ConstellationTrait[] = [];
  const overflow: ConstellationTrait[] = [];
  const impactCounts: Partial<Record<TraitImpact, number>> = {};

  // Pass 1: take the most distinctive traits first, but stop admitting a given
  // impact type once it hits the cap — this is what forces the mix.
  for (const candidate of candidates) {
    const count = impactCounts[candidate.impact] ?? 0;
    if (count < cap) {
      selected.push(candidate);
      impactCounts[candidate.impact] = count + 1;
    } else {
      overflow.push(candidate);
    }
    if (selected.length === target) break;
  }

  // Pass 2: if capping left the constellation short (e.g. one impact type
  // dominates the whole eligible pool), fill from overflow by distinctiveness
  // — an honest degrade rather than inventing traits that aren't there.
  for (const candidate of overflow) {
    if (selected.length >= target) break;
    selected.push(candidate);
  }

  return selected.sort(byDistinctiveness);
}

export function constellationImpactCounts(
  traits: readonly ConstellationTrait[],
): Record<TraitImpact, number> {
  const counts: Record<TraitImpact, number> = { advantage: 0, dual_edged: 0, risk: 0, neutral: 0 };
  for (const trait of traits) counts[trait.impact]++;
  return counts;
}
