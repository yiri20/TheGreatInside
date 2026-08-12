/**
 * One-off diagnostic: is #1-match domination driven by profile LEVEL (whoever
 * is least extreme sits nearest an average user) or by profile SHAPE?
 *
 * Run: pnpm exec tsx src/dev/diagnose.ts
 */
import { ATTRIBUTE_IDS } from "../core/attributes/attributes.js";
import { SEED_PEOPLE } from "../data/people/seed.js";
import { QUIZ } from "../core/quiz/bank.js";
import { analyseCoverage } from "../core/quiz/scoring.js";

const rows = SEED_PEOPLE.map((p) => {
  const scores = p.attributes.map((a) => a.score);
  const mean = scores.reduce((s, v) => s + v, 0) / scores.length;
  const sd = Math.sqrt(scores.reduce((s, v) => s + (v - mean) ** 2, 0) / scores.length);
  return { id: p.id, mean, sd, min: Math.min(...scores), max: Math.max(...scores) };
}).sort((a, b) => a.mean - b.mean);

process.stdout.write(`\nattributes: ${ATTRIBUTE_IDS.length}\n\n`);
process.stdout.write("person                    mean    sd   min  max\n");
for (const r of rows) {
  process.stdout.write(
    `${r.id.padEnd(24)} ${r.mean.toFixed(1).padStart(5)} ${r.sd.toFixed(1).padStart(5)} ` +
      `${String(r.min).padStart(4)} ${String(r.max).padStart(4)}\n`,
  );
}
process.stdout.write("\nSimulated users are centred near 50-55, so the person with the LOWEST\n");
process.stdout.write("overall mean is structurally closest to an average profile.\n\n");

process.stdout.write("--- question bank coverage (items / weight / largest single-item share) ---\n");
const coverage = analyseCoverage(QUIZ).sort((a, b) => b.maxSingleItemShare - a.maxSingleItemShare);
for (const c of coverage) {
  const flag = c.itemCount < 2 || c.maxSingleItemShare > 0.55 ? "  <-- FIX" : "";
  process.stdout.write(
    `  ${c.attributeId.padEnd(24)} items=${c.itemCount}  w=${c.totalWeight.toFixed(2).padStart(5)}  ` +
      `maxShare=${c.maxSingleItemShare.toFixed(2)}${flag}\n`,
  );
}
process.stdout.write("\n");
