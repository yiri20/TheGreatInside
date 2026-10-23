# Roster53: first roster after the 500-person checkpoint (2026-10-23)

`ROSTER53_BASE_SHA`: `f57a2613b24695d686145ae821f25098b4499f06`, the merge of PR
#65 (the 500-person scale checkpoint; parents `638a4121...` and `d5d812db...`).
That checkpoint classified the product **EXPANSION_GREEN**; this roster resumes
the 500 -> 750 lane. The next planned scale checkpoint is about 750 production
people, earlier only if a real regression appears. No benchmark was run here.

Starting state (mechanically confirmed): production 503, directory-visible 502,
match-eligible 114, candidate JSON 577, legacy baseline 22 / 0 flagged.
Classification carried forward: CONTINUE_EXPANSION_AS_IS.

## Frozen 15 (all fresh, all shipped, 0 held, 0 backlog reuse)

Backlog: one mechanical inventory, 96 non-production candidates (13
`evidence_approved`, 83 `held`); no concrete new signal for any; none reopened.

| Slug | QID | Portfolio | Tier | Region | Rows | Cited sources |
|---|---|---|---|---|---|---|
| sylvia-earle | Q439046 | building_discovery | field-famous | north_america | 7 | 9 |
| eliud-kipchoge | Q9124 | building_discovery | international | sub_saharan_africa | 6 | 7 |
| tadao-ando | Q208220 | building_discovery | field-famous | east_asia | 7 | 7 |
| phil-knight | Q557305 | building_discovery | international | north_america | 6 | 8 |
| john-glenn | Q182642 | building_discovery | international | north_america | 6 | 9 |
| alan-kay | Q92742 | building_discovery | field-famous | north_america | 6 | 7 |
| antonio-vivaldi | Q1340 | arts_culture | international | southern_europe | 7 | 7 |
| kazuo-ishiguro | Q272855 | arts_culture | international | western_europe | 6 | 7 |
| a-r-rahman | Q108560 | arts_culture | international | south_asia | 5 | 8 |
| jimi-hendrix | Q5928 | arts_culture | international | north_america | 5 | 8 |
| astor-piazzolla | Q172505 | arts_culture | field-famous | latin_america | 7 | 9 |
| geoffrey-hinton | Q92894 | science_knowledge | international | north_america | 4 | 8 |
| oliver-sacks | Q258662 | science_knowledge | international | western_europe | 6 | 9 |
| lynn-margulis | Q234583 | science_knowledge | field-famous | north_america | 7 | 7 |
| edward-o-wilson | Q211029 | science_knowledge | field-famous | north_america | 10 | 6 |

Portfolio 6 / 5 / 4. Recognizability: 9 international, 6 field-famous, 0
long-tail (slightly below the 10-11 international target; chosen for clean
portrait and evidence viability). Regions covered: north_america, western_europe, southern_europe, east_asia,
south_asia, latin_america, sub_saharan_africa (seven of the eleven). Source counts are cited
non-Wikidata sources (including the portrait page where recorded); every
candidate records >=2 independent perspectives, >=1 substantive non-self
behavioural source and a labelled CANONICAL SIGNIFICANCE SOURCE in
`provenance.notes`. Research ran two agents at a time.

## Held / blockers

None. Earlier holds (Hooke, Schrodinger, Lamborghini, Caravaggio, Royce,
Sullivan, Potter, Godel, Mirzakhani, Hillary, Uemura, Roddick, ...) remain
unpromoted and absent from production.

## Publication and eligibility

All 15 `published`, directory-visible, `evidence_approved`. Everything (rows,
scores, confidence, evidenceType, classification, metadata, portrait,
editorial, publication decision) was frozen before eligibility was computed.
**Roster53 eligible: 0 of 15** (honest sparse profiles; no rescue).
Per-candidate (coverage / HC count / HC average): Rahman 0.147/4/0.525, Kay
0.181/3/0.547, Vivaldi 0.209/7/0.546, Piazzolla 0.212/7/0.560, Wilson
0.296/10/0.576, Kipchoge 0.182/5/0.540, Hinton 0.130/3/0.577, Hendrix
0.152/5/0.534, Glenn 0.191/3/0.533, Ishiguro 0.178/5/0.544, Margulis
0.212/5/0.568, Sacks 0.185/4/0.532, Knight 0.184/3/0.517, Earle
0.219/6/0.535, Ando 0.212/5/0.568. Min/median/max: rows 4/6/10; coverage
0.130/0.185/0.296; HC count 3/5/10; HC average 0.517/0.544/0.577. All fail the
18-row / 12-HC floors.

## Portraits

All 15 files exist, open, match recorded dimensions, none upscaled. Kinds:
14 `likeness`, 1 `historical_depiction` (Vivaldi, anonymous 1723 painting in
Bologna; the Morellon la Cave attribution is not claimed). Notable bases and
reconciliations:
- **Piazzolla**: the Wikidata image was rejected (Commons says "Copyright by
  Pupeto Mastropasqua", with a URAA warning); replaced by Carlos Ebert's
  CC BY 2.0 photo (Flickr-reviewed on Commons). Weakest portrait of the batch:
  the photo's date is unknown and authorship rests on the uploader's own
  statement.
- **Hendrix**: A. Vente (VPRO) 1967, CC BY-SA 3.0; the Beeld en Geluid wiki
  states CC BY-SA but shows only a smaller rendition, so the derivation of the
  larger Commons crop is not independently documented (recorded in notes).
- **Sacks**: Luigi Novi 2009 (CC BY 3.0, visible credit) chosen over the
  Brain Pickings-sourced Wikidata image, which has no permission statement.
- **Earle**: NOAA NURP public-domain photo (via Commons PD-USGov-NOAA); NOAA's
  own page was behind a CAPTCHA, so its notice could not be read directly.
- **Glenn**: NASA official portrait S62-05540, downscaled from the NASA original;
  the Senate-office Commons image was not used.
- **Rahman**: Desmond Herzfelder 2025 (CC BY 4.0) chosen over a publicity
  gallery image. **Ishiguro**: Fouganthin 2017 (CC BY-SA 4.0).
- **Knight, Kipchoge, Ando, Kay, Hinton, Margulis, Wilson**: CC BY / CC BY-SA
  Flickr- or Commons-reviewed photographs; Wilson's is small (420x594) with a
  dark wedge from the original crop.

## Agent Achievement self-gate (first pass, 15 candidates)

Primary FAIL 1 (Earle), top-omission FAIL 5 (Earle, Kipchoge, Hendrix, Hinton,
Wilson), identity FAIL 0, significance-over-novelty FAIL 0, side-project FAIL
0. Corrections: Earle rewritten around the algae/science card and Mission Blue;
Kipchoge gained the track/Olympic card; Hendrix gained later-genre influence
and studio technology; Hinton's supervision card replaced by backpropagation
and the Turing Award; Wilson gained Biophilia and the Pulitzer-winning The
Ants. Other self-gate choices: Vivaldi's ritornello claim phrased as "credited
with"; Glenn's Senate career excluded; Knight's labour claims carded only as
allegations plus his rebuttal.

## Selective high-risk row calibration

About 2-3 rows reviewed per candidate. Agents lowered 11 rows: Earle risk
tolerance; Kipchoge discipline and detail orientation; Ando curiosity; Knight
risk tolerance; Glenn curiosity; Kay creative originality; Ishiguro detail
orientation; Rahman execution speed; Hendrix creative originality; Wilson
persuasiveness. Reasons: single-source or retold-single-episode support,
retrospective admiration without adversarial corroboration, team-hosted or
self-reported accounts. Zero reductions for Vivaldi, Piazzolla, Hinton,
Sacks and Margulis (each reviewed, each kept for a stated reason). No blanket
lowering.

## Lead review

Additional lead downward corrections: **4 rows**, all before eligibility, all
with a `RUBRIC_CORRECTION` note.
- Sacks `analytical_rigor` re-based from 40 / 0.52 strong_inference to
  44 / 0.44 inference: the fabrication finding reaches the profile only
  through three commentaries on a New Yorker investigation that was never
  opened (confidence and evidence type lowered; the score moved toward neutral
  because the evidence is weaker).
- Wilson `cross_domain_range` 80/0.66 -> 76/0.60, `mastery_orientation`
  78/0.62 -> 74/0.56, `curiosity` 76/0.62 -> 72/0.54: every Wilson row rests on
  obituaries or a memorial minute from one admiring register.
Metadata checks: Sacks dual `GB`/`US` nationality kept per the Dyson/Hitchcock/
Chaplin precedent (no read source states his naturalisation; flagged); Hinton
region `north_america` by the Pichai/Nadella precedent; Rahman birth year 1967
(Fukuoka Prize; Wikidata holds both 1966 and 1967).

## Lead Major Achievement gate

Before lead correction: primary failures 0, top-omission failures 0 new (the 5
above were already caught by agents), identity failures 0, lead-only novelty
issues 0, lead-only side-project issues 0. Final Major Achievement PASS
**15/15**. Editorial source additions: 0.

## Counts

| | Before | After |
|---|---|---|
| Production | 503 | **518** |
| Directory-visible | 502 | **517** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 577 | **592** |

**A. Published/directory field-category coverage**: science_knowledge 208 ->
212 (+4); arts_culture 184 -> 191 (+7, one person counts in two categories);
leadership_society 79 -> 80 (+1); building_discovery 158 -> 164 (+6).
**B. Match-eligible pools** (114 people): science_knowledge 50, arts_culture
43, leadership_society 42, building_discovery 15: unchanged.

## Recent cohort watch (recorded, not re-analyzed)

Roster53 shipped 15, eligible 0. Cumulative Roster33-53: **293** shipped, **0**
match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS.

## Calibration and matching health

`calibrate.ts quiz` x2: identical output (`meanSd` 11.704); eligible set
unchanged (114), so focused confirmation only; `dispersion.generated.ts` showed
a line-ending-only touch and was restored. Full `matching.test.ts` passes with
the 15 added to the known-non-eligible lists. No architecture diagnostic.

## Validation

- `tsc --noEmit`: clean. `validateCandidates`: 0 errors, 0 warnings.
- `roster53.test.ts` and the full Vitest suite: 83 files, **4,174 tests**
  pass. No new vocabulary gap this cycle (no new label or taxonomy id needed).
- Production build: success, literal line
  `✓ Generating static pages using 21 workers (1060/1060) in 26.7s`
  (`2 x 518 + 24 = 1060`; the static-path formula still holds).
- Focused Playwright (Person, Editorial, Directory, Compare): 128 passed.
- Not run, by instruction: any performance benchmark or scale checkpoint.

## Manual QA (production build, localhost)

- All 15 EN and 15 KO profile routes 200; all 15 portrait URLs 200; Compare
  200 (Earle, Hendrix, Sacks); earlier holds 404. No raw `src_` ids or taxonomy
  keys in rendered text; the one snake_case-like token (`plos_wilson`) is a
  filename inside Wilson's portrait source text, not an internal id.
- True 375px sweep (hidden-iframe loop, both locales, all 15): no horizontal
  overflow, 0 broken images.
- Rendered Achievement spot-read (6): Vivaldi, Piazzolla (arts); Hinton,
  Margulis (science/technology); Glenn, Kipchoge (exploration/sport): the first
  card of each states the defining contribution: PASS 6/6. No new profile is
  match-eligible, so there is no eligible profile to spot-check.
- Bounded source-link sweep (131 URLs): 126 x 200; 4 x 403 (bot wall:
  Britannica x3, Architizer); 0 x 404; 0 x 429; 0 timeouts; 1 TLS/checker
  failure (blackgate.com).
- Deployed-site portrait 200s are confirmed after the Vercel deploy and merge.

## Narrow defects

None required a fix this cycle.

## Deferred (explicitly not done here)

The 500-person checkpoint's optional items remain deferred: the three legacy
portrait recompressions, scoring-lock `git cat-file` batching, the eligible-only
quiz index, Directory virtualization, a generated roster manifest, shared
production-count infrastructure and wiring-script check-in. No performance
benchmark was run. Legacy remains paused (22 / 0); Legacy Batch 6 not started.

## Post-commit scoring lock

Recorded in the docs-only follow-up commit.
