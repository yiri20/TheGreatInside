import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../../data/people/seed.js";
import {
  aggregateCohort,
  buildInventory,
  buildLineageMap,
  classifyLineage,
  classifyLineageGroup,
  hasCandidateFile,
  lineageBreakdown,
  lineageGroupBreakdown,
  median,
} from "./matchPoolIntegrityAudit.js";

describe("match-pool integrity audit: no mutation", () => {
  it("buildInventory never mutates SEED_PEOPLE", () => {
    const before = JSON.stringify(SEED_PEOPLE);
    buildInventory(SEED_PEOPLE);
    const after = JSON.stringify(SEED_PEOPLE);
    expect(after).toBe(before);
  });

  it("aggregateCohort never mutates its input rows", () => {
    const rows = buildInventory(SEED_PEOPLE);
    const before = JSON.stringify(rows);
    aggregateCohort(rows);
    lineageBreakdown(rows);
    lineageGroupBreakdown(rows);
    const after = JSON.stringify(rows);
    expect(after).toBe(before);
  });
});

describe("match-pool integrity audit: cohort counts", () => {
  const inventory = buildInventory(SEED_PEOPLE);

  it("classifies every production person exactly once", () => {
    expect(inventory).toHaveLength(SEED_PEOPLE.length);
    expect(inventory).toHaveLength(225);
  });

  it("matches the live production/directory/eligible counts", () => {
    // Match-eligible dropped 127->126->123->120: the akira-kurosawa legacy
    // remediation honestly found only 10 individually-attributable rows
    // for him, legacy integrity batch 2 did the same for bruce-lee,
    // ludwig-van-beethoven, and nikola-tesla, and legacy integrity batch 3
    // (docs/checkpoints/legacy-integrity-batch3-three-person-remediation.md)
    // did the same for srinivasa-ramanujan, toni-morrison, and
    // hayao-miyazaki -- directory visibility is unchanged for all seven
    // since each was made evidence_approved, not held.
    expect(inventory.filter((r) => r.isDirectoryVisible)).toHaveLength(224);
    expect(inventory.filter((r) => r.isMatchEligible)).toHaveLength(120);
  });

  it("every directory-visible non-eligible person belongs to the recent_cycles lineage group, EXCEPT the legacy-remediated akira-kurosawa, bruce-lee, ludwig-van-beethoven, nikola-tesla, srinivasa-ramanujan, toni-morrison, and hayao-miyazaki", () => {
    // Legacy integrity remediation (2026-09, docs/checkpoints/legacy-
    // integrity-kurosawa-remediation.md) made akira-kurosawa (early_hand_
    // authored lineage) the first non-recent-cycle person to be
    // evidence_approved/directory-visible/non-eligible -- previously this
    // combination only arose from the roster24+ publication architecture.
    // Legacy integrity batches 2 and 3 added six more (bruce-lee,
    // ludwig-van-beethoven, and toni-morrison are roster2 lineage;
    // nikola-tesla, srinivasa-ramanujan also roster2; hayao-miyazaki is
    // roster1 -- all early_hand_authored).
    const legacyRemediated = new Set([
      "akira-kurosawa",
      "bruce-lee",
      "ludwig-van-beethoven",
      "nikola-tesla",
      "srinivasa-ramanujan",
      "toni-morrison",
      "hayao-miyazaki",
    ]);
    const nonEligibleVisible = inventory.filter(
      (r) => r.isDirectoryVisible && !r.isMatchEligible && !legacyRemediated.has(r.slug),
    );
    expect(nonEligibleVisible.length).toBeGreaterThan(0);
    for (const r of nonEligibleVisible) expect(r.lineageGroup).toBe("recent_cycles");

    for (const slug of legacyRemediated) {
      const p = inventory.find((r) => r.slug === slug)!;
      expect(p.isDirectoryVisible, slug).toBe(true);
      expect(p.isMatchEligible, slug).toBe(false);
      expect(p.lineageGroup, slug).toBe("early_hand_authored");
    }
  });
});

describe("match-pool integrity audit: lineage classification", () => {
  it("every SEED_PEOPLE slug resolves to exactly one lineage label", () => {
    const map = buildLineageMap();
    for (const p of SEED_PEOPLE) {
      const lineage = classifyLineage(p.slug);
      expect(lineage).toMatch(/^roster(1|[2-9]|1[0-6]|2[4-9]|3[0-2])$/);
      if (lineage !== "roster1") {
        expect(map.get(p.slug)).toBe(lineage);
      } else {
        expect(map.has(p.slug)).toBe(false);
      }
    }
  });

  it("classifies known fixed points correctly", () => {
    // Hand-authored, pre-candidate-pipeline originals -- never separately
    // exported, so classified by elimination.
    expect(classifyLineage("leonardo-da-vinci")).toBe("roster1");
    expect(classifyLineageGroup("roster1")).toBe("early_hand_authored");
    // Roster32's own promoted slugs.
    expect(classifyLineage("pablo-neruda")).toBe("roster32");
    expect(classifyLineageGroup("roster32")).toBe("recent_cycles");
    // A mid-pipeline roster.
    expect(classifyLineage("albert-einstein")).not.toBe("roster1");
    expect(classifyLineageGroup(classifyLineage("albert-einstein"))).toBe("historical_pipeline");
  });

  it("roster13 and roster17-23 do not exist as production lineages (zero promotions each, per docs/checkpoints/roster.md)", () => {
    const breakdown = lineageBreakdown(buildInventory(SEED_PEOPLE));
    for (const n of [13, 17, 18, 19, 20, 21, 22, 23]) {
      expect(breakdown[`roster${n}`]).toBeUndefined();
    }
  });

  it("al-farabi (held, never promoted) has no lineage membership", () => {
    expect(SEED_PEOPLE.some((p) => p.slug === "al-farabi")).toBe(false);
  });
});

describe("match-pool integrity audit: candidate-file cross-reference", () => {
  it("flags the known pre-pipeline hand-authored roster1/roster2 cohort as having no candidate JSON", () => {
    expect(hasCandidateFile("leonardo-da-vinci")).toBe(false);
    expect(hasCandidateFile("confucius")).toBe(false);
  });

  it("flags a known candidate-pipeline person as having a candidate JSON", () => {
    expect(hasCandidateFile("albert-einstein")).toBe(true);
    expect(hasCandidateFile("pablo-neruda")).toBe(true);
  });
});

describe("match-pool integrity audit: metric helpers", () => {
  it("median handles even/odd lengths and the empty case", () => {
    expect(median([])).toBe(0);
    expect(median([5])).toBe(5);
    expect(median([1, 3, 2])).toBe(2);
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  it("aggregateCohort produces internally consistent shares", () => {
    const rows = buildInventory(SEED_PEOPLE).filter((r) => r.isMatchEligible);
    const stats = aggregateCohort(rows);
    expect(stats.count).toBe(rows.length);
    const totalShare = stats.documentedShare + stats.strongInferenceShare + stats.inferenceShare;
    expect(totalShare).toBeCloseTo(1, 5);
  });
});
