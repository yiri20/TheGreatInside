# Eligibility/Evidence Methodology Calibration Audit

Read-only calibration. **No production person, candidate JSON, seed, roster
file, generated index, dispersion, editorial content, portrait, or i18n
data was modified.** No new person was added, promoted, or removed. No
threshold, rubric, or eligibility code was changed. This is diagnosis
only, exactly as scoped.

Branch: `chore/eligibility-evidence-calibration` (worktree:
`C:\Users\Lenovo\TheGreatInside-eligibility-evidence-calibration`, created
from `origin/main` at `57ae109e3b9263cf682116ef99c34e77fb57b3ff`, confirmed
matching before branching).

## Correction record (post-PR#17 review, first pass)

A review of this checkpoint after PR #17 was opened found real
auditability and classification problems, corrected there: Beethoven's
claimed 12 incidents had only 9 auditable IDs (resolved by honestly
splitting a collapsed custody-battle row); Malala's second "provenance"
source documented others' actions toward her, not her own behavior
(dropped from provenance count); the diagnosis was split into a workflow
level and a gate level; the `eligibility_v2` recommendation was reframed to
avoid circular reasoning; the sampling description was corrected to
distinguish production-profile depth from real-world documentation
richness. See git history for that pass's full detail — **superseded by
the second correction below**, which found the first pass's own new
traceability tables still contained real referential-integrity problems.

## Correction record (traceability integrity audit, second pass — this update)

A narrowly-scoped mechanical integrity audit of the first correction's
row-level tables found three distinct, real problems, all fixed below.
**This pass's numbers are materially lower than either prior draft's — the
change is accepted honestly, not resisted.** Nothing was added or
rescued to preserve any prior total; several specific items the review
requested be checked for cluster/semantic validity were dropped outright
rather than patched.

1. **Generic labels ("`background`", "`background-corroborated`",
   "`independent`") were used in the row-level tables where actual source
   IDs were promised.** Building the mechanical model in Part E below and
   tracing every incident back to the specific tool call that produced it
   surfaced something the first two drafts of this checkpoint missed
   entirely: **several incidents credited as "actually opened and read"
   were in fact only ever retrieved via a `WebSearch` call's aggregated
   summary, never a `WebFetch` of one specific page.** This is exactly the
   same distinction roster20 and this audit's own first drafts already
   enforced elsewhere (e.g. excluding the Tvardovsky/*Novy Mir* item as
   "background-corroborated, not opened") — it was simply not applied
   consistently to every row here. Once applied consistently: Newton's
   Hooke letter (IN-05), the Leibniz dispute (IN-06), the Hooke-Principia
   removal (IN-07), and the Mint/Chaloner prosecution (IN-08) are **all**
   `WebSearch`-only and are excluded. So are Beethoven's 1824 Ninth
   Symphony premiere (LB-09), the Archduke Rudolph relationship (LB-10),
   and the *Fidelio* revisions (LB-11). So are Lincoln's Grant letter
   (AL-06 in the prior numbering), Willie's death (AL-09), and the Cabinet
   of Rivals (AL-10). Genuinely `WebFetch`-opened material survives for
   every person (see the source registry, Part E) — Caesar's and Malala's
   full incident sets happened to already meet this bar; Newton's,
   Beethoven's, and Lincoln's did not, in each case.
2. **This has a second-order consequence the first review didn't
   anticipate: it changes provenance counts, not just incident counts.**
   Newton's only self-authored item (the Hooke letter) is now excluded, so
   his sole surviving source is Stukeley — **1 total perspective, not
   2** — he now fails criterion 1. Lincoln's only self-authored item (the
   Grant letter) is likewise excluded, leaving only Herndon — **1 total
   perspective, not 2** — he now also fails criterion 1. Beethoven's
   custody-battle material (the interlude.hk article) *was* genuinely
   `WebFetch`-opened, so it survives and actually **raises** his
   provenance count to 3 total (himself + Thayer + interlude.hk), 2
   non-self — the one person whose corrected count improved rather than
   worsened.
3. **Caesar's `decisiveness` row had an incident/cluster mismatch** (JC-02
   in cluster B, JC-04 in cluster A, both listed under one cluster
   label) — fixed by giving `decisiveness` one explicit primary cluster
   (B, from JC-02) with cluster A's JC-04 recorded as a corroborating
   cluster, not a second primary. **Several attribute-to-incident
   mappings across all 5 people did not survive a check against the
   attributes' actual operational definitions** (recovered from the live
   quiz item text in `src/core/quiz/bank.ts`/`en.ts`, since
   `attributes.ts` itself defines `id`/`facet`/`baseWeight` but not a
   semantic description) — see Part D-H below for the specific drops.

No new research was performed to rescue any row or total. Where a row's
fit was genuinely ambiguous, it was dropped rather than resolved in
whichever direction preserved a prior count.

## Purpose

Before starting roster21: can a normal-scale intake research pass
reproduce the roster20-style pre-freeze gate on people who are already
accepted as production-quality profiles? This third pass exists to make
sure the *evidence for that question* is itself mechanically valid before
merging it as an audit record — not to redesign the methodology or
preserve any particular headline number.

## Part B — Current rules, read and recorded unchanged

| Rule | Value |
|---|---|
| `eligibility_v2` scored-attribute floor | `>= 18` |
| `eligibility_v2` coverage floor | `>= 0.6` |
| `eligibility_v2` high-confidence count floor | `>= 12` at confidence `>= 0.5` |
| `eligibility_v2` high-confidence average gate | `>= 0.55` |
| Roster20 pre-freeze incident floor | `>= 12` concrete behavioral incidents |
| Roster20 fact-cluster floor | `>= 6` distinct fact clusters |
| Roster20 literal mapped-attribute floor | `>= 20` (preferably `>= 22`) |
| Roster20 fact-cluster dedup cap | no single fact cluster may be the primary basis for `> 3` attributes |
| Source-provenance requirement | `>= 2` total distinct provenance perspectives; each non-self perspective must contribute usable behavioral evidence, actually opened this cycle (a `WebSearch` summary does not qualify) |

None of these values were altered by this audit.

## Part C — Frozen calibration sample (unchanged from the prior pass)

Deterministic, mechanical, median-within-category selection from
`PEOPLE_INDEX`: **Julius Caesar** (political), **Isaac Newton** (science),
**Ludwig van Beethoven** (culture), **Malala Yousafzai** (non-Western),
**Abraham Lincoln** (median production-profile-depth — his 22-attribute
live profile equals the full-125-roster median; this is a
production-profile-depth sample, not a claim of representative real-world
documentation richness — see the prior correction record for the full
distinction). Frozen before research began; never swapped.

## Part D — Baseline production state (read-only, unchanged)

| Slug | Live attr. count | `isMatchEligible` |
|---|---|---|
| `julius-caesar` | 21 | true |
| `isaac-newton` | 26 | true |
| `ludwig-van-beethoven` | 32 | true |
| `malala-yousafzai` | 22 | true |
| `abraham-lincoln` | 22 | true |

## Part E — Source registry (mechanical, every row an actual tool call)

Every source below is tagged by the exact retrieval method used this
cycle. **Only `webfetch` rows count as "actually opened and read."**
`websearch` rows are demoted to background/not-usable, consistent with how
this same standard was already applied to the Tvardovsky item in roster20.

| Source ID | Title | Author | Method | Perspective | Usable? |
|---|---|---|---|---|---|
| C1 | *Commentarii de Bello Gallico* | Julius Caesar | `webfetch` (Gutenberg #218) | self | yes |
| C2 | *Lives of the Twelve Caesars: Julius Caesar* | Suetonius | `webfetch` (Gutenberg #6400) | independent | yes |
| N1 | *Memoirs of Sir Isaac Newton's Life* | William Stukeley | `webfetch` (Wikisource) | independent | yes |
| ~~N2~~ | Letter to Robert Hooke, 1675 | Isaac Newton | `websearch` only | self | **no** |
| ~~N3~~ | Newton-Leibniz priority dispute | various | `websearch` only | independent | **no** |
| ~~N4~~ | Hooke references removed from *Principia* | various | `websearch` only | independent | **no** |
| ~~N5~~ | Mint/Chaloner prosecution | various | `websearch` only | independent | **no** |
| B1 | *Beethoven's Letters, 1790-1826* | Beethoven (tr. Lady Wallace) | `webfetch` (Gutenberg) | self | yes |
| B2 | *The Life of Ludwig van Beethoven* | A. W. Thayer | `webfetch` (archive.org) | independent | yes (thin) |
| B3 | "Composers in the Court Room: Beethoven vs. Beethoven" | Interlude.hk | `webfetch` | independent | yes |
| ~~B4~~ | 1824 Ninth Symphony premiere | various | `websearch` only | independent | **no** |
| ~~B5~~ | Archduke Rudolph relationship | various | `websearch` only | independent | **no** |
| ~~B6~~ | *Fidelio* revisions | various | `websearch` only | independent | **no** |
| M1 | UN Youth Assembly speech, 12 Jul 2013 | Malala Yousafzai | `webfetch` (opportunitydesk.org) | self | yes |
| M2 | 2009 BBC Urdu diary excerpts | Malala Yousafzai (via Globe and Mail) | `webfetch` | self | yes |
| ~~M3~~ | Pakistani school-association book ban | Fox News | `webfetch`, but wrong subject (documents others' actions toward her) | independent, unusable | **no** (excluded in the first correction pass, for a different but compounding reason) |
| L1 | *Herndon's Lincoln* (fetch pass 1) | William Herndon | `webfetch` (archive.org) | independent | yes |
| L2 | *Herndon's Lincoln* (fetch pass 2) | William Herndon | `webfetch` (archive.org) | independent | yes |
| ~~L3~~ | Letter to Grant, 1863 | Abraham Lincoln | `websearch` only | self | **no** |
| ~~L4~~ | Willie Lincoln's death | various | `websearch` only | independent | **no** |
| ~~L5~~ | Cabinet of Rivals | various | `websearch` only | independent | **no** |

**10 of 21 proposed sources are excluded** as not actually opened this
cycle (or, for M3, wrong-subject). This is a real, honest finding about
this audit's *own* research discipline, not just the calibration sample's.

## Part F — Corrected, usable incident ledgers

Only incidents resting on a `webfetch`-sourced, correct-subject source
survive. IDs are unchanged from the prior draft (gaps mark excluded IDs,
left visible rather than silently renumbered, so the correction is
auditable against the prior version).

### Julius Caesar — 8 incidents, unchanged (both C1 and C2 were genuinely opened)
JC-01 (C1, cluster A), JC-02 (C1, cluster B), JC-03 (C1, cluster C), JC-04
(C1, cluster A), JC-05 (C2, cluster D), JC-06 (C2, cluster E), JC-07 (C2,
cluster F), JC-08 (C2, cluster G). Content unchanged from the prior draft.

### Isaac Newton — 4 incidents (down from 8; IN-05 through IN-08 excluded)
IN-01 (apple insight, N1, cluster A), IN-02 (opera, N1, cluster B), IN-03
(Kneller sitting, N1, cluster B), IN-04 (Flamsteed/moon theory, N1, cluster
C). **3 fact clusters** (down from 6). **Provenance: 1 total (Stukeley
only) — fails criterion 1.**

### Ludwig van Beethoven — 8 incidents (down from 11; LB-09 through LB-11 excluded)
LB-01 (Breuning, B1, cluster A), LB-02 (publishers, B1, cluster B), LB-03
(deafness, B1, cluster C), LB-04 (Ries, B1, cluster D), LB-05 (Haydn/Mozart,
B2, cluster E), LB-06/07/08 (custody battle sub-events, B3, cluster F).
**6 fact clusters** (unchanged — LB-09/10/11's exclusion removed
corroborating detail from clusters C and E, not whole clusters). **Provenance:
3 total (Beethoven + Thayer + Interlude.hk), 2 non-self — the only person
whose provenance count improved on review**, since B3 (interlude.hk) turned
out to be genuinely `webfetch`-opened all along.

### Malala Yousafzai — 5 incidents, unchanged (M1/M2 were genuinely opened)
MY-01 (UN speech, M1, cluster A), MY-02/03/04/05 (BBC diary, M2, cluster
B). **2 fact clusters, provenance 1 (self only)** — both unchanged from
the prior draft.

### Abraham Lincoln — 7 incidents (down from 10; the former AL-06/09/10 excluded)
AL-01 (steamboat, L1, cluster F), AL-02 (partnership offer, L1, cluster A),
AL-03 (office routine, L1, cluster A), AL-04 (Congressional case
management, L1, cluster A), AL-05 (Spot Resolutions, L1, cluster B), AL-07
(mentorship advice, L2, cluster A), AL-08 (partnership withdrawal offer,
L2, cluster A). **3 fact clusters** (down from 6 — clusters C/Grant,
D/Willie's death, E/cabinet are gone entirely, since each rested solely on
an excluded incident). **Provenance: 1 total (Herndon only) — fails
criterion 1.**

## Part G/H — Row-level literal attribute maps (source-corrected AND semantic-fit-audited)

Every row below survived two independent checks: (1) its supporting
incident(s) rest on a `webfetch`-opened source (Part E/F), and (2) its
canonical attribute's actual operational definition (recovered from the
live quiz item text, since `attributes.ts` does not carry a semantic
description) genuinely matches the described behavior. Rows that failed
either check are listed as dropped, with the reason, not silently removed.

### Julius Caesar — 5 literal attributes (down from 9)

| Attribute | Incident ID(s) | Primary cluster | Corroborating cluster(s) | Doc./inference | Strength |
|---|---|---|---|---|---|
| leadership_drive | JC-01 | A | — | documented | MODERATE |
| persuasiveness | JC-01 | A | D (JC-05) | documented | MODERATE |
| decisiveness | JC-02 | B | A (JC-04) | documented | MODERATE |
| risk_tolerance | JC-02 | B | — | documented | WEAK |
| adaptability | JC-04 | A | C (JC-03) | documented | MODERATE |

**Dropped, with reason:**
- `conflict_tolerance` (JC-03, JC-05, JC-07) — the attribute's actual
  operational definition (per `quiz.q25`: "say so directly [to a senior],
  even if it makes the room uncomfortable") is about voicing disagreement
  under friction. JC-03/05 are reconciliation/mercy — the opposite
  valence — and JC-07 is Caesar *instigating* retaliation, not tolerating
  friction directed at him. None cleanly fits.
- `impact_motivation` (JC-06) — the actual definition (per `quiz.q29`/`q42`:
  motivated by work whose *effects reach beyond oneself*, not by personal
  interest or polish) does not match "prioritized public reputation over
  private truth in a divorce." No canonical attribute cleanly captures
  reputation-management; none was invented to replace it.
- `autonomy_need` and `opportunity_sensing` (both JC-08) — `autonomy_need`
  is about self-directed *work method* (per `quiz.q32`/`q51`);
  `opportunity_sensing` is specifically about *perceiving early signals of
  change*, not acting on them (an explicit design note in `bank.ts`:
  "anchors deliberately use 'notice'/perception language only, never 'act
  on'"). Punishing tribunes over a crown incident fits neither definition.

**Also fixed**: the prior draft's `decisiveness` row listed JC-02 (cluster
B) and JC-04 (cluster A) under one ambiguous cluster label — this is the
specific mismatch named in the review request. Resolved by giving
`decisiveness` cluster B as its one explicit primary (from JC-02) and
cluster A (JC-04) as an explicit corroborating cluster.

### Isaac Newton — 4 literal attributes (down from 9; the 5 background-corroborated rows are gone along with their now-excluded incidents)

| Attribute | Incident ID(s) | Primary cluster | Doc./inference | Strength |
|---|---|---|---|---|
| curiosity | IN-01 | A | near-direct | MODERATE |
| discipline | IN-02 | B | direct | WEAK |
| ambiguity_tolerance | IN-03 | B | direct | WEAK |
| adaptability | IN-04 | C | direct | MODERATE |

`persuasiveness`, `conflict_tolerance`, `competitiveness`,
`analytical_rigor`, and `persistence` (all previously resting on IN-05
through IN-08) are dropped entirely along with their incidents — not
individually re-litigated for semantic fit, since the incidents
themselves no longer meet the source-traceability bar.

### Ludwig van Beethoven — 10 literal attributes (down from 13; the 3 rows resting solely on LB-09/10/11 are gone)

| Attribute | Incident ID(s) | Primary cluster | Doc./inference | Strength |
|---|---|---|---|---|
| conflict_tolerance | LB-01 | A | documented | MODERATE |
| autonomy_need | LB-02 | B | documented | WEAK |
| risk_tolerance | LB-02 | B | inference | WEAK |
| persistence | LB-03 | C | documented | MODERATE |
| adaptability | LB-03 | C | inference | WEAK |
| perfectionism | LB-04 | D | documented | MODERATE |
| detail_orientation | LB-04 | D | documented | WEAK |
| leadership_drive | LB-04 | D | inference | WEAK |
| collaboration | LB-05 | E | thin/inference | WEAK |
| decisiveness | LB-06, LB-08 | F | documented | MODERATE |

`deep_focus`, `mastery_orientation` (its LB-09 leg), and `achievement_drive`
are dropped — all rested solely on the now-excluded LB-09/LB-11.

### Malala Yousafzai — 4 literal attributes (down from 5)

| Attribute | Incident ID(s) | Primary cluster | Doc./inference | Strength |
|---|---|---|---|---|
| conflict_tolerance | MY-01 | A | documented | MODERATE |
| independent_thinking | MY-01 | A | inference | WEAK |
| impact_motivation | MY-04 | B | documented | WEAK |
| ambiguity_tolerance | MY-02 | B | inference | WEAK |

**Dropped**: `belief_updating` (MY-01) — her actual quoted claim ("I am
the same Malala... my ambitions are the same") is a continuity/resilience
narrative, closer to the *opposite* of belief_updating (revising a view
given new evidence) than an example of it. Caught on the same semantic-fit
pass applied to Caesar, not previously flagged.

### Abraham Lincoln — 6 literal attributes (down from 9; the 3 rows resting solely on the excluded AL-06/09/10 are gone)

| Attribute | Incident ID(s) | Primary cluster | Doc./inference | Strength |
|---|---|---|---|---|
| collaboration | AL-02 | A | documented | MODERATE |
| leadership_drive | AL-02 | A | inference | WEAK |
| discipline | AL-03, AL-04 | A | documented | MODERATE |
| independent_thinking | AL-05 | B | documented | MODERATE |
| conflict_tolerance | AL-05 | B | documented | MODERATE |
| resourcefulness | AL-01 | F | inference | WEAK |

`belief_updating` (former AL-06), `adaptability` (former AL-09), and
`autonomy_need` (former AL-10) are dropped along with their excluded
incidents.

**Mechanical assertions run against every table above** (cap `<=3`
primary attributes per cluster; no attribute assigned two different
primary clusters; no duplicate attribute per person): **all passed, 0
violations**, verified in a local, uncommitted Python script.

## Part I — Current gate applied read-only (fully recomputed)

| Candidate | Crit. 1 (>=2 provenance) | Crit. 3 (>=12 incidents) | Crit. 4 (>=6 clusters) | Crit. 8 (>=20 attributes) | Result |
|---|---|---|---|---|---|
| Julius Caesar | PASS (2) | **FAIL** (8) | PASS (7) | **FAIL** (5) | `INCIDENT_COUNT_INSUFFICIENT` + `ATTRIBUTE_BREADTH_INSUFFICIENT` |
| Isaac Newton | **FAIL** (1) | **FAIL** (4) | **FAIL** (3) | **FAIL** (4) | `SOURCE_DEPTH_INSUFFICIENT` (primary) + all three others |
| Ludwig van Beethoven | PASS (3) | **FAIL** (8) | PASS (6) | **FAIL** (10) | `INCIDENT_COUNT_INSUFFICIENT` + `ATTRIBUTE_BREADTH_INSUFFICIENT` |
| Malala Yousafzai | **FAIL** (1) | **FAIL** (5) | **FAIL** (2) | **FAIL** (4) | `SOURCE_DEPTH_INSUFFICIENT` (primary) + all three others |
| Abraham Lincoln | **FAIL** (1) | **FAIL** (7) | **FAIL** (3) | **FAIL** (6) | `SOURCE_DEPTH_INSUFFICIENT` (primary) + all three others |

**`CALIBRATION_PRE_FREEZE_PASS`: 0 of 5** (unchanged as a headline, but the
supporting numbers are now substantially different and, for 3 of 5 people,
substantially worse than either prior draft reported). Beethoven remains
the strongest result but no longer clears more than 2 of 4 criteria.

## Part J — Existing production profile vs. corrected fresh audit

| Slug | Existing live attrs | Fresh literal attrs | Overlap | Fresh-only | Existing-only |
|---|---|---|---|---|---|
| `julius-caesar` | 21 | 5 | 5 | 0 | 16 |
| `isaac-newton` | 26 | 4 | 3 | 1 (ambiguity_tolerance) | 23 |
| `ludwig-van-beethoven` | 32 | 10 | 10 | 0 | 22 |
| `malala-yousafzai` | 22 | 4 | 4 | 0 | 18 |
| `abraham-lincoln` | 22 | 6 | 5 | 1 (resourcefulness) | 17 |

Fresh-only counts are now 0-1 (was 0-2) — an even tighter subset
relationship than the prior draft showed. Every fresh attribute this audit
found is, with 2 exceptions, already in the existing production profile —
this correction did not surface new evidence contradicting production, it
surfaced that this cycle's own bounded, honestly-sourced research
recovers even less of it than previously reported.

## Part K — Calibration analysis (recomputed mechanically)

```
slug                   existing  fresh  incidents  clusters  totPersp  nonSelf
julius-caesar          21        5      8          7         2         1
isaac-newton           26        4      4          3         1         1
ludwig-van-beethoven   32        10     8          6         3         2
malala-yousafzai       22        4      5          2         1         0
abraham-lincoln        22        6      7          3         1         1

median fresh literal attribute count: 5   (was 9 in both prior drafts)
range: 4-10   (was 5-13)

provenance (>=2 total) pass count: 2/5   (was 4/5)
incident (>=12) pass count:        0/5   (unchanged)
cluster (>=6) pass count:          2/5   (was 4/5)
>=20 attribute pass count:         0/5   (unchanged)
```

1. **Provenance**: **2 of 5 pass** (Caesar, Beethoven) — corrected down
   from 4/5. Newton and Lincoln join Malala in failing criterion 1, each
   for a reason not previously caught: their sole self-authored evidence
   was never actually opened this cycle, only found via search.
2. **Incident floor**: 0 of 5 (unchanged, now more starkly: no one is
   within even a few incidents of the floor — Beethoven's 8 was 11 before
   this pass).
3. **Cluster floor**: **2 of 5 pass** (Caesar, Beethoven) — down from 4/5;
   Newton and Lincoln's cluster counts collapsed along with their incident
   counts.
4. **Attribute floor**: 0 of 5 (unchanged; median attribute count nearly
   halved, from 9 to 5).
5. **Bottleneck, restated**: the dominant bottleneck this pass surfaces is
   not incident depth or the cluster cap alone — it is **this audit's own
   research-discipline gap between "found via search" and "actually
   opened and read."** That gap, once corrected, removes roughly half of
   the originally-reported evidence for 3 of 5 people. This is a finding
   about the *auditing process itself*, not only about the pre-freeze
   gate — a careful narrative write-up (which the first two drafts of
   this very checkpoint were) is not sufficient to catch this class of
   error; a mechanical, source-ID-based trace is what caught it here.

## Part L — Two-level diagnosis (reassessed; classifications retained)

### A. Workflow calibration

**`CURRENT_WORKFLOW_PREFREEZE_MISALIGNED`** — retained, and more strongly
evidenced than before. Under a corrected, source-traceable accounting, 0
of 5 clear the incident floor and 0 of 5 clear the attribute floor, with a
lower median (5, not 9) than either prior draft reported. Even the two
people who still pass the provenance and cluster floors (Caesar, Beethoven)
fail the incident and attribute floors by a wide margin.

### B. Gate calibration

**`GATE_MISALIGNMENT_PROVISIONAL`** — retained, unweakened. This audit
still cannot distinguish "the gate is miscalibrated" from "this bounded,
now-more-honestly-scoped research pass simply didn't dig deep enough" —
if anything, the corrected, sparser baseline makes that gap *larger* and
therefore *less* explored, not more resolved. The classification stays
provisional rather than confirmed in either direction.

## Part M — Recommendation for roster21 (unchanged)

**Recommendation B, unchanged**: keep `eligibility_v2` unchanged; revisit
the pre-freeze prediction rule before roster21. This audit provides no
independent evidence about `eligibility_v2` itself. The corrected numbers
strengthen, rather than undercut, the case that a normal-scale research
pass cannot reliably satisfy the current pre-freeze predictor — including
now surfacing that *maintaining* source-traceability rigor across a
5-person sample, in one session, is itself harder than the first two
drafts of this checkpoint assumed. A future revision of the pre-freeze
rule should account for both findings: the cluster-cap-vs-breadth question
already raised, and the practical difficulty of sustaining "actually
opened, not just found" discipline across a normal research pass without
a mechanical audit step built in from the start.

## Roster count confirmation

Read-only throughout, across all three passes. `peopleIndex.generated.ts`
still lists 125 people; none of the 5 sampled profiles' data was touched.
`data-pipeline/candidates/` corpus untouched (still 272 files). No
`SEED_PEOPLE`, roster*.ts, seed.ts, editorial.ts, dispersion, i18n,
threshold, or rubric file was modified at any point.
