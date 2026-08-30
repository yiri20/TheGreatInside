/**
 * TRAIT SCORE BANDS — trait_score_bands_v1
 *
 * A coarse, five-band reading of a trait's position on the 0-100 scale, for
 * the Profile Trait Explanation UX (product spec: trait click/tap ->
 * explanation). Deliberately mirrors `GREATNESS_BANDS`/`bandFor`
 * (`src/core/greatness/greatness.ts`) rather than inventing a second
 * band-boundary scheme: both describe a position on the same `clampScore`
 * 0-100 contract, so reusing the exact cutoffs (0-39/40-59/60-74/75-89/
 * 90-100) keeps one mental model for "how far along a 0-100 dimension is
 * this" across the whole app, instead of two subtly different ones.
 *
 * What this band DOES claim: where the raw score sits within the fixed
 * 0-100 span itself (e.g. 82 is "on the upper half of this dimension").
 * What it explicitly does NOT claim: how this score compares to a general
 * population, to other people in the roster, or to this attribute's own
 * `reference` mean/sd (that per-attribute, relative distinctiveness measure
 * is what `traitConstellation`'s `z` score is for, and is a different,
 * already-documented claim — see constellation.ts's own header comment on
 * why `reference_v3` is a modelling yardstick, not population data). Mixing
 * the two would silently upgrade a stated modelling assumption into an
 * implied psychometric fact — exactly the kind of false precision this
 * band is written to avoid.
 */
import type { MessageKey } from "../i18n/en.js";

export type TraitScoreBandId = "very_low" | "low" | "moderate" | "high" | "very_high";

export interface TraitScoreBand {
  id: TraitScoreBandId;
  min: number;
  max: number;
  labelKey: MessageKey;
  meaningKey: MessageKey;
}

export const TRAIT_SCORE_BANDS: readonly TraitScoreBand[] = [
  { id: "very_low", min: 0, max: 39, labelKey: "trait.band.very_low", meaningKey: "trait.band.very_low.meaning" },
  { id: "low", min: 40, max: 59, labelKey: "trait.band.low", meaningKey: "trait.band.low.meaning" },
  { id: "moderate", min: 60, max: 74, labelKey: "trait.band.moderate", meaningKey: "trait.band.moderate.meaning" },
  { id: "high", min: 75, max: 89, labelKey: "trait.band.high", meaningKey: "trait.band.high.meaning" },
  { id: "very_high", min: 90, max: 100, labelKey: "trait.band.very_high", meaningKey: "trait.band.very_high.meaning" },
];

export function traitScoreBandFor(score: number): TraitScoreBand {
  // A real attribute score is always authored within 0-100, so this clamp
  // is defensive, not a normal path — but deliberately a real clamp rather
  // than mirroring `bandFor`'s (src/core/greatness/greatness.ts) fallback
  // of "no match -> lowest band", which silently maps an out-of-range HIGH
  // value to "very_low". `clampScore` (src/ui/lib/display.ts) is not
  // reachable from src/core (framework-agnostic, never depends on `src/ui`
  // — CLAUDE.md), so this is a small local equivalent, not a duplicate of
  // that one's actual job (0-100 is the only contract either needs).
  const clamped = Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : 0;
  return TRAIT_SCORE_BANDS.find((b) => clamped >= b.min && clamped <= b.max) ?? TRAIT_SCORE_BANDS[0]!;
}
