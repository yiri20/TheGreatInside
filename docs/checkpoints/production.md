# Production / deployment checkpoint

Compact current status. For the deployment procedure (env vars, Vercel
setup, OAuth config, smoke tests), see
[`docs/deployment.md`](../deployment.md) — this file is state, not
procedure. For the full historical build-out (Phase 9 accounts, Phase 10
visual/SEO/sharing work, the domain migration story), see
`docs/archive/completed-phases/` — only needed for historical "why"
questions, not routine deployment work.

## Current facts

- **Canonical origin**: `https://thegreatinside.com`. `www` and the
  legacy `the-great-inside.vercel.app` both permanently (308) redirect
  to the apex, path/query preserved.
- **Hosting**: Vercel, auto-deploy from `main` on GitHub
  (`github.com/yiri20/TheGreatInside`, private). Last release gate:
  2026-08-27, `main` at `b7a30ec` (Person Profile Hero redesign, Profile
  V2 pilot on 6 people, Key Achievements Correction Batch 1 on 10
  people plus an Atatürk provenance fix, mobile Trait Constellation
  progressive disclosure — see `docs/context/CURRENT_STATE.md`'s branch
  table for the full commit list), full automated (tsc/vitest/build/
  Playwright 281/281) + live production verification passed (Landing
  EN/KO, full quiz run to Results, Directory, 5 named person profiles +
  mobile, all editorial section types, zero console errors/overflow),
  no monetization, portraits untouched this release.
- **Auth**: Google OAuth via Supabase Auth (`@supabase/ssr`), identity-only
  scopes (`openid`/`email`/`profile`) — this app's own code never reads
  email/name/picture, only `user.id`. This scope set qualifies for
  Google's identity-only exception: no test-user cap, no unverified-app
  warning, no 7-day expiry, regardless of Cloud Console publishing status.
- **Database**: Supabase Postgres. The only table any application code
  reads/writes is `user_profiles` (RLS-protected, owner-scoped). Several
  other tables exist in `db/schema.sql` with RLS already defined but are
  dormant — never referenced by any code path.
- **What's stored per saved result**: `user_id`, `result_token`,
  `completed_at`, ten version-string columns, and an immutable
  `result_snapshot` (frozen numbers/person-ids only — never biography or
  freeform text). See `docs/reference/matching.md` for why the snapshot
  is immutable (historical result fidelity).
- **Legal pages**: `/privacy` and `/terms` exist, both locales, both
  indexed. Contact: `thegreatinside.web@gmail.com`.
- **"Delete all saved results"** exists (`/account`) — a real, immediate
  hard delete, RLS-scoped to the current session. Full account/identity
  deletion (removing the `auth.users` row) is **not** implemented — a
  deliberate, not-yet-made decision (would require introducing a
  service-role secret); currently a manual email-requested process.
- **SEO**: `robots.txt`, `sitemap.xml` (indexable pages only — Results/
  Compare/Account/Saved-Result are `noindex`), canonical + hreflang on
  every indexed page. Bare `/` does browser-language locale negotiation;
  every other route is locale-explicit.
- **Sharing/OG**: one Share control (Web Share → clipboard fallback) each
  on Results/Compare/Person. A generic OG image + a Person-specific OG
  image exist. **Dynamic per-token Results/Compare OG is explicitly
  deferred** — not built, a real future decision.
- **Monetization**: not live anywhere in production. See
  [`CURRENT_STATE.md`](../context/CURRENT_STATE.md).

## Known non-blocking gaps (recorded, not scheduled)

- Google OAuth brand verification (name/logo on consent screen) — not
  required for current scope to function, only for a polished look.
- Google Search Console property for the new domain — manual step, not
  yet confirmed done from this repository.
- Analytics, ads/monetization activation, portraits pipeline completion,
  dataset scaling beyond current roster, dynamic Results/Compare OG,
  web app manifest, custom 404 — all explicitly out of scope until their
  own fresh decision.

## Next recommended step

None scheduled — Phase 10 and the domain migration are both closed. The
next production-facing decision is external (traction-driven), per
CLAUDE.md's "Broader Public Launch Finish Line" §9 standing instruction:
do not re-propose anything here without the product owner raising it.
