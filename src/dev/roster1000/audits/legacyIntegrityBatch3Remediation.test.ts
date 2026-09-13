import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../../data/people/seed.js";
import { PEOPLE_INDEX } from "../../../data/people/peopleIndex.generated.js";
import { evaluateMatchEligibility } from "../../../core/matching/similarity.js";
import type { Candidate } from "../candidateSchema.js";
import { hasCandidateFile } from "./matchPoolIntegrityAudit.js";
import { SUPERSEDED_AUDIT_SLUGS } from "./matchPoolIntegrityAuditManual.js";
import { LEGACY_SCORING_BASELINE } from "./legacyScoringLock.generated.js";

const TARGETS = ["srinivasa-ramanujan", "toni-morrison", "hayao-miyazaki"] as const;

function loadCandidate(slug: string): Candidate {
  return JSON.parse(readFileSync(join(process.cwd(), `data-pipeline/candidates/${slug}.json`), "utf8")) as Candidate;
}

const candidates = Object.fromEntries(TARGETS.map((slug) => [slug, loadCandidate(slug)])) as Record<
  (typeof TARGETS)[number],
  Candidate
>;
const production = Object.fromEntries(
  TARGETS.map((slug) => [slug, SEED_PEOPLE.find((p) => p.slug === slug)!]),
) as Record<(typeof TARGETS)[number], (typeof SEED_PEOPLE)[number]>;

describe.each(TARGETS)("Legacy integrity batch 3: %s", (slug) => {
  const candidate = candidates[slug];
  const person = production[slug];

  it("has a real candidate file, evidence_approved, with sources actually recorded", () => {
    expect(hasCandidateFile(slug)).toBe(true);
    expect(candidate.status).toBe("evidence_approved");
    expect(candidate.sources.length).toBeGreaterThan(0);
  });

  it("production carries exactly the candidate's row set (no more, no fewer)", () => {
    const candidateAttrs = Object.keys(candidate.rows).sort();
    const productionAttrs = person.attributes.map((a) => a.attributeId).sort();
    expect(productionAttrs).toEqual(candidateAttrs);
  });

  it("every row's score/confidence/evidenceType/impact matches exactly between candidate and production", () => {
    for (const [attributeId, row] of Object.entries(candidate.rows)) {
      const prodAttr = person.attributes.find((a) => a.attributeId === attributeId);
      expect(prodAttr, `${attributeId} missing from production`).toBeDefined();
      expect(prodAttr!.score, `${slug}.${attributeId} score`).toBe(row.score);
      expect(prodAttr!.confidence, `${slug}.${attributeId} confidence`).toBe(row.confidence);
      expect(prodAttr!.evidenceType, `${slug}.${attributeId} evidenceType`).toBe(row.evidenceType);
      expect(prodAttr!.impact, `${slug}.${attributeId} impact`).toBe(row.impact);
    }
  });

  it("candidate and production identity/QID agree", () => {
    expect(candidate.identity.wikidataId).toBeDefined();
    expect(person.externalIdentity?.wikidataId).toBe(candidate.identity.wikidataId);
  });

  it("is publication-safe (directory-visible) independent of match eligibility", () => {
    expect(person.status).toBe("published");
    expect(person.isDirectoryVisible).toBe(true);
  });

  it("is honestly non-match-eligible -- not rescued", () => {
    expect(person.isMatchEligible).toBe(false);
    const report = evaluateMatchEligibility(person);
    expect(report.eligible).toBe(false);
    expect(report.reasons.length).toBeGreaterThan(0);
  });

  it("appears in PEOPLE_INDEX exactly once, in agreement with SEED_PEOPLE", () => {
    const inIndex = PEOPLE_INDEX.filter((p) => p.slug === slug);
    expect(inIndex).toHaveLength(1);
    expect(inIndex[0]!.isMatchEligible).toBe(false);
  });
});

describe("Legacy integrity batch 3: cross-target identity integrity", () => {
  it("no duplicate ids, slugs, or Wikidata QIDs across all 225 production people", () => {
    const ids = SEED_PEOPLE.map((p) => p.id);
    const slugs = SEED_PEOPLE.map((p) => p.slug);
    const qids = SEED_PEOPLE.map((p) => p.externalIdentity?.wikidataId).filter((x): x is string => !!x);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(qids).size).toBe(qids.length);
  });

  it("each target's QID matches its own candidate file and appears exactly once", () => {
    for (const slug of TARGETS) {
      const qid = candidates[slug].identity.wikidataId!;
      const withThisQid = SEED_PEOPLE.filter((p) => p.externalIdentity?.wikidataId === qid);
      expect(withThisQid, `QID ${qid} (${slug})`).toHaveLength(1);
      expect(withThisQid[0]!.slug).toBe(slug);
    }
  });

  it("SEED_PEOPLE and PEOPLE_INDEX remain in agreement at 225 people", () => {
    expect(SEED_PEOPLE).toHaveLength(225);
    expect(PEOPLE_INDEX).toHaveLength(225);
  });
});

describe("Legacy integrity batch 3: no eligibility rescue, no unrelated drift", () => {
  it("all three targets fail eligibility_v2 honestly -- none were rescued to pass", () => {
    for (const slug of TARGETS) {
      const report = evaluateMatchEligibility(production[slug]);
      expect(report.eligible, `${slug} should not be eligible`).toBe(false);
    }
  });

  it("no other legacy person's isMatchEligible flipped as a side effect (spot-check against a representative sample, including the batch-1/2 remediated people)", () => {
    const stillEligible = ["leonardo-da-vinci", "marie-curie", "richard-feynman", "confucius", "warren-buffett"];
    for (const slug of stillEligible) {
      const p = SEED_PEOPLE.find((x) => x.slug === slug)!;
      expect(p.isMatchEligible, `${slug} eligibility should be unaffected`).toBe(true);
    }
    const stillNonEligible = ["akira-kurosawa", "bruce-lee", "ludwig-van-beethoven", "nikola-tesla"];
    for (const slug of stillNonEligible) {
      const p = SEED_PEOPLE.find((x) => x.slug === slug)!;
      expect(p.isMatchEligible, `${slug} should remain non-eligible from its own prior remediation`).toBe(false);
    }
  });
});

describe("Legacy integrity batch 3: legacy scoring-lock baseline", () => {
  it("the legacy baseline shrank from 31 to 28 -- exactly the three remediated targets left it", () => {
    const baselineSlugs = Object.keys(LEGACY_SCORING_BASELINE);
    expect(baselineSlugs).toHaveLength(28);
    for (const slug of TARGETS) {
      expect(baselineSlugs, `${slug} should have exited the legacy baseline`).not.toContain(slug);
    }
  });

  it("every production person without a candidate JSON is still represented in the baseline, no orphans", () => {
    const noJsonSlugs = SEED_PEOPLE.filter((p) => !hasCandidateFile(p.slug)).map((p) => p.slug);
    const baselineSlugs = new Set(Object.keys(LEGACY_SCORING_BASELINE));
    expect(noJsonSlugs).toHaveLength(28);
    for (const slug of noJsonSlugs) {
      expect(baselineSlugs.has(slug), `${slug} missing from legacy baseline`).toBe(true);
    }
    for (const slug of baselineSlugs) {
      expect(noJsonSlugs, `${slug} in baseline but now has a candidate file`).toContain(slug);
    }
  });
});

describe("Legacy integrity batch 3: historical audit snapshot supersession", () => {
  it("none of the three batch-3 targets were part of PR #35's frozen historical audit sample", () => {
    // Same discipline as batch 2's own regression test: proves this cycle
    // correctly does NOT need to extend SUPERSEDED_AUDIT_SLUGS, and guards
    // against a future remediation of one of the frozen-sample people
    // silently skipping that step.
    for (const slug of TARGETS) {
      expect(SUPERSEDED_AUDIT_SLUGS.has(slug), `${slug} should not need historical supersession`).toBe(false);
    }
  });
});
