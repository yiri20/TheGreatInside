/**
 * Roster60 (2026-10-31, docs/checkpoints/roster60.md): the sixth 30-candidate
 * roster, eighth after the 500-person scale checkpoint (EXPANSION_GREEN),
 * twenty-fifth new-candidate cycle and nineteenth run under the Major
 * Achievement Selection Standard. Table-driven candidate<->production equality
 * for the 7 promoted people (all freshly researched, zero backlog reuse; the
 * 23 frozen holds stay unpromoted). It deliberately does NOT assert that every
 * addition is non-match-eligible: eligibility is whatever each person's own
 * evidence produces (checked against the live `evaluateMatchEligibility`), and
 * the pre-existing eligible set is asserted untouched instead.
 *
 * The editorial-significance test below is STRUCTURAL only (achievements
 * exist, keys resolve, no raw internal ids leak into rendered prose).
 * Historical significance itself is a human editorial review gate and is
 * deliberately not scored by any numeric heuristic.
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
import { findProductionMatches } from "../identityGate.js";

const TARGETS = [
  "andres-bello",
  "hafez",
  "kip-keino",
  "lee-kun-hee",
  "muhammad-abduh",
  "osamu-tezuka",
  "salif-keita",
] as const;

// Backlog candidates NOT retried this cycle (no concrete new signal since
// Roster41; the same portrait / Oceania-region / evidence-quality blockers
// stand) -- not promoted, not silently discarded (see
// docs/checkpoints/roster51.md).
const HELD_NOT_PROMOTED = [
  "naomi-uemura",
  "edmund-hillary",
  "anita-roddick",
  "simone-de-beauvoir",
  "mimar-sinan",
  "claude-shannon",
  // Roster42 hold: researched and evidence_approved, but no portrait with a
  // resolved rights basis (see docs/checkpoints/roster42.md).
  "beatrix-potter",
  // Roster43 hold: researched and evidence_approved, but no portrait with a
  // resolved rights basis (see docs/checkpoints/roster43.md).
  "louis-sullivan",
  // Roster46 hold: researched and evidence_approved, but no portrait with a
  // resolved rights basis (see docs/checkpoints/roster46.md).
  "henry-royce",
  // Roster51 holds: researched and evidence_approved, but no portrait with a
  // resolved rights basis (see docs/checkpoints/roster51.md).
  "ferruccio-lamborghini",
  "caravaggio",
  // Roster51 hold: researched and evidence_approved, but no portrait with a
  // resolved rights basis (see docs/checkpoints/roster51.md).
  "erwin-schrodinger",
  // Roster51 hold: researched and evidence_approved, but no authenticated
  // portrait exists (see docs/checkpoints/roster51.md).
  "robert-hooke",
  // Roster51 holds: researched and evidence_approved, but no rights-clear portrait
  // (see docs/checkpoints/roster51.md).
  "kurt-godel",
  "maryam-mirzakhani",
  // Roster54 holds: researched and evidence_approved, but no rights-clear portrait
  // (see docs/checkpoints/roster54.md).
  "stephen-jay-gould",
  "irene-joliot-curie",
  // Roster55 holds: researched and evidence_approved, but no rights-clear portrait
  // (see docs/checkpoints/roster55.md).
  "adam-smith",
  "albert-camus",
  "b-f-skinner",
  "bela-bartok",
  "daniel-kahneman",
  "dante-alighieri",
  "karl-popper",
  "paul-klee",
  // Roster56 holds: researched and evidence_approved, but no rights-clear portrait
  // (see docs/checkpoints/roster56.md).
  "amrita-sher-gil",
  "heitor-villa-lobos",
  "mary-leakey",
  "paulo-freire",
  "sergei-korolev",
  // Roster57 holds: researched and evidence_approved, but no rights-clear portrait
  // (see docs/checkpoints/roster57.md).
  "aliko-dangote",
  "benjamin-cardozo",
  "mary-kom",
  "mary-mcleod-bethune",
  "mirza-ghalib",
  "satyendra-nath-bose",
  "savitribai-phule",
  "youssef-chahine",
  // Roster58 holds: researched and evidence_approved, but no rights-clear portrait
  // (see docs/checkpoints/roster58.md).
  "abdul-sattar-edhi",
  "antonio-carlos-jobim",
  "bernardo-houssay",
  "carlos-chagas",
  "hassan-fathy",
  "ignatius-of-loyola",
  "j-r-d-tata",
  "masaru-ibuka",
  "mo-ibrahim",
  "nikolai-vavilov",
  "verghese-kurien",
  // Roster59 holds: researched and evidence_approved, but no rights-clear portrait
  // (see docs/checkpoints/roster59.md).
  "al-razi",
  "amadou-hampate-ba",
  "cesar-milstein",
  "dhirubhai-ambani",
  "dhyan-chand",
  "ferdowsi",
  "hans-kelsen",
  "li-shizhen",
  "luis-barragan",
  "luis-federico-leloir",
  "premchand",
  "thomas-odhiambo",
  // Roster60 holds: researched and evidence_approved, but no rights-clear portrait
  // (see docs/checkpoints/roster60.md).
  "al-kindi",
  "al-zahrawi",
  "alisher-navoi",
  "azim-premji",
  "cesar-lattes",
  "clarice-lispector",
  "dogen",
  "evliya-celebi",
  "fa-xian",
  "garrincha",
  "ibn-arabi",
  "jang-yeong-sil",
  "kabir",
  "nain-singh-rawat",
  "r-k-narayan",
  "roger-milla",
  "salim-ali",
  "sayyid-ahmad-khan",
  "shen-kuo",
  "violeta-parra",
  "vital-brazil",
  "wifredo-lam",
  "yi-hwang",
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

describe.each(TARGETS)("Roster60: %s", (slug) => {
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

describe("Roster60: known backlog blockers remain genuinely absent from production", () => {
  it("Naomi Uemura, Edmund Hillary, Anita Roddick, Simone de Beauvoir, Mimar Sinan, the Roster41 hold Claude Shannon, the Roster42 hold Beatrix Potter, the Roster43 hold Louis Sullivan, the Roster46 hold Henry Royce and the Roster47 holds Ferruccio Lamborghini and Caravaggio the Roster48 hold Erwin Schrodinger and the Roster51 hold Robert Hooke are all absent from production", () => {
    for (const slug of HELD_NOT_PROMOTED) {
      expect(SEED_PEOPLE.some((p) => p.slug === slug), `${slug} should not be in production this cycle`).toBe(false);
    }
  });

  it("Uemura and Roddick stay evidence_approved but portrait-blocked; Hillary stays evidence_approved (region-blocked)", () => {
    for (const slug of ["naomi-uemura", "anita-roddick", "amrita-sher-gil", "heitor-villa-lobos", "mary-leakey", "paulo-freire", "sergei-korolev", "aliko-dangote", "benjamin-cardozo", "mary-kom", "mary-mcleod-bethune", "mirza-ghalib", "satyendra-nath-bose", "savitribai-phule", "youssef-chahine", "abdul-sattar-edhi", "antonio-carlos-jobim", "bernardo-houssay", "carlos-chagas", "hassan-fathy", "ignatius-of-loyola", "j-r-d-tata", "masaru-ibuka", "mo-ibrahim", "nikolai-vavilov", "verghese-kurien", "al-razi", "amadou-hampate-ba", "cesar-milstein", "dhirubhai-ambani", "dhyan-chand", "ferdowsi", "hans-kelsen", "li-shizhen", "luis-barragan", "luis-federico-leloir", "premchand", "thomas-odhiambo", "al-kindi", "al-zahrawi", "alisher-navoi", "azim-premji", "cesar-lattes", "clarice-lispector", "dogen", "evliya-celebi", "fa-xian", "garrincha", "ibn-arabi", "jang-yeong-sil", "kabir", "nain-singh-rawat", "r-k-narayan", "roger-milla", "salim-ali", "sayyid-ahmad-khan", "shen-kuo", "violeta-parra", "vital-brazil", "wifredo-lam", "yi-hwang"]) {
      const c = loadCandidate(slug);
      expect(c.status, slug).toBe("evidence_approved");
      expect(c.portrait?.status, slug).toBe("held");
    }
    const hillary = loadCandidate("edmund-hillary");
    expect(hillary.status).toBe("evidence_approved");
    expect(hillary.portrait?.status).toBe("found");
  });

  it("Claude Shannon stays evidence_approved but portrait-held (not promoted on an unresolved rights basis)", () => {
    const shannon = loadCandidate("claude-shannon");
    expect(shannon.status).toBe("evidence_approved");
    expect(shannon.portrait?.status).toBe("held");
  });

  it("Beatrix Potter stays evidence_approved but portrait-held (not promoted on an unresolved rights basis)", () => {
    const potter = loadCandidate("beatrix-potter");
    expect(potter.status).toBe("evidence_approved");
    expect(potter.portrait?.status).toBe("held");
  });

  it("Louis Sullivan stays evidence_approved but portrait-held (not promoted on an unresolved rights basis)", () => {
    const sullivan = loadCandidate("louis-sullivan");
    expect(sullivan.status).toBe("evidence_approved");
    expect(sullivan.portrait?.status).toBe("held");
  });

  it("Henry Royce stays evidence_approved but portrait-held (not promoted on an unresolved rights basis)", () => {
    const royce = loadCandidate("henry-royce");
    expect(royce.status).toBe("evidence_approved");
    expect(royce.portrait?.status).toBe("held");
  });

  it("Ferruccio Lamborghini and Caravaggio stay evidence_approved but portrait-held (not promoted on an unresolved rights basis)", () => {
    for (const slug of ["ferruccio-lamborghini", "caravaggio"]) {
      const c = loadCandidate(slug);
      expect(c.status, slug).toBe("evidence_approved");
      expect(c.portrait?.status, slug).toBe("held");
    }
  });

  it("Erwin Schrodinger stays evidence_approved but portrait-held (not promoted on an unresolved rights basis)", () => {
    const c = loadCandidate("erwin-schrodinger");
    expect(c.status).toBe("evidence_approved");
    expect(c.portrait?.status).toBe("held");
  });

  it("Robert Hooke stays evidence_approved but portrait-held (no authenticated portrait; not promoted)", () => {
    const c = loadCandidate("robert-hooke");
    expect(c.status).toBe("evidence_approved");
    expect(c.portrait?.status).toBe("held");
  });

  it("the Roster54, Roster55, Roster56, Roster57, Roster58, Roster59 and Roster60 portrait holds stay evidence_approved but portrait-held (not promoted)", () => {
    for (const slug of ["stephen-jay-gould", "irene-joliot-curie", "adam-smith", "albert-camus", "b-f-skinner", "bela-bartok", "daniel-kahneman", "dante-alighieri", "karl-popper", "paul-klee", "amrita-sher-gil", "heitor-villa-lobos", "mary-leakey", "paulo-freire", "sergei-korolev", "aliko-dangote", "benjamin-cardozo", "mary-kom", "mary-mcleod-bethune", "mirza-ghalib", "satyendra-nath-bose", "savitribai-phule", "youssef-chahine", "abdul-sattar-edhi", "antonio-carlos-jobim", "bernardo-houssay", "carlos-chagas", "hassan-fathy", "ignatius-of-loyola", "j-r-d-tata", "masaru-ibuka", "mo-ibrahim", "nikolai-vavilov", "verghese-kurien", "al-razi", "amadou-hampate-ba", "cesar-milstein", "dhirubhai-ambani", "dhyan-chand", "ferdowsi", "hans-kelsen", "li-shizhen", "luis-barragan", "luis-federico-leloir", "premchand", "thomas-odhiambo", "al-kindi", "al-zahrawi", "alisher-navoi", "azim-premji", "cesar-lattes", "clarice-lispector", "dogen", "evliya-celebi", "fa-xian", "garrincha", "ibn-arabi", "jang-yeong-sil", "kabir", "nain-singh-rawat", "r-k-narayan", "roger-milla", "salim-ali", "sayyid-ahmad-khan", "shen-kuo", "violeta-parra", "vital-brazil", "wifredo-lam", "yi-hwang"]) {
      const c = loadCandidate(slug);
      expect(c.status, slug).toBe("evidence_approved");
      expect(c.portrait?.status, slug).toBe("held");
    }
  });

  it("kurt-godel stays evidence_approved but portrait-held (not promoted)", () => {
    const c = loadCandidate("kurt-godel");
    expect(c.status).toBe("evidence_approved");
    expect(c.portrait?.status).toBe("held");
  });

  it("maryam-mirzakhani stays evidence_approved but portrait-held (not promoted)", () => {
    const c = loadCandidate("maryam-mirzakhani");
    expect(c.status).toBe("evidence_approved");
    expect(c.portrait?.status).toBe("held");
  });

  it("Simone de Beauvoir and Mimar Sinan remain genuinely held (audit-flagged prior batch, not re-promoted on reused research alone)", () => {
    for (const slug of ["simone-de-beauvoir", "mimar-sinan"]) {
      expect(loadCandidate(slug).status, slug).toBe("held");
    }
  });
});

describe("Roster60: cross-target identity integrity", () => {
  it("no duplicate ids, slugs, or Wikidata QIDs across all 644 production people", () => {
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

  it("SEED_PEOPLE and PEOPLE_INDEX remain in agreement at 644 people, all 7 Roster60 targets present in both", () => {
    expect(SEED_PEOPLE).toHaveLength(644);
    expect(PEOPLE_INDEX).toHaveLength(644);
    for (const slug of TARGETS) {
      expect(SEED_PEOPLE.filter((p) => p.slug === slug)).toHaveLength(1);
      expect(PEOPLE_INDEX.filter((p) => p.slug === slug)).toHaveLength(1);
    }
  });

  it("the pre-existing match-eligible set is untouched: exactly 114 eligible people outside the 7 Roster60 targets", () => {
    const preExistingEligible = SEED_PEOPLE.filter((p) => p.isMatchEligible && !TARGET_SET.has(p.slug));
    expect(preExistingEligible).toHaveLength(114);
    // Whatever the targets' own evidence produces is reflected, not assumed.
    const newlyEligible = TARGETS.filter((slug) => production[slug].isMatchEligible);
    expect(SEED_PEOPLE.filter((p) => p.isMatchEligible)).toHaveLength(114 + newlyEligible.length);
  });
});

describe("Roster60: Major Achievement structural checks", () => {
  // Raw internal identifiers must never leak into rendered editorial prose:
  // source ids (src_...), attribute ids (snake_case), or unresolved keys.
  const RAW_ID = /src_[a-z0-9_]+|[a-z]+_[a-z]+(?:_[a-z]+)*/;

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
          expect(RAW_ID.test(text!), `${key} ${locale} leaks a raw internal id: ${text!.match(RAW_ID)?.[0]}`).toBe(false);
        }
      }
    }
  });
});

describe("Roster60: fresh-roster identity integrity (no target is already another production person)", () => {
  // Roster58 found five "fresh" candidates that were already production people
  // under legacy entries with empty Wikidata IDs. This compares every target
  // against every OTHER production person by slug, normalized name, alias,
  // token-set and QID, so the same human cannot enter production twice.
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

  it.each(HELD_NOT_PROMOTED.filter((s) => hasCandidateFile(s)))("held %s is not already a production person under another name, alias or QID", (slug) => {
    const identity = (loadCandidate(slug) as unknown as { identity: { canonicalName: string; aliases?: string[]; wikidataId?: string } }).identity;
    const matches = findProductionMatches(all, {
      slug,
      names: [identity.canonicalName, ...(identity.aliases ?? [])],
      qid: identity.wikidataId,
    }).filter((m) => m.tier !== "review");
    expect(matches, slug).toEqual([]);
  });
});
