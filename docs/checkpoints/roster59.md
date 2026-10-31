# Roster59: fifth 30-candidate roster (2026-10-30)

`ROSTER59_BASE_SHA`: `f107f12f24ddc093863e0b6f7f9ead62128c277d`, the merge of PR
#71 (Roster58). Guards verified before merging: PR #71 open, mergeable, clean, not
draft, base `8fafbf7cfc7e0f810f9f0bcf4ad5402b10cae107` and head
`437b5f31cb80df6f1f26563bc743c87aeca3d33c` exactly as reviewed, two commits, 0 behind
base, Vercel SUCCESS on that head, no review thread, no comment beyond the Vercel bot.
Merged with a normal merge commit, guarded on the head (`--match-head-commit`);
parents `8fafbf7c...` and `437b5f31...`, merged 2026-10-28T02:42:35-06:00. The
500-person scale checkpoint remains **EXPANSION_GREEN** (lane 500 -> 750). No benchmark
was run.

Starting state (mechanically confirmed): production 619, directory-visible 618,
match-eligible 114, candidate JSON 727, non-production candidate files 130, legacy
baseline 22 / 0 flagged.

**Roster58 deployed-site verification (after the PR #71 merge and production deploy,
deployment SHA = the merge SHA):** 19/19 EN profile routes 200, 19/19 KO routes 200,
19/19 portrait URLs 200; the 11 Roster58 holds (Tata, Kurien, Mo Ibrahim, Ibuka,
Jobim, Fathy, Houssay, Vavilov, Chagas, Loyola, Edhi) return 404 in both locales; the
Directory showed "618 people".

**Canonical category counts at the Roster59 base** (`categoryCounts.ts`, literal):
production science_knowledge 245, arts_culture 227, leadership_society 102,
building_discovery 198; directory-visible 245 / 227 / 101 / 197. These equal the
Roster58 checkpoint's expected end-of-Roster58 values exactly, so nothing needed
investigating (the production-vs-visible leadership/building gap of one is Zheng He).

## Pre-freeze identity integrity gate

Roster58 found five supposed fresh candidates already in production as legacy entries
with empty Wikidata IDs, so a QID-only duplicate check is insufficient. This cycle
added `src/dev/roster1000/identityGate.ts` (small, focused: exports `normalizeName` and
`findProductionMatches`). A proposed person is compared against **every one of the 619
production people** by: (1) exact slug, (2) normalized canonical name or alias equality
(diacritics, case, punctuation and honorifics ignored), (3) order-insensitive token-set
equality (name-order and transliteration-order variants), (4) Wikidata QID when the
production person has one, and (5) a "review" tier (same surname token plus a similar
given name). Tiers 1-4 are hard matches (the person is not fresh); tier 5 is a human
look. The gate was validated first on the five Roster58 misses (all caught by name and
slug although their QIDs are empty).

- A 102-name proposal pool was gated: **25 hard duplicates plus one review-tier match
  that was the same person**. Rejected as already in production: madam-c-j-walker (production
  `madam-cj-walker`), thor-heyerdahl, reinhold-messner, tadao-ando, lu-xun,
  sor-juana-ines-de-la-cruz, diego-rivera, jorge-luis-borges, gabriel-garcia-marquez,
  astor-piazzolla, homi-bhabha (production "Homi J. Bhabha"), rita-levi-montalcini,
  averroes, ernest-rutherford, satoru-iwata, hedy-lamarr, konrad-zuse,
  katherine-johnson, dennis-ritchie, margaret-hamilton, gordon-moore, wilma-rudolph,
  jesse-owens, roger-federer, ravi-shankar; and rumi (review tier: the same person as
  "Jalal ad-Din Muhammad Rumi"). Each rejection is by name and/or slug evidence, not
  QID.
- Excluded for other reasons before freeze: al-ghazali (already a held backlog candidate
  file; not reopened), piri-reis (an admiral: military-primary), fatima-al-fihri
  (a legendary founder whose historicity is too thin to score).
- The final 30 were gated again with their QIDs: **0 hard duplicates**, no QID in
  production and none in any of the 727 candidate files. These rejections happened
  before freeze and are not frozen-set replacements.
- **Standing assertion**: `roster59.test.ts` now asserts that no Roster59 target and no
  Roster59 hold matches any other production person by name, alias, slug or QID (the
  helper above), which would have caught the Roster58 class of mistake even with a null
  QID.

## ROSTER59_FROZEN_30: 18 shipped, 12 held, 0 backlog reuse

Declared after the identity gate and the portrait preflight, with no later
substitution. Backlog: one mechanical inventory (130 non-production candidate files,
unchanged); none reopened.

**Portrait-viability preflight (all 30, before research):** strong 10 (Chung, Du Fu,
Ferdowsi, Al-Razi, Noguchi, Shankara, Kukai, Crowther, Jeong, Ram Mohan Roy), plausible 8
(Marta, Mikimoto, Nawal, Xuanzang, Cesaria, Li Shizhen, Sancar, Guru Nanak), risky 12
(Ambani, Bekele, Dhyan Chand, Ozu, Paz, Premchand, Barragan, Hampate Ba, Milstein,
Leloir, Odhiambo, Kelsen). Risky candidates stayed in the set. Outcome against grade:
strong held 2 of 10 (Ferdowsi, Al-Razi), plausible held 1 of 8 (Li Shizhen), risky
held 9 of 12 (Ozu, Paz and Bekele shipped after the agents found documented bases).
The preflight grade is informational and is recorded in each candidate's
`provenance.notes` and in the structured handback.

Table columns: initial rows = rows scored before agent self-calibration; final rows =
rows in the candidate; sources = source records in the candidate file; lowered = rows
the agent lowered at self-calibration.

| Slug | Portfolio | Region | Initial rows | Final rows | Sources | Preflight | Agent-lowered | Outcome |
|---|---|---|---|---|---|---|---|---|
| chung-ju-yung | building | east_asia | 6 | 6 | 9 | strong | 1 | shipped |
| dhirubhai-ambani | building | south_asia | 5 | 5 | 7 | risky | 1 | **held** |
| kenenisa-bekele | building | sub_saharan_africa | 4 | 4 | 7 | risky | 1 | shipped |
| marta-vieira-da-silva | building | latin_america | 6 | 6 | 7 | plausible | 2 | shipped |
| kokichi-mikimoto | building | east_asia | 5 | 5 | 6 | plausible | 1 | shipped |
| nawal-el-moutawakel | building | north_africa | 5 | 5 | 9 | plausible | 1 | shipped |
| dhyan-chand | building | south_asia | 3 | 3 | 7 | risky | 1 | **held** |
| xuanzang | building | east_asia | 4 | 4 | 6 | plausible | 1 | shipped |
| du-fu | arts | east_asia | 3 | 3 | 6 | strong | 1 | shipped |
| yasujiro-ozu | arts | east_asia | 6 | 6 | 7 | risky | 0 | shipped |
| ferdowsi | arts | west_asia | 3 | 3 | 6 | strong | 1 | **held** |
| cesaria-evora | arts | sub_saharan_africa | 3 | 3 | 8 | plausible | 1 | shipped |
| octavio-paz | arts | latin_america | 4 | 4 | 8 | risky | 0 | shipped |
| premchand | arts | south_asia | 4 | 4 | 7 | risky | 0 | **held** |
| luis-barragan | arts | latin_america | 3 | 3 | 7 | risky | 0 | **held** |
| amadou-hampate-ba | arts | sub_saharan_africa | 6 | 6 | 9 | risky | 1 | **held** |
| li-shizhen | science | east_asia | 6 | 6 | 7 | plausible | 1 | **held** |
| al-razi | science | west_asia | 4 | 4 | 6 | strong | 2 | **held** |
| aziz-sancar | science | west_asia | 5 | 5 | 9 | plausible | 1 | shipped |
| cesar-milstein | science | latin_america | 4 | 4 | 8 | risky | 1 | **held** |
| luis-federico-leloir | science | latin_america | 6 | 6 | 8 | risky | 1 | **held** |
| thomas-odhiambo | science | sub_saharan_africa | 7 | 7 | 10 | risky | 1 | **held** |
| hideyo-noguchi | science | east_asia | 8 | 8 | 8 | strong | 1 | shipped |
| adi-shankara | leadership/society | south_asia | 3 | 3 | 5 | strong | 1 | shipped |
| guru-nanak | leadership/society | south_asia | 3 | 3 | 7 | plausible | 1 | shipped |
| kukai | leadership/society | east_asia | 5 | 5 | 8 | strong | 2 | shipped |
| hans-kelsen | leadership/society | central_europe | 6 | 6 | 7 | risky | 1 | **held** |
| samuel-ajayi-crowther | leadership/society | sub_saharan_africa | 6 | 6 | 9 | strong | 1 | shipped |
| jeong-yak-yong | leadership/society | east_asia | 5 | 5 | 9 | strong | 1 | shipped |
| raja-ram-mohan-roy | leadership/society | south_asia | 7 | 7 | 7 | strong | 1 | shipped |

Frozen portfolio 8 building / 8 arts / 7 science / 7 leadership-society; shipped 6 / 4 /
2 / 6. Regions of the shipped 18: east_asia 8, sub_saharan_africa 3, south_asia 3,
latin_america 2, north_africa 1, west_asia 1. East Asia is over-represented in the
shipped set only because of where the portrait holds fell (the frozen set had 8 East
Asian people of 30, and held people sit in four other regions); no European or North
American person was in the set by design (both are heavily represented already), and 7
of the 30 are pre-modern (Xuanzang, Du Fu, Ferdowsi, Al-Razi, Shankara, Guru Nanak,
Kukai). No one was selected for a partisan or electoral identity; political context is
unscored (Paz's ambassadorship and Tlatelolco resignation, Chung's 1992 presidential
run, Nawal's ministerial posts, Sancar's autobiographical nationalism, Roy's lobbying
for the Mughal emperor, Jeong's exile politics, Milstein's and Leloir's Argentine
political backgrounds). Research ran four agents at a time in 10 groups of three; the
usage limit cut off four groups mid-work (weekly limit) and they were resumed from saved
work; no candidate was redone or replaced.

## Held candidates

All twelve are `evidence_approved` with `portrait.status: held`, outside the
generator allowlist and absent from production (all research is reusable). No
replacement was added. Every hold was made by the research agent after one bounded
retry; the lead reviewed each reason and agreed. **These held candidates were not
subjected to a full lead score review**; any future reopening requires a fresh lead
review of every row.

| Slug | Exact portrait blocker | Next step |
|---|---|---|
| dhirubhai-ambani | the only Commons image is a 237x312 scan of a 2002 India Post stamp tagged GODL-India: a stamp is a designed derivative artwork with no recorded designer, nothing shows the GODL covers stamp images, postagestamps.gov.in could not be opened, and no photograph of him exists on Commons | a photograph with a named photographer and a stated licence, or a written licence statement from India Post |
| dhyan-chand | P18 (211x350) has an unknown photographer and only a hockey-fan website as permission source; the Sam Hood 1935 State Library of NSW photo has a clear Australian public-domain basis but the library says the sitter was identified by a Flickr user in 2012, so identity is unverified | a documented, captioned photograph (e.g. from Trove) |
| ferdowsi | rights are fine (a 15th-century Met Khavarannama folio, public domain by age and Met Open Access) but it is a multi-figure scene the Met titles "Three Men Before a Castle" and the Met text saying which figure is Firdausi could not be opened (security wall, then HTTP 429); identification rests on Commons and Wikidata captions | read the Met entry for 55.184.1 in a normal browser, then crop that figure and record it as historical_depiction |
| premchand | P18 (194x259) is an uploader "own work" claim for an old photograph with no photographer, date or publication; other Commons files are uploader-only CC0 claims; one is copied from Britannica with only a jurisdiction PD tag; one is a 1956 book sketch by an unnamed artist | a photograph with documented pre-1931 publication (e.g. in Madhuri on the Internet Archive) |
| luis-barragan | P18 (830x582) is a professional photograph of the man but rests only on an uploader "own work" claim (Tomjc.55, no photographer or date); the 1981 Fcarriedo snapshot has the same basis; a Sinaloa archive Flickr image is only "no known copyright restrictions" | a photograph with a named photographer and a stated licence (Barragan Foundation, Pritzker/Hyatt photo terms) |
| amadou-hampate-ba | no Wikidata image; the English Wikipedia photo is non-free fair use with an unknown author; a 1962 UNESCO photo credited to Claude Bablin appears on the Columbia page but no item-level UNESCO licence page was found | find that item in the UNESCO photobank or Digital Library and verify its licence |
| li-shizhen | P18 is unknown-author, undated, taken from a Russian website and carries only a generic PD-Art tag; the Commons category has only modern statues and photos; the Wellcome catalogue returned no portrait | a dated Ming or Qing portrait or edition frontispiece with an item-level public-domain statement |
| al-razi | the lead's Wellcome L0005053 is licensed CC BY 4.0 at Wellcome (not a Public Domain Mark) and has no creator, date or original-artwork information (so the Commons PD tag conflicts); a book-reproduction snapshot credits the wrong creator; the Aga Khan Museum folio illustrates a legend, not a portrait | a dated portrait or Latin-edition frontispiece with a stated creator and an item-level public-domain statement |
| cesar-milstein | the only images are 'Milstein lnp.jpg' and its restorations, a 161x146 newspaper scan with no credited photographer, tagged both PD-AR-Photo and Not-PD-US-URAA; the Nobel Foundation photo carries Nobel Foundation rights; no Wellcome portrait | a licensed photo from the Nobel Foundation, the Royal Society or the MRC LMB with written terms |
| luis-federico-leloir | five Commons files fail: no author with a generic PD-AR-Photo tag; an Archivo General de la Nacion photo from a Facebook post with the same tag; 1982 and 1976 magazine photos tagged Not-PD-US-URAA; a 164x250 PD-self file uploaded by a third party; Wellcome and NLM were not searched | a photo with a named photographer and written terms from the Nobel Foundation, Fundacion Instituto Leloir or the Archivo General de la Nacion |
| thomas-odhiambo | no Wikidata image, none on Commons, and no photograph with a stated licence turned up | a documented photo from ICIPE, the African Academy of Sciences or a news agency |
| hans-kelsen | the bust photo is a derivative of the sculptor's work; the Georg Fayer c.1930 photo (Austrian National Library Pf 6505 C(3)) rests only on a Commons "author died over 70 years ago" tag, and its US status turns on first publication in or before 1930, which no source states; no ONB rights statement | written terms for the photo, evidence of first publication in or before 1930, or a different photograph |

## Portrait decisions and caveats (18 shipped)

All 18 files exist, open and match the recorded dimensions; none upscaled; every record
has creator, date, licence, licence URL, attribution and kind. Kinds: **10 `likeness`, 8
`historical_depiction`** (Xuanzang: a 14th-century hanging scroll attributed to Kasuga
Motomitsu, Met Open Access; Du Fu: the imaginary portrait in Shangguan Zhou's 1743
*Wanxiao tang huazhuan*; Adi Shankara: a c.1904 Ravi Varma Press oleograph; Guru Nanak: a
Wellcome print, unknown artist, "likely 19th century"; Kukai: a 14th-century hanging
scroll, Art Institute of Chicago 1960.40, CC0; Crowther: the engraved frontispiece of
Page's 1888 biography; Jeong Yak-yong: a 1908 textbook illustration; Ram Mohan Roy:
the plate of the Briggs portrait in Collet's 1914 edition, **changed by the lead from
likeness to historical_depiction** because the sources read do not document the
sitting or date, the rights basis unchanged). Notable bases and caveats:
- **Kenenisa Bekele**: Katie Chan, own work, 21 Apr 2024 London Marathon, CC BY-SA
  4.0, race bib reads BEKELE; no separate licence-review stamp; both Wikidata
  images were rejected (a 284x412 third-party GFDL crop; a 2012 Flickr photo now
  "All Rights Reserved", a licence conflict).
- **Chung**: USAF Tech. Sgt. Renee Sitler, Panmunjom, 27 Oct 1998, DoD image
  DD-SD-00-01862 (US government work); the original DVIC page is dead so the basis
  rests on the Commons record.
- **Marta**: Hameltion (WikiPortraits), Canon EOS R10 EXIF, first-party CC BY-SA 4.0
  statement, no review tag. **Nawal**: Citizen59, Nikon D300 EXIF dated 4 Jun 2016,
  first-party CC BY 3.0 statement; the sitter and the Tunis event are identified only
  by the uploader's description and the image's wide use as her lead photo (I could
  not independently confirm the event, so this is the weakest identity basis among the
  shipped portraits; flagged for a human glance).
- **Cesaria Evora**: Flickr "As fotos da Virada!" account, CC BY-SA 2.0 verified live
  and passed FlickreviewR; the photo credit names Silvio Tanaka (2008) but the
  licensor is the event account, not the photographer.
- **Mikimoto**: the same image as NDL "Portraits of Modern Japanese Historical
  Figures" entry 396, from Otodake Iwazo's 1953 book; the NDL notice says all
  copyright terms expired and Japan's term expired before 1996 (no US restoration);
  the book itself was not viewable.
- **Ozu**: Shigeru Tamura 1953, published before 1956 and the NDL states its portraits
  are public domain; **Paz**: Jonn Leffmann, Malmo poetry festival 1988, CC BY 3.0, the
  photographer self-identifies on his Commons user page, the image looks like a scan of
  a print and the own-work claim cannot be independently checked.
- **Sancar**: Holger Motzkau, Nobel-week press conference, 7 Dec 2015, CC BY-SA 3.0,
  Wikimedia photographer. **Noguchi**: Doris Ulmann 1919 (University of Oregon
  Libraries, Public Domain Mark; she died 1934), with a generic "Use Restrictions" line
  read as a statement about the physical collection.
- **Xuanzang, Du Fu, Kukai, Shankara, Guru Nanak**: all item-level (Met API, Wellcome
  API, AIC page, Google Arts record) public-domain or CC0 statements; Guru Nanak's
  Wellcome date is only "likely 19th century"; Shankara's oleograph authorship by
  Ravi Varma personally is uncertain (the press was sold in 1901) though the rights
  basis does not depend on it.
- **Jeong Yak-yong**: only 300x359 (used as is) and a conventional drawing, not a
  likeness. **Crowther**: a book engraving, not the lead's P18 (whose Commons page
  cites a Lambeth page that says nothing about the image).

## Agent Achievement self-gate (first pass, exact)

From the 30 structured handbacks: primary-contribution FAIL **0**, top-omission FAIL
**0**, identity FAIL **0**, significance-over-novelty FAIL **0**, side-project FAIL
**0**. Several agents recorded pre-emptive fixes during drafting (for example
Hampate Ba's Wangrin date, Li Shizhen's dropped "first in the world" claim, Al-Razi's
hedged "first" claim) before the first-pass tuple; none was a recorded gate failure.

## Agent self-calibration (exact)

**145** rows were initially scored across the 30 candidates (final **145**: no row was
added or removed after self-calibration); agents lowered **29** rows, **18 on the 18
shipped** and **11 on the 12 held** (zero lowerings for Ozu, Paz, Premchand, Barragan).
The exact list (attribute, old -> new score / confidence, reason) is in each
candidate's `HANDBACK59` line in `provenance.notes`; the totals were reconciled against
the candidate rows (every lowered row's final score and confidence equals the
handback's "new" value, no mismatch, every handback's final row count equals the
candidate's rows). One lowering is confidence-only (Noguchi collaboration 0.52 -> 0.45,
score kept at 40). Reasons: self-report, one admiring or retrospective witness,
single-source concentration, hagiographic relay, outcome relayed by insiders, one
source for an episode, or a trait inferred from the style of the work.

## Lead review

Additional lead downward corrections: **13 rows on 8 shipped candidates**, all before
eligibility, all with a `RUBRIC_CORRECTION` note: Chung risk_tolerance 74/0.62 ->
72/0.58 (press retellings, autobiography unopened); Ozu creative_originality 76/0.58
-> 72/0.54 and planning_orientation 76/0.56 -> 72/0.52 (critics' reading of the films,
challenged by Berry; no process source); Paz creative_originality 74/0.62 -> 70/0.56
and cross_domain_range 76/0.62 -> 72/0.56 (no adversarial literary source opened);
Sancar analytical_rigor 76/0.62 -> 72/0.58 (committee text and his own autobiography);
Noguchi analytical_rigor 38/0.60 -> 38/0.55 (the low score rests on modern critical
assessments partly made with hindsight about outcomes: confidence lowered, score kept)
and achievement_drive 76/0.58 -> 74/0.54 (insider biography tradition); Crowther
persistence 72/0.64 -> 70/0.58 and mastery_orientation 70/0.60 -> 68/0.56 (Page's
devotional biography written with his cooperation); Jeong persistence 72/0.60 ->
70/0.56 (volume figures conflict, institutional sources); Ram Mohan Roy
independent_thinking 76/0.62 -> 72/0.56 and proactive_agency 74/0.62 -> 70/0.56
(insider biography, hostile accounts dispute motives). No row was raised.

Also at lead review and wiring:
- **Portrait kind**: Ram Mohan Roy likeness -> historical_depiction (above).
- **Korean names**: standard Wikipedia or label forms where they exist (정주영, 케네니사
  베켈레, 마르타 비에이라 다 시우바, 미키모토 고키치, 나왈 엘무타와켈, 현장, 두보, 오즈 야스지로,
  세자리아 에보라, 옥타비오 파스, 아지즈 산자르, 노구치 히데요, 샹카라, 나나크, 구카이,
  정약용, 람 모한 로이); transliterations where none exists (새뮤얼 아자이 크라우더 for
  Crowther), recorded as such in the candidate notes.
- **Region and taxonomy calls**: Sancar `west_asia` and Noguchi `east_asia` by
  nationality, Milstein (held) `latin_america` and Kelsen (held) `central_europe`: the
  repo's precedents conflict (Hinton, Molina, Stroustrup are filed by career base; Zewail,
  Khorana, Chandrasekhar by birth region), so each assigned region and its alternative is
  recorded in the candidate notes (a one-field change); Nawal `north_africa`;
  Cesaria Evora `sub_saharan_africa` (Cape Verde; Cabral precedent); Xuanzang's
  field set (exploration, religion, literature) puts him in three taxonomy categories.
- **Source records**: no source-title defect was found this cycle.

## Lead Major Achievement gate

Before lead correction: primary-contribution failures **0 (lead-only)**, top-omission
failures 0, identity failures 0, lead-only novelty issues 0, lead-only side-project
issues 0. I read the first two cards of all 18 shipped drafts: the first card is the
defining contribution for every one (Chung's founding of Hyundai, Bekele's world
records, Marta's World Player of the Year titles and World Cup record, Mikimoto's
cultured-pearl industry with the Nishikawa/Mise credit split carded second, Nawal's
1984 Olympic gold, Xuanzang's pilgrimage and return with the texts, Du Fu's standing as
poet, Ozu's family films, Cesaria's morna, Paz's poetry and essays, Sancar's DNA-repair
mechanisms with the shared Nobel stated, Noguchi's 1913 spirochete finding and the
Oroya fever work, Shankara's commentaries, Nanak's role as founder, Kukai's Shingon
founding, Crowther's episcopal consecration, Jeong's Silhak writings, Roy's reform
institutions). On the final build the first Achievement card was checked
programmatically in both locales for all 18 (36 pages). No card was reordered. Final
Major Achievement PASS **18/18 shipped**. Editorial source additions: 0.

## Publication and eligibility

All 18 `published`, directory-visible, `evidence_approved`, frozen before eligibility
was computed (eligibility was computed only after the ship/hold freeze and all lead
corrections; no rescue was attempted, no row added, no score or confidence raised).
**Roster59 eligible: 0 of 18.** Per person (rows / coverage / HC count / HC average):
Shankara 3/0.091/0/0.000, Sancar 5/0.152/5/0.550, Cesaria 3/0.093/0/0.000, Chung
6/0.190/5/0.544, Du Fu 3/0.099/2/0.500, Guru Nanak 3/0.092/0/0.000, Noguchi
8/0.241/6/0.543, Jeong 5/0.156/4/0.528, Bekele 4/0.128/4/0.532, Mikimoto
5/0.152/3/0.520, Kukai 5/0.149/1/0.500, Marta 6/0.185/4/0.525, Nawal 5/0.153/4/0.512,
Paz 4/0.123/4/0.560, Ram Mohan Roy 7/0.213/7/0.547, Crowther 6/0.184/5/0.536, Xuanzang
4/0.128/2/0.510, Ozu 6/0.178/6/0.510. Min / median / max: rows 3 / 5 / 8; coverage
0.091 / 0.152 / 0.241; HC count 0 / 4 / 7; HC average 0.000 / 0.5225 / 0.560. All fail
the 18-row / 12-HC floors. The pre-modern profiles are intentionally sparse (3-5 rows
with confidence at or below 0.55).

## Counts

| | Before | After |
|---|---|---|
| Production | 619 | **637** |
| Directory-visible | 618 | **636** |
| Match-eligible | 114 | **114** (0 new) |
| Candidate JSON files | 727 | **757** (18 shipped + 12 held) |
| Non-production candidate files | 130 | **142** |

**A. Category totals** (canonical `categoryCounts.ts` output, literal; a person counts
once per category containing any of their fields):

```
before roster59: {"production":619,"visible":618,"categoriesProduction":{"science_knowledge":245,"arts_culture":227,"leadership_society":102,"building_discovery":198},"categoriesVisible":{"science_knowledge":245,"arts_culture":227,"leadership_society":101,"building_discovery":197}}
after roster59:  {"production":637,"visible":636,"categoriesProduction":{"science_knowledge":251,"arts_culture":233,"leadership_society":108,"building_discovery":204},"categoriesVisible":{"science_knowledge":251,"arts_culture":233,"leadership_society":107,"building_discovery":203}}
```

Production basis: science_knowledge 245 -> 251 (+6), arts_culture 227 -> 233 (+6),
leadership_society 102 -> 108 (+6), building_discovery 198 -> 204 (+6). Directory-visible
basis: 245 -> 251, 227 -> 233, 101 -> 107, 197 -> 203. The deltas equal the shipped
profiles' category memberships (Xuanzang, Noguchi, Du Fu and others sit in more than one
category), and the production-vs-visible gap in leadership and building stays Zheng He.
**B. Match-eligible pools**: science_knowledge 50, arts_culture 43, leadership_society
42, building_discovery 15: unchanged.

## Cumulative cohort

Roster59 shipped 18, eligible 0. Cumulative Roster33-59: **412** shipped, **0**
match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS (no matching
architecture diagnostic was triggered or run).

## Calibration and matching health

`calibrate.ts quiz` x2: identical output (`meanSd` 11.704) and identical
`dispersion.generated.ts` hash on both runs (`ed99bbd0...`); eligible set unchanged
(114), so focused confirmation only. The file showed a line-ending-only touch (no
content difference ignoring CR) and was restored. Calibration was not tuned. Full
`matching.test.ts` passes with the 18 added to the known-non-eligible lists.

## Validation

- `tsc --noEmit` clean (a strict-optional type error in the new identity helper's probe
  type was fixed before this run); `validateCandidates` over 757 candidates: 0 errors, 0
  warnings (581 `evidence_approved`, 93 `qa_passed`, 83 `held`).
- `roster59.test.ts` (294 tests) and the full Vitest suite: 89 files, **5,664 tests**
  pass.
- FINAL production build (`next build --webpack`, run on the final tree after the last
  user-visible change), literal line
  `✓ Generating static pages using 21 workers (1298/1298) in 35.2s`
  (`2 x 637 + 24 = 1298`).
- FINAL focused Playwright (Person, Editorial, Directory, Compare, Trait Explanation
  specs): **142 passed** on the first run; no failure and no transient failure this
  cycle (the harness rebuilds the site before running).
- **The final build and the final Playwright run both came after the last
  user-visible change** (the last user-visible edits were the lead row corrections and
  the Ram Mohan Roy portrait-kind change, before wiring and the build; the later
  `identityGate.ts` type fix touches no user-visible output; only this checkpoint and
  `CURRENT_STATE.md` were written afterwards, neither shipped to users).
- No performance benchmark was run.

## Manual QA (final production build, localhost)

- All 18 EN and 18 KO profiles 200; all 18 portrait URLs 200; Compare 200 (Kukai, Du
  Fu, Paz); all 12 Roster59 holds return 404. No raw `src_` ids, taxonomy keys or stray
  snake_case in rendered text. The Directory shows "636 people".
- True 375px sweep (a real 375x812 browser viewport, both locales, all 18 = 36 pages):
  no horizontal overflow, 0 broken images, 0 console errors, the Korean display name on
  every KO page, the portrait attribution credit on every page.
- Achievement check on the final build: the first card of every shipped profile
  renders in both locales (36 of 36); no card was reordered, so no reorder re-read was
  needed.
- Bounded source-link sweep (135 URLs from the 18 shipped candidates): 125 x 200; 8 x
  403 (bot wall: Britannica x5, France 24, the ISU Bios pubpub page, Anglican News); 1 x
  429 (the Met collection page, rate limit; the Met API result was read separately for
  the portrait); 1 checker failure (GIA 4Cs blog: connection reset on both attempts from
  this environment, not an HTTP 404; the agent read the page); 0 x 404; 0 timeouts; no
  genuine broken link, so nothing needed repair.

## Defects found and fixed

- `identityGate.ts` probe type error under `exactOptionalPropertyTypes`, caught by
  `tsc` and fixed.
- A first draft of the generated test helper contained a placeholder hold-identity test;
  it was replaced by the real held-candidate identity assertion before any run.
- No data defect or source-title defect was found in QA.

## Deferred and not done

The 500-person checkpoint's optional items remain deferred (legacy portrait
recompression, scoring-lock batching, eligible-only quiz index, Directory
virtualization, generated manifest, shared count refactor, wiring-script check-in).
No benchmark, no scale checkpoint, no eligibility rescue, no matching diagnostic (none
triggered). Legacy remains paused (22 / 0); Legacy Batch 6 not started; Roster60 not
started.

## Post-commit scoring lock

Run after implementation commit `20ae513` (literal output):

```
Checked 757 previously-committed candidate file(s) against HEAD. 0 flagged.
This is a warning tool, not a hard gate -- review flags by hand, per the A/B/C/D policy.

Legacy scoring lock: 22 pre-pipeline production people covered, 0 flagged.
```

Committed candidate JSON count 757 = on-disk candidate JSON count 757 = checked
count 757; candidate flags 0; legacy checked 22, legacy flags 0. No code, data,
editorial, portrait or index change followed the final build and Playwright run; this
follow-up commit is documentation only.
