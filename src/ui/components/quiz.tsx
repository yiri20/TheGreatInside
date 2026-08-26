/**
 * Quiz-taking controls: the two answer shapes `quiz_v1` uses (likert7,
 * choice) as accessible, mobile-first single-select groups.
 *
 * These are presentational only — no scoring, no core imports beyond types
 * and i18n strings. The page collects a value; `scoreQuiz` interprets it.
 *
 * Accessibility pattern: a real native `<input type="radio">` per option,
 * invisible (`opacity:0`, not `display:none`, so it stays focusable and
 * announced) but stretched via `position:absolute; inset:0` to cover the
 * ENTIRE visible card, layered above the label. This is deliberately NOT the
 * "1px clipped input + click delegates through the label's `for`" pattern:
 * that leaves the real hit target exactly as large as the tiny input,
 * relying on the browser's native label-click delegation to make the rest of
 * the card clickable — correct in every real browser, but it means the
 * actual pointer-accessible area is defined by delegation behaviour rather
 * than by an element you can see and reason about. Covering the full card
 * with the input itself makes the 44px+ touch target a directly-verifiable
 * fact, not an implied one, and removes any dependency on label delegation
 * quirks for mouse/touch input. Selected state is shown with BOTH a border/
 * fill change AND a checkmark glyph — never colour alone (CLAUDE.md).
 */
import { cx } from "../lib/display.js";
import { t } from "../../core/i18n/index.js";
import type { Locale } from "../../core/types.js";

export interface ChoiceOptionView {
  id: string;
  /** Already resolved via t(locale, option.labelKey) by the caller — this
   *  component has no i18n dependency of its own beyond the two Locale-typed
   *  scale-anchor strings in LikertScale below. */
  label: string;
}

export function ChoiceGroup({
  questionId,
  prompt,
  options,
  value,
  onChange,
}: {
  questionId: string;
  /** Used only as the fieldset's accessible name (visually hidden) — the
   *  visible prompt is rendered separately by the page as a heading. */
  prompt: string;
  options: readonly ChoiceOptionView[];
  value: string | undefined;
  onChange: (optionId: string) => void;
}) {
  return (
    <fieldset className="tgi-choicegroup">
      <legend className="tgi-visually-hidden">{prompt}</legend>
      <div className="tgi-choicegroup__grid">
        {options.map((option) => {
          const inputId = `${questionId}-${option.id}`;
          const checked = value === option.id;
          return (
            <div key={option.id} className="tgi-choicecard">
              <input
                type="radio"
                id={inputId}
                name={questionId}
                value={option.id}
                checked={checked}
                onChange={() => onChange(option.id)}
                className="tgi-choicecard__input"
              />
              <label htmlFor={inputId} className="tgi-choicecard__label">
                <span className="tgi-choicecard__indicator" aria-hidden="true" />
                <span>{option.label}</span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

const LIKERT_VALUES = [1, 2, 3, 4, 5, 6, 7] as const;

export function LikertScale({
  questionId,
  prompt,
  value,
  onChange,
  locale,
  leftAnchor,
  rightAnchor,
}: {
  questionId: string;
  prompt: string;
  value: number | undefined;
  onChange: (value: number) => void;
  locale: Locale;
  /**
   * Optional per-item scale-anchor override (Phase 6.6 Stage 10C-B) —
   * already resolved via t(locale, ...) by the caller, same pattern
   * ChoiceGroup's `option.label` already uses. Falls back to the global
   * "Strongly disagree" / "Strongly agree" anchors when absent. Purely
   * presentational: the underlying 1..7 value and scoring are unaffected
   * either way.
   */
  leftAnchor: string | undefined;
  rightAnchor: string | undefined;
}) {
  const resolvedLeftAnchor = leftAnchor ?? t(locale, "quiz.likert.disagree");
  const resolvedRightAnchor = rightAnchor ?? t(locale, "quiz.likert.agree");

  return (
    <fieldset className="tgi-likert">
      <legend className="tgi-visually-hidden">{prompt}</legend>
      {/*
        Endpoint-clarity hotfix (2026-08): the two anchor descriptions used
        to flank the 1-7 row left/right in a row that became a COLUMN below
        640px (flex-direction switch) — collapsing to "left anchor ABOVE the
        row, right anchor BELOW it", which reads as two independent captions
        rather than "this end vs. that end" (a real user report, ahead of a
        high-school group using the site). Replaced with ONE layout at every
        viewport: an explicit instruction line, then the 1-7 row, then BOTH
        anchors together in their own row directly underneath — left-aligned
        under "1", right-aligned under "7" via space-between — the same
        "min/max caption under a scale" pattern most Likert/NPS UIs use, so
        the left<->1 / right<->7 association reads the same way at 320px and
        at desktop, instead of two different layouts per breakpoint.
      */}
      <p className="tgi-likert__instruction">{t(locale, "quiz.likert.instruction")}</p>
      <div className="tgi-likert__options">
        {LIKERT_VALUES.map((n) => {
          const inputId = `${questionId}-${n}`;
          const checked = value === n;
          return (
            <span key={n} className="tgi-likert__option">
              <input
                type="radio"
                id={inputId}
                name={questionId}
                value={n}
                checked={checked}
                onChange={() => onChange(n)}
                className="tgi-likert__input"
                aria-label={String(n)}
              />
              <label htmlFor={inputId} className="tgi-likert__label">
                {n}
              </label>
            </span>
          );
        })}
      </div>
      <div className="tgi-likert__anchors">
        <span className="tgi-likert__anchor tgi-likert__anchor--left" aria-hidden="true">
          {resolvedLeftAnchor}
        </span>
        <span className="tgi-likert__anchor tgi-likert__anchor--right" aria-hidden="true">
          {resolvedRightAnchor}
        </span>
      </div>
    </fieldset>
  );
}

/**
 * `from`/`to` are the flat 1-indexed question positions the CURRENT SCREEN
 * covers — equal for a single-question screen ("Question 12 of 64"),
 * different for a grouped screen ("Questions 12–13 of 64", Stage 10A). The
 * fill/aria-valuenow always reflects `to` (how far the current screen
 * reaches), never `from` alone, so the bar doesn't visually understate
 * progress on a multi-question screen.
 */
export function QuizProgress({
  from,
  to,
  total,
  sectionLabel,
  locale,
}: {
  from: number;
  to: number;
  total: number;
  sectionLabel: string;
  locale: Locale;
}) {
  const pct = Math.round((to / total) * 100);
  const label =
    from === to
      ? t(locale, "quiz.progress", { current: from, total })
      : t(locale, "quiz.progress.range", { from, to, total });
  return (
    <div className="tgi-quiz-progress">
      <div
        className="tgi-quiz-progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={to}
        aria-valuetext={label}
      >
        <div className="tgi-quiz-progress__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className={cx("tgi-quiz-progress__labels")}>
        <span className="tgi-text--muted tgi-numeric">{label}</span>
        <span className="tgi-text--muted">{sectionLabel}</span>
      </div>
    </div>
  );
}
