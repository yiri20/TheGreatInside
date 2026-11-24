# Roster69 checkpoint

Branch `feat/roster69`. `ROSTER69_BASE_SHA` = `f8c9298eb7b177bf21ecead0f9a757349d76297a` (merge of PR #83, Roster68; parents `d7ab2ca`,
`860d4c5`). Roster69 is the second cycle on the checked-in wiring workflow and the first with a **backlog-first pool** and a **mandatory
holder terms-of-use review** in Stage B.

## Result

| | Before (main) | After (this branch) |
|---|---|---|
| Production | 844 | **870** (+26) |
| Directory-visible | 843 | **869** |
| Match-eligible | 114 | **114** (0 of 26 eligible) |
| Candidate JSON | 1027 | **1057** (+30) |
| Distance to 1000 | 156 | **130** |

30 frozen, **26 shipped, 4 held** (all four are portrait-rights holds). Cumulative Roster33-69: **645 shipped, 0 eligible**. No scale
checkpoint (it cannot fire: the maximum reachable was 874); the ~750 classification `EXPANSION_GREEN` stands. No Legacy Batch 6. Roster70
not started.

## PR #83 and the deployed Roster68

PR #83 was guard-checked (open, non-draft, `MERGEABLE`/`CLEAN`, base `d7ab2ca`, head `860d4c5`, 0 behind, Vercel SUCCESS, 0 review
threads, two commits as expected) and merged with a normal merge commit (`--match-head-commit` on the exact head) as `f8c9298`.
Production (`thegreatinside.com`) verified live after the deploy: Directory **"843 people"**; all **28** Roster68 people returned EN 200,
KO 200 and portrait 200; Akhmatova and Korczak 404. (Gotcha: Node `fetch` receives a 403 bot-mitigation response from the production host
while `curl` with a normal User-Agent gets 200, so the verification uses `curl`, paced.) Local maintained-base checks: manifest 68 / 844 /
843 / 114 / 1027, `currentRosterState.test.ts` and the raw-id ratchet (189 people / 480 texts) pass, no Roster69 files existed.

**Correction to the Roster68 record.** `roster68.md` listed the post-Roster68 category totals as science 354 / building 269 (visible
354 / 268), computed *before* the taxonomy curation (`anthropology` -> science, `aviation` -> building). The canonical `categoryCounts.ts`
after curation reads production **355 / 314 / 168 / 270** and visible **355 / 314 / 167 / 269** (science / arts / leadership / building);
`roster68.md` is corrected in this PR. Lesson: compute category accounting after the final taxonomy edit.

## Backlog-first pool

* Before brainstorming, the current non-production candidate set was exported mechanically: **205 backlog candidate files** (non-production),
  plus 844 production people, giving **5567 exclusion keys** (slug, canonical name, aliases, normalized and token-sorted forms) and 1032 QIDs
  (`export_exclusions.mjs`, scratch).
* **160 names brainstormed; 7 prevented before entering the pool** (Ørsted, Kollwitz, Clara Schumann, Makeba, El Saadawi, Sembène already in
  production; Senghor in the backlog). The pool also reused 245 fresh leftovers of the Roster68 pool (30 of Roster68's 275 scanned people were
  excluded up front because they had since been shipped or held), of which 67 were selected by judgment. QID-level early check: 0 more
  prevented.
* **Pool: 217** (building 56 / arts 49 / science 58 / leadership 54; 150 new + 67 Roster68 leftovers).
* **Formal backlog verification** (same comparison as Roster68): 205 backlog files, **0 collisions, 0 escaped the early filter, 0 reopened**
  (Roster68: 93 wasted slots).

## Gates

* **Identity gate: 217 probes, 0 hard duplicates, 7 review-tier results, all `different_person`** with reasons: Dorothy Day (Lady Day alias),
  Julia Morgan (J. P. Morgan), Maggie L. Walker (Madam C.J. Walker), Alice Hamilton (Alexander Hamilton), Tsung-Dao Lee (Tim Berners-Lee),
  Funmilayo Ransome-Kuti (Fela Kuti: mother and son, two people), Fanny Mendelssohn (Felix: siblings). Dispositions persisted
  (`dispositions69.json`, scratch).
* **Attribution screen**: no `non_attributable` or `uncertain` candidate in the pool; `limited_but_usable` notes: Aldus Manutius, Sesshu, Tyagaraja,
  Camoes, Yaa Asantewaa, Kim Man-deok, Heo Nanseolheon (none frozen); in the frozen set Matteo Ricci, La Perouse, Emily Warren Roebling,
  Bernini, Lavoisier (Marie-Anne), Nellie Melba and Harriet Chalmers Adams were classified `limited_but_usable` by their researchers.

## Two-stage portrait preflight with holder terms

* **Stage A** (150 new names scanned; the 67 Roster68 leftovers reused their Roster68 scan): 204 of 217 had an open-licensed lead >= 350 px, 13
  none.
* **Stage B**: 47 shortlisted (11 building / 13 arts / 12 science / 11 leadership), four agents, holder item record **plus the holder's terms
  of use** required. Result **6 strong / 21 plausible / 20 risky**; **14 strong grades were downgraded by the terms rule** and **31 of the 47**
  had terms unread, bot-walled or ambiguous (LOC, Smithsonian/NPG, Gallica, Art UK, Brooklyn Museum 429).
  Holder-vs-lead findings Stage B caught: Brooklyn Museum (Emily Warren Roebling) holds a public-domain painting but its terms limit PD images to
  non-commercial use; Royal Collection Trust, National Gallery London and KHM terms restrict (Gentileschi, Vigee Le Brun, Anguissola's
  Vienna copy); the Israeli GPO photo of Mboya is copyrighted in the US (URAA); Galleria Borghese needs a reproduction concession; Canterbury
  Museum asserts CC BY-NC site-wide; Sofonisba's Lancut holder is open (Public Domain Mark).
  The **Met** strong grades (Palladio, Lavoisier, Agnesi): the Met's policy web page returned 429; the terms were read from the Met's own
  Open Access repository README and the Met API `isPublicDomain` flag, and the grade was kept, recorded here.
* **`ROSTER69_FROZEN_30`** (immutable): 8 building / 8 arts / 7 science / 7 leadership; **strong 6 / plausible 18 / risky 6**; strong +
  plausible 24 (target >= 24), risky 6 (target <= 6), every group >= 4 viable. Composition: women 15 of 30 (13 of 26 shipped); born before 1800: 11;
  regions after lead corrections: western_europe 12, southern_europe 6, north_america 5, sub_saharan_africa 2, south_asia 2, central_europe 1, west_asia 1,
  east_asia 1: **Europe 19 of 30, North America 5, outside Europe and North America only 6 of 30** (Roster68: 12). The Stage B filter removed most
  non-Western candidates (their only images were unknown-author or jurisdiction-only); rights standards were not weakened to fix this.

### Preflight conversion

| Stage B grade | Frozen | Shipped | Held | Initial lead survived (shipped) | Replacement shipped |
|---|---|---|---|---|---|
| strong | 6 | 6 | 0 | 4 | 2 (Morisot, Agnesi) |
| plausible | 18 | 17 | 1 (Fanny Mendelssohn) | 12 | 5 |
| risky | 6 | 3 (Ricci, Qiu Jin, Dharmapala) | 3 (Mboya, E. W. Roebling, Visvesvaraya) | 0 | 3 |
| **total** | 30 | **26** | **4** | **16** | **10** |

Roster68 benchmark: 28 shipped / 20 leads survived / 8 replacements / 2 holds. Roster69: **10 replacements of 26 (38%)** vs 8 of 28 (29%) in Roster68
and 20 of 27 (74%) in Roster67, with 6 risky candidates deliberately frozen. Not optimised toward the benchmark.

* **Holds and foreseeability: 4 of 4 were foreseeable at Stage B** (three were graded risky for exactly the blocker that held them; Fanny
  Mendelssohn's plausible grade named the missing item-level rights statement and the CAPTCHA-walled fallback). **No strong grade held** (Roster68:
  Akhmatova): the terms rule moved the doubtful institutional routes out of `strong`.
* Frozen candidates with unread/bot-walled/ambiguous holder terms: **18 of 30**; read-open 9; read-restrictive 2; **13 strong grades downgraded**
  among the frozen set.
* **Risky ships (3)**: Ricci (the Gesu painting's Italian-state holder was unresolved; replaced by the KU Leuven scan of Snyders' lettered 1610
  engraving, `historical_depiction`, age basis), Qiu Jin and Dharmapala (see the researchers' provenance notes in their candidate files).

## Research, scoring, review

* 15 pairs, four agents at a time; three 5-hour limits interrupted agents, all resumed from saved files.
* **Initial scored rows 261 -> final 258** (3 rows removed by agents: Emily Warren Roebling 1, Becquerel 1, Torricelli 1); **agent lowerings 211 of the
  258 remaining rows** (203 scores, 208 confidences, 61 evidence types), **0 raised**; **133 source-family concentration corrections**
  (Roster68: 201 / 131).
* **Lead review**: highest rows read in full; **6 `RUBRIC_CORRECTION` row lowerings on 4 candidates** (Dharmapala proactive agency 78/0.62 -> 74/0.58;
  Agnesi impact motivation 80/0.64 -> 76/0.58 and mastery orientation 76/0.62 -> 72/0.56; Jex-Blake persistence 80/0.68 -> 78/0.64 and proactive agency
  78/0.66 -> 74/0.62; Qiu Jin proactive agency 78/0.62 -> 74/0.58), each because the detail traced to one biographical tradition or an institution's
  own chronology; **0 row removals by the lead**. Factual/metadata corrections: **2 regions** (Weyl, Kauffman `central_europe` -> `western_europe`, German/Swiss
  precedent), **4 hold statuses** set to the repository convention (`evidence_approved`, `portrait.status: held`), **0 source-kind corrections**
  (the new brief listed the valid kinds; `tsc` stayed clean), **0 Korean-name corrections**.
  Birth years decided: Hughes 1901, Sofonisba 1532, Visvesvaraya 1861 (each documented in the candidate).
* **Achievement gate**: all candidates passed all six checks at agent level; the lead found no first-card failure (the QA below rendered every first card).
* **Korean display names (30 frozen)**: **0 established-usage, 25 authoritative-label** (Korean Wikipedia title or Wikidata ko label), **5 reasoned
  transliterations** (Harriet Chalmers Adams, M. Visvesvaraya [held], Mary Church Terrell, Zitkala-Sa, Anagarika Dharmapala), all five reviewed at lead
  review and kept; **0 corrected**. Qiu Jin uses the documented Sino-Korean reading 추근; La Perouse's form is a shortened Korean-Wikipedia title (flagged,
  kept).
* **Raw-id ratchet**: the wiring dry run validated every EN/KO draft against the shared detector (0 leaks); ratchet unchanged (189 legacy people /
  480 texts, 0 new leakers, 0 growth).
* **Eligibility**: **0 of 26**. Scored rows min 4 / median 8 / max 13; coverage 0.121 / 0.248 / 0.394; high-confidence count 1 / 5 / 9; high-confidence
  average 0.50 / 0.537 / 0.593. No rescue. Cumulative Roster33-69: 645 shipped, 0 eligible.
* **Taxonomy**: **no addition needed** (no field reached the >= 2-person threshold uncurated; no new primary occupation lacked a label).
* **Portraits**: 26 shipped (20 `likeness`, 6 `historical_depiction`: La Perouse, Palladio, Ricci, Romer, Torricelli, Agnesi).

### Age-based and weak-provenance portraits (caveats)

Shipped primarily on age or on a holder statement with an undocumented publication chain: **Kauffman** (1904 Waters plate via Internet Archive, printed
caption; no holder file, terms not applicable), **Amir Kabir** (Golestan painting inscribed 1848-49; no item record found, holder visiting rules only: age
basis, weakest), **Ethel Smyth** and **Nellie Melba** (LOC Bain, "no known restrictions", no documented first publication; Melba's sitter rests on the
agency title plus a comparison), **Harriet Chalmers Adams** (LOC National Photo Company, sitter from the agency sleeve title), **Ole Romer** (LOC 1913
journal halftone, "no known restrictions"), **Mary Church Terrell** (1919 book plate, photographer unknown), **Kate Sheppard** (1905 book plate,
studio attribution unconfirmed), **Zitkala-Sa** (Smithsonian object page CC0; terms page bot-walled; no lettering on the print). Holder-open items
with Commons conflicts resolved in favour of the holder: Weyl (ETH Public Domain Mark vs Commons CC BY-SA), Jex-Blake and Becquerel (Wellcome / Smithsonian
Libraries item statements). Each age-based entry records earliest documented publication, jurisdiction, creator death where known, whether an item-level
statement exists and whether a holder policy was checked in its candidate provenance.

## Category accounting (canonical `categoryCounts.ts`, after the final edit)

| | Production before -> after | Visible before -> after |
|---|---|---|
| science_knowledge | 355 -> 362 (+7) | 355 -> 362 |
| arts_culture | 314 -> 327 (+13) | 314 -> 327 |
| leadership_society | 168 -> 178 (+10) | 167 -> 177 |
| building_discovery | 270 -> 273 (+3) | 269 -> 272 |

Deltas sum to 33 memberships for 26 people (categories are not exclusive). The Zheng He visible gap is unchanged.

## Tooling acceptance, second cycle

| Measure | Roster68 | Roster69 |
|---|---|---|
| generator-only dry-run errors | 0 (after fix) | **0** |
| generator-only write | 1 file | **1 file** |
| full dry-run errors | 0 | **0** |
| full `--write` files | 7 | **7** (6 existing + new audit) |
| second dry run no-op | yes | **yes** (all no-op) |
| tooling code fixes required | 2 | **0** |
| old count-sensitive tests edited | 0 | **0** |
| giant slug lists edited | 0 | **0** |
| ad hoc wiring scripts | 0 | **0** |

**The checked-in workflow has now passed two-cycle acceptance** (no tool defect in Roster69). Remaining human edits, unchanged from Roster68: the generated
audit skeleton needs its hold assertions rewritten for the actual blocker type (a possible small tool improvement: take the hold type per slug).
Disclosures (not wiring): candidate data corrections (hold statuses, regions, six lead row lowerings) were applied with inline Node edits to
candidate JSON (one first attempt failed its round-trip check and was redone line-based); a Bash heredoc corrupted a backslash in a temporary
preview launch entry and was reverted from backup.

## Validation

`tsc --noEmit` clean; `validateCandidates` 0 errors / 0 warnings; Roster69 audit, `currentRosterState`, wiring-tool (28), Directory taxonomy,
raw-id ratchet and control-character guards pass; **full Vitest 9581 / 9581 (102 files)**; calibration run twice, byte-identical (`meanSd` 11.704,
eligible set unchanged, dispersion file identical to HEAD apart from line endings); **final build 1764 / 1764 = 2 x 870 + 24**; **focused
Playwright 142 / 142** (Person, Editorial, Directory, Compare, Trait Explanation; the full suite was not run); **scoring lock**: 1057 committed /
1057 on disk / 1057 checked, 0 flagged, legacy 22 covered / 0 flagged.

## Local QA

Production server, 26 shipped x EN/KO: **real-navigation QA at 375 x 812 over 52 pages**: 200 on every route, 0 horizontal overflow, 0 broken images
after scrolling lazy content, 0 raw underscore attribute ids, Korean name, portrait, credit text and the **first Achievement card present on every
page**, **0 console/page errors and 0 failed requests**; **26/26 portraits 200**. The four holds are absent (404 in both locales, reported
separately).

## Source-link sweep (230 shipped source/portrait URLs)

202 x 200; 24 x 403 (bot walls); **0 x 404**; 2 x 429 (Met collection pages, rate limit); 1 client error from the Node HTTP stack (`UND_ERR_HEADERS_OVERFLOW`,
Poetry Foundation; the page returns 200 to `curl`); 1 timeout (Lancut museum portal; 200 to `curl`). No user-visible URL changed.

## Holds (frozen, preserved)

| Slug | Type | Exact blocker | Next step |
|---|---|---|---|
| `tom-mboya` | portrait rights | Israeli GPO 1962 photo is copyrighted (US status restored under URAA); gov.il terms render only through script; no open fallback | permission request to the GPO or Kenya National Archives, or an Anefo/Library item |
| `emily-warren-roebling` | portrait rights | Brooklyn Museum terms limit images of public-domain works to non-commercial use (item record says "use"); fallbacks non-commercial or rights-undetermined | ask Brooklyn Museum Image Services for commercial terms, or find a pre-1931 captioned print |
| `m-visvesvaraya` | portrait rights | Rashtrapati Bhavan photo: policy page and terms conflict, no licence line, not PD in the US by age; other routes failed | holder statement from Rashtrapati Bhavan/Photo Division, or a pre-1931 captioned printed portrait |
| `fanny-mendelssohn` | portrait rights | Jewish Museum Oppenheim 1842: no item-level rights statement; SUB Hamburg 1847 engraving behind a CAPTCHA; Hensel drawing has no publication chain | permission from the Jewish Museum, or a human reading of the SUB Hamburg terms |

Candidate JSON, research, rows and editorial drafts are kept (status `evidence_approved`, `portrait.status: held`).

## Not done

No scale checkpoint, no Legacy Batch 6, no legacy raw-id cleanup, no scoring/eligibility/matching change, Roster70 not started.
