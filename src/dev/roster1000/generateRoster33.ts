/**
 * ROSTER 33 -- new-candidate roster-expansion cycle (return to the
 * pre-legacy-integrity roster24-32 lane; the legacy-integrity remediation
 * program, batches 1-5, stays paused and untouched by this file).
 *
 * 15 candidates were frozen before research began, targeting this
 * roster's weakest interest-area pools (building_discovery, arts_culture,
 * science_knowledge). 14 of the 15 cleared the evidence-approval AND
 * portrait-rights gates and are promoted here; the 15th (Haruki Murakami)
 * has an evidence-approved, publication-safe profile but no rights-clear
 * portrait was found this cycle, so he correctly fails
 * `checkPromotionReadiness()` on the portrait gate alone and is NOT in
 * this allowlist -- his candidate file stays `evidence_approved` with
 * `portrait.status: "held"`, ready for a future cycle's dedicated
 * portrait search.
 *
 * Two of the 14 (Josephine Baker, Jonas Salk) are pre-existing candidates
 * from the roster-1000/roster-19 era that were reused and deepened this
 * cycle rather than researched from scratch -- both had a genuine,
 * concrete blocker (Baker: no portrait; Salk: thin evidence base) that
 * was actually resolved this cycle (Baker: portrait found; Salk: new
 * Sabin-rivalry research added, tagged `[NEW_EVIDENCE, Roster33]`), not
 * mechanically promoted.
 *
 * Zero-politics screening was applied to all 15 candidates at selection
 * time (none excluded post-freeze). This does NOT apply retroactively to
 * the paused legacy-integrity cohort.
 *
 * Same architecture as `generateRoster32.ts`:
 * - explicit literal slug allowlist (below), never a blanket filter;
 * - loads candidates regardless of whether status is `evidence_approved`
 *   or `qa_passed`;
 * - calls `preparePersonSeedForPromotion(candidate)`, NOT `toPersonSeed()`
 *   directly, and never checks `computedEligibility.eligible`;
 * - lets `build()` compute `isMatchEligible` untouched and relies on
 *   `preparePersonSeedForPromotion()`'s own `directoryVisible: true`
 *   default.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster33.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { preparePersonSeedForPromotion, checkPromotionReadiness, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster33.ts");

// Explicit literal allowlist -- exactly the 14 of 15 frozen Roster33
// candidates that cleared both evidence-approval and the portrait-rights
// gate this cycle. Haruki Murakami is deliberately NOT included here: his
// evidence pack is publication-safe but no rights-clear portrait was
// found, so he legitimately fails checkPromotionReadiness() on that gate
// alone (see his candidate file's provenance.notes).
const ROSTER_33_SLUGS = new Set([
  "alexander-fleming",
  "alfred-hitchcock",
  "bill-gates",
  "bob-dylan",
  "carl-sagan",
  "dmitri-mendeleev",
  "ferdinand-magellan",
  "freddie-mercury",
  "jacques-cousteau",
  "jonas-salk",
  "josephine-baker",
  "neil-armstrong",
  "steve-wozniak",
  "tim-berners-lee",
]);

function loadRoster33(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => (c.status === "evidence_approved" || c.status === "qa_passed") && ROSTER_33_SLUGS.has(c.slug))
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
  const candidates = loadRoster33();

  if (candidates.length !== ROSTER_33_SLUGS.size) {
    console.error(`Expected ${ROSTER_33_SLUGS.size} promotable roster33 candidate(s), found ${candidates.length}. Aborting.`);
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
 * ROSTER 33 -- new-candidate roster-expansion cycle (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` via
 * \`src/dev/roster1000/generateRoster33.ts\`, which calls
 * \`preparePersonSeedForPromotion()\` per candidate -- NOT \`toPersonSeed()\`
 * directly -- and never checks \`computedEligibility.eligible\`. All are
 * \`evidence_approved\` and non-match-eligible by design; none were rescued
 * toward eligibility. Every score's rationale is preserved as the inline
 * comment above its Row. Full record: \`docs/checkpoints/roster33.md\`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_33: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
