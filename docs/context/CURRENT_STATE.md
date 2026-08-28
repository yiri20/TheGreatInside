# Current state

**Authority for volatile facts below**: where a live tool/audit exists, it
is the source of truth, not this file's cached number. Re-run the tool if
the task depends on an exact current figure.

Last updated: 2026-08-27 (Portrait Reliability Localization Batch 2
merged to `main`, following the same-day Batch 1 / Portrait Sourcing
Batch 1 / Yayoi Kusama v2 / Editorial Achievements Correction Batch 1 /
Profile V2 / Hero redesign releases).

## Branches

| Branch | Status |
|---|---|
| `main` | **Production.** Deployed to `https://thegreatinside.com`. HEAD `ba3b1e8` — fast-forward merge of `fix/portrait-reliability-batch-2` (2026-08-27): localized the next 14 REMOTE WIKIMEDIA portraits by the audit's priority order — Benjamin Franklin and Yi Sun-sin (the 2 unrelated ORB failures a live burst-load caught after Batch 1), then the highest-exposure remaining remote portraits by #1-match frequency / Similar-People in-degree (Warren Buffett, Alan Turing, Rosalind Franklin, Nelson Mandela, Mahatma Gandhi, Srinivasa Ramanujan, Aung San Suu Kyi, Ada Lovelace, Marie Curie, Mustafa Kemal Atatürk), plus 2 weight-driven picks (Charles Darwin, 4.6MB — the largest remaining remote source; Ibn Sina, near-oversized). Unlike Batch 1, all 14 stored URLs were still current (verified via the MediaWiki API — same hash-path, identical dimensions); Franklin/Yi Sun-sin's failures were Wikimedia-side rate-limiting under load, not stale storage paths. No portrait selections or crops changed — delivery-path only, except two data-hygiene fixes surfaced by the same audit: Ibn Sina's attribution text ("modern bust, 1952") corrected to describe what Commons' own extmetadata says is actually shown (a painted/hand-tinted halftone portrait, not a photograph of a sculpture — same file/license/provenance, description only); Gandhi and Atatürk's empty `portrait.attribution` fields filled in from each file's Commons extmetadata. Localized under `public/portraits/` (1600px-longest-side + mozjpeg q85 for the 4 oversized sources; recompress-only for the other 9; Rosalind Franklin's bytes kept unchanged since recompression saved only 0.6%). Full pre-release gate passed on `fix/portrait-reliability-batch-2` before merge: `tsc --noEmit` clean, `vitest run` 662/662, `next build --webpack` clean, Playwright **281/281** at `--workers=1`. Live-verified in production post-deploy (hero + Directory, 1280px/390px, EN/KO, all 14): all 14 hero images serve from `/portraits/` (byte-identical to the commit, confirmed via HTTP HEAD), zero Wikimedia requests for the 14 at hero render time, correct attribution links, zero console errors, zero horizontal overflow. A live Directory burst-load (3 concurrent-fetch iterations over the page's 60 rendered portraits, plus a separate fetch burst over its 25 remaining remote-Wikimedia images) found zero HTTP-level failures this run — note this is an HTTP-status proxy for the ORB condition, not a byte-identical reproduction of Chrome's image-decode-time block, so it doesn't prove the remaining remote portraits are now immune, only that none failed in this particular burst. Portrait delivery split: **35 local / 25 remote-Wikimedia / 35 no-portrait**, coverage unchanged at 60/95. This stacks on Portrait Reliability Localization Batch 1 (commit `f48227b`, same day) and two earlier same-day releases (Portrait Sourcing Batch 1, `4a88cd6`; Yayoi Kusama Portrait v2, `cfbc21f`) — all four share the same add/replace-then-localize pattern. |
| `fix/portrait-reliability-batch-2`, `feat/portrait-sourcing-batch-1`, `fix/yayoi-kusama-portrait-v2` | Superseded/subsumed, cleanup candidates, not deleted. `fix/portrait-reliability-batch-2` is 0 commits ahead of `main` after the fast-forward merge above. The latter two's portrait-data commits were cherry-picked into their own `-integration` branches (already merged into the history above); stale/unrelated commits on the originals were intentionally dropped. |
| `feat/monetization-v1` | Deliberately isolated, **not merged**, no external payment infra activated. Do not read its docs unless the task is monetization. |
| `chore/consolidated-dev-2026-08`, `chore/context-architecture`, `chore/domain-migration`, `chore/self-made-audit-2026-08`, `fix/mobile-likert-wrap`, `fix/quiz-likert-endpoint-clarity`, `fix/yayoi-kusama-portrait`, `scale/roster-1000`, `feat/editorial-backfill-batch-1..6`, `feat/editorial-qa-pilot`, `feat/launch-readiness-95`, `feat/profile-editorial-depth`, `feat/directory-taxonomy-filter-ux`, `feat/landing-cta-hierarchy`, `feat/profile-hero-polish`, `feat/profile-v2-pilot-batch-1`, `feat/profile-v2-pilot-clean`, `feat/editorial-achievements-correction-batch-1`, `feat/portrait-sourcing-batch-1-integration`, `fix/yayoi-kusama-portrait-v2-integration`, `fix/portrait-reliability-batch-1` | Fully subsumed by `main` (0 unique commits each) — cleanup candidates, not deleted (no established convention to do so; deletion needs an explicit human decision, not made here). Branch new work from `main`. |

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
  unchanged by the subsequent Kusama v2 replacement and both Portrait
  Reliability Localization passes, all replacement/delivery-only).
  **Portrait Sourcing Batch 1** (2026-08) added Niels Bohr, C. V. Raman,
  Fyodor Dostoevsky, Louis Pasteur, and Ernest Shackleton; replaced
  Mozart's posthumous 1819 Krafft painting with the Lange 1782 life
  portrait. **Yayoi Kusama Portrait v2** (2026-08) replaced her prior
  extreme-close-up portrait with `File:20130918Yayoi_Kusama1_(cropped).jpg`.
  **Portrait Reliability Localization Batch 1** (2026-08) localized 14
  pre-existing portraits a roster-wide audit found reproducibly
  ORB-failing. **Batch 2** (2026-08, see branch table above) then
  localized the next 14 by the same audit's priority order — no
  selection changes, delivery-path only (plus two attribution-text
  data-hygiene fixes, Ibn Sina and Gandhi/Atatürk, described in the
  branch table). **Portrait delivery split: 35 local / 25
  remote-Wikimedia / 35 no-portrait** (Zheng He non-eligible, 34
  eligible). The remaining 25 remote-Wikimedia portraits carry the same
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
Batch 2 release (commit `ba3b1e8`): `tsc --noEmit` clean · `vitest run`
662/662 · `next build --webpack` clean · Playwright **281/281** at
`--workers=1` (the release gate for this batch). Live production check
of all 14 localized portraits (hero, 1280px + 390px, EN + KO): all 14
hero images serve from `/portraits/` and are byte-identical to the
commit (verified via HTTP HEAD content-length), zero Wikimedia requests
for the 14 at hero render time, correct attribution links, zero console
errors, zero horizontal overflow. A live Directory burst-load (3
concurrent-fetch iterations over 60 rendered portraits + a separate
burst over the page's 25 remaining remote-Wikimedia images) found zero
HTTP-level failures this run — an HTTP-status proxy for the ORB
condition, not a byte-identical reproduction of Chrome's image-decode-
time block, so absence of failures here doesn't prove the remaining 25
are now immune. Same baseline holds for the three immediately-prior
portrait releases (Batch 1, commit `f48227b`; Yayoi Kusama Portrait v2,
commit `cfbc21f`; Portrait Sourcing Batch 1, commit `4a88cd6`) — all
four share the `ERR_BLOCKED_BY_ORB` finding/fix described in the branch
table above (the remaining 25 remote-Wikimedia portraits are a known,
tracked, out-of-scope condition). Prior baseline (2026-08 Editorial
Achievements Correction Batch 1 / Profile V2 / Hero redesign, commit
`b7a30ec`): `editorialValidation.test.ts` 20/20, `i18n-audit.ts` zero
missing keys, matching simulation max #1 frequency 12.0% (Warren
Buffett) — unaffected by any portrait release, none of which touched
editorial or matching/scoring code. See
[`docs/context/TESTING.md`](TESTING.md) for what to run per change
type.

## Next product checkpoint

Post-release, no blocking work outstanding. Candidates for a future
session (none started here — out of scope for this release gate): a
trait-card click-to-explain affordance (needs a new lightweight
popover/dialog primitive plus attribute-description content — see
"Person Profile Hero redesign" above), the remaining 19 low-exposure
Tier-C editorial backfill people, the 35 remaining portrait-less
people, the remaining 25 remote-Wikimedia portraits still carrying the
same categorical `ERR_BLOCKED_BY_ORB` risk (35 of the original 60+7 are
now localized across four 2026-08-27 releases; a roster-wide audit
already ranked the rest by exposure/reliability signal if a future
session continues this work), and a human decision on deleting the
now-fully-subsumed dev branches listed above.
