/**
 * SAVED-RESULTS LIST QUERY — Phase 10C.
 *
 * Dependency-injected (same reason as `saveCompletedResult.ts`): no
 * `next/headers`/`server-only` here, so the actual query-shaping logic is
 * unit-testable without Next.js/Supabase machinery. The real, server-only
 * caller is `app/[locale]/account/page.tsx` itself, which constructs the
 * cookie-bound Supabase client and passes it straight through — ownership
 * scoping is entirely the `user_profiles_own` RLS policy's job, never
 * re-implemented or double-checked here; this function trusts whatever
 * rows the client returns.
 */
export interface SavedResultSummary {
  id: string;
  completedAt: string;
  hasSnapshot: boolean;
}

export interface FetchSavedResultsDeps {
  from(table: "user_profiles"): {
    select(columns: string): {
      is(
        column: string,
        value: null,
      ): {
        order(
          column: string,
          options: { ascending: boolean },
        ): PromiseLike<{
          data: { id: string; completed_at: string; result_snapshot: unknown }[] | null;
          error: unknown;
        }>;
      };
    };
  };
}

export async function fetchSavedResults(deps: FetchSavedResultsDeps): Promise<SavedResultSummary[]> {
  const { data } = await deps
    .from("user_profiles")
    .select("id, completed_at, result_snapshot")
    .is("deleted_at", null)
    .order("completed_at", { ascending: false });

  return (data ?? []).map((row) => ({
    id: row.id,
    completedAt: row.completed_at,
    hasSnapshot: row.result_snapshot != null,
  }));
}
