import { describe, expect, it } from "vitest";
import { CURRENT_VERSIONS, isKnownVersionSnapshot, KNOWN_VERSION_SNAPSHOTS, type VersionSnapshot } from "./versions.js";

/** Stands in for a hypothetical past release's versions — real historical
 *  entries don't exist yet (nothing has shipped a second combination), but
 *  the append-only mechanism must already work correctly for when one does. */
const OLD_SNAPSHOT: VersionSnapshot = {
  ...CURRENT_VERSIONS,
  matchingVersion: "matching_v1",
  calibrationVersion: "calibration_v1",
};

describe("version provenance", () => {
  it("CURRENT_VERSIONS is itself known against the real registry", () => {
    expect(isKnownVersionSnapshot(CURRENT_VERSIONS)).toBe(true);
    expect(KNOWN_VERSION_SNAPSHOTS).toContainEqual(CURRENT_VERSIONS);
  });

  it("rejects a snapshot that differs from every known entry in even one field", () => {
    expect(isKnownVersionSnapshot({ ...CURRENT_VERSIONS, matchingVersion: "matching_v99" })).toBe(false);
    expect(isKnownVersionSnapshot({ ...CURRENT_VERSIONS, quizVersion: "quiz_v0" })).toBe(false);
  });

  it("an older known snapshot remains valid independently of CURRENT_VERSIONS, given an appropriately extended registry", () => {
    const registryAfterAHypotheticalFutureBump = [OLD_SNAPSHOT, CURRENT_VERSIONS];

    expect(OLD_SNAPSHOT).not.toEqual(CURRENT_VERSIONS);
    expect(isKnownVersionSnapshot(OLD_SNAPSHOT, registryAfterAHypotheticalFutureBump)).toBe(true);
    expect(isKnownVersionSnapshot(CURRENT_VERSIONS, registryAfterAHypotheticalFutureBump)).toBe(true);

    // The mechanism, not just the presence of two entries: a THIRD, truly
    // unknown snapshot is still rejected even against the wider registry.
    expect(
      isKnownVersionSnapshot({ ...OLD_SNAPSHOT, scoringVersion: "scoring_v0" }, registryAfterAHypotheticalFutureBump),
    ).toBe(false);
  });

  it("does not mutate the caller-supplied registry", () => {
    const registry = [OLD_SNAPSHOT];
    const before = [...registry];
    isKnownVersionSnapshot(CURRENT_VERSIONS, registry);
    expect(registry).toEqual(before);
  });
});
