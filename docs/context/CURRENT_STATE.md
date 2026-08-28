# Current state

**Authority for volatile facts below**: where a live tool/audit exists, it
is the source of truth, not this file's cached number. Re-run the tool if
the task depends on an exact current figure.

Last updated: 2026-08-27 (Portrait Reliability Localization Batch 4
merged to `main` — the final reliability batch; only Averroes and
B. R. Ambedkar remain remote, held for a separate replacement-research
task, not a reliability one).

## Branches

| Branch | Status |
|---|---|
| `main` | **Production.** Deployed to `https://thegreatinside.com`. HEAD `b46df75` — fast-forward merge of `fix/portrait-reliability-batch-4` (2026-08-27): localizes the final 8 REMOTE WIKIMEDIA portraits a dedicated triage approved as-is (Confucius, Isaac Newton, Emmy Noether, Elizabeth Blackwell, Ludwig Wittgenstein, Nicolaus Copernicus, Wu Zetian, Julius Caesar), explicitly holding back **Averroes** (awkward fresco crop — a tighter existing crop of the same artwork likely exists) and **B. R. Ambedkar** (degraded scan + loose composition on a well-documented 20th-century figure — a cleaner photo likely exists) for future replacement research, not reliability work. All 8 resolved to the same hash-path already recorded (MediaWiki API + sha1-verified) — no stale paths, no substitutions, no metadata corrections needed (already verified accurate in the triage). Localized under `public/portraits/` (1600px-longest-side + mozjpeg q85 for the 3 oversized sources — Isaac Newton, Julius Caesar, plus Emmy Noether's disproportionately-heavy file; recompress-only for the other 5; Confucius and Ludwig Wittgenstein kept original bytes since recompression saved under 5%; Elizabeth Blackwell's 288×405 explicitly not upscaled) — aggregate ~2.03MB→~716KB (~65% smaller). Historical-depiction caveats (Confucius/Wu Zetian "idealized, not a lifetime likeness"; Julius Caesar's Tusculum-portrait context) verified preserved verbatim. Human review approved via 6 Playwright/Chromium screenshots (Isaac Newton/Elizabeth Blackwell/Wu Zetian/Julius Caesar at 1280px, Elizabeth Blackwell/Wu Zetian at 390px) showing no compression artifacts, no awkward crop, caveats rendering, zero overflow. Full pre-release gate: `tsc --noEmit` clean, `vitest run` 662/662, `next build --webpack` clean, 72/72 relevant Person/Directory Playwright specs, Playwright **281/281** at `--workers=1`. Live-verified in production post-deploy (hero + Directory, 1280px/390px, EN/KO, all 8): all 8 hero images serve from `/portraits/` (byte-identical via HTTP HEAD), zero Wikimedia requests for the 8, correct attribution links to original Commons pages, zero console errors, zero horizontal overflow. A live Directory burst-load (3 iterations, 60 rendered portraits) found zero failures, confirming exactly 2 remote URLs remain — Averroes and B. R. Ambedkar, matching the release's exact requirement. Portrait delivery split: **58 local / 2 remote-Wikimedia / 35 no-portrait**, coverage unchanged at 60/95. This stacks on Batch 3 (`9777d8c`), Batch 2 (`ba3b1e8`), Batch 1 (`f48227b`), Portrait Sourcing Batch 1 (`4a88cd6`), and Yayoi Kusama Portrait v2 (`cfbc21f`) — the same add/replace-then-localize pattern throughout. Two small unrelated fixes landed on `main` between Batch 2 and Batch 3 (Malcolm X Korean-spelling correction, `bbe472d`; Landing CTA arrow-spacing polish, `7f3c446`) — see archive/prior commits for detail, not restated here. |
| `fix/portrait-reliability-batch-4`, `fix/portrait-reliability-batch-3`, `fix/portrait-reliability-batch-2`, `feat/portrait-sourcing-batch-1`, `fix/yayoi-kusama-portrait-v2` | Superseded/subsumed, cleanup candidates, not deleted. The first three are 0 commits ahead of `main` after their respective fast-forward merges. The latter two's portrait-data commits were cherry-picked into their own `-integration` branches (already merged into the history above); stale/unrelated commits on the originals were intentionally dropped. |
| `feat/monetization-v1` | Deliberately isolated, **not merged**, no external payment infra activated. Do not read its docs unless the task is monetization. |
| `chore/consolidated-dev-2026-08`, `chore/context-architecture`, `chore/domain-migration`, `chore/self-made-audit-2026-08`, `fix/mobile-likert-wrap`, `fix/quiz-likert-endpoint-clarity`, `fix/yayoi-kusama-portrait`, `scale/roster-1000`, `feat/editorial-backfill-batch-1..6`, `feat/editorial-qa-pilot`, `feat/launch-readiness-95`, `feat/profile-editorial-depth`, `feat/directory-taxonomy-filter-ux`, `feat/landing-cta-hierarchy`, `feat/profile-hero-polish`, `feat/profile-v2-pilot-batch-1`, `feat/profile-v2-pilot-clean`, `feat/editorial-achievements-correction-batch-1`, `feat/portrait-sourcing-batch-1-integration`, `fix/yayoi-kusama-portrait-v2-integration`, `fix/portrait-reliability-batch-1`, `fix/malcolm-x-ko-name-spelling`, `fix/landing-cta-arrow-spacing` | Fully subsumed by `main` (0 unique commits each) — cleanup candidates, not deleted (no established convention to do so; deletion needs an explicit human decision, not made here). Branch new work from `main`. |

## Product

- **Roster: 95 people, 94 match-eligible.** Zheng He is the sole
  non-match-eligible exception (browsable, fails only the coverage gate).
  Authority: `evaluateMatchEligibility()` in `src/core/matching/similarity.ts`;
  re-run `corepack pnpm@10 exec tsx src/dev/simulate.ts 10000 quiz` for a
  live health check.
- **Eligibility rule: `eligibility_v2`** (`scored>=18`, `coverage>=0.6`,
  high-confidence-subset `count>=12`/`avgConf>=0.55`). See
  [`docs/reference/matching.md`](../reference/matching.md).
- **Matching health**: max #1 match frequency ~12.0% (Warren Buffett),
  well under the 20%-at-n≥30 threshold. Stable across roster growth.
- **Editorial content** (achievements/moments/turning points on person
  pages): Tier A (8/8) and Tier B (52/52) fully covered. Tier C backfill
  is **exposure-priority selective**, not roster-order — **76 of 95
  people editorialized**, 19 Tier-C remain, all low-exposure. **Key
  Achievements Correction Batch 1** (2026-08) then re-audited and fixed
  Achievement-section semantic placement/evidence for 10 of those 76
  (see the `main` branch-table row above for the name list), plus a
  same-batch Atatürk source-provenance fix — 382→409 total editorial
  items, 100% Korean coverage maintained throughout. See
  [`docs/checkpoints/editorial.md`](../checkpoints/editorial.md).
- **Profile V2 pilot** (`lifeArc`/`complexities`/`legacy` fields on
  `PersonEditorial`, 2026-08): piloted on 6 people (Warren Buffett,
  Rosalind Franklin, Aung San Suu Kyi, Alan Turing, Benjamin Franklin,
  Wolfgang Amadeus Mozart) with a strict follow-up evidence-closure
  re-verification pass. Most of the roster has none of these three
  fields yet — that's expected, not a gap; `achievements`/`moments`/
  `turningPoints` alone is still a complete profile.
- **Person Profile Hero redesign + mobile Trait Constellation
  progressive disclosure** (2026-08): the hero moved from a fragmented
  3-column `Rail(hero, Known For)` composition to one coherent
  `IdentityHero` (portrait | identity info, Known For now living inside
  the identity column), with a compact one-line-clamped portrait credit
  and a left-aligned back-nav link. Below 640px, Trait Constellation now
  shows only the strongest 4 trait cards by default (already
  distinctiveness-ordered, no re-ranking) behind a quiet "Show all
  traits" / "모든 특성 보기" toggle — desktop/tablet grid unchanged. A
  trait-card click-to-explain affordance was evaluated and deliberately
  deferred (no existing popover/dialog primitive to reuse, no
  attribute-description content yet) — recommended as a future task.
  `IdentityHero`'s missing-portrait initials fallback
  (`src/ui/components/layout.tsx`) predates this redesign (2026-08,
  `chore/consolidated-dev-2026-08`) and is unchanged by it.
- **Portrait coverage: 60/95** (55→60, Portrait Sourcing Batch 1;
  unchanged by the subsequent Kusama v2 replacement and all four
  Portrait Reliability Localization passes, all replacement/
  delivery-only). **Portrait Sourcing Batch 1** (2026-08) added Niels
  Bohr, C. V. Raman, Fyodor Dostoevsky, Louis Pasteur, and Ernest
  Shackleton; replaced Mozart's posthumous 1819 Krafft painting with
  the Lange 1782 life portrait. **Yayoi Kusama Portrait v2** (2026-08)
  replaced her prior extreme-close-up portrait with
  `File:20130918Yayoi_Kusama1_(cropped).jpg`. **Portrait Reliability
  Localization** ran four batches (2026-08): Batch 1 localized 14
  ORB-failing portraits; Batch 2 the next 14 (plus Ibn Sina/Gandhi/
  Atatürk attribution fixes); Batch 3 the next 15 (pure exposure/
  in-degree/weight selection, a fresh reliability check found no new
  failures); **Batch 4** (see branch table above) then closed out the
  reliability program with the final 8 a dedicated triage approved
  as-is, deliberately holding back **Averroes** (crop problem — a
  tighter existing crop of the same fresco likely exists) and
  **B. R. Ambedkar** (degraded scan + loose composition on a
  well-documented figure — a cleaner alternative likely exists) as a
  **separate replacement-research task**, distinct from reliability
  work. **Portrait delivery split: 58 local / 2 remote-Wikimedia / 35
  no-portrait** (Zheng He non-eligible, 34 eligible). The reliability
  program is now complete — the 2 remaining remote portraits are a
  quality decision, not a delivery-reliability gap.
  Exposure-Priority Portrait Pass (2026-08, `chore/consolidated-dev-2026-08`)
  added 13 portraits (Gandhi, Atatürk, Julius Caesar, Ibn Sina, Toni
  Morrison, Wangari Maathai, Aung San Suu Kyi, Oprah Winfrey, Maimonides,
  Averroes, Yi Sun-sin, Hayao Miyazaki, Yayoi Kusama), selected by
  deterministic exposure signals (#1-match frequency, Similar-People
  in-degree, Opposite selection, editorial status) rather than raw
  coverage. Result: Top-20 Similar-in-degree coverage 11→20/20, Top-20
  #1-match coverage 13→16/20, portrait-less share of Similar-rail
  exposure mass 48.2%→16.5%, of #1-match mass 33.6%→19.8%. All sourced
  from Wikimedia Commons/PD/CC-compatible licenses only (Akira Kurosawa,
  Akio Morita deliberately skipped over unresolved US-copyright/URAA
  ambiguity; Yi Sun-sin, Ibn Sina, Maimonides, Averroes use later
  depictions with an explicit not-a-lifetime-likeness caveat in
  `portrait.attribution`). `e2e/person.visual.spec.ts`'s no-portrait
  fixture: socrates.
- **Custom domain**: `https://thegreatinside.com` is the canonical
  production origin (migrated from `the-great-inside.vercel.app`, which
  now permanently redirects). `www` also redirects to the apex.
- **Monetization**: "Deep Inside" (one-time paid feature) implemented on
  `feat/monetization-v1`, intentionally unmerged, no live payment infra.
- **Quiz Likert endpoint-clarity hotfix (2026-08)**: the 1-7 scale's two
  endpoint descriptions now sit together in one row beneath the
  unchanged 1-7 options row at every viewport, instead of splitting
  awkwardly into a column below 640px. Presentation only —
  `src/ui/components/quiz.tsx`'s `LikertScale`.
- **Directory taxonomy + progressive disclosure** (`directory_taxonomy_v1`,
  2026-08): the People Directory's filter UI is two collapsed-by-default
  axes — Profession/Activity and the 34-attribute/7-facet Personality/
  Trait taxonomy — replacing the old flat `tagIds` checklist. See
  [`docs/reference/directory-taxonomy.md`](../reference/directory-taxonomy.md).
- **Self-made/earned-distinction philosophy audit (2026-08)**: all 95
  people classified against `inclusion_v1`'s counterfactual test — 69
  Strong Self-Made Fit, 26 Earned but Advantaged, 0 Weak Fit. No roster
  change. Full record:
  [`docs/checkpoints/self-made-earned-distinction-audit-2026-08.md`](../checkpoints/self-made-earned-distinction-audit-2026-08.md).

## Completed major phases (durable summary — do not re-read the archive for these)

- Phases 0–8: architecture, design system, dataset to 35→95 people, quiz
  v1→v2 (64 items, `taxonomy_v1.1`), matching hardening (`matching_v2`),
  quiz/results UI, target comparison + development content, full `ko-KR`
  localization. All closed, human-approved.
- Phase 9: Supabase accounts (Auth + Postgres), sign-in/out, historical
  result-snapshot fidelity (`ResultSnapshotV1`), account history. Closed.
- Phase 10: production deployment, wide-desktop editorial visual layout
  (Landing/Person/Results/Saved-Result/Compare), SEO/locale foundation,
  sharing/OG images, custom domain migration, legal pages (Privacy/Terms),
  "Delete all saved results." Closed, launched.
- Roster-1000 program (19 sessions): grew roster 35→95, built and froze
  `Roster Research & Scoring Protocol v1`, implemented `eligibility_v2`.
  See [`docs/checkpoints/roster.md`](../checkpoints/roster.md) for the
  current protocol summary.
- Editorial narrative content (`editorial_v1`): pilot + 6 backfill
  batches, Tier A/B complete. See
  [`docs/checkpoints/editorial.md`](../checkpoints/editorial.md).

Full historical detail for any of the above: `docs/archive/` — read only
to resolve a specific historical question, not by default.

## Test baseline (last known-good, re-verify before trusting)

Verified on `main` at the 2026-08-27 Portrait Reliability Localization
Batch 4 release (commit `b46df75`, the final reliability batch):
`tsc --noEmit` clean · `vitest run` 662/662 · `next build --webpack`
clean · `peopleDirectory.spec.ts` + `person.visual.spec.ts` 72/72 ·
Playwright **281/281** at `--workers=1`. Human review approved via 6
Playwright/Chromium screenshots (Isaac Newton/Elizabeth Blackwell/
Wu Zetian/Julius Caesar at 1280px, Elizabeth Blackwell/Wu Zetian at
390px) before merge — no compression artifacts, no awkward crop,
caveats rendering correctly, zero overflow. Live production check of
all 8 localized portraits (hero, 1280px + 390px, EN + KO): all 8 serve
from `/portraits/` and are byte-identical to the commit (HTTP HEAD),
zero Wikimedia requests for the 8, correct attribution links to
original Commons pages, zero console errors, zero horizontal overflow.
A live Directory burst-load (3 iterations, 60 rendered portraits) found
zero failures and confirmed exactly 2 remote URLs remain — Averroes and
B. R. Ambedkar, matching the exact expected set. Same baseline holds
for Batch 3 (`9777d8c`), Batch 2 (`ba3b1e8`), Batch 1 (`f48227b`),
Yayoi Kusama Portrait v2 (`cfbc21f`), and Portrait Sourcing Batch 1
(`4a88cd6`) — all five share the same reliability-localization pattern.
Prior baseline (2026-08 Editorial Achievements Correction Batch 1 /
Profile V2 / Hero redesign, commit `b7a30ec`): `editorialValidation
.test.ts` 20/20, `i18n-audit.ts` zero missing keys, matching simulation
max #1 frequency 12.0% (Warren Buffett) — unaffected by any portrait
release, none of which touched editorial or matching/scoring code. See
[`docs/context/TESTING.md`](TESTING.md) for what to run per change
type.

## Next product checkpoint

Post-release, no blocking work outstanding. The Portrait Reliability
Localization program (Batches 1–4) is now **complete** — every
remaining remote-Wikimedia portrait has been individually triaged, and
the only two left (Averroes, B. R. Ambedkar) are a deliberate quality
hold, not a reliability gap. Candidates for a future session (none
started here — out of scope for this release gate): the
replacement-research task for Averroes (find a tighter existing crop
of the same Andrea di Bonaiuto fresco) and B. R. Ambedkar (find a
cleaner scan of the same 1922 photo or a comparably iconic
alternative) — a small, separate task from reliability localization; a
trait-card click-to-explain affordance (needs a new lightweight
popover/dialog primitive plus attribute-description content — see
"Person Profile Hero redesign" above); the remaining 19 low-exposure
Tier-C editorial backfill people; the 35 remaining portrait-less
people; and a human decision on deleting the now-fully-subsumed dev
branches listed above. This file has grown past its ~150-line soft
budget across the four portrait-batch updates — worth a consolidation
pass into `docs/checkpoints/` at some point, per CLAUDE.md's
maintenance rule, though not done in this release turn.
