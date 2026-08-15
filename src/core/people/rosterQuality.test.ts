import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import {
  findDuplicates,
  meetsContentQualityFloor,
  runRosterQualityGates,
  validateChronology,
  validateTraitBounds,
} from "./rosterQuality.js";

describe("rosterQuality gates against the current committed roster (baseline)", () => {
  it("has no duplicate slugs, ids, or Wikidata QIDs among the current 35", () => {
    const dup = findDuplicates(SEED_PEOPLE);
    expect(dup.duplicateSlugs).toEqual([]);
    expect(dup.duplicateIds).toEqual([]);
    expect(dup.duplicateWikidataIds).toEqual([]);
  });

  it("every current person passes chronology validation", () => {
    const errors = SEED_PEOPLE.flatMap(validateChronology);
    expect(errors).toEqual([]);
  });

  it("every current person's trait scores/confidences are in-bounds with no duplicate attribute entries", () => {
    const errors = SEED_PEOPLE.flatMap(validateTraitBounds);
    expect(errors).toEqual([]);
  });

  it("every current person meets the content-quality floor (confirms the floor isn't too strict for known-good data)", () => {
    const failures = SEED_PEOPLE.map(meetsContentQualityFloor).filter((r) => !r.meetsFloor);
    expect(failures).toEqual([]);
  });

  it("runRosterQualityGates produces a clean report for the current roster", () => {
    const report = runRosterQualityGates(SEED_PEOPLE);
    expect(report.duplicates.duplicateSlugs).toEqual([]);
    expect(report.chronologyErrors).toEqual([]);
    expect(report.traitErrors).toEqual([]);
    expect(report.contentQualityFailures).toEqual([]);
    expect(report.eligibility.length).toBe(SEED_PEOPLE.length);
  });
});

describe("rosterQuality gates catch real defects (mechanical checks, not evidence judgment)", () => {
  const base = SEED_PEOPLE[0]!;

  it("catches a duplicate slug", () => {
    const withDup = [base, { ...base, id: "different-id" }];
    expect(findDuplicates(withDup).duplicateSlugs).toEqual([base.slug]);
  });

  it("catches deathYear before birthYear", () => {
    const broken = { ...base, birthYear: 1900, deathYear: 1850, isLiving: false };
    const errors = validateChronology(broken);
    expect(errors.some((e) => e.reason.includes("precedes"))).toBe(true);
  });

  it("catches isLiving=true with a deathYear set", () => {
    const broken = { ...base, isLiving: true, deathYear: 2000 };
    const errors = validateChronology(broken);
    expect(errors.some((e) => e.reason.includes("isLiving"))).toBe(true);
  });

  it("catches an out-of-range score", () => {
    const broken = { ...base, attributes: [{ ...base.attributes[0]!, score: 150 }] };
    const errors = validateTraitBounds(broken);
    expect(errors.some((e) => e.reason.includes("score out of range"))).toBe(true);
  });

  it("catches an out-of-range confidence", () => {
    const broken = { ...base, attributes: [{ ...base.attributes[0]!, confidence: 1.5 }] };
    const errors = validateTraitBounds(broken);
    expect(errors.some((e) => e.reason.includes("confidence out of range"))).toBe(true);
  });

  it("catches a person with no sources", () => {
    const broken = { ...base, sources: [] };
    const result = meetsContentQualityFloor(broken);
    expect(result.meetsFloor).toBe(false);
    expect(result.reasons.some((r) => r.includes("sources"))).toBe(true);
  });

  it("catches a person with no impactDomains", () => {
    const broken = { ...base, impactDomains: [] };
    const result = meetsContentQualityFloor(broken);
    expect(result.meetsFloor).toBe(false);
    expect(result.reasons.some((r) => r.includes("impactDomains"))).toBe(true);
  });

  it("catches a sparse profile below 18 scored attributes", () => {
    const broken = { ...base, attributes: base.attributes.slice(0, 5) };
    const result = meetsContentQualityFloor(broken);
    expect(result.meetsFloor).toBe(false);
    expect(result.reasons.some((r) => r.includes("scored attributes"))).toBe(true);
  });
});
