import { describe, expect, it } from "vitest";
import { saveStateForResult } from "./saveStateForResult.js";

describe("saveStateForResult", () => {
  it("signed-out CTA: shows signed_out regardless of pending/outcome state", () => {
    expect(saveStateForResult(false, false, undefined)).toBe("signed_out");
    expect(saveStateForResult(false, true, { ok: true })).toBe("signed_out");
  });

  it("signed-in, this browser's own completion, save succeeded: saved", () => {
    expect(saveStateForResult(true, true, { ok: true })).toBe("saved");
  });

  it("signed-in, this browser's own completion, save failed for any reason: neutral, never a false 'saved' claim", () => {
    expect(saveStateForResult(true, true, { ok: false, reason: "db_error" })).toBe("neutral");
    expect(saveStateForResult(true, true, { ok: false, reason: "provenance_drift" })).toBe("neutral");
    expect(saveStateForResult(true, true, undefined)).toBe("neutral");
  });

  it("signed-in but this token was never this browser's own pending completion (e.g. viewing a shared link): neutral, never claims saved from mere absence", () => {
    expect(saveStateForResult(true, false, undefined)).toBe("neutral");
    // Even a fabricated/mismatched "ok: true" outcome must not flip this —
    // wasPending=false means we never actually attempted a save for this
    // exact result, so there is nothing to have "succeeded".
    expect(saveStateForResult(true, false, { ok: true })).toBe("neutral");
  });
});
