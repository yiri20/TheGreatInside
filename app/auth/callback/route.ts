/**
 * The app's own OAuth callback route — point (B) in
 * docs/phase9-provisional-checkpoint.md's two-callback distinction, distinct
 * from Google's Supabase-side redirect URI (A). Supabase redirects the
 * browser here with a PKCE `code` after (A) already exchanged the code with
 * Google and created the Supabase-side session grant; this route's only job
 * is turning that `code` into a cookie-based session via
 * `exchangeCodeForSession`.
 *
 * Fixed after a live human OAuth test failed (2026-08): the return path
 * used to travel as a `?next=` query parameter on the `redirectTo` URL
 * passed to `signInWithOAuth`. Supabase's Redirect URLs allow-list is
 * documented to reject a `redirect_to` carrying extra query parameters
 * unless the allow-listed entry uses a wildcard, falling back to the Site
 * URL when validation fails — which, through this app's own root redirect,
 * silently landed on `/en-US` with no session, exactly matching the
 * observed failure. The return path now travels via a short-lived,
 * first-party cookie instead (`OAUTH_NEXT_COOKIE`, set by
 * `AuthControls.tsx` right before `signInWithOAuth`) — `redirectTo` itself
 * is now the bare, exactly-allow-listed `${origin}/auth/callback`, with no
 * dependency on Supabase's query-parameter leniency.
 *
 * Also fixed: no failure path here is silent anymore. A safe diagnostic is
 * logged server-side, and a non-sensitive reason code travels back to the
 * client via `?auth_error=<reason>` on the ORIGINAL next path (not always
 * `/`), so a failed sign-in from `/ko-KR/results?r=…` returns there with
 * its locale and query intact, not to the English home page.
 *
 * SECURITY (2026-08, corrected after a live test): the provider's
 * `error_description` query param — and, less obviously, an `AuthError`'s
 * free-text `.message` — were logged verbatim in an earlier draft. Directly
 * observed: Supabase's `error_description` can embed part or all of
 * Google's own external authorization code. Neither is read/logged here
 * anymore — only the short, fixed-vocabulary `error`/`error_code` params
 * and an `AuthError`'s structured `.name`/`.status`/`.code` fields (never
 * `.message`) are safe to log, because they come from a closed set of
 * machine-readable values, not free text that can echo back request
 * material. Never log: provider authorization codes, access/refresh
 * tokens, client secrets, the Supabase secret key, or any raw
 * provider-supplied free-text error description.
 */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@lib/supabase/server";
import { OAUTH_NEXT_COOKIE } from "@lib/supabase/oauthNext";

/** Only ever a same-origin relative path — never follows a value that
 *  could redirect off this site (open-redirect guard). Applied the same
 *  way regardless of whether the raw value came from a cookie or (in the
 *  past) a query param. */
function safeNextPath(next: string | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

function withAuthError(origin: string, path: string, reason: string): string {
  const url = new URL(path, origin);
  url.searchParams.set("auth_error", reason);
  return url.toString();
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // OAuth providers/Supabase redirect here with `error`/`error_code` (and
  // an `error_description`) instead of `code` when the provider step
  // itself failed (e.g. consent denied) — this must surface too, not just
  // a missing code. `error_description` is deliberately never read: it is
  // free text that has been directly observed to embed part or all of the
  // provider's own authorization code. `error`/`error_code` are short,
  // fixed-vocabulary values (e.g. "access_denied") and safe to log.
  const providerErrorCode = searchParams.get("error_code") ?? searchParams.get("error");

  const cookieStore = await cookies();
  const rawNext = cookieStore.get(OAUTH_NEXT_COOKIE)?.value;
  const next = safeNextPath(rawNext ? decodeURIComponent(rawNext) : undefined);

  function redirectAndClear(url: string): NextResponse {
    const response = NextResponse.redirect(url);
    response.cookies.delete(OAUTH_NEXT_COOKIE);
    return response;
  }

  if (providerErrorCode) {
    console.error("[auth/callback] provider/Supabase returned an error before code exchange:", {
      error: providerErrorCode,
      reason: "provider_error",
    });
    return redirectAndClear(withAuthError(origin, next, "provider_error"));
  }

  if (!code) {
    console.error("[auth/callback] no `code` param present on the callback request.", { reason: "missing_code" });
    return redirectAndClear(withAuthError(origin, next, "missing_code"));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    // Only structured, fixed-vocabulary fields — never `.message`, which is
    // free text and not guaranteed safe the same way `error_description`
    // turned out not to be.
    console.error("[auth/callback] exchangeCodeForSession failed:", {
      name: error.name,
      status: error.status,
      code: error.code,
      reason: "exchange_failed",
    });
    return redirectAndClear(withAuthError(origin, next, "exchange_failed"));
  }

  return redirectAndClear(`${origin}${next}`);
}
