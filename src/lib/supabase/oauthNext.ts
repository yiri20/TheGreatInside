/**
 * Shared cookie name for the OAuth "return to this path after sign-in"
 * value — a single source of truth so the writer (AuthControls.tsx) and
 * reader (app/auth/callback/route.ts) can never drift apart. Framework-
 * agnostic (no "use client"/"server-only") so both a client component and
 * a Route Handler can import it cleanly.
 */
export const OAUTH_NEXT_COOKIE = "tgi_oauth_next";
