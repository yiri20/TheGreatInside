# Roster Expansion 125 — Evidence-Deepening Batch 1 Report (DRAFT)

**Status: PRODUCTION WORK, NOT COMMITTED.** 4 `data-pipeline/candidates/*.json`
files edited (evidence + scores only). No roster/editorial/portrait files
touched, no `src/` changes, nothing promoted into the live roster, nothing
committed to git. Stopping here for review per the brief, before Tracks A/C/D
or any alternate swap.

## 0. Checkpoint cleanup (done first, as requested)

Corrected in
[`roster-expansion-125-held-candidate-evidence-audit-DRAFT.md`](roster-expansion-125-held-candidate-evidence-audit-DRAFT.md):
- Made the READY-vs-NEEDS-EVIDENCE-PACK definition explicit (was implicit).
- Fixed the Haile Selassie/Akbar cross-reference that could read as list
  contamination; added an unambiguous one-line statement of the exact 4
  Track D names (Kartini, Akbar, Ashoka, Spinoza).
- **Found and corrected a real discrepancy**: Akbar's original reasoning
  claimed no independent (non-court) source had been identified. Verified
  this session that one exists and is well-documented — Antonio
  Monserrate's *Commentary* (Jesuit priest, 2 years at Akbar's court,
  1580-82, LOC/Internet Archive record confirmed). Classification stays
  NEEDS EVIDENCE PACK (the source hasn't actually been mined yet), but the
  stated reason is corrected rather than left wrong.

## 1. Scope of this batch

Chose Track B's 4 explicitly-highlighted candidates (Tutu, Makeba, García
Márquez, Tabei) as one coherent, well-bounded batch, rather than
attempting all 4 tracks (30 candidates) in one pass. Each had exactly one
clearly-identified, high-confidence primary source named in the audit.
Tracks A (12 fresh READY), C (3 possibly-recoverable), and D (4 fresh
evidence-pack) are **not** started — genuinely fresh scoring-from-zero or
structurally-harder research needs its own batch, not a rushed extension
of this one.

## 2. Sources actually found and added (verified, not assumed)

- **Miriam Makeba**: her own memoir *Makeba: My Story* (1988, with James
  Hall) — added to `sources` (it was already referenced in one existing
  rationale but had never actually been listed as a source, a pre-existing
  inconsistency now fixed). Full text not accessible (Internet Archive
  lending-restricted, confirmed via WebFetch); found instead a
  peer-reviewed scholarly source, *Safundi* 17(3) 2016, "A marriage of
  inconvenience," specifically about the 1968 Stokely Carmichael marriage
  and its documented career consequences.
- **Desmond Tutu**: his own *No Future Without Forgiveness* (1999) added
  as a source; plus two independent press sources (IOL/SAHA on the
  specific, dated April 1996 Malgas TRC testimony; News24's 2021
  obituary characterizing his career-long, not just post-1994, friction
  with both the National Party and the ANC).
- **Gabriel García Márquez**: no new primary text obtained (his memoir
  was already listed as a source but the file's own hold reason admitted
  it hadn't been mined in depth) — added two independent secondary
  sources that quote/discuss it directly: NYRB's "Ghosts of Aracataca"
  (2023) and Paris Review's coverage of Paternostro's oral biography,
  both distinguishing his own first-person quotes from biographer
  testimony.
- **Junko Tabei**: *Honouring High Places: The Mountain Life of Junko
  Tabei* (Rocky Mountain Books, 2017) — verified real and confirmed
  compiled directly from her own Japanese memoirs (title, authors,
  translators, publisher all confirmed via search); added, plus an
  American Alpine Club review summarizing its content.

No source was invented, approximated, or normalized from an uncertain
guess. No attribute-targeted search was run for any of the 4 (see §6).

## 3. Evidence and score changes

| Candidate | Rows changed | New rows added | Nature of change |
|---|---|---|---|
| Miriam Makeba | `risk_tolerance`, `independent_thinking`, `autonomy_need` | 0 | A second independent documented instance (the 1968 marriage) now corroborates the previously-single-instance 1963 UN testimony on 2 rows; `autonomy_need` moved inference->strong_inference on the same basis |
| Desmond Tutu | `autonomy_need`, `independent_thinking`, `discipline` | 0 | Independent press corroboration of a career-long (not just post-1994) pattern; `discipline` re-grounded in a specific documented episode (one public tear across 2 years of hearings) replacing a generic duration-based inference |
| Gabriel García Márquez | `creative_originality` | `intuitive_synthesis`, `opportunity_sensing` | His own direct quote about modeling his prose voice on his grandmother's storytelling — a genuinely new, on-point primary-source instance |
| Junko Tabei | `persistence`, `independent_thinking` | `cross_domain_range` | A second, temporally-earlier documented instance (childhood) now corroborates the previously-adult-only-instance record |

All score movements were modest (score itself changed by 0-4 points where
it changed at all; the real movement was in `confidence`/`evidenceType`,
exactly as the rubric requires — evidence quality, not score, is what
changed). Every changed row is labeled `[NEW_EVIDENCE, this session]` in
its own `rationale`, and each file's `provenance.notes` records what was
added, what was deliberately left alone, and why.

## 4. Candidates whose scores did NOT change (reported, not hidden)

- **Makeba**: `collaboration` was investigated and deliberately left
  alone — the memoir is reported (via secondary review, not read
  directly) to cover "interpersonal challenges," but no specific episode
  was actually found this pass. Raising confidence there would not have
  been evidence-grounded.
- **Tutu**: the specific, well-corroborated Malgas-testimony/weeping
  episode does not map cleanly onto any of the 34 attributes (no
  "emotional expressiveness" trait exists in this taxonomy) — used only
  as supporting context for `discipline`, not forced into a new row.
- **García Márquez / Tabei**: every other previously-scored row (17 and
  19 respectively) was left untouched — no new evidence was found this
  pass that bore on them, and none was manufactured to justify a change.

## 5. Result (from the real validator, not a manual estimate)

Ran `src/dev/roster1000/validateCandidates.ts` once, after all edits were
finalized — never mid-edit, never re-run to chase a number:

| Candidate | Scored | avgConf | Coverage | Eligible? | Status change |
|---|---|---|---|---|---|
| Miriam Makeba | 20 | 0.549 | 0.606 | **true** | `held` → `qa_passed` |
| Desmond Tutu | 21 | 0.511 | 0.629 | false | unchanged, still `held` |
| Gabriel García Márquez | 22 (+2) | 0.505 | 0.664 | false | unchanged, still `held` |
| Junko Tabei | 22 (+1) | 0.507 | 0.663 | false | unchanged, still `held` |

**1 of 4 crossed the eligibility floor; 3 did not.** This is reported as
the genuine, unforced result — no further remediation round was attempted
on the 3 that stayed held, per the explicit instruction not to optimize
research toward promotion. Makeba's case is a clean example of the
process working as intended: a real historical fact (already scholarly-
documented, previously just never looked for) supplied genuine multi-
instance corroboration for 2 already-scored traits, crossing the floor
honestly.

## 5b. Checkpoint-integrity verification (added on review, before Batch 2)

**Question: was `held` → `qa_passed` the mechanically/procedurally correct
move once `eligible: true` was computed, or does this repo separate
eligibility from QA status?** Verified against the actual repository, not
inferred from naming:

- `candidateSchema.ts`'s `CandidateStatus` union and
  `data-pipeline/candidates/README.md`'s workflow both list `qa_passed` as
  the status reached once the validator is run and the result is clean;
  `held`/`rejected` are the alternative branch when the evidence bar
  isn't cleared. The README's own step 7 reads directly against step 6:
  "if a candidate cannot clear the evidence bar... set held... Move to
  qa_passed once it reports zero errors" — i.e. eligibility failure *is*
  what step 6's "errors" means in practice, not a separate later gate.
- **Empirically confirmed against the full, live corpus, corrected on
  later review** (see the follow-up checkpoint's own accounting
  discrepancy fix): ran `validateCandidates.ts` once and cross-tabulated
  every printed `status`/`eligible` pair. The first pass at this
  cross-tab reported 105 `held` + 61 `qa_passed` = 166, one short of the
  167-file corpus — that gap was a flaw in the cross-tab script, not in
  the underlying data: it only counted a candidate when the validator
  printed an `eligibility: ...` line, and the validator's own code
  (`rowIsScoreable()` in `validateCandidates.ts`) deliberately skips that
  line whenever a candidate has zero scored rows. Exactly one candidate
  is in that state: **`sitting-bull.json`, status `held`, `rows: {}`** —
  a deliberate "EARLY HOLD, before any trait scoring was attempted" per
  its own `holdReason` (Session 7's evidence-richness-before-scoring
  discipline: Sitting Bull's standard biography is oral-history-derived
  from ~40 years post-mortem, and even his birth location/remains'
  identity carry disputed provenance — scoring was deliberately never
  attempted). Direct file-status tally: **106 `held` + 61 `qa_passed` =
  167, exact.** The correct, fully-supportable claim: **among the 166
  candidates with at least one scored attribute, `qa_passed` ⟺
  `eligible: true` holds with zero exceptions in either direction** (61
  `qa_passed`, all `eligible: true`; 105 `held`-with-rows, all `eligible:
  false`). The 167th (Sitting Bull) is `held` for a categorically
  different, earlier-pipeline-stage reason — never scored, so eligibility
  was never computed for it at all, not computed-and-failed. This is
  consistent with, not a counterexample to, the convention, but the
  original claim of "zero mismatches across all 167" overstated the
  verified scope by one file.
- Separately checked whether `qa_passed` also requires the README's
  earlier-numbered `localized`/`portrait_pending` steps to be done first:
  **45 of the 61 existing `qa_passed` candidates have no `ko-KR`
  localization at all** in their file. So no — those steps are evidently
  handled later in practice (at actual roster promotion/localization
  time), not as a precondition for `qa_passed` at the candidate-file
  stage. Makeba lacking `localization`/`portrait` is consistent with the
  other 45, not an anomaly.

**Conclusion: Miriam Makeba's `qa_passed` status is mechanically and
procedurally correct as-is. No change made — leaving her unchanged, per
the instruction not to manually alter scores/eligibility to resolve a
status-model question that the repository's own convention already
answers cleanly.**

## 6. Confirmation: no score-targeted searching occurred

Every search this session was framed by life period and source type
("Miriam Makeba marriage Stokely Carmichael career consequence," "Desmond
Tutu TRC hearing wept testimony ANC conflict," "García Márquez Living to
Tell the Tale El Espectador journalism grandmother," "Junko Tabei
Honouring High Places review personal reflections") — never by attribute
("evidence that X was persistent"). Candidate files' numeric
`score`/`confidence` values were read only to identify which rows already
existed before editing; no search was run to target a specific weak or
empty cell.

## 7. Unresolved evidence ceilings / no new structurally-thin findings

Nothing in this batch newly appears structurally thin — Tutu, García
Márquez, and Tabei all remain exactly where the prior audit classified
them (RECOVERABLE, still short of the floor, not dead). No candidate here
warrants a swap-against-alternates discussion per this batch's result.

## 8. Exact file accounting (corrected on review — no approximate counts)

Verified directly against `git status`/`git diff --stat`, not summarized
from memory.

**Modified (pre-existing, tracked files — 4 candidate files):**
- `data-pipeline/candidates/miriam-makeba.json`
- `data-pipeline/candidates/desmond-tutu.json`
- `data-pipeline/candidates/gabriel-garcia-marquez.json`
- `data-pipeline/candidates/junko-tabei.json`

**Modified, but NOT by this task's work (pre-existing in the working tree
before this whole roster-expansion series began):**
- `next-env.d.ts` — unrelated, untouched by any roster-expansion turn;
  listed here only for completeness since `git status` shows it modified.

**Newly created (untracked — 4 checkpoint/report files, none of them
candidate data):**
- `docs/checkpoints/roster-expansion-125-candidate-audit-DRAFT.md` —
  audit #1 (candidate pool/selection), created in an earlier turn, not
  touched this session.
- `docs/checkpoints/roster-expansion-125-selection-closure-audit-DRAFT.md`
  — audit #2 (closure/political-policy), created in an earlier turn, not
  touched this session.
- `docs/checkpoints/roster-expansion-125-held-candidate-evidence-audit-DRAFT.md`
  — audit #3 (this document's parent), created in an earlier turn, **edited
  this session** for the §0 cleanup corrections.
- `docs/checkpoints/roster-expansion-125-evidence-deepening-batch1-DRAFT.md`
  — this file, newly created this session.

**Total this session: 4 files modified (all candidate JSON), 1
pre-existing untracked file edited (the held-candidate audit, cleanup
only), 1 new file created (this report).** The prior closing summary's
sentence "only the 4 candidate files and the one audit-cleanup file were
touched" was imprecise — it did not separately name this report file
(mentioned elsewhere in that turn, but not in that specific enumeration).
Corrected here with an exact, categorized list rather than a repeated
approximate count. `git status`/`git diff --stat` confirm no unrelated
candidate or roster file was modified.

## 9. Tests/validation performed

- `node -e "JSON.parse(...)"` on all 4 edited files — valid JSON.
- `corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts` —
  full 167-candidate corpus, **0 errors, 0 warnings**; `held` count
  106 (was 107), `qa_passed` count 61 (was 60) — exactly the one Makeba
  change, no unrelated candidate's computed eligibility shifted.
- Not run: `tsc`/`vitest`/`next build` — this batch touched only
  `data-pipeline/candidates/*.json`, which nothing in `src/`/`app/`
  imports; those gates are unaffected and were not re-run.

## Next steps (not started — awaiting review)

- Track A (12 fresh READY candidates) — genuinely fresh Protocol v1
  scoring from zero, a separate batch.
- Track C (3 possibly-recoverable held candidates: Al-Biruni,
  Chien-Shiung Wu, Ibn Battuta) — targeted, ceiling-testing research.
- Track D (4 fresh evidence-pack candidates: Kartini, Akbar, Ashoka,
  Spinoza) — pack-first, score-second.
- Remaining Track B candidates (Saladin, Golda Meir, Sun Yat-sen, José
  Martí, Kwame Nkrumah, Naguib Mahfouz, Simone de Beauvoir) — same
  "deepen the already-cited source" pattern as this batch.
- Miriam Makeba's promotion into a real roster file (`toPersonSeed` +
  `roster3.ts`-style commit + people-index regeneration) is a distinct,
  later, human-approved step — not taken here.
