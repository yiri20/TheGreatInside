# Current state

**Authority for volatile facts below**: where a live tool/audit exists, it
is the source of truth, not this file's cached number. Re-run the tool if
the task depends on an exact current figure.

Last updated: 2026-08-22 (consolidated release merge to `main`).

## Branches

| Branch | Status |
|---|---|
| `main` | **Production.** Deployed to `https://thegreatinside.com`. HEAD `1d9004e` — fast-forward merge of `chore/consolidated-dev-2026-08` (2026-08-22 production release gate). Live-verified. |
| `feat/monetization-v1` | Deliberately isolated, **not merged**, no external payment infra activated. Do not read its docs unless the task is monetization. |
| `chore/consolidated-dev-2026-08`, `chore/context-architecture`, `chore/domain-migration`, `chore/self-made-audit-2026-08`, `fix/mobile-likert-wrap`, `scale/roster-1000`, `feat/editorial-backfill-batch-1..6`, `feat/editorial-qa-pilot`, `feat/launch-readiness-95`, `feat/profile-editorial-depth` | Fully subsumed by `main` (0 unique commits each, confirmed 2026-08-22) — cleanup candidates, not deleted (no established convention to do so; deletion needs an explicit human decision, not made here). Branch new work from `main`. |

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
  is now **exposure-priority selective**, not roster-order: Batch 7
  (2026-08) added the 10 highest quiz-simulation-exposure Tier-C people
  (Turing, Buffett, R. Franklin, Goodall, B. Franklin, Ramanujan, Oprah,
  Maathai, Mozart, Gandhi) — **76 of 95 people editorialized**, 19 Tier-C
  remain, all now low-exposure (highest single #1-match frequency ~2%).
  See [`docs/checkpoints/editorial.md`](../checkpoints/editorial.md).
- **`IdentityHero` missing-portrait fallback** (2026-08, `chore/consolidated-dev-2026-08`): the Results/Person/Compare hero used to
  render nothing at all for the portrait column when a person had no
  portrait — unlike `PersonCard`, which already showed initials. Fixed by
  reusing that same initials-on-sunken-surface treatment inside
  `IdentityHero` (`src/ui/components/layout.tsx`), scaled to each call
  site's `portraitWidth`.
- **Portrait coverage: 55/95** (was 42/95). Exposure-Priority Portrait
  Pass (2026-08, `chore/consolidated-dev-2026-08`) added 13 portraits
  (Gandhi, Atatürk, Julius Caesar, Ibn Sina, Toni Morrison, Wangari
  Maathai, Aung San Suu Kyi, Oprah Winfrey, Maimonides, Averroes, Yi
  Sun-sin, Hayao Miyazaki, Yayoi Kusama), selected by deterministic
  exposure signals (#1-match frequency, Similar-People in-degree,
  Opposite selection, editorial status) rather than raw coverage —
  targeted portrait-less people are the highest-exposure ones. Result:
  Top-20 Similar-in-degree coverage 11→20/20, Top-20 #1-match coverage
  13→16/20, portrait-less share of Similar-rail exposure mass 48.2%→16.5%,
  of #1-match mass 33.6%→19.8%. All sourced from Wikimedia
  Commons/PD/CC-compatible licenses only (several historical figures
  deliberately skipped — Akira Kurosawa, Akio Morita — over unresolved
  US-copyright/URAA ambiguity on the only candidate images found; Yi
  Sun-sin, Ibn Sina, Maimonides, Averroes use later depictions with an
  explicit not-a-lifetime-likeness caveat in `portrait.attribution`, the
  existing caption mechanism). `e2e/person.visual.spec.ts`'s no-portrait
  fixture moved from yi-sun-sin (now has a portrait) to socrates.
  Remaining portrait-less: 40 (Zheng He non-eligible, 39 eligible, all
  now lower-exposure than this batch's floor).
- **Custom domain**: `https://thegreatinside.com` is the canonical
  production origin (migrated from `the-great-inside.vercel.app`, which
  now permanently redirects). `www` also redirects to the apex.
- **Monetization**: "Deep Inside" (one-time paid feature) implemented on
  `feat/monetization-v1`, intentionally unmerged, no live payment infra.
- **Self-made/earned-distinction philosophy audit (2026-08)**: all 95
  people classified against `inclusion_v1`'s counterfactual test — 69
  Strong Self-Made Fit, 26 Earned but Advantaged, 0 Weak Fit. No roster
  change resulted. Full record + proposed future-candidate gate:
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

Verified on `main` at the 2026-08-22 production release gate (commit
`1d9004e`): `tsc --noEmit` clean · `vitest run` 638/638 · `next build
--webpack` clean, 190 localized person pages, static/dynamic split
unchanged · Playwright 248/248 (`--workers=2`, sandbox-friendly) ·
editorial validation 0 issues · `ko-KR` i18n coverage 100.00% · matching
simulation max #1 frequency 12.0% (Warren Buffett, unchanged) · live
production smoke test (canonical/hreflang/redirects/robots/sitemap,
EN/KO, mobile Likert, portrait + initials-fallback rendering) all clean,
zero console errors. See [`docs/context/TESTING.md`](TESTING.md) for
what to run per change type.

## Next product checkpoint

Post-release, no blocking work outstanding. Candidates for a future
session (none started here — out of scope for this release gate): the
remaining 19 low-exposure Tier-C editorial backfill people, the 40
remaining portrait-less people (all below this release's exposure
floor), and a human decision on deleting the now-fully-subsumed dev
branches listed above.
