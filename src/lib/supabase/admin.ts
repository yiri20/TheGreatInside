import "server-only";

/**
 * Service-role-equivalent Supabase client — bypasses RLS entirely. Used
 * ONLY by the Stripe webhook handler (`app/api/stripe/webhook/route.ts`)
 * to write `purchases`/`user_entitlements`, which have no client-writable
 * RLS policy at all by design (see db/migrations/0005_monetization_v1.sql).
 *
 * Deliberately the plain `@supabase/supabase-js` client, not `@supabase/
 * ssr`'s cookie-bound one: a webhook request comes from Stripe's own
 * servers, carries no user session/cookies, and must not attempt to read
 * or write any. A fresh client per call (no module-level singleton) matches
 * this project's existing `@lib/supabase/server.ts` convention.
 */
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabaseSecretKey, supabaseUrl } from "./env";

export function createAdminClient() {
  return createSupabaseClient(supabaseUrl(), supabaseSecretKey(), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
