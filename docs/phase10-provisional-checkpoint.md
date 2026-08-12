# Phase 10 — Launch — provisional checkpoint

**Status: Stage 10A (Production Foundation) FORMALLY CLOSED, 2026-08.**
Stage 10B (First Real Deployment) has NOT begun. This is the durable
resume point for a fresh session — read this file, `CLAUDE.md`'s Status
section, and `docs/deployment.md` before touching Phase 10 again. Phase 9
is FORMALLY CLOSED and frozen (see `docs/phase9-provisional-checkpoint.md`)
— nothing in this document proposes touching it.

## Stage 10A record (2026-08) — Production Foundation, FORMALLY CLOSED

Scope was deliberately narrow, per explicit instruction: audit + minimal
code changes to make the existing, Phase-9-complete app safely
deployable, with NO broad UI redesign, ads, analytics, portraits, full
SEO pass, deployment, git initialization, or OAuth dashboard changes.

**Production-readiness audit** — confirmed directly from source, not
assumed:
- Zero hardcoded `localhost`/port references anywhere in `app/`/`src/`.
  Every `localhost:3000`/`:3200` hit in the repo classified: Claude Code's
  own local tool-permission config, historical Phase 9 debugging records,
  and `src/lib/env.ts`'s own intentional, documented dev fallback — none
  requiring action.
- OAuth callback construction was already production-safe: `redirectTo`
  derives from `window.location.origin` (client), the callback route's
  redirect origin derives from `new URL(request.url).origin` (server) —
  neither hardcodes anything.
- `metadataBase` was genuinely missing (the one real gap found) — fixed,
  see below.
- No `fetch()` calls anywhere in `app/`/`src/`; the Korean serif font is
  self-hosted at build time (Phase 8) with no runtime request to Google;
  portrait `<img>` tags point to pre-existing, deliberately external
  licensed sources (Phase 3 decision, untouched).
- `package.json` build/start scripts clean; no `vercel.json` needed — a
  standard Next.js App Router project Vercel auto-detects.
- **No committed secrets anywhere** — confirmed via a pattern-matched grep
  for real-shaped key values (`sb_publishable_`/`sb_secret_` followed by
  10+ real characters) across the whole repo: zero hits. The only
  `SUPABASE_SECRET_KEY=` occurrence with no value is `.env.example`'s
  intentionally-empty template line. The repository also has **no git
  history at all** (confirmed — not yet a git repo), so there is nothing
  to have leaked into version control in the first place.

**OAuth scope audit**: the app requests **`openid`/`email`/`profile`
only** — `AuthControls.tsx`'s `signInWithOAuth` call sets no `scopes`
option, and a repo-wide grep confirms the app never reads `user.email`,
`user_metadata`, `.picture`, or `.name` anywhere — only ever `user.id`.
Per Google's current published docs, apps using only these
"non-sensitive" scopes are exempt from the heavier sensitive/restricted-
scope security-assessment verification tier; only brand verification
(privacy policy) applies once past a small manually-added test-user list.

**Production-safe site-origin strategy** (`src/lib/env.ts`'s `siteUrl()`,
used only for `metadataBase` — OAuth redirect logic deliberately does NOT
use this, see the file's own doc comment for why a live request's origin
is more precise). Hardened after an explicit review found the first
version's unconditional `?? "http://localhost:3000"` fallback could
silently ship localhost-based metadata from a real production deploy
missing one variable. Final resolution order:
1. `NEXT_PUBLIC_SITE_URL` — explicit, always wins when set.
2. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` system variable — Vercel's
   **stable** alias for the real production domain, available
   automatically with no setup. Deliberately NOT `VERCEL_URL`, which
   changes per-deployment and also covers *preview* deployments — using
   that would risk a preview's throwaway URL leaking into metadata as the
   "permanent" canonical origin, confirmed against Vercel's own current
   docs (`VERCEL_PROJECT_PRODUCTION_URL` is documented to always resolve
   to production even when read from a preview build).
3. Genuine production (`NODE_ENV === "production"`) with neither set: a
   loud `console.error` (deduped per build-worker process — Next's
   parallel static-generation workers mean it can still appear a handful
   of times, bounded by worker count not page count, in a real build log;
   confirmed live, not assumed), then the same localhost fallback.
   Deliberately not a thrown error: `metadataBase` is evaluated in the
   root layout every page passes through, including the anonymous-first
   quiz/results flow — crashing the whole site over a metadata-only
   concern would be disproportionate, unlike `supabasePublishableKey()`'s
   correctly-loud throw, which is scoped to auth-touching paths only.
4. Local dev: silent localhost fallback, no warning noise.

**Files**:
- `src/lib/env.ts` (new) — `siteUrl()`, the resolution chain above.
- `src/lib/env.test.ts` (new, 7 tests) — module-isolated via
  `vi.resetModules()` + dynamic re-import per test, since the warn-once
  guard is module-level state.
- `app/layout.tsx` — added `metadataBase: new URL(siteUrl())` only; no
  `lang`, no OG content, no canonical URLs — still deliberately deferred
  to the full SEO pass.
- `.env.example` (new) — variable names + usage notes, no values.
- `docs/deployment.md` (new) — env vars, Vercel setup, the Google/Supabase
  OAuth A/B/C checklist (technical / brand-verification / polish), the
  corrected Git/Vercel decision framing (see below), smoke-test sequence.
- `CLAUDE.md` — Roadmap entry for Stage 10A.

**Git/Vercel wording correction (2026-08, same session)**: an earlier
report called the missing `.git` "the one thing that actually blocks
proceeding" — corrected. Git is not a technical prerequisite for every
Vercel deployment path (the Vercel CLI can deploy a local directory with
no git at all), but it IS strongly recommended for this project's
intended ongoing workflow (source history, deploy-on-push, PR previews,
rollback) — recorded as a recommended decision for Stage 10B, not a hard
blocker, and not performed in any session yet.

**Verification**: `tsc --noEmit` clean, `vitest run` **319/319** (312
Phase-9 baseline + 7 new `env.test.ts`), `pnpm build --webpack` clean,
**82 routes**, static/dynamic split confirmed identical to every prior
checkpoint. No Phase 9 regressions. No credential values or privileged
keys introduced anywhere — confirmed by direct grep, not assumed.

**Deliberately NOT done this stage** (explicit boundaries, all still
correct): no wide-desktop redesign, no portraits pipeline, no ads, no
analytics, no share cards, no full SEO pass, no drafted privacy-policy/
terms text (would require inventing business/contact/jurisdiction facts),
no domain purchase, no Google verification submission, no deploy, no git
init, no OAuth dashboard changes.

## Exact next task for a fresh session

1. Read `CLAUDE.md`'s Status section, this file, and `docs/deployment.md`
   in full.
2. Phase 9 is closed and frozen — do not reopen it. Stage 10A is closed —
   do not redo the audit or re-litigate the site-origin design above.
3. **Stage 10B — First Real Deployment** is next. Provisional scope, per
   the user's own instruction, not to be expanded without asking:
   1. Decide/init Git repository workflow (recommended: git init → private
      GitHub repo → connect to Vercel — see `docs/deployment.md` §2's
      corrected framing; this is a decision for the user, not something
      to do unilaterally without asking first even though it's
      recommended).
   2. Connect/create the intended GitHub repository.
   3. Connect the project to Vercel.
   4. Configure production environment variables securely (the 4 in
      `docs/deployment.md` §1 — never paste real values into chat).
   5. Perform the first deployment to a Vercel-assigned URL.
   6. Run the production smoke-test sequence (`docs/deployment.md` §4,
      steps 1–4) **before** touching any Google/Supabase OAuth production
      dashboard settings — these steps need zero dashboard changes beyond
      the env vars already set.
   7. Only once the actual deployed URL is known: configure the required
      Supabase Redirect URLs and (if needed) Google settings deliberately,
      per `docs/deployment.md` §3 — do not invent a domain in the
      meantime, and do not treat a future branded custom domain as
      required for this first technical smoke test.
   8. Verify production login/session/result persistence with a real
      human E2E pass — same discipline as every Phase 9 stage closure:
      an agent cannot complete a real Google consent screen.
4. Preserve the broader Phase 10 boundaries throughout Stage 10B: no
   wide-desktop redesign, no portraits, no ads, no analytics, no share
   cards, no full SEO pass, no invented privacy-policy/business facts.
5. Do not begin any Phase 10 stage beyond 10B without a fresh, explicit
   decision — same discipline as every phase/stage boundary in this
   project.
