# Roster55: first 30-candidate roster (2026-10-24)

`ROSTER55_BASE_SHA`: `216ceb37b6b5234a7eb7ee118a5f44f8957a5bbf`, the merge of PR
#67 (Roster54; parents `60d9e02b...` and `3aa5235d...`, merged
2026-10-24T00:41:42-06:00). The 500-person scale checkpoint remains
**EXPANSION_GREEN**; the lane is 500 -> 750 and the next planned scale
checkpoint is about 750 production people. No benchmark was run.

Starting state (mechanically confirmed): production 531, directory-visible 530,
match-eligible 114, candidate JSON 607, legacy baseline 22 / 0 flagged.

**Roster54 deployed-site sanity check (after the PR #67 merge and production
deploy):** 13/13 EN profile routes 200, 13/13 KO profile routes 200, 13/13
portrait URLs 200; Stephen Jay Gould and Irene Joliot-Curie return 404 (absent
from production); the Directory showed "530 people".

## Frozen 30: 22 shipped, 8 held, 0 backlog reuse

Backlog: one mechanical inventory, 98 non-production candidate files (83
`held`, 15 `evidence_approved`, 14 of those with held portraits and Edmund
Hillary found-but-unshipped for the old Oceania-region reason). No concrete new
signal for any; none reopened. Research ran at most four agents at a time, in 10
groups of three; two groups were cut off by a usage limit and four by stream
stalls, and all were resumed from saved work (no candidate was redone or
replaced).

| Slug | Portfolio | Tier | Region | Rows | Cited sources | Outcome |
|---|---|---|---|---|---|---|
| wayne-gretzky | building (sport) | international | north_america | 5 | 9 | shipped |
| larry-ellison | building (business) | international | north_america | 6 | 8 | shipped |
| satoru-iwata | building (business/technology) | field-famous | east_asia | 7 | 9 | shipped |
| john-mccarthy | building (computing) | field-famous | north_america | 10 | 9 | shipped |
| marvin-minsky | building (computing) | field-famous | north_america | 11 | 6 | shipped |
| ellen-macarthur | building (sport/exploration) | field-famous | western_europe | 8 | 10 | shipped |
| ranulph-fiennes | building (exploration) | international | western_europe | 7 | 8 | shipped |
| ingvar-kamprad | building (business/design) | international | western_europe | 7 | 8 | shipped |
| miguel-de-cervantes | arts | international | southern_europe | 5 | 5 | shipped |
| joseph-haydn | arts | international | central_europe | 7 | 7 | shipped |
| luciano-pavarotti | arts | international | southern_europe | 9 | 7 | shipped |
| yo-yo-ma | arts | international | north_america | 7 | 5 | shipped |
| neil-degrasse-tyson | science | international | north_america | 4 | 6 | shipped |
| bernhard-riemann | science | field-famous | western_europe | 7 | 6 | shipped |
| terence-tao | science | field-famous | north_america | 7 | 7 | shipped |
| christiaan-barnard | science | field-famous | sub_saharan_africa | 5 | 6 | shipped |
| maria-montessori | leadership/society | international | southern_europe | 9 | 8 | shipped |
| john-dewey | leadership/society | international | north_america | 9 | 8 | shipped |
| henry-dunant | leadership/society | field-famous | western_europe | 9 | 7 | shipped |
| albert-schweitzer | leadership/society | international | western_europe | 11 | 10 | shipped |
| louis-brandeis | leadership/society | field-famous | north_america | 9 | 9 | shipped |
| muhammad-yunus | leadership/society | international | south_asia | 8 | 8 | shipped |
| dante-alighieri | arts | international | southern_europe | 4 | 7 | **held** |
| paul-klee | arts | field-famous | central_europe | 7 | 7 | **held** |
| bela-bartok | arts | field-famous | central_europe | 10 | 5 | **held** |
| albert-camus | arts | international | western_europe | 6 | 8 | **held** |
| daniel-kahneman | science | international | north_america | 5 | 7 | **held** |
| adam-smith | science | international | western_europe | 7 | 6 | **held** |
| b-f-skinner | science | field-famous | north_america | 6 | 8 | **held** |
| karl-popper | science | field-famous | western_europe | 7 | 6 | **held** |

Frozen portfolio 8 building / 8 arts / 8 science / 6 leadership-society;
shipped 8 / 4 / 4 / 6. Frozen recognizability about 17 international and 13
field-famous. Every candidate records >=2 independent perspectives, >=1
substantive non-self behavioural source and a labelled CANONICAL SIGNIFICANCE
SOURCE in `provenance.notes`. Leadership/society is educators, a humanitarian,
a jurist and a social entrepreneur; no one was selected for a political
identity, and political roles (Dewey's activism, Brandeis' Zionist leadership,
Yunus' 2007 party and 2024 government role, Camus' Resistance and Algeria
positions, Montessori and Fascism, Popper's Open Society) are unscored context.

## Held candidates

All eight are `evidence_approved` with `portrait.status: held`, outside the
generator allowlist and absent from production. All research is reusable. No
replacement was added.

| Slug | Exact portrait blocker | Next step |
|---|---|---|
| dante-alighieri | Botticelli portrait (Bodmer): PD by age, but its source is the Web Gallery of Art whose terms could not be opened, the Bodmer foundation terms were unavailable, and which Bodmer object is meant is unsettled | read the Bodmer or Web Gallery of Art terms; else a national-library manuscript scan, recorded as a historical depiction |
| paul-klee | no lifetime photograph with a confirmed creator, date and rights; best lead is the Erfurth 1927 file (Erfurth d.1948, Commons PD-old-auto-expired) but its cited Bauhaus Kooperation page could not be opened | confirm Erfurth's credit/date/rights from the Bauhaus Kooperation page or a Pompidou/Zentrum Paul Klee print record |
| bela-bartok | every Commons candidate fails on provenance: date/place contradictions, unknown authors, a credit the cited page does not support, group shots | a dated, creator-credited image from the Bartok Archives, the Hungarian National Museum or a Library of Congress item with a named photographer |
| albert-camus | the UPI/LoC 1957 photo is tagged PD-US only and loc.gov could not confirm the basis; the Harcourt 1945 photo rests on a "collective work" theory while the French state agency sells it; the Marton image is a book-cover photo | an explicit rights statement from the Library of Congress or the Nobel Foundation |
| daniel-kahneman | the nrkbeta photo has a licence mismatch (Commons CC BY-SA 2.0, Flickr text CC BY-SA 3.0 Norway) and never names the sitter; the Bar-Hillel photo is a distant two-person shot | confirm the sitter and licence with NRKbeta, or find a clean portrait |
| adam-smith | the only usable image (Muir portrait, NGS PG 1472) is labelled "Creative Commons CC by NC" on the NGS page, conflicting with the Commons PD-Art tag | a source stating its own PD terms, or ask NGS about the label |
| b-f-skinner | Commons images are "own work"/"self-made" uploader claims with no photographer or archive; LIFE photos are Time Inc. copyright | find the photographer or archive (Harvard University Archives, the B. F. Skinner Foundation) |
| karl-popper | the LSE Library/Barta file carries a "no known copyright restrictions" tag and sits in a deletion-request category; other files carry the same tag or are documents | a licence from LSE Library or the photographer, or a pre-1930 portrait with a verifiable creator |

## Portrait decisions and caveats (22 shipped)

All 22 files exist, open, match recorded dimensions; none upscaled. Kinds: 19
`likeness`, 3 `historical_depiction` (Cervantes, Haydn, Riemann). Notable bases:
- **Cervantes**: c.1600 panel attributed to Jauregui (Real Academia de la
  Historia), explicitly not an authentic likeness. **Riemann**: Smithsonian
  Libraries 1863 engraving ("no known restrictions"; age plus that statement,
  not an affirmative licence); Commons wrongly calls it a photograph.
- **Haydn**: Hardy 1791, Royal College of Music. Art UK carries a generic
  non-commercial notice for its photograph; this makes no claim of copyright in
  the 1791 painting (public domain by age; faithful reproduction creates no new
  US copyright; the Commons file came from the RCM's own image server). Because
  no source says Haydn sat for it, it is classed as a historical depiction.
- **Dunant**: Rietmann c.1896 via Wellcome Collection (Public Domain Mark),
  attributed by matching the 1896 Gartenlaube print caption.
- **Montessori / Brandeis**: Library of Congress Bain and Harris & Ewing
  negatives (pre-1931 news-agency photographs; the LoC rights pages were read
  through archive copies because loc.gov blocks bots); Brandeis's date is
  "1916?". **Dewey**: Watson-Schutze 1902 (photographer d.1935); the SIU
  collection page could not be reached.
- **Barnard**: Anefo/Nationaal Archief 1968, CC0 (the archive's own record page
  is script-rendered and could not be read). **Tao**: Oberwolfach MFO photo
  (CC BY-SA 2.0 DE; licence supported by MFO's terms; small, 400x266,
  watermarked).
- **Minsky**: Joichi Ito 2012 (CC BY 2.0, Flickr re-checked); the sitter is
  identified by the photographer's file title only. **Pavarotti**: John Mathew
  Smith (CC BY-SA 2.0, Commons review); the date is uncertain (2001 or 2004).
  **Yo-Yo Ma**: Sam Felder 2002 (CC BY-SA 2.0), only 361x591.
- **Gretzky**: CC0 crop of an Andrew Scheer Flickr photo (the photographer
  credit comes from Commons). **Ellison**, **Iwata**: CC BY 2.0 corporate/event
  Flickr accounts with no named photographer. **Tyson**: NTNU/Thor Nielsen CC BY-SA
  2.0, sitter's name from a Wayback copy of the Flickr caption. **Kamprad**:
  Swedish Ministry of Enterprise Flickr photo, CC BY 2.0 (the Wikidata "copyrighted
  free use" image was rejected). **Fiennes**: pseudonymous own-work CC BY-SA 3.0.
  **McCarthy**, **MacArthur**, **Schweitzer** (Bundesarchiv CC BY-SA 3.0 DE),
  **Yunus** (University of Salford CC BY 2.0): standard reviewed bases.

## Agent Achievement self-gate (first pass, 30 candidates)

Primary FAIL 0, identity FAIL 0. On the **22 shipped**: top-omission FAIL 7
(Iwata, Tyson, Pavarotti, Yo-Yo Ma, Dewey, Dunant, Tao), significance-over-novelty
FAIL 2 (Tyson, Montessori), side-project FAIL 2 (Fiennes, Pavarotti). On the **8
held**: top-omission FAIL 6, significance-over-novelty FAIL 1 (Skinner),
side-project FAIL 2 (Smith, Skinner). All corrected before return, e.g. Tyson's
Hayden directorship moved ahead of a Pluto card; Montessori's "first woman
physician" claim replaced by the Orthophrenic School; Dunant's cards now say "one
of five founders"; Tao's compressed sensing added; Pavarotti's Met career
replaced a Bosnia-concert card.

## Selective high-risk row calibration

About 2-3 rows reviewed per candidate. Agents lowered **17 rows on the shipped
22** (Gretzky 1, Ellison 1, Iwata 1, McCarthy 2, Minsky 2, MacArthur 1, Kamprad
1, Pavarotti 2, Yo-Yo Ma 2, Montessori 2, Dewey 1, Dunant 1 [confidence 0.45 ->
0.40 on planning_orientation]) and 4 on held candidates (Dante 1, Klee 1,
Bartok 2). Reasons: single-source or retold-single-episode support, one admiring
witness, self-account, outcome borrowed from another source, or an indirect
measure. Strong corroborated rows were kept. Zero lowerings is valid and
occurred for Fiennes, Cervantes, Haydn, Tyson, Riemann, Tao, Barnard, Schweitzer,
Brandeis and Yunus. No blanket lowering.

## Lead review

Additional lead downward corrections: **13 rows**, all before eligibility, all
with a `RUBRIC_CORRECTION` note: Riemann creative_originality 84/0.72 ->
80/0.64; Tao collaboration 84/0.70 -> 80/0.64 and cross_domain_range 82/0.70 ->
78/0.62; Schweitzer cross_domain_range 80/0.70 -> 76/0.62 and impact_motivation
78/0.62 -> 74/0.56; Brandeis analytical_rigor 80/0.68 -> 76/0.62 and
independent_thinking 78/0.66 -> 74/0.60; Yunus impact_motivation and
proactive_agency 78/0.62 -> 74/0.54; Minsky creative_originality 80/0.66 ->
76/0.60 and cross_domain_range 80/0.64 -> 76/0.58; Yo-Yo Ma collaboration and
cross_domain_range 78/0.64 -> 72/0.56. Reasons: award-body or admiring
institutional concentration, no biography-level behavioural account opened,
or a single independent source. Haydn's portrait kind was changed to
`historical_depiction` and the Art UK notice reconciled (above). Region checks:
Tao `north_america` (Australia/Oceania has no region); Dunant
`western_europe` (Swiss majority precedent; judged humanitarian relief, not
diplomacy); Schweitzer `western_europe`; Hinton-style career-base mapping used
for Yo-Yo Ma. Korean-name note: Fiennes 랜널프 파인스 is a transliteration with no
Wikidata or Korean Wikipedia label.

## Lead Major Achievement gate

Before lead correction: primary-contribution failures 0, top-omission failures
0 new (the 7 on shipped candidates were already caught by agents), identity
failures 0, lead-only novelty issues 0, lead-only side-project issues 0. I read
the first cards of the 13 most uncertain shipped candidates in draft form and the
rest through the tests. Final Major Achievement PASS **22/22 shipped**. Editorial
source additions: 0.

## Publication and eligibility

All 22 `published`, directory-visible, `evidence_approved`, frozen before
eligibility was computed. **Roster55 eligible: 0 of 22.** Per candidate
(coverage / HC count / HC average): Schweitzer 0.327/10/0.564, Riemann
0.204/6/0.557, Barnard 0.153/4/0.542, MacArthur 0.242/7/0.593, Dunant
0.270/7/0.583, Kamprad 0.206/4/0.575, Dewey 0.264/9/0.573, McCarthy
0.302/9/0.589, Haydn 0.212/6/0.577, Ellison 0.178/1/0.550, Brandeis
0.272/7/0.606, Pavarotti 0.280/6/0.520, Montessori 0.277/8/0.585, Minsky
0.326/11/0.563, Cervantes 0.152/4/0.583, Yunus 0.242/8/0.555, Tyson
0.109/3/0.543, Fiennes 0.216/6/0.573, Iwata 0.204/4/0.525, Tao 0.210/7/0.569,
Gretzky 0.149/3/0.530, Yo-Yo Ma 0.209/7/0.559. Min/median/max: rows 4/7/11;
coverage 0.109/0.214/0.327; HC count 1/6.5/11; HC average 0.520/0.566/0.606. All
fail the 18-row / 12-HC floors. No rescue was attempted.

## Counts

| | Before | After |
|---|---|---|
| Production | 531 | **553** |
| Directory-visible | 530 | **552** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 607 | **637** (22 shipped + 8 held) |

**A. Published/directory field-category coverage**: science_knowledge 214 ->
223 (+9); arts_culture 198 -> 204 (+6); leadership_society 81 -> 87 (+6);
building_discovery 171 -> 181 (+10) (multi-category people count once per
category). **B. Match-eligible pools**: science_knowledge 50, arts_culture 43,
leadership_society 42, building_discovery 15: unchanged.

## Recent cohort watch (recorded, not re-analyzed)

Roster55 shipped 22, eligible 0. Cumulative Roster33-55: **328** shipped, **0**
match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS.

## Calibration and matching health

`calibrate.ts quiz` x2: identical (`meanSd` 11.704); eligible set unchanged
(114), so focused confirmation only. `dispersion.generated.ts` showed a
line-ending-only touch and was restored. Full `matching.test.ts` passes with the
22 added to the known-non-eligible lists. No architecture diagnostic.

## Validation

- `tsc --noEmit` clean; `validateCandidates` 0 errors, 0 warnings.
- `roster55.test.ts` 259 tests; full Vitest 85 files, **4,593 tests** pass. No
  vocabulary gap surfaced; the held candidates were the only ones using the
  unlabeled `psychology` and `economics` fields.
- Production build success, literal line
  `✓ Generating static pages using 21 workers (1130/1130) in 20.7s`
  (`2 x 553 + 24 = 1130`).
- Focused Playwright (Person, Editorial, Directory, Compare): **128 passed** on
  the final run. On the first run one test failed
  (`people directory @ ko-KR: renders, correct heading hierarchy, no overflow`,
  127 passed / 1 failed); it passed alone and in a full re-run with no code
  change, so it is recorded as a transient failure under heavy machine load.
- No performance benchmark was run.

## Manual QA (production build, localhost)

- All 22 EN and 22 KO profiles 200; all 22 portrait URLs 200; Compare 200
  (Tao, Dunant, Haydn); all 8 held candidates 404. No raw `src_` ids or taxonomy
  keys in rendered text.
- **One narrow defect found and fixed:** Haydn's portrait source text (shown on
  the page) contained the internal id `historical_depiction`; reworded to "historical
  depiction", `roster55.ts` and the people index regenerated, the project
  rebuilt and re-checked clean.
- True 375px sweep (hidden iframes, both locales, all 22 = 44 pages): no
  horizontal overflow, 0 broken images.
- Rendered Achievement spot-read (6 on the final build): Cervantes (arts);
  Riemann, Tao, Barnard (science); Iwata (technology/business); Montessori
  (education): the first card of each states the defining contribution: PASS 6/6.
  The arts-heavy remainder (Haydn, Pavarotti, Yo-Yo Ma) and exploration/sport
  (MacArthur, Fiennes, Gretzky) were read in editorial-draft form and pass; the
  roster test confirms every key resolves in both locales. No new profile is
  match-eligible.
- Bounded source-link sweep (185 URLs): 173 x 200; 10 x 403 (bot wall:
  Britannica x5, Stanford News, History Today, AmAcad, loc.gov, CGD); 1 x 202
  (accepted asynchronously: an Oxford page); 0 x 404; 0 x 429; 0 timeouts; 1
  TLS/checker failure (hhof.com).

## Deferred and not done

The 500-person checkpoint's optional items remain deferred (legacy portrait
recompression, scoring-lock batching, eligible-only quiz index, Directory
virtualization, generated manifest, shared count refactor, wiring-script
check-in). No benchmark, no scale checkpoint, no eligibility rescue, no matching
diagnostic. Legacy remains paused (22 / 0); Legacy Batch 6 not started; Roster56
not started.

## Post-commit scoring lock

Recorded in the docs-only follow-up commit.
