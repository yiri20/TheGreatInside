/**
 * One-time generator: converts the roster-12 new-intake batch's single
 * `qa_passed` candidate (Marcus Aurelius) into `src/data/people/roster12.ts`.
 *
 * The roster-12 new-intake cycle (2026-09) built a discovery pool of 27 new
 * candidates (not already live or already present as scored candidate JSON),
 * ran a fast evidence-structure preflight, froze 15 for full evidence packs,
 * and first-scored all 15. Two crossed `eligibility_v2` honestly: Che Guevara
 * and Marcus Aurelius. Che Guevara is NOT included here — no rights-clear,
 * non-AI-generated portrait could be sourced within this cycle (the iconic
 * Korda "Guerrillero Heroico" photo has a genuinely disputed international
 * copyright status; several Commons alternatives were investigated and
 * rejected for the same reason or for a false/uncertain rights claim) — a
 * documented production blocker, not a research or scoring failure. His
 * candidate JSON remains `qa_passed`, unpromoted, for a future cycle once a
 * portrait is resolved. The other 13 frozen candidates remain `held` (real
 * evidence packs, genuine first scores, coverage just short of the 0.6
 * eligibility_v2 floor) and are deliberately NOT included here.
 *
 * Follows `generateRoster11.ts`'s exact pattern — an explicit single-slug
 * allowlist, NOT a blanket "every qa_passed candidate" filter, which would
 * silently re-promote an earlier batch or promote Che Guevara without a
 * resolved portrait. Never run automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster12.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster12.ts");

const BATCH_12_SLUGS = new Set(["marcus-aurelius"]);

function loadBatch12(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_12_SLUGS.has(c.slug))
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
    sources: [${seed.sources.map((s) => renderSource(s.id, s.kind, s.title, s.url)).join(", ")}],
    rows: {
${rowLines}
    },
  }`;
}

function main() {
  const candidates = loadBatch12();

  // Fail closed: the allowlist must resolve to exactly one qa_passed
  // candidate, not zero, not more than one, not an ambiguous/ineligible one.
  if (candidates.length !== BATCH_12_SLUGS.size) {
    console.error(
      `Expected ${BATCH_12_SLUGS.size} qa_passed batch-12 candidate(s), found ${candidates.length}. Aborting.`,
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
  }

  const source = `/**
 * ROSTER 12 — new-intake batch (${candidates.length} person).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed) via
 * \`src/dev/roster1000/generateRoster12.ts\`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use.
 *
 * The roster-12 new-intake cycle (2026-09) researched/scored 15 new
 * candidates (frozen from a 27-person discovery pool, none previously
 * present as scored candidate JSON and none already live); only Marcus
 * Aurelius and Che Guevara crossed \`eligibility_v2\` honestly on first
 * score. Che Guevara is deliberately NOT part of this batch — no
 * rights-clear, non-AI-generated portrait could be sourced within this
 * cycle, a documented production blocker; he remains \`qa_passed\` and
 * unpromoted for a future cycle. The other 13 frozen candidates remain
 * \`held\` (real evidence packs, genuine first scores, short only on
 * eligibility_v2's weighted coverage floor) and are not part of this batch.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_12: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
