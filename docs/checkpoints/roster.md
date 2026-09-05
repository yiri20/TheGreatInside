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

- **126 people, 125 match-eligible** (Zheng He is the sole exception —
  browsable, fails only the coverage gate). The People Directory's
  default (unfiltered) view shows the match-eligible count (125), not the
  raw total (126) — `filterPeople()` defaults `matchEligibleOnly` to true
  (`src/core/people/explorer.ts`). Miriam Makeba (`roster11.ts`) promoted
  from the roster-expansion-125 evidence program; Marcus Aurelius
  (`roster12.ts`) promoted from the roster-12 new-intake batch; 11 people
  (`roster14.ts`) promoted from the roster-14 coverage-aware intake; 8
  people (`roster15.ts`) promoted from the roster-15 coverage-aware
  intake; 9 people (`roster16.ts`) promoted from the roster-16 final,
  depth-and-confidence-aware intake — see "Known open items" below.
  **The 125-person target was reached and closed exactly by roster-16
  (`ROSTER_125_TARGET_REACHED`).** Roster-17 (2026-09) then added one
  further person, John von Neumann (`roster17.ts`), from a deliberately
  scaled-down intake cycle following the scalability audit's
  `CURRENT_ARCHITECTURE_SAFE_TO_250` verdict — see
  [`roster17-intake-and-safety.md`](roster17-intake-and-safety.md) for
  the full record, including 6 other candidates from that cycle
  (Andrei Sakharov, J. R. R. Tolkien, George Bernard Shaw, Thurgood
  Marshall, Dolores Huerta, Paul Erdős) that remain `held` on
  scored-attribute-count/coverage — a real, honest result of a
  single-source-per-person research pass, not weak underlying evidence.
  This is not a resumption of automatic roster expansion; no roster-18 is
  planned.
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
- **Roster-16 final intake (2026-09) — `ROSTER_125_TARGET_REACHED`**:
  refined the coverage-aware preflight with a depth question (>=12
  attributes plausibly supportable near the high-confidence threshold via
  repeated/independent/multi-source corroboration, not just broad topic
  coverage), because roster-15's four misses all had adequate breadth but
  insufficient high-confidence-row count. Froze 12 from a fresh 27-person
  discovery pool (9 carried forward from roster-15's own leftover,
  never-scored pool; 3 genuinely new). **11 of 12 crossed
  `eligibility_v2` honestly** (Duke Ellington, Martha Graham, Bertrand
  Russell, Charles Dickens, George Orwell, T. E. Lawrence, Elizabeth Cady
  Stanton, John D. Rockefeller, Katharine Hepburn [held, see below],
  Bette Davis, Nellie Bly, Carl Jung) — 91.7% qa_pass rate, matching
  roster-14 and exceeding roster-15's 66.7%. Only 9 production slots
  remained before the 125 target, so the **first 9 `qa_passed` by frozen
  intake order were promoted** (Duke Ellington, Martha Graham, Bertrand
  Russell, Charles Dickens, George Orwell, T. E. Lawrence, Elizabeth Cady
  Stanton, John D. Rockefeller, Bette Davis); Nellie Bly and Carl Jung
  remain `qa_passed` but target-cap-deferred, not held. **Katharine
  Hepburn** (22 attributes, coverage 0.642, 14 high-confidence rows —
  clearing the depth-count gate comfortably) missed solely because the
  *average* confidence within that high-confidence band (0.54) fell just
  under the 0.55 threshold — a genuinely different miss pattern from
  every prior cycle, and remains `held`. 115->124 match-eligible,
  116->125 total. **Target reached exactly; gap 0.** Full record:
  [`roster16-final-intake.md`](roster16-final-intake.md).
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

**The 125-person target has been reached** (roster-16 final intake,
[`roster16-final-intake.md`](roster16-final-intake.md)):
**`ROSTER_125_TARGET_REACHED`, gap 0.** Roster-16 added a depth question
to the standing coverage-aware preflight (>=12 attributes plausibly
supportable near the high-confidence threshold via genuinely repeated/
independent/multi-source corroboration, not just broad topic coverage) in
direct response to roster-15's finding that all four of its misses had
adequate breadth but insufficient high-confidence-row count. Result:
**11 of 12 honest `eligibility_v2` passes**, back up to roster-14's 91.7%
rate and clearly above roster-15's 66.7% — empirical evidence the depth
refinement works. Only 9 production slots remained, so the first 9
`qa_passed` candidates by frozen intake order were promoted; Nellie Bly
and Carl Jung remain `qa_passed` but target-cap-deferred (not held, not
portrait-blocked, immediately available if the target is ever raised).
**Katharine Hepburn** is `held` with a genuinely new miss pattern: she
cleared the depth-*count* gate comfortably (14 high-confidence rows, need
12) but her high-confidence *average* (0.54) fell just under the 0.55
threshold — the two-question preflight predicts count, not average
strength within the qualifying band, a useful refinement to note for any
future cycle. 125 people, 124 match-eligible.

No further roster expansion is planned automatically now that the target
is reached. If a future session is asked to grow the roster past 125,
Nellie Bly and Carl Jung (both fully `qa_passed`, needing only portrait
sourcing, editorial content, and production wiring — no further research)
are the immediate starting point, followed by Katharine Hepburn (would
need a genuine re-examination of specific rows' corroboration to lift the
high-confidence average, not a rescue of the existing evidence pack) and
the four roster-15 `held` candidates (Agatha Christie, Thomas Jefferson,
Ulysses S. Grant, Henry Ford — all broad 22-attribute packs short only on
confidence distribution) and Queen Victoria (`held` from roster-14).
Otherwise, this roster-growth workstream is complete; future roster-
related work should default to quality/depth passes on the existing 125
(portrait coverage, editorial richness, confidence-deepening on `held`
candidates) rather than new intake cycles, unless the user explicitly
raises the target.

- **Roster-17 intake (2026-09)**: a separate, later cycle (not a
  resumption of the 1,000-person program) following the scalability
  audit's `CURRENT_ARCHITECTURE_SAFE_TO_250` verdict. Deliberately
  scaled down: 13 genuinely new candidates discovered and QID-verified,
  8 classified `STRONG_BREADTH_AND_DEPTH` and frozen, scored using a
  single-source-per-person research pass rather than roster14-16's
  deeper multi-source standard. **1 of 7 scored crossed `eligibility_v2`
  honestly**: John von Neumann (23 attributes, coverage 0.695), promoted
  via `generateRoster17.ts` into `roster17.ts`, fully product-complete
  from first promotion (real Public Domain Los Alamos National
  Laboratory portrait, verified live against Wikimedia Commons license
  metadata; full EN/KO editorial content; Korean display name). The
  other 6 — Andrei Sakharov, J. R. R. Tolkien, George Bernard Shaw,
  Thurgood Marshall, Dolores Huerta, Paul Erdős — remain `held` purely
  on scored-attribute-count/coverage (each 11-14 scored attributes vs.
  the 18 floor), a real, honest outcome of the shallower research pass,
  not weak underlying evidence; each `holdReason` names the specific gap.
  A genuine taxonomy gap was also found and left unresolved rather than
  worked around: this project's 11-region taxonomy has no Oceania/Pacific
  region, so Edmund Hillary (New Zealand) was set aside before scoring
  despite strong evidence. 125->126 people, 124->125 match-eligible.
  Full record:
  [`roster17-intake-and-safety.md`](roster17-intake-and-safety.md).
