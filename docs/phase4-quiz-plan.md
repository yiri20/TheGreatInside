# Phase 4 quiz expansion — durable plan & handoff

Status: **COMPLETE (2026-08).** This document is preserved for its per-item
design detail (why each item is worded and mapped the way it is, and what
alternatives were rejected during authoring — see "Items added" below). See
CLAUDE.md "Phase 4 (COMPLETE)" for the durable summary: final numbers,
before/after diagnostics, the two additional rounds (q53-q56) this document's
original plan didn't yet know it would need, `reference_v2`, and final
calibration. The "what has NOT been done yet" section below is now entirely
historical — everything it lists was completed.

## What triggered this expansion

Known open issue 2b (CLAUDE.md, pre-Phase-4): several attributes' simulated
population means sat far above `reference_v1`'s assumed means
(`planning_orientation` +30, similarly `execution_speed`,
`mastery_orientation`, `collaboration`, `cross_domain_range`), inflating
their signature-trait frequency regardless of real individual variation.

## Diagnostic method (new, reusable, preserved in code)

Added `analyseDirectionBalance(quiz)` to `src/core/quiz/scoring.ts`. For
every attribute it computes `oneSidedShare`: the fraction of the attribute's
total measurement weight that comes from choice-format items where the
attribute is only ever loaded with ONE sign across all options (selecting
the option adds signal; selecting anything else contributes nothing — not a
negative). Likert items are always bidirectional by construction (the 1..7
scale itself carries the negative pole). A choice item is bidirectional only
when two or more of its options load the same attribute with opposite signs
(a genuine trade-off).

`src/dev/trait-diagnostic.ts` was extended to print `oneSidedShare` per
attribute alongside `refMean`/`simMean`/`meanDiff`, and to report Pearson
correlations. Run: `corepack pnpm@10 exec tsx src/dev/trait-diagnostic.ts`.

## Confirmed finding

`correlation(oneSidedShare, meanDiff) = 0.851` — by far the strongest
relationship found (vs. item count 0.180, total weight 0.335, the
previously-fixed simSd/refSd dispersion ratio 0.295). Attributes at 100%
one-sided share showed roughly +28 to +32 point simulated-mean bias;
attributes at 0% one-sided share (persistence, creative_originality,
conflict_tolerance) showed near-zero bias (-0.0 to +6.0) — this also weighs
against "reference_v1 is simply unrealistic" as the primary explanation,
since the bidirectionally-measured attributes already validate reference_v1's
assumed means closely.

Social-desirability wording and competence/achievement framing were ruled
out as primary causes — existing items already followed the Phase 0
authoring discipline (situational, not "are you X"). The defect is
structural (how choice-item scoring interacts with a weighted mean over
items that fired), not a wording problem.

## Fix strategy

Add items rather than rewrite the existing 32 (lower risk of an unnoticed
regression), targeting every attribute with `oneSidedShare` >= ~50% in the
baseline diagnostic. Mostly bidirectional graded Likert items (bidirectional
by construction) plus a handful of genuine two-attribute forced-choice
trade-offs, where each option gives one attribute a real positive and the
other a real negative — this fixes bidirectionality for both attributes in a
single item.

Explicitly avoided: wording or pairing duplication with existing items
(checked by grepping existing item text/mappings during design — three
near-duplicates were caught and redesigned before being written, see
below); adding a third item to a pairing that already appears twice
(mastery_orientation + deep_focus already co-occur in q09b and q27a — q34
below drops the deep_focus secondary for this reason).

## Items added: q33–q52 (20 items, bank now 52 total, `QUIZ_VERSION = "quiz_v1"`)

All effects use `e(attributeId, direction, weight)`.

| id | section | format | effects | notes |
|---|---|---|---|---|
| q33 | s5_people | likert | collaboration +1.0 | |
| q34 | s3_work | likert | mastery_orientation +1.0 | no deep_focus secondary — see above |
| q35 | s2_ideas | likert | cross_domain_range +1.1 | |
| q36 | s3_work | forced_choice (2-way) | a: planning_orientation+1.0/ambiguity_tolerance−0.5; b: ambiguity_tolerance+1.0/planning_orientation−0.5 | genuine trade-off |
| q37 | s3_work | likert | execution_speed +1.0 | |
| q38 | s1_thinking | likert | curiosity +1.0 | |
| q39 | s4_uncertainty | likert | adaptability +1.0 | originally drafted as forced_choice vs persistence; simplified to likert-only since persistence was already at 0% one-sided share and within 2.4 pts of its reference mean — pairing again would be redundant |
| q40 | s4_uncertainty | forced_choice (2-way) | a: decisiveness+1.0/analytical_rigor−0.4; b: analytical_rigor+1.0/decisiveness−0.5 | "verify before acting" framing — distinct from existing q20's "decide now vs wait on incomplete info" framing |
| q41 | s2_ideas | likert | experimentation +1.0, creative_originality +0.4 | redesigned from a "5 rough vs 1 perfect version" framing (too close to existing q10) to an exposure/sharing-willingness framing |
| q42 | s6_drive | likert | impact_motivation +1.0, mastery_orientation −0.4 | |
| q43 | s5_people | likert | leadership_drive +1.0 | |
| q44 | s5_people | likert | persuasiveness +1.0 | |
| q45 | s4_uncertainty | likert | risk_tolerance +1.0, ambiguity_tolerance +0.4 | |
| q46 | s1_thinking | forced_choice (2-way) | a: systems_abstraction+1.0/detail_orientation−0.4; b: detail_orientation+1.0/systems_abstraction−0.4 | |
| q47 | s3_work | forced_choice (2-way) | a: deep_focus+1.0/execution_speed−0.4; b: execution_speed+1.0/deep_focus−0.4 | deep_focus's fix, instead of a third pairing with mastery_orientation |
| q48 | s2_ideas | likert | perfectionism +1.0, aesthetic_sensitivity +0.3 | redesigned from a "small flaws bother me" framing (too close to existing q14) to a repeated-revision-behavior framing |
| q49 | s4_uncertainty | likert | ambiguity_tolerance +1.0 | |
| q50 | s6_drive | likert | achievement_drive +1.0 | |
| q51 | s6_drive | likert | autonomy_need +1.0 | |
| q52 | s5_people | situational (3-way) | a: autonomy_need+0.8/execution_speed+0.5; b: collaboration+1.0/persuasiveness+0.3; c: leadership_drive+0.6/social_assertiveness+0.5 | |

Section totals after expansion: s1_thinking 8, s2_ideas 8, s3_work 10,
s4_uncertainty 9, s5_people 9, s6_drive 8 — 52 total.

English copy (`quiz.qXX.prompt` / `quiz.qXX.option.*`) for all 20 items was
added to `src/core/i18n/en.ts` under a "Phase 4 additions" section. Korean
translation is deliberately deferred (English instrument should stabilize
first, per project convention — see CLAUDE.md "Localisation").

## No changes to existing 32 items or to the canonical 30-attribute taxonomy

Only additive changes. `matching_v2`, `scoring_v1`'s formula, and
`taxonomy_v1` are all untouched in this phase so far.

## Verified clean at this checkpoint

- `corepack pnpm@10 exec tsc --noEmit` — clean
- `corepack pnpm@10 exec vitest run` — 164/164 passing (8 test files)
- No scratch/debug files left in the repo

## What has NOT been done yet — exact next sequence for a fresh session

1. Re-run `corepack pnpm@10 exec tsx src/dev/trait-diagnostic.ts` and
   `src/dev/diagnose.ts` against the new 52-item bank to confirm the
   expansion actually reduced `oneSidedShare` and `meanDiff` for the
   targeted attributes (it has NOT been confirmed yet — only the baseline
   diagnosis and the item design are done).
2. If the diagnostic confirms the fix, decide whether any attribute still
   needs another item (target range is 45-60; currently at 52).
3. Create `reference_v2`: preserve `reference_v1` for historical
   traceability; explicitly distinguish (a) real population norms [not
   available], (b) simulated quiz-output distributions, (c) modelling
   reference values for distinctiveness; document derivation/limitations
   honestly (this is a modelling reference, not population psychology).
4. Wire `reference_v2` into distinctiveness/signature-trait/constellation
   code paths; bump any version constants this touches; decide whether
   `scoring_v1` needs a version bump (only if scoring *behavior* changes
   beyond question-bank content — content-only changes are covered by the
   `QUIZ_VERSION` bump already made to `quiz_v1`).
5. Re-run the full calibration workflow in order:
   `corepack pnpm@10 exec tsx src/dev/calibrate.ts quiz` (twice — first
   pass writes `dispersion.generated.ts`, second reports percentiles with
   it in effect), then
   `corepack pnpm@10 exec tsx src/dev/simulate.ts 10000 quiz` (match/
   greatness distributions + #1 domination check, threshold: no person
   >20% at n>=30). Treat `matching_v2` as stable — do not modify it unless
   a new diagnostic actually falsifies an existing invariant.
6. Add deterministic regression tests for the one-sided-measurement failure
   mode confirmed this session (e.g. a small fixture quiz + a test that
   `analyseDirectionBalance` correctly classifies bidirectional vs
   one-sided choice items), and for anything else the post-expansion
   diagnostics reveal. Preserve all pre-existing invariant tests (level
   domination, flat-profile domination, coverage advantage, forced-choice
   variance inflation, metadata immunity, locale immunity).
7. Full verification: typecheck, full test suite, quiz coverage
   diagnostics, trait diagnostic, two-pass calibration, 10,000-profile
   quiz-mode simulation, production build (`pnpm build`, must use
   `--webpack`).
8. Update CLAUDE.md to mark Phase 4 complete with final numbers (item
   count/version, reference_v2 methodology, before/after mean-shift
   diagnostics, final calibration distributions, final max #1 match
   frequency, new test count, remaining open issues, next milestone).

**Do not start the Results UI (Phase 6) until Phase 4 is explicitly marked
complete.**
