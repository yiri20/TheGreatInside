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

- **116 people, 115 match-eligible** (Zheng He is the sole exception —
  browsable, fails only the coverage gate). The People Directory's
  default (unfiltered) view shows the match-eligible count (115), not the
  raw total (116) — `filterPeople()` defaults `matchEligibleOnly` to true
  (`src/core/people/explorer.ts`). Miriam Makeba (`roster11.ts`) promoted
  from the roster-expansion-125 evidence program; Marcus Aurelius
  (`roster12.ts`) promoted from the roster-12 new-intake batch; 11 people
  (`roster14.ts`) promoted from the roster-14 coverage-aware intake; 8
  people (`roster15.ts`) promoted from the roster-15 coverage-aware
  intake — see
  "Known open items" below. Target: 125. Remaining gap: 9.
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

- **Roster-14 coverage-aware intake (2026-09)**: applied the roster-12/13
  coverage postmortem's finding directly — raised the pre-freeze evidence
  target to >=21-22-attribute-capable, froze a smaller 12-candidate batch
  (from a fresh 33-person discovery pool) instead of 15-18, and scored
  every candidate to 22-23 attributes. **11 of 12 crossed `eligibility_v2`
  honestly** (Abraham Lincoln, Theodore Roosevelt, Alexander Hamilton, Mark
  Twain, Ernest Hemingway, Elizabeth I, Otto von Bismarck, Leo Tolstoy,
  Sigmund Freud, Pablo Picasso, Gertrude Bell) — a sharp reversal from
  roster-12/13's combined 2 of 33, consistent with the postmortem's own
  mathematical prediction. All 11 are fully product-complete from first
  promotion: real rights-clear Public Domain portraits (verified live
  against Wikimedia Commons license metadata), full EN/KO editorial
  content, Korean display names. **Queen Victoria** (22 attributes,
  coverage 0.655) is the sole miss — short only on the high-confidence-
  count gate (4 of 22 attributes at confidence >=0.5, need 12), not
  coverage or attribute count — and remains `held`, untouched after the
  determination. 96->107 match-eligible, 97->108 total. Full record:
  [`roster14-coverage-aware-intake.md`](roster14-coverage-aware-intake.md).
- **Roster-15 coverage-aware intake (2026-09)**: used roster-14's
  coverage-aware preflight as the standing method. Built a fresh
  34-person discovery pool (19 carried forward from roster-14's own
  preflighted-but-never-scored pool, 15 genuinely new), froze 12, scored
  every candidate to 22 attributes. **8 of 12 crossed `eligibility_v2`
  honestly** (Catherine the Great, Frederick the Great, James Joyce,
  Marlene Dietrich, Maya Angelou, Miles Davis, Nina Simone, Ruth Bader
  Ginsburg) — all fully product-complete from first promotion, including
  four recent-enough deaths (Angelou, Davis, Simone, Dietrich) where
  portrait rights were a genuine risk, resolved via U.S. federal
  government works and Dutch Nationaal Archief/Anefo CC0 photographs.
  Agatha Christie, Thomas Jefferson, Ulysses S. Grant, and Henry Ford (all
  22 attributes, all coverage >=0.648) missed solely on the
  high-confidence-count gate and remain `held` — a real, honest outcome,
  not a coverage or attribute-count failure. 107->115 match-eligible,
  108->116 total. Full record:
  [`roster15-coverage-aware-intake.md`](roster15-coverage-aware-intake.md).
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
- **Roster-12 new-intake batch (2026-09)**: with zero unpromoted
  `qa_passed` candidates remaining after Miriam Makeba, this cycle built a
  fresh 27-person discovery pool (none previously present as scored
  candidate JSON, none already live), froze 15 for full evidence packs
  and first scoring. 2 of 15 crossed `eligibility_v2` honestly: Marcus
  Aurelius and Che Guevara. **Marcus Aurelius promoted** via
  `generateRoster12.ts` (single-slug allowlist) into `roster12.ts` —
  96->97 people, 95->96 match-eligible — with a real portrait (Louvre
  Antonine-period bust, CC BY 2.5) and full EN/KO editorial content from
  first promotion, not a follow-up fix. **Che Guevara is `qa_passed` but
  NOT promoted** — no rights-clear, non-AI-generated portrait could be
  sourced this cycle (the iconic Korda photograph's international
  copyright status is genuinely disputed; several Commons alternatives
  were investigated and rejected for the same reason, a false rights
  claim, or an AI-modified-file flag); his candidate JSON and lifecycle
  are untouched, next-in-line once a portrait is resolved. The other 13
  frozen candidates remain `held` — real evidence packs, genuine first
  scores, all missed only on `eligibility_v2`'s weighted coverage floor
  (0.6), not on attribute count or confidence — a concrete target for a
  future evidence-deepening pass, not new research. Full record:
  [`roster12-new-intake-batch.md`](roster12-new-intake-batch.md).
- **Roster-13 new-intake batch (2026-09)**: built a fresh 29-person
  discovery pool, froze 18 for full evidence packs and first scoring.
  **0 of 18 crossed `eligibility_v2`** — every candidate missed solely on
  the weighted coverage floor (0.6), Fidel Castro closest at 0.599. All
  18 are `held` with exact numbers in each `holdReason`. A bounded,
  one-check-only portrait retry for Che Guevara found no rights-clear
  alternative (a newly-checked 1964 photo carries an explicit,
  self-acknowledged Cuban-state-copyright-transfer risk and a
  questionable rationale for a non-Cuban photographer; another lead was
  released only "by a webmaster" with no actual rights to grant) — his
  portrait blocker from roster-12 stands unchanged, candidate JSON
  untouched. No candidate promoted; no `roster13.ts` created (nothing
  product-ready to allowlist). Roster counts unchanged (97 / 96
  match-eligible). Merged to `main` as `023df19`. Full record:
  [`roster13-new-intake-batch.md`](roster13-new-intake-batch.md); see
  [`roster12-13-coverage-postmortem.md`](roster12-13-coverage-postmortem.md)
  for the mechanical analysis of why roster-12/13 combined produced only
  2 of 33 promotions and the resulting roster-14 preflight change.
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

Roster-15's coverage-aware intake ([`roster15-coverage-aware-intake.md`](roster15-coverage-aware-intake.md))
confirmed roster-14's preflight method as reliable, repeatable practice,
not a one-off result: **8 of 12 honest `eligibility_v2` passes** this
cycle (all product-complete and promoted via `roster15.ts`), against
roster-12/13's combined 2 of 33 and roster-14's 11 of 12 — a lower pass
rate than roster-14 but still far above the pre-postmortem baseline, and
the attribute-count preflight itself was again 100% accurate (all 12
frozen candidates reached exactly the ≥22 attributes predicted). All 4
misses this cycle (Agatha Christie, Thomas Jefferson, Ulysses S. Grant,
Henry Ford) failed only on the high-confidence-count gate, not coverage or
attribute count — a genuine, useful finding that the preflight predicts
attribute *breadth* reliably but not confidence *distribution*, which
depends on how directly the surviving sources speak to each specific
trait, not just how many domains they cover. 116 people, 115
match-eligible; gap to 125 now 9. Separately: Che Guevara remains
`qa_passed`, portrait-blocked, parked with no further search scheduled
(not reopened this cycle). Queen Victoria remains `held` from roster-14,
untouched. The 29 roster-expansion-125 candidates remain
`held`/`STRUCTURALLY_THIN`/unscored with no further action queued
(alternate search closed). This cycle's own discovery pool preflighted a
further 3 new names not frozen this round (Andrew Jackson, Salvador Dalí,
Nellie Bly) plus carried forward 12 names from roster-14's own unfrozen
pool that remain unscored (John Adams, Abigail Adams, Elizabeth Cady
Stanton, Harriet Beecher Stowe, F. Scott Fitzgerald, Zelda Fitzgerald,
George Orwell, Bertrand Russell, Charles Dickens, Giuseppe Garibaldi, Carl
Jung, Charlie Chaplin, Harry Houdini, Eva Perón, T. E. Lawrence, Qiu Jin,
Édith Piaf, Duke Ellington, John D. Rockefeller — per the full list in the
roster-15 checkpoint) — a starting point for roster-16's discovery pool,
subject to a fresh preflight at that time rather than a blanket
carry-forward. The four roster-15 `held` candidates (all with broad,
22-attribute evidence packs short only on confidence distribution) are a
concrete target for a future confidence-deepening pass — re-examining
specific rows for additional corroborating sources — rather than fresh
research, should a future cycle choose to pursue that instead of new
candidates. Otherwise, continue roster expansion in fresh discovery-pool
batches using the protocol below (the roster-14/15 preflight refinement is
now standard practice, not a one-off), toward the 125-person target —
routine production work, not a methodology audit, unless a genuinely new
finding surfaces.
