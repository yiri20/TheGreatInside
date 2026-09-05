/**
 * One-time generator: converts the roster-14 coverage-aware intake batch's
 * product-ready `qa_passed` candidates into `src/data/people/roster14.ts`.
 *
 * The roster-14 cycle (2026-09) applied the roster-12/13 coverage-bottleneck
 * postmortem's finding directly: the postmortem proved 18-19 scored
 * attributes cannot mathematically reach eligibility_v2's 0.6 weighted-
 * coverage floor regardless of evidence quality, and that coverage is
 * effectively guaranteed from 22 attributes onward. This cycle's preflight
 * raised the target to >=21-22-attribute-capable evidence before freezing,
 * built a fresh 33-person discovery pool, froze 12 candidates with the
 * broadest genuine behavioral evidence, and first-scored all 12 to 22-23
 * attributes each. 11 of 12 crossed eligibility_v2 honestly — Abraham
 * Lincoln, Theodore Roosevelt, Alexander Hamilton, Mark Twain, Ernest
 * Hemingway, Elizabeth I, Otto von Bismarck, Leo Tolstoy, Sigmund Freud,
 * Pablo Picasso, and Gertrude Bell. Queen Victoria (22 attributes, coverage
 * 0.655) is the sole miss — short only on the high-confidence-count gate
 * (4 of 22 attributes at confidence >=0.5, need 12), not coverage or
 * attribute count — and remains `held`, not included here.
 *
 * All 11 qa_passed candidates are product-ready (real rights-clear public-
 * domain portraits sourced and verified live against Wikimedia Commons
 * license metadata, full EN/KO editorial content, Korean display names) —
 * none are excluded for a product blocker this cycle.
 *
 * Follows `generateRoster12.ts`'s exact pattern — an explicit multi-slug
 * allowlist, NOT a blanket "every qa_passed candidate" filter, which would
 * silently re-promote Che Guevara (portrait-blocked, parked, untouched) or
 * any earlier batch's unpromoted qa_passed candidates. Never run
 * automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster14.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster14.ts");

const BATCH_14_SLUGS = new Set([
  "abraham-lincoln",
  "theodore-roosevelt",
  "alexander-hamilton",
  "mark-twain",
  "ernest-hemingway",
  "elizabeth-i",
  "otto-von-bismarck",
  "leo-tolstoy",
  "sigmund-freud",
  "pablo-picasso",
  "gertrude-bell",
]);

function loadBatch14(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_14_SLUGS.has(c.slug))
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
  const candidates = loadBatch14();

  // Fail closed: the allowlist must resolve to exactly the expected number
  // of qa_passed candidates, not fewer, not more, not an ambiguous one.
  if (candidates.length !== BATCH_14_SLUGS.size) {
    console.error(
      `Expected ${BATCH_14_SLUGS.size} qa_passed batch-14 candidate(s), found ${candidates.length}. Aborting.`,
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
 * ROSTER 14 — coverage-aware intake batch (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed) via
 * \`src/dev/roster1000/generateRoster14.ts\`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline every earlier roster batch uses.
 *
 * This cycle applied the roster-12/13 coverage-bottleneck postmortem's
 * finding directly: 18-19 scored attributes cannot mathematically reach
 * eligibility_v2's 0.6 weighted-coverage floor regardless of evidence
 * quality; coverage is effectively guaranteed from 22 attributes onward.
 * The preflight raised the pre-freeze target to >=21-22-attribute-capable
 * evidence, froze a smaller, stronger 12-candidate batch (from a fresh
 * 33-person discovery pool) instead of roster-12/13's 15-18, and scored
 * every frozen candidate to 22-23 attributes. 11 of 12 crossed
 * eligibility_v2 honestly on first score — a sharp contrast with
 * roster-12/13's combined 2 of 33, consistent with the postmortem's own
 * mathematical prediction, not a change in evidence or confidence
 * standards. Queen Victoria (22 attributes, coverage 0.655, held only on
 * the high-confidence-count gate) is the sole miss and is deliberately NOT
 * part of this batch. Full record: \`docs/checkpoints/roster14-coverage-aware-intake.md\`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_14: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
