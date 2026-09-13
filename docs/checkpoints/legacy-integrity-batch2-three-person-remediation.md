# Legacy integrity remediation batch 2: three-person risk-triaged remediation (2026-09-13)

Authoritative base: `main`@`b5dce84697182f44455b8e3c6c79fb06a6dbea96` (PR #36,
the Kurosawa legacy-integrity remediation, merged). This cycle is a
**strategic diagnostic**, not a broad audit: rather than deeply re-auditing
all 34 remaining pre-candidate-pipeline legacy people, it mechanically
triages all of them, freezes exactly the three highest-risk profiles, deeply
remediates only those three, and uses the result to decide whether Kurosawa
was an isolated case or evidence of a broader pattern. This is **not**
Roster33 — no new-person research was performed.

## 1. Mechanical enumeration of the legacy cohort

`SEED_PEOPLE.filter(p => !hasCandidateFile(p.slug))` at the base commit: **34
people** (mechanically re-derived fresh, matching the count PR #36 left
behind — not hardcoded). Per-person metrics collected (slug, lineage,
isDirectoryVisible, isMatchEligible, era, region, fieldIds, occupationIds,
tagIds, scored/high-confidence/documented row counts, documented-at-high-
confidence count, max confidence, source count, Wikidata QID presence, and a
base-vs-taxonomy_v1.1 row-count split as a reliable proxy for "how much later
editorial care this profile received" — see §2's methodology note).

## 2. Risk-triage methodology

Ranked by a deterministic, documented point score, **not** by fame,
likely-eligibility-outcome, ease of research, or personal familiarity:

| signal | points |
|---|---|
| source count <= 1 | +3 |
| source count == 2 | +1 |
| high-confidence rows in the unsupported base set: >=28 / >=22 / >=16 / >=8 | +4 / +3 / +2 / +1 |
| "documented"-tier rows in the unsupported base set: >=10 / >=6 / >=3 / >=1 | +4 / +3 / +2 / +1 |
| no external Wikidata QID | +2 |
| ancient/medieval era AND >=15 high-confidence rows | +2 |
| max confidence >=0.85 AND source count <=1 | +2 |
| a trait-claiming tag (checked narrowly: only `perfectionist` -> `perfectionism`, the exact pattern PR #36 found for Kurosawa) present with no/weak corresponding row | +2 per mismatch |
| tie-break | alphabetical by slug |

**Methodology note on "high-confidence/documented rows in the unsupported
base set":** every roster1/2 profile's original ~30-attribute base set
carries zero per-row rationale (PR #35's finding, re-confirmed here by
spot-checking leonardo-da-vinci's and ibn-khaldun's raw source: their base
rows have no per-row comments at all, while their taxonomy_v1.1 additions,
when present, do). Rather than a fragile text-adjacency heuristic (tried
first; it under-detects multi-row "bulleted" rationale blocks like
leonardo-da-vinci's and over/under-counts unreliably), the base/taxonomy_v1.1
row-count split — 100% reliable from typed data — is used as the risk
signal. No trait-tag mismatch was found anywhere in the 34-person cohort
beyond the already-remediated Kurosawa case.

### Full ranking (34) and top-10 detail

```
 1. bruce-lee                score=13   (tie, alphabetical)
 2. ludwig-van-beethoven     score=13   (tie, alphabetical)
 3. nikola-tesla              score=13   (tie, alphabetical)
 4. srinivasa-ramanujan      score=12
 5. toni-morrison             score=12
 6. hayao-miyazaki            score=11
 7. richard-feynman           score=11
 8. simone-biles              score=11
 9. steve-jobs                score=11
10. genghis-khan              score=10
```

- **bruce-lee** (13): 1 source; 29 high-confidence rows in the unsupported
  base (of 30); 3 "documented"-tier claims among them; no Wikidata QID; max
  confidence 0.85 on that single source.
- **ludwig-van-beethoven** (13): 1 source; 23 high-confidence base rows; 6
  "documented"-tier claims; no QID; max confidence 0.92 on that single
  source.
- **nikola-tesla** (13): 1 source; 24 high-confidence base rows; 8
  "documented"-tier claims (the most of any of the 34); no QID; max
  confidence 0.85 on that single source.
- 4th-10th (srinivasa-ramanujan through genghis-khan): same shape at lower
  magnitude — 1 source, fewer high-confidence/documented base rows, or (for
  genghis-khan) an additional era-based signal. Not frozen; left unaudited
  per §6 below, not claimed defective.

## 3. Frozen three

**bruce-lee, ludwig-van-beethoven, nikola-tesla** — the top 3 by the
methodology above, printed before any research began. Not substituted, not
re-sampled, not chosen with eligibility outcome in mind.

## 4. Research budget and sources

Sequential research (max 2 concurrent source lookups at any time, per this
project's own concurrency lesson), target 4-7 genuinely substantive sources
per person, bounded effort (~60-90 minutes equivalent per person). Eligibility
was not computed or consulted until all three were fully scored and locked.

**Bruce Lee** (5 sources): Matthew Polly's *Bruce Lee: A Life* (2018,
independent biography, accessed via the author's own recorded interviews);
Lee's own *Tao of Jeet Kune Do*; the December 1971 Pierre Berton Show
interview (his own words); Dan Inosanto's firsthand recollections (a
training partner for nearly a decade, independent of Polly); the
broadly-corroborated public record of the 1964 Wong Jack-Man match. One
claim from Polly (that Lee asked Chuck Norris to gain 20lbs to look slower
on film) is explicitly disputed by collaborator John Little and was
excluded, used for no row.

**Ludwig van Beethoven** (5 sources): Jan Swafford's *Beethoven: Anguish and
Triumph* (2014, independent scholarly biography); Beethoven's own published
letters to his nephew Karl; the historical/legal record of the 1815-1820
custody battle (court and family records); the century-long sketchbook
scholarship tradition beginning with Gustav Nottebohm (a distinct,
physically-verifiable evidentiary basis). The Heiligenstadt Testament's
content of despair over his deafness was read but deliberately **not** used
as row evidence (see §7).

**Nikola Tesla** (3 sources): Tesla's own 1919 autobiography *My Inventions*
(fetched directly from Wikisource, public domain); W. Bernard Carlson's
*Tesla: Inventor of the Electrical Age* (2013, independent modern scholarly
biography); Marc Seifer's *Wizard* (1996, independent biography using
primary sources). Popular sources frame Tesla's counting/calculation habits
as symptoms of a diagnosed condition; none of that framing is used anywhere
in this cycle (see §7) — the underlying documented behavior is used, never a
label.

## 5. Row disposition (old -> final)

| person | original rows | retained (rescored) | added (new) | removed |
|---|---|---|---|---|
| bruce-lee | 32 (30 base + 2 v1.1) | 19 | 1 (`belief_updating`) | 13 (`systems_abstraction`, `independent_thinking`, `aesthetic_sensitivity`, `detail_orientation`, `deep_focus`, `perfectionism`, `execution_speed`, `planning_orientation`, `ambiguity_tolerance`, `social_assertiveness`, `leadership_drive`, `persuasiveness`, `impact_motivation`) |
| ludwig-van-beethoven | 32 (30 base + 2 v1.1) | 11 | 0 | 21 (`curiosity`, `analytical_rigor`, `intuitive_synthesis`, `systems_abstraction`, `independent_thinking`, `experimentation`, `cross_domain_range`, `aesthetic_sensitivity`, `deep_focus`, `execution_speed`, `planning_orientation`, `adaptability`, `risk_tolerance`, `ambiguity_tolerance`, `social_assertiveness`, `leadership_drive`, `persuasiveness`, `mastery_orientation`, `achievement_drive`, `competitiveness`, `impact_motivation`) |
| nikola-tesla | 31 (30 base + 1 v1.1) | 14 (incl. `creative_originality`, independently re-verified on grounds distinct from the mental-simulation evidence used for `analytical_rigor`/`intuitive_synthesis` -- it was never actually removed from the data, just re-justified) | 1 (`opportunity_sensing`, new) | 17 (`curiosity`, `systems_abstraction`, `experimentation`, `cross_domain_range`, `aesthetic_sensitivity`, `execution_speed`, `planning_orientation`, `adaptability`, `ambiguity_tolerance`, `decisiveness`, `social_assertiveness`, `leadership_drive`, `mastery_orientation`, `achievement_drive`, `competitiveness`, `conflict_tolerance`, `autonomy_need`) |

**Final row counts: bruce-lee 20, ludwig-van-beethoven 11, nikola-tesla 15.**

Full per-row rationale for every retained/added row is committed in each
person's candidate JSON (`data-pipeline/candidates/<slug>.json`) and mirrored
as inline comments in `src/data/people/roster2.ts`. None of the retained
rows reuse the old tuple — each was rescored directly from the fresh
evidence, per `NEW_EVIDENCE`. Several retained rows per person share an
underlying evidence source (e.g. Beethoven's sketchbook evidence informs
`creative_originality`/`discipline`/`detail_orientation`/`perfectionism`;
Tesla's mental-simulation quote informs `analytical_rigor`/
`intuitive_synthesis`) — each such row's rationale names the specific,
distinguishable facet it draws from the shared evidence, following the same
discipline already established in Kurosawa's remediation (PR #36), not a new
pattern.

### Field-change counts (mechanically re-verified by diffing old vs. new
tuples with a script, after an initial hand-tally turned out wrong on
first draft -- corrected before this doc was finalized, not asserted)

| person | retained rows | score changed | confidence changed | evidenceType changed | impact changed |
|---|---|---|---|---|---|
| bruce-lee | 19 | 15/19 | 18/19 | 4/19 | 8/19 |
| ludwig-van-beethoven | 11 | 7/11 | 10/11 | 4/11 | 3/11 |
| nikola-tesla | 14 | 13/14 | 12/14 | 4/14 | 3/14 |

Not every retained row's score changed (e.g. a few kept their old score
while confidence/evidenceType/impact moved) -- this is expected and
honestly reported, the same discipline PR #36 applied when Kurosawa's own
`decisiveness` row turned out to have an unchanged score on mechanical
re-verification. `belief_updating`/`opportunity_sensing` (new rows) are not
counted as "changed" above.

## 6. Metadata / tag audit

Checked `tagIds`/`archetypeIds`/`occupationIds`/`fieldIds`/`impactDomains`
against the final audited rows for all three, per the exact Kurosawa
precedent (PR #36's `perfectionist` finding). **No stale trait-claiming tag
found for any of the three** — bruce-lee's `cross_disciplinary`/`founder`,
beethoven's `specialist`/`overcame_adversity`, and tesla's
`independent`/`poor_business_sense` all still map to retained, supported
rows (autonomy_need/proactive_agency; resourcefulness; independent_thinking/
collaboration respectively). No tag added or removed; no new tag invented.

## 7. Evidence-discipline confirmations

- **Health/tragedy exclusion**: Beethoven's Heiligenstadt Testament (despair,
  suicidal ideation over his deafness) was read but not used as row
  evidence, consistent with this project's standing precedent (Kurosawa's
  suicide attempt, Virginia Woolf's file). The already-established
  "deafness-driven compositional method substitution" was kept as evidence
  for `resourcefulness` because it is his constructive behavioral
  adaptation, not the crisis itself.
- **No diagnosis/mental-illness inference**: popular sources frame Tesla's
  counting/food-calculation habits as symptoms of a diagnosed condition.
  None of that framing appears anywhere in this cycle's candidate files,
  production comments, or this document — the underlying documented
  BEHAVIOR (from his own autobiography) is used for `detail_orientation`/
  `perfectionism`, never a label.
- **Disputed claims excluded**: the Chuck-Norris/weight-gain claim about
  Bruce Lee (Polly, disputed by John Little) was not used for any row.
- **No eligibility rescue**: eligibility was computed only after all three
  people's rows, scores, and publication decisions were independently
  frozen (see §8-9). Bruce Lee missed eligibility by a razor-thin margin
  (coverage 0.597 against a 0.600 floor) after locking; no row was
  revisited because of this, exactly per this cycle's own instruction not
  to hunt for replacement traits after seeing an eligibility result.

## 8. Publication decision — before eligibility

For each of the three, independently: sources, ledger, rows, scores,
confidence, evidenceType, impact, and metadata were frozen in
`data-pipeline/candidates/<slug>.json` with status `evidence_approved`
**before** `eligibility_v2` was computed for any of them.

## 9. Eligibility — computed once, after all three were locked

| | bruce-lee | ludwig-van-beethoven | nikola-tesla |
|---|---|---|---|
| scored attributes (before -> after) | 32 -> 20 | 32 -> 11 | 31 -> 15 |
| coverage (after) | 0.597 | 0.326 | 0.454 |
| high-confidence count (after) | 20 | 11 | 15 |
| high-confidence average (after) | 0.608 | 0.614 | 0.593 |
| eligible (before -> after) | true -> **false** | true -> **false** | true -> **false** |
| failing sub-gates | coverage only (misses by 0.003) | breadth, coverage, HC-count | breadth, coverage |

**All three lose match eligibility.** None were rescued; none were
adjusted after this result was seen.

## 10. Downstream consequences (eligible set changed: 126 -> 123)

- **Eligible set diff**: removed `bruce-lee`, `ludwig-van-beethoven`,
  `nikola-tesla`; added none. Mechanically confirmed via
  `matchPoolIntegrityAudit.ts` before/after.
- **Interest-area pools**: science_knowledge 53->52 (tesla:
  engineering+physics), arts_culture 48->46 (beethoven: music; bruce-lee:
  film), leadership_society 44->44 (unchanged), building_discovery 19->19
  (unchanged) — exactly consistent with each person's unchanged `fieldIds`.
- **Dispersion**: regenerated (`pnpm calibrate`, run twice). `DISPERSION_
  VERSION` unchanged (`dispersion_v1`). Source N 126->123, meanSd
  12.017->11.995. Max per-attribute weight delta: **0.0258** on
  `persuasiveness` (0.9616->0.9358) -- larger than PR #36's single-person
  removal (0.0087) since three people leave at once and `persuasiveness` is
  a thinly-scored attribute overall, but not a formula or version change.
- **Calibration**: checked once, not refit. Freshly-proposed anchors differ
  from the committed `MATCH_CALIBRATION_ANCHORS` by at most ~0.0058 raw (at
  p99.9) -- still under this project's own documented <0.008 no-refit
  threshold. `calibration.ts` left unchanged.
- **Matching-health**: `pnpm simulate 10000 quiz` against the new
  123-person eligible set shows no rank/invariant failure and no domination
  issue (#1-frequency max 10.7%, Warren Buffett, unchanged from before this
  cycle). None of the three removed people appear in the "never #1" list
  (they are outside the eligible population entirely, not poor-but-eligible
  performers). No structural issue from their removal.

## 11. Legacy scoring-lock

`legacyScoringLock.generated.ts` regenerated after all three candidate files
were finalized: **34 -> 31** people in the baseline (mechanically confirmed,
matches the expected count). `checkScoringLockIntegrity.ts`: 0 flagged (281
candidate-JSON-backed people checked via schema/consistency validation, 31
legacy-baseline people fingerprint-checked). No non-target person's tuple
touched.

## 12. Historical audit snapshot (PR #35's frozen sample)

None of the three batch-2 targets (`bruce-lee`, `ludwig-van-beethoven`,
`nikola-tesla`) belong to PR #35's frozen `FROZEN_16_ELIGIBLE`/
`FROZEN_8_CONTROLS` sample in `matchPoolIntegrityAuditManual.ts` --
mechanically confirmed. `SUPERSEDED_AUDIT_SLUGS` therefore did **not** need
extending this cycle; that file is untouched. A regression test
(`legacyIntegrityBatch2Remediation.test.ts`) proves this explicitly so a
*future* remediation of one of the 16/8 frozen-sample people cannot silently
skip that step.

## 13. Editorial

Audited EN/KO editorial (`src/core/i18n/editorial.ts`) for all three. Two of
the three (`bruce-lee.interpretation.moment.2`, `ludwig-van-beethoven.
interpretation.turning_point.1`, `nikola-tesla.interpretation.turning_point.1`)
use the `interpretationKey`/attribute-citing convention -- unlike Kurosawa's
profile, which predates it. Checked each citation against the final audited
rows: bruce-lee cites `opportunity_sensing` (retained), beethoven cites
`resourcefulness` (retained, still "high"), tesla cites `proactive_agency`
(retained) -- **all three citations remain valid, no editorial change
needed.** No achievement/moment/life_arc factual claim depends on a removed
row. No stylistic rewriting performed.

## 14. Client index

`peopleIndex.generated.ts` regenerated after the production mirror. Diffed:
only the three targets' data changed (rows/sources/externalIdentity/
directoryVisible/eligibility), nothing else drifted.

## 15. Validation

`tsc --noEmit` clean · `validateCandidates.ts` 0 errors/0 warnings (281
candidate files) · `checkScoringLockIntegrity.ts` 0 flagged (281 JSON-diff-
checked + 31 legacy-baseline-checked) · full `vitest run` clean after fixing
6 stale hardcoded-count assertions in 3 pre-existing test files (
`profilePublicationSeparation.test.ts`, `matching.test.ts` x2,
`matchPoolIntegrityAudit.test.ts` x2) that had not yet accounted for a
person besides Kurosawa becoming directory-visible-but-non-eligible from the
early_hand_authored lineage -- the same class of update PR #36 itself
required, not a new problem introduced here · 29 new table-driven tests in
`legacyIntegrityBatch2Remediation.test.ts` covering all three targets ·
production build clean (474 static pages, unchanged count) · focused
Playwright (`peopleDirectory`, `person.visual`, `compare.visual`) 118/118
passing.

**Manual verification** (production build via `next start`, not `next dev`,
per this project's own documented `next dev` staleness quirk from the
Kurosawa cycle): Nikola Tesla's EN profile renders the correct 15 traits,
honest "not yet included in personality matching" copy, correct sources, and
a correctly-rendered interpretation link; Ludwig van Beethoven's KO profile
renders correctly at mobile width (375px) with the correct Korean name,
era, and field tags; the Compare route for Bruce Lee shows the correct
honest "isn't included in matching yet" copy. No console errors.

## 16. Remaining legacy cohort (31 people, unaudited, not defective)

```
leonardo-da-vinci, marie-curie, richard-feynman, ada-lovelace, steve-jobs,
hayao-miyazaki, yi-sun-sin, frida-kahlo, serena-williams, alan-turing,
mahatma-gandhi, confucius, socrates, warren-buffett, coco-chanel,
rosalind-franklin, jane-goodall, genghis-khan, ibn-khaldun, wangari-maathai,
malala-yousafzai, srinivasa-ramanujan, toni-morrison, benjamin-franklin,
rumi, oprah-winfrey, simone-biles, yayoi-kusama, zheng-he, nelson-mandela,
wolfgang-amadeus-mozart
```

**This is not a claim any of them are defective.** They remain unaudited by
this cycle's methodology, not proven either way -- srinivasa-ramanujan and
toni-morrison ranked 4th/5th by the same risk score (12, one point below the
frozen three) and are reasonable candidates for a future batch 3 if the
strategic recommendation below calls for continuing.

## 17. Strategic stop-rule outcome

Per the stop-rule this cycle was designed to answer: **3 of 3 frozen targets
lost match eligibility**, a stronger signal than Kurosawa's isolated 1-of-1
case. **Recommendation: continue targeted legacy remediation before starting
Roster33.** The risk-triage methodology itself (source count <=1, many
high-confidence/documented rows in the unsupported base set, no Wikidata
QID) appears predictive: all three frozen profiles shared that exact shape,
and it plausibly generalizes to the 4th-10th ranked profiles
(srinivasa-ramanujan, toni-morrison, hayao-miyazaki, richard-feynman,
simone-biles, steve-jobs, genghis-khan), which show the same pattern at
slightly lower magnitude. This recommendation is not executed here --
starting a batch 3 or Roster33 is explicitly out of scope for this PR.

## 18. Explicit confirmations

- Only bruce-lee, ludwig-van-beethoven, and nikola-tesla received new
  behavioral research this cycle.
- No other legacy person's data was read, scored, or modified (their
  tuples were not even mechanically re-read this cycle, since the legacy
  scoring-lock regeneration only needed to remove the three departing
  slugs from the baseline, not touch any remaining person's fingerprint).
- No eligibility rescue for any of the three.
- Roster33 not started.
