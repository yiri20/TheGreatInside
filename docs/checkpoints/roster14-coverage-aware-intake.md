# Roster-14 coverage-aware intake (2026-09)

Applies the roster-12/13 coverage-bottleneck postmortem's finding directly:
18-19 scored attributes cannot mathematically reach `eligibility_v2`'s 0.6
weighted-coverage floor regardless of evidence quality; coverage is
effectively guaranteed from 22 attributes onward. This cycle's preflight
raised the pre-freeze target to >=21-22-attribute-capable evidence, froze a
smaller, stronger batch, and scored every frozen candidate to completion
before running eligibility once. Result: **11 of 12 crossed
`eligibility_v2` honestly on first score** — a sharp reversal from
roster-12/13's combined 2 of 33, consistent with the postmortem's own
mathematical prediction, not a change in evidence or confidence standards.

## 1. Discovery pool (33 candidates)

Mechanically excluded: all 97 live roster people, all 215 previously-
researched candidate JSON files (spanning every prior intake batch and the
roster-expansion-125 program), Miriam Makeba, Marcus Aurelius, and Che
Guevara. Every Wikidata QID below was verified live against the real entity
before freezing.

| Slug | Name | QID | Era | Region |
|---|---|---|---|---|
| abraham-lincoln | Abraham Lincoln | Q91 | 19th c. | North America |
| theodore-roosevelt | Theodore Roosevelt | Q33866 | 19th-20th c. | North America |
| alexander-hamilton | Alexander Hamilton | Q178903 | 18th c. | North America |
| john-adams* | John Adams | Q11806 | 18th c. | North America |
| abigail-adams* | Abigail Adams | Q206191 | 18th c. | North America |
| elizabeth-cady-stanton* | Elizabeth Cady Stanton | Q465335 | 19th c. | North America |
| harriet-beecher-stowe* | Harriet Beecher Stowe | Q102513 | 19th c. | North America |
| mark-twain | Mark Twain | Q7245 | 19th-20th c. | North America |
| ernest-hemingway | Ernest Hemingway | Q23434 | 20th c. | North America |
| f-scott-fitzgerald* | F. Scott Fitzgerald | Q93354 | 20th c. | North America |
| zelda-fitzgerald* | Zelda Fitzgerald | Q187324 | 20th c. | North America |
| george-orwell* | George Orwell | Q3335 | 20th c. | Western Europe |
| bertrand-russell* | Bertrand Russell | Q33760 | 19th-20th c. | Western Europe |
| charles-dickens* | Charles Dickens | Q5686 | 19th c. | Western Europe |
| elizabeth-i | Elizabeth I of England | Q7207 | 16th c. | Western Europe |
| queen-victoria | Queen Victoria | Q9439 | 19th c. | Western Europe |
| otto-von-bismarck | Otto von Bismarck | Q8442 | 19th c. | Western Europe |
| giuseppe-garibaldi* | Giuseppe Garibaldi | Q539 | 19th c. | Southern Europe |
| leo-tolstoy | Leo Tolstoy | Q7243 | 19th-20th c. | Central Europe |
| sigmund-freud | Sigmund Freud | Q9215 | 19th-20th c. | Western Europe |
| carl-jung* | Carl Jung | Q41532 | 19th-20th c. | Western Europe |
| pablo-picasso | Pablo Picasso | Q5593 | 19th-20th c. | Southern Europe |
| charlie-chaplin* | Charlie Chaplin | Q882 | 19th-20th c. | Western Europe |
| harry-houdini* | Harry Houdini | Q131545 | 19th-20th c. | North America |
| eva-peron* | Eva Perón | Q40933 | 20th c. | Latin America |
| t-e-lawrence* | T. E. Lawrence | Q170596 | 19th-20th c. | Western Europe |
| gertrude-bell | Gertrude Bell | Q231360 | 19th-20th c. | Western Europe |
| qiu-jin* | Qiu Jin | Q465324 | 19th-20th c. | East Asia |
| edith-piaf* | Édith Piaf | Q1631 | 20th c. | Western Europe |
| duke-ellington* | Duke Ellington | Q4030 | 20th c. | North America |
| john-d-rockefeller* | John D. Rockefeller | Q160278 | 19th-20th c. | North America |

`*` = discovered and preflighted but not frozen this cycle (see §2/§3).

## 2. Preflight classifications

23 of 33 discovery candidates were assessed `STRONG_22_CAPABLE` — concrete,
multi-domain, multi-life-stage evidence plausibly supporting >=22 distinct
attributes with no structural provenance defect. This is a genuinely higher
STRONG rate than roster-12/13's discovery pools, consistent with
deliberately prioritizing post-1750 figures with rich personal
correspondence, diaries, or multi-biographer coverage over predominantly
administrative/achievement-only records.

`PLAUSIBLE_21_22` (likely 21-22, one or two domains uncertain, or a
self-mythologizing/legend-accretion risk needing care): Abigail Adams,
Elizabeth Cady Stanton, Harriet Beecher Stowe, Zelda Fitzgerald (illness-
adjacent evidence requiring care per the rubric's diagnosis prohibition),
Giuseppe Garibaldi, Charlie Chaplin, Harry Houdini, Eva Perón (Peronist
hagiography/vilification both directions), Qiu Jin (later political
mythologizing by both KMT and CCP), Édith Piaf (self-embellished
biography).

No candidate in this pool was classified `UNDER_21_EXPECTED`,
`STRUCTURAL_RISK`, or `REJECT_PRE_SCORE` — the pool was deliberately curated
toward richly-documented figures before preflight, unlike roster-12/13's
broader draws which included some `STRUCTURAL_RISK` propaganda cases
(Cleopatra, Idi Amin, Mobutu Sese Seko) in earlier cycles.

## 3. Frozen batch (12, ordered)

Per the postmortem's own recommendation ("prefer a smaller 10-person batch
of genuinely broad evidence over 14 weak candidates"), froze 12 —
prioritizing `STRONG_22_CAPABLE` exclusively (no `PLAUSIBLE_21_22` was
needed) and improving gender balance within that tier (3 of the pool's only
3 `STRONG`-tier women — Elizabeth I, Queen Victoria, Gertrude Bell — all
included) over adding more male political/literary figures already
well-represented in the tier:

1. Abraham Lincoln
2. Theodore Roosevelt
3. Alexander Hamilton
4. Mark Twain
5. Ernest Hemingway
6. Elizabeth I of England
7. Otto von Bismarck
8. Leo Tolstoy
9. Sigmund Freud
10. Pablo Picasso
11. Gertrude Bell
12. Queen Victoria

No replacements after freeze; no rescue candidates; no post-validator
evidence additions — per the frozen-batch discipline.

## 4. Preflight accuracy vs. actual (Part J analysis)

| Candidate | Preflight est. attrs | Evidence-pack-supported | Actually scored | Weighted coverage | Lifecycle |
|---|---|---|---|---|---|
| Abraham Lincoln | ~22 | 22 | 22 | 0.664 | qa_passed |
| Theodore Roosevelt | ~22 | 23 | 23 | 0.695 | qa_passed |
| Alexander Hamilton | ~22 | 22 | 22 | 0.650 | qa_passed |
| Mark Twain | ~22 | 22 | 22 | 0.653 | qa_passed |
| Ernest Hemingway | ~22 | 22 | 22 | 0.653 | qa_passed |
| Elizabeth I | ~22 | 22 | 22 | 0.660 | qa_passed |
| Otto von Bismarck | ~22 | 23 | 23 | 0.677 | qa_passed |
| Leo Tolstoy | ~22 | 22 | 22 | 0.653 | qa_passed |
| Sigmund Freud | ~22 | 23 | 23 | 0.691 | qa_passed |
| Pablo Picasso | ~22 | 22 | 22 | 0.645 | qa_passed |
| Gertrude Bell | ~22 | 22 | 22 | 0.660 | qa_passed |
| Queen Victoria | ~22 | 22 | 22 | 0.655 | **held** |

**How many `STRONG_22_CAPABLE` actually scored >=22: 12 of 12 (100%).**
Scored exactly 21: 0. Scored <=20: 0. **qa_pass rate: 11/12 (91.7%)** — a
dramatic improvement over roster-12/13's combined 2/33 (6.1%), fully
consistent with the postmortem's mathematical prediction that 22 scored
attributes essentially guarantees the coverage floor (worst case 0.6175)
regardless of which specific attributes are chosen. **False-positive rate
of the new preflight: 1/12 (8.3%)** — Queen Victoria was correctly
predicted to reach 22 attributes (she did) but the preflight did not and
could not predict her confidence distribution, which is a different
question the preflight was never designed to estimate (per the postmortem's
own scope: the preflight targets attribute *count*, not confidence). Her
miss is on the high-confidence-count sub-gate (4 of 22 attributes at
confidence >=0.5, need 12), not coverage or attribute count — the evidence
pack is genuinely broad but concentrated in the inference/strong_inference
band given the structural limits of a constitutional monarch's personally-
attributable behavioral record (see her candidate file's own provenance
notes). Not rescued: no confidence was raised after seeing this result, per
the confidence-change policy.

## 5. Validator and integrity results

- `validateCandidates.ts`: 0 errors, 0 warnings across the full 227-file
  corpus (215 pre-existing + 12 new). `qa_passed` 74, `held` 154.
- `checkScoringLockIntegrity.ts`: 215 previously-committed candidate files
  checked against HEAD, 0 flagged.
- Two data-entry corrections made before finalizing (mechanical fixes, not
  score/confidence changes, made before eligibility was first computed):
  Theodore Roosevelt's `impactDomains` included an invalid
  `"environmental_science"` value not in the controlled `ImpactDomain`
  vocabulary (corrected to `["historical", "social"]`); five rows across
  four candidates (Theodore Roosevelt, Elizabeth I, Sigmund Freud x2, Pablo
  Picasso) used an invalid `impact: "contextual"` value (confused with the
  unrelated `contributionShape` vocabulary) — corrected to `"neutral"`.
  Neither correction touched any `score`/`confidence`/`evidenceType`.

## 6. Newly `qa_passed` (11) — all product-ready, all promoted

Every one of the 11 cleared full product-readiness preflight: real
rights-clear public-domain portrait (verified live against Wikimedia
Commons license metadata, not assumed), full EN/KO editorial content (2
achievements, 2 moments, 1 turning point, trait interpretations), Korean
display name, working `/people/<slug>` route in both locales, no
unresolved blocker. **None excluded — zero product-blocked `qa_passed`
this cycle**, unlike Che Guevara's parked portrait-rights block in
roster-12/13.

### Portraits (all Public Domain, verified live via Commons API before download)

| Person | Source | Attribution | Kind |
|---|---|---|---|
| Abraham Lincoln | LOC | Alexander Gardner (attributed), Library of Congress | (photograph, lifetime) |
| Theodore Roosevelt | LOC | Pach Bros., New York | (photograph, lifetime) |
| Alexander Hamilton | Commons | John Trumbull, 1805 | `historical_depiction` (posthumous, painted 1805; Hamilton died July 1804) |
| Mark Twain | Commons | A. F. Bradley, New York | (photograph, lifetime) |
| Ernest Hemingway | Commons | 1923 U.S. passport photograph | (photograph, lifetime) |
| Elizabeth I | Commons (NPG) | Unknown artist, c. 1600-1610, copy of a lost original of c. 1559 | `historical_depiction` (verified via Commons description: not from life, a later copy) |
| Otto von Bismarck | Bundesarchiv | Bundesarchiv Bild 146-2005-0057, 31 August 1890 | (photograph, lifetime) |
| Leo Tolstoy | LOC | 1897 photograph | (photograph, lifetime) |
| Sigmund Freud | Commons | Ferdinand Schmutzer, 1926 | (photograph, lifetime) |
| Pablo Picasso | Commons | Ricard Canals, 1904, Paris | (photograph, lifetime) |
| Gertrude Bell | Gertrude Bell Archive, Newcastle University | Gertrude Bell, 1909 | (photograph, lifetime) |

All 11 downloaded from their verified Commons URL, resized to a 1600px
longest-side ceiling (no upscale) with Pillow/mozjpeg-equivalent
recompression, and hosted locally under `public/portraits/` — zero
external/Wikimedia-hosted `<img src>` dependency, consistent with the
project's zero-remote-portrait-dependency standard. Every candidate's
`portrait.sourcePageUrl` records the exact Commons file page checked, for
future re-verification.

### Editorial content

108/108 people now have editorial content (was 108 including the 11 new;
97 pre-cycle). Full EN + KO for all 11: 2 achievements, 2 moments (>=1 with
a tied trait interpretation), 1 turning point (with interpretation), no
raw i18n keys, no banned diagnostic-language patterns
(`editorialValidation.ts`'s `DIAGNOSTIC_PATTERNS` checked clean — Hemingway
and Zelda-Fitzgerald-adjacent illness material was deliberately kept out of
editorial prose entirely, described only in candidate-file rationale as
documented behavior, never as a diagnosis). `lifeArc`/`complexities` were
not authored this cycle for the new 11 (not required by this cycle's scope;
a future backfill candidate, consistent with "don't force a fixed editorial
count if evidence cannot support it honestly").

### Korean display names

Added `person.name.{slug}` for all 11 to `ko.ts`. i18n audit: 0 missing
keys, 100% Korean coverage maintained.

## 7. Queen Victoria — held, not promoted

`held`, `computedEligibility.eligible: false`. 22 scored attributes
(coverage 0.655, comfortably clearing the 0.6 floor) but only 4 attributes
at confidence >=0.5 against the `highConfidence.minCount: 12` floor. Her
candidate JSON, evidence, and lifecycle are untouched after this
determination — no confidence raised, no rows added, per the
confidence-change policy. She remains available for a future cycle if new
primary-source depth (beyond her extensive but institutionally-mediated
diary/correspondence record) is found — not a rejection of the person, a
documented first-score outcome.

## 8. Roster14 allowlist

`src/dev/roster1000/generateRoster14.ts` — explicit 11-slug allowlist (no
dynamic `qa_passed` filter, no wildcard): `abraham-lincoln`,
`theodore-roosevelt`, `alexander-hamilton`, `mark-twain`,
`ernest-hemingway`, `elizabeth-i`, `otto-von-bismarck`, `leo-tolstoy`,
`sigmund-freud`, `pablo-picasso`, `gertrude-bell`. Output written to
`src/data/people/roster14.ts`, wired into `SEED_PEOPLE` via `seed.ts`.

## 9. Internal vs. visible counts

- **Internal roster (`SEED_PEOPLE`/`peopleIndex.generated.ts`): 97 -> 108.**
- **People Directory default (match-eligible-only) view: 96 -> 107** — all
  11 new people are match-eligible; Zheng He remains the sole excluded
  person, unchanged (`filterPeople()`'s `matchEligibleOnly` default and its
  one existing exception are both preserved, verified live in-browser).
- **Target: 125. Remaining gap: 17** (was 28 before this cycle).

## 10. Full validation gate

- `validateCandidates.ts`: 0 errors, 0 warnings (§5).
- `checkScoringLockIntegrity.ts`: 0 flagged (§5).
- `tsc --noEmit`: clean.
- `vitest run`: **689/689** passed (unchanged file count; no new unit
  tests added this cycle, existing suite covers the new data structurally).
- `generatePeopleIndex.ts`: 108 entries written.
- `calibrate.ts quiz` (run twice): anchors drift is negligible (largest
  delta ~0.005 in the 0.35-0.63 raw-score range) — `CALIBRATION_VERSION`
  correctly left unbumped, per the "small roster addition" convention.
- `simulate.ts 10000 quiz`: max #1-match frequency 11.1% (Warren Buffett),
  well under the 20%-at-n>=30 domination threshold. No new person
  dominates; Otto von Bismarck appears in the top-6 list at ~3.0-3.4% across
  runs, not a concern.
- `sensitivity.ts seeds 10000`: stable across 5 independent seed offsets,
  max-#1-frequency mean 10.5% (sd 0.4%, range 9.9-11.1%). No run exceeds the
  20% alarm threshold.
- `i18n-audit.ts`: 0 missing Korean keys, 100% coverage, all buckets clean.
- `editorialCoverageAudit.ts`: 108/108 people with editorial content, all
  11 new people classified "Rich" (5 items each).
- `next build --webpack`: clean, 240 static pages (108 people x 2 locales +
  other routes).
- Full Playwright suite (`--workers=1`): **310/310 passed** after fixing
  two objectively-stale hardcoded roster-count fixtures (see below) — no
  other regressions.

### Stale test fixtures fixed (mechanical count updates, not behavior changes)

Three Playwright specs hardcoded the pre-cycle roster/filter counts as
literal expected strings; all three failed only on the number, not on
logic, and all three were updated to the new, verified-correct counts with
an explanatory comment, consistent with "objectively stale roster-count
tests" being an expected, in-scope part of wiring a new roster batch:

- `e2e/peopleDirectory.spec.ts` (ko-KR cross-facet AND test): "전체 97명 중
  4명" -> "전체 108명 중 5명" — Abraham Lincoln (curiosity 78, collaboration
  75, both scored `advantage`) newly satisfies the curiosity+collaboration
  filter combination the test locks.
- `e2e/miriamMakebaProfileFix.spec.ts`: "96 people" -> "107 people" (default
  unfiltered directory count).
- `e2e/roster12MarcusAurelius.spec.ts`: "96 people" -> "107 people" (same).

No calibration, matching, scoring, or eligibility-formula code was changed
to produce these updates — only the tests' hardcoded expected counts, which
necessarily change whenever the roster grows, exactly as the roster-12 and
roster-13 batches' own count updates did before this one.

## 11. What this cycle changed vs. did not change

Changed: 12 new candidate JSON files (11 `qa_passed`, 1 `held`),
`roster14.ts`, `seed.ts`'s composition, `peopleIndex.generated.ts`,
`editorial.ts` (both the structure file and EN/KO string files), `ko.ts`
(11 display names), 11 new portrait assets under `public/portraits/`,
`generateRoster14.ts`, three Playwright count fixtures, this checkpoint,
`docs/checkpoints/roster.md`, `docs/context/CURRENT_STATE.md`.

Not changed: `eligibility_v2`'s thresholds or formula, `matching_v2`,
`ATTRIBUTES[*].baseWeight` (read for postmortem analysis only, never
selected on), any of the 215 previously-committed candidate files' scores/
confidence/lifecycle, any previously-promoted person's trait data, Che
Guevara's parked portrait-blocked state (not reopened, not touched), the
Che Guevara portrait search (not reopened, per instruction).

## 12. Remaining gap to 125

108 of 125 (86.4%). 17 remaining. Queen Victoria stays `held` for a future
cycle. The other 22 discovery-pool candidates preflighted but not frozen
this cycle (§1, marked `*`) are a reasonable starting point for a future
roster-15 discovery pool, though a fresh preflight pass (not a blanket
carry-forward) should still be run against whatever the corpus looks like
at that time, per this project's standing "check the full candidate corpus
before freezing" discipline.
