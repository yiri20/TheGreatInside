# 750-person performance + scale checkpoint (2026-11-06)

`CHECKPOINT750_BASE_SHA`: `0f5e5a239ca0fb96bea34c9c4de81ada1975af07`, the merge
commit of PR #78 (Roster65). Exactly two parents: `b5668ff7...` (prior `main`,
the Roster64 merge) and `86f39748...` (the reviewed Roster65 head, Vercel
SUCCESS). Merged with a normal merge commit, guarded on the exact head
(`--match-head-commit`); no squash, no rebase; branch kept.

**Measurement + decision only.** No product, data, scoring, eligibility,
matching, portrait, editorial or legacy file was changed. No people added or
rescored. No Roster66, no Legacy Batch 6, no portrait recompression, no
optimization. Benchmark scripts lived outside the repository and are not
committed. The 503-person control worktree was removed after measurement.

## 0. How to read the numbers

The 500-person checkpoint (`500-person-performance.md`) was taken on a heavily
loaded machine and had to normalize through a same-session control. This run was
on a **quiet** machine (CPU load sampled at 1-51%, about 8.4 GB of 31.6 GB RAM
free, no virtual machines running), so absolute times are close to a
quiet-machine reading. The same-session control discipline was kept anyway:

- **Control:** `638a412154afff19cba13118ea4c6d61a13a3f1c`, the Roster52 merge
  (503 production people, 577 candidate files), the 500 checkpoint's own base,
  checked out in a throwaway worktree with its own `pnpm install --frozen-
  lockfile`.
- **Current:** `0f5e5a2` (762 production people, 937 candidate files).

Every time-based comparison pairs control and current, measured back to back
(alternating) in the same session. **The control-to-current ratio is the scaling
evidence.** Where a single run was noisy (clean build, 2 runs each) both runs are
shown. Loopback timings are comparative, not a production SLA.

## 1. Environment

| Item | Value | 500 checkpoint |
|---|---|---|
| Date | 2026-11-06 | 2026-10-22 |
| OS | Windows 11 Home 10.0.26200 | same |
| CPU | Intel Core Ultra 7 155H | same |
| RAM | 31.6 GB total; about 8.4 GB free during the benchmark | 32 GB; about 3 GB free |
| Background load | CPU 1-51% sampled (mostly 1-12%); no VMs | 65-100%, VMs and browsers |
| Node | v24.18.1 | v24.18.1 |
| pnpm | 10.34.5 | 10.34.5 |
| git | 2.47.1.windows.1 | 2.47.1.windows.1 |
| Next.js | 16.3.0 (`--webpack`) | 16.3.0 |
| React | 19.2.8 | 19.2.8 |
| TypeScript | 5.9.3 | 5.9.3 |
| Vitest | 2.1.9 | 2.1.9 |
| Playwright | 1.62.1 | 1.62.1 |

**No tool or framework version changed since the 250 and 500 checkpoints, so
version drift cannot confound any comparison.** The one environmental difference
is machine load (much lower now), which is why today's absolute figures are
smaller than the 500 document's raw figures; that is exactly what the control
isolates.

## 2. PR #78 merge and production deployment verification

PR #78 guards, all re-checked mechanically before the merge: open, not draft,
`mergeable` / `CLEAN`, base exactly `b5668ff7202ad8d1fc7b227d5e6429d6097097ed`,
head exactly `86f397481671249c86020d3536560fbb5ccb1887`, 0 behind `main`, two
commits (`7163103` implementation, `86f3974` checkpoint docs), Vercel `SUCCESS`
and `Vercel Preview Comments` `SUCCESS` on the exact head, 0 review threads, 0
reviews, and the only comment the Vercel bot's informational notice. Merge SHA
`0f5e5a239ca0fb96bea34c9c4de81ada1975af07`, parents `b5668ff7...` and
`86f39748...`.

Deployed production (`https://thegreatinside.com`, after the merge deployment's
status turned `success`; the Directory changed from "736 people" to
**"761 people"**):

- All **25** Roster65 shipped profiles returned **EN 200, KO 200**, and the
  portrait URL read from each live EN page's `<img src>` returned **200**
  (25/25, 0 failures).
- All **5** Roster65 holds (Ibrahim Muteferrika, Inca Garcilaso de la Vega,
  Ogino Ginko, Claudio Gay, Ho Xuan Huong) return **404 in both locales**.
- `categoryCounts.ts` on the merged tree: production science 312, arts 280,
  leadership 139, building 245; directory-visible science 312, arts 280,
  leadership 138, building 244. The single Zheng He production-vs-visible gap
  (leadership and building) is unchanged.
- `validateCandidates.ts`: **0 errors, 0 warnings**, 937 files (evidence_approved
  759, qa_passed 93, held 85).
- Scoring lock: **937 candidate files / 0 flagged; legacy 22 covered / 0
  flagged** (baseline preserved).

Benchmarking started only after this was confirmed.

## 3. Post-merge inventory (mechanically derived, `SEED_PEOPLE` and the file system)

| Metric | 251 (250 ckpt) | 503 (control) | **762 (now)** |
|---|---|---|---|
| Production (`SEED_PEOPLE.length`) | 251 | 503 | **762** |
| Directory-visible | 250 | 502 | **761** |
| Match-eligible | 114 | 114 | **114** |
| Eligible / production | 45.4% | 22.7% | **14.96%** |
| People with a portrait (`portrait.url`) | 245 | 497 | **756** |
| Portrait asset files | 247 | 500 | **759** (3 unreferenced legacy files: Booker T. Washington, Hillary, Hippocrates; 0 referenced-but-missing) |
| Candidate JSON | 314 | 577 | **937** (evidence_approved 759, qa_passed 93, held 85) |
| Static/SSG paths (build line) | 526 | 1030 | **1548** |
| `calibration_v3`, `meanSd` | 11.704 | 11.704 | **11.704** (unchanged, no re-calibration run) |
| Legacy baseline / flags | 22 / 0 | 22 / 0 | **22 / 0** |

Candidate JSON grew faster than production (937 vs 762, 1.23 per production
person) because held research is kept; that matters for the scoring-lock
runtime (section 13).

## 4. File-size growth

Measured on both trees in the same pass (binary MiB; decimal bytes where stated).

| Item | 251 baseline | 503 control | **762 now** | 503 -> 762 | Shape |
|---|---|---|---|---|---|
| `data-pipeline/candidates/` | 4.2 MB, 314 files | 9.68 MiB, 577 files (mean 17,592 B) | **16.20 MiB, 937 files (mean 18,129 B)** | +67% bytes, +62% files | linear (+3% per-file) |
| `public/portraits/` | 70.17 MiB, 247 | 144.06 MiB, 500 | **201.61 MiB, 759** | +40% bytes, +52% files | **sublinear** (newer convention) |
| `src/` | 7.1 MB | 13.03 MiB, 330 files | **18.23 MiB, 371 files** | +40% | sublinear vs +51% people |
| `app/` | 343 KB | 243 KiB | **243 KiB** (identical, 39 files) | 0 | roster-independent |
| `peopleIndex.generated.ts` | 373,569 B | 644,204 B | **899,969 B** | +39.7% (1,281 -> 1,181 B/person) | sublinear |
| `src/core/i18n/editorial.ts` | 1,161,896 B | 2,785,728 B | **3,899,507 B** | +40.0% | **sublinear** (was +140% in the 500 interval) |
| `src/data/people/editorial.ts` | 399,245 B | 689,879 B | **1,017,987 B** | +47.6% | about linear |
| `src/core/i18n/ko.ts` | -- | 176,276 B | **190,890 B** | +8.3% | linear in person names |
| Largest roster files | `roster34.ts` 140,813 B | `roster50.ts` 415,596 B | `roster50.ts` 415,596 B; `roster51.ts` 328,013; `roster65.ts` 326,714; `roster55.ts` 325,811; `roster62.ts` 322,928 | -- | newer rosters stable near 0.33 MB per 25-30 people |

Largest files now: i18n editorial 3.90 MB, data editorial 1.02 MB, peopleIndex
0.90 MB, roster50 0.42 MB. Growth is approximately linear or sublinear in
roster count everywhere; **nothing grows faster than the roster.** The 3.9 MB
i18n editorial file is server/profile-side content (section 14 confirms it is
not in any client chunk).

## 5. Portrait storage

| Stat | 251 | 503 control | **762 now** |
|---|---|---|---|
| Count | 247 | 500 | **759** |
| Total | 70.17 MiB | 144.06 MiB | **201.61 MiB** (211,407,054 B) |
| Mean | 291 KiB | 295 KiB | **272 KiB** |
| Median | 216 KiB | 234 KiB | **223 KiB** |
| p95 | 806 KiB | 724 KiB | **645 KiB** |
| Max | 3.34 MiB | 3.26 MiB | **3.26 MiB** (`james-baldwin-vanvechten-1955.jpg`, 3.42 MB decimal) |
| Min | 7.2 KiB | 7.2 KiB | **5.6 KiB** |
| Over 1 MiB (1,048,576 B) | -- | 8 files, 15.3 MB, 10.1% | **8 files, 15.32 MB, 7.2%** of bytes (1.05% of files) |
| Over 1 MB decimal (1,000,000 B) | -- | 9 files | **10 files, 17.40 MB** |

Duplicate-content check (SHA-256 over all 759 files): **no duplicates**.

The 259 portraits added since the control: **60.35 MB total, mean 233,017 B,
median 211,712 B, p95 481,569 B, max 1,032,344 B, min 5,743 B**. The eight
legacy outliers over 1 MiB are exactly the same files as at 503 (Baldwin 3.42
MB, Shaw 3.02, Woolf 2.95, Aquino 1.23, Hippocrates 1.21, Proust 1.20, Pele
1.19, Mercury 1.10; Mendel 1.05 MB is the ninth over 1 MB decimal). The only
file added since 503 that crosses 1,000,000 bytes is
`josiah-willard-gibbs-unknown-1906.jpg` (1.03 MB, 888 x 1184, shipped in
Roster61): a high-quality source, below 1 MiB, **not a convention regression**.
The newer downscaling convention remains effective (new-portrait mean 233 KB vs
the legacy 295 KiB mean), and legacy outliers still dominate the tail but now
account for a smaller share of the bytes. Not recompressed here; recompressing
the three largest is a follow-up task only (section 20).

## 6. Clean production build benchmark

Method: `rm -rf .next`, one `next build --webpack`, success. Two clean builds per
tree, alternating control and current (a first, unmetered control build right
after install was cold: compile 26.4 s, static generation 9.1 s).

| | 503 control run 1 | 503 control run 2 | **762 run 1** | **762 run 2** |
|---|---|---|---|---|
| Total wall-clock | 62.3 s | 59.3 s | **84.1 s** | **67.9 s** |
| Compile | 18.6 s | 16.4 s | 22.2 s | 18.2 s |
| Static generation | 8.1 s | 8.2 s | **10.9 s** | **11.2 s** |
| Static/generated paths | 1030 | 1030 | **1548** | **1548** |
| `.next` size | 669 MB | 669 MB | 902 MB | 902 MB |

Literal current build line:
`✓ Generating static pages using 21 workers (1548/1548) in 11.2s`.

Scaling (control mean to current mean): total **60.8 s -> 76.0 s (x1.25;
run-pairs x1.35 and x1.14, so +/-15% noise)**, compile x1.15, static generation
**8.15 s -> 11.05 s (x1.36 for x1.50 paths: sublinear)**, `.next` x1.35. The
per-person marginal over the 259 added people is about 59 ms of wall-clock, 10
ms of compile and 5.6 ms of static generation per extra path. On this quiet
machine the 762-person build takes about 76 s end to end (range 68-84 s).

## 7. Static path formula

`static_person_paths(N) = 2N + 24` holds exactly at a fourth data point:
`2 x 762 + 24 = 1548` (literal `(1548/1548)`), after 526, 1030 and earlier points.
Routing is untouched in Roster33-65 (the app code is byte-identical in size).
Mechanically: 1,524 person HTML files (762 x 2 locales) plus 24 fixed routes.
Projection (exact): **N=1000 -> 2,024.**

## 8. Local route payloads (LOCAL COMPARATIVE MEASUREMENTS, NOT PRODUCTION SLA)

`next start` from each measured build (control port 3101, current port 3102),
fresh servers; gzip is wire size with `Accept-Encoding: gzip`; first request
after server start and five warm requests (seconds).

| Route | Status | Raw 503 -> 762 | gzip 503 -> 762 | First request 503 / 762 | Warm 503 / 762 |
|---|---|---|---|---|---|
| `/en-US/people` | 200 | 305,661 -> **445,113 B** (x1.46) | 26,554 -> **37,230 B** (x1.40) | 15 / 19 ms | 6-7 / 7-25 ms |
| `/ko-KR/people` | 200 | 306,007 -> **445,697 B** | 30,851 -> **43,085 B** | 11 / 38 ms | 5-32 / 5-8 ms |
| `/en-US/people/leonardo-da-vinci` | 200 | 68,902 -> **68,909 B** | 10,169 -> 10,168 B | 10 / 25 ms | 4-16 / 4-5 ms |
| `/ko-KR/people/leonardo-da-vinci` | 200 | 70,240 -> 70,247 B | 10,941 -> 10,942 B | 8 / 8 ms | 4-15 / 4-30 ms |
| `/en-US/compare/leonardo-da-vinci` | 200 | 15,804 -> 15,811 B | 4,309 -> 4,309 B | 199 / 272 ms (dynamic route) | 7-9 / 7-35 ms |
| `/en-US/quiz` | 200 | 14,511 -> 14,520 B | 3,333 -> 3,334 B | 4 / 4 ms | 4-35 / 4-24 ms |

The profile, Compare and quiz pages are byte-for-byte the same size as at 503
(the differences are 7-9 bytes of build-specific content), so **their payload does
not scale with the roster**. Only the Directory HTML grows, in proportion to the
people it lists (about 538 B raw and 41 B gzip per added person). Latencies are
loopback and sub-30 ms on both trees; do not overinterpret.

## 9. Directory client payload

Inspected `.next/static/chunks` in both builds (42 JS chunks each):

- The Directory still ships the **compact `PEOPLE_INDEX`**, not full `Person`
  objects. The index chunk (`937-*.js`) has **zero occurrences of `sources`,
  `doNotCopy` or `rationale`**; the chunk containing the index fields is the
  same four chunks as at 503.
- **Index chunk: 537,459 B raw / 74,254 B gzip (503) -> 747,006 B raw / 105,919
  B gzip (762).** Per person: **980 B raw / 139 B gzip** (503: 1,068 / 148).
  Marginal cost of the 259 added people: **809 B raw / 122 B gzip each** (500
  document: 884 / 124).
- **Directory-page-specific chunk: 7,036 B raw / 2,113 B gzip**, byte-identical
  to 503 (7,036 / 2,111). `main-app` chunk: 252,250 -> 265,569 B raw (76,879 ->
  81,877 gzip), carrying the Korean `person.name.*` table, linear and small.
- Total client JS: 2,003,820 -> 2,226,690 B raw (517,837 -> 554,502 gzip).
- Portraits remain lazy: **756 of 756** Directory `<img>` elements carry
  `loading="lazy"`.
- **`/quiz` still loads the same compact index chunk** (the quiz page's script
  list includes `937-*.js`, 105.9 KB gzip) although only 114 of 762 people are
  match-eligible; the profile page does not load it. Same finding as at 503
  (optional watch item), now larger in absolute terms.

## 10. Directory DOM and interaction scaling

Method as at 500, harness reimplemented outside the repo (it was not kept): the
production build in the Browser pane, native value setter + `input`/`change`
events, wall time from dispatch to the visible "N people" label reaching its
target (MutationObserver), 1 discarded warm-up + 5 measured repetitions per
operation, **median of five**. Control and current were measured alternately in
the same browser tab (three rounds each). Medians per round, then the median of
the three rounds:

| Operation | 503 rounds (ms) | **503 median** | 762 rounds (ms) | **762 median** | 762 / 503 |
|---|---|---|---|---|---|
| Search, common ("an") | 16.4 / 14.8 / 15.9 | **15.9** | 23.5 / 24.8 / 24.3 | **24.3** | 1.53x |
| Search, no result | 9.4 / 8.3 / 9.0 | **9.0** | 10.6 / 17.8 / 13.7 | **13.7** | 1.52x |
| Clear search (back to all) | 39.1 / 32.4 / 28.2 | **32.4** | 32.6 / 51.5 / 45.4 | **45.4** | 1.40x |
| Clear from no-result to all | 41.4 / 39.2 / 44.7 | **41.4** | 57.2 / 82.6 / 82.0 | **82.0** | 1.98x |
| Sort change (first card changes) | 28.5 / 18.7 / 24.4 | **24.4** | 19.9 / 23.7 / 25.4 | **23.7** | 0.97x |
| Filter on (physics) | 9.4 / 9.8 / 8.8 | **9.4** | 9.1 / 11.1 / 11.3 | **11.1** | 1.18x |
| Filter off (back to all) | 36.7 / 40.1 / 37.6 | **37.6** | 52.6 / 61.3 / 76.7 | **61.3** | 1.63x |

DOM: **761 cards, 756 image elements (all lazy)** at 762 (502 cards, 497 images
at 503). **The Directory is still unvirtualized.** Operations that re-render the
whole list (clear/back to all) scale about linearly with the people shown
(x1.4-2.0 for x1.52 cards); operations that render a small result (search,
filter on) and the sort stay near the same cost. The worst measured case today
is 82 ms (back from an empty result to all 761 cards) on a quiet desktop
machine; 45-61 ms for the common clear-to-all. That is below the roughly 100
ms perceptual line, but it is the one operation to re-check near 1,000 (linear
projection about 60-110 ms). Mobile/CPU-throttled devices were not measured.
**Virtualization is still optional, not justified now** (section 20).

## 11. Similar / opposite person scaling

Production functions called exactly as `app/[locale]/people/[slug]/page.tsx`
calls them: `rankSimilarPeople(person, SEED_PEOPLE).slice(0, 6)` and
`selectOppositePerson(person, SEED_PEOPLE)`, same script on both trees, two
rounds alternating (round 1/round 2).

| | 503 control | **762 now** |
|---|---|---|
| `rankSimilarPeople`, one anchor, median of 100 | 1.86 / 1.77 ms | **1.76 / 1.66 ms** |
| both calls, one anchor | 3.61 / 3.65 ms | **3.50 / 3.32 ms** |
| **Aggregate, both calls, all people, one locale, fresh process, first pass** (6 fresh processes, 3 per tree) | 1,752 / 1,736 / 1,773 ms (**3.45-3.52 ms/person**) | **2,694 / 2,603 / 2,588 ms (3.40-3.53 ms/person)** |
| Aggregate, two locales (x2) | about 3.5 s | **about 5.2-5.4 s** |

**Per-person cost is flat (3.4-3.5 ms in both trees; E is still 114); the
aggregate scales with the page count (x1.50 for x1.51 people).** A second
in-process pass was about 2x slower in both trees (a GC/JIT artifact of the
measurement process, not the roster; the fresh first pass is representative of a
build worker), so the fresh pass is used above.

Total-N independence at E=114 (synthetic padding with non-eligible people),
median ms per anchor, two rounds each (control 503 tree) N=250 2.7 / 3.5, 503 4.6 / 3.6, 750 5.4 / 3.4, 762 4.2 / 3.4, 1000 3.6 / 3.4;
(762 tree) N=250 3.7 / 5.3, 503 3.8 / 3.5, 750 3.6 / 3.5, 762 4.1 / 3.6, 1000 3.5 / 4.1: noise of
about +/-1.5 ms around 3.5 ms with no trend in N, so **flat from 250 to 1000.** Eligible-size sensitivity at
fixed N=503 (padding with cloned eligible profiles; 762-tree round 2): E=20
0.62 ms, 50 2.48 (1.56 in round 1), 80 2.4, 114 3.5, 173 5.5, 227 7.4, 342 10.9:
**roughly linear in the eligible count** (about 0.03 ms per eligible person), and
the same in the control tree. **The earlier conclusion holds at 762: similar and
opposite cost is bounded by the eligible count, not the roster size.** The
redundant second `rankSimilarPeople` inside `selectOppositePerson` is still
present and still harmless.

## 12. Quiz match cost

Synthetic 34-attribute user against the real roster (median of 40, after 10
warm-ups; two rounds): `rankMatches` 3.09 / 2.59 ms (503) vs **2.77 / 2.64 ms
(762)**; `buildResultSet` 8.51 / 7.53 ms (503) vs **7.67 / 7.91 ms (762)**. No
change: it filters to the 114 eligible people first, so it follows the eligible
set, not the production count.

## 13. Test / tooling runtimes (same session, quiet machine)

| Command | 503 control | **762 now** | Ratio | Note |
|---|---|---|---|---|
| `tsc --noEmit` | 13.1 s | **20.5 s** | x1.56 | fresh worktree, no incremental cache; src bytes x1.40 |
| `validateCandidates.ts` | 1.2 s (577 files) | **1.4 s (937 files)** | x1.17 | 0 errors, 0 warnings both |
| `checkScoringLockIntegrity.ts` | 26.7 s (577 files; 46.3 ms/file) | **45.6 s (937 files; 48.7 ms/file)** | x1.71 for x1.62 files | linear in candidate files (one `git show` per file) |
| `vitest run` | 22.1 s wall; 82 files, 3,993 tests (Duration 15.3 s) | **21.6 s wall; 95 files, 7,873 tests (Duration 20.4 s)** | wall x0.98, Duration x1.33 | tests x1.97 |
| Clean `next build` | 60.8 s mean | **76.0 s mean** | x1.25 | section 6 |
| Focused Playwright | 118 tests (Person + Directory + Compare), 195.9 s wall (183.3 s in-test) | **142 tests (Person + Editorial + Directory + Compare + Trait Explanation), 213.1 s wall (209.5 s in-test)** | -- | all pass in both; per-spec in-test time, 503 vs 762: Person 60.4 vs 60.0 s, Directory 42.8 vs 45.2 s, Compare 28.1 vs 27.0 s; Editorial 8.8 s and Trait Explanation 12.0 s only exist in the current tree |

Playwright includes the harness's own build + start. The full 286-spec Playwright
suite was **not** run (diagnostic, not required here); the load-sensitive
`interestAreaMatching` specs were not run and nothing is claimed about them.

**Scoring-lock verdict:** 45.6 s for the whole check on a quiet machine. It is
a gate run twice per roster cycle, so about 90 s per cycle; that is not annoying.
The cost is linear in candidate files and projects to about 60 s near 1,000
production people (section 17). Batching `git cat-file --batch` remains an
optional task and is **not justified yet**.

## 14. Matching / eligibility health

| Metric | 251 | 503 | **762** |
|---|---|---|---|
| Production | 251 | 503 | **762** |
| Directory-visible | 250 | 502 | **761** |
| Match-eligible | 114 | 114 | **114** |
| Eligible / production | 45.4% | 22.7% | **14.96%** |

**A. Production / directory category coverage** (all production people;
`categoryCounts.ts`):

| Category | 251 | 503 | **762** (visible) |
|---|---|---|---|
| science_knowledge | 103 | 208 | **312** (312) |
| arts_culture | 96 | 184 | **280** (280) |
| leadership_society | 74 | 79 | **139** (138) |
| building_discovery | 44 | 158 | **245** (244) |

**B. Match-eligible interest pools** (the 114 eligible only, derived live):
science_knowledge **50**, arts_culture **43**, leadership_society **42**,
building_discovery **15** (identical to 251 and 503). Never conflate A and B.

Calibration (`calibration_v3`, `meanSd` 11.704) is unchanged; no re-calibration
was needed or run.

## 15. Recent expansion cohort (context only, not re-analyzed)

Cumulative Roster33-65: **537** people shipped, **0** match-eligible. Production
grew 225 (before Roster33) -> 762. Roster53-65 added 259 people (503 -> 762)
with the eligible set unchanged at 114. The architecture classification from
the earlier matching diagnostic stands (CONTINUE_EXPANSION_AS_IS); no new
matching-architecture evidence appeared, so that diagnostic was not repeated.

## 16. Projection scorecard: the 500 checkpoint's ~750 projections vs 762 actuals

Projections are quoted from section 17 of `500-person-performance.md` and not
edited. Production landed at 762, 12 above the 750 they assumed, so exact
quantities are compared at 762 and linear ones against the stated 750 value
(and at 762 where noted).

| Metric | 500-checkpoint projection | 762 actual | Error | Verdict |
|---|---|---|---|---|
| Production count target | ~750 | 762 | +1.6% | on target |
| Eligible-count assumption | stays ~114 (Scenario A) | **114** | 0 | GOOD PREDICTION |
| Static paths | 1,524 at exactly 750 | **1,548** at 762 (exact formula) | 0 vs `2N+24` | GOOD PREDICTION |
| Portrait storage | ~220 MiB (marginal 0.32 MB/portrait) | **201.61 MiB** (marginal 0.233 MB) | -8.4% (-10% scaled to 762) | CONSERVATIVE: the newer downscaling convention beat the assumed marginal by 27% |
| Directory index raw | ~756 KB | **747,006 B** | -1.2% (-3.9% scaled to 762) | GOOD PREDICTION |
| Directory index gzip | ~105 KB | **105,919 B** | +0.9% | GOOD PREDICTION |
| Directory HTML raw | ~439 KB | **445,113 B** | +1.4% (about 0% scaled to 762) | GOOD PREDICTION |
| Total build time (equivalent) | ~86 s (from ~74 s at 503) | **76.0 s mean** (68-84 s); control today 60.8 s | -12% absolute; scaling ratio x1.25 actual vs x1.16 projected | CONSERVATIVE in absolute terms; slightly UNDER-PREDICTED as a ratio (noisy: run pairs x1.14 and x1.35). The old "equivalent" baseline was itself a load-normalized estimate, so absolute comparison is soft |
| Static generation (equivalent) | ~12.4 s | **11.05 s mean** (10.9, 11.2) | -11% | GOOD PREDICTION (conservative; sublinear x1.36) |
| Scoring lock (quiet machine) | ~30 s | **45.6 s** | **+52%** | UNDER-PREDICTED: the unit cost was right (46-49 ms/file vs 40) but the projection counted people, while candidate files grew to 937 (1.23 per production person, since held research is kept) |
| Similar-person aggregate, Scenario A, two locales | ~6 s | **5.2-5.4 s** | -11% | GOOD PREDICTION (conservative) |
| Scenario B (eligible grows with roster) | ~9 s | not occurring (E=114) | -- | NOT APPLICABLE |
| Directory interaction scaling | clear-to-all linear in people, 30-45 ms baseline-equivalent at 750-1000 | 45 ms common, 82 ms worst, x1.4-2.0 for x1.52 | -- | GOOD PREDICTION on shape (linear to slightly super-linear); absolute at the top of the stated band |
| Quiz matching | follows the eligible set | 2.6-2.8 ms / 7.7-7.9 ms, flat vs 503 | 0 | GOOD PREDICTION |
| Test/tooling runtime | insufficient evidence | measured (section 13) | -- | NOT COMPARABLE with the 500 numbers (their machine was loaded); same-session control used instead |

Honest reading: all but one of the quantitative projections landed within
about 12% (most on the conservative side); the one clear miss is the scoring lock,
and the miss is in the driver (candidate-file count), not the unit cost. No
projection was edited after the fact.

## 17. Updated projection toward 1000 (762 actuals as the base)

Separated by basis. Today's quiet-machine figures; add machine-load noise on a
busy machine.

| Quantity | 762 measured | ~1000 | Basis |
|---|---|---|---|
| Static paths | 1,548 | **2,024** | **Exact formula** `2N+24` (4 data points) |
| Portrait storage | 201.61 MiB | **~255 MiB** (about 265 MiB if new portraits average the whole-roster 272 KiB) | **Linear** at the measured recent marginal 233,017 B per portrait (259 portraits); assumes the downscaling convention continues |
| Directory index chunk | 747,006 B raw / 105,919 B gz | **~940 KB raw / ~135 KB gz** | **Linear** at the measured marginal 809 B raw / 122 B gz per person |
| Directory HTML | 445,113 B raw / 37,230 B gz | **~573 KB raw / ~47 KB gz** | **Linear** at the measured 538 B / 41 B per person |
| Clean build, wall-clock | 76.0 s (68-84 s) | **~90 s** (range about 80-100 s) | **Linear marginal** 59 ms per person over the control-to-current span; compile 10 ms/person and static generation 5.6 ms/path |
| Static generation | 11.05 s | **~14 s** | **Measured sublinear marginal** (5.6 ms per added path x 476 paths); linear per-path would give 14.4 s |
| Scoring-lock runtime | 45.6 s (937 files) | **~60 s** (about 1,230 candidate files x 49 ms) | **Linear in candidate files**, assuming the recent 1.23 candidates per shipped-person ratio holds |
| Similar-person aggregate, Scenario A (E=114) | 2.6 s one locale / 5.3 s two | **~3.5 s / ~7 s** | **Flat 3.45 ms per page x pages** (build wall-clock is lower: 21 workers) |
| Same, Scenario B (hypothetical: E grows to the 503-era 22.7% = 227) | -- | **~7 s one locale / ~14 s two** | **Measured ~0.03 ms per eligible person per page x pages x E**; NOT occurring today |
| Quiz matching `buildResultSet` | 7.7-7.9 ms | **~8 ms** at E=114 (about 16 ms at E=227) | **Eligible-count bounded**, independent of N |
| Directory clear-to-all (rendering all cards) | 45 ms median, 82 ms worst | **~60 ms / ~108 ms** | **Linear in cards** at the measured scaling |
| `.next` size (local only) | 902 MB | ~1.1 GB | linear; build cache, never deployed |

Scenario A is the observed state (E has been 114 since the 251-person checkpoint).
These are projections from linear/sublinear fits to a few points, not
guarantees; anything not in the table is unknown.

## 18. Maintenance-scale reassessment

Measured on the Roster65 merge (`b5668ff..0f5e5a2`): **107 files changed, of
which 42 are test/spec files** (33 `audits/rosterNN.test.ts` including the new
`roster65.test.ts`, 5 legacy remediation tests, `matchPoolIntegrityAudit.test.ts`,
`matching.test.ts`, `profilePublicationSeparation.test.ts`,
`peopleDirectory.spec.ts`), 41 files under
`src/dev/roster1000`, 55 `generateRosterNN.ts` scripts exist, and **43 source
files contain the literal `762`** (162 occurrences of 761/762 in `src`/`e2e`).
At Roster52 (PR #64) the same job touched 28 test files; the per-roster
mechanical surface grew from 28 to 42 test files, and grows by one audit file
per roster. Failures are **loud, not silent**: a stale count fails Vitest, and no
missed assertion or generated-index drift was found. The wiring was again done
by a throwaway script kept outside the repository, so the procedure is still not
discoverable from the repo.

| Idea | Verdict |
|---|---|
| Shared production-count constant for the roster tests (43 files, 162 literals) | **USEFUL SOON**: bounded, removes the largest mechanical edit set; not gating |
| Check the roster wiring script into `src/dev/roster1000/` | **USEFUL SOON**: pairs with the constant; makes the procedure discoverable |
| Generated roster manifest | **STILL NO NEED**: no silent failures; the cost is scripted and loud |

None implemented here. The hold lists and the matching known-non-eligible slug
lists grow one append per roster and have produced no error.

## 19. Client/server boundary recheck

All previous non-findings reconfirmed on the 762 build: the Directory ships the
compact index with **no `sources`/`doNotCopy`/`rationale` keys**; the
Directory-page chunk is unchanged at 7,036 B; long-form editorial prose is not in
any client chunk (a rendered Puskas editorial sentence was searched for across
all 42 chunks and appears nowhere; only the UI string table sits in `main-app`);
portraits are 756/756 lazy; full candidate evidence never reaches the client;
profile, Compare and quiz payloads are roster-size independent. **No new
boundary regression.** One standing item: the quiz route loads the whole compact
index (section 9).

## 20. Concrete measured risks

| Risk | Measurement | Consequence | Urgency | Next action |
|---|---|---|---|---|
| Legacy portraits unresized | 8 files over 1 MiB = 15.3 MB (7.2% of bytes, 1.05% of files); Baldwin 3.42 MB, Shaw 3.02, Woolf 2.95; unchanged since 503 and not growing | storage/bandwidth only; does not scale with the roster | optional | recompress the three largest in a small standalone task |
| Scoring-lock runtime | 45.6 s at 937 files, 48.7 ms/file, linear; about 60 s projected at 1000 | gate run twice per roster cycle (about 90 s per cycle) | optional / watch-only | batch `git cat-file --batch` only if it passes about 2 minutes |
| Whole-list Directory rendering | worst case 82 ms (back from empty to 761 cards), common clear 45 ms; x1.4-2.0 for x1.52 cards; 761 cards, 756 lazy images in the DOM; projected 60-110 ms at 1000 | still under ~100 ms on a quiet desktop; mobile not measured | watch-only | re-measure at about 1,000 (include CPU throttling); virtualize only if worst case exceeds ~100-150 ms there |
| Quiz loads the whole index chunk | 105.9 KB gzip async script for 114 eligible of 762 people (about 15%); grows 122 B gz/person to ~135 KB at 1000 | extra download on `/quiz` only | optional | ship an eligible-only index to the quiz if bandwidth ever matters |
| Roster maintenance boilerplate | 42 test files and 162 literal counts touched per roster; +1 audit file per roster | reviewer noise, discoverability | near-term optional | one bounded task: shared production-count constant + checked-in wiring script |
| Candidate-file growth vs people | 937 candidates for 762 production (1.23x) | drives scoring-lock and validation cost | watch-only | none; account for it in projections (done in section 17) |
| Local `.next` size | 902 MB (669 MB at 503) | disk only; never deployed | watch-only | none |

**No blocker. Nothing newly observed at 762 is a regression.**

## 21. Explicit non-problems (verified at 762)

- Similar and opposite cost is bounded by the eligible count (flat 3.4-3.5 ms
  per page at E=114; flat in total N from 250 to a synthetic 1000; about 0.03
  ms per eligible person).
- Quiz matching follows the eligible set (2.6-2.8 ms / 7.7-7.9 ms, same as 503).
- `static_person_paths(N) = 2N + 24` holds exactly (1,548 at 762).
- The Directory ships a compact index with no evidence keys; the page chunk is
  byte-identical (7,036 B); index payload per person is falling (1,068 -> 980 B
  raw, 148 -> 139 B gzip).
- Portraits stay lazy (756/756); no duplicate portrait files; no portrait added
  since Roster34 exceeds 1 MiB; the 259 recent portraits average 233 KB.
- Build, compile and static generation grow linearly or sublinearly; the clean
  build is about 76 s and generation about 11 s on a quiet machine.
- The 3.9 MB editorial i18n file is not client-side; its growth is now
  sublinear (x1.40 for x1.51 people).
- Profile, Compare and quiz payloads are byte-identical to 503.
- No version drift in any tool or framework since the 250 checkpoint.
- Vitest wall-clock is unchanged (about 22 s) despite 1.97x the tests.
- Focused Playwright per-spec times (Person, Directory, Compare) are unchanged
  at 762.

## 22. Classification

# EXPANSION_GREEN

The evidence supports the 500-checkpoint conclusion at 762. Every growth curve
is linear in the page count or flatter; the one projection that missed (the
scoring lock) missed on candidate-file count and is still under a minute. The
only measured items are optional hygiene (legacy portraits, scoring-lock
subprocess loop, whole-list rendering, quiz index payload, maintenance
boilerplate). It is technically reasonable to resume expansion from 762 toward
1000 under the current architecture.

## 23. Recommended next task

**Resume the 750 -> 1000 expansion lane with Roster66**, using the current
portrait-aware pipeline (identity gate, review-tier adjudication, backlog
exclusion, historical-attribution screen, holder-record rule,
image-identity/inscription rule). Not started in this checkpoint. The roster
expansion pause recorded at the end of Roster65 is lifted by this checkpoint.
Independent small tasks, none gating: (1) a bounded maintenance task for the
shared production-count constant plus the checked-in wiring script (section 18),
which would lower the per-roster edit surface; (2) recompress the three
largest legacy portraits; (3) re-measure Directory interaction (with CPU
throttling) and the scoring lock at about 1,000.

## 24. Validation of this checkpoint's change

Docs-only: this file plus the top summary of `docs/context/CURRENT_STATE.md`.
Benchmark scripts (`bench750`, aggregate, size, chunk and payload scripts, the
browser harness) were kept outside the repository. No candidate JSON, roster,
portrait, scoring, matching, eligibility, editorial or test file changed
(checked with `git diff --stat` against `CHECKPOINT750_BASE_SHA`). Production
counts remain exactly the merged Roster65 state (762 / 761 / 114). The 503
control worktree was removed after measurement.
