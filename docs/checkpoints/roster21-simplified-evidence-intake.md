# Roster-21: Simplified Evidence-First Intake

Branch: `feat/roster21-simplified-evidence-intake` (worktree:
`C:\Users\Lenovo\TheGreatInside-roster21-simplified-evidence-intake`, created
from `origin/main` at `c5b2d4b11d2f898308c6fefb8db5ec6ae2b102d9`, confirmed
matching before branching).

## Why roster20's pre-freeze hard gates were retired

The eligibility/evidence calibration audit
([`eligibility-evidence-calibration.md`](eligibility-evidence-calibration.md))
mechanically re-derived roster20's own literal-attribute-count method against
5 already-live, high-quality production profiles (Julius Caesar, Isaac
Newton, Ludwig van Beethoven, Malala Yousafzai, Abraham Lincoln) and found a
median fresh literal attribute count of **5** (range 4-10) — **0 of 5**
cleared roster20's `>=12` incident floor, **0 of 5** cleared its `>=20`
attribute floor, even for people whose full, already-shipped production
profiles carry 21-32 scored attributes. The pre-freeze gate was measuring
something a normal-scale, honestly-bounded research pass essentially cannot
reach, on people this project has already accepted as production-quality —
not a real breadth signal a fresh candidate could be pre-screened against.
Roster21's brief explicitly retired the `>=12` incident floor, `>=6`
fact-cluster floor, and `>=20`/`>=22` mapped-attribute floor as **pre-freeze**
gates. **`eligibility_v2` — the real, final acceptance gate — is completely
unchanged**: `scored >= 18`, `coverage >= 0.6`, high-confidence subset
`count >= 12` at confidence `>= 0.5` with `avgConf >= 0.55` (verified read
from `src/core/matching/similarity.ts` this session; not touched).

The simplification is about **when** judgment is applied — freeze based on
"is there enough credible, behaviorally rich, multi-provenance material to
justify a serious scoring attempt," then score once and let the real gate
decide — not about lowering the real bar. See "No post-validator rescue"
below for confirmation this was followed.

## Part C — Exclusion universe

Mechanically constructed and verified by script, not by memory:
- All 125 live `SEED_PEOPLE`/`peopleIndex.generated.ts` slugs.
- All 271 existing `data-pipeline/candidates/*.json` files (every roster
  2-20 candidate, scored/held/rejected/qa_passed alike) — this already
  covers Che Guevara, Nellie Bly, Carl Jung, Katharine Hepburn, and every
  roster17/18/19 candidate named in the brief, since all of them already
  exist as candidate JSON.
- Combined, deduplicated: **306 distinct slugs**.
- Manually added on top (named in prior checkpoints/narrative but never
  scored, so absent from the JSON-file exclusion set above): Helen Keller,
  Aleksandr Solzhenitsyn, Emma Goldman, Clara Barton, John Muir (roster20's
  5 fully-evaluated candidates, all held), Charles Lindbergh, P. T. Barnum,
  Carl Sagan, Jackie Robinson (roster20's 4 `SOURCE_ACCESS_INSUFFICIENT`
  candidates), Ashoka, Chandragupta Maurya, Rabban Bar Sauma, Leo Africanus
  (roster-expansion-125 program alternates), Edmund Hillary (set aside in
  roster17 for a taxonomy gap, not evidence quality).

Every discovery candidate below was checked against this full set by name
before research began, and Wikidata-QID-verified via a live fetch (not a
cached assumption) once a real candidate emerged.

## Part D — Discovery pool

8 candidates, deliberately spanning exploration, military command, activism,
and filmmaking rather than concentrating on scientists (0 scientists in the
final pool):

| Candidate | Profession | QID |
|---|---|---|
| Robert Falcon Scott | Explorer (Royal Navy) | Q102527 |
| William Tecumseh Sherman | Military commander | Q188936 |
| Fridtjof Nansen | Explorer / scientist / diplomat | Q72292 |
| Isabella Bird | Explorer / travel writer | Q288210 |
| Sylvia Pankhurst | Activist (suffragette) | not verified — deprioritized before QID check, see Part E |
| Clara Schumann | Musician (pianist/composer) | not verified — deprioritized before QID check |
| Sergei Eisenstein | Filmmaker | not verified — deprioritized before QID check |
| Beatrice Webb | Social reformer / economist | not verified — deprioritized before QID check |

No slug or QID collision with the 320-name exclusion set for any candidate.

## Part E — Source-access gate (lightweight, before deep research)

Every source below was **actually fetched this session** (`WebFetch`), not
just found via search — a `WebSearch` result alone never counts, per the
same standard the eligibility-evidence-calibration audit already
established. Wikipedia was consulted for orientation only and does not
count toward the gate.

| Candidate | Sources actually opened | Disposition |
|---|---|---|
| **Robert Falcon Scott** | (1) *Scott's Last Expedition, Vol. I* — his own journal (Gutenberg #11579) — webfetch-opened, real passages extracted (storm/fire crisis, pack-ice patience, self-doubt, crew-morale notes). (2) Apsley Cherry-Garrard, *The Worst Journey in the World* (Gutenberg #14363) — an independent eyewitness memoir by a fellow expedition member — webfetch-opened, real passages extracted (Discovery-expedition reorganization, comparative leadership assessment, Hooker collaboration). | **SOURCE_READY** — 2 total distinct provenance perspectives, 1 non-self. |
| **William Tecumseh Sherman** | (1) *Memoirs of General William T. Sherman* — his own complete autobiography (Gutenberg #4361) — webfetch-opened. (2) *The Sherman Letters* — correspondence with his brother, Senator John Sherman (archive.org, open full text) — webfetch-opened, a second, genuinely independent voice. Both sources' very long documents were only returned through their earlier chapters/pages by this session's fetch tool (a length-truncation limitation, not an access restriction — both texts are fully open); several famous later-war episodes were consequently only locatable via secondary citation, disclosed honestly in the candidate's provenance notes rather than treated as directly opened. | **SOURCE_READY** — 2 total distinct provenance perspectives, 1 non-self. |
| **Fridtjof Nansen** | (1) *Farthest North*, Vol. I — his own account (Gutenberg #30197) — webfetch-opened. (2) James Arthur Bain, *Fridtjof Nansen: His Life and Explorations* (1897) — independent contemporary biography (archive.org, open full text) — webfetch-opened, real passages extracted (childhood competitiveness, physical recklessness, the 1888 Greenland crossing, warmth with subordinates). | **SOURCE_READY** — 2 total distinct provenance perspectives, 1 non-self. |
| **Isabella Bird** | (1) *Unbeaten Tracks in Japan* — her own travel letters (Gutenberg #2184) — webfetch-opened, rich first-person passages (the Ito relationship, fear before departure, kit design, temple documentation). (2) Anna M. Stoddart, *The Life of Isabella Bird* (1906) — independent biography by a personal acquaintance, drawing on family papers (archive.org, open full text) — webfetch-opened. | **SOURCE_READY** — 2 total distinct provenance perspectives, 1 non-self. |
| **Sylvia Pankhurst** | Her own *The Suffragette* (1911, Gutenberg #54955) — webfetch-opened, real content extracted. A second source (her mother Emmeline Pankhurst's *My Own Story*, Gutenberg #34856 — a genuinely independent voice, given the family's later, well-documented political split) was also webfetch-opened with real content. Both sources genuinely qualify, **but** the 1911 book predates Sylvia's most personally dramatic documented episodes (imprisonment, hunger strikes, the 1913-14 family/political rift) by 2+ years — a real temporal-coverage gap, not a source-access failure. | **SOURCE_READY**, but not selected for freeze this cycle (see Part F) — deprioritized in favor of 4 candidates whose already-opened material had no comparable temporal gap, to keep the evidence-pack-building scope to the "approximately 3-5" the brief asks for. |
| **Clara Schumann** | Berthold Litzmann's *Clara Schumann: An Artist's Life* (1913 English translation, archive.org, open) was located and would likely have qualified, but functions as a single quasi-independent perspective (Litzmann narrates around extensive quotation of her own diaries rather than the diaries being separately publishable) — no second, cleanly distinct perspective was confirmed open this cycle. | **SOURCE_ACCESS_INSUFFICIENT** (deprioritized before a full check; not disproven, just not pursued further this cycle). |
| **Sergei Eisenstein** | His own *Immoral Memories* is `Access-restricted-item: true` on every archive.org copy checked, and a direct fetch of an external PDF copy (monoskop.org) returned HTTP 403. Only one independent source (Marie Seton's biography, archive.org, open full text) was confirmed genuinely open — rich content extracted (his mother's abandonment, the "clown mask" persona, his wartime pivot toward Japanese studies), but this is 1 total perspective (his own voice was never actually opened this cycle), not 2. | **SOURCE_ACCESS_INSUFFICIENT**. |
| **Beatrice Webb** | Every edition checked of her own diary/autobiography (*My Apprenticeship*, *The Diary of Beatrice Webb*) and both independent biographies found (Kitty Muggeridge's, the MacKenzie edition) are `Access-restricted-item: true` on archive.org, borrow-only, no full-text stream. | **SOURCE_ACCESS_INSUFFICIENT**. |

**5 of 8 pass the source-access gate** (Scott, Sherman, Nansen, Bird,
Pankhurst); 3 fail (Clara Schumann, Eisenstein, Beatrice Webb) — a real,
disclosed outcome, not papered over.

## Part F — Freeze

**4 candidates frozen**: Robert Falcon Scott, William Tecumseh Sherman,
Fridtjof Nansen, Isabella Bird. All 4 had rich, multi-domain material
already visible from the source-access pass itself (leadership under
crisis, self-doubt, family relationships, risk-under-fear, discipline,
collaboration, conflict) — a genuine "yes" to the simplified freeze
question, not a numeric-target prediction. Sylvia Pankhurst also passed
the source-access gate but was **not** frozen this cycle, to keep the
evidence-pack workload to the "approximately 3-5" candidates the brief
specifies and because her one open self-authored source has a real
temporal gap versus the other 4's fuller-life-arc coverage — an honest
scope decision, not a quality rejection; she remains a reasonable
starting point for a future cycle. **No roster20-style `>=20` literal-
attribute pre-freeze prediction table was built for any candidate** — see
"No reintroduced hard gate" below.

## Part G — Evidence packs

Each frozen candidate's evidence pack rests on the same 2 genuinely
`WebFetch`-opened, distinct-provenance sources named in Part E, read
directly this session (not summarized via `WebSearch`) for the specific
passages actually scored:

- **Scott**: 8 directly-quoted incidents spanning crisis decision-making,
  planning under pack-ice uncertainty, self-doubt/reflection, post-failure
  reorganization, and collegial friction — plus 3 extremely well-documented
  but only secondarily-cited late-expedition episodes (Oates's death, the
  final Message to the Public), used only as thin corroboration, never as
  a row's primary basis.
- **Sherman**: 13 directly-quoted incidents spanning insubordination/risk,
  organizational discipline, physical endurance, self-critical reflection,
  political disdain, and family loyalty — plus 3 well-documented but only
  secondarily-cited episodes (the 1861 "insane" press campaign, Willy's
  death, the Johnston/Stanton controversy), used only as corroboration.
- **Nansen**: 10 directly-quoted incidents spanning conviction against
  establishment skepticism, analytical rigor, extensive planning,
  competitiveness, physical recklessness, deep focus, and interpersonal
  warmth.
- **Bird**: 18 directly-quoted incidents (the richest pack this cycle)
  spanning chronic illness, family caregiving, publishing disputes,
  philanthropy, fear-under-risk, a complex guide relationship, and
  meticulous observation — narrowed to 17 scored rows after dropping one
  thin, ambiguous-fit incident (a pickpocketing episode with no clean
  canonical-attribute match).

No candidate was classified `PRE_SCORE_STRUCTURALLY_THIN` — all 4 had
genuinely rich enough material to justify a full scoring attempt.

## Part H — Fact-cluster discipline

Applied as an anti-duplication review, not a pre-freeze elimination rule.
No single incident was the primary basis for more than 3 proposed
attributes for any of the 4 candidates. The largest single-episode reuse
was Bird's chronic-illness-and-travel cluster (persistence, discipline,
adaptability, belief_updating — 4 attributes, all kept since each describes
a genuinely distinct behavioral dimension: enduring pain, self-imposed
routine, positive response to changed circumstance, and revised
self-assessment respectively) and Scott's post-failure-reorganization
cluster (adaptability, belief_updating — 2 attributes). No row was dropped
solely for hitting a mechanical cap; rows were dropped only where the
semantic-independence question ("does this describe a genuinely distinct
behavioral dimension?") came out no (e.g. Bird's pickpocketing episode, and
several Sherman/Nansen candidate rows during initial mapping that turned out
to restate an already-scored row from the same incident).

## Part I — Evidence freeze before scoring

For each of the 4 candidates: the evidence pack was finalized, the sources
actually read were recorded in the candidate JSON's `sources` array, and no
existing production person's or candidate's score was consulted as a
target before scoring. No literal 20-attribute prediction table was built.

## Part J — Scoring (once each)

All 4 candidates were scored exactly once, conservatively, against
`docs/scoring-rubric-v1.md`. Confidence was capped at `inference`
(0.20-0.49) or the low end of `strong_inference`/`documented` wherever a
row rested on only one of the two sources, or on a single episode without
independent corroboration — never inflated to help clear a threshold, since
scoring was completed and locked before `validateCandidates.ts` was ever
run.

## Part K — `eligibility_v2` results (validator run once, read literally)

| Candidate | Scored | Coverage | High-conf. count (need >=12) | High-conf. avg (need >=0.55) | Result |
|---|---|---|---|---|---|
| Robert Falcon Scott | 14 (need 18) | 0.412 (need 0.6) | 4 | 0.51 | **HELD** |
| William Tecumseh Sherman | 12 (need 18) | 0.361 (need 0.6) | 4 | 0.51 | **HELD** |
| Fridtjof Nansen | 14 (need 18) | 0.415 (need 0.6) | 4 | 0.53 | **HELD** |
| Isabella Bird | 17 (need 18) | 0.511 (need 0.6) | 2 | 0.53 | **HELD**, closest miss |

**0 of 4 crossed `eligibility_v2`.** This is consistent with roster17-20's
whole arc: a real, bounded, 2-independent-source research pass on a normal
schedule has not once produced an 18+/0.6/12-high-confidence profile
without either single-source-masquerading-as-multi-source shortcuts (the
original, later-reverted roster17 promotion) or many more sources/sessions
than this project's per-cycle scope supports. Isabella Bird came closest —
17 scored attributes, only 1 short of the floor — but her confidence
distribution (only 2 rows independently corroborated by both sources) is
the real, separate constraint the count alone doesn't show.

## Part L — qa_passed audit

**Not applicable.** Zero candidates reached `qa_passed` this cycle, so no
row-level evidence audit was performed (correctly — Part L is scoped to
`qa_passed` candidates only).

## Part M/N — Product readiness / production wiring

**Not applicable.** Zero candidates survived `eligibility_v2`, so no
portrait sourcing, editorial content, Korean localization, or production
wiring (`generateRoster21.ts`, `roster21.ts`, seed/index/dispersion) was
attempted. Per the brief's Part N: "If zero candidates survive: research-only
cycle; do NOT create a production roster21 file" — followed exactly; no
such files exist on this branch.

## No post-validator rescue (explicit confirmation)

After running `validateCandidates.ts` once and reading these 4 results:
- No new research was performed on any of the 4 candidates.
- No attribute was added to any candidate to raise its scored count or
  coverage.
- No confidence value was raised on any row.
- No evidence interpretation was changed to turn `scored` into `qa_passed`.
- The only edits made after seeing the validator output were: setting
  `status` to `held`, adding a `holdReason` quoting the validator's own
  numbers verbatim, and adding a `computedEligibility` snapshot — exactly
  the "mechanical schema fixes / computed lifecycle fields" the brief's
  Part K explicitly allows.
- `checkScoringLockIntegrity.ts` confirms 0 flagged across all 271
  previously-committed candidate files — none were touched.

## No reintroduced roster20 hard gate (explicit confirmation)

This cycle did not require, before freezing any candidate: >=12 incidents,
>=6 fact clusters, >=20 mapped canonical attributes, >=22 preferred
attributes, or >=12 STRONG/MODERATE proposed attributes. The freeze
decision for all 4 candidates (Part F) was made on the qualitative
question the brief specifies ("is there enough credible, behaviorally rich,
multi-provenance material to justify a serious scoring attempt"), evaluated
directly from the source-access pass's already-extracted content, not from
a literal counted table built and gated on before freeze. The fact-cluster
cap in Part H was applied as a review discipline exactly as instructed, not
as a pre-freeze elimination rule — no candidate was rejected at the freeze
stage for a cluster or attribute count.

## Distinguishing the two gates

- **`eligibility_v2`** (unchanged: `scored>=18`, `coverage>=0.6`,
  high-confidence `count>=12` at confidence `>=0.5`, `avgConf>=0.55`) is
  the **only** gate that determines whether a candidate is actually
  promotable. It is implemented in code
  (`evaluateMatchEligibility()`, `src/core/matching/similarity.ts`) and was
  not touched, discussed as a candidate for change, or worked around this
  cycle.
- **Roster21's source/evidence preflight** (Parts D-E: discovery, QID
  verification, actual-open-access testing, a qualitative "is this worth a
  scoring attempt" freeze judgment) is a **research-efficiency filter
  only** — it decides which candidates are worth the time to build a full
  evidence pack for for, and carries zero authority to admit or reject a
  candidate from the real roster. All 4 frozen candidates passed this
  preflight and still failed the real gate, which is exactly what the
  preflight is *for*: cheap upfront filtering, with the real judgment
  reserved for the one gate that matters.

## Part Q — Diff discipline

Exactly 4 new files, all in `data-pipeline/candidates/`: `robert-falcon-scott.json`,
`william-tecumseh-sherman.json`, `fridtjof-nansen.json`, `isabella-bird.json`.
No existing person, candidate, roster file, seed import, generated index,
dispersion/calibration data, portrait, editorial content, i18n file, or test
fixture was touched. `next-env.d.ts`'s pre-existing unrelated modification
(present on the original checkout's `feat/trait-explanation-ux` branch) does
not exist on this branch, which was created fresh from `origin/main` at the
confirmed SHA.

## Validation run this cycle (research-only path, per the brief's Part P)

- `corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts` —
  **0 errors, 0 warnings** across all 275 candidate files (271 pre-existing
  + 4 new). By status: 93 `qa_passed`, 182 `held` (was 178 before this
  cycle's 4 new `held` candidates).
- `corepack pnpm@10 exec tsx src/dev/roster1000/checkScoringLockIntegrity.ts`
  — **0 flagged** across 271 previously-committed candidate files.
- `corepack pnpm@10 exec tsc --noEmit` — clean, 0 errors.
- `corepack pnpm@10 exec vitest run rosterQuality` — **18/18 passed**.
- No full `next build`, no Playwright — correctly skipped per the brief's
  research-only validation path (no production person, roster file, seed,
  index, dispersion, portrait, editorial, or i18n data was touched, so
  there is nothing a production build or browser test could exercise
  differently).

## Roster count confirmation

**Unaffected: still 125 people, 124 match-eligible.** Zero production
files touched.

## Disposition

**`ROSTER21_RESEARCH_ONLY_PR_READY`** — 4 candidates researched, evidenced,
and scored to completion; 0 crossed `eligibility_v2`; all 4 honestly held
with exact validator numbers; no rescue attempted; no roster20 hard gate
reintroduced under another name; roster unaffected at 125/124.
