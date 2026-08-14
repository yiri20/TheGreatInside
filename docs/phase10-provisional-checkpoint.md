# Phase 10 — Launch — provisional checkpoint

**Status: Stage 10A (Production Foundation) FORMALLY CLOSED, 2026-08.
Stage 10B (First Real Deployment) FORMALLY CLOSED, human-approved,
2026-08. Stage 10C (Historical Result Fidelity + Account Save/UX)
FORMALLY CLOSED, human-approved, 2026-08. Phase 10D Stage 1 (Visual
Regression Harness + Editorial Primitives + Landing) FORMALLY CLOSED,
human-approved, 2026-08. Phase 10D Stage 2 (Person Detail Editorial
Layout) FORMALLY CLOSED, human-approved, 2026-08. Phase 10D Stage 3
(Live Results Editorial Layout) FORMALLY CLOSED, human-approved,
2026-08. The Phase 10D-3 Saved Result Historical Parity Follow-up is
ALSO FORMALLY CLOSED, human-approved, 2026-08. Phase 10D Stage 4
(Compare Editorial Layout) is ALSO FORMALLY CLOSED, human-approved,
2026-08.** This is the durable resume point for a fresh session — read
this file, `CLAUDE.md`'s Status section and its dedicated "Phase 10C —
historical result fidelity", "Phase 10D-1", "Phase 10D-2", "Phase 10D-3",
"Phase 10D-3 Follow-up", and "Phase 10D-4" sections, and
`docs/deployment.md` before touching Phase 10 again. Phase 9 is FORMALLY
CLOSED and frozen (see `docs/phase9-provisional-checkpoint.md`) —
nothing in this document proposes touching it. Stage 10C's code
(including the post-E2E auth-state fix, deployed from commit
`d425e24730fa524429033978298431dd84be1f9e`) has passed a full production
human E2E — see "Stage 10C record" below for the complete evidence.
**Every page-level Phase 10D wide-desktop layout candidate (Landing,
Person, Live Results, Saved Result, Compare) is now resolved. The one
remaining Phase 10D item is the final, cross-page visual-consistency /
micro-polish pass — it has not started and needs its own fresh, explicit
decision; Phase 10D as a whole is NOT yet marked closed pending it** —
see "Exact next task for a fresh session" at the bottom of this file.

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

## Stage 10D-1 record (2026-08) — Visual Regression Harness + Editorial Primitives + Landing, FORMALLY CLOSED, human-approved

Triggered by CLAUDE.md's own "Known open issues" item 12: at wide desktop
(≥1280px) the site overused a narrow centered single-column layout,
leaving large amounts of dead horizontal space. An audit-first pass
(no implementation) inspected every major surface and proposed a small
reusable editorial-layout system rather than page-specific patches.
Stage 1 implements the smallest slice of that proposal: the harness to
verify it, the two structural primitives, and one page (Landing).
Person, Results, Saved Result, Compare, and Account are explicitly
untouched this stage.

**Breakpoint — corrected record.** The original audit proposed
activating a wide-desktop rail at **≥1024px**. That was reviewed and
**deliberately changed to ≥1280px** before any implementation, on the
instruction that 1024px had not been demonstrated safe for a true
asymmetric composition (particularly untested in Korean) and that the
production complaint this stage responds to was observed at ≥1280px
specifically. **The shipped implementation uses ≥1280px only** — this is
not what the audit originally recommended, and this document previously
under Stage 1 discussion should not be read as claiming otherwise. One
shared threshold is used everywhere; no page-specific breakpoint ladder
was introduced.

**Testing policy adopted this stage, binding going forward:** exhaust
all automatable verification (typecheck, unit/integration tests,
production build, headless-browser E2E, responsive viewport checks,
screenshots, console/network error inspection, route/link checks, EN/KO
checks, keyboard/tab-order checks, overflow/wrapping checks) before
asking for human validation. Human testing is requested only for what is
genuinely unavailable to an agent — real OAuth consent, external
authenticated dashboard actions, hardware interaction, or subjective
final visual/taste approval — and each such request must state why it
can't be automated, what was already tested automatically, the minimum
human action needed, and what evidence to return. This is the same
discipline every Phase 9/10 stage's "human E2E" already followed for
auth-dependent flows; Stage 10D-1 makes it an explicit, general policy
rather than something re-derived per stage.

**1. Playwright visual-smoke harness — new, minimal, durable.** No
browser-automation framework existed in the repo. Added
`@playwright/test` as a devDependency, **Chromium only** (a visual-smoke
tool, not a cross-browser compatibility suite — deliberately not the
full 3-browser matrix, per "don't add a large testing stack
unnecessarily"). `playwright.config.ts` runs the project's real
`next dev --webpack` command (Turbopack cannot resolve this project's
`.js`-specifier-pointing-at-`.ts` imports — see CLAUDE.md "Stack" — so
the harness must use the same `--webpack` flag `pnpm dev`/`pnpm build`
do) on a dedicated port (3177) so it never collides with a developer's
own dev server. `e2e/utils/visualChecks.ts` holds reusable, page-agnostic
assertions — horizontal-overflow, clipped-element, console/page-error
capture, prose-measure-bounded, and DOM-order-vs-tab-order comparison —
so future Phase 10D stages (Person, Results, Compare) can reuse them
instead of re-deriving the same checks. `e2e/landing.visual.spec.ts` is
this stage's actual coverage: both launch locales × six viewports
(390/768/1024/1280/1600/1920px), asserting structural presence, zero
horizontal overflow, zero clipped elements, bounded prose measure, zero
console/page errors, correct CTA hrefs, keyboard tab order matching DOM
order, and that both CTAs actually navigate — **14/14 passing**.
Screenshots write to `test-artifacts/screenshots/` (gitignored — evidence
regenerated per run, not committed baselines; `.gitignore` also excludes
`/playwright-report/`, `/blob-report/`, `/test-results/`). A one-off,
uncommitted script additionally drove the real quiz→results→compare flow
through the browser to exercise `IdentityHero` (see below) with live
data on both dynamic routes before the Landing redesign began — zero
console errors — then was deleted; it is not part of the durable suite,
which stays scoped to Landing per this stage's brief.

**2. Two structural primitives, `src/ui/components/layout.tsx` —
purely presentational, zero `src/core` coupling, zero auth/cookies.**
- **`Rail`** — asymmetric primary/secondary composition. Single column
  below 1280px; at ≥1280px, `grid-template-columns:
  minmax(0,1fr) minmax(16rem,22rem)`. **Accessibility contract:**
  `primary` renders before `secondary` in the DOM and CSS never reorders
  them (`.tgi-rail` uses grid auto-placement, not `order`) — verified by
  the tab-order test above, not merely asserted in a comment. A
  `.tgi-rail--tight` opt-in modifier (`max-width: 60rem` at the wide
  breakpoint) exists because the unconstrained default pushed a
  narrow-content secondary region out to the container's far edge with a
  large disconnected gap from primary — found by actually looking at a
  screenshot, not by the automated checks (which correctly saw no
  overflow/clipping/error and would have passed either way). Landing
  uses this modifier; a future data-heavy primary (e.g. a comparison-bar
  list) may legitimately want the unconstrained default, so the fix was
  made an opt-in modifier, not a change to `.tgi-rail`'s own definition.
- **`IdentityHero`** — the shared "portrait + identity column"
  composition, extracted from three places that had independently
  hand-written the same flex-row pattern (Results' closest-match card,
  the Person detail page hero, the Compare page hero) — including the
  portrait-column width-tie fix CLAUDE.md's "Layout regression from the
  portrait hero" documents being discovered and fixed three times
  independently before this extraction existed. Supports optional
  portrait caption (licence attribution, Person page only), `align`
  ("start" for Person's taller captioned column vs. "center" elsewhere),
  and intrinsic `width`/`height` passthrough (preserves Person's
  CLS-prevention `<img>` attributes, which no other call site had).
  **Deliberately does not prescribe info-column content** — each of the
  three call sites shows a different real mix of eyebrow/heading level/
  meta line/links/CTA, and only the structural shell was duplicated, not
  the content.
- Both exported from `@ui/index`. New CSS lives in `components.css`
  under a dedicated "editorial layout" block; a scoped descendant rule
  (`.tgi-rail__primary .tgi-measure-stack` at ≥1280px) lets Landing's
  primary column stop auto-centering once the rail actually splits,
  **without touching `.tgi-measure-stack`'s own global definition** —
  every other use of it (quiz, account, error states, saved result, …)
  is completely unaffected.

**Extraction verified safe before any visual change was made** — the
brief's own required sequencing: `IdentityHero` was wired into Results,
Person, and Compare with **zero rendered-output change**, then verified
(`tsc --noEmit` clean, `vitest run` 420/420 unchanged, `next build
--webpack` clean at **84 routes with the identical static/dynamic
split** — all 70 Person pages still `●` SSG, Results/Compare/Account/
`/auth/callback` still `ƒ` dynamic, the exact regression class Stage 9D
hit once already) — only after that did the Landing redesign begin.

**3. Landing — the only page visually redesigned this stage.** Below
1280px, structurally unchanged (same single centered `.tgi-measure-stack`
column, same content order). At ≥1280px, `Rail` splits the page: primary
(eyebrow, headline, subtitle, both CTAs) stays left, and the existing
`landing.ai_disclaimer` copy — CLAUDE.md's own "one rule," previously the
smallest, easiest-to-skip line on the page, trailing after two buttons —
becomes a genuine secondary region instead of invented filler: real,
already-authored content given real visual weight, not a card added
merely because space existed. One small, deliberate, human-approved
content addition: a new label above that card, **"How It Works" (EN) /
"작동 방식" (KO)**, matching the existing `results.method.toggle` ("How
this was calculated") naming convention, adapted to present tense since
Landing precedes any computed result. `landing.method.eyebrow` added to
both `en.ts` and `ko.ts` — `translationCoverage("ko-KR") === 1` re-passed
unchanged, confirming full coverage. **One deliberate design call, not a
literal pixel-for-pixel narrow-width preservation**: below 1280px the
disclaimer now renders inside the same small labelled card as at wide
desktop (not the plain muted trailing line it was before), reasoned
through explicitly rather than silently decided — the alternative
(literal pre-existing treatment below 1280px, card only at ≥1280px)
would have required either duplicating the text in the DOM (bad for
screen readers) or two different visual treatments of the same sentence
depending on width, both worse than one coherent treatment applied
everywhere. **Both the composition and the new label/copy were reviewed
and approved directly against real screenshots.**

**4. Incidental finding, fixed: Next.js 16 was silently mutating
CLAUDE.md.** Discovered as an unexpected uncommitted diff to this
project's most carefully hand-curated file — `next dev`/`next build`
auto-append a generic "agent rules" boilerplate block to `CLAUDE.md` on
every run (`node_modules/next/dist/server/lib/generate-agent-files.js`).
Reverted the pollution and added `agentRules: false` to
`next.config.mjs` specifically to stop this from recurring silently —
CLAUDE.md is edited deliberately and reviewed line by line per its own
header; an auto-injected block is exactly the kind of change this
project's conventions exist to prevent. Confirmed fixed: a full
`next build --webpack` after the config change left `CLAUDE.md` with
zero diff.

**Final verification.** `tsc --noEmit` clean · `vitest run` **420/420**
(unchanged — no `src/core` file touched) · `next build --webpack` clean,
**84 routes**, static/dynamic split identical throughout every step of
this stage · Playwright **14/14** (both locales × six viewports, plus
tab-order and navigation tests) · zero console/page errors, zero
horizontal overflow, zero clipped elements at any tested width/locale ·
secret/artifact scan: `test-artifacts/`, `/playwright-report/`,
`/blob-report/`, `/test-results/` all confirmed gitignored, no `.env*`
file tracked beyond the pre-existing `.env.example` template.

**Stage 10D-1 is FORMALLY CLOSED, human-approved (2026-08).** The
Landing composition and the "How It Works" / "작동 방식" treatment were
explicitly approved against real screenshots — same closure discipline
as every other stage in this project, just without a live-production
component this time (no auth/Supabase/algorithm/dataset code was
touched, so there was nothing requiring a live-deployment human check
the way Phase 9's OAuth flow or Phase 10C's save pipeline did).

### Stage 10D-1 mobile-polish follow-up (2026-08, human-approved)

Narrow, Landing-only follow-up requested after Stage 10D-1 closed —
recorded here rather than as its own numbered stage since it's a
refinement of an already-approved composition, not new scope. Full
narrative in `CLAUDE.md`'s "Phase 10D-1" section (the "2026-08
mobile-polish follow-up" paragraph); this is the checkpoint-level
summary for a fresh session.

**Problem**: below 1280px, headline/primary-CTA/secondary-CTA/How-It-
Works all read as similarly-weighted large rounded elements in
sequence — the generic AI-template rhythm the project's own design
principle (adopted the same week) warns against.

**Fix, three Landing-scoped CSS classes, each inert at ≥1280px**
(`.tgi-landing-headline`, `.tgi-landing-cta-secondary`,
`.tgi-landing-howitworks`) — confirmed by zero diff on every file the
shared `.tgi-display`/`.tgi-button--secondary`/`.tgi-card` definitions
also govern (Person, Results, Account):
1. Headline 56px → 50px below 1280px only (~11%).
2. Secondary CTA sheds pill chrome for a text-link + arrow below
   1280px, keeping a real 44px+ tap target mechanically (not just
   visually) preserved.
3. How It Works loses its card background/border/shadow/radius below
   1280px in favour of a single top-rule divider.

**Korean headline copy — resolved via two compared candidates, not one
guess.** Original ("역사 속 누가 당신과 비슷하게 생각할까요?") measured
a real 2.0× block-height disproportion against English at 390px (230px
vs. 115px), not just a subjective impression. Candidate A ("역사 속
누가 당신처럼 생각할까요?") fixed the length but kept English's own
subject→comparison→verb sentence shape. **Candidate B ("역사 속 누구와
생각이 닮았을까요?"), the one shipped**, restructures around "생각이
닮다" — a genuinely idiomatic Korean phrase for "our thinking resembles"
— making "생각" the grammatical subject rather than "당신" the object of
comparison; more reflective in tone, better editorial fit, and avoids
the overused "당신을 위한" Korean-marketing-copy pattern. A and B
measured identically (3 lines/172.5px at 390px, 2 lines at 768/1280px)
— the choice between them was decided entirely on native-Korean quality
and brand fit, not rhythm, since rhythm was already a tie.

**No KO-specific font-size adjustment applied.** The remaining 1.5×
block-height difference between English (2 lines) and Korean (3 lines)
at the same 50px was judged, from the actual screenshots, to be normal
cross-language variation, not disproportion — shrinking Korean further
would risk reading as visually subordinate to English, against this
project's own "equivalent visual emphasis, not identical metrics"
principle articulated during this review.

**Verification**: `tsc --noEmit` clean, `vitest run` 420/420
(unchanged), `next build --webpack` clean at 84 routes (split
unchanged), Playwright **56/56** (17 Landing + 39 Person, Person
re-run as a full-suite regression check though untouched by this
follow-up). Confirmed zero diff on every Person/Results/Compare/Account
file and on `src/ui/components/layout.tsx`. Files touched:
`app/[locale]/page.tsx`, `src/ui/styles/components.css`,
`src/core/i18n/ko.ts` (one string), `e2e/landing.visual.spec.ts`.

**Human-approved (2026-08)**: both the mobile rhythm fix and the final
Korean headline copy were explicitly approved against real screenshots
across two rounds of comparison (mobile-polish visual review, then a
dedicated Korean copy A/B review).

## Stage 10D-2 record (2026-08) — Person Detail Editorial Layout, FORMALLY CLOSED, human-approved

Second Phase 10D stage, applying the Stage 1 primitives (`Rail`,
`IdentityHero`) to the Person detail page. Results, Saved Result,
Compare, and Account remain untouched, as scoped. CLAUDE.md's "Phase
10D-2" section is the durable summary; this is the fuller record.

**Diagnosis, done before implementation as required.** The identity hero
(12rem portrait + `flex:1` info column) stretched across the full
1280px container with a short info column — the dead region the Phase
10D audit named. Section mapping: hero → primary editorial region;
Known For (`impactDomains`) → secondary supporting rail, real
already-existing content, not invented; Trait Constellation/Similar
People → full-width sections (`Grid` already scales correctly with real
per-item content, left unchanged); Sources → deliberately narrow section
(a citation list, never needed the full container); Opposite Profile →
also effectively a "deliberately narrow" section once its structural
always-exactly-one-item nature was accounted for, even though it had
been rendered as a full-width `Grid` before this stage.

**Two genuine pre-existing bugs found by inspecting real screenshots**
(per this stage's own instruction to fix visual problems found this way
rather than asking for manual discovery), neither previously flagged
anywhere in the project's records:
1. **Sources** — a full-width sunken `Card` holding only a short
   citation list at any container width ≥1280px, one of the "giant
   empty card" cases the audit's own language warned against.
2. **Opposite Profile — the more serious one.** `selectOppositePerson`
   returns at most one person, and `<Grid min="14rem">` wrapped around a
   single `PersonCard` auto-fit-sizes its one column to `1fr`, stretching
   that single card to the full container width. Combined with
   `PersonCard`'s fixed 4:5 portrait-placeholder aspect-ratio, this
   produced a beige placeholder block taller than the entire rest of the
   page at 1920px — confirmed directly in a screenshot, not assumed from
   reading the code alone.

**Fix, both Person-page-local, zero shared-component or shared-CSS
changes:** Sources wrapped in the existing `.tgi-measure-stack` class
(same narrow-content pattern already used by quiz/account/error states).
Opposite Profile's `Grid` wrapper replaced with a plain `<div style={{
maxWidth: "20rem" }}>` — `Grid` was never architecturally correct for a
section that always renders exactly one item; a fixed cap matching the
card width seen elsewhere on the page was the direct fix, not a
workaround.

**Hero + Known For composition.** Wrapped in `Rail` with the
`.tgi-rail--tight` modifier Landing already introduced (reused, not
reinvented) — hero as primary, Known For as secondary, at ≥1280px only.
Below that, `Rail` collapses to one column and Known For renders
directly after the hero, the exact position/order it already occupied
pre-Stage-2 — verified live at 1024px, not assumed from the CSS alone.
Falls back to a bare `IdentityHero` (no `Rail` wrapper at all) when
`person.impactDomains` is empty, so a person with no Known For content
never reserves dead secondary-column width — not a live case today
(every one of the current 35 people has non-empty `impactDomains`,
confirmed by grep) but the field is nullable by schema and this is the
correct defensive behavior regardless.

**`IdentityHero`/`Rail` verified unchanged, not just assumed.**
`git diff src/ui/components/layout.tsx` against the Stage 1 commit
(`7c72203dd9b6a76543d7d1af5b1cc99f1098f0e6`) is empty. `app/[locale]/
results/page.tsx` and `app/[locale]/compare/[slug]/page.tsx` are also
confirmed at zero diff. This is a stronger guarantee that Results/Compare
are unaffected than a passing runtime re-check would have been, since
there is no shared code for a regression to hide in.

**Implementation fact vs. verification-record distinction (raised by the
user during review, corrected precisely rather than glossed over):**
`grep -n "portrait: {"` across both seed files confirms Leonardo da
Vinci is CURRENTLY the only person with a populated `portrait` field.
This is a fact about the current state of `src/data/people/*.ts`. It is
NOT a correction to CLAUDE.md's pre-existing "Population status: 5 of 35
people have verified data" record (da Vinci, Marie Curie, Yi Sun-sin,
Zheng He, Ibn Khaldun) — that record was about verified EXTERNAL
IDENTITY metadata (Wikidata QID, Wikipedia links), a claim that remains
true and was never about portraits for all 5. Re-reading it directly
confirms it only ever asserted da Vinci's portrait specifically was
verified, singular, correctly. Nothing in the existing record was wrong;
CLAUDE.md was NOT rewritten, only a clearly-labelled cross-reference
addendum was added at that paragraph, distinguishing "verified" from
"currently populated in the dataset." This mattered concretely because
the representative Person visual-test matrix needed one person on the
portrait code path (`align="start"` + `portraitCaption`) — da Vinci is
the only person that can exercise it today.

**Playwright harness hardened twice this stage, both real findings from
doing the work, not anticipated in advance:**
1. **`assertNoClippedElements` false-positive.** Landing (Stage 1) never
   exercised `.tgi-visually-hidden` (the project's sr-only clip-rect
   pattern) since it has none; Person renders many
   (`ImpactBadge`/`ConfidenceIndicator`/`ScoreBar` labels), and the
   original helper flagged all of them as "clipped" — correct behavior
   for that CSS pattern, a real bug in the *check*, not the product.
   Fixed by skipping any element inside `.tgi-visually-hidden`.
2. **`next dev` → production build.** Two separate full-suite runs each
   failed one DIFFERENT test; both passed cleanly in isolation every
   time — the signature of dev-mode's on-demand, serialized route
   compilation contending under this suite's real parallelism (11
   workers), not a flaky test or a real page bug. Increasing the test
   timeout to 90s did not fix it — it just flaked on a different test —
   confirming the cause was contention, not insufficient time. The
   harness now runs `next build --webpack && next start`, which has no
   on-demand compilation to contend over; confirmed stable across two
   consecutive full 53-test runs post-fix, and noticeably faster (no
   per-route cold-compile cost paid during the run itself).

**Representative visual-test matrix** (three people, not all 70 routes,
per this stage's own preference for the smallest matrix that provides
the same signal): `leonardo-da-vinci` (long name, the one portrait
case), `ada-lovelace` (no portrait), `yi-sun-sin` (no portrait, Korean
display name "이순신" much shorter than "Yi Sun-sin" — real
localisation-driven length variation) — × en-US/ko-KR × six viewports
(390/768/1024/1280/1600/1920) = 36 tests, plus 3 targeted tests (DOM
order primary-before-secondary with no CSS `order`, wikipedia/compare
link integrity, no-portrait rendering) = 39 total, all in
`e2e/person.visual.spec.ts`.

**Verification, final.** `tsc --noEmit` clean · `vitest run` **420/420**
(unchanged — no `src/core` file touched) · `next build --webpack` clean,
**84 routes**, all 70 person pages still `●` SSG, static/dynamic split
identical throughout every step of this stage · Playwright **53/53**
(14 Landing + 39 Person), confirmed stable across repeated full runs ·
zero console/page errors, zero horizontal overflow, zero clipped
elements at any tested width/locale · confirmed gitignored: screenshots
and playwright output; confirmed no stray files, no secrets, no auth/
Supabase/scoring/dataset-content changes; confirmed Results/Compare/
`layout.tsx` all at zero diff.

**Anti-AI-template principle, applied not just declared** (see
CLAUDE.md's dedicated section, adopted mid-stage at the user's explicit
instruction, researched against current 2024-2026 design commentary
before being written down): the hero + Known For pairing uses real
content that already carried meaning (`ImpactBadge`'s glyph+label
discipline predates this stage) rather than a decorative card added to
fill space; no new gradient/shadow/radius pattern was introduced; both
the Sources and Opposite Profile fixes *remove* an accidentally
oversized bordered region rather than add a new one — the direction this
principle argues for by default.

**Stage 10D-2 is FORMALLY CLOSED, human-approved (2026-08)** — the
Person Detail editorial layout, hero + Known For pairing, Sources width
restraint, and Opposite Profile single-card width fix were explicitly
approved against real screenshots, same closure discipline as every
other stage in this project.

## Stage 10D-3 record (2026-08) — Live Results Editorial Layout, FORMALLY CLOSED, human-approved

**Live Results only.** The densest page in the product and the one
carrying the most Phase 10C behavioral contracts (signed-out save CTA
placement, `#comparison` anchor). **Saved Result's own wide-desktop
composition is deliberately deferred to its own follow-up stage** — it
has real content-parity questions (the audit found several sections the
snapshot already carries data for but the page doesn't render — dual-
edged, Where You Differ, Your Advantage — plus component asymmetries
like `TraitChip` vs. `TraitCard`) that are product decisions, not layout
ones, and folding them into a pure layout pass would have muddied both.
Compare, Person, Landing, and Account were not touched at any point in
this stage.

**Spotlight-card geometry bug — measured, not estimated.** "Your
Unexpected Match" and "Your Opposite Profile" each wrapped a single
`PersonCard` in a `Card` with no width constraint, so the card filled
the container and its 4:5 portrait aspect-ratio scaled into an oversized
block. A pre-implementation audit draft had *estimated* this at "roughly
1850px wide" — that number was flagged during review as inconsistent
with `.tgi-container`'s own 80rem/1280px ceiling and was never actually
measured. The real, DOM-measured figures, taken on a synthetic fixture
at 1920px: **1148px → 332px wide, 1435px → 579.5px tall** after the
fix. Only the earlier estimate is wrong and excluded from this record;
the diagnosis itself (single item + no width cap + aspect-ratio
amplification) was correct throughout. Fixed with a page-scoped
`maxWidth: "24rem"` wrapper — `PersonCard`/`Card`/`Grid` untouched.

**Round 2 (after first visual review) — Unexpected Match + Opposite
Profile paired into one row at ≥1280px.** The geometry fix alone left
each card with a large unused region beside it; since the two sections
are semantic peers (both single-person spotlight moments), they now
share `.tgi-results-spotlight-pair`
(`grid-template-columns: repeat(2, minmax(0, 24rem))`). **A second
measurement bug caught during this same round**: the grid container's
own box measured 1200px wide despite its two capped tracks only needing
816px combined — a block-level `display: grid` element doesn't shrink
to its tracks just because the tracks are fixed-width, confirmed by
measuring, not assumed. Fixed by adding `max-width: 51rem`; re-measured
at exactly 816px after the fix. **Pairing applies only when BOTH are
real matches** — when Unexpected Match has no real match (the empty-
state message), Opposite Profile renders as a standalone controlled
spotlight instead, per explicit review feedback that pairing a short
empty-state box against a full PersonCard would be its own "awkward
half-column" defect. Below 1280px, unchanged stacked order, DOM-order
verified by direct index comparison in a permanent test, not assumed
from the CSS.

**Greatness hero**: `Rail` (`.tgi-rail--tight`) pairs score/band
(primary) with archetype note + explainer (secondary) at ≥1280px.
**Archetype callout flattened, not a Card** — tried first as a plain
accent-rule note (border-left + typography) per the project's
anti-AI-template principle; confirmed sufficient by screenshot
inspection, not assumed to be sufficient. **Closest Match retained
completely unchanged** — confirmed by direct diff that this block was
never touched across either round of this stage; it remains the one
place a full semantic `Card` is justified. **Phase 10C's save-CTA DOM
contract** (Closest Match → SignInCta → deeper sections) re-verified by
direct text-offset measurement in the live DOM, now a permanent
regression test, not just re-stated as still true.

**Signature + Dual-Edged**: new `.tgi-results-trait-pair` — an
**equal-width** grid (`1fr 1fr`, `max-width: 56rem`), deliberately NOT
`Rail` (whose secondary column reads as subordinate by design, wrong for
two peer `TraitCard`s). Active only at ≥1280px and only when both exist;
when Dual-Edged is absent, Signature falls through to its original
single `.tgi-measure-stack` treatment, verified with a dedicated
synthetic no-dual-edged fixture (`lowNoDualEdged`), not just reasoned
about from the conditional's shape.

**Comparison**: You Both pairs with Your Advantage via `Rail`
(`.tgi-rail--tight`) at ≥1280px when Advantage exists — found via a real
fixture search (a small script swept 35 likert/choice-pattern
combinations against `advantageTraits`'s actual gating logic; 13
produced a non-empty result), not faked or assumed reachable. Where You
Differ becomes its own full-width section afterward. **This reorders
Your Advantage to sit right after You Both instead of last, at every
width** — a deliberate, explicitly-flagged DOM reorder, not a CSS
`order` trick (a real reorder was the only way to achieve the requested
visual pairing without violating this project's existing "never fake
visual order with `order`" Rail contract). When Advantage is absent, You
Both renders alone; confirmed the comparison section creates no `Rail`
at all in that case (`.tgi-rail` count stays at exactly 1, the hero's).
**`#comparison` anchor preserved exactly** — same id, click-and-scroll
behavior confirmed by a live test, not just unchanged markup.

**Round 2 — mobile discovery grids.** Category Matches (7 cards) and Top
Matches (5 cards) collapsed to a long single-column stack below 768px.
Measured for the `neutral` fixture, before → after:

| | Before | After | Change |
|---|---|---|---|
| Total page height (390px) | 13242px | 8603px | −35% |
| Category Matches section | 4271px | 1614px | −62% |
| More People Worth Meeting section | 3207px | 1273px | −60% |
| Per-card size | 356×582px | 171×374px | — |

Fixed with `.tgi-results-discovery-grid`, forcing 2 columns at ≤640px —
reusing the `.tgi-filter-bar` breakpoint already established elsewhere
in `components.css`, not a new arbitrary value. All person metadata
(name/subtitle/lifespan/match%) preserved unchanged; no padding or
type-scale reduction was applied — the screenshots at this card size, in
both EN and KO, were legible without it, so the more invasive change
named as a fallback option in the review request was never needed.
768px+ confirmed unaffected (still 3-column `auto-fit`).

**Five synthetic, deterministic fixtures**, generated via
`encodeResultToken` (pure `src/core/quiz` export) against fixed answer
patterns — none is or contains real user data, none committed as such:

| Fixture | Purpose | Greatness | Dual-edged | Advantage |
|---|---|---|---|---|
| `neutral` | baseline, full responsive matrix | 52 | 1 | 0 |
| `high` | high-Greatness shape | 88 | 1 | 0 |
| `lowNoDualEdged` | dual-edged-absent branch | 5 | 0 | 0 |
| `mixed` | multiple dual-edged candidates | 88 | 3 | 0 |
| `advantagePresent` | Advantage present; also Unexpected-absent | 97 | 1 | 2 |

**Verification, final.** `tsc --noEmit` clean · `vitest run` **420/420**
(unchanged — no `src/core` file touched, confirmed by both the diff and
the unchanged test count) · `next build --webpack` clean, **84 routes**,
static/dynamic split identical throughout every step of both rounds ·
Playwright **88/88** (56 prior + 32 Results, covering both the initial
implementation and the follow-up round) · zero console/page errors, zero
horizontal overflow, zero clipped elements at any tested width/locale/
fixture · confirmed zero diff on `src/ui/components/layout.tsx` and
every Person/Compare/Account/Landing file throughout the entire stage ·
confirmed no scratch/probe scripts remain (several were used during
development — geometry measurement, fixture search — all deleted before
each commit) · confirmed no real result token appears anywhere in the
diff or the test file.

**Stage 10D-3 is FORMALLY CLOSED, human-approved (2026-08)** — every
composition decision (hero rail, flattened archetype, Closest Match
retained as-is, the spotlight pairing and its absent-branch fallback,
the Signature/Dual-Edged pairing and its absent-branch fallback, the
comparison rail and its absent-branch fallback, and the mobile
discovery-grid density fix) was explicitly approved against real
screenshots across two separate rounds of review — the second round
specifically because the first pass's screenshots themselves surfaced
two remaining problems (spotlight dead space, mobile grid repetition)
that were then fixed and re-reviewed, not silently accepted.

**Known non-blocking item, recorded for a future micro-polish pass:**
the "Save your result" sign-in CTA (`SignInCta`, Phase 10C) still
renders as a centered sunken card between Closest Match and the deeper
sections — visually a bit heavier now that the nearby archetype note has
been flattened to plain typography. A future pass may reconsider its
visual weight but must preserve every Phase 10C behavioral contract
(DOM position, signed-out-only visibility, "saved" only ever claimed
after directly observing the pending-queue transition) — presentation
only, never the underlying logic.

## Stage 10D-3 Follow-up record (2026-08) — Saved Result Historical
## Parity, FORMALLY CLOSED, human-approved

**Scope: Saved Result (`/account/results/[id]`) only.** No schema
change, no Supabase change, no auth change, no Live Results change, no
Compare/Person/Landing/Account-history change. Confirmed by `git diff
--stat` at every step of this follow-up: `db/schema.sql`, every
`db/migrations/*.sql`, `app/[locale]/results/page.tsx`,
`app/[locale]/compare/[slug]/page.tsx`, every Person/Landing/
Account-list file, `src/core/**`, and `src/ui/components/layout.tsx` all
showed zero diff throughout.

**Core question resolved: what does "historical parity" actually mean?**
Not "expose everything the snapshot stores." The working rule adopted
and applied throughout: Saved Result reproduces a Live Results
interpretation only when it is (a) genuinely part of Live Results' own
current UI and (b) fully reconstructible from frozen `ResultSnapshotV1`
fields plus presentation-only lookups (locale strings, stable-id person/
attribute labels). Two fields the snapshot stores but Live Results never
renders — `greatness.components` and `greatness.secondaryArchetypeId` —
were verified absent from `app/[locale]/results/page.tsx` by direct
inspection before being excluded here, not assumed.

**Architecture — `SavedResultView` extraction.** Before this follow-up,
all of Saved Result's JSX lived directly in `page.tsx` alongside its
Supabase/auth logic, which made it impossible to render for a test
without a real session. Extracted into `src/ui/savedResult/
SavedResultView.tsx`, a pure component taking only `{snapshot, locale}` —
the page now does only auth/lookup state resolution, then hands off.
This mirrors Phase 10C's `resultView.ts`/`computeResultView` "parity is
structural, not conventional" split, applied to the presentation layer.
A dedicated Vitest regression test
(`SavedResultView.boundary.test.ts`) parses the real import statements
of both files and fails if any forbidden `src/core/quiz|matching|
greatness|interpretation` import, or forbidden function name
(`scoreQuiz`, `buildResultSet`, `computeGreatnessPotential`,
`computeResultView`, `renderComparison`, `selectComparisonTemplate`),
ever appears — a hard guard against a future accidental historical-
fidelity regression, not just a one-time manual check.

**Content added, section by section, with the specific safety reasoning
per item:**
- **Greatness band + disclaimer + flattened archetype note**, paired via
  `Rail` — identical composition to Live's hero, reused verbatim; reads
  only `snapshot.greatness.bandId`/`snapshot.resultArchetype`.
- **Signature Trait upgraded `TraitChip` → `TraitCard`.** The one
  genuinely load-bearing finding of this follow-up: Live's Signature
  `context` string interpolates `ATTRIBUTES[id].reference.mean` — CURRENT
  taxonomy metadata a future `reference_v4` could change, which would
  silently rewrite the prose shown for an old saved result even though
  nothing about that result actually changed. `SavedResultView` never
  reads `.reference` anywhere; its context is built purely from two
  pre-existing static i18n strings needing no interpolation at all — no
  new copy authored, historical fidelity preserved by construction, not
  by convention.
- **Dual-Edged Trait** — frozen `attributeId`/`score` + `snapshot.
  traits[...].confidence` (the top-level `dualEdged` object itself
  doesn't carry confidence, so it's looked up from the full per-attribute
  `traits` record, which does). Paired with Signature via
  `.tgi-results-trait-pair`, reused unchanged from Live.
- **Closest Match `explanationTrait`.** Frozen in the snapshot, part of
  Live's presentation — but Live renders it via `renderComparison`/
  `selectComparisonTemplate`, which picks a template from the CURRENT
  `DIFFERENCE_THRESHOLDS` constant, a forbidden interpretation-selection
  path. Rendered instead as a `ComparisonBar` (already used elsewhere on
  this exact page) — same frozen numbers, a different but equally valid
  presentation, not a downgrade.
- **Full 34-trait "All Traits" breakdown**, same collapsed `<details>`
  pattern as Live, sorted by the FROZEN `z` already stored per-attribute
  — never recomputed from current `reference.mean`/`.sd`.
- **Where You Differ + Your Advantage**, reading only the frozen
  `snapshot.comparison.userHigherTraits`/`personHigherTraits`/
  `advantage` arrays (already sliced to Live's lengths); paired with You
  Both via `Rail` when Advantage exists, exactly Live's composition.
- **Methodology panel** — fully static, copied verbatim.
- **`.tgi-results-discovery-grid`** mobile 2-column class applied to
  Category Matches, reused unchanged from Live's own mobile follow-up.

**Deliberately still absent:** Unexpected Match/Opposite Profile/Top
Matches (never persisted into `ResultSnapshotV1` at all — confirmed via
`resultView.ts`'s own scoping comment, not reconstructed, no filler
substituted); Greatness `components`/`secondaryArchetypeId` (stored but
not canonically Live-visible); Closest Match portrait/`IdentityHero`
(explicitly deferred — this pass never makes rendering depend on live
portrait availability, keeping the stable-id + frozen-`personNames`
fallback as the only person-resolution path).

**Two refinements from the first human review round, both implemented
and re-verified:**
1. **Section order corrected** to match Live's canonical Category-
   Matches-before-Trait-Profile sequence (was the reverse) —
   presentation ordering only, divider placement now mirrors Live
   exactly, locked by a new DOM-order regression test.
2. **Closest Match explanation bar width-constrained.** Was initially
   allowed to span the full Closest Match Card width on wide desktop —
   inconsistent with the established Phase 10D principle that individual
   comparison bars stay at a controlled readable width. Fixed with a new
   page-scoped `.tgi-savedresult-explanation` class (`max-width: 40rem`,
   no `margin-inline`) — deliberately NOT `.tgi-measure-stack` (which
   centers via `margin-inline: auto`), since this bar needed to stay
   flush-left with the Card's other left-aligned content, not centered.
   `ComparisonBar` itself untouched.

**Testing architecture — fixtures without Supabase.** No new Next.js
route was added; the build's route count and static/dynamic split stayed
exactly unchanged throughout. Instead, `src/dev/savedResultPreview.tsx`
mirrors `gallery.tsx`'s own "render the REAL component with handcrafted
data to static HTML" pattern exactly: renders `SavedResultView` against
5 synthetic `ResultSnapshotV1` fixtures (`src/dev/
savedResultFixtures.ts` — `normal`, `dualEdgedAbsent`,
`advantagePresent`, `removedClosestPerson` for the frozen-fallback path,
`minimal` stressing every absent branch at once) to
`test-artifacts/saved-result-preview/*.html` (gitignored, regenerated
fresh before every Playwright run via a new `globalSetup.ts`), which
`e2e/savedResult.visual.spec.ts` opens directly via `file://` — the real
component, zero mocking, zero Supabase. One test still hits the real,
live `/account/results/[id]` route unauthenticated, confirming the
`auth_required` gate still works signed-out (no session needed to verify
that, since signed-out is the default state).

**Verification, final.** `tsc --noEmit` clean · `vitest run` **422/422**
(420 baseline + 2 new: the `SavedResultView` import-boundary guard) ·
`next build --webpack` clean, **84 routes**, `/account/results/[id]`
still `ƒ` dynamic, split unchanged throughout every step · Playwright
**115/115** (110 prior + 5 new: the section-order regression guard, and
4 explanation-bar width/responsiveness checks across EN/KO) · zero
console/page errors, zero horizontal overflow, zero clipped elements at
any tested width/locale/fixture · confirmed gitignored (`test-artifacts/
saved-result-preview/`, `test-artifacts/saved-result-screenshots/`), no
stray scratch/probe files, no secrets, no real user result token
anywhere in any fixture (all handcrafted, documented as synthetic in
both new files' own header comments).

**Stage 10D-3 Follow-up is FORMALLY CLOSED, human-approved (2026-08)** —
the snapshot-only rendering boundary, Greatness band/disclaimer,
flattened archetype note, non-exposure of internal Greatness components/
secondary archetype, frozen `explanationTrait` presentation and its
constrained width, historically-safe Signature treatment, frozen
Dual-Edged Trait, Category-Matches-before-Trait-Profile reorder, full
Trait Profile breakdown, You Both/Where You Differ/Advantage, methodology
disclosure, continued absence of Unexpected/Opposite/Top Matches, and the
mobile discovery-grid treatment were all explicitly approved against real
screenshots across two rounds of review.

## Stage 10D-4 record (2026-08) — Compare Editorial Layout, FORMALLY
## CLOSED, human-approved

**Scope: Compare (`/compare/[slug]`) only.** No `src/core`, Supabase,
auth, snapshot-schema, scoring/matching, or dataset change. Confirmed by
`git diff --stat` throughout both rounds: `src/core/**`, `src/lib/**`,
`db/**`, `src/ui/components/layout.tsx`, `src/ui/savedResult/**`, and
every Results/Saved-Result/Person/Landing/Account file all showed zero
diff.

**Root problem, audited before implementation.** Unlike every prior
Phase 10D page, Compare had no wide-desktop composition at all — nearly
every section (`.tgi-measure-stack`, 40rem/centered) rendered
pixel-identically narrow from 1280px through 1920px, confirmed by direct
screenshot comparison at both widths. The hero was audited separately
and found NOT to need a fix: `IdentityHero`'s content is intrinsically
sized, not a growable flex child, so it stayed compact and left-aligned
at 1920px with and without a portrait — verified live before ruling it
out of scope, not assumed.

**Round 1 (approved, human-reviewed against real screenshots):**
- `.tgi-compare-share-differ` — What You Share + Where You Lean
  Differently as equal-width plain columns at ≥1280px (peer pairing,
  like Results' Signature/Dual-Edged, not Rail's primary/secondary
  asymmetry, since the two sections are true peers). Single-section
  fallback verified with a REAL fixture, not assumed: an all-max-answers
  token against Confucius genuinely empties "Where You Lean Differently"
  while "What You Share" stays populated — confirmed live before writing
  the fixture into the test suite.
- `.tgi-compare-card-grid` — Learn From (1-3 items) / Worth Exploring
  (0-2 items) become content-driven grids at ≥1280px, FIXED `22rem`
  tracks (never `1fr`) so a lone card can't stretch to the full
  container — the same failure class as Person's Opposite Profile and
  Results' spotlight cards, fixed structurally here for any item count.
- **A real regression was caught mid-round, not after ship**: removing
  the blanket `.tgi-measure-stack` from the "Learn From Them" section's
  outer wrapper (needed so the card grid could use full width at
  ≥1280px) left the card-list `Stack` with NO width constraint below
  1280px — a live Playwright measurement found a bar at **894px** at
  1024px. Fixed by giving `.tgi-compare-card-grid` the identical base
  40rem/centered state `.tgi-measure-stack` has, overridden only at
  ≥1280px; re-verified pixel-identical to the pre-change 1024px view.
- Verified at this round's close: `tsc`/`vitest` (422/422)/`build`
  (84 routes, unchanged) all clean, Playwright **137/137** (115 + 22 new).

**Round 2 — two design experiments, decided from real rendered
comparisons, not from reasoning alone:**
- **Experiment 1, KEPT**: `.tgi-compare-edge-dontcopy` pairs Where You
  Bring Something Different (plain bars/prose) with What Not to Copy
  (existing sunken `Card`s) at ≥1280px. The brief explicitly asked
  whether this natural asymmetry reads as a coherent pair rather than a
  mismatched grid — measured (576px columns, cards fill their column
  exactly, zero overlap) and screenshotted in EN and KO before the
  answer was "yes, keep it, don't flatten the cards to force symmetry."
  "What Not to Copy" is never fully absent (its own empty-state
  sentence), so the only fallback case is `yourEdge` empty, in which
  case it renders alone exactly as before.
- **Experiment 2, REJECTED**: a Facet Similarity wide-desktop
  composition (7 `ScoreBar`s as `Rail`'s primary column, heading+intro
  as secondary) was actually built — not just proposed — bars measured
  at 544px (reusing an already-existing global `.tgi-rail__primary
  .tgi-measure-stack` rule, zero new CSS), and screenshotted at every
  required width and locale. It was then rejected on a genuine,
  reproduced defect, not a style preference: `Rail` always renders
  primary before secondary in DOM order regardless of breakpoint, so
  below 1280px the ScoreBars appeared BEFORE their own section heading —
  a Playwright test was written that explicitly reproduces this failure
  (`order!.trackIdx` before `order!.headingIdx`) before the rejection
  decision was made. Facet Similarity was fully reverted: no `Rail`
  import remains in the Compare page, original DOM order, original
  ~40rem controlled measure — confirmed no Option-B-specific CSS had
  ever been added (it only ever reused a pre-existing global rule), so
  nothing needed removing from `components.css` on that side. The
  experiment-only spec file (`compare.experiments.visual.spec.ts`,
  including the test that intentionally asserted the known-bad
  ordering) was deleted outright, not kept disabled; its still-relevant
  assertions (§5/§6 pairing correctness) were rewritten without the
  "Experiment" framing and folded into `compare.visual.spec.ts`, since
  that pairing is now permanent, approved behavior, not an experiment.

**Verification, final.** `tsc --noEmit` clean · `vitest run` **422/422**
(unchanged — no `src/core` file touched throughout either round) ·
`next build --webpack` clean, **84 routes**, `/compare/[slug]` still
`ƒ` dynamic, split unchanged throughout every step of both rounds ·
Playwright **145/145** (115 pre-Compare baseline + 22 Round 1 + net 8
Round 2 — 9 experiment-only tests removed, 17 replacement tests added
enforcing only the final approved behavior) · zero console/page errors,
zero horizontal overflow, zero clipped elements at any tested
width/locale/fixture tested · confirmed gitignored screenshot output, no
stray scratch/probe scripts, no secrets, no real user result token
anywhere (all fixtures synthetic via `encodeResultToken`, documented in
the spec file's own header comment, same discipline as every other
Phase 10D Playwright suite).

**Stage 10D-4 is FORMALLY CLOSED, human-approved (2026-08)** — the
Share/Differ peer-column pairing and its live-confirmed single-section
fallback, the Learn-From/Worth-Exploring content-driven grids (including
the mid-round 894px regression found and fixed), the Where-You-Bring-
Something-Different/What-Not-to-Copy pairing with its deliberately
preserved bars-vs-cards asymmetry, and the decision to keep Facet
Similarity in its original controlled treatment after a real, measured,
screenshotted Option B was built and rejected on a genuine defect, were
all explicitly approved against real screenshots across two review
rounds. This closes the Phase 10D wide-desktop layout initiative at the
page level entirely — Landing, Person, Live Results, Saved Result, and
Compare are all now resolved. Only the final, cross-page visual-
consistency/micro-polish pass remains, and it has not started.

## Exact next task for a fresh session

1. Read `CLAUDE.md`'s Status section (including "Phase 10C — historical
   result fidelity", "Phase 10D-1", "Phase 10D-2", "Phase 10D-3",
   "Phase 10D-3 Follow-up", and "Phase 10D-4"), this file, and
   `docs/deployment.md` in full.
2. Phase 9 is closed and frozen — do not reopen it. Stage 10A, 10B, 10C,
   Phase 10D Stages 1-4, and the Phase 10D-3 Saved Result Historical
   Parity Follow-up are all closed — do not redo their audits,
   re-litigate the site-origin/historical-fidelity/auth-state/rail-
   breakpoint/snapshot-parity/Compare-pairing/Facet-Similarity designs,
   repeat the git/GitHub/Vercel setup, redo the migration, redo the
   backfill, or re-run the Phase 10D layout audit. **Every page-level
   Phase 10D wide-desktop layout candidate (Landing, Person, Live
   Results, Saved Result, Compare) is now resolved.** Do not re-litigate
   the Facet Similarity Option B rejection without genuinely new
   evidence — it was rejected on a reproduced, tested defect (broken
   below-1280px reading order), not a style preference.
3. **Reuse, don't rebuild**, for any future Phase 10D work: the
   Playwright harness (`playwright.config.ts`, `e2e/utils/visualChecks.ts`)
   — running against a production build, not `next dev`, see "Stage
   10D-2 record" for why — and the "automate everything reasonably
   automatable before asking for human validation" testing policy both
   apply going forward. The `Rail`/`IdentityHero` primitives (`src/ui/
   components/layout.tsx`) remain proven unchanged since Stage 1 (zero
   diff, re-confirmed after every subsequent stage including Compare,
   where a `Rail` usage was added for an experiment and then fully
   reverted without ever touching the primitive itself). The wide-desktop
   breakpoint is **≥1280px**, decided and shipped in Stage 1 — do not
   reopen that decision without new evidence. The mobile discovery-grid
   breakpoint (**≤640px**, `.tgi-results-discovery-grid`) reuses the
   pre-existing `.tgi-filter-bar` breakpoint. The "build the real
   experiment and measure it before deciding" discipline Compare's Round
   2 used (an actual Rail composition was built, measured, screenshotted,
   AND had a Playwright test reproduce its defect before being rejected)
   is the model for any future genuinely-open visual decision — don't
   decide from reasoning alone when the real thing is cheap to render.
   The "Anti-AI-template / human-authored design principle" section in
   `CLAUDE.md` (adopted during Stage 2) applies to every future visual
   decision, not only Phase 10D — read it before any further layout or
   copy work.
4. Candidates already on record, each requiring its own fresh, explicit
   decision — none approved yet:
   - **Phase 10D Stage 5 — the final, cross-page visual-consistency /
     micro-polish pass** (kept deliberately separate from each page's
     own layout work, per the original Stage 1 audit's own instruction)
     — this is now the ONLY item standing between Phase 10D and being
     marked fully closed. See `CLAUDE.md`'s Phase 10D-1 section for the
     reasoning behind keeping it a distinct, later stage rather than
     folding it into each page's own closure.
   - A small, non-blocking micro-polish item recorded at Stage 3 closure:
     the Results-page `SignInCta` sunken-card treatment could be
     revisited for a flatter editorial look (matching the now-flattened
     archetype note nearby) — presentation only, every Phase 10C
     behavioral contract must stay untouched.
   - A small, non-blocking item deferred at the Follow-up's own closure:
     Closest Match portrait/`IdentityHero` adoption for Saved Result —
     deliberately not bundled into this pass; would need its own review
     of the "removed person has no portrait" fallback question.
   - Full SEO pass, share cards/OG images, portraits pipeline,
     analytics, ads, and eventually a custom branded domain (would also
     require revisiting `NEXT_PUBLIC_SITE_URL` and the Supabase/Google
     redirect-URL allow-lists a second time for the new domain).
5. Preserve the broader Phase 10 boundaries throughout whichever stage is
   chosen next: no invented privacy-policy/business facts, no unrequested
   scope expansion.
