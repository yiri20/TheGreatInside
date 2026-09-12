# Match-pool integrity audit (post-Roster32, 2026-09-12)

Diagnostic-only. No threshold, score, confidence, evidenceType, impact,
eligibility_v2, matching, calibration, dispersion, roster membership, or
interest-area change was made in this cycle. See
[`matchPoolIntegrityAudit.ts`](../../src/dev/roster1000/audits/matchPoolIntegrityAudit.ts)
for the reusable, read-only mechanical script this report's numbers come
from, and its companion test file for the deterministic guards (cohort
counts, lineage classification, no-mutation).

## 1. The question

Roster30-32 published 7 new evidence-approved, non-match-eligible profiles
while match-eligible has held at 127 since Roster26. Recent candidates,
researched under progressively stricter source/attribution discipline
(Roster17-23's arc), repeatedly failed `eligibility_v2`. Before spending
more research time trying to make new people cross the gate: **is the
current 127-person eligible cohort actually evidence-comparable to the
newer evidence_approved profiles under the CURRENT rubric, or is
`eligibility_v2` partly preserving a legacy cohort scored under looser
standards?**

## 2. Mechanical inventory — all 225 production people

Base: `faebd91ea9e2aa0ae987d9914ec87d9efdd6c7c4` (main, post-PR#33+PR#34).

| | count |
|---|---|
| Production | 225 |
| Directory-visible | 224 |
| Match-eligible | 127 |
| Directory-visible, non-eligible | 97 |
| — of which recent-cycle (roster24+) | 97 (100%) |

Every directory-visible non-eligible person is from Roster24+, by
construction: before the publication/match-eligibility separation
architecture (2026-09), a `held` (non-eligible) candidate could not be
published at all. This is expected, not a finding.

### Cohort comparison (computed fresh via `evaluateMatchEligibility` + the built `Person.attributes`)

| metric | 127 match-eligible | 97 recent (roster24+) non-eligible |
|---|---|---|
| median scored attributes | 22 | 18 |
| median coverage | 0.653 | 0.545 |
| median high-confidence count | 17 | 8 |
| median high-confidence average | 0.610 | 0.581 |
| median overall profile confidence | 0.572 | 0.512 |
| documented-row share | 34.5% | **41.5%** |
| strong_inference share | 41.3% | 26.8% |
| inference share | 24.2% | 31.7% |
| median sources/person | 3 | 4 |
| mean sources/person | 3.19 | 3.92 |

**This is the single most important mechanical finding.** The gap between
the two cohorts is almost entirely in *breadth* (scored-attribute count,
coverage, and above all high-confidence *count*: 17 vs 8 — roughly
double). It is **not** in per-row evidence discipline: the recent
non-eligible cohort has a **higher** documented-row share and a
comparable high-confidence *average* (0.581 vs 0.610, a 0.03 gap) and
comparable median source count (actually higher: 4 vs 3). If the legacy
cohort's rows were systematically looser, this table would show it
carrying a *lower* documented share and a *wider* high-confidence-average
gap. It doesn't. `eligibility_v2` is gating on **how much a profile
covers**, not on **how well-evidenced each covered row is**.

### Lineage breakdown of the 127 eligible

| lineage | eligible count | out of |
|---|---|---|
| roster1 (original 10, inline, no candidate JSON) | 10 | 10 |
| roster2 (+25, inline, no candidate JSON) | 24 | 25 |
| roster3 | 16 | 16 |
| roster4 | 16 | 16 |
| roster5 | 3 | 3 |
| roster6 | 5 | 5 |
| roster7 (first eligibility_v2-selected batch) | 9 | 9 |
| roster8 (session-11 confidence-inflation incident batch) | 3 | 20 |
| roster9 | 3 | 3 |
| roster10 | 5 | 5 |
| roster11 | 1 | 1 |
| roster12 | 1 | 1 |
| roster14 | 11 | 11 |
| roster15 | 8 | 8 |
| roster16 | 9 | 9 |
| roster25 | 2 | 6 |
| roster26 | 1 | 10 |
| roster27-32 | 0 | 66 |

Coarse groups: **early_hand_authored 34** (roster1+2), **historical_pipeline
90** (roster3-16, 100% of anyone ever promoted through it — before the
publication/eligibility split, only eligible candidates could be
promoted at all), **recent_cycles 3** (Bly/Jung/Guevara — already
`qa_passed` from an earlier research pass, formally promoted late).

Roster8's 3-of-20 figure is the mechanical fingerprint of the real,
documented session-11 confidence-inflation incident (17 of 20 reverted;
see `docs/checkpoints/roster.md`) — already caught and corrected years
before this audit, and the direct cause of `checkScoringLockIntegrity.ts`
existing at all.

**34 of 127 eligible people (27%) have no `data-pipeline/candidates/*.json`
file at all** — the original roster1 (10) and roster2 (24 of 25; Zheng He
is roster2's one non-eligible member) hand-authored cohort:

```
leonardo-da-vinci, marie-curie, richard-feynman, ada-lovelace, steve-jobs,
hayao-miyazaki, yi-sun-sin, frida-kahlo, serena-williams, alan-turing,
wolfgang-amadeus-mozart, ludwig-van-beethoven, nelson-mandela,
mahatma-gandhi, confucius, socrates, warren-buffett, coco-chanel,
nikola-tesla, rosalind-franklin, jane-goodall, genghis-khan, ibn-khaldun,
wangari-maathai, malala-yousafzai, bruce-lee, srinivasa-ramanujan,
toni-morrison, akira-kurosawa, benjamin-franklin, rumi, oprah-winfrey,
simone-biles, yayoi-kusama
```

This is a real, structural governance gap, independent of whether any
individual profile's evidence is actually weak: `checkScoringLockIntegrity.ts`
diffs `data-pipeline/candidates/*.json` files only, so a future edit to any
of these 34 people's confidence/evidenceType values would go completely
undetected by the project's own drift guard. Every one of them still
carries the required score/confidence/evidenceType/sourceIds/impact
fields (the schema is shared), and most carry rich inline per-attribute
rationale comments — the gap is in tooling coverage and provenance-note
discipline, not in the fields themselves being absent.

### Interest-area pools (match-eligible), for reference — unchanged by this audit

science_knowledge 53, arts_culture 49, leadership_society 44,
building_discovery 19.

## 3. Methodology chronology (from `docs/checkpoints/roster.md` and code)

| when | what changed |
|---|---|
| Roster1-2 (pre roster-1000 program) | Hand-authored directly as `PersonSeed` literals in `seed.ts`/`roster2.ts`. No candidate JSON, no schema version, no locked evidence ledger. |
| Roster-1000 sessions 1-9 | `eligibility_v1` (implicit, unversioned): a **flat, unweighted mean of confidence** across every scored attribute gated admission. |
| **Session 10 (2026-08)** | **`eligibility_v2` introduced** (`ELIGIBILITY_VERSION`, `src/core/matching/similarity.ts`): replaces the flat mean with a high-confidence-subset requirement (`count>=12`, `avgConf>=0.55` among rows at `confidence>=0.5`); `minScoredAttributes`(18)/`minCoverage`(0.6) carried over unchanged from v1. Roster7 (+9) is the first batch selected against it. |
| **Session 11 (2026-08)** | **Confirmed integrity incident**: confidence values iteratively nudged after seeing `eligibility_v2` fail, until candidates crossed the bar. 17 of 20 candidates from that batch (roster8) reverted. Directly produced the binding confidence-change policy (`NEW_EVIDENCE`/`RUBRIC_CORRECTION`/`ERROR_CORRECTION` only, never `ELIGIBILITY_REMEDIATION`) and `checkScoringLockIntegrity.ts`. |
| Session ~13-18 (roster9-16) | Candidate-pipeline JSON becomes standard. A high-water mark appears mid-arc ("Session 19" launch-expansion batch: Einstein, Pavlova, Aung San Suu Kyi, Akio Morita) using **locked, per-episode-ID evidence ledgers** (25-45 named episodes each) — arguably *more* granular than later practice, which cites source IDs but not individual episode IDs. Session 18 formally freezes the Roster Research & Scoring Protocol v1. |
| Roster17 (2026-09) | John von Neumann promoted then **reverted**: provenance overstated its own methodology (claimed sources never actually opened), 16 of 23 rows re-derived from the same 2-4 facts (duplicated-behavior pattern). 6 others held purely on attribute-count/coverage from a shallower single-source pass. |
| Roster18 | New rule: >=2 genuinely independent, actually-opened sources (Wikipedia orientation-only). All 8 frozen candidates scored 8-14 attributes; zero promotions. |
| Roster19-20 | Progressively stricter pre-freeze gates (incident ledgers, literal fact-cluster/attribute mapping, strict source-independence definition). Zero to near-zero promotions; **Roster20 froze zero candidates at all.** |
| **Eligibility/evidence calibration audit (PR #17)** | Retroactively applied the Roster20-style strict pre-freeze gate to 5 **already-live** production people (Julius Caesar, Newton, Beethoven, Malala, Lincoln). Result: provenance passed 2/5, incidents 0/5, attributes 0/5 — **none of the 5 sampled already-eligible people would pass the strictest modern pre-freeze research gate if it were reapplied retroactively.** Conclusion at the time: `GATE_MISALIGNMENT_PROVISIONAL` — recommended keeping `eligibility_v2` unchanged and revisiting the *pre-freeze research* rule instead. No production person was touched. **This is a direct, already-existing precedent for this audit's own finding in §2 above.** |
| Roster21-23 | Retired Roster20's hard numeric pre-freeze gates for qualitative judgment. Still zero `eligibility_v2` promotions; Garibaldi/Chekhov (roster22/23) reach unusually high confidence quality but stay short on breadth. |
| **Publication/match-eligibility separation (2026-09)** | `isDirectoryVisible` + `evidence_approved` status introduced. Publication approval and match eligibility become independently representable and independently computed. |
| Roster24-32 | First real use of the new architecture. 27 evidence_approved non-eligible people published (Garibaldi, Chekhov, Rubin, Chandrasekhar, Nansen, Bird, +22 fast-batch people, +Zewail/Gaudí/Carnegie-style session-14 "blind calibration" people, +Roster32's 7). Zero newly match-eligible across every one of these cycles except the 3 already-`qa_passed` promotions (Bly, Jung, Guevara). |

## 4. Frozen 16 — stratified match-eligible sample

Selection rule (disclosed before auditing, not score-based): 4 pipeline-age
strata — **early** (roster1-2), **mid** (roster3-12), **later**
(roster14-16/25-26), and **underrepresented domain/era** (ancient/medieval
or building_discovery) — each contributing exactly one person per
interest-area domain (science_knowledge, arts_culture, leadership_society,
building_discovery), tie-broken alphabetically by slug within each
domain×stratum bucket. Not selected by, or filtered on, score appearance.

| slug | lineage | era | domain |
|---|---|---|---|
| ada-lovelace | roster1 | 19th_century | science_knowledge |
| akira-kurosawa | roster1 | contemporary | arts_culture |
| benjamin-franklin | roster2 | early_modern | leadership_society |
| alan-turing | roster1 | 20th_century | building_discovery |
| albert-einstein | roster5 | 20th_century | science_knowledge |
| anna-pavlova | roster9 | 20th_century | arts_culture |
| aung-san-suu-kyi | roster9 | contemporary | leadership_society |
| akio-morita | roster10 | 20th_century | building_discovery |
| bertrand-russell | roster16 | 20th_century | science_knowledge |
| bette-davis | roster15 | 20th_century | arts_culture |
| abraham-lincoln | roster14 | 19th_century | leadership_society |
| alexander-hamilton | roster14 | early_modern | building_discovery |
| aristotle | roster5 | ancient | science_knowledge |
| hildegard-of-bingen | roster3 | medieval | arts_culture |
| confucius | roster2 | ancient | leadership_society |
| ernest-shackleton | roster3 | 19th_century | building_discovery |

(Einstein/Pavlova/Aung San Suu Kyi/Morita/Aristotle/Hildegard/Shackleton's
exact roster-N assignment is by `ROSTER_N` array membership per the audit
script; several were scored in the same 2026-08-15/08-20 "Session 19"-era
batches referenced in §3.)

## 5. Frozen 8 — recent non-eligible controls

Pelé, Fahrelnissa Zeid → substituted per task's own named set: **George
Bernard Shaw, Pablo Neruda, Pelé, Virginia Woolf, James Baldwin**
(all Roster32), **Ahmed Zewail** (Roster31 scientist), **Antoni Gaudí**
(Roster30-era Arts & Culture, session-14 blind-calibration batch),
**Andrew Carnegie** (Roster30-era Building & Discovery, same batch).

## 6. Row-audit findings (qualitative, read against each file's own cited sources — no new external research performed; a small number of already-cited URLs were spot-checked only where necessary to judge attribution)

Classification legend: **SAW** = supported_as_written, **OVR** =
support_but_overstated, **OBI** = outcome_based_inference, **DUP** =
duplicated_behavior, **ATU** = attribution_uncertain, **UNS** =
unsupported_from_available_provenance, **PNR** =
provenance_not_reconstructable.

| person | rows read | dominant classification | notable exceptions |
|---|---|---|---|
| Ada Lovelace | 30 | SAW | none — rich per-episode rationale, symmetric-protocol null results explicitly logged |
| Alan Turing | 30 | SAW | none — same taxonomy_v1.1 episode discipline, explicit non-duplication reasoning |
| Benjamin Franklin | 30 | SAW | none — named Isaacson biography + 2 topic-specific Wikipedia sources |
| **Akira Kurosawa** | 30 | SAW | **1 source only** (Wikipedia); several `documented`-tier rows at confidence up to 0.85 rest on that single source — would not clear the Roster18 two-independent-source bar today. The evidence *itself* is specific and dated (not vague), so this is ATU-on-sourcing rather than fabrication. |
| **Confucius** | 21 | mix of SAW/ATU | zero `documented` rows (all strong_inference/inference); 2 sources, one of which (the Analects) is itself explicitly a secondhand compilation "many years after his death." Confidence is honestly capped (max 0.68) — the file does not overclaim, it is just thin. 2-3 rows (e.g. `persuasiveness` 0.6) read as general-disposition inference rather than a specific dated act. |
| Albert Einstein | 21 | SAW | none — 2 real sources, deliberately includes low unflattering scores (`belief_updating` 26, `experimentation` 42) with an explicit anti-halo-effect provenance note |
| Anna Pavlova | 25 | SAW | none — 8 sources, per-episode evidence IDs (Session 19 ledger), includes unflattering material (slapping a partner, volatile management style) |
| Aung San Suu Kyi | 25 | SAW | none — 8 sources incl. HRW/ICJ transcript/her own writings; explicitly includes her authoritarian-era failures (`belief_updating` 22, `collaboration` 32) without sanitizing |
| Akio Morita | 26 | SAW | none — 8 sources incl. 2 independent biographies; includes real strategic failures (Betamax, Columbia Pictures) as `dual_edged`/negative |
| Bertrand Russell | 21 | SAW | none — corroborated from Monk's independent biography AND multiple of Russell's own wives' separate accounts; includes his documented relationship failures |
| Bette Davis | 22 | SAW | none — corroborated from Crawford's own independent side of their rivalry, not Davis's account alone |
| Abraham Lincoln | 22 | SAW | none — named scholarly biographies (Herndon, Goodwin, Donald) + his own Collected Works; dual_edged decisiveness honestly scored |
| Alexander Hamilton | 22 | SAW | 1 row (`opportunity_sensing`, inference) reads as pattern-inference rather than a single cited act — acceptable at its stated confidence (0.48) |
| Aristotle | 19 | SAW | evidence is his own surviving corpus (primary, not secondhand) — the file explicitly and correctly distinguishes this from Confucius/Socrates's secondhand-only case |
| Hildegard of Bingen | 19 | SAW | honestly capped at 0.65 max; explicit note that most rows rest on textual interpretation, not corroborated behavioral accounts |
| Ernest Shackleton | 21 | SAW | 2 sources (Wikipedia + Lansing, itself drawing on multiple crew diaries); deliberately low, honest scores where evidence doesn't support more (`cross_domain_range` 28, `planning_orientation` 52) |
| George Bernard Shaw (control) | 16 | SAW | none — 8 sources incl. his own quoted words; visible `[NEW_EVIDENCE, Roster32]` tags |
| Pablo Neruda (control) | 21 | SAW | none — richest control profile; explicit safety-rule exclusion of his assault confession, disclosed not laundered |
| Pelé (control) | 6 | mix SAW/**OBI** | `competitiveness`/`discipline` explicitly self-labeled "inferred substantially from results rather than specific documented personal behavior" — an honestly-flagged outcome-based-inference case, exactly the pattern §10(B) below asks about |
| Virginia Woolf (control) | 12 | SAW | none — 11 sources; explicit exclusion of health-crisis-adjacent material per the project's own diagnosis-inference ban |
| James Baldwin (control) | 10 | SAW | none — 11 sources; 2 widely-recirculated but unverifiable claims explicitly investigated and excluded |
| Ahmed Zewail (control) | 12 | SAW | 2 rows carry visible `[NARROWED on factual gate review]` self-corrections (an overclaimed "first" title; an unverifiable dollar figure) |
| Antoni Gaudí (control) | 7 | SAW | thin (7 rows) but each well-grounded; patron dependency disclosed but explicitly NOT used as false collaboration evidence |
| Andrew Carnegie (control) | 5 | SAW | thin (5 rows); Homestead Strike deliberately included as negative/harmful, with a visible post-hoc `[ERROR_CORRECTION]` removing an over-precise casualty figure |

## 7. Answers to the key audit questions

**A. What fraction of audited rows are reconstructably supported?**
The large majority across all 24 profiles (~330 rows read). No fabricated
or unreconstructable claims were found; every source is named, and in
most files a live URL is given. The system actively *excludes* unverifiable
material before scoring rather than scoring it at reduced confidence
(Pelé's Biafra-ceasefire legend, Baldwin's Wright-brawl claim, Shaw's
"five pages a day" anecdote — all investigated and explicitly rejected).

**B. Outcome-based inference / duplicated behavior / weak attribution /
unavailable provenance rates.** Outcome-based inference: a real, narrow
pattern, concentrated in low-personal-documentation athletic/entertainment
figures — found in the **control** group itself (Pelé), not only in
legacy profiles. Duplicated behavior: not found live in this sample (the
one confirmed historical instance, Roster17's von Neumann, was caught and
reverted before ever reaching production). Weak attribution: concentrated
in secondhand-corpus ancient figures (Confucius) and single-source
profiles (Kurosawa). Unavailable provenance: none found — the opposite
pattern holds (unreconstructable leads are being actively filtered out).

**C. Are those rates materially different from the recent non-eligible
controls?** No. The controls show equal or *greater* visible self-correction
(explicit `[NARROWED]`/`[ERROR_CORRECTION]` tags) than most of the eligible
cohort simply because that provenance-note convention postdates most of
the eligible cohort's original scoring — not because the underlying row
quality differs.

**D. Are high-confidence rows in the eligible cohort supported at the
same evidence level modern candidates need?** Yes for 15 of the 16 sampled
(Ada Lovelace, Alan Turing, Benjamin Franklin, Einstein, Pavlova, Aung San
Suu Kyi, Morita, Russell, Davis, Lincoln, Hamilton, Aristotle, Hildegard,
Shackleton — fully comparable to or exceeding the controls). Confucius is
honestly-capped rather than a violation. **Akira Kurosawa is the one
concrete exception**: `documented`-tier claims at up to 0.85 confidence
resting on exactly one source.

**E. Does evidence quality differ strongly by roster lineage?** Not
monotonically. Quality tracks *which specific research pass* a person went
through far more than *how old* their roster number is — the "Session 19"
episode-ledger batch (roster9/10-ish) is arguably more rigorous in
per-row citation than several later cycles. The one lineage-level
structural difference that's real: **roster1+2 (34 people, 27% of the
eligible cohort) carry no candidate JSON and are invisible to
`checkScoringLockIntegrity.ts`** — a tooling-coverage gap, not a proven
quality gap (only 1 of the 3 fully-read roster1/2 sample profiles,
Kurosawa, showed an actual defect).

**F. Does evidence quality differ strongly by era/domain?** Yes,
predictably and mostly honestly-handled: ancient/medieval figures rest on
secondhand corpus/interpretation (confidence self-capped in 2 of 3 sampled
cases) rather than eyewitness corroboration; low-personal-documentation
athletic figures show more outcome-based inference. This is a real,
inherent evidentiary constraint of the source record, not a project
defect, and it affects the controls too (Pelé).

**G. Is `eligibility_v2` mainly measuring evidence breadth, or partly
encoding legacy scoring-density differences?** **Mainly breadth** — and
that breadth correlates with how much research time/how many episodes
were banked *before* scoring in a given cycle, which varied a lot by
cycle (Session 19's 25-45-episode locked ledgers vs. Roster18-23's
2-source-cap arc that structurally topped out at 8-19 scored attributes
for *any* candidate regardless of how well-documented they were), not
with a uniform "old cycles were lax" pattern. This directly reinforces
the PR #17 calibration audit's own `GATE_MISALIGNMENT_PROVISIONAL`
finding rather than contradicting it.

## 8. Known limitations of this audit

- The row-audit classification (§6) is a careful qualitative read against
  each file's own cited sources, not an independent mechanical
  fact-check against primary sources for all ~330 rows — full primary
  re-verification of every row was out of scope (`no new research`, `max
  2 concurrent external lookups`) and was not attempted.
- The archived 19-session `roster-1000-checkpoint.md` narrative
  (sessions 1-9, before `eligibility_v2` existed) was not opened; the
  chronology in §3 relies on `roster.md`'s own distilled summary of it,
  per that file's explicit "only open it to resolve a specific historical
  methodology question" guidance.
- 34 people have no candidate JSON at all (§2); this audit read 3 of them
  in full (Ada Lovelace, Alan Turing, Benjamin Franklin — all from the
  frozen 16) plus Akira Kurosawa and Confucius. The other ~29 were not
  individually row-audited.

## 9. Conclusion

**`MATCH_POOL_MIXED`.**

- **Trustworthy as a reference without further action**: the
  candidate-pipeline lineage (roster3-32, 93 of 127 eligible people, 73%)
  — evidence quality is comparable to or exceeds the current
  evidence_approved controls, with the historical session-11 incident
  (roster8) already caught, reverted, and tooled against.
- **Needs a targeted future re-audit, not a blanket one**: the 34-person
  roster1+2 hand-authored slice with zero `checkScoringLockIntegrity.ts`
  coverage — starting from single-source, high-confidence profiles like
  Akira Kurosawa, which is the one concrete defect this audit actually
  found.
- **A real, separate calibration point** (not a new finding — it
  reinforces PR #17's own prior conclusion): `eligibility_v2` measures
  breadth more than per-row quality, and breadth is sensitive to how much
  a given research cycle banked before scoring. This argues against
  pushing new candidates to imitate legacy row-*count*, not against the
  gate's honesty.

## 10. Recommendation for the next cycle

Per §17's mixed-result branch: do not blanket-distrust the eligible pool,
and do not resume eligibility-targeted research on new candidates as the
next default move either. Two independent, low-risk next steps, either of
which could be Roster33's actual scope (a decision for the user, not
pre-empted here):

1. A narrow **legacy re-audit** of the 34 roster1/2 hand-authored people
   — starting with any other single-source entries like Kurosawa — to
   either confirm them or bring them under `checkScoringLockIntegrity.ts`
   coverage (e.g., by giving them real candidate JSON files without
   changing any score).
2. If new evidence-maturation work is preferred instead, Arts & Culture
   and Building & Discovery remain the honest ceiling per Roster31/32's
   own finding (Group-B/zero-politics exclusion leaves few viable
   candidates there) — but per §7(G), that work should target genuinely
   under-researched people, not re-litigate whether already-`evidence_approved`
   profiles like this cycle's 8 controls "deserve" more rows.
