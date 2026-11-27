# Roster70 checkpoint

Branch `feat/roster70`. `ROSTER70_BASE_SHA` = `a8c7b6315f0285026e8d79aef66de6a4d9f05160` (merge of PR #84, Roster69; parents `f8c9298`,
`66d467c`). Strategic lane **`EXPANSION_GREEN`**. Roster70 is the third cycle on the checked-in wiring workflow and the first run as
**source-led regional discovery** with named holder-open routes for non-Western sitters.

## Result

| | Before (main) | After (this branch) |
|---|---|---|
| Production | 870 | **898** (+28) |
| Directory-visible | 869 | **897** |
| Match-eligible | 114 | **114** (0 of 28 eligible) |
| Candidate JSON | 1057 | **1087** (+30) |
| Distance to 1000 | 130 | **102** |

30 frozen, **28 shipped, 2 held** (both portrait-rights holds). Cumulative Roster33-70: **673 shipped, 0 eligible**. No scale checkpoint
(the maximum reachable was 900); the ~750 classification stands. No Legacy Batch 6. Roster71 not started.

**Instruction note.** The cycle prompt arrived truncated inside section 2 (it ended at "Check `CURRENT_ROSTER_MANIFEST"). The stage order
was taken from the prompt's header and the detail of each stage from the Roster69 workflow and the repository rules. Any Roster70-specific
rule that was only in the missing part has **not** been applied.

## PR #84 and the deployed Roster69

PR #84 was guard-checked (open, non-draft, `MERGEABLE`/`CLEAN`, base `f8c9298`, head `66d467c`, 0 behind, Vercel SUCCESS, 0 review threads,
only the Vercel bot comment, two commits as expected) and merged with a normal merge commit (`--match-head-commit`) as `a8c7b63`.
Production (`thegreatinside.com`) verified after the deploy: Directory **"869 people"**; all **26** Roster69 people returned EN 200, KO 200
and portrait 200; Mboya, E. W. Roebling, Visvesvaraya and Fanny Mendelssohn 404 in both locales. `categoryCounts.ts`: production
362 / 327 / 178 / 273, visible 362 / 327 / 177 / 272 (science / arts / leadership / building), Zheng He visible gap unchanged; manifest
69 / 870 / 869 / 114 / 1057 and `currentRosterState.test.ts` 9/9; the Roster68 category correction (science 355, building 270) is present.

## Backlog-first pool

* Exclusion set exported before brainstorming: 870 production people plus 209 non-production candidate files (5837 name keys). The QID set
  was completed from the Roster69 export because 43 production records carry no QID in `SEED_PEOPLE` (17 of them older records with no
  candidate file at all; name keys cover those).
* **221 names brainstormed; 114 were already in production** and were stopped by the early filter (the obvious non-Western names are by now
  largely shipped). 101 clean new names resolved to human Wikidata items (non-humans, unresolved and QID duplicates dropped).
* Pool **275** = 101 new + 187 unused Roster69 pool members (13 overlaps).
* **Formal backlog verification** against the candidate files at the base SHA: 209 backlog files, 275 pool names, **0 collisions**.
* **Observation, not acted on:** about 123 older backlog candidates are `evidence_approved` with a held portrait. "Backlog-first" was applied
  in its established sense (exclusion before discovery). Re-attempting those portraits under the current holder-terms rules is a possible
  cheaper source of shipments and needs its own decision.

## Gates

* **Identity gate: 275 probes, 0 hard duplicates**; 46 token-level review hits, all generic-token false positives (for example "al-Din",
  "de Jesus", "J. R. R." against "C. L. R.").
* **Attribution screen**: names with hagiographic or legendary records were not shortlisted. In the frozen set 26 `attributable`,
  4 `limited_but_usable` (among them Vespucci, Cabral and Camoes, whose thin documentary records limit the rows).

## Two-stage portrait preflight with holder terms and open routes

* **Stage A**: 101 new names scanned (0 search failures) plus the 187 Roster69 scans reused.
* **Stage B**: two rounds, 60 candidates, holder item record plus holder terms, with a brief naming holder-open routes by region (ColBase,
  NDL, KOGL, Smithsonian OA, Wellcome, Rijksmuseum, Met, KITLV, Nationaal Archief, ...). Round 1 (44): 4 strong / 16 plausible / 24 risky.
  Round 2 (16, added because round 1 left too few viable): 6 / 6 / 4. **Total 10 strong / 22 plausible / 28 risky**; 14 strong grades
  downgraded by the terms rule. Three Roster69 `plausible` preflights (Monteverdi, Sabin, Bassi) were reused.
* **`ROSTER70_FROZEN_30`** (immutable): 7 building / 8 arts / 7 science / 8 leadership; **strong 10 / plausible 20 / risky 0**. Holder terms
  in the frozen set: 11 read-open, 7 ambiguous, 3 unread, 3 bot-walled, 6 not applicable.
* **Regions: 19 of 30 frozen and 17 of 28 shipped are from outside Europe and North America** (Roster69: 6 of 30). Final region codes
  (frozen): east_asia 9, western_europe 5 (includes Unaipon, Australasian precedent), southern_europe 5, latin_america 4, south_asia 3,
  central_europe 1, west_asia 1, sub_saharan_africa 1, north_america 1. Africa and West/Central Asia remain thin: their leads mostly failed
  on unknown creator or publication chain.
* **Women: 4 of 30** (Roster69: 15 of 30), all 4 shipped. This is a real regression of the selection, which optimised for open portrait
  routes and regions; the next cycle should set a floor before shortlisting.

### Preflight conversion

| Stage B grade | Frozen | Shipped | Held | Initial lead survived (shipped) | Replacement shipped |
|---|---|---|---|---|---|
| strong | 10 | 10 | 0 | 10 | 0 |
| plausible | 20 | 18 | 2 (Rondon, Torres Garcia) | 8 | 10 |
| **total** | 30 | **28** | **2** | **18** | **10** |

Roster69: 26 shipped / 4 holds / 10 replacements. Both Roster70 holds had their blocker named at Stage B. No strong grade held.

## Research, scoring, review

* 15 pairs, at most four agents at a time; 5-hour limits interrupted agents repeatedly and all resumed from saved files.
* **Initial scored rows 296 -> final 294** (2 removed by agents: Nazrul risk tolerance as a double count, Omura mastery orientation as
  single-source). **237 of the final rows lowered** (234 scores, 237 confidences, 54 evidence types), **0 raised**, **172 source-family
  concentration corrections**. Disclosure: the Rong Hong / Phan Chau Trinh agent made no early on-disk snapshot, so their "initial" values
  are the draft values held in its build script.
* **Lead review**: highest rows read; **1 `RUBRIC_CORRECTION`** (Nambu creative originality 82 / 0.66 / documented -> 76 / 0.60 /
  strong_inference: award-body and obituary concentration, priority shared with Goldstone), logged in the candidate. Metadata: Besant and
  Slessor region -> `western_europe` (born in Britain; Matteo Ricci birthplace precedent); 2 hold statuses set to the repository convention
  (`evidence_approved`, `portrait.status: held`). Theiler stays `sub_saharan_africa` (birthplace precedent).
* **Not independently re-verified by the lead**: the lead did not re-open sources or holder records; row-level and rights claims rest on the
  research agents' handbacks, plus mechanical checks (source ids, source kinds, raw ids, editorial attribute ids) and a visual contact sheet
  of the 28 shipped portraits.
* **Achievement gate**: passed at agent level for every candidate; every first Achievement card rendered in QA.
* **Korean display names (30 frozen)**: 2 established, 23 authoritative-label, **5 reasoned transliterations** (Layard, Burle Marx,
  Torres Garcia [held], Unaipon, Slessor). Lead change: Burle Marx `호베르투 불리 마르크스` -> `호베르투 부를리 마르크스` (the
  first form dropped the r of "Burle"); a search found no established Korean usage, so it stays a transliteration. Unaipon's pronunciation
  could not be confirmed. Rondon's label `칸지두 혼동` reads like the Korean word for "confusion": review before that hold is ever lifted.
  Rong Hong keeps that production name (editorial prose opens "known in the West as Yung Wing"; "Yung Wing" is an indexed alias).
* **Eligibility**: **0 of 28**. Scored rows min 4 / median 10 / max 14; coverage 0.117 / 0.293 / 0.425; high-confidence count 0 / 6 / 10;
  high-confidence average 0 / 0.54 / 0.594. No rescue.
* **Taxonomy**: no addition needed. **Portraits**: 22 `likeness`, 6 `historical_depiction`.

## Editorial decision left open: Juan Luna

In 1892 in Paris Luna shot and killed his wife and mother-in-law and wounded his brother-in-law; he was acquitted in 1893. The researcher
scored no row from it and supplied a sourced neutral note (`src_luna_matibag`, `src_luna_vera`). **The published profile does not mention
it**: the wiring tool writes only Achievements, Moments and Turning Points, and adding a Complexities entry about a killing is a product
decision. It should be decided at PR review (the sources are in the candidate record).

## Portrait caveats (accepted, recorded)

* **Unaipon**: the State Library of NSW released this print on Flickr Commons with "no known copyright restrictions", and it is out of
  copyright by age, but the Library's copyright notice says it may restrict culturally sensitive public-domain items and may require cultural
  clearances for some Aboriginal material; item pages were bot-walled. A courtesy check with SLNSW Indigenous engagement or the family is
  recommended.
* **Burle Marx**: rests on Arquivo Nacional's Public Domain Mark on its official Flickr (a 1961 photograph, not expired by age); the
  institution's FAQ separately requires a signed term for its own reproduction service.
* **Hikmet**: item-level CC BY-SA 4.0 (Koch / Deutsche Fotothek); the Fotothek terms (archived copy) name version 3.0, allow CC BY-SA use of
  reduced-quality files, and ask that online uses be reported by email. **That report has not been sent.**
* **Yoshida Shoin**: Kyoto University licence allows free reuse with credit and link-back but neither names nor excludes commercial use;
  also public domain by age.
* **Pelli**: the holder's current site says CC BY 2.5 Argentina; Commons records CC BY-SA 2.0. Unresolved version discrepancy.
* **Kim Jeong-hui**: a Heo Ryeon copy-portrait from the Korea Copyright Commission portal ("free use, expired"); owner of the original not
  named, one colophon writer's death year not established.
* **Age-based or terms-unread**: Cabral (1817 engraving, Internet Archive scan, terms unread), Slessor (1915 frontispiece, Internet Archive
  terms unread), Monteverdi (1644 title page, Yale), Phan Chau Trinh (studio print first shown in print in 1926; photographer read from a
  partly legible imprint; no Gallica file shipped because Gallica charges for commercial reuse), Lukasiewicz (1884 oil, no current holder,
  356 x 486), Nazrul (1923 weekly, 376 x 492), Sabin (c1922 photogravure, LOC states it does not own rights), Uchimura (NDL statement plus
  age), Theiler (Wellcome's own Public Domain Mark on a studio photograph).

## Category accounting (canonical `categoryCounts.ts`, after the final edit)

| | Production before -> after | Visible before -> after |
|---|---|---|
| science_knowledge | 362 -> 372 (+10) | 362 -> 372 |
| arts_culture | 327 -> 337 (+10) | 327 -> 337 |
| leadership_society | 178 -> 189 (+11) | 177 -> 188 |
| building_discovery | 273 -> 279 (+6) | 272 -> 278 |

Deltas sum to 37 memberships for 28 people (categories are not exclusive). The Zheng He visible gap is unchanged.

## Tooling, third cycle

`--generator-only` dry run and write (1 file), full dry run 0 errors, full write 7 files, second dry run all no-op, **0 tool code fixes, 0 old
count-sensitive tests edited**. Hand edit as before: the generated audit skeleton's hold assertion.

**Process defect found and fixed.** Wiring ran after the last pair's handback files existed but before that agent reported finished; it then
changed its candidate and editorial files. `roster70.ts` and the editorial text for Rong Hong and Phan Chau Trinh were stale (including a
factual correction to one Rong Hong moment) and the full test suite did not notice, because the audit compares row values, not prose or
sources. It was caught by a routine regeneration diff, fixed by regenerating and re-wiring from the base files (only those 10 text lines
differed), checked by comparing all 500 wired editorial strings with the drafts, and the validation gate was re-run. **Rule: wire only after
every research agent has reported.** Possible tool improvement: have the roster audit compare editorial text and source ids with the drafts,
or candidate sources and rationales with the generated module.

## Validation

All on the final code (after the staleness fix): `tsc --noEmit` clean; `validateCandidates` 0 errors / 0 warnings; **full Vitest
9955 / 9955 (103 files)**; **final build 1820 / 1820 = 2 x 898 + 24**; **focused Playwright 142 / 142** (Person, Editorial, Directory,
Compare, Trait Explanation; the full suite was not run); **scoring lock** 1087 committed / 1087 on disk / 1087 checked, 0 flagged, legacy 22
covered / 0 flagged. Calibration was run twice before the text-only fix, identical output (`meanSd` 11.704, eligible set unchanged;
`dispersion.generated.ts` identical to HEAD apart from line endings); the fix changed no score, confidence or evidence type.

**Mobile QA** (production server, 28 shipped x EN/KO, real navigation at 375 x 812, 56 pages): 200 on every route, 0 horizontal overflow,
0 broken images after scrolling, 0 raw underscore attribute ids, expected name, portrait, credit text and the first Achievement card on every
page, 0 console/page errors, 0 failed requests; **28/28 portraits 200**; both holds 404 in both locales.

**Source-link sweep** (269 shipped source/portrait URLs, final candidate files): 242 x 200, 26 x 403 (bot walls), 1 x 202/203, **0 x 404**.

## Holds (frozen, preserved)

| Slug | Type | Exact blocker | Next step |
|---|---|---|---|
| `candido-rondon` | portrait rights | Arquivo Nacional terms bar passing reproductions to third parties, no item-level open statement, item records bot-walled; open alternatives have faces too small or no creator chain | permission or an open statement from Arquivo Nacional, or a captioned pre-1931 solo portrait |
| `joaquin-torres-garcia` | portrait rights | MNAC drawing: site terms CC BY-NC-SA / NC conflict with the "public domain" item field; Girona photo: halftone, sitter by catalogue heading only, no holder terms | MNAC permission, or verify the Girona sitter against a captioned print |

Candidate JSON, research, rows and editorial drafts are kept (status `evidence_approved`, `portrait.status: held`).

## Not done

No scale checkpoint, no Legacy Batch 6, no legacy raw-id cleanup, no scoring/eligibility/matching change, no backlog portrait recovery,
Roster71 not started.
