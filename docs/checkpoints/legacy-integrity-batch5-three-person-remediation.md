# Legacy integrity remediation batch 5: three-person risk-triaged remediation (2026-09-14)

Authoritative base: `main`@`f53f49b2fede2f66045f8f9abc8c099c8fbaeda4` (PR #39,
the batch-4 remediation, merged). Fifth cycle in the targeted legacy-integrity
lane (PR #36: Akira Kurosawa; PR #37: Bruce Lee, Ludwig van Beethoven, Nikola
Tesla; PR #38: Srinivasa Ramanujan, Toni Morrison, Hayao Miyazaki; PR #39:
Richard Feynman, Simone Biles, Steve Jobs — all ten lost match eligibility,
all deliberately selected from the highest-risk end of the cohort, not a
random sample — see §18 for why that distinction matters). This cycle
reuses batch 2-4's deterministic risk-triage methodology, corrected in
batch 4 to use the TRUE 30-attribute base set, against the 25-person legacy
cohort remaining after batches 1-4. **Not** Roster33 — no new-person
research was performed.

## 1. Mechanical enumeration of the legacy cohort

`SEED_PEOPLE.filter(p => !hasCandidateFile(p.slug))` at the base commit:
**25 people** (mechanically re-derived fresh via a script, matching the
count PR #39 left behind — not hardcoded).

## 2. Risk-triage methodology — corrected, otherwise unchanged from batch 2-4

Reused verbatim from
`docs/checkpoints/legacy-integrity-batch2-three-person-remediation.md` §2:
source scarcity (+3/+1), high-confidence rows in the unsupported base set
(+1 to +4 by tier), "documented"-tier rows in the unsupported base set (+1
to +4 by tier), no external Wikidata QID (+2), ancient/medieval era with
>=15 high-confidence rows (+2), max confidence >=0.85 with <=1 source (+2),
a trait-claiming tag with no/weak corresponding row (+2 per mismatch), and
alphabetical tie-break. No new signal added, no signal removed, no weight
changed.

**Explicit correction carried forward from batch 4**: the "unsupported base
set" is the TRUE 30 original pre-taxonomy_v1.1 attribute ids. Verified fresh
from `attributes.ts`'s own docstring before ranking (not from memory): *"taxonomy_v1.1
additions (all four...): opportunity_sensing, resourcefulness,
proactive_agency [world_sense, new]; belief_updating [thinking, new]"* — so
`belief_updating` is excluded from the base set, alongside the other three.
`ATTRIBUTE_IDS` was read directly to construct the 30-id set mechanically,
not reused from a prior cycle's possibly-stale constant.

### Full ranking (25) and top-10 detail

```
 1. genghis-khan                 score=10   (tie, first alphabetically)
 2. serena-williams               score=10
 3. oprah-winfrey                 score=9    (first alphabetically in a
                                              three-way tie at 9)
 4. wangari-maathai                score=9
 5. yi-sun-sin                     score=9
 6. ada-lovelace                   score=8
 7. alan-turing                    score=8
 8. coco-chanel                    score=8
 9. leonardo-da-vinci               score=8
10. mahatma-gandhi                  score=8
```

- **genghis-khan** (10): 1 source; 20 high-confidence rows in the
  unsupported base set (of 20 present); 2 "documented"-tier claims; no
  Wikidata QID; medieval era with >=15 high-confidence base rows.
- **serena-williams** (10): 2 sources; 27 high-confidence base rows (of 30
  present); 12 "documented"-tier claims; no QID; max confidence 0.95.
- **oprah-winfrey** (9): 1 source; 24 high-confidence base rows (of 30
  present); 2 "documented"-tier claims; no QID. Won a three-way tie at 9
  against wangari-maathai and yi-sun-sin by alphabetical order.
- 4th-10th: wangari-maathai, yi-sun-sin, ada-lovelace, alan-turing,
  coco-chanel, leonardo-da-vinci, mahatma-gandhi — the same shape at lower
  magnitude. Not frozen; left unaudited per §17, not claimed defective.

## 3. Frozen three

**genghis-khan, serena-williams, oprah-winfrey** — the top three by the
corrected, unchanged methodology, printed before any research began. Not
substituted, not re-sampled, not chosen with eligibility outcome in mind.
Confirmed independently by mechanical recomputation, matching the task
prompt's own "prior-ranking context" list only after the fact.

**Genghis Khan is this lane's first political/military-primary-identity
target.** Per this cycle's own explicit instruction, the newer zero-politics
cohort-*selection* policy (which governs which NEW candidates get chosen for
future rosters) does not apply to legacy *data-integrity* auditing. He was
audited on identical evidentiary terms as the other two targets — no
special exclusion, no extra scrutiny or leniency in either direction.

## 4. Research budget and sources

Sequential research (max 2 concurrent source lookups), target 4-7
substantive sources per person. Eligibility was not computed or consulted
until all three were fully scored and locked.

**Genghis Khan** (3 total source records; 2 substantive non-Wikipedia):
*The Secret History of the Mongols* (c. 1228, the earliest surviving
Mongolian-language chronicle, written within Mongol court circles — a
primary source, not one of the later hostile Persian chronicles this
profile's existing editorial already flags as unreliable for casualty
figures); Jack Weatherford's *Genghis Khan and the Making of the Modern
World* (2004, independent modern scholarship). **Disclosed limitation**:
below the 4-7 target on raw count. For a 13th-century subject, this
reflects genuine source scarcity relative to a modern figure, not
under-research — the two sources used are unusually authoritative for the
era (a primary in-house chronicle plus a widely-cited independent modern
history), and the existing profile's own prior research (Wikipedia,
re-verified) supplied several already-confirmed facts (the Otrar incident,
the decimal reorganization) this cycle built on rather than re-discovered.

**Serena Williams** (5 total source records; 4 substantive non-Wikipedia):
her own memoir *On the Line* (2009, pre-existing); independent journalism
on the 2018 US Open final dispute with umpire Carlos Ramos; her own quoted
statements on Serena Ventures; her own 2022 Vogue retirement essay "The
Hardest Part." Meets the source target comfortably.

**Oprah Winfrey** (4 total source records; 3 substantive non-Wikipedia):
independent journalism and court record on the 1998 Texas cattlemen "mad
cow" lawsuit (*Texas Beef Group v. Winfrey*, 11 F. Supp. 2d 858);
independent journalism on the 2007 Leadership Academy for Girls abuse
allegations and her institutional response; multiple outlets describing
her own Book Club selection process. Slightly below the 4-7 target on raw
count, though the cattlemen-trial source bundles court record + multiple
outlets' coverage of the same six-week event — disclosed rather than
padded with duplicate citations of the same event.

## 5. Incident ledgers (built before scoring, preserved here)

Per this cycle's own explicit instruction, these ledgers were constructed
*before* any row was rescored, from evidence gathered during research —
not reconstructed afterward. Each entry lists source(s), period, and which
final row(s) it supports; entries are never counted per-source or
per-retelling, only per genuinely distinct behavioral episode.

### Genghis Khan — 7 distinct incidents

| # | behavior/action | source(s) | period | firsthand/secondary | supports |
|---|---|---|---|---|---|
| 1 | Ambushed and killed his half-brother Behter after Behter withheld hunting spoils from him and his brother Qasar; scolded by his mother; spared the other half-brother Belgutei, later a loyal general | The Secret History of the Mongols | ~1176 (age ~14) | firsthand (Mongol court chronicle) | decisiveness, conflict_tolerance, competitiveness |
| 2 | Sustained roughly a decade of rivalry with childhood anda Jamukha; after Jamukha's own followers betrayed him (1206), executed the betrayers on the stated principle that betrayal merits the harshest punishment; offered to renew brotherhood with Jamukha; granted Jamukha's request for a dignified, bloodless execution when refused | Secret History (via Wikipedia's Jamukha article) | 1201-1206 | secondary, tracing to the primary chronicle | decisiveness, conflict_tolerance, competitiveness, autonomy_need |
| 3 | After a military defeat at the Battle of Qalaqaljid Sands, retreated to Baljuna and swore a mutual-fidelity oath with a small group of companions spanning nine tribes and three faiths | Wikipedia (Baljuna Covenant) | 1203 | secondary | persistence, collaboration, leadership_drive, proactive_agency |
| 4 | Assigned administrative/military responsibilities by individual ability and loyalty rather than kinship — a departure from standard steppe court practice | Weatherford (2004) | post-1206 | secondary | systems_abstraction, independent_thinking, leadership_drive |
| 5 | Restructured Mongol society into a decimal military-administrative system (units of ten/hundred/thousand), deliberately dispersing defeated tribal groups | Wikipedia (pre-existing finding, re-verified) | 1206 onward | secondary | systems_abstraction, planning_orientation, leadership_drive |
| 6 | After the Otrar governor executed a Mongol trade caravan and Shah Muhammad II executed/mutilated the envoys sent to demand redress, launched the invasion that toppled the Khwarazmian state | Wikipedia (pre-existing finding, re-verified) | 1219-1221 | secondary | decisiveness, risk_tolerance, conflict_tolerance |
| 7 | Exploited shifting tribal alliances (Merkit/Tatar/Kerait/Naiman) at a specific fragile political moment during early unification | Wikipedia (pre-existing finding, re-verified) | pre-1206 | secondary | opportunity_sensing |

Coverage: 13/13 final rows mapped (systems_abstraction: 4,5; independent_thinking:
4; planning_orientation: 5; persistence: 3; risk_tolerance: 6; decisiveness:
1,2,6; collaboration: 3; leadership_drive: 3,4,5; conflict_tolerance: 1,2,6;
competitiveness: 1,2; autonomy_need: 2; opportunity_sensing: 7;
proactive_agency: 3).

**Not used as evidence**: his father's poisoning and the clan's abandonment
of his family (the circumstance itself, per this project's health/tragedy
discipline — only his own later, independently documented rebuilding
actions were used); no specific casualty figure for the Khwarazmian
campaign (existing, still-valid caveat about unreliable hostile-chronicle
sourcing).

### Serena Williams — 4 distinct incidents

| # | behavior/action | source(s) | period | firsthand/secondary | supports |
|---|---|---|---|---|---|
| 1 | At the 2018 US Open final: coaching-violation warning, racket break, then verbal confrontation with umpire Carlos Ramos ("thief"), escalating to a game penalty; publicly alleged gender-based differential treatment afterward | Independent journalism (NPR, CBS News, ESPN) | Sept. 8, 2018 | secondary, multiply corroborated | decisiveness, social_assertiveness, conflict_tolerance, competitiveness |
| 2 | Built Serena Ventures over 14+ years while still competing professionally; invested in 85+ companies (14 unicorns); stated mission to fund founders who "level the playing field for women and people of colour" | Her own quoted statements (AfroTech, CNBC, Forbes) | ~2009-2010 onward | firsthand + independent reporting | planning_orientation, autonomy_need, impact_motivation, proactive_agency |
| 3 | 2022 Vogue essay: deliberately chose "evolution" over "retirement" ("I have never liked the word retirement"), while acknowledging genuine pain | Her own essay, Vogue, Sept. 2022 | 2022 | firsthand | decisiveness, autonomy_need |
| 4 | Won the 2017 Australian Open at ~8 weeks pregnant; after postpartum pulmonary embolism, pressed medical staff for specific tests when her own account of symptoms was not initially acted on; became a public maternal-health advocate | Pre-existing finding, re-verified | 2017 onward | secondary | independent_thinking, persistence, proactive_agency |

Coverage: 10/10 final rows mapped (independent_thinking: 4; planning_orientation:
2; persistence: 4; decisiveness: 1,3; social_assertiveness: 1; conflict_tolerance:
1; competitiveness: 1; autonomy_need: 2,3; impact_motivation: 2; proactive_agency:
2,4).

**Not used as evidence**: her father's decision to move the family to
Compton and coach her (his agency, not hers, at that age — same discipline
applied elsewhere in this lane); the 2017 medical complications themselves
(only her documented act of pressing for tests, and her subsequent
advocacy choice, were used).

### Oprah Winfrey — 5 distinct incidents

| # | behavior/action | source(s) | period | firsthand/secondary | supports |
|---|---|---|---|---|---|
| 1 | Personally defended her 1996 on-air mad-cow-disease comments through a ~6-week jury trial rather than retracting, testifying: "I am in this courtroom to defend my name"; the jury ruled in her favor | Independent journalism + court record (Texas Beef Group v. Winfrey) | 1996 (show) / 1998 (trial) | secondary + her own quoted testimony | independent_thinking, risk_tolerance, decisiveness, social_assertiveness, persuasiveness, conflict_tolerance, autonomy_need |
| 2 | After 6 of 152 students at her South African Leadership Academy accused a dorm matron of abuse, personally brought in her own private investigators, traveled to the school twice, publicly apologized, and pledged to "clean house" | Independent journalism (NPR, CBS News, ABC News) | 2007 | secondary | decisiveness, leadership_drive, conflict_tolerance, impact_motivation, proactive_agency |
| 3 | Personally selects every Book Club title without financial benefit, skimming ~50 pages of 10-12 candidates before committing to the one that resonates | Multiple outlets (Time, Bibliolifestyle) describing her own process | ongoing since 1996 | secondary, relaying her own described method | intuitive_synthesis, independent_thinking, discipline, autonomy_need |
| 4 | Shifted her show in the 1980s toward personal, empathetic, issue-driven content ahead of competitors' sensationalist format | Pre-existing finding, re-verified | 1980s | secondary | opportunity_sensing |
| 5 | Founded Harpo Productions in 1986 to control her own content rather than remain hired talent | Pre-existing finding, re-verified | 1986 | secondary | proactive_agency, autonomy_need |

Coverage: 13/13 final rows mapped (intuitive_synthesis: 3; independent_thinking:
1,3; discipline: 3; risk_tolerance: 1; decisiveness: 1,2; social_assertiveness:
1; leadership_drive: 2; persuasiveness: 1; conflict_tolerance: 1,2; autonomy_need:
1,3,5; impact_motivation: 2; opportunity_sensing: 4; proactive_agency: 2,5).

**Not used as evidence**: the 2007 abuse allegations themselves are not
Oprah's own behavior (only her institutional-response actions are used,
the same discipline this project applies to a survivor's or advocate's
response to a circumstance beyond their own conduct).

## 6. Row disposition (mechanically computed by diffing old vs. new tuples
   with a script, per this lane's established discipline)

| person | original rows | retained (rescored) | added | removed | retained % |
|---|---|---|---|---|---|
| genghis-khan | 22 (20 base + 2 v1.1) | 13 | 0 | 9 | 59% |
| serena-williams | 31 (30 base + 1 v1.1) | 10 | 0 | 21 | 32% |
| oprah-winfrey | 32 (30 base + 2 v1.1) | 13 | 0 | 19 | 41% |

Genghis Khan's 59% retention is the highest of any target across all five
cycles in this lane (previous high: Steve Jobs, 48%, batch 4) — an honest
reflection of the unusually rich, primary-sourced evidentiary record a
13th-century subject rarely has (see §18).

Removed-row lists:

- **Genghis Khan**: analytical_rigor, discipline, execution_speed,
  adaptability, ambiguity_tolerance, social_assertiveness, persuasiveness,
  achievement_drive, impact_motivation.
- **Serena Williams**: curiosity, analytical_rigor, intuitive_synthesis,
  systems_abstraction, creative_originality, experimentation, cross_domain_range,
  aesthetic_sensitivity, discipline, deep_focus, detail_orientation,
  perfectionism, execution_speed, adaptability, risk_tolerance, ambiguity_tolerance,
  collaboration, leadership_drive, persuasiveness, mastery_orientation,
  achievement_drive.
- **Oprah Winfrey**: curiosity, analytical_rigor, systems_abstraction,
  creative_originality, experimentation, cross_domain_range, aesthetic_sensitivity,
  deep_focus, detail_orientation, perfectionism, execution_speed, planning_orientation,
  persistence, adaptability, ambiguity_tolerance, collaboration, mastery_orientation,
  achievement_drive, competitiveness.

`achievement_drive`/`impact_motivation` (Genghis Khan), `mastery_orientation`/
`achievement_drive` (Serena), and `mastery_orientation`/`achievement_drive`
(Oprah) were removed specifically because the only support behind them was
the scale of the person's conquests/record/career (achievement/output), not
a distinct behavioral incident — the same recurring pattern every cycle in
this lane has found. No new rows added for any of the three this cycle
(0/0/0), consistent with every prior cycle.

### Field-change counts (mechanically computed by script)

| person | retained | score changed | confidence changed | evidenceType changed | impact changed |
|---|---|---|---|---|---|
| genghis-khan | 13 | 11/13 | 12/13 | 2/13 | 4/13 |
| serena-williams | 10 | 10/10 | 10/10 | 7/10 | 3/10 |
| oprah-winfrey | 13 | 10/13 | 10/13 | 3/13 | 4/13 |

## 7. Metadata / tag audit

Checked `tagIds`/`archetypeIds`/`occupationIds`/`fieldIds`/`impactDomains`
against the final audited rows for all three, per the Kurosawa/Biles
precedent. **No stale trait-claiming tag found for any of the three this
cycle** — Genghis Khan's `conqueror`/`organizer`, Serena's `competitor`/
`career_changer`/`sustained_excellence`, and Oprah's `founder`/`communicator`/
`overcame_adversity` are all either well-supported by retained rows (e.g.
Serena's `competitor` still maps to her retained, though much-lower-scored,
`competitiveness` row) or occupational/biographical descriptors rather than
narrow psychological trait-claims. No tag added, removed, or invented on
any production person's `tagIds`.

**A different, novel downstream metadata consequence was found instead**
(see §12): the Directory's curated personality-filter taxonomy
(`PERSONALITY_TAXONOMY`, `src/core/people/directoryTaxonomy.ts`) required
correction as a mechanical side effect of this cycle's honest rescoring.

## 8. Evidence-discipline confirmations

- **Legend/tradition vs. behavior**: n/a this cycle.
- **Third-party reputation vs. own behavior**: no retained row for any of
  the three rests on a bare reputational assessment; each cites a named,
  dated, concrete action or the subject's own words.
- **Achievement/acclaim excluded**: no retained row cites a title count,
  conquest scale, medal count, or ratings figure directly as evidence (see
  §6's removed-row rationale).
- **Health/tragedy/private-life discipline**: Genghis Khan's father's
  murder and the family's abandonment were read but not used as row
  evidence — only his own later rebuilding actions were used. Serena's
  2017 childbirth complications were read but only her act of pressing
  for tests, and her subsequent advocacy, were used. Oprah's 2007 academy
  crisis: the underlying abuse allegations are not her own behavior and
  were not used; only her institutional-response actions were used.
- **Product-selection policy kept out of the audit** (this cycle's own
  explicit instruction): Genghis Khan's political/military identity was
  not treated as grounds for special exclusion, extra scrutiny, or
  leniency — he was audited exactly like Serena Williams and Oprah
  Winfrey. A dedicated regression test
  (`legacyIntegrityBatch5Remediation.test.ts`) checks this explicitly.
- **No eligibility rescue**: all three failed eligibility_v2 by a clear
  margin (see §9) — no row was revisited after computing eligibility.

## 9. Publication decision — before eligibility

For each of the three, independently: sources, ledger, rows, scores,
confidence, evidenceType, impact, and metadata were frozen in
`data-pipeline/candidates/<slug>.json` with status `evidence_approved`
**before** `eligibility_v2` was computed for any of them.

## 10. Eligibility — computed once, after all three were locked

| | genghis-khan | serena-williams | oprah-winfrey |
|---|---|---|---|
| scored attributes (before -> after) | 22 -> 13 | 31 -> 10 | 32 -> 13 |
| coverage (after) | 0.384 | 0.292 | 0.384 |
| high-confidence count (after) | 13 | 10 | 13 |
| high-confidence average (after) | 0.593 | 0.586 | 0.592 |
| eligible (before -> after) | true -> **false** | true -> **false** | true -> **false** |
| failing sub-gates | breadth, coverage | breadth, coverage, high-confidence count | breadth, coverage |

Genghis Khan and Oprah Winfrey each fail on two sub-gates; Serena Williams
fails on all three (her high-confidence count, 10, falls just under the
12-count floor). None were rescued; none were adjusted after this result
was seen. Verified twice: once against the actual current `SEED_PEOPLE`,
once by reconstructing each person's pre-remediation tuples from the
committed base commit and re-running `evaluateMatchEligibility` against
them, confirming the "before" column honestly (all three: true).

## 11. Downstream consequences (eligible set changed: 117 -> 114)

- **Eligible set diff**: removed `genghis-khan`, `serena-williams`,
  `oprah-winfrey`; added none. Mechanically confirmed via
  `matchPoolIntegrityAudit.ts`.
- **Interest-area pools**: science_knowledge 50->50 (unchanged — none of
  the three have a science_knowledge-mapping field), arts_culture 43->43
  (unchanged), leadership_society 43->42 (genghis-khan: military/politics,
  both map here, counted once), building_discovery 17->15 (serena-williams:
  sport/business; oprah-winfrey: business — "media" does not map to any
  of the four categories) — exactly consistent with each person's
  unchanged `fieldIds`.
- **Dispersion**: regenerated (`pnpm calibrate`, run twice).
  `DISPERSION_VERSION` unchanged (`dispersion_v1`). Source N 117->114,
  meanSd 11.769->11.704. Max per-attribute delta: **0.0385** on
  `competitiveness` (1.2138->1.1753) — the largest single-attribute
  dispersion shift of any cycle in this lane so far (previous cycles:
  0.0087, 0.0258, 0.0254, 0.0211), driven by `competitiveness` being
  touched for all three targets at once (retained-but-rescored for two,
  removed for one).
- **Calibration**: measured honestly, not assumed "no refit." See §13 —
  this cycle's drift crossed the established no-refit threshold for the
  first time, and a routine anchor refresh was performed.
- **Matching-health**: `pnpm simulate 10000 quiz` against the new
  114-person eligible set shows no rank/invariant failure and no
  domination issue (#1-frequency max 11.7%, Warren Buffett, up slightly
  from batch 4's 11.1% but not a structural concern).

## 12. Directory personality-filter taxonomy (novel downstream consequence)

Removing or downgrading `competitiveness` for all three targets pushed its
live qualification stats below BOTH curation floors:
`qualifyingShare` 0.1076 -> **0.0965** (floor: 0.1) and `confidentN` (was
>=20) -> **19** (floor: 20) — confirmed via `traitQualification()` run
directly against the live roster, not assumed. This exact situation already
has precedent in the same file: `belief_updating` was previously excluded
from `PERSONALITY_TAXONOMY` for an identical reason (`confident_n` 18,
below the 20-person floor). Applied the same treatment: removed
`competitiveness` from the `motivation` facet's curated attribute list and
extended the module's own doc comment explaining why, mirroring
`belief_updating`'s precedent exactly. This is a Directory-browse-filter
curation consequence, unrelated to `eligibility_v2` — no matching formula,
threshold, or quiz logic was touched. `directoryTaxonomy.test.ts`'s
live-roster band test (which recomputes the qualification stats fresh
against `SEED_PEOPLE` rather than trusting the constant) caught this
automatically; no test itself needed correcting, only the curated
constant.

## 13. Calibration: threshold crossed, routine refresh performed

Fresh `pnpm calibrate` anchors were measured against the current
114-person eligible set and compared to the committed
`MATCH_CALIBRATION_ANCHORS`:

| percentile | committed | proposed | abs delta |
|---|---|---|---|
| p0.1 | 0.3667 | 0.3748 | **0.0081** |
| p1 | 0.3884 | 0.3937 | 0.0053 |
| p5 | 0.4089 | 0.4124 | 0.0035 |
| p10 | 0.4206 | 0.4235 | 0.0029 |
| p25 | 0.4421 | 0.4442 | 0.0021 |
| p50 | 0.4694 | 0.4705 | 0.0011 |
| p75 | 0.5001 | 0.4997 | 0.0004 |
| p90 | 0.5298 | 0.5277 | 0.0021 |
| p95 | 0.5483 | 0.5451 | 0.0032 |
| p99 | 0.5840 | 0.5789 | 0.0051 |
| p99.9 | 0.6269 | 0.6201 | 0.0068 |

Max drift **0.0081 raw at p0.1** — for the first time in this lane, at or
just past the `<0.008` figure batches 2-4 treated as "leave it alone."
Measured honestly rather than rationalized away: 0.0081 is a genuine,
if narrow, crossing, and the task's own instructions were explicit not to
assume "no refit" this cycle.

**This project's own real precedent for exactly this situation** (not
invented for this cycle) was found in
`docs/archive/session-history/roster-1000-checkpoint.md` §18: a prior
roster-growth session measured match-anchor drift of **0.012 raw** (50%
larger than this cycle's) and greatness-anchor drift of **0.0138 raw**,
and treated both as a "routine refresh, no version bump" — pasting the
freshly-fitted values into `MATCH_CALIBRATION_ANCHORS`/`GREATNESS_
CALIBRATION_ANCHORS` while leaving `CALIBRATION_VERSION` at
`calibration_v3`, per the same file's own documented distinction between
"noise-level" drift (no touch needed) and "materially different, larger"
drift that justifies an actual version bump (the taxonomy_v1.1 migration
that produced `calibration_v3` itself, which shifted top-1's median by 4
points and Greatness's by 6 — nothing like this cycle's shift). `docs/
adding-a-person.md` step 9 confirms the same rule directly: "only paste
the printed anchor values if drift is large enough to matter... a small
roster addition usually shows negligible drift and `CALIBRATION_VERSION`
correctly stays unbumped."

**Action taken**: refreshed both `MATCH_CALIBRATION_ANCHORS`
(`src/core/matching/calibration.ts`) and `GREATNESS_CALIBRATION_ANCHORS`
(`src/core/greatness/greatness.ts`) to the values `pnpm calibrate`
actually produced — not tuned to restore or preserve any particular
number. `CALIBRATION_VERSION` stays `calibration_v3`; `DISPERSION_VERSION`
stays `dispersion_v1`; `matching_v2`/`greatness_v1` untouched. Max
greatness drift measured at **0.0136 raw** (p0.1), comfortably under this
project's 0.024-raw greatness budget for an unbumped refresh. Both
docstrings were extended explaining the refresh and citing the precedent.
Confirmed no test pins an exact anchor value (`grep` across `*.test.ts`
for the literal committed numbers found none — only structural
monotonicity/iteration checks), and confirmed `personDataFingerprint`'s
existing DI-parameter architecture (`src/core/people/dataVersion.test.ts`,
"session 5 provenance fix") already defaults to the live anchor tables, so
a cached/stored profile result is correctly invalidated by this refresh
even without a `CALIBRATION_VERSION` bump — no additional code change was
needed for this. Full `vitest run` (§16) confirms 0 regressions from the
anchor refresh itself.

## 14. Legacy scoring-lock

`legacyScoringLock.generated.ts` regenerated after all three candidate
files were finalized: **25 -> 22** people in the baseline (mechanically
confirmed via the generator's own reported count). Pre-commit
`checkScoringLockIntegrity.ts`: 287 candidate-JSON-backed people checked
(this cycle's 3 new files not yet committed at that point — see §19 for
the required post-commit re-run), 22 legacy-baseline people
fingerprint-checked, 0 flagged. No non-target person's tuple touched.

## 15. Historical audit snapshot (PR #35's frozen sample)

None of the three batch-5 targets (`genghis-khan`, `serena-williams`,
`oprah-winfrey`) belong to PR #35's frozen `FROZEN_16_ELIGIBLE`/`FROZEN_8_
CONTROLS` sample in `matchPoolIntegrityAuditManual.ts` -- mechanically
confirmed (`grep` for all three slugs in that file returns no match).
`SUPERSEDED_AUDIT_SLUGS` therefore did **not** need extending this cycle;
that file is untouched. A regression test
(`legacyIntegrityBatch5Remediation.test.ts`) proves this explicitly.

## 16. Editorial and validation

**Editorial**: audited EN/KO editorial (`src/core/i18n/editorial.ts`) for
all three. Genghis Khan's `interpretation.turning_point.1` cites
`proactive_agency` (retained, still 82); Serena's `interpretation.
turning_point.1` cites `independent_thinking`/`proactive_agency` (both
retained); Oprah's `interpretation.turning_point.1` cites
`opportunity_sensing` (retained). All three checked and found still
valid, no correction needed — a genuine "nothing to fix" finding, unlike
batch 4's Biles row/editorial mismatch.

**Validation**: `tsc --noEmit` clean · `validateCandidates.ts` 0 errors/0
warnings (290 candidate files: 287 + this cycle's 3) ·
`checkScoringLockIntegrity.ts` (pre-commit) 0 flagged (287 JSON-diff-checked
+ 22 legacy-baseline-checked — see §19 for the required post-commit
re-run) · full `vitest run` clean after fixing 8 stale hardcoded-count/
exception-list assertions across 4 test files (`matching.test.ts` — two
separate `knownNonEligible` set declarations both extended;
`profilePublicationSeparation.test.ts`; `matchPoolIntegrityAudit.test.ts`)
**plus** two genuinely new categories of downstream test staleness this
cycle uncovered for the first time: `directoryTaxonomy.ts`'s
`PERSONALITY_TAXONOMY` curated list (§12) and a Korean-locale Playwright
assertion (below) · 31 new table-driven tests in
`legacyIntegrityBatch5Remediation.test.ts` (one more than batch 4's 30 —
an added test confirming genghis-khan received no special product-policy
treatment) · 939/939 tests passing total (62 files) · production build
clean (474 static pages, unchanged count) · focused Playwright
(`peopleDirectory`, `person.visual`, `compare.visual`) 118/118 passing
after one fix (below).

**Playwright fix** (`e2e/peopleDirectory.spec.ts`): the ko-KR "cross-facet
personality AND gives the same result as en-US" test hardcoded an expected
count of 7 for the curiosity+collaboration filter combination. Oprah
Winfrey was one of the original five people establishing this set (per
the test's own extensive change-log comment, tracked across nine prior
roster cycles) with curiosity 78/confidence 0.62 and collaboration 78/
confidence 0.62 — both removed this cycle for lacking distinct behavioral
support beyond her general media-career reputation. Verified directly via
`personExhibitsTrait()` that the live set is now exactly 6 people (Lincoln,
Franklin, Darwin, Goodall, Rubin, Erdős) — Oprah no longer satisfies either
threshold. Corrected the assertion from 7 to 6 and extended the test's own
established change-log comment style with the reasoning above — not a
newly-discovered bug in the filter logic, an honest consequence of
evidence-based rescoring, the same discipline this file's own history
already applies to roster growth.

**Manual verification** (production build via `next start`): Genghis
Khan's EN profile renders the correct 13 traits, honest "Not yet included
in personality matching" copy, correct 3 sources, correct interpretation
link; Serena Williams's KO profile renders correctly at mobile width
(375px), including the correct "b. 1981" living-person date format and
correct trait cards; the Compare route for Oprah Winfrey shows the correct
honest "isn't included in matching yet" copy. The People Directory page
was also checked after the `competitiveness` chip removal: renders with no
console errors, and "Competitiveness" no longer appears as a filter
option. No console errors on any check.

## 17. Post-commit scoring-lock re-run (required this cycle)

Because `checkScoringLockIntegrity.ts` determines "previously committed"
status via `git show HEAD:<candidate-path>`, the three new candidate files
only count once the implementation commit exists. §16's pre-commit figure
(287) was therefore not the number to report as final. Re-run against the
actual committed HEAD (`15ffca4`), the checker's exact literal output is:

```
Checked 290 previously-committed candidate file(s) against HEAD. 0 flagged.
Legacy scoring lock: 22 pre-pipeline production people covered, 0 flagged.
```

290 = the pre-commit 287 + this cycle's 3 new candidate files, now
themselves committed. 22 matches the legacy-baseline figure in §14
exactly (same regeneration, no drift). Applied via a small, docs-only
follow-up commit to this file, per this cycle's own instructions -- no
behavioral work reopened.

## 18. Remaining legacy cohort (22 people, unaudited, not defective)

```
leonardo-da-vinci, marie-curie, ada-lovelace, yi-sun-sin, frida-kahlo,
alan-turing, mahatma-gandhi, confucius, socrates, warren-buffett,
coco-chanel, rosalind-franklin, jane-goodall, ibn-khaldun, wangari-maathai,
malala-yousafzai, benjamin-franklin, rumi, yayoi-kusama, zheng-he,
nelson-mandela, wolfgang-amadeus-mozart
```

**This is not a claim any of them are defective.** They remain unaudited by
this cycle's methodology, not proven either way -- wangari-maathai and
yi-sun-sin (risk score 9, the next tier down) are the most reasonable
candidates for a future batch 6 if a strategic decision is made to
continue.

## 19. Strategic result and stop-rule assessment

**3 of 3 frozen targets lost match eligibility.** Genghis Khan and Oprah
Winfrey each failed on two clear sub-gates; Serena Williams failed on all
three. None were narrow misses (unlike batch 2's Bruce Lee).

Combined with the prior four cycles, **13 of 13 deeply-remediated
HIGH-RISK legacy profiles across five cycles have now lost match
eligibility.** As established starting batch 4's own corrected wording:
these thirteen were never a random or representative sample — they were
deliberately selected from the highest-risk end of the cohort by the
risk-triage formula, five cycles running. This is strong evidence the
triage method is useful for **prioritizing** review; it does **not**
establish a general failure rate, does **not** estimate predictive
accuracy/sensitivity/specificity, and does **not** prove the remaining 22
profiles are defective.

**Stop-rule assessment** (per this cycle's own explicit framework):

- **Retained-row proportion this batch**: 59% (genghis-khan), 32%
  (serena-williams), 41% (oprah-winfrey) — mean ~44%. Two of three
  (Serena, Oprah) remain squarely in this lane's established
  severe-collapse range (30-45%, seen in every prior cycle); Genghis
  Khan's 59% is a new high for the lane, exceeding batch 4's previous
  high (Jobs, 48%).
- **Source quality/depth**: generally strong; Genghis Khan's case shows
  that source *quality* (an in-house primary Mongol chronicle) can
  compensate for source *scarcity* (only 2 substantive sources, below
  target) in a way that produces unusually durable rows — a genuinely new
  data point, not simply "cycles are getting easier."
- **Does severe unsupported-row collapse remain common?** Yes — 2 of 3
  this cycle, and a clear majority (10 of 13) across all five cycles.
- **Are eligibility failures becoming narrow misses?** No — all three
  this cycle failed clearly on 2-3 sub-gates each, none within a hair of
  the line (unlike batch 2's Bruce Lee, still the only genuinely narrow
  miss in the lane).
- **Is remediation yield diminishing?** Mixed signal, not a clean trend:
  row-retention proportion rose again this cycle (Jobs 48% -> Genghis
  Khan 59%), but two of three targets still collapsed severely, and this
  cycle surfaced two entirely new categories of genuine downstream
  integrity work (§12's Directory taxonomy fix, §16's Playwright fix) —
  evidence the lane is still finding real, previously-invisible
  consequences of legacy data quality, not running out of things to find.

**Recommendation: CONTINUE the legacy lane for at least one more cycle.**
The primary stop-rule condition (severe collapse becoming uncommon, or
failures becoming narrow misses) has not been met — it was met by neither
metric this cycle. Genghis Khan's high retention is worth tracking as a
possible signal that *source type* (primary chronicles for historical
figures vs. thin single-Wikipedia-sourced modern reputations) may matter
more than *cycle number* for predicting how much of a profile survives
honest audit — future batches should watch this explicitly rather than
assuming a uniform "diminishing returns over time" story. This
recommendation is not executed here; starting a batch 6 or Roster33 is
explicitly out of scope for this PR.

## 20. Explicit confirmations

- Only genghis-khan, serena-williams, and oprah-winfrey received new
  behavioral research, manual evidence review, rescoring, or data
  modification this cycle.
- The remaining legacy cohort (22 people after this cycle, plus the 13
  already remediated across prior cycles) was mechanically read where
  necessary — once for the risk-triage inventory, once when
  `generateLegacyScoringLock.ts` regenerated the baseline — but never
  researched, manually reviewed, or rescored, and no production data
  outside the three targets was modified.
- No eligibility rescue for any of the three.
- Genghis Khan's political/military identity received no special
  exclusion or leniency; product-selection policy was kept out of this
  data-integrity audit.
- Roster33 not started. Batch 6 not started.
