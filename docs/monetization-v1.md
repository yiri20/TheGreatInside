# Monetization v1 — Deep Inside

Implementation record. See `CLAUDE.md`'s "Monetization v1" section for the
durable summary future sessions need; this file is the detailed reference.

## 0. Handoff checkpoint (2026-08) — READ THIS FIRST

**Monetization v1 implementation is complete on `feat/monetization-v1`.**
Automated verification is fully green (590/590 Vitest, 236/236
Playwright, clean production build — see the branch's own commits for
exact figures).

**External activation has intentionally NOT been performed in this
session, by explicit product decision**: activating real payment
infrastructure is deferred until product ownership/operations are handed
off to the future operator. Specifically, none of the following were
created, configured, or touched this session:

- No Stripe account/Product/Price/webhook of any kind (test or live).
- No `MONETIZATION_ENABLED`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
  or `STRIPE_DEEP_INSIDE_PRICE_ID` set anywhere, in Vercel or otherwise.
- `db/migrations/0005_monetization_v1.sql` has **not** been applied against
  the live Supabase project — `user_entitlements`/`purchases` don't exist
  there yet, and `analytics_events` still has no RLS enabled live.
- No real or test payment account of any kind is connected to this
  project.

**`feat/monetization-v1` has NOT been merged to `main`.** Do not merge
until the full §13 manual test-mode gate passes.

**Resume point for the next operator**: `docs/monetization-v1.md` §13
("Test-mode procedure (manual gate)"), starting at its step 1 — set
`MONETIZATION_ENABLED=true` + real Stripe **test** keys +
`STRIPE_DEEP_INSIDE_PRICE_ID` in the deployment. `docs/deployment.md` §5
has the exact external-dashboard steps (Stripe Product/Price creation,
webhook configuration, Vercel env vars, Supabase migration) in the same
order. Nothing in the implementation needs to change — this is
configuration and manual verification only.

## 1. Product

One product: **Deep Inside** (`deep_inside_lifetime_v1`,
`src/core/monetization/product.ts`). US$6.99, one-time, `mode: payment` —
not a subscription. Grants the authenticated account a **lifetime**
entitlement to Deep Inside on the current result and any future one,
restored automatically on sign-in on any device. No tiers, no credits, no
bundles, no ads — exactly one paid feature.

The free result (`/results`) is completely unchanged and ungated — quiz
completion, Greatness Potential, closest match, category matches, trait
profile, comparison, top matches, Explorer, person profiles, and Similar/
Opposite discovery all remain exactly as they were.

## 2. Premium report — deterministic, no generative AI

`src/core/monetization/deepInsideReport.ts` computes five sections from
data already produced by the existing, reviewed algorithms — no new
scoring/matching model, no LLM call, negligible marginal compute cost:

| Section | Source |
|---|---|
| Why Your Matches Fit | Top 3 of `rankMatches`'s own ranking, each with its existing `closestTraits`/`personHigherTraits`/`userHigherTraits` breakdown |
| Your Historical Circle | Next tier of the same ranking (12 people) — a wider slice of an already-honest order, never re-scored |
| Signature Combination | "combination": the user's own top-2 `distinctiveTraits` (same selector Results' Signature Trait uses). "tension": `TENSION_PAIRS` (`greatness.ts`'s own reviewed coherence-penalty list, same 75-point threshold `coherence()` uses) — never an invented pair |
| Your Strongest Contrast | `selectOppositeProfile`'s candidate, its own `largestDifferences`/`closestTraits` |
| Strengths & Trade-offs | `distinctiveTraits` (high side only) + `bandForScore` to select the already-authored `dev.*` development-guide band; the VIEW resolves the actual EN/KO copy via `t()` at render time — no English prose is ever baked into the stored report |

`src/ui/deepInside/DeepInsideReportView.tsx` is a pure presentation
component with the SAME "snapshot in, HTML out, no algorithm import"
boundary `SavedResultView.tsx` already established (see that file's own
doc comment) — it imports nothing from `src/core/quiz`/`matching`/
`greatness`, only `developmentGuide` (a static lookup, not a computation).

## 3. Reproducibility — a second, sibling snapshot

`DeepInsideReportV1` (`src/core/monetization/deepInsideSnapshot.ts`) is a
**second, independent** Strategy-A immutable snapshot, the same pattern
Phase 10C established for the free `ResultSnapshotV1`: computed once,
frozen forever after, never silently recomputed against a later roster or
algorithm change.

It is NOT an extension of `ResultSnapshotV1` — Deep Inside needs more of
the roster (a 12-person Historical Circle, full per-person breakdowns for
the top 3) than the free snapshot stores, and it may be generated much
LATER than quiz completion (at purchase or first-view time, potentially
after the roster has grown). It therefore embeds its own full
`VersionSnapshot` directly inside the JSONB blob rather than reusing
`user_profiles`'s nine existing `*_version` columns, which record a
different moment in time (quiz completion).

Stored on the SAME `user_profiles` row the free result already occupies
(`deep_report_snapshot jsonb`, `deep_report_generated_at`) — reusing the
existing `(user_id, result_token)` row rather than a new table, since Deep
Inside is generated for a specific saved result that must already exist
(the purchase flow guarantees this — see §5).

`src/lib/monetization/getOrCreateDeepInsideReport.ts` is the one place
`buildDeepInsideReport` is ever called from a real request: if
`deep_report_snapshot` is already populated, it's returned unchanged, full
stop — no recompute path exists anywhere else in the application.
Generation reconstructs the `UserProfile` directly from the FROZEN free
snapshot's per-attribute scores (`reconstructUserProfile.ts`) rather than
re-decoding the quiz token — simpler, and it can only ever reflect what
the free result already, verifiably, showed the user.

## 4. Authentication + purchase flow

Anonymous quiz-taking and the free result are unchanged — no forced
sign-in. The purchase flow reuses the EXISTING Stage 9/10 auth and
pending-result architecture with zero new mechanism:

```
free result (/results, DeepInsideTeaser)
  → click "See Deep Inside" → /deep-inside?r=<token>
  → if signed out: sign-in-required state (GoogleSignInCta, reused as-is
    from app/[locale]/account/GoogleSignInCta.tsx)
  → Google OAuth round-trip (existing OAUTH_NEXT_COOKIE mechanism)
  → back on /deep-inside — PendingResultsSync (existing, unmodified) has
    already saved the free result to user_profiles by this point
  → locked-preview state: section names + value bullets + Buy button
  → DeepInsideCheckoutButton → Stripe Checkout (hosted)
  → success_url → /deep-inside/processing → polls entitlement → redirect
    to /deep-inside, now unlocked
```

No parallel account system, no new OAuth mechanism — `GoogleSignInCta`
and `buildOAuthReturnPath`/`OAUTH_NEXT_COOKIE` are reused verbatim.

## 5. Stripe Checkout architecture

`src/lib/monetization/createCheckoutSession.ts` (DI'd, unit-tested) +
`createCheckoutSessionServer.ts` (real wiring). The client can only ever
request "start a Deep Inside checkout" plus an optional result token —
never a price, amount, or Price ID. The server:

1. Resolves the signed-in user server-side (`auth.getUser()`).
2. Refuses if already entitled (`already_entitled`).
3. Verifies the CONFIGURED `STRIPE_DEEP_INSIDE_PRICE_ID` actually matches
   `DEEP_INSIDE_PRICE` (699 cents, USD) via `stripe.prices.retrieve`
   (`verifyPrice.ts`) — refuses (`price_misconfigured`) rather than ever
   charging an unexpected amount.
4. Creates the Checkout Session itself: `mode: "payment"`, `quantity: 1`,
   `client_reference_id` = user id, `metadata: {userId, productKey,
   resultToken, locale}`, `success_url`/`cancel_url` built from `siteUrl()`
   (never a client-supplied origin).

## 6. Webhook + idempotency

`app/api/stripe/webhook/route.ts` — verifies the signature
(`STRIPE_WEBHOOK_SECRET`) before anything else runs; an unverified payload
is never processed. `src/lib/monetization/handleStripeWebhookEvent.ts`
(DI'd, unit-tested) + `handleStripeWebhookEventServer.ts` (real Supabase
admin-client wiring):

- `checkout.session.completed` / `checkout.session.async_payment_succeeded`:
  validates `metadata.productKey`/`userId` against `client_reference_id`
  and `payment_status === "paid"`, then upserts `purchases`
  (`ON CONFLICT (stripe_checkout_session_id)` — Postgres unique-violation
  on retry is caught and treated as "already processed", not an error),
  then idempotently upserts `user_entitlements`
  (`ON CONFLICT (user_id, entitlement_key) DO UPDATE`), then — ONLY on a
  genuinely NEW purchase row — records `deep_report_purchase_completed`.
  A duplicate delivery re-grants (self-healing, safe) but never
  double-records the funnel event.
- `charge.refunded`: looks up the purchase by `payment_intent`, marks it
  refunded, and revokes the entitlement — but only if that specific
  purchase is still the one currently on record for that entitlement.

The webhook uses the SECRET-KEY admin client (`@lib/supabase/admin.ts`,
new) exclusively — `purchases`/`user_entitlements` have no client-writable
RLS policy at all, so this is the only path that can ever write them.

## 7. Data model

`db/migrations/0005_monetization_v1.sql` (mirrored into `db/schema.sql`):

- **`user_entitlements`** — `user_id`, `entitlement_key`, `status`
  (active/revoked), `granted_at`, `revoked_at`, `source`, `purchase_id`.
  Unique on `(user_id, entitlement_key)`. RLS: select-own only, no
  client-writable policy.
- **`purchases`** — `user_id`, `product_key`, `stripe_checkout_session_id`
  (unique — the idempotency key), `stripe_payment_intent_id`, `amount`,
  `currency`, `status` (pending/completed/refunded), timestamps. No card
  data of any kind. RLS: select-own only, no client-writable policy.
- **`analytics_events`** — REUSED, not new: this table has existed in
  `db/schema.sql` since the original Stage 9A provisioning run but was
  never used by any code path and never had RLS enabled — a real, live
  gap this migration closes as a side effect. RLS now allows INSERT only
  for the three client-observable event names (see §8) —
  `deep_report_purchase_completed` is excluded from that policy and can
  only be written by the webhook's admin client.
- **`user_profiles.deep_report_snapshot`/`deep_report_generated_at`** —
  new nullable columns on the existing table (see §3).

## 8. Analytics funnel

Four allowlisted event names
(`src/lib/monetization/funnelEvents.ts`): `deep_report_result_viewed`,
`deep_report_cta_clicked`, `deep_report_checkout_started` (client-loggable,
via `logDeepInsideFunnelEventAction` → the ordinary RLS-scoped client —
RLS itself also enforces the allowlist, not just application code) and
`deep_report_purchase_completed` (webhook-only, admin client, never
reachable from the client-facing action or RLS policy).

**Funnel query** (run in the Supabase SQL Editor, or via any client
authenticated as the table owner/service role — never through the
publishable key, which the RLS policy correctly denies SELECT to):

```sql
select
  name,
  count(*) as events,
  count(distinct properties->>'resultToken') as distinct_results
from analytics_events
where name like 'deep_report_%'
group by name
order by array_position(
  array['deep_report_result_viewed','deep_report_cta_clicked',
        'deep_report_checkout_started','deep_report_purchase_completed'],
  name
);
```

## 9. Premium gating / security

`/[locale]/deep-inside` is a Server Component. The locked branch NEVER
constructs, fetches, or imports the actual report data —
`getOrCreateDeepInsideReportServer` is only called once
`hasActiveEntitlementServer` has already confirmed an active entitlement.
A locked visitor's HTML/RSC payload genuinely never contains the premium
payload — this is a structural property of Server Components, not CSS
hiding data that's already present.

## 10. Fail-closed / feature safety

`isMonetizationEnabled()` (`src/lib/stripe/env.ts`) requires the explicit
`MONETIZATION_ENABLED=true` flag AND all three Stripe env vars present.
Checked FIRST in every entry point (checkout creation, the webhook route,
the `/deep-inside` page, the Results-page teaser) — missing/incomplete
configuration renders no upsell UI at all and returns a clean typed
"disabled" outcome rather than a broken-looking Buy button or a crash.

## 11. EN/KO

All Deep Inside copy (`deepinside.*` keys, `src/core/i18n/{en,ko}.ts`) has
natural Korean translations, not literal — same discipline as every other
locale block in this project. `translationCoverage("ko-KR") === 1` still
holds (verified — no missing keys).

## 12. Environment variables

See `.env.example`. `MONETIZATION_ENABLED`, `STRIPE_SECRET_KEY`,
`STRIPE_WEBHOOK_SECRET`, `STRIPE_DEEP_INSIDE_PRICE_ID` — plus the
already-existing `SUPABASE_SECRET_KEY` (now has its first real caller: the
webhook's admin client).

## 13. Test-mode procedure (manual gate)

Everything up to a real external round-trip is automated (573+ Vitest,
236+ Playwright, both green — see the session's final report for exact
counts). The one thing that cannot be proven without crossing real
external systems:

1. Set `MONETIZATION_ENABLED=true` + real Stripe **test** keys +
   `STRIPE_DEEP_INSIDE_PRICE_ID` (a test-mode Price) in the deployment.
2. Configure the Stripe webhook endpoint (Dashboard → Developers →
   Webhooks → your `/api/stripe/webhook` URL, events
   `checkout.session.completed`, `checkout.session.async_payment_
   succeeded`, `charge.refunded`) and copy its signing secret into
   `STRIPE_WEBHOOK_SECRET`.
3. Complete the quiz anonymously, sign in, land on `/results`.
4. Click "See Deep Inside" → sign in if prompted → land on the locked
   preview → click "Unlock Deep Inside".
5. Complete Stripe's TEST Checkout (test card `4242 4242 4242 4242`, any
   future expiry/CVC).
6. Confirm the return to `/deep-inside/processing` unlocks automatically
   (or via "Check again").
7. Confirm the Deep Inside report renders with real data.
8. Sign out, sign back in — confirm Deep Inside is still unlocked
   (database-backed, not localStorage).
9. Sign in with a DIFFERENT Google account — confirm Deep Inside is
   LOCKED for that account.
10. Check the Stripe Dashboard (test mode) for the payment record.
11. Check Supabase for the `purchases` and `user_entitlements` rows.

## 14. Production-enablement plan

1. Apply `db/migrations/0005_monetization_v1.sql` against the live
   Supabase project (SQL Editor).
2. Create the real "Deep Inside" Product + one-time USD $6.99 Price in
   Stripe (live mode, once ready for real money).
3. Set the four env vars (§12) in Vercel for Production.
4. Configure the live-mode webhook endpoint + signing secret.
5. Redeploy.
6. Complete the test-mode procedure (§13) once in test mode BEFORE
   flipping to live keys, then repeat the smoke test in live mode with a
   real card if desired.

## 15. Rollback / disable switch

Set `MONETIZATION_ENABLED` to anything other than `true` (or unset it) in
Vercel and redeploy — every entry point fails closed immediately: the
Results teaser stops rendering, `/deep-inside` shows the "not available"
state, checkout-session creation and the webhook both refuse. No code
change, no data loss — existing `purchases`/`user_entitlements` rows are
untouched and become active again the moment the flag is re-enabled.

## 16. Known non-blocking items

- Refund policy language is intentionally non-committal (Terms of
  Service) — a specific refund policy is a business decision not made in
  this session, not fabricated here.
- Stripe Tax is not configured. If tax collection is required for a given
  jurisdiction before accepting real payments, enable Stripe Tax in the
  Stripe Dashboard (Settings → Tax) and pass `automatic_tax: {enabled:
  true}` when creating the Checkout Session — a small, isolated future
  change, not started here (see official Stripe Tax docs before enabling).
- No admin dashboard was built — the funnel query above and Stripe's own
  Dashboard are the inspection tools for v1.
- A rare race (two concurrent first-views of the same never-yet-generated
  report) could compute `buildDeepInsideReport` twice before the first
  write lands; harmless (idempotent overwrite of an equivalent
  computation, not a correctness or security issue), not optimized for
  in v1.
