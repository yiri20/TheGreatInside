import { describe, expect, it } from "vitest";
import { fetchSavedResults, type FetchSavedResultsDeps } from "./fetchSavedResults.js";

function depsReturning(
  rows: { id: string; completed_at: string; result_snapshot: unknown }[] | null,
): FetchSavedResultsDeps {
  return {
    from: () => ({
      select: () => ({
        is: () => ({
          order: async () => ({ data: rows, error: null }),
        }),
      }),
    }),
  };
}

describe("fetchSavedResults", () => {
  it("maps rows to summaries, marking snapshot availability without exposing the raw snapshot content", async () => {
    const rows = await fetchSavedResults(
      depsReturning([
        { id: "a", completed_at: "2026-08-01T00:00:00.000Z", result_snapshot: { some: "json" } },
        { id: "b", completed_at: "2026-08-02T00:00:00.000Z", result_snapshot: null },
      ]),
    );
    expect(rows).toEqual([
      { id: "a", completedAt: "2026-08-01T00:00:00.000Z", hasSnapshot: true },
      { id: "b", completedAt: "2026-08-02T00:00:00.000Z", hasSnapshot: false },
    ]);
  });

  it("has NO id/user filtering logic of its own — trusts the injected client entirely, exactly the same as fetchSavedResult.ts", async () => {
    // This function's query construction never adds a user_id predicate;
    // ownership scoping is 100% the `user_profiles_own` RLS policy's job.
    // A client that (correctly, under RLS) returns zero rows for a signed-in
    // user with no saved results must produce an empty list, not an error
    // or a fabricated row.
    expect(await fetchSavedResults(depsReturning([]))).toEqual([]);
  });

  it("returns an empty list rather than throwing when the query returns null data", async () => {
    expect(await fetchSavedResults(depsReturning(null))).toEqual([]);
  });
});
