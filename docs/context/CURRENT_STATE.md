# Current state

**Authority for volatile facts below**: where a live tool/audit exists, it
is the source of truth, not this file's cached number. Re-run the tool if
the task depends on an exact current figure.

Last updated: 2026-08-27 (Editorial Achievements Correction Batch 1 +
Profile V2 pilot + Person Profile Hero redesign + mobile Trait
Constellation progressive disclosure merged to `main`).

## Branches

| Branch | Status |
|---|---|
| `main` | **Production.** Deployed to `https://thegreatinside.com`. HEAD `b7a30ec` — fast-forward merge of `feat/editorial-achievements-correction-batch-1` (2026-08-27), 9 commits: back-nav left-align; Person Profile Hero redesign (2-column portrait+identity composition, Known For moved inside the identity column, compact one-line-clamped portrait credit); Profile V2 pilot (Life Arc/Complexities/Legacy) on 6 people with a strict evidence-closure re-verification pass; Key Achievements Correction Batch 1 — evidence-verified rewrite/reclassification for 10 people (Jane Goodall, Mahatma Gandhi, Benjamin Franklin, Srinivasa Ramanujan, Louis Armstrong, Louis Pasteur, Oprah Winfrey, Wangari Maathai, Julius Caesar, Mustafa Kemal Atatürk); a same-day release-blocker fix for an Atatürk source/provenance error found in that batch; mobile-only Trait Constellation progressive disclosure (strongest 4 by default, quiet expand/collapse, desktop unchanged); and a full e2e reconciliation pass (Playwright 281/281, zero unexplained failures). Live-verified in production (Landing EN/KO, full quiz run to Results, People Directory, 5 named person profiles + one representative, mobile 390px, trait progressive disclosure, all editorial section types, zero console errors, zero horizontal overflow, EN+KO). Portraits untouched this release — see the two branches below. |
| `feat/portrait-sourcing-batch-1`, `fix/yayoi-kusama-portrait-v2` | Deliberately **not merged** this release — portrait work is scoped separately. |
| `feat/monetization-v1` | Deliberately isolated, **not merged**, no external payment infra activated. Do not read its docs unless the task is monetization. |
| `chore/consolidated-dev-2026-08`, `chore/context-architecture`, `chore/domain-migration`, `chore/self-made-audit-2026-08`, `fix/mobile-likert-wrap`, `fix/quiz-likert-endpoint-clarity`, `fix/yayoi-kusama-portrait`, `scale/roster-1000`, `feat/editorial-backfill-batch-1..6`, `feat/editorial-qa-pilot`, `feat/launch-readiness-95`, `feat/profile-editorial-depth`, `feat/directory-taxonomy-filter-ux`, `feat/landing-cta-hierarchy`, `feat/profile-hero-polish`, `feat/profile-v2-pilot-batch-1`, `feat/profile-v2-pilot-clean`, `feat/editorial-achievements-correction-batch-1` | Fully subsumed by `main` (0 unique commits each) — cleanup candidates, not deleted (no established convention to do so; deletion needs an explicit human decision, not made here). Branch new work from `main`. |

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
- **Portrait coverage: 55/95** (was 42/95, unchanged this release —
  portraits deliberately untouched, see the branch table above).
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
  fixture: socrates. Remaining portrait-less: 40 (Zheng He non-eligible,
  39 eligible, all below this pass's exposure floor).
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

Verified on `main` at the 2026-08-27 Editorial Achievements Correction
Batch 1 / Profile V2 / Hero redesign release (commit `b7a30ec`):
`tsc --noEmit` clean · `vitest run` 662/662 · `next build --webpack`
clean · `editorialValidation.test.ts` 20/20 · `i18n-audit.ts` zero
missing keys in any bucket · Playwright **281/281** at the stable
`--workers=1` configuration, confirmed stable across two consecutive
full runs (a same-release test-hardening pass replaced a
`getComputedStyle`-immediately-after-click read in one Likert test with
`expect.poll`, since it raced the browser's paint pipeline under
sustained full-suite load — reproducible 3/3 in-suite, never in
isolation; product CSS/behavior was already correct, test-only fix) ·
matching simulation max #1 frequency 12.0% (Warren Buffett, unchanged —
this release touched no matching/scoring code) · live production smoke
test (Landing EN/KO; a full anonymous quiz run through to Results with
real computed scores, zero console errors; People Directory; Warren
Buffett, Rosalind Franklin, Aung San Suu Kyi, Jane Goodall, and Mustafa
Kemal Atatürk person pages at 1280px plus Rosalind Franklin at 390px;
mobile Trait Constellation collapsed-to-4/expand-to-all confirmed live;
Life Arc/Key Achievements/Moments/Turning Points/Complexities/Legacy
all confirmed rendering where present, EN and KO; zero horizontal
overflow at 390px or 1280px in either locale) all clean. See
[`docs/context/TESTING.md`](TESTING.md) for what to run per change type.

## Next product checkpoint

Post-release, no blocking work outstanding. Candidates for a future
session (none started here — out of scope for this release gate): a
trait-card click-to-explain affordance (needs a new lightweight
popover/dialog primitive plus attribute-description content — see
"Person Profile Hero redesign" above), the remaining 19 low-exposure
Tier-C editorial backfill people, the separate unmerged Portrait
Sourcing Batch 1 / Yayoi Kusama v2 branches, the 40 remaining
portrait-less people, and a human decision on deleting the now-fully-
subsumed dev branches listed above.
