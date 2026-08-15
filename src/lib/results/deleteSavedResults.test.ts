import { describe, expect, it, vi } from "vitest";
import { deleteSavedResults, type DeleteSavedResultsDeps } from "./deleteSavedResults.js";

function depsCapturing(error: unknown = null) {
  const eq = vi.fn(async () => ({ error }));
  const del = vi.fn(() => ({ eq }));
  const from = vi.fn(() => ({ delete: del }));
  return { deps: { from } as unknown as DeleteSavedResultsDeps, from, del, eq };
}

describe("deleteSavedResults", () => {
  it("scopes the delete to the given user id via .eq(\"user_id\", userId) — defense in depth on top of RLS", async () => {
    const { deps, from, del, eq } = depsCapturing();
    const outcome = await deleteSavedResults(deps, "user-123");
    expect(outcome).toEqual({ ok: true });
    expect(from).toHaveBeenCalledWith("user_profiles");
    expect(del).toHaveBeenCalled();
    expect(eq).toHaveBeenCalledWith("user_id", "user-123");
  });

  it("surfaces a DB error without throwing", async () => {
    const { deps } = depsCapturing({ message: "boom" });
    const outcome = await deleteSavedResults(deps, "user-123");
    expect(outcome).toEqual({ ok: false, reason: "db_error" });
  });

  it("never accepts a caller-supplied user id beyond the one explicit parameter — no hidden second id source", async () => {
    // Structural check: the function signature itself is (deps, userId) —
    // there is no options object or second implicit source of identity it
    // could read from instead. This test exists so a future edit that adds
    // an alternate id source (e.g. reading a header or query param) would
    // have to consciously change this test, not slip in silently.
    expect(deleteSavedResults.length).toBe(2);
  });
});
