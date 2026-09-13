# Legacy integrity remediation batch 3: three-person risk-triaged remediation (2026-09-13)

Authoritative base: `main`@`e6d524d22ff7a5b5b915ab778b8bd80e96148dae` (PR #37,
the batch-2 remediation, merged). Third cycle in the targeted legacy-integrity
lane (PR #36 remediated Akira Kurosawa; PR #37 remediated Bruce Lee, Ludwig
van Beethoven, and Nikola Tesla — all four lost match eligibility). This
cycle reuses batch 2's exact deterministic risk-triage methodology,
unchanged, against the 31-person legacy cohort remaining after batches 1-2,
to answer whether the pattern continues. **Not** Roster33 — no new-person
research was performed.

## 1. Mechanical enumeration of the legacy cohort

`SEED_PEOPLE.filter(p => !hasCandidateFile(p.slug))` at the base commit: **31
people** (mechanically re-derived fresh, matching the count PR #37 left
behind — not hardcoded).

## 2. Risk-triage methodology — unchanged from batch 2

Reused verbatim, not reinvented, from
`docs/checkpoints/legacy-integrity-batch2-three-person-remediation.md` §2:
source scarcity (+3/+1), high-confidence rows in the unsupported base set
(+1 to +4 by tier), "documented"-tier rows in the unsupported base set (+1
to +4 by tier), no external Wikidata QID (+2), ancient/medieval era with
>=15 high-confidence rows (+2), max confidence >=0.85 with <=1 source (+2),
a trait-claiming tag with no/weak corresponding row (+2 per mismatch,
narrowly checked as `perfectionist` -> `perfectionism` only), alphabetical
tie-break. No new signal added, no signal removed, no weight changed.

### Full ranking (31) and top-10 detail

```
 1. srinivasa-ramanujan      score=12
 2. toni-morrison            score=12
 3. hayao-miyazaki           score=11   (tie, first alphabetically)
 4. richard-feynman          score=11
 5. simone-biles             score=11
 6. steve-jobs               score=11
 7. genghis-khan             score=10
 8. serena-williams          score=10
 9. oprah-winfrey            score=9
10. wangari-maathai          score=9
```

- **srinivasa-ramanujan** (12): 1 source; 16 high-confidence rows in the
  unsupported base (of 30); 6 "documented"-tier claims among them; no
  Wikidata QID; max confidence 0.88 on that single source.
- **toni-morrison** (12): 1 source; 24 high-confidence base rows; 3
  "documented"-tier claims; no QID; max confidence 0.85 on that single
  source.
- **hayao-miyazaki** (11): 2 sources; 29 high-confidence base rows (the
  most of any of the 31); 11 "documented"-tier claims; no QID. Beat
  richard-feynman/simone-biles/steve-jobs (also 11) only by the
  alphabetical tie-break.
- 4th-10th: same shape at lower magnitude, largely the same set the batch-2
  checkpoint already flagged as reasonable future candidates
  (richard-feynman, simone-biles, steve-jobs, genghis-khan) plus two new
  entrants at this rank after batch 2's removals (serena-williams,
  oprah-winfrey, wangari-maathai). Not frozen; left unaudited per §16,
  not claimed defective.

## 3. Frozen three

**srinivasa-ramanujan, toni-morrison, hayao-miyazaki** — the top 3 by the
unchanged methodology, printed before any research began. Not substituted,
not re-sampled, not chosen with eligibility outcome in mind. Miyazaki is
the first LIVING subject remediated in this lane.

## 4. Research budget and sources

Sequential research (max 2 concurrent source lookups), target 4-7
substantive sources per person, bounded effort (~60-90 minutes equivalent
per person). Eligibility was not computed or consulted until all three were
fully scored and locked.

**Srinivasa Ramanujan** (5 total source records; 4 substantive non-
Wikipedia sources): Robert Kanigel's *The Man Who Knew Infinity* (1991,
independent biography); Ramanujan's own 1913 letters to G.H. Hardy;
Stephen Wolfram's "Who Was Ramanujan?" (2016, quoting the letters
directly); G.H. Hardy's and J.E. Littlewood's own recorded actions
(Trinity fellowship advocacy).

**Toni Morrison** (3 total source records; 2 substantive non-Wikipedia
sources): her own 1993 Paris Review interview ("The Art of Fiction No.
134"); Dana A. Williams's *Toni at Random* (independent, Random-House-
archive-based account of her editorial career, quoting her own letters).

**Hayao Miyazaki** (5 total source records; 4 substantive non-Wikipedia
sources): his own *Starting Point: 1979-1996* (pre-existing); the
decade-long NHK documentary *10 Years with Hayao Miyazaki* (2019); Margaret
Talbot's New Yorker profile (independent journalism, the Tamura animator
incident); multiply-corroborated coverage of the Goro Miyazaki/Tales from
Earthsea conflict.

## 5. Row disposition (mechanically computed by diffing old vs. new tuples
   with a script from the start this cycle, after batch 2's first-draft
   hand-tally turned out wrong — not re-risking that mistake here)

| person | original rows | retained (rescored) | added | removed |
|---|---|---|---|---|
| srinivasa-ramanujan | 32 (30 base + 2 v1.1) | 13 | 0 | 19 |
| toni-morrison | 31 (30 base + 1 v1.1) | 12 | 0 | 19 |
| hayao-miyazaki | 31 (30 base + 1 v1.1) | 12 | 0 | 19 |

Removed-row lists (all confirmed to exactly match each person's ledger):

- **Ramanujan**: analytical_rigor, systems_abstraction, creative_originality,
  experimentation, cross_domain_range, aesthetic_sensitivity, discipline,
  detail_orientation, perfectionism, execution_speed, adaptability,
  risk_tolerance, ambiguity_tolerance, social_assertiveness, leadership_drive,
  persuasiveness, achievement_drive, competitiveness, impact_motivation.
- **Morrison**: curiosity, intuitive_synthesis, systems_abstraction,
  independent_thinking, creative_originality, experimentation,
  cross_domain_range, aesthetic_sensitivity, perfectionism, execution_speed,
  planning_orientation, adaptability, risk_tolerance, ambiguity_tolerance,
  social_assertiveness, leadership_drive, mastery_orientation,
  achievement_drive, competitiveness.
- **Miyazaki**: curiosity, analytical_rigor, intuitive_synthesis,
  systems_abstraction, independent_thinking, creative_originality,
  experimentation, cross_domain_range, aesthetic_sensitivity, execution_speed,
  planning_orientation, adaptability, risk_tolerance, ambiguity_tolerance,
  social_assertiveness, persuasiveness, achievement_drive, competitiveness,
  impact_motivation.

For all three, `creative_originality`/`intuitive_synthesis`/
`aesthetic_sensitivity`/`independent_thinking` (where originally present)
were among the highest-scored original rows, reflecting each person's
acclaimed reputation (mathematics, literature, film respectively) — but
this cycle's research did not surface a BEHAVIORAL incident distinct from
the acclaimed work/output itself for any of them. Removed rather than
re-justified from acclaim/output alone, per this project's standing rule.
This is a recurring pattern worth naming explicitly: fame-adjacent traits
are consistently the hardest to support with real behavioral incidents,
independent of which person is being audited.

No new rows added for any of the three this cycle (all evidence found
fit within already-scored attributes, rescored from scratch; no genuinely
distinct new trait had first-time qualifying support).

### Field-change counts (mechanically computed by script)

| person | retained | score changed | confidence changed | evidenceType changed | impact changed |
|---|---|---|---|---|---|
| srinivasa-ramanujan | 13 | 12/13 | 13/13 | 6/13 | 5/13 |
| toni-morrison | 12 | 9/12 | 11/12 | 3/12 | 5/12 |
| hayao-miyazaki | 12 | 10/12 | 12/12 | 7/12 | 2/12 |

Not every retained row's score changed (e.g. Ramanujan's `curiosity` row
happened to independently re-derive the same score with a different
confidence) — reported honestly rather than assumed uniform, the same
discipline established across every prior cycle in this lane.

## 6. Metadata / tag audit

Checked `tagIds`/`archetypeIds`/`occupationIds`/`fieldIds`/`impactDomains`
against the final audited rows for all three, per the Kurosawa/PR #36
precedent. **No stale trait-claiming tag found for any of the three** —
Ramanujan's `self_taught`/`specialist`/`intuitive`, Morrison's
`nobel_laureate`/`independent`, and Miyazaki's `perfectionist`/
`independent`/`craft_focused` all still map to retained, supported rows
(resourcefulness/autonomy_need; autonomy_need; perfectionism/autonomy_need
respectively). No tag added, removed, or invented.

## 7. Evidence-discipline confirmations

- **Legend/tradition separated from behavior**: the "Goddess Namagiri"
  dream-revelation framing found in some Ramanujan sources was noted as
  legend/tradition, not used as row evidence.
- **Third-party reputation separated from own behavior**: Hardy's informal
  "rated Ramanujan 100 on a scale to 100" assessment was read but not used
  (a collaborator's assessment of him, not his own behavior).
- **Bereavement excluded**: Toni Morrison's son Slade's 2010 death, and her
  documented response to it, were read but not used as evidence for any
  row, consistent with this project's standing precedent against inferring
  personality from tragedy/bereavement (same discipline as Beethoven's
  Heiligenstadt Testament and Kurosawa's suicide attempt).
- **Achievement/acclaim excluded**: no row for any of the three cites a
  Nobel Prize, Academy Award, or other award/critical-reception fact
  directly as evidence.
- **First living subject**: Miyazaki is the first person remediated in
  this lane who is still alive. No death/health-crisis material applies to
  him; the Goro/Tales from Earthsea material used is a real professional-
  and-personal conflict with concrete actions (silence, walking out of a
  screening, a later documented apology), not a health/tragedy/diagnosis
  matter, so it was used -- but only for the specific actions and quotes,
  never as a judgment on the parenting relationship itself.
- **No eligibility rescue**: all three failed eligibility_v2 by a clear
  margin (see §9) -- no row was revisited after computing eligibility.

## 8. Publication decision — before eligibility

For each of the three, independently: sources, ledger, rows, scores,
confidence, evidenceType, impact, and metadata were frozen in
`data-pipeline/candidates/<slug>.json` with status `evidence_approved`
**before** `eligibility_v2` was computed for any of them.

## 9. Eligibility — computed once, after all three were locked

| | srinivasa-ramanujan | toni-morrison | hayao-miyazaki |
|---|---|---|---|
| scored attributes (before -> after) | 32 -> 13 | 31 -> 12 | 31 -> 12 |
| coverage (after) | 0.388 | 0.352 | 0.358 |
| high-confidence count (after) | 13 | 12 | 12 |
| high-confidence average (after) | 0.579 | 0.568 | 0.581 |
| eligible (before -> after) | true -> **false** | true -> **false** | true -> **false** |
| failing sub-gates | breadth, coverage | breadth, coverage | breadth, coverage |

**All three lose match eligibility, clearly (not close calls like batch
2's Bruce Lee)** — every one fails on row count (well under 18) and
coverage (well under 0.6). None were rescued; none were adjusted after
this result was seen.

## 10. Downstream consequences (eligible set changed: 123 -> 120)

- **Eligible set diff**: removed `srinivasa-ramanujan`, `toni-morrison`,
  `hayao-miyazaki`; added none. Mechanically confirmed via
  `matchPoolIntegrityAudit.ts` before/after.
- **Interest-area pools**: science_knowledge 52->51 (ramanujan:
  mathematics), arts_culture 46->44 (morrison: literature; miyazaki:
  film+art, counted once), leadership_society 44->44 (unchanged),
  building_discovery 19->19 (unchanged) — exactly consistent with each
  person's unchanged `fieldIds`.
- **Dispersion**: regenerated (`pnpm calibrate`, run twice). `DISPERSION_
  VERSION` unchanged (`dispersion_v1`). Source N 123->120, meanSd
  11.995->11.869. Max per-attribute weight delta: **0.0254** on
  `persuasiveness` (0.9358->0.9104) -- the same attribute that showed the
  largest delta in batch 2 (0.0258), consistent in magnitude, not a
  formula or version change.
- **Calibration**: checked once, not refit. Freshly-proposed anchors
  differ from the committed `MATCH_CALIBRATION_ANCHORS` by at most
  **~0.0067 raw** (at p99.9) -- still under this project's own documented
  <0.008 no-refit threshold, but the closest of the three cycles so far
  (Kurosawa: negligible; batch 2: ~0.0058; batch 3: ~0.0067). Worth
  flagging as a trend: each cycle that shrinks the eligible pool further
  nudges the empirical distribution, and a future cycle could plausibly
  cross the threshold even without any single dramatic change.
  `calibration.ts` left unchanged this cycle.
- **Matching-health**: `pnpm simulate 10000 quiz` against the new
  120-person eligible set shows no rank/invariant failure and no
  domination issue (#1-frequency max 10.8%, Warren Buffett, essentially
  unchanged from before this cycle). None of the three removed people
  appear in the "never #1" list (they are outside the eligible population
  entirely). No structural issue from their removal.

## 11. Legacy scoring-lock

`legacyScoringLock.generated.ts` regenerated after all three candidate
files were finalized: **31 -> 28** people in the baseline (mechanically
confirmed, matches the expected count). `checkScoringLockIntegrity.ts`: 0
flagged (281 candidate-JSON-backed people checked; 28 legacy-baseline
people fingerprint-checked). No non-target person's tuple touched.

## 12. Historical audit snapshot (PR #35's frozen sample)

None of the three batch-3 targets (`srinivasa-ramanujan`, `toni-morrison`,
`hayao-miyazaki`) belong to PR #35's frozen `FROZEN_16_ELIGIBLE`/
`FROZEN_8_CONTROLS` sample in `matchPoolIntegrityAuditManual.ts` --
mechanically confirmed (`grep` for all three slugs in that file returns no
match). `SUPERSEDED_AUDIT_SLUGS` therefore did **not** need extending this
cycle; that file is untouched. A regression test
(`legacyIntegrityBatch3Remediation.test.ts`) proves this explicitly, the
same discipline batch 2 established.

## 13. Editorial

Audited EN/KO editorial (`src/core/i18n/editorial.ts`) for all three.
Ramanujan's `interpretation.moment.1` and Morrison's
`interpretation.moment.2` both cite `proactive_agency`, which both
profiles retain -- **both citations remain valid, no editorial change
needed.** Miyazaki's profile has no `interpretation.*` key at all. No
achievement/moment/life_arc factual claim depends on a removed row (e.g.
Morrison's `moment.3`, about her son Slade's death, was already
un-linked to any trait row in the existing editorial and remains so). No
stylistic rewriting performed.

## 14. Client index

`peopleIndex.generated.ts` regenerated after the production mirror. Only
the three targets' data changed (rows/sources/externalIdentity/
directoryVisible/eligibility); nothing else drifted.

## 15. Validation

`tsc --noEmit` clean · `validateCandidates.ts` 0 errors/0 warnings (284
candidate files) · `checkScoringLockIntegrity.ts` 0 flagged (281 JSON-diff-
checked + 28 legacy-baseline-checked) · full `vitest run` clean after
fixing 8 stale hardcoded-count/exception-list assertions across 4 test
files (`matching.test.ts` x2, `profilePublicationSeparation.test.ts` x2,
`matchPoolIntegrityAudit.test.ts` x2, and — new this cycle —
**batch 2's own** `legacyIntegrityBatch2Remediation.test.ts` x2, whose
hardcoded "31" legacy-baseline count was itself made stale by this cycle's
further remediation; corrected to check the substantive invariant
(batch 2's three targets permanently absent from the baseline; no
orphans) without hardcoding a total that legitimately keeps shrinking
across cycles) -- the same class of update every prior cycle in this lane
has required, not a new problem · 29 new table-driven tests in
`legacyIntegrityBatch3Remediation.test.ts` covering all three targets ·
production build clean (474 static pages, unchanged count) · focused
Playwright (`peopleDirectory`, `person.visual`, `compare.visual`) 118/118
passing.

**Manual verification** (production build via `next start`, not `next
dev`, per this project's documented `next dev` staleness quirk):
Srinivasa Ramanujan's EN profile renders the correct 13 traits, honest
"not yet included in personality matching" copy, correct sources, and a
correctly-rendered interpretation link; Hayao Miyazaki's KO profile
renders correctly at mobile width (375px), including the correct "b.
1941" living-person date format (no death year); the Compare route for
Toni Morrison shows the correct honest "isn't included in matching yet"
copy. No console errors.

## 16. Remaining legacy cohort (28 people, unaudited, not defective)

```
leonardo-da-vinci, marie-curie, richard-feynman, ada-lovelace, steve-jobs,
yi-sun-sin, frida-kahlo, serena-williams, alan-turing, mahatma-gandhi,
confucius, socrates, warren-buffett, coco-chanel, rosalind-franklin,
jane-goodall, genghis-khan, ibn-khaldun, wangari-maathai,
malala-yousafzai, benjamin-franklin, rumi, oprah-winfrey, simone-biles,
yayoi-kusama, zheng-he, nelson-mandela, wolfgang-amadeus-mozart
```

**This is not a claim any of them are defective.** They remain unaudited by
this cycle's methodology, not proven either way -- richard-feynman,
simone-biles, and steve-jobs (all risk score 11, the same tier as this
cycle's Miyazaki) are the most reasonable candidates for a future batch 4
if the strategic recommendation below calls for continuing.

## 17. Strategic result

Per the diagnostic question this lane keeps asking: **3 of 3 frozen
targets lost match eligibility, clearly** (not narrow misses). Combined
with Kurosawa (1/1) and batch 2 (3/3), **7 of 7 deeply-remediated legacy
profiles across three cycles have now lost match eligibility** under
fresh evidence standards. The unchanged risk-triage methodology continued
to correctly identify genuine integrity problems: every frozen target
this cycle shared the same shape the methodology predicts (very few
sources, many high-confidence/documented rows resting on an unsupported
base, no Wikidata QID) and every one collapsed to roughly a third of its
original row count on fresh audit. **Recommendation: continue targeted
legacy remediation before starting Roster33** -- the signal has only
strengthened, not weakened, across three independent cycles. This
recommendation is not executed here; starting a batch 4 or Roster33 is
explicitly out of scope for this PR.

## 18. Explicit confirmations

- Only srinivasa-ramanujan, toni-morrison, and hayao-miyazaki received new
  behavioral research, manual evidence review, rescoring, or data
  modification this cycle.
- The remaining legacy cohort (28 people after this cycle, plus the 7
  already remediated in prior cycles) was mechanically read where
  necessary -- once for the risk-triage inventory, once when
  `generateLegacyScoringLock.ts` regenerated the baseline -- but never
  researched, manually reviewed, or rescored, and no production data
  outside the three targets was modified.
- No eligibility rescue for any of the three.
- Roster33 not started.
