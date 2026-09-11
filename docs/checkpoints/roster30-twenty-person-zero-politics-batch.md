# Roster-30: Twenty-Person Zero-Politics Fast Production Batch

Base: `origin/main` at `e068ae5f623a4ecd07f41a30f4f45530438f3b7c` (Roster29's
merge commit). Same throughput-cycle discipline as Roster25-29: select from
the existing `data-pipeline/candidates/*.json` held pool only, audit with
existing evidence only, one consolidated commit, one PR. This batch adds one
deliberate constraint on top: **zero people whose primary historical
significance is political leadership, state rule, military command, or
political/civil-rights activism** — a correction to a composition imbalance
flagged after Roster29.

## Why this cycle exists

Roster24-29 repeatedly reached into the held pool's politically/militarily
significant figures for evidence-viability reasons, leaving the Directory
skewed toward that domain relative to science, arts, business, and sport.
This batch corrects that directly rather than incidentally.

## Held-pool inventory

277 total candidate files. Excluding 185 already-published, the 22 Group-B
evidence-integrity exclusions (unchanged, unexamined), and every candidate
whose `occupationIds`/`fieldIds` touch politics/diplomacy/military/civil
rights/activism, the available non-political pool was **49 candidates, all
`held`** — every one held solely on `eligibility_v2`'s numeric floors
(confidence, coverage, or scored-attribute count), none for evidence-
integrity reasons. Two additional candidates with otherwise-sufficient
evidence (Booker T. Washington, Edward Said) were deliberately excluded at
selection time as genuinely ambiguous under the primary-fame test (see
below) rather than promoted.

## Zero-politics hard gate

Applied before freezing, not after: every one of the 49 available
candidates' `occupationIds`/`fieldIds` was checked against the disallowed
list (political/military/diplomatic/activism occupations and fields). Two
borderline candidates were excluded on judgment rather than mechanical
classification:

- **Booker T. Washington** — occupationId is `educator`, but his primary
  historical significance (the Atlanta Compromise, the rivalry with Du Bois
  over racial-uplift strategy) is substantially about ideological movement
  leadership under Jim Crow, not merely running Tuskegee Institute.
- **Edward Said** — occupationIds are `writer`/`professor`, but a
  significant share of his own scored evidence rows are drawn from his PLO
  membership, the 1993 break with PLO leadership over Oslo, and the 2000
  stone-throwing incident — political activity, not literary-critical
  activity.

Per the task's own tie-breaker for ambiguous cases, both were passed over
in favor of other evidence-viable candidates.

## Frozen 20

Ranked by (1) existing evidence/publication viability, (2) broad public
recognizability, (3) domain-balancing value, (4) geographic/cultural
diversity. All 20 were `held` purely on `eligibility_v2` numeric floors.

| Slug | Domain | Region | Era | Rows |
|---|---|---|---|---|
| hippocrates | Medicine | Southern Europe | Ancient | 21 |
| barbara-mcclintock | Genetics | North America | 20th c. | 20 |
| chien-shiung-wu | Physics | East Asia | 20th c. | 20 |
| frederick-sanger | Biochemistry | Western Europe | 20th c. | 20 |
| hypatia | Math/Philosophy | North Africa | Ancient | 20 |
| jean-francois-champollion | Linguistics/History | Western Europe | 19th c. | 20 |
| mary-shelley | Literature | Western Europe | 19th c. | 20 |
| omar-khayyam | Math/Literature | West Asia | Medieval | 20 |
| mary-anning | Paleontology | Western Europe | 19th c. | 19 |
| al-khwarizmi | Mathematics | West Asia | Medieval | 18 |
| baruch-spinoza | Philosophy | Western Europe | Early modern | 18 |
| sebastiao-salgado | Photography | Latin America | Contemporary | 18 |
| jrr-tolkien | Literature | Western Europe | 20th c. | 14 |
| antoni-gaudi | Architecture | Southern Europe | 19th c. | 6 |
| georgia-okeeffe | Visual art | North America | 20th c. | 5 |
| andrew-carnegie | Business | North America | 19th c. | 5 |
| madam-cj-walker | Business | North America | 19th c. | 5 |
| jesse-owens | Sports | North America | 20th c. | 10 |
| roald-amundsen | Exploration | Western Europe | 20th c. | 5 |
| paul-erdos | Mathematics | Central Europe | 20th c. | 13 |

**Political/state/military/activist-primary candidates in frozen intake: 0/20.**

**Honest domain gap, not papered over:** the available non-political held
pool contained zero musicians, film/performing-arts figures, or actors/
directors — that Directory bucket could not be strengthened this cycle
without new candidate research, which was out of scope. Composition
otherwise skews toward science/mathematics (7-8 of 20), reflecting several
past calibration-experiment sessions that happened to score many
scientists into the held pool; literature/philosophy/scholarship (5),
visual art/architecture/photography (3), business (2), and sports/
exploration (2) round out the batch. Geographic distribution leans
Western Europe/North America (12/20), an honest reflection of the pool
itself rather than a selection choice — diversity is explicitly the
lowest-priority ranking criterion, below evidence viability, recognizability
and domain balance.

## Audit and corrections (row-level)

Full row-by-row audit against each candidate's own already-cited evidence
(no new source discovery). Two RUBRIC_CORRECTIONs, zero NEW_EVIDENCE:

- **Barbara McClintock**, `analytical_rigor`: the original rationale
  inferred rigor from "the eventual [Nobel] vindication... even when the
  field initially rejected the conclusion" — an outcome-based inference
  this project's own scoring discipline (behavior, not results) does not
  support. Narrowed 90→65, `strong_inference`→`inference`, re-grounded in
  the documented technical nature of her cytogenetic mapping work itself.
- **Frederick Sanger**, `analytical_rigor`: same outcome-based pattern
  ("inferred from the documented dual outcome" of two Nobel Prizes).
  Narrowed 90→65, `strong_inference`→`inference`, re-grounded in the
  documented technical structure of his two sequencing methods.

Both are exact analogues of a discipline the same candidate pool already
applies correctly elsewhere (e.g. Hypatia's `risk_tolerance` row explicitly
scores from documented behavior, not from the outcome of her death).

## Classification metadata corrections

Three genuine invalid-enum-value errors, caught by `tsc` after the first
generator run (not something the row audit above catches, since it checks
semantic consistency, not literal type-union membership):

- **Andrew Carnegie**, **Madam C.J. Walker**: `impactDomains` used
  `"economic"`, not a valid `ImpactDomain` value. Corrected to
  `"wealth_creation"`, the closest existing valid value.
- **Barbara McClintock**: a source's `kind` was `"book"`, not a valid
  `PersonSource.kind` value. Corrected to `"biography"` (accurate — Keller's
  *A Feeling for the Organism* is a biography).

## Product taxonomy/i18n coverage fixes

One fix, mechanically triggered by this batch crossing an existing
inclusion threshold (`docs/reference/directory-taxonomy.md`'s own rule: a
`fieldIds` value becomes a Directory filter chip only once ≥2 people carry
it): Jean-François Champollion's `linguistics` fieldId was previously used
by exactly one already-published person (below the threshold, hence
unlabeled). Added `field.linguistics` EN+KO labels and included
`"linguistics"` in `PROFESSION_CATEGORIES.science_knowledge`.

Kept separate from the classification-metadata corrections above per the
task's own instruction not to conflate the two categories.

## Editorial content

All 20 received EN+KO achievements/moments/(turning points where
genuinely supported), variable-length per person, grounded only in facts
already present in that person's audited row rationales — no new
behavioral claims introduced during portrait research or writing. 43
achievements, 24 moments, 3 turning points across the 20; every
`sourceId` referenced resolves to that same person's own `Person.sources`
(mechanically verified, 0 mismatches). `validateEditorial()` against the
live 205-person roster: **0 issues**. Korean coverage: **100%** (every EN
key has a matching KO key).

## Portraits

All 20 sourced from Wikimedia Commons; every license page actually opened
and read (never trusted from a thumbnail or search snippet).

| Slug | License | Creator/Date | Kind |
|---|---|---|---|
| hippocrates | Licence Ouverte 1.0 (VRT-confirmed) | Unknown, undated engraving | historical_depiction |
| barbara-mcclintock | No known restrictions (LOC) | Bernard Gotfryd, 1981 | likeness |
| chien-shiung-wu | No known copyright restrictions | Smithsonian Institution Archives, 1963 | likeness |
| frederick-sanger | PD-USGov (NIH/NLM) | Unknown, undated | likeness |
| hypatia | PD-Art (PD-old-100) | Unknown engraver, c. 1850 | historical_depiction |
| jean-francois-champollion | PD-Art | Léon Cogniet, 1831 (lifetime) | likeness |
| mary-shelley | PD-Art | Richard Rothwell, exhibited 1840 (lifetime) | likeness |
| omar-khayyam | CC BY-SA 3.0 / GFDL | A. Venediktov, undated | historical_depiction |
| mary-anning | PD-Art (PD-old-auto) | Unknown ("Mr. Grey"), before 1842 (lifetime) | likeness |
| al-khwarizmi | CC BY-SA 4.0 (VRT-confirmed) | Muntadher Saleh, 2022 | historical_depiction |
| baruch-spinoza | PD-Art (PD-old-100-expired) | Unknown, c. 1665 (lifetime) | likeness |
| sebastiao-salgado | CC BY 3.0 Brazil | Fernando Frazão/Agência Brasil, 2016 | likeness |
| jrr-tolkien | PD (pre-1931 publication) | H.J. Whitlock & Sons Ltd., 1911 | likeness |
| antoni-gaudi | PD-old-100-expired | Pau Audouard Deglaire, 1878 | likeness |
| georgia-okeeffe | No known restrictions (LOC Van Vechten) | Carl Van Vechten, 1950 | likeness |
| andrew-carnegie | PD-anon-expired | Unknown, Nov 1895 | likeness |
| madam-cj-walker | PD-US-expired | Addison N. Scurlock, c. 1914 | likeness |
| jesse-owens | PD-scan (PD-US-not-renewed) | International News Photos, 1936 | likeness |
| roald-amundsen | PD-old-70-expired | Unknown (LOC), 1913 | likeness |
| paul-erdos | CC BY 3.0 / GFDL | Kmhkmh, 1992 | likeness |

Notable rejected alternatives:

- **Hypatia**: rejected Julia Margaret Cameron's "Hypatia" photograph — a
  staged Victorian allegorical art photo of a costumed model (same genre as
  her "Ophelia"/"Sappho" works), not an attempt at a historical depiction.
- **Al-Khwarizmi**: rejected two Urgench monument-statue photos as primary
  — both are wide architectural shots where his figure is a small distant
  silhouette, illegible as a portrait; used a Commons "Valued image"
  artistic portrait instead.
- **Antoni Gaudí**: preferred the original 1878 B&W studio photo over a
  same-subject 2026 "colorized portrait" upload whose license rests on the
  uploader's own claimed copyright over the colorization — a less
  foundational basis than the original's unambiguous age-based PD status.
- **J.R.R. Tolkien**: deliberately used his earliest (1911, age 19) photo
  rather than any later, more recognizable one — most 20th-century photos
  of him remain under UK copyright given the estate's active rights
  management; the 1911 studio photo is old enough to be unambiguously free
  and is already the image used on his own English Wikipedia article.

## Promotion

All 20 promoted via `preparePersonSeedForPromotion()` (never
`toPersonSeed()` directly, never gated on `computedEligibility.eligible`).
`checkPromotionReadiness()` passed for all 20 after portrait attribution
was added. `directoryVisible: true` (the function's own default) for all 20.

## Match eligibility

Live `evaluateMatchEligibility()` re-run after all corrections. All 20
remain `isMatchEligible: false` — no eligibility rescue occurred, and
`eligibility_v2` was not touched.

| Slug | Scored | Coverage | Binding reason |
|---|---|---|---|
| hippocrates | 21 | 0.634 | confidence 0.449 < 0.55 |
| barbara-mcclintock | 20 | 0.604 | confidence 0.500 < 0.55 |
| chien-shiung-wu | 20 | 0.604 | confidence 0.479 < 0.55 |
| frederick-sanger | 20 | 0.607 | confidence 0.469 < 0.55 |
| hypatia | 20 | 0.600 | confidence 0.470 < 0.55 |
| jean-francois-champollion | 20 | 0.606 | confidence 0.492 < 0.55 |
| mary-shelley | 20 | 0.607 | confidence 0.475 < 0.55 |
| omar-khayyam | 20 | 0.604 | confidence 0.482 < 0.55 |
| mary-anning | 19 | 0.577 | confidence 0.467 AND coverage < 0.6 |
| al-khwarizmi | 18 | 0.546 | confidence 0.529 AND coverage < 0.6 |
| baruch-spinoza | 18 | 0.542 | confidence 0.448 AND coverage < 0.6 |
| sebastiao-salgado | 18 | 0.545 | confidence 0.476 AND coverage < 0.6 |
| jrr-tolkien | 14 | 0.423 | scored count AND coverage below floor |
| antoni-gaudi | 6 | 0.193 | scored count AND coverage far below floor |
| georgia-okeeffe | 5 | 0.152 | scored count AND coverage far below floor |
| andrew-carnegie | 5 | 0.149 | scored count AND coverage far below floor |
| madam-cj-walker | 5 | 0.155 | scored count AND coverage far below floor |
| jesse-owens | 10 | 0.302 | scored count AND coverage below floor |
| roald-amundsen | 5 | 0.152 | scored count AND coverage far below floor |
| paul-erdos | 13 | 0.397 | scored count AND coverage below floor |

Zero newly match-eligible people. Per the task's own instruction, dispersion
regeneration, calibration, and matching-health were correctly **not run**.

## Source-claim factual gate

Scanned all new/changed EN prose for high-risk trigger language (first,
only, founded, invented, exact dates/ages/counts, etc.) and re-opened the
already-cited live source for the highest-risk hits.

**One substantive error caught and fixed before commit:**

- **Frederick Sanger**: the candidate row and new editorial text both
  claimed he was "the only person to win the Nobel Prize in Chemistry
  twice." Re-opening en.wikipedia.org/wiki/Frederick_Sanger found: *"He is
  one of only three people to have won multiple Nobel Prizes in the same
  category (the others being John Bardeen in physics and Karl Barry
  Sharpless in chemistry)"* — Sharpless won Chemistry twice (2001, 2022).
  Narrowed to "one of only two people" in the candidate row rationale
  (labeled ERROR_CORRECTION) and in both EN and KO editorial text.

**Two high-risk superlatives checked and confirmed accurate:**

- **Mary Anning**: "first correctly-identified ichthyosaur/plesiosaur/
  pterosaur" claims match en.wikipedia.org/wiki/Mary_Anning verbatim.
- **Jesse Owens**: "six world records... in under an hour" matches
  en.wikipedia.org/wiki/Jesse_Owens ("set five world records, and tied
  another... in less than an hour").

No other "only"-pattern claims remained unaddressed in the new prose.

## Validation summary

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: 0 errors, 0 warnings (277 candidates).
- `checkScoringLockIntegrity.ts`: 0 flagged (277 candidates checked against
  HEAD; both RUBRIC_CORRECTIONs properly noted in `provenance.notes`).
- `vitest run`: **744/744 passed** (54 test files), including the updated
  `matching.test.ts` non-eligible allowlists and
  `profilePublicationSeparation.test.ts` counts/divergent-slug list.
- `i18n-audit.ts`: 100% Korean coverage, 0 missing keys.
- `editorialCoverageStats`/`validateEditorial`: 205/205 people with
  editorial content, 0 structural issues, 100% Korean key coverage.
- `next build --webpack`: clean, 434 static pages.
- Playwright (`roster30TwentyPersonZeroPoliticsBatch.spec.ts` +
  `peopleDirectory.spec.ts`): **172/172 passed**.

## Manual product verification

Run against a real `next start` production server (not `next dev`, which
this project's own history shows can exhibit unrelated staleness
artifacts on freshly-generated roster files).

- **J.R.R. Tolkien** (globally recognizable, literature): real 1911 portrait,
  correct attribution line, achievements/moments render, honest
  non-match-eligible messaging, Wikipedia/Wikidata links present.
- **Al-Khwarizmi** (`historical_depiction`, medieval scholar): correct
  attribution ("Muntadher Saleh, 2022 · Wikimedia Commons (Expo 2020
  Dubai) · CC BY-SA 4.0"), no mislabeling as a likeness.
- **Chien-Shiung Wu** (Korean profile, hyphenated-name search risk): full
  Korean achievements/moments/turning-point render correctly with no raw
  i18n keys; display name "우젠슝" renders correctly as an `<h1>`.
- Mobile Directory (375px): search box, filters, and "204 people" all
  render correctly in the single-column layout.

## Test maintenance (genuinely affected only)

- `src/core/matching/matching.test.ts`: extended both `knownNonEligible`
  Sets (2 tests) with all 20 roster30 slugs.
- `src/core/people/profilePublicationSeparation.test.ts`: extended
  `KNOWN_DIVERGENT_SLUGS` with 20 more slugs; counts 185→205, 184→204;
  divergent-slug count "fifty-seven"→"seventy-seven" in the test name/comment.
- `e2e/peopleDirectory.spec.ts`: the KO-locale cross-facet
  (curiosity AND collaboration) test's hardcoded count needed a genuine,
  honest update — Paul Erdős (curiosity 92, collaboration 96, both his real
  evidence_approved scores) newly crosses both z-score thresholds
  simultaneously, raising the filtered count from 6 to 7. Not a rescored
  value; verified directly against the live `personExhibitsTrait()`/
  `filterPeople()` result, same discipline as every prior update to this
  test's comment history.
- New: `e2e/roster30TwentyPersonZeroPoliticsBatch.spec.ts` (one table-driven
  file, not 20 person-specific files).

## What did NOT change

`next-env.d.ts`, `.env.local` (only a gitignored local copy for testing),
monetization files, analytics files, `eligibility_v2`, the matching
formula, calibration, `dispersion.generated.ts`, any unrelated
candidate/person file, Roster31.

## Final counts

- Production: **205** (was 185)
- Directory-visible: **204** (was 184)
- Match-eligible: **127** (unchanged)

## Confirmations

- No eligibility rescue: confirmed (all 20 remain `isMatchEligible: false`).
- No new behavioral research: confirmed (portrait sourcing and source
  re-verification only; the factual gate narrowed wording, it did not add
  facts).
- No factual issue was knowingly deferred post-PR: confirmed (the Sanger
  double-Nobel error was found and fixed before commit).
- Exactly one normal Vercel preview: to be confirmed after the PR is
  opened (no manual/throwaway redeploys taken).
- Roster31 not started: confirmed.

## Handoff: Roster30/31 zero-politics rule

This batch itself satisfies the zero-politics rule (0/20, verified twice —
once at freeze, once again as a post-check after all edits). The same rule
still applies to **Roster31**, which has not been started. See this
project's cross-session memory (recorded after Roster29) for the full
rule text; it is not duplicated here to avoid the maintenance drift
`CLAUDE.md` warns against.
