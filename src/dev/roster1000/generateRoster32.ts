/**
 * ROSTER 32 -- evidence-deepening + match-pool-balance cycle, ninth real use
 * of the profile-publication / match-eligibility separation architecture
 * (PR #21, `docs/checkpoints/profile-publication-vs-match-eligibility.md`).
 *
 * Unlike Roster24-31, this cycle's 8 frozen candidates (Pele, Fahrelnissa
 * Zeid, Virginia Woolf, Matsuo Basho, James Baldwin, Al-Farabi, George
 * Bernard Shaw, Pablo Neruda) were deepened with genuinely NEW behavioral
 * research, not selected for existing evidence-richness. All 8 were `held`
 * purely on `eligibility_v2` at the start of the cycle. After deepening,
 * publication readiness was reassessed **eligibility-blind**, per the
 * architecture doc's own test ("is this evidence-backed profile good
 * enough to publish?", never a numeric floor) -- NOT by re-checking row
 * count or eligibility distance. That review found 7 of 8 publication-safe
 * (no identity/attribution/provenance defect) and promoted them to
 * `evidence_approved`; **Al-Farabi remains `held`** on a concrete,
 * newly-exposed defect: his existing `autonomy_need` row rests specifically
 * on the same late medieval biographical-dictionary tradition this cycle's
 * own research found unreliable for personal-life claims about him -- not
 * a row-count issue, and not touched (no new research, no rescoring; see
 * his candidate file's own holdReason).
 *
 * Zero politics/state/military/activist-primary people (0/8) -- Neruda and
 * Shaw's PRE-EXISTING rows do include some political/diplomatic/Fabian
 * material, which is not a defect: this project's zero-politics rule
 * governs a person's PRIMARY product identity (both are unambiguously
 * "poet"/"playwright" via Nobel Prizes and global readership), not the
 * absence of any political fact from an individual's documented biography.
 * Those pre-existing rows are unchanged, not sanitized.
 *
 * None of the 7 became newly match-eligible -- publication here is
 * genuinely independent of `eligibility_v2`, which none of the 7 pass
 * (Shaw and Neruda come closest, each missing by a narrow margin on
 * specific sub-gates; see each candidate file's own provenance notes for
 * the exact, corrected diagnostic). See
 * `docs/checkpoints/roster32-evidence-deepening-balance-cycle.md` for the
 * full account, including the mechanically-derived row-change ledger and
 * the eligibility-blind publication-decision table for all 8.
 *
 * Same architecture as `generateRoster31.ts`:
 * - explicit literal slug allowlist (below), never a blanket filter;
 * - loads candidates regardless of whether status is `evidence_approved`
 *   or `qa_passed`;
 * - calls `preparePersonSeedForPromotion(candidate)`, NOT `toPersonSeed()`
 *   directly, and never checks `computedEligibility.eligible`;
 * - lets `build()` compute `isMatchEligible` untouched and relies on
 *   `preparePersonSeedForPromotion()`'s own `directoryVisible: true`
 *   default.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster32.ts
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { preparePersonSeedForPromotion, checkPromotionReadiness, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");
const OUT_PATH = join(process.cwd(), "src/data/people/roster32.ts");

// Explicit literal allowlist -- exactly the 7 candidates this cycle's
// eligibility-blind publication review found publication-safe. Al-Farabi
// was deliberately NOT included here: a concrete attribution defect on his
// existing autonomy_need row (see his candidate file's holdReason and the
// checkpoint doc). His candidate file remains `held`.
const ROSTER_32_SLUGS = new Set([
  "pele",
  "fahrelnissa-zeid",
  "virginia-woolf",
  "matsuo-basho",
  "james-baldwin",
  "george-bernard-shaw",
  "pablo-neruda",
]);

function loadRoster32(): Candidate[] {
  const files = readdirSync(CANDIDATES_DIR).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(CANDIDATES_DIR, f), "utf8")) as Candidate);
  return all
    .filter((c) => (c.status === "evidence_approved" || c.status === "qa_passed") && ROSTER_32_SLUGS.has(c.slug))
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
  const candidates = loadRoster32();

  if (candidates.length !== ROSTER_32_SLUGS.size) {
    console.error(`Expected ${ROSTER_32_SLUGS.size} promotable roster32 candidate(s), found ${candidates.length}. Aborting.`);
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
 * ROSTER 32 -- evidence-deepening + match-pool-balance cycle, ninth real
 * use of the profile-publication / match-eligibility separation
 * architecture (${candidates.length} people).
 *
 * Generated from \`data-pipeline/candidates/*.json\` via
 * \`src/dev/roster1000/generateRoster32.ts\`, which calls
 * \`preparePersonSeedForPromotion()\` per candidate -- NOT \`toPersonSeed()\`
 * directly -- and never checks \`computedEligibility.eligible\`. All seven
 * are \`evidence_approved\` and non-match-eligible by design; none were
 * rescued toward eligibility. Every score's rationale is preserved as the
 * inline comment above its Row. Full record:
 * \`docs/checkpoints/roster32-evidence-deepening-balance-cycle.md\`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
${candidates.map(renderPerson).join(",\n")},
];

export const ROSTER_32: readonly Person[] = seeds.map(build);
`;

  writeFileSync(OUT_PATH, source, "utf8");
  console.log(`Wrote ${candidates.length} people to ${OUT_PATH}`);
}

main();
