/**
 * Roster35 (2026-09-16, docs/checkpoints/roster35.md): first new-candidate
 * roster-expansion cycle after the 250-person performance checkpoint
 * (EXPANSION_GREEN classification), table-driven candidate<->production
 * equality for all 11 promoted people (9 freshly-researched candidates plus
 * 2 re-reviewed backlog reuses, John von Neumann and Jocelyn Bell Burnell).
 * Mirrors roster33.test.ts/roster34.test.ts's shape.
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
  "alexander-von-humboldt",
  "carl-linnaeus",
  "ella-fitzgerald",
  "ingmar-bergman",
  "jocelyn-bell-burnell",
  "john-von-neumann",
  "larry-page",
  "michael-jordan",
  "salvador-dali",
  "sam-walton",
  "tenzing-norgay",
] as const;

// Explicitly held this cycle, NOT promoted -- each for a genuine,
// documented, non-evidence-quality-in-the-same-sense blocker (see
// docs/checkpoints/roster35.md for the full reasoning per person).
const HELD_NOT_PROMOTED = ["edmund-hillary", "anita-roddick", "simone-de-beauvoir", "mimar-sinan"] as const;

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

describe.each(TARGETS)("Roster35: %s", (slug) => {
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

describe("Roster35: held candidates were genuinely not promoted", () => {
  it("Edmund Hillary, Anita Roddick, Simone de Beauvoir, and Mimar Sinan are all absent from production", () => {
    for (const slug of HELD_NOT_PROMOTED) {
      expect(SEED_PEOPLE.some((p) => p.slug === slug), `${slug} should not be in production this cycle`).toBe(false);
    }
  });

  it("Edmund Hillary's candidate file is evidence_approved (held on a taxonomy gap, not an evidence problem)", () => {
    const candidate = loadCandidate("edmund-hillary");
    expect(candidate.status).toBe("evidence_approved");
    expect(candidate.portrait?.status).toBe("found");
  });

  it("Anita Roddick's candidate file is evidence_approved (held on the portrait gate only)", () => {
    const candidate = loadCandidate("anita-roddick");
    expect(candidate.status).toBe("evidence_approved");
    expect(candidate.portrait?.status).toBe("held");
  });

  it("Simone de Beauvoir and Mimar Sinan remain genuinely held (an audit-flagged prior batch, not re-promoted on reused research alone)", () => {
    for (const slug of ["simone-de-beauvoir", "mimar-sinan"]) {
      const candidate = loadCandidate(slug);
      expect(candidate.status, slug).toBe("held");
    }
  });
});

describe("Roster35: cross-target identity integrity", () => {
  it("no duplicate ids, slugs, or Wikidata QIDs across all 262 production people", () => {
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

  it("SEED_PEOPLE and PEOPLE_INDEX remain in agreement at 262 people, all 11 Roster35 targets present in both", () => {
    expect(SEED_PEOPLE).toHaveLength(262);
    expect(PEOPLE_INDEX).toHaveLength(262);
    for (const slug of TARGETS) {
      expect(SEED_PEOPLE.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(PEOPLE_INDEX.filter((p) => p.slug === slug)).toHaveLength(1);
    }
  });

  it("match-eligible count is unchanged at 114 -- none of the 11 Roster35 people are match-eligible", () => {
    expect(SEED_PEOPLE.filter((p) => p.isMatchEligible)).toHaveLength(114);
    for (const slug of TARGETS) {
      expect(production[slug].isMatchEligible, slug).toBe(false);
    }
  });
});
