# Roster34: final new-candidate expansion to the 250-person milestone (2026-09-16)

Base SHA: `975fc537a250b938021fd98cf5ab994724080e68` (origin/main after
PR #41's merge). Production count before this cycle: 239.

Continues the new-candidate roster-expansion lane (roster24-33). Legacy
integrity remediation stays paused and untouched — confirmed via
`checkScoringLockIntegrity.ts` (22 pre-pipeline people, 0 flagged, both
pre- and post-commit).

## Selection: 11 new candidates

Frozen after a cheap pre-flight pass (duplicate slug/QID check against all
239 production people and all 303 existing candidate files; zero-politics
screen; plausible-evidence check) and QIDs verified live against Wikidata
before research began:

| Slug | Category | Fields | Recognizability |
|---|---|---|---|
| yuri-gagarin | building_discovery | exploration | international |
| sally-ride | building_discovery + science_knowledge | exploration, physics | international |
| walt-disney | building_discovery + arts_culture | business, film | international |
| estee-lauder | building_discovery | business | field-famous |
| charlie-chaplin | arts_culture | film | international |
| elvis-presley | arts_culture | music | international |
| andy-warhol | arts_culture | art, film | international |
| katharine-graham | arts_culture + building_discovery | journalism, business | field-famous |
| robert-oppenheimer | science_knowledge | physics | international |
| edward-jenner | science_knowledge | medicine | long-tail/historical |
| antoine-lavoisier | science_knowledge | chemistry | long-tail/historical |

Domain contribution (a person can count in >1 category, all fieldIds are
real/dual roles, none invented to hit a target): building_discovery 5
(Gagarin, Ride, Disney, Lauder, Graham), arts_culture 6 (Chaplin, Presley,
Warhol, Graham, Disney, Murakami), science_knowledge 4 (Ride, Oppenheimer,
Jenner, Lavoisier) — matches the target mix (~4/4/3) closely. Recognizability:
7 international, 2 field-famous, 2 long-tail/historical. Zero-politics
screen applied at selection time (none excluded post-freeze; no primary
political/state/military/activist identity among the 11).

## Haruki Murakami: portrait-only recovery

A Roster33 holdover (`evidence_approved`, evidence side already
publication-safe, held solely on the portrait gate). Bounded ~15-minute
search found `File:Haruki_Murakami_2018.jpg` on Wikimedia Commons — an
official photo by Ecuador's Ministry of Culture and Heritage
(Ministerio de Cultura y Patrimonio), 8 November 2018, verified live via
the Commons API (`License: Public domain`, EXIF confirms a real Canon EOS
5D Mark III capture). Downloaded, resized to 1600px longest side, no crop
needed. **No behavioral research redone, no row rescored, no trait added,
no confidence changed** — only `portrait` changed. He is now promoted.

## Shipped: 12 of 12 (11 new + Murakami) — nothing held

| Slug | Sources | Rows | Independent perspectives (non-self behavioral) |
|---|---|---|---|
| yuri-gagarin | 7 | 6 | ESA, IEEE Spectrum, RFE/RL, The Space Review, NASA, Euronews — all independent, non-self |
| sally-ride | 3 | 7 | NASA oral history (self) + Kathryn Sullivan's independent NASA oral history (named colleague) |
| walt-disney | 14 | 18 | Neal Gabler biography (archive-sourced, independent) + Illusion of Life (animator memoirs) + contemporary press |
| estee-lauder | 5 | 13 | TIME 1998 (named colleagues Phillips/Wagner) + Leonard Lauder's independent 2020 memoir + PBS/Encyclopedia.com |
| charlie-chaplin | 8 | 10 | David Robinson biography + Unknown Chaplin (independent archive study) + Silent London (named collaborators) |
| elvis-presley | 9 | 10 | Peter Guralnick's independent 2-volume biography + Sam Phillips + session-musician accounts |
| andy-warhol | 6 | 6 | Bob Colacello's independent Factory-insider account + Victor Bockris biography |
| katharine-graham | 6 | 13 | Ben Bradlee's own NPR interview (independent, non-self) + Eugene Meyer eyewitness (CJR) |
| robert-oppenheimer | 9 | 11 | American Prometheus + Edward Gerjuoy firsthand memoir + I.I. Rabi hearing testimony (all independent, non-self) |
| edward-jenner | 6 | 8 | Science History Institute-equivalent scholarship + peer-reviewed medical-history journal article (independent) |
| antoine-lavoisier | 5 | 6 | Science History Institute + Chemistry World (historian Patricia Fara) + EBSCO — all independent, non-self, no self-testimony used at all |
| haruki-murakami | 3 | 4 | Unchanged from Roster33 (Paris Review interview + running memoir, both self — evidence side untouched this cycle) |

Every shipped candidate carries ≥2 independent provenance perspectives and
≥1 non-self behavioral source (Murakami's Roster33-era evidence pack was
already reviewed and approved on this basis; not re-litigated here).
Wikipedia used for orientation only throughout, never as scored evidence.

## Publication vs. eligibility

Publication decisions (`evidence_approved`) were frozen on evidence quality
alone, before eligibility was computed — none of the 12 targeted
`eligibility_v2`. All 12 became non-match-eligible **as an honest result of
evidence-grounded scoring; eligibility was not targeted.** Row counts range
6-18 (Walt Disney's 18 rows is the richest-evidenced candidate this cycle,
still short of the 0.6-coverage floor at 0.537). No score/confidence was
adjusted after seeing an eligibility computation.

## Production, promotion, index

`src/dev/roster1000/generateRoster34.ts` (explicit 12-slug literal
allowlist; calls `preparePersonSeedForPromotion()`/`checkPromotionReadiness()`
per candidate; never reads `computedEligibility.eligible`) wrote
`src/data/people/roster34.ts`. `ROSTER_34` wired into `seed.ts` following
the `ROSTER_33` pattern. `peopleIndex.generated.ts` regenerated (251
entries).

## Two DIFFERENT category metrics — reported separately (Roster33 lesson)

### A. Published/directory field-category coverage (NOT the matching pools)

All 251 production people, `fieldIds` intersected against
`PROFESSION_CATEGORIES`:

| Category | Before (239) | After (251) | Delta |
|---|---|---|---|
| science_knowledge | 99 | 103 | +4 |
| arts_culture | 90 | 96 | +6 |
| leadership_society | 74 | 74 | +0 |
| building_discovery | 39 | 44 | +5 |

### B. MATCH-ELIGIBLE interest-scope pools (the actual `interestScope.ts` population)

Mechanically derived from the 114 match-eligible people only, at base
(`975fc53`) and at head:

| Category | Before (114) | After (114) | Delta |
|---|---|---|---|
| science_knowledge | 50 | 50 | +0 |
| arts_culture | 43 | 43 | +0 |
| leadership_society | 42 | 42 | +0 |
| building_discovery | 15 | 15 | +0 |

**Unchanged, exactly as expected**: all 12 Roster34 people are
non-match-eligible, so `results.ranked` — and every interest-scope pool a
user can be routed into via `selectInterestMatch()` — is bit-for-bit the
same population before and after this PR.

## Calibration, dispersion, matching health

`corepack pnpm@10 exec tsx src/dev/calibrate.ts quiz` run twice
(regenerate, then report). Both MATCH and GREATNESS anchor tables came
back **bit-identical** to the Batch-5/Roster33-shipped values — zero
drift, because the match-eligible cohort used for calibration is
unchanged (114, same people). `dispersion.generated.ts` regenerated twice,
confirmed byte-identical to committed (only a line-ending touch, reverted).
`CALIBRATION_VERSION` stays `calibration_v3`; no refresh, no version bump.
Matching health: focused confirmation only (not a full `simulate.ts`/
`sensitivity.ts` rerun) since the eligible population is literally
unchanged — the full `matching.test.ts` suite (58 tests, including the
"every currently-eligible profile stays eligible" regression guard) passes
clean.

## Legacy lane (unchanged, confirmed)

`checkScoringLockIntegrity.ts` pre-commit: 303 previously-committed
candidate files, 0 flagged (correct — the 11 new candidate files weren't
committed yet). Post-commit re-run (see Verification below) checked the
full new committed count. Legacy: 22 pre-pipeline production people, 0
flagged throughout. No legacy person's rows, status, or eligibility
changed.

## Test/audit-file maintenance (downstream consequences, not new legacy work)

Mechanical count bumps, following the exact pattern every roster24-33
cycle used:

- `matchPoolIntegrityAudit.ts`: added `ROSTER_34` to `NAMED_ROSTERS`.
- `matchPoolIntegrityAudit.test.ts`: counts 239→251 / 238→250, lineage
  regex extended to accept `roster34`.
- `matching.test.ts`, `profilePublicationSeparation.test.ts`
  (`knownNonEligible`/`KNOWN_DIVERGENT_SLUGS` sets): the 12 new
  non-eligible slugs added to the "deliberately divergent" exclusion
  lists; wording corrected from "by design" to "an honest result of
  evidence-grounded scoring."
- `akiraKurosawaRemediation.test.ts`, `legacyIntegrityBatch2-5Remediation.test.ts`:
  each has one `SEED_PEOPLE`/`PEOPLE_INDEX` length assertion; bumped
  239→251.
- `roster33.test.ts`: its own 239-person count assertion bumped to 251;
  its "Murakami NOT promoted" test updated to reflect the Roster34
  outcome (he now IS promoted, portrait resolved) — a real fact change,
  not a stale-test patch-over.
- `e2e/peopleDirectory.spec.ts`: the live-count assertion (238→250 people).
  The cross-facet curiosity+collaboration filter assertion required a
  genuine content change, not just a total bump: **J. Robert Oppenheimer
  honestly crosses both fixed thresholds** (curiosity 74/0.65, collaboration
  74/0.62 — his real evidence_approved scores, not adjusted to hit this
  filter), raising the filtered count from 6 to 7 — the same pattern as
  Vera Rubin (roster25) and Paul Erdős (roster30) before him.
- Korean localization (`ko.ts`): 12 new `person.name.<slug>` keys added.
  No new `occupationIds`/`fieldIds`/`tagIds` vocabulary was introduced —
  every classification value reused an already-translated existing key, so
  `explorer.test.ts`'s occupation-coverage guard needed no changes.

No legacy person's behavioral data was touched by any of the above.

## New Roster34 test file

`src/dev/roster1000/audits/roster34.test.ts` — table-driven, 12 candidates
× 8 checks (116 tests): candidate-file existence/status, candidate↔production
row-tuple equality, identity/QID agreement, publication state, actual
computed eligibility (not a hardcoded "all false" — checks each person's
real `evaluateMatchEligibility()` result against their real flag), portrait
readiness, Korean display-name coverage, `PEOPLE_INDEX` agreement — plus a
dedicated Murakami sub-suite (evidence byte-identical to Roster33, portrait
blocker resolved, now present in production) and cross-target checks (no
duplicate id/slug/QID across all 251 people, the 250-milestone check,
match-eligible-114-unchanged check).

## Verification

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: 314 candidates loaded, 0 errors, 0 warnings (by
  status: `qa_passed` 93, `evidence_approved` 136, `held` 85).
- `checkScoringLockIntegrity.ts` (post-commit, against the corrected
  committed HEAD): see exact literal output recorded after the
  implementation commit below.
- `vitest run`: **1185/1185 passed**, 64 files (1069 existing + 116 new
  `roster34.test.ts`).
- `next build --webpack`: succeeded, **526 static/SSG paths** (502 + 12
  new people × 2 locales).
- Focused Playwright (`peopleDirectory.spec.ts`, `person.visual.spec.ts`,
  `compare.visual.spec.ts`): **118/118 passed** against the production
  build.
- Manual verification (production build, `next start`): Sally Ride
  (building_discovery + science_knowledge, en-US) — portrait 200 OK,
  correct non-eligible notice, trait rows render, sources with full
  provenance visible; Charlie Chaplin (arts_culture) — clean, zero console
  errors; Antoine Lavoisier (science_knowledge, ko-KR) — full Korean UI,
  correct David-portrait attribution, all trait rows in Korean; Elvis
  Presley at 375px mobile — clean layout, no overflow, correct US Army
  portrait attribution; `/compare/yuri-gagarin` — correctly shows the
  "isn't included in matching yet" state with a working "View Profile"
  link. All 12 portrait files independently confirmed 200 OK. Zero console
  errors on every checked page.

## Distance to 250

Production: 239 → **251**. Directory-visible: 238 → **250**. Match-eligible:
unchanged at 114.

**250-PERSON ROSTER MILESTONE REACHED** (251 ≥ 250, +1 past). The dedicated
250-person performance checkpoint was explicitly NOT started in this
cycle — it is the next, separate task. Legacy Integrity Batch 6 was
explicitly NOT started either — 22 legacy people remain in the paused
remediation queue, untouched. Roster35 was not started.
