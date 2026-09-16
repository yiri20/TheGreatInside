# 250-person performance + scale checkpoint (2026-09-16)

Merged Roster34 main SHA (checkpoint's authoritative base):
`0193d7cc617eab27e1013ddb018065ee36452feb` (PR #42 merge commit; parents
`975fc537a250b938021fd98cf5ab994724080e68` and
`d11bc023e9d61bb9ce919eaee6b64bb2a21e7038`).

**Measurement only.** No product, data, scoring, or matching behavior was
changed to produce this document. No people added, researched, or
rescored. No legacy remediation performed.

## Environment / runtime versions

- Node `v24.18.1`, pnpm `10.34.5` (via `corepack pnpm@10`), git `2.47.1.windows.1`
- Next.js `16.3.0` (`--webpack`), React `19.2.8`, TypeScript `5.9.3`, Vitest
  `2.1.9`, Playwright `1.62.1`
- Windows 11, local machine (not CI) — all timings below are local
  wall-clock, comparative baseline data only, not an Internet SLA and not
  directly comparable to a CI runner's hardware.

## 1. Confirmed post-merge state (mechanically derived)

Commands: a small one-off `tsx` script filtering `SEED_PEOPLE` (not
committed — see §21), plus `validateCandidates.ts` / `checkScoringLockIntegrity.ts`.

| Metric | Value |
|---|---|
| Production (`SEED_PEOPLE.length`) | **251** |
| Directory-visible | **250** |
| Match-eligible | **114** |
| People with a portrait | 245 (6 without) |
| Candidate JSON on disk | **314** |
| Static/SSG paths (production build) | **526** |
| Portrait asset files | **247** |

`validateCandidates.ts`: 314 candidates loaded, 0 errors, 0 warnings (by
status: `qa_passed` 93, `evidence_approved` 136, `held` 85).
`checkScoringLockIntegrity.ts`: "Checked 314 previously-committed
candidate file(s) against HEAD. 0 flagged." Legacy: 22 pre-pipeline
people, 0 flagged. All match the PR's accepted final state exactly — no
drift introduced by the merge itself.

## 2. Existing performance/scale budgets — none found

Searched `docs/reference/*.md`, `docs/context/*.md`, `docs/checkpoints/*.md`
for build-time, bundle-size, response-time, or roster-size budgets. **No
explicit contractual budget exists anywhere in the repository.** The only
size-shaped numbers found are this project's own doc-length conventions
(CLAUDE.md's own soft line-count budgets for its own files) and a
long-since-subsumed `scale/roster-1000` branch name with no accompanying
performance document. Per instruction, no budget was fabricated — this
checkpoint's own measurements are recorded as the new baseline, with a
reasoned recommendation in §17.

## 3. Source/architecture inventory (read-only)

| Path | Main file/function | When it runs | Asymptotic behavior |
|---|---|---|---|
| A. Directory data loading | `app/[locale]/people/page.tsx` → `PeopleDirectoryClient.tsx`, imports compact `peopleIndex.generated.ts` (`PEOPLE_INDEX`), expanded once via `expandPeopleIndex()` in a `useMemo` | CLIENT (once per mount) | O(n) expand, n=251 |
| B. Text search | `src/core/people/explorer.ts` `searchPeople()` — lowercase haystack `.filter(...includes(q))` | CLIENT (per keystroke, memoized) | O(n) |
| C. Filters/sorting | same file, `filterPeople()` (one pass) + `sortPeople()` (`Array.sort`) | CLIENT | O(n) / O(n log n) |
| D. Profile rendering | `app/[locale]/people/[slug]/page.tsx`, `SEED_PEOPLE.find()` against the full `Person` object, Server Component | BUILD (statically generated, no `revalidate`) | O(n) linear scan at build time only |
| E. Similar/Opposite person | `personSimilarity.ts` `rankSimilarPeople()`/`selectOppositePerson()`, called from `page.tsx:198-199` with the full `SEED_PEOPLE` array | **BUILD time**, once per person page (502 pages = 251 × 2 locales) | See §10 — internally filters to `isMatchEligible` FIRST, so the expensive per-pair work is bounded by the match-eligible count (114), not total roster size. `selectOppositePerson` redundantly re-runs `rankSimilarPeople` a second time (not reused from the first call) |
| F. Match result ranking (quiz) | `similarity.ts` `rankMatches()` / `selectors.ts` `buildResultSet()` | SERVER/CLIENT, per quiz submission | O(n) user-vs-all-people, confirmed NOT all-pairs |
| G. Static person-page generation | `generateStaticParams()` in `page.tsx` (251 slugs) × `app/[locale]/layout.tsx`'s own locale params (2) | BUILD | 2×N |
| H. Portrait serving | Plain `<img loading="lazy" src=...>`, `public/portraits/`, Next's default static file serving, no `next/image`, no custom API route | BUILD (files copied) / CLIENT (browser-native lazy fetch) | O(1) per file, deferred by native lazy-loading |

**The E finding matters most and is more nuanced than "O(n²) growth":**
because `rankSimilarPeople` filters to match-eligible people before doing
any expensive per-pair work, the actual per-page cost is bounded by the
**match-eligible count**, not the total roster size. Since match-eligible
has been flat at 114 for two consecutive cycles (Roster33, Roster34), the
realistic near-term growth of this feature's total build cost is closer
to **linear in total page count** than quadratic — see §10 for direct
empirical confirmation of this, and the caveat about what would change it.

## 4. Repository size / code-scale snapshot

| Item | Size |
|---|---|
| `data-pipeline/candidates/` | 4.2 MB (314 files) |
| `public/portraits/` | 70.17 MB (247 files) |
| `src/` total | 7.1 MB |
| `app/` total | 343 KB |
| `peopleIndex.generated.ts` | 373,569 bytes |
| `roster34.ts` | 140,813 bytes |

Top 10 largest relevant TS/data files:

| Bytes | File |
|---|---|
| 1,161,896 | `src/core/i18n/editorial.ts` |
| 399,245 | `src/data/people/editorial.ts` |
| 373,569 | `src/data/people/peopleIndex.generated.ts` |
| 188,104 | `src/data/people/roster2.ts` |
| 161,540 | `src/core/i18n/ko.ts` |
| 140,813 | `src/data/people/roster34.ts` |
| 137,137 | `src/core/i18n/en.ts` |
| 136,614 | `src/data/people/roster3.ts` |
| 123,656 | `src/data/people/roster28.ts` |
| 119,858 | `src/data/people/roster30.ts` |

**Explicitly NOT a problem**: `src/core/i18n/editorial.ts` (1.16 MB, 8,465
lines) is the largest file in the repo by far, but it's long-form
editorial narrative prose (achievements/moments/turning-points text, EN+KO)
for the fully-completed 95-person editorial program — it's Server-Component
content never shipped to the Directory client (which uses the compact
index, confirmed in §3/§8), and its size is expected content growth, not a
code smell or a performance liability. A large source file with no actual
performance consequence, per this checkpoint's own non-finding criteria.

## 5. Portrait storage check

| Stat | Value |
|---|---|
| Count | 247 |
| Total | 70.17 MB |
| Mean | 291 KB |
| Median | 216 KB |
| p95 | 806 KB |
| Max | 3.34 MB |
| Min | 7.2 KB |

Top 3 by size (all well above the project's own established "1600px
longest side" portrait convention — verified dimensions below):

| File | Size | Dimensions |
|---|---|---|
| `james-baldwin-vanvechten-1955.jpg` | 3.26 MB | 3712×5376 |
| `george-bernard-shaw-bain-1909.jpg` | 2.88 MB | 4191×5760 |
| `virginia-woolf-beresford-1902.jpg` | 2.82 MB | 2924×3994 |

No duplicate-content files found (full SHA-256 hash check across all 247
files, zero collisions).

**Real, concrete, but non-blocking finding**: these 3 files were never
resized to the project's own 1600px-longest-side/quality-85 convention
that essentially every other portrait (including all 12 added in
Roster34) follows. Combined they account for ~9.96 MB (14% of total
portrait storage) despite being only 3 of 247 files (1.2%). Recompressing
them to convention would likely save ~8 MB total and cost nothing in
visual quality (browsers already downscale them). Not fixed in this
checkpoint per instruction — flagged for a future small task (see §17).

## 6. Clean production build benchmark

Method: `rm -rf .next && time corepack pnpm@10 exec next build --webpack`
(one clean, measured run; not repeated).

- **Wall-clock: 61 seconds** (success)
- Static-page-generation sub-phase specifically: **4.9 seconds** for all
  526 paths (`✓ Generating static pages using 21 workers (526/526) in
  4.9s`) — meaning ~56s of the 61s is fixed compile/bundle overhead,
  independent of roster size, and only ~5s is the roster-size-scaling part
- Generated static/SSG path count: **526**
- `.next` total disk size: **398 MB**
- This build's webpack output does not print a per-route "First Load JS"
  size table (unlike some Next configurations) — route payload was
  instead measured directly over the wire in §7/§8, which is more
  accurate anyway.

## 7. Production server / route payload snapshot

`next start` on a dedicated local port, representative routes, cold then
warmed (gzip via `curl --compressed`):

| Route | Status | Uncompressed | Compressed (gzip) | Cold latency | Warm latency |
|---|---|---|---|---|---|
| `/en-US/people` | 200 | 169,525 B | 16,528 B | 8 ms | 10–42 ms |
| `/ko-KR/people` | 200 | 169,446 B | — | 32 ms | — |
| `/en-US/people/leonardo-da-vinci` | 200 | 68,909 B | 10,174 B | 13 ms | 14–22 ms |
| `/ko-KR/people/leonardo-da-vinci` | 200 | 70,247 B | — | 25 ms | — |
| `/en-US/compare/leonardo-da-vinci` | 200 | 15,811 B | 4,314 B | 153 ms (cold, dynamic route) | 10–15 ms |
| `/en-US/quiz` | 200 | 14,520 B | — | 10 ms | — |

All static (`○`/`●`) routes respond in single-digit-to-low-tens of
milliseconds locally; `/compare/[slug]` is the one dynamic (`ƒ`) route
measured and its one-time cold cost (route compilation on first hit) drops
to ~10–15ms once warm. These are local-loopback numbers — useful only as
a comparative baseline against a future 500/1000-person measurement, not
as a production SLA claim.

## 8. Client bundle / Directory payload

Directly measured via the browser's actual network requests against the
production build:

- The Directory ships the **compact `PEOPLE_INDEX`**, not full profiles —
  confirmed by locating the exact chunk (`937-897c3e1f87a6b26a.js`)
  containing the people data: **314,758 bytes uncompressed / 43,346 bytes
  gzip** for all 251 people (≈1,254 B/person raw, ≈173 B/person gzip).
  Full `Person` objects (with `sources`, `doNotCopyKeys`, full portrait
  license chains, etc.) never reach the browser for the Directory route —
  matches the `personIndex.ts` module's own design comment.
- Total initial JS+CSS for the Directory route: ~1.29 MB of JS chunks +
  ~108 KB of CSS uncompressed (most of this — React runtime, shared
  framework chunks — is cached across every route after first visit, not
  Directory-specific per-route cost). The Directory-page-specific chunk
  itself is only 7,036 bytes.
- Portrait images are **not** part of this payload calculation — every
  `<img>` on the Directory (245 of them, one per person with a portrait)
  carries a real `loading="lazy"` attribute (confirmed via direct DOM
  inspection), so the browser only fetches images actually near the
  viewport, not all 245 eagerly on load.

## 9. Directory search/filter performance benchmark

Method: production build, browser JS timing via the native React value
setter + `input`/`change` event dispatch, measuring wall-clock from
dispatch to the visible result-count text changing (or a fixed settle
delay for sort, since sort doesn't change the count). 1 warm-up + 5
measured iterations per operation; median reported (a formal p95 isn't
meaningful at this sample size and magnitude — see caveat below).

| Operation | Median | Range | Samples |
|---|---|---|---|
| Search, common term ("an", ~many matches) | 3.1 ms | 1.7–7.4 ms | 5 |
| Search, uncommon term (no matches) | 0.6 ms | 0.2–0.9 ms | 5 |
| Clear search (back to 250 results) | 9.3 ms | 8.8–14.2 ms | 5 |
| Sort-order change | ~30 ms* | 26–50 ms | 5 |

\*Includes a fixed 20 ms settle delay in the measurement harness itself
(sort doesn't change the visible count, so a content-change signal
couldn't be used the way search/clear could) — real work is roughly
6–30 ms.

**These numbers are at the edge of meaningful measurement** (single-digit
milliseconds, browser event-loop/GC noise-level) but consistently land
well under 15 ms across every trial — directionally solid evidence that
filtering/sorting 251 items produces **no perceptible latency** at this
scale. No formal p95 is reported because 5 samples at this magnitude
would just be reporting noise as precision.

## 10. Similar-person scaling benchmark — the key measurement

Method: a temporary `tsx` script (not committed) calling the actual
production `rankSimilarPeople()`/`selectOppositePerson()` functions
directly against real `SEED_PEOPLE` data and constructed subsets. 1–3
warm-up calls + 5–10 measured iterations per point; median reported.

**A. Real current data (N=251 total, 114 match-eligible):**

| Call | Median |
|---|---|
| `rankSimilarPeople(anchor, full 251)` | 2.47 ms |
| Both calls together, as `page.tsx` actually invokes them | 4.89 ms |

**B. Total array size N, holding match-eligible fixed at 114** (this
mirrors the actual observed pattern: Roster33 and Roster34 together added
26 people, all non-match-eligible):

| N (total array size) | Eligible-in-set | Median |
|---|---|---|
| 50 | 50 | 0.82 ms |
| 100 | 100 | 1.75 ms |
| 150 | 114 (capped) | 2.23 ms |
| 200 | 114 | 2.38 ms |
| 251 | 114 | 1.77 ms |
| 500 | 114 | 1.93 ms |
| 750 | 114 | 2.48 ms |
| 1000 | 114 | 1.77 ms |

**Once the eligible-in-set hits 114, cost stays flat (~2 ms) all the way
out to a synthetic N=1000** — direct empirical evidence that, as long as
match-eligible count doesn't grow, this per-page cost does not grow with
total roster size.

**C. Eligible-subset size in isolation** (the actual cost driver — the
`.map()`+`.sort()` over match-eligible people only):

| Eligible count | Median |
|---|---|
| 20 | 0.31 ms |
| 50 | 0.73 ms |
| 80 | 1.31 ms |
| 114 | 2.07 ms |

Scales roughly linearly with eligible count (0.31→2.07 ms across a
5.7× increase in n, i.e., close to O(n), not O(n²) — expected, since this
is one `.filter().map().sort()` pass, not an all-pairs computation).

**D. Real aggregate: both calls, for every one of the 251 real people,
once (1 locale):**

- **967.8 ms total, ≈3.86 ms/person.** Projected for both locales (the
  actual build behavior): **≈1,936 ms (≈1.9 s)** — about 3% of the
  observed 61s total build time.

### Observed complexity interpretation

The naive worry ("similar-person is all-pairs across the whole roster, so
it's O(n²) and will get expensive") is **not what's actually happening**,
because `rankSimilarPeople` filters to `isMatchEligible` before doing any
expensive work. The true cost shape is:

```
total_build_cost_for_this_feature ≈ (total_pages) × (match_eligible_count)
                                    = (2 × N_total) × E
```

- If **E stays flat** (empirically true for 2 consecutive cycles, both of
  which added only non-match-eligible people): total cost is **O(N_total)
  — linear**, confirmed directly by measurement B above.
- If **E instead grows proportionally with N_total** (as happened in
  earlier roster24-32-era cycles, which did add some match-eligible
  people): total cost becomes **O(N_total²)** again. This is the one
  condition worth watching, not a currently-true fact.

### 500-person projection (labeled)

**Projection, not measurement.** Assuming the 2-cycle empirical trend
holds (match-eligible count stays ≈114):

- Per-page cost stays ≈2–5 ms (flat — **fixed overhead**, confirmed
  empirically in table B, not linear or O(n²))
- Total pages at 500 people: 1,000 (2 locales)
- Projected aggregate similar-person cost: ≈1,000 × 3.86ms ≈ **3.9
  seconds** (linear scaling in page count only)

**Conditional caveat, clearly labeled**: if a future roster cycle resumes
adding match-eligible people (last true during roster24-32-era, i.e., E
grows instead of staying flat at 114), this projection would need to be
redone using the O(n²)-shaped formula instead — the 3.9s figure is NOT
valid under that different assumption.

## 11. Test/tooling runtime baseline (251-person baseline for future 500/750/1000 comparison)

One timed run each, no repeats:

| Command | Wall-clock | Result |
|---|---|---|
| `tsc --noEmit` | 5.6 s | clean |
| `validateCandidates.ts` | 0.8 s | 314 candidates, 0 errors, 0 warnings |
| `checkScoringLockIntegrity.ts` | 12.5 s | 314 checked, 0 flagged (legacy 22/0) — slowest non-build/Playwright tool, due to one `git show HEAD:<path>` subprocess spawn per candidate file; will scale roughly linearly with candidate count |
| `vitest run` (full suite) | 9.2 s | **1185/1185 passed**, 64 files |
| `next build --webpack` (clean) | 61 s | 526 paths, success |
| Focused Playwright (Directory + Person + Compare) | 161.8 s (2m 41.8s) | **118/118 passed** (includes the harness's own build+start step) |

## 12. Static-page growth: formula and projection

Two real data points: 239 people → 502 paths (pre-Roster34); 251 people →
526 paths (post-Roster34). Delta: +12 people → +24 paths — exactly 2 per
person (EN + KO), confirming:

```
static_person_paths(N) = 2×N + 24
```

(24 = the fixed non-person-page routes: locale roots, `/people` index ×2,
`/quiz` ×2, `/privacy` ×2, `/terms` ×2, `/compare` is dynamic so not
counted here, plus icons/OG-image/sitemap/robots singletons.)

Verified: 2×239+24=502 ✓, 2×251+24=526 ✓.

**Projection (linear, high confidence given 2 confirmed data points on the
same formula):**

| N (people) | Projected static paths |
|---|---|
| 500 | 1,024 |
| 750 | 1,524 |
| 1,000 | 2,024 |

## 13. Matching / eligibility data-health snapshot

| Metric | Value |
|---|---|
| Production | 251 |
| Directory-visible | 250 |
| Match-eligible | 114 |
| Match-eligible / production | 45.4% |
| Directory-visible / production | 99.6% |

**A. Published/directory field-category coverage** (all 251 production
people, NOT the matching pools):

| Category | Count |
|---|---|
| science_knowledge | 103 |
| arts_culture | 96 |
| leadership_society | 74 |
| building_discovery | 44 |

**B. MATCH-ELIGIBLE interest-scope pools** (the 114 match-eligible people
only — the actual population `interestScope.ts` operates on):

| Category | Count |
|---|---|
| science_knowledge | 50 |
| arts_culture | 43 |
| leadership_society | 42 |
| building_discovery | 15 |

These two metrics are reported separately deliberately (per the Roster33
terminology-correction precedent) — never conflate them.

## 14. Roster33 + Roster34 new-cohort snapshot (diagnostic only)

26 people (14 Roster33 + 12 Roster34), all `evidence_approved`, all
directory-visible, all non-match-eligible. Distribution of their actual
`evaluateMatchEligibility()` output:

| Metric | Min | Median | Max |
|---|---|---|---|
| Scored row count | 3 | 6 | 18 |
| Coverage | 0.083 | 0.184 | 0.537 |
| High-confidence (≥0.55) count | 1 | 5 | 17 |
| High-confidence average confidence | 0.518 | 0.565 | 0.651 |

Eligible count: **0 / 26**. This is an honest, unmanipulated outcome — no
row was padded, no threshold was adjusted, and this checkpoint does not
conclude the evidence methodology needs to change because of it (per
instruction). It simply documents what the current publication-vs-matching
architecture looks like after 26 evidence-approved-but-below-floor
additions: the closest any of the 26 gets to the 18-scored-row /
0.6-coverage floor is Walt Disney (18 rows, 0.537 coverage) — genuinely
close but still short, entirely on its own evidence merits.

## 15. Matching health confirmation

- Match-eligible count: **114**, unchanged from the post-Roster34
  expectation (confirmed directly in §1/§13).
- `dispersion.generated.ts`: confirmed unchanged during Roster34's own
  two-pass `calibrate.ts quiz` run (bit-identical both times; a
  line-ending-only touch was reverted, no content diff). Not re-run in
  this checkpoint since nothing changed that would affect it.
- `CALIBRATION_VERSION`: **`calibration_v3`**, unchanged.
- Per instruction, since the eligible cohort, dispersion, and calibration
  are all confirmed unchanged, Roster34's own matching-health result
  (full `matching.test.ts` suite green, including the "every
  currently-eligible profile stays eligible" regression guard) is
  referenced as still applicable — no redundant simulation/sensitivity
  rerun performed.

## 16. 500-person projections (summary table, all explicitly labeled)

| Quantity | Projection at N=500 | Basis |
|---|---|---|
| Static paths | 1,024 | **Linear** (2 confirmed data points, exact formula) |
| Portrait storage | ≈142 MB | **Linear**, assumes the established 1600px/quality-85 convention holds for future additions (as all 12 Roster34 portraits did) and no more 3-5MB outliers are introduced |
| Directory index payload | ≈627 KB raw / ≈86 KB gzip | **Linear** (confirmed per-person byte cost from real measurement) |
| Similar-person aggregate build cost | ≈3.9 s | **Fixed-per-page cost × linear page count**, CONDITIONAL on match-eligible count staying ≈114 (2-cycle observed trend) — would become O(n²)-shaped if eligible count resumes growing |
| Build time | ≈75 s | **Fixed compile overhead (~56s) + linear static-gen scaling** (4.9s at 526 paths → ~9.3ms/path × 1,024 paths ≈ 9.5s static-gen + 56s fixed ≈ 65.5s; rounded up for margin) |
| Test/tooling runtime | insufficient evidence | No historical per-cycle timing data exists to fit a trend; each roster cycle adds ~100-150 tests, but wall-clock impact hasn't been tracked cycle-over-cycle |

## 17. Concrete scaling risks found

1. **3 portrait files (~10 MB combined) violate the project's own
   established compression convention** — a real, fixable, but small and
   non-blocking data-hygiene issue (§5).
2. **`selectOppositePerson` redundantly re-runs `rankSimilarPeople` a
   second time per page** instead of reusing the first call's result —
   doubles a currently-trivial (≈2ms) cost; harmless today, a clean and
   easy fix whenever someone is in that file for another reason, not
   urgent on its own.
3. **The similar-person build cost's linear-vs-quadratic behavior is
   conditional on match-eligible count staying flat** — true for 2
   cycles running, but not an architectural guarantee. Worth a one-line
   watch-item in a future roster checkpoint's own report (does the new
   cycle's cohort include any match-eligible people?), not a change to
   anything now.
4. **`docs/context/CURRENT_STATE.md` is severely stale** (its "Product"
   section headline and `main`-branch table row still describe a
   125-person/`7a6e306` state from many cycles ago, despite the file
   receiving small append-only edits from more recent cycles) —
   discovered incidentally while doing this checkpoint's own minimal
   update (§20). Explicitly NOT fixed here (out of this checkpoint's
   scope, and the task instruction is to avoid broad historical cleanup)
   — flagged as a real candidate for a dedicated documentation-hygiene
   task.

## 18. Explicitly NOT problems (checked, and found to be fine)

- Similar-person computation is NOT the O(n²)-across-the-whole-roster
  concern it looks like on first read — it's bounded by match-eligible
  count, empirically confirmed flat from N=150 to a synthetic N=1000
  (§10).
- The Directory does NOT ship full profiles to the client — confirmed
  directly, compact index only, ~173 bytes/person gzip (§8).
- `src/core/i18n/editorial.ts` being the single largest source file
  (1.16 MB) is expected content growth with no performance consequence —
  it's Server-Component-only content, never bundled to the Directory
  client (§4).
- Build time (61s at 251 people, projected ~75s at 500) is not a concern
  at any measured or projected point — the static-generation phase itself
  is under 5 seconds; nearly all build time is fixed framework/compile
  overhead (§6).
- No duplicate portrait files by content hash (§5).
- Search/filter/sort at N=251 is imperceptibly fast (single-digit
  milliseconds) — "O(n) is theoretically fine" is also empirically
  confirmed fine here (§9).

## 19. Final classification

# EXPANSION_GREEN

Nothing measured here rises to "a concrete scalability problem that
should be solved before adding more people." The one real, non-fabricated
finding with an actual byte cost (3 oversized legacy portraits) is small
(≈10 MB out of 70 MB total, ~14% of storage from 1.2% of files) and
entirely independent of continued roster growth — it doesn't get worse by
adding more people, and every portrait added since (all 12 in Roster34)
already follows the correct convention. The one real architectural
subtlety (similar-person cost is bounded by match-eligible count, not
total roster size) is favorable news, not a blocker, and comes with a
clear, cheap way to notice if the assumption ever stops holding (check
whether a future roster cycle's cohort includes match-eligible people).

## 20. Recommended next task

**Continue directly with Roster35** (the 250→500 expansion lane), using
the same methodology as Roster33/34. Optionally bundle, or do in parallel
and independently of Roster35, a small non-blocking housekeeping item:
recompress the 3 oversized legacy portraits (James Baldwin, George
Bernard Shaw, Virginia Woolf) to the established 1600px/quality-85
convention — a ~20-minute task with no research/evidence component, not a
gate on anything.

## 21. Validation of this checkpoint's own change

This branch is docs-only. Confirmed via `git status`/`git diff`:

- Only `docs/checkpoints/250-person-performance.md` (new) and
  `docs/context/CURRENT_STATE.md` (minimal top-of-file addition) are
  touched.
- No temporary benchmark scripts committed (all `src/dev/_tmp_*.ts` files
  used during measurement were deleted immediately after use and are
  absent from `git status`).
- No `.env.local` committed (confirmed gitignored).
- No generated-measurement-junk files (`/tmp/*.log`, `/tmp/*.txt` used
  during benchmarking live outside the repo entirely, under the OS temp
  directory, never inside the worktree).
- No source or data file changed — `tsc`/`validateCandidates`/
  `checkScoringLockIntegrity`/`vitest`/`build`/`Playwright` were all
  already exercised as measurement commands in this same document (§1,
  §6, §11) and were not rerun redundantly after the docs-only edits.
