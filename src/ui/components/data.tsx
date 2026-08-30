/**
 * Data-display components: the pieces that render trait numbers.
 *
 * Non-negotiable across all of these:
 *  - Colour is never the only signal. Every impact ships with a text label and
 *    a glyph; every bar carries its value as text.
 *  - Charts are accessible: bars use progressbar semantics with aria-valuetext
 *    that reads the trait name and score, not a bare number.
 *  - A trait score renders WITHOUT a "%" — it is a location on a dimension, not
 *    a percentage. Only Profile Match uses "%".
 */
import type { ReactNode } from "react";
import type { Locale, TraitImpact } from "../../core/types.js";
import type { MessageKey } from "../../core/i18n/index.js";
import { t } from "../../core/i18n/index.js";
import {
  barWidth,
  clampScore,
  confidenceLevel,
  confidencePips,
  cx,
  formatMatch,
  formatScore,
  gapGeometry,
  impactPresentation,
  initialsFromName,
} from "../lib/display.js";
import { Card, Cluster, Stack, Text, VisuallyHidden } from "./primitives.js";

/* ------------------------------------------------------------ ImpactBadge */

export function ImpactBadge({ impact, locale }: { impact: TraitImpact; locale: Locale }) {
  const presentation = impactPresentation(impact);
  return (
    <span className={cx("tgi-impact", presentation.modifier)}>
      {/* Decorative: the adjacent text already carries the meaning. */}
      <span className="tgi-impact__glyph" aria-hidden="true">
        {presentation.glyph}
      </span>
      {t(locale, presentation.labelKey)}
    </span>
  );
}

/* ----------------------------------------------------- ConfidenceIndicator */

export function ConfidenceIndicator({
  confidence,
  locale,
  showLabel = true,
}: {
  confidence: number;
  locale: Locale;
  showLabel?: boolean;
}) {
  const level = confidenceLevel(confidence);
  const filled = confidencePips(confidence);
  const label = t(locale, `confidence.${level}` as MessageKey);
  return (
    <span className="tgi-confidence" title={t(locale, "result.confidence.explainer")}>
      <span className="tgi-confidence__pips" role="img" aria-label={`${t(locale, "label.confidence")}: ${label}`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={cx("tgi-confidence__pip", i < filled && "tgi-confidence__pip--on")} />
        ))}
      </span>
      {showLabel ? <span aria-hidden="true">{label}</span> : null}
    </span>
  );
}

/* -------------------------------------------------------------- TraitChip */

export function TraitChip({
  label,
  score,
  impact,
  locale,
}: {
  label: string;
  score?: number;
  impact?: TraitImpact;
  locale: Locale;
}) {
  return (
    <span className="tgi-chip">
      <span>{label}</span>
      {score !== undefined ? <span className="tgi-chip__score">{formatScore(score)}</span> : null}
      {impact !== undefined ? <ImpactBadge impact={impact} locale={locale} /> : null}
    </span>
  );
}

/* --------------------------------------------------------------- ScoreBar */

export function ScoreBar({
  label,
  score,
  impact,
  locale,
  trailing,
}: {
  label: string;
  score: number;
  impact?: TraitImpact;
  locale: Locale;
  trailing?: ReactNode;
}) {
  const value = clampScore(score);
  const fillModifier = impact ? impactPresentation(impact).modifier.replace("tgi-impact--", "tgi-scorebar__fill--") : undefined;
  return (
    <div className="tgi-scorebar">
      <div className="tgi-scorebar__head">
        <span className="tgi-scorebar__label">{label}</span>
        <Cluster gap={2}>
          {trailing}
          <span className="tgi-scorebar__value">{formatScore(value)}</span>
        </Cluster>
      </div>
      <div
        className="tgi-scorebar__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        /* Reads "Curiosity 91 out of 100" rather than a naked number. */
        aria-valuetext={`${label} ${formatScore(value)} / 100`}
      >
        <div className={cx("tgi-scorebar__fill", fillModifier)} style={{ width: barWidth(value) }} />
      </div>
      {impact ? (
        <VisuallyHidden>{t(locale, impactPresentation(impact).labelKey)}</VisuallyHidden>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------- ComparisonBar */

export function ComparisonBar({
  label,
  userScore,
  personScore,
  personName,
  locale,
}: {
  label: string;
  userScore: number;
  personScore: number;
  personName: string;
  locale: Locale;
}) {
  const you = clampScore(userScore);
  const them = clampScore(personScore);
  const gap = gapGeometry(you, them);
  const youLabel = t(locale, "label.you");

  return (
    <div className="tgi-compare">
      <div className="tgi-compare__head">
        <span className="tgi-scorebar__label">{label}</span>
        <span className="tgi-text--muted tgi-numeric">{Math.abs(Math.round(them - you))}</span>
      </div>
      {/* img role + a full label: a screen reader gets the comparison as one
          sentence instead of two unrelated progress bars. */}
      <div
        className="tgi-compare__track"
        role="img"
        aria-label={`${label}. ${youLabel} ${formatScore(you)}, ${personName} ${formatScore(them)}, out of 100.`}
      >
        <div className="tgi-compare__gap" style={{ left: gap.left, width: gap.width }} />
        <div className="tgi-compare__marker tgi-compare__marker--you" style={{ left: `${you}%` }} />
        <div className="tgi-compare__marker tgi-compare__marker--person" style={{ left: `${them}%` }} />
      </div>
      <div className="tgi-compare__legend" aria-hidden="true">
        <span className="tgi-compare__key">
          <span className="tgi-compare__swatch tgi-compare__swatch--you" />
          {youLabel} <span className="tgi-compare__num">{formatScore(you)}</span>
        </span>
        <span className="tgi-compare__key">
          <span className="tgi-compare__swatch tgi-compare__swatch--person" />
          {personName} <span className="tgi-compare__num">{formatScore(them)}</span>
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- TraitCard */

/**
 * Makes the whole card one activation target for the Profile Trait
 * Explanation UX (2026-08) — clicking/tapping anywhere on the card opens
 * the explanation popover/sheet for this attribute. Optional and additive:
 * every existing call site (Results' signature-trait/dual-edged cards, which
 * pass `edge`/`cost`/`context` instead) omits this entirely and renders
 * byte-identical to before.
 */
export interface TraitCardExplain {
  /** Whether this trait's explanation is currently open. */
  expanded: boolean;
  /** `id` of the explanation surface, for `aria-controls`. */
  controls: string;
  onActivate: (trigger: HTMLButtonElement) => void;
}

export function TraitCard({
  label,
  score,
  impact,
  confidence,
  locale,
  edge,
  cost,
  context,
  explain,
}: {
  label: string;
  score: number;
  impact: TraitImpact;
  confidence?: number;
  locale: Locale;
  /** Reviewed editorial copy. Absent is fine — the card degrades to score + impact. */
  edge?: string;
  cost?: string;
  context?: string;
  explain?: TraitCardExplain;
}) {
  const body = (
    <div className="tgi-traitcard">
      <div className="tgi-traitcard__head">
        <Stack gap={1}>
          <span>{label}</span>
          <ImpactBadge impact={impact} locale={locale} />
        </Stack>
        <span className="tgi-traitcard__score">{formatScore(score)}</span>
      </div>

      <ScoreBar label={label} score={score} impact={impact} locale={locale} />

      {edge ? (
        <div className="tgi-traitcard__edge">
          <span className="tgi-traitcard__edge-label">{t(locale, "label.the_edge")}</span>
          <Text tone="secondary">{edge}</Text>
        </div>
      ) : null}
      {cost ? (
        <div className="tgi-traitcard__edge">
          <span className="tgi-traitcard__edge-label">{t(locale, "label.the_cost")}</span>
          <Text tone="secondary">{cost}</Text>
        </div>
      ) : null}
      {context ? <Text tone="muted">{context}</Text> : null}

      {confidence !== undefined ? (
        <ConfidenceIndicator confidence={confidence} locale={locale} />
      ) : null}
    </div>
  );

  if (explain) {
    // Same visual output as `<Card as="article">` (see primitives.tsx) —
    // reproduced directly rather than widening Card's own `as` union to
    // "button" for one call site. A <button> may not contain sectioning
    // content like <article>, so this changes the wrapper tag, not the
    // class names, and the hover/focus-within treatment (`tgi-card--
    // interactive`, already defined, previously unused) already IS the
    // "subtle selected/pressed state" the trait explanation spec calls for.
    return (
      <button
        type="button"
        className="tgi-card tgi-card--interactive tgi-traitcard-trigger"
        aria-haspopup="dialog"
        aria-expanded={explain.expanded}
        aria-controls={explain.controls}
        onClick={(e) => explain.onActivate(e.currentTarget)}
      >
        {body}
      </button>
    );
  }

  return <Card as="article">{body}</Card>;
}

/* ------------------------------------------------------------- PersonCard */

export interface PersonCardProps {
  name: string;
  /** Localised occupation / field line. */
  subtitle?: string;
  lifespan?: string;
  href?: string;
  portraitUrl?: string;
  /** Calibrated Profile Match. Omitted outside a result context. */
  match?: number;
  locale: Locale;
  footer?: ReactNode;
}

export function PersonCard({
  name,
  subtitle,
  lifespan,
  href,
  portraitUrl,
  match,
  locale,
  footer,
}: PersonCardProps) {
  const initials = initialsFromName(name);

  return (
    <Card as="article" variant="flush" interactive={href !== undefined} className={cx(href && "tgi-personcard--linked")}>
      <div className="tgi-personcard">
        {portraitUrl ? (
          <img className="tgi-personcard__portrait" src={portraitUrl} alt="" loading="lazy" />
        ) : (
          <div className="tgi-personcard__portrait tgi-personcard__placeholder" aria-hidden="true">
            {initials}
          </div>
        )}
        <div className="tgi-personcard__body">
          <h3 className="tgi-personcard__name">
            {href ? (
              <a className="tgi-personcard__link" href={href}>
                {name}
              </a>
            ) : (
              name
            )}
          </h3>
          {subtitle ? <span className="tgi-personcard__meta">{subtitle}</span> : null}
          {lifespan ? <span className="tgi-personcard__meta tgi-numeric">{lifespan}</span> : null}
          {match !== undefined ? (
            <div className="tgi-personcard__match">
              <span className="tgi-personcard__match-value">{formatMatch(match)}</span>{" "}
              <span className="tgi-text--muted">{t(locale, "label.profile_match")}</span>
            </div>
          ) : null}
          {footer}
        </div>
      </div>
    </Card>
  );
}
