# Roster66 checkpoint (2026-11-06)

Twelfth 30-candidate batch after the 500-person scale checkpoint, thirty-first fresh new-candidate cycle
after the recent-cohort diagnostic, and the fifth cycle selected from a portrait-preflighted pool. It is
the first roster after the ~750-person scale checkpoint (`docs/checkpoints/750-person-performance.md`),
which classified the architecture **EXPANSION_GREEN** and lifted the post-Roster65 expansion pause. The
strategic lane is now **762 -> ~1000**. Outcome: **30 frozen, 27 shipped, 3 held** (all 3 on portrait
rights), production **762 -> 789**, directory-visible **761 -> 788**, match-eligible **114 (unchanged, 0
of 27 eligible)**. Distance to 1000: **211 people**. No portrait, rights, evidence, scoring, publication
or eligibility standard was relaxed, no scale checkpoint was run, and no maintenance refactor was mixed in.

- `ROSTER66_BASE_SHA` = `8f4becf4c633b6fc9b9b9c4e307d18dbdb39c2b4`, the normal merge of PR #79 (the ~750
  checkpoint) into `main` (parents `0f5e5a239ca0fb96bea34c9c4de81ada1975af07` and
  `b74b67e71ceb28c1c15f240384423de9327e1d44`).
- Branch `feat/roster66`; PR against `main` (not merged, by instruction).

## PR #79 merge (the ~750 checkpoint) and starting state

Mechanical guards, all passing before the merge: PR open, not draft, `mergeable` / `CLEAN`, base exactly
`0f5e5a2...`, head exactly `b74b67e7...`, 0 behind `main`, Vercel `SUCCESS` and `Vercel Preview Comments`
`SUCCESS` on the exact head, 0 review threads, 0 reviews, exactly one commit, only the two expected docs
(`docs/checkpoints/750-person-performance.md`, `docs/context/CURRENT_STATE.md`) changed, and the only
comment was the Vercel bot's informational notice. Merged with a normal merge commit, guarded on the
expected head SHA (no squash, no rebase).

`docs/context/CURRENT_STATE.md` at the base records the 750 checkpoint as completed, the classification
**EXPANSION_GREEN**, and "the post-Roster65 pause is lifted". Because PR #79 was docs-only, repository
counts were re-derived (no deployment campaign): production **762**, directory-visible **761**,
match-eligible **114**, candidate JSON **937**. Canonical `categoryCounts.ts` at the base:

```
current: {"production":762,"visible":761,"categoriesProduction":{"science_knowledge":312,"arts_culture":280,"leadership_society":139,"building_discovery":245},"categoriesVisible":{"science_knowledge":312,"arts_culture":280,"leadership_society":138,"building_discovery":244}}
```

The settled 750-checkpoint findings were carried forward and not reopened (static paths `2N+24`; similar
and quiz cost bounded by the eligible count; compact Directory index; lazy portraits; roster-size
independent profile/Compare/quiz payloads). Its optional/watch items (eight legacy portraits over 1 MiB,
scoring-lock runtime, whole-list Directory rendering, quiz index payload, test-count boilerplate, shared
production-count constant, checked-in wiring script) were **not** touched.

## Pool, identity gate, backlog

- **Proposals gated: 252** (98 unfrozen Roster65 pool names re-gated against the 762-person production set
  plus 154 new names chosen to improve geographic balance where portrait routes exist: Latin America,
  Russia/Ukraine, Central Europe, Spain, the Ottoman and Arab world, India, Japan, China, the Philippines,
  Africa). Wikidata ids were taken from live search; seven wrong top hits (Otto, Slater, Velazquez, Glinka,
  Tintoretto, Giotto, Montesquieu) were corrected before gating.
- **Identity gate** (`identityGate.ts --json`, against all 762 production people including legacy people
  without QIDs): **79 hard duplicates** (slug, normalized name, alias, token set or QID) and **1 review-tier
  match**; 173 proposals were clean. The 79 duplicates include Carl Benz, Rudolf Diesel, Thomas Telford,
  Beethoven, Rembrandt, Kant, Hegel, Gauss and Euler, i.e. the gate again showed how much of the obvious
  canon is already in production.
- **Review-tier adjudication (persisted in `dispositions66.json`, scratchpad):** `sofya-kovalevskaya` vs
  production `sofia-kovalevskaya`: **same_person** (a transliteration variant of the same mathematician;
  it is also a hard QID duplicate). Rejected. No `different_person` and no `uncertain` dispositions.
- **Backlog exclusion**: all 197 non-production candidate files compared by slug, QID, canonical name and
  alias: **16 hits, excluded and not reopened** (Abel Tasman, Nain Singh Rawat, Ibn Battuta, Evliya Celebi,
  Zhang Heng, Su Song, Carlos Chagas, Al-Razi, Ulugh Beg, Nasir al-Din al-Tusi, Shen Kuo, Savitribai Phule,
  Dogen, Al-Ghazali, Adam Smith, Syed Ahmad Khan). No new signal resolved any previous blocker.
- **Scope exclusions (composition rule):** Jose Vasconcelos (government-primary), Zhang Qian
  (diplomacy-primary), and Galen (no Wikidata id resolved in the pool). Five politics-leaning names were
  dropped before probing (Blyden, al-Afghani, Kang Youwei, Namik Kemal, Horace Mann).
- **Scanned pool: 152** (above the 90-120 band because the cull happens after gating from 252 raw proposals);
  149 had at least one PD/CC-licensed Commons image candidate. The pool-wide scan is automated and
  permissive (it matched unrelated people such as a Velazquez painting for a Velasco query), so only the
  frozen 30 carry meaningful grades.

## Historical-attribution screen (carried forward from Roster64)

Run on the pool before portrait preflight (`attr66.json`, scratchpad): over the 152 scanned names plus the
two excluded: **attributable 135, limited_but_usable 17, non_attributable 1, uncertain 1**. Excluded before
the pool: **Sushruta (non_attributable: semi-legendary, composite text)** and **Hamzah Fansuri (uncertain:
dates and life almost undocumented)**. The Roster64/65 non-attributable and uncertain names stay out. **No
limited_but_usable candidate was frozen**: all 30 frozen are attributable, so no Laozi/Ho Xuan Huong-type
evidence failure appeared after freeze (all 30 attribution results were confirmed by the agents).

## Candidate-level portrait viability preflight (holder-record rule, image-identity rule)

For the frozen 30 the holder record was opened where it was reachable: the Met Open Access API (Wheatley),
Rijksmuseum linked-art records (Vives, Erasmus), the Wellcome catalogue API (Fourier), the Nationaal Archief
item page (Di Stefano) and Internet Archive metadata (Slater, Dario). It was capped at plausible where the
holder page was walled or unread (loc.gov, ETH-Bibliotheque E-Pics, Leiden, Paris Musees URL, MUNAL, the
Hamburger Kunsthalle, HU Berlin). The agents re-checked every route again at research time.

## ROSTER66_FROZEN_30

Declared after the identity gate, review adjudication, backlog exclusion, attribution screen, portrait
preflight and portfolio / region review; immutable afterwards, no substitution. Portfolio **8 building /
8 arts / 7 science / 7 leadership-society**.

**Frozen preflight composition: strong 6, plausible 18, risky 6.** Target (>=10 strong, >=12 additional
plausible, <=8 risky): plausible and risky **met**; strong **short by 4** (the holder-record rule kept many
Commons-strong routes at plausible, and the pool is thin on Rijksmuseum/Met/Wellcome/Anefo holders outside
Europe and the United States; the target is a selection aid, not a reason to upgrade a grade).
Strong+plausible per group: building 8, arts 7, science 5, leadership 4 (goal >=4 each, achieved).
**Lead dependence at freeze: 11 lead-robust, 19 alternative-dependent.**

Frozen regions (as recorded in the candidate files): Western Europe 9, Latin America 7, North America 4,
Central Europe 4, East Asia 3, Southern Europe 1, South Asia 1, North Africa 1. **Western Europe is 9 of 30
(30%)**, against 47% in Roster64 and 23% in Roster65; Latin America rose from 3 to 7 (Di Stefano, Dario,
Velasco, Mutis, Caldas, Muller, Lutz). **Not reached despite the attempt: sub-Saharan Africa, West Asia,
Central Asia and Southeast Asia** (no candidate there had a viable portrait route after the identity and
backlog gates; Ho Xuan Huong-type and Ottoman candidates were already consumed or held in earlier cycles).
Two of the 30 were born before 1700 (Erasmus, Vives); five shipped people are `early_modern` (Erasmus, Vives, Mutis, Equiano, Wheatley).

## Ship / hold result

**Shipped (27)** - building 7: Adolf Erik Nordenskiold, Werner von Siemens, Cyrus McCormick, Alfredo Di
Stefano, Zhan Tianyou, H. J. Heinz, Samuel Slater. Arts 7: Phillis Wheatley, Olaudah Equiano, Taras
Shevchenko, Ruben Dario, Modest Mussorgsky, Kuroda Seiki, Heinrich Heine. Science 7: Joseph Fourier, Jan
Evangelista Purkyne, Heike Kamerlingh Onnes, Jose Celestino Mutis, Francisco Jose de Caldas, Fritz Muller,
Adolfo Lutz. Leadership 6: Desiderius Erasmus, Juan Luis Vives, Soren Kierkegaard, Wilhelm von Humboldt,
Tsuda Umeko, Sri Aurobindo. (Shipped per frozen group 7 / 7 / 7 / 6 from 8 / 8 / 7 / 7.)

**Held (3): all on portrait rights.** Research and candidate JSON kept; each is `evidence_approved` with
`portrait.status: held`. None is in the generator allowlist or in production.

| Hold | Grade | Blocker class | Blocker | Next step |
|---|---|---|---|---|
| pyotr-semyonov-tyan-shansky | plausible | **portrait rights: holder terms** | Valentin Serov's 1905 drawing is held by the Russian Museum (inventory R-13431); the museum's own terms page says images of its collection and the right to publish them need an official letter to the director. The Quinet photograph's Gallica record says "restricted use (convention Societe de geographie)", contradicting Commons. The c.1900 Russian State Library photograph exists only as a 267x331 script-rendered viewer image whose caption could not be read; the Kosharov and Koeler portraits have only blog or social-media provenance | open page 14 of RSL document 01003648010 in a normal browser, or obtain written permission from the Russian Museum |
| jose-maria-velasco | plausible | **portrait rights: holder terms / unresolved source** | his self-portrait is in the Museo Nacional de Arte (INBAL); the museum page returned empty, the two Commons files date the painting differently (1877 vs 1894), a National Gallery page credits INBAL "Reproduccion autorizada", and the visitor photograph adds its own licence over a public-domain 2D work. The "1894 photograph" alternative is the same painting. One bounded retry found no pre-1931 printed portrait | the MUNAL/INBAL catalogue record or written terms, or a pre-1931 published photograph with a documented date |
| ahmad-amin | risky | **portrait rights: jurisdiction-only claim** | every Commons image names an unknown author, "before 1955" (or 1916 without evidence of publication) and a PD-Egypt tag, citing a 1955 Cairo memorial book; the Hindawi source page sits behind Cloudflare; no pre-1931 published photograph was found after one bounded retry | a dated pre-1931 periodical or book plate, or a stated licence from Cairo University, the Arab League or the family |

### Per-candidate table

Agent rows = rows scored before agent self-calibration; lead review = rows lowered by the lead with
`RUBRIC_CORRECTION` (none removed); final rows = rows in the candidate file now; agent-lowered = rows the
agent lowered at self-calibration; final portrait = whether the shipped image is the initial lead
(including the same image from a better holder or plate) or a different replacement. The three held
candidates were not fully lead-reviewed (a held candidate that is reopened needs a fresh lead review).

| Slug | Group | Era / region | Preflight | Lead dependence | Agent rows | Lead review | Final rows | Sources | Agent-lowered | Final portrait | Outcome |
|---|---|---|---|---|---|---|---|---|---|---|---|
| pyotr-semyonov-tyan-shansky | building | 19th_century / central_europe | plausible | alt-dependent | 10 | 0 lowered | 10 | 8 | 1 | none | **held** |
| adolf-erik-nordenskiold | building | 19th_century / western_europe | plausible | lead-robust | 10 | 2 lowered | 10 | 7 | 2 | lead | shipped |
| werner-von-siemens | building | 19th_century / western_europe | plausible | lead-robust | 10 | 2 lowered | 10 | 7 | 2 | replacement | shipped |
| cyrus-mccormick | building | 19th_century / north_america | plausible | alt-dependent | 6 | 1 lowered | 6 | 8 | 2 | replacement | shipped |
| alfredo-di-stefano | building | 20th_century / latin_america | strong | lead-robust | 4 | 0 lowered | 4 | 11 | 2 | lead | shipped |
| zhan-tianyou | building | 20th_century / east_asia | plausible | alt-dependent | 4 | 0 lowered | 4 | 8 | 2 | replacement | shipped |
| henry-john-heinz | building | 19th_century / north_america | plausible | lead-robust | 8 | 1 lowered | 8 | 8 | 3 | replacement | shipped |
| samuel-slater | building | 19th_century / north_america | plausible | alt-dependent | 5 | 2 lowered | 5 | 10 | 2 | lead | shipped |
| phillis-wheatley | arts | early_modern / north_america | strong | lead-robust | 4 | 0 lowered | 4 | 10 | 1 | lead | shipped |
| olaudah-equiano | arts | early_modern / western_europe | strong | lead-robust | 5 | 0 lowered | 5 | 10 | 2 | lead | shipped |
| taras-shevchenko | arts | 19th_century / central_europe | plausible | alt-dependent | 5 | 1 lowered | 5 | 7 | 2 | replacement | shipped |
| ruben-dario | arts | 19th_century / latin_america | plausible | alt-dependent | 5 | 0 lowered | 5 | 6 | 2 | replacement | shipped |
| jose-maria-velasco | arts | 19th_century / latin_america | plausible | alt-dependent | 5 | 0 lowered | 5 | 8 | 1 | none | **held** |
| modest-mussorgsky | arts | 19th_century / central_europe | risky | alt-dependent | 5 | 1 lowered | 5 | 8 | 1 | lead | shipped |
| kuroda-seiki | arts | 20th_century / east_asia | plausible | alt-dependent | 5 | 2 lowered | 5 | 6 | 2 | replacement | shipped |
| heinrich-heine | arts | 19th_century / western_europe | plausible | alt-dependent | 8 | 2 lowered | 8 | 9 | 1 | replacement | shipped |
| joseph-fourier | science | 19th_century / western_europe | strong | lead-robust | 9 | 4 lowered | 9 | 7 | 2 | lead | shipped |
| jan-evangelista-purkyne | science | 19th_century / central_europe | plausible | lead-robust | 7 | 4 lowered | 7 | 6 | 1 | replacement | shipped |
| kamerlingh-onnes | science | 20th_century / western_europe | plausible | alt-dependent | 9 | 7 lowered | 9 | 9 | 1 | replacement | shipped |
| jose-celestino-mutis | science | early_modern / latin_america | plausible | alt-dependent | 6 | 3 lowered | 6 | 9 | 1 | replacement | shipped |
| francisco-jose-de-caldas | science | 19th_century / latin_america | plausible | alt-dependent | 6 | 5 lowered | 6 | 8 | 1 | replacement | shipped |
| fritz-muller | science | 19th_century / latin_america | risky | alt-dependent | 8 | 4 lowered | 8 | 9 | 1 | replacement | shipped |
| adolfo-lutz | science | 19th_century / latin_america | risky | alt-dependent | 9 | 5 lowered | 9 | 9 | 2 | replacement | shipped |
| desiderius-erasmus | leadership | early_modern / western_europe | strong | lead-robust | 6 | 1 lowered | 6 | 7 | 1 | lead | shipped |
| juan-luis-vives | leadership | early_modern / southern_europe | strong | lead-robust | 5 | 1 lowered | 5 | 9 | 1 | lead | shipped |
| soren-kierkegaard | leadership | 19th_century / western_europe | plausible | lead-robust | 5 | 2 lowered | 5 | 8 | 2 | lead | shipped |
| wilhelm-von-humboldt | leadership | 19th_century / western_europe | plausible | alt-dependent | 5 | 1 lowered | 5 | 7 | 2 | replacement | shipped |
| tsuda-umeko | leadership | 19th_century / east_asia | risky | alt-dependent | 9 | 4 lowered | 9 | 9 | 2 | replacement | shipped |
| ahmad-amin | leadership | 20th_century / north_africa | risky | alt-dependent | 7 | 0 lowered | 7 | 5 | 2 | none | **held** |
| sri-aurobindo | leadership | 20th_century / south_asia | risky | alt-dependent | 7 | 3 lowered | 7 | 6 | 2 | replacement | shipped |

## Preflight accuracy: viability and lead-image survival

| Grade | Frozen | Shipped | Held | Initial lead survived | Replacement portrait shipped |
|---|---|---|---|---|---|
| strong | 6 | 6 | 0 | 6 | 0 |
| plausible | 18 | 16 | 2 | 3 | 13 |
| risky | 6 | 5 | 1 | 1 | 4 |
| **all** | 30 | 27 | 3 | 10 | 17 |

Candidate-level viability with the holder-record rule again separated outcomes: **strong 6/6 shipped,
plausible 16/18, risky 5/6**. **10 of the 27 shipped portraits (37%) are the initial lead; 17 (63%) are
replacement images**, the highest replacement share since Roster62: the plausible band was dominated by
leads whose holder page had not been opened, and 13 of 16 shipped plausible candidates were rescued by a
different route. All 6 strong candidates kept their lead (Wheatley, Di Stefano, Fourier, Erasmus, Vives
and Equiano). Of the 11 lead-robust candidates all 11 shipped (8 kept the lead; 3 needed replacement images: Siemens, Heinz and Purkyne); of the 19 alternative-dependent candidates 16 shipped (only Slater and Mussorgsky kept a lead; 14 with replacement images) and 3 were held (Tyan-Shansky, Velasco, Ahmad Amin).

**Why each plausible hold overestimated viability:**
- *Pyotr Semyonov-Tyan-Shansky (plausible)*: the freeze record itself said "Russian museums such as the
  Tretyakov assert rights in their images" and the Serov holder was unnamed. The Russian Museum record,
  opened at research time, confirmed the restriction. Lesson: when the preflight text records a known
  holder-restriction risk and no second concrete route exists, grade risky, not plausible.
- *Jose Maria Velasco (plausible)*: same pattern: the freeze record noted that Mexican federal collections
  often restrict reuse and that the museum page was unread, and no second route existed.

**Why the risky hold was accurate:** *Ahmad Amin* had only a jurisdiction-only PD claim and no dated
publication; one bounded retry confirmed it.

**What made each risky ship succeed:** all five (Mussorgsky, Fritz Muller, Adolfo Lutz, Tsuda Umeko, Sri
Aurobindo) were rescued by a **pre-1931 printed plate with its own caption naming the sitter**: the 1916
Montagu-Nathan frontispiece after Repin (Project Gutenberg), Die Gartenlaube 1892, The Popular Science
Monthly 1915, an NDL Portraits plate from a 1930 biography (item rule "ooc") and Lajpat Rai's *Young India*
(1916). Lesson for the next preflight: search Internet Archive/Gutenberg/NDL plates for captioned pre-1931
publications before grading a no-holder candidate risky.

**Holder-record contradictions found at research time (6):**
- Tyan-Shansky: Russian Museum terms and a restricted Gallica convention (ended in the hold).
- Velasco: INBAL "authorized reproduction" credit and an unreadable museum page (ended in the hold).
- Cyrus McCormick: the LoC item record for the engraving gives no date, an unverified engraver and only "No
  known restrictions" (replaced by an Allen & Ginter lithograph, Met Open Access object 420682).
- Shevchenko: the 1860 self-etching sits on kobzar.ua, whose licence allows personal non-commercial use only,
  and the museum source page now returns 404 (replaced by the 1862 Gartenlaube engraving).
- Heine: the Hamburger Kunsthalle record gives no licence, a 274x350 web image and a photo-agency order
  route (replaced by a Rijksmuseum etching with a Public Domain Mark).
- Wilhelm von Humboldt: the HU Berlin records carry a university-library copyright line, name a different
  lithographer than Commons, and tell users to contact the library (replaced by a Rijksmuseum lithograph).
Holds resulting specifically from a holder contradiction: **2** (Tyan-Shansky, Velasco).

**Inscription / caption / sitter contradictions: 0** (no visible lettering contradicted any holder or
Commons identification; 5 candidates with several caption lines were checked line by line, e.g. the Heine
etching dated 9 Nov 1827 and signed by Heine's hand, the Mutis plate dedicated by Humboldt and Bonpland, and
the Kamerlingh Onnes frame lettering). Two instructive near-misses were *avoided* by checking: the McCormick
card is captioned "C. H. M'Cormick", which also fits the inventor's son, so the identification was confirmed
against the Met title "Cyrus Hall McCormick" and the 1888 World's Inventors series; and the Humboldt
alternative Rijksmuseum print lettered "BARON HUMBOLDT, Prussian Minister at the Court of France" was
rejected because it does not unambiguously name Wilhelm. **Image identity rests on a holder title or record
rather than visible lettering for four shipped images**: Heinz (NPG record), Zhan Tianyou (Yale record;
only the studio imprint is on the mount), Kierkegaard (Royal Library title) and Di Stefano (caption order on a
four-man Anefo frame, crest visible).

## Exact structured handback totals (from the 30 per-candidate handback files)

- Initial rows scored by agents: **197** (shipped candidates 175, held candidates 22). Agent
  self-calibration lowered **49** rows (shipped 45, held 4); no row was added or removed by agents, so
  agent-final rows are also 197. **No agent raised a score or a confidence** (all 49 rows checked
  mechanically: new <= old for both fields). The exact rows with old -> new score / confidence:

  - pyotr-semyonov-tyan-shansky: mastery_orientation 74/0.6 -> 72/0.55
  - adolf-erik-nordenskiold: planning_orientation 76/0.66 -> 72/0.62
  - adolf-erik-nordenskiold: persuasiveness 70/0.54 -> 66/0.48
  - werner-von-siemens: opportunity_sensing 76/0.64 -> 72/0.58
  - werner-von-siemens: achievement_drive 72/0.52 -> 68/0.46
  - cyrus-mccormick: persuasiveness 66/0.52 -> 62/0.46
  - cyrus-mccormick: creative_originality 60/0.44 -> 56/0.4
  - alfredo-di-stefano: competitiveness 74/0.58 -> 70/0.52
  - alfredo-di-stefano: leadership_drive 70/0.55 -> 66/0.5
  - zhan-tianyou: analytical_rigor 70/0.55 -> 66/0.5
  - zhan-tianyou: planning_orientation 66/0.52 -> 62/0.46
  - henry-john-heinz: opportunity_sensing 72/0.55 -> 68/0.5
  - henry-john-heinz: resourcefulness 70/0.55 -> 66/0.5
  - henry-john-heinz: social_assertiveness 64/0.45 -> 60/0.4
  - samuel-slater: opportunity_sensing 70/0.55 -> 66/0.5
  - samuel-slater: systems_abstraction 62/0.45 -> 56/0.38
  - phillis-wheatley: curiosity 68/0.5 -> 64/0.45
  - olaudah-equiano: persistence 68/0.55 -> 64/0.5
  - olaudah-equiano: conflict_tolerance 64/0.48 -> 60/0.42
  - taras-shevchenko: creative_originality 72/0.55 -> 68/0.5
  - taras-shevchenko: impact_motivation 66/0.5 -> 62/0.45
  - ruben-dario: creative_originality 74/0.55 -> 70/0.5
  - ruben-dario: aesthetic_sensitivity 68/0.5 -> 64/0.45
  - jose-maria-velasco: detail_orientation 74/0.6 -> 72/0.55
  - modest-mussorgsky: independent_thinking 66/0.55 -> 62/0.5
  - kuroda-seiki: conflict_tolerance 66/0.56 -> 62/0.5
  - kuroda-seiki: risk_tolerance 60/0.48 -> 56/0.42
  - heinrich-heine: independent_thinking 72/0.58 -> 68/0.54
  - joseph-fourier: systems_abstraction 74/0.6 -> 70/0.56
  - joseph-fourier: collaboration 60/0.5 -> 56/0.46
  - jan-evangelista-purkyne: creative_originality 70/0.55 -> 66/0.5
  - kamerlingh-onnes: persuasiveness 72/0.58 -> 68/0.52
  - jose-celestino-mutis: independent_thinking 70/0.54 -> 66/0.5
  - francisco-jose-de-caldas: analytical_rigor 76/0.6 -> 74/0.56
  - fritz-muller: detail_orientation 82/0.7 -> 78/0.64
  - adolfo-lutz: leadership_drive 36/0.52 -> 36/0.46
  - adolfo-lutz: risk_tolerance 62/0.5 -> 58/0.44
  - desiderius-erasmus: autonomy_need 66/0.48 -> 66/0.42
  - juan-luis-vives: impact_motivation 60/0.45 -> 56/0.4
  - soren-kierkegaard: creative_originality 74/0.56 -> 70/0.52
  - soren-kierkegaard: discipline 68/0.5 -> 64/0.45
  - wilhelm-von-humboldt: curiosity 72/0.52 -> 68/0.48
  - wilhelm-von-humboldt: systems_abstraction 70/0.5 -> 64/0.44
  - tsuda-umeko: impact_motivation 72/0.55 -> 68/0.5
  - tsuda-umeko: persuasiveness 66/0.52 -> 60/0.46
  - ahmad-amin: mastery_orientation 68/0.52 -> 64/0.46
  - ahmad-amin: impact_motivation 64/0.5 -> 60/0.45
  - sri-aurobindo: persistence 72/0.58 -> 70/0.52
  - sri-aurobindo: creative_originality 68/0.5 -> 62/0.44
- **Lead review (27 shipped candidates fully reviewed)** lowered **58 further rows in 22 candidates**
  (below) and **removed 0 rows**, so the final candidate files hold **197 rows** (shipped 175, held 22).
- Major Achievement gate, first pass, agent level: **0 failures in 150 checks** (30 candidates x 5
  checks). Lead Achievement corrections: **0** (the first card states the defining contribution for all
  27, verified on the rendered pages in both locales).

## Lead review

All first Achievement cards state the defining contribution. **Fifty-eight rows in twenty-two candidates
were lowered with `RUBRIC_CORRECTION` (downward only, before eligibility)**. The common pattern is
single-biographer or single-reference-entry dependence: Kamerlingh Onnes (7 rows resting on one historian,
two papers counting as one perspective), Lutz (one historian plus an obituary-style article), Caldas
(a blog relaying a nineteenth-century biographer, contested priority), Fourier (one DSB entry), Purkyne,
Muller, Mutis (self-report in his own 1764 letter), Tsuda (one Tsuda-University author) and Sri Aurobindo
(the Ashram's own sketch plus reviews of one biography):

| Candidate | Row | Old -> new (score/confidence) | Reason (summary) |
|---|---|---|---|
| adolf-erik-nordenskiold | collaboration | 70/0.58 -> 66/0.52 | two sources only (a polar profile and the DSB), both retrospective and admiring |
| adolf-erik-nordenskiold | detail_orientation | 70/0.56 -> 66/0.5 | rests on one library article calling him orderly in acquiring maps |
| werner-von-siemens | analytical_rigor | 70/0.58 -> 66/0.52 | the DSB and an 1893 sketch drawn largely from his own memoir carry the claim |
| werner-von-siemens | collaboration | 68/0.58 -> 64/0.52 | the family-network account leans on the company-owned biography, which is self-interested |
| cyrus-mccormick | persistence | 72/0.58 -> 68/0.52 | institutional biographies and a museum page retell the same standard account |
| henry-john-heinz | persistence | 70/0.6 -> 66/0.54 | the failure-and-restart account is one biographer plus an institutional blog, and the diary is self-report |
| samuel-slater | risk_tolerance | 68/0.55 -> 64/0.5 | the disguised-departure story is part of the heroic tradition that the scholarly source challenges |
| samuel-slater | proactive_agency | 68/0.55 -> 64/0.5 | the offer-letter account comes largely from park and museum pages repeating one tradition |
| taras-shevchenko | cross_domain_range | 72/0.58 -> 68/0.52 | the three sources are one encyclopedia and museum pages that admire him, with no independent critic of the painting |
| modest-mussorgsky | creative_originality | 78/0.66 -> 74/0.6 | the praise is encyclopedic and retrospective, and the closest critic (Rimsky-Korsakov) edited his work |
| kuroda-seiki | proactive_agency | 70/0.6 -> 66/0.54 | the school-reform account is mostly the memorial institute's own essay |
| kuroda-seiki | collaboration | 58/0.5 -> 54/0.44 | the friendship with Kume is documented only by the same institute essay |
| heinrich-heine | conflict_tolerance | 76/0.64 -> 72/0.58 | the quarrels come from a chronology and two reference works, and Kraus's hostile essay is polemic |
| heinrich-heine | creative_originality | 76/0.6 -> 72/0.56 | the praise is retrospective reference-work summary |
| joseph-fourier | creative_originality | 76/0.62 -> 72/0.56 | the strongest statements come from one Dictionary of Scientific Biography entry |
| joseph-fourier | independent_thinking | 72/0.6 -> 68/0.54 | rests on the DSB and MacTutor reading the same episode |
| joseph-fourier | systems_abstraction | 70/0.56 -> 66/0.5 | one expert entry and two short retrospective summaries |
| joseph-fourier | cross_domain_range | 70/0.58 -> 66/0.52 | the breadth is listed by one DSB entry rather than examined independently |
| jan-evangelista-purkyne | experimentation | 78/0.66 -> 74/0.58 | the self-experiment account rests on one review article (Ellis) |
| jan-evangelista-purkyne | curiosity | 76/0.62 -> 72/0.56 | a list of investigations drawn from three retrospective reference sources |
| jan-evangelista-purkyne | proactive_agency | 72/0.62 -> 68/0.56 | the institution-building account is reference-work summary and one journal article |
| jan-evangelista-purkyne | cross_domain_range | 72/0.6 -> 68/0.54 | breadth asserted by Britannica and a medical-history article, with no independent assessment |
| kamerlingh-onnes | persistence | 82/0.68 -> 76/0.58 | nearly all behavioural detail comes from one historian (van Delft, two papers count as one perspective) |
| kamerlingh-onnes | analytical_rigor | 80/0.66 -> 74/0.58 | one historian and the DSB, both admiring |
| kamerlingh-onnes | planning_orientation | 78/0.64 -> 72/0.56 | the laboratory reorganisation is documented by one historian |
| kamerlingh-onnes | experimentation | 78/0.66 -> 72/0.58 | the helium trial is told by one historian |
| kamerlingh-onnes | resourcefulness | 76/0.64 -> 70/0.56 | the helium-supply account rests on one historian |
| kamerlingh-onnes | leadership_drive | 76/0.62 -> 70/0.54 | the cold-factory management style is one historian's interpretation, with no technician or official account read |
| kamerlingh-onnes | perfectionism | 70/0.58 -> 66/0.5 | two sources, one of them the same historian |
| jose-celestino-mutis | cross_domain_range | 76/0.58 -> 72/0.52 | the Catholic Encyclopedia of 1911 and a celebratory lecture carry the breadth |
| jose-celestino-mutis | curiosity | 74/0.58 -> 68/0.5 | diary entries come through one article and the evidence includes a self-authored letter |
| jose-celestino-mutis | proactive_agency | 72/0.56 -> 68/0.5 | the 1763 plan is known mainly from his own 1764 letter (self-report) |
| francisco-jose-de-caldas | resourcefulness | 78/0.6 -> 72/0.52 | the thermometer repair is told by a blog relaying a nineteenth-century biographer, and priority is contested |
| francisco-jose-de-caldas | cross_domain_range | 76/0.6 -> 72/0.54 | the DSB and tributes list the fields without independent assessment |
| francisco-jose-de-caldas | analytical_rigor | 74/0.56 -> 68/0.5 | the boiling-point reasoning reaches us through a blog and a patriotic tribute |
| francisco-jose-de-caldas | curiosity | 74/0.56 -> 70/0.5 | self-teaching is stated by the DSB and the same blog |
| francisco-jose-de-caldas | proactive_agency | 72/0.56 -> 68/0.5 | the Humboldt contact is told by one scholarly article and the DSB |
| fritz-muller | curiosity | 78/0.66 -> 74/0.6 | the ADB, NDB and DSB repeat one biographical tradition |
| fritz-muller | detail_orientation | 78/0.64 -> 74/0.58 | Darwin's single epithet is repeated by four sources and only two concrete observations are described |
| fritz-muller | cross_domain_range | 76/0.64 -> 72/0.58 | listed by the DSB and echoed by the others |
| fritz-muller | analytical_rigor | 72/0.6 -> 68/0.54 | the mathematical argument is described by critics of the mimicry model, not independently verified |
| adolfo-lutz | cross_domain_range | 80/0.68 -> 76/0.62 | the breadth rests on an obituary-style article (Rey) and one historian (Benchimol) |
| adolfo-lutz | experimentation | 78/0.66 -> 72/0.58 | the 1902 yellow-fever series is described by a single historian |
| adolfo-lutz | analytical_rigor | 74/0.62 -> 70/0.56 | one historian carries the claim about his proofs and experimental design |
| adolfo-lutz | independent_thinking | 72/0.6 -> 68/0.54 | the controversies are narrated by the same historian |
| adolfo-lutz | persistence | 72/0.6 -> 68/0.54 | the leprosy-mosquito conviction comes from one pair of related papers by the same authors |
| desiderius-erasmus | cross_domain_range | 72/0.54 -> 68/0.48 | the SEP and his own 1523 catalogue (self-report) carry the breadth |
| juan-luis-vives | cross_domain_range | 72/0.52 -> 68/0.48 | the SEP list carries the breadth, no independent source examines it, and only an abstract of Hwang was read |
| soren-kierkegaard | independent_thinking | 74/0.58 -> 70/0.52 | Britannica, SEP and IEP summarise the same break with Hegelian and church establishments; no independent assessment of the process |
| soren-kierkegaard | cross_domain_range | 70/0.54 -> 66/0.5 | the list of genres comes from two encyclopedias without independent assessment |
| wilhelm-von-humboldt | cross_domain_range | 78/0.56 -> 74/0.52 | the SEP list is the main support and the other sources are partial readings |
| tsuda-umeko | proactive_agency | 76/0.6 -> 72/0.54 | the Bryn Mawr and school-planning account rests mainly on one biographer (Kunieda) and school histories |
| tsuda-umeko | persistence | 72/0.56 -> 68/0.5 | the never-gave-up account is one biographer reading of her letters |
| tsuda-umeko | resourcefulness | 72/0.56 -> 68/0.5 | the funding-network account is the same biographer and school-history pages |
| tsuda-umeko | impact_motivation | 68/0.5 -> 64/0.46 | motive is read from the account of the declined research post by the same biographer |
| sri-aurobindo | cross_domain_range | 70/0.55 -> 66/0.5 | the list of works comes from the Ashram sketch and reviews of an admiring biography |
| sri-aurobindo | persistence | 70/0.52 -> 66/0.46 | the uninterrupted-journal claim is the Ashram own sketch repeated by a reviewer |
| sri-aurobindo | discipline | 68/0.5 -> 64/0.44 | the daily routine is documented only through the Ashram sketch and a biography review |

**Removed rows (separate from score lowerings): none.** Other lead decisions:
- Kierkegaard's portrait kind changed from `likeness` to `historical_depiction` (the c.1840 pencil drawing
  has no source documenting a sitting and the sitter is identified by the holder title alone).
- Di Stefano's region kept as `latin_america` (the footballer precedents Messi, Puskas and Cruyff follow
  origin; the Domeyko career-base rule would give southern_europe, recorded as a judgment call).
  Mutis and Muller (`latin_america`) follow the career-base rule (48 and 40+ years in New Granada and
  Brazil); Vives is `southern_europe` (Servetus precedent, though his career was in Bruges, Louvain and
  Oxford); Equiano is `western_europe` (Sancho precedent); Zhan Tianyou's era is `20th_century` (defining
  work 1905-09).
- Two source URLs returned 404 in the link sweep and were corrected (Kierkegaard's IEP page, now
  `https://iep.utm.edu/kierkega/`; Shevchenko's Wikisource page, now
  `https://de.wikisource.org/wiki/Seite:Die_Gartenlaube_(1862)_437.jpg`); the build and the focused
  Playwright suite were re-run afterwards.
- Judgment calls kept: Zhan Tianyou's Yale 1881 student photograph (identity by the Yale record; US public
  domain by age), Kuroda's 521x741 plate (photograph first published in Japan in 1941; the NDL item says
  out of copyright), Caldas's A. Maurin lithograph from a 1909 book (the weakest rights basis of the
  batch: pre-1931 publication of an older print with no holder statement), Purkyne's CC BY Wellcome
  photograph of an undated Maixner painting (attribution recorded), Shevchenko's and Fritz Muller's
  unsigned Gartenlaube wood engravings, and Lutz's 1915 halftone whose Commons title cites page "D174"
  while the printed plate is page 170. No candidate was lowered to reach or avoid a threshold, and no
  eligibility was consulted before the rows were frozen.

## Portrait review (27 shipped)

Each portrait was checked against its candidate record (sitter, **visible lettering**, creator, date,
provenance, underlying source, holder/item record, licence rationale and URL, attribution, dimensions, no
upscaling, kind), viewed together on a contact sheet, and rendered at 375x812 in both locales. Kinds (from
the candidate files): **likeness 11** (Nordenskiold, Di Stefano, Zhan Tianyou, Heinz, Mussorgsky, Kuroda,
Heine, Kamerlingh Onnes, Lutz, Tsuda, Sri Aurobindo), **historical_depiction 16**. Holders and bases:
Met Open Access (Wheatley; McCormick), Rijksmuseum PDM + CC0 (Erasmus, Vives, Heine, Humboldt), Wellcome PDM
(Fourier, Mutis) and CC BY (Purkyne), Leiden University Libraries PDM (Onnes), Smithsonian NPG CC0 (Heinz),
Paris Musees CC0 (Nordenskiold), Nationaal Archief CC0 (Di Stefano), Yale Library public domain (Zhan),
NDL item records "ooc" (Kuroda, Tsuda), British Library PDM (Equiano), and documented pre-1931 plates
without a holder statement (Slater, Siemens, Dario, Shevchenko, Muller, Lutz, Mussorgsky, Sri Aurobindo,
Caldas). Dimensions: all downscaled or cropped, none upscaled; the smallest is Kuroda (521x741).
Caveats are carried in the candidate notes: the age-only bases above; Kierkegaard's
c.1840 drawing relies on the Royal Danish Library's Flickr "no known restrictions" label plus the
draughtsman's death in 1882, with the reproduction photograph's date unknown (Danish law gives simple
photographs a separate short term).

## Eligibility (computed only after all scores were frozen)

No rescue: after seeing results no row was added, no score or confidence raised, and nothing favourably
reinterpreted. `evaluateMatchEligibility()` (`eligibility_v2`: scored >= 18, coverage >= 0.6, high-
confidence subset) per shipped candidate (HC = rows at confidence >= 0.5):

| Slug | Scored rows | Avg confidence | Coverage | HC count (conf >= 0.5; need 12) | HC average (need 0.55) | Eligible |
|---|---|---|---|---|---|---|
| adolf-erik-nordenskiold | 10 | 0.534 | 0.296 | 7 | 0.566 | no |
| adolfo-lutz | 9 | 0.536 | 0.274 | 7 | 0.560 | no |
| alfredo-di-stefano | 4 | 0.485 | 0.117 | 3 | 0.507 | no |
| cyrus-mccormick | 6 | 0.480 | 0.180 | 3 | 0.520 | no |
| desiderius-erasmus | 6 | 0.487 | 0.178 | 3 | 0.513 | no |
| francisco-jose-de-caldas | 6 | 0.517 | 0.181 | 6 | 0.517 | no |
| fritz-muller | 8 | 0.574 | 0.245 | 8 | 0.574 | no |
| heinrich-heine | 8 | 0.535 | 0.241 | 7 | 0.543 | no |
| henry-john-heinz | 8 | 0.480 | 0.236 | 6 | 0.507 | no |
| jan-evangelista-purkyne | 7 | 0.551 | 0.215 | 7 | 0.551 | no |
| jose-celestino-mutis | 6 | 0.510 | 0.178 | 6 | 0.510 | no |
| joseph-fourier | 9 | 0.509 | 0.273 | 6 | 0.533 | no |
| juan-luis-vives | 5 | 0.456 | 0.153 | 1 | 0.520 | no |
| kamerlingh-onnes | 9 | 0.547 | 0.266 | 9 | 0.547 | no |
| kuroda-seiki | 5 | 0.484 | 0.143 | 3 | 0.520 | no |
| modest-mussorgsky | 5 | 0.526 | 0.159 | 4 | 0.538 | no |
| olaudah-equiano | 5 | 0.484 | 0.149 | 3 | 0.517 | no |
| phillis-wheatley | 4 | 0.450 | 0.120 | 1 | 0.550 | no |
| ruben-dario | 5 | 0.464 | 0.139 | 2 | 0.500 | no |
| samuel-slater | 5 | 0.460 | 0.149 | 3 | 0.500 | no |
| soren-kierkegaard | 5 | 0.498 | 0.152 | 4 | 0.510 | no |
| sri-aurobindo | 7 | 0.470 | 0.223 | 2 | 0.525 | no |
| taras-shevchenko | 5 | 0.478 | 0.152 | 3 | 0.507 | no |
| tsuda-umeko | 9 | 0.484 | 0.264 | 5 | 0.512 | no |
| werner-von-siemens | 10 | 0.524 | 0.291 | 8 | 0.537 | no |
| wilhelm-von-humboldt | 5 | 0.468 | 0.147 | 1 | 0.520 | no |
| zhan-tianyou | 4 | 0.455 | 0.114 | 1 | 0.500 | no |

**0 of 27 are match-eligible; the eligible set stays exactly 114** (asserted by the Roster66 audit: 114
eligible outside the 27 targets, 114 + 0 in total). Batch min / median / max over the 27: scored 4 / 6 / 10;
average confidence 0.450 / 0.485 / 0.574; coverage 0.114 / 0.178 / 0.296; HC count 1 / 4 / 9; HC average
0.500 / 0.520 / 0.574. The richest profiles (Fritz Muller 8 rows, Tsuda Umeko and Lutz 9, Kamerlingh Onnes
9, Nordenskiold 10, Siemens 10 in the files) remain well below the 18-row floor and the 0.6 coverage floor.
Cumulative Roster33-66: **564 shipped, 0 match-eligible** (537 + 27).

## Counts and categories

| | Before (base) | After |
|---|---|---|
| Production | 762 | **789** |
| Directory-visible | 761 | **788** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 937 | **967** (+30 frozen candidates; 200 non-production research/holds = 197 + 3) |

Literal `categoryCounts.ts 66` output:

```
before roster66: {"production":762,"visible":761,"categoriesProduction":{"science_knowledge":312,"arts_culture":280,"leadership_society":139,"building_discovery":245},"categoriesVisible":{"science_knowledge":312,"arts_culture":280,"leadership_society":138,"building_discovery":244}}
after roster66:  {"production":789,"visible":788,"categoriesProduction":{"science_knowledge":327,"arts_culture":290,"leadership_society":147,"building_discovery":251},"categoriesVisible":{"science_knowledge":327,"arts_culture":290,"leadership_society":146,"building_discovery":250}}
```

Deltas +15 science, +10 arts, +8 leadership, +6 building = 39 memberships for 27 people, because a person
counts once in every category containing any of their `fieldIds` (12 extra memberships from multi-category
people). Person-by-person reconciliation, read from the live `PROFESSION_CATEGORIES` mapping on the 27
shipped records:

| Category | Delta | People |
|---|---|---|
| science_knowledge | +15 | Nordenskiold, Lutz, McCormick, Caldas, Muller, Purkyne, Mutis, Fourier, Vives, Kamerlingh Onnes, Kierkegaard, Sri Aurobindo, Siemens, Humboldt, Zhan Tianyou |
| arts_culture | +10 | Erasmus, Heine, Kuroda, Mussorgsky, Equiano, Wheatley, Dario, Kierkegaard, Sri Aurobindo, Shevchenko |
| leadership_society | +8 | Erasmus, Caldas, Vives, Kuroda, Kierkegaard, Sri Aurobindo, Tsuda, Humboldt |
| building_discovery | +6 | Nordenskiold, Di Stefano, McCormick, Heinz, Slater, Siemens |

Multi-category: Kierkegaard and Sri Aurobindo (3 categories each); Nordenskiold, McCormick, Siemens, Erasmus,
Caldas, Vives, Kuroda and Humboldt (2 each). The single Zheng He production-vs-visible gap in leadership and
building is unchanged (139 vs 138 and 245 vs 244 before; 147 vs 146 and 251 vs 250 after). No unreconciled
change.

## 1000-person lane status (no scale checkpoint)

Production **789**, **211** people from 1000. The ~750 checkpoint classified the project `EXPANSION_GREEN`
and the next planned scale checkpoint is about **1000** production people, unless a real regression
appears earlier. **No scale checkpoint, benchmark or optimization was run, started or mixed into this
branch**, and none of the checkpoint's optional/watch items was implemented.

## Validation

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: **0 errors, 0 warnings** across 967 candidate files (789 evidence_approved, 93
  qa_passed, 85 held).
- Roster66 audit (`roster66.test.ts`): **462 tests pass** (candidate<->production equality for the 27
  shipped, absence of all 3 holds and every earlier hold from production, the three portrait holds
  `evidence_approved` with `portrait.status: held`, identity integrity: no shipped person matches any OTHER
  production person by slug, normalized name, alias, token set or QID, no held candidate matches production,
  global uniqueness of ids, slugs and non-null QIDs). All three holds are portrait holds, so no
  evidence-blocker assertion was needed or faked.
- Full Vitest: **8335 passed / 8335, 96 files** (re-run after the link fix).
- Calibration (`calibrate.ts quiz`) run twice: output identical, `meanSd=11.704`, eligible set identical
  (114), generated `dispersion.generated.ts` blob hash `73e03834...` both times and equal to HEAD (the only
  working-tree difference is line-ending noise, restored with `git checkout`). Not tuned.

## Final build

`next build --webpack` exit 0, run after the last production-visible change (the two source-link fixes):
`✓ Generating static pages using 21 workers (1602/1602) in 11.4s`, compile 23.7 s. Formula check
`2 x production_count + 24 = 2 x 789 + 24 = 1602` holds (routing unchanged).

## Playwright

Focused suite (Person, Editorial, Directory, Compare, Trait Explanation: `person.visual`, `editorial`,
`peopleDirectory`, `compare.visual`, `traitExplanation`, `--workers=1`): **first run 142 passed (3.6 min), 0
failures**, and **142 passed again (3.4 min) after the last user-visible change** (the two link fixes). The
cross-facet Directory assertion (`17`) did not move (none of the 27 newly crosses both thresholds). The whole
286-spec suite was **not** run (diagnostic/optional); only the focused suite is claimed.

## Local QA

- Production-built server on a local port: all 27 shipped people return **EN 200, KO 200, portrait 200**
  (portrait URL read from each rendered page's `<img src>`); the 3 holds return **404 in both locales**; the
  Directory shows "788 people".
- 375x812 sweep in both locales (54 page loads, 27 people x 2): **0 horizontal overflow, 0 broken images
  (after forcing lazy images to load), 0 raw internal ids** (`p_*`, `src_*`, evidence-type or handback
  strings), every page shows a hero portrait with a credit line of at least 40 characters, **Korean names
  render** (e.g. 아돌프 에리크 노르덴셸드, 알프레도 디 스테파노, 쇠렌 키르케고르 pattern) and the **first
  Achievement card renders in both locales for all 27**. The browser console log was empty of errors for the
  QA tab (page-level; errors raised inside the sweep's hidden frames are not separately captured, and a
  separate real-navigation pass over six pages showed none).
- Source-link sweep: 218 unique source URLs across the 27 shipped candidates: **192 returned 200**, 1 returned
  202 (Yale record, accepted), 16 returned 403 and 3 returned 429 (Britannica x8, Scotsman, Poetry
  Foundation, Paris Review, NPG, St George's Windsor, Leiden handle and the Met pages), 1 returned 502
  (SciELO) and 3 timed out (British Library, Dialnet, SciELO): bot walls and transient errors on pages the
  agents opened and read through APIs or alternative records. **Two genuine 404s were corrected** (IEP and
  Wikisource, above); no other URL was changed.

## Defects

- Preflight overestimates: Tyan-Shansky and Velasco were graded plausible although the freeze text already
  recorded a holder-restriction risk (lesson above).
- Two broken source URLs (IEP Kierkegaard; Wikisource Gartenlaube page) found by the sweep and fixed.
- Agent interruptions: one usage-limit episode stopped four agents mid-run; nothing was lost (work saved to
  disk) and the groups were resumed with their context.
- Tooling: two wiring/regeneration helper scripts needed manual patching for string escapes; they live
  outside the repository.
- No defect in product code. No agent raised a score. No benchmark, rescue, Legacy Batch 6, maintenance
  refactor or scale-checkpoint work was triggered.

## Deferred work and state

- The 3 holds stay researched and unpromoted (blockers and next steps above); a reopened hold needs a fresh
  lead review.
- Strategic lane **762 -> ~1000** continues; **211** to go; the next planned scale checkpoint is about 1000.
- **Roster67 is not started.**
