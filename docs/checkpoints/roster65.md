# Roster65 checkpoint (2026-11-06)

Eleventh 30-candidate batch after the 500-person scale checkpoint (EXPANSION_GREEN), thirtieth fresh
new-candidate cycle after the recent-cohort diagnostic, and the fourth cycle selected from a
portrait-preflighted pool. New this cycle: the **image-identity / inscription rule** (read the
lettering, caption, cartouche or plate text on the actual image and compare it with the claimed sitter;
a rights-clear image of the wrong or ambiguous person is a portrait failure), carried on top of the
Roster64 historical-attribution screen and holder-record rule. Outcome: **30 frozen, 25 shipped, 5
held** (4 on portrait rights or sitter identity, 1 on evidence), production **737 -> 762**,
directory-visible **736 -> 761**, match-eligible **114 (unchanged, 0 of 25 eligible)**. No portrait,
rights, evidence, scoring, publication or eligibility standard was relaxed.

**This roster crossed 750.** Production is **762 (12 past the ~750 trigger)**. By repository precedent
(the 500 crossing, `docs/checkpoints/500-person-performance.md`) the crossing roster completes and merges
normally first; the ~750 scale checkpoint is then a **separate measurement-only task run against the
merged production state**. It was **not** run, started or partly done in this branch, and the shipped
count was not adjusted to land on or off 750 (see the proximity section).

- `ROSTER65_BASE_SHA` = `b5668ff7202ad8d1fc7b227d5e6429d6097097ed`, the normal merge of PR #77
  (Roster64) into `main` (parents `4b234849bc4b997f3888e914601fed6d6d468f93` and
  `2140787cf25c4beff5acf8601a92b0ffe12072ca`).
- Branch `feat/roster65`; PR against `main` (not merged, by instruction).

## PR #77 merge (Roster64)

Mechanical guards, all passing before the merge: PR open, not draft, `mergeable` / `CLEAN`, base exactly
`4b234849...`, head exactly `2140787c...`, 0 behind base, Vercel `SUCCESS` on the exact head, 0 review
threads, only the two reviewed commits (`4e1807f`, `2140787`), and the only comment was the Vercel bot's
informational notice. Merged with a normal merge commit guarded on the expected head SHA (no squash, no
rebase).

## Roster64 production verification (deployment SHA = merge SHA)

- 24/24 shipped Roster64 people: EN route 200, KO route 200; 24/24 portrait URLs (read from each live
  page's `<img src>`) 200.
- All 6 Roster64 holds (Matthew Flinders, Candido Portinari, Annie Jump Cannon, Zeno of Citium, Xunzi,
  Ramana Maharshi) return 404 in both locales.
- Directory shows "736 people". Starting counts: production **737**, directory-visible **736**,
  match-eligible **114**, candidate JSON **907** (192 non-production files).
- Canonical `categoryCounts.ts` at the base, matching the Roster64 checkpoint exactly (the single Zheng He
  production-vs-visible gap sits in leadership and building):

```
current: {"production":737,"visible":736,"categoriesProduction":{"science_knowledge":300,"arts_culture":268,"leadership_society":132,"building_discovery":236},"categoriesVisible":{"science_knowledge":300,"arts_culture":268,"leadership_society":131,"building_discovery":235}}
```

## Pool, identity gate, backlog

- **Proposals gated: 196** (90 unfrozen Roster64 pool names re-gated against the new 737-person
  production set + 106 new names chosen to improve geographic balance where portrait routes genuinely
  exist: Japan, China, Korea, India, Southeast Asia, the Ottoman world, Central Asia, Africa, Latin
  America). 42 were culled before the portrait scan for politics/activism-primary, post-1930 photograph
  only, or attribution reasons; the remaining **157 were scanned** and **128 had at least one
  PD/CC-licensed image candidate** (the mutable "viable-image" pool; slightly above the 90-120 band
  because the scan was run before the final cull).
- **Identity gate** (`identityGate.ts --json`, against all 737 production people including legacy people
  without QIDs): **0 hard duplicates** (slug, normalized name, alias, token set, QID) and **1 review-tier
  match**.
- **Review-tier adjudication (persisted in `dispositions65.json`, scratchpad):** `heron-of-alexandria`
  vs production `hypatia`: **different_person** (the review tier fired only because "Alexandria" was parsed
  as a surname; unrelated people centuries apart; the same disposition as Roster64). Excluded anyway by
  the attribution screen. No `uncertain` dispositions.
- **Backlog exclusion**: all 192 non-production candidate files compared by slug, QID, canonical name and
  alias: **1 hit, excluded and not reopened**: `vital-brazil`. No production QID collision.

## Historical-attribution screen (carried forward from Roster64)

Run on the pool before portrait preflight (`attr65.json`, scratchpad). Counts over the scanned pool plus
the Roster64 exclusions carried forward: **attributable 137, limited_but_usable 20, uncertain 12,
non_attributable 11**. The 11 non_attributable names (Homer, Aesop, Valmiki, Patanjali, Pythagoras,
Kalidasa, Huineng, Nagarjuna, Diogenes, Hillel the Elder, Hero of Alexandria) and the 12 uncertain names
(Hua Tuo, Zhang Zhongjing, Sappho, Thales, Zhuangzi, Mozi, Mirabai, Basava, Ramanuja, Madhava of
Sangamagrama, Cao Xueqin, Milarepa) were not re-pooled. **Frozen limited_but_usable: Shitao, Sakya Pandita,
Ho Xuan Huong.** Two of them were confirmed usable after reading (Shitao 4 rows, Sakya Pandita 5 rows);
**Ho Xuan Huong failed the screen on reading** (see holds): the screen is a pre-freeze judgment and the
agent's reading is the check on it, exactly as with Laozi in Roster63.

## Candidate-level portrait viability preflight (holder-record rule, image-identity rule)

For the frozen 30 the holder record was opened wherever it was reachable (Rijksmuseum linked-art records
for Mungo Park, Ibrahim Muteferrika and Matthew Boulton, the Met Open Access API for Ignatius Sancho,
Saicho and Sakya Pandita, the Nationaal Archief item page for Puskas) and the grade was capped at
plausible where it was not (loc.gov, Gallica HTML, the Yale and National Galleries pages, several museum
viewers). The pool-wide screen is automated and permissive, so only the frozen 30 carry meaningful grades.
The new image-identity rule was applied at research time by the agents (every chosen image was viewed and
its visible lettering compared with the claimed sitter).

## ROSTER65_FROZEN_30

Declared after the identity gate, review adjudication, backlog exclusion, attribution screen, portrait
preflight and portfolio / region review; immutable afterwards, no substitution. Portfolio **8 building /
8 arts / 7 science / 7 leadership-society**.

**Frozen preflight composition: strong 7, plausible 19, risky 4.** Target (>=10 strong, >=12 additional
plausible, <=8 risky): plausible and risky **met**; strong **short by 3** (the holder-record rule kept
many Commons-strong routes at plausible; the target is a selection aid, not a reason to upgrade a grade).
Strong+plausible per group: building 8, arts 5 (strong 1 + plausible 4), science 6, leadership 7 (goal
>=4 each, achieved). **Lead dependence at freeze: 14 lead-robust, 16 alternative-dependent.**

Frozen regions (as recorded in the candidate files, with the two judgment calls noted): East Asia 9,
Western Europe 7, South Asia 4, Central Europe 3, Latin America 3, West Asia 2, North America 1, North
Africa 1. **Western Europe fell to 7 of 30 (23%), from 14 of 30 (47%) in Roster64**; East Asia rose to
30% because the National Diet Library and the Met/Rijksmuseum/NPM open records are strongest there.
Sub-Saharan Africa has no representative this cycle (no candidate there had a viable portrait route).
Six of the 30 were born before 1700 (Saicho, Sakya Pandita, Shitao, Bernardino de Sahagun, Inca
Garcilaso de la Vega, Ibrahim Muteferrika).

## Ship / hold result

**Shipped (25)** - building 7: Ferenc Puskas, Mungo Park, Matthew Boulton, Richard Arkwright, Kano
Jigoro, Yasuda Zenjiro, Duke Kahanamoku. Arts 6: Ignatius Sancho, Osman Hamdi Bey, Ahmad Shawqi, Bankim
Chandra Chatterjee, Shitao, Ito Jakuchu. Science 5: Mikhail Lomonosov, Nikolay Pirogov, Anandibai Joshi,
Hiraga Gennai, Ignacy Domeyko. Leadership 7: Saicho, Sakya Pandita, Bernardino de Sahagun, Ishwar Chandra
Vidyasagar, David Hume, Arthur Schopenhauer, Wang Guowei. (Shipped per frozen group 7 / 6 / 5 / 7 from
8 / 8 / 7 / 7.)

**Held (5): 4 on portrait rights or sitter identity, 1 on evidence.** Research, candidate JSON kept; the
four portrait holds are `evidence_approved` with `portrait.status: held`; the evidence hold is status
`held` with zero rows. None is in the generator allowlist or in production.

| Hold | Grade | Blocker class | Blocker | Next step |
|---|---|---|---|---|
| ibrahim-muteferrika | **strong** | **inscription / sitter identity** | the Rijksmuseum record (print RP-P-1905-4876, Gilles Edme Petit, Paris 1742; Public Domain Mark + CC0) catalogues the sitter as Ibrahim Muteferrika, but the plate's own lettering (read at full resolution) names "Seid Achmet Aga Muteferrica Guedikli Zaim de Boziazi ... Grand Marechal de l'Ambassade en France": a different Ottoman embassy officer ("Muteferrika" is a court title, not this man's name). The only other images are photographs of a modern statue and bust, a seal photo and a script graphic | a holder-identified early depiction of him, or a rights-cleared modern illustration |
| inca-garcilaso-de-la-vega | plausible | portrait: imagined likeness | the 1879 Penoso engraving in the Almanaque de la Ilustracion is called a "retrato de fantasia" on Commons itself, is only 354x503, and the Universidad de Piura states he never sat for a portrait; the Cuzco School genealogy painting is a group scene sourced to a blog; the Gonzalez Gamarra paintings are 20th-century and in copyright; the BNE record was Cloudflare-walled | a holder-hosted early depiction that names him, or a rights-cleared modern commission |
| ogino-ginko | plausible | **holder-record contradiction after preflight** | the NDL item record for the source book (Kindai Meishi no Omokage vol.1, 1914, item 967109) carries rights code "undet" (published under a Commissioner for Cultural Affairs ruling, Article 67(1)) with no Public Domain Mark and no IIIF manifest, contradicting the exhibition-wide public-domain statement. A 1914 photograph by an unknown photographer is very probably public domain, but the Peirce standard (a holder record that says rights are undetermined caps the route) applies; the unmodified image is parked outside the repository | an NDL clarification, or a pre-1931 print of her with an item-level PDM record |
| claudio-gay | risky | **holder-record contradiction after preflight** | the only holder record for the Pierre Petit carte de visite (George Eastman Museum 1981.1205.0033a) names the sitter only through pencil notes and requires the museum's permission; the Biblioteca Nacional de Chile Franceschi photograph carries only "Algunos derechos reservados"; the Memoria Chilena engraving MC0005523 is item-level "patrimonio cultural comun" but its creator and date are unidentified; the 1845 Laemlein source host was unreachable; Commons image downloads were refused, so no candidate image could be inspected for inscriptions | a Paris Museum or BnF holder record, or written rights from the Biblioteca Nacional de Chile |
| ho-xuan-huong | risky | **evidence / attribution** (and portrait) | every source read says her biography comes almost entirely from the poems; parentage, birth and death dates are disputed; some critics think she never existed; her output is estimated at 46 to 213 poems; the main anchor (the 1964 Luu Huong Ky manuscript with an 1814 foreword) is itself questioned. Zero rows. The portrait lead (a 1916 Hanoi print via johnbalaban.com) also has no holder, a contested year and an uploader-only PD claim | none planned; reopen only if the product allows a figure card without trait rows |

### Per-candidate table

Agent rows = rows scored before agent self-calibration; lead review = lead rows lowered with
`RUBRIC_CORRECTION` (and rows removed); final rows = rows in the candidate file now; agent-lowered = rows
the agent lowered at self-calibration; final portrait = whether the shipped image is the initial lead
(including the same image from a better holder or plate) or a different replacement image.

| Slug | Group | Era / region | Preflight | Lead dependence | Agent rows | Lead review | Final rows | Sources | Agent-lowered | Final portrait | Outcome |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ferenc-puskas | building | 20th_century / central_europe | strong | lead-robust | 5 | 0 lowered | 5 | 11 | 2 | lead | shipped |
| mungo-park | building | 19th_century / western_europe | strong | lead-robust | 5 | 0 lowered | 5 | 8 | 2 | lead | shipped |
| ibrahim-muteferrika | building | early_modern / west_asia | strong | lead-robust | 4 | 0 lowered | 4 | 7 | 2 | none | **held** |
| matthew-boulton | building | early_modern / western_europe | strong | lead-robust | 6 | 1 lowered | 6 | 12 | 2 | lead | shipped |
| richard-arkwright | building | early_modern / western_europe | plausible | alt-dependent | 7 | 0 lowered | 7 | 8 | 2 | lead | shipped |
| kano-jigoro | building | 19th_century / east_asia | plausible | lead-robust | 6 | 2 lowered | 6 | 10 | 2 | lead | shipped |
| yasuda-zenjiro | building | 19th_century / east_asia | plausible | lead-robust | 5 | 0 lowered | 5 | 10 | 1 | lead | shipped |
| duke-kahanamoku | building | 20th_century / north_america | plausible | alt-dependent | 5 | 0 lowered | 5 | 10 | 2 | replacement | shipped |
| ignatius-sancho | arts | early_modern / western_europe | strong | lead-robust | 4 | 0 lowered | 4 | 7 | 1 | lead | shipped |
| inca-garcilaso-de-la-vega | arts | early_modern / latin_america | plausible | alt-dependent | 7 | 0 lowered | 7 | 10 | 1 | none | **held** |
| osman-hamdi-bey | arts | 19th_century / west_asia | risky | alt-dependent | 8 | 0 lowered | 8 | 9 | 1 | lead | shipped |
| ahmad-shawqi | arts | 19th_century / north_africa | plausible | lead-robust | 5 | 0 lowered | 5 | 6 | 1 | lead | shipped |
| bankim-chandra-chatterjee | arts | 19th_century / south_asia | plausible | lead-robust | 6 | 0 lowered | 6 | 6 | 2 | replacement | shipped |
| shitao | arts | early_modern / east_asia | risky | alt-dependent | 4 | 0 lowered | 4 | 6 | 1 | lead | shipped |
| ito-jakuchu | arts | early_modern / east_asia | plausible | alt-dependent | 6 | 1 lowered | 6 | 5 | 1 | lead | shipped |
| ho-xuan-huong | arts | early_modern / south_asia | risky | alt-dependent | 0 | 0 lowered | 0 | 5 | 0 | none | **held** |
| mikhail-lomonosov | science | early_modern / central_europe | plausible | alt-dependent | 8 | 1 lowered | 8 | 9 | 2 | lead | shipped |
| nikolay-pirogov | science | 19th_century / central_europe | plausible | alt-dependent | 8 | 4 lowered | 8 | 8 | 3 | lead | shipped |
| anandibai-joshi | science | 19th_century / south_asia | plausible | alt-dependent | 5 | 0 lowered | 5 | 7 | 0 | replacement | shipped |
| ogino-ginko | science | 19th_century / east_asia | plausible | lead-robust | 4 | 0 lowered | 4 | 8 | 0 | none | **held** |
| hiraga-gennai | science | early_modern / east_asia | plausible | alt-dependent | 4 | 0 lowered | 4 | 7 | 0 | replacement | shipped |
| ignacy-domeyko | science | 19th_century / latin_america | plausible | alt-dependent | 7 | 2 lowered | 7 | 9 | 1 | lead | shipped |
| claudio-gay | science | 19th_century / western_europe | risky | alt-dependent | 5 | 0 lowered | 5 | 7 | 1 | none | **held** |
| saicho | leadership | medieval / east_asia | strong | lead-robust | 5 | 0 lowered | 5 | 6 | 1 | lead | shipped |
| sakya-pandita | leadership | medieval / east_asia | strong | lead-robust | 5 | 0 lowered | 5 | 6 | 1 | lead | shipped |
| bernardino-de-sahagun | leadership | early_modern / latin_america | plausible | alt-dependent | 4 | 1 lowered | 4 | 7 | 1 | replacement | shipped |
| ishwar-chandra-vidyasagar | leadership | 19th_century / south_asia | plausible | alt-dependent | 7 | 4 lowered | 7 | 6 | 1 | replacement | shipped |
| david-hume | leadership | early_modern / western_europe | plausible | lead-robust | 12 | 4 lowered | 12 | 8 | 1 | replacement | shipped |
| arthur-schopenhauer | leadership | 19th_century / western_europe | plausible | lead-robust | 12 | 5 lowered | 12 | 7 | 1 | lead | shipped |
| wang-guowei | leadership | 20th_century / east_asia | plausible | alt-dependent | 9 | 3 lowered | 9 | 6 | 1 | lead | shipped |

## Preflight accuracy: viability and lead-image survival

| Grade | Frozen | Shipped | Held | Initial lead survived | Replacement portrait shipped |
|---|---|---|---|---|---|
| strong | 7 | 6 | 1 | 6 | 0 |
| plausible | 19 | 17 | 2 | 10 | 7 |
| risky | 4 | 2 | 2 | 2 | 0 |
| **all** | 30 | 25 | 5 | 18 | 7 |

Candidate-level viability with the holder-record rule predicted outcomes well: **strong 6/7 shipped,
plausible 17/19, risky 2/4**. **18 of the 25 shipped portraits (72%) are the initial lead; 7 (28%) are
replacement images** All 6 shipped
strong candidates kept their lead. Of the 14 lead-robust candidates 12 shipped (2 with replacement images: Bankim, Hume) and 2 were held
(Muteferrika, Ogino); of the 16 alternative-dependent candidates 13 shipped (5 with replacement images:
Kahanamoku, Joshi, Hiraga, Sahagun, Vidyasagar) and 3 were held (Garcilaso, Claudio Gay, Ho Xuan Huong).

**Why each strong/plausible hold overestimated viability:**
- *Ibrahim Muteferrika (strong)*: graded on the Rijksmuseum PDM/CC0 record (opened live) and the sitter
  named in the catalogue title. The plate's own lettering, read only at research time, names a different
  man. This is the Zeno pattern again, now caught by the new inscription rule before shipping rather than at
  lead review. Lesson for freeze: for pre-1800 prints, read the plate lettering at preflight, not at
  research.
- *Inca Garcilaso (plausible)*: a dated almanac print with a documented 1879 publication was treated as a
  sufficient route; Commons itself, the engraver and the Universidad de Piura all say the likeness is
  imagined. A documented publication fixes rights, not the sitter.
- *Ogino Ginko (plausible)*: graded on the NDL site-wide statement (the route that shipped Suzuki,
  Iwasaki, Ogai, Yosano, Nishida, Kano and Yasuda). The item record for this particular source book says
  rights undetermined. Lesson: open the NDL item record (rights code / PDM in the manifest) for each NDL
  Portraits image, not only the site statement.

**What made each risky ship succeed:** *Osman Hamdi Bey* - the Sotheby's catalogue page supplied the
dedication ("a Hamdy bey souvenir"), the date (1884), the artist and the scholarly citation that Commons
lacked, and the rights path does not depend on the auction house (painting by Emmanuel de Dieudonne,
died 1889, photographed flat). *Shitao* - the National Palace Museum record
(Zeng-hua 000114N000000000) states the scroll is a self-portrait signed and dated 1674 and offers a CC0
1-megapixel tier.

**Holder-record contradictions found after preflight (5):** David Hume (the Scottish National Gallery and
Art UK license the Ramsay image for personal/non-commercial use, contradicting the Commons PD tag ->
replaced by an NYPL Maurin lithograph lettered "DAVID HUME ESQr."), Bernardino de Sahagun (the INAH record
says CC BY-NC-ND 4.0, contradicting Commons CC BY-SA -> replaced by the lettered plate on p.375 of Iglehart
1887, Internet Archive), Nikolay Pirogov (the Tretyakov terms assert rights in the museum's own images ->
replaced by a Wellcome Public Domain Mark photomechanical print of the same 1881 Repin painting), Ogino
Ginko and Claudio Gay (both ended in holds). Holds resulting specifically from a holder contradiction: **2**
(Ogino, Gay). **Inscription/caption/sitter contradictions: 1 hold** (Muteferrika) **and 1 caught
metadata error without a hold**: the Commons file for Ignacy Domeyko cites volume 2, page 94 of Sokolowski,
but that page is a portrait of Jozef Goluchowski; the real plate is volume 3, page 94 captioned "IGNACY
DOMEYKO" (signed Kurowski); the caption's death year "1899" is a printing error for 1889. The sitter matched
and the plate was used. Two further lead images were replaced because the holder pages were walled
(loc.gov for Duke Kahanamoku -> Agence Rol negative with item-level "domaine public"; Gallica HTML pages).

## Exact structured handback totals (from the 30 per-candidate handback files)

- Initial rows scored by agents: **178** (shipped candidates 158, held candidates 20). Agent
  self-calibration lowered **37** rows (shipped 33, held 4); no row was added or removed by agents, so
  agent-final rows are also 178. **No agent raised a score or a confidence** (all 37 rows checked
  mechanically: new <= old for both fields; two rows lowered confidence only and kept the score). The
  exact rows with old -> new score / confidence:

  - ferenc-puskas: competitiveness 62/0.44 -> 60/0.4
  - ferenc-puskas: leadership_drive 64/0.5 -> 62/0.46
  - mungo-park: risk_tolerance 72/0.52 -> 70/0.48
  - mungo-park: achievement_drive 70/0.5 -> 66/0.46
  - ibrahim-muteferrika: proactive_agency 70/0.52 -> 66/0.48
  - ibrahim-muteferrika: persuasiveness 62/0.48 -> 58/0.44
  - matthew-boulton: opportunity_sensing 74/0.58 -> 70/0.52
  - matthew-boulton: persuasiveness 70/0.55 -> 70/0.5
  - richard-arkwright: systems_abstraction 72/0.58 -> 68/0.52
  - richard-arkwright: creative_originality 55/0.45 -> 55/0.4
  - kano-jigoro: impact_motivation 74/0.55 -> 72/0.5
  - kano-jigoro: persistence 70/0.5 -> 66/0.46
  - yasuda-zenjiro: discipline 62/0.42 -> 58/0.38
  - duke-kahanamoku: competitiveness 72/0.54 -> 68/0.5
  - duke-kahanamoku: decisiveness 66/0.48 -> 62/0.44
  - ignatius-sancho: curiosity 66/0.5 -> 62/0.45
  - inca-garcilaso-de-la-vega: aesthetic_sensitivity 72/0.52 -> 70/0.5
  - osman-hamdi-bey: aesthetic_sensitivity 72/0.55 -> 70/0.52
  - ahmad-shawqi: aesthetic_sensitivity 74/0.55 -> 72/0.52
  - bankim-chandra-chatterjee: creative_originality 78/0.62 -> 76/0.58
  - bankim-chandra-chatterjee: impact_motivation 68/0.52 -> 64/0.46
  - shitao: creative_originality 66/0.46 -> 62/0.42
  - ito-jakuchu: creative_originality 78/0.58 -> 74/0.54
  - mikhail-lomonosov: cross_domain_range 82/0.7 -> 80/0.66
  - mikhail-lomonosov: experimentation 78/0.64 -> 74/0.6
  - nikolay-pirogov: experimentation 82/0.68 -> 80/0.64
  - nikolay-pirogov: persistence 76/0.6 -> 74/0.56
  - nikolay-pirogov: creative_originality 76/0.58 -> 72/0.54
  - ignacy-domeyko: curiosity 72/0.58 -> 68/0.52
  - claudio-gay: curiosity 70/0.55 -> 66/0.48
  - saicho: conflict_tolerance 68/0.52 -> 64/0.46
  - sakya-pandita: analytical_rigor 76/0.48 -> 72/0.44
  - bernardino-de-sahagun: collaboration 74/0.55 -> 70/0.5
  - ishwar-chandra-vidyasagar: creative_originality 70/0.52 -> 64/0.46
  - david-hume: creative_originality 74/0.56 -> 70/0.52
  - arthur-schopenhauer: creative_originality 74/0.54 -> 70/0.5
  - wang-guowei: creative_originality 74/0.52 -> 70/0.48
- **Lead review (all 25 shipped candidates fully reviewed)** lowered **28 further rows in 11 candidates**
  (below) and **removed 0 rows**, so the final candidate files hold **178 rows** (shipped candidates 158,
  held candidates 20).
- Major Achievement gate, first pass, agent level: **0 failures in 150 checks** (30 candidates x 5
  checks). Lead Achievement corrections: **0** (the first card states the defining contribution for all
  25, verified on the rendered pages in both locales).

## Lead review

All first Achievement cards state the defining contribution. **Twenty-eight rows in eleven candidates were
lowered with `RUBRIC_CORRECTION` (downward only, before eligibility)**, concentrated in profiles whose
support is two or three retrospective encyclopedias (Hume, Schopenhauer), one author team (Pirogov), an
admiring early biography (Vidyasagar) or the institution of the person's own tradition (Kano):

| Candidate | Row | Old -> new (score / confidence) | Reason (summary) |
|---|---|---|---|
| matthew-boulton | persistence | 72 / 0.6 -> 68 / 0.54 | institutional biography, an archive page and the 1886 DNB all repeat the same standard account |
| kano-jigoro | creative_originality | 74 / 0.6 -> 70 / 0.54 | the support is the federation hall of fame, a results database and institutional histories of his own tradition, and the scholarly pieces are abstract-only |
| kano-jigoro | leadership_drive | 74 / 0.6 -> 70 / 0.54 | the support is committee, university and database pages that describe his offices rather than independent assessment |
| ito-jakuchu | detail_orientation | 78 / 0.6 -> 74 / 0.54 | the claim is read from the paintings by a curator, a heritage work page and encyclopedias, not from a documented working method |
| mikhail-lomonosov | proactive_agency | 76 / 0.6 -> 72 / 0.56 | the university history page and the encyclopedia carry the founding claim and the Soviet-era glorification is flagged by the scholars read |
| nikolay-pirogov | belief_updating | 74 / 0.58 -> 68 / 0.48 | the reluctance-then-adoption story rests on a single article by one author team |
| nikolay-pirogov | detail_orientation | 78 / 0.62 -> 74 / 0.56 | three of the sources are one author team and the independent bibliography entry is thin |
| nikolay-pirogov | proactive_agency | 76 / 0.62 -> 72 / 0.56 | the same author-team concentration; the Tsar and Red Cross episodes are unscored context |
| nikolay-pirogov | mastery_orientation | 76 / 0.6 -> 72 / 0.54 | the early-training evidence comes from one author team and the dictionary summary |
| ignacy-domeyko | persistence | 74 / 0.62 -> 70 / 0.56 | a scholarly tribute, the national library and the university's own pages are institutional and admiring |
| ignacy-domeyko | leadership_drive | 70 / 0.58 -> 66 / 0.52 | the rector evidence is the university's own page and the same national-library biography |
| bernardino-de-sahagun | persistence | 78 / 0.55 -> 74 / 0.5 | the long-labour claim leans on his own prologue (self-report) quoted by a scholar and a library press release |
| ishwar-chandra-vidyasagar | proactive_agency | 78 / 0.6 -> 74 / 0.56 | Banglapedia, EBSCO and an admiring 1902 biography prefaced by a friend all tell one standard story |
| ishwar-chandra-vidyasagar | autonomy_need | 74 / 0.55 -> 70 / 0.5 | the resignation episodes come from the admiring 1902 biography |
| ishwar-chandra-vidyasagar | mastery_orientation | 74 / 0.52 -> 70 / 0.48 | early-study evidence is the same admiring biography and encyclopedias |
| ishwar-chandra-vidyasagar | impact_motivation | 74 / 0.52 -> 70 / 0.48 | motive is read from an admiring biography and reference entries |
| david-hume | cross_domain_range | 80 / 0.66 -> 76 / 0.6 | three reference sources only, all retrospective, and no source examines how the range was built |
| david-hume | independent_thinking | 78 / 0.62 -> 74 / 0.58 | two scholarly encyclopedias and a general encyclopedia narrate the break from orthodoxy with no independent assessment of process |
| david-hume | persistence | 72 / 0.62 -> 68 / 0.56 | the continuing-despite-failure account leans on the Treatise legend and Adam Smith's admiring letter |
| david-hume | systems_abstraction | 76 / 0.6 -> 72 / 0.54 | a general encyclopedia and two reference works carry the claim, and Britannica itself judges the Treatise oversubtle |
| arthur-schopenhauer | conflict_tolerance | 82 / 0.66 -> 78 / 0.62 | the episodes are documented but the four sources are encyclopedias retelling the same few anecdotes, and the 1911 article colours them |
| arthur-schopenhauer | independent_thinking | 80 / 0.64 -> 76 / 0.6 | two scholarly encyclopedias and an admiring Society biographer; independence is read from outcome |
| arthur-schopenhauer | persistence | 78 / 0.64 -> 74 / 0.6 | the same reference-source concentration; the lecture failure and lawsuit are retold briefly |
| arthur-schopenhauer | discipline | 74 / 0.6 -> 70 / 0.54 | the daily-routine evidence is from an admiring biographer and an old encyclopedia |
| arthur-schopenhauer | systems_abstraction | 76 / 0.6 -> 72 / 0.54 | retrospective judgements of the system by encyclopedias rather than documented method |
| wang-guowei | cross_domain_range | 80 / 0.62 -> 76 / 0.58 | a university museum, an encyclopedia, a pupil's later lecture and a colleague's preface carry the breadth, all admiring |
| wang-guowei | aesthetic_sensitivity | 76 / 0.55 -> 72 / 0.5 | the support is an encyclopedia plus the pupil and the colleague, with no independent critic on the aesthetics |
| wang-guowei | adaptability | 74 / 0.56 -> 70 / 0.5 | two admiring sources describe the shift of fields; the reasons are inferred |

**Removed rows (separate from score lowerings): none.** Other lead decisions: Ignacy Domeyko's region set
to `latin_america` (career base Chile 1838-1889, Chilean citizen; the agent had chosen `central_europe`
by birthplace; Roster64's brief says to follow the career base); Ogino Ginko's stray `kind` field removed
from the held portrait record; Ogino's parked image kept outside the repository and not accepted. The
agent-made judgment calls kept: Pirogov's Wellcome print (a faithful photomechanical reproduction of a
painting by an artist who died in 1930, marked Public Domain by the holder; visible white scratches; kind
`likeness` because the 1881 painting is a documented sitting), Ito Jakuchu's small promotional photograph
(444x759, no holder rights statement, Beisen d.1906), Wang Guowei's 357x493 plate (publication in China
1927/1928, scan holder unknown), Osman Hamdi Bey (auction-house provenance, rights by age). No candidate
was lowered to reach or avoid a threshold, and no eligibility was consulted before the rows were frozen.

## Portrait review (25 shipped)

Each portrait was checked against its candidate record (sitter, **visible lettering**, creator, date,
provenance, underlying source, holder/item record, licence rationale and URL, attribution, dimensions, no
upscaling, kind) and rendered at 375x812 in both locales. Kinds (counted from the candidate files):
**likeness 10** (Puskas, Kano, Yasuda, Kahanamoku, Shawqi, Shitao, Pirogov, Joshi, Schopenhauer, Wang
Guowei), **historical_depiction 15** (Park, Boulton, Arkwright, Sancho, Osman Hamdi Bey, Bankim, Ito
Jakuchu, Lomonosov, Hiraga Gennai, Domeyko, Saicho, Sakya Pandita, Sahagun, Vidyasagar, Hume).
Visible lettering confirmed the sitter for Boulton (plate: "Matthew Boulton", "24th June 1787", "From a Wax
Medallion modelled from life"), Arkwright ("Sr Richard Arkwright", Wright/Smith 1801), Park ("Mr. M.
Park."), Sancho ("Ignatius Sancho." with the Gainsborough/Bartolozzi lettering), Shawqi (printed Arabic
caption), Lomonosov (printed caption), Pirogov (printed margin naming Pirogov and the Repin painting),
Sahagun ("BERNARDINO DE SAHAGUN."), Vidyasagar ("PANDIT ISWARA CHANDRA VIDYASAGARA."), Hume ("DAVID HUME
ESQr."), Hiraga Gennai (plate caption), Wang Guowei (plate caption), Yasuda (printed bilingual caption), Joshi
(book illustration list). Caveats carried in the candidate notes:
- No visible lettering, identity rests on the holder title: Puskas (Anefo frame, caption keyword), Saicho and
  Sakya Pandita (Met titles; Saicho's handback records the image-identity check as "ambiguous" because the Met image carries no lettering, the identification rests on the Met record), Schopenhauer (holder citation plus the documented 1859 Schafer sitting), Kano
  (handwritten signature only), Kahanamoku (BnF subject heading; other swimmers visible behind him).
- Boulton's image is an albumen photograph of a lifetime wax medallion, filed as `historical_depiction`.
- Kano, Yasuda and Ogino-style NDL items: photographer unknown, the basis is the NDL's explicit public-domain
  statement plus an early Japanese publication; Yasuda's source-book year was corrected from the preflight's
  1921 to 1910 and the image-to-book link is an inference recorded in the notes.
- Shitao: the NPM download buttons use a CAPTCHA (not bypassed); the image is the Commons reproduction of
  the figure detail; the self-portrait attribution is the holder's.
- Domeyko: the 1904 plate of an I. Kurowski 1832 watercolour (Radom Digital Library, "Domena Publiczna").

## Eligibility (computed only after all scores were frozen)

No rescue: after seeing results no row was added, no score or confidence raised, and nothing favourably
reinterpreted. `evaluateMatchEligibility()` (`eligibility_v2`: scored >= 18, coverage >= 0.6, high-
confidence subset) per shipped candidate (HC = rows at confidence >= the high-confidence threshold):

| Slug | Scored rows | Avg confidence | Coverage | HC count (conf >= 0.5; need 12) | HC average (need 0.55) | Eligible |
|---|---|---|---|---|---|---|
| ahmad-shawqi | 5 | 0.496 | 0.143 | 3 | 0.523 | no |
| anandibai-joshi | 5 | 0.490 | 0.153 | 3 | 0.527 | no |
| arthur-schopenhauer | 12 | 0.552 | 0.368 | 12 | 0.552 | no |
| bankim-chandra-chatterjee | 6 | 0.512 | 0.184 | 4 | 0.540 | no |
| bernardino-de-sahagun | 4 | 0.495 | 0.117 | 3 | 0.500 | no |
| david-hume | 12 | 0.549 | 0.366 | 12 | 0.549 | no |
| duke-kahanamoku | 5 | 0.472 | 0.147 | 2 | 0.520 | no |
| ferenc-puskas | 5 | 0.472 | 0.149 | 2 | 0.520 | no |
| hiraga-gennai | 4 | 0.495 | 0.117 | 2 | 0.525 | no |
| ignacy-domeyko | 7 | 0.527 | 0.213 | 6 | 0.538 | no |
| ignatius-sancho | 4 | 0.458 | 0.117 | 1 | 0.500 | no |
| ishwar-chandra-vidyasagar | 7 | 0.494 | 0.207 | 3 | 0.520 | no |
| ito-jakuchu | 6 | 0.522 | 0.185 | 5 | 0.530 | no |
| kano-jigoro | 6 | 0.500 | 0.188 | 4 | 0.535 | no |
| matthew-boulton | 6 | 0.513 | 0.180 | 5 | 0.532 | no |
| mikhail-lomonosov | 8 | 0.585 | 0.244 | 8 | 0.585 | no |
| mungo-park | 5 | 0.516 | 0.161 | 3 | 0.547 | no |
| nikolay-pirogov | 8 | 0.558 | 0.239 | 7 | 0.569 | no |
| osman-hamdi-bey | 8 | 0.501 | 0.232 | 4 | 0.537 | no |
| richard-arkwright | 7 | 0.510 | 0.210 | 5 | 0.550 | no |
| saicho | 5 | 0.492 | 0.153 | 3 | 0.533 | no |
| sakya-pandita | 5 | 0.432 | 0.143 | 0 | n/a | no |
| shitao | 4 | 0.400 | 0.117 | 0 | n/a | no |
| wang-guowei | 9 | 0.516 | 0.264 | 7 | 0.526 | no |
| yasuda-zenjiro | 5 | 0.452 | 0.147 | 1 | 0.520 | no |

**0 of 25 are match-eligible; the eligible set stays exactly 114** (asserted by the Roster65 audit: 114
eligible outside the 25 targets, 114 + 0 in total). Batch min / median / max over the 25: scored 4 / 6 / 12;
average confidence 0.400 / 0.500 / 0.585; coverage 0.117 / 0.180 / 0.368; HC count 0 / 3 / 12; HC average
0 / 0.530 / 0.585. The richest profiles (Hume and Schopenhauer, 12 rows) are still 6 rows short of the
18-row floor and far below the 0.6 coverage floor. Cumulative Roster33-65: **537 shipped, 0
match-eligible** (512 + 25).

## Counts and categories

| | Before (base) | After |
|---|---|---|
| Production | 737 | **762** |
| Directory-visible | 736 | **761** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 907 | **937** (+30 frozen candidates; 197 non-production research/holds = 192 + 5) |

Literal `categoryCounts.ts 65` output:

```
before roster65: {"production":737,"visible":736,"categoriesProduction":{"science_knowledge":300,"arts_culture":268,"leadership_society":132,"building_discovery":236},"categoriesVisible":{"science_knowledge":300,"arts_culture":268,"leadership_society":131,"building_discovery":235}}
after roster65:  {"production":762,"visible":761,"categoriesProduction":{"science_knowledge":312,"arts_culture":280,"leadership_society":139,"building_discovery":245},"categoriesVisible":{"science_knowledge":312,"arts_culture":280,"leadership_society":138,"building_discovery":244}}
```

Deltas +12 science, +12 arts, +7 leadership, +9 building = 40 memberships for 25 people, because a person
counts once in every category containing any of their `fieldIds` (15 extra memberships from 13
multi-category people). Person-by-person reconciliation, read from the live `PROFESSION_CATEGORIES`
mapping on the 25 shipped records:

| Category | Delta | People |
|---|---|---|
| science_knowledge | +12 | Joshi, Schopenhauer, Sahagun, Hume, Hiraga Gennai, Domeyko, Boulton, Lomonosov, Pirogov, Saicho, Sakya Pandita, Wang Guowei |
| arts_culture | +12 | Shawqi, Schopenhauer, Bankim, Hume, Hiraga Gennai, Sancho, Vidyasagar, Ito Jakuchu, Lomonosov, Osman Hamdi Bey, Shitao, Wang Guowei |
| leadership_society | +7 | Sahagun, Domeyko, Vidyasagar, Kano, Osman Hamdi Bey, Saicho, Sakya Pandita |
| building_discovery | +9 | Kahanamoku, Puskas, Hiraga Gennai, Domeyko, Kano, Boulton, Park, Arkwright, Yasuda |

Multi-category: Hiraga Gennai and Domeyko (3 categories each); Schopenhauer, Sahagun, Hume, Vidyasagar,
Kano, Boulton, Lomonosov, Osman Hamdi Bey, Saicho, Sakya Pandita and Wang Guowei (2 each). The
single Zheng He production-vs-visible gap in leadership and building is unchanged (132 vs 131 and 236 vs 235
before; 139 vs 138 and 245 vs 244 after). No unreconciled change.

## 750-checkpoint determination (the crossing)

Starting production 737 + 25 shipped = **762 >= 750: the planned ~750 scale checkpoint trigger is reached**
(by 12). The repository precedent at the 500 crossing is explicit: the crossing roster completes and merges
normally, then roster expansion stops and hands off to the checkpoint, which is a measurement-only task run
against the merged production state. Therefore, in this branch:
- **The ~750 checkpoint was not run, started or partly done** (no performance benchmark, Directory
  virtualization decision or re-measurement was mixed in).
- **The shipped count was not adjusted**: no legitimate candidate was held to avoid overshooting, and none
  was shipped to reach 750. The 25 shipped / 5 held outcome follows the portrait and evidence gates alone.
- **Expansion must pause once this PR merges.** No Roster66 is started or planned; the next task is the
  separate ~750 measurement checkpoint (`docs/checkpoints/500-person-performance.md` is the template; its
  open items were "re-measure at about 750" and "watch Directory virtualization at 750").

## Validation

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: **0 errors, 0 warnings** across 937 candidate files (759 evidence_approved,
  93 qa_passed, 85 held).
- Roster65 audit (`roster65.test.ts`): passes (candidate<->production equality for the 25 shipped, absence
  of all 5 holds and all earlier holds from production, the four portrait holds `evidence_approved` with
  `portrait.status: held`, Ho Xuan Huong and Laozi `held` on evidence with zero rows, identity integrity: no
  shipped person matches any OTHER production person by slug, normalized name, alias, token set or QID, no
  held candidate matches production, global uniqueness of ids, slugs and non-null QIDs).
- Full Vitest: **7873 passed / 7873, 95 files**.
- Calibration (`calibrate.ts quiz`) run twice: output identical, `meanSd=11.704`, eligible set identical
  (114), generated `dispersion.generated.ts` blob hash `73e03834...` both times and equal to HEAD (the only
  working-tree difference is line-ending noise, restored). Not tuned.

## Final build

`next build --webpack` exit 0, run after the last production-visible change: **Generating static pages
using 21 workers (1548/1548)**. Formula check `2 x production_count + 24 = 2 x 762 + 24 = 1548` holds.

## Playwright

Final focused suite (Person, Editorial, Directory, Compare, Trait Explanation: `person.visual`,
`editorial`, `peopleDirectory`, `compare.visual`, `traitExplanation`, `--workers=1`) after the last
user-visible change: **first run 142 passed (3.6 min), 0 failures.** No count-sensitive Directory
assertion moved this cycle (none of the 25 newly crosses both the curiosity and collaboration
thresholds). The whole 286-spec suite was **not** run (optional/diagnostic); only the focused suite is
claimed.

## Local QA

- Production-built server on a local port: all 25 shipped people return **EN 200, KO 200, portrait 200**
  (portrait URL read from each rendered page's `<img src>`); all 5 holds return **404 in both locales**
  (10/10 checks).
- 375x812 sweep in both locales (50 page loads): **0 horizontal overflow** (max `scrollWidth` 375), **0
  broken images**, **0 console errors**, **0 raw internal ids**, every page shows a portrait and a credit
  line, **Korean names render** (e.g. 푸슈카시 페렌츠, 석도, 사이초, 사캬 판디타, 데이비드 흄, 왕궈웨이), and the
  **first Achievement card renders in both locales for all 25**.
- Source-link sweep: 193 unique source URLs across the 25 shipped candidates: 176 returned 200; 13 returned
  403 and 4 returned 429 (Britannica x8, Mises, Gallica HTML, Academia, Princeton Art Museum, two Tsadra
  wikis, National Galleries Scotland, Met and Wellcome web pages), all bot walls on pages the research agents
  opened and read through APIs or alternative records, **not broken links; no URL was changed**.

## Defects

- Ignacy Domeyko's region (agent chose `central_europe`; corrected to `latin_america`, career base).
- Preflight facts corrected by research: Yasuda's dictionary year (1910, not 1921); Domeyko's Commons file
  cites the wrong page (above); Duke Kahanamoku's LoC lead replaced because loc.gov is walled.
- One shipped-candidate stray `kind` field on a held portrait record (Ogino), removed.
- Agent interruptions: two usage-limit episodes and one session restart interrupted several agent runs;
  nothing was lost (progress was saved after every step and groups were resumed from disk).
- No defect in product code. No agent raised a score. No benchmark, rescue, Legacy Batch 6 or optional
  checkpoint work was triggered.

## Deferred work and state

- The 5 holds stay researched and unpromoted (blockers and next steps above).
- **The ~750 scale checkpoint is due as a separate measurement-only task after this PR merges; expansion
  pauses until then. Roster66 not started.**

## Post-commit scoring lock

Implementation commit `7163103` (`Roster65: 25 freshly researched people shipped, 5 held (737 -> 762)`),
clean tree before and after. `checkScoringLockIntegrity.ts` output:

```
Checked 937 previously-committed candidate file(s) against HEAD. 0 flagged.
Legacy scoring lock: 22 pre-pipeline production people covered, 0 flagged.
```

Committed = on-disk = checked (937 files), 0 unresolved genuine flags (candidate or legacy). Every downward
lead correction carries `RUBRIC_CORRECTION` in its row rationale and in `provenance.notes`; the Müteferrika
inscription hold and the Ogino and Gay holder-record holds are documented in the same notes.
