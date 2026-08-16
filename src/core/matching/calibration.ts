/**
 * CALIBRATION — calibration_v3
 *
 * Raw similarity is NOT shown to users. We map raw -> display through a
 * monotone piecewise-linear curve fitted so that, across simulated profiles
 * against the seed dataset:
 *
 *   - a typical (median) person-vs-user pair lands in the low 40s
 *   - a typical user's BEST match lands roughly 55-85
 *   - identical vectors land at 99 (never 100: profiles are inferred, not measured)
 *   - genuinely distant pairs can fall below 20, so "Opposite Profile" is real
 *
 * Monotonicity is a hard invariant: calibration must never reorder matches.
 * Anchors are refitted with `pnpm calibrate` whenever the dataset or the
 * matching formula changes materially, and the version string is bumped.
 *
 * Bumped to v2 alongside matching_v2 (src/core/matching/similarity.ts): the
 * pattern/scatter/level decomposition produces a different raw scale (median
 * raw ~0.48 vs v1's ~0.76), so v1's anchors would have compressed almost
 * every result into the top few percent.
 *
 * Bumped to v3 (Phase 6.6 Stage 8, 2026-08) for the `taxonomy_v1.1`/`quiz_v2`
 * migration — NOT a `matching_v2` change (the formula is byte-identical to
 * v2's fit), but the drift this time is far larger than a routine
 * "regenerate deliberately" refresh: Stage 7 found the OLD anchors, left
 * unrefit against the new 34-attribute/64-item pipeline, produced a top-1
 * median of 74 (target 78) and a Greatness median of 52 (target 58) — a
 * multi-point drift, not the <0.008-raw noise-level drift that kept the
 * Phase 4 quiz expansion at `calibration_v2` unbumped. Anchors refit
 * against the SAME target table (`MATCH_TARGETS` in `src/dev/calibrate.ts`,
 * unchanged) using the SAME methodology, against `quiz_v2`'s actual raw
 * output — not tuned to restore any particular number. The refit happens to
 * recover top-1's median back to ~77 (target 78) and Greatness's median
 * back to ~58, as an honest byproduct of correctly re-fitting on fresh
 * data, not because either number was targeted directly. Full evidence in
 * `docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 8".
 */

export const CALIBRATION_VERSION = "calibration_v3";

/**
 * [rawSimilarity, displayPercent] — must be strictly increasing in both columns.
 *
 * Fitted by `pnpm calibrate quiz 50000` against 50,000 simulated quiz_v2
 * profiles x 34 match-eligible seed people (2026-08, Phase 6.6 Stage 8;
 * stability confirmed at a second, independent seed offset — anchors agreed
 * to 3-4 decimal places, not seed-specific). The comment on each row is the
 * percentile of the all-pairs raw distribution that anchor was taken from,
 * so the intent stays auditable: a randomly chosen person reads as clearly
 * not-you (median 44, essentially unchanged from calibration_v2's 44 — the
 * ALL-PAIRS median barely moved), while the best of 34 lands in the 50s-80s.
 * The median deliberately sits below 50 — this curve is not tuned to
 * flatter. The raw distribution's shift is NOT a uniform compression: below
 * the median, raw values shifted up slightly; above it, they shifted down,
 * growing toward the tail (p99.9 raw 0.6696 -> 0.6452) — a genuine shape
 * change from the taxonomy/quiz migration (see CLAUDE.md "Phase 6.6 Stage
 * 8"), not a fitting artifact.
 */
export const MATCH_CALIBRATION_ANCHORS: ReadonlyArray<readonly [number, number]> = [
  [0.0, 1],
  [0.3666, 6], // p0.1
  [0.3889, 11], // p1
  [0.4099, 18], // p5
  [0.4217, 23], // p10
  [0.4435, 32], // p25
  [0.4709, 44], // p50
  [0.5019, 57], // p75
  [0.5317, 69], // p90
  [0.5503, 76], // p95
  [0.5861, 86], // p99
  [0.6294, 93], // p99.9
  [1.0, 99],
];

/** Piecewise-linear interpolation over a monotone anchor table. */
export function interpolateAnchors(
  x: number,
  anchors: ReadonlyArray<readonly [number, number]>,
): number {
  const first = anchors[0]!;
  const last = anchors[anchors.length - 1]!;
  if (x <= first[0]) return first[1];
  if (x >= last[0]) return last[1];
  for (let i = 0; i < anchors.length - 1; i++) {
    const [x0, y0] = anchors[i]!;
    const [x1, y1] = anchors[i + 1]!;
    if (x >= x0 && x <= x1) {
      const t = x1 === x0 ? 0 : (x - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  return last[1];
}

/** Raw similarity in [0,1] -> displayed Profile Match percentage. */
export function calibrateMatch(rawSimilarity: number): number {
  const clamped = Math.min(1, Math.max(0, rawSimilarity));
  return Math.round(interpolateAnchors(clamped, MATCH_CALIBRATION_ANCHORS));
}
