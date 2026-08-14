import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@lib/supabase/middleware";
import { LOCALE_COOKIE_NAME, resolveEntryLocale } from "@lib/localeNegotiation";

/**
 * POST-10D STAGE A, item 6. Bare `/` language negotiation, scoped ONLY to
 * the exact `/` pathname — every other route (including every already-
 * localized `/en-US/*`/`/ko-KR/*` URL) falls through unchanged to the
 * pre-existing session-refresh call below, so a user who explicitly
 * visited a localized URL is never redirected away from it by this logic.
 * `resolveEntryLocale` is pure (see `localeNegotiation.ts`) and only reads
 * the `tgi_locale` cookie + `Accept-Language` header — no IP/geolocation
 * input. The query string is preserved on redirect so a link like
 * `/?ref=...` doesn't silently drop its parameters.
 *
 * No redirect-loop risk: the target is always `/${locale}`, never `/`
 * again, and `/en-US`/`/ko-KR` are excluded from this branch entirely.
 */
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const locale = resolveEntryLocale({
      cookieValue: request.cookies.get(LOCALE_COOKIE_NAME)?.value,
      acceptLanguageHeader: request.headers.get("accept-language"),
    });
    const target = new URL(`/${locale}`, request.url);
    target.search = request.nextUrl.search;
    return NextResponse.redirect(target);
  }
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match every request except static assets, Next internals, and
     * /auth/callback — a session-refresh check on every page load, not a
     * route gate (see src/lib/supabase/middleware.ts for why this never
     * redirects). /auth/callback excluded after a live human OAuth test
     * failed (2026-08): it builds and reads its own session state entirely
     * within the route handler during the exact PKCE code exchange, and
     * running an unrelated getUser() call from the proxy first, on that
     * specific request, was a plausible contributing factor removed
     * defensively — matches the general "the proxy doesn't need to run on
     * routes that don't need a fresh session for THEIR OWN rendering"
     * principle Supabase's own docs use to justify excluding routes from
     * this matcher in the first place.
     */
    "/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
