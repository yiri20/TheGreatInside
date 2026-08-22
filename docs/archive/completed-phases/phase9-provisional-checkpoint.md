> **ARCHIVED — historical reference only. Do not load by default.**
>
> This file is preserved for provenance/traceability. For current project
> state, see [`docs/context/CURRENT_STATE.md`](../../context/CURRENT_STATE.md).
> For active workflows, see `docs/workflows/`, `docs/checkpoints/`, and
> `docs/reference/`. Only open this file to resolve a specific historical
> question this session actually needs answered.

# Phase 9 — Accounts — provisional checkpoint

**Status: PHASE 9 FORMALLY CLOSED, human-approved (2026-08).** Stage 9A
(architecture audit), Stage 9B (DB/RLS + `@supabase/ssr` foundation),
Stage 9C (canonical `saveCompletedResult` primitive), and Stage 9D (auth
UX, wired end-to-end) are all FORMALLY CLOSED — see each stage's own
record below for the full history. Summary: the original OAuth failure's
confirmed root cause was an unsaved `.env.local` in a text editor (real
keys typed but never written to disk) — NOT a code bug, and NOT the
`redirectTo` query-parameter hypothesis explored while investigating
(kept in this document only as a preserved, reasoned, but ultimately
incorrect hypothesis). After OAuth itself was fixed, the pending-result
migration failed for two further, sequential, fully-diagnosed reasons —
`completed_at` missing live (migration 0002 applied) and, the actual
final blocker, `quiz_versions` never seeded with `quiz_v2` (fixed by
migration 0003, idempotent). All 12 original human E2E checks are
confirmed passing live by the user.

**Closeout audit correction (2026-08):** this document previously stated
that a "Stage 9E+ (history, privacy/deletion, locale, testing)" breakdown
was next, "per the original Phase 9 spec the user gave when opening this
phase." **That attribution was never verified and is corrected here**: no
record in this document or `CLAUDE.md` shows the user actually specifying
that breakdown — it was an assistant-authored continuation plan, carried
forward through checkpoint updates as if it were a confirmed requirement.
Phase 9's actual, user-approved scope (Stage 9A's decision: "Supabase Auth
+ Supabase Postgres" for account persistence) is fully delivered and
verified. A future account-history page, deletion flow, etc. remain
reasonable candidate features, but are NOT documented Phase 9 debt and
are NOT a "Stage 9E" — any future work in that direction should be freshly
scoped and approved as its own phase, not assumed from this label. See
"Phase 9 closeout audit" near the end of this file for the full audit
record.

This is the
durable resume point for a fresh session — read this file plus
CLAUDE.md's "Status" section before touching Phase 9 again. Phases 6.6, 7,
and 8 are CLOSED and frozen; nothing in this document proposes touching
any of them.

## Stage 9B closure correction (2026-08)

An earlier version of this checkpoint declared Stage 9B "COMPLETE" and
described `db/migrations/0001_stage9b_accounts.sql` as "run by the user"
based only on: the migration file being written, `tsc`/`vitest`/`pnpm
build` all passing locally, and the user having been *asked* to run the
migration in the same turn — without waiting for the user to actually
confirm they'd run it against the live Supabase project. That was
premature: local build success proves the code is correct, not that the
live database matches it. The user caught this and asked for a correction
rather than letting the record stand. **The live migration is now
independently confirmed** — the user pasted the full contents of
`0001_stage9b_accounts.sql` into the Supabase SQL Editor and it returned
"Success. No rows returned." Stage 9B is closed as of *that* confirmation,
not as of the earlier local-build pass. See "Stage 9B validation query"
below for how to verify this independently in any future session, rather
than trusting either this document's word or the user's report of the SQL
Editor output alone.

## Stage 9B record (2026-08)

Manual provisioning (all 8 steps in "Manual provisioning" below) was
confirmed complete by the user before any Stage 9B code was written, per
this checkpoint's own gate. What Stage 9B actually built:

**Migration** — `db/migrations/0001_stage9b_accounts.sql`, written this
stage and confirmed executed against the live, already-provisioned project
by the user ("Success. No rows returned" in the Supabase SQL Editor — see
"Stage 9B closure correction" above for why this confirmation is called
out as its own event rather than assumed from the file having been
written). A matching update landed in `db/schema.sql` itself in the same
stage, so a *fresh* project only ever needs to run one file, and the two
can't drift:
- `user_profiles.user_id` is now `NOT NULL references auth.users(id) on
  delete cascade` — a real FK, not the placeholder it shipped with.
- `anonymous_key` (on `user_profiles`) was **dropped**, not just left
  unused: Phase 9's confirmed scope (see "Corrected migration rule" below)
  never writes an anonymous row to the DB at all — the entire anonymous
  flow is URL-token + localStorage (Phase 6) — so the column had no future
  use under this design, not merely no current use.
- `user_profiles.result_token` (new, `NOT NULL`) stores the exact
  content-addressable token `src/core/quiz/serialize.ts`'s
  `encodeResultToken` already produces — the same string used for the `?r=`
  URL param and `tgi_last_result_v1`. `unique (user_id, result_token)` is
  the dedup constraint the original checkpoint asked for, implemented as
  literally the same token rather than a re-derived compound key.
- `saved_people.user_id` gained the same `references auth.users(id) on
  delete cascade` FK it never had — needed for correct cascade-delete on
  account deletion (Stage 9F), independent of RLS.
- RLS enabled on every `user_*` table and `saved_people`, one `for all`
  policy per table scoped to `auth.uid()` (via a join through
  `user_profiles`/`user_quiz_sessions` for the tables that don't carry
  `user_id` directly). Full policy text in the migration file and in
  `db/schema.sql`'s new "row level security (Stage 9B)" section.
- Also fixed in passing, found during this stage, unrelated to accounts
  specifically: `attribute_facet` (schema.sql) was still the original
  6-facet enum, missing `world_sense` (`taxonomy_v1.1`, Phase 6.6). Added
  before the user ran `schema.sql` for the first time. Purely a DDL gap
  (no seed data references it yet) — did not require its own migration
  step since it landed before the project's first schema run.

**`@supabase/ssr` foundation** (`@supabase/ssr@0.12.4`,
`@supabase/supabase-js@2.112.2`, `server-only@0.0.1`, new `@lib/*` tsconfig
path alias → `src/lib/*`):
- `src/lib/supabase/env.ts` — reads `NEXT_PUBLIC_SUPABASE_URL` /
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, throws an actionable error if
  unset rather than failing opaquely inside `createClient`.
- `src/lib/supabase/client.ts` — browser client (`createBrowserClient`).
- `src/lib/supabase/server.ts` — Server Component / Route Handler client
  (`createServerClient` + `next/headers` `cookies()`, which is `async` in
  this Next.js version). `setAll` is wrapped in try/catch for the
  Server-Component-can't-write-cookies case, matching the library's own
  documented pattern.
- `src/lib/supabase/middleware.ts` + root **`proxy.ts`** — session-refresh
  on every request. **Not explicitly named in this checkpoint's original
  Stage 9B plan** ("browser client and the server client"), added anyway:
  `@supabase/ssr`'s own docs treat skipping this as a correctness bug, not
  an optional extra ("IMPORTANT: If cookies cannot be set from pages or
  components, middleware *must* handle session updates — omitting it will
  cause significant and difficult to debug authentication issues: random
  logouts, early session termination..."). Server Components can't write
  response cookies, so without this, a refreshed token has nowhere to go.
  Named `proxy.ts` (not `middleware.ts`) — Next.js 16 deprecated the
  `middleware.ts` file convention in favor of `proxy.ts` (confirmed via a
  live build warning + the bundled Next.js docs, same "verify against
  current docs" discipline the Stage 9A key-model check used); the rename
  also resolved an Edge-Runtime `process.cwd` build warning, since `proxy`
  defaults to the Node.js runtime where `middleware` defaulted to Edge.
  **Deliberately does not gate any route** — it only refreshes an existing
  session cookie, never redirects an unauthenticated visitor, preserving
  the anonymous-first invariant.

**`/auth/callback` route** — `app/auth/callback/route.ts`, outside the
`[locale]` segment (matches the checkpoint's documented
`http://localhost:3000/auth/callback`). Reads `?code=`, calls
`exchangeCodeForSession` via the server client, redirects to a `?next=`
path (defended against open-redirect: must start with `/`, must not start
with `//`) on success, or to `/?auth_error=1` on failure/missing code.
**Deliberately minimal**: no Stage 9D sign-in UI exists yet to originate a
`redirectTo`, so this route only needs to exist and be correct in
isolation — verified by build (route compiles, appears in the route table
as `ƒ /auth/callback`) and by reading `exchangeCodeForSession`'s contract,
not by a live OAuth click-through (not possible without real sign-in UI to
initiate the flow from).

**Verification — two independent kinds, not to be conflated (see "Stage 9B
closure correction" above):**
- **Local/code**: `tsc --noEmit` clean, `vitest run` 268/268
  (byte-identical to Phase 8 close — Stage 9B touched zero `src/core`
  files, confirmed by `grep -ri supabase src/core` returning no matches),
  `pnpm build --webpack` clean, **82 routes** (the Phase 8 baseline of 81
  + `/auth/callback`), no build warnings. Live browser click-through of
  the anonymous quiz/results/compare flow was **not** re-run this stage
  (port 3000 was occupied by another session, and it's also the OAuth
  callback's hardcoded port) — the static build succeeding for all
  `/[locale]/quiz`, `/[locale]/results`, `/[locale]/people/[slug]`,
  `/[locale]/compare/[slug]` routes, combined with `proxy.ts` never
  redirecting under any condition, is offered as the evidence for this
  stage; a live check is worth doing before Stage 9D ships anything
  user-facing.
- **Live database**: confirmed by the user running
  `0001_stage9b_accounts.sql` in the Supabase SQL Editor ("Success. No
  rows returned"). Independently re-verifiable any time with the
  read-only, metadata-only query below — it inspects `pg_catalog`/
  `information_schema` only, touches no row data (the tables are empty
  regardless), and needs no secret key, just the SQL Editor:

```sql
-- Stage 9B validation query — safe to run any time, read-only, metadata only.
select 'user_profiles.user_id FK -> auth.users' as check_name,
  exists (
    select 1 from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    where t.relname = 'user_profiles' and c.contype = 'f'
      and pg_get_constraintdef(c.oid) ilike '%auth.users%'
  ) as passed
union all
select 'saved_people.user_id FK -> auth.users',
  exists (
    select 1 from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    where t.relname = 'saved_people' and c.contype = 'f'
      and pg_get_constraintdef(c.oid) ilike '%auth.users%'
  )
union all
select 'user_profiles.result_token column exists',
  exists (
    select 1 from information_schema.columns
    where table_name = 'user_profiles' and column_name = 'result_token'
  )
union all
select 'unique dedup index (user_id, result_token) exists',
  exists (
    select 1 from pg_indexes
    where tablename = 'user_profiles' and indexname = 'user_profiles_user_dedup_idx'
  )
union all
select 'anonymous_key column dropped (should be true)',
  not exists (
    select 1 from information_schema.columns
    where table_name = 'user_profiles' and column_name = 'anonymous_key'
  )
union all
select 'RLS enabled on all 7 target tables',
  (select count(*) from pg_tables
   where tablename in ('user_profiles','user_attribute_scores','user_quiz_sessions',
                        'user_quiz_responses','match_results','greatness_results','saved_people')
     and rowsecurity) = 7
union all
select 'all 7 expected owner-scoped RLS policies exist',
  (select count(*) from pg_policies
   where policyname in ('user_profiles_own','user_attribute_scores_own',
                         'user_quiz_sessions_own','user_quiz_responses_own',
                         'match_results_own','greatness_results_own','saved_people_own')) = 7;
```

  Every row should return `passed = true`. If any row is `false`, the live
  database has drifted from what this document and `db/schema.sql`
  describe — treat that as the authoritative signal over either file.

**What Stage 9B deliberately did NOT do** (explicitly Stage 9C/9D+ per the
task list below): no sign-in/sign-out UI, no "canonical result-save path"
application code (the function that actually inserts a completed result
into `user_profiles` on sign-in or quiz completion), no history page, no
account-deletion flow, no Korean auth-UI copy. This stage was schema +
transport only, exactly as scoped.

## Stage 9C record (2026-08) — FORMALLY CLOSED

Built the canonical completed-result persistence primitive both real entry
points (signed-in quiz completion, post-sign-in migration) will eventually
call. Went through three rounds of user review before implementation, each
correcting a real gap — full reasoning for every decision below is in the
session transcript, not repeated here in full; this is the durable summary.

**Provenance design — the core correction driving this whole stage.**
`tgi_last_result_v1` (Phase 6/7) means "last result VIEWED", which can
belong to someone else via a shared link — it must never be treated as
proof of ownership. `tgi_pending_own_results_v1` (new) is the
provenance-safe alternative: a bounded (5), deduplicated queue, written
ONLY from the single real completion point in the entire app
(`app/[locale]/quiz/page.tsx`'s `goNext()`, right where the token is first
produced from this browser's own just-submitted answers). Each queue entry
snapshots, at completion time: `resultToken`, `completedAt` (ISO 8601,
browser clock), and `provenance` (a full `VersionSnapshot` — quiz/scoring/
taxonomy/greatness-scoring/matching/calibration versions, all read from
`src/core`'s real constants at that moment). This snapshot travels with the
result so a completion saved to an account long after a later deployment
moved the algorithm forward still describes the versions that actually
produced it — never re-derived from "whatever is current" at save time.

**`src/core/versions.ts` (new)** — `VersionSnapshot`, `CURRENT_VERSIONS`
(assembled from the six existing `*_VERSION` constants),
`KNOWN_VERSION_SNAPSHOTS` (append-only registry, `[CURRENT_VERSIONS]`
today — the documented invariant is that a future `CURRENT_VERSIONS` bump
must add the OLD snapshot here first, never just move the pointer, so
already-pending anonymous completions from an older version combination
stay migratable), and `isKnownVersionSnapshot(v, registry?)`. Pure, zero
I/O — fits `src/core` cleanly. A dedicated regression test proves an older
snapshot stays independently valid alongside `CURRENT_VERSIONS` given an
appropriately extended registry (using a synthetic old snapshot — no real
second version combination has shipped yet).

**`src/lib/results/pendingOwnResults.ts` (new)** — the queue itself.
Injectable `PendingResultStorage` (a 3-method subset of
`window.localStorage`'s shape) rather than a hard `window.localStorage`
dependency, specifically so the queue mechanics (dedup, 5-entry cap,
FIFO eviction, malformed-JSON/malformed-entry tolerance) are unit-testable
under Vitest's `environment: "node"` config without adding jsdom.
`enqueuePendingOwnResult` is the only write path, called from
`quiz/page.tsx`; `readPendingOwnResults`/`clearPendingOwnResult` exist now
but have no caller until Stage 9D's migration flow.

**`src/lib/results/saveCompletedResult.ts` (new)** — the actual canonical
primitive. Dependency-injected (`SaveCompletedResultDeps`, a narrow
2-method structural subset of `SupabaseClient` — real Supabase client
passed in at Stage 9D's real call site, a plain mock in tests) rather than
constructing its own Supabase client, which is what makes the full
validation chain unit-testable without `next/headers`/`server-only` at
all. Validation order, all pure/no I/O until the last two steps:
1. `decodeResultToken` → `invalid_token`.
2. `decoded.responses.length !== QUIZ.questions.length` → `incomplete_token`
   (only a genuinely finished attempt may reach account history).
3. `encodeResultToken(decoded.responses, QUIZ) !== input.resultToken` →
   `noncanonical_token` — **strict rejection, never silent normalization**:
   a client string that merely decodes successfully (e.g. carries harmless
   trailing characters past the expected length) is refused outright,
   because the dedup guarantee ("same answers → same token, always, by
   construction") depends on only ever storing already-canonical tokens.
4. `!isKnownVersionSnapshot(input.provenance, knownSnapshots)` →
   `unknown_version_provenance`.
5. `input.provenance.quizVersion !== decoded.quizVersion` →
   `version_mismatch` — a KNOWN snapshot is not automatically the RIGHT
   snapshot for this token; matters once `KNOWN_VERSION_SNAPSHOTS` holds
   more than one real entry.
6. `completedAt` implausible (fails a strict ISO-8601 regex, fails
   `Date.parse`, or is more than 24h in the future — a generous
   clock-skew tolerance, not a security boundary) → `invalid_completed_at`.
7. `deps.auth.getUser()` resolves no user → `unauthenticated`. **No
   `userId` parameter exists anywhere in this module** — identity comes
   from nowhere else.
8. Upsert into `user_profiles`, `onConflict: "user_id,result_token"`,
   `ignoreDuplicates: true` (`ON CONFLICT DO NOTHING` — a duplicate save
   leaves the ORIGINAL row's historical version metadata untouched, never
   overwritten with whatever's current at replay time — locked by a
   dedicated test using a stateful mock). Persisted `quiz_version` comes
   from `decoded.quizVersion` (the token itself — the more authoritative
   source), not from `input.provenance.quizVersion`, per the "avoid
   duplicate sources of truth" instruction; the other five version columns
   and `completed_at` come from the completion-time snapshot.

**`src/lib/results/saveCompletedResultServer.ts` (new)** — the actual
`server-only`-guarded entry point. Thin: constructs the real client via
`@lib/supabase/server`'s `createClient()` and delegates to
`saveCompletedResult`. Has no caller yet (Stage 9D) and no test of its own
(the `server-only` import makes it unimportable under Vitest's Node
environment by design — verified this is the correct, deliberate split,
not an oversight: it has zero logic beyond wiring the real client into the
already-tested primitive).

**Migration `0002_stage9c_completed_at.sql` (confirmed executed live,
2026-08 — "Success. No rows returned" in the Supabase SQL Editor)** —
`user_profiles.completed_at timestamptz not null default now()`.
Deliberately **no** `check (completed_at <= created_at)` constraint — an
earlier draft proposed one and it was rejected: `completed_at` is a
browser-clock value, `created_at` is a Postgres-server-clock value, and
ordinary client/server clock skew could fail that constraint even for a
genuinely immediate, legitimate save. Plausibility is validated in
application code instead (`saveCompletedResult`'s `invalid_completed_at`
check above). `db/schema.sql` updated in the same change so a fresh
project only ever needs that one file.

**Wiring**: `app/[locale]/quiz/page.tsx`'s `goNext()` gained one
`enqueuePendingOwnResult(token)` call, right where the token is first
produced — no visible UI change.

**Deliberately NOT built this stage** (Stage 9D territory): no Server
Action/route caller for `saveCompletedResultServer`, no reading/clearing
of the pending queue anywhere, no sign-in UI, no history page, no
account-deletion flow. `user_attribute_scores`/`match_results`/
`greatness_results` writes remain deferred (approved) — those tables stay
untouched; only `user_profiles` gets written.

**Verification — both kinds, per the discipline "Stage 9B closure
correction" above established:**
- **Local/code**: `tsc --noEmit` clean; `vitest run` **298/298** (268
  Phase-8 baseline + 4 `versions.test.ts` + 10 `pendingOwnResults.test.ts`
  + 16 `saveCompletedResult.test.ts`); `pnpm build --webpack` clean, 82
  routes unchanged, no warnings; `grep -ri "supabase\|next/headers\|
  server-only" src/core` returns nothing — zero Stage 9C code touched
  `src/core`'s purity boundary.
- **Live database**: confirmed by the user running
  `0002_stage9c_completed_at.sql` in the Supabase SQL Editor ("Success. No
  rows returned"). Stage 9C's closure date reflects this confirmation, not
  the earlier local-only pass — unlike Stage 9B, this discipline was
  applied proactively this time (the checkpoint said "STOP and ask" before
  any closure language was written), not corrected after the fact.
  No new query is recorded for re-verifying this specific column live —
  the Stage 9B validation query's pattern (`information_schema.columns`)
  extends trivially if ever needed: `select exists (select 1 from
  information_schema.columns where table_name = 'user_profiles' and
  column_name = 'completed_at')`.

**Stage 9C is formally closed.**

## Stage 9D record (2026-08) — implemented, verified, NOT yet user-confirmed closed

Sign-in/sign-out UI plus the two real callers of Stage 9C's
`saveCompletedResult` primitive. Reported in full before implementation,
per instruction; the user chose "add a minimal global header now" (over
page-local-only controls) with an explicit, narrow brief: brand/home link,
subtle Sign in when signed out, Account entry + Sign out when signed in,
persistent auth-state visibility, no login wall, no full nav/mega
menu/sticky behavior, minimal vertical footprint especially on mobile,
and a natural (not-yet-linked-anywhere-else) entry point for Stage 9E.

**A real regression was found and fixed during this stage's own
validation, not left for later.** The first working draft resolved
sign-in state SERVER-SIDE in `Header.tsx` (an async Server Component
calling a new `getCurrentUser()` helper, itself calling `cookies()`).
`pnpm build --webpack` immediately showed the actual damage: every page
under `[locale]` — the 70 statically-generated person pages, the
directory, the landing page, and the quiz — flipped from `●` (SSG) to `ƒ`
(per-request dynamic), because `cookies()` anywhere in a *shared layout's*
render tree opts the whole route out of static generation, and `Header`
sits in `app/[locale]/layout.tsx`, which every page renders through. This
directly conflicted with "preserve the existing visual hierarchy and
anonymous-first quiz flow" and "no unrelated layout changes" from the same
message that scoped the header. **Fixed** by moving sign-in-state
resolution entirely client-side into `AuthControls.tsx` — `useEffect` +
`supabase.auth.getUser()` (browser client) + `onAuthStateChange` for
live updates after sign-in/out, rendering nothing while unresolved. This
is not a new pattern for this codebase: it's the exact same
"`undefined` = not yet resolved, render nothing rather than flash the
wrong state" rule `people/[slug]/CompareCta.tsx` already established in
Phase 7. Rebuilding after the fix reproduced the *original* pre-Stage-9D
route table exactly — full static generation restored, confirmed by
direct comparison of the build output, not just re-running the build and
hoping. `src/lib/supabase/getUser.ts` (the server-side helper) is kept,
unused by the header, documented as reserved for a genuinely per-request
page where dynamic rendering is already correct regardless — Stage 9E's
account/history page is the obvious future caller.

**Files**:
- `app/[locale]/Header.tsx` (new) — plain, static, non-async. Brand link +
  `<AuthControls>`.
- `app/[locale]/AuthControls.tsx` (new, client) — client-resolved sign-in
  state (see above). Signed out: one `variant="quiet"` "Sign in" button →
  `supabase.auth.signInWithOAuth({ provider: "google", options: {
  redirectTo: ".../auth/callback?next=<current path>" } })`. Signed in:
  "Account" (real link to `/${locale}/account` — that route doesn't exist
  until Stage 9E, so this is a known, honest, temporary 404, not a dead
  button) + "Sign out" (`supabase.auth.signOut()` + reload). No dropdown/
  menu component (the user offered either "Account entry + Sign out" or
  "one compact account menu" — the simpler, no-new-interactive-primitive
  option was chosen), no email/PII shown in the persistent header.
- `.tgi-header`/`.tgi-header__inner`/`.tgi-header__brand` (new, in
  `components.css`) — border-bottom + `--tgi-surface` background,
  `position: static` (non-sticky, nothing yet justifies it), `flex-wrap:
  wrap` so narrow viewports wrap rather than overflow, `--tgi-space-3`
  vertical padding (the design system's own existing "compact" step, not
  a new, unminimized value) — confirmed live at 375px: header height
  ~68.7px, `scrollWidth === viewportWidth` (no horizontal overflow).
- `src/lib/supabase/getUser.ts` (new, unused by the header — see above).
- `app/actions/results.ts` (new, `"use server"`) — thin pass-through to
  the already-tested `saveCompletedResultServer`.
- `src/lib/results/processPendingResults.ts` (new) + `.test.ts` (new, 14
  tests) — the single routine both real trigger points call. DI'd (a
  `SaveCompletedResultAction`, an optional `PendingResultStorage`, an
  `AuthCheck`) for the same testability reason `saveCompletedResult.ts`
  is. Classifies failure reasons into PERMANENT (clear the queue entry —
  `invalid_token`/`noncanonical_token`/`incomplete_token`/
  `unknown_version_provenance`/`version_mismatch`/`invalid_completed_at`,
  none of which can ever resolve on retry for a token/provenance/timestamp
  fixed at enqueue time) vs. TRANSIENT (leave queued —
  `unauthenticated`/`db_error`, both of which can genuinely resolve
  later). No-ops silently when the queue is empty or the visitor is signed
  out — never a login wall.
- `app/[locale]/PendingResultsSync.tsx` (new, client, invisible) — calls
  `processPendingResults` once on mount from the shared layout. Runs only
  on a genuinely fresh page load (layouts persist across client-side
  navigation within a locale segment), which is exactly what
  `/auth/callback`'s server redirect produces — the "just signed in"
  trigger point.
- `app/[locale]/quiz/page.tsx` (edit) — one added `processPendingResults`
  call right after the existing `enqueuePendingOwnResult`, covering
  "already signed in, just finished the quiz" (the case that never
  produces a fresh layout mount at all, so `PendingResultsSync` alone
  wouldn't catch it).
- `en.ts`/`ko.ts` (edit) — `auth.sign_in`/`auth.sign_out`/`auth.account`,
  **with real Korean translations added in the same stage**, not deferred
  to Stage 9G as this checkpoint's own earlier "Exact next task" section
  had assumed. Phase 8 (already CLOSED) turned `translationCoverage
  ("ko-KR") === 1` into a hard regression guard for ANY future key, not
  just the keys that existed when Phase 8 closed — confirmed by reading
  `interpretation.test.ts` directly rather than trusting the outdated
  assumption. This is a correction to this checkpoint's own prior
  guidance, caught before it caused a test failure, not after.
- `vitest.config.ts` (edit) — added the `@lib` alias (only `@core`/`@data`
  existed before), needed because `processPendingResults.ts` imports
  `@lib/supabase/client` directly, not just test files reaching into it.

**Verification**:
- `tsc --noEmit` clean throughout (including the mid-stage regression
  fix).
- `vitest run` **312/312** (298 Stage-9C baseline + 14 new
  `processPendingResults.test.ts`).
- `pnpm build --webpack` clean, **82 routes**, and — after the fix — the
  exact same static/dynamic split as the pre-Stage-9D baseline (70 person
  pages + directory + landing + quiz all `●` SSG again).
- Live browser check (this session's own browser, not the other chat's
  dev server it happened to be pointed at): `/en-US` and `/ko-KR`, desktop
  and 375px mobile widths. Header renders correctly in both locales
  ("Sign in" / "로그인"), resolves to the signed-out state correctly
  (real `supabase.auth.getUser()` call against the live, provisioned
  Supabase project — not mocked), zero console errors, zero horizontal
  overflow at 375px, `position: static` confirmed (non-sticky).
- **Originally NOT verified (agents structurally cannot complete a real
  Google consent screen): the actual Google OAuth round-trip.** The user's
  first live attempt failed; the confirmed root cause and the eventual
  successful retest are recorded in "Stage 9D OAuth — CONFIRMED root cause
  + successful live retest" further below — read that section for current
  status, not this bullet, which reflects this section's original,
  now-superseded verification state. **Stage 9D is still not formally
  closed**: OAuth itself is now confirmed working, but the user is
  completing the remaining human E2E checks (migration row,
  `completed_at`, refresh, sign out, sign back in, dedup) before closure.

### Stage 9D OAuth bug fix (2026-08) — improvements preserved; the causal hypothesis below was NOT the confirmed root cause

**Correction (2026-08, same day the live retest succeeded): the
"Most likely external cause" bullet immediately below was a reasoned
hypothesis, not a confirmed finding, and it turned out to be WRONG.** The
actual confirmed root cause of the original OAuth failure was entirely
different — an unsaved `.env.local` in a text editor, leaving placeholder
API keys on disk (see "Stage 9D OAuth — CONFIRMED root cause" further
below). The `redirectTo` query-parameter theory did **not** cause the
original failure. This section is kept, uncorrected in its original
reasoning, for the historical record — per this project's own discipline
of correcting documentation rather than erasing it — but the causal claim
must not be repeated or relied upon. **The code changes described below
are kept anyway**: they are genuine, independently-justified
improvements (no dependency on Supabase's redirect-URL query-parameter
leniency, no more silently swallowed auth errors, safer error logging),
not a fix for the failure that actually occurred — they simply weren't
what fixed it.

The user's first real OAuth test **failed**: Google's consent screen
completed, but the browser returned to the English home page with no
signed-in state, and Supabase's Users table showed zero users. Diagnosis
attempted (verified against current Supabase docs/GitHub discussion, not
guessed, but see the correction above — ultimately not the actual cause)
and the resulting code changes:

- **Certain, from the code itself, and still true**: `app/auth/callback/
  route.ts`'s only failure path was `redirect(`${origin}/?auth_error=1`)`,
  discarding the actual error before that line ran — this exactly
  reproduces "returns to the home page, locale lost" regardless of which
  underlying step failed. This diagnosis of the SYMPTOM was correct; only
  the guess at what triggered that path was wrong.
- **Hypothesis, later shown NOT to be the cause**: `redirectTo` carried a
  `?next=<path>` query parameter on top of the exact URL provisioned in
  Supabase's Redirect URLs allow-list. Supabase's redirect-URL validation
  is documented to reject a `redirect_to` with extra query parameters
  unless the allow-listed entry uses a wildcard, falling back to the Site
  URL (`http://localhost:3000` → this app's own root redirect →
  `/en-US`) on rejection — this seemed to match the symptom, but the
  confirmed cause (invalid API keys reaching Supabase's gateway on every
  single request, including `/authorize`) explains the same symptom
  independently, and the live retest confirms THAT was what was actually
  happening. This bullet is kept to show the reasoning that was tried, not
  as a claim about what fixed the bug.
- **Fix** (kept — independently valid, not what fixed the original bug):
  the return path now travels via a short-lived, first-party
  cookie (`OAUTH_NEXT_COOKIE`, `src/lib/supabase/oauthNext.ts` — the
  single shared constant between writer and reader), set by
  `AuthControls.tsx` immediately before `signInWithOAuth` and read+cleared
  by `app/auth/callback/route.ts`. `redirectTo` itself is now the bare
  `${origin}/auth/callback`, exactly matching the allow-listed entry, with
  no dependency on Supabase's query-parameter leniency. No dashboard
  reconfiguration required.
- **Error swallowing fixed**: every failure branch (a `provider_error`/
  `error_description` param from Supabase itself, a missing `code`, or a
  failed `exchangeCodeForSession`) now logs a safe diagnostic server-side
  (error name/message only — never the code, tokens, or any secret key)
  and redirects to the user's **original** next path with a visible
  `?auth_error=<reason>` param, instead of always to `/`. No dedicated
  error-banner UI reads this yet — deliberately out of "smallest fix"
  scope, same as Stage 9D's original error-UI deferral.
- **`/auth/callback` excluded from the `proxy.ts` matcher** — a plausible
  (not fully confirmed) contributing factor removed defensively, since the
  route already builds and reads its own session state entirely within
  the handler during the exact PKCE exchange.
- **Deliberately not changed**: `getUser()` → `getClaims()` in
  `src/lib/supabase/middleware.ts` — current Supabase docs recommend the
  latter, but it's unrelated to this failure and was left alone per
  explicit instruction not to rewrite the auth architecture broadly.

**Security correction (2026-08), same day**: the first version of this fix
logged the provider's `error_description` verbatim on the `provider_error`
branch. The user **directly observed** that Supabase's `error_description`
can embed part or all of Google's own external authorization code —
confirmed live, not theoretical. Fixed: `error_description` is no longer
read at all (only the short, fixed-vocabulary `error`/`error_code` params
are, which come from a closed enum, not free text); the
`exchangeCodeForSession` failure branch was also tightened to log only
`AuthError`'s structured `.name`/`.status`/`.code` fields, never the
free-text `.message`, on the same reasoning even though no leak was
observed there. Never logged, by design, anywhere in this route: provider
authorization codes, access/refresh tokens, client secrets, the Supabase
secret key, or any raw provider-supplied free-text error description.

### Stage 9D OAuth — CONFIRMED root cause + successful live retest (2026-08)

Supabase's own Auth logs gave a much sharper signal than the app's own
(pre-fix) silence: `GET /auth/v1/authorize -> 302`, `GET /auth/v1/callback
-> 302`, then `POST /auth/v1/token?grant_type=pkce -> 401` with
`AuthApiError`, `code: undefined` (not the `bad_code_verifier` a normal
PKCE mismatch would carry). Per explicit instruction, audited every
Supabase-client construction site for a key substitution bug before
touching any PKCE/cookie logic — **code was clean**: `client.ts`,
`server.ts`, `middleware.ts`, and the callback route (via `server.ts`) all
read exclusively through `env.ts`'s `supabasePublishableKey()`;
`SUPABASE_SECRET_KEY` is referenced nowhere in `app/` or `src/` (confirmed
by grep across the whole tree, only hits are inside `node_modules`).

The actual problem was in `.env.local`, verified via shell-computed
length/prefix/shape checks only (no full value ever printed, logged, or
pasted into chat): `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` was 18
characters and literally `sb_publishable_...` (ending in three literal
dots) — `SUPABASE_SECRET_KEY` likewise 13 characters, literally
`sb_secret_...`. At that point the mechanism was reasonably inferred but
not yet confirmed.

**CONFIRMED, by the user, after retesting: the real keys had been typed
into `.env.local` in Windows Notepad, but the file was never saved
(no Ctrl+S).** The dev server was therefore still running against the
literal placeholder text on disk the entire time — not against unfilled
values that were never entered, a materially different (and more mundane)
failure mode than "the provisioning step was skipped." An invalid `apikey`
reaching Supabase's gateway on every request explains the gateway-level
401 with no populated GoTrue error code on the token-exchange POST
specifically, while Google's own consent redirect (which doesn't depend
on our API key) still worked — matching every observed symptom exactly,
now confirmed rather than inferred.

**After saving the file and restarting the dev server, the live OAuth
retest SUCCEEDED**: Google OAuth completes, the app returns to the
correct (Korean) locale, the header flips to Account/Sign out, and a user
now appears in Supabase Authentication → Users. This is the first
confirmed end-to-end OAuth success this phase.

**For the durable record, unambiguously: the confirmed root cause of the
original failure was the unsaved `.env.local` file, not the `redirectTo`
query-parameter hypothesis explored earlier (see the correction on that
section above) and not any bug in the callback route's own PKCE/cookie
logic.** The callback return-path and error-handling improvements made
while investigating remain in place as genuine, independently-justified
improvements — they did not cause and were not needed to fix this
specific failure.

**Stage 9D is still NOT formally closed.** The user is now completing the
remaining human E2E checks the original 12-point verification plan called
for: (1) `user_profiles` migration, (2) `completed_at` correctness,
(3) refresh session persistence, (4) sign out, (5) sign back in,
(6) no duplicate result row. Do not mark Stage 9D closed until those are
confirmed too.

**Not a bug — testing artifact caught by the user (2026-08):** the first
post-fix retest found `user_profiles` empty even though OAuth itself
succeeded. Cause: the anonymous quiz completion (writing
`tgi_pending_own_results_v1`) happened on `localhost:3000`, but Windows
later reserved that port, so the successful OAuth retest ran on
`localhost:3200` — a different origin. `localStorage` is origin-scoped by
design, so the pending queue from `:3000` was never visible to
`processPendingResults` running on `:3200`. **No migration code changed
for this** — the user is redoing the full E2E flow on one single origin
(`:3200`): sign out → fresh anonymous quiz completion → verify the queue
entry exists on that origin → sign in → verify one `user_profiles` row,
`completed_at`, refresh persistence, sign out/in, no duplicate row.

**Non-blocking, recorded for Phase 10, not implemented now**: the user
flagged a wide-desktop layout concern during this testing round — at
desktop widths around 1280px and above, the landing/results/person/
compare pages overuse a narrow centered single-column layout, leaving too
much dead horizontal space. Phase 10 target: a wider editorial grid with
multi-column/asymmetric composition, keeping readable text measures and
the current restrained visual character — a composition fix, not a
general redesign. Durable record in CLAUDE.md's "Known open issues" item
12.

**Verified**: `tsc --noEmit` clean, `vitest run` 312/312 (unchanged),
`pnpm build --webpack` clean, 82 routes, static/dynamic split confirmed
identical. **NOT verified — the fix has not been tested against a real
Google OAuth round-trip.** Do not treat this fix as working until the
user has retested and confirmed it live.

### Stage 9D — FORMALLY CLOSED, human-approved (2026-08)

The clean single-origin E2E retest surfaced two further, genuinely
sequential blockers before the full flow passed. **Precise, for the
durable record — do not conflate these two, and do not resurrect the
`redirectTo` query-parameter theory as a confirmed cause of anything in
this phase:**

1. **`completed_at` migration was missing live.** `public.user_profiles.
   completed_at` did not exist yet — the intended Stage 9C migration
   (`0002_stage9c_completed_at.sql`) had been written but not yet run
   against the live project. Applied successfully. **This was a real,
   confirmed live-schema gap — but not the final blocker.**
2. **`quiz_versions` was never seeded — the actual final blocker.** After
   `completed_at` existed, the save attempt progressed further and failed
   with Postgres `23503` (foreign_key_violation):
   `user_profiles_quiz_version_fkey` — `quiz_v2` was absent from
   `public.quiz_versions`, which had existed since Stage 9A/9B but, like
   every other canonical-data table in this project, was never seeded (by
   design — canonical quiz/attribute/people data lives in TypeScript, not
   the DB). Fixed with `db/migrations/0003_stage9d_seed_quiz_version.sql`
   (also folded into `db/schema.sql` for fresh installs): one row —
   `quiz_v2` / `taxonomy_v1.1` / `scoring_v1` / `is_active = true` — all
   three values read directly from source
   (`QUIZ_VERSION`/`TAXONOMY_VERSION`/`SCORING_VERSION`), not invented.
   `ON CONFLICT (version) DO UPDATE` (not `DO NOTHING`), per explicit
   instruction: safe to rerun, and keeps the row aligned with canonical
   source values if they're ever rewritten, rather than silently freezing
   a stale row in place.

**After reference-data parity was restored, the full human E2E passed,
confirmed live by the user, all 12 original checks now closed:**
Google OAuth succeeds; the callback preserves the Korean locale; the
header flips to Account/Sign out; the session survives a refresh; the
Supabase user exists; the previously-queued anonymous pending result
migrated into `public.user_profiles`; `completed_at` preserves the
*original quiz-completion timestamp*, not the later sign-in/DB-insertion
time; a successful migration clears the local pending queue to `[]`; sign
out works; signing back in with the same Google account works;
`user_profiles` remains exactly **one** row after re-login — dedup via
the `(user_id, result_token)` unique index, live-confirmed, not just
unit-tested.

**Diagnostics added during this investigation were stripped back down**
before closure, per explicit instruction: removed all lifecycle/success-
path logging (mount confirmations, pending counts, per-step "reached"/
"succeeded" lines, auth-presence booleans, per-validation-branch
rejection logs). **Kept, permanently, as genuinely useful sanitized
failure logging**: the two `catch` blocks that prevent an unexpected
throw in the pending-result pipeline from becoming a silent, untraceable
unhandled promise rejection (`processPendingResults.ts`,
`PendingResultsSync.tsx` — both log only a short token fingerprint,
prefix + length, and an error message, never the full token); and
`saveCompletedResult.ts`'s DB-upsert-failure log (Postgrest's
`code`/`message`/`details`/`hint` — never credentials, never row values).
Nothing logs full result tokens, quiz answers, OAuth codes, cookies, auth
tokens, API keys, or raw provider error descriptions — the
`error_description`-can-embed-a-provider-code finding from earlier in
this stage stayed fixed throughout, untouched by this cleanup.

**Complete, corrected causal summary for this stage, replacing every
provisional/hypothesis framing above with what's actually confirmed:**
1. Google OAuth's real first failure: `.env.local` had real keys typed
   into Notepad but the file was never saved, so the on-disk file (and
   therefore the running dev server) still held placeholder keys, causing
   the PKCE token exchange to 401 at Supabase's gateway. Saving the file
   and restarting the dev server fixed OAuth itself completely.
2. The `redirectTo` query-parameter allow-list theory explored while
   diagnosing that failure was **never confirmed** as an actual cause of
   anything — it remains in this document only as a preserved, reasoned
   hypothesis that turned out to be wrong (see the correction earlier in
   this section). The callback return-path (cookie-based `next`, not a
   query param) and safer error-handling/logging changes made while
   investigating remain in place as genuine, independently-justified
   improvements, not as "the fix" for a bug they didn't actually cause.
3. After OAuth itself worked, the pending-result *migration* failed for
   two further, sequential, fully-diagnosed reasons: `completed_at`
   missing live (real gap, migration 0002 applied), then — the actual
   final blocker — `quiz_versions` never seeded with `quiz_v2` (fixed by
   migration 0003, idempotent).

**Verification**: `tsc --noEmit` clean, `vitest run` 312/312, `pnpm build
--webpack` clean, 82 routes, static/dynamic split confirmed identical to
every prior Stage 9D checkpoint. **Stage 9D is FORMALLY CLOSED —
human-approved (2026-08)**, closure basis being the user's own live,
first-hand confirmation of all 12 original E2E checks — the same
closure discipline used for every other Phase 9 stage and for Phases 7
and 8 before it.

This session ran Stage 9A (audit `db/schema.sql` against three candidate
auth providers, get explicit user approval) and then a provisioning-plan
correction round (the user caught three real gaps in the first
provisioning walkthrough: outdated Supabase key naming, an over-broad
migration-scope assumption, and an underspecified OAuth callback
architecture). Context ran low before any provisioning was confirmed done
or any code was written. Per explicit user instruction, no Stage 9B
implementation work has started.

## Decision: Supabase Auth + Supabase Postgres

Approved by the user after a comparison against Auth.js and Clerk. Reasoning:

- `db/schema.sql` was already designed around Supabase-flavored Postgres
  (`uuid-ossp`, `pg_trgm`, `unaccent`, `jsonb`) — Phase 9 completes an
  already-implied design rather than choosing one from scratch.
- `auth.users` can FK directly into `user_profiles.user_id` — no adapter
  layer, no second identity table to keep in sync.
- Row Level Security (RLS) protects account-linked data at the database
  layer, not just in application code.
- Avoids Auth.js's DB-adapter duplication and Clerk's second-vendor /
  webhook-sync overhead.

## Supabase API key model — verified current for 2026

The user explicitly required verification against current Supabase docs
before any env var names were finalized (not just recalled from training
data, since Supabase's key model changed in 2025/2026). Verified via
WebSearch against supabase.com/docs (migration guide, API keys guide, and
the official Next.js quickstart) this session:

- Legacy `anon` / `service_role` keys are being **deprecated by end of
  2026**; both key generations work simultaneously today, but a **new**
  project in 2026 should use the current model, not legacy naming.
- **Publishable key** (`sb_publishable_...`) replaces `anon` — safe in the
  browser, RLS-gated, opaque format (not a JWT).
- **Secret key** (`sb_secret_...`) replaces `service_role` — server-only,
  bypasses RLS, must never enter a client bundle.
- The official Supabase Next.js quickstart's own env var names are
  exactly `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — matching what the user
  specified. (One documented inconsistency to watch for: some Supabase
  starter templates use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
  instead — a known naming mismatch per
  [supabase/supabase#44016](https://github.com/supabase/supabase/issues/44016).
  We are standardizing on `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, which
  matches the canonical quickstart, not the starter-template variant.)

**Final env var names for this project:**

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
```

`SUPABASE_SECRET_KEY` is provisioned but **not expected to be needed by
any normal Phase 9 user-facing code path** — the design (browser and
Server Component/Route Handler clients alike) reads/writes as the
signed-in user through RLS-gated publishable-key clients via
`@supabase/ssr`. The secret key would only matter for a future
admin/service task (e.g. a data-import script bypassing RLS).

## Existing data model — Stage 9B completed this design (2026-08)

Read in full during Stage 9A; the FK/RLS/dedup gaps identified then are now
closed (see "Stage 9B record" above for the full detail). Current shape,
still not connected to any live application code — `package.json` has the
`@supabase/*` transport libraries now, but nothing yet calls them from a
page or Server Action):

```sql
user_profiles           -- user_id uuid NOT NULL references auth.users(id)
                         --   on delete cascade; result_token text NOT NULL,
                         --   unique(user_id, result_token) for dedup;
                         --   quiz/scoring/taxonomy/greatness/matching/
                         --   calibration version columns; locale (analytics
                         --   only); deleted_at. RLS: owner-only via auth.uid().
user_attribute_scores   -- profile_id -> user_profiles, attribute_id -> attributes. RLS via profile join.
user_quiz_sessions      -- profile_id -> user_profiles (nullable). RLS via profile join.
user_quiz_responses     -- session_id -> user_quiz_sessions. RLS via session+profile join.
match_results           -- profile_id -> user_profiles, person_id -> people. RLS via profile join.
greatness_results       -- profile_id -> user_profiles (primary key). RLS via profile join.
saved_people            -- user_id uuid NOT NULL references auth.users(id) on delete cascade,
                         --   person_id, kind ('favorite'|'target'|'saved'). RLS: owner-only.
```

All `user_*` tables cascade-delete from `user_profiles`, which itself
cascade-deletes from `auth.users`. `anonymous_key` (originally on
`user_profiles`) was dropped, not retired-in-place — see "Stage 9B record"
for why. Stage 9C is the first stage that will actually call any of this
from application code (the "canonical result-save path").

## Anonymous-first invariant — unchanged, still binding

The core product must remain fully usable with **no account**: quiz,
results, person pages, and comparison all stay unauthenticated-accessible.
No login wall anywhere in Phase 9's design.

Current anonymous client-side state (`app/[locale]/quiz/page.tsx`,
`app/[locale]/results/SaveLastResult.tsx`):

- `tgi_quiz_draft_v1` — an **incomplete** local quiz draft, keyed by
  `quizVersion`, no stored position pointer (resume is answer-content-derived).
- `tgi_last_result_v1` — a **completed**, content-addressable result token
  (`{quizVersion}.{encoded-answers}`), mirrored to localStorage by
  `SaveLastResult.tsx` on the results page.

**Corrected migration rule (user correction, this session), authoritative
for Stage 9C:**

- **Only completed results migrate to account history.**
  `tgi_quiz_draft_v1` stays **localStorage-only** in Phase 9 — no cloud
  draft sync, no draft merge/conflict semantics.
- A signed-in user finishes a local draft the normal way (client-side,
  unauthenticated-shaped flow); once it becomes a completed result token,
  it persists through **the same canonical result-save path** completed
  results already use — not a separate "draft" code path.
- Dedup on migration: `(user_id, quiz_version, encoded_token)`. Same
  token twice (e.g. sign-in happens after the result was already saved
  once, or migration runs twice) must not create a duplicate attempt row.

## Supabase SSR / OAuth architecture — corrected this session

Use `@supabase/ssr` with cookie-based sessions (the current recommended
package for Next.js App Router — not the older `@supabase/auth-helpers-nextjs`).

**Two distinct callback URLs — do not conflate them (this was the actual
error in the first walkthrough draft):**

- **(A) Google's authorized OAuth redirect URI** — configured in **Google
  Cloud Console → APIs & Services → Credentials**:
  ```
  https://<project-ref>.supabase.co/auth/v1/callback
  ```
  Points at **Supabase itself**. Google redirects here after consent;
  Supabase's own endpoint exchanges the code with Google and creates the
  Supabase-side session grant.

- **(B) The app's own callback route** — passed as `redirectTo` when the
  app initiates sign-in, and must be allow-listed in **Supabase Dashboard
  → Authentication → URL Configuration → Redirect URLs**:
  ```
  http://localhost:3000/auth/callback         (dev)
  https://<production-domain>/auth/callback   (prod, later)
  ```
  This route **does not exist yet** (Stage 9D implementation). Its job:
  receive the PKCE `code` query param Supabase redirects back with, and
  call `exchangeCodeForSession(code)` via `@supabase/ssr`'s server client
  to turn it into a cookie-based session.

## Manual provisioning — NOT yet confirmed complete

The user still needs to perform, outside this session (secrets must never
be pasted into chat):

1. Create the Supabase project.
2. Collect `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
   `SUPABASE_SECRET_KEY` from **Project Settings → API Keys** (the
   publishable/secret section, not the legacy anon/service_role screen —
   use the "Create new API keys" option if the project still only shows
   legacy keys).
3. Run the current `db/schema.sql` in the Supabase SQL Editor.
4. Create a Google OAuth 2.0 Web Client in Google Cloud Console.
5. Set its authorized redirect URI to (A) above.
6. Enable the Google provider in Supabase Dashboard → Authentication →
   Sign In / Providers, with the Google Client ID + Secret.
7. In Supabase Dashboard → Authentication → URL Configuration: set Site
   URL to `http://localhost:3000` and add `http://localhost:3000/auth/callback`
   to Redirect URLs.
8. Create local `.env.local` with the three env vars from step 2.

**Confirmed complete by the user, 2026-08** (all 8 steps, including the
`world_sense` schema fix applied before the first `schema.sql` run and
`0001_stage9b_accounts.sql` applied after). See "Stage 9B record" above for
what was built on top of this.

## Phase 9 closeout audit (2026-08)

A dedicated audit — reconstructed from this document and `CLAUDE.md`
directly, not from chat recollection — confirmed Phase 9 has no
remaining required work. Full findings:

- **Stages 9A-9D**: all FORMALLY CLOSED. 9B/9C closed on live-migration
  confirmation; 9D closed on all 12 human E2E checks passing live.
- **"Stage 9E" is not part of the authoritative roadmap.** Every prior
  mention of a 9E/9F/9G/9H breakdown (history / privacy-deletion / locale
  / testing) traced back to this checkpoint's own "next task" planning
  text, attributed to "the original Phase 9 spec the user gave" — an
  attribution that does not appear anywhere else in either durable
  document and was never independently reconfirmed. Treated here as an
  assistant-authored continuation idea, not a requirement. Corrected in
  the Status block at the top of this file.
- **Code invariants re-verified directly from source** (not just
  documentation): publishable-key-only client construction (`client.ts`/
  `server.ts`/`middleware.ts`), zero `SUPABASE_SECRET_KEY` references
  anywhere in `app/`/`src/`, zero Supabase/auth references in `src/core`,
  the anonymous-ownership queue design (`tgi_last_result_v1` vs.
  `tgi_pending_own_results_v1`) intact with a single enqueue site, dedup
  via `ignoreDuplicates: true` on `(user_id, result_token)`,
  `completed_at`/`quiz_versions` seed both present in cumulative
  `db/schema.sql`, RLS policy text confirmed in `schema.sql` and
  separately live-verified via the Stage 9B validation query. One honest
  caveat recorded, not a blocker: RLS is confirmed to *allow* correct
  self-owned writes (via the live E2E); it has not been adversarially
  tested to confirm it *blocks* a cross-user write.
- **Validation**: `tsc --noEmit` clean, `vitest run` 312/312,
  `pnpm build --webpack` clean, 82 routes, static/dynamic split
  unchanged.

**Do not begin Phase 10 implementation without a fresh, explicit
approval of a Phase 10 plan** — a plan was proposed in this same audit
(see the session record / a future "Phase 10 plan" section if one is
added here) but is deliberately not started. The wide-desktop
single-column layout issue stays recorded as Phase 10 debt (see
`CLAUDE.md`'s "Known open issues" item 12), not Phase 9 debt.

## Non-negotiable invariants carried into every future Phase 9 stage

- No account-related code may become a dependency of anything in
  `src/core`, and no auth/account state may enter deterministic scoring,
  matching, or greatness computation, per this project's "one rule."
- No locale string may affect any stored numeric result.
- No auth requirement may block public SEO-relevant pages: quiz, results
  (by token), person pages, and comparison must all keep working signed out.
- `tgi_quiz_draft_v1` (incomplete) never syncs to the cloud in Phase 9;
  only completed, tokenized results do, and only through the existing
  canonical result-save path.
- Ties/dedup logic must use stable, deterministic keys (the content-
  addressable token), never wall-clock time or insertion order.
