/**
 * PHASE 6.6 STAGE 9A — FINAL GREATNESS_V1 VALIDATION
 *
 * Diagnostic-only, read-only. Runs the ACTUAL quiz_v2 -> scoreQuiz ->
 * computeGreatnessPotential pipeline at scale and reports the raw/displayed
 * Greatness distribution PLUS each of the four components (A/D/C/E)
 * individually, their correlation with the final score, and a set of
 * pathology checks (dominance, compression, ceiling/floor clustering,
 * all-high-profile advantage, flat-profile advantage). Never writes
 * anything, never tunes greatness_v1 — this is validation only.
 *
 * Run: corepack pnpm@10 exec tsx src/dev/stage9-diagnostics.ts [N] [seedOffset]
 */
import { pathToFileURL } from "node:url";
import { ATTRIBUTE_IDS, ATTRIBUTES, type AttributeId } from "../core/attributes/attributes.js";
import { computeGreatnessPotential } from "../core/greatness/greatness.js";
import { SEED_PEOPLE } from "../data/people/seed.js";
import { simulateQuizProfile } from "./simulate.js";
import type { UserProfile } from "../core/types.js";

const NEW_ATTRS: AttributeId[] = ["opportunity_sensing", "resourcefulness", "proactive_agency", "belief_updating"];
const ORIGINAL_30 = ATTRIBUTE_IDS.filter((id) => !NEW_ATTRS.includes(id));

/** Reimplements distinctiveness() (greatness.ts) restricted to a given
 *  attribute pool — used ONLY to isolate whether taxonomy_v1.1's D-component
 *  ceiling clustering is a NEW artifact of having 34 candidates (vs 30) to
 *  pick the "top 5 most extreme" from, or was already present. Never used
 *  in production; diagnostic only. */
function distinctivenessOver(ids: readonly AttributeId[], user: UserProfile): number {
  const Z_CAP = 2.2;
  const zs = ids
    .map((id) => {
      const ref = ATTRIBUTES[id].reference;
      const score = user.scores[id];
      return score === undefined ? 0 : Math.min(Z_CAP, Math.abs((score - ref.mean) / ref.sd));
    })
    .sort((a, b) => b - a);
  const top = zs.slice(0, 5);
  return Math.min(1, Math.max(0, top.reduce((s, z) => s + z, 0) / (top.length * Z_CAP)));
}

function pAt(values: readonly number[], q: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor(q * (sorted.length - 1))))] ?? 0;
}
function meanOf(xs: readonly number[]): number {
  return xs.reduce((s, v) => s + v, 0) / Math.max(1, xs.length);
}
function sdOf(xs: readonly number[]): number {
  const m = meanOf(xs);
  return Math.sqrt(xs.reduce((s, v) => s + (v - m) ** 2, 0) / Math.max(1, xs.length));
}
function pearson(xs: readonly number[], ys: readonly number[]): number {
  const n = xs.length;
  const mx = meanOf(xs);
  const my = meanOf(ys);
  let num = 0;
  let dx2 = 0;
  let dy2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i]! - mx;
    const dy = ys[i]! - my;
    num += dx * dy;
    dx2 += dx * dx;
    dy2 += dy * dy;
  }
  const den = Math.sqrt(dx2 * dy2);
  return den === 0 ? 0 : num / den;
}
function distLine(label: string, values: readonly number[]): string {
  return `  ${label.padEnd(24)} n=${values.length}  min=${pAt(values, 0).toFixed(3)}  p5=${pAt(values, 0.05).toFixed(3)}  p25=${pAt(values, 0.25).toFixed(3)}  med=${pAt(values, 0.5).toFixed(3)}  p75=${pAt(values, 0.75).toFixed(3)}  p95=${pAt(values, 0.95).toFixed(3)}  max=${pAt(values, 1).toFixed(3)}  mean=${meanOf(values).toFixed(3)}  sd=${sdOf(values).toFixed(3)}`;
}

function runValidate(n: number, seedOffset: number): void {
  process.stdout.write(`\n=== STAGE 9A — GREATNESS_V1 FINAL VALIDATION: ${n} profiles, seedOffset=${seedOffset} ===\n\n`);

  const rawScores: number[] = [];
  const dispScores: number[] = [];
  const A: number[] = [];
  const D: number[] = [];
  const D30: number[] = []; // counterfactual: D computed over the original 30 attributes only
  const C: number[] = [];
  const E: number[] = [];
  // Contribution of each weighted term to the final raw score, to check for
  // one component silently dominating beyond its nominal weight.
  const Aw: number[] = [];
  const Dw: number[] = [];
  const Cw: number[] = [];
  const Ew: number[] = [];
  // Flat-profile / all-high checks: own-scatter of the SIMULATED USER's
  // vector (not a person's) vs. their D/score.
  const userScatter: number[] = [];
  const userMeanLevel: number[] = [];

  for (let i = 0; i < n; i++) {
    const user = simulateQuizProfile(seedOffset + i + 1);
    const g = computeGreatnessPotential(user, { people: SEED_PEOPLE });
    rawScores.push(g.rawScore);
    dispScores.push(g.score);
    A.push(g.components.archetypeAffinity);
    D.push(g.components.distinctiveness);
    D30.push(distinctivenessOver(ORIGINAL_30, user));
    C.push(g.components.coherence);
    E.push(g.components.engineTraits);
    Aw.push(0.5 * g.components.archetypeAffinity);
    Dw.push(0.22 * g.components.distinctiveness);
    Cw.push(0.13 * g.components.coherence);
    Ew.push(0.15 * g.components.engineTraits);

    const vals = ATTRIBUTE_IDS.map((id) => user.scores[id] ?? 50);
    const level = meanOf(vals);
    userMeanLevel.push(level);
    userScatter.push(sdOf(vals));
  }

  process.stdout.write("--- Greatness distribution ---\n");
  process.stdout.write(distLine("raw", rawScores) + "\n");
  process.stdout.write(distLine("displayed (0-100)", dispScores) + "\n\n");

  process.stdout.write("--- component distributions (each in [0,1]) ---\n");
  process.stdout.write(distLine("A archetypeAffinity", A) + "\n");
  process.stdout.write(distLine("D distinctiveness", D) + "\n");
  process.stdout.write(distLine("D (counterfactual: 30-attr only)", D30) + "\n");
  process.stdout.write(distLine("C coherence", C) + "\n");
  process.stdout.write(distLine("E engineTraits", E) + "\n\n");

  process.stdout.write("--- weighted contribution to raw score (component * its GREATNESS_WEIGHTS coefficient) ---\n");
  process.stdout.write(`  mean weighted A (x0.50): ${meanOf(Aw).toFixed(4)}  share of mean raw: ${((meanOf(Aw) / meanOf(rawScores)) * 100).toFixed(1)}%\n`);
  process.stdout.write(`  mean weighted D (x0.22): ${meanOf(Dw).toFixed(4)}  share of mean raw: ${((meanOf(Dw) / meanOf(rawScores)) * 100).toFixed(1)}%\n`);
  process.stdout.write(`  mean weighted C (x0.13): ${meanOf(Cw).toFixed(4)}  share of mean raw: ${((meanOf(Cw) / meanOf(rawScores)) * 100).toFixed(1)}%\n`);
  process.stdout.write(`  mean weighted E (x0.15): ${meanOf(Ew).toFixed(4)}  share of mean raw: ${((meanOf(Ew) / meanOf(rawScores)) * 100).toFixed(1)}%\n`);
  process.stdout.write(`  (nominal weights: A=50% D=22% C=13% E=15% of raw score by construction)\n\n`);

  process.stdout.write("--- component correlation with final raw score (Pearson r) ---\n");
  process.stdout.write(`  corr(A, rawScore) = ${pearson(A, rawScores).toFixed(3)}\n`);
  process.stdout.write(`  corr(D, rawScore) = ${pearson(D, rawScores).toFixed(3)}\n`);
  process.stdout.write(`  corr(C, rawScore) = ${pearson(C, rawScores).toFixed(3)}\n`);
  process.stdout.write(`  corr(E, rawScore) = ${pearson(E, rawScores).toFixed(3)}\n\n`);

  process.stdout.write("--- pathology checks ---\n");
  const ceilingCount = dispScores.filter((s) => s >= 95).length;
  const floorCount = dispScores.filter((s) => s <= 10).length;
  process.stdout.write(`  ceiling clustering (displayed >= 95): ${ceilingCount}/${n} (${((ceilingCount / n) * 100).toFixed(2)}%)\n`);
  process.stdout.write(`  floor clustering (displayed <= 10):   ${floorCount}/${n} (${((floorCount / n) * 100).toFixed(2)}%)\n`);
  const maxDisp = dispScores.reduce((m, v) => (v > m ? v : m), -Infinity);
  process.stdout.write(`  max displayed score observed: ${maxDisp}\n`);

  process.stdout.write(`  corr(user own-scatter, D component):        r=${pearson(userScatter, D).toFixed(3)}\n`);
  process.stdout.write(`  corr(user own-scatter, displayed score):    r=${pearson(userScatter, dispScores).toFixed(3)}\n`);
  process.stdout.write(`  corr(user mean level, displayed score):     r=${pearson(userMeanLevel, dispScores).toFixed(3)}\n`);
  process.stdout.write(
    "  (a large POSITIVE own-scatter correlation is expected/healthy — a flat, undifferentiated profile\n" +
      "   should not score high; a large positive mean-level correlation would be the 'all-high advantage'\n" +
      "   failure mode this check exists to catch, since raw score is NOT an average of trait scores by design)\n\n",
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const n = Number(process.argv[2] ?? 20000);
  const seedOffset = Number(process.argv[3] ?? 0);
  runValidate(n, seedOffset);
}
