/**
 * One-time generator: converts the roster-1000 session-10 eligibility_v2
 * promotions into `src/data/people/roster7.ts` -- 9 candidates that were
 * held under the historical flat-mean confidence gate (eligibility_v1) and
 * became eligible once that gate was replaced by a high-confidence-subset
 * requirement (eligibility_v2, see docs/roster-1000-checkpoint.md SS52-64).
 * Follows `roster6.ts`'s exact pattern -- an explicit slug allowlist, NOT a
 * blanket "every qa_passed candidate" filter, which would silently
 * duplicate already-promoted people from earlier batches. Never run
 * automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster7.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster7.ts");

const BATCH_7_SLUGS = new Set([
  "averroes",
  "cv-raman",
  "franz-kafka",
  "katherine-johnson",
  "maimonides",
  "mary-wollstonecraft",
  "michelangelo",
  "octavia-butler",
  "susan-b-anthony",
]);

function loadBatch7(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_7_SLUGS.has(c.slug))
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
  const candidates = loadBatch7();
  if (candidates.length !== BATCH_7_SLUGS.size) {
    console.error(
      `Expected ${BATCH_7_SLUGS.size} qa_passed batch-7 candidates, found ${candidates.length}. Aborting.`,
    );
    process.exitCode = 1;
    return;
  }

  const source = `/**
 * ROSTER 7 — roster-1000 session 10, eligibility_v2 promotion (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed, the
 * 9-slug session-10 eligibility_v2 batch) via
 * \`src/dev/roster1000/generateRoster7.ts\`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use.
 *
 * Every one of these 9 people was originally scored and held under the
 * historical eligibility_v1 rule (a flat, unweighted confidence mean
 * across every scored attribute, floor 0.55) -- NONE were rescored for
 * this promotion. Session 8 (docs/roster-1000-checkpoint.md SS43-51)
 * diagnosed that flat mean as structurally different from how
 * \`buildTerms\` (matching.ts) actually weights confidence, and proposed a
 * fix; session 9 (SS52-62) found that specific proposal did not reproduce
 * and validated a revised hybrid design instead; session 10 implemented
 * that revised design as \`eligibility_v2\` (\`src/core/matching/
 * similarity.ts\`) -- coverage>=0.6 and scored>=18 UNCHANGED, the flat
 * confidence-mean gate REPLACED by a high-confidence-subset
 * (confidence>=0.5) count(>=12)+average(>=0.55) requirement -- and these
 * 9 candidates are exactly and only the ones that formula newly admits,
 * determined by the rule itself, never a hand-picked allowlist chosen to
 * hit a target count.
 *
 * Korean display names for all 9 people were added to \`person.name.*\`
 * in \`src/core/i18n/ko.ts\` in the same session.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_7: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
