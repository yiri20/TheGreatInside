/**
 * SINGLE SAVED-RESULT QUERY + PARSE — Phase 10C.
 *
 * Dependency-injected, same reason and pattern as `fetchSavedResults.ts`/
 * `saveCompletedResult.ts`. This is also where the "ownership" property is
 * actually meaningful to unit-test: this function has NO id-vs-user check
 * of its own anywhere in it — it trusts whatever `.eq("id", id)` returns
 * from the injected client entirely. Against the real, RLS-protected
 * `user_profiles` table, a row belonging to a different user is filtered
 * out at the DATABASE layer before this function ever sees it, so
 * `data === null` is indistinguishable between "no such id" and "exists,
 * but isn't yours" — exactly the deliberate non-leak property. A test
 * simulating "RLS already filtered this out" (a mock that returns
 * `data: null` for a mismatched id) proves this function has no bypass or
 * fallback path that could defeat that, without needing a live Postgres
 * instance to exercise the RLS policy itself.
 *
 * `parseResultSnapshot` (strict, never-trust-arbitrary-JSONB validator) is
 * the ONLY thing standing between raw database content and a typed
 * `ResultSnapshotV1` — this function calls nothing from
 * `src/core/quiz`/`matching`/`greatness`/`interpretation`, by design.
 */
import { parseResultSnapshot, type ResultSnapshotV1 } from "@core/results/snapshot";

export type FetchSavedResultOutcome =
  | { status: "not_found" }
  | { status: "unavailable" }
  | { status: "ok"; snapshot: ResultSnapshotV1 };

export interface FetchSavedResultDeps {
  from(table: "user_profiles"): {
    select(columns: string): {
      eq(
        column: string,
        value: string,
      ): {
        maybeSingle(): PromiseLike<{
          data: { id: string; result_snapshot: unknown } | null;
          error: unknown;
        }>;
      };
    };
  };
}

export async function fetchSavedResult(deps: FetchSavedResultDeps, id: string): Promise<FetchSavedResultOutcome> {
  const { data } = await deps.from("user_profiles").select("id, result_snapshot").eq("id", id).maybeSingle();
  if (!data) return { status: "not_found" };

  const snapshot = data.result_snapshot ? parseResultSnapshot(data.result_snapshot) : undefined;
  if (!snapshot) return { status: "unavailable" };

  return { status: "ok", snapshot };
}
