# Roster61 checkpoint (2026-10-31)

Seventh 30-candidate batch after the 500-person scale checkpoint (EXPANSION_GREEN), twenty-sixth
fresh new-candidate cycle after the recent-cohort diagnostic, and the first cycle that
moved portrait work **before** the freeze. Outcome: **30 frozen, 23 shipped, 7 held on
portrait**, production **644 -> 667**, directory-visible **643 -> 666**, match-eligible **114
(unchanged, 0 of 23 eligible)**. No portrait, rights, evidence, scoring or eligibility
standard was relaxed to reach these numbers.

- `ROSTER61_BASE_SHA` = `1d2ff4b29233d37ea1bbb64843a550818c512324`, the normal merge of
  PR #73 (Roster60) into `main` (parents `5c359ff37fce9cee6f57cd730d816e8ac1e27005` and
  `dfdff1aa835b7d2df8dd5185b1a430ce4471bd51`).
- Branch `feat/roster61`; PR against `main` (not merged, by instruction).

## PR #73 merge (Roster60)

Mechanical guards before the merge, all passing: PR open, not draft, `mergeable` /
`CLEAN`, base exactly `5c359ff3...`, head exactly `dfdff1aa...`, 0 behind base, Vercel
`SUCCESS` on the exact head, no review threads, no blocking comments, only the two reviewed
commits. Merged with a normal merge commit guarded on the expected head SHA (no squash, no
rebase).

## Roster60 production verification (deployment SHA = merge SHA)

- 7/7 shipped Roster60 people: EN route 200, KO route 200, portrait 200 (Keino, Lee Kun-hee,
  Hafez, Salif Keita, Tezuka, Bello, Abduh). Routes are `/en-US/people/<slug>` and
  `/ko-KR/people/<slug>`.
- All 23 Roster60 holds return 404 in both locales.
- Directory shows "643 people".
- Starting counts: production **644**, directory-visible **643**, match-eligible **114**,
  candidate JSON **787**.
- Canonical `categoryCounts.ts` (literal, starting basis):

```
current: {"production":644,"visible":643,"categoriesProduction":{"science_knowledge":252,"arts_culture":237,"leadership_society":110,"building_discovery":206},"categoriesVisible":{"science_knowledge":252,"arts_culture":237,"leadership_society":109,"building_discovery":205}}
```

These equal the expected production basis (252/237/110/206) and visible basis
(252/237/109/205).

## Selection policy change and the pool

Roster60 froze 3 strong / 9 plausible / 18 risky portrait preflights and shipped only 7 of
30. Roster61 did **not** relax portrait standards; it moved portrait work before the freeze
and deliberately selected for portrait viability.

- **Proposed pool: 111** candidates (target 80-120), exploratory and mutable until the
  freeze: building 27, arts 31, science 27, leadership 26. Built to span regions
  (sub-Saharan Africa, North Africa, West/Central/South/East Asia, Latin America, Europe,
  North America), periods (ancient to contemporary) and occupations.
- **Identity gate** (`identityGate.ts`, whole pool, vs all 644 production people, with a
  live Wikidata QID for every probe): **0 hard duplicates** (slug, normalized name, alias,
  token set, QID) and **0 review-tier matches**, so no dispositions were needed. The gate
  was sanity-tested against known duplicates (Marie Curie slug/name/QID, a Ratan Tata name
  probe, a Pierre Curie name probe) and flagged all of them, so a clean result is not an
  artifact. Dispositions file: none (empty).
- **Backlog exclusion**: the pool was compared with all 165 non-production candidate files
  (82 `evidence_approved`, 83 `held`) by slug, QID, canonical name and alias: **0 hits**, so
  no backlog candidate was reused or re-researched.
- **Portrait preflight of the whole pool** (Wikidata P18 and Commons metadata for all 111,
  Commons wikitext, plus source-level opening of the underlying page for every candidate
  graded strong): **strong 15, plausible 36, risky 60**. By group (strong / plausible /
  risky): building 6 / 12 / 9, arts 5 / 4 / 22, science 2 / 11 / 14, leadership 2 / 9 / 15.
  "Strong" was only used where the live source page was opened (Nationaal Archief CC0
  pages, Rijksmuseum public-domain mark, Flickr page matching Commons, LoC item records
  through the loc.gov JSON endpoint, Met Open Access API) or a named photographer's death
  date was established on Wikidata (Nadar, Carjat, Sarony, Ogawa, Ulke).

## ROSTER61_FROZEN_30

Declared after the identity gate, backlog exclusion, source-level preflight and
portfolio/region balancing; immutable afterwards (no substitution for portrait failure,
thin evidence or research difficulty). Portfolio 8 building / 8 arts / 7 science / 7
leadership-society.

**Frozen preflight composition: strong 13, plausible 12, risky 5.** Target (>=10 strong,
>=12 additional plausible, <=8 risky) **achieved**. Per-group strong+plausible: building 7,
arts 6, science 6, leadership 6 (goal >=4 each, achieved). Frozen regional mix: western
Europe 7, North America 5, East Asia 4, South Asia 3, sub-Saharan Africa 3, Latin America
3, central Europe/Russia 2, Southern Europe 1, West Asia 1, Central Asia 1 (17 of 30
outside Western Europe, North America and Southern Europe). Periods: ancient 1 (Plato),
medieval/early-modern 5, 19th century 14, 20th century and later 10.

Honesty note on the grades: they were the grades **at freeze**. Several were later shown
too generous or too pessimistic by the full rights review (conversion table below).

## Ship / hold result

**Shipped (23)** - building 7: Blankers-Koen, Fischer, Coubertin, Lesseps, Anand,
Przhevalsky, Toyoda. Arts 6: Soseki, Hugo, Bernhardt, Machado de Assis, Lagerlof, Su Shi.
Science 5: Joseph Henry, Gibbs, Lobachevsky, Ayrton, Ameghino. Leadership 5: Horace Mann,
Plato, Thoreau, Vivekananda, Aggrey.

**Held (7)**: research, candidate JSON and `evidence_approved` status kept, no portrait, not
in the generator allowlist, not in production.

| Hold | Preflight | Blocker | Next step |
|---|---|---|---|
| tegla-loroupe | plausible | Commons CC BY 3.0 BR (Agencia Brasil) contradicted by the live Agencia Brasil page: no Creative Commons licence stated, all-rights-reserved EBC footer, and the page credits a different photographer (Tomaz Silva) | EBC to confirm licence and photographer, or a documented photograph with a stated licence |
| ali-farka-toure | risky | only Commons file is an uploader's own-work claim (2005, three uploads, no event or photographer detail); no other open image | named photographer + explicit open licence, US-government photo of his 2003 Smithsonian Folklife Festival appearance, or written release |
| ulugh-beg | plausible | Freer F1946.26 (name on the canopy) public domain by age, but the live Smithsonian page says "Usage Conditions Apply", no download, Terms of Use limit to non-commercial use; conflicts with the Commons PD tag | written Freer permission or a CC0 / captioned old engraving |
| wang-yangming | plausible | Shanghai Museum Cai Shixin scroll: museum copyright statement bars commercial use without permission, no item-level open statement; the 1743 woodcut has no caption/page scan confirming the sitter | museum permission/open-access statement, or a scan with the printed caption |
| eugenio-maria-de-hostos | plausible | Oller portrait is a 247x335 retouched Commons copy from a page that could not be opened; the Smithsonian exhibition image carries "Usage Conditions Apply"; the 1880 group photograph has no author | UPR museum / Enciclopedia de Puerto Rico terms, or a pre-1931 photograph with a named photographer |
| amir-khusrau | strong | **lead decision.** The agent found an Art Institute of Chicago (open access) miniature, but it is an imagined court scene in which the poet "is one of several figures and is not singled out"; the Smithsonian folio lead I graded strong actually carries "Usage Conditions Apply" (my misreading of the page) | captioned single-figure depiction with an item-level open licence, or a holder's permission |
| taqi-al-din | plausible | **lead decision.** Whole-page 1580s Sehinsahname miniature of astronomers; Taqi al-Din is not individually marked (a print seller calls it the Galata observatory), library terms unreachable (age-only basis) | library item-level rights statement + a source identifying him in the miniature |

The lead hold rule applied to Khusrau and Taqi al-Din: a scene image with no positively
identified single figure is not presented as a portrait of the person. Su Shi (the Met
titles the scroll "Su Shi (Dongpo) in a Bamboo Hat and Clogs") and Plato (a Capitoline bust
identified as Plato) were accepted because the holder or the object itself names the sitter.

### Per-candidate table

Rows = rows scored before agent self-calibration (initial) -> final; sources = source
records in the candidate file.

| Slug | Group | Region | Preflight | Initial -> final rows | Sources | Agent-lowered | Outcome |
|---|---|---|---|---|---|---|---|
| fanny-blankers-koen | building | western_europe | strong | 6 -> 6 | 8 | 2 | shipped |
| bobby-fischer | building | north_america | strong | 6 -> 6 | 8 | 2 | shipped |
| pierre-de-coubertin | building | western_europe | strong | 6 -> 6 | 7 | 2 | shipped |
| ferdinand-de-lesseps | building | western_europe | strong | 6 -> 6 | 8 | 1 | shipped |
| viswanathan-anand | building | south_asia | strong | 5 -> 5 | 9 | 1 | shipped |
| tegla-loroupe | building | sub_saharan_africa | plausible | 4 -> 4 | 8 | 1 | **held** |
| nikolay-przhevalsky | building | central_europe | plausible | 6 -> 6 | 8 | 1 | shipped |
| sakichi-toyoda | building | east_asia | risky | 6 -> 6 | 8 | 2 | shipped |
| natsume-soseki | arts | east_asia | strong | 6 -> 6 | 9 | 1 | shipped |
| victor-hugo | arts | western_europe | strong | 8 -> 8 | 8 | 1 | shipped |
| amir-khusrau | arts | south_asia | strong | 4 -> 4 | 7 | 1 | **held** |
| sarah-bernhardt | arts | western_europe | strong | 7 -> 7 | 6 | 1 | shipped |
| machado-de-assis | arts | latin_america | plausible | 7 -> 7 | 8 | 2 | shipped |
| selma-lagerlof | arts | western_europe | plausible | 5 -> 5 | 9 | 1 | shipped |
| ali-farka-toure | arts | sub_saharan_africa | risky | 5 -> 5 | 8 | 2 | **held** |
| su-shi | arts | east_asia | risky | 4 -> 4 | 8 | 1 | shipped |
| joseph-henry | science | north_america | strong | 5 -> 5 | 7 | 1 | shipped |
| josiah-willard-gibbs | science | north_america | strong | 6 -> 6 | 7 | 1 | shipped |
| taqi-al-din | science | west_asia | plausible | 5 -> 5 | 8 | 1 | **held** |
| nikolai-lobachevsky | science | central_europe | plausible | 7 -> 7 | 6 | 1 | shipped |
| hertha-ayrton | science | western_europe | plausible | 6 -> 6 | 6 | 1 | shipped |
| ulugh-beg | science | central_asia | plausible | 5 -> 5 | 8 | 1 | **held** |
| florentino-ameghino | science | latin_america | risky | 7 -> 7 | 8 | 2 | shipped |
| horace-mann | leadership | north_america | strong | 5 -> 5 | 7 | 1 | shipped |
| plato | leadership | southern_europe | strong | 3 -> 3 | 7 | 1 | shipped |
| henry-david-thoreau | leadership | north_america | plausible | 6 -> 6 | 6 | 1 | shipped |
| swami-vivekananda | leadership | south_asia | plausible | 4 -> 4 | 6 | 1 | shipped |
| wang-yangming | leadership | east_asia | plausible | 5 -> 5 | 7 | 1 | **held** |
| eugenio-maria-de-hostos | leadership | latin_america | plausible | 5 -> 5 | 6 | 1 | **held** |
| kwegyir-aggrey | leadership | sub_saharan_africa | risky | 5 -> 5 | 5 | 1 | shipped |

(Lobachevsky and Przhevalsky are `central_europe`, following the repo's existing Russian
precedents: Kovalevskaya, Mendeleev, Pavlov.)

## Exact structured handback totals (from the 30 per-candidate handback files)

- Initial rows scored: **165** (shipped 132, held 33). Final rows: **165**. No row was added
  or removed after self-calibration.
- Agent self-calibration lowered **37** rows in total (shipped candidates 29, held
  candidates 8): Blankers-Koen 2, Fischer 2, Coubertin 2, Lesseps 1, Anand 1, Loroupe 1,
  Przhevalsky 1, Toyoda 2, Soseki 1, Hugo 1, Khusrau 1, Bernhardt 1, Machado 2, Lagerlof 1,
  Ali Farka Toure 2, Su Shi 1, Henry 1, Gibbs 1, Taqi 1, Lobachevsky 1, Ayrton 1, Ulugh
  Beg 1, Ameghino 2, Mann 1, Plato 1, Thoreau 1, Vivekananda 1, Wang Yangming 1, Hostos 1,
  Aggrey 1. Each lowering (old/new score and confidence, one-sentence reason) is stored in
  `handback61/<slug>.json` and in the candidate's `provenance.notes` as a `HANDBACK61:` line.
  Reviewed-and-kept rows are listed there too. Selection was targeted at 2-3 high-risk rows
  per candidate (about 30 of 165 rows were lowered at this pass, so not a blanket cap).
- Major Achievement gate, first pass, agent level: **1 failure of 150 checks** (30
  candidates x 5 checks): `tegla-loroupe` top omission (first draft had three athletic
  cards and no foundation/school card); corrected by the agent before lead review. Primary,
  identity, significance-over-novelty and side-project failures: 0.

## Lead review

Fully reviewed the 23 shipped candidates (highest scores/confidence, self-report,
institutional/award praise, thin evidence, first two cards, taxonomy, region, Korean names,
portrait basis and kind). All first Achievement cards state the defining contribution (also
verified on the rendered pages in both locales). **Eleven rows in six candidates were lowered
with `RUBRIC_CORRECTION` (downward only, before eligibility):**

| Candidate | Row | Old -> new (score / confidence) | Reason (summary) |
|---|---|---|---|
| nikolai-lobachevsky | creative_originality | 80 / 0.60 -> 74 / 0.52 | all support from reference works drawing on one historiography; retrospective praise |
| nikolai-lobachevsky | independent_thinking | 78 / 0.58 -> 72 / 0.52 | same non-independent sources; read from later vindication |
| nikolai-lobachevsky | persistence | 76 / 0.60 -> 70 / 0.54 | long advocacy documented only through encyclopedic summaries |
| josiah-willard-gibbs | analytical_rigor | 78 / 0.62 -> 74 / 0.56 | colleague memoirs; rigor partly inferred from the fame of results |
| josiah-willard-gibbs | systems_abstraction | 76 / 0.55 -> 72 / 0.50 | same admiring memoirs; one outside voice only |
| henry-david-thoreau | detail_orientation | 78 / 0.66 -> 74 / 0.60 | single independent corroboration (phenology study) |
| henry-david-thoreau | autonomy_need | 76 / 0.58 -> 72 / 0.54 | partly his own writings read through admiring/hostile contemporaries |
| sakichi-toyoda | persistence | 76 / 0.66 -> 72 / 0.60 | much of the narrative from Toyota's own company history |
| natsume-soseki | autonomy_need | 72 / 0.62 -> 70 / 0.56 | popular biography and a chronology rather than independent analysis |
| horace-mann | impact_motivation | 76 / 0.60 -> 72 / 0.54 | motive read from his own reports and admiring entries |
| horace-mann | persuasiveness | 74 / 0.55 -> 70 / 0.50 | reference entries record both campaign and strong opposition |

No score or confidence was raised anywhere. Horace Mann (Wikidata: "politician") is
retained because the scored and carded work is education reform only. Other lead decisions:
two portrait holds (Khusrau, Taqi al-Din, above). Achievement corrections by the lead: 0
(no first-pass failure survived the agents' self-gate).

## Portrait review and caveats (shipped)

Full rights review by the agents (sitter, creator, date, provenance, underlying source,
licence/PD rationale + URL, attribution, dimensions, no upscaling); `likeness` vs
`historical_depiction` kept honest. Historical depictions: Plato (Roman copy of a bust),
Przhevalsky (engraving, 1887), Su Shi (Japanese scroll, Met Open Access). Caveats worth
carrying: Gibbs (unknown photographer, 1906 frontispiece), Machado de Assis (anonymous
c.1896 photograph, age-based basis only, Biblioteca Nacional item page not readable),
Selma Lagerlof (Goodwin c.1917, Uppsala page unreadable, year approximate), Ayrton (383x387
halftone, "published printing" rests on the Commons description), Vivekananda (low-quality
halftone from an 1893 US publication, no photographer credited), Aggrey (1929 US
publication, photographer's dates not established), Ameghino (US publication 1912, US-only
claim), Lobachevsky (painter died 1843; museum notice not read), Sakichi Toyoda (NDL
exhibition terms page states public domain; photographer and first-publication year
unconfirmed), Plato (Italian state-museum reproduction rules not exhaustively checked;
Production Socrates uses the same kind of photograph), Coubertin (BnF item-level "public
domain"; photographer unnamed), Sarah Bernhardt (LoC Sarony original, LoC page not
readable here), Lesseps (Rijksmuseum public-domain mark).

## Preflight accuracy (grade -> outcome)

| Freeze preflight grade | Frozen | Shipped | Held | Ship rate |
|---|---|---|---|---|
| strong | 13 | 12 | 1 | 92% |
| plausible | 12 | 7 | 5 | 58% |
| risky | 5 | 4 | 1 | 80% |
| **all** | 30 | 23 | 7 | 77% |

Strong + plausible: 25 frozen, 19 shipped (76%), against Roster60's 12 frozen strong or
plausible, 7 shipped (58%) and 0 of 18 risky. The strong grade was the best predictor
(12/13). Read these with the following caveats:

- **The lead image survived in 12 of the 23 shipped people; in the other 11 the agent
  replaced it with a better-documented image** (Coubertin, Przhevalsky, Bernhardt, Lagerlof,
  Henry, Lobachevsky, Ayrton, Vivekananda, Aggrey, Ameghino, Su Shi). So the preflight
  predicted *whether a clean image exists*, not *which image*, and the "ship rate" is
  partly produced by the bounded retry.
- **"Risky" shipped 4 of 5, unlike Roster60's 0 of 18.** The five risky picks were
  deliberately the ones with a concrete lead (an NDL exhibition, a US-published
  frontispiece-type source, a Met scroll), not random risky candidates, and 60 of 111 pool
  candidates graded risky were never frozen. A risky grade should therefore not be read as
  "will fail"; it was at the freeze the grade where *no concrete path was yet visible*.

**Why each strong/plausible hold failed despite preflight** (all six are rights-basis
conflicts the freeze-time check did not catch):

1. amir-khusrau (strong): I misread the Smithsonian page, which shows both "CC0" and
   "Usage Conditions Apply"; the replacement open-access miniature does not identify the
   poet.
2. tegla-loroupe (plausible): Commons licence template contradicted by the live source
   page and credit.
3. ulugh-beg (plausible): museum "Usage Conditions Apply" and non-commercial Terms of Use
   contradict the Commons PD tag.
4. wang-yangming (plausible): the holding museum's own copyright statement.
5. eugenio-maria-de-hostos (plausible): rights sit in the digital copy and its (unopened)
   source page, plus Smithsonian usage conditions.
6. taqi-al-din (plausible): group scene with unmarked sitter, holder terms unreachable.

**Calibration for later rosters (standards unchanged):** (a) a Commons PD/CC tag is never
evidence on a museum-hosted image: open the live institutional page and read the
"usage conditions" wording (Smithsonian/Freer, Chinese museums); (b) for scene paintings
require a positive identification before grading anything above risky; (c) a live-source
licence/credit mismatch (Agencia Brasil, Flickr changes) is invisible in Commons metadata;
(d) Nationaal Archief CC0, Rijksmuseum public-domain mark, Met Open Access, Art Institute of
Chicago open access and Smithsonian *Archives* CC0 items were reliable; (e) a named
photographer with an established death date before 1931 and a documented US publication
(Nadar, Carjat, Sarony, Ogawa, Ulke, 1906 book frontispieces) shipped every time.

## Eligibility (computed only after scores were frozen)

Every shipped person is non-match-eligible; **0 of 23 eligible, 114 unchanged**. No rescue:
no rows added, no score or confidence raised, no evidence reinterpreted after eligibility
was known. Columns: rows / coverage / high-confidence count / high-confidence average.

| Person | Rows | Coverage | HC count | HC avg |
|---|---|---|---|---|
| bobby-fischer | 6 | 0.178 | 4 | 0.550 |
| fanny-blankers-koen | 6 | 0.178 | 2 | 0.585 |
| ferdinand-de-lesseps | 6 | 0.184 | 6 | 0.560 |
| florentino-ameghino | 7 | 0.213 | 3 | 0.527 |
| henry-david-thoreau | 6 | 0.184 | 5 | 0.538 |
| hertha-ayrton | 6 | 0.178 | 4 | 0.532 |
| horace-mann | 5 | 0.150 | 3 | 0.540 |
| joseph-henry | 5 | 0.145 | 3 | 0.533 |
| josiah-willard-gibbs | 6 | 0.174 | 3 | 0.520 |
| kwegyir-aggrey | 5 | 0.149 | 1 | 0.500 |
| machado-de-assis | 7 | 0.219 | 5 | 0.536 |
| natsume-soseki | 6 | 0.188 | 5 | 0.560 |
| nikolai-lobachevsky | 7 | 0.216 | 6 | 0.525 |
| nikolay-przhevalsky | 6 | 0.182 | 5 | 0.552 |
| pierre-de-coubertin | 6 | 0.180 | 5 | 0.548 |
| plato | 3 | 0.091 | 0 | 0 |
| sakichi-toyoda | 6 | 0.190 | 5 | 0.552 |
| sarah-bernhardt | 7 | 0.209 | 6 | 0.525 |
| selma-lagerlof | 5 | 0.155 | 3 | 0.557 |
| su-shi | 4 | 0.117 | 1 | 0.500 |
| swami-vivekananda | 4 | 0.117 | 3 | 0.550 |
| victor-hugo | 8 | 0.244 | 4 | 0.512 |
| viswanathan-anand | 5 | 0.153 | 5 | 0.528 |

Batch min / median / max: rows 3 / 6 / 8; coverage 0.091 / 0.178 / 0.244; HC count 0 / 4 /
6; HC average 0 / 0.536 / 0.585. All 23 fall below the minimum of 18 scored attributes
and the 0.60 coverage floor, as expected for sparse, evidence-grounded profiles.

**Cumulative new-candidate cohort Roster33-61: 442 people shipped, 0 match-eligible**
(Roster33-60: 419; Roster61 adds 23). Recorded, not re-investigated; no matching
diagnostic was triggered or run.

## Counts and canonical categories

Literal `categoryCounts.ts 61` output:

```
before roster61: {"production":644,"visible":643,"categoriesProduction":{"science_knowledge":252,"arts_culture":237,"leadership_society":110,"building_discovery":206},"categoriesVisible":{"science_knowledge":252,"arts_culture":237,"leadership_society":109,"building_discovery":205}}
after roster61:  {"production":667,"visible":666,"categoriesProduction":{"science_knowledge":263,"arts_culture":244,"leadership_society":116,"building_discovery":213},"categoriesVisible":{"science_knowledge":263,"arts_culture":244,"leadership_society":115,"building_discovery":212}}
```

Deltas: science +11, arts +7, leadership +6, building +7 (31 category memberships for 23
people because a person counts in every category containing any of their `fieldIds`).
Reconciled mechanically by counting the 23 people's `fieldIds` against
`PROFESSION_CATEGORIES`: science 11, arts 7, leadership 6, building 7, 0 hidden people, so
production and visible deltas are identical (the +1 production-visible gap in leadership and
building remains Zheng He). By direct Directory taxonomy this cycle's largest lift is
science_knowledge (5 primary science shipped, after Roster60's 0).

Final state: production **667**, directory-visible **666**, match-eligible **114**,
candidate JSON **817** (787 + 30). Non-production candidate files (slug not in
production): **172** (89 `evidence_approved`, 83 `held`), i.e. the 165 at the base plus the
7 Roster61 holds. Shipped regional mix: Western Europe 7,
North America 5, East Asia 3, South Asia 2, Latin America 2, central Europe/Russia 2,
sub-Saharan Africa 1, Southern Europe 1. Eras: 19th century 14, 20th century 6, ancient 1,
medieval 1, contemporary 1.

## Validation

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: 0 errors, 0 warnings (641 evidence_approved, 93 qa_passed, 83 held).
- Focused `roster61.test.ts`: 384 tests passed. It carries the Roster60 identity
  protections: every shipped target compared with every OTHER production person (no hard
  identity collision), every hold has no hard production collision, and global unique ids,
  slugs and non-null QIDs; the holds stay `evidence_approved` and absent from production.
- Full Vitest (twice: after wiring and after the final source-URL fix): **91 files, 6233
  tests passed**.

## Calibration

`calibrate.ts quiz` run twice: identical output (`meanSd` **11.704**) and identical
`dispersion.generated.ts` hash on both runs (`ed99bbd0...`, equal to Roster60's); the
eligible set is unchanged (114). The working-tree `M` on `dispersion.generated.ts` was
line-ending noise only (blob hash equals HEAD) and was restored. No tuning;
`CALIBRATION_VERSION` unchanged.

## Final build and Playwright

- Final build (after the last user-visible change): `Generating static pages using 21
  workers (1358/1358)`; invariant `2 x production_count + 24` = 2 x 667 + 24 = **1358**
  confirmed. The earlier build (before the source-URL fix) also read 1358/1358.
- Playwright, whole suite, first run after the roster wiring: **1037 passed, 3 failed**, all
  three in `interestAreaMatching.spec.ts` (quiz completion / refresh, 30 s test timeout
  exceeded, plus a trace-zip teardown error). Re-run of that spec alone: 16 passed, 2
  failed (the same two 30 s timeouts). The same two tests run in isolation take 18.9 s and
  22.5 s on Roster61 and 21.7 s and 21.9 s on the Roster60 tree, and the spec passes 18 of
  18 with `--timeout=120000`: a load-sensitive near-limit test, not a Roster61 regression.
  Recorded, not hidden; no test or timeout was changed in the repository.
- **Final focused Playwright after the last user-visible change** (Person, Editorial,
  Directory, Compare, Trait Explanation: `person.visual`, `editorial`, `peopleDirectory`,
  `compare.visual`, `traitExplanation`): **142 passed on the first run**, 0 failed.

## Local QA (exact final build, `next start`)

- All 23 shipped profiles: EN 200, KO 200; all 23 portrait URLs 200. All 7 holds: EN 404,
  KO 404. Directory shows "666 people". Exactly 23 untracked portrait files remain (the
  shipped set; the two portraits for Khusrau and Taqi al-Din were deleted on the lead
  hold).
- 375x812 sweep, 46 pages (23 x EN/KO): no horizontal overflow, no broken main portrait
  image, no raw internal ids (`snake_case`, `src_`), portrait attribution present on every
  page, Korean display names present, first Achievement card verified in both locales to
  state the defining contribution. Browser console: no errors on the visited page (the
  iframe sweep cannot read per-iframe console output, so console coverage is the top-level
  page only).
- Bounded source link sweep: 200 distinct source, portrait-source, attribution and licence
  URLs: **193 x 200, 3 x 403** (bot blocks: Science Museum Group, Gallica, Britannica), **3
  x 429** (Met pages, rate limit; the Met facts were verified through the Met API and a real
  browser), **1 x 404**. The 404 was a defect: Ameghino's Boscaini et al. 2021 source used
  `https://doi.org/10.5710/PEAPA.23.04.2021.343`, but the registered DOI contains a double
  slash (`10.5710//peapa...`) and the plain form does not resolve. Fixed to the journal's own
  article page (`https://peapaleontologica.org.ar/index.php/peapa/article/view/343`, 200);
  then the roster file, people index, tests, final build and focused Playwright were re-run.

## Defects found and fixed

1. Boscaini DOI 404 in Ameghino's public sources (above), fixed before the final build.
2. First wiring script run read the wrong drafts directory and failed before writing
   anything; no partial wiring occurred.
3. Two preflight misreads at freeze (Smithsonian page for Khusrau; Commons-tag trust for
   Loroupe/Ulugh Beg/Wang Yangming/Hostos) are recorded as selection-process defects, not
   code defects.

## What was not done (by instruction)

No benchmark, no scale checkpoint, no eligibility rescue, no matching diagnostic (not
triggered), no Legacy Batch 6 (legacy remains paused), deferred checkpoint work untouched,
Roster62 not started. `feat/monetization-v1` untouched.

## Next

Recommended: keep the preflight-first selection but add a mandatory "live institutional page
opened and read" step for every museum-hosted lead before it can be graded plausible or
strong; consider freezing a smaller number of scene-painting pre-modern figures unless a
captioned single-figure depiction is already identified. Seven portrait holds
(Loroupe, Ali Farka Toure, Ulugh Beg, Wang Yangming, Hostos, Khusrau, Taqi al-Din) carry
research and exact next steps for a future portrait-only pass.

## Post-commit scoring lock

(To be filled in by the docs-only follow-up commit after the implementation commit.)
