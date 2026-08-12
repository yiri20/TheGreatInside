/**
 * SIGNATURE-TRAIT DIAGNOSTIC
 *
 * For every canonical attribute: how many quiz items load on it, total raw
 * mapping weight, the simulated population's mean and sd on that attribute,
 * and how often it ends up as a user's `signatureTrait()` (distinctiveTraits.ts
 * — the most-distinctive HIGH trait, by z-score against the reference mean/sd,
 * not the highest raw score).
 *
 * Purpose: distinguish "this trait is legitimately more discriminating" from
 * "the question bank measures this trait more aggressively than the others",
 * per CLAUDE.md Phase 2 objective 4. Do not equalise frequency by fiat — only
 * rebalance items where the bank itself is the cause.
 *
 * Run: corepack pnpm@10 exec tsx src/dev/trait-diagnostic.ts
 */
import { ATTRIBUTE_IDS, ATTRIBUTES, type AttributeId } from "../core/attributes/attributes.js";
import { QUIZ } from "../core/quiz/bank.js";
import { analyseCoverage, analyseDirectionBalance } from "../core/quiz/scoring.js";
import { signatureTrait } from "../core/interpretation/rules.js";
import { simulateQuizProfile } from "./simulate.js";

const N = 5000;
const users = Array.from({ length: N }, (_, i) => simulateQuizProfile(i + 1));

const coverage = new Map(analyseCoverage(QUIZ).map((c) => [c.attributeId, c]));
const directionBalance = new Map(analyseDirectionBalance(QUIZ).map((d) => [d.attributeId, d]));

const sigCount = new Map<AttributeId, number>();
const scores = new Map<AttributeId, number[]>();
for (const id of ATTRIBUTE_IDS) scores.set(id, []);

for (const user of users) {
  for (const id of ATTRIBUTE_IDS) scores.get(id)!.push(user.scores[id] ?? 50);
  const sig = signatureTrait(user);
  if (sig) sigCount.set(sig.attributeId, (sigCount.get(sig.attributeId) ?? 0) + 1);
}

function meanSd(values: number[]): { mean: number; sd: number } {
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  const sd = Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length);
  return { mean, sd };
}

interface Row {
  id: AttributeId;
  items: number;
  totalWeight: number;
  maxSingleItemShare: number;
  refMean: number;
  refSd: number;
  simMean: number;
  simSd: number;
  meanDiff: number;
  oneSidedShare: number;
  sigFreq: number;
}

const rows: Row[] = ATTRIBUTE_IDS.map((id) => {
  const c = coverage.get(id)!;
  const { mean, sd } = meanSd(scores.get(id)!);
  const def = ATTRIBUTES[id];
  return {
    id,
    items: c.itemCount,
    totalWeight: c.totalWeight,
    maxSingleItemShare: c.maxSingleItemShare,
    refMean: def.reference.mean,
    refSd: def.reference.sd,
    simMean: mean,
    simSd: sd,
    meanDiff: mean - def.reference.mean,
    oneSidedShare: directionBalance.get(id)!.oneSidedShare,
    sigFreq: (sigCount.get(id) ?? 0) / N,
  };
});

rows.sort((a, b) => b.sigFreq - a.sigFreq);

process.stdout.write(
  "\nattribute                 items  totWt  refMean  simMean  meanDiff  refSd  simSd  simSd/refSd  oneSided  sigFreq\n",
);
for (const r of rows) {
  const ratio = r.simSd / r.refSd;
  const flag = r.sigFreq > 2 / ATTRIBUTE_IDS.length ? " <-- overrepresented" : "";
  process.stdout.write(
    `${r.id.padEnd(24)} ${String(r.items).padStart(5)}  ${r.totalWeight.toFixed(2).padStart(5)}  ` +
      `${r.refMean.toFixed(1).padStart(7)}  ${r.simMean.toFixed(1).padStart(7)}  ${r.meanDiff >= 0 ? "+" : ""}${r.meanDiff.toFixed(1).padStart(6)}  ` +
      `${r.refSd.toFixed(1).padStart(5)}  ${r.simSd.toFixed(1).padStart(5)}  ` +
      `${ratio.toFixed(2).padStart(11)}  ${(r.oneSidedShare * 100).toFixed(0).padStart(7)}%  ${(r.sigFreq * 100).toFixed(1).padStart(6)}%${flag}\n`,
  );
}

const uniform = 1 / ATTRIBUTE_IDS.length;
process.stdout.write(`\nUniform signature-trait frequency would be ${(uniform * 100).toFixed(1)}%.\n`);

function pearson(xs: number[], ys: number[]): number {
  const n = xs.length;
  const mx = xs.reduce((s, v) => s + v, 0) / n;
  const my = ys.reduce((s, v) => s + v, 0) / n;
  let num = 0, dx2 = 0, dy2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i]! - mx;
    const dy = ys[i]! - my;
    num += dx * dy;
    dx2 += dx * dx;
    dy2 += dy * dy;
  }
  return num / Math.sqrt(dx2 * dy2);
}

const ratios = rows.map((r) => r.simSd / r.refSd);
const freqs = rows.map((r) => r.sigFreq);
const items = rows.map((r) => r.items);
const weights = rows.map((r) => r.totalWeight);
const meanDiffs = rows.map((r) => r.meanDiff);
const absMeanDiffs = rows.map((r) => Math.abs(r.meanDiff));
const oneSidedShares = rows.map((r) => r.oneSidedShare);

process.stdout.write(`\ncorrelation(simSd/refSd, sigFreq)     = ${pearson(ratios, freqs).toFixed(3)}\n`);
process.stdout.write(`correlation(itemCount, sigFreq)       = ${pearson(items, freqs).toFixed(3)}\n`);
process.stdout.write(`correlation(totalWeight, sigFreq)     = ${pearson(weights, freqs).toFixed(3)}\n`);
process.stdout.write(`correlation(|meanDiff|, sigFreq)       = ${pearson(absMeanDiffs, freqs).toFixed(3)}\n`);
process.stdout.write(`correlation(oneSidedShare, meanDiff)   = ${pearson(oneSidedShares, meanDiffs).toFixed(3)}  <-- the causal mechanism check\n`);
process.stdout.write(`correlation(oneSidedShare, |meanDiff|) = ${pearson(oneSidedShares, absMeanDiffs).toFixed(3)}\n\n`);

process.stdout.write("--- largest reference-mean deviations (|meanDiff| descending) ---\n");
for (const r of [...rows].sort((a, b) => Math.abs(b.meanDiff) - Math.abs(a.meanDiff)).slice(0, 10)) {
  process.stdout.write(
    `  ${r.id.padEnd(24)} refMean=${r.refMean.toFixed(1).padStart(5)}  simMean=${r.simMean.toFixed(1).padStart(5)}  ` +
      `diff=${r.meanDiff >= 0 ? "+" : ""}${r.meanDiff.toFixed(1)}\n`,
  );
}
process.stdout.write("\n");
