# 500-person performance + scale checkpoint (2026-10-22)

`CHECKPOINT500_BASE_SHA`: `638a412154afff19cba13118ea4c6d61a13a3f1c`, the
merge commit of PR #64 (Roster52). Exactly two parents: `9178d9ab...` (prior
`main`) and `de68b34e...` (the reviewed Roster52 head, Vercel SUCCESS). Merged
with a normal merge commit, head-guarded; branch kept.

**Measurement + decision only.** No product, data, scoring, eligibility,
matching, portrait or legacy file was changed. No people added or rescored. No
Roster53, no Legacy Batch 6.

## 0. Read this first: how to compare with the 250-person numbers

The 251-person baseline (`250-person-performance.md`, 2026-09-16) was taken on
a quiet machine. This run was **not**: Windows reported 65-100% CPU load and
about 3 GB free of 32 GB RAM from unrelated background processes (virtual
machines, browsers) for the whole session. Absolute timings today are therefore
inflated against the baseline by a large and non-uniform factor. To separate
machine noise from roster scaling, a **same-session control** was run: the
exact 250-checkpoint commit (`0193d7cc`, 251 people) was checked out in a
throwaway worktree and measured with the same commands under the same load
(then deleted). Every time-based comparison below is therefore stated three
ways where it matters: *baseline doc*, *control today (251 people)*, *503
today*. The **control-to-503 ratio is the scaling evidence**; raw baseline-to-
today ratios are mostly machine noise.

| Control quantity (251-person commit, today) | Baseline doc | Control today | Noise factor |
|---|---|---|---|
| `tsc --noEmit` | 5.6 s | 33.3 s | 5.9x |
| `checkScoringLockIntegrity` (314 files) | 12.5 s | 124.0 s | 9.9x |
| clean build, total | 61 s | 187.5 s | 3.1x |
| clean build, static generation | 4.9 s | 38.5 s | 7.9x |
| similar-person aggregate, one locale | 967.8 ms | ~4,060 ms | 4.2x |

(The control build numbers are one run; build timing varied by 2x between two
runs of the same commit under the changing load, so build ratios carry roughly
+/-30%.)

## 1. Environment

Node `v24.18.1`, pnpm `10.34.5`, git `2.47.1.windows.1`, Next.js `16.3.0`
(`--webpack`), React `19.2.8`, TypeScript `5.9.3`, Vitest `2.1.9`, Playwright
`1.62.1`: **identical to the 250 checkpoint**, no version change. Windows 11
(10.0.26200), Intel Core Ultra 7 155H, 32 GB. Local wall-clock only, not CI, not
a production SLA.

## 2. Post-merge state (mechanically derived)

| Metric | Value (250 baseline) |
|---|---|
| Production (`SEED_PEOPLE.length`) | **503** (251) |
| Directory-visible | **502** (250) |
| Match-eligible | **114** (114) |
| Eligible / production | **22.7%** (45.4%) |
| People with a portrait | 497 (245) |
| Candidate JSON | **577** (314); statuses qa_passed 93, evidence_approved 401, held 83 |
| Portrait asset files | **500** (247) |
| Static/SSG paths (build line) | **1030** (526) |
| `calibration_v3`, `meanSd` | unchanged, 11.704 |
| Legacy baseline / flags | **22 / 0** |

`validateCandidates`: 0 errors, 0 warnings. Scoring lock: "Checked 577
previously-committed candidate file(s) against HEAD. 0 flagged." Legacy: 22
covered, 0 flagged. Match-eligible stayed **114** across the whole 251 -> 503
span: an observed fact, recorded, not re-analyzed.

## 3. Production deployment sanity check

On the live deployment (`https://thegreatinside.com`, which showed "502
people" on the Directory): the 12 Roster52 profiles returned **200 in EN, 200
in KO**, and all **12 portrait URLs returned 200** (bounded check, not a visual
QA campaign). This closes the Roster52 gap that deployed portraits had not been
checked.

## 4. Size inventory vs baseline

Baseline figures were taken in binary units (MiB/KiB); decimal values are shown
alongside for transparency.

| Item | 251 baseline | 503 | Change |
|---|---|---|---|
| `data-pipeline/candidates/` | 4.2 MB, 314 files | 9.69 MiB (10.16 MB), 577 files | +131% bytes for +84% files (newer candidates are richer; ~17.6 KiB/file vs ~13.7) |
| `public/portraits/` | 70.17 MiB, 247 files | **144.07 MiB (151.06 MB), 500 files** | +105% bytes for +102% files: linear |
| `src/` | 7.1 MB | 13.03 MiB (13.66 MB) | +84%; dominated by editorial and roster data |
| `app/` | 343 KB | 243 KiB (249 KB) | not comparable (likely different measurement scope); app code is not roster-scaled |
| `peopleIndex.generated.ts` | 373,569 B | 644,204 B | +72% for +100% people (1,488 -> 1,281 B/person) |
| `src/core/i18n/editorial.ts` | 1,161,896 B | 2,785,728 B | +140%: faster than roster (EN+KO editorial text for every added person) |
| `src/data/people/editorial.ts` | 399,245 B | 689,879 B | +73% |
| `roster52.ts` / largest roster file | `roster34.ts` 140,813 B | `roster50.ts` 415,596 B (roster52.ts 201,070 B) | newer rosters carry long row rationales |

Largest files now: i18n editorial 2.79 MB, data editorial 0.69 MB, peopleIndex
0.64 MB, roster50 0.42 MB, roster51 0.33 MB, roster41 0.32 MB.

Growth is approximately linear with roster size for portraits, index and
editorial data; candidate and roster files grew somewhat faster than people
because later profiles carry longer rationales. **None of this is a problem by
itself:** the 2.79 MB i18n editorial file is still server/profile-side content;
the browser does not receive it for the Directory (see section 11, which
verifies the client chunk contents). One new observation: the shared `main-app`
client chunk (252 KB raw / 77 KB gzip) contains the Korean `person.name.*`
table for all 503 people (about 30 B each); it grows linearly and is tiny.

## 5. Portrait storage

| Stat | 251 baseline | 503 (binary units, comparable) |
|---|---|---|
| Count | 247 | **500** |
| Total | 70.17 MiB | **144.07 MiB** |
| Mean | 291 KiB | 295 KiB |
| Median | 216 KiB | 234 KiB |
| p95 | 806 KiB | 724 KiB |
| Max | 3.34 MiB (as reported) | 3.26 MiB (`james-baldwin-vanvechten-1955.jpg`; 3.42 MB decimal) |
| Min | 7.2 KiB | 7.2 KiB |

Duplicate-content check (SHA-256 over all 500 files): **no duplicates**.

Top outliers are unchanged and still the same three legacy files: Baldwin 3.42
MB, Shaw 3.02 MB, Woolf 2.95 MB (decimal). Nine files exceed 1 MB (16.4 MB
decimal, about 10.8% of storage from 1.8% of files); the other six are
1.0-1.2 MB (Aquino, Hippocrates, Proust, Pele, Mercury, Mendel). Every
Roster34-52 portrait follows the downscaling convention; none is a new
outlier. Not recompressed here.

## 6. Clean production build benchmark

Method: remove `.next`, one `next build --webpack`, success.

| | 251 baseline | Control today (251) | **503 today** |
|---|---|---|---|
| Total wall-clock | 61 s | 187.5 s | **225.9 s** (success) |
| Compile | (~56 s fixed) | 51 s | 60 s |
| Static generation | 4.9 s | 38.5 s | **68 s** |
| Static/generated paths | 526 | 526 | **1030** (literal `(1030/1030)`) |
| `.next` size | 398 MB | 386 MB | **650 MB** (webpack cache is about 467 MB of it) |

Literal build line: `✓ Generating static pages using 21 workers (1030/1030) in 68s`.
(The earlier Roster52 branch build, a different worktree and load, printed
`in 32.4s`: static generation varies 2x run to run on this machine.)

Scaling evidence (control to 503): total **x1.20**, compile x1.18, static
generation **x1.77** for x1.96 static paths: sub-linear to linear. Normalized to
baseline hardware: total about 73.5 s, static generation about 8.7 s.

## 7. Static path formula

`static_person_paths(N) = 2N + 24` holds exactly at a third data point:
`2 x 503 + 24 = 1030`. Mechanically: 1,006 person HTML files (503 x 2 locales)
plus 24 fixed routes. Routing untouched. Projection (exact): N=750 -> 1,524;
N=1000 -> 2,024.

## 8. Local route payloads (LOCAL COMPARATIVE MEASUREMENTS, NOT PRODUCTION SLA)

`next start` from the measured build; gzip is the wire size with
`Accept-Encoding: gzip`. First request after server start (a prior probe had hit
`/en-US/people` once) and five warm requests.

| Route | Status | Raw (251) -> raw (503) | gzip (251) -> gzip (503) | First request | Warm (5 samples) |
|---|---|---|---|---|---|
| `/en-US/people` | 200 | 169,525 -> **305,668 B** | 16,528 -> **26,558 B** | 43 ms | 24-69 ms |
| `/ko-KR/people` | 200 | 169,446 -> 306,014 B | -- -> 30,857 B | 41 ms | 22-45 ms |
| `/en-US/people/leonardo-da-vinci` | 200 | 68,909 -> **68,909 B** | 10,174 -> 10,169 B | 41 ms | 23-131 ms |
| `/ko-KR/people/leonardo-da-vinci` | 200 | 70,247 -> 70,247 B | -- -> 10,940 B | 40 ms | 18-45 ms |
| `/en-US/compare/leonardo-da-vinci` | 200 | 15,811 -> 15,811 B | 4,314 -> 4,311 B | 469 ms (dynamic route compile) | 30-41 ms |
| `/en-US/quiz` | 200 | 14,520 -> 14,520 B | -- -> 3,332 B | 63 ms | 14-23 ms |

The profile, Compare and quiz pages are byte-identical in size to the baseline;
only the Directory HTML grows (x1.80 raw, x1.61 gzip), proportional to the
people it lists. Latencies are loopback noise under heavy machine load; do not
overinterpret.

## 9. Directory client payload

- The Directory still ships the **compact `PEOPLE_INDEX`**, not full `Person`
  objects: the index chunk (`937-*.js`) contains the `[attributeId, score,
  confidence, impact]` tuple expander and the profession taxonomy, and has zero
  occurrences of `sources`/`doNotCopy` keys.
- Index chunk: **537,459 B raw / 74,612 B gzip** for 503 people (baseline
  314,758 / 43,346). **Per person: 1,068 B raw / 148 B gzip** (baseline 1,254 /
  173). 250-checkpoint projection for ~500: 627 KB raw / 86 KB gzip, so **over-
  predicted by 14% raw, 13% gzip (GOOD PREDICTION, conservative)**. Marginal
  cost of the 252 added people: 884 B raw / 124 B gzip each.
- Directory-page-specific chunk: still **7,036 B** (unchanged).
- Total JS in `.next/static/chunks`: 2.00 MB raw (not split per route here;
  shared framework chunks are cached across routes).
- Portraits remain lazy: **497 of 497** Directory `<img>` elements carry
  `loading="lazy"`.
- **New observation:** `QuizClient.tsx` also imports `PEOPLE_INDEX`, so the
  `/en-US/quiz` page loads the same 74.6 KB-gzip chunk as an async script,
  although only 114 of 503 people are match-eligible. It is the same compact
  index, not full profiles, and was true before this checkpoint (the baseline
  did not measure the quiz route's scripts). Recorded as an optional watch item.

## 10. Directory search/filter/sort (production build, browser)

Method as at 250 (native value setter + `input`/`change` event; wall time to
the visible count changing; sort uses a fixed 20 ms settle in the harness; 1
warm-up + 5 measured, medians). Measured **twice in the same browser, same
load**: the 251-person control build and the 503-person build.

| Operation | 250 baseline doc | Control today (251) | **503 today** | 503 / control |
|---|---|---|---|---|
| Search, common ("an") | 3.1 ms | 31.7 ms | **40.7 ms** | 1.28x |
| Search, no result | 0.6 ms | 12.8 ms | **23.3 ms** | 1.8x |
| Clear search (back to all) | 9.3 ms | 53.4 ms | **118.2 ms** | 2.2x |
| Sort change (incl. 20 ms harness delay) | ~30 ms | 46.4 ms | **61.0 ms** | 1.3x (1.6x net of the delay) |

Today's absolute values are about 5-10x the baseline for both builds, so they
are load noise (and here the pane's frame-synchronised polling), not a roster
effect. The scaling is clear: operations that re-render the whole list (clear)
scale roughly linearly with people (x2.2 for x2.0). The Directory is
unvirtualized: 502 cards and 497 images are in the DOM. On the control's noise
factor the 503-person clear-to-all is about 20-25 ms at baseline-hardware
speed. Not perceptibly slower, but it is the operation to watch at 750/1000
(linear projection: about 30-45 ms baseline-equivalent).

## 11. Similar/Opposite person scaling

Production functions, called exactly as `page.tsx` calls them
(`rankSimilarPeople(person, SEED_PEOPLE).slice(0,6)` and
`selectOppositePerson(person, SEED_PEOPLE)`), measured in the 503 tree and in
the control tree **back to back** (same script, same load).

| | 251 baseline doc | Control today (251) | **503 today** |
|---|---|---|---|
| `rankSimilarPeople`, one anchor | 2.47 ms | 11.3 ms | **14.5 ms** |
| both calls, one anchor | 4.89 ms | 13.9 ms | **22.9 ms** |
| aggregate, both calls, all people, one locale | 967.8 ms (3.86 ms/person) | 4.0-4.2 s (15.9-16.7 ms/person) | **8.3-9.5 s (16.5-18.9 ms/person)** |
| aggregate, two locales | ~1.9 s | ~8.0-8.4 s | **16.5-19.0 s** |

**Per-person cost is flat (16.5-18.9 vs 15.9-16.7 ms: eligible is still 114);
the aggregate doubles with the page count (x2.0-2.3).** Normalizing the 503
two-locale aggregate to baseline hardware with the control factor (4.2x):
**about 3.9-4.6 s**, against the 250 checkpoint's **~3.9 s projection**: the
projection holds (GOOD PREDICTION; error 0% to +18%, midpoint about +4%).

Total-N independence at E=114 (synthetic padding with non-eligible people):
N=250 8.8 ms, 503 9.7, 750 8.2, 1000 9.2 for 503-tree; control 7.1, 9.2, 6.9,
7.3: flat. Eligible-size sensitivity (503 tree; control in brackets): 20 ->
1.34 ms (1.18), 50 -> 2.91 (2.77), 80 -> 4.93 (4.73), 114 -> 9.47 (6.60):
roughly linear in eligible count. **The "bounded by the eligible count"
conclusion predicted reality at 503.** The redundant second
`rankSimilarPeople` inside `selectOppositePerson` (a 250-checkpoint finding) is
still present and still harmless.

## 12. Quiz match cost

Synthetic 34-attribute user against the real roster: `rankMatches` 4.9 ms,
`buildResultSet` 19.0 ms (503 tree) vs 7.3 ms / 23.1 ms (control, same load).
No meaningful change: it filters to the 114 eligible people first, so it
depends on the eligible count, not the roster size.

## 13. Test / tooling runtimes

| Command | 251 baseline doc | Control today (251) | **503 today** | Note |
|---|---|---|---|---|
| `tsc --noEmit` | 5.6 s | 33.3 s | **42.3 s** | x1.27 for 2x code (no incremental cache in a fresh worktree) |
| `validateCandidates` | 0.8 s | -- | **3.0 s** | 577 files, 0/0 |
| `checkScoringLockIntegrity` | 12.5 s (314 files) | 124.0 s (314) | **215.6 s (577)** | x1.74 for x1.84 files: linear (one `git show` subprocess per file). On a quiet machine the baseline rate (0.040 s/file) implies about 23 s at 577 files; under load it was 3.6 minutes |
| `vitest run` | 9.2 s / 1,185 tests | -- | **63.0 s / 3,993 tests** (82 files) | no control run; x3.4 tests; not comparable under load |
| clean `next build` | 61 s | 187.5 s | **225.9 s** | section 6 |
| Focused Playwright (Person + Directory + Compare) | 161.8 s / 118 tests | -- | **289.3 s / 118 tests, all pass** | same test count; includes the harness's own build+start |

## 14. Matching / eligibility health

| Metric | 251 | **503** |
|---|---|---|
| Production | 251 | **503** |
| Directory-visible | 250 | **502** |
| Match-eligible | 114 | **114** |
| Eligible / production | 45.4% | **22.7%** |

**A. Published/directory field-category coverage** (all production people):

| Category | 251 | 503 |
|---|---|---|
| science_knowledge | 103 | 208 |
| arts_culture | 96 | 184 |
| leadership_society | 74 | 79 |
| building_discovery | 44 | 158 |

**B. Match-eligible interest pools** (the 114 eligible only):

| Category | 251 | 503 |
|---|---|---|
| science_knowledge | 50 | 50 |
| arts_culture | 43 | 43 |
| leadership_society | 42 | 42 |
| building_discovery | 15 | 15 |

Never conflate A and B. Calibration (`calibration_v3`) and dispersion
(`meanSd` 11.704) were unchanged through Roster52; no re-calibration was
needed or run here.

## 15. Recent expansion cohort (context only, not re-analyzed)

Cumulative Roster33-52: **278** people shipped, **0** match-eligible.
Production grew 225 (before Roster33) -> 503 over the span. Classification from
the earlier architecture decision stands: CONTINUE_EXPANSION_AS_IS.

## 16. 250-person projection scorecard

| Metric | 250 actual | 250 projection for ~500 | 503 actual | Error | Verdict |
|---|---|---|---|---|---|
| Production | 251 | 500 | 503 | -- | on target |
| Eligible-count assumption | 114 | stays ~114 | **114** | 0 | GOOD PREDICTION |
| Static paths | 526 | 1,024 (at N=500) | 1,030 (at N=503) | exact (`2N+24`) | GOOD PREDICTION |
| Portrait storage | 70.17 MiB | ~142 MB | 144.07 MiB | +1.5% | GOOD PREDICTION (slightly under-predicted) |
| Directory index raw | 314,758 B | ~627 KB | 537,459 B | -14% | OVER-PREDICTED (conservative) |
| Directory index gzip | 43,346 B | ~86 KB | 74,612 B | -13% | OVER-PREDICTED (conservative) |
| Similar-person aggregate, two locales | ~1.9 s | ~3.9 s | ~3.9-4.6 s normalized (16.5-19.0 s raw under load) | 0 to +18% | GOOD PREDICTION |
| Total build time | 61 s | ~75 s | ~73.5 s normalized (225.9 s raw; control 187.5 s) | -2% | GOOD PREDICTION (noisy) |
| Static-generation time | 4.9 s | ~9.5 s | ~8.7 s normalized (68 s raw; control 38.5 s) | -8% | GOOD PREDICTION (noisy) |
| Test/tooling runtime | -- | insufficient evidence | see section 13 | -- | NOT COMPARABLE (no cycle-over-cycle timings; load-dominated) |

No projection is edited after the fact.

## 17. Updated projections (503 actuals as the base)

Separated by basis. "Equivalent" means baseline-hardware-normalized.

| Quantity | 503 measured | 750 | 1000 | Basis |
|---|---|---|---|---|
| Static paths | 1,030 | 1,524 | 2,024 | **Exact formula** (3 data points) |
| Portrait storage | 144.07 MiB | ~220 MiB | ~300 MiB | **Linear** at the measured marginal 0.32 MB/portrait (251 -> 503); assumes the 1600 px convention continues |
| Directory index chunk | 537 KB / 74.6 KB gz | ~756 KB / ~105 KB gz | ~977 KB / ~136 KB gz | **Linear** at the measured marginal 884 B / 124 B per person |
| Directory HTML | 306 KB / 26.6 KB gz | ~439 KB | ~574 KB | **Linear** at the measured marginal ~540 B/person raw |
| Total build time (equivalent) | ~74 s | ~86 s | ~98 s | **Fixed compile + linear static generation**; weakest confidence; machine noise is large |
| Static generation (equivalent) | ~8.7 s | ~12.4 s | ~16.1 s | Linear per-path |
| Scoring-lock runtime (quiet machine) | ~23 s | ~30 s | ~40 s | **Linear** per candidate file (confirmed by control) |
| Similar-person aggregate, two locales (equivalent) | ~4.0 s | Scenario A ~6 s | Scenario A ~8 s | **Fixed per page x linear page count** |
| Same, Scenario B (eligible grows in step with the roster, ~22.7%) | -- | ~9 s | ~16 s | **Quadratic-shaped (pages x eligible)**; NOT occurring today |

Scenario A: eligible stays near 114 (the observed state across the last 20
rosters). Scenario B: eligible starts growing materially. The aggregate is a
build-time cost only and remains a small share of build time in both
scenarios. Directory interaction (clear-all) is the operation to re-check at
750; others have no evidence of trouble. Anything beyond these is unknown or
insufficient evidence.

## 18. Maintenance-scale assessment

Evidence from Roster52 (PR #64): of 65 changed files, **28 were test files
touched only for mechanical count bumps** (491 -> 503 / 490 -> 502; 24 of them
a hard-coded constant at about 4-8 lines each, plus the lineage regex, two
known-non-eligible slug lists and the e2e total), and the set grows by one
file per roster (each roster adds its own `rosterNN.test.ts` carrying the
running total). The work was done by a throwaway wiring script kept outside the
repository (the same pattern was used for Roster50-52), so the procedure is not
discoverable from the repo. Real failures were loud, not silent: a stale count
fails Vitest. Roster52's two full-Vitest failures (missing `agronomist` label;
`jazz`/`agriculture` not in the directory taxonomy) were vocabulary gaps, not
count drift. No missed assertion or generated-index drift was found.

**Classification: NO NEED** for a generated manifest now (no silent error, cost
is scripted and loud). Optional near-term improvement if expansion continues:
a single shared production-count constant for the roster tests, and checking the
wiring script into `src/dev/roster1000/` so it is discoverable. Not
implemented here.

## 19. Client/server boundary recheck

All previous non-findings reconfirmed on the 503 build: the Directory ships the
compact index (no `sources`/evidence keys in the chunk); the Directory-page
chunk is still 7,036 B; the long-form editorial prose is not in the Directory
client chunk (the 2.79 MB i18n editorial file is not in any measured client
chunk; only person names reach `main-app`); portraits are 497/497 lazy; full
candidate evidence never reaches the client. One addition: the quiz route also
loads the compact index (section 9).

## 20. Concrete measured risks

| Risk | Measurement | Consequence | Urgency | Next action |
|---|---|---|---|---|
| Three legacy portraits still unresized | Baldwin 3.42 MB, Shaw 3.02 MB, Woolf 2.95 MB; nine files over 1 MB = 16.4 MB (10.8%) | storage only; does not grow with the roster | optional | recompress the three to the 1600 px / q85 convention in a small standalone task |
| Scoring-lock runtime | 215.6 s under load at 577 files; linear (control: 124 s at 314); about 23 s on a quiet machine | slow gate run twice per roster cycle; grows with candidate count | optional (near-term if the machine stays loaded) | batch `git cat-file --batch` instead of one `git show` per file, as a separate task |
| Quiz route loads the whole index chunk | 74.6 KB gzip async script for 114 eligible of 503 people | extra download on `/quiz`, grows linearly | optional | ship an eligible-only index to the quiz if it ever matters |
| Directory whole-list re-render | clear-to-all 118 ms (loaded), x2.2 for x2 people; 502 cards in the DOM | small; linear | optional / watch at 750 | consider virtualization only if a re-measure at 750 is perceptibly slow |
| Roster maintenance boilerplate | 28 test files bumped per roster, +1 per roster | reviewer noise, discoverability | optional | shared count constant; check in the wiring script |

None is a blocker.

## 21. Explicit non-problems (verified)

- Similar-person cost is bounded by the eligible count (flat per page at
  E=114, flat in total N out to a synthetic 1000), and the 250 projection held.
- Directory ships a compact index; Directory-page chunk unchanged at 7,036 B;
  index payload is smaller than projected (148 B/person gzip).
- Portraits are lazy (497/497); no duplicate portrait files; no new oversized
  portrait since Roster34.
- Static paths follow `2N + 24` exactly; build time and static generation are
  within the projection once machine noise is controlled.
- Search/filter latency is the same order as the control's at 2x the people;
  no perceptible regression.
- The 2.79 MB editorial i18n file is not client-side.
- Profile, Compare and quiz page payloads are byte-identical to the baseline.
- Tool and framework versions unchanged since 250; no runtime regression.

## 22. Classification

# EXPANSION_GREEN

Every 250-checkpoint projection held (or was conservative), and every
growth curve is linear in the page count or flatter. The only items with
measured cost are optional hygiene items (legacy portraits, the scoring-lock
subprocess loop, whole-list rendering, quiz index payload). The large absolute
timings in this document are explained by a same-session control run: they
reflect machine load, not roster scaling.

## 23. Recommended next task

Resume the 500 -> 750 expansion lane with **Roster53** (Roster53 was not
started in this checkpoint). Optionally, independent small tasks: recompress the
three legacy portraits; batch the scoring-lock `git show` calls; check the roster
wiring script into the repo. None gates expansion. Re-measure at about 750.

## 24. Validation of this checkpoint's change

Docs-only: this file plus the top summary of `docs/context/CURRENT_STATE.md`.
No benchmark script is committed (`bench500.ts` was kept outside the repo). No
production data, scoring, matching, portrait or candidate file changed (checked
with `git diff --stat` against the base). The 250-commit control worktree was
removed after measurement.
