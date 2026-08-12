/**
 * PHASE 6.6 STAGE 7B — DISPERSION ESTIMATOR RELIABILITY AUDIT
 *
 * Diagnostic-only, read-only (never writes dispersion.generated.ts — that
 * remains `calibrate.ts`'s job). Reproduces `calibrate.ts`'s exact
 * `attributeDispersion()` computation (same match-eligible-only filter, same
 * Bessel-corrected sample sd, same <2-values->-0 rule) without writing
 * anything, so Stage 7C's regeneration can be reviewed BEFORE it overwrites
 * the committed snapshot.
 *
 * For every attribute reports: scored/missing count among the 34 match-
 * eligible people, raw mean, raw sd (population AND sample/Bessel, so the
 * n-1 vs n choice is visible rather than hidden), the CURRENT committed
 * dispersion_v1 weight, and the weight `calibrate.ts` would write today.
 *
 * Purpose: decide whether `dispersion_v1`'s methodology — an unweighted
 * Bessel-corrected sample sd, no explicit small-n shrinkage beyond the
 * "<2 values -> neutral" gate, clamped to [0.55, 1.6] — is safe to apply
 * unchanged to the four new attributes, whose coverage ranges from 7 to 32
 * of 35 people. Per the Stage 7 brief: do not redesign merely because n
 * looks small — first demonstrate whether it actually produces an unstable
 * or implausible weight.
 *
 * Run: corepack pnpm@10 exec tsx src/dev/dispersion-audit.ts
 */
import { ATTRIBUTE_IDS, type AttributeId } from "../core/attributes/attributes.js";
import { DISPERSION_TABLE, DISCRIMINATIVE_BOUNDS } from "../core/matching/dispersion.js";
import { dispersionToWeight } from "../core/matching/dispersion.js";
import { SEED_PEOPLE } from "../data/people/seed.js";

const ELIGIBLE = SEED_PEOPLE.filter((p) => p.isMatchEligible);

interface Row {
  id: AttributeId;
  scored: number;
  missing: number;
  mean: number;
  sdPopulation: number;
  sdSample: number;
  currentWeight: number;
  proposedWeight: number;
}

function collect(id: AttributeId): number[] {
  const values: number[] = [];
  for (const person of ELIGIBLE) {
    const a = person.attributes.find((x) => x.attributeId === id);
    if (a) values.push(a.score);
  }
  return values;
}

const rowsRaw = ATTRIBUTE_IDS.map((id) => {
  const values = collect(id);
  const scored = values.length;
  const missing = ELIGIBLE.length - scored;
  const mean = scored === 0 ? 0 : values.reduce((s, v) => s + v, 0) / scored;
  const sdPopulation =
    scored === 0 ? 0 : Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / scored);
  const sdSample =
    scored < 2 ? 0 : Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / (scored - 1));
  return { id, scored, missing, mean, sdPopulation, sdSample };
});

// Same meanSd calibrate.ts computes: mean of all sample-sd values that are > 0
// (i.e. attributes with >= 2 scored people), used as the blend target for
// attributes that get the "< 2 values" neutral substitution.
const presentSds = rowsRaw.map((r) => r.sdSample).filter((v) => v > 0);
const meanSd = presentSds.reduce((s, v) => s + v, 0) / Math.max(1, presentSds.length);

const rows: Row[] = rowsRaw.map((r) => {
  const sdForWeight = r.sdSample === 0 ? meanSd : r.sdSample;
  return {
    ...r,
    currentWeight: DISPERSION_TABLE[r.id],
    proposedWeight: dispersionToWeight(sdForWeight, meanSd),
  };
});

process.stdout.write(
  `\n=== DISPERSION RELIABILITY AUDIT (Stage 7B) — ${ELIGIBLE.length} match-eligible people, meanSd(sample)=${meanSd.toFixed(3)} ===\n\n`,
);
process.stdout.write(
  "attribute                 scored missing   mean  sdPop sdSample  current  proposed  atClampFloor  atClampCeil\n",
);
for (const r of [...rows].sort((a, b) => a.scored - b.scored)) {
  const atFloor = Math.abs(r.proposedWeight - DISCRIMINATIVE_BOUNDS.min) < 0.001;
  const atCeil = Math.abs(r.proposedWeight - DISCRIMINATIVE_BOUNDS.max) < 0.001;
  process.stdout.write(
    `${r.id.padEnd(24)}  ${String(r.scored).padStart(4)}  ${String(r.missing).padStart(5)}   ${r.mean.toFixed(1).padStart(5)}  ${r.sdPopulation.toFixed(1).padStart(5)}   ${r.sdSample.toFixed(1).padStart(5)}   ${r.currentWeight.toFixed(4)}   ${r.proposedWeight.toFixed(4)}   ${atFloor ? "FLOOR" : ""}${atCeil ? "CEIL" : ""}\n`,
  );
}

process.stdout.write(
  "\n--- bootstrap stability of sample sd at small n (does resampling the SAME people in a different order or dropping one person swing the sd wildly?) ---\n",
);
// Leave-one-out sd: for each new attribute, recompute sd after dropping each
// scored person once, to see how much a single person's score moves the
// resulting weight — the real question for a 7-person estimate.
const NEW_ATTRS: AttributeId[] = [
  "opportunity_sensing",
  "resourcefulness",
  "proactive_agency",
  "belief_updating",
];
for (const id of NEW_ATTRS) {
  const values = collect(id);
  const weights: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const loo = values.filter((_, j) => j !== i);
    if (loo.length < 2) continue;
    const mean = loo.reduce((s, v) => s + v, 0) / loo.length;
    const sd = Math.sqrt(loo.reduce((s, v) => s + (v - mean) ** 2, 0) / (loo.length - 1));
    weights.push(dispersionToWeight(sd, meanSd));
  }
  const wMean = weights.reduce((s, v) => s + v, 0) / weights.length;
  const wMin = Math.min(...weights);
  const wMax = Math.max(...weights);
  process.stdout.write(
    `  ${id.padEnd(24)} n=${values.length}  leave-one-out weight range=[${wMin.toFixed(4)}, ${wMax.toFixed(4)}]  mean=${wMean.toFixed(4)}  full-sample weight=${dispersionToWeight(
      values.length < 2
        ? meanSd
        : Math.sqrt(
            values.reduce((s, v) => s + (v - values.reduce((a, b) => a + b, 0) / values.length) ** 2, 0) /
              (values.length - 1),
          ),
      meanSd,
    ).toFixed(4)}\n`,
  );
}
process.stdout.write("\n");
