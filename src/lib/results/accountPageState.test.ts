import { describe, expect, it } from "vitest";
import { resolveAccountPageState } from "./accountPageState.js";

describe("resolveAccountPageState", () => {
  it("account route while unauthenticated: signed_out, regardless of row count", () => {
    expect(resolveAccountPageState(false, 0)).toEqual({ kind: "signed_out" });
    expect(resolveAccountPageState(false, 5)).toEqual({ kind: "signed_out" });
  });

  it("authenticated with no saved results: empty, not signed_out", () => {
    expect(resolveAccountPageState(true, 0)).toEqual({ kind: "empty" });
  });

  it("authenticated with saved results: list", () => {
    expect(resolveAccountPageState(true, 2)).toEqual({ kind: "list" });
  });
});
