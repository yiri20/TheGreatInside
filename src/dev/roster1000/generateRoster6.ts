/**
 * One-time generator: converts the roster-1000 session-6 candidates into
 * `src/data/people/roster6.ts` -- 4 diagnostic-control-experiment conversions
 * (elizabeth-blackwell, ludwig-wittgenstein, nicolaus-copernicus, wu-zetian --
 * originally held in session 5, genuinely re-researched and confirmed
 * eligible this session) plus 1 newly-researched candidate (harriet-tubman,
 * from this session's corrected-depth new batch). Follows `roster5.ts`'s
 * exact pattern -- an explicit slug allowlist, NOT `generateRoster3.ts`'s
 * blanket "every qa_passed candidate" filter, which would silently duplicate
 * already-promoted people from earlier batches. Never run automatically.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster6.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { toPersonSeed, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster6.ts");

const BATCH_6_SLUGS = new Set(["elizabeth-blackwell", "ludwig-wittgenstein", "nicolaus-copernicus", "wu-zetian", "harriet-tubman"]);

function loadBatch5(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => c.status === "qa_passed" && BATCH_6_SLUGS.has(c.slug))
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
  if (candidates.length !== BATCH_6_SLUGS.size) {
    console.error(
      `Expected ${BATCH_6_SLUGS.size} qa_passed batch-6 candidates, found ${candidates.length}. Aborting.`,
    );
    process.exitCode = 1;
    return;
  }

  const source = `/**
 * ROSTER 6 — roster-1000 session 6 (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` (status: qa_passed, the
 * 5-slug session-6 batch) via \`src/dev/roster1000/generateRoster6.ts\`. Every
 * score's rationale is preserved as the inline comment above its Row, the
 * same evidence-audit-trail discipline the earlier rosters use.
 *
 * Two distinct sources, both documented in docs/roster-1000-checkpoint.md:
 * (1) elizabeth-blackwell, ludwig-wittgenstein, nicolaus-copernicus,
 * wu-zetian -- 4 of 6 candidates in a deliberate diagnostic control
 * experiment, genuinely re-researched from their session-5 held state with
 * real institutional/scholarly sources (never fabricated), crossing all
 * three eligibility floors as an honest result, not a forced one. The other
 * 2 diagnostic candidates (franz-kafka, rosa-parks) improved substantially
 * but remained genuinely short and stayed held -- not converted.
 * (2) harriet-tubman -- 1 of 8 candidates in a fresh "corrected research
 * depth" batch researched from scratch this session; the other 7 improved
 * across two real research rounds but stayed genuinely short of the
 * confidence floor and remained held.
 *
 * Korean display names for all 5 people were added to \`person.name.*\`
 * in \`src/core/i18n/ko.ts\` in the same session.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_6: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
