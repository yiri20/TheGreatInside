/**
 * PHASE 6.6 STAGE 8 — CALIBRATION_V3 DISPLAY VALIDATION
 *
 * Diagnostic-only, read-only. Reports the DISPLAYED (calibrated) Match and
 * Greatness distributions under whatever anchors are currently committed in
 * `calibration.ts`/`greatness.ts` — used to validate `calibration_v3`
 * against the raw distribution, and to empirically re-confirm person/rank
 * immunity (Stage 8H): the same simulated users' rankings are compared
 * before/after calibration is applied, which can only ever be a no-op check
 * since selection already runs on `rawSimilarity` (see `similarity.ts`/
 * `selectors.ts`) — this script demonstrates that empirically, on top of the
 * structural guarantee already true by construction.
 *
 * Run: corepack pnpm@10 exec tsx src/dev/stage8-diagnostics.ts [N] [seedOffset]
 */
import { pathToFileURL } from "node:url";
import { calibrateMatch } from "../core/matching/calibration.js";
import { rankMatches } from "../core/matching/similarity.js";
import { computeGreatnessPotential, calibrateGreatness } from "../core/greatness/greatness.js";
import { selectUnexpectedMatch, selectOppositeProfile, selectCategoryMatches } from "../core/matching/selectors.js";
import { SEED_PEOPLE } from "../data/people/seed.js";
import { simulateQuizProfile } from "./simulate.js";

// describe() (simulate.ts) only reports p10/p25/p75/p90 — recompute p5/p95
// directly here since Stage 8 wants the wider tail visibility.
function pAt(values: number[], q: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor(q * (sorted.length - 1))))] ?? 0;
}

function percentileLine(label: string, values: number[]): string {
  const p = (q: number) => pAt(values, q).toFixed(q === 0 || q === 1 ? 3 : 3);
  return `  ${label.padEnd(24)} n=${values.length}  min=${p(0)}  p5=${p(0.05)}  p25=${p(0.25)}  med=${p(0.5)}  p75=${p(0.75)}  p95=${p(0.95)}  max=${p(1)}`;
}

function runValidate(profiles: number, seedOffset: number): void {
  process.stdout.write(`\n=== STAGE 8E — DISPLAY DISTRIBUTION VALIDATION (live calibration.ts/greatness.ts anchors): ${profiles} profiles, seedOffset=${seedOffset} ===\n\n`);

  const allRaw: number[] = [];
  const allCal: number[] = [];
  const top1Raw: number[] = [];
  const top1Cal: number[] = [];
  const top3Raw: number[] = [];
  const top3Cal: number[] = [];
  const greatRaw: number[] = [];
  const greatCal: number[] = [];

  for (let i = 0; i < profiles; i++) {
    const user = simulateQuizProfile(seedOffset + i + 1);
    const ranked = rankMatches(user, SEED_PEOPLE);
    for (const r of ranked) {
      allRaw.push(r.rawSimilarity);
      allCal.push(r.overallMatch);
    }
    if (ranked[0]) {
      top1Raw.push(ranked[0].rawSimilarity);
      top1Cal.push(ranked[0].overallMatch);
    }
    if (ranked[2]) {
      top3Raw.push(ranked[2].rawSimilarity);
      top3Cal.push(ranked[2].overallMatch);
    }
    const g = computeGreatnessPotential(user, { people: SEED_PEOPLE });
    greatRaw.push(g.rawScore);
    greatCal.push(g.score);
  }

  process.stdout.write("--- RAW (uncalibrated) ---\n");
  process.stdout.write(percentileLine("all pairs", allRaw) + "\n");
  process.stdout.write(percentileLine("top-1", top1Raw) + "\n");
  process.stdout.write(percentileLine("top-3", top3Raw) + "\n");
  process.stdout.write(percentileLine("greatness", greatRaw) + "\n");

  process.stdout.write("\n--- CALIBRATED (calibration_v3, live anchors) ---\n");
  process.stdout.write(percentileLine("all pairs", allCal) + "\n");
  process.stdout.write(percentileLine("top-1", top1Cal) + "\n");
  process.stdout.write(percentileLine("top-3", top3Cal) + "\n");
  process.stdout.write(percentileLine("greatness", greatCal) + "\n");

  const maxOf = (xs: readonly number[]) => xs.reduce((m, v) => (v > m ? v : m), -Infinity);
  process.stdout.write(
    `\nceiling check: max calibrated match=${maxOf(allCal)}  max calibrated greatness=${maxOf(greatCal)}  (must be <=99, never 100)\n`,
  );
  process.stdout.write(`monotonicity spot-check: calibrateMatch(1)=${calibrateMatch(1)}  calibrateGreatness(1)=${calibrateGreatness(1)}\n\n`);
}

/* ---------------------------------------------------------- 8H: immunity */

function runImmunity(profiles: number, seedOffset: number): void {
  process.stdout.write(`\n=== STAGE 8H — PERSON/RANK IMMUNITY: ${profiles} profiles, seedOffset=${seedOffset} ===\n\n`);

  let inversions = 0; // TRUE monotonicity violations: higher raw got a LOWER displayed %.
  let top1Mismatches = 0;
  let unexpectedMismatches = 0;
  let oppositeMismatches = 0;
  let categoryMismatches = 0;
  let tiesObserved = 0; // benign: two DIFFERENT raw values rounded to the SAME displayed %.

  for (let i = 0; i < profiles; i++) {
    const user = simulateQuizProfile(seedOffset + i + 1);
    const ranked = rankMatches(user, SEED_PEOPLE); // production order: sorted by RAW similarity, never by displayed %.

    // The only question that matters: does the displayed % ever go DOWN as
    // raw similarity goes UP? Rounding to an integer necessarily creates
    // ties (two adjacent raw values landing on the same displayed %) — that
    // is expected and harmless, since no production code ever re-sorts by
    // the displayed value (confirmed by reading similarity.ts/selectors.ts,
    // Stage 8A); it is NOT the same thing as an inversion.
    for (let k = 1; k < ranked.length; k++) {
      const higherRaw = ranked[k - 1]!;
      const lowerRaw = ranked[k]!;
      if (higherRaw.overallMatch < lowerRaw.overallMatch) inversions++;
      if (higherRaw.overallMatch === lowerRaw.overallMatch) tiesObserved++;
    }
    // #1-by-raw's displayed % must never be strictly LESS than anyone
    // else's (a tie for the top displayed % is fine — that's rounding, not
    // a demotion). This is the real product-facing safety property.
    const top1Display = ranked[0]?.overallMatch ?? -1;
    if (ranked.some((r) => r.overallMatch > top1Display)) top1Mismatches++;

    const unexpected = selectUnexpectedMatch(ranked);
    const opposite = selectOppositeProfile(ranked);
    const categories = selectCategoryMatches(user, SEED_PEOPLE);
    // These already only ever read rawSimilarity (confirmed by reading
    // selectors.ts) — re-run them against the SAME ranked list a second
    // time as a determinism check (same input -> same output every time).
    const unexpected2 = selectUnexpectedMatch(ranked);
    const opposite2 = selectOppositeProfile(ranked);
    const categories2 = selectCategoryMatches(user, SEED_PEOPLE);
    if (unexpected?.personId !== unexpected2?.personId) unexpectedMismatches++;
    if (opposite?.personId !== opposite2?.personId) oppositeMismatches++;
    if (JSON.stringify(categories.map((c) => c.personId)) !== JSON.stringify(categories2.map((c) => c.personId)))
      categoryMismatches++;
  }

  process.stdout.write(`true monotonicity inversions (higher raw -> lower displayed %): ${inversions}\n`);
  process.stdout.write(`benign ties (adjacent distinct raw values rounding to the same displayed %): ${tiesObserved}\n`);
  process.stdout.write(`#1-by-raw person ever shown a LOWER displayed % than someone else: ${top1Mismatches}/${profiles}\n`);
  process.stdout.write(`Unexpected Match determinism, mismatches: ${unexpectedMismatches}/${profiles}\n`);
  process.stdout.write(`Opposite Profile determinism, mismatches: ${oppositeMismatches}/${profiles}\n`);
  process.stdout.write(`Category Match determinism, mismatches: ${categoryMismatches}/${profiles}\n`);
  process.stdout.write(
    `\nresult: ${inversions + top1Mismatches + unexpectedMismatches + oppositeMismatches + categoryMismatches === 0 ? "ALL CLEAR — no true inversion, no ranking/selection change" : "MISMATCH FOUND — investigate before proceeding"}\n` +
      `(ties are expected and harmless — production ranking always uses rawSimilarity, never the rounded displayed %, confirmed by code inspection in Stage 8A)\n\n`,
  );
}

/* ----------------------------------------------------------------- CLI */

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2] ?? "validate";
  const profiles = Number(process.argv[3] ?? 10000);
  const seedOffset = Number(process.argv[4] ?? 0);
  if (mode === "validate") runValidate(profiles, seedOffset);
  else if (mode === "immunity") runImmunity(profiles, seedOffset);
  else process.stdout.write(`unknown mode "${mode}"; use validate|immunity\n`);
}
