/**
 * One-time generator: converts the roster-1000 session-4 (second real batch)
 * `qa_passed` candidates into `src/data/people/roster4.ts`, following
 * `roster3.ts`'s exact authoring pattern. Filtered to an explicit slug list
 * (not "every qa_passed candidate in the directory") because the candidates
 * directory also still holds the 16 roster3.ts candidates from session 3,
 * already promoted — re-running generateRoster3.ts's blanket filter would
 * silently duplicate them into a second file. Never run automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster4.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster4.ts");

const BATCH_4_SLUGS = new Set([
  "benjamin-banneker",
  "chinua-achebe",
  "emmy-noether",
  "fela-kuti",
  "florence-nightingale",
  "grace-hopper",
  "immanuel-kant",
  "malcolm-x",
  "muhammad-ali",
  "niels-bohr",
  "rachel-carson",
  "simon-bolivar",
  "sojourner-truth",
  "sor-juana-ines-de-la-cruz",
  "toussaint-louverture",
  "wole-soyinka",
]);

function loadBatch4(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_4_SLUGS.has(c.slug))
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
  const candidates = loadBatch4();
  if (candidates.length !== BATCH_4_SLUGS.size) {
    console.error(
      `Expected ${BATCH_4_SLUGS.size} qa_passed batch-4 candidates, found ${candidates.length}. Aborting — check candidate statuses before regenerating.`,
    );
    process.exitCode = 1;
    return;
  }

  const source = `/**
 * ROSTER 4 — roster-1000 session 4, second real expansion batch (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed, the
 * 16-slug session-4 batch) via \`src/dev/roster1000/generateRoster4.ts\` — see
 * that script and \`docs/roster-1000-checkpoint.md\` for the full pipeline.
 * Every score's rationale is preserved as the inline comment immediately
 * above its Row, the same evidence-audit-trail discipline \`seed.ts\`/
 * \`roster2.ts\`/\`roster3.ts\` already use. Follows \`docs/scoring-rubric-v1.md\`
 * throughout. 14 of 30 researched candidates this session were held rather
 * than force-accepted — see the checkpoint for the full disposition and the
 * honest holdReason recorded on each held candidate file.
 *
 * Korean display names for these 16 people were added to \`person.name.*\`
 * in \`src/core/i18n/ko.ts\` in the same batch.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_4: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
