# Session 17 comparison — evidence-quality / diagnostic-density audit

All numbers below are read directly from `results.json`, produced by
`computeDiagnosticDensity.ts` running against the four locked
`episodes.*.json` files. No number here was manually approximated. See
`CLASSIFICATION_LOCK.md` for the lock point and `diagnosticRubric.md`
for the frozen classification rubric.

## 1. Episode counts

| Candidate | Session | Total episodes |
|---|---|---|
| Jorge Luis Borges | 13 | 26 |
| Thomas Sankara | 13 | 19 |
| Enrico Fermi | 15 | 12 |
| James Baldwin | 15 | 12 |

Session 13 group total: 45 episodes. Session 15 group total: 24
episodes.

## 2. A/B/C/D classification by candidate

| Candidate | A | B | C | D | A% | B% | C% | D% | A+B% |
|---|---|---|---|---|---|---|---|---|---|
| Borges | 17 | 4 | 2 | 3 | 65.4 | 15.4 | 7.7 | 11.5 | 80.8 |
| Sankara | 9 | 7 | 3 | 0 | 47.4 | 36.8 | 15.8 | 0.0 | 84.2 |
| Fermi | 7 | 2 | 2 | 1 | 58.3 | 16.7 | 16.7 | 8.3 | 75.0 |
| Baldwin | 7 | 3 | 1 | 1 | 58.3 | 25.0 | 8.3 | 8.3 | 83.3 |

## 3. Diagnostic-density comparison, Session 13 vs. Session 15

Pooled (episode-weighted across the group's 2 candidates):

| | Session 13 (Borges+Sankara, n=45 episodes) | Session 15 (Fermi+Baldwin, n=24 episodes) | Delta |
|---|---|---|---|
| A% | 57.8 | 58.3 | **-0.5** |
| B% | 24.4 | 20.8 | +3.6 |
| C% | 11.1 | 12.5 | -1.4 |
| D% | 6.7 | 8.3 | -1.6 |
| **A+B%** | **82.2** | **79.2** | **+3.0** |

Mean-of-candidate-percentages (unweighted across the 2 candidates in
each group, so Borges's larger episode count doesn't dominate the
group average):

| | Session 13 mean | Session 15 mean | Delta |
|---|---|---|---|
| A% | 56.4 | 58.3 | **-1.9** |
| A+B% | 82.5 | 79.2 | +3.3 |

**Session 13's evidence is NOT more diagnostically dense per episode
than Session 15's, under either weighting.** The A-only percentage is
actually very slightly LOWER for Session 13 under both the pooled and
mean-of-candidates view. The A+B combined figure is 3-3.3 points higher
for Session 13 — a small, real difference, but far too small in
magnitude to plausibly explain a scored-row gap where Session 13
averaged 12.83 rows/candidate against Session 15's 7.75 (a 39.6%
shortfall) or Session 14's 6.0 (a 53.2% shortfall).

## 4. Behavioral-context breadth

| | Session 13 | Session 15 |
|---|---|---|
| Distinct contexts, union across both candidates | 14 | 13 |
| Mean distinct contexts per candidate | 10.5 | 10.5 |

**Identical mean per-candidate context breadth.** Both groups' evidence
spans a comparably wide range of the 14-item context taxonomy per
candidate — this dimension shows no meaningful group difference at all.

## 5. Repeated-pattern / longitudinal-structure and high-stakes density

| | Session 13 pooled % | Session 15 pooled % | Delta |
|---|---|---|---|
| Episodes tagged repeated_behavior_pattern or longitudinal_pattern_across_years | 75.6 (34/45) | 50.0 (12/24) | **+25.6** |
| Episodes tagged high-stakes (`highStakes: true`) | 20.0 (9/45) | 50.0 (12/24) | **-30.0** |

**This is the largest, most consistent difference this audit found, and
it runs in TWO DIFFERENT DIRECTIONS depending on which structural axis
is measured, not a single uniform "Session 13 evidence is richer"
signal.** Session 13's evidence (Borges/Sankara) is far more often
embedded in a sustained, repeated, or multi-year pattern (a five-decade
collaboration, a "sustained... throughout his tenure" austerity
practice, a "multi-step" belief reversal explicitly described as such
in the original rationale text). Session 15's evidence (Fermi/Baldwin)
is, by contrast, far more concentrated in single, high-stakes,
often-dramatic moments (a real-time Trinity yield estimate, a
Nobel-ceremony emigration under political threat, a Cambridge debate, a
$40 flight to Paris) — vivid and clearly A-classed individually, but
structurally less likely to be part of an episode CLUSTER describing
the same sustained tendency from multiple angles.

## 6. Explicit motive / reasoning / emotion density

| | Session 13 pooled % | Session 15 pooled % | Delta |
|---|---|---|---|
| Episodes with explicit motive, reasoning, or emotional reaction stated | 20.0 (9/45) | 8.3 (2/24) | **+11.7** |

A real, meaningful difference: Session 13's evidence is more than twice
as likely to state WHY something was done, HOW the person reasoned
through it, or an explicit emotional reaction, rather than leaving
motive to be inferred from the bare act. Both Borges (7/26, 26.9%) and
Sankara (2/19, 10.5%) individually exceed Fermi (1/12, 8.3%); Baldwin
(1/12, 8.3%) matches Fermi exactly. This is not driven by one candidate
alone.

## 7. "Primarily achievement/career chronology without additional signal" — the episode-count-illusion test

| | Session 13 pooled | Session 15 pooled |
|---|---|---|
| C-classed episodes carrying `career_achievement` context (bare event, no added behavioral signal) | 5/45 = 11.1% | 3/24 = 12.5% |

**Essentially identical, and both close to their overall C%** (11.1%
and 12.5% respectively, matching row 3's C% column exactly, since every
C-classed episode in this locked set happens to carry the
`career_achievement` tag). This is the direct test of instruction 14's
"episode-count illusion" concern — whether Session 15's 12-episode
research-completeness floor gave a false impression of research depth
by counting a disproportionate share of low-diagnostic-value
achievement chronology. **It did not.** Session 15's evidence is not
disproportionately padded with bare achievement facts relative to
Session 13's.

## 8. Borderline-call discipline (cross-candidate consistency checks made during classification)

Recorded per `diagnosticRubric.md`'s own "Clarifications" pointer, since
these calls were the ones most at risk of being decided inconsistently
across the two groups:

- **Role/title facts vs. concrete personal acts.** Fermi's F3 ("appointed
  associate director of Los Alamos... personally heading F Division") was
  classified C (an appointment/title fact), matching Sankara's S17
  ("moved from military career into civilian governance") and Borges's
  E19 (a scope-of-output summary) — all three are cases where the
  candidate file states a role or scope was held/reached without
  describing a specific act, decision, or reaction around it. Fermi's F2
  ("led the team that built and operated Chicago Pile-1") was
  deliberately downgraded from an initial A-leaning read to B during
  classification, specifically to avoid crediting "held a leadership
  role during a historic outcome" more generously for Fermi than the
  otherwise-comparable Sankara S1 ("vaccination campaign reaching 2.5M
  children") or S10 ("500-unit housing... completed") were credited —
  both of those are also outcome/throughput statistics about a program
  the person led, and both were classified B on the same reasoning.
- **Reputational/external characterization.** Fermi's F9 ("described...
  as one of the last physicists equally significant in theory and
  experiment") and Sankara's S11 ("speeches... widely cited by later
  historians as rhetorically forceful") were both classified C on the
  identical rule: an external assessment BY OTHERS of the person's
  standing is evidence about legacy/reception, not about the person's
  own observed behavior, regardless of how flattering or specific the
  characterization is.
- **Same-underlying-event redundancy.** The D-classification rule (an
  episode restating an already-counted event without adding
  non-trivial new content) was applied identically on both sides:
  Borges's E24/E25 (restating E2/E8 and E1) and Sankara's implicit
  absence of any D case; Fermi's F8 (restating F7's emigration, viewed
  through a planning rather than risk lens); Baldwin's J5 (restating
  J9's revision-practice fact, minus J9's stronger first-person quote).
  Sankara's S19 and Baldwin's J10 were both downgraded from a
  potential A to B rather than marked D, on the identical rule (each
  adds one genuinely new, non-trivial quantified/extended detail to an
  already-counted event) — S19 adds "required it of ministers too"
  to S6's personal disclosure; J10 adds the specific 544-164 vote
  margin to J8's debate outcome.
- **Single vivid high-stakes moments.** Fermi's F12 (the Trinity
  atmosphere-ignition joke) and Borges's E5/E6/E7 (single dated acts
  within the belief-reversal arc) were held to the same standard: a
  single documented instance can still be A-classed if it directly
  reveals a specific coping/relational/moral-reasoning tendency, per the
  rubric's explicit instruction that drama is not the criterion but
  differentiation is — neither group's single-instance episodes were
  graded more leniently than the other's.

## 9. Reconstruction contamination — found to be SYMMETRIC, not asymmetric

Instruction 10 asked this audit to determine whether Session 15's
evidence artifacts are closer to a genuine pre-score ledger than
Session 13's. **They are not closer — both are equally distant, and by
the same mechanism.** Checked directly (see `README.md` §"Provenance"):
no standalone pre-scoring evidence ledger was ever preserved as a
committed artifact anywhere in this repository for ANY of the four
candidates. `docs/roster-1000-checkpoint.md` §79 (Session 13) and §81
(Session 15) both report only AGGREGATE ledger statistics (episode
count, source count, life-period count, context count) — never the
ledger's actual content. In every one of the four cases, the only
frozen evidence this audit could use is the already-scored `rows[*]
.rationale` text in the corresponding `data-pipeline/candidates/*.json`
file — text that was necessarily written AFTER a trait had already been
chosen for it, exactly the same "historically trait-conditioned
evidence" limitation Session 16 flagged for Borges/Sankara specifically.

This means the finding in §3-§7 above is a fairer comparison than
originally anticipated, not a less fair one: whatever inflation
trait-conditioned reconstruction introduces (a scorer narrating a fact
more diagnostically because they already know which trait it was used
to support) applies to all four candidates' evidence equally, not to
Session 13's alone. A genuine future improvement would still be a true
blind trial per Session 16's own recommendation (§21 of that session,
carried forward unchanged) — but the SYMMETRY of the current
contamination is itself a real, useful finding: it means Session 17's
near-parity result (§3) is not an artifact of comparing contaminated
Session-13 evidence against clean Session-15 evidence. Both sides carry
the identical limitation.

## 10. Central hypothesis verdict: **NOT SUPPORTED**

The hypothesis under test was: *Session 13 collected more behaviorally
diagnostic evidence per episode than Session 15, even when both
sessions appeared to have similarly deep evidence ledgers by raw
episode count.*

**This audit does not support that hypothesis.** Under the frozen A/B/C/D
rubric, applied with documented cross-candidate consistency checks (§8)
and under a symmetric contamination condition (§9) rather than the
asymmetric one the audit was designed to test for, Session 13's and
Session 15's evidence are diagnostically comparable per episode:
- A+B combined density: 82.2% vs. 79.2% pooled (82.5% vs. 79.2%
  unweighted) — a 3-3.3 point gap.
- A-only density: 57.8% vs. 58.3% pooled — Session 15 is marginally
  HIGHER, the opposite direction from the hypothesis.
- Behavioral-context breadth: identical (10.5 distinct contexts per
  candidate, both groups).
- The "episode-count illusion" specifically (§7) was tested and NOT
  found: neither group's episode count is inflated by a
  disproportionate share of low-value achievement chronology relative
  to the other.

A 3-point A+B density gap cannot plausibly explain a 39.6% (Session 15)
or 53.2% (Session 14) shortfall in scored-row count relative to Session
13. Diagnostic density per episode is not the primary explanation for
the Session 13-vs-14/15 coverage gap.

**A real, secondary structural difference was found and should not be
discarded even though it does not confirm the tested hypothesis**: §5
and §6 show Session 13's evidence is substantially more often embedded
in repeated/longitudinal patterns (75.6% vs. 50.0%) and substantially
more likely to state explicit motive/reasoning/emotion (20.0% vs. 8.3%)
than Session 15's evidence, which instead clusters more heavily around
single, high-stakes, vivid moments (50.0% vs. 20.0% high-stakes). This
is a genuinely different axis from diagnostic CLASS (A/B/C/D) — an
episode can be A-classed (highly diagnostic) whether it is a single
dramatic moment or part of a five-decade pattern; class does not
capture which. This audit's own quantitative result therefore points
toward a REVISED hypothesis for a future session, stated carefully as
exploratory and NOT confirmed here: **Session 13's row-count advantage
may come not from having more diagnostically valuable evidence, but
from having evidence more STRUCTURALLY AMENABLE to supporting multiple
independent trait rows from the same underlying episode cluster** (a
single "repeated pattern across three decades" fact can plausibly
motivate both an autonomy_need row and a decisiveness row; a five-step
dated belief-reversal arc can plausibly motivate both an
independent_thinking row and a belief_updating row with different
evidentiary detail drawn from different steps of the same arc) — which
would also be consistent with, and would refine rather than contradict,
Session 16's own finding (§82 item 17 of the checkpoint) that
multi-trait conversion discipline is a real but small (9.4%)
contributing factor to the row-count gap. This audit did not itself
measure row-conversion rates (that is Session 16's instrument, not this
one) and did not run `eligibility_v2` or modify any row — this remains
a hypothesis for a future session to test directly, not a finding this
audit established.

## 11. Remaining confounds

- **n=2 per group.** Every group-level percentage above is illustrative,
  not statistically established, exactly as the session's own governing
  instructions require it be treated. A single additional candidate on
  either side could shift the pooled percentages by several points.
- **Symmetric reconstruction contamination (§9)**, while found to be
  fairer than originally anticipated, is still a real limitation on
  BOTH sides — a true blind trial (Session 16's own recommendation,
  never yet run for any of these four) remains the only way to fully
  rule out trait-conditioned narration inflating apparent diagnostic
  richness for all four candidates roughly in step.
- **Classifier is a single agent session, not multiple independent
  raters.** No inter-rater reliability check was possible within this
  session's scope; the cross-consistency checks in §8 are a partial
  substitute (checking the SAME rater's own consistency across
  candidates) but not equivalent to a true second rater.
- **The revised structural hypothesis in §10 is exploratory.** It was
  formed by inspecting this audit's own locked classification data
  after the fact, which is legitimate (the rubric's class/context/
  structure fields were locked before any cross-group comparison was
  computed, per `CLASSIFICATION_LOCK.md`), but the hypothesis itself
  was not itself pre-registered before classification began, and should
  be treated as a new candidate explanation to test, not a confirmed
  mechanism.
