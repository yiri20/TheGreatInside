# Roster38: third fresh cycle after the matching diagnostic (2026-09-23)

Base SHA: `4c862f7f55b13c6cbf179854b6fca5d2d8984ce0` (`ROSTER38_BASE_SHA`,
Roster37's merge commit for PR #47, parents `2a5f6eb9...` [prior main] and
`057656fe...` [Roster37 head]). Starting state, mechanically verified:
production 291, directory-visible 290, match-eligible 114, candidate JSON
355, legacy baseline 22 / 0 flagged. Recent-cohort classification carried
forward: **CONTINUE_EXPANSION_AS_IS** — no architecture change, no
eligibility/matching code change, no repeated root-cause analysis.

Legacy integrity remediation stays paused and untouched (22 pre-pipeline
people, 0 flagged). No Legacy Batch 6 work, no Roster39 work.

## Selection: 15 frozen, 15 shipped, 0 held, 0 backlog reuse

Before fresh selection the 86 candidate files not in production were
inspected mechanically (3 `evidence_approved`, 83 `held`). None saved
time: Naomi Uemura and Anita Roddick were re-searched for portraits the
day before (no new result), Edmund Hillary still lacks an honest Oceania
region (not invented), and the remaining held files are session-11-flagged
evidence-integrity cases, political/military, or low-coverage. All five
known backlog names stay held, untouched. Fresh candidates were
pre-flighted for: no production/candidate duplicate (slug, name, live
Wikidata QID), zero-politics primary identity, a plausible rights-clear
portrait, and plausible independent non-self behavioral sources.

| Slug | fieldIds | Category (by fieldIds) | Recognizability |
|---|---|---|---|
| james-cook | exploration | building_discovery | international |
| thor-heyerdahl | exploration | building_discovery | international |
| george-mallory | exploration | building_discovery | field-famous |
| ayrton-senna | sport | building_discovery | international |
| enzo-ferrari | business, sport | building_discovery | international |
| jeff-bezos (living) | business, technology | building_discovery | international |
| isambard-kingdom-brunel | engineering, technology | science + building_discovery | field-famous |
| konrad-zuse | computing, engineering | building_discovery + science | long-tail |
| alfred-russel-wallace | natural_science, biology, exploration | science + building_discovery | long-tail/historical |
| stanley-kubrick | film | arts_culture | international |
| rembrandt | art | arts_culture | international |
| frank-lloyd-wright | architecture, design | arts_culture | international |
| david-bowie | music | arts_culture | international |
| leonhard-euler | mathematics, physics | science_knowledge | field-famous |
| ernest-rutherford | physics, chemistry | science_knowledge | field-famous |

Mix: **9 international / 4 field-famous / 2 long-tail**. By field
membership (people counted in each category they belong to):
building_discovery 9, arts_culture 4, science_knowledge 5 — building_discovery
lands above the ~7-8 portfolio target because three science/engineering
people (Wallace, Brunel, Zuse) honestly carry an `exploration`/`technology`/
`computing` field; no field was added to reach a category. Zero-politics:
none of the 15 has a political/military/activist/diplomatic primary
identity (Cook is scored as navigator/explorer, not naval command;
Wallace's later advocacy and spiritualism, Rutherford's refugee-committee
work, and Bezos's media-ownership and political controversies were excluded from
scoring).

## Shipped: 15 of 15

Source counts are the candidate files' records minus the Wikipedia/Wikidata
orientation entries; independent perspectives are the researcher-counted
figures (same author = one perspective; a subject's own writings = one
self perspective, never the sole support for a row).

| Slug | Substantive source records | Independent perspectives | Scored rows |
|---|---|---|---|
| james-cook | 10 | 8 authored (7 non-self) | 12 |
| frank-lloyd-wright | 16 | ≥10 non-self | 10 |
| thor-heyerdahl | 13 | 8 | 9 |
| stanley-kubrick | 15 | ≥8 (7 firsthand collaborators) | 12 |
| ayrton-senna | 13 | ≥9 | 7 |
| rembrandt | 8 | 7 authored | 7 |
| george-mallory | 7 | 9 non-self authors | 8 |
| leonhard-euler | 13 | 9 non-self | 10 |
| isambard-kingdom-brunel | 9 | 4 non-self behavioral (the son's *Life* and the DNB add none) | 9 |
| ernest-rutherford | 8 | 6 authorial (≈4-5 conservatively; Eve/Chadwick/Feather overlap) | 11 |
| enzo-ferrari | 13 | 8 | 7 |
| david-bowie | 17 | ≥11 | 9 |
| konrad-zuse | 18 | ≈11 | 9 |
| alfred-russel-wallace | 15 | 5 (Darwin, Lyell/Hooker, Bates, the van Wyhe circle, Osborn) | 8 |
| jeff-bezos | 9 | 9 | 7 |

184 substantive source records in total; every shipped candidate has ≥2
independent provenance perspectives and ≥1 substantive non-self behavioral
source, actually opened/read; Wikipedia was orientation only.

## Pre-commit review corrections (before any eligibility was computed)

Each candidate's researcher report was reviewed against the rubric and a
factual-exactness gate on precise claims. Every scored-row change below
moved a score/confidence *down* or removed a row, and none was made in
response to an eligibility result (eligibility was not computed until all
rows were frozen):

- **RUBRIC_CORRECTION** (rubric §10, `strong_inference` needs ≥2
  independently verifiable episodes): Frank Lloyd Wright `perfectionism`
  strong_inference 0.56 → inference 0.46; Thor Heyerdahl `resourcefulness`
  0.58 → inference 0.48 (second episode rested on an unsigned page);
  Rembrandt `competitiveness` 0.56/70 → inference 0.46/64 (motive read
  from artworks) and `creative_originality` 78 → 70 (rubric §4 band);
  Jeff Bezos `persistence` 0.55/70 → inference 0.46/66 (anonymous-sourced +
  single-source episodes).
- **Row removed**: Ayrton Senna `perfectionism` — both episodes showed anger
  at his own mistakes, which is not the attribute.
- **ERROR_CORRECTION / wording**: James Cook's age at Navy entry removed
  (source says 27, birth-date arithmetic gives 26) and the reef-strike date
  given as 10-11 June (the two journals differ by a day); a
  contested "last film without control" claim removed from Kubrick's
  editorial; an unsupported "only museum / first commission" line removed
  from Wright's; Rembrandt's collection wording aligned to the source; a
  dubious reported dollar figure removed from Bowie's `autonomy_need`
  rationale; a priority-adjacent clause removed from Wallace's
  `creative_originality` rationale. No other score/confidence/evidenceType/
  impact changed.
- Known overlap kept and disclosed: Brunel's atmospheric-railway episode
  supports four rows on four different facets (dissent, reversal, accepted
  responsibility, sustained commitment); Ferrari's 1961 dismissals support
  three.

## Publication vs. eligibility

Publication decisions (`evidence_approved`) were frozen on evidence
quality alone, before eligibility was computed. Eligibility was then read,
not written to: **all 15 are non-match-eligible as an honest evidence
result** (coverage 0.200-0.359 against the 0.6 floor; not targeted, padded,
or rescued for any of them). Roster38 statistics (min / median / max):
rows 7 / 9 / 12, coverage 0.200 / 0.273 / 0.359, high-confidence count
6 / 7 / 12, high-confidence average 0.588 / 0.629 / 0.787, Roster38
eligible N = 0.

## Production, promotion, index

`src/dev/roster1000/generateRoster38.ts` (explicit 15-slug literal
allowlist; `preparePersonSeedForPromotion()` per candidate; never reads
`computedEligibility.eligible`) wrote `src/data/people/roster38.ts`.
`ROSTER_38` wired into `seed.ts` after `ROSTER_37` and registered in the
match-pool lineage audit (`NAMED_ROSTERS`). `peopleIndex.generated.ts`
regenerated (306 entries; diff = the header count line + 15 new entries,
all `isDirectoryVisible: true`, `isMatchEligible: false`). Concise EN/KO
editorial (achievements/moments/turning points, sourced from each
candidate's own sources) was authored for all 15 and passes
`validateEditorial`; 15 `person.name.<slug>` Korean names added. No new
occupation/field/tag/impact vocabulary was needed.

## Production count

| | Before | After |
|---|---|---|
| Production | 291 | **306** |
| Directory-visible | 290 | **305** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 355 | **370** |

## Two DIFFERENT category metrics — reported separately

### A. Published/directory field-category coverage (all people, by `fieldIds` ∩ `PROFESSION_CATEGORIES`)

| Category | Before (291) | After (306) | Delta |
|---|---|---|---|
| science_knowledge | 126 | 131 | +5 |
| arts_culture | 108 | 112 | +4 |
| leadership_society | 77 | 77 | +0 |
| building_discovery | 63 | 72 | +9 |

### B. MATCH-ELIGIBLE interest-scope pools (the 114 eligible people only)

| Category | Before (114) | After (114) | Delta |
|---|---|---|---|
| science_knowledge | 50 | 50 | +0 |
| arts_culture | 43 | 43 | +0 |
| leadership_society | 42 | 42 | +0 |
| building_discovery | 15 | 15 | +0 |

Unchanged, exactly as expected: none of the 15 is match-eligible, so
`results.ranked` and every interest-scope pool are bit-for-bit the same.
Both metrics' "before" columns reproduce the Roster37 checkpoint's numbers
exactly, which is how the derivation was validated.

## Recent-cohort watch (diagnostic-confirmed pattern, not re-analyzed)

Roster38 shipped 15, eligible 0 — a sixth consecutive cycle at 0 newly
eligible. Combined Roster33-38: 14+12+11+14+15+15 = **81** new-candidate
people shipped, **0** match-eligible. Recorded as the expected outcome, not
investigated; no root-cause re-analysis performed here.

## Calibration, dispersion, matching health

`calibrate.ts quiz` was run twice (regenerate, then report). Because the
eligible set is unchanged (114, same people): `dispersion.generated.ts` is
byte-identical to HEAD (same blob hash; meanSd 11.704, N=114); the freshly
proposed MATCH and GREATNESS anchor tables equal the shipped ones with a
max raw delta of 0.0000 (all 13 anchors each) and identical display columns;
match/greatness calibration drift = 0; no refresh; `CALIBRATION_VERSION`
stays `calibration_v3`. Matching health: focused confirmation only — the
full `matching.test.ts` suite (including the "every currently-eligible
profile stays eligible" regression guard) passes. No `simulate.ts` /
`sensitivity.ts` rerun, since the eligible population is literally
unchanged.

## Test/audit-file maintenance (downstream consequences, not new legacy work)

Mechanical count bumps 291→306 / 290→305 following the exact
Roster24-37 pattern: `matchPoolIntegrityAudit.ts` (`ROSTER_38` in
`NAMED_ROSTERS`), its test (counts and lineage regex to `roster38`),
`matching.test.ts` and `profilePublicationSeparation.test.ts` (the 15 new
non-eligible slugs added to the deliberately-divergent lists),
`akiraKurosawaRemediation.test.ts`, `legacyIntegrityBatch2-5Remediation.test.ts`,
`roster33-37.test.ts`, and `e2e/peopleDirectory.spec.ts` (the live-count
assertions 290→305 and the Korean "전체 306명 중 9명"). The cross-facet
curiosity+collaboration filter count stays 9: verified mechanically with the
Directory's own `filterPeople` and fixed thresholds, none of the 15 crosses
both. No legacy person's behavioral data was touched.

## New Roster38 test file

`src/dev/roster1000/audits/roster38.test.ts` — table-driven, 15 shipped ×
9 checks (candidate exists/status; candidate↔production row-tuple
equality; identity/QID/name/living; publication state; *actual* computed
eligibility; portrait readiness incl. the local asset existing; Korean
display name equal to the candidate's; `PEOPLE_INDEX` agreement), plus a
held/backlog-absent block and cross-target integrity (no duplicate
id/slug/QID across 306; 306/306 index agreement; the pre-existing
eligible set is exactly 114 outside the 15 targets). It deliberately does
**not** assert that every addition is non-eligible. 142 tests.

## Portraits and rights notes (every portrait: actual page, exact license, real download, dimensions checked, 200 on the production server)

| Slug | Portrait | License | Note |
|---|---|---|---|
| james-cook | Dance-Holland 1776 (NMM) | Public domain | painted from life |
| frank-lloyd-wright | Al Ravenna 1954 (LOC NYWTS) | PD (no known restrictions) | |
| thor-heyerdahl | Al Ravenna 1951 (LOC NYWTS) | PD (no known restrictions) | |
| stanley-kubrick | Harrington 1949 (LOC LOOK) | PD (Commons PD-Look) | LOC record carries "Publication may be restricted" and a Cowles no-advertising request; Harrington's staff status in 1949 not confirmable — basis judged sound, caveats in the candidate notes |
| ayrton-senna | Martin Lee 1993 | CC BY-SA 2.0 | Flickr review verified |
| rembrandt | 1659 self-portrait (NGA) | PD (author d. 1669) | self-portrait, stated as such |
| george-mallory | 1925 book plate | PD (published 1925) | US pre-1931 rule; uncredited photographer |
| leonhard-euler | Handmann 1753 pastel | PD | medium/date corrected from the brief's lead |
| isambard-kingdom-brunel | Howlett 1857 (Met Open Access) | CC0 | |
| ernest-rutherford | LOC Bain | PD (LOC: no known restrictions) | date unrecorded |
| enzo-ferrari | c.1920 at the wheel | PD (PD-Italy/PD-1996) | photographer/date from the Commons uploader |
| david-bowie | Tony Barnard 1974 (LA Times/UCLA) | CC BY 4.0 | full-length stage shot |
| konrad-zuse | Wolfgang Hunscher 1992 | CC BY-SA 3.0 | small (354×472): the only rights-clear single-subject option |
| alfred-russel-wallace | LSCP c.1895 | PD | published 1896 |
| jeff-bezos | Seattle City Council 2018 | CC BY 2.0 | tight mid-speech crop |

Region note: Rutherford (NZ-born, career in Canada/England) is
`western_europe` with `nationalityCodes` NZ+GB; this is *not* the Hillary
Oceania gap — precedent for émigré scientists is mixed (Bell
north_america, Lamarr and Einstein western_europe) and the region here
follows where the work was done. Korean-name note: Senna is 아일톤 세나 (common
media spelling; the Korean Wikipedia title/Wikidata label is 아이르통 세나).

## Validation

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: **370 candidates, 0 errors, 0 warnings** (by
  status: `qa_passed` 93, `evidence_approved` 194, `held` 83).
- `checkScoringLockIntegrity.ts`, pre-commit: "Checked 355
  previously-committed candidate file(s) against HEAD. 0 flagged." Legacy:
  22 covered, 0 flagged. The post-commit literal output is recorded in the
  docs follow-up commit (see below).
- `vitest run`: **68 files, 1713 tests, all passed** (incl. the 142-test
  `roster38.test.ts`, `validateEditorial`, and the KO coverage guards).
- `next build --webpack`: succeeded, **636 static/SSG paths**
  (2×306+24, the established formula) — no build regression observed.
- Focused Playwright (`peopleDirectory`, `person.visual`, `editorial`,
  `compare.visual`): **128/128 passed** against a fresh production build.
  (The fresh worktree needed a git-ignored `.env.local` carrying only the
  two `NEXT_PUBLIC_*` Supabase variables to start the production server;
  no secret key was copied.)
- Manual verification on the production server: James Cook
  (building_discovery), Stanley Kubrick (arts_culture), Leonhard Euler
  (science_knowledge), David Bowie (KO, fully localized, non-eligible
  notice in Korean), Ayrton Senna at a true 375px viewport (no horizontal
  overflow, portrait + CC BY-SA credit correct), and
  `/compare/james-cook` (graceful "isn't included in matching yet" with a
  working View Profile link, no internal terms leaked); zero console errors
  throughout. All 15 portraits return 200 `image/jpeg`; a sweep of all 30
  rendered pages (15 people × en/ko) found no missing section, attribution,
  notice or untranslated key. No match-eligible new profile exists to
  spot-check. No genuine product defect was found or fixed.

## Confirmations

No architecture/matching diagnostic was repeated. No 250-person (or other)
performance benchmark, similarity benchmark, route-payload benchmark, or
portrait-storage audit was run — only build success and the static path
count were recorded. No eligibility padding or rescue for any candidate. The
legacy lane stayed paused (Legacy Integrity Batch 6 not started). Roster39
was NOT started.
