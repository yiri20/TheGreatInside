import "server-only";

/**
 * Server Supabase client — for Server Components and Route Handlers. Must be
 * created fresh per request (never module-level singleton), per the
 * @supabase/ssr docs: a shared client would leak one request's cookies into
 * another's response.
 *
 * `setAll` is wrapped in try/catch: a Server Component render can call this
 * (e.g. to read the session) but cannot itself write response cookies —
 * only Route Handlers and Server Actions can. Session-refresh cookie writes
 * from a Server Component context are safely dropped here because
 * `middleware.ts` is the component actually responsible for keeping the
 * session cookie fresh on every request (see supabase/middleware.ts) — this
 * catch is not silently swallowing an error middleware doesn't cover.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabasePublishableKey, supabaseUrl } from "./env";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl(), supabasePublishableKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component render — see module doc above.
        }
      },
    },
  });
}
