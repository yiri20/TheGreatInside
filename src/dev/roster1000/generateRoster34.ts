/**
 * ROSTER 34 -- new-candidate roster-expansion cycle, final push toward the
 * 250-person milestone (continues the roster24-33 new-expansion lane; the
 * legacy-integrity remediation program stays paused and untouched by this
 * file).
 *
 * 11 new candidates were frozen before research began, targeting this
 * roster's field-category priorities (4 building_discovery, 4 arts_culture,
 * 3 science_knowledge). All 11 cleared both the evidence-approval AND
 * portrait-rights gates and are promoted here.
 *
 * Haruki Murakami (a pre-existing Roster33 candidate held solely on the
 * portrait gate, evidence side already publication-safe/evidence_approved)
 * received a bounded portrait-only recovery this cycle -- a rights-clear
 * Public Domain photo was found (Ecuador's Ministry of Culture and
 * Heritage, via Wikimedia Commons) -- so he is now promoted alongside the
 * 11 new candidates. No behavioral research was redone, no row was
 * rescored, no trait was added, and no confidence was changed for him this
 * cycle -- only `portrait` changed.
 *
 * Zero-politics screening was applied to all 11 new candidates at selection
 * time (none excluded post-freeze; none has a primary political/state/
 * military/activist identity). This does NOT apply retroactively to the
 * paused legacy-integrity cohort.
 *
 * Same architecture as `generateRoster33.ts`:
 * - explicit literal slug allowlist (below), never a blanket filter;
 * - loads candidates regardless of whether status is `evidence_approved`
 *   or `qa_passed`;
 * - calls `preparePersonSeedForPromotion(candidate)`, NOT `toPersonSeed()`
 *   directly, and never checks `computedEligibility.eligible`;
 * - lets `build()` compute `isMatchEligible` untouched and relies on
 *   `preparePersonSeedForPromotion()`'s own `directoryVisible: true`
 *   default.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster34.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { preparePersonSeedForPromotion, checkPromotionReadiness, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster34.ts");

// Explicit literal allowlist -- the 11 new Roster34 candidates plus Haruki
// Murakami (a Roster33 holdover, promoted now that his portrait gate is
// resolved -- see the file header).
const ROSTER_34_SLUGS = new Set([
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
]);

function loadRoster34(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => (c.status === "evidence_approved" || c.status === "qa_passed") && ROSTER_34_SLUGS.has(c.slug))
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
  const candidates = loadRoster34();

  if (candidates.length !== ROSTER_34_SLUGS.size) {
    console.error(`Expected ${ROSTER_34_SLUGS.size} promotable roster34 candidate(s), found ${candidates.length}. Aborting.`);
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
 * ROSTER 34 -- new-candidate roster-expansion cycle, final push toward the
 * 250-person milestone (${candidates.length} people: 11 newly-researched
 * candidates plus Haruki Murakami, a Roster33 holdover promoted now that
 * his portrait gate is resolved).
 *
 * Generated from \`data-pipeline/candidates/*.json\` via
 * \`src/dev/roster1000/generateRoster34.ts\`, which calls
 * \`preparePersonSeedForPromotion()\` per candidate -- NOT \`toPersonSeed()\`
 * directly -- and never checks \`computedEligibility.eligible\`. All are
 * \`evidence_approved\` and non-match-eligible by evidence outcome (not by
 * design -- none were rescued or targeted toward eligibility). Every
 * score's rationale is preserved as the inline comment above its Row.
 * Full record: \`docs/checkpoints/roster34.md\`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_34: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
