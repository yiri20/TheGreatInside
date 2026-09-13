# Legacy integrity remediation batch 4: three-person risk-triaged remediation (2026-09-13)

Authoritative base: `main`@`505574852882d3d79ca951740abdfa86f287a8f2` (PR #38,
the batch-3 remediation plus its auditability correction, merged). Fourth
cycle in the targeted legacy-integrity lane (PR #36: Akira Kurosawa; PR #37:
Bruce Lee, Ludwig van Beethoven, Nikola Tesla; PR #38: Srinivasa Ramanujan,
Toni Morrison, Hayao Miyazaki — all seven lost match eligibility, all
deliberately selected from the highest-risk end of the cohort, not a random
sample — see §17 for why that distinction matters to this cycle's
conclusion). This cycle reuses batch 2/3's exact deterministic risk-triage
methodology, unchanged, against the 28-person legacy cohort remaining after
batches 1-3. **Not** Roster33 — no new-person research was performed.

## 1. Mechanical enumeration of the legacy cohort

`SEED_PEOPLE.filter(p => !hasCandidateFile(p.slug))` at the base commit:
**28 people** (mechanically re-derived fresh via a script, matching the
count PR #38 left behind — not hardcoded).

## 2. Risk-triage methodology — unchanged from batch 2/3

Reused verbatim, not reinvented, from
`docs/checkpoints/legacy-integrity-batch2-three-person-remediation.md` §2:
source scarcity (+3/+1), high-confidence rows in the unsupported base set
(+1 to +4 by tier), "documented"-tier rows in the unsupported base set (+1
to +4 by tier), no external Wikidata QID (+2), ancient/medieval era with
>=15 high-confidence rows (+2), max confidence >=0.85 with <=1 source (+2),
a trait-claiming tag with no/weak corresponding row (+2 per mismatch,
narrowly checked as `perfectionist` -> `perfectionism` only), alphabetical
tie-break. No new signal added, no signal removed, no weight changed. The
"unsupported base set" is the person's rows among the original 31
pre-taxonomy_v1.1 attribute ids (all of which carry zero per-row rationale
for every roster1/2 legacy person, per PR #35's original finding);
taxonomy_v1.1's three additions (`opportunity_sensing`, `resourcefulness`,
`proactive_agency`) are excluded from that count because, when present,
they already carry per-row rationale.

### Full ranking (28) and top-10 detail

```
 1. richard-feynman            score=11   (tie, first alphabetically)
 2. simone-biles                score=11
 3. steve-jobs                  score=11
 4. genghis-khan                score=10
 5. serena-williams              score=10
 6. oprah-winfrey                score=9
 7. rumi                         score=9
 8. wangari-maathai              score=9
 9. yi-sun-sin                   score=9
10. ada-lovelace                 score=8
```

- **richard-feynman** (11): 2 sources; 30 high-confidence rows in the
  unsupported base set (all 30 of his present base rows, the highest
  fraction in this cohort); 11 "documented"-tier claims among them; no
  Wikidata QID; max confidence 0.94.
- **simone-biles** (11): 1 source; 21 high-confidence rows in the
  unsupported base set (of 26 present); 5 "documented"-tier claims; no
  QID; max confidence 0.88 on that single source.
- **steve-jobs** (11): 2 sources; 30 high-confidence base rows (all 30 of
  his present base rows, tied with Feynman for the most of any of the 28);
  16 "documented"-tier claims; no QID.
- All three tie at score 11 — a clean three-way tie occupying the entire
  top tier, no boundary tie-break against a 4th person was needed (unlike
  batch 3's four-way tie for 3rd place). Alphabetical order: feynman,
  biles, jobs.
- 4th-10th: genghis-khan, serena-williams, oprah-winfrey, rumi,
  wangari-maathai, yi-sun-sin, ada-lovelace — the same shape at lower
  magnitude. Not frozen; left unaudited per §16, not claimed defective.

### 2a. Self-caught methodology-implementation bug (transparency note)

The risk-triage script's first draft defined the "unsupported base set" as
31 attribute ids, wrongly including `belief_updating`. Re-checking
`attributes.ts`'s own docstring after the ranking was already computed
found it explicit: **"taxonomy_v1.1 additions (all four...)"** lists
`opportunity_sensing`, `resourcefulness`, `proactive_agency`, **and**
`belief_updating` -- so the true base set is 30 ids, not 31, and
`belief_updating` belongs with the other three v1.1 additions despite
being grouped under the `thinking` facet rather than the newer
`world_sense` one. Steve Jobs is the only one of the three frozen targets
who has a `belief_updating` row, so he was the only one whose `hcBase`
count was inflated by this bug (31 counted, 30 true). Re-ran the full
28-person ranking with the corrected 30-id base set before proceeding
further: **the top-3 ranking is unaffected** -- richard-feynman, simone-
biles, and steve-jobs remain the top three at score 11 each, in the same
order, because both 30 and 31 fall in the same `hcBase>=28` (+4) scoring
tier for Jobs. The 4th-10th ranking was also re-checked and found
unchanged. Caught and corrected before this section was finalized, not
after the frozen three were already deeply researched on the basis of a
possibly-wrong list.

## 3. Frozen three

**richard-feynman, simone-biles, steve-jobs** — the entire top-scoring tier
by the unchanged methodology, printed before any research began (§2's
ranking script output, preserved above). Not substituted, not re-sampled,
not chosen with eligibility outcome in mind. Confirmed independently by
mechanical recomputation, not assumed from the task's own framing of likely
candidates.

## 4. Research budget and sources

Sequential research (max 2 concurrent source lookups), target 4-7
substantive sources per person, bounded effort. Eligibility was not
computed or consulted until all three were fully scored and locked.

**Richard Feynman** (6 total source records; 5 substantive non-Wikipedia):
James Gleick's *Genius* (1992, independent biography, pre-existing);
Feynman's own 1974 Caltech commencement address "Cargo Cult Science";
Nautilus's independent journalism on the Rogers Commission investigation;
Stephen Wolfram's independent, direct-witness account of the Feynman-
Gell-Mann relationship at Caltech; Caltech's own archived record of his
1965 Nobel Prize remarks.

**Simone Biles** (6 total source records; 5 substantive non-Wikipedia):
her own memoir *Courage to Soar* (2016, with Michelle Burford); her own
January 18, 2018 public disclosure of Larry Nassar's abuse; her own
September 15, 2021 testimony before the U.S. Senate Judiciary Committee;
her own 2021 public statements explaining the Tokyo withdrawal; a 2023 NBC
News interview on her comeback. **Disclosed source-independence
limitation**: unlike Feynman's (Gleick) or Jobs's (Isaacson)
independently-authored biographies, Biles's substantive sources here are
predominantly her own extensively public statements rather than a
third-party narrative biography. Multiple news organizations independently
documented that these statements were made and in what context — a real
independent provenance layer — but this is a different evidentiary shape
than the other two targets this cycle, disclosed rather than presented as
equivalent. This is not a claim the underlying behavior is less real; it
is a claim about *how* it is externally corroborated.

**Steve Jobs** (4 total source records; 3 substantive non-Wikipedia):
Walter Isaacson's *Steve Jobs* (2011, authorized independent biography,
including named colleagues Bud Tribble/Andy Hertzfeld/Steve Wozniak's own
direct testimony, pre-existing); Jobs's own 2005 Stanford commencement
address; Jobs's own 1995 "Lost Interview" (Robert X. Cringely / PBS
*Triumph of the Nerds* outtake). Below the 4-7 substantive-source target on
raw count (3), but the two new primary sources plus Isaacson's biography's
multiply-witnessed testimony gave unusually dense, independently-
corroborated behavioral detail — disclosed as a shape difference, not
padded to hit a number.

## 5. Row disposition (mechanically computed by diffing old vs. new tuples
   with a script, the discipline established starting batch 3 after batch
   2's first-draft hand-tally turned out wrong)

| person | original rows | retained (rescored) | added | removed |
|---|---|---|---|---|
| richard-feynman | 31 (30 base + 1 v1.1) | 11 | 0 | 20 |
| simone-biles | 27 (26 base + 1 v1.1) | 11 | 0 | 16 |
| steve-jobs | 33 (30 base + 3 v1.1) | 16 | 0 | 17 |

Removed-row lists:

- **Feynman**: intuitive_synthesis, systems_abstraction, creative_
  originality, experimentation, cross_domain_range, aesthetic_sensitivity,
  discipline, deep_focus, detail_orientation, perfectionism, execution_
  speed, planning_orientation, adaptability, risk_tolerance, ambiguity_
  tolerance, social_assertiveness, leadership_drive, persuasiveness,
  achievement_drive, impact_motivation.
- **Biles**: curiosity, analytical_rigor, independent_thinking, creative_
  originality, experimentation, deep_focus, detail_orientation,
  perfectionism, execution_speed, risk_tolerance, ambiguity_tolerance,
  collaboration, persuasiveness, mastery_orientation, achievement_drive,
  competitiveness.
- **Jobs**: curiosity, analytical_rigor, intuitive_synthesis, systems_
  abstraction, creative_originality, experimentation, cross_domain_range,
  aesthetic_sensitivity, discipline, deep_focus, execution_speed,
  planning_orientation, ambiguity_tolerance, social_assertiveness,
  mastery_orientation, achievement_drive, impact_motivation.

For all three, `creative_originality`/`intuitive_synthesis`/`aesthetic_
sensitivity` (where present) and, for Biles, `mastery_orientation`/
`achievement_drive`/`competitiveness` were among the highest-scored
original rows, reflecting each person's acclaimed reputation or
competitive record — but this cycle's research did not surface a
BEHAVIORAL incident distinct from the acclaim/output/medal-count itself for
any of them. Removed rather than re-justified from acclaim/output alone,
per this project's standing rule — the same recurring pattern named in
every prior cycle in this lane.

No new rows added for any of the three this cycle (0/0/0 — consistent with
every prior cycle: all evidence found fit within already-scored
attributes, rescored from scratch; no genuinely distinct new trait had
first-time qualifying support).

### Field-change counts (mechanically computed by script)

| person | retained | score changed | confidence changed | evidenceType changed | impact changed |
|---|---|---|---|---|---|
| richard-feynman | 11 | 11/11 | 11/11 | 9/11 | 3/11 |
| simone-biles | 11 | 11/11 | 11/11 | 6/11 | 2/11 |
| steve-jobs | 16 | 15/16 | 16/16 | 6/16 | 8/16 |

(Jobs's `belief_updating` row happened to independently re-derive the same
score (78 vs. the original candidate draft) after a mid-cycle correction —
see §5a below — reported honestly rather than assumed uniform.)

### 5a. Self-caught correction during this cycle (transparency note)

Mid-cycle, cross-checking the three targets' rows against this project's
own existing EN/KO editorial (`src/core/i18n/editorial.ts`, per §13) found
that Simone Biles's `interpretation.turning_point.1` text explicitly
describes her `proactive_agency` score as "dual-edged," but the row this
cycle had first drafted used `impact: "advantage"`. Re-examined on the
merits (not merely to preserve the existing editorial): her Tokyo
withdrawal was genuinely publicly contested at the time (the same
editorial's `turning_point.1` text itself notes "significant public
criticism... that she owed her team a title defense"), only more broadly
reassessed in later years — a real dual-edged shape, not a clean
advantage. Corrected to `dual_edged` before this cycle's lock, not after
eligibility was computed. No other row required this kind of correction.

## 6. Metadata / tag audit

Checked `tagIds`/`archetypeIds`/`occupationIds`/`fieldIds`/`impactDomains`
against the final audited rows for all three, per the Kurosawa/PR #36
precedent. **One stale trait-claiming tag found and corrected** — the
first such finding since Kurosawa's `perfectionist` tag (batches 2 and 3
found none): Simone Biles's `competitor` tag had no corresponding row once
`competitiveness` was removed for resting on her medal count/competitive
record rather than a distinct behavioral incident. Removed `competitor`
from her `tagIds`, retaining `advocate` (well-supported by the Nassar-
disclosure/testimony rows). Feynman's `nobel_laureate`/`generalist`/
`communicator` and Jobs's `founder`/`perfectionist`/`product_leader` were
all checked against the same narrow pattern and found still valid —
`perfectionist` remains well-supported by Jobs's retained `perfectionism`
row (88, 0.62). No tag invented as a replacement for any removed row.

## 7. Evidence-discipline confirmations

- **Legend/tradition vs. behavior**: n/a this cycle (no legend/tradition-
  framed claims arose in the three targets' sources).
- **Third-party reputation vs. own behavior**: none of the three targets'
  retained rows rest on a bare reputational assessment; each cites a named,
  dated, concrete action or the subject's own words.
- **Achievement/acclaim excluded**: no retained row for any of the three
  cites a Nobel Prize, Olympic medal count, product-sales figure, or other
  award/output fact directly as evidence. `creative_originality`/
  `intuitive_synthesis`/`aesthetic_sensitivity`/`mastery_orientation`/
  `achievement_drive`/`competitiveness` were removed specifically because
  the only support behind them, on close inspection, was acclaim or
  output.
- **Health/tragedy/private-life discipline**: Feynman's 1988 death was not
  used as row evidence. Jobs's 2003 cancer diagnosis and 2011 death were
  read (via the existing production comment) but not used as row evidence;
  his 1978 paternity dispute regarding his daughter Lisa was also read but
  deliberately **not used at all** — not merely excluded as unfavorable,
  but treated as a private family/paternity matter unrelated to any of the
  34 scored professional/behavioral attributes in this taxonomy, so it
  does not appear in the incident ledger below. Biles's 2018 Doha Worlds
  performance while passing a kidney stone was read but deliberately not
  used: a health-adjacent circumstance, and "competed through pain" would
  sit awkwardly beside her own later, more considered stance that safety
  can rightly come before continuing (the Tokyo withdrawal) — using both
  as equally positive evidence would be an incoherent, cherry-picked
  narrative, so only the later, more clearly self-aware and explained
  decision was used.
- **First living subject in this batch**: Biles is living. No health/
  private-life material beyond what is disclosed above was used; her own
  public statements about therapy are used only as evidence of a
  described, chosen practice/discipline, never as evidence of, or
  commentary on, any diagnosis.
- **No eligibility rescue**: all three failed eligibility_v2 by a wide
  margin (see §9) — no row was revisited after computing eligibility,
  except the §5a correction, which was made *before* eligibility was
  computed.

## 8. Publication decision — before eligibility

For each of the three, independently: sources, ledger, rows, scores,
confidence, evidenceType, impact, and metadata were frozen in
`data-pipeline/candidates/<slug>.json` with status `evidence_approved`
**before** `eligibility_v2` was computed for any of them.

## 9. Eligibility — computed once, after all three were locked

| | richard-feynman | simone-biles | steve-jobs |
|---|---|---|---|
| scored attributes (before -> after) | 31 -> 11 | 27 -> 11 | 33 -> 16 |
| coverage (after) | 0.331 | 0.324 | 0.470 |
| high-confidence count (after) | 11 | 11 | 16 |
| high-confidence average (after) | 0.561 | 0.585 | 0.606 |
| eligible (before -> after) | true -> **false** | true -> **false** | true -> **false** |
| failing sub-gates | breadth, coverage, high-confidence count | breadth, coverage, high-confidence count | breadth, coverage |

**All three lose match eligibility clearly** — Feynman and Biles fail on
three independent sub-gates each (row count well under 18, coverage well
under 0.6, high-confidence count under 12); Jobs retained the most rows of
the three (16) and passes the high-confidence-count/average sub-gates on
their own, but still fails clearly on breadth (16 < 18) and coverage
(0.47 < 0.6) — not a razor-thin miss like batch 2's Bruce Lee, but not as
overwhelming a shortfall as Feynman/Biles either. None were rescued; none
were adjusted after this result was seen.

**Verification note**: the eligibility figures above were independently
re-derived twice -- once against the actual current `SEED_PEOPLE`, and
once by reconstructing each person's pre-remediation tuples from the
committed base commit and re-running `evaluateMatchEligibility` against
them, to confirm the "before" column honestly (not assumed from the task
prompt's own framing). The first reconstruction attempt actually produced
`eligible: false` for all three even at the old, high row counts -- a bug
in the verification script (a missing `status: "published"` field on the
reconstructed stub, which `evaluateMatchEligibility` also checks), caught
and fixed before use, not before it could have produced a wrong report.

## 10. Downstream consequences (eligible set changed: 120 -> 117)

- **Eligible set diff**: removed `richard-feynman`, `simone-biles`,
  `steve-jobs`; added none. Mechanically confirmed via
  `matchPoolIntegrityAudit.ts`'s `buildInventory`/`aggregateCohort` before/
  after (the "before" state reconstructed by re-adding the three targets'
  current inventory rows to the current eligible set, since their
  `fieldIds` did not change).
- **Interest-area pools**: science_knowledge 51->50 (feynman: natural_
  science), arts_culture 44->43 (jobs: design), leadership_society 44->43
  (feynman: education), building_discovery 19->17 (jobs: technology/
  business; biles: sport) — exactly consistent with each person's
  unchanged `fieldIds`. Feynman's two fieldIds (natural_science,
  education) map to two different pools, so he alone accounts for two of
  the four pool decrements; Jobs's three fieldIds (technology, business,
  design) map to two pools (building_discovery once, despite two
  qualifying fields; arts_culture once via design).
- **Dispersion**: regenerated (`pnpm calibrate`, run twice). `DISPERSION_
  VERSION` unchanged (`dispersion_v1`). Source N 120->117.
- **Calibration**: checked once, not assumed "no refit." Freshly-proposed
  anchors differ from the committed `MATCH_CALIBRATION_ANCHORS` by at most
  **0.0069 raw**, at the **p0.1** anchor -- a new location; batches 2 and 3
  both showed their maximum drift at p99.9 (~0.0058, ~0.0067). Still under
  this project's own documented `<0.008` no-refit threshold, so
  `calibration.ts` is **left unchanged this cycle** -- but this is the
  first cycle where the maximum moved to a different anchor entirely,
  worth flagging as a second, independent trend signal (not just "still
  creeping toward the tail," but "the shape of the drift itself is
  shifting"). See §19 for the full anchor-by-anchor comparison.
- **Matching-health**: `pnpm simulate 10000 quiz` against the new
  117-person eligible set shows no rank/invariant failure and no
  domination issue (#1-frequency max 11.1%, Warren Buffett, up slightly
  from batch 3's 10.8% but not a structural concern). No error/warning
  markers in the simulation output. None of the three removed people
  appear in any "never #1" list (they are outside the eligible population
  entirely).

## 11. Legacy scoring-lock

`legacyScoringLock.generated.ts` regenerated after all three candidate
files were finalized: **28 -> 25** people in the baseline (mechanically
confirmed via the generator's own reported count, matches the expected
math). Pre-commit `checkScoringLockIntegrity.ts`: 284 candidate-JSON-
backed people checked (the three new files not yet committed at that
point, so correctly not yet counted — see §16 for the required post-commit
re-run), 25 legacy-baseline people fingerprint-checked, 0 flagged. No
non-target person's tuple touched.

## 12. Historical audit snapshot (PR #35's frozen sample)

None of the three batch-4 targets (`richard-feynman`, `simone-biles`,
`steve-jobs`) belong to PR #35's frozen `FROZEN_16_ELIGIBLE`/`FROZEN_8_
CONTROLS` sample in `matchPoolIntegrityAuditManual.ts` -- mechanically
confirmed (`grep` for all three slugs in that file returns no match).
`SUPERSEDED_AUDIT_SLUGS` therefore did **not** need extending this cycle;
that file is untouched. A regression test
(`legacyIntegrityBatch4Remediation.test.ts`) proves this explicitly, the
same discipline batches 2 and 3 established.

## 13. Editorial

Audited EN/KO editorial (`src/core/i18n/editorial.ts`) for all three.
Feynman's `interpretation.turning_point.1` cites `proactive_agency`
(retained, still high) -- valid, no change. Jobs's `interpretation.
moment.1` cites `opportunity_sensing` (retained, still high) and
`interpretation.turning_point.2` cites `proactive_agency` (retained; its
rationale was in fact sharpened this cycle to describe exactly the
NeXT-acquisition/Amelio-ouster maneuvering the editorial text itself
describes) -- both valid, no change. Biles's `interpretation.turning_
point.1` cites a "dual-edged proactive_agency score" -- this is the one
place this cycle's audit found a real mismatch (see §5a); corrected by
fixing the row, not the editorial, since the editorial's own contested-
reception framing was the more accurate read of the evidence. No other
achievement/moment/life_arc factual claim depends on a removed row (all
three profiles' `achievement.*`/`life_arc.*` entries describe biographical
facts, not trait-linked claims). No stylistic rewriting performed beyond
the one row-level correction in §5a.

## 14. Client index

`peopleIndex.generated.ts` regenerated after the production mirror (225
entries, unchanged count). Only the three targets' data changed (rows/
sources/externalIdentity/directoryVisible/eligibility); nothing else
drifted.

## 15. Validation

`tsc --noEmit` clean · `validateCandidates.ts` 0 errors/0 warnings (287
candidate files: 284 + this cycle's 3) · `checkScoringLockIntegrity.ts`
(pre-commit) 0 flagged (284 JSON-diff-checked + 25 legacy-baseline-
checked -- see §16 for the required post-commit re-run) · full `vitest
run` clean after fixing 8 stale hardcoded-count/exception-list assertions
across 5 test files (`matching.test.ts`, `profilePublicationSeparation.
test.ts`, `matchPoolIntegrityAudit.test.ts`, and -- new this cycle, the
same meta-problem batch 3 found in batch 2's test -- **both**
`legacyIntegrityBatch2Remediation.test.ts` **and**
`legacyIntegrityBatch3Remediation.test.ts`, each of which asserted
`richard-feynman`/no-hardcoded-baseline-total facts made stale by this
cycle's further remediation; corrected the same way each time: fix the
substantive invariant, stop hardcoding a total that legitimately keeps
shrinking) · 30 new table-driven tests in
`legacyIntegrityBatch4Remediation.test.ts` (one more than batch 3's 29 --
an added metadata-correction test for the `competitor` tag finding) · 909/
909 tests passing total (61 files) · production build clean (474 static
pages, unchanged count) · focused Playwright (`peopleDirectory`, `person.
visual`, `compare.visual`) 118/118 passing.

**Manual verification** (production build via `next start`, not `next
dev`, per this project's documented `next dev` staleness quirk): Richard
Feynman's EN profile renders the correct 11 traits, honest "Not yet
included in personality matching" copy, correct 6 sources, and a
correctly-rendered Turning Point/interpretation link to `proactive_
agency`; Steve Jobs's KO profile renders correctly at mobile width
(375px), including correct trait cards (설득력/Persuasiveness 92 강점,
결단력/Decisiveness 88 양날의 특성, etc.) and correct sources; the Compare
route for Simone Biles shows the correct honest "isn't included in
matching yet" copy. No console errors on any of the three.

## 16. Post-commit scoring-lock re-run (required this cycle)

Because `checkScoringLockIntegrity.ts` determines "previously committed"
status via `git show HEAD:<candidate-path>`, the three new candidate files
only count once the implementation commit exists. §15's pre-commit figure
(284) was therefore not the number to report as final. Re-run against the
actual committed HEAD (`a338cc3774c15accca564fadb21c39fe494beabc`), the
checker's exact literal output is:

```
Checked 287 previously-committed candidate file(s) against HEAD. 0 flagged.
Legacy scoring lock: 25 pre-pipeline production people covered, 0 flagged.
```

287 = the pre-commit 284 + this cycle's 3 new candidate files, now
themselves committed. 25 matches the legacy-baseline figure in §11 and
§15 exactly (same regeneration, no drift). Applied via a small, docs-only
follow-up commit to this file, per this cycle's own task instructions --
no behavioral work reopened.

## 17. Remaining legacy cohort (25 people, unaudited, not defective)

```
leonardo-da-vinci, marie-curie, ada-lovelace, yi-sun-sin, frida-kahlo,
serena-williams, alan-turing, mahatma-gandhi, confucius, socrates,
warren-buffett, coco-chanel, rosalind-franklin, jane-goodall, genghis-khan,
ibn-khaldun, wangari-maathai, malala-yousafzai, benjamin-franklin, rumi,
oprah-winfrey, yayoi-kusama, zheng-he, nelson-mandela,
wolfgang-amadeus-mozart
```

**This is not a claim any of them are defective.** They remain unaudited by
this cycle's methodology, not proven either way -- genghis-khan and
serena-williams (risk score 10, the next tier down) are the most
reasonable candidates for a future batch 5 if a strategic decision is made
to continue.

## 18. Strategic result (corrected wording from the start this cycle)

**3 of 3 frozen targets lost match eligibility.** Feynman and Biles failed
clearly (well short on breadth, coverage, and high-confidence count); Jobs
failed on breadth and coverage but came closer than the other two, retaining
16 of 33 original rows -- honestly reported as the least clear-cut of the
ten remediations in this lane so far, not rounded up to "clearly" to keep
a clean narrative.

Combined with Kurosawa (1/1), batch 2 (3/3), and batch 3 (3/3), **10 of 10
deeply-remediated HIGH-RISK legacy profiles across four cycles have now
lost match eligibility.**

**What this does and does not establish** (the wording PR #38's own
correction pass fixed retroactively; applied from the start this time):
these ten profiles were never a random or representative sample of the
legacy cohort. They were deliberately selected from the highest-risk end
of it by the risk-triage formula, four cycles running. The valid
conclusion is:

- **strong, now four-cycles-deep evidence the triage method is useful for
  prioritizing which legacy profiles deserve review first** -- every
  frozen target across all four cycles shared the shape the methodology
  predicts (very few sources, many high-confidence/documented rows resting
  on an unsupported base, no Wikidata QID) and every one lost a majority
  of its original row count on fresh audit;
- it **strengthens the case for continuing targeted remediation** before
  starting Roster33, if that is a priority worth the research budget;
- it does **not** establish a 100% failure rate among remaining legacy
  people -- only among the specific high-risk subset audited so far (10 of
  the original ~34-person legacy cohort);
- it does **not** estimate the method's predictive accuracy, sensitivity,
  or specificity -- that would require auditing a control sample the
  method scored as low-risk, which no cycle in this lane has done;
- it does **not** prove the remaining 25 profiles in §17 are defective --
  they remain unaudited, not proven either way.

**Recommendation: continuing targeted legacy remediation remains
reasonable, but the marginal case weakens slightly each cycle** -- the
highest-risk tier keeps clearing at roughly the same rate, but Jobs's
closer-than-usual result (16 rows, not the 10-13 typical of prior targets)
is a data point that the very highest-risk profiles may be getting audited
first for a reason, and the next tier down (genghis-khan, serena-williams,
score 10) could plausibly retain more rows than this cycle's three did.
This recommendation is not executed here; starting a batch 5 or Roster33
is explicitly out of scope for this PR.

## 19. Calibration anchor-by-anchor comparison (elevated emphasis this cycle)

| percentile | committed | proposed | abs delta |
|---|---|---|---|
| p0.1 | 0.3667 | 0.3736 | **0.0069** |
| p1 | 0.3884 | 0.3927 | 0.0043 |
| p5 | 0.4089 | 0.4118 | 0.0029 |
| p10 | 0.4206 | 0.4229 | 0.0023 |
| p25 | 0.4421 | 0.4438 | 0.0017 |
| p50 | 0.4694 | 0.4702 | 0.0008 |
| p75 | 0.5001 | 0.4995 | 0.0006 |
| p90 | 0.5298 | 0.5276 | 0.0022 |
| p95 | 0.5483 | 0.5450 | 0.0033 |
| p99 | 0.5840 | 0.5789 | 0.0051 |
| p99.9 | 0.6269 | 0.6202 | 0.0067 |

Max drift 0.0069 (p0.1) is within the documented `<0.008` no-refit
tolerance -- measured honestly this cycle, not assumed. `calibration.ts`
left unmodified. Trend across all four cycles: Kurosawa negligible ->
batch 2 ~0.0058 (max at p99.9) -> batch 3 ~0.0067 (max at p99.9) -> batch 4
0.0069 (max at **p0.1**, a new location). A future cycle that shrinks the
eligible pool further could plausibly cross the threshold from either end
of the distribution now, not only the tail.

## 20. Explicit confirmations

- Only richard-feynman, simone-biles, and steve-jobs received new
  behavioral research, manual evidence review, rescoring, or data
  modification this cycle.
- The remaining legacy cohort (25 people after this cycle, plus the 10
  already remediated across prior cycles) was mechanically read where
  necessary -- once for the risk-triage inventory, once when
  `generateLegacyScoringLock.ts` regenerated the baseline -- but never
  researched, manually reviewed, or rescored, and no production data
  outside the three targets was modified.
- No eligibility rescue for any of the three.
- Roster33 not started. Batch 5 not started.
