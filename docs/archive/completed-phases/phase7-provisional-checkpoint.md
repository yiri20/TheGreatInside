> **ARCHIVED — historical reference only. Do not load by default.**
>
> This file is preserved for provenance/traceability. For current project
> state, see [`docs/context/CURRENT_STATE.md`](../../context/CURRENT_STATE.md).
> For active workflows, see `docs/workflows/`, `docs/checkpoints/`, and
> `docs/reference/`. Only open this file to resolve a specific historical
> question this session actually needs answered.

# Phase 7 checkpoint — durable resume point (2026-08)

## Phase 7 is CLOSED (human-approved, 2026-08)

**Formal closure recorded.** The user reviewed the final state — Benjamin
Franklin (approved after 3 rounds) and Genghis Khan (round 1, no defect;
the one noted `dual_edged`/`tradeoffKey` content-wiring gap fixed and
re-verified live) — and gave explicit final sign-off. No further human
review round is pending. This file's earlier "not yet formally closed" /
"STOP for human review" framing below is superseded by this banner; the
rest of the file is kept as the historical record of how closure was
reached, plus one correction (see immediately below). The durable summary
of what shipped and its final validation state now lives in CLAUDE.md's
"Phase 7 human-review checkpoint" section — read that first for current
status; this file remains the detailed backing record.

**Documentation-only correction made at closure**: the "One real, minor,
non-blocking gap" section below (and the mirrored text in CLAUDE.md)
previously stated that `conflict_tolerance` **IS** in
`TRADEOFF_ATTRIBUTE_IDS` with real content "just unused" for the
`dual_edged` branch. That was factually wrong — `conflict_tolerance` is
one of the 8 attributes `TRADEOFF_ATTRIBUTE_IDS`'s own comment names as
deliberately uncovered (confirmed by reading the array directly: 26
entries, `conflict_tolerance` absent; and by grepping `en.ts`: no
`dontcopy.tradeoff.conflict_tolerance` key exists). The `dual_edged` →
`tradeoffKeyFor()` wiring fix was still made (it's the correct
architecture, mirrors `extreme_score`/`shape_mismatch`, and now correctly
serves the 26 attributes that ARE covered — locked by a new regression
test on `discipline`), but it does **not** change Genghis Khan's rendered
Conflict Tolerance caution: `tradeoffKeyFor("conflict_tolerance")`
correctly returns `undefined`, so it still falls back to the generic
`dontcopy.generic.dual_edged` sentence — live-reverified after the fix.
That fallback is the correct, intended behavior (never invent content to
eliminate a legitimate gap), not a remaining defect. Completing
`conflict_tolerance`'s tradeoff content (and the other 7 uncovered
attributes) is recorded as non-blocking future cleanup in CLAUDE.md's
"Known open issues", not a Phase 7 blocker.

---

**Read this file first in any fresh session touching Phase 7.** It is the
authoritative, current checkpoint — not a historical artifact. (This file's
name still says "provisional" from an earlier, actually-paused period of
Phase 7; the content below reflects the current, later state where Phase 7
is implemented and mid-review. Renaming was considered and skipped to avoid
breaking any existing links from CLAUDE.md or elsewhere — the content is
what matters.) For the full stage-by-stage implementation record (Stages
7A-7F) and all Phase 6.6 background, see `CLAUDE.md`'s "Phase 7" and "Phase
7 human-review checkpoint" sections — this file does not repeat that detail,
only the state needed to resume.

## Canonical versions (frozen, Phase 6.6 CLOSED)

```
taxonomy_v1.1   quiz_v2   reference_v3   dispersion_v1
matching_v2     calibration_v3   greatness_v1
```

None of these were touched during Phase 7 or its human-review round, and
none should be touched to resolve anything in this checkpoint — every open
item below is a `src/core/interpretation`/UI-layer concern, not an
algorithm concern. **Deterministic, no-runtime-AI architecture is
unchanged and non-negotiable**: `targetComparison.ts` and every file it
touches remain pure functions over `Person`/`UserProfile`/`TraitComparison`
data, zero I/O, zero generative calls, same as every other file in
`src/core`.

## What Phase 7 built (all implemented, all validated at least once)

- **5-section compare-page IA** (`app/[locale]/compare/[slug]/page.tsx`):
  What You Share → Where You Lean Differently → What You Could Learn From
  Them (+ Worth Exploring sub-block) → Where You Bring Something Different
  → What Not to Copy → Facet Similarity → Detailed Trait Comparison.
- **Target switching**: `TargetSwitcher` component, live-filters
  `SEED_PEOPLE`, links to `/compare/{slug}?r={sameToken}` without a quiz
  retake.
- **Results → Compare CTA**: `SaveLastResult` (mirrors token to
  `tgi_last_result_v1`), `CompareCta` on person pages (gated on
  `person.isMatchEligible` — never shown for Zheng He), "Compare With
  {person}" button on `/results` next to the closest match.
- **Development-guide coverage**: all 34 attributes (original 30 + the 4
  `taxonomy_v1.1` additions authored in Stage 7C). `DEVELOPMENT_GUIDES`
  built from the live `ATTRIBUTE_IDS`; `missingDevelopmentGuides()`
  returns `[]`, asserted as a regression guard.
- **`selectLearnFromSuggestions`** (`targetComparison.ts`): user-state →
  target-state → target-evidence → development guide, banded by the
  user's OWN score. Unchanged since original implementation.
- **`selectWorthExploring`** (`targetComparison.ts`): the non-prescriptive
  fallback for `contextual`-shaped differences `selectLearnFromSuggestions`
  structurally can't surface (no attribute has `lower_can_help` shape yet,
  so `contextual` is the one shape credited in neither direction by
  `learnFromTraits`). **Target-higher only**
  (`c.delta >= DIFFERENCE_THRESHOLDS.moderate`, fixed from an earlier
  direction-symmetric version that was a real bug — see human-review round
  2, Issue 1, in CLAUDE.md). Filtered further to
  `PRESERVES_KEY_SET.has(c.attributeId)` (12 of the 12 `contextual`
  attributes have both `helpsWhenKey` and `preservesKey` content; there is
  no attribute without one, so this filter is currently a no-op safety net,
  not an active exclusion).
- **`helpsWhenKey(attributeId)`** → `` `dev.${id}.helps_when` `` — one
  sentence per attribute (all 34) naming the CONDITION under which the
  target-higher (or user-higher, when reused in section 4) pole helps.
  Used by both Worth Exploring's "Where this can help" and "Where You
  Bring Something Different"'s per-trait sentence.
- **`preservesKey(attributeId)`** → `` `dev.${id}.preserves` `` — the
  newest content set (12 sentences, one per `contextual`-shaped attribute),
  answering "what does the user's current/lower pole legitimately
  protect", independent of the user's exact score band. Replaces an
  earlier, semantically wrong design that reused the banded dev-guide
  `cautionKeys` for this purpose (see "Latest fix" below).
- **`dontcopy.tradeoff.{id}`** content (26 of 34 attributes, via
  `tradeoffKeyFor()`/`TRADEOFF_ATTRIBUTE_IDS`) — neutral, third-person "X
  can do A, but can also cost B" sentences for `selectDoNotCopy`'s
  `extreme_score`/`shape_mismatch` branches, replacing the earlier
  second-person dev-guide caution voice that read as an accusation about
  the historical person. `missingTradeoffCoverage()` tracks the 8
  deliberately-uncovered attributes (regression-guarded at exactly 8).
- **`selectDoNotCopy(target, userScores, limit)`**: `risk`/`dual_edged`
  impact items and editorial `doNotCopyKeys` remain independent of the
  user (always shown when present, regardless of the user's own score).
  `extreme_score`/`shape_mismatch` are now direction-aware — only fire
  when the target is MEANINGFULLY on the extreme/mismatched side relative
  to the user's own score (`DIFFERENCE_THRESHOLDS.moderate` gate) — so a
  trait the user already matches or exceeds is never flagged as something
  to "not copy" from the target. An empty result (`doNotCopy.length === 0`)
  is an accepted, intentional outcome, not a fallback to invent — verified
  live on Benjamin Franklin.
- **Facet Similarity**: relabelled from "Facet Comparison" with an added
  explanatory sentence, after verifying directly in `similarity.ts` that
  `facetMatches[facet]` is a user↔target similarity percentage
  (`calibrateMatch(similarityFrom(facetTerms))`), never a trait-quality or
  ability score.
- **`breakdownSize: 15`** passed to `matchUserToPerson(user, target, {...})`
  in the compare page (raised from the default 5). Root cause found live
  on Benjamin Franklin: `largestDifferences` mixes BOTH directions into
  one top-N-by-contribution pool, while `personHigherTraits`/
  `userHigherTraits` each get their OWN top-N *within* their direction —
  so a real, meaningfully-scored attribute could appear in section 2
  (built from `personHigherTraits`) while being invisible to
  `selectLearnFromSuggestions`/`selectWorthExploring`/`advantageTraits`
  (all read `largestDifferences`). 15 gives room for genuine candidates
  without turning "largest differences" into "every difference" (34
  attributes total). **Confirmed: this does NOT change the overall
  Profile Match percentage** — `result.overallMatch` is computed from the
  full similarity formula over all scored attributes regardless of
  `breakdownSize`, which only controls how many entries the four
  *breakdown arrays* (`closestTraits`/`largestDifferences`/
  `userHigherTraits`/`personHigherTraits`) are truncated to for display/
  selection purposes. Every display-facing array in the compare page JSX
  still slices to 3-4 entries, so what's actually shown to the user is
  unchanged by this — it only recovers entries that were being cut off
  before reaching any selector.

## Latest fix (this session, validated)

**Problem**: Worth Exploring's second statement (originally "Worth
knowing:", reusing `developmentGuide(id, bandForScore(userScore))
.cautionKeys[0]`) answered the wrong question. It's banded by the user's
ABSOLUTE score for a different purpose (development-guide cautions warn
about a band's own failure mode, e.g. "switching between strategies too
often can look inconsistent" for a MEDIUM band) — it was never authored to
defend or explain the legitimate value of a LOW/current pole specifically.
Benjamin Franklin's Resourcefulness card (user score 53, medium band) is
what surfaced this: the rendered text described switching-inconsistency
risk, not "why might someone reasonably prefer to secure resources first".

**Fix**: added a dedicated, unbanded `preservesKey(attributeId)` content
set — 12 sentences, one per `contextual`-shaped attribute
(`PRESERVES_ATTRIBUTE_IDS` in `targetComparison.ts`) — each written to
answer "what does this pole legitimately protect", independent of the
user's exact score. `WorthExploringItem` now carries `helpsWhenKey` +
`preservesKey` (dropped `userBand`/`cautionKeys`/`targetHigher` entirely).
UI label changed from "Worth knowing:" to "What your current style may
preserve:" (`compare.explore.preserves_label`, EN+KO).

**Validated**:
- `tsc --noEmit`: clean.
- `vitest run`: **254/254 passing** (includes a new test proving
  `preservesKey` is identical for a low-band and a medium-band user
  against the same target — i.e. genuinely unbanded — plus a coverage
  test resolving real text for all 12 `contextual` attributes, plus a
  test confirming the 12 hardcoded IDs exactly match
  `ATTRIBUTES[id].contributionShape === "contextual"` from the live
  taxonomy).
- `pnpm build`: clean, **81 routes**, unchanged.
- **Benjamin Franklin re-verified live**: Resourcefulness Worth Exploring
  card now shows "Where this can help" (target-higher pole, unchanged
  content) + "What your current style may preserve:" ("Preferring to
  secure the right resources first can protect standards, quality, or
  consistency when a workaround would create an avoidable compromise.") —
  genuinely explains the user's own current pole instead of describing an
  unrelated inconsistency risk.

**Benjamin Franklin is now fully approved** — all prior review rounds'
issues fixed and re-verified, this being the last one.

## Genghis Khan round 1 — investigated, no code defect found

The user reported an apparent P0 directional bug: "Where You Bring
Something Different" showing Collaboration/Analytical Rigour/Ambiguity
Tolerance as if they were target-higher despite the section heading
implying user-higher, plus "What You Could Learn From Them" showing empty
despite what looked like large target-higher gaps.

**Root cause of the report: a mistake in the assistant's own chat
presentation, not a code defect.** While summarizing the page as a
markdown table, the assistant misread the flattened `get_page_text`
output — `ComparisonBar` renders `[label] [gap] "You" [userScore]
[personName] [personScore]` (the gap, `Math.abs(them - you)`, comes FIRST,
immediately after the label, then the real "You" score follows) — and
mistook the gap number for the "You" score, dropping the real 3-digit user
score entirely from the table.

**Verified false by extracting raw DOM values directly** (bypassing any
chat-formatting step, via `.tgi-compare__num` spans):

```
Collaboration:        You 100 / Genghis Khan 55   (gap 45)
Analytical Rigour:     You 100 / Genghis Khan 65   (gap 35)
Ambiguity Tolerance:   You 100 / Genghis Khan 78   (gap 22)
```

All three are genuinely **user-higher**, correctly gated into
`advantageTraits` (`delta = personScore - userScore`,
`delta <= -DIFFERENCE_THRESHOLDS.moderate` → user higher by ≥20;
`src/core/interpretation/rules.ts`) and correctly excluded from
`learnFromTraits`/`selectLearnFromSuggestions`/`selectWorthExploring` (all
require the TARGET meaningfully higher). No code change needed —
`advantageTraits`, `learnFromTraits`, the `delta` sign convention
(`src/core/matching/similarity.ts`, `delta: pa.score - userScore`), and
the `largestDifferences`/`userHigherTraits`/`personHigherTraits` pool
construction were all re-read against this specific case and are correct.

The related "Learn From Them is empty" concern is **also not a defect**:
in this specific quiz-response profile, almost every attribute has the
user at or near 100 with Genghis Khan lower. The only attribute where
Genghis Khan genuinely scores higher is Conflict Tolerance (95 vs. the
user's 90) — a 5-point gap, under both `MEANINGFUL_DELTA` (12, the
`largestDifferences` pool-entry floor) and `DIFFERENCE_THRESHOLDS.moderate`
(20, the Learn-From/Worth-Exploring floor). There is no genuine
target-higher difference large enough to qualify — "No strong learning
suggestions stood out this time" is the correct, honest output for this
profile/target pairing.

**Lesson recorded for future sessions** (this cost real review time this
round): when presenting `ComparisonBar`-backed data as a hand-built chat
table, either quote the rendered page text verbatim or extract structured
values via a JS eval against `.tgi-compare__num` spans — never
reconstruct a You/target table from the flattened `get_page_text` string
by eye, since the per-attribute gap number sits directly before the real
"You" score in that text and is easy to misread as the "You" value itself.

## One real, minor, non-blocking gap found during this investigation

While tracing Genghis Khan's Conflict Tolerance through `selectDoNotCopy`
to double-check the report above, a genuine (but low-severity) content-
wiring gap turned up: the `dual_edged` branch in `selectDoNotCopy`
(`targetComparison.ts`, the `attr.impact === "dual_edged"` case) always
emits the generic `dontcopy.generic.dual_edged` sentence and never calls
`tradeoffKeyFor()` — unlike the `extreme_score`/`shape_mismatch` branches,
which do attach a `tradeoffKey` when one exists. Genghis Khan's Conflict
Tolerance caution therefore renders as the generic "cuts both ways
depending on context" sentence.

**Correction (made at Phase 7 closure): `conflict_tolerance` is NOT in
`TRADEOFF_ATTRIBUTE_IDS`.** The statement below this point originally
claimed real trait-specific content already existed for it "just unused"
— that was wrong. `conflict_tolerance` is one of the 8 attributes
`TRADEOFF_ATTRIBUTE_IDS`'s own comment names as deliberately uncovered.
So wiring the fix does not, and was never going to, change what Genghis
Khan's Conflict Tolerance caution says — it still falls back to the
generic sentence, correctly, since no content has been authored for this
attribute yet. See the closure banner at the top of this file.

**Not a P0** — the generic sentence is accurate and safe. The fix is
still worth making for consistency and for the 26 attributes it DOES
apply to, but it will not visibly change Genghis Khan's page.

**Genghis Khan's editorial "What Not to Copy" content (the mass-violence
caution) is separately human-approved and must be preserved verbatim** —
do not touch it while addressing the `dual_edged` gap above; it is a
different item in the same section, not related to this finding.

## Closure task record (completed, 2026-08)

The tasks originally listed here for "the fresh session" were all
completed in the closing session, in this order — kept as the record of
what was actually done, not a forward-looking TODO anymore:

1. Read this file and CLAUDE.md's "Phase 7" + "Phase 7 human-review
   checkpoint" sections first. Done.
2. Attached `tradeoffKeyFor(attr.attributeId)` in `selectDoNotCopy`'s
   `dual_edged` branch (mirroring `extreme_score`/`shape_mismatch`); kept
   the generic sentence as the fallback when no tradeoff key exists (never
   dropped, since dropping it would leave the 8 uncovered `dual_edged`
   attributes with no caution text at all). No new tradeoff content was
   invented beyond the existing 26-of-34 `TRADEOFF_ATTRIBUTE_IDS` coverage.
3. Added a direction-aware regression test suite for
   `advantageTraits`/`learnFromTraits` using a Genghis-Khan-shaped fixture
   (near-ceiling user, target lower across the board, one small
   contextual-shaped target-higher gap under threshold) —
   `src/core/interpretation/interpretation.test.ts`, describe block
   `"advantageTraits/learnFromTraits: near-ceiling user vs. uniformly
   lower target"` (3 tests). Also added 2 tests in
   `targetComparison.test.ts` pinning the `dual_edged`/`tradeoffKey` fix
   itself (covered attribute gets a key; `conflict_tolerance` correctly
   doesn't).
4. Re-ran Benjamin Franklin live — structured DOM extraction confirmed
   Cross-Domain Range (You 100 / Franklin 95, correctly absent from
   Not-to-Copy) and the Resourcefulness Worth Exploring card
   (`helpsWhenKey` + `preservesKey` text) byte-identical to the approved
   state. **No regression. Still fully approved.**
5. Re-ran Genghis Khan live via structured DOM extraction
   (`.tgi-compare__num` / `aria-label`, not a hand-built chat table):
   Collaboration You 100/Genghis 55, Analytical Rigour You 100/Genghis 65,
   Ambiguity Tolerance You 100/Genghis 78 (all three correctly user-higher,
   under "Where You Bring Something Different"); Conflict Tolerance You
   90/Genghis 95 (the only target-higher gap, 5pts, under threshold,
   correctly absent from "Learn From Them"); Conflict Tolerance's
   Not-to-Copy caution confirmed still generic (see the correction above —
   this is expected, not a regression); the mass-violence editorial
   caution confirmed byte-identical and intact.
6. `tsc --noEmit` clean. `vitest run`: **259/259** (254 baseline + 5 new).
   `pnpm build --webpack`: clean, **81 routes**, unchanged.
7. Reported to the user; user gave explicit final sign-off. **Phase 7 is
   formally CLOSED.** See the closure banner at the top of this file and
   CLAUDE.md's "Phase 7 human-review checkpoint" section for the durable
   closure record.

## Result token used throughout this review

```
quiz_v2.a777a71a777a7a777777a77777a77aa77a7777a7777a7a7777a7177777777777
```

Used via `/en-US/compare/{slug}?r={token}` for both Benjamin Franklin and
Genghis Khan throughout this entire review cycle. No quiz retake was
performed or requested at any point — this is a pre-seeded synthetic
`localStorage` draft token, not a live human quiz completion.

## Non-blocking future cleanup (recorded at closure, not a blocker)

- Complete neutral, third-person deterministic tradeoff coverage for the 8
  currently-uncovered attributes (`missingTradeoffCoverage()`):
  `belief_updating`, `perfectionism`, `adaptability`, `risk_tolerance`,
  `collaboration`, `conflict_tolerance`, `competitiveness`,
  `proactive_agency`. `conflict_tolerance` specifically is what Genghis
  Khan's Not-to-Copy caution currently falls back to the generic sentence
  for.
- Real-user monitoring of whether the comparison page's suggestions
  (`selectLearnFromSuggestions`/`selectWorthExploring`/`selectDoNotCopy`)
  are actually found useful, once real traffic exists — Phase 7's
  validation is simulation + two humans' live review, not production usage
  data.
- Keyboard traversal was reasoned about as structurally sound (native
  `<details>`/`<summary>`, existing accessible primitives) but never
  step-by-step tabbed through by a human on the compare page specifically
  — worth a real-browser manual check during final production QA.

## Hard constraints carried into any future session on this file

- Never begin Phase 8 without the user's explicit instruction.
- Never broadly redesign Phase 7 — targeted, evidence-based fixes only.
- Deterministic only. Never touch `matching_v2`, `reference_v3`,
  `dispersion_v1`, `calibration_v3`, `greatness_v1`, or any Phase 6.6
  algorithm.
- Never request or trigger a full 64-question quiz retake to verify a
  Phase 7 change — use the seeded token above (or generate a new
  synthetic `localStorage` draft) instead.
- Never explain copy/logic to the user before they've judged it live.
- No banned words in any authored copy: "advantage", "favour", "stronger
  = better", "score chasing", "fix", "improve your score", "weakness",
  "be more like".
- Never diagnose the historical person; never fabricate biographical
  flaws. Editorial `doNotCopyKeys` content only when defensibly supported
  by the sourced biographical record already in `seed.ts`/`roster2.ts`.
- STOP for human review after each implementation round. Do not proceed
  to the next target/stage without explicit instruction.
