/**
 * Regenerates `src/data/people/peopleIndex.generated.ts` — the compact,
 * client-safe projection of `SEED_PEOPLE` (see `src/core/people/
 * personIndex.ts` for the full architectural reasoning). Same "frozen,
 * committed snapshot, not computed live" discipline as `dispersion.
 * generated.ts` (`src/core/matching/dispersion.generated.ts`).
 *
 * Regenerate with: corepack pnpm@10 exec tsx src/dev/generatePeopleIndex.ts
 * Run this after ANY roster change (new person, edited person, edited
 * portrait/aliases/etc.) — nothing else regenerates this file
 * automatically, exactly like `dispersion.generated.ts`.
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { SEED_PEOPLE } from "../data/people/seed.js";
import { buildPeopleIndex, PERSON_INDEX_VERSION } from "../core/people/personIndex.js";

const OUT_PATH = join(process.cwd(), "src/data/people/peopleIndex.generated.ts");

function main() {
  const entries = buildPeopleIndex(SEED_PEOPLE);

  const body = entries
    .map((e) => {
      const attrs = e.attributes
        .map(([attributeId, score, confidence, impact]) => `["${attributeId}", ${score}, ${confidence}, "${impact}"]`)
        .join(", ");
      const fields: string[] = [
        `id: ${JSON.stringify(e.id)}`,
        `slug: ${JSON.stringify(e.slug)}`,
        `canonicalName: ${JSON.stringify(e.canonicalName)}`,
        `aliases: ${JSON.stringify(e.aliases)}`,
        e.birthYear !== undefined ? `birthYear: ${e.birthYear}` : undefined,
        e.deathYear !== undefined ? `deathYear: ${e.deathYear}` : undefined,
        `isLiving: ${e.isLiving}`,
        `era: ${JSON.stringify(e.era)}`,
        `regionCode: ${JSON.stringify(e.regionCode)}`,
        `occupationIds: ${JSON.stringify(e.occupationIds)}`,
        `fieldIds: ${JSON.stringify(e.fieldIds)}`,
        `impactDomains: ${JSON.stringify(e.impactDomains)}`,
        `tagIds: ${JSON.stringify(e.tagIds)}`,
        `archetypeIds: ${JSON.stringify(e.archetypeIds)}`,
        `isMatchEligible: ${e.isMatchEligible}`,
        `overallProfileConfidence: ${e.overallProfileConfidence}`,
        `attributes: [${attrs}]`,
        e.portraitUrl !== undefined ? `portraitUrl: ${JSON.stringify(e.portraitUrl)}` : undefined,
      ].filter((f): f is string => f !== undefined);
      return `  {\n    ${fields.join(",\n    ")},\n  }`;
    })
    .join(",\n");

  const source = `/* GENERATED FILE — do not edit by hand. Regenerate with:
   corepack pnpm@10 exec tsx src/dev/generatePeopleIndex.ts */
import type { PersonIndexEntry } from "../../core/people/personIndex.js";

export const PERSON_INDEX_VERSION = "${PERSON_INDEX_VERSION}";

/** Compact, client-safe projection of SEED_PEOPLE — see
 *  src/core/people/personIndex.ts for what's included/excluded and why.
 *  ${entries.length} entries. */
export const PEOPLE_INDEX: readonly PersonIndexEntry[] = [
${body}
];
`;

  return writeFile(OUT_PATH, source, "utf8").then(() => {
    console.log(`wrote ${OUT_PATH} (${entries.length} entries, ${source.length} bytes)`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
