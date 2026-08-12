import { describe, expect, it } from "vitest";
import { CURRENT_VERSIONS } from "@core/versions";
import {
  clearPendingOwnResult,
  enqueuePendingOwnResult,
  PENDING_OWN_RESULTS_KEY,
  readPendingOwnResults,
  type PendingResultStorage,
} from "./pendingOwnResults.js";

/** Minimal in-memory stand-in for window.localStorage — lets these tests
 *  run under Vitest's Node environment (no jsdom needed). */
function fakeStorage(initial?: Record<string, string>): PendingResultStorage {
  const store = new Map(Object.entries(initial ?? {}));
  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => void store.set(key, value),
    removeItem: (key) => void store.delete(key),
  };
}

describe("pending own-completion queue", () => {
  it("returns an empty array when nothing is stored", () => {
    expect(readPendingOwnResults(fakeStorage())).toEqual([]);
  });

  it("does not crash on malformed stored JSON", () => {
    const storage = fakeStorage({ [PENDING_OWN_RESULTS_KEY]: "not json {{{" });
    expect(() => readPendingOwnResults(storage)).not.toThrow();
    expect(readPendingOwnResults(storage)).toEqual([]);
  });

  it("ignores malformed entries within an otherwise-valid array rather than rejecting the whole queue", () => {
    const valid = { resultToken: "quiz_v2.1234", completedAt: "2026-08-01T00:00:00.000Z", provenance: CURRENT_VERSIONS };
    const storage = fakeStorage({
      [PENDING_OWN_RESULTS_KEY]: JSON.stringify([
        valid,
        { resultToken: "missing-completedAt-and-provenance" },
        { resultToken: "quiz_v2.5678", completedAt: "not-checked-here", provenance: { quizVersion: "quiz_v2" } }, // provenance shape incomplete
        null,
        "not an object",
      ]),
    });
    expect(readPendingOwnResults(storage)).toEqual([valid]);
  });

  it("enqueue stores a valid completion, snapshotting CURRENT_VERSIONS", () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.abcd", storage);
    const queue = readPendingOwnResults(storage);
    expect(queue).toHaveLength(1);
    expect(queue[0]!.resultToken).toBe("quiz_v2.abcd");
    expect(typeof queue[0]!.completedAt).toBe("string");
    expect(queue[0]!.provenance).toEqual(CURRENT_VERSIONS);
  });

  it("a duplicate resultToken does not grow the queue", () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.same", storage);
    enqueuePendingOwnResult("quiz_v2.same", storage);
    enqueuePendingOwnResult("quiz_v2.same", storage);
    expect(readPendingOwnResults(storage)).toHaveLength(1);
  });

  it("caps the queue at 5 entries", () => {
    const storage = fakeStorage();
    for (let i = 0; i < 8; i++) enqueuePendingOwnResult(`quiz_v2.token${i}`, storage);
    expect(readPendingOwnResults(storage)).toHaveLength(5);
  });

  it("drops the oldest entry first on overflow, keeping the most recent ones", () => {
    const storage = fakeStorage();
    for (let i = 0; i < 8; i++) enqueuePendingOwnResult(`quiz_v2.token${i}`, storage);
    const tokens = readPendingOwnResults(storage).map((e) => e.resultToken);
    expect(tokens).not.toContain("quiz_v2.token0");
    expect(tokens).not.toContain("quiz_v2.token2");
    expect(tokens).toEqual(["quiz_v2.token3", "quiz_v2.token4", "quiz_v2.token5", "quiz_v2.token6", "quiz_v2.token7"]);
  });

  it("clearPendingOwnResult removes only the matching token, leaving unrelated entries untouched", () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", storage);
    enqueuePendingOwnResult("quiz_v2.b", storage);
    enqueuePendingOwnResult("quiz_v2.c", storage);

    clearPendingOwnResult("quiz_v2.b", storage);

    const tokens = readPendingOwnResults(storage).map((e) => e.resultToken);
    expect(tokens).toEqual(["quiz_v2.a", "quiz_v2.c"]);
  });

  it("clearing a token that isn't in the queue is a no-op", () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", storage);
    clearPendingOwnResult("quiz_v2.not-present", storage);
    expect(readPendingOwnResults(storage).map((e) => e.resultToken)).toEqual(["quiz_v2.a"]);
  });

  it("gracefully no-ops without a storage backend (e.g. server-side import)", () => {
    expect(() => enqueuePendingOwnResult("quiz_v2.x", undefined)).not.toThrow();
    expect(readPendingOwnResults(undefined)).toEqual([]);
    expect(() => clearPendingOwnResult("quiz_v2.x", undefined)).not.toThrow();
  });
});
