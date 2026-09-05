# Roster 12/13 coverage-bottleneck postmortem (2026-09-05)

Analysis-only checkpoint. No candidate was changed, rescored, or
researched further to produce this document — every number below comes
from files already committed to `main` (`data-pipeline/candidates/*.json`,
`src/core/matching/similarity.ts`, `src/core/attributes/attributes.ts`)
plus one read-only script (deleted after use) that called the repo's own
`evaluateMatchEligibility()` directly against each candidate's already-
committed data, so every reported number is the live formula's own output,
not a re-derivation.

## 1. PR #5 merge result

- Merged with a normal merge commit: **`023df19`**.
- Confirmed `eec6d87` (PR #5's sole commit) is an ancestor of `origin/main`.
- Merge commit's first-parent diff: exactly the reviewed 21-file scope
  (18 new candidate JSON + `roster.md` + `CURRENT_STATE.md` +
  `roster13-new-intake-batch.md`) — no more, no less.
- Candidate validator: 0 errors, 0 warnings (`held` 152, `qa_passed` 63).
  Scoring-lock integrity: 0 flagged (215 committed files checked). All 18
  new files independently re-verified: valid QID, ≥2 sources, substantive
  rationale on every row, `computedEligibility.eligible` matches `status`
  in every case, every `held` candidate carries a `holdReason`. No
  candidate score/confidence was touched during this review.
- A Vercel production deployment was emitted for the merge commit and
  resolved **success**. No production data changed (candidate-JSON-only
  commit), so no browser verification was performed, per instruction.

## 2. Combined 33-candidate outcome table

`n` = scored attribute count. `cov` = validator-reported `coverage`
(matches an independent recomputation from `ATTRIBUTES[*].baseWeight` to
within rounding in all 33 cases — see §5). `hc` = attributes at
confidence ≥ 0.5. `src`/`kinds` = source count / distinct source `kind`
values. `doc`/`si`/`inf` = row counts by `evidenceType`. `r/d` = rows
tagged `impact: "risk"` or `"dual_edged"` (conflict/setback-adjacent
evidence). `ip` = rows whose rationale text contains an interpersonal
keyword (relationship, marriage, ally, rival, mentor, family member,
etc.). `span` = death year − birth year (blank where still living).

| Candidate | Batch | Preflight | n | avgConf | cov | Elig | src/kinds | doc/si/inf | hc | r/d | ip | span |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timur | 12 | STRONG | 18 | 0.528 | 0.536 | held | 5/2 | 11/4/3 | 13 | 2 | 7 | 69 |
| Nzinga | 12 | STRONG | 18 | 0.558 | 0.533 | held | 5/3 | 14/3/1 | 15 | 3 | 12 | 80 |
| Winnie Madikizela-Mandela | 12 | STRONG | 18 | 0.508 | 0.536 | held | 4/4 | 11/3/4 | 12 | 5 | 9 | 82 |
| Ken Saro-Wiwa | 12 | STRONG | 18 | 0.542 | 0.536 | held | 5/4 | 11/5/2 | 11 | 2 | 5 | 54 |
| Léopold Sédar Senghor | 12 | STRONG | 18 | 0.531 | 0.549 | held | 4/3 | 11/5/2 | 12 | 1 | 4 | 95 |
| Gamal Abdel Nasser | 12 | STRONG | 18 | 0.539 | 0.540 | held | 5/4 | 13/3/2 | 14 | 3 | 4 | 52 |
| Benazir Bhutto | 12 | STRONG | 18 | 0.547 | 0.539 | held | 4/3 | 12/4/2 | 14 | 2 | 8 | 54 |
| Jawaharlal Nehru | 12 | STRONG | 20 | 0.574 | **0.599** | held | 6/3 | 17/3/0 | 19 | 3 | 12 | 75 |
| King Hussein of Jordan | 12 | STRONG | 18 | 0.546 | 0.543 | held | 4/3 | 15/2/1 | 14 | 4 | 12 | 64 |
| Chiang Kai-shek | 12 | STRONG | 19 | 0.545 | 0.565 | held | 5/3 | 13/4/2 | 16 | 4 | 7 | 88 |
| Empress Dowager Cixi | 12 | STRONG | 19 | 0.523 | 0.566 | held | 4/3 | 13/3/3 | 15 | 4 | 7 | 73 |
| Seneca | 12 | STRONG | 19 | 0.512 | 0.569 | held | 5/2 | 7/8/4 | 15 | 3 | 7 | 69 |
| **Marcus Aurelius** | 12 | STRONG | 20 | 0.547 | **0.604** | **qa_passed** | 4/2 | 5/12/3 | 17 | 2 | 12 | 59 |
| Salvador Allende | 12 | STRONG | 19 | 0.562 | 0.569 | held | 5/4 | 16/1/2 | 17 | 2 | 4 | 65 |
| **Che Guevara** | 12 | STRONG | 21 | 0.581 | **0.625** | **qa_passed** | 6/3 | 17/3/1 | 19 | 4 | 7 | 39 |
| Suleiman the Magnificent | 13 | STRONG | 19 | 0.527 | 0.568 | held | 4/2 | 13/4/2 | 14 | 5 | 11 | 72 |
| David Ben-Gurion | 13 | STRONG | 18 | 0.548 | 0.542 | held | 4/3 | 11/7/0 | 14 | 3 | 9 | 87 |
| Yasser Arafat | 13 | STRONG | 18 | 0.526 | 0.533 | held | 4/3 | 12/3/3 | 12 | 4 | 6 | 75 |
| Nawal El Saadawi | 13 | STRONG | 18 | 0.568 | 0.545 | held | 5/3 | 15/2/1 | 14 | 2 | 11 | 90 |
| Muhammad Ali of Egypt | 13 | PLAUSIBLE | 18 | 0.527 | 0.540 | held | 4/3 | 14/2/2 | 13 | 3 | 9 | 80 |
| Ellen Johnson Sirleaf | 13 | STRONG | 18 | 0.517 | 0.531 | held | 4/4 | 13/3/2 | 13 | 2 | 9 | — |
| Robert Mugabe | 13 | STRONG | **17** | 0.524 | 0.505 | held | 4/3 | 14/0/3 | 12 | 7 | 11 | 95 |
| Fidel Castro | 13 | STRONG | 20 | 0.564 | **0.599** | held | 5/4 | 18/1/1 | 18 | 4 | 6 | 90 |
| Getúlio Vargas | 13 | STRONG | 18 | 0.500 | 0.536 | held | 4/3 | 14/1/3 | 12 | 4 | 6 | 72 |
| Juan Perón | 13 | STRONG | **17** | 0.514 | 0.505 | held | 3/3 | 12/2/3 | 10 | 2 | 10 | 79 |
| Subhas Chandra Bose | 13 | STRONG | 18 | 0.560 | 0.533 | held | 4/3 | 15/3/0 | 14 | 4 | 10 | 48 |
| Muhammad Ali Jinnah | 13 | PLAUSIBLE | 18 | 0.539 | 0.533 | held | 4/4 | 16/0/2 | 16 | 2 | 6 | 72 |
| Toyotomi Hideyoshi | 13 | STRONG | 18 | 0.547 | 0.530 | held | 4/2 | 15/1/2 | 15 | 2 | 4 | 61 |
| Puyi | 13 | STRONG | 18 | 0.477 | 0.545 | held | 4/2 | 15/1/2 | 8 | 5 | 11 | 61 |
| Lu Xun | 13 | STRONG | 18 | 0.532 | 0.546 | held | 4/3 | 14/2/2 | 14 | 2 | 7 | 55 |
| Ho Chi Minh | 13 | STRONG | 18 | 0.546 | 0.549 | held | 4/3 | 17/1/0 | 15 | 2 | 7 | 79 |
| Corazon Aquino | 13 | STRONG | 18 | 0.522 | 0.539 | held | 3/3 | 16/1/1 | 12 | 2 | 7 | 76 |
| Cato the Younger | 13 | PLAUSIBLE | 18 | 0.518 | 0.543 | held | 4/2 | 14/3/1 | 11 | 3 | 9 | 49 |

**No pattern in `src/kinds`, `doc/si/inf` mix, `ip` (interpersonal rows),
or `span` separates the 2 passers from the 31 held candidates.** Fidel
Castro (5 sources/4 kinds, 18 documented rows, 90-year span) is more
source-rich by every one of those measures than Marcus Aurelius (4
sources/2 kinds, 5 documented rows, 59-year span) — and Castro is held
while Marcus Aurelius passed. The only column that cleanly separates
passers from held candidates is **`n`** (scored attribute count): both
passers scored 20-21; every held candidate scored 17-20, and the two
20-scorers among the held group (Nehru, Castro) both missed by the same
0.001.

## 3. Coverage-bottleneck diagnosis

Checked against the task's options A-I:

- **A (insufficient scored attributes): confirmed as the dominant, near-
  total cause.** See §5 for the mathematical proof: 18 or 19 scored
  attributes cannot reach 0.6 coverage under this taxonomy's weights no
  matter which attributes are chosen. 30 of 33 candidates in this
  combined batch scored 17-19 attributes — mathematically incapable of
  passing regardless of evidence quality.
- **B (too many weakly supported rows):** a real but minor, secondary
  factor for a handful of candidates only. Ken Saro-Wiwa, Cato the
  Younger (`highConfidence.minCount` short by 1), Puyi and Getúlio Vargas
  (`highConfidence.minAverageConfidence` short), Juan Perón (both). None
  of these five would have passed even if this specific gate had been
  satisfied — all five were also short on `coverage`, the binding
  constraint in all 31 cases without exception.
- **C (evidence concentrated in too few domains):** not supported by the
  data. Facet coverage (thinking/creativity/work_style/resilience/
  social/motivation/world_sense) was 6-7 of 7 for both passers and
  nearly every held candidate alike; it does not differentiate outcomes.
- **D (insufficient repeated instances per trait):** not independently
  measurable as a distinct cause from the confidence data available;
  average confidence among held candidates (0.50-0.57) overlaps
  substantially with the two passers' (0.547, 0.581).
- **E (excessive self-report dependence):** not supported — several held
  candidates (Fidel Castro, Ho Chi Minh, Corazon Aquino) have strongly
  independent-source-dominated packs (`documented` rows citing
  institutional/press/independent-observer sources far more than
  self-report) and still missed on coverage alone.
- **F (too narrow temporal range):** not supported — spans range from 39
  years (Che Guevara, a passer) to 95 years (Léopold Sédar Senghor and
  Robert Mugabe, both held), no correlation with outcome.
- **G (preflight selecting historically important but behaviorally thin
  candidates):** not really what happened. Most held candidates have
  substantial documented behavioral evidence (13-18 `documented` rows in
  many cases) — the preflight labels (`STRONG_INTAKE` for 29 of the 33)
  were not wrong about evidence *richness*; what they did not check was
  whether that richness could be stretched across enough *distinct
  attributes* to clear the coverage arithmetic. This is a real, specific
  preflight gap, addressed in §6.
- **H (implementation bug in weighted coverage): ruled out — no bug
  found.** See §5.
- **I (combination):** the accurate combination is "overwhelmingly A,
  with B as a minor contributor in 5 of 31 cases and none of C/D/E/F/G
  independently explaining any held outcome."

## 4. Passers vs. near-misses

Three candidates scored exactly 20 attributes: Marcus Aurelius (passed,
coverage 0.604), Fidel Castro (held, 0.599), Jawaharlal Nehru (held,
0.599, roster-12). All three share the same top 8 highest-weight
attributes (`persistence` 1.20, `curiosity`/`independent_thinking`/
`discipline` 1.15, `risk_tolerance`/`mastery_orientation` 1.10,
`leadership_drive`/`achievement_drive` 1.05). The entire pass/fail
difference came down to the remaining ~12 attributes: Marcus Aurelius's
set totals **20.70** base-weight (avg 1.035/attribute — his 20th
attribute, `creative_originality` at 1.10, is a comparatively high-weight
choice); Castro's and Nehru's sets both total **20.50** (avg 1.025) —
short of the 20.55 needed to cross 0.6. That is a difference of roughly
0.2 weight-units, well within ordinary evidence-pack variation, not a
qualitative gap in evidence richness.

Che Guevara's margin is different and more robust: 21 scored attributes
(total weight 21.40, coverage 0.625) clears the threshold with room to
spare regardless of which specific 21 were chosen — 21 attributes is
mathematically guaranteed to reach at least 0.588 in the worst case and
comfortably clears 0.6 with any reasonably balanced selection (see §5).

**Conclusion**: the two passers were not distinguished by broader
behavioral-domain coverage, more independent sources, stronger
interpersonal evidence, or longer longitudinal span — the near-misses
matched or exceeded them on every one of those dimensions (§2). The
actual, mechanically-confirmed differentiator was **simply scoring more
attributes**, with attribute-weight composition acting only as a
razor-thin tiebreaker exactly at the 20-attribute boundary. This is a
finding about *how many attributes this cycle's evidence packs stopped
at*, not about *the quality or breadth of the underlying evidence* — in
several held cases (Fidel Castro, Ho Chi Minh, Nawal El Saadawi) the
underlying evidence pack plausibly supported additional attributes that
were simply not written into the JSON.

## 5. Eligibility formula verification — no bug found

Read `ELIGIBILITY` in `src/core/matching/similarity.ts` (unchanged,
thresholds not touched by this analysis): `minScoredAttributes: 18`,
`minCoverage: 0.6`, `highConfidence: { threshold: 0.5, minCount: 12,
minAverageConfidence: 0.55 }`. `coverage` is computed as
`sum(ATTRIBUTES[a].baseWeight for scored a) / TOTAL_BASE_WEIGHT`, entirely
independent of confidence, exactly as documented.

Independently recomputed `coverage` for all 33 candidates directly from
`ATTRIBUTES[*].baseWeight` (`src/core/attributes/attributes.ts`,
`TOTAL_BASE_WEIGHT = 34.25` across the 34 attributes) and compared
against the validator's own reported figure: **matched to within
rounding in all 33 cases** (see §2's `cov` column). The implementation
is computing weighted coverage exactly as intended.

**Mathematical bound** (computed from the actual 34 `baseWeight` values,
ranging 0.85-1.20, mean 1.007): taking the 18 or 19 highest-weight
attributes in the entire taxonomy — the best possible case, not
realistic — yields at most 0.558 (n=18) or 0.587 (n=19) coverage.
**It is mathematically impossible to reach 0.6 coverage with 18 or 19
scored attributes, regardless of which attributes are chosen or how
strong the evidence is.** At n=20, the range is 0.559-0.616 depending on
composition (a genuine coin flip, as §4 shows). At **n=22, even the
worst-case combination of the 22 lowest-weight attributes reaches
0.6175 — coverage ≥ 0.6 is mathematically guaranteed from n=22 onward,
independent of which specific attributes are scored.**

This means the roster-12 and roster-13 checkpoints' own working
assumption — that 18 scored attributes was a reasonable per-candidate
target because it matches `ELIGIBILITY.minScoredAttributes` — was
mistaken. `minScoredAttributes: 18` is a floor below which a candidate
is rejected outright; it was never a sufficient target for `coverage`,
which has its own, independent, higher effective floor of roughly 20
(best case) to 22 (guaranteed case) attributes. No code changed as a
result of this finding — the formula is correct and untouched; the
finding is about how future evidence packs should be sized against it.

## 6. Proposed roster-14 preflight (stricter, evidence-oriented, not
   eligibility-chasing)

The changes below target the confirmed root cause (§3: cause A) without
predicting or optimizing the numeric eligibility result — they raise the
bar on *how much genuinely distinct behavioral evidence a candidate must
have before being frozen*, not on which specific attributes to pick
once scoring begins (attribute *selection* stays evidence-driven, per
existing rubric discipline; nothing here licenses choosing an attribute
because of its `baseWeight`).

- **Raise the pre-freeze evidence-depth bar from "≥18-attribute-capable"
  to "≥21-attribute-capable."** Rationale: 21 is the lowest count at
  which passing was actually observed in this 33-candidate dataset
  (Che Guevara), and is one below the mathematically-guaranteed n=22
  floor — a defensible, data-supported target rather than an arbitrary
  round number. Before freezing a candidate, the researcher must be able
  to sketch — from evidence already gathered in the preflight pass, not
  invented — at least 21 distinct attributes each traceable to a
  specific documented or strong-inference-grade behavioral incident.
  This is a *pre-freeze estimate check*, not a promise; first-scoring
  may still land lower if the evidence turns out thinner once written up
  in full, exactly as it should.
- **Require evidence incidents to be countable, not just topics.** The
  33-candidate data shows no correlation between *topical* breadth
  (source kind diversity, interpersonal-keyword hits, temporal span) and
  passing — what matters is whether enough *separate, attributable
  incidents* exist to support 21+ distinct rows. Preflight should
  explicitly count candidate incidents (a specific dated action, quote,
  or documented decision — not a general character description) rather
  than counting source diversity as a proxy for it; §2/§3 show source
  diversity alone does not predict adequate incident count.
- **Keep, unchanged, the discipline already working correctly**: the
  `STRUCTURAL_RISK`/`REJECT_PRE_SCORE` filters for propaganda-heavy or
  self-mythologizing sources (Cleopatra, Idi Amin, Mobutu Sese Seko this
  cycle) remain valid and are not implicated in this postmortem — none
  of the 33 *scored* candidates failed because their sources were
  unreliable; all 33 had genuinely usable evidence, just not enough of
  it converted into distinct attribute rows.
- **Do not lower the freeze size below the current ~15-18 to compensate**
  for the higher per-candidate bar; if 33 candidates were needed to
  produce 2 passers under the old (insufficient) targeting, a
  correctly-targeted batch should convert a much higher fraction, so a
  similar-or-smaller freeze size should suffice (see §7).
- **Do not use `baseWeight` as a selection criterion for which
  attributes to score.** This postmortem's §4 finding about weight
  composition is disclosed for transparency, not adopted as a scoring
  heuristic — doing so would be exactly the eligibility-chasing this
  project's confidence-change policy prohibits. The fix for the real
  problem (too few *attributes*, not the wrong *choice* of attributes)
  is to genuinely dig for more distinct, evidence-grounded incidents per
  candidate, not to reweight which ones get written up.

## 7. Recommended roster-14 frozen-batch size

**10-14 candidates**, smaller than roster-12/13's 15-18, on the
reasoning that a materially higher per-candidate evidence-depth
requirement (§6) should raise the pass rate closer to what the evidence
richness already visible in this cycle's `STRONG_INTAKE` labels implied
it should have been (29 of 33 candidates were labeled `STRONG_INTAKE`
and had substantial documented evidence — the shortfall was in
attribute-count targeting, not evidence quality) — trading batch size for
a higher, evidence-grounded pass rate rather than continuing to spend
full evidence-pack effort on candidates pre-committed to an
attribute count that cannot mathematically clear coverage.

## 8. Expected roster-14 research workflow

1. Discovery pool (~25-30, as before) checked against the now-215-file
   corpus.
2. Preflight as before (`STRONG_INTAKE`/`PLAUSIBLE_INTAKE`/
   `STRUCTURAL_RISK`/`REJECT_PRE_SCORE`), **plus** the new §6 pre-freeze
   incident-count estimate.
3. Freeze 10-14 candidates whose preflight incident count plausibly
   supports ≥21 attributes.
4. Build evidence packs and first-score exactly as before — same rubric,
   same confidence discipline, same one-time validator run, same
   prohibition on rescoring after seeing the result.
5. Promote whichever cross `eligibility_v2` honestly; product-complete
   each before promotion (portrait, EN/KO editorial, no placeholders),
   same standard as Marcus Aurelius.

## 9. Che Guevara

Remains `qa_passed`, product-blocked by portrait rights, exactly as left
at the end of roster-13. **No further portrait searching is scheduled.**
If a product owner or a future session already knows of a specific,
rights-clear, non-AI-generated portrait, promoting him via a small
follow-up generator remains a one-step action; absent that, he stays
parked.
