# Current state

**Authority for volatile facts below**: where a live tool/audit exists, it
is the source of truth, not this file's cached number. Re-run the tool if
the task depends on an exact current figure.

Last updated: 2026-08 (end of `feat/editorial-backfill-batch-6`).

## Branches

| Branch | Status |
|---|---|
| `main` | Production. Deployed to `https://thegreatinside.com`. Last merge: "Record 95-person production release." |
| `feat/editorial-backfill-batch-6` | Current editorial lineage tip — Tier A + Tier B editorial content complete. Not yet merged to `main`. |
| `scale/roster-1000` | Fully subsumed by `main` (0 unique commits) — not deleted, no established convention to do so. |
| `feat/monetization-v1` | Deliberately isolated, **not merged**, no external payment infra activated. Do not read its docs unless the task is monetization. |
| `chore/context-architecture` | This branch — documentation/context restructuring only. Do not merge to `main` from this session. |

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
  pages): Tier A (8/8) and Tier B (52/52) fully covered — **66 of 95
  people editorialized**. Tier C (35 people — the original `seed.ts` +
  `roster2.ts` roster) is **deliberately not started**, pending a product
  decision on whether A+B coverage is already sufficient. See
  [`docs/checkpoints/editorial.md`](../checkpoints/editorial.md).
- **Custom domain**: `https://thegreatinside.com` is the canonical
  production origin (migrated from `the-great-inside.vercel.app`, which
  now permanently redirects). `www` also redirects to the apex.
- **Monetization**: "Deep Inside" (one-time paid feature) implemented on
  `feat/monetization-v1`, intentionally unmerged, no live payment infra.

## Known standing blocker (not yet fixed, blocks merge to `main`)

**Mobile quiz answer-choice layout**: a real external user reported
awkward forced wrapping / poor responsive proportions in the English
mobile questionnaire's answer-choice layout. Reconfirmed still open
across roster-1000 sessions 12–19. **Must be fixed and verified before
any merge to `main`, regardless of roster headcount or editorial
coverage.** Not investigated this session (out of scope for context
architecture work).

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

`tsc --noEmit` clean · `vitest run` ~621/621 (pre-batch-6 baseline; batch
6 added source-reference-integrity tests, so current count is slightly
higher — run `pnpm test` for the authoritative number) · `next build
--webpack` clean, static/dynamic split unchanged · Playwright ~230/230.
See [`docs/context/TESTING.md`](TESTING.md) for what to run per change type.
