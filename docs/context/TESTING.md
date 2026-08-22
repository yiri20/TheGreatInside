# Testing

## Standard commands

```bash
corepack pnpm@10 exec tsc --noEmit                       # typecheck
corepack pnpm@10 exec vitest run                          # unit/integration tests
corepack pnpm@10 exec next build --webpack                # production build (must use --webpack, see reference/architecture.md)
corepack pnpm@10 exec playwright test                     # browser E2E — needs a build/dev server, see e2e/ configs
corepack pnpm@10 exec tsx src/dev/simulate.ts 10000 quiz   # matching/greatness distribution + #1-domination check
corepack pnpm@10 exec tsx src/dev/diagnose.ts              # quiz bank coverage diagnostics
corepack pnpm@10 exec tsx src/dev/i18n-audit.ts            # Korean translation coverage report
corepack pnpm@10 exec tsx src/dev/editorialCoverageAudit.ts  # editorial content coverage by tier
```

## What to run, by change type

| Change type | Required | Skip |
|---|---|---|
| Editorial content only (`src/core/i18n/editorial.ts`, `src/data/people/editorial.ts`) | `vitest run src/core/people/editorialValidation.test.ts`, confirm `git diff` scope is editorial-only | Full Playwright suite, `simulate.ts` (unless you suspect scope leaked into matching) |
| New/edited roster person | Full sequence in [`docs/adding-a-person.md`](../adding-a-person.md) — dispersion/calibration regen, `simulate.ts`, full `vitest`/`playwright` | — |
| UI/product code | `tsc --noEmit`, `vitest run`, `next build --webpack`, relevant Playwright specs, manual browser check of the actual feature | Roster/editorial audits (unless touched) |
| Docs/Markdown only (this kind of session) | Grep for stale moved paths, confirm `git diff` touches no `src/`/`app/`/`db/` file | Full `vitest`/Playwright/`tsc` — nothing to typecheck or regression-test |
| Deployment/env config | Smoke-test sequence in [`docs/deployment.md`](../deployment.md) §4 | Roster/editorial tooling |
| Matching/scoring/taxonomy formula change | Full sequence — this is the one category that always needs `simulate.ts`, `sensitivity.ts`, dispersion/calibration regen, and full `vitest`/`playwright` | Never skip anything for this category |

## Automate before asking for human validation

Adopted project-wide during Phase 10D (not just for visual work): exhaust
everything checkable by code — typecheck, unit/integration tests,
production build, headless-browser E2E, responsive viewport checks,
console/network error inspection, EN/KO checks — before ever asking the
user to test manually. Ask for human testing only for what's genuinely
unavailable to an agent (real Google OAuth consent, a live authenticated
dashboard action, subjective final visual/taste approval), and state
explicitly why it can't be automated, what was already checked, and what
minimal action/evidence is needed back.

## Known durable flakes / gotchas

- Playwright specs using a hardcoded `encodeResultToken(...)` fixture can
  break after a roster change, since the token's *branch outcome* (e.g.
  "Unexpected Match absent") depends on the live roster's shape. Not a
  product bug — re-derive the token. See
  [`docs/troubleshooting.md`](../troubleshooting.md).
- The Playwright harness runs against a **production build**
  (`next build --webpack && next start`), not `next dev` — `next dev`'s
  on-demand compilation caused real flakes under this suite's parallelism.

## Full context

[`docs/troubleshooting.md`](../troubleshooting.md) is the symptom-indexed
fix list for known recurring issues (OAuth, DB migrations, SSG regressions,
domain/canonical drift, etc.) — check it before re-diagnosing something
from scratch.
