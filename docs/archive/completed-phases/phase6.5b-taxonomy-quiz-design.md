> **ARCHIVED — historical reference only. Do not load by default.**
>
> This file is preserved for provenance/traceability. For current project
> state, see [`docs/context/CURRENT_STATE.md`](../../context/CURRENT_STATE.md).
> For active workflows, see `docs/workflows/`, `docs/checkpoints/`, and
> `docs/reference/`. Only open this file to resolve a specific historical
> question this session actually needs answered.

# Phase 6.5B — `taxonomy_v1.1` + Quiz v2 Detailed Design Gate

**Status: DESIGN-ONLY. Not implemented.** No production code was touched to
produce this document: `attributes.ts`, `bank.ts`, scoring logic, person
trait scores, `matching_v2`, `greatness_v1`, calibration, the reference
model, Phase 7 comparison code, production i18n, and the database schema
are all exactly as they were before this document was written. This is a
concrete, reviewable proposal for the next gate — approval or rejection is
the user's, not something this document grants itself. See CLAUDE.md
"Phase 6.5" and `docs/phase6.5-taxonomy-audit.md` for the research this
builds on, and `docs/phase7-provisional-checkpoint.md` for why Phase 7
stays paused regardless of this document's outcome until an explicit
decision is made.

---

## 1. Starting recommendation, re-tested rather than assumed

The Phase 6.5 audit's headline recommendation — four new attributes
(`opportunity_sensing`, `resourcefulness`, `proactive_agency`,
`belief_updating`), `tool_leverage`/`feedback_orientation` as question
context rather than canonical traits, `network_leverage` deferred — is
treated here as a hypothesis to stress-test, not a conclusion to
transcribe. §6-§10 re-derive each new trait's boundaries against the full
34-trait system rather than against the existing 30 in isolation, and §7
tests three genuinely different facet placements for all four before
picking one. The four survive that re-test (detail in §6-§7); nothing here
is a rubber stamp of the earlier document.

---

## 2. Product goal, restated as a design constraint

The measurable target: no single scenario context (work/project framing
above all) should dominate the questionnaire the way it currently does.
§15 reports the actual context distribution of the proposed Quiz v2
against the fourteen contexts listed in the brief (technology, scarcity,
disagreement, opportunity, everyday life, etc.) and flags if any one
exceeds roughly 20-25% of items — the same kind of concentration that
made `work_style` both the longest section and the most measurement-
troubled facet in `taxonomy_v1` (`docs/phase6.5-taxonomy-audit.md` §1).

---

## 3. Quiz-length discipline — the actual arithmetic, not a target asserted

**Preferred range: 54-60. Recommended figure in this proposal: 63,
justified below rather than forced down to fit.**

Starting point: 56 current items, 30 traits, all four coverage-guard
floors already satisfied (≥3 items/attribute, no item >55% share).

**What four new traits cost, done honestly.** Phase 4's own history is
the cautionary tale here (CLAUDE.md "Phase 4"): attributes launched with
only 2-3 items and no dedicated bidirectional item needed *three separate
corrective rounds* later. Repeating that mistake for four brand-new
attributes would be worse, not better, than paying the item cost up front.
Floor discipline for each new attribute: **3 items minimum, genuinely
bidirectional from item one** — not retrofitted later. That is 12 items
if built from scratch.

**Where the savings actually come from.** Rather than 12 purely additive
items, this design **repurposes four existing item slots** — q05, q15
(one option), q40, and q52 (one option) — into anchors for the four new
traits (full text in §8). Each of these was independently chosen because
its *existing scenario* was already structurally adjacent to the new
construct (q05's "an unfamiliar field turns out to matter" is already an
opportunity-recognition scenario; q40's "you've reached a conclusion,
new evidence appears" is already a belief-revision scenario) — this is
not a cosmetic relabelling, the scenarios were already doing most of the
conceptual work. That repurposing means only **8 additional dedicated
items** are needed (2 per new trait) to reach 3 total per trait, not 12.

**What real, low-collateral removal actually yielded — this is the
important negative result.** §4 below audits every attribute flagged in
the Phase 6.5 audit as "over-measured" (`analytical_rigor`,
`execution_speed`, `ambiguity_tolerance`) at the level of individual item
composition, not just raw item count. The finding: **most of their item
count is secondary co-loading on items whose primary attribute is
something else** (e.g. `analytical_rigor` rides secondary on q02's
`intuitive_synthesis` item, q03's `systems_abstraction` item, q17's
`persistence`/`collaboration` item) — cutting those items to trim
`analytical_rigor` would cost the *other* attribute more than it would
fix this one, several of which are already at or near their own floor.
**Only two items in the entire 56-item bank were found to be genuinely
low-collateral removals**: q01 and q27, both 4-way situational openers
whose four one-sided attribute-effects each *already* have independent,
adequate dedicated coverage elsewhere in the bank (detail in §4). Removing
both is also a welcome side effect for a separately-flagged issue: both
were the "heaviest cognitive format first" problem `docs/quiz-structure.md`
already flagged for their sections.

**The arithmetic:** 56 − 2 (q01, q27 removed) + 8 (new dedicated items,
2 per new trait) + 1 (decisiveness fix, §5) = **63**. An optional 64th
item (a collaboration fix, also §5) is presented separately, not folded
into the core count.

**Why 63 and not forced down to 60.** Every further cut candidate this
design considered either (a) breaches the 3-item floor for an attribute
already at minimum coverage, or (b) removes one of the bank's
higher-quality bidirectional trade-off pairs (q36, q46) to save a count
that isn't actually redundant with anything else — trading real
measurement quality for a rounder number. Per the brief's own escape
clause ("only recommend >60 if you can demonstrate that adequate
measurement cannot reasonably be preserved otherwise"): this is that
demonstration. If strict adherence to 60 is wanted anyway, §11 flags
the two lowest-cost ways to shave 3 more items and their explicit
quality trade-off, for the reviewer to decide, not for this document to
decide unilaterally.

## 4. Measurement-redundancy audit, trait by trait

Following the instruction explicitly: **do not assume an attribute is
over-measured merely because several items look similar.** Every trait
flagged as heavy in `docs/phase6.5-taxonomy-audit.md` §1 was re-examined
here at the level of *which specific items contribute, and to what else*
— not just the raw item count `diagnose.ts` reports.

**`analytical_rigor` (8 items) — mostly necessary, not redundant.**
Composition: q02 (primary `intuitive_synthesis`, `analytical_rigor`
secondary/bidirectional), q03 (primary `systems_abstraction`, secondary),
q05 (secondary, now reassigned — see §8), q07 (primary
`planning_orientation`/`experimentation`, secondary), q17 (primary
`persistence`/`collaboration`/`adaptability`, secondary — `persistence`
is at the 3-item floor, this item cannot be touched), q20 (bidirectional
trade-off, also carries `decisiveness`/`intuitive_synthesis`), q40 (now
reassigned — see §8), q53 (dedicated Phase-4 fix, bidirectional,
valuable). **Finding: once q05 and q40 are reassigned to new traits (§8),
every remaining `analytical_rigor` item is either a valuable dual-purpose
item propping up an at-or-near-floor attribute, or the one genuinely
dedicated fix.** No further cut is recommended — cutting q02/q03/q17/q20
would weaken `intuitive_synthesis`, `systems_abstraction`, `persistence`,
or `collaboration` more than it would fix `analytical_rigor`. Net
reduction from the two reassignments alone: 8 → 6 items.

**`execution_speed` (8 items) — same pattern.** q05 and q15's option (c)
(both reassigned in §8) were `execution_speed`'s two most isolated,
lowest-collateral secondary loadings. The remaining six (q07, q12, q16,
q37, q47, and one more secondary mention) are either dual-purpose items
propping up `experimentation`/`decisiveness`/`perfectionism`/`deep_focus`
or genuinely dedicated Phase-4 items (q16, q37). No further cut
recommended for the same reason as `analytical_rigor`. Net reduction:
8 → 5 (only 5, not 6, because q15's option (c) was previously
`execution_speed`-primary, not merely secondary — a larger natural trim
than for `analytical_rigor`).

**`ambiguity_tolerance` (7 items) — same pattern, smaller effect.** q05's
reassignment removes one secondary mention. The remaining six (q15b,
q19, q36, q45, q49, plus one more) are dual-purpose or dedicated. No
further cut recommended. Net reduction: 7 → 6.

**`mastery_orientation` (7 items) — genuinely well-behaved, no cut
needed on its own merits (sigFreq 1.1%, already well-controlled by its
Phase-4/Phase-2 fixes) — but it loses two secondary mentions "for free"**
as a side effect of removing q01 and q27 (§4 continues below), landing at
5, which is a healthy, still-generous margin above its 3-item floor.

**`perfectionism` / `detail_orientation` — the one real redundancy
finding, deliberately NOT actioned this round.** This pair remains the
strongest empirical redundancy signal in the taxonomy (both near-zero
signature frequency despite 5-6 dedicated items each, three items
co-loading both — `docs/phase6.5-taxonomy-audit.md` §1). Cutting either
now risks the same "weakens reliability" problem flagged for
`analytical_rigor`/`execution_speed`, and a merge decision is a bigger
structural call than this length-budget exercise should make unilaterally.
**Recommendation: flag for a dedicated `perfectionism`/`detail_orientation`
merge review as its own follow-up question, explicitly out of scope for
this Quiz v2 proposal.** Left untouched here.

**`deep_focus` / `planning_orientation` — left untouched, on the same
"don't assume, verify" principle.** Both scanned item-by-item; their
items use genuinely different framings (free-time choice, ten-year shape,
absorbing-work driver, dedicated skill statement, trade-off, repetitive-
practice statement for `mastery_orientation`; committing-to-order,
plan-rebuild, dedicated statement, trade-off for `planning_orientation`) —
not near-duplicates. No cut recommended.

**`autonomy_need` and `leadership_drive` (6 and 5 items respectively) —
no dedicated cut needed**; `autonomy_need` loses one secondary mention
(6→5) as a side effect of q52's option-(a) reassignment (§8), which is
sufficient.

**`curiosity` (5 items) — loses one secondary mention** (5→4) as a side
effect of q05's reassignment, sufficient on its own; no separate cut
recommended.

**q01 and q27 — the two real, low-collateral removals.** Both are 4-way
situational items where **every one of the four options' attribute
effects already has independent, adequate dedicated coverage elsewhere**:
- q01 (opens s1_thinking): `curiosity` (dedicated q38), `mastery_
  orientation`/`deep_focus` (dedicated q34/q55, q56), `planning_
  orientation`/`detail_orientation` (dedicated q36/q54, and q14/q46),
  `social_assertiveness`/`collaboration` (other items, dedicated q33).
- q27 (opens s6_drive): `mastery_orientation`/`deep_focus` (as above),
  `achievement_drive`/`competitiveness` (dedicated q50, other items),
  `impact_motivation`/`leadership_drive` (dedicated q42/q29, other
  items), `autonomy_need`/`independent_thinking` (dedicated q32/q51,
  other items).

Removing both trims eight distinct one-sided secondary loadings at once,
none dropping any attribute below its floor, **and** independently fixes
the exact "opens with its heaviest cognitive format" issue
`docs/quiz-structure.md` already flagged for both sections — a genuine
two-for-one, not a coincidence manufactured to justify the cut. Their
freed opening slots become the new sections' openers in Quiz v2 — a
gentle graded-likert item instead of a 4-way situational (§11, §14).

**Separating type A from type B repetition, applied fresh to the traits
this task specifically asked about** (deep focus, perfectionism/
refinement, risk tolerance, ambiguity tolerance, leadership, persuasion,
autonomy, persistence, planning): re-examined individually, and in every
case except `perfectionism`/`detail_orientation` (flagged above) and the
already-known q21/q39 adjacency (resolved by reordering, not deletion —
§14), the items use genuinely different behavioural framings (preference
statement vs. trade-off vs. situational choice vs. dedicated graded
statement) rather than restating one scenario. **This audit found no
additional low-information experiential-repetition cluster beyond the
one `docs/quiz-structure.md` already identified.**

---

## 5. Residual issues, causally investigated

### `decisiveness` — root cause identified, not assumed

Pulled the exact six contributing items directly from `bank.ts`, not
reconstructed from a summary:

| Item | Type | `decisiveness` role | Weight | One-sided? |
|---|---|---|---|---|
| q02 | forced_choice | secondary (option b only) | 0.7 | one-sided |
| q05 | situational | secondary (option c only) | 0.8 | one-sided |
| q12 | forced_choice | secondary (option b only) | 0.7 | one-sided |
| q18 | likert | secondary (`risk_tolerance` primary) | 0.6 | bidirectional (likert) |
| q20 | forced_choice | primary, both options | ~0.95 | bidirectional |
| q40 | forced_choice | primary, both options | ~0.85 | bidirectional |

One-sided share ≈ (0.7+0.8+0.7)/4.9 ≈ **45%** — matches `trait-diagnostic.
ts`'s reported figure exactly, confirming this reconstruction is
accurate, not approximate.

**The finding the raw one-sidedness number hides: `decisiveness` has no
dedicated single-attribute graded (likert) item at all.** Every attribute
that received a Phase-4 one-sidedness fix got a *dedicated bidirectional
likert item* (`intuitive_synthesis`→q31, `autonomy_need`→q32,
`analytical_rigor`→q53, `planning_orientation`→q54, `mastery_
orientation`→q55, `deep_focus`→q56). `decisiveness` never did — its only
bidirectional signal comes from **two forced-choice trade-off pairs
(q20, q40) that are themselves near-duplicates of each other**: q20 ("A
decision has to be made and the information is incomplete... decide now
and correct course later, or wait until you can see more clearly?") and
q40 ("You've reached a conclusion... act on it, or look for a way to
verify it first?") are the same underlying "commit now vs. verify first"
trade-off asked twice, three positions apart in the same section.

This is a **relapse of the Phase-2 item-bimodality mechanism** (CLAUDE.md
"Known open issues" #2a — binary forced-choice items producing bimodal
rather than graded score distributions), not the Phase-4 one-sidedness
mechanism that's been the project's focus since. `decisiveness`'s
`simSd`/`refSd` ratio (1.40) is the second-highest in the entire
taxonomy (after only `cross_domain_range`'s 1.48) — consistent with
bimodal, not graded, score generation — and its reference SD (17.0) is
tied for the smallest in the taxonomy, so that inflated spread converts
into an outsized z-score for a very large share of simulated users,
compounding into the 19.1% signature-trait frequency (the taxonomy's
highest by a wide margin). Mean-shift alone does not explain this: several
attributes with *larger* `meanDiff`s (`collaboration` +24.3,
`execution_speed` +20.4, `analytical_rigor` +20.0) all show *lower*
signature-trait frequency, because their bidirectional signal (where they
have any) comes from graded items, not paired binary trade-offs.

**Correction proposed, matching the already-proven fix pattern exactly —
not a weight reduction, not a cosmetic counter-item:** replace q40 (now
reassigned to `belief_updating`, §8, which independently removes one of
the two near-duplicate trade-offs) with a genuinely new slot: one
dedicated, bidirectional, graded likert item for `decisiveness`, the same
intervention already validated six times for six other attributes.

> **New item, s4_uncertainty:** "When a decision needs to be made and I
> already have most of what I need to know, I'd rather commit and move
> than keep gathering information." → `decisiveness` +1.0 (w1.1),
> bidirectional by construction (likert).

This simultaneously removes the bimodal-trade-off-pair duplication (fixes
the causal mechanism identified above) and the experiential near-
duplication of q20/q40 (fixes the UX-repetition angle) — one change,
addressing both, per the instruction not to add cosmetic counter-items on
top of an unaddressed root cause.

### `collaboration` — improvement proposed separately, not forced

Confirmed from `bank.ts` directly: `collaboration`'s only bidirectional
item is q33 (dedicated likert, weight 1.0); its other five appearances
(q01d, q17d, q23a, q25b, q52b) are all one-sided, summing to ≈82% of its
total weight — matches `trait-diagnostic.ts` exactly. Phase 5 already
established this is not currently distorting matching outcomes (ablating
q33 entirely moved Buffett's domination figure by only +0.3pp), so **this
is not treated as an issue requiring correction** — per instruction, not
modified merely to make the percentage look better.

Quiz v2 does, however, present a genuine free opportunity: since q23's
option (a) is `collaboration`'s single heaviest one-sided item (weight
1.2) and q23's option (b) already carries the *opposite*-direction
`autonomy_need` signal, a second dedicated bidirectional item would
give `collaboration` real graded signal for the first time, matching the
same proven pattern as the `decisiveness` fix above. **Proposed as a
genuinely optional 64th item, not folded into the core 63-item count**:

> **Optional item, s5_people:** "Even when I could get something done
> faster by just handling it myself, I'll loop other people in if it's
> something they actually have a stake in." → `collaboration` +1.0
> (w1.0), bidirectional (likert).

## 6. Proposed `taxonomy_v1.1` as one coherent system

All 30 existing attributes are **retained unmodified** (id, facet,
`contributionShape`, reference values all unchanged — no re-scoring of
any existing person data is triggered by this taxonomy). Full spec below
covers only what's new or changed; the existing 30 are summarised by
reference to `docs/phase6.5-taxonomy-audit.md` §1, not repeated in full
here.

### New attribute 1 — `opportunity_sensing`

- **Facet:** `world_sense` (new — see §7)
- **Definition:** Noticing weak signals, emerging patterns, or shifts in
  the surrounding environment before they're obvious to others.
- **Status:** New.
- **Nearest overlapping traits:** `curiosity` (pursuing a thread once
  found, not detecting it), `cross_domain_range` (connecting known
  distant fields, not scanning for new signal), `systems_abstraction`
  (structural reasoning about a bounded known problem, not open-ended
  environmental scanning).
- **Why discriminably useful:** none of the 30 existing attributes ask
  "did you notice this before it was obvious" — confirmed by re-checking
  all 30 items in `docs/phase6.5-taxonomy-audit.md` §1, not merely
  asserted.
- **High-end advantage:** positioned to act early; generates option value.
- **High-end cost:** over-attends to signal/noise; chases every shift;
  can undercut sustained follow-through (real tension with `deep_focus`,
  encoded directly in item design — §8).
- **Low-end advantage:** protects focus on a chosen path; resistant to
  chasing every new signal.
- **Low-end cost:** may miss a genuine, actionable shift.
- **Historical scoreability:** High — "noticed X before anyone else did"
  is a common cross-era biographical beat.
- **Cross-era/cultural concern:** Low — the construct doesn't presuppose
  markets, institutions, or modern information channels.
- **Evidence confidence:** High (Tang, Kacmar & Busenitz 2012, validated
  three-dimension scale, decade of replication).
- **`contributionShape`:** `contextual` (helps most paired with
  follow-through capacity; no flat "more is better" claim).

### New attribute 2 — `resourcefulness`

- **Facet:** `world_sense`
- **Definition:** Making genuine progress with limited or imperfect
  resources by recombining what's already at hand.
- **Status:** New.
- **Nearest overlapping traits:** `experimentation` (trying untested
  approaches regardless of resource level), `cross_domain_range`
  (connecting distant fields, not making do within one).
- **Why discriminably useful:** a highly experimental, well-resourced
  person and a highly resourceful, constrained person are not the same
  profile — constraint-orientation is a genuinely different axis from
  domain-breadth or trial-orientation.
- **High-end advantage:** unblocked by imperfect conditions; adaptive
  reuse of what exists.
- **High-end cost:** bricolage solutions can be fragile or non-scalable;
  "good enough" can quietly become a ceiling; can mean under-investing in
  better resources when they were actually attainable.
- **Low-end advantage:** invests in proper tooling/infrastructure,
  produces more robust and scalable outcomes *when resources are actually
  available* — a genuinely non-deficient stance, not a fallback
  description.
- **Low-end cost:** stalls when the ideal resource genuinely isn't
  available.
- **Historical scoreability:** High, with a distinctive extra property —
  "made do with limited means" is an unusually rich vein of biographical
  evidence, especially for figures who were *not* well-resourced, which
  helps counterbalance the dataset's existing tilt toward well-resourced
  achievers.
- **Cross-era/cultural concern:** Low.
- **Evidence confidence:** High (Baker & Nelson 2005, canonical field
  study, though the individual-trait formulation is a step beyond the
  original firm-level study — see `docs/phase6.5-taxonomy-audit.md` §3).
- **`contributionShape`:** `contextual`.

### New attribute 3 — `proactive_agency`

- **Facet:** `world_sense`
- **Definition:** Initiating change in one's circumstances or environment,
  as distinct from adapting to change once it happens or executing a goal
  once it's been assigned.
- **Status:** New.
- **Nearest overlapping traits, differentiated explicitly:**
  - `leadership_drive` presupposes a group context ("wants to set
    direction for a group"); proactive agency requires no group and no
    assigned role.
  - `execution_speed` measures speed once something has started, not
    whether the person is the one who started it.
  - `achievement_drive` presupposes the goal already exists; proactive
    agency is about creating the goal or opening in the first place.
  - `autonomy_need` measures a *preference* for self-directed work,
    compatible with either high or low proactive agency (wanting to be
    left alone is not the same as initiating anything unasked).
  - `persistence` measures staying with a chosen course, not starting one
    unprompted.
  - `social_assertiveness` measures speaking up in a room, not acting on
    the world absent any social prompt at all.
- **Why discriminably useful:** a highly disciplined, fast-executing,
  achievement-driven person can still be entirely reactive; a slow,
  low-execution-speed person can still be the one who starts everything.
  No existing attribute captures "acted without being asked or assigned
  to."
- **High-end advantage:** shapes circumstances rather than only responding
  to them; creates openings that wouldn't otherwise exist.
- **High-end cost:** friction with existing structures and people; risk
  of acting before sufficient buy-in or understanding; overreach.
- **Low-end advantage:** low interpersonal friction; executes assigned
  direction efficiently — genuinely valuable in tightly-coordinated
  systems (chain of command, ensemble work, specialist roles inside a
  larger structure) where unsanctioned initiative is actively costly, not
  merely "less good."
- **Low-end cost:** misses openings nobody else will create either.
- **Historical scoreability:** High — "took the initiative to... without
  being asked/authorised" is a common, well-evidenced biographical beat
  across the roster's full era and domain range.
- **Cross-era/cultural concern:** Low-moderate — "unsanctioned initiative"
  reads differently across cultures/eras with different norms around
  hierarchy; scoring must stay behaviourally concrete (what was actually
  done) rather than inferring intent.
- **Evidence confidence:** High (Bateman & Crant 1993; Morrison & Phelps
  1999; meta-analytic confirmation of distinctness — Thomas, Whitman &
  Viswesvaran 2010).
- **`contributionShape`:** `contextual`.

### New attribute 4 — `belief_updating`

- **Facet:** `thinking` (not `world_sense` — see §7 for why)
- **Definition:** What happens when meaningful evidence contradicts an
  existing belief, strategy, or identity-relevant position — specifically
  whether the underlying view itself is revised, not just outward
  behaviour.
- **Status:** New.
- **Nearest overlapping traits, differentiated explicitly:**
  - `adaptability`'s own flagship item (q39) measures *behavioural*
    strategy-switching ("drop it and switch") — a person can switch
    tactics repeatedly while still privately believing the original read
    was correct. `belief_updating` measures the belief itself changing,
    not just the plan.
  - `analytical_rigor` measures reasoning quality on a given question, not
    response to being shown one was wrong.
  - `independent_thinking`, as currently authored, rewards holding a
    position against the room in every one of its items (q04, q23b) —
    with no item anywhere distinguishing principled, evidence-tracking
    conviction from simple refusal to update. A person high on
    `independent_thinking` and low on `belief_updating` (holds positions,
    rarely updates) reads completely differently from one high on both
    (holds positions, updates when warranted) — the current taxonomy
    cannot currently tell these two apart.
  - Not "intellectual confidence" or "indecisiveness" — a person can be
    highly confident in a position that IS well-updated (confidence and
    updating frequency are orthogonal), and can be indecisive (low
    `decisiveness`) while never actually revising an underlying belief at
    all (indecision is about committing to action, not about whether a
    model of the world has changed).
- **Why discriminably useful:** demonstrated directly above — this is the
  clearest, most specific gap of the four.
- **High-end advantage:** revises views when evidence genuinely warrants
  it; avoids identity-entrenchment.
- **High-end cost:** can read as lacking conviction if revisions are
  frequent or visible; taken far enough, risks abandoning correct-but-
  early ideas before evidence has had time to accumulate.
- **Low-end advantage — historically real, not a consolation prize:**
  several major historical breakthroughs (heliocentrism, continental
  drift) survived their own early, genuinely misleading disconfirming
  evidence *because* their originators did not update prematurely. Low
  `belief_updating` combined with a genuinely correct early model is a
  real, historically evidenced advantage, not a deficiency dressed up as
  balance.
- **Low-end cost:** entrenches genuinely wrong models just as readily as
  it protects genuinely right ones — the trait itself cannot tell the two
  cases apart, which is honest, not a flaw in the formulation.
- **Historical scoreability:** Moderate-high — explicit public reversals
  under evidence are scarcer to find than general adaptability evidence,
  but where present are usually unambiguous.
- **Cross-era/cultural concern:** Low — evidence-contradicts-belief is not
  a culturally or temporally specific situation.
- **Evidence confidence:** High (Leary et al. 2017 General Intellectual
  Humility Scale, four-dimension structure; Baehr & Howard-Snyder 2018).
- **`contributionShape`:** `balanced` — this is the cleanest non-checklist
  formulation among all four candidates (see `docs/phase6.5-taxonomy-
  audit.md` §6), and notably the taxonomy's first attribute with a
  historically-evidenced, not merely logically-possible, case for the low
  pole.

### Rejected-as-independent-trait candidates, reconfirmed

Re-tested against the full 34-trait system, not just the original 30:
- **`tool_leverage`**: still collapses into `experimentation` +
  `adaptability` + `curiosity` once stated precisely; still risks reading
  as "digital literacy." Used as question context only (§9).
- **`feedback_orientation`**: still substantially redundant with
  `belief_updating` (now that it exists) plus `collaboration`. Used as
  question context only (§10) — in fact, `belief_updating`'s own
  dedicated item (§8) already *is* a feedback scenario, folding this
  candidate's best content directly into the new trait rather than
  duplicating it.
- **`network_leverage`**: still deferred — Burt's own framework treats
  brokerage as a property of network position, not a stable individual
  disposition, one inferential step further removed than the other three;
  historical evidence is thinner and coarser-grained. Revisit only after
  the four above have proven out.

No attribute in the current 30 is proposed for removal. `perfectionism`/
`detail_orientation` merge remains flagged for a future, separate review
(§4) — not actioned in this proposal.

---

## 7. Facet architecture — three real alternatives tested, not one assumed

**Per-trait placement tested individually first, not defaulted into one
bucket:**

- **`opportunity_sensing`** — tested against `thinking`: rejected, because
  `thinking`'s existing five attributes all reason about a bounded, known
  problem (`analytical_rigor`, `systems_abstraction`) or generate ideas
  from what's already present (`intuitive_synthesis`) — none scan an
  open, unbounded external environment for new signal. The outward-
  directed quality is real and distinct enough to anchor its own facet.
- **`belief_updating`** — tested against `world_sense`: rejected, because
  belief updating is about revising an *internal* model, not about the
  external world — it fits naturally beside `analytical_rigor`/
  `independent_thinking`/`intuitive_synthesis` in `thinking`, which is
  where it's placed.
- **`resourcefulness`** — tested against `work_style` (the closest
  existing analogue to a hypothetical "Executing" facet): rejected,
  because `work_style`'s attributes (`discipline`, `deep_focus`,
  `planning_orientation`, etc.) describe internal process disposition,
  not the person's relationship to external constraint — the same
  outward-directed quality that motivates `opportunity_sensing`'s
  placement applies here too. Placed in `world_sense`.
- **`proactive_agency`** — tested against `motivation` (closest analogue
  to a hypothetical "Driving" facet) and `social` (closest analogue to
  "Influencing"): rejected both — `motivation` describes *why* someone
  wants things (internal drives), not *whether* they act on the
  environment absent assignment; `social` presupposes other people are
  involved, which `proactive_agency` explicitly does not require (per its
  own differentiation in §6). Placed in `world_sense`, completing a
  coherent three-part triad: notice the world (`opportunity_sensing`),
  use what it offers (`resourcefulness`), act to change it
  (`proactive_agency`).

### Architecture A — Minimal addition (recommended)

6 existing facets, fully unchanged in name and composition, + 1 new
facet `world_sense` (`opportunity_sensing`, `resourcefulness`,
`proactive_agency`). `belief_updating` → `thinking`. **7 facets, 34
traits total** (thinking 6, creativity 4, work_style 6, resilience 5,
social 5, motivation 5, world_sense 3).

### Architecture B — Split World Sense into two facets

Same as A, but `opportunity_sensing` alone anchors `world_sense` while
`resourcefulness`+`proactive_agency` form a separate `leverage` facet.
**8 facets, 34 traits** (world_sense 1, leverage 2, others unchanged).
**Rejected**: a facet with exactly one attribute is a real product
problem, not just an aesthetic one — the UI surfaces a "Closest World-
Sense Match" per facet (CLAUDE.md "Design system"), and a one-attribute
facet has no internal shape to compare, undermining the facet-match
feature specifically for the facet this whole exercise was meant to
strengthen. Splitting also does not improve conceptual coherence over A
— sensing, leveraging, and acting on the external world are a genuinely
unified theme, not three unrelated ones (see per-trait tests above).

### Architecture C — Full 8-9 facet rename + resilience split

The brief's own original hypothesis (Thinking / Creating / Executing /
Adapting / Influencing / Driving / World Sense / Leverage), tested fully
rather than dismissed by citation alone: rename `creativity`→Creating,
`work_style`→Executing, `social`→Influencing, `motivation`→Driving; split
`resilience` into `Adapting` (`adaptability`, `risk_tolerance`,
`ambiguity_tolerance`) + fold `persistence`/`decisiveness` into Driving.
**Rejected on two independent grounds**, both re-verified here rather
than assumed from the earlier audit: (1) "Influencing" specifically
misdescribes `collaboration`, which is about working *with* people, not
influencing *over* them — a rename that actively degrades one attribute's
clarity is a regression; (2) splitting `resilience` requires deciding
whether `decisiveness` (a commitment-speed trait) belongs with `Adapting`
(uncertainty-handling) or `Driving` (motivation) — it fits neither
cleanly, and forcing a decision here creates a worse home for it than the
status quo, not a better one. Cost: every `facet.*`/`facet.match.*` i18n
key in both locales, for zero scoring or measurement benefit.

### Comparison table

| | Coherence | Trait-count balance | User comprehension | Historical scoreability | Results UI usefulness | 1:1 comparison usefulness | Quiz variety |
|---|---|---|---|---|---|---|---|
| A (recommended) | High — genuine sense/leverage/act triad | Balanced, 3-6 per facet | Simple, one new label | Unaffected (trait-level, not facet-level) | Full — every facet has enough content for a real "closest match" | Full | Equal to B/C — variety comes from item content, not facet count |
| B | High per-facet, but 1-trait facet is thin | Imbalanced (1 vs. 2) | Adds a facet most people will see once | Unaffected | **Degraded** — 1-trait facet match is uninformative | Degraded for the same reason | Equal |
| C | Mixed — "Influencing" mislabels `collaboration` | Balanced but forced | Highest short-term novelty, questionable long-term clarity | Unaffected | Unclear net change | Unclear net change | Equal |

**Recommendation: Architecture A.** 7 facets, 34 traits.

## 8. New-trait item design, in full

Each new trait gets exactly 3 items: 1 reassigned anchor (an existing
item's scenario, retargeted — see §12 for its exact classification) + 2
freshly authored, both bidirectional by construction from day one. This
is a deliberate improvement over Phase 4's own history: no new attribute
here launches with a one-sided item pool waiting for a future corrective
round.

### `opportunity_sensing`

**Anchor (reassigned from q05, situational 3-way, position ~s1_thinking).**
Original scenario ("a field you know nothing about turns out to be
relevant") already did most of the conceptual work — retargeted rather
than replaced:

> "A field you've never paid attention to suddenly turns out to matter
> for something you care about. What's your first move?"
> - a. "Notice it's probably an opening and start figuring out how to use
>   it" → `opportunity_sensing` +1.0 (w1.1), `execution_speed` +0.4 (w0.6)
> - b. "Read into it for a while before deciding whether it's worth
>   anything" → `curiosity` +0.8 (w0.9), `analytical_rigor` +0.5 (w0.7)
> - c. "Note it and keep doing what you were already doing" →
>   `deep_focus` +0.6 (w0.8), `opportunity_sensing` −0.4 (w0.6)
>
> `opportunity_sensing` appears in options (a) and (c) with opposite
> signs → **bidirectional**, not one-sided — an improvement over the
> original q05, which was fully one-sided across all three options.

**New dedicated item 1 (likert, bidirectional):**

> "I tend to notice a shift in what's going on around me — a changing
> mood, a new pattern, an early sign of something — before people around
> me mention it." → `opportunity_sensing` +1.0 (w1.1)

**New dedicated item 2 (forced-choice trade-off, bidirectional — a real
cost on both sides, not a virtue-vs-flaw framing):**

> "Which is closer to a real cost you've actually paid?"
> - a. "Missing a shift because I was completely absorbed in what I was
>   already doing" → `opportunity_sensing` +1.0 (w1.0), `deep_focus`
>   −0.4 (w0.6)
> - b. "Chasing a new signal that turned out to be nothing, at the
>   expense of what I was already doing" → `deep_focus` +0.6 (w0.8),
>   `opportunity_sensing` −0.5 (w0.7)

### `resourcefulness`

**Anchor (reassigned from q15's option (c) only; options (a)/(b) keep
their original `planning_orientation`/`adaptability` text and role
unchanged — this is why §12 classifies q15 as REWRITE, not a full
replacement).** Scenario reframed from "the plan turned out wrong" to a
resource-loss framing that room to also serve `resourcefulness`:

> "Partway into a long project, the resources you were counting on
> (budget, people, time, tools) turn out to be far less than you planned
> for. What do you do?"
> - a. "Rebuild the plan properly around the real numbers before
>   continuing" → `planning_orientation` +1.0 (w1.1), `discipline` +0.5
>   (w0.7)
> - b. "Adjust as you go and figure out the new shape while still moving"
>   → `adaptability` +0.9 (w1.0), `ambiguity_tolerance` +0.5 (w0.7)
> - c. "Find a way to get most of the value out of what's actually still
>   available" → `resourcefulness` +1.0 (w1.1), `execution_speed` +0.3
>   (w0.5)

**New dedicated item 1 (likert, bidirectional):**

> "When the tools or resources I'd ideally want aren't available, I can
> usually still find a workable way to do most of what I need with what's
> actually on hand." → `resourcefulness` +1.0 (w1.1)

**New dedicated item 2 (forced-choice trade-off, bidirectional):**

> "Facing a real resource shortfall on something that matters, which is
> closer to you?"
> - a. "Make do with an imperfect substitute and keep moving" →
>   `resourcefulness` +1.0 (w1.0), `execution_speed` +0.3 (w0.5)
> - b. "Hold off and push to get the real resource, even if it costs
>   time" → `resourcefulness` −0.6 (w0.8), `planning_orientation` +0.4
>   (w0.6)

### `proactive_agency`

**Anchor (reassigned from q52's option (a) only; options (b)/(c) keep
their original `collaboration`/`leadership_drive` text and role
unchanged — classified KEEP+REMAP in §12, the lightest-touch change of
the four reassignments):**

> "Working on a shared project, you notice a real problem nobody assigned
> you to fix. What's more likely?"
> - a. "Just start fixing it yourself before anyone asks" →
>   `proactive_agency` +1.0 (w1.1), `execution_speed` +0.3 (w0.5)
> - b. "Bring it to the group before deciding" → `collaboration` +1.0
>   (w1.0), `persuasiveness` +0.3 (w0.5) *(unchanged from original q52)*
> - c. "Take the lead on framing the decision for everyone" →
>   `leadership_drive` +0.6 (w0.8), `social_assertiveness` +0.5 (w0.7)
>   *(unchanged from original q52)*

**New dedicated item 1 (likert, bidirectional):**

> "I'll go ahead and change something about how things are done even
> when nobody put me in charge of it and nobody asked me to." →
> `proactive_agency` +1.0 (w1.1)

**New dedicated item 2 (forced-choice trade-off, bidirectional):**

> "You spot something that could clearly be better, but it's outside
> what you're actually responsible for. Which is closer to you?"
> - a. "Go ahead and act on it anyway" → `proactive_agency` +1.0 (w1.0)
> - b. "Flag it to whoever's actually responsible and let them decide" →
>   `proactive_agency` −0.5 (w0.7), `collaboration` +0.3 (w0.5)

### `belief_updating`

**Anchor (reassigned from q40, forced-choice 2-way).** Original scenario
("you've reached a conclusion, act or verify first?") was already, on
inspection, closer to `belief_updating` than to a second `decisiveness`
trade-off — retargeted entirely, which is also the fix that removes
`decisiveness`'s near-duplicate item pair (§5):

> "New, credible evidence suggests a conclusion you'd already settled on
> — and started acting on — is wrong. Which is closer to you?"
> - a. "Revise the conclusion and change course, even though you'd
>   already committed" → `belief_updating` +1.0 (w1.0), `decisiveness`
>   −0.3 (w0.5)
> - b. "The new evidence probably doesn't outweigh what you already
>   worked out — stay the course" → `belief_updating` −0.8 (w0.9),
>   `persistence` +0.3 (w0.5)

**New dedicated item 1 (likert, bidirectional — also doubles as a
feedback-context item, §10):**

> "When someone makes a genuinely good case against something I believe,
> I can feel my actual position shift, not just my willingness to argue
> about it." → `belief_updating` +1.0 (w1.1)

**New dedicated item 2 (forced-choice trade-off, bidirectional — encodes
the historically-real low-pole case directly, not just in the docs):**

> "You're several months into something built on a belief that's now
> getting real pushback, though nothing has actually disproven it yet.
> Which is closer to you?"
> - a. "Take the pushback seriously and re-examine the belief itself" →
>   `belief_updating` +1.0 (w1.0)
> - b. "Trust the original read and keep going — early pushback doesn't
>   mean much yet" → `belief_updating` −0.7 (w0.9), `persistence` +0.4
>   (w0.6)

### `decisiveness` fix (§5)

> "When a decision needs to be made and I already have most of what I
> need to know, I'd rather commit and move than keep gathering
> information." → `decisiveness` +1.0 (w1.1), bidirectional (likert).

### `collaboration` fix — optional 64th item (§5)

> "Even when I could get something done faster by just handling it
> myself, I'll loop other people in if it's something they actually have
> a stake in." → `collaboration` +1.0 (w1.0), bidirectional (likert).

---

## 9. Tool Leverage as question context — demonstrated, not just proposed

Not added as a canonical attribute (§6). Its product value is preserved
by writing scenarios *through* a tool/technology lens that still measure
an existing or new construct cleanly, with **no hidden "new tool good"
value judgment** — a person cautious about a new tool can be making a
fully rational choice, and the item design has to allow that reading.

**Candidate scenarios, illustrating the pattern (not additional canonical
items — see note below):**

1. *Measuring `adaptability` through a tool lens:* "A new method or tool
   could plausibly replace part of how you currently work, but switching
   would mean relearning things you're already fast at. Which is closer
   to you?" a) "Switch and eat the relearning cost" → `adaptability`
   +1.0. b) "Keep doing it the way that already works" → `adaptability`
   −0.6, `mastery_orientation` +0.3. Neither option is coded as the
   "right" answer — (b) is a legitimate expertise-protecting choice, not
   a deficiency.
2. *Measuring `resourcefulness` through a tool lens:* "You don't have
   access to the tool that would normally be used for something — which
   is closer to you?" a) "Find or improvise a workable substitute" →
   `resourcefulness` +1.0. b) "Wait until the right tool is actually
   available" → `resourcefulness` −0.5, `planning_orientation` +0.3.
3. *Measuring `opportunity_sensing` through a tool lens (offered as an
   optional alternate phrasing of new dedicated item 1, §8, not a second
   canonical item):* "I tend to notice when a new tool or method could
   change how something in my field gets done, before most people
   around me are talking about it."

**Why only illustrated, not shipped as extra items:** the era-neutral
phrasing already in §8 (a "shift... in what's going on around me")
generalises better across a 700-year roster than a tool-specific framing
does — da Vinci's optics instruments and a modern person's software tool
are the same underlying construct, but forcing every instance of the
construct through a tool lens risks exactly the "digital literacy"
collapse `docs/phase6.5-taxonomy-audit.md` warned about for a canonical
`tool_leverage` trait. **Recommendation: reserve scenario 1 above as a
strong candidate REWRITE target for one existing `adaptability` item in a
future revision (not this one — it would add a 65th item or require
removing an existing `adaptability` item, and `adaptability`'s current
5-item pool was already found in §4 to have no safe cut).** Flagged, not
implemented in this proposal's 63-item core.

## 10. Feedback as question context — evaluated, not made canonical

Same treatment. `belief_updating`'s own new dedicated item 1 (§8:
"When someone makes a genuinely good case against something I believe...")
already *is* a feedback-response scenario — this is the cleanest way to
get feedback-context variety into the quiz without a redundant standalone
construct (§6). Additional illustrative scenarios, for future
consideration, not proposed as extra items here:

1. *Measuring `collaboration`/`independent_thinking` through a
   disagreement lens:* "Two people whose judgement you trust give you
   opposite advice on something that matters. Which is closer to you?"
   a) "Look for a third perspective before deciding" b) "Weigh which of
   the two knows this specific situation better and go with them." Both
   options are competence-neutral — neither is "the smart answer."
2. *Measuring `analytical_rigor` through a criticism lens:* "You get
   sharp, specific criticism of something you made, from someone whose
   judgement you respect. What's your first instinct?" a) "Go back and
   check whether the criticism is actually right" b) "Sit with it for a
   while before deciding how much weight to give it." Deliberately not
   offering a defensive/dismissive third option, since that would be the
   transparent "wrong" answer (§13) and wouldn't discriminate anything.

## 11. Quiz v2 — the full proposed question bank

**63 items core, 64 with the optional `collaboration` fix (§5).** For the
51 items carried over completely unchanged (KEEP), exact prompt/option
text is not re-transcribed here — it is already fully documented,
verbatim, in `docs/quiz-structure.md`, and reproducing it a second time
would add bulk without new information. What's new here for KEEP items is
their **position, section, and status** in Quiz v2, which do change for
some. Full exact text for every REWRITE/REMAP/NEW item is in §8 — the
table below places each in its final position and cross-references §8
rather than repeating it a second time.

**Section rebalancing, decided deliberately, not incidentally.** New
items were placed to *reduce* `docs/quiz-structure.md`'s already-flagged
section-length imbalance (Section 3 at 12 items, 33-50% longer than every
other section), not compound it: `resourcefulness`'s two new dedicated
items went to the shortest section (`s2_ideas`, 8→was going to place in
s3_work but redirected) rather than the longest. Final distribution:
s1=10, s2=8, s3=12, s4=12, s5=11, s6=10 (63 total) — a narrower 8-12
range than the original 8/8/9/9/9/12, though s3/s4 remain the two longest
and a further 1-item rebalance toward s6 is possible if a reviewer wants
tighter parity; not forced here since neither placement is clearly wrong.

### Section 1 — "How You Think" (`s1_thinking`, `thinking` + `world_sense` facets) — 10 items

| Pos | ID | Type | Status | Primary trait(s) | Bi/one-sided | Note |
|---|---|---|---|---|---|---|
| 1 | q57 | likert | **NEW** | `opportunity_sensing` | bidirectional | New opener — gentle graded format, replaces q01's heavy 4-way opener. Full text §8. |
| 2 | q02 | forced_choice | KEEP | `analytical_rigor`/`intuitive_synthesis` | bidirectional | Unchanged. |
| 3 | q03 | likert | KEEP | `systems_abstraction` | bidirectional | Unchanged. |
| 4 | q04 | likert | KEEP | `independent_thinking` | bidirectional | Unchanged. |
| 5 | q05 | situational (3-way) | **REWRITE** | `opportunity_sensing` (was `curiosity`/`analytical_rigor`/`execution_speed`) | **now bidirectional** (was one-sided) | Anchor for new trait; full text §8. |
| 6 | q58 | forced_choice | **NEW** | `opportunity_sensing`/`deep_focus` | bidirectional | Trade-off; full text §8. |
| 7 | q31 | likert | KEEP | `intuitive_synthesis` | bidirectional | Unchanged. |
| 8 | q38 | likert | KEEP | `curiosity` | bidirectional | Unchanged. |
| 9 | q46 | forced_choice | KEEP | `systems_abstraction`/`detail_orientation` | bidirectional | Unchanged. Candidate cut if reviewer wants exactly 60 (§3) — costs a good trade-off pair, not recommended. |
| 10 | q53 | likert | KEEP | `analytical_rigor` | bidirectional | Unchanged. |

*(q01 removed — see §4, §12.)*

### Section 2 — "Ideas and Making" (`s2_ideas`, `creativity` facet + `world_sense` guests) — 8 items

| Pos | ID | Type | Status | Primary trait(s) | Bi/one-sided | Note |
|---|---|---|---|---|---|---|
| 11 | q06 | likert | KEEP | `creative_originality` | bidirectional | Unchanged. |
| 12 | q07 | forced_choice | KEEP | `experimentation`/`planning_orientation` | one-sided | Unchanged. |
| 13 | q08 | likert | KEEP | `aesthetic_sensitivity` | bidirectional | Unchanged. |
| 14 | q09 | situational (3-way) | KEEP | `cross_domain_range`/`deep_focus` | one-sided | Unchanged — at `cross_domain_range`'s floor, protected. |
| 15 | q10 | likert | KEEP | `creative_originality`/`experimentation` | bidirectional | Unchanged. |
| 16 | q35 | likert | KEEP | `cross_domain_range` | bidirectional | Unchanged. |
| 17 | q41 | likert | KEEP | `experimentation` | bidirectional | Unchanged. |
| 18 | q48 | likert | KEEP | `perfectionism` | bidirectional | Unchanged. |

*(Originally 8, unchanged — `resourcefulness`'s new items placed in Section 6 instead, see below, to protect this section's already-thin coverage from further stretch and keep the longest sections from growing further.)*

### Section 3 — "How You Work" (`s3_work`, `work_style` facet) — 12 items, unchanged in count

| Pos | ID | Type | Status | Primary trait(s) | Bi/one-sided | Note |
|---|---|---|---|---|---|---|
| 19 | q11 | likert | KEEP | `discipline` | bidirectional | Unchanged. |
| 20 | q12 | forced_choice | KEEP | `perfectionism`/`execution_speed` | one-sided | Unchanged. |
| 21 | q13 | likert | KEEP | `deep_focus` | bidirectional | Unchanged. |
| 22 | q14 | likert | KEEP | `detail_orientation`/`perfectionism` | bidirectional | Unchanged. Flagged in §4 as the strongest remaining redundancy pair with `perfectionism` — not cut this round. |
| 23 | q16 | likert | KEEP | `execution_speed`/`perfectionism` | bidirectional | Unchanged. |
| 24 | q34 | likert | KEEP | `mastery_orientation` | bidirectional | Unchanged. |
| 25 | q36 | forced_choice | KEEP | `planning_orientation`/`ambiguity_tolerance` | bidirectional | Unchanged. Candidate cut if reviewer wants exactly 60 — costs a good trade-off pair, not recommended. |
| 26 | q37 | likert | KEEP | `execution_speed` | bidirectional | Unchanged. |
| 27 | q47 | forced_choice | KEEP | `deep_focus`/`execution_speed` | bidirectional | Unchanged. |
| 28 | q54 | likert | KEEP | `planning_orientation` | bidirectional | Unchanged. |
| 29 | q56 | likert | KEEP | `deep_focus` | bidirectional | Unchanged. |
| 30 | q15 | situational (3-way) | **REWRITE** (option c only) | `planning_orientation`/`adaptability`/`resourcefulness` | c now bidirectional-eligible via anchor pairing with new items in §6 | Options (a)/(b) text unchanged; option (c) retargeted from `execution_speed`/`risk_tolerance`/`intuitive_synthesis` to `resourcefulness`. Full text §8. |

### Section 4 — "Uncertainty and Setbacks" (`s4_uncertainty`, `resilience` facet + `belief_updating` guest) — 12 items

| Pos | ID | Type | Status | Primary trait(s) | Bi/one-sided | Note |
|---|---|---|---|---|---|---|
| 31 | q17 | situational (4-way) | KEEP | `persistence`/`adaptability`/`analytical_rigor`/`collaboration` | mixed | Unchanged — `persistence`'s only bidirectional anchor, protected. |
| 32 | q18 | likert | KEEP | `risk_tolerance`/`decisiveness` | bidirectional | Unchanged. |
| 33 | q19 | likert | KEEP | `ambiguity_tolerance`/`planning_orientation` | bidirectional | Unchanged. |
| 34 | q20 | forced_choice | KEEP | `decisiveness`/`analytical_rigor`/`intuitive_synthesis` | bidirectional | Unchanged — kept as `decisiveness`'s one surviving trade-off (its near-duplicate partner q40 is now `belief_updating`, §5). |
| 35 | q63 | likert | **NEW** | `decisiveness` | bidirectional | Root-cause fix, §5, §8. Placed near its sibling q20. |
| 36 | q40 | forced_choice | **REWRITE** | `belief_updating` (was `decisiveness`/`analytical_rigor`) | bidirectional | Anchor for new trait; full text §8. |
| 37 | q61 | likert | **NEW** | `belief_updating` | bidirectional | Full text §8. |
| 38 | q62 | forced_choice | **NEW** | `belief_updating`/`persistence` | bidirectional | Full text §8. |
| 39 | q21 | likert | KEEP, **reordered** | `persistence`/`adaptability` | bidirectional | Moved further from q39 (was adjacent, positions 34-35 in v1) to resolve the flagged experiential-repetition pair — see §14. |
| 40 | q45 | likert | KEEP | `risk_tolerance`/`ambiguity_tolerance` | bidirectional | Unchanged. |
| 41 | q49 | likert | KEEP | `ambiguity_tolerance` | bidirectional | Unchanged. |
| 42 | q39 | likert | KEEP, **reordered** | `adaptability` | bidirectional | Moved away from q21 (§14) — both retained, per §4's "type A, not type B" finding; reordering, not deletion, is the fix. |

### Section 5 — "People" (`s5_people`, `social` facet + `proactive_agency` guest) — 11 items (12 optional)

| Pos | ID | Type | Status | Primary trait(s) | Bi/one-sided | Note |
|---|---|---|---|---|---|---|
| 43 | q22 | likert | KEEP | `social_assertiveness`/`persuasiveness`/`conflict_tolerance` | bidirectional | Unchanged. |
| 44 | q23 | forced_choice | KEEP | `collaboration`/`autonomy_need`/`independent_thinking` | mixed | Unchanged. |
| 45 | q24 | likert | KEEP | `leadership_drive`/`social_assertiveness` | bidirectional | Unchanged. |
| 46 | q25 | situational (3-way) | KEEP | `conflict_tolerance`/`independent_thinking`/`collaboration`/`persuasiveness`/`leadership_drive` | mixed | Unchanged — `conflict_tolerance`'s only bidirectional anchor, protected. |
| 47 | q26 | likert | KEEP | `persuasiveness` | bidirectional | Unchanged. |
| 48 | q33 | likert | KEEP | `collaboration` | bidirectional | Unchanged — `collaboration`'s only current bidirectional item. |
| 49 | (optional) | likert | **NEW, optional** | `collaboration` | bidirectional | Optional 64th item, §5, §8 — second bidirectional anchor for `collaboration`. |
| 50 | q43 | likert | KEEP | `leadership_drive` | bidirectional | Unchanged. |
| 51 | q44 | likert | KEEP | `persuasiveness` | bidirectional | Unchanged. |
| 52 | q52 | situational (3-way) | **KEEP+REMAP** (option a only) | `proactive_agency`/`collaboration`/`leadership_drive` | a now bidirectional-eligible via new item pairing | Options (b)/(c) text fully unchanged; option (a) retargeted from `autonomy_need`/`execution_speed` to `proactive_agency`. Lightest-touch change of the four reassignments. Full text §8. |
| 53 | q64 | likert | **NEW** | `proactive_agency` | bidirectional | Full text §8. |
| 54 | q65 | forced_choice | **NEW** | `proactive_agency`/`collaboration` | bidirectional | Full text §8. |

### Section 6 — "What Drives You" (`s6_drive`, `motivation` facet + `resourcefulness` guest) — 10 items

| Pos | ID | Type | Status | Primary trait(s) | Bi/one-sided | Note |
|---|---|---|---|---|---|---|
| 55 | q28 | likert | KEEP, **new opener** | `competitiveness`/`achievement_drive` | bidirectional | Promoted to section opener — gentler than q27's removed 4-way format. |
| 56 | q29 | likert | KEEP | `impact_motivation`/`curiosity` | bidirectional | Unchanged. |
| 57 | q30 | likert | KEEP | `achievement_drive`/`autonomy_need`/`competitiveness` | bidirectional | Unchanged. |
| 58 | q32 | likert | KEEP | `autonomy_need` | bidirectional | Unchanged. |
| 59 | q59 | likert | **NEW** | `resourcefulness` | bidirectional | Full text §8. Placed here (not `s2_ideas`/`s3_work`) to avoid growing the already-longest sections further. |
| 60 | q60 | forced_choice | **NEW** | `resourcefulness`/`execution_speed` | bidirectional | Full text §8. |
| 61 | q42 | likert | KEEP | `impact_motivation`/`mastery_orientation` | bidirectional | Unchanged. |
| 62 | q50 | likert | KEEP | `achievement_drive` | bidirectional | Unchanged. |
| 63 | q51 | likert | KEEP | `autonomy_need` | bidirectional | Unchanged. |
| — | q55 | likert | KEEP | `mastery_orientation` | bidirectional | Unchanged — retained as section closer, same as v1. |

*(q27 removed — see §4, §12. Position count: this section lists 10 rows
including q55; the "63" section-count table earlier already includes it —
`s6_drive` totals 10, matching §11's opening distribution summary.)*

**Type-mix check, whole bank:** situational (3/4-way) items never sit
adjacent to another situational item anywhere in the proposed order —
preserved from v1 by construction (all new situational placements were
checked against this). Forced-choice trade-off pairs remain embedded
inside runs of likert items, not clustered — also preserved.

## 12. Migration map — every original q01-q56, classified

| ID | Classification | Reason |
|---|---|---|
| q01 | **REMOVE** | All 4 options' attribute-effects already independently covered by dedicated items elsewhere; also the "heaviest format first" issue (§4). |
| q02 | KEEP | — |
| q03 | KEEP | — |
| q04 | KEEP | — |
| q05 | **REWRITE** | Retargeted to `opportunity_sensing` anchor; scenario already structurally adjacent (§8). |
| q06 | KEEP | — |
| q07 | KEEP | Touches `experimentation` (floor-level); no safe cut (§4). |
| q08 | KEEP | — |
| q09 | KEEP | Touches `cross_domain_range` (floor-level); no safe cut (§4). |
| q10 | KEEP | — |
| q11 | KEEP | — |
| q12 | KEEP | — |
| q13 | KEEP | — |
| q14 | KEEP | Redundancy with `perfectionism` flagged but deliberately not actioned this round (§4). |
| q15 | **REWRITE** (option c only) | Option (c) retargeted to `resourcefulness`; (a)/(b) unchanged (§8). |
| q16 | KEEP | — |
| q17 | KEEP | `persistence`'s only bidirectional anchor; protected (§4). |
| q18 | KEEP | — |
| q19 | KEEP | — |
| q20 | KEEP | Retained as `decisiveness`'s one surviving trade-off, now that its near-duplicate q40 is reassigned (§5). |
| q21 | KEEP, reordered | Moved away from q39 to resolve experiential-repetition pairing; not deleted, both needed (§4, §14). |
| q22 | KEEP | — |
| q23 | KEEP | — |
| q24 | KEEP | — |
| q25 | KEEP | `conflict_tolerance`'s only bidirectional anchor; protected (§4). |
| q26 | KEEP | — |
| q27 | **REMOVE** | Same pattern as q01 — all 4 options' effects independently covered elsewhere; also the section's heaviest-format-first issue (§4). |
| q28 | KEEP, promoted to opener | Replaces q27 as `s6_drive`'s lead item — gentler likert format. |
| q29 | KEEP | — |
| q30 | KEEP | — |
| q31 | KEEP | — |
| q32 | KEEP | — |
| q33 | KEEP | `collaboration`'s only current bidirectional item; protected. |
| q34 | KEEP | — |
| q35 | KEEP | — |
| q36 | KEEP | Candidate cut only if reviewer insists on exactly ≤60 (§3, §11) — not recommended, costs a good trade-off pair. |
| q37 | KEEP | — |
| q38 | KEEP | — |
| q39 | KEEP, reordered | Paired with q21 above; both retained (§4, §14). |
| q40 | **REWRITE** | Retargeted to `belief_updating` anchor; also removes `decisiveness`'s near-duplicate trade-off pair, the root-cause fix (§5, §8). |
| q41 | KEEP | — |
| q42 | KEEP | — |
| q43 | KEEP | — |
| q44 | KEEP | — |
| q45 | KEEP | — |
| q46 | KEEP | Candidate cut only if reviewer insists on exactly ≤60 (§3, §11) — not recommended. |
| q47 | KEEP | — |
| q48 | KEEP | — |
| q49 | KEEP | — |
| q50 | KEEP | — |
| q51 | KEEP | — |
| q52 | **KEEP+REMAP** (option a only) | Option (a) retargeted to `proactive_agency`; (b)/(c) text fully unchanged (§8). |
| q53 | KEEP | — |
| q54 | KEEP | — |
| q55 | KEEP | Retained as `s6_drive`'s closer, unchanged from v1. |
| q56 | KEEP | — |

**Totals: KEEP 50, KEEP+REMAP 1, REWRITE 3, REMOVE 2.** (50+1+3+2 = 56 ✓)

### New questions (full text in §8; index only here)

| ID | Trait | Type | Status |
|---|---|---|---|
| q57 | `opportunity_sensing` | likert | NEW — new opener, `s1_thinking` |
| q58 | `opportunity_sensing`/`deep_focus` | forced_choice | NEW |
| q59 | `resourcefulness` | likert | NEW |
| q60 | `resourcefulness`/`execution_speed` | forced_choice | NEW |
| q61 | `belief_updating` | likert | NEW |
| q62 | `belief_updating`/`persistence` | forced_choice | NEW |
| q63 | `decisiveness` | likert | NEW — root-cause fix |
| q64 | `proactive_agency` | likert | NEW |
| q65 | `proactive_agency`/`collaboration` | forced_choice | NEW |
| (opt.) | `collaboration` | likert | NEW, **optional 64th item** |

**9 new items in the core 63-question proposal, 10 with the optional
collaboration item.** Combined with 2 removals and 4 repurposed
(rewrite/remap) slots: 56 − 2 + 9 = 63.

## 13. Self-presentation audit of the 9 new items

Checked against the brief's own banned-example list directly — none of
the 9 new items reads as a transparent virtue statement:

| Item | Why it avoids the trap |
|---|---|
| q57 (`opportunity_sensing` likert) | "Notice a shift... before people around me mention it" is a claim about timing/perception, not framed as a virtue ("I spot opportunities" would have been the trap — deliberately not written that way). |
| q58 (`opportunity_sensing` trade-off) | Both options are explicitly framed as **costs already paid** ("missing a shift" vs. "chasing nothing at the expense of..."), not benefits — no answer reads as the "good" one. |
| q59 (`resourcefulness` likert) | "Can usually still find a workable way" is behavioural, not moralised; doesn't use "resourceful," "clever," or "smart." |
| q60 (`resourcefulness` trade-off) | Option (b), "hold off and push to get the real resource," is written as a legitimate, not lesser, choice — avoids the trap of making patience read as the "worse" answer. |
| q61 (`belief_updating` likert) | Describes a felt experience ("I can feel my actual position shift") rather than claiming the virtue directly — deliberately not "I admit when I'm wrong" (the brief's own listed trap example). |
| q62 (`belief_updating` trade-off) | Option (b) is framed with its own real justification ("early pushback doesn't mean much yet"), not as stubbornness — matches §6's low-pole-is-real requirement structurally, not just in the docs. |
| q63 (`decisiveness` likert) | Conditioned on "already have most of what I need to know" — avoids rewarding impulsiveness, which would make the item read as obviously either good or bad depending on the reader's self-image. |
| q64 (`proactive_agency` likert) | "Nobody put me in charge... nobody asked me to" is behaviourally specific, not "I take initiative" (transparent virtue framing the brief explicitly bans). |
| q65 (`proactive_agency` trade-off) | Option (b), deferring to whoever's responsible, is written as a legitimate coordination choice, not passivity. |

**Construct transparency, separately.** q57 and q64 are the two most
guessable (a careful reader could infer "this measures noticing things
early" / "this measures acting without permission") — this is the same
level of transparency the existing bank already tolerates (q22's
assertiveness item is comparably legible, per `docs/phase6.5-taxonomy-
audit.md` §2) and is not treated as disqualifying, consistent with that
precedent.

---

## 14. Display order, adjacency, and screen grouping

**q21/q39 fix, concretely.** In v1 these sat at positions 34-35
(immediately adjacent). In Quiz v2's `s4_uncertainty` (§11), q21 sits at
position 39 and q39 at position 42 — separated by q45/q49 in between (2
intervening items), enough that they no longer read as back-to-back
restatements of the same scenario, while both remain in the bank (§4's
"type A, not type B" finding — reorder, don't delete).

**General interleaving rule applied throughout, not just at that one
pair:** within each section, no two items sharing the same *primary*
trait are placed in immediately adjacent positions, and item *type*
(likert / forced-choice / situational) alternates rather than blocks —
verified against the full §11 table: the only same-trait adjacencies
remaining are deliberate paired-item cases already accepted in v1 (e.g.
q20/q63 in `s4_uncertainty`, both `decisiveness` — kept adjacent
*deliberately*, since q63 is a direct causal fix for q20's bimodality
partner and grouping them lets the graded item immediately "soften" the
trade-off item's effect, matching the same pattern q31 already uses
adjacent to q02 in v1).

**Facet-vs-section divergence, used deliberately, not incidentally.**
Per the brief's own explicit permission ("measurement architecture and
display architecture do not have to be identical"): `world_sense`'s three
new traits are *not* grouped into a visible 7th section — doing so would
make the new construct maximally obvious on sight ("here comes the
opportunity-sensing block"), working directly against §13's transparency
concern. Instead their items are distributed into the existing 6 display
sections wherever the *scenario* fits best (§11) — a user experiences
variety within a facet's own thinking (e.g. `s1_thinking` mixes
`analytical_rigor`, `intuitive_synthesis`, and `opportunity_sensing`
items without a label change), which is both better UX and better
measurement hygiene (less demand characteristic).

**Screens.** Recommend keeping the existing per-section-is-not-
per-screen pattern Phase 6 already established, applied to the new
count: **5-6 questions per screen**, no hard interstitial "section
complete" stop between screens (adds friction for no benefit at this
question type), but the existing progress bar continues to show section
name/position exactly as in v1 — no new UI concept required. 63 items ÷
~5.5 per screen ≈ **11-12 screens**, up from Phase 6's implicit ~10 for
56 items — a modest increase, consistent with the modest item-count
increase. **Section-transition interstitials (a full "Part 2 of 6"
stop-screen): not recommended**, same reasoning as the no-hard-stop
screen decision — the existing lightweight progress-bar section label is
sufficient and already validated live in Phase 6's browser walkthrough
(CLAUDE.md "Phase 6").

---

## 15. Context-variety distribution

Every new/changed item (§8) tagged against the brief's own fourteen
context categories, plus an aggregate read of the 50 unchanged KEEP items
based on the section-level framing analysis already done in `docs/
phase6.5-taxonomy-audit.md` §2:

| Context | New/changed items | Approx. share of unchanged 50 | Notes |
|---|---|---|---|
| Work/project | 0 of 9 new | ~35% (mainly `s3_work`, `s6_drive`) | Was the dominant context in v1; new items deliberately avoid adding to it further. |
| Everyday life / general | q57, q59 | ~20% | |
| Uncertainty/evidence/disagreement | q61, q62 | ~15% | Grows with `belief_updating`'s addition. |
| Opportunity/change | q57, q58 | ~5% (was near-zero) | **New in Quiz v2** — v1 had no dedicated "noticing change" context at all. |
| Resource constraint/scarcity | q15(rewrite), q59, q60 | ~2% (was near-zero) | **New in Quiz v2**. |
| Social interaction/group | q65 | ~20% | |
| Failure/setback | q62 | ~10% | |
| Initiative/unassigned action | q52(remap), q64, q65 | ~0% (was zero) | **New in Quiz v2** — v1 had no context where the scenario is explicitly "nobody assigned this to you." |
| Technology/tools | 0 shipped (2 illustrated only, §9) | ~0% | Deliberately not added as shipped context — see §9's reasoning. |
| Competition | 0 new | ~10% | |
| Creative choice | 0 new | ~15% (`s2_ideas`) | |
| Long-term decision | 0 new | ~10% | |

**Flag: work/project framing remains the single largest context even
after this revision (~35% of items), though it no longer approaches the
near-universal presence it had in v1's `work_style` facet specifically.**
This is an honest, not fully resolved, finding — the four new traits add
five genuinely new contexts (opportunity/change, resource constraint,
initiative-without-assignment, plus deepening uncertainty/evidence) but
don't and can't fully displace work-framing from a taxonomy where
`work_style` (6 attributes) and much of `resilience`/`motivation` remain
process/execution-oriented by definition. **No single context reaches
the >40% concentration `work_style` effectively had in v1**, which is the
concrete, checkable version of the brief's own "no one context dominant"
goal — met, though not eliminated entirely, which would have required
touching the untouched 30 attributes' own framing, out of scope here.

---

## 16. Measurement coverage — structural estimate, not simulated

**No code exists to run `diagnose.ts`/`trait-diagnostic.ts` against this
proposal** — Quiz v2 is not implemented. Figures below are structural
estimates from the design itself (item count, weight, and one-sided/
bidirectional classification, all of which are knowable from the design
directly), explicitly not simulated distributions (which require
`scoreQuiz` to actually run against fabricated response patterns).

| Attribute | Items (v1 → v2) | Bidirectional share (v2) | Note |
|---|---|---|---|
| `opportunity_sensing` | 0 → 3 | 100% (all 3 bidirectional by construction) | Best-measured new trait from day one — avoids Phase 4's mistake entirely. |
| `resourcefulness` | 0 → 3 | 100% | Same. |
| `proactive_agency` | 0 → 3 | 100% | Same. |
| `belief_updating` | 0 → 3 | 100% | Same. |
| `decisiveness` | 6 → 6 (q40 swapped for q63) | ~45% → **est. ~62%** | q63 adds bidirectional weight (~1.1) while removing q40's near-duplicate bidirectional weight (~0.85) and its bimodality-prone format — net: less bimodal, more genuinely graded, estimated meaningful improvement though the exact percentage requires simulation. |
| `collaboration` | 6 → 6 (core) / 7 (with optional item) | 18% → **est. ~35% with optional item**, unchanged without it | Optional fix only helps if implemented (§5). |
| `analytical_rigor` | 8 → 6 | unchanged composition, just fewer secondary echoes | §4. |
| `execution_speed` | 8 → 5 | unchanged composition | §4. |
| `ambiguity_tolerance` | 7 → 6 | unchanged composition | §4. |
| `curiosity` | 5 → 4 | unchanged composition | Still above 3-item floor. |
| `autonomy_need` | 6 → 5 | unchanged composition | Still above floor. |
| `mastery_orientation` | 7 → 5 | unchanged composition | Still above floor. |
| `cross_domain_range` | 3 → 3 | unchanged | At floor throughout, untouched — no cut was ever proposed here (§4). |
| All other 20 existing attributes | unchanged | unchanged | No item touched them. |

**Every attribute in the proposed system — all 34 — retains at least 3
items, all four new attributes launch at 100% bidirectional (better than
any attribute in the current production bank achieved at launch), and no
single item is designed to exceed roughly 0.35-0.40 estimated share of
any attribute's total weight** (checked by construction: no new item
carries more than ~1.2 weight against a 3-item pool summing to
~3.0-3.3, keeping estimated share safely under the existing ≤0.55 guard
used throughout the codebase — same reference threshold, not changed).

**Explicit answer to "if 34 traits cannot be adequately measured in
54-60 questions, say so":** they cannot, at the standard this project has
already set for itself (≥3 genuinely bidirectional items per new
attribute, no floor-level existing attribute cut, no good bidirectional
trade-off item sacrificed) — 63 is the honest number, not 60. Reaching
60 exactly is possible only by giving up one of those three conditions
(§3, §11) — that is a real trade-off for the reviewer to decide, not
one this document resolves by quietly lowering its own bar.

## 17. Historical-person migration plan (evidence plan only — no one scored)

**No person is scored in this document.** This is the evidence plan a
future scoring pass would follow, plus an honest eligibility-risk check.

### Per-trait evidence plan

| Trait | Supporting evidence | Evidence NOT to use | Modern vs. historical confidence |
|---|---|---|---|
| `opportunity_sensing` | Documented instances of recognising a shift, trend, or significance before it was widely acknowledged; explicit biographical framing of "was early to..." | Retrospective claims manufactured after success (survivorship-biased "they always knew"); anything inferred purely from eventual fame | Comparable across eras — the evidence type (a documented early recognition) doesn't require modern institutions. |
| `resourcefulness` | Documented improvisation, working with less than typically required, explicit "made do with..." framing from primary or reputable secondary sources | Poverty/hardship treated as automatic evidence (per `inclusion_v1`, hardship is not scored as virtue by itself) — only *documented adaptive use* of constraint counts | Slightly higher-confidence for historical/non-elite figures, where scarcity-driven improvisation is often better documented than for modern well-resourced figures — a rare case where the historical dataset may have an evidentiary *advantage*. |
| `proactive_agency` | Documented instances of acting without assignment, authorization, or request — starting something, changing a process, taking on a role nobody gave them | Anything attributable to formal job duty or an assigned mandate (that's not proactive agency, it's execution) | Comparable across eras, with one caveat: pre-modern power structures make "acted without authorization" harder to document neutrally for some figures (court/religious/military hierarchies) — confidence should be set slightly lower by default for figures whose full context isn't well documented. |
| `belief_updating` | Explicit, documented reversal or revision of a previously held position/strategy in response to evidence, ideally with the evidence and the change both attested | Behavioural strategy changes with no accompanying evidence the person's actual view changed (that's `adaptability`, not this) | Lower average confidence than the other three — explicit belief-reversal narratives are scarcer in the historical record than behavioural-change narratives, regardless of era. |

### Representative ease-of-scoring read across the 35-person roster

Not exhaustive — illustrative bands, consistent with "no one is scored
yet."

- **Likely easy** (rich, explicit biographical record across all four new
  traits): Leonardo da Vinci, Marie Curie, Benjamin Franklin, Richard
  Feynman, Nelson Mandela — figures with detailed, well-documented career
  narratives including explicit turning points.
- **Likely moderate**: Yi Sun-sin, Ibn Khaldun, Zheng He, Warren Buffett,
  Alan Turing, Jane Goodall — solid records, but `belief_updating`
  specifically may be thinner for some of these (a documented strategy
  change is easier to find than a documented change of underlying belief).
- **Likely difficult** (already the dataset's thinnest-evidenced
  figures): Rumi, Confucius, Socrates, Genghis Khan — the same
  ancient/medieval evidence-discipline group CLAUDE.md already documents
  as scored on only 18-22 of 30 attributes. `opportunity_sensing` and
  `proactive_agency` may actually be *more* tractable than expected for
  this group (initiative and recognition-of-moment are common ancient-
  biography beats — e.g., Genghis Khan's documented early recognition of
  shifting tribal alliances), but `belief_updating` is likely to remain
  unscored or low-confidence for most of them.

### Eligibility risk — a genuine, concrete finding, not a formality

`is_match_eligible`'s coverage floor (0.6) is computed as scored-attribute-
count ÷ total-attribute-count. **Growing the denominator from 30 to 34
without adding any new scored attributes would, on its own, reduce every
current person's coverage figure** — most people are scored on all or
nearly all of the current 30 and stay safely above 0.6 even at /34, but
the six already-thin ancient/medieval figures (Confucius, Socrates,
Genghis Khan, Zheng He, Rumi, Ibn Khaldun, currently 18-22 of 30, coverage
0.6-0.73) are the ones at real risk: **18/34 ≈ 0.529 — below the 0.6
floor even though nothing about that person's actual evidence changed.**
Anyone currently at the low end of that 18-22 range could fall out of
match eligibility purely from the denominator growing, unless they
receive at least 2-3 of the four new attributes scored (18+3=21/34≈0.618,
back above floor). Given `opportunity_sensing`/`resourcefulness`/
`proactive_agency` were independently found above to be *plausibly
tractable* even for this thinly-evidenced group, this risk is likely
resolvable — **but must be explicitly checked at scoring time, not
assumed away.** Flagged here as a required step in any future migration,
not a blocker to this design.

---

## 18. Phase 7 — one "learn from" / "don't copy" example per new trait

Per instruction: never "your score is lower, therefore improve it" —
each example below follows the existing rule/target-band mechanism
(`learnFromTraits`/`selectDoNotCopy`, `docs/phase7-provisional-
checkpoint.md`), banded by the user's own score, not a raw gap.

- **`opportunity_sensing`** — *Learn from:* a user with moderate
  `opportunity_sensing` compared against a figure who repeatedly acted
  early on emerging shifts might see a suggestion to build a lightweight
  weekly scanning habit, framed as a skill to try, not a deficiency to
  fix. *Don't copy:* a figure whose `opportunity_sensing` is extremely
  high alongside low `deep_focus` — the caution surfaces the specific,
  historically-documented cost of that combination (chasing signal at
  the expense of follow-through), not a generic "too much of a good
  thing" line.
- **`resourcefulness`** — *Learn from:* a well-resourced user compared
  against a figure known for making do with limited means might see a
  suggestion to practice deliberately withholding the "ideal" resource
  once, to build the muscle, framed as a experiment not a correction.
  *Don't copy:* a figure whose resourcefulness shows signs of having
  become a ceiling (documented under-investment in available better
  resources) — the caution names that specific, evidenced cost.
- **`proactive_agency`** — *Learn from:* a user who scores as reactive-
  by-preference compared against a figure who repeatedly acted without
  waiting for authorization might see a suggestion to flag (not
  necessarily fix) one thing at work or in their community that nobody
  assigned them, this month. *Don't copy:* a figure whose proactive
  agency is documented as having caused real friction or institutional
  conflict — the caution names that specific cost rather than implying
  initiative is universally good.
- **`belief_updating`** — *Learn from:* a user who scores low might see a
  suggestion modelled on a figure who documented revising a strategy
  under real evidence, framed as a practice (deliberately seeking out the
  strongest counter-argument to something they currently believe) not a
  character fix. *Don't copy:* a figure whose `belief_updating` is
  extremely high alongside evidence of frequent reversals undermining a
  larger project — names that cost. **Special value case**: a figure
  high on `independent_thinking` and low on `belief_updating` gives Phase
  7 a "don't copy" pairing the current taxonomy cannot produce at all —
  directly the gap `docs/phase6.5-taxonomy-audit.md` §10 identified.

**Mechanical impact on Phase 7's existing code, confirmed unchanged.**
`targetComparison.ts`'s selectors read `contributionShape` and score
deltas generically — no attribute-ID-specific logic exists there to
update. Only new `dev.*` content (§21) and `contributionShape`
assignments (already given in §6: all four `contextual`/`balanced`) are
needed; the architecture itself requires no rework, matching the
checkpoint document's own "reusable vs. taxonomy-dependent" analysis.

---

## 19. Greatness Potential — recalibration required; formula redesign NOT required

**Distinguished explicitly, per instruction:**

**"Taxonomy changed, therefore recalibration required" — TRUE:**
- `reference_v3` needed: the four new attributes need `{mean, sd}`
  modelling-reference entries. No real basis exists yet (no scored
  people, no simulated quiz data) — initial values would need to be
  authored as a stated assumption (matching how `reference_v1` itself
  originally launched) and revisited once real data exists, same
  discipline as `reference_v2`'s own documented history.
- `dispersion.generated.ts` needs regeneration once people are scored on
  the new attributes (dataset-dependent, not quiz-dependent).
- `MATCH_CALIBRATION_ANCHORS`/`GREATNESS_CALIBRATION_ANCHORS` need
  refitting against the new 63-item quiz pipeline, same "regenerate
  deliberately, twice" workflow already established.
- Archetype target bands (`greatness.ts`) do not *strictly* require
  updating — archetypes can simply not reference the four new attributes,
  same as they don't reference every one of the current 30 — but could
  optionally be enhanced later once real data justifies it.

**"Greatness formula conceptually needs redesign" — FALSE, and not
assumed true just because the taxonomy grew:**
- The `0.50A + 0.22D + 0.13C + 0.15E` structure needs no change. A
  (archetype affinity) and D (distinctiveness) both operate generically
  over whatever `ATTRIBUTE_IDS` exist — no code change required beyond
  the input tables above. E (engine traits) is a curated list that could
  optionally gain a new entry if a new attribute proves broadly
  supportive across archetypes, but nothing requires that immediately.
- **One optional, not required, `TENSION_PAIRS` candidate identified**:
  `resourcefulness` vs. `perfectionism` is a credible new tension
  (insisting resources be adequate/refined vs. making do) in the same
  spirit as the three existing pairs (`perfectionism`/`execution_speed`,
  `planning_orientation`/`ambiguity_tolerance`, `autonomy_need`/
  `collaboration`). Flagged as a candidate for whoever implements this,
  not adopted here — C (coherence) is explicitly documented in
  `greatness.ts` as using "a small reviewed list" precisely because a
  data-driven correlation matrix would be noise at this dataset size;
  adding a pair is a judgment call belonging to that same reviewed-list
  discipline, not a mechanical consequence of the taxonomy change.

---

## 20. Matching (`matching_v2`) — migration validation required, formula untouched

**No code in `matching_v2` needs to change** — `level`/`scatter`/`pattern`/
coverage-shrinkage all operate generically over whatever attributes exist;
this taxonomy proposal does not touch `similarity.ts`. What's required
is **validation**, reusing Phase 5's exact harness rather than inventing
a new one:

1. **Famous-person rescoring** — the 35×4 (140) new attribute scores from
   §17's plan, held to the existing confidence/evidenceType/sources bar.
2. **User-quiz simulation** — `simulate.ts 10000 quiz` against the new
   63-item bank and 34-attribute taxonomy, full match/greatness
   distribution.
3. **Dispersion snapshot** — regenerate `dispersion.generated.ts` (first
   pass of the two-pass `calibrate.ts` workflow).
4. **Calibration anchors** — refit both match and Greatness anchor tables
   (second pass).
5. **Domination testing** — re-run the #1-frequency check at n=35;
   confirm still under the 20%-at-n≥30 threshold. Given `decisiveness`'s
   causal fix (§5) directly targets the taxonomy's single largest
   remaining signature-trait-frequency outlier, this check is expected to
   improve, not just hold — but must be verified, not assumed.
6. **Flat-profile / high-variance-omission testing** — re-run the
   Phase-2/Phase-5 mechanism-level regression tests unmodified; they
   assert structural properties (level/pattern precedence, coverage
   shrinkage generalizing across composition not just count) that don't
   depend on which specific attributes exist.
7. **Coverage shrinkage** — `NEUTRAL_RAW_SIMILARITY` (0.45) and related
   constants are empirical fits to the *current* dataset; re-verify they
   still describe the all-pairs median once the new attributes are
   scored, per the same "regenerate deliberately" discipline — not
   assumed unchanged.
8. **Reachability** — re-run the full-roster #1-reachability check
   (Phase 5), including the six eligibility-risk figures flagged in §17.
9. **Seed robustness** — re-run `sensitivity.ts seeds`/`ablate`/`noise`
   in full against the new bank, same as after every prior quiz-affecting
   change.

All nine reuse existing tooling (`simulate.ts`, `calibrate.ts`,
`sensitivity.ts`, `diagnose.ts`, `trait-diagnostic.ts`) with zero new
harness code required — this taxonomy change is additive to the
*inputs* these tools already consume, not to the tools themselves.

## 21. Final proposed specification

**Proposed taxonomy (`taxonomy_v1.1`):** 7 facets, 34 traits.
`thinking`(6): `curiosity`, `analytical_rigor`, `intuitive_synthesis`,
`systems_abstraction`, `independent_thinking`, **`belief_updating`**.
`creativity`(4): unchanged. `work_style`(6): unchanged. `resilience`(5):
unchanged. `social`(5): unchanged. `motivation`(5): unchanged.
**`world_sense`(3, new facet): `opportunity_sensing`, `resourcefulness`,
`proactive_agency`.**

**Trait migration:** retained 30 (unmodified), renamed 0, merged 0,
removed 0, added 4.

**Proposed Quiz v2:** 63 questions core (64 with optional `collaboration`
item). Type distribution: ~45 likert, ~18 forced-choice/situational
(ratio roughly preserved from v1's 70/30 split). Context distribution:
§15 (work/project ~35%, five genuinely new contexts added, none
exceeding v1's prior ~40%+ work-style concentration). Section
distribution: s1=10, s2=8, s3=12, s4=12, s5=11, s6=10. Estimated screens:
11-12 at 5-6 items/screen.

**Existing-question migration:** KEEP 50, KEEP+REMAP 1, REWRITE 3, REMOVE
2, NEW 9 (core) / 10 (with optional item).

**Known measurement issues addressed:**
- `decisiveness` dominance (19.1% signature-trait frequency, the
  taxonomy's largest) — causal mechanism identified (relapsed Phase-2
  item-bimodality, never received a dedicated graded item unlike six
  comparable attributes) and corrected with the proven fix pattern, not
  a weight adjustment (§5).
- `collaboration` one-sidedness (82%) — improvement proposed as an
  optional, not forced, addition, consistent with Phase 5's finding of
  no current downstream matching defect (§5).
- q21/q39 experiential repetition — resolved by reordering, both items
  retained (§14).
- Section 3's length imbalance — not worsened; new items deliberately
  routed to shorter sections (§11, §15).

**New product breadth gained:** five genuinely new question contexts
(opportunity/change, resource constraint, initiative-without-assignment,
plus deepened uncertainty/evidence and technology/feedback illustrated as
context patterns for future use, §9-§10); four new, well-differentiated,
historically-scoreable attributes (§6); a new Phase-7 "learn from /
don't copy" pairing (`belief_updating` × `independent_thinking`) the
current taxonomy structurally cannot produce (§18).

**Scientific compromises / uncertainties, stated plainly:**
- All four new attributes rest on real but adapted literature (org-
  psych/entrepreneurship constructs reformulated as individual quiz-
  scoreable dimensions) — the same category of inferential leap the
  existing 30 already make, not a new category of risk, but still a real
  one worth naming every time.
- `belief_updating`'s historical evidence is thinner than the other
  three on average (§17) — expect lower average confidence scores for
  it specifically once real scoring happens.
- `reference_v3`'s initial values for the four new attributes will be
  authored assumptions with zero real data behind them at launch, exactly
  like `reference_v1` was — must be revisited once real quiz/dataset data
  exists, same discipline already applied once to `reference_v2`.
- The `perfectionism`/`detail_orientation` redundancy remains
  unresolved, flagged, not fixed (§4, §6).

**Migration cost:** moderate. `QUIZ_VERSION`/`TAXONOMY_VERSION` bump;
`reference_v3`; 140 new person-attribute scores (§17); full dispersion/
calibration regeneration; full `sensitivity.ts` re-run (§20); ~12 new
`dev.*` Phase-7 guide strings (4 attributes × 3 bands, §18); no changes
to `matching_v2`, `greatness_v1`'s formula, Phase 7's architecture, or
any of the 30 existing attributes' scores.

**Effect on provisional Phase 7 work:** purely additive. `targetComparison.
ts`'s selectors, the compare page's structure, `TargetSwitcher`, the
state/token strategy, and all 7 editorial `doNotCopyKeys` entries need no
rework (§18). Only new content (dev-guide strings for 4 attributes) and
new `contributionShape` assignments (already specified, §6) are required.

---

## 22. Decision gate

### **APPROVE WITH RESERVATIONS**

The taxonomy (§6-§7) and the causal fixes (§5) are backed by specific,
re-verified evidence, not restated assumptions — recommend approving both
without qualification. Three named issues need the reviewer's explicit
acceptance before implementation, not further design work:

1. **63 exceeds the 54-60 preferred range by 3.** §3/§16 demonstrate why,
   with two named, explicit, low-cost-if-forced alternatives (cut q36 or
   q46) if exactly ≤60 is a hard requirement rather than a preference —
   this document does not choose between "accept 63" and "cut a good
   item" on the reviewer's behalf.
2. **`perfectionism`/`detail_orientation` redundancy is flagged but
   deliberately not resolved** (§4, §6) — a real, known gap left open by
   design, not by oversight.
3. **The eligibility-risk finding for six ancient/medieval figures (§17)
   is a real, non-trivial risk**, not a formality — it is very likely
   resolvable (opportunity_sensing/resourcefulness/proactive_agency all
   read as tractable even for thin sources) but is **not yet verified**,
   and must be checked at scoring time before this migration is
   considered safe to ship.

None of these three is a structural flaw in the design itself — they are
named trade-offs a reviewer should consciously accept, adjust, or reject
before implementation begins. This is a recommendation, not permission to
change code.

---

## 23. Stop condition acknowledged

No production taxonomy, quiz, person score, or calibration was modified.
No people were scored. Phase 7 was not resumed. No Quiz v2 UI was built.

---

## 24. Decision-check resolutions (2026-08) — supersedes §3, §4, §6, §11, §12, §17, §21-22 where they conflict

All three reservations from §22 were resolved with data, not assumption
(exact source: live `evaluateMatchEligibility` run against `SEED_PEOPLE`,
and `bank.ts` read directly for q36/q46's exact item definitions). Full
computation and reasoning live in the session record; this section states
the outcomes and the resulting spec changes only.

**1. Item count: 63 → 62.** q36 (`planning_orientation`/`ambiguity_
tolerance` trade-off) is cut — both affected attributes land at 5 items,
comfortably clear of the 3-item floor, estimated max-share ~0.24-0.27,
well under the 0.55 guard. q46 was evaluated as the second fallback and
**rejected** — cutting it would drop `systems_abstraction` to exactly 3
items with zero remaining margin, which was judged a material
measurement compromise, not a cosmetic one. ≤60 was found unreachable
without breaching a floor or under-measuring a new attribute below 3
items — not recommended at any cost. q36's status in §11/§12 is now
**REMOVE**, not KEEP; `s3_work` is now 11 items (was 12); total is 62.

**2. `perfectionism`/`detail_orientation`: KEEP BOTH — resolved, not
merged.** Computed directly against all 35 people: Pearson r = 0.728
(28 of 35 scored on both), mean |diff| 7.5, median 6, max 27. Real,
biographically coherent dissociation exists (Warren Buffett 58/85,
Jane Goodall 55/78, Mahatma Gandhi 72/55 — note the reversed direction
from Buffett — Benjamin Franklin 55/70, Richard Feynman 55/68), which a
merge would erase. The apparent redundancy (§4's original flag) is
reclassified as a **quiz-item-framing issue** (only q12/q14 truly
co-load both; both traits are measured almost entirely through
"refining/checking work" scenarios) rather than a construct-validity
issue — the fix belongs in future item-context diversification, not the
taxonomy. **No taxonomy change.** §6's `perfectionism`/`detail_
orientation` flag is closed.

**3. Historical eligibility — computed, not estimated.** Exact weighted
coverage (`evaluateMatchEligibility`'s actual formula, assuming baseWeight
1.0 for each new attribute) at 0 new attributes scored: Confucius 0.601,
Ibn Khaldun 0.603 (both OK, razor-thin margin), Socrates 0.599, Genghis
Khan 0.591, Rumi 0.562, Zheng He 0.534 (all below the 0.6 floor without
new-attribute scoring). New attributes needed to clear the floor: Socrates
1, Genghis Khan 1, Rumi 2, **Zheng He 3 of 4**. Evidence-availability
pre-audit (no one scored) found Confucius and Ibn Khaldun comfortably
resolvable, Socrates and Genghis Khan easily resolvable (each has at
least one *good*-evidence new attribute and needs only one), Rumi
plausible (`belief_updating` is unusually well-evidenced for him via the
Shams-e Tabrizi narrative), and **Zheng He a real, named risk**: his
surviving sources are administrative/court records rather than personal
ones, and `proactive_agency` evidence may point the wrong way entirely
(his major acts were imperially commissioned, the near-opposite of
"acted without being asked"). **Structural finding**: this is not an
age-based bias — Confucius and Ibn Khaldun, also ancient/medieval, are
fine — it is a **source-type bias**: figures documented chiefly through
administrative/institutional records rather than autobiography or
disciples' personal accounts are structurally disadvantaged by
`proactive_agency` and `belief_updating` specifically, regardless of era.
**Required pre-condition, not yet satisfied**: Zheng He's actual
scoreability on 3 of the 4 new attributes must be explicitly re-verified
at scoring time; if evidence doesn't support it, his ineligibility under
`taxonomy_v1.1` should be accepted, not engineered around by lowering
`ELIGIBILITY.minCoverage`.

**4. Display order — superseded again by a second decision-check
(2026-08), which found and fixed a real transcription error, not a
design defect.** A first attempt at reordering (recorded in this
section's original text) claimed to fix three same-trait adjacencies but
was never fully verified row-by-row; a follow-up session reconstruction
found it had (a) a stray duplicate row and a dropped row when transcribed
into a chat-facing compact list (pure presentation bug, corrected), and
(b) one genuine unfixed adjacency the first pass missed (`q21`/`q62` both
touching `persistence`). **The authoritative, fully mechanically-verified
62-row order — exact prompts, IDs, statuses, sections, types, and trait
mappings, with zero unintended same-trait adjacencies (one intentional
exception: `q20`/`q63`, both `decisiveness`, kept deliberately adjacent)
— is recorded in the session transcript for the 2026-08 reconciliation
and should be treated as the canonical display order, superseding both
this section's original list and §11's row ordering.** §11's per-item
content (prompt text, weights, KEEP/REWRITE/REMAP/NEW status) is
unchanged; only display position and section-internal ordering were
corrected. No item was added, removed, or reassigned as part of this
fix — verified: 62 unique positions, 62 unique items, section counts
10/8/11/12/11/10, migration counts KEEP 49 / KEEP+REMAP 1 / REWRITE 3 /
REMOVE 3 / NEW 9 all unchanged from the previous decision-check.

**Updated final specification**: 7 facets, 34 traits (unchanged from
§21) · **62 questions** (was 63) · KEEP 49, KEEP+REMAP 1, REWRITE 3,
REMOVE 3 (q01, q27, q36), NEW 9 · `perfectionism`/`detail_orientation`
redundancy closed (KEEP BOTH) · historical eligibility risk fully
characterised with one required pre-condition (Zheng He) instead of an
open question.

**Decision gate, updated: APPROVE WITH RESERVATIONS → one reservation
remains**, down from three: Zheng He's new-attribute scoreability must be
verified at scoring time. The item-count and taxonomy-redundancy
reservations are closed. Safe to proceed to implementation once that one
scoring-time check is planned for, not skipped.

