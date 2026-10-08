# Roster44: ninth fresh cycle after the matching diagnostic (2026-10-08)

Third cycle run under the **Major Achievement Selection Standard**
(`docs/editorial-content.md`).

Base SHA: `cbafa509bc956bc15951a7f8601510d0dfec5ca8` (`ROSTER44_BASE_SHA`),
the merge commit of PR #55 (Roster43): exactly two parents, `98ecccf1...`
(prior main) and `cc6783ce...` (Roster43 head). PR #55 was merged with a
normal merge commit, head-guarded on `cc6783cefb8fffb23a3f196e73ed567aff5d34e2`
(OPEN, non-draft, CLEAN, Vercel SUCCESS on that head; branch kept).
Starting state, mechanically verified: production 378, directory-visible 377,
match-eligible 114, candidate JSON 445, legacy baseline 22 / 0 flagged.
Classification carried forward: **CONTINUE_EXPANSION_AS_IS**.

## Selection: 15 frozen, 15 shipped, 0 held, 0 backlog reuse

One cheap backlog inventory: 89 non-production candidate files (6
`evidence_approved`: Hillary, Uemura, Roddick, Shannon, Potter, Sullivan; 83
`held`). No concrete new signal for any; none retried. Pre-freeze preflight:
no slug/QID collision, zero-politics primary identity, region expressible in
the current taxonomy (no Oceania), portrait lead plausible, independent
non-self sources plausible.

| Slug | fieldIds (final) | Category (directory taxonomy) | Tier |
|---|---|---|---|
| igor-sikorsky | engineering, technology, business | building + science | field-famous |
| gottlieb-daimler | engineering, technology, business | building + science | international |
| suzanne-lenglen | sport | building | field-famous |
| knud-rasmussen | exploration | building | long-tail |
| gordon-moore | business, technology, chemistry, engineering | building + science | field-famous |
| lou-gehrig | sport | building | international |
| claude-debussy | music | arts | international |
| edgar-degas | art | arts | international |
| herman-melville | literature | arts | international |
| sergei-rachmaninoff | music | arts | international |
| kathe-kollwitz | art | arts | field-famous |
| alessandro-volta | physics, chemistry | science | international |
| william-thomson-kelvin | physics, engineering | science | international |
| william-harvey | medicine | science | international |
| tycho-brahe | natural_science | science | international |

Mix 10 international / 4 field-famous / 1 long-tail. By directory category
(shipped = frozen): building 6, arts 5, science 7 (science exceeds the 4
target because Sikorsky/Daimler/Moore/Kelvin carry engineering/chemistry
ids; no ids were added to hit a mix). All fresh. Zero-politics: Kollwitz's
pacifist/party activity and Daimler/Tycho court roles are incidental and
unscored. Two women (Lenglen, Kollwitz). `aviation` and `anthropology` have no `field.*` key and were not
used (Sikorsky: engineering/technology/business; Rasmussen: exploration).

## Held: 0

No new hold. (Roster43's Louis Sullivan and Roster42's Beatrix Potter remain
portrait-held; unchanged, not retried.) No 16th candidate.

## Shipped: 15

Substantive source counts are the research agents' own reports of records
actually opened and read (Wikipedia/Wikidata orientation excluded).

| Slug | Substantive sources | Independent perspectives | Rows | Publication | Eligible |
|---|---|---|---|---|---|
| igor-sikorsky | 12 | Wohleber, Frank Gregory, Eugene Wilson, Les Morris, Pan Am historian, ASME/Smithsonian curator + family (S. Sikorsky) | 12 | evidence_approved | no |
| gottlieb-daimler | 9 | Steinway diary, Die Gartenlaube, Weeks 1904, NDB, DPMA, Benz (rival, self) | 5 | evidence_approved | no |
| suzanne-lenglen | 14 | Myers, Tilden (critical of temperament), 1926 press, Edinburgh Univ. blog, institutions | 7 | evidence_approved | no |
| knud-rasmussen | 8 | Harper (critical), Lubowicka (post-colonial), SPRI obituary + Mathiassen/Freuchen (partisan) | 12 | evidence_approved | no |
| gordon-moore | 11 | Grove, Last, Jones (colleagues, one critical), NPR, Stanford Lawyer + self interviews | 8 | evidence_approved | no |
| lou-gehrig | 8 | SABR (Ray, Krieger, Ardolino), Hall of Fame, MLB; Ruth/Dickey/Gomez via those essays | 3 | evidence_approved | no |
| claude-debussy | 7 | Rolland, Mason (adversarial), Laloy, Vuillermoz, Liebich; Vallas compiles the rest | 12 | evidence_approved | no |
| edgar-degas | 6 | Vollard, Moore, Huysmans, Lemoisne, Lafond; hostile voices via Boggs chronology | 13 | evidence_approved | no |
| herman-melville | 8 | Hawthorne, National Archives, Potter's review survey, Athenaeum (hostile), Putnam's editor | 10 | evidence_approved | no |
| sergei-rachmaninoff | 7 | Tchaikovsky (via Tchaikovsky Research), Chaliapin, Rimsky-Korsakov, NY Sun critic, AP; Riesemann (told-to, self) | 13 | evidence_approved | no |
| kathe-kollwitz | 11 | Kollwitz Museum Köln/Berlin, NDB, ARTinWORDS, Art in America, Knauf/Kuhn; diary (self) | 7 | evidence_approved | no |
| alessandro-volta | 9 | Strasbourg translator, Carradori, Nicholson via Wilkinson (critic), Royal Society, family (Z. Volta) | 9 | evidence_approved | no |
| william-thomson-kelvin | 8 | Bright, Field, Whitehouse (adversary), Helmholtz, Darwin | 7 | evidence_approved | no |
| william-harvey | 11 | Aubrey, Ent, Moore, Power, Keynes 1978, O'Rourke Boyle (revisionist) | 10 | evidence_approved | no |
| tycho-brahe | 7 | Dreyer, Moesgaard, MacTutor, Gingerich & Voelkel, Verbunt & van Gent, Brewster | 13 | evidence_approved | no |

Total 141 scored rows across the 15 (136 substantive sources). Several key
books were lending-only or bot-walled and are named per candidate in its
notes (Eig, Delear, Pancaldi, Thoren, Christianson, Keynes 1966, Hastrup,
Burchfield, Nichols, Bertensson & Leyda). Lou Gehrig is the thinnest profile
(3 rows); sparse is not invalid, nothing was padded.

## Major Achievement review

Every candidate's draft carried a review tuple from the research agent; the
lead re-read every set of Achievement cards (draft and rendered production
page).

- Checked: **15**.
- PRIMARY-CONTRIBUTION failures before correction: **0**.
- TOP-OMISSION failures before correction: **1**: Käthe Kollwitz, whose agent
  marked NEEDS_SOURCE because the Pietà (Neue Wache) was a defining work with
  no opened source. Corrected with the single bounded source addition the
  brief allows (Kollwitz Museum Berlin sculptures page plus the Köln
  biography, added as a source; the installation year is deliberately not
  stated because the page gives none); no scoring field was touched.
- IDENTITY failures before correction: **0**.
- Final: **15/15 PASS** on all three checks. Caveats recorded, not failures:
  Rachmaninoff's Symphony 2 / Rhapsody / Concerto 2 dating rests partly on
  Wikipedia orientation; Daimler and Rasmussen ship with 3 cards (no filler);
  Volta's marsh-gas card says "inflammable marsh air" (no source uses the
  modern name). Side material was routed to Moments (Tycho's Frauenburg check,
  Harvey's Nuremberg demonstration, Kelvin's age-of-the-earth exchange,
  Rasmussen's Steensby restatement, Volta's marsh-gas hunt).
- Rendered-page spot-read (production server) for Kollwitz, Debussy (arts),
  Harvey, Volta (science), Gehrig, Rasmussen (sport/exploration): "Do these
  cards explain why this person matters?" PASS x6.

## Post-review portrait correction (Kollwitz)

PR review rejected the 1925 MoMA/Erfurth portrait (conflicting institutional
ARS copyright notice vs. a generic Commons PD template) and replaced it with
the 1917 Erfurth photograph from the Dresden collection (explicit pre-1931
publication basis, 565x682, no upscaling). Only Kollwitz's portrait metadata
and asset changed; identity, rows, scores, editorial, publication and
eligibility are untouched. Verified: file opens at 565x682, EN and KO routes
200, portrait URL 200 (old URL 404), attribution correct in EN and KO, no
console error; `validateCandidates` 0 errors, `roster44.test.ts` 175/175, `tsc`
clean, rebuild printed `Generating static pages using 21 workers (810/810)`.

## Lead-review corrections (before eligibility; downward only)

- **claude-debussy**: creative_originality 85/0.72 -> 80/0.66,
  aesthetic_sensitivity 84/0.70 -> 80/0.66, autonomy_need 84/0.72 -> 80/0.66,
  independent_thinking 80/0.72 -> 78/0.68, experimentation 80/0.70 -> 78/0.66,
  perfectionism 78/0.72 -> 76/0.66 (corroboration reached us mostly through
  one compiling source, Vallas).
- **edgar-degas**: perfectionism 86/0.72 -> 82/0.68, experimentation 86/0.72 ->
  82/0.68, independent_thinking 82/0.70 -> 80/0.66, autonomy_need 82/0.70 ->
  80/0.66 (corroboration largely through the Boggs catalogue chronology).
- Each corrected rationale carries a "LEAD REVIEW CORRECTION" note.
- Mechanical: a mistyped archive.org identifier in Kollwitz's Knauf source URL
  (`...01iknau` -> `...01knau`) fixed after the link check; Rasmussen's
  Korean display name aligned to the editorial name (라스무센).
- All other profiles accepted as researched.

## Portraits and material rights notes

Every shipped portrait: exact source page / licence read, real download,
file opens, recorded dimensions = actual, local asset, 200 on the production
server; never upscaled; down-sized to <=1600px long edge at q85 only where
the original was larger.

| Slug | Portrait | Basis | Note |
|---|---|---|---|
| igor-sikorsky | Karl Bulla 1914 studio portrait (Commons) | PD-old (Bulla d. 1929) | 640x1061; scan from a 1993 book; no upstream institution page verified |
| gottlieb-daimler | Plate "GOTTLIEB DAIMLER", Weeks, *Automobile Biographies* (1904), Internet Archive | pre-1931 publication, IA "not in copyright" | halftone; photographer unnamed; Commons lead rejected (Getty/press-kit source) |
| suzanne-lenglen | Bain News Service negative LCCN 2014712853 | LOC no known restrictions; PD-Bain | date unverified (file named "undated"); LOC page bot-walled |
| knud-rasmussen | Bain (LOC ggbain.02631) | LOC no known restrictions (via Commons wikitext) | date unrecorded; loc.gov page bot-walled |
| gordon-moore | Science History Institute staff photo 2004 | CC BY-SA 3.0 (Commons, released with permission) | institute page not found; credit "staff photographer" |
| lou-gehrig | Keystone View Co. stereograph c1930 (LC-DIG-ppmsca-18599) | LOC API: registered JO 6667, no renewal; US pre-1931 | 920x1100, soft print; left view cropped |
| claude-debussy | Atelier Nadar, BnF Gallica FT 4-NA-237 (6), 1890-1910 | Gallica "domaine public"; Commons PD-Old | image is Cuerden's restoration; date is a range |
| edgar-degas | Self-portrait, red chalk c.1855, NGA 1991.182.23 | CC0 (NGA open data), Degas d. 1917 | NGA page bot-walled; chain via Commons + open-data record; painted self-portrait as `likeness` |
| herman-melville | Joseph O. Eaton 1870 oil portrait (Houghton, Harvard) | Commons PD-Art (Eaton d. 1875) | Houghton holding rests on Commons; Harvard page unavailable |
| sergei-rachmaninoff | Kubey-Rembrandt c1921 (LOC LC-USZ62-40236) | LOC copyright date c1921, pre-1923 PD | LOC lists rights "not evaluated"; UW Sayre 1923 photo ("In Copyright") and CC-BY-SA restoration rejected |
| kathe-kollwitz | Hugo Erfurth, "Bildnis Käthe Kollwitz", **1917** (Kupferstich-Kabinett, Staatliche Kunstsammlungen Dresden, via DDB / Commons) | Erfurth d. 1948; published before 1931 so PD in the US; author term expired in Germany (Commons PD-old-auto-expired) | 565x682, native size (PNG converted to JPEG, not upscaled). **Replaced the 1925 MoMA/Erfurth print** after PR review: MoMA's item page shows a live "Copyright 2026 Hugo Erfurth / ARS" notice that materially conflicts with the generic Commons PD-US tag, which documents no US publication basis (and Commons discussion raised US-status doubts for Erfurth photographs from 1924 on) |
| alessandro-volta | Engraving by Bonatti after Garavaglia (before 1834; Penn Edgar Fahs Smith collection) | "No Copyright - United States"; artists d. <1836 | `historical_depiction`; Penn catalogue URL may move (retired Oct 2026) |
| william-thomson-kelvin | Annan carbon print c.1900 (NGS PGP 230.1, via Commons) | Commons PD-scan (restoration) | NGS page bot-walled; pre-1931 publication of this exact image not established |
| william-harvey | Oval portrait after Mytens c.1627 (NPG 5115, via Commons) | PD-art-old-100 | NPG page bot-walled; if it proves a copy, downgrade to `historical_depiction` |
| tycho-brahe | Skokloster Castle oil 1596 (SKO 11593) | museum Public Domain Mark; PD-old-100 | `historical_depiction` (copy of the de Gheyn type, not shown from life) |

## Publication vs. eligibility

Rows, confidence, evidenceType, metadata and publication decisions (15 x
`evidence_approved`) were frozen first (the downward lead-review corrections
above were made before eligibility was read); eligibility was then read only.
**All 15 shipped are non-match-eligible**: no padding, no rescue. Roster44
statistics (min / median / max): rows 3 / 10 / 13; coverage 0.098 / 0.299 /
0.393; high-confidence count 3 / 9 / 13; high-confidence average 0.544 /
0.583 / 0.629. Roster44 eligible N = 0.

## Production, promotion, index, localization

`generateRoster44.ts` (explicit 15-slug literal allowlist;
`preparePersonSeedForPromotion()`; never reads eligibility) -> `roster44.ts`;
`ROSTER_44` wired into `seed.ts` and `NAMED_ROSTERS`. `peopleIndex.generated.ts`
regenerated (393 entries; diff = header count + 15 entries; no unrelated
drift). 15 `person.name.<slug>` Korean names + concise EN/KO editorial (no raw
ids).

| | Before | After |
|---|---|---|
| Production | 378 | **393** |
| Directory-visible | 377 | **392** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 445 | **460** |

### A. Published/directory field-category coverage (directory taxonomy)

| Category | Before (378) | After (393) | Delta |
|---|---|---|---|
| science_knowledge | 167 | 174 | +7 |
| arts_culture | 136 | 141 | +5 |
| leadership_society | 77 | 77 | +0 |
| building_discovery | 106 | 112 | +6 |

### B. MATCH-ELIGIBLE interest-scope pools (114 eligible people)

| Category | Before | After | Delta |
|---|---|---|---|
| science_knowledge | 50 | 50 | +0 |
| arts_culture | 43 | 43 | +0 |
| leadership_society | 42 | 42 | +0 |
| building_discovery | 15 | 15 | +0 |

## Recent-cohort watch (recorded, not re-analyzed)

Roster44 shipped 15, eligible 0. Cumulative Roster33-44: **168** shipped,
**0** match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS.

## Calibration, dispersion, matching health

`calibrate.ts quiz` x2: identical output; eligible cohort unchanged (114);
dispersion blob hash identical to HEAD (meanSd 11.704); no anchor file
changed; no refresh; `CALIBRATION_VERSION` = `calibration_v3`. Matching
health: focused confirmation only (full `matching.test.ts` passes with the 15
added to the known-non-eligible lists).

## Test/audit maintenance

Mechanical bumps 378->393 / 377->392 (Roster24-43 pattern): lineage audit
(`ROSTER_44`, regex `4[0-4]`), matching / publication-separation divergent
lists (+15), kurosawa + legacy batch 2-5 + roster33-43 tests, e2e Directory
("392 people", "전체 393명 중 9명"; the cross-facet 9 is unchanged, Playwright
passes). New `roster44.test.ts`: 15 x 10 table-driven checks + backlog/hold
absence (incl. Potter and Sullivan evidence_approved + portrait held) +
cross-target integrity + structural Major Achievement test. Historical
significance remains a human gate.

## Validation

- `tsc --noEmit` clean. `validateCandidates.ts`: 460 candidates, 0 errors, 0
  warnings (`qa_passed` 93, `evidence_approved` 284, `held` 83).
- `vitest run`: **74 files, 2677 tests, all passed**.
- `next build --webpack`: success. **Literal build output:**
  `Generating static pages using 21 workers (810/810)`. (It is printed as one
  unambiguous number; reported as printed, not derived.) No regression
  observed.
- Focused Playwright (Person, Editorial, Directory, Compare): **128/128**. The
  first attempt hit the 180 s `webServer` timeout before any test ran
  (transient: the identical command passed on retry; no code change between).
- Manual QA (production server): all 15 EN + 15 KO routes 200; all 15
  portraits 200; Sullivan route 404 as intended; Compare route 200; visible-text
  scan: no raw `src_` ids, no snake_case attribute ids, no `person.`/`field.`
  key leaks; every page carries the non-eligible notice; true 375px sweep of
  all 15 in the built-in browser: no horizontal overflow, no broken images, 7
  sections each. No eligible new profile exists to spot-check.
- Source-link check, 151 URLs: 143 x 200; 7 x 403/405 (bot walls); 0 x 429,
  0 timeouts, 0 encoding failures; 1 true 404 (a mistyped archive.org
  identifier in Kollwitz's Knauf source, fixed and re-verified 200).

## Post-commit scoring lock

Run against the clean committed HEAD (implementation commit `3bc1c51`):
"Checked 460 previously-committed candidate file(s) against HEAD. 0
flagged." with "Legacy scoring lock: 22 pre-pipeline production people
covered, 0 flagged." Mechanical count of committed
`data-pipeline/candidates/*.json` at that HEAD (`git ls-tree`): **460** = 460
on disk = the checked count. Implementation commit: 61 changed files.

## Confirmations

No matching/architecture diagnostic repeated; no performance, similarity,
route-payload or storage benchmark (build success + the literal static-path
line only). No eligibility padding or rescue. Legacy lane paused (no legacy
research, rescoring or tuple change; Legacy Batch 6 not started). The older
henry-ford / vincent-van-gogh / stephen-hawking editorial debt and the
Rembrandt/Kubrick source-note raw-id cleanup were not pulled into Roster44.
Roster45 not started.

## Operational notes

Concurrency 2 while the usage window was comfortable. The 5-hour window was
exhausted mid-cycle (two agents stalled at the 600 s watchdog, one with
nothing saved); research paused ~3.5 h for the reset, then resumed
(Rachmaninoff continued from disk via SendMessage, Volta restarted).
