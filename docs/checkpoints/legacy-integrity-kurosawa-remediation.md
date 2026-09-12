# Legacy integrity remediation: scoring-lock coverage + Akira Kurosawa (2026-09-12)

Two tightly-related fixes for the one concrete gap the match-pool
integrity audit found
([`match-pool-integrity-post-roster32.md`](match-pool-integrity-post-roster32.md)):
(1) a structural scoring-lock blind spot for every production person who
predates the candidate-JSON pipeline, and (2) a full, source-grounded
re-audit of Akira Kurosawa, the one profile that audit's manual ledger
found had zero per-row rationale on any of its 30 rows. This is **not**
Roster33 — no new-person research was performed, and no other legacy
person's data was touched.

## 1. What triggered this cycle

PR #35's row-classification ledger found that 5 of 16 sampled eligible
people — all from the original `roster1`/`roster2` hand-authored,
pre-candidate-pipeline cohort — had rows with a score/confidence/
evidenceType/impact tuple but **no per-row rationale text anywhere in the
repository**. Akira Kurosawa was the most exposed case: he has zero
`taxonomy_v1.1` addition rows (unlike the other 4), so literally all 30
of his original rows fell into `unsupported_from_available_provenance`.
Separately, that audit found this same 34-person hand-authored cohort
(35 including the non-eligible Zheng He) has no `data-pipeline/
candidates/*.json` file, making it invisible to
`checkScoringLockIntegrity.ts`'s existing drift guard.

## 2. Mechanical enumeration of the legacy lock gap

Computed fresh (not hardcoded) via `matchPoolIntegrityAudit.ts`'s
`hasCandidateFile()` against live `SEED_PEOPLE`, **before** this cycle's
changes:

**35 production people had no candidate JSON** (34 match-eligible + 1
non-eligible, Zheng He) — the full roster1/roster2 hand-authored cohort.
This is the same 34-person match-eligible list PR #35 already named, plus
Zheng He (`isDirectoryVisible: false`, `isMatchEligible: false`,
18 scored attributes — already known and intentional, not a new finding).

After this cycle (Akira Kurosawa now has a real candidate file): **34
people remain in this state** — see §9 for the full remaining list. This
is expected and disclosed, not swept under the rug: this cycle
deliberately remediated exactly one profile, not the whole cohort (§4).

## 3. Legacy scoring-lock design

Extended the existing `checkScoringLockIntegrity.ts` (which diffs
candidate JSON files against HEAD) with a second, independent check for
people who have no JSON file to diff:

- **`src/dev/roster1000/audits/legacyScoringLock.generated.ts`**
  (generated, committed): a fingerprint baseline —
  `Record<slug, { attributeId, score, confidence, evidenceType, impact }[]>`
  — for every production person currently lacking a candidate JSON file,
  snapshotted as of the commit that generated it.
- **`src/dev/roster1000/audits/generateLegacyScoringLock.ts`**: the small,
  reusable regenerator. Must be re-run and its output re-committed in the
  **same PR** that documents an intentional change to one of these
  people — exactly the discipline already used for JSON-backed
  candidates' `provenance.notes`.
- **`checkScoringLockIntegrity.ts`** (extended, not replaced): its
  existing JSON-diff logic is untouched; a new exported
  `checkLegacyScoringLock()` compares the committed baseline against the
  CURRENT built `SEED_PEOPLE` and flags `row_added` / `row_removed` /
  `row_drifted` (score, confidence, evidenceType, or impact) /
  `missing_from_production`. Both checks now run from the one existing
  command: `corepack pnpm@10 exec tsx src/dev/roster1000/
  checkScoringLockIntegrity.ts`.

This is an accidental-drift guard, not a claim that row-level rationale
now exists for the other 34 people — it only prevents their existing,
already-recorded numbers from silently changing unnoticed.
[`legacyScoringLock.test.ts`](../../src/dev/roster1000/legacyScoringLock.test.ts)
(14 tests) proves coverage, no duplicates/orphans, and that score/
confidence/evidenceType/impact/added/removed drift are each independently
detected, using a synthetic baseline/person pair so the real data is
never touched by the tests themselves.

## 4. Frozen remediation target

**Akira Kurosawa only** — the one profile PR #35's audit concretely
flagged. No other legacy person was researched, scored, or modified this
cycle.

## 5. Research (new evidence explicitly authorized for Kurosawa only)

9 sources total (8 non-Wikipedia), meeting the required mix: at least 2
independent provenance perspectives, at least 1 non-Wikipedia source with
substantial behavioral detail, primary writing where available, and
reputable biography/institutional material:

1. Akira Kurosawa, *Something Like an Autobiography* (trans. Audie E.
   Bock, Vintage, 1983) — his own memoir (primary).
2. Donald Richie, *The Films of Akira Kurosawa* (UC Press, 3rd ed. 1996)
   — independent academic study with direct Kurosawa quotes from
   Richie's own conversations with him.
3. Stuart Galbraith IV, *The Emperor and the Wolf* (Faber and Faber,
   2002) — independent dual biography, 800pp, original interviews with 6
   named collaborators.
4. Shinobu Hashimoto, *Compound Cinematics: Akira Kurosawa and I*
   (Vertical, Inc.) — firsthand memoir by one of his core rotating
   screenwriters (primary, a direct collaborator's own account).
5. Teruyo Nogami, *Waiting on the Weather: Making Movies with Akira
   Kurosawa* (Stone Bridge Press, 2006; foreword by Donald Richie) —
   firsthand memoir by his script supervisor/production manager across
   19 films, 1950-1993.
6. The Criterion Collection — production/rehearsal-method material
   (institutional).
7. Multiply-corroborated press/institutional accounts of the March 1979
   Kagemusha recasting (TCM, BFI Southbank programme notes, IMDb trivia).
8. Secondary compilation of his 1936-1941 PCL apprenticeship under Kajiro
   Yamamoto (Britannica; akirakurosawa.info).
9. Wikipedia — orientation only.

Identity re-verified live against Wikidata **Q8006** before any research
began (previously absent from his production record entirely — a real
gap this cycle also closed).

Research followed a fixed budget (~2-3 hours, 4-7 sources target — met at
9, several genuinely substantive) and direct/sequential browsing
(max 2 concurrent lookups; no rate-limit incident this cycle). Eligibility
was **never** consulted during research and did not drive when research
stopped.

## 6. Evidence ledger (incidents actually used)

| incident | source(s) | firsthand? | independence |
|---|---|---|---|
| Competitive multi-writer screenplay method (~1948-1965): writers independently draft the same scene, Kurosawa picks the best, explicitly to check any one writer's dominance | Hashimoto (own memoir) | Yes (participant) | Corroborated by general film scholarship |
| Full costume/makeup rehearsals built up before filming, covering camera/lighting in advance | Criterion (Muraki's account) | No (institutional secondary) | Single named channel |
| Daily one-page writing habit during apprenticeship | Secondary biographical compilation | No | Single source, moderate confidence only |
| Kagemusha recasting (March 1979): Katsu's own camera/crew, refused to remove it, fired on day one | TCM, BFI, IMDb trivia; referenced in a review of Nogami's memoir | No (production-history) | 3+ independent outlets |
| Nogami: "the sole person with whom Kurosawa never lost his temper and who he never criticised" (1950-1993, 19 films) | Nogami's own memoir AND Richie's foreword to it | Yes (Nogami) | 2 independent named authorities |
| Yamamoto required a vow not to lose his temper with other crews (1936-1941) | Secondary biographical compilation | No | Single source, moderate confidence |
| 5-year PCL assistant-director apprenticeship under Yamamoto (1936-1941) | Britannica; general film-historical accounts | No | Multiply corroborated |

Two real biographical facts were deliberately **excluded** from all
scoring, per this project's standing precedent against inferring
personality from tragedy or private health crises (the same discipline
already applied to Virginia Woolf's file): his brother Heigo's 1933
suicide, and Kurosawa's own December 1971 suicide attempt (already
reflected, appropriately, only in pre-existing non-trait editorial
content).

## 7. Disposition of all 30 original rows

| disposition | count | rows |
|---|---|---|
| Retained, rescored from new evidence | 10 | analytical_rigor, creative_originality, detail_orientation, discipline, decisiveness, autonomy_need, leadership_drive, collaboration, conflict_tolerance, mastery_orientation |
| Removed — no individually-attributable behavioral support found this cycle | 20 | achievement_drive, adaptability, aesthetic_sensitivity, ambiguity_tolerance, competitiveness, cross_domain_range, curiosity, deep_focus, execution_speed, experimentation, impact_motivation, independent_thinking, intuitive_synthesis, perfectionism, persistence, persuasiveness, planning_orientation, risk_tolerance, social_assertiveness, systems_abstraction |

None of the 10 retained rows reuse the old values — each was rescored
directly from the cited evidence. `aesthetic_sensitivity` in particular
was deliberately **not** retained despite his undisputed critical
reputation: this cycle declined to treat film acclaim/awards as
personality evidence without a specific behavioral anecdote, per this
project's own rubric discipline. This is a disclosed limitation of this
cycle's research, not a claim the trait is false — a future cycle with a
targeted visual-composition-anecdote source could revisit it.

Score/confidence/evidenceType/impact changes: all 10 retained rows
changed on all 4 fields (full rescore, not a patch) since the entire
per-row rationale is new; the 20 removed rows are deletions, not
modifications. No row was invented or adjusted after seeing the
eligibility result (see §8's ordering).

## 8. Publication decision — before eligibility

Sources, ledger, rows, scores, confidence, evidenceType, impact, and the
publication decision (`evidence_approved`) were frozen in
[`data-pipeline/candidates/akira-kurosawa.json`](../../data-pipeline/candidates/akira-kurosawa.json)
**before** `eligibility_v2` was computed. `evaluateMatchEligibility()` was
then run once:

| | before (original 30 rows) | after (10 rescored rows) |
|---|---|---|
| scored attributes | 30 | 10 |
| coverage | 0.883 | 0.295 |
| high-confidence count | 27 | 10 |
| high-confidence average | 0.643 | 0.560 |
| eligible | **true** | **false** |

3 of 4 `eligibility_v2` criteria now fail (breadth, coverage,
high-confidence count); only the high-confidence-average sub-gate still
passes. No row was adjusted after seeing this result — the "would I make
this exact correction if match eligibility didn't exist" test was applied
to every row before eligibility was ever computed.

## 9. Production update

`src/data/people/roster2.ts`'s existing Kurosawa entry was edited in
place (same `id`, `slug`, position in the array, portrait, and Korean
display name — no duplicate person created) to mirror the audited
candidate exactly: new `sources`, new `rows` (10, with full per-row
rationale comments matching the candidate file), an explicit
`directoryVisible: true` override (without it, `build()`'s fallback would
have mirrored the new `isMatchEligible: false` and silently pulled this
publication-safe profile out of the Directory too — caught by this
cycle's own new consistency test before it shipped), and a newly-added
`externalIdentity: { wikidataId: "Q8006" }` (previously absent — a real
gap this cycle closed, also caught by its own test before it shipped).
[`akiraKurosawaRemediation.test.ts`](../../src/dev/roster1000/audits/akiraKurosawaRemediation.test.ts)
(10 tests) proves candidate-to-production consistency field-by-field, the
publication/match separation, the exact eligibility numbers, and no
duplicate id/slug/QID.

## 10. Match pool and interest-area impact

| | before | after |
|---|---|---|
| production | 225 | 225 |
| directory-visible | 224 | 224 |
| match-eligible | **127** | **126** |

Match-eligible dropped by exactly one (Kurosawa); no other person's
eligibility changed — mechanically confirmed via the full test suite
(811/811 passing) and `checkLegacyScoringLock()`/`checkScoringLockIntegrity.ts`
(0 flagged). Since the match-eligible **set** changed, all downstream
effects were checked once:

- **Interest-area pools** (recomputed against the live match-eligible
  set): science_knowledge 53, arts_culture 49, leadership_society 44,
  building_discovery 19 — **all four unchanged**. Kurosawa's fieldIds
  (`film`, arts_culture) never carried him into any pool while eligible
  or excluded from one now; the pool counts were never sensitive to his
  membership specifically.
- **Dispersion / calibration / matching-health**: not regenerated. The
  match-eligible *set* shrank by one already-scored person leaving
  entirely (not a rescored person shifting within the set), and the
  project's own precedent (e.g. Roster17's von Neumann reversion) is that
  removing a person from the eligible set on integrity grounds does not
  by itself require a full recalibration pass — confirmed proportionate
  here given the full matching test suite (including the
  rank-#1-for-every-eligible-person invariant) still passes unmodified
  against the new 126-person set.

## 11. Editorial

Audited the existing EN/KO editorial
([`src/core/i18n/editorial.ts`](../../src/core/i18n/editorial.ts),
`akira-kurosawa.*` keys) against the final evidence. No change was
needed: none of its achievement/moment/turning-point/life-arc/legacy text
references a removed row, and everything it states (Rashomon's Golden
Lion, Seven Samurai's production, the Most Beautiful factory immersion,
the Tora! Tora! Tora! firing, the 1971 attempt, Kagemusha/Ran/the
Academy Honorary Award) remains accurate and is, if anything, reinforced
by this cycle's new research rather than contradicted by it. This
editorial entry also predates the `interpretationKey`/`attributeId`
linking convention (no moment cites a specific trait row), so removing 20
rows created no dangling reference to begin with.

## 12. Validation

`tsc --noEmit` clean · `validateCandidates.ts` 0 errors/0 warnings across
278 candidate files · `checkScoringLockIntegrity.ts` 0 flagged (277
JSON-diff-checked + 34 legacy-baseline-checked) · full `vitest run`
811/811 passing (58 files, including this cycle's 3 new/extended test
files) · production build clean (474 static pages) · focused Playwright
(`peopleDirectory.spec.ts`, `person.visual.spec.ts`,
`compare.visual.spec.ts`) 118/118 passing.

**Manual verification** (production build via `next start`, not `next
dev` — see note below): EN and KO profile pages both render the correct
10 traits with the honest "not yet included in personality matching"
message; Wikidata link present; portrait renders correctly at mobile
width; Compare page shows the correct "isn't included in matching yet"
honest-copy path; Directory listing (224 people) includes him.

**Tooling note, not a defect**: this cycle's `next dev` (webpack dev
mode) intermittently served stale pre-remediation data for this route
even after a full `.next` cache clear and process restart, while `next
build` + `next start` (and the full Playwright suite, which builds
before running) consistently and correctly reflected the new data from
the first request. Root cause not identified; noted here in case a future
session hits the same symptom on this route.

## 13. Known remaining legacy provenance gaps (unaudited, not defective)

34 production people still have no candidate JSON and are covered only
by the new accidental-drift guard, not by row-level rationale:

```
leonardo-da-vinci, marie-curie, richard-feynman, ada-lovelace, steve-jobs,
hayao-miyazaki, yi-sun-sin, frida-kahlo, serena-williams, alan-turing,
wolfgang-amadeus-mozart, ludwig-van-beethoven, nelson-mandela,
mahatma-gandhi, confucius, socrates, warren-buffett, coco-chanel,
nikola-tesla, rosalind-franklin, jane-goodall, genghis-khan, ibn-khaldun,
wangari-maathai, malala-yousafzai, bruce-lee, srinivasa-ramanujan,
toni-morrison, benjamin-franklin, rumi, oprah-winfrey, simone-biles,
yayoi-kusama, zheng-he
```

**This is not a claim any of them are defective.** PR #35's own sample
found Ada Lovelace's, Alan Turing's, and Benjamin Franklin's
`taxonomy_v1.1` addition rows well-supported, and Confucius's thinness
was already honestly confidence-capped by its original author. Kurosawa
was singled out because he was the one CONCRETE case this project's own
audit tooling actually flagged (zero rationale on any row, not just some)
— the other 34 are unaudited, not proven either way. Future remediation
of any of them should follow this same pattern: freeze the publication
decision before computing eligibility, and regenerate
`legacyScoringLock.generated.ts` in the same PR.

## 14. Explicit confirmations

- No eligibility rescue: Kurosawa's new rows were scored from evidence
  alone; the eligibility computation happened only after the file was
  frozen (§8).
- Only Kurosawa received new behavioral research this cycle.
- No other legacy person's data was read, scored, or modified.
- Roster33 not started.
