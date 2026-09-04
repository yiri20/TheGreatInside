# Roster Expansion 125 — Evidence-Deepening Batch 2 Report + Track B Roll-Up (DRAFT)

**Status: PRODUCTION WORK, NOT COMMITTED.** 7 additional `data-pipeline/
candidates/*.json` files edited this session (evidence + rows only). No
roster/editorial/portrait files touched, no `src/` changes, nothing
promoted into the live roster, nothing committed to git. This closes out
Track B (all 11 RECOVERABLE candidates from the held-candidate audit).
Tracks A/C/D not started. Stopping here for review.

## 0. Checkpoint-integrity questions resolved first (before any new edits)

Both answered by inspecting the actual repository, not by naming
convention — full detail added to
[`roster-expansion-125-evidence-deepening-batch1-DRAFT.md`](roster-expansion-125-evidence-deepening-batch1-DRAFT.md)
§5b and §8:

1. **`eligible=true` vs. `qa_passed`**: cross-tabulated status against the
   live validator's computed `eligible` field. **Corrected on a later
   review** (see below, and the fuller fix now in Batch 1's own §5b): the
   original 105+61=166 tally was one short of the full 167-file corpus.
   The gap was in the cross-tab method, not the data — `sitting-bull.json`
   (`held`, `rows: {}`, a deliberate pre-scoring "EARLY HOLD") is the one
   candidate the validator's own code never prints an `eligible` line for
   at all, since eligibility isn't computed for a zero-row candidate.
   Direct file tally: 106 `held` + 61 `qa_passed` = 167, exact. The
   supportable claim: **among the 166 candidates with at least one scored
   row, `qa_passed` ⟺ `eligible: true` holds with zero exceptions.** The
   167th is `held` for an earlier-pipeline-stage reason, not a computed
   ineligibility. Separately confirmed 45 of the 61 `qa_passed` candidates
   lack `ko-KR` localization, so `qa_passed` does not require the
   README's later-numbered localization/portrait steps first. **Makeba's
   `qa_passed` status was, and remains, correct. No change.**
2. **Batch 1 file-accounting**: corrected to an exact, categorized list
   (4 candidate files modified + 1 pre-existing checkpoint file edited +
   1 new checkpoint file created) — see the linked report's §8. The prior
   closing chat summary's sentence undercounted by not naming the new
   report file in that specific sentence; the file itself always listed
   it. Same exact-accounting discipline applied to this batch in §8 below.

## 1. Remaining RECOVERABLE candidates, identified directly from the audit

Per the held-candidate-evidence audit's §5 table (not reconstructed from
memory): **11 RECOVERABLE total.** Batch 1 processed 4 (Tutu, Makeba,
García Márquez, Tabei). **Remaining 7, read directly from §5's list in
original order**: Saladin, Golda Meir, Sun Yat-sen, José Martí, Kwame
Nkrumah, Naguib Mahfouz, Simone de Beauvoir. Matches the expected count of
seven exactly.

Split into 2 coherent sub-batches (the audit's own §13 groups all 11
together without further subdivision, so this split is mine, for
manageable session size, not a deviation from a more specific existing
grouping):
- **Batch 2a**: Saladin, Golda Meir, Sun Yat-sen, José Martí.
- **Batch 2b**: Kwame Nkrumah, Naguib Mahfouz, Simone de Beauvoir.

## 2. Batch 2a — sources read, evidence found, edits made

- **Saladin**: added Anne-Marie Eddé's modern scholarly biography
  (*Saladin*, Harvard/Belknap 2011, verified real) and the July 1187
  execution of Reynald de Chatillon — a specific, dated episode
  independently corroborated across the Muslim-chronicle tradition (Imad
  ad-Din, Ibn al-Athir), distinct from the Baha ad-Din source already on
  file. Upgraded `decisiveness` (2nd independent documented instance) and
  `conflict_tolerance` (a specific instance replacing a generic
  duration-based inference). **Preserved the real tension rather than
  smoothing it**: marked `conflict_tolerance` `dual_edged` and explicitly
  noted the same episode is the historical root of later Western
  "chivalry" romanticization this project must not launder uncritically.
- **Golda Meir**: added Klagsbrun's *Lioness* (2017) and the declassified
  1973 Yom Kippur War intelligence record (Times of Israel, Haaretz, BESA
  Center). Found a genuine **contradiction**, not corroboration: despite
  an October 5 Mossad warning and a secret King Hussein warning, she did
  not order a preemptive strike, and is quoted attributing the failure to
  "a lack of knowledge and a lack of expertise." Per the rubric's own
  contradictory-evidence guidance, `decisiveness` was **weakened**
  (score 70→60, confidence 0.4→0.35), not averaged into a false middle —
  read as a genuine possible change in decision-making under pressure
  across a 25-year span, marked `dual_edged`. This is the one row in this
  whole session where evidence pointed the confidence *down*.
- **Sun Yat-sen**: added his own 1897 *Kidnapped in London* (written
  himself, with collaborators, within weeks of the 1896 captivity) and a
  2021 *Journal of Modern Chinese History* scholarly analysis of its
  strategic use. Careful not to double-count the same 1896 anecdote
  already used for `risk_tolerance` — the genuinely new fact is that he
  *authored and rapidly published* the account himself, a distinct,
  different-domain instance. Upgraded `opportunity_sensing` (2nd
  instance, 15 years before the 1911 Wuchang-timing example already
  scored) and `persuasiveness` (a concrete persuasive-writing outcome,
  not just fundraising totals).
- **José Martí**: added López's 2014 biography (its own Miami New Times
  review was inaccessible, 403 — disclosed rather than substituted with a
  guess) and independent Cuban historical-heritage records on his wife
  Carmen Zayas-Bazán and their 1891 permanent estrangement. Upgraded
  `impact_motivation` with a specific, costly, personal-domain instance —
  marked `dual_edged` rather than pure heroism, since the same dedication
  documented to cost him his family is not smoothed into an unqualified
  positive.

## 3. Batch 2b — sources read, evidence found, edits made

- **Kwame Nkrumah**: added Basil Davidson's *Black Star* (1973, written
  by a personal friend, not a hagiography). Upgraded `collaboration` with
  a specific, different-domain instance: negotiated compromises directly
  with British colonial authorities, not just internal coalition-building.
  Davidson's own discussion of the post-1960 "corruption, autocratic
  tendencies" was deliberately **not** used — this file already has an
  established, deliberate scope boundary excluding that period (outcomes
  not read backward into traits), and this pass preserved it rather than
  reopening it.
- **Naguib Mahfouz**: added El-Enany's scholarly biography (verified real
  in the prior audit turn) and press/literary-history coverage of his
  personal daily-life routine. Upgraded `persistence` (a second,
  personal-domain instance: resumed nightly café gatherings after the
  1994 attack, not just literary output) and `curiosity` (his own 1951
  quoted admission of habitually observing/fictionalizing acquaintances —
  a first-person, on-point fact replacing a generic career-breadth
  inference).
- **Simone de Beauvoir**: added Deirdre Bair's independent 1990 biography
  (5 years of interviews with de Beauvoir herself) — exactly the
  independent, non-self-authored corroboration the SS76 multi-instance
  standard requires. Upgraded `adaptability` (documented parallel
  long-term relationships alongside Sartre, corroborated by both her own
  Algren correspondence and Bair). **Also found a genuine complication**:
  Bair documents she "guarded Sartre jealously" despite the relationship's
  stated openness — `autonomy_need`'s rationale was enriched to preserve
  this tension explicitly; its score/confidence were deliberately left
  unchanged, since the enrichment doesn't newly justify moving either
  number, only telling the fuller honest story.

## 4. Candidates/rows with no material change (reported, not hidden)

- Every row not named above, across all 7 candidates, was left untouched
  — no new evidence was found this pass that bore on them.
- Bergère's full 1998 Sun Yat-sen biography and López's Miami New Times
  review were both identified as valuable but **not actually mined** this
  pass (secondary discussion only, or inaccessible) — disclosed as real
  limitations rather than papered over with an assumed reading.

## 5. Validator results (real, computed once per sub-batch, never mid-edit)

| Candidate | Scored | avgConf (before → after) | Coverage | Eligible? | Status |
|---|---|---|---|---|---|
| Saladin | 20 | 0.505 → 0.526 | 0.599 | false | held (unchanged) |
| Golda Meir | 19 | 0.448 → 0.446 | 0.569 | false | held (unchanged) |
| Sun Yat-sen | 19 | 0.464 → 0.476 | 0.572 | false | held (unchanged) |
| José Martí | 18 | 0.463 → 0.477 | 0.539 | false | held (unchanged) |
| Kwame Nkrumah | 21 | 0.503 → 0.509 | 0.635 | false | held (unchanged) |
| Naguib Mahfouz | 20 | 0.504 → 0.518 | 0.604 | false | held (unchanged) |
| Simone de Beauvoir | 21 | 0.484 → 0.490 | 0.634 | false | held (unchanged) |

**0 of 7 crossed the eligibility floor this batch.** Corpus-wide: `held`
106, `qa_passed` 61 (unchanged from post-Batch-1) — 0 errors, 0 warnings.
This is the honest, unforced result: 6 of 7 improved modestly, 1 (Golda
Meir) had one row genuinely weaken. No further remediation round was run
on any of the 7 to chase the floor.

## 6. Confirmation: searches were by life period/source type, not by trait

Every search this session named a person, an episode/period, and a source
type ("Saladin clemency Jerusalem 1187... specific episode," "Golda Meir
Yom Kippur War 1973 decision intelligence warning," "Kidnapped in London
own account 1896," "Kwame Nkrumah Black Star personal character
decisions," "Naguib Mahfouz interviews café... anecdote," "Deirdre Bair
Simone de Beauvoir... personal conflict Sartre relationship") — never
"evidence that X was decisive" or any attribute-shaped query. Candidate
files' existing scores were read only to know what already existed before
editing, never to target a weak cell.

## 7. Track B roll-up — all 11 RECOVERABLE candidates

| Candidate | Batch | Rows changed | Direction | Result | Original RECOVERABLE diagnosis validated? |
|---|---|---|---|---|---|
| Desmond Tutu | 1 | 3 upgraded | up | held, improved (0.495→0.511) | Yes |
| Miriam Makeba | 1 | 3 upgraded | up | **eligible, qa_passed** | Yes — strongest case |
| Gabriel García Márquez | 1 | 1 upgraded + 2 new rows | up | held, improved (coverage 0.607→0.664) | Yes |
| Junko Tabei | 1 | 2 upgraded + 1 new row | up | held, improved (0.495→0.507) | Yes |
| Saladin | 2a | 2 upgraded | up | held, improved (0.505→0.526) | Yes |
| Golda Meir | 2a | 1 changed | **down** | held, ~flat (0.448→0.446) | Yes, but with a genuine new complication found |
| Sun Yat-sen | 2a | 2 upgraded | up | held, improved (0.464→0.476) | Yes |
| José Martí | 2a | 1 upgraded | up | held, improved (0.463→0.477) | Yes |
| Kwame Nkrumah | 2b | 1 upgraded | up | held, improved (0.503→0.509) | Yes |
| Naguib Mahfouz | 2b | 2 upgraded | up | held, improved (0.504→0.518) | Yes |
| Simone de Beauvoir | 2b | 1 upgraded + 1 enriched | up | held, improved (0.484→0.490) | Yes |

**Roll-up totals: 1 of 11 became eligible; 10 of 11 remain held; 0 of 11
had zero material change (every candidate had at least one row or its
source list genuinely touched); 0 of 11 newly appear structurally thin —
every RECOVERABLE diagnosis from the audit is validated by this pass, not
contradicted.** The one candidate with a weakened row (Golda Meir) is not
a diagnosis failure — the audit correctly identified her as RECOVERABLE
(real additional sources existed), it simply didn't and couldn't predict
which direction new evidence would point once actually read.

**Unresolved evidence gaps, named honestly**: Saladin's evidence beyond
this pass is genre-limited (chronicle sources rarely capture private
behavior); Golda Meir, Sun Yat-sen, and José Martí all still have
real, un-mined depth in their named sources (Klagsbrun, Bergère, López)
beyond what one focused pass could cover; Kwame Nkrumah and Naguib Mahfouz
are close enough to the floor (avgConf 0.51-0.52 on the raw metric) that
one more well-targeted source could plausibly close the gap in a future
pass; Simone de Beauvoir's 4-volume memoir remains the single largest
still-under-mined primary corpus in the whole Track B set.

## 8. Exact file accounting (this session, Batch 2 only — no approximate counts)

Verified against `git status`/`git diff --stat`.

**Modified (candidate files, 7):**
- `data-pipeline/candidates/saladin.json`
- `data-pipeline/candidates/golda-meir.json`
- `data-pipeline/candidates/sun-yat-sen.json`
- `data-pipeline/candidates/jose-marti.json`
- `data-pipeline/candidates/kwame-nkrumah.json`
- `data-pipeline/candidates/naguib-mahfouz.json`
- `data-pipeline/candidates/simone-de-beauvoir.json`

**Modified, not by this task's work (pre-existing, unrelated):**
- `next-env.d.ts`

**New this session (checkpoint/report file, 1):**
- `docs/checkpoints/roster-expansion-125-evidence-deepening-batch2-DRAFT.md`
  (this file)

**Edited this session (checkpoint file, 1, from §0):**
- `docs/checkpoints/roster-expansion-125-evidence-deepening-batch1-DRAFT.md`
  (added §5b and the corrected §8)

**Cumulative across both Batch 1 and Batch 2 sessions**: 11 candidate
files modified in total (the full RECOVERABLE set), 1 unrelated
pre-existing file (`next-env.d.ts`), 4 checkpoint/report files untracked
in git (3 pre-date this Track B work; 2 were created/edited across the
two Batch sessions specifically for this work). No roster, editorial,
portrait, or `src/` file touched by any of this. Nothing committed.

## 9. Tests/validation performed

- `node -e "JSON.parse(...)"` on all 7 newly-edited files — valid JSON.
- `corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts` —
  full 167-candidate corpus, run once after all Batch 2 edits were
  finalized: **0 errors, 0 warnings**; status tally unchanged from
  post-Batch-1 (`held` 106, `qa_passed` 61) — confirming no unrelated
  candidate's computed eligibility shifted.
- Not run: `tsc`/`vitest`/`next build` — same reasoning as Batch 1, this
  work touches only `data-pipeline/candidates/*.json`.

## 10. Final verdict for this checkpoint

**Track B complete.** All 11 RECOVERABLE candidates from the held-
candidate audit have now been processed. 1 crossed the eligibility floor
(Miriam Makeba, correctly moved to `qa_passed`, not promoted into the live
roster). 10 remain `held`, all with real, disclosed, honest improvement
or — in one case — a genuine, preserved weakening. Tracks A (12 fresh
READY), C (3 possibly-recoverable), and D (4 fresh evidence-pack
candidates) are explicitly **not started**. Stopping here for review
before any of those, per the brief.
