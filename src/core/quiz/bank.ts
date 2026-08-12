/**
 * QUESTION BANK — quiz_v1 -> quiz_v2 (Phase 6.6, 64 items after Stage 4.5)
 *
 * 64 items across 6 display sections, measuring 34 canonical attributes
 * (`taxonomy_v1.1`) — the Phase 6.6 production bank, still unreleased
 * (still `quiz_v2` — no version bump for the Stage 4.5 repair below, per
 * instruction not to churn an identifier that has never shipped). Migrated
 * from the 56-item `quiz_v1` per the approved specification in
 * `docs/phase6.5b-taxonomy-quiz-design.md` (design gate) and its 2026-08
 * decision-check addendum (§24, item-count and display-order reconciliation),
 * THEN revised again by the Stage 4.5 measurement-repair gate (see that
 * section far below) after Stage 4's structural diagnostics found the
 * as-approved 62-item version had real, measured defects. This file
 * implements the approved 62-item specification exactly where it was
 * approved — no item's prompt, options, mappings, signs, weights, or
 * section membership were altered
 * from what was approved; only display order was subject to a documented
 * reconciliation pass (see PHASE 6.6 section below for what changed and
 * why versus the design doc's first-draft ordering).
 *
 * Authoring rules (enforced by tests in scoring.test.ts) — unchanged since
 * quiz_v1:
 *   - every attribute is measured by >= 2 independent items
 *   - no single item holds > 55% of an attribute's total weight
 *   - each attribute is approached from different angles (behaviour, preference,
 *     trade-off), not asked the same way twice
 *   - forced-choice items pit two legitimate tendencies against each other so
 *     neither option is the socially "correct" answer
 *   - text lives behind localisation keys; canonical English is in src/core/i18n
 *
 * PHASE 2 REBALANCE (quiz_v0_seed -> quiz_v0_seed2): fixed q02's bimodality
 * and added dedicated graded items (q31, q32) for intuitive_synthesis and
 * autonomy_need. See CLAUDE.md "Known open issues" #2a for the full
 * diagnostic history — unchanged by this migration.
 *
 * PHASE 4 (quiz_v0_seed2 -> quiz_v1): fixed one-sided-measurement bias
 * (CLAUDE.md "Known open issues" #2b) with 24 additive items across three
 * rounds (q33-q56). Full causal history in CLAUDE.md "Phase 4" — unchanged
 * by this migration; every Phase 4 item not explicitly touched below is
 * carried over byte-identical.
 *
 * ============================================================================
 * PHASE 6.6 (quiz_v1 -> quiz_v2): taxonomy_v1.1 migration.
 * ============================================================================
 *
 * WHAT CHANGED, exactly (migration counts: KEEP 49, KEEP+REMAP 1, REWRITE 3,
 * REMOVE 3, NEW 9 — 56 - 3 + 9 = 62):
 *
 * REMOVED (2 items each retire 4 one-sided secondary attribute-effects from
 * a 4-way situational opener, every one of which already has independent,
 * adequate dedicated coverage elsewhere in the bank — see
 * `docs/phase6.5b-taxonomy-quiz-design.md` §4 for the full per-attribute
 * accounting):
 *   - q01 (was s1_thinking's opener) — curiosity/cross_domain_range/
 *     mastery_orientation/deep_focus/planning_orientation/
 *     detail_orientation/social_assertiveness/collaboration one-sided
 *     secondary mentions retired; each attribute keeps its dedicated item.
 *   - q27 (was s6_drive's opener) — mastery_orientation/deep_focus/
 *     achievement_drive/competitiveness/impact_motivation/leadership_drive/
 *     autonomy_need/independent_thinking, same pattern.
 *   - q36 (planning_orientation/ambiguity_tolerance trade-off) — the one
 *     genuinely low-collateral cut identified when the item budget was
 *     checked against the 54-60-question preference (design doc §3, §16;
 *     confirmed in the 2026-08 decision-check): both attributes stay 2
 *     items clear of the 3-item floor after this cut.
 *   A useful side effect, not a separate action: removing q01/q27 also
 *   fixes `docs/quiz-structure.md`'s flagged "opens with its heaviest
 *   cognitive format" issue for both sections — the vacated slots are now
 *   filled by gentler graded items (q57 opens s1_thinking; q28 is promoted
 *   to open s6_drive).
 *
 * REWRITTEN (scenario and/or option effects changed; each chosen because
 * its EXISTING scenario was already structurally adjacent to the new
 * construct, not cosmetically relabelled):
 *   - q05: "an unfamiliar field turns out to matter" was already an
 *     opportunity-recognition scenario. Retargeted to `opportunity_sensing`
 *     as primary (options a/c now bidirectional for it — an improvement
 *     over the original, which was one-sided across all three options).
 *   - q15: option (c) only, retargeted from execution_speed/risk_tolerance/
 *     intuitive_synthesis to `resourcefulness`, reframed as a resource-loss
 *     scenario. Options (a)/(b) keep their original planning_orientation/
 *     discipline and adaptability/ambiguity_tolerance effects; option (a)
 *     no longer carries a systems_abstraction secondary (a deliberate
 *     simplification made when the scenario was reframed, approved as part
 *     of the design gate — systems_abstraction drops from 4 to 3 items as a
 *     result, still meeting the 3-item floor with no margin to spare;
 *     tracked in the Phase 6.6 implementation report, not touched further
 *     here).
 *   - q40: "you've reached a conclusion, act or verify first" was a
 *     near-duplicate of q20's decisiveness trade-off (see "decisiveness"
 *     below). Retargeted entirely to `belief_updating` ("new evidence
 *     contradicts a conclusion you'd already settled on and acted on").
 *
 * REMAPPED (KEEP+REMAP — text mostly unchanged, only one option's target
 * shifted):
 *   - q52: option (a) only, retargeted from autonomy_need/execution_speed to
 *     `proactive_agency` ("just start fixing it yourself before anyone
 *     asks"). Options (b)/(c) are byte-identical to quiz_v1.
 *
 * NEW (q57-q65, 9 items originally — each new attribute got its rewritten/
 * remapped anchor above PLUS exactly 2 freshly authored items. q58/q60/q62/
 * q65 were ORIGINALLY forced-choice trade-offs, each since converted to a
 * graded likert by the Stage 4.5 repair below — the design-gate description
 * ("all bidirectional by construction from day one") turned out to be
 * necessary but not sufficient: bidirectional choice items are still
 * bimodal, not graded, and produced serious measurement-induced
 * overdispersion despite being bidirectional. See "STAGE 4.5" far below for
 * the full causal finding and the empirical A/B/C comparison that led to
 * the fix):
 *   - q57, q58: opportunity_sensing (dedicated likert; SECOND likert as of
 *     Stage 4.5, see below — was a forced-choice trade-off against
 *     deep_focus)
 *   - q59, q60: resourcefulness (dedicated likert; second likert as of
 *     Stage 4.5 — was a forced-choice "make do" vs. "hold off" trade-off)
 *   - q61, q62: belief_updating (dedicated likert, phrased as a feedback-
 *     response scenario per the Tool-Leverage/Feedback-as-context decision
 *     in the design doc §10; second likert as of Stage 4.5 — was a
 *     forced-choice trade-off encoding the historically-real low-pole case)
 *   - q63: decisiveness (see "decisiveness" below — this is a root-cause
 *     fix, not a new-attribute item)
 *   - q64, q65: proactive_agency (dedicated likert; second likert as of
 *     Stage 4.5 — was a forced-choice trade-off against deferring to
 *     whoever's formally responsible)
 *
 * DECISIVENESS — root-cause fix, not a weight adjustment. `decisiveness`
 * was quiz_v1's single most overrepresented signature trait (19.1% at
 * n=10,000, CLAUDE.md "Phase 5") despite being at 45% one-sidedness — LOWER
 * than several less-overrepresented attributes. Investigation (design doc
 * §5, verified directly against quiz_v1's bank.ts) found the actual
 * mechanism: decisiveness never received a dedicated single-attribute
 * graded LIKERT item the way every other Phase-4-fixed attribute did
 * (intuitive_synthesis->q31, autonomy_need->q32, analytical_rigor->q53,
 * planning_orientation->q54, mastery_orientation->q55, deep_focus->q56).
 * Its only bidirectional signal came from two forced-choice trade-off pairs
 * (q20, q40) that were themselves near-duplicates of each other ("commit
 * now" vs. "verify first", asked twice) — a relapse of the Phase 2 item-
 * bimodality mechanism (binary choice items produce bimodal, not graded,
 * score distributions), not the Phase 4 one-sidedness mechanism that has
 * been the project's focus since. Fixed by (a) retargeting q40 to
 * `belief_updating` (removing one half of the near-duplicate pair) and (b)
 * adding q63, a dedicated bidirectional likert item — the exact same fix
 * pattern already proven six times, not a novel intervention. See Stage 4
 * diagnostics in `docs/phase6.6-taxonomy-v1.1-implementation.md` for the
 * measured before/after signature-trait frequency.
 *
 * COLLABORATION — deliberately NOT touched by this migration's core scope.
 * Still the taxonomy's most one-sided attribute (82%, quiz_v1); Phase 5
 * found this causes no measurable downstream matching defect. An optional
 * second bidirectional item was designed (see the design doc §5) but is
 * NOT implemented in this file — implementing it was left as an explicit,
 * separate decision for the reviewer, not bundled into this migration.
 *
 * SECTION REBALANCING: new items were placed to reduce, not compound,
 * `docs/quiz-structure.md`'s flagged section-length imbalance (s3_work was
 * 12 of 56 in quiz_v1, 33-50% longer than every other section).
 * `resourcefulness`'s two new dedicated items went to s6_drive (the
 * shortest section pre-migration at 8, after q27's removal) rather than
 * s3_work. Final distribution: s1=10, s2=8, s3=11, s4=12, s5=11, s6=10 (62
 * total) — narrower range than quiz_v1's 8/8/9/9/9/12.
 *
 * DISPLAY ORDER: every section's `questionIds` order below was mechanically
 * re-verified for same-trait adjacency (no two items sharing a PRIMARY
 * trait sit next to each other, with exactly one documented, deliberate
 * exception: q20/q63, both decisiveness, kept adjacent so the new graded
 * fix immediately follows its trade-off partner — the same pattern q31
 * already uses next to q02 in this bank). The q21/q39 near-duplicate
 * pairing flagged in `docs/quiz-structure.md` (adjacent in quiz_v1) is
 * resolved by separation, not deletion — both items are retained (they
 * measure complementary, independently useful attributes) and no longer
 * sit next to each other.
 *
 * ============================================================================
 * STAGE 4.5 (Phase 6.6 implementation) — measurement-repair gate, 62 -> 64.
 * ============================================================================
 *
 * Stage 4's structural diagnostics on the as-approved 62-item bank (run
 * before any person was scored) found two real, measured defects — not
 * hypothetical ones — that the approved design's own verification had
 * missed. Both are documented in full, with the empirical A/B/C comparison
 * that resolved them, in `docs/phase6.6-taxonomy-v1.1-implementation.md`;
 * this is the durable summary of what changed in this file and why.
 *
 * DEFECT 1 — the four new attributes reproduced item-format bimodality.
 * Each launched with 3 items: 1 situational/forced-choice anchor + 1
 * dedicated likert + 1 forced-choice trade-off — i.e. 2 of 3 items were
 * binary/choice-format. "Bidirectional by construction" (both signs
 * represented) is not the same guarantee as "graded" (a binary choice still
 * produces a bimodal score distribution, the exact Phase 2 "2a" mechanism
 * that originally inflated intuitive_synthesis/autonomy_need). Measured
 * result before repair: opportunity_sensing/resourcefulness/
 * proactive_agency/belief_updating simSd/refSd ratios of 1.61-1.82 (higher
 * than decisiveness's pre-fix 1.40) and signature-trait frequencies of
 * 9.8-14.3% against a 2.9% uniform baseline (34 attributes) — four of the
 * taxonomy's six most overrepresented traits, all four brand new.
 *
 * Three repairs were built and SIMULATED (n=8,000 each), not chosen by
 * assumption:
 *   - Alternative A (baseline/failure): as above.
 *   - Alternative B (same-count graded reallocation): convert the
 *     forced-choice trade-off item (q58/q60/q62/q65) to a second dedicated
 *     graded likert, keeping the situational/choice anchor for behavioural
 *     variety. Result: ratios fell to 1.42-1.55, signature-trait
 *     frequencies fell to 5.1-7.1% — roughly halved, at ZERO item-count
 *     cost.
 *   - Alternative C (additive reinforcement): keep all 3 original items,
 *     add a 4th dedicated graded item (+4 total length). Result: ratios
 *     1.45-1.59, frequencies 7.7-9.2% — better than baseline but WORSE than
 *     Alternative B despite costing 4 more items, because it dilutes the
 *     bimodal variance rather than removing its source.
 *   Alternative B won outright (not merely "comparably" to C) at no length
 *   cost. Implemented as: q58, q60, q62, q65 are now dedicated likert items
 *   (see each item's inline comment below for what it replaced). Fixing
 *   q58 also corrected a genuine sign bug found during this rebuild: the
 *   original forced-choice q58 gave opportunity_sensing a POSITIVE effect
 *   for "missing a shift because absorbed", which is backwards.
 *
 * DEFECT 2 — competitiveness breached the ≤55%-single-item-share guard.
 * Removing q27 (approved, correctly justified for 7 of the 8 attributes it
 * touched) left competitiveness with only 2 items, one (q28) holding 66.7%
 * of its total weight — the approved design's own verification missed this
 * one attribute specifically (it never had a third independent item).
 * Three repairs were built and simulated:
 *   - B1 (restore q27 unchanged, +1 item): fixes competitiveness's share
 *     (0.67 -> 0.46) but reintroduces one-sidedness into six OTHER
 *     previously well-behaved attributes it also touches (achievement_drive
 *     and autonomy_need each went from a clean 0% one-sided to 22-29%;
 *     mastery_orientation, deep_focus, leadership_drive, independent_
 *     thinking all measurably worsened too) — a real quality regression in
 *     exchange for the fix.
 *   - B2a (new dedicated graded item, non-work "friendly game or contest"
 *     context, +1 item): fixes the share (0.67 -> 0.43) with the cleanest
 *     variance profile of any candidate tested (simSd/refSd 0.99, almost
 *     exactly matching the reference assumption) and ZERO measurable effect
 *     on any other attribute.
 *   - B2b (new forced-choice trade-off, external-comparison vs. internal-
 *     standard, +1 item): also fixes the share, but produces a materially
 *     higher variance (ratio 1.23) than B2a — the same choice-format-
 *     bimodality mechanism as Defect 1, confirmed a second time.
 *   B2a won clearly: fixes the target problem, introduces no new problem
 *   elsewhere, and happens to add a non-work scenario context (games/
 *   contests) that independently serves the "reduce work-framing
 *   concentration" product goal. Implemented as q66.
 *
 * DEFECT 3 (found while resolving Defect 2, not separately requested) —
 * cross_domain_range, weakened by q01's removal from 3 items to 2 (one of
 * them, q09, one-sided), was already elevated pre-repair (50% one-sided,
 * ratio 1.51, sigFreq 9.3%) and became the single WORST remaining
 * signature-trait overrepresentation once Defects 1-2 were fixed (10.9%,
 * since suppressing four bigger distortions mechanically raises the next-
 * most-elevated attributes' relative win rate in signatureTrait's one-
 * winner selection). Restoring q01 was explicitly evaluated and rejected:
 * q01's cross_domain_range effect was itself one-sided and same-signed as
 * q09's, so it would not have fixed the underlying one-sidedness mechanism,
 * only diluted it. A new dedicated graded item (q67, a genuine breadth-vs-
 * depth tension against deep_focus, matching the bank's existing q47
 * trade-off pattern) was built and simulated instead: one-sidedness
 * 50% -> 34%, ratio 1.51 -> 1.30, sigFreq 10.9% -> 5.9% — no longer the
 * standout outlier.
 *
 * impact_motivation was evaluated and explicitly NOT repaired: weakened to
 * 2 items (maxShare 0.52 — thin but under the 0.55 guard) by the same q27
 * removal, but both its items are already perfectly bidirectional graded
 * likerts (0% one-sided) and its signature-trait frequency (0.7%) sits
 * BELOW the uniform baseline — restoring q27 would "fix" the share cosmetic
 * only at the cost of reintroducing one-sidedness for no measured benefit.
 * Classified ACCEPT CURRENT COVERAGE.
 *
 * collaboration's own measurement is unchanged by Stage 4.5 (not in scope —
 * Phase 5 already found its one-sidedness causes no downstream matching
 * defect); its signature-trait frequency shifting is a side effect of
 * suppressing other distortions, the same reshuffling effect noted for
 * cross_domain_range above, not a new defect in collaboration itself.
 *
 * NET RESULT: 62 -> 64 items (q66, q67 added; no item removed). No
 * `matching_v2`, eligibility threshold, or reference SD was touched to
 * produce any of the above numbers — every improvement came from the
 * questionnaire measurement layer, per instruction.
 *
 * ============================================================================
 * STAGE 10C-B (Phase 6.6) — response-anchor symmetry, custom bipolar anchors.
 * ============================================================================
 *
 * Human finding, after two full manual quiz_v2 retakes (the second after
 * Stage 10B): some single-statement likert7 items can still feel evaluative
 * purely from being wrapped in "Strongly disagree <-> Strongly agree", even
 * once the STATEMENT itself is neutral — because "I can..." / single-
 * direction capability language plus a plain agree/disagree scale still
 * reads as "agree = good, disagree = deficient" for a few constructs. See
 * CLAUDE.md's "Response-anchor symmetry" section for the durable rule this
 * established; full 50-item audit (A=41, B=8, C=0, D=0) in
 * `docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 10C-A".
 *
 * Of the 8 items the audit flagged as candidates, only 3 were approved for
 * this first prototype: q13 (deep_focus), q57 (opportunity_sensing), q61
 * (belief_updating) — chosen because their proposed bipolar endpoints are
 * cleanly within their own construct with no leakage risk. The other 5
 * (q21, q19, q56, q04, q38) were deliberately deferred — q19/q56 for
 * possible construct drift (execution_speed/decisiveness/planning for q19;
 * work-session-architecture vs. deep-focus-capacity for q56), q04/q38 for
 * explicit construct-leakage risk (q04's low-pole anchor risked reading as
 * conformity to majority opinion; q38's proposed opposite pole would have
 * introduced discipline/deep_focus as curiosity's counter-construct), q21
 * simply as a good second-wave candidate not needed for this prototype.
 *
 * Mechanism: q13/q57/q61's `promptKey` values were restated as neutral
 * situational stems (see `en.ts`) so the two new anchors read as one
 * continuum rather than a bolted-on pair next to an unrelated agree/
 * disagree claim — NOT a Stage 10B evaluative-wording fix (that work is
 * already done and approved for these items), but a structural change
 * needed for the bipolar-anchor UI to read coherently. `leftAnchorKey`/
 * `rightAnchorKey` (`src/core/quiz/types.ts`) are optional, presentational
 * fields `scoreQuiz` never reads — confirmed by inspection, `scoring.ts`
 * only ever reads `response.value`, `question.effects`, and
 * `question.reverseKeyed`. All three items' effects, weights, format
 * (`likert7`), and section membership are byte-identical to before this
 * stage. No midpoint (4) label was added, per instruction. Screen grouping
 * (`quizScreens.ts`) reads only `promptKey` length, never anchor-key
 * length, and was re-verified byte-identical after this change (53
 * screens, same pairings, including q13's existing pairing with q16 and
 * q61's isolation from q21+q26 — see the implementation report for the
 * exact diff).
 */

import { TAXONOMY_VERSION } from "../attributes/attributes.js";
import type { AttributeEffect, Quiz, QuizQuestion } from "./types.js";

export const QUIZ_VERSION = "quiz_v2";

const e = (attributeId: AttributeEffect["attributeId"], direction: number, weight = 1): AttributeEffect => ({
  attributeId,
  direction,
  weight,
});

const choice = (
  id: string,
  sectionId: string,
  options: Array<[string, AttributeEffect[]]>,
  format: "forced_choice" | "situational" = "situational",
): QuizQuestion => ({
  id,
  sectionId,
  format,
  promptKey: `quiz.${id}.prompt`,
  options: options.map(([optId, effects]) => ({
    id: optId,
    labelKey: `quiz.${id}.option.${optId}`,
    effects,
  })),
  skippable: true,
});

const likert = (
  id: string,
  sectionId: string,
  effects: AttributeEffect[],
  reverseKeyed = false,
): QuizQuestion => ({
  id,
  sectionId,
  format: "likert7",
  promptKey: `quiz.${id}.prompt`,
  effects,
  ...(reverseKeyed ? { reverseKeyed: true } : {}),
  skippable: true,
});

const questions: QuizQuestion[] = [
  /* ------------------------------------------------ S1 — how you think */
  choice(
    "q02",
    "s1_thinking",
    [
      // Rebalanced (Phase 2 trait-diagnostic): see file header.
      ["a", [e("analytical_rigor", 1, 1.1), e("detail_orientation", 0.5, 0.7), e("intuitive_synthesis", -0.5, 0.7)]],
      ["b", [e("intuitive_synthesis", 0.8, 0.9), e("decisiveness", 0.5, 0.7), e("analytical_rigor", -0.3, 0.5)]],
    ],
    "forced_choice",
  ),
  likert("q03", "s1_thinking", [e("systems_abstraction", 1, 1.1), e("analytical_rigor", 0.4, 0.6)]),
  likert("q04", "s1_thinking", [e("independent_thinking", 1, 1.1), e("conflict_tolerance", 0.4, 0.6)]),
  likert("q31", "s1_thinking", [e("intuitive_synthesis", 1, 1.0)]),
  // PHASE 6.6 REWRITE (was one-sided curiosity/analytical_rigor/
  // execution_speed): retargeted to opportunity_sensing, its primary anchor
  // item. Options (a)/(c) give opportunity_sensing opposite signs, making
  // this item bidirectional for the new attribute from day one.
  choice("q05", "s1_thinking", [
    ["a", [e("opportunity_sensing", 1.0, 1.1), e("execution_speed", 0.4, 0.6)]],
    ["b", [e("curiosity", 0.8, 0.9), e("analytical_rigor", 0.5, 0.7)]],
    ["c", [e("deep_focus", 0.6, 0.8), e("opportunity_sensing", -0.4, 0.6)]],
  ]),
  likert("q38", "s1_thinking", [e("curiosity", 1, 1.0)]),
  // STAGE 4.5 REPAIR (bank.ts header, "STAGE 4.5" section): retargeted from
  // a forced-choice trade-off to a graded likert — see rationale below.
  // Also fixes a genuine sign bug this replaces: the original q58 gave
  // opportunity_sensing a POSITIVE effect for "missing a shift because
  // absorbed", which is backwards (that describes low opportunity sensing).
  likert("q58", "s1_thinking", [e("opportunity_sensing", -1.0, 1.0)]),
  choice(
    "q46",
    "s1_thinking",
    [
      ["a", [e("systems_abstraction", 1, 1.0), e("detail_orientation", -0.4, 0.6)]],
      ["b", [e("detail_orientation", 1, 1.0), e("systems_abstraction", -0.4, 0.6)]],
    ],
    "forced_choice",
  ),
  likert("q53", "s1_thinking", [e("analytical_rigor", 1, 1.2)]),
  // PHASE 6.6 NEW: opportunity_sensing dedicated likert — new opener for
  // s1_thinking, replacing q01's removed 4-way situational (gentler format).
  // STAGE 10C-B: custom behavioral scale anchors (see bank.ts header far
  // below and CLAUDE.md "Response-anchor symmetry") — prompt restated as a
  // neutral situational stem so the two anchors read as one continuum
  // rather than a bolted-on pair next to an agree/disagree claim. Effects/
  // weight/format completely unchanged.
  {
    ...likert("q57", "s1_thinking", [e("opportunity_sensing", 1.0, 1.1)]),
    leftAnchorKey: "quiz.q57.anchor.left",
    rightAnchorKey: "quiz.q57.anchor.right",
  },
  // (q58 is defined earlier in this array, next to q38 — see STAGE 4.5 note.)

  /* --------------------------------------------- S2 — ideas and making */
  likert("q06", "s2_ideas", [e("creative_originality", 1, 1.1), e("independent_thinking", 0.4, 0.6)]),
  choice(
    "q07",
    "s2_ideas",
    [
      ["a", [e("experimentation", 1, 1.1), e("execution_speed", 0.6, 0.8)]],
      ["b", [e("planning_orientation", 1, 1.0), e("analytical_rigor", 0.5, 0.7)]],
    ],
    "forced_choice",
  ),
  likert("q08", "s2_ideas", [e("aesthetic_sensitivity", 1, 1.2), e("detail_orientation", 0.4, 0.6)]),
  choice("q09", "s2_ideas", [
    ["a", [e("cross_domain_range", 1, 1.1), e("curiosity", 0.6, 0.8)]],
    ["b", [e("deep_focus", 0.9, 1.0), e("mastery_orientation", 0.7, 0.9)]],
    ["c", [e("cross_domain_range", 0.3, 0.6), e("adaptability", 0.6, 0.7)]],
  ]),
  likert("q10", "s2_ideas", [e("creative_originality", 0.8, 0.9), e("experimentation", 0.7, 0.9)]),
  likert("q35", "s2_ideas", [e("cross_domain_range", 1, 1.1)]),
  likert("q41", "s2_ideas", [e("experimentation", 1, 1.0), e("creative_originality", 0.4, 0.6)]),
  likert("q48", "s2_ideas", [e("perfectionism", 1, 1.0), e("aesthetic_sensitivity", 0.3, 0.5)]),
  // STAGE 4.5 NEW: cross_domain_range — a second, fully bidirectional item
  // (its only other item, q35, is bidirectional, but its anchor q09 is
  // one-sided, leaving cross_domain_range at 50% one-sided and the worst
  // remaining signature-trait overrepresentation after the Stage 4.5 new-
  // trait repair — see bank.ts header "STAGE 4.5"). Encodes a genuine
  // breadth-vs-depth tension against deep_focus, matching the bank's
  // existing trade-off pattern (cf. q47).
  likert("q67", "s2_ideas", [e("cross_domain_range", 1.0, 1.0), e("deep_focus", -0.3, 0.4)]),

  /* ---------------------------------------------- S3 — how you work */
  likert("q11", "s3_work", [e("discipline", 1, 1.2), e("persistence", 0.4, 0.6)]),
  choice(
    "q12",
    "s3_work",
    [
      ["a", [e("perfectionism", 1, 1.2), e("detail_orientation", 0.6, 0.8), e("aesthetic_sensitivity", 0.5, 0.9)]],
      ["b", [e("execution_speed", 1, 1.1), e("decisiveness", 0.5, 0.7)]],
    ],
    "forced_choice",
  ),
  // STAGE 10C-B: custom behavioral scale anchors — see q57's comment above.
  {
    ...likert("q13", "s3_work", [e("deep_focus", 1, 1.2), e("discipline", 0.4, 0.6)]),
    leftAnchorKey: "quiz.q13.anchor.left",
    rightAnchorKey: "quiz.q13.anchor.right",
  },
  likert("q14", "s3_work", [e("detail_orientation", 1, 1.1), e("perfectionism", 0.4, 0.6)]),
  likert("q16", "s3_work", [e("execution_speed", 0.9, 1.0), e("perfectionism", -0.5, 0.7)]),
  likert("q34", "s3_work", [e("mastery_orientation", 1, 1.0)]),
  likert("q37", "s3_work", [e("execution_speed", 1, 1.0)]),
  choice(
    "q47",
    "s3_work",
    [
      ["a", [e("deep_focus", 1, 1.0), e("execution_speed", -0.4, 0.6)]],
      ["b", [e("execution_speed", 1, 1.0), e("deep_focus", -0.4, 0.6)]],
    ],
    "forced_choice",
  ),
  likert("q54", "s3_work", [e("planning_orientation", 1, 1.2)]),
  likert("q56", "s3_work", [e("deep_focus", 1, 1.2)]),
  // PHASE 6.6 REWRITE (option c only, was execution_speed/risk_tolerance/
  // intuitive_synthesis, one-sided): retargeted to resourcefulness, reframed
  // as a resource-shortfall scenario. Options (a)/(b) unchanged in effect
  // from quiz_v1 except option (a) no longer carries a systems_abstraction
  // secondary (approved simplification — see file header).
  choice("q15", "s3_work", [
    ["a", [e("planning_orientation", 1.0, 1.1), e("discipline", 0.5, 0.7)]],
    ["b", [e("adaptability", 0.9, 1.0), e("ambiguity_tolerance", 0.5, 0.7)]],
    ["c", [e("resourcefulness", 1.0, 1.1), e("execution_speed", 0.3, 0.5)]],
  ]),

  /* ------------------------------- S4 — uncertainty and setbacks */
  choice("q17", "s4_uncertainty", [
    ["a", [e("persistence", 1, 1.2), e("mastery_orientation", 0.5, 0.7)]],
    ["b", [e("adaptability", 1, 1.1), e("ambiguity_tolerance", 0.5, 0.7)]],
    ["c", [e("analytical_rigor", 0.8, 0.9), e("systems_abstraction", 0.5, 0.7)]],
    ["d", [e("persistence", -0.6, 0.8), e("collaboration", 0.5, 0.7)]],
  ]),
  likert("q18", "s4_uncertainty", [e("risk_tolerance", 1, 1.2), e("decisiveness", 0.4, 0.6)]),
  likert("q19", "s4_uncertainty", [e("ambiguity_tolerance", 1, 1.2), e("planning_orientation", -0.4, 0.6)]),
  choice(
    "q20",
    "s4_uncertainty",
    [
      ["a", [e("decisiveness", 1, 1.1), e("risk_tolerance", 0.5, 0.7), e("intuitive_synthesis", 0.7, 0.9)]],
      ["b", [e("analytical_rigor", 0.8, 0.9), e("decisiveness", -0.7, 0.8), e("intuitive_synthesis", -0.6, 0.9)]],
    ],
    "forced_choice",
  ),
  likert("q21", "s4_uncertainty", [e("persistence", 1, 1.1), e("adaptability", -0.3, 0.6)]),
  likert("q39", "s4_uncertainty", [e("adaptability", 1, 1.0)]),
  likert("q45", "s4_uncertainty", [e("risk_tolerance", 1, 1.0), e("ambiguity_tolerance", 0.4, 0.6)]),
  likert("q49", "s4_uncertainty", [e("ambiguity_tolerance", 1, 1.0)]),
  // PHASE 6.6 REWRITE (was decisiveness/analytical_rigor "act vs. verify" —
  // a near-duplicate of q20; see "decisiveness" in file header): retargeted
  // entirely to belief_updating.
  choice(
    "q40",
    "s4_uncertainty",
    [
      ["a", [e("belief_updating", 1.0, 1.0), e("decisiveness", -0.3, 0.5)]],
      ["b", [e("belief_updating", -0.8, 0.9), e("persistence", 0.3, 0.5)]],
    ],
    "forced_choice",
  ),
  // PHASE 6.6 NEW: decisiveness root-cause fix — the dedicated graded item
  // this attribute never had (see file header). Deliberately placed
  // adjacent to q20, the one documented exception to the no-same-trait-
  // adjacency rule in this bank.
  likert("q63", "s4_uncertainty", [e("decisiveness", 1.0, 1.1)]),
  // PHASE 6.6 NEW: belief_updating dedicated likert, phrased as a feedback-
  // response scenario (design doc §10 — feedback as question context,
  // folded into belief_updating rather than a separate canonical trait).
  // STAGE 10C-B: custom behavioral scale anchors — see q57's comment above.
  {
    ...likert("q61", "s4_uncertainty", [e("belief_updating", 1.0, 1.1)]),
    leftAnchorKey: "quiz.q61.anchor.left",
    rightAnchorKey: "quiz.q61.anchor.right",
  },
  // STAGE 4.5 REPAIR: retargeted from a forced-choice trade-off to a graded
  // likert — see bank.ts header "STAGE 4.5" section for why. Still encodes
  // the historically-real low-pole case (resistance to update without proof
  // is a defensible position, not stubbornness), just as a graded statement.
  likert("q62", "s4_uncertainty", [e("belief_updating", -1.0, 1.0), e("persistence", 0.3, 0.5)]),

  /* ------------------------------------------------------ S5 — people */
  likert("q22", "s5_people", [
    e("social_assertiveness", 1, 1.2),
    e("persuasiveness", 0.4, 0.6),
    e("conflict_tolerance", 0.3, 0.7),
  ]),
  choice(
    "q23",
    "s5_people",
    [
      ["a", [e("collaboration", 1, 1.2), e("autonomy_need", -0.6, 0.8)]],
      ["b", [e("autonomy_need", 1, 1.1), e("independent_thinking", 0.5, 0.7)]],
    ],
    "forced_choice",
  ),
  likert("q24", "s5_people", [e("leadership_drive", 1, 1.2), e("social_assertiveness", 0.4, 0.6)]),
  choice("q25", "s5_people", [
    ["a", [e("conflict_tolerance", 1, 1.1), e("independent_thinking", 0.4, 0.6)]],
    ["b", [e("collaboration", 0.7, 0.9), e("conflict_tolerance", -0.7, 0.8)]],
    ["c", [e("persuasiveness", 0.9, 1.0), e("leadership_drive", 0.5, 0.7)]],
  ]),
  likert("q26", "s5_people", [e("persuasiveness", 1, 1.1), e("aesthetic_sensitivity", 0.2, 0.5)]),
  likert("q33", "s5_people", [e("collaboration", 1, 1.0)]),
  likert("q43", "s5_people", [e("leadership_drive", 1, 1.0)]),
  likert("q44", "s5_people", [e("persuasiveness", 1, 1.0)]),
  // PHASE 6.6 KEEP+REMAP: option (a) only, retargeted from autonomy_need/
  // execution_speed to proactive_agency. Options (b)/(c) byte-identical to
  // quiz_v1.
  choice("q52", "s5_people", [
    ["a", [e("proactive_agency", 1.0, 1.1), e("execution_speed", 0.3, 0.5)]],
    ["b", [e("collaboration", 1, 1.0), e("persuasiveness", 0.3, 0.5)]],
    ["c", [e("leadership_drive", 0.6, 0.8), e("social_assertiveness", 0.5, 0.7)]],
  ]),
  // PHASE 6.6 NEW: proactive_agency dedicated likert.
  likert("q64", "s5_people", [e("proactive_agency", 1.0, 1.1)]),
  // STAGE 4.5 REPAIR: retargeted from a forced-choice trade-off to a graded
  // likert — see bank.ts header "STAGE 4.5" section for why.
  likert("q65", "s5_people", [e("proactive_agency", -1.0, 1.0), e("collaboration", 0.2, 0.3)]),

  /* ---------------------------------------------- S6 — what drives you */
  likert("q28", "s6_drive", [e("competitiveness", 1, 1.2), e("achievement_drive", 0.4, 0.6)]),
  likert("q29", "s6_drive", [e("impact_motivation", 1, 1.1), e("curiosity", 0.3, 0.5)]),
  likert("q30", "s6_drive", [
    e("achievement_drive", 1, 1.1),
    e("autonomy_need", 0.3, 0.5),
    e("competitiveness", 0.3, 0.6),
  ]),
  likert("q32", "s6_drive", [e("autonomy_need", 1, 1.0)]),
  likert("q42", "s6_drive", [e("impact_motivation", 1, 1.0), e("mastery_orientation", -0.4, 0.6)]),
  likert("q50", "s6_drive", [e("achievement_drive", 1, 1.0)]),
  likert("q51", "s6_drive", [e("autonomy_need", 1, 1.0)]),
  likert("q55", "s6_drive", [e("mastery_orientation", 1, 1.2)]),
  // PHASE 6.6 NEW: resourcefulness dedicated likert. Placed here (not
  // s3_work, its thematically-nearer section) to avoid growing s3_work
  // further — see "SECTION REBALANCING" in file header.
  likert("q59", "s6_drive", [e("resourcefulness", 1.0, 1.1)]),
  // STAGE 4.5 REPAIR: retargeted from a forced-choice trade-off to a graded
  // likert — see bank.ts header "STAGE 4.5" section for why.
  likert("q60", "s6_drive", [e("resourcefulness", -1.0, 1.0)]),
  // STAGE 4.5 NEW: competitiveness — a second, fully independent bidirectional
  // item in a non-work, everyday context, fixing the >0.55 single-item-share
  // guard violation q27's removal caused. See bank.ts header "STAGE 4.5".
  likert("q66", "s6_drive", [e("competitiveness", 1.0, 1.0)]),
];

export const QUIZ: Quiz = {
  version: QUIZ_VERSION,
  taxonomyVersion: TAXONOMY_VERSION,
  sections: [
    {
      id: "s1_thinking",
      titleKey: "quiz.section.s1_thinking",
      questionIds: ["q57", "q02", "q03", "q04", "q05", "q31", "q58", "q38", "q46", "q53"],
    },
    {
      id: "s2_ideas",
      titleKey: "quiz.section.s2_ideas",
      questionIds: ["q06", "q07", "q08", "q09", "q10", "q35", "q41", "q48", "q67"],
    },
    {
      id: "s3_work",
      titleKey: "quiz.section.s3_work",
      questionIds: ["q13", "q16", "q11", "q12", "q34", "q54", "q47", "q14", "q37", "q15", "q56"],
    },
    {
      id: "s4_uncertainty",
      titleKey: "quiz.section.s4_uncertainty",
      questionIds: ["q17", "q45", "q62", "q39", "q18", "q49", "q40", "q19", "q20", "q63", "q61", "q21"],
    },
    {
      id: "s5_people",
      titleKey: "quiz.section.s5_people",
      questionIds: ["q26", "q25", "q64", "q23", "q44", "q52", "q22", "q65", "q24", "q33", "q43"],
    },
    {
      id: "s6_drive",
      titleKey: "quiz.section.s6_drive",
      questionIds: ["q28", "q32", "q55", "q59", "q30", "q29", "q50", "q66", "q60", "q51", "q42"],
    },
  ],
  questions,
};

/**
 * Display order for the quiz UI: walk `quiz.sections` in order, and each
 * section's own `questionIds` in order. Deliberately NOT `quiz.questions`
 * (the raw array above), which is in authoring order and does not match
 * what a user sees — see the section header comment for the full history
 * of why this distinction exists and matters. Scoring itself is order-
 * independent (tested in scoring.test.ts); this function is presentation-
 * only and never changes a result.
 */
export function orderedQuestions(quiz: Quiz): QuizQuestion[] {
  const byId = new Map(quiz.questions.map((q) => [q.id, q]));
  return quiz.sections
    .flatMap((section) => section.questionIds)
    .map((id) => byId.get(id))
    .filter((q): q is QuizQuestion => q !== undefined);
}
