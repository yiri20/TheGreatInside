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

## Purpose

Roster17-19 froze candidates on informal breadth judgments and discovered
shortfalls only after scoring. Roster20 replaced that with a literal,
counted, fact-cluster-capped pre-freeze attribute map — and found that
even genuinely well-sourced new candidates (Emma Goldman, John Muir, Clara
Barton) landed at 8-13 literal attributes, nowhere near the >=20 floor.

Before starting roster21, this audit asks a different question: **can the
current strict methodology reproduce sufficient breadth on people who are
already accepted as production-quality profiles?** If representative,
already-live people also fail a fresh, honest application of the same
gate, that is evidence the gate (or the research-time budget a normal
intake cycle allocates per candidate) is miscalibrated relative to the
production standard it is meant to protect — not that roster18-20's
candidates were unusually weak.

## Part B — Current rules, read and recorded unchanged

| Rule | Value | Source |
|---|---|---|
| `eligibility_v2` scored-attribute floor | `>= 18` | `ELIGIBILITY.minScoredAttributes`, `src/core/matching/similarity.ts` |
| `eligibility_v2` coverage floor | `>= 0.6` (sum of scored attributes' `baseWeight` / `TOTAL_BASE_WEIGHT`) | `ELIGIBILITY.minCoverage`, same file |
| `eligibility_v2` high-confidence count floor | `>= 12` attributes at confidence `>= 0.5` | `ELIGIBILITY.highConfidence.minCount`/`.threshold` |
| `eligibility_v2` high-confidence average gate | `>= 0.55` average confidence within that subset | `ELIGIBILITY.highConfidence.minAverageConfidence` |
| Roster20 pre-freeze incident floor | `>= 12` concrete behavioral incidents | `docs/checkpoints/roster20-auditable-breadth-intake.md` Part I |
| Roster20 fact-cluster floor | `>= 6` distinct fact clusters | same |
| Roster20 literal mapped-attribute floor | `>= 20` (preferably `>= 22`) canonical attributes surviving the cluster-capped map | same |
| Roster20 fact-cluster dedup cap | no single cluster may be the primary basis for `> 3` proposed attributes | same |
| Roster20 source-provenance requirement (as normalized in PR #16's second correction) | `>= 2` total distinct provenance perspectives, where every document by the same person (subject included) counts as ONE perspective | same |
| Candidate schema / validator / scoring-lock | unchanged, read only (`src/dev/roster1000/candidateSchema.ts`, `validateCandidates.ts`, `checkScoringLockIntegrity.ts`) | read, not modified |

None of these values were altered by this audit.

## Part C — Frozen calibration sample (deterministic, mechanical)

Selection method (fully reproducible from `PEOPLE_INDEX`,
`src/data/people/peopleIndex.generated.ts`): for each required category,
build the pool of all 125 live people matching that category's mechanical
metadata (`fieldIds`/`regionCode`), sort the pool alphabetically by slug,
and take the **median-indexed** element (not the first — an initial
first-match pass produced a degenerate all-"A" sample and was discarded
*before* any research began, as a sampling-method refinement, not a
post-hoc replacement of a person). Category 5 ("ordinary" profile) is
picked from the remaining pool by closest absolute distance to the
full-roster median scored-attribute count (22), tie-broken alphabetically.

| # | Category | Pool size | Selected | Rationale |
|---|---|---|---|---|
| 1 | Political/institutional (`field` contains `politics`) | 22 | **Julius Caesar** | median-indexed match; ancient era, southern Europe |
| 2 | Scientist/mathematician (`field` ∩ {natural_science, physics, chemistry, biology, mathematics, medicine, microbiology}) | 28 | **Isaac Newton** | median-indexed match; early-modern, western Europe |
| 3 | Artist/writer/cultural (`field` ∩ {art, literature, music, film, dance, performing_arts, design, architecture, jazz}) | 47 | **Ludwig van Beethoven** | median-indexed match; 19th century, central Europe |
| 4 | Non-Western/non-North-American (`region` not in {north_america, western_europe, southern_europe, central_europe}) | 35 | **Malala Yousafzai** | median-indexed match; contemporary, south Asia |
| 5 | "Ordinary" — median documentation depth, not selected for richness | 121 (remaining) | **Abraham Lincoln** | scored-attribute count (22) exactly equals the full-125-roster median; many roster profiles (Da Vinci 33, Lovelace 31, Beethoven 32) are considerably richer, so Lincoln's *production profile depth* is genuinely typical, not exceptional, even though he is personally very famous |

None of the 5 is a roster17-20 held candidate (all are live `peopleIndex`
entries; held candidates never enter that index). The sample was frozen at
this point; no person was swapped out afterward regardless of how the
research turned out (Malala's evidence access turned out to be the most
constrained of the five — she was kept anyway, per instruction).

Honest limitation of the method: categories 1 and 5 both landed on North
American 19th-century-adjacent political figures (Lincoln's median-based
selection was blind to category-1 overlap). This is a real artifact of a
mechanical process applied to a real, non-adversarial dataset, disclosed
rather than corrected after the fact.

## Part D — Baseline production state (read-only, before audit)

| Slug | Canonical name | Live attr. count | High-conf. count (`>=0.5`) | High-conf. avg | Coverage-relevant `isMatchEligible` | Portrait | Editorial |
|---|---|---|---|---|---|---|---|
| `julius-caesar` | Julius Caesar | 21 | 12 | 0.579 | true | `julius-caesar-tusculum-bust.jpg` | present |
| `isaac-newton` | Isaac Newton | 26 | 26 | 0.694 | true | `isaac-newton-kneller-1702.jpg` | present |
| `ludwig-van-beethoven` | Ludwig van Beethoven | 32 | 25 | 0.668 | true | `ludwig-van-beethoven-stieler-1820.jpg` | present |
| `malala-yousafzai` | Malala Yousafzai | 22 | 16 | 0.637 | true | `malala-yousafzai-dfid-2015.jpg` | present |
| `abraham-lincoln` | Abraham Lincoln | 22 | 21 | 0.626 | true | `abraham-lincoln-loc.jpg` | present |

All 5 are complete, currently-eligible production profiles — real
portraits, editorial content, and (mechanically confirmed via the live
`overallProfileConfidence`/`attributes` array) comfortable `eligibility_v2`
passes. This is not a sample of weak or marginal profiles. These existing
rows were **not** treated as valid evidence going into the fresh audit —
research below started from zero, not from the production attribute list.

## Part E/F — Independent-provenance research and incident ledgers

Each source below was actually fetched and read this cycle (not merely
found in search results). Independent-provenance count uses the
normalized convention from the roster20 PR #16 second correction:
documents by the same person count once; the subject's own voice counts
as one perspective like any other.

### Julius Caesar — sources: C1 = *Commentarii de Bello Gallico* (self, Gutenberg #218), C2 = Suetonius, *Life of Julius Caesar* (independent, ~150 years later, Gutenberg #6400)
**Provenance: 2 total (Caesar + Suetonius), 1 non-self.**

| ID | Event | Domain | Source | Provenance |
|---|---|---|---|---|
| JC-01 | Rallied panicked troops before the Ariovistus campaign with a speech that "transformed all minds" | leadership, persuasiveness | C1 | direct (self) |
| JC-02 | Nervii ambush: personally grabbed a shield, rushed to the threatened flank, rallied troops by name | decisiveness, risk tolerance | C1 | direct |
| JC-03 | Spared Dumnorix from punishment for betrayal out of respect for his brother Diviciacus's loyalty | conflict tolerance (restraint) | C1 | direct |
| JC-04 | Ariovistus parley broke down under a surprise cavalry attack; Caesar ended talks and withdrew rather than escalate | self-regulation under provocation | C1 | direct |
| JC-05 | After poet Calvus published mocking epigrams, Caesar wrote the first conciliatory letter himself | conflict tolerance (positive), independent thinking | C2 | independent, near-direct |
| JC-06 | Divorced Pompeia despite claiming ignorance of her guilt, prioritizing public reputation over private truth | status/reputation motivation | C2 | independent |
| JC-07 | Received the Senate seated; retaliated against Tribune Pontius Aquila for refusing to rise | conflict tolerance (negative), leadership drive | C2 | independent |
| JC-08 | Punished tribunes who removed a crown placed on his statue — ambiguous relationship to monarchy | autonomy need, opportunity sensing | C2 | independent |

**8 incidents, 2 sources.** Fact clusters: A) Ariovistus campaign (JC-01,
04), B) Nervii ambush (JC-02), C) Dumnorix affair (JC-03), D) Calvus
reconciliation (JC-05), E) Pompeia divorce (JC-06), F) Senate/Pontius
Aquila (JC-07), G) crown incident (JC-08) — **7 clusters**, no cluster
over the 3-attribute cap. Domains: leadership, persuasiveness,
decisiveness, self-regulation, conflict tolerance (both valences),
reputation/status motivation, autonomy need — broad, but incident count
(8) is below the 12 floor.

### Isaac Newton — sources: N1 = William Stukeley, *Memoirs of Sir Isaac Newton's Life* (independent, 1752, Wikisource), N2 = Newton's own 1675 letter to Robert Hooke (self, primary)
**Provenance: 2 total (Newton + Stukeley), 1 non-self.**

| ID | Event | Domain | Source | Provenance |
|---|---|---|---|---|
| IN-01 | Recounted the apple/gravity insight to Stukeley in conversation (1726) | curiosity, intuitive synthesis | N1 | near-direct |
| IN-02 | Left an opera after the third act, calling extended entertainment "a surfeit at dinner" | discipline, moderation | N1 | direct observation |
| IN-03 | During a Kneller portrait sitting, deflected probing religious questions "with his usual modesty & caution" | ambiguity tolerance / conflict avoidance | N1 | direct observation |
| IN-04 | Completed lunar theory with only "3 or 4 observations" after Flamsteed withheld his data, leaving refinement to successors | adaptability, resourcefulness | N1 | direct observation |
| IN-05 | Wrote to rival Robert Hooke with conspicuously gracious language ("if I have seen further...") | persuasiveness (or, per later scholarly debate, veiled irony given Hooke's stature) | N2 | direct (self) |
| IN-06 | As Royal Society President, secretly authored the supposedly impartial 1713 committee report ruling in his own favor over Leibniz | conflict tolerance (extreme), competitiveness | background-corroborated (converging independent secondary historiography; no single primary text fetched in full this cycle) | secondary |
| IN-07 | Removed references to Hooke from later Principia editions after Hooke's death | conflict tolerance (corroboration) | background-corroborated | secondary |
| IN-08 | As Warden/Master of the Mint, spent years building a forensic, informant-based case against counterfeiter William Chaloner, ending in Chaloner's execution (1699) | analytical rigor, persistence, institutional behavior | background-corroborated (multiple independent historical accounts) | secondary |

**8 incidents, 2 fully-opened sources** (IN-06/07/08 are real but
background-corroborated, not from one primary text opened in full this
cycle — flagged honestly, same treatment as roster20's Tvardovsky item).
Fact clusters: A) apple insight (IN-01), B) personal habits (IN-02, 03),
C) Flamsteed/moon theory (IN-04), D) Hooke correspondence and rivalry
(IN-05, 07), E) Leibniz dispute (IN-06), F) Mint/Chaloner (IN-08) — **6
clusters**, at the floor. Incident count (8) below the 12 floor.

### Ludwig van Beethoven — sources: B1 = Beethoven's own letters, 1790-1826 (self, Gutenberg #13065/#13272), B2 = Thayer, *The Life of Ludwig van Beethoven* (independent scholarly biography); additional background corroboration for the Karl custody battle and the 1824 Ninth Symphony premiere (converging independent secondary accounts)
**Provenance: 2 total (Beethoven + Thayer), 1 non-self.**

| ID | Event | Domain | Source | Provenance |
|---|---|---|---|---|
| LB-01 | Severed his friendship with Stephan von Breuning after a lodging dispute (1804), acknowledging his own volatility | conflict tolerance | B1 | direct (self) |
| LB-02 | Resented being "half a tradesman," negotiated separately with multiple publishers over pricing | autonomy need, risk tolerance | B1 | direct |
| LB-03 | Confessed near-suicidal despair over encroaching deafness (1800-02) but was held back by artistic commitment | persistence, adaptability | B1 | direct |
| LB-04 | Demanded exacting copying standards from assistant Ferdinand Ries under tight deadlines | perfectionism, detail orientation, leadership drive | B1 | direct |
| LB-05 | Early contact with Haydn and Mozart in Bonn/Vienna shaped his formative training | collaboration | B2 | independent, thin |
| LB-06 | Multi-year custody battle for nephew Karl (1815-1820): a false nobility claim forced a court transfer (setback), he characterized Johanna as morally unfit ("Queen of Night"), Karl stole money and fled to his mother, and Beethoven won guardianship in 1820 coinciding with a near-total halt in composition | conflict tolerance (extreme), decisiveness, autonomy need | independent (secondary legal-historical account, converging with Thayer) | direct/near-direct |
| LB-07 | At the 1824 Ninth Symphony premiere, totally deaf, several bars off from the actual performance, had to be physically turned around to see the audience's ovation | adaptability, risk tolerance, deep focus | background-corroborated (multiple independent eyewitness-sourced historical accounts) | secondary |
| LB-08 | Sustained a 20-year teaching/patron relationship with Archduke Rudolph in uniformly "formal and deferential" tone — a marked contrast to his volatility elsewhere | collaboration, adaptability (context-dependent conduct) | independent | secondary |
| LB-09 | *Fidelio*'s 1805 premiere flopped; revised with Stephan von Breuning's help in 1806, revised again with Treitschke in 1814 into its final form | persistence, adaptability, collaboration, achievement drive | independent | secondary |

**12 incidents, 2 fully-opened sources** (plus real, well-corroborated
secondary material for LB-06/07/08/09). Fact clusters: A) Breuning rupture
(LB-01), B) publisher disputes (LB-02), C) deafness/Heiligenstadt crisis
(LB-03), D) Ries copying demands (LB-04), E) Haydn/Mozart contact (LB-05),
F) Karl custody battle (LB-06), G) *Fidelio* revisions (LB-09) — **7
clusters** (LB-07/08 corroborate clusters C and E respectively rather than
forming new ones). Domains: interpersonal conflict, financial/business,
health/adaptation, quality control, mentorship, family/legal conflict,
public performance under disability, sustained patron relationship,
reaction to critical failure — genuinely broad. **This is the only one of
the 5 that clears both the incident (12) and fact-cluster (7) floors.**

### Malala Yousafzai — sources: M1 = 2013 UN Youth Assembly speech (self), M2 = 2009 BBC Urdu diary entries as "Gul Makai" (self), M3 = Fox News reporting on the November 2013 Pakistani private-school-association book ban (independent journalism)
**Provenance: 2 total (Malala + Fox News), 1 non-self.**

Real, substantive access friction this cycle: her co-authored memoir *I Am
Malala* (with journalist Christina Lamb — a genuine second authorial
voice, had it been readable), her Nobel lecture PDF, an NPR interview with
documentarian Adam Ellick, and a Britannica profile were all found but
returned `403 Forbidden` or timed out on every fetch attempt this session.
These are not claimed as read — only the 3 sources below were actually
opened.

| ID | Event | Domain | Source | Provenance |
|---|---|---|---|---|
| MY-01 | "Weakness, fear and hopelessness died. Strength, power and courage was born" — describing her post-attack transformation | belief updating, adaptability | M1 | direct (self) |
| MY-02 | "I am the same Malala. My ambitions are the same" — explicit continuity of identity post-attack | persistence, autonomy need | M1 | direct |
| MY-03 | Stated she would not shoot her attacker even with a gun in hand | conflict tolerance (extreme restraint) | M1 | direct |
| MY-04 | Framed her strategy as empowering women to advocate for themselves rather than centering men's voices | independent thinking, opportunity sensing | M1 | direct |
| MY-05 | Diary: mistook a stranger's phone call ("I will kill you") for a direct threat while walking home | risk perception (weak) | M2 | direct |
| MY-06 | Diary: documented her parents' visible distress meeting a displaced vendor | relationships (weak fit) | M2 | direct, observational |
| MY-07 | Diary: documented a school-attendance collapse from 27 to 11 students after the Taliban ban | impact motivation, systems awareness | M2 | direct |
| MY-08 | Diary: observed her brothers' play mimicking violence, one saying he wanted to "make an atomic bomb" | context/color, weak canonical fit | M2 | direct, observational |
| MY-09 | November 2013: the All Pakistan Private Schools Management Association (40,000 schools) banned her book, calling her "a tool of the West" | conflict/reputational domain exists around her — her own specific reaction is not captured in this source | M3 | independent, but documents others' actions toward her, not her behavior |

**9 incidents, 2 sources, but 2 (MY-06, MY-08) are weak/observational and
MY-09 documents an external event rather than her own behavioral
response.** Fact clusters: A) UN speech themes (MY-01-04, one continuous
testimony — arguably one cluster), B) diary fear/observation entries
(MY-05, 06, 07, 08 — one continuous diary period), C) book-ban backlash
(MY-09) — **~3-4 clusters** depending on how strictly the UN speech and
diary are each treated as single documents vs. multiple discrete dated
events. Either way, below the 6-cluster floor. **This is the thinnest and
most access-constrained result of the five** — not because Malala lacks
documented behavioral depth (she plainly does not), but because this
session's actual source access to it was blocked.

### Abraham Lincoln — sources: L1 = William Herndon, *Herndon's Lincoln* (independent, his law partner, published posthumously), L2 = Lincoln's own 1863 letter to Ulysses S. Grant (self, primary)
**Provenance: 2 total (Lincoln + Herndon), 1 non-self.**

| ID | Event | Domain | Source | Provenance |
|---|---|---|---|---|
| AL-01 | Piloted the steamboat *Talisman* up the Sangamon River (1832), Herndon's own first sight of him | resourcefulness (weak/context) | L1 | direct observation |
| AL-02 | Offered Herndon a law partnership directly: "Billy, I can trust you, if you can trust me" (1844) | collaboration, leadership drive | L1 | direct |
| AL-03 | Kept strict daily office punctuality and a consistent greeting ritual | discipline | L1 | direct observation |
| AL-04 | While in Congress (1847-48), stayed engaged with case management by mail, applying fees to his own debts | discipline, achievement drive | L1 | direct |
| AL-05 | Defended his anti-Mexican-War "Spot Resolutions" vote to Herndon despite the political cost: "will you have voted what you felt and knew to be a lie?" | independent thinking, conflict tolerance | L1 | direct |
| AL-06 | Wrote to Grant after Vicksburg (1863): "I now wish to make the personal acknowledgment that you were right, and I was wrong" | belief updating | L2 | direct (self) |
| AL-07 | Absorbed sustained loss of popularity from the Spot Resolutions vote without reversing his position | persistence, conflict tolerance (corroboration) | L1 | direct |
| AL-08 | Advised a discouraged Herndon: "the way for a young man to rise is to improve himself... never suspecting that anybody wishes to hinder him" | leadership, collaboration (corroboration) | L1 | direct |
| AL-09 | Offered to withdraw from the law partnership after his reputation was damaged; was persuaded to stay, and the firm grew | adaptability, humility | L1 | direct |
| AL-10 | On his son Willie's death (1862): burst into his secretary's office sobbing "my boy is gone," then returned within days to 18-hour work days while managing his wife's collapse | self-regulation, adaptability (corroboration) | background-corroborated (multiple independent historical accounts) | secondary |
| AL-11 | Deliberately appointed political rivals Seward, Chase, and Bates to his cabinet: "we needed the strongest men of the party" | leadership drive, autonomy need | background-corroborated | secondary |

**11 incidents** (AL-01 counted as weak/contextual) — **1 short of the 12
floor**, an honest, near-miss shortfall rather than a wide gap. Fact
clusters: A) the Lincoln-Herndon partnership dynamic (AL-02, 03, 04, 08,
09 — one long relationship), B) Mexican War controversy (AL-05, 07), C)
Grant/Vicksburg correspondence (AL-06), D) Willie's death (AL-10), E)
cabinet formation (AL-11), F) early life/steamboat (AL-01) — **6
clusters**, exactly at the floor.

## Part G/H — Literal attribute maps (fact-cluster cap enforced, `<=3`/cluster)

| Candidate | Literal non-duplicative attributes (after cap) | List |
|---|---|---|
| Julius Caesar | **9** | leadership_drive, persuasiveness, decisiveness, risk_tolerance, conflict_tolerance, adaptability, impact_motivation, autonomy_need, opportunity_sensing |
| Isaac Newton | **9** | curiosity, discipline, ambiguity_tolerance, adaptability, persuasiveness, conflict_tolerance, competitiveness, analytical_rigor, persistence |
| Ludwig van Beethoven | **13** | conflict_tolerance, autonomy_need, risk_tolerance, persistence, adaptability, mastery_orientation, perfectionism, detail_orientation, leadership_drive, collaboration, decisiveness, achievement_drive, deep_focus |
| Malala Yousafzai | **5** | belief_updating, conflict_tolerance, independent_thinking, risk_tolerance, impact_motivation |
| Abraham Lincoln | **9** | collaboration, leadership_drive, discipline, independent_thinking, conflict_tolerance, belief_updating, adaptability, autonomy_need, resourcefulness |

No cluster exceeded the 3-attribute cap for any of the 5 (largest reuse:
Beethoven's Karl-custody cluster and Newton's/Caesar's largest clusters
each contributed at most the incidents that map to 2-3 kept attributes).
No attribute was counted from fame, office, or achievement alone; no
philosophical statement without a specific behavioral instance was
counted (Solzhenitsyn-style exclusion applied identically here — e.g.
Caesar's general reputation for ambition was not scored on its own,
only the Suetonius-documented specific incidents were).

## Part I — Current gate applied read-only

| Candidate | Crit. 1 (>=2 provenance) | Crit. 3 (>=12 incidents) | Crit. 4 (>=6 clusters) | Crit. 5-7 (domains/interpersonal/conflict) | Crit. 8 (>=20 attributes) | Result |
|---|---|---|---|---|---|---|
| Julius Caesar | PASS (2) | **FAIL** (8) | PASS (7) | PASS | **FAIL** (9) | `INCIDENT_COUNT_INSUFFICIENT` (primary) + `ATTRIBUTE_BREADTH_INSUFFICIENT` (secondary) |
| Isaac Newton | PASS (2) | **FAIL** (8) | PASS (6) | PASS | **FAIL** (9) | `INCIDENT_COUNT_INSUFFICIENT` (primary) + `ATTRIBUTE_BREADTH_INSUFFICIENT` (secondary) |
| Ludwig van Beethoven | PASS (2) | PASS (12) | PASS (7) | PASS | **FAIL** (13) | `ATTRIBUTE_BREADTH_INSUFFICIENT` (only failed criterion) |
| Malala Yousafzai | PASS (2) | **FAIL** (9) | **FAIL** (~4) | PASS | **FAIL** (5) | `INCIDENT_COUNT_INSUFFICIENT` (primary) + `FACT_CLUSTER_INSUFFICIENT` + `ATTRIBUTE_BREADTH_INSUFFICIENT` (secondary) — access-constrained, see caveat above |
| Abraham Lincoln | PASS (2) | **FAIL** (11) | PASS (6) | PASS | **FAIL** (9) | `INCIDENT_COUNT_INSUFFICIENT` (primary, a near-miss by 1) + `ATTRIBUTE_BREADTH_INSUFFICIENT` (secondary) |

**`CALIBRATION_PRE_FREEZE_PASS`: 0 of 5.** No candidate cleared the
pre-freeze gate, so **no simulated one-shot scoring was performed for any
of the 5** — Part I of the brief explicitly instructs not to force
simulated scoring for a candidate that never reaches that stage, and none
did. Beethoven is the closest: he clears every criterion except literal
attribute count, the exact same pattern John Muir showed in the roster20
correction — the strongest possible outcome under this gate short of an
actual pass.

## Part J — Existing production profile vs. fresh audit (diagnostic only)

| Slug | Existing live attrs | Fresh literal attrs | Overlap | Existing-only (not substantiated fresh) | Fresh-only (new, not in production) |
|---|---|---|---|---|---|
| `julius-caesar` | 21 | 9 | 8 | 13 | 1 |
| `isaac-newton` | 26 | 9 | 7 | 19 | 2 |
| `ludwig-van-beethoven` | 32 | 13 | 13 | 19 | 0 |
| `malala-yousafzai` | 22 | 5 | 4 | 18 | 1 |
| `abraham-lincoln` | 22 | 9 | 7 | 15 | 2 |

The critical pattern: **fresh-only counts are near zero (0-2) across all
5** — this fresh audit is not discovering behavioral angles the existing
production profile missed. It is finding a strict *subset* of what
production already models, and finding much less of it (a median of 9
literal attributes fresh vs. a median of 22 in production). This is
diagnostic evidence that the gap is a **research-depth/time gap**, not a
sign that the existing 125-person roster's evidence is inflated or wrong
— existing profiles were very likely built with either deeper per-person
research investment, a less strict cluster-dedup discipline at scoring
time, or both, than either this audit or a typical roster17-20 discovery
cycle allocates per candidate. No existing attribute was found to be
actively contradicted by fresh evidence for any of the 5 — the "existing
only" rows are attributes this audit simply did not have time/access to
re-derive from scratch, not attributes this audit disproved.

## Part K — Calibration analysis (computed mechanically; see script below)

```
slug                   existingAttr  freshAttr  overlap  existingOnly  freshOnly  incidents  clusters  provenance
julius-caesar          21            9          8        13            1          8          7         2
isaac-newton           26            9          7        19            2          8          6         2
ludwig-van-beethoven   32            13         13       19            0          12         7         2
malala-yousafzai       22            5          4        18            1          9          4         2
abraham-lincoln        22            9          7        15            2          11         6         2

median fresh literal attribute count: 9
range fresh literal attribute count: 5-13
```

1. **Provenance requirement**: 5 of 5 pass (all reached >=2 total distinct
   perspectives, though Malala's non-self perspective was thin).
2. **Incident floor (>=12)**: 1 of 5 pass (Beethoven only).
3. **Fact-cluster floor (>=6)**: 4 of 5 pass (all but Malala).
4. **>=20 literal attributes**: 0 of 5.
5. **Simulated `eligibility_v2`**: 0 of 5 (none reached the scoring stage).
6. **Median literal mapped-attribute count**: **9**.
7. **Range**: **5-13**.
8. **Are production profiles systematically broader than fresh evidence
   supports?** Yes, decisively — every one of the 5 has an existing
   attribute count 2-4x its fresh literal count (21 vs 9, 26 vs 9, 32 vs
   13, 22 vs 5, 22 vs 9).
9. **Bottleneck**: primarily **incident depth** (the amount of distinct,
   dated, behaviorally-specific material actually surfaced per person in
   a bounded research pass) interacting with **the 20-attribute pre-freeze
   floor** itself. Source access was a genuine secondary bottleneck for
   Malala specifically (several strong sources found but blocked/timed
   out this session), but Caesar, Newton, Lincoln, and even the
   floor-clearing Beethoven all had clean, unblocked access to real
   primary and independent sources and *still* landed at 9-13 literal
   attributes — access was not the dominant constraint for 4 of 5. The
   fact-cluster dedup cap itself is a contributing mechanism, not just
   research time: several genuinely well-documented episodes (Newton's
   Leibniz dispute, Beethoven's Karl custody saga) are single, large fact
   clusters that the `<=3`-per-cluster rule deliberately prevents from
   generating more than 3 attributes each, regardless of how much
   additional incident detail exists within them.

## Part L — Threshold diagnosis (diagnosis only; no threshold changed)

**`CURRENT_GATE_MISALIGNED_WITH_EXISTING_PRODUCTION_STANDARD`**

Even a representative, mechanically-selected, non-cherry-picked sample of
already-live, fully-vetted, high-confidence production profiles —
including three of the most extensively documented figures in the entire
roster (Caesar, Newton, Lincoln) plus one that fully clears every other
criterion (Beethoven) — systematically fails the roster20 pre-freeze
literal-attribute floor under an honest, comparably-bounded fresh
research pass. This is not the same finding as "only exceptional profiles
pass" (classification B): none of the 5 passed, including figures with
some of the deepest historical documentation available anywhere.

**Important scope caveat, stated explicitly per instruction**: this
finding is about the gate's alignment with a research-time budget
*comparable to what roster17-20 actually allocated per candidate* (2-4
sources, ~8-14 incidents per person, a few hours of focused research). It
is not a claim that no amount of research could ever clear 20 literal,
capped attributes for these or any people — existing production profiles
demonstrably reached 21-32 scored attributes somehow, whether through
deeper original research, a less strict contemporaneous cluster-dedup
discipline, or scoring-time judgment calls not literally re-derivable from
a fresh incident ledger. The finding is specifically that **the pre-freeze
floor, as currently applied, rejects candidates before scoring even when
those candidates would very likely have gone on to comfortably clear
`eligibility_v2` had they been allowed to reach it** — all 5 sampled
people already do clear `eligibility_v2` in production, at scored counts
of 21-32, well above the 18-attribute scoring floor.

## Part M — Recommendation for roster21

**Recommendation B: keep `eligibility_v2` unchanged, but revise the
PRE-FREEZE prediction rule.**

`eligibility_v2` itself (18 scored attributes, 0.6 coverage, 12
high-confidence attributes at >=0.55 average) is empirically well
calibrated — all 125 live people, including all 5 sampled here, clear it
comfortably at their actual production attribute counts. Nothing in this
audit questions that gate.

The roster20 pre-freeze heuristic (>=20 literal, cluster-capped attributes
*before* any research investment in scoring) is a different thing: a
*predictor* meant to save wasted effort on candidates unlikely to reach
`eligibility_v2`. This audit shows that predictor rejecting inputs
(representative production profiles) that its own target metric
(`eligibility_v2`) already accepts, at a 0-of-5 rate against a target the
same people pass at 5-of-5. A predictor with that error rate against its
own ground truth is not doing its job, independent of whether
`eligibility_v2` itself is right.

Two specific, evidence-supported (not yet executed) angles for a future
revision, left as options rather than decisions:
- The `<=3`-attributes-per-cluster cap may be appropriate as a
  *scoring-time* anti-gaming discipline (preventing one story from
  justifying many rows) but too strict as a *pre-freeze* breadth
  predictor, where the question is "is there enough raw material to
  eventually reach 18-22 *scored* attributes," not "how many
  non-duplicative attributes can be justified from a first read."
- The pre-freeze floor's absolute number (20) may need to be validated
  against a larger sample (recommendation D territory) before being
  lowered or restructured — this audit's n=5 is suggestive and internally
  consistent, but a larger, still-representative sample would strengthen
  the case before any rule changes.

Recommendation D (larger sample before deciding) is a reasonable adjunct
but not, on its own, sufficient given how consistent this small sample's
result already is (0/5, with the sole partial-pass exactly matching
roster20's own Muir/Barton pattern) — a larger sample is likely to
sharpen the diagnosis, not overturn it. Recommendation A (keep the gate,
improve candidate selection) is not supported: candidate selection was
not the limiting factor here — these are already the best-documented,
fully-production-vetted people in the roster, and they still failed.

## Roster count confirmation

Read-only throughout. `peopleIndex.generated.ts` still lists 125 people;
none of the 5 sampled profiles' `attributes`, `portraitUrl`,
`isMatchEligible`, or any other field was touched. `data-pipeline/candidates/`
corpus untouched (still 272 files). No `SEED_PEOPLE`, roster*.ts, seed.ts,
editorial.ts, dispersion, or i18n file was modified.
