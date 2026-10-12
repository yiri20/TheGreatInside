# Roster49: fourteenth fresh cycle after the matching diagnostic (2026-10-11)

Eighth cycle run under the **Major Achievement Selection Standard**
(`docs/editorial-content.md`), fifth under the **stronger portrait rights
rule**. New this cycle: every research brief required a **CANONICAL
SIGNIFICANCE SOURCE** (a source suited to "what is this person's primary
historical contribution?") and an **agent-level Major Achievement self-gate**
before a draft could be returned, to cut the Roster48 pattern of 9 lead-review
top-omission failures.

Base SHA: `637f2a923f76222b53351fd1019a9fa0236d447d` (`ROSTER49_BASE_SHA`),
the merge commit of PR #60 (Roster48): exactly two parents, `4f9b620f...`
(prior main) and `b19b02e6...` (Roster48 head). PR #60 was merged with a normal
merge commit, head-guarded on `b19b02e6772a2f85edc5182d37ad0a6ab3efdb9f`
(OPEN, non-draft, CLEAN, Vercel SUCCESS on that head; branch kept).
Starting state, mechanically verified: production 449, directory-visible 448,
match-eligible 114, candidate JSON 520, legacy baseline 22 / 0 flagged.
Classification carried forward: **CONTINUE_EXPANSION_AS_IS**.

## Selection: 15 frozen, 14 shipped, 1 held, 0 backlog reuse

One cheap backlog inventory: 93 non-production candidate files (10
`evidence_approved`: Hillary, Uemura, Roddick, Shannon, Potter, Sullivan,
Royce, Lamborghini, Caravaggio, Schrodinger; 83 `held`). No concrete new signal
for any (Schrodinger's Polish archive record was not retried); none reopened.
Pre-freeze: no slug/QID collision, zero-politics primary identity, region
expressible in the current taxonomy, plausible portrait lead, independent
non-self sources plausible. QIDs were re-verified live by each agent.

| Slug | QID | fieldIds (final) | Category (directory taxonomy) | Tier | Region | Outcome |
|---|---|---|---|---|---|---|
| jensen-huang | Q305177 | business, computing | building | international | north_america | shipped |
| satya-nadella | Q7426870 | business, technology | building | international | north_america | shipped |
| vint-cerf | Q92743 | computing, technology | building | field-famous | north_america | shipped |
| chuck-yeager | Q271939 | exploration | building | international | north_america | shipped |
| richard-branson | Q194419 | business | building | international | western_europe | shipped |
| lebron-james | Q36159 | sport | building | international | north_america | shipped |
| paul-mccartney | Q2599 | music | arts | international | western_europe | shipped |
| maria-callas | Q128297 | music | arts | international | southern_europe | shipped |
| martin-scorsese | Q41148 | film | arts | international | north_america | shipped |
| william-shakespeare | Q692 | literature | arts | international | western_europe | shipped |
| raphael | Q5597 | art | arts | international | southern_europe | shipped |
| jennifer-doudna | Q56068 | biology, natural_science | science | international | north_america | shipped |
| robert-hooke | Q46830 | natural_science, physics | science | long-tail | western_europe | **held** (portrait) |
| freeman-dyson | Q153717 | physics, mathematics | science | field-famous | western_europe | shipped |
| pierre-curie | Q37463 | physics | science | field-famous | western_europe | shipped |

Frozen mix 11 international / 3 field-famous / 1 long-tail; shipped 11 / 3 / 0.
By directory category (shipped): building 6, arts 5, science 3 (frozen: 6 / 5
/ 4, Hooke held). Building was deliberately broader than recent cycles: one
sport (LeBron James), the rest technology/computing/business/exploration. All
fresh. Eight are living (Huang, Nadella, Cerf, Branson, LeBron, McCartney,
Scorsese, Doudna; the others are historical): public
professional behaviour only; health, family, private life, allegations and
motives are not used. Zero-politics: Branson's legal/tax matters, Dyson's
climate-politics episodes, Huang's export-control context and McCartney's
private life are incidental and unscored. Two women (Callas, Doudna). Dyson was
assigned `western_europe` (British-born; existing candidates such as Einstein,
Tesla, Fermi use origin region), Callas `southern_europe` (Greek-American,
career in Italy/Greece); reasoning is recorded in each candidate's notes.
Taxonomy: no new vocabulary; two agent-invented occupation ids
(`business_executive`, `test_pilot`) were remapped to existing `executive` /
`aviator` after the localisation guard test flagged them.

## Held: 1

| Slug | Blocker | Reusable work | Next step |
|---|---|---|---|
| robert-hooke | No authenticated portrait of Hooke exists (the Royal Society says none is known). The only rights-clear images are Rita Greer's modern imaginative paintings (Free Art License, 2011), and none of the three allowed portrait kinds fits them honestly (`historical_depiction` excludes modern reconstructions, `likeness` would be false, `editorial_nonlikeness` is for visuals made for the product) | **Yes**: 11 substantive sources, 8 rows, 3 Achievement cards, EN/KO draft; candidate `evidence_approved`, `portrait.status: "held"` | A product decision on a symbolic non-portrait visual (or portrait-less profile) for people with no known likeness; then the candidate can ship with no further research |

No 16th candidate was added; no portrait retry agent was run.

## Shipped: 14

Substantive source counts are the research agents' own reports of records
actually opened and read (Wikipedia/Wikidata excluded; the canonical
significance source is counted).

| Slug | Substantive sources | Independent perspectives | Rows | Publication | Eligible |
|---|---|---|---|---|---|
| jensen-huang | 7 | Computer History Museum, Fortune, critical and admiring book reviewers, a former employee (relayed) | 9 | evidence_approved | no |
| satya-nadella | 8 | business-school authors, trade press, sceptical developers, court-document report | 5 | evidence_approved | no |
| vint-cerf | 8 | IEEE milestone, Lemelson-MIT, Network World, AP, oral-history interviewer, colleague (ICANN CEO) | 7 | evidence_approved | no |
| chuck-yeager | 11 | NASM, NASA, Smithsonian, project officer, peer test pilot (Crossfield), historians | 7 | evidence_approved | no |
| richard-branson | 10 | Gale biography, business-school case study, Marketing Week critique, staff-criticism notes | 10 | evidence_approved | no |
| lebron-james | 12 | NBA.com, coaches (Lue), Olajuwon, Slate and Barkley (critical), NPR | 10 | evidence_approved | no |
| paul-mccartney | 8 | Emerick, Martin, Lewisohn-derived session records, Songwriters Hall of Fame | 7 | evidence_approved | no |
| maria-callas | 7 | Royal Opera House, Tommasini, Steane, Juilliard Archives, New Criterion | 5 | evidence_approved | no |
| martin-scorsese | 9 | Schoonmaker, Prieto, Film Foundation, Rolling Stone, trade press | 9 | evidence_approved | no |
| william-shakespeare | 14 | Folger, Birthplace Trust, Jonson, Meres, Greene/Chettle, Henslowe and Buc records, Heminges and Condell | 5 | evidence_approved | no |
| raphael | 8 | National Gallery, Vatican Museums, Vasari (partisan), Open University, Rowland | 5 | evidence_approved | no |
| jennifer-doudna | 5 | Nobel Committee, ASBMB Today, STAT, NIH summary | 6 | evidence_approved | no |
| freeman-dyson | 10 | IAS, PNAS tribute, Nature, Quanta, Farmelo, Krauss, Physics World | 8 | evidence_approved | no |
| pierre-curie | 5 | Nobel Foundation, APS, DSB, Marie Curie's biography (family source), ESPCI | 8 | evidence_approved | no |

Total 101 scored rows across the 14. Thinnest rows: Nadella, Callas, Raphael,
Shakespeare (5); thinnest sources: Doudna and Pierre Curie (5, below the 6
target; both ship sparse and capped). Sparse is not invalid; nothing was
padded. Sports, film and business profiles lean on admiring insiders and were
capped accordingly.

## Major Achievement gate

**Research-agent self-gate (honest first-pass results, before the agent's own
correction):** 12 of the 15 drafts failed at least once on first pass:
PRIMARY-CONTRIBUTION failed 2 (Shakespeare, Pierre Curie), TOP-OMISSION failed
11 (Nadella, Cerf, Branson, LeBron, McCartney, Callas, Scorsese, Shakespeare,
Raphael, Doudna, Dyson), IDENTITY failed 2 (Shakespeare, Doudna). Huang, Yeager
and Hooke passed first pass. Every one of these was corrected by the agent from
sources it had read (or one bounded added source: Cerf's Heidelberg Laureate
Forum page, LeBron's NPR record report, Scorsese's Oscars report, Nadella's
OpenAI investment, Branson's Scientific American Unity 22 report) before the
draft was returned.

**Lead gate (independent re-read of all 15 final card sets):**

- PRIMARY-CONTRIBUTION failures found by the lead: **0**.
- TOP-OMISSION failures found by the lead: **0** (Scorsese carries a residual
  gap: Raging Bull and Goodfellas are named in card 3 but have no card of their
  own, because no source read describes the films).
- IDENTITY failures found by the lead: **0**.
- SIGNIFICANCE-OVER-NOVELTY failure: **1**, newly found by the lead: Branson's
  third card (the 2021 Unity 22 flight) added by the agent's self-gate was a
  novelty rather than a defining contribution; it was removed (Branson ships
  with two cards, the Virgin group build and the Virgin Atlantic launch).
- SIDE-PROJECT failures: 0.
- Failures already caught by the agent self-gate: all 15 flags above (12
  candidates). Failures newly found by lead review: 1 (the novelty card).
  Compared with Roster48 (9 top-omission failures found by the lead), lead
  top-omission failures fell from 9 to 0; the work moved to the agents, which
  reported 11.
- Lead wording check for unsupported superlatives: all remaining "first",
  "record" and "only" claims are attributed to a source the agent read
  (Smithsonian, Computer History Museum, NBA.com, Beatles Bible session
  records). No change needed.
- Final: **15/15 PASS**.
- Rendered-page spot-read on the production server: Scorsese, Raphael (arts),
  Dyson, Doudna (science), Yeager, LeBron (exploration/sport): "Do these cards
  explain why this person matters?" PASS x6.

## Lead-review corrections (before eligibility; downward only)

- **lebron-james** discipline 80/0.68 -> 78/0.64 (part of the evidence reached
  the agent only as page summaries).
- **chuck-yeager** risk_tolerance 80/0.70 -> 78/0.64 (one project-officer/peer
  base plus a self report; Wolfe and the autobiographies not opened).
- **martin-scorsese** planning_orientation 78/0.68 -> 74/0.62, adaptability
  74/0.64 -> 72/0.60, experimentation 74/0.64 -> 72/0.60, collaboration
  74/0.62 -> 72/0.58, impact_motivation 76/0.64 -> 72/0.58 (all sources are
  admiring collaborators).
- **jennifer-doudna** collaboration 80/0.70 -> 76/0.62, adaptability 74/0.64 ->
  72/0.58, leadership_drive 72/0.62 -> 70/0.56, execution_speed 72/0.60 ->
  70/0.56 (five sources, no adversarial source).
- **freeman-dyson** cross_domain_range 86/0.70 -> 82/0.66, independent_thinking
  84/0.68 -> 80/0.64, analytical_rigor 82/0.66 -> 78/0.62.
- **pierre-curie** experimentation 80/0.64 -> 76/0.58, analytical_rigor 78/0.62
  -> 74/0.56, resourcefulness 76/0.62 -> 72/0.56, collaboration 74/0.60 ->
  70/0.54 and evidenceType documented -> strong_inference (family source).
- Each rationale carries a "LEAD REVIEW CORRECTION" note.

## Portraits and material rights notes

Every shipped portrait: exact source page and licence read, real download,
recorded dimensions = actual file, no upscaling, local asset, 200 on the
production server.

| Slug | Portrait | Basis | Note |
|---|---|---|---|
| jensen-huang | Peter Dasilva / European Commission AV Service, 13 May 2024 | CC BY 4.0 (EC conditions page; Commons tag not yet reviewer-confirmed) | downscaled from 1129x1678; fallback White House photo available |
| satya-nadella | LeWeb official photos (Flickr), 10 Dec 2013 | CC BY 2.0 (Commons and Flickr pages read) | predates his CEO appointment; Microsoft executive images rejected (release basis unverifiable) |
| vint-cerf | Duncan Hull / Royal Society, 15 Jul 2016 | CC BY-SA 4.0 with a Commons VRT permission ticket | share-alike credit shown; a 2010 photo with a personality-rights restriction rejected |
| chuck-yeager | USAF official portrait, 1969 (NARA record 542371) | US government work | NARA site script-rendered; basis from Commons-imported metadata |
| richard-branson | Chatham House, 4 Mar 2015 | CC BY 2.0 | author is the institution |
| lebron-james | Erik Drost, 21 Mar 2022 | CC BY 2.0 | downscaled |
| paul-mccartney | Koen Suyk / Anefo / Nationaal Archief, 26 Jan 1980 | CC0 (rights read from the Commons file; archive page script-rendered) | cropped to the sitter, greyscale |
| maria-callas | Bert Verhoeff / Anefo / Nationaal Archief, 9 Dec 1973 | CC0 (Commons file page) | cropped, greyscale |
| martin-scorsese | Neil Grabowsky / Montclair Film, 27 Oct 2023 | CC BY 2.0 (Flickr page and FlickreviewR) | downscaled |
| william-shakespeare | Droeshout engraving, First Folio 1623 | PD (Droeshout d. c.1650); Bodleian facsimile CC BY 3.0 does not conflict | `historical_depiction` |
| raphael | Jacob Matham 1630 engraving after Raphael (Rijksmuseum) | museum labels it Public domain | `historical_depiction`; Uffizi self-portrait and Louvre double portrait set aside (reproduction-rights regimes) |
| jennifer-doudna | Christopher Michel, 2023 | CC BY-SA 4.0 (the Nobel facts page credits the same photographer) | |
| freeman-dyson | Jacob Appelbaum / Long Now Foundation, 2005 | CC BY-SA 2.0, Commons Flickr-review pass | Flickr page itself returned 403; unchanged 683x1024 |
| pierre-curie | Unknown photographer c.1906 (Commons "Dujardin") | published 1910 and 1923, PD by age | Wellcome scan rejected ("In copyright" on Wellcome's own page) |

## Publication vs. eligibility

Rows, confidence, evidenceType, metadata, portrait decisions, publication
decisions (14 x `evidence_approved`; one portrait-held) and the Achievement
sets were frozen first (every correction above was made before eligibility was
read); eligibility was then read only. **All 14 shipped are non-match-eligible**:
no padding, no rescue. Roster49 statistics (min / median / max): rows 5 / 7 /
10; coverage 0.143 / 0.210 / 0.302; high-confidence count 4 / 7 / 10;
high-confidence average 0.559 / 0.581 / 0.611. Roster49 eligible N = 0.

## Production, promotion, index, localization

`generateRoster49.ts` (explicit 14-slug literal allowlist, Hooke deliberately
excluded; `preparePersonSeedForPromotion()`; never reads eligibility) ->
`roster49.ts`; `ROSTER_49` wired into `seed.ts` and `NAMED_ROSTERS`.
`peopleIndex.generated.ts` regenerated (463 entries). 14 `person.name.<slug>`
Korean names + concise EN/KO editorial (no raw ids).

| | Before | After |
|---|---|---|
| Production | 449 | **463** |
| Directory-visible | 448 | **462** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 520 | **535** (15 new: 14 shipped + 1 held) |

### A. Published/directory field-category coverage (directory taxonomy)

| Category | Before (449) | After (463) | Delta |
|---|---|---|---|
| science_knowledge | 191 | 194 | +3 |
| arts_culture | 162 | 167 | +5 |
| leadership_society | 77 | 77 | +0 |
| building_discovery | 135 | 141 | +6 |

### B. MATCH-ELIGIBLE interest-scope pools (114 eligible people)

| Category | Before | After | Delta |
|---|---|---|---|
| science_knowledge | 50 | 50 | +0 |
| arts_culture | 43 | 43 | +0 |
| leadership_society | 42 | 42 | +0 |
| building_discovery | 15 | 15 | +0 |

Remaining distance to the 500-person scale checkpoint: **37** production
people (463 now). The checkpoint was not started. A 15-candidate Roster50 can
reach at most 478; Roster51 would be the first roster able to approach 500.

## Recent-cohort watch (recorded, not re-analyzed)

Roster49 shipped 14, eligible 0. Cumulative Roster33-49: **238** shipped,
**0** match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS.

## Calibration, dispersion, matching health

`calibrate.ts quiz` x2: identical output; eligible cohort unchanged (114);
dispersion blob hash identical to HEAD (meanSd 11.704); no anchor file
changed; no refresh; `CALIBRATION_VERSION` = `calibration_v3`. Matching
health: focused confirmation only (full `matching.test.ts` passes with the 14
added to the known-non-eligible lists).

## Test/audit maintenance

Mechanical bumps 449->463 / 448->462 (Roster24-48 pattern): lineage audit
(`ROSTER_49`, regex `4[0-9]`), matching / publication-separation divergent
lists (+14), kurosawa + legacy batch 2-5 + roster33-48 tests, e2e Directory
("462 people", "전체 463명 중 13명"). The Directory cross-facet curiosity AND
collaboration result moved 12 -> 13 because Jennifer Doudna crosses both
thresholds on her own evidence; the Playwright assertion was updated and her
name asserted. New `roster49.test.ts`: 14 x 10 table-driven checks +
backlog/hold absence (incl. Hooke evidence_approved + portrait held) +
cross-target integrity + structural Major Achievement test. Historical
significance remains a human gate.

## Validation

- `tsc --noEmit` clean. `validateCandidates.ts`: 535 candidates, 0 errors, 0
  warnings (`qa_passed` 93, `evidence_approved` 359, `held` 83).
- `vitest run`: **79 files, 3507 tests, all passed**.
- `next build --webpack`: success. **Literal build output:**
  `Generating static pages using 21 workers (950/950)` (reported as printed,
  not derived).
- Focused Playwright (Person, Editorial, Directory, Compare, Trait
  Explanation): **142/142** (the one Directory assertion above was updated
  and the file re-run: 34/34).
- Manual QA (production server): all 14 EN + 14 KO routes 200; all 14
  portraits 200; Hooke, Lamborghini and Caravaggio 404 as intended; Compare
  route 200 (lebron-james, william-shakespeare, pierre-curie); visible-text
  scan: no raw `src_` ids, no snake_case ids, no `person.`/`field.` key leaks;
  true 375px sweep of all 28 EN+KO pages in the built-in browser: no
  horizontal overflow, no broken images (after forcing lazy images eager), 7
  sections each. No eligible new profile exists to spot-check.
- Source-link check, 150 URLs: 146 x 200; 3 x 403 (bot walls: Britannica x2,
  Open University); 0 x 404/410; 0 x 429; 0 timeouts; 1 checker error (an
  archived NYT copy on oocities returned a TLS connection reset from the local
  checker and loads fine through WebFetch, so it is a checker error, not a dead
  link).

## Post-commit scoring lock

(Recorded in the follow-up docs commit with the literal output.)

## Confirmations

No matching/architecture diagnostic repeated; no performance, similarity,
route-payload or storage benchmark (build success + the literal static-path
line only). No eligibility padding or rescue. Legacy lane paused (no legacy
research, rescoring or tuple change; Legacy Batch 6 not started). The older
henry-ford / vincent-van-gogh / stephen-hawking editorial debt was not pulled
into Roster49. Roster50 not started; the 500-person checkpoint not started.

## Operational notes

Research ran as five agent batches of three candidates (two concurrent at most).
Weekly usage was about 89% at the start of the cycle; no agent stalled and no
rate-limit stop occurred. The Hooke hold exposes a product-level gap (people
with no known likeness), not a research gap.
