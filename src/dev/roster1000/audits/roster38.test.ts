/**
 * Roster38 (2026-09-23, docs/checkpoints/roster38.md): third new-candidate
 * roster-expansion cycle after the recent-cohort publication-vs-matching
 * architecture diagnostic (CONTINUE_EXPANSION_AS_IS classification),
 * table-driven candidate<->production equality for all 15 promoted people,
 * all freshly researched, zero backlog reuse, zero holds this cycle.
 * Mirrors roster35.test.ts/roster36.test.ts/roster37.test.ts's shape, except
 * that it deliberately does NOT assert that every addition is
 * non-match-eligible: eligibility is whatever each person's own evidence
 * produces (checked against the live `evaluateMatchEligibility`), and the
 * pre-existing eligible set is asserted untouched instead.
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
  "alfred-russel-wallace",
  "ayrton-senna",
  "david-bowie",
  "enzo-ferrari",
  "ernest-rutherford",
  "frank-lloyd-wright",
  "george-mallory",
  "isambard-kingdom-brunel",
  "james-cook",
  "jeff-bezos",
  "konrad-zuse",
  "leonhard-euler",
  "rembrandt",
  "stanley-kubrick",
  "thor-heyerdahl",
] as const;

// Backlog candidates re-inspected this cycle (no fresh information since
// Roster37; the same portrait / Oceania-region / evidence-quality blockers
// stand) -- not promoted, not silently discarded (see
// docs/checkpoints/roster38.md).
const HELD_NOT_PROMOTED = [
  "naomi-uemura",
  "edmund-hillary",
  "anita-roddick",
  "simone-de-beauvoir",
  "mimar-sinan",
] as const;

const TARGET_SET = new Set<string>(TARGETS);

function loadCandidate(slug: string): Candidate {
  return JSON.parse(readFileSync(join(process.cwd(), `data-pipeline/candidates/${slug}.json`), "utf8")) as Candidate;
}

function hasLocalPortrait(url: string): boolean {
  try {
    readFileSync(join(process.cwd(), "public", url));
    return true;
  } catch {
    return false;
  }
}

const candidates = Object.fromEntries(TARGETS.map((slug) => [slug, loadCandidate(slug)])) as Record<
  (typeof TARGETS)[number],
  Candidate
>;
const production = Object.fromEntries(
  TARGETS.map((slug) => [slug, SEED_PEOPLE.find((p) => p.slug === slug)!]),
) as Record<(typeof TARGETS)[number], (typeof SEED_PEOPLE)[number]>;

describe.each(TARGETS)("Roster38: %s", (slug) => {
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
    expect(person.canonicalName).toBe(candidate.identity.canonicalName);
    expect(person.isLiving).toBe(candidate.identity.isLiving);
  });

  it("is publication-safe (directory-visible), independent of match eligibility", () => {
    expect(person.status).toBe("published");
    expect(person.isDirectoryVisible).toBe(true);
  });

  it("has whatever match-eligibility outcome its actual evidence produces -- not assumed by any blanket rule", () => {
    const report = evaluateMatchEligibility(person);
    expect(person.isMatchEligible).toBe(report.eligible);
  });

  it("has a rights-clear, honestly-classified portrait whose local asset exists", () => {
    expect(candidate.portrait?.status).toBe("found");
    expect(person.portrait).toBeDefined();
    expect(person.portrait!.url).toBeTruthy();
    expect(person.portrait!.source).toBeTruthy();
    expect(person.portrait!.license).toBeTruthy();
    expect(person.portrait!.url).toBe(candidate.portrait!.url);
    expect(hasLocalPortrait(candidate.portrait!.url!), `${slug} portrait file missing`).toBe(true);
  });

  it("has an authored Korean display name distinct from the raw canonicalName", () => {
    const name = personDisplayName("ko-KR", person);
    expect(name).not.toBe(person.canonicalName);
    expect(name.length).toBeGreaterThan(0);
    expect(name).toBe(candidate.localization?.displayNames?.["ko-KR"]);
  });

  it("appears in PEOPLE_INDEX exactly once, in agreement with SEED_PEOPLE", () => {
    const inIndex = PEOPLE_INDEX.filter((p) => p.slug === slug);
    expect(inIndex).toHaveLength(1);
    expect(inIndex[0]!.isMatchEligible).toBe(person.isMatchEligible);
    expect(inIndex[0]!.isDirectoryVisible).toBe(person.isDirectoryVisible);
  });
});

describe("Roster38: re-inspected backlog candidates remain genuinely absent from production", () => {
  it("Naomi Uemura, Edmund Hillary, Anita Roddick, Simone de Beauvoir, and Mimar Sinan are all absent from production", () => {
    for (const slug of HELD_NOT_PROMOTED) {
      expect(SEED_PEOPLE.some((p) => p.slug === slug), `${slug} should not be in production this cycle`).toBe(false);
    }
  });

  it("Uemura and Roddick stay evidence_approved but portrait-blocked; Hillary stays evidence_approved (region-blocked)", () => {
    for (const slug of ["naomi-uemura", "anita-roddick"]) {
      const c = loadCandidate(slug);
      expect(c.status, slug).toBe("evidence_approved");
      expect(c.portrait?.status, slug).toBe("held");
    }
    const hillary = loadCandidate("edmund-hillary");
    expect(hillary.status).toBe("evidence_approved");
    expect(hillary.portrait?.status).toBe("found");
  });

  it("Simone de Beauvoir and Mimar Sinan remain genuinely held (audit-flagged prior batch, not re-promoted on reused research alone)", () => {
    for (const slug of ["simone-de-beauvoir", "mimar-sinan"]) {
      expect(loadCandidate(slug).status, slug).toBe("held");
    }
  });
});

describe("Roster38: cross-target identity integrity", () => {
  it("no duplicate ids, slugs, or Wikidata QIDs across all 393 production people", () => {
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

  it("SEED_PEOPLE and PEOPLE_INDEX remain in agreement at 393 people, all 15 Roster38 targets present in both", () => {
    expect(SEED_PEOPLE).toHaveLength(393);
    expect(PEOPLE_INDEX).toHaveLength(393);
    for (const slug of TARGETS) {
      expect(SEED_PEOPLE.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(PEOPLE_INDEX.filter((p) => p.slug === slug)).toHaveLength(1);
    }
  });

  it("the pre-existing match-eligible set is untouched: exactly 114 eligible people outside the 15 Roster38 targets", () => {
    const preExistingEligible = SEED_PEOPLE.filter((p) => p.isMatchEligible && !TARGET_SET.has(p.slug));
    expect(preExistingEligible).toHaveLength(114);
    // Whatever the targets' own evidence produces is reflected, not assumed.
    const newlyEligible = TARGETS.filter((slug) => production[slug].isMatchEligible);
    expect(SEED_PEOPLE.filter((p) => p.isMatchEligible)).toHaveLength(114 + newlyEligible.length);
  });
});
