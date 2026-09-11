/**
 * ROSTER 31 -- fourteen-person zero-politics production batch, eighth real
 * use of the profile-publication / match-eligibility separation
 * architecture (PR #21,
 * `docs/checkpoints/profile-publication-vs-match-eligibility.md`).
 *
 * Selected from the existing `data-pipeline/candidates/*.json` held pool
 * only -- no new candidate discovery, no new behavioral research (portrait
 * research is the sole permitted new research, per this cycle's brief).
 * Continues Roster30's zero-politics rule: this batch contains ZERO people
 * whose primary historical significance is political leadership, state
 * rule, military command, or political/civil-rights activism -- verified
 * per-person against the "what is this person primarily famous for" test,
 * not by occupation-string pattern matching alone (Taha Hussein's brief
 * 1950-52 ministerial post was judged incidental to his primary fame as a
 * literary/scholarly figure, matching this cycle's own "novelist who
 * happened to hold office" allowed example; several other candidates with
 * thicker political framing -- Edward Said, Jane Addams, Kartini, Emmeline
 * Pankhurst, W.E.B. Du Bois, Shirin Ebadi -- were deliberately excluded
 * despite adequate evidence richness). **Booker T. Washington was frozen
 * and initially promoted, then reverted to `held` before this file's final
 * version**: Roster30's own zero-politics audit had already excluded this
 * exact candidate on primary-significance-ambiguity grounds (the Atlanta
 * Compromise / Du Bois rivalry reads as ideological movement leadership
 * under Jim Crow, not merely running Tuskegee Institute) -- this session's
 * initial contrary judgment was caught and corrected during documentation,
 * before merge, not after. See
 * `docs/checkpoints/roster31-fifteen-person-zero-politics-batch.md` for the
 * full account.
 *
 * All fourteen were `held` solely because of `eligibility_v2`'s numeric
 * floors (none for evidence-integrity reasons -- the same 22-slug Group-B
 * exclusion Roster28/29/30 established remains excluded, none of which are
 * in this roster) and each received a targeted row-by-row evidence-
 * approval audit, moving to `evidence_approved`. The pool this cycle
 * turned out heavily concentrated in science/medicine (12 of 14) -- a
 * mechanically-verified fact about which non-political held candidates
 * currently clear a reasonable evidence-richness bar (>=9 scored rows),
 * not a selection preference; Building & Discovery and Arts & Culture
 * soft targets could not be fully met without either thinner (<9-row)
 * profiles or new research, both avoided this cycle. Four rows across two
 * candidates received a factual-gate ERROR_CORRECTION narrowing (Faraday's
 * Christmas Lectures count/superlative claim; Zewail's Zewail-City funding
 * figures, chair name, and Science Envoy framing), none touching any
 * score/confidence/evidenceType/impact value -- see each candidate JSON's
 * own provenance notes and
 * `docs/checkpoints/roster31-fifteen-person-zero-politics-batch.md`. No
 * candidate was rescued toward eligibility; `eligibility_v2` was not
 * touched.
 *
 * Same architecture as `generateRoster30.ts`:
 * - explicit literal slug allowlist (below), never a blanket filter;
 * - loads candidates regardless of whether status is `evidence_approved`
 *   or `qa_passed`;
 * - calls `preparePersonSeedForPromotion(candidate)`, NOT `toPersonSeed()`
 *   directly, and never checks `computedEligibility.eligible`;
 * - lets `build()` compute `isMatchEligible` untouched and relies on
 *   `preparePersonSeedForPromotion()`'s own `directoryVisible: true`
 *   default.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster31.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { preparePersonSeedForPromotion, checkPromotionReadiness, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster31.ts");

// Explicit literal allowlist -- exactly the 14 fixed roster31 candidates.
// Never a blanket "every evidence_approved/qa_passed candidate" filter.
// Booker T. Washington was deliberately NOT included here: Roster30's own
// zero-politics audit already excluded this exact candidate on the same
// primary-significance-ambiguity grounds (the Atlanta Compromise / Du Bois
// rivalry reads as ideological movement leadership, not merely education) --
// see docs/checkpoints/roster31-fifteen-person-zero-politics-batch.md for
// the full account of this correction. His candidate file remains `held`.
const ROSTER_31_SLUGS = new Set([
  "linus-pauling",
  "robert-falcon-scott",
  "luis-alvarez",
  "ahmed-zewail",
  "gregor-mendel",
  "emilio-segre",
  "taha-hussein",
  "sofia-kovalevskaya",
  "maria-goeppert-mayer",
  "michael-faraday",
  "homi-bhabha",
  "rosalyn-yalow",
  "enrico-fermi",
  "dorothy-hodgkin",
]);

function loadRoster31(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => (c.status === "evidence_approved" || c.status === "qa_passed") && ROSTER_31_SLUGS.has(c.slug))
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
  // The actual future promotion path: fails closed via
  // checkPromotionReadiness() internally, defaults directoryVisible: true,
  // never reads computedEligibility.eligible.
  const seed = preparePersonSeedForPromotion(candidate);
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
    ${seed.externalIdentity ? `externalIdentity: { wikidataId: ${tsString(seed.externalIdentity.wikidataId ?? "")} },\n    ` : ""}${
      seed.portrait
        ? `portrait: {
      url: ${tsString(seed.portrait.url)},
      source: ${tsString(seed.portrait.source)},
      license: ${tsString(seed.portrait.license)},
      ${seed.portrait.width !== undefined ? `width: ${seed.portrait.width},\n      ` : ""}${seed.portrait.height !== undefined ? `height: ${seed.portrait.height},\n      ` : ""}${seed.portrait.licenseUrl !== undefined ? `licenseUrl: ${tsString(seed.portrait.licenseUrl)},\n      ` : ""}${seed.portrait.attribution !== undefined ? `attribution: ${tsString(seed.portrait.attribution)},\n      ` : ""}${seed.portrait.attributionUrl !== undefined ? `attributionUrl: ${tsString(seed.portrait.attributionUrl)},\n      ` : ""}${seed.portrait.kind !== undefined ? `kind: ${tsString(seed.portrait.kind)},\n      ` : ""}
    },\n    `
        : ""
    }directoryVisible: ${seed.directoryVisible},
    sources: [${seed.sources.map((s) => renderSource(s.id, s.kind, s.title, s.url)).join(", ")}],
    rows: {
${rowLines}
    },
  }`;
}

function main() {
  const candidates = loadRoster31();

  if (candidates.length !== ROSTER_31_SLUGS.size) {
    console.error(`Expected ${ROSTER_31_SLUGS.size} promotable roster31 candidate(s), found ${candidates.length}. Aborting.`);
    process.exitCode = 1;
    return;
  }
  for (const c of candidates) {
    // Fails closed on status/identity/portrait -- deliberately does NOT
    // check computedEligibility.eligible (see file header).
    const readiness = checkPromotionReadiness(c);
    if (!readiness.ready) {
      console.error(`Candidate "${c.slug}" is not ready for promotion: ${readiness.reasons.join("; ")}. Aborting.`);
      process.exitCode = 1;
      return;
    }
  }

  const source = `/**
 * ROSTER 31 -- fourteen-person zero-politics production batch, eighth
 * real use of the profile-publication / match-eligibility separation
 * architecture (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` via
 * \`src/dev/roster1000/generateRoster31.ts\`, which calls
 * \`preparePersonSeedForPromotion()\` per candidate -- NOT \`toPersonSeed()\`
 * directly -- and never checks \`computedEligibility.eligible\`. All fourteen
 * are \`evidence_approved\`. Every score's rationale is preserved as the
 * inline comment above its Row. Full record:
 * \`docs/checkpoints/roster31-fifteen-person-zero-politics-batch.md\`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_31: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
