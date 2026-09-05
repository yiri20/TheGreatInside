/**
 * One-time generator: converts the roster-17 intake cycle's product-ready
 * `qa_passed` candidate into `src/data/people/roster17.ts`.
 *
 * The roster-17 cycle (2026-09) followed the roster16 breadth+depth preflight
 * method against a genuinely fresh discovery pool (13 candidates, all
 * verified via a live Wikidata QID check, none previously present in the
 * 251-file candidate corpus or the live roster). Deliberately scaled to a
 * smaller-than-usual batch: 8 candidates classified STRONG_BREADTH_AND_DEPTH
 * were frozen and scored using a single-source-per-person research pass
 * (a live Wikipedia fetch plus known biographical works), not the deeper
 * multi-source research prior successful batches used. Honest result: only
 * John von Neumann (23 scored attributes, coverage 0.695) crossed
 * `eligibility_v2` on first score. The other 7 -- Andrei Sakharov, J. R. R.
 * Tolkien, George Bernard Shaw, Thurgood Marshall, Dolores Huerta, and Paul
 * Erdős -- are `held` purely on scored-attribute-count/coverage, not on
 * weak underlying evidence; each `holdReason` names what a deeper pass would
 * need. Edmund Hillary and Tenzing Norgay were set aside before scoring due
 * to a genuine taxonomy gap discovered this cycle: New Zealand/Oceania has
 * no corresponding `region.*` id in this project's 11-region taxonomy, and
 * this generator does not unilaterally add one. Full record:
 * `docs/checkpoints/roster17-intake-and-safety.md`.
 *
 * Follows `generateRoster16.ts`'s exact pattern -- an explicit slug
 * allowlist, NOT a blanket "every qa_passed candidate" filter. Never run
 * automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster17.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster17.ts");

// Exact allowlist: the sole product-ready qa_passed candidate from this
// cycle. Sakharov/Tolkien/Shaw/Marshall/Huerta/Erdős are qa_passed-eligible
// evidence but remain candidate-only (held) -- deliberately excluded here.
const BATCH_17_SLUGS = new Set(["john-von-neumann"]);

function loadBatch17(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_17_SLUGS.has(c.slug))
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
  const seed = toPersonSeed(candidate);
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
    externalIdentity: { wikidataId: ${tsString(candidate.identity.wikidataId ?? "")} },
    ${
      seed.portrait
        ? `portrait: {
      url: ${tsString(seed.portrait.url)},
      source: ${tsString(seed.portrait.source)},
      license: ${tsString(seed.portrait.license)},
      ${seed.portrait.width !== undefined ? `width: ${seed.portrait.width},\n      ` : ""}${seed.portrait.height !== undefined ? `height: ${seed.portrait.height},\n      ` : ""}${seed.portrait.licenseUrl !== undefined ? `licenseUrl: ${tsString(seed.portrait.licenseUrl)},\n      ` : ""}${seed.portrait.attribution !== undefined ? `attribution: ${tsString(seed.portrait.attribution)},\n      ` : ""}${seed.portrait.attributionUrl !== undefined ? `attributionUrl: ${tsString(seed.portrait.attributionUrl)},\n      ` : ""}${seed.portrait.kind !== undefined ? `kind: ${tsString(seed.portrait.kind)},\n      ` : ""}
    },\n    `
        : ""
    }sources: [${seed.sources.map((s) => renderSource(s.id, s.kind, s.title, s.url)).join(", ")}],
    rows: {
${rowLines}
    },
  }`;
}

function main() {
  const candidates = loadBatch17();

  // Fail closed: the allowlist must resolve to exactly the expected number
  // of qa_passed candidates, not fewer, not more, not an ambiguous one.
  if (candidates.length !== BATCH_17_SLUGS.size) {
    console.error(
      `Expected ${BATCH_17_SLUGS.size} qa_passed batch-17 candidate(s), found ${candidates.length}. Aborting.`,
    );
    process.exitCode = 1;
    return;
  }
  for (const c of candidates) {
    if (c.status !== "qa_passed") {
      console.error(`Candidate "${c.slug}" is not qa_passed (status="${c.status}"). Aborting.`);
      process.exitCode = 1;
      return;
    }
    if (!c.identity?.canonicalName || !c.identity?.wikidataId) {
      console.error(`Candidate "${c.slug}" is missing a required identity field. Aborting.`);
      process.exitCode = 1;
      return;
    }
    if (!c.computedEligibility?.eligible) {
      console.error(`Candidate "${c.slug}" does not carry a cached eligible=true snapshot. Aborting.`);
      process.exitCode = 1;
      return;
    }
    if (!c.portrait || c.portrait.status !== "found") {
      console.error(`Candidate "${c.slug}" has no product-ready portrait. Aborting.`);
      process.exitCode = 1;
      return;
    }
  }

  const source = `/**
 * ROSTER 17 — 2026-09 intake (${candidates.length} person).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed) via
 * \`src/dev/roster1000/generateRoster17.ts\`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline every earlier roster batch uses.
 *
 * This was a deliberately scaled-down cycle: 13 genuinely new candidates
 * discovered and QID-verified, 8 classified STRONG_BREADTH_AND_DEPTH and
 * frozen, scored using a single-source-per-person research pass. Only John
 * von Neumann crossed \`eligibility_v2\` honestly on first score (23 scored
 * attributes, coverage 0.695). The other 7 frozen candidates remain
 * \`held\` purely on scored-attribute-count/coverage -- a real, honest
 * outcome from a shallower research pass than this project's usual
 * standard, not from weak underlying evidence. Full record:
 * \`docs/checkpoints/roster17-intake-and-safety.md\`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_17: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
