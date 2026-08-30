/**
 * TRAIT SCORE BANDS — trait_score_bands_v1 (rev. 2026-08, semantic audit)
 *
 * A coarse, five-band reading of a trait's position on the 0-100 scale, for
 * the Profile Trait Explanation UX (product spec: trait click/tap ->
 * explanation).
 *
 * REV HISTORY: the first version of this file mirrored `GREATNESS_BANDS`'
 * cutoffs (0-39/40-59/60-74/75-89/90-100) on the reasoning that both
 * describe a position on the same 0-100 `clampScore` contract. A follow-up
 * semantic/accessibility audit found that reasoning insufficient: sharing a
 * numeric RANGE does not mean sharing MEANING at 50. `GREATNESS_BANDS`
 * describes archetype-alignment strength, where 50 sits inside the
 * genuinely-low "uncommon_alignment" band (0-39) by design. A trait score's
 * OWN governing document — `docs/scoring-rubric-v1.md` §4, "Score bands and
 * the evidence-strength-vs-extremity rule" — instead treats 45-55 as
 * "Unremarkable on this dimension... the SAFE DEFAULT," explicitly NOT a low
 * reading, with band width increasing outward from that center specifically
 * because more extreme scores require disproportionately stronger evidence
 * to justify (a single documented instance can support 56-70, but 85-100
 * needs "multiple independent documented instances... with no significant
 * contradicting evidence"). Reusing GREATNESS_BANDS' boundaries would have
 * mislabelled a genuinely unremarkable, evidence-backed score of 50 as
 * "Low" — a real, user-facing accuracy error the audit's job was to catch,
 * not a stylistic preference.
 *
 * These boundaries are `docs/scoring-rubric-v1.md` §4's own 4-tier mirrored
 * structure, collapsed from 7 segments to 5 by merging each side's two
 * outer tiers ("clear, well-evidenced pattern" 16-29/71-84 and "extreme,
 * defining characteristic" 0-15/85-100) into one Very Low/Very High band —
 * simplifying the label count for a compact popover/sheet without altering
 * where the center actually is or losing the asymmetric, evidence-grounded
 * width the source document gives each tier. The rubric's own bands are
 * about how much EVIDENCE justifies a given score at authoring time, not
 * user-facing copy — the labels/meaning text here are written for a reader
 * with no evidentiary context, describing simple scale position, never
 * implying how much evidence stands behind the number (that's what the
 * separately-shown confidence indicator is for).
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
 * band is written to avoid. Boundaries are NOT derived from the observed
 * roster's own score distribution either — that would be a third, still
 * different claim ("relative to who's currently in the roster") the
 * product does not intend here.
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
  { id: "very_low", min: 0, max: 29, labelKey: "trait.band.very_low", meaningKey: "trait.band.very_low.meaning" },
  { id: "low", min: 30, max: 44, labelKey: "trait.band.low", meaningKey: "trait.band.low.meaning" },
  { id: "moderate", min: 45, max: 55, labelKey: "trait.band.moderate", meaningKey: "trait.band.moderate.meaning" },
  { id: "high", min: 56, max: 70, labelKey: "trait.band.high", meaningKey: "trait.band.high.meaning" },
  { id: "very_high", min: 71, max: 100, labelKey: "trait.band.very_high", meaningKey: "trait.band.very_high.meaning" },
];

export function traitScoreBandFor(score: number): TraitScoreBand {
  // A real attribute score is always authored within 0-100, so this clamp
  // is defensive, not a normal path. `clampScore` (src/ui/lib/display.ts)
  // is not reachable from src/core (framework-agnostic, never depends on
  // `src/ui` — CLAUDE.md), so this is a small local equivalent.
  const clamped = Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : 0;
  return TRAIT_SCORE_BANDS.find((b) => clamped >= b.min && clamped <= b.max) ?? TRAIT_SCORE_BANDS[0]!;
}
