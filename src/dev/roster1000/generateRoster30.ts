/**
 * ROSTER 30 — twenty-person zero-politics fast production batch, seventh
 * real use of the profile-publication / match-eligibility separation
 * architecture (PR #21,
 * `docs/checkpoints/profile-publication-vs-match-eligibility.md`).
 *
 * Fixed twenty-candidate intake, mechanically selected from the existing
 * `data-pipeline/candidates/*.json` held pool only — no new candidate
 * discovery, no new behavioral research (portrait research is the sole
 * permitted new research, per this cycle's brief). Deliberately corrects a
 * recent Directory composition imbalance: this batch contains ZERO people
 * whose primary historical significance is political leadership, state
 * rule, military command, or political/civil-rights activism. Prioritized
 * existing evidence viability first, then broad public recognizability,
 * then domain-balancing value, then geographic/cultural diversity, spanning
 * science, mathematics, medicine, literature, philosophy, visual art,
 * architecture, photography, business/entrepreneurship, athletics, and
 * exploration. All twenty were `held` solely because of `eligibility_v2`'s
 * numeric floors (none for evidence-integrity reasons — the same 22-slug
 * Group-B exclusion Roster28/29 established remains excluded, none of which
 * are in this roster) and each received a targeted row-by-row evidence-
 * approval audit, moving to `evidence_approved`. Two RUBRIC_CORRECTIONs
 * (Barbara McClintock and Frederick Sanger's `analytical_rigor` rows, both
 * narrowed off an outcome-based "eventual Nobel vindication implies rigor"
 * inference the project's own scoring discipline does not support) — see
 * each candidate JSON's own provenance notes and
 * `docs/checkpoints/roster30-twenty-person-zero-politics-batch.md`. No
 * candidate was rescued toward eligibility; `eligibility_v2` was not
 * touched.
 *
 * Same architecture as `generateRoster29.ts`:
 * - explicit literal slug allowlist (below), never a blanket filter;
 * - loads candidates regardless of whether status is `evidence_approved`
 *   or `qa_passed`;
 * - calls `preparePersonSeedForPromotion(candidate)`, NOT `toPersonSeed()`
 *   directly, and never checks `computedEligibility.eligible`;
 * - lets `build()` compute `isMatchEligible` untouched and relies on
 *   `preparePersonSeedForPromotion()`'s own `directoryVisible: true`
 *   default.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster30.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { preparePersonSeedForPromotion, checkPromotionReadiness, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster30.ts");

// Explicit literal allowlist — exactly the 20 fixed roster30 candidates.
// Never a blanket "every evidence_approved/qa_passed candidate" filter.
const ROSTER_30_SLUGS = new Set([
  "barbara-mcclintock",
  "chien-shiung-wu",
  "frederick-sanger",
  "hypatia",
  "jean-francois-champollion",
  "mary-shelley",
  "omar-khayyam",
  "mary-anning",
  "al-khwarizmi",
  "baruch-spinoza",
  "sebastiao-salgado",
  "jrr-tolkien",
  "antoni-gaudi",
  "georgia-okeeffe",
  "andrew-carnegie",
  "madam-cj-walker",
  "jesse-owens",
  "roald-amundsen",
  "paul-erdos",
]);

function loadRoster30(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => (c.status === "evidence_approved" || c.status === "qa_passed") && ROSTER_30_SLUGS.has(c.slug))
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
  const candidates = loadRoster30();

  if (candidates.length !== ROSTER_30_SLUGS.size) {
    console.error(`Expected ${ROSTER_30_SLUGS.size} promotable roster30 candidate(s), found ${candidates.length}. Aborting.`);
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
 * ROSTER 30 — twenty-person zero-politics fast production batch, seventh
 * real use of the profile-publication / match-eligibility separation
 * architecture (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` via
 * \`src/dev/roster1000/generateRoster30.ts\`, which calls
 * \`preparePersonSeedForPromotion()\` per candidate — NOT \`toPersonSeed()\`
 * directly — and never checks \`computedEligibility.eligible\`. All twenty
 * are \`evidence_approved\`. Every score's rationale is preserved as the
 * inline comment above its Row. Full record:
 * \`docs/checkpoints/roster30-twenty-person-zero-politics-batch.md\`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_30: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
