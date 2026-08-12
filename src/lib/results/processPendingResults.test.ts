import { describe, expect, it, vi } from "vitest";
import { CURRENT_VERSIONS } from "@core/versions";
import { enqueuePendingOwnResult, readPendingOwnResults, type PendingResultStorage } from "./pendingOwnResults.js";
import { processPendingResults, type AuthCheck, type SaveCompletedResultAction } from "./processPendingResults.js";
import type { SaveCompletedResultOutcome } from "./saveCompletedResult.js";

function fakeStorage(): PendingResultStorage {
  const store = new Map<string, string>();
  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => void store.set(key, value),
    removeItem: (key) => void store.delete(key),
  };
}

function signedIn(value: boolean): AuthCheck {
  return { isSignedIn: async () => value };
}

describe("processPendingResults", () => {
  it("is a no-op when the queue is empty (never calls the action or checks auth)", async () => {
    const storage = fakeStorage();
    const action = vi.fn<SaveCompletedResultAction>();
    const auth = { isSignedIn: vi.fn(async () => true) };

    await processPendingResults(action, storage, auth);

    expect(action).not.toHaveBeenCalled();
    expect(auth.isSignedIn).not.toHaveBeenCalled();
  });

  it("is a no-op when signed out, leaving the queue untouched", async () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", storage);
    const action = vi.fn<SaveCompletedResultAction>();

    await processPendingResults(action, storage, signedIn(false));

    expect(action).not.toHaveBeenCalled();
    expect(readPendingOwnResults(storage)).toHaveLength(1);
  });

  it("saves each queued entry and clears it on success", async () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", storage);
    enqueuePendingOwnResult("quiz_v2.b", storage);
    const action: SaveCompletedResultAction = async () => ({ ok: true });

    await processPendingResults(action, storage, signedIn(true));

    expect(readPendingOwnResults(storage)).toEqual([]);
  });

  it("passes the entry's own snapshotted provenance through to the action unchanged", async () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", storage);
    const received: unknown[] = [];
    const action: SaveCompletedResultAction = async (input) => {
      received.push(input);
      return { ok: true };
    };

    await processPendingResults(action, storage, signedIn(true));

    expect(received).toEqual([
      expect.objectContaining({ resultToken: "quiz_v2.a", provenance: CURRENT_VERSIONS }),
    ]);
  });

  it.each([
    "invalid_token",
    "noncanonical_token",
    "incomplete_token",
    "unknown_version_provenance",
    "version_mismatch",
    "invalid_completed_at",
  ] as const)("clears the entry on a permanent failure (%s) rather than retrying forever", async (reason) => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", storage);
    const action: SaveCompletedResultAction = async () => ({ ok: false, reason });

    await processPendingResults(action, storage, signedIn(true));

    expect(readPendingOwnResults(storage)).toEqual([]);
  });

  it.each(["unauthenticated", "db_error"] as const)(
    "leaves the entry queued on a transient failure (%s) for a later retry",
    async (reason) => {
      const storage = fakeStorage();
      enqueuePendingOwnResult("quiz_v2.a", storage);
      const action: SaveCompletedResultAction = async () => ({ ok: false, reason } as SaveCompletedResultOutcome);

      await processPendingResults(action, storage, signedIn(true));

      expect(readPendingOwnResults(storage)).toHaveLength(1);
    },
  );

  it("processes every queued entry independently — one permanent failure doesn't block clearing the others", async () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.good", storage);
    enqueuePendingOwnResult("quiz_v2.bad", storage);
    const action: SaveCompletedResultAction = async (input) =>
      input.resultToken === "quiz_v2.bad" ? { ok: false, reason: "invalid_token" } : { ok: true };

    await processPendingResults(action, storage, signedIn(true));

    expect(readPendingOwnResults(storage)).toEqual([]);
  });

  it("a transient failure on one entry doesn't stop later entries from being processed", async () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.first", storage);
    enqueuePendingOwnResult("quiz_v2.second", storage);
    const action: SaveCompletedResultAction = async (input) =>
      input.resultToken === "quiz_v2.first" ? { ok: false, reason: "db_error" } : { ok: true };

    await processPendingResults(action, storage, signedIn(true));

    const remaining = readPendingOwnResults(storage).map((e) => e.resultToken);
    expect(remaining).toEqual(["quiz_v2.first"]);
  });
});
