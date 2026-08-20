# Session 16 comparison — shadow scoring vs. historical Session 13 rows

Performed only after both `shadowProfile.borges.json` and
`shadowProfile.sankara.json` were independently locked (`SHADOW LOCKED`,
see each file). No shadow row was edited after this comparison began.

## Governing caveat, stated once, applies to every number below

This audit's independence is limited by what could actually be
reconstructed (see `frozenEvidence.*.md`): the only frozen artifact this
repository preserves is Session 13's already-scored row `rationale` text,
not a neutral pre-scoring evidence ledger. Having read each fact already
grouped under the trait Session 13 chose for it, this shadow scoring
cannot be strictly blind. **The reproducibility figures below should be
read as an upper bound on true independent-scoring agreement**, not a
clean from-scratch replication. Where a genuine, independently-reasoned
disagreement DID emerge despite this contamination risk (4 declined rows,
2 materially different confidence levels — both directions), that is
correspondingly stronger evidence, precisely because it survived a biased
starting condition.

## 1. Jorge Luis Borges

| Metric | Value |
|---|---|
| Session 13 row count | 16 |
| Session 16 shadow row count | 15 |
| Exact reproductions | 15 |
| Partial reproductions | 0 |
| Session-13-only rows | 1 (`decisiveness`) |
| Session-16-only rows | 0 |
| Mapping disagreements (same evidence -> different trait) | 0 |
| Meaningful confidence disagreements (>=0.08 delta, same trait) | 0 |
| Episodes supporting 0 traits | 3 of 26 (E9/E10 considered-and-declined for a second trait beyond `discipline`; already fully "used" for their one trait, not zero-trait dead weight, so more precisely: 0 of the 26 reconstructed episodes went entirely unused -- every episode fed at least one row) |
| Episodes supporting 1 trait | ~17 of 26 |
| Episodes supporting 2 traits | E1/E2/E8 (independent_thinking + autonomy_need), E9/E10 considered for discipline+deep_focus but resolved to 1 |
| Episodes supporting 3+ traits | E1 alone (independent_thinking, autonomy_need, risk_tolerance) |

**Row-by-row**, all 15 kept rows: `independent_thinking`,
`belief_updating`, `discipline`, `perfectionism`, `persistence`,
`adaptability`, `collaboration`, `autonomy_need`, `cross_domain_range`,
`systems_abstraction`, `creative_originality`, `ambiguity_tolerance`,
`achievement_drive`, `risk_tolerance`, `opportunity_sensing` — every one
classified EXACT (score within 3 points, confidence within 0.07, same
`evidenceType`, in every case; see `shadowProfile.borges.json` for the
paired numbers).

**The one disagreement — `decisiveness` (Session-13-only)**: Session 13
scored this at 66/0.42/`inference`, explicitly hedging in its own
rationale ("treated cautiously since these same underlying episodes are
the primary basis for the `autonomy_need` row above"). This audit's
independent judgment, applied fresh, is that the hedge does not fully
resolve the underlying construct-distinctness problem — the same two
1946/1973 resignation facts, already used for `independent_thinking` and
`autonomy_need`, plausibly reflect principled refusal rather than a
general rapid-decision-making style independent of the specific values at
stake. This audit left the row unscored rather than including it at low
confidence. This is the audit's single clearest genuine (not manufactured
— it emerged from applying the rubric's own construct-validity discipline,
not from a target row count) disagreement for Borges.

## 2. Thomas Sankara

| Metric | Value |
|---|---|
| Session 13 row count | 16 |
| Session 16 shadow row count | 13 |
| Exact reproductions | 11 |
| Partial reproductions | 2 (`planning_orientation`, `detail_orientation`) |
| Session-13-only rows | 3 (`impact_motivation`, `achievement_drive`, `adaptability`) |
| Session-16-only rows | 0 |
| Mapping disagreements (same evidence -> different trait) | 0 |
| Meaningful confidence disagreements (>=0.08 delta, same trait) | 2 (`planning_orientation` 0.55->0.64; `detail_orientation` 0.38->0.50, also an `evidenceType` upgrade `inference`->`strong_inference`) |
| Episodes supporting 1 trait | S2(as literacy fact)/S10/S11/S13/S14/S15/S16/S17/S18 -- roughly 9 of 19 |
| Episodes supporting 2 traits | S3, S12, S9 |
| Episodes supporting 3+ traits | S1 (leadership_drive, execution_speed -- and, in Session 13's own mapping, also `impact_motivation`/`achievement_drive`), S7/S8 (independent_thinking, conflict_tolerance, risk_tolerance), S4 (proactive_agency, resourcefulness), S5/S6 (proactive_agency, discipline, detail_orientation) |

**Row-by-row, exact (11)**: `leadership_drive`, `proactive_agency`,
`independent_thinking`, `conflict_tolerance`, `risk_tolerance`,
`execution_speed`, `persuasiveness`, `resourcefulness`, `discipline`,
`collaboration`, `curiosity` — all within the same materiality band as
Borges's exact rows.

**Row-by-row, partial (2)**:
- `planning_orientation`: Session 13 74/0.55/`documented`; shadow
  74/0.64/`documented`. Same score, same evidenceType, confidence raised
  independently. Re-reading the three supporting facts (mandatory
  tree-planting tied to aid eligibility, a dedicated new ministry +
  women's union, a constitutional cabinet-composition amendment) as three
  genuinely distinct, structurally-documented program-design decisions,
  this audit judged Session 13's own confidence (0.55, the "single
  strong_inference" band per rubric SS3) noticeably under-weighted the
  evidentiary richness actually present in its own row — a case of
  probable historical UNDER-confidence, the opposite direction from what
  the Session 15 hypothesis would predict.
- `detail_orientation`: Session 13 55/0.38/`inference`; shadow
  60/0.5/`strong_inference`. The two supporting facts (requiring itemized
  declarations from ministers; itemizing his own assets) are both
  independently documented and converge on the same trait — this meets
  the rubric SS10 objective two-fact `strong_inference` bar, which
  Session 13's own `inference`-tier classification did not apply here
  even though the underlying facts qualify. A second case of probable
  historical under-confidence.

**The three disagreements (Session-13-only)**:
- `impact_motivation` (S13: 82/0.62/`documented`) and `achievement_drive`
  (S13: 74/0.55/`strong_inference`) both draw on the identical
  `S1`/`S2`/`S3` evidence cluster already used for `leadership_drive`.
  This audit's independent judgment: `leadership_drive` alone adequately
  captures this specific evidence cluster (who drove three quantified,
  simultaneous reform programs); a second reading ("the programs had real
  effect") and a third ("this reflects general achievement drive") are
  each a real but progressively thinner incremental claim on the same
  three facts, and `achievement_drive` in particular reads close to the
  rubric SS6 "success/scale of the outcome implies the trait" anti-pattern.
  `impact_motivation` specifically is logged as a genuinely
  closely-contested call, not a confident rejection — a reasonable
  independent scorer could keep it at reduced confidence instead (see
  `shadowProfile.sankara.json`'s `consideredButDeclined` entry).
- `adaptability` (S13: 55/0.38/`inference`) rests on a single fact — the
  military-to-civilian governance transition — with no described adaptive
  BEHAVIOR during that transition, only the fact of the role change
  itself. This audit judged that close to the rubric's own
  occupational-stereotype anti-pattern (a role/transition standing in for
  a trait, SS6) and left it unscored. Unlike the two rows above, this
  disagreement has nothing to do with multi-trait evidence reuse — `S17`
  is a standalone, single-use episode nowhere else in the profile.

## 3. Cohort-level metrics

```
Session 13 mean row count:      16.0   (16 + 16) / 2
Session 16 shadow mean row count: 14.0   (15 + 13) / 2
Row-count delta:                 -2.0   (-12.5%)

Trait-identity intersection:     28    (15 Borges + 13 Sankara, all kept rows are trait matches)
Trait-identity union:            32    (16 + 16; zero Session-16-only traits on either candidate)
Jaccard trait overlap:           28/32 = 0.875

Exact reproductions:             26    (15 + 11)
Partial reproductions:            2    (0 + 2)
Exact + partial reproduction rate: 28/32 = 87.5%
Proportion of Session 13 rows NOT reproduced: 4/32 = 12.5%
Mapping disagreements (E):        0
```

No case in either profile involved the SAME evidence being remapped to a
genuinely DIFFERENT trait than Session 13 chose (category E, "mapping
disagreement") — every divergence was either drop (evidence judged
insufficient/too-redundant to support a row at all) or a confidence/
evidenceType adjustment on the SAME trait Session 13 already chose. This
matters for the interpretation framework below: it rules out Outcome C
("similar totals hiding poor trait-identity overlap") cleanly — the
overlap is both high in count AND in identity, not merely coincidentally
similar totals built from different traits.

## 4. Multi-trait hypothesis test (Session 15's leading hypothesis)

Session 15's hypothesis: the main remaining confound may be a difference
in evidence-to-trait conversion discipline, specifically how readily one
episode is allowed to support a second or third distinct trait row.

**Rate of rows drawing on evidence shared with at least one other row in
the same profile:**

```
                    Session 13 rows sharing evidence   Shadow rows sharing evidence
Borges              4 / 16  (25.0%)                    3 / 15  (20.0%)
Sankara             10 / 16 (62.5%)                    9 / 13  (69.2%)
Combined            14 / 32 (43.75%)                   12 / 28 (42.86%)
```

**The combined multi-trait-reuse RATE is nearly identical between
Session 13's historical scoring and this audit's independent shadow
scoring (43.75% vs. 42.86%, well within any reasonable measurement
noise).** This is the audit's single most important quantitative result
for the hypothesis: independent re-scoring, applying the current rubric
fresh, did NOT show a systematically stricter or looser overall appetite
for multi-trait evidence reuse than Session 13 already exercised.

**Of the 4 rows this audit declined (relative to Session 13), attribution
by cause:**

```
decisiveness (Borges)        -- 3rd extraction from an already-used episode cluster (E1/E2/E8)  -> multi-trait-related
impact_motivation (Sankara)  -- 2nd extraction from an already-used episode cluster (S1/S2/S3)   -> multi-trait-related
achievement_drive (Sankara)  -- 3rd extraction from the SAME episode cluster (S1/S2/S3)           -> multi-trait-related
adaptability (Sankara)       -- standalone single-use episode (S17), never shared with another row -> NOT multi-trait-related (thin single-fact / stereotype-adjacent instead)
```

**3 of 4 declined rows (75%) are directly attributable to stricter
judgment about extracting a 2nd-or-3rd trait from an already-used
evidence cluster; 1 of 4 (25%) is unrelated.** So the hypothesis is real
and present in this data — but its magnitude is small: 3 rows out of the
combined 32 Session 13 rows is 9.4% of the total. Even a maximally
generous reading (assuming Session 14/15's candidates would show the same
9.4%-scale effect) falls enormously short of explaining Session 14's
observed ~50%+ row-count shortfall relative to Session 13's demonstrated
depth (mean 6.0 vs. 12.83) or Session 15's ~40% shortfall (mean 7.75 vs.
12.83) — see `docs/roster-1000-checkpoint.md` §80-81.

**Verdict on the Session 15 hypothesis: PARTIALLY SUPPORTED, but as a
minor contributor, not the primary driver.** Multi-trait conversion
discipline is a real, measurable, and slightly stricter force in this
audit's independent scoring (it explains all 3 of the "genuinely
multi-trait-cluster-related" drops), but it accounts for less than a
tenth of Session 13's total row count for these two candidates — nowhere
near enough magnitude to be the primary explanation for the much larger
Session 13-vs-14/15 gap.

## 5. Discrepancy diagnosis, by category

| Row | Discrepancy | Category | Detail |
|---|---|---|---|
| `decisiveness` (Borges) | Session-13-only | (1) multi-trait permissiveness difference | 3rd trait pulled from the same 2 core resignation facts already used twice; this audit judged the construct distinctness too thin to independently justify a third row, even at Session 13's own already-hedged low confidence. |
| `impact_motivation` (Sankara) | Session-13-only | (1) multi-trait permissiveness difference | 2nd trait pulled from the same 3 quantified-program facts already used for `leadership_drive`; judged a genuinely close call, not a confident rejection. |
| `achievement_drive` (Sankara) | Session-13-only | (1) multi-trait permissiveness difference, bordering (7) likely historical over-permissiveness | 3rd trait pulled from the identical evidence cluster; closest of the four disagreements to the rubric's own explicit "success implies the trait" anti-pattern. |
| `adaptability` (Sankara) | Session-13-only | (6) direct-vs-inferential interpretation, bordering (7) likely historical over-permissiveness | A single-fact role transition with no described adaptive behavior — the least defensible of Session 13's 32 rows under a strict rubric re-read, and the one clear case in this audit NOT explained by multi-trait reuse at all. |
| `planning_orientation` (Sankara) | Partial (confidence 0.55->0.64) | (3) confidence-threshold difference, direction: (8) likely current audit correcting historical under-confidence | Three genuinely distinct, well-documented program-design facts; Session 13's own confidence looks conservative relative to its own cited evidence. |
| `detail_orientation` (Sankara) | Partial (confidence 0.38->0.50, evidenceType inference->strong_inference) | (3) confidence-threshold difference, same direction as above | Two independently documented, converging facts meet the rubric SS10 objective two-fact `strong_inference` bar that Session 13's own `inference` classification did not apply. |

**No example was found in either category (8) "likely current
over-conservatism" alone** — every genuine disagreement either pointed
toward this audit being STRICTER than Session 13 (the 4 declined rows,
categories 1/6/7) or toward Session 13 having been slightly
UNDER-confident on two already-kept rows (categories 3/8, in the opposite
direction from what "current over-conservatism" would predict). This is
worth stating plainly: **this audit did not find broad evidence that the
"current" rubric application is a generally more restrictive or more
generous instrument than Session 13's own application of the same
rubric** — the small number of real disagreements go in both directions
(2 rows scored MORE confidently than Session 13, 4 rows declined that
Session 13 kept), which is the signature of ordinary scorer-level
judgment variance on a small number of genuinely contestable rows, not a
systematic drift in one direction.

## 6. Interpretation

Per the session's own framework:

- Both shadow profiles returned close to Session 13-level coverage (15/16
  and 13/16 — 93.75% and 81.25% of Session 13's own row count
  respectively) with very strong trait-identity overlap (Jaccard 0.9375
  for Borges, 0.875 for Sankara, 0.875 combined) and zero mapping
  disagreements.
- **This matches Outcome A — strong reproducibility** — as defined by the
  session's own interpretation framework: "Session 13 scoring appears
  substantially reproducible. This weakens the scorer-drift hypothesis
  and makes genuine candidate/evidence differences in Session 15 more
  plausible."
- Consistent with instruction 13's own caution, **this conclusion is
  explicitly NOT claimed as full calibration from two people** — it is a
  bounded, evidence-grounded result for exactly these two, unusually
  evidence-rich candidates (both had multiple primary-source materials —
  a Paris Review interview and UN/OAU speech transcripts respectively —
  well above what most held candidates have available).
- The governing contamination caveat (Section 0 above) further tempers
  this: because this audit's episode reconstruction could only be built
  from Session 13's already-trait-grouped rationale text, some portion of
  the high agreement is very likely an artifact of that non-blind
  starting condition, not purely independent convergence. The 6 genuine,
  independently-reasoned disagreements found despite this contamination
  (4 drops, 2 confidence corrections, in BOTH directions) are the
  strongest evidence this audit has that real independent judgment was
  actually exercised, not merely restated — but they are a minority of
  the 32 total rows, and a true blind trial would very likely show a
  materially lower agreement rate than the 87.5% measured here.

**Implication for the Session 15 hypothesis**: PARTIALLY SUPPORTED (see
Section 4) — real and measurable, but small in magnitude (accounts for
~9% of Session 13's row count for these two candidates), not sufficient
on its own to explain the much larger Session 13-vs-14/15 row-count gap.

**Implication for `eligibility_v2`**: none — `eligibility_v2` was never
run against either shadow profile, and nothing in this audit examined,
questioned, or suggests changing its thresholds. This audit is entirely
upstream of eligibility: it only tests whether frozen evidence converts
to trait rows reproducibly, not whether any resulting profile would pass
admission.

**Recommended next step**: this audit's contamination limitation
(Section 0) is real and should be resolved before treating "Outcome A" as
settled. A stronger follow-up would repeat this exact protocol under
TRUE blind conditions — a scorer (human or a fresh agent session with no
prior exposure to Session 13's rows) extracting episodes and mapping
traits directly from the ORIGINAL cited sources (the Paris Review
interview, the Infobae account, the UN/OAU speech transcripts) with
Session 13's locked rows never shown until after that scorer's own lock
point. If that stronger trial still reproduces close to what this audit
found, Outcome A would be confirmed with much higher confidence. If it
instead reproduces closer to Session 14/15's low counts, that would
indicate this audit's contamination materially inflated its agreement
figures, and the scorer-drift hypothesis would need to be taken more
seriously after all. Given the resource cost of a true blind trial, this
is recorded as a recommendation, not undertaken in Session 16 itself
(out of scope per instruction 15 — no new research this session).
