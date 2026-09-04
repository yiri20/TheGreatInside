# Roster Expansion 125 — Track C Structural-Ceiling Report (DRAFT)

**Status: PRODUCTION WORK, NOT COMMITTED.** 3 `data-pipeline/candidates/
*.json` files edited (evidence + rows only). No roster/editorial/portrait
files touched, no `src/` changes, nothing promoted, nothing committed.
Closes out Track C (the 3 POSSIBLY RECOVERABLE candidates from the
held-candidate audit). Tracks A and D **not started**.

---

## 0. 167-vs-166 accounting discrepancy — resolved before any new research

**Enumerated the actual lifecycle counts directly from all 167 files**
(not from the validator's printed output, to close the gap for good):

```
held: 106
qa_passed: 61
106 + 61 = 167  — exact, no other status value exists anywhere in the corpus
```

**The 167th file the two-status cross-tab in the prior checkpoints
missed**: `data-pipeline/candidates/sitting-bull.json` — `status: "held"`,
**`rows: {}`** (literally zero scored attributes). Its own `holdReason`
documents this as a deliberate "EARLY HOLD, before any trait scoring was
attempted" — Session 7's evidence-richness-before-scoring discipline,
applied here because Sitting Bull's standard biography (Vestal, 1932) is
oral-history-derived from roughly 40 years after his death, and even his
birth location and the identity of his own remains carry disputed
provenance. Scoring was deliberately never begun.

**Why it dropped out of the prior cross-tab, mechanically confirmed**:
`validateCandidates.ts`'s own `main()` only prints an `eligibility: ...`
line, and only calls `evaluateMatchEligibility()` at all, when
`rowIsScoreable(c)` is true — defined as `Object.keys(c.rows ?? {}).length
> 0`. For Sitting Bull that's false, so the validator prints `— sitting-
bull [held]` and nothing else, by design (running eligibility math on a
zero-row candidate isn't meaningful). The prior checkpoints' cross-tab
script counted only lines that had a following `eligibility: ...` line,
so it silently undercounted `held` by exactly one (105 instead of 106) —
a flaw in that reporting script, not a hidden inconsistency in the data,
and not a candidate that "failed to parse" or was "excluded accidentally"
in any concerning sense.

**Live validator result for Sitting Bull, confirmed this session**: no
schema errors, no eligibility line (as expected/by design), correctly
`held`.

**Corrected, fully-supportable claim** (replacing the overstated one in
both prior checkpoints, which are now themselves corrected):

> Among the 166 candidates with at least one scored attribute,
> `qa_passed` ⟺ `eligible: true` holds with zero exceptions in either
> direction (61 `qa_passed`, all `eligible: true`; 105 `held`-with-rows,
> all `eligible: false`). The 167th candidate, Sitting Bull, is `held`
> for a categorically earlier-pipeline-stage reason — scoring was never
> attempted, so eligibility was never computed for it, not
> computed-and-failed. This is consistent with, not a counterexample to,
> the convention, but a true biconditional across all 167 is not what
> the data mechanically demonstrates — 166 of 167 is.

**Makeba's conclusion is unaffected** — she has scored rows and a
computed `eligible: true`, squarely inside the 166-candidate domain where
the convention is exhaustively verified. Both `roster-expansion-125-
evidence-deepening-batch1-DRAFT.md` (§5b) and `...batch2-DRAFT.md` (§0)
have been corrected in place with this exact wording rather than left
overstated.

---

## 1. Track C objective, restated

Track B assumed a concrete missing source could probably deepen an
already-promising record. Track C tests whether Al-Biruni, Chien-Shiung
Wu, and Ibn Battuta have a **genuine structural ceiling** even after real,
targeted research — "more sources found" is explicitly not success on its
own; the question is whether the *behavioral* record widens across
contexts/time, not whether the citation count grows.

## 2. Al-Biruni

**Original evidence ceiling** (per the audit): 21 rows, avgConf 0.517.
Evidence dominated by scholarly output (a ~146-work bibliography) and
methodological statements from his own texts — almost nothing about
interpersonal conduct, patron relationships, or behavior under duress.

**Sources investigated**: his broader bibliography (Mas'udic Canon,
Chronology of Ancient Nations — not actually obtained this pass, a real
limitation); the Ibn Sina-Al-Biruni correspondence; scholarly accounts of
the 1017 Ghaznavid conquest of Khwarazm.

**Sources actually mined**:
- **Ibn Sina-Al-Biruni Correspondence** — verified real via multiple
  independent academic sources (Academia.edu review, Gale Academic
  OneFile, an IPM Monthly piece, an arXiv paper on Avicenna's astronomy)
  converging on the same account: an actual surviving epistolary exchange
  (c. 998, both men in their late teens/twenties), 10 questions on
  Aristotle's *De Caelo* and 8 on the *Physics*, with Al-Biruni recorded
  as dissatisfied with most of Ibn Sina's answers. **Provenance
  distinction**: near-contemporary, firsthand, interpersonal — a
  categorically different evidence type from his solo-authored works.
- **1017 Ghazni capture** — corroborated across MacTutor History of
  Mathematics and Syed Nomanul Haq's "Al-Biruni in chains" (a named,
  identifiable scholarly piece): taken to Mahmud of Ghazni's court,
  reportedly in chains, as a consequence of the Ghaznavid conquest of
  Khwarazm, yet subsequently given resources and producing major work
  there. **Provenance distinction**: contemporary historical/biographical
  reconstruction of a specific dated political event, not a methodological
  statement from his own writing.

**New behavioral evidence**: (1) sustained, direct interpersonal
intellectual disagreement with the era's other towering intellect,
recorded as continuing dissatisfaction rather than deference; (2) a
specific, coerced-displacement episode with a documented before/after
(captive → resourced scholar).

**Contradictions found**: none directly contradicting existing rows: the
new evidence sharpens and specifies rather than conflicts with what was
there.

**Attributes changed**: `independent_thinking` (documented 0.65→0.78, a
second independent instance), `adaptability` (strong_inference 0.44→
documented 0.62, marked `dual_edged` since this was coercion, not a freely
chosen adaptation), new row `conflict_tolerance` (strong_inference 0.5,
sustained intellectual disagreement).

**Confidence/coverage**: 21→22 scored rows.

**Validator result**: `scored=22 avgConf=0.530 coverage=0.661
eligible=false`. Improved from 0.517→0.530; still well short of 0.55.

**Lifecycle status**: unchanged, `held`.

**Track C disposition: `IMPROVED_BUT_CEILING_REMAINS`.** Real,
substantive, genuinely different-domain evidence was found and used
(interpersonal/dialectical, and displacement/coercion — exactly the two
categories this task asked me to check) — this is not a case of "more
sources found" being mistaken for success; the new material materially
widens the behavioral record. But most of the file's 22 rows still rest
on inference from his intellectual output rather than direct personal
conduct, and that pattern did not change — a 1,000-year-old polymath's
surviving record is genuinely, structurally thinner on ordinary
interpersonal behavior than a modern memoirist's, no matter how much more
digging is done. **What remains missing**: any account of his daily
working habits, treatment of students/assistants, or reaction to
professional setbacks beyond the two episodes now used.

## 3. Chien-Shiung Wu

**Original evidence ceiling**: 20 rows, avgConf 0.465. Evidence
overwhelmingly about her experimental-physics achievement (the parity
experiment, Manhattan Project work); the file's own provenance notes
already disclosed this pattern honestly before this pass began.

**Sources investigated**: a dedicated full-length biography (Tsai-Chien
Chiang's *Madame Wu Chien-Shiung*, named in the original audit) — **not
actually obtained this pass**, a real, disclosed limitation; her 1964 MIT
symposium appearance; the Michigan/Berkeley discrimination episode.

**Sources actually mined**:
- **1964 MIT "American Women in Science" symposium** — corroborated
  independently across a Stanford Physics 241 course page and multiple
  secondary biographical accounts (Matilda Project, PBS, AAUW), all
  converging on the same directly-quoted remarks. **Provenance
  distinction**: a specific, dated, quoted public statement — firsthand,
  not a biographer's paraphrase.
- **Michigan/Berkeley decision** — corroborated across The Matilda
  Project and Eileen McGinnis's biographical piece: she chose Berkeley
  specifically after learning women were barred from the University of
  Michigan student union's front door. **Provenance distinction**: a
  specific, causally-linked career decision, not a general "she faced
  discrimination" characterization.

**New behavioral evidence**: (1) a concrete institutional choice made in
direct response to a named discriminatory practice (career-decision
domain, distinct from the lab-work domain already scored); (2) sustained
public advocacy for women in science generally, not only her own
Nobel-credit grievance (a different motivational domain from what was
already scored).

**Contradictions found**: none.

**Attributes changed**: `proactive_agency` (inference 0.4→strong_inference
0.52), `social_assertiveness` (inference 0.4→strong_inference 0.55).
Deliberately did **not** touch `achievement_drive`, `discipline`, or any
row resting purely on her scientific-output record — no new personal-
domain evidence was found this pass that bore on those specifically, and
none was manufactured to justify touching them.

**Confidence/coverage**: 20 rows, unchanged count (2 existing rows
upgraded, no new row added).

**Validator result**: `scored=20 avgConf=0.479 coverage=0.604
eligible=false`. Improved from 0.465→0.479; still well short of 0.55.

**Lifecycle status**: unchanged, `held`.

**Track C disposition: `IMPROVED_BUT_CEILING_REMAINS`.** Two genuinely
new, different-domain, well-corroborated personal-behavior instances were
found — directly answering this task's own concern that "excellent
experimental physicist" not be converted into personality evidence
without behavioral support. But the improvement is modest (+0.014 avgConf)
relative to the size of the file (20 rows), because the *vast majority*
of her documented life, even after this targeted pass, remains about her
scientific achievement specifically. **What remains missing**: any
account of her actual laboratory leadership/mentoring style, professional
conflicts with colleagues, or specific migration/wartime-adaptation
episodes beyond the Michigan/Berkeley choice — the dedicated biography
that could plausibly supply these was identified but not obtained.

## 4. Ibn Battuta

**Original evidence ceiling**: 21 rows, avgConf uncorroborated by a single
stated figure in its own `holdReason` (an SS76 scoring-integrity revert
case, not a confidence-ceiling case) — single-source dependence on the
*Rihla* is the central, acknowledged structural problem.

**Sources investigated**: Ross E. Dunn's *The Adventures of Ibn Battuta*
(named in the audit); Ziauddin Barani's *Tarikh-i-Firuz Shahi* (an
independent Delhi Sultanate-era chronicle); scholarly discussion of which
Rihla claims are independently corroborable.

**Sources actually mined**:
- **Dunn's scholarly cross-referencing** — verified real via UC Press,
  Cambridge Core, JSTOR, and multiple academic reviews. Dunn's own
  assessment, found directly: the China chapters are the *least* reliable
  part of the *Rihla* (confused chronology, an inaccurate description of
  Chinese ceramics, some places "we cannot identify at all"), while the
  Maldives material is comparatively *more* credible — not because it is
  independently corroborated by a second witness, but because no
  competing period source exists to contradict it either. **This is a
  reliability calibration, not new corroborated behavioral evidence** —
  checked against the file's existing rows and confirmed none of them
  actually rest on China-specific claims, so nothing needed to be walked
  back, but nothing new was gained from Dunn beyond this calibration.
- **Barani's Tarikh-i-Firuz Shahi** — verified real (Wikipedia,
  Banglapedia). Confirms Muhammad bin Tughluq's court was genuinely
  volatile toward officials, independent of Ibn Battuta's own account.
  **Explicitly tested whether this counts as clean independent
  corroboration and found it does not**: Barani is independently
  documented to have deliberately omitted a specific incriminating episode
  about Tughluq "out of respect" for his successor — meaning even this
  "independent" source is politically constrained, not a neutral outside
  witness. It corroborates the *general* danger of that court, not Ibn
  Battuta's *specific* personal predicament in detail.
- Genuinely new detail found and usable regardless: Ibn Battuta's
  documented court jeopardy traced to two specific, separately-noted
  causes (marriage to an executed rebel's daughter; friendship with a
  politically-disengaged Sufi) — more textured than the existing generic
  "held roles in different courts" framing, though still ultimately
  self-reported.

**New behavioral evidence**: a more specific account of *why* he was in
danger at Tughluq's court, corroborated at the level of "this court was
genuinely dangerous" but not at the level of "this specific personal
episode is independently witnessed."

**Contradictions found**: none new; the existing file's own honest
low/moderate scores (`planning_orientation` 38, `conflict_tolerance` 48)
are unaffected and left as-is.

**Attributes changed**: `adaptability` (strong_inference 0.52→0.62, marked
`dual_edged`) — a sharpened version of an already-scored fact, explicitly
**not** presented as a new independent witness to a new episode.

**Confidence/coverage**: 21 rows, unchanged count — no new row added,
since no genuinely new independent episode (as opposed to added
specificity on an existing one) was found.

**Validator result**: `scored=21 avgConf=0.486 coverage=0.634
eligible=false`.

**Lifecycle status**: unchanged, `held`.

**Track C disposition, ORIGINALLY: `IMPROVED_BUT_CEILING_REMAINS`.**

## 4b. Adversarial re-check (added on review, before Track D — disposition REVISED)

Re-examined against the strict test: *despite the single-witness/source-
dependence problem, does the surviving record contain enough repeated
behavior across distinct times, places, roles, and circumstances to
support **reliable** personality differentiation?* Explicitly re-applied
without regenerating new research (none was needed — the existing record
already answers this) and without letting distance-from-the-eligibility-
floor influence the call, per this review's own instruction that
eligibility and evidence structure are different questions.

**Quantitative re-check of the file, this session**: of the 21 scored
rows, exactly **1** (`adaptability`) even mentions the one candidate
external source (Barani) at all — and that row's own rationale already
states Barani corroborates only the *general* volatility of Tughluq's
court, not Ibn Battuta's *specific* personal episode. **The other 20 of
21 rows rest on the *Rihla* alone, with no external witness whatsoever.**

Applying the three-part strongest-alternative-interpretation test named
for this check:
- Most behavioral evidence still ultimately depends on the *Rihla* —
  confirmed, and more starkly than "most": effectively all of it (20/21
  rows with zero external touch at all).
- The attempted Barani cross-check does not independently corroborate the
  specific episode — confirmed; this was already the explicit finding in
  §4 above, not a new admission.
- No new independent eyewitness to his personal behavior was found in the
  Track C pass — confirmed; Dunn recalibrates which *parts of the single
  source* are more/less reliable (a genre/reliability judgment about the
  Rihla itself), he does not supply a second witness to any episode.
- The Track C pass sharpened one row (`adaptability`) rather than
  materially diversifying the witness base — confirmed exactly as stated.

**Answer: NO.** The narrative *breadth* is real — multiple decades,
multiple courts, multiple roles (pilgrim, qadi at Delhi, qadi at the
Maldives, later travels) — but breadth of *narrated episodes* is not the
same thing as breadth of *witnesses*, and the test asks about reliable
differentiation, not narrative variety. Every one of those episodes is
filtered through one retrospective, scribe-mediated dictation (Ibn Juzayy,
c. 1355, ~15-30 years after the events, per person, with Dunn's own
assessment that some passages are demonstrably embellished). The
project's existing "thin ancient/medieval evidence" precedent (Genghis
Khan, Zheng He, Ibn Khaldun, Rumi — `scoring-rubric-v1.md` §8) does not
actually cover this case as cleanly as it first appears: Genghis Khan is
attested across multiple, mutually-independent chronicle traditions
(Mongol, Chinese, Persian) that often disagree with each other; Zheng He
has multiple separate participant-authored accounts (Ma Huan, Fei Xin,
Gong Zhen); Ibn Khaldun and Rumi are solo-authored-work cases like
Al-Biruni, a different (if also thin) evidentiary shape. **Ibn Battuta is
the one candidate in this set whose personality-relevant record is
effectively 100% single-witness self-narration** — not merely sparse, but
categorically un-triangulated. That is a source-independence problem, not
a volume problem, and Track C's own targeted research (this session's
best attempt at exactly the kind of triangulation that would resolve it)
came back empty on that specific axis.

**Precision correction (added on further review): this is NOT "single
primary source ⟹ structurally thin" as a general rule, and must not be
read that way.** The conclusion rests on the specific *combination* of
five factors, all of which have to hold together, not on source-count
alone:

1. extreme dependence on one candidate-controlled, dictated narrative
   (the *Rihla* — his own retrospective account, shaped by what he chose
   to tell his scribe);
2. strong, scholarship-identified genre and self-presentation effects
   within that source (Dunn's own finding that some passages are
   demonstrably embellished);
3. **20 of 21** scored rows resting entirely on that one source, with
   zero external touch of any kind;
4. the one candidate independent source found (Barani) constraining only
   the *general* context (Tughluq's court was genuinely dangerous), not
   Ibn Battuta's *specific* personal behavior within it;
5. targeted research this session and the prior Track C pass both failing
   to produce any independent, candidate-specific behavioral constraint —
   not for lack of trying, but because none appears to survive.

It is the conjunction of a controlled/dictated genre, confirmed
self-presentation risk, near-total single-source dependence, and a
failed independent-corroboration attempt that together leave this record
genuinely unable to distinguish Ibn Battuta's *actual* repeated behavior
from his *narrated persona* — not the mere fact that one primary source
predominates. **A single-source record is not automatically
`STRUCTURALLY_THIN`** — a sufficiently rich single source could still
support useful differentiation if other internal constraints exist (for
instance, if the source's own internal contradictions, or independently
datable/verifiable external details embedded within it, corroborated
specific behavioral claims). No such internal or external constraint was
found here after two research passes; that is the actual, narrow basis
for this disposition, and it should not be read to imply that any other
single-source-dominated candidate in this roster is automatically at
risk of the same conclusion without its own equivalent check.

**Disposition REVISED: `STRUCTURALLY_THIN`.**

Per instruction: **no score, confidence, or evidenceType value on any of
the 21 rows was altered by this re-check** — the rubric-based
per-attribute judgments from Track C remain exactly as written (including
the genuine `adaptability` upgrade, which stands on its own rubric-level
merits regardless of this higher-level disposition label). Only the
report-level structural-ceiling classification changes. `status` in the
candidate file remains `held` (unchanged — it already was `held` under
either disposition). **No replacement candidate is sourced here** — per
this task's explicit instruction, Track C/this check's purpose is
diagnosis, not replacement; that decision is left for a future,
explicitly-scoped step.

**Shared-methodology-bug check**: does this finding implicate Al-Biruni or
Chien-Shiung Wu too? **No.** Al-Biruni's Track C improvement rests in part
on the Ibn Sina correspondence — a genuine second, independent
first-person witness (Ibn Sina's own replies survive, a completely
separate historical author), which Ibn Battuta's record categorically
lacks; most of his other rows are solo-authored-work inferences (thin,
but a different, non-fictionalized-memory genre than a retrospective
travel dictation). Chien-Shiung Wu's record has the opposite shape
entirely — well externally witnessed (Atomic Heritage Foundation, an MIT
symposium independently reported by multiple parties, biographical
accounts from people other than herself) but topically narrow to her
professional achievement, not single-witness at all. Neither shares Ibn
Battuta's specific defect. **Al-Biruni and Chien-Shiung Wu are not
reopened; both remain `IMPROVED_BUT_CEILING_REMAINS` as originally
concluded.**

## 5. Compact comparison — why the three land in the same place, and where they differ

**Revised on adversarial re-check (§4b): Al-Biruni and Chien-Shiung Wu
remain `IMPROVED_BUT_CEILING_REMAINS`; Ibn Battuta is revised to
`STRUCTURALLY_THIN`.** Comparison below retained in its original form
plus the revision, since the underlying facts didn't change — only the
threshold judgment about Ibn Battuta's single-witness problem did:

| | Al-Biruni | Chien-Shiung Wu | Ibn Battuta |
|---|---|---|---|
| Root structural issue | Medieval scholar — record is almost entirely intellectual output | Modern scientist — record is almost entirely professional achievement | Single dictated travel narrative — no independent witness to most personal episodes |
| Best new evidence found | Direct interpersonal correspondence (Ibn Sina) + a specific coercion/displacement episode | A specific discrimination-response career decision + a quoted public-advocacy speech | A more specific account of *why* he was in danger at one court — but not independently witnessed |
| Was the "independent" source actually independent? | Yes — the Ibn Sina correspondence is a genuine two-party exchange | Yes — MIT symposium and the Michigan/Berkeley decision are both independently corroborated, dated facts | **No** — Barani's chronicle, the one candidate for genuine independent corroboration, is itself shown to be politically self-censored |
| Movement (avgConf) | 0.517 → 0.530 (+0.013) | 0.465 → 0.479 (+0.014) | not separately quantified pre-pass (SS76 case); post-pass 0.486 |
| Closest to lifting the ceiling? | Yes, of the three — genuinely new interpersonal-domain evidence exists and was usable | Some — genuinely new personal-domain evidence exists, but the underlying record stays achievement-heavy | No — the structural problem (single self-narrated source) is the least tractable of the three even with real effort |

None of the three came back `SUFFICIENTLY_RECOVERED`. Al-Biruni and
Chien-Shiung Wu both yielded real, usable, differently-sourced evidence
this pass (not "more citations of the same thing") and stay
`IMPROVED_BUT_CEILING_REMAINS`. Ibn Battuta also yielded real new
evidence — but on adversarial re-check (§4b), the specific *kind* of gap
(zero independent witnesses across 20 of 21 rows, not merely thin
evidence) crossed the line into `STRUCTURALLY_THIN`. This is the honest
result of applying the strict test rather than defaulting to the safer
middle label out of respect for his historical significance.

## 6. Confirmation: mined behavior first, not by desired trait

Every search this session named a person, a specific episode/relationship,
and a source type ("Al-Biruni Ibn Sina correspondence letters debate,"
"Al-Biruni Mahmud of Ghazni taken Ghazna 1017 conquest scholars
relocated," "Chien-Shiung Wu gender discrimination pay equal Berkeley
Columbia 1964 speech," "Ibn Battuta Muhammad bin Tughluq imprisoned
suspicion execution Barani independent chronicle," "Ross Dunn Adventures
of Ibn Battuta scholarly assessment which claims corroborated disputed")
— never "evidence that X was adaptable" or any attribute-shaped query.
No confidence was raised merely because another source existed — each
change is tied to a specific, named new fact, and two candidate leads
(Al-Biruni's other works, Wu's dedicated biography) were investigated and
explicitly **not** used because they weren't actually obtained this pass,
rather than assumed to contain something useful.

## 7. Validation

- `node -e "JSON.parse(...)"` on all 3 edited files — valid JSON.
- `corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts` —
  full 167-candidate corpus, run once after all Track C edits were
  finalized: **0 errors, 0 warnings**; status tally unchanged (`held`
  106, `qa_passed` 61) — no unrelated candidate's computed eligibility
  shifted, and no candidate here crossed into `qa_passed`, so no lifecycle
  status was changed this pass.
- Not run: `tsc`/`vitest`/`next build` — this work touches only
  `data-pipeline/candidates/*.json`.

## 8. Final diff accounting (exact, per `git status`/`git diff --stat`)

**Modified this session (Track C candidate files, 3):**
- `data-pipeline/candidates/al-biruni.json`
- `data-pipeline/candidates/chien-shiung-wu.json`
- `data-pipeline/candidates/ibn-battuta.json`

**Modified in prior sessions (Track B, 11 — unchanged this session, still
showing in `git status` because nothing has been committed yet):**
- `data-pipeline/candidates/desmond-tutu.json`
- `data-pipeline/candidates/gabriel-garcia-marquez.json`
- `data-pipeline/candidates/golda-meir.json`
- `data-pipeline/candidates/jose-marti.json`
- `data-pipeline/candidates/junko-tabei.json`
- `data-pipeline/candidates/kwame-nkrumah.json`
- `data-pipeline/candidates/miriam-makeba.json`
- `data-pipeline/candidates/naguib-mahfouz.json`
- `data-pipeline/candidates/saladin.json`
- `data-pipeline/candidates/simone-de-beauvoir.json`
- `data-pipeline/candidates/sun-yat-sen.json`

**`next-env.d.ts` was NOT touched by this work** (this session, or any
roster-expansion session) — it appears modified in `git status` because
it was already modified in the working tree before this whole checklist
of roster-expansion tasks began; explicitly left untouched per this
task's own instruction.

**New file created this session (checkpoint report, 1):**
- `docs/checkpoints/roster-expansion-125-track-c-structural-ceiling-DRAFT.md`
  (this file)

**Checkpoint files edited this session (2 — accounting-discrepancy fix
only, no research content changed):**
- `docs/checkpoints/roster-expansion-125-evidence-deepening-batch1-DRAFT.md`
- `docs/checkpoints/roster-expansion-125-evidence-deepening-batch2-DRAFT.md`

**Untracked checkpoint files from earlier sessions, not touched this
session (2):**
- `docs/checkpoints/roster-expansion-125-candidate-audit-DRAFT.md`
- `docs/checkpoints/roster-expansion-125-held-candidate-evidence-audit-DRAFT.md`

**Total across the whole roster-expansion series so far: 14 candidate
files modified (all 11 Track B + all 3 Track C), 1 unrelated pre-existing
file left as-is, 6 checkpoint/report files untracked in git.** Nothing
committed.

## 9. Stopping point

All 3 Track C candidates processed. 0 became eligible; all 3 remain
`held`. **Final dispositions, after the adversarial re-check added on
review: Al-Biruni and Chien-Shiung Wu — `IMPROVED_BUT_CEILING_REMAINS`;
Ibn Battuta — `STRUCTURALLY_THIN`** (revised from an initial
`IMPROVED_BUT_CEILING_REMAINS` call once the single-witness problem was
tested strictly rather than credited for narrative breadth alone). The
167-vs-166 accounting discrepancy is resolved and corrected in both prior
checkpoints. Tracks A (12 fresh READY candidates) and D (4 fresh
evidence-pack candidates: Kartini, Akbar, Ashoka, Spinoza) are explicitly
**not started**. Stopping here for review.
