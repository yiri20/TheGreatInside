# Production deployment — Phase 10A

Operational runbook, not an architecture record — see `CLAUDE.md` for the
"why." This file only covers deploying the existing, Phase-9-complete app.
No secrets or credential values below — names and structure only.

**Domain migration (2026-08 — see CLAUDE.md's "Domain Migration" section
for the full record):** the product owner purchased `thegreatinside.com`,
superseding the 2026-08 "launch on the Vercel URL, defer a domain"
decision recorded in CLAUDE.md's "Broader Public Launch Finish Line" §9
(that decision's own standing instruction named exactly this trigger —
"the product owner brings it up again" — as the only thing that would
reopen it). **`https://thegreatinside.com` is now the official public
origin.** Vercel's project-domain UI has been configured so that
`thegreatinside.com` serves production, `www.thegreatinside.com`
permanently redirects to it, and the former
`the-great-inside.vercel.app` production hostname also permanently
redirects to it. See "Site URL resolution" below for the one remaining
required step (`NEXT_PUBLIC_SITE_URL`) and §3 for the Supabase/Google
manual steps this migration still needs.

## 1. Required environment variables (names only)

See `.env.example` for the same list with usage notes. Set these in
Vercel's Project → Settings → Environment Variables, not in a committed
file.

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Project Settings → API Keys |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | Same page — current 2026 key model, not the legacy `anon` key |
| `SUPABASE_SECRET_KEY` | Required for Monetization v1 | Now has its first real caller (2026-08): the Stripe webhook's admin client (`@lib/supabase/admin.ts`), which writes `purchases`/`user_entitlements` — tables with no client-writable RLS policy at all. Server-only. Never expose to the browser. |
| `MONETIZATION_ENABLED` | Required to enable Deep Inside | Literal string `"true"` — any other value (including unset) fails closed. See §5 below. |
| `STRIPE_SECRET_KEY` | Required to enable Deep Inside | Stripe Dashboard → Developers → API keys. Use a **test** key (`sk_test_...`) until ready to accept real payments. |
| `STRIPE_WEBHOOK_SECRET` | Required to enable Deep Inside | Stripe → Developers → Webhooks → your endpoint → Signing secret (`whsec_...`). |
| `STRIPE_DEEP_INSIDE_PRICE_ID` | Required to enable Deep Inside | The one-time USD $6.99 Price's id (`price_...`), not the Product id. Verified server-side against the expected amount/currency before every Checkout Session (`src/lib/stripe/verifyPrice.ts`). |
| `NEXT_PUBLIC_SITE_URL` | **Required** (2026-08 domain migration) | Production value: `https://thegreatinside.com`, no trailing slash. Feeds every canonical/hreflang/sitemap/OG/share URL (`siteUrl()`, `src/lib/env.ts`). Confirmed live (2026-08) that leaving this unset makes `siteUrl()` fall through to `VERCEL_PROJECT_PRODUCTION_URL`, which still resolves to the OLD `the-great-inside.vercel.app` hostname even with a custom domain attached in the Vercel UI — so, unlike before the domain migration, this variable is no longer optional. OAuth redirect URLs are unaffected either way — derived from the live request/browser origin, not this variable. See "Site URL resolution" below. |

### Site URL resolution (hardened 2026-08)

`siteUrl()` (`src/lib/env.ts`) no longer unconditionally falls back to
`localhost` — that could silently ship localhost-based metadata from a
real production deploy that simply forgot to set one variable. Resolution
order:

1. `NEXT_PUBLIC_SITE_URL`, if set — always wins. The correct way to pin a
   custom/branded domain once one exists.
2. Vercel's own `VERCEL_PROJECT_PRODUCTION_URL` system variable (available
   automatically on Vercel, no setup needed) — Vercel's **stable** alias
   for this project's real production domain. Deliberately not
   `VERCEL_URL`, which changes per deployment and also covers *preview*
   deployments — using that here would risk a preview's own throwaway URL
   leaking into metadata as the "permanent" canonical origin.
3. Only in a genuine production runtime with neither of the above set: a
   loud `console.error` in the server logs, then the same `localhost`
   fallback used in dev. Deliberately not a thrown error — `metadataBase`
   is evaluated in the root layout every page passes through, including
   the anonymous-first quiz/results flow; crashing the whole site over a
   metadata-only concern (OG/canonical URLs looking wrong) would be
   disproportionate.
4. Local dev: silent `localhost` fallback, no warning noise.

**Practical effect, corrected 2026-08**: step 2's fallback covers the
case where NO custom domain is attached yet (a bare `*.vercel.app`
deploy). Once a custom domain is attached in the Vercel UI, this
fallback does **not** automatically pick it up — confirmed live
(2026-08): with `thegreatinside.com` already configured as the project's
production domain in Vercel's UI, but `NEXT_PUBLIC_SITE_URL` unset, the
deployed site's own canonical/OG tags still resolved to
`https://the-great-inside.vercel.app`. So `NEXT_PUBLIC_SITE_URL` must be
set explicitly for a custom domain to actually become the canonical
origin — it is not purely a "recommended once you have a domain" nicety,
it is the one step that makes the domain real to the app.

**Follow-up, same session**: after the domain-migration commits were
pushed and deployed, a re-check confirmed canonical/hreflang/OG/sitemap/
robots all correctly resolve to `https://thegreatinside.com` in
production. It's not confirmed from this repository whether that's
because `NEXT_PUBLIC_SITE_URL` was set directly, or because
`VERCEL_PROJECT_PRODUCTION_URL` began resolving to the custom domain on
its own after some propagation time — either way, the practical
resolution is now correct.

## 2. Vercel setup

The app needs no `vercel.json` — it's a standard Next.js App Router
project (dynamic routes, Route Handlers, Server Actions, `proxy.ts`
middleware), and Vercel auto-detects all of this. `pnpm-lock.yaml` is
present, so Vercel will use pnpm automatically; the build command it runs
is whatever's in `package.json` (`next build --webpack` — the `--webpack`
flag is required, see `CLAUDE.md`'s "Stack" section for why Turbopack
doesn't work for this project yet).

**Recommended next decision (corrected 2026-08 — this is not a hard
technical blocker, see below)**: this repository is not yet a git
repository (confirmed — `git status` reports "not a git repository").
Git is not a technical prerequisite for every possible Vercel deployment
path — the Vercel CLI can deploy directly from a local directory with no
git involved at all. For this project's intended ongoing workflow,
though, Git/GitHub integration is **strongly recommended**, not merely
convenient: it's what actually provides normal source history, Vercel's
deploy-on-push + PR preview integration, and a real rollback path — none
of which the CLI-only route gives you. The recommended next decision,
not performed in this session:

1. Initialize the project as a Git repository.
2. Create/connect a GitHub repository — preferably starting **private**.
3. Connect that repository to Vercel.

Steps once that decision is made:
1. Connect the repository to a new Vercel project (or run `vercel` via the
   CLI for a directory-based deploy).
2. Set the four environment variables above in the Vercel project's
   settings, for the Production environment (and Preview, if you want
   preview deployments to also exercise auth).
3. Deploy. A first deploy can go to the automatically-assigned
   `*.vercel.app` URL for technical smoke testing — see §4 — before any
   custom domain or OAuth production config is touched.

## 3. Google/Supabase OAuth — what actually needs to change for production

**One precise, non-obvious point**: Google's own "Authorized redirect URI"
(point A in `docs/phase9-provisional-checkpoint.md`'s two-callback
distinction) points at Supabase's own fixed callback
(`https://<project-ref>.supabase.co/auth/v1/callback`) — this does **not**
change between local dev and production, since it's Supabase's URL, not
yours. Only Supabase's own "Redirect URLs" allow-list (governing this
app's `/auth/callback`) needs a new entry.

### A. Required for technical OAuth to work in production

- **Supabase Dashboard → Authentication → URL Configuration** (2026-08
  domain migration — not yet done from this repository, needs a manual
  dashboard action): set Site URL to `https://thegreatinside.com`; add
  `https://thegreatinside.com/auth/callback` to Redirect URLs. Keep the
  existing `https://the-great-inside.vercel.app/auth/callback` and
  `localhost:3000` entries in place for now rather than removing them —
  the old Vercel hostname now permanently redirects to the new domain at
  the HTTP layer, but a stale Redirect URL entry is harmless to leave
  during migration and removing it early has no upside.
- **Google Cloud Console**: no change needed to the Authorized redirect
  URI (see above). "Authorized JavaScript origins" is **not required** for
  this integration specifically — that setting matters for Google's
  client-side JS SDK (Sign-In button/One Tap), which this app doesn't use;
  the app redirects the full page to Supabase's `/authorize` endpoint
  instead.
- **Vercel**: the four env vars from §1 set for the Production
  environment.

This alone is sufficient for OAuth to fully work in production.

**Corrected 2026-08, verified directly against current official Google
documentation (`support.google.com/cloud/answer/15549945`, "Manage App
Audience"), not assumed from the general "Testing status" rules.** Google's
docs state the general Testing-status behavior (100-manually-added-test-user
cap, an unverified-app warning shown to those users, and authorizations
expiring 7 days after consent) and then carve out an explicit exception:

> "The only exception to this behavior is if your app requests a subset of
> the following: name, email address, and user profile (through the
> `userinfo.email`, `userinfo.profile`, `openid` scopes or their OpenID
> Connect equivalents)... For such requests, your users do not need to be
> in the trusted user list, they will not see a warning message, and their
> authorizations will not expire after 7 days. If your app uses Sign in
> with Google to authenticate users then this exception also applies."

**This app's OAuth call requests exactly that scope set** (`openid`,
`email`, `profile` — see the OAuth scope audit above and `CLAUDE.md`'s
Stage 10A record: no `scopes` option is set on `signInWithOAuth`, and the
app never reads anything beyond `user.id`). Consequently, for this exact
configuration:

- Users do **not** need to be manually added as test users — the
  100-user cap does not gate real usage.
- No "Google hasn't verified this app" warning is shown to signed-in
  users.
- Authorizations do not expire after 7 days.

This holds whether the Google Cloud Console project's publishing status is
"Testing" or "In production" — the exception is keyed to the scope set,
not the publishing status. Separately, per Google's own verification-FAQ
docs (`support.google.com/cloud/answer/13463073`), an app that requests
only non-sensitive scopes is **not required to complete Google's
app-verification process at all** to function for arbitrary Google
accounts; publishing to "In production" without completing verification
is explicitly supported by Google for this scope tier. **What genuinely
cannot be determined from this repository is the actual current
publishing status of the Google Cloud Console project itself** (Testing
vs. In production, and whether any test users have been manually added) —
that lives in a dashboard this codebase has no visibility into, and is not
guessed here. If it is currently "Testing" with a small test-user list,
the exception above means that list simply isn't a practical constraint
for this scope set — not that switching to "In production" is required
before a limited beta.

### B. Google brand verification — relevant for a broader, polished production launch; NOT required for a limited public beta with this scope set (see "Public Beta Finish Line" in `CLAUDE.md`)

Per §A above, this app's identity-only scope set already means no
"unverified app" warning is shown to any user, regardless of brand
verification status — so this section is not about removing a warning
that exists today. What brand verification actually gates, per Google's
own docs (`support.google.com/cloud/answer/15549049`, "Manage OAuth App
Branding"): whether the app's **name and logo** are displayed on the
consent screen (an unbranded/unreviewed app can still authenticate users
correctly; it just shows a plainer consent screen). Relevant for a
broader, polished production launch, not a functional blocker for a
limited beta:

- A **Privacy Policy** — hosted, linked from the OAuth consent screen
  config in Google Cloud Console, and (per Google's current published
  requirements) on the same domain as the app. Confirmed via Google's own
  docs. **Not drafted here** — needs your real business/contact/
  jurisdiction facts, which I won't invent.
- App name + logo review, and confirming ownership of the domain used, as
  part of Google's brand-verification flow.
- **This project's OAuth scopes are `openid`/`email`/`profile` only** (see
  the OAuth scope audit) — Google's own documentation states apps using
  only these "non-sensitive" scopes are **not** required to complete the
  heavier sensitive/restricted-scope security-assessment verification, and
  per §A above, are not required to complete ANY verification tier just to
  function. Brand verification (privacy policy + domain/name review) is a
  lighter, optional-for-functionality tier that only affects whether the
  app's name/logo display on the consent screen.
- Terms of Service: recommended as good practice, but not a confirmed
  Google requirement at this scope tier — don't conflate the two.

### C. Optional/recommended polish

- Consent-screen branding (logo), a homepage link, a visible support
  contact.

### D. Google Search Console (2026-08 domain migration — not yet done)

The existing `GOOGLE_SITE_VERIFICATION` HTML meta tag (`src/lib/seo.ts`)
is rendered on every page regardless of domain, but Search Console
verification is tied to a specific **property**, not to the tag alone.
The token currently in code was obtained for a property on the old
`the-great-inside.vercel.app` hostname; it does not automatically extend
to `thegreatinside.com`. Manual step, not done from this repository:
verify a new property for `thegreatinside.com` in Google Search Console
(a **Domain property**, verified via a DNS TXT record, is recommended
over a URL-prefix property — it covers the apex domain, `www`, and both
protocols in one verification, matching this project's `www` → apex
redirect), then submit `https://thegreatinside.com/sitemap.xml`. Leaving
the old property in place afterward is harmless.

## 4. Smoke-test sequence after deploying

1. Load the deployed URL (the real domain, `https://thegreatinside.com`,
   or `*.vercel.app` during migration), both locales (`/en-US`, `/ko-KR`)
   — confirm the landing page renders with no console errors.
2. Confirm the header shows "Sign in" (signed-out state resolves
   correctly against the real Supabase project).
3. Complete the quiz anonymously through to `/results` — confirm a result
   token renders correctly.
4. Confirm `/en-US/people`, a person detail page, and `/en-US/compare/
   [slug]?r=<token>` all render.
5. **Only after §3 (Supabase/Google dashboard updates) is done for this
   specific domain**: sign in with Google, confirm the callback returns to
   the correct page/locale, the header flips to Account/Sign out, and — if
   testing a fresh account — a `user_profiles` row appears with the
   correct `completed_at`.
6. Refresh the page — session should persist. Sign out, sign back in —
   should still be exactly one `user_profiles` row for that result token
   (dedup).

Steps 1–4 can be smoke-tested on a bare `*.vercel.app` URL with zero
Google/Supabase dashboard changes (they only need the env vars from §1).
Step 5 onward requires the domain actually being deployed to first be
added to Supabase's Redirect URLs (§3A) — expect it to fail with the same
symptoms documented in `docs/phase9-provisional-checkpoint.md`'s Stage 9D
record until that's done, which is expected, not a regression.

## 5. Monetization v1 (Deep Inside) — Stripe setup

Full architecture/design record: `docs/monetization-v1.md`. This section
is only the external, manual setup steps — nothing here is done from this
repository.

**Supabase:**
1. Apply `db/migrations/0005_monetization_v1.sql` in the SQL Editor
   (creates `user_entitlements`/`purchases`, enables RLS on the
   previously-unprotected `analytics_events`, adds
   `user_profiles.deep_report_snapshot`).

**Stripe (test mode first — see `docs/monetization-v1.md` §13 for the
full manual test procedure):**
1. Create a "Deep Inside" Product.
2. Add a one-time Price: USD, $6.99 (699 cents), not recurring. Copy its
   Price id (`price_...`).
3. Developers → API keys → copy the (test) secret key (`sk_test_...`).
4. Developers → Webhooks → Add endpoint → `https://<your-domain>/api/
   stripe/webhook` → select events `checkout.session.completed`,
   `checkout.session.async_payment_succeeded`, `charge.refunded` → copy
   the signing secret (`whsec_...`).

**Vercel:**
1. Set `MONETIZATION_ENABLED=true`, `STRIPE_SECRET_KEY`,
   `STRIPE_WEBHOOK_SECRET`, `STRIPE_DEEP_INSIDE_PRICE_ID` for the
   Production environment (and Preview, if you want preview deployments
   to exercise checkout against Stripe test mode too).
2. Redeploy.

**Going live**: repeat the Stripe steps in **live mode** (a separate
Product/Price/webhook endpoint/secret key from test mode — Stripe keeps
test and live completely separate), swap the four env vars to the live
values, redeploy. Disable at any time by unsetting `MONETIZATION_ENABLED`
(or setting it to anything other than `"true"`) and redeploying — every
entry point fails closed immediately, no data loss.
