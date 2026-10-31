# Roster60: sixth 30-candidate roster (2026-10-31)

`ROSTER60_BASE_SHA`: `5c359ff37fce9cee6f57cd730d816e8ac1e27005`, the merge of PR
#72 (Roster59). Guards verified before merging: PR #72 open, mergeable, clean, not
draft, base `f107f12f24ddc093863e0b6f7f9ead62128c277d` and head
`e6aa31faa3c139111860ff8bd887643514579faa` exactly as reviewed, two commits, 0 behind
base, Vercel SUCCESS on that head, no review thread, no comment beyond the Vercel bot.
Merged with a normal merge commit, guarded on the head (`--match-head-commit`);
parents `f107f12f...` and `e6aa31fa...`, merged 2026-10-31T02:02:18-06:00. The
500-person scale checkpoint remains **EXPANSION_GREEN** (lane 500 -> 750). No benchmark
was run.

Starting state (mechanically confirmed): production 637, directory-visible 636,
match-eligible 114, candidate JSON 757, non-production candidate files 142, legacy
baseline 22 / 0 flagged.

**Roster59 deployed-site verification (after the PR #72 merge and production deploy,
deployment SHA = the merge SHA):** 18/18 EN profile routes 200, 18/18 KO routes 200,
18/18 portrait URLs 200; the 12 Roster59 holds return 404 in both locales; the Directory
showed "636 people".

**Canonical category counts at the Roster60 base** (`categoryCounts.ts`, literal):

```
current: {"production":637,"visible":636,"categoriesProduction":{"science_knowledge":251,"arts_culture":233,"leadership_society":108,"building_discovery":204},"categoriesVisible":{"science_knowledge":251,"arts_culture":233,"leadership_society":107,"building_discovery":203}}
```

These equal the Roster59 checkpoint's expected end-of-Roster59 values on both bases
(the production-vs-visible leadership/building gap of one is Zheng He).

## Candidate pool and identity gate

- **Pool**: 93 proposals in two waves (54, then 39; a first wave leaned too heavily on
  East and South Asia, so a second wave added Africa, Latin America, the Middle East and
  Central Asia). This is above the 45-60 target.
- **Gate**: `src/dev/roster1000/identityGate.ts`, run on every proposal against all 637
  production people (slug, normalized name, alias, token-set / name order, QID, and a
  review tier). This cycle the gate gained a small machine-readable summary
  (`summarize()`, `--json`, optional `--dispositions <file>`) that reports per candidate
  its hard matches, review matches and a final disposition (`clean`, `duplicate`,
  `needs_adjudication`, `rejected_same_person`, `retained`, `blocked_uncertain`); the
  original command-line use is unchanged. Summary of the final 30 is in
  `gate60_summary.json` (session scratch, not committed): 30 clean.
- **Hard duplicates rejected before freeze (not researched)**: **gertrude-bell**
  (production `gertrude-bell`) and **taha-hussein** (production `taha-hussein`), both by
  slug and normalized name. The other 91 proposals had no hard match.
- **Existing held backlog files excluded** (not reopened, no new signal): ibn-al-nafis,
  nasir-al-din-al-tusi.
- **Review-tier matches**: the tool produced **0**. Two near-name collisions were also
  examined by hand and recorded with an explicit disposition: *Ramanuja* (11th-century
  Vaishnava philosopher) vs production *Srinivasa Ramanujan* (20th-century mathematician)
  = **different_person** (different era, field and name; Ramanuja was not selected anyway);
  *R. K. Narayan* (novelist, Q334252) vs production *N. R. Narayana Murthy* (Infosys
  founder) = **different_person** (different people with an unrelated shared fragment;
  Narayan was selected and the final-30 gate gives him zero hard or review matches).
- **Final 30** passed the gate with their QIDs: 0 hard duplicates, no QID in production
  and none in any of the 757 candidate files.
- **Standing assertions**: `roster60.test.ts` (inherited from `roster59.test.ts`) asserts
  that no Roster60 target and no Roster60 hold matches any other production person by
  name, alias, slug or QID, in addition to the global uniqueness tests (ids, slugs,
  non-null QIDs). No review-tier collision was accepted this cycle, so no
  review-acceptance evidence needed to be added to the tests.

## ROSTER60_FROZEN_30: 7 shipped, 23 held, 0 backlog reuse

Declared after the identity gate, review-tier adjudication, portrait preflight and
portfolio/region balancing, with no later substitution. Portfolio 8 building / 8 arts / 7
science / 7 leadership-society. The frozen set was deliberately spread across regions
and eras (sub-Saharan Africa 3, Latin America 7, West Asia 4, Central Asia 1, East Asia
7, South Asia 6, Southern Europe 1, North Africa 1), including 12 pre-modern figures.

**Portrait-viability preflight (all 30, before research):** strong 3 (Hafez, Navoi,
Bello), plausible 9 (Keino, Milla, Lee Kun-hee, Salif Keita, Tezuka, Salim Ali, Abduh,
Dogen, Sayyid Ahmad Khan), risky 18. Outcome against grade: strong held 1 of 3 (Navoi),
plausible held 4 of 9 (Milla, Salim Ali, Dogen, Sayyid Ahmad Khan), and risky held 18 of 18
(no risky candidate shipped). The preflight grade is
informational and is recorded in each candidate's `provenance.notes` and in the
structured handback. This cycle's pattern is notable: most leads were photographs of
statues, stamps, uploader-only scans or jurisdiction-only public-domain tags, which the
agents correctly rejected, so only 7 of 30 had a concrete rights basis.

Table columns: initial rows = rows scored before agent self-calibration; final rows =
rows in the candidate; sources = source records in the candidate file; lowered = rows
the agent lowered at self-calibration.

| Slug | Portfolio | Region | Initial rows | Final rows | Sources | Preflight | Agent-lowered | Outcome |
|---|---|---|---|---|---|---|---|---|
| kip-keino | building | sub_saharan_africa | 5 | 5 | 9 | plausible | 1 | shipped |
| roger-milla | building | sub_saharan_africa | 4 | 4 | 8 | plausible | 2 | **held** |
| garrincha | building | latin_america | 3 | 3 | 7 | risky | 2 | **held** |
| evliya-celebi | building | west_asia | 4 | 4 | 6 | risky | 1 | **held** |
| fa-xian | building | east_asia | 4 | 4 | 5 | risky | 1 | **held** |
| nain-singh-rawat | building | south_asia | 5 | 5 | 5 | risky | 1 | **held** |
| lee-kun-hee | building | east_asia | 6 | 6 | 7 | plausible | 1 | shipped |
| azim-premji | building | south_asia | 6 | 6 | 6 | risky | 1 | **held** |
| hafez | arts | west_asia | 3 | 3 | 6 | strong | 1 | shipped |
| salif-keita | arts | sub_saharan_africa | 8 | 8 | 10 | plausible | 1 | shipped |
| violeta-parra | arts | latin_america | 7 | 7 | 10 | risky | 2 | **held** |
| clarice-lispector | arts | latin_america | 4 | 4 | 7 | risky | 1 | **held** |
| alisher-navoi | arts | central_asia | 4 | 4 | 6 | strong | 1 | **held** |
| osamu-tezuka | arts | east_asia | 4 | 4 | 6 | plausible | 2 | shipped |
| r-k-narayan | arts | south_asia | 4 | 4 | 6 | risky | 2 | **held** |
| wifredo-lam | arts | latin_america | 5 | 5 | 7 | risky | 1 | **held** |
| al-zahrawi | science | southern_europe | 4 | 4 | 7 | risky | 1 | **held** |
| al-kindi | science | west_asia | 5 | 5 | 8 | risky | 1 | **held** |
| vital-brazil | science | latin_america | 7 | 7 | 8 | risky | 0 | **held** |
| cesar-lattes | science | latin_america | 7 | 7 | 7 | risky | 1 | **held** |
| shen-kuo | science | east_asia | 5 | 5 | 6 | risky | 1 | **held** |
| salim-ali | science | south_asia | 7 | 7 | 8 | plausible | 0 | **held** |
| jang-yeong-sil | science | east_asia | 4 | 4 | 8 | risky | 0 | **held** |
| andres-bello | leadership/society | latin_america | 6 | 6 | 8 | strong | 1 | shipped |
| muhammad-abduh | leadership/society | north_africa | 5 | 5 | 6 | plausible | 1 | shipped |
| ibn-arabi | leadership/society | west_asia | 3 | 3 | 6 | risky | 1 | **held** |
| dogen | leadership/society | east_asia | 5 | 5 | 7 | plausible | 1 | **held** |
| yi-hwang | leadership/society | east_asia | 5 | 5 | 8 | risky | 1 | **held** |
| sayyid-ahmad-khan | leadership/society | south_asia | 4 | 4 | 7 | plausible | 1 | **held** |
| kabir | leadership/society | south_asia | 2 | 2 | 6 | risky | 1 | **held** |

Shipped portfolio 2 building / 3 arts / 0 science / 2 leadership-society. Regions of the
shipped 7: sub_saharan_africa 2, east_asia 2, west_asia 1, latin_america 1, north_africa 1.
No science candidate shipped: all seven science people (Al-Zahrawi, Al-Kindi, Vital Brazil,
Lattes, Shen Kuo, Salim Ali, Jang Yeong-sil) were held on portrait rights; their research is
reusable. No one was selected for a partisan or electoral identity; political context is
unscored (Abduh's Urabi-revolt exile and government posts, Bello's diplomatic posts and
Chilean Senate seat, Keino's sports-body politics, Lee's convictions and pardons).
Research ran four agents at a time in 10 groups of three; the usage limit cut off one
group mid-work (G10) and it was resumed from saved work; no candidate was redone or
replaced.

## Held candidates

All 23 are `evidence_approved` with `portrait.status: held`, outside the generator
allowlist and absent from production (all research is reusable). No replacement was
added. Every hold was made by the research agent after one bounded retry; the lead
reviewed each reason and agreed. **These held candidates were not subjected to a full lead
score review**; any future reopening requires a fresh lead review of every row.

| Slug | Exact portrait blocker | Next step |
|---|---|---|
| roger-milla | the best image (Commons `Milla2008cropped.jpg`, Jmex, CC BY-SA 3.0, 1600x1981) rests only on an uploader own-work claim, and neither the event nor the sitter could be verified; two 2022 AFCON files have the same basis | a photo with a named photographer and a stated licence, or a verifiable event record for the Jmex image |
| garrincha | P18 is a retouched El Grafico scan tagged PD-AR-Photo / PD-1996 (a jurisdiction-only claim, 538x710, no named photographer); the Chile and Arquivo Nacional images have unknown authors and generic templates; team portraits are low resolution | the Arquivo Nacional SIAN record for "Garrincha na copa de 1962" with a date and a stated public-domain basis, or a Nationaal Archief/government photo with a stated licence |
| evliya-celebi | P18 is a CC BY-SA photo of a modern statue (a derivative work); the only old image is an unknown-author Hungarian yearbook scan with a generic PD tag | a pre-1931 engraving or museum open-access item with an item-level statement (kind historical_depiction) |
| fa-xian | the Singapore statue photo is a derivative; the Hutchinson illustration has no verified publication year (Stewart's UK copyright expired only in 2021); the 1878-80 Verne/Benett engraving is linked to Faxian only by a Commons category | a museum item-level woodblock or scroll, or the Hutchinson volume's exact year (1930 or earlier) |
| nain-singh-rawat | P18 `NainSingh.gif` (236x306) has an unknown author and a generic tag; the better lead (BnF Societe de Geographie photo, Gallica) is Commons-tagged PD but Gallica says "restricted use (convention Societe de geographie)" and the photographer is unknown | written terms from the BnF/Societe de Geographie, a licensed RGS image, or a pre-1931 plate with an identified caption |
| azim-premji | the live WEF Flickr page now shows CC BY-NC-SA 2.0, conflicting with the Commons CC BY-SA 2.0 tag; the only alternatives are PIB ceremony photos whose terms page could not be opened | an openly licensed single-subject photo confirmed on its live source page, written permission, or PIB's confirmed terms |
| violeta-parra | the Wikidata image is an Argentine magazine scan with no photographer and a jurisdiction-only claim; the 1958/59 back covers have unknown photographers; the 1962 Helsinki photo by Yrjo Lintunen was still protected in Finland in 1996 (US copyright restored); Memoria Chilena excludes its digital objects from its licence; a street-art photo is a derivative | a written licence from a named photographer, the Violeta Parra Museum or the Finnish People's Archives |
| clarice-lispector | the Bisilliat photo (276x392) carries a Commons CC BY-SA 4.0 template for a Wikimedia Brazil / Instituto Moreira Salles partnership but Bisilliat is living and the IMS page gives only a credit line; the Arquivo Nacional photos have unknown photographers | a written licence from the Instituto Moreira Salles or Maureen Bisilliat |
| alisher-navoi | the Wikidata image is a Commons crop from a multi-figure 1486 Herat miniature (private collection) and the Nava'i identification is only the uploader's label; the other files are a polo scene and a Soviet stamp | a caption naming the figure (Soudavar p. 105 or Da'adli) or a labelled single-figure depiction with an open-access museum record |
| r-k-narayan | P18 (c.1935, 249x337, R. K. Balaraman) rests only on an Indian public-domain template with no first-publication date, photographer death date or US-restoration check; the other files have the same Indian-only template, a 150x120 LoC news photo of 1957 and a stamp | a photograph with a documented rights basis or an institution page stating terms |
| wifredo-lam | P18 (216x267) is an uploader-only CC BY 3.0; the 1952 Carbonell photo rests on an emailed permission ticket; `WifredoLam1964.png` has an unknown author with a CC0 tag from a Danish site; the 1944 snapshot has no provenance; no Anefo photo exists on Commons | a documented image with a stated licence |
| al-zahrawi | P18 is a modern CC BY-SA drawing (rejected); Ernest Board's Wellcome painting is dated only "before 1934" and is a scene; the Wellcome Tacuinum miniature is mislabelled; the best lead (a 1906 Veloso Salgado panel crop) is identified as Albucasis only by the uploader | a NOVA Medical School statement naming the figures, or a pre-1931 Chirurgia frontispiece with an item-level public-domain statement |
| al-kindi | Wikidata has no image; the Commons files are an artwork under an emailed permission ticket, a drawing derived from a stamp, a 143x197 unidentified manuscript photo, stamp images and BEIC pages with no depiction | an old depiction with an item-level public-domain statement |
| vital-brazil | the LoC 1915 Harris & Ewing negative rests on "no known restrictions" and pre-1931 publication is not shown; `VitalBrazil1911.jpg` shows a man with a lasso but the 1911 book plate does not name him and the scan carries a non-commercial field; `VitalBrazil1892.jpg` has no creator or date | an item-level credited photograph with reuse terms from Fiocruz or Butantan |
| cesar-lattes | the Arquivo Nacional Correio da Manha photos (1949, 1954) have an unknown photographer and a generic GLAM template (a Brazilian-term argument is not a US basis); a sitter born in 1924 has no age-based path | the SIAN record BR_RJANRIO_PH_0_FOT_28617, the CBPF or Bristol archive with item-level terms |
| shen-kuo | P18 is a photo of a modern statue (derivative); the best lead (`Portrait of Shen Cunzhong.jpg`, a woodblock page said to be from a 1919 genealogy) has a date resting only on the uploader and an unresponsive source page; `Shen Kua sketch.jpg` has no basis on its cited page | confirm the 1919 plate (then historical_depiction, pre-1931) or an open-access museum depiction |
| salim-ali | P18 is a scan credited December 2006 with no photographer or original date; `Salim Ali 1927.jpg` has an unknown photographer and a 1996 reprint as source; the Smithsonian 1976 photo rests only on "no restrictions" | a dated portrait with stated terms (e.g. from the BNHS) |
| jang-yeong-sil | P18 is a photograph of a statue; the common portrait is a modern painting still under copyright; no contemporary likeness exists | a pre-1931 illustration or a museum open-access image with an item-level rights statement (historical_depiction) |
| ibn-arabi | P18 (218x280) has an unknown source and a generic tag; the only old depiction is a 200x217 Commons copy of a Bodleian miniature (MS. Ouseley Add. 24, f. 69a) with only the uploader's identification and no item-level rights text | the Digital Bodleian record for that folio with the sitter and rights statement and the full-size image |
| dogen | P18 (576x1050) is the Hokyoji moon-viewing portrait whose Commons page cites a Fukui archives page that did not respond and a university copy, with only a generic PD-old tag; the other file is a personal-site image with an unknown author | the Hokyoji portrait from the holder or a Fukui archives / Japanese cultural-property database with explicit terms (historical_depiction) |
| yi-hwang | Wikidata image is a statue; the banknote and the "standard portrait" are modern state artwork; the 1908 textbook plates contain no Yi Hwang | an old portrait or print with an item-level statement (historical_depiction) |
| sayyid-ahmad-khan | P18 has no photographer or date; the best lead (`Syed Ahmad Khan 1907.jpg`, labelled a 1907 Modern Review plate) could not be located in the Internet Archive scans, so its publication rests on the uploader; a 1974 reprint frontispiece is of unknown origin | the plate page and caption in an Internet Archive scan |
| kabir | P18 is an India Post stamp image (derivative); old paintings (V&A IS.227-1951 c.1790, British Museum, National Museum New Delhi) each carry a conflicting or generic reproduction notice ("(c) Victoria and Albert Museum") | a depiction in an open-access collection (Met, Cleveland, Walters, Wellcome) with an item-level terms statement |

## Portrait decisions and caveats (7 shipped)

All 7 files exist, open and match the recorded dimensions; none upscaled; every record has
creator, date, licence, licence URL, attribution and kind. Kinds: **6 `likeness`, 1
`historical_depiction`** (Hafez: Anselm Feuerbach's 1852 "Hafis vor der Schenke", Kunsthalle
Mannheim, painter died 1880; a plain crop of the figure from the 3000x2428 Commons
original; the museum page was unreachable so the basis rests on the artist's death date).
Notable bases and caveats:
- **Kip Keino**: Ralf Roletschek, own work, 10 Jan 2014, CC BY 3.0 (and GFDL), Commons quality image.
- **Lee Kun-hee**: Cheong Wa Dae ("Republic of Korea") Flickr account, 2013-05-08, CC BY-SA
  2.0; the live Flickr page still shows CC BY-SA 2.0 and Commons has a 2014 human review;
  543x639 as the Commons crop.
- **Salif Keita**: John Leeson, Toronto Jazz Festival, 29 June 2008, CC BY 2.0 on both the
  Commons page (FlickreviewR pass) and the live Flickr page (the lead's State Department
  photo was rejected as too small, 207x319).
- **Osamu Tezuka**: Asahi Graph, 10 June 1953, credited to the Asahi Shimbun company
  (photographer not named), public domain in Japan as published before 1958 under the same
  basis as the shipped Yukawa portrait; the 1953 publication date comes from the Commons
  file page (the magazine itself could not be checked); 407x467 native.
- **Andres Bello**: Raymond Monvoisin's oil portrait, signed "chili 1844" (visible on the
  canvas), Museo Nacional de Bellas Artes catalogue (provenance Universidad de Chile 1844,
  Bello "probably posed"); public domain by age (painter died 1870). Recorded as `likeness`
  because it is a signed, dated lifetime portrait of the sitter by a painter documented
  by the museum; caveats: the Commons page lists 147x106 cm against 67x56 cm in the
  museum entry and its source site (portaldearte.cl) is down.
- **Muhammad Abduh**: a photograph captioned "The late Grand Moufti, Sheik Mohamed Abdou",
  credit "Fasani", printed in de Guerville's *New Egypt* (1905/1906 editions); published
  before 1931 so public domain in the US; the photographer is otherwise unidentified. The
  Wikidata image (uploader-only "PD-old") and a CC BY-SA TIMEA copy (conflicting with the
  publication facts) were not used.

## Agent Achievement self-gate (first pass, exact)

From the 30 structured handbacks: primary-contribution FAIL **0**, top-omission FAIL
**0**, identity FAIL **0**, significance-over-novelty FAIL **0**, side-project FAIL
**0**. Several agents recorded pre-emptive wording fixes while drafting (for example
Yi Hwang's Dosan-academy wording, Al-Kindi's hedged cryptanalysis item) before the
first-pass tuple; none was a recorded gate failure.

## Agent self-calibration (exact)

**145** rows were initially scored across the 30 candidates (final **145**: no row was
added or removed after self-calibration); agents lowered **32** rows, **8 on the 7
shipped** and **24 on the 23 held**. The exact list (attribute, old -> new score /
confidence, reason) is in each candidate's `HANDBACK60` line in `provenance.notes`; the
totals were reconciled against the candidate rows (every lowered row's final score and
confidence equals the handback's "new" value, and every handback's final row count equals
the candidate's rows; no mismatch). Zero lowerings for Vital Brazil, Salim Ali and Jang
Yeong-sil. Reasons: self-report, one admiring or retrospective witness, single-source
concentration, hagiographic relay, outcome relayed by insiders, one source for an episode,
or a trait inferred from the style of the work.

## Lead review

Additional lead downward corrections: **4 rows on 3 shipped candidates**, all before
eligibility, all with a `RUBRIC_CORRECTION` note: Kip Keino impact_motivation 74/0.64 ->
72/0.58 (the Children Home and Foundation evidence comes from affiliated event pages and
one 1987 magazine profile; no independent source assesses motive or outcomes) and
persistence 70/0.62 -> 68/0.58 (retrospective profiles and his own accounts); Lee
Kun-hee leadership_drive 68/0.55 -> 66/0.52 (Korean business-press retellings and one
obituary-style article; the academic views reported were from a Samsung-hosted
symposium); Andres Bello cross_domain_range 78/0.62 -> 74/0.58 (the strongest wording
comes from the university he founded, and an independent historian argues he was not a
linguist). No row was raised.

Also at lead review and wiring:
- **Vocabulary / data fix**: Muhammad Abduh's era `modern` is not in the `Era` type
  (ancient, medieval, early_modern, 19th_century, 20th_century, contemporary); it was
  corrected to `19th_century` (born 1849) in the candidate and regenerated (caught by
  `tsc`).
- **Korean names**: standard Wikipedia/Wikidata labels where they exist (킵 케이노, 이건희,
  하피즈, 살리프 케이타, 데즈카 오사무, 무함마드 압두); Andres Bello's 안드레스 베요 is a
  transliteration (Wikidata has no Korean label), recorded as such in the candidate notes.
- **Region and taxonomy calls**: Bello `latin_america` (Venezuela-born with a Chile
  career base; both in the same region); Abduh `north_africa`; Hafez `west_asia`; Tezuka
  `east_asia`; Tezuka's fields art (manga) and film (animation) because the vocabulary has
  no comics id; Keino and Salif Keita `sub_saharan_africa`; Lee Kun-hee `east_asia`.
  Pre-modern held people carried region judgements in their notes (e.g. Ibn Arabi
  `west_asia` by career base, Al-Zahrawi `southern_europe` by the Averroes precedent).
- **Source records**: no source-title defect was found.

## Lead Major Achievement gate

Before lead correction: primary-contribution failures **0 (lead-only)**, top-omission
failures 0, identity failures 0, lead-only novelty issues 0, lead-only side-project
issues 0. I read the first two cards of all 7 shipped drafts: the first card is the
defining contribution for every one (Keino's two Olympic golds and world records; Lee's
1993 "new management" reform as chairman; Hafez's Divan of ghazals; Salif Keita's Afropop
blend and "golden voice"; Tezuka's reshaping of postwar manga; Bello's Gramatica and
the Silvas americanas, with the Civil Code carded second; Abduh's Islamic modernist
movement in Egypt). On the final build the first Achievement card was checked
programmatically in both locales for all 7 (14 pages). No card was reordered. Final
Major Achievement PASS **7/7 shipped**. Editorial source additions: 0.

## Publication and eligibility

All 7 `published`, directory-visible, `evidence_approved`, frozen before eligibility was
computed (eligibility was computed only after the ship/hold freeze and all lead
corrections; no rescue was attempted, no row added, no score or confidence raised).
**Roster60 eligible: 0 of 7.** Per person (rows / coverage / HC count / HC average):
Bello 6/0.182/5/0.542, Hafez 3/0.091/0/0.000, Keino 5/0.153/5/0.532, Lee Kun-hee
6/0.177/2/0.510, Abduh 5/0.150/3/0.507, Tezuka 4/0.123/2/0.500, Salif Keita
8/0.242/7/0.549. Min / median / max: rows 3 / 5 / 8; coverage 0.091 / 0.153 / 0.242; HC
count 0 / 3 / 7; HC average 0.000 / 0.510 / 0.549. All fail the 18-row / 12-HC floors.

## Counts

| | Before | After |
|---|---|---|
| Production | 637 | **644** |
| Directory-visible | 636 | **643** |
| Match-eligible | 114 | **114** (0 new) |
| Candidate JSON files | 757 | **787** (7 shipped + 23 held) |
| Non-production candidate files | 142 | **165** |

**A. Category totals** (canonical `categoryCounts.ts` output, literal; a person counts
once per category containing any of their fields):

```
before roster60: {"production":637,"visible":636,"categoriesProduction":{"science_knowledge":251,"arts_culture":233,"leadership_society":108,"building_discovery":204},"categoriesVisible":{"science_knowledge":251,"arts_culture":233,"leadership_society":107,"building_discovery":203}}
after roster60:  {"production":644,"visible":643,"categoriesProduction":{"science_knowledge":252,"arts_culture":237,"leadership_society":110,"building_discovery":206},"categoriesVisible":{"science_knowledge":252,"arts_culture":237,"leadership_society":109,"building_discovery":205}}
```

Production basis: science_knowledge 251 -> 252 (+1), arts_culture 233 -> 237 (+4),
leadership_society 108 -> 110 (+2), building_discovery 204 -> 206 (+2). Directory-visible
basis: 251 -> 252, 233 -> 237, 107 -> 109, 203 -> 205. The deltas equal the shipped
profiles' category memberships (Bello's fields include linguistics, which is in the science category, plus
law, education and literature; Abduh's religion, education and law; Tezuka's art and film are
both arts), and the
production-vs-visible gap in leadership and building stays Zheng He. **B. Match-eligible
pools**: science_knowledge 50, arts_culture 43, leadership_society 42,
building_discovery 15: unchanged.

## Cumulative cohort

Roster60 shipped 7, eligible 0. Cumulative Roster33-60: **419** shipped, **0**
match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS (no matching
architecture diagnostic was triggered or run).

## Calibration and matching health

`calibrate.ts quiz` x2: identical output (`meanSd` 11.704) and identical
`dispersion.generated.ts` hash on both runs (`ed99bbd0...`); eligible set unchanged (114),
so focused confirmation only. The file showed a line-ending-only touch and was restored.
Calibration was not tuned. Full `matching.test.ts` passes with the 7 added to the
known-non-eligible lists.

## Validation

- `tsc --noEmit` clean (after the Abduh era fix); `validateCandidates` over 787 candidates:
  0 errors, 0 warnings (611 `evidence_approved`, 93 `qa_passed`, 83 `held`).
- `roster60.test.ts` (185 tests) and the full Vitest suite: 90 files, **5,849 tests** pass
  (run again in full after the Abduh era fix, with the same totals).
- FINAL production build (`next build --webpack`, run on the final tree after the last
  user-visible change), literal line
  `✓ Generating static pages using 21 workers (1312/1312) in 17.3s`
  (`2 x 644 + 24 = 1312`).
- FINAL focused Playwright (Person, Editorial, Directory, Compare, Trait Explanation
  specs): **142 passed** on the first run; no failure and no transient failure this cycle
  (the harness rebuilds the site before running).
- **The final build and the final Playwright run both came after the last
  user-visible change** (the last user-visible edits were the lead row corrections and the
  Abduh era fix, before the regeneration and the build; only this checkpoint and
  `CURRENT_STATE.md` were written afterwards, neither shipped to users).
- No performance benchmark was run.

## Manual QA (final production build, localhost)

- All 7 EN and 7 KO profiles 200; all 7 portrait URLs 200; Compare 200 (Bello, Hafez,
  Tezuka); all 23 Roster60 holds return 404. No raw `src_` ids, taxonomy keys or stray
  snake_case in rendered text. The Directory shows "643 people".
- True 375px sweep (a real 375x812 browser viewport, both locales, all 7 = 14 pages): no
  horizontal overflow, 0 broken images, 0 console errors, the Korean display name on every
  KO page, the portrait attribution credit on every page.
- Achievement check on the final build: the first card of every shipped profile renders in
  both locales (14 of 14); no card was reordered.
- Bounded source-link sweep (52 URLs from the 7 shipped candidates): 46 x 200; 5 x 403
  (bot wall: Britannica x5); 1 connection failure (the ImageTexT journal review: the
  connection was reset or dropped on both attempts from this environment, not an HTTP
  404; the agent read the page); 0 x 404; 0 x 429; 0 timeouts; no genuine broken link, so
  nothing needed repair.

## Defects found and fixed

- Muhammad Abduh's invalid era `modern`, caught by `tsc` and corrected to `19th_century`.
- No data defect or source-title defect was found in QA.

## Deferred and not done

The 500-person checkpoint's optional items remain deferred (legacy portrait recompression,
scoring-lock batching, eligible-only quiz index, Directory virtualization, generated
manifest, shared count refactor, wiring-script check-in). No benchmark, no scale
checkpoint, no eligibility rescue, no matching diagnostic (none triggered). Legacy remains
paused (22 / 0); Legacy Batch 6 not started; Roster61 not started.

## Post-commit scoring lock

Run after implementation commit `85be1fd` (literal output):

```
Checked 787 previously-committed candidate file(s) against HEAD. 0 flagged.
This is a warning tool, not a hard gate -- review flags by hand, per the A/B/C/D policy.

Legacy scoring lock: 22 pre-pipeline production people covered, 0 flagged.
```

Committed candidate JSON count 787 = on-disk candidate JSON count 787 = checked count
787; candidate flags 0; legacy checked 22, legacy flags 0. No code, data, editorial,
portrait or index change followed the final build and Playwright run; this follow-up
commit is documentation only.
