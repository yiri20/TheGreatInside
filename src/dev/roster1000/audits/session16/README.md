# Session 16 — Frozen-Ledger Scoring Reproducibility Audit

**AUDIT-ONLY. NOT PRODUCTION. NOT A ROSTER CANDIDATE SOURCE. NOT ELIGIBLE
FOR PROMOTION.**

Everything under `src/dev/roster1000/audits/session16/` is diagnostic
output from a one-time reproducibility experiment. It is structurally
isolated from the real candidate pipeline:

- Every production tool that discovers candidates (`validateCandidates.ts`,
  `checkScoringLockIntegrity.ts`, `generateRoster3.ts` through
  `generateRoster8.ts`, `identityPreflight.ts`) hardcodes
  `CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates")` and
  does a non-recursive `readdirSync` of exactly that directory. None of
  them can ever see this directory — confirmed by `session16Isolation.test.ts`
  in this folder, and by direct inspection (`grep -rn "CANDIDATES_DIR"`).
- The shadow-profile JSON files in this directory deliberately do NOT use
  `schemaVersion: "candidate_v1"` (`candidateSchema.ts`'s real schema tag)
  — they use `"session16_shadow_audit_v1"` instead, so even if one were
  ever copied into `data-pipeline/candidates/` by mistake,
  `validateCandidates.ts`'s own schema-version check would reject it
  immediately rather than silently treating it as a real candidate.
- No file in this directory was ever written to, or read by,
  `src/data/people/*.ts` (the real committed roster) or
  `eligibility_v2` (`src/core/matching/similarity.ts`, deliberately never
  imported or run against these shadow profiles — see below).

## What this audit is

A controlled test of whether the current scoring rubric
(`docs/scoring-rubric-v1.md`), applied independently to the SAME frozen
evidence Session 13 used, reproduces roughly the same trait rows Session
13 locked for two of its six diagnostic candidates: Jorge Luis Borges and
Thomas Sankara (both landed at 16/18 scored attributes in Session 13,
the closest of that session's six candidates to `eligibility_v2`'s
floor, both still held — see `docs/roster-1000-checkpoint.md` §79).

The question under test: **same frozen evidence in, does independent
scoring produce the same trait rows out?** Not "would these two now pass
eligibility" (they are not re-run against `evaluateMatchEligibility` in
this audit at all, per the session's own explicit instruction 8) and not
"can we get back to 16/18" (no row was added or adjusted to chase a
target count — see `shadowProfile.*.json`'s own lock discipline below).

## Files

- `frozenEvidence.borges.md` / `frozenEvidence.sankara.md` — the
  reconstructed atomic-episode ledger for each candidate, decomposed from
  the ONLY frozen artifact this repository actually preserves: the
  `rationale` field of each locked Session 13 row in
  `data-pipeline/candidates/jorge-luis-borges.json` /
  `thomas-sankara.json`. **This is a reconstruction, not the original
  pre-scoring ledger** — see the "Reconstruction provenance and
  limitations" section in each file for exactly what could and could not
  be recovered, and why this introduces a real, documented contamination
  risk into this audit's own independence.
- `shadowProfile.borges.json` / `shadowProfile.sankara.json` — the locked
  Session 16 shadow scoring, produced by applying `scoring-rubric-v1.md`
  fresh to the reconstructed episode ledger. Each carries a `SHADOW
  LOCKED` marker and a `lockedAt` timestamp; no field was edited after
  locking.
- `comparison.md` — the row-by-row comparison against the historical
  Session 13 rows (performed only after both shadow profiles were
  locked), the quantified reproducibility metrics, the multi-trait
  hypothesis test, and the discrepancy diagnosis. This is the primary
  analytical output of the audit; `docs/roster-1000-checkpoint.md` §82
  is its condensed, durable summary.
- `session16Isolation.test.ts` — permanent regression guard proving this
  directory cannot be discovered by any production candidate-pipeline
  tool, and that the shadow JSON files would fail real candidate schema
  validation if ever misplaced.

## What this audit explicitly did NOT do

- No new web research, no new sources, no facts beyond what Session 13's
  locked rows already recorded.
- No modification to `data-pipeline/candidates/jorge-luis-borges.json`,
  `thomas-sankara.json`, any Session 14/15 candidate file, or
  `eligibility_v2` (`src/core/matching/similarity.ts`).
- No eligibility computation of any kind against the shadow profiles.
- No promotion, no roster change, no rescoring of the live roster.
