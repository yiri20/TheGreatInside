/**
 * One-time generator: converts roster-1000 session 19's eligible candidates
 * into `src/data/people/roster10.ts`.
 *
 * Session 19 was the first normal Launch Roster Expansion production batch
 * following session 18's frozen Roster Research & Scoring Protocol v1: a
 * fresh 5-person cohort (Mustafa Kemal Ataturk, Aung San Suu Kyi, Anna
 * Pavlova, Akio Morita, Oscar Niemeyer), selected to close real regional/
 * domain gaps in the prior 90-person roster (West Asia had only one,
 * medieval representative; dance and architecture had zero representation;
 * entrepreneurial impact existed only in North America/Western Europe).
 * Researched and scored under the same explicit, evidence-preserving
 * protocol as session 18, with every stage preserved separately in
 * `src/dev/roster1000/production/session19/`. All 5 cleared every
 * `eligibility_v2` gate cleanly. See `docs/roster-1000-checkpoint.md`
 * for the full record.
 *
 * Follows `generateRoster9.ts`'s exact pattern -- an explicit slug
 * allowlist, NOT a blanket "every qa_passed candidate" filter, which would
 * silently duplicate already-promoted people from earlier batches. Never
 * run automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster10.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster10.ts");

const BATCH_10_SLUGS = new Set([
  "mustafa-kemal-ataturk",
  "aung-san-suu-kyi",
  "anna-pavlova",
  "akio-morita",
  "oscar-niemeyer",
]);

function loadBatch10(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_10_SLUGS.has(c.slug))
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
  const candidates = loadBatch10();
  if (candidates.length !== BATCH_10_SLUGS.size) {
    console.error(
      `Expected ${BATCH_10_SLUGS.size} qa_passed batch-10 candidates, found ${candidates.length}. Aborting.`,
    );
    process.exitCode = 1;
    return;
  }

  const source = `/**
 * ROSTER 10 — roster-1000 session 19 (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed) via
 * \`src/dev/roster1000/generateRoster10.ts\`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use -- here each rationale also
 * cites the specific frozen evidence-ledger episode id(s) it traces back
 * to, full text preserved in
 * \`src/dev/roster1000/production/session19/<slug>/evidenceLedger.json\`.
 *
 * Session 19 was the first normal Launch Roster Expansion production
 * batch under session 18's frozen Roster Research & Scoring Protocol v1:
 * a fresh 5-person cohort selected to close real regional/domain gaps
 * (mustafa-kemal-ataturk closes West Asia's single-medieval-person gap;
 * anna-pavlova and oscar-niemeyer close zero-representation dance and
 * architecture domain gaps; akio-morita closes the entrepreneurial-
 * outside-North-America/Western-Europe gap; aung-san-suu-kyi adds a
 * contemporary, morally complex political figure). All 5 cleared every
 * \`eligibility_v2\` gate cleanly -- a clean 5/5 batch, not a near-miss
 * pattern. See \`docs/roster-1000-checkpoint.md\` for the full record.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_10: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
