/**
 * One-time generator: converts the roster-16 final coverage-and-confidence-
 * aware intake batch's product-ready `qa_passed` candidates into
 * `src/data/people/roster16.ts`.
 *
 * The roster-16 cycle (2026-09) refined the coverage-aware preflight with a
 * second, depth-focused question: not just breadth (>=22 plausible
 * attributes) but also depth (>=12 of those genuinely supportable at
 * confidence around the high-confidence threshold via repeated/independent/
 * multi-source-class/multi-life-period evidence). Built a fresh 27-person
 * discovery pool, froze 12 candidates with both strong breadth and depth
 * estimates in a fixed deterministic order, and first-scored all 12 to
 * 22-23 attributes each. 11 of 12 crossed `eligibility_v2` honestly on
 * first score. Katharine Hepburn cleared every other gate (22 scored
 * attributes, coverage 0.642, 14 high-confidence rows) but her
 * high-confidence average (0.54) fell just under the 0.55 threshold -- a
 * genuinely different miss pattern than any earlier cycle's held
 * candidates, and remains `held`.
 *
 * Only 9 production slots remained before the 125-person target. Per the
 * frozen deterministic intake order, the first 9 of the 11 qa_passed
 * candidates are promoted here; Nellie Bly and Carl Jung are qa_passed but
 * deferred solely because the target was reached -- not held, not
 * portrait-blocked, fully eligible for a future cycle if the target is
 * ever raised.
 *
 * All 9 promoted candidates are product-ready (real rights-clear portraits
 * sourced and verified live against Wikimedia Commons/Library of Congress/
 * Rijksmuseum/DPLA license metadata, full EN/KO editorial content, Korean
 * display names) -- none are excluded for a product blocker this cycle.
 *
 * Follows `generateRoster15.ts`'s exact pattern -- an explicit multi-slug
 * allowlist, NOT a blanket "every qa_passed candidate" filter, which would
 * silently pull in Nellie Bly/Carl Jung (deferred, not this batch) or Che
 * Guevara (portrait-blocked, parked, untouched). Never run automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster16.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster16.ts");

// Exact first-9-by-frozen-deterministic-intake-order allowlist. Nellie Bly
// and Carl Jung are qa_passed but intentionally excluded here -- deferred
// solely because the 125-person target was reached, not held.
const BATCH_16_SLUGS = new Set([
  "duke-ellington",
  "martha-graham",
  "bertrand-russell",
  "charles-dickens",
  "george-orwell",
  "t-e-lawrence",
  "elizabeth-cady-stanton",
  "john-d-rockefeller",
  "bette-davis",
]);

function loadBatch16(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_16_SLUGS.has(c.slug))
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
  const candidates = loadBatch16();

  // Fail closed: the allowlist must resolve to exactly the expected number
  // of qa_passed candidates, not fewer, not more, not an ambiguous one.
  if (candidates.length !== BATCH_16_SLUGS.size) {
    console.error(
      `Expected ${BATCH_16_SLUGS.size} qa_passed batch-16 candidate(s), found ${candidates.length}. Aborting.`,
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
 * ROSTER 16 — final coverage-and-confidence-aware intake batch (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed) via
 * \`src/dev/roster1000/generateRoster16.ts\`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline every earlier roster batch uses.
 *
 * This cycle added a depth question to the standing coverage-aware
 * preflight: breadth (>=22 plausible attributes) AND depth (>=12 of those
 * genuinely supportable near the high-confidence threshold). Froze 12
 * candidates from a fresh 27-person discovery pool in a fixed deterministic
 * order, scored every one to 22-23 attributes. 11 of 12 crossed
 * \`eligibility_v2\` honestly on first score. Katharine Hepburn cleared every
 * gate except the high-confidence average (0.54, just under the 0.55
 * threshold) despite 14 qualifying high-confidence rows, and remains
 * \`held\` -- a genuinely different miss pattern than any earlier cycle.
 *
 * Only 9 slots remained before the 125-person target, so the first 9 of
 * the 11 qa_passed candidates by frozen intake order are promoted here:
 * Duke Ellington, Martha Graham, Bertrand Russell, Charles Dickens, George
 * Orwell, T. E. Lawrence, Elizabeth Cady Stanton, John D. Rockefeller, and
 * Bette Davis. Nellie Bly and Carl Jung are qa_passed but deferred solely
 * because the target was reached, not held. Full record:
 * \`docs/checkpoints/roster16-final-intake.md\`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_16: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
