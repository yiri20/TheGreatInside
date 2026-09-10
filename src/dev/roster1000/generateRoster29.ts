/**
 * ROSTER 29 — fifteen-person fast production batch, sixth real use of the
 * profile-publication / match-eligibility separation architecture (PR #21,
 * `docs/checkpoints/profile-publication-vs-match-eligibility.md`).
 *
 * Fixed fifteen-candidate intake, mechanically selected from the existing
 * `data-pipeline/candidates/*.json` held pool only — no new candidate
 * discovery, no new behavioral research (portrait research is the sole
 * permitted new research, per this cycle's brief). Prioritized existing
 * evidence viability first, then broad public recognizability among
 * evidence-viable candidates, spanning: literature, philosophy, science,
 * visual art, performing arts, sports, social reform/activism, business,
 * and politics — eight world regions and six eras (ancient through
 * contemporary). All fifteen were `held` solely because of
 * `eligibility_v2`'s numeric floors (none for evidence-integrity reasons —
 * the same 22-candidate Group-B exclusion Roster28 established remains
 * excluded, none of which are in this roster) and each received a
 * targeted row-by-row evidence-approval audit, moving to
 * `evidence_approved`. Zero RUBRIC_CORRECTIONs and zero ERROR_CORRECTIONs
 * were needed — every row already passed the audit as originally scored.
 * See each candidate JSON's own provenance notes and
 * `docs/checkpoints/roster29-fifteen-person-fast-batch.md`. No candidate
 * was rescued toward eligibility; `eligibility_v2` was not touched.
 *
 * Same architecture as `generateRoster28.ts`:
 * - explicit literal slug allowlist (below), never a blanket filter;
 * - loads candidates regardless of whether status is `evidence_approved`
 *   or `qa_passed`;
 * - calls `preparePersonSeedForPromotion(candidate)`, NOT `toPersonSeed()`
 *   directly, and never checks `computedEligibility.eligible`;
 * - lets `build()` compute `isMatchEligible` untouched and relies on
 *   `preparePersonSeedForPromotion()`'s own `directoryVisible: true`
 *   default.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster29.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { preparePersonSeedForPromotion, checkPromotionReadiness, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster29.ts");

// Explicit literal allowlist — exactly the 15 fixed roster29 candidates.
// Never a blanket "every evidence_approved/qa_passed candidate" filter.
const ROSTER_29_SLUGS = new Set([
  "gabriel-garcia-marquez",
  "murasaki-shikibu",
  "zora-neale-hurston",
  "seneca",
  "jean-piaget",
  "ibn-al-haytham",
  "dorothea-lange",
  "katherine-dunham",
  "wilma-rudolph",
  "william-wilberforce",
  "desmond-tutu",
  "ratan-tata",
  "indira-gandhi",
  "ulysses-s-grant",
  "suleiman-the-magnificent",
]);

function loadRoster29(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => (c.status === "evidence_approved" || c.status === "qa_passed") && ROSTER_29_SLUGS.has(c.slug))
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
  const candidates = loadRoster29();

  if (candidates.length !== ROSTER_29_SLUGS.size) {
    console.error(`Expected ${ROSTER_29_SLUGS.size} promotable roster29 candidate(s), found ${candidates.length}. Aborting.`);
    process.exitCode = 1;
    return;
  }
  for (const c of candidates) {
    // Fails closed on status/identity/portrait — deliberately does NOT
    // check computedEligibility.eligible (see file header).
    const readiness = checkPromotionReadiness(c);
    if (!readiness.ready) {
      console.error(`Candidate "${c.slug}" is not ready for promotion: ${readiness.reasons.join("; ")}. Aborting.`);
      process.exitCode = 1;
      return;
    }
  }

  const source = `/**
 * ROSTER 29 — fifteen-person fast production batch, sixth real use of the
 * profile-publication / match-eligibility separation architecture
 * (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` via
 * \`src/dev/roster1000/generateRoster29.ts\`, which calls
 * \`preparePersonSeedForPromotion()\` per candidate — NOT \`toPersonSeed()\`
 * directly — and never checks \`computedEligibility.eligible\`. All fifteen
 * are \`evidence_approved\`. Every score's rationale is preserved as the
 * inline comment above its Row. Full record:
 * \`docs/checkpoints/roster29-fifteen-person-fast-batch.md\`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_29: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
