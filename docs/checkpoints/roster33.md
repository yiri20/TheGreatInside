# Roster33: new-candidate roster-expansion cycle (2026-09-16)

Base SHA: `466e45417e42fcf46ae9a719599d52378ee9abac` (origin/main after
Legacy Integrity Batch 5's merge, PR #40). Production count before this
cycle: 225.

This is a return to the pre-legacy-integrity **new roster expansion**
lane (roster24-32), not a legacy-integrity batch. The legacy-integrity
remediation program (batches 1-5, 13 people, docs/checkpoints/
legacy-integrity-*) stays paused and untouched here; nothing in this
cycle rescored an existing legacy person.

## Selection

15 candidates were frozen before research began, chosen to strengthen
this roster's weakest interest-area pools (portfolio targets, not
eligibility quotas):

| Slug | Category | Recognizability |
|---|---|---|
| neil-armstrong | building_discovery | internationally recognizable |
| bill-gates | building_discovery | internationally recognizable |
| tim-berners-lee | building_discovery | field-famous |
| jacques-cousteau | building_discovery | internationally recognizable |
| ferdinand-magellan | building_discovery | long-tail/historical |
| steve-wozniak | building_discovery | field-famous |
| alfred-hitchcock | arts_culture | internationally recognizable |
| bob-dylan | arts_culture | internationally recognizable |
| freddie-mercury | arts_culture | internationally recognizable |
| josephine-baker | arts_culture | internationally recognizable |
| haruki-murakami | arts_culture | field-famous |
| alexander-fleming | science_knowledge | internationally recognizable |
| carl-sagan | science_knowledge | internationally recognizable |
| dmitri-mendeleev | science_knowledge | long-tail/historical |
| jonas-salk | science_knowledge | field-famous |

Category mix: 6 building_discovery, 5 arts_culture, 4 science_knowledge
(leadership_society deliberately not a priority this cycle). Recognizability
mix: 9 internationally recognizable, 4 field-famous, 2 long-tail/historical
(Magellan, Mendeleev) — close to the 9-10/3-4/2 target.

**Zero-politics screening** was applied at selection time to every new
candidate (none excluded post-freeze; none of the 15 have a primary
political/state/military/activist identity). This does **not** apply
retroactively to the paused legacy-integrity cohort — see
`docs/reference/roster30-31-composition-rule.md` and this project's
established precedent (Neruda/Shaw in Roster32, Genghis Khan audited on
identical terms in Legacy Integrity Batch 5).

Two of the 15 (Josephine Baker, Jonas Salk) are pre-existing `held`
candidates from the roster-1000/roster-19 era, reused and deepened this
cycle rather than researched from scratch — each had a concrete,
named blocker that was actually resolved: Baker had no portrait (now
resolved); Salk's evidence base was thin (deepened with new,
`[NEW_EVIDENCE, Roster33]`-tagged Sabin-rivalry research: `conflict_tolerance`
row rewritten, new `independent_thinking` row added).

## Shipped: 14 of 15

**Haruki Murakami was NOT promoted.** His evidence review concluded
publication-safe (`status: evidence_approved`, 4 rows, all first-person-quoted
from the 2004 Paris Review interview and his own running memoir) — but no
rights-clear photographic portrait could be found for this contemporary,
camera-shy author. `portrait.status: "held"` is the sole reason
`checkPromotionReadiness()` correctly excludes him from `generateRoster33.ts`'s
allowlist. This is the same `qa_passed`/`evidence_approved`-but-portrait-blocked
outcome as Che Guevara's roster-12 precedent, not a forced 15th slot or a
weakened standard. His candidate file is ready for a future cycle's
dedicated portrait search.

Per-candidate evidence summary (all `evidence_approved`, all
non-match-eligible by design):

| Slug | Rows | Sources | Independent perspectives |
|---|---|---|---|
| alexander-fleming | 3 | 3 | Fleming's own account + assistant V.D. Allison's independent corroboration |
| alfred-hitchcock | 5 | 2 | Wikipedia + Hitchcock/Truffaut interview book |
| bill-gates | 6 | 3 | documentary (named colleagues) + independent CNBC reporting |
| bob-dylan | 5 | 3 | his memoir + independent Newport-1965 journalism |
| carl-sagan | 3 | 3 | original TTAPS journal article + independent press coverage of the 1986 arrest |
| dmitri-mendeleev | 4 | 3 | RSC institutional account + ACS/Science History Institute account |
| ferdinand-magellan | 5 | 3 | Pigafetta's primary eyewitness chronicle + independent historical accounts |
| freddie-mercury | 4 | 3 | independent Live Aid journalism/named bandmate (Brian May) + his own quoted remarks |
| jacques-cousteau | 5 | 3 | Cousteau Society + independent press |
| jonas-salk | 9 | 4 | PMC/NIH + biography coverage + independent Sabin-feud historical accounts |
| josephine-baker | 7 | 5 | National WWII Museum + Cardiff University historian + National Women's History Museum + FRANCE24 |
| neil-armstrong | 7 | 4 | Hansen's "First Man" + NASA transcripts + named colleague accounts |
| steve-wozniak | 6 | 3 | his memoir "iWoz" + Smithsonian |
| tim-berners-lee | 5 | 3 | CERN's own institutional record + his own Guardian essay |

Every shipped candidate carries ≥2 independent provenance perspectives and
≥1 non-self behavioral source; Wikipedia was used for orientation only, never
as a scored-evidence source.

## Portrait sourcing (a real gap caught and fixed mid-cycle)

The first draft of all 14 portrait blocks cited plausible-sounding but
**unverified** Wikimedia Commons filenames, and the actual image files were
never downloaded to `public/portraits/`. A Playwright run surfaced this as
two console 404s. Every one of the 14 portraits was re-sourced from scratch:
searched live on Commons, license/photographer/date verified via the Commons
API's `extmetadata`, downloaded, and re-cited with corrected attribution
(3 files also needed a corrected filename once the real file's actual date
was confirmed: Fleming 1943→1945, Mendeleev 1897→1891, Wozniak 2015→2017).
All 14 are now real files under `public/portraits/`, each confirmed
200&nbsp;OK in the production build (see Verification). Licenses actually
used: Public Domain (Fleming, Hitchcock/NYWTS, Gates/HHS, Dylan/AP, Sagan/NASA,
Mendeleev/AIP archive, Magellan/Mariner's Museum, Salk/CDC, Baker,
Armstrong/NASA), CC0 (Cousteau/Anefo), CC BY-SA 3.0 (Mercury, Wozniak), CC
BY-SA 4.0 (Berners-Lee).

## Production, promotion, index

`src/dev/roster1000/generateRoster33.ts` (explicit 14-slug literal
allowlist; calls `preparePersonSeedForPromotion()`/`checkPromotionReadiness()`
per candidate; never reads `computedEligibility.eligible`) wrote
`src/data/people/roster33.ts`. `ROSTER_33` imported into `seed.ts` following
the `ROSTER_31`/`ROSTER_32` pattern. `peopleIndex.generated.ts` regenerated
(239 entries); diff inspected — the only changes were the entry-count
comment and exactly the 14 new slugs, no drift.

## Interest-area pools, before → after

| Pool | Before | After | Delta |
|---|---|---|---|
| building_discovery | 33 | 39 | **+6** |
| arts_culture | 85 | 90 | +5 |
| science_knowledge | 92 | 99 | +7 (`engineering` doubles into both science_knowledge and building_discovery for 3 candidates) |
| leadership_society | 74 | 74 | +0 (not a priority, unaffected as intended) |

`building_discovery` (33 people, the weakest pool going in) got the largest
proportional lift (+18%). All 14 shipped candidates land correctly in at
least one of the four pools (verified directly against
`PROFESSION_CATEGORIES`, not assumed).

Two `fieldIds` bugs were caught and fixed during this cycle: Carl Sagan was
initially tagged `"astronomy"` (not a curated category fieldId — would have
landed in no pool at all); corrected to `"natural_science"`. Josephine
Baker's pre-existing `"performing_arts"` fieldId isn't in the curated
taxonomy either; her new `"dance"`/`"music"` tags correctly bucket her into
arts_culture (and `directoryTaxonomy.test.ts`'s own >=2-person coverage
guard caught the stale `"performing_arts"` duplicate before it could land).

## Calibration, matching health

`pnpm calibrate quiz` run twice (regenerate, then report). Both the match
and greatness anchor tables came back **bit-identical** to the
Batch-5-shipped values — zero drift, because none of the 14 new people are
match-eligible, so the underlying eligible cohort used for calibration is
completely unchanged. `dispersion.generated.ts` is likewise unchanged.
`CALIBRATION_VERSION` stays `calibration_v3`; no refresh needed.

`simulate.ts 10000 quiz` against the new 239-person roster: max #1-match
frequency 11.7% (Warren Buffett), comfortably under the ~20% concern line.
`sensitivity.ts seeds 10000` across 5 independent seed offsets: max
#1-frequency ranged 10.2%-11.7% (mean 10.9%, sd 0.5%) — stable, no run
crossed the alarm threshold.

## Legacy lane (unchanged, confirmed)

`checkScoringLockIntegrity.ts`: 290 previously-committed candidate files
checked, 0 flagged; legacy scoring lock covers the same 22 pre-pipeline
production people, 0 flagged. No legacy person's rows, status, or
directory/eligibility state changed. Match-eligible count held at 114
throughout this cycle (the first cycle since Legacy Integrity Batch 1 where
it didn't move) — expected, since publication and eligibility are
architecturally independent and none of the 14 new people target
`eligibility_v2`.

## Test/audit-file maintenance (downstream consequences, not new legacy work)

Several existing test/audit files hardcode the live production/directory
count as a literal checksum; each one broke mechanically when the count
moved 225→239 / 224→238, the same class of consequence seen in every prior
roster cycle (e.g. Roster31's own "184 people" note). Fixed, not
reinterpreted:

- `matchPoolIntegrityAudit.ts`: added `ROSTER_33` to `NAMED_ROSTERS` (a new
  roster generator must be registered here for lineage classification to
  work — every prior roster required the same registration).
- `matchPoolIntegrityAudit.test.ts`, `profilePublicationSeparation.test.ts`,
  `matching.test.ts` (both `knownNonEligible` sets): count bumps and the 14
  new non-eligible slugs added to the "deliberately divergent" exclusion
  lists, exactly the pattern every roster24-32 cycle followed.
- `akiraKurosawaRemediation.test.ts`, `legacyIntegrityBatch2-5Remediation.test.ts`:
  each has one `SEED_PEOPLE`/`PEOPLE_INDEX` length assertion; bumped 225→239
  with a comment clarifying this batch itself added none of the new people.
- `e2e/peopleDirectory.spec.ts`: the one authoritative live-count assertion
  (224→238) and the ko-KR cross-facet total (225명→239명; the filtered count
  of 6 is unaffected).
- `explorer.test.ts`'s occupation-coverage guard: 4 new `occupationIds[0]`
  values needed EN+KO text (`astronaut`, `biologist`, `medical_researcher`,
  `navigator`) — added the same way this set has always been extended.

No legacy person's behavioral data was touched by any of the above; these
are all mechanical registration/count fixes.

## New Roster33 test file

`src/dev/roster1000/audits/roster33.test.ts` — table-driven, 14 candidates ×
9 checks (130 tests): candidate-file existence/status, candidate↔production
row-tuple equality (attributeId set, and score/confidence/evidenceType/impact
per row), identity/QID agreement, publication state (`status`,
`isDirectoryVisible`), honest non-eligibility, portrait readiness, Korean
display-name coverage, `PEOPLE_INDEX` agreement — plus cross-target checks
(no duplicate id/slug/QID across all 239 people, SEED_PEOPLE/PEOPLE_INDEX
agreement, and an explicit assertion that Murakami was NOT promoted).
Deliberately does not encode any universal-eligibility or exact-legacy-baseline
assumption.

## Verification

- `validateCandidates.ts`: 0 errors, 0 warnings (304 total candidate files).
- `checkScoringLockIntegrity.ts`: 0 flagged (290 committed files + 22 legacy).
- `tsc --noEmit`: clean.
- `vitest run`: **1069/1069 passed**, 63 files (includes the new 130-test
  `roster33.test.ts`).
- `next build --webpack`: succeeded, 502 static/SSG paths generated.
- Focused Playwright (`peopleDirectory.spec.ts`, `person.visual.spec.ts`,
  `compare.visual.spec.ts`): **118/118 passed** against the production build.
- Manual verification (production build, `next start`): Carl Sagan
  (science_knowledge, en-US) — portrait 200&nbsp;OK, trait rows render,
  honest "not yet included in matching" notice; Neil Armstrong
  (building_discovery) — portrait 200&nbsp;OK; Josephine Baker (ko-KR) —
  full Korean UI, all 7 trait rows, sources; Freddie Mercury at 375px mobile
  — clean layout, no overflow; `/compare/bob-dylan` — correctly shows the
  "isn't included in matching yet" state with a working "View Profile" link
  (covers both the Compare-flow check and the non-match-eligible-profile
  check), zero console errors throughout.

## Distance to 250

Production: 225 → **239**. Directory-visible: 224 → 238. Match-eligible:
unchanged at 114. Remaining distance to the 250-person milestone: **11
people**. Recommended Roster34 size: **10-12** (a batch this size keeps the
per-candidate research depth this project has maintained rather than forcing
a single oversized batch to close the gap in one cycle) — sized to land at
or just past 250, not to hit it exactly by construction.

**Roster34 and the 250-person performance checkpoint were explicitly NOT
started in this cycle.** Legacy Integrity Batch 6 was explicitly NOT started
either — 22 legacy people remain in the paused remediation queue,
untouched.
