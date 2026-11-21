# Roster68 checkpoint

Branch `feat/roster68`. `ROSTER68_BASE_SHA` = `d7ab2ca486bbda2a3aff3eb341fd47b63e93799c` (merge of PR #82, the post-Roster67
maintenance; parents `44c9df9`, `90f1f59`). Roster68 is the first roster cycle on the checked-in wiring workflow
(`wireRoster.ts`, `currentRosterManifest.ts`, registry-derived membership) and the first with a **two-stage portrait preflight**.

## Result

| | Before (main) | After (this branch) |
|---|---|---|
| Production | 816 | **844** (+28) |
| Directory-visible | 815 | **843** |
| Match-eligible | 114 | **114** (0 of 28 eligible) |
| Candidate JSON | 997 | **1027** (+30) |
| Distance to 1000 | 184 | **156** |

30 frozen, **28 shipped, 2 held** (both portrait-rights holds). Cumulative Roster33-68: **619 shipped, 0 eligible**.
No scale checkpoint ran (the ~750 classification `EXPANSION_GREEN` stands; next planned checkpoint ~1000). No Legacy Batch 6.
Roster69 not started.

## Maintenance PR #82 and the maintained base

PR #82 was guard-checked (open, non-draft, `MERGEABLE`/`CLEAN`, base `44c9df9`, head `90f1f59`, 0 behind, Vercel SUCCESS, 0 review
threads, tooling/docs-only scope) and merged with a normal merge commit (`--match-head-commit` on the exact head) as `d7ab2ca`.
Maintained base verified before any selection work: production 816 / visible 815 / eligible 114 / candidate JSON 997 / latest
roster 67; categories science 340 / arts 302 / leadership 156 / building 259 (visible 340 / 302 / 155 / 258); manifest says
Roster67; `currentRosterState.test.ts` (9 tests) passes; `wireRoster.ts` (dry run by default), `rosterGeneratorCore.ts` and the
lineage registry present; raw-id ratchet baseline 189 people / 480 texts; no Roster68 files.

## Pool, gates and exclusions

* **Proposal pool: 371 names** (323 + a 48-name top-up for science/building balance), all resolved to human Wikidata QIDs by batched
  enwiki-title lookups (one wrong redirect, "Wang Zhenyi" -> a 20th-century physician, was caught and never used).
* **Identity gate: 371 probes, 0 hard duplicates** (slug / normalized name / alias / token-set / QID against all 816 production
  people). **2 review-tier results, both `different_person`**: Lee Kuan Yew vs Lee Kun-hee (shared romanized surname only); Dorothy Day
  vs Billie Holiday ("Lady Day" alias vs surname). Dispositions persisted (`dispositions68.json`, scratch).
* **Backlog exclusion: 93 hits** against the 203 non-production candidate files (held / evidence-approved-unshipped), **0 reopened**
  (no concrete resolving signal). Lesson: list backlog slugs *before* brainstorming; a quarter of the first pool was wasted on
  already-researched backlog people.
* **Historical-attribution screen**: non_attributable: Cai Lun (invention credit institutional/legendary), Francis of Assisi
  (hagiographic biography); uncertain -> excluded: Al-Jazari (biography rests on his own preface). Frozen set: Mansa Musa and John A.
  Roebling `limited_but_usable` (descendant embellishment / second-hand Arabic accounts), Abai `limited_but_usable`, the rest
  `attributable`.
* After exclusions **275** candidates entered Stage A.

## Two-stage portrait preflight

* **Stage A** (broad Commons image-path scan, 275 people, one search plus P18 per person with 429-aware pacing): 257 had at least one
  open-licensed lead of >=350 px, 18 none. Stage A grades were not assigned.
* **Stage B** (4 agents, holder/item-record level, 47-person shortlist = 12 building / 13 arts / 11 science / 11 leadership): result
  **20 strong / 11 plausible / 16 risky**. Findings that Stage A could not see (holder contradictions and sitter/caption traps):
  Eladio Dieste's "CC0 own work 2012" photo of a man who died in 2000; Louis Kahn's "own work" crop of a 1969 group photo; Fazlur Khan's
  CC lead is a memorial sculpture; Levi Strauss's only portrait an unknown-author scrape; Bai Juyi's Chen Hongshou painting is captioned
  as a different sitter; NPG asserts rights over its reproductions (Paxton, Owen, Naoroji); Naidu's Bundesarchiv photo is captioned
  Naidu but is Kamaladevi Chattopadhyaya; Tove Jansson's CC BY claim is a third-party uploader's; Plaatje's Commons "from his 1915 book"
  claim is unsupported (different, tiny photo). 16 risky candidates were not frozen except two (below).
* **`ROSTER68_FROZEN_30`** (immutable): 8 building / 8 arts / 7 science / 7 leadership; Stage B **strong 18 / plausible 10 / risky 2**
  (Komitas, Abai Kunanbayev: kept for geographic breadth, both shipped). Strong+plausible 28 >= 24; risky 2 <= 6; every group >= 4.
  Frozen regions (after the two lead corrections below): western_europe 7, north_america 4, east_asia 4, central_europe 4, south_asia 3,
  southern_europe 3, west_asia 2, sub_saharan_africa 2, central_asia 1. Born before 1800 (7): Bai Juyi, Mansa Musa, Yosa Buson, Spallanzani, Sugita Genpaku,
  Robert Owen, Paganini. Geographic concentration: Europe 14 of 30, North America 4, **outside Europe and North America 12 of 30**.

### Preflight conversion

| Stage B grade | Frozen | Shipped | Held | Initial lead survived (shipped) | Replacement shipped |
|---|---|---|---|---|---|
| strong | 18 | 17 | 1 | 14 | 3 |
| plausible | 10 | 9 | 1 | 5 | 4 |
| risky | 2 | 2 | 0 | 1 | 1 |
| **total** | 30 | **28** | **2** | **20** | **8** |

Replacements (8): Hormuzd Rassam, Bai Juyi, Sugita Genpaku, Sol Plaatje (plausible); Marianne North, Robert Owen, Simone Veil (strong);
Komitas (risky). Roster67 comparison: 27 shipped, 7 initial leads survived, 20 replacements. Stage B cut the replacement rate from 20/27 to
8/28 and the labels predicted better than in Roster67, but it is one cycle and the grade still over-promised twice:

* **Strong hold: Anna Akhmatova.** Petrov-Vodkin's 1922 portrait is public domain by age and the Russian Museum record matches, but the
  museum's terms of use require an official letter to the Director General for images of collection works (same holder as the earlier
  Semyonov-Tyan-Shansky hold). Stage B recorded the "(c) Russian Museum" footer as *unread*; reading it was the decisive step. **Foreseeable at
  Stage B: yes** (the unread terms were noted), so a strong grade should require the terms page to be read.
* **Plausible hold: Janusz Korczak.** The 1933 Polona postcard has the right sitter (printed caption) but the Polona record is a JavaScript
  app, the photographer is possibly Edward Poznanski, the Museum of Warsaw lists rights as undefined, and 1933 is past the US pre-1931
  line. **Foreseeable at Stage B: yes** (Stage B's concern already named Polish/URAA analysis).
* **Risky ships (2)**: Komitas (the undated studio-photo lead was replaced by the museum-institute's 3 Aug 1896 Berlin studio portrait; rights
  rest on age, no item-level rights statement) and Abai (crop of the well-known Abai-with-sons photograph; photographer/date unknown, made before
  1904; rights rest on age; museum record never reached). Both are weak-provenance, age-based portraits, labelled in their sources; see
  "Known caveats".
* No other strong or plausible candidate was held. Holder contradictions found only after freeze: Doshi's preflight-claimed in-image caption
  does not exist (identity rests on the Commons description plus an attendee blog and visual match); Sugita's Waseda Commons lead is not usable
  (holder prohibits website reuse without permission) and was replaced by the Tohoku University scan of the woodblock frontispiece to his own
  *Keiei Yawa*; Owen's NPG lead was dropped for the NLW Ryall engraving.

## Research, scoring, review

* 4-agent maximum, 15 pairs; two 5-hour limits and one weekly boundary interrupted agents, all resumed from saved files.
* **Initial scored rows 259 -> final 256** (3 rows removed by agents as reputation-only/duplicated: Virchow 1, Fleming 2).
* **Agent lowerings**: 201 of the 256 remaining rows were lowered (199 scores, 201 confidences, 54 evidence types), **0 raised**;
  **131 were source-family-concentration corrections** (handback totals). Roster67 benchmark: 208 lowerings / 150 concentration / 19 lead
  corrections (not a target).
* **Lead review**: highest rows inspected (maximum 78 score / 0.66 confidence, all already agent-lowered; the rows at/above 76 or 0.62 were
  read in full); first two Achievement cards of every candidate read. **0 `RUBRIC_CORRECTION` row lowerings, 0 removed rows by the lead** (the
  agents had already lowered everything the lead would have). Lead *data* corrections (not scoring): 2 regions (Piccard and Virchow
  `central_europe` -> `western_europe`, following Swiss/German precedent), 2 hold statuses (Akhmatova, Korczak set to `evidence_approved` with
  `portrait.status: held`, the repository convention), and 5 invalid source `kind` values the validator did not catch but `tsc` did
  (Szymborska x4 `interview`/`article` -> `press`; Paganini RCM essay `article` -> `institution`).
* **Achievement gate**: every frozen candidate passed all gate checks at agent level; lead found no first-card failure.
* **Raw-id rule**: the wiring dry run validated every EN/KO draft against the shared detector (0 leaks). Ratchet unchanged: 189 legacy
  people / 480 texts, 0 new leaking people, 0 growth. Legacy debt not touched.
* **Eligibility** (after final scores): 0 of 28. Scored rows min 3 / median 9 / max 12; coverage 0.085 / 0.269 / 0.358; high-confidence
  count 0 / 5 / 9; high-confidence average 0 / 0.536 / 0.596. No rescue, no raised scores. Cumulative Roster33-68: 619 shipped, 0 eligible.
* **Taxonomy**: Roster68 pushed two fields over the >=2-people floor. `anthropology` (Katherine Dunham + Rudolf Virchow) is curated under
  `science_knowledge` and `aviation` (Amelia Earhart + Konstantin Tsiolkovsky) under `building_discovery`, with EN/KO labels
  (`field.anthropology` 인류학, `field.aviation` 항공); candidate `fieldIds` untouched. `occupation.industrialist` (Robert Owen's primary
  occupation) got EN/KO labels (산업가).
* **Portraits**: 28 shipped (23 `likeness`, 5 `historical_depiction`: Paxton, Bai Juyi, Paganini, Spallanzani, Mansa Musa).

## Category accounting (canonical `categoryCounts.ts`)

| | Production before -> after | Visible before -> after |
|---|---|---|
| science_knowledge | 340 -> 354 (+14) | 340 -> 354 |
| arts_culture | 302 -> 314 (+12) | 302 -> 314 |
| leadership_society | 156 -> 168 (+12) | 155 -> 167 |
| building_discovery | 259 -> 269 (+10) | 258 -> 268 |

Deltas sum to 48 because categories are not exclusive (a person can belong to several via `fieldIds`; 28 people, 48 memberships). The Zheng
He visible gap (leadership and building one visible below production) is unchanged.

## Wiring-workflow acceptance (the maintenance objective)

* Old count-sensitive test files manually edited: **0**. Hand-maintained slug lists edited: **0**. Roster-membership lists recreated: **0**.
* `wireRoster.ts` sequence: `--generator-only` write -> `generateRoster68.ts` (28 people) -> full dry run (**0 errors**, expected transition
  816/815/114/997 -> 844/843/114/1027, no candidate edit, no taxonomy edit) -> `--write` (**7 files**: `seed.ts`, `matchPoolIntegrityAudit.ts`
  registry, `currentRosterManifest.ts`, the new `audits/roster68.test.ts`, `i18n/editorial.ts` (247 EN + 247 KO entries), `people/editorial.ts`
  (28 blocks), `i18n/ko.ts` (28 names)) -> **second dry run: every operation a no-op**. Existing files edited by the tool: 6; Roster67
  comparison: 44 old files plus 2 helper-script patches.
* **Two tool defects found and fixed (tests added):**
  1. *Chicken-and-egg*: the plan refused to run until `rosterN.ts` existed, but `rosterN.ts` is produced by the generator wrapper the same
     plan was meant to create. Added `--generator-only` (plans only the wrapper; the full plan stays strict) with a test that fails on the
     old behaviour.
  2. *Live-manifest coupling in the tool's own tests*: `wireRoster.test.ts` read the live `currentRosterManifest.ts`, so 3 tests failed the
     moment the live manifest reached roster 68. The fixture now uses a fixed manifest.
* The generated audit skeleton needed one semantic human edit: hold assertions now state the real blocker (both are portrait holds: evidence
  rows kept, `portrait.status: held` with a recorded reason, no shipped portrait asset). Everything else (TARGETS, candidate/production row +
  `fieldIds` + `occupationIds` + `regionCode` equality, shared raw-id detector, no literal current counts) was reviewed and accepted.
* Disclosure of non-tool edits: candidate data fixes (regions, hold statuses, source kinds) were done with small inline Node string
  replacements on candidate JSON (data, not wiring); one import line was deleted from `wireRoster.test.ts` with `sed` while fixing defect 2.
  No ad hoc wiring script, no sed/Python/heredoc wiring of roster files, no old audit edited.

## Validation

`tsc --noEmit` clean; `validateCandidates` 0 errors / 0 warnings; Roster68 audit, `currentRosterState`, wiring-tool (28), Directory taxonomy,
editorial raw-id ratchet and control-character guards pass; **full Vitest 9227 / 9227 (101 files)**; calibration run twice, byte-identical
(`meanSd` 11.704, eligible set unchanged); **final build 1712 / 1712 = 2 x 844 + 24**; **focused Playwright 142 / 142** (Person, Editorial,
Directory, Compare, Trait Explanation; the full e2e suite was not run); **scoring lock**: 1027 committed / 1027 on disk / 1027 checked, 0 flagged,
legacy 22 covered / 0 flagged.

## Local QA

Production server, all 28 shipped people x EN/KO: **56/56 routes 200, 28/28 portraits 200**; the two holds are absent (404 in both locales,
reported separately, not counted as shipped-page failures). **Real-navigation QA at 375 x 812** (headless Chromium, 56 navigations): 0
horizontal overflow, 0 broken images after scrolling lazy content, 0 raw underscore attribute ids, Korean names and portraits present in every
page, portrait credit text present, **0 console/page errors and 0 failed requests across all 56 navigations**.

## Source-link sweep (271 shipped source/portrait URLs)

243 x 200; 24 x 403 (bot walls, not defects); **0 x 404**; 1 x 429 (Met collection page, rate limit); 1 x 503 (Project Gutenberg, whole-site
outage at the time: the root URL also 503); 1 x connection reset (`irajbashiri.com`, Abai source) and 1 x timeout
(`gardenhistorysociety.org.au`, Marianne North source), both pages were read by the agents and are kept. No user-visible URL was changed.

## Known caveats (for the reviewer)

* Portraits that rest on age with no item-level holder rights statement: Komitas, Abai (weakest), Tsiolkovsky (unattributed 1924 studio
  photo; Soviet first publication <= 1931), Plaatje (coarse bitonal halftone from the 1916 book scan; recognisable profile, low quality; accepted
  by the Tan Kah Kee / Dayananda precedent), Bai Juyi (anonymous Qing album page, name slip visible; National Museum of China record not found).
* Holder pages that were bot-walled and not bypassed: LOC (Chanute), NPG, Gallica (Workman, Naidu, Mansa Musa; Gallica's general terms charge
  for some commercial reuse while the item's `dc:rights` says public domain), ColBase (Buson).
* Sitter identity resting on catalogue data rather than lettering: Doshi, Sarabhai (NASA caption), Veil (Nationaal Archief catalogue),
  Piccard (ETH title; he had a twin, no inscription), Owen (the Ryall engraving names painter, engraver and date but not the sitter).
* Korean names that are transliterations rather than established forms (flagged by agents): Komitas, Sol Plaatje, Hormuzd Rassam, Balkrishna
  Doshi, Josephine Butler, Marianne North, Joseph Paxton, Spallanzani (label), Chanute/Piccard (Wikidata labels). None invented as "traditional" names.
* Composition: Sol Plaatje, Josephine Butler, Robert Owen, Simone Veil and Sarojini Naidu are civic/political leaders; only documented
  behaviour is scored and no private condition is inferred (Veil's deportation and Mansfield-style health material are context only).
* Two profile-level taxonomy notes: Virchow carries `anthropology` and `social_reform`; Fleming `astronomy`, which currently has one person.

## Holds (frozen, preserved)

| Slug | Type | Exact blocker | Next step |
|---|---|---|---|
| `anna-akhmatova` | portrait rights | Russian Museum (Zh-2407) terms of use require an official request for images of collection works | letter to the Director General, or a PD printed portrait with a verified publication chain |
| `janusz-korczak` | portrait rights | Polona 1933 postcard: author/rights fields unread (JS app), Museum of Warsaw "rights undefined", past the US 1931 line | open the Polona item for its rights/author fields, or ask Korczakianum whether it is the Poznanski en-face portrait |

Candidate JSON, research, rows and editorial drafts are kept (status `evidence_approved`, `portrait.status: held`).

## Not done

No scale checkpoint, no Legacy Batch 6, no legacy raw-id cleanup, no scoring/eligibility/matching change, Roster69 not started.
