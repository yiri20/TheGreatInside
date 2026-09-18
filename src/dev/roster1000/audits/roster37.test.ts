/**
 * Roster37 (2026-09-18, docs/checkpoints/roster37.md): second new-candidate
 * roster-expansion cycle after the recent-cohort publication-vs-matching
 * architecture diagnostic (CONTINUE_EXPANSION_AS_IS classification),
 * table-driven candidate<->production equality for all 15 promoted people,
 * all freshly researched, zero backlog reuse, zero holds this cycle.
 * Mirrors roster35.test.ts/roster36.test.ts's shape.
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
  "alexander-graham-bell",
  "alfred-nobel",
  "audrey-hepburn",
  "carl-friedrich-gauss",
  "charles-lindbergh",
  "claude-monet",
  "george-eastman",
  "guglielmo-marconi",
  "gustave-eiffel",
  "howard-hughes",
  "james-clerk-maxwell",
  "johann-sebastian-bach",
  "johannes-kepler",
  "karl-benz",
  "marilyn-monroe",
] as const;

// Re-checked this cycle, still genuinely blocked -- not promoted, not
// silently discarded (see docs/checkpoints/roster37.md for detail per
// person).
const HELD_NOT_PROMOTED = [
  "naomi-uemura",
  "edmund-hillary",
  "anita-roddick",
  "simone-de-beauvoir",
  "mimar-sinan",
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

describe.each(TARGETS)("Roster37: %s", (slug) => {
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

describe("Roster37: held candidates remain genuinely absent from production", () => {
  it("Naomi Uemura, Edmund Hillary, Anita Roddick, Simone de Beauvoir, and Mimar Sinan are all absent from production", () => {
    for (const slug of HELD_NOT_PROMOTED) {
      expect(SEED_PEOPLE.some((p) => p.slug === slug), `${slug} should not be in production this cycle`).toBe(false);
    }
  });

  it("Naomi Uemura's candidate file is evidence_approved (still held on the portrait gate -- re-checked this cycle, nothing new found)", () => {
    const candidate = loadCandidate("naomi-uemura");
    expect(candidate.status).toBe("evidence_approved");
    expect(candidate.portrait?.status).toBe("held");
  });

  it("Edmund Hillary's candidate file is evidence_approved (still held on the Oceania taxonomy gap -- re-checked this cycle, no region added)", () => {
    const candidate = loadCandidate("edmund-hillary");
    expect(candidate.status).toBe("evidence_approved");
    expect(candidate.portrait?.status).toBe("found");
  });

  it("Anita Roddick's candidate file is evidence_approved (still held on the portrait gate -- re-checked this cycle, nothing new found)", () => {
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

describe("Roster37: cross-target identity integrity", () => {
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

  it("SEED_PEOPLE and PEOPLE_INDEX remain in agreement at 291 people, all 15 Roster37 targets present in both", () => {
    expect(SEED_PEOPLE).toHaveLength(291);
    expect(PEOPLE_INDEX).toHaveLength(291);
    for (const slug of TARGETS) {
      expect(SEED_PEOPLE.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(PEOPLE_INDEX.filter((p) => p.slug === slug)).toHaveLength(1);
    }
  });

  it("match-eligible count is unchanged at 114 -- none of the 15 Roster37 people are match-eligible", () => {
    expect(SEED_PEOPLE.filter((p) => p.isMatchEligible)).toHaveLength(114);
    for (const slug of TARGETS) {
      expect(production[slug].isMatchEligible, slug).toBe(false);
    }
  });
});
