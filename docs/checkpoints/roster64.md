# Roster64 checkpoint (2026-11-05)

Tenth 30-candidate batch after the 500-person scale checkpoint (EXPANSION_GREEN), twenty-ninth fresh
new-candidate cycle after the recent-cohort diagnostic, and the third cycle selected from a
portrait-preflighted pool. This cycle added two pre-freeze rules: a **historical-attribution screen**
(is there enough reliable evidence to attribute actual behaviour to a historical individual?) and a
**holder-record rule** (open the holder's item record before grading a portrait route strong).
Outcome: **30 frozen, 24 shipped, 6 held (all on portrait rights/identification, none on evidence)**,
production **713 -> 737**, directory-visible **712 -> 736**, match-eligible **114 (unchanged, 0 of 24
eligible)**. No portrait, rights, evidence, scoring, publication or eligibility standard was relaxed.

- `ROSTER64_BASE_SHA` = `4b234849bc4b997f3888e914601fed6d6d468f93`, the normal merge of PR #76
  (Roster63) into `main` (parents `036ffde33ff604bf796fffbfbb765d91b6c37c7e` and
  `c1186e08f6343d4f912197eb32866302f4c07aef`).
- Branch `feat/roster64`; PR against `main` (not merged, by instruction).

## PR #76 merge (Roster63)

Mechanical guards, all passing before the merge: PR open, not draft, `mergeable` / `CLEAN`, base
exactly `036ffde3...`, head exactly `c1186e08...`, 0 behind base, Vercel `SUCCESS` on the exact head,
0 review threads, only the two reviewed commits (`ad26e4d`, `c1186e0`), and the only comment was the
Vercel bot's informational notice. Merged with a normal merge commit guarded on the expected head SHA
(no squash, no rebase).

## Roster63 production verification (deployment SHA = merge SHA)

- 21/21 shipped Roster63 people: EN route 200, KO route 200; 21/21 portrait URLs (read from each live
  page's `<img src>`) 200.
- All 9 Roster63 holds return 404 in both locales: the 8 portrait holds (Abel Tasman, Tarsila do
  Amaral, Ivan Sechenov, Birbal Sahni, Charles Sanders Peirce, Ramakrishna, Lev Vygotsky, Okakura
  Kakuzo) and the evidence hold (Laozi).
- Directory shows "712 people". Starting counts: production **713**, directory-visible **712**,
  match-eligible **114**, candidate JSON **877** (186 non-production files).
- Canonical `categoryCounts.ts` at the base, matching the Roster63 checkpoint exactly (the single Zheng
  He production-vs-visible gap sits in leadership and building):

```
current: {"production":713,"visible":712,"categoriesProduction":{"science_knowledge":285,"arts_culture":260,"leadership_society":128,"building_discovery":228},"categoriesVisible":{"science_knowledge":285,"arts_culture":260,"leadership_society":127,"building_discovery":227}}
```

## Pool, identity gate, backlog

- **Proposed pool: 120** (building 26, arts 30, science 30, leadership 34): 53 unfrozen or previously
  culled names from the Roster63 pool re-gated against the new 713-person production set, plus 67 new
  names chosen against Western/contemporary concentration (Southeast and South Asia, Africa, Latin
  America, ancient and medieval figures, women).
- **Identity gate** (`identityGate.ts --json`, 257 probes with live-verified Wikidata QIDs, against all
  713 production people including legacy people without QIDs): **0 hard duplicates** (slug, normalized
  name, alias, token set, QID) and **2 review-tier matches**.
- **Review-tier adjudication (persisted in `dispositions64.json`, scratchpad):**
  - `kiichiro-toyoda` vs production `sakichi-toyoda`: **different_person** (Kiichiro, 1894-1952,
    founder of Toyota Motor Corporation, is Sakichi's son; distinct QIDs; the same disposition as
    Roster63). Retained and frozen.
  - `heron-of-alexandria` vs production `hypatia`: **different_person** (the review tier fired only
    because "Alexandria" was parsed as a surname; unrelated people centuries apart). Retained; excluded
    later by the attribution screen.
  - No `uncertain` dispositions.
- **Backlog exclusion**: all 186 non-production candidate files compared by slug, QID, canonical
  name and alias: **6 hits, all excluded, none reopened** (no concrete signal resolving a previous
  blocker): Ibn Battuta, Wifredo Lam, Violeta Parra, Archimedes, Hippocrates, Yi Hwang. No production
  QID collision.
- One QID was wrong in the freeze file (Xunzi: `Q6722310` is the book; the philosopher is `Q216072`);
  the research agent caught it by live verification and the candidate uses `Q216072`. The identity gate
  matched on slug and name, so it had been unaffected.

## Historical-attribution screen (new)

Run on the whole 120-name pool before portrait preflight. Result counts: **attributable 86,
limited_but_usable 12, uncertain 11, non_attributable 11**. Judgments are in `attr64.json` (scratchpad).

- **non_attributable (rejected before freeze, never researched):** Homer (composite authorship, no
  recoverable biography), Aesop (legendary; the Life is a late romance), Valmiki (legendary sage and
  composite epic), Patanjali (name covers authors of different dates), Pythagoras (biography is
  overwhelmingly late legend), Kalidasa (legend; works are the only evidence), Huineng (Platform Sutra
  hagiography), Nagarjuna (several Nagarjunas conflated), Diogenes (anecdote transmitted by Diogenes
  Laertius), Hillel the Elder (Talmudic hagiography), Hero of Alexandria (life essentially unknown).
- **uncertain (not frozen, not resolved):** Hua Tuo, Zhang Zhongjing, Sappho, Thales, Zhuangzi, Mozi,
  Mirabai, Basava, Ramanuja, Madhava of Sangamagrama, Cao Xueqin.
- **limited_but_usable (sparse record, sparse honest rows):** Ptolemy, Eratosthenes, Epicurus,
  Aryabhata, Brahmagupta, Zu Chongzhi, Varahamihira, Al-Battani, Hamzah Fansuri, and three that were
  frozen: **Zeno of Citium, Xunzi, Sei Shonagon**. All three were researched with 3-5 rows capped at
  confidence <= 0.50 and self-authored text treated as self-report; none was found non-attributable
  after reading (Zeno 4 rows, Xunzi 4, Sei Shonagon 4).
- Sparse personality evidence alone was not a reason to reject anyone.

## Candidate-level portrait viability preflight (with the holder-record rule)

For every identity-clean, attribution-usable pool candidate the scan pulled all Wikidata image claims
and a Commons file search so alternatives were visible. That pool-wide screen is automated and
permissive; only the frozen 30 carry meaningful grades. For the frozen 30 the holder record was
opened wherever reachable: Rijksmuseum linked-art records (Bessemer, Raden Saleh, Pestalozzi, Zeno:
Public Domain Mark + CC0), the Met Open Access API (Diderot: `isPublicDomain` true), the Commons
own-work licence (Ndereba), and Commons wikitext for the rest. Where the holder record
could not be opened (loc.gov is behind a Cloudflare wall this session; Gallica HTML, several museum
pages) the grade was capped at plausible and the lack of verification recorded in `frozen64.json`
(`holder` field). That rule is why this freeze has only 8 strong (Emanuel Lasker, Matthew Flinders and
Michael Servetus were provisionally strong on Commons evidence and were graded plausible).

## ROSTER64_FROZEN_30

Declared after the identity gate, review adjudication, backlog exclusion, attribution screen, portrait
preflight and portfolio / region review; immutable afterwards, no substitution. Portfolio **8 building /
8 arts / 7 science / 7 leadership-society**.

**Frozen preflight composition: strong 8, plausible 17, risky 5.** Target (>=10 strong, >=12 additional
plausible, <=8 risky): plausible and risky **met**; strong **short by 2** because the holder-record
rule capped three Commons-strong routes at plausible; the target is a selection aid, not a reason to
upgrade a grade. Strong+plausible per group: building 7, arts 6, science 7, leadership 5 (goal >=4 each,
achieved). **Lead dependence at freeze: 16 lead-robust, 14 alternative-dependent.**

Frozen regions (as recorded in the candidate files): Western Europe 14, East Asia 7, North America 2,
sub-Saharan Africa 2, South Asia 2 (Raden Saleh is filed under south_asia by repository precedent: there
is no Southeast Asia region), Southern Europe 2, Latin America 1. **Western Europe is 14 of 30 (47%),
more than Roster63's 11**: portrait routes with item-level open records (Rijksmuseum, Met, Paris Musees,
BIU Sante, Internet Archive plates) are concentrated there, and no West Asian, Central Asian or North
African candidate had a viable portrait route; this tilt is a known cost of the portrait-first
selection, recorded rather than hidden. Six of the 30 were born before 1700 (Zeno, Xunzi, Sei Shonagon,
Hieronymus Bosch, Michael Servetus, Xu Guangqi).

## Ship / hold result

**Shipped (24)** - building 7: Henry Bessemer, Catherine Ndereba, Eli Whitney, Joseph-Marie Jacquard,
Douglas Mawson, Emanuel Lasker, Kiichiro Toyoda. Arts 7: Raden Saleh,
Yosano Akiko, Thomas Mofolo, Hieronymus Bosch, Eugene Delacroix, John Constable, Sei Shonagon. Science
6: Niels Henrik Abel, Augustin Fresnel, Michael Servetus, Claude Bernard, Ino Tadataka, Xu Guangqi.
Leadership 4: Johann Heinrich Pestalozzi, Denis Diderot, Henri Bergson, Nishida Kitaro.
(Shipped per group 7 / 7 / 6 / 4 from 8 / 8 / 7 / 7 frozen.)

**Held (6), all on portrait rights or sitter identification; none on evidence.** Research, candidate
JSON and `evidence_approved` status kept, `portrait.status: held`, not in the generator allowlist, not in
production.

| Hold | Grade | Blocker | Next step |
|---|---|---|---|
| matthew-flinders | plausible | **holder-record contradiction discovered after preflight**: AGSA's Copyright & Reproductions page restricts reuse of the de Chazal painting (private research and study only, other uses need permission and fees, no cropping); SLNSW miniature pages are walled and the Commons licensing is inconsistent; the History Trust of SA CC0 items are 404 and are photographs of a taped engraving beside a metal block | written permission or a licence from AGSA image services, or SLNSW's public-domain statement for MIN 52 |
| candido-portinari | risky | the Arquivo Nacional photograph has an unknown photographer and only a Commons argument that it was public domain in Brazil in 1996 (jurisdiction-only); no holder record was readable; alternatives were a photographer's own site without permission, group scenes, licensed Projeto Portinari photos, or his still-protected paintings | item-level licence from Projeto Portinari or the Arquivo Nacional, or a pre-1931 published photograph with a documented basis |
| annie-jump-cannon | plausible | **holder-record contradiction discovered after preflight**: the Library of Congress record (read as JSON) credits "Fotograms, N.Y. photo" (not the NYWTS the route assumed), advisory "Publication may be restricted"; the Radcliffe Archives record of the Schlesinger portrait says it may not be reproduced without written permission (contradicting Flickr's "no restrictions"); the 1913 Harvard snapshot has no creator and does not say which woman is which | a pre-1931 printed portrait with a stated photographer and publication date, or a written rights statement from the Radcliffe Archives or the Library of Congress |
| zeno-of-citium | **strong** | **holder-record/inscription conflict found at lead review**: the Rijksmuseum record (print RP-P-2007-357, Boyvin 1566, PDM + CC0) catalogues the sitter as Zeno of Citium, but the plate's own lettering reads "ZENO FLORVIT OLYMP. 100" (about 380 BCE, not Zeno of Citium's about 300 BCE), and the image is an imagined 16th-century portrait; no positively identified sitter | a source identifying which ancient Zeno the plate depicts, or another dated depiction with an unambiguous caption |
| xunzi | risky | the lead (Qing painting) is a 2017 scan of a 2003 book with no holder; the better route, the anonymous Xun Kuang leaf in the National Palace Museum album (000329), has item-level terms that could not be read (script-driven open-data site; a sister record names the museum as rights holder with an image-licensing contact) | find the leaf in NPM Open Data or ask its licensing office |
| ramana-maharshi | risky | the Welling 1948 photograph is a Commons PD-India tag only and an Indian 1948 photograph was likely still protected in 1996 (URAA restoration); the 1902 "earliest photo" cites a devotee website with no photographer or rights holder; ashram pages carry no credits; the profile is also thin (2 rows, devotee-derived sources only) | provenance for the 1902 photograph from Sri Ramanasramam or a pre-1931 print with an item-level record |

### Per-candidate table

Agent rows = rows scored before agent self-calibration; lead review = lead rows lowered with
`RUBRIC_CORRECTION` (and rows removed); final rows = rows in the candidate file now; agent-lowered = rows
the agent lowered at self-calibration; final portrait = whether the shipped image is the initial lead
(including the same image from a better holder) or a different replacement image.

| Slug | Group | Era / region | Preflight | Lead dependence | Agent rows | Lead review | Final rows | Sources | Agent-lowered | Final portrait | Outcome |
|---|---|---|---|---|---|---|---|---|---|---|---|
| henry-bessemer | building | 19th_century / western_europe | strong | lead-robust | 7 | 0 lowered | 7 | 7 | 2 | lead | shipped |
| catherine-ndereba | building | contemporary / sub_saharan_africa | strong | lead-robust | 5 | 0 lowered | 5 | 6 | 2 | lead | shipped |
| matthew-flinders | building | 19th_century / western_europe | plausible | lead-robust | 5 | 0 lowered | 5 | 6 | 1 | none | **held** |
| eli-whitney | building | 19th_century / north_america | plausible | alt-dependent | 6 | 0 lowered | 6 | 8 | 1 | replacement | shipped |
| joseph-marie-jacquard | building | 19th_century / western_europe | plausible | alt-dependent | 2 | 0 lowered | 2 | 7 | 1 | replacement | shipped |
| douglas-mawson | building | 20th_century / western_europe | plausible | alt-dependent | 5 | 0 lowered | 5 | 8 | 1 | lead | shipped |
| emanuel-lasker | building | 20th_century / western_europe | plausible | lead-robust | 6 | 0 lowered | 6 | 10 | 2 | lead | shipped |
| kiichiro-toyoda | building | 20th_century / east_asia | risky | alt-dependent | 6 | 0 lowered | 6 | 8 | 2 | replacement | shipped |
| raden-saleh | arts | 19th_century / south_asia | strong | lead-robust | 4 | 0 lowered | 4 | 9 | 2 | lead | shipped |
| yosano-akiko | arts | 20th_century / east_asia | plausible | lead-robust | 7 | 1 lowered | 7 | 9 | 1 | lead | shipped |
| thomas-mofolo | arts | 20th_century / sub_saharan_africa | plausible | lead-robust | 4 | 0 lowered | 4 | 9 | 1 | lead | shipped |
| hieronymus-bosch | arts | early_modern / western_europe | plausible | alt-dependent | 4 | 0 lowered | 4 | 7 | 1 | replacement | shipped |
| eugene-delacroix | arts | 19th_century / western_europe | plausible | alt-dependent | 7 | 1 lowered | 7 | 9 | 2 | replacement | shipped |
| john-constable | arts | 19th_century / western_europe | plausible | alt-dependent | 6 | 1 lowered | 6 | 7 | 2 | replacement | shipped |
| candido-portinari | arts | 20th_century / latin_america | risky | alt-dependent | 5 | 0 lowered | 5 | 9 | 2 | none | **held** |
| sei-shonagon | arts | medieval / east_asia | risky | alt-dependent | 4 | 0 lowered | 4 | 6 | 1 | replacement | shipped |
| niels-henrik-abel | science | 19th_century / western_europe | strong | lead-robust | 6 | 1 lowered | 6 | 7 | 1 | lead | shipped |
| augustin-fresnel | science | 19th_century / western_europe | strong | lead-robust | 8 | 2 lowered | 8 | 5 | 1 | lead | shipped |
| michael-servetus | science | early_modern / southern_europe | plausible | lead-robust | 5 | 0 lowered | 5 | 9 | 1 | lead | shipped |
| claude-bernard | science | 19th_century / western_europe | plausible | lead-robust | 6 | 1 lowered | 6 | 9 | 1 | replacement | shipped |
| annie-jump-cannon | science | 20th_century / north_america | plausible | alt-dependent | 3 | 0 lowered | 3 | 8 | 1 | none | **held** |
| ino-tadataka | science | early_modern / east_asia | plausible | lead-robust | 6 | 0 lowered | 6 | 10 | 0 | lead | shipped |
| xu-guangqi | science | early_modern / east_asia | plausible | alt-dependent | 5 | 0 lowered | 5 | 9 | 1 | lead | shipped |
| johann-heinrich-pestalozzi | leadership | early_modern / western_europe | strong | lead-robust | 5 | 1 lowered | 5 | 7 | 1 | lead | shipped |
| denis-diderot | leadership | early_modern / western_europe | strong | lead-robust | 9 | 5 lowered | 9 | 7 | 1 | lead | shipped |
| zeno-of-citium | leadership | ancient / southern_europe | strong | lead-robust | 4 | 0 lowered | 4 | 6 | 0 | none | **held** |
| henri-bergson | leadership | 20th_century / western_europe | plausible | lead-robust | 5 | 1 lowered | 5 | 6 | 1 | lead | shipped |
| nishida-kitaro | leadership | 20th_century / east_asia | plausible | alt-dependent | 7 | 2 lowered | 7 | 7 | 1 | replacement | shipped |
| xunzi | leadership | ancient / east_asia | risky | alt-dependent | 4 | 0 lowered | 4 | 5 | 1 | none | **held** |
| ramana-maharshi | leadership | 20th_century / south_asia | risky | alt-dependent | 2 | 0 lowered | 2 | 5 | 1 | none | **held** |

## Preflight accuracy: viability and lead-image survival

| Grade | Frozen | Shipped | Held | Initial lead survived | Replacement portrait shipped |
|---|---|---|---|---|---|
| strong | 8 | 7 | 1 | 7 | 0 |
| plausible | 17 | 15 | 2 | 8 | 7 |
| risky | 5 | 2 | 3 | 0 | 2 |
| **all** | 30 | 24 | 6 | 15 | 9 |

Candidate-level viability with the holder-record rule predicted the outcome well: **strong 7/8 shipped,
plausible 15/17, risky 2/5**. **15 of the 24 shipped portraits (63%) are the initial lead; 9 (38%) are
replacement images** (Roster63: 29% replacements; Roster62: 64%). All 7 shipped strong candidates kept
their lead (some from a better holder or plate: Abel and Fresnel from Internet Archive book plates,
Bessemer from the Rijksmuseum print). **Of the 16 lead-robust candidates 14 shipped (Flinders and Zeno were
held); of the 14 alternative-dependent candidates 10 shipped (8 with replacement images) and 4 were held
(Portinari, Cannon, Xunzi, Ramana).** Replacements overall: Whitney, Jacquard, Toyoda, Bosch, Delacroix,
Constable, Sei Shonagon, Bernard, Nishida.

**Why each strong/plausible hold overestimated viability:**
- *Zeno (strong)*: the grade rested on the Rijksmuseum PDM/CC0 record, which verifies rights but not the
  sitter; the plate's lettering contradicts the catalogued sitter. Lesson: for prints of ancient figures,
  read the lettering on the plate as well as the rights statement.
- *Matthew Flinders (plausible)*: graded on Commons CC0/PD tags for the AGSA painting and the History Trust
  of South Australia photographs; the AGSA holder page restricts reproduction and the History Trust items
  were dead. This is the Moreno/Peirce pattern: a Commons tag without a holder record.
- *Annie Jump Cannon (plausible)*: the NYWTS work-for-hire route (used for MLK, Malcolm X, Muhammad Ali)
  assumed NYWTS authorship; the Library of Congress record credits a different photographer and says
  publication may be restricted, and the Harvard alternative carries an explicit written-permission
  restriction.

**What made each risky ship succeed:** *Kiichiro Toyoda* - the unknown-author Commons lead was replaced by
the oval photograph in the 1937 "Teikoku hatsumeika meikan" (Osaka Hatsumei Kyokai), NDL Digital
Collections pid 1207646, whose IIIF manifest and OAI record state "PDM" at item level; the NDL Portraits
site, which worked for Suzuki, Iwasaki and Mori Ogai in Roster63, has no entry for him. *Sei Shonagon* - the
Tokyo National Museum lead (non-commercial terms) was replaced by Kunisada's 1863 "Kokin meifu den: Sei
Shonagon" print, NDL pid 1304224, item-level PDM, with the sitter named in the print itself.

**Holder-record contradictions found after preflight (new rule in action), 7:** Delacroix (Louvre terms
limit images to private or listed educational use -> replaced by Pierre Petit's albumen print, Met Open
Access), Constable (the V&A record of the Gardner portrait carries a V&A copyright notice, contradicting a
"own work" Commons photo -> replaced by the Leslie frontispiece plate in the 1896 Life and Letters, Internet
Archive), Sei Shonagon (Tokyo National Museum, above), Ino Tadataka (the Katori City museum site requires
permission -> the same painting as a 1917 book plate, NDL pid 956854, item-level PDM), and three that ended
in holds (Flinders, Cannon, Zeno). **Three holds resulted specifically from a holder-record contradiction
discovered after preflight: Flinders, Cannon and Zeno (identification vs holder).** Three holds
(Portinari, Xunzi, Ramana) had no readable holder record at all. The Library of Congress wall
(loc.gov item pages and `?fo=json` return Cloudflare challenges this session) made three LoC leads
unverifiable (Whitney, Jacquard, Cannon): Whitney and Jacquard shipped through Yale University Art Gallery
and Rijksmuseum replacements, Cannon was held.

## Exact structured handback totals (from the 30 per-candidate handback files)

- Initial rows scored by agents: **158** (shipped candidates 135, held candidates 23). Agent
  self-calibration lowered **36** rows (shipped 30, held 6); no row was added or removed by agents, so
  agent-final rows are also 158. The exact rows with old -> new score / confidence:

- henry-bessemer: independent_thinking 70/0.52 -> 66/0.48
- henry-bessemer: creative_originality 74/0.62 -> 70/0.58
- catherine-ndereba: discipline 68/0.55 -> 64/0.5
- catherine-ndereba: adaptability 64/0.5 -> 60/0.45
- matthew-flinders: mastery_orientation 76/0.6 -> 72/0.55
- eli-whitney: persuasiveness 70/0.52 -> 64/0.48
- joseph-marie-jacquard: persistence 62/0.45 -> 58/0.42
- douglas-mawson: persistence 76/0.62 -> 72/0.55
- emanuel-lasker: analytical_rigor 72/0.58 -> 66/0.5
- emanuel-lasker: independent_thinking 66/0.52 -> 62/0.46
- kiichiro-toyoda: systems_abstraction 68/0.5 -> 62/0.42
- kiichiro-toyoda: independent_thinking 66/0.5 -> 62/0.48
- raden-saleh: mastery_orientation 68/0.5 -> 62/0.44
- raden-saleh: deep_focus 66/0.5 -> 62/0.44
- yosano-akiko: persistence 80/0.64 -> 74/0.55
- thomas-mofolo: creative_originality 78/0.62 -> 74/0.55
- hieronymus-bosch: creative_originality 72/0.55 -> 68/0.5
- eugene-delacroix: deep_focus 70/0.52 -> 64/0.45
- eugene-delacroix: aesthetic_sensitivity 80/0.62 -> 74/0.56
- john-constable: creative_originality 76/0.62 -> 72/0.56
- john-constable: independent_thinking 72/0.6 -> 66/0.52
- candido-portinari: independent_thinking 68/0.52 -> 64/0.46
- candido-portinari: planning_orientation 66/0.52 -> 62/0.48
- sei-shonagon: aesthetic_sensitivity 72/0.5 -> 68/0.45
- niels-henrik-abel: systems_abstraction 80/0.62 -> 76/0.58
- augustin-fresnel: detail_orientation 72/0.52 -> 68/0.46
- michael-servetus: conflict_tolerance 70/0.5 -> 64/0.45
- claude-bernard: analytical_rigor 74/0.55 -> 68/0.5
- annie-jump-cannon: detail_orientation 70/0.52 -> 64/0.46
- xu-guangqi: impact_motivation 62/0.46 -> 58/0.42
- johann-heinrich-pestalozzi: planning_orientation 24/0.64 -> 30/0.58
- denis-diderot: cross_domain_range 85/0.72 -> 82/0.68
- henri-bergson: persuasiveness 76/0.6 -> 72/0.55
- nishida-kitaro: belief_updating 70/0.6 -> 66/0.56
- xunzi: systems_abstraction 58/0.46 -> 54/0.42
- ramana-maharshi: persistence 54/0.44 -> 50/0.4
- **One agent-introduced score RAISE, reversed by the lead:** Pestalozzi `planning_orientation` is
  recorded as 24 / 0.64 -> 30 / 0.58 in the handback (the agent raised the score while lowering the
  confidence). Calibration never raises a score, so the lead restored the score to **24** and kept the
  lowered confidence **0.58**; the row is therefore 24 / 0.58 in the candidate file. This is a reversal of a
  raise, not a `RUBRIC_CORRECTION` lowering.
- **Lead review (all 24 shipped candidates fully reviewed)** lowered **16 further rows in 10 candidates**
  (below) and **removed 0 rows**, so the final candidate files hold **158 rows** (shipped 135, held 23).
- Major Achievement gate, first pass, agent level: **0 failures in 150 checks** (30 candidates x 5
  checks). Lead Achievement corrections: **0** (the first card states the defining contribution for all
  24, verified on the rendered pages in both locales).

## Lead review

All first Achievement cards state the defining contribution. **Sixteen rows in ten candidates were
lowered with `RUBRIC_CORRECTION` (downward only, before eligibility)**, concentrated in profiles whose
support is two or three retrospective reference sources (Diderot, Nishida), award-body or museum praise
(Bergson, Delacroix, Yosano) or self-report (Bernard's own Introduction, Constable's friend-biographer):

| Candidate | Row | Old -> new (score / confidence) | Reason (summary) |
|---|---|---|---|
| yosano-akiko | creative_originality | 80 / 0.66 -> 76 / 0.6 | poetry-world institution, encyclopedia and a historian carry the praise, retrospectively |
| eugene-delacroix | creative_originality | 78 / 0.62 -> 74 / 0.56 | three museums and an encyclopedia credit him retrospectively and the critical review disputes parts of the influence claims |
| john-constable | planning_orientation | 72 / 0.62 -> 68 / 0.56 | the planning of the six-footers is documented by museums and by his friend-biographer, whose volume prints his letters (self-report) |
| niels-henrik-abel | analytical_rigor | 82 / 0.66 -> 78 / 0.6 | all three sources are retrospective admiring biographies and no source assesses his method independently |
| augustin-fresnel | analytical_rigor | 80 / 0.62 -> 76 / 0.58 | concentrated in MacTutor, Britannica and Arago, an admiring collaborator, against one hostile critic |
| augustin-fresnel | independent_thinking | 80 / 0.64 -> 76 / 0.58 | the same concentration; the independence is read from outcome and from the collaborator memoir |
| claude-bernard | experimentation | 80 / 0.62 -> 76 / 0.58 | the principle is stated in his own 1865 Introduction (self-report) and a reference entry notes his notebooks show a more tortuous path than his published accounts |
| johann-heinrich-pestalozzi | impact_motivation | 80 / 0.68 -> 78 / 0.64 | the sources are a critical-edition site that advocates for him plus general encyclopedias, with the disputed Stans accusations unresolved |
| denis-diderot | curiosity | 80 / 0.62 -> 76 / 0.56 | the support is two encyclopedias (SEP and EB1911) and a technology-history article, all retrospective |
| denis-diderot | independent_thinking | 80 / 0.62 -> 76 / 0.56 | only two reference works support the row and both narrate the legend of his defiance |
| denis-diderot | cross_domain_range | 82 / 0.68 -> 78 / 0.62 | three sources only, and the 1911 account judges several of his genres weak while the workshop work was largely done by collaborators |
| denis-diderot | aesthetic_sensitivity | 78 / 0.6 -> 74 / 0.54 | two reference works carry the row and the criticism (Salons) is judged retrospectively |
| denis-diderot | creative_originality | 74 / 0.58 -> 70 / 0.52 | two reference works, retrospective praise, and several unpublished masterpieces were not known in his lifetime |
| henri-bergson | creative_originality | 78 / 0.62 -> 74 / 0.56 | scholarly encyclopedias and the Nobel award body carry the praise, and critics (Russell, Hanna) dispute the originality of parts of the work |
| nishida-kitaro | systems_abstraction | 76 / 0.66 -> 72 / 0.58 | two reference sources carry the row and the Kopf review notes the biography adopts his own reading |
| nishida-kitaro | persistence | 72 / 0.62 -> 68 / 0.56 | two reference sources and no documented episode of overcoming resistance beyond output |

**Removed rows (separate from score lowerings): none.** Other lead decisions: Pestalozzi score raise
reversed (above); Zeno's portrait converted to a hold (above); Mawson's region left at `western_europe`
provisionally (born in Yorkshire; there is no Oceania region and the precedents do not fit) and recorded as
a caveat; Abel's portrait kept as `likeness` (the 1885 plate reproduces a drawing made from the sitter in
Paris in 1826) with the reproduction noted; Whitney's Morse portrait kept as `likeness` (1822 sitting in New
Haven inferred from date and place, not stated by the Yale record). No candidate was lowered to reach or
avoid a threshold, and no eligibility was consulted before the rows were frozen.

## Portrait review (24 shipped)

Each portrait was checked against its candidate record (sitter, creator, date, provenance, underlying
source, holder/item record, licence rationale and URL, attribution, dimensions, no upscaling, kind) and
rendered at 375x812 in both locales. Kinds: **likeness 10** (henry-bessemer, catherine-ndereba, eli-whitney, douglas-mawson, emanuel-lasker, kiichiro-toyoda, yosano-akiko, eugene-delacroix, niels-henrik-abel, nishida-kitaro), **historical_depiction 14** (joseph-marie-jacquard, raden-saleh, thomas-mofolo, hieronymus-bosch, john-constable, sei-shonagon, augustin-fresnel, michael-servetus, claude-bernard, ino-tadataka, xu-guangqi, johann-heinrich-pestalozzi, denis-diderot, henri-bergson), counted from the candidate files. Caveats carried in the candidate notes:
- Bessemer: Lock & Whitfield studio photograph reproduced as a Woodbury print in "Men of Mark"
  (Rijksmuseum PDM/CC0, c.1876); Ndereba: author-licensed Commons file (CC BY 2.5), action shot, living.
- Whitney: Yale University Art Gallery 1827.1 read through the museum's LUX linked-art record and IIIF
  manifest (CC0 / public domain; the web page is walled); Jacquard: a woven silk portrait (Carquillat,
  c.1870-80) mounted in a Rijksmuseum album, not a photograph of the portrait; Mawson: Thomson studio
  photograph on p. 93 of The American Museum Journal vol. 15 (1915), Internet Archive "not in copyright".
- Lasker: Agence Rol photograph, BnF Gallica OAI record states "domaine public" (photographer unnamed, the
  sitter looks younger than 52, so it may reproduce an earlier photograph); Toyoda: halftone from a 1937
  Japanese directory, no photographer credited, NDL item-level PDM.
- Saleh: Rijksmuseum SK-A-4703, painting attributed to F. C. A. Schreuel, c.1840, `historical_depiction`
  because the attribution is tentative and the museum once catalogued it as a self-portrait; Yosano: NDL
  Portraits photograph whose source book is a 1952 publication (not 1942 as preflighted); the Japanese
  term analysis is the project's reading, not the holder's, on top of the NDL site-wide PD statement.
- Mofolo: Christol's 1911 line drawing, Smithsonian Libraries scan (CC0 / "No Copyright - United States");
  Bosch: Cornelis Cort 1572 engraving, Rijksmuseum RP-P-2020-2845 (the scan shows the museum's object-number
  label); Constable: Leslie drawing as the 1896 book frontispiece (Internet Archive, not in copyright).
- Sei Shonagon: Kunisada 1863 print, NDL pid 1304224 (PDM at item level); Abel: Jaeger 1885 light-print
  plate in Bjerknes (Internet Archive), the Norsk portrettarkiv record is silent on rights; Fresnel: Rosotte
  engraving after Tardieu from the 1866 Oeuvres completes (documented pre-1931 publication).
- Servetus: Fritzsch engraving, Paris Musees Carnavalet CC0 (the Commons copy carries a pasted description of
  a different item; the live museum page is correct; the print shows a burning in the background);
  Bernard: BIU Sante lithograph signed Laemlein 1858 (Licence ouverte); Ino: NDL 1917 biography plate of the
  1821 Aoki Katsujiro painting (item-level PDM, halftone); Xu Guangqi: Kircher 1667 plate via the Wellcome
  copy (Public Domain Mark), single-figure crop with the Chinese cartouche, the printed Latin caption begins
  "Lij" (a slip) and the face is a posthumous European engraving.
- Pestalozzi, Diderot, Bergson, Nishida: Rijksmuseum PDM/CC0 print; Met Open Access (read through the API,
  web pages 429); Paris Musees CC0 drypoint by Raphael Schwartz (gift to the Petit Palais January 1912, no
  licence field in the IIIF manifest); NDL Portraits (photographer unknown, undated).

## Eligibility (computed only after all scores were frozen)

No rescue: after seeing results no row was added, no score or confidence raised, and nothing favourably
reinterpreted. `evaluateMatchEligibility()` (`eligibility_v2`) per shipped candidate:

| Slug | Scored rows | Avg confidence | Coverage | Eligible |
|---|---|---|---|---|
| henry-bessemer | 7 | 0.547 | 0.212 | no |
| catherine-ndereba | 5 | 0.540 | 0.156 | no |
| eli-whitney | 6 | 0.507 | 0.178 | no |
| joseph-marie-jacquard | 2 | 0.420 | 0.064 | no |
| douglas-mawson | 5 | 0.500 | 0.161 | no |
| emanuel-lasker | 6 | 0.550 | 0.178 | no |
| kiichiro-toyoda | 6 | 0.522 | 0.188 | no |
| raden-saleh | 4 | 0.495 | 0.118 | no |
| yosano-akiko | 7 | 0.550 | 0.215 | no |
| thomas-mofolo | 4 | 0.495 | 0.127 | no |
| hieronymus-bosch | 4 | 0.435 | 0.117 | no |
| eugene-delacroix | 7 | 0.539 | 0.215 | no |
| john-constable | 6 | 0.557 | 0.185 | no |
| sei-shonagon | 4 | 0.438 | 0.115 | no |
| niels-henrik-abel | 6 | 0.552 | 0.180 | no |
| augustin-fresnel | 8 | 0.533 | 0.241 | no |
| michael-servetus | 5 | 0.494 | 0.153 | no |
| claude-bernard | 6 | 0.530 | 0.190 | no |
| ino-tadataka | 6 | 0.533 | 0.182 | no |
| xu-guangqi | 5 | 0.474 | 0.145 | no |
| johann-heinrich-pestalozzi | 5 | 0.596 | 0.150 | no |
| denis-diderot | 9 | 0.562 | 0.270 | no |
| henri-bergson | 5 | 0.576 | 0.153 | no |
| nishida-kitaro | 7 | 0.574 | 0.210 | no |

Batch (24 shipped) min / median / max: scored 2 / 6 / 9; avg confidence 0.42 / 0.533 / 0.596; coverage 0.064 / 0.178 / 0.27.

**0 of 24 are match-eligible; the eligible set stays exactly 114** (asserted by the Roster64 audit:
114 eligible outside the 24 targets, 114 + 0 in total). Cumulative Roster33-64: **512 shipped, 0
match-eligible** (488 + 24).

## Counts and categories

| | Before (base) | After |
|---|---|---|
| Production | 713 | **737** |
| Directory-visible | 712 | **736** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 877 | **907** (+30 frozen candidates; 192 non-production research/holds = 186 + 6) |

Literal `categoryCounts.ts 64` output:

```
before roster64: {"production":713,"visible":712,"categoriesProduction":{"science_knowledge":285,"arts_culture":260,"leadership_society":128,"building_discovery":228},"categoriesVisible":{"science_knowledge":285,"arts_culture":260,"leadership_society":127,"building_discovery":227}}
after roster64:  {"production":737,"visible":736,"categoriesProduction":{"science_knowledge":300,"arts_culture":268,"leadership_society":132,"building_discovery":236},"categoriesVisible":{"science_knowledge":300,"arts_culture":268,"leadership_society":131,"building_discovery":235}}
```

Deltas +15 science, +8 arts, +4 leadership, +8 building = 35 memberships for 24 people because a person
counts once in every category containing any of their `fieldIds`. Reconciliation by person: science 15
(Fresnel, Bernard, Diderot [philosophy], Mawson [natural_science], Whitney, Lasker [mathematics],
Bergson [philosophy], Bessemer, Ino [natural_science], Jacquard, Toyoda [engineering], Servetus
[medicine], Abel, Nishida [philosophy], Xu Guangqi); arts 8 (Diderot [literature], Delacroix, Bosch, Saleh,
Sei Shonagon, Mofolo, Yosano, Constable); leadership 4 (Pestalozzi, Servetus [religion], Nishida
[education], Yosano [education]); building 8 (Ndereba, Mawson [exploration], Whitney, Lasker [sport], Bessemer,
Ino [exploration], Jacquard, Toyoda [business]). The 11 extra memberships: Diderot, Mawson, Whitney,
Lasker, Bessemer, Ino, Jacquard, Toyoda, Servetus, Nishida, Yosano (one each). The single Zheng He
production-vs-visible gap in leadership and building is unchanged (125 -> 124 / 222 -> 221 before; 132 ->
131 / 236 -> 235 after is the same one-person gap). No unreconciled change.

## 750-checkpoint proximity record

Production count **737**; **13 people remain to 750**. The existing policy (the 500-person checkpoint
document: "re-measure at about 750", Directory virtualization "watch at 750") has not fired: 737 is below
750 and the policy names no earlier threshold. The checkpoint is **deferred, not started**; no new
threshold was invented and no optional checkpoint work was mixed into Roster64. **Roster65 is the likely
checkpoint-target cycle**: any 13 or more people shipped from a 30-person freeze would cross 750, and by
the pattern set at the 500 crossing that roster completes and merges normally, then roster expansion hands
off to the checkpoint.

## Validation

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: **0 errors, 0 warnings** across 907 candidate files (730 evidence_approved,
  93 qa_passed, 84 held).
- Roster64 audit (`roster64.test.ts`): **417 tests passed** (candidate<->production equality for the 24
  shipped, absence of all 6 holds and all 9 Roster63 holds from production, `portrait.status: held` and
  `evidence_approved` for the six portrait holds, Laozi still `held` on evidence with zero rows, identity
  integrity: no shipped person matches any OTHER production person by slug, normalized name, alias, token
  set or QID, no held candidate matches production, global uniqueness of ids, slugs and non-null QIDs).
- Full Vitest: **7438 passed / 7438, 94 files**.
- Calibration (`calibrate.ts quiz`) run twice: output identical, `meanSd=11.704`, eligible set identical
  (114), generated `dispersion.generated.ts` blob hash `73e03834...` both times and equal to HEAD (the
  only working-tree difference is line-ending noise, restored). Not tuned.

## Final build

`next build --webpack` exit 0, run after the last production-visible change: **Generating static pages
using 21 workers (1498/1498)**. Formula check `2 x production_count + 24 = 2 x 737 + 24 = 1498` holds.

## Playwright

Final focused suite (Person, Editorial, Directory, Compare, Trait Explanation: `person.visual`,
`editorial`, `peopleDirectory`, `compare.visual`, `traitExplanation`, `--workers=1`). **First run: 141
passed, 1 failed** - `peopleDirectory` ko-KR "cross-facet personality AND gives the same result as en-US":
the locked result count moved 16 -> 17 because Denis Diderot (curiosity 76, collaboration 74) newly
satisfies both thresholds. That is a data-driven expectation, not a regression: the assertion was updated
to 17 and now also requires Diderot in the result list (comment records the reason, same pattern as
Roster50/51). **Re-run after that change: 142 passed (3.0 min), 0 failures.** No product code was changed.
The whole 286-spec suite was **not** run (optional/diagnostic); only the focused suite is claimed.

## Local QA

- Production-built server on a local port: all 24 shipped people return **EN 200, KO 200, portrait 200**
  (portrait URL read from each rendered page's `<img src>`); all 6 holds return **404 in both locales**
  (12/12 checks).
- 375x812 sweep in both locales (48 page loads): **0 horizontal overflow** (max `scrollWidth` 375), **0
  broken images**, **0 console errors**, **0 raw internal ids**, every page shows a portrait and a credit
  line, **Korean names render**, and the **first Achievement card renders in both locales for all 24**.
- Source-link sweep: 185 unique source URLs across the 24 shipped candidates: 162 returned 200 and 4
  transient timeouts were re-fetched (3 returned 200, the Paris Musees Carnavalet Servetus page returned a
  301 on retry and was opened live by the research agent); 17 returned 403 and 2 returned 429 (Britannica x13,
  Gallica, LetsRun, the Met web pages), all bot walls on pages the research agents opened and read through
  APIs or alternative records, **not broken links; no URL was changed**.

## Defects

- Pestalozzi score raise by an agent during self-calibration (24 -> 30): reversed by the lead (above).
- Xunzi frozen QID pointed to the book (`Q6722310`); corrected by live verification to `Q216072`.
- Count-sensitive Directory assertion (16 -> 17) updated for Diderot (above).
- Zeno's portrait image was shipped by its agent and converted to a hold at lead review after the plate's
  inscription contradicted the holder identification; the unused file was removed and the handback
  overridden with a `lead_review_override` note.
- Agent interruptions: two usage-limit episodes interrupted eight agent runs; nothing was lost (progress
  was saved after every step; groups were resumed from disk, and Toyoda, whose agent stopped before
  starting him, was given a fresh agent).
- No defect in product code. No benchmark, rescue, Legacy Batch 6 or optional checkpoint work was triggered.

## Deferred work and state

- The 6 holds stay researched and unpromoted (blockers and next steps above); nothing was held on
  evidence, and Laozi (Roster63) remains the only evidence hold on file.
- The ~750 scale checkpoint is deferred (13 to go); Roster65 is the likely checkpoint-target cycle.
- **Roster65 not started.**

## Post-commit scoring lock

Implementation commit `4e1807f` (`Roster64: 24 freshly researched people shipped, 6 held on portrait (713 -> 737)`),
clean tree before and after. `checkScoringLockIntegrity.ts` output:

```
Checked 907 previously-committed candidate file(s) against HEAD. 0 flagged.
Legacy scoring lock: 22 pre-pipeline production people covered, 0 flagged.
```

Committed = on-disk = checked (907 files), 0 unresolved genuine flags (candidate or legacy). Every downward
lead correction carries `RUBRIC_CORRECTION` in its row rationale and in `provenance.notes`; the reversed
Pestalozzi score raise and the Zeno portrait hold are documented in the same notes.
