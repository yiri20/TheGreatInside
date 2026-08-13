import { describe, expect, it } from "vitest";
import { CURRENT_VERSIONS } from "@core/versions";
import { personDataFingerprint } from "@core/people/dataVersion";
import type { Person } from "@core/types";
import {
  clearPendingOwnResult,
  dismissIncompatiblePendingResult,
  enqueuePendingOwnResult,
  INCOMPATIBLE_PENDING_RESULTS_KEY,
  PENDING_OWN_RESULTS_KEY,
  quarantineDriftedPendingResult,
  quarantineIncompatiblePendingResult,
  readIncompatibleLegacyResultTokens,
  readIncompatiblePendingResults,
  readPendingOwnResults,
  type PendingResultStorage,
} from "./pendingOwnResults.js";

/** The REAL pre-Phase-10C provenance shape — 6 fields, no
 *  referenceVersion/dispersionVersion/archetypesVersion/interpretationVersion.
 *  This is what `CURRENT_VERSIONS` looked like before this deploy; a real
 *  browser that completed the quiz on the currently-live production app
 *  would have written exactly this shape (no personDataVersion field at
 *  all on the entry either — the whole entry predates it). */
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

function legacyEntry(resultToken = "quiz_v2.legacy") {
  return { resultToken, completedAt: "2026-08-10T00:00:00.000Z", provenance: LEGACY_SIX_FIELD_PROVENANCE };
}
/** What `legacyEntry()` looks like once quarantined — tagged with the
 *  `reason` discriminator the quarantine store adds. */
function quarantinedLegacyEntry(resultToken = "quiz_v2.legacy") {
  return { ...legacyEntry(resultToken), reason: "legacy_format" as const };
}

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
    const valid = {
      resultToken: "quiz_v2.1234",
      completedAt: "2026-08-01T00:00:00.000Z",
      provenance: CURRENT_VERSIONS,
      personDataVersion: personDataFingerprint(TEST_PEOPLE),
    };
    const storage = fakeStorage({
      [PENDING_OWN_RESULTS_KEY]: JSON.stringify([
        valid,
        { resultToken: "missing-completedAt-and-provenance" },
        { resultToken: "quiz_v2.5678", completedAt: "not-checked-here", provenance: { quizVersion: "quiz_v2" } }, // provenance shape incomplete
        // A hypothetical, unrealistic combination (full current-shape
        // provenance but no personDataVersion) — cannot occur from a real
        // historical app version (the two were added in the same deploy),
        // so it is neither a valid current entry nor a recognizable legacy
        // one; correctly treated as garbage, same as before this hardening.
        { resultToken: "quiz_v2.impossible", completedAt: "2026-01-01T00:00:00.000Z", provenance: CURRENT_VERSIONS },
        null,
        "not an object",
      ]),
    });
    expect(readPendingOwnResults(storage)).toEqual([valid]);
  });

  describe("Phase 10C: pre-existing legacy entries (missing personDataVersion)", () => {
    it("a REAL pre-Phase-10C entry (6-field provenance, no personDataVersion at all) is excluded from readPendingOwnResults, but not silently discarded — it's surfaced via readIncompatibleLegacyResultTokens", () => {
      const legacy = {
        resultToken: "quiz_v2.legacy",
        completedAt: "2026-08-10T00:00:00.000Z",
        provenance: LEGACY_SIX_FIELD_PROVENANCE,
      };
      const storage = fakeStorage({ [PENDING_OWN_RESULTS_KEY]: JSON.stringify([legacy]) });

      expect(readPendingOwnResults(storage)).toEqual([]);
      expect(readIncompatibleLegacyResultTokens(storage)).toEqual(["quiz_v2.legacy"]);
    });

    it("a legacy entry survives round-tripping through enqueue/clear of an UNRELATED current-shape token — no silent erasure as a side effect", () => {
      const legacy = {
        resultToken: "quiz_v2.legacy",
        completedAt: "2026-08-10T00:00:00.000Z",
        provenance: LEGACY_SIX_FIELD_PROVENANCE,
      };
      const storage = fakeStorage({ [PENDING_OWN_RESULTS_KEY]: JSON.stringify([legacy]) });

      // Both operations read-modify-write the stored array; neither names
      // "quiz_v2.legacy", so it must still be there afterward.
      enqueuePendingOwnResult("quiz_v2.new", TEST_PEOPLE, storage);
      expect(readIncompatibleLegacyResultTokens(storage)).toEqual(["quiz_v2.legacy"]);

      clearPendingOwnResult("quiz_v2.new", storage);
      expect(readIncompatibleLegacyResultTokens(storage)).toEqual(["quiz_v2.legacy"]);
    });

    it("current-shape and legacy entries coexist correctly in the same stored queue", () => {
      const legacy = {
        resultToken: "quiz_v2.legacy",
        completedAt: "2026-08-10T00:00:00.000Z",
        provenance: LEGACY_SIX_FIELD_PROVENANCE,
      };
      const storage = fakeStorage({ [PENDING_OWN_RESULTS_KEY]: JSON.stringify([legacy]) });
      enqueuePendingOwnResult("quiz_v2.new", TEST_PEOPLE, storage);

      expect(readPendingOwnResults(storage).map((e) => e.resultToken)).toEqual(["quiz_v2.new"]);
      expect(readIncompatibleLegacyResultTokens(storage)).toEqual(["quiz_v2.legacy"]);
    });
  });

  describe("Phase 10C (hardened): quarantine, not delete, for incompatible legacy entries", () => {
    it("quarantineIncompatiblePendingResult MOVES the entry: gone from the active queue, present (byte-identical plus a reason tag) in the quarantine store — never deleted outright", () => {
      const legacy = legacyEntry();
      const storage = fakeStorage({ [PENDING_OWN_RESULTS_KEY]: JSON.stringify([legacy]) });

      quarantineIncompatiblePendingResult("quiz_v2.legacy", storage);

      expect(readIncompatibleLegacyResultTokens(storage)).toEqual([]); // gone from the active queue
      expect(readIncompatiblePendingResults(storage)).toEqual([quarantinedLegacyEntry()]); // fully preserved in quarantine
    });

    it("is idempotent — quarantining the same token twice does not duplicate it", () => {
      const storage = fakeStorage({ [PENDING_OWN_RESULTS_KEY]: JSON.stringify([legacyEntry()]) });
      quarantineIncompatiblePendingResult("quiz_v2.legacy", storage);
      quarantineIncompatiblePendingResult("quiz_v2.legacy", storage); // already moved; no-op
      expect(readIncompatiblePendingResults(storage)).toHaveLength(1);
    });

    it("is a no-op for a token that isn't a legacy entry in the active queue (already quarantined, or never existed)", () => {
      const storage = fakeStorage();
      expect(() => quarantineIncompatiblePendingResult("quiz_v2.nonexistent", storage)).not.toThrow();
      expect(readIncompatiblePendingResults(storage)).toEqual([]);
    });

    it("does not disturb unrelated current-shape entries in the active queue when quarantining a legacy one", () => {
      const legacy = legacyEntry();
      const storage = fakeStorage({ [PENDING_OWN_RESULTS_KEY]: JSON.stringify([legacy]) });
      enqueuePendingOwnResult("quiz_v2.current", TEST_PEOPLE, storage);

      quarantineIncompatiblePendingResult("quiz_v2.legacy", storage);

      expect(readPendingOwnResults(storage).map((e) => e.resultToken)).toEqual(["quiz_v2.current"]);
    });

    it("a quarantined entry survives further, unrelated queue activity (enqueue/clear of other tokens)", () => {
      const legacy = legacyEntry();
      const storage = fakeStorage({ [PENDING_OWN_RESULTS_KEY]: JSON.stringify([legacy]) });
      quarantineIncompatiblePendingResult("quiz_v2.legacy", storage);

      enqueuePendingOwnResult("quiz_v2.new", TEST_PEOPLE, storage);
      clearPendingOwnResult("quiz_v2.new", storage);

      expect(readIncompatiblePendingResults(storage)).toEqual([quarantinedLegacyEntry()]);
    });

    it("dismissIncompatiblePendingResult is the ONE explicit removal path — removes a quarantined entry by its own token", () => {
      const storage = fakeStorage({ [PENDING_OWN_RESULTS_KEY]: JSON.stringify([legacyEntry()]) });
      quarantineIncompatiblePendingResult("quiz_v2.legacy", storage);

      dismissIncompatiblePendingResult("quiz_v2.legacy", storage);

      expect(readIncompatiblePendingResults(storage)).toEqual([]);
    });

    it("dismissing a token not present in quarantine is a no-op", () => {
      const storage = fakeStorage({ [PENDING_OWN_RESULTS_KEY]: JSON.stringify([legacyEntry()]) });
      quarantineIncompatiblePendingResult("quiz_v2.legacy", storage);

      dismissIncompatiblePendingResult("quiz_v2.not-present", storage);

      expect(readIncompatiblePendingResults(storage)).toEqual([quarantinedLegacyEntry()]);
    });

    it("the quarantine store is its own distinct localStorage key, independent of the active queue key", () => {
      expect(INCOMPATIBLE_PENDING_RESULTS_KEY).not.toBe(PENDING_OWN_RESULTS_KEY);
    });

    it("gracefully no-ops without a storage backend", () => {
      expect(() => quarantineIncompatiblePendingResult("quiz_v2.x", undefined)).not.toThrow();
      expect(readIncompatiblePendingResults(undefined)).toEqual([]);
      expect(() => dismissIncompatiblePendingResult("quiz_v2.x", undefined)).not.toThrow();
    });
  });

  describe("Phase 10C (third review): quarantineDriftedPendingResult — the current-format counterpart", () => {
    it("moves a CURRENT-shape entry into quarantine tagged reason: provenance_drift, preserving personDataVersion (which legacy_format entries never have)", () => {
      const storage = fakeStorage();
      enqueuePendingOwnResult("quiz_v2.drifted", TEST_PEOPLE, storage);
      const original = readPendingOwnResults(storage)[0]!;

      quarantineDriftedPendingResult("quiz_v2.drifted", storage);

      expect(readPendingOwnResults(storage)).toEqual([]);
      expect(readIncompatiblePendingResults(storage)).toEqual([{ ...original, reason: "provenance_drift" }]);
    });

    it("is idempotent and a no-op for an unknown token", () => {
      const storage = fakeStorage();
      enqueuePendingOwnResult("quiz_v2.drifted", TEST_PEOPLE, storage);
      quarantineDriftedPendingResult("quiz_v2.drifted", storage);
      quarantineDriftedPendingResult("quiz_v2.drifted", storage);
      expect(readIncompatiblePendingResults(storage)).toHaveLength(1);
      expect(() => quarantineDriftedPendingResult("quiz_v2.nonexistent", storage)).not.toThrow();
    });

    it("does not disturb a co-existing legacy-format quarantine entry, or vice versa — both reasons coexist in one store", () => {
      const storage = fakeStorage({
        [PENDING_OWN_RESULTS_KEY]: JSON.stringify([legacyEntry("quiz_v2.legacy")]),
      });
      enqueuePendingOwnResult("quiz_v2.drifted", TEST_PEOPLE, storage);

      quarantineIncompatiblePendingResult("quiz_v2.legacy", storage);
      quarantineDriftedPendingResult("quiz_v2.drifted", storage);

      const quarantined = readIncompatiblePendingResults(storage);
      expect(quarantined).toHaveLength(2);
      expect(quarantined.find((e) => e.resultToken === "quiz_v2.legacy")?.reason).toBe("legacy_format");
      expect(quarantined.find((e) => e.resultToken === "quiz_v2.drifted")?.reason).toBe("provenance_drift");
    });

    it("gracefully no-ops without a storage backend", () => {
      expect(() => quarantineDriftedPendingResult("quiz_v2.x", undefined)).not.toThrow();
    });
  });

  it("enqueue stores a valid completion, snapshotting CURRENT_VERSIONS and the current person-data fingerprint", () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.abcd", TEST_PEOPLE, storage);
    const queue = readPendingOwnResults(storage);
    expect(queue).toHaveLength(1);
    expect(queue[0]!.resultToken).toBe("quiz_v2.abcd");
    expect(typeof queue[0]!.completedAt).toBe("string");
    expect(queue[0]!.provenance).toEqual(CURRENT_VERSIONS);
    expect(queue[0]!.personDataVersion).toBe(personDataFingerprint(TEST_PEOPLE));
  });

  it("a duplicate resultToken does not grow the queue", () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.same", TEST_PEOPLE, storage);
    enqueuePendingOwnResult("quiz_v2.same", TEST_PEOPLE, storage);
    enqueuePendingOwnResult("quiz_v2.same", TEST_PEOPLE, storage);
    expect(readPendingOwnResults(storage)).toHaveLength(1);
  });

  it("caps the queue at 5 entries", () => {
    const storage = fakeStorage();
    for (let i = 0; i < 8; i++) enqueuePendingOwnResult(`quiz_v2.token${i}`, TEST_PEOPLE, storage);
    expect(readPendingOwnResults(storage)).toHaveLength(5);
  });

  it("drops the oldest entry first on overflow, keeping the most recent ones", () => {
    const storage = fakeStorage();
    for (let i = 0; i < 8; i++) enqueuePendingOwnResult(`quiz_v2.token${i}`, TEST_PEOPLE, storage);
    const tokens = readPendingOwnResults(storage).map((e) => e.resultToken);
    expect(tokens).not.toContain("quiz_v2.token0");
    expect(tokens).not.toContain("quiz_v2.token2");
    expect(tokens).toEqual(["quiz_v2.token3", "quiz_v2.token4", "quiz_v2.token5", "quiz_v2.token6", "quiz_v2.token7"]);
  });

  it("clearPendingOwnResult removes only the matching token, leaving unrelated entries untouched", () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", TEST_PEOPLE, storage);
    enqueuePendingOwnResult("quiz_v2.b", TEST_PEOPLE, storage);
    enqueuePendingOwnResult("quiz_v2.c", TEST_PEOPLE, storage);

    clearPendingOwnResult("quiz_v2.b", storage);

    const tokens = readPendingOwnResults(storage).map((e) => e.resultToken);
    expect(tokens).toEqual(["quiz_v2.a", "quiz_v2.c"]);
  });

  it("clearing a token that isn't in the queue is a no-op", () => {
    const storage = fakeStorage();
    enqueuePendingOwnResult("quiz_v2.a", TEST_PEOPLE, storage);
    clearPendingOwnResult("quiz_v2.not-present", storage);
    expect(readPendingOwnResults(storage).map((e) => e.resultToken)).toEqual(["quiz_v2.a"]);
  });

  it("gracefully no-ops without a storage backend (e.g. server-side import)", () => {
    expect(() => enqueuePendingOwnResult("quiz_v2.x", TEST_PEOPLE, undefined)).not.toThrow();
    expect(readPendingOwnResults(undefined)).toEqual([]);
    expect(() => clearPendingOwnResult("quiz_v2.x", undefined)).not.toThrow();
  });
});
