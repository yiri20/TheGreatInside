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

- **96 people, 95 match-eligible** (Zheng He is the sole exception —
  browsable, fails only the coverage gate). The People Directory's
  default (unfiltered) view shows the match-eligible count (95), not the
  raw total (96) — `filterPeople()` defaults `matchEligibleOnly` to true
  (`src/core/people/explorer.ts`). Miriam Makeba (`roster11.ts`) promoted
  from the roster-expansion-125 evidence program — see "Known open
  items" below.
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

## Self-Made / Earned-Distinction Roster Philosophy Audit (2026-08)

Full 3-tier audit (Strong Self-Made Fit / Earned but Advantaged / Weak
Fit) of all 95 people against `inclusion_v1`'s counterfactual test:
**69 Strong, 26 Earned but Advantaged, 0 Weak Fit** (1 Borderline flag —
Aung San Suu Kyi — within Earned but Advantaged, no action required).
No one removed or replaced; no KEEP/REVIEW/REPLACE-CANDIDATE action
applies to anyone, since that step is scoped to the Weak-Fit tier and
it's empty. Full per-person record, calibration walkthrough, and a
proposed `Self-Made / Earned-Distinction Gate v1` for future candidates:
[`self-made-earned-distinction-audit-2026-08.md`](self-made-earned-distinction-audit-2026-08.md).

## Known open items

- ~~**Standing merge blocker**: mobile quiz Likert-scale wrapping~~ —
  fixed on `fix/mobile-likert-wrap` (2026-08-22): `.tgi-likert__label`/
  `__options`/`__input` now shrink under the existing 640px breakpoint
  in `src/ui/styles/components.css`, verified at 320-1280px. No longer
  blocks merge to `main`.
- West Asia remains under-represented (1 person, Rumi) — several
  candidates are researched and held, not yet promoted.
- **Roster Expansion 125 evidence program (2026-09)**: 30 candidates
  researched/scored toward a future 96->125 expansion; 26 adequately
  evidenced (all `held` except **Miriam Makeba, `qa_passed` ->
  PROMOTED**, see below), 2 `IMPROVED_BUT_CEILING_REMAINS` (Al-Biruni,
  Chien-Shiung Wu), 2 `STRUCTURALLY_THIN` (Ibn Battuta — scored but thin;
  Ashoka — deliberately never scored). A bounded alternate search for
  both `STRUCTURALLY_THIN` candidates is **closed**: Chandragupta Maurya
  and Rabban Bar Sauma both `NO_PROVEN_REPLACEMENT`, Leo Africanus
  rejected — no swap performed, no further alternate sourcing
  authorized. The other 29 candidates (nor any evaluated alternate) are
  still not live-roster or production-code-referenced. Full evidence
  state and the reconciled 30-primary matrix:
  [`roster-expansion-125-FINAL-CONVERGENCE-DRAFT.md`](roster-expansion-125-FINAL-CONVERGENCE-DRAFT.md).
- **Miriam Makeba promoted and profile-completed (2026-09, merged to
  `main`)**: the roster-expansion-125 program's sole `qa_passed`
  candidate, promoted via `generateRoster11.ts` (single-slug allowlist)
  into `roster11.ts`. 95->96 people, 94->95 match-eligible (see the
  count-semantics note above). The original promotion was declared
  production-complete from data-layer checks alone and, per a live
  browser check the same day, was actually incomplete: no portrait, no
  editorial content. A corrective fix
  (`fix/miriam-makeba-complete-profile`) closed both gaps using only her
  already-approved candidate evidence (no new research, no
  score/confidence/evidence change): a CC0-licensed portrait (Rob
  Mieremet/Anefo, 1969, Nationaal Archief) and editorial content (2
  achievements, 2 moments, 1 turning point, 2 interpretations, EN+KO),
  verified live in-browser in both locales. Full record for both the
  promotion and the fix:
  [`roster11-miriam-makeba-promotion-DRAFT.md`](roster11-miriam-makeba-promotion-DRAFT.md),
  [`roster11-miriam-makeba-profile-fix.md`](roster11-miriam-makeba-profile-fix.md).
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

Miriam Makeba's promotion (see "Known open items" above) is implemented
and fully verified in an isolated worktree, `READY_TO_COMMIT` but not yet
committed/merged — that commit/merge decision is the immediate next
action if continuing this thread. The other 29 roster-expansion-125
candidates remain `held`/`STRUCTURALLY_THIN`/unscored with no further
action queued (alternate search closed). Otherwise, continue Launch
Roster Expansion in fresh batches using the frozen protocol, toward a
100-person lightweight review checkpoint — routine production work, not
a methodology audit, unless a genuinely new finding surfaces.
