# Roster56: second 30-candidate roster (2026-10-25)

`ROSTER56_BASE_SHA`: `25b39c88704ab2071ab8adae570fd06c371ce240`, the merge of PR
#68 (Roster55). Verified guards before merging: PR #68 open, mergeable, not draft,
base `216ceb37...` and head `b1e213dc...` exactly as reviewed, two commits,
Vercel SUCCESS on that head, no review thread, no new blocking comment (only the
Vercel bot comment). Merged with a normal merge commit, guarded on the head;
parents `216ceb37...` and `b1e213dc...`, merged 2026-10-24T22:52:04-06:00. The
500-person scale checkpoint remains **EXPANSION_GREEN** (lane 500 -> 750, next
scale checkpoint about 750 production people). No benchmark was run.

Starting state (mechanically confirmed): production 553, directory-visible 552,
match-eligible 114, candidate JSON 637, legacy baseline 22 / 0 flagged.

**Roster55 deployed-site verification (after the PR #68 merge and production
deploy):** 22/22 EN profile routes 200, 22/22 KO profile routes 200, 22/22
portrait URLs 200; the 8 Roster55 holds (Dante, Klee, Bartok, Camus, Kahneman,
Adam Smith, Skinner, Popper) return 404; the Directory showed "552 people"
(production 553 / visible 552 / eligible 114 from the repository).

## Frozen 30: 25 shipped, 5 held, 0 backlog reuse

Backlog: one mechanical inventory, 106 non-production candidate files (83
`held`, 23 `evidence_approved` with held portraits, plus Edmund Hillary
found-but-unshipped for the old region reason). No concrete new signal for any;
none reopened. Selection deliberately spread across regions and periods to avoid
a North American, contemporary skew.

**Portrait-viability preflight (new this cycle):** before deep research, a light
check of Wikidata portrait leads and their Commons licences was run for 16 of
the 30 (the rest delegated to each agent as the first research step and recorded
as "PORTRAIT PREFLIGHT" in the candidate notes). Plausible leads existed for
Chawla (NASA), Chang, Piccard (CC0), Kojima, Botero, Gibran, Sakamoto, Adichie,
Pushkin and others; Villa-Lobos' lead was small with an unknown author and
Korolev's was not found. No one was dropped at preflight, as instructed. Of the
5 later holds, preflight had flagged two (Villa-Lobos, Korolev).

| Slug | Portfolio | Region | Rows | Cited sources | Outcome |
|---|---|---|---|---|---|
| n-r-narayana-murthy | building (business) | south_asia | 5 | 7 | shipped |
| haile-gebrselassie | building (sport) | sub_saharan_africa | 5 | 7 | shipped |
| kalpana-chawla | building (exploration) | north_america | 3 | 7 | shipped |
| guido-van-rossum | building (computing) | north_america | 6 | 9 | shipped |
| morris-chang | building (business/technology) | east_asia | 6 | 7 | shipped |
| bertrand-piccard | building (exploration) | western_europe | 8 | 7 | shipped |
| hideo-kojima | building (technology/games) | east_asia | 7 | 9 | shipped |
| sergei-korolev | building (engineering/exploration) | central_europe | 6 | 5 | **held** |
| fernando-botero | arts | latin_america | 7 | 8 | shipped |
| kahlil-gibran | arts | west_asia | 5 | 7 | shipped |
| ryuichi-sakamoto | arts | east_asia | 7 | 9 | shipped |
| chimamanda-ngozi-adichie | arts | sub_saharan_africa | 4 | 9 | shipped |
| edvard-grieg | arts | western_europe | 4 | 6 | shipped |
| alexander-pushkin | arts | central_europe | 5 | 7 | shipped |
| heitor-villa-lobos | arts | latin_america | 7 | 7 | **held** |
| amrita-sher-gil | arts | south_asia | 5 | 5 | **held** |
| jagadish-chandra-bose | science | south_asia | 7 | 6 | shipped |
| mario-molina | science | north_america | 6 | 6 | shipped |
| oswaldo-cruz | science | latin_america | 6 | 6 | shipped |
| yuan-longping | science | east_asia | 6 | 8 | shipped |
| hideki-yukawa | science | east_asia | 7 | 6 | shipped |
| svante-arrhenius | science | western_europe | 8 | 6 | shipped |
| mary-leakey | science | western_europe | 6 | 7 | **held** |
| mother-teresa | leadership/society | south_asia | 7 | 7 | shipped |
| friedrich-frobel | leadership/society | western_europe | 7 | 7 | shipped |
| clara-barton | leadership/society | north_america | 8 | 7 | shipped |
| william-booth | leadership/society | western_europe | 8 | 7 | shipped |
| oliver-wendell-holmes-jr | leadership/society | north_america | 7 | 10 | shipped |
| billy-graham | leadership/society | north_america | 6 | 7 | shipped |
| paulo-freire | leadership/society | latin_america | 7 | 7 | **held** |

Frozen portfolio 8 building / 8 arts / 7 science / 7 leadership-society; shipped
7 / 6 / 6 / 6. Regions of the shipped 25: south_asia 4, east_asia 4,
north_america 7, western_europe 5, central_europe 1, latin_america 2,
sub_saharan_africa 2, west_asia 1 (versus a roster that would otherwise skew
North American). Every candidate records >=2 independent perspectives, >=1
substantive non-self behavioural source and a labelled CANONICAL SIGNIFICANCE
SOURCE in `provenance.notes`. No one was selected for a political identity;
political roles (Freire's party and secretaryship,
Pushkin's exile, Sakamoto's anti-nuclear activism, Molina's and Arrhenius'
policy or committee roles, Graham's presidential contacts, Korolev's
imprisonment) are unscored context. Research ran four agents at a time in 10
groups of three; two groups were cut off by a usage limit and resumed from saved
work, and no candidate was redone or replaced.

## Held candidates

All five are `evidence_approved` with `portrait.status: held`, outside the
generator allowlist and absent from production. All research is reusable. No
replacement was added.

| Slug | Exact portrait blocker | Next step |
|---|---|---|
| sergei-korolev | Wikidata image is a family photo of unknown author sourced from a Moscow city news page; mos.ru and Moscow Archive CC BY 4.0 images carry no documented copyright title in the original Soviet photographer; 1927/1934 "unknown photographer" files are blog-sourced with age-only PD tags; the San Diego Air and Space Museum "no restrictions" image was not relied on | a Russian or Soviet archive page stating terms and the photographer, or a NASA/ESA-published 1960s photo with a documented public-domain basis |
| heitor-villa-lobos | c.1922 file (219x413) has an unknown author and a thin Brazilian PD tag; Arquivo Nacional 1936 photo has an unknown photographer and its PD status rests on a "non-artistic photograph" judgement; the Israeli GPO photo is PD in Israel only | a written terms statement from the Arquivo Nacional or Biblioteca Nacional for a named image, a named photographer who died before 1955, or a CC-licensed portrait |
| amrita-sher-gil | Wikidata photo's author is only "probably Umrao Singh" with PD tags resting on a theory; her self-portraits are PD by term in the EU/India (d.1941) but the US basis ("unpublished" tags) is undocumented | a rights check of one self-portrait via NGMA or the Sundaram publisher |
| mary-leakey | Commons crops of a 1977 NLM print rest on NLM "believes this item to be in the public domain" with no photographer; the Smithsonian Archives/National Geographic photo says only "No known copyright restrictions", names no creator and shows two people | confirm NIH staff authorship of the 1977 photo or find a named-creator image with a stated licence |
| paulo-freire | 'Paulo Freire 1977.jpg' names a photographer but was uploaded as "own work" by another user; the Arquivo Nacional 1963 photo has an unknown photographer and a PD template contradicting its date; the 2024 UFSC image is a montage; no Nationaal Archief photo found | an Instituto Paulo Freire or other institution stating its own terms |

## Portrait decisions and caveats (25 shipped)

All 25 files exist, open, match recorded dimensions; none upscaled. Kinds: 23
`likeness`, 2 `historical_depiction` (Pushkin: Kiprensky 1827, no source read
states he sat for it; Frobel: 1861 lithograph). Notable bases:
- **Yukawa**: Asahi Graph 1955, no named photographer; basis is Japan's rule for
  photographs published before 1956 (protection long expired by 1996, so the US
  restoration rule does not apply; same template as Roster54's Matsushita).
- **Bose**: Georges Chevalier autochrome (Musee Albert-Kahn); Chevalier died 1967
  so it is not PD by age: the museum's own record states CC BY 4.0 (recorded) while
  Commons tags CC BY-SA 4.0. **Arrhenius**: Auguste Leon autochrome 1922, the
  museum states "freely reusable (CC-00), public domain".
- **Gibran**: F. Holland Day 1896 (d.1933; PD by age), via Commons CC0; the Met's
  own record states no rights position. **Grieg**: Elliott & Fry 1888, published
  1889 (Commons source is an auction listing; the 1889 publication dates it).
- **Chang**: Taiwan Presidential Office Flickr photo, photo-level CC BY 2.0; no
  Office-level open-data notice found. **Gebrselassie**: FCO Flickr photo, photo-level
  CC BY 2.0 while Commons tags OGL on the stream's basis (both permissive).
- **Sakamoto**: Joi Ito 2008, CC BY 2.0; the Flickr page returned 403 so the
  licence rests on the Commons record. **Piccard**: official COP21 Flickr account,
  CC0, 368x495 (the Commons date says 2013, Flickr/EXIF say 2015).
- **Yuan**: China News Service frame under CC BY on the agency's own YouTube
  channel (platform-level licence on one video; same kind of basis as Botero).
  **Botero**: Culturespaces frame, CC BY 3.0, YouTube source.
- **Cruz**: Casa de Oswaldo Cruz (Fiocruz) archive photo under the Commons
  partnership public-domain template, unknown author c.1910-1919.
- **Booth / Holmes**: LoC Bain negatives (rights pages read through archive copies;
  loc.gov blocks bots). **Graham**: Warren Leffler 1966, LoC U.S. News & World
  Report collection (deed of gift dedicates the magazine's rights to the public),
  stated via the Commons template. **Barton**: Brady c.1865, NPG, CC0 release quoted
  on Commons. **Mother Teresa**: Anefo/Nationaal Archief 1988 CC0, cropped.
- **Chawla**: NASA official portrait. **Murthy**: St. Gallen archive 2001, CC BY-SA
  4.0 with a permission ticket. **van Rossum**: Kushal Das 2024 CC BY-SA 4.0.
  **Kojima**: Okki 2010 CC BY-SA 3.0. **Adichie**: Salibian 2025 CC BY-SA 2.0
  (Flickr verified live). **Molina**: Janwikifoto 2011 CC BY-SA 3.0.

## Agent Achievement self-gate (first pass, 30 candidates)

Primary FAIL 0, identity FAIL 0, significance-over-novelty FAIL 0, side-project
FAIL 0. Top-omission FAIL: 9 on the shipped 25 (van Rossum, Piccard, Kojima,
Adichie, Grieg, Pushkin, Bose, Arrhenius, Barton) and 1 on the held (Villa-Lobos).
All corrected before return, e.g. Piccard's card now credits Borschberg for the
joint Solar Impulse work; Kojima gained the Metal Gear Solid breakthrough and
"helped establish" replaced "first stealth"; Arrhenius gained the activation-energy
equation; Barton gained the American amendment on peacetime relief; Pushkin gained
the shaping of the modern literary language; Bose gained the Bose Institute.

## Selective high-risk row calibration

About 2-3 rows reviewed per candidate. Agents lowered **29 rows on the 25
shipped candidates** (Murthy 1, Gebrselassie 1, Chawla 1, van Rossum 1, Chang 1,
Kojima 2, Botero 1, Gibran 1, Sakamoto 2, Adichie 2, Grieg 2, Cruz 3, Yuan 3,
Yukawa 1, Arrhenius 1, Mother Teresa 2, Barton 1, Booth 1, Holmes 1, Graham 1)
and 6 on the held (Korolev 1, Villa-Lobos 1, Sher-Gil 1, Leakey 3). Reasons: one
admiring or retrospective witness, self-report, single-biographer concentration,
award-body or institutional praise, shared credit, or an indirect measure. Zero
lowerings occurred for Piccard, Pushkin, Bose, Molina, Frobel and Freire. No
blanket lowering.

## Lead review

Additional lead downward corrections: **11 rows**, all before eligibility, all
with a `RUBRIC_CORRECTION` note: Pushkin creative_originality 82/0.68 -> 78/0.60;
Yukawa creative_originality 80/0.68 -> 76/0.62; Arrhenius cross_domain_range
80/0.68 -> 76/0.60 and creative_originality 78/0.66 -> 74/0.58; Bose
cross_domain_range 80/0.68 -> 76/0.60 and experimentation 78/0.66 -> 74/0.58;
Mother Teresa proactive_agency 78/0.66 -> 74/0.58; Piccard persistence 78/0.66 ->
74/0.60; Booth leadership_drive 82/0.68 -> 78/0.60 and persistence 80/0.66 ->
76/0.58; Holmes independent_thinking 80/0.66 -> 78/0.62. Reasons: award-body or
encyclopedia concentration, no biography-level behavioural source opened, two
sources by the same biographer, or self-account in the base. Region and
taxonomy judgement calls recorded: Chawla `north_america` by career base (nationality US+IN);
Molina `north_america` (MX+US); van Rossum `north_america` (NL); Mary Leakey (held)
`western_europe` by nationality; Gibran `west_asia` (LB+US; `north_america`
defensible); Mother Teresa `south_asia` by career base; Frobel `western_europe`
(17 of 20 German nationals); Pushkin `central_europe` (Russian mapping).

## Lead Major Achievement gate

Before lead correction: primary-contribution failures **1 (lead-only)**, top-omission
failures 0 new (the 9 on shipped candidates were already caught by agents), identity
failures 0, lead-only novelty issues 0, lead-only side-project issues 0. The one
lead-only finding: **Clara Barton's** first two cards were Civil War relief and the
missing-soldiers office while the founding of the American Red Cross sat in card 3, so
the defining contribution was not in the first two; the cards were reordered (no text
change) so the American Red Cross founding and its peacetime-relief amendment is
card 1. I read the first two cards of all 25 shipped drafts (all three for Barton, Booth, Holmes and Graham) and rendered Achievement
sections for 7 (below). Final Major Achievement PASS **25/25 shipped** (after the Barton reorder). Editorial source
additions: 0.

## Publication and eligibility

All 25 `published`, directory-visible, `evidence_approved`, frozen before
eligibility was computed. **Roster56 eligible: 0 of 25.** Per candidate (rows /
coverage / HC count / HC average): Pushkin 5/0.145/4/0.570, Piccard
8/0.238/7/0.560, Graham 6/0.177/6/0.590, Adichie 4/0.130/3/0.523, Barton
8/0.245/7/0.559, Grieg 4/0.115/3/0.540, Botero 7/0.223/4/0.547, Frobel
7/0.220/5/0.532, van Rossum 6/0.175/3/0.500, Gebrselassie 5/0.156/4/0.583, Yukawa
7/0.220/7/0.570, Kojima 7/0.210/4/0.555, Bose 7/0.215/7/0.593, Gibran
5/0.153/3/0.553, Chawla 3/0.091/0/0.000, Molina 6/0.184/6/0.598, Chang
6/0.180/5/0.520, Mother Teresa 7/0.213/7/0.549, Murthy 5/0.150/4/0.518, Holmes
7/0.215/7/0.566, Cruz 6/0.181/3/0.533, Sakamoto 7/0.204/6/0.570, Arrhenius
8/0.241/8/0.557, Booth 8/0.236/8/0.590, Yuan 6/0.190/4/0.535. Min/median/max: rows
3/6/8; coverage 0.091/0.190/0.245; HC count 0/5/8; HC average 0.000/0.555/0.598. All
fail the 18-row / 12-HC floors. No rescue was attempted.

## Counts

| | Before | After |
|---|---|---|
| Production | 553 | **578** |
| Directory-visible | 552 | **577** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 637 | **667** (25 shipped + 5 held) |

**A. Published/directory field-category coverage**: science_knowledge 223 -> 232
(+9); arts_culture 204 -> 211 (+7); leadership_society 87 -> 93 (+6);
building_discovery 181 -> 188 (+7) (multi-category people count once per category).
**B. Match-eligible pools**: science_knowledge 50, arts_culture 43,
leadership_society 42, building_discovery 15: unchanged.

## Recent cohort watch (recorded, not re-analyzed)

Roster56 shipped 25, eligible 0. Cumulative Roster33-56: **353** shipped, **0**
match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS.

## Calibration and matching health

`calibrate.ts quiz` x2: identical (`meanSd` 11.704); eligible set unchanged (114), so
focused confirmation only. `dispersion.generated.ts` showed a line-ending-only touch
and was restored. Full `matching.test.ts` passes with the 25 added to the
known-non-eligible lists. No architecture diagnostic.

## Validation

- `tsc --noEmit` clean; `validateCandidates` 0 errors, 0 warnings.
- `roster56.test.ts` and the full Vitest suite: 86 files, **4,885 tests** pass. No
  vocabulary gap surfaced (all shipped profiles use labelled occupation/field ids).
- Production build success, literal line
  `✓ Generating static pages using 21 workers (1180/1180) in 8.7s`
  (`2 x 578 + 24 = 1180`).
- Focused Playwright (Person, Editorial, Directory, Compare): **128 passed** on the
  first run; no failure or rerun this cycle.
- No performance benchmark was run.

## Manual QA (production build, localhost)

- All 25 EN and 25 KO profiles 200; all 25 portrait URLs 200; Compare 200 (Mother
  Teresa, Yukawa, Graham); all 5 Roster56 holds plus Dante and Adam Smith return 404.
  No raw `src_` ids, taxonomy keys or stray snake_case in rendered text.
- True 375px sweep (hidden iframes, both locales, all 25 = 50 pages): no horizontal
  overflow, 0 broken images. (A first attempt in a single call timed out on the
  hidden browser pane and was redone as a background loop that completed 50 of 50.)
- Rendered Achievement spot-read (7, final build): arts Sakamoto and Pushkin;
  science/technology Yukawa, Molina and Cruz; sport/exploration Gebrselassie;
  leadership Graham; the first card of each states the defining contribution: PASS
  7/7. No new profile is match-eligible.
- Bounded source-link sweep (207 URLs): 198 x 200; 8 x 403 (bot wall: Britannica x4,
  Nation Africa, si.edu, Oscars.org, npg.si.edu); 0 x 404; 0 x 429; 1 timeout
  (eetimes.com); 0 TLS/checker failures.

## Narrow defects

None found in this cycle's QA; the internal-id-in-portrait-text defect from Roster55
was prevented by an instruction in this cycle's research brief.

## Deferred and not done

The 500-person checkpoint's optional items remain deferred (legacy portrait
recompression, scoring-lock batching, eligible-only quiz index, Directory
virtualization, generated manifest, shared count refactor, wiring-script check-in).
No benchmark, no scale checkpoint, no eligibility rescue, no matching diagnostic.
Legacy remains paused (22 / 0); Legacy Batch 6 not started; Roster57 not started.

## Post-commit scoring lock

Recorded in the docs-only follow-up commit.
