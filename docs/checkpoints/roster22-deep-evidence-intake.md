# Roster-22: Deep-Evidence Intake

Branch: `feat/roster22-deep-evidence-intake` (worktree:
`C:\Users\Lenovo\TheGreatInside-roster22-deep-evidence-intake`, created from
`origin/main` at `a30b9ca89f255c8e84c688e3524a92400456172c`, confirmed
matching before branching).

## Why this cycle exists

Roster21 (simplified evidence-first intake) froze 4 candidates from
bounded 2-source evidence packs. All 4 failed `eligibility_v2`, and every
one's real bottleneck was **confidence, not breadth**: Scott/Sherman/Nansen
each reached only 4 attributes at confidence >=0.5 (need 12); Isabella
Bird reached 17 scored attributes (1 short of 18) but only 2 high-confidence
rows. `eligibility_v2` itself was never touched. Roster22's mandate:
change research **depth**, not the gate — select a very small number of
candidates (2-3, or fewer if warranted) with unusually strong,
multi-provenance source ecosystems, and read them substantially rather than
sampling early chapters, to test whether genuine corroboration across 3+
independent perspectives can lift high-confidence count/average where
roster21's 2-source packs could not.

## Part C — Exclusions

Mechanically combined: 125 live `SEED_PEOPLE` slugs + 275 existing
`data-pipeline/candidates/*.json` files (271 pre-roster22 + the 4 roster21
candidates) = **310 distinct slugs**, verified by script. On top of this,
manually excluded (per the brief, not covered by the JSON set since none
were ever scored): Sylvia Pankhurst, Clara Schumann, Sergei Eisenstein,
Beatrice Webb (roster21 discovery candidates), plus roster21's own carried-
forward manual exclusions (Helen Keller, Aleksandr Solzhenitsyn, Emma
Goldman, Clara Barton, John Muir, Charles Lindbergh, P. T. Barnum, Carl
Sagan, Jackie Robinson, Ashoka, Chandragupta Maurya, Rabban Bar Sauma, Leo
Africanus, Edmund Hillary). Giuseppe Garibaldi (QID Q539) was checked
against the full combined set by name — no collision.

## Part D/E — Source-ecosystem discovery

Rather than building a wide discovery pool, this cycle tested source depth
directly for a small number of plausible candidates against the "3+
genuinely distinct provenance perspectives" bar, actually opening sources
rather than counting search hits. **Giuseppe Garibaldi** stood out
immediately and decisively:

1. **His own Autobiography** (self) — actually read across two English
   translations (a 3-volume edition and Theodore Dwight's earlier
   translation/compilation), both counted as ONE self-perspective per this
   project's standing convention, covering childhood, South America exile,
   the 1849 Roman Republic, the 1859 return to politics, the 1862
   Aspromonte clash with his own government, the 1867 Mentana defeat, and
   his 1854-59 Caprera retirement.
2. **G. M. Trevelyan's independent scholarly biography trilogy** — actually
   read across two of its three volumes (*Garibaldi's Defence of the Roman
   Republic*, 1907; *Garibaldi and the Making of Italy*, 1911), a
   genuinely independent, non-self, professionally-researched historical
   account.
3. **Margaret Fuller's own eyewitness dispatches** (*At Home and Abroad*,
   1856) — a contemporaneous American journalist physically present in
   Rome during the 1849 siege, an independent first-person witness to
   Garibaldi's conduct, distinct from both his own voice and Trevelyan's
   later scholarly reconstruction.

**A real tooling obstacle, and how it was resolved (per the brief's
explicit instruction not to mistake truncation for shallowness):** this
session's page-fetch tool (`WebFetch`) repeatedly returned only the first
~200 pages of these very long 19th-century texts (Fuller's book alone is
~950,000 characters), regardless of how the prompt was phrased. Rather
than concluding the sources were shallow, the Browser tool was used
instead: the actual page was opened in a browser tab, then targeted
JavaScript (`document.body.innerText.indexOf(...)`) located every mention
of "Garibaldi" (or a relevant keyword) across the FULL document and
extracted real text windows around each occurrence directly — bypassing
the fetch tool's summarization ceiling entirely. This surfaced Fuller's
entire eyewitness account of the fall of Rome (a passage the naive fetch
attempt never reached), including Garibaldi's own wife Anita following him
on horseback, his visible red-tunic risk-taking, and his composed
departure from the city.

No fourth candidate's ecosystem was tested once Garibaldi's was confirmed
this strong — per the brief's explicit permission ("if only 1 candidate
has an excellent source ecosystem, doing 1 deeply is acceptable"),
research effort was concentrated entirely on reading Garibaldi's 3 sources
substantially (whole-life coverage) rather than splitting effort across a
second, likely-thinner candidate.

## Part D selection question, answered qualitatively (no trait-count table)

"Can several genuinely independent sources illuminate this person's
behavior across different life domains?" — yes, concretely: early
formation and a formative act of spontaneous rescue (autobiography);
South America exile and a return to ordinary labor after professional
rejection (autobiography); the 1849 Roman Republic's fall, corroborated
independently by both his own account and Fuller's real-time eyewitness
dispatch; a documented, sustained conflict with his ally Mazzini
(autobiography + Trevelyan); a direct armed clash with his own
government's forces at Aspromonte in 1862 (autobiography); the 1860
campaign and the Teano handover of conquered territory to Victor Emmanuel
(Trevelyan, including an internally-quoted eyewitness passage from Jessie
White Mario); and a quiet 1854-59 retirement followed by a swift return to
public life (autobiography). No numeric trait-prediction table was built
at any point before freezing.

## Part F — Evidence ledger (condensed; full incident-by-incident detail lives in the candidate JSON's row rationales)

| Domain | Episode | Source(s) | Provenance | Directness |
|---|---|---|---|---|
| Early formation / risk | Jumped into a ditch to save a drowning woman, unprompted | Autobiography | self | direct |
| Combat leadership | Rallied 13 men against ~150 attackers at Charginada | Autobiography | self | direct |
| Exile / setback | Rejected for shipboard work in America; returned to work at the tallow rather than give up | Autobiography | self | direct |
| Conflict with allies | Disagreed with Mazzini's military judgment; resented Rosselli's command | Autobiography | self | direct |
| Family / partnership | Anita insisted on joining a life-threatening 1849 retreat against his wishes | Autobiography | self | direct |
| Loss / collaboration | Officer desertions and deaths (Masina, Manara, Mameli) grieved him more than combat itself | Autobiography; independently, Fuller documents his going to the Assembly the same day his best officers fell | self + independent eyewitness | direct + near-direct |
| Institutional conflict | Attacked by his own new national army at Aspromonte (1862); repositioned to defensible ground; ate raw unripe potatoes while cut off and starving | Autobiography | self | direct |
| Sustained resolve | Mass desertion at Mentana (1867); reproduces Mazzini's own letter (dated Feb 11 1870) admitting he lacked confidence in the plan | Autobiography | self (quoting an ally directly) | direct |
| Disengagement/return | 5 years' quiet retirement at Caprera (1854-59), then immediate return to active politics on Cavour's summons, despite a republican background | Autobiography | self | direct |
| Values over reward | To a companion's complaint about irregular pay: "What do you want with pay?... what more can any one want?" | Trevelyan (quoting Bandi) | independent | near-direct |
| General character | "Courage and endurance without limit," "tenderness to man and to all living things," but "child-like simplicity that often degenerated into folly" | Trevelyan | independent | scholarly assessment |
| Leadership style | Charismatic ("fill men with ardour by his presence"), not methodical; "never understood" administrative/political life | Trevelyan | independent | scholarly assessment |
| Institutional dismissal | At Teano (1860), told his volunteer army was no longer needed; responded with rueful composure, not protest | Trevelyan (containing an internally-quoted Jessie White Mario passage) | independent | near-direct |
| Visible risk-taking | Deliberately wore a bright red tunic marking him as a target throughout his career, wounded repeatedly | Fuller | independent eyewitness | direct |
| Composure under defeat | Calmly surveyed the sole escape route with a spyglass before leading his column out of a collapsing Rome | Fuller | independent eyewitness | direct |
| Followership | Soldiers defected from other regiments specifically to join his column, with no safety guaranteed | Fuller | independent eyewitness | direct |
| Autonomy under pressure | Led his column out of Rome after Oudinot explicitly refused to guarantee safe passage | Fuller | independent eyewitness | direct |

## Part G — Corroboration matrix (diagnostic; not a gate)

| Dimension | Perspective A | Perspective B | Perspective C | Same episode or separate? | Convergence |
|---|---|---|---|---|---|
| risk_tolerance | Autobiography (drowning rescue, Charginada) | Trevelyan ("courage without limit") | Fuller (red tunic, no safe-passage exit) | Separate episodes, same pattern | **Strong** (3 sources) |
| leadership_drive | Autobiography (Charginada) | Trevelyan (charisma) | Fuller (defections to follow him) | Separate | **Strong** (3 sources) |
| decisiveness | Autobiography (Aspromonte reposition) | Trevelyan ("passion not calculation") | Fuller (spyglass route choice) | Separate | **Strong** (3 sources) |
| persuasiveness | — | Trevelyan (charisma) | Fuller (actual defections) | Separate | Moderate-strong (2 sources) |
| conflict_tolerance | Autobiography (Mazzini disputes, Aspromonte) | Trevelyan ("bitter quarrels") | — | Separate | Moderate-strong (2 sources) |
| impact_motivation | Autobiography (grief over desertions) | Trevelyan (Bandi pay quote) | — | Separate | Moderate (2 sources) |
| autonomy_need | Autobiography (Rosselli resentment) | — | Fuller (no-safe-passage exit) | Separate | Moderate (2 sources) |
| collaboration | Autobiography (Anita, officer grief) | — | Fuller (Assembly visit after officers fell) | Separate, same underlying bond | Moderate (2 sources) |
| independent_thinking | Autobiography (2 distinct episodes) | — | — | Separate | Self-only, moderate |
| persistence, proactive_agency, belief_updating, adaptability, resourcefulness | Autobiography only | — | — | Single episodes | Self-only, low |
| ambiguity_tolerance | — | Trevelyan (Teano reaction) | — | Single episode | Single-source, low |
| planning_orientation (low), analytical_rigor (low) | — | Trevelyan (2 distinct facts) | — | Same source, distinct facts | Single-source, low-moderate |

No dimension was forced to reach a target corroboration count; several
single-source rows were kept at low confidence rather than discarded or
inflated, per the brief's explicit instruction.

## Part H — Fact-cluster anti-duplication review

The Aspromonte episode was deliberately capped at 2 primary attributes
(decisiveness, conflict_tolerance) despite touching persistence and
resourcefulness too — those two were scored instead from a different,
uncontested episode (the tallow-work return, and the potato-foraging
detail respectively) to avoid over-mining one incident. The drowning-
rescue episode legitimately supports both `risk_tolerance` (accepting
danger) and `proactive_agency` (unprompted initiative) — disclosed
explicitly in both rows' rationale as sharing one underlying fact, not
treated as two independent corroborating instances. No cluster was allowed
to silently inflate the high-confidence count.

## Part I — Evidence freeze

Confirmed before any scoring: all 3 sources' actually-read content was
recorded in the candidate JSON's `sources` array; research on Garibaldi
stopped completely before this checkpoint's scoring section was written;
no existing production person's or candidate's score was consulted as a
target; **validator results were not yet computed at this point.**

## Part J — Scoring (once)

17 attributes scored once, conservatively, against
`docs/scoring-rubric-v1.md`. 9 rows draw genuine confidence from 2-3
independently-converging sources (`documented` or the upper
`strong_inference` band); 8 rows rest on a single perspective and are
capped at `inference` or the low end of `strong_inference`, including two
rows deliberately scored *low* (`planning_orientation` 30,
`analytical_rigor` 32) from Trevelyan's own documented criticism — an
honest weakness, not a halo-effect assumption of uniform excellence.

## Part K — `eligibility_v2` result (validator run once, read literally)

| Metric | Value | Floor | Pass? |
|---|---|---|---|
| Scored attributes | 17 | >=18 | **No** (1 short) |
| Coverage | 0.501 | >=0.6 | No |
| High-confidence count | 9 | >=12 | No |
| High-confidence average | **0.604** | >=0.55 | **Yes** |

**Not eligible** — 3 of 4 criteria still fail, but this is the first
candidate across the entire roster17-22 arc whose high-confidence average
clears 0.55, and its high-confidence count (9) more than doubles roster21's
best (4, shared by Scott/Sherman/Nansen). Scoring was completed and the
candidate JSON committed to this checkpoint's evidence section before the
validator was run; the numbers above are read directly from its output,
unedited.

## Comparison with roster21

| Candidate | Sources (independent perspectives) | Scored | Coverage | High-conf. count | High-conf. avg |
|---|---|---|---|---|---|
| Scott (roster21) | 2 | 14 | 0.412 | 4 | 0.51 |
| Sherman (roster21, corrected) | 1 | 12 | 0.361 | 4 | 0.51 |
| Nansen (roster21) | 2 | 14 | 0.415 | 4 | 0.53 |
| Bird (roster21) | 2 | 17 | 0.511 | 2 | 0.53 |
| **Garibaldi (roster22)** | **3** | **17** | **0.501** | **9** | **0.604** |

**Explicit answers to the brief's question:**
- **Scored breadth**: not materially improved — 17 ties Bird's roster21
  best, still 1 short of the floor.
- **Coverage**: not materially improved — 0.501 is close to Bird's 0.511,
  both well under 0.6. Deeper research on fewer people did not, by itself,
  supply more attribute breadth; breadth is bounded by how many genuinely
  distinct canonical dimensions the person's *actual documented life*
  supports, not by how many sources are read.
- **High-confidence count**: **materially improved** — 9 vs. a roster21
  ceiling of 4, more than double.
- **High-confidence average**: **materially improved, and now clears the
  gate's own threshold** — 0.604 vs. roster21's best of 0.53 — the first
  time in the roster17-22 arc this specific sub-criterion has passed.

The practical implication: genuine multi-provenance depth is the right lever
for the *confidence* half of `eligibility_v2`, but the *count/coverage*
half needs either a person whose documented life naturally spans more
distinct behavioral dimensions, or more sources still (a 4th, 5th
independent perspective) — not a conclusion this cycle is positioned to
draw with certainty from an n=1 deep-research sample, but a directly
falsifiable, concrete hypothesis for any future cycle to test.

## Part L — No rescue (explicit confirmation)

After running `validateCandidates.ts` once and reading the result above:
no new research was performed; no row was added; no confidence value was
raised; no row was reinterpreted to chase a threshold; no low-weight
attribute was deleted or replaced to manipulate coverage. The only edits
made afterward were: `status` to `held`, a `holdReason` quoting the
validator's own numbers verbatim, and a `computedEligibility` snapshot —
mechanical/lifecycle fields only.

## Part M — qa_passed audit

**Not applicable.** Garibaldi did not reach `qa_passed`; per the brief,
Part M is scoped to `qa_passed` candidates only.

## Part N/O — Product readiness / production wiring

**Not applicable.** No candidate survived `eligibility_v2`; no portrait,
editorial, i18n, or production wiring was attempted; no
`generateRoster22.ts` or `roster22.ts` file exists on this branch.

## Part Q — Diff discipline

Exactly 4 files: 1 new candidate JSON
(`data-pipeline/candidates/giuseppe-garibaldi.json`), 1 new checkpoint doc
(this file), and 2 modified pointer docs (`docs/checkpoints/roster.md`,
`docs/context/CURRENT_STATE.md`). No existing person, candidate, roster
file, seed import, generated index, dispersion/calibration data, portrait,
editorial content, i18n file, or test fixture was touched. `next-env.d.ts`'s
pre-existing unrelated modification (present on the original checkout's
`feat/trait-explanation-ux` branch) does not exist on this branch, created
fresh from `origin/main` at the confirmed SHA.

## Validation (research-only path)

- `validateCandidates.ts` — **0 errors, 0 warnings** across 276 candidate
  files (275 pre-existing + 1 new). By status: 93 `qa_passed`, 183 `held`.
- `checkScoringLockIntegrity.ts` — **0 flagged** across 275
  previously-committed candidate files.
- `tsc --noEmit` — clean.
- `vitest run rosterQuality` — **18/18 passed**.
- No full build, no Playwright — correctly skipped (no production data
  touched).

## Roster count confirmation

**Unaffected: still 125 people, 124 match-eligible.**

## Disposition

**`ROSTER22_RESEARCH_ONLY_PR_READY`** — 1 candidate (Giuseppe Garibaldi)
researched deeply from 3 genuinely independent, substantially-read
provenance perspectives; scored once (17 attributes); failed
`eligibility_v2` on scored-count (17/18) and coverage (0.501/0.6), but
cleared the high-confidence-average floor for the first time in the
roster17-22 arc (0.604) and more than doubled the prior best
high-confidence count (9 vs. 4); no rescue attempted; roster unaffected at
125/124.
