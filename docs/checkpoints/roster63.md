# Roster63 checkpoint (2026-11-04)

Ninth 30-candidate batch after the 500-person scale checkpoint (EXPANSION_GREEN), twenty-eighth
fresh new-candidate cycle after the recent-cohort diagnostic, and the third cycle selected from a
portrait-preflighted pool (the second to grade **candidate-level** portrait viability). Outcome:
**30 frozen, 21 shipped, 9 held** (8 on portrait rights, 1 on evidence), production **692 -> 713**,
directory-visible **691 -> 712**, match-eligible **114 (unchanged, 0 of 21 eligible)**. No portrait,
rights, evidence, scoring, publication or eligibility standard was relaxed.

- `ROSTER63_BASE_SHA` = `036ffde33ff604bf796fffbfbb765d91b6c37c7e`, the normal merge of PR #75
  (Roster62) into `main` (parents `ce1eacacbf3b1345b55ce7e0bb17b36d7a06e7a7` and
  `21ef2f33cffd954f21af57c357be3b6855551ed1`).
- Branch `feat/roster63`; PR against `main` (not merged, by instruction).

## PR #75 merge (Roster62)

Mechanical guards, all passing before the merge: PR open, not draft, `mergeable` / `CLEAN`, base
exactly `ce1eacac...`, head exactly `21ef2f33...`, 0 behind base, Vercel `SUCCESS` and `Ready` on the
exact head, 0 review threads, only the two reviewed commits, and the only comment was the Vercel
bot's informational notice (`nextCommitStatus: DEPLOYED`). Merged with a normal merge commit guarded
on the expected head SHA (no squash, no rebase).

## Roster62 production verification (deployment SHA = merge SHA)

- 25/25 shipped Roster62 people: EN route 200, KO route 200; 25/25 portrait URLs (read from each
  live page's `<img src>`) 200.
- All 5 Roster62 holds (Li Qingzhao, Mohammed Abdel Wahab, Su Song, Jyotirao Phule, Francisco Moreno)
  return 404 in both locales.
- Directory shows "691 people".
- Starting counts: production **692**, directory-visible **691**, match-eligible **114**, candidate
  JSON **847** (177 non-production files).
- Canonical `categoryCounts.ts` at the base, reconciled with the Roster62 checkpoint (production
  275 / 252 / 125 / 222; the single Zheng He production-vs-visible gap sits in leadership and
  building, unchanged):

```
current: {"production":692,"visible":691,"categoriesProduction":{"science_knowledge":275,"arts_culture":252,"leadership_society":125,"building_discovery":222},"categoriesVisible":{"science_knowledge":275,"arts_culture":252,"leadership_society":124,"building_discovery":221}}
```

## Pool, identity gate, backlog

- **Proposed pool: 117** (building 28, arts 31, science 29, leadership 29): 44 unfrozen names from
  the Roster62 pool re-gated, plus 73 new names. The new names were chosen against an easy-portrait
  bias and against Western/contemporary concentration (ancient to contemporary; Africa, the Middle
  East, East, South and West Asia, Latin America), then trimmed from a 179-name clean set to 117 for
  group balance and the zero politics/military/activism-primary composition rule.
- **Identity gate** (`identityGate.ts`, `--json`, machine-readable output kept, whole proposal input
  of **251** names with live-verified Wikidata QIDs, against all 692 production people including legacy
  people without QIDs): **35 hard duplicates rejected before freeze** (slug, normalized name, alias,
  token set or QID: e.g. Tenzing Norgay, Junko Tabei, Abebe Bikila, Jim Thorpe, Grace Hopper,
  Charles Babbage, Hafez, Du Fu, Murasaki Shikibu, Immanuel Kant, Baruch Spinoza, Adi Shankara, John
  Dewey, Maria Montessori, Roald Amundsen, Ernest Shackleton - my first-guess "famous names" were
  mostly already in production, which is itself a useful finding) and **2 review-tier matches**.
- **Review-tier adjudication (persisted in `dispositions63.json`, scratchpad):**
  - `kiichiro-toyoda` vs production `sakichi-toyoda`: **different_person** (Kiichiro, 1894-1952,
    founder of Toyota Motor Corporation, is the son of Sakichi, 1867-1930, loom inventor; shared
    surname only, distinct QIDs). Retained in the pool; not frozen.
  - `saadi` vs production `hafez`: **different_person** (Saadi c.1210-1291, Gulistan/Bustan; Hafez
    1325-1389, Divan; "Shirazi" is a toponym only; Q170302 vs Q6240). Retained; Saadi was frozen.
  - No `uncertain` dispositions, so nothing was blocked.
- **Backlog exclusion**: all 177 non-production candidate files compared by slug, QID, canonical
  name and alias against the 251 probes: **37 hits, all excluded and none reopened** (no genuinely new
  concrete signal resolving a previous blocker existed for any): Claude Shannon, Nain Singh Rawat,
  Amrita Sher-Gil, Heitor Villa-Lobos, Shen Kuo, Carlos Chagas, Adam Smith, Al-Ghazali, Kabir, Henry
  Royce, Garrincha, Dhyan Chand, Zeami (as `zeami-motokiyo`), Mirza Ghalib, Premchand, Ferdowsi,
  Clarice Lispector, Caravaggio, Bela Bartok, Dante, Zhang Heng, Al-Razi, Al-Zahrawi, Ibn al-Nafis,
  Nasir al-Din al-Tusi, Nikolai Vavilov, Satyendra Nath Bose, Salim Ali, Bernardo Houssay, Luis
  Leloir (as `luis-federico-leloir`), Dogen, Al-Farabi, Ibn Arabi, Al-Kindi, Sayyid Ahmad Khan, Simone
  Weil, Paulo Freire. No production QID collision.

## Candidate-level portrait viability preflight

For every identity-clean pool candidate the scan pulled all Wikidata image claims and a Commons file
search (licence, author, date, size) so alternatives were visible, not only the first P18 file. The
pool-wide screen is **automated and permissive** (it counts files with a PD/CC licence and a named
creator or date), so only the frozen 30 carry meaningful grades. For the frozen 30 the lead's
rights basis was then checked at the source where a source could be opened: Rijksmuseum linked-art
records (Barth, Mendelssohn: Public Domain Mark + CC0), the Cleveland Open Access API (Morphy: CC0),
the Met Open Access API (Zhao Mengfu copy portrait: `isPublicDomain`), the live Flickr page (Dibaba:
CC BY-SA 2.0), Commons wikitext for the remainder. The frozen-grade reasoning recorded for each
record is the initial lead, creator/date, rights basis, alternative paths and likely failure mode in
`frozen63.json` (scratchpad); the per-candidate outcome is in the tables below.

## ROSTER63_FROZEN_30

Declared after the identity gate, review adjudication, backlog exclusion, candidate-level preflight
and portfolio / region balancing; immutable afterwards, no substitution. Portfolio **8 building / 8
arts / 7 science / 7 leadership-society**.

**Frozen preflight composition: strong 13, plausible 10, risky 7.** Target (>=10 strong, >=12 plausible,
<=8 risky): strong and risky **met**; plausible **short by 2** because two lower-grade records were
kept for coverage (Saadi for West Asia, Tarsila do Amaral for Latin America, both risky) rather than
swapped for easier plausible names, and the target is a selection aid, not a reason to distort the
roster. Per-group strong+plausible: building 7, arts 6, science 5, leadership 5 (goal >=4 each,
achieved). **Lead dependence recorded at freeze: 14 lead-robust, 16 alternative-dependent.**
Frozen regional mix: Western Europe 11, East Asia 7, Central Europe (incl. Russia) 4, North America
3, South Asia 2, sub-Saharan Africa 1, West Asia 1, Latin America 1. Seven of the 30 were born before
1700 (Laozi, Zhu Xi, Saadi, Zhao Mengfu, Chaucer, Bruegel, Tasman).

## Ship / hold result

**Shipped (21)** - building 7: Heinrich Barth, Paul Morphy, Tirunesh Dibaba, Thomas Telford, Iwasaki
Yataro, Rene Caillie, Eric Liddell. Arts 7: Pieter Bruegel, Scott Joplin, Geoffrey Chaucer, Zhao
Mengfu, Mori Ogai, Leos Janacek, Saadi. Science 5: Hendrik Lorentz, August Kekule, Caroline Herschel,
Evariste Galois, Umetaro Suzuki. Leadership 2: Zhu Xi, Moses Mendelssohn.

**Held (9)**: research, candidate JSON kept, not in the generator allowlist, not in production.
Eight are held on portrait (status `evidence_approved`, `portrait.status: held`); **Laozi is held on
evidence** (status `held`).

| Hold | Grade | Blocker | Next step |
|---|---|---|---|
| abel-tasman | risky | the c.1637 Cuyp family portrait is public domain by age but whether it shows Tasman is disputed (ADB "supposed portraits", Cambridge UL "alleged likenesses", Mack 2019); the only single-figure print has no openable institutional record | read Mack 2019 / the NLA catalogue note, or find a dated institution-held print with a catalogue record |
| tarsila-do-amaral | risky | the lead (c.1925 O Estado de S. Paulo photo) has an unknown author and a jurisdiction-only tag; Arquivo Nacional photos have unknown photographers and a generic government tag (still protected in Brazil in 1996); the lead's Museu Paulista "alternatives" are paintings of other sitters | dated photo by a named photographer who died before 1955, an item-level terms page, or an estate licence |
| ivan-sechenov | plausible | Repin's 1889 oil (Repin d.1930) is public domain, but goskatalog.ru refused the connection and the Tretyakov item pages returned 502, so no institutional usage statement was read | read the Tretyakov item page and its image-reuse terms; if they allow reuse of images of public-domain works, use it (kind likeness) |
| birbal-sahni | risky | no portrait photograph on any openable page; the 1951 Government of India Photo Division lead could not be found and an Indian-published photo of that date would be URAA-restored; Commons images are photographs of busts (derivative sculpture); Hunt Institute prints are copyright "unknown"; Royal Society and BSIP portraits carry their own copyright | pre-1931 British-published photo with an item-level date, or written terms from BSIP or the Royal Society |
| charles-sanders-peirce | **strong** | the lead (Sarony 1891, NYPL) is a "Clippings" file item with no photographer or date and a rights statement that NYPL "was unable to make a conclusive determination"; the Sarony/1891 attribution exists only on the Commons uploader's page citing a Britannica credit; the NOAA, Menand-scan and Johns Hopkins alternatives all fail | item-level rights statement and photographer from Houghton or the Texas Tech Peirce collection |
| laozi | plausible | **held on evidence, not on portrait**: no behaviour is attributable to a historical individual (SEP: Shiji biography of questioned reliability; IEP: Zhuangzi accounts "probably fictional"; the Daodejing is a composite anthology), so every trait row would be inferred from doctrine or legend. Zero scored rows; a rights-clear NPM CC0 portrait was found and is preserved in `portrait.reason` (file removed at cleanup) | none planned; reopen only if the product allows a figure card without trait rows |
| ramakrishna | plausible | the Oct 1885 photograph and its attribution to Abinash Chandra Dey are documented only on a retouched devotee-website copy with generic PD templates; the one dated pre-1931 print (1930 Advaita Ashrama Rolland plate) is a degraded scan not confirmed to show the same photograph | a clean scan of a dated pre-1931 plate visibly matching the chosen photograph |
| lev-vygotsky | risky | the c.1925 lead's source is a health-website biography with no creator or date; alternatives are group photos with unknown photographers, a 1923 print first published in 1996, an unverifiable CC BY-SA copy and uncredited marxists.org images | pre-1931 printed portrait, or an archive page (e.g. the Gomel museum) stating photographer, date and terms |
| okakura-kakuzo | risky | the c.1905 Tenshin Memorial Museum photo has an unknown photographer and only a Commons Japanese-old-photo template; the Gardner Museum c.1904 photo carries a (c) 2017 museum notice; the MFA Bulletins contain no portrait | pre-1931 print with a credit, or written terms from the Tenshin Memorial Museum or the Izura institute |

### Per-candidate table

Agent rows = rows scored before agent self-calibration; lead review = lead rows lowered with
`RUBRIC_CORRECTION` (and rows removed); final rows = rows in the candidate file now; agent-lowered =
rows the agent lowered at self-calibration; final portrait = whether the shipped image is the
initial lead (including the same image from a better source) or a different replacement image.

| Slug | Group | Era / region | Preflight | Lead dependence | Agent rows | Lead review | Final rows | Sources | Agent-lowered | Final portrait | Outcome |
|---|---|---|---|---|---|---|---|---|---|---|---|
| heinrich-barth | building | 19th_century / western_europe | strong | lead-robust | 8 | 0 lowered | 8 | 7 | 1 | lead | shipped |
| paul-morphy | building | 19th_century / north_america | strong | lead-robust | 4 | 0 lowered | 4 | 6 | 1 | lead | shipped |
| tirunesh-dibaba | building | contemporary / sub_saharan_africa | strong | lead-robust | 5 | 0 lowered | 5 | 8 | 1 | lead | shipped |
| thomas-telford | building | 19th_century / western_europe | plausible | lead-robust | 6 | 1 lowered | 6 | 9 | 1 | lead | shipped |
| iwasaki-yataro | building | 19th_century / east_asia | plausible | lead-robust | 6 | 2 lowered | 6 | 8 | 1 | lead | shipped |
| rene-caillie | building | 19th_century / western_europe | plausible | alt-dependent | 6 | 1 lowered | 6 | 7 | 1 | replacement | shipped |
| eric-liddell | building | 20th_century / western_europe | plausible | alt-dependent | 5 | 0 lowered | 5 | 9 | 1 | replacement | shipped |
| abel-tasman | building | early_modern / western_europe | risky | alt-dependent | 4 | 0 lowered | 4 | 6 | 1 | none | **held** |
| pieter-bruegel | arts | early_modern / western_europe | strong | lead-robust | 3 | 0 lowered | 3 | 7 | 1 | lead | shipped |
| scott-joplin | arts | 20th_century / north_america | strong | alt-dependent | 6 | 0 lowered | 6 | 8 | 2 | lead | shipped |
| geoffrey-chaucer | arts | medieval / western_europe | strong | lead-robust | 4 | 0 lowered | 4 | 7 | 1 | lead | shipped |
| zhao-mengfu | arts | medieval / east_asia | strong | alt-dependent | 3 | 0 lowered | 3 | 6 | 2 | lead | shipped |
| mori-ogai | arts | 20th_century / east_asia | plausible | lead-robust | 6 | 1 lowered, 1 removed | 5 | 10 | 1 | lead | shipped |
| leos-janacek | arts | 20th_century / central_europe | plausible | lead-robust | 5 | 2 lowered | 5 | 8 | 1 | lead | shipped |
| saadi | arts | medieval / west_asia | risky | alt-dependent | 3 | 0 lowered | 3 | 6 | 0 | replacement | shipped |
| tarsila-do-amaral | arts | 20th_century / latin_america | risky | alt-dependent | 8 | 0 lowered | 8 | 9 | 1 | none | **held** |
| hendrik-lorentz | science | 20th_century / western_europe | strong | lead-robust | 5 | 1 lowered | 5 | 8 | 1 | lead | shipped |
| august-kekule | science | 19th_century / western_europe | strong | lead-robust | 4 | 1 lowered | 4 | 7 | 1 | replacement | shipped |
| caroline-herschel | science | early_modern / western_europe | strong | alt-dependent | 5 | 0 lowered | 5 | 7 | 0 | lead | shipped |
| evariste-galois | science | 19th_century / western_europe | plausible | alt-dependent | 5 | 0 lowered | 5 | 7 | 1 | replacement | shipped |
| ivan-sechenov | science | 19th_century / central_europe | plausible | lead-robust | 5 | 0 lowered | 5 | 5 | 2 | none | **held** |
| umetaro-suzuki | science | 20th_century / east_asia | risky | alt-dependent | 5 | 0 lowered | 5 | 7 | 1 | replacement | shipped |
| birbal-sahni | science | 20th_century / south_asia | risky | alt-dependent | 7 | 0 lowered | 7 | 6 | 1 | none | **held** |
| zhu-xi | leadership | medieval / east_asia | strong | lead-robust | 4 | 0 lowered | 4 | 6 | 1 | lead | shipped |
| moses-mendelssohn | leadership | early_modern / central_europe | strong | lead-robust | 6 | 1 lowered | 6 | 7 | 1 | lead | shipped |
| charles-sanders-peirce | leadership | 19th_century / north_america | strong | alt-dependent | 6 | 0 lowered | 6 | 6 | 1 | none | **held** |
| laozi | leadership | ancient / east_asia | plausible | alt-dependent | 0 | 0 lowered | 0 | 5 | 0 | none | **held** |
| ramakrishna | leadership | 19th_century / south_asia | plausible | alt-dependent | 4 | 0 lowered | 4 | 5 | 1 | none | **held** |
| lev-vygotsky | leadership | 20th_century / central_europe | risky | alt-dependent | 5 | 0 lowered | 5 | 6 | 1 | none | **held** |
| okakura-kakuzo | leadership | 20th_century / east_asia | risky | alt-dependent | 5 | 0 lowered | 5 | 6 | 1 | none | **held** |

## Preflight accuracy: viability and lead-image survival

| Grade | Frozen | Shipped | Held | Initial lead survived | Replacement portrait shipped |
|---|---|---|---|---|---|
| strong | 13 | 12 | 1 | 11 | 1 |
| plausible | 10 | 7 | 3 | 4 | 3 |
| risky | 7 | 2 | 5 | 0 | 2 |
| **all** | 30 | 21 | 9 | 15 | 6 |

Candidate-level viability predicted the outcome well for strong and well for risky, and the plausible
grade carried the evidence-viability miss: **strong 12/13 shipped, plausible 7/10, risky 2/7**. **15
of the 21 shipped portraits (71%) are the initial lead** (Roster62: 9 of 25, 36%) and only **6 (29%)
are replacement images** (Roster62: 64%): this pool leaned on print/portrait routes with item-level
open records (Rijksmuseum, Cleveland, Met, NPM open data, NDL) rather than on Commons leads that had to
be replaced. **13 of the 14 lead-robust candidates shipped** (only Sechenov was held); of the 16
alternative-dependent candidates 8 shipped (6 of them with replacement images) and **8 of the 9 holds**
came from that group, so "a weak first lead with a hoped-for alternative path" is again where
viability was overestimated or where risky grades were borne out.

**Why each strong/plausible hold overestimated viability:**
- *Peirce (strong)*: the lead was graded on Commons attribution ("Napoleon Sarony 1891", NYPL) without
  opening the NYPL record. The NYPL item is an undated, uncredited "Clippings" portrait-file entry whose
  own rights statement says no conclusive determination was made; the Sarony/1891 facts came from a
  Commons uploader citing a Britannica credit. Lesson: when Commons names a photographer and year, open
  the holder's item record before grading strong.
- *Sechenov (plausible)*: grading assumed a Repin painting from a Russian state collection would have a
  readable holder statement; the catalogue and Tretyakov pages were unreachable, so no institutional
  usage wording could be read (no restriction was found either).
- *Ramakrishna (plausible)*: "taken 1885" was graded as a basis; the date and photographer exist only on
  a devotee-website copy, and the missing first-publication date is the real blocker.
- *Laozi (plausible)*: the portrait was fine (NPM CC0); the miss was evidence viability. A
  semi-legendary figure with no attributable behaviour should have failed a pre-freeze evidence screen;
  portrait preflight alone cannot catch this. Future preflights should add a one-line "is there any
  behavioural evidence attributable to a historical individual?" check for ancient, semi-legendary and
  scriptural figures.

**What made each risky ship succeed:** *Saadi* - the lead (a multi-figure Per 119.3 scene) was dropped
for a two-figure folio of the same 1427 Herat manuscript whose holder title names the poet, and the
Chester Beatty live Copyright page states CC BY 4.0 as the default for the collection. *Umetaro Suzuki* -
the unknown-author Commons poster crop was replaced by the National Diet Library's "Portraits of Modern
Japanese Historical Figures" image from a 1942 book, under the NDL site-wide statement that every image
in the exhibition is public domain and reusable.

**Replacement discoveries (6):** Kekule (the lead, a Science History Institute record, was a classroom
painting rather than a portrait; replaced by a Smithsonian Libraries Dibner plate made before 1896),
Caillie (Rijksmuseum RP-P-OB-42.949 Public Domain print replaces the Societe de Geographie lead after the
Roster62 Moreno lesson), Liddell (a single-subject Agence Rol photo whose Gallica OAI record states
"domaine public" and names Liddell replaces a winners' group photograph), Galois (the 1826 portrait
drawn from life, first published in Dupuy 1896, replaces the brother's 1848 sketch drawn from memory),
Saadi and Suzuki (above).

**Preflight miscalibrations noted (standards unchanged):** (1) a lead graded "photograph" can be a
painting (Lorentz: the holder record shows an oil by Menso Kamerlingh Onnes, kind corrected to
historical_depiction); (2) a Commons-only attribution is not a record (Peirce); (3) a sibling-collection
transfer worked when the sibling is the same album under the same open-data tier (Zhu Xi from the NPM
album that shipped Mencius) and failed where the collections differed (Moreno, Roster62); (4) Commons source
links to museum pages can be dead (NGA) and Gallica HTML pages, loc.gov and several museum viewers are
bot-blocked, so OAI / SRU / IIIF-manifest / JSON records are the reliable reading route.

## Exact structured handback totals (from the 30 per-candidate handback files)

- Initial rows scored by agents: **148** (shipped candidates 104, held candidates 44). Agent
  self-calibration lowered **30** rows (shipped 21, held 9), about one row per candidate (30 of 148
  rows, so not a blanket cap); no row
  was added or removed by agents, so agent-final rows are also 148. The exact rows with old -> new
  score / confidence:

- heinrich-barth: detail_orientation 78/0.68 -> 74/0.64
- paul-morphy: deep_focus 70/0.52 -> 66/0.48
- tirunesh-dibaba: discipline 66/0.48 -> 62/0.44
- thomas-telford: impact_motivation 66/0.54 -> 62/0.48
- iwasaki-yataro: achievement_drive 72/0.52 -> 66/0.45
- rene-caillie: adaptability 70/0.52 -> 66/0.45
- eric-liddell: conflict_tolerance 62/0.55 -> 58/0.48
- abel-tasman: curiosity 40/0.5 -> 40/0.42
- pieter-bruegel: creative_originality 64/0.52 -> 60/0.48
- scott-joplin: creative_originality 76/0.62 -> 72/0.58
- scott-joplin: risk_tolerance 62/0.52 -> 58/0.46
- geoffrey-chaucer: creative_originality 70/0.55 -> 66/0.5
- zhao-mengfu: creative_originality 70/0.52 -> 66/0.5
- zhao-mengfu: mastery_orientation 72/0.52 -> 68/0.48
- mori-ogai: creative_originality 70/0.54 -> 66/0.5
- leos-janacek: creative_originality 78/0.6 -> 74/0.55
- tarsila-do-amaral: aesthetic_sensitivity 72/0.56 -> 68/0.5
- hendrik-lorentz: collaboration 76/0.64 -> 72/0.58
- august-kekule: creative_originality 74/0.6 -> 70/0.54
- evariste-galois: systems_abstraction 70/0.5 -> 64/0.44
- ivan-sechenov: persistence 66/0.5 -> 62/0.46
- ivan-sechenov: impact_motivation 68/0.52 -> 64/0.46
- umetaro-suzuki: impact_motivation 70/0.5 -> 64/0.45
- birbal-sahni: proactive_agency 76/0.58 -> 70/0.5
- zhu-xi: persistence 60/0.45 -> 56/0.4
- moses-mendelssohn: independent_thinking 64/0.5 -> 60/0.44
- charles-sanders-peirce: independent_thinking 80/0.62 -> 76/0.56
- ramakrishna: impact_motivation 60/0.46 -> 56/0.4
- lev-vygotsky: creative_originality 72/0.54 -> 70/0.5
- okakura-kakuzo: leadership_drive 68/0.52 -> 64/0.48
- **Lead review (all 21 shipped candidates fully reviewed)** lowered **10 further rows** and **removed
  1 row** (below), so the final candidate files hold **147 rows** (148 - 1): shipped candidates 104 - 1 =
  **103**, held candidates 44.
- Major Achievement gate, first pass, agent level: **0 failures in 150 checks** (30 candidates x 5
  checks: primary, top omission, identity, significance over novelty, side project). Lead Achievement
  corrections: **0** (the first card states the defining contribution for all 21, verified on the
  rendered pages in both locales; Telford's second card keeps the canal cost overrun, Tasman is held).

## Lead review

All first Achievement cards state the defining contribution. **Ten rows in eight candidates were
lowered with `RUBRIC_CORRECTION` (downward only, before eligibility):**

| Candidate | Row | Old -> new (score / confidence) | Reason (summary) |
|---|---|---|---|
| thomas-telford | planning_orientation | 74 / 0.58 -> 66 / 0.5 | the Caledonian Canal took twelve years and cost 910,000 pounds against a plan of seven years and 474,000, so planning is dual-edged, and the praise comes from an admiring Victorian biography and an institutional profile |
| iwasaki-yataro | competitiveness | 74 / 0.56 -> 70 / 0.52 | almost all of the evidence is in company-published histories and only one non-company source is critical |
| iwasaki-yataro | leadership_drive | 70 / 0.52 -> 66 / 0.48 | the evidence is company-published history and a business-reference entry, with no independent biography |
| rene-caillie | risk_tolerance | 78 / 0.64 -> 74 / 0.58 | the concrete episodes of the disguise and the crossing come mainly from his own published narrative, which independent sources confirm only in outline |
| mori-ogai | cross_domain_range | 80 / 0.66 -> 76 / 0.62 | the range is documented but the supporting sources are concentrated in admiring institutional portals (NDL, the HU Berlin Ogai Portal, a press profile) |
| leos-janacek | persistence | 76 / 0.62 -> 72 / 0.58 | most sources are promotional institutional biographies (festival, opera houses, orchestra) with a single scholarly paper |
| leos-janacek | curiosity | 74 / 0.6 -> 70 / 0.54 | the same institutional concentration; the scholarly paper supports the speech-melody study but not the breadth implied |
| hendrik-lorentz | analytical_rigor | 80 / 0.64 -> 76 / 0.6 | the support is the Nobel Foundation biography and Leiden-side admiring histories, and no independent source assesses his working method |
| august-kekule | systems_abstraction | 76 / 0.6 -> 72 / 0.56 | the evidence is the retrospective significance of the structural theory in encyclopedia and institutional biographies, and the priority with Couper is shared |
| moses-mendelssohn | curiosity | 70 / 0.52 -> 66 / 0.46 | the early-study anecdotes come from an admiring 1906 biography and an old encyclopedia, with little modern corroboration |

**One row removed (not a score change):** `mori-ogai` `belief_updating` (40 / 0.40, inference). It scored a
contested episode of army ration policy whose personal responsibility the sources dispute, which cannot
be separated from the zero politics/military rule; the remaining five rows (cross_domain_range now 76 /
0.62) are unaffected. **Other lead corrections:** `moses-mendelssohn` era `18th_century` is not in the
Era vocabulary and was corrected to `early_modern` (TypeScript caught it; precedent Hegel, Comenius,
Huygens); `august-kekule` Korean display name shortened from the long Wikidata label
(프리드리히 아우구스투스 케쿨레 폰 슈트라도니츠) to 아우구스트 케쿨레. No candidate was lowered to
reach or avoid a threshold, and no eligibility was consulted before the rows were frozen.

## Portrait review (21 shipped)

Each portrait file was checked against its candidate record (sitter, creator, date, provenance,
underlying source, rights holder, licence rationale and URL, attribution, dimensions, no upscaling,
kind) and then rendered at 375x812 in both locales. Kinds: **likeness 10** (Dibaba, Iwasaki, Liddell,
Joplin, Ogai, Janacek, Kekule, Herschel, Galois, Suzuki), **historical_depiction 11** (Barth, Morphy,
Telford, Caillie, Bruegel, Chaucer, Zhao Mengfu, Saadi, Lorentz, Zhu Xi, Mendelssohn). Caveats carried
in the candidate notes:
- Barth: Rijksmuseum print dated only 1850-1892 and the record does not say what it was made after, so
  `historical_depiction`; Morphy: Homer's 1859 engraving is printed after a photograph, same kind;
  Mendelssohn: engraving after Frisch (museum date 1770-75, dedication reads 1787, recorded as "1780s").
- Kekule: age basis (made before 1896, photographer unknown, Smithsonian "no known copyright
  restrictions" is not relied on alone); Iwasaki: NDL site-wide public-domain statement plus a
  lifetime (pre-1885) photograph, exact date unknown; Suzuki: NDL statement plus a 1942 Japanese
  publication whose term expired before 1996.
- Galois: first published in Dupuy 1896 (pre-1931 publication, not URAA-restored); the Numdam scan's
  "tous droits reserves" digitisation notice was not relied on and does not attach to the 1826 drawing.
- Janacek: small crop (455x640) at original resolution from the 1899 Narodni album, US status fixed by
  publication date; photographer uncredited.
- Zhao Mengfu: Met Open Access API `isPublicDomain` true, the Met object page itself returned HTTP 429
  so its wording was not read; Zhu Xi: NPM CC0 open-data tier, "Yuan, probably after 1330" is inferred.
- Saadi: a poet-labelled folio of a 1427 manuscript read through the holder's IIIF manifest (viewer pages
  are anti-bot); Chester Beatty's live Copyright page gives CC BY 4.0 as the default.
- Telford: NLW item read through the library's IIIF manifest (Public Domain Mark); Lorentz: holder
  IIIF manifest (Public Domain Mark), painter d.1925.

## Eligibility (computed only after all scores were frozen)

No rescue: after seeing results no row was added, no score or confidence raised, and nothing favourably
reinterpreted. `evaluateMatchEligibility()` (`eligibility_v2`: scored >= 18, coverage >= 0.6, high-
confidence subset) per shipped candidate:

| Slug | Scored rows | Avg confidence | Coverage | Eligible |
|---|---|---|---|---|
| heinrich-barth | 8 | 0.598 | 0.241 | no |
| paul-morphy | 4 | 0.518 | 0.120 | no |
| tirunesh-dibaba | 5 | 0.536 | 0.152 | no |
| thomas-telford | 6 | 0.513 | 0.178 | no |
| iwasaki-yataro | 6 | 0.492 | 0.180 | no |
| rene-caillie | 6 | 0.537 | 0.181 | no |
| eric-liddell | 5 | 0.508 | 0.150 | no |
| pieter-bruegel | 3 | 0.443 | 0.095 | no |
| scott-joplin | 6 | 0.547 | 0.191 | no |
| geoffrey-chaucer | 4 | 0.445 | 0.130 | no |
| zhao-mengfu | 3 | 0.480 | 0.091 | no |
| mori-ogai | 5 | 0.536 | 0.152 | no |
| leos-janacek | 5 | 0.550 | 0.156 | no |
| saadi | 3 | 0.410 | 0.088 | no |
| hendrik-lorentz | 5 | 0.564 | 0.150 | no |
| august-kekule | 4 | 0.510 | 0.121 | no |
| caroline-herschel | 5 | 0.540 | 0.149 | no |
| evariste-galois | 5 | 0.498 | 0.162 | no |
| umetaro-suzuki | 5 | 0.474 | 0.146 | no |
| zhu-xi | 4 | 0.438 | 0.126 | no |
| moses-mendelssohn | 6 | 0.505 | 0.187 | no |

Batch (21 shipped) min / median / max: scored 3 / 5 / 8; avg confidence 0.41 / 0.510 / 0.598; coverage 0.088 / 0.150 / 0.241.

**0 of 21 are match-eligible; the eligible set stays exactly 114** (asserted by the Roster63 audit:
114 eligible outside the 21 targets, 114 + 0 in total). Sparse profiles are expected and accepted.
Cumulative Roster33-63: **488 shipped, 0 match-eligible** (467 + 21).

## Counts and categories

| | Before (base) | After |
|---|---|---|
| Production | 692 | **713** |
| Directory-visible | 691 | **712** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 847 | **877** (+30 frozen candidates; 186 non-production research/holds = 177 + 9) |

Literal `categoryCounts.ts 63` output:

```
before roster63: {"production":692,"visible":691,"categoriesProduction":{"science_knowledge":275,"arts_culture":252,"leadership_society":125,"building_discovery":222},"categoriesVisible":{"science_knowledge":275,"arts_culture":252,"leadership_society":124,"building_discovery":221}}
after roster63:  {"production":713,"visible":712,"categoriesProduction":{"science_knowledge":285,"arts_culture":260,"leadership_society":128,"building_discovery":228},"categoriesVisible":{"science_knowledge":285,"arts_culture":260,"leadership_society":127,"building_discovery":227}}
```

Deltas +10 science, +8 arts, +3 leadership, +6 building = 27 memberships for 21 people because a person
counts once in every category containing any of their `fieldIds`. Reconciliation by person: science
10 (Kekule, Herschel, Galois, Barth [linguistics], Lorentz, Ogai [medicine], Mendelssohn [philosophy],
Telford, Suzuki, Zhu Xi [philosophy]); arts 8 (Chaucer, Janacek, Ogai [literature], Mendelssohn
[literature], Bruegel, Saadi, Joplin, Zhao Mengfu); leadership 3 (Liddell [education], Mendelssohn
[religion/philosophy], Zhu Xi [education]); building 6 (Liddell [sport], Barth [exploration], Iwasaki,
Morphy, Caillie, Dibaba). Six extra memberships: Ogai 1, Mendelssohn 2, Zhu Xi 1, Liddell 1, Barth 1.
The single Zheng He production-vs-visible gap in leadership and building is unchanged (125 -> 124 and
222 -> 221 before; 128 -> 127 and 228 -> 227 after). No unreconciled change.

## 750-checkpoint proximity record

Production count **713**; **37 people remain to 750**. The existing policy (the 500-person checkpoint
document: "re-measure at about 750" with the Directory virtualization decision "watch at 750") has
not fired: no threshold is crossed at 713, and even a full 30-person ship in the next roster would
reach at most 743. The ~750 checkpoint is therefore **deferred, not started**; no new threshold was
invented and no optional checkpoint work was mixed into Roster63.

## Validation

- `tsc --noEmit`: clean (after correcting the invalid `18th_century` era).
- `validateCandidates.ts`: **0 errors, 0 warnings** across 877 candidate files (700 evidence_approved,
  93 qa_passed, 84 held).
- Roster63 audit (`roster63.test.ts`): **375 tests passed** (candidate<->production equality for the
  21 shipped, absence of all 9 holds in production, Laozi `held` with zero rows, identity integrity: no
  shipped person matches any OTHER production person by slug, normalized name, alias, token set or QID,
  and no held candidate matches production; global uniqueness of ids, slugs and non-null QIDs).
- Full Vitest: **7021 passed / 7021, 93 files** (the first full run had one failure, my mis-placed
  Laozi entry in the new audit's portrait-held status loop, fixed before the final run).
- Calibration (`calibrate.ts quiz`) run twice: output identical, `meanSd=11.704`, eligible set identical
  (114), generated `dispersion.generated.ts` blob hash `73e03834...` both times and equal to HEAD (the
  only working-tree difference is line-ending noise, restored). Not tuned.

## Final build

`next build --webpack` exit 0, run after the last production-visible change: **Generating static pages
using 21 workers (1450/1450)**. Formula check `2 x production_count + 24 = 2 x 713 + 24 = 1450` holds.

## Playwright

Final focused suite (Person, Editorial, Directory, Compare, Trait Explanation: `person.visual`,
`editorial`, `peopleDirectory`, `compare.visual`, `traitExplanation`, `--workers=1`) after the last
user-visible change: **142 passed (3.1 min), first run, 0 failures**. The whole 286-spec suite was not
re-run for diagnostics; no product or test code was changed to mask known load-only quiz timeouts.

## Local QA

- Production-built server on a local port: all 21 shipped people return **EN 200, KO 200, portrait 200**
  (portrait URL read from each rendered page's `<img src>`); all 9 holds return **404 in both locales**
  (18/18 checks).
- 375x812 sweep in both locales (42 page loads): **0 horizontal overflow** (max `scrollWidth` 375), **0
  broken images**, **0 console errors**, **0 raw internal ids** (no `snake_case` tokens in rendered
  text), every page shows a portrait and a credit line, **Korean names render** (e.g. 하인리히 바르트, 조맹부,
  아우구스트 케쿨레, 주희, 모제스 멘델스존), and the **first Achievement card renders in both locales
  for all 21** (0 missing).
- Source-link sweep: 155 unique source URLs across the 21 shipped candidates: 136 returned 200; the 19
  that did not (Britannica x17, LetsRun, Pulitzer, UNESCO list/1303 - all HTTP 403 or a timeout from this
  client) are bot walls on pages the research agents opened and read, **not broken links; no URL was
  changed**.

## Defects

- `moses-mendelssohn` era `18th_century` invalid (caught by `tsc`, fixed).
- Mis-placed `laozi` entry in the new audit's portrait-held status loop (caught by Vitest, fixed).
- `august-kekule` Korean display name too long (lead review, fixed).
- Agent research interruptions: all four first-wave agents hit the usage limit and were resumed; nothing
  had been saved, so each started its group again. No data was lost or duplicated.
- No defect in product code. No benchmark, rescue, legacy or optional checkpoint work was triggered.

## Deferred work and state

- The 9 holds stay researched and unpromoted (blockers and next steps above); Laozi needs a product
  decision, not a source.
- The ~750 scale checkpoint is deferred (37 to go).
- **Roster64 not started.**
