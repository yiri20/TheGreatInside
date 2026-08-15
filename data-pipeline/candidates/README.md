# Roster-1000 candidate staging

One JSON file per candidate, named `<slug>.json`, validated against
`src/dev/roster1000/candidateSchema.ts`'s `Candidate` type. This directory
holds **pipeline staging data**, never real, committed people — nothing
here is imported by application code (`app/`, `src/core`, `src/data/people`)
or shipped to users. Compare against `src/data/people/seed.ts`/`roster2.ts`,
the real, committed roster.

## Why one file per candidate

- **Git-diffable.** A change to one candidate touches exactly one file; a
  shared array file would make every edit a noisy diff against unrelated
  candidates and invite merge conflicts.
- **Resumable.** Any candidate can be re-opened, re-scored, or re-reviewed
  independently of the others — a session can stop after any candidate and
  a future session picks up exactly where it left off, per-file.
- **No giant monolith.** At 1,000 candidates this is 1,000 small files, not
  one file a text editor or diff tool struggles with.

## Workflow

1. Create `<slug>.json` with `status: "draft"` and whatever identity fields
   are already known (name, birth/death years, region, occupation).
2. Research sources, fill in `sources`, move to `status: "researching"`.
3. Score attributes into `rows` following `docs/scoring-rubric-v1.md`
   exactly — every row needs a concise `rationale` (evidence audit trail,
   never chain-of-thought). Move to `status: "scored"` once every
   confidently-supportable attribute is filled in (not necessarily all 34
   — thin ancient/medieval evidence is expected and fine, per the rubric's
   own evidence-discipline exception).
4. Add `localization.displayNames["ko-KR"]` and move to `status:
   "localized"`.
5. Research and record portrait status (`portrait.status`:
   `"found"` / `"held"` / `"rejected"` / `"not_available"`) — see Part 17 of
   the roster-1000 brief and `docs/roster-1000-checkpoint.md` §7 for the
   sourcing/verification discipline. Move to `status: "portrait_pending"`
   once attempted (portrait absence never blocks a candidate — most real
   people in this roster have none, and that's the expected, non-degraded
   state).
6. Run the validator:
   ```bash
   corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts
   ```
   It checks structural validity, that `regionCode`/`tagIds` are drawn from
   the real, live `region.*`/`tag.*` i18n vocabularies (never a hardcoded
   duplicate — always in sync with `src/core/i18n/en.ts`), and runs the
   candidate through the exact same `build()` → `evaluateMatchEligibility()`
   → `runRosterQualityGates()` pipeline a real committed person goes
   through. Move to `status: "qa_passed"` once it reports zero errors.
7. If a candidate cannot clear the evidence bar (fewer than 18 confidently
   scoreable attributes, average confidence below 0.55, or a genuine
   `inclusion_v1` counterfactual-test failure — see `CLAUDE.md`'s
   "Inclusion philosophy" section), set `status: "held"` with a
   `holdReason`, or `status: "rejected"` with a `rejectReason`. Never
   weaken the rubric to force a pass.
8. Only once `qa_passed`: use `toPersonSeed()` (`candidateSchema.ts`) to
   convert the candidate into the `PersonSeed` shape `builder.ts` expects,
   add it to a new roster file (`src/data/people/roster3.ts`, following
   `roster2.ts`'s existing pattern — inline `//` comments carrying the same
   rationale text that lived in `rows.*.rationale`), regenerate
   `peopleIndex.generated.ts`, and set `status: "committed"` on the
   candidate file (kept for provenance/history, not deleted).

## What's NOT here

- Raw downloaded source HTML/text used only transiently during research —
  if you cache anything like that locally, keep it outside this directory
  (or in a subdirectory added to `.gitignore`) so it never gets committed;
  it's not structured, reviewable data.
- Anything from the real, committed roster — never copy a real person's
  file into this directory "for reference"; read `seed.ts`/`roster2.ts`
  directly instead.
