# Roster58: fourth 30-candidate roster (2026-10-27)

`ROSTER58_BASE_SHA`: `8fafbf7cfc7e0f810f9f0bcf4ad5402b10cae107`, the merge of PR
#70 (Roster57). Guards verified before merging: PR #70 open, mergeable, not draft,
base `fd3b1849eec88d481e1d6e75024c829e44202c14` and head
`7f87b7f3048a656e58cbdcfa192e13af6116f8e5` exactly as reviewed, two commits, branch 0
behind base, Vercel SUCCESS on that head, no review thread, no comment beyond the
Vercel bot. Merged with a normal merge commit, guarded on the head
(`--match-head-commit`); parents `fd3b1849...` and `7f87b7f3...`, merged
2026-10-26T20:09:35-06:00. The 500-person scale checkpoint remains
**EXPANSION_GREEN** (lane 500 -> 750). No benchmark was run.

Starting state (mechanically confirmed): production 600, directory-visible 599,
match-eligible 114, candidate JSON 697, legacy baseline 22 / 0 flagged.

**Roster57 deployed-site verification (after the PR #70 merge and production
deploy, deployment SHA = the merge SHA):** 22/22 EN profile routes 200, 22/22 KO
profile routes 200, 22/22 portrait URLs 200; the 8 Roster57 holds (Dangote, Mary
Kom, Chahine, Ghalib, S. N. Bose, Savitribai Phule, Cardozo, Bethune) return 404 in
both locales; the Directory showed "599 people".

## Category-count reconciliation (Roster56 vs Roster57 checkpoints)

The Roster56 checkpoint recorded leadership_society 93 and building_discovery 188;
the Roster57 recount at the same base gave 92 and 187. Both numbers are correct
for different populations, and no data or taxonomy changed:

- Earlier checkpoints counted **production** people (every `SEED_PEOPLE` entry).
- The Roster57 recount counted **directory-visible** people (`isDirectoryVisible !==
  false`).
- The single difference is **Zheng He** (fields exploration + military): in
  production, not directory-visible, and in both leadership_society (military) and
  building_discovery (exploration), hence exactly one in each category.
- Method: recounted every roster boundary from end-of-Roster38 to end-of-Roster57
  with the canonical `PROFESSION_CATEGORIES` logic. The production-basis totals
  reproduce every earlier checkpoint (e.g. end of Roster56: 93 / 188) and the
  visible-basis totals are one lower in exactly those two categories at every
  boundary since Zheng He joined. The earlier checkpoint was not wrong; the
  population was undefined.

**Canonical procedure from Roster58 onward:** `src/dev/roster1000/categoryCounts.ts
<rosterN>` prints production and directory-visible totals side by side, per
category, before and after the named roster. Its literal output for this roster:

```
before roster58: {"production":600,"visible":599,"categoriesProduction":{"science_knowledge":238,"arts_culture":218,"leadership_society":97,"building_discovery":194},"categoriesVisible":{"science_knowledge":238,"arts_culture":218,"leadership_society":96,"building_discovery":193}}
after roster58:  {"production":619,"visible":618,"categoriesProduction":{"science_knowledge":245,"arts_culture":227,"leadership_society":102,"building_discovery":198},"categoriesVisible":{"science_knowledge":245,"arts_culture":227,"leadership_society":101,"building_discovery":197}}
```

Roster57's own deltas on the production basis are therefore leadership 93 -> 97 and
building 188 -> 194 (visible basis 92 -> 96 and 187 -> 193, as the Roster57
checkpoint recorded).

## Frozen 30: 19 shipped, 11 held, 0 backlog reuse

Backlog: one mechanical inventory, 119 non-production candidate files (35
`evidence_approved` with held portraits, 1 `evidence_approved` with a found portrait
(Edmund Hillary, unshipped for the old region reason), and 83 `held`: 65 with no
portrait, 14 `not_available`, 2 found, 2 held). No concrete new signal for any; none
reopened. All 30 are fresh.

**Freeze integrity: five frozen entries voided and replaced before any research.**
The first freeze contained five people who turned out to be **already in
production** as legacy entries (frida-kahlo, warren-buffett, ada-lovelace,
rosalind-franklin, confucius). The QID cross-check did not catch them because
legacy production people have an empty Wikidata ID in the production dump and no
candidate file; slug tokens were checked only against candidate files. The G4 agent
found Kahlo; a slug-token cross-check of the production slug column found the other
four. Each was replaced one for one in the same portfolio slot, before any of the
five had been researched and independently of any portrait result (Buffett ->
masaru-ibuka, Kahlo -> hassan-fathy, Lovelace -> meghnad-saha, Franklin ->
nikolai-vavilov, Confucius -> ignatius-of-loyola). Seven earlier picks (Santos-
Dumont, Hokusai, C. V. Raman, Ibn Khaldun, Bessie Coleman, Henri Dunant, Matthew
Henson) had already been dropped for the same reason before freezing. The rule that
no replacement may be added to compensate for portrait holds was not engaged: no
substitution was made after any portrait outcome. Process fix: the brief now tells
every agent to cross-check the production slug column, not only QIDs.

**Portrait-viability preflight (all 30, before research):** strong 8 (Bikila,
Hiroshige, Pamuk, Muir, Grotius, Augustine, Fukuzawa, Loyola), plausible 14, risky 8
(Tata, Jobim, Fathy, Houssay, Saha, Vavilov, Chagas, Edhi). The grade is recorded in
each candidate's `provenance.notes` as `portrait_preflight: <grade> (lead) /
<finding>` and in the structured handback. Outcome against grade: strong held 1 of 8
(Loyola, a museum copyright notice the preflight had not looked at), plausible held 3
of 14 (Kurien, Ibrahim, Ibuka), risky held 7 of 8 (Saha shipped through a US federal
photograph found by the agent). The Roster57 LoC / Harris & Ewing rule was applied:
Vavilov's NYWTS photograph (post-1930, "no known restrictions" only) was graded risky
and then held, as was Houssay's NLM "believes public domain" photograph.

Table columns: initial rows = rows scored before agent self-calibration; final rows =
rows in the candidate; sources = source records in the candidate file; lowered = rows
the agent lowered at self-calibration.

| Slug | Portfolio | Region | Initial rows | Final rows | Sources | Preflight | Agent-lowered | Outcome |
|---|---|---|---|---|---|---|---|---|
| j-r-d-tata | building (business/aviation) | south_asia | 10 | 10 | 7 | risky | 1 | **held** |
| verghese-kurien | building (business) | south_asia | 8 | 8 | 7 | plausible | 1 | **held** |
| strive-masiyiwa | building (business) | sub_saharan_africa | 7 | 7 | 8 | plausible | 2 | shipped |
| mo-ibrahim | building (business) | sub_saharan_africa | 7 | 7 | 7 | plausible | 2 | **held** |
| abebe-bikila | building (sport) | sub_saharan_africa | 4 | 4 | 6 | strong | 2 | shipped |
| kazuo-inamori | building (business) | east_asia | 6 | 6 | 6 | plausible | 3 | shipped |
| roberto-clemente | building (sport) | latin_america | 10 | 10 | 8 | plausible | 2 | shipped |
| masaru-ibuka | building (business/engineering) | east_asia | 8 | 8 | 8 | plausible | 1 | **held** |
| utagawa-hiroshige | arts | east_asia | 5 | 5 | 7 | strong | 2 | shipped |
| raja-ravi-varma | arts | south_asia | 7 | 7 | 9 | plausible | 2 | shipped |
| orhan-pamuk | arts | west_asia | 6 | 6 | 8 | strong | 2 | shipped |
| abbas-kiarostami | arts | west_asia | 6 | 6 | 7 | plausible | 1 | shipped |
| youssou-ndour | arts | sub_saharan_africa | 5 | 5 | 7 | plausible | 1 | shipped |
| antonio-carlos-jobim | arts | latin_america | 5 | 5 | 6 | risky | 1 | **held** |
| ngugi-wa-thiongo | arts | sub_saharan_africa | 6 | 6 | 8 | plausible | 1 | shipped |
| hassan-fathy | arts | north_africa | 7 | 7 | 10 | risky | 0 | **held** |
| kitasato-shibasaburo | science | east_asia | 6 | 6 | 8 | plausible | 1 | shipped |
| bernardo-houssay | science | latin_america | 7 | 7 | 7 | risky | 1 | **held** |
| meghnad-saha | science | south_asia | 7 | 7 | 5 | risky | 1 | shipped |
| nikolai-vavilov | science | central_europe | 7 | 7 | 5 | risky | 1 | **held** |
| magdi-yacoub | science | north_africa | 6 | 6 | 5 | plausible | 1 | shipped |
| carlos-chagas | science | latin_america | 8 | 8 | 7 | risky | 2 | **held** |
| john-muir | science | north_america | 7 | 7 | 8 | strong | 2 | shipped |
| hugo-grotius | leadership/society | western_europe | 6 | 6 | 5 | strong | 1 | shipped |
| augustine-of-hippo | leadership/society | north_africa | 5 | 5 | 9 | strong | 1 | shipped |
| fukuzawa-yukichi | leadership/society | east_asia | 5 | 5 | 6 | strong | 1 | shipped |
| inazo-nitobe | leadership/society | east_asia | 5 | 5 | 8 | plausible | 1 | shipped |
| ignatius-of-loyola | leadership/society | southern_europe | 7 | 7 | 7 | strong | 0 | **held** |
| pandita-ramabai | leadership/society | south_asia | 7 | 7 | 7 | plausible | 1 | shipped |
| abdul-sattar-edhi | leadership/society | south_asia | 7 | 7 | 8 | risky | 1 | **held** |

Frozen portfolio 8 building / 8 arts / 7 science / 7 leadership-society; shipped
4 / 6 / 4 / 5. Regions of the shipped 19: east_asia 5, sub_saharan_africa 4,
south_asia 3, west_asia 2, north_africa 2, latin_america 1, north_america 1,
western_europe 1. North America is 1 of 19 (Muir; Clemente is recorded as
latin_america) and the shipped set spans antiquity to the present (Augustine,
Grotius, Hiroshige through Masiyiwa, Yacoub, Pamuk). No one was selected for a partisan or
electoral identity; political and activism context is unscored: Ngugi's detention,
Pamuk's trial, Grotius's imprisonment and embassy, Saha's Lok Sabha seat, Edhi's
MP term (held), Muir's Sierra Club advocacy and the Hetch Hetchy fight. John Muir is scored only as naturalist-writer-explorer; he was
kept as a judgement call because his documented behaviour is overwhelmingly that of a
naturalist and writer (the activism-primary exclusion is not met). Research ran four
agents at a time in groups of three (G1 to G10 plus a single-candidate Fathy group);
the last three groups were cut off by a usage limit and resumed from saved work (G10's
work had not been saved and was rebuilt), and no candidate was redone or replaced.

## Held candidates

All eleven are `evidence_approved` with `portrait.status: held`, outside the
generator allowlist and absent from production (all research is reusable). No
replacement was added. Every hold was made by the research agent after one bounded
retry; the lead reviewed each reason and agreed.

| Slug | Exact portrait blocker | Next step |
|---|---|---|
| j-r-d-tata | Wikidata P18 is a 1955 Indian government photo (649x812), tagged PD-India with no named photographer: still protected in India in 1996, so a US public-domain basis is not established; the other files are a 1994 stamp, event photos and buildings | a pre-1931 photograph with a named author or publication in an archive that states its terms, or permission from the Tata Central Archives |
| verghese-kurien | P18 crop (573x753) is a 2009 PIB press photo tagged GODL-India; the original release page is dead and the Wayback copy shows no licence statement, so the GODL tag rests on a general data-sharing policy; the only other candidate is an uploader-only "own work" photo with students | a written GODL or reuse statement from PIB for photo 22179, or a single-subject image with a photo-level open licence |
| mo-ibrahim | WEF 'Mo Ibrahim.jpg': Commons says CC BY-SA 2.0 with a VRT ticket but the live Flickr page now shows CC BY-NC-SA 2.0 (the Dangote conflict); the Uppsala 2014 file is an uploader assertion; the FCO OGL file was not verified against its live Flickr page | WEF/VRT clarification, the live FCDO Flickr licence, or a written licence from the Nordic Africa Institute |
| masaru-ibuka | all three Commons files (two 1964 magazine photos, one 1966 clipping) carry Not-PD-US-URAA with PD-Japan-organisation; all post-1956, so Japan's pre-1956 rule does not apply (same reason Matsushita's 1961 photo was rejected) | a pre-1957 published photograph with a documented date, or a Sony, museum or government image with a clear licence |
| antonio-carlos-jobim | Arquivo Nacional / Correio da Manha photo (March 1965), photographer unknown, only a PD-Brazil-URAA template; other files are airport signage or a 2021 CC0 "own work" upload of an older group photo | a documented photographer and licence, or an item-level rights statement from the Arquivo Nacional |
| hassan-fathy | only the Papadimos personal-archive photograph (809x1079 and a parent image with Durrell and Papadimos) with a CC BY-SA 3.0 tag on the uploader's claim and no permission statement or institutional release | an image with a named photographer or an institution stating its terms (Aga Khan Award, AKDC at MIT), or a written release from the archive holder |
| bernardo-houssay | P18 is 199x305 with an unknown author and generic PD; NLM 1949 photos say the Library only "believes" them public domain and name no creator or employer; the 1912 UBA portrait has only a faculty author, no stated terms and no proof of publication; Nobel portrait 162x227 | the NLM catalogue record for item 101442347 (an NIH-employee credit for McGuire would give a federal-work basis) or written terms from the UBA library |
| nikolai-vavilov | NYWTS Library of Congress photo (1933, "no known restrictions" only); Prekhner 1930s photo (Russian-jurisdiction PD tag only, restored in the US); 1916 family photo (unknown author, scanned from a 1968 book); a Flickr bust photo (sculptor and rights unknown) | a pre-1931 published photograph with a documented photographer and publication, a stated open licence, or a release from the Vavilov Institute |
| carlos-chagas | single-subject images have an unknown photographer plus a generic PD tag; the Wellcome copy of a 1932 book photo carries CC BY only for the scan | a dated, attributable Casa de Oswaldo Cruz portrait, or a pre-1931 publication with a credit |
| ignatius-of-loyola | the P18 Rubens (Norton Simon M.1975.03.P) is photographed by an uploader as "own work" and the museum page states "Copyright: (c) Norton Simon Art Foundation" with reproduction fees; Commons dates conflict (1620-22 vs 1610-12); the del Conte image is a "brightened and upscaled" copy | a Rubens, Coello or del Conte image, or a death-mask photograph, from a museum or archive that states open terms |
| abdul-sattar-edhi | P18 is an uploader-only "own work" claim (2009, CC BY-SA 3.0); two 2016 photos credit the Edhi Foundation as source but carry uploader-chosen CC BY-SA/CC BY licences; `Edhi.jpg` names AFP as source but says self-published CC BY-SA (source/licence conflict) | a photo with a verifiable institutional licence (Wikimedia event, UN or government page, open-licence press agency), or written terms from the Foundation or photographer |

## Portrait decisions and caveats (19 shipped)

All 19 files exist, open and match the recorded dimensions; none upscaled; every
record has creator, date, licence, licence URL, attribution and kind. Kinds: 16
`likeness`, 3 `historical_depiction` (Hiroshige: Kunisada's posthumous memorial print,
Met Open Access; Augustine: Champaigne, c.1645, LACMA, imagined posthumous image;
Grotius: a Rijksmuseum workshop copy of a Mierevelt portrait for which he sat).
Notable bases and caveats:
- **Saha**: a crop of a December 1944 Library of Congress FSA-OWI group photograph
  by J. Sherrel Lakey (a federal-employee work, public domain); the item page returned
  403 so the caption and credit were read via Commons, and identification rests on
  caption order (Saha is far-left, standing). Flagged as the weakest identity basis.
- **Ravi Varma**: the 1907 *Modern Review* (Calcutta) plate (published before 1931),
  the photographer unknown; the plate's printed ornamental border is retained; the
  contents listing and Commons description match but the image was not matched
  against the scanned page itself.
- **Fukuzawa**: c.1891 photograph, photographer unrecorded, held by Keio's Fukuzawa
  Research Center; the basis is age only (the Japanese term expired before 1996, so
  no US restoration); the Keio photo database page could not be opened.
- **Kitasato**: a studio print stamped "Photo-Kunst-Atelier T. Ariga, Tokyo" from the
  National Diet Library's "Portraits of Modern Japanese Historical Figures", whose
  usage notice says the copyright terms have expired; the print's exact date and
  source book were not located (pre-1931 studio print, so expired before 1996).
- **Nitobe**: Auguste Leon autochrome, 21 Dec 1922, Musee departemental Albert-Kahn
  A35816; the museum's record for this exact item states "Domaine public" and
  "Librement reutilisable (CC-00)" (the Arrhenius precedent); the museum's general
  terms page was not separately opened.
- **Inamori**: Conrad Erb for the Science History Institute (2011), CC BY-SA 3.0; the
  Institute's site is behind a bot check, so the basis is the Commons wikitext
  (work for hire released under its Wikipedian-in-Residence cooperation).
- **Kiarostami, N'Dour, Yacoub, Pamuk**: photographer-uploaded Commons files with
  EXIF matching the stated dates (Pacheco CC BY-SA 4.0 2013; Kotowski CC BY-SA 3.0
  2009; Raafat CC BY-SA 3.0 2008, a second frame from the next day and many other
  original portraits; Shankbone CC BY 3.0 2009, his 2011 original upload rather than a
  later retouch). Same basis class as shipped Thompson, Nureyev, Sembene. Yacoub's
  and the others' rights rest on the photographer being the uploader; no separate
  review template exists for Kiarostami.
- **Masiyiwa**: Horasis Flickr photo, CC BY-SA 2.0, FlickreviewR pass and the live
  Flickr page checked today; the nameplate reads MASIWIA. **Ngugi**: Shawn Miller
  (Library of Congress), CC0 at photo level on the live Flickr page with a
  FlickreviewR confirmation.
- **Bikila**: Anefo / Nationaal Archief 1968 CC0 (item page states the holder and
  CC0). **Clemente**: US Marine Corps service-record photograph of 30 Sep 1958
  (US government work), 351x394 native (a source limit). **Muir**: Underwood &
  Underwood c.1912 from the Library of Congress with a 1912 US copyright entry
  (public domain by age); 504x645 native.
- **Ramabai**: frontispiece of the 1887 first printing of *The High-Caste Hindu
  Woman* (Philadelphia), plate credited "F. Gutekunst Phototype" (US publication
  before 1931); the Commons page's 1922 date is wrong and is noted in provenance.
- **Augustine**: LACMA M.88.177 public-domain record and terms; **Grotius**:
  Rijksmuseum SK-A-581, copyright field empty, painter died 1641; **Hiroshige**: the
  Met API reports `isPublicDomain` true (the web page was bot-blocked).

## Agent Achievement self-gate (first pass, exact)

From the 30 structured handbacks: primary-contribution FAIL **0**, identity FAIL **0**,
significance-over-novelty FAIL **0**, side-project FAIL **0**, top-omission FAIL
**3** (Inamori: the Amoeba management method and Kyocera Philosophy were missing from
card 1; Yacoub: the arterial switch and congenital surgery were missing; Nitobe: the
League of Nations Under-Secretary-General post was omitted), all three shipped
candidates, all corrected before return. No hold had a gate failure.

## Agent self-calibration (exact)

197 rows were initially scored across the 30 candidates (final 197: no row was added
or removed after self-calibration); agents lowered **39** rows, **28 on the 19 shipped**
and **11 on the 11 held**; zero lowerings for Hassan Fathy and Ignatius of Loyola. The
exact list (attribute, old -> new score / confidence, reason) is in each candidate's
`HANDBACK58` line in `provenance.notes`; the totals were reconciled against the
candidate rows (every lowered row's final score and confidence equals the handback's
"new" value, no mismatch). Reasons: self-report, one admiring or retrospective witness,
single-biographer or single-source concentration, shared credit, outcome relayed by
insiders, one source for an episode, or a trait inferred from the style of the work.

## Lead review

Additional lead downward corrections: **13 rows on 7 shipped candidates**, all before
eligibility, all with a `RUBRIC_CORRECTION` note: Clemente competitiveness 80/0.66 ->
76/0.60, persistence 76/0.65 -> 74/0.60, social_assertiveness 76/0.64 -> 72/0.58,
impact_motivation 78/0.62 -> 74/0.58, achievement_drive 78/0.62 -> 76/0.58 (the
episodes reach us through one biographer, Maraniss, relayed by NPR, Smithsonian and PBS
plus SABR); Kiarostami creative_originality 78/0.66 -> 74/0.58 and experimentation
74/0.62 -> 70/0.55 (strong inferences from the films with no process source); Ngugi
independent_thinking 76/0.66 -> 74/0.62 and creative_originality 74/0.64 -> 72/0.60
(affiliated or obituary sources, no hostile critic read); Kitasato experimentation
78/0.68 -> 74/0.62 (joint 1890 work, disputed plague priority); Grotius
cross_domain_range 76/0.62 -> 72/0.58 (encyclopaedic summaries only); Saha
analytical_rigor 74/0.62 -> 72/0.58 (a colleague's memoir the strongest evidence);
Masiyiwa conflict_tolerance 76/0.60 -> 72/0.54 (his own retellings beyond the outcome).
No row was raised. The 11 held candidates were not lead-lowered (they do not ship and
their rows are unchanged from the agents' handbacks); a future reopening would repeat
this review.

Also at lead review and wiring:
- **Korean name**: Pamuk corrected from the agent's 오르한 파묵 to the standard
  오르한 파무크 (candidate and draft). Jobim's 안토니우 카를루스 조빙 (held) and Kitasato's
  기타자토 시바사부로 follow the Korean Wikipedia titles.
- **Region and taxonomy calls**: Yacoub `north_africa` (Egyptian-born with a UK career
  base; the Aswan centre and Egyptian programmes decided it; the Zewail precedent);
  Mo Ibrahim (held) `sub_saharan_africa`; Saha `south_asia`; Vavilov (held)
  `central_europe` (Russian mapping); Augustine `north_africa`, era `ancient`
  (Hypatia precedent); Pamuk `west_asia`; Kiarostami `west_asia`; Clemente
  `latin_america` (Puerto Rico; no precedent in the repo); Muir `north_america`;
  Nitobe `east_asia`, era 19th_century by birth year (Kitasato precedent); Chagas'
  birth year recorded as 1879 (Wikidata and Fiocruz) with 1878 noted (Fiocruz
  dictionary).
- **Source-title defect in a Roster57 record**: emil-von-behring's Okui source read
  "Nobuyuki Okui"; the Cureus/PMC article (PMC11365020) names the author **Nobuo
  Okui**. Fixed in the candidate and in the generated `roster57.ts` (one line each).
- **Test cleanup (requested)**: the eight Roster57 hold slugs were duplicated twice
  in the "known backlog blockers absent from production" list of `roster57.test.ts`;
  deduplicated. The portrait-held status loop of that test (title "Roster54, Roster55,
  Roster56 and Roster57 portrait holds") did not actually list the Roster56 or
  Roster57 holds, so they are now included: hold coverage is strictly stronger.
  `roster58.test.ts` holds each Roster58 hold exactly once in each list.

## Lead Major Achievement gate

Before lead correction: primary-contribution failures **0 (lead-only)**, new
top-omission failures 0 (the 3 on shipped candidates were already caught by agents),
identity failures 0, lead-only novelty issues 0, lead-only side-project issues 0. I
read the first two cards of all 19 shipped drafts; the first card is the defining
contribution for every one (e.g. Kitasato's card 1 is the tetanus culture plus the
jointly authored 1890 paper, attributed jointly with Behring; Hiroshige's is the
Tokaido series; Muir's is the naturalist-writer role named by Britannica; Augustine's
is the Confessions and City of God), and on the final build checked
programmatically that the first Achievement card renders in both locales for all 19
(38 pages). No card was reordered. Final Major Achievement PASS **19/19 shipped**.
Editorial source additions: 0.

## Publication and eligibility

All 19 `published`, directory-visible, `evidence_approved`, frozen before eligibility
was computed (eligibility was computed only after the ship/hold freeze and after all
lead corrections; no rescue was attempted, no row added, no confidence raised).
**Roster58 eligible: 0 of 19.** Per person (rows / coverage / HC count / HC average):
Kiarostami 6/0.181/5/0.542, Bikila 4/0.118/1/0.500, Augustine 5/0.147/4/0.518,
Fukuzawa 5/0.149/4/0.518, Grotius 6/0.184/6/0.528, Nitobe 5/0.142/2/0.510, Muir
7/0.212/4/0.532, Inamori 6/0.174/3/0.500, Kitasato 6/0.177/6/0.555, Yacoub
6/0.188/6/0.552, Saha 7/0.207/7/0.563, Ngugi 6/0.185/6/0.587, Pamuk
6/0.182/4/0.520, Ramabai 7/0.210/7/0.536, Ravi Varma 7/0.210/5/0.518, Clemente
10/0.302/10/0.573, Masiyiwa 7/0.212/5/0.538, Hiroshige 5/0.152/3/0.507, N'Dour
5/0.152/4/0.565. Min / median / max: rows 4 / 6 / 10; coverage 0.118 / 0.182 / 0.302;
HC count 1 / 5 / 10; HC average 0.500 / 0.532 / 0.587. All fail the 18-row / 12-HC
floors.

## Counts

| | Before | After |
|---|---|---|
| Production | 600 | **619** |
| Directory-visible | 599 | **618** |
| Match-eligible | 114 | **114** (0 new) |
| Candidate JSON files | 697 | **727** (19 shipped + 11 held) |
| Non-production candidate files | 119 | **130** |

**A. Category totals** (canonical `categoryCounts.ts` output above; a person counts
once per category containing any of their fields). Production basis: science_knowledge
238 -> 245 (+7), arts_culture 218 -> 227 (+9), leadership_society 97 -> 102 (+5),
building_discovery 194 -> 198 (+4). Directory-visible basis: 238 -> 245, 218 -> 227,
96 -> 101, 193 -> 197. (Categories sum above 19 because Kitasato/Saha/Yacoub and
Hiroshige/Ravi Varma etc. can sit in two.) **B. Match-eligible pools**: science_knowledge
50, arts_culture 43, leadership_society 42, building_discovery 15: unchanged.

## Cumulative cohort

Roster58 shipped 19, eligible 0. Cumulative Roster33-58: **394** shipped, **0**
match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS (no matching
architecture diagnostic was triggered or run).

## Calibration and matching health

`calibrate.ts quiz` x2: identical output (`meanSd` 11.704) and identical
`dispersion.generated.ts` hash on both runs; eligible set unchanged (114), so
focused confirmation only. The file showed a line-ending-only touch (no content
difference ignoring CR) and was restored. Calibration was not tuned. Full
`matching.test.ts` passes with the 19 added to the known-non-eligible lists.

## Validation

- `tsc --noEmit` clean (one type error in the new `categoryCounts.ts` was fixed
  before this run); `validateCandidates` over 727 candidates: 0 errors, 0 warnings
  (551 `evidence_approved`, 93 `qa_passed`, 83 `held`).
- `roster58.test.ts` and the full Vitest suite: 88 files, **5,370 tests** pass.
- FINAL production build (`next build --webpack`, run on the final tree after the
  last user-visible change), literal line
  `✓ Generating static pages using 21 workers (1262/1262) in 27.3s`
  (`2 x 619 + 24 = 1262`).
- FINAL focused Playwright (Person, Editorial, Directory, Compare, Trait Explanation
  specs): **142 passed** on the first run; no failure and no transient failure this
  cycle (the harness rebuilds the site before running).
- **The final build and the final Playwright run both came after the last
  user-visible change** (the last user-visible edits were the Pamuk Korean name, the
  Behring source-title fix and the lead row corrections, all before the build; only
  this checkpoint and `CURRENT_STATE.md` were written afterwards, neither shipped to
  users).
- No performance benchmark was run.

## Manual QA (final production build, localhost)

- All 19 EN and 19 KO profiles 200; all 19 portrait URLs 200; Compare 200 (Grotius,
  Ramabai, Yacoub); all 11 Roster58 holds return 404. No raw `src_` ids, taxonomy
  keys or stray snake_case in rendered text. The Directory shows "618 people".
- True 375px sweep (a real 375x812 browser viewport, both locales, all 19 = 38
  pages): no horizontal overflow, 0 broken images, 0 console errors, the Korean
  display name on every KO page, portrait attribution credit on every page.
- Achievement check on the final build: the first card of every shipped profile
  renders in both locales (38 of 38); no card was reordered, so no reorder re-read
  was needed.
- Bounded source-link sweep (135 URLs from the 19 shipped candidates): 124 x 200;
  10 x 403 (bot wall: Britannica x8, rogerebert.com, loc.gov); 1 x 429 (the Met
  collection page, rate limit; the Met API result was read separately for the
  portrait); 0 x 404; 0 timeouts; 0 TLS/checker failures. No genuine broken link, so
  nothing needed repair.

## Defects found and fixed

- Five frozen candidates already in production (see freeze integrity above), caught
  before any research; process fix recorded.
- emil-von-behring source title "Nobuyuki Okui" -> "Nobuo Okui" (Roster57 record).
- Pamuk Korean name 오르한 파묵 -> 오르한 파무크.
- `categoryCounts.ts` strict-null type error caught by `tsc`.
- `roster57.test.ts` duplicate hold slugs and the missing Roster56/57 holds in its
  portrait-held status loop (above).

## Deferred and not done

The 500-person checkpoint's optional items remain deferred (legacy portrait
recompression, scoring-lock batching, eligible-only quiz index, Directory
virtualization, generated manifest, shared count refactor, wiring-script check-in).
No benchmark, no scale checkpoint, no eligibility rescue, no matching diagnostic
(none triggered). Legacy remains paused (22 / 0); Legacy Batch 6 not started;
Roster59 not started.
