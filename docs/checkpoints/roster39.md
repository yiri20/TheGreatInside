# Roster39: fourth fresh cycle after the matching diagnostic (2026-09-26)

Base SHA: `c4c51b29eff84d920b488d684b70a8859fd87e2c` (`ROSTER39_BASE_SHA`,
Roster38's merge commit for PR #49, parents `4c862f7f...` [prior main] and
`c4d2c1ff...` [Roster38 head]). Starting state, mechanically verified:
production 306, directory-visible 305, match-eligible 114, candidate JSON
370, legacy baseline 22 / 0 flagged. Recent-cohort classification carried
forward: **CONTINUE_EXPANSION_AS_IS** — no architecture change, no
eligibility/matching code change, no repeated root-cause analysis.

Before this cycle started, PR #49 was merged with a normal merge commit
(head-guarded on `c4d2c1ff...`, Vercel SUCCESS, exactly two parents). One
bounded re-check of the Kubrick portrait on the live Commons page found the
same facts the Roster38 record relied on (Harrington, LOOK staff
photographer 1949–1971; dated 1949; LOOK Magazine Photograph Collection;
Cowles released its copyright; `PD-Look`; the trade/advertising note is a
non-copyright personality-rights caution), so it stayed.

Legacy integrity remediation stays paused and untouched (22 pre-pipeline
people, 0 flagged). No Legacy Batch 6 work, no Roster40 work.

## Selection: 15 frozen, 15 shipped, 0 held, 0 backlog reuse

The 86 candidate files not in production (3 `evidence_approved`, 83 `held`)
were inventoried mechanically once. The five known blockers (Naomi Uemura,
Anita Roddick, Edmund Hillary, Simone de Beauvoir, Mimar Sinan) were **not**
retried — no concrete new signal — and stay held, untouched. The other
backlog files were screened for viability (evidence-integrity holds,
political/military identity, low coverage, portrait/region blockers) and
none was worth reusing, so all 15 are fresh. Fresh candidates were
pre-flighted for: no production/candidate duplicate (slug, name, live
Wikidata QID), zero-politics primary identity, a plausible rights-clear
portrait (exact source/page/license), and plausible independent non-self
behavioral sources. One pre-freeze swap: Orson Welles → Buster Keaton (the
Welles portrait rested on a Library of Congress "believed" public-domain
statement plus an estate request against cropping).

| Slug | fieldIds | Category (by fieldIds) | Recognizability |
|---|---|---|---|
| johan-cruyff | sport | building_discovery | international |
| niki-lauda | sport, business | building_discovery | international |
| babe-ruth | sport | building_discovery | international |
| j-p-morgan | business | building_discovery | international |
| james-watt | engineering, technology | science + building_discovery | international |
| robert-goddard | engineering, physics, technology | science + building_discovery | field-famous |
| philo-farnsworth | technology, engineering | science + building_discovery | long-tail |
| frederic-chopin | music | arts_culture | international |
| buster-keaton | film | arts_culture | international |
| christopher-wren | architecture, natural_science | arts + science | field-famous |
| george-frideric-handel | music | arts_culture | international |
| joseph-lister | medicine, biology | science_knowledge | field-famous |
| rene-descartes | philosophy, mathematics, natural_science | science_knowledge | international |
| antonie-van-leeuwenhoek | biology, natural_science | science_knowledge | long-tail |
| william-herschel | natural_science, music | science + arts | field-famous |

Mix: **9 international / 4 field-famous / 2 long-tail**. By field
membership (people counted in each category they belong to):
building_discovery 7, arts_culture 5, science_knowledge 8 — the science
count sits above the ~4 target because engineering (Watt, Goddard,
Farnsworth, Wren) and natural_science honestly count there; the fields were
set by what each scored row rests on, none was added to reach a category
(Herschel's `music` field rests on his twenty-year music career, which
supports his `cross_domain_range` row). All 15 are deceased. Zero-politics:
none has a political/military/activist/diplomatic primary identity
(Wren's parliamentary seat, Leeuwenhoek's Delft offices, and Descartes's
youthful soldiering are incidental and unscored). One QID correction
during research: the lead QID supplied for Leeuwenhoek pointed to an
unrelated entity; the verified live QID is Q43522.

## Shipped: 15 of 15

Source counts are the candidate files' records minus the Wikipedia/Wikidata
orientation entries; independent perspectives are the researcher-counted
figures (same author = one perspective; a subject's own writings = one
self perspective, never the sole support for a row).

| Slug | Substantive source records | Independent perspectives | Scored rows |
|---|---|---|---|
| johan-cruyff | 14 | ≥9 non-self + 3 firsthand (Dutch-football historiography overlaps) | 8 |
| niki-lauda | 21 | ≥12 non-self | 9 |
| babe-ruth | 11 | 9 (Wood/McMurray/Brown lean on Montville/Creamer) | 4 |
| j-p-morgan | 10 | 8 (Brands/Hovey and the Steel episodes overlap) | 5 |
| james-watt | 7 | ≈6 (Robison/Black are interested friends; Brougham derivative) | 12 |
| robert-goddard | 11 | ≈6 | 8 |
| philo-farnsworth | 10 | ≈3 (family-derived; no adversarial source) | 9 |
| frederic-chopin | 7 | 5 (Hiller, Delacroix friends of the subject) | 7 |
| buster-keaton | 13 | 12 secondary (common root in the memoir) | 7 |
| christopher-wren | 6 | 6 (Evelyn, Aubrey friendly; Hooke interested) | 9 |
| george-frideric-handel | 19 | 12 cited (Handel Reference Database as transcription vehicle) | 7 |
| joseph-lister | 9 | 6 scholarly (five from one 2013 centenary issue) + insider Godlee | 7 |
| rene-descartes | 8 | 5 primary non-self + 3 scholars | 5 |
| antonie-van-leeuwenhoek | 8 (6 carry rows) | 4 (Royal Society minutes incl. Molyneux visit, witness statements, Cocquyt 2021, Dobell) | 6 |
| william-herschel | 5 | 4 (Dreyer, contemporaries' letters, Clerke; Caroline is insider) | 8 |

159 substantive source records in total; every shipped candidate has ≥2
independent provenance perspectives and ≥1 substantive non-self behavioral
source, actually opened/read; Wikipedia was orientation only. Where
independence was weak (Farnsworth, Descartes, Leeuwenhoek, Herschel, Lister,
Keaton) the rows say so and stay `strong_inference`/`inference` at moderate
confidence.

## Pre-commit review corrections (before any eligibility was computed)

Each candidate's researcher report was reviewed against the rubric and a
factual-exactness gate. Every scored-row change below moved a
score/confidence *down* (or relabelled/hedged), and none was made in
response to an eligibility result (eligibility was not computed until all
rows and the publication decision were frozen):

- **RUBRIC_CORRECTION**: Leeuwenhoek `autonomy_need` 82/0.76 → 78/0.70
  (motive undocumented; two visitor items reach the profile via Dobell's
  translations). Herschel `experimentation` 78/0.70 → 76/0.66,
  `persistence` 78/0.66 → 76/0.62, `resourcefulness` 76/0.66 → 74/0.62
  (episodes rest on his own records as read by one scholar). James Watt:
  six rows re-labelled with RUBRIC_CORRECTION text appended to the
  rationales. Robert Goddard `collaboration` rescored to 32/0.62
  `strong_inference`; J. P. Morgan `leadership_drive` rationale trimmed of
  an evaluative clause.
- **Editorial fact/wording corrections**: Lister's age at the 1877 move
  (50, not 51); an unverified "seven sets of objections" count removed from
  Descartes's Meditations entry; dollar figures removed from Keaton's
  editorial; an evaluative Sprague sentence removed from Morgan's
  editorial; Goddard's collaboration interpretation reworded.
- **Portrait corrections** (see the rights table): Babe Ruth's Wikidata
  image (`PD-old-auto|1945` against a photographer who died 1968) replaced
  by a 1920 registered Library of Congress studio portrait; Watt's and
  Herschel's Wikidata images rejected because their Commons pages carry an
  unresolved third-party (NPG) reproduction claim; Lister's Wellcome image
  rejected because Wellcome itself marks it "In copyright".
- Farnsworth's identity in the yearbook portrait was checked by side-by-side
  comparison with a 1939 photograph.

## Publication vs. eligibility

Publication decisions (`evidence_approved`) were frozen on evidence quality
alone, before eligibility was computed. Eligibility was then read, not
written to: **all 15 are non-match-eligible as an honest evidence result**
(coverage 0.120-0.364 against the 0.6 floor; not targeted, padded, or
rescued for any of them). Roster39 statistics (min / median / max): rows
4 / 7 / 12, coverage 0.120 / 0.210 / 0.364, high-confidence count
3 / 7 / 11, high-confidence average 0.535 / 0.618 / 0.690, Roster39
eligible N = 0.

## Production, promotion, index

`src/dev/roster1000/generateRoster39.ts` (explicit 15-slug literal
allowlist; `preparePersonSeedForPromotion()` per candidate; never reads
`computedEligibility.eligible`) wrote `src/data/people/roster39.ts`.
`ROSTER_39` wired into `seed.ts` after `ROSTER_38` and registered in the
match-pool lineage audit (`NAMED_ROSTERS`). `peopleIndex.generated.ts`
regenerated (321 entries; diff = the header count line + 15 new entries,
all `isDirectoryVisible: true`, `isMatchEligible: false`; no unrelated
drift). Concise EN/KO editorial (achievements/moments/turning points,
sourced from each candidate's own sources) was authored for all 15 and
passes `validateEditorial`; 15 `person.name.<slug>` Korean names added. No
new occupation/field/tag/impact vocabulary was needed.

## Production count

| | Before | After |
|---|---|---|
| Production | 306 | **321** |
| Directory-visible | 305 | **320** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 370 | **385** |

## Two DIFFERENT category metrics — reported separately

### A. Published/directory field-category coverage (all people, by `fieldIds` ∩ `PROFESSION_CATEGORIES`)

| Category | Before (306) | After (321) | Delta |
|---|---|---|---|
| science_knowledge | 131 | 139 | +8 |
| arts_culture | 112 | 117 | +5 |
| leadership_society | 77 | 77 | +0 |
| building_discovery | 72 | 79 | +7 |

### B. MATCH-ELIGIBLE interest-scope pools (the 114 eligible people only)

| Category | Before (114) | After (114) | Delta |
|---|---|---|---|
| science_knowledge | 50 | 50 | +0 |
| arts_culture | 43 | 43 | +0 |
| leadership_society | 42 | 42 | +0 |
| building_discovery | 15 | 15 | +0 |

Unchanged, exactly as expected: none of the 15 is match-eligible, so
`results.ranked` and every interest-scope pool are bit-for-bit the same.
Both metrics' "before" columns reproduce the Roster38 checkpoint's numbers
exactly, which is how the derivation was validated.

## Recent-cohort watch (diagnostic-confirmed pattern, not re-analyzed)

Roster39 shipped 15, eligible 0 — a seventh consecutive cycle at 0 newly
eligible. Combined Roster33-39: 14+12+11+14+15+15+15 = **96** new-candidate
people shipped, **0** match-eligible. Recorded as the expected outcome, not
investigated; no root-cause re-analysis performed here.

## Calibration, dispersion, matching health

`calibrate.ts quiz` was run twice (regenerate, then report). Because the
eligible set is unchanged (114, same people): `dispersion.generated.ts` is
byte-identical to HEAD (same blob hash; meanSd 11.704, N=114); the freshly
proposed MATCH and GREATNESS anchor tables equal the shipped ones with a
max raw delta of 0.0000 (all 13 anchors each) and identical display
columns; match/greatness calibration drift = 0; no refresh;
`CALIBRATION_VERSION` stays `calibration_v3`. Matching health: focused
confirmation only — the full `matching.test.ts` suite (including the
"every currently-eligible profile stays eligible" regression guard)
passes. No `simulate.ts` / `sensitivity.ts` rerun, since the eligible
population is literally unchanged.

## Test/audit-file maintenance (downstream consequences, not new legacy work)

Mechanical count bumps 306→321 / 305→320 following the exact
Roster24-38 pattern: `matchPoolIntegrityAudit.ts` (`ROSTER_39` in
`NAMED_ROSTERS`), its test (counts and lineage regex to `roster39`),
`matching.test.ts` and `profilePublicationSeparation.test.ts` (the 15 new
non-eligible slugs added to the deliberately-divergent lists),
`akiraKurosawaRemediation.test.ts`, `legacyIntegrityBatch2-5Remediation.test.ts`,
`roster33-38.test.ts`, and `e2e/peopleDirectory.spec.ts` (the live-count
assertions 305→320 and the Korean "전체 321명 중 9명"). The cross-facet
curiosity+collaboration filter count stays 9: verified mechanically with
the Directory's own `filterPeople` and fixed thresholds, none of the 15
crosses both. No legacy person's behavioral data was touched.

## New Roster39 test file

`src/dev/roster1000/audits/roster39.test.ts` — table-driven, 15 shipped ×
10 checks (candidate exists/status; candidate↔production row-tuple
equality; identity/QID/name/living; publication state; *actual* computed
eligibility; portrait readiness incl. the local asset existing; Korean
display name equal to the candidate's; **EN+KO editorial coverage** — every
text/interpretation key resolves in both locales and every source and trait
reference is real; `PEOPLE_INDEX` agreement), plus a backlog-blockers-absent
block and cross-target integrity (no duplicate id/slug/QID across 321;
321/321 index agreement; the pre-existing eligible set is exactly 114
outside the 15 targets). It deliberately does **not** assert that every
addition is non-eligible. 157 tests.

## Portraits and rights notes (every portrait: actual page, exact license, real download, dimensions checked, 200 on the production server)

| Slug | Portrait | License | Note |
|---|---|---|---|
| johan-cruyff | Mieremet / Anefo 1974 (Nationaal Archief) | CC0 1.0 | |
| niki-lauda | van Dijk / Anefo 1982 (Nationaal Archief) | CC0 1.0 | |
| babe-ruth | Irwin, La Broad & Pudlin 1920 (LOC) | PD (US, 1920 publication; © entry on record) | replaces a Wikidata image with an inconsistent basis |
| j-p-morgan | Frank Holl 1888 oil (Morgan Library) | PD (artist d. 1888) | commissioned by Morgan |
| james-watt | Raeburn 1815 (Huntington), photo by Daderot | CC0 photo; painting PD | claim-free alternative to NPG-hosted images |
| robert-goddard | Bain News Service c.1915-20 (LOC) | PD (US, pre-1931 publication) | Commons' photographer attribution (Schervee) is not made by the LOC record; the basis does not depend on it |
| philo-farnsworth | 1924 BYU yearbook portrait | PD (US, published before 1931) | small (295×441): the only rights-clear option; identity checked against a 1939 photograph |
| frederic-chopin | Wodzińska 1836 watercolour (National Museum, Warsaw) | PD (artist d. 1896) | |
| buster-keaton | Bain News Service c.1920-25 (LOC) | PD (US, pre-1931 publication) | Commons retouched copy |
| christopher-wren | Scriven 1827 engraving after Kneller 1711 (Wellcome) | CC BY 4.0 digitization; engraving PD | `historical_depiction` (engraving after a painting) |
| george-frideric-handel | Heins c.1740 (Händel-Haus Halle) | PD (artist d. 1756) | |
| joseph-lister | Lorimer 1895 oil (Univ. of Edinburgh) | PD (painter d. 1936) | Art UK page returned 403; Commons page carries no notice |
| rene-descartes | Louvre INV. 1317, after Frans Hals | PD | `historical_depiction`: an 18th-century or workshop copy of a lost original, so labelled as such |
| antonie-van-leeuwenhoek | Verkolje 1680-86 oil (Rijksmuseum SK-A-957) | PD (painter d. 1693) | `likeness` is an inference (Delft portraitist, within the sitter's lifetime); no document says the sitter posed |
| william-herschel | Godby stipple after Rehberg, 1814 (Wellcome) | CC BY 4.0 digitization; Wellcome page: Public Domain Mark | print inscribed "Rehberg del. ad viv. Windsor 1814" (drawn from life) |

## Validation

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: **385 candidates, 0 errors, 0 warnings** (by
  status: `qa_passed` 93, `evidence_approved` 209, `held` 83).
- `checkScoringLockIntegrity.ts`, pre-commit: "Checked 370
  previously-committed candidate file(s) against HEAD. 0 flagged." Legacy:
  22 covered, 0 flagged. **Post-commit, run against the clean committed
  HEAD (implementation commit `d2ec6d2`): "Checked 385
  previously-committed candidate file(s) against HEAD. 0 flagged."** with
  "Legacy scoring lock: 22 pre-pipeline production people covered, 0
  flagged." Mechanical count of committed `data-pipeline/candidates/*.json`
  at that HEAD: **385** (`git ls-tree`) = 385 on disk = the checked count —
  agrees exactly. `validateCandidates.ts` post-commit: 0 errors, 0 warnings.
- `vitest run`: **69 files, 1870 tests, all passed** (incl. the 157-test
  `roster39.test.ts`, `validateEditorial`, and the KO coverage guards).
- `next build --webpack`: succeeded, **666 static/SSG paths**
  (2×321+24, the established formula) — no build regression observed.
- Focused Playwright (`peopleDirectory`, `person.visual`, `editorial`,
  `compare.visual`): **128/128 passed** against a fresh production build.
- Manual verification on the production server: James Watt (desktop, with
  the non-eligible notice), René Descartes (KO, 375px), the Directory
  profession filters (sport, business, music, film, philosophy, medicine,
  biology, architecture each surface the expected new people; live count
  320, "N of 321" while filtered), and `/compare/james-watt` (graceful
  "isn't included in matching yet" with a working View Profile link);
  zero console errors. A sweep of all 30 rendered pages (15 people ×
  en/ko) at a true 375px viewport found no horizontal overflow, no broken
  image, a loaded hero portrait, 7 sections each, and no missing name or
  untranslated-key leak. All 15 portraits return 200 with the recorded
  pixel dimensions. A link check over the 224 unique source and portrait
  page URLs found no 404s (nine 403s from bot-blocking hosts — LOC,
  Smithsonian Archives, Business Standard, ExplorePAHistory — plus one
  non-ASCII Korean Wikipedia URL my checker failed to encode, which
  returned 200 when retried). No
  match-eligible new profile exists to spot-check. No genuine product
  defect was found or fixed.

## Confirmations

No architecture/matching diagnostic was repeated. No performance benchmark,
similarity benchmark, route-payload benchmark, or portrait-storage audit was
run — only build success and the static path count were recorded. No
eligibility padding or rescue for any candidate. The legacy lane stayed
paused (Legacy Integrity Batch 6 not started). Roster40 was NOT started.
