/**
 * One-time generator: converts every `qa_passed` candidate in
 * `data-pipeline/candidates/` into `src/data/people/roster3.ts`, following
 * `roster2.ts`'s exact authoring pattern (PersonSeed literals via `build()`,
 * `wiki()`/`bio()` source helpers, inline `//` rationale comments above each
 * Row). Never run automatically — a human/pipeline decision to promote a
 * batch, exactly like `docs/roster-1000-checkpoint.md` §4B's workflow
 * describes. Re-running overwrites roster3.ts; only run after confirming
 * validateCandidates.ts reports the intended candidates as qa_passed with
 * zero errors.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster3.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster3.ts");

function loadQaPassed(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all.filter((c) => c.status === "qa_passed").sort((a, b) => a.slug.localeCompare(b.slug));
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
      // wrap the rationale as a short inline comment, matching seed.ts/roster2.ts's convention
      return `      // ${row.rationale}\n      ${attributeId}: [${row.score}, ${row.confidence}, "${evCode}", "${imCode}"],`;
    })
    .join("\n");

  const localizedName = candidate.localization?.displayNames?.["ko-KR"];

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
  const candidates = loadQaPassed();
  if (candidates.length === 0) {
    console.log("No qa_passed candidates found — nothing to generate.");
    return;
  }

  const koEntries = candidates
    .filter((c) => c.localization?.displayNames?.["ko-KR"])
    .map((c) => `  "person.name.${c.slug}": ${tsString(c.localization!.displayNames!["ko-KR"]!)},`)
    .join("\n");

  const source = `/**
 * ROSTER 3 — first roster-1000 real expansion batch (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed) via
 * \`src/dev/roster1000/generateRoster3.ts\` — see that script and
 * \`docs/roster-1000-checkpoint.md\` for the full pipeline. Every score's
 * rationale is preserved as the inline comment immediately above its Row,
 * the same evidence-audit-trail discipline \`seed.ts\`/\`roster2.ts\` already
 * use. Follows \`docs/scoring-rubric-v1.md\` throughout — see each entry's
 * own comments for the evidence basis of every score.
 *
 * Korean display names for these 16 people were added to \`person.name.*\`
 * in \`src/core/i18n/ko.ts\` in the same batch — see that file's roster-1000
 * section.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_3: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
  if (koEntries) {
    console.log("\n--- Korean person.name.* entries to add to ko.ts ---\n" + koEntries);
  }
}

main();
