import "server-only";

/**
 * The real, server-only entry point the delete-account-data Server Action
 * calls — constructs the cookie-bound Supabase server client (the same
 * publishable-key client every other authenticated read/write in this
 * project uses; no `SUPABASE_SECRET_KEY`/service-role client is
 * introduced by this feature) and resolves the current user itself via
 * `auth.getUser()`, exactly like `saveCompletedResult.ts` — never trusts
 * a client-supplied user id. Not unit-tested directly (the `server-only`
 * import makes that impossible under Vitest's Node environment by
 * design) — no logic of its own beyond wiring the real client and the
 * real signed-in user into the already-tested `deleteSavedResults`.
 */
import { createClient } from "@lib/supabase/server";
import { deleteSavedResults, type DeleteSavedResultsOutcome } from "./deleteSavedResults.js";

export async function deleteSavedResultsServerAction(): Promise<DeleteSavedResultsOutcome> {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getUser();
  const userId = data.user?.id;
  if (authError || !userId) return { ok: false, reason: "db_error" };
  return deleteSavedResults(supabase as unknown as Parameters<typeof deleteSavedResults>[0], userId);
}
