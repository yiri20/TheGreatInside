/**
 * Roster69 audit (skeleton created by `wireRoster.ts`; REVIEW before merging -- see "Review checklist").
 * Table-driven candidate<->production equality for the 26 promoted people; the 4 frozen
 * hold(s) stay unpromoted.
 *
 * It deliberately does NOT assert that every addition is non-match-eligible: eligibility is whatever each
 * person's own evidence produces (checked against the live `evaluateMatchEligibility`), and the pre-existing
 * eligible set is asserted untouched instead.
 *
 * Current-roster counts are NOT hard-coded here: SEED_PEOPLE / PEOPLE_INDEX agreement is relational, and the
 * pinned totals live only in `currentRosterManifest.ts` (checked by `currentRosterState.test.ts`).
 *
 * Review checklist (human/agent, not automated): replace the generic hold assertion below with one that reflects
 * the ACTUAL blocker type of each hold (portrait rights -> portrait held; evidence/attribution -> status held);
 * the editorial-significance test is STRUCTURAL only, historical significance is a human review gate.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../../data/people/seed.js";
import { PEOPLE_INDEX } from "../../../data/people/peopleIndex.generated.js";
import { evaluateMatchEligibility } from "../../../core/matching/similarity.js";
import { personDisplayName } from "../../../core/i18n/index.js";
import { editorialText } from "../../../core/i18n/editorial.js";
import { findRawAttributeIds } from "../../../core/people/editorialRawIds.js";
import type { Candidate } from "../candidateSchema.js";
import { hasCandidateFile } from "./matchPoolIntegrityAudit.js";
import { findProductionMatches } from "../identityGate.js";

const TARGETS = [
  "anagarika-dharmapala",
  "andrea-palladio",
  "angelica-kauffman",
  "berthe-morisot",
  "charles-sturt",
  "ethel-smyth",
  "evangelista-torricelli",
  "gian-lorenzo-bernini",
  "harriet-chalmers-adams",
  "henri-becquerel",
  "hermann-weyl",
  "jean-francois-de-la-perouse",
  "kate-sheppard",
  "langston-hughes",
  "maria-gaetana-agnesi",
  "marie-anne-paulze-lavoisier",
  "mary-church-terrell",
  "matteo-ricci",
  "menelik-ii",
  "mirza-taqi-khan-amir-kabir",
  "nellie-melba",
  "ole-r-mer",
  "qiu-jin",
  "sofonisba-anguissola",
  "sophia-jex-blake",
  "zitkala-sa",
] as const;

// Frozen candidates held this cycle (researched and kept, NOT promoted).
const HELD: readonly string[] = [
  "emily-warren-roebling",
  "fanny-mendelssohn",
  "m-visvesvaraya",
  "tom-mboya",
];

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

describe.each(TARGETS)("Roster69: %s", (slug) => {
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

  it("candidate and production classification (fieldIds, occupationIds, regionCode) agree -- never narrowed to satisfy a guard", () => {
    expect([...person.fieldIds]).toEqual(candidate.classification.fieldIds);
    expect([...person.occupationIds]).toEqual(candidate.classification.occupationIds);
    expect(person.regionCode).toBe(candidate.identity.regionCode);
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

describe("Roster69: cross-target identity integrity", () => {
  it("no duplicate ids, slugs, or Wikidata QIDs across all production people", () => {
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

  it("SEED_PEOPLE and PEOPLE_INDEX remain in agreement at the current roster size, all 26 Roster69 targets present in both", () => {
    expect(PEOPLE_INDEX).toHaveLength(SEED_PEOPLE.length);
    for (const slug of TARGETS) {
      expect(SEED_PEOPLE.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(PEOPLE_INDEX.filter((p) => p.slug === slug)).toHaveLength(1);
    }
  });

  it("the targets' own evidence decides their eligibility: every other match-eligible person is unaffected", () => {
    const preExistingEligible = SEED_PEOPLE.filter((p) => p.isMatchEligible && !TARGET_SET.has(p.slug));
    const newlyEligible = TARGETS.filter((slug) => production[slug].isMatchEligible);
    expect(SEED_PEOPLE.filter((p) => p.isMatchEligible)).toHaveLength(preExistingEligible.length + newlyEligible.length);
  });
});

describe("Roster69: Major Achievement structural checks", () => {
  // Raw internal attribute ids must never leak into rendered editorial prose. Detection is the shared string
  // scanner (`findRawAttributeIds`), not a per-audit regex.
  it.each(TARGETS)("%s has >=1 Achievement whose keys resolve in EN and KO, with no raw internal ids", (slug) => {
    const person = production[slug];
    const achievements = person.editorial?.achievements ?? [];
    expect(achievements.length, `${slug} needs at least one Achievement`).toBeGreaterThanOrEqual(1);
    const items = [...achievements, ...(person.editorial?.moments ?? []), ...(person.editorial?.turningPoints ?? [])];
    for (const item of items) {
      const keys = [item.textKey, ...(item.interpretationKey ? [item.interpretationKey] : [])];
      for (const key of keys) {
        for (const locale of ["en-US", "ko-KR"] as const) {
          const text = editorialText(locale, key);
          expect(text, `${key} ${locale}`).toBeTruthy();
          expect(findRawAttributeIds(text!), `${key} ${locale} leaks a raw attribute id`).toEqual([]);
        }
      }
    }
  });
});

describe("Roster69: fresh-roster identity integrity (no target is already another production person)", () => {
  const all = SEED_PEOPLE as unknown as Parameters<typeof findProductionMatches>[0];
  it.each(TARGETS)("%s does not match any other production person by name, alias, slug or QID", (slug) => {
    const self = all.find((p) => p.slug === slug)!;
    expect(self, slug).toBeDefined();
    const others = all.filter((p) => p.id !== self.id);
    const matches = findProductionMatches(others, {
      slug: self.slug,
      names: [self.canonicalName, ...(self.aliases ?? [])],
      qid: self.externalIdentity?.wikidataId,
    }).filter((m) => m.tier !== "review");
    expect(matches, slug).toEqual([]);
  });
});

if (HELD.length > 0) {
  describe("Roster69: frozen holds stay out of production", () => {
    it.each(HELD)("held %s is not in production and has its candidate file kept", (slug) => {
      expect(SEED_PEOPLE.some((p) => p.slug === slug), `${slug} must stay out of production`).toBe(false);
      expect(hasCandidateFile(slug), `${slug} candidate file must be kept`).toBe(true);
    });

    // All four Roster69 holds are PORTRAIT-rights holds, not evidence holds: the research is complete and kept
    // (candidate status stays evidence_approved, the repository convention), the portrait is explicitly held with a
    // recorded blocker, and no portrait asset was shipped for them.
    it.each(HELD)("held %s is a portrait hold: evidence rows kept, portrait held with an exact blocker, no asset shipped", (slug) => {
      const c = loadCandidate(slug);
      expect(c.status).toBe("evidence_approved");
      expect(Object.keys(c.rows).length).toBeGreaterThanOrEqual(5);
      expect(c.portrait?.status).toBe("held");
      expect((c.portrait as { reason?: string }).reason?.length ?? 0).toBeGreaterThan(40);
      expect(c.portrait?.url, `${slug} must not carry a shipped portrait url`).toBeUndefined();
      expect(hasLocalPortrait(`/portraits/${slug}.jpg`)).toBe(false);
    });

    it.each(HELD)("held %s is not already a production person under another name, alias or QID", (slug) => {
      const identity = (loadCandidate(slug) as unknown as { identity: { canonicalName: string; aliases?: string[]; wikidataId?: string } }).identity;
      const all = SEED_PEOPLE as unknown as Parameters<typeof findProductionMatches>[0];
      const matches = findProductionMatches(all, {
        slug,
        names: [identity.canonicalName, ...(identity.aliases ?? [])],
        qid: identity.wikidataId,
      }).filter((m) => m.tier !== "review");
      expect(matches, slug).toEqual([]);
    });
  });
}
