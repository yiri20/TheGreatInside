# Adding a person to the roster

Operational runbook, not a research methodology doc — see
`docs/scoring-rubric-v1.md` for how to actually turn evidence into a
trait score (the four fields, confidence discipline, evidence types).
See `CLAUDE.md`'s "Inclusion philosophy" section for whether a candidate
belongs in the dataset at all before scoring anything. This file is the
mechanical, "which command do I run" side, extracted from the frozen
`Roster Research & Scoring Protocol v1` (`docs/archive/session-history/roster-1000-checkpoint.md`
§84 item 18) so it doesn't require reading an 85-section chronological
session log to find.

## The pipeline, end to end

1. **Check the slug doesn't already exist.** Grep `src/data/people/*.ts`
   for the candidate's intended slug/canonical name before doing any
   research — a real past incident (`docs/archive/session-history/roster-1000-checkpoint.md`
   session 18) was catching a slug collision only after starting research
   on a person already in the roster.
2. **Research and score the candidate** using `docs/scoring-rubric-v1.md`'s
   methodology, producing a `data-pipeline/candidates/<slug>.json` file
   matching the `Candidate` shape (`src/dev/roster1000/candidateSchema.ts`).
   Preserve intermediate research artifacts (sources, raw notes, evidence
   ledger) — every past session kept these under
   `src/dev/roster1000/production/session<N>/<slug>/` for auditability,
   not because the pipeline requires the directory to exist at that exact
   path, but because "every score traces to a named, inspectable episode"
   is a hard discipline in this project (see `docs/scoring-rubric-v1.md`).
3. **Run `validateCandidates.ts`** to catch structural errors (missing
   fields, out-of-range scores, taxonomy id typos) before scoring
   proceeds further:
   ```bash
   corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts
   ```
4. **Check `eligibility_v2`** — a candidate needs enough scored attributes,
   average confidence, and coverage to be *match-eligible* (see
   `CLAUDE.md`'s "Seed dataset" section for the exact floors). A candidate
   that fails is still a legitimate addition if you want a browsable,
   non-match-eligible profile (like Zheng He) — just be honest about it,
   never pad scores to force a pass.
5. **Run `checkScoringLockIntegrity.ts`** to confirm no previously-
   committed, already-promoted candidate file was silently edited:
   ```bash
   corepack pnpm@10 exec tsx src/dev/roster1000/checkScoringLockIntegrity.ts
   ```
6. **Write a `generateRosterN.ts` script** promoting the new batch's
   `qa_passed` candidates into a new `src/data/people/rosterN.ts` file.
   Copy the most recent one (`src/dev/roster1000/generateRoster10.ts` as
   of 2026-08) as a template — same pattern every batch has used: an
   explicit slug allowlist (never a blanket "every qa_passed candidate"
   filter, which would silently re-promote an earlier batch too), loads
   from `data-pipeline/candidates/*.json`, renders each person via
   `toPersonSeed()` + `build()`. Run it once:
   ```bash
   corepack pnpm@10 exec tsx src/dev/roster1000/generateRosterN.ts
   ```
7. **Import the new roster file** into `src/data/people/seed.ts`'s
   `SEED_PEOPLE` composition (or wherever the existing `roster2..roster10`
   imports are aggregated — check `seed.ts`'s tail for the exact pattern).
8. **Regenerate the generated people index**:
   ```bash
   corepack pnpm@10 exec tsx src/dev/generatePeopleIndex.ts
   ```
9. **Regenerate dispersion and calibration**, in that order, running the
   calibrator **twice** (first pass writes dispersion, second reports
   percentiles computed with it in effect — see `CLAUDE.md`'s "Calibration
   workflow" section):
   ```bash
   corepack pnpm@10 exec tsx src/dev/calibrate.ts quiz
   corepack pnpm@10 exec tsx src/dev/calibrate.ts quiz
   ```
   Only paste the printed anchor values into
   `MATCH_CALIBRATION_ANCHORS`/`GREATNESS_CALIBRATION_ANCHORS`
   (`src/core/matching/calibration.ts`) if drift is large enough to
   matter — a small roster addition usually shows negligible drift and
   `CALIBRATION_VERSION` correctly stays unbumped. Compare against the
   currently-shipped anchors before deciding.
10. **Re-run the matching-health simulation and sensitivity check**:
    ```bash
    corepack pnpm@10 exec tsx src/dev/simulate.ts 10000 quiz
    corepack pnpm@10 exec tsx src/dev/sensitivity.ts seeds 10000
    ```
    Look at the `#1 match frequency (domination check)` table — no person
    should exceed ~20% at n≥30 match-eligible people (see `CLAUDE.md`'s
    "Known open issues" item 1). If one does, that's a real finding to
    investigate (usually a quiz-instrument issue, not a `matching_v2`
    defect — see `CLAUDE.md`'s "Phase 4"/"Phase 5" for precedent), not
    something to fix by adjusting the new person's scores.
11. **Add Korean display name coverage** — every person needs a
    `person.name.{slug}` entry in `src/core/i18n/ko.ts` (falls back to
    `canonicalName` if missing, but that's a silent gap, not the intended
    state). Also check `occupation.*`/`impact_domain.*` coverage if the
    new person introduces an occupation/impact-domain id not already
    covered — `missingOccupationCoverage()`/`missingImpactDomainCoverage()`
    (`src/core/people/explorer.ts`) are the regression guards; run the
    full test suite to see if either fires.
12. **Run the full verification suite** before considering the batch
    done:
    ```bash
    corepack pnpm@10 exec tsc --noEmit
    corepack pnpm@10 exec vitest run
    corepack pnpm@10 exec next build --webpack
    corepack pnpm@10 exec playwright test
    ```

## What NOT to do

- Don't hand-edit an already-promoted `rosterN.ts` file's scores after the
  fact without going back through the evidence ledger — `roster1000`'s
  own isolation tests (`session*Isolation.test.ts`) exist specifically to
  catch a previously-committed candidate file being silently modified.
- Don't pad a candidate's scores or coverage to force `eligibility_v2` to
  pass. A non-eligible but well-evidenced profile is still a valid,
  browsable addition (see Zheng He).
- Don't skip the dispersion/calibration/simulation regeneration step even
  for a small batch — it's cheap to run and it's the only way to actually
  know whether the new people shifted match-domination or trait weights.
- Don't recalibrate `matching_v2` itself, or change `eligibility_v2`'s
  thresholds, just because a new roster batch produced a result you find
  surprising. Treat a surprising result as a question to investigate
  first (see step 10) — this project's whole history of matching fixes
  (`CLAUDE.md` Phase 0/2/4/5) is "diagnose the actual cause, then fix
  that specific thing," never "adjust the model until the number looks
  right."

## Full precedent and detailed session-by-session history

`docs/archive/session-history/roster-1000-checkpoint.md` — the narrative log every one of the
steps above was distilled from. Useful if you want to see a real worked
example of a specific step (e.g. what an evidence ledger actually looks
like, or how a past `eligibility_v2` near-miss was handled), but you
should not need to read it to perform a routine roster addition.
