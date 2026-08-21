# The Great Inside

A quiz-based comparison against real historical and contemporary people —
deterministic scoring, no generative AI in the request path. See
`CLAUDE.md` for the full architecture/decision record (the actual source
of truth for "why" something is built the way it is); this file is only
the practical entry point for getting the repo running.

## Quick start

Requires [Node.js](https://nodejs.org) with [Corepack](https://nodejs.org/api/corepack.html)
enabled (`corepack enable`) — this project uses **pnpm via corepack**, not
a global npm/pnpm install (see "Why pnpm via corepack" below).

```bash
corepack pnpm@10 install
corepack pnpm@10 exec next dev --webpack -p 3000
```

Open `http://localhost:3000`. There is no database or auth setup required
to run the core product locally — the quiz, results, and person pages work
entirely from static in-repo data. Supabase (accounts) is optional for
local dev; see `.env.example` and `docs/deployment.md` if you need it.

### Why pnpm via corepack

A plain global `npm install` in this environment has historically failed
on a corrupted dependency tree (`minipass-flush` against `minipass@7`).
`corepack pnpm@10 ...` sidesteps it and is the only installation path this
project's own sessions have used — treat it as the supported one.

### Why `--webpack`

Next.js 16's default bundler (Turbopack) cannot resolve this project's
internal `../foo.js` specifiers that point at `.ts` files (needed for
`tsx`/Vitest's Node-native ESM resolution, which the test suite and dev
tooling depend on). `pnpm dev`/`pnpm build` already pass `--webpack` — if
you invoke `next` directly, don't drop the flag.

## Common commands

```bash
corepack pnpm@10 exec tsc --noEmit                       # typecheck
corepack pnpm@10 exec vitest run                          # unit/integration tests
corepack pnpm@10 exec next build --webpack                # production build
corepack pnpm@10 exec playwright test                     # browser E2E (needs a build/dev server — see e2e/ configs)
corepack pnpm@10 exec tsx src/dev/simulate.ts 10000 quiz   # matching/greatness distribution + #1-domination check
corepack pnpm@10 exec tsx src/dev/diagnose.ts              # quiz bank coverage diagnostics
corepack pnpm@10 exec tsx src/dev/i18n-audit.ts            # Korean translation coverage report
```

`package.json`'s own `scripts` block (`dev`/`build`/`typecheck`/`test`/
`simulate`/`calibrate`) covers the everyday ones; the rest are one-off dev
tools under `src/dev/` — most have a usage comment at the top of the file.

## Where things live

```
src/core     framework-agnostic domain logic (taxonomy, quiz, matching,
             greatness, interpretation, i18n) — no React, no Next.js, no I/O
src/data     the person roster (src/data/people/*.ts)
src/ui       design system components
src/dev      simulator, calibrator, diagnostics, one-off roster-pipeline tools
src/lib      Next.js-facing glue (Supabase, SEO, env resolution)
app/         Next.js App Router pages
db/          schema.sql + numbered migrations
docs/        operational runbooks (this directory)
e2e/         Playwright specs
```

## Where to go next

- **Adding or editing a person in the roster** → `docs/adding-a-person.md`
- **Deploying, environment variables, Google OAuth setup** → `docs/deployment.md`
- **Something broke and you don't know why** → `docs/troubleshooting.md`
- **Why a design/architecture decision was made** → `CLAUDE.md` (long —
  it's a running decision log, not a tutorial; search it by keyword rather
  than reading start to end)
- **Scoring a new person's traits from evidence** → `docs/scoring-rubric-v1.md`

## Monetization

Deep Inside (a one-time paid feature) is implemented on the
`feat/monetization-v1` branch but is **intentionally not merged to
`main`** and has no external payment infrastructure activated — no
Stripe account, no live migration, no payment env vars. It doesn't exist
on this branch (correctly — monetization work is deliberately isolated).
Check out `feat/monetization-v1` and read `docs/monetization-v1.md` §0
there for the exact handoff/resume point before touching it.
