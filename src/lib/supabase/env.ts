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
