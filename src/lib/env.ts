/**
 * General app-level environment config — distinct from
 * `src/lib/supabase/env.ts`, which is Supabase-key-specific.
 *
 * `siteUrl()` — the production canonical origin. Needed ONLY where an
 * absolute URL is genuinely required outside a request context (Phase
 * 10A's one concrete case: Next.js's `metadataBase`, which resolves
 * relative OG/canonical URLs at render time and has no request to derive
 * an origin from). Request-scoped code — the OAuth `redirectTo`
 * (`AuthControls.tsx`) and the callback route's redirect origin
 * (`app/auth/callback/route.ts`) — already derives the real origin from
 * `window.location`/`request.url` and must keep doing so: a live request's
 * origin is more precise than one configured value (custom domains, preview
 * deployments, etc.), so this helper is deliberately NOT used there.
 *
 * Resolution order (hardened 2026-08, after a review found the original
 * unconditional `?? "http://localhost:3000"` fallback could silently ship
 * localhost-based metadata from a real production deploy that simply
 * forgot to set one variable):
 *
 * 1. `NEXT_PUBLIC_SITE_URL` — explicit, always wins when set. The one
 *    correct way to pin a custom/branded domain once one exists.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — Vercel's own STABLE alias for this
 *    project's production domain (host only, no protocol — prefixed with
 *    `https://` below). Deliberately NOT `VERCEL_URL`: that variable
 *    changes on every deployment and is also set on PREVIEW deployments,
 *    so using it here would risk a preview's own throwaway URL leaking
 *    into metadata as if it were the permanent canonical origin — exactly
 *    the failure mode this function must avoid.
 *    `VERCEL_PROJECT_PRODUCTION_URL`, by contrast, always resolves to the
 *    real production domain even when read from a preview build (this is
 *    documented Vercel behavior, not an assumption) — so a Vercel deploy
 *    that hasn't had `NEXT_PUBLIC_SITE_URL` configured yet still gets the
 *    CORRECT origin, not a wrong one.
 * 3. Genuine production (`NODE_ENV === "production"`) with neither of the
 *    above set: a loud, impossible-to-miss `console.error`, then the same
 *    localhost fallback as dev. Deliberately NOT a thrown error:
 *    `metadataBase` is evaluated in the root layout, which every page —
 *    including the anonymous-first quiz/results/matching flow — passes
 *    through. Crashing the entire site over a metadata-only concern (OG
 *    images, canonical URLs) would be a wildly disproportionate blast
 *    radius for what is actually just "these will look wrong until
 *    fixed," unlike `supabasePublishableKey()`, whose failure is scoped
 *    to auth-touching code paths only and is correctly allowed to throw.
 * 4. Local dev (`NODE_ENV !== "production"`): silent localhost fallback,
 *    no warning noise — the common, expected case every time `pnpm dev`
 *    runs without a `.env.local` override.
 */
// metadataBase is evaluated once per page during static generation — dozens
// of pages would otherwise repeat the identical warning dozens of times in
// a real build log. Module-level, not a security/correctness concern either
// way (the fallback behavior itself is identical regardless), just noise
// control.
let warnedMissingSiteUrl = false;

export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.NODE_ENV === "production" && !warnedMissingSiteUrl) {
    warnedMissingSiteUrl = true;
    console.error(
      "[env] NEXT_PUBLIC_SITE_URL is not set and no Vercel production URL was found. " +
        "Falling back to http://localhost:3000 for metadataBase — OG/canonical URLs " +
        "will be WRONG in production until NEXT_PUBLIC_SITE_URL is configured.",
    );
  }

  return "http://localhost:3000";
}
