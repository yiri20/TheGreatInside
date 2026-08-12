/**
 * Session-refresh helper called from the project-root `proxy.ts` (Next.js
 * 16's renamed `middleware.ts` file convention), per the @supabase/ssr docs'
 * explicit warning: Server Components cannot write response cookies, so
 * without something calling this on every request, a refreshed auth token
 * has nowhere to be written back to and the session silently degrades
 * (random logouts, early session termination). This is the one
 * client-creation site NOT explicitly named in
 * docs/phase9-provisional-checkpoint.md's Stage 9B plan ("browser client and
 * the server client") — it's the same @supabase/ssr integration, not a scope
 * addition, and the library's own type docs treat omitting it as a
 * correctness bug, not an optional enhancement.
 *
 * Deliberately does NOT gate any route — the anonymous-first invariant
 * (quiz, results, person pages, comparison all stay usable signed out)
 * means this helper's only job is keeping a session cookie fresh when one
 * exists, never redirecting an unauthenticated visitor.
 */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabasePublishableKey, supabaseUrl } from "./env";

export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl(), supabasePublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Triggers a token refresh (and the setAll write-back above) when needed.
  // Per the checkpoint's anonymous-first invariant, the result is never used
  // to gate access here — only to keep an existing session current.
  await supabase.auth.getUser();

  return response;
}
