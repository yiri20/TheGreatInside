# Roster 11 — Miriam Makeba Production Promotion (DRAFT)

**Status: PRODUCTION IMPLEMENTATION, NOT COMMITTED.** Performed entirely in
an isolated worktree (`../TheGreatInside-roster11-miriam-makeba`, branch
`feat/roster11-miriam-makeba`, based on `origin/main` @
`653b8a1ce703b3119460655f3785ed5d54ffb612`). Promotes exactly one person —
Miriam Makeba — the roster-expansion-125 evidence program's sole
`qa_passed` candidate. No other candidate touched, scored, or promoted. No
alternate (Ashoka, Ibn Battuta, Chandragupta Maurya, Rabban Bar Sauma, Leo
Africanus) reopened. No candidate JSON changed. Nothing committed, pushed,
or merged.

---

## 1. Baseline

- **Repository**: `yiri20/TheGreatInside`, worktree based on `origin/main`
  @ `653b8a1ce703b3119460655f3785ed5d54ffb612` (the roster-expansion-125
  evidence-program merge commit).
- **Live-roster baseline, mechanically verified via `SEED_PEOPLE.length`
  (not file-counting or prose)**: exactly **95** people. `roster2.ts`
  through `roster10.ts` existed; no `roster11.ts`; no
  `generateRoster11.ts`. Miriam Makeba appeared **zero** times in
  `SEED_PEOPLE`, `peopleIndex.generated.ts`, or any `src/data/people/*.ts`
  file.
- **Candidate baseline** (`data-pipeline/candidates/miriam-makeba.json`,
  live-validated fresh in the worktree): `status: "qa_passed"`,
  `scored=20 avgConf=0.549 coverage=0.606 eligible=true` — exact match to
  the merged checkpoint's own figures. `checkScoringLockIntegrity.ts`: 0
  flagged (182 files checked). Corpus lifecycle tally: `held` 121,
  `qa_passed` 61 — unchanged.

## 2. Portrait-gate conflict — resolved before editing, per user decision

Miriam Makeba's candidate record carries **no `portrait` field at all**.
Per `toPersonSeed()` (`candidateSchema.ts`), this means the promoted
`Person` carries no `portrait` field either — a state the repository
already treats as normal and supported (`roster.md`: *"Portrait coverage
... deliberately opportunistic, not a session-blocking requirement"*; 6
existing live roster members — Bruce Lee, Coco Chanel, Fela Kuti, Rumi,
Umm Kulthum, Zheng He — already carry no portrait). This conflicted with
this promotion task's own literal Step 8 wording (portrait presence as a
hard gate). Flagged explicitly before making any change; the user
selected **"repo convention governs"** — proceed through the full
pipeline, portrait absence is not itself a blocker. No portrait was
sourced or fabricated.

## 3. Generator

**Path**: `src/dev/roster1000/generateRoster11.ts` (new), following
`generateRoster10.ts`'s exact template/conventions (imports, formatting,
`toPersonSeed()` + rationale-as-comment rendering, deterministic
`.sort()` ordering).

**Explicit allowlist**: `new Set(["miriam-makeba"])` — a single slug,
never a blanket `qa_passed` filter.

**Fail-closed guards added** (beyond `generateRoster10.ts`'s original
count-only check, per this task's explicit requirement): aborts if the
resolved candidate count isn't exactly 1, if the resolved candidate's
`status !== "qa_passed"`, if required identity fields
(`canonicalName`/`wikidataId`) are missing, or if
`computedEligibility?.eligible` isn't `true`. Not exercised on this run
(all passed cleanly) but present for future reuse safety.

**`generateRoster10.ts` was not modified** — no implementation defect was
found in it that made the documented workflow impossible.

## 4. Generated production record — inspected in full

`src/data/people/roster11.ts` (new) contains **exactly one person**:

- `id: "p_miriam_makeba"`, `slug: "miriam-makeba"`,
  `canonicalName: "Miriam Makeba"`.
- `externalIdentity.wikidataId: "Q146256"` — carried through unchanged
  from the candidate record.
- `regionCode: "sub_saharan_africa"`, `nationalityCodes: ["ZA"]`,
  `era: "20th_century"`, `birthYear: 1932`, `deathYear: 2008`,
  `isLiving: false`.
- `occupationIds: ["singer", "political_activist"]`,
  `fieldIds: ["music"]`,
  `impactDomains: ["artistic", "cultural", "social"]`,
  `tagIds: ["overcame_adversity", "advocate", "founder"]`,
  `archetypeIds: ["social_influencer", "creative_creator"]` — all
  identical to the source candidate JSON.
- **20 attribute rows**, each score/confidence/evidenceType/impact code
  verified to match the candidate JSON's `rows` exactly (e.g.
  `risk_tolerance: [84, 0.8, "d", "R"]` matches score 84, confidence 0.8,
  `documented`->`"d"`, `risk`->`"R"`); every rationale preserved verbatim
  as the inline comment above its row.
- No portrait field (§2). No placeholder text anywhere. No fabricated
  metadata. No second person in the array.

`build()` computed `isMatchEligible: true` and `status: "published"`
purely from the data (never hand-set) — confirmed live in the worktree.

## 5. Production wiring

- **`src/data/people/seed.ts`**: 2-line addition only —
  `import { ROSTER_11 } from "./roster11.js";` alongside the existing
  `ROSTER_9`/`ROSTER_10` imports, and `...ROSTER_11,` appended to
  `ALL_ROSTERS` after `...ROSTER_10,`. No reordering of prior batches, no
  edits to any existing person.
- **`src/data/people/peopleIndex.generated.ts`**: regenerated via
  `generatePeopleIndex.ts` — 96 entries (was 95).
- **`src/core/matching/dispersion.generated.ts`**: regenerated via
  `calibrate.ts`'s first pass (job 1 of 2) — the expected, routine data
  update this document's own header describes (*"how much do notable
  people actually vary on each attribute"*), now computed over 96
  match-eligible-aware people instead of 95.
- **`src/core/i18n/ko.ts`**: one new entry,
  `"person.name.miriam-makeba": "미리엄 마케바"` (verified against the
  standard Korean-Wikipedia rendering; matches her Wikidata QID Q146256),
  added in the same "ROSTER-N batch" comment-block convention every prior
  batch uses, placed after the `roster10.ts`/session-19 block.
- **No portrait wiring** (§2). No existing person's data changed,
  reordered, or regenerated beyond the two generated-file
  regenerations above (both additive — new entries appended, nothing
  removed or altered for the other 95).

## 6. Before/after identity-set delta — exact

Mechanically computed from live `SEED_PEOPLE` (not assumed from the
count alone):

```
BEFORE_COUNT: 95
AFTER_COUNT:  96
ADDED:        ["miriam-makeba"]
REMOVED:      []
DUP_IDS:      []
DUP_SLUGS:    []
DUP_QIDS:     []
```

Spot-checked 3 pre-existing people (`ada-lovelace`, `zheng-he`,
`mustafa-kemal-ataturk`) for `id`/`canonicalName`/attribute-count —
unchanged. `miriam-makeba` appears **exactly once**, `isMatchEligible:
true`, 20 attributes, no portrait, `status: "published"`. Ashoka and Ibn
Battuta confirmed absent (no slug, no canonical-name substring match).
No other `qa_passed` or `held` candidate entered production — the
generator's own allowlist and fail-closed guards make this structurally
impossible, independently confirmed by this direct delta check.

## 7. Localization

**English**: complete — `canonicalName` renders directly; every
classification id she uses (`occupation.singer`,
`occupation.political_activist`, `field.music`,
`impact_domain.{artistic,cultural,social}`,
`tag.{overcame_adversity,advocate,founder}`,
`archetype.{social_influencer,creative_creator}`,
`region.sub_saharan_africa`) already existed in `en.ts` before this
promotion — mechanically confirmed via direct grep, not assumed.

**Korean**: complete to the same standard as existing roster members.
Every one of the same classification ids already existed in `ko.ts`
before this promotion (mechanically confirmed, same method). The one
genuinely new key, `person.name.miriam-makeba`, was added (§5).
`i18n-audit.ts` run fresh in the worktree: **1,039 EN keys, 1,135 KO
explicit keys, 0 missing (100.00% coverage)** — every bucket reports
`missing=0`. No raw i18n key can leak into the UI (Playwright's KO-locale
specs, including a dedicated cross-facet-personality-in-Korean test,
pass — see §9).

## 8. Duplicate/identity checks

0 duplicate `id`, `slug`, or `externalIdentity.wikidataId` anywhere in
the 96-person `SEED_PEOPLE` array (§6). `runRosterQualityGates` (invoked
internally by `validateCandidates.ts`) reported 0 gate failures for the
candidate pre-promotion. No portrait key collision (she has none). No
localization key collision (`person.name.miriam-makeba` did not exist
before this session).

## 9. Roster-specific and full verification suite — commands, results, deltas

| Check | Command | Result |
|---|---|---|
| Candidate validator | `corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts` | 0 errors, 0 warnings, `held` 121 / `qa_passed` 61 (unchanged — no candidate data touched) |
| Scoring-lock integrity | `corepack pnpm@10 exec tsx src/dev/roster1000/checkScoringLockIntegrity.ts` | 0 flagged (182 files checked) |
| Generator | `corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster11.ts` | `Wrote 1 people to .../roster11.ts` |
| People index | `corepack pnpm@10 exec tsx src/dev/generatePeopleIndex.ts` | `wrote ... (96 entries, 164395 bytes)` (was 95) |
| Calibration, run 1 (writes dispersion) | `corepack pnpm@10 exec tsx src/dev/calibrate.ts quiz` | Dispersion regenerated over 96 people; match/greatness anchors printed (provisional, dispersion mid-write) |
| Calibration, run 2 (reports w/ new dispersion in effect) | same | MATCH anchors e.g. p50 `[0.4692, 44]` (shipped: `[0.4694, 44]`) |
| Calibration, run 3 (determinism check) | same | **Identical to run 2**, byte-for-byte — confirmed via diff |
| Calibration drift vs. shipped anchors | manual comparison | MATCH: max drift 0.0003 in raw-similarity space (e.g. p75 0.5001->0.4998); GREATNESS: max drift 0.0005 (p99.9 0.9596->0.9601). **Negligible** — per `adding-a-person.md`'s own explicit guidance, anchors were **not** pasted into `calibration.ts`/`greatness.ts`, `CALIBRATION_VERSION` correctly stays `calibration_v3` |
| Matching simulation | `corepack pnpm@10 exec tsx src/dev/simulate.ts 10000 quiz` | `#1 match frequency` max = `p_warren_buffett` 12.0% (well under the ~20% domination threshold, unchanged from the pre-promotion baseline reported in `CURRENT_STATE.md`); `p_miriam_makeba` 0.1% (functioning, not a dead profile) |
| Sensitivity analysis | `corepack pnpm@10 exec tsx src/dev/sensitivity.ts seeds 10000` | Max-#1-frequency stable across 5 independent seed offsets: mean=11.3%, sd=0.4%, range=[10.8%, 12.0%]. **No run exceeds the 20% alarm threshold.** |
| i18n coverage | `corepack pnpm@10 exec tsx src/dev/i18n-audit.ts` | 1,039 EN keys / 1,135 KO keys, **0 missing, 100.00% coverage**, every bucket `missing=0` |
| TypeScript | `corepack pnpm@10 exec tsc --noEmit` | **Clean, 0 errors** (run twice — before and after the one e2e fixture fix, both clean) |
| Unit/integration tests | `corepack pnpm@10 exec vitest run` | **51 files / 689 tests passed**, 0 failures — including all 3 candidate-file session-isolation tests and the "every match-eligible seed person ranks first for a user who mirrors them exactly" invariant test (covers Miriam Makeba too) |
| Production build | `corepack pnpm@10 exec next build --webpack` | **Clean**, 216 static pages generated (only pre-existing, unrelated `NEXT_PUBLIC_SITE_URL` env warnings, expected in a local/non-Vercel environment — not a code defect) |
| Playwright e2e | `corepack pnpm@10 exec playwright test` | **First run: 299 passed, 1 failed** (§10). **After the fix: 300 passed, 0 failed.** |
| Lint | — | No `lint` script defined in this repository's `package.json`; not part of `adding-a-person.md`'s documented pipeline either. Not applicable. |

**A genuine "NEVER #1: p_octavia_butler" line appeared in the raw
simulation output** — investigated, not dismissed: this is a
pre-existing statistical sampling artifact (Octavia Butler is an
existing, unrelated roster member; a single 10,000-profile random sample
simply never happened to rank her first). The dedicated vitest
invariant test (`matching.test.ts`, "every match-eligible seed person
ranks first for a user who mirrors them exactly") independently and
structurally confirms every match-eligible person — Octavia Butler and
Miriam Makeba both included — CAN rank #1 for an appropriately-aligned
profile. Not a defect this promotion introduced or needs to fix.

## 10. One genuine, in-scope fix: a stale hardcoded roster-count test fixture

**Found**: `e2e/peopleDirectory.spec.ts`'s Korean-locale cross-facet test
asserted `/전체\s*95명\s*중\s*4명/` ("of 95 total, 4 shown") — a
hardcoded pre-promotion roster count. After promotion the page correctly
renders **96** as the total (verified live in the failure output); the
filtered count of 4 people matching curiosity+collaboration (Benjamin
Franklin, Charles Darwin, Jane Goodall, Oprah Winfrey) is **unchanged**
— Miriam Makeba does not satisfy this specific facet combination.

**Classification**: a stale reference directly and unavoidably caused by
this legitimate, documented promotion — the same category of fix this
project's own git history already treats as routine for roster-count
changes (e.g. prior "Fix e2e fixture broken by Life Arc Backfill Batch
N" commits). Not a candidate-data change, not a matching/scoring change,
not trait manipulation.

**Fix applied**: updated the regex to `/전체\s*96명\s*중\s*4명/` and
added a one-line comment explaining the count change; the asserted
*filtered* result (4 people, same 4 names) is untouched. Re-run: 300/300
Playwright tests pass.

**No other stale "95" reference was found to be a live, breaking
assertion** — the handful of other "95" mentions in `e2e/editorial.spec.ts`
and `e2e/results.visual.spec.ts` are historical narrative comments about
*editorial-content* coverage milestones (a different, unrelated metric),
not live roster-count assertions.

## 11. Exact file inventory

**Files modified (5, tracked):**
- `e2e/peopleDirectory.spec.ts` — §10 fix (5 lines).
- `src/core/i18n/ko.ts` — 1 new localization key + batch comment (3 lines).
- `src/core/matching/dispersion.generated.ts` — regenerated (routine data
  update, 72 lines changed, no manual edits).
- `src/data/people/peopleIndex.generated.ts` — regenerated (routine data
  update, +21/-0 lines: Miriam Makeba's entry appended).
- `src/data/people/seed.ts` — 2-line wiring addition only.

**Files created (2, untracked):**
- `src/dev/roster1000/generateRoster11.ts` — the one-person generator.
- `src/data/people/roster11.ts` — the generated production record.

**New checkpoint file created (1):**
- `docs/checkpoints/roster11-miriam-makeba-promotion-DRAFT.md` (this
  file).

**Handoff files updated minimally (2)** — see §12.

**Explicitly confirmed absent from this diff**: any
`data-pipeline/candidates/*.json` file (including
`miriam-makeba.json` itself — never touched), any Ashoka/Ibn
Battuta/Chandragupta Maurya/Rabban Bar Sauma/Leo Africanus reference,
any second promoted person, any existing person's trait/score/portrait
data, any package/dependency/config file, and `next-env.d.ts` (confirmed
byte-identical to the committed `origin/main` version — this worktree
never touched it, since it was created fresh from `origin/main` and the
original dirty checkout's unrelated change was never copied in).

## 12. Handoff documentation updates

`docs/checkpoints/roster.md` and `docs/context/CURRENT_STATE.md` updated
per established convention (overwrite the stale "not yet written"
pointer, don't append a new paragraph) — see those files' own diffs.
Neither the completed roster-expansion-125 evidence checkpoints nor any
alternate-search conclusion was reopened or rewritten.

---

## 13. Final before/after summary

| | Before | After |
|---|---|---|
| Live roster count | 95 | **96** |
| Miriam Makeba in production | No | **Yes, exactly once** |
| `roster11.ts` | Absent | Present, 1 person |
| `generateRoster11.ts` | Absent | Present, single-slug allowlist |
| Ashoka / Ibn Battuta in production | Absent | **Still absent** |
| Any other `qa_passed`/`held` candidate promoted | — | **None** |
| `data-pipeline/candidates/*.json` changed | — | **None** |
| Duplicate ids/slugs/QIDs | 0 | **0** |
| `CALIBRATION_VERSION` | `calibration_v3` | **Unchanged** (drift negligible) |

## 14. Final disposition

**`READY_TO_COMMIT`.**

All of the following hold:
- Exactly Miriam Makeba promoted; live roster exactly 96; she appears
  exactly once; no existing person removed or unexpectedly altered; no
  candidate evidence or score changed (§1, §6, §11).
- Explicit allowlist contains exactly `["miriam-makeba"]` (§3).
- Portrait gate: resolved per explicit user decision — repo convention
  (opportunistic, not blocking) governs; no portrait sourced or
  fabricated (§2).
- English and Korean localization both complete, 100.00% KO coverage,
  0 missing keys (§7).
- Duplicate/identity checks pass (§8).
- Deterministic calibration passes (2 identical consecutive runs);
  dispersion, matching simulation, and sensitivity analysis all pass,
  with negligible calibration drift honestly reported and correctly
  left un-pasted (§9).
- Typecheck, full unit/integration tests (689/689), production build,
  and Playwright (300/300, after one legitimate, narrowly-scoped fixture
  fix) all pass (§9-10).
- Diff is limited to the documented promotion scope plus the one
  necessitated test-fixture fix (§11).

No candidate score or evidence was changed to improve any production
metric. The matching/calibration results are reported honestly, including
the negligible drift and the one pre-existing sampling artifact
(Octavia Butler's simulated #1 frequency), neither of which required or
received any correction to candidate data.

**Not committed. Not pushed. Not merged. Worktree not deleted. No other
promotion batch begun.**
