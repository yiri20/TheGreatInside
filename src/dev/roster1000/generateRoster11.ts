/**
 * One-time generator: converts the roster-expansion-125 evidence program's
 * single `qa_passed` candidate (Miriam Makeba) into `src/data/people/roster11.ts`.
 *
 * The roster-expansion-125 program (see `docs/checkpoints/
 * roster-expansion-125-FINAL-CONVERGENCE-DRAFT.md`) researched/scored 30
 * fresh and held-candidate-deepening primaries toward a future 95->125
 * expansion. Of those 30, only Miriam Makeba crossed `eligibility_v2`
 * honestly (scored=20, avgConf=0.549, coverage=0.606) — a second-batch
 * diversity pick (20th_century, sub_saharan_africa, music/anti-apartheid-
 * activism) whose held->qa_passed crossing traces to two genuinely new
 * evidence rows (the 1968 Stokely Carmichael marriage and its documented
 * career consequences), not to re-tuning existing rows. The other 29
 * candidates from that program remain `held`/`STRUCTURALLY_THIN`/unscored
 * and are deliberately NOT included here.
 *
 * Follows `generateRoster10.ts`'s exact pattern — an explicit single-slug
 * allowlist, NOT a blanket "every qa_passed candidate" filter, which would
 * silently re-promote candidates from earlier batches or promote other
 * unrelated qa_passed candidates that were never reviewed for this batch.
 * Never run automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster11.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster11.ts");

const BATCH_11_SLUGS = new Set(["miriam-makeba"]);

function loadBatch11(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_11_SLUGS.has(c.slug))
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
  const candidates = loadBatch11();

  // Fail closed: the allowlist must resolve to exactly one qa_passed
  // candidate, not zero, not more than one, not an ambiguous/ineligible one.
  if (candidates.length !== BATCH_11_SLUGS.size) {
    console.error(
      `Expected ${BATCH_11_SLUGS.size} qa_passed batch-11 candidate(s), found ${candidates.length}. Aborting.`,
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
 * ROSTER 11 — roster-expansion-125 evidence program (${candidates.length} person).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed) via
 * \`src/dev/roster1000/generateRoster11.ts\`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use.
 *
 * The roster-expansion-125 program (see \`docs/checkpoints/
 * roster-expansion-125-FINAL-CONVERGENCE-DRAFT.md\`) researched/scored 30
 * primaries toward a future 95->125 expansion; only Miriam Makeba crossed
 * \`eligibility_v2\` honestly on the strength of genuinely new evidence (the
 * 1968 Stokely Carmichael marriage and its documented, quoted career
 * consequences) added during a held-candidate evidence-deepening pass, not
 * by re-tuning existing rows. The other 29 candidates from that program
 * remain \`held\`/\`STRUCTURALLY_THIN\`/unscored and are not part of this batch.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_11: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
