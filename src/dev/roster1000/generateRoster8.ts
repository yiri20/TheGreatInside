/**
 * One-time generator: converts the roster-1000 session-11 fresh candidate
 * batch into `src/data/people/roster8.ts` -- 20 newly-researched candidates,
 * all scored under `eligibility_v2` (session 10's high-confidence-subset
 * rule), targeting diversity gaps this project's own dataset audit found
 * (ancient era, West Asia, Sub-Saharan Africa, Latin America, medieval East
 * Asia) rather than modern Western scientists/US political figures. Follows
 * `roster7.ts`'s exact pattern -- an explicit slug allowlist, NOT a blanket
 * "every qa_passed candidate" filter, which would silently duplicate
 * already-promoted people from earlier batches. Never run automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster8.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster8.ts");

const BATCH_8_SLUGS = new Set([
  "al-ghazali",
  "anwar-sadat",
  "archimedes",
  "ban-zhao",
  "benito-juarez",
  "bhagat-singh",
  "chiune-sugihara",
  "cicero",
  "hannibal-barca",
  "ibn-battuta",
  "joan-of-arc",
  "julius-caesar",
  "mary-seacole",
  "mimar-sinan",
  "nasir-al-din-al-tusi",
  "patrice-lumumba",
  "simone-de-beauvoir",
  "steve-biko",
  "zeami-motokiyo",
  "zhang-heng",
]);

function loadBatch8(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_8_SLUGS.has(c.slug))
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
  const candidates = loadBatch8();
  if (candidates.length !== BATCH_8_SLUGS.size) {
    console.error(
      `Expected ${BATCH_8_SLUGS.size} qa_passed batch-8 candidates, found ${candidates.length}. Aborting.`,
    );
    process.exitCode = 1;
    return;
  }

  const source = `/**
 * ROSTER 8 — roster-1000 session 11, fresh candidate batch (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed, the
 * 20-slug session-11 batch) via \`src/dev/roster1000/generateRoster8.ts\`.
 * Every score's rationale is preserved as the inline comment above its Row,
 * the same evidence-audit-trail discipline the earlier rosters use.
 *
 * Selected specifically to address real diversity gaps this session's own
 * audit found in the 84-person roster1-7 dataset (ancient era, West Asia,
 * Sub-Saharan Africa, Latin America, medieval East Asia, and several
 * previously-unused occupations) rather than adding more modern Western
 * scientists or US political figures. All 20 scored under \`eligibility_v2\`
 * (session 10) from the start; NONE required lowering the coverage/scored-
 * attribute floors, inflating confidence beyond what the rubric's evidence
 * bands support, or removing valid low-confidence rows. A real, self-caught
 * calibration bug during scoring -- several rows initially left at
 * \`evidenceType: "inference"\` despite describing evidence that
 * \`docs/scoring-rubric-v1.md\` §3 itself classifies as \`strong_inference\`
 * (a documented outcome whose most plausible explanation is the trait, or
 * multiple weaker signals converging) -- was found and corrected via a
 * rubric-consistency reclassification pass, re-verified against
 * \`evaluateMatchEligibility\` after every change; no score value itself was
 * altered, only \`evidenceType\`/\`confidence\` band placement for rows whose
 * evidence already supported it.
 *
 * Korean display names for all 20 people were added to \`person.name.*\` in
 * \`src/core/i18n/ko.ts\` in the same session.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_8: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
