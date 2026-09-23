/**
 * ROSTER 38 -- third fresh new-candidate cycle after the recent-cohort
 * publication-vs-matching architecture diagnostic (CONTINUE_EXPANSION_AS_IS
 * classification). Continues the roster24-37 new-candidate lane.
 *
 * 15 people promoted here, all freshly researched, all evidence_approved,
 * zero backlog reuse, zero holds this cycle -- Naomi Uemura, Edmund Hillary,
 * Anita Roddick, Simone de Beauvoir and Mimar Sinan were re-inspected and
 * remain genuinely blocked (see docs/checkpoints/roster38.md).
 *
 * Same architecture as `generateRoster37.ts`:
 * - explicit literal slug allowlist (below), never a blanket filter;
 * - loads candidates regardless of whether status is `evidence_approved`
 *   or `qa_passed`;
 * - calls `preparePersonSeedForPromotion(candidate)`, NOT `toPersonSeed()`
 *   directly, and never checks `computedEligibility.eligible`;
 * - lets `build()` compute `isMatchEligible` untouched.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster38.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { preparePersonSeedForPromotion, checkPromotionReadiness, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster38.ts");

// Explicit literal allowlist -- the 15 Roster38 promotions, all freshly
// researched this cycle, zero holds.
const ROSTER_38_SLUGS = new Set([
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
]);

function loadRoster38(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => (c.status === "evidence_approved" || c.status === "qa_passed") && ROSTER_38_SLUGS.has(c.slug))
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
  const candidates = loadRoster38();

  if (candidates.length !== ROSTER_38_SLUGS.size) {
    console.error(`Expected ${ROSTER_38_SLUGS.size} promotable roster38 candidate(s), found ${candidates.length}. Aborting.`);
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
 * ROSTER 38 -- third fresh new-candidate cycle after the recent-cohort
 * publication-vs-matching architecture diagnostic (${candidates.length}
 * people, all freshly researched, zero backlog reuse -- see
 * docs/checkpoints/roster38.md).
 *
 * Generated from \`data-pipeline/candidates/*.json\` via
 * \`src/dev/roster1000/generateRoster38.ts\`, which calls
 * \`preparePersonSeedForPromotion()\` per candidate -- NOT \`toPersonSeed()\`
 * directly -- and never checks \`computedEligibility.eligible\`. All are
 * \`evidence_approved\` as an honest result of evidence-grounded scoring --
 * none targeted eligibility_v2. Every score's rationale is preserved as
 * the inline comment above its Row.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_38: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
