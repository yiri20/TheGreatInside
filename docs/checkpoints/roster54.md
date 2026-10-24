# Roster54: second roster after the 500-person checkpoint (2026-10-24)

`ROSTER54_BASE_SHA`: `60d9e02beb36b20687113f8ad5500b064e489e06`, the merge of PR
#66 (Roster53; parents `f57a2613...` and `b316f633...`). The 500-person scale
checkpoint remains **EXPANSION_GREEN**; the lane is 500 -> 750 and the next
planned scale checkpoint is about 750 production people. No benchmark was run.

Starting state (mechanically confirmed): production 518, directory-visible 517,
match-eligible 114, candidate JSON 592, legacy baseline 22 / 0 flagged.

**Roster53 deployed-site sanity check (post-merge, once the production deploy
was live):** 15/15 EN profile routes 200, 15/15 KO profile routes 200, 15/15
portrait URLs 200.

## Frozen 15: 13 shipped, 2 held, 0 backlog reuse

Backlog: one mechanical inventory, 96 non-production candidates (13
`evidence_approved`, 83 `held`), no concrete new signal, none reopened.

| Slug | QID | Portfolio | Tier | Region | Rows | Cited sources | Outcome |
|---|---|---|---|---|---|---|---|
| sachin-tendulkar | Q9488 | building (sport) | international | south_asia | 9 | 8 | shipped |
| konosuke-matsushita | Q252785 | building (business) | international | east_asia | 8 | 8 | shipped |
| fei-fei-li | Q18686107 | building (computing) | international | north_america | 5 | 6 | shipped |
| ray-kroc | Q319648 | building (business) | international | north_america | 5 | 7 | shipped |
| robert-ballard | Q312867 | building (exploration) | field-famous | north_america | 8 | 8 | shipped |
| bjarne-stroustrup | Q92620 | building (computing) | field-famous | north_america | 6 | 8 | shipped |
| prince | Q7542 | arts | international | north_america | 9 | 8 | shipped |
| madonna | Q1744 | arts | international | north_america | 7 | 6 | shipped |
| piet-mondrian | Q151803 | arts | international | western_europe | 7 | 8 | shipped |
| maurice-ravel | Q1178 | arts | international | western_europe | 6 | 7 | shipped |
| george-lucas | Q38222 | arts (film) | international | north_america | 9 | 8 | shipped |
| friedrich-nietzsche | Q9358 | science (philosophy) | international | western_europe | 8 | 7 | shipped |
| david-attenborough | Q183337 | science (natural history) | international | western_europe | 8 | 9 | shipped |
| stephen-jay-gould | Q180619 | science | field-famous | north_america | 8 | 7 | **held** |
| irene-joliot-curie | Q7504 | science | field-famous | western_europe | 7 | 9 | **held** |

Portfolio frozen as 6 / 5 / 4 (Lucas is film and counts under arts_culture;
Attenborough's fieldIds land in the science group). Recognizability: 11
international, 4 field-famous, 0 long-tail. Every candidate records >=2
independent perspectives, >=1 substantive non-self behavioural source and a
labelled CANONICAL SIGNIFICANCE SOURCE in `provenance.notes`. Research ran two
agents at a time, plus one bounded portrait-retry agent.

## Held candidates

| Slug | Exact blocker | Reusable research | Next step |
|---|---|---|---|
| stephen-jay-gould | no concretely rights-clear portrait: the Lipke 1980 and Taylor 1985 dust-jacket files rest on an unproven "no copyright notice" theory (eBay-sourced, no registration check); the Kathy Chapman photo has only an emailed permission; Smithsonian Archives returned 403; Wellcome, Harvard MCZ and Commons categories had nothing | yes (8 rows, 7 sources, editorial draft) | written licence, a US Copyright Office registration check on the jackets, or a Harvard MCZ/Smithsonian image with stated terms |
| irene-joliot-curie | no rights-clear portrait: the Horovitz 1932 Commons file has an open deletion request ("Not public domain yet"; photographer d.1959); the 1921 Smithsonian (Stokley) photo shows "Copyright Not Evaluated" in the Archives record; the LOC print is a dark profile beside another man; the Harcourt 1935 photo has no item-level licence | yes (7 rows, 9 sources, editorial draft) | ask the Smithsonian whether the Stokley photo was published in 1921, or find a CC0/PD alternative |

Both are `evidence_approved` with `portrait.status: held`, outside the
generator allowlist, and absent from production. No replacement was added.

## Portraits (13 shipped)

All 13 files exist, open, match recorded dimensions; none upscaled; all
`likeness`. Notable bases and reconciliations:
- **Attenborough**: the first image (Downing Street 2025) had an account-level
  OGL note but a photo-level Flickr licence of CC BY-NC-ND 2.0 and a title
  naming a different person, so it was replaced by the FCO 6 July 2010 photo
  (photo-level CC BY 2.0 on Flickr; Commons FCDO/OGL tag with a permission
  ticket). Its Commons page is still in its "to check" category. The old file
  was deleted.
- **Kroc**: first held (the Wikidata image is an eBay-sourced Padres press
  photo); the retry found Sigfried Rodig's photo (Knauss Verlag), CC BY-SA 4.0
  with a permission ticket on the file page, cropped to Kroc. The photograph has
  no stated date (recorded as "c. 1970s (undated)") and his identification rests
  on the Commons/Wikipedia caption; the licence basis does not depend on the
  date.
- **Matsushita**: the Wikidata image was rejected (Not-PD-US-URAA); a 1929 photo
  tagged PD-Japan-oldphoto (also in a 1935 National Diet Library book) was used;
  Panasonic's own pages were unreachable.
- **Mondrian**: the 1922 De Stijl anonymous photograph (documented first
  publication); photographer unknown. **Ravel**: Henri Manuel 1925 from the BnF
  Gallica (creator named, "domaine public"), only 421x616. **Nietzsche**:
  Schultze 1882 (photographer d.1897).
- **Lucas**: Payravi/WikiPortraits 2024 (CC BY-SA 4.0, own work) instead of a
  Flickr file that now 404s. **Fei-Fei Li**: ITU Pictures 2017 (CC BY 2.0,
  Flickr-reviewed). **Prince**: Lorson 1986 (CC BY 2.0; the Flickr page 404'd, so
  the licence rests on the Commons review record). **Madonna**: Raph_PH 2023
  (CC BY 2.0). **Tendulkar**: Blnguyen 2008 own-work (his identity rests on the
  uploader's description; no licence-review tag). **Ballard**: Titanic Belfast
  2023 (CC BY 2.0, Flickr-reviewed). **Stroustrup**: Zavyalov/ICPC 2013
  (CC BY 2.0, Flickr-reviewed; identity by Commons category).

## Agent Achievement self-gate (first pass, 15 candidates)

Primary FAIL 0, top-omission FAIL 6 (Kroc, Madonna, Ravel, Lucas, Nietzsche,
Gould), identity FAIL 0, significance-over-novelty FAIL 0, side-project FAIL 0.
All corrected before return: Kroc's third card replaced (Padres/charity) by the
1961 buyout and a founder-claim note; Madonna gained Like a Virgin/Vogue/video;
Ravel's orchestration card now covers Pictures at an Exhibition; Lucas gained
Indiana Jones and the rights deal; Nietzsche's cards rewritten around the mature
works and influence; Gould's cards name The Mismeasure of Man and Wonderful Life.

## Selective high-risk row calibration

About 2-3 rows reviewed per candidate. Agents lowered **13 rows on the 13
shipped candidates**: Kroc opportunity sensing; Ballard persuasiveness;
Stroustrup systems abstraction; Prince execution speed; Madonna execution speed;
Mondrian perfectionism and independent thinking; Ravel detail orientation and
independent thinking; Lucas autonomy need; Nietzsche autonomy need;
Attenborough planning orientation and persuasiveness. Tendulkar, Matsushita and
Li had zero agent lowerings. On the held pair agents lowered 3 more (Gould
creative originality and persuasiveness; Joliot-Curie collaboration). Reasons:
single-source or retold-single-episode support, self-stated practice,
retrospective admiration, indirect measures, a critic who disputes the outcome.
Strong corroborated rows were kept. No blanket lowering.

## Lead review

Additional lead downward corrections: **5 rows**, all before eligibility, all
with a `RUBRIC_CORRECTION` note.
- Tendulkar `discipline` 78/0.65 -> 74/0.58, `mastery_orientation` 78/0.60 ->
  74/0.55, `achievement_drive` 80/0.58 -> 76/0.54: support concentrated in two
  testimonials hosted by the Indian cricket board plus a retirement essay.
- Nietzsche `independent_thinking` 80/0.66 -> 76/0.60 and `creative_originality`
  78/0.64 -> 74/0.58: every row rests on encyclopedia/chronology summaries, no
  full biography read.
Metadata checks: Nietzsche region `western_europe` (the majority German-national
precedent, e.g. Kant, Einstein; Goethe, Helmholtz and Kandinsky use
`central_europe`); Stroustrup and Li `north_america` by career base; Attenborough
and Kroc portraits replaced/found by the retry (above).

## Lead Major Achievement gate

Before lead correction: primary-contribution failures 0, top-omission failures
0 new (the 5 on shipped candidates were already caught by agents), identity
failures 0, lead-only novelty issues 0, lead-only side-project issues 0. Final
Major Achievement PASS **13/13 shipped**. Editorial source additions: 0.

## Publication and eligibility

All 13 `published`, directory-visible, `evidence_approved`, frozen before
eligibility was computed. **Roster54 eligible: 0 of 13.** Per candidate
(coverage / HC count / HC average): Stroustrup 0.180/5/0.550, Attenborough
0.231/4/0.505, Li 0.155/3/0.533, Nietzsche 0.241/7/0.574, Lucas 0.272/9/0.560,
Matsushita 0.228/4/0.500, Madonna 0.207/5/0.524, Ravel 0.181/5/0.556, Mondrian
0.207/5/0.570, Prince 0.269/9/0.557, Kroc 0.149/4/0.550, Ballard
0.244/8/0.556, Tendulkar 0.279/6/0.550. Min/median/max: rows 5/8/9; coverage
0.149/0.228/0.279; HC count 3/5/9; HC average 0.500/0.550/0.574. All fail the
18-row / 12-HC floors.

## Counts

| | Before | After |
|---|---|---|
| Production | 518 | **531** |
| Directory-visible | 517 | **530** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 592 | **607** |

**A. Published/directory field-category coverage**: science_knowledge 212 ->
214 (+2); arts_culture 191 -> 198 (+7); leadership_society 80 -> 81 (+1);
building_discovery 164 -> 171 (+7) (multi-category people count once per
category). **B. Match-eligible pools**: science_knowledge 50, arts_culture 43,
leadership_society 42, building_discovery 15: unchanged.

## Recent cohort watch (recorded, not re-analyzed)

Roster54 shipped 13, eligible 0. Cumulative Roster33-54: **306** shipped, **0**
match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS.

## Calibration and matching health

`calibrate.ts quiz` x2: identical (`meanSd` 11.704); eligible set unchanged
(114), so focused confirmation only. `dispersion.generated.ts` showed a
line-ending-only touch and was restored. Full `matching.test.ts` passes with the
13 added to the known-non-eligible lists. No architecture diagnostic.

## Validation

- `tsc --noEmit` clean; `validateCandidates` 0 errors, 0 warnings.
- `roster54.test.ts` 160 tests; full Vitest 84 files, **4,333 tests** pass. No
  new vocabulary gap (every shipped profile uses existing labelled ids).
- Production build success, literal line
  `✓ Generating static pages using 21 workers (1086/1086) in 12.8s`
  (`2 x 531 + 24 = 1086`).
- Focused Playwright (Person, Editorial, Directory, Compare): 128 passed.
- No performance benchmark was run.

## Manual QA (production build, localhost)

- All 13 EN and 13 KO profiles 200; all 13 portrait URLs 200; Compare 200
  (Prince, Kroc, Attenborough); both held candidates and earlier holds 404. No
  raw `src_` ids, taxonomy keys or stray snake_case in rendered text.
- True 375px sweep (hidden iframes, both locales, all 13): no overflow, 0 broken
  images.
- Rendered Achievement spot-read (6): Mondrian, Ravel (arts); Nietzsche, Li
  (science/technology); Ballard, Tendulkar (exploration/sport): the first card
  of each states the defining contribution: PASS 6/6. No new profile is
  match-eligible.
- Bounded source-link sweep (111 URLs): 100 x 200; 11 x 403 (bot wall:
  Britannica x6, UPI, Gallica, ASC x2, MTSU); 0 x 404; 0 x 429; 0 timeouts; 0
  TLS/checker failures.

## Narrow defects

None required a fix beyond portrait replacement during the cycle (Attenborough).

## Deferred and not done

The 500-person checkpoint's optional items remain deferred (legacy portrait
recompression, scoring-lock batching, eligible-only quiz index, Directory
virtualization, generated manifest, shared count refactor, wiring-script
check-in). No benchmark, no scale checkpoint, no eligibility rescue, no matching
diagnostic. Legacy remains paused (22 / 0); Legacy Batch 6 not started; Roster55
not started.

## Post-commit scoring lock

Run after implementation commit `19e910f` (literal output):

```
Checked 607 previously-committed candidate file(s) against HEAD. 0 flagged.
This is a warning tool, not a hard gate -- review flags by hand, per the A/B/C/D policy.

Legacy scoring lock: 22 pre-pipeline production people covered, 0 flagged.
```

Committed candidate JSON count 607 = on-disk candidate JSON count 607 = checked count 607. Legacy baseline 22 / 0 flagged.
