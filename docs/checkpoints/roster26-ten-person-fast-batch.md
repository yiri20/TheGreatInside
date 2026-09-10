# Roster-26: Ten-Person Fast Production Batch

Branch: `feat/roster26-ten-person-fast-batch` (worktree:
`C:\Users\Lenovo\TheGreatInside-roster26-ten-person-fast-batch`, created
from `origin/main` at `f5fbd4fe64b2a5213b35047c5735630bf1b52f0d`).

## Why this cycle exists

Throughput. A fixed ten-candidate intake, mechanically selected from
`data-pipeline/candidates/*.json` only — no new candidate discovery, no
new behavioral research. Not an eligibility-rescue cycle:
`eligibility_v2` was not touched, and no row was added anywhere.

## Intake selection

Inventory: 277 candidate JSON files. 133 already in production. Of the
144 not in production: 1 `qa_passed` (Che Guevara), 0 `evidence_approved`,
18 `held` for evidence-integrity reasons (excluded), 1 unscored
(`sitting-bull`, excluded), and 159 legitimately `held` on eligibility
metrics alone. Frozen the qa_passed candidate plus the 9 richest
eligibility-held candidates by documented-row count / scoredAttributeCount
/ coverage:

| # | Candidate | Prior status | scoredAttributeCount | coverage |
|---|---|---|---|---|
| 1 | Che Guevara | qa_passed | 21 | 0.625 |
| 2 | Fidel Castro | held (eligibility) | 20 | 0.599 |
| 3 | Jawaharlal Nehru | held (eligibility) | 20 | 0.599 |
| 4 | Ho Chi Minh | held (eligibility) | 18 | 0.549 |
| 5 | Salvador Allende | held (eligibility) | 19 | 0.569 |
| 6 | Corazon Aquino | held (eligibility) | 18 | 0.539 |
| 7 | Muhammad Ali Jinnah | held (eligibility) | 18 | 0.533 |
| 8 | Nawal El Saadawi | held (eligibility) | 18 | 0.545 |
| 9 | Puyi | held (eligibility) | 18 | 0.545 |
| 10 | King Hussein of Jordan | held (eligibility) | 18 | 0.543 |

Frozen once selected — no substitution, no 11th candidate, no new
discovery.

## Audit and disposition

| Candidate | Audit result | Publication | Match eligible | Corrections | Portrait |
|---|---|---|---|---|---|
| Che Guevara | No issues found (risk_tolerance 90 rests on 4 genuinely independent documented episodes 1952-1967, satisfying §4's multi-instance bar) | `qa_passed` (preserved) | **true** (pre-existing) | None | René Burri, 1963, PD-US-not-renewed |
| Fidel Castro | 1 `RUBRIC_CORRECTION` (`persistence` 85→80) | `evidence_approved` | false | 1 score-band correction | Bernard Gotfryd/LOC, 1979, no known restrictions |
| Jawaharlal Nehru | No issues found | `evidence_approved` | false | None | Harry Pot/Nationaal Archief, 1957, CC0 |
| Ho Chi Minh | No issues found | `evidence_approved` | false | None | Unknown, c.1947, PD-Vietnam/PD-US |
| Salvador Allende | 1 `RUBRIC_CORRECTION` (`risk_tolerance` 88→80) | `evidence_approved` | false | 1 score-band correction | Biblioteca del Congreso Nacional de Chile, CC BY 3.0 CL |
| Corazon Aquino | No issues found | `evidence_approved` | false | None | Gerald B. Johnson/USAF, 1986, PD-USGov |
| Muhammad Ali Jinnah | No issues found | `evidence_approved` | false | None | Unknown, 1945, PD-Pakistan/PD-US |
| Nawal El Saadawi | No issues found (portrait sourcing rejected one candidate file with an implausible "own work" CC0 claim over a likely NYT photo) | `evidence_approved` | false | None | Gigi Ibrahim, 2012, CC BY 2.0 (Flickr-reviewed) |
| Puyi | No issues found | `evidence_approved` | false | None | Unknown, Manchukuo period, PD-China/Taiwan (age-expired) |
| King Hussein of Jordan | No issues found | `evidence_approved` | false | None | Helene C. Stikkel/DoD, 1997, PD-USGov |

## Corrections

**Two `RUBRIC_CORRECTION`s, both the same violation type, both SCORE-BAND
corrections only**: a single-instance score had drifted into the 85+
("extreme") band, which `docs/scoring-rubric-v1.md` §4 reserves for
*multiple independent documented instances*. Both rest on one dramatic,
well-corroborated instance rather than a repeated pattern:

- **Fidel Castro `persistence`**: 85→**80**. Rationale described the
  single Sierra Maestra recovery arc (near-total defeat at Alegría de Pío
  → 1959 victory) — one continuous instance, however multi-year and
  well-corroborated, not multiple independent episodes. (His
  `risk_tolerance` row, also 85, was checked and is NOT a violation — its
  rationale cites three genuinely separate episodes: Moncada 1953, Granma
  1956, the guerrilla campaign.)
- **Salvador Allende `risk_tolerance`**: 88→**80**. Rationale explicitly
  described "a... final documented act" (singular) — remaining in La
  Moneda Palace during the 1973 coup. One instance, corroborated by
  multiple sources (his own broadcast, international press), but still
  one instance, not multiple.

Confidence and evidenceType are **unchanged** in both cases (documented,
0.72 and 0.75 respectively) — both values already sit in §3's 0.65-0.84
band for "one strong documented instance," so the evidence classification
itself was never wrong, only the score band. Neither correction reads
eligibility (both candidates remain held on `coverage` before and after —
the score change doesn't touch `scoredAttributeCount`, `averageConfidence`,
or `coverage`).

No corrections were needed for the other 8 candidates — mechanical row
review found no other unsupported extremity, no semantic mismatch, and no
evidenceType/confidence inconsistency.

## Metadata

All ten candidates' `occupationIds`, `fieldIds`, `impactDomains`,
`tagIds`, `archetypeIds`, `regionCode`, and source `kind` values were
mechanically checked against current production vocabularies
(`IMPACT_DOMAINS`, `ARCHETYPE_IDS`, `PersonSource.kind` in
`src/core/types.ts`/`archetypes.ts`, and existing usage across
`src/data/people/*.ts`) — all already valid, already-used values. No
metadata corrections were needed this cycle. (Ho Chi Minh and Corazon
Aquino's `regionCode: "south_asia"` is this project's established
Southeast-Asia-folding convention, matching Jose Rizal/Lee Kuan
Yew/Kartini precedent, not an error.)

## Portraits

All ten are within the photographic era; every license was actually
opened and verified on Wikimedia Commons (full details in the table
above). One rejected candidate is worth recording: Nawal El Saadawi's
Wikipedia infobox image (`Merlin_...-superJumbo.jpg`) carries filename
and caption artifacts consistent with an uncredited New York Times
photograph re-uploaded under a self-declared "own work" CC0 claim —
treated as not genuinely rights-clear and replaced with a
Flickr-reviewed CC BY 2.0 photograph with verified provenance
(Gigi Ibrahim, 2012).

## Editorial content

Full EN/KO achievements/moments/turning points for all ten, drawn only
from each candidate's already-audited evidence corpus — no
general-knowledge exception, no new historical claims from portrait
research. Korean display names added for all ten
(`docs/context/README.md`'s `person.name.*` convention). Verified via
`editorialCoverageAudit.ts`: 143/143 people have editorial content,
100.0% Korean coverage.

## Promotion

All ten promoted via `src/dev/roster1000/generateRoster26.ts` — same
architecture as `generateRoster25.ts`: explicit literal slug allowlist,
`preparePersonSeedForPromotion()` (never `toPersonSeed()` directly, never
checks `computedEligibility.eligible`), default `directoryVisible: true`,
`build()` computes `isMatchEligible` independently.

## Derived-data consistency

Per the CRITICAL DERIVED-DATA RULE (roster25 exposed a real gap here — a
candidate JSON was corrected but the generated roster file wasn't
regenerated). `generateRoster26.ts` and `generatePeopleIndex.ts` were run
AFTER the final candidate JSON edit, and a dedicated consistency script
compared every promoted candidate's `score`/`confidence`/`evidenceType`/
`impact`/metadata/portrait/`directoryVisible` against the corresponding
`SEED_PEOPLE` entry: **0 mismatches across all ten candidates.**

## Match-eligible set

Computed live via `evaluateMatchEligibility()` against the built
`roster26.ts` (never trusted from cached `computedEligibility` snapshots):
only **Che Guevara** is match-eligible (`eligible: true`, coverage 0.625).
All nine others are `eligible: false`, each honestly short on `coverage`
(0.53-0.60, all below the 0.6 floor) — verified directly, not inferred.

## Matching dataset maintenance

Because Che Guevara joined the match-eligible set:

1. `dispersion.generated.ts` regenerated once (`pnpm calibrate`, run
   twice — first writes dispersion, second reports percentiles under the
   new dispersion).
2. Proposed MATCH anchors vs. shipped: max drift 0.0056 absolute (at
   p99.9). Proposed GREATNESS anchors vs. shipped: max drift 0.0073
   absolute (at p0.1, the thinnest-populated bin). Both negligible for a
   1-person match-eligible growth, consistent with roster25's own
   ≤0.006 precedent — **anchors left unchanged**, `CALIBRATION_VERSION`
   unbumped.
3. One matching-health simulation (n=143, 2000 profiles): max #1-match
   frequency is Warren Buffett at 9.0%, well under the domination
   threshold; Che Guevara integrates without dominating.

## Test regression maintenance

Adding ten more people (nine more whose `isDirectoryVisible` diverges
from `isMatchEligible`) required the same class of baseline-count updates
roster24/25 established:

- `matching.test.ts`'s two non-eligible skip lists (both
  `evaluateMatchEligibility` corpus tests) — added the nine roster26
  non-eligible slugs.
- `profilePublicationSeparation.test.ts`'s Case 4 — counts 133/132→143/142,
  match-eligible 126→127, `KNOWN_DIVERGENT_SLUGS` extended by nine,
  "the match-eligible set grew by exactly ___" test now names Che Guevara.
- Three Playwright specs' hardcoded totals: `miriamMakebaProfileFix.spec.ts`
  and `roster12MarcusAurelius.spec.ts` (132→142 people), `peopleDirectory.spec.ts`'s
  ko-KR cross-facet curiosity+collaboration count (133→143 total; the
  filtered count of 6 is unchanged — none of the ten new people cross
  both the curiosity≥72 and collaboration≥73 z-score thresholds
  simultaneously; closest are Nehru, curiosity 74 but collaboration only
  68, and Puyi, curiosity 70, just under the threshold).

New shared spec `e2e/roster26TenPersonFastBatch.spec.ts`: table-driven
across all ten candidates (112 tests), not ten near-identical files.

## What did NOT change

- `eligibility_v2`, `ELIGIBILITY_VERSION`, the matching formula,
  calibration anchors (`calibration.ts`/`greatness.ts` — evaluated, left
  untouched).
- No other candidate JSON, no other person's data, no unrelated UI, no
  package/config file, `.env.local`, or `next-env.d.ts`.
- No `held` candidate outside the frozen ten was reused; no new
  behavioral source or historical claim introduced (portrait sourcing was
  the only new external research, contributing zero facts to scores or
  editorial content).
- No roster27 work started.

## Final counts

**143 production / 142 default-directory-visible / 127 match-eligible**
(was 133/132/126). Zheng He, Giuseppe Garibaldi, Anton Chekhov, and the
roster25 six (Nellie Bly, Carl Jung, Vera Rubin, Subrahmanyan
Chandrasekhar, Fridtjof Nansen, Isabella Bird) all unchanged.

## Test plan

- [x] `tsc --noEmit` — clean
- [x] `validateCandidates.ts` — 0 errors, 0 warnings (`evidence_approved: 15`, `qa_passed: 93`, `held: 169`)
- [x] `checkScoringLockIntegrity.ts` — 0 flagged (both `RUBRIC_CORRECTION` labels recognized)
- [x] `vitest run` — **744/744** passed (after the baseline-count updates above)
- [x] `i18n-audit.ts` — 100% Korean coverage, 0 missing
- [x] `editorialCoverageAudit.ts` — 143/143 people with editorial content, 100.0% Korean coverage
- [x] `next build --webpack` — clean, **310 static pages** (24 baseline + 143 people × 2 locales)
- [x] Focused Playwright — **112/112** (new `roster26TenPersonFastBatch.spec.ts`) + **30/30** (`peopleDirectory.spec.ts`) + **5/5** (`roster12MarcusAurelius.spec.ts`) + **5/5** (`miriamMakebaProfileFix.spec.ts`) + **84/84** (`person.visual.spec.ts` + `compare.visual.spec.ts`) — all passed
- [x] Manual EN/KO browser spot-check against a real production server (Che Guevara, Fidel Castro, King Hussein of Jordan): portraits render with correct attribution, honest non-matching note shows only for the nine non-eligible people, normal "Take the Quiz to Compare" CTA shows for Che Guevara, no raw i18n keys, mobile viewport (375px) shows no horizontal overflow
- [x] Candidate-vs-production consistency script — 0 mismatches across score/confidence/evidenceType/impact/metadata/portrait/directoryVisible for all ten candidates
