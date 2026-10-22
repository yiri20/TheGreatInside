# Roster52: milestone-crossing roster (2026-10-22)

Purpose: the roster that takes production from 491 to **503**, crossing the
500-person milestone. Eleventh cycle under the Major Achievement Selection
Standard, with the Roster49 workflow (canonical significance source, agent
Achievement self-gate) and the Roster51 cost cap. The Roster51 blanket
self-calibration was replaced by a **selective** pass (top 2-3 highest-risk
rows per candidate; zero reductions valid).

`ROSTER52_BASE_SHA`: `9178d9ab1b4c98994d2b554184f02b8bd1675294` (PR #63,
Roster51 merge). Branch `feat/roster52`, no unexpected commits before this one.
Starting state: production 491, directory-visible 490, match-eligible 114,
candidate JSON 565, legacy baseline 22 / 0 flagged. Classification carried
forward: **CONTINUE_EXPANSION_AS_IS**.

## Frozen 12 (all fresh, all shipped, 0 held, 0 backlog reuse)

| Slug | QID | Portfolio | Tier | Region | Rows |
|---|---|---|---|---|---|
| michael-collins-astronaut | Q104859 | building_discovery | field-famous | north_america | 6 |
| mae-jemison | Q34091 | building_discovery | international | north_america | 4 |
| sundar-pichai | Q3503829 | building_discovery | international | north_america | 4 |
| shigeru-miyamoto | Q12382 | building_discovery | international | east_asia | 4 |
| bjorn-borg | Q104506 | building_discovery | international | western_europe | 5 |
| billie-holiday | Q104358 | arts_culture | international | north_america | 4 |
| walt-whitman | Q81438 | arts_culture | international | north_america | 7 |
| quentin-tarantino | Q3772 | arts_culture | international | north_america | 5 |
| wassily-kandinsky | Q61064 | arts_culture | field-famous | central_europe | 7 |
| george-washington-carver | Q296898 | science_knowledge | international | north_america | 7 |
| roger-penrose | Q193803 | science_knowledge | field-famous | western_europe | 5 |
| joseph-bazalgette | Q981915 | science_knowledge | long-tail | western_europe | 4 |

Portfolio 5 / 4 / 3. Recognizability: 8 international, 3 field-famous, 1
long-tail. The cohort was frozen in an earlier session and never reselected.
**Completed-four reuse**: Collins, Jemison, Tarantino and Penrose were
researched, reviewed and validated in the earlier session and were reused from
disk without re-research (Penrose creative_originality had been lead-lowered
80/0.62 -> 78/0.58 before eligibility; preserved). The other eight were
researched this session by two agents at a time (never more than 2 active).

## Held / blockers

None. Every frozen candidate shipped. Earlier holds (Hooke, Schrodinger,
Lamborghini, Caravaggio, Royce, Sullivan, Potter, Godel, Mirzakhani, ...)
are unchanged and remain absent from production.

## Sources, perspectives, rows

Cited non-Wikidata sources per shipped candidate (the candidate JSON
`sources`, including the portrait page where it was recorded as a source):
Collins 9, Jemison 9, Pichai 8, Miyamoto 8, Borg 8, Holiday 7, Whitman 11,
Tarantino 13, Kandinsky 9, Carver 9, Penrose 9, Bazalgette 9. Every candidate
records >=2 independent perspectives and >=1 substantive non-self behavioural
source in `provenance.notes`, with a labelled CANONICAL SIGNIFICANCE SOURCE.
Row counts: min 4 / median 5 / max 7 (see the table). Several sources were
read through Internet Archive copies, Commons wikitext or fetch summaries
because whitmanarchive.org, loc.gov and some museum pages block automated
clients; this is stated in each candidate's notes.

## Publication

All 12 `published`, directory-visible, `evidence_approved`. Publication
decisions, rows, scores, confidence, evidenceType, metadata, classification,
portraits and editorial were frozen before eligibility was computed.

## Eligibility

None eligible (honest sparse profiles; no rescue). Roster52 shipped 12,
eligible 0. Per-candidate eligibility_v2 values (coverage / HC count / HC
average): Holiday 0.120/3/0.580, Borg 0.162/3/0.533, Carver 0.206/7/0.574,
Bazalgette 0.117/3/0.553, Jemison 0.115/3/0.553, Collins 0.180/5/0.544,
Tarantino 0.143/5/0.516, Penrose 0.156/5/0.548, Miyamoto 0.114/3/0.513,
Pichai 0.114/0/0.000, Whitman 0.210/7/0.593, Kandinsky 0.209/4/0.583. All fail
the 18-row / 12-HC floors. Min/median/max: rows 4/5/7; coverage
0.114/0.150/0.210; HC count 0/3.5/7; HC average 0.000/0.551/0.593.

## Portraits

All 12 files exist, open, and match recorded dimensions; none upscaled; all
`likeness` (photographs from life). Rights bases: Collins and Jemison NASA
public domain; Pichai European Commission CC BY 4.0; Miyamoto MEXT CC BY 4.0;
Borg Bemelmans CC BY-SA 4.0; Holiday Gottlieb 1947 (Library of Congress
Rights and Access page: public domain since 2010; privacy/publicity rights
may apply); Whitman Cox 1887 (pre-1931 US publication, photographer d. 1903);
Tarantino Skidmore CC BY-SA; Kandinsky Erfurth 1923 (photographer d. 1948;
pre-1931; scan sourced from a web article, not an archive; residual risk
recorded); Carver Johnston 1906 (LOC "no known restrictions", read through
Commons because loc.gov returns 403); Penrose Ganguly CC BY 3.0; Bazalgette
Ernest Edwards albumen print from the Rijksmuseum (Public Domain Mark, agrees
with Commons CC0).

Explicit reconciliations:
- **Kandinsky**: portrait source re-opened from scratch (the earlier lookup
  had been rate-limited). Creator, date, exact image, SHA-1, licence basis and
  the Centre Pompidou print record were checked; the Pompidou file was not
  used; a Pinterest-sourced 1922 file was rejected.
- **Bazalgette**: the NPG Lock & Whitfield image was NOT used. NPG pages were
  Cloudflare-blocked, so the NPG rights statement could not be reconciled with
  the Commons PD tag; per instruction the permissive tag was not chosen by
  default. The Rijksmuseum print, whose own page states Public Domain Mark, was
  used instead. If NPG's own notice is later read, it does not change this
  image.
- **Miyamoto**: the Commons EXIF/description date (10 June 2015) conflicts with
  the credited 2019 ministry honours-list page; both dates are recorded (lead
  review) and the file was renamed `shigeru-miyamoto-mext-2015.jpg`. The CC BY
  4.0 basis does not depend on the date; the live ministry page is 404 and was
  read through an Internet Archive copy.
- Pichai region: set `north_america` by the Satya Nadella precedent
  (nationalities US + IN; born in Madras). Kept by lead review, noted.

## Agent Achievement self-gate

First-pass across 12: primary 12/12 PASS, identity 12/12 PASS, novelty 12/12
PASS, side-project 12/12 PASS; top-omission 11/12 PASS, 1 minor FAIL (Borg: the
first draft omitted the 1975 Davis Cup and his topspin influence; corrected in
card 3). Agent corrections included: Whitman card 3 re-based from hospital
volunteering to Drum-Taps; Holiday card 3 re-based from "Strange Fruit" to
recording/registry facts; Carver card 3 added the peanut-myth correction;
Pichai Chrome wording hedged to the sources; Kandinsky card 1 hedged ("one of
the first"); Bazalgette cards omit conflicting acreage/count figures; Miyamoto
dropped two unsupported Gale claims; Borg dropped an inferred burnout reason.

## Special high-risk rows (selective pass)

Reviewed ~2-3 rows per candidate. Agents self-lowered rows (marker count in the
rationales): Collins 2, Jemison 1, Tarantino 3, Penrose 2 (earlier session) and
Whitman 1 (persuasiveness 70/0.60 -> 62/0.55), Holiday 2 (creative_originality
82/0.68 -> 76/0.62; independent_thinking 68/0.52 -> 62/0.48), Carver 1
(persuasiveness 72/0.60 -> 68/0.56), Pichai 1 (belief_updating 56/0.50 ->
54/0.46, strong_inference -> inference), Miyamoto 2 (experimentation 70/0.56 ->
66/0.52; social_assertiveness 62/0.46 -> 58/0.42), Borg 2 (discipline 68/0.55 ->
64/0.50; deep_focus 66/0.50 -> 62/0.46), Kandinsky 1 (systems_abstraction 74 ->
72), Bazalgette 1 (detail_orientation 64 -> 58). Reasons: single-source or
retold-single-episode support, retrospective admiration without adversarial
corroboration, self-authored support, or outward composure standing in for the
trait. Strong corroborated rows (e.g. Borg persistence, Holiday collaboration,
Whitman creative_originality) were left unchanged. No blanket lowering.

## Lead review

Lead scoring corrections beyond the agents: **none new this session** (Penrose
80/0.62 -> 78/0.58 was applied earlier, before eligibility). Rows, evidenceTypes
and confidences were checked for source independence, admiring-source
concentration and behavioural specificity; Holiday creative_originality
(documented, four unrelated retrospective writers) was examined and kept.
Metadata corrections: Miyamoto portrait date/filename (above); Bazalgette
Korean name 바잘제트 -> 배절제트 (matches Korean Wikipedia usage).

## Lead Major Achievement gate

Before lead correction: primary-contribution failures 0, top-omission failures
0 new (Borg's was already caught by the agent self-gate), identity failures 0,
novelty issues 0, side-project issues 1 (lead-only): **Jemison card 3** led
with a DARPA/100 Year Starship seed-contract sentence (a side-project fact);
trimmed to the Jemison Group and The Earth We Share. Final Major Achievement
PASS 12/12 (all three core gates). Editorial source additions: 0.

## Editorial / Korean

All 12 have concise EN and KO editorial (3 Achievements, 1-2 Moments, 1 Turning
Point), Korean display names, no raw `src_` ids, no unsupported first/only
claims. Korean-name note: Pichai uses 순다르 피차이 (Wikidata ko label is
선다 피차이; the press form was kept).

## Counts

| | Before | After |
|---|---|---|
| Production | 491 | **503** |
| Directory-visible | 490 | **502** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 565 | **577** |

### A. Published/directory field-category coverage

| Category | Before (491) | After (503) | Delta |
|---|---|---|---|
| science_knowledge | 204 | 208 | +4 |
| arts_culture | 179 | 184 | +5 |
| leadership_society | 77 | 79 | +2 |
| building_discovery | 153 | 158 | +5 |

(Multi-category people count once per category; derived by `fieldIds` against
the directory taxonomy.)

### B. Match-eligible interest pools (114 eligible people)

science_knowledge 50 / arts_culture 43 / leadership_society 42 /
building_discovery 15: unchanged (+0 each).

## Recent cohort watch (recorded, not re-analyzed)

Roster52 shipped 12, eligible 0. Cumulative Roster33-52: **278** shipped, **0**
match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS.

## Calibration and matching health

`calibrate.ts quiz` x2; eligible set unchanged (114), so no refresh,
simulation or sensitivity. `dispersion.generated.ts` showed `M` but with no
content diff (line-ending stat noise); restored. Matching health: focused
confirmation only (full `matching.test.ts` passes with the 12 added to the
known-non-eligible lists). No architecture diagnostic.

## Narrow defects fixed during validation

Full Vitest caught two real, narrow gaps from the new vocabulary, both fixed:
- `occupation.agronomist` lacked EN/KO labels (Carver is the first profile with
  it as `occupationIds[0]`): added EN "agronomist", KO 농학자.
- `jazz` (Holiday + Armstrong) and `agriculture` (Carver + Borlaug) now occur
  for >=2 people but were not in the directory profession taxonomy: added `jazz`
  to arts_culture and `agriculture` to science_knowledge, with EN/KO field
  labels (Jazz/재즈, Agriculture/농업). No person's category membership changed
  by this (both groups already counted via `music` / `natural_science`).

Mechanical count bumps 491 -> 503 / 490 -> 502 in the usual lineage, matching,
publication-separation, roster33-51 and e2e directory assertions; lineage regex
extended to `5[0-2]`.

## Validation

- `tsc --noEmit`: 0 errors.
- `validateCandidates`: 0 errors, 0 warnings (577 files).
- `roster52.test.ts`: 148 tests pass.
- Full Vitest: 82 files, 3993 tests, all pass (after the two narrow fixes).
- Production build: success. Literal build line:
  `✓ Generating static pages using 21 workers (1030/1030) in 32.4s`
- Focused Playwright (person, editorial, directory, compare): 128 passed.
- No scale benchmark run; the 500-person scale checkpoint was not started.

## Manual QA (production build, localhost)

- All 12 EN and 12 KO profile routes 200; all 12 portrait URLs 200 locally;
  Compare routes 200 (Whitman, Jemison, Bazalgette); the earlier holds 404.
- No raw `src_` ids or taxonomy keys in rendered text; the only snake_case-like
  token was `b_menu`, inside the legitimate MEXT source URL text (Miyamoto).
- True 375px sweep (hidden-iframe loop, both locales, all 12): no horizontal
  overflow (scrollWidth == clientWidth), 0 broken images.
- Rendered Achievement spot-read (6): Whitman, Kandinsky (arts); Penrose,
  Carver (science); Collins, Borg (building/sport/exploration). Each opens with
  the defining contribution: PASS 6/6. No newly eligible profile exists to
  spot-check; the non-eligible new profiles render with the standard
  sparse-profile treatment.
- Bounded source-link sweep (121 URLs): 103 x 200; 16 x 403 (bot-wall:
  Britannica x3, NMAAHC, Whitman Archive x7, Oscars.org x2, ASC, MoMA, History &
  Policy); 1 x 429 (Chicago Reader); 0 true 404; 0 timeouts; 1 TLS/checker
  failure (archive.tuskegee.edu). The 403s are not treated as dead links.
- Production-URL portrait 200s are confirmed after Vercel deploys.

## Post-commit scoring lock

Recorded in the docs-only follow-up commit.

## Legacy

Legacy remains paused (no legacy research, rescoring or tuple change; no Legacy
Batch 6). Expected baseline 22 / 0 flagged; confirmed by the post-commit lock.

## Final state

Final production **503**: the **500-person milestone was crossed**. Roster
expansion is paused. No scale benchmark yet; no architecture diagnostic.
Next task: **review and merge the Roster52 PR, then run the 500-person scale
checkpoint.**
