# The Great Inside — context router

This file is a **router**, not the project's memory. It should stay
small enough to load cheaply every session. Durable knowledge lives in
`docs/`, split by what kind of information it is — see "Context loading"
below before reading anything else.

## What this is

A quiz-based comparison against real historical and contemporary
people — deterministic scoring, algorithm-first, AI-optional. Quiz →
vector → deterministic comparison → ranked matches → rule-based
interpretation.

## Absolute invariants (global, never scoped to one task)

1. **Zero generative AI calls in the user-facing request path.** No
   `AIProvider` may be a dependency of anything in `src/core`. AI may
   assist admins preparing data; it never enters the request path.
2. **No matching/scoring/calibration/eligibility change without
   quantitative evidence** (simulation + sensitivity analysis) — see
   `docs/context/TESTING.md` and `docs/reference/matching.md`.
3. **EN/KO parity is a hard regression guard** for the `t()`/`MessageKey`
   system (100% Korean coverage, locked by test). Editorial content uses
   a *different*, locale-strict rule — see `docs/reference/localization.md`.
4. **Automate before asking for human testing.** Exhaust everything
   checkable by code first; ask for human validation only for what's
   genuinely unavailable to an agent, and say why.
5. **Evidence discipline for people/traits**: every score carries
   confidence + evidenceType + sources; never infer diagnosis, mental
   illness, or private conditions for anyone, living or dead; never rig
   results to flatter or boost. See `docs/scoring-rubric-v1.md`.
6. **`feat/monetization-v1` is frozen** — isolated, unmerged, no live
   payment infra. Do not read its docs or touch it unless the task is
   explicitly monetization/payments/entitlement work.
7. **`src/core` stays pure and framework-agnostic** — no React, no
   `next/*`, no I/O, no `Date.now()`, no randomness. `app/` consumes it,
   never the reverse.
8. Repository state (git, code, live tools) is the source of truth over
   any document, including this one and including memory from a prior
   session — verify before trusting a cached claim.

## Current-state pointer

**Do not restate current facts here.** Read
[`docs/context/CURRENT_STATE.md`](docs/context/CURRENT_STATE.md) for
branch state, roster/editorial/deployment numbers, and the one standing
merge blocker. Update that file when a fact changes — do not append a
new paragraph here or there.

## Context loading

Read only what your task needs. Do not recursively read `docs/`. Do not
read `docs/archive/` unless resolving a specific historical question the
active docs don't answer.

| Task | Always read | Additional context | Explicitly skip |
|---|---|---|---|
| **Roster research/scoring** | `CURRENT_STATE.md`, `docs/workflows/roster-research.md` | `docs/adding-a-person.md`, `docs/scoring-rubric-v1.md`, `docs/checkpoints/roster.md` | monetization docs, editorial docs, `docs/archive/` |
| **Roster philosophy audit** (e.g. self-made/earned-distinction review) | `CURRENT_STATE.md`, `docs/reference/architecture.md` (Inclusion philosophy) | `docs/checkpoints/roster.md`, actual roster/evidence files | editorial batch history, monetization, deployment/domain narrative |
| **Editorial content** (achievements/moments/turning points) | `CURRENT_STATE.md`, `docs/editorial-content.md` | `docs/checkpoints/editorial.md` | roster research internals, monetization, `docs/archive/` |
| **UI/product work** | `CURRENT_STATE.md`, `docs/reference/architecture.md` | `docs/reference/data-model.md`, `docs/context/TESTING.md`, `docs/reference/directory-taxonomy.md` (Directory filters only) | research archives, roster/editorial checkpoint diaries |
| **Matching/scoring/taxonomy** | `CURRENT_STATE.md`, `docs/reference/matching.md` | `docs/checkpoints/roster.md`, `docs/context/TESTING.md` | monetization, editorial docs |
| **Localization/i18n** | `CURRENT_STATE.md`, `docs/reference/localization.md` | relevant workflow doc for the content type | unrelated archives |
| **Deployment/production/domain** | `CURRENT_STATE.md`, `docs/deployment.md` | `docs/checkpoints/production.md` | editorial archives, roster research internals |
| **Monetization** | `CURRENT_STATE.md`, `feat/monetization-v1`'s own docs (different branch) | `docs/deployment.md` (auth pieces only) | roster research history, editorial history |
| **Debugging a known-shape symptom** | `docs/troubleshooting.md` | whatever it points you to | everything else, until the symptom list doesn't match |
| **Testing / "what should I run"** | `docs/context/TESTING.md` | — | — |

Full doc-by-doc authority table: [`docs/context/README.md`](docs/context/README.md).

## Archive rule

`docs/archive/` holds completed-phase narratives, session-by-session
roster/editorial history, and superseded decisions — **not loaded by
default, ever**. Nothing in it is deleted; it exists so a future session
doesn't have to read 13,000+ lines of finished narrative to do routine
work. Open a specific archive file only when the active docs point you
there for a named historical question.

## Maintenance rule (prevents this file from regrowing)

- Do not append session reports, phase narratives, or historical
  arithmetic to this file. Ever.
- A durable global rule belongs in "Absolute invariants" above. A
  volatile fact belongs in `docs/context/CURRENT_STATE.md` (overwrite the
  old value, don't append a new paragraph). A task-specific rule belongs
  in the relevant `docs/workflows/`, `docs/reference/`, or
  `docs/checkpoints/` file. A finished narrative belongs in
  `docs/archive/`.
- Soft size budget: this file ≤250 lines, `CURRENT_STATE.md` ≤150 lines.
  Don't mutilate a rule to hit the number, but treat growth past it as a
  signal something durable-but-task-scoped leaked in here and should move.
- If you're about to write "as of this session..." in this file, stop —
  that sentence belongs in `CURRENT_STATE.md` or a checkpoint file.

## Stack (one line — full map in `docs/reference/architecture.md`)

TypeScript/Next.js App Router/Vitest/Supabase, **pnpm via corepack**,
**`--webpack` required** (Turbopack can't resolve this project's `.ts`
specifiers). `corepack pnpm@10 install && corepack pnpm@10 exec next dev
--webpack -p 3000`.
