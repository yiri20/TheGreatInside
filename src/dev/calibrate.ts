/**
 * CALIBRATION GENERATOR — pnpm calibrate
 *
 * Two jobs:
 *
 *  1. Regenerates `src/core/matching/dispersion.generated.ts` from the current
 *     dataset (how much do notable people actually vary on each attribute).
 *
 *  2. Reports the EMPIRICAL raw-score percentiles for Profile Match and
 *     Greatness Potential, and prints anchor tables that map those percentiles
 *     onto the intended display distribution.
 *
 * Anchors are printed for a human to paste, not written automatically: the
 * target display distribution is a PRODUCT decision (how exciting should a
 * typical result feel?) informed by data, not derived from it. Dispersion is
 * pure data, so that one is written directly.
 *
 * Run twice after a dataset change: the first run writes dispersion, the second
 * reports percentiles computed with that new dispersion in effect.
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { ATTRIBUTE_IDS, type AttributeId } from "../core/attributes/attributes.js";
import { dispersionToWeight } from "../core/matching/dispersion.js";
import { matchUserToPerson } from "../core/matching/similarity.js";
import { computeGreatnessPotential } from "../core/greatness/greatness.js";
import { SEED_PEOPLE } from "../data/people/seed.js";
import { simulateProfile, simulateQuizProfile } from "./simulate.js";

/**
 * Calibrate against the QUIZ pipeline by default. Fabricated Gaussian vectors
 * are smoother than what a 30-item forced-choice bank actually produces, and
 * anchors fitted on them mis-set the live product: the first pass fitted on
 * vectors put the Greatness median at 89 once real quiz profiles went through.
 */
const MODE = (process.argv[2] as "vector" | "quiz" | undefined) ?? "quiz";
const makeProfile = MODE === "quiz" ? simulateQuizProfile : simulateProfile;

const here = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------------------ 1. dispersion snapshot */

function attributeDispersion(): Map<AttributeId, number> {
  const out = new Map<AttributeId, number>();
  for (const id of ATTRIBUTE_IDS) {
    const values: number[] = [];
    for (const person of SEED_PEOPLE) {
      if (!person.isMatchEligible) continue;
      const a = person.attributes.find((x) => x.attributeId === id);
      if (a) values.push(a.score);
    }
    if (values.length < 2) {
      out.set(id, 0);
      continue;
    }
    const mean = values.reduce((s, v) => s + v, 0) / values.length;
    const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / (values.length - 1);
    out.set(id, Math.sqrt(variance));
  }
  return out;
}

function writeDispersion(): void {
  const sds = attributeDispersion();
  const present = [...sds.values()].filter((v) => v > 0);
  const meanSd = present.reduce((s, v) => s + v, 0) / Math.max(1, present.length);

  const rows = ATTRIBUTE_IDS.map((id) => {
    const sd = sds.get(id) ?? meanSd;
    const w = dispersionToWeight(sd === 0 ? meanSd : sd, meanSd);
    return `  ${id}: ${w.toFixed(4)},`;
  }).join("\n");

  const body = `/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from ${SEED_PEOPLE.filter((p) => p.isMatchEligible).length} match-eligible seed profiles.
 * meanSd = ${meanSd.toFixed(3)}
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
${rows}
};
`;
  const target = resolve(here, "../core/matching/dispersion.generated.ts");
  writeFileSync(target, body, "utf8");
  process.stdout.write(`wrote ${target}\n  meanSd=${meanSd.toFixed(3)}\n\n`);

  const ranked = ATTRIBUTE_IDS.map((id) => [id, sds.get(id) ?? 0] as const).sort(
    (a, b) => b[1] - a[1],
  );
  process.stdout.write("--- attribute dispersion across the dataset (sd) ---\n");
  for (const [id, sd] of ranked) {
    process.stdout.write(`  ${id.padEnd(24)} sd=${sd.toFixed(1).padStart(5)}  w=${dispersionToWeight(sd, meanSd).toFixed(3)}\n`);
  }
  process.stdout.write("\n");
}

/* ------------------------------------------------- 2. percentile reports */

function percentiles(values: number[], qs: number[]): Array<[number, number]> {
  const sorted = [...values].sort((a, b) => a - b);
  return qs.map((q) => [q, sorted[Math.min(sorted.length - 1, Math.floor(q * (sorted.length - 1)))] ?? 0]);
}

/**
 * Target display values by percentile of the ALL-PAIRS distribution.
 * Chosen so that: a randomly chosen person reads as clearly not-you; the best of
 * ~10 people lands in the 60s-80s; and the tail stays reachable so a genuinely
 * close match still feels like one. Not tuned to flatter — the median stays
 * below 50 on purpose.
 */
const MATCH_TARGETS: Array<[number, number]> = [
  [0.001, 6],
  [0.01, 11],
  [0.05, 18],
  [0.1, 23],
  [0.25, 32],
  [0.5, 44],
  [0.75, 57],
  [0.9, 69],
  [0.95, 76],
  [0.99, 86],
  [0.999, 93],
];

/** Target Greatness Potential by percentile: mean near 60, real spread, no floor inflation. */
const GREATNESS_TARGETS: Array<[number, number]> = [
  [0.001, 8],
  [0.01, 17],
  [0.05, 27],
  [0.1, 34],
  [0.25, 46],
  [0.5, 58],
  [0.75, 70],
  [0.9, 80],
  [0.95, 86],
  [0.99, 93],
  [0.999, 97],
];

function reportAnchors(label: string, raws: number[], targets: Array<[number, number]>, top: number): void {
  const qs = targets.map(([q]) => q);
  const pts = percentiles(raws, qs);
  process.stdout.write(`--- proposed ${label} anchors ---\n`);
  process.stdout.write("  [0.0, 1],\n");
  const seen = new Set<string>();
  for (let i = 0; i < pts.length; i++) {
    const raw = Number(pts[i]![1].toFixed(4));
    const display = targets[i]![1];
    const key = String(raw);
    if (seen.has(key)) continue;
    seen.add(key);
    process.stdout.write(`  [${raw}, ${display}],   // p${(qs[i]! * 100).toFixed(1)}\n`);
  }
  process.stdout.write(`  [1.0, ${top}],\n\n`);
}

/**
 * Stage 8 (Phase 6.6): N and seedOffset are overridable via CLI args 3/4 so
 * the calibration_v3 fit can run at a much larger sample (>=50,000) than the
 * historical default, and so a second run at a different seedOffset can
 * verify the fitted anchors are not seed-specific — without changing the
 * default behaviour any earlier-phase invocation relied on.
 */
function reportPercentiles(n = 10000, seedOffset = 0): void {
  const matchRaws: number[] = [];
  const topRaws: number[] = [];
  const top2Raws: number[] = [];
  const top3Raws: number[] = [];
  const minRaws: number[] = [];
  const greatnessRaws: number[] = [];

  for (let i = 0; i < n; i++) {
    const user = makeProfile(seedOffset + i + 1);
    const perUser: number[] = [];
    for (const person of SEED_PEOPLE) {
      if (!person.isMatchEligible) continue;
      const raw = matchUserToPerson(user, person).rawSimilarity;
      matchRaws.push(raw);
      perUser.push(raw);
    }
    perUser.sort((a, b) => b - a);
    topRaws.push(perUser[0] ?? 0);
    top2Raws.push(perUser[1] ?? perUser[0] ?? 0);
    top3Raws.push(perUser[2] ?? perUser[0] ?? 0);
    minRaws.push(perUser[perUser.length - 1] ?? 0);
    greatnessRaws.push(computeGreatnessPotential(user, { people: SEED_PEOPLE }).rawScore);
  }

  const show = (label: string, v: number[]) => {
    const p = percentiles(v, [0, 0.05, 0.1, 0.25, 0.5, 0.75, 0.9, 0.95, 1]);
    process.stdout.write(
      `${label.padEnd(22)} ${p.map(([q, x]) => `p${(q * 100).toFixed(0)}=${x.toFixed(3)}`).join("  ")}\n`,
    );
  };

  process.stdout.write(`--- raw score percentiles (mode: ${MODE}, n=${n}, seedOffset=${seedOffset}) ---\n`);
  show("match raw (all)", matchRaws);
  show("match raw (top 1)", topRaws);
  show("match raw (top 2)", top2Raws);
  show("match raw (top 3)", top3Raws);
  show("match raw (min/opposite)", minRaws);
  show("greatness raw", greatnessRaws);
  process.stdout.write("\n");

  reportAnchors("MATCH", matchRaws, MATCH_TARGETS, 99);
  reportAnchors("GREATNESS", greatnessRaws, GREATNESS_TARGETS, 99);
}

writeDispersion();
reportPercentiles(Number(process.argv[3] ?? 10000), Number(process.argv[4] ?? 0));
