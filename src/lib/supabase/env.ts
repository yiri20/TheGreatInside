/**
 * Reads the current 2026 Supabase key-model env vars, per
 * docs/phase9-provisional-checkpoint.md — publishable/secret, not the
 * legacy anon/service_role names. Throws with an actionable message rather
 * than letting `createClient` fail later with an opaque "Invalid URL" or
 * "Invalid API key" error.
 */
export function supabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set — see .env.local");
  return url;
}

export function supabasePublishableKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!key) throw new Error("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not set — see .env.local");
  return key;
}

/**
 * The secret (service-role-equivalent) key — bypasses RLS entirely.
 * Monetization v1 is the first real caller (`@lib/supabase/admin.ts`,
 * used exclusively by the Stripe webhook handler to write `purchases`/
 * `user_entitlements`, which deliberately have no client-writable RLS
 * policy at all — see db/migrations/0005_monetization_v1.sql). Never
 * imported by anything reachable from the browser; every call site using
 * this must itself be `server-only`-guarded.
 */
export function supabaseSecretKey(): string {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) throw new Error("SUPABASE_SECRET_KEY is not set — see .env.local");
  return key;
}
