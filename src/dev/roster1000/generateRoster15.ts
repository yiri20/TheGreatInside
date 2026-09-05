/**
 * One-time generator: converts the roster-15 coverage-aware intake batch's
 * product-ready `qa_passed` candidates into `src/data/people/roster15.ts`.
 *
 * The roster-15 cycle (2026-09) used roster-14's coverage-aware preflight as
 * the standing method: built a fresh 34-person discovery pool (19 carried
 * forward from roster-14's own preflighted-but-not-frozen pool, since none
 * of those 19 had ever been scored or given a candidate file, plus 15
 * genuinely new names), froze 12 candidates with the broadest genuine
 * behavioral evidence, and first-scored all 12 to 22-23 attributes each.
 * 8 of 12 crossed eligibility_v2 honestly — Catherine the Great, Frederick
 * the Great, James Joyce, Marlene Dietrich, Maya Angelou, Miles Davis, Nina
 * Simone, and Ruth Bader Ginsburg. Agatha Christie, Henry Ford, Thomas
 * Jefferson, and Ulysses S. Grant (all 22 scored attributes, all comfortably
 * above the 0.6 coverage floor) missed solely on the high-confidence-count
 * gate and remain `held` — a real, honest outcome given evidence for these
 * four skewed toward inference/strong_inference confidence, not a coverage
 * or attribute-count failure.
 *
 * All 8 qa_passed candidates are product-ready (real rights-clear portraits
 * sourced and verified live against Wikimedia Commons/government-archive
 * license metadata, full EN/KO editorial content, Korean display names) —
 * none are excluded for a product blocker this cycle.
 *
 * Follows `generateRoster14.ts`'s exact pattern — an explicit multi-slug
 * allowlist, NOT a blanket "every qa_passed candidate" filter, which would
 * silently re-promote Che Guevara (portrait-blocked, parked, untouched) or
 * any earlier batch's unpromoted qa_passed candidates. Never run
 * automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster15.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster15.ts");

const BATCH_15_SLUGS = new Set([
  "catherine-the-great",
  "frederick-the-great",
  "james-joyce",
  "marlene-dietrich",
  "maya-angelou",
  "miles-davis",
  "nina-simone",
  "ruth-bader-ginsburg",
]);

function loadBatch15(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_15_SLUGS.has(c.slug))
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
  const candidates = loadBatch15();

  // Fail closed: the allowlist must resolve to exactly the expected number
  // of qa_passed candidates, not fewer, not more, not an ambiguous one.
  if (candidates.length !== BATCH_15_SLUGS.size) {
    console.error(
      `Expected ${BATCH_15_SLUGS.size} qa_passed batch-15 candidate(s), found ${candidates.length}. Aborting.`,
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
 * ROSTER 15 — coverage-aware intake batch (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed) via
 * \`src/dev/roster1000/generateRoster15.ts\`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline every earlier roster batch uses.
 *
 * This cycle used roster-14's coverage-aware preflight as the standing
 * method (>=21-22-attribute-capable evidence required before freezing,
 * no baseWeight-driven attribute selection, no post-validator rescue).
 * Froze 12 candidates from a fresh 34-person discovery pool, scored every
 * one to 22-23 attributes. 8 of 12 crossed \`eligibility_v2\` honestly on
 * first score — Catherine the Great, Frederick the Great, James Joyce,
 * Marlene Dietrich, Maya Angelou, Miles Davis, Nina Simone, and Ruth Bader
 * Ginsburg. Agatha Christie, Henry Ford, Thomas Jefferson, and Ulysses S.
 * Grant (all 22 scored attributes, all coverage >=0.648) missed solely on
 * the high-confidence-count gate, not coverage or attribute count, and
 * remain \`held\` -- a real, honest first-scoring outcome, not a rescue
 * candidate. Full record: \`docs/checkpoints/roster15-coverage-aware-intake.md\`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_15: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
