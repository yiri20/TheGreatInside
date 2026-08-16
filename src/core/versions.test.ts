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

describe("eligibility_v2 versioning (Roster-1000 session 10)", () => {
  it("CURRENT_VERSIONS.eligibilityVersion is eligibility_v2", () => {
    expect(CURRENT_VERSIONS.eligibilityVersion).toBe("eligibility_v2");
  });

  it("the pre-bump eligibility_v1 combination is preserved in KNOWN_VERSION_SNAPSHOTS, per the append-only invariant", () => {
    const eligibilityV1Entry = KNOWN_VERSION_SNAPSHOTS.find((s) => s.eligibilityVersion === "eligibility_v1");
    expect(eligibilityV1Entry).toBeDefined();
    // Identical to CURRENT_VERSIONS in every OTHER field -- this really is
    // "the same shipped combination, before only eligibility moved on",
    // not an arbitrary historical snapshot.
    expect(eligibilityV1Entry).toEqual({ ...CURRENT_VERSIONS, eligibilityVersion: "eligibility_v1" });
    expect(isKnownVersionSnapshot({ ...CURRENT_VERSIONS, eligibilityVersion: "eligibility_v1" })).toBe(true);
  });

  it("a provenance object differing from CURRENT_VERSIONS ONLY in eligibilityVersion is still rejected by snapshotsEqual-based drift comparison unless it matches eligibility_v1 exactly", () => {
    expect(isKnownVersionSnapshot({ ...CURRENT_VERSIONS, eligibilityVersion: "eligibility_v99" })).toBe(false);
  });

  it("KNOWN_VERSION_SNAPSHOTS now holds exactly two entries, both otherwise identical to CURRENT_VERSIONS", () => {
    expect(KNOWN_VERSION_SNAPSHOTS).toHaveLength(2);
    for (const snap of KNOWN_VERSION_SNAPSHOTS) {
      const { eligibilityVersion, ...rest } = snap;
      const { eligibilityVersion: currentEligibilityVersion, ...currentRest } = CURRENT_VERSIONS;
      expect(rest).toEqual(currentRest);
    }
  });
});
