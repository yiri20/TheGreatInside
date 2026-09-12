/**
 * Match-pool integrity audit (post-Roster32, 2026-09).
 *
 * Read-only. Never mutates SEED_PEOPLE, any candidate JSON, or any roster
 * file. Answers one mechanical question: is the current 127-person
 * match-eligible cohort's recorded evidence (scored-attribute count,
 * coverage, high-confidence count/average, evidence-type mix, source
 * count) drawn from the same distribution as directory-visible people who
 * are NOT match-eligible -- in particular the recently evidence_approved
 * Roster30-32 cohort -- or does it look like a distinct, looser-standard
 * population. This script only computes distributions; it does not judge
 * evidence QUALITY (that's the separate manual row-audit in
 * docs/checkpoints/match-pool-integrity-post-roster32.md).
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/audits/matchPoolIntegrityAudit.ts
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Person } from "../../../core/types.js";
import { evaluateMatchEligibility } from "../../../core/matching/similarity.js";
import { PROFESSION_CATEGORIES } from "../../../core/people/directoryTaxonomy.js";
import { SEED_PEOPLE } from "../../../data/people/seed.js";
import { ROSTER_2 } from "../../../data/people/roster2.js";
import { ROSTER_3 } from "../../../data/people/roster3.js";
import { ROSTER_4 } from "../../../data/people/roster4.js";
import { ROSTER_5 } from "../../../data/people/roster5.js";
import { ROSTER_6 } from "../../../data/people/roster6.js";
import { ROSTER_7 } from "../../../data/people/roster7.js";
import { ROSTER_8 } from "../../../data/people/roster8.js";
import { ROSTER_9 } from "../../../data/people/roster9.js";
import { ROSTER_10 } from "../../../data/people/roster10.js";
import { ROSTER_11 } from "../../../data/people/roster11.js";
import { ROSTER_12 } from "../../../data/people/roster12.js";
import { ROSTER_14 } from "../../../data/people/roster14.js";
import { ROSTER_15 } from "../../../data/people/roster15.js";
import { ROSTER_16 } from "../../../data/people/roster16.js";
import { ROSTER_24 } from "../../../data/people/roster24.js";
import { ROSTER_25 } from "../../../data/people/roster25.js";
import { ROSTER_26 } from "../../../data/people/roster26.js";
import { ROSTER_27 } from "../../../data/people/roster27.js";
import { ROSTER_28 } from "../../../data/people/roster28.js";
import { ROSTER_29 } from "../../../data/people/roster29.js";
import { ROSTER_30 } from "../../../data/people/roster30.js";
import { ROSTER_31 } from "../../../data/people/roster31.js";
import { ROSTER_32 } from "../../../data/people/roster32.js";

const CANDIDATES_DIR = join(process.cwd(), "data-pipeline/candidates");

/* ------------------------------------------------------------- lineage */

// Every NAMED roster generation, in order. Roster 1 is the original 10,
// authored inline in seed.ts's own `seeds` array and never separately
// exported -- anyone not found in roster 2-32 below is classified roster1
// by elimination. Rosters 13, 17-23 do not exist as production rosters
// (each cycle either promoted zero candidates or was reverted -- see
// docs/checkpoints/roster.md); they are intentionally absent here.
const NAMED_ROSTERS: ReadonlyArray<readonly [string, readonly Person[]]> = [
  ["roster2", ROSTER_2],
  ["roster3", ROSTER_3],
  ["roster4", ROSTER_4],
  ["roster5", ROSTER_5],
  ["roster6", ROSTER_6],
  ["roster7", ROSTER_7],
  ["roster8", ROSTER_8],
  ["roster9", ROSTER_9],
  ["roster10", ROSTER_10],
  ["roster11", ROSTER_11],
  ["roster12", ROSTER_12],
  ["roster14", ROSTER_14],
  ["roster15", ROSTER_15],
  ["roster16", ROSTER_16],
  ["roster24", ROSTER_24],
  ["roster25", ROSTER_25],
  ["roster26", ROSTER_26],
  ["roster27", ROSTER_27],
  ["roster28", ROSTER_28],
  ["roster29", ROSTER_29],
  ["roster30", ROSTER_30],
  ["roster31", ROSTER_31],
  ["roster32", ROSTER_32],
];

export function buildLineageMap(): ReadonlyMap<string, string> {
  const map = new Map<string, string>();
  for (const [label, roster] of NAMED_ROSTERS) {
    for (const person of roster) map.set(person.slug, label);
  }
  return map;
}

const LINEAGE_MAP = buildLineageMap();

export function classifyLineage(slug: string): string {
  return LINEAGE_MAP.get(slug) ?? "roster1";
}

/** Broad methodology-era bucket, for the coarse comparison the audit asks for. */
export type LineageGroup = "early_hand_authored" | "historical_pipeline" | "recent_cycles";

export function classifyLineageGroup(lineage: string): LineageGroup {
  if (lineage === "roster1" || lineage === "roster2") return "early_hand_authored";
  const n = Number(lineage.replace("roster", ""));
  return n >= 24 ? "recent_cycles" : "historical_pipeline";
}

export function hasCandidateFile(slug: string): boolean {
  return existsSync(join(CANDIDATES_DIR, `${slug}.json`));
}

/* -------------------------------------------------------------- metrics */

export interface PersonInventoryRow {
  slug: string;
  lineage: string;
  lineageGroup: LineageGroup;
  hasCandidateFile: boolean;
  status: string;
  isDirectoryVisible: boolean;
  isMatchEligible: boolean;
  scoredAttributes: number;
  coverage: number;
  highConfidenceCount: number;
  highConfidenceAverage: number;
  overallProfileConfidence: number;
  documented: number;
  strongInference: number;
  inference: number;
  sourceCount: number;
  era: string;
  regionCode: string;
  interestAreas: string[];
}

export function inventoryRow(person: Person): PersonInventoryRow {
  const report = evaluateMatchEligibility(person);
  const documented = person.attributes.filter((a) => a.evidenceType === "documented").length;
  const strongInference = person.attributes.filter((a) => a.evidenceType === "strong_inference").length;
  const inference = person.attributes.filter((a) => a.evidenceType === "inference").length;
  const interestAreas = PROFESSION_CATEGORIES.filter((c) =>
    person.fieldIds.some((f) => c.fieldIds.includes(f)),
  ).map((c) => c.id);
  const lineage = classifyLineage(person.slug);

  return {
    slug: person.slug,
    lineage,
    lineageGroup: classifyLineageGroup(lineage),
    hasCandidateFile: hasCandidateFile(person.slug),
    status: person.status,
    isDirectoryVisible: person.isDirectoryVisible,
    isMatchEligible: person.isMatchEligible,
    scoredAttributes: report.scoredAttributes,
    coverage: report.coverage,
    highConfidenceCount: report.highConfidenceCount,
    highConfidenceAverage: report.highConfidenceAverage,
    overallProfileConfidence: person.overallProfileConfidence,
    documented,
    strongInference,
    inference,
    sourceCount: person.sources.length,
    era: person.era,
    regionCode: person.regionCode,
    interestAreas,
  };
}

export function buildInventory(people: readonly Person[]): PersonInventoryRow[] {
  return people.map(inventoryRow);
}

/* ----------------------------------------------------------- aggregates */

export function median(nums: readonly number[]): number {
  if (nums.length === 0) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1]! + sorted[mid]!) / 2 : sorted[mid]!;
}

function mean(nums: readonly number[]): number {
  return nums.length === 0 ? 0 : nums.reduce((s, n) => s + n, 0) / nums.length;
}

export interface CohortStats {
  count: number;
  medianScoredAttributes: number;
  medianCoverage: number;
  medianHighConfidenceCount: number;
  medianHighConfidenceAverage: number;
  medianOverallProfileConfidence: number;
  documentedShare: number;
  strongInferenceShare: number;
  inferenceShare: number;
  medianSourceCount: number;
  meanSourceCount: number;
  eraDistribution: Record<string, number>;
  interestAreaDistribution: Record<string, number>;
}

export function aggregateCohort(rows: readonly PersonInventoryRow[]): CohortStats {
  const totalRows = rows.reduce((s, r) => s + r.documented + r.strongInference + r.inference, 0);
  const documented = rows.reduce((s, r) => s + r.documented, 0);
  const strongInference = rows.reduce((s, r) => s + r.strongInference, 0);
  const inference = rows.reduce((s, r) => s + r.inference, 0);

  const eraDistribution: Record<string, number> = {};
  const interestAreaDistribution: Record<string, number> = {};
  for (const r of rows) {
    eraDistribution[r.era] = (eraDistribution[r.era] ?? 0) + 1;
    for (const area of r.interestAreas) {
      interestAreaDistribution[area] = (interestAreaDistribution[area] ?? 0) + 1;
    }
  }

  return {
    count: rows.length,
    medianScoredAttributes: median(rows.map((r) => r.scoredAttributes)),
    medianCoverage: median(rows.map((r) => r.coverage)),
    medianHighConfidenceCount: median(rows.map((r) => r.highConfidenceCount)),
    medianHighConfidenceAverage: median(rows.map((r) => r.highConfidenceAverage)),
    medianOverallProfileConfidence: median(rows.map((r) => r.overallProfileConfidence)),
    documentedShare: totalRows === 0 ? 0 : documented / totalRows,
    strongInferenceShare: totalRows === 0 ? 0 : strongInference / totalRows,
    inferenceShare: totalRows === 0 ? 0 : inference / totalRows,
    medianSourceCount: median(rows.map((r) => r.sourceCount)),
    meanSourceCount: mean(rows.map((r) => r.sourceCount)),
    eraDistribution,
    interestAreaDistribution,
  };
}

export function lineageBreakdown(rows: readonly PersonInventoryRow[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of rows) out[r.lineage] = (out[r.lineage] ?? 0) + 1;
  return out;
}

export function lineageGroupBreakdown(rows: readonly PersonInventoryRow[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of rows) out[r.lineageGroup] = (out[r.lineageGroup] ?? 0) + 1;
  return out;
}

/* ------------------------------------------------------------------ CLI */

function main(): void {
  const inventory = buildInventory(SEED_PEOPLE);

  const eligible = inventory.filter((r) => r.isMatchEligible);
  const directoryVisibleNonEligible = inventory.filter((r) => r.isDirectoryVisible && !r.isMatchEligible);
  const recentNonEligible = directoryVisibleNonEligible.filter(
    (r) => r.lineageGroup === "recent_cycles",
  );

  console.log("=== INVENTORY TOTALS ===");
  console.log(
    JSON.stringify(
      {
        productionTotal: inventory.length,
        directoryVisible: inventory.filter((r) => r.isDirectoryVisible).length,
        matchEligible: eligible.length,
        directoryVisibleNonEligible: directoryVisibleNonEligible.length,
        recentCyclesNonEligible: recentNonEligible.length,
      },
      null,
      2,
    ),
  );

  console.log("\n=== MATCH-ELIGIBLE (127) COHORT STATS ===");
  console.log(JSON.stringify(aggregateCohort(eligible), null, 2));

  console.log("\n=== DIRECTORY-VISIBLE NON-ELIGIBLE COHORT STATS ===");
  console.log(JSON.stringify(aggregateCohort(directoryVisibleNonEligible), null, 2));

  console.log("\n=== RECENT (ROSTER24+) NON-ELIGIBLE COHORT STATS ===");
  console.log(JSON.stringify(aggregateCohort(recentNonEligible), null, 2));

  console.log("\n=== MATCH-ELIGIBLE BY LINEAGE (fine) ===");
  console.log(JSON.stringify(lineageBreakdown(eligible), null, 2));

  console.log("\n=== MATCH-ELIGIBLE BY LINEAGE GROUP (coarse) ===");
  console.log(JSON.stringify(lineageGroupBreakdown(eligible), null, 2));

  console.log("\n=== ALL PRODUCTION BY LINEAGE GROUP ===");
  console.log(JSON.stringify(lineageGroupBreakdown(inventory), null, 2));

  console.log("\n=== MATCH-ELIGIBLE WITH NO data-pipeline/candidates/*.json (pre-pipeline legacy) ===");
  console.log(JSON.stringify(eligible.filter((r) => !r.hasCandidateFile).map((r) => r.slug), null, 2));
}

const isDirectRun = (() => {
  try {
    return process.argv[1] !== undefined && fileURLToPath(import.meta.url) === process.argv[1];
  } catch {
    return false;
  }
})();

if (isDirectRun) {
  main();
}
