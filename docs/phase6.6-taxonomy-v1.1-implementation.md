# Phase 6.6 — `taxonomy_v1.1` + Quiz v2 implementation report (CLOSED)

**Status: CLOSED.** All stages (1 through 10C, plus the Phase 6.6 closure
decision) done and verified. This document was updated as each stage
completed — it is not a retrospective written after the fact. See
CLAUDE.md "Phase 6.6 closure" for the durable closure summary and why
Phase 6.6 is now considered done; see "Phase 6.6 closure" at the end of
this document for this report's own record of the same reasoning.

---

## Stage 1 — Baseline (recorded before any change)

| | Value |
|---|---|
| Typecheck | Clean |
| Tests | 207/207 (10 files) |
| Roster | 35 people, 35/35 eligible |
| `TAXONOMY_VERSION` | `taxonomy_v1` (30 attributes, 6 facets) |
| `QUIZ_VERSION` | `quiz_v1` (56 items) |
| `REFERENCE_VERSION` | `reference_v2` |
| `DISPERSION_VERSION` | `dispersion_v1` |
| `MATCHING_VERSION` | `matching_v2` |
| `CALIBRATION_VERSION` | `calibration_v2` |
| `GREATNESS_SCORING_VERSION` | `greatness_v1` |
| Decisiveness signature-trait frequency | 19.1% (worst in taxonomy) |
| Collaboration one-sidedness | 82% |
| Max #1 match frequency (n=10,000) | 18.7% (Warren Buffett) |
| Production build | Clean, 81 routes |

## Stage 2 — `taxonomy_v1.1` implemented

Added `world_sense` facet; `opportunity_sensing`, `resourcefulness`,
`proactive_agency` (world_sense) and `belief_updating` (thinking) — all
`contextual`/`balanced` shape (none `higher_can_help`/`lower_can_help`,
per the non-checklist requirement). All 30 original attributes' id, facet,
`contributionShape`, and reference values locked unchanged by a new
regression test (`src/core/attributes/attributes.test.ts`, 12 tests). Also
updated: `FacetScores` type (+`world_sense`), `en`/`ko` attribute and facet
labels, `dispersion.generated.ts` (placeholder 1.0 for the 4 new
attributes — explicitly flagged, to be regenerated after Stage 5).
`TAXONOMY_VERSION` → `taxonomy_v1.1`, `REFERENCE_VERSION` → `reference_v3`
(initial values for the 4 new attributes: mean 50 / sd 18, a stated
assumption with zero real data, matching how `reference_v1` itself
originally launched — full reference methodology work is Stage 6, not
done yet).

## Stage 3 — Quiz v2 implemented from the approved 62-row specification

Rewrote `bank.ts` exactly per `docs/phase6.5b-taxonomy-quiz-design.md`'s
approved spec and its §24 decision-check addendum: 49 KEEP, 1 KEEP+REMAP
(q52), 3 REWRITE (q05, q15, q40), 3 REMOVE (q01, q27, q36), 9 NEW
(q57-q65) — 62 items. `QUIZ_VERSION` → `quiz_v2`. Version-mismatch
handling for old result tokens required zero code changes
(`decodeResultToken` already compares the token's embedded version
against `quiz.version` generically — old `quiz_v1` tokens now
automatically decode to `undefined`).

**Finding flagged, not silently patched**: removing `q27` (correctly
justified for 7 of the 8 attributes it touched) left `competitiveness`
with only 2 items, one (`q28`) holding 66.7% of its weight — breaching the
≤55%-single-item-share guard. Not fixed at this stage; carried into Stage
4's diagnostics and resolved at Stage 4.5 (below).

## Stage 4 — structural diagnostics, before any person was scored

**Decisiveness root-cause fix: confirmed working by simulation, not
assumed.**

| | Before | After (Stage 4, pre-4.5) |
|---|---|---|
| items / one-sided share | 6 / 45% | 6 / 40% |
| simMean / meanDiff | 67.0 / +17.0 | 56.9 / +6.9 |
| simSd/refSd ratio | 1.40 | 1.26 |
| **signature-trait frequency** | **19.1% (worst in taxonomy)** | **2.1%** |

**Serious empirical failure found and reported, per the explicit stop
rule** — implementation paused before Stage 5. Every new attribute
launched with 2 of its 3 items in choice/binary format (1 situational or
forced-choice anchor + 1 dedicated likert + 1 forced-choice trade-off).
"Bidirectional by construction" (both signs represented) is not the same
guarantee as "graded" — a binary choice still produces a bimodal score
distribution, the same Phase 2 "2a" mechanism that originally inflated
`intuitive_synthesis`/`autonomy_need`. Measured:

| Attribute | items | oneSided | simSd/refSd | signature-trait freq |
|---|---|---|---|---|
| `belief_updating` | 3 | 0% | 1.82 | 14.3% |
| `proactive_agency` | 3 | 34% | 1.66 | 12.5% |
| `opportunity_sensing` | 3 | 0% | 1.61 | 12.2% |
| `resourcefulness` | 3 | 34% | 1.72 | 9.8% |

Four of the taxonomy's six most overrepresented signature traits, all
four brand new. `belief_updating`'s 0% one-sidedness with the *highest*
ratio of the four is the clean proof this was a choice-format-bimodality
mechanism, not a one-sidedness mechanism — the two are independent
problems, and this migration had only guarded against the second one.

Also observed (structural, expected, resolves at Stage 5): the domination
simulation ran against only 31 of 35 people (`n=310000` not `350000`) —
Confucius and Ibn Khaldun stay eligible at 0 new attributes scored;
Socrates, Genghis Khan, Rumi, and Zheng He do not, exactly matching the
Phase 6.5B decision-check's earlier coverage projection.

---

## Stage 4.5 — measurement-repair gate

Full experimental method: an in-memory harness (never edited `bank.ts`
during experimentation — same discipline as `sensitivity.ts`'s `ablate`
mode) built alternative `Quiz` objects and re-ran the exact
`analyseCoverage`/`analyseDirectionBalance`/`simulateQuizProfile`/
`signatureTrait` pipeline `trait-diagnostic.ts` already uses, at n=8,000
per variant.

### A — four new traits: three alternatives simulated, not assumed

| | items | typemix | ratio range | sigFreq range | quiz length |
|---|---|---|---|---|---|
| **A (baseline/failure)** | 3 each | 1 likert + 2 choice | 1.61-1.82 | 9.8-14.3% | 62 |
| **B (same-count graded reallocation)** | 3 each | 2 likert + 1 choice | 1.42-1.55 | 5.1-7.1% | **62 (no change)** |
| **C (additive, +1 each)** | 4 each | 2 likert + 2 choice | 1.45-1.59 | 7.7-9.2% | 66 |

**B won outright, not merely "comparably" to C** — better on every
measured dimension despite fewer items, because it removes a source of
bimodal variance rather than diluting it. Implemented: `q58`, `q60`,
`q62`, `q65` converted from forced-choice trade-offs to dedicated graded
likert items (exact final text in `bank.ts`/`en.ts`). Fixing `q58` also
corrected a genuine sign bug found during the rebuild: the original gave
`opportunity_sensing` a *positive* score for "missing a shift because
absorbed", which is backwards.

### B — competitiveness: three repairs simulated

| | items | maxShare | oneSided | ratio | side effects on other attributes |
|---|---|---|---|---|---|
| current (failure) | 2 | 0.67 | 0% | 0.93 | — |
| **B1 (restore q27)** | 3 | 0.46 | 31% | 0.93 | **Reintroduces one-sidedness into 6 other attributes** — `achievement_drive`/`autonomy_need` go from a clean 0% to 22-29%; `mastery_orientation`/`deep_focus`/`leadership_drive`/`independent_thinking` all measurably worsen |
| **B2a (new graded, non-work "game/contest" context)** | 3 | 0.43 | 0% | **0.99** | **None measured** |
| B2b (new trade-off, external vs. internal standard) | 3 | 0.43 | 0% | 1.23 | None, but confirms choice-format bimodality a second time |

**B2a won clearly.** Implemented as `q66` ("A friendly game or contest
with people I know pulls a genuinely competitive streak out of me, even
when nothing real is at stake.") — fixes the target problem, introduces
no new one, and independently serves the "reduce work-framing
concentration" product goal (games/contests, not work). B3 (existing-item
remap) was evaluated and rejected: no existing item's semantics
independently justify a competitiveness loading without forcing one.

### C — impact_motivation / cross_domain_range: classified individually

- **`impact_motivation` — ACCEPT CURRENT COVERAGE.** Weakened to 2 items
  (maxShare 0.52, thin but under the 0.55 guard) by the same `q27`
  removal, but both items are already perfectly bidirectional graded
  likerts (0% one-sided) and signature-trait frequency (0.7-1.2%) sits at
  or below the uniform baseline. Restoring `q27` would fix the share
  number cosmetically while reintroducing one-sidedness, for no measured
  benefit. Not repaired.
- **`cross_domain_range` — REPAIR, confirmed effective.** Weakened to 2
  items by `q01`'s removal (one of them, `q09`, one-sided); became the
  single *worst* remaining signature-trait overrepresentation (10.9%)
  once the other four fixes suppressed their own distortion — suppressing
  bigger distortions mechanically raises the next-most-elevated
  attributes' relative win rate in `signatureTrait`'s one-winner
  selection. Restoring `q01` was evaluated and rejected: `q01`'s
  `cross_domain_range` effect was itself one-sided and same-signed as
  `q09`'s, so it would have diluted, not fixed, the mechanism. A new
  dedicated graded item (`q67`, a genuine breadth-vs-depth tension against
  `deep_focus`, matching the bank's existing `q47` trade-off pattern) was
  built and simulated instead:

| | items | oneSided | ratio | sigFreq |
|---|---|---|---|---|
| before | 2 | 50% | 1.51 | 9.3-10.9% |
| **+ q67** | 3 | 34% | 1.30 | 5.9% |

### D — reference_v3 not misused

No reference SD was changed to paper over any of the above. All fixes are
in the questionnaire measurement layer only, exactly as instructed.
`reference_v3`'s stated-assumption values (mean 50/sd 18 for all four new
attributes) are unchanged from Stage 2 — real reference methodology work
is still Stage 6, not started.

### E — selected repair, implemented

**Alternative B (new-trait graded reallocation, net item-count neutral)
+ B2a (competitiveness, +1 item) + the `cross_domain_range` repair (+1
item).** Net: 62 → **64 items**. No item removed by Stage 4.5; `q66` and
`q67` are the only additions. This is the smallest set of changes that
cleared every measured defect without leaving a demonstrated one
unaddressed — not chosen for a round number (64 was not a target; it's
what the evidence produced).

---

## Stage 4 — full rerun after repair (Section F)

**Test suite**: `tsc --noEmit` clean. `vitest run`: 216/220 passing.
**The `competitiveness` guard failure is gone.** The 4 remaining failures
are unchanged from before Stage 4.5 and are exactly the ones expected to
resolve once Stage 5 scores people (not new, not caused by Stage 4.5):

1. `matching.test.ts` — Marie Curie self-mirror similarity (she has no
   real score on the 4 new attributes yet).
2. `matching.test.ts` — "reports every facet for a full comparison"
   (`world_sense` facet is 0 for a person with no new-attribute scores).
3. `matching.test.ts` — Socrates fails eligibility (needs ≥1 new
   attribute scored, per the Phase 6.5B decision-check's own projection).
4. `greatness.test.ts` — a self-mirror ceiling test, same root cause as
   #1.

**Coverage guard** (`diagnose.ts`): **no attribute exceeds 0.55
max-single-item-share** — highest is `impact_motivation` at 0.52
(accepted, see above). All 34 attributes present, each with ≥2 items (all
but `impact_motivation` at ≥3). No missing trait, no accidental
duplicate.

**Full signature-trait frequency ranking** (n=5,000, `trait-diagnostic.
ts`, uniform = 2.9%):

| Rank | Attribute | sigFreq | ratio | Note |
|---|---|---|---|---|
| 1 | `collaboration` | 9.4% | 1.11 | **Pre-existing, untouched by Stage 4.5** — Phase 5 already audited this and found no downstream matching defect; its own ratio is essentially unchanged from every prior measurement (1.11-1.18 across this whole migration). Now the top-ranked overrepresentation only because five bigger distortions were fixed around it (a reshuffling effect in `signatureTrait`'s one-winner-per-profile selection, not a new defect). |
| 2 | `systems_abstraction` | 7.9% | 1.42 | Pre-existing, untouched; same reshuffling effect. |
| 3 | `planning_orientation` | 7.3% | 1.25 | Pre-existing, untouched; same reshuffling effect. |
| 4 | `opportunity_sensing` | 6.7% | 1.47 | New attribute, post-repair — no longer the standout defect. |
| 5 | `resourcefulness` | 6.3% | 1.48 | New attribute, post-repair. |
| 5 | `cross_domain_range` | 6.3% | 1.31 | Repaired this stage — down from 9.3-10.9%. |
| 7 | `proactive_agency` | 6.0% | 1.42 | New attribute, post-repair. |
| 8 | `execution_speed` | 5.8% | 1.01 | Pre-existing, unaffected. |
| 9 | `belief_updating` | 5.6% | 1.53 | New attribute, post-repair — down from 14.3%. |
| — | `decisiveness` | 2.7% | 1.25 | Root-cause fix holds. |
| — | `competitiveness` | 0.7% | 1.02 | Fixed this stage — was 0.3% at a 0.67 share violation; now healthy on every dimension. |
| — | `impact_motivation` | 1.2% | 1.10 | Accepted as-is. |

**Assessment against "no obvious measurement-induced overdispersion"**:
the four new attributes are no longer the taxonomy's standout defect —
all four now rank *below* three pre-existing, previously-unflagged
attributes (`collaboration`, `systems_abstraction`, `planning_
orientation`), and their ratios (1.31-1.53) sit in the same order of
magnitude as several long-accepted attributes elsewhere in the taxonomy
that were never independently flagged in Phase 0-5 (e.g. `curiosity`
1.10-1.19, `adaptability` 1.19-1.21, `intuitive_synthesis` 1.38-1.42).
This is judged a real, sufficient fix, not a residual "obvious" defect —
not chased further toward exact uniformity, per instruction ("the
objective is NOT to force every attribute to exactly the uniform 2.9%").
`collaboration`/`systems_abstraction`/`planning_orientation`'s rise is
pre-existing behavior becoming more visible, explicitly out of Stage
4.5's scope (collaboration in particular is already Phase-5-audited as
harmless), not a new problem this repair created — **not fixed here, not
hidden either**.

**Domination check** (`simulate.ts`, still against only 31/35 eligible
people — Stage 5 not yet run): Warren Buffett 17.4% (was 18.7%
pre-migration), no regression. `n=310000` confirms the same 4-person
eligibility gap the Phase 6.5B decision-check predicted, unrelated to
Stage 4.5 and expected to resolve at Stage 5.

**Hard requirements, verified**: no max-single-item-share >0.55 ✓; no
accidental missing trait (34/34 present) ✓; no new structural regression
(0 new test failures beyond the 4 already tracked as Stage-5-pending) ✓;
no guard silently weakened (no eligibility threshold, reference SD, or
test assertion was loosened to make a number pass) ✓.

---

## Stage 5 — evidence-first scoring of the four new attributes (IN PROGRESS)

**22 of 35 people scored (Batches 1-2 of 3). Batch 3 (13 people) and the
full-roster audits (evidence consistency, cross-era fairness, final
eligibility) are not yet done.** Every scored cell carries an inline
evidence rationale in `roster2.ts`/`seed.ts` next to the score itself, not
only in this document.

**Method, applied consistently across every person:** for each of the 4
new attributes, identify a specific, named biographical episode; classify
it as direct or indirect evidence; explicitly reject the trait if the
evidence only supports an *adjacent* already-scored construct
(`adaptability`, `analytical_rigor`, `cross_domain_range`, `leadership_
drive`, etc.) rather than the new one; leave missing rather than invent
when evidence is genuinely absent or contradictory. Two real-time
self-corrections, kept visible rather than smoothed over:

- **Zheng He's `resourcefulness`** — initially considered (~62,
  low confidence) on the strength of his fleets' logistics, then reversed:
  the treasure fleets were one of the best-funded state naval efforts in
  pre-modern history, the *opposite* of the resource constraint the trait
  requires. Left missing. The same well-resourced-not-resourceful
  distinction was then applied deliberately to Warren Buffett's adult
  career and Serena Williams's training background in Batch 2.
- **Nelson Mandela's `opportunity_sensing`** — drafted, then dropped: it
  drew on the same broad "transition to negotiated settlement" period as
  his scored `proactive_agency`, and on reflection didn't clear the
  episode-reuse bar (see below) cleanly enough to keep both.

### Batch 1 — the six eligibility-risk people

| Person | `opportunity_sensing` | `resourcefulness` | `proactive_agency` | `belief_updating` |
|---|---|---|---|---|
| Confucius | missing | missing | 72 / 0.55 | missing |
| Socrates | missing | missing | 82 / 0.60 | missing |
| Genghis Khan | 75 / 0.55 | missing | 90 / 0.62 | missing |
| **Zheng He** | missing | missing | missing | missing |
| Rumi | missing | missing | 68 / 0.52 | 75 / 0.55 |
| Ibn Khaldun | 88 / 0.65 | 78 / 0.58 | 80 / 0.60 | missing |

**Eligibility, run against the real production function:**

| Person | scoredAttrs | avgConf | coverage | Eligible |
|---|---|---|---|---|
| Ibn Khaldun | 23 | 0.595 | 0.691 | yes, safe |
| Genghis Khan | 22 | 0.618 | 0.650 | yes, safe |
| Confucius | 21 | 0.573 | 0.631 | yes |
| Socrates | 21 | 0.560 | 0.628 | yes |
| Rumi | 21 | 0.563 | 0.620 | yes, thinnest margin |
| **Zheng He** | 18 | 0.587 | **0.534** | **NO — fails coverage only** |

Zheng He's ineligibility is a real migration result, not engineered
around: no score was manufactured, no threshold was touched, and the
eligibility function was run unmodified after scoring was already
complete.

**Re-audit flags carried forward from Batch 1, explicitly not resolved by
editing scores** (per instruction — re-examined, not changed without new
evidence):
- **Rumi**: `proactive_agency` and `belief_updating` both trace to the
  Shams-e Tabribi transformation. On re-examination the two rest on
  distinct observable facts (the behavioral act of abandoning his
  jurist role vs. the textually-attested content of what changed in his
  worldview) — kept, but flagged for the final evidence-consistency audit
  rather than declared fully resolved.
- **Ibn Khaldun**: Qalat Ibn Salama re-examined for whether it supports
  resourcefulness-under-constraint or merely withdrawal-for-focus. The
  sharper framing (writing a major work without his usual reference
  libraries/scholarly network, relying on memory and synthesis) is a more
  specific resourcefulness case than the original inline comment's
  "isolation and reduced material circumstances" phrasing — score kept,
  rationale sharpened at the final audit, not now.
- **Genghis Khan**: `opportunity_sensing` vs. already-scored `adaptability`
  re-examined. The distinction (anticipatory alliance-reading before
  committing, vs. adjusting an already-chosen course) is judged to hold,
  but acknowledged as a genuinely close boundary case.

### Batch 2 — 16 evidence-rich people

Leonardo da Vinci, Marie Curie, Richard Feynman, Ada Lovelace, Steve Jobs,
Hayao Miyazaki, Yi Sun-sin, Frida Kahlo, Alan Turing, Serena Williams,
Nelson Mandela, Mahatma Gandhi, Warren Buffett, Rosalind Franklin, Jane
Goodall, Benjamin Franklin.

Full per-person evidence rationale is inline in `seed.ts`/`roster2.ts`.
Highlights: Yi Sun-sin (own war diary) and Benjamin Franklin (own
Autobiography) scored all 4 with strong, cleanly-separated episodes.
Rosalind Franklin and Serena Williams scored only 1 of 4 each, at modest
confidence — not because they lack these traits, but because their
documented public record concentrates on technical execution and athletic
competition respectively, not the specific behaviors these constructs
need (flagged for the cross-era/source-type fairness audit — this is not
only an ancient/medieval-sourcing problem).

### Interim coverage and eligibility (22 of 35 scored; work in progress, not final)

| Trait | scored | missing | mean score | sd | mean confidence |
|---|---|---|---|---|---|
| `opportunity_sensing` | 10 | 25 | 81.3 | 7.6 | 0.660 |
| `resourcefulness` | 7 | 28 | 81.4 | 7.1 | 0.683 |
| `proactive_agency` | 20 | 15 | 76.8 | 8.1 | 0.621 |
| `belief_updating` | 7 | 28 | 71.9 | 7.8 | 0.586 |

Eligibility so far: **34/35 eligible, only Zheng He ineligible** — no
other person is close to the coverage floor at this point (all remaining
unscored people already have full/near-full original-30 coverage).

**Missing-not-at-random finding — flagged prominently, not buried, per
instruction:** every scored cell across both batches falls in the 60-92
range. **No person has been scored low on any new trait yet.** This
matches the exact risk pattern the brief warned about ("scoreable"
correlating with "high score") and is an active, confirmed pattern
requiring deliberate correction in Batch 3 — not resolved by assigning
low/neutral scores without evidence, but by actively looking for cases
where the evidence itself supports a low reading (reactive rather than
proactive, change-resistant rather than belief-updating, oblivious rather
than opportunity-sensing) and being willing to score them, rather than
defaulting to "missing" whenever evidence trends low. Carried forward as
the top-priority watch item for Batch 3.

### Scoring-symmetry audit (2026-08) — protocol revised before Batch 3

A dedicated audit (full record in session transcript) checked whether the
scoring process itself was structurally biased toward high scores, given
that all 91 cells scored across Batches 1-2 fell in the 60-92 range with
zero scores below 60.

**Finding: the protocol needed revision.** Reviewing prior rationale
found two cases where low-direction evidence had *already been written
down* and misfiled as "missing" rather than scored (Leonardo da Vinci's
and Steve Jobs's `resourcefulness`, both flagged from an inline comment
that already said the evidence "cuts against" a high score). A stricter
three-part test was then applied to re-resolve all four flagged cases —
and correctly rejected two of the four candidates it had itself
surfaced, which is the point of a real test rather than a rubber stamp:

1. **Leonardo da Vinci, `resourcefulness`** — re-tested against: (a)
   genuine resource constraint, (b) a viable substitute existed, (c) he
   demonstrably refused/failed to adapt. The Gran Cavallo abandonment
   (bronze diverted to cannons, then the Sforza regime's political
   collapse) fails (c) — no evidence a viable alternative existed that he
   declined to pursue; the unfinished paintings pattern is better
   explained by perfectionism/changing interests/patron conflict, exactly
   the confounds the test is designed to exclude. **Remains missing.**
2. **Steve Jobs, `resourcefulness`** — same test. The material-
   specification insistence (e.g. glass over an already-viable plastic
   screen) fails (a): there was no resource constraint, he *upgraded* a
   working spec, which is quality standards/aesthetic sensitivity, not
   resourcefulness's low pole. His one genuine constraint episode
   (Apple 1997, ~90 days from bankruptcy) shows aggressive successful
   adaptation, which cuts toward *high*, not low. **Remains missing.**
3. **Warren Buffett, `opportunity_sensing`** — **revised from 92 (d, A) to
   60 (s, D)**, a genuine mixed-evidence re-score, not an average. HIGH
   evidence (spotting mispriced value within his analytical frame) and LOW
   evidence (his own repeated, explicit acknowledgment of a decades-long,
   consequential failure to sense the technology shift, not corrected
   until IBM 2011/Apple 2016) are both strong and well-documented. Read on
   the construct's *broad* definition (general environmental scanning,
   not "skill within a self-chosen niche") as instructed, the self-
   admitted broad-scope failure outweighs the narrow-frame skill —
   his own "circle of competence" doctrine is itself a stated policy of
   *not* scanning broadly, close to the opposite of what this attribute
   measures. Marked dual-edged: the same discipline that caused the miss
   also protected him from the dot-com crash. **The internal substructure
   this case exposes (frame-bound pattern-recognition vs. broad
   environmental scanning) is flagged as a candidate question for a
   future taxonomy audit — not actioned now, per instruction not to split
   the attribute in this phase.**
4. **Ibn Khaldun, `resourcefulness`** — **removed** (was 78, s, A).
   Re-opened against the two-part test (actual constraint AND documented
   substitution). The Qalat Ibn Salama episode gives only "withdrew" and
   "wrote a major work there" — reliance on memory rather than his usual
   library access is a plausible inference about method, not a
   specifically documented act of substitution, and is at least as well
   explained by his already-scored `deep_focus`/`discipline`/
   `independent_thinking`. Not retained to preserve coverage: re-run
   eligibility confirms he stays comfortably eligible without it
   (coverage 0.661, was 0.691).

**The revised, locked protocol for all remaining Stage 5 work** (Batch 3
and any future revisits):

For every Person × New-Trait cell, before recording a result:
1. Look for affirmative HIGH-direction evidence (a specific, attributable
   episode matching the attribute's high pole).
2. Look for affirmative LOW-direction evidence (a specific, attributable
   episode matching the attribute's low pole — not merely the absence of
   #1).
3. If neither clears the bar, record missing.

**Absence of high evidence must never be converted into a low score.**
Equally, evidence that merely *fails to justify* a high score must not be
defaulted to missing without first checking whether it independently
justifies a low one (the specific error the audit found and corrected).
Do not search specifically for "negative stories" — search for behavior
relevant to both poles of the construct, in that order, for every cell.
No target distribution is being pursued in either direction: a 70+ mean
remains acceptable if evidence supports it; a low score is acceptable
where affirmative low-pole evidence exists; missing is acceptable, and
expected to remain the majority outcome, when neither direction is
knowable.

### Batch 3 — final 13 people, under the revised symmetric protocol

Mozart, Beethoven, Coco Chanel, Nikola Tesla, Wangari Maathai, Malala
Yousafzai, Bruce Lee, Srinivasa Ramanujan, Toni Morrison, Akira Kurosawa,
Oprah Winfrey, Simone Biles, Yayoi Kusama. Full evidence rationale inline
in `roster2.ts`. Every missing cell was checked against both poles before
being left missing, per the locked protocol — not defaulted from absence
of high evidence alone. Two clean null results worth naming explicitly
(not a failure to search, a real outcome): **Akira Kurosawa scored 0 of 4**
after his 1970s career crisis and famously exacting production demands
were both explicitly tested and rejected (external rescue and
already-scored perfectionism respectively, not resourcefulness); several
low-confidence candidates (Toni Morrison's early-writing constraints,
Nikola Tesla's late-career resourcefulness in either direction) were
weighed and left missing because the record doesn't cleanly separate the
construct from an adjacent one or from circumstance.

## Stage 5 final audit (all 35 people processed)

### Coverage per new trait, final

| Trait | scored | missing | min | max | mean | median | count <60 | impact split |
|---|---|---|---|---|---|---|---|---|
| `opportunity_sensing` | 14 | 21 | 60 | 90 | 77.2 | 78 | 0 | 13 advantage, 1 dual-edged |
| `resourcefulness` | 10 | 25 | 72 | 92 | 80.9 | 80 | 0 | 10 advantage |
| `proactive_agency` | 32 | 3 | 62 | 90 | 75.2 | 75 | 0 | 15 advantage, 12 dual-edged, 5 neutral |
| `belief_updating` | 7 | 28 | 60 | 85 | 71.9 | 72 | 0 | 5 advantage, 2 neutral |

**Per-person new-trait coverage**: 2 people scored 0 (Zheng He, Akira
Kurosawa), 13 scored 1, 11 scored 2, 8 scored 3, 1 scored all 4
(Benjamin Franklin).

### Do low-direction scores occur naturally under the symmetric protocol? Direct answer: barely, and that itself is a finding, not a failure.

**One.** Warren Buffett's `opportunity_sensing`, revised to 60 from 92
during the case-resolution pass. No cell in Batches 1-3 combined (91 + 33
= 124 total scored-or-considered cells across all three batches) produced
a second qualifying low score under the strict three-part test, despite
the protocol being applied deliberately and specifically to every missing
cell in Batch 3, not retrofitted after the fact.

**This is reported honestly, not smoothed into a bigger number.** Two
explanations were tested against each other, per the earlier audit's own
framework, and both hold:
- **Legitimate roster effect (real, not manufactured):** the same
  extraordinary-achievement selection bias already named in the symmetry
  audit continues to operate. Rejected candidates for da Vinci, Jobs,
  Ibn Khaldun, Kurosawa, Toni Morrison, and Nikola Tesla in this batch
  confirm the *process* is not the bottleneck for those specific
  cases — the evidence genuinely doesn't clear the low-pole bar for them,
  checked explicitly, not merely unsearched.
- **Residual conservatism, named rather than hidden:** Buffett's one
  confirmed low-direction case landed exactly at 60 — the boundary of the
  "no score below 60" pattern that triggered this whole audit, not below
  it. Reviewing my own reasoning for that case: I described the
  broad-construct failure as outweighing the narrow-frame skill "enough
  to move the score substantially... not merely trim it," which argues
  for a number noticeably below neutral (the failure is the dominant,
  broadly-defined signal), yet the implemented value sits at the same
  floor as the pattern being audited. **This is flagged honestly as a
  possible residual conservative bias in my own resolution, not
  re-litigated or changed unilaterally here** since the 60 value was
  already implemented per explicit prior direction — surfaced for
  deliberate review, not smoothed over.

### Episode-reuse audit

22 of 35 people were scored on 2+ new traits. Reviewed every one for
whether distinct traits trace to genuinely distinct observable facts (not
"dramatic episode → several highs"). Clean in the large majority
(da Vinci, Marie Curie, Steve Jobs, Yi Sun-sin, Frida Kahlo, Mahatma
Gandhi, Warren Buffett, Jane Goodall, Benjamin Franklin, Wangari Maathai,
Beethoven, Bruce Lee, Ramanujan, Oprah Winfrey — each trait maps to a
separately identifiable episode). Three cases remain genuinely close,
already flagged, re-examined, and held rather than declared fully
resolved:
- **Rumi** (`proactive_agency`/`belief_updating`, both from the Shams
  transformation) — distinct behavioral-act vs. content-of-change facts,
  held on two separate re-examinations.
- **Nelson Mandela** (`resourcefulness`/`proactive_agency`/
  `belief_updating`) — a 4th candidate (`opportunity_sensing`) was
  proactively dropped specifically because it clustered too closely with
  the others' shared "transition to negotiation" period; the three kept
  span two genuinely separate life periods (Robben Island education vs.
  the negotiation-era acts).
- **Yayoi Kusama** (`resourcefulness`/`proactive_agency`, both tied to
  her move to the US) — split on a temporal/factual distinction (the
  decision-and-act of moving vs. surviving after arrival) that holds but
  is closer than most.

### Construct-leakage check (the four named risks)

- **"High `proactive_agency` does not simply mean leader"** — holds.
  Srinivasa Ramanujan scores high `proactive_agency` (78) with very low
  `leadership_drive` (25) — agency without any desire to lead anyone.
  Zheng He has high `leadership_drive` (85) but missing `proactive_agency`
  — a strong leader whose agency specifically isn't documented because his
  role was commanded. No systematic correlation found across the 32
  scored cells.
- **"High `opportunity_sensing` does not simply mean innovator"** — holds.
  Warren Buffett scores low `creative_originality` (45) but moderate
  `opportunity_sensing` (60, post-revision) — the two move independently,
  not in lockstep with general originality.
- **"High `resourcefulness` does not simply mean experienced hardship"**
  — holds, and actively defended: candidates that were essentially
  "documented hardship" without a documented substitution act (Gandhi's
  and Socrates's asceticism, Zheng He's fleets, Kurosawa's career crisis)
  were specifically tested and rejected across all three batches, not
  waved through.
- **"High `belief_updating` does not simply mean changed career"** —
  mostly holds. Six of seven scored cells are rooted in a specific,
  articulated content-of-belief change (da Vinci's redrawn anatomical
  studies, Gandhi's caste-view evolution, Mandela's and Franklin's
  explicit principle reversals, Jobs's and Buffett's self-articulated
  investment/product reversals) rather than merely a career or
  circumstance change. Rumi's is the one case closest to the named risk
  (a career change accompanies the belief change) — already flagged
  above, held on the strength of the textually-attested content of the
  change itself, not the career change alone.

### Cross-era fairness audit

By raw new-trait coverage, historical figures (born before 1900, n=17)
average **1.88** scored cells per person; modern figures (born 1900+,
n=18) average **1.72** — historical figures are *not* systematically
worse covered in aggregate once early-modern and 19th-century figures
(da Vinci, Franklin, Curie, Ada Lovelace) are included alongside the
ancient/medieval cohort. **The real disadvantage is source-type, not
chronological era** — confirmed a second time, independently of the
Phase 6.5B decision-check's original finding: the worst-covered people in
the entire roster are Zheng He (0, administrative/court records), Akira
Kurosawa (0, a well-documented modern figure whose record simply doesn't
speak to these four constructs), Rosalind Franklin (1, technical-
execution-focused biography), Toni Morrison (1, thin on this specific
axis despite being otherwise well documented), and Serena Williams (1,
athletic-competition-focused biography) — three of these five are
modern. Confucius (1) and Socrates (1) are the only ancient figures at
the bottom of this list; Ibn Khaldun (2, after the resourcefulness
removal), Genghis Khan (2), and Rumi (2) are solidly mid-pack alongside
many modern figures. This is not hidden or engineered around: it is an
acceptable-uncertainty pattern (the record genuinely doesn't speak to
these constructs for these specific people, for a reason distributed
across eras, not concentrated in one), not a systematic taxonomy bias
requiring a threshold change.

### Final Stage 5 eligibility

Run against the real, unmodified production function, all 35 people,
after all scoring was complete:

**34/35 eligible. One ineligible: Zheng He** (scoredAttributes=18,
averageConfidence=0.587, coverage=0.534 — fails the coverage rule only).
Compared to `taxonomy_v1`'s 35/35 baseline, this is the one real change,
and it is accepted as a genuine migration result: no score was
manufactured for him at any point across all three batches (his
`resourcefulness` candidate was specifically considered and rejected in
the very first scoring pass, for the correct reason, not a convenient
one), and `ELIGIBILITY.minCoverage` was not touched.

### Regression verification

`tsc --noEmit`: clean. `vitest run`: **220/220 passing** (up from
207 baseline + 13 new taxonomy/protocol tests). Two tests updated to
reflect confirmed, evidence-based Stage 5 outcomes, not to weaken a
guard:
- `"scores an identical vector at the top of the scale"` now uses
  Benjamin Franklin (the one seed profile with complete 34/34 coverage)
  instead of Marie Curie (32/34 — 2 of her 4 new attributes are genuinely
  unscored, not invented to keep the test on the same person).
- `"marks every seed profile eligible"` renamed and updated to assert
  34/35 eligible with Zheng He the sole, named exception, with inline
  documentation of why.

## Stage 6 — `reference_v3` methodology review (COMPLETE)

**Purpose:** decide whether `reference_v3`'s values — the 30 original
attributes (inherited unchanged from `reference_v2`) and the 4 new
attributes (Stage 2's stated-assumption 50/18 placeholder) — need any
numeric revision now that Stage 5 has scored real people and quiz_v2 (64
items) is stable. **Outcome: no numeric revision. Every value is
unchanged.** This section documents why, so the review itself is on
record rather than silently assumed.

### Reference vs. dispersion — kept separate, per instruction

Two genuinely different per-attribute numbers exist in this codebase and
must not be conflated:

- **Reference (`ATTRIBUTES[id].reference: {mean, sd}`, `reference_v3`)** —
  a stated modelling assumption used ONLY as a z-scoring yardstick for
  distinctiveness. Consumers, confirmed by reading every call site:
  `distinctiveTraits`/`signatureTrait` (`src/core/interpretation/
  rules.ts`) — a user's Signature Trait and the ranked list `advantageTraits`/
  dual-edged selection draw from; `traitConstellation`
  (`src/core/interpretation/constellation.ts`) — the 8-12 traits shown on a
  person page; `distinctiveness()`, the D component of Greatness Potential
  (`src/core/greatness/greatness.ts`). Also read by dev-only tooling
  (`trait-diagnostic.ts`, and `simulate.ts`'s `vector` fabrication mode —
  NOT its `quiz` mode, which generates latent traits independently of
  `reference` and only converges on it downstream through `scoreQuiz`).
  **`matching_v2` (`similarity.ts`) does not read `reference` at all** —
  confirmed by grep, zero matches in `src/core/matching`. Level/scatter/
  pattern are computed from each side's own actual scores, not z-scored
  against any population assumption.
- **Dispersion (`DISPERSION_TABLE`, `dispersion_v1`,
  `dispersion.generated.ts`)** — a completely different number: real
  sample standard deviation computed FROM the 35-person seed dataset's
  actual scores, used only as `matching_v2`'s discriminative weight. It is
  NOT a modelling assumption and has NOTHING to do with `reference`. The 4
  new attributes' dispersion entries are still the Stage-2 neutral
  placeholder (1.0, explicitly flagged in the file), stale now that Stage 5
  scored real people — **this is Stage 7's job, not touched here**, per
  the explicit instruction to stop after Stage 6.
- One more indirect link, named for completeness: `calibration_v2`'s
  anchor tables are fit against the *simulated* match/Greatness raw
  distribution, and Greatness's raw score includes the D component above —
  so `reference` values indirectly shape what the calibration curve is
  fitted against, without `calibration.ts` itself ever reading
  `ATTRIBUTES[id].reference` directly. Not touched this stage (calibration
  wasn't re-fit; no reference value changed, so there is nothing new for
  it to be re-fit against).
- **A pre-existing UI wording tension, observed not created this stage,
  named for the record:** `results.signature_trait.explain`
  (`app/[locale]/results/page.tsx`, both `en.ts`/`ko.ts`) tells the user
  "Most people land closer to {refMean} here" — phrasing that reads as a
  population-norm claim even though `reference` is explicitly a stated
  assumption, not measured population data. This predates Stage 6 (Phase
  6 copy) and is out of scope to fix here (no UI changes this stage per
  instruction) — flagged so a future copy pass knows it exists.

### Evidence-bar methodology, applied fresh

`reference_v2`'s own precedent (see the `attributes.ts` header, "WHY
reference_v2 KEEPS reference_v1's NUMBERS UNCHANGED") set the actual test
for "the reference was wrong" as opposed to "the instrument was still
asymmetric when we measured it": an attribute's `oneSidedShare` must drop
below roughly 20% (clean measurement) AND a `meanDiff` must still persist
at that point (a real, not instrument-caused, gap). Ran
`trait-diagnostic.ts` (n=5,000) against the live 64-item `quiz_v2` /
34-attribute `taxonomy_v1.1`, cross-checked at n=10,000 via `simulate.ts
quiz`. **The four new attributes' full row, both runs agreed to within
simulation noise:**

| Attribute | items | refMean | simMean | meanDiff | refSd | simSd | ratio | oneSided | sigFreq |
|---|---|---|---|---|---|---|---|---|---|
| `opportunity_sensing` | 3 | 50.0 | 54.8 | +4.8 | 18.0 | 26.4 | 1.47 | 0% | 6.7% |
| `resourcefulness` | 3 | 50.0 | 54.8 | +4.8 | 18.0 | 26.6 | 1.48 | 34% | 6.3% |
| `proactive_agency` | 3 | 50.0 | 55.5 | +5.5 | 18.0 | 25.5 | 1.42 | 34% | 6.0% |
| `belief_updating` | 3 | 50.0 | 51.7 | +1.7 | 18.0 | 27.6 | 1.53 | 0% | 5.6% |

**Applying the test:** `opportunity_sensing` and `belief_updating` now
measure cleanly (0% one-sided — as clean as the bank's historically
cleanest attributes, `creative_originality`/`conflict_tolerance`), but
their `meanDiff` is small (+4.8, +1.7) — exactly the pattern the
reference_v2 precedent calls "healthy": a clean instrument confirming the
assumed mean was already close to right, not falsifying it.
`resourcefulness` and `proactive_agency` remain 34% one-sided — under the
same unresolved instrument-asymmetry mechanism CLAUDE.md's "Known open
issues" #2b already tracks for `collaboration` (75%, still the bank's
worst) and several other pre-existing attributes — not clean enough to
trust a mean correction in either direction. **No attribute among the
original 30 changed conclusion either**: re-running the full 34-row table
found several original attributes newly crossed under the ~20%
one-sidedness bar since `quiz_v2`/Stage 4.5 (`intuitive_synthesis`,
`autonomy_need`, `achievement_drive`, `impact_motivation`, `competitiveness`
all now measure at 0% one-sided, up from higher figures pre-migration) —
and every one of them shows a small residual `meanDiff` (+3.5, +3.8, -1.2,
-0.3, +0.7), the same "instrument got cleaner, assumed mean holds up"
result. **Zero attributes, old or new, clear the full bar for a value
change.** Full 34-row table is reproducible via `pnpm exec tsx
src/dev/trait-diagnostic.ts` (not pasted in full here — see that tool's
live output, which is the primary source of truth per this project's own
convention).

### A second, separate finding: variance ratio, explicitly NOT acted on

All four new attributes carry the highest `simSd`/`refSd` ratios in the
entire 34-attribute bank (1.41-1.53) — mechanically distinct from the
mean-side test above (`belief_updating` is 0% one-sided yet still has the
single highest ratio in the bank, proof the two are independent
phenomena, same logical structure as the `belief_updating` finding at
Stage 4). **Per explicit instruction, this was NOT treated as license to
inflate `sd`** — doing so would launder residual quiz-item variance
(plausibly choice-format quantization or a genuinely wide latent
distribution for these constructs) into the reference table, the exact
trap `reference_v2` was created to avoid on the mean side. Recorded as a
new, distinct, honestly-named open item (CLAUDE.md "Known open issues") —
a questionnaire-measurement question for a future quiz round, not a
reference-methodology question, and not actioned this stage.

### Decision: Option A — preserve, do not launder, do not invent precision

**Chosen methodology: preserve `reference_v2`'s values for all 30 original
attributes (already true, locked by a regression test in
`attributes.test.ts`, reconfirmed unmodified this stage) and retain the
explicit neutral provisional anchors (mean 50 / sd 18) for the four new
attributes.** Explicitly rejected, per the brief's own constraints and
this project's established discipline:
- **Using the 35 extraordinary people's trait scores/spread as a
  population reference** — they are a curated, non-representative,
  achievement-selected roster (`inclusion_v1`), not a sample of any general
  population; nothing in `reference` may be derived from them.
- **Replacing reference means with simulated `quiz_v2` output** — that
  distribution measures the INSTRUMENT (documented at length in
  `attributes.ts`'s own header since Phase 4), not a population; doing so
  for the 4 new attributes specifically would be a bigger version of
  exactly the mistake `reference_v2` already refused to make for the
  original 30.
- **Inflating `sd` to make the ratio diagnostic look better** — see above.
- **Real empirical population data** would be needed to move past a
  stated-assumption reference for good — none exists yet; a future
  `reference_v4` (or later) built from anonymised aggregate quiz-response
  data, once a real user base exists, is the honest path forward, not
  something achievable from this dataset. This is stated explicitly, not
  implied.

**Versioning: `REFERENCE_VERSION` stays `reference_v3` — not bumped.**
Unlike the `reference_v1` -> `reference_v2` bump (which also changed zero
numeric values, but marked the FIRST time those values were exposed to
real diagnostic scrutiny), `reference_v3` was already explicitly flagged
at Stage 2 as pending this exact review ("full reference methodology work
is Stage 6, not done yet") — Stage 6 completing that pending, promised
review is the intended lifecycle of the `reference_v3` label itself, not
a new event deserving its own version string. The full evidence-bar
review is now recorded in `attributes.ts`'s header comment (the codebase's
own "primary source of truth" convention) and here. A version bump remains
reserved, per this project's convention, for when the underlying data
actually changes.

### What reference_v3 IS and IS NOT, stated plainly

**IS:** a stated, versioned modelling assumption, reviewed twice now
(Phase 4's original reference_v2 review, and this Stage 6 review) against
the best available diagnostic evidence, used only as an internal z-scoring
yardstick for distinctiveness (signature trait, trait constellation,
Greatness's D component). **IS NOT:** a normed general-population study,
a claim about how "most people" actually score (notwithstanding the
results-page copy's current wording, flagged above as a pre-existing
tension), a derivation from the 35 seed people, or a derivation from
simulated quiz output. If real anonymised aggregate user data becomes
available in a future phase, a `reference_v4` built from it would be a
categorically different — and stronger — kind of reference than anything
this project has had so far.

### Coverage context carried forward (unchanged by Stage 6, restated for
the matching-sensitivity audits Stage 7+ will need)

`opportunity_sensing` 14/35 scored, `resourcefulness` 10/35,
`proactive_agency` 32/35, `belief_updating` 7/35 (Stage 5 final figures).
This uneven coverage matters for how much weight the reference — and,
downstream, the still-placeholder dispersion table — can actually carry
for these four attributes in practice: `proactive_agency` behaves like a
normally-measured attribute for most people, while `belief_updating`'s
7-person evidence base means its z-scored distinctiveness is rarely even
computed against real person data at all (mostly a live-quiz-taker
phenomenon). Not actioned this stage; flagged for Stage 7's dispersion
regeneration and any future matching-sensitivity re-audit to have this
context on hand without re-deriving it.

### Verification

`tsc --noEmit`: clean. `vitest run`: 220/220 (unchanged — Stage 6 made no
functional code change, only comments and two doc-consistency fixes in
`constellation.ts` updating a stale `reference_v2` comment reference to
`reference_v3`; `attributes.test.ts`'s locked-values test, which would
catch any accidental numeric drift, still passes against the same 30
values). `trait-diagnostic.ts` and `simulate.ts 10000 quiz` both re-run
clean, byte-identical in shape to their Stage 4/4.5 figures (no drift,
confirming determinism: same quiz, same reference, same seeded PRNG).
Domination check, run as a read-only side effect of this stage's
diagnostics (not a Stage 6 deliverable — dispersion/calibration are
explicitly Stage 7+, not re-fit here): Warren Buffett 16.8% at n=10,000
against the full 34/35-eligible roster (Zheng He excluded, as established
at Stage 5) — under the 20%-at-n≥30 threshold, no regression.

### Answer to "is a serious measurement defect reopening Stage 4 required?"

**No.** The four new attributes' signature-trait frequencies (6.0-6.7%)
remain below three pre-existing, previously-unflagged attributes
(`collaboration` 9.4%, `systems_abstraction` 7.9%, `planning_orientation`
7.3%) — the exact conclusion Stage 4.5 reached, now reconfirmed unchanged
since nothing about the quiz or the reference moved between Stage 4.5 and
Stage 6. The variance-ratio finding above is real and newly named, but it
is a candidate for a FUTURE quiz-measurement round (not this stage, not
reference methodology), tracked honestly rather than hidden, consistent
with how `collaboration`'s one-sidedness has been tracked-but-not-yet-
fixed since Phase 4.

### Is Stage 7 (dispersion regeneration + matching revalidation) safe to
begin?

**Yes.** Stage 6 found no defect that would change Stage 5's person data,
Stage 4's quiz bank, or any `reference` value — Stage 7 can proceed
against exactly the inputs it already expected (34-attribute taxonomy,
64-item quiz_v2, all 35 people scored, `reference_v3` unchanged). The only
carry-forward items for Stage 7 to pick up, both already flagged rather
than newly discovered: (1) regenerate the four new attributes'
`dispersion.generated.ts` placeholder (1.0) from real Stage-5 person data,
per that file's own inline flag; (2) the variance-ratio finding above is
NOT a Stage 7 blocker (Stage 7 is dispersion/matching, not quiz/reference)
but is worth keeping in view if a future quiz round revisits the new
attributes' item mix.

---

## Stage 7 — dispersion regeneration + full matching_v2 revalidation (COMPLETE)

**Approved after Stage 6.** Regenerated `dispersion.generated.ts` for the
34-trait `taxonomy_v1.1` and re-validated `matching_v2` end-to-end against
`quiz_v2` (64 items). **`matching_v2` itself was not modified** — every
stage below either confirmed an existing invariant still holds or produced
diagnostic evidence with no demonstrated causal failure. New, reusable dev
tooling committed alongside `simulate.ts`/`calibrate.ts`/`sensitivity.ts`,
same convention as Phase 5: `src/dev/dispersion-audit.ts` (Stage 7B) and
`src/dev/stage7-diagnostics.ts` (`baseline`/`coverage`/`newtrait`/`ablate`
modes, Stages 7D-7F).

### 7A — dispersion semantics, reconstructed

Read `dispersion.ts`, `calibrate.ts`'s `attributeDispersion()`, and
`similarity.ts` directly (not assumed from memory). Two genuinely different
per-attribute numbers exist and must not be conflated:

- **Reference** (`reference_v3`) — a stated modelling assumption, used only
  as a z-scoring yardstick for distinctiveness (signature trait, trait
  constellation, Greatness's D component). See Stage 6.
- **Dispersion** (`dispersion_v1`) — a completely different number: the
  Bessel-corrected (n-1) sample standard deviation of a trait's score
  **across match-eligible seed people** (34, Zheng He excluded), computed
  by `calibrate.ts`. Missing person-trait cells are dropped from that
  attribute's value list entirely (list-wise exclusion — never imputed as
  50 or anything else). If fewer than 2 people have the trait scored, it's
  set to 0, which `writeDispersion()` then substitutes with `meanSd`
  (neutral weight ≈1.0) rather than leaving it at 0. Transformed via
  `discriminative_i = clamp((1-λ)+λ·sd_i/meanSd, [0.55, 1.6])`, λ=0.5 — a
  linear blend toward the mean, clamped, **not** a sample-size-aware
  shrinkage estimator (no explicit n-based reliability weighting exists in
  the current formula).
- **Where dispersion enters `matching_v2`**: `buildTerms()` computes
  `weight = baseWeight × discriminativeWeight(attributeId) × personConfidence
  × userConfidence`, which then drives level, scatter, AND pattern
  identically (all three components use the same weighted terms). **High
  dispersion** → that attribute counts more toward distance (the dataset
  varies on it, so it discriminates people). **Low dispersion** → it counts
  less (nearly everyone alike on it, so differences on it barely move the
  similarity score). Cleanly separate from **coverage shrinkage**
  (`applyCoverageShrinkage`), which uses raw `baseWeight` only (never
  `discriminativeWeight`) as its denominator — confirmed by reading the
  code, not assumed.

### 7B — estimator reliability at sparse n (`src/dev/dispersion-audit.ts`)

Reproduced `calibrate.ts`'s exact computation read-only (never writes),
plus a leave-one-out (LOO) resampling check per new attribute — the direct
answer to "does a 7-person SD deserve the same epistemic confidence as a
32-person one" without assuming either way.

**Finding: no instability evidence.** All four new attributes' proposed
weights (0.795-0.834) land well inside the `[0.55, 1.6]` clamp — nowhere
near either bound, unremarkable/mid-range values. LOO spread is modest and
scales sensibly with n: `proactive_agency` (n=32) `[0.780, 0.800]`
(spread 0.02), `opportunity_sensing` (n=14) `[0.783, 0.848]` (spread
0.065), `resourcefulness` (n=10) `[0.769, 0.813]` (spread 0.045),
`belief_updating` (n=7, the sparsest) `[0.761, 0.861]` (spread 0.10 — the
widest, as expected, but still only ~9.5% of the clamp's total width, and
a single dropped person never swung the weight anywhere near the clamp
bounds). Mean/sd stay in a tight band (mean 72-81, sd 7.1-8.5) regardless
of n=7 vs n=32 — no sample-size-driven erraticism. `dispersion_v1` has no
explicit shrinkage mechanism beyond the "<2 values → neutral" gate, and
**none was needed here — the existing methodology was preserved
unchanged**, per instruction not to redesign merely because n looks small.

### 7C — dispersion regenerated (`dispersion_v1`, version unchanged)

Ran `pnpm exec tsx src/dev/calibrate.ts quiz` twice (writes, then reports
percentiles with the new table in effect — the documented two-pass
workflow). **Version stays `dispersion_v1`**: the generation *method*
didn't change (confirmed safe at 7B), only the *data* did — consistent
with how every prior dataset change (Phase 2, 4, 5) regenerated this same
table without a version bump; a bump is reserved for a formula change.

**All 30 original attributes shifted slightly, mostly upward** (max
+0.046, `competitiveness`: 1.2145→1.2601; one exception, `independent_
thinking`: 0.7695→0.7555, -0.0140). **Root cause isolated with a dedicated
sensitivity script** (not assumed): NOT primarily Zheng He's removal — a
controlled comparison (30-attribute-only `meanSd` pool, with vs. without
Zheng He in the roster) shows his removal alone moves any sampled
attribute's weight by at most ~0.03, mostly negligible-to-negative. The
dominant driver is the four new, **lower-variance** attributes (sd 7.5-8.5)
joining the `meanSd` pool, pulling it down from 13.341 (30-attribute-only,
stale pre-Stage-5 figure) to 12.734 — mechanically nudging every other
attribute's `sd_i/meanSd` ratio, and therefore its weight, up. Top-3
most-discriminative attributes' rank order is unchanged (`aesthetic_
sensitivity` > `leadership_drive` > `competitiveness`), old: 1.3446/
1.2585/1.2145, new: 1.3849/1.2940/1.2601. **New four traits' final
dispersion values**: `opportunity_sensing` 0.8340 (n=14), `resourcefulness`
0.7958 (n=10), `proactive_agency` 0.7951 (n=32), `belief_updating` 0.8296
(n=7) — all below the 1.0 neutral placeholder they replace, meaning these
traits show genuinely *less* cross-roster variation than the taxonomy
average (a real, legitimate finding: extraordinary achievers in this
dataset cluster more tightly on these four traits than on most others, not
a data-quality artifact — the LOO check in 7B already ruled out sampling
noise as the explanation). Not manually tuned to produce any particular
outcome — this is the formula's direct, mechanical output.

### 7D — baseline matching revalidation (`stage7-diagnostics.ts baseline`, n=10,000)

```
max #1 frequency:   p_warren_buffett 17.0%   (20%-at-n>=30 threshold: NOT exceeded)
top 5:              Buffett 17.0%, R. Franklin 14.0%, B. Franklin 10.8%, da Vinci 5.6%, Mandela 5.1%
zero-#1-win profiles: none — all 34 eligible people win at least once
similarity (raw, all pairs):   min .319  p10 .419  p25 .444  med .476  p75 .510  p90 .542  max .721
similarity (calibrated, all):  min 6     p10 25    p25 33    med 44    p75 56    p90 66    max 94
similarity (calibrated, top1): min 44    p10 62    p25 67    med 74    p75 80    p90 86    max 94
```

Consistent with the ~18.7% pre-migration baseline and the ~17.4%/16.8%
figures seen mid-Stage-4.5/pre-Stage-5 — no regression, threshold not
approached. User-profile score distributions are unaffected by dispersion/
matching (user scoring depends only on `quiz_v2` + `reference_v3`, neither
touched this stage) — identical to Stage 6's `trait-diagnostic.ts` table.

### 7E — missingness/coverage stress test (`stage7-diagnostics.ts coverage` + `newtrait`, n=10,000)

**Real-roster correlations (34 points, Pearson r):** winner frequency vs.
total coverage r=0.277; winner frequency vs. new-trait coverage r=0.310;
mean similarity vs. total coverage r=0.218; mean similarity vs. new-trait
coverage r=0.071; mean similarity vs. person's own scatter r=0.337; winner
frequency vs. own scatter r=0.167. All modest, all **positive** — i.e. MORE
coverage (including new-trait coverage) trends toward slightly better
outcomes, not worse — the opposite direction from an "accidental advantage
for sparse profiles" worry, and consistent with coverage shrinkage working
as designed (thin profiles are pulled toward neutral, not boosted). The
own-scatter correlation (r=0.337, positive) is the mirror image of the
Phase 2 flat-profile DEFECT (which was r=-0.624, negative — flat profiles
getting an unwarranted advantage); a positive sign here is consistent with
`matching_v2`'s already-fixed pattern-normalisation design (only a
genuinely spiky profile can align with a user's own real shape) and is not
evidence of a new problem.

**These real-roster correlations are confounded** (Buffett/Franklin/da
Vinci are strong matches for reasons unrelated to the new traits, and also
happen to have high overall coverage) — so a **controlled synthetic
isolation test** was built: two people with **identical** scores on the 30
original attributes, one with 0 of the 4 new attributes scored, one with
all 4.

```
synthetic_0_new (0/4 new traits): meanRaw=0.4933  meanCalibrated=49.8  coverage=0.883
synthetic_4_new (4/4 new traits): meanRaw=0.4975  meanCalibrated=51.2  coverage=1.000
delta (0-new minus 4-new): rawDelta=-0.0042  calibratedDelta=-1.4
```

**Clean, deconfounded answer to both named worries:** a person with only
0-1 of the four new traits does **not** receive an accidental advantage
(if anything, a small, expected disadvantage, ~1.4 calibrated points,
fully explained by the existing, intentional coverage-shrinkage mechanism
pulling the less-covered profile toward `NEUTRAL_RAW_SIMILARITY`) — and a
person with 3-4 new traits is **not** unfairly penalized for having "more
dimensions that can disagree." Locked as two new regression tests in
`matching.test.ts` (Stage 7H, below). The pre-existing "high-variance
omission advantage" test (`matching.test.ts`, parametric over
`ATTRIBUTE_IDS`/`discriminativeWeight`) automatically re-ran against the
new 34-attribute dispersion table and still passes — omission of high- vs.
low-dispersion attributes still does not grant a large advantage.

### 7F — new-trait influence/ablation audit (`stage7-diagnostics.ts ablate`, n=8,000, cross-checked n=3,000)

Diagnostic only — no ablated version shipped. Six conditions (baseline,
each new attribute individually stripped from every person's `attributes`
in-memory, and all four stripped), same simulated users run through every
condition so per-user comparisons are apples-to-apples:

```
baseline (full taxonomy_v1.1):    max=17.0%  top-match stability=100.0%  rank rho=1.0000  avg|shift|=0.00000
without opportunity_sensing:      max=15.8%  top-match stability=91.1%   rank rho=0.9943  avg|shift|=0.00152
without resourcefulness:          max=17.1%  top-match stability=93.3%   rank rho=0.9956  avg|shift|=0.00106
without proactive_agency:         max=17.4%  top-match stability=89.4%   rank rho=0.9912  avg|shift|=0.00280
without belief_updating:          max=17.9%  top-match stability=91.9%   rank rho=0.9958  avg|shift|=0.00095
without all four new traits:      max=17.5%  top-match stability=78.8%   rank rho=0.9807  avg|shift|=0.00486
```

**`belief_updating` — the trait specifically flagged for scrutiny (7/35
person coverage, the bank's highest simSd/refSd ratio, Stage 6) — is the
LEAST influential of the four new attributes by every metric measured**:
highest top-match stability (91.9%), highest rank stability (ρ=0.9958,
best of the four), smallest average similarity shift (0.00095, smallest of
the four) when ablated. This is the direct, empirical answer to the
brief's explicit stop-condition ("if it has large downstream influence
despite extremely sparse profile coverage, STOP and diagnose the
mechanism") — it does not; the opposite is true. `proactive_agency`
(best-covered at 32/35) is the most influential of the four, a sensible,
expected pattern (more real coverage → more removable signal), not a red
flag. Max #1 frequency stays in a tight 15.8%-17.9% band across every
condition including the most extreme (all four ablated), never
approaching 20%. **No STOP condition triggered.**

### 7G — seed/response-noise stability (`sensitivity.ts seeds`/`noise`, n=10,000, reused unmodified)

```
seeds:  mean=16.6%  sd=0.3%  range=[16.2%, 17.0%]   any run >20%: no
noise:  range=[16.7%, 17.4%] across ±25% choice-determinism / ±50% likert-noise perturbation
```

Same rank order (Buffett > R. Franklin > B. Franklin > da Vinci/Mandela/
Mozart) held across every independent seed offset and every noise variant.
Not a property of one lucky seed or one narrow response-noise assumption.

### 7H — matching_v2 mechanism regression

Re-ran `matching.test.ts` unmodified: all 40 existing mechanism tests pass
(level/pattern precedence, full-roster reachability, high/low-dispersion
omission parity, locale immunity, flat-profile protections, coverage
shrinkage) against the regenerated dispersion table with zero changes
needed. **Added 2 new regression tests** locking the Stage 7E sparse-
new-trait invariant (`"Phase 6.6 Stage 7: new-trait sparse coverage does
not create an accidental advantage or penalty"` — a deterministic,
non-simulation pin of the same mechanism the `newtrait` diagnostic found):
a 0-vs-4-new-traits synthetic comparison bounded at <0.05 raw delta across
three different user shapes, and a mirror-user reachability check
confirming a 0-new-trait person still ranks #1 for a user who mirrors
their scored attributes exactly. 220→222 tests. **No causal failure
demonstrated at any point in Stage 7 — `matching_v2` was not modified.**

### 7I — calibration_v2 impact check (read-only, no calibration_v3 work)

Hard invariants re-confirmed unchanged (code untouched): strictly
monotone, `calibrateMatch(1) === 99` never 100. **But the curve is
measurably stale.** Current raw quantiles run through the unchanged
anchors: all-pairs median unchanged (44→44), but **top-1 match
percentiles drifted down 2-4 points** (p25 71→67, median 78→74, p75
84→80, p90 88→86) and **Greatness's calibrated median dropped 58→52** (a
larger, ~6-point shift — see 7J for why this is entirely a Distinctiveness-
component effect, not a new matching mechanism). No monotonicity or
ceiling violation anywhere — this is staleness from the taxonomy/quiz
migration shifting the underlying raw distribution, exactly what the
"regenerate deliberately" discipline anticipates, not a defect.
**Conclusion: Stage 8 (`calibration_v3`) is not just safe but genuinely
warranted** — not implemented this stage, per instruction.

### 7J — greatness_v1 read-only check

Existing regression tests re-confirmed passing, unmodified: an all-100s
profile still does not out-score a coherent, pattern-shaped one; a
profile pinned at 100 on everything is still not awarded the maximum.
Raw Greatness distribution (n=10,000 quiz-mode): p0=.561 p10=.735 p25=.770
p50=.808 p75=.845 p90=.877 max=.974 — smooth, monotonic progression, no
clustering or saturation near 1.0 (even the single highest-scoring
simulated profile in 10,000 lands at calibrated ~98, not 99 or 100).
The calibrated-median drift noted in 7I traces entirely to the
Distinctiveness (D) component: `archetypeAffinity` (A, 50% of the
formula) and `coherence`/`engineTraits` (C, E) don't reference the four
new attributes at all (archetype signature bands and `TENSION_PAIRS`/
`ENGINE_TRAITS` are unchanged, closed lists), so any shift is mechanically
confined to D — not a new, separate mechanism, the same distribution-
staleness Stage 8 will address. **No regression found — `greatness_v1`
was not modified.**

### Verification

`tsc --noEmit`: clean. `vitest run`: **222/222** (220 + 2 new Stage 7
regression tests). `pnpm build --webpack`: clean, **81 routes**, unchanged
from Phase 6.6's earlier stages (Zheng He's ineligibility affects matching
only — his person page still statically generates in both locales, per
the existing "under-evidenced profiles stay browsable" rule).
`dispersion-audit.ts` and `stage7-diagnostics.ts` (all four modes) re-run
clean at completion. `matching_v2`, `greatness_v1`, `calibration_v2`, and
`CALIBRATION_VERSION` were none of them modified — only `dispersion.
generated.ts`'s data (not its version string or formula) and
`matching.test.ts` (2 new regression tests) changed.

## Stage 8 — calibration_v3 regeneration and validation (COMPLETE)

**Approved after Stage 7.** Regenerated both `MATCH_CALIBRATION_ANCHORS`
and `GREATNESS_CALIBRATION_ANCHORS` against a 50,000-profile `quiz_v2`
fitting sample. **`matching_v2`, `reference_v3`, `dispersion_v1`'s
methodology, and `greatness_v1`'s formula were none of them touched** —
only the two presentation-layer anchor tables changed. New committed dev
tooling: `src/dev/stage8-diagnostics.ts` (`validate`/`immunity` modes);
`src/dev/calibrate.ts` extended (backward-compatible) to report top-2/
top-3/min quantiles and accept `N`/`seedOffset` CLI overrides.

### 8A — calibration_v2 reconstructed

Read `calibration.ts`, `calibrate.ts`'s fitting code, `greatness.ts`'s
separate calibration block, and every call site of `calibrateMatch`/
`calibrateGreatness` directly (not assumed). Key finding, load-bearing for
the rest of this stage: **selection immunity is structural, not just
empirical** — `rankMatches`, `selectUnexpectedMatch`, `selectOppositeProfile`,
and `selectCategoryMatches` all sort and filter exclusively on
`rawSimilarity`/`raw`; `calibrateMatch()` is called only at the very end,
purely for display (`similarity.ts:363`, `similarity.ts:327`,
`selectors.ts:165`) — confirmed by reading every call site. Calibration
**cannot** structurally affect any ranking or selection, independent of
whatever the anchor table's actual values are. Fitting procedure: anchors
are found by matching the **all-pairs raw distribution's percentiles**
(real `quiz_v2`→`scoreQuiz`→`matchUserToPerson` pipeline) against a fixed,
hand-authored target display table (`MATCH_TARGETS`/`GREATNESS_TARGETS`,
a documented product decision, unchanged since Phase 0). **Top-1
percentiles are never independently targeted** — they are an emergent
consequence of where the (biased-high) top-1 raw subset happens to land on
the all-pairs-fitted curve. This is the mechanism this stage relies on to
recover top-1's drift honestly (8D-8E).

### 8B — target semantics preserved, not redefined

`MATCH_TARGETS`/`GREATNESS_TARGETS` left **unchanged** — they encode the
already-reviewed "intended semantics" (median deliberately below 50, "not
tuned to flatter"). Only the anchors (which raw value maps to which
target) were refit. No optimisation for higher scores, no manual median
restoration, no famous-person score distributions used as a population
reference.

### 8C — 50,000-profile fitting sample, verified at a second seed

`calibrate.ts` extended to report `top-2`/`top-3`/`min` (opposite-candidate)
raw quantiles alongside the existing all-pairs/top-1/greatness reporting,
and to accept `N`/`seedOffset` as CLI args (backward compatible — old
invocations with no args still run the original 10,000/seed-0 default).
Ran at `N=50,000`, twice (write-dispersion pass, then a percentile pass
with that dispersion correctly in effect — the existing two-pass
discipline), then a THIRD time at an independent `seedOffset=500,000` to
confirm the fit is not seed-specific:

```
                          seedOffset=0                                  seedOffset=500,000
match raw (all)   p50=0.476 p90=0.542 max=0.744            p50=0.476 p90=0.542 max=0.732
match raw (top1)  p50=0.568 p90=0.617 max=0.744             p50=0.568 p90=0.617 max=0.732
greatness raw     p50=0.809 p90=0.878 max=0.976             p50=0.808 p90=0.878 max=0.978
```

Agreement to 3-4 decimal places at every reported percentile — **not
seed-specific**. Proposed anchors from the two runs matched to the same
precision (see 8D for the committed values).

### 8D — calibration_v3 committed

**Version bumped to `calibration_v3`** (unlike Phase 4's quiz-expansion
refresh, which left `calibration_v2` unbumped because that drift was
under 0.008 raw at every percentile — noise-level. This migration's drift
is far larger: top-1 median 78→74 pre-refit, Greatness median 58→52
pre-refit — a materially different, larger revision worth its own
audit-trail label, same reasoning as the `reference_v1`→`v2` bump).

**Match anchors, old (`calibration_v2`) vs new (`calibration_v3`):**

| percentile | v2 raw | v3 raw | Δ |
|---|---|---|---|
| p0.1 | 0.3486 | 0.358 | +0.0094 |
| p1 | 0.3726 | 0.3815 | +0.0089 |
| p5 | 0.398 | 0.405 | +0.007 |
| p10 | 0.4131 | 0.4189 | +0.0058 |
| p25 | 0.4409 | 0.4444 | +0.0035 |
| p50 | 0.4758 | 0.4759 | +0.0001 |
| p75 | 0.5141 | 0.51 | -0.0041 |
| p90 | 0.551 | 0.5422 | -0.0088 |
| p95 | 0.574 | 0.5623 | -0.0117 |
| p99 | 0.6185 | 0.6012 | -0.0173 |
| p99.9 | 0.6696 | 0.6452 | -0.0244 |

**Not a uniform shift** — below the median, raw thresholds moved UP
slightly (the all-pairs distribution's lower half got a hair less
extreme); above the median, they moved DOWN, growing toward the tail
(p99.9: -0.0244). The **all-pairs median itself barely moved at all**
(+0.0001) — confirming the fitting methodology's own target (median 44)
continues to describe the pipeline accurately; only the *shape* of the
upper tail — where top-1/top-2/top-3 concentrate — genuinely compressed.
This is exactly the mechanism behind Stage 7's observed top-1 drift, now
visible directly in the anchor comparison rather than inferred.

**Greatness anchors, old vs new:**

| percentile | v2 raw | v3 raw | Δ |
|---|---|---|---|
| p0.1 | 0.6572 | 0.6344 | -0.0228 |
| p1 | 0.6951 | 0.6786 | -0.0165 |
| p5 | 0.7334 | 0.7152 | -0.0182 |
| p10 | 0.7543 | 0.7357 | -0.0186 |
| p25 | 0.79 | 0.7703 | -0.0197 |
| p50 | 0.8274 | 0.8086 | -0.0188 |
| p75 | 0.8642 | 0.8455 | -0.0187 |
| p90 | 0.8961 | 0.8776 | -0.0185 |
| p95 | 0.9129 | 0.8953 | -0.0176 |
| p99 | 0.9398 | 0.9253 | -0.0145 |
| p99.9 | 0.9636 | 0.9527 | -0.0109 |

**Uniform negative shift** (roughly -0.011 to -0.023 at every percentile,
unlike Match's sign-flipping pattern) — a pure location shift in the raw
distribution, not a shape change. Traced in 8G to the Distinctiveness (D)
component alone (Archetype/Coherence/Engine don't reference the four new
attributes at all). No anchor added or removed from either table — same
12-row shape as `calibration_v2`, refit values only, per instruction not
to overfit with extra anchors.

### 8E — display distributions validated (n=20,000)

```
                    RAW                                      CALIBRATED (v3)
all pairs   min.319 p25.444 med.476 p75.510 max.721   min5  p25=32  med=44  p75=57  max=94
top-1       min.476 p25.546 med.568 p75.593 max.721   min44 p25=70  med=77  p75=84  max=94
top-3       min.457 p25.522 med.541 p75.562 max.670   min37 p25=62  med=69  p75=76  max=93
greatness   min.561 p25.770 med.808 p75.845 max.974   min7  p25=46  med=58  p75=70  max=98
```

**Compared against the historical Phase-4/Phase-5 `calibration_v2`
targets** (CLAUDE.md "Calibration — calibration_v2": all-pairs med 44 p75
57 max 95; top-1 p25 71 med 78 p75 84 max 95; Greatness p25 46 med 58 p75
70 max 98): all-pairs is essentially unchanged (44/57/94 vs 44/57/95 —
within 1 point at the ceiling); **top-1 recovered to within 1 point of
every historical target** (p25 70 vs 71, med 77 vs 78, p75 84 vs 84 exact,
max 94 vs 95); **Greatness recovered exactly** (p25 46, med 58, p75 70,
max 98 — identical to the historical table). **This restoration was not
targeted or manufactured** — 8B fixed the target tables and 8D fit anchors
mechanically against fresh data; the close match to historical figures is
the honest, expected result of the raw distribution genuinely not having
drifted as much in its CENTRAL/median tendency as Stage 7's stale-anchor
reading suggested, only in its upper-tail shape (Match) or its overall
location (Greatness) — both of which a correct refit compensates for by
design. Ceiling confirmed safe: max observed calibrated match 94, max
greatness 98, neither approaching 99/100.

### 8F — robustness re-verified, 4 new regression tests

Existing monotonicity/never-100 tests (`matching.test.ts` "calibration
curve", `greatness.test.ts` "greatness calibration") are parametric over
the live anchor tables and re-validated automatically against
`calibration_v3` with zero changes needed. **Added 4 new tests** (2 per
curve): a boundary-continuity check (no dip in displayed value in an
epsilon window around every anchor's raw x-coordinate) and an explicit
rank-preservation check (sorting a sample of raw values by their
calibrated output must equal sorting them by the raw values themselves).
222→226 tests, all passing.

### 8G — Greatness calibration: presentation regenerated, formula untouched

Both things are true and distinguished explicitly, per instruction: **(1)**
the raw distribution's downward shift is a real, traced consequence of
`quiz_v2`'s item rewrites changing simulated users' scores on the ORIGINAL
30 attributes relative to unchanged `reference_v3` means — mechanically
confined to the Distinctiveness (D) component, since `archetypeAffinity`
(A), `coherence` (C), and `engineTraits` (E) reference none of the four
Phase 6.6 attributes (closed, unchanged lists/bands) — confirmed by
reading the code, not assumed. **(2)** on top of that real shift, the
DISPLAY curve was also stale (fit to the old distribution). Fix applied:
regenerated `GREATNESS_CALIBRATION_ANCHORS` via the unchanged methodology
and unchanged target table (median 58, no floor inflation) — `greatness_v1`'s
formula (`0.50A + 0.22D + 0.13C + 0.15E`, `TENSION_PAIRS`, `ENGINE_TRAITS`,
archetype target bands) was **not modified**. Result: displayed median
fully recovered 52→58 (8E). Still displayed as `N / 100`, never a
percentage or probability — unchanged wording throughout.

### 8H — person/rank immunity, empirically re-confirmed (with a self-caught methodology error)

**First pass of this diagnostic was wrong and is reported honestly, not
hidden**: comparing "rank order by raw" against "rank order by rounded
calibrated %" using DIFFERENT tie-break rules (raw comparison tie-broken
by person id vs. calibrated comparison ALSO tie-broken by person id, but
applied after rounding collapsed many distinct raw values into the same
integer) manufactured 9,914/10,000 apparent "mismatches" — an artifact of
comparing two different sort keys' tie-breaking, not a real inversion.
Diagnosed and corrected to test the property that actually matters: does
displayed % ever go DOWN as raw similarity goes UP, and is the #1-by-raw
person ever shown a lower displayed % than anyone else? Re-run at
n=10,000 (≈330,000 adjacent-pair comparisons):

```
true monotonicity inversions:                        0
benign ties (rounding, expected and harmless):   84,347
#1-by-raw shown a lower displayed % than anyone: 0/10,000
Unexpected Match / Opposite Profile / Category Match determinism: 0/10,000 mismatches each
```

**Zero true inversions.** The 84,347 ties are an expected, harmless
consequence of rounding 34 close-together raw similarities to an integer
percent — irrelevant to production behaviour, since `rankMatches` and
every selector read `rawSimilarity` directly, never the rounded display
value (structural guarantee from 8A, now also empirically confirmed).

### 8I — final verification

`tsc --noEmit`: clean. `vitest run`: **226/226** (222 + 4 new calibration-
robustness tests). `pnpm build --webpack`: clean, **81 routes**, unchanged.
`calibrate.ts quiz 50000` and `stage8-diagnostics.ts` (`validate`/
`immunity`) re-run clean at completion. `matching_v2`, `reference_v3`,
`dispersion_v1`'s methodology, `greatness_v1`'s formula, and the
eligibility threshold remain completely untouched by Stage 8 — only
`MATCH_CALIBRATION_ANCHORS`, `GREATNESS_CALIBRATION_ANCHORS`,
`CALIBRATION_VERSION` (→ `calibration_v3`), and 4 new regression tests
changed.

## Stage 9 — final Greatness validation + product/UI compatibility audit (COMPLETE)

**Approved after Stage 8.** Closed the core-model → product integration
gap: validated `greatness_v1` at scale under the final pipeline, audited
every user-facing surface for stale `taxonomy_v1`/`quiz_v1` assumptions,
and verified the full product live in the browser (both locales). Found
and fixed **two real, previously-undetected defects** — stale hardcoded
trait/question counts in copy, and a genuine crash risk in the paused
Phase 7 compare route — neither `matching_v2`, `reference_v3`,
`dispersion_v1`, nor `greatness_v1`'s formula were touched. New committed
tooling: `src/dev/stage9-diagnostics.ts`.

### 9A — final greatness_v1 validation (n=20,000, `stage9-diagnostics.ts`)

```
Greatness raw:        min.561 p5.715 p25.770 med.808 p75.845 p95.896 max.974  mean.807 sd.055
Greatness displayed:  min7    p5=27  p25=46   med=58  p75=70  p95=86  max=98   mean57.4 sd17.4
A archetypeAffinity:  mean0.726 sd0.091 (real spread — the main driver of variance)
D distinctiveness:    mean0.934 sd0.056 (heavily ceiling-clustered)
C coherence:          mean0.992 sd0.021 (near-total ceiling clustering)
E engineTraits:       mean0.731 sd0.091 (real spread)
corr(A,raw)=0.951  corr(D,raw)=0.282  corr(C,raw)=-0.096  corr(E,raw)=0.605
```

**Key check: is D's ceiling clustering a NEW `taxonomy_v1.1` artifact?** Built
a 30-attribute-only counterfactual of `distinctiveness()` (never touches
`greatness.ts` — a diagnostic reimplementation) and ran it against the same
20,000 profiles: **mean 0.901, median 0.910** — already heavily clustered
under the OLD 30-attribute taxonomy. `taxonomy_v1.1` only nudged D up by
+0.033 (0.901→0.934), exactly the modest, expected order-statistic effect
of 4 more candidates for the "top 5 most extreme" selection. `Z_CAP=2.2`
was explicitly designed "so extremity plateaus" — this is intentional,
pre-existing behaviour, not a migration defect. `C`'s ceiling clustering is
similarly pre-existing and mechanically unaffected by the new attributes
(`TENSION_PAIRS` only ever referenced the original 30). `A`'s 0.951
correlation with the final score reflects its designed 50% weight combined
with `C`/`D` carrying little real variance for typical profiles — not
unexpected dominance. The dedicated all-100s-profile-not-advantaged
regression test still passes unchanged. **No hidden semantic problem
found — no STOP condition triggered.**

### 9B — Greatness copy/semantics audit

Searched the entire codebase for probability/percentile/success-rate
language referring to Greatness: **none found** — `result.greatness.
explainer` already correctly reads "entertainment-oriented profile score
... not a prediction of future success," `formatPotential` is locked to
`N / 100` (tested, never `%`). **Found and fixed 8 stale hardcoded
trait/question counts** left over from the taxonomy/quiz migration (not
Greatness-specific, found while searching the same copy surfaces): `en.ts`
lines 184/203/205/266 said "30 traits" (×3) / "56 short questions", `ko.ts`
lines 179/198/199/258 said "30가지 특성" (×3) / "56개의 짧은 질문" — all
corrected to 34/64, and the quiz intro copy (both locales) extended to
mention the new `world_sense` facet ("sense and act on the world around
you" / "주변 세상의 변화를 감지하고 행동하는 방식"), which was invisibly
missing from the facet-description list. Verified live in both locales
after the fix (9D/9H below). 227/227 tests still pass.

### 9C — taxonomy_v1.1 UI compatibility audit (code)

All facet/attribute iteration in `app/` reads `FACETS`/`ATTRIBUTE_IDS`/
`ATTRIBUTES_BY_FACET` dynamically (confirmed at every call site via grep,
not assumed) — no hardcoded 6/30/56 counts found in component code. Grid
layouts use `repeat(auto-fit, minmax(...))` (count-agnostic since Phase 1's
design system). The pre-existing `missingKeys` coverage test (unmodified,
already passing) confirms no locale gap for the 4 new attributes or
`world_sense`. The only real gaps were the i18n hardcoded strings fixed in
9B.

### 9D/9E — results page + category matches, verified live (real `quiz_v2` token)

Generated a REAL token via the actual `simulateResponses`/`encodeResultToken`
pipeline (not fabricated) and loaded `/en-US/results?r=...` in the running
dev server. Full hierarchy rendered cleanly, no console errors, no NaN/
undefined anywhere: Greatness `38/100` ("Uncommon Alignment"), Closest/
Unexpected/Opposite matches all present with real calibrated percentages,
Signature Trait with correct explainer copy ("Most people land closer to
52 here"), **all 7 category matches present, including "Closest
World-Sense Match" (Ada Lovelace, 99%)** — confirmed via DOM query that
opening the "All Traits" panel shows exactly 7 facet headings in the
correct order (Thinking/Creativity/Work Style/Resilience/Social/
Motivation/**World Sense**), with `belief_updating` correctly appearing
under Thinking (score 20, matching its taxonomy placement) and
`opportunity_sensing`/`resourcefulness`/`proactive_agency` under World
Sense (77/70/51) — every new trait renders a real number, none are
missing or blank. "Where You May Have the Advantage" uses careful,
contextual framing ("stronger orientation toward... may work in your
favour"), never "better." Category-match selection (`selectCategoryMatches`,
unchanged code) confirmed working correctly across all 7 facets including
`world_sense`, with the existing 0.02 bounded-diversity rule untouched.

### 9F — Zheng He product behaviour, verified live

Direct URL (`/en-US/people/zheng-he`) renders his full profile — biography,
sources, trait constellation (12 of his 18 scored attributes, per
`constellation_v1`'s existing cap) — completely intact, no data deleted or
manufactured. Confirmed via `rankSimilarPeople`'s code (`.filter(p =>
p.isMatchEligible && ...)`) and empirically (Nelson Mandela's page, who
appeared in Zheng He's own "Similar People" list, does NOT mention Zheng
He anywhere) that he can never appear as a candidate for another person or
for a real quiz-taking user — structurally guaranteed by the same
eligibility filter `matching_v2`'s `rankMatches` already uses. No
misleading "invalid"/"not great enough" wording exists anywhere, because
no eligibility-status UI currently renders on his page at all (Phase 7's
`CompareCta` isn't wired in yet, per its own paused status). One
pre-existing, unchanged nuance, not a regression: he's excluded from the
*default* directory search/browse list (`filterPeople`'s `matchEligibleOnly`
defaults to `true`, unrelated to Phase 6.6) — not fixed here, per the
explicit "don't build new UI" instruction.

### 9G — quiz_v2 state/token compatibility, verified live

Full manual quiz interaction (not simulated): "Question 1 of 64" progress,
answered Q1, clicked Next → "Question 2 of 64," clicked Back → returned to
Q1 with the answer still selected. `localStorage['tgi_quiz_draft_v1']`
confirmed correctly keyed `{"quizVersion":"quiz_v2",...}`. Refresh showed
the correct resume prompt ("You already answered 1 of 64 questions").
Manually wrote a stale `{"quizVersion":"quiz_v1",...}` draft into
localStorage and reloaded: the quiz correctly discarded it and showed the
fresh intro screen, not a resume prompt — `quiz_v1` state does NOT
silently load as `quiz_v2`. `quiz_v1`-prefixed and structurally malformed
(missing `?r=`, no separator) result tokens all show the explicit "We
couldn't read this result... retake the quiz" state. One nuance found and
explained, not a bug: a correctly-versioned token with an unparseable
payload degrades gracefully per-question (pre-existing, documented
`decodeResultToken` behaviour — only a version mismatch triggers full
rejection, by design). Token payload measured at 72 characters total
(64-char payload, 1 char/question) — no length concern.

### 9H — localization structural + numeric identity, verified live

Loaded the SAME real token at `/ko-KR/results` and compared every number
against the `en-US` render: **perfect match at every single value** —
Greatness `38/100`, all match percentages (Closest 80%, Unexpected 79%,
Opposite 12%, all 7 category matches including World-Sense 99%),
Signature Trait (52/100), every trait-comparison delta across "You Both"/
"Where You Differ," every "More People" percentage. Only the surrounding
copy differed, naturally translated (including the 9B fix rendering live:
"34가지 특성"). No missing-key artifacts or raw translation-key strings
found anywhere in either locale's render.

### 9I — Phase 7 provisional compatibility: a real crash found and fixed

**Not merely a compile check — a genuine, reproduced runtime defect.**
`development.ts` built `DEVELOPMENT_GUIDES` from the live `ATTRIBUTE_IDS`
(34, generic), auto-generating a structurally-valid-looking guide object
for the 4 `taxonomy_v1.1` additions with i18n key references (e.g.
`dev.belief_updating.low.exp.1`) that were never authored. The compare
page (`app/[locale]/compare/[slug]/page.tsx`) renders these via `t(locale,
key as MessageKey)` — an explicit cast bypassing `MessageKey`'s
compile-time guarantee — and `t()` (`src/core/i18n/index.ts`) throws
(`Cannot read properties of undefined (reading 'replace')`) when a key
exists in neither the locale bundle nor the English fallback. **Directly
reproduced**, not hypothesised: `t("en-US", "dev.belief_updating.low.exp.1")`
crashes exactly as predicted. A **pre-existing test in the codebase
(written earlier in the Phase 6.6 migration) actually asserted the
crash-causing behaviour was safe**, with a comment claiming "so
selectDevelopmentGuides never throws" — a real, uncaught oversight from
the original migration, not introduced this stage, surfaced and corrected
here.

`belief_updating` (shape `balanced`) is the only one of the 4 new
attributes reachable through `selectLearnFromSuggestions`'s
`HELPS_WHEN_HIGHER_SHAPES` gate (`opportunity_sensing`/`resourcefulness`/
`proactive_agency` are all `contextual`, never eligible there);
`selectDoNotCopy` was independently confirmed SAFE by design — it renders
only generic `dontcopy.generic.*` keys interpolated with the attribute
name, never a per-attribute `dev.*` key.

**Minimal compatibility repair** (no new content authored, per explicit
instruction): `DEVELOPMENT_GUIDES` now built from a new, explicitly-named
`AUTHORED_ATTRIBUTE_IDS` constant (the original 30, `ATTRIBUTE_IDS` minus
the 4 new ones) instead of the live 34-attribute list. `developmentGuide()`
now correctly returns `undefined` for the 4 new attributes, and
`selectLearnFromSuggestions`'s existing `if (!entry) continue` guard
(previously dead code for any real attribute) now actually runs.
`missingDevelopmentGuides()` correctly reports the 4 new attributes as
missing, restoring its documented purpose as a live regression guard.

**Tests corrected, not just code**: the pre-existing test asserting the
unsafe "structural placeholder" behaviour was rewritten to assert the
crash-safe reality (`selectDevelopmentGuides` returns `[]` for these
attributes) with the full incident documented inline; the
`missingDevelopmentGuides` test now asserts the exact 4 new attributes
(not `[]`) so a genuinely new gap would still be caught; a new test in
`targetComparison.test.ts` directly reproduces the original failing
scenario (target scored high on `belief_updating`, user low, real
`matchUserToPerson` comparison) and confirms it's now skipped cleanly.
Re-verified live: `/en-US/compare/mahatma-gandhi?r=...` and
`/en-US/compare/leonardo-da-vinci?r=...` both render without crashing or
console errors. **What remains for Phase 7** (not done here, per explicit
instruction): the ~12 development-guide entries for the 4 new attributes
(4 attributes × 3 bands) are still unauthored — tracked, not silent,
exactly like the original 30 were before Phase 7 completed them.

### 9J — targeted browser smoke test

Pixel screenshots were not available this session (the Browser pane
wasn't displaying/compositing frames) — verified structurally via DOM/CSS
inspection instead (`javascript_tool`), reported as a real limitation, not
glossed over. At 360/390/768/1280/1920px: **no horizontal overflow at any
width**, on the results page (both locales) or the quiz page. The
"Closest World-Sense Match" category label (the longest new facet label)
does not clip at 360px (294px measured width against a 360px viewport).
Likert radio touch targets measured **exactly 44×44px** at mobile width —
the accessible full-cover radio pattern (Phase 6) confirmed still intact
under `quiz_v2`'s 64 items. `:focus-visible` CSS confirmed present and
correctly wired (`.tgi-choicecard__input:focus-visible + .tgi-choicecard__
label { box-shadow: var(--tgi-focus-ring) }`). Keyboard focus lands
correctly on radio inputs; since these are real native `<input
type="radio">` elements grouped in a `<fieldset>` (not custom JS
recreations), arrow-key/Tab semantics are inherited from the browser
natively rather than custom-implemented. No genuine visual defects found.

### 9K — performance/payload sanity

Build: 81 routes (unchanged), compiles in 2.5s, typechecks in 3.9s,
statically generates all 81 pages in 3.7s — no regression from Stage 7/8.
Result-token payload: 72 characters total — trivial. `matchUserToPerson`
is O(34 attributes × 34 people) ≈ 1,156 operations per request —
computationally trivial, already confirmed fast at 50,000-profile scale
during Stage 8's calibration fitting. No performance regression found from
the 56→64-question / 30→34-trait migration.

### 9L — final verification

`tsc --noEmit`: clean. `vitest run`: **227/227** (226 + 1 net new —
`targetComparison.test.ts` gained a belief_updating crash-regression test;
`interpretation.test.ts`'s two development-guide tests were corrected in
place, not added). `pnpm build --webpack`: clean, 81 routes. Live browser
verification across both locales at 5 widths, covering the full landing →
quiz → results → compare → person-page → invalid-token flow. Two real
defects found and fixed this stage (8 stale i18n counts; the Phase 7
development-guide crash risk) — both outside `matching_v2`/`reference_v3`/
`dispersion_v1`/`greatness_v1`, exactly the "product integration gap" this
stage was scoped to close.

## Stage 10A — quiz presentation grouping (COMPLETE)

**Approved after Stage 9, inserted before the final user retake.**
Presentation-only: groups the 64 unchanged `quiz_v2` questions onto fewer
screens to reduce page-turn fatigue. **The 64 items, their wording,
mappings, weights, taxonomy, `reference_v3`, `dispersion_v1`,
`matching_v2`, `calibration_v3`, and `greatness_v1` are all completely
untouched** — this stage only changes how many questions render on one
screen at a time and how progress is labelled. New module: `src/ui/lib/
quizScreens.ts` (`buildQuizScreens`), living in `src/ui` specifically
because it reads canonical English prompt length as its "is this short"
signal — a presentation concern kept out of `src/core` — so `src/core/
quiz/bank.ts` itself has zero diff this stage.

### Algorithm

Single left-to-right pass over the existing `orderedQuestions` output
(section-grouped authored order) — never reorders, so rule 5 ("preserve
authored order") is satisfied by construction, not a post-hoc check:

1. `situational`/`forced_choice`/`ranking` questions always get their own
   screen (rule 1).
2. `likert7` questions longer than `SHORT_MAX = 110` characters (canonical
   English prompt length) also always get their own screen — grouping only
   ever applies to genuinely short items.
3. Short `likert7` items accumulate into a buffer, up to 2 per screen by
   default (rule 2); a 3rd is admitted only when every item in the buffer
   INCLUDING the candidate is under the stricter `VERY_SHORT_MAX = 85`
   (rule 2's "allow 3 only when all are short and the mobile layout
   remains clean" — operationalised as a stricter length bound, since
   shorter prompts are the direct driver of vertical/visual crowding).
4. A candidate is never added to a buffer whose primary attribute (highest-
   weight `AttributeEffect`) matches the candidate's (rule 3), or falls in
   the same `RELATED_CLUSTERS` entry (rule 4) — the screen is closed and a
   new one started instead. `RELATED_CLUSTERS` is not a new judgment call:
   it's drawn directly from constructs this project had ALREADY documented
   as adjacent or co-loading (CLAUDE.md "Attribute taxonomy" merge history;
   `docs/phase6.5-taxonomy-audit.md` §1 "Overlap and redundancy") —
   `analytical_rigor`/`intuitive_synthesis` (literal bipolar pair),
   `perfectionism`/`detail_orientation` (strongest redundancy signal in the
   bank), `persistence`/`adaptability` (the q21/q39 adjacency already
   flagged as the bank's clearest repetition risk), the three social
   co-loaders, the four motivation co-loaders, `curiosity`/`cross_domain_
   range`/`opportunity_sensing`, `risk_tolerance`/`ambiguity_tolerance`,
   and `belief_updating`/`independent_thinking` (Phase 6.5's "the taxonomy
   cannot tell these two apart" pairing).

### Result: 64 questions → 53 screens

```
distribution: 44 single-question, 7 two-question, 2 three-question screens
total questions covered: 64 (verified equal to orderedQuestions, same order)
```

Not tuned to hit a target number — this is the direct, evidence-based
output of the algorithm above, run once. The reduction (17%) is modest
because three structural factors are all working AGAINST aggressive
grouping, by design: 14 of 64 questions are non-`likert7` (rule 1, always
solo); a further 18 `likert7` items exceed `SHORT_MAX` (always solo); and
rule 5's "don't reorder" means a short item's authored-order neighbours
are often a long item or a different-format item, leaving it without a
groupable partner even though it is itself short. All three are direct,
intended consequences of prioritising measurement integrity and authored
order over maximising screen reduction, per instruction.

### Progress UI

Added `quiz.progress.range` ("Questions {from}–{to} of {total}" / EN,
"{total}문항 중 {from}–{to}번째" / KO) alongside the existing single-question
`quiz.progress` key. `QuizProgress` (`src/ui/components/quiz.tsx`) now
takes `from`/`to` (equal for a single-question screen) instead of a lone
`current`, and always fills/labels using `to` — a multi-question screen's
progress bar reflects how far the screen reaches, never understating it.
Section progress ("Section N of 6") is unchanged and, per instruction,
kept conceptually distinct from the 7 taxonomy facets — quiz presentation
sections and taxonomy facets were already two different numbers before
this stage (6 vs 7) and remain so; nothing here conflates them.

### State/resume: made MORE answer-based, not less

The old draft shape (`{quizVersion, responses, index}`, where `index` was
a raw question-index UI pointer) is replaced with `{quizVersion,
responses}` — resume position is now **derived** from `responses` alone
(`screenIndexForResume`: the first screen, in order, with at least one
unanswered question), never stored as a separate pointer. This is a
strictly more literal reading of rule 8 ("resume remains answer-based")
than the prior design, and it is also more robust: a stored screen index
would have been fragile to any FUTURE regrouping (an old index could point
at the wrong screen under new grouping logic); a derived position is
correct under any regrouping, as long as `quizVersion` and the 64
questions are unchanged. **Backward compatible by construction, not by a
migration step**: `loadDraft()` only ever reads `quizVersion`/`responses`
from the stored JSON, so a pre-Stage-10A draft's stray `index` field is
silently ignored, not a breaking change — verified live (below), not just
argued.

### Live browser verification (real interaction, not simulated)

Ran the dev server and drove the actual quiz UI end-to-end:

- **2-question screen** (`q31`/`q58`, "Questions 6–7 of 64"): both
  fieldsets render with independent 7-point scales; Next stays disabled
  with only one of the two answered, enables once both are; Back then
  Forward preserves BOTH answers (`q31=5`, `q58=3` confirmed still checked)
  — rule 6 and rule 7 both verified directly, not inferred.
- **3-question screen** (`q10`/`q35`/`q41`, "Questions 15–17 of 64"): all
  three fieldsets render correctly with distinct prompts and independent
  scales.
- **Full 64-question completion**: answered every question through the
  real grouped UI (mixed single/double/triple screens) and reached
  `/en-US/results?r=quiz_v2.<64-char token>` with a fully valid result
  (Greatness 53/100, Ibn Khaldun 79% closest match, a legitimate "No
  Unexpected Match This Time" case, Opposite Profile, Signature Trait —
  no crash, no NaN, no missing data).
- **Resume, answer-based**: seeded a partial draft (5 answers, NEW format,
  no `index`), reloaded — resume prompt correctly read "5 of 64," Continue
  landed exactly on the first unanswered screen.
- **Backward compatibility, empirically confirmed**: seeded an OLD-FORMAT
  draft (`{quizVersion:"quiz_v2", responses:[...2 answers], index:47}` —
  the stray `index` a pre-Stage-10A save would have written) — resumed
  correctly at the right screen (derived from the 2 real answers),
  completely ignoring the stale `index:47`.
- **Stale `quiz_v1` draft**: still correctly discarded (fresh intro shown,
  not a resume prompt) — unaffected by the draft-shape change, since the
  `quizVersion` check runs first and rejects it before `index` would ever
  matter.
- **Korean**: resumed into the SAME `q31`/`q58` screen — progress read
  "64문항 중 6–7번째" (the new `quiz.progress.range` KO string,
  interpolated correctly), section label, likert anchors, and nav buttons
  all correctly localised; quiz item text remains English-fallback
  (unchanged Phase 8 policy, untouched this stage).
- **Responsive**: no horizontal overflow at 360px on the 2-question screen
  (English or Korean); touch targets measured — 14 radio inputs on the
  Korean 2-question screen (7 per likert × 2 questions), **all exactly
  44×44px**, no size regression from grouping.

### Accessibility

No changes needed to `ChoiceGroup`/`LikertScale` (`src/ui/components/
quiz.tsx`) — each already used `name={questionId}` for its radio group
(Phase 6), so rendering several on one screen produces naturally distinct,
non-colliding radio groups with zero code change. Each question keeps its
own `<fieldset>`/`<legend>` (prompt association) and its own `<Heading
level={2}>` — confirmed live via `document.querySelectorAll('input[type=
radio]:checked')` correctly reporting `{name:"q31",...}`/`{name:"q58",...}`
as two independent groups.

### Regression

`tsc --noEmit`: clean. `vitest run`: **236/236** (227 + 9 new: 8 in
`src/ui/lib/quizScreens.test.ts` covering the grouping algorithm's rules
1/3/5 plus purity/reduction sanity, 1 proving scoring is byte-identical
whether responses arrive in flat authored order or SCREEN-grouped order —
the direct test for rule 10, reusing `scoreQuiz` unmodified). The
pre-existing `"is unaffected by question order"` test in `scoring.test.ts`
(Phase 6) already independently covers the same underlying guarantee.
`pnpm build --webpack`: clean, 81 routes, unchanged.

## Stage 10B — evaluative-neutrality audit + wording repair (COMPLETE — implementation pass + human-review micro-pass, all 17 items user-approved)

**Context.** After Stage 10A shipped, the user personally completed the
full `quiz_v2` (the first full manual retake of the migrated bank) and
reported the 64-question length itself was acceptable — especially with
Stage 10A's presentation grouping — but that some items still felt
evaluatively loaded: diligent-vs-lazy, persistent-vs-gives-up,
perceptive-vs-oblivious, open-minded-vs-stubborn, proactive-vs-passive,
resourceful-vs-incapable. Even a statistically bidirectional item (clean
`oneSidedShare`, a real `meanDiff` — the exact bar Phase 4/`reference_v2`
and Stage 6 already established) can still bias honest self-report if one
pole reads as a virtue and the other as its deficient opposite, because
none of this project's simulators model social desirability — they model
response *distributions*, not how a wording *feels* to answer. This is a
human-validity finding a machine could not have surfaced, exactly as
flagged going in (see "6. Do not rely on the existing simulator" in the
Stage 10B brief). **Scope: wording only.** Item count (64), ids, formats,
attribute mappings, effect signs/weights, `taxonomy_v1.1`, `reference_v3`,
`dispersion_v1`, `matching_v2`, `calibration_v3`, `greatness_v1`, Stage 10A
screen grouping, section membership, and authored order were all
explicitly out of scope and are confirmed unchanged below.

### The authoring rule this stage established

Recorded durably in CLAUDE.md ("Evaluative symmetry (quiz item wording)",
new subsection under "Scoring — `scoring_v1`"): a question should, where
reasonably possible, describe two defensible operating tendencies, not a
desirable trait and the undesirable absence of it. Reverse-keying is not
evaluative neutrality (a reversed item can still frame its low pole as a
deficiency). Negative wording is not sufficient (an item can be
negatively worded and still read as an admission of a flaw). Indirection
does not neutralise social desirability (softening the phrasing around
"works harder" or "can usually get people to see things my way" doesn't
fix the underlying comparison). A low-pole response should have a
legitimate strategic rationale a reasonable person would recognise in
themselves.

### Full 64-item audit

Every canonical English prompt and every forced-choice/situational option
was read independently against this rule — the preliminary human/model
review seed list supplied at the start of this stage was treated as a
starting point, not a given classification; two items (`q21`, `q64`) were
independently promoted from "not flagged" to C during this audit, and one
preliminary D/C-adjacent judgment call per item below was reconsidered on
its own merits rather than applied mechanically.

**D — rewrite strongly recommended (7, all rewritten):** `q11`, `q40`,
`q50`, `q57`, `q58`, `q59`, `q61`.

**C — rewrite recommended (10, all rewritten):** `q05` (option c only),
`q21`, `q26`, `q28`, `q29`, `q39`, `q49`, `q53`, `q64`, `q65`.

**B — mildly evaluative, left unchanged (15):** `q03`, `q04`, `q06`,
`q13`, `q19`, `q24`, `q30`, `q32`, `q33`, `q35`, `q38`, `q41`, `q43`,
`q51`, `q55` — each has a mild tilt (e.g. `q19`'s "I'm comfortable
working on..." carries a soft comfort/competence connotation;
`q30`'s "higher than what's expected" is standard need-for-achievement
phrasing found in validated psychometric instruments) but no low-cost
rewrite was found that clearly improved neutrality without adding length
or drifting the construct, per instruction not to rewrite for stylistic
consistency alone. `q38` is a rare *inverse* case worth naming
explicitly: its high pole ("I'll follow an interesting tangent that has
nothing to do with what I'm actually supposed to be doing") is the one
that risks reading as mildly undisciplined, not its low pole — flagged
for a future pass, not rewritten here to avoid unnecessary churn on an
item that already isn't glorifying the "expected" trait direction.

**A — neutral, no rewrite needed (32):** `q02`, `q07`, `q08`, `q09`,
`q10`, `q12`, `q14`, `q15`, `q16`, `q17`, `q18`, `q20`, `q22`, `q23`,
`q25`, `q31`, `q34`, `q37`, `q42`, `q44`, `q45`, `q46`, `q47`, `q48`,
`q52`, `q54`, `q56`, `q60`, `q62`, `q63`, `q66`, `q67`. Several of these
are explicitly good models worth naming: `q15` (a three-option resource-
shortfall scenario where every option reads as a competent, legitimate
response — none frames "give up" or "fail to cope"), `q17` (a four-option
failure-response scenario, same property), `q42` (a genuine two-value
trade-off — impact vs. craft — with no virtue framing on either side),
`q63` (the Stage 4 decisiveness fix, already commit-now vs.
gather-more-information with no loaded language), `q66` (the Stage 4.5
competitiveness fix, already audited at Stage 4.5 for "cleanest variance
profile... zero measurable effect on any other attribute" — this stage
confirms it independently reads as neutral too, competitiveness itself
carrying no inherent virtue/vice valence in this taxonomy).

### Deliberately NOT rewritten despite being named in the Stage 10B brief's own preliminary direction

- **`q60`** — the brief itself proposed treating this as "a useful
  benchmark for the LOW side of resourcefulness" and not rewriting it
  absent a found problem. Independently confirmed: "I'll usually push to
  get it rather than settle for a workable substitute" is already a
  legitimate high-evidence-bar strategy, not framed as incapacity. Used
  as the anchor tone for `q59`'s rewrite (see below).
- **`q62`** — same pattern for `belief_updating`'s low pole: "until
  there's real proof it's wrong" already frames resistance around a
  proof threshold, not stubbornness. Used as the anchor tone for `q61`'s
  rewrite.
- **`q30`** — brief listed it as a "B worth checking" candidate. Audited
  and kept: "I set targets for myself that are higher than what's
  expected of me" is standard achievement-motivation phrasing; the low
  pole (meeting expectations) isn't framed as coasting or inadequate, and
  no rewrite was found that improved this without adding length.
- **`q24`, `q32`, `q33`, `q43`, `q51`, `q55`, `q04`, `q06`, `q13`, `q19`,
  `q35`, `q03`, `q41`** — all preliminary "B worth checking" items,
  audited individually (see the A/B/C/D table above), none promoted.

### Rewrites — one-to-one, before → after, with construct/direction rationale

Every rewrite below preserves the item's `bank.ts` effects (attribute id,
direction sign, weight) exactly — **zero lines changed in `bank.ts` this
stage** — and was independently checked against the Stage 10A
`quizScreens.ts` grouping algorithm (`SHORT_MAX=110`, `VERY_SHORT_MAX=85`,
computed live from canonical English prompt length) so that no rewrite
could silently alter which questions share a screen. Nine of the
seventeen rewritten items had a hard length constraint from this check
(noted per item); the other eight were confirmed length-independent by
tracing `buildQuizScreens`' actual buffering logic for their specific
neighbours (e.g. an item immediately followed by a `forced_choice`/
`situational` question, which always flushes the buffer regardless of the
preceding item's length, produces an identical solo screen whether that
item is short or long).

| id | construct | before | after | length constraint |
|---|---|---|---|---|
| `q05` (opt. c) | opportunity_sensing | "Note it and keep doing what you were already doing" | "Keep your attention on current priorities until its relevance becomes clearer" | none (`situational`, always solo) |
| `q11` | discipline/persistence | "I keep going on the things I've committed to even on days when I don't feel like it." | "Once I've committed to something, I usually keep the same pace even after my interest in it drops." | none (isolated by neighbours either way) |
| `q21` | persistence | "Once I've committed to something, I'll stay with it well past the point where others would switch." | "When something isn't working as expected, I'll keep at it longer before deciding to redirect my effort." | ≤110 (Stage 10A pairing with `q26`) |
| `q26` | persuasiveness | "I can usually get people to see something the way I see it." | "I'll usually keep reshaping how I explain something, rather than state it once and leave it at that." | ≤110 (Stage 10A pairing with `q21`) |
| `q28` | competitiveness | "Knowing someone else is ahead of me makes me work harder." | "Knowing someone comparable is ahead of me changes how much effort I put in." | ≤85 (Stage 10A triple with `q43`/`q32`) |
| `q29` | impact_motivation | "I want the work I do to change something beyond my own situation." | "I'm more drawn to work that reaches beyond my own situation than work that's mainly valuable to me personally." | none |
| `q39` | adaptability | "When new information makes my original approach look wrong, I'll drop it and switch, even after I've already put real effort in." | "When new information weakens my original approach, I'll usually switch fairly quickly rather than give the current approach more time to prove itself." | >110 (avoid new pairing with `q18`) |
| `q40` prompt | belief_updating | "New, credible evidence suggests a conclusion you'd already settled on — and started acting on — is wrong. Which is closer to you?" | "New, credible evidence cuts against a conclusion you'd already settled on and started acting on. Which is closer to you?" | none (`forced_choice`, always solo) |
| `q40` opt. a | belief_updating | "Revise the conclusion and change course, even though you'd already committed" | "Reopen the conclusion and adjust course if the new evidence holds up" | — |
| `q40` opt. b | belief_updating | "The new evidence probably doesn't outweigh what you already worked out — stay the course" | "Treat it as one more piece to weigh against the case you already built, and stay the course for now" | — |
| `q49` | ambiguity_tolerance | "I can keep working productively on something even when it's genuinely unclear what the right answer looks like." | "When the right answer is genuinely unclear, I can keep moving without first resolving the uncertainty." | none |
| `q50` | achievement_drive | "I feel a real pull to finish what I start, even on projects nobody else is tracking." | "An unfinished project tends to stay on my mind even when nobody else is waiting on it." | none |
| `q53` | analytical_rigor | "Before I accept an argument or claim, I look for the weak points in its logic or evidence." | "I'd rather stress-test a claim for weak points up front than accept it and deal with problems later." | ≤110 (Stage 10A pairing with `q06`) |
| `q57` | opportunity_sensing | "I tend to notice a shift in what's going on around me — a changing mood, a new pattern, an early sign of something — before people around me mention it." | "I tend to form an early read on things changing around me, often before I have much outside confirmation." | none |
| `q58` | opportunity_sensing (rev.) | "There's often a real gap between when something around me starts changing and when I actually notice it." | "I usually wait for a change around me to become fairly clear before I treat it as something worth reacting to." | ≤110 (Stage 10A pairing with `q31`) |
| `q59` | resourcefulness | "When the tools or resources I'd ideally want aren't available, I can usually still find a workable way to do most of what I need with what's actually on hand." | "When ideal tools or resources aren't available, I tend to keep moving with workable substitutes rather than pause to get the preferred setup." | >110 (avoid new pairing with `q55`) |
| `q61` | belief_updating | "When someone makes a genuinely good case against something I believe, I can feel my actual position shift, not just my willingness to argue about it." | "A strong counter-case can make me reopen a position I'd already settled on, even when the original view still has some support." | >110 (avoid new pairing with `q21`, which would break `q21`+`q26`) |
| `q64` | proactive_agency | "I'll go ahead and change something about how things are done even when nobody put me in charge of it and nobody asked me to." | "If I see a way to improve how something's done, I'll usually just make the change myself rather than wait for it to become someone's assigned job." | none |
| `q65` | proactive_agency (rev.) | "If something outside my formal responsibility could clearly be improved, I'll usually leave it to whoever's actually in charge of it." | "If something outside my formal responsibility could be improved, I usually prefer to route it through the person responsible rather than change it myself." | >110 (avoid new pairing with `q22`) |

**Why `q53` was rewritten differently from the brief's own suggested
direction.** The brief proposed "I tend to focus first on where an
argument could fail rather than on whether its overall explanation hangs
together" — but "whether its overall explanation hangs together" risked
reintroducing an implicit analytical-rigor-vs-holistic-sense-making axis
that `q02` already covers explicitly as a dedicated trade-off item
(`analytical_rigor` vs. `intuitive_synthesis`). `q53` is meant to be a
*dedicated* analytical_rigor item, not a second rigor-vs-intuition
contrast. The implemented rewrite instead keeps both poles inside
analytical_rigor's own territory: a timing-of-scrutiny trade-off
(stress-test up front vs. accept provisionally and revisit if problems
surface) rather than a credulous-vs-rigorous or rigor-vs-holism framing.

**Why `q26` was not rewritten to closely mirror `q44`.** `q44`
("I'll actively work to bring them around to my view") already had a
legitimate persuasiveness angle and was not flagged. An early draft for
`q26` risked converging on near-identical wording to `q44` (both would
have read as "keeps pushing in a disagreement"), which would have
recreated the exact near-duplicate-item problem Stage 10A's own
`RELATED_CLUSTERS`/authored-order discipline exists to avoid (cf. the
`q21`/`q39` persistence/adaptability adjacency already flagged in that
stage). The implemented rewrite instead targets a different angle —
general explanatory framing/reshaping effort, not specifically
disagreement-driven persistence — keeping the two items measuring the
same construct from genuinely different angles, per this project's
long-standing item-authoring rule ("each attribute is approached from
different angles... not asked the same way twice").

### Grouping-preservation methodology (Stage 10A invariant)

Because `buildQuizScreens` computes `SHORT_MAX`/`VERY_SHORT_MAX`
buffering **live** from `en[q.promptKey].length` (confirmed by reading
`quizScreens.ts` directly, not assumed), any prompt-length change is
capable of silently changing which questions share a screen — exactly
what the Stage 10B hard scope rule prohibited. Before writing any
rewrite, `buildQuizScreens(QUIZ)` was dumped against the pre-edit bank
(64 items, their format, and canonical-English length; the full 53-screen
list). Each of the 17 candidate rewrites was traced through the actual
buffering algorithm by hand against its real neighbours to determine
whether its length was constrained (must stay in the same
`≤85`/`86-110`/`>110` bucket as before) or free (both branches of the
algorithm provably converge on the same screen for that item, usually
because an adjacent `forced_choice`/`situational` question or a
`RELATED_CLUSTERS` conflict already forces isolation regardless of
length). Draft wordings were then measured with a throwaway length-check
script and iterated until every constrained item cleared its bucket
(`q21`/`q26`/`q53`/`q58` tightened to ≤110; `q28` tightened to ≤85;
`q39`/`q59`/`q61`/`q65` kept >110). **After implementing all 17 rewrites
in `en.ts`, `buildQuizScreens(QUIZ)` was re-run and diffed against the
pre-edit dump: byte-identical — same 53 screens, same question-id
groupings, in the same order**, not merely argued to be safe.

### Korean

Quiz *item* text (prompts/options, as distinct from structural UI copy)
remains English-fallback per the pre-existing, explicitly documented
Phase 8 policy ("Localisation" above) — confirmed by grep, zero
`quiz.q*` keys exist in `ko.ts`. The Stage 10B brief's instruction to
"update the corresponding ko-KR strings" therefore has nothing to update
this stage: no Korean quiz-item wording exists yet to inherit either the
old evaluative framing or the new neutral framing. Deliberately not
pre-empting Phase 8's native-review discipline by drafting ad hoc Korean
quiz strings now — the same "getting a handful of entries right beats
guessing at all of them" principle already applied to portraits/
`doNotCopyKeys` elsewhere in this project. `missingKeys(locale)`'s
existing guard (only quiz copy and icon glyphs may be outstanding for
`ko-KR`) still passes unchanged.

### Regression

`tsc --noEmit`: clean. `vitest run`: **236/236**, unchanged (no test was
added or modified this stage — this is a wording-only pass with no new
scoring/selection behaviour to lock; the existing `scoreQuiz`
order-independence and Stage 10A grouping-structural tests already cover
everything a wording change could break). `pnpm build`: clean, 81 routes,
unchanged. Verified directly, not only inferred from the diff: all 64
item ids present and unchanged (`bank.ts` has zero lines changed —
confirmed no edit touched that file this stage); all effect mappings/
signs/weights unchanged (same reason); the Stage 10A screen grouping
re-verified byte-identical (above); EN/KO key parity unaffected (no key
added, removed, or renamed — only 17 existing keys' *values* changed).

**Verified live in the running dev server** (not only unit-tested): the
`q31`/`q58` pair, the `q53`/`q06` pair, the `q21`/`q26` pair, and the
`q43`/`q28`/`q32` triple all render their rewritten text correctly with
independent, correctly-scoped fieldsets, confirmed by seeding
`tgi_quiz_draft_v1` drafts (the same resume mechanism Stage 10A verified)
to jump directly to each target screen rather than clicking through the
full 64 items by hand; the long-solo pattern spot-checked via `q59`; the
`forced_choice` rewrite spot-checked via `q40` (both options render
correctly). No horizontal overflow (`scrollWidth === clientWidth`) at
360px on every checked screen, confirmed additionally at 390/768/1920px
on the first pair; touch targets on the most crowded screen (the
`q43`/`q28`/`q32` triple, 21 radio inputs at 360px) measured at exactly
44×44px, no regression from Stage 10A's own figure.

### Human-review micro-pass (post-implementation, live user review)

**Process.** Rather than accept the 17-item audit above as final on its
own authority, the rewritten items were presented to the user one by one
against their **actual live wording pulled from the running dev server**
(not recited from memory or from `en.ts` alone) — item id, current
wording, options where applicable, and primary construct only. **Scoring
direction was deliberately withheld** until after the user had judged
each item, per their explicit instruction, so knowing which pole was
"high" could not bias the read. Four items (`q11`, `q29`, `q53`, `q64`)
were reviewed with priority. This is the concrete application of the
"reverse-keying is not evaluative neutrality" / "a low-pole response
should have a legitimate strategic rationale a reasonable person would
recognise in themselves" principles from CLAUDE.md's new "Evaluative
symmetry" section — tested against an actual human reader blind to
direction, not just reasoned about.

**Result: 12 of 17 approved as-is** (`q05`, `q21`, `q26`, `q28`, `q39`,
`q40`, `q50`, `q57`, `q58`, `q59`, `q61`, `q65`) — no further changes.
**5 items flagged for a targeted second pass**: `q11`, `q29`, `q49`,
`q53`, `q64`. This is itself a finding worth recording: even a careful,
independently-conducted first-pass audit (Stage 10B's own 64-item review
above) missed residual loading in roughly a third of the items it tried
to fix — evidence that evaluative-symmetry wording genuinely benefits
from a second, independent read, not just author self-review, consistent
with why this project treats it as a live human-review step rather than
something closable by a simulator or a single writer's judgment.

| id | before (Stage 10B v1) | after (micro-pass) | disposition |
|---|---|---|---|
| `q11` | "Once I've committed to something, I usually keep the same pace even after my interest in it drops." | "My pace on something I've committed to tends to stay fairly steady even when my interest in it rises or falls." | accepted as user-proposed |
| `q29` | "I'm more drawn to work that reaches beyond my own situation than work that's mainly valuable to me personally." | "I'm more motivated by work whose effects extend beyond me than by work whose main value is the interest, meaning, or satisfaction I get from doing it." | accepted as user-proposed |
| `q49` | "When the right answer is genuinely unclear, I can keep moving without first resolving the uncertainty." | "When the right answer is genuinely unclear, I tend to keep moving rather than resolve the uncertainty first." | accepted as user-proposed |
| `q53` | "I'd rather stress-test a claim for weak points up front than accept it and deal with problems later." | "I'd rather check a claim for weak points upfront than trust it by default and look closer if it's challenged." | **user's candidate rejected**, counter-proposal adopted (see below) |
| `q64` | "If I see a way to improve how something's done, I'll usually just make the change myself rather than wait for it to become someone's assigned job." (the Stage-10B-v1 wording, itself already a rewrite of the original Phase 6.6 wording shown in the main table above) | "If I see a way to improve how something is done, I tend to act on it directly rather than first route it through whoever formally owns the process." | accepted as user-proposed |

**Why `q53`'s user-proposed candidate was rejected.** The proposed
wording — "When evaluating a claim, I tend to look first for where it
could break down rather than start from the overall case it is making."
— correctly fixes the "still sounds clearly inferior/careless" problem
in the Stage-10B-v1 wording (its low pole, "accept it and deal with
problems later," did read as passive/reactive cleanup, a fair critique).
But "start from the overall case it is making" reintroduces a **construct-
leakage risk this project specifically designed the original Stage 10B
rewrite to avoid**: it reads as holistic/gestalt sense-making —
`intuitive_synthesis`/`systems_abstraction` territory — not
`analytical_rigor`. `q02` already exists as a dedicated bipolar item
pairing `analytical_rigor` against `intuitive_synthesis` explicitly; a
second item recreating that same axis under different wording would blur
two constructs `taxonomy_v1`/`taxonomy_v1.1` deliberately keep separate
(see "Attribute taxonomy" in CLAUDE.md — `systems_thinking` +
`abstract_thinking` were merged into `systems_abstraction` specifically
because they didn't separate empirically, the opposite of what this
project wants happening accidentally between two *different* canonical
attributes). The adopted counter-proposal — "trust it by default and
look closer if it's challenged" — keeps both poles inside scrutiny-timing
(rigor's own territory: thoroughness/skepticism-timing, not
analytical-vs-intuitive) by framing the low pole as a real, recognised
strategy (not auditing everything preemptively is an efficiency choice,
not carelessness) rather than a softer synonym for "believe whatever
sounds coherent." A secondary, mechanical reason several longer
counter-phrasings were rejected in drafting (e.g. "...rather than trust
it until something challenges it," 116 chars): they exceeded the
`SHORT_MAX=110` length constraint this item carries from its Stage 10A
screen pairing with `q06` (see below) — the adopted 109-character
version was the shortest construct-safe phrasing found.

**Grouping re-verified after the micro-pass.** All five micro-pass items
were re-checked against `buildQuizScreens`' live length-based buffering
exactly as the original 17 were: `q11`/`q29`/`q49`/`q64` confirmed
length-independent (isolated by neighbouring `forced_choice`/
`situational` items or `RELATED_CLUSTERS` conflicts regardless of their
own length, same reasoning as the original audit); `q53` re-confirmed
≤110 chars (109) to preserve its pairing with `q06`. `buildQuizScreens(QUIZ)`
was re-dumped after implementing all five edits and diffed against the
pre-micro-pass baseline: **byte-identical — same 53 screens, same
question-id groupings**, including the `q53`/`q06` pair specifically,
confirmed both by the diff and live in the dev server (seeded to the
`q53`/`q06` screen, rendered correctly).

**Final regression, post-micro-pass.** `tsc --noEmit`: clean.
`vitest run`: **236/236**, unchanged (no test added or modified for the
micro-pass, same reasoning as the original 17-item pass — wording-only,
nothing new to lock). `bank.ts`: zero lines changed across both the
original 17-item pass and this micro-pass — confirmed by inspection, not
inferred. **All 17 final wordings are now user-approved** — 12 as
originally implemented, 5 as revised by this micro-pass.

### What this stage did NOT do, per explicit instruction

- Did not treat passing `vitest`/the simulator as evidence of evaluative
  neutrality — that was never their claim; only a semantic/readability
  audit and live human-facing rendering checks (including the live,
  direction-blind human-review micro-pass above) are cited as evidence
  for the wording quality itself, per the brief's own methodological
  point.
- Did not bump `QUIZ_VERSION` — `quiz_v2` is still unreleased, and no
  project versioning policy requires a bump for a wording-only revision
  to an unshipped version string. Recorded here instead, per instruction,
  that the wording changed after the user's first manual `quiz_v2`
  retake (and again after their live item-by-item review).
- Did not change the result-token format or scoring representation.
- Did not begin another full 64-question retake at any point in this
  stage, including during the human-review micro-pass — every review was
  scoped to individual items or specific screens, per repeated explicit
  instruction.
- Did not mark Phase 6.6 complete and did not begin Phase 7. Stages
  11-13 (see below) remain the gate for both — specifically, the full
  end-to-end retake this stage deliberately deferred.

## Stage 10C-A — response-anchor audit (COMPLETE)

**Context.** After Stage 10B shipped, the user performed a *second* full
manual `quiz_v2` retake — the full end-to-end validation Stage 10B's own
plan had reserved for a later stage, now actually exercised. Finding:
Stage 10B clearly improved the quiz (most sections read as neutral
strategies rather than good-answer/bad-answer, and the non-agreement
situational/forced-choice items in particular felt well designed), but a
narrower, distinct residual issue remained. Some single-statement
`likert7` items still felt subtly evaluative — not because of their
wording (already fixed) but because of the response UI itself: a plain
"Strongly disagree ↔ Strongly agree" scale under a single-direction
capability statement ("I can...") still makes agreeing feel like
endorsing a desirable capability and disagreeing feel like admitting its
absence, for constructs like deep focus, persistence, belief updating,
and ambiguity tolerance. This is a **distinct discipline from Evaluative
Symmetry** (which fixes the *statement*): Response-Anchor Symmetry fixes
the *scale* a neutral statement is answered on. See CLAUDE.md's new
"Response-anchor symmetry" section for the durable rule.

### A1 — current state, reconstructed from source

- **50 of 64 items are `likert7`**; 14 are `situational`/`forced_choice`
  — confirmed by running `orderedQuestions(QUIZ)` and filtering by
  format, not assumed.
- **Anchor labels were, before this stage, 100% global**: `LikertScale`
  (`src/ui/components/quiz.tsx`) hardcoded `t(locale, "quiz.likert.
  disagree")` / `t(locale, "quiz.likert.agree")` internally — the caller
  (`app/[locale]/quiz/page.tsx`) had no way to override them, and
  `QuizQuestion` (`src/core/quiz/types.ts`) had no field for it.
- **Scoring independence confirmed by reading `scoring.ts` directly**:
  `scoreQuiz` reads only `response.value` (1-7), `question.effects`, and
  `question.reverseKeyed` — never `promptKey` or any anchor text.
  Mechanical invariance (same number → same score) is therefore
  guaranteed unconditionally for any future anchor or prompt-stem change.
- **Screen-grouping independence confirmed by reading `quizScreens.ts`
  directly**: `promptLength()` reads only `en[q.promptKey]` — anchor-key
  text has zero effect on Stage 10A's 53-screen grouping. Prompt-*stem*
  length, if changed, still matters exactly as it did in Stage 10B.
- **CSS constraint found**: `.tgi-likert__anchor { max-width: 7rem; }`,
  no `nowrap`/ellipsis — anchor text wraps within a ~112px column at
  every viewport width including the ≤640px stacked layout, capping how
  long a custom endpoint phrase can be before it becomes an unreadable
  multi-line stack on mobile.

### A2/A3 — full 50-item audit

**A = 42, B = 8, C = 0, D = 0.** (Corrected bookkeeping, 2026-08: the
original report stated A=41, an arithmetic slip against its own detailed
breakdown below, which always listed 17 + 24 + `q31` = 42 items, not 41 —
found and fixed during the Phase 7 pre-flight documentation check, no
item's classification changed.)

**8 items classified B** (behavioral bipolar anchors are a genuine
candidate): `q13` (deep_focus), `q56` (deep_focus), `q19`
(ambiguity_tolerance), `q57` (opportunity_sensing), `q61`
(belief_updating), `q21` (persistence), `q04` (independent_thinking),
`q38` (curiosity — the one *inverse*-loading case: the high pole reads
as mildly undisciplined, not the usual direction).

**Key structural finding**: of the four canonical constructs measured by
a dedicated forward+reverse `likert7` *pair* (opportunity_sensing
`q57`/`q58`, resourcefulness `q59`/`q60`, belief_updating `q61`/`q62`,
proactive_agency `q64`/`q65`), two pairs (resourcefulness,
proactive_agency) had already, as a side effect of their Stage 10B
rewrites, ended up with self-contained "I'll do X rather than Y" phrasing
— both poles named in one sentence — which made custom anchors
unnecessary for either member. Only opportunity_sensing and
belief_updating still had one single-direction member each (`q57`,
`q61`). For both, **only the single-direction member was recommended for
conversion**, not both — converting `q58` in addition to `q57`, or `q62`
in addition to `q61`, would display the same left/right contrast twice
for one construct (once via two separate agreement-scale items, again via
one item's bipolar labels), which risked feeling repetitive without
adding new information. `q58`/`q62` were classified A specifically for
this reason, not because their own wording was flawed.

**A = 42 items**, for three reasons, two dominant and one narrower: (1) 17 items already
self-contain both poles via "rather than"/"X matters more than Y"
phrasing, making custom anchors redundant with the prompt itself
(`q03, q10, q16, q26, q29, q37, q39, q42, q45, q49, q53, q59, q60, q63,
q64, q65, q67`); (2) 24 items describe a preference/intensity/sensitivity
rather than a capability, so disagreeing doesn't read as a deficiency in
the first place (`q06, q08, q11, q14, q18, q22, q24, q28, q30, q32, q33,
q34, q35, q41, q43, q44, q48, q50, q51, q54, q55, q58, q62, q66`). `q31`
lands in A for a third, distinct reason: `q02` already exists as a
dedicated forced-choice item pairing `analytical_rigor` against
`intuitive_synthesis` directly — converting `q31` would risk duplicating
that existing contrast rather than adding information.

**C = 0, D = 0**: no likert item's clean bipolar opposite was found to
necessarily leak into a *different* construct (the four paired-reverse
constructs came closest, but resolved to A/B on a redundancy basis, a
related but distinct problem from construct leakage); no item's residual
problem was found to actually be the *statement* rather than the anchor
(Stage 10B already fixed statement-level loading for every item that had
it).

### Priority-area findings

**Deep focus (`q13`, `q56`) vs. `q47`.** `q47` (`forced_choice`, outside
the 50-item likert count) already models the right tone: "I can lose
track of time entirely once I'm in it" vs. "I check in with myself
regularly so I don't lose momentum elsewhere" — both poles read as
deliberate strategies. `q13` was judged the stronger, cleaner candidate;
`q56`'s prompt already names its own alternative ("not short bursts
spread across the day"), so the marginal benefit is smaller and a
careless rewrite risked reading as a near-restatement of `q47`.

**Uncertainty/adaptability/belief-updating (`q39`, `q49`, `q61`, `q62` +
related).** The most important finding of this cluster: `q39` and `q49`
turned out **not to need conversion at all** — both already use
self-contained "I'll do X rather than Y" phrasing as a byproduct of their
Stage 10B rewrites. `q62` is the same story (already a legitimate
high-evidence-bar stance on its own, confirmed clean at Stage 10B). Only
`q61` remained a genuine candidate, for the redundancy reason above.

### A4 — midpoint policy: no label, for any item

A words-based midpoint (e.g. "Depends on the situation") would leave
scoring completely unaffected (4 is 4 regardless) but risks changing what
4 *means* to the person answering — inviting it as an "it depends" escape
hatch rather than a genuine continuum midpoint, a new and asymmetric
response-pattern risk relative to unconverted items. Decision: no
midpoint label, for any item, converted or not.

### A5 — representative KEEP examples

`q63` (decisiveness) — "I'd rather commit and move than keep gathering
information" already states both strategies in one sentence. `q42`
(impact_motivation) — "matters more to me than" is a clean value
trade-off already. `q18` (risk_tolerance) — disagreeing is already a
well-established *legitimate* stance in this project's own philosophy
(Buffett's low risk tolerance is explicitly framed as an advantage,
CLAUDE.md "Seed dataset"). `q65` (proactive_agency) — its Stage 10B
rewrite already added self-contained "rather than" framing; custom
anchors would be pure duplication.

### A6 — measurement impact analysis

**Mechanical invariance**: guaranteed unconditionally, confirmed by
reading `scoring.ts` (A1 above). **Human-semantic invariance**: explicitly
**not** guaranteed — a person may pick a different number under new
anchor wording than they would have under "Strongly disagree/agree," even
though `scoreQuiz` treats whichever number they pick identically either
way. The project's simulators model the first kind of invariance
perfectly and the second not at all, which is why this discipline's
primary validation is live, direction-blind human review — a passing
`vitest` run proves scoring mechanics weren't altered, never that an item
reads as neutral to a human. Converting a much larger share of the 50
likert items would not break anything mechanically, but would be worth
empirically monitoring (a Phase 9+, real-user-data concern, not blocking
now) for response-distribution shape differences between converted and
unconverted items.

### A7 — minimal architecture proposed (implemented at Stage 10B — see below)

Two optional `QuizQuestion` fields (`leftAnchorKey`/`rightAnchorKey`);
`LikertScale` accepts optional `leftAnchor`/`rightAnchor` props
(pre-resolved via `t()` by the caller, same pattern `ChoiceGroup`'s
`option.label` already uses) and falls back to the existing global
lookup when absent. 1..7 stays numeric; radio accessibility, independent
per-question `name` grouping, and screen-grouping length calculation
(prompt-only) are all structurally unaffected.

### A8 — two Results-copy issues recorded (fixed at Stage 10C-B — see below)

Both verified present in source before any change: `results.
signature_trait.explain` ("Most people land closer to {refMean} here...")
and `label.your_advantage` ("Where You May Have the Advantage").

### Audit outcome

**8 candidates identified, well under the 10-12-item stop threshold — no
STOP condition triggered.** Recommended prototyping 2-3 highest-value
items first (`q13`, `q61`, `q19`) rather than all 8 at once, to test the
human-semantic-invariance question on a small, reversible sample. Full
before/after designs for all 8 candidates (stem, left/right endpoints,
direction check, leakage check, length estimate) were produced and
reviewed by the user; only 3 were approved for implementation — see Stage
10C-B below for exactly which, and why the other 5 were deferred or
rejected.

---

## Stage 10C-B — selective implementation + live human approval (COMPLETE)

**Human decision on the Stage 10C-A audit**: the selective-anchor
architecture was approved, but not all 8 B candidates were treated as
equally clean. Approved for this first prototype: **`q13`
(deep_focus), `q57` (opportunity_sensing), `q61` (belief_updating)** —
chosen specifically because their proposed bipolar semantics were judged
clean with no redundancy or leakage caveat. Explicitly deferred or
rejected, not implemented:

- **`q21` (persistence)** — a good candidate, retained as a documented
  future prototype item, not bundled into this first wave.
- **`q19` (ambiguity_tolerance)** — deferred: the proposed endpoints
  risked describing *when effort begins* rather than pure ambiguity
  tolerance, a possible drift toward execution_speed/decisiveness/
  planning_orientation.
- **`q56` (deep_focus)** — deferred: the proposed session-length contrast
  risked measuring work-session architecture rather than deep-focus
  capacity itself; `q13` was judged sufficient for this construct in the
  first prototype.
- **`q04` (independent_thinking)** — **rejected**, not deferred: "update
  my view in response to majority disagreement" as the low-pole anchor
  risked reading as conformity/social-influence rather than legitimate
  view-updating — a construct/evaluative-leakage risk, not merely a
  wording nuance.
- **`q38` (curiosity)** — **rejected**: the natural opposite pole
  ("stay focused on the task") would have introduced discipline/
  deep_focus as curiosity's counter-construct — construct leakage into a
  different canonical attribute.

### Architecture implemented

- `QuizQuestion` (`src/core/quiz/types.ts`): added optional
  `leftAnchorKey?: string` / `rightAnchorKey?: string`.
- `LikertScale` (`src/ui/components/quiz.tsx`): added `leftAnchor`/
  `rightAnchor` props, typed `string | undefined` (not `?:string`, to
  satisfy `exactOptionalPropertyTypes`) — falls back to the existing
  global `t(locale, "quiz.likert.disagree"/"agree")` lookup when
  `undefined`.
- `app/[locale]/quiz/page.tsx`: resolves `question.leftAnchorKey`/
  `rightAnchorKey` via `t()` when present (same resolution pattern as
  `prompt` and option labels) and passes the resolved strings through.
- `bank.ts`: `q13`/`q57`/`q61` wrapped with an object spread
  (`{ ...likert(...), leftAnchorKey: "...", rightAnchorKey: "..." }`) —
  no change to the `likert()` helper's signature, no change to any other
  item's construction, effects/weights/format/section membership
  byte-identical to before this stage for all three (and for the other
  61 items, obviously untouched).

### Final stems/endpoints implemented

Prompts (`promptKey` values) for `q13`/`q57`/`q61` were restated as
neutral situational stems — **not** an Evaluative-Symmetry wording fix
(that work was already done and approved for these three at Stage 10B),
but a structural change so the new anchors read as one continuum next to
the prompt rather than a bolted-on pair beside an unrelated agree/
disagree claim.

| id | stem | left (1) | right (7) | length note |
|---|---|---|---|---|
| `q13` | "When I'm deep in demanding work, I tend to..." | "Resurface often and switch attention" | "Stay immersed for long stretches" | unconstrained (isolated by neighbours either way — see Stage 10B methodology) |
| `q57` | "When something around me starts to change, I tend to..." | "Wait for a clearer signal" | "Notice an early signal" | unconstrained (first item, followed by `forced_choice` `q02`) |
| `q61` | "When new counterevidence comes in against a position I'd already settled on and felt was well-supported, I tend to..." | "Need stronger evidence first" | "Reopen it fairly readily" | must stay >110 chars (117 implemented) to avoid a new Stage 10A screen pairing with `q21`, which would break `q21`'s existing pairing with `q26` |

`q57`'s anchors deliberately use "notice"/perception language only, never
"act on" — opportunity_sensing measures perceiving signals, not acting on
them (that's `q64`/`q65`'s proactive_agency); "act on" would have leaked
into that construct.

### Screen-grouping identity re-verified

`buildQuizScreens(QUIZ)` was dumped before and after the Stage 10C-B
edits and diffed: **byte-identical — same 53 screens, same question-id
groupings**, including `q13`'s existing pairing with `q16` and `q61`'s
continued isolation from `q21`+`q26`. Not inferred from the length
constraint alone — confirmed by the actual diff, same methodology Stage
10B established.

### Live human-review, direction withheld until judgment

The user was walked through the three items one at a time, in the order
`q57` → `q13` → `q61`, directly in the running quiz UI (seeded via
`tgi_quiz_draft_v1` drafts to jump to each target screen, the same
resume mechanism Stage 10A/10B verified — not a shortcut around real
rendering). No scoring direction, construct name beyond what's visible in
the UI, or "intended high side" was disclosed before each judgment.
Verified simultaneously: desktop (1280px) and mobile (360px) rendering,
`scrollWidth === clientWidth` at both, zero radio inputs off the 44×44px
target on the mixed `q13`/`q16` screen (14 inputs, all correctly sized),
anchor labels correctly bookending the 1-7 row in both the horizontal
desktop layout and the ≤640px stacked layout (confirmed via
`getBoundingClientRect` — left anchor above, right anchor below the
number row, not floating as separate buttons), and full fieldset/legend/
`aria-label="1".."7"`/`name={questionId}` structure unchanged from before
Stage 10C-B.

**User's own judgment, reported per item:**
- **`q57`**: "Both endpoints felt like good, legitimate approaches. No
  meaningful better/worse signal was felt in the live UI." **Approved
  as-is.**
- **`q13`**: "Both endpoints felt like legitimate work styles. The left
  side did not feel like distractibility, and the right side did not
  feel like superior ability." **Approved as-is.**
- **`q61`**: "The two endpoints felt like different legitimate judgment
  strategies rather than open-mindedness versus stubbornness." **Approved
  as-is.**

**No further wording or anchor changes were made.** Expansion beyond
these three (starting with `q21`, the documented next candidate) is
explicitly deferred pending real-user evidence, not implemented
speculatively.

### Two Results-copy fixes (implemented, both verified present before editing)

1. `results.signature_trait.explain` (EN + KO): removed the unsupported
   population claim. Before: "Most people land closer to {refMean} here.
   Yours is {score}..." After: "The reference point for this trait is
   {refMean}. Yours is {score} — one of the most distinctive points in
   your whole profile." KO reworded to match the corrected meaning
   ("이 특성의 기준점은 {refMean}입니다..."), not translated literally from
   the old Korean string, per this project's "semantic adaptation, not
   word-for-word translation" localisation discipline.
2. `label.your_advantage` (EN + KO): Before: "Where You May Have the
   Advantage" — conflicted with this project's own "difference is not
   deficiency" framing (CLAUDE.md "Safety"). After: "Where You Bring
   Something Different", parallel in structure to the sibling heading
   "Where You Differ Most". KO: "당신이 다르게 기여하는 지점" (reworded, not a
   literal translation of the old "더 유리할 수 있는" — "more advantageous" —
   phrasing).

### Final regression

`tsc --noEmit`: clean (one `exactOptionalPropertyTypes` error surfaced
and fixed during implementation — `LikertScale`'s new props needed
`string | undefined` typing, not `?:string`, matching this codebase's
existing convention for optional-but-always-passed props like `value`).
`vitest run`: **236/236**, unchanged — no test added or modified (a
presentation/architecture-only stage, same reasoning as Stage 10B: the
existing `scoreQuiz` order-independence and Stage 10A grouping-structural
tests already cover everything this kind of change could break).
`pnpm build`: clean, 81 routes, unchanged.

---

## Phase 6.6 closure

**Phase 6.6 is CLOSED.** Full reasoning recorded in CLAUDE.md's "Phase 6.6
closure" — summarised here for this document's own completeness:

- Stage 10A's own "Stages 11-13" note (superseded by this section)
  reserved one gate before closure: a full end-to-end 64-question retake
  plus a completion decision. **Two full manual retakes actually
  occurred** (post-Stage-10A → produced Stage 10B; post-Stage-10B →
  produced Stage 10C), each a genuine independent full pass, a higher bar
  than the single retake originally planned.
- Every change either retake produced was individually re-verified live
  with direction withheld until human judgment: all 17 Stage 10B items
  (12 approved outright + 5 micro-passed and re-approved) and all 3 Stage
  10C items (`q13`/`q57`/`q61`, all approved as-is).
- The one literal gap — the second retake ran on the Stage-10B-only bank,
  not today's final state — was judged non-blocking: only 3 of 64 items
  differ from what was fully retaken, those 3 are now the most
  rigorously individually verified items in the bank, and mixed
  presentation styles are not a new risk (the quiz has mixed
  `likert7`/`forced_choice`/`situational` formats throughout its entire
  history without issue).
- No blocking inconsistency was found during the closure audit: canonical
  version constants (`taxonomy_v1.1`, `quiz_v2`, `reference_v3`,
  `dispersion_v1`, `matching_v2`, `calibration_v3`, `greatness_v1`),
  the 34-attribute count, and the 34/35-eligible roster (Zheng He the
  sole exception) were all re-verified directly against source, not
  trusted from documentation, and matched exactly.

**Final state**: 64 quiz items, 53 presentation screens (byte-identical
throughout Stages 10A-10C), 3 items with custom behavioral scale anchors
(`q13`, `q57`, `q61`), `tsc`/`vitest` (236/236)/`pnpm build` (81 routes)
all clean. `matching_v2`, `reference_v3`, `dispersion_v1`,
`calibration_v3`, and `greatness_v1` were not modified at any point across
Stages 1-10C — every change in this entire phase was either taxonomy/
person-data (Stages 2, 5), quiz-measurement (Stages 3, 4, 4.5), reference/
dispersion/calibration regeneration in response to those (Stages 6-8), or
presentation-only (Stages 9-10C).

**Next roadmap item**: a fresh, explicit decision to resume Phase 7
(target comparison + development content) — not automatic, and not made
in this stage.
