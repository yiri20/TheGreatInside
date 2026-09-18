/**
 * Roster33 (2026-09-16, docs/checkpoints/roster33.md): new-candidate
 * roster-expansion cycle, table-driven candidate<->production equality for
 * all 14 promoted people. Mirrors the shape of the legacy-integrity batch
 * test files (e.g. legacyIntegrityBatch5Remediation.test.ts), but this is
 * NOT a legacy-remediation audit -- these are brand-new candidates, not
 * rescored existing production people.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../../data/people/seed.js";
import { PEOPLE_INDEX } from "../../../data/people/peopleIndex.generated.js";
import { evaluateMatchEligibility } from "../../../core/matching/similarity.js";
import { personDisplayName } from "../../../core/i18n/index.js";
import type { Candidate } from "../candidateSchema.js";
import { hasCandidateFile } from "./matchPoolIntegrityAudit.js";

const TARGETS = [
  "alexander-fleming",
  "alfred-hitchcock",
  "bill-gates",
  "bob-dylan",
  "carl-sagan",
  "dmitri-mendeleev",
  "ferdinand-magellan",
  "freddie-mercury",
  "jacques-cousteau",
  "jonas-salk",
  "josephine-baker",
  "neil-armstrong",
  "steve-wozniak",
  "tim-berners-lee",
] as const;

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

describe.each(TARGETS)("Roster33: %s", (slug) => {
  const candidate = candidates[slug];
  const person = production[slug];

  it("has a real candidate file, evidence_approved, with sources actually recorded", () => {
    expect(hasCandidateFile(slug)).toBe(true);
    expect(candidate.status).toBe("evidence_approved");
    expect(candidate.sources.length).toBeGreaterThan(0);
  });

  it("production exists and carries exactly the candidate's row set (no more, no fewer)", () => {
    expect(person, `${slug} missing from SEED_PEOPLE`).toBeDefined();
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

  it("is publication-safe (directory-visible), independent of match eligibility", () => {
    expect(person.status).toBe("published");
    expect(person.isDirectoryVisible).toBe(true);
  });

  it("is honestly non-match-eligible -- publication was never gated on eligibility_v2", () => {
    expect(person.isMatchEligible).toBe(false);
    const report = evaluateMatchEligibility(person);
    expect(report.eligible).toBe(false);
    expect(report.reasons.length).toBeGreaterThan(0);
  });

  it("has a rights-clear, honestly-classified portrait (the actual gate that held Haruki Murakami back this cycle)", () => {
    expect(candidate.portrait?.status).toBe("found");
    expect(person.portrait).toBeDefined();
    expect(person.portrait!.url).toBeTruthy();
    expect(person.portrait!.source).toBeTruthy();
    expect(person.portrait!.license).toBeTruthy();
  });

  it("has an authored Korean display name distinct from the raw canonicalName", () => {
    const name = personDisplayName("ko-KR", person);
    expect(name).not.toBe(person.canonicalName);
    expect(name.length).toBeGreaterThan(0);
  });

  it("appears in PEOPLE_INDEX exactly once, in agreement with SEED_PEOPLE", () => {
    const inIndex = PEOPLE_INDEX.filter((p) => p.slug === slug);
    expect(inIndex).toHaveLength(1);
    expect(inIndex[0]!.isMatchEligible).toBe(false);
  });
});

describe("Roster33: cross-target identity integrity", () => {
  it("no duplicate ids, slugs, or Wikidata QIDs across all 276 production people", () => {
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

  it("SEED_PEOPLE and PEOPLE_INDEX remain in agreement (276 people as of Roster36, 2026-09-17 -- this batch itself added none of the later growth; the count reflects later roster-expansion cycles), all 14 Roster33 targets present in both", () => {
    expect(SEED_PEOPLE).toHaveLength(276);
    expect(PEOPLE_INDEX).toHaveLength(276);
    for (const slug of TARGETS) {
      expect(SEED_PEOPLE.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(PEOPLE_INDEX.filter((p) => p.slug === slug)).toHaveLength(1);
    }
  });

  it("Haruki Murakami (evidence_approved, portrait-held) was deliberately NOT promoted in Roster33 -- his evidence side was already publication-safe, the portrait gate alone excluded him", () => {
    // ROSTER34 UPDATE (2026-09-16, docs/checkpoints/roster34.md): a
    // bounded portrait-only recovery found a rights-clear Public Domain
    // photo, so Murakami IS now promoted -- in Roster34, not Roster33.
    // His candidate file's evidence/rows/confidence were untouched by that
    // recovery; only `portrait` changed. This test still documents the
    // Roster33-era state of the candidate file's evidence review, which
    // did not change, plus the current (Roster34) promotion outcome.
    const candidate = loadCandidate("haruki-murakami");
    expect(candidate.status).toBe("evidence_approved");
    expect(candidate.portrait?.status).toBe("found");
    expect(SEED_PEOPLE.some((p) => p.slug === "haruki-murakami")).toBe(true);
  });
});
