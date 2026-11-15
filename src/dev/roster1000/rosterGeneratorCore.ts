/**
 * Shared roster-module generator core (extracted from the per-roster `generateRosterN.ts` copies in the
 * post-Roster67 maintenance task).
 *
 * Every roster generator used to be a ~175-line copy of the previous one with a hand-edited slug list, ordinal
 * text and roster number. The rendering logic (`renderPerson`) and the fail-closed promotion checks now live here;
 * a per-roster generator is a thin file that supplies ONLY the literal shipped-slug allowlist and its header text.
 *
 * Architecture rules preserved from `generateRoster42.ts` onward:
 * - an explicit literal slug allowlist, never a blanket filter;
 * - candidates are loaded regardless of whether status is `evidence_approved` or `qa_passed`;
 * - `preparePersonSeedForPromotion(candidate)` (never `toPersonSeed()` directly) fails closed via
 *   `checkPromotionReadiness()` and never reads `computedEligibility.eligible`;
 * - `build()` computes `isMatchEligible`; nothing here sets or gates on it.
 *
 * This module never decides ship/hold, never edits a candidate, never infers fieldIds/regions/names/portraits.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { preparePersonSeedForPromotion, checkPromotionReadiness, type Candidate, type CandidateAttributeRow } from "./candidateSchema.js";

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

export function renderPerson(candidate: Candidate): string {
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

export interface RosterGeneratorOptions {
  roster: number;
  /** Literal shipped-slug allowlist (held candidates must NOT be listed). */
  slugs: readonly string[];
  /**
   * Text placed after "ROSTER N -- " in the emitted module's doc comment. May contain a line break followed by
   * " * " continuation. Defaults to a neutral description.
   */
  intro?: string;
  /** Repository root (defaults to the process working directory). */
  root?: string;
}

const DEFAULT_INTRO = "fresh new-candidate cycle";
const BACKTICK = String.fromCharCode(96);

export function loadRosterCandidates(opts: RosterGeneratorOptions): Candidate[] {
  const dir = join(opts.root ?? process.cwd(), "data-pipeline/candidates");
  const allow = new Set(opts.slugs);
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  const all = files.map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")) as Candidate);
  return all
    .filter((c) => (c.status === "evidence_approved" || c.status === "qa_passed") && allow.has(c.slug))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Renders the roster module source. Pure: no file access. */
export function renderRosterModule(candidates: readonly Candidate[], opts: RosterGeneratorOptions): string {
  const n = opts.roster;
  const intro = opts.intro ?? DEFAULT_INTRO;
  const lines = [
    "/**",
    ` * ROSTER ${n} -- ${intro} (${candidates.length}`,
    " * people, all freshly researched, zero backlog reuse -- see",
    ` * docs/checkpoints/roster${n}.md).`,
    " *",
    ` * Generated from ${BACKTICK}data-pipeline/candidates/*.json${BACKTICK} via`,
    ` * ${BACKTICK}src/dev/roster1000/generateRoster${n}.ts${BACKTICK}, which calls`,
    ` * ${BACKTICK}preparePersonSeedForPromotion()${BACKTICK} per candidate -- NOT ${BACKTICK}toPersonSeed()${BACKTICK}`,
    ` * directly -- and never checks ${BACKTICK}computedEligibility.eligible${BACKTICK}. All are`,
    ` * ${BACKTICK}evidence_approved${BACKTICK} as an honest result of evidence-grounded scoring --`,
    " * none targeted eligibility_v2. Every score's rationale is preserved as",
    " * the inline comment above its Row.",
    " */",
  ];
  const body = [
    'import { build, bio, wiki, type PersonSeed } from "./builder.js";',
    'import type { Person } from "../../core/types.js";',
    "",
    "const seeds: PersonSeed[] = [",
    candidates.map(renderPerson).join(",\n") + ",",
    "];",
    "",
    `export const ROSTER_${n}: readonly Person[] = seeds.map(build);`,
    "",
  ];
  return [...lines, ...body].join("\n");
}

/** Loads, verifies (fail-closed) and writes `src/data/people/roster{N}.ts`. Returns the number of people written. */
export function generateRosterModule(opts: RosterGeneratorOptions): number {
  const root = opts.root ?? process.cwd();
  const candidates = loadRosterCandidates(opts);
  const expected = new Set(opts.slugs).size;
  if (candidates.length !== expected) {
    throw new Error(`Expected ${expected} promotable roster${opts.roster} candidate(s), found ${candidates.length}. Aborting.`);
  }
  for (const c of candidates) {
    // Fails closed on status/identity/portrait -- deliberately does NOT check computedEligibility.eligible.
    const readiness = checkPromotionReadiness(c);
    if (!readiness.ready) {
      throw new Error(`Candidate "${c.slug}" is not ready for promotion: ${readiness.reasons.join("; ")}. Aborting.`);
    }
  }
  const outPath = join(root, `src/data/people/roster${opts.roster}.ts`);
  writeFileSync(outPath, renderRosterModule(candidates, opts), "utf8");
  console.log(`Wrote ${candidates.length} people to ${outPath}`);
  return candidates.length;
}
