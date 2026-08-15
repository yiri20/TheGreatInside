/**
 * DELETE-ALL-SAVED-RESULTS — Broader Public Launch, Part 6.
 *
 * Dependency-injected, same pattern and reasoning as `fetchSavedResults.ts`/
 * `saveCompletedResult.ts`: no `server-only` here, so the actual delete
 * call is unit-testable without Next.js/Supabase machinery. The real
 * server-only caller (`deleteSavedResultsServer.ts`) resolves `userId`
 * itself via `auth.getUser()` — this function never accepts a
 * caller-supplied user id, so there is no way to construct a call that
 * deletes a different account's rows than the currently authenticated one.
 *
 * A REAL delete, not a soft-delete via `deleted_at`: `fetchSavedResult.ts`
 * (the single-result detail lookup) does not filter on `deleted_at` at
 * all, so a soft-deleted row would still be fully readable at its known
 * `/account/results/[id]` URL — soft-deleting here would make a "deleted"
 * claim to the user false. `deleted_at` remains available on the schema
 * for a possible future admin/moderation use, unrelated to this feature.
 *
 * RLS (`user_profiles_own`, `for all using (user_id = auth.uid())`) is the
 * authoritative gate — a request against a different user's rows returns
 * zero affected rows, never an error and never someone else's data. The
 * explicit `.eq("user_id", userId)` below is defense-in-depth on top of
 * that, the same pattern `saveCompletedResult.ts` already uses for writes.
 */
export interface DeleteSavedResultsDeps {
  from(table: "user_profiles"): {
    delete(): {
      eq(
        column: string,
        value: string,
      ): PromiseLike<{ error: unknown; count?: number | null }>;
    };
  };
}

export type DeleteSavedResultsOutcome = { ok: true } | { ok: false; reason: "db_error" };

export async function deleteSavedResults(
  deps: DeleteSavedResultsDeps,
  userId: string,
): Promise<DeleteSavedResultsOutcome> {
  const { error } = await deps.from("user_profiles").delete().eq("user_id", userId);
  if (error) return { ok: false, reason: "db_error" };
  return { ok: true };
}
