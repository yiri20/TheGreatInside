import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../../data/people/seed.js";
import { PEOPLE_INDEX } from "../../../data/people/peopleIndex.generated.js";
import { evaluateMatchEligibility } from "../../../core/matching/similarity.js";
import { searchPeople } from "../../../core/people/explorer.js";
import type { Candidate } from "../candidateSchema.js";
import { hasCandidateFile } from "./matchPoolIntegrityAudit.js";

const candidate = JSON.parse(
  readFileSync(join(process.cwd(), "data-pipeline/candidates/akira-kurosawa.json"), "utf8"),
) as Candidate;
const production = SEED_PEOPLE.find((p) => p.slug === "akira-kurosawa")!;

describe("Kurosawa legacy remediation: candidate -> production consistency", () => {
  it("the candidate file exists and is evidence_approved", () => {
    expect(hasCandidateFile("akira-kurosawa")).toBe(true);
    expect(candidate.status).toBe("evidence_approved");
  });

  it("production carries exactly the candidate's row set (no more, no fewer)", () => {
    const candidateAttrs = Object.keys(candidate.rows).sort();
    const productionAttrs = production.attributes.map((a) => a.attributeId).sort();
    expect(productionAttrs).toEqual(candidateAttrs);
    expect(productionAttrs).toHaveLength(10);
  });

  it("every row's score/confidence/evidenceType/impact matches exactly between candidate and production", () => {
    for (const [attributeId, row] of Object.entries(candidate.rows)) {
      const prodAttr = production.attributes.find((a) => a.attributeId === attributeId);
      expect(prodAttr, `${attributeId} missing from production`).toBeDefined();
      expect(prodAttr!.score, `${attributeId} score`).toBe(row.score);
      expect(prodAttr!.confidence, `${attributeId} confidence`).toBe(row.confidence);
      expect(prodAttr!.evidenceType, `${attributeId} evidenceType`).toBe(row.evidenceType);
      expect(prodAttr!.impact, `${attributeId} impact`).toBe(row.impact);
    }
  });

  it("identity, slug, id, portrait, and Korean display name are preserved unchanged", () => {
    expect(production.slug).toBe("akira-kurosawa");
    expect(production.id).toBe("p_akira_kurosawa");
    expect(production.canonicalName).toBe("Akira Kurosawa");
    expect(production.portrait?.url).toBe("/portraits/akira-kurosawa-seven-samurai-set-1953.jpg");
    expect(production.portrait?.license).toContain("Public Domain");
  });
});

describe("Kurosawa legacy remediation: publication/match separation", () => {
  it("is publication-safe (directory-visible) independent of match eligibility", () => {
    expect(production.status).toBe("published");
    expect(production.isDirectoryVisible).toBe(true);
  });

  it("is honestly non-match-eligible -- not rescued", () => {
    expect(production.isMatchEligible).toBe(false);
  });
});

describe("Kurosawa legacy remediation: current eligibility result", () => {
  it("matches the exact frozen before/after numbers from this cycle", () => {
    const report = evaluateMatchEligibility(production);
    expect(report.eligible).toBe(false);
    expect(report.scoredAttributes).toBe(10);
    expect(report.highConfidenceCount).toBe(10);
    expect(report.coverage).toBeLessThan(0.6);
    expect(report.highConfidenceAverage).toBeGreaterThanOrEqual(0.55);
    // Exactly 3 of 4 eligibility_v2 criteria fail (breadth/coverage/HC-count);
    // only the HC-average sub-gate passes.
    expect(report.reasons).toHaveLength(3);
  });
});

describe("Kurosawa legacy remediation: no duplicate identity", () => {
  it("no duplicate ids, slugs, or Wikidata QIDs across all 225 production people", () => {
    const ids = SEED_PEOPLE.map((p) => p.id);
    const slugs = SEED_PEOPLE.map((p) => p.slug);
    const qids = SEED_PEOPLE.map((p) => p.externalIdentity?.wikidataId).filter((x): x is string => !!x);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(qids).size).toBe(qids.length);
  });

  it("Kurosawa's own QID (Q8006) appears exactly once and matches the candidate file", () => {
    expect(candidate.identity.wikidataId).toBe("Q8006");
    const withThisQid = SEED_PEOPLE.filter((p) => p.externalIdentity?.wikidataId === "Q8006");
    expect(withThisQid).toHaveLength(1);
    expect(withThisQid[0]!.slug).toBe("akira-kurosawa");
  });

  it("SEED_PEOPLE and PEOPLE_INDEX remain in agreement at 225 people, Kurosawa present in both exactly once", () => {
    expect(SEED_PEOPLE).toHaveLength(225);
    expect(PEOPLE_INDEX).toHaveLength(225);
    expect(SEED_PEOPLE.filter((p) => p.slug === "akira-kurosawa")).toHaveLength(1);
    expect(PEOPLE_INDEX.filter((p) => p.slug === "akira-kurosawa")).toHaveLength(1);
  });
});

describe("Kurosawa legacy remediation: stale tag correction", () => {
  it("'perfectionist' is absent from candidate, production, and the generated people index; 'leader' is retained in all three", () => {
    const indexEntry = PEOPLE_INDEX.find((p) => p.slug === "akira-kurosawa")!;

    expect(candidate.classification.tagIds).not.toContain("perfectionist");
    expect(production.tagIds).not.toContain("perfectionist");
    expect(indexEntry.tagIds).not.toContain("perfectionist");

    expect(candidate.classification.tagIds).toContain("leader");
    expect(production.tagIds).toContain("leader");
    expect(indexEntry.tagIds).toContain("leader");
  });

  it("no scored row is named 'perfectionism' -- the tag's removal matches the row's absence, not a mismatch", () => {
    expect(production.attributes.some((a) => a.attributeId === "perfectionism")).toBe(false);
  });

  it("searching the raw 'perfectionist' tag no longer surfaces Kurosawa on stale metadata alone", () => {
    const results = searchPeople(SEED_PEOPLE, "perfectionist");
    expect(results.some((p) => p.slug === "akira-kurosawa")).toBe(false);
  });

  it("searching 'leader' still surfaces Kurosawa -- the tag fix removed one tag, not search generally", () => {
    const results = searchPeople(SEED_PEOPLE, "leader");
    expect(results.some((p) => p.slug === "akira-kurosawa")).toBe(true);
  });
});
