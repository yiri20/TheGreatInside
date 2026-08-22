# Matching, scoring, and greatness — reference

Durable formulas and invariants. This is orientation, not a tutorial —
the file headers in `src/core/matching/similarity.ts` and
`src/core/greatness/*.ts` are the primary source of truth; this is a
compact map to them. **No change to anything in this file happens
without quantitative evidence (simulation + sensitivity analysis) — see
`docs/context/TESTING.md`.**

## The one absolute rule

**Zero generative AI calls in the user-facing request path.** Quiz →
vector → deterministic comparison → ranked matches → rule-based
interpretation. Every number a user sees is reproducible by hand from
their answers. No `AIProvider` may be a dependency of anything in
`src/core`.

## Scoring — `scoring_v1` (`src/core/quiz/scoring.ts`)

```
avg_a   = Σ(direction · weight) / Σ(weight)      over items loading on a
score_a = clamp(0, 100, 50 + GAIN · 50 · avg_a)   GAIN = 1.25
conf_a  = clamp(0.2, 1, Σweight / 2.5)
```

Unanswered attributes get 50 at floor confidence — an unmeasured trait
contributes almost nothing to matching, rather than faking a real 50.

## Matching — `matching_v2` (`src/core/matching/similarity.ts`)

```
level_i    = weighted mean score, each side
scatter_i  = weighted RMS deviation from own level, each side
pattern_i  = each side's deviation ÷ its OWN scatter (floored)   — direction only
raw = 1 − √( 0.5·patternTerm + 0.2·scatterTerm + 0.3·levelTerm )
```
then coverage-shrunk toward `NEUTRAL_RAW_SIMILARITY = 0.45` proportional
to how much of the taxonomy was actually scored. Euclidean, not
cosine/Manhattan (magnitude matters; one big gap ≠ several small ones).

**Never inputs**: nationality, region, gender, era, wealth, fame,
occupation, popularity, locale. Enforced by tests mutating each field
and asserting the score is byte-identical.

**#1-domination invariant**: no person should exceed ~20% #1-match
frequency at n≥30 simulated profiles. Currently ~12.0% (Warren Buffett),
stable. If this is ever exceeded, treat it as a quiz-instrument question
first (check `oneSidedShare`/`meanDiff` in `trait-diagnostic.ts`), not an
automatic `matching_v2` defect — this project's own history (Phase 4/5)
found the quiz instrument, not the formula, was the cause every time.

## Discriminative weighting — `dispersion_v1`

```
discriminative_i = clamp(0.55, 1.6, 0.5 + 0.5 · sd_i / meanSd)
```

A **frozen, committed snapshot** (`dispersion.generated.ts`) — never
computed live. Regenerate deliberately via `pnpm calibrate`, run twice
(first pass writes the table, second reports percentiles with it in
effect).

## Calibration — `calibration_v3`

Raw similarity is never displayed. Monotone piecewise-linear anchors map
raw → percentage. `calibrateMatch(1) === 99`, never 100 — these profiles
are inferred, not certain.

## Eligibility — `eligibility_v2`

`scored >= 18` AND `coverage >= 0.6` AND a high-confidence subset
(`confidence >= 0.5`) with `count >= 12` and `avgConf >= 0.55`. See
[`docs/checkpoints/roster.md`](../checkpoints/roster.md) for current
roster numbers under this rule.

## Greatness Potential — `greatness_v1` (`src/core/greatness/`)

Entertainment-oriented, never a probability (no control group exists).
Displayed as `N / 100`, never a percentage.

```
raw = 0.50·A + 0.22·D + 0.13·C + 0.15·E
```
A = archetype affinity, D = distinctiveness (capped, extremity
plateaus), C = coherence (penalizes claiming both sides of a tension
pair), E = engine traits. **Never an average of trait scores** — that
would encode "higher is always better," which is false. An all-100s
profile scores *below* a coherent, pattern-shaped one (tested).

## Historical result fidelity (Phase 10C)

A saved/signed-in result is an **immutable snapshot**
(`ResultSnapshotV1`), computed once at save time and never recomputed —
chosen over "keep replaying old formulas forever" because it only needs
one result to survive intact, not the whole engine to stay replayable.
`personDataFingerprint()` + an 11-field `VersionSnapshot` (quiz/scoring/
taxonomy/greatness/matching/calibration/reference/dispersion/archetypes/
interpretation/eligibility versions) detect drift between anonymous
completion and later claim-time save; any mismatch blocks the save
rather than silently showing a different number under "your result."

## Anti-fabrication invariant (roster/person data)

`is_match_eligible` is computed, never hand-set. Every person score
carries `confidence` + `evidenceType` + sources. Never boost famous
people or force scores above a threshold — a low top match is framed as
a *Distinctive Profile*, not padded. See
[`docs/scoring-rubric-v1.md`](../scoring-rubric-v1.md) for the full
evidence discipline.

## Known open issues worth knowing before touching this area

- Several attributes (`collaboration` especially) retain residual
  one-sided measurement bias in the quiz instrument — tracked, not a
  blocker, monitor via `trait-diagnostic.ts`.
- Several match-eligible people rarely/never win #1 at current roster
  size — expected at this scale, not evidence of a defect on its own.
- `conflict_tolerance` and 7 other attributes lack authored
  deterministic tradeoff copy (`dontcopy.tradeoff.*`) — falls back to a
  generic sentence, correct current behavior, not a bug.
