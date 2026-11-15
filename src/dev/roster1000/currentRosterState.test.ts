/**
 * The ONE test that pins the live roster to `CURRENT_ROSTER_MANIFEST`.
 *
 * Every other current-state count assertion either derives from the data (SEED_PEOPLE vs PEOPLE_INDEX
 * agreement) or imports the manifest, so a roster cycle bumps the numbers in the manifest and this test is the
 * only place that proves they match reality.
 */
import { describe, expect, it } from "vitest";
import { CURRENT_ROSTER_MANIFEST } from "./currentRosterManifest.js";
import { candidateJsonCount, currentRosterCounts } from "./currentRoster.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import { PEOPLE_INDEX } from "../../data/people/peopleIndex.generated.js";
import { buildLineageMap } from "./audits/matchPoolIntegrityAudit.js";
import {
  FIRST_NEW_CANDIDATE_ROSTER,
  LEGACY_REMEDIATED_NON_ELIGIBLE_SLUGS,
  RECENT_ROSTER_ELIGIBLE_EXCEPTIONS,
  knownDirectoryVisibleNonEligibleSlugs,
  recentRosterSlugs,
  rosterNumber,
} from "./rosterMembership.js";

describe("current roster state agrees with the manifest", () => {
  const live = currentRosterCounts();

  it("production count: SEED_PEOPLE and PEOPLE_INDEX both equal the manifest", () => {
    expect(live.production).toBe(CURRENT_ROSTER_MANIFEST.production);
    expect(live.productionIndex).toBe(CURRENT_ROSTER_MANIFEST.production);
    expect(PEOPLE_INDEX).toHaveLength(SEED_PEOPLE.length);
  });

  it("directory-visible count equals the manifest (and is derived from the roster data, not assumed)", () => {
    expect(live.directoryVisible).toBe(CURRENT_ROSTER_MANIFEST.directoryVisible);
    expect(PEOPLE_INDEX.filter((p) => p.isDirectoryVisible)).toHaveLength(CURRENT_ROSTER_MANIFEST.directoryVisible);
  });

  it("match-eligible count equals the manifest (and the index agrees)", () => {
    expect(live.matchEligible).toBe(CURRENT_ROSTER_MANIFEST.matchEligible);
    expect(PEOPLE_INDEX.filter((p) => p.isMatchEligible)).toHaveLength(CURRENT_ROSTER_MANIFEST.matchEligible);
  });

  it("candidate JSON file count equals the manifest", () => {
    expect(candidateJsonCount()).toBe(CURRENT_ROSTER_MANIFEST.candidateJson);
  });

  it("latestRoster is the highest rosterN registered in the lineage registry, and no later roster is registered", () => {
    expect(live.latestRoster).toBe(CURRENT_ROSTER_MANIFEST.latestRoster);
  });
});

describe("registry-derived roster membership", () => {
  it("rosterNumber parses only numbered roster labels", () => {
    expect(rosterNumber("roster67")).toBe(67);
    expect(rosterNumber("roster3")).toBe(3);
    expect(rosterNumber("legacy")).toBeUndefined();
    expect(rosterNumber("roster")).toBeUndefined();
    expect(rosterNumber("roster6x")).toBeUndefined();
  });

  it("every person is registered in exactly one roster lineage entry and the registry covers all of SEED_PEOPLE except the original seed", () => {
    const lineage = buildLineageMap();
    const unregistered = SEED_PEOPLE.filter((p) => !lineage.has(p.slug)).length;
    // The original 10 hand-authored seed people carry no rosterN entry.
    expect(unregistered).toBe(SEED_PEOPLE.length - lineage.size);
    expect(lineage.size).toBeGreaterThan(CURRENT_ROSTER_MANIFEST.production - 15);
  });

  it("the derived published-but-not-eligible set contains only real production people who are in fact not match-eligible", () => {
    const set = knownDirectoryVisibleNonEligibleSlugs();
    expect(set.size).toBeGreaterThan(600);
    const bySlug = new Map(SEED_PEOPLE.map((p) => [p.slug, p]));
    for (const slug of set) {
      const p = bySlug.get(slug);
      expect(p, slug).toBeDefined();
      expect(p!.isDirectoryVisible, slug).toBe(true);
      expect(p!.isMatchEligible, slug).toBe(false);
    }
  });

  it("explicit exceptions are real, from roster24+, and genuinely match-eligible; legacy list members are real and non-eligible", () => {
    const recent = new Set(recentRosterSlugs());
    const bySlug = new Map(SEED_PEOPLE.map((p) => [p.slug, p]));
    for (const slug of RECENT_ROSTER_ELIGIBLE_EXCEPTIONS) {
      expect(recent.has(slug), slug).toBe(true);
      expect(bySlug.get(slug)!.isMatchEligible, slug).toBe(true);
    }
    for (const slug of LEGACY_REMEDIATED_NON_ELIGIBLE_SLUGS) expect(bySlug.get(slug)!.isMatchEligible, slug).toBe(false);
    expect(FIRST_NEW_CANDIDATE_ROSTER).toBe(24);
  });
});
