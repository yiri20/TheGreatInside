# Recent-cohort publication-vs-matching architecture diagnostic (2026-09-17)

Analysis-only. No candidate, score, confidence, eligibility threshold, or
matching code was changed to produce this document. Base SHA:
`965f810a1363f91718069ce8b77e2c56c743039a` (`DIAGNOSTIC_BASE_SHA`, PR
#44's merge commit — Roster35). Every number below comes from the repo's
own `evaluateMatchEligibility()`, `buildInventory()`/`aggregateCohort()`
(`src/dev/roster1000/audits/matchPoolIntegrityAudit.ts`), and committed
roster/candidate files, via temporary scripts deleted before this commit.

**Trigger**: three consecutive new-candidate expansion cycles (Roster33,
34, 35 — 37 people total) produced **zero** newly match-eligible people.
This is a pre-declared watch condition, not itself proof of a defect —
this document exists to determine the actual cause.

## Confirmed post-merge state

Production **262**, directory-visible **261**, match-eligible **114**,
candidate JSON **325**, legacy baseline **22** (0 flagged).
`validateCandidates.ts`: 0 errors/0 warnings. `checkScoringLockIntegrity.ts`:
"Checked 325 previously-committed candidate file(s) against HEAD. 0
flagged." All exactly as expected; no drift since Roster35's own
post-commit check.

## 1. The eligibility architecture, read from source

`ELIGIBILITY_VERSION = "eligibility_v2"` (`src/core/matching/similarity.ts:136`).

```
ELIGIBILITY = {
  minScoredAttributes: 18,
  minCoverage: 0.6,
  highConfidence: { threshold: 0.5, minCount: 12, minAverageConfidence: 0.55 },
  eligibleStatuses: {"approved", "published"},
}
```

- `evaluateMatchEligibility()` (`similarity.ts:445-489`): `scored =
  person.attributes.length`. `coverage = sum(ATTRIBUTES[a].baseWeight for
  scored a) / TOTAL_BASE_WEIGHT` — a **weighted** ratio over the taxonomy's
  per-attribute matching weight, NOT a simple row-count fraction, and
  entirely confidence-blind. `highConfidenceCount`/`highConfidenceAverage`
  are computed only over the subset of scored attributes at `confidence >=
  0.5`. A person is eligible only if all four numeric gates pass AND
  `status` is publishable.
- Attribute denominator: `TOTAL_BASE_WEIGHT` (`similarity.ts:312`) =
  `sum(ATTRIBUTES[id].baseWeight for id in ATTRIBUTE_IDS)` = **34.25**
  across the current **34** attributes (`attributes.ts:209-244`,
  `TAXONOMY_VERSION = "taxonomy_v1.1"`), weights ranging 0.85-1.20 (mean
  1.007, only mildly non-uniform).
- Missing-attribute/confidence treatment in matching itself: `buildTerms()`
  (`similarity.ts:183-209`) skips any attribute the person has no scored
  row for entirely (`if (!pa) continue`); every scored attribute
  participates in the raw similarity computation at its own continuous
  `confidence` weight regardless of eligibility. **Eligibility and matching
  read the same data through two deliberately different lenses** — this is
  documented explicitly in the `eligibility_v2` header comment.
- Candidate promotion: `checkPromotionReadiness()`/
  `preparePersonSeedForPromotion()` (`src/dev/roster1000/candidateSchema.ts`)
  — never reads `computedEligibility.eligible`.
- Publication-vs-eligibility separation: `Person.isDirectoryVisible` vs.
  `Person.isMatchEligible` (`src/core/types.ts`), architecture decided in
  `docs/checkpoints/profile-publication-vs-match-eligibility.md`
  (2026-09-08).
- Mechanical content-quality floor: `meetsContentQualityFloor()`
  (`src/core/people/rosterQuality.ts`) does **not** require 18 scored
  attributes — only a non-empty trait profile. Deliberately decoupled from
  `eligibility_v2` (see that file's own header comment and
  `candidateSchema.test.ts` Case F, a real, deliberately-authored test
  proving a synthetic 3-row/0.4-confidence profile must still pass this
  floor).
- Scoring rubric: `docs/scoring-rubric-v1.md` (evidence-type/confidence
  discipline governing what row VALUES are honest, not eligibility itself).

## 2. Threshold provenance

- **`minScoredAttributes: 18` / `minCoverage: 0.6`**: predate all visible
  git history — already present, unchanged, in the repository's earliest
  preserved checkpoint (`docs/archive/session-history/roster-1000-checkpoint.md`
  §0, "Baseline audit"), which itself confirms the taxonomy was **already
  34 attributes** (`taxonomy_v1.1`) at that same baseline point. **The
  hypothesis that these two floors were originally calibrated against a
  smaller, pre-`taxonomy_v1.1` attribute set and later became misaligned
  by taxonomy growth is NOT supported by available history** — they have
  coexisted with the current 34-attribute taxonomy for the entire
  documented life of this project. True original provenance: **UNKNOWN**
  (predates the earliest preserved checkpoint). Do not rewrite this as
  more certain than it is.
- **`highConfidence: { threshold: 0.5, minCount: 12, minAverageConfidence:
  0.55 }`**: introduced at a specific, identifiable commit,
  `3aa1fd8` ("roster-1000: session 10 -- implement eligibility_v2, promote
  9 candidates"), replacing a flat, unweighted `minAverageConfidence` gate.
  Provenance: **EMPIRICAL CALIBRATION**, extensively documented in
  `roster-1000-checkpoint.md` §43-53. Session 8 proposed a first "Model B";
  session 9 explicitly re-validated it out-of-sample per direct user
  mandate and found session 8's own reported numbers **did not reproduce**
  (a genuine, disclosed error in now-deleted analysis tooling). Session 9
  then ran a **1,715-point parameter grid sweep** and found the honest
  result is **bimodal, not smoothly tunable**: at any threshold combination
  in the range originally proposed, held-candidate admission is pinned at
  0-1 while still preserving the trusted eligible cohort; a genuinely
  looser region only opens up far outside that range, and doing so would
  abandon a meaningful share of the previously-trusted, validated eligible
  cohort. The final, shipped `eligibility_v2` numbers are the result of
  that corrected, adversarially-checked process — not an arbitrary or
  informally-picked set of numbers.
- **Not later adjusted.** No commit after `3aa1fd8` changes any
  `ELIGIBILITY` value. Confirmed via `git log -S` on the const block.
- The 18-row floor's OWN purpose is separately documented and empirically
  grounded (§47 of the same archive checkpoint, session 8): a blind
  accepted-vs-held comparison found source count nearly identical between
  accepted (2.60) and held (2.50) candidates — **not** the differentiator
  — while `documented`-tier evidence share was more than double for
  accepted candidates (54.7% vs 26.5%). The floor's consolidated,
  historically-confirmed finding: it creates real, measurable pressure
  toward generic, low-confidence "padding" attributes, but it ALSO exists
  to prevent thin, cherry-picked profiles from mechanically dominating
  matches (the exact failure mode `applyCoverageShrinkage` and the
  canonical matching-simulation protocol were built to catch). **Both are
  true simultaneously** — this project's own prior work already reached
  this nuanced conclusion; this diagnostic does not need to re-derive it.

## 3. Cohort definitions (mechanical)

- **Cohort A (recent, 37)**: everyone in `ROSTER_33 ∪ ROSTER_34 ∪ ROSTER_35`.
- **Cohort B (current match-eligible, 114)**: `isMatchEligible === true`.
- **Cohort C (pre-Roster33 candidate-backed, 203)**: has a
  `data-pipeline/candidates/*.json` file and is not in Cohort A. Further
  split for era comparison: **ancient pre-separation pipeline** (103 —
  roughly roster2-16, i.e. candidate-backed but not in roster24-35) vs.
  **post-separation, pre-Roster33** (100 — roster24-32).
- **Cohort D (legacy, no candidate file, 22)**: comparison metadata only,
  not behaviorally inspected or rescored.

## 4. Gate-failure matrix, Cohort A (37 people)

| Gate | Fail count (of 37) |
|---|---|
| `scored >= 18` | 36 |
| `coverage >= 0.6` | **37** |
| `highConfidenceCount >= 12` | 33 |
| `highConfidenceAverage >= 0.55` | 9 |

Gates-passed distribution: 0 gates — 9 people; 1 gate — 24; 2 gates — 3;
3 gates — 1 (Walt Disney: passes scored/hcCount/hcAvg, fails coverage
alone at 0.537 vs 0.6, the closest miss in the cohort); 4 gates (fully
eligible) — 0. Failure-combination counts: `coverage+hcCount+scored` (24),
`coverage+hcAvg+hcCount+scored` (9), `coverage+scored` (3, all with
14-16 rows), `coverage` alone (1, Walt Disney).

**`coverage` is the universally binding constraint (37/37 fail it); no
one in this cohort is close except Walt Disney.** This is structurally
different from the historically-documented "near miss" pattern (session 8's
accepted/held comparison, or the roster12-13 postmortem's Castro/Nehru at
0.599) — those were 0.001-0.005 short. This cohort's coverage deficits
are large.

## 5. Distance-to-gate distribution, Cohort A

| Metric | min | median | p75 | max |
|---|---|---|---|---|
| row-count deficit (to 18) | 0 | 12 | 13 | 15 |
| coverage deficit (to 0.6) | 0.063 | 0.418 | 0.448 | 0.517 |
| HC-count deficit (to 12) | 0 | 7 | 8 | 12 |
| HC-avg deficit (to 0.55, where HC>0) | 0 | 0 | 0 | 0.032 |

Descriptive only. Most of Cohort A is **far** from every numeric floor,
not narrowly missing it — a materially different situation from the
historical near-miss pattern this project has previously documented and
already declined to chase.

## 6. Cohort distribution comparison

| | Cohort A (37) | Cohort B eligible (114) | Cohort C pre-R33 candidate-backed (203) |
|---|---|---|---|
| rows: min/median/p75/max | 3/6/8/18 | 20/22/23/34 | 5/20/22/29 |
| coverage: min/median/p75/max | 0.083/0.182/0.238/0.537 | 0.600/0.653/0.686/1.00 | 0.149/0.606/0.648/0.851 |
| HC-count: min/median/p75/max | 0/5/7/17 | 12/16/21/31 | 2/12/15/26 |
| HC-avg: min/median/p75/max | 0/0.575/0.616/0.674 | 0.551/0.601/0.632/0.729 | 0.513/0.590/0.620/0.694 |
| median source count | 4 | 3 | 4 |

Cohort C's median (20 rows, 0.606 coverage) sits almost exactly at the
eligibility floor — its 45.8% eligible share (93/203) reflects a
population that, as a whole, was historically built to roughly that
depth. Cohort A's median (6 rows, 0.182 coverage) is **not** the same
population shape at all — it is a fundamentally thinner set of profiles,
not a near-miss set.

## 7. Era/lineage comparison — where the real discontinuity is

| Era | Shipped | Eligible | Eligible share | Median rows | Median coverage | Median source count |
|---|---|---|---|---|---|---|
| Ancient pre-separation (~roster2-16) | 103 | 90 | **87.4%** | 21 | 0.631 | 4 |
| Post-separation, pre-R33 (roster24-32, combined) | 100 | 3 | 3.0% | 18 | 0.546 | 4 |
| Roster33 | 14 | 0 | 0% | 5 | 0.151 | 3 |
| Roster34 | 12 | 0 | 0% | 9 | 0.272 | 6 |
| Roster35 | 11 | 0 | 0% | 6 | 0.180 | 5 |

Per-cycle trend within roster24-32 (median rows): r24=15.5, r25=18,
r26=18, r27=**20**, r28=**20**, r29=**20**, r30=18, r31=**10**, r32=**11**,
then r33=5, r34=9, r35=6. **Two distinct discontinuities, not one**:

1. **Ancient → post-separation (r16→r24)**: eligible share collapsed from
   87% to 3%, but row-count/coverage stayed close to the floor (median
   18-20 rows, 0.55-0.6 coverage) — consistent with the ALREADY-DOCUMENTED
   `ROSTER_EXPANSION_METHOD_REQUIRES_DECISION` finding (Roster21-23: three
   different research strategies, all landing short in the same
   structural way) that triggered the deliberate publication/eligibility
   architecture split.
2. **r30→r31 onward**: median rows fall further, from ~18-20 down to
   ~5-11, and stay there through Roster35 — a second, later, and
   previously **undocumented** decline, distinct from discontinuity 1.

Source counts do **not** show a corresponding decline (r24-r35 all sit in
the 3-8 range, no trend) — whatever changed between r30 and r31 changed
how much evidence gets converted into distinct, scoreable rows, not how
much source material gets gathered.

## 8. Taxonomy-denominator finding

`TOTAL_BASE_WEIGHT = 34.25` across 34 attributes. Computed directly from
`ATTRIBUTES[*].baseWeight`:

- Best-case coverage with exactly **18** scored rows (the 18 highest-weight
  attributes in the whole taxonomy): **0.558** — short of 0.6 regardless of
  which 18 are chosen.
- Best-case coverage with **19** rows: 0.587 — still short.
- Minimum rows to reach 0.6 coverage in the best case (highest-weight-first):
  **20** (reaches 0.616).
- Coverage is mathematically **guaranteed** ≥ 0.6 from **22** rows onward,
  regardless of composition.

This exact mathematical fact — **18 or 19 scored rows can never reach 0.6
coverage no matter how strong the evidence is** — was already discovered
and documented once before, in
`docs/checkpoints/roster12-13-coverage-postmortem.md` (2026-09-05), which
concluded the same thing this diagnostic independently re-derives:
"the roster-12 and roster-13 checkpoints' own working assumption — that 18
scored attributes was a reasonable per-candidate target because it matches
`ELIGIBILITY.minScoredAttributes` — was mistaken." Its own recommendation
(§6-8 of that document) was to raise the **pre-freeze evidence-depth
target** to "≥21-attribute-capable," not to touch the formula. **`18` is a
floor below which a candidate is rejected outright; it was never, and
still is not, a sufficient target.** Walt Disney (18 rows, 0.537 coverage)
is a fresh, direct illustration of exactly this same already-known
mechanism, three roster-cycles and twelve days later — not a new
discovery, a recurrence of a known one.

**18-vs-0.6 redundancy**: NOT redundant — coverage is strictly the
binding, harder constraint at every row count below 20 (nothing between
18 and 20 rows can pass coverage; `scored>=18` alone never independently
excludes a coverage-passer). They are complementary in principle (row
count guards a floor on breadth; coverage guards a floor on weighted
coverage) but in the CURRENT taxonomy's practical range, coverage
dominates almost entirely — this matches the gate-failure matrix above
(37/37 fail coverage, only 1/37 fails coverage alone).

## 9. Source-depth vs. profile-breadth (Cohort A)

`corr(sourceCount, scoredAttributes) = 0.674`; `corr(sourceCount, coverage)
= 0.673` — a real positive correlation *within* Cohort A (more sources
does track with more rows for this specific cohort). **Correlation is not
causation**, and the more revealing comparison is across cohorts, not
within one: Cohort A's median source count (4) is **not lower** than
Cohort B's (3) or Cohort C's (4) — the historically match-eligible
population was not built from more source material than Cohort A has.
Rows-per-source in Cohort A: min 0.8 (Larry Page: 5 sources → 4 rows),
median 1.33, max 4.0 (John von Neumann: 4 sources → 16 rows, a
backlog-reused, previously-corrected file — see Roster35's own checkpoint).
**A small bounded look at the outliers** (not a full re-audit): Larry
Page and Yuri Gagarin have relatively many sources for few rows (both are
subjects whose abundant public-facing material is largely undifferentiated
career narrative, not personality-relevant incident detail); Alexander von
Humboldt and John von Neumann have relatively few sources but many rows
(both are subjects whose few sources are unusually dense, incident-rich
biographical/scholarly texts). This supports the rubric's own stated
design: source **kind and incident density**, not source count, is what
converts into scoreable rows — consistent with the already-documented
session 8 finding (§47) that source count does not differentiate
accepted from held candidates, and that `documented`-tier row **share**
does.

## 10. Sparse-profile matching-code behavior

- `rankMatches`/`rankSimilarPeople`/`selectors.ts` filter to
  `person.isMatchEligible` **before** any similarity computation
  (`similarity.ts:512`, `personSimilarity.ts:88`, `selectors.ts:147`) —
  a genuinely excluded person never enters distance computation at all.
- For an eligible person, `buildTerms()` restricts comparison to the
  attributes BOTH the user answered AND the person has scored — a person
  with only 6 scored rows, if hypothetically eligible, would be compared
  on however many of those 6 the user also answered, weighted by
  confidence.
- `matchUserToPerson()` independently applies `applyCoverageShrinkage()`
  (`similarity.ts:350-353`) to every comparison: the displayed match
  score is pulled toward `NEUTRAL_RAW_SIMILARITY` in proportion to how
  much of the full taxonomy the OVERLAPPING terms actually cover for
  *this specific pairing* — a real, existing, per-comparison dampener
  against thin-overlap extremity, independent of and in addition to
  eligibility_v2's admission gate.
- **This shrinkage does not substitute for eligibility_v2.** It reacts to
  per-comparison overlap, not to the person's absolute profile breadth —
  a 6-row person whose 6 rows happen to all be attributes a given user
  answered would show little shrinkage despite representing under 1/5 of
  the full personality model, and could still surface an extreme,
  narrow-basis match percentage. Eligibility_v2's role — guaranteeing a
  MINIMUM absolute breadth and a minimum confident-evidence subset before
  a person is comparable AT ALL — is a genuinely different, non-redundant
  protection.
- **Yes**, a sparse 4-10 row profile produces a mathematically well-defined
  similarity number if admitted — the formula does not fail or error on
  it. The concern this project's own historical validation work (§47, §52-
  53 of the archive checkpoint) already confirmed is statistical
  reliability/domination risk, not a computational defect.

## 11. Documented purpose of `eligibility_v2`

From the code's own header comment and the archive checkpoint: **DOCUMENTED
PURPOSE** — prevent thin/flat, low-evidence profiles from mechanically
dominating similarity rankings by concentrating comparison on a small,
favorable, cherry-picked subset of dimensions; guarantee a validated
minimum absolute breadth (`minScoredAttributes`/`minCoverage`, confidence-
blind) plus a validated minimum confident-evidence core
(`highConfidence.minCount`/`minAverageConfidence`) before a profile
participates in matching at all. This is explicitly, empirically
validated (out-of-sample, cross-validated, parameter-swept — session 9)
to preserve every pre-existing trusted match-eligible person. **INFERENCE**
(not directly stated in code/docs, but a reasonable reading of "Incomplete
profiles stay browsable but never match"): the product intends the
Directory (browsable) and the matching pool (comparable) to be
legitimately different-sized surfaces, not the same population viewed two
ways.

## 12. Single-gate ablations (Cohort A, offline, diagnostic only)

| Configuration | Eligible count (of 37) |
|---|---|
| A. Current rules (baseline) | 0 |
| B. Remove ONLY the row-count floor | 0 |
| C. Remove ONLY the coverage floor | 1 (Walt Disney) |
| D. Remove ONLY the HC-count floor | 0 |
| E. Remove ONLY the HC-average floor | 0 |

**Coverage is the single component that actually binds** for this cohort
— removing it alone admits exactly the one near-miss (Walt Disney);
removing any other single gate alone admits no one. This matches §4's
gate-failure matrix precisely and is fully consistent with, not a
contradiction of, session 9's already-completed finding that no
threshold combination in a wide, honestly-swept parameter space
meaningfully loosens admission without abandoning trusted-cohort
integrity. No threshold was changed to produce this table.

## 13. Current matching-pool product health

Total eligible: **114**. Interest-scope pools: science_knowledge 50,
arts_culture 43, leadership_society 42, building_discovery 15. Latest
accepted matching-health simulation (`docs/checkpoints/roster33.md`,
not re-run here per instruction): `simulate.ts 10000 quiz` against a
239-person roster (eligible population unchanged since), max #1-match
frequency **11.7%** (Warren Buffett), comfortably under the ~20% concern
line; `sensitivity.ts` across 5 seed offsets ranged 10.2%-11.7%. **A
114-person matching pool, spread across all four categories with no
domination signal, is currently a healthy, functioning product surface**
— nothing here indicates the pool needs to grow at the same rate as the
Directory to remain adequate; it is a deliberately different-sized,
different-purpose surface by the 2026-09-08 architecture decision.

## 14. Building_discovery specific check

The 15 eligible building_discovery people: ada-lovelace, alan-turing,
warren-buffett, coco-chanel, ernest-shackleton, thomas-edison,
wilbur-wright, grace-hopper, muhammad-ali, akio-morita,
alexander-hamilton, gertrude-bell, theodore-roosevelt,
john-d-rockefeller, nellie-bly. Field diversity is real, not
single-domain: mathematics/computing (Lovelace, Turing, Hopper),
finance/business (Buffett, Rockefeller, Morita), design (Chanel),
exploration (Shackleton, Bell, T. Roosevelt), engineering/technology
(Edison, Wright), sport (Ali), politics/law (Hamilton), literature
(Bly) — at least 8 distinct fields represented across 15 people, not a
narrow cluster. Recent building_discovery additions (Tenzing Norgay,
Michael Jordan, Sam Walton, Larry Page, Alexander von Humboldt, John von
Neumann) are excluded overwhelmingly by `coverage` (all fail it; only von
Neumann and Humboldt additionally clear the row-count floor) — the same
single binding gate as the rest of Cohort A, not a category-specific
issue. This category is the clearest visible PRODUCT consequence of the
publication/matching split (Directory-side building_discovery coverage
44→50 this cycle alone, match-eligible flat at 15 for three cycles), but
the mechanism is identical to every other category, not a distinct defect.

## 15. Three root-cause models — evidence assessment

**MODEL A (expected architecture)** — strong support: the 2026-09-08
publication/eligibility separation was an explicit, informed decision made
*because* Roster21-23's three genuinely different research strategies all
failed `eligibility_v2` in the same way; the decision text itself says
`eligibility_v2` "is not lowered or replaced... stops conflating it with a
different question." Session 9's exhaustive, already-completed parameter
sweep found no better admission formula exists without sacrificing trusted-
cohort integrity. The 37/0 outcome is the direct, foreseeable, already-
anticipated consequence of a decision already made with full knowledge of
this exact pattern.

**MODEL B (research-protocol mismatch)** — partial, real support, but not
decisive: median achieved rows fell from ~18-20 (roster27-30) to ~5-11
(roster31-35) while source counts stayed flat — a genuine, previously
undocumented, mechanically-confirmed trend. However, within the SAME
recent cycles, well-documented individuals still produce many rows (Walt
Disney: 18 rows in the same Roster34 batch that produced Andy Warhol's 6)
— suggesting the decline tracks **which people were selected** (Roster30+'s
deliberate domain-balance/zero-politics/recognizability-mix selection
policy pulling in more genuinely less-documented figures to fill
underrepresented categories) at least as much as any change in research
diligence. Cannot cleanly separate "protocol got shallower" from "this
project started deliberately choosing harder, thinner-evidence subjects
on purpose" from the data available here.

**MODEL C (eligibility-architecture mismatch)** — not supported by
available evidence. The 18/0.6 floors have coexisted with the current
34-attribute taxonomy since the earliest preserved checkpoint (not eroded
by later taxonomy growth, as an initial mathematical coincidence
[18/30 = 0.6 exactly, using the ORIGINAL 30-attribute pre-`taxonomy_v1.1`
set] suggested before checking history — that coincidence is disclosed
here for transparency but is NOT corroborated as the actual causal
history). The `highConfidence` subset was rigorously, adversarially,
empirically validated (session 9). A full, already-completed 1,715-point
parameter sweep found no viable looser alternative. Re-opening this
without new mathematical insight beyond what session 9 already tested
would repeat already-exhausted, already-negative-result work.

**MODEL D (bug)** — not found. The coverage formula was independently
re-verified against `ATTRIBUTES[*].baseWeight` and matches the validator's
own output exactly (as the roster12-13 postmortem also already confirmed
independently). No implementation defect discovered.

## 16. Final classification

**A. CONTINUE_EXPANSION_AS_IS**

The 114-person matching pool is a deliberate, already-validated,
currently-healthy, intentionally separate surface from the growing,
honestly-published Directory. The 37/0 outcome across Roster33-35 is the
expected, already-anticipated consequence of a decision made in full
awareness of this exact pattern (2026-09-08), reinforced by an
already-completed, rigorous, adversarial search (session 9) that found no
better eligibility formula exists without sacrificing the trusted
cohort's integrity. No architecture change is justified now.

**Secondary observation, flagged but not escalated**: the roster27→35
row-count decline (§7) is real and worth a small, bounded, PROSPECTIVE
check in a future cycle — not a retroactive rescue, and not urgent, since
current product health (§13) shows no adequacy problem today. If a future
session wants to test whether deliberately budgeting closer to the
already-known ~21-row target (roster12-13 postmortem §6, never
consistently adopted) changes anything for a comparably-documented
candidate, that is a legitimate, cheap, low-risk experiment — but it is
not required by anything found here, and should not retroactively touch
any of the 37 people already shipped.

**Recommended next task**: Roster36, exactly as the pre-declared plan
already anticipated. Legacy Integrity Batch 6 remains untouched. No
eligibility, coverage, matching, or scoring code should change as a
result of this diagnostic.
