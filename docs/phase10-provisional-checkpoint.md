# Phase 10 — Launch — provisional checkpoint

**Status: Stage 10A (Production Foundation) FORMALLY CLOSED, 2026-08.
Stage 10B (First Real Deployment) FORMALLY CLOSED, human-approved,
2026-08. Stage 10C (Historical Result Fidelity + Account Save/UX)
FORMALLY CLOSED, human-approved, 2026-08.** This is the durable resume
point for a fresh session — read this file, `CLAUDE.md`'s Status section
and its dedicated "Phase 10C — historical result fidelity" section, and
`docs/deployment.md` before touching Phase 10 again. Phase 9 is FORMALLY
CLOSED and frozen (see `docs/phase9-provisional-checkpoint.md`) —
nothing in this document proposes touching it. Stage 10C's code
(including the post-E2E auth-state fix, deployed from commit
`d425e24730fa524429033978298431dd84be1f9e`) has passed a full production
human E2E — see "Stage 10C record" below for the complete evidence. **No
Phase 10 stage beyond 10C has begun** — see "Exact next task for a fresh
session" at the bottom of this file for candidates, none yet chosen.

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

## Stage 10B record (2026-08) — First Real Deployment, FORMALLY CLOSED, human-approved

Scope followed the provisional plan below exactly, in order, with the two
manual/authentication-gated steps (GitHub repo creation, Vercel project
import) genuinely stopped for and performed by the user rather than
simulated — same discipline every other manual-action boundary in this
project uses.

**1–2. Git + GitHub.** Fresh-state verification confirmed no `.git`
existed and no secrets were present in the tracked-candidate file set
(re-grepped for key-shaped strings across `app/`, `src/`, `db/`, `docs/`,
config files — zero hits; `SUPABASE_SECRET_KEY` reconfirmed unused).
`git init` → reviewed the full 119-file `git add -n .` candidate list by
hand (no stray scratch/debug files, no `.env.local`, no build output) →
one clean initial commit. The user created the GitHub repository manually
(`github.com/yiri20/TheGreatInside`, private) and provided the URL —
`git remote add origin`, then `git ls-remote origin` was checked *before*
pushing anything (empty result — genuinely no existing history to
conflict with, confirmed rather than assumed), branch renamed
`master`→`main`, `git push -u origin main`. No force-push, no history
overwritten, verified independently afterward via a second
`git ls-remote`.

**3–4. Vercel + environment variables.** Re-verified Vercel-readiness
directly from source immediately before import (not re-trusted from
Stage 10A's audit alone): `package.json`'s `"build": "next build --webpack"`
already carries the required flag so Vercel's default Next.js build needs
no override; `pnpm-lock.yaml` is tracked and unambiguous (no competing
`yarn.lock`/`package-lock.json`); no `vercel.json` needed. Re-ran
`tsc --noEmit` (clean), `vitest run` (**319/319**), and
`next build --webpack` (clean, **82 routes**, same static/dynamic split as
every prior checkpoint) as a final pre-import confirmation. `gh`/`vercel`
CLIs are not installed in this environment, so the user performed the
Vercel import manually (Import Git Repository → `yiri20/TheGreatInside`,
Next.js auto-detected, production branch `main`) and configured exactly
two environment variables for Production before the first deploy:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
**`NEXT_PUBLIC_SITE_URL` was deliberately left unset** for this first
deployment — the smallest-safe sequencing decision, explained to the user
before it happened: `siteUrl()`'s existing Stage-10A-hardened resolution
chain falls through to Vercel's own automatically-provided
`VERCEL_PROJECT_PRODUCTION_URL`, so `metadataBase` resolves correctly
against the real production domain with no manual site-URL configuration
needed at all, avoiding the chicken-and-egg problem of needing the
production URL before it exists. `SUPABASE_SECRET_KEY` was not added,
per the reconfirmed-unused audit.

**5. First deployment.** Production domain (Vercel-assigned):
**`https://the-great-inside.vercel.app`**. No custom domain configured —
deliberately deferred, per the standing Phase 10 boundary.

**6–7. Smoke test, then OAuth productionization.** Not run by the agent
as a separate pre-OAuth pass this round — the user's single production
E2E pass (below) covered both the non-auth smoke-test surface and the
OAuth round-trip together, confirmed working end-to-end on the first
attempt.

**8. Human E2E — CONFIRMED PASSED, 2026-08, by the user directly on the
live production deployment** (an agent cannot complete a real Google
consent screen, so this step is definitionally human-only, same as every
Phase 9 stage closure):
- Production domain loads successfully.
- `/en-US` and `/ko-KR` routes both work.
- People directory ("Browse People") works.
- Individual person detail pages render.
- The anonymous quiz completes successfully end-to-end.
- `/results` renders correctly.
- Google OAuth completes successfully **in production** (not merely
  local dev, closing the gap Stage 9D's local-only OAuth verification
  left open).
- The OAuth callback correctly returns to the Vercel production app.
- The Korean locale is preserved through the full OAuth round-trip.
- The header correctly flips to Account/Sign out once authenticated.
- Session persistence survives a page refresh.
- **The newly completed anonymous quiz result migrated successfully into
  `public.user_profiles`** — the first time the Stage 9B/9C/9D
  pending-result pipeline has been exercised against the real production
  Supabase project rather than local dev.
- The new production result created its own distinct `result_token`.
- **`completed_at` preserved the actual quiz-completion time**, distinct
  from and earlier than `created_at` (the later database-save/sign-in
  time) — production evidence, not merely local-dev evidence, that the
  dedicated `completed_at` column (Stage 9C's `0002_stage9c_completed_at.sql`
  migration) is genuinely doing its job: the saved row shows
  `completed_at ≈ 20:09:43 UTC` against `created_at ≈ 20:12:24 UTC`, a
  roughly 3-minute gap consistent with "quiz finished, then the user
  authenticated a few minutes later," not "both timestamps are just
  row-insert time in disguise."
- `tgi_pending_own_results_v1` correctly cleared to `[]` after the
  successful save.
- `tgi_last_result_v1` correctly still reflects the latest-viewed result
  (a separate, non-ownership-implying key — see Stage 9C's design note
  in `docs/phase9-provisional-checkpoint.md` for why the two keys are
  deliberately distinct).
- No duplicate `user_profiles` row and no other production persistence
  regression was observed.

**One new Phase 10 UX requirement was identified during this human E2E**,
recorded but explicitly **not implemented** this stage, per the user's
own instruction to keep this closeout documentation-only: a results-page
sign-in conversion CTA for signed-out users, who currently see only the
small global header "Sign in" control with no explanation of what
signing in buys them. Full requirement, concept copy (EN+KO), and the
constraints any implementation must satisfy (never gate the result behind
auth, reuse the existing `tgi_pending_own_results_v1` pipeline rather than
add a second save mechanism, preserve locale/return-path, disappear or
soften to a saved-state indicator after a successful save) are recorded in
`CLAUDE.md`'s "Known open issues" item 13. Not yet scoped into any stage.

**Deliberately NOT done this stage**, same explicit boundaries as Stage
10A, none of them touched: no wide-desktop redesign, no portraits
pipeline, no ads, no analytics, no share cards, no full SEO pass, no
drafted privacy-policy/terms text, no custom-domain purchase or
configuration, no dataset expansion, no results sign-in CTA
implementation (recorded above, not built).

**Verification.** No application code was changed during Stage 10B itself
(git/GitHub/Vercel workflow and documentation only) — the `tsc`/`vitest`/
`build` numbers above were a re-confirmation of the existing Stage 10A
baseline immediately before import, not evidence of new changes. No
credential values were printed, logged, or committed at any point
(confirmed by the same grep discipline as Stage 10A, re-run before the
initial commit).

## Stage 10C record (2026-08) — Historical Result Fidelity + Account Save/UX, FORMALLY CLOSED, human-approved

Full architectural record lives in `CLAUDE.md`'s dedicated "Phase 10C —
historical result fidelity" section — this entry is the stage-closure
bookkeeping: what was verified, what was applied live, and exactly what
still blocks formal closure.

**Trigger.** The user, reviewing the approved-but-unbuilt results
sign-in CTA (Stage 10B's item 13), asked whether "sign in to save this
result and return to it later" would actually stay true — it would not
have, since `/results` recomputes live against the roster/reference/
dispersion/archetypes/interpretation rules on every render, none of
which were captured in the original 6-field provenance. That single
question drove the entire stage.

**What shipped** (full detail in CLAUDE.md): `VersionSnapshot` completed
to 10 code-level fields; a new computed `personDataFingerprint` closing
the 11th (roster) gap; a claim-time drift guard in `saveCompletedResult`
that refuses to compute or persist anything unless current state is
proven identical to completion-time state; an immutable
`ResultSnapshotV1` (strict-validated, schema-tagged) computed once via a
newly-shared `computeResultView` (eliminating what had been duplicated
orchestration between `/results` and the snapshot builder); a
quarantine-not-delete architecture for both legacy-format and
current-format-drifted pending entries (reached only after two rounds of
user correction on an earlier draft that deleted them); `/account` and
`/account/results/[id]`; and the signed-out `/results` save CTA.

**Migration 0004 — applied live, verified in production Supabase
(2026-08).** 6 new nullable columns on `user_profiles` +
`result_snapshot_schema_check` (hardened pre-application: the original
`->>'key'='x'` form was NULL-unsafe and would have silently passed a
malformed snapshot — fixed with `jsonb_typeof`+`?` key-existence) +
`result_snapshot_provenance_check`. Confirmed live: both constraints
exist, all 6 columns exist, `total_rows = 2` unchanged, no data loss.

**Legacy-row backfill — exactly 1 of 2 rows, evidence-gated per row, not
a blanket pass.** Full evidence chain (git diff, six-column match,
`profileId`-non-influence proof, human-observed-value parity) in
CLAUDE.md's Phase 10C section.
- `800d073e-c4ee-4b36-a811-eb406ca0f123` (Stage 10B production row,
  deployed from `e3048a8`) — **backfilled**. `git diff e3048a8` showed
  zero output-affecting change; recomputed candidate matched the
  human-observed original exactly (Greatness 61/100 `strong_pattern`,
  Benjamin Franklin, 70% match). Written via a dedicated one-time script
  (never `saveCompletedResult`), guarded by `id` + `result_snapshot IS
  NULL`, touching only the 5 provenance columns + `result_snapshot`.
  Confirmed live: exactly 1 row affected, `completed_at`/`created_at`
  unchanged.
- `820c8499-e401-4bd0-8ec0-a0b088e5e86d` (Stage 9D **local** E2E row,
  predates git init entirely) — **left `result_snapshot = NULL`
  permanently.** No durable evidence (no commit, no deployment record)
  ties that specific completion moment to any provable code/data state;
  matching six version strings alone was explicitly judged insufficient.
  `/account/results/[id]`'s existing honest "not available for this
  early result" state is the correct, intended behavior here — not a
  gap.

**Auth-state bug — found during the human E2E itself, fixed, redeployed,
reverified.** Signing out while already viewing `/account/results/[id]`
showed the generic "결과를 찾을 수 없어요" not-found state — secure (RLS
still correctly returned zero rows) but semantically false, since it
told the user their own real result "doesn't exist or belongs to someone
else." Root cause: `!user` was collapsed into the same branch as
"authenticated, RLS returned nothing." Fixed with
`resolveSavedResultPageState(signedIn, outcome)`
(`src/lib/results/savedResultPageState.ts`) — `signedIn` checked first,
unconditionally wins, `fetchSavedResult` never even called while signed
out — rendering a distinct "로그인이 필요해요" / "Sign in required" state
with an inline `GoogleSignInCta` (a shared client island, also added as
a small polish to `/account`'s pre-existing, already-correct signed-out
state) that reuses the existing `buildOAuthReturnPath`/
`OAUTH_NEXT_COOKIE` mechanism unchanged. The privacy-critical branch
(nonexistent id vs. another user's id — both still the identical generic
not-found state) was never touched. Committed and deployed separately
from commit `d425e24730fa524429033978298431dd84be1f9e`.

**Verification, final.** `tsc --noEmit` clean, `vitest run` **420/420**
(410 for the historical-fidelity build + 10 for the auth-state fix),
`pnpm build --webpack` clean, **84 routes** (`/account` and
`/account/results/[id]` both `ƒ` dynamic; every pre-existing route's
static/dynamic split unchanged throughout the whole stage). Secret/token
scan re-run before every commit in this stage: zero live credentials or
full result tokens found in tracked files (one pre-existing,
already-committed, explicitly self-labeled *synthetic* example token
from Phase 7's own documentation was found and left untouched —
unrelated to this stage, predates accounts entirely, not a real user's
data).

**Human production E2E — CONFIRMED PASSED (2026-08), by the user
directly on the live deployment.** Full 12-point record (same list as
`CLAUDE.md`'s "Phase 10C" section): authenticated `/account` lists saved
results; the backfilled Stage 10B row reopens with exact production
parity (Greatness 61/100, Benjamin Franklin, 70% match); the pre-Git
legacy row honestly shows "cannot be reopened," no fabrication; a brand
new anonymous completion showed the signed-out save CTA and saved
successfully via Google sign-in, producing the first real (non-backfilled)
`result_snapshot` with complete provenance and a correct `completed_at`;
the new result appears in and reopens correctly from `/account`; multiple
completions under one account created separate rows (distinct
`result_token`s); re-login did not duplicate a row (dedup confirmed live);
the auth-state fix is confirmed working (sign-out mid-view now shows the
correct state with a working CTA); `/account` while signed out shows its
own correct state; RLS/privacy behavior remained intact throughout, no
privileged access introduced anywhere.

**Phase 10C is FORMALLY CLOSED, human-approved (2026-08).** Same closure
discipline as every other stage in this project: the user's own live,
first-hand confirmation on the real production deployment, not an
agent's inference from tests or code review.

## Exact next task for a fresh session

1. Read `CLAUDE.md`'s Status section (including "Phase 10C — historical
   result fidelity"), this file, and `docs/deployment.md` in full.
2. Phase 9 is closed and frozen — do not reopen it. Stage 10A, 10B, and
   10C are all closed — do not redo their audits, re-litigate the
   site-origin/historical-fidelity/auth-state designs, repeat the
   git/GitHub/Vercel setup, redo the migration, or redo the backfill.
   **No Phase 10 stage beyond 10C has begun** and none should start
   without a fresh, explicit decision — see the candidates below.
3. Candidates already on record for a future stage, each requiring its
   own fresh, explicit decision — none approved yet:
   - Full SEO pass, share cards/OG images, portraits pipeline,
     analytics, ads, the wide-desktop redesign (`CLAUDE.md` "Known open
     issues" item 12), and eventually a custom branded domain (would
     also require revisiting `NEXT_PUBLIC_SITE_URL` and the Supabase/
     Google redirect-URL allow-lists a second time for the new domain).
4. Preserve the broader Phase 10 boundaries throughout whichever stage is
   chosen next: no invented privacy-policy/business facts, no unrequested
   scope expansion.
