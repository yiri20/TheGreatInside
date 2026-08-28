# Current state

**Authority for volatile facts below**: where a live tool/audit exists, it
is the source of truth, not this file's cached number. Re-run the tool if
the task depends on an exact current figure.

Last updated: 2026-08-28 (No-Portrait Fill Batch 1 merged to `main` —
9 of the 35 portrait-less people now have real portraits; **0
remote-Wikimedia portraits remain anywhere in the roster**).

## Branches

| Branch | Status |
|---|---|
| `main` | **Production.** Deployed to `https://thegreatinside.com`. HEAD `a1b9376` — fast-forward merge of `feat/no-portrait-fill-batch-1` (2026-08-28). No-Portrait Fill Batch 1 sourced and localized real portraits for 9 of the 35 previously portrait-less people — Simone Biles (Ocoudis, CC BY-SA 4.0), Serena Williams (Vinod Divakaran/Doha Stadium Plus Qatar, CC BY 2.0, cropped to remove a microphone), Steve Jobs (Matthew Yohe, CC BY-SA 3.0/GFDL), Malala Yousafzai (Simon Davis/DFID, CC BY 2.0 — a real photograph, not the Nasser Azam commissioned painting), Wole Soyinka (Frankie Fouganthin, CC BY-SA 4.0), Thomas Aquinas (Carlo Crivelli, 1476, National Gallery London, Public Domain — explicit non-lifetime/idealized-depiction caveat), Louis Armstrong (William P. Gottlieb, Library of Congress, Public Domain), Florence Nightingale (Henry Hering, c.1860, Public Domain via expired copyright, not an NPG-granted-reuse claim), and Toussaint Louverture (engraving after Marcus Rainsford/John Kay, 1805, Public Domain — explicit not-made-from-life caveat, kept as the full uncropped engraving after a strict visual review passed at hero desktop/mobile and PersonCard). All hosted locally under `public/portraits/` from the start (no remote-Wikimedia step), processed with sharp/mozjpeg (1600px-longest-side ceiling, quality 85, no upscale, no AI processing). **Coco Chanel deliberately held** — no adequate candidate clears both the resolution and reusable-rights bars (see the batch's sourcing research for the three candidates considered); still portrait-less pending a future human decision. Verified via a dedicated Chromium script (36/36 checks: all 9 people × EN/KO × 1280px/390px, zero broken images, zero console errors, zero overflow, zero Wikimedia network requests) both pre-merge and again live post-deploy, plus a precise `<img src>` check across **all 95 live person pages** confirming zero Wikimedia references anywhere in the roster. Full validation gate: `tsc` clean, `vitest` 662/662, `next build --webpack` clean, 72/72 relevant Playwright specs, full Playwright **281/281** at `--workers=1`. **Portrait delivery split: 69 local / 0 remote-Wikimedia / 26 no-portrait**, coverage 60/95 → 69/95. |
| `feat/no-portrait-fill-batch-1`, `fix/portrait-final-remote-replacement`, `fix/portrait-reliability-batch-4`, `fix/portrait-reliability-batch-3`, `fix/portrait-reliability-batch-2`, `feat/portrait-sourcing-batch-1`, `fix/yayoi-kusama-portrait-v2` | Superseded/subsumed, cleanup candidates, not deleted. All are 0 commits ahead of `main` after their respective fast-forward merges (the latter two's portrait-data commits were cherry-picked into their own `-integration` branches, already merged into the history above; stale/unrelated commits on the originals were intentionally dropped). |
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
- **Portrait coverage: 69/95** (55→60, Portrait Sourcing Batch 1;
  60→69, No-Portrait Fill Batch 1, 2026-08-28 — see branch table
  above for the 9 names and sources; every subsequent release between
  those two was replacement/delivery-only). **Portrait delivery: 69
  local / 0 remote-Wikimedia / 26 no-portrait** (Zheng He
  non-eligible, 25 eligible) — every portrait in the roster is
  self-hosted under `public/portraits/`, so the categorical
  `ERR_BLOCKED_BY_ORB` risk this whole program existed to fix no
  longer applies to any person page. Coco Chanel is the only person
  in the No-Portrait Fill Batch 1 target list still without a
  portrait (deliberately held, see branch table). Full batch-by-batch
  history lives in `git log` (each release's own commit message), not
  restated here.
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

Verified on `main` at the 2026-08-28 No-Portrait Fill Batch 1 release
(commit `a1b9376`): `tsc --noEmit` clean · `vitest run` 662/662 ·
`next build --webpack` clean · `peopleDirectory.spec.ts` +
`person.visual.spec.ts` 72/72 · Playwright **281/281** at
`--workers=1`. Live production check for all 9 newly-portraited people
(hero/PersonCard, 1280px + 390px, EN + KO): all 36 checks pass — serve
from `/portraits/`, correct attribution/license text, zero console
errors, zero horizontal overflow, zero Wikimedia network requests. A
precise `<img src>` check across all 95 live person pages (not just
the Directory's default-rendered subset) confirmed **zero** Wikimedia
image references anywhere in the roster. Prior baseline (2026-08 Editorial Achievements
Correction Batch 1 / Profile V2 / Hero redesign, commit `b7a30ec`):
`editorialValidation.test.ts` 20/20, `i18n-audit.ts` zero missing keys,
matching simulation max #1 frequency 12.0% (Warren Buffett) —
unaffected by any portrait release, none of which touched editorial or
matching/scoring code. See [`docs/context/TESTING.md`](TESTING.md) for
what to run per change type.

## Next product checkpoint

Post-release, no blocking work outstanding. Zero remote-Wikimedia
portrait dependency remains anywhere in the roster; the categorical
`ERR_BLOCKED_BY_ORB` risk the Portrait Reliability Localization program
existed to fix stays closed. Candidates for a future session (none
started here): a trait-card click-to-explain affordance (needs a new
lightweight popover/dialog primitive plus attribute-description content
— see "Person Profile Hero redesign" above); the remaining 19
low-exposure Tier-C editorial backfill people; a human decision on
Coco Chanel's held portrait (see branch table above) and the other 25
remaining portrait-less people; and a human decision on deleting the
now-fully-subsumed dev branches listed above.
