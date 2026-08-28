# Current state

**Authority for volatile facts below**: where a live tool/audit exists, it
is the source of truth, not this file's cached number. Re-run the tool if
the task depends on an exact current figure.

Last updated: 2026-08-27 (Portrait Reliability Localization Batch 3
merged to `main`, following the same-day Malcolm X Korean-spelling fix,
Landing CTA arrow-spacing fix, Batch 1/Batch 2 / Portrait Sourcing
Batch 1 / Yayoi Kusama v2 / Editorial Achievements Correction Batch 1 /
Profile V2 / Hero redesign releases).

## Branches

| Branch | Status |
|---|---|
| `main` | **Production.** Deployed to `https://thegreatinside.com`. HEAD `9777d8c` — fast-forward merge of `fix/portrait-reliability-batch-3` (2026-08-27): localized the next 15 REMOTE WIKIMEDIA portraits. A fresh production reliability burst-load on all 25 then-remaining remote portraits found **zero fresh ORB/HTTP failures** (Batch 2 had already caught and fixed the two unrelated failures a prior burst found), so this batch's selection ran entirely on the next-priority signals: combined #1-match exposure / Similar-People in-degree (Maimonides, Leonardo da Vinci, Aristotle, Katherine Johnson, Jane Goodall, Oprah Winfrey, Albert Einstein, Wangari Maathai, Richard Feynman, Nikola Tesla, Frida Kahlo, Toni Morrison, Hayao Miyazaki), plus 2 weight-driven picks (Harriet Tubman, 3.72MB — the single largest remaining remote source; Sequoyah, 2.88MB — second-largest). All 15 stored URLs resolved to the same hash-path already recorded (MediaWiki API-verified, sha1-verified downloads) — no stale paths, no substitutions. License/attribution cross-checked against each file's Commons extmetadata: all 15 already accurate, **no metadata corrections needed this batch** (unlike Batch 2's Ibn Sina/Gandhi/Atatürk fixes). Localized under `public/portraits/` (1600px-longest-side + mozjpeg q85 for the 8 oversized sources; recompress-only for the other 7; Leonardo da Vinci and Jane Goodall kept their original bytes since recompression saved under 5%) — aggregate ~15.45MB→~2.02MB (~87% smaller). Human review approved via 4 representative Playwright/Chromium screenshots (Katherine Johnson, Harriet Tubman, Aristotle, Maimonides — the highest compression ratios / known depiction-quality caveats) showing no visible compression/crop regression before merge. Full pre-release gate passed on `fix/portrait-reliability-batch-3` before merge: `tsc --noEmit` clean, `vitest run` 662/662, `next build --webpack` clean, Playwright **281/281** at `--workers=1`. Live-verified in production post-deploy (hero + Directory, 1280px/390px, EN/KO, all 15): all 15 hero images serve from `/portraits/` (byte-identical to the commit, confirmed via HTTP HEAD), zero Wikimedia requests for the 15 at hero render time, zero console errors, zero horizontal overflow. A live Directory burst-load (3 concurrent-fetch iterations over the page's 60 rendered portraits) found zero HTTP-level failures this run, 10 remote-Wikimedia images remaining on that page as expected — the same HTTP-status-proxy caveat as prior batches applies (not a byte-identical reproduction of Chrome's image-decode-time ORB block). Portrait delivery split: **50 local / 10 remote-Wikimedia / 35 no-portrait**, coverage unchanged at 60/95. This stacks on Portrait Reliability Localization Batch 2 (commit `ba3b1e8`) and Batch 1 (`f48227b`, both same day) and two earlier same-day releases (Portrait Sourcing Batch 1, `4a88cd6`; Yayoi Kusama Portrait v2, `cfbc21f`) — all five share the same add/replace-then-localize pattern. Two small unrelated fixes landed on `main` between Batch 2 and Batch 3: a Malcolm X Korean-spelling correction (commit `bbe472d`, `person.name.malcolm-x` in `ko.ts`, presentation-only) and a Landing secondary CTA arrow-spacing polish (commit `7f3c446`, `app/[locale]/page.tsx` + `components.css` — label and arrow now wrap together as one inline unit instead of two independent flex items; 23/23 `landing.visual.spec.ts` passed). |
| `fix/portrait-reliability-batch-3`, `fix/portrait-reliability-batch-2`, `feat/portrait-sourcing-batch-1`, `fix/yayoi-kusama-portrait-v2` | Superseded/subsumed, cleanup candidates, not deleted. The first two are 0 commits ahead of `main` after their respective fast-forward merges. The latter two's portrait-data commits were cherry-picked into their own `-integration` branches (already merged into the history above); stale/unrelated commits on the originals were intentionally dropped. |
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
  unchanged by the subsequent Kusama v2 replacement and all three
  Portrait Reliability Localization passes, all replacement/
  delivery-only). **Portrait Sourcing Batch 1** (2026-08) added Niels
  Bohr, C. V. Raman, Fyodor Dostoevsky, Louis Pasteur, and Ernest
  Shackleton; replaced Mozart's posthumous 1819 Krafft painting with
  the Lange 1782 life portrait. **Yayoi Kusama Portrait v2** (2026-08)
  replaced her prior extreme-close-up portrait with
  `File:20130918Yayoi_Kusama1_(cropped).jpg`. **Portrait Reliability
  Localization Batch 1** (2026-08) localized 14 pre-existing portraits
  a roster-wide audit found reproducibly ORB-failing. **Batch 2**
  (2026-08) localized the next 14 by the same audit's priority order
  (plus two attribution-text data-hygiene fixes, Ibn Sina and
  Gandhi/Atatürk). **Batch 3** (2026-08, see branch table above) then
  localized 15 more — a fresh reliability check found no new failures,
  so selection ran purely on exposure/in-degree/weight signals, with no
  metadata corrections needed. **Portrait delivery split: 50 local / 10
  remote-Wikimedia / 35 no-portrait** (Zheng He non-eligible, 34
  eligible). The remaining 10 remote-Wikimedia portraits carry the same
  categorical `ERR_BLOCKED_BY_ORB` risk (Wikimedia storage-path/rate-
  limit fragility) but haven't been individually localized yet — see
  the audit artifact referenced in the branch-table entries above for
  the full roster-wide reliability table and prioritization if a future
  session picks this up again.
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
Batch 3 release (commit `9777d8c`): `tsc --noEmit` clean · `vitest run`
662/662 · `next build --webpack` clean · Playwright **281/281** at
`--workers=1` (the release gate for this batch). Human review approved
via 4 representative Playwright/Chromium screenshots (Katherine
Johnson, Harriet Tubman, Aristotle, Maimonides — highest compression
ratios / known depiction-quality caveats) before merge, showing no
visible compression/crop regression. Live production check of all 15
localized portraits (hero, 1280px + 390px, EN + KO): all 15 hero images
serve from `/portraits/` and are byte-identical to the commit (verified
via HTTP HEAD content-length), zero Wikimedia requests for the 15 at
hero render time, zero console errors, zero horizontal overflow. A live
Directory burst-load (3 concurrent-fetch iterations over the page's 60
rendered portraits) found zero HTTP-level failures this run, 10
remote-Wikimedia images remaining on that page as expected — the same
HTTP-status-proxy caveat as prior batches applies (not a byte-identical
reproduction of Chrome's image-decode-time ORB block, so absence of
failures here doesn't prove the remaining 10 are now immune). Same
baseline holds for Batch 2 (commit `ba3b1e8`), Batch 1 (`f48227b`),
Yayoi Kusama Portrait v2 (`cfbc21f`), and Portrait Sourcing Batch 1
(`4a88cd6`) — all five share the `ERR_BLOCKED_BY_ORB` finding/fix
described in the branch table above (the remaining 10 remote-Wikimedia
portraits are a known, tracked, out-of-scope condition). The two
small unrelated fixes between Batch 2 and Batch 3 (Malcolm X Korean
spelling, `bbe472d`; Landing CTA arrow-spacing, `7f3c446`) each carried
their own narrow test evidence (full `vitest`/`tsc`/build for the
former; `tsc` + `vitest` + build + `landing.visual.spec.ts` 23/23 for
the latter) rather than a full portrait-release gate, since neither
touched portrait code. Prior baseline (2026-08 Editorial Achievements
Correction Batch 1 / Profile V2 / Hero redesign, commit `b7a30ec`):
`editorialValidation.test.ts` 20/20, `i18n-audit.ts` zero missing keys,
matching simulation max #1 frequency 12.0% (Warren Buffett) —
unaffected by any portrait release, none of which touched editorial or
matching/scoring code. See [`docs/context/TESTING.md`](TESTING.md) for
what to run per change type.

## Next product checkpoint

Post-release, no blocking work outstanding. Candidates for a future
session (none started here — out of scope for this release gate): a
trait-card click-to-explain affordance (needs a new lightweight
popover/dialog primitive plus attribute-description content — see
"Person Profile Hero redesign" above), the remaining 19 low-exposure
Tier-C editorial backfill people, the 35 remaining portrait-less
people, the remaining 10 remote-Wikimedia portraits still carrying the
same categorical `ERR_BLOCKED_BY_ORB` risk (50 of the original 60+7 are
now localized across five 2026-08-27 releases; a roster-wide audit
already ranked the rest by exposure/reliability signal if a future
session continues this work — a "Batch 4" would be a small final
mop-up of the last 10), and a human decision on deleting the
now-fully-subsumed dev branches listed above.
