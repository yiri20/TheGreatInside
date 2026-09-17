/**
 * ROSTER 35 -- first new-candidate expansion cycle after the 250-person
 * performance checkpoint (EXPANSION_GREEN classification). Continues the
 * roster24-34 new-candidate lane.
 *
 * 11 people promoted here: 9 freshly-researched candidates (Tenzing
 * Norgay, Michael Jordan, Sam Walton, Larry Page, Ella Fitzgerald, Ingmar
 * Bergman, Salvador Dali, Carl Linnaeus, Alexander von Humboldt) plus 2
 * reused backlog candidates whose evidence was re-reviewed and found
 * genuinely publication-ready (John von Neumann, Jocelyn Bell Burnell --
 * see docs/checkpoints/roster35.md for the re-review reasoning on each).
 *
 * 4 candidates were frozen but explicitly held, not replaced with a
 * surprise substitute:
 * - edmund-hillary: evidence_approved, but this project's 11-region
 *   taxonomy has no Oceania/Pacific bucket (an identity/taxonomy blocker,
 *   not an evidence problem -- matches the exact roster-17 precedent
 *   documented in docs/checkpoints/roster.md).
 * - anita-roddick: evidence_approved, but the only Commons photo of her
 *   is an unusable multi-person group shot (a portrait-gate blocker,
 *   same pattern as Roster33's Haruki Murakami).
 * - simone-de-beauvoir, mimar-sinan: both from the same prior "Session-11"
 *   candidate batch that a subsequent audit found had eligibility-gaming
 *   history and still carries output/achievement-based inference rows
 *   inconsistent with the scoring rubric -- re-reviewed and left held
 *   rather than promoted on reused research alone.
 *
 * Same architecture as `generateRoster34.ts`:
 * - explicit literal slug allowlist (below), never a blanket filter;
 * - loads candidates regardless of whether status is `evidence_approved`
 *   or `qa_passed`;
 * - calls `preparePersonSeedForPromotion(candidate)`, NOT `toPersonSeed()`
 *   directly, and never checks `computedEligibility.eligible`;
 * - lets `build()` compute `isMatchEligible` untouched.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster35.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { preparePersonSeedForPromotion, checkPromotionReadiness, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster35.ts");

// Explicit literal allowlist -- the 11 Roster35 promotions (9 fresh + 2
// re-reviewed backlog reuses). Edmund Hillary, Anita Roddick, Simone de
// Beauvoir, and Mimar Sinan are deliberately NOT included -- see the file
// header and docs/checkpoints/roster35.md for each one's specific,
// honest blocker.
const ROSTER_35_SLUGS = new Set([
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
]);

function loadRoster35(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => (c.status === "evidence_approved" || c.status === "qa_passed") && ROSTER_35_SLUGS.has(c.slug))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

function tsString(s: string): string {
  return JSON.stringify(s);
}

function tsStringArray(arr: readonly string[]): string {
  return `[${arr.map(tsString).join(", ")}]`;
}

function renderSource(id: string, kind: string, title: string, url?: string): string {
  const fields = [`id: ${tsString(id)}`, `kind: ${tsString(kind)}`, `title: ${tsString(title)}`];
  if (url) fields.push(`url: ${tsString(url)}`);
  return `{ ${fields.join(", ")} }`;
}

function renderPerson(candidate: Candidate): string {
  // The actual future promotion path: fails closed via
  // checkPromotionReadiness() internally, defaults directoryVisible: true,
  // never reads computedEligibility.eligible.
  const seed = preparePersonSeedForPromotion(candidate);
  const rows = Object.entries(candidate.rows) as Array<[AttributeId, CandidateAttributeRow]>;
  const rowLines = rows
    .map(([attributeId, row]) => {
      const evCode = { documented: "d", strong_inference: "s", inference: "i" }[row.evidenceType];
      const imCode = { advantage: "A", dual_edged: "D", risk: "R", neutral: "N" }[row.impact];
      return `      // ${row.rationale}\n      ${attributeId}: [${row.score}, ${row.confidence}, "${evCode}", "${imCode}"],`;
    })
    .join("\n");

  return `  {
    id: ${tsString(seed.id)},
    slug: ${tsString(seed.slug)},
    canonicalName: ${tsString(seed.canonicalName)},
    ${seed.aliases ? `aliases: ${tsStringArray(seed.aliases)},\n    ` : ""}birthYear: ${seed.birthYear},
    ${seed.deathYear !== undefined ? `deathYear: ${seed.deathYear},\n    ` : ""}isLiving: ${seed.isLiving},
    era: ${tsString(seed.era)},
    nationalityCodes: ${tsStringArray(seed.nationalityCodes)},
    regionCode: ${tsString(seed.regionCode)},
    ${seed.historicalPolityKey ? `historicalPolityKey: ${tsString(seed.historicalPolityKey)},\n    ` : ""}occupationIds: ${tsStringArray(seed.occupationIds)},
    fieldIds: ${tsStringArray(seed.fieldIds)},
    impactDomains: ${tsStringArray(seed.impactDomains)},
    tagIds: ${tsStringArray(seed.tagIds)},
    archetypeIds: ${tsStringArray(seed.archetypeIds)},
    ${seed.externalIdentity ? `externalIdentity: { wikidataId: ${tsString(seed.externalIdentity.wikidataId ?? "")} },\n    ` : ""}${
      seed.portrait
        ? `portrait: {
      url: ${tsString(seed.portrait.url)},
      source: ${tsString(seed.portrait.source)},
      license: ${tsString(seed.portrait.license)},
      ${seed.portrait.width !== undefined ? `width: ${seed.portrait.width},\n      ` : ""}${seed.portrait.height !== undefined ? `height: ${seed.portrait.height},\n      ` : ""}${seed.portrait.licenseUrl !== undefined ? `licenseUrl: ${tsString(seed.portrait.licenseUrl)},\n      ` : ""}${seed.portrait.attribution !== undefined ? `attribution: ${tsString(seed.portrait.attribution)},\n      ` : ""}${seed.portrait.attributionUrl !== undefined ? `attributionUrl: ${tsString(seed.portrait.attributionUrl)},\n      ` : ""}${seed.portrait.kind !== undefined ? `kind: ${tsString(seed.portrait.kind)},\n      ` : ""}
    },\n    `
        : ""
    }directoryVisible: ${seed.directoryVisible},
    sources: [${seed.sources.map((s) => renderSource(s.id, s.kind, s.title, s.url)).join(", ")}],
    rows: {
${rowLines}
    },
  }`;
}

function main() {
  const candidates = loadRoster35();

  if (candidates.length !== ROSTER_35_SLUGS.size) {
    console.error(`Expected ${ROSTER_35_SLUGS.size} promotable roster35 candidate(s), found ${candidates.length}. Aborting.`);
    process.exitCode = 1;
    return;
  }
  for (const c of candidates) {
    // Fails closed on status/identity/portrait -- deliberately does NOT
    // check computedEligibility.eligible (see file header).
    const readiness = checkPromotionReadiness(c);
    if (!readiness.ready) {
      console.error(`Candidate "${c.slug}" is not ready for promotion: ${readiness.reasons.join("; ")}. Aborting.`);
      process.exitCode = 1;
      return;
    }
  }

  const source = `/**
 * ROSTER 35 -- first new-candidate expansion cycle after the 250-person
 * performance checkpoint (${candidates.length} people: 9 freshly-researched
 * candidates plus 2 re-reviewed backlog reuses, John von Neumann and
 * Jocelyn Bell Burnell -- see docs/checkpoints/roster35.md).
 *
 * Generated from \`data-pipeline/candidates/*.json\` via
 * \`src/dev/roster1000/generateRoster35.ts\`, which calls
 * \`preparePersonSeedForPromotion()\` per candidate -- NOT \`toPersonSeed()\`
 * directly -- and never checks \`computedEligibility.eligible\`. All are
 * \`evidence_approved\` and non-match-eligible as an honest result of
 * evidence-grounded scoring -- none targeted eligibility_v2. Every score's
 * rationale is preserved as the inline comment above its Row.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_35: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
