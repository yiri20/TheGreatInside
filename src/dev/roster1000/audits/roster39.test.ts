/**
 * Roster39 (2026-09-26, docs/checkpoints/roster39.md): fourth new-candidate
 * roster-expansion cycle after the recent-cohort publication-vs-matching
 * architecture diagnostic (CONTINUE_EXPANSION_AS_IS classification),
 * table-driven candidate<->production equality for all 15 promoted people,
 * all freshly researched, zero backlog reuse, zero holds this cycle.
 * Mirrors roster38.test.ts's shape (adding an editorial-coverage check),
 * and like it deliberately does NOT assert that every addition is
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
import { editorialText } from "../../../core/i18n/editorial.js";
import type { Candidate } from "../candidateSchema.js";
import { hasCandidateFile } from "./matchPoolIntegrityAudit.js";

const TARGETS = [
  "antonie-van-leeuwenhoek",
  "babe-ruth",
  "buster-keaton",
  "christopher-wren",
  "frederic-chopin",
  "george-frideric-handel",
  "j-p-morgan",
  "james-watt",
  "johan-cruyff",
  "joseph-lister",
  "niki-lauda",
  "philo-farnsworth",
  "rene-descartes",
  "robert-goddard",
  "william-herschel",
] as const;

// Backlog candidates NOT retried this cycle (no concrete new signal since
// Roster38; the same portrait / Oceania-region / evidence-quality blockers
// stand) -- not promoted, not silently discarded (see
// docs/checkpoints/roster39.md).
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

describe.each(TARGETS)("Roster39: %s", (slug) => {
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

  it("has EN+KO editorial: every text/interpretation key resolves in both locales, every source and trait reference is real", () => {
    const editorial = person.editorial;
    expect(editorial, `${slug} has no editorial`).toBeDefined();
    const items = [...(editorial!.achievements ?? []), ...(editorial!.moments ?? []), ...(editorial!.turningPoints ?? [])];
    expect(items.length).toBeGreaterThan(0);
    const sourceIds = new Set(person.sources.map((s) => s.id));
    const attributeIds = new Set(person.attributes.map((a) => a.attributeId));
    for (const item of items) {
      for (const locale of ["en-US", "ko-KR"] as const) {
        expect(editorialText(locale, item.textKey), `${item.id} ${locale} text`).toBeTruthy();
        if (item.interpretationKey) {
          expect(editorialText(locale, item.interpretationKey), `${item.id} ${locale} interpretation`).toBeTruthy();
        }
      }
      for (const id of item.sourceIds ?? []) expect(sourceIds.has(id), `${item.id} source ${id}`).toBe(true);
      if (item.interpretationKey) {
        expect(item.attributeId, `${item.id} interpretation without attributeId`).toBeDefined();
        expect(attributeIds.has(item.attributeId!), `${item.id} attribute ${item.attributeId} is not a scored row`).toBe(true);
      }
    }
  });

  it("appears in PEOPLE_INDEX exactly once, in agreement with SEED_PEOPLE", () => {
    const inIndex = PEOPLE_INDEX.filter((p) => p.slug === slug);
    expect(inIndex).toHaveLength(1);
    expect(inIndex[0]!.isMatchEligible).toBe(person.isMatchEligible);
    expect(inIndex[0]!.isDirectoryVisible).toBe(person.isDirectoryVisible);
  });
});

describe("Roster39: known backlog blockers remain genuinely absent from production", () => {
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

describe("Roster39: cross-target identity integrity", () => {
  it("no duplicate ids, slugs, or Wikidata QIDs across all 449 production people", () => {
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

  it("SEED_PEOPLE and PEOPLE_INDEX remain in agreement at 449 people, all 15 Roster39 targets present in both", () => {
    expect(SEED_PEOPLE).toHaveLength(449);
    expect(PEOPLE_INDEX).toHaveLength(449);
    for (const slug of TARGETS) {
      expect(SEED_PEOPLE.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(PEOPLE_INDEX.filter((p) => p.slug === slug)).toHaveLength(1);
    }
  });

  it("the pre-existing match-eligible set is untouched: exactly 114 eligible people outside the 15 Roster39 targets", () => {
    const preExistingEligible = SEED_PEOPLE.filter((p) => p.isMatchEligible && !TARGET_SET.has(p.slug));
    expect(preExistingEligible).toHaveLength(114);
    // Whatever the targets' own evidence produces is reflected, not assumed.
    const newlyEligible = TARGETS.filter((slug) => production[slug].isMatchEligible);
    expect(SEED_PEOPLE.filter((p) => p.isMatchEligible)).toHaveLength(114 + newlyEligible.length);
  });
});
