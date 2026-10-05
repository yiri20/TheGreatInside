# Roster43: eighth fresh cycle after the matching diagnostic (2026-10-05)

Second cycle run under the **Major Achievement Selection Standard**
(`docs/editorial-content.md`).

Base SHA: `98ecccf191e58b4d2a6cce4ff31b422bd32e7233` (`ROSTER43_BASE_SHA`),
the merge commit of PR #54 (Roster42): exactly two parents, `37371d64...`
(prior main) and `4fa1073c...` (Roster42 head). PR #54 was merged with a
normal merge commit, head-guarded on `4fa1073cd5cda9fa1149e968887caf9e54ef7ac2`
(OPEN, non-draft, CLEAN, Vercel SUCCESS on that head; branch kept).
Starting state, mechanically verified: production 364, directory-visible
363, match-eligible 114, candidate JSON 430, legacy baseline 22 / 0 flagged.
Classification carried forward: **CONTINUE_EXPANSION_AS_IS**.

## Selection: 15 frozen, 14 shipped, 1 held, 0 backlog reuse

One cheap backlog inventory (88 non-production candidate files: 5
`evidence_approved` = Hillary, Uemura, Roddick, Shannon, Potter; 83 `held`).
No new signal for any of them; none retried, all 15 fresh. Oceania nationals
were excluded in preflight (no region bucket); Nordic/Finnish people map to
`western_europe`, Russians to `central_europe` (existing precedent).

| Slug | fieldIds (final) | Category (by directory taxonomy) | Tier | Outcome |
|---|---|---|---|---|
| louis-bleriot | engineering, technology | science + building | international | shipped |
| glenn-curtiss | engineering, technology, business | science + building | field-famous | shipped |
| roy-chapman-andrews | exploration, natural_science | building + science | long-tail | shipped |
| dennis-ritchie | computing, technology | building | international | shipped |
| gertrude-ederle | sport | building | field-famous | shipped |
| paavo-nurmi | sport | building | international | shipped |
| douglas-engelbart | computing, technology, engineering | building + science | field-famous | shipped |
| antonin-dvorak | music | arts | international | shipped |
| edvard-munch | art | arts | international | shipped |
| henri-matisse | art | arts | international | shipped |
| louis-sullivan | architecture | (not in a directory category) | field-famous | **held** (portrait) |
| gottfried-wilhelm-leibniz | mathematics, philosophy | science | international | shipped |
| paul-ehrlich | medicine, biology | science | international | shipped |
| henri-poincare | mathematics, physics, philosophy | science | international | shipped |
| heinrich-hertz | physics | science | international | shipped |

Frozen mix 10 international / 4 field-famous / 1 long-tail; shipped 10 / 3 / 1.
All fresh. Zero-politics: no primary political/military/activist identity
(Nurmi's 1932 amateur ban is framed only as an eligibility decision; Leibniz's
court roles unscored). One woman (Ederle). No new taxonomy vocabulary: the
`aviation` field id has no `field.*` key, so Blériot/Curtiss use
engineering/technology; Sullivan's `architecture` has one.

## Held: 1

| Slug | Blocker | Reusable work | Next step |
|---|---|---|---|
| louis-sullivan | No rights-clear, adequately sized portrait: the Commons c.1895 photo (645x1013) has unknown author/date, a Tumblr source and an unverified PD tag; the Art Institute of Chicago c.1890 photo carries copyright terms; the other Commons image is a 203x300 painting detail; the LOC item is not digitised | **Yes**: 8 substantive sources, 7 rows, EN/KO editorial draft (`docs/checkpoints/roster43-held-louis-sullivan-editorial-draft.json`); candidate `evidence_approved`, `portrait.status: "held"` | A pre-1931 *published* Sullivan portrait (e.g. an Architectural Record / Western Architect plate on the Internet Archive with the printed credit) or written permission from the Art Institute |

No 16th candidate was added.

## Shipped: 14

| Slug | Substantive sources | Independent perspectives | Rows | Publication | Eligible |
|---|---|---|---|---|---|
| louis-bleriot | 9 | Flight 1909/1936, Turner, Grahame-White & Harper (all sympathetic English-language) | 7 | evidence_approved | no |
| glenn-curtiss | 9 | Scientific American 1908, Flight, Turner, federal courts, Ellyson (insider) + self | 5 | evidence_approved | no |
| roy-chapman-andrews | 13 (2 abstract-only) | Gallenkamp via 3 reviewers (one critical), Preston/Strange Science, Embryo Project, Linda Hall, Rieppel & Chang (abstract) + self | 9 | evidence_approved | no |
| dennis-ritchie | 11 | Thompson, Kernighan, McIlroy, Seltzer, ACM/Van Vleck, Hyman, obituaries (no adversarial) + self | 6 | evidence_approved | no |
| gertrude-ederle | 8 | UP, AP, United News wires, Olympedia, Britannica, EBSCO, rival swimmer's cable | 5 | evidence_approved | no |
| paavo-nurmi | 13 | Olympedia, Finland100, World Athletics Heritage, Racing Past, UP/AP press, reference works | 6 | evidence_approved | no |
| douglas-engelbart | 8 | Weber (CHM), Mitchell (PARC, critical), Daniels/Bardini (critical), Landau + self interviews | 12 | evidence_approved | no |
| antonin-dvorak | 10 | Hadow, Mason, Brahms (letters), US press (Krehbiel), Hoffmeister/Šourek (shared base) | 9 | evidence_approved | no |
| edvard-munch | 14 | 1894 critics, Schiefler, Glaser, Berlinische Galerie, Munch Museum (legacy), Stenersen (quoted) | 11 | evidence_approved | no |
| henri-matisse | 12 | Stein, Fry, Wright (critical), Burgess (mocking), Perl, MoMA/AIC/Tate/Vence + self essay | 9 | evidence_approved | no |
| gottfried-wilhelm-leibniz | 5 | Clarke (adversary), Russell (critical), Merz, MacTutor, Stanford | 14 | evidence_approved | no |
| paul-ehrlich | 6 | Marquardt (secretary, partisan), Valent et al., Dreuw (adversarial), Nobel biography + self | 16 | evidence_approved | no |
| henri-poincare | 11 | Toulouse, Hadamard, Yoccoz, Walter, Damour (critical), Klein, Eddington, Darboux | 9 | evidence_approved | no |
| heinrich-hertz | 7 | Helmholtz, Planck, Lenard, Ludwig/Bonfort, Nordmann, ETHW + self intro | 13 | evidence_approved | no |

Source counts are the research agents' own reports of records actually
opened and read (Wikipedia/Wikidata orientation excluded). Thinnest source
base: Leibniz (5); thinnest rows: Curtiss and Ederle (5). Several key books
were lending-only or bot-walled and are named per candidate in its notes
(Gallenkamp, Antognazza, Barrow-Green/Gray, Bardini, Stout, Fölsing, Silverstein,
Schuyler). Total 131 scored rows across the 14. Nothing was padded; none of
the 14 was scored with an eye on eligibility.

## Major Achievement review

Every candidate's draft carried a review tuple from the research agent; the
lead then re-read every set of Achievement cards.

- Checked: **15** (14 shipped + the held Sullivan draft).
- PRIMARY-CONTRIBUTION failures before correction: **0**.
- TOP-OMISSION failures before correction: **0**.
- IDENTITY failures before correction: **0**.
- Corrections made: **none needed** at lead read.
- Final: **15/15 PASS** on all three checks. Caveat (recorded, not a failure):
  Matisse's top-omission PASS is soft, since *Blue Nude* and *The Red Studio*
  have no card (no opened source describes them in detail, so they are
  NEEDS_SOURCE-style omissions; Blue Nude is mentioned inside the Joy of Life
  card). Side material was routed to Moments (e.g. Curtiss's Wright suit,
  Ritchie's `noalias` dissent, Poincaré's mine report).

## Portraits and material rights notes

Every shipped portrait: exact source page / licence read, real download, file
opens, recorded dimensions = actual, local asset, 200 on the production
server; never upscaled.

| Slug | Portrait | Basis | Note |
|---|---|---|---|
| louis-bleriot | Vandyk photo, LOC LC-USZ62-100564 | pre-1931 publication; LOC no restriction | photographer/date not identified; LOC MARC page bot-walled |
| glenn-curtiss | Bain 1909 (LOC ggbain-04102) | LOC "no known restrictions"; Commons PD-US | photographer unidentified |
| roy-chapman-andrews | Bain c.1920 (LOC ggbain-50488) | LOC no known restrictions; PD-old-70-1923 | date is Commons's "circa 1920" |
| dennis-ritchie | Denise Panyik-Dale 2011 | CC BY 2.0 (Commons, Flickr-reviewed) | 640x850 native crop; Flickr page unreadable, chain via Commons |
| gertrude-ederle | Bain (LOC ggbain-37118) | LOC no known restrictions; PD-Bain | LOC Bain rights page not opened |
| paavo-nurmi | Agence Rol 1923 (BnF Gallica) | Gallica "domaine public"; PD-France | Gallica conditions page not opened; small Commons Antwerp file rejected |
| douglas-engelbart | Alex Handy 2008 | CC BY-SA 2.0 (Flickr page live-checked) | private photographer; attribution required |
| antonin-dvorak | BnF Gallica halftone plate (Est. Dvorak 001) | "domaine public" | creator unknown; date uncertain (1882 vs print 1900); halftone reproduction |
| edvard-munch | Anders Beer Wilse 1933 (Norsk Folkemuseum NF.WA03293) | DigitaltMuseum Public Domain Mark; PD-Norway50 | US status rests on the museum PDM |
| henri-matisse | Alvin Langdon Coburn 1913 photogravure (*Men of Mark*) | pre-1931 publication (Commons wikitext) | NYPL page not verifiable; Van Vechten 1933 rejected (no LOC rights statement) |
| gottfried-wilhelm-leibniz | Francke c.1695 (Herzog Anton Ulrich-Museum) | PD-Art / PD-old-100 | museum rights note unreadable; chain via Commons + Wikidata; `likeness` (contemporary painter, sitting not documented) |
| paul-ehrlich | Bain 1909 (LOC LCCN 00650787) | LOC no known restrictions; PD-Bain | caption strip cropped; LOC page bot-walled |
| henri-poincare | Henri Manuel print, Smithsonian Libraries (Dibner) | "no known copyright restrictions"; pre-1912 | Smithsonian lists photographer as unidentified; si.edu bot-walled |
| heinrich-hertz | Robert Krewaldt, Bonn c.1890 (Die Gartenlaube 1894) | published 1894, PD; ETH-Bibliothek copy PD-old-70 | Krewaldt dates undocumented |

## Publication vs. eligibility

Rows, confidence, evidenceType, metadata and publication decisions (14 x
`evidence_approved`; Sullivan portrait-held) were frozen first; eligibility
was then read only. **All 14 shipped are non-match-eligible** (no padding, no
rescue). Lead review made **no** score changes. Roster43 statistics (min /
median / max): rows 5 / 9 / 16; coverage 0.149 / 0.270 / 0.474;
high-confidence count 5 / 8 / 16; high-confidence average 0.553 / 0.578 /
0.609. Roster43 eligible N = 0.

## Production, promotion, index, localization

`generateRoster43.ts` (explicit 14-slug literal allowlist, Sullivan
deliberately excluded; `preparePersonSeedForPromotion()`; never reads
eligibility) -> `roster43.ts`; `ROSTER_43` wired into `seed.ts` and
`NAMED_ROSTERS`. `peopleIndex.generated.ts` regenerated (378 entries; diff =
header count + 14 entries; no unrelated drift). 14 `person.name.<slug>` Korean
names + concise EN/KO editorial (no raw ids).

| | Before | After |
|---|---|---|
| Production | 364 | **378** |
| Directory-visible | 363 | **377** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 430 | **445** (15 new: 14 shipped + held Sullivan) |

### A. Published/directory field-category coverage (directory taxonomy)

| Category | Before (364) | After (378) | Delta |
|---|---|---|---|
| science_knowledge | 159 | 167 | +8 |
| arts_culture | 133 | 136 | +3 |
| leadership_society | 77 | 77 | +0 |
| building_discovery | 99 | 106 | +7 |

(The "before" column reproduces the Roster42 checkpoint's "after" exactly.
Target was 4-5 arts; the Sullivan hold left it at 3.)

### B. MATCH-ELIGIBLE interest-scope pools (114 eligible people)

| Category | Before | After | Delta |
|---|---|---|---|
| science_knowledge | 50 | 50 | +0 |
| arts_culture | 43 | 43 | +0 |
| leadership_society | 42 | 42 | +0 |
| building_discovery | 15 | 15 | +0 |

## Recent-cohort watch (recorded, not re-analyzed)

Roster43 shipped 14, eligible 0. Cumulative Roster33-43: **153** shipped,
**0** match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS.

## Calibration, dispersion, matching health

`calibrate.ts quiz` x2. Eligible cohort unchanged (114): dispersion blob hash
identical to HEAD (meanSd 11.704); no anchor file changed; no refresh;
`CALIBRATION_VERSION` = `calibration_v3`. Matching health: focused
confirmation only (full `matching.test.ts` passes with the 14 added to the
known-non-eligible lists).

## Test/audit maintenance

Mechanical bumps 364->378 / 363->377 (Roster24-42 pattern): lineage audit
(`ROSTER_43`, regex `4[0-3]`), matching / publication-separation divergent
lists (+14), kurosawa + legacy batch 2-5 + roster33-42 tests, e2e Directory
("377 people", "전체 378명 중 9명"; the cross-facet 9 is unchanged because no
new person has the facet combination). New `roster43.test.ts`: 14 x 10
table-driven checks + backlog/hold absence (incl. Sullivan evidence_approved +
portrait held) + cross-target integrity + structural Major Achievement test.
Historical significance remains a human gate.

## Validation

- `tsc --noEmit` clean (it caught the assembler writing an undefined moment
  interpretation, fixed). `validateCandidates.ts`: 445 candidates, 0 errors, 0
  warnings.
- `vitest run`: **73 files, 2502 tests, all passed**.
- `next build --webpack`: success; 378 EN + 378 KO person pages generated
  (the Roster42 formula gives 2x378+24 = 780 static paths; this run's build-log
  line was not captured, the prerender manifest lists 775 routes). No
  regression observed.
- Focused Playwright (Person, Editorial, Directory, Compare): **128/128**.
- Manual QA (production server): all 14 EN + 14 KO routes 200; all 14
  portraits 200; Sullivan route 404 as intended; Compare route 200; visible-text
  scan: no raw `src_` ids, no snake_case attribute ids, no `person.`/`field.`
  key leaks (only legitimate archive.org `sim_` identifiers in two source
  URLs); every page carries the non-eligible notice; true 375px sweep of all
  14 in the built-in browser: no horizontal overflow, no broken images, 7
  sections each.

- Source-link check, 159 URLs: 142 x 200; 17 x 403/405 (bot walls); 0 x 404/410, 0 x 429, 0 timeouts.

## Post-commit scoring lock

Recorded in the docs follow-up below the implementation commit.

## Confirmations

No matching/architecture diagnostic repeated; no performance, similarity,
route-payload or storage benchmark (build success + static path count only).
No eligibility padding or rescue. Legacy lane paused (no legacy research,
rescoring or tuple change; Legacy Batch 6 not started). The older
henry-ford / vincent-van-gogh / stephen-hawking editorial debt and the
Rembrandt/Kubrick source-note raw-id cleanup were not pulled into Roster43.
Roster44 not started.

## Operational notes

Concurrency 1-2. Two Matisse agents stalled at the 600 s watchdog (the 5-hour
usage window was exhausted); the second left a nearly finished candidate on
disk and was resumed with SendMessage rather than restarted. Cycle paused
~2.5 h for the usage-window reset. Research agents were told `aviation` has no
`field.*` key after Blériot.
