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

## Correction record (post-PR#17 review)

A review of this checkpoint after PR #17 was opened found real
auditability and classification problems, corrected here. **Nothing below
was rewritten to manufacture a more convenient result** — the corrections
below make several numbers *less* favorable to the audit's own headline
finding (Beethoven's incident count drops from a claimed-but-unauditable
12 to an honestly-recounted 11, moving him from "clears every criterion
but one" to "fails two criteria," and Malala's provenance count drops from
2 to 1). The evidence pack itself (which sources were actually opened, what
they say) is unchanged; only the counting discipline and the
classification language are corrected.

1. **Beethoven's incident count was asserted (12) without an auditable
   ledger** — the visible table only had 9 explicit IDs (LB-01 to LB-09),
   with a multi-year custody battle collapsed into one row (LB-06)
   covering four distinct sub-facts. Resolved by actually splitting the
   custody battle into its genuinely separate, independently-dated
   sub-events (Part F below) — but conservatively: the "Queen of Night"
   characterization is folded into the nobility-claim incident's
   description as supporting detail (a sustained legal *tactic*, not one
   dated act) rather than counted as a fourth separate incident, per the
   rubric's own "when in doubt, use the more skeptical count" discipline.
   Result: **11 incidents, not 12** — Beethoven now honestly *fails* the
   incident floor as well as the attribute floor, the same pattern as the
   other four.
2. **Malala's Fox News source was wrongly counted toward provenance.** It
   documents the Pakistani private-school association's book ban — an
   action taken *toward* her — not a behavioral incident of her own
   conduct. Per the corrected criterion (independent provenance must
   contribute *usable behavioral evidence*, not merely mention the
   subject), this source does not count. Malala now has **1 usable
   provenance perspective, not 2** — she fails criterion 1 outright, the
   same `SOURCE_DEPTH_INSUFFICIENT` pattern Keller/Goldman/Solzhenitsyn
   showed in roster20, not the `INCIDENT_COUNT_INSUFFICIENT`-only pattern
   originally reported.
3. **A second, related incident-counting problem was found on the same
   review pass** (not flagged by name in the correction request, but the
   same discipline applies): Malala's MY-01 through MY-04 were four
   quotes from *one* 15-minute speech on *one* day (the July 2013 UN
   address) — a single behavioral event with several thematic facets, not
   four separately-dated incidents. Consolidated into one incident. Lincoln's
   AL-07 ("absorbed sustained loss of popularity... without reversing his
   position") was, on the same honest re-read, elaboration on the *same*
   incident as AL-05 (the Spot Resolutions vote and its fallout), not a
   new dated act — merged into AL-05. Neither change affects any
   attribute count, since both merged/removed rows were only corroborating
   already-counted attributes, never a row's sole support.
4. **The sampling description overstated "representativeness.**" Corrected
   in Part C below: this is a *production-profile-depth* stratified sample
   (mechanically representative of the roster's *scored-attribute-count*
   distribution — Lincoln genuinely sits at that distribution's median),
   not a sample representative of *real-world documentation richness* —
   Caesar, Newton, Beethoven, and Lincoln are all exceptionally
   well-documented historical figures in absolute terms, whatever their
   production-profile depth happens to be.
5. **The diagnosis collapsed two different questions into one
   classification.** Split into a workflow-level finding (can a
   normal-scale intake research pass satisfy the pre-freeze gate?) and a
   gate-level finding (is the gate itself misaligned with a *deeply*
   researched standard?) — the audit has strong evidence for the former
   and only provisional, suggestive evidence for the latter, since no
   person here received research deep enough to rule out that more time
   would close the gap.
6. **The `eligibility_v2`-is-"empirically-well-calibrated" claim was
   circular** — the live roster was built to pass `eligibility_v2`, so
   observing that it does proves nothing about the gate's correctness, only
   that construction succeeded. Restated as a scope limit, not a
   validation, in Part M below.

No rescue research was performed to inflate any count. Where a fetched
source's content was ambiguous, the more conservative reading was taken
throughout this correction pass.

## Purpose

Roster17-19 froze candidates on informal breadth judgments and discovered
shortfalls only after scoring. Roster20 replaced that with a literal,
counted, fact-cluster-capped pre-freeze attribute map — and found that
even genuinely well-sourced new candidates (Emma Goldman, John Muir, Clara
Barton) landed at 8-13 literal attributes, nowhere near the >=20 floor.

Before starting roster21, this audit asks a different question: **can a
normal-scale intake research pass reproduce sufficient breadth on people
who are already accepted as production-quality profiles?** If
mechanically-selected, already-live people also fail a fresh, honest,
comparably-bounded application of the same gate, that is evidence the
*workflow* (the research-time budget a normal intake cycle allocates per
candidate, interacting with the pre-freeze rule) is miscalibrated relative
to the production standard it is meant to protect — not that roster18-20's
candidates were unusually weak. Whether the *gate itself* is wrong under
much deeper research is a separate, harder question this audit can only
speak to provisionally (see Part L).

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
| Roster20 source-provenance requirement (normalized in PR #16's correction, applied strictly here) | `>= 2` total distinct provenance perspectives, where every document by the same person counts as ONE perspective, **and each non-self perspective must contribute usable behavioral evidence, not merely mention the subject** | same, sharpened by this audit's item 2 above |
| Candidate schema / validator / scoring-lock | unchanged, read only | read, not modified |

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

| # | Category | Pool size | Selected |
|---|---|---|---|
| 1 | Political/institutional (`field` contains `politics`) | 22 | **Julius Caesar** |
| 2 | Scientist/mathematician | 28 | **Isaac Newton** |
| 3 | Artist/writer/cultural | 47 | **Ludwig van Beethoven** |
| 4 | Non-Western/non-North-American | 35 | **Malala Yousafzai** |
| 5 | "Ordinary" production-profile depth (closest to full-roster median scored-attribute count) | 121 (remaining) | **Abraham Lincoln** |

**Precise description, corrected**: this is a **deterministic stratified
sample with a median production-profile-depth slot, but documentation
richness skewed toward highly documented historical figures** — not a
sample "representative" of real-world documentation depth without
qualification. Lincoln's *production-profile* attribute count (22)
genuinely equals the full-125-roster median, which is why he fills the
"ordinary" slot — but he is, in absolute historical terms, one of the most
documented people in American history, exactly like Caesar, Newton, and
Beethoven are among the most documented figures in their respective
fields. Only Malala represents a documentation-richness level closer to
"typical of a contemporary public figure" rather than "canonical historical
giant" — and even she is a Nobel laureate with a co-authored bestselling
memoir, UN and Nobel speeches, and continuous international press
coverage; this audit's access to that record was constrained (see Part E),
not the underlying record itself being thin.

None of the 5 is a roster17-20 held candidate. The sample was frozen before
research began and never swapped — Malala's evidence access turned out the
most constrained of the five, and she was kept anyway, per instruction.

Honest limitation of the method, unchanged from the original run:
categories 1 and 5 both landed on North American political figures
(Lincoln's median-based selection was blind to category-1 overlap) — a
real artifact of a mechanical process, disclosed rather than corrected
after the fact.

## Part D — Baseline production state (read-only, before audit)

| Slug | Canonical name | Live attr. count | High-conf. count (`>=0.5`) | High-conf. avg | `isMatchEligible` | Portrait | Editorial |
|---|---|---|---|---|---|---|---|
| `julius-caesar` | Julius Caesar | 21 | 12 | 0.579 | true | present | present |
| `isaac-newton` | Isaac Newton | 26 | 26 | 0.694 | true | present | present |
| `ludwig-van-beethoven` | Ludwig van Beethoven | 32 | 25 | 0.668 | true | present | present |
| `malala-yousafzai` | Malala Yousafzai | 22 | 16 | 0.637 | true | present | present |
| `abraham-lincoln` | Abraham Lincoln | 22 | 21 | 0.626 | true | present | present |

All 5 are complete, currently-eligible production profiles. These existing
rows were **not** treated as valid evidence going into the fresh audit —
research started from zero.

## Part E/F — Independent-provenance research and incident ledgers (corrected)

Each source was actually fetched and read this cycle. Incident IDs below
are the complete, final set after the corrections in items 1 and 3 above —
every incident contributing to the counts in Part I has its own row here.

### Julius Caesar — C1 = *Commentarii de Bello Gallico* (self), C2 = Suetonius, *Life of Julius Caesar* (independent)
**Provenance: 2 total (Caesar + Suetonius), 1 non-self — unchanged.**

| ID | Event | Source | Provenance | Direct/near/secondary |
|---|---|---|---|---|
| JC-01 | Rallied panicked troops before the Ariovistus campaign (58 BC) with a speech that "transformed all minds" | C1 | self | direct |
| JC-02 | Nervii ambush (57 BC): personally grabbed a shield, rushed to the threatened flank, rallied troops by name | C1 | self | direct |
| JC-03 | Spared Dumnorix from punishment for betrayal out of respect for his brother Diviciacus's loyalty (58 BC) | C1 | self | direct |
| JC-04 | Ariovistus parley broke down under a surprise cavalry attack (58 BC); Caesar ended talks and withdrew rather than escalate | C1 | self | direct |
| JC-05 | After poet Calvus published mocking epigrams, Caesar wrote the first conciliatory letter himself | C2 | independent | near-direct |
| JC-06 | Divorced Pompeia (~62 BC) despite claiming ignorance of her guilt, prioritizing public reputation over private truth | C2 | independent | near-direct |
| JC-07 | Received the Senate seated (44 BC); retaliated against Tribune Pontius Aquila for refusing to rise | C2 | independent | near-direct |
| JC-08 | Punished tribunes who removed a crown placed on his statue (44 BC) — ambiguous relationship to monarchy | C2 | independent | near-direct |

**8 incidents** (unchanged — no compound rows found on re-audit; each
Suetonius item is a genuinely separate, differently-dated historical
episode, not multiple facets of one document, unlike the Malala correction
below).

### Isaac Newton — N1 = William Stukeley, *Memoirs of Sir Isaac Newton's Life* (independent, 1752), N2 = Newton's own 1675 letter to Robert Hooke (self)
**Provenance: 2 total (Newton + Stukeley), 1 non-self — unchanged.**

| ID | Event | Source | Provenance | Direct/near/secondary |
|---|---|---|---|---|
| IN-01 | Recounted the apple/gravity insight to Stukeley in conversation, dated by Stukeley to 15 Apr 1726 | N1 | independent | near-direct |
| IN-02 | Left an opera after the third act (20 Feb 1720/21), calling it "a surfeit at dinner" | N1 | independent | direct observation |
| IN-03 | During a 1720 Kneller portrait sitting, deflected probing religious questions "with his usual modesty & caution" | N1 | independent | direct observation |
| IN-04 | Completed lunar theory (23 Feb 1721 breakfast account) with only "3 or 4 observations" after Flamsteed withheld his data | N1 | independent | direct observation |
| IN-05 | Wrote to rival Robert Hooke (1675) with conspicuously gracious language ("if I have seen further...") | N2 | self | direct |
| IN-06 | As Royal Society President, secretly authored the supposedly impartial 1713 committee report ruling in his own favor over Leibniz | background-corroborated | secondary | secondary |
| IN-07 | Removed references to Hooke from later Principia editions after Hooke's death (~1704-1726) | background-corroborated | secondary | secondary |
| IN-08 | As Warden/Master of the Mint (1696-99), built a forensic case against counterfeiter William Chaloner, ending in his execution | background-corroborated | secondary | secondary |

**8 incidents** (unchanged — each Stukeley anecdote carries its own
specific date from his own memoir, so these are genuinely separate
occasions, not facets of one document).

### Ludwig van Beethoven — B1 = his own letters, 1790-1826 (self), B2 = Thayer, *Life of Ludwig van Beethoven* (independent); background corroboration for the Karl custody battle and the 1824 premiere
**Provenance: 2 total (Beethoven + Thayer), 1 non-self — unchanged.**

| ID | Event | Source | Provenance | Direct/near/secondary |
|---|---|---|---|---|
| LB-01 | Severed his friendship with Stephan von Breuning after a lodging dispute (1804), acknowledging his own volatility | B1 | self | direct |
| LB-02 | Resented being "half a tradesman" (1801), negotiated separately with multiple publishers over pricing | B1 | self | direct |
| LB-03 | Confessed near-suicidal despair over encroaching deafness (1800-02) but was held back by artistic commitment | B1 | self | direct |
| LB-04 | Demanded exacting copying standards from assistant Ferdinand Ries under tight deadlines (1804) | B1 | self | direct |
| LB-05 | Early contact with Haydn and Mozart in Bonn/Vienna shaped his formative training | B2 | independent | thin/near-direct |
| LB-06 | A false claim to noble birth was exposed during the custody proceedings (~1818-19), forcing the case out of the Landrechte into the Vienna Commoners Courts — a real, self-inflicted legal setback; he also characterized Johanna as "morally unfit" ("Queen of Night") and cited her prior embezzlement conviction throughout the proceedings as a sustained legal tactic (not a single dated act, folded in here as supporting detail rather than a separate incident, per the more skeptical reading) | independent (legal-historical secondary account, converging with Thayer) | independent | near-direct |
| LB-07 | Karl stole household money and fled to his mother's house (Dec 1818); Beethoven's servants reported him "enraged" | independent | independent | near-direct |
| LB-08 | Won guardianship of Karl (8 Apr 1820) after 4+ years of litigation, coinciding with a near-total halt in his own composition | independent | independent | near-direct |
| LB-09 | At the 1824 Ninth Symphony premiere, totally deaf, several bars off from the actual performance, had to be physically turned around to see the audience's ovation | background-corroborated | secondary | secondary |
| LB-10 | Sustained a 20-year teaching/patron relationship with Archduke Rudolph in uniformly "formal and deferential" tone — a marked contrast to his volatility elsewhere | independent | independent | secondary |
| LB-11 | *Fidelio*'s 1805 premiere flopped; revised with Stephan von Breuning's help in 1806, revised again with Treitschke in 1814 | independent | independent | secondary |

**11 incidents** — corrected down from the originally-claimed 12. LB-06's
Johanna-characterization detail is documented as color within the
nobility-claim incident, not counted as a fourth separate incident (the
conservative reading; a reader who considers it a distinct, dated,
quotable legal act could reasonably count 12 — this ambiguity is disclosed
rather than resolved in whichever direction is more favorable to the
audit's headline finding). Fact clusters unchanged in count: A) Breuning
rupture (LB-01), B) publisher disputes (LB-02), C) deafness/Heiligenstadt
(LB-03), D) Ries demands (LB-04), E) Haydn/Mozart (LB-05), F) Karl custody
battle (LB-06, 07, 08), G) *Fidelio* revisions (LB-11) — **7 clusters**
(LB-09/10 corroborate clusters C and E respectively). **Beethoven now
fails the incident floor (11 vs. 12) as well as the attribute floor** — he
no longer uniquely "clears every criterion but one."

### Malala Yousafzai — M1 = 2013 UN Youth Assembly speech (self), M2 = 2009 BBC Urdu diary entries as "Gul Makai" (self)
**Provenance: 1 total (Malala only) — corrected down from 2.**

The Fox News source on the November 2013 Pakistani private-school
association book ban (previously counted as a second, independent
perspective) is **removed from both the provenance count and the incident
count**: it documents the school association's action toward Malala, not
a behavioral incident of her own conduct, and so does not meet the
sharpened criterion-1 standard (independent provenance must contribute
usable behavioral evidence about the subject, not merely mention them).
Every other source found for Malala this session (her co-authored memoir,
Nobel lecture, an NPR interview, a Britannica profile) returned `403
Forbidden` or timed out on every fetch attempt — none are claimed as read.

| ID | Event | Source | Provenance | Direct/near/secondary |
|---|---|---|---|---|
| MY-01 | The 12 July 2013 UN Youth Assembly speech: describes her post-attack transformation ("weakness, fear and hopelessness died..."), states she would not shoot her attacker even with a gun in hand, and frames her strategy as empowering women to speak for themselves | M1 | self | direct |
| MY-02 | Diary: mistook a stranger's phone call ("I will kill you") for a direct threat while walking home (early 2009) | M2 | self | direct |
| MY-03 | Diary: documented her parents' visible distress meeting a displaced vendor (early 2009) | M2 | self | direct, observational |
| MY-04 | Diary: documented a school-attendance collapse from 27 to 11 students after the Taliban ban (early 2009) | M2 | self | direct |
| MY-05 | Diary: observed her brothers' play mimicking violence, one saying he wanted to "make an atomic bomb" (early 2009) | M2 | self | direct, observational, weak canonical fit |

**5 incidents** — corrected down from 9. MY-01 consolidates what was
previously counted as 4 separate incidents (MY-01 through MY-04 in the
first draft): those were four thematically distinct *statements* within
one 15-minute speech on one day, not four separately-dated behavioral
events — the same "one document is not automatically many incidents"
discipline this correction pass applied to Beethoven in the conservative
direction is applied here too, in the direction that most reduces the
count. Fact clusters: A) the UN speech (MY-01, one continuous testimony),
B) the 2009 BBC diary period (MY-02 through MY-05, treated as one
continuous documentary source the same way roster20 treated
Solzhenitsyn's multi-incident arrest sequence as a single cluster) —
**2 clusters**, far below the 6-cluster floor.

### Abraham Lincoln — L1 = William Herndon, *Herndon's Lincoln* (independent), L2 = Lincoln's own 1863 letter to Ulysses S. Grant (self)
**Provenance: 2 total (Lincoln + Herndon), 1 non-self — unchanged.**

| ID | Event | Source | Provenance | Direct/near/secondary |
|---|---|---|---|---|
| AL-01 | Piloted the steamboat *Talisman* up the Sangamon River (1832), Herndon's first sight of him | L1 | independent | direct observation, weak/context |
| AL-02 | Offered Herndon a law partnership directly: "Billy, I can trust you, if you can trust me" (1844) | L1 | independent | direct |
| AL-03 | Kept strict daily office punctuality and a consistent greeting ritual | L1 | independent | direct observation |
| AL-04 | While in Congress (1847-48), stayed engaged with case management by mail, applying fees to his own debts | L1 | independent | direct |
| AL-05 | Defended his anti-Mexican-War "Spot Resolutions" vote to Herndon despite the political cost ("will you have voted what you felt and knew to be a lie?"), and absorbed a sustained loss of popularity afterward without reversing his position | L1 | independent | direct |
| AL-06 | Wrote to Grant after Vicksburg (1863): "I now wish to make the personal acknowledgment that you were right, and I was wrong" | L2 | self | direct |
| AL-07 | Advised a discouraged Herndon: "the way for a young man to rise is to improve himself... never suspecting that anybody wishes to hinder him" | L1 | independent | direct |
| AL-08 | Offered to withdraw from the law partnership after his reputation was damaged; was persuaded to stay, and the firm grew | L1 | independent | direct |
| AL-09 | On his son Willie's death (1862): burst into his secretary's office sobbing "my boy is gone," then returned within days to 18-hour work days while managing his wife's collapse | background-corroborated | secondary | secondary |
| AL-10 | Deliberately appointed political rivals Seward, Chase, and Bates to his cabinet (1861): "we needed the strongest men of the party" | background-corroborated | secondary | secondary |

**10 incidents** — corrected down from 11. The former AL-07 ("absorbed
sustained loss of popularity... without reversing his position") was, on
re-read, elaboration on the *same* Spot Resolutions episode as AL-05, not
a new dated act — merged into AL-05's row rather than counted separately.
IDs renumbered accordingly (former AL-08/09/10/11 are now AL-07/08/09/10).
Fact clusters: A) the Lincoln-Herndon partnership (AL-02, 03, 04, 07, 08 —
5 incidents, one long relationship), B) Mexican War controversy (AL-05,
now 1 incident), C) Grant/Vicksburg (AL-06), D) Willie's death (AL-09), E)
cabinet formation (AL-10), F) early life/steamboat (AL-01) — **6
clusters**, unchanged, exactly at the floor (merging AL-07 into AL-05
shrank cluster B's incident count but did not eliminate the cluster).

## Part G/H — Row-level literal attribute traceability (corrected, auditable)

Every attribute below is mechanically derivable from the incident/cluster
IDs in its row. `<=3`-per-cluster cap enforced explicitly in the "survives
cap?" column — a "no" means the row was proposed but dropped for exceeding
its cluster's 3-attribute allowance, kept out of the final count.

### Julius Caesar — 9 literal attributes

| Attribute | Incident ID(s) | Cluster | Source ID(s) | Provenance | Doc./inference | Strength | Dup. risk | Survives cap? |
|---|---|---|---|---|---|---|---|---|
| leadership_drive | JC-01, JC-07 | A, F | C1, C2 | self, independent | documented | MODERATE | corroborated across 2 clusters, low risk | yes |
| persuasiveness | JC-01 | A | C1 | self | documented | WEAK | single incident | yes |
| decisiveness | JC-02, JC-04 | B | C1 | self | documented | MODERATE | 2 incidents, 1 cluster | yes |
| risk_tolerance | JC-02 | B | C1 | self | documented | WEAK | single incident | yes |
| conflict_tolerance | JC-03, JC-05, JC-07 | C, D, F | C1, C2 | self, independent | documented | STRONG | corroborated across 3 clusters — real, not cluster-dependent | yes |
| adaptability | JC-04 | A | C1 | self | inference | WEAK | single incident, inferred from restraint | yes |
| impact_motivation | JC-06 | E | C2 | independent | inference | WEAK | single incident | yes |
| autonomy_need | JC-08 | G | C2 | independent | inference | WEAK | single incident, ambiguous (could equally read as risk_tolerance) | yes |
| opportunity_sensing | JC-08 | G | C2 | independent | inference | WEAK | shares its sole incident with autonomy_need — genuine duplication risk, kept because the two readings (managing succession optics vs. personal ambition) are analytically distinct, but flagged | yes, flagged |

Cluster G (crown incident, JC-08 only) proposes 2 attributes from 1
incident — allowed under the cap (`<=3`) but flagged as the row with the
thinnest single-incident support in this ledger.

### Isaac Newton — 9 literal attributes

| Attribute | Incident ID(s) | Cluster | Source ID(s) | Provenance | Doc./inference | Strength | Dup. risk | Survives cap? |
|---|---|---|---|---|---|---|---|---|
| curiosity | IN-01 | A | N1 | independent | near-direct | MODERATE | single incident, but a named, dated primary anecdote | yes |
| discipline | IN-02 | B | N1 | independent | direct | WEAK | single incident | yes |
| ambiguity_tolerance | IN-03 | B | N1 | independent | direct | WEAK | single incident, cluster B at 2/3 cap | yes |
| adaptability | IN-04 | C | N1 | independent | direct | MODERATE | single incident, concrete workaround described | yes |
| persuasiveness | IN-05 | D | N2 | self | documented (his own letter) | MODERATE | single incident; historically contested interpretation (graciousness vs. irony) noted | yes |
| conflict_tolerance | IN-06, IN-07 | E, D | background | secondary | secondary corroboration, not primary-text-verified | WEAK | 2 clusters, but both background-corroborated rather than one primary text opened in full | yes |
| competitiveness | IN-06 | E | background | secondary | secondary | WEAK | single incident, background-corroborated | yes |
| analytical_rigor | IN-08 | F | background | secondary | secondary | MODERATE | single incident, but well-corroborated across multiple independent histories | yes |
| persistence | IN-08 | F | background | secondary | secondary | WEAK | shares its incident with analytical_rigor — cluster F at 2/3 cap | yes |

3 of 9 rows (conflict_tolerance's IN-06/07 leg, competitiveness,
analytical_rigor, persistence) rest on background-corroborated secondary
material rather than a primary text opened in full this cycle — flagged
consistently with how roster20 treated the Tvardovsky item.

### Ludwig van Beethoven — 13 literal attributes

| Attribute | Incident ID(s) | Cluster | Source ID(s) | Provenance | Doc./inference | Strength | Dup. risk | Survives cap? |
|---|---|---|---|---|---|---|---|---|
| conflict_tolerance | LB-01 | A | B1 | self | documented | MODERATE | single incident | yes |
| autonomy_need | LB-02 | B | B1 | self | documented | WEAK | single incident | yes |
| risk_tolerance | LB-02 | B | B1 | self | inference | WEAK | shares incident with autonomy_need, cluster B at 2/3 cap | yes |
| persistence | LB-03 | C | B1 | self | documented | MODERATE | single incident, extreme stakes (suicidal ideation) | yes |
| adaptability | LB-03 | C | B1 | self | inference | WEAK | shares incident with persistence, cluster C at 2/3 cap | yes |
| perfectionism | LB-04 | D | B1 | self | documented | MODERATE | single incident | yes |
| detail_orientation | LB-04 | D | B1 | self | documented | WEAK | shares incident with perfectionism | yes |
| leadership_drive | LB-04 | D | B1 | self | inference | WEAK | cluster D at 3/3 cap — at the limit | yes |
| collaboration | LB-05 | E | B2 | independent | thin/inference | WEAK | single, thin secondary mention | yes |
| decisiveness | LB-06, LB-08 | F | independent | independent | documented | MODERATE | cluster F (custody battle) at 2/3 used | yes |
| achievement_drive | LB-11 | G | independent | independent | inference | WEAK | single incident (reaction to *Fidelio*'s failure and revision) | yes |
| deep_focus | LB-09 | (corroborates C) | background | secondary | secondary | WEAK | does not add a new cluster; kept as a distinct attribute drawn from a different incident (LB-09) than persistence/adaptability's LB-03, so not purely duplicative | yes |
| mastery_orientation | LB-03, LB-09 | C | B1, background | self, secondary | documented + secondary corroboration | MODERATE | cluster C now at 3/3 cap (persistence, adaptability, mastery_orientation) — deep_focus above is counted against cluster's corroboration for LB-09, not as a 4th cluster-C attribute | yes |

Cluster F (the custody battle, LB-06/07/08) is this ledger's largest —
2 of its available 3-attribute allowance used (decisiveness; a third,
e.g. leadership_drive-over-Karl, was considered and deliberately *not*
added to avoid stacking a third attribute onto what is ultimately one
family legal saga, even though the cap would technically allow it).

### Malala Yousafzai — 5 literal attributes

| Attribute | Incident ID(s) | Cluster | Source ID(s) | Provenance | Doc./inference | Strength | Dup. risk | Survives cap? |
|---|---|---|---|---|---|---|---|---|
| belief_updating | MY-01 | A | M1 | self | documented | MODERATE | single incident (one speech), but a specific, quoted, extreme transformation claim | yes |
| conflict_tolerance | MY-01 | A | M1 | self | documented | MODERATE | shares its incident with belief_updating — cluster A at 2/3 cap | yes |
| independent_thinking | MY-01 | A | M1 | self | inference | WEAK | shares its incident with the two rows above — cluster A now at 3/3 cap | yes |
| impact_motivation | MY-04 | B | M2 | self | documented | WEAK | single diary incident | yes |
| ambiguity_tolerance | MY-02 | B | M2 | self | inference | WEAK | single diary incident, cluster B at 2 incidents used of the diary's 4 | yes |

All 5 attributes trace to only 2 fact clusters — the entire literal map is
built from one speech and one diary, which is the direct, honest
consequence of the provenance/incident shortfall recorded above, not a
separate finding.

### Abraham Lincoln — 9 literal attributes

| Attribute | Incident ID(s) | Cluster | Source ID(s) | Provenance | Doc./inference | Strength | Dup. risk | Survives cap? |
|---|---|---|---|---|---|---|---|---|
| collaboration | AL-02, AL-07 | A | L1 | independent | documented | MODERATE | 2 incidents, same cluster | yes |
| leadership_drive | AL-02 | A | L1 | independent | inference | WEAK | shares incident with collaboration | yes |
| discipline | AL-03, AL-04 | A | L1 | independent | documented | MODERATE | cluster A at 3/3 cap | yes |
| independent_thinking | AL-05 | B | L1 | independent | documented | MODERATE | single incident, direct quote | yes |
| conflict_tolerance | AL-05 | B | L1 | independent | documented | MODERATE | shares incident with independent_thinking | yes |
| belief_updating | AL-06 | C | L2 | self | documented | STRONG | his own written words, unambiguous | yes |
| adaptability | AL-09 | D | background | secondary | secondary | WEAK | single incident | yes |
| autonomy_need | AL-10 | E | background | secondary | secondary | WEAK | single incident | yes |
| resourcefulness | AL-01 | F | L1 | independent | inference | WEAK | single, weak/contextual incident | yes |

Cluster A (the Lincoln-Herndon partnership) is the largest, using its
full 3-attribute allowance (collaboration, leadership_drive, discipline)
across 5 underlying incidents spanning over a decade of the relationship —
the cap holds even against a genuinely long-running, well-documented
relationship.

## Part I — Current gate applied read-only (corrected)

| Candidate | Crit. 1 (>=2 provenance) | Crit. 3 (>=12 incidents) | Crit. 4 (>=6 clusters) | Crit. 5-7 | Crit. 8 (>=20 attributes) | Primary | Secondary |
|---|---|---|---|---|---|---|---|
| Julius Caesar | PASS (2) | **FAIL** (8) | PASS (7) | PASS | **FAIL** (9) | `INCIDENT_COUNT_INSUFFICIENT` | `ATTRIBUTE_BREADTH_INSUFFICIENT` |
| Isaac Newton | PASS (2) | **FAIL** (8) | PASS (6) | PASS | **FAIL** (9) | `INCIDENT_COUNT_INSUFFICIENT` | `ATTRIBUTE_BREADTH_INSUFFICIENT` |
| Ludwig van Beethoven | PASS (2) | **FAIL** (11) | PASS (7) | PASS | **FAIL** (13) | `INCIDENT_COUNT_INSUFFICIENT` (near-miss, by 1) | `ATTRIBUTE_BREADTH_INSUFFICIENT` |
| Malala Yousafzai | **FAIL** (1) | **FAIL** (5) | **FAIL** (2) | PASS | **FAIL** (5) | `SOURCE_DEPTH_INSUFFICIENT` | `INCIDENT_COUNT_INSUFFICIENT`, `FACT_CLUSTER_INSUFFICIENT`, `ATTRIBUTE_BREADTH_INSUFFICIENT` |
| Abraham Lincoln | PASS (2) | **FAIL** (10) | PASS (6) | PASS | **FAIL** (9) | `INCIDENT_COUNT_INSUFFICIENT` | `ATTRIBUTE_BREADTH_INSUFFICIENT` |

**`CALIBRATION_PRE_FREEZE_PASS`: 0 of 5.** Corrected from the first draft:
**0 of 5 now pass the incident floor** (not 1 of 5 — Beethoven's
recounted 11 no longer clears it), and **4 of 5 pass the provenance
floor** (not 5 of 5 — Malala's single usable perspective fails it). No
candidate cleared the pre-freeze gate, so no simulated one-shot scoring
was performed for any of the 5, per instruction.

## Part J — Existing production profile vs. fresh audit (diagnostic only)

| Slug | Existing live attrs | Fresh literal attrs | Overlap | Existing-only | Fresh-only |
|---|---|---|---|---|---|
| `julius-caesar` | 21 | 9 | 8 | 13 | 1 |
| `isaac-newton` | 26 | 9 | 7 | 19 | 2 |
| `ludwig-van-beethoven` | 32 | 13 | 13 | 19 | 0 |
| `malala-yousafzai` | 22 | 5 | 4 | 18 | 1 |
| `abraham-lincoln` | 22 | 9 | 7 | 15 | 2 |

(Unchanged from the first draft — the incident/provenance corrections
above did not alter any final attribute-count row.) Fresh-only counts stay
near zero (0-2) across all 5: this fresh audit is not discovering angles
production missed, it is finding a strict, much smaller subset of what
production already models. No existing attribute was found to be
contradicted by fresh evidence for any of the 5.

## Part K — Calibration analysis (recomputed mechanically)

```
slug                   existing  freshAttr  incidents  clusters  provenance
julius-caesar          21        9          8          7         2
isaac-newton           26        9          8          6         2
ludwig-van-beethoven   32        13         11         7         2
malala-yousafzai       22        5          5          2         1
abraham-lincoln        22        9          10         6         2

median fresh literal attribute count: 9
range: 5-13

provenance >=2 pass count: 4/5   (was 5/5 in the first draft)
incident >=12 pass count:  0/5   (was 1/5 in the first draft)
cluster >=6 pass count:    4/5   (unchanged)
>=20 attribute pass count: 0/5   (unchanged)
simulated eligibility_v2 reached: 0/5 (unchanged — no one reached scoring)
```

1. **Provenance requirement**: **4 of 5 pass** (corrected from 5/5).
2. **Incident floor (>=12)**: **0 of 5 pass** (corrected from 1/5 —
   Beethoven no longer clears it under the honest recount).
3. **Fact-cluster floor (>=6)**: 4 of 5 pass (unchanged).
4. **>=20 literal attributes**: 0 of 5 (unchanged).
5. **Simulated `eligibility_v2`**: 0 of 5 (unchanged).
6. **Median literal mapped-attribute count**: **9** (unchanged).
7. **Range**: **5-13** (unchanged).
8. **Systematically broader in production?** Yes, more starkly than
   before: every one of the 5 has an existing count 2-4x its fresh
   literal count, and now literally none of the 5 clears even the
   incident floor, let alone the attribute floor.
9. **Bottleneck**: incident depth (bounded research time) remains the
   primary driver, now confirmed uniformly across all 5 rather than 4 of
   5. The fact-cluster dedup cap is a compounding mechanism (Beethoven's
   Karl-custody saga and Newton's Leibniz dispute each cap out at far
   fewer attributes than their raw incident richness could otherwise
   support). Source access was a distinct, additional bottleneck
   specifically for Malala — and, newly identified this pass, a
   **provenance-quality** bottleneck distinct from provenance-count: not
   every non-self document that mentions a subject documents *their*
   behavior, and this audit's first draft conflated the two for Malala.

## Part L — Two-level diagnosis (diagnosis only; no threshold changed)

The first draft of this checkpoint moved directly from "0/5 pass" to a
single gate-level classification. That inference is too fast: this audit
measures what a *bounded* research pass can produce, not what the gate
would accept from *maximally deep* research. Two separate questions,
separated here per instruction:

### A. Workflow calibration

**`CURRENT_WORKFLOW_PREFREEZE_MISALIGNED`**

A research pass at normal intake-cycle scale (2-4 sources, ~8-14 raw
incidents, a bounded number of fetches per person) — the same scale
roster17-20 actually used per candidate — **cannot reliably produce
enough literal, cluster-capped incidents or attributes to clear the
pre-freeze gate**, even against mechanically-selected, already-vetted,
fully-eligible production people, 3 of whom are among the most
extensively documented figures in the entire roster. 0 of 5 cleared the
incident floor; 0 of 5 cleared the attribute floor. This is a strong,
well-supported finding at the workflow level.

### B. Gate calibration

**`GATE_MISALIGNMENT_PROVISIONAL`**

This audit does *not* prove the >=20-attribute pre-freeze floor is
intrinsically wrong under deep, unbounded research — no person here
received research anywhere near the depth that likely built their
original 21-32-attribute production profile (which may reflect more
research time, a less strict contemporaneous cluster-dedup discipline, or
scoring-time judgment calls no longer literally reconstructable from a
fresh incident ledger — this audit cannot distinguish between those
explanations). The finding at this level is suggestive, not conclusive:
it is consistent with the gate being miscalibrated, and equally consistent
with the gate being appropriate for a research investment this audit did
not attempt. A larger sample and/or a genuinely unbounded-depth research
pass on a subset would be needed to move this from provisional to
confirmed.

## Part M — Recommendation for roster21

**Recommendation B, restated as a workflow-supported recommendation, not
a claim about `eligibility_v2`'s correctness: keep `eligibility_v2`
unchanged, and revisit the pre-freeze prediction rule before roster21.**

Scope limit, stated explicitly per instruction: **this audit provides no
evidence requiring an `eligibility_v2` change.** All 5 sampled live
profiles currently pass it, but that observation is not independent
validation — the live roster was constructed to pass `eligibility_v2`, so
it passing is expected by construction, not evidence the gate is
well-calibrated in some external sense. This audit was designed to test
the pre-freeze *predictor*, not to validate `eligibility_v2` itself, and
says nothing new about the latter either way.

What the audit *does* support: the pre-freeze predictor's job is to
forecast whether a candidate can eventually clear `eligibility_v2`. Under
a normal-scale research pass, it fails to do so for 5 people who, in
production, all clear the actual target at 21-32 attributes — a
`CURRENT_WORKFLOW_PREFREEZE_MISALIGNED` result. Two specific,
evidence-supported angles for a future revision (options, not decisions):
- The `<=3`-per-cluster dedup cap may be appropriate as a scoring-time
  anti-gaming discipline but too strict as a pre-freeze breadth
  *predictor*, where the real question is "is there enough raw material to
  eventually reach 18-22 scored attributes," not "how many
  non-duplicative attributes can be justified from a first read."
- The pre-freeze floor's absolute number (20) has only been tested at
  small scale (this audit's n=5, roster20's n=5) — a larger sample would
  strengthen either a revision decision or a decision to leave it as-is.

Recommendation D (larger sample) is a reasonable complement, not a
substitute: the workflow-level finding is already well-supported at n=5
given its consistency (0/5 on both the incident and attribute floors), but
the gate-level question in Part L.B remains genuinely open and would
benefit from either a larger sample or a small number of deliberately
deep-research case studies. Recommendation A (keep the gate, improve
candidate selection) remains unsupported: these are already the
best-documented, fully-production-vetted people available to sample, and
selection quality was not the limiting factor.

## Roster count confirmation

Read-only throughout. `peopleIndex.generated.ts` still lists 125 people;
none of the 5 sampled profiles' data was touched. `data-pipeline/candidates/`
corpus untouched (still 272 files). No `SEED_PEOPLE`, roster*.ts, seed.ts,
editorial.ts, dispersion, i18n, threshold, or rubric file was modified at
any point in either the original audit or this correction pass.
