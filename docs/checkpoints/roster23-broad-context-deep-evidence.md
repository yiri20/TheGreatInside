# Roster-23: Broad-Context Deep-Evidence Intake

Branch: `feat/roster23-broad-context-deep-evidence` (worktree:
`C:\Users\Lenovo\TheGreatInside-roster23-broad-context-deep-evidence`,
created from `origin/main` at `5b4fd65208aa7640829af647ca79d1640912967c`,
confirmed matching before branching).

## The hypothesis this cycle tested

Roster22 (Giuseppe Garibaldi) reached 17 scored attributes, coverage
0.501, 9 high-confidence rows, and a high-confidence average of 0.604 —
materially better confidence than roster21, but breadth/coverage still
fell short. Roster22's own checkpoint noted his 3 sources concentrated
almost entirely on his public military/political life. Roster23's
hypothesis: a candidate whose sources instead span genuinely **different**
behavioral contexts (private, professional, relational, conflict,
failure, values, later-life) would produce better breadth/coverage than
Garibaldi's narrower-but-deeply-corroborated profile. `eligibility_v2`
itself was not touched (verified read from `src/core/matching/similarity.ts`
this session — `minScoredAttributes: 18`, `minCoverage: 0.6`,
`highConfidence: { threshold: 0.5, minCount: 12, minAverageConfidence: 0.55 }`,
unchanged).

## Part C — Exclusions

Mechanically combined: 125 live `SEED_PEOPLE` slugs + 276 existing
`data-pipeline/candidates/*.json` files (275 pre-roster23 + Giuseppe
Garibaldi) = **311 distinct slugs**, verified by script. Manually
excluded on top (per the brief, not covered by the JSON set): Sylvia
Pankhurst, Clara Schumann, Sergei Eisenstein, Beatrice Webb, plus every
name carried forward from roster21/22's own manual exclusion lists
(Helen Keller, Aleksandr Solzhenitsyn, Emma Goldman, Clara Barton, John
Muir, Charles Lindbergh, P. T. Barnum, Carl Sagan, Jackie Robinson,
Ashoka, Chandragupta Maurya, Rabban Bar Sauma, Leo Africanus, Edmund
Hillary). Anton Chekhov (QID Q5685) was checked against the full
combined set by name — no collision.

## Part D/E — Discovery for behavioral-context breadth

Rather than a wide discovery pool, this cycle tested source-ecosystem
*breadth of life-domain coverage* directly for one candidate against the
"different contexts, not just more sources on the same domain" standard.
**Anton Chekhov** stood out immediately: a writer AND practicing
physician, with:

1. **His own letters** (self) — *Letters of Anton Chekhov to His Family
   and Friends*, actually read across 1875-1904 via targeted
   browser+JavaScript text-window extraction (the same technique used in
   roster22), surfacing material on family finances, his medical
   practice, his craft development, the 1896 premiere of *The Seagull*,
   the 1898 Dreyfus Affair, and his final months at Badenweiler.
2. **Maxim Gorky's independent memoir** — a close friend and fellow
   writer's own firsthand account.
3. **Alexander Kuprin's independent memoir** — a second, separately-
   authored close friend's firsthand account (published in the same
   volume as Gorky's and Bunin's, but each individually attributed and
   read separately for its own specific content).
4. **Ivan Bunin's independent memoir** — a third, separately-authored
   close friend's firsthand account.

A fifth source, William Gerhardi's 1923 scholarly study, was actually
opened and read (via the same browser-extraction technique, confirming
real content, not a shallow fetch) but found to be almost entirely
literary criticism of Chekhov's stories and plays rather than biographical
material about the man — one usable biographical fact (his grandfather's
serf origins) was extracted but is not cited in any scored row, disclosed
honestly rather than stretched to justify counting it as a fifth
perspective.

No numeric trait-count prediction was made before selecting Chekhov, and
no second candidate's ecosystem was tested — per the brief's explicit
allowance ("one is acceptable if only one ecosystem is clearly strong"),
research effort concentrated entirely on reading Chekhov's 4 sources
substantially.

## Part H — Context-coverage check (descriptive, not a gate)

| Life context | Evidence found? | Source(s) |
|---|---|---|
| Formation / origins | Yes | Gerhardi (context only, not scored) |
| Private / family | Yes | Self (brother Nikolay conflict, illness concealment, Badenweiler care) |
| Professional / work habits | Yes | Self (medical fees), Kuprin (private writing routine) |
| Collaboration / mentorship | Yes, richly | Self (Gorky correspondence), Gorky, Kuprin, Bunin |
| Conflict with peers/critics | Yes | Self (Kiselyov "Mire" dispute) |
| Conflict with institutions / values under pressure | Yes | Self (Dreyfus Affair) |
| Failure / setback | Yes | Self (1896 Seagull premiere) |
| Recovery from setback | Yes | Self (same episode) |
| Civic / institutional engagement | Yes | Self (Zemstvo, cholera campaign, infrastructure) |
| Later-life reflection / adaptation | Yes | Self (Badenweiler) |
| Humor / social temperament | Yes | Gorky, Kuprin, Bunin |

**Not `CONTEXTUALLY_THIN`** — genuinely the opposite of Garibaldi's
concentration problem: nearly every requested life-context category has
real, directly-read evidence. This makes the eligibility result below a
clean test of the hypothesis, not a confound from thin research.

## Part I — Corroboration matrix (diagnostic; not a gate)

| Dimension | Sources converging | Same or separate episodes | Convergence |
|---|---|---|---|
| discipline (stoicism under illness) | Self, Kuprin, Bunin | Separate | **Strong** (3 sources) |
| collaboration (mentorship) | Self, Gorky, Kuprin | Separate | **Strong** (3 sources) |
| social_assertiveness (visitor management) | Gorky, Kuprin | Separate | Moderate (2 sources) |
| autonomy_need (creative reserve) | Kuprin, Bunin | Separate | Moderate (2 sources) |
| independent_thinking (Dreyfus) | Self only | 2 distinct facts | Self-only, moderate |
| adaptability (Seagull failure+recovery) | Self only | 2 distinct facts | Self-only, moderate |
| impact_motivation (medical practice) | Self only | 2 distinct facts | Self-only, moderate |
| conflict_tolerance, analytical_rigor, proactive_agency, persuasiveness, persistence, detail_orientation, belief_updating | Single source each | 1 fact each | Low |

**The key structural finding**: only 2 dimensions (discipline,
collaboration) reach 3-source convergence, versus Garibaldi's 3 dimensions
at 3-source convergence (risk_tolerance, leadership_drive, decisiveness)
plus several more at 2-source convergence. Chekhov's broader context
coverage spread the evidence across more *distinct* dimensions rather than
concentrating repeated corroboration on a few — exactly the tradeoff this
cycle set out to test.

## Part J — Evidence freeze

Confirmed before scoring: all 4 sources' actually-read content recorded in
the candidate JSON's `sources` array; research stopped completely before
the scoring section was written; no existing production person's or
candidate's score was consulted as a target; validator was not yet run.

## Part K — Scoring (once)

14 attributes scored once, conservatively. 7 rows draw genuine confidence
from 2-3 independently-converging sources; 7 rest on a single perspective
(6 self-authored, 1 Bunin-only) and are capped at `inference` or low
`strong_inference`. No row was scored toward a known high-baseWeight
attribute; no quota was chased.

## Part L — `eligibility_v2` result (validator run once, read literally)

| Metric | Chekhov (roster23) | Garibaldi (roster22) | Floor | Chekhov pass? |
|---|---|---|---|---|
| Scored attributes | **14** | 17 | >=18 | No |
| Coverage | **0.416** | 0.501 | >=0.6 | No |
| High-confidence count | **7** | 9 | >=12 | No |
| High-confidence average | **0.566** | 0.604 | >=0.55 | **Yes** |

**Not eligible** — fails 3 of 4 criteria, same pattern as Garibaldi, but
**every single metric is worse than Garibaldi's**, despite genuinely
broader life-context coverage (see Part H). Scoring was completed and
frozen before the validator was run; these numbers are read directly from
its output, unedited.

## Answering the hypothesis directly

**Did broader life-context evidence improve scored breadth? No** — 14 vs.
Garibaldi's 17.
**Coverage? No** — 0.416 vs. 0.501.
**High-confidence count? No** — 7 vs. 9.
**Eligibility? No** — both candidates fail on the same 3 criteria.

**Why the hypothesis didn't hold, mechanically**: broad life-context
coverage is not the same property as *corroboration density*. When 3-4
independent sources each cover a genuinely *different* facet of a
person's life (as Chekhov's do), most individual canonical attributes end
up resting on only ONE of those sources — richly evidenced in an absolute
sense, but not independently cross-corroborated, which is what raises
confidence past 0.5 under this project's rubric. Garibaldi's sources, by
contrast, mostly narrated the *same* narrow set of public-life episodes
(battles, leadership crises, political conflict) from 3 different angles,
so the SAME few dimensions (risk_tolerance, decisiveness, leadership_drive)
got hit repeatedly and could be scored at genuinely high confidence. Put
directly: **breadth of life-context and depth of per-dimension
corroboration are in tension** when sources are read for their own
distinct content rather than as multiple retellings of the same events —
this cycle's central, concrete finding, not a claim proven at n=1+1 but a
directly falsifiable pattern for a future cycle to test further (e.g.
against a candidate whose broad-context sources happen to *also* repeatedly
corroborate a handful of the same dimensions).

## Part M — No rescue (explicit confirmation)

After running `validateCandidates.ts` once and reading the result above:
no new research was performed; no row was added; no confidence value was
raised; no row was reinterpreted to chase a threshold; no low-weight
attribute was deleted or replaced to manipulate coverage. The only edits
made afterward were: `status` to `held`, a `holdReason` quoting the
validator's own numbers verbatim, and a `computedEligibility` snapshot.

## Part N — qa_passed audit

**Not applicable.** Chekhov did not reach `qa_passed`.

## Part O/P — Product completion / production files

**Not applicable.** No candidate survived `eligibility_v2`; no portrait,
editorial, i18n, or production wiring was attempted; no
`generateRoster23.ts` or `roster23.ts` file exists on this branch.

## Part S — Diff discipline

Exactly 4 files: 1 new candidate JSON
(`data-pipeline/candidates/anton-chekhov.json`), 1 new checkpoint doc
(this file), and 2 modified pointer docs (`docs/checkpoints/roster.md`,
`docs/context/CURRENT_STATE.md`). No existing person, candidate, roster
file, seed import, generated index, dispersion/calibration data, portrait,
editorial content, i18n file, or test fixture was touched. `next-env.d.ts`'s
pre-existing unrelated modification does not exist on this branch, created
fresh from `origin/main` at the confirmed SHA.

## Validation (research-only path)

- `validateCandidates.ts` — **0 errors, 0 warnings** across 277 candidate
  files (276 pre-existing + 1 new). By status: 93 `qa_passed`, 184 `held`.
- `checkScoringLockIntegrity.ts` — **0 flagged** across 276
  previously-committed candidate files.
- `tsc --noEmit` — clean.
- `vitest run rosterQuality` — **18/18 passed**.
- No full build, no Playwright — correctly skipped (no production data
  touched).

## Roster count confirmation

**Unaffected: still 125 people, 124 match-eligible.**

## Disposition

Zero candidates promoted this cycle. Per the brief's explicit stop
condition, roster24 is **not** automatically begun. The concrete,
falsifiable finding — that broad life-context source coverage measurably
*reduced* per-dimension corroboration density relative to a narrowly-
concentrated source set, producing a worse eligibility profile despite
richer, more diverse evidence in an absolute sense — is a real result
about this project's roster-expansion program, not a methodology
document for its own sake. Two consecutive deep-research cycles (roster22,
roster23), using two different, deliberately opposite evidence
strategies, have both landed short of `eligibility_v2` in the same
structural way (3 of 4 criteria failing, only high-confidence average
clearing). This pattern across two structurally different approaches is
itself the signal that the next decision — whether `eligibility_v2` is
mis-calibrated against what this era of research can produce, whether an
entirely different evidence architecture is needed, or whether the
program should pause — needs to be made deliberately, not resolved by
another candidate-search cycle.

**`ROSTER23_RESEARCH_ONLY_PR_READY`**
**`ROSTER_EXPANSION_METHOD_REQUIRES_DECISION`**
