import type { NextRequest } from "next/server";
import { updateSession } from "@lib/supabase/middleware";

export async function proxy(request: NextRequest) {
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
