/**
 * Shared cookie name for the OAuth "return to this path after sign-in"
 * value — a single source of truth so the writer (AuthControls.tsx) and
 * reader (app/auth/callback/route.ts) can never drift apart. Framework-
 * agnostic (no "use client"/"server-only") so both a client component and
 * a Route Handler can import it cleanly.
 */
export const OAUTH_NEXT_COOKIE = "tgi_oauth_next";

/**
 * The exact value written into `OAUTH_NEXT_COOKIE` before redirecting to
 * Google — a pure, DOM-free extraction of the one line `AuthControls.tsx`
 * and `SignInCta.tsx` (Phase 10C) both need identically, so it has a single
 * tested definition instead of two independently-typed-out copies. Preserves
 * locale (baked into `pathname`, e.g. `/ko-KR/results`) and the full current
 * query string (e.g. `?r=...`) through the OAuth round-trip.
 */
export function buildOAuthReturnPath(pathname: string, search: string): string {
  return `${pathname}${search}`;
}
