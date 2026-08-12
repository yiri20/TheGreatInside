# Phase 6.5 — Taxonomy Breadth & Questionnaire Research Audit

**Status: AUDIT / DESIGN GATE. Not an implementation. No production code,
taxonomy, quiz bank, person score, matching engine, or calibration was
touched to produce this document.** Everything below is read from the
current codebase (`src/core/attributes/attributes.ts`, `src/core/quiz/
bank.ts` via `docs/quiz-structure.md`, `src/dev/diagnose.ts` and
`src/dev/trait-diagnostic.ts` output, `src/core/interpretation/rules.ts`,
`src/core/greatness/greatness.ts`) plus external research, gathered
2026-08. See CLAUDE.md "Phase 6.5" for how this fits the roadmap and
`docs/phase7-provisional-checkpoint.md` for why Phase 7 is paused pending
this audit's outcome.

**Bottom line, stated up front (detail in §12):** recommendation **B** — a
small, additive `taxonomy_v1.1` revision. Add four new, well-grounded,
historically-scoreable attributes (`opportunity_sensing`,
`proactive_agency`, `resourcefulness`, `belief_updating`) under one new
facet, leave all 30 existing attributes and both other facets' internal
structure untouched, and grow the quiz modestly (56 → roughly 62-66 items,
exact number pending simulation). This is a recommendation for the next
gate, not an approval to build — see §12 for the full reasoning and what
still needs to happen before implementation starts.

---

## 1. Audit of the current 30-trait taxonomy

Source: `src/core/attributes/attributes.ts` (`taxonomy_v1`), cross-checked
against live output of `pnpm exec tsx src/dev/diagnose.ts` (item count,
total weight, max single-item share) and `pnpm exec tsx src/dev/
trait-diagnostic.ts` (simulated mean, `oneSidedShare`, `meanDiff`,
signature-trait frequency) run today against the current 56-item bank.
"Measurement strength" below means item count + total weight; "signature
frequency" (sigFreq) is the % of 10,000 simulated quiz-takers for whom this
attribute is their single most distinctive (highest |z|) trait — uniform
would be 3.3%, so a number well above that means the attribute is
statistically **overrepresented** as people's headline trait relative to
its true distinctiveness, which CLAUDE.md's "Known open issues" #2b already
tracks as a live, partially-open measurement issue.

### Thinking (5 attributes)

| Attribute | Items / weight | oneSided | meanDiff | sigFreq | Notes |
|---|---|---|---|---|---|
| `curiosity` | 5 / 4.30 | 65% | +12.7 | 2.8% | Broad "seeks novelty" trait. Real overlap with `cross_domain_range` (creativity facet) and the new candidate `opportunity_sensing` (§4A) — see "Overlap" below. |
| `analytical_rigor` | 8 / 7.30 | 47% | +20.0 | **7.2%** | Heaviest-measured attribute in the bank (8 items). Overrepresented as a signature trait. Functions as one pole of a near-bipolar pair with `intuitive_synthesis` (built as opposites in q02/q20/q40). |
| `intuitive_synthesis` | 4 / 3.60 | **22%** | +6.0 | 4.1% | One of only 4 attributes below the ~22% one-sidedness bar that would let `reference_v2` trust its simulated mean (CLAUDE.md "reference_v2" note). Cleanly measured. |
| `systems_abstraction` | 4 / 3.60 | 42% | +13.3 | 4.9% | "Zoom out to structure." `contributionShape: cluster_dependent` — correctly modelled as helping only combined with other traits, not universally. |
| `independent_thinking` | 5 / 3.60 | 53% | +6.1 | 0.1% | High one-sidedness but *low* meanDiff/sigFreq — the mechanical bias is present but isn't currently distorting outcomes much. Semantically one-directional as authored: every item rewards "holds a position against the room," never distinguishes principled conviction from simple refusal to update (see `belief_updating`, §4D, and "Blind spots" below). |

**Facet-level read.** Reasonably well-differentiated conceptually
(evidence-based reasoning vs. gut-pattern-completion vs. structural
zoom-out vs. resistance to social pressure vs. novelty-seeking), and the
empirical picture agrees except for `analytical_rigor`'s continuing
overrepresentation (still the single heaviest-measured attribute in the
bank at 8 items despite three Phase-4 rounds already targeting it) and
`independent_thinking`'s one-directional framing. `curiosity` is measured
adequately but its unique contribution versus `cross_domain_range` (a
different facet) is genuinely thin — both load on "explores broadly," see
"Overlap" below.

### Creativity (4 attributes)

| Attribute | Items / weight | oneSided | meanDiff | sigFreq | Notes |
|---|---|---|---|---|---|
| `creative_originality` | 3 / 2.60 | **0%** | **-0.1** | 0.0% | The cleanest-measured attribute in the entire bank — fully bidirectional, essentially zero simulated bias. Never a signature trait at this sample size, which is itself worth watching (its 3 items may be under-discriminating rather than perfectly calibrated — see "under-measured" below). |
| `experimentation` | 3 / 3.00 | 37% | +10.2 | 2.5% | Only 3 items, at the coverage-guard floor. |
| `cross_domain_range` | 3 / 3.10 | 65% | +13.9 | **10.3%** | Only 3 items yet the *second-most* overrepresented signature trait in the whole taxonomy. Classic under-measured-but-overweighted pattern — few items, each one-sided, producing a bimodal/overconfident score. Direct candidate for a dedicated bidirectional item, same fix pattern Phase 4 already used for `analytical_rigor`/`planning_orientation`. |
| `aesthetic_sensitivity` | 4 / 3.10 | 29% | +4.7 | 0.0% | Added in the original taxonomy specifically for its dispersion (CLAUDE.md: "highest dataset dispersion of any attribute") — that's a person-dataset property, not a quiz-measurement one, and the two are only loosely related; simulated signature frequency is 0%, i.e. essentially never distinctive enough on the *quiz* side to headline, worth watching alongside `creative_originality`. |

**Facet-level read.** Only 4 attributes across 3 items apiece for 3 of the
4 (`creative_originality`, `experimentation`, `cross_domain_range`) — this
is the thinnest-measured facet in the taxonomy in absolute item count, and
it shows: `cross_domain_range`'s domination number is a direct, mechanical
consequence of being both one-sided AND under-measured simultaneously.

### Work style (6 attributes — the largest facet)

| Attribute | Items / weight | oneSided | meanDiff | sigFreq | Notes |
|---|---|---|---|---|---|
| `discipline` | 3 / 2.50 | 28% | +1.6 | 0.2% | Well-behaved empirically, minimal bias. |
| `deep_focus` | 6 / 5.80 | 41% | +12.5 | 3.6% | Already the target of a Phase-4-round-3 fix (q56); residual bias remains but Buffett-domination-linked risk was reduced (CLAUDE.md "Phase 4"). |
| `detail_orientation` | 6 / 5.00 | 46% | +13.5 | 0.5% | Heavy co-loading with `perfectionism` (q12, q14, q48 all load both) — see "Overlap" below. |
| `perfectionism` | 5 / 4.10 | 44% | +10.4 | 0.1% | Same co-loading pattern as `detail_orientation`; rarely anyone's signature trait despite 5 dedicated items — a sign the two constructs may not carve as cleanly as their separate item pools suggest. |
| `execution_speed` | 8 / 7.50 | 60% | +20.4 | **8.4%** | Tied for heaviest-measured attribute (8 items) and still notably overrepresented despite that investment — three-way tension pairing with both `deep_focus` (q47, explicitly bidirectional trade-off) and `planning_orientation`. |
| `planning_orientation` | 6 / 5.90 | 53% | +19.8 | **10.1%** | Third-most overrepresented signature trait despite two dedicated Phase-4 fixes (q36, q54). |

**Facet-level read.** This facet carries the most Phase-4 corrective
investment (6 of the 24 Phase-4 additions target it — CLAUDE.md "Section
3... Phase 4 added the most corrective items to") and still shows the
largest residual `meanDiff`s and two of the three biggest sigFreq
overrepresentations in the taxonomy. It is also, per `docs/
quiz-structure.md`, the single largest quiz section (12 of 56 items,
33-50% longer than every other section) sitting in the fatigue-risk middle
third of the quiz. This facet is simultaneously the most work/execution-
coded facet in the taxonomy and the most measurement-troubled — not a
coincidence worth ignoring: the real-user complaint that triggered Phase
6.5 ("too concentrated on work, execution... planning, focus") is, in
measurement terms, largely a complaint about exactly this facet's
disproportionate share of quiz real estate and residual bias.

### Resilience (5 attributes)

| Attribute | Items / weight | oneSided | meanDiff | sigFreq | Notes |
|---|---|---|---|---|---|
| `persistence` | 3 / 2.90 | **0%** | +2.4 | 1.0% | Clean, well-behaved. |
| `adaptability` | 5 / 4.40 | 64% | +11.6 | 3.5% | Adjacent-item overlap with `persistence` flagged in `docs/quiz-structure.md` (q21→q39, back-to-back, "the strongest candidate in the whole bank for 'this feels repetitive'"). |
| `risk_tolerance` | 4 / 3.50 | 37% | +5.0 | 0.5% | Well-grounded distinction from `ambiguity_tolerance` — decision science treats risk (known-probability uncertainty) and ambiguity (unknown-probability/interpretive uncertainty) as genuinely separate axes since Ellsberg's 1961 paradox; this is one of the taxonomy's better-theorised distinctions, not a redundant pair despite superficially similar names. |
| `ambiguity_tolerance` | 7 / 6.10 | 38% | +9.1 | 1.5% | Second-heaviest-measured attribute (7 items) yet low sigFreq — over-measured relative to its discriminative payoff. |
| `decisiveness` | 6 / 4.90 | 45% | +17.0 | **19.1%** | **The single most overrepresented signature trait in the entire taxonomy**, by a wide margin (next-highest is 10.3%). Moved to this facet specifically in the original consolidation ("decision_speed → decisiveness, moved to resilience facet, distinct from execution_speed" per attributes.ts header) but the empirical picture six items later still shows it as the taxonomy's biggest residual bias, ahead even of `collaboration`'s 82% one-sidedness. Worth flagging as the actual top candidate for a future corrective round, ahead of anything this audit proposes adding. |

**Facet-level read.** Genuinely the best-grounded facet conceptually (risk
vs. ambiguity is real decision-science territory, persistence vs.
adaptability is a legitimate, if under-differentiated by adjacency,
trade-off pair) but contains the taxonomy's single largest outstanding
measurement problem (`decisiveness`). Not caused by anything this audit
is proposing to add — a pre-existing, still-open issue.

### Social (5 attributes)

| Attribute | Items / weight | oneSided | meanDiff | sigFreq | Notes |
|---|---|---|---|---|---|
| `social_assertiveness` | 4 / 3.40 | 47% | +5.0 | 0.1% | Co-loads with `persuasiveness` and `conflict_tolerance` in q22 — three attributes from one item. |
| `collaboration` | 6 / 5.50 | **82%** | +24.3 | 8.7% | **The single most one-sided attribute in the taxonomy** (CLAUDE.md: "the largest [residual one-sidedness] in the bank"). Phase 5 causally tested this and found it currently harmless to matching outcomes (ablating its only bidirectional item moved Buffett's domination figure by only +0.3pp) — but "not currently moving rankings" is different from "well-measured," and this remains the taxonomy's clearest unfixed instrument-quality gap. |
| `leadership_drive` | 5 / 4.30 | 49% | +5.5 | 1.6% | `contributionShape: cluster_dependent` — correctly modelled as not universally good. |
| `persuasiveness` | 5 / 4.20 | 36% | +4.8 | 0.7% | Reasonably well-behaved. |
| `conflict_tolerance` | 3 / 2.40 | **0%** | +6.0 | 0.4% | Clean. |

**Facet-level read.** `social_assertiveness`, `leadership_drive`, and
`persuasiveness` are three separately-scored, empirically correlated
constructs (all three co-load in q22/q24/q25/q52) that map onto genuinely
distinct psychological literatures (assertiveness as a Big Five
extraversion facet; persuasiveness as a social-influence tactic;
leadership motivation as its own well-studied construct) — defensible as
three attributes, but the facet with the highest internal-correlation risk
in the taxonomy, worth a correlation-matrix-based look once the dataset
reaches the ~100-150 people CLAUDE.md already flags as the threshold for a
data-driven (rather than reviewed-list) coherence model in `greatness.ts`.
`collaboration` remains the taxonomy's most urgent unfixed measurement
issue, independent of anything in this audit.

### Motivation (5 attributes)

| Attribute | Items / weight | oneSided | meanDiff | sigFreq | Notes |
|---|---|---|---|---|---|
| `mastery_orientation` | 7 / 6.40 | 56% | +9.4 | 1.1% | Third-heaviest-measured attribute (7 items, two Phase-4 rounds of fixes) — well-invested. |
| `achievement_drive` | 4 / 3.80 | 29% | +2.6 | 0.5% | Reasonably clean. |
| `competitiveness` | 3 / 2.60 | 31% | +3.9 | 0.2% | At the coverage floor (3 items). |
| `autonomy_need` | 6 / 5.60 | 36% | +9.1 | 4.5% | Well-invested since its Phase-2 bimodality fix. |
| `impact_motivation` | 3 / 3.20 | 34% | +3.6 | 1.6% | At the coverage floor. |

**Facet-level read.** `mastery_orientation`, `achievement_drive`,
`competitiveness`, and `impact_motivation` map reasonably well onto
established achievement-goal theory's mastery/performance and
approach/other-referenced distinctions (Elliot & McGregor's 2×2
achievement-goal framework is the closest standard citation), which is
real theoretical grounding, not an invented taxonomy — but four
closely-related motivational constructs in one facet, all measured
through fairly similar "how hard do you push yourself" item framings
(q27-q30, q42, q50-q51, q55), is exactly the kind of facet a user
experiences as "another version of the same question."

### Overlap and redundancy — cross-facet read

Not confined to one facet; the clearest overlaps found by reading item
loadings directly (not assumed from names alone):

- **`analytical_rigor` ↔ `intuitive_synthesis`.** Built as literal opposite
  poles in three separate choice items (q02, q20, q40) — every item that
  measures one measures the other with the opposite sign. This is
  functionally closer to one bipolar dimension measured twice than two
  independent 0-100 dimensions. **Recommendation: do not merge.** A
  genuine two-axis design captures a real case a single bipolar scale
  cannot — someone low on *both* (neither systematic nor intuitively
  confident, genuinely uncertain) is meaningfully different from someone
  exactly in the middle of one bipolar scale, and `intuitive_synthesis` is
  independently one of the taxonomy's cleanest-measured attributes (22%
  one-sided, near-zero `meanDiff`). Flagged for awareness, not action.
- **`perfectionism` ↔ `detail_orientation`.** Three items (q12, q14, q48)
  co-load both, both show similar one-sidedness (44%/46%) and near-zero
  signature frequency (0.1%/0.5%) despite 5-6 dedicated items each — the
  strongest empirical redundancy signal in the taxonomy. **Recommendation:
  candidate for a future merge review** (not actioned in this audit's
  proposed revision — see §11 Option A).
- **`curiosity` ↔ `cross_domain_range`.** Conceptually adjacent ("explores
  broadly") but the items keep them behaviourally distinct enough
  (curiosity = pursuing a single thread; cross_domain_range = connecting
  separate fields) to defend as different constructs. Real but tolerable
  overlap.
- **`social_assertiveness` / `leadership_drive` / `persuasiveness`** — see
  Social facet-level read above.
- **`achievement_drive` / `competitiveness` / `mastery_orientation` /
  `impact_motivation`** — see Motivation facet-level read above.

### Under-measured constructs

`creative_originality`, `experimentation`, `cross_domain_range`,
`competitiveness`, `impact_motivation`, `discipline`, `persistence`,
`conflict_tolerance` all sit at or near the 3-item coverage-guard floor.
Most are empirically well-behaved regardless (persistence,
conflict_tolerance, creative_originality show near-zero bias) — item
*count* alone is not the risk indicator this taxonomy needs to watch;
`cross_domain_range` is the one clear case where thin measurement (3
items) combines with high one-sidedness (65%) to produce real distortion
(10.3% sigFreq, third-highest in the taxonomy).

### Over-measured constructs

`analytical_rigor` and `execution_speed` (8 items each, the bank's
heaviest), `ambiguity_tolerance` (7 items) and `mastery_orientation` (7
items) — all four are facets that already absorbed multiple rounds of
Phase-4 corrective investment and, `mastery_orientation` aside, still show
meaningful residual bias. This is where a future item-trimming pass (§8)
has room to work without reducing genuine measurement quality.

### Conceptual blind spots — confirmed

Cross-referencing all 30 attributes against the candidate constructs in §4:
none of the 30 measure environment-scanning/opportunity-noticing,
self-initiated change absent an assigned goal, making progress under
resource constraint, or revising one's own beliefs/models specifically
under contradicting evidence (as distinct from adaptability's *behavioural*
strategy-switching — see §4D). These are not disguised versions of
existing attributes; see §4 for the full differentiation argument per
candidate.

### Historical-person scoreability, taxonomy-wide

All 30 current attributes score reasonably across the roster's era range,
with the already-documented exception that ancient/medieval figures
(Confucius, Socrates, Genghis Khan, Zheng He, Rumi, Ibn Khaldun) are
deliberately scored on only 18-22 of 30 (CLAUDE.md "Seed dataset"). No
existing attribute was found in this audit to be systematically
un-scoreable for a whole era or region beyond that already-documented and
already-handled pattern.

### Should every current attribute be retained?

Yes, with two flagged exceptions for a **future** (not this) revision:
`perfectionism`/`detail_orientation` (merge candidate, §1 above) and
`decisiveness` (not a redundancy problem — a still-open, single-attribute
measurement-quality problem, CLAUDE.md's own open issue #2b's next target
by its own stated criterion). Nothing in the current 30 is dead weight;
the "30 is not sacred" instruction is honoured by flagging these, not by
forcing a cut to hit a round number.

---

## 2. Audit of the current 56-question experience

Full mechanical audit already exists at `docs/quiz-structure.md`
(inspection-only, produced during the Phase 7 checkpoint) — this section
does not repeat that file's per-item breakdown, only adds a synthesis
relevant to Phase 6.5's specific questions.

**Confirmed findings from `docs/quiz-structure.md`, still valid:**
- **q21 → q39 (positions 34-35), immediately adjacent** — the clearest
  case of experiential repetition in the bank (persistence vs. adaptability
  framed as near-mirror scenarios back-to-back). Type A (useful
  bidirectional measurement of complementary attributes) *and* type B
  (feels tedious back-to-back) simultaneously — the fix here is reordering,
  not deletion; both items measure real, distinct, needed signal.
- **q18/q45 (risk_tolerance) and q29/q42 (impact_motivation)**, non-adjacent
  but wordy overlaps — lower priority, not adjacent enough to read as
  back-to-back repetition.
- Section 3 ("How You Work") is 12 of 56 items (33-50% longer than any
  other section) and sits in the quiz's fatigue-prone middle third.
- The quiz opens with its heaviest cognitive format (a 4-way situational
  item, q01) rather than easing in.

**New reads for Phase 6.5 specifically:**

**Workplace/project framing density.** Scanning all 56 items' English text
(`src/core/i18n/en.ts`) for explicit work/project/team/job coding: Section
3 (work_style, 12 items) and Section 6 (motivation, 9 items) are the most
professionally-coded — "project," "committed to," "work that matters,"
"targets... expected of me." Section 1 (thinking) and Section 4
(uncertainty) already lean on more general-life framings (q01's "two free
hours," q05's "a field you know nothing about," q17's "something you
worked on for months fails" — general enough to read as life, not
necessarily employment). Section 5 (people) sits in between, mixing
group/team language throughout. This maps directly onto the facet-level
finding in §1: the facet users experience as most "work-flavored"
(work_style) is also the facet carrying the taxonomy's largest residual
measurement bias and its longest quiz section — the product complaint and
the measurement finding point at the same place.

**Social-desirability soft spots (not previously flagged in
`quiz-structure.md`).** Most items already follow the Phase 0 situational-
wording discipline well, but a few read as close to a "virtue statement"
regardless of framing: q30 ("I set targets for myself that are higher than
what's expected of me") and q11 ("I keep going on the things I've
committed to even on days when I don't feel like it") both describe
generally admired behaviour with no genuine cost attached in the wording
itself — contrast with q48 ("I'll redo something several times until it
feels exactly right, even after it already meets what was actually
required"), which is well-constructed precisely because it reads as a real
cost (over-polishing something already sufficient), not a virtue. Not
urgent, but worth using as a model when authoring any new items (§4-§9).

**Obvious trait-signaling.** q22 ("In a room of people I don't know, I'll
be one of the first to speak") is fairly transparent as measuring
assertiveness. Transparency by itself isn't disqualifying — several
well-validated published scales are just as legible — but it is the
clearest single example in the bank of an item whose measured construct a
respondent could guess on read.

**Distinguishing type A from type B repetition, applied to the whole bank
(not just the two pairs `quiz-structure.md` already flagged):** the
review found no *additional* pair beyond q21/q39 that crosses from "useful
bidirectional pair" into "reads as redundant" — the bank's other
same-attribute item clusters (e.g. `analytical_rigor`'s 8 items,
`execution_speed`'s 8) are spread across different sections and framings
(behaviour vs. preference vs. trade-off, per the bank's own authoring
rule) rather than clustered adjacently, so they don't produce the same
"just asked me this" sensation even though they numerically dominate
measurement. The **quantity** of over-measurement (§1) and the
**experience** of repetition (this section) are related but not identical
problems — over-measurement is a calibration/domination risk;
experiential repetition is specifically an adjacency/wording problem, and
the bank mostly avoids the latter except at q21/q39.

---

## 3. Broader constructs — research grounding

Search discipline followed per instruction: primary/peer-reviewed sources
where findable, explicit "generic listicle" avoidance, and an explicit
distinction below between (i) constructs with replicated
association-with-outcomes evidence, (ii) plausible-but-thinner-evidence
constructs, and (iii) popular-business framings not actioned. No claim
below asserts a causal link to "success" — all are described as
correlational/theoretical associations, consistent with the instruction
not to overstate causality.

**(i) Constructs with real, multiply-replicated grounding:**
- **Entrepreneurial alertness** — Tang, Kacmar & Busenitz (2012, *Journal
  of Business Venturing*), a validated 13-item scale across three
  sub-dimensions (scanning/search, association/connection,
  evaluation/judgment), with demonstrated content, convergent, discriminant
  and nomological validity, and a decade of subsequent replication and use
  (see also Dias Daniel, Adeel & Botelho 2021 review). Feeds §4A.
- **Proactive personality / proactive work behaviour** — Bateman & Crant
  (1993, *Journal of Organizational Behavior*), Morrison & Phelps (1999,
  *Academy of Management Journal*, "taking charge"), Parker & Collins
  (2010, *Journal of Management*), with meta-analytic confirmation of
  distinctness from adjacent constructs and links to job performance,
  leadership emergence, and career outcomes (Thomas, Whitman &
  Viswesvaran 2010, *Journal of Occupational and Organizational
  Psychology*). Feeds §4E.
- **Entrepreneurial bricolage / resourcefulness** — Baker & Nelson (2005,
  *Administrative Science Quarterly*), a field study establishing
  "making do," resource recombination for new purposes, and refusal to
  accept environmental resource limits as a coherent, observable pattern.
  Feeds §4C.
- **Intellectual humility / actively open-minded thinking** — Leary et al.
  (2017, *Personality and Social Psychology Bulletin*), the General
  Intellectual Humility Scale, plus a documented four-dimension structure
  (open-mindedness vs. arrogance, intellectual modesty vs. vanity,
  corrigibility vs. fragility, engagement vs. boredom) and a separate
  "limitations-owning" scale (Baehr & Howard-Snyder, 2018, *Personality
  and Individual Differences*). Feeds §4D.
- **Career-success predictor base rates** — Ng, Eby, Sorensen & Feldman
  (2005, *Personnel Psychology*), the standard large meta-analysis of
  objective/subjective career-success predictors, useful here mainly as a
  reminder that human capital and sponsorship variables (education,
  tenure, organizational backing) dominate objective outcomes and *stable
  individual differences* are more tied to *subjective* success — a caution
  against over-claiming that any one added trait "predicts greatness,"
  consistent with `greatness_v1`'s existing no-base-rate discipline.

**(ii) Real but thinner or more indirect grounding:**
- **Personal innovativeness in IT / diffusion of innovations** — Agarwal &
  Prasad (1998, *Information Systems Research*) and Rogers' diffusion
  theory. Real, cited literature, but explicitly domain-anchored to
  technology adoption specifically, which is exactly the "not modern
  digital literacy" risk flagged in the brief. Feeds §4B, with that caveat
  carried through.
- **Structural holes / network brokerage** — Burt (1992, *Structural
  Holes*; 2000, "The Network Structure of Social Capital"). Strong,
  canonical grounding — but Burt's own framework treats brokerage
  advantage as a property of one's *position in an actual social network
  graph*, not a stable individual disposition; a companion line of work
  ("Personality Correlates of Structural Holes") studies which traits
  correlate with *occupying* such positions, which is one inferential step
  further from "trait" than the other candidates here. Feeds §4F, with that
  caveat carried through.
- **Feedback orientation / feedback-seeking behaviour** — Ashford &
  Cummings (1983, foundational), with recent meta-analyses (Anseel, Beatty,
  Shen, Lievens & Sackett 2015, *Journal of Management*; a 2023 feedback-
  orientation meta-analysis). Real and well-studied, but the literature
  itself treats feedback-seeking, feedback environment, and feedback
  orientation as three *related, overlapping* individual-difference
  constructs rather than one clean dimension — a caution this audit
  carries into §4G's recommendation not to add it independently.

**(iii) Deliberately not pursued.** No generic "traits of successful
people" listicle sources were used; none of the constructs above originate
from popular-business framing rather than peer-reviewed or field-study
literature.

---

## 4. Candidate directions — individual evaluation

Each candidate below is scored against §5 (historical scoreability), §6
(bipolar/non-checklist formulation), and §7 (product/entertainment value),
per instruction, with an explicit differentiation-from-existing-taxonomy
argument (the most important test — a construct that reduces to a
combination of existing attributes doesn't belong even if the underlying
research is solid).

### A. Opportunity Sensing / World Sense — **strong candidate**

**Definition.** Noticing weak signals, emerging patterns, or shifts in the
surrounding environment that others have not yet registered — Tang et al.'s
three sub-elements (scanning/search, association/connection,
evaluation/judgment) generalise past business: a scientist noticing an
anomalous result is significant before its implications are obvious, a
general reading a battlefield shift, an artist sensing a cultural moment
before it's named.

**Differentiation.** `curiosity` measures pursuing a thread once noticed,
not noticing it in the first place. `systems_abstraction` measures
structural reasoning about a known problem, not scanning an unbounded
environment for signal. `cross_domain_range` measures working across
domains, not detecting change within one. None of the 30 current
attributes ask "did you notice this before it was obvious" — a real,
unclaimed axis.

**Historical scoreability: high.** "Noticed X before anyone else did" /
"saw the significance of Y while others dismissed it" is one of the most
common biographical narrative beats across every era and domain in the
roster — arguably *easier* to find textual evidence for than several
existing attributes.

**Bipolar formulation.** High: positioned to act early, generates option
value. Cost at the high end: can over-attend to signal/noise, chase every
new shift, under-commit to any one path (a real tension with `deep_focus`/
`persistence` worth naming, not hiding). Low: protects sustained
uninvested-in-tangents focus on a chosen path. Context: highest
differential value in fast-changing, unsettled domains (early science,
contested territory, emerging fields); lower differential value where the
right opportunity is already established and execution is what's scarce.
Recommend `contributionShape: contextual` or `cluster_dependent` (helps
most paired with follow-through capacity), not a flat `higher_can_help`.

**Product/entertainment value: high.** Produces genuinely new comparison
stories ("who noticed the shift first") not reducible to existing
work/execution framing; naturally supports non-workplace scenario items
(travel, current events, everyday life, historical analogues).

### B. Tool Leverage / Adoption Agility — **weak as a new trait, strong as item context**

**Definition as posed.** Response to new tools/techniques/technologies;
willingness to experiment, speed of adoption, strategic (not novelty-
chasing) tool choice.

**Differentiation problem.** The operationalisation risk flagged in the
brief is real and, on inspection, hard to avoid: "tries new approaches" is
already `experimentation`; "drops an approach when it's shown not to work"
is already `adaptability`; "pursues things outside the current lane" is
already `curiosity`. A cleanly-differentiated residual — something that is
*specifically* about tools/techniques and not just experimentation or
adaptability wearing a technology costume — is difficult to state without
either (a) collapsing back into those three existing attributes, or (b)
drifting toward "digital literacy," which the brief explicitly rules out.
Agarwal & Prasad's own construct (§3) is IT-domain-anchored for exactly
this reason — even the primary literature hasn't found a clean
domain-general formulation.

**Historical scoreability: moderate-to-weak.** Some figures (da Vinci's
instrument-making, Zheng He's naval technology) support it well; others
(Rumi, Ramanujan) offer little to no evidence either way, and unlike most
other under-evidenced cases in this dataset, that's not because the era is
old but because the construct itself has no obvious analogue in their
recorded life.

**Recommendation: do not add as a canonical attribute.** Its genuine value
— technology/tool/method scenarios as fresh, non-workplace-feeling
*question contexts* — is fully realisable by writing new items **for
existing attributes** (`experimentation`, `adaptability`, `curiosity`) set
in tool/technique/instrument scenarios, which directly serves §7's
entertainment-value goal without taking on a redundant or thin construct.
See §8/§11.

### C. Resourcefulness / Bricolage — **strong candidate**

**Definition.** Making progress with limited or imperfect resources by
recombining what's already at hand, per Baker & Nelson (2005).

**Differentiation.** `experimentation` measures willingness to try
rough/untested approaches, independent of resource constraint.
`cross_domain_range` measures connecting distant fields, not making do
within one. This is a genuinely different axis: constraint-orientation,
not domain-breadth or trial-orientation. A highly experimental person with
abundant resources and a highly resourceful person under real scarcity are
not the same profile.

**Historical scoreability: high**, and with a distinctive extra benefit:
"made do with limited means," "improvised," is an unusually rich vein of
biographical evidence, especially for figures who were *not*
well-resourced — which means this attribute can score distinctively high
for people the dataset currently under-differentiates on other
work/execution-style axes, and it aligns naturally with `inclusion_v1`'s
own counterfactual-test philosophy (achievement despite constraint,
without requiring or rewarding privilege either way).

**Bipolar formulation.** High: unblocked by imperfect conditions, adaptive
reuse. Cost at the high end: bricolage-built solutions can be fragile or
non-scalable; "good enough" can quietly become a permanent ceiling; can
mean under-investing in better resources/infrastructure when they were
actually attainable and warranted. Low: invests in proper tooling/
infrastructure before proceeding, produces more robust/scalable outcomes
*when resources are actually available* — a real, non-deficient stance,
not a fallback description. Context: highest value under genuine scarcity
(early-stage work, resource-constrained eras/regions, frontier science);
low differential value where the constraint doesn't bind. Recommend
`contributionShape: contextual`.

**Product/entertainment value: high.** Naturally produces scenario items
about improvisation, constraint, and everyday resourcefulness rather than
project/workplace framing.

### D. Belief Updating / Intellectual Humility — **strong candidate, special relevance to Phase 7**

**Definition.** What happens when evidence contradicts an existing belief,
strategy, or identity-relevant position — distinct from simply behaving
differently (Leary et al.'s corrigibility/open-mindedness dimensions).

**Differentiation — the most important test for this candidate.**
`adaptability`'s own flagship item (q39) is explicit: "When new
information makes my original approach look wrong, I'll drop it and
switch, even after I've already put real effort in" — this measures
*behavioural* strategy-switching, which is not the same thing as
*epistemically* updating one's underlying model or belief. A person can
switch tactics repeatedly while still privately believing their original
read was correct (stubborn-but-flexible), and a person can hold a
consistent strategy while genuinely having revised their underlying belief
about *why* it works (settled-and-updated). `analytical_rigor` measures
reasoning quality on a given question, not response to being told one was
wrong. `independent_thinking`, as currently authored, is the clearest case
of a genuine gap this fills: every one of its items (q04, q23b) rewards
"held a position against the room," with **no item anywhere in the bank
that distinguishes principled, evidence-tracking conviction from simple
refusal to update.** Someone who is high on `independent_thinking` and low
on `belief_updating` (holds positions, updates rarely) reads completely
differently from someone high on both (holds positions, updates when
warranted) — the current taxonomy cannot tell these two people apart,
and biographically they are not the same kind of figure at all.

**Historical scoreability: moderate-to-high.** Explicit public reversals
under evidence (well-documented for some figures) are scarcer to find than
"did this person adapt their strategy," but where present they are
usually a strong, unambiguous biographical signal, not a weak inference.

**Bipolar formulation — cleanly non-checklist.** High: revises views when
evidence genuinely warrants it, avoids identity-entrenchment. Cost at the
high end: can read as lacking conviction if revisions are frequent or
visible; taken far enough, risks abandoning ideas before evidence has had
time to accumulate. Low: provides real stability of vision — several major
historical breakthroughs (heliocentrism, continental drift) survived their
own early, genuinely misleading disconfirming evidence *because* their
originators did not update prematurely. This is not a consolation-prize
low pole; it is a historically real advantage of low `belief_updating`
under specific conditions (slow or noisy feedback, genuinely correct but
early idea) — exactly the "defensible non-evaluative dimensional
formulation" §6 requires, and one of the cleanest such cases among all
candidates evaluated here. Recommend `contributionShape: balanced`.

**Special relevance to Phase 7.** `belief_updating` paired against
`independent_thinking` is a natural, ready-made "what to learn / what not
to blindly copy" pair for the target-comparison feature — exactly the kind
of nuance ("borrow useful parts... without assuming more-like-them-in-
every-dimension is good") Phase 7's whole philosophy is built around, and
a pairing the current taxonomy structurally cannot produce.

### E. Proactive Agency — **strong candidate**

**Definition.** Initiating change in one's environment or circumstances,
as distinct from adapting to it once it changes, or executing a goal once
it's assigned — Bateman & Crant's proactive personality, Morrison &
Phelps's "taking charge."

**Differentiation.** `leadership_drive` presupposes a group context
("wants to set direction for a group"); proactive agency requires no
group and no assigned role — starting an unrequested new discipline of
study, unilaterally modifying a ship's rigging, petitioning for access
nobody offered, are all proactive-agency acts with no leadership context
at all. `execution_speed` measures speed *once something has started*, not
whether the person is the one who started it. `achievement_drive` measures
pursuit of a goal, which presupposes the goal already exists; proactive
agency is about *creating* the goal or the opening in the first place.
`autonomy_need` measures a *preference* for self-directed work, which is
compatible with either high or low proactive agency (someone can want to
be left alone AND never initiate anything beyond what's asked). A highly
disciplined, fast-executing, achievement-driven person can still be
entirely reactive; a slow, low-execution-speed person can still be the one
who starts everything. This is a real, unclaimed axis.

**Historical scoreability: high.** "Took the initiative to... against
expectation/without being asked/before being authorised" is an extremely
common, well-evidenced biographical beat across the entire roster's era
and domain range (Curie petitioning for education access, Ibn Khaldun
founding an unrequested field of study, Yi Sun-sin modifying ships without
waiting for orders — genuinely cross-domain and cross-era).

**Bipolar formulation.** High: initiates change, doesn't wait for
permission, shapes circumstances. Cost at the high end: creates friction
with existing structures and people; risk of acting before sufficient
buy-in or understanding; overreach. Low: executes assigned direction
efficiently, low interpersonal friction, works well within existing
systems — genuinely valuable in tightly-coordinated contexts (military
chain of command, ensemble performance, specialist craftsmanship inside a
larger structure) where unsanctioned initiative is actively costly, not
merely "less good." Recommend `contributionShape: contextual` or
`balanced`.

**Product/entertainment value: high**, and specifically good at moving the
quiz away from workplace-project framing since the strongest scenario
items are about noticing something *nobody assigned* — community,
institutions, everyday friction — rather than "your project."

### F. Network Leverage — **moderate candidate, defer**

**Definition.** Finding useful people, bridging disconnected groups,
mobilising networks — Burt's structural holes / brokerage.

**Differentiation.** Real conceptual distinctness from `collaboration`
(working well *within* a team, already the taxonomy's most one-sided
attribute at 82% — adding a new trait next to an already-broken one
compounds risk rather than reducing it) and `persuasiveness` (changing
one person's mind, not connecting two groups). Some overlap with
`cross_domain_range` at the idea level (bridging distant *domains*
parallels bridging distant *people*) worth naming, though the object
differs.

**The genuine problem, not previously named in the brief's own framing:**
Burt's own theory treats brokerage advantage as a property of one's
**position in an actual social network graph** — an emergent, largely
external fact about who happens to be connected to whom — not a stable
individual disposition in the way the other candidates are. The
individual-difference literature that does exist (personality correlates
*of occupying* brokerage positions) studies what predicts landing in that
position, which is one inferential step further removed from "trait we
can put a number on" than opportunity-sensing, resourcefulness, proactive
agency, or belief-updating.

**Historical scoreability: moderate.** Available for some figures with
well-documented diplomatic/patronage/collaborative-bridging roles (Ibn
Khaldun's political brokering, Franklin's scientific/diplomatic network-
building, Zheng He's diplomatic missions), genuinely thin for others
(Ramanujan, Rumi) — a new, additional coverage-thinness axis on top of the
one the dataset already manages, without a correspondingly strong
theoretical payoff to justify taking it on now.

**Recommendation: defer**, revisit only after the four recommended
additions (§4A, C, D, E) have proven out in simulation, per the "don't
gather more candidates than the quiz budget and dataset-review capacity
can actually absorb well" discipline this project has followed since
Phase 4.

### G. Feedback Orientation / Coachability — **do not add independently**

**Definition.** How someone seeks, interprets, and uses external feedback
— Ashford & Cummings' foundational feedback-seeking-behaviour framework.

**Explicit evaluation, as instructed.** The construct is real and
well-studied, but on inspection substantially overlaps two things this
audit is already recommending or already has: it is largely a *socially-
mediated instance* of `belief_updating` (§4D) — updating a belief/strategy
specifically because of feedback rather than because of an experiment
result or independent observation is a meaningful but fine-grained
distinction, hard to reliably separate with a 3-4-item quiz budget and
centuries-old biographical evidence. It also brushes against
`collaboration`, already the taxonomy's most measurement-troubled
attribute. The literature itself (§3) treats feedback-seeking, feedback
environment, and feedback orientation as three overlapping, not fully
distinct, constructs — a caution sign for trying to add a fourth,
cleanly-separated version as a canonical trait here.

**Recommendation: do not add as an independent attribute.** Its most
useful content — scenarios about receiving criticism, seeking outside
evaluation — can be folded into `belief_updating`'s item pool as one of
its situational framings (a feedback-specific scenario alongside a
pure-evidence scenario), which gets the product/entertainment benefit
without a redundant construct.

---

## 5. Historical scoreability — summary table

| Candidate | Evidence availability | Cross-era comparability | Cultural portability | Modern-bias risk |
|---|---|---|---|---|
| Opportunity sensing (A) | High | High | High | Low |
| Tool leverage (B) | Moderate-low | Moderate | Moderate | **High** — hardest to keep from reading as "tech-savviness" |
| Resourcefulness (C) | High | High | High | Low |
| Belief updating (D) | Moderate-high | Moderate | High | Low |
| Proactive agency (E) | High | High | High | Low |
| Network leverage (F) | Moderate | Moderate | Moderate | Low-moderate |
| Feedback orientation (G) | Moderate | Moderate | Moderate | Moderate — "feedback" as a concept is more modern/institutional-coded than the underlying behaviour |

Consistent with §5's hard requirement: (B) and (G) are the two candidates
where a responsible historical estimate is genuinely harder to defend, and
both are already recommended against inclusion as new canonical
attributes on independent grounds (§4B, §4G) — the scoreability test and
the differentiation test point the same direction for both.

---

## 6. Bipolarity / "not a checklist" compliance

Every candidate recommended for inclusion (A, C, D, E) has an explicit,
historically-real low-end case written above in §4, not a token "everyone
needs balance" gesture:
- **A (opportunity sensing):** low end protects sustained focus.
- **C (resourcefulness):** low end enables scale/robustness when resources
  are actually available.
- **D (belief updating):** low end is how early-correct, early-doubted
  ideas survive long enough to be vindicated — the single best-evidenced
  "low is not deficient" case among all seven candidates, historically.
- **E (proactive agency):** low end is what tightly-coordinated systems
  specifically need and reward.

None of the four is a repackaged "how competent/disciplined/smart are you"
question. Notably, the audit surfaced that **the current 30-attribute
taxonomy has zero attributes with `contributionShape: "lower_can_help"`**
(confirmed by reading every entry in `attributes.ts`) — every existing
attribute is `higher_can_help`, `balanced`, `contextual`, or
`cluster_dependent`, never "less of this is what the model credits." This
is a structural asymmetry already present in `taxonomy_v1`, independent of
anything proposed here (the Phase 7 checkpoint already noted
`selectDoNotCopy`'s `lower_can_help` branch is "currently unreachable with
real data — no attribute in taxonomy_v1 has that shape"). None of the four
recommended additions are proposed as `lower_can_help` either — all four
are best modelled as `contextual`/`balanced`, which is the honest read of
their evidence — but this pre-existing gap is worth naming explicitly as
its own open question, separate from this audit's specific recommendation.

---

## 7. Product / entertainment-value evaluation

For each of the four recommended additions: yes to every criterion in the
brief. All four (a) generate scenario items structurally impossible to
frame as "your project" (noticing a shift in daily life, improvising with
limited means, revising a long-held opinion, starting something nobody
asked for), (b) produce person-comparisons genuinely different from the
existing work/execution-flavoured set (who noticed the opportunity first,
who made do with the least, whose convictions held under pressure vs.
updated, who acted without waiting), and (c) directly serve Phase 7's
target-comparison philosophy by giving it material that isn't just more
discipline/execution advice — see §10.

---

## 8. Quiz-length discipline

**Do not automatically grow the quiz.** Applied concretely: four new
attributes, each needing the coverage-guard minimum of ≥3 independent,
genuinely bidirectional items *from the start* (learning Phase 4's
expensive lesson directly — retrofitting bidirectionality after the fact
cost three separate corrective rounds; authoring it correctly the first
time is now a known, avoidable cost) — a realistic per-attribute item
count closer to 4 than 3, given how much Phase 4 had to add after the fact
for attributes that launched with only 3. That's roughly **12-16 new
items**.

Against that: §1 and §2 both independently identified real trimming room
— `analytical_rigor` and `execution_speed` (8 items each, the bank's
heaviest, still overrepresented despite the investment),
`ambiguity_tolerance` (7 items, low payoff), and the q21/q39 adjacency
(reorder, and possibly retire one of the pair's *older*, more one-sided
Phase-0-era items now that Phase 4 already added a dedicated bidirectional
fix elsewhere in the bank). A defensible trim of **4-8 items** from this
pool is plausible but **must be simulation-verified, not assumed** — this
is exactly the kind of change CLAUDE.md's "regenerate deliberately"
discipline exists for, and cutting the wrong item from an
already-hard-won-stable attribute (particularly anything touching
`decisiveness` or `collaboration`, the two attributes with the most
fragile current stability) risks reopening a solved problem.

**Net estimate: roughly 56 + 14 − 6 ≈ 62-66 items** — a modest,
justified increase within the range the brief explicitly allows ("target
possibilities might include staying near 50-60... modestly increasing
only if justified"), not an unconstrained expansion to 70-100.

---

## 9. Facet architecture

The brief's own hypothesis (Thinking / Creating / Executing / Adapting /
Influencing / Driving / World Sense / Leverage — 8 facets) evaluated
critically, per instruction, rather than adopted by default:

**What holds up:** a facet distinct from the current 6 is genuinely needed
to house opportunity_sensing/resourcefulness/proactive_agency —
these three don't fit cleanly inside thinking (too externally-directed),
work_style (too dispositional, not process-oriented), or motivation (too
behavioural, not about *why* someone wants something). A single new
facet — this audit calls it **"World Sense"** — housing exactly those
three (sensing the world, leveraging it, acting on it — a coherent
internal triad) is well-supported. `belief_updating` (§4D) is better
housed in the existing **thinking** facet, alongside
`analytical_rigor`/`independent_thinking`, since it's fundamentally about
revising internal models, not about the external world — making thinking
6 attributes instead of 5.

**What does not hold up, on inspection:** splitting "resilience" into
"Adapting" plus something else for `persistence`/`decisiveness`, and
renaming `creativity`→Creating, `work_style`→Executing, `social`→
Influencing, `motivation`→Driving for gerund-parallelism. Two problems: (1)
"Influencing" undersells `collaboration`, which is about working *with*,
not influencing *over* — a rename that actively muddies one attribute's
meaning is a regression, not a clarification; (2) a facet rename touches
every `facet.*`/`facet.match.*` i18n key in both locales, the six
category-match UI labels, and any copy that references facet names — a
real migration cost for zero scoring or measurement benefit, and bundling
a cosmetic rename with a substantive structural change makes it harder to
isolate which part of a future regression (if any) actually mattered.
**Recommendation: adopt one new facet ("World Sense"), leave the existing
6 facets' names and internal composition otherwise untouched.** A full
naming pass, if ever wanted, belongs to a dedicated copy-polish effort,
not bundled here.

Net facet count under this audit's recommendation: **7** (6 existing + 1
new), not 8-9.

---

## 10. Impact on Phase 7's role-model comparison experience

Phase 7's provisional architecture (`targetComparison.ts`,
`learnFromTraits`, `selectDoNotCopy`, the compare page) is, per the
checkpoint document's own analysis, **taxonomy-agnostic by construction** —
none of it reads specific attribute IDs, only `contributionShape` and
score comparisons generically. The four recommended additions are
strictly additive to that architecture: no rework needed, only (a) ~4×3
= 12 new `dev.*` development-guide entries needed (Phase 7's ~270-string
corpus stays fully valid, per the checkpoint's own "reusable vs.
taxonomy-dependent" breakdown), and (b) `contributionShape` assignments
for the four new attributes feeding `HELPS_WHEN_HIGHER_SHAPES`/
`selectDoNotCopy` correctly (mechanical, not a redesign).

Beyond mechanics, the four additions directly address something the
Phase-7 checkpoint's own dev-guide corpus inherited from the taxonomy: 270
authored strings keyed to 30 attributes that are themselves
work/execution-concentrated necessarily produce a "what you could learn"
experience that skews the same way, independent of how well the selection
logic works. Adding `belief_updating` paired against `independent_thinking`
in particular gives Phase 7 a natural, structurally-supported "what to
learn vs. what not to blindly copy" pair it currently cannot produce at
all — directly serving the stated Phase 7 philosophy ("borrow useful parts
of an extraordinary person's operating style without assuming becoming
more like them in every dimension is good") with genuinely new material,
not just more of the same kind of advice under a new label.

---

## 11. Competing proposals

| | **Option A — Conservative** | **Option B — Balanced revision** | **Option C — Ambitious redesign** |
|---|---|---|---|
| Facets | 6 (unchanged) | 7 (+ World Sense) | 8-9 (adds World Sense + Leverage, renames 4 existing) |
| Traits | 30 (unchanged) | 34 (+4: `opportunity_sensing`, `resourcefulness`, `proactive_agency` in World Sense; `belief_updating` in thinking) | ~34-36 across a substantially reworked structure; adds network_leverage and a narrow tool-adoption trait; merges `perfectionism`+`detail_orientation`; splits resilience |
| Retained | All 30, as-is | All 30, as-is | Most 30, several renamed/relocated |
| Merged | None | None | `perfectionism` + `detail_orientation` → 1 |
| Removed | None | None | None outright, but several relocated/renamed enough to functionally reset their identity |
| New | None | 4 (A, C, D, E from §4) | 6-7 (adds F, and a narrowed version of B, on top of B's 4) |
| Est. quiz length | ~56 (item swaps only, reordering, q21/q39 fix) | **~62-66**, simulation-verified | **~70-85** |
| Migration cost | Near-zero — no version bump beyond quiz content, no re-scoring | Moderate — `QUIZ_VERSION`/`TAXONOMY_VERSION` bump, `reference_v3` needed for 4 new attributes, dispersion/calibration full regeneration, 35×4=140 new person scores, `sensitivity.ts` full re-run | High — full `reference_v3`, `greatness_v1` `TENSION_PAIRS`/archetype target-band re-fit, 35×~6=210+ new/changed scores, `matching_v2` discriminative-weighting landscape re-verified from scratch |
| Expected product benefit | Partial — better variety of *framing*, zero new *lenses*; does not answer the real-user concern that triggered Phase 6.5 | Directly answers the real-user concern with 4 well-grounded, non-redundant, historically-scoreable lenses, bounded scope | Highest ceiling, most complete answer to the concern, but scope substantially exceeds what triggered the audit |
| Scientific/evidence risk | Low | Low-moderate — same "org-psych construct → 3-4-item quiz scale against 700-year-old biographies" leap the existing 30 already make, no new category of risk | Moderate-high — risk of re-creating the exact over-measured/under-measured imbalance problem Phase 4 already spent 3 rounds fixing, at ~2-3× the surface area |
| Historical scoring burden | None | Bounded — 140 new scores, precedented (Phase 2 added 750 scores in one phase) | Highest — 210+ new/changed scores, some requiring re-review of already-reviewed attributes |
| Phase 7 impact | None (unchanged taxonomy) | Purely additive — Phase 7's architecture and ~270-string corpus fully reusable, ~12 new strings needed, gains a genuinely new do-not-copy pairing (§10) | Partially disruptive — attribute renames/merges orphan the *meaning*, not just the key, of some already-authored dev-guide content, requiring re-authoring not just extension |

---

## 12. Explicit recommendation

**B — make a small `taxonomy_v1.1` revision, then resume Phase 7 against
the revised taxonomy.**

**Why not A.** The concern that triggered Phase 6.5 is not a vague
complaint — it is a real, confirmed blind spot: none of the current 30
attributes measure opportunity-sensing, resourcefulness under constraint,
proactive self-initiated change, or belief-updating under evidence, and
all four are independently well-grounded in peer-reviewed literature,
cleanly differentiated from the existing 30 (§4), and score well against
the historical-evidence bar (§5). Option A's item-reframing-only approach
improves quiz *variety* but does not close that gap, and shipping Phase 7
against a taxonomy already known to under-represent these lenses would
mean re-doing dev-guide content later anyway — worse than doing it once,
correctly, now.

**Why not C.** The evidence gathered here supports four new attributes
confidently; it does not equally support the two additional candidates
(F, G) evaluated and explicitly deferred in §4, nor the facet-renaming and
attribute-merging bundled into the ambitious option. Taking on
2-3× the surface area this audit can actually defend risks reproducing
the exact over-measured/under-measured imbalance that took Phase 4 three
separate rounds to fix — and unlike Phase 4's fix (additive, no taxonomy
change), a redesign this size is not easily correctable in a later small
patch if the first launch gets the balance wrong. The evidence bar this
audit set for itself (§5's historical-scoreability test, §4's
differentiation test) was met cleanly by four candidates and only
partially or weakly by the other three — recommending only what the
evidence actually supports, not padding to a rounder or more ambitious
number, is the same discipline CLAUDE.md already applies to person-dataset
eligibility and reference-value revisions.

**Why not D (gather more data first).** The evidence bar here is not
actually thin: four independent, well-established research literatures
(entrepreneurial alertness, entrepreneurial bricolage, intellectual
humility, proactive personality), each with validated measurement
instruments and meta-analytic support, converge on four distinct,
non-redundant, historically-scoreable constructs that the current
taxonomy demonstrably lacks. Waiting for more data would mean waiting for
evidence this audit already found — the honest next step is a design
decision (which of A/B/C to build), not further literature review.

**What "B" concretely means as the next gate, not yet authorised by this
document:**
1. Formalise `taxonomy_v1.1`: add `opportunity_sensing`, `resourcefulness`,
   `proactive_agency` under a new `world_sense` facet; add `belief_updating`
   to the `thinking` facet. 34 attributes, 7 facets.
2. Author 4-6 items per new attribute, bidirectional by design from item
   one — apply the lesson from Phase 4's three corrective rounds up front
   rather than retrofitting.
3. In the same pass, fix the q21/q39 adjacency (reorder or replace one
   item) and evaluate trimming 4-8 items from the `analytical_rigor`/
   `execution_speed`/`ambiguity_tolerance` cluster — simulation-verified,
   not assumed, per §8.
4. Score all 35 seed people on the 4 new attributes (140 new scores),
   holding the existing evidence bar (confidence + evidenceType + sources)
   throughout.
5. Regenerate `dispersion.generated.ts`, refit `MATCH_CALIBRATION_ANCHORS`/
   `GREATNESS_CALIBRATION_ANCHORS`, run `simulate.ts` and `sensitivity.ts`
   in full (seeds, ablate, noise) against the new bank — same "regenerate
   deliberately, twice, in one pass" discipline as every prior taxonomy-
   or quiz-affecting change.
6. Author the ~12 new Phase-7 `dev.*` guide strings for the 4 new
   attributes (English first, per the existing documented scope decision);
   everything else in Phase 7's ~270-string corpus and compare-page
   architecture needs no rework.
7. Only then resume Phase 7's remaining wiring work (per the checkpoint's
   own "exact next steps if Phase 7 resumes unchanged" checklist, now
   applied against `taxonomy_v1.1` instead of `v1`).

**This document does not authorise starting step 1.** It is the research
and recommendation this gate exists to produce; implementation begins only
after explicit review and approval, per the brief's own closing
instruction.

---

## 13. Sources consulted

- Tang, J., Kacmar, K. M., & Busenitz, L. (2012). Entrepreneurial
  alertness in the pursuit of new opportunities. *Journal of Business
  Venturing*, 27(1), 77-94.
- Dias Daniel, A., Adeel, S., & Botelho, A. (2021). Entrepreneurial
  Alertness Research: Past and Future. *Journal of Entrepreneurship*.
- Baker, T., & Nelson, R. E. (2005). Creating something from nothing:
  Resource construction through entrepreneurial bricolage.
  *Administrative Science Quarterly*, 50(3), 329-366.
- Leary, M. R., Diebels, K. J., Davisson, E. K., Jongman-Sereno, K. P.,
  Isherwood, J. C., Raimi, K. T., Deffler, S. A., & Hoyle, R. H. (2017).
  Cognitive and interpersonal features of intellectual humility.
  *Personality and Social Psychology Bulletin*, 43(6), 793-813.
- Baehr, J., & Howard-Snyder, D. (2018). [Limitations-owning intellectual
  humility measurement work]. *Personality and Individual Differences*,
  124, 184-193.
- Bateman, T. S., & Crant, J. M. (1993). The proactive component of
  organizational behavior: A measure and correlates. *Journal of
  Organizational Behavior*, 14(2), 103-118.
- Morrison, E. W., & Phelps, C. C. (1999). Taking charge at work:
  Extrarole efforts to initiate workplace change. *Academy of Management
  Journal*, 42(4), 403-419.
- Parker, S. K., & Collins, C. G. (2010). Taking stock: Integrating and
  differentiating multiple proactive behaviors. *Journal of Management*,
  36(3), 633-662.
- Thomas, J. P., Whitman, D. S., & Viswesvaran, C. (2010). Employee
  proactivity in organizations: A comparative meta-analysis of emergent
  proactive constructs. *Journal of Occupational and Organizational
  Psychology*, 83(2), 275-300.
- Burt, R. S. (1992). *Structural Holes: The Social Structure of
  Competition.* Harvard University Press. See also Burt (2000), "The
  Network Structure of Social Capital."
- Ashford, S. J., & Cummings, L. L. (1983). Feedback as an individual
  resource: Personal strategies of creating information. *Organizational
  Behavior and Human Performance*, 32(3), 370-398.
- Anseel, F., Beatty, A. S., Shen, W., Lievens, F., & Sackett, P. R.
  (2015). How are we doing after 30 years? A meta-analytic review of the
  antecedents and outcomes of feedback-seeking behavior. *Journal of
  Management*, 41(1), 318-348.
- Agarwal, R., & Prasad, J. (1998). A conceptual and operational
  definition of personal innovativeness in the domain of information
  technology. *Information Systems Research*, 9(2), 204-215.
- Rogers, E. M. *Diffusion of Innovations* (multiple editions).
- Ng, T. W. H., Eby, L. T., Sorensen, K. L., & Feldman, D. C. (2005).
  Predictors of objective and subjective career success: A meta-analysis.
  *Personnel Psychology*, 58(2), 367-408.
- Elliot, A. J., & McGregor, H. A. (2001). A 2×2 achievement goal
  framework. *Journal of Personality and Social Psychology*, 80(3),
  501-519. (Recalled reference, not independently re-verified via search
  this session — cited for the standard mastery/performance ×
  approach/avoidance framework underlying §1's Motivation facet read;
  flag for verification before any citation of it in shipped copy.)
- Ellsberg, D. (1961). Risk, ambiguity, and the Savage axioms. *Quarterly
  Journal of Economics*, 75(4), 643-669. (Recalled reference, same caveat
  as above — cited for the standard risk/ambiguity distinction underlying
  §1's read of `risk_tolerance` vs. `ambiguity_tolerance`.)

Internal sources: `src/core/attributes/attributes.ts`,
`src/core/quiz/bank.ts` (via `docs/quiz-structure.md`),
`src/core/interpretation/rules.ts`, `src/core/greatness/greatness.ts`,
live output of `src/dev/diagnose.ts` and `src/dev/trait-diagnostic.ts`
against the current 56-item bank, `docs/phase7-provisional-checkpoint.md`.
