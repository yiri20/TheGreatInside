/**
 * ROSTER 24 — first production use of the profile-publication / match-
 * eligibility separation architecture (PR #21,
 * `docs/checkpoints/profile-publication-vs-match-eligibility.md`).
 *
 * Giuseppe Garibaldi (roster22) and Anton Chekhov (roster23) were both
 * deeply, multi-provenance researched and both honestly fail
 * `eligibility_v2` (17/14 scored attributes, coverage 0.501/0.416,
 * high-confidence count 9/7 — all short of the 18/0.6/12 floors). Neither
 * was rescued: no row was added, no score/confidence/evidenceType was
 * raised to chase eligibility. Instead, this cycle ran a row-by-row
 * evidence-approval audit (see each candidate JSON's `provenance.notes`
 * and `docs/checkpoints/roster24-evidence-approved-publications.md`),
 * found both profiles honestly supported as scored, and moved their
 * status from `held` (held only because of `eligibility_v2`) to
 * `evidence_approved`.
 *
 * Unlike every generator through `generateRoster16.ts`, this one:
 * - uses an explicit literal slug allowlist (below), never a blanket
 *   "every evidence_approved/qa_passed candidate" filter;
 * - loads candidates regardless of whether status is `evidence_approved`
 *   or `qa_passed` — both are promotable;
 * - calls `preparePersonSeedForPromotion(candidate)`, NOT `toPersonSeed()`
 *   directly, and never checks `computedEligibility.eligible` — promotion
 *   readiness and match eligibility are independent checks by design;
 * - lets `build()` compute `isMatchEligible` untouched (expected `false`
 *   for both) and relies on `preparePersonSeedForPromotion()`'s own
 *   `directoryVisible: true` default for an ordinary publication.
 *
 * Do NOT copy `generateRoster1.ts`-`generateRoster16.ts`'s gating logic
 * into a future generator — see `docs/adding-a-person.md`.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster24.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { preparePersonSeedForPromotion, checkPromotionReadiness, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster24.ts");

// Explicit literal allowlist — exactly the 2 candidates evidence-approved
// this cycle. Never a blanket "every evidence_approved candidate" filter.
const ROSTER_24_SLUGS = new Set(["giuseppe-garibaldi", "anton-chekhov"]);

function loadRoster24(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => (c.status === "evidence_approved" || c.status === "qa_passed") && ROSTER_24_SLUGS.has(c.slug))
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
  const candidates = loadRoster24();

  if (candidates.length !== ROSTER_24_SLUGS.size) {
    console.error(`Expected ${ROSTER_24_SLUGS.size} promotable roster24 candidate(s), found ${candidates.length}. Aborting.`);
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
 * ROSTER 24 — first production use of the profile-publication / match-
 * eligibility separation architecture (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: evidence_approved)
 * via \`src/dev/roster1000/generateRoster24.ts\`, which calls
 * \`preparePersonSeedForPromotion()\` per candidate — NOT \`toPersonSeed()\`
 * directly — and never checks \`computedEligibility.eligible\`. Both people
 * below honestly fail \`eligibility_v2\` (unchanged, unremediated) and are
 * published + directory-visible + non-match-eligible by design. Every
 * score's rationale is preserved as the inline comment above its Row, same
 * as every earlier roster batch. Full record:
 * \`docs/checkpoints/roster24-evidence-approved-publications.md\`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_24: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
