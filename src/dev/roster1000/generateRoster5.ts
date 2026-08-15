/**
 * One-time generator: converts the roster-1000 session-5 (third real batch)
 * `qa_passed` candidates into `src/data/people/roster5.ts`, following
 * `roster4.ts`'s exact pattern -- an explicit slug allowlist, NOT
 * `generateRoster3.ts`'s blanket "every qa_passed candidate" filter, which
 * would silently duplicate already-promoted people from earlier batches.
 * Never run automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster5.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster5.ts");

const BATCH_5_SLUGS = new Set(["aristotle", "br-ambedkar", "sequoyah"]);

function loadBatch5(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_5_SLUGS.has(c.slug))
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
  const candidates = loadBatch5();
  if (candidates.length !== BATCH_5_SLUGS.size) {
    console.error(
      `Expected ${BATCH_5_SLUGS.size} qa_passed batch-5 candidates, found ${candidates.length}. Aborting.`,
    );
    process.exitCode = 1;
    return;
  }

  const source = `/**
 * ROSTER 5 — roster-1000 session 5, third real expansion batch (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed, the
 * 3-slug session-5 batch) via \`src/dev/roster1000/generateRoster5.ts\`. Every
 * score's rationale is preserved as the inline comment above its Row, the
 * same evidence-audit-trail discipline the earlier rosters use. This batch's
 * acceptance rate (3 of 31 researched) is markedly lower than sessions 3-4
 * -- see docs/roster-1000-checkpoint.md for the honest reason (this batch's
 * initial confidence calibration ran lower than earlier batches; two
 * legitimate remediation rounds closed some of the gap but not all of it,
 * and a third round was deliberately not attempted per the session's own
 * instruction not to force wider margins).
 *
 * Korean display names for these 3 people were added to \`person.name.*\`
 * in \`src/core/i18n/ko.ts\` in the same batch.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_5: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
