import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
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
  it("has no duplicate slugs, ids, or Wikidata QIDs among the current roster", () => {
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

  // Visual Provenance Schema (2026-08): a historical_depiction or
  // editorial_nonlikeness portrait must never be presented without its
  // caveat/credit text -- unlike a plain photographic likeness, the whole
  // point of these two categories is that a reader needs the attribution
  // to understand what they're looking at.
  it("every historical_depiction or editorial_nonlikeness portrait carries non-empty attribution", () => {
    const violations = SEED_PEOPLE.filter(
      (p) =>
        (p.portrait?.kind === "historical_depiction" || p.portrait?.kind === "editorial_nonlikeness") &&
        !p.portrait?.attribution?.trim(),
    ).map((p) => p.slug);
    expect(violations).toEqual([]);
  });

  // Portrait Completion Phase 2D-2: first production editorial_nonlikeness
  // instance. Pinned directly (not just via the generic scan above) so a
  // future edit to his portrait block that silently drops `kind` or the
  // caveat text fails loudly here, not just via a Playwright label check.
  it("ibn-khaldun carries kind: editorial_nonlikeness with a caveat naming the manuscript, not a likeness claim", () => {
    const person = SEED_PEOPLE.find((p) => p.slug === "ibn-khaldun");
    expect(person?.portrait?.kind).toBe("editorial_nonlikeness");
    expect(person?.portrait?.attribution).toContain("not a portrait");
    expect(person?.portrait?.attribution).toContain("No authenticated likeness");
    expect(person?.portrait?.attribution).toContain("Atıf Efendi 1936");
    expect(person?.portrait?.attribution?.toLowerCase()).not.toContain("autograph");
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

/**
 * ROSTER-BATCH IMPORT COMPLETENESS (2026-09, roster17 cycle) — the
 * scalability audit's top near-term risk: `seed.ts` hand-maintains the
 * list of `ROSTER_N` imports/spreads that make up `ALL_ROSTERS`. A batch
 * file (`rosterN.ts`) that's committed but never added to that list would
 * silently vanish from the live product with no error anywhere else in
 * this suite -- every other test only ever sees `SEED_PEOPLE`, which
 * would just look like a slightly smaller roster, not a bug.
 *
 * This test discovers every committed `rosterN.ts` file on disk (test-time
 * filesystem discovery only -- production's own `seed.ts` stays a fully
 * explicit, static list of imports, completely unaffected by this file)
 * and asserts every person it exports actually appears in `SEED_PEOPLE`.
 * Combined with the duplicate-id/slug check, this also catches a batch
 * accidentally imported twice (which would show up as a real duplicate in
 * `SEED_PEOPLE`, not just in the file list) and a batch's file drifting
 * out of sync with what's actually wired into the live roster.
 *
 * Deliberately NOT a promotion mechanism: it only ever fails loudly on a
 * mismatch. It never imports, filters, or promotes anything itself, and
 * never touches `qa_passed` candidate JSON -- promotion stays exactly what
 * it already is, an explicit, human-reviewed `generateRosterN.ts` allowlist.
 */
describe("roster-batch import completeness (guards against a silently-unwired rosterN.ts)", () => {
  const peopleDir = join(dirname(fileURLToPath(import.meta.url)), "../../data/people");
  const rosterFiles = readdirSync(peopleDir)
    .filter((f) => /^roster\d+\.ts$/.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  it("finds at least the roster batch files known to exist as of this test", () => {
    // A sanity floor, not an exhaustive list -- new batches are expected to
    // extend this, never shrink it silently. 14 as of roster16 (roster2-12,
    // 14-16; there is no roster13.ts -- that intake cycle produced zero
    // promotions, so no file was ever created for it).
    expect(rosterFiles.length).toBeGreaterThanOrEqual(14);
  });

  it("every person exported by every committed rosterN.ts is present in SEED_PEOPLE, with no cross-batch duplicates", async () => {
    const seedIds = new Set(SEED_PEOPLE.map((p) => p.id));
    const seedSlugs = new Set(SEED_PEOPLE.map((p) => p.slug));
    const owningFile = new Map<string, string>();
    const missing: string[] = [];
    const crossBatchDuplicates: string[] = [];

    for (const file of rosterFiles) {
      const n = file.match(/^roster(\d+)\.ts$/)![1];
      const base = file.replace(/\.ts$/, "");
      const exportName = `ROSTER_${n}`;
      const mod: Record<string, unknown> = await import(`../../data/people/${base}.ts`);
      const roster = mod[exportName];

      expect(Array.isArray(roster), `${file} does not export an array named ${exportName}`).toBe(true);
      expect((roster as unknown[]).length, `${file}'s ${exportName} is empty`).toBeGreaterThan(0);

      for (const person of roster as Array<{ id: string; slug: string }>) {
        if (!seedIds.has(person.id) || !seedSlugs.has(person.slug)) {
          missing.push(`${person.id} (${person.slug}) from ${file}`);
        }
        const owner = owningFile.get(person.id);
        if (owner && owner !== file) {
          crossBatchDuplicates.push(`${person.id} appears in both ${owner} and ${file}`);
        }
        owningFile.set(person.id, file);
      }
    }

    expect(missing, "committed on disk but missing from SEED_PEOPLE -- is this ROSTER_N actually spread into ALL_ROSTERS in seed.ts?").toEqual([]);
    expect(crossBatchDuplicates, "same person id committed into more than one roster batch file").toEqual([]);
  });

  it("SEED_PEOPLE itself has zero duplicate ids or slugs (catches a batch imported twice into seed.ts)", () => {
    const ids = SEED_PEOPLE.map((p) => p.id);
    const slugs = SEED_PEOPLE.map((p) => p.slug);
    expect(ids.length, "SEED_PEOPLE has duplicate ids").toBe(new Set(ids).size);
    expect(slugs.length, "SEED_PEOPLE has duplicate slugs").toBe(new Set(slugs).size);
  });
});
