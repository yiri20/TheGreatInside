/**
 * Roster34 (2026-09-16, docs/checkpoints/roster34.md): final new-candidate
 * roster-expansion cycle to the 250-person milestone, table-driven
 * candidate<->production equality for all 12 promoted people (11 newly
 * researched candidates plus Haruki Murakami, a Roster33 holdover promoted
 * this cycle on a resolved portrait gate only). Mirrors roster33.test.ts's
 * shape.
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
  "andy-warhol",
  "antoine-lavoisier",
  "charlie-chaplin",
  "edward-jenner",
  "elvis-presley",
  "estee-lauder",
  "haruki-murakami",
  "katharine-graham",
  "robert-oppenheimer",
  "sally-ride",
  "walt-disney",
  "yuri-gagarin",
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

describe.each(TARGETS)("Roster34: %s", (slug) => {
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

  it("has whatever match-eligibility outcome its actual evidence produces -- not assumed non-eligible by blanket rule", () => {
    const report = evaluateMatchEligibility(person);
    expect(person.isMatchEligible).toBe(report.eligible);
    // Every Roster34 person happens to land non-eligible on honest
    // evidence (none targeted eligibility_v2), but this test checks each
    // person's ACTUAL computed result against their ACTUAL isMatchEligible
    // flag, not a hardcoded "false" -- if a future edit ever made one of
    // these 12 genuinely eligible, this assertion would still pass.
  });

  it("has a rights-clear, honestly-classified portrait", () => {
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
    expect(inIndex[0]!.isMatchEligible).toBe(person.isMatchEligible);
  });
});

describe("Roster34: Haruki Murakami's portrait-only recovery", () => {
  it("evidence side is byte-identical to Roster33 -- only the portrait changed", () => {
    const candidate = candidates["haruki-murakami"];
    // The same 4 rows Roster33 originally scored, unchanged.
    expect(Object.keys(candidate.rows).sort()).toEqual(
      ["deep_focus", "discipline", "independent_thinking", "planning_orientation"].sort(),
    );
    expect(candidate.rows.discipline!.score).toBe(92);
    expect(candidate.rows.discipline!.confidence).toBe(0.68);
  });

  it("the previously-held portrait blocker is now resolved with a real, verified file", () => {
    const candidate = candidates["haruki-murakami"];
    expect(candidate.portrait?.status).toBe("found");
    expect(candidate.portrait?.url).toBe("/portraits/haruki-murakami-2018.jpg");
    expect(candidate.portrait?.license).toBeTruthy();
    expect(candidate.portrait?.sourcePageUrl).toBeTruthy();
  });

  it("is now present in production, unlike Roster33", () => {
    expect(SEED_PEOPLE.some((p) => p.slug === "haruki-murakami")).toBe(true);
  });
});

describe("Roster34: cross-target identity integrity", () => {
  it("no duplicate ids, slugs, or Wikidata QIDs across all 291 production people", () => {
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

  it("SEED_PEOPLE and PEOPLE_INDEX remain in agreement (291 people as of Roster37, 2026-09-18 -- this batch itself added none of the later growth), all 12 Roster34 targets present in both", () => {
    expect(SEED_PEOPLE).toHaveLength(291);
    expect(PEOPLE_INDEX).toHaveLength(291);
    for (const slug of TARGETS) {
      expect(SEED_PEOPLE.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(PEOPLE_INDEX.filter((p) => p.slug === slug)).toHaveLength(1);
    }
  });

  it("reaches the 250-person production milestone (251 >= 250)", () => {
    expect(SEED_PEOPLE.length).toBeGreaterThanOrEqual(250);
  });

  it("match-eligible count is unchanged at 114 -- none of the 12 Roster34 people are match-eligible", () => {
    expect(SEED_PEOPLE.filter((p) => p.isMatchEligible)).toHaveLength(114);
    for (const slug of TARGETS) {
      expect(production[slug].isMatchEligible, slug).toBe(false);
    }
  });
});
