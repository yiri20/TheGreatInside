"use client";

/**
 * Browser Supabase client — used from client components (e.g. the sign-in
 * button that calls `signInWithOAuth`). `createBrowserClient` handles
 * cookie read/write itself; no custom cookie methods needed.
 */
import { createBrowserClient } from "@supabase/ssr";
import { supabasePublishableKey, supabaseUrl } from "./env";

export function createClient() {
  return createBrowserClient(supabaseUrl(), supabasePublishableKey());
}
