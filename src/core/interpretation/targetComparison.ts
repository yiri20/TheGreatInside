/**
 * TARGET COMPARISON — target_comparison_v1
 *
 * Phase 7: derived guidance layered on top of an ordinary
 * `matchUserToPerson` comparison, for the "You vs [Person]" experience.
 * Three outputs, deliberately built from DIFFERENT signals, because they
 * answer different questions:
 *
 *   - `selectLearnFromSuggestions` — DIFFERENCES worth exploring, where the
 *     model is willing to credit a direction. Requires the target to be
 *     meaningfully ahead in a direction the model actually credits
 *     (`learnFromTraits`, rules.ts), backed by real target evidence, AND an
 *     authored development guide to turn into a concrete experiment. Banded
 *     by the USER's own score (not the target's) — same principle
 *     `selectDevelopmentGuides` already uses: the advice is about where the
 *     user is, not about closing a gap to a specific person. This is the
 *     PRESCRIPTIVE case (an experiment to try).
 *   - `selectWorthExploring` (Phase 7 human-review Stage, revised after a
 *     second human-review pass) — meaningful TARGET-HIGHER differences on
 *     `contextual`-shaped attributes, where `learnFromTraits` correctly
 *     refuses to credit either direction (the shape's whole point is that
 *     "higher" carries no general claim). Rather than surface nothing, this
 *     is the NON-PRESCRIPTIVE case: acknowledges a real difference is worth
 *     noticing without implying the user should move toward the target's
 *     number. Deliberately TARGET-HIGHER ONLY — a user-higher `contextual`
 *     difference belongs conceptually under "Where You Bring Something
 *     Different" instead (found in human review: the first version of this
 *     selector was direction-symmetric, which put a user-higher difference
 *     under a heading about learning FROM the target, backwards). Two-sided
 *     content: `helpsWhenKey` (what the target's higher pole can enable, in
 *     context) paired with the user's own-band `cautionKeys` (what the
 *     user's current, lower pole already protects) — never the "try this"
 *     experiments, which would smuggle prescriptiveness back in.
 *   - `selectDoNotCopy` — caution about the TARGET's own profile. Mostly
 *     independent of the user (editorial keys, `risk`/`dual_edged` impact —
 *     these are already-vetted per-person editorial judgements, not merely
 *     "the target's number is high"), but `extreme_score`/`shape_mismatch`
 *     (Phase 7 human-review Stage, revised) now also require the target to
 *     be MEANINGFULLY on the extreme side relative to the USER — if the user
 *     already matches or exceeds the target there, it is not something the
 *     user could meaningfully "copy" from them (found in human review:
 *     Benjamin Franklin's Cross-Domain Range, where the user's own score was
 *     already higher than Franklin's, still produced a caution).
 *
 * NEVER a causal claim. A suggestion connects user-state -> target-state ->
 * an experiment; it never asserts the target's trait CAUSED their outcomes.
 * `renderLearnFromLine`'s template text is written to make that structurally
 * true (describes the pattern, not an explanation of history).
 */

import { ATTRIBUTE_IDS, ATTRIBUTES, type AttributeId } from "../attributes/attributes.js";
import type { Person, TraitComparison } from "../types.js";
import { DIFFERENCE_THRESHOLDS, learnFromTraits } from "./rules.js";
import { bandForScore, developmentGuide, type BandGuide, type ScoreBand } from "./development.js";

export const TARGET_COMPARISON_VERSION = "target_comparison_v1";

/* ------------------------------------------------------- learn from them */

export interface LearnFromSuggestion {
  attributeId: AttributeId;
  userScore: number;
  targetScore: number;
  targetConfidence: number;
  /** Band the guide was selected from — the USER's own score, not the gap. */
  userBand: ScoreBand;
  guide: BandGuide;
}

/**
 * Connects user-state -> target-state -> target-evidence -> an authored
 * development guide. Skips a candidate attribute rather than inventing
 * advice if no guide is authored for it yet (same discipline
 * `selectDevelopmentGuides` already follows).
 */
export function selectLearnFromSuggestions(
  comparisons: readonly TraitComparison[],
  limit = 3,
): LearnFromSuggestion[] {
  const out: LearnFromSuggestion[] = [];
  for (const c of learnFromTraits(comparisons, limit * 3)) {
    const entry = developmentGuide(c.attributeId);
    if (!entry) continue;
    const userBand = bandForScore(c.userScore);
    out.push({
      attributeId: c.attributeId,
      userScore: c.userScore,
      targetScore: c.personScore,
      targetConfidence: c.confidence,
      userBand,
      guide: entry[userBand],
    });
    if (out.length >= limit) break;
  }
  return out;
}

/* --------------------------------------------------- contextual benefit */

/**
 * "Where does this attribute's higher pole genuinely help, in context?" —
 * ONE deterministic sentence per attribute (all 34, every shape), reused in
 * two places: `selectWorthExploring` (what the target's higher pole on a
 * `contextual` trait can enable) and the compare page's "Where You Bring
 * Something Different" section (what the user's own higher pole, on a
 * `HELPS_WHEN_HIGHER_SHAPES` trait, can enable). Deliberately generic
 * across BOTH uses — the sentence is about the ATTRIBUTE, not about either
 * person specifically, so reusing it in two directions is not a semantic
 * stretch. Written to avoid "advantage"/"favour"/"stronger"/"better"
 * framing entirely (Phase 7 human-review Stage, Issue 2/5) — every sentence
 * names a CONDITION under which the tendency helps, never a claim that
 * having it is simply superior.
 *
 * English-first, under the `dev.*` key prefix specifically so it is
 * automatically covered by the existing `dev.*` Korean-coverage exemption
 * (see `interpretation.test.ts`'s locale test) — this is the same kind of
 * bulk explanatory content as the rest of `dev.*`, not new structural UI
 * chrome, so it follows that established precedent rather than obligating
 * ~34 new Korean strings for content that is conceptually identical in
 * kind to content already exempted.
 */
export function helpsWhenKey(attributeId: AttributeId): string {
  return `dev.${attributeId}.helps_when`;
}

/* ------------------------------------------------------- worth exploring */

/**
 * The 12 `contextual`-shaped attributes — the only shape `selectWorthExploring`
 * ever surfaces (see that function). Content authored for exactly this set,
 * ONE sentence per attribute, describing what the attribute's LOWER pole
 * (the user's side, in a Worth Exploring comparison, by construction —
 * `selectWorthExploring` only fires when the target is meaningfully HIGHER)
 * genuinely protects or preserves — never a generic caution about the
 * trait in the abstract.
 *
 * Found in human review, second pass: the first implementation reused the
 * dev-guide `cautionKeys`, banded by the user's own absolute score band.
 * That corpus was authored for a DIFFERENT purpose (the personal
 * development-guide context, where the MEDIUM band's caution warns about
 * being caught inconsistently between two strategies, not about defending
 * the low pole specifically — only the LOW band's caution was ever written
 * to legitimise a low pole, and a user landing in the MEDIUM band on a
 * given comparison — a real, live case, Benjamin Franklin's Resourcefulness
 * — got the wrong content entirely). `preservesKey` is a dedicated,
 * purpose-built set instead: unbanded (one sentence per attribute,
 * independent of the user's exact score, since the point is always "the
 * lower side of THIS gap"), and written specifically to answer "what does
 * this pole protect", not "what does this band cost".
 */
const PRESERVES_ATTRIBUTE_IDS: readonly AttributeId[] = [
  "intuitive_synthesis",
  "cross_domain_range",
  "aesthetic_sensitivity",
  "detail_orientation",
  "planning_orientation",
  "social_assertiveness",
  "conflict_tolerance",
  "competitiveness",
  "autonomy_need",
  "opportunity_sensing",
  "resourcefulness",
  "proactive_agency",
];
const PRESERVES_KEY_SET = new Set<AttributeId>(PRESERVES_ATTRIBUTE_IDS);

export function preservesKey(attributeId: AttributeId): string {
  return `dev.${attributeId}.preserves`;
}

export interface WorthExploringItem {
  attributeId: AttributeId;
  userScore: number;
  targetScore: number;
  targetConfidence: number;
  /** What the TARGET's higher pole can enable, in context — see helpsWhenKey. */
  helpsWhenKey: string;
  /** What the USER's own (lower) pole genuinely protects or preserves — see
   *  `preservesKey`/`PRESERVES_ATTRIBUTE_IDS` above. */
  preservesKey: string;
}

/**
 * The non-prescriptive counterpart to `selectLearnFromSuggestions`, for
 * exactly the gap that selector structurally cannot fill: `contextual` is
 * the ONE `contributionShape` `learnFromTraits` never surfaces in EITHER
 * direction (`higher_can_help`/`balanced`/`cluster_dependent` are credited
 * higher; `lower_can_help` is credited lower; `contextual` is credited
 * neither — confirmed by reading `HELPS_WHEN_HIGHER_SHAPES`/`learnFromTraits`
 * directly, not assumed).
 *
 * TARGET-HIGHER ONLY (`c.delta >= DIFFERENCE_THRESHOLDS.moderate`) — a
 * directional fix from this selector's first version, which was symmetric
 * and could surface a USER-higher difference under a "What You Could Learn
 * From Them" heading, which is backwards: nothing is being learned FROM the
 * target when the user is the one further in that direction. A user-higher
 * `contextual` difference is not surfaced by ANY selector currently (it is
 * not `learnFromTraits`-eligible either, since `contextual` is excluded
 * from `HELPS_WHEN_HIGHER_SHAPES` in both directions) — a known, deliberate
 * gap, not fixed here per the explicit instruction not to broadly redesign
 * this stage; see the Phase 7 human-review record for the reasoning.
 *
 * Deliberately narrow: only `contextual`-shaped attributes qualify. Every
 * other shape already has a defensible reason its own excluded direction
 * stays excluded (e.g. a `lower_can_help` trait where the TARGET is higher
 * is not "worth exploring toward" — the model's own claim is the opposite
 * direction generally helps more), and manufacturing an "explore" item for
 * every excluded case everywhere would dilute the ones that specifically
 * need this treatment.
 */
export function selectWorthExploring(
  comparisons: readonly TraitComparison[],
  limit = 2,
): WorthExploringItem[] {
  const out: WorthExploringItem[] = [];
  const candidates = comparisons
    .filter(
      (c) =>
        c.confidence >= 0.5 &&
        ATTRIBUTES[c.attributeId].contributionShape === "contextual" &&
        c.delta >= DIFFERENCE_THRESHOLDS.moderate,
    )
    .sort((a, b) => b.delta - a.delta || a.attributeId.localeCompare(b.attributeId));

  for (const c of candidates) {
    if (!PRESERVES_KEY_SET.has(c.attributeId)) continue; // never invent content
    out.push({
      attributeId: c.attributeId,
      userScore: c.userScore,
      targetScore: c.personScore,
      targetConfidence: c.confidence,
      helpsWhenKey: helpsWhenKey(c.attributeId),
      preservesKey: preservesKey(c.attributeId),
    });
    if (out.length >= limit) break;
  }
  return out;
}

/* ------------------------------------------------------------ do not copy */

export type DoNotCopyReason = "editorial" | "risk" | "dual_edged" | "extreme_score" | "shape_mismatch";

export interface DoNotCopyItem {
  attributeId?: AttributeId;
  reason: DoNotCopyReason;
  score?: number;
  confidence?: number;
  /** Editorial items render this key directly (curated per-person copy);
   *  deterministic items render a generic per-reason key, interpolated with
   *  the trait name and, where relevant, the score — see
   *  `src/core/i18n/en.ts` "dontcopy.generic.*". Deliberately still present
   *  even when `tradeoffKey` is also set: the generic sentence names WHICH
   *  reason/score triggered the caution; `tradeoffKey` supplies the actual
   *  trait-specific content. The UI decides whether both render or only
   *  `tradeoffKey`'s (see page.tsx). */
  key: string;
  /**
   * `extreme_score`/`shape_mismatch` items only, when authored content
   * exists for the attribute (Phase 7 human-review Stage, revised): a
   * NEUTRAL, THIRD-PERSON, trait-level trade-off sentence — deliberately
   * NOT the dev-guide caution text (that corpus is written in second-person
   * "you" voice for the PERSONAL development-guide context, where it is
   * addressed to whoever is reading their own result; reused unchanged on
   * this surface it reads as an accusation about the historical person,
   * found in human review on `dev.cross_domain_range.high.caution.1`
   * specifically). `NEUTRAL_TRADEOFF_KEYS` below is a separate, smaller,
   * purpose-built content set for exactly this surface. Absent when no
   * trade-off sentence has been authored yet for the attribute (never
   * invented; `missingTradeoffCoverage()` tracks the gap).
   */
  tradeoffKey?: string;
}

const EXTREME_LOW = 10;
const EXTREME_HIGH = 90;
/** A `lower_can_help` trait scored at or above this is a real mismatch
 *  worth flagging — not merely "not the lowest possible", which would flag
 *  nearly every scored `lower_can_help` attribute for nearly every person. */
const SHAPE_MISMATCH_FLOOR = 70;

const REASON_PRIORITY: Record<DoNotCopyReason, number> = {
  editorial: 0,
  risk: 1,
  dual_edged: 2,
  extreme_score: 3,
  shape_mismatch: 4,
};

/**
 * NEUTRAL, third-person, trait-level trade-off content for `selectDoNotCopy`
 * specifically (Phase 7 human-review Stage, Issue 4) — distinct from
 * `helpsWhenKey` above (which is framed positively, "when this helps") and
 * from the dev-guide `cautionKeys` corpus (second-person, wrong voice for
 * this surface). Each sentence names a trade-off the trait carries in
 * general — "X can help with A, but can cost B" — never a claim about the
 * specific historical person, per the explicit "do not diagnose the
 * historical person" instruction.
 *
 * Evidence-based coverage, not exhaustive: authored for the 26 attributes
 * that actually trigger `extreme_score` (impact=neutral, score>=90 or
 * <=10) somewhere across the current 35-person roster, computed directly
 * against the seed data before writing this list — not guessed. The
 * remaining 8 (`belief_updating`, `perfectionism`, `adaptability`,
 * `risk_tolerance`, `collaboration`, `conflict_tolerance`,
 * `competitiveness`, `proactive_agency`) never produce a real
 * `extreme_score`/`shape_mismatch` trigger in the current dataset; adding
 * speculative content for them now would be exactly the kind of unearned
 * precision this project's dev-guide discipline already avoids elsewhere
 * ("getting a handful of entries right beats guessing at all of them").
 * `missingTradeoffCoverage()` is the live regression guard, mirroring
 * `missingDevelopmentGuides()`'s pattern.
 */
const TRADEOFF_ATTRIBUTE_IDS: readonly AttributeId[] = [
  "achievement_drive",
  "aesthetic_sensitivity",
  "ambiguity_tolerance",
  "analytical_rigor",
  "autonomy_need",
  "creative_originality",
  "cross_domain_range",
  "curiosity",
  "decisiveness",
  "deep_focus",
  "detail_orientation",
  "discipline",
  "execution_speed",
  "experimentation",
  "impact_motivation",
  "independent_thinking",
  "intuitive_synthesis",
  "leadership_drive",
  "mastery_orientation",
  "opportunity_sensing",
  "persistence",
  "persuasiveness",
  "planning_orientation",
  "resourcefulness",
  "social_assertiveness",
  "systems_abstraction",
];
const TRADEOFF_KEY_SET = new Set<AttributeId>(TRADEOFF_ATTRIBUTE_IDS);

function tradeoffKeyFor(attributeId: AttributeId): string | undefined {
  return TRADEOFF_KEY_SET.has(attributeId) ? `dontcopy.tradeoff.${attributeId}` : undefined;
}

/** Attributes that could trigger `extreme_score`/`shape_mismatch` but have
 *  no authored trade-off sentence yet — mirrors `missingDevelopmentGuides()`.
 *  Currently the 8 attributes named in `TRADEOFF_ATTRIBUTE_IDS`'s own
 *  comment; kept as a live function (not a hardcoded list) so a future
 *  taxonomy change is caught automatically rather than silently stale. */
export function missingTradeoffCoverage(): AttributeId[] {
  return ATTRIBUTE_IDS.filter((id) => !TRADEOFF_KEY_SET.has(id));
}

/**
 * Caution items about the TARGET's own profile.
 *
 * Sources, most-trusted first:
 *   1. `person.doNotCopyKeys` — curated at authoring time, always included,
 *      independent of the user entirely.
 *   2. `impact === "risk"` — already an editorial judgement that this trait
 *      carries real risk for this person specifically. Independent of the
 *      user: an editorially-flagged risk is worth surfacing regardless of
 *      whether the user happens to already share the trait.
 *   3. `impact === "dual_edged"` — same reasoning, editorial judgement that
 *      the trait cuts both ways for this person. Independent of the user.
 *      Attaches a `tradeoffKey` when one is authored for the attribute
 *      (mirroring sources 4/5 below), so a covered attribute gets its
 *      neutral trait-specific sentence instead of the generic one; falls
 *      back to the generic sentence for the 8 attributes in
 *      `missingTradeoffCoverage()`, same as everywhere else.
 *   4. An extreme score (<=10 or >=90) — matches the product's existing
 *      "extremes carry costs" stance. Phase 7 human-review Stage: now ALSO
 *      requires the target to be MEANINGFULLY on the extreme side relative
 *      to the user (>=90 AND target - userScore >= DIFFERENCE_THRESHOLDS.
 *      moderate; or <=10 AND userScore - target >= moderate) — if the user
 *      already matches or exceeds the target in the extreme's own
 *      direction, there is nothing to "copy" from the target on this trait,
 *      which is what "What Not to Copy" is about. Found in human review:
 *      Benjamin Franklin's Cross-Domain Range (target 95, user 100 — user
 *      already higher) still produced a caution before this fix.
 *   5. A `lower_can_help`-shaped trait scored high (>=70) — same
 *      user-comparison gate applied, for the same reason (userScore also
 *      >=70 or close would mean the user already shares the mismatch, not
 *      something to avoid copying).
 * Confidence is carried on every item (not a trigger of its own) so the UI
 * can soften language on thin evidence rather than needing a separate,
 * noisy "low confidence" category — thin ancient/medieval profiles would
 * otherwise flag nearly every attribute.
 */
export function selectDoNotCopy(
  target: Person,
  userScores: Readonly<Partial<Record<AttributeId, number>>>,
  limit = 2,
): DoNotCopyItem[] {
  const editorial: DoNotCopyItem[] = target.doNotCopyKeys.map((key) => ({ reason: "editorial", key }));

  const deterministic: DoNotCopyItem[] = [];
  for (const attr of target.attributes) {
    const shape = ATTRIBUTES[attr.attributeId].contributionShape;
    const base = { attributeId: attr.attributeId, score: attr.score, confidence: attr.confidence };
    const userScore = userScores[attr.attributeId] ?? 50; // unanswered = neutral, same convention as scoring_v1

    if (attr.impact === "risk") {
      deterministic.push({ ...base, reason: "risk", key: "dontcopy.generic.risk" });
    } else if (attr.impact === "dual_edged") {
      const tradeoffKey = tradeoffKeyFor(attr.attributeId);
      deterministic.push({
        ...base,
        reason: "dual_edged",
        key: "dontcopy.generic.dual_edged",
        ...(tradeoffKey ? { tradeoffKey } : {}),
      });
    } else if (
      (attr.score >= EXTREME_HIGH && attr.score - userScore >= DIFFERENCE_THRESHOLDS.moderate) ||
      (attr.score <= EXTREME_LOW && userScore - attr.score >= DIFFERENCE_THRESHOLDS.moderate)
    ) {
      const tradeoffKey = tradeoffKeyFor(attr.attributeId);
      deterministic.push({
        ...base,
        reason: "extreme_score",
        key: "dontcopy.generic.extreme",
        ...(tradeoffKey ? { tradeoffKey } : {}),
      });
    } else if (
      shape === "lower_can_help" &&
      attr.score >= SHAPE_MISMATCH_FLOOR &&
      attr.score - userScore >= DIFFERENCE_THRESHOLDS.moderate
    ) {
      const tradeoffKey = tradeoffKeyFor(attr.attributeId);
      deterministic.push({
        ...base,
        reason: "shape_mismatch",
        key: "dontcopy.generic.shape_mismatch",
        ...(tradeoffKey ? { tradeoffKey } : {}),
      });
    }
  }

  deterministic.sort(
    (a, b) =>
      REASON_PRIORITY[a.reason] - REASON_PRIORITY[b.reason] ||
      Math.abs((b.score ?? 50) - 50) - Math.abs((a.score ?? 50) - 50) ||
      (a.attributeId ?? "").localeCompare(b.attributeId ?? ""),
  );

  return [...editorial, ...deterministic].slice(0, limit);
}
