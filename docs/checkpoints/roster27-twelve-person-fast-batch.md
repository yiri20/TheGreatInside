# Roster-27: Twelve-Person Fast Production Batch

Branch: `feat/roster27-twelve-person-fast-batch` (worktree:
`C:\Users\Lenovo\TheGreatInside-roster27-twelve-person-fast-batch`, created
from `origin/main` at `badba33d3b7f079c099bc31959f660735730f690`).

## Why this cycle exists

Throughput. A fixed twelve-candidate intake, mechanically selected from
`data-pipeline/candidates/*.json` only — no new candidate discovery, no
new behavioral research. Deliberately diversified away from roster26's
politics-heavy batch: zero political/state leaders this cycle.

## Intake selection

The promotable pool (`qa_passed`/`evidence_approved`) was fully drained
after roster26 — every candidate here came from the 169-strong `held`
pool. Excluded 18 candidates held for evidence-integrity reasons
(unrelated to eligibility) and any candidate requiring new behavioral
research. Ranked the remainder by evidence richness, then diversified
domain/geography, explicitly deprioritizing political/state-leader
figures per the brief:

| # | Candidate | Domain | Region/Era | Rows | Notable evidence |
|---|---|---|---|---|---|
| 1 | Amelia Earhart | Explorer | North America, 20th c. | 20 | Smithsonian NPG record |
| 2 | Bob Marley | Musician | Latin America (Jamaica), 20th c. | 18 | Standard biography + press |
| 3 | Rosa Parks | Civil-rights figure | North America, 20th c. | 20 | Own autobiography |
| 4 | Jorge Luis Borges | Writer/philosopher | Latin America, 20th c. | 16 | Multi-instance on nearly every row |
| 5 | Zaha Hadid | Architect | West Asia, contemporary | 20 | Pritzker citation |
| 6 | Jean-Jacques Rousseau | Philosopher | Western Europe, early modern | 20 | Own Confessions |
| 7 | Hedy Lamarr | Actor/inventor | Western Europe, 20th c. | 21 | Smithsonian record |
| 8 | Lu Xun | Writer | East Asia, 20th c. | 18 | Own essays/letters |
| 9 | Ken Saro-Wiwa | Writer/activist | Sub-Saharan Africa, contemporary | 18 | Own diary + MOSOP founding docs |
| 10 | Norman Borlaug | Scientist/agronomist | North America, 20th c. | 14 | NAS biographical memoir |
| 11 | Marie Tharp | Scientist | North America, 20th c. | 20 | Well-corroborated |
| 12 | Al-Biruni | Scientist/polymath | Central Asia, medieval | 22 | Real surviving correspondence (Ibn Sina) |

Zero political/state leaders. Frozen once selected — no substitution, no
13th candidate, no new discovery. All 12 survived audit (target was
10-12; achieved the maximum).

## Audit and disposition

| Candidate | Audit result | Corrections | Portrait |
|---|---|---|---|
| Lu Xun | No issues found | None | LuXun1930.jpg, PD-China (age) |
| Amelia Earhart | No issues found (risk_tolerance 90 rests on 3 separately named flights) | None | Smithsonian NPG, 1937, PD-US |
| Zaha Hadid | No issues found | None | VRT-verified permission, 2013 |
| Jorge Luis Borges | No issues found (independent_thinking 88, belief_updating 85 both rest on 3-5 independently dated instances) | None | Grete Stern, 1951, PD-Argentina/US |
| Norman Borlaug | 2 `RUBRIC_CORRECTION`s | persistence 90→80, achievement_drive 92→80 | USAID, 2004, PD-USGov |
| Marie Tharp | 1 `RUBRIC_CORRECTION` | detail_orientation 90→80 | AIP Emilio Segrè Visual Archives, CC0 |
| Jean-Jacques Rousseau | No issues found | None | Maurice Quentin de La Tour, 1753, PD |
| Al-Biruni | 1 `RUBRIC_CORRECTION` | curiosity 88→80 | USSR stamp, 1973, PD (editorial_nonlikeness) |
| Hedy Lamarr | No issues found | None | Czech National Digital Library, 1933, PD-anonymous-EU |
| Rosa Parks | No issues found (no row reaches 85+) | None | Library of Congress, 1956, PD-US |
| Ken Saro-Wiwa | No issues found (risk_tolerance 85's own rationale already cites multiple dated instances) | None | Memorial sculpture, CC BY-SA 2.0 (editorial_nonlikeness — no rights-clear personal photo found) |
| Bob Marley | 2 `RUBRIC_CORRECTION`s | risk_tolerance 88→80, persistence 85→78 | New York Amsterdam News, 1976, PD-US |

## Corrections

**Six `RUBRIC_CORRECTION`s across four candidates, all the same violation
type**: a score in the 85+ band whose rationale described one continuous
effort/project/act rather than multiple independent instances, per
`docs/scoring-rubric-v1.md` §4. All six preserve `evidenceType`/
`confidence` unchanged — only the score moved:

- **Norman Borlaug** `persistence` 90→80 (one continuous methodological
  choice — the shuttle-breeding technique) and `achievement_drive` 92→80
  (one continuous work pattern, corroborated by two sources describing
  the same pattern, not separate instances).
- **Marie Tharp** `detail_orientation` 90→80 (one continuous multi-year
  cartographic project).
- **Al-Biruni** `curiosity` 88→80 (one sustained project — Kitab al-Hind
  plus learning Sanskrit for it).
- **Bob Marley** `risk_tolerance` 88→80 (one specific act — performing
  two days after the 1976 assassination attempt) and `persistence` 85→78
  (one continuous multi-year pattern — touring through his 1977-1980
  illness).

Several other 85+ scores were checked and found NOT to be violations
because their rationales cite genuinely separate, independently dated
instances (Earhart's risk_tolerance 90: three named flights; Borges'
independent_thinking 88 and belief_updating 85: three and five dated
episodes respectively; Ken Saro-Wiwa's risk_tolerance 85: multiple
arrests plus trial plus execution; Zaha Hadid's creative_originality 90:
a style demonstrated across a full built career, not one anecdote).

No corrections were needed for the other 8 candidates.

## Metadata

Mechanically checked all 12 candidates' `occupationIds`, `fieldIds`,
`impactDomains`, `tagIds`, `archetypeIds`, `regionCode`, and source
`kind` values against current production vocabularies — 0 invalid
values found among the classification fields themselves. Two live
coverage-guard gaps surfaced by the full test run (not classification
errors, but missing curated-Directory/localization wiring for values
that had never before been used the way this batch uses them):
- `field.architecture` had no EN/KO translation and "architecture" was
  not wired into `PROFESSION_CATEGORIES` — it now qualifies for the
  Directory's profession filter because Zaha Hadid is the second
  production person with that fieldId (after an existing roster10
  architect). Added the translation and added `architecture` to the
  `arts_culture` category, next to `design`.
- `occupation.musician` had no EN/KO translation — Bob Marley is the
  first production person with `"musician"` as `occupationIds[0]`
  (existing musicians in the roster have `"composer"` or another value
  first). Added the translation.

## Portraits

All twelve within the photographic/painted-from-life era; every license
actually opened and verified on Wikimedia Commons. Two candidates
(Al-Biruni, medieval; Ken Saro-Wiwa, no rights-clear personal photo
found) use `editorial_nonlikeness` — a commemorative postage stamp and a
memorial sculpture respectively — per the project's own visual-provenance
fallback convention, honestly labeled as not a likeness rather than
using a dubious or misattributed photo. One candidate file was actually
found on Commons this session after a prior research pass had held it
purely on the portrait blocker (Borges' 1951 Grete Stern photograph, now
properly PD-tagged in Argentina and the US).

## Editorial content

Full EN/KO achievements/moments/turning points for all twelve, drawn only
from each candidate's already-audited evidence — no general-knowledge
exception. Korean display names added for all twelve. Verified via
`editorialCoverageAudit.ts`: 155/155 people have editorial content,
100.0% Korean coverage.

## Promotion

All twelve promoted via `src/dev/roster1000/generateRoster27.ts` — same
architecture as `generateRoster26.ts`.

## Derived-data consistency

`generateRoster27.ts` and `generatePeopleIndex.ts` were run AFTER the
final candidate JSON edit, and a dedicated consistency script compared
every promoted candidate's `score`/`confidence`/`evidenceType`/`impact`/
portrait against the corresponding `SEED_PEOPLE` entry, and recomputed
`evaluateMatchEligibility()` live (never trusting cached
`computedEligibility`): **0 mismatches across all twelve candidates.**

## Match-eligible set

**Zero newly match-eligible people this cycle.** All twelve honestly fail
`evaluateMatchEligibility()` — several clear the raw `coverage >= 0.6`
floor comfortably (Zaha Hadid 0.607, Marie Tharp 0.607, Al-Biruni 0.661,
Hedy Lamarr 0.634, Rosa Parks 0.604, Jean-Jacques Rousseau 0.601) but all
twelve fail the high-confidence-count/average sub-gate — the same
"confidence ceiling" pattern most of these candidates' original
`holdReason`s already described. No candidate was rescued.

## Matching dataset maintenance

**Skipped entirely, correctly**: because zero new people became
match-eligible, `dispersion.generated.ts` was not regenerated,
`calibrate.ts` was not run, and no matching-health simulation was run —
per the project's own rule that this maintenance is needed only when the
match-eligible set actually changes. `eligibility_v2`, the matching
formula, and calibration anchors are all byte-identical to before this
PR.

## Test regression maintenance

- `matching.test.ts`'s two non-eligible skip lists — added all 12
  roster27 slugs (all twelve are non-eligible, unlike roster26 where one
  candidate was match-eligible).
- `profilePublicationSeparation.test.ts`'s Case 4 — counts
  143/142→155/154, `KNOWN_DIVERGENT_SLUGS` extended by all 12, the
  match-eligible-set test updated to state the set is unchanged at 127
  this cycle.
- Two pre-existing, unrelated regression guards
  (`session16Isolation.test.ts`, `session17Isolation.test.ts`) assert
  Jorge Luis Borges' candidate file is frozen at `status: "held"` from an
  earlier diagnostic audit. Updated both to expect `evidence_approved`
  (the legitimate result of this cycle's promotion) while leaving their
  actual substantive guard — the frozen row count and specific row
  values — untouched and still passing, since no row was altered.
- Two genuine, mechanical i18n/taxonomy coverage-guard failures (not
  hardcoded counts): `field.architecture` and `occupation.musician`
  were missing translations/taxonomy wiring — see "Metadata" above.
- Three Playwright specs' hardcoded totals: `miriamMakebaProfileFix.spec.ts`
  and `roster12MarcusAurelius.spec.ts` (142→154 people),
  `peopleDirectory.spec.ts`'s ko-KR cross-facet curiosity+collaboration
  count (143→155 total; the filtered count of 6 is unchanged — three new
  people cross curiosity≥72 alone (Rousseau, Lamarr, Al-Biruni) but none
  score collaboration≥73).

New shared spec `e2e/roster27TwelvePersonFastBatch.spec.ts`: table-driven
across all twelve candidates (86 tests), not twelve near-identical files.

## What did NOT change

- `eligibility_v2`, `ELIGIBILITY_VERSION`, the matching formula,
  calibration anchors, `dispersion.generated.ts`.
- No other candidate JSON, no other person's data, no unrelated UI, no
  package/config file, `.env.local`, or `next-env.d.ts`.
- No `held` candidate outside the frozen twelve was reused; no new
  behavioral source or historical claim introduced (portrait sourcing was
  the only new external research, contributing zero facts to scores or
  editorial content).
- No roster28 work started.

## Final counts

**155 production / 154 default-directory-visible / 127 match-eligible**
(was 143/142/127 — match-eligible count unchanged this cycle). Zheng He,
Giuseppe Garibaldi, Anton Chekhov, the roster25 six, and the roster26 ten
all unchanged.

## Test plan

- [x] `tsc --noEmit` — clean
- [x] `validateCandidates.ts` — 0 errors, 0 warnings (`evidence_approved: 27`, `qa_passed: 93`, `held: 157`)
- [x] `checkScoringLockIntegrity.ts` — 0 flagged (all six `RUBRIC_CORRECTION` labels recognized)
- [x] `vitest run` — **744/744** passed (after the metadata/taxonomy and baseline-count fixes above)
- [x] `i18n-audit.ts` — 100% Korean coverage, 0 missing
- [x] `editorialCoverageAudit.ts` — 155/155 people with editorial content, 100.0% Korean coverage
- [x] `next build --webpack` — clean, static pages for 155 people × 2 locales + baseline
- [x] Focused Playwright — **86/86** (new roster27 spec) + shared Directory/roster12/Makeba specs + **84/84** (person/compare visual specs) — all passed
- [x] Manual EN/KO/mobile browser spot-check against a real production server (Bob Marley, Al-Biruni, Rosa Parks Korean profile, mobile Directory view, "hadid" search result): portraits render with correct attribution, `editorial_nonlikeness` label renders correctly for Al-Biruni, honest non-matching note shows for all twelve, occupation labels render correctly (not raw i18n keys), no horizontal overflow at 375px
- [x] Candidate-vs-production consistency script — 0 mismatches across score/confidence/evidenceType/impact/portrait for all twelve candidates
