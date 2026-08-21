# Troubleshooting

Symptom-indexed. Full incident detail (what was tried, what turned out to
be a dead end) lives in `CLAUDE.md`'s narrative history — this file exists
so a future operator hitting a known symptom doesn't have to grep a
5900-line file first to check whether it's already been solved.

## Google OAuth sign-in fails / no session created / no error shown

**Most likely cause, confirmed once already**: `.env.local` was edited in
a text editor but never actually saved to disk — the dev server keeps
running against the stale/placeholder values it loaded at startup. Save
the file and **restart the dev server** (env vars are read once at
process start, not hot-reloaded).

Check in order:
1. Is `.env.local` actually saved (not just open in an editor with
   unsaved changes)?
2. Did you restart `next dev` after editing it?
3. Do `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   match the current 2026 key model (publishable/secret), not the legacy
   `anon`/`service_role` names?
4. Is the callback URL (`<your-origin>/auth/callback`) actually in
   Supabase Dashboard → Authentication → URL Configuration → Redirect
   URLs? (Google's own "Authorized redirect URI" points at Supabase's
   fixed callback, not your app — you don't need to touch it per-domain.)

## A signed-in user's completed quiz result never appears in their account

Historically caused by two *sequential* DB gaps, both now fixed by
migrations already in `db/migrations/` — but worth checking if you're
looking at a database that hasn't had all migrations applied:
1. `public.user_profiles.completed_at` column missing — apply
   `0002_stage9c_completed_at.sql`.
2. `public.quiz_versions` not seeded with the current quiz version — a
   Postgres `23503` foreign_key_violation on `user_profiles_quiz_version_
   fkey` is the tell. Apply `0003_stage9d_seed_quiz_version.sql` (uses
   `ON CONFLICT ... DO UPDATE`, safe to re-run).

Check `db/migrations/` for the full numbered list and confirm each one has
actually been run against your live Supabase project — this repository
has no way to know the live DB's applied-migration state from the code
alone; verify directly in the Supabase SQL Editor.

## Signed out while viewing a saved result shows "result not found" instead of "sign in required"

This was a real, found-and-fixed bug (the auth-state and lookup-state
were conflated). If you see it again, it's a regression — check
`src/lib/results/savedResultPageState.ts`'s `resolveSavedResultPageState`
still checks `signedIn` before anything else.

## All 70+ (or however many) person pages suddenly build as dynamic (`ƒ`) instead of static (`●`)

Almost always caused by something in the shared `[locale]` layout (or a
component it renders on every page, like the header) resolving
authentication **server-side** via `cookies()`. Any server-side
`cookies()`/`headers()` read inside a layout that wraps static pages
forces the whole subtree dynamic. Fix: resolve auth state client-side
instead (see `AuthControls.tsx`'s `useEffect` + `supabase.auth.getUser()`
pattern — "undefined = not yet resolved, render nothing" until then).
Confirm the fix by checking `next build --webpack`'s route table directly
— don't assume from reading the code, verify the actual build output.

## Canonical/OG/sitemap URLs point at the wrong domain (e.g. the old Vercel URL after attaching a custom domain)

Attaching a custom domain in the Vercel UI does **not** automatically
change what `VERCEL_PROJECT_PRODUCTION_URL` resolves to. Set
`NEXT_PUBLIC_SITE_URL` explicitly (Vercel → Project → Settings →
Environment Variables, Production environment) to the real canonical
origin, no trailing slash. See `docs/deployment.md`'s "Site URL
resolution" section for the full fallback chain.

## Playwright E2E test using a fixed/hardcoded result token starts failing after a roster change

A known, recurring fragility class — not a new problem. Some E2E fixtures
use a fixed `encodeResultToken(...)` string whose *branch outcome*
(e.g. "Unexpected Match is absent, Opposite Profile is present") depends
on the full current roster's shape. Adding people can shift which
synthetic answer patterns produce which branch. Fix: re-derive a token
that still produces the required condition against the live
`buildResultSet` pipeline (a small script that mutates the token
character-by-character and checks the resulting branch, same method used
each time this has recurred — see the comment in the affected spec file,
e.g. `results.visual.spec.ts`'s `UNEXPECTED_ABSENT_TOKEN`, for the exact
approach). This is not evidence of a real product bug — it's a symptom
of testing a roster-shape-dependent branch with a hardcoded input.

## `next dev`/`next build` silently appended boilerplate to CLAUDE.md

A known Next.js 16 behavior (auto-generated "agent rules" files) — already
disabled via `agentRules: false` in `next.config.mjs`. If you see
unexpected diffs to `CLAUDE.md` after a build with no corresponding
intentional edit, check that config flag is still set before assuming
something else caused it.

## A metadata-only file (OG image, font asset) works locally but 500s in production on Vercel

Check whether the file is read via a runtime-constructed path
(`readFile(join(process.cwd(), "some/path"))`). Vercel's build-time file
tracer (`@vercel/nft`) can't always statically follow those, silently
excluding the file from the deployed serverless bundle even though it
works fine locally/in `next start`. Fix: add the path to
`outputFileTracingIncludes` in `next.config.mjs`. Confirm by checking the
route's own `.nft.json` includes the file, both before and after.

## General debugging discipline this project follows

- Verify against the actual current source/build/live-database state
  before trusting anything a past session or this file says — CLAUDE.md
  itself has caught and corrected several of its own earlier overclaims
  this way.
- When a diagnosis and a fix both feel plausible, confirm the fix
  actually addresses the diagnosed cause (re-check live) before declaring
  it solved — several past incidents in this project involved an initial,
  reasonable-but-wrong hypothesis that was fixed defensively but later
  confirmed NOT to be the actual cause.
- Never patch a surprising number (a match percentage, a domination
  frequency, a calibration curve) by adjusting the model until it "looks
  right." Find the actual mechanism first.
