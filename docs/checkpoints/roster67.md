# Roster67 checkpoint (2026-11-14)

Thirteenth 30-candidate batch after the 500-person scale checkpoint, thirty-second fresh new-candidate cycle after the
recent-cohort diagnostic, sixth cycle selected from a portrait-preflighted pool, and the first run with the agent-side
**source-family concentration check**. Outcome: **30 frozen, 27 shipped, 3 held** (all 3 on portrait rights), production
**789 -> 816**, directory-visible **788 -> 815**, match-eligible **114 (unchanged, 0 of 27 eligible)**. Distance to 1000:
**184 people**. No portrait, rights, evidence, scoring, publication or eligibility standard was relaxed, no scale checkpoint was
run, and no maintenance refactor was mixed in.

- `ROSTER67_BASE_SHA` = `33921f2042e106d8d2c4aa3ef5599caec6e1eab8`, the normal merge of PR #80 (Roster66) into `main`
  (parents `8f4becf4c633b6fc9b9b9c4e307d18dbdb39c2b4` and `72b98448c3127316eb53d7a94d0151591539e6a5`).
- Branch `feat/roster67`; PR against `main` (not merged, by instruction).

## PR #80 merge and Roster66 production verification

Guards, all mechanically passing before the merge: PR open, not draft, `mergeable` / `CLEAN`, base exactly `8f4becf...`, head
exactly `72b9844...`, 0 behind `main`, Vercel `SUCCESS` and `Vercel Preview Comments` `SUCCESS` on the exact head, 0 review
threads, 0 reviews, exactly two commits (`dcbae51`, `72b9844`, both the reviewed Roster66 work). Merged with a normal merge
commit guarded on the expected head SHA (no squash, no rebase).

After the production deployment of `33921f2` went live (`thegreatinside.com`), all **27 Roster66 shipped profiles** returned
EN-US 200, KO-KR 200 and portrait 200; the **3 holds** (Pyotr Semyonov-Tyan-Shansky, Jose Maria Velasco, Ahmad Amin) returned 404
in both locales; the Directory showed `788 people`. Canonical `categoryCounts.ts` at the base:

```
current: {"production":789,"visible":788,"categoriesProduction":{"science_knowledge":327,"arts_culture":290,"leadership_society":147,"building_discovery":251},"categoriesVisible":{"science_knowledge":327,"arts_culture":290,"leadership_society":146,"building_discovery":250}}
```

The single Zheng He production-vs-visible gap (leadership/building) remained. Candidate JSON files: 967. Strategic state confirmed
in the merged repo: ~750 checkpoint complete, **EXPANSION_GREEN**, lane toward ~1000, eligible set 114, no Roster67 work already
started. Starting distance to 1000: 211.

## Pool, identity gate, backlog, attribution screen

- **Proposals gated: 377 raw names -> 364 resolved to live human QIDs** (batched enwiki-title -> Wikidata lookups; 13 unresolved or
  non-person hits fixed by explicit titles or dropped: John Deere, Mahmoud Said, and the disambiguation pages). Names were chosen
  for geographic breadth (Sub-Saharan Africa, West and Central Asia, Southeast Asia, Oceania, Latin America) and avoided
  politics/military/activism-primary people.
- **Identity gate** (`identityGate.ts`, against all 789 production people including legacy people without QIDs; sanity-checked
  against known duplicates): **0 hard duplicates**, **2 review-tier matches**. Dispositions (`dispositions67.json`, scratch):
  `liu-hui` vs Lee Kun-hee: **different_person** (3rd-century Chinese mathematician vs Samsung chairman; fired only on the token
  "hui"); `jean-martin-charcot` vs production `jean-baptiste-charcot`: **different_person** (neurologist father vs polar-explorer
  son, distinct QIDs). 0 `same_person`, 0 `uncertain`.
- **Backlog exclusion**: all 200 non-production candidate files compared by slug, QID, canonical name and alias: **0 hits**.
- **Attribution screen**: excluded before the pool: **Huineng, Zhuangzi, Mozi, Rabia al-Adawiyya, Yunus Emre, Ahmad Yasawi,
  Milarepa (non_attributable)** and **Cao Xueqin (uncertain)**; scope exclusions: Vinoba Bhave (activism-primary), Ibn Taymiyya,
  Matthew Fontaine Maury. At freeze all 30 were classified attributable; the research agents re-classified, per their handbacks,
  **23 attributable / 7 limited_but_usable** (Isaac Singer, Carlos Gardel, Maria Orosa, Rosalia de Castro, Hantaro Nagaoka,
  Dayananda Saraswati, Mahmoud Mokhtar). No frozen candidate was found non-attributable after freeze.
- **Scanned pool: 209** names culled from the 364 (balanced by group and region; above the 100-140 target because the cull was
  by judgment before the portrait scan); **199 had at least one permissively open-licensed Commons image candidate** (the scan is
  automated and permissive, so only frozen candidates carry meaningful grades).

## Portrait preflight and ROSTER67_FROZEN_30

The Commons scan (P18 plus one search per name; Wikimedia rate-limited the first, bulk attempts) was a **scan-level preflight**:
license, creator, date and credit per lead. **Holder/item records were NOT opened at freeze** (budget and rate limits), so no
candidate could honestly be graded `strong`; per the rule corrected after Roster66, nothing was upgraded. The agents opened holder
records at research time. **ROSTER67_FROZEN_30** (immutable, no substitution; file `ROSTER67_FROZEN_30.json`, scratch):
portfolio **8 building / 8 arts / 7 science / 7 leadership**; preflight **strong 0 / plausible 27 / risky 3** (target: >=24
strong+plausible, <=6 risky, >=4 strong/plausible per group: met). Risky: Tan Kah Kee, Mahmoud Mokhtar, Feza Gursey.

Frozen regions as coded in the candidate files: western Europe 7, central Europe 5, south Asia 5, east Asia 4, north America 3, and
one each of central Asia, southern Europe, north Africa, Latin America, West Asia and Sub-Saharan Africa. Western Europe is 7 of 30
(23%). The repo has no Southeast Asia or Oceania region id, so Southeast Asians (Tan Kah Kee, Orosa, Truong Vinh Ky) are coded
`south_asia` and Oceanians (Wilkins, Mansfield, Te Rangi Hiroa) `western_europe`; counting by real geography the freeze reached
Southeast Asia 3, Oceania 3, Central Asia 1, Sub-Saharan Africa 1 and West Asia 1 (regions missed in earlier cycles).

## Ship / hold result

**Shipped (27)** - building 8 (Otto Sverdrup, Aurel Stein, Isaac Singer, Shokan Walikhanov, Shirase Nobu, Hubert Wilkins, Wilhelm
Steinitz, Tan Kah Kee); arts 7 (Mary Cassatt, Akutagawa Ryunosuke, Rosalia de Castro, Katherine Mansfield, Abanindranath Tagore,
Lesya Ukrainka, Carlos Gardel); science 6 (Ronald Ross, Walter Reed, Maria Orosa, Waldemar Haffkine, Hantaro Nagaoka, Ernst Mach);
leadership 6 (Ellen Key, Max Weber, Nishi Amane, Truong Vinh Ky, Tiyo Soga, Dayananda Saraswati). Frozen 8/8/7/7 -> shipped
8/7/6/6.

**Held (3), all portrait rights**, each kept `evidence_approved` with `portrait.status: held` (project convention), out of the
generator allowlist and out of production:

| Hold | Grade | Blocker class | Blocker | Next step |
|---|---|---|---|---|
| mahmoud-mokhtar | risky | portrait rights/provenance | Commons lead has no caption, holder or verifiable 1930 provenance; other known photographs belong to the private Mahmoud Mukhtar Archive | permission from the archive or a captioned pre-1931 published print |
| feza-gursey | risky | portrait rights | Commons lead is a 2022 own-work upload tagged Wrong license for a man who died in 1992; Bogazici archive bot-walled, AIP 403 | licensed photo from the Bogazici Feza Gursey Archive or AIP |
| te-rangi-hiroa | plausible | portrait rights: holder terms | Turnbull sibling item 1/2-037930-F states Crown copyright and permission required; Archives NZ 1927 passport photo has an unverified sitter and a walled licence page | Turnbull permission/record for 1/2-037931-F or a captioned pre-1931 print |

## Preflight calibration

| Grade | Frozen | Shipped | Held | Initial lead survived | Replacement shipped |
|---|---|---|---|---|---|
| strong | 0 | 0 | 0 | 0 | 0 |
| plausible | 27 | 26 | 1 | 7 | 19 |
| risky | 3 | 1 | 2 | 0 | 1 |

Overall: **7 of 27 shipped portraits are the initial lead (Sverdrup, Stein, Singer, Haffkine, Key, Weber, Nishi) and 20 are
replacements.** The lead failed outright for all 3 holds. Risky hold explanations: Mokhtar and Gursey, where no rights chain existed
for the only visible lead. Plausible hold: **Te Rangi Hiroa**: graded plausible at the scan level although the Commons lead's
own Turnbull record family carries a restriction risk and no independent second route existed: the same error corrected after
Roster66, and retrospectively judged too optimistic (a scan-only preflight cannot see holder terms). Risky ship: Tan Kah Kee, rescued
by a captioned 1908 plate in *Twentieth Century Impressions of British Malaya* (small 492x492 halftone, weak quality, accepted).

**Holder-record contradictions** (authoritative holder overriding a permissive aggregator tag): Cassatt (Smithsonian AAA:
"copyright status undetermined" vs Commons PD), Mansfield (Alexander Turnbull Library: copyright and usage unknown), Wilkins (LOC:
"rights status not evaluated" vs a PD-USGov tag), Truong Vinh Ky (BnF OAI: "restricted use" vs Commons PD), Tan Kah Kee
(National Archives of Singapore permission note vs PD-Singapore), Orosa (private family holder, no PD statement), Walikhanov
(plate credit names the phototype printer, not the photographer), Stein and Haffkine (Wellcome Public Domain Mark vs Commons
CC BY 4.0), Ross and Reed (no holder/creator/date for the Commons leads), Mach (Scolik/ONB attribution added later without an item
number), Gursey (own-work upload tagged Wrong license), Te Rangi Hiroa (Turnbull Crown copyright). **Inscription/sitter
findings:** Truong Vinh Ky (the 1883 Gallica sitter looks distinctly younger than 45), Wilkins (final print carries no lettering;
identity moderate-low risk from the LOC caption and visual match), Stein, Haffkine, Tagore and Akutagawa (no sitter lettering on
the plate; identity rests on the holder listing or the placement in the book).

Residual caveats for review: Weber (BSB bavarikon holder record bot-walled and unread; first publication undocumented),
Rosalia de Castro (Real Academia Galega rights statement unread, used the sibling print held by the Fundacion Rosalia de Castro),
Gardel (possible Europeana CC BY-NC-SA digitisation label could not be opened, 403), Walikhanov (low-resolution crop from a
Commons scan, holder records read only secondhand), Dayananda (small greyscale plate from Farquhar 1915, labelled
`historical_depiction`), Lesya Ukrainka (Trush oil, two versions Lviv/Kyiv, crop of a 2021 exhibition photograph), Nishi Amane
(the "June 1880" photograph date unverified).

## Research, calibration and review

- **Initial scored rows**: 233 across the 30 (215 across the 27 shipped; per-candidate min 5, median 8, max 13). Final row
  count equals initial for every candidate (**0 rows removed**).
- **Agent self-lowerings and concentration check** (from the handbacks): 208 row-lowerings across 233 rows (207 scores, 208
  confidences; **0 raised, 0 raise flags**); **150 rows were corrected specifically because of source-family concentration**
  (138 of them in the 27 shipped). Typical cause: one biographer or one institutional account retold by several outlets, and
  obituary-dominated or own-account-dominated rows (Stein, Tan Kah Kee, Walikhanov).
- **Lead review**: **19 downward `RUBRIC_CORRECTION`s on 10 candidates** (Mach 4, Wilkins 3, Shirase 3, Steinitz 2, Weber 2, Stein 1,
  Tan Kah Kee 1, Key 1, Dayananda 1, Walikhanov 1; log `lead_corrections_log.json`), all for residual concentration or
  overstated confidence, none raised, **0 row removals**. Comparison with Roster66: **58 lead corrections in 22 candidates then;
  19 in 10 candidates now**, a drop of about two thirds, coinciding with the new agent-side concentration step (which lowered
  150 rows before handback). Correlation, not proven cause; the number was not forced.
- **Achievement gate**: agents passed all six checks for all 30; the lead's check of first two cards found no failure (defining
  contribution first in every card set; Singer leads with the sewing-machine redesign, Ross with the malaria finding, Mach with
  Die Mechanik). **0 Achievement corrections.** Editorial wording was patched by the lead to avoid health/private-condition
  language (Mansfield's illness references removed; Mach's documented 1898 stroke retained as a recorded fact).
- **Taxonomy/region**: Southeast Asia is coded `south_asia` and Oceania `western_europe` (no ids exist). Taxonomy repair (post-review,
  see "Post-review repair" below): the first draft resolved the Directory `>=2 people` curation rule by *narrowing* Walter Reed's and
  Ernst Mach's `fieldIds`; that was the wrong resolution and was reversed.
- Korean display names: several are agent transliterations with no Wikidata ko label and need a Korean reviewer (Walikhanov,
  Rosalia de Castro, Orosa, Tan Kah Kee, Soga, Truong Vinh Ky, Mokhtar, Te Rangi Hiroa).

## Eligibility, counts, categories, cohort

- Eligibility computed only after scoring was frozen: **0 of 27 eligible**; scored rows min/median/max **5 / 8 / 13** (215 total);
  high-confidence row counts 0-10 per person; high-confidence averages 0.50-0.56. Pre-existing eligible set untouched (**114**).
  Cumulative Roster33-67: **591 shipped, 0 eligible**, recorded, not re-investigated, no rescue.
- Production **816**, visible **815**, eligible **114**, candidate JSON **997** (967 + 30; the 3 holds stay on disk as candidates).
- `categoryCounts.ts` after:

```
current: {"production":816,"visible":815,"categoriesProduction":{"science_knowledge":340,"arts_culture":302,"leadership_society":156,"building_discovery":259},"categoriesVisible":{"science_knowledge":340,"arts_culture":302,"leadership_society":155,"building_discovery":258}}
```

| | before prod | after prod | delta | before visible | after visible | delta |
|---|---|---|---|---|---|---|
| science_knowledge | 327 | 340 | +13 | 327 | 340 | +13 |
| arts_culture | 290 | 302 | +12 | 290 | 302 | +12 |
| leadership_society | 147 | 156 | +9 | 146 | 155 | +9 |
| building_discovery | 251 | 259 | +8 | 250 | 258 | +8 |

Category deltas exceed 27 because people count in more than one category by `fieldIds` mapping; the science delta is +13 = +12 Roster67
science people plus +1 existing person (Jean Piaget, whose only field `psychology` is now curated into `science_knowledge`); production-vs-visible stays one
(Zheng He). **Distance to 1000: 184.** The ~750 checkpoint remains EXPANSION_GREEN; the next planned checkpoint is about 1000.

## Validation, calibration, build, browser QA

- `tsc --noEmit` clean; `validateCandidates.ts` 0 errors, 0 warnings; full Vitest **8807/8807** (97 files, final repaired state;
  the first run after wiring had 48 failures, all mechanical count-literal assertions plus the taxonomy guard).
- Calibration run twice: output identical, `meanSd=11.704`, eligible set unchanged, `dispersion.generated.ts` blob hash equal to
  HEAD (`73e0383...`; line-ending-only noise restored).
- Final build (from the final repaired data, after the taxonomy/label/fieldIds repair): `Generating static pages ...
  (1656/1656)` = **2 x 816 + 24**.
- Focused Playwright (Person, Editorial, Directory, Compare, Trait Explanation, 142 tests): first run **142/142** (3.1 min), run after
  the readable-id fix **142/142** (2.6 min), final run on the repaired data **142/142** (2.0 min). The full Playwright suite was not run.
- Local 375x812 QA (Playwright Chromium, mobile emulation, **real sequential navigation through all 54 shipped EN-US/KO-KR
  pages with a console/pageerror/requestfailed listener attached to the one page for the whole run**): 0 horizontal overflow,
  0 broken images, KO display name present, first Achievement card present, portrait attribution present, 0 raw ids or
  taxonomy leakage after the fix; **0 console errors/warnings/page errors/failed requests on the 54 shipped page loads**. The 6
  events recorded were the deliberate 404 resource messages of the 6 hold-route checks (3 holds x 2 locales), all 404.
- Local EN/KO/portrait 200 for every shipped candidate (the sweep requires the page and its portrait to render without a broken
  image); every hold route absent (404).
- **Source-link sweep** (run before the final build): 232 URLs across the 27 shipped candidates (sources and portrait
  licence/attribution/source-page links): **219 x 200, 12 x 403 bot walls, 1 x 429 (Wellcome rate limit, re-checked 200), 0 x 404,
  0 x 5xx, 0 timeouts/TLS/reset**. No link edits were needed.

## Scoring lock

After the implementation commit `51fa151`: `checkScoringLockIntegrity.ts` checked **997** previously-committed candidate files against
HEAD, **0 flagged**; legacy scoring lock **22** pre-pipeline production people covered, **0 flagged**. The committed, on-disk and
checked candidate JSON are identical (the 30 new files were committed before the lock ran). The 30 candidate flags (new files) are
0; the checker flags only edits to previously committed files.

## Defects found

1. **Raw trait ids in public editorial prose**: five profiles (Key, Weber, Nishi, Soga, Dayananda) and Mach rendered snake_case trait ids
   (e.g. `conflict_tolerance`) in EN interpretation text; the agent brief omitted the "write readable trait names" rule. Fixed in the EN
   text (9 lines). **Root cause of the missed guard** (found in the post-review repair): the `RAW_ID` regex in the per-roster audits
   since Roster42 contains literal backspace characters (0x08) where `\b` word boundaries were intended (an authoring-tool escape
   collapse), so it could never match: the guard was dead in 25 audits (Roster42-67). The rendered surface itself
   (`editorialText()` for each item's `textKey`/`interpretationKey`, as used by the profile page and the trait-explanation popover)
   was already the traversed surface; there was no missed UI path.
2. **Directory taxonomy >=2 rule resolved the wrong way** (reversed in the repair): see below.
3. Agent portrait leads failed holder checks for 20 of 27 shipped candidates and all 3 holds; no silent upgrade of a grade.
4. A generator header carried a stale ordinal ("thirty-first") and an assembler insertion mode needed a patch (below).

## Post-review repair (2026-11-14, PR #81 before merge)

A final review found two defects in the earlier draft; both were fixed on `feat/roster67` as an additional commit (no history rewritten):

- **Taxonomy.** `src/core/people/directoryTaxonomy.ts` curates a `fieldId` into a Directory chip when at least 2 production people carry
  it, and states that this is a UI-curation rule that must not alter `Person.fieldIds`. Roster67 pushed `microbiology` (Louis Pasteur,
  Walter Reed) and `psychology` (Jean Piaget, Ernst Mach) over the threshold; the first draft narrowed Reed to `biology` and Mach to
  `physics, philosophy` to avoid the new chips. That hid legitimate semantics. Final: Walter Reed `["medicine", "microbiology"]`, Ernst
  Mach `["physics", "philosophy", "psychology"]`; `microbiology` and `psychology` added to `science_knowledge` in
  `PROFESSION_CATEGORIES` (rule and threshold unchanged); labels `field.microbiology` Microbiology / 미생물학 and `field.psychology`
  Psychology / 심리학 added to `en.ts`/`ko.ts`. Roster67 output and the people index were regenerated from the candidates; scores,
  confidences, evidence types, impacts and eligibility are unchanged (114 eligible). Directory QA: both chips render with the right EN/KO
  labels; the Microbiology filter returns Louis Pasteur and Walter Reed (KO: "전체 816명 중 2명"), the Psychology filter returns Jean
  Piaget and Ernst Mach.
- **Raw-id guard.** Root cause above (dead regex). Fixes: the Roster67 audit's `RAW_ID` now uses real `\b` boundaries and has a
  control test (it matches `conflict_tolerance`/`creative_originality`/`proactive_agency`, accepts readable prose, and asserts the regex
  source contains no backspace character); a general guard in `src/core/people/editorialValidation.test.ts` checks the resolved EN and
  KO editorial text of every person against the real attribute-id vocabulary, with positive and negative controls, and was verified
  to fail when a raw id is reintroduced. **Newly discovered pre-existing debt:** with a live guard, 189 older production people
  (480 EN/KO texts, e.g. "high opportunity_sensing score") also render raw ids in editorial interpretations; they were outside this
  repair, so the general test freezes them as a ratchet baseline (new or Roster67 people must be clean) and the cleanup is a separate
  content task.

Scoring lock after the repair commit `ea581bc`: committed candidate files 997, on-disk candidate files 997, checked 997, **0 flagged**
(legacy 22 covered, 0 flagged); the repair changed only `fieldIds` in two candidate files.

Not invalidated by the repair: the source-link sweep (no URL changed). Re-run: tsc, candidate validation, taxonomy tests, Roster67
audit, full Vitest (8807/8807), calibration x2 (identical), the final build (1656), focused Playwright (142/142) and local QA (54
shipped page loads at 375x812 with console capture on every navigation: 0 issues, 0 console events, 27 portraits 200).

## Maintenance-friction observations (no maintenance done here)

Count-sensitive files mechanically touched: **44** (40 audit tests, `profilePublicationSeparation`, `matching.test.ts`,
`matchPoolIntegrityAudit` + test, `e2e/peopleDirectory.spec.ts`; +245/-162 lines of count-literal and slug-list churn). External
helper-script failures or manual patches: **2** (stale ordinal in the generated generator, assembler insertion-mode bug) plus
two mechanical taxonomy fixes. Wiring remained a **meaningful source of cycle friction** again (about the same as Roster66). **Recommend
the bounded maintenance PR (shared production-count constant + checked-in wiring script) before Roster68.**

## Not done / not changed

No scale checkpoint was run, no eligibility rescue, no Legacy Batch 6, no matching/scoring/calibration change, no shared-count
refactor, no checked-in wiring-script refactor, no scoring-lock batching, no Directory virtualization, no eligible-only quiz
index, no legacy portrait recompression. Roster68 is not started. Candidate preflight was scan-level (holder records not opened
at freeze). The research ran across two usage-limit pauses; all agent work was persisted and resumed without loss.
