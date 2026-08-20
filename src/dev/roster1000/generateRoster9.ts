/**
 * One-time generator: converts the roster-1000 session-18 prospective
 * production pilot's eligible candidates into `src/data/people/roster9.ts`.
 *
 * Session 18 was the first PROSPECTIVE production pilot after sessions
 * 13-17's retrospective diagnostic work (docs/roster-1000-checkpoint.md
 * §84): a fresh 5-person cohort (Louis Pasteur, Fyodor Dostoevsky, Indira
 * Gandhi, Louis Armstrong, William Wilberforce), researched and scored
 * under one explicit, evidence-preserving protocol with every stage
 * (sources, raw notes, trait-blind evidence ledger, evidence lock, scoring,
 * scoring lock) kept separately in
 * `src/dev/roster1000/production/session18/`, then run through
 * `eligibility_v2` exactly once. 3 of 5 cleared every gate cleanly:
 * louis-pasteur, fyodor-dostoevsky, louis-armstrong. The other 2
 * (indira-gandhi, william-wilberforce) each failed ONLY the coverage gate
 * by a narrow margin (0.590 and 0.542 against the 0.6 floor, respectively)
 * while clearing the scored-attribute-count and high-confidence gates —
 * genuine near-misses, not rescued or padded, per the session's explicit
 * instruction. Their JSON files remain in `data-pipeline/candidates/`
 * with `status: "held"` and an honest `holdReason`.
 *
 * Follows `roster8.ts`'s exact pattern -- an explicit slug allowlist, NOT a
 * blanket "every qa_passed candidate" filter, which would silently
 * duplicate already-promoted people from earlier batches. Never run
 * automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster9.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster9.ts");

const BATCH_9_SLUGS = new Set(["fyodor-dostoevsky", "louis-armstrong", "louis-pasteur"]);

function loadBatch9(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_9_SLUGS.has(c.slug))
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
  const candidates = loadBatch9();
  if (candidates.length !== BATCH_9_SLUGS.size) {
    console.error(
      `Expected ${BATCH_9_SLUGS.size} qa_passed batch-9 candidates, found ${candidates.length}. Aborting.`,
    );
    process.exitCode = 1;
    return;
  }

  const source = `/**
 * ROSTER 9 — roster-1000 session 18 (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed) via
 * \`src/dev/roster1000/generateRoster9.ts\`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use -- here each rationale also
 * cites the specific frozen evidence-ledger episode id(s) it traces back
 * to (e.g. "Session 18 evidence LP-E14"), full text preserved in
 * \`src/dev/roster1000/production/session18/<slug>/evidenceLedger.json\`.
 *
 * Session 18 was the first PROSPECTIVE production pilot after sessions
 * 13-17's retrospective diagnostic work: a fresh 5-person cohort
 * researched and scored under one explicit, evidence-preserving protocol
 * (source record -> raw notes -> trait-blind evidence ledger -> evidence
 * lock -> scoring -> scoring lock -> eligibility_v2 run once), with every
 * stage preserved separately in
 * \`src/dev/roster1000/production/session18/\`. 3 of 5 cleared every gate
 * cleanly: louis-pasteur (26 rows, coverage 0.769), fyodor-dostoevsky (24
 * rows, coverage 0.717), louis-armstrong (21 rows, coverage 0.623). The
 * other 2 (indira-gandhi, william-wilberforce) each failed ONLY the
 * coverage gate by a narrow margin while clearing the scored-attribute-
 * count and high-confidence gates -- genuine near-misses, not rescued or
 * padded. See \`docs/roster-1000-checkpoint.md\` §84 for the full record.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_9: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
