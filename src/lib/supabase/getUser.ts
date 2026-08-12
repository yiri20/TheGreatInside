import "server-only";

/**
 * Resolves the current signed-in user server-side. NOT currently called
 * from the shared `[locale]` layout/header — an earlier Stage 9D draft did
 * exactly that and it forced every statically-generated page (70 person
 * pages, the directory, the quiz) into per-request dynamic rendering,
 * since `cookies()` anywhere in a shared layout's render tree opts the
 * whole route out of static generation. `AuthControls.tsx` resolves
 * sign-in state client-side instead. Kept here, unused for now, as the
 * correct primitive for a genuinely per-request page where dynamic
 * rendering is already the right call regardless — e.g. Stage 9E's
 * account/history page.
 */
import type { User } from "@supabase/supabase-js";
import { createClient } from "./server.js";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}
