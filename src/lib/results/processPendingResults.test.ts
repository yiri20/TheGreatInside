import { describe, expect, it, vi } from "vitest";
import { CURRENT_VERSIONS } from "@core/versions";
import { personDataFingerprint } from "@core/people/dataVersion";
import type { Person } from "@core/types";
import {
  enqueuePendingOwnResult,
  PENDING_OWN_RESULTS_KEY,
  readIncompatibleLegacyResultTokens,
  readIncompatiblePendingResults,
  readPendingOwnResults,
  type PendingResultStorage,
} from "./pendingOwnResults.js";
import { processPendingResults, type AuthCheck, type SaveCompletedResultAction } from "./processPendingResults.js";
import type { SaveCompletedResultOutcome } from "./saveCompletedResult.js";

/** The real pre-Phase-10C provenance shape — see the matching fixture and
 *  comment in pendingOwnResults.test.ts for why this specific shape (not
 *  just "any object missing personDataVersion") is what a genuine legacy
 *  browser entry looks like. */
const LEGACY_SIX_FIELD_PROVENANCE = {
  quizVersion: CURRENT_VERSIONS.quizVersion,
  scoringVersion: CURRENT_VERSIONS.scoringVersion,
  taxonomyVersion: CURRENT_VERSIONS.taxonomyVersion,
  greatnessScoringVersion: CURRENT_VERSIONS.greatnessScoringVersion,
  matchingVersion: CURRENT_VERSIONS.matchingVersion,
  calibrationVersion: CURRENT_VERSIONS.calibrationVersion,
};

const TEST_PEOPLE: Person[] = [
  {
    id: "p_test",
    slug: "p-test",
    canonicalName: "Test Person",
    aliases: [],
    isLiving: false,
    era: "contemporary",
    nationalityCodes: [],
    regionCode: "test",
    occupationIds: [],
    fieldIds: [],
    impactDomains: [],
    tagIds: [],
    archetypeIds: [],
    attributes: [],
    status: "published",
    isMatchEligible: true,
    overallProfileConfidence: 0.9,
    sources: [],
    doNotCopyKeys: [],
  },
];

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

    const processed = await processPendingResults(action, storage, auth);

    expect(action).not.toHaveBeenCalled();
    expect(auth.isSignedIn).not.toHaveBeenCalled();
    expect(processed).toEqual([]);
  });

  it("is a no-op when signed out, leaving the queue untouched", async () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", TEST_PEOPLE, storage);
    const action = vi.fn<SaveCompletedResultAction>();

    const processed = await processPendingResults(action, storage, signedIn(false));

    expect(action).not.toHaveBeenCalled();
    expect(readPendingOwnResults(storage)).toHaveLength(1);
    expect(processed).toEqual([]);
  });

  it("saves each queued entry and clears it on success", async () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", TEST_PEOPLE, storage);
    enqueuePendingOwnResult("quiz_v2.b", TEST_PEOPLE, storage);
    const action: SaveCompletedResultAction = async () => ({ ok: true });

    const processed = await processPendingResults(action, storage, signedIn(true));

    expect(readPendingOwnResults(storage)).toEqual([]);
    expect(processed).toHaveLength(2);
    expect(processed.every((p) => p.outcome.ok)).toBe(true);
  });

  it("passes the entry's own snapshotted provenance AND person-data version through to the action unchanged", async () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", TEST_PEOPLE, storage);
    const received: unknown[] = [];
    const action: SaveCompletedResultAction = async (input) => {
      received.push(input);
      return { ok: true };
    };

    await processPendingResults(action, storage, signedIn(true));

    expect(received).toEqual([
      expect.objectContaining({
        resultToken: "quiz_v2.a",
        provenance: CURRENT_VERSIONS,
        personDataVersion: personDataFingerprint(TEST_PEOPLE),
      }),
    ]);
  });

  it.each([
    "invalid_token",
    "noncanonical_token",
    "incomplete_token",
    "unknown_version_provenance",
    "version_mismatch",
    "invalid_completed_at",
  ] as const)("clears the entry on a permanent (malformed-input) failure (%s) rather than retrying forever", async (reason) => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", TEST_PEOPLE, storage);
    const action: SaveCompletedResultAction = async () => ({ ok: false, reason });

    const processed = await processPendingResults(action, storage, signedIn(true));

    expect(readPendingOwnResults(storage)).toEqual([]);
    expect(readIncompatiblePendingResults(storage)).toEqual([]); // never quarantined — genuinely malformed, nothing worth preserving
    expect(processed).toEqual([{ resultToken: "quiz_v2.a", outcome: { ok: false, reason } }]);
  });

  it("provenance_drift is NOT in the generic permanent-failure clear path — it is quarantined instead (see the dedicated describe block below)", async () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", TEST_PEOPLE, storage);
    const action: SaveCompletedResultAction = async () => ({ ok: false, reason: "provenance_drift" });

    await processPendingResults(action, storage, signedIn(true));

    // NOT simply deleted...
    expect(readPendingOwnResults(storage)).toEqual([]);
    // ...moved into quarantine instead.
    expect(readIncompatiblePendingResults(storage)).toHaveLength(1);
  });

  it.each(["unauthenticated", "db_error"] as const)(
    "leaves the entry queued on a transient failure (%s) for a later retry",
    async (reason) => {
      const storage = fakeStorage();
      enqueuePendingOwnResult("quiz_v2.a", TEST_PEOPLE, storage);
      const action: SaveCompletedResultAction = async () => ({ ok: false, reason } as SaveCompletedResultOutcome);

      await processPendingResults(action, storage, signedIn(true));

      expect(readPendingOwnResults(storage)).toHaveLength(1);
    },
  );

  it("processes every queued entry independently — one permanent failure doesn't block clearing the others", async () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.good", TEST_PEOPLE, storage);
    enqueuePendingOwnResult("quiz_v2.bad", TEST_PEOPLE, storage);
    const action: SaveCompletedResultAction = async (input) =>
      input.resultToken === "quiz_v2.bad" ? { ok: false, reason: "invalid_token" } : { ok: true };

    await processPendingResults(action, storage, signedIn(true));

    expect(readPendingOwnResults(storage)).toEqual([]);
  });

  it("a transient failure on one entry doesn't stop later entries from being processed", async () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.first", TEST_PEOPLE, storage);
    enqueuePendingOwnResult("quiz_v2.second", TEST_PEOPLE, storage);
    const action: SaveCompletedResultAction = async (input) =>
      input.resultToken === "quiz_v2.first" ? { ok: false, reason: "db_error" } : { ok: true };

    await processPendingResults(action, storage, signedIn(true));

    const remaining = readPendingOwnResults(storage).map((e) => e.resultToken);
    expect(remaining).toEqual(["quiz_v2.first"]);
  });

  describe("Phase 10C: pre-existing legacy entries (missing personDataVersion)", () => {
    function storageWithLegacyEntry(resultToken = "quiz_v2.legacy"): PendingResultStorage {
      const storage = fakeStorage();
      storage.setItem(
        PENDING_OWN_RESULTS_KEY,
        JSON.stringify([{ resultToken, completedAt: "2026-08-10T00:00:00.000Z", provenance: LEGACY_SIX_FIELD_PROVENANCE }]),
      );
      return storage;
    }

    it("does not crash, and does not call action, for a legacy entry — it cannot be safely evaluated for drift", async () => {
      const storage = storageWithLegacyEntry();
      const action = vi.fn<SaveCompletedResultAction>();

      await expect(processPendingResults(action, storage, signedIn(true))).resolves.not.toThrow();
      expect(action).not.toHaveBeenCalled();
    });

    it("QUARANTINES (never deletes) the legacy entry, and reports it via the returned outcome list — never silently vanishes without a trace", async () => {
      const storage = storageWithLegacyEntry();
      const action = vi.fn<SaveCompletedResultAction>();

      const processed = await processPendingResults(action, storage, signedIn(true));

      // Gone from the active queue's legacy list...
      expect(readIncompatibleLegacyResultTokens(storage)).toEqual([]);
      // ...but NOT gone — fully preserved in the quarantine store, tagged
      // with the reason discriminator so a future recovery UI can tell
      // this apart from a current-format drift entry.
      expect(readIncompatiblePendingResults(storage)).toEqual([
        {
          resultToken: "quiz_v2.legacy",
          completedAt: "2026-08-10T00:00:00.000Z",
          provenance: LEGACY_SIX_FIELD_PROVENANCE,
          reason: "legacy_format",
        },
      ]);
      expect(processed).toEqual([
        { resultToken: "quiz_v2.legacy", outcome: { ok: false, reason: "provenance_drift", detail: expect.any(String) } },
      ]);
    });

    it("is never reported as a success, and is never sent to the save action at all", async () => {
      const storage = storageWithLegacyEntry();
      const action = vi.fn<SaveCompletedResultAction>();

      const processed = await processPendingResults(action, storage, signedIn(true));

      expect(action).not.toHaveBeenCalled();
      expect(processed.every((p) => !p.outcome.ok)).toBe(true);
    });

    it("does NOT get repeatedly reported/reprocessed on a second run — it was already moved out of the active queue on the first", async () => {
      const storage = storageWithLegacyEntry();
      const action = vi.fn<SaveCompletedResultAction>();

      const firstRun = await processPendingResults(action, storage, signedIn(true));
      const secondRun = await processPendingResults(action, storage, signedIn(true));

      expect(firstRun).toHaveLength(1);
      expect(secondRun).toEqual([]); // nothing left in the active queue to find
      expect(action).not.toHaveBeenCalled();
      // Still there, untouched, in quarantine — the second run didn't lose it either.
      expect(readIncompatiblePendingResults(storage)).toHaveLength(1);
    });

    it("leaves a legacy entry untouched (still in the active queue, not yet quarantined) while signed out — never mutates the queue anonymously", async () => {
      const storage = storageWithLegacyEntry();
      const processed = await processPendingResults(vi.fn<SaveCompletedResultAction>(), storage, signedIn(false));

      expect(processed).toEqual([]);
      expect(readIncompatibleLegacyResultTokens(storage)).toEqual(["quiz_v2.legacy"]);
      expect(readIncompatiblePendingResults(storage)).toEqual([]); // not yet moved anywhere
    });

    it("processes a legacy entry and a current-shape entry in the same run, independently — the compatible entry still only clears after a confirmed successful save", async () => {
      const storage = storageWithLegacyEntry();
      enqueuePendingOwnResult("quiz_v2.current", TEST_PEOPLE, storage);
      const action: SaveCompletedResultAction = async () => ({ ok: true });

      const processed = await processPendingResults(action, storage, signedIn(true));

      const byToken = new Map(processed.map((p) => [p.resultToken, p.outcome]));
      expect(byToken.get("quiz_v2.legacy")).toEqual({ ok: false, reason: "provenance_drift", detail: expect.any(String) });
      expect(byToken.get("quiz_v2.current")).toEqual({ ok: true });
      expect(readPendingOwnResults(storage)).toEqual([]); // the current-shape entry cleared — a real save succeeded
      expect(readIncompatibleLegacyResultTokens(storage)).toEqual([]); // the legacy entry left the active queue...
      expect(readIncompatiblePendingResults(storage)).toHaveLength(1); // ...but only into quarantine, not oblivion
    });

    it("no legacy token is ever lost across the full active-queue <-> quarantine read/write cycle", async () => {
      const storage = storageWithLegacyEntry("quiz_v2.precious");
      await processPendingResults(vi.fn<SaveCompletedResultAction>(), storage, signedIn(true));
      const allKnownTokens = [
        ...readPendingOwnResults(storage).map((e) => e.resultToken),
        ...readIncompatibleLegacyResultTokens(storage),
        ...readIncompatiblePendingResults(storage).map((e) => e.resultToken),
      ];
      expect(allKnownTokens).toContain("quiz_v2.precious");
    });

    it("the queue being non-empty via ONLY a legacy entry (no current-shape entries) still triggers processing once signed in", async () => {
      const storage = storageWithLegacyEntry();
      expect(readPendingOwnResults(storage)).toEqual([]); // current-shape queue looks empty
      const processed = await processPendingResults(vi.fn<SaveCompletedResultAction>(), storage, signedIn(true));
      expect(processed).toHaveLength(1); // but the legacy entry was still found and handled
    });
  });

  describe("Phase 10C (third review): current-format provenance_drift — quarantined, never deleted", () => {
    it("a real, well-formed entry the server rejects as drifted is preserved (not deleted) via the SAME quarantine architecture as legacy entries", async () => {
      const storage = fakeStorage();
      enqueuePendingOwnResult("quiz_v2.drifted", TEST_PEOPLE, storage);
      const enqueuedEntry = readPendingOwnResults(storage)[0]!;
      const action: SaveCompletedResultAction = async () => ({ ok: false, reason: "provenance_drift" });

      const processed = await processPendingResults(action, storage, signedIn(true));

      expect(readPendingOwnResults(storage)).toEqual([]); // left the active queue...
      expect(readIncompatiblePendingResults(storage)).toEqual([
        {
          resultToken: "quiz_v2.drifted",
          completedAt: enqueuedEntry.completedAt,
          provenance: enqueuedEntry.provenance,
          personDataVersion: enqueuedEntry.personDataVersion,
          reason: "provenance_drift",
        },
      ]);
      expect(processed).toEqual([{ resultToken: "quiz_v2.drifted", outcome: { ok: false, reason: "provenance_drift" } }]);
    });

    it("is not inserted into user_profiles as a newly computed snapshot — the action is called (a real save attempt), but its ok:false outcome is what triggers quarantine, never a second silent write", async () => {
      const storage = fakeStorage();
      enqueuePendingOwnResult("quiz_v2.drifted", TEST_PEOPLE, storage);
      let callCount = 0;
      const action: SaveCompletedResultAction = async () => {
        callCount++;
        return { ok: false, reason: "provenance_drift" };
      };

      await processPendingResults(action, storage, signedIn(true));

      expect(callCount).toBe(1); // attempted exactly once, never retried into a second write attempt
    });

    it("is never reported as success", async () => {
      const storage = fakeStorage();
      enqueuePendingOwnResult("quiz_v2.drifted", TEST_PEOPLE, storage);
      const action: SaveCompletedResultAction = async () => ({ ok: false, reason: "provenance_drift" });

      const processed = await processPendingResults(action, storage, signedIn(true));

      expect(processed[0]!.outcome.ok).toBe(false);
    });

    it("does not get repeatedly retried against the save action on every subsequent run", async () => {
      const storage = fakeStorage();
      enqueuePendingOwnResult("quiz_v2.drifted", TEST_PEOPLE, storage);
      let callCount = 0;
      const action: SaveCompletedResultAction = async () => {
        callCount++;
        return { ok: false, reason: "provenance_drift" };
      };

      await processPendingResults(action, storage, signedIn(true));
      await processPendingResults(action, storage, signedIn(true));
      await processPendingResults(action, storage, signedIn(true));

      expect(callCount).toBe(1); // only the first run ever found it in the active queue
    });

    it("legacy_format and provenance_drift quarantine entries coexist safely in the same store, distinguishable by reason", async () => {
      const storage = fakeStorage();
      storage.setItem(
        PENDING_OWN_RESULTS_KEY,
        JSON.stringify([{ resultToken: "quiz_v2.legacy", completedAt: "2026-08-10T00:00:00.000Z", provenance: LEGACY_SIX_FIELD_PROVENANCE }]),
      );
      enqueuePendingOwnResult("quiz_v2.drifted", TEST_PEOPLE, storage);
      const action: SaveCompletedResultAction = async (input) =>
        input.resultToken === "quiz_v2.drifted" ? { ok: false, reason: "provenance_drift" } : { ok: false, reason: "invalid_token" };

      await processPendingResults(action, storage, signedIn(true));

      const quarantined = readIncompatiblePendingResults(storage);
      expect(quarantined).toHaveLength(2);
      expect(quarantined.find((e) => e.resultToken === "quiz_v2.legacy")?.reason).toBe("legacy_format");
      expect(quarantined.find((e) => e.resultToken === "quiz_v2.drifted")?.reason).toBe("provenance_drift");
    });

    it("a transient db_error remains retryable — NOT quarantined, stays in the active queue", async () => {
      const storage = fakeStorage();
      enqueuePendingOwnResult("quiz_v2.transient", TEST_PEOPLE, storage);
      const action: SaveCompletedResultAction = async () => ({ ok: false, reason: "db_error" });

      await processPendingResults(action, storage, signedIn(true));

      expect(readPendingOwnResults(storage)).toHaveLength(1); // still active, will be retried later
      expect(readIncompatiblePendingResults(storage)).toEqual([]); // never quarantined
    });

    it("a compatible entry among several still clears normally on a confirmed successful save, unaffected by a co-occurring drifted entry", async () => {
      const storage = fakeStorage();
      enqueuePendingOwnResult("quiz_v2.good", TEST_PEOPLE, storage);
      enqueuePendingOwnResult("quiz_v2.drifted", TEST_PEOPLE, storage);
      const action: SaveCompletedResultAction = async (input) =>
        input.resultToken === "quiz_v2.drifted" ? { ok: false, reason: "provenance_drift" } : { ok: true };

      await processPendingResults(action, storage, signedIn(true));

      expect(readPendingOwnResults(storage)).toEqual([]); // both left the active queue...
      expect(readIncompatiblePendingResults(storage)).toHaveLength(1); // ...but only the drifted one is in quarantine
      expect(readIncompatiblePendingResults(storage)[0]!.resultToken).toBe("quiz_v2.drifted");
    });
  });
});
