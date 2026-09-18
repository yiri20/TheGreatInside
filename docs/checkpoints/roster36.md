# Roster36: first fresh cycle after the recent-cohort matching diagnostic (2026-09-17)

Base SHA: `4b2033fa42372401e72f17d1e1df2021e8bbd10e` (`ROSTER36_BASE_SHA`,
the recent-cohort publication-vs-matching architecture diagnostic's merge
commit, parents `965f810a...` [prior main, Roster35] and `de24c926...`
[diagnostic head]). Production count before this cycle: 262. Diagnostic
classification carried into this cycle: **CONTINUE_EXPANSION_AS_IS** — no
architecture change, no eligibility/matching code change, no research
protocol experiment. Full diagnostic record:
`docs/checkpoints/recent-cohort-matching-architecture.md`.

Continues the new-candidate roster-expansion lane (roster24-35). Legacy
integrity remediation stays paused and untouched — confirmed via
`checkScoringLockIntegrity.ts` (22 pre-pipeline people, 0 flagged, both
pre- and post-commit). The recent-cohort diagnostic was explicitly NOT
repeated this cycle, per its own instruction.

## Selection: 15 frozen, 14 shipped, 1 held this cycle + 4 backlog re-checks

All 15 were freshly researched this cycle (zero backlog reuse) after a
mechanical backlog inspection found the existing held pool offered no
cheaper path: Edmund Hillary remains blocked by the same Oceania-region
taxonomy gap (re-verified — no region added since Roster35); Anita
Roddick received the one permitted bounded portrait retry and it found
nothing new (Commons re-searched: still only the same unusable group
photo; UK National Portrait Gallery checked, blocked/not open-licensed
regardless); Simone de Beauvoir and Mimar Sinan's evidence-quality defect
(output-based `inference` rows from a prior audit-flagged batch) was
re-confirmed unrepaired and genuinely out of scope for a reuse-cheaper-
than-fresh-research bar. All four remain held, untouched, not silently
discarded.

| Slug | Fields | Recognizability | Category | Outcome |
|---|---|---|---|---|
| bessie-coleman | exploration | international | building_discovery | shipped |
| valentina-tereshkova | exploration | international | building_discovery | shipped |
| margaret-hamilton | computing | field-famous | building_discovery | shipped |
| robert-noyce | technology, engineering | field-famous | building_discovery | shipped |
| soichiro-honda | engineering, business | international | building_discovery | shipped |
| milton-hershey | business | field-famous | building_discovery | shipped |
| naomi-uemura | exploration | field-famous | building_discovery | **held** — portrait gate |
| pina-bausch | dance | field-famous | arts_culture | shipped |
| ansel-adams | art, environmental_science | international | arts_culture | shipped |
| edith-piaf | music | international | arts_culture | shipped |
| gordon-parks | art, journalism | field-famous | arts_culture | shipped |
| tu-youyou | chemistry, medicine | field-famous | science_knowledge | shipped |
| lise-meitner | physics | field-famous | science_knowledge | shipped |
| ada-yonath | chemistry, biology | field-famous | science_knowledge | shipped |
| henrietta-swan-leavitt | natural_science | long-tail/historical | science_knowledge | shipped |

Domain contribution to the 14 shipped: **building_discovery 6**
(Coleman, Tereshkova, Hamilton, Noyce, Honda, Hershey), **arts_culture 4**
(Bausch, Adams, Piaf, Parks), **science_knowledge 4** (Tu Youyou, Meitner,
Yonath, Leavitt) — matches the ~7/4/4 target closely (building_discovery
fell one short of ~7 solely because Naomi Uemura, its 7th intended
candidate, was held on the portrait gate, not because the domain wasn't
targeted). Recognizability: 5 international, 7 field-famous, 1
long-tail/historical, plus Naomi Uemura (field-famous, held). Zero-politics
screen: no primary political/state/military/activist identity among any
of the 15 — confirmed at selection and unchanged by outcome.

## Naomi Uemura: portrait gate, not evidence

`evidence_approved`, 6 rows, 4 substantive independent sources (TIME 1978,
American Alpine Club 1985 institutional account, National Geographic,
Smithsonian NASM collection record). Two independent, bounded Commons
searches (agent research pass + my own follow-up verification) both found
only memorial plaques, his grave marker, and expedition equipment — no
actual photograph of him exists on Wikimedia Commons, consistent with
Japanese press-photo copyright terms not yet having lapsed for a 1984
death. Held, not worked around with a lower-quality substitute; reusable
immediately if a rights-clear photograph is ever found.

## Shipped: 14 of 15 frozen

| Slug | Sources | Rows | Independent perspectives (non-self behavioral) |
|---|---|---|---|
| bessie-coleman | 4 | 7 | Amy Sue Bix's NASA-published scholarly essay (SP-2005-4112) + Texas State Historical Association Handbook of Texas Online, both fully read |
| valentina-tereshkova | 9 | 6 | Nikolai Kamanin's diaries (near-primary, programmatically searched for every dated entry) + Ben Evans/AmericaSpace + NASA History Office + RFE/RL + russianspaceweb.com |
| margaret-hamilton | 7 | 5 | NASA's 2003 Exceptional Space Act Award account (named officials quoted) + White House 2016 Medal of Freedom citation + MIT News |
| robert-noyce | 9 | 8 | Tom Wolfe's 1983 Esquire profile (full text) + Leslie Berlin's biography + Michael Malone's *The Intel Trinity* + Arthur Rock's own funding memo + Computer History Museum patent archive + Noyce's 1975 IEEE oral history |
| soichiro-honda | 7 | 10 | Honda Motor's official corporate history (5 episode pages read) + ASME + EBSCO + Tetsuo Sakiya's biography (via a directly-read secondary account) + Roadracing World Magazine |
| milton-hershey | 4 | 8 | Hershey Community Archives (institution, used cautiously as subject-affiliated) + American Business History Center essay (independent, drawing on D'Antonio's scholarly biography) |
| pina-bausch | 5 | 7 | Deirdre Mulrooney's academic thesis chapter + Pina Bausch Foundation archival interview (dancer Josephine Ann Endicott) + independent academic-journal interview (founding dancer Dominique Mercy) |
| ansel-adams | 8 | 6 | EBSCO + NPCA on the Kings Canyon congressional lobbying campaign + Santa Clara University Environmental Ethics + TheCollector on the Zone System + Ansel Adams Gallery archive + Center for Photographic Art (former student Ted Orland) |
| edith-piaf | 7 | 5 | Carolyn Burke's *No Regrets* biography (via review) + NPR-affiliate obituary quoting Burke + Charles Aznavour's own testimony + dated Oct. 1960 audition reporting + Montand-mentorship reporting |
| gordon-parks | 8 | 10 | Gordon Parks Foundation institutional archive (4 pages) + independent press (TIME/curator Russell Lord) + a separate 2011 firsthand interview with lead actor Kyle Johnson |
| tu-youyou | 7 | 7 | Nobel Committee Facts page + Lasker Foundation + a JCI/PMC scholarly piece + independent Caixin/Slate journalism quoting named colleagues on the credit controversy |
| lise-meitner | 6 | 6 | Chemistry World/Mike Sutton + APS News + Atomic Heritage Foundation/National Museum of Nuclear Science & History (reproducing Otto Frisch's own firsthand account of the Dec. 1938 walk in the snow) |
| ada-yonath | 7 | 6 | Two NobelPrize.org pages + Weizmann Institute American Committee feature + C&EN/ACS obituary + NYT obituary (named quotes from Venki Ramakrishnan and former student Miri Krupkin) |
| henrietta-swan-leavitt | 8 | 5 | Solon Bailey's 1922 Popular Astronomy obituary (full original scanned journal) + three Wolbach Library/CfA institutional pages built from her actual notebooks and 1902 Pickering correspondence + CfA news retrospective |

Every shipped candidate carries ≥2 independent provenance perspectives and
≥1 non-self behavioral source. Wikipedia used for orientation only
throughout, never as scored evidence. Two evidence-discipline findings
worth flagging: Tu Youyou's celebrated self-testing claim could not be
independently corroborated this cycle (the Lasker Foundation's own account
stops short of naming her among the early self-test group), so that row
was deliberately capped at `strong_inference`/moderate confidence rather
than accepted at face value; Henrietta Swan Leavitt's health/hearing-loss/
early-death facts were deliberately excluded from every rationale, per the
health/private-life discipline.

## Publication vs. eligibility

Publication decisions (`evidence_approved`) were frozen on evidence
quality alone, before eligibility was computed, for all 14. All 14 became
non-match-eligible **as an honest result of evidence-grounded scoring;
eligibility was not targeted, padded, or rescued for any of them.** Row
counts range 5-10. No score/confidence was adjusted after seeing an
eligibility computation for any of the 14. This is the expected,
architecturally-anticipated outcome the recent-cohort diagnostic already
confirmed is healthy, not a defect — see that diagnostic's
`CONTINUE_EXPANSION_AS_IS` classification.

## Production, promotion, index

`src/dev/roster1000/generateRoster36.ts` (explicit 14-slug literal
allowlist; documents Naomi Uemura's hold in its header comment; calls
`preparePersonSeedForPromotion()`/`checkPromotionReadiness()` per
candidate; never reads `computedEligibility.eligible`) wrote
`src/data/people/roster36.ts`. `ROSTER_36` wired into `seed.ts` following
the `ROSTER_35` pattern. `peopleIndex.generated.ts` regenerated (276
entries).

## Two DIFFERENT category metrics — reported separately

### A. Published/directory field-category coverage (NOT the matching pools)

All 276 production people, `fieldIds` intersected against
`PROFESSION_CATEGORIES`:

| Category | Before (262) | After (276) | Delta |
|---|---|---|---|
| science_knowledge | 107 | 115 | +8 |
| arts_culture | 99 | 103 | +4 |
| leadership_society | 74 | 76 | +2 |
| building_discovery | 50 | 56 | +6 |

(leadership_society's +2 is a genuine secondary-field contribution, not a
zero-politics violation: Bessie Coleman's `civil_rights` fieldId reflects
her historic barrier-breaking as a Black/Native American aviator, and
Milton Hershey's `education` fieldId reflects the Milton Hershey School —
neither is a primary political/activist identity, and the zero-politics
screen governs primary identity, not every secondary field tag, exactly
as this project's precedent already established for Neruda/Shaw in
Roster32.)

### B. MATCH-ELIGIBLE interest-scope pools (the actual `interestScope.ts` population)

Mechanically derived from the 114 match-eligible people only, at base
(`4b2033f`) and at head:

| Category | Before (114) | After (114) | Delta |
|---|---|---|---|
| science_knowledge | 50 | 50 | +0 |
| arts_culture | 43 | 43 | +0 |
| leadership_society | 42 | 42 | +0 |
| building_discovery | 15 | 15 | +0 |

**Unchanged, exactly as expected**: all 14 Roster36 people are
non-match-eligible, so `results.ranked` — and every interest-scope pool a
user can be routed into via `selectInterestMatch()` — is bit-for-bit the
same population before and after this PR.

## Recent-cohort watch (diagnostic-confirmed pattern, not re-analyzed)

Roster36 shipped 14, eligible 0 — a fourth consecutive cycle at 0 newly
eligible. Combined Roster33+34+35+36: 14+12+11+14 = **51 new-candidate
people** shipped across four cycles, **0** of whom are match-eligible.
Per the recent-cohort diagnostic's own explicit instruction, this is
recorded as the expected outcome, not re-investigated: the diagnostic
already established that `eligibility_v2`'s coverage floor is the
universally binding gate for this evidence-grounded pipeline's typical
6-10-row profiles, that publication is deliberately decoupled from
eligibility by design, and that the 114-person matching pool remains a
healthy, separate product surface. **No root-cause re-analysis performed
here.**

## Calibration, dispersion, matching health

`corepack pnpm@10 exec tsx src/dev/calibrate.ts quiz` run twice
(regenerate, then report). Both MATCH and GREATNESS anchor tables came
back **bit-identical** to the Roster35-shipped values — zero drift,
because the match-eligible cohort used for calibration is unchanged (114,
same people). `CALIBRATION_VERSION` stays `calibration_v3`; no refresh,
no version bump. Matching health: focused confirmation only (eligible
population literally unchanged) — the full `matching.test.ts` suite (58
tests, including the "every currently-eligible profile stays eligible"
regression guard) passes clean. No `simulate.ts`/`sensitivity.ts` rerun.

## Legacy lane (unchanged, confirmed)

`checkScoringLockIntegrity.ts` pre-commit: 325 previously-committed
candidate files, 0 flagged (the 15 new Roster36-cycle files — 14 shipped
plus Naomi Uemura held — weren't committed yet). Post-commit re-run (see
Verification below) checked the full new committed count. Legacy: 22
pre-pipeline production people, 0 flagged throughout. No legacy person's
rows, status, or eligibility changed; no Legacy Integrity Batch 6 work
started.

## Test/audit-file maintenance (downstream consequences, not new legacy work)

Mechanical count bumps, following the exact pattern every roster24-35
cycle used:

- `matchPoolIntegrityAudit.ts`: added `ROSTER_36` to `NAMED_ROSTERS`.
- `matchPoolIntegrityAudit.test.ts`: counts 262→276 / 261→275, lineage
  regex extended to accept `roster36`.
- `matching.test.ts`, `profilePublicationSeparation.test.ts`
  (`knownNonEligible`/`KNOWN_DIVERGENT_SLUGS` sets): the 14 new
  non-eligible slugs added to the "deliberately divergent" exclusion
  lists.
- `akiraKurosawaRemediation.test.ts`, `legacyIntegrityBatch2-5Remediation.test.ts`,
  `roster33.test.ts`, `roster34.test.ts`, `roster35.test.ts`: each has its
  own `SEED_PEOPLE`/`PEOPLE_INDEX` length assertion; bumped 262→276.
- `e2e/peopleDirectory.spec.ts`: the live-count assertion (261→275
  people). The cross-facet curiosity+collaboration filter assertion
  needed only a total-count bump (262→276), no content change this
  cycle: none of the 14 new people scored a `curiosity` row at all
  (three do clear the `collaboration` floor alone — Pina Bausch,
  Soichiro Honda, Robert Noyce — but that alone is insufficient), so the
  filtered count of 8 is genuinely unaffected.
- Korean localization (`ko.ts`/`en.ts`): 14 new `person.name.<slug>` keys
  added; two genuinely new vocabulary entries, `occupation.aviator`
  (Bessie Coleman — no existing occupation id fit) and `tag.mentor`
  (Édith Piaf's documented mentorship of Aznavour/Montand/Moustaki/
  Constantine — no existing tag fit), added in both languages. All other
  occupation/field/tag ids used across the 14 already existed.

No legacy person's behavioral data was touched by any of the above.

## New Roster36 test file

`src/dev/roster1000/audits/roster36.test.ts` — table-driven, 14 shipped
candidates × 9 checks (plus a held-candidates block and cross-target
integrity block; 135 tests total): candidate-file existence/status,
candidate↔production row-tuple equality, identity/QID agreement,
publication state, actual computed eligibility (not a hardcoded "all
false"), portrait readiness, Korean display-name coverage, `PEOPLE_INDEX`
agreement — plus dedicated sub-suites confirming all 5 held candidates
(Naomi Uemura plus the 4 re-checked backlog holds) are genuinely absent
from production with the correct file-level status/portrait state per
person, and cross-target checks (no duplicate id/slug/QID across all 276
people, match-eligible-114-unchanged check).

## Verification

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: **325 candidates loaded pre-commit; 340
  post-commit**, **0 errors, 0 warnings** both times, 0 quality-gate
  failures across the entire pool.
- `checkScoringLockIntegrity.ts`, pre-commit: "Checked 325
  previously-committed candidate file(s) against HEAD. 0 flagged."
  Post-commit output recorded below. Legacy: 22 covered, 0 flagged, both
  times.
- `vitest run`: **66 files, 1427 tests, all passed** (including the new
  135-test `roster36.test.ts`).
- `next build --webpack`: succeeded, **576 static/SSG paths**
  (2×276+24, the same empirically-derived formula used every prior
  cycle).
- Focused Playwright (`peopleDirectory.spec.ts`, `person.visual.spec.ts`,
  `editorial.spec.ts`, `compare.visual.spec.ts`): **128/128 passed**
  against a fresh production build.
- Manual verification (production build, `next start`): Soichiro Honda
  (building_discovery, en-US) — portrait 200 OK, correct non-eligible
  notice, trait cards render, full source list with real citations, zero
  console errors; Ansel Adams (arts_culture) — clean, zero console
  errors; Lise Meitner (science_knowledge, ko-KR) — full Korean UI,
  correct occupation label ("물리학자"), correct portrait attribution,
  all trait rows in Korean, zero console errors; Bessie Coleman at 375px
  mobile — clean layout, correct "AVIATOR" occupation label (confirming
  the new translation displays correctly), zero console errors;
  `/compare/soichiro-honda` (a freshly-generated synthetic quiz token,
  verification-only) — correctly shows the "isn't included in matching
  yet" state with a working "View Profile" link, zero console errors.
  All 14 shipped portrait files independently confirmed 200 OK. No
  product-surface defects (empty sections, broken portraits,
  untranslated vocabulary) found this cycle — the Roster35 empty-Trait-
  Constellation guard was not touched, and no new instance of that
  condition occurred (every Roster36 person has at least one row above
  the 0.5 display-confidence floor).

## Production count

Production: 262 → **276**. Directory-visible: 261 → **275**.
Match-eligible: unchanged at 114 (fourth consecutive cycle; see the
recent-cohort watch above — diagnostic-confirmed expected behavior, not
re-investigated).

Combined Roster33+34+35+36 total: 14 + 12 + 11 + 14 = **51 new-candidate
people** shipped across four cycles; 0 of the 51 are match-eligible.

Roster37 was NOT started. Legacy Integrity Batch 6 was NOT started — 22
legacy people remain in the paused remediation queue, untouched. The
recent-cohort matching architecture diagnostic was NOT repeated. The
250-person performance benchmark was NOT repeated.
