# Architecture — orientation

Points to source files; does not reproduce their content. For "why" a
decision was made, see `docs/archive/completed-phases/` — this file is
"what's where," not history.

## Stack

TypeScript (strict, ESM), Vitest, PostgreSQL/Supabase, Next.js (App
Router). **pnpm via corepack** — a plain global npm install fails in this
environment (corrupted `minipass-flush`/`minipass@7` tree); use
`corepack pnpm@10 ...`.

**Build/dev must pass `--webpack`.** Turbopack (Next 16's default) cannot
resolve this project's internal `../foo.js` specifiers pointing at `.ts`
files (needed for `tsx`/Vitest's Node-native ESM resolution, which the
whole test suite and dev tooling depend on). `pnpm dev`/`pnpm build`
already pass it — don't drop the flag if invoking `next` directly.

```
src/core     framework-agnostic domain logic — no React, no Next.js, no I/O,
             no Date.now(), no randomness. Consumed by app/, never the reverse.
  attributes   canonical taxonomy (34 attributes / 7 facets, taxonomy_v1.1)
  quiz         question bank, scoring engine
  matching     similarity, calibration, dispersion, result selectors
  greatness    archetypes, Greatness Potential
  interpretation  rule templates, distinctiveness, development guides
  people       explorer (search/filter/sort), editorial validation
  i18n         message bundles (en.ts/ko.ts), editorial.ts, fallback resolution
  results      historical result-snapshot logic (Phase 10C)
  versions.ts  the append-only VersionSnapshot registry
src/data/people   the person roster — builder.ts + seed.ts (roster 1) +
                  roster2.ts...roster10.ts (subsequent batches) +
                  editorial.ts (the editorial side-table, merged by slug)
src/ui       design system (tokens.css, components.css, React components)
src/lib      Next.js-facing glue — Supabase clients, SEO, env resolution,
             locale negotiation, canonical-host redirects
src/dev      simulator, calibrator, diagnostics, roster-1000 pipeline tools
             (src/dev/roster1000/), one-off asset generators
app/         Next.js App Router — quiz/results/compare/people/account/legal
db/          schema.sql + numbered migrations
docs/        this directory
e2e/         Playwright specs
data-pipeline/candidates/  roster candidate JSON (pre-promotion research)
```

## Design system — `design_system_v1` (`src/ui`)

Editorial/premium direction: warm paper background, deep charcoal ink,
one purple accent, serif display type, sans interface type. Both
light/dark themes are first-class. Hard invariants (tested):

- Color never carries meaning alone — every impact ships a text label +
  glyph.
- Scores never render with "%" — a score is a location on a dimension,
  not a percentage. Only Profile Match uses "%"; only Greatness Potential
  uses "N / 100".
- Confidence renders as three coarse pip bands, never a raw decimal.

**Anti-AI-template principle** (adopted 2026-08, binding for every future
visual decision): ask "why does this element exist specifically for The
Great Inside" — if the honest answer is "it looks modern" or "this is
what SaaS sites do," don't use it. Avoid by default: gradients,
glassmorphism, neutral system typefaces, symmetric N-column generic
feature-card blocks, decorative pill badges, boxing everything in
bordered cards by default, fabricated social proof, gratuitous
micro-animation.

**Wide-desktop layout** (`Rail`/`IdentityHero`, `src/ui/components/
layout.tsx`): the one intentional breakpoint is **≥1280px**. Use
horizontal space via composition (pairing peer sections, content-driven
grids), never by stretching a sparse element to fill a wide track.

## Inclusion philosophy — `inclusion_v1`

The counterfactual test for roster membership: if a person hadn't
inherited their title/office/fame, would the achievement this project
includes them for still be independently notable? Decided once per
person at authoring time, never per-trait, never inferred from
occupation/era/wealth. Full detail:
`docs/archive/completed-phases/claude-md-phase-history-2026-08.md`
("Inclusion philosophy").

## Safety (hard rules, never relaxed)

- Never fabricate or infer mental illness, medical conditions, sexual
  orientation, criminal behavior, addiction, or personality disorders —
  living or dead.
- "Biographical accounts describe X" — never a diagnosis.
- Living people: only tendencies published accounts describe directly.
- Every person score carries `confidence` + `evidenceType` + sources.
- Difference ≠ deficiency — the UI must actively reinforce this.
- Never rig results: no boosting famous people, no forced score
  thresholds.

## SEO / locale

`robots.ts`/`sitemap.ts` generate from live sources (`LAUNCH_LOCALES`,
`SEED_PEOPLE`) — never hand-maintained lists. `siteUrl()`
(`src/lib/env.ts`) is the single resolution point every canonical/
hreflang/OG/share URL in the app goes through. Locale negotiation only
applies to bare `/`; every other route is locale-explicit. Current
canonical facts: [`docs/checkpoints/production.md`](../checkpoints/production.md).

## Conventions

- Everything in `src/core` is pure: same input → same output, forever,
  for a given version string.
- Every scoring change bumps a version constant. Never silently
  recompute a saved result under a new algorithm.
- Ties break on stable ids (`localeCompare`), never popularity/recency.
- Trait impact is `person × attribute × context` — never a global color
  for an attribute.

## Data model — Person type and sources

See [`docs/reference/data-model.md`](data-model.md).
