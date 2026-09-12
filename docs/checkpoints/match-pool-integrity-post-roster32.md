# Match-pool integrity audit (post-Roster32, 2026-09-12)

Diagnostic-only. No threshold, score, confidence, evidenceType, impact,
eligibility_v2, matching, calibration, dispersion, roster membership, or
interest-area change was made in this cycle (this includes the
correction pass below — no candidate/roster file was touched, only the
audit tooling and one comment). See
[`matchPoolIntegrityAudit.ts`](../../src/dev/roster1000/audits/matchPoolIntegrityAudit.ts)
for the reusable mechanical inventory script and
[`matchPoolIntegrityAuditManual.ts`](../../src/dev/roster1000/audits/matchPoolIntegrityAuditManual.ts)
for the row-by-row manual classification ledger this report's exact rates
come from — both read-only, both covered by tests that assert no
mutation.

**Correction pass (2026-09-12, second commit on this PR)**: the first
version of this report used narrative language ("large majority," "low,"
"~0") in place of an actual computed rate, and drew a too-strong
inference from the mechanical `evidenceType` share alone. Both are fixed
below: §6 now reports an exact, code-computed classification ledger
covering every scored row on all 24 audited people, and §7's
interpretation is narrowed to what that ledger actually supports. The
correction **materially changed the eligible-sample numbers** (see §6) —
the conclusion category is unchanged, but the finding for the
roster1/roster2 lineage is now sharper and more concrete than the first
version reported.

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
| documented-row share (`evidenceType` tag) | 34.5% | 41.5% |
| strong_inference share | 41.3% | 26.8% |
| inference share | 24.2% | 31.7% |
| median sources/person | 3 | 4 |
| mean sources/person | 3.19 | 3.92 |

The breadth gap (scored-attribute count, coverage, and especially
high-confidence *count*: 17 vs 8) is large and real. The `evidenceType`
tag distribution above is **not**, by itself, evidence about per-row
quality — see §7(C) for why, and §6 for the actual per-row audit this
question needs.

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

`checkScoringLockIntegrity.ts` diffs `data-pipeline/candidates/*.json`
files only, so a future edit to any of these 34 people's
confidence/evidenceType values would go completely undetected by the
project's own drift guard. **§6 below adds a second, more concrete layer
to this finding**: it is not only that no JSON file exists — for the 5 of
these 34 people actually row-audited in this cycle, their original ~30
"base" rows (everything except a handful of later `taxonomy_v1.1`
additions) carry no per-row rationale text anywhere in the repository at
all, only a score/confidence/evidenceType/impact tuple.

### Interest-area pools (match-eligible), for reference — unchanged by this audit

science_knowledge 53, arts_culture 49, leadership_society 44,
building_discovery 19.

## 3. Methodology chronology (from `docs/checkpoints/roster.md` and code)

| when | what changed |
|---|---|
| Roster1-2 (pre roster-1000 program) | Hand-authored directly as `PersonSeed` literals in `seed.ts`/`roster2.ts`. No candidate JSON, no schema version, no locked evidence ledger, **and — confirmed in this correction pass — no per-row rationale text for the original ~30 attributes per person**; only later `taxonomy_v1.1` additions (0-4 rows per person) carry a written rationale. |
| Roster-1000 sessions 1-9 | `eligibility_v1` (implicit, unversioned): a **flat, unweighted mean of confidence** across every scored attribute gated admission. |
| **Session 10 (2026-08)** | **`eligibility_v2` introduced** (`ELIGIBILITY_VERSION`, `src/core/matching/similarity.ts`): replaces the flat mean with a high-confidence-subset requirement (`count>=12`, `avgConf>=0.55` among rows at `confidence>=0.5`); `minScoredAttributes`(18)/`minCoverage`(0.6) carried over unchanged from v1. Roster7 (+9) is the first batch selected against it. |
| **Session 11 (2026-08)** | **Confirmed integrity incident**: confidence values iteratively nudged after seeing `eligibility_v2` fail, until candidates crossed the bar. 17 of 20 candidates from that batch (roster8) reverted. Directly produced the binding confidence-change policy (`NEW_EVIDENCE`/`RUBRIC_CORRECTION`/`ERROR_CORRECTION` only, never `ELIGIBILITY_REMEDIATION`) and `checkScoringLockIntegrity.ts`. |
| Session ~13-18 (roster9-16) | Candidate-pipeline JSON becomes standard — every row now carries a written rationale. A high-water mark appears mid-arc ("Session 19" launch-expansion batch: Einstein, Pavlova, Aung San Suu Kyi, Akio Morita) using **locked, per-episode-ID evidence ledgers** (25-45 named episodes each) — arguably *more* granular than later practice, which cites source IDs but not individual episode IDs. Session 18 formally freezes the Roster Research & Scoring Protocol v1. |
| Roster17 (2026-09) | John von Neumann promoted then **reverted**: provenance overstated its own methodology (claimed sources never actually opened), 16 of 23 rows re-derived from the same 2-4 facts (duplicated-behavior pattern). 6 others held purely on attribute-count/coverage from a shallower single-source pass. |
| Roster18 | New rule: >=2 genuinely independent, actually-opened sources (Wikipedia orientation-only). All 8 frozen candidates scored 8-14 attributes; zero promotions. |
| Roster19-20 | Progressively stricter pre-freeze gates (incident ledgers, literal fact-cluster/attribute mapping, strict source-independence definition). Zero to near-zero promotions; **Roster20 froze zero candidates at all.** |
| **Eligibility/evidence calibration audit (PR #17)** | Retroactively applied the Roster20-style strict pre-freeze gate to 5 **already-live** production people (Julius Caesar, Newton, Beethoven, Malala, Lincoln). Result: provenance passed 2/5, incidents 0/5, attributes 0/5 — **none of the 5 sampled already-eligible people would pass the strictest modern pre-freeze research gate if it were reapplied retroactively.** Conclusion at the time: `GATE_MISALIGNMENT_PROVISIONAL` — recommended keeping `eligibility_v2` unchanged and revisiting the *pre-freeze research* rule instead. No production person was touched. This audit's row-level finding (§6-7) is a different, complementary check (existing per-row textual support, not pre-freeze research-depth prediction) and reaches a compatible but sharper conclusion for one specific lineage. |
| Roster21-23 | Retired Roster20's hard numeric pre-freeze gates for qualitative judgment. Still zero `eligibility_v2` promotions; Garibaldi/Chekhov (roster22/23) reach unusually high confidence quality but stay short on breadth. |
| **Publication/match-eligibility separation (2026-09)** | `isDirectoryVisible` + `evidence_approved` status introduced. Publication approval and match eligibility become independently representable and independently computed. `docs/adding-a-person.md` already states the corrected rule explicitly ("never withhold promotion solely because `eligibility_v2` failed once evidence approval is genuine") — confirmed still accurate active guidance in this correction pass (§9 below). |
| Roster24-32 | First real use of the new architecture. 27 evidence_approved non-eligible people published. Zero newly match-eligible across every one of these cycles except the 3 already-`qa_passed` promotions (Bly, Jung, Guevara). |

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

## 5. Frozen 8 — recent non-eligible controls

**George Bernard Shaw, Pablo Neruda, Pelé, Virginia Woolf, James Baldwin**
(all Roster32 — the 4 named in the task plus one additional Roster32
evidence_approved profile), **Ahmed Zewail** (Roster31 scientist),
**Antoni Gaudí** (Roster30-era Arts & Culture), **Andrew Carnegie**
(Roster30-era Building & Discovery).

## 6. Row-classification ledger — exact, code-computed rates

Every scored row on all 24 people (frozen 16 + frozen 8) was assigned
**exactly one** primary classification against that row's own existing
rationale text (or its absence), per the fixed taxonomy. No new external
research; no row's score/confidence/evidenceType/impact was changed. Full
per-row ledger and classification rules:
[`matchPoolIntegrityAuditManual.ts`](../../src/dev/roster1000/audits/matchPoolIntegrityAuditManual.ts)
(tested for coverage, no orphans/no missing rows, and determinism in
[`matchPoolIntegrityAuditManual.test.ts`](../../src/dev/roster1000/audits/matchPoolIntegrityAuditManual.test.ts)).

**Classification is deliberately stricter than the data's own
`evidenceType` tag.** The single largest driver of non-`supported_as_written`
rows, discovered only by attempting this exact ledger: for the 5
roster1/roster2 people in the sample (Ada Lovelace, Akira Kurosawa,
Benjamin Franklin, Alan Turing, Confucius), the original ~30 "base"
attributes per person carry a score/confidence/evidenceType/impact tuple
but **no per-row rationale text anywhere in the repository** — only later
`taxonomy_v1.1` addition rows (0-4 per person) carry a written paragraph.
These base rows are classified `unsupported_from_available_provenance`:
not because the underlying historical claim is necessarily false, but
because the specific number cannot be reconstructed from anything the
repository currently states (per this audit's own scope: "audit what the
repository currently supports," not general knowledge).

### A. Frozen 16 eligible sample (denominator = 396)

| classification | count | rate |
|---|---|---|
| supported_as_written | 241 | 60.9% |
| support_but_overstated | 0 | 0.0% |
| outcome_based_inference | 5 | 1.3% |
| duplicated_behavior | 0 | 0.0% |
| attribution_uncertain | 5 | 1.3% |
| unsupported_from_available_provenance | 145 | 36.6% |
| provenance_not_reconstructable | 0 | 0.0% |

### B. Frozen 8 recent non-eligible controls (denominator = 88)

| classification | count | rate |
|---|---|---|
| supported_as_written | 75 | 85.2% |
| support_but_overstated | 0 | 0.0% |
| outcome_based_inference | 8 | 9.1% |
| duplicated_behavior | 1 | 1.1% |
| attribution_uncertain | 3 | 3.4% |
| unsupported_from_available_provenance | 1 | 1.1% |
| provenance_not_reconstructable | 0 | 0.0% |

### C. Combined 24-profile audit (denominator = 484)

| classification | count | rate |
|---|---|---|
| supported_as_written | 316 | 65.3% |
| support_but_overstated | 0 | 0.0% |
| outcome_based_inference | 13 | 2.7% |
| duplicated_behavior | 1 | 0.2% |
| attribution_uncertain | 8 | 1.7% |
| unsupported_from_available_provenance | 146 | 30.2% |
| provenance_not_reconstructable | 0 | 0.0% |

### D. Decomposition: eligible sample, candidate-JSON-backed lineage only (11 of 16 people, denominator = 249)

Excludes the 5 roster1/roster2 people to isolate whether the
candidate-pipeline *portion* of the eligible cohort is comparable to the
controls:

| classification | count | rate |
|---|---|---|
| supported_as_written | 235 | 94.4% |
| support_but_overstated | 0 | 0.0% |
| outcome_based_inference | 5 | 2.0% |
| duplicated_behavior | 0 | 0.0% |
| attribution_uncertain | 4 | 1.6% |
| unsupported_from_available_provenance | 5 | 2.0% |
| provenance_not_reconstructable | 0 | 0.0% |

**This is the key comparison.** The raw 16-person eligible rate
(60.9% SAW) looks materially worse than the controls (85.2% SAW) — but
that gap is concentrated almost entirely in 5 of 16 people. Once those 5
(all roster1/roster2, zero candidate JSON) are set aside, the remaining
11 candidate-pipeline-backed eligible people score **94.4% SAW — higher
than the controls' 85.2%.** The `unsupported_from_available_provenance`
rate for this subset (2.0%) comes from a handful of explicitly
self-flagged "safe default" rows in otherwise-strong files (Russell,
Davis, Hamilton), not from a systemic gap.

## 7. Answers to the key audit questions

**A. What fraction of audited rows are reconstructably supported?**
65.3% combined are `supported_as_written` outright (§6C); among rows that
actually carry any per-row rationale text at all (i.e., excluding
roster1/2's base rows), the rate is far higher — 94.4% for the
candidate-JSON-backed eligible sample, 85.2% for the controls.

**B. Outcome-based inference / duplicated behavior / weak attribution /
unavailable provenance rates.** Combined: outcome_based_inference 2.7%
(13/484), duplicated_behavior 0.2% (1/484, Virginia Woolf's
`autonomy_need`, self-disclosed by its own rationale as overlapping
`resourcefulness`), attribution_uncertain 1.7% (8/484), and the dominant
category, unsupported_from_available_provenance 30.2% (146/484) — almost
entirely (145 of 146) the roster1/2 base-row gap in §6, not a
controls-vs-eligible split (controls: 1/88, 1.1%).

**C. Are those rates materially different from the recent non-eligible
controls?** **Yes for the aggregate 16-person eligible sample (60.9% vs
85.2% SAW) — but this is a lineage effect, not a general legacy-vs-recent
effect.** Restricted to the candidate-JSON-backed 11 of 16 (§6D), the
eligible sample's rate (94.4%) is *higher* than the controls' (85.2%).
The earlier draft of this report inferred per-row parity directly from
the mechanical `evidenceType` share (§2's table) — that inference was too
strong, because `documented`/`strong_inference`/`inference` are
themselves historical annotations that could, in principle, have been
applied under looser discipline; the corrected, defensible basis for the
parity claim is this manual ledger (§6), not the aggregate tag
distribution.

**D. Are high-confidence rows in the eligible cohort supported at the
same evidence level modern candidates need?** Yes for the
candidate-JSON-backed portion (11 of 16 sampled). **No, mechanically
confirmed, for the roster1/2 portion**: their base-row confidence values
(some in the 0.7-0.85 "documented" range, e.g. several of Akira
Kurosawa's rows) have no stated textual justification at all, let alone
one meeting current sourcing discipline.

**E. Does evidence quality differ strongly by roster lineage?** Yes, and
now sharply, mechanically bounded rather than a soft impression: the
roster1/roster2 lineage (34 of 127 eligible, 27%) has a **structural,
row-level documentation gap** — not just a missing-JSON-file tooling gap,
but literally no per-row rationale for its base attributes. Every other
sampled lineage (roster3-16, 11 people/249 rows in this sample) shows
quality comparable to or exceeding the current evidence_approved
controls.

**F. Does evidence quality differ strongly by era/domain?** Secondary to
lineage. Within the candidate-JSON-backed sample, ancient/medieval
figures (Aristotle, Hildegard) and low-personal-documentation domains
(athletics — Pelé, in the controls) show more `attribution_uncertain`/
`outcome_based_inference` rows, but at a modest rate (§6D's 2.0%+1.6%),
and the scorers' own rationale text is consistently honest about it.

**G. Is `eligibility_v2` mainly measuring evidence breadth, or partly
encoding legacy scoring-density differences?** Mainly breadth (§2), and
that breadth is *not* the same thing as the row-level documentation gap
found in §6 — they are two independent axes. A roster1/2 person's base
rows contribute to their high scored-attribute *count* (driving
`eligibility_v2` admission) despite having no stated per-row rationale.
This means `eligibility_v2`'s breadth measurement is, for those 34
people specifically, resting on undocumented rows — a real, separate
finding from the PR #17 calibration audit's breadth-vs-quality point,
and arguably more actionable.

## 8. Known limitations of this audit

- The row-classification ledger (§6) is a careful, criteria-based read of
  each row's own existing rationale text (or its absence) — not an
  independent mechanical fact-check against primary sources for all 484
  rows. Full primary re-verification was out of scope (`no new research`,
  `max 2 concurrent external lookups`) and was not attempted.
- Classification judgment calls are disclosed per-row (`note` field in
  the ledger) for every non-`supported_as_written` row; a different
  auditor could draw some individual lines differently, but the dominant
  finding (the roster1/2 no-rationale gap, 145 of 146
  `unsupported_from_available_provenance` rows) does not depend on any
  judgment call — it is a structural fact about the source files.
- The archived 19-session `roster-1000-checkpoint.md` narrative
  (sessions 1-9, before `eligibility_v2` existed) was not opened; the
  chronology in §3 relies on `roster.md`'s own distilled summary of it.
- 34 people have no candidate JSON at all (§2); this audit row-audited 5
  of them (Ada Lovelace, Akira Kurosawa, Benjamin Franklin, Alan Turing,
  Confucius). The other 29 were not individually re-audited, though the
  base-rows-have-no-rationale structural fact is a property of the
  seed-file format itself (verified for all 5 sampled, and by inspection
  the same literal structure — bare `[score, confidence, code, code]`
  tuples with no per-row comment — is used throughout `seed.ts`/
  `roster2.ts` for every person's original ~30 rows), so it plausibly
  generalizes to the other 29, but this was not individually confirmed
  for each of them.
- **The candidate-pipeline lineage's clean result (§6D, 94.4% SAW) covers
  only 11 of the 93 candidate-pipeline-backed eligible people (12%)** —
  see §9 for how this bounds the conclusion.

## 9. Conclusion

**`MATCH_POOL_MIXED`.**

- **Concrete, mechanically-confirmed defect**: the roster1/roster2
  hand-authored lineage (34 of 127 eligible people, 27%) has a real
  row-level documentation gap — their base attributes carry no
  reconstructable per-row rationale in the repository at all (§6, §7E).
  This is a provenance/documentation defect, not evidence that the
  underlying historical claims are false (Ada Lovelace's, Alan Turing's,
  and Benjamin Franklin's `taxonomy_v1.1` addition rows, which DO carry
  rationale, are well-supported; Akira Kurosawa specifically has zero
  such additions, so none of his 30 rows carry any rationale at all,
  making him the single most-exposed profile in the sample — but this
  reflects an absence of stated justification, not a demonstrated
  factual error in what's scored).
- **No systemic drift found in the candidate-pipeline lineage sample**:
  11 of 16 sampled eligible people (roster3-16) score 94.4%
  `supported_as_written`, exceeding the 8 recent controls' 85.2% (§6D).
- **This does not prove all 93 candidate-pipeline-backed eligible people
  are clean** — only 11 of them (12%) were individually row-audited here.
  There is no basis in this audit for blanket remediation of that
  93-person population, but there is also no evidence of a problem in it;
  the honest position is "no systemic drift detected in the sample,
  unaudited population not individually re-verified."
- The breadth-vs-quality distinction from the mechanical inventory (§2,
  §7G) is a real, separate, already-partially-known calibration point
  (reinforcing PR #17's prior `GATE_MISALIGNMENT_PROVISIONAL`), not a new
  integrity violation.

## 10. Recommendation for the next cycle

Per the mixed-result branch: do not blanket-distrust the eligible pool
(the candidate-pipeline majority checks out), and do not resume
eligibility-targeted research on new candidates as the next default move
either. Two concrete, bounded next steps — a decision for the user, not
pre-empted here:

1. **Targeted legacy remediation** for the roster1/roster2 34-person
   lineage: write down the actual per-row justification for their
   existing (unchanged) scores — starting with Akira Kurosawa, the one
   profile in this sample with literally zero rationale on any row — and
   bring them under `checkScoringLockIntegrity.ts` coverage (e.g. real
   candidate JSON files), without altering any score, confidence, or
   evidenceType value. This directly closes the concrete gap this audit
   found, rather than a general "re-audit everything" mandate.
2. If new evidence-maturation work is preferred instead, Arts & Culture
   and Building & Discovery remain the honest ceiling per Roster31/32's
   own finding — but per §7(G)/§9, that work should target genuinely
   under-researched people, not re-litigate whether the 8 controls in
   this audit "deserve" more rows; they already check out well.
