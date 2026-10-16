# Roster50: fifteenth fresh cycle after the matching diagnostic (2026-10-16)

Ninth cycle run under the **Major Achievement Selection Standard**
(`docs/editorial-content.md`), sixth under the **stronger portrait rights
rule**, and second with the Roster49 workflow kept intact: every research brief
required a **CANONICAL SIGNIFICANCE SOURCE** (a source suited to "what is this
person's primary historical contribution?") and an **agent-level Major
Achievement self-gate** (primary contribution, top omission, identity,
significance over novelty, side-project dominance) before a draft could be
returned. All 15 candidates carry a labelled canonical significance source.

Base SHA: `5a0b7d3c1c736d6215303dd2a99500488f2c7fc8` (`ROSTER50_BASE_SHA`),
the merge commit of PR #61 (Roster49): exactly two parents, `637f2a92...`
(prior main) and `17475e71...` (Roster49 head). PR #61 was merged with a normal
merge commit, head-guarded on `17475e719d1b53b59aa2cc8288a54759753cc4fd`
(OPEN, non-draft, CLEAN, Vercel SUCCESS on that head; branch kept).
Starting state, mechanically verified: production 463, directory-visible 462,
match-eligible 114, candidate JSON 535, legacy baseline 22 / 0 flagged.
Classification carried forward: **CONTINUE_EXPANSION_AS_IS**.

## Selection: 15 frozen, 15 shipped, 0 held, 0 backlog reuse

One cheap backlog inventory: 94 non-production candidate files (11
`evidence_approved`: Hillary, Uemura, Roddick, Shannon, Potter, Sullivan, Royce,
Lamborghini, Caravaggio, Schrodinger, Hooke; 83 `held`). No concrete new signal
for any; none reopened. Robert Hooke's blocker is partly a product-model
question (people with no known authenticated likeness) and was deliberately not
forced into `likeness` or `historical_depiction`. The cohort was frozen before
research; the detailed portrait/evidence preflight was run by each agent at the
start of each candidate (slug/QID verified live, no collision, region valid,
portrait source and rights basis), and nothing needed to be held.

| Slug | QID | fieldIds (final) | Category (directory taxonomy) | Tier | Region | Outcome |
|---|---|---|---|---|---|---|
| michael-phelps | Q39562 | sport | building | international | north_america | shipped |
| kobe-bryant | Q25369 | sport | building | international | north_america | shipped |
| jony-ive | Q164750 | design, technology | building + arts | international | western_europe | shipped |
| tim-cook | Q265852 | business, technology | building | international | north_america | shipped |
| alan-shepard | Q174979 | exploration | building | international | north_america | shipped |
| donald-knuth | Q17457 | computing, mathematics | building + science | field-famous | north_america | shipped |
| aretha-franklin | Q125121 | music | arts | international | north_america | shipped |
| francis-ford-coppola | Q56094 | film | arts | international | north_america | shipped |
| i-m-pei | Q46868 | architecture | arts | international | north_america | shipped |
| titian | Q47551 | art | arts | international | southern_europe | shipped |
| igor-stravinsky | Q7314 | music | arts | field-famous | central_europe | shipped |
| katalin-kariko | Q88608397 | biology, natural_science | science | international | central_europe | shipped |
| peter-higgs | Q192112 | physics | science | international | western_europe | shipped |
| rita-levi-montalcini | Q185007 | biology, natural_science | science | field-famous | southern_europe | shipped |
| hans-christian-orsted | Q44412 | physics, natural_science | science | long-tail | western_europe | shipped |

Frozen mix 11 international / 3 field-famous (Knuth, Stravinsky,
Levi-Montalcini) / 1 long-tail (Orsted); shipped identical. By directory
category (published coverage delta): building +6 (Phelps, Kobe, Ive, Cook,
Shepard, Knuth), arts +6 (Aretha, Coppola, Pei, Titian, Stravinsky, Ive via
`design`), science +5 (Karikó, Higgs, Levi-Montalcini, Ørsted, Knuth via
`mathematics`); the frozen portfolio was 6 / 5 / 4 by primary category. Building
was kept broad: two sport profiles of six, the rest design, business, computing,
exploration. Living subjects (public professional behaviour only): Phelps, Ive,
Cook, Knuth, Coppola, Karikó. Three women (Aretha, Karikó, Levi-Montalcini).
Zero-politics: Levi-Montalcini's life-senator appointment, Cook's regulatory
episodes, Stravinsky's exile-era remarks and Higgs's CND membership are incidental
and unscored. Region reasoning: Stravinsky uses
the repository's existing Russian-origin `central_europe` treatment; Karikó,
Levi-Montalcini and Dyson-style diaspora scientists use origin region (closest
precedents: von Neumann, Fermi). No new taxonomy vocabulary was needed (all
occupation ids pre-exist; the Roster49 invented-id defect did not recur).
Karikó's Korean name is the Wikidata/Korean Wikipedia form 커털린 커리코.

## Held: 0

No candidate was held. No 16th candidate was added; no portrait retry agent was
run. Residual rights caveats on shipped portraits are listed below.

## Shipped: 15

Source counts are the recorded candidate sources excluding Wikidata and Commons
file pages (agents' own reports of records actually opened and read; Wikipedia
and Wikidata are orientation only). Phelps's and Kobe's agent report was lost to
a rate-limit stop after the files were saved; their counts come from the saved
candidate files and their drafts, and the lead re-reviewed them from disk.

| Slug | Sources | Independent perspectives | Rows | Publication | Eligible |
|---|---|---|---|---|---|
| michael-phelps | 14 | coach Bowman (via Reuters/SwimSwam/FINA), Olympedia, ISHOF, WaPo/NBC, Baltimore Sun, Sports Illustrated, a teammate's critical remark (NBC4) | 6 | evidence_approved | no |
| kobe-bryant | 12 | Hall of Fame, Olympedia, NBA.com, Phil Jackson, MacMullan, Markazi, Del Harris, AP 2004 | 9 | evidence_approved | no |
| jony-ive | 19 | Design Museum, Royal Academy of Engineering, Cooper Hewitt, The New Yorker, Wired, Guardian, Metropolis, critics (TidBITS, CNBC) | 13 | evidence_approved | no |
| tim-cook | 12 | Apple leadership page, Fortune (one author, counted once), Reuters, Al Jazeera, CNN, book reviewers | 10 | evidence_approved | no |
| alan-shepard | 14 | NASA JSC, NASA Mercury history, Apollo Lunar Surface Journal, crewmates (Mitchell, Lovell), Smithsonian, a critical lunar scientist (Spudis), obituaries | 6 | evidence_approved | no |
| donald-knuth | 11 | Computer History Museum, Turing/Kyoto citations, Stanford, Quanta, Salon, CACM Bentley column with McIlroy's critical review | 9 | evidence_approved | no |
| aretha-franklin | 16 | Rock Hall, LOC, Smithsonian, Wexler (NPR), Dowd, Mardin, Uncut, American Routes, Ehrlich | 6 | evidence_approved | no |
| francis-ford-coppola | 14 | Praemium Imperiale and Asturias citations, Britannica, AFI catalog, Murch (editor), Willis and Storaro (cinematographers) | 9 | evidence_approved | no |
| i-m-pei | 13 | Pritzker, Louvre, NGA, JFK Library, Goldberger and Russell obituaries, firm colleagues (Architectural Record, ARCHITECT), AP/AFP | 10 | evidence_approved | no |
| titian | 12 | National Gallery and NGA scholarship, a contemporary ambassador's report, Vasari (one partisan perspective), Crowe & Cavalcaselle, Spectator | 8 | evidence_approved | no |
| igor-stravinsky | 15 | LOC, British Library, Boosey & Hawkes, Schonberg Center (rival camp), IRCAM, critics, Craft as one insider perspective | 9 | evidence_approved | no |
| katalin-kariko | 10 | Nobel Committee, Lasker, STAT, Science, Penn Gazette, Weissman and a former supervisor | 7 | evidence_approved | no |
| peter-higgs | 19 | Nobel Academy, APS, CERN, Edinburgh, Close (biographer), Ellis, Fox, Walker, critical book review | 7 | evidence_approved | no |
| rita-levi-montalcini | 14 | Nobel Assembly, Lasker, WashU, Guardian, Nature (critical editorial), PNAS profile, Cohen's own account | 10 | evidence_approved | no |
| hans-christian-orsted | 13 | APS, Dansk Biografisk Leksikon, Jelved and Jackson (NBI), Giuliani, Linda Hall, Physics World, Hansteen via Faraday's Life and Letters | 11 | evidence_approved | no |

Total 130 scored rows across the 15, about 208 recorded sources. Thinnest rows:
Phelps, Shepard and Aretha (6); sparse is not invalid and nothing was padded.
Higgs's two low rows (competitiveness 36, social_assertiveness 38) are
conduct-based inferences about credit-sharing and publicity avoidance and were
moved toward the middle by lead review.

## Major Achievement gate

**Research-agent self-gate, first pass (before each agent's own correction):**

- Candidates with any first-pass failure: **5** of 15 (Cook, Shepard, Aretha,
  Titian, Levi-Montalcini).
- PRIMARY-CONTRIBUTION failures: **0**. TOP-OMISSION failures: **5** (Cook:
  growth under his tenure was missing; Shepard: the Apollo 14 golf shots,
  the best-remembered fact; Aretha: named hits in card 1; Titian: his portraiture;
  Levi-Montalcini: the first draft followed the assignment's topic list).
  IDENTITY failures: **0**.
- SIGNIFICANCE-OVER-NOVELTY flags: **1** and SIDE-PROJECT flags: **1**, both
  Levi-Montalcini's first draft (bedroom laboratory plus the EBRI institute as a
  card). Corrected by moving the bedroom laboratory to a Moment, the EBRI
  founding to a leadership row, and making card 3 the neuron-survival work.
- Other agent corrections before return: Kobe's card 2 widened from the 81-point
  game; Ive's card 1 given Britannica's and the Design Museum's central-contribution
  framing; Coppola's card 2 restructured; Karikó's overclaim that her technology
  "produced" the vaccines removed; Orsted's chance-discovery legend removed from
  card 1; Higgs's cards attributed to ATLAS and CMS; Pei's superlative attributed
  and conflicting dates dropped; Stravinsky's premiere "riot" softened to
  "uproar". All were made from sources the agents had read.

**Lead gate (independent re-read of all 15 final card sets):**

- PRIMARY-CONTRIBUTION failures found by the lead: **0**.
- TOP-OMISSION failures found by the lead: **0**.
- IDENTITY failures found by the lead: **0**.
- SIGNIFICANCE-OVER-NOVELTY and SIDE-PROJECT failures found by the lead: **0**.
- Failures already caught by the agent self-gate: all 7 flags above (5
  candidates). Failures newly found only by lead review: **0** (Roster49: 1
  novelty card; Roster48: 9 top-omission failures).
- Lead wording check for unsupported superlatives and first/only claims: every
  remaining first/record claim is attributed to a named source or is a
  well-documented fact; no change needed (Titian's lead sentence is backed by the
  attributed National Gallery statements that follow it).
- Bounded editorial-source additions: none this cycle (Cook's growth clause uses
  a CNN source already read).
- Final: **15/15 PASS**.
- Rendered-page spot-read on the production server: Aretha Franklin and I. M. Pei
  (arts), Katalin Karikó and Donald Knuth (science/technology), Alan Shepard and
  Kobe Bryant (exploration/sport): "Do these cards explain why this person
  matters?" PASS x6.

## Lead-review corrections (before eligibility)

Downward corrections to 32 rows across 12 candidates; each rationale carries a
"LEAD REVIEW CORRECTION" note.

- **michael-phelps** competitiveness 82/0.64 -> 78/0.58, achievement_drive
  80/0.64 -> 78/0.60 (account largely through admiring coach Bowman).
- **kobe-bryant** discipline 84/0.70 -> 82/0.66, competitiveness 84/0.68 ->
  82/0.64 (two shared source families, Jackson and MacMullan).
- **jony-ive** detail_orientation 85/0.70 -> 82/0.64, aesthetic_sensitivity
  84/0.68 -> 80/0.62, experimentation 82/0.66 -> 78/0.60, perfectionism 80/0.66
  -> 78/0.60, collaboration 76/0.64 -> 74/0.60 (two access-granted long-form
  profiles written inside the studio).
- **donald-knuth** detail_orientation 84/0.68 -> 82/0.64, aesthetic_sensitivity
  84/0.66 -> 80/0.62, perfectionism 82/0.66 -> 80/0.62 (his own words quoted
  through the same few profiles).
- **francis-ford-coppola** risk_tolerance 82/0.70 -> 80/0.64, autonomy_need
  82/0.68 -> 80/0.62, proactive_agency 80/0.64 -> 78/0.60, experimentation
  80/0.66 -> 78/0.62 (film-archive catalogue and award-body citations).
- **i-m-pei** persistence 78/0.68 -> 76/0.62. **titian** perfectionism 82/0.68 ->
  78/0.60, experimentation 80/0.64 -> 78/0.60, aesthetic_sensitivity 80/0.60 ->
  78/0.58 (his own 1559 letter, museum prose, Vasari).
- **igor-stravinsky** creative_originality 82/0.66 -> 78/0.60, experimentation
  78/0.64 -> 76/0.60, detail_orientation 80/0.66 -> 78/0.60.
- **katalin-kariko** persistence 82/0.68 -> 78/0.62 (partly her own interviews
  relayed by reporters). **rita-levi-montalcini** persistence 78/0.62 -> 76/0.58,
  analytical_rigor 78/0.62 -> 76/0.58, resourcefulness 78/0.60 -> 76/0.56.
- **peter-higgs** competitiveness 32/0.52 -> 36/0.50; social_assertiveness
  33/0.50 -> 38/0.46 and relabelled inference. **hans-christian-orsted**
  cross_domain_range 80/0.66 -> 78/0.62, systems_abstraction 80/0.64 -> 76/0.60,
  impact_motivation 78/0.60 -> 74/0.56 (secondary evidence only).
- No correction was needed for Cook, Shepard or Aretha.

## Portraits and material rights notes

Every shipped portrait: exact source page and licence read, real download,
recorded dimensions equal the actual file bytes (checked), no upscaling, local
asset, 200 on the production server.

| Slug | Portrait | Basis | Note |
|---|---|---|---|
| michael-phelps | Jay Baker / Maryland GovPics, 10 Sep 2012 (Maryland Olympians Celebration) | CC BY 2.0, Commons review | Agencia Brasil photos rejected (commercial licensing notice) |
| kobe-bryant | Denise Cross, 19 Jun 2009 | CC BY 2.0 | several alternatives rejected for licence changes, upscale history or usage conditions |
| jony-ive | Gary Cohen (Flickr glub), 16 Apr 2009 | CC BY-SA 2.0 (Commons review 2011 plus an archived Flickr capture) | live Flickr page now 404; ShareAlike credit displayed |
| tim-cook | Tessa Bury, 13 Mar 2026 | CC BY 4.0 | 2017 photo rejected (embedded "All Rights Reserved" conflicts with its Flickr licence) |
| alan-shepard | NASA S70-45232, 14 Jul 1970 | NASA work, public domain | |
| donald-knuth | Alex Handy, 11 Jan 2011 | CC BY-SA 2.0 | real-name credit rests on the Commons record (Flickr shows a username) |
| aretha-franklin | Joe Ortuzar, 7 Mar 2010 | CC BY 2.0 | |
| francis-ford-coppola | Rubén Ortega, 23 Oct 2015 | CC BY-SA 4.0 | |
| i-m-pei | Bernard Gotfryd, 1980 (Library of Congress) | LOC "no known restrictions on publication" | same basis as the existing Gotfryd portraits; LOC page read via its JSON interface |
| titian | Jan Thomas 1661 mezzotint after Titian's self-portrait (Rijksmuseum RP-P-1910-1486) | Public domain / CC0 | `historical_depiction`; Prado self-portrait not used (separate personal/commercial download terms) |
| igor-stravinsky | Bain News Service, c.1920-25 (LOC LC-DIG-ggbain-32392) | LOC "no known restrictions" | photographer unnamed; fallback Willy Pragher 1957 (CC BY 4.0) |
| katalin-kariko | Christopher Michel, 16 Sep 2024 | CC BY-SA 4.0, own work | same photographer and licence as the Doudna portrait |
| peter-higgs | Bengt Nyman, 2013 (Nobel week) | CC BY 2.0 (Commons transfer and FlickreviewR pass) | Flickr page 404 |
| rita-levi-montalcini | Hagblom-Foto / Lund University Library, 12 Dec 1986 | Public Domain Mark (library's own "no known copyright" statement, Alvin record read via an Internet Archive capture) | residual risk: a library statement, not a computed expiry; fallback CC BY-SA 2.0 "NGF 08" file |
| hans-christian-orsted | C. A. Jensen, 1832-33, SMK KMS8176 | Public domain (painter d.1870; SMK open API record states the Public Domain Mark) | SMK web pages are JavaScript-only; record read via the API |

## Publication vs. eligibility

Rows, confidence, evidenceType, metadata, portrait decisions, publication
decisions (15 x `evidence_approved`) and the Achievement sets were frozen first
(every correction above was made before eligibility was read); eligibility was
then read only. **All 15 shipped are non-match-eligible**: no padding, no
rescue. Roster50 statistics (min / median / max): rows 6 / 9 / 13; coverage
0.174 / 0.266 / 0.385; high-confidence count 6 / 9 / 13; high-confidence average
0.527 / 0.577 / 0.614. Roster50 eligible N = 0.

## Production, promotion, index, localization

`generateRoster50.ts` (explicit 15-slug literal allowlist;
`preparePersonSeedForPromotion()`; never reads eligibility) -> `roster50.ts`;
`ROSTER_50` wired into `seed.ts` and `NAMED_ROSTERS`. `peopleIndex.generated.ts`
regenerated (478 entries). 15 `person.name.<slug>` Korean names + concise EN/KO
editorial (no raw ids).

| | Before | After |
|---|---|---|
| Production | 463 | **478** |
| Directory-visible | 462 | **477** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 535 | **550** (15 new, all shipped) |

### A. Published/directory field-category coverage (directory taxonomy)

| Category | Before (463) | After (478) | Delta |
|---|---|---|---|
| science_knowledge | 194 | 199 | +5 |
| arts_culture | 167 | 173 | +6 |
| leadership_society | 77 | 77 | +0 |
| building_discovery | 141 | 147 | +6 |

### B. MATCH-ELIGIBLE interest-scope pools (114 eligible people)

| Category | Before | After | Delta |
|---|---|---|---|
| science_knowledge | 50 | 50 | +0 |
| arts_culture | 43 | 43 | +0 |
| leadership_society | 42 | 42 | +0 |
| building_discovery | 15 | 15 | +0 |

Remaining distance to the 500-person scale checkpoint: **22** production
people (478 now). The checkpoint was not started. A 15-candidate Roster51 would
reach at most 493, so **Roster52 would be the first roster able to cross 500**;
under the milestone rule that roster stops after its PR merges and hands off to
the checkpoint.

## Recent-cohort watch (recorded, not re-analyzed)

Roster50 shipped 15, eligible 0. Cumulative Roster33-50: **253** shipped, **0**
match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS.

## Calibration, dispersion, matching health

`calibrate.ts quiz` x2: identical output; eligible cohort unchanged (114);
dispersion blob hash identical to HEAD (meanSd 11.704); no anchor file changed;
no refresh; `CALIBRATION_VERSION` = `calibration_v3`. Matching health: focused
confirmation only (full `matching.test.ts` passes with the 15 added to the
known-non-eligible lists).

## Test/audit maintenance

Mechanical bumps 463->478 / 462->477 (Roster24-49 pattern): lineage audit
(`ROSTER_50`, regex `4[0-9]|50`), matching / publication-separation divergent
lists (+15), kurosawa + legacy batch 2-5 + roster33-49 tests, e2e Directory
("477 people"). The Directory cross-facet curiosity AND collaboration result
moved 13 -> 16 ("전체 478명 중 16명") because Rita Levi-Montalcini, Jony Ive and
Katalin Karikó each cross both thresholds on their own evidence; the Playwright
assertion was updated and their names asserted. New `roster50.test.ts`: 15 x 10
table-driven checks + backlog/hold absence (incl. Hooke and Schrodinger
evidence_approved + portrait held) + cross-target integrity + structural Major
Achievement test. Historical significance remains a human gate.

## Validation

- `tsc --noEmit` clean. `validateCandidates.ts`: 550 candidates, 0 errors, 0
  warnings (`qa_passed` 93, `evidence_approved` 374, `held` 83).
- `vitest run`: **80 files, 3686 tests, all passed**.
- `next build --webpack`: success. **Literal build output:**
  `Generating static pages using 21 workers (980/980)` (reported as printed, not
  derived).
- Focused Playwright (Person, Editorial, Directory, Compare, Trait Explanation):
  **142/142** (one Directory assertion updated, then the file re-run: 34/34).
- Manual QA (production server): all 15 EN + 15 KO routes 200; all 15 portraits
  200; Hooke, Schrodinger, Lamborghini and Caravaggio 404 as intended; Compare
  route 200 (tim-cook, titian, katalin-kariko); visible-text scan: no raw `src_`
  ids, no `person.`/`field.` key leaks; one raw snake_case token
  (`public_domain`, from the SMK API field name) appeared on the Orsted page and
  was fixed (see below); true 375px sweep of all 30 EN+KO pages in the built-in
  browser: no horizontal overflow, no broken images (lazy images forced eager),
  7 sections each. No eligible new profile exists to spot-check.
- Source-link check, 236 URLs: 219 x 200; 17 x 403 (bot walls: Britannica x6,
  ASC, NGA, JFK Library, LOC, Prado, Science, Penn Today, ARCHITECT); 0 x
  404/410; 0 x 429; 0 timeouts; 0 checker errors.

## Narrow defects fixed

- Orsted's public source title and portrait source quoted the SMK API field name
  `public_domain`, which rendered as a raw snake_case token; reworded to plain
  language (metadata only).
- The Karikó Korean name was set to 커털린 커리코 (Wikidata/Korean Wikipedia)
  instead of the agent's 카탈린 카리코.
- Directory cross-facet assertion updated (above).

## Post-commit scoring lock

Run against the clean committed HEAD (implementation commit `0f008de`):
"Checked 550 previously-committed candidate file(s) against HEAD. 0
flagged." with "Legacy scoring lock: 22 pre-pipeline production people
covered, 0 flagged." Mechanical count of committed
`data-pipeline/candidates/*.json` at that HEAD (`git ls-tree`): **550** = 550
on disk = the checked count. Implementation commit: 67 changed files.

## Confirmations

No matching/architecture diagnostic repeated; no performance, similarity,
route-payload or storage benchmark (build success + the literal static-path line
only). No eligibility padding or rescue. Legacy lane paused (no legacy research,
rescoring or tuple change; Legacy Batch 6 not started). The older henry-ford /
vincent-van-gogh / stephen-hawking editorial debt was not pulled into Roster50.
Roster51 not started; the 500-person checkpoint not started.

## Operational notes

Research ran as agent batches of two to three candidates. The session hit the
5-hour usage limit twice mid-cycle (two concurrent agents exhausted it); the
saved candidate files, portraits and drafts survived every stop and were reused
rather than restarted (Phelps and Kobe were complete on disk when their agent
was cut off; Titian resumed from two saved sources). After the second stop the
cycle ran one agent at a time until the window reset, then two. Weekly usage
rose from about 0% to about 40% over the cycle.
