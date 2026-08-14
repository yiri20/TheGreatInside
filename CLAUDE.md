# The Great Inside — architecture

Algorithm-first, AI-optional. This file records durable decisions. Update it when
a decision changes; do not restate what the code already says.

## The one rule

**The user-facing product performs zero generative AI calls.** Quiz → vector →
deterministic comparison → ranked matches → rule-based interpretation. Every
number a user sees is reproducible from their answers with a pocket calculator
and enough patience. AI may later assist *admins* preparing data; it never enters
the request path, and no `AIProvider` may be a dependency of anything in
`src/core`.

## Status

Phase 0 complete. Phase 1 (design system) complete. Phase 2 (dataset expansion)
complete: matching engine hardened to `matching_v2` after two rounds of
simulation-driven debugging. Phase 3 (people explorer) complete: directory +
search/filter/sort, person profile pages with trait constellations, computed
Similar People / Opposite Profile, both launch locales, plus external-identity
& media metadata (Wikidata/Wikipedia links, portraits, aliases, historical
polity — see that section below; 5 of 35 people have verified real data).
Phase 4 (quiz expansion + `reference_v2`) complete. Phase 5 (matching
hardening / robustness audit) complete: `matching_v2` audited under seed,
ablation, and response-noise perturbation and found robust — no algorithm
change; see that section below. Phase 6 (quiz experience + results UI)
complete: anonymous end-to-end flow (landing → 56-item quiz → results),
no accounts, no DB, no runtime AI — see that section below. Phase 7 (target
comparison + development content) was paused pending the Phase 6.5
taxonomy breadth/research audit, which resolved into `taxonomy_v1.1`
(Phase 6.6, now formally closed — see "Phase 6.6 closure" below). Phase 7
resumed against that final taxonomy and is now **CLOSED, human-approved
(2026-08)**: Benjamin Franklin is fully approved after three review
rounds; Genghis Khan is approved after one round that found no
directional/selector defect — an apparent bug reported mid-review turned
out to be a mistake in the assistant's own chat-summary table, not a
product defect, confirmed by extracting raw DOM values directly — plus
one small, non-blocking content-wiring gap (the `dual_edged` branch of
`selectDoNotCopy` never attached a `tradeoffKey`) that was fixed,
regression-tested, and re-verified live. A documentation error surfaced in
the same pass — the checkpoint had incorrectly claimed `conflict_tolerance`
already had authored tradeoff content — was corrected; `conflict_tolerance`
is genuinely uncovered, so Genghis Khan's Conflict Tolerance caution
correctly still renders the generic sentence even after the fix. See
"Phase 7" below and "Phase 7 human-review checkpoint" for the full closure
record; `docs/phase7-provisional-checkpoint.md` is the detailed backing
checkpoint, now itself marked closed. **Phase 8 (localisation) is also now
CLOSED, human-approved (2026-08)**: full `ko-KR` translation (quiz,
development guides, comparison copy), a native-Korean copy-quality pass,
4 attribute-terminology renames, presentation-only localized display
names for all 35 people, a Korean display-serif typography fix (`Noto
Serif KR` via `next/font/google` — headings were silently falling back to
Windows' default Batang before this), full occupation/impact-domain chip
localization, and a final brand-tone pass on the five compare-page
section headings — see "Phase 8" below for the full record. This file's
test count is out of date at this specific sentence by design — see
"Phase 6.6", "Phase 7", and "Phase 8" below for current figures rather
than trusting a number this far up the file. **Phase 9 (accounts) is
FORMALLY CLOSED, human-approved (2026-08).** Stage 9A (architecture
audit), Stage 9B (DB/RLS migration + `@supabase/ssr` foundation), Stage
9C (canonical completed-result persistence primitive), and Stage 9D (auth
UX, wired end-to-end) are all FORMALLY CLOSED. Stage 9D closed on all 12
original human E2E checks confirmed live by the user. The first live
OAuth attempt failed; the CONFIRMED root cause (after a code audit found
the auth client/key-usage code itself clean) was an unsaved `.env.local`
in a text editor — real keys were typed but never written to disk, so the
dev server ran against literal placeholder key values the entire time. An
earlier, reasoned hypothesis (a `redirectTo` query parameter tripping
Supabase's redirect-URL allow-list) was investigated and fixed
defensively, but is explicitly **not** the confirmed cause of anything in
this phase — kept in the record only as a preserved, ultimately-incorrect
hypothesis, not a finding. After OAuth itself worked, the pending-result
*migration* failed for two further, sequential, fully-diagnosed DB
reasons: `completed_at` missing live (migration 0002 applied) and — the
actual final blocker — `quiz_versions` never seeded with `quiz_v2`
(migration 0003, idempotent via `ON CONFLICT ... DO UPDATE`, values read
directly from source, not invented). Temporary diagnostic logging added
while investigating was stripped back down at closure, keeping only two
permanently-useful, fully-sanitized failure logs (an unhandled-exception
guard in the pending-result pipeline, and the DB-upsert-failure log with
Postgrest's code/message/details/hint) — never tokens, answers, cookies,
or credentials. **A dedicated closeout audit (2026-08) also corrected a
standing overclaim**: earlier documentation described a "Stage 9E+
(history, privacy/deletion, locale, testing)" breakdown as coming "from
the original Phase 9 spec the user gave" — that attribution could not be
verified anywhere in this file or the checkpoint and has been removed;
it was an assistant-authored continuation idea, never a confirmed
requirement, and Phase 9's actual approved scope (Stage 9A's "Supabase
Auth + Supabase Postgres" decision) is fully delivered without it. A
future account-history page or deletion flow remain reasonable candidate
features but are not Phase 9 debt and are not a "Stage 9E" — any such
work needs its own fresh scoping. See
`docs/phase9-provisional-checkpoint.md`'s "Stage 9D — FORMALLY CLOSED"
and "Phase 9 closeout audit" sections for the complete corrected record.
Stage 9B was initially documented as complete based only on
local code/build validation, before the user had actually executed
`db/migrations/0001_stage9b_accounts.sql` against the live Supabase
project — the user caught this gap; the live migration is now
independently confirmed ("Success. No rows returned" in the Supabase SQL
Editor), and Stage 9B's closure date reflects that confirmation, not the
earlier local-build pass. A permanent, secret-free SQL validation query
for re-checking the live schema (FKs, `result_token`/dedup index, RLS) is
recorded in `docs/phase9-provisional-checkpoint.md`. Stage 9A audited
`db/schema.sql`
(already Supabase-Postgres-shaped, never yet connected to a live DB)
against Supabase Auth, Auth.js, and Clerk, and the user approved
**Supabase Auth + Supabase Postgres** — `auth.users` FKs directly into
the existing `user_profiles` table, RLS protects account-linked data at
the DB layer, and this completes an already-implied design rather than
choosing a fresh one. A provisioning walkthrough followed and was then
corrected by the user on three points, all now authoritative: (1) use
the **current 2026 Supabase API key model** — `NEXT_PUBLIC_SUPABASE_URL`
/ `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_SECRET_KEY` —
verified this session against current Supabase docs, not legacy
anon/service_role naming; (2) Phase 9 migrates only **completed** quiz
results (`tgi_last_result_v1`, content-addressable, deduped on
`(user_id, quiz_version, encoded_token)`) to account history —
**in-progress drafts (`tgi_quiz_draft_v1`) stay localStorage-only, no
cloud draft sync or merge semantics this phase**; (3) auth uses
`@supabase/ssr` with cookie-based sessions, with Google's own OAuth
redirect URI (`https://<project-ref>.supabase.co/auth/v1/callback`,
set in Google Cloud Console) kept explicitly distinct from the app's own
`/auth/callback` route (Supabase's `redirectTo`, allow-listed in
Supabase's Redirect URLs, responsible for the PKCE `exchangeCodeForSession`
call). Manual provisioning (Supabase project, keys, schema run, Google
OAuth client, redirect-URL allow-listing, `.env.local`) was **confirmed
complete by the user (2026-08)**, walked through step-by-step against the
corrected 8-step plan; a stale `attribute_facet` enum gap (missing
`world_sense`, unrelated to accounts specifically) was found and fixed in
`db/schema.sql` before the user's first schema run. **Stage 9B then
implemented the DB/RLS migration and the `@supabase/ssr` transport
foundation**: `db/migrations/0001_stage9b_accounts.sql` (run against the
live project) plus a matching `db/schema.sql` update give
`user_profiles.user_id` a real `NOT NULL references auth.users(id) on
delete cascade` FK (the placeholder `anonymous_key` column was dropped —
Phase 9's confirmed scope never writes an anonymous row to the DB at all,
so it had no future use, not just no current one), a new `result_token`
column implementing the dedup design as literally the same
content-addressable token `src/core/quiz/serialize.ts` already produces
for the `?r=` URL param, a matching FK added to `saved_people.user_id`,
and RLS enabled with one owner-scoped policy per `user_*` table and
`saved_people`. `src/lib/supabase/{env,client,server,middleware}.ts` (new
`@lib/*` path alias) implement the browser client, the Server
Component/Route Handler client, and a session-refresh helper wired into a
root `proxy.ts` — Next.js 16 renamed `middleware.ts` to `proxy.ts`, caught
live via a build warning and fixed the same session, same "verify against
current docs" discipline the key-model check used. `app/auth/callback/
route.ts` implements the PKCE `exchangeCodeForSession` exchange with an
open-redirect-safe `?next=` param. All of this is transport/schema only —
zero Phase 6.6/7/8 algorithm, selector, or localisation semantics touched
(confirmed: `grep -ri supabase src/core` returns nothing), and no
application code yet calls any of it (no sign-in UI, no result-save path)
— that starts at Stage 9C. `tsc --noEmit` clean, `vitest run` 268/268
(unchanged from Phase 8), `pnpm build --webpack` clean at 82 routes (81 +
`/auth/callback`), no build warnings.

**Stage 9C** then built that result-save primitive, after three rounds of
user review each correcting a real gap. Core design: `tgi_last_result_v1`
(last result *viewed*, may belong to someone else via a shared link) must
never be treated as proof of ownership, so a separate, provenance-safe
`tgi_pending_own_results_v1` — a bounded (5), deduplicated queue, not a
singular marker — is written ONLY at the one real quiz-completion point
(`app/[locale]/quiz/page.tsx`'s `goNext()`), snapshotting `resultToken` +
`completedAt` + a full `VersionSnapshot` (quiz/scoring/taxonomy/
greatness-scoring/matching/calibration versions, new `src/core/versions.ts`,
`KNOWN_VERSION_SNAPSHOTS` deliberately append-only so an old snapshot stays
migratable after a future version bump). `src/lib/results/
saveCompletedResult.ts` is the canonical primitive both future callers
(signed-in completion, post-sign-in migration) must use: dependency-injected
(no `next/headers`/`server-only` in this file, which is what makes it fully
unit-testable) validation chain — malformed/incomplete/**non-canonical**
(strict rejection, never silent normalization) token, unknown or
version-mismatched provenance, implausible `completedAt` (ISO-8601 +
parseable + ≤24h future, a clock-skew tolerance not a security boundary),
then server-resolved auth (`deps.auth.getUser()` — no `userId` parameter
anywhere), then an `ON CONFLICT DO NOTHING` upsert (`user_id,result_token`)
that never overwrites an existing row's historical version metadata.
`src/lib/results/saveCompletedResultServer.ts` is the actual
`server-only`-guarded wrapper (thin, no test of its own, no caller yet —
that's Stage 9D). New migration `db/migrations/0002_stage9c_completed_at.sql`
adds `user_profiles.completed_at` — deliberately with **no**
`completed_at <= created_at` CHECK constraint (browser clock vs. Postgres
server clock — ordinary skew could fail a legitimate immediate save;
plausibility is validated in application code instead). `tsc --noEmit`
clean, `vitest run` **298/298** (268 + 30 new, all passing on first run),
`pnpm build --webpack` clean at 82 routes, no warnings, zero `src/core`
purity violations. `0002_stage9c_completed_at.sql` is confirmed executed
live ("Success. No rows returned" in the Supabase SQL Editor). **Stage 9C
is formally closed** — this time the "run it live, then confirm, then
close" discipline was applied proactively (the checkpoint said "STOP and
ask" before any closure language existed), rather than corrected after
the fact as happened with Stage 9B.

**Stage 9D** built sign-in/sign-out UI and the two real callers of Stage
9C's primitive, after the user chose "add a minimal global header now"
(over page-local-only controls) with an explicit narrow brief (brand/home
link, subtle Sign in / Account+Sign out, no full nav or mega menu, minimal
vertical footprint). **A real regression was found and fixed during this
stage's own build validation**: the first draft resolved sign-in state
SERVER-SIDE in `Header.tsx` (`cookies()` via a new `getCurrentUser()`
helper) — since `Header` sits in the shared `[locale]` layout every page
renders through, this silently flipped ALL 70+ static person pages plus
the directory/landing/quiz pages from `●` SSG to `ƒ` per-request dynamic,
confirmed directly in the build output, not assumed. Fixed by moving
sign-in resolution entirely client-side into `AuthControls.tsx`
(`useEffect` + `supabase.auth.getUser()` + `onAuthStateChange`, rendering
nothing while unresolved) — the same "undefined = not yet resolved,
render nothing" rule `people/[slug]/CompareCta.tsx` already established
in Phase 7, not a new pattern. Rebuild after the fix reproduced the exact
pre-Stage-9D route table. `src/lib/results/processPendingResults.ts` is
the one routine both real trigger points call (right after
`enqueuePendingOwnResult` in `quiz/page.tsx`, and once on mount from a new
`PendingResultsSync.tsx` layout-level island) — DI'd and tested (14 new
tests), classifying failure reasons into permanent (clear the queue
entry) vs. transient (leave it queued for retry). `app/actions/results.ts`
is the thin `"use server"` wrapper Stage 9C's `saveCompletedResultServer`
needed. New `auth.*` i18n keys shipped with **real Korean translations in
the same stage** — Phase 8 already made `ko-KR` coverage a hard regression
guard for every future key, correcting this checkpoint's own prior
assumption that Korean could wait for Stage 9G. `tsc --noEmit` clean,
`vitest run` **312/312**, `pnpm build --webpack` clean at 82 routes with
the correct static/dynamic split restored, and a live browser check (this
session's own browser) confirmed the header renders correctly in both
locales, resolves to signed-out state against the real provisioned
Supabase project, zero console errors, zero horizontal overflow at 375px.
**The Google OAuth consent round-trip — not verifiable by an agent — was
then tested live by the user and, after one real failure and a corrected
diagnosis, confirmed working.** First attempt failed (browser returned to
the English home page, no session, zero Supabase users). A code audit of
every Supabase client (browser/server/middleware/callback) found the key
usage itself clean — `SUPABASE_SECRET_KEY` is referenced nowhere in
`app/`/`src/`. The CONFIRMED cause: `.env.local` had been edited in
Notepad but never saved, so the dev server was running against the
literal placeholder API keys the whole time — not a code bug. After
saving and restarting, the retest succeeded: OAuth completes, the correct
locale is preserved, the header updates, and a user now appears in
Supabase. (A `redirectTo` query-parameter hypothesis explored en route
was fixed defensively but confirmed NOT to be the actual cause — kept as
an independently valid improvement, not the fix.) The clean single-origin
E2E retest that followed surfaced two further, genuinely sequential DB
blockers, precise for the record: (1) `public.user_profiles.completed_at`
was missing live — the intended Stage 9C migration
(`0002_stage9c_completed_at.sql`) existed but hadn't been run yet; applied
successfully, a real gap but not the final blocker; (2) the actual final
blocker — Postgres `23503` foreign_key_violation on
`user_profiles_quiz_version_fkey`, because `public.quiz_versions` (which
has existed since Stage 9A/9B) was never seeded, same "canonical data
lives in TypeScript, not the DB" pattern as every other reference table in
this project. Fixed with `db/migrations/0003_stage9d_seed_quiz_version.sql`
(and folded into `db/schema.sql`): one row — `quiz_v2` / `taxonomy_v1.1` /
`scoring_v1` / `is_active = true`, all three values read directly from
`QUIZ_VERSION`/`TAXONOMY_VERSION`/`SCORING_VERSION` in source, not
invented — `ON CONFLICT (version) DO UPDATE`, not `DO NOTHING`, so a rerun
can never fail and stays aligned with canonical source values rather than
freezing a stale row. **After that, the full human E2E passed, confirmed
live by the user: all 12 original checks — OAuth, Korean-locale
preservation through the callback, header state, session-survives-refresh,
the Supabase user, the pending result actually migrating into
`user_profiles`, `completed_at` preserving the original quiz-completion
time (not the later sign-in time), the pending queue clearing to `[]` on
success, sign out, sign back in, and exactly one row surviving
re-login (dedup).** Temporary diagnostic logging added during this
investigation (added across `processPendingResults.ts`,
`PendingResultsSync.tsx`, `saveCompletedResultServer.ts`,
`saveCompletedResult.ts`) was stripped back down at closure — removed all
lifecycle/success-path/per-validation-branch logging; kept only two
permanently-useful, fully-sanitized failure logs (an unhandled-exception
guard so a thrown error in the pending-result pipeline can never again
become a silent unhandled rejection, logging only a short token
fingerprint and an error message; and the DB-upsert-failure log,
Postgrest's `code`/`message`/`details`/`hint`, never credentials or row
values). **Stage 9D is FORMALLY CLOSED, human-approved (2026-08)** — same
closure discipline as every other Phase 9 stage and Phases 7/8 before it:
the user's own live, first-hand confirmation, not an agent's inference.
`tsc --noEmit` clean, `vitest run` 312/312, `pnpm build --webpack` clean,
82 routes, static/dynamic split confirmed identical throughout. Full
checkpoint, including the complete corrected diagnostic record and what
Stage 9E-9H still need, is in `docs/phase9-provisional-checkpoint.md` —
read it before doing any further Phase 9 work.

**35 match-eligible profiles as of 2026-08** — Cleopatra VII removed under the
`inclusion_v1` editorial audit, replaced with Ibn Khaldun (see "Inclusion
philosophy" and "Seed dataset" below). Eligibility was verified from the real
authored evidence, not adjusted to force a pass: 20 scored attributes, average
confidence 0.5925, coverage 0.68 — clears the 18/0.55/0.6 floors with margin
but wasn't padded to. Dispersion, calibration, and the 10,000-profile
domination check were all regenerated in one pass after the swap; the
20%-at-n≥30 `matching_v2` invariant still holds (max 18.7%, stable at
18.3%±0.3% across independent samples — see "Phase 5" below), so the matching
formula itself was not touched.

Next incomplete milestone: **Phase 6.6 taxonomy_v1.1 + Quiz v2
implementation — IN PROGRESS, Stages 1-9 of 13 done and verified. Stage 5
(person scoring) is COMPLETE: all 35 people processed across 3 batches,
plus a scoring-symmetry audit and correction pass. Stage 6 (`reference_v3`
methodology review) is COMPLETE: ran the same evidence-bar test
`reference_v2` established (oneSidedShare must clear ~20% AND a meanDiff
must still persist) against live `quiz_v2` (64-item) diagnostics for all
34 attributes — no attribute, original or new, clears it, so
**`reference_v3`'s values are unchanged**: the 30 original attributes keep
`reference_v2`'s numbers (locked by a regression test, reconfirmed not
touched) and the 4 new attributes keep their Stage 2 stated-assumption
50/18 anchors. `REFERENCE_VERSION` was deliberately NOT bumped — nothing
numeric changed, only the review itself is now on record (full writeup at
`REFERENCE_VERSION` in `attributes.ts` and
`docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 6"). A genuinely
new, separate finding was surfaced and explicitly NOT acted on: all four
new attributes carry the highest simSd/refSd variance ratios in the
34-attribute bank (1.41-1.53) — a questionnaire-measurement question for a
future quiz round, not a reference-methodology question; inflating `sd` to
paper over it was explicitly rejected, same discipline as never laundering
bias into the mean. See "Known open issues" below (new item). **Stage 7
(dispersion regeneration + full `matching_v2` revalidation) is COMPLETE**:
`dispersion.generated.ts` regenerated for all 34 traits (`dispersion_v1`'s
methodology preserved unchanged — a dedicated reliability audit at n=7
found no instability evidence, so no redesign); all 30 original
attributes' weights shifted slightly (max +0.046), driven mainly by the
four new, lower-variance attributes joining the `meanSd` pool, not by
Zheng He's removal (isolated and shown to be a minor, mostly negative
effect, ≤0.03). Full matching revalidation at n=10,000+ across multiple
independent seeds and a dedicated ablation audit found **no causal
failure and no `matching_v2` code change was needed**: max #1 frequency
17.0% (Warren Buffett, stable at 16.2-17.9% across seeds/noise/ablation
conditions, comfortably under the 20%-at-n≥30 threshold); full 34/34
reachability; a controlled synthetic test found new-trait sparsity
creates no accidental advantage or penalty beyond the existing,
intentional coverage-shrinkage mechanism (~1.4-point effect, now locked
by 2 new regression tests); and `belief_updating` — the trait flagged in
Stage 6 for its sparse coverage and high variance ratio — was confirmed
the LEAST influential of the four new attributes under ablation, not the
most, so no STOP condition was triggered. A read-only check found
`calibration_v2` measurably stale (top-1 match percentiles down 2-4
points, Greatness median down 58→52) though still mathematically valid
(monotone, never returns 100). Full Stage 7 evidence in
`docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 7". **Stage 8
(`calibration_v3` regeneration) is COMPLETE**: refit both
`MATCH_CALIBRATION_ANCHORS` and `GREATNESS_CALIBRATION_ANCHORS` against a
50,000-profile `quiz_v2` sample (stable across two independent seed
offsets), using the SAME unchanged target tables and fitting methodology
as `calibration_v2` — no matching, reference, dispersion, or Greatness
formula change. The refit recovered top-1's median to 77 (target 78) and
Greatness's median exactly to 58, as an honest byproduct of fitting fresh
data correctly, not a manufactured restoration — the raw all-pairs median
itself barely moved (+0.0001), confirming only the upper-tail shape (Match)
and overall location (Greatness, traced entirely to the Distinctiveness
component) had drifted. Bumped to `calibration_v3` (unlike Phase 4's
noise-level refresh, this drift was too large to leave unbumped — same
reasoning as the `reference_v1`→`v2` precedent). Person/rank immunity
re-confirmed empirically at n=10,000 (0 true monotonicity inversions
across ~330,000 adjacent-pair comparisons, 0 selection-determinism
mismatches) after an initial diagnostic bug was caught and fixed (comparing
different tie-break rules manufactured false "mismatches" from benign
integer-rounding ties — corrected, not hidden). Full evidence in
`docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 8". **Stage 9
(final Greatness validation + product/UI compatibility audit) is
COMPLETE**: validated `greatness_v1` at n=20,000 and confirmed, via a
30-attribute counterfactual reimplementation of `distinctiveness()`, that
its D-component ceiling clustering (mean 0.934) is NOT a new
`taxonomy_v1.1` artifact — the same computation restricted to the
original 30 attributes already showed mean 0.901, so the migration only
added the modest, expected order-statistic effect of 4 more candidates,
not a new pathology; the dedicated all-100s-not-advantaged test still
passes unmodified. Audited every user-facing surface for stale
`taxonomy_v1`/`quiz_v1` assumptions and **found and fixed two real
defects**: (1) 8 hardcoded "30 traits"/"56 questions" strings across both
locales (`en.ts`/`ko.ts`), corrected to 34/64, plus the quiz intro copy
extended to mention `world_sense`, which was invisibly missing from the
facet-description list; (2) a genuine, directly-reproduced crash in the
paused Phase 7 compare route — `development.ts` auto-generated
structurally-valid-looking but content-less development-guide references
(e.g. `dev.belief_updating.low.exp.1`) for the 4 new attributes, which
`t()` throws on when rendered via the compare page's `as MessageKey`
cast; a **pre-existing test had actually asserted this was safe**, a real
oversight from the original migration now corrected, not introduced this
stage. Fixed with a minimal, no-new-content repair:
`DEVELOPMENT_GUIDES` now built from `AUTHORED_ATTRIBUTE_IDS` (the
original 30) so `developmentGuide()` correctly returns `undefined` for
the 4 new attributes and existing skip-logic runs instead of crashing.
Verified live in the running dev server across both locales at 5 viewport
widths: real `quiz_v2` result tokens render the full results hierarchy
cleanly (all 7 category matches including "Closest World-Sense Match,"
all 4 new traits showing real scores), `ko-KR` produces byte-identical
numbers to `en-US` for the same token, Zheng He confirmed unreachable as
any kind of match candidate while remaining fully browsable by direct
URL, `quiz_v1`-era localStorage/tokens correctly rejected without
silently loading as `quiz_v2`, and no horizontal overflow or touch-target
regression at 360-1920px. Full evidence in
`docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 9". **Stage 10A
(quiz presentation grouping) is COMPLETE**: inserted before the final
user retake to reduce page-turn fatigue — the 64 questions, wording,
mappings, taxonomy, `reference_v3`, `dispersion_v1`, `matching_v2`,
`calibration_v3`, and `greatness_v1` are all completely untouched, only
how many questions render per screen and how progress is labelled. New
`src/ui/lib/quizScreens.ts` groups short `likert7` items 2 (occasionally
3, when all are very short) per screen via a single order-preserving pass
— situational/forced-choice items and long items stay solo, and no two
questions sharing a primary attribute or a documented related-construct
cluster (drawn from CLAUDE.md's own merge history and the Phase 6.5 audit,
not a new judgment call) ever share a screen. Result: 64 questions → 53
screens (44 single, 7 double, 2 triple) — a modest, evidence-based
reduction, not tuned to a target, since 14 non-likert + 18 long-likert
items are structurally excluded from grouping by design. Progress now
reads "Questions N–M of 64" on grouped screens (new `quiz.progress.range`
key, both locales); Next activates only when every question on the
screen is answered; resume is now derived purely from `responses` (no
stored index at all — more literally "answer-based" than before, and
immune to any future regrouping), verified backward-compatible with
pre-Stage-10A drafts live, not just argued. Verified live in the running
dev server: 2- and 3-question screens render correctly, Back preserves
every answer on a grouped screen, a full 64-question run through the new
grouped UI reached a valid result with no crash, Korean renders the new
range-progress string correctly, and touch targets stay 44×44px with no
overflow at 360px. Scoring identity locked by a new test (`scoreQuiz` on
flat-order vs. screen-grouped-order responses produces byte-identical
output). Full evidence in
`docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 10A". 236/236 tests
passing.** **Stage 10B (evaluative-symmetry wording repair) is COMPLETE,
including a human-review micro-pass**: after the user's own manual
`quiz_v2` retake, an initial 17 of 64 prompts/options (q05c, q11, q21,
q26, q28, q29, q39, q40, q49, q50, q53, q57, q58, q59, q61, q64, q65)
were reworded to remove diligent-vs-lazy/perceptive-vs-oblivious/
open-minded-vs-stubborn/proactive-vs-passive/resourceful-vs-incapable
framing, per the new "Evaluative symmetry" authoring rule above. The user
then live-reviewed all 17 directly against the running quiz (item id,
current wording, and construct only — scoring direction deliberately
withheld until after judgment, to avoid biasing the read) and approved 12
as-is; a second, targeted micro-pass revised the remaining 5 (`q11`,
`q29`, `q49`, `q53`, `q64`) to remove residual loading the first pass had
missed. One of the user's own candidate rewrites (`q53`) was reviewed and
rejected — it fixed the evaluative loading but reintroduced construct
leakage toward `intuitive_synthesis`/`systems_abstraction` (see
"Evaluative symmetry" above) — and replaced with a counter-proposal that
achieves the same goal without the leakage. All 17 final wordings are now
user-approved. Wording-only throughout both passes: all 64 item ids,
formats, effect mappings/signs/weights, section membership, display
order, and the Stage 10A screen grouping (53 screens, same pairings,
re-verified byte-identical after each pass by re-running
`buildQuizScreens`) are untouched; `tsc --noEmit`, `vitest run`
(236/236, unchanged), and `pnpm build` (81 routes, unchanged) all pass
after the final micro-pass, and the rewritten items were confirmed live
in the dev server (all four grouping shapes — paired-short,
triple-very-short, long-solo, forced-choice — plus no horizontal overflow
at 360-1920px). Full audit table, every before/after wording pair, and
the micro-pass detail (including `q53`'s rejected candidate) in
`docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 10B". This closes
the human-facing questionnaire-quality loop the user's manual retake
opened. **The user then performed a second full manual `quiz_v2` retake**
over the Stage-10B-approved bank — this is the full end-to-end retake
Stage 10B's own plan had reserved for a later stage, now actually done —
and it surfaced a narrower, distinct finding: a handful of single-
statement `likert7` items could still feel evaluative purely from being
wrapped in a plain "Strongly disagree ↔ Strongly agree" scale, even once
the statement itself was neutral. **Stage 10C (`docs/phase6.6-taxonomy-
v1.1-implementation.md` "Stage 10C-A"/"Stage 10C-B") is COMPLETE**: a
50-item audit (A=42 keep standard scale, B=8 candidates, C=0 leakage
cases, D=0) found the mechanism and identified 8 candidates for custom
behavioral scale-anchor labels (a new, optional `leftAnchorKey`/
`rightAnchorKey` architecture on `QuizQuestion`, purely presentational —
`scoreQuiz` never reads anchor text); of those 8, exactly 3 were approved
for implementation this stage — `q13` (deep_focus), `q57`
(opportunity_sensing), `q61` (belief_updating) — each individually
live-reviewed by the user directly in the running quiz UI with scoring
direction withheld until after judgment, and **all three approved as-is,
no further wording changes**. `q21` is retained as a documented future
candidate; `q19`/`q56` deferred for possible construct drift; `q04`/`q38`
rejected outright for construct-leakage risk (full reasoning in
"Response-anchor symmetry" above). No midpoint label was added. Screen
grouping re-verified byte-identical (53 screens) after every change. Two
small, pre-existing Results-copy issues the user also verified during
that retake were fixed in the same stage: `results.signature_trait.explain`
no longer claims "most people land closer to X" (an unsupported
population claim — `reference_v3` is a stated modelling assumption, not
measured data) and `label.your_advantage` ("Where You May Have the
Advantage") was replaced with "Where You Bring Something Different" to
stop conflicting with this project's own "difference is not deficiency"
framing. **Phase 6.6 is now considered CLOSED** — see "Phase 6.6 closure"
below for the full reasoning on why two full manual retakes plus targeted,
direction-blind live verification of every subsequent change satisfies
the human-acceptance gate Stage 10B's plan had deferred, without requiring
a third full 64-question retake whose only unvalidated surface area would
be re-confirming 61 already-known-good items. Phase 7 remains paused, now
pending a fresh decision to resume rather than pending Phase 6.6's own
completion. Real-user testing during Phase 7
raised the question of whether the current 30-trait taxonomy over-indexes
on thinking/work/execution and under-represents lenses like world/
opportunity sensing, resourcefulness, belief updating, or proactive
agency. Phase 6.5 (`docs/phase6.5-taxonomy-audit.md`) and Phase 6.5B
(`docs/phase6.5b-taxonomy-quiz-design.md`, decision-checked in its §24
addendum) researched and designed the fix: `taxonomy_v1.1` (7 facets, 34
traits — adds `opportunity_sensing`, `resourcefulness`, `proactive_
agency` under a new `world_sense` facet, and `belief_updating` under
`thinking`; all 30 original attributes unmodified) and a Quiz v2. Phase
6.6 is implementing that approved design; full stage-by-stage record in
`docs/phase6.6-taxonomy-v1.1-implementation.md` (updated as each stage
completes, not written after the fact). **`taxonomy_v1.1` is live in code**
(`TAXONOMY_VERSION`, `REFERENCE_VERSION` → `reference_v3`). **Quiz v2 is
live in code at 64 items, not the originally-approved 62** — Stage 4's
structural diagnostics (run before any person was scored, per the
project's "diagnose the questionnaire before touching person data"
discipline) found the approved 62-item design had a genuine, measured
defect the design gate's own verification missed: all four new attributes
launched with 2 of 3 items in choice/binary format, reproducing the exact
item-format-bimodality mechanism that once inflated `intuitive_synthesis`/
`autonomy_need` (Phase 2) — signature-trait frequencies of 9.8-14.3%
against a 2.9% uniform baseline, four of the taxonomy's six most
overrepresented traits, all four brand new. A Stage 4.5 measurement-repair
gate fixed this empirically (three alternatives simulated, not assumed;
full A/B/C comparison in the implementation report) by converting one
choice item per new attribute to a second graded likert — at zero
item-count cost, and outperforming the item-count-costlier alternative
tested. The same diagnostic pass also found and fixed a `competitiveness`
guard violation (q27's approved removal left it at 66.7% single-item
share) and a `cross_domain_range` regression (weakened by q01's removal to
50% one-sided, became the worst remaining overrepresentation once the
other four were fixed) — both resolved with one new item each (`q66`,
`q67`), landing at 64 items total, not the originally-approved 62.
`decisiveness`'s root-cause fix (from Phase 6.5B) is confirmed working by
simulation: signature-trait frequency 19.1% → 2.1%. **Zheng He's
eligibility risk, flagged at the design stage, is now visible directly in
simulation** (the domination check runs against only 31 of 35 eligible
people pre-Stage-5, exactly matching the earlier projection) and remains
unresolved until Stage 5 scores him — not assumed away. **Stage 5 (person
scoring, including the Zheng He hard gate) is COMPLETE**: all 35 people
processed across 3 batches, evidence-first, with inline rationale per
score in `seed.ts`/`roster2.ts` (full record and per-batch detail in
`docs/phase6.6-taxonomy-v1.1-implementation.md`). **Confirmed result, not
engineered around: Zheng He is ineligible** (coverage 0.534, fails only
the coverage rule) — the design-stage risk materialised exactly as
flagged; 34 of 35 people remain eligible. **A real methodology concern
was caught mid-process and corrected, not just tracked**: after Batches
1-2 (22 people), every scored cell fell in the 60-92 range with zero
scores below 60 — a dedicated scoring-symmetry audit found this was
partly a genuine protocol asymmetry (two cases where low-direction
evidence had already been written down and misfiled as "missing"), not
only the extraordinary-achiever roster effect. A stricter three-part
low-pole test was defined and applied retroactively and going forward;
it correctly rejected two of the four candidates it surfaced (Leonardo da
Vinci's and Steve Jobs's `resourcefulness` remain missing — their
episodes fail the test on close inspection) and produced one confirmed
revision (Warren Buffett's `opportunity_sensing` 92→60, a genuine
mixed-evidence case: his own self-acknowledged, decades-long failure to
sense the technology shift outside his "circle of competence" weighed
against his well-documented skill at spotting mispriced value within it)
and one removal (Ibn Khaldun's `resourcefulness`, 78→missing, on
re-examination the evidence was better explained by his already-scored
`deep_focus`/`discipline`). Across the full 35-person roster, only that
one Buffett case is a confirmed low-direction score — reported honestly
as still a thin result, not smoothed over, and flagged for the record
that even that one case landed at exactly the 60 boundary rather than
clearly below it, worth a future look. A cross-era fairness check found
the real coverage disadvantage is source-type (administrative/technical/
athletic-performance records vs. autobiographical/narrative ones), not
chronological era — historical figures average *higher* new-trait
coverage (1.88 cells/person) than modern ones (1.72), confirming this
isn't an ancient-vs-modern bias. `matching_v2`, `greatness_v1`,
calibration, and the eligibility threshold remain completely untouched —
only person-level attribute data changed. 220/220 tests passing (two
updated to reflect the confirmed migration outcome: the self-mirror
ceiling test now uses Benjamin Franklin, the one profile with complete
34/34 coverage, instead of Marie Curie's now-partial 32/34; the roster-
eligibility test now names Zheng He as the one confirmed exception).
Phase 7 stayed paused until Phase 6.6 completed — see "Phase 7 — PAUSED /
PROVISIONAL" below for exactly what's already built and what depends on
the taxonomy staying stable, and "Phase 6.6 closure" immediately below for
why Phase 6.6 is now considered done.

### Phase 6.6 closure (2026-08)

**Phase 6.6 is CLOSED.** The original plan (Stage 10A's own "Stages 11-13"
note) reserved one explicit gate before closure: a full end-to-end
64-question retake by the user, plus a decision that Phase 6.6 is
complete. That literal sequence didn't happen as a single final step —
what happened instead, reasoned through explicitly rather than assumed
equivalent:

- **Two full manual `quiz_v2` retakes actually occurred**, not one: the
  first (after Stage 10A) surfaced the evaluative-loading finding that
  produced Stage 10B; the second (after Stage 10B) surfaced the
  response-anchor finding that produced Stage 10C. Both are genuine,
  independent full end-to-end human passes over the live product — a
  higher bar than the single retake originally planned, not a lesser one.
- **Every change made in response to either retake was then individually
  re-verified live**, direction/meaning withheld until after human
  judgment: all 17 Stage 10B items (12 approved outright, 5 revised in a
  micro-pass and re-approved) and all 3 Stage 10C items (`q13`, `q57`,
  `q61`, each approved as-is). This is more rigorous scrutiny per changed
  item than a fast full click-through would apply, not less.
- **The only literal gap**: the second full retake ran on the
  Stage-10B-only bank, not today's final state (Stage 10B wording + 3
  Stage 10C anchor items). Weighed and judged non-blocking: only 3 of 64
  items differ from what was already fully retaken, those 3 are now the
  most rigorously verified items in the entire bank, and mixing
  presentation styles across items is not a new risk this introduces —
  the quiz has mixed `likert7`/`forced_choice`/`situational` formats
  throughout its entire history without issue, so 3 items using a new but
  analogous bipolar-anchor style is a small, precedented delta against an
  already-validated flow, not an unvalidated one.
- **No blocking inconsistency was found anywhere else** during the
  closure audit: canonical version constants, attribute/roster counts,
  and eligibility were all re-verified directly against source (not
  trusted from documentation) and matched exactly. `tsc`/`vitest`/`pnpm
  build` all clean at closure.

Phase 7 may now be resumed by a fresh, explicit decision — not
automatically, and not in this stage.

## Phase 4 (COMPLETE, 2026-08)

**Quiz expanded 32 → 56 items (`quiz_v1`) to causally fix "known open issue
2b".** Full per-item detail lives in `docs/phase4-quiz-plan.md`; this section
is the durable summary of the finished phase.

**Root cause, confirmed causally.** Added `analyseDirectionBalance()`
(`src/core/quiz/scoring.ts`), which computes per attribute `oneSidedShare`:
the share of an attribute's measurement weight coming from choice-format
items where the attribute is only ever loaded with one sign (picking the
option adds signal; picking anything else adds nothing, not a negative — so
a weighted mean over such items has no mechanism to pull back toward the
reference midpoint, only up). Baseline finding:
`correlation(oneSidedShare, meanDiff) = 0.851` across all 30 attributes — by
far the strongest relationship found (item count 0.180, total weight 0.335,
the previously-fixed simSd/refSd ratio 0.295). Attributes at 100% one-sided
share showed roughly +28 to +32 point simulated-mean bias; attributes at 0%
(persistence, creative_originality, conflict_tolerance) showed near-zero
bias. This ruled out "reference_v1 is simply unrealistic" as the primary
explanation (bidirectionally-measured attributes already validated
reference_v1's means closely) and ruled out social-desirability wording and
competence-framing as causes (existing items already followed the Phase 0
situational-wording discipline). The defect was structural — how choice-item
scoring interacts with a weighted mean over items that fired — not wording.

**Fix: 24 new items across three rounds, all additive (no existing item's
mapping was rewritten, and the canonical 30-attribute taxonomy was not
touched).**
- **Round 1 (q33-q52, +20 items, 32→52).** Dedicated bidirectional graded
  Likert items for the worst offenders, plus four genuine 2-way forced-choice
  trade-offs, targeting every attribute at ≥50% baseline `oneSidedShare`.
- **Round 2 (q53-q54, +2 items, 52→54).** Round 1 confirmed working for 4 of
  6 targeted attributes (`mastery_orientation` 28.1→12.6, `cross_domain_range`
  28.9→13.9, `execution_speed` 25.3→20.4, `collaboration` 32.5→24.3 meanDiff)
  but barely moved `analytical_rigor` (27.0→26.6) and `planning_orientation`
  (30.3→27.8): both carry 4.7-6.1 total item weight from several
  *pre-existing* one-sided items, so one small trade-off item's bidirectional
  weight wasn't enough to shift the balance. Fixed with one more dedicated,
  higher-weight (1.2) pure-attribute Likert item each — same pattern that
  worked in round 1, just applied a second time with more weight. Result:
  `analytical_rigor` 26.6→20.0, `planning_orientation` 27.8→19.8.
- **Round 3 (q55-q56, +2 items, 54→56).** Round 2 also cut Warren Buffett's
  #1 match-frequency at n=35 from 24.6% to 20.2% (10,000-profile quiz-mode
  simulation) — evidence that residual one-sided measurement doesn't only
  skew signature-trait frequency, it also skews match *domination*, since
  Buffett scores genuinely high on several of the still-one-sided attributes
  (`mastery_orientation` 90, `deep_focus` 88 of his 30 scored attributes) and
  the simulated population's inflated level on exactly those attributes pulls
  it closer to his. 20.2% was still marginally over the 20%-at-n≥30
  threshold. `mastery_orientation` (69% one-sided) and `deep_focus` (52%
  one-sided) were next by the same criterion, each still carrying only one
  bidirectional item against several pre-existing one-sided ones — the same
  insufficient-weight pattern round 2 fixed. Fixed the same way. Result:
  `mastery_orientation` meanDiff 12.6→9.4 (oneSidedShare 69%→56%),
  `deep_focus` 17.2→12.5 (52%→41%), and Buffett's #1 frequency 20.2%→18.7%,
  back under threshold.

**`reference_v2` created, numbers deliberately unchanged from `reference_v1`.**
Formalises three previously-conflated concepts: (a) real population norms
[not available — never has been], (b) the simulated `quiz_v1` output
distribution (real, reproducible, but still measures the instrument, not a
population — even after three rounds of fixes,
`correlation(oneSidedShare, meanDiff)` across all 30 attributes is 0.709, down
from 0.851 but still substantial), (c) the actual modelling reference used
for z-scoring distinctiveness. Only 4 of 30 attributes have reached the low
one-sidedness (≤22%) that let `reference_v1` validate cleanly in the first
place, and none of those show a meaningful meanDiff — so no attribute
currently clears the evidence bar for moving its assumed mean. Adopting the
still-partially-biased simulated means as the new reference would launder
that residual bias into the yardstick itself. Bumped to `reference_v2` anyway
to put "re-reviewed against `quiz_v1` and reconfirmed, with this reasoning on
record" on the version history — full methodology, the 3-way distinction, and
the exact evidence bar for a future `reference_v3` are documented at
`REFERENCE_VERSION` in `src/core/attributes/attributes.ts`.

**Downstream recalibration completed in one deliberate pass**, per the
established workflow: `dispersion.generated.ts` regenerated (unchanged —
dispersion depends on the person dataset, which Phase 4 did not touch, not
the quiz bank); `MATCH_CALIBRATION_ANCHORS` and `GREATNESS_CALIBRATION_ANCHORS`
refitted against the final 56-item bank (drift under 0.008 raw for match,
under 0.024 raw for greatness — `matching_v2` and `CALIBRATION_VERSION`
itself were not touched, only the anchor tables). Final 10,000-profile
quiz-mode simulation against all 35 people, with the refitted anchors in
effect, lands within rounding of the pre-Phase-4 target shape:

```
Match, all pairs:  min 5, p10 23, p25 32, med 44, p75 57, p90 69, max 95
Match, top 1:       min 44, p10 64, p25 71, med 78, p75 84, p90 88, max 95
Greatness:          min 8, p10 34, p25 46, med 58, p75 70, p90 80, max 98
#1 frequency (max):  Warren Buffett 18.7% — under the 20%-at-n≥30 threshold
```

See "Seed dataset" below for the full domination table and its Phase 5
implication.

**New regression tests** (`src/core/quiz/scoring.test.ts`): a fixture-based
suite pinning `analyseDirectionBalance`'s bidirectional/one-sided
classification (likert vs. 2-way vs. multi-way choice, weighted mix across
multiple items), plus a coarse guard on the shipped bank that no attribute is
ever 100% one-sided again. All pre-existing invariant tests (level
domination, flat-profile domination, coverage advantage, forced-choice
variance inflation, metadata immunity, locale immunity) preserved. 164→170
tests.

**Verified clean at completion:** `tsc --noEmit` clean, `vitest run` 170/170,
`diagnose.ts` and `trait-diagnostic.ts` coverage guards hold (every attribute
≥3 items, max single-item share 0.48 ≤ 0.55), two-pass `calibrate.ts quiz`,
10,000-profile `simulate.ts quiz`, and `pnpm build --webpack` (75 routes,
matches Phase 3's documented figure — the person dataset didn't change).

## Phase 5 (COMPLETE, 2026-08) — matching hardening / robustness audit

**Decision: (A) `matching_v2` is robust enough for Results UI — no algorithm
change.** This was a robustness *audit*, not a redesign: the mandate was to
touch `matching_v2` only if evidence falsified one of its existing
invariants, and none did. New diagnostic tooling (`src/dev/sensitivity.ts`,
committed alongside `simulate.ts`/`calibrate.ts`/`trait-diagnostic.ts`) adds
`seeds` (independent-seed stability), `ablate` (in-memory quiz-item removal,
never edits `bank.ts`), `noise` (response-simulation-model perturbation), and
`dist` (full match/greatness distribution under perturbation) subcommands —
all reusable for future phases without re-deriving this harness.

**1. Seed-quiz-mode stability.** Warren Buffett's committed 18.7% figure is
not a lucky draw: 5 independent 10,000-profile samples (disjoint seed
ranges) gave mean 18.3%, sd 0.3%, range [17.9%, 18.7%] — no run exceeded the
20% threshold, and the rank order (Buffett > B. Franklin ≈ R. Franklin >
Turing) was identical across all five.

**2. Item-family ablation confirms q53-q56 are independently defensible, not
tuned to Buffett.** Removing each item and re-running the 10,000-profile
simulation:

```
final (no ablation)                        18.7%
without q53 (analytical_rigor fix)         20.8%  (+2.1)
without q54 (planning_orientation fix)     20.5%  (+1.8)
without q55 (mastery_orientation fix)      19.4%  (+0.7)
without q56 (deep_focus fix)               19.5%  (+0.8)
without q53+q54 (round 2)                  22.8%  (+4.1)
without q55+q56 (round 3)                  20.2%  (+1.5)
without all four (q53-q56)                 24.6%  (+5.9)
```

Removing all four exactly reproduces the historical 52-item-bank figure
(24.6%, see "Phase 4"), which is a strong internal-consistency check on the
ablation methodology itself, independent of the Buffett question. The
decisive finding: **q53/q54 — designed before the Buffett episode was even
discovered, purely to fix `analytical_rigor`/`planning_orientation`'s
one-sidedness — contribute MORE to reducing Buffett's dominance (+2.1/+1.8pp
each) than q55/q56, which WERE selected in direct response to the Buffett
finding (+0.7/+0.8pp each).** All four items were selected by the same
generic rule (next-highest `oneSidedShare` with insufficient prior corrective
weight) and are worded as generic behavioural/preference statements with no
reference to Buffett or his biography — see their text in
`src/core/i18n/en.ts`. If q55/q56 had been overfit to Buffett specifically,
they would be expected to show the LARGEST individual effect on his number,
not the smallest of the four. No dominator besides Buffett ever exceeded
16.7% (Rosalind Franklin, in the most extreme ablation) in any ablation
tested.

**3. Response-noise perturbation.** Perturbing the simulated-user response
model itself (±25% choice-decision determinism, ±50% likert response noise)
— independent of any quiz-item change — kept Buffett's frequency in
[18.1%, 19.2%], with the same rank order throughout. The domination figure is
not brittle to modest, plausible changes in how simulated users answer.

**4. `collaboration`'s residual one-sidedness (82%, the largest in the bank)
causally audited and found harmless — left unchanged, per instruction not to
patch a number without a demonstrated defect.** Ablating `q33`
(`collaboration`'s only bidirectional item, making it 100% one-sided — worse
than its current state) moved Buffett's frequency by only +0.3pp (18.7%→
19.0%) and produced no new dominator; `collaboration`'s own signature-trait
frequency (8.6%) is elevated but not among the bank's most extreme (behind
`decisiveness` 19.0%, `cross_domain_range` 10.3%, `planning_orientation`
9.8%); and its six items (`q01d`, `q17d`, `q23a`, `q25b`, `q33`, `q52b`) were
reviewed for wording and are situational/behavioural, matching the Phase 0
discipline — no item asks "are you a team player" outright. The residual
`oneSidedShare` is a real, documented instrument-quality gap (tracked in
"Known open issues"), but it does not currently move rankings — consistent
with the broader finding that Buffett's dominance required a *cluster* of
several simultaneously-elevated, still-biased attributes in one person's
profile, not any single attribute in isolation.

**5. Known matching failure modes explicitly re-verified**
(`src/core/matching/matching.test.ts`, new `"Phase 5: known failure modes"`
describe block, mechanism-level not percentage-snapshot tests):
- **Level/elevation domination** — a person who shares the user's exact
  shape but sits 20 points off in level beats a person at the user's exact
  level but with an anti-correlated shape, confirming `PATTERN_WEIGHT` (0.5)
  still dominates `LEVEL_WEIGHT` (0.3) as designed.
- **Flat-profile domination, scatter collapse, coverage advantage** —
  pre-existing regression tests re-run unmodified, still pass.
- **High-variance omission advantage (newly tested this phase)** — a thin
  (18/30) profile built only from the *highest*-dispersion attributes and one
  built only from the *lowest*-dispersion attributes, from the same
  underlying score pattern, differ by only ~0.006 raw similarity. Coverage
  shrinkage (fixed in Phase 2, "2b") generalizes across attribute
  *composition*, not just attribute *count* — no new defect found.
- **Unreachable profiles** — every match-eligible seed person (all 35) ranks
  #1 for a synthetic user who mirrors them exactly; nobody is structurally
  unreachable (the two people at 0.0% #1 frequency in random simulation,
  `p_rumi`/`p_toni_morrison`, are 0 by chance at this sample size, not by
  construction).
- **Metadata immunity, locale immunity** — pre-existing tests plus one new
  locale-immunity test for matching specifically (mirroring the existing
  scoring-layer test) re-confirmed.

**6. Calibration and Greatness robustness.** `MATCH_CALIBRATION_ANCHORS`
stayed strictly monotone throughout (unchanged, property-tested); the
ceiling never returned 100 in any run. Under the single most extreme
perturbation tested (the full q53-q56 ablation, the 24.6%-domination
condition), the full match/greatness distribution barely moved — e.g.
greatness median 58→61, p90 80→83, ceiling still 98 either way — confirming
the anchors, fitted against the final bank, stay interpretable even far
outside the range Phase 5's perturbations actually explored. `greatness.ts`
has zero code-level dependency on the quiz bank (only `ATTRIBUTES[id]
.reference` and the person dataset) — a quiz perturbation can only reach
Greatness through the ordinary "the user's own score vector differs"
channel, not a separate interaction bug, so the stable distribution above is
sufficient evidence; no new Greatness-specific failure mode was found or is
mechanically possible without a Greatness-side change (none was made).

**New regression tests:** 4 new mechanism-level tests in `matching.test.ts`
(level-vs-pattern precedence, full-roster reachability, high/low-dispersion
omission parity, matching-specific locale immunity). No test locks an exact
`#1` person or an exact simulated percentage, per instruction. 170→174 tests.

**Verified clean at completion:** `tsc --noEmit` clean, `vitest run`
174/174, `diagnose.ts`/`trait-diagnostic.ts` unchanged (Phase 5 did not touch
`bank.ts`), `pnpm build --webpack` (75 routes, unchanged). `matching_v2`,
`CALIBRATION_VERSION`, and `greatness_v1` were none of them modified.

## Phase 6 (COMPLETE, 2026-08) — quiz experience + results UI

**First complete anonymous user journey: landing → 56-item quiz → results.**
No accounts, no database, no runtime AI. Numerical semantics (`matching_v2`,
`greatness_v1`, `scoring_v1`, calibration) were **not** touched this phase —
confirmed via `diagnose.ts`/`trait-diagnostic.ts`/`simulate.ts` all producing
byte-identical output to Phase 5 (Buffett still 18.7%, same distributions).

**Routes added:** `app/[locale]/page.tsx` (landing, replaces the old
`app/page.tsx` stub — that file now just `redirect()`s to `/en-US`, since the
"validated later" placeholder it carried was stale once a real destination
existed); `app/[locale]/quiz/page.tsx` (client component, the 56-question
flow); `app/[locale]/results/page.tsx` (server component, reads `?r=` from
the URL and does the entire quiz → score → match → greatness computation
per-request — no separate API route, since every step is already a pure
`src/core` function).

**New `src/core` surface, all pure:**
- `src/core/quiz/serialize.ts` — `encodeResultToken`/`decodeResultToken`
  turn a `QuizResponse[]` into one URL-safe string (one char per question:
  a digit for likert7, a letter encoding the option's INDEX for choice
  formats — not its authored id, so a future id rename can't silently
  corrupt an old link) prefixed with `quiz.version`. Decoding a token whose
  version doesn't match the current `QUIZ_VERSION` returns `undefined`
  rather than reinterpreting it — the results page shows an explicit
  "couldn't read this result, retake the quiz" state, never a silently
  wrong profile. This is *the* state/versioning mechanism: results need no
  server storage at all, are shareable/bookmarkable by construction, and a
  future accounts phase can persist the same token server-side without
  changing anything about how results are computed.
- `orderedQuestions(quiz)` (`bank.ts`) — walks `quiz.sections` in order, each
  section's own `questionIds` in order. **Found and fixed a real bug**
  during manual testing: the quiz page originally iterated `QUIZ.questions`
  (raw authoring-order array), but Phase 2/4 additions were *appended* to
  that array rather than inserted at their section's position, so a section
  showed a few items, several OTHER sections played out in full, and then
  the same section's later-added items (e.g. s1_thinking's q31/q38/q46/q53)
  appeared again — "Section 1" resuming after the user had already passed
  Section 5. Scoring itself is genuinely order-independent (unaffected), but
  it looked broken to the person taking the quiz. Fixed by presenting
  questions in section-grouped order instead; regression-tested (3 tests:
  contiguous grouping, exactly-once coverage, matches each section's own
  order).
- `selectCategoryMatches` (`selectors.ts`) gained a bounded diversity rule:
  walk `FACETS` in order, prefer a person not already used for an earlier
  facet, but only when the cost is small (`maxDiversityCost = 0.02` raw
  similarity, same order of magnitude as `UNEXPECTED_CONFIG
  .similarityWindow`) — otherwise keep the facet's true best and accept the
  repeat, per instruction to prefer relevance over manufactured variety.
  Never touches `facetSimilarity`'s numbers, same "select, don't re-score"
  rule as every other function in that file. 3 new tests confirm both
  branches (prefers a close second when cheap; still repeats the true best
  when diversifying would cost a lot) and that a diversified pick's
  displayed percentage is its own, not borrowed from the person it replaced.

**Result composition — mostly reused, not reinvented.** Auditing existing
code before writing anything (per instruction) found that Unexpected Match
(`selectUnexpectedMatch`), Opposite Profile, Signature Trait
(`signatureTrait`), the result-archetype framing (`selectResultArchetype`),
and nearly all result copy (`result.*`/`label.*`/`tpl.*` keys) already
existed from Phase 3/4 and needed no changes — only the category-match
diversity rule above was new selection logic. The results page is thin
composition over `buildResultSet` + `computeGreatnessPotential` +
`distinctiveTraits`/`advantageTraits`/`renderComparison`; the closest-match
explanation line and the "where you differ" comparisons reuse the SAME
template machinery (`tpl.*`) the person-detail page already used, not new
copy. Signature Trait and the strongest Dual-Edged trait both render via the
existing `TraitCard` component rather than hand-rolled markup — it already
has the head/bar/edge/cost layout Phase 6 needed built in and tested.

**Hard invariants held, checked in the running app, not just in code
review:** Greatness Potential always rendered `N / 100` via `formatPotential`
(never `%`) confirmed on-screen; every trait score via `ScoreBar`/`TraitCard`
(never `%`); the "not a prediction of future success" disclaimer is a
visible `<Text>`, not a tooltip; the `results.method.*` "how this was
calculated" panel is a native `<details>` (no JS, keyboard/AT-operable for
free) listing the same six honesty points from the brief with no equations.

**State/navigation behaviour (per instruction, decided and verified, not
just decided):** an in-progress quiz mirrors to `localStorage`
(`tgi_quiz_draft_v1`, keyed by `quizVersion`) after every answer; a refresh
or revisit offers "Continue where you left off?" with the real answered
count, or discards silently and restarts if the stored `quizVersion` no
longer matches `QUIZ_VERSION`. Finishing clears the draft and encodes the
final token into the URL. Browser Back/Forward and refresh on `/results` all
recompute from that URL alone — verified live: navigated to a person's page
from the closest-match card and back, and the exact same result (down to the
raw percentages) was still there. Answers are preserved navigating backward
through the quiz — verified live, not assumed.

**Verified live in the browser, both locales, multiple answer patterns**
(not just unit tests): full 56-question run via real DOM interactions
(radio clicks, not a shortcut) end-to-end to a results page with no console
errors; a second and third independently-generated answer pattern produced
visibly different results (Greatness 72→85→28, different closest match,
different signature trait each time) — confirms the result genuinely
depends on the input rather than being cached or hardcoded; `/ko-KR/results`
for the identical token produced byte-identical numbers to `/en-US/results`
(72/100, 72%, 27%, every percentage) with only the surrounding copy
translated — the locale-independence invariant holding under the real
Next.js SSR path, not just in a unit test; person-detail navigation and
back; resume-prompt flow; stale/malformed-token handling (missing `r`,
wrong quiz version) both showed the intended "couldn't read this result"
state rather than crashing.

**Accessible custom-radio pattern, deliberately not the "tiny clipped
input" version.** `ChoiceGroup`/`LikertScale` (`src/ui/components/quiz.tsx`)
use a real `<input type="radio">` per option, invisible (`opacity:0`) but
stretched via `position:absolute; inset:0` to cover the ENTIRE card/circle,
layered above the label — not a 1px-clipped input relying on the browser's
native label-`for` click delegation to make the rest of the card clickable.
Found this mattered concretely while testing: the clipped-input version
technically works for a real pointer (browsers delegate label clicks
correctly), but the actual hit-target a mouse/touch event resolves against
is exactly the clip's 1x1px box, not the visible 44px+ card — an automated
click landed a hair outside it and silently failed to register. The
full-cover version makes the 44px+ touch target a directly hit-testable
fact rather than something that merely happens to work via delegation.
Selected state is never colour-only: a border-weight change plus a filled
indicator dot (choice cards) or bold/filled circle (likert) ship alongside
the accent-colour change.

**Localisation**: all new structural UI copy (landing, quiz intro/nav/
progress/resume/stale states, results section headings, the method panel)
has both English and natural Korean translations — verified live, not just
present in the bundle. The 56 quiz *question* texts remain English-fallback
per the existing Phase 8 policy (untouched this phase). `person.
trait_constellation` already used 핵심 특성 in Korean from Phase 3; no
change needed.

**New regression tests:** `serialize.test.ts` (9 — round-trip, order-
independence, unknown-question/out-of-range handling, version-mismatch
token rejection), `orderedQuestions` (3, in `scoring.test.ts`), category-
match diversity (3, in `matching.test.ts`), full-result-composition locale-
independence/determinism/closest-is-rank-1 (3, in `greatness.test.ts`).
174→192 tests. None locks an exact `#1` person, an exact simulated
percentage, or a specific quiz answer pattern's output — all assert
structural/mechanism properties, per instruction.

**Verified clean at completion:** `tsc --noEmit` clean, `vitest run`
192/192, `diagnose.ts`/`trait-diagnostic.ts`/`simulate.ts` byte-identical to
Phase 5 (quiz bank and matching untouched), `pnpm build --webpack` clean
(81 routes: the prior 75 + 2 landing + 2 quiz + 1 dynamic `results`).
`matching_v2`, `greatness_v1`, `CALIBRATION_VERSION`, and `QUIZ_VERSION`
were none of them modified.

**Remaining limitations, deliberately out of scope this phase:** no
accounts/persistence beyond the URL token (Phase 9); no social sharing/OG
image generation; no SEO/structured data on `/results` (correctly `ƒ`
dynamic, not statically generated — ties into Phase 10); person occupation/
field labels on the results page still render via the same `humanize(id)`
placeholder used elsewhere (pre-existing gap, not introduced here); no
`reference_v3`; `matching_v2`/`greatness_v1` unmodified per the brief.

## Phase 7 — target comparison + development content (2026-08)

**Implementation complete, pending human UI review.** Phase 7 was paused
mid-implementation pending the Phase 6.5 taxonomy breadth audit
(`docs/phase6.5-taxonomy-audit.md`); that audit resolved into
`taxonomy_v1.1`, and Phase 6.6 (all sub-stages through 10C) is now
formally closed — see "Phase 6.6 closure" above. This section records
Phase 7's resumption and completion against the final `taxonomy_v1.1`/
`quiz_v2`/`reference_v3`/`dispersion_v1`/`matching_v2`/`calibration_v3`/
`greatness_v1` state. Historical detail on what was built during the
paused period is preserved in `docs/phase7-provisional-checkpoint.md`
(now superseded by this section for current status, kept for its
file-by-file history).

**Stage 7A (audit against final Phase 6.6 state) — no architectural
conflict found**, verified computationally, not just reasoned about: 0
crashes running the full comparison pipeline (`matchUserToPerson` +
`selectLearnFromSuggestions` + `selectDoNotCopy`) against all 34
match-eligible people with a synthetic 34-trait user profile; `FACETS`/
`ATTRIBUTES_BY_FACET` read live from `attributes.ts` in every Phase 7 file
(confirmed 7 facets, no stale 6-facet or 30-trait hardcoding — the 8
hardcoded strings Stage 9 already fixed stay fixed); Stage 10C's
custom-anchor architecture (`leftAnchorKey`/`rightAnchorKey`) is
presentation-only inside the quiz-taking flow and has zero code path into
comparison logic, confirmed by inspection; Zheng He (the one match-
ineligible person) correctly gated from `/compare/[slug]` (checks
`target.isMatchEligible`) while remaining fully browsable via
`/people/zheng-he` — verified live in both directions.

**Stage 7B — compare page restructured to a 5-section information
architecture**, replacing the former single combined "Where You Differ"
section: **What You Share → Where You Lean Differently → What You Could
Learn From Them → Where You Bring Something Different → What Not to
Copy**. The 4th section reuses `advantageTraits` (the same shape-gated
selector already powering the results page's `label.your_advantage`,
Stage 10C-B) rather than the raw, unfiltered `userHigherTraits` the
provisional version rendered — so a numeric edge on a `contextual`-shaped
attribute (where "higher" carries no general claim) is never framed as
something to celebrate, keeping this section's semantics identical
wherever the same heading appears. `compare.section.differ`/`.learn`
reworded (EN+KO) to match; `label.your_advantage`'s Stage 10C-B copy
("Where You Bring Something Different") reused verbatim rather than
duplicated under a new key.

**Stage 7C — development guides completed for all 4 `taxonomy_v1.1`
additions** (`opportunity_sensing`, `resourcefulness`, `proactive_agency`,
`belief_updating`): 36 new English strings (4 attributes × 3 bands × [2
experiments + 1 caution]), same schema/tone/"high band is never just get
more of this" discipline as the original 30. `DEVELOPMENT_GUIDES` now
built from the live `ATTRIBUTE_IDS` (34) directly — the temporary Stage 9
gate (`AUTHORED_ATTRIBUTE_IDS`, the original 30 only, added specifically
to prevent a `t()` crash on unauthored keys) is removed now that real
content exists for all 4. `missingDevelopmentGuides()` returns `[]`.
`belief_updating` (the one new attribute whose `balanced` shape qualifies
for `HELPS_WHEN_HIGHER_SHAPES`) now correctly surfaces in
`selectLearnFromSuggestions`, confirmed by a test that supersedes Stage
9's "must be skipped" test; the 3 `contextual`-shaped additions
(`opportunity_sensing`/`resourcefulness`/`proactive_agency`) remain
structurally unreachable via that selector regardless of content — a
shape-based gate, not a content-availability one, confirmed by a
dedicated test so Stage 7C's content authoring can't be mistaken for a
selection-logic change.

**Stage 7D — do-not-copy coverage audited across all 34 eligible people,
computed, not assumed**: 0 people produce empty output; 27 rely entirely
on the deterministic layer (impact `risk`/`dual_edged`, extreme scores);
7 combine their curated editorial key with deterministic fallback items.
No warning was manufactured to fill a gap — the existing architecture
already provides complete, legitimate coverage for the current 35-person
roster; the 7 pre-existing curated `doNotCopyKeys` entries were reviewed
and left unchanged (already correctly "biographical accounts describe..."
framed, never a diagnosis).

**Stage 7E — target-switching UI paths wired** (the provisional
checkpoint's main incomplete item): `<SaveLastResult token={r!} />`
now renders from `results/page.tsx`; `<CompareCta>` renders from
`people/[slug]/page.tsx`, **gated on `person.isMatchEligible`** (a
decision beyond the checkpoint's original plan — an ineligible person
like Zheng He never advertises a "Compare Yourself" action that would
just dead-end on `/compare`'s own eligibility check, while staying fully
browsable); a "Compare With {person}" CTA (`compare.cta.from_results`,
already authored in both locales but never rendered) now appears next to
the closest match on `/results`. Verified live end-to-end: full quiz →
results → compare with closest match → switch targets (confirmed advice
genuinely changes, e.g. `resourcefulness` appearing for one target and
not another) → Korean route (section headings correctly localised;
`dontcopy.generic.*` item bodies correctly fall back to English, the
same pre-existing, deliberate Phase 7 scope decision, not a new gap) →
Zheng He exclusion (no CTA on his page; direct compare URL shows the
existing not-found state, not a crash).

**Stage 7F — copy audit**: grepped all `compare.*`/`dontcopy.*`/new
`dev.*` strings for higher-is-better, success-probability, diagnosis, and
population-claim language. No leaks found — the 7 editorial
`doNotCopyKeys` strings and the ~270 original dev-guide strings
(untouched, reviewed only) already held this line; the 36 new dev-guide
strings and the restructured compare-page copy were authored to the same
standard and checked against it directly.

**Verification**: `tsc --noEmit` clean, `vitest run` 237/237 (+17 over
Phase 6.6's 220 baseline: 2 targetComparison tests updated, 2 added; 4
interpretation.test.ts tests rewritten to assert full 34-attribute
coverage instead of a tracked 4-attribute gap), `pnpm build` clean, 81
routes unchanged. No horizontal overflow at 360/390/768/1280/1920px on
the compare page (`scrollWidth === clientWidth` at every width, checked
live). No console errors across the full live walkthrough.

**Known non-blocking issues, found during this pass, not fixed (out of
the requested scope — copy polish, not an architectural or safety
concern):** `compare.person_not_found.title` ("We couldn't find that
person") is slightly imprecise for a person who exists but isn't
match-eligible (vs. a genuinely nonexistent slug) — the Stage 7E
eligibility gate on `CompareCta` means the UI itself never leads a user
into this state anymore, so it's now reachable only via a hand-typed or
bookmarked URL; the `generateMetadata` title for that same case ("You ×
Zheng He") doesn't check eligibility before building the `<title>` tag,
even though the page body correctly shows the not-found state. Both
pre-date this stage.

**What's implemented, historical detail from the paused period, all
verified clean at the time (`tsc --noEmit`, `vitest run`
207/207, `pnpm build --webpack`):**

- **`rules.ts` extended** — `HELPS_WHEN_HIGHER_SHAPES` (shared shape-eligibility
  set, extracted from the existing `advantageTraits` with no behaviour
  change) and `learnFromTraits` (the target-side mirror of `advantageTraits`:
  target meaningfully ahead in a direction the model credits, gated by
  shape + confidence, not raw gap size).
- **New core module `src/core/interpretation/targetComparison.ts`**
  (`target_comparison_v1`), fully pure and tested (13 tests in
  `targetComparison.test.ts`):
  - `selectLearnFromSuggestions` — connects user-state → target-state →
    target-evidence → an authored development guide, banded by the **user's
    own** score (same principle as `selectDevelopmentGuides`: advice is
    about where the user is, not about closing a gap to a specific person).
  - `selectDoNotCopy` — caution items about the TARGET's own profile,
    independent of the user: editorial `doNotCopyKeys` first, then
    `impact === "risk"`, then `"dual_edged"`, then an extreme score
    (≤10/≥90), then a `lower_can_help`-shaped trait scored high (currently
    unreachable with real data — no attribute in `taxonomy_v1` has that
    shape — but kept as correct, forward-compatible logic). Confidence is
    carried on every item for the UI to soften language, not treated as its
    own trigger (would otherwise flag nearly every attribute on thin
    ancient/medieval profiles).
- **Development guides completed structurally**: `DEVELOPMENT_GUIDES` now
  covers all 30 canonical attributes (was 10 of 30). `missingDevelopmentGuides()`
  returns `[]`, now asserted as a regression guard.
- **~270 English development-guide strings authored** in `en.ts`
  (30 attributes × 3 bands × [2 experiments + 1 caution]) — every entry
  verified to actually resolve (not just exist as a key) by a new test that
  iterates all 30 attributes × 3 bands and checks real text length, not the
  raw key. **Deliberately English-first**, not mechanically translated —
  documented in code and in the Korean-coverage test's exclusion list
  (`dev.*`, `dontcopy.generic.*`).
- **Editorial `doNotCopyKeys` content authored** for all 7 people that
  already had a curated key (`davinci.unfinished_work`, `jobs.demandingness`,
  `miyazaki.exacting_standards`, `beethoven.volatility`, `gandhi.self_denial`,
  `tesla.commercialisation`, `genghiskhan.ruthlessness`) — **in both English
  and Korean** (small, high-value, curated set, unlike the bulk dev-guide
  content). "Biographical accounts describe..." framing throughout, per
  "Safety" below — never a diagnosis, always separable from the trait.
- **`app/[locale]/compare/[slug]/page.tsx`** — the "You × [Person]" route.
  Reads the same `?r=` token as `/results` (`decodeResultToken`), computes
  `matchUserToPerson(user, target)` plus the two selectors above, and
  renders: hero (overall match), What You Share, Where You Differ, What You
  Could Learn, What Not to Copy, Facet Comparison, and a collapsible
  Detailed Trait Comparison. Handles missing/invalid token and
  not-found/ineligible target as explicit states, not crashes. **Builds and
  type checks as a standalone route** (`ƒ` dynamic, confirmed in
  `pnpm build --webpack`) but is **not yet linked from anywhere** — see
  "What's NOT done" below.
- **`app/[locale]/compare/[slug]/TargetSwitcher.tsx`** — client component,
  live-filters `SEED_PEOPLE` via the existing `searchPeople` and links to
  `/compare/{newSlug}?r={sameToken}` — switches targets without retaking
  the quiz, per the state strategy below.
- **State/routing strategy (decided, partially wired):** the result token
  from Phase 6 (`?r=`) is the single source of truth, threaded through
  unchanged — no new persistence mechanism. Two small client islands
  extend the Phase 6 localStorage pattern: `results/SaveLastResult.tsx`
  (mirrors a valid result token to `tgi_last_result_v1` on the results
  page — **written but not yet rendered from `results/page.tsx`**) and
  `people/[slug]/CompareCta.tsx` (reads that key, offers "Compare Yourself
  With This Person" or "Take the Quiz to Compare" — **written but not yet
  rendered from `people/[slug]/page.tsx`**). Both typecheck cleanly and are
  self-contained; integrating them is exactly the remaining wiring work.
- **~35 new `compare.*` / `dontcopy.*` i18n keys**, English + Korean
  (structural UI chrome, not the bulk dev-guide content).

**What's still explicitly NOT done, honestly, as of this stage:**
- No dedicated automated test suite for the compare *page* itself (React
  component/route-level) — verification this stage was `targetComparison.ts`
  unit tests (15) plus a live manual browser walkthrough, the same balance
  of coverage Phase 6 used for the quiz/results pages.
- No keyboard-navigation-specific walkthrough (tab order confirmed
  structurally sound via existing, already-accessible primitives — native
  `<details>`/`<summary>`, the Phase 6 `TextField` — but not step-by-step
  tabbed through by a human).
- Full Korean localisation of the ~270+36 `dev.*` strings and
  `dontcopy.generic.*` remains the same deliberate, documented English-first
  scope decision as before (Phase 8 territory), not a gap introduced or
  closed this stage.
- The two minor pre-existing copy/metadata issues noted above
  (`compare.person_not_found.title`, `generateMetadata` not checking
  eligibility) are recorded, not fixed — cosmetic, not blocking.
- Phase 7 is implemented and verified but **awaiting explicit human UI
  review** before being marked complete in the Roadmap below — see that
  section.

**What's reusable vs. taxonomy-dependent — resolved.** The "if `taxonomy_v2`
lands" contingency plan below is now historical: `taxonomy_v1.1` is what
actually landed (Phase 6.6), and Stage 7C completed exactly the dev-guide
regeneration this plan anticipated (4 new attributes, ~270 original strings
untouched and still valid). Kept for the record, in case a *future*
taxonomy revision needs the same playbook again:
- **Taxonomy-independent, stayed true:** the comparison *architecture* —
  `targetComparison.ts`'s selection logic, the compare page's section
  hierarchy, the state/token strategy, `TargetSwitcher`, the i18n key
  *pattern* (`dev.{id}.{band}.{kind}.{n}`), the editorial `doNotCopyKeys`
  content — needed zero changes for the `taxonomy_v1.1` migration, exactly
  as predicted.
- **Taxonomy-dependent, needed exactly the anticipated work:** the ~270
  original development-guide strings stayed valid unchanged; the 4 new
  attributes needed genuine re-authoring (not a key rename), which Stage 7C
  did; `HELPS_WHEN_HIGHER_SHAPES`/`selectDoNotCopy`'s shape-based logic
  needed no code change, only the new attributes' `contributionShape`
  assignments (already made at Phase 6.6 Stage 2) to produce sensible
  behaviour — confirmed, not just assumed, by Stage 7A's crash test and
  Stage 7C's shape-gating regression tests.

### Phase 7 human-review checkpoint (2026-08) — durable resume point

The implementation record above (Stages 7A-7F) is the architecture as
shipped. This subsection is the **current, living status** of the
post-implementation human review round that followed it — the part that
changes turn to turn and needs a durable checkpoint for a fresh session.
Full detail, including the exact next task, lives in
`docs/phase7-provisional-checkpoint.md` (now the authoritative checkpoint
for this review, not a historical artifact — read it first in any new
session touching Phase 7).

**Human review found and fixed 8 real issues across two full rounds** on
Benjamin Franklin (round 1: empty Learn-From-Them for `contextual` traits,
generic Bring-Something-Different copy, repetitive Not-to-Copy copy,
ambiguous Facet Comparison labelling; round 2: a Worth-Exploring
direction bug, still-generic Bring-Something-Different copy, wrong-
direction Not-to-Copy triggers when the user already matches/exceeds the
target, second-person dev-guide caution voice misapplied to a third
party; round 3: Worth Exploring's second statement answering the wrong
question for the user's own lower pole). Each fix is implemented,
regression-tested, and re-verified live. **Benjamin Franklin is now fully
approved.**

**Genghis Khan review round 1: no defect found, one apparent bug traced
to an assistant reporting error, not a code error.** While presenting
Genghis Khan's "Where You Bring Something Different" section as flattened
chat text, the assistant built a markdown table that mis-assigned the
per-attribute gap number (e.g. Collaboration's "45") to the "You" column
and the target's real score to the "Genghis Khan" column, dropping the
user's actual score entirely — making three genuinely user-higher
attributes (Collaboration, Analytical Rigour, Ambiguity Tolerance, user
scored 100 on all three in this profile) look target-higher. **Verified
false by extracting raw values directly from the live DOM**
(`.tgi-compare__num` spans, bypassing any chat-formatting step):
Collaboration You 100 / Genghis 55, Analytical Rigour You 100 / Genghis
65, Ambiguity Tolerance You 100 / Genghis 78 — all three genuinely
user-higher, correctly gated into `advantageTraits`
(`delta = personScore - userScore <= -DIFFERENCE_THRESHOLDS.moderate`,
`src/core/interpretation/rules.ts`) and correctly excluded from
`learnFromTraits`/`selectLearnFromSuggestions`/`selectWorthExploring`
(all require the TARGET meaningfully higher). **No code change is
needed** — `advantageTraits`, `learnFromTraits`, `delta`'s sign
convention (`personScore - userScore`, `src/core/matching/similarity.ts`),
and `largestDifferences`/`userHigherTraits`/`personHigherTraits`'s pool
construction were all re-read against this specific case and are correct.
The related concern — "What You Could Learn From Them" showing empty for
Genghis Khan despite Analytical Rigour/Ambiguity Tolerance appearing on
the page — is likewise **not a defect**: in this profile almost every
attribute has the user at or near 100 with Genghis Khan lower, and the
only attribute where Genghis Khan actually scores higher (Conflict
Tolerance, 95 vs. the user's 90) has just a 5-point gap, well under both
`MEANINGFUL_DELTA` (12, the pool-entry floor) and `DIFFERENCE_THRESHOLDS
.moderate` (20, the Learn-From/Worth-Exploring floor) — so there is no
genuine target-higher difference large enough to qualify. "No strong
learning suggestions stood out this time" is the correct, honest output
for this specific profile/target pairing, not a selector bug. **Lesson
for future sessions, recorded because it actually cost real review time
this round: when presenting `ComparisonBar`-backed data as a hand-built
chat table, either quote the rendered page text verbatim or extract
structured values via `javascript_tool` from `.tgi-compare__num`
spans — never reconstruct a You/target table from the flattened
`get_page_text` string by eye, since the per-attribute gap number
(`Math.abs(them - you)`, rendered first, right after the label) sits
directly before the real "You" score in that flattened text and is easy
to misread as the "You" value itself.**

**One real, minor, non-blocking content-wiring gap found during this same
investigation, fixed and closed out in the same review round**: not
requested by the user but surfaced while tracing Genghis Khan's Conflict
Tolerance through `selectDoNotCopy`, the `dual_edged` branch
(`targetComparison.ts`, `selectDoNotCopy`, the `attr.impact ===
"dual_edged"` case) always emitted the generic `dontcopy.generic.dual_edged`
sentence and never called `tradeoffKeyFor()` — unlike the
`extreme_score`/`shape_mismatch` branches, which do. **Fixed**: the
`dual_edged` branch now attaches `tradeoffKeyFor(attr.attributeId)`
exactly like the other two branches, keeping the generic sentence as the
fallback when no key exists (never dropped — the 8 uncovered attributes
would otherwise render no caution text at all). Verified by 2 new tests
(a covered attribute, `discipline`, gets a key; `conflict_tolerance`
correctly doesn't) and a live re-check on Genghis Khan.

**A documentation error was found and corrected in the same pass, not
just the code**: the checkpoint had claimed `conflict_tolerance` IS in
`TRADEOFF_ATTRIBUTE_IDS` with real content "just unused" for the
`dual_edged` branch. That was false — `conflict_tolerance` is one of the
8 attributes `TRADEOFF_ATTRIBUTE_IDS`'s own comment names as deliberately
uncovered (confirmed directly: 26 entries in the array, `conflict_tolerance`
absent; no `dontcopy.tradeoff.conflict_tolerance` key in `en.ts`). So the
fix, while correct and now live for the 26 attributes it DOES cover, does
**not** change what Genghis Khan's Conflict Tolerance caution says —
`tradeoffKeyFor("conflict_tolerance")` correctly returns `undefined`, and
the caution still renders the generic "cuts both ways depending on
context" sentence, live-reverified after the fix. That fallback is the
correct, intended behavior — never invent content to eliminate a
legitimate coverage gap — not a remaining defect. Completing
`conflict_tolerance`'s (and the other 7 uncovered attributes') tradeoff
content is recorded as non-blocking future cleanup in "Known open issues"
below, not a Phase 7 blocker.

Also added at this stage: a direction-aware regression test suite
(`interpretation.test.ts`, "advantageTraits/learnFromTraits: near-ceiling
user vs. uniformly lower target", 3 tests) pinning the exact
Genghis-Khan-shaped profile (near-ceiling user, target lower across the
board, one small contextual-shaped target-higher gap under threshold) as
extra insurance against a repeat of the reporting confusion described
above.

**Genghis Khan's editorial "What Not to Copy" content is human-approved**:
the mass-violence caution ("Biographical accounts describe campaigns under
Genghis Khan involving mass violence against civilian populations...")
was reviewed and preserved verbatim throughout — confirmed byte-identical
live, both before and after the `dual_edged`/`tradeoffKey` fix.

**Status: Phase 7 is formally CLOSED (human-approved, 2026-08).** Benjamin
Franklin is fully approved (3 rounds); Genghis Khan is fully approved (1
round, no defect found, the `dual_edged`/`tradeoffKey` gap fixed and
re-verified, the checkpoint's `conflict_tolerance` documentation error
corrected). Final validation: `tsc --noEmit` clean, `vitest run` 259/259
(254 baseline + 5 new — the 2 `dual_edged`/`tradeoffKey` tests plus the 3
Genghis-Khan-shaped fixture tests above), `pnpm build --webpack` clean, 81
routes unchanged. No Phase 6.6 canonical algorithm (`taxonomy_v1.1`,
`quiz_v2`, `reference_v3`, `dispersion_v1`, `matching_v2`,
`calibration_v3`, `greatness_v1`) was touched — only
`src/core/interpretation/targetComparison.ts` and two test files changed.
`docs/phase7-provisional-checkpoint.md` carries the full closure record
and is itself updated to reflect closure — read it for the detailed
history, this section for the durable summary. Phase 8 has not begun and
requires a fresh, explicit decision to start (see "Roadmap" below).

**Final five-section comparison architecture, as closed:** What You Share
→ Where You Lean Differently → What You Could Learn From Them (with a
Worth Exploring sub-block for `contextual`-shaped differences, each
carrying a `helpsWhenKey` for the target-higher pole and a `preservesKey`
for what the user's own current pole legitimately protects) → Where You
Bring Something Different (reuses `advantageTraits`, `helpsWhenKey`) →
What Not to Copy (editorial `doNotCopyKeys` always shown; `risk`/
`dual_edged` impact items, both now `tradeoffKey`-aware where content
exists; direction-aware `extreme_score`/`shape_mismatch` triggers).
Target switching (`TargetSwitcher`) re-uses the same result token without
a quiz retake. Development-guide coverage is complete for all 34
attributes. Facet Similarity is confirmed a user↔target similarity
percentage, never a trait-quality score. `breakdownSize: 15` (raised from
the `matchUserToPerson` default of 5) only widens the four breakdown
arrays (`closestTraits`/`largestDifferences`/`userHigherTraits`/
`personHigherTraits`) that selectors and display slice down from — it
does not affect `result.overallMatch`, which is `calibrateMatch
(rawSimilarity)`, computed independently of `breakdownSize` (confirmed by
reading `similarity.ts` directly, not just re-stating the earlier claim).

## Phase 8 (COMPLETE, 2026-08) — localisation, human-approved

**Phase 8 is formally CLOSED, human-approved.** Brought `ko-KR` to genuine
production-quality parity with English across the entire user-facing
product — not just key coverage, but native-reading Korean, correct
Hangul typography, and localized presentation metadata. No Phase 6.6/7
algorithm, English copy, scoring, selector, or page structure was touched
at any point in this phase; every change was translation, typography, or
presentation-data content.

**Coverage (Stages 8A–8J).** All 64 `quiz_v2` prompts/options/custom
anchors (q13/q57/q61), the full development-guide corpus (34 attributes ×
3 bands × [2 experiments + 1 caution] + `helpsWhenKey` × 34 +
`preservesKey` × 12), `dontcopy.generic.*` (4) and `dontcopy.tradeoff.*`
(26), and all remaining structural/result/compare copy were translated —
semantically, not literally: every quiz item was independently checked
against Evaluative Symmetry (see that section above) and Response-Anchor
Symmetry directly in Korean, since a literal rendering of an
already-approved English item can reintroduce a framing the English
wording deliberately avoided. `ko-KR` reached 100% `MessageKey` coverage
(0 fallback), confirmed by `src/dev/i18n-audit.ts` (new permanent dev
tool, same category as `diagnose.ts`) and locked by
`interpretation.test.ts`'s `translationCoverage("ko-KR") === 1` guard.
Quiz screen grouping (`quizScreens.ts`) reads `en[q.promptKey]`'s length
**unconditionally**, confirmed by reading the source — Korean wording
length can never reshuffle the 53 screens regardless of locale.

**Native-copy quality pass (Phase 8K).** A separate human Korean-language
review, after technical coverage was already approved, found some
technically-correct copy still read as translated English rather than
native Korean. Full audit classified every prose string A (natural) / B
(translation-flavored) / C (semantically risky) — found the systemic risk
was narrower than bucket-level pattern-matching suggested: targeted
calque scans showed the real problems concentrated in the 34
`helpsWhenKey` sentences (13 rewritten — removed "이득을 얻다"/"검증을
견뎌내다"/literal "그림이 뚜렷해지다" English-metaphor calques) and 6
specific C-risk strings, not a wholesale rewrite of the 102 dev-guide
cautions or 26 tradeoff sentences (their shared "X는 Y가 아닙니다 — Z일
수 있습니다" reframe structure is an already-established, legitimate
Korean pattern reused from prior human-approved copy, not a calque — "do
not force rhetorical variation merely for variety" held). The
`compare.learn.intro` "correlation is not causation" academic slogan and
both "difference is not deficiency" tagline instances were also rewritten
in plain product Korean, preserving the same required meanings.

**Terminology — 4 attribute display names changed** (presentation only,
`attribute.ko` value only — no attribute id, scoring, or taxonomy key
touched):

```
proactive_agency:   주도적 행동력 → 선제적 행동력   (shared "주도" root with
                     leadership_drive's "주도 성향" was a real naming
                     collision, both visible together on real profiles;
                     "선제적" = "acting first" is established Korean
                     business usage for exactly this construct)
resourcefulness:    임기응변력 → 자원 활용 성향       ("임기응변" risked
                     reading as ad-hoc cleverness/talking one's way
                     through; construct is substituting/making do under
                     resource constraint, confirmed against q59/q60/q15c)
belief_updating:    신념 갱신 → 입장 수정 성향         ("갱신" is
                     administrative Korean — license/subscription
                     renewal — not something said about a person
                     changing their mind)
impact_motivation:  영향력 동기 → 영향 창출 동기       ("영향력" drifts
                     toward social power/authority; construct is about
                     work reaching/affecting people, not personal clout)
```
`모호함 수용`/`갈등 감내`/`시스템적 사고`/`분야 횡단성` were reviewed and
kept unchanged — no real naturalness problem found, not touched to avoid
churning working copy. The 4 renames' only dependent prose was one inline
sentence (`dev.impact_motivation.medium.caution.1`) — every
`helpsWhenKey`/`preservesKey` sentence is trait-agnostic by design and
needed no edits.

**6 C-string fixes** (exact semantic risk, not just style):
`compare.section.learn` ("그들에게서 배울 수 있는 점" → later superseded,
see brand-tone pass below), `compare.learn.none` and
`results.unexpected.none.body` (dropped "기능의 누락이 아니라..."
QA/error-state language for the same "this null result is normal" idea
already expressed naturally elsewhere in the product), `label.your_advantage`
(later superseded, see below), `compare.section.dont_copy` (later
superseded, see below), and `label.dont_copy` converged onto the same
register (that key is currently unreferenced in `app/`, kept aligned
anyway per instruction).

**Person-name localisation.** `person.name.{slug}` — presentation-only
Korean display names for all 35 current-roster people, resolved through
`personDisplayName(locale, person)` (`i18n/index.ts`), which calls the
same `tOptional` mechanism `historicalPolityKey` already used, falling
back to `canonicalName` when no entry exists. `ko.ts`'s exported type was
extended with a template-literal type (`` `person.name.${string}` ``)
specifically so this key namespace didn't need mirroring into `en.ts` —
English never needs an override, so adding 35 redundant entries there
would only create drift risk. Wired into every `{person}`
interpolation/render site (results cards, compare hero and all template
interpolations, `TargetSwitcher`, person directory, person detail page +
metadata). **Never affects canonical identity** — `id`/`slug`/matching/
`externalIdentity` are untouched by design (`personDisplayName` reads
only `{slug, canonicalName}`, confirmed absent from
`matching`/`quiz`/`greatness` by grep) — locked by
`personDisplayName.test.ts` (6 tests, including one that deliberately
constructs an unauthored slug to prove the fallback path is real, not
just untested, and one that fails if a future 36th person has no Korean
name authored). Two names carry a flagged, unresolved ambiguity, not
silently guessed: **Bruce Lee** (implemented "브루스 리"; "이소룡," the
Sino-Korean reading of his Chinese name, is at least as established) and
**Rumi** (implemented "루미," the well-established short form, rather
than an invented transliteration of the full "Jalal ad-Din Muhammad
Rumi" — no settled Korean rendering of the full name could be verified).
Minor, lower-priority variant flags: Beethoven (판/반 베토벤), Rosalind
Franklin (로절린드/로잘린드), Yayoi Kusama (surname-first "쿠사마 야요이"
implemented, matching the Miyazaki/Kurosawa convention, vs. her
internationally-branded "Yayoi Kusama" Western order).

**Korean display-serif typography fix.** `--tgi-font-display`
(`tokens.css`) listed "Source Han Serif KR"/"Noto Serif KR" as bare
system-font *names* — nothing in the project ever actually loaded a font
(`next/font`/`<link>`/`@font-face` were all absent). Neither name is
OS-bundled anywhere, so every Hangul heading silently fell through the
entire stack to the generic `serif` keyword — Batang on Windows, a
traditional/calligraphic system font clashing with the product's
editorial Latin serif. Fixed by loading `Noto_Serif_KR` via
`next/font/google` in `app/layout.tsx` (`weight: "400"` only — every
`--tgi-font-display` consumer uses regular weight), exposed as
`--font-noto-serif-kr` via `.variable` attached to `<html>`, and
`tokens.css` now reads `var(--font-noto-serif-kr)` in the exact stack
position the dead names occupied. Self-hosted at build time (confirmed:
124 chunked `.woff2` files in the production build output, all served
same-origin at runtime, zero requests to Google) — no runtime external
dependency. Latin headings are provably unchanged: `ui-serif`/`Georgia`/
`"Iowan Old Style"` still resolve every Latin glyph before the fallback
chain ever reaches the Korean font (confirmed via matching
`getComputedStyle` on `/en-US` and `/ko-KR`, and visually byte-identical
screenshots). Body/UI sans (`--tgi-font-sans`) was left untouched —
`system-ui` already resolves to Malgun Gothic on Korean Windows, no
defect found there.

**Occupation & impact-domain presentation coverage.** `humanize(id)` (a
naive underscore→space string transform, always English regardless of
locale) was the only transform ever applied to `occupationIds[0]` (the
one occupation slot actually rendered, on results/compare/directory/
person pages) and `impactDomains` (the person-page "known for" chip
list) — a hidden localisation gap the 100%-`MessageKey`-coverage figure
couldn't detect, since these are `Person` data fields, not i18n bundle
keys. Fixed with the same `t(locale, key)` pattern already used for
`era.*`: **45** `occupation.*` keys (the exact count actually used across
the current 35-person roster, verified with a precise script — corrected
from an initial audit's off-by-one estimate of 46) and all **15**
`impact_domain.*` keys (the closed `ImpactDomain` union, promoted from a
bare type to a `IMPACT_DOMAINS` const array + derived type — same pattern
as `ATTRIBUTE_IDS`/`AttributeId` — specifically so a runtime coverage
check has something to iterate). `fieldIds`/`tagIds` were confirmed
NEVER rendered as user-facing text anywhere in `app/` (search/filter-only
data) and deliberately excluded, not over-covered. New regression guards
`missingOccupationCoverage()`/`missingImpactDomainCoverage()`
(`core/people/explorer.ts`, same live-audit-against-the-real-roster
pattern as `missingDevelopmentGuides()`/`missingTradeoffCoverage()`)
fail the moment a future person or domain value ships without authored
EN+KO text — one test deliberately injects an unauthored occupation id
to prove the guard actually fires, not just passes vacuously.

**Final brand-tone micro-pass** (human-approved, last Phase 8 change):
five compare-page section headings warmed from formal noun-phrase
register toward a more memorable, personal tone, banned-words list
(장점/우위/더 뛰어나다/내가 더 낫다) re-checked against every new string:

```
공통점                    → 닮은 점
성향이 다른 지점           → 달라도 괜찮아
배워볼 만한 점             → (unchanged)
당신에게 더 두드러지는 점   → 내 쪽이 더 두드러지는 점
그대로 따라갈 필요는 없는 점 → 다 따라갈 필요는 없어
```
`label.your_advantage`'s value change (shared between `/results` and
`/compare`) updates both pages from the same key. The new first-person
"내"(my) register in the heading and the second-person "당신의
프로필은..." register immediately below it in `tpl.advantage_intro` are
NOT a grammar inconsistency — Korean product/app copy conventionally
uses first-person self-referential headings ("내 정보"/"내 프로필") next
to second-person body text; this is idiomatic, not mixed-up. No nearby
body copy needed grammar fixes as a result of these heading changes.
`label.dont_copy` (a separate, currently-unreferenced key) was
deliberately NOT re-converged with `compare.section.dont_copy`'s new
casual register — flagged as a minor, low-stakes divergence, not fixed,
since only the five named headings were in scope for this pass.

**Verification, every stage.** `tsc --noEmit` clean throughout;
`vitest run` **268/268** at final close (from 259 at Phase 7 close: +6
`personDisplayName` tests, +3 occupation/impact-domain coverage guards);
`pnpm build --webpack` clean, **81 routes**, unchanged throughout every
stage. EN/KO deterministic identity re-confirmed after every content
change via `src/dev/i18n-identity-check.ts` (new permanent dev tool —
runs a fixed synthetic response set through the full score → match →
greatness pipeline and prints a hash; there is no locale parameter
anywhere in that call chain, confirmed by grep, not just asserted) — 64
questions, 53 screens, identical score hash, every time. Live-verified at
360/390/768/1280/1920px with zero horizontal overflow and zero console
errors on Benjamin Franklin and Genghis Khan's Korean compare pages, the
Korean quiz (including all three custom-anchor items), and Ada Lovelace's
Korean/English person pages, at every stage a change was made — not
assumed from the CSS/data alone.

**Known non-blocking items, recorded not fixed:**
- `TargetSwitcher`'s live search still matches only `canonicalName`/
  `aliases`/tags — typing a person's *localized* Korean name (e.g.
  "칭기즈") won't find them unless it happens to already be in their
  `aliases` array. Same underlying gap as the pre-existing "alias/
  native-script search" item in "People explorer" above, now also
  relevant to the new localized-name feature specifically.
- `generateMetadata`'s `<title>` boilerplate ("You × {name} — The Great
  Inside") only localizes `{name}`; "You ×"/"The Great Inside" stay
  English on `/ko-KR` routes. Pre-existing gap (noted since Phase 7),
  narrower in scope now that the name itself is localized.
- `label.dont_copy`/`label.you_both` (results page) are stylistically
  divergent from their compare-page counterparts after the brand-tone
  pass — noted above, not fixed, out of this pass's named scope.

**2026-08 narrow follow-up (during Phase 9 Stage 9D, NOT a Phase 8
reopening — scoped explicitly to typography + 3 copy strings + one new
header control):**
- **Korean typography rule**: UI/page/section headings (`.tgi-display`,
  `.tgi-heading`) now render in the sans stack under Korean — the
  editorial Latin/Hangul serif everywhere was making plain UI labels read
  like a historical-book/traditional-print site. Person-identity display
  (the person detail page H1, the results closest-match H3, the compare
  page hero H1 — the three places a bare person name renders as a
  `Heading`, not interpolated into a sentence) keeps the serif via a new
  `.tgi-person-name` escape-hatch class, same specificity as the blanket
  rule, winning on source order. `PersonCard`'s own `.tgi-personcard__name`
  was already a separate class and needed no change. Scoped via `:lang(ko)`
  off a `lang={locale}` attribute now set on a wrapper in
  `app/[locale]/layout.tsx` — deliberately NOT the root `<html lang>` in
  `app/layout.tsx`, which stays the static `"en"` Phase 3 already
  documented as deliberate, Phase-10-SEO-scoped. English typography is
  byte-identical (no `:lang(en)` rule exists to change it) — confirmed
  live, not assumed.
- **3 Korean copy rewrites** (`ko.ts` only, `en.ts` untouched):
  `results.hero.title` ("당신의 Greatness 프로필" → "당신의 프로필",
  dropping the mixed-language title while `label.greatness_potential`
  stays the untranslated branded metric label immediately above the
  score, as before), `archetype_result.strong_match` + `.body` (the
  match-strength card — "강한 일치" → "닮은 점이 많아요"; the intro
  sentence rewritten to drop the clinical "밀접하게 일치합니다" framing),
  and `result.greatness.explainer` (the Greatness Potential disclaimer,
  rewritten to "참고용 프로필 점수"/"예측하는 지표는 아닙니다" phrasing —
  same meaning, no threshold/calibration/score change, confirmed by an
  unchanged `greatness.test.ts`/`matching.test.ts` run).
- **`greatness.band.*` (5 Korean band labels) were audited as a set and a
  full EN → current-KO → proposed-KO table was reported to the user, per
  explicit instruction to wait for confirmation before changing wording
  that needs to read as one coherent scale — NOT yet implemented.**
  Proposal: standardize all five on "패턴" as the single root noun (the
  current set inconsistently mixes "패턴"/"정렬," and band 5 doubled up
  both awkwardly) with an escalating intensity ladder — 흔치 않은 패턴 →
  떠오르는 패턴 → 뚜렷한 패턴 (unchanged) → 강한 패턴 → 매우 강한 패턴 —
  which also fixes the originally-flagged `형성 중인 패턴`
  (emerging_pattern)'s "still under construction" framing by replacing it
  with "떠오르는" (emerging/rising), the more standard rendering.
- **Locale switcher added to the header** (compact "EN / 한국어",
  `app/[locale]/LocaleSwitcher.tsx`) — preserves the current path AND
  exact query string when switching (`usePathname()`/`useSearchParams()`,
  the latter wrapped in `<Suspense>` in `Header.tsx` per Next's
  requirement — omitting that would have been the same class of
  static-generation mistake as the Stage 9D `cookies()` regression,
  caught proactively this time rather than found via a broken build).
  Active locale distinguished by weight + underline + opacity together,
  never color alone. A real `<a href>` navigation (not a client router
  push) — locale affects server-rendered content, and cookies aren't tied
  to client router state either way, so this cannot sign anyone out.
  Verified live at 360/390/768/1280/1920px: no horizontal overflow at any
  width, query param preserved exactly across a locale switch on
  `/results?r=...`.
- Verified together: `tsc --noEmit` clean, `vitest run` 312/312
  (unchanged — greatness/matching tests confirm no scoring/output drift),
  `pnpm build --webpack` clean, 82 routes, static/dynamic split confirmed
  identical to the pre-follow-up baseline.

## Stack

TypeScript (strict, ESM), Vitest, PostgreSQL/Supabase, Next.js (App Router).
**pnpm via corepack** — the global npm in this environment has a corrupted
dependency tree (`minipass-flush` against `minipass@7`) and fails on install;
`corepack pnpm@10` works. `src/core` is framework-agnostic and must stay that
way: no React, no `next/*`, no I/O, no `Date.now()`, no randomness — `app/`
consumes it, never the other way around.

```
src/core/attributes    canonical taxonomy (the contract everything shares)
src/core/quiz          question bank, scoring engine
src/core/matching      similarity, calibration, dispersion, result selectors,
                        person-to-person similarity
src/core/greatness     archetypes, Greatness Potential
src/core/interpretation rule templates, distinctiveness, development guides,
                        trait constellation
src/core/people        explorer: search, filter, sort over Person[]
src/core/i18n          message bundles, fallback resolution
src/data/people        reviewed seed profiles (builder.ts + seed.ts roster 1 + roster2.ts roster 2)
src/ui                 design system (tokens.css, components.css, React components, pure display helpers)
src/dev                simulator, calibrator, diagnostics, design-system gallery
app/                    Next.js App Router: people explorer + person pages
db/schema.sql          normalised schema
```

**Build/dev must pass `--webpack`** (`pnpm dev` / `pnpm build` already do).
Turbopack — Next 16's default bundler — cannot resolve this project's
internal `../foo.js` specifiers that point at `.ts` files (needed for
`tsx`/Vitest's Node-native ESM resolution, which the whole test suite and dev
tooling depend on). Neither `turbopack.resolveExtensions` nor
`experimental.extensionAlias` in `next.config.mjs` fixed it when tested
directly; Next's webpack path resolves it natively with no extra config.
Revisit if a future Turbopack release adds this, but don't spend time on it
otherwise — `--webpack` works and costs nothing.

## Design system — `design_system_v1`

`src/ui`. Editorial/premium direction: warm paper background, deep charcoal
ink, one purple accent, serif display type, sans interface type, tabular
numerics for scores. Both light and dark themes are first-class (`tokens.css`,
`prefers-color-scheme` + `[data-theme]` override). Components: `Button`,
`Card`, layout primitives (`Stack`/`Cluster`/`Grid`), and the data components
that carry the product's core invariants —

- `ImpactBadge`: colour is never the only signal; every impact ships a text
  label and a glyph (tested).
- `ScoreBar` / `TraitChip`: render scores with no "%" — a score is a location
  on a dimension, not a percentage. Only `formatMatch` (Profile Match) uses
  "%"; only `formatPotential` (Greatness Potential) uses "N / 100".
- `ComparisonBar`: draws the gap between two values explicitly (the subject of
  a comparison), exposed as one `role="img"` sentence for screen readers
  rather than two disconnected progress bars.
- `ConfidenceIndicator`: three coarse pip bands, never a raw decimal — a
  person profile is inferred, and a number like "0.82" implies false
  precision.
- `PersonCard`: initials placeholder when no portrait exists (most historical
  figures have none under a free licence) and exactly one focusable element
  when linked (stretched-link pattern), not one per sub-element.

`corepack pnpm@10 exec tsx src/dev/gallery.tsx` renders every component with
real seed data to `preview/design-system.html` — a visual smoke test as well
as a review artifact; it fails if a component throws. `TextField`/`Select`
(added in Phase 3 for the explorer's search/filter controls) reuse the same
token-only `.tgi-field` styling rather than introducing a separate pattern.

## Anti-AI-template / human-authored design principle (adopted 2026-08)

A standing constraint on every future visual decision — Landing, Person,
Results, Compare, SEO/share surfaces, any later monetisation UI — not a
one-time Phase 10D preference. Researched against current (2024-2026)
design commentary before adoption, not assumed from priors; see sources
below.

**The pattern being avoided.** 2024-2026 AI website builders and
"vibe-coded" tools converge on the same visible fingerprint because LLMs
trained on the modal SaaS/marketing web return the *median* of that
training data: Inter or another neutral system typeface used for
everything including headlines; an indigo/blue-to-purple gradient in the
hero, on CTA buttons, or as a background wash; glassmorphism (frosted
cards floating over soft gradient blobs); an oversized hero with vague,
interchangeable copy ("Build the future," "Your all-in-one platform");
bento grids and pill badges used decoratively, not because the content
has that shape; a uniform three-column "icon + heading + two-line
description" feature block; every piece of content boxed in a bordered/
shadowed card regardless of whether it needs a boundary; fake-looking
testimonial/stat blocks; and gratuitous micro-animations with no
semantic purpose. This is called "distributional convergence" in current
commentary — not a style choice, a statistical default.

**The rule.** For every design decision, ask *why this element exists
specifically in The Great Inside* — content, subject matter, or a real
product invariant. If the honest answer is "it looks modern," "it fills
the space," or "this is what SaaS sites normally do," don't use it. This
is not a mandate to be quirky, inconsistent, or deliberately imperfect —
human-authored means *intentional*, not messy; do not introduce fake
irregularity to *perform* human-madeness.

**Audit against the current build (2026-08).** Checked, not assumed:
- **Not present, and must not become an invented problem to "fix":** no
  gradients anywhere in `tokens.css` (every colour is a flat semantic
  token); no glassmorphism; no Inter/neutral-only typography (the
  editorial serif `--tgi-font-display` + sans `--tgi-font-sans` pairing
  already exists specifically to avoid this); no vague AI-startup copy
  (every string is either data-derived or specific to this product's own
  mechanics); no fake testimonials/stats (none exist — there is no user
  base yet, and none should be invented); no gratuitous micro-animation
  (`--tgi-duration-fast`/`--tgi-duration-base` transitions are limited to
  functional state changes — hover/focus/checked — and respect
  `prefers-reduced-motion`).
- **Present but confirmed legitimate, not a tell:** `.tgi-grid`'s
  auto-fit card grids (Trait Constellation, Similar People, category
  matches) are real data enumeration — one card per actual trait/person/
  match, count driven by data, not a fixed decorative "3 features"
  shape. Structurally the opposite of the AI-generated three-column
  feature-blurb pattern, which is content-empty and always exactly
  three. `.tgi-chip`/`.tgi-impact`'s pill shapes carry meaning (a glyph +
  label + a real attribute value or impact classification, never
  decoration) — legitimate under CLAUDE.md's own pre-existing "colour is
  never the only signal" rule, not the AI-tell "pill badges scattered
  for visual texture."
- **Live risk to watch, not yet a defect:** the temptation to add a
  Landing "why this product" three-card feature-blurb section, or any
  bordered card whose only job is to hold a short marketing sentence —
  exactly the pattern research identifies as the single most recognisable
  AI-generated tell. None exists today; don't add one to "fill space" on
  a wide viewport (see Phase 10D's own explicit instruction against
  decorative filler).

**Avoid by default:** gradients (purple/blue or otherwise) as decoration;
glassmorphism; Inter or other neutral system typefaces standing in for
this project's editorial serif/sans pairing; symmetric three/four-column
generic feature-card blocks; bento-grid layouts chosen for visual
novelty rather than a real content shape; pill/badge elements that carry
no data or meaning; boxing every piece of content in a bordered/shadowed
card by default (a card should mean something — a discrete, ownable unit
of data — not be the default container); vague benefit-oriented
marketing copy; fabricated social proof of any kind; micro-animation
without a functional trigger.

**Preserve and strengthen:** the warm paper background and single
restrained purple accent (never a gradient); the editorial serif display
face paired with a plain sans interface face; the person-name/identity
serif treatment (`.tgi-person-name`) as a deliberate exception, not the
default; a quiet, restrained overall tone; hierarchy built from type
scale, weight, and whitespace before borders or shadows; dividers and
card boundaries used selectively, to mark a real section or data
boundary, not by default; content-driven, data-enumerated grids (never a
fixed decorative count); asymmetric, content-specific composition (the
Phase 10D `Rail` primitive) over generic centred single-column templates
or symmetric dashboard grids.

Sources consulted (2026-08): [Why Your AI Keeps Building the Same Purple
Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website),
[AI Slop Web Design: Complete Guide to Spotting and Fixing Generic
Websites](https://www.925studios.co/blog/ai-slop-web-design-guide),
[AI Slop Fonts and Gradients: The Tells That Give Away AI
Design](https://www.925studios.co/blog/ai-slop-design-tells), [Editorial
design principles that still matter in
2026](https://www.toastdesign.co.uk/design-resources/editorial-design-principles-2026/).

## People explorer — `explorer_v1` / `person_similarity_v1` / `constellation_v1`

`app/[locale]/people` (directory) and `app/[locale]/people/[slug]` (person
page), backed entirely by pure `src/core` selectors — the pages themselves
contain no matching or filtering logic, only rendering.

**Search/filter/sort (`src/core/people/explorer.ts`).** `searchPeople` is a
case-insensitive substring match against name, tags, occupations and fields;
alias/native-script search (item 46 — "이순신"/"Yi Sun-sin"/"李舜臣" resolving
to one entity) needs `person_translations.aliases`, which exists in
`db/schema.sql` but has no TypeScript data yet, so it's Phase 8 work.
`filterPeople` ORs values within one facet, ANDs across facets — the standard
faceted-search convention. Defaults to match-eligible people only;
`matchEligibleOnly: false` opts into browsing under-evidenced profiles, which
must stay visitable per the safety rules below. Directory UI currently
exposes single-select Era/Region/Sort controls; the underlying `PeopleFilter`
type already supports full multi-value faceting (tags, occupations, trait
score/impact thresholds) — that's a UI gap, not a core one.

**Person-to-person similarity (`src/core/matching/personSimilarity.ts`) reuses
`matching_v2` unchanged** rather than reimplementing the level/scatter/pattern
formula a second time. The adapter turns a `Person` into the `UserProfile`
shape `matchUserToPerson` already expects, filling any of that person's
unscored attributes with `scoring_v1`'s exact unanswered-question convention
(neutral 50, floor confidence 0.2) — not an arbitrary choice, the same "we
have essentially no information here" rule already governing quiz gaps,
applied to the other place a profile can be incomplete. One documented
simplification: the returned `coverage` reflects only the second person's
scored-attribute count (`matchUserToPerson`'s existing framing), so a thin
anchor's thinness shows up in the similarity number via confidence-weighted
terms but isn't double-counted into coverage shrinkage a second time. Proven
in tests: comparing a person to themself lands at exactly
`NEUTRAL_RAW_SIMILARITY + (1 − NEUTRAL_RAW_SIMILARITY) × coverage` — a closed
form, not an approximation. `rankSimilarPeople` / `selectOppositePerson`
mirror `rankMatches` / `selectOppositeProfile`'s rules exactly (eligible
candidates only, ties on id, opposite framed as curiosity not a verdict).

**Trait constellation (`src/core/interpretation/constellation.ts`)** selects
8-12 traits per person for the profile page — deliberately *not* the highest
raw scores (item 38: "this person is complicated", not "this person has ten
amazing traits"). Ranks by `|z|` against `reference_v2` exactly like a user's
signature trait, confidence-gated at 0.5, then caps any one impact type at
50% of the result (with a fallback fill pass if the eligible pool can't
support the mix) — that cap is the mechanism that forces the mix rather than
just asking for one. Verified against real seed data, not merely asserted:
da Vinci's and Curie's constellations are provably *not* their top-12 raw
scores, and both land at exactly the 6/12 advantage cap.

**Editorial content deferred.** Person pages render only structurally
available data — no invented "why they stand out" / "career pattern" / "don't
copy this" prose. `doNotCopyKeys` exists on `Person` but has no authored
copy yet (7 of 35 seed people set a key) and isn't rendered; same Phase 7
status as development guides below. `PersonAttribute.benefitExplanationKey`
etc. are unpopulated in the current dataset, so `TraitCard` renders in its
score+impact-only degraded mode throughout — the mode it was built and tested
for in Phase 1.

**Static generation, no DB yet.** `generateStaticParams` at both the
`[locale]` and `[slug]` segments compose automatically into the full
cartesian product — 35 people × 2 launch locales = 70 person pages, verified
by build output (75 total routes including `/`, `/_not-found`, and the two
directory pages). Data still comes straight from `SEED_PEOPLE`; swapping in
Supabase reads is Phase 9+ and shouldn't change any component's props.

## External identity & media metadata

Four fields added to `Person` (2026-08): `aliases`, `historicalPolityKey`,
`externalIdentity` (Wikidata QID + per-locale Wikipedia URLs), `portrait`
(image + licence chain). All four are **presentation/search/SEO metadata
only** — the same category as `nationalityCodes`/`regionCode`/`tagIds`, and
held to the same hard rule: MUST NOT influence similarity. Enforced exactly
like every other metadata field — `matching.test.ts`, `personSimilarity.
test.ts` and `greatness.test.ts` all mutate every field in this group and
assert byte-identical scores, not just spot-checked.

**`aliases: string[]`** — alternate names, spellings, romanisations and
native-script forms (e.g. `["이순신", "李舜臣"]` for Yi Sun-sin), flat and
locale-independent because they're a fact about identity across writing
systems, not a per-locale UI string. Feeds `searchPeople` directly (product
spec item 46 — "이순신" now finds Yi Sun-sin regardless of the current UI
locale, verified end-to-end in the running app, not just unit-tested).
Distinct from the DB schema's separate `person_translations.aliases`, which
is per-locale *display* curation ("known as" text shown in that locale's UI)
— a different, complementary concern.

**`historicalPolityKey?: string`** — the polity a person actually lived
under (e.g. `"polity.ming_dynasty"`), resolved via `t(locale, key)` exactly
like attribute names and era labels, so a polity shared by several people is
authored once. Exists because `nationalityCodes` is a *modern*, ISO-mapped
field and is frequently anachronistic: Marie Curie was born in 1867 under
Russian imperial partition, decades before an independent Poland existed;
Zheng He was never a citizen of the modern PRC. `nationalityCodes`/
`regionCode` are unchanged and keep their existing job (modern-day-mapped
filtering); this is an *additional* presentational field, not a replacement.
Left unset rather than forced when a person's history genuinely doesn't
reduce to one polity (da Vinci worked across Florence, Milan and France —
picking one would be a contested oversimplification, same discipline as not
padding a thin trait score to hit a target).

Because this key is free-form and per-person (not a closed, fully-enumerated
union like `AttributeId`), calling the ordinary `t()` on it would be a type
error if done honestly, or a runtime crash on an unauthored key if forced
with a cast. Added `tOptional(locale, key)` to `i18n/index.ts` for exactly
this case: same interpolation behaviour as `t()`, but returns `undefined`
instead of throwing when the key doesn't exist in either bundle. `t()` itself
is intentionally left alone — weakening its `key: MessageKey` parameter to
`string` would silently drop the compile-time guarantee every other call site
relies on.

**`externalIdentity` / `portrait`** — Wikidata QID + per-locale Wikipedia
URLs, and an optional portrait with its full licence chain (`source`,
`license`, `licenseUrl`, `attribution`). `license`/`attribution` are stored
as plain, unlocalised strings deliberately — most free-licence terms (e.g.
CC BY-SA) require reproducing the credit line as given, not a translated
paraphrase. Absent by default: `PersonCard`/the person-page hero fall back to
the initials placeholder, which is the expected common case, not a degraded
one — most historical figures have no portrait available under a free
licence.

**Layout regression from the portrait hero, found and fixed same day.** The
name column shrank to ~310px and visually clipped — NOT caused by
`overflow-x: hidden` or `word-break: keep-all` (confirmed by temporarily
disabling `overflow-x: hidden` and re-measuring: `scrollWidth` was identical
either way). Root cause: the portrait's attribution `<Text>` sits inside
`.tgi-text { max-width: var(--tgi-measure) }` (68ch, meant for prose), and
neither it nor its parent `Stack` had any width tie to the 192px image.
Flexbox sizes an `auto`-width item by its content's preferred size, so the
short caption's *unwrapped* width (~487px) became the whole portrait column's
width — stealing space from the sibling name column in the same flex row,
measured directly: portrait column 487px against a 192px image, name column
squeezed to 310px. Fixed by wrapping the portrait in a `width: 12rem;
flex-shrink: 0` box (ties the column to the image, forces the caption to wrap
inside it instead of ballooning outward) and giving the name column
`flex: 1 1 16rem; min-width: 0` (claims the row's actual remaining width
instead of being sized by content, and allows proper shrink/wrap instead of
forcing the row wider than the container). Verified after the fix at 360,
390, 768, 1280, 1440, 1920px in both English (with the real da Vinci
portrait) and Korean — `scrollWidth === viewport` at every one, name never
wraps or clips at any width. Lesson for any future two-column layout: an
`auto`-sized flex item needs an explicit width tie to its "anchor" content
(here, the image) whenever a *sibling* of that anchor (here, the caption) has
no width constraint of its own — otherwise the sibling's natural size decides
the column's width, not the anchor.

**Population status (2026-08): 5 of 35 people have verified data** — da
Vinci, Marie Curie, Yi Sun-sin, Zheng He, Ibn Khaldun. Every Wikidata QID and
Wikipedia URL was checked with a live fetch against the actual Wikidata/
Wikipedia page (label and description confirmed to match), not recalled from
memory — a wrong QID is worse than a missing one. Da Vinci's portrait
(`Leonardo_self.jpg`, Biblioteca Reale di Torino, Public Domain) was verified
the same way, direct from the Commons file page. The remaining 30 people have
the schema available but no data populated — same deliberate-incompleteness
discipline as development guides (10/30 attributes) and `doNotCopyKeys`
(7/35 people): the field exists and degrades gracefully when absent, and
getting a handful of entries right beats guessing at all of them.

*(Implementation-fact cross-reference, Phase 10D-2, 2026-08: confirmed via
`grep -n "portrait: {"` across both seed files that da Vinci is currently
the ONLY person with a populated `portrait` field in the dataset — a
distinct fact from "verified data" above, which covers external-identity
metadata (QID/Wikipedia) for 5 people. Yi Sun-sin and the other 3 have
verified external identity but no portrait field populated yet. Recorded
here because Phase 10D-2's Person-page layout work depended on knowing
this precisely, not assumed from this paragraph's proximity to "5 of 35."
See "Phase 10D-2" below for where this mattered.)*

**`db/schema.sql`** gained matching columns/tables: `aliases` (gin-indexed)
and `wikidata_id` (unique-indexed) directly on `people`; `historical_polity_
key`; a new `person_wikipedia_links` table (person_id, locale, url); a new
`person_portraits` table (1:1 with `people`, MVP scope — extend to a ranked
list only if a real curation need appears) with a `verified_by`/`verified_at`
pair mirroring the trait-evidence review discipline, so a licence can never
be marked correct without a human having actually checked it.

## Attribute taxonomy — `taxonomy_v1`

**30 attributes across 6 facets.** The facets *are* the six category matches
(thinking / creativity / work style / resilience / social / motivation), so no
separate category mapping exists to drift out of sync.

Consolidated from the original ~35-item brainstorm:

| Merged | Into | Why |
|---|---|---|
| `analytical_thinking` | `analytical_rigor` | same construct |
| `systems_thinking` + `abstract_thinking` | `systems_abstraction` | both are "zoom out to structure" |
| `creative_divergence` + `originality` | `creative_originality` | fluency and unusualness didn't separate empirically |
| `cross_disciplinary_thinking` + generalist orientation | `cross_domain_range` | duplicate |
| `discipline` + `consistency` | `discipline` | duplicate |
| `decision_speed` | `decisiveness` | moved to resilience facet, distinct from `execution_speed` |
| social `independence` + `autonomy` | `autonomy_need` | duplicate |
| `recognition_motivation` | *dropped* | heavy social-desirability bias, weak discrimination |
| — | `aesthetic_sensitivity` **added** | nothing else separated creative profiles; it has the highest dataset dispersion of any attribute |

Why 30 and not 60: with a 45-60 item bank, each attribute needs 3+ independent
items. More attributes means thinner measurement, not more insight.

**Score is a location, not a rating.** `perfectionism: 94` means "far up the
perfectionism dimension", never "94% good". Impact is a separate axis
(`advantage` / `dual_edged` / `risk` / `neutral`) and is always scoped to
*person × attribute × context* — curiosity is not globally green.

`contributionShape` (`higher_can_help` / `lower_can_help` / `balanced` /
`contextual` / `cluster_dependent`) is internal modelling vocabulary. Never
render it to users.

`reference: {mean, sd}` is a **stated modelling assumption**, not measured
population data, and is versioned as `reference_v2` (bumped from `reference_v1`
in Phase 4 — see that section for why the numbers themselves were deliberately
left unchanged in the bump). It is used for distinctiveness/z-scores only.

## Scoring — `scoring_v1`

```
avg_a   = Σ(direction · weight) / Σ(weight)      over items loading on a
score_a = clamp(0, 100, 50 + GAIN · 50 · avg_a)   GAIN = 1.25
conf_a  = clamp(0.2, 1, Σweight / 2.5)
```

A weighted mean is commutative, so question and section order cannot change the
result. `GAIN` exists because a plain mean regresses hard toward 50 and destroys
match spread; it is part of the version string because changing it changes every
historical result. Unanswered attributes get 50 at floor confidence — and since
matching multiplies by user confidence, an unmeasured trait contributes almost
nothing rather than faking a real 50.

Authoring guards (enforced in tests, not just convention): every attribute has
≥2 independent items, and no single item holds >55% of an attribute's weight.
`analyseCoverage()` is the check; `pnpm exec tsx src/dev/diagnose.ts` prints it.

### Evaluative symmetry (quiz item wording)

A distinct, human-validity discipline from the statistical guards above —
found by real-user feedback on `quiz_v2` (Phase 6.6 Stage 10B), not by any
simulator. A question should, where reasonably possible, describe two
defensible *operating tendencies*, not a desirable trait and the
undesirable absence of it. Even a genuinely, statistically bidirectional
item (clean `oneSidedShare`, a real `meanDiff`) can still bias honest
self-report if one pole reads as diligent/perceptive/open-minded/proactive/
resourceful and the other reads as its deficient opposite — the simulator
cannot detect this because it does not model social desirability, only
response distributions.

```
NOT persistent vs. gives up            PREFER stay-with-it-longer vs. redirect-sooner
NOT perceptive vs. slow to notice      PREFER act on early signals vs. wait for confirmation
NOT resourceful vs. incapable          PREFER substitute-now vs. secure-preferred-resources-first
NOT open-minded vs. stubborn           PREFER reopen readily vs. require stronger counterevidence
NOT takes initiative vs. passive       PREFER self-initiate across role boundaries vs. route through
                                        established responsibility
```

Higher is still NOT inherently better — this is wording hygiene, not a
reference or scoring change. Three things this is *not*:
- **Reverse-keying is not the same as evaluative neutrality.** A reversed
  item can still frame its low pole as a deficiency; reversal only flips
  which end scores high.
- **Negative wording is not sufficient.** "There's often a gap before I
  notice" is negatively worded but still reads as an admission of
  obliviousness, not a legitimate strategy.
- **Indirection does not neutralise social desirability** — hiding "works
  harder" or "can usually get people to see things my way" behind softer
  phrasing doesn't fix the item if the underlying comparison is still
  virtue-vs-deficiency.

A low-pole response should, ideally, have a legitimate strategic rationale
a reasonable person would recognise in themselves. Validating this is a
semantic/readability review, not a simulation — passing
`analyseDirectionBalance`/`trait-diagnostic.ts` after a wording change
proves scoring mechanics weren't altered, never that the item reads as
neutral. Applied retroactively to 17 of `quiz_v2`'s 64 items at Phase 6.6
Stage 10B (full audit and before/after wording in
`docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 10B"); apply
prospectively to every new item authored from here on.

**The rule extends to human review, not just authoring.** Stage 10B's own
17-item pass was itself live-reviewed by the user directly against the
running quiz (not just read as a diff), and that review caught 5 items
(`q11`, `q29`, `q49`, `q53`, `q64`) where a still-live comparison, virtue
claim, or competence implication had survived the first rewrite pass —
confirming this kind of loading is genuinely hard to self-audit
exhaustively in one pass and that a second, independent read is worth
the cost for a human-facing instrument. One candidate rewrite offered
during that review (`q53`) was itself rejected and replaced with a
counter-proposal, for a reason worth generalising: a fix for evaluative
loading must still be checked against construct leakage into an
*adjacent* attribute (here, `analytical_rigor` drifting toward
`intuitive_synthesis`/`systems_abstraction` via "the overall case it is
making" language) — removing a virtue framing is not a license to skip
the ordinary construct-validity check every other item change gets. Full
before/after and the rejection rationale in
`docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 10B — human-review
micro-pass".

### Response-anchor symmetry (Phase 6.6 Stage 10C)

A distinct, narrower discipline from "Evaluative symmetry" above — found on
the user's *second* full manual `quiz_v2` retake (after Stage 10B), once
statement-level loading was already fixed. Even a fully neutral statement
can still feel evaluative purely from being wrapped in a plain "Strongly
disagree ↔ Strongly agree" scale, when the statement uses single-direction
capability language ("I can...") with no named alternative — disagreeing
then implicitly reads as "I can't," a deficiency, even though the statement
itself passed the Evaluative Symmetry audit cleanly.

**The fix is architectural, not another wording pass**: `QuizQuestion`
supports optional `leftAnchorKey`/`rightAnchorKey` (`src/core/quiz/
types.ts`); `LikertScale` renders them in place of the global "Strongly
disagree"/"Strongly agree" anchors when present, falling back to the
global anchors otherwise. Purely presentational — `scoreQuiz` never reads
`promptKey` or any anchor text, only `response.value`/`effects`/
`reverseKeyed`, so this can never touch scoring. **No midpoint (4) label
is used, for any item** — a words-based midpoint (e.g. "Depends on the
situation") risks changing what 4 *means* to the person answering (an
escape hatch vs. a genuine continuum midpoint) even though it changes
nothing mechanically, which is exactly the kind of human-semantic drift
this discipline exists to avoid introducing casually.

**Deliberately selective, not a blanket conversion** — of 50 `likert7`
items audited (`taxonomy_v1.1`/`quiz_v2`), only 8 were found to genuinely
need custom anchors, and of those, only 3 are implemented so far:

- **`q13` (deep_focus), `q57` (opportunity_sensing), `q61`
  (belief_updating)** — implemented, and individually live-reviewed by the
  user directly in the running quiz UI, direction withheld until after
  judgment (same methodology as the Evaluative Symmetry human-review
  micro-pass). **All three approved as-is.**
- **`q21` (persistence)** — a clean candidate with no leakage risk, held
  back deliberately as a documented future candidate rather than bundled
  into the first prototype, per instruction. Revisit if real-user evidence
  later suggests it's worth adding, not before.
- **`q19` (ambiguity_tolerance), `q56` (deep_focus)** — deferred: `q19`'s
  proposed endpoints risked describing *when effort begins* rather than
  pure ambiguity tolerance (drift toward execution_speed/decisiveness/
  planning_orientation); `q56`'s proposed session-length contrast risked
  measuring work-session architecture rather than deep-focus capacity
  itself, and duplicating `q47`'s existing tone. `q13` was judged
  sufficient for deep_focus in this first prototype.
- **`q04` (independent_thinking), `q38` (curiosity)** — rejected, not
  merely deferred: `q04`'s proposed low-pole anchor risked reading as
  conformity to majority opinion rather than legitimate view-updating; the
  natural opposite pole for `q38` (curiosity) would have introduced
  discipline/deep_focus as curiosity's counter-construct — construct
  leakage in both cases, the same failure mode "Evaluative symmetry" above
  already guards against at the wording layer, now confirmed to apply at
  the anchor layer too.
- **The remaining 41 of 50 items keep the standard agreement scale as the
  default and correct choice** — most already self-contain both poles via
  "I'd rather X than Y" / "X matters more than Y" phrasing (adding custom
  anchors would just repeat the prompt), or describe a preference/
  intensity rather than a capability, so disagreeing doesn't read as a
  deficiency in the first place. Selective mixed-format is the design
  goal, not ideological consistency toward one presentation style.

**Mechanical invariance vs. human-semantic invariance — a distinction this
discipline treats as load-bearing, not academic.** Changing an anchor (or
even a prompt stem) cannot alter `scoreQuiz`'s output for a given 1-7
value — confirmed by reading `scoring.ts`, which never touches prompt or
anchor text. But a person may genuinely choose a *different number* under
new wording than they would have under the old wording, even though the
formula treats whatever number they pick identically either way. The
project's simulators model the first kind of invariance perfectly and the
second not at all — exactly why this discipline's primary validation is
live, direction-blind human review, never a passing test suite alone. Full
audit (A/B/C/D counts, all 8 candidate designs, construct-leakage
reasoning) and the live-review record in
`docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 10C-A" / "Stage
10C-B".

## Matching — `matching_v2`

```
level_i    = weighted mean score, each side
scatter_i  = weighted RMS deviation from own level, each side
pattern_i  = each side's deviation ÷ its OWN scatter (floored)   — direction only
raw = 1 − √( PATTERN_WEIGHT·patternTerm + SCATTER_WEIGHT·scatterTerm + LEVEL_WEIGHT·levelTerm )
      PATTERN_WEIGHT=0.5  SCATTER_WEIGHT=0.2  LEVEL_WEIGHT=0.3
```
then coverage-shrunk toward `NEUTRAL_RAW_SIMILARITY = 0.45` in proportion to
how much of the taxonomy was actually scored (full code + derivation in
`src/core/matching/similarity.ts` — the file header is the primary source of
truth; this section is a summary).

**Euclidean, not cosine or Manhattan** (unchanged from v1). Cosine ignores
magnitude and collapses to ~0.9–1.0 since all attributes are non-negative.
Manhattan treats one 60-point gap like six 10-point gaps; squared distance
matches how people read one big difference.

**Missing person attributes** are dropped from every sum, so an unscored trait
neither helps nor penalises directly — but see coverage shrinkage below.

**Never inputs:** nationality, region, gender, era, wealth, fame, occupation,
popularity, locale. Enforced by tests that mutate each and assert the score is
byte-identical.

### v1 → v2: two rounds of simulation-driven debugging

**Round 1 (level domination, fixed in Phase 0).** Plain Euclidean distance let
whichever person had the least extreme overall level dominate: 65% of #1
matches at n=10. Fixed with a level/shape split (`SHAPE_WEIGHT=0.7`).

**Round 2 (flat-profile domination, fixed in Phase 2).** At n=35, the v1
level/shape split still let Zheng He take **27.7%** of #1 matches — stable
across sample sizes, confirmed not noise. Root cause: v1's "shape" term
conflated two different things (Cronbach & Gleser's classic elevation / scatter
/ shape decomposition of profile similarity). If a person's own deviations from
their own level are all near zero — a **flat** profile, elevated everywhere
with little internal peak/valley structure — v1's shapeSq collapses to
approximately the *user's own* variance on those attributes, which has nothing
to do with the person at all. Confirmed: correlation between a person's own
score-scatter and mean raw similarity was **r = −0.624** across all 35 people.
A causal ablation (same person, same 18 attribute values, artificially trimmed
to Zheng He's omission pattern) showed omission pattern alone moved mean
similarity by under 1 point — scatter was the mechanism, not missing-value
count. Fixed by z-normalising each side's deviations by *its own* scatter
before comparing pattern (true Cronbach shape), so a flat profile's normalised
pattern is ~0 and lands at the *neutral* distance from any user (~1, i.e.
"uncorrelated"), not near 0 ("identical"). This alone brought Zheng He to ~21%.

**Round 2b (residual coverage advantage).** A smaller effect remained: thin,
low-evidence profiles (Confucius, Cleopatra, Genghis Khan, Zheng He, Rumi,
Socrates — deliberately scored on 18-22 of 30 attributes because ancient
sourcing doesn't support more, see "Seed dataset" below) narrow the comparison
to a less-idiosyncratic attribute subspace, since the traits confidently
inferable from sparse historical sources (discipline, leadership) correlate
with the traits the quiz produces *less* spiky user scores on, while the traits
hardest to infer for ancient figures (aesthetic sensitivity, cross-domain
range) are exactly the ones the quiz individuates people on most. Fixed with
`applyCoverageShrinkage`: raw similarity shrinks toward a neutral baseline
(0.45, the observed all-pairs median) in proportion to coverage — the same
empirical-Bayes idea already used for archetype centroids, applied at the
whole-profile level. Full derivation and code in `similarity.ts`.

**Combined result at n=35, 10,000 simulated quiz profiles:** max #1 frequency
dropped from 27.7% to **18.9%** (Benjamin Franklin), under the 20%-at-n≥30
threshold set in Phase 0. See "Seed dataset" below for the full table.

### Discriminative weighting — `dispersion_v1`

Unchanged mechanism from Phase 0; table regenerated for n=35 people (was n=10).
Attributes where the dataset varies little (independent thinking, sd 4.2 at
n=10) carry almost no information about *which* person you resemble.

```
discriminative_i = clamp(0.55, 1.6, 0.5 + 0.5 · sd_i / meanSd)
```

**The table is a frozen, committed snapshot** (`dispersion.generated.ts`), not
computed live — adding one person must not silently change every saved user's
match percentage. Regenerate deliberately with `pnpm calibrate`, twice (first
pass writes the table, second reports percentiles computed with it in effect).

### Calibration — `calibration_v3`

Raw similarity is never displayed. Anchors map raw → percentage through a
monotone piecewise-linear curve fitted from simulated percentiles (hard
invariant, tested: calibration must never reorder matches).
`calibrateMatch(1) === 99` — never 100, because these profiles are inferred.

Bumped to v2 alongside the matching formula: the pattern/scatter/level +
coverage-shrinkage decomposition produces a much lower raw scale (median raw
~0.47 vs v1's ~0.76), so v1's anchors would have compressed nearly every result
into the top few percent. Fitted against the **quiz pipeline** (`scoreQuiz`),
not fabricated vectors — fabricated Gaussian vectors are smoother than a real
32-item forced-choice bank produces and mis-set calibration if used directly.

**Bumped to v3 (Phase 6.6 Stage 8, 2026-08)** for the `taxonomy_v1.1`/
`quiz_v2` migration — not a matching-formula change (the fitting
*methodology* and target table are byte-identical to v2), but the drift
was too large to leave unbumped like Phase 4's noise-level refresh: the
old anchors, left unrefit against the new 34-attribute/64-item pipeline,
produced a top-1 median of 74 (target 78) and a Greatness median of 52
(target 58). Refit against 50,000 simulated `quiz_v2` profiles × 34
match-eligible people (stability confirmed at an independent seed
offset — anchors agreed to 3-4 decimal places). See
`docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 8" for the full
before/after anchor tables and the reasoning distinguishing "the raw
distribution genuinely shifted" (real, traced to `quiz_v2`'s item
changes) from "the display curve was stale" (also real, fixed here).

Distribution the anchors below were fitted against (50,000 simulated quiz
profiles × 34 match-eligible people, `taxonomy_v1.1`/`quiz_v2`, 2026-08):

| | min | p10 | p25 | med | p75 | p90 | max |
|---|---|---|---|---|---|---|---|
| Match, all pairs | 5 | 23 | 32 | 44 | 57 | 69 | 94 |
| Match, top 1 | 44 | 62 | 70 | **77** | 84 | 91 | 94 |
| Greatness | 7 | 28 | 46 | **58** | 70 | 80 | 98 |

The all-pairs median deliberately sits below 50. This curve is not tuned to
flatter. The recovery of top-1's and Greatness's medians close to their
pre-migration values (top-1 78→77, Greatness 58→58 exactly) was **not**
targeted directly — it is the honest result of refitting the SAME
unchanged target table against fresh data, per Stage 8's explicit
instruction not to manufacture a restoration.

## Greatness Potential — `greatness_v1`

An **entertainment-oriented profile metric**, displayed as `82 / 100`, never as a
percentage and never called a probability. The dataset contains extraordinary
people *only* — there is no control group, therefore no base rate, therefore no
probability is estimable. Wording must preserve this.

```
raw = 0.50·A + 0.22·D + 0.13·C + 0.15·E
```

- **A — archetype affinity.** Best-fitting achievement patterns, blended 0.75/0.25
  across the top two.
- **D — distinctiveness.** Mean |z| of the five most pronounced traits, capped at
  2.2 so extremity plateaus.
- **C — coherence.** Penalises claiming both sides of a tension pair
  (perfectionism 100 *and* execution speed 100). v1 uses a small reviewed list;
  a correlation matrix estimated from 10–30 people would be noise. Replace with
  the empirical structure at ~150 reviewed profiles.
- **E — engine traits.** The few attributes supportive across essentially every
  pathway. The curve **rolls over above 90**: a profile pinned at 100 is not the
  model's peak.

**Never an average of trait scores.** That would encode "higher is better" for
all 30 attributes, which is false and is the single thing this engine must not
assert. Instead, archetypes use **target bands** — scoring above a band earns
nothing — and several archetypes have deliberately *low* targets
(`independent_creator` wants leadership drive ~35). Tested: an all-100s profile
scores *below* a coherent, pattern-shaped one.

**Archetypes are analytical clusters, not validated psychological types.** Never
present them as a diagnosis. Ten of them, because there is no single ideal
successful-person vector. Prior targets shrink toward observed dataset means:

```
target = (n·observedMean + K·prior) / (n + K)      K = 4
```

With few people the prior dominates; as the dataset grows the data takes over.

**Greatness Potential and Profile Match answer different questions and are never
combined.** A 91% match with a 68 potential is valid; so is 92 potential with a
72% top match. Both are tested.

Percentiles are **not** currently displayed — §96 requires a valid reference
distribution, and simulated profiles are not one. Omit until real user data
exists.

## Localisation

One canonical person → one attribute profile → many localised presentations.
Never a separate factual record per language. Matching joins canonical tables
only.

Template selection happens on **numbers alone**, so the same comparison picks the
same template key in every locale; the locale only decides which string that key
maps to. This is what makes localisation safe — a Korean user and an English user
get identical rankings and identical percentages, by construction.

Bundles are static objects with English fallback. `missingKeys(locale)` reports
gaps. Korean covers the structural layer (attributes, templates, result copy,
bands, archetypes); the 32 quiz item texts are **deliberately untranslated** and
fall back to English pending native review in Phase 8. A test asserts the only
outstanding Korean keys are quiz copy and icon glyphs, so this cannot silently
grow.

### Localisation is semantic adaptation, not word-for-word translation

English is the canonical **semantic** source — it fixes what a concept means,
never what it must sound like. A locale's job is to express that meaning
natively, not to carry over an English metaphor or idiom that doesn't read
naturally in that language.

For future East Asian locales, the intended editorial flow is:

```
canonical semantic definition (English, meaning only)
  → natural Korean localisation (East-Asian editorial reference point)
    → native Japanese / Chinese localisation, informed by both the canonical
      meaning AND the Korean editorial choice, but not a translation of it
```

Korean is the first East Asian locale built, so it doubles as an editorial
reference for how abstract product concepts read naturally in a high-context
East Asian language — a second data point alongside the English definition,
not a second source of truth to translate literally. Japanese and Chinese
must not mechanically translate Korean any more than Korean mechanically
translates English: each locale finds its own native wording for the same
underlying concept.

Worked example — `person.trait_constellation`:
- **Concept** (locale-independent): the 8-12 most distinctive,
  sufficiently-evidenced traits in a profile (see `constellation_v1`).
- **English UI**: "Trait Constellation" — the astronomy metaphor reads
  naturally in English.
- **Korean UI**: "핵심 특성" ("core traits") — the astronomy metaphor did not
  translate naturally, so Korean expresses the underlying concept directly
  instead of carrying the metaphor over.
- **Japanese / Chinese (future)**: translate the *concept* ("core /
  distinctive traits"), starting from the English definition and the Korean
  editorial choice as reference points — not from a literal rendering of
  either "Trait Constellation" or "핵심 특성".

This applies to presentation copy only. Canonical data, trait definitions,
scores, matching, template *selection* (as opposed to template *wording*),
and every other numerical behaviour stay locale-independent per the rest of
this section — a locale is free to reword, but never to mean something
different.

## Safety

- Never fabricate or infer mental illness, medical conditions, sexual
  orientation, criminal behaviour, addiction, private relationships, IQ, or
  personality disorders — living or dead.
- "Biographical accounts frequently describe the management style as highly
  demanding", not "this person is narcissistic".
- Living people: only tendencies published accounts describe directly.
- Every person score carries `confidence` + `evidenceType` + sources.
- `is_match_eligible` is computed, never hand-set. Under-evidenced profiles stay
  browsable but cannot contaminate results.
- Difference ≠ deficiency. The UI must actively reinforce this.
- Never rig results: no boosting famous or trending people, no forcing scores
  above a threshold. A low top match is framed as a *Distinctive Profile*, which
  is more shareable than a fake 94% anyway.

## Calibration workflow

```bash
corepack pnpm@10 exec tsx src/dev/calibrate.ts quiz
```

Writes `dispersion.generated.ts`, then prints proposed anchors. **Run it twice**
after a dataset change: the first pass writes dispersion, the second reports
percentiles computed with that dispersion in effect. Anchors are printed for a
human to paste rather than written automatically — the target display
distribution is a *product* decision informed by data, not derived from it.
Dispersion is pure data, so that one is written directly.

```bash
corepack pnpm@10 exec tsx src/dev/simulate.ts 10000 quiz        # match/greatness distributions, #1 domination check
corepack pnpm@10 exec tsx src/dev/diagnose.ts                   # bank coverage, level analysis
corepack pnpm@10 exec tsx src/dev/trait-diagnostic.ts            # per-attribute signature-trait diagnostic table
```

`simulate.ts` has two modes: `vector` fabricates trait vectors (fast, smooth),
`quiz` runs latent → answers → `scoreQuiz` (faithful). **Calibrate on `quiz`.**
At n≥30 use at least 10,000 simulated profiles — 2,000-3,000 was enough to see
the shape of the distribution at n=10 but too noisy to trust a #1-frequency
figure near the 20% threshold at n=35.

**`src/dev/sensitivity.ts` (Phase 5, robustness/perturbation testing only —
not part of the calibration workflow above):**

```bash
corepack pnpm@10 exec tsx src/dev/sensitivity.ts seeds 10000        # independent-seed stability of the #1 domination figure
corepack pnpm@10 exec tsx src/dev/sensitivity.ts ablate 10000       # in-memory quiz-item removal, never edits bank.ts
corepack pnpm@10 exec tsx src/dev/sensitivity.ts noise 10000        # response-simulation-model perturbation
corepack pnpm@10 exec tsx src/dev/sensitivity.ts dist 10000         # full match/greatness distribution under the worst ablation tested
```

Re-run `seeds` and `ablate` (at minimum) after any future quiz or dataset
change, same "regenerate deliberately" discipline as the calibration
workflow — see "Phase 5" for how this was used to audit the Phase 4 quiz
expansion.

## Inclusion philosophy — `inclusion_v1`

The Great Inside is not a database of historically famous people. It is a
database of people whose distinction was **substantially earned** — through
their own work, creation, discovery, performance, decisions, or leadership —
not primarily conferred by birth.

**The test:** fame, wealth, title, or historical prominence that is primarily
*inherited* rather than *substantially earned* is not sufficient for
inclusion on its own. This is broader than the narrow business sense of
"self-made" — scientists, artists, writers, athletes, inventors, scholars,
explorers, builders, and leaders all qualify even when they were never poor
or economically self-made.

**This is explicitly not a poverty or hardship test.** Inherited wealth,
elite education, social access, and family advantage do not disqualify
anyone. Requiring adversity or "started from nothing" would itself be a
distortion — most extraordinary achievement, in any era, is built on some
form of unearned advantage (education, stability, connections, timing). The
question is narrower and more specific than that:

> **The counterfactual test:** if this person had not inherited their title,
> office, fame, or family position, would the achievement for which The Great
> Inside includes them still be independently notable?
>
> - **Yes** → inherited privilege does not disqualify them. The privilege
>   bought access or opportunity; the achievement is still theirs.
> - **No** → inherited prominence is likely doing the substantive work, and
>   the person is a poor fit, however historically famous they are.

**Worked examples, from the Phase 2 dataset audit:**
- *Ada Lovelace* — Baron's daughter, Countess by marriage; real inherited
  aristocratic access to elite mathematical tutors. Counterfactual: without
  the title, would her *Notes on the Analytical Engine* still be
  independently notable? **Yes** — the mathematics stands on its own, and
  nobody remembers her *as* a countess. Kept.
- *Cleopatra VII* — hereditary Ptolemaic throne, held by her father's will,
  not by anything she did. Counterfactual: without the throne, would her
  diplomatic and administrative acts still be independently notable? **No**
  — every one of them was an exercise of the throne itself; there is no
  achievement left once the inherited platform is subtracted. Removed (see
  "Seed dataset" below).
- *Ibn Khaldun* — her replacement. Family had a minor administrative/scholarly
  background (Andalusian émigrés), not a throne or wealth. Counterfactual:
  without that background, would the *Muqaddimah*'s historiographic and
  economic theory still be independently notable? **Yes** — it's studied
  today on its own intellectual merit, in a field he is credited with
  substantially founding. Added.

**How to apply it going forward, as the dataset grows toward 100-1,000:**
- A privileged background that merely *enabled* access does not disqualify a
  profile if the recognized achievement is separable from the inherited
  position.
- A profile whose entire historical role *is* the exercise of inherited
  power — a monarch remembered for being monarch — fails the test even if
  they governed skillfully. Skillful use of an inherited position is not the
  same as building one.
- Do not use adversity, poverty, or "from nothing" as a scoring or inclusion
  requirement, in either direction. It is not evidence for inclusion (most
  qualifying people had real advantages) and its absence is not evidence
  against it.
- This is decided once per person at dataset-authoring time. It is never a
  per-trait or per-score judgment, and never inferred automatically from
  occupation, era, wealth, or title metadata.

**Hard boundary, same as every other metadata rule in this project:**
inclusion status must never influence scoring or matching. There is no
corresponding attribute, weight, or field read by anything in
`src/core/matching`. It answers one question — does this person belong in the
dataset at all — decided before any trait score is authored, exactly like
`is_match_eligible` is computed before matching runs, never the reverse.
Nationality, gender, era, socioeconomic origin, and fame are metadata for
filtering only, same as always; this policy governs the roster's membership,
not the matching engine's inputs.

## Seed dataset

**35 match-eligible profiles** (roster 1: the original 10, `seed.ts`; roster 2:
+25 added in Phase 2 specifically to stress-test the matching system,
`roster2.ts`). Roster 2 was chosen against the "extraordinary achiever"
stereotype roster 1 leaned toward: low risk tolerance as an *advantage*
(Buffett), high collaboration / low autonomy (Mandela, Goodall), explicit
low-leadership specialists (Ramanujan, Rosalind Franklin, Rumi), a
conflict-seeker (Genghis Khan) alongside harmony-seekers (Confucius), extreme
specialists vs. generalists, and regions/eras roster 1 was thin on
(sub-Saharan Africa, South Asia, Central Asia, North Africa, West Asia,
Central Europe; ancient ×2, medieval ×4).

**Ancient/medieval evidence discipline:** Confucius, Socrates, Genghis Khan,
Zheng He, Rumi and Ibn Khaldun are scored on 18-22 of 30 attributes —
deliberately fewer, not diluted across all 30 at low confidence. Confidence
tops out around 0.7 for these figures (`strong_inference`, not `documented`).
This is what makes them match-eligible without pretending centuries-old
sources support the same resolution as a biography with primary sources.

**Cleopatra VII → Ibn Khaldun (2026-08).** Cleopatra VII was removed: her
primary historical prominence is inseparable from an inherited Ptolemaic
throne, failing the `inclusion_v1` counterfactual test (see "Inclusion
philosophy" above). Ibn Khaldun (1332-1406) replaces her — passes the
counterfactual test cleanly, restores the dataset's only North Africa
representation, and adds a fourth medieval profile with a scholar-generalist
trait shape (high `cross_domain_range` + `systems_abstraction` alongside real,
repeatedly-exercised political/judicial leadership) distinct from the
pure-specialist and pure-conqueror shapes already in the set. Eligibility was
computed from the authored evidence, not adjusted to force a pass: 20 scored
attributes, average confidence 0.5925, coverage 0.68 — clears the
18-attribute / 0.55-confidence / 0.6-coverage floors with real margin.

### Match-frequency simulation at n=35 (refreshed 2026-08, Phase 4 completion)

10,000 simulated quiz profiles against the final 56-item `quiz_v1` bank,
`matching_v2` and `dispersion_v1` unchanged (person dataset didn't move this
phase — only the quiz did):

```
#1 frequency:  Warren Buffett 18.7%, Rosalind Franklin 13.3%, Benjamin Franklin 12.9%,
               Alan Turing 5.1%, Oprah Winfrey 4.0%, Richard Feynman 3.9%,
               ..., Ibn Khaldun 2.5%, ...
               (max 18.7%, under the 20%-at-n≥30 threshold; every eligible person still
               reachable except p_rumi and p_toni_morrison at this sample size — 0.0%,
               not 0 structurally, unchanged from before Phase 4)
```

**Threshold met, but the identity and margin of the #1 dominator moved
substantially purely from the quiz change** — worth flagging explicitly,
since the person dataset was untouched. Mid-phase (54-item bank, before the
round-3 fix), Buffett briefly exceeded the threshold at 20.2%, and with only
the round-1 bank (52 items) it was 24.6% — both confirmed reproducibly
against the *same* 35 people, so the swing is attributable to the quiz
instrument, not sampling noise (see "Phase 4" above for the causal
mechanism). `matching_v2` itself was left unmodified throughout, per the same
"treat it as a metric question first" policy below — but this result shows
that policy cuts both ways: this time the metric question resolved back to a
quiz-instrument cause, not a matching-formula one, and fixing the instrument
further (not touching `matching_v2`) was what actually brought the figure
back under threshold. Re-run `pnpm exec tsx src/dev/simulate.ts 10000 quiz`
after every future dataset *or quiz* change, in the same single deliberate
pass as dispersion/calibration, never incrementally. If any person exceeds
20% at n≥30 again, treat it as a metric question first — checking whether a
specific person's high-scoring attributes overlap with attributes still
carrying a large `oneSidedShare`/`meanDiff` in `trait-diagnostic.ts` is now
the first thing to check, before assuming a `matching_v2` defect.

The full round-trip that established the 18-20% ceiling in the first place —
65% (n=10, pre-fix) → 43.6% (n=10, post level/shape fix) → 27.7% (n=35, same
formula, confirming the residual was a formula defect, not a small-n
artifact) → 18.9% (n=35, post pattern/scatter/level + coverage-shrinkage fix)
→ 18.4% (n=35, post Ibn Khaldun swap) → 24.6%/20.2%/18.7% (n=35, Phase 4's
three quiz-expansion rounds, same `matching_v2` throughout) — remains the
headline result of Phase 2, now extended by Phase 4.

## Known open issues

0. ~~Cleopatra VII replacement~~ **Resolved (2026-08).** Replaced with Ibn
   Khaldun; full rationale in "Inclusion philosophy" and "Seed dataset" above.
   Dispersion, calibration, and the domination check were all regenerated in
   one pass; the 20%-at-n≥30 invariant held (18.4%, down from 18.9%) without
   any change to `matching_v2`.
1. ~~#1-match domination~~ **Resolved for now** — see above. Re-check as the
   dataset grows toward 100+; a metric that holds at n=35 is not guaranteed to
   hold at n=250.
2. **Signature-trait concentration, two layers found:**
   - **2a — item bimodality (fixed).** `intuitive_synthesis` was 26.2% of
     signature-trait assignments (uniform: 3.3%) not because more quiz items
     measured it (correlation with item count was ~0) but because its few
     items were exclusive/binary forced choices producing bimodal rather than
     graded scores (simulated sd 33.9 vs. the reference model's assumed sd
     17.0 — correlation between that ratio and signature frequency was
     r=0.672). Fixed in `quiz_v0_seed2`: made `q02` bidirectional and added
     one dedicated graded item each for `intuitive_synthesis` (q31) and
     `autonomy_need` (q32, second-worst at 8.8%). Result: 26.2%→3.5% and
     8.8%→4.6%. Full diagnostic table via `src/dev/trait-diagnostic.ts`.
   - **2b — reference-mean miscalibration.** **Substantially fixed in Phase
     4** (2026-08), causally, not by recalibrating the reference: confirmed
     the mechanism was one-sided choice-item scoring
     (`correlation(oneSidedShare, meanDiff) = 0.851` at baseline), fixed it
     with 24 additive bidirectional items across three rounds, and reran the
     domination/signature-trait checks each round. `planning_orientation`
     meanDiff 30.3→19.8, `analytical_rigor` 27.0→20.0, `collaboration`
     32.5→24.3, `mastery_orientation` 28.1→9.4, `cross_domain_range`
     28.9→13.9, `execution_speed` 25.3→20.4. **Not fully closed**: residual
     `correlation(oneSidedShare, meanDiff)` is still 0.709 — real progress,
     not elimination — and `collaboration` in particular is still 82%
     one-sided with a +24.3 meanDiff, the largest remaining gap. `reference_v2`
     was created (see "Phase 4" above) but deliberately keeps every number
     from `reference_v1` unchanged, since no attribute yet clears the evidence
     bar (low enough `oneSidedShare` to trust its simulated mean) for a real
     reference-value change. Monitor via `trait-diagnostic.ts`; a future
     round would target `collaboration` first by the same criterion used for
     rounds 1-3.
3. Several seed profiles rarely or never win #1 at n=35 (`p_steve_jobs`,
   `p_toni_morrison`, `p_rumi`, `p_mahatma_gandhi` all ≤0.1%) — extreme or
   thin-coverage profiles. Not evidence of a defect on its own; monitor as the
   dataset grows and re-run the domination check rather than hand-tuning any
   one profile.
4. ~~Development guides cover 10 of 30 attributes~~ **Resolved (Phase 7,
   2026-08).** All 34 attributes now have authored development guides;
   `missingDevelopmentGuides()` returns `[]`, asserted as a regression
   guard.
5. ~~Body copy for development guides and person cautions exists as keys
   only~~ **Resolved (Phase 7, 2026-08).** ~270 development-guide strings
   plus editorial `doNotCopyKeys` content for all 7 people that had a
   curated key were authored. English-first by deliberate scope decision
   (Phase 8 completes Korean coverage) — see "Phase 7" above.
6. **People explorer pages have no SEO metadata beyond title/description** —
   canonical URLs, hreflang, sitemap.xml, structured data, and OpenGraph
   images are all Phase 10 scope, not yet built.
7. **Directory filter UI exposes single-select controls** for Era/Region even
   though `PeopleFilter` supports full multi-value faceting — a presentation
   gap, not a `src/core/people/explorer.ts` limitation. Tag/occupation/trait
   filter controls (the "Highly Curious", "Perfectionists" style presets from
   the product spec) are UI compositions of the existing filter fields, not
   yet built.
8. ~~Match domination is sensitive to the quiz instrument~~ **Audited in
   Phase 5 (2026-08), found not to indicate a `matching_v2` defect.** Warren
   Buffett's #1 frequency moved from 13.2% (pre-Phase-4 32-item quiz) through
   24.6% and 20.2% (mid-Phase-4, 52- and 54-item banks) down to 18.7% (final
   56-item bank) — a real, quiz-instrument-driven swing on an unchanged
   35-person dataset. Phase 5 checked exactly the two things this issue
   flagged: whether 18.7% is a stable figure (yes — 18.3%±0.3% across 5
   independent 10,000-profile samples) and whether `LEVEL_WEIGHT` deserved
   re-examination (no — a dedicated pattern-vs-level regression test
   confirms `PATTERN_WEIGHT` still dominates as designed, and the ablation
   sweep showed the 13.2→24.6→20.2→18.7% swing is fully explained by the
   quiz-item changes already documented in Phase 4, with no additional
   unexplained component). `collaboration` remains 82% one-sided (unchanged,
   see #2b) but was causally shown to contribute at most +0.3pp to Buffett's
   figure even in the worst case tested (ablating its only bidirectional
   item) — not the mechanism driving the swing. Full evidence in "Phase 5"
   above. Re-run `sensitivity.ts ablate`/`seeds` after any future quiz or
   dataset change, same discipline as `simulate.ts`.
9. **`taxonomy_v1.1`'s four new attributes carry the highest simSd/refSd
   variance ratios in the 34-attribute bank (1.41-1.53 vs. a bank median
   near 1.1), found during Phase 6.6 Stage 6's `reference_v3` review.**
   Mechanically distinct from `oneSidedShare`/`meanDiff` (the mean-side
   test #2b already tracks) — `belief_updating` is 0% one-sided yet still
   has the single highest ratio in the bank, proof the two are independent
   phenomena. Deliberately NOT fixed by inflating `sd` (would launder
   residual quiz-item variance into the reference table, the exact trap
   `reference_v2` was created to avoid on the mean side) and NOT grounds to
   reopen Stage 4 now (Stage 4.5's own acceptance criterion — all four rank
   below `collaboration`/`systems_abstraction`/`planning_orientation` in
   signature-trait frequency — still holds unchanged). A future quiz round
   revisiting the new attributes' item mix (likely candidate: more graded
   likert items, less choice-format, the same fix pattern that worked at
   Stage 4.5) is the right venue, not this stage. Full diagnostic table in
   `docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 6".
10. **Non-blocking cleanup recorded at Phase 7 closure (2026-08):**
    - Neutral, third-person deterministic tradeoff coverage
      (`dontcopy.tradeoff.*`, `TRADEOFF_ATTRIBUTE_IDS`) is authored for 26
      of 34 attributes; `missingTradeoffCoverage()` tracks the remaining 8
      (`belief_updating`, `perfectionism`, `adaptability`,
      `risk_tolerance`, `collaboration`, `conflict_tolerance`,
      `competitiveness`, `proactive_agency`). `conflict_tolerance`
      specifically is why Genghis Khan's Conflict Tolerance caution
      renders the generic `dontcopy.generic.dual_edged` sentence rather
      than trait-specific content — correct current behavior, not a bug.
    - No real-user monitoring yet of whether the compare page's
      suggestions (`selectLearnFromSuggestions`/`selectWorthExploring`/
      `selectDoNotCopy`) are actually useful — Phase 7's validation is
      simulation plus two humans' live review, not production usage data.
    - Keyboard traversal of the compare page was reasoned sound
      (existing accessible primitives) but never manually tabbed through
      step-by-step by a human — worth a real-browser check during final
      production QA.
11. **Non-blocking items recorded at Phase 8 closure (2026-08):** see
    "Phase 8" above for full detail. Summary: `TargetSwitcher`'s live
    search still matches only `canonicalName`/`aliases`/tags, not a
    person's localized Korean display name unless it's also in `aliases`;
    `generateMetadata`'s `<title>` only localizes the person-name portion
    ("You ×"/"The Great Inside" stay English on `/ko-KR`); `label.dont_copy`
    /`label.you_both` (results page) are now stylistically divergent from
    their compare-page counterparts after the brand-tone heading pass, not
    re-converged since only 5 named headings were in that pass's scope;
    Bruce Lee ("브루스 리" vs. "이소룡") and Rumi ("루미," short form,
    vs. an unverifiable full transliteration) carry flagged, unresolved
    person-name ambiguities.
12. **Phase 10 wide-desktop layout debt (flagged 2026-08) — Landing
    resolved in Phase 10D Stage 1, Person resolved in Phase 10D-2, Live
    Results resolved in Phase 10D-3 (all 2026-08, see those sections
    above); Compare and Saved Result NOT yet redesigned.** At desktop
    widths ≥1280px, those two remaining surfaces still overuse a narrow
    centered single-column layout (`tgi-measure-stack`/`tgi-container`),
    leaving dead horizontal space. The reusable primitives this needs
    (`Rail`/`IdentityHero`, `src/ui/components/layout.tsx`) already exist
    and are already wired into Compare presentationally (no visual change
    yet) — a future Phase 10D stage applies the actual wide-desktop
    composition using them, it does not rebuild them. Keep
    readable text measures (`Text`'s existing 68ch cap) and the current
    restrained visual character — not a general redesign, a wide-viewport
    composition fix, same instruction as before.
13. ~~Results-page sign-in conversion CTA~~ **Implemented (Phase 10C,
    2026-08) — see that section below.** The CTA now only ever claims
    "saved" after directly observing its own save succeed for the exact
    token on screen (never inferred from mere absence), and — because the
    original concern was specifically that "return to it later" would be a
    false promise without a working retrieval path — Phase 10C also built
    that retrieval path (`/account`, `/account/results/[id]`) in the same
    stage rather than shipping the CTA alone. Not yet human-approved; the
    code has not been deployed to production yet.

## Phase 10C — historical result fidelity (FORMALLY CLOSED, human-approved, 2026-08)

Triggered by a narrow but real problem the Stage 10B checkpoint itself
flagged: shipping the results sign-in CTA's "sign in to save this result
and return to it later" promise required that promise to actually be
true, forever — not just at the moment of signing in. A design audit
(prompted by the user, not self-initiated) found `/results` recomputes
live against the current quiz bank, taxonomy, **reference table**,
**dispersion table**, matching formula, calibration anchors, greatness
formula, **archetype target-shrinkage**, **interpretation/selection
rules**, and the **live person roster** — ten real dependencies, of which
Stage 9C's original `VersionSnapshot` only tracked six (quiz/scoring/
taxonomy/greatness_scoring/matching/calibration). The other four had
their own code-level version constants that were simply never threaded
into provenance; the roster had no version representation of any kind,
anywhere. This meant a naive "reopen my saved result" feature would, the
moment any of those four constants bumped or the roster was edited (both
routine, expected events per this project's own history — e.g. the Phase
6.6 Buffett `opportunity_sensing` correction shipped with no version
bump at all, since ordinary editorial review was never meant to trigger
one), silently show a signed-in user a **different** number under the
label "your result," with nothing detecting or disclosing the drift.

**Two architectures were evaluated and one was chosen, deliberately, not
by default.** Strategy B — retaining full historical archives of every
past roster/reference/dispersion/calibration/matching-code combination so
any old result could be exactly recomputed — was rejected: it would
require versioning far more granularly than this project's own
demonstrated editorial workflow tolerates (routine small corrections are
a *feature* of the review process, not an edge case), and would mean
retaining old *code*, not just old data, for any formula that is ever
rewritten (this project's own history includes a real `matching_v1`→`v2`
rewrite). **Strategy A — an immutable final-result snapshot, computed
once and never recomputed — was adopted instead.** It only needs one
result to survive intact, not the whole engine to stay replayable
forever.

**Provenance completed.** `VersionSnapshot` (`src/core/versions.ts`) grew
from six fields to ten: `referenceVersion`, `dispersionVersion`,
`archetypesVersion`, and `interpretationVersion` added, each a plain
re-export of an already-existing, already-versioned constant — no new
numbers, only new bookkeeping. The eleventh dependency — the person
roster — deliberately did **not** get a hand-maintained version string
(the exact failure mode that already lets roster edits ship silently);
instead `src/core/people/dataVersion.ts`'s `personDataFingerprint(people)`
computes a canonical fingerprint (explicit plain-object serialization,
fixed key order by construction, every array sorted at every level —
hardened during review from an earlier hand-rolled delimited-string form
specifically to remove any theoretical serialization-collision risk) over
exactly the fields that can change a computed result: person id, match
eligibility, archetype assignments (feeds Greatness's target-shrinkage),
and each attribute's score/confidence/impact. Deliberately excluded:
every purely presentational field (name, portrait, era, tags, sources,
`doNotCopyKeys`, ...) — already forbidden from influencing similarity by
this project's oldest rule, and confirmed excluded here too by a
dedicated regression test. This fingerprint is a **live equality check
against right now**, not a "known shipped combination" checked against an
allowlist the way the other ten fields are — a deliberate, load-bearing
distinction, not an oversight (see that module's own doc comment).

**Claim-time drift guard.** `saveCompletedResult.ts` now takes the
current roster as a parameter (always `SEED_PEOPLE`, resolved
server-side inside `saveCompletedResultServer.ts` — never taken from the
client-supplied input; the client can only supply its own *claimed*
completion-time provenance, which is compared *against*, never trusted
*as*, current state) and, after every existing validation check,
compares the submission's provenance and person-data fingerprint against
`CURRENT_VERSIONS`/`personDataFingerprint(people)` computed fresh, right
now. Any mismatch — for any of the eleven tracked values — returns
`provenance_drift` and the function returns immediately: no snapshot is
computed, nothing is written. Only once current state is *proven*
identical to completion-time state does it proceed to compute the
snapshot — which is what makes "freshly computed now" and "faithful to
what the user originally saw" the same claim, not an assumption.

**Snapshot.** `src/core/results/snapshot.ts` defines `ResultSnapshotV1` —
plain numbers and stable person ids only, never biography — carrying an
internal `snapshotSchemaVersion: "result_snapshot_v1"` tag and a strict,
hand-rolled runtime validator (`parseResultSnapshot`, never trusts
arbitrary JSONB, returns `undefined` rather than throwing or
partially-rendering on any structural mismatch — the same "never assume,
always validate" convention `decodeResultToken` already established).
Deliberately does not validate attribute/person ids against the
*current* taxonomy/roster, since an old snapshot may legitimately
reference an id a later revision removed — shape validation only, never
content-currency validation. `buildResultSnapshot.ts` computes it once,
reusing (never duplicating) the exact orchestration `/results` itself
uses — see the next paragraph for why that reuse is structural, not
conventional.

**Parity hardened structurally, not just by convention.** A dedicated
review found `/results/page.tsx` and `buildResultSnapshot.ts` had
independently written out the same function-call sequence
(`buildResultSet` → `computeGreatnessPotential` → `signatureTrait` →
`distinctiveTraits` → `selectResultArchetype` → `advantageTraits`) twice
— guaranteed to agree today by `src/core`'s purity rule, but fragile
against a future edit to one site without the other. Extracted into
`src/core/results/resultView.ts`'s `computeResultView(user, people)`,
now the ONE orchestration both `/results/page.tsx` and
`buildResultSnapshot.ts` call — confirmed behavior-preserving for
`/results` by direct diff inspection (identical arguments, only the call
site moved) and locked by a dedicated parity regression test
(`resultView.test.ts`) that independently re-derives the expected output
by hand and asserts agreement.

**Legacy/drift preservation — the load-bearing correctness property of
this whole stage, reached only after two rounds of user correction.** An
early draft of the pending-result-migration path *cleared* (deleted) both
(a) pre-Phase-10C queue entries that predate the new provenance fields
entirely, and (b) current-format entries the server genuinely rejected as
drifted — on the reasoning that neither could ever succeed on retry. Both
were flagged as violations of the actual contract: "will never succeed"
is not the same claim as "safe to destroy the only record of a real
anonymous completion." Corrected to a **quarantine, never delete**
architecture (`src/lib/results/pendingOwnResults.ts`): a separate,
permanent localStorage store
(`tgi_incompatible_pending_results_v1`), entries moved into it — never
copied, never deleted-without-relocating — with a write-then-verify
ordering (write to quarantine, read back to confirm, only then remove
from the active queue) specifically so a storage-quota failure mid-move
can never lose the token, tagged with an explicit `reason` discriminator
(`"legacy_format"` | `"provenance_drift"`, distinguishing "never even
checked" from "checked and rejected") so both cases coexist safely in one
store. `dismissIncompatiblePendingResult` is the one explicit,
user-initiated removal path — not called from anywhere yet; this stage
builds the preservation mechanism only, not a recovery UI. Regular
(non-drift) permanent-failure reasons — undecodable tokens, unknown
version combinations, internally inconsistent input — are unaffected and
still cleared, correctly: those represent malformed input with no real
historical result to preserve, a genuinely different case from either
quarantine reason.

**`/account` and `/account/results/[id]`.** New, deliberately restrained
routes (not a dashboard): a plain list of completion dates
(`/account`), and a single-result reopen view
(`/account/results/[id]`) that renders **exclusively** from the parsed
`result_snapshot` — confirmed by code inspection and by the fact that
neither route imports anything from `src/core/quiz`, `src/core/matching`,
`src/core/greatness`, or `src/core/interpretation`'s selection functions,
only trivial, timeless presentational id→label lookups. Ownership is
enforced entirely by the pre-existing `user_profiles_own` RLS policy — no
application-level `user_id` filter was added on top of it, matching this
project's "RLS is authoritative, not merely defense-in-depth" stance
elsewhere. The actual Supabase-facing queries were extracted into small,
dependency-injected `src/lib/results/fetchSavedResult(s).ts` functions
specifically so "a non-owned row is indistinguishable from a
nonexistent one" and "ownership has no bypass path" are properties with
real unit tests, not just code review. A legacy row with
`result_snapshot IS NULL` renders an honest "not available for this
early result" state — never a live-recompute fallback, which would defeat
the entire point of this design.

**Signed-out `/results` CTA (`SignInCta.tsx`).** Renders after the top
hero/closest-match summary and before the deeper match sections. Never
gates any result. Only ever claims "saved" after directly observing,
itself, the pending-queue entry for the token on screen transition from
present to absent as a result of a save call it made — never inferred
from mere absence (which would false-positive for a signed-in user simply
viewing someone else's shared link). Reuses the existing OAuth
redirect-path mechanism unchanged (`buildOAuthReturnPath`, extracted from
`AuthControls.tsx` into `src/lib/supabase/oauthNext.ts` and shared by
both components, with its own regression test) — locale and the current
`?r=` token are preserved through the sign-in round-trip by construction,
not by a new mechanism.

**Server authority, verified by tracing the call chain, not assumed.**
`CURRENT_VERSIONS` and `personDataFingerprint(SEED_PEOPLE)` are resolved
exclusively server-side (`saveCompletedResultServer.ts`'s static
imports) and never appear as fields on `SaveCompletedResultInput` at
all — there is no way for a client to supply a fake "current" state; the
type system itself forecloses it. The client-supplied `provenance`/
`personDataVersion` are, correctly, the browser's own *claim* about its
completion-time state — compared against server truth, never trusted as
server truth. This is an inherent, pre-existing property of the
anonymous-first architecture (the server never recorded what an
anonymous session actually saw, by design), not a new gap introduced
here, and was reasoned through explicitly rather than left implicit.

**Migration 0004 — applied live and verified in the production Supabase
project (2026-08), not merely written.** Adds `reference_version`,
`dispersion_version`, `archetypes_version`, `interpretation_version`,
`person_data_version`, and `result_snapshot jsonb` to `user_profiles`,
all nullable and additive. Two CHECK constraints, both hardened during
pre-migration review after a real defect was caught before it shipped: the
original `result_snapshot ->> 'key' = 'x'` form is unsafe because `->>`
on a non-object JSONB value or on an object missing the key returns SQL
`NULL`, and a CHECK constraint treats `NULL` as *pass* — a malformed
snapshot could have silently passed. Fixed with `jsonb_typeof(...) =
'object'` plus the `?` key-existence operator (a real boolean, never
`NULL`) before ever comparing the value
(`result_snapshot_schema_check`), plus a second constraint
(`result_snapshot_provenance_check`) requiring all five new provenance
columns whenever `result_snapshot` is non-null, enforcing at the database
layer the real invariant the application code already guarantees.
Confirmed live: all 6 new columns and both constraints exist; the 2
pre-existing rows survived unchanged; `total_rows = 2`.

**Legacy-row backfill — exactly one row, after a rigorous, row-specific
evidence chain, not a blanket pass.** Both pre-existing rows had
`result_snapshot IS NULL` (correctly — the column didn't exist when they
were written) and identical six originally-recorded version columns
(`quiz_v2`/`scoring_v1`/`taxonomy_v1.1`/`greatness_v1`/`matching_v2`/
`calibration_v3`), but were judged on **independently different**
evidence, per row, exactly as the historical-fidelity design demands
matching six version strings is explicitly NOT sufficient proof on its
own:
- **Row `800d073e-c4ee-4b36-a811-eb406ca0f123`** (`completed_at`
  2026-08-12T20:09:43.634Z) — the Stage 10B Vercel production human E2E
  row, deployed from commit `e3048a8` (the repository's only commit to
  date). A direct `git diff e3048a8` against the working tree confirmed
  **zero changes** to every output-affecting dependency (quiz bank,
  scoring, taxonomy, reference, dispersion, matching, calibration,
  greatness, archetypes, interpretation, and the entire person roster) —
  the only diffs found were the `VersionSnapshot` extension itself
  (provenance-only, re-exporting already-unchanged constants) and the
  `computeResultView` extraction (structural, confirmed by direct diff
  inspection to be identical function calls, not a numeric change).
  `profileId`'s non-influence on scoring output was independently proven
  (source inspection plus a direct empirical test) before being used in
  the recomputation. The recomputed candidate snapshot was then compared
  against the human-observed original result and matched **exactly**:
  Greatness 61/100 (`strong_pattern` band), closest match Benjamin
  Franklin, displayed match 70%. **Backfilled** (2026-08) via a dedicated
  one-time script — never `saveCompletedResult`'s normal path — guarded
  by `id` (primary key) + `result_snapshot IS NULL`, writing only the
  five provenance columns + `result_snapshot`, never touching `user_id`/
  `result_token`/`completed_at`/`created_at`. Confirmed live: exactly one
  row affected, original `completed_at`/`created_at` preserved.
- **Row `820c8499-e401-4bd0-8ec0-a0b088e5e86d`** (`completed_at`
  2026-08-10T18:21:30.078Z) — the Stage 9D **local** E2E row, completed
  before this repository was git-initialized at all (git init happened
  during Stage 10B). No commit, deployment record, or any other durable
  snapshot ties this specific moment to a provable code/data state — the
  later cleanliness of `e3048a8` proves nothing about what uncommitted
  local code was actually running before git existed. Matching six
  version *strings* was explicitly judged insufficient on its own, per
  design. **Left `result_snapshot = NULL` permanently** — the existing
  honest "not available for this early result" state in
  `/account/results/[id]` is the correct, intended behavior for this row,
  not a gap to close later. Historical correctness was treated as more
  important than filling every row.

**A real production bug was found and fixed during the human E2E itself,
not before it — the auth-vs-lookup-state conflation.** Signing out while
already on `/account/results/[id]` showed the generic "결과를 찾을 수
없어요" (result not found) state — secure (RLS still correctly returned
zero rows for the now-unauthenticated request) but semantically false: it
told the user their own real result "doesn't exist or belongs to someone
else." Root cause: the page collapsed `!user` into the same branch as
"authenticated but RLS returned no row." Fixed with a pure decision
function, `resolveSavedResultPageState(signedIn, outcome)`
(`src/lib/results/savedResultPageState.ts`) — `signedIn` is checked
FIRST and unconditionally wins, before the not-found/unavailable/ok
branches are ever reached, and `fetchSavedResult` is never even called
when signed out. A new distinct state ("로그인이 필요해요" / "Sign in
required") renders instead, with an inline Google sign-in CTA
(`GoogleSignInCta.tsx`, a shared client island — not duplicated — also
added as a small UX polish to `/account`'s pre-existing, already-correct
signed-out state) that reuses the exact same `buildOAuthReturnPath`/
`OAUTH_NEXT_COOKIE` mechanism every other sign-in entry point in this
project uses, no second redirect path. The privacy-critical branch was
left completely untouched: a nonexistent id and another user's id still
collapse into the identical generic not-found state, exactly as
designed — only the auth-state branch was wrong, never the ownership
one. Deployed from commit `d425e24730fa524429033978298431dd84be1f9e`.

**Verification, final.** `tsc --noEmit` clean, `vitest run` **420/420**
(319 Phase-10A baseline → 410 for the historical-fidelity build → 420
after the auth-state fix's 10 new tests), `pnpm build --webpack` clean,
**84 routes** (`/account`, `/account/results/[id]` both correctly `ƒ`
dynamic; every pre-existing route's static/dynamic split unchanged
throughout the entire stage).

**Human production E2E — CONFIRMED PASSED (2026-08), by the user directly
on the live deployment** (an agent cannot perform this — same discipline
as every other stage closure in this project):
1. Authenticated `/account` works and lists saved results.
2. The one historically-provable backfilled row (Stage 10B's production
   result) reopens correctly from its immutable snapshot: Greatness
   61/100, Benjamin Franklin, 70% match — matching the human-observed
   original exactly, in production, not just in the earlier offline
   parity check.
3. The pre-Git legacy row (`result_snapshot IS NULL`) is handled
   honestly as an early result that cannot be reopened — no fabrication,
   no silent recompute.
4. A brand-new anonymous production quiz completion showed the
   signed-out save CTA.
5. Google sign-in from that CTA successfully saved the new result to the
   existing account.
6. The new `user_profiles` row was created with `result_snapshot`
   non-null, `snapshotSchemaVersion = result_snapshot_v1`, complete
   10-field provenance, `person_data_version` populated, and
   `completed_at` preserving the actual quiz-completion time — the
   first real, non-backfilled automatic snapshot this design has ever
   produced in production.
7. The newly saved result appears in `/account` history and reopens
   correctly from its own frozen snapshot.
8. Multiple quiz completions under the SAME Google account correctly
   created separate history rows, because their `result_token`s differ.
9. Re-login with the same account did NOT create a duplicate row — the
   existing `(user_id, result_token)` dedup index held under real
   production reuse.
10. The auth-state bug above is confirmed fixed live: sign-out while
    viewing a saved result now shows the correct auth-required state
    with a working inline CTA, never the misleading not-found state.
11. `/account` while signed out shows its own proper auth-required state
    plus the new inline CTA.
12. RLS/privacy behavior remained intact throughout; no privileged
    browser access was ever introduced.

**Phase 10C is FORMALLY CLOSED, human-approved (2026-08)** — same closure
discipline as every other phase/stage in this project: the user's own
live, first-hand confirmation on the real production deployment, not an
agent's inference from tests or code review alone.

## Phase 10D-1 — visual regression harness + editorial primitives +
## landing (FORMALLY CLOSED, human-approved, 2026-08)

Responds to "Known open issues" item 12 below: at wide desktop (≥1280px)
the site overused a narrow centered single-column layout, leaving large
amounts of dead horizontal space. An audit-first pass (no implementation)
inspected every major surface and proposed a small reusable
editorial-layout system rather than page-specific patches; that audit
proposed activating the wide-desktop rail at **≥1024px**. Full stage
record, including the audit itself, is in
`docs/phase10-provisional-checkpoint.md`'s "Stage 10D-1 record" — this
section is the durable summary.

**Breakpoint decision, corrected record.** The ≥1024px figure the audit
originally proposed was reviewed and **deliberately changed to ≥1280px**
before any implementation began, on the explicit instruction that 1024px
had not been demonstrated safe for a true asymmetric composition
(particularly untested in Korean), and that the production complaint
this stage responds to was observed at ≥1280px specifically. **The
shipped implementation uses ≥1280px only, with no per-page breakpoint
ladder.** This correction matters for the record: an earlier draft of
this checkpoint could be misread as implying 1280px was the audit's own
recommendation — it was not; 1280px is a deliberate review decision made
in response to that audit, not a restatement of it.

**Testing policy, adopted this stage and binding going forward:**
exhaust all automatable verification — typecheck, unit/integration
tests, production build, headless-browser E2E, responsive viewport
checks, screenshots, console/network error inspection, route/link
checks, EN/KO checks, keyboard/tab-order checks, overflow/wrapping
checks — before ever asking for human validation. Human testing is
requested only for what is genuinely unavailable to an agent (real OAuth
consent, external authenticated dashboard actions, hardware interaction,
subjective final visual/taste approval), and any such request must state
why it can't be automated, what was already tested automatically, the
minimum human action needed, and what evidence to return. Every Phase
9/10 stage's "human E2E" already followed this discipline for
auth-dependent flows this project cannot complete itself (Google
consent, live Supabase writes); this stage makes it an explicit,
general-purpose policy rather than something re-derived per stage.

**1. Playwright visual-smoke harness — new.** No browser-automation
framework existed in the repo before this stage. Added
`@playwright/test`, **Chromium only** (a visual-smoke tool, not a
cross-browser suite). `playwright.config.ts` runs the project's real
`next dev --webpack` (Turbopack cannot resolve this project's `.js`
specifiers pointing at `.ts` files — see "Stack" below — so the harness
must match `pnpm dev`/`pnpm build`'s own `--webpack` flag) on a
dedicated port. `e2e/utils/visualChecks.ts` holds reusable,
page-agnostic assertions (horizontal-overflow, clipped-element,
console/page-error capture, bounded prose measure, DOM-order-vs-tab-order
comparison) meant for reuse by future Phase 10D stages, not just this
one. `e2e/landing.visual.spec.ts` — this stage's actual coverage — tests
both launch locales × six viewports (390/768/1024/1280/1600/1920px):
**14/14 passing**. Screenshots write to `test-artifacts/screenshots/`
(gitignored, regenerated per run, never committed as baselines).

**2. Two structural primitives, `src/ui/components/layout.tsx`** — pure
presentational, zero `src/core` coupling, zero auth/cookies, safe to use
from a statically-generated page exactly as safely as a dynamic one:
- **`Rail`** — asymmetric primary/secondary composition, single column
  below 1280px, two columns at ≥1280px. Primary renders before secondary
  in the DOM and CSS never reorders them (grid auto-placement, not
  `order`) — verified by an automated tab-order test, not just asserted.
  A `.tgi-rail--tight` opt-in modifier caps total width so a
  narrow-content secondary region sits close to primary instead of
  drifting to the container's far edge with a disconnected gap — found
  by inspecting an actual screenshot (the automated overflow/clipping
  checks correctly saw nothing wrong either way, since a large gap isn't
  overflow). Opt-in, not the default, since a future data-heavy primary
  region may legitimately want the unconstrained fluid column.
- **`IdentityHero`** — the shared "portrait + identity column" shell,
  extracted from three places that had independently hand-written the
  same flex row (Results' closest-match card, the Person detail page
  hero, the Compare page hero) — including the portrait-column
  width-tie fix documented below under "External identity & media
  metadata," which had been discovered and fixed three times
  independently before this extraction existed. Deliberately does not
  prescribe info-column content — each call site's real content mix
  (eyebrow/heading level/meta line/links/CTA) differs, and only the
  structural shell was duplicated, not the content.

**Extraction verified safe before any visual change was made**:
`IdentityHero` was wired into Results, Person, and Compare with **zero
rendered-output change**, then confirmed — `tsc --noEmit` clean,
`vitest run` 420/420 unchanged, `pnpm build --webpack` clean at **84
routes with the identical static/dynamic split** (all 70 Person pages
still `●` SSG, Results/Compare/Account/`/auth/callback` still `ƒ`
dynamic — the exact regression class Stage 9D hit once already) — only
after that did the Landing redesign begin.

**3. Landing — the only page visually redesigned this stage.** Below
1280px, structurally unchanged. At ≥1280px, `Rail` splits the page:
headline/subtitle/CTAs stay primary/left, and the existing
`landing.ai_disclaimer` copy — this file's own "one rule," previously
the smallest, easiest-to-skip line on the page — becomes a genuine
secondary region: real, already-authored content given real visual
weight, not filler added because space existed. One small,
human-approved content addition: a new label above that card, **"How It
Works" (EN) / "작동 방식" (KO)** (`landing.method.eyebrow`, both
locales), matching the existing `results.method.toggle` naming
convention. One deliberate design call, not literal pixel-for-pixel
narrow-width preservation: below 1280px the disclaimer now renders
inside the same small labelled card as at wide desktop, rather than the
plain muted trailing line it was before — reasoned through explicitly
(duplicating the text in the DOM for a breakpoint-only treatment would
hurt screen readers; one coherent treatment at every width was judged
better than two divergent ones) and approved directly against real
screenshots, not silently decided.

**4. Incidental finding, fixed: Next.js 16 was silently mutating
CLAUDE.md.** `next dev`/`next build` auto-append a generic "agent rules"
boilerplate block to this file on every run
(`node_modules/next/dist/server/lib/generate-agent-files.js`) — caught
as an unexpected uncommitted diff to this project's most carefully
hand-curated file. Reverted the pollution and set `agentRules: false` in
`next.config.mjs` specifically to stop this from recurring silently:
this file is edited deliberately and reviewed line by line per its own
header, and an auto-injected block is exactly what that discipline
exists to prevent. Confirmed fixed by a full rebuild leaving this file
at zero diff.

**Verification.** `tsc --noEmit` clean · `vitest run` **420/420**
(unchanged — no `src/core` file touched) · `pnpm build --webpack` clean,
**84 routes**, static/dynamic split identical throughout · Playwright
**14/14** · zero console/page errors, zero horizontal overflow, zero
clipped elements at any tested width/locale · confirmed gitignored:
`test-artifacts/`, `/playwright-report/`, `/blob-report/`,
`/test-results/`; no `.env*` file tracked beyond the pre-existing
`.env.example` template.

**Phase 10D Stage 1 is FORMALLY CLOSED, human-approved (2026-08)** — the
Landing composition and the "How It Works" / "작동 방식" treatment were
explicitly approved against real screenshots. No Phase 10D stage beyond
this one has begun; Person, Results, Saved Result, Compare, and Account
remain unredesigned (Results, Person, and Compare already use
`IdentityHero` presentationally, with no visual change yet). No auth,
Supabase, result-snapshot, algorithm, SEO, portraits, analytics, ads, or
dataset code was touched.

**2026-08 mobile-polish follow-up (narrow scope, Landing only, human-
approved).** The approved wide-desktop (≥1280px) composition above was
never in question; the follow-up addressed a mobile-only rhythm problem
found after Stage 1 shipped — headline, primary CTA, secondary CTA, and
the How It Works card all read as similarly-weighted large rounded
elements stacked in sequence below 1280px, the generic "giant/giant/
giant/giant" AI-template rhythm the project's own design principle
warns against (see "Anti-AI-template" section above, adopted the same
week). Fixed with three changes, every one scoped to a Landing-only CSS
class (`.tgi-landing-headline` / `.tgi-landing-cta-secondary` /
`.tgi-landing-howitworks`) that does nothing at ≥1280px, so the shared
`.tgi-display`/`.tgi-button--secondary`/`.tgi-card` definitions Person,
Results, and Account also depend on are provably untouched — confirmed
by their zero diff, not merely by not editing those files:
- **Headline**: 56px → 50px below 1280px only (≈11% reduction) — still
  the dominant element, just no longer consuming the whole first
  viewport on its own.
- **Secondary CTA** ("Browse People First" / "먼저 인물들 둘러보기"):
  below 1280px, sheds its outlined-pill chrome for a restrained text
  link + decorative arrow (`aria-hidden`), while mechanically keeping a
  44px+ tap target (`min-height` preserved, only the visible chrome
  removed). At ≥1280px the class does nothing, so the pill treatment is
  pixel-identical to the original Stage 1 approval.
- **How It Works**: below 1280px, the sunken-card background/border/
  shadow/radius/padding are stripped in favour of a single quiet
  top-rule divider — an editorial note rather than a UI card echoing
  the two buttons above it. At ≥1280px, unchanged sunken card.

**Korean headline copy revisited in the same follow-up, resolved
through two rounds of comparison, not a single guess.** The original
`quiz.v1`-era Korean headline, "역사 속 누가 당신과 비슷하게
생각할까요?" ("who in history thinks similarly to you"), wrapped to 4
lines at 390px against English's 2 — a real, measured disproportion
(230px vs 115px block height, ~2.0×), not merely a subjective
impression. Two Korean rewrites were compared, both evaluated for
native-Korean quality, not just line count:
- Candidate A, "역사 속 누가 당신처럼 생각할까요?" ("who thinks like
  you") — grammatically natural (처럼 is the standard comparison
  particle) but its sentence architecture maps almost 1:1 onto the
  English original's own subject→comparison→verb shape; competent
  Korean, not distinctively native-feeling. Wrapped to 3 lines
  (172.5px, 1.5× English) purely from being shorter than the original.
- **Candidate B, "역사 속 누구와 생각이 닮았을까요?" ("whose thinking
  resembles yours") — the one actually shipped.** Built around "생각이
  닮다," an idiom Koreans use in ordinary warm speech ("우리 생각이
  닮았네" — "we think alike"), making "생각" (thinking) the grammatical
  subject rather than "당신" (you) the object of comparison — a
  distinctly Korean sentence shape, not a transplant of the English
  one, and it drops "당신을 위한"-style direct address entirely, which
  reads as generic Korean marketing copy when overused. Tone is more
  reflective/literary, a better fit for this product's editorial/
  historical identity than a personality-quiz one. Semantically
  equivalent to A (mutual resemblance vs. one-directional "thinks like
  you" — both preserve the core promise fully; resemblance is
  inherently mutual, so B is arguably the more precise match to what
  `matching_v2` actually computes, a symmetric similarity, though this
  was a minor supporting point, not the deciding one).

**Measured, not assumed equal**: Candidate B wraps to the exact same
3-line/172.5px block as Candidate A at 390px, and 2 lines at both 768px
and 1280px — the copy swap between A and B was rhythm-neutral, decided
entirely on editorial-quality grounds. **No KO-specific font-size
adjustment was applied or is believed necessary**: the remaining 1.5×
block-height difference between English (2 lines) and Korean (3 lines)
at the same 50px size was judged, from the actual rendered screenshots,
to be normal cross-language variation rather than disproportion —
shrinking Korean further to force a closer match would risk making it
read as visually subordinate to English, which cuts against "equivalent
visual emphasis, not identical numeric font sizes" (this section's own
principle, stated during the review that produced this decision).
`landing.title` in `ko.ts` now reads "역사 속 누구와 생각이
닮았을까요?"; `en.ts`'s `landing.title` was never touched.

Verified: `tsc --noEmit` clean, `vitest run` 420/420 (unchanged),
`pnpm build --webpack` clean at 84 routes (unchanged split), Playwright
56/56 (17 Landing + 39 Person, the Person suite re-run as a full-suite
regression check even though this follow-up never touched Person code).
Confirmed zero diff on every Person/Results/Compare/Account file and on
`src/ui/components/layout.tsx` throughout. **Both the mobile rhythm
fix and the final Korean headline copy were explicitly approved against
real screenshots**, same closure discipline as every other visual
decision in this project.

## Phase 10D-2 — Person Detail editorial layout (FORMALLY CLOSED,
## human-approved, 2026-08)

Applies the Stage 1 primitives to the Person detail page — the second of
the pages "Known open issues" item 12 names, after Landing. Results,
Saved Result, Compare, and Account remain untouched, as scoped. Full
stage record in `docs/phase10-provisional-checkpoint.md`'s "Stage 10D-2
record"; this section is the durable summary.

**Diagnosis.** The identity hero (12rem portrait + `flex:1` info column)
stretched across the full 1280px container with a short info column —
the "large visually unused region" the Phase 10D audit named. Two
further instances of the same underlying problem, not previously
flagged, were found by inspecting real wide-desktop screenshots (per
this stage's own instruction to catch visual problems that way rather
than asking for manual discovery): Sources was a full-width sunken card
holding only a short citation list, and — the more serious one —
Opposite Profile's `Grid` always renders exactly one card
(`selectOppositePerson` returns at most one person), and `Grid`'s
auto-fit sizes a single-item grid's one column to `1fr`, stretching that
lone card to the full container width; combined with `PersonCard`'s
fixed 4:5 portrait aspect-ratio, this produced a placeholder block taller
than the rest of the page at 1920px.

**Changes, all Person-page-local JSX, zero shared-component edits:**
- Hero now pairs with "Known For" (`person.impactDomains`, real
  already-existing content) via `Rail` (`.tgi-rail--tight`, the same
  modifier Landing introduced) at ≥1280px; single column below it, with
  Known For rendering in the exact position/order it already occupied
  when stacked — confirmed unchanged at 1024px, not merely assumed.
  Falls back to a plain `IdentityHero` (no `Rail`) if `impactDomains` is
  ever empty, so an empty secondary region is never reserved — not a
  live case in the current 35-person roster (verified: `impactDomains`
  is non-empty for every current person), but the field is nullable by
  schema, and reserving dead grid width for a person with none would be
  its own version of the problem this stage fixes.
- Sources capped with the existing `.tgi-measure-stack` — the same
  narrow-content pattern already used by quiz/account/error states, not
  a new one.
- Opposite Profile's single card capped at `20rem` instead of wrapped in
  `Grid`, which was never the right primitive for an always-exactly-one
  item section.

**`IdentityHero`/`Rail` themselves: zero diff.** `git diff
src/ui/components/layout.tsx` against the Phase 10D-1 commit is empty —
only the Person page's *usage* of the existing primitives changed, so
Results and Compare needed no re-verification beyond confirming their own
files were untouched (also zero diff), which is a stronger guarantee
than a passing runtime check would have been.

**Implementation fact, precisely scoped** (see the cross-reference
under "External identity & media metadata" above for the full
distinction): confirmed via `grep -n "portrait: {"` across both seed
files that Leonardo da Vinci is currently the ONLY person in the dataset
with a populated `portrait` field. This is a current-implementation fact
about `src/data/people/*.ts`, not a correction to the earlier "5 of 35
people have verified data" record — that record is about verified
external-identity metadata (Wikidata QID/Wikipedia links) for 5 people,
a different and still-accurate claim; it never asserted all 5 have
portraits. Mattered concretely this stage because the representative
Person visual-test matrix needed one person on the portrait code path
(`align="start"` + `portraitCaption`) and two off it — da Vinci is the
only person that can exercise the former today.

**Playwright harness improvements, both found via this stage's own
"exhaust automatable verification" work, not assumed:**
- **`assertNoClippedElements` false-positive, fixed.** The Landing-only
  10D-1 suite never exercised `.tgi-visually-hidden` (the project's
  clip-rect sr-only pattern), so a real bug in the *check itself* went
  unnoticed: it flagged deliberately visually-hidden screen-reader text
  (`ImpactBadge`/`ConfidenceIndicator`/`ScoreBar` labels — Person renders
  many of these, Landing renders none) as "clipped." Fixed by excluding
  `el.closest(".tgi-visually-hidden")` — a check-helper fix, not a
  product fix; nothing in the app changed.
- **Harness now runs against a production build (`next build --webpack
  && next start`), not `next dev`.** Two separate full-suite runs each
  flaked on a *different* test (confirmed: both passed cleanly in
  isolation every time) — the signature of `next dev`'s on-demand,
  serialized route compilation contending under this suite's real
  parallelism (11 workers), not a bug in either test or the pages under
  test. Bumping the timeout further didn't fix it (still flaked at 90s,
  just on a different test), because the problem was contention, not
  duration. A production server has no on-demand compilation at all,
  which removes the whole class of flake structurally — confirmed
  stable across two consecutive full runs post-fix, and ~30% faster
  since there is no per-route cold-compile cost. Also incidentally
  removes Next's dev-mode floating "N" indicator from screenshots.

**Representative visual-test matrix** (not all 70 person routes, per
this stage's own instruction that a smaller matrix providing the same
signal is preferred): `leonardo-da-vinci` (long name, the one portrait
case), `ada-lovelace` (no portrait), `yi-sun-sin` (no portrait, short
Korean display name "이순신" vs. "Yi Sun-sin") — × en-US/ko-KR × six
viewports (390/768/1024/1280/1600/1920) = 36, plus 3 targeted tests (DOM
order, link integrity, no-portrait rendering) = 39 tests, all passing,
in `e2e/person.visual.spec.ts`.

**Verification, final.** `tsc --noEmit` clean · `vitest run` **420/420**
(unchanged — no `src/core` file touched) · `next build --webpack` clean,
**84 routes**, all 70 person pages still `●` SSG, static/dynamic split
identical throughout · Playwright **53/53** (14 Landing + 39 Person),
stable across repeated full runs · zero console/page errors, zero
horizontal overflow, zero clipped elements at any tested width/locale ·
confirmed: `src/ui/components/layout.tsx`,
`app/[locale]/results/page.tsx`, and `app/[locale]/compare/[slug]/page.tsx`
all show zero diff against the Phase 10D-1 commit · confirmed gitignored,
no stray files, no secrets, no auth/Supabase/scoring/dataset-content
changes.

**Anti-AI-template principle applied, not just declared.** The hero +
Known For pairing uses real, already-existing content (impact-domain
chips already carried meaning via `ImpactBadge`'s glyph+label
discipline) — not a decorative card added to fill space; no new
gradient, shadow, or border-radius pattern was introduced; the Opposite
Profile and Sources fixes both *remove* an accidentally oversized
bordered/shadowed region rather than add one, which is the direction
this principle argues for by default.

**Phase 10D-2 is FORMALLY CLOSED, human-approved (2026-08)** — the
Person Detail editorial layout, hero + Known For pairing, Sources width
restraint, and Opposite Profile single-card width fix were explicitly
approved against real screenshots. Results, Saved Result, Compare, and
Account remain unredesigned.

## Phase 10D-3 — Live Results editorial layout (FORMALLY CLOSED,
## human-approved, 2026-08)

**Live Results only** — the densest page in the product and the one
carrying the most Phase 10C behavioral contracts, so scoped deliberately
narrower than a single pass: **Saved Result's own wide-desktop
composition is explicitly deferred to a follow-up stage**, not folded in
here, since it has its own content-parity questions (see "Phase 10C —
historical result fidelity" and the Saved Result anatomy notes in
`docs/phase10-provisional-checkpoint.md`) that are a product decision,
not a layout one. Compare, Person, Landing, and Account were not
touched. Full stage record in `docs/phase10-provisional-checkpoint.md`'s
"Stage 10D-3 record"; this section is the durable summary.

**Spotlight-card geometry bug, fixed and measured — not estimated.**
"Your Unexpected Match" and "Your Opposite Profile" each wrapped a
single `PersonCard` in a `Card` with no width constraint, so the card
filled the available container and its 4:5 portrait aspect-ratio scaled
into an oversized block. **Measured directly** on a synthetic fixture at
1920px, before/after: **1148px → 332px wide, 1435px → 579.5px tall**.
(An early draft of this stage's own audit had estimated this at "roughly
1850px wide" before any measurement was taken — that number was never
accurate and is deliberately not repeated here; the real, measured
figures above are the only ones on record.) Fixed with a page-scoped
`maxWidth: "24rem"` wrapper, identical in spirit to Person's Opposite
Profile fix — `PersonCard`/`Card`/`Grid` themselves untouched.

**Follow-up (same stage, after visual review) — Unexpected Match +
Opposite Profile pair into one editorial row at ≥1280px.** They're
semantic peers (both single-person spotlight moments); pairing them
avoids each sitting alone with a large unused region beside it.
New `.tgi-results-spotlight-pair` (`grid-template-columns:
repeat(2, minmax(0, 24rem))`, capped `max-width: 51rem` — an early
version omitted the container's own max-width and measured 1200px wide
despite only needing 816px for its two capped cards, caught by measuring
the rendered box, not assumed from the track definition). Pairing
applies **only when both are real matches** — when Unexpected Match has
no real match (the "no unexpected match" empty-state message), Opposite
Profile deliberately renders as a standalone controlled spotlight
instead of being paired with a short empty-state box, which the review
correctly flagged as its own kind of awkward composition. Below 1280px,
unchanged stacked order, DOM-order verified.

**Greatness hero**: paired via `Rail` (`.tgi-rail--tight`, same modifier
Landing/Person already use) at ≥1280px — score/band as primary,
archetype note + explainer as secondary. **Archetype callout flattened,
not a Card**: tried first as a plain accent-rule note (border-left +
typography, no background/border/radius) per the project's
anti-AI-template principle, confirmed sufficient by screenshot
inspection rather than assumed. **Closest Match retained unchanged** as
the one place containment is genuinely justified — a full semantic
`Card`, `IdentityHero`, match percentage, explanation, and all three
CTAs exactly as before, confirmed by direct diff (this block was never
touched). **Phase 10C's save-CTA DOM contract re-verified, not just
preserved by omission**: `SignInCta` still renders after Closest Match
and before Unexpected Match, confirmed by direct text-offset measurement
in the live DOM, now a permanent regression test.

**Signature + Dual-Edged**: new `.tgi-results-trait-pair` — an
**equal-width** grid (`1fr 1fr`, capped `max-width: 56rem`), deliberately
NOT `Rail`, whose secondary column is capped narrow specifically to read
as subordinate — these two `TraitCard`s are peers, not a primary/
secondary pair. Active only at ≥1280px and only when both exist; when
Dual-Edged is absent, Signature falls through to its original single
`.tgi-measure-stack` treatment untouched — verified with a dedicated
synthetic no-dual-edged fixture, not just reasoned about.

**Comparison**: You Both pairs with Your Advantage via `Rail`
(`.tgi-rail--tight`) at ≥1280px when Advantage exists — found via a real
synthetic fixture search (13 of 35 tested answer patterns produced a
non-empty Advantage), not faked. Where You Differ becomes its own
full-width section afterward — a deliberate reorder (Your Advantage now
sits right after You Both instead of last, at every width, since a real
DOM reorder can't be conditional on viewport without either duplicating
content or using the CSS `order` trick this project's Rail contract
already rules out). When Advantage is absent, You Both renders alone;
confirmed no empty Rail is ever created (`.tgi-rail` count stays at
exactly 1, the hero's). **`#comparison` anchor preserved exactly** —
same id, same click-and-scroll behavior, now a permanent test.

**Follow-up — mobile discovery grids.** Category Matches (7 cards) and
Top Matches (5 cards) collapsed to a long single-column stack below
768px (both use `Grid min="14rem"`, which can't fit two 14rem tracks
inside a 390px viewport). Measured for the neutral fixture, before →
after this stage's mobile pass: **total page height 13242px → 8603px
(−35%)**, **Category Matches section 4271px → 1614px (−62%)**, **More
People Worth Meeting section 3207px → 1273px (−60%)**. Fixed with a new
`.tgi-results-discovery-grid` modifier forcing 2 columns at ≤640px
(reusing the existing `.tgi-filter-bar` breakpoint already established
elsewhere in this file, not a new arbitrary value) — all person metadata
(name/subtitle/lifespan/match%) preserved unchanged; no padding or
type-scale reduction was needed once the actual screenshots were
inspected in both locales. 768px and above keep the original `Grid`
auto-fit behavior, confirmed unaffected. `Grid`/`PersonCard` themselves
untouched — Person/Compare/the directory's own `Grid` usage is
unaffected.

**Five synthetic, deterministic fixtures** — generated via
`encodeResultToken` (a pure `src/core/quiz` export) against fixed answer
patterns during this stage's own audit work, never a real user's data,
never committed as such: `neutral` (typical shape, full responsive
matrix), `high` (Greatness 88), `lowNoDualEdged` (Greatness 5,
dual-edged absent), `mixed` (3 dual-edged candidates, only the first
renders), `advantagePresent` (Advantage present, also the
Unexpected-Match-absent case reused for the spotlight-pairing follow-up).

**Verification, final.** `tsc --noEmit` clean · `vitest run` **420/420**
(unchanged — no `src/core` file touched) · `next build --webpack` clean,
**84 routes**, static/dynamic split identical throughout every step of
this stage · Playwright **88/88** (56 prior + 32 Results) · zero
console/page errors, zero horizontal overflow, zero clipped elements at
any tested width/locale/fixture · confirmed: `src/ui/components/
layout.tsx` and every Person/Compare/Account/Landing file all show zero
diff against the Phase 10D-2 commit.

**Stage 10D-3 is FORMALLY CLOSED, human-approved (2026-08)** — every
composition decision above (hero rail, flattened archetype, Closest
Match retained as-is, the spotlight pairing and its absent-branch
fallback, the Signature/Dual-Edged pairing and its absent-branch
fallback, the comparison rail and its absent-branch fallback, and the
mobile discovery-grid density fix) was explicitly approved against real
screenshots across two rounds of review. Saved Result, Compare, Person,
Landing, and Account remain untouched.

**Known non-blocking item, recorded for a future micro-polish pass, not
a current blocker:** the "Save your result" sign-in CTA (`SignInCta`,
Phase 10C) still renders as a centered sunken card between Closest Match
and the deeper sections — visually a bit heavier than the surrounding
editorial treatment now that the archetype note nearby has been
flattened. A future pass may reconsider its visual weight, but **must
preserve every Phase 10C behavioral contract untouched** (DOM position,
signed-out-only visibility, the "saved" state only ever being claimed
after directly observing the pending-queue transition) — this is a
presentation-only candidate, not licence to touch the underlying logic.

## Roadmap

Phase 0 architecture ✓ · 1 design system ✓ · 2 dataset to 30+ ✓ (see open issue
2b before growing further) · 3 people explorer ✓ · 4 quiz to 45-60 items +
`reference_v2` ✓ (open issue 2b substantially fixed, not fully closed) ·
5 matching hardening / robustness audit ✓ (no `matching_v2` change — see
"Phase 5"; open issue 8 resolved) · 6 quiz experience + results UI ✓ (see
"Phase 6"; anonymous, no accounts, no DB, no runtime AI) · **6.5 taxonomy
breadth/research audit ✓ research complete
(`docs/phase6.5-taxonomy-audit.md`) · 6.5B taxonomy_v1.1 + Quiz v2 design
gate ✓ approved with reservations, decision-checked
(`docs/phase6.5b-taxonomy-quiz-design.md`) · 6.6 taxonomy_v1.1 + Quiz v2
✓ **CLOSED** (`docs/phase6.6-taxonomy-v1.1-implementation.md`; full
closure reasoning in "Phase 6.6 closure" above) — Quiz v2 live at 64
items (grew from the approved 62 after Stage 4.5's measurement-repair
gate — see that document), person scoring (Stage 5) complete (34/35
eligible, Zheng He the sole exception), `reference_v3` methodology
reviewed and reconfirmed unchanged (Stage 6), dispersion regenerated for
34 traits and `matching_v2` fully revalidated with no code change needed
(Stage 7 — max #1 frequency 17.0%), `calibration_v3` regenerated and
validated (Stage 8 — top-1/Greatness medians recovered via honest refit,
no matching/reference/dispersion/greatness-formula change), final
Greatness validation + full product/UI compatibility audit complete with
2 real defects found and fixed — stale trait/question counts in copy, a
reproduced Phase-7 compare-route crash risk (Stage 9, see that section),
quiz presentation grouping (Stage 10A, presentation-only — 64 questions
now render across 53 screens, measurement instrument completely
unchanged) complete and live-verified, evaluative-symmetry wording repair
(Stage 10B, 17 of 64 items reworded per user manual-retake feedback,
same 53-screen grouping and all mappings/signs/weights unchanged) complete
and live-verified, response-anchor symmetry (Stage 10C, 3 of 64 items —
`q13`/`q57`/`q61` — given custom behavioral scale anchors per a second
user manual-retake finding, each individually live-approved by the user
with scoring direction withheld until judgment; 5 more candidates deferred
or rejected, see "Response-anchor symmetry" above) complete and
live-verified — **no longer blocks Phase 7, pending a fresh decision to
resume** · 7 target comparison + development content ✓ **CLOSED,
human-approved (2026-08)** (see "Phase 7 human-review checkpoint" above
and `docs/phase7-provisional-checkpoint.md` — Benjamin Franklin approved
after 3 rounds, Genghis Khan approved after 1 round with the
`dual_edged`/`tradeoffKey` gap fixed and a checkpoint documentation error
corrected; no Phase 6.6 algorithm touched; non-blocking cleanup recorded
in "Known open issues" item 10) · 8 localisation polish ✓ **CLOSED,
human-approved (2026-08)** (see "Phase 8" above — full `ko-KR` translation,
native-copy quality pass, 4 terminology renames, 35-person display names,
Korean serif typography fix, occupation/impact-domain coverage, final
brand-tone heading pass; no Phase 6.6/7 algorithm, English copy, or
selector touched) · **9 accounts ✓ FORMALLY CLOSED, human-approved
(2026-08): Stage 9A architecture
audit ✓ complete (Supabase Auth + Supabase Postgres approved; current
2026 publishable/secret key model verified; provisioning walkthrough
corrected for completed-results-only migration scope and the
`@supabase/ssr`/PKCE callback architecture); manual Supabase provisioning
✓ confirmed complete by the user (2026-08); Stage 9B ✓ FORMALLY CLOSED
(2026-08, closure date = live-migration confirmation, not the earlier
local-build pass — see "Phase 9" above) — FK/RLS migration
(`db/migrations/0001_stage9b_accounts.sql`, confirmed executed live +
`db/schema.sql` updated to match), `@supabase/ssr` browser/server clients
+ session-refresh `proxy.ts`, `/auth/callback` PKCE route, all verified
clean (`tsc`/268 tests/`pnpm build --webpack` at 82 routes); Stage 9C
(canonical `saveCompletedResult` primitive, provenance-safe
`tgi_pending_own_results_v1` queue, append-only `src/core/versions.ts`)
✓ FORMALLY CLOSED (2026-08, closure date = live-migration confirmation of
`0002_stage9c_completed_at.sql`, same discipline as Stage 9B — applied
proactively this time, 298/298 tests, `tsc`/build clean) — see "Phase 9"
above and `docs/phase9-provisional-checkpoint.md`; Stage 9D (header +
sign-in/out UI, `processPendingResults.ts`, `app/actions/results.ts`)
✓ **FORMALLY CLOSED, human-approved (2026-08)** — a real SSG regression
(server-side auth check forcing all 70+ static pages dynamic) found and
fixed mid-stage; the real Google OAuth round-trip failed once (confirmed
root cause: `.env.local` edited in Notepad but never saved, dev server ran
on placeholder keys — a `redirectTo` query-parameter theory explored en
route was fixed defensively but confirmed NOT the actual cause) then
succeeded; two further sequential DB blockers found and fixed after that
(`completed_at` missing live → migration 0002 applied; `quiz_versions`
never seeded with `quiz_v2`, the actual final blocker → migration 0003,
idempotent); all 12 original human E2E checks confirmed passing live by
the user, including dedup (exactly one `user_profiles` row survives
sign-out/sign-back-in); temporary debug logging stripped back to two
permanently-useful sanitized failure logs at closure; 312/312 tests,
`tsc`/build clean, static/dynamic split confirmed identical throughout. A
dedicated closeout audit (2026-08) confirmed no required Phase 9 work
remains and corrected a standing overclaim: a "Stage 9E+ (history,
privacy/deletion, locale, testing)" breakdown, previously attributed to
"the original Phase 9 spec the user gave," could not be verified anywhere
in this file or the checkpoint — it was an assistant-authored
continuation idea, not a confirmed requirement, and is not part of the
authoritative roadmap. Phase 9's actual approved scope is fully
delivered** · **10 SEO/share/ads/scale — Stage 10A (production
foundation) FORMALLY CLOSED (2026-08)**: `metadataBase` set
(`app/layout.tsx`, via new `src/lib/env.ts`'s `siteUrl()`),
`.env.example` + `docs/deployment.md` added (env var names only, no
secrets). Audit confirmed zero hardcoded `localhost`/port references in
`app/`/`src/` — OAuth redirect origin already derives from the live
request/browser origin (`window.location.origin` client-side,
`new URL(request.url).origin` server-side), so no code changes were
needed there for production to work. OAuth scopes confirmed
`openid`/`email`/`profile` only (no `scopes` option set in
`signInWithOAuth`, and the app only ever reads `user.id` — never
email/name/picture — confirmed by grep) — Google's own docs say apps
using only these non-sensitive scopes don't need the heavier
sensitive/restricted-scope verification tier, only brand verification
(privacy policy) once past a small test-user list. **`siteUrl()`
subsequently hardened same-day**, after review found its original
unconditional localhost fallback could silently ship localhost-based
metadata from a production deploy missing one variable: resolution is
now `NEXT_PUBLIC_SITE_URL` (explicit, always wins) →
`VERCEL_PROJECT_PRODUCTION_URL` (Vercel's stable production-domain
alias, safe even read from a preview build — deliberately not the
per-deployment/preview-covering `VERCEL_URL`) → in genuine production
with neither set, a loud deduped `console.error` plus the same
localhost fallback (never a thrown error — `metadataBase` runs in the
root layout every page, including the anonymous quiz/results flow,
passes through, so crashing the whole site over a metadata-only concern
would be disproportionate) → silent localhost fallback in local dev.
7 new tests (`src/lib/env.test.ts`, module-isolated via
`vi.resetModules()` since the warn-once guard is module-level state).
Git/Vercel documentation corrected the same day: git is strongly
recommended for this project's workflow (source history, deploy-on-push,
rollback) but is not a universal technical prerequisite for every Vercel
deployment path — not yet a git repository, flagged as a manual decision
for Stage 10B, not resolved unilaterally. Final validation:
`tsc --noEmit` clean, `vitest run` **319/319** (312 + 7 new), `pnpm build
--webpack` clean, **82 routes**, static/dynamic split unchanged, no
credential values or privileged keys introduced (confirmed by grep).
Full record in `docs/phase10-provisional-checkpoint.md`; full runbook in
`docs/deployment.md`. **Stage 10B (First Real Deployment) is now FORMALLY
CLOSED, human-approved (2026-08).** Production deployment architecture:
**GitHub `main` → Vercel → Supabase** — the repository was git-initialized,
committed, and pushed to `github.com/yiri20/TheGreatInside` (private,
`main` branch), then imported into Vercel with production branch `main`.
Current production domain (Vercel-assigned, no custom domain configured
yet — deliberately deferred, same boundary as every other Phase 10 stage):
**`https://the-great-inside.vercel.app`**. Environment was configured with
only the two variables the code actually reads —
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` —
reconfirmed by grep immediately before deployment that `SUPABASE_SECRET_KEY`
remains genuinely unused in `app/`/`src/` and was correctly NOT added.
`NEXT_PUBLIC_SITE_URL` was deliberately left unset for this first
deployment: `siteUrl()`'s Stage-10A-hardened resolution chain falls
through to Vercel's own `VERCEL_PROJECT_PRODUCTION_URL` automatically, so
`metadataBase` resolves correctly against the real production domain with
zero extra configuration — confirmed live, not just reasoned about.

**Full human E2E confirmed live on the real production deployment by the
user (2026-08)** — an agent cannot complete a real Google consent screen,
same discipline as every Phase 9 stage closure: production domain loads;
both `/en-US` and `/ko-KR` routes work; People directory and individual
person pages render; the anonymous quiz completes end-to-end and
`/results` renders correctly; Google OAuth completes successfully in
production, with the callback returning to the Vercel app and the Korean
locale preserved through the full round-trip; the header correctly flips
to Account/Sign out; session persistence survives a refresh. Most
significantly, **this is the first time the Stage 9B/9C/9D pending-result
pipeline has been exercised against the real production Supabase project**
rather than local dev, and it worked correctly: the newly completed
anonymous result migrated into `public.user_profiles` with its own
distinct `result_token`; `tgi_pending_own_results_v1` cleared to `[]`;
`tgi_last_result_v1` correctly still reflects the latest-viewed result; no
duplicate row or persistence regression was observed. **`completed_at`
(≈20:09:43 UTC) measurably precedes `created_at` (≈20:12:24 UTC) on the
saved row** — direct production evidence that the dedicated `completed_at`
column genuinely preserves the moment the quiz was finished, not the later
moment the row was written during sign-in, closing the last unverified
surface left open at Phase 9's own closure.

One new Phase 10 UX requirement was identified during this human E2E and
recorded, not implemented at the time — see "Known open issues" item 13
(results-page sign-in conversion CTA) above, now marked resolved.
**Phase 10C (historical result fidelity + account save/UX) is FORMALLY
CLOSED, human-approved (2026-08)**: see the dedicated "Phase 10C —
historical result fidelity" section above for the full record (immutable
`result_snapshot` design, the completed 11-field provenance/person-data
drift guard, the quarantine-not-delete architecture for incompatible
pending entries, `/account` + `/account/results/[id]`, the signed-out
save CTA, migration 0004 applied and verified live, the one-row legacy
backfill with its full evidence chain, and the auth-vs-lookup-state bug
found and fixed during the human E2E itself). `tsc`/`vitest`
(**420/420**)/`build` (**84 routes**) all clean. Deployed from commit
`d425e24730fa524429033978298431dd84be1f9e`; the full 12-point human
production E2E — `/account`, the backfilled historical result reopening
with exact parity, the honest legacy-NULL state, a brand-new completion
saving automatically with a real `result_snapshot`, multi-result and
dedup behavior, and the auth-state fix — is confirmed passed, same
closure discipline as every other stage in this project (the user's own
live confirmation, not an agent's inference). Preserve the broader
Phase 10 boundaries going forward: no portraits pipeline, no ads, no
analytics, no share cards, no full SEO pass, no invented
privacy-policy/business facts, no custom domain — none of these are
started, and no further Phase 10 stage begins without its own fresh,
explicit decision. Full record in `docs/phase10-provisional-checkpoint.md`.
**Phase 10D Stage 1 (Visual Regression Harness + Editorial Primitives +
Landing) is FORMALLY CLOSED, human-approved (2026-08)** — see "Phase
10D-1" above for the full record: a new Playwright visual-smoke harness
(Chromium only, `e2e/`), a "automate everything reasonably automatable
before asking for human validation" testing policy adopted going
forward, two new presentational layout primitives (`Rail`/`IdentityHero`,
`src/ui/components/layout.tsx`) with the wide-desktop breakpoint set at
**≥1280px** (a deliberate review correction of the originating audit's
own ≥1024px proposal, not a restatement of it), `IdentityHero` wired
into Results/Person/Compare with zero rendered-output change (verified
before any visual work began), and Landing's wide-desktop rail
composition — the only page actually redesigned this stage. `tsc`/
`vitest` (**420/420**)/`build` (**84 routes**, static/dynamic split
unchanged) all clean, Playwright **14/14**. Person, Results, Saved
Result, Compare, and Account remain unredesigned and require their own
fresh, explicit decisions to begin (see "Known open issues" item 12 and
`docs/phase10-provisional-checkpoint.md`'s "Exact next task" for
candidate stages 10D-2 through 10D-5). **Phase 10D-2 (Person Detail
Editorial Layout) is FORMALLY CLOSED, human-approved (2026-08)** — see
"Phase 10D-2" above: hero + Known For paired via `Rail` at ≥1280px
(`IdentityHero`/`Rail` themselves unchanged — zero diff, confirmed —
only the Person page's usage of them changed), Sources capped to
`.tgi-measure-stack`, and a real pre-existing "giant empty card" bug
fixed (Opposite Profile's always-exactly-one-item `Grid` stretching to
the full container width). The Playwright harness itself improved twice
this stage: a false-positive in the clipped-element check (was flagging
deliberate `.tgi-visually-hidden` sr-only text) fixed, and the harness
switched from `next dev` to a production build to eliminate cold-compile
contention flakes structurally rather than papering over them with a
longer timeout. `tsc`/`vitest` (**420/420**)/`build` (**84 routes**,
all 70 person pages still `●` SSG) all clean, Playwright **53/53**.
Results, Saved Result, Compare, and Account remain unredesigned.
**Phase 10D-3 (Live Results Editorial Layout) is FORMALLY CLOSED,
human-approved (2026-08)** — see "Phase 10D-3" above: the spotlight-card
geometry bug (measured 1148px→332px wide, 1435px→579.5px tall) fixed and
then, after visual review, paired Unexpected Match + Opposite Profile
into one editorial row at ≥1280px (standalone when Unexpected has no
real match); Greatness hero paired via `Rail` with a flattened
(non-Card) archetype note; Closest Match retained unchanged as the one
justified semantic `Card`; Signature + Dual-Edged paired as equal-weight
peers with a controlled single-column fallback; Comparison restructured
(You Both + Your Advantage paired when Advantage exists, Where You
Differ full-width, `#comparison` preserved exactly); and, after a second
round of visual review, mobile Category/Top Matches switched to a
Results-only 2-column grid at ≤640px, measured at **13242px→8603px**
total page height for the neutral fixture (−35%). Five synthetic
deterministic fixtures (`neutral`/`high`/`lowNoDualEdged`/`mixed`/
`advantagePresent`) drive the suite — none is or contains real user
data. `tsc`/`vitest` (**420/420**)/`build` (**84 routes**, split
unchanged) all clean, Playwright **88/88**. Saved Result, Compare,
Person, Landing, and Account remain untouched; Saved Result's own
wide-desktop pass is deliberately deferred to a follow-up stage (see
"Known open issues" and `docs/phase10-provisional-checkpoint.md`).

Before each phase, re-run the simulator. Calibration is not a one-time task.

## Conventions

- Everything in `src/core` is pure: same input → same output, forever, for a
  given version string.
- Every scoring change bumps a version constant. Never silently recompute saved
  results under a new algorithm.
- Ties break on stable ids (`localeCompare`), never on popularity or recency.
- Colour never carries meaning alone — impact always ships with text or an icon.
- Trait impact is `person × attribute × context`. If you find yourself giving an
  attribute a global colour, stop.
