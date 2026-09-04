# Roster Expansion 125 — Track A First-Scoring Checkpoint + Full 30-Primary Roll-Up (DRAFT)

**Status: PRODUCTION WORK, NOT COMMITTED.** 12 new `data-pipeline/
candidates/*.json` files created with genuine first-time Protocol v1
scoring. No roster/editorial/portrait files touched, no `src/` changes,
nothing promoted, nothing committed. This closes out Track A and the
full evidence-deepening/first-scoring phase across all 30 primaries.

---

## 0. Wording-integrity checks (done first, no new research, no score changes)

Three checkpoint-language corrections, all wording-only:

1. **Ibn Battuta** (`track-c-structural-ceiling`, §4b): added an explicit
   correction stating this is NOT "single primary source ⟹ structurally
   thin" as a general rule. The disposition rests on the specific
   conjunction of five factors (controlled/dictated genre, confirmed
   self-presentation risk in the source itself, 20/21 rows with zero
   external touch, the one external source constraining only general
   context not his specific behavior, and a real failed attempt at
   independent corroboration) — not source-count alone. A rich single
   source with internal/external constraints could still support useful
   differentiation in principle; none was found here.
2. **Ashoka** (`track-d-evidence-packs`, §4): corrected "every source is
   either proclamation or legend, no personal-conduct evidence exists"
   to the precise claim: the edicts are rich contemporaneous
   policy/self-presentation evidence, independently constrained at the
   *policy* level by real archaeological/epigraphic facts, with
   personality-rich but explicitly legendary later Buddhist material —
   and the actual, narrower gap is that no independent source class
   observing his *interpersonal/private/ordinary* conduct was found.
   `STRUCTURALLY_THIN` retained on this narrower, correct basis; Ashoka
   remains unscored.
3. **Spinoza** (`track-d-evidence-packs`, §5): "multi-provenance" was not
   actually used in the prior report, but the underlying question was
   answered explicitly on review: only 2 of 18 rows rest on genuinely
   independent institutional/public records, 2 more on two-party
   correspondence (both sides survive), and the remaining 14 are
   inferences from his own documented life-pattern. The accurate
   description is **"cross-domain, firsthand-rich, with limited external
   constraint,"** not broad third-party corroboration. `READY_FOR_FIRST_SCORE`
   retained — it was never premised on the stronger claim.

**No score, confidence, evidenceType, or disposition was changed as a
result of these three checks except where explicitly stated above**
(Ibn Battuta's disposition change was already made in the prior turn and
is only re-explained here, not re-changed).

## 1. Exact Track A candidate set, extracted from the audit (not memory)

Per `roster-expansion-125-held-candidate-evidence-audit-DRAFT.md` §8/§11
(re-read this session, not reconstructed): **the exact 12 READY FOR FIRST
BLIND SCORE candidates are:**

1. José Rizal
2. Lee Kuan Yew
3. Shirin Ebadi
4. Edward Said
5. Babur
6. Ravi Shankar
7. Deng Xiaoping
8. Bob Marley
9. Sebastião Salgado
10. Haile Selassie
11. Stephen Hawking
12. Ratan Tata

**Verified the 4 Track D candidates are NOT among these 12**: Kartini,
Akbar, Ashoka, Spinoza do not appear in this list — confirmed by direct
re-read, not assumption. Track D handled them separately in the prior
turn.

**READY meaning, preserved exactly**: the candidate's existing evidence
base was sufficiently developed to enter normal Protocol v1 first scoring
without a separate preliminary evidence-pack phase. It does not mean
eligible, likely to score highly, accepted, `qa_passed`, live-roster
ready, or promotion-worthy. All 12 below confirm this distinction in
practice — 12 of 12 were genuinely scoreable, and 0 of 12 came back
eligible.

**Repository-state check, done before any edit**: confirmed via
`data-pipeline/candidates/` directory listing that none of the 12 had an
existing candidate file — all 12 were created fresh this session, none
edited from a prior version.

## 2. Batch structure used

The audit's own §14 grouping ("Round 1... split into 2 batches of 6" with
no specific membership assigned) did not specify which names go in which
batch, so this session split into 3 batches of 4 for tighter per-batch
source discipline, validating after each:

- **Batch A**: José Rizal, Lee Kuan Yew, Shirin Ebadi, Edward Said.
- **Batch B**: Babur, Ravi Shankar, Deng Xiaoping, Bob Marley.
- **Batch C**: Sebastião Salgado, Haile Selassie, Stephen Hawking, Ratan Tata.

## 3. Per-candidate summary

All 12 were fully evidence-scored (18 attributes each except Shirin Ebadi
at 15 — see below), validated once, and landed at `held` (0 eligible).
Full detail (evidence base, provenance limitations, domains,
contradictions, unscored dimensions, confidence limitations) is recorded
directly in each candidate file's `rows`/`sources`/`provenance` — not
repeated in full here to avoid duplicating ~200 rationale entries; the
table below is the audit-level summary the task asked for.

| Candidate | Scored attrs | Key domains represented | Notable contradiction/dual_edged preserved | Confidence limitation | Validator result | Lifecycle | READY classification held up? |
|---|---|---|---|---|---|---|---|
| José Rizal | 18 | medicine, literature, science, trial defense, internment | Reformist self-presentation vs. execution for a revolt he opposed (`independent_thinking`) | Most rows strong_inference/inference; only 5 documented | scored=18, avgConf=0.505, coverage=0.539, `eligible=false` | `held` | Yes |
| Lee Kuan Yew | 18 | state-building, diplomacy, family/domestic policy | Operation Coldstore detentions + sustained defamation litigation (`decisiveness`, `conflict_tolerance` dual_edged) | Policy record strong; personal-conduct record thinner | scored=18, avgConf=0.499, coverage=0.540, `eligible=false` | `held` | Yes |
| Shirin Ebadi | **15** | legal practice, human-rights advocacy | None found this pass — record is more uniformly advocacy-positive | Living-person discipline kept evidence to published tendencies only; genuinely fewer scoreable rows resulted | scored=15, avgConf=0.472, coverage=0.444, `eligible=false` | `held` | **Yes, but thinner than audit implied** — see §5 |
| Edward Said | 18 | literary theory, public advocacy, music | 2000 stone-throwing incident; PLO break (`conflict_tolerance` dual_edged) | Scholarly influence well documented; personal temperament thinner | scored=18, avgConf=0.467, coverage=0.546, `eligible=false` | `held` | Yes |
| Babur | 18 | military command, memoir-writing, natural history | Documented heavy drinking then renunciation before Khanwa (`discipline` dual_edged) | Baburnama supports strong rows; much else at inference | scored=18, avgConf=0.473, coverage=0.536, `eligible=false` | `held` | Yes |
| Ravi Shankar | 18 | performance, teaching, humanitarian organizing | None significant found | Monterey anecdote deliberately capped, not inflated | scored=18, avgConf=0.460, coverage=0.542, `eligible=false` | `held` | Yes |
| Deng Xiaoping | 18 | reform policy, diplomacy, internal party conflict | 1989 Tiananmen crackdown (`risk_tolerance`, `conflict_tolerance`, `decisiveness` all dual_edged) | Vogel's biography supports strong rows; much else inference | scored=18, avgConf=0.482, coverage=0.536, `eligible=false` | `held` | Yes |
| Bob Marley | 18 | performance, activism, illness response | Declined recommended amputation on religious grounds (`autonomy_need` dual_edged) | Public episodes well documented; working-method detail thin | scored=18, avgConf=0.468, coverage=0.549, `eligible=false` | `held` | Yes |
| Sebastião Salgado | 18 | photography, economics (early career), ecological restoration | Post-Rwanda crisis of purpose, redirected not hidden (`impact_motivation`) | Life-arc well documented; day-to-day method thinner | scored=18, avgConf=0.476, coverage=0.545, `eligible=false` | `held` | Yes |
| Haile Selassie | 18 | diplomacy, constitutional reform, religious symbolism | 1972-74 Wollo famine response, independently reported as inadequate (`impact_motivation` dual_edged) | State-curated memoir deliberately not used alone; independent press kept confidence conservative | scored=18, avgConf=0.426, coverage=0.543, `eligible=false` | `held` | Yes |
| Stephen Hawking | 18 | research, public communication, illness adaptation | Second marriage's disputed allegations deliberately excluded (see §4) | Adaptation arc very strong; ordinary working-method detail thin | scored=18, avgConf=0.466, coverage=0.536, `eligible=false` | `held` | Yes |
| Ratan Tata | 18 | corporate strategy, crisis response, governance conflict | 2016 Mistry removal; Nano's limited commercial success named directly (`decisiveness`, `conflict_tolerance` dual_edged) | Strategic decisions well documented; operational/interpersonal detail thin | scored=18, avgConf=0.441, coverage=0.531, `eligible=false` | `held` | Yes |

**12 of 12 successfully first-scored. 0 candidates' READY classification
failed outright** (no `READY_CLASSIFICATION_FAILED` case) — every one had
a genuinely usable evidence base. **1 candidate (Shirin Ebadi) is flagged
separately** below as a case where READY held up but the audit's implied
optimism about resulting coverage was not fully borne out.

## 4. Safety/discipline notes worth naming explicitly

- **Stephen Hawking**: his second marriage (to Elaine Mason) involved
  documented mistreatment allegations investigated by police but not
  prosecuted. Per this project's safety rule against inferring unproven
  behavior, this was excluded entirely from scoring in either direction —
  not treated as confirmed misconduct, and not used to imply innocence
  either. Only the first marriage's documented strain (from Jane
  Hawking's own memoir) was considered, and even that was not used to
  score any row given its sensitivity and tangential relevance.
- **Deng Xiaoping / Lee Kuan Yew / Ratan Tata**: all three carry genuinely
  controversial, well-documented episodes (Tiananmen; Operation
  Coldstore and sustained defamation litigation; the Mistry removal).
  Consistent with this project's own political-candidate admission rule
  (established in the closure audit), these were scored honestly as
  `dual_edged`/`risk` rather than omitted or softened.

## 5. Shirin Ebadi — flagged separately, not a `READY_CLASSIFICATION_FAILED`

Her evidence base was genuinely sufficient to enter normal scoring
(memoir, Nobel citation, specific documented cases like the Chain
Murders representation) — this is not a case of the audit's
characterization being wrong. But as a living person, evidence was
deliberately restricted to published-account tendencies and specific
documented professional acts (per this project's living-person
discipline), which yielded a genuinely thinner spread (15 scoreable
attributes, several rows deliberately dropped — e.g. `curiosity` — rather
than force-justified from her general professional stature) than a
historical figure with a complete retrospective life record would
support. This is reported as an honest limitation of the living-person
evidence bar interacting with a real but comparatively narrow public
record, not a failure of the READY classification itself.

## 6. Track A roll-up

- **Candidates successfully first-scored: 12 of 12.**
- **Candidates whose READY classification failed: 0.**
- **Candidates validator-eligible / `qa_passed`: 0.**
- **Candidates validator-ineligible / `held`: 12 (all of them).**
- **Candidates intentionally left unscored: 0** (Ashoka's non-scoring was
  a Track D decision, not Track A).
- **Major evidence ceilings discovered**: personal/interpersonal-conduct
  evidence is consistently thinner than public-achievement/policy
  evidence across all 12 — the same pattern found throughout Tracks B/C/D.
  No single candidate's ceiling was severe enough to warrant a
  `STRUCTURALLY_THIN` call at the Track A stage; all 12 support genuine,
  if modest, differentiation.
- **Any candidate that now appears structurally thin: none, from this
  batch.** Shirin Ebadi's thinner-than-implied coverage (§5) is a
  disclosed limitation, not a structural-thinness finding — 15 real,
  evidence-grounded attributes is still a genuine, usable profile, just a
  smaller one than the other 11.

**The number of eligible candidates (0) is not interpreted as a target or
a failure** — per instruction, this is the honest, unforced result of
applying the same evidence-first discipline used throughout this entire
phase.

## 7. Full expansion-phase diagnostic — all 30 primaries

### Track B (11 RECOVERABLE)

| Candidate | Final result |
|---|---|
| Miriam Makeba | **`qa_passed`** (eligible=true) |
| Desmond Tutu | `held`, improved |
| Gabriel García Márquez | `held`, improved (+2 rows) |
| Junko Tabei | `held`, improved (+1 row) |
| Saladin | `held`, improved |
| Golda Meir | `held`, one row genuinely weakened (honest contradiction preserved) |
| Sun Yat-sen | `held`, improved |
| José Martí | `held`, improved |
| Kwame Nkrumah | `held`, improved |
| Naguib Mahfouz | `held`, improved |
| Simone de Beauvoir | `held`, improved |

**1 of 11 crossed to eligible; 10 remain held, all genuinely improved
(bar one honest weakening).**

### Track C (3 POSSIBLY RECOVERABLE)

| Candidate | Final structural disposition |
|---|---|
| Al-Biruni | `IMPROVED_BUT_CEILING_REMAINS` |
| Chien-Shiung Wu | `IMPROVED_BUT_CEILING_REMAINS` |
| Ibn Battuta | **`STRUCTURALLY_THIN`** (revised on adversarial re-check; see §0 above for the precise, non-generalizing basis) |

### Track D (4 fresh evidence-pack candidates)

| Candidate | Evidence-pack disposition | Scored? | Result |
|---|---|---|---|
| Kartini | `READY_FOR_FIRST_SCORE` | Yes, 18 attrs | `held` |
| Akbar | `READY_FOR_FIRST_SCORE` | Yes, 18 attrs | `held` |
| Ashoka | **`STRUCTURALLY_THIN`** | **No — deliberately not scored** | n/a |
| Spinoza | `READY_FOR_FIRST_SCORE` | Yes, 18 attrs | `held` |

### Track A (12 fresh READY candidates) — this turn

All 12 scored (11 at 18 attributes, Shirin Ebadi at 15); all 12 landed at
`held`. See §3 above for the full table.

### Answering the diagnostic question directly

**After applying the same evidence standard across all 30 primaries:**

- **Adequately evidenced and scoreable, now with real scores: 29 of 30**
  (everyone except Ashoka).
- **Genuinely eligible (`qa_passed`) after this work: 1 of 30** — Miriam
  Makeba.
- **Held despite adequate, evidence-grounded scoring: 27 of 30** — 10 from
  Track B, 2 from Track C (Al-Biruni, Chien-Shiung Wu), 3 from Track D
  (Kartini, Akbar, Spinoza), 12 from Track A.
- **Genuinely blocked by structural evidence limitations: 2 of 30** — Ibn
  Battuta (`STRUCTURALLY_THIN`) and Ashoka (`STRUCTURALLY_THIN`, unscored).

**Recount for exactness**: 1 (`qa_passed`) + 27 (`held`, scored) + 2
(`STRUCTURALLY_THIN`) = 30. Confirmed exact.

## 8. Structural-thin candidates — flagged, not replaced

**Ibn Battuta and Ashoka are both `STRUCTURALLY_THIN`.** Per explicit
instruction, **no replacement or swap is performed in this turn.** Both
are recorded here as potential swap triggers for the next reviewed phase,
against the complete 30-primary picture now available, not decided
unilaterally mid-Track-A. Their existing `held` lifecycle status is
unchanged by this diagnostic label.

## 9. Validation

- `node -e "JSON.parse(...)"` on all 12 new files across all 3 batches —
  valid JSON, confirmed per-batch and in a final full re-check.
- `corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts` —
  run once per batch (3 times total) plus one final full-corpus run: **0
  errors, 0 warnings** at every run. Final corpus: 182 candidates total
  (167 original + 3 Track D + 12 Track A), status tally `held` 121,
  `qa_passed` 61 — exactly accounting for the 12 new `held` candidates on
  top of the prior 109 (106 + 3 Track D).
- Lifecycle status set mechanically from each run's own `eligible` output
  (never estimated in advance): all 12 moved from initial `"scored"` to
  `"held"` with a `holdReason`, matching the empirically-verified
  convention.
- No candidate was re-scored between validator runs to chase eligibility.
- Not run: `tsc`/`vitest`/`next build` — this work touches only
  `data-pipeline/candidates/*.json`.

## 10. Exact file accounting

**Files modified before this Track A turn (Track B + C, 14 — unchanged
this session):**
`al-biruni.json`, `chien-shiung-wu.json`, `ibn-battuta.json`,
`desmond-tutu.json`, `gabriel-garcia-marquez.json`, `golda-meir.json`,
`jose-marti.json`, `junko-tabei.json`, `kwame-nkrumah.json`,
`miriam-makeba.json`, `naguib-mahfouz.json`, `saladin.json`,
`simone-de-beauvoir.json`, `sun-yat-sen.json` (all in
`data-pipeline/candidates/`).

**Files created in the prior turn (Track D, 3 — unchanged this session):**
`data-pipeline/candidates/kartini.json`, `akbar.json`, `baruch-spinoza.json`.

**Candidate files newly created by Track A this turn (12):**
`data-pipeline/candidates/jose-rizal.json`, `lee-kuan-yew.json`,
`shirin-ebadi.json`, `edward-said.json`, `babur.json`,
`ravi-shankar.json`, `deng-xiaoping.json`, `bob-marley.json`,
`sebastiao-salgado.json`, `haile-selassie.json`, `stephen-hawking.json`,
`ratan-tata.json`.

**Checkpoint files modified by the three methodological cleanups this
turn (2):**
- `docs/checkpoints/roster-expansion-125-track-c-structural-ceiling-DRAFT.md`
  (Ibn Battuta wording precision, §0.1 above)
- `docs/checkpoints/roster-expansion-125-track-d-evidence-packs-DRAFT.md`
  (Ashoka wording precision + Spinoza provenance-precision note, §0.2/§0.3
  above)

**New Track A checkpoint/report file (1):**
- `docs/checkpoints/roster-expansion-125-track-a-first-scoring-DRAFT.md`
  (this file)

**Unrelated pre-existing file, explicitly confirmed NOT touched by this
work or any prior roster-expansion turn:**
- `next-env.d.ts`

**Untracked checkpoint files from earlier sessions, not touched this
turn (5):**
`roster-expansion-125-candidate-audit-DRAFT.md`,
`roster-expansion-125-selection-closure-audit-DRAFT.md`,
`roster-expansion-125-held-candidate-evidence-audit-DRAFT.md`,
`roster-expansion-125-evidence-deepening-batch1-DRAFT.md`,
`roster-expansion-125-evidence-deepening-batch2-DRAFT.md`.

**Track A delta this turn: 12 candidate files created, 2 checkpoint
files edited (wording only), 1 new checkpoint file created. Cumulative
across the whole roster-expansion series: 29 candidate files touched (14
modified + 3 Track D created + 12 Track A created), 1 unrelated
pre-existing file left untouched, 9 checkpoint/report files untracked in
git.** Nothing committed.

## 11. Stop condition confirmed

Ibn Battuta/Ashoka/Spinoza wording checks complete. All 12 exact Track A
READY candidates processed and first-scored. Live validation complete (0
errors/warnings throughout). This checkpoint and the full 30-primary
roll-up are written. Exact git diff/status reported above. No one
promoted into the live roster. No alternate candidates sourced. No roster
swaps performed. The next reviewed phase will decide what to do with the
2 `STRUCTURALLY_THIN` candidates (Ibn Battuta, Ashoka) and whether
alternate sourcing/swaps are now warranted against the complete picture.
