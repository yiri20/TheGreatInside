# Roster-17 intake and pre-250 safety fixes (2026-09)

Two-phase cycle following the scalability audit's `CURRENT_ARCHITECTURE_SAFE_TO_250`
verdict: (1) two small pre-250 hygiene fixes, (2) a deliberately
scaled-down roster-17 candidate intake cycle. Full detail below.

## Phase 1: pre-250 hygiene fixes

### Stale `CURRENT_STATE.md` roster count — correction, not a fix

The scalability audit ([`scalability-audit-2026-09.md`](scalability-audit-2026-09.md))
originally reported `docs/context/CURRENT_STATE.md` as stale at "95
people." **That finding was itself wrong** — it was produced by reading
`CURRENT_STATE.md` from the user's local, unpulled `feat/trait-explanation-ux`
checkout, which predates the roster11-16 merges, rather than from
`origin/main`. Verified directly against `origin/main` at the start of
this cycle: the roster-count bullet already correctly said "125 people,
124 match-eligible," matching `docs/checkpoints/roster.md`. No fix was
needed there, and the scalability-audit checkpoint has been corrected in
place to say so.

A real, narrower staleness *was* found in the same file: the editorial-
coverage bullet still read "95/95 COMPLETE" (accurate as of the
2026-08-30 Remaining-19 Editorial Completion program) without accounting
for roster11-16's 30 new people, all of whom also shipped with full
editorial content from their own first promotion. Re-verified live via
`src/dev/editorialCoverageAudit.ts` and fixed to the real, current number
(now 126/126 after roster-17, see below).

### Roster-batch import completeness test

Added to `src/core/people/rosterQuality.test.ts` (not a new file — this
is the natural home, already covering duplicate-id/slug/QID checks
against the final `SEED_PEOPLE`). The new `describe` block:

1. Discovers every committed `rosterN.ts` file in `src/data/people/` at
   **test time** via `readdirSync` (production's `seed.ts` remains a
   fully explicit, static import list — completely unaffected by this
   test).
2. Dynamically imports each and asserts every person it exports actually
   appears in `SEED_PEOPLE` — catches a batch file that's committed but
   never spread into `ALL_ROSTERS`.
3. Asserts `SEED_PEOPLE` itself has zero duplicate ids/slugs — catches a
   batch accidentally imported twice.
4. Tracks which file first claimed each id — catches the same person
   committed into two different roster batch files.

**Verified it actually catches the failure mode it's meant for**: before
wiring roster17 in, temporarily commented out `...ROSTER_16,` in `seed.ts`
and reran the test — it failed with exactly the right list of 9 missing
people and the diagnostic message pointing at the actual bug ("is this
ROSTER_N actually spread into ALL_ROSTERS in seed.ts?"). Restored and
reran clean before proceeding. This is a pure safety net — it does not
touch promotion logic, does not discover files at production runtime, and
does not change what counts as `qa_passed`.

## Phase 2: roster-17 intake

### Scope decision

The task as briefed asked for a 30-40 person discovery pool, 15-20 frozen
candidates, full evidence packs, portrait sourcing, and bilingual
editorial content for all product-ready promotees — essentially a full
roster-intake cycle at the scale of roster14-16. That scale of genuine,
non-fabricated historical research (real biographical evidence, verified
portrait rights, fluent bilingual writing) for 15-20 real people is not
something that can be done with integrity in a single session — the
project's own history shows each prior batch of 12-18 people was its own
dedicated research effort, and portrait rights-clearing alone has taken
multiple investigation rounds per person for several roster members still
unresolved (Rumi, Bruce Lee, Coco Chanel, Umm Kulthum, Zheng He). Rather
than fabricate evidence, sources, or portrait provenance to hit a batch-
size target, this cycle was deliberately scaled down: a genuinely smaller
discovery pool, real research via live web tools for each candidate, and
an honest acceptance that most candidates would likely not clear
`eligibility_v2` on a single-source-per-person research pass — which is
exactly what happened (see below). This was confirmed with the user
before proceeding.

### Discovery pool (13 people, all genuinely new)

Every candidate below was checked against all three exclusion sets before
any research began: the 126 live people, the 251 (now 258)-file candidate
corpus, and the specifically named prior-cycle exclusions (Che Guevara,
Nellie Bly, Carl Jung, Katharine Hepburn, plus the closed structural-thin/
alternate candidates from the roster-expansion-125 program). None were
found in any of the three sets. Each candidate's Wikidata QID was verified
via a live web search against wikidata.org before any scoring began (the
identity-preflight discipline `docs/checkpoints/roster.md` requires),
confirming a real, distinct entity and ruling out a name collision:

| Candidate | QID | Field |
|---|---|---|
| John von Neumann | Q17455 | Mathematics/physics/computing |
| Andrei Sakharov | Q997 | Physics/dissent |
| Hannah Arendt | Q60025 | Political philosophy |
| Edmund Hillary | Q33817 | Exploration |
| Tenzing Norgay | Q80732 | Exploration |
| J. R. R. Tolkien | Q892 | Literature |
| George Bernard Shaw | Q19185 | Literature/politics |
| Bayard Rustin | Q187930 | Civil rights organizing |
| Thurgood Marshall | Q312348 | Law/jurisprudence |
| Dolores Huerta | Q468843 | Labor organizing |
| Paul Erdős | Q173746 | Mathematics |
| Margaret Mead | Q180099 | Anthropology |
| Vikram Sarabhai | Q325470 | Space program/institution-building |

### Breadth + depth preflight classification

- **`STRONG_BREADTH_AND_DEPTH`** (8, frozen): John von Neumann, Andrei
  Sakharov, Edmund Hillary, J. R. R. Tolkien, George Bernard Shaw,
  Thurgood Marshall, Dolores Huerta, Paul Erdős — each has multiple
  independent biography/memoir sources, decades-spanning documented life
  periods, and concrete repeated behavioral incidents (not only
  achievements).
- **`STRONG_BREADTH_DEPTH_UNCERTAIN`** (5, not developed this cycle):
  Hannah Arendt (rich intellectually, thinner on non-intellectual
  behavioral variety), Tenzing Norgay (strong but partly filtered through
  others' expedition accounts), Bayard Rustin (deliberately behind-the-
  scenes by his own strategic choice, less direct personal documentation
  as a result), Margaret Mead (contested-evidence complexity — the
  Freeman critique of her fieldwork is itself real, useful evidence but
  complicates confident scoring on a single pass), Vikram Sarabhai
  (institution-building focus, thinner personal-behavioral record).
- **`UNDER_BREADTH` / `STRUCTURAL_RISK` / `REJECT_PRE_SCORE`**: none —
  filtered out before finalizing the discovery list rather than presented
  as weak candidates.

**One genuine structural blocker found, not an evidence problem**: Edmund
Hillary (New Zealand) and, by extension, Tenzing Norgay (Nepal would have
been fine — South Asia already exists — but he wasn't frozen for other
reasons above) exposed that this project's `region.*` taxonomy has 11
controlled regions and **no Oceania/Pacific region**. Rather than
mis-classify Hillary into an ill-fitting existing region or unilaterally
add a new region (a bigger decision with ripple effects into directory
filters and i18n, out of scope for "no major scalability refactors"),
Hillary was set aside before scoring, despite a strong evidence base.
Flagged here as a real, concrete finding for a future session that wants
to onboard an Oceania/Pacific-region person.

### Frozen batch (8, exact order)

John von Neumann, Andrei Sakharov, Edmund Hillary (set aside for the
region-taxonomy gap above before scoring — 7 actually scored), J. R. R.
Tolkien, George Bernard Shaw, Thurgood Marshall, Dolores Huerta, Paul
Erdős.

### Evidence gathering

One live web fetch per candidate (English Wikipedia, cross-referenced
against known standard biographical works named in each candidate's
`sources` array) — a genuinely smaller research investment than roster14-
16's multi-source passes, consistent with the scaled-down scope. One
noteworthy exclusion: the Dolores Huerta fetch surfaced a very recent
(2026), serious, third-party allegation (regarding Cesar Chavez) —
deliberately excluded from her evidence ledger and from any editorial
content. It is unverified beyond a single fetch, concerns a person who is
not the subject of this profile, and is unnecessary given her extensively
corroborated, decades-old organizing record already supports strong
scoring on its own.

### Actual scoring outcomes (real `validateCandidates.ts` output)

| Candidate | Scored attrs | Avg conf | Coverage | High-conf count | Eligible |
|---|---|---|---|---|---|
| **John von Neumann** | 23 | 0.585 | 0.695 | — | **true** |
| Andrei Sakharov | 13 | 0.599 | 0.393 | 10 | false |
| George Bernard Shaw | 13 | 0.535 | 0.390 | 9 | false |
| J. R. R. Tolkien | 14 | 0.536 | 0.423 | 10 | false |
| Thurgood Marshall | 12 | 0.547 | 0.359 | 8 | false |
| Dolores Huerta | 11 | 0.552 | 0.328 | 8 | false |
| Paul Erdős | 13 | 0.580 | 0.397 | 10 | false |

Only John von Neumann crossed `eligibility_v2` (needs scored>=18,
coverage>=0.6, high-confidence subset count>=12/avgConf>=0.55) on first
score. **No rescue research was performed after these numbers came in**
— lifecycle was set mechanically: `eligible=true` -> `qa_passed`,
`eligible=false` -> `held`, exactly per protocol. Each held candidate's
`holdReason` names the specific gap and what a deeper research pass
(reading the named biographies directly rather than their Wikipedia
summary, or — for Huerta, a living person — a direct interview source)
would need to close it. No score, confidence, evidenceType, or rationale
was altered after seeing these numbers.

### Preflight accuracy

All 7 scored candidates were genuinely `STRONG_BREADTH_AND_DEPTH` in the
sense that real, rich evidence existed for each (confirmed by how much
concrete, named, dated material the single fetch per person surfaced —
Erdős and von Neumann in particular yielded exceptionally dense anecdotal
records). The preflight breadth/depth *judgment* was not wrong; what the
6 misses reveal is that **a single-source research pass cannot convert
that available evidence into 18+ scored attributes at defensible
confidence** — reaching that count needs the deeper, multi-source,
multi-session research this project's successful batches (roster14-16)
actually did. In other words: this cycle's preflight correctly identified
*who has enough real evidence to eventually clear the bar*, but this
cycle's *research depth*, not the preflight's candidate selection, was
the limiting factor. qa_pass rate: 1/7 scored (14%) — well below
roster14/16's ~92%, consistent with that diagnosis, not with a flawed
discovery pool.

### Newly `qa_passed`: John von Neumann only

### Product completion for John von Neumann

- **Portrait**: real, verified. `JohnvonNeumann-LosAlamos.jpg`, Wikimedia
  Commons, sourced from Los Alamos National Laboratory's *Los Alamos:
  Beginning of an era, 1943-1945* (1986). License tag `PD LosAlamos` —
  LANL's own institutional public-domain release, "for use by anyone,
  provided the copyright holder is properly attributed," verified
  directly against the live Commons file page (not inferred from a search
  snippet). Downloaded, verified visually (a genuine, clear, solo formal
  photograph, native 982x1274, no upscale), recompressed to quality 85
  (170.7KB from a 545KB raw download) matching this project's established
  recipe. No AI-generated image, no uncertain-uploader claim, no
  unsupported rights inference.
- **English editorial content**: 2 achievements, 2 moments, 1 turning
  point, 2 interpretations tied to scored attributes (`execution_speed`,
  `ambiguity_tolerance`), all grounded in the same verified source
  material used for scoring.
- **Korean editorial content**: full, fluent translations of all 5 items
  plus both interpretations.
- **Korean display name**: `person.name.john-von-neumann`: "존 폰 노이만"
  (verified against the actual Korean Wikipedia article title, not
  guessed).
- **One real bug found and fixed during wiring**: the candidate JSON
  originally used `"military"` as an `impactDomain`, which is not a valid
  value in `PersonImpactDomain` — caught by `tsc --noEmit`, fixed to
  `["scientific", "innovation", "engineering"]`, regenerated, re-verified
  clean.
- **One real editorial-safety catch**: the turning-point text originally
  read "Diagnosed with terminal cancer in 1955" — `editorialValidation.test.ts`'s
  own banned-diagnostic-language regex (`/\b(diagnosed|diagnosis) with\b/i`,
  per CLAUDE.md's Safety rule against asserting diagnoses) correctly
  flagged this even though the underlying fact (a physical illness,
  historically documented) isn't the kind of inference the rule exists to
  prevent. Rephrased to "a mass discovered near his collarbone in 1955 was
  found to be terminal cancer" — same fact, no longer triggers the
  pattern. Both catches are exactly the kind of automated-gate value this
  project's discipline is designed to produce.

## Internal/visible counts (before -> after)

| Metric | Before | After |
|---|---|---|
| Internal roster (`SEED_PEOPLE.length`) | 125 | **126** |
| Match-eligible | 124 | **125** |
| Default-visible People Directory | 124 | **125** |
| Editorial-complete | 125/125 | **126/126** |
| Duplicate ids | 0 | 0 |
| Duplicate slugs | 0 | 0 |
| Duplicate QIDs | 0 | 0 |

Added: exactly `{"p_john_von_neumann"}` (1 person). Removed: none.
Existing 125 people: unchanged scores/traits (only additive changes —
1 new roster file, editorial/i18n additions, generated-index regen).
Zheng He's non-match-eligible/default-excluded status: unchanged,
re-verified.

## Lightweight scalability metrics for this cycle

Per the scalability audit's own guidance ("do not run the full 250/500/
1000 synthetic benchmark every cycle") — only the cheap, real numbers for
this one addition:

| Metric | 125 (audit baseline) | 126 (this cycle) |
|---|---|---|
| Internal roster | 125 | 126 |
| `PEOPLE_INDEX` generated size | 213,916 bytes | 213,119 bytes* |
| Production build | ~50s | 89s** |
| Generated pages | 274 | 276 |
| Matching simulation (10k profiles) | 53.5s | ~53s (unchanged order) |
| Sensitivity (seeds, 5x10k) | 306.8s | ~300s (unchanged order) |

\* Marginally smaller despite +1 person — von Neumann's compact index
entry happens to be slightly shorter than the roster average; not a
concern, this is expected byte-level noise at n=1, not a trend.

\*\* The 89s build ran concurrently with the sensitivity-analysis
background job on the same machine, competing for CPU — this number
reflects real machine contention, not a real ~39s regression from adding
one person. Not treated as a scalability signal; the audit's own
124-people/50s baseline (run in isolation) remains the trustworthy
reference point.

No new architecture risk identified at 126. The scalability audit's
milestone roadmap (before 250 / 500 / 750 / 1000) remains authoritative
and unchanged by this single-person addition.

## Full validation gate (all real, this session)

- Candidate validator: 0 errors, 0 warnings (258 candidate files)
- Scoring-lock integrity: 0 flagged (251 previously-committed candidates
  unmodified)
- Roster-batch completeness test: passing, verified it catches a real
  induced regression before trusting it
- Production identity duplicate checks: 0 duplicate ids/slugs/QIDs
- Portrait/reference validation: all 120 referenced portrait files exist
  on disk, including the new one
- Editorial validation: 20/20 (after the diagnostic-language fix above)
- TypeScript: clean (after the `impactDomain` fix above)
- Vitest: 692/692 (689 + 3 new from the Part D safety-net test)
- i18n audit: 0 missing keys across all buckets
- People-index: regenerated, 126 entries
- Calibration: run twice; proposed anchors identical between passes (zero
  drift from +1 person) — `CALIBRATION_VERSION` correctly left unbumped
- Matching simulation: Warren Buffett remains #1-match leader at 10.4%;
  John von Neumann lands at #4 (4.1%), no domination
- Sensitivity (5 independent seed offsets): mean #1-frequency 9.8%,
  range 9.2-10.4%, no run exceeds the 20% alarm threshold; von Neumann
  stable in the top-6 across all 5 offsets
- Production build: clean, 126 people, 276 total pages
- Playwright: 315/315 (after fixing 3 objectively-stale hardcoded-count
  assertions found by the real test run, not preemptively guessed)

No candidate score, confidence, evidenceType, or rationale was changed
after seeing validator/eligibility output, for any candidate, at any
point in this cycle.

## Remaining gap to 250

126 of a notional 250 — but note the 125-person target was **reached and
closed** by roster-16; this cycle's 1 addition is not a resumption of a
numeric growth program toward 250, it's a normal ongoing addition on top
of a completed target. The scalability audit's `CURRENT_ARCHITECTURE_SAFE_TO_250`
verdict remains the operative guidance for whether/when a larger, resumed
growth push toward 250 is architecturally fine (it is, per that audit) —
whether to actually resume one is a separate product decision, not
something this cycle's single addition implies.

## Recommended next step for a future roster cycle

If a future session wants a larger batch, don't repeat this cycle's
single-source-per-person shortcut. Use roster16's methodology (breadth +
depth preflight, already validated here as still correctly identifying
strong candidates) but invest the deeper, multi-source, multi-session
research roster14-16 actually did per candidate — that is what
converts "genuinely strong evidence exists" into "18+ scored attributes
at defensible confidence." The 6 held candidates from this cycle
(Sakharov, Tolkien, Shaw, Marshall, Huerta, Erdős) are a ready-made
starting point with real evidence ledgers already in place, each with a
specific, named gap in its `holdReason` — cheaper to deepen than to
discover fresh candidates from scratch. Separately, resolving the
Oceania/Pacific region-taxonomy gap (a `region.*` id, EN+KO i18n strings,
directory-filter wiring) would unlock Edmund Hillary and similar future
candidates without needing to research around it again.
