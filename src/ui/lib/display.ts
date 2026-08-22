/**
 * Pure presentation logic for the design system.
 *
 * Everything here is a plain function so it can be tested without a DOM and
 * reused by non-React surfaces later (share-card rendering, emails, OG images).
 * React components in ../components stay thin wrappers around these.
 */

import type { TraitImpact } from "../../core/types.js";
import type { MessageKey } from "../../core/i18n/index.js";

/* ------------------------------------------------------------------ impact */

export interface ImpactPresentation {
  impact: TraitImpact;
  /** CSS modifier class; maps to the semantic tokens in tokens.css. */
  modifier: string;
  labelKey: MessageKey;
  /**
   * Non-colour redundant signal. Colour must never be the only carrier of
   * meaning — see CLAUDE.md and WCAG 1.4.1.
   */
  glyph: string;
}

const IMPACT_PRESENTATION: Record<TraitImpact, ImpactPresentation> = {
  advantage: {
    impact: "advantage",
    modifier: "tgi-impact--advantage",
    labelKey: "impact.advantage",
    glyph: "▲",
  },
  dual_edged: {
    impact: "dual_edged",
    modifier: "tgi-impact--dual-edged",
    labelKey: "impact.dual_edged",
    glyph: "◇",
  },
  risk: {
    impact: "risk",
    modifier: "tgi-impact--risk",
    labelKey: "impact.risk",
    glyph: "▼",
  },
  neutral: {
    impact: "neutral",
    modifier: "tgi-impact--neutral",
    labelKey: "impact.neutral",
    glyph: "●",
  },
};

export function impactPresentation(impact: TraitImpact): ImpactPresentation {
  return IMPACT_PRESENTATION[impact];
}

export const ALL_IMPACTS: readonly TraitImpact[] = [
  "advantage",
  "dual_edged",
  "risk",
  "neutral",
];

/* ------------------------------------------------------------------- scale */

/** Clamps a raw attribute score to the 0-100 contract before it reaches CSS. */
export function clampScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  return Math.min(100, Math.max(0, score));
}

/** Percentage width for a score bar. Kept separate so geometry is testable. */
export function barWidth(score: number): string {
  return `${clampScore(score)}%`;
}

/**
 * Offset and width for the segment between two scores on a shared 0-100 track.
 * Used by ComparisonBar to draw the gap itself rather than two loose bars —
 * the gap is the thing the user is actually being shown.
 */
export function gapGeometry(a: number, b: number): { left: string; width: string } {
  const lo = clampScore(Math.min(a, b));
  const hi = clampScore(Math.max(a, b));
  return { left: `${lo}%`, width: `${hi - lo}%` };
}

/* -------------------------------------------------------------- confidence */

export type ConfidenceLevel = "low" | "moderate" | "high";

export const CONFIDENCE_BOUNDS = { lowMax: 0.499, moderateMax: 0.749 } as const;

/**
 * Confidence bands for display. Deliberately three coarse buckets: a person
 * profile is inferred from biographical evidence, and showing "0.82" would imply
 * a precision the underlying judgement does not have.
 */
export function confidenceLevel(confidence: number): ConfidenceLevel {
  if (confidence <= CONFIDENCE_BOUNDS.lowMax) return "low";
  if (confidence <= CONFIDENCE_BOUNDS.moderateMax) return "moderate";
  return "high";
}

/** Filled pip count out of three, mirroring the band. */
export function confidencePips(confidence: number): number {
  const level = confidenceLevel(confidence);
  return level === "high" ? 3 : level === "moderate" ? 2 : 1;
}

/* ------------------------------------------------------------------ format */

/**
 * Scores are rendered as integers with no unit. A trait score is a location on
 * a dimension, not a percentage, and appending "%" would assert otherwise.
 */
export function formatScore(score: number): string {
  return String(Math.round(clampScore(score)));
}

/** Profile Match IS a percentage and is the only place "%" is correct. */
export function formatMatch(match: number): string {
  return `${Math.round(clampScore(match))}%`;
}

/** Greatness Potential is always "N / 100" — never a percentage. See CLAUDE.md. */
export function formatPotential(score: number): string {
  return `${Math.round(clampScore(score))} / 100`;
}

export function formatLifespan(
  birthYear: number | undefined,
  deathYear: number | undefined,
  isLiving: boolean,
): string {
  const year = (y: number) => (y < 0 ? `${Math.abs(y)} BCE` : String(y));
  if (birthYear === undefined) return "";
  if (isLiving) return `b. ${year(birthYear)}`;
  return deathYear === undefined ? year(birthYear) : `${year(birthYear)}–${year(deathYear)}`;
}

/** Joins class names, dropping falsy entries. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Up to two leading grapheme clusters from a display name, one per
 * whitespace-separated word — the shared portrait-placeholder convention
 * (`PersonCard`, `IdentityHero`). Takes whatever the caller's locale already
 * produced as the display name, so "Yi Sun-sin" yields "YS" and the
 * single-word Korean form "이순신" (no internal spaces) yields "이".
 */
export function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => [...part][0] ?? "")
    .join("");
}
