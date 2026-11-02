# Roster62 checkpoint (2026-11-01)

Eighth 30-candidate batch after the 500-person scale checkpoint (EXPANSION_GREEN), twenty-seventh
fresh new-candidate cycle after the recent-cohort diagnostic, and the second cycle selected from a
portrait-preflighted pool. This cycle graded **candidate-level portrait viability** (is there a
credible bounded path to some rights-clear portrait?) instead of only the first lead image.
Outcome: **30 frozen, 25 shipped, 5 held on portrait**, production **667 -> 692**,
directory-visible **666 -> 691**, match-eligible **114 (unchanged, 0 of 25 eligible)**. No
portrait, rights, evidence, scoring, publication or eligibility standard was relaxed.

- `ROSTER62_BASE_SHA` = `ce1eacacbf3b1345b55ce7e0bb17b36d7a06e7a7`, the normal merge of PR #74
  (Roster61) into `main` (parents `1d2ff4b29233d37ea1bbb64843a550818c512324` and
  `f0016a1f532809150604595c5289e91c51dfbfb8`).
- Branch `feat/roster62`; PR against `main` (not merged, by instruction).

## PR #74 merge (Roster61)

Mechanical guards, all passing before the merge: PR open, not draft, `mergeable` / `CLEAN`, base
exactly `1d2ff4b2...`, head exactly `f0016a1f...`, 0 behind base, Vercel `SUCCESS` on the exact
head, 0 review threads, only the two reviewed commits, and the only comment was the Vercel bot's
informational notice. Merged with a normal merge commit guarded on the expected head SHA (no squash,
no rebase).

## Roster61 production verification (deployment SHA = merge SHA)

- 23/23 shipped Roster61 people: EN route 200, KO route 200 (`/en-US/people/<slug>`,
  `/ko-KR/people/<slug>`); 23/23 portrait URLs 200.
- All 7 Roster61 holds (Loroupe, Ali Farka Toure, Ulugh Beg, Wang Yangming, Hostos, Khusrau,
  Taqi al-Din) return 404 in both locales.
- Directory shows "666 people".
- Starting counts: production **667**, directory-visible **666**, match-eligible **114**,
  candidate JSON **817** (non-production candidate files 172).
- Canonical `categoryCounts.ts` at the base, reconciled with the Roster61 checkpoint:

```
current: {"production":667,"visible":666,"categoriesProduction":{"science_knowledge":263,"arts_culture":244,"leadership_society":116,"building_discovery":213},"categoriesVisible":{"science_knowledge":263,"arts_culture":244,"leadership_society":115,"building_discovery":212}}
```

## Pool, identity gate, backlog

- **Proposed pool: 120** (building 27, arts 32, science 29, leadership 32): 67 unfrozen names from
  the Roster61 pool re-gated and re-preflighted, plus 53 new names chosen to counter an easy-portrait
  bias (ancient to contemporary; Africa, the Middle East, East, South and Central Asia, Latin America).
- **Identity gate** (`identityGate.ts`, whole pool, live Wikidata QID for every probe, against all
  667 production people including legacy people without QIDs): **0 hard duplicates** (slug,
  normalized name, alias, token set, QID) and **0 review-tier matches**, so there were no
  `same_person` / `different_person` / `uncertain` dispositions to persist. The gate was
  sanity-tested in Roster61 against known duplicates. Dispositions file: none.
- **Backlog exclusion**: all 172 non-production candidate files compared by slug, QID, canonical
  name and alias: **0 hits**; no backlog candidate was reused. No production QID collision.
- One unresolved probe (Yamaha Torakusu) was dropped before the gate; two QIDs were corrected by hand
  (Mozi, Francisco Pascasio Moreno) after the live search.

## Candidate-level portrait viability preflight

For every identity-clean candidate the scan pulled all Wikidata image claims and a Commons file
search (license, author, date, size) so alternatives were visible, not only the first P18 file.
Strong routes were then opened at the source: Rijksmuseum linked-art records ("Public Domain"),
LoC item JSON (Peck, Mercator), the Finna API (CC BY 4.0, Sibelius), the Smithsonian NPG object
page (CC0, William James), the Science History Institute record ("No Known Copyright", Takamine),
NDL pages. Pool-level grades: **strong 11 (every one source-opened), plausible 93, risky 16**
(frozen grades included). Outside the frozen 30 the plausible/risky split came from an automated
screen (a named-creator or institutional route visible in the scan); it is permissive and was not
source-verified, so only the frozen 30 carry meaningful grades.

## ROSTER62_FROZEN_30

Declared after the identity gate, backlog exclusion, candidate-level preflight and portfolio / region
balancing; immutable afterwards. Portfolio 8 building / 8 arts / 7 science / 7 leadership-society.

**Frozen preflight composition: strong 11, plausible 13, risky 6.** Target (>=10 strong, >=12 additional
plausible, <=8 risky) **achieved**. Per-group strong+plausible: building 7, arts 6, science 6,
leadership 5 (goal >=4 each, achieved). **Lead dependence recorded at freeze: 13 lead-robust (the
first image already had a defensible route), 17 alternative-dependent (the first image was weak but
a credible alternative path existed).** Frozen regional mix: East Asia 7, Western Europe 6, North
Africa 3, Latin America 3, North America 3, Southern Europe 2, South Asia 2, sub-Saharan Africa 2,
West Asia 1, central Europe 1. Seven of the 30 were born before 1700 (Mencius, Li Qingzhao, Su Song,
Mercator, Velazquez, Comenius, Huygens), so the pool and the freeze were not tilted toward
photograph-era figures.

## Ship / hold result

**Shipped (25)** - building 8: Capablanca, Burton, Shibusawa Eiichi, Jamsetji Tata, Miruts Yifter,
Hicham El Guerrouj, Annie Smith Peck, Eusebio. Arts 6: Higuchi Ichiyo, Sibelius, Kamal-ol-molk,
Nadine Gordimer, Orozco, Velazquez. Science 5: Du Chatelet, Mercator, Huygens, Takamine, Maria
Mitchell. Leadership 6: Comenius, Hegel, Motoori Norinaga, Mencius, Tahtawi, William James.

**Held (5)**: research, candidate JSON and `evidence_approved` status kept, no portrait, not in the
generator allowlist, not in production.

| Hold | Grade | Blocker | Next step |
|---|---|---|---|
| li-qingzhao | risky | Palace Museum portrait has only an uploader GFDL self-claim; the Jiang Xun painting is public domain by age and its inscription names the sitter, but the only file is 171x700 px (figure ~171x250), copied from a gallery page, holder stated only by the uploader | high-resolution Wuxi Museum reproduction with written terms, or a pre-1931 printed portrait plate with an item-level date |
| mohammed-abdel-wahab | risky | every image is by an unknown creator with only a jurisdiction-level PD-Egypt tag and no pre-1931 publication fact (checked the lead, four other photos, two posters, a modern drawing) | item-level pre-1931 photograph from an institution with stated terms, or written terms from the Abdelwahab Estate |
| su-song | risky | the Zhejiang library album image has an unknown artist, only an upload timestamp for a date, an unresponsive holder page and a bare PD-old tag; other files are diagrams or modern statues | a Song/Ming/Qing portrait with an item-level PD statement, or the original Zhejiang record naming artist, date and terms |
| jyotirao-phule | risky | Commons files (250x354, 233x300) have no source, creator or date; the circulating photograph is credited by the Pune chair page to the Palkar collection on an "All Rights Reserved" page; alternatives are a modern painting photo and a 1977 stamp | identify the original photograph and its first publication, or written terms |
| francisco-moreno | **plausible** | the BnF 1884 Societe de Geographie photograph (Gallica record via SRU) states item-level restricted use "sous convention Societe de geographie" and names no photographer, contradicting the Commons PD tags; the ETH-Bibliothek slide is a "Reproduktion" of an unidentified earlier photograph; the Commons blog image has an unknown photographer | identify the original photograph ETH reproduced, obtain terms from the BnF convention, or find a photograph with an item-level PD statement |

### Per-candidate table

Rows = rows scored before agent self-calibration -> final; sources = source records in the
candidate file; agent-lowered = rows the agent lowered at self-calibration; final portrait = whether
the shipped image is the initial lead (including the same photograph or painting from a better
source) or a different replacement image.

| Slug | Group | Region | Preflight | Lead dependence | Initial -> final rows | Sources | Agent-lowered | Final portrait | Outcome |
|---|---|---|---|---|---|---|---|---|---|
| jose-raul-capablanca | building | latin_america | strong | alt-dependent | 4 -> 4 | 10 | 1 | replacement | shipped |
| richard-francis-burton | building | western_europe | strong | alt-dependent | 7 -> 7 | 9 | 2 | replacement | shipped |
| shibusawa-eiichi | building | east_asia | strong | lead-robust | 7 -> 7 | 9 | 2 | lead | shipped |
| jamsetji-tata | building | south_asia | risky | alt-dependent | 6 -> 6 | 8 | 1 | replacement | shipped |
| miruts-yifter | building | sub_saharan_africa | plausible | lead-robust | 4 -> 4 | 7 | 1 | lead | shipped |
| hicham-el-guerrouj | building | north_africa | plausible | lead-robust | 3 -> 3 | 8 | 2 | lead | shipped |
| annie-smith-peck | building | north_america | strong | alt-dependent | 8 -> 8 | 9 | 1 | replacement | shipped |
| eusebio | building | southern_europe | plausible | alt-dependent | 2 -> 2 | 9 | 1 | replacement | shipped |
| higuchi-ichiyo | arts | east_asia | plausible | lead-robust | 4 -> 4 | 8 | 1 | replacement | shipped |
| jean-sibelius | arts | western_europe | strong | alt-dependent | 5 -> 5 | 9 | 1 | replacement | shipped |
| kamal-ol-molk | arts | west_asia | plausible | lead-robust | 5 -> 5 | 7 | 1 | replacement | shipped |
| nadine-gordimer | arts | sub_saharan_africa | plausible | lead-robust | 4 -> 4 | 9 | 1 | lead | shipped |
| jose-clemente-orozco | arts | latin_america | plausible | lead-robust | 7 -> 7 | 10 | 2 | lead | shipped |
| li-qingzhao | arts | east_asia | risky | alt-dependent | 5 -> 5 | 7 | 2 | none | **held** |
| diego-velazquez | arts | southern_europe | plausible | lead-robust | 5 -> 5 | 6 | 2 | replacement | shipped |
| mohammed-abdel-wahab | arts | north_africa | risky | alt-dependent | 5 -> 5 | 8 | 1 | none | **held** |
| emilie-du-chatelet | science | western_europe | strong | alt-dependent | 5 -> 5 | 7 | 2 | replacement | shipped |
| gerard-mercator | science | western_europe | strong | alt-dependent | 5 -> 5 | 7 | 1 | replacement | shipped |
| christiaan-huygens | science | western_europe | strong | alt-dependent | 5 -> 5 | 9 | 1 | replacement | shipped |
| jokichi-takamine | science | east_asia | plausible | lead-robust | 5 -> 5 | 7 | 1 | replacement | shipped |
| maria-mitchell | science | north_america | plausible | alt-dependent | 5 -> 5 | 8 | 1 | replacement | shipped |
| su-song | science | east_asia | risky | alt-dependent | 4 -> 4 | 6 | 1 | none | **held** |
| francisco-moreno | science | latin_america | plausible | alt-dependent | 5 -> 5 | 8 | 1 | none | **held** |
| jan-amos-comenius | leadership | central_europe | strong | lead-robust | 5 -> 5 | 7 | 1 | lead | shipped |
| g-w-f-hegel | leadership | western_europe | strong | alt-dependent | 5 -> 5 | 6 | 1 | lead | shipped |
| motoori-norinaga | leadership | east_asia | plausible | lead-robust | 5 -> 5 | 6 | 1 | replacement | shipped |
| mencius | leadership | east_asia | plausible | lead-robust | 3 -> 3 | 7 | 1 | lead | shipped |
| jyotirao-phule | leadership | south_asia | risky | alt-dependent | 5 -> 5 | 7 | 1 | none | **held** |
| rifaa-al-tahtawi | leadership | north_africa | risky | alt-dependent | 6 -> 6 | 7 | 1 | replacement | shipped |
| william-james | leadership | north_america | strong | lead-robust | 8 -> 8 | 8 | 0 | lead | shipped |

## Preflight accuracy: viability and lead-image survival

| Grade | Frozen | Shipped | Held | Initial lead survived | Replacement portrait shipped |
|---|---|---|---|---|---|
| strong | 11 | 11 | 0 | 4 | 7 |
| plausible | 13 | 12 | 1 | 5 | 7 |
| risky | 6 | 2 | 4 | 0 | 2 |
| **all** | 30 | 25 | 5 | 9 | 16 |

Candidate-level viability predicted the outcome well (strong 11/11, plausible 12/13, risky 2/6), and
**replacement-image discovery was the dominant success path: 16 of the 25 shipped portraits
(64%) are not the initial lead** (Roster61: 11 of 23, 48%). All 13 lead-robust candidates
shipped; of the 17 alternative-dependent candidates 12 shipped and all 5 holds came from that
group (Moreno plus the four risky holds), so "a weak first lead with a hoped-for alternative path"
is where viability was overestimated or where risky grades were borne out.
"Initial lead survived" counts the same photograph or painting taken from a better source
(Shibusawa's book plate, Hegel's SMB oil painting).

**Why the plausible hold overestimated viability (Francisco Moreno):** the freeze analogy was the
BnF Agence Rol items that shipped Coubertin and Capablanca, whose Gallica OAI records state
"domaine public" at item level; the Moreno item is from a different BnF collection
(Societe de geographie) whose item-level record carries a restrictive convention. A collection-level
similarity is not an item-level fact. The Gallica HTML page is bot-blocked, so the SRU record was
the first place the actual rights statement appeared.

**What made each risky ship succeed:** Jamsetji Tata - the 184x179 lead was dropped for the signed
1889 oil portrait by Edwin Arthur Ward (d. 1933, so public domain by age), identified by tata.com
independently of the museum's dead page. Rifa'a al-Tahtawi - the uploader-only 150x216 lead and the
1958 al-Zirikli plate were dropped for the same drawing found as a captioned plate in Zaydan's
*Tarajim Mashahir al-Sharq*, vol. 2 (Hilal Press, Cairo, 1922), on the Internet Archive: a
published-before-1931 basis found only by searching the book plates.

**Preflight miscalibrations seen this cycle (for later rosters, standards unchanged):** (1) a
Commons file can be mislabelled against the live archive record (Eusebio: the Anefo item cited on
Commons is annotated "failed shot" and serves a different frame; a neighbouring 1972 item carried
the correct CC0); (2) a live museum reproduction page can contradict the Commons PD tag even for
Old Masters (Velazquez: Valencia museum requires a signed request and a credit line; Maria
Mitchell: the Dassel painting is held by the Maria Mitchell Association behind a written-request
agreement); (3) a Rijksmuseum print (record: Public Domain) or an Internet Archive book plate with a
documented pre-1931 US imprint shipped every time it was used (Burton, Du Chatelet, Huygens,
Comenius, Hegel, Shibusawa, Maria Mitchell, Tahtawi); (4) LoC Harris & Ewing items dated only by
"unverified caption data" with the generic "no known restrictions" line were rejected
(Capablanca); a LoC item whose note names a studio and a syndicate and dates it before 1923
was accepted (Peck, Mercator).

## Exact structured handback totals (from the 30 per-candidate handback files)

- Initial rows scored: **152** (shipped 128, held 24). Final rows: **152**. No row was added or
  removed after self-calibration.
- Agent self-calibration lowered **36** rows in total (shipped candidates 30, held candidates 6),
  targeted at about 2-3 high-risk rows per candidate (36 of 152 rows, so not a blanket cap). The exact
  rows with old -> new score / confidence are:

  - jose-raul-capablanca: intuitive_synthesis 74/0.52 -> 68/0.46
  - richard-francis-burton: cross_domain_range 78/0.55 -> 72/0.5
  - richard-francis-burton: resourcefulness 68/0.48 -> 62/0.42
  - shibusawa-eiichi: impact_motivation 72/0.52 -> 66/0.46
  - shibusawa-eiichi: leadership_drive 70/0.5 -> 64/0.44
  - jamsetji-tata: impact_motivation 74/0.58 -> 70/0.54
  - miruts-yifter: adaptability 60/0.48 -> 56/0.44
  - hicham-el-guerrouj: planning_orientation 62/0.5 -> 58/0.46
  - hicham-el-guerrouj: impact_motivation 54/0.4 -> 50/0.38
  - annie-smith-peck: competitiveness 72/0.58 -> 68/0.54
  - eusebio: competitiveness 72/0.58 -> 68/0.54
  - higuchi-ichiyo: creative_originality 70/0.56 -> 66/0.52
  - jean-sibelius: creative_originality 80/0.64 -> 78/0.6
  - kamal-ol-molk: autonomy_need 72/0.6 -> 68/0.52
  - nadine-gordimer: detail_orientation 70/0.56 -> 66/0.5
  - jose-clemente-orozco: achievement_drive 66/0.5 -> 62/0.45
  - jose-clemente-orozco: conflict_tolerance 70/0.55 -> 60/0.45
  - li-qingzhao: detail_orientation 58/0.42 -> 55/0.38
  - li-qingzhao: persistence 62/0.48 -> 58/0.44
  - diego-velazquez: achievement_drive 66/0.5 -> 62/0.45
  - diego-velazquez: collaboration 56/0.4 -> 50/0.35
  - mohammed-abdel-wahab: creative_originality 74/0.62 -> 70/0.56
  - emilie-du-chatelet: persistence 62/0.5 -> 58/0.44
  - emilie-du-chatelet: analytical_rigor 64/0.52 -> 60/0.48
  - gerard-mercator: creative_originality 68/0.52 -> 64/0.48
  - christiaan-huygens: creative_originality 68/0.48 -> 64/0.44
  - jokichi-takamine: opportunity_sensing 78/0.62 -> 74/0.56
  - maria-mitchell: persistence 72/0.56 -> 68/0.52
  - su-song: cross_domain_range 68/0.48 -> 64/0.44
  - francisco-moreno: impact_motivation 78/0.6 -> 74/0.55
  - jan-amos-comenius: systems_abstraction 68/0.52 -> 64/0.46
  - g-w-f-hegel: creative_originality 66/0.48 -> 62/0.44
  - motoori-norinaga: analytical_rigor 66/0.48 -> 60/0.42
  - mencius: independent_thinking 64/0.48 -> 60/0.42
  - jyotirao-phule: impact_motivation 78/0.55 -> 72/0.5
  - rifaa-al-tahtawi: impact_motivation 68/0.5 -> 62/0.45

  Reasons (one sentence each) are in `handback62/<slug>.json` and in each candidate's
  `provenance.notes` as a `HANDBACK62:` line. William James is the only candidate where the agent
  lowered nothing (the lead lowered 5 rows).
- Major Achievement gate, first pass, agent level: **2 failures in 150 checks** (30 candidates x 5
  checks), both **top omission**, both self-corrected before lead review: Jamsetji Tata (the
  Institute of Science was a clause on card 1; it now has its own card) and Hicham El Guerrouj (the
  1,500 m world record was missing from card 2). The agents had recorded these correctly in the
  editorial drafts but wrote `false` in the two handback files; the lead corrected both handbacks
  and the `HANDBACK62:` lines so the totals reconcile. Primary, identity, significance-over-novelty
  and side-project failures: 0. Lead Achievement corrections: 0.

## Lead review

Fully reviewed the 25 shipped candidates (strongest rows and confidence, evidence independence,
halo effects, region, taxonomy, Korean names, portrait basis and kind, first two cards). All first
Achievement cards state the defining contribution (verified on the rendered pages in both
locales). **Eighteen rows in nine candidates were lowered with `RUBRIC_CORRECTION` (downward only,
before eligibility; evidence types lowered from `documented` to `strong_inference` where the support
is reference summaries):**

| Candidate | Row | Old -> new (score / confidence) | Reason (summary) |
|---|---|---|---|
| jean-sibelius | perfectionism | 76 / 0.66 -> 72 / 0.58 | burning of the Eighth documented, motive inferred; admiring sources narrate the legend |
| jean-sibelius | creative_originality | 78 / 0.60 -> 72 / 0.54 | retrospective praise; the critical camp disputes originality |
| kamal-ol-molk | mastery_orientation | 76 / 0.66 -> 72 / 0.58 | read from finished paintings and an encyclopedia |
| kamal-ol-molk | detail_orientation | 78 / 0.62 -> 72 / 0.54 | stylistic assessment, not documented working method |
| richard-francis-burton | risk_tolerance | 76 / 0.58 -> 72 / 0.52 | summary-level popular accounts; no modern biography read |
| richard-francis-burton | curiosity | 74 / 0.55 -> 70 / 0.50 | reference summaries only |
| annie-smith-peck | persistence | 76 / 0.62 -> 74 / 0.58 | institutional/admiring profiles; attempt counts differ |
| nadine-gordimer | persistence | 72 / 0.62 -> 68 / 0.54 | output over six decades is not documented working perseverance |
| shibusawa-eiichi | proactive_agency | 74 / 0.56 -> 70 / 0.52 | promotional foundation/government pages, approximate counts |
| shibusawa-eiichi | cross_domain_range | 74 / 0.55 -> 70 / 0.50 | role lists do not separate founding from board membership |
| hicham-el-guerrouj | persistence | 72 / 0.58 -> 68 / 0.52 | results record plus federation/press retellings of his own account |
| william-james | cross_domain_range | 80 / 0.62 -> 74 / 0.54 | reference works echo one another; no independent behavioural account |
| william-james | curiosity | 78 / 0.62 -> 72 / 0.54 | institutional exhibition and a pupil's memoir |
| william-james | creative_originality | 76 / 0.58 -> 70 / 0.52 | retrospective praise; pragmatism shared with Peirce and sharply criticised |
| william-james | intuitive_synthesis | 74 / 0.58 -> 68 / 0.50 | a pupil's affectionate memoir and encyclopedic characterisation |
| william-james | independent_thinking | 72 / 0.58 -> 68 / 0.52 | overviews describe positions, little independent evidence of resistance |
| rifaa-al-tahtawi | cross_domain_range | 78 / 0.56 -> 72 / 0.50 | descriptive, admiring entries plus one revisionist essay |
| rifaa-al-tahtawi | curiosity | 72 / 0.54 -> 68 / 0.48 | inferred from the Paris study and translation programme |

No score or confidence was raised anywhere. Portrait-held candidates (5) received a lighter review
of scores (agent self-calibration only); reopening any of them later requires a fresh lead review.

## Portrait review and caveats (shipped)

Full rights review by the agents (sitter, creator, date, provenance, underlying source, rights
holder, licence/PD rationale + URL, attribution, dimensions, no upscaling); `likeness` vs
`historical_depiction` kept honest. Historical depictions: Kamal-ol-molk (lifetime lithograph by
another artist), Velazquez (1898 etching after the self-portrait in Las Meninas), Du Chatelet (print
after Nattier), Huygens (engraving after a drawing), Maria Mitchell (engraved plate), Comenius
(Ovens painting), Hegel (Schlesinger oil painting), Motoori Norinaga (later copy after a
self-portrait), Mencius (anonymous Yuan album leaf), Tahtawi (anonymous drawing). Caveats worth
carrying: Capablanca (BnF Agence Rol 1921, photographer unnamed, rights read from the BnF OAI
record); Shibusawa (1922 US book plate, photographer unnamed, Japan-origin URAA only reasoned);
Jamsetji Tata (351x440, museum page dead, public domain by the painter's 1933 death);
Miruts Yifter (race scene cropped to 210x300, identified by caption and legible bib, RIA licence
via the Wikimedia donation, RIA site unchecked); Hicham El Guerrouj (snapshot, live Flickr CC
BY-SA 2.0 confirmed, identity from the photographer's label plus context); Higuchi Ichiyo
(344x450, NDL "About This Site" page states exhibition images are public domain, photographer
unknown); Orozco (Los Angeles Times 20 March 1930, holder says published 21 March 1930, so age basis;
the UCLA page is bot-walled and the Commons CC BY 4.0 is collection-level, so not relied on);
Mercator (LoC impression of the 1574 Hogenberg plate, kind set to likeness because the plate's own
inscription gives his age); Takamine (coarse halftone from a 1911 Japanese book, NDL Public Domain
Mark); Motoori Norinaga (Kyoto University Museum "FREE LICENSE with Attribution", not Creative
Commons; the 1830 date and the son's attribution unverified); **Mencius (the National Palace Museum
download buttons sit behind a captcha that was not solved; the agent cropped a region from the
museum's own public IIIF image service, the CC0 tier of the open-data declaration at about 0.87
million pixels, and a human can re-download the file from the item page if the strictest reading is
wanted)**; Tahtawi (anonymous drawing, a 1922 published plate, artist and date unknown); Peck (LoC
print dated by the press-syndicate stamp, photographer unnamed); William James (CC0 line read from the
Smithsonian Open Access API record because the NPG page blocks scripted requests).

## Eligibility (computed only after scores were frozen)

Every shipped person is non-match-eligible; **0 of 25 eligible, 114 unchanged**. No rescue: no rows
added, no score or confidence raised, no evidence reinterpreted after eligibility was known.
Columns: rows / coverage / high-confidence count / high-confidence average.

| Person | Rows | Coverage | HC count | HC avg |
|---|---|---|---|---|
| annie-smith-peck | 8 | 0.235 | 7 | 0.534 |
| christiaan-huygens | 5 | 0.159 | 3 | 0.507 |
| diego-velazquez | 5 | 0.150 | 1 | 0.500 |
| emilie-du-chatelet | 5 | 0.156 | 3 | 0.500 |
| eusebio | 2 | 0.057 | 1 | 0.540 |
| g-w-f-hegel | 5 | 0.162 | 1 | 0.520 |
| gerard-mercator | 5 | 0.152 | 2 | 0.510 |
| hicham-el-guerrouj | 3 | 0.091 | 1 | 0.520 |
| higuchi-ichiyo | 4 | 0.133 | 3 | 0.513 |
| jamsetji-tata | 6 | 0.181 | 4 | 0.535 |
| jan-amos-comenius | 5 | 0.149 | 0 | 0.000 |
| jean-sibelius | 5 | 0.162 | 5 | 0.540 |
| jokichi-takamine | 5 | 0.155 | 2 | 0.550 |
| jose-clemente-orozco | 7 | 0.215 | 3 | 0.540 |
| jose-raul-capablanca | 4 | 0.120 | 2 | 0.520 |
| kamal-ol-molk | 5 | 0.149 | 4 | 0.540 |
| maria-mitchell | 5 | 0.155 | 4 | 0.520 |
| mencius | 3 | 0.095 | 0 | 0.000 |
| miruts-yifter | 4 | 0.123 | 2 | 0.535 |
| motoori-norinaga | 5 | 0.159 | 1 | 0.500 |
| nadine-gordimer | 4 | 0.124 | 4 | 0.515 |
| richard-francis-burton | 7 | 0.209 | 5 | 0.514 |
| rifaa-al-tahtawi | 6 | 0.181 | 3 | 0.500 |
| shibusawa-eiichi | 7 | 0.203 | 4 | 0.505 |
| william-james | 8 | 0.241 | 7 | 0.520 |

Batch min / median / max: rows 2 / 5 / 8; coverage 0.057 / 0.155 / 0.241; HC count 0 / 3 / 7; HC
average 0 / 0.520 / 0.550. All 25 fall below the minimum of 18 scored attributes and the 0.60
coverage floor, as expected for sparse, evidence-grounded profiles.

**Cumulative new-candidate cohort Roster33-62: 467 people shipped, 0 match-eligible** (Roster33-61:
442; Roster62 adds 25). Recorded, not re-investigated; no matching diagnostic was triggered or run.

## Counts and canonical categories

Literal `categoryCounts.ts 62` output:

```
before roster62: {"production":667,"visible":666,"categoriesProduction":{"science_knowledge":263,"arts_culture":244,"leadership_society":116,"building_discovery":213},"categoriesVisible":{"science_knowledge":263,"arts_culture":244,"leadership_society":115,"building_discovery":212}}
after roster62:  {"production":692,"visible":691,"categoriesProduction":{"science_knowledge":275,"arts_culture":252,"leadership_society":125,"building_discovery":222},"categoriesVisible":{"science_knowledge":275,"arts_culture":252,"leadership_society":124,"building_discovery":221}}
```

Deltas: science +12, arts +8, leadership +9, building +9 (38 category memberships for 25 people,
because a person counts in every category containing any of their `fieldIds`). Reconciled
mechanically by counting the 25 people's `fieldIds` against `PROFESSION_CATEGORIES`: science 12,
arts 8, leadership 9, building 9, 0 hidden people, so production and visible deltas are identical
(the +1 production-visible gap in leadership and building remains Zheng He).

Final state: production **692**, directory-visible **691**, match-eligible **114**, candidate JSON
**847** (817 + 30); non-production candidate files **177** (the 172 at the base plus the 5
Roster62 holds). Shipped regional mix: Western Europe 6, East Asia 5, North America 3, Southern
Europe 2, North Africa 2, Latin America 2, sub-Saharan Africa 2, South Asia 1, central Europe 1,
West Asia 1. Eras: 19th century 10, 20th century 7, early modern 6, ancient 1, contemporary 1.

## Validation

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: 0 errors, 0 warnings (671 evidence_approved, 93 qa_passed, 83 held).
- Focused `roster62.test.ts`: 413 tests passed. It carries the identity protections: every shipped
  target is compared with every OTHER production person (no hard identity collision), every hold has
  no hard production collision, global ids, slugs and non-null QIDs are unique, and the holds stay
  `evidence_approved` and absent from production.
- Full Vitest: **92 files, 6646 tests passed**.

## Calibration

`calibrate.ts quiz` run twice: identical output (`meanSd` **11.704**) and identical
`dispersion.generated.ts` content on both runs (blob hash equal to HEAD's, `73e03834...`, i.e. the
working-tree `M` was line-ending/stat noise only and was restored); the eligible set is unchanged
(114). No tuning; `CALIBRATION_VERSION` unchanged.

## Final build and Playwright

- Final build (after the last user-visible and data change): `Generating static pages using 21
  workers (1408/1408)`; invariant `2 x production_count + 24` = 2 x 692 + 24 = **1408** confirmed.
- **Final focused Playwright** (Person, Editorial, Directory, Compare, Trait Explanation:
  `person.visual`, `editorial`, `peopleDirectory`, `compare.visual`, `traitExplanation`):
  **142 passed on the first run**, 0 failed.
- Diagnostic whole-suite Playwright run: **1037 passed, 3 failed** (9.1 min), all three in `interestAreaMatching.spec.ts` (quiz completion / refresh: "expected URL" failures after the 30 s test timeout), the same three tests that failed identically in the Roster61 diagnostic run. Run in isolation they passed 3 of 3 (28.2 s, 29.2 s and 30.4 s, i.e. right at the 30 s limit); an earlier isolated run passed 2 and timed out 1 (32.6 s / 33.4 s). The machine was loaded by unrelated desktop apps (about 50% CPU while idle), a base-tree comparison run could not finish because its webServer production build exceeded the 180 s limit, and a leftover QA `next start` process was found and stopped. Roster61 measured the same tests at 18.9-22.5 s in isolation and Roster60 at 21.7-21.9 s on a quieter machine. The quiz flow and its code were not touched by this roster (only data, editorial text, Korean names and tests changed), so this is a load-sensitive near-limit timing, not a deterministic regression; no test, timeout or product code was changed. The final focused five-suite run above is the production validation.

## Local QA (exact final build, `next start`)

- All 25 shipped profiles: EN 200, KO 200; all 25 portrait URLs 200. All 5 holds: EN 404, KO 404.
  Directory shows "691 people". Exactly 25 untracked portrait files (the shipped set), all referenced
  by `roster62.ts`; no unused portrait remains.
- 375x812 sweep, 50 pages (25 x EN/KO): no horizontal overflow, no broken main portrait image, no
  raw internal ids (`snake_case`, `src_`), portrait attribution present, Korean display names
  present, first Achievement card verified in both locales to state the defining contribution. Browser
  console: no errors on the visited page (the iframe sweep cannot read per-iframe console output, so
  console coverage is the top-level page only).
- Bounded source link sweep: 222 distinct source, portrait-source, attribution and licence URLs:
  **217 x 200, 1 x 202, 4 x 403** (bot blocks: Gallica, the Japan Patent Office page, two LoC item
  pages), **0 x 404**, so no genuine broken link needed fixing.

## Defects found and fixed

1. The Tata and El Guerrouj handbacks recorded no Achievement-gate failure although their drafts
   recorded a first-pass top-omission FAIL; corrected in the handback files and the `HANDBACK62:`
   lines before totalling (above).
2. A resumed-agent assignment gap: the third candidate of one group (Mencius) was briefly left
   unassigned after a coordination message; it was researched by a dedicated agent and shipped. No
   candidate was substituted.
3. Stray agent working files (a `w9/` download folder) appeared inside the worktree; removed before
   any `git add`.
4. Four research agents hit the 5-hour usage limit mid-cycle (HTTP 429); their saved candidate JSON,
   portraits and drafts were inspected on disk and the agents resumed for only the missing slugs.
   No data was lost.

## What was not done (by instruction)

No benchmark, no scale checkpoint, no eligibility rescue, no matching diagnostic (not triggered),
no Legacy Batch 6 (legacy remains paused), deferred checkpoint work untouched, Roster63 not started.
`feat/monetization-v1` untouched.

## Next

Recommended: keep candidate-level viability grading and the bounded alternative-image search, and
add one rule - for any lead from a museum or archive collection, read the item-level rights record
of that exact collection (not a sibling collection) before grading it plausible or strong. The five
holds (Li Qingzhao, Abdel Wahab, Su Song, Phule, Moreno) carry research and exact next steps for a
future portrait-only pass; Phule and Moreno need an identified original photograph or written terms,
and Li Qingzhao needs a high-resolution Wuxi Museum reproduction.

## Post-commit scoring lock

(To be filled in by the docs-only follow-up commit after the implementation commit.)
