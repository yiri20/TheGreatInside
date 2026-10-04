# Roster41: sixth fresh cycle after the matching diagnostic (2026-10-03)

Base SHA: `66fb9036c0905b7be3f33642c07082de1d580291` (`ROSTER41_BASE_SHA`,
Roster40's merge commit for PR #51, exactly two parents: `72976830...`
[prior main] and `899247f9...` [Roster40 head]). PR #51 was merged with a
normal merge commit, head-guarded on `899247f9b18ce7f85affa1b628c8e63711dd84fb`
(OPEN, non-draft, CLEAN, Vercel SUCCESS on that head; branch kept).
Starting state, mechanically verified: production 336, directory-visible
335, match-eligible 114, candidate JSON 400, legacy baseline 22 / 0 flagged.
Classification carried forward: **CONTINUE_EXPANSION_AS_IS** — no
architecture, eligibility or matching change, no repeated diagnostic.

## Selection: 15 frozen, 14 shipped, 1 held, 0 backlog reuse

One mechanical backlog inventory: the same 86 non-production files as
Roster39/40 (3 `evidence_approved` + 83 `held`). No concrete new signal for
Naomi Uemura / Anita Roddick (portrait), Edmund Hillary (region/taxonomy),
Simone de Beauvoir / Mimar Sinan (evidence quality) — none retried; all 15
fresh. Pre-freeze checks: no slug/live-QID collision (one search-first-hit
trap caught: "Jackie Robinson" → a basketball player; the verified QID is
Q221048), zero-politics primary identity, portrait preflight, plausible
independent non-self behavioural sources.

| Slug | fieldIds (final) | Category (by fieldIds) | Tier | QID | Outcome |
|---|---|---|---|---|---|
| jackie-robinson | sport | building | international | Q221048 | shipped |
| babe-didrikson-zaharias | sport | building | international | Q231983 | shipped |
| orville-wright | engineering, technology | building + science | international | Q494455 | shipped |
| josiah-wedgwood | business, design | building + arts | field-famous | Q319331 | shipped |
| mary-kingsley | exploration, natural_science | building + science | long-tail | Q235525 | shipped |
| claude-shannon | mathematics, computing, engineering | building + science | field-famous | Q92760 | **held** (portrait) |
| alberto-santos-dumont | technology, engineering | building + science | field-famous | Q313211 | shipped |
| paul-cezanne | art | arts | international | Q35548 | shipped |
| emily-dickinson | literature | arts | international | Q4441 | shipped |
| giuseppe-verdi | music | arts | international | Q7317 | shipped |
| jules-verne | literature | arts | international | Q33977 | shipped |
| max-planck | physics | science | international | Q9021 | shipped |
| robert-koch | medicine, biology | science | international | Q37193 | shipped |
| mary-somerville | mathematics, natural_science | science | field-famous | Q268702 | shipped |
| wilhelm-rontgen | physics | science | international | Q35149 | shipped |

Frozen mix: **10 international / 4 field-famous / 1 long-tail**; shipped:
10 / 3 / 1. By field membership (frozen): building_discovery 7,
arts_culture 5, science_knowledge 8; shipped: 6 / 5 / 7. Four women
(Didrikson Zaharias, Kingsley, Dickinson, Somerville). All deceased.
Zero-politics: Robinson's post-baseball civil-rights/political activity,
Verdi's parliamentary/senate seats, Verne's Amiens council service and
Planck's Nazi-era institutional role are incidental and unscored. No new
taxonomy vocabulary (no `potter`, `sculptor`, `physiologist`,
`epidemiologist` ids exist; nearest existing ids used).

## Held: 1

| Slug | Blocker | Reusable work | Next step |
|---|---|---|---|
| claude-shannon | Portrait rights materially unresolved: the Oberwolfach file's CC BY-SA 2.0 de basis is contradicted by the MFO record ("Copyright: unknown"); the Tekniska museet CC BY 2.0 print has unknown author/date and no documented basis for the museum's rights; the c.1930 snapshot has no evidence of publication; AT&T statue photos are derivatives of a copyrighted sculpture | **Yes** — 14 rows, 8 sources, EN/KO editorial draft; candidate is `evidence_approved` with `portrait.status: "held"` (Uemura/Roddick precedent) | Obtain the Tekniska museet catalogue record for item 43069 (donor/photographer/rights), or a Bell Labs/AT&T/MIT image with documented no-notice pre-1978 publication or an explicit institutional licence |

No 16th candidate was added.

## Shipped: 14

| Slug | Substantive sources | Independent perspectives | Rows | Publication | Eligible |
|---|---|---|---|---|---|
| jackie-robinson | 7 | 7 non-self (SABR Swaine, Vernon, Tygiel, Time 1947, Nowlin, McCue [club's hostile view], NYT) | 7 | evidence_approved | no |
| babe-didrikson-zaharias | 5 | 5 non-self (Cayleff, SI 1975 incl. adversarial team-mates, 1932 Official Report, NYT, USGA/Glenn incl. rival) | 6 | evidence_approved | no |
| orville-wright | 6 | 5 (Kelly, Renstrom/LOC, Crouch incl. Lindbergh, NASM, court record) + self | 9 | evidence_approved | no |
| josiah-wedgwood | 6 | 6 (Smiles, Church, Williamson, Burton, Meteyard, Pollard critical) + self | 12 | evidence_approved | no |
| mary-kingsley | 7 | 6 (Gwynn, DNB, Günther BM report, Libbey critical, Clodd, Hopkins) + self | 8 | evidence_approved | no |
| alberto-santos-dumont | 7 | 5 (Scientific American, authorized Heilig interview, Popular Mechanics, Lins de Barros, NASM) + self | 8 | evidence_approved | no |
| paul-cezanne | 7 | 6 (Vollard, Bernard, Zola letters, Duret, National Gallery, Courtauld) + self | 12 | evidence_approved | no |
| emily-dickinson | 10 | 7 (Higginson, Johnson & Ward, Todd, Emily Dickinson Museum, Poetry Foundation, Bianchi, Jenkins) + self | 11 | evidence_approved | no |
| giuseppe-verdi | 6 | 5 (DBI, Pougin, Roosevelt partly critical, Monaldi/Barbieri-Nini, Casa Verdi) + self | 14 | evidence_approved | no |
| jules-verne | 7 | 7 (Sherard, Belloc, Jones, Claretie/Raymond, Butcher, Evans [disagreeing scholars], Nantes manuscripts) + self | 11 | evidence_approved | no |
| max-planck | 10 | 7 (Laue, Einstein 1918, Meitner, Murphy, Hermann, Kragh critical, Nobel) + self | 10 | evidence_approved | no |
| robert-koch | 13 | 8 (Gradmann critical, Lankester hostile, Science, Lewis, Loeffler, Ernst, Knopf, Nobel) + self | 8 | evidence_approved | no |
| mary-somerville | 8 | 6 (Edgeworth, DNB, RAS obituary critical, Herschel, Whewell, Stenhouse) + self/insider | 11 | evidence_approved | no |
| wilhelm-rontgen | 7 | 6 (Glasser, Barker, Dam, Assmus, Monville, Würzburg memorial) + self | 12 | evidence_approved | no |

106 substantive source records, 139 scored rows (shipped). Every shipped
candidate has ≥2 independent perspectives and ≥1 substantive non-self
behavioural source, actually opened/read; Wikipedia/Wikidata orientation only.
Researchers worked under the Roster40 calibration lesson (confidence ≤ ~0.72
and scores < 85 without independent/adversarial corroboration).

## Lead-review corrections (before eligibility; downward/relabel only)

- **josiah-wedgwood** experimentation 84/0.78 → 82/0.72 (trial programme read
  largely through the firm's own records).
- **babe-didrikson-zaharias** competitiveness 86/0.76 → 84/0.72 (adversarial
  testimony reaches the profile through two retellings sharing informants).
- Portrait `kind` relabelled `likeness` → `historical_depiction` for
  **mary-somerville** (1858 engraving after an 1848 drawing) and
  **robert-koch** (1887 lithograph after a photograph): copies are not
  labelled as from-life likenesses.
- All other profiles accepted as researched.

## Portraits and material rights notes

Every shipped portrait: exact source page and licence read, real download,
file opens, recorded dimensions = actual, local asset, 200 on the production
server; ≤1600px long edge / q85, never upscaled.

| Slug | Portrait | Basis | Note |
|---|---|---|---|
| jackie-robinson | Harry Warnecke 1949 (NPG.97.135) | CC0 (Smithsonian Open Access) | |
| babe-didrikson-zaharias | Harry Warnecke 1947 (NPG.97.211) | CC0 | 1946/1938 press photos rejected (undocumented basis) |
| orville-wright | LOC LC-DIG-ppprs-00680, 1905 | PD (no known restrictions) | moustache confirms Orville |
| josiah-wedgwood | George Stubbs 1780, enamel (V&A) | PD-Art; CC0 photo | |
| mary-kingsley | A. G. Dew-Smith photo, publ. 1916 | PD | Wellcome L0046617 rejected ("In copyright") |
| alberto-santos-dumont | Giovanni Sarracino 1903 (Museu Paulista USP) | PD | |
| paul-cezanne | Self-portrait c.1875 (Musée d'Orsay) | PD-Art | Wikidata web-scrape rejected |
| emily-dickinson | c.1846-47 daguerreotype (Amherst College scan) | PD | Amherst page: PD, credit requested |
| giuseppe-verdi | Boldini 1886 pastel (GNAM Rome) | PD-Art | |
| jules-verne | Atelier Nadar CdV (Musée Carnavalet PH57401) | CC0 Paris Musées | self-scanned Wikidata file rejected |
| max-planck | Rudolf Dührkoop c.1910 photogravure | PD (d. 1918) | Wikidata image rejected (unclear) |
| robert-koch | Compton Litho 1887 (LOC) | PD (© 1887) | `historical_depiction` |
| mary-somerville | William Holl 1858 after Swinton (Wellcome) | Public domain mark | NGS Phillips rejected (reuse terms unverifiable); `historical_depiction` |
| wilhelm-rontgen | Photographische Gesellschaft photogravure (Wellcome) | Public domain mark | DRM-claimed scan rejected |

## Publication vs. eligibility

Rows, confidence, evidenceType, metadata and publication decisions (15 ×
`evidence_approved`; Shannon portrait-held) were frozen first; eligibility
was then read only. **All 14 shipped are non-match-eligible** — no padding,
no rescue. Roster41 statistics (min / median / max): rows 6 / 10.5 / 14;
coverage 0.187 / 0.316 / 0.416; high-confidence count 6 / 9.5 / 13;
high-confidence average 0.569 / 0.598 / 0.636. Roster41 eligible N = 0.

## Production, promotion, index, localization

`generateRoster41.ts` (explicit 14-slug literal allowlist — Shannon
deliberately excluded; `preparePersonSeedForPromotion()`; never reads
eligibility) → `roster41.ts`; `ROSTER_41` wired into `seed.ts` and
`NAMED_ROSTERS`. `peopleIndex.generated.ts` regenerated (350 entries; diff =
header count + 14 entries, all directory-visible, none match-eligible; no
unrelated drift). 14 `person.name.<slug>` Korean names + concise EN/KO
editorial (no raw ids; first/only claims sourced or hedged).

| | Before | After |
|---|---|---|
| Production | 336 | **350** |
| Directory-visible | 335 | **349** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 400 | **415** |

### A. Published/directory field-category coverage

| Category | Before (336) | After (350) | Delta |
|---|---|---|---|
| science_knowledge | 146 | 153 | +7 |
| arts_culture | 123 | 128 | +5 |
| leadership_society | 77 | 77 | +0 |
| building_discovery | 86 | 92 | +6 |

### B. MATCH-ELIGIBLE interest-scope pools (114 eligible people)

| Category | Before | After | Delta |
|---|---|---|---|
| science_knowledge | 50 | 50 | +0 |
| arts_culture | 43 | 43 | +0 |
| leadership_society | 42 | 42 | +0 |
| building_discovery | 15 | 15 | +0 |

## Recent-cohort watch (recorded, not re-analyzed)

Roster41 shipped 14, eligible 0. Cumulative Roster33-41: **125** shipped,
**0** match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS.

## Calibration, dispersion, matching health

`calibrate.ts quiz` ×2. Eligible cohort unchanged (114): dispersion blob
identical to HEAD (meanSd 11.704, N=114); MATCH and GREATNESS anchors 13/13
equal, max raw delta 0.0000, display columns identical; no refresh;
`CALIBRATION_VERSION` = `calibration_v3`. Matching health: focused
confirmation only (full `matching.test.ts` passes).

## Test/audit maintenance

Mechanical bumps 336→350 / 335→349 (Roster24-40 pattern): lineage audit
(`ROSTER_41`, regex `4[01]`), matching / publication-separation divergent
lists (+14), kurosawa + legacy batch 2-5 + roster33-40 tests, e2e Directory
("349 people", "전체 350명 중 9명"; cross-facet count 9 re-verified with
`filterPeople`). New `roster41.test.ts`: 14 × 10 table-driven checks +
backlog/hold absence (incl. Shannon evidence_approved + portrait held) +
cross-target integrity (no duplicate id/slug/QID across 350; pre-existing
eligible exactly 114). It does not assert additions are non-eligible.

## Validation

- `tsc --noEmit` clean. `validateCandidates.ts`: **415 candidates, 0 errors,
  0 warnings** (`qa_passed` 93, `evidence_approved` 239, `held` 83).
- `checkScoringLockIntegrity.ts` pre-work: "Checked 400 previously-committed
  candidate file(s) against HEAD. 0 flagged."; legacy 22 / 0.
- `vitest run`: **71 files, 2175 tests, all passed**.
- `next build --webpack`: success, **724 static paths** (2×350+24); no
  regression observed.
- Focused Playwright (Directory, Person, Editorial, Compare): **128/128**.
- Manual QA (production server): Jackie Robinson (building), Paul Cézanne
  (arts), Max Planck (science), Emily Dickinson (KO, true 375px),
  `/en-US/compare/emily-dickinson` (graceful state); zero console errors;
  all 14 portraits 200; all 28 EN/KO routes 200 with names, no key/raw-id
  leak; 375px iframe sweep: no overflow, hero loaded, no broken image, 7
  sections, non-eligible notice present. Held Shannon routes 404 as intended.
  No eligible new profile exists to spot-check.
- Source-link check, 146 URLs: 139 × 200; 5 × 403 and 1 × 405 (si.edu,
  loc.gov, Europe PMC, Amherst bot-blocking), 1 timeout (ADS) — no true 404.
- Narrow defect fixed: source titles for Dickinson, Planck and Somerville
  cross-referenced internal source ids (e.g. `src_dickinson_self_letters`)
  on the public Sources list → replaced with readable record names.

## Post-commit scoring lock

Recorded after the implementation commit (see follow-up).

## Operational notes

Default concurrency 1. Interruptions: Santos-Dumont stream stall, a
session restart (an earlier Verdi dispatch left no artifacts → restarted
cleanly), and usage-limit 429s on Verdi and Röntgen — each resumed from the
texts/candidate files already on disk.

## Confirmations

No matching/architecture diagnostic repeated; no performance, similarity,
route-payload or storage benchmark (build success + static path count only).
No eligibility padding or rescue. Legacy lane paused (no legacy research,
rescoring or tuple change; Legacy Batch 6 not started). Roster42 not started.
