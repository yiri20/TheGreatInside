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

## Frozen 20 (19 shipped — see post-PR correction pass below)

Ranked by (1) existing evidence/publication viability, (2) broad public
recognizability, (3) domain-balancing value, (4) geographic/cultural
diversity. All 20 were `held` purely on `eligibility_v2` numeric floors.

**Post-PR update (2026-09-10): Hippocrates was returned to `held`** after a
post-PR evidence-attribution audit found his evidence base did not survive
honest correction (see "Post-PR factual/evidence-attribution correction
pass" below). The table and counts in this section are preserved as the
original freeze record; the batch that actually shipped is 19, not 20.

| Slug | Domain | Region | Era | Rows |
|---|---|---|---|---|
| ~~hippocrates~~ (returned to `held` post-PR, not shipped) | Medicine | Southern Europe | Ancient | 21 |
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

**Political/state/military/activist-primary candidates in frozen intake: 0/20** (0/19 shipped after the post-PR Hippocrates correction).

**Honest domain gap, not papered over:** the available non-political held
pool contained zero musicians, film/performing-arts figures, or actors/
directors — that Directory bucket could not be strengthened this cycle
without new candidate research, which was out of scope. Composition
otherwise skews toward science/mathematics (6-7 of 19 shipped), reflecting several
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

All 20 originally received EN+KO achievements/moments/(turning points
where genuinely supported), variable-length per person, grounded only in
facts already present in that person's audited row rationales — no new
behavioral claims introduced during portrait research or writing. 43
achievements, 24 moments, 3 turning points across the original 20; every
`sourceId` referenced resolves to that same person's own `Person.sources`
(mechanically verified, 0 mismatches). `validateEditorial()` against the
live 205-person roster (at the time): **0 issues**. Korean coverage:
**100%** (every EN key has a matching KO key). **Post-PR update:**
Hippocrates' 2 achievements + 1 moment (3 items) were removed along with
his return to `held` — see below — leaving 41 achievements, 23 moments, 3
turning points across the 19 who actually shipped; `validateEditorial()`
against the corrected live 204-person roster remains **0 issues**, Korean
coverage remains **100%**.

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

Table preserved as the original freeze record (Hippocrates included, since
this reflects the state at freeze time before the post-PR correction pass
returned him to `held` — see below; the post-PR-corrected Hippocrates rows
score far lower and were never re-run through this table since he no
longer ships).

| Slug | Scored | Coverage | Binding reason |
|---|---|---|---|
| ~~hippocrates~~ (not shipped, see post-PR correction) | 21 | 0.634 | confidence 0.449 < 0.55 |
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

**Correction (2026-09-10, post-PR review):** the paragraph above describes
only what the pre-commit gate actually checked (a targeted scan for
"only"/"first"/"founded"-style superlative trigger language) and should not
be read as a claim that the pre-PR gate caught every factual issue in the
batch. It did not: post-PR review found several additional date, quantity,
and evidence-attribution errors the pre-commit gate's narrower trigger-word
scan missed entirely (wrong dates rather than superlatives, an
agents-vs-employees conflation, an unsupported precise age, an
overstated "independently" framing, and a systemic Corpus-attribution
problem for Hippocrates that no keyword scan would catch). See "Post-PR
factual/evidence-attribution correction pass" below for the full,
honestly-scoped record of what was actually found after this PR was
opened.

## Post-PR factual/evidence-attribution correction pass (2026-09-10)

After PR #30 was opened, a separate, narrowly-scoped review pass re-opened
sources ALREADY cited in seven candidates' files (no new source discovery,
no new behavioral evidence, no candidate replacement, no Roster31 work) and
found factual/attribution errors the pre-commit factual gate's narrower
"only"/"first"/"founded" trigger-word scan did not catch. Categorized per
this project's own correction taxonomy:

**1. Original `RUBRIC_CORRECTION`s (pre-PR, unchanged):** Barbara
McClintock and Frederick Sanger's `analytical_rigor` rows — see "Audit and
corrections" above.

**2. Original `ERROR_CORRECTION` (pre-PR, unchanged):** Frederick Sanger's
"only person" -> "one of only two" Chemistry-twice correction — see
"Source-claim factual gate" above.

**3. New factual `ERROR_CORRECTION`s (this pass):**
- **Mary Anning**: her father Richard Anning died in 1810, not 1811; the
  ichthyosaur skull was found by her brother Joseph in autumn 1811 with
  Mary excavating the rest in 1812 (not a single "1811" find); 1821 was the
  year the Plesiosaurus genus was named from a different, partial specimen
  — Mary's own first complete Plesiosaurus skeleton dates to December 1823,
  not 1821; and the claim that she "took over as the family's primary
  fossil-collecting practitioner... immediately" after her father's death
  overstated the record (the family's trade continued as a shared
  endeavor; her own role grew over time). Corrected in `persistence`,
  `resourcefulness`, `achievement_drive`, and `proactive_agency`
  (proactive_agency also conservatively re-scored: 66/0.65/documented ->
  58/0.5/strong_inference) plus EN/KO editorial.
- **Madam C.J. Walker**: "employing roughly 40,000 people" is not
  supported; the Library of Congress's own figure is "over 20,000 agents"
  by 1916 — agents, not converted to employees. Corrected in
  `achievement_drive` (score/confidence/evidenceType unchanged — the
  achievement remains well-documented at the corrected magnitude) plus
  EN/KO editorial. New source added: Library of Congress ("Beauty
  Entrepreneur: Madam C. J. Walker Born").
- **Jean-François Champollion**: "mastered six languages by age 12" is not
  supported by the already-cited Wikipedia article, which describes a
  progressive acquisition from around age 11 into his mid-teens. Corrected
  in `mastery_orientation` (95/0.72/documented -> 82/0.55/strong_inference)
  and `curiosity` (90/0.5 -> 80/0.46, both strong_inference) plus EN/KO
  editorial — both extreme scores mechanically re-audited per this pass's
  own instruction not to preserve a quantitative value merely because it
  predates correction.
- **Chien-Shiung Wu**: the Atomic Heritage Foundation (already cited) says
  she "helped identify" xenon-135 poisoning at Hanford, not that she
  "independently identified" it alone, and does not credit her with
  restoring production. Corrected in `experimentation` (wording only) plus
  EN/KO editorial; the `independent_thinking` row was **removed** (not
  merely downgraded) because its entire stated basis was the unsupported
  "independently... beyond her assigned role" framing, and per this pass's
  own instruction no replacement rationale was invented from unrelated
  achievements.
- **Andrew Carnegie**: "12 people were killed" at Homestead is more precise
  than reputable sources agree on (Wikipedia's own account states 10 — 7
  strikers, 3 Pinkerton agents — for the July 6 confrontation specifically).
  Narrowed to "a deadly armed confrontation" in `conflict_tolerance`
  (score/confidence unchanged) plus EN/KO editorial; the negative,
  dual-edged framing is preserved, not sanitized.

**4. Evidence-attribution correction — Hippocrates (the most significant
finding):** a full row-by-row audit of all 21 rows found nearly every one
converted anonymous/collective Hippocratic Corpus material (the corpus
itself already acknowledged in the candidate's own provenance as having
disputed, multi-author origin) into documented personal behavior of
Hippocrates specifically. The clearest case: `detail_orientation` scored
76/0.65/`documented` — this rubric's highest confidence tier — purely
because the Epidemics texts contain detailed case logs, without
establishing Hippocrates personally (rather than a student or later
compiler) wrote them. Two rows (`achievement_drive`, `leadership_drive`)
additionally rested on a "founded a medical school on Kos" claim the
already-cited Wikipedia article does not support (he was "probably trained
at" the Kos asklepieion; founding is not established — Plato's "Hippocrates
of Kos, the Asclepiad" establishes he was a named, respected physician of
that tradition, not its founder). `impact_motivation` rested on the
Hippocratic Oath, which the same source says was likely "written after his
death." Every row was corrected in place (score, confidence, evidenceType,
and rationale — see each row's own `[ERROR_CORRECTION]` tag in
`data-pipeline/candidates/hippocrates.json`), not deleted, preserving an
honest record. After correction, no row remains above inference-level
evidence for Hippocrates the individual specifically (as opposed to the
school/tradition bearing his name), and the corrected evidence does not
meet this project's bar for a responsible individual personality profile.
**Hippocrates was returned to `held`** (not `rejected` — his evidence is
insufficient now, not permanently disqualified) and removed from the
Roster30 generated production set (`generateRoster30.ts`'s
`ROSTER_30_SLUGS`, `src/data/people/editorial.ts`, and the corresponding
`src/core/i18n/editorial.ts` EN/KO text). See his own `holdReason` for the
full statement. **No candidate was substituted in his place; the batch
ships 19, not 20.**

**5. Classification metadata fixes:** none newly found this pass (the
three from the original pre-commit gate — see "Classification metadata
corrections" above — stand unchanged).

**6. Taxonomy/i18n fix:** none newly found this pass (the `field.linguistics`
fix above stands unchanged).

**7. Provenance-status consistency fixes:** five candidate files
(`mary-anning`, `jean-francois-champollion`, `chien-shiung-wu`,
`barbara-mcclintock`, `frederick-sanger`) carried provenance notes that
still narrated a "held" outcome from before Roster30 promotion, now
ambiguous/contradictory against their actual current `evidence_approved`
status. Each received one added sentence distinguishing the historical
narrative from current status; no prose was rewritten or deleted.

**Source-claim check performed, no error found:** Al-Khwarizmi's "founded
algebra as a systematic discipline" language was checked against the
already-cited Wikipedia article, which explicitly and strongly supports it
("the father or founder of algebra," "the first person to treat algebra as
an independent discipline"). Wording was tightened to track the source's
own "first to treat X as Y" phrasing in three rationale locations plus EN/KO
editorial, for precision — no score/confidence/evidenceType change, since
the stronger claim is itself well-supported and the mathematical
significance was not weakened.

**Scope discipline:** no new sources were discovered for scoring purposes
(Madam C.J. Walker's Library of Congress citation and Al-Khwarizmi's
already-known Wikipedia content are the only sources "opened" beyond what
each candidate already cited, both used only to narrow/correct existing
claims per this pass's own instruction); no new behavioral evidence was
added to any row; no score was raised; no confidence was raised; no match
eligibility was rescued; `eligibility_v2` and the matching formula were not
touched; no calibration or dispersion regeneration was run (mechanically
unnecessary — the eligible set did not change); Roster31 was not started.

## Validation summary

Pre-PR (original commit, 20-person state):

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

**Post-PR correction pass (targeted only, per this pass's own explicit
instruction not to rerun the full suite unless a structural failure
requires it):**

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: 0 errors, 0 warnings (277 candidates; by status:
  93 `qa_passed`, 76 `evidence_approved`, 108 `held` — Hippocrates counted
  in `held`).
- `checkScoringLockIntegrity.ts`: 0 flagged (277 candidates checked against
  HEAD — a warning-only tool, not a hard gate; every score change here is
  either conservative/downward or unchanged, consistent with
  `ERROR_CORRECTION` policy).
- Mechanical candidate → `roster30.ts` → `SEED_PEOPLE` consistency check:
  `ROSTER_30` has 19 people (no Hippocrates); `SEED_PEOPLE` has 204 people,
  0 duplicate slugs; all 19 shipped roster30 people present with
  `isDirectoryVisible: true` / `isMatchEligible: false`; directory-visible
  count 203; match-eligible count 127 (unchanged). **0 unexplained
  mismatches.**
- `i18n-audit.ts`: 100% Korean coverage (`ko-KR missing: 0`), every bucket
  0 missing.
- `editorialCoverageAudit.ts`/`validateEditorial()`: 204/204 people with
  editorial content, 0 structural issues, 100% Korean key coverage (1036
  items: 459 achievements, 393 moments, 184 turning points).
- Targeted `vitest run` (`matching.test.ts`,
  `profilePublicationSeparation.test.ts`, `editorialValidation.test.ts`,
  `candidateSchema.test.ts`): **119/119 passed**.
- Targeted Playwright (`roster30TwentyPersonZeroPoliticsBatch.spec.ts` +
  `peopleDirectory.spec.ts`, run against a real `next build && next start`
  production server): **166/166 passed** after one genuine, expected fix —
  `peopleDirectory.spec.ts`'s KO-locale cross-facet test had a hardcoded
  `205명` ("205 people") total baked into its regex from before this
  correction pass; corrected to `204명` (the filtered count of 7 itself was
  unaffected — Hippocrates was never part of that curiosity+collaboration
  cross-facet set, before or after correction). Also includes one new test,
  explicitly required by this pass: confirms Hippocrates' directory card
  and profile route are both absent/404 in production.
- No full Vitest, no full `next build` typecheck-only-vs-full distinction,
  and no full Playwright rerun performed, per this pass's own explicit
  scope instruction — the targeted results above are the complete
  post-PR validation record.

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
- Mobile Directory (375px): search box, filters, and "204 people" (at the
  time; **203 people** after the post-PR Hippocrates correction, confirmed
  by the targeted Playwright rerun above) all render correctly in the
  single-column layout.

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

**Post-PR update:** the two count-bearing test files above and the new
Playwright spec were each touched a second time when Hippocrates was
returned to `held`:
- `matching.test.ts`: removed `"hippocrates"` from both `knownNonEligible`
  Sets (harmless either way, since that test only checks slugs that
  actually exist in `SEED_PEOPLE`, but left in place it would have been
  stale).
- `profilePublicationSeparation.test.ts`: removed `"hippocrates"` from
  `KNOWN_DIVERGENT_SLUGS`; counts corrected 205→204/204→203; divergent-slug
  count "seventy-seven"→"seventy-six" in the test name/comment.
- `e2e/roster30TwentyPersonZeroPoliticsBatch.spec.ts`: removed the
  Hippocrates table entry; "204 people"/"twenty" → "203 people"/"nineteen"
  in the directory-count test; added a new dedicated test confirming his
  directory card and profile route are both absent in production.
- `e2e/peopleDirectory.spec.ts`: the KO-locale cross-facet test's `205명`
  total corrected to `204명` — see "Validation summary" above.

## What did NOT change

`next-env.d.ts`, `.env.local` (only a gitignored local copy for testing),
monetization files, analytics files, `eligibility_v2`, the matching
formula, calibration, `dispersion.generated.ts`, any unrelated
candidate/person file, Roster31.

## Final counts

Twenty were originally promoted; Hippocrates was returned to `held` on
post-PR review (see below), so nineteen actually shipped.

- Production: **204** (was 185)
- Directory-visible: **203** (was 184)
- Match-eligible: **127** (unchanged)

## Confirmations

- No eligibility rescue: confirmed (all 19 shipped remain
  `isMatchEligible: false`; Hippocrates, now `held`, was never eligible
  either).
- No new behavioral research: confirmed, both pre-PR (portrait sourcing and
  source re-verification only) and post-PR (re-opened only already-cited
  sources, plus one narrowly-scoped Library of Congress citation used only
  to correct Madam C.J. Walker's existing employee-count claim).
- No factual issue was knowingly deferred: **not fully accurate as
  originally written pre-PR** — see "Source-claim factual gate"'s
  correction note and the "Post-PR factual/evidence-attribution correction
  pass" section above for the honest, complete record of what the
  pre-commit gate missed and what the post-PR pass found and fixed.
- Exactly one normal Vercel preview per push: confirmed for the original
  PR push; the post-PR correction commit triggers exactly one more
  automatic preview, no manual/throwaway redeploys taken.
- Roster31 not started: confirmed.
- No follow-up PR: confirmed — the post-PR correction pass committed
  directly to this same branch/PR.

## Handoff: Roster30/31 zero-politics rule

This batch itself satisfies the zero-politics rule (0/20, verified twice —
once at freeze, once again as a post-check after all edits). The same rule
still applies to **Roster31**, which has not been started. See this
project's cross-session memory (recorded after Roster29) for the full
rule text; it is not duplicated here to avoid the maintenance drift
`CLAUDE.md` warns against.
