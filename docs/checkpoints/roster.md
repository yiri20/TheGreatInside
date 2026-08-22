# Roster checkpoint

Compact current status. For the "how do I add a person" procedure, see
[`docs/adding-a-person.md`](../adding-a-person.md) and
[`docs/scoring-rubric-v1.md`](../scoring-rubric-v1.md) — this file is
state, not workflow. For the full 19-session narrative this was
distilled from (methodology experiments, dead ends, exact per-session
arithmetic), see
[`docs/archive/session-history/roster-1000-checkpoint.md`](../archive/session-history/roster-1000-checkpoint.md)
— only open it to resolve a specific historical methodology question.

## Current numbers

- **95 people, 94 match-eligible** (Zheng He is the sole exception —
  browsable, fails only the coverage gate).
- Branch history: `scale/roster-1000` (19 sessions) is fully merged into
  `main`; roster growth now continues via the frozen protocol below,
  directly on top of `main`-derived branches.
- Portrait coverage: well under 100% — deliberately opportunistic, not a
  session-blocking requirement. Check `grep -c "portrait:" src/data/people/*.ts`
  for the current count.

## Frozen protocol: `Roster Research & Scoring Protocol v1`

Verdicted ready-to-freeze at roster-1000 session 18 after a prospective
(not retrospective) pilot. This is the standing procedure for adding any
new person:

1. Identity preflight — verify the Wikidata QID against a **live fetch**
   of the actual entity page, and check the full `data-pipeline/candidates/`
   directory (not just the live roster) for a name collision, before
   writing any candidate file. (`src/dev/roster1000/identityPreflight.ts`)
2. Evidence-first, trait-blind: source record → raw notes → evidence
   ledger, locked before any trait score is written.
3. Score using `docs/scoring-rubric-v1.md`'s four-field discipline
   (score/confidence/evidenceType/impact), locked before `eligibility_v2`
   is ever run.
4. Run `eligibility_v2` exactly once. **Never iterate scores toward
   passing it** — see the confidence-change policy below.
5. Promote only `qa_passed` candidates via a `generateRosterN.ts` script
   with an explicit slug allowlist.
6. Regenerate dispersion/calibration, re-run the matching simulation and
   sensitivity check, regenerate the people index.

Full step-by-step commands: [`docs/adding-a-person.md`](../adding-a-person.md).

## Eligibility rule: `eligibility_v2`

`scored >= 18` AND `coverage >= 0.6` (unchanged from v1) AND a
high-confidence subset (`confidence >= 0.5`) with `count >= 12` and
`avgConf >= 0.55` (replaces v1's flat all-attribute confidence mean).
Implemented in `evaluateMatchEligibility()`,
`src/core/matching/similarity.ts`. `buildTerms`/the matching formula
itself is untouched — only the admission statistic changed.

## Confidence-change policy (binding, not optional)

Any post-scoring edit to an already-scored row's `confidence`/
`evidenceType` must be labeled one of: `NEW_EVIDENCE`, `RUBRIC_CORRECTION`
(checked corpus-wide, not just the one failing candidate), or
`ERROR_CORRECTION`. **Never** `ELIGIBILITY_REMEDIATION` (changing a score
because the eligibility result came out wrong). This exists because a
real 2026-08 incident (session 11) iteratively adjusted confidence values
until eligibility passed — 17 of 20 candidates from that batch had to be
reverted. Run `src/dev/roster1000/checkScoringLockIntegrity.ts` before
committing any session that touches a previously-committed candidate.

## Known open items

- **Standing merge blocker** (unrelated to roster data): mobile quiz
  answer-choice layout has real reported wrapping/proportion issues on
  English mobile. Must be fixed before any merge to `main`. Not yet
  investigated. See [`CURRENT_STATE.md`](../context/CURRENT_STATE.md).
- West Asia remains under-represented (1 person, Rumi) — several
  candidates are researched and held, not yet promoted.
- A full manual rubric-consistency review of the pre-session-11 corpus
  (52 held + 38 accepted candidates) is real, unfinished work — an
  automated pass was tried and found unreliable by spot-check.
- `eligibility_v2`'s natural admission rate for fresh, well-researched
  candidates is still an open, not-fully-controlled question (three
  calibration attempts across sessions 14/15/16/17, inconclusive) — not
  a reason to redesign the gate, just an open research question. Read
  the archive's §79-83 if a future session wants to pursue this further.
- No paid data/AI research spend has been used or is planned for
  candidate research.

## Next recommended step

Continue Launch Roster Expansion in fresh batches (`roster11.ts`+) using
the frozen protocol, toward a 100-person lightweight review checkpoint —
this is routine production work, not a methodology audit, unless a
genuinely new finding surfaces.
