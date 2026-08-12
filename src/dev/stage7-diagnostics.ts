/**
 * PHASE 6.6 STAGE 7 — MATCHING REVALIDATION DIAGNOSTICS (taxonomy_v1.1)
 *
 * Diagnostic-only, read-only tooling for Stage 7D (baseline matching
 * revalidation) and Stage 7E (missingness/coverage stress test). Not
 * consumed by `src/core` or `app/` — same category as `simulate.ts`/
 * `sensitivity.ts`/`trait-diagnostic.ts`. Reuses `rankMatches`
 * (`matching_v2`, unmodified) and `simulateQuizProfile` (`simulate.ts`,
 * unmodified) — this file only aggregates and correlates their output, it
 * does not change how a match is computed.
 *
 * Subcommands:
 *   baseline   — Stage 7D: #1 frequency per eligible person, mean/median raw
 *                similarity per person, full similarity distribution,
 *                reachability (zero-#1-win profiles).
 *   coverage   — Stage 7E: correlates (a) each eligible person's total
 *                attribute coverage and (b) new-trait coverage specifically
 *                against their #1-win frequency and mean raw similarity, plus
 *                a person-level "own scatter" vs. mean-similarity/#1-frequency
 *                check (the same causal family as the Phase 2 flat-profile
 *                defect, re-verified here for taxonomy_v1.1).
 *   newtrait   — controlled synthetic comparison: two people with IDENTICAL
 *                scores on the 30 original attributes, one with 0 of the 4
 *                new attributes scored, one with all 4 — isolates whether
 *                new-trait presence/absence alone moves similarity, holding
 *                everything else fixed (real-roster correlations in `coverage`
 *                are confounded by which PEOPLE happen to have sparse
 *                coverage; this isolates the mechanism).
 *   ablate     — Stage 7F: full taxonomy_v1.1 matching vs. each new
 *                attribute individually ablated (stripped from every
 *                person's `attributes`, in-memory only — never edits
 *                seed.ts/roster2.ts) vs. all four ablated. Same simulated
 *                user seeds run through every condition so per-user
 *                comparisons (rank stability, top-match stability) are
 *                apples-to-apples. Diagnostic only — never shipped.
 *
 * Run: corepack pnpm@10 exec tsx src/dev/stage7-diagnostics.ts <mode> [N]
 */
import { pathToFileURL } from "node:url";
import { ATTRIBUTE_IDS, ATTRIBUTES, type AttributeId } from "../core/attributes/attributes.js";
import { discriminativeWeight } from "../core/matching/dispersion.js";
import { evaluateMatchEligibility, rankMatches, type RankedMatch } from "../core/matching/similarity.js";
import type { Person, UserProfile } from "../core/types.js";
import { SEED_PEOPLE } from "../data/people/seed.js";
import { describe, simulateQuizProfile, type Distribution } from "./simulate.js";

const NEW_ATTRS: AttributeId[] = [
  "opportunity_sensing",
  "resourcefulness",
  "proactive_agency",
  "belief_updating",
];

const ELIGIBLE = SEED_PEOPLE.filter((p) => p.isMatchEligible);

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function pearson(xs: readonly number[], ys: readonly number[]): number {
  const n = xs.length;
  const mx = xs.reduce((s, v) => s + v, 0) / n;
  const my = ys.reduce((s, v) => s + v, 0) / n;
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

/** Person-level "own scatter": weighted RMS deviation from the person's own
 *  weighted mean, using the SAME weight components matching_v2 uses minus
 *  userConfidence (a property of the person alone, not of any one pairing).
 *  Mirrors the Phase 2 "own-profile score-scatter" quantity that originally
 *  diagnosed the flat-profile defect. */
function personOwnScatter(person: Person): number {
  const terms = person.attributes.map((a) => ({
    score: a.score,
    weight: ATTRIBUTES[a.attributeId].baseWeight * discriminativeWeight(a.attributeId) * a.confidence,
  }));
  const den = terms.reduce((s, t) => s + t.weight, 0);
  if (den === 0) return 0;
  const level = terms.reduce((s, t) => s + t.weight * t.score, 0) / den;
  const variance = terms.reduce((s, t) => s + t.weight * (t.score - level) ** 2, 0) / den;
  return Math.sqrt(variance);
}

function newTraitCoverage(person: Person): number {
  const ids = new Set(person.attributes.map((a) => a.attributeId));
  return NEW_ATTRS.filter((id) => ids.has(id)).length;
}

/* ------------------------------------------------------------ shared pass */

interface PersonAgg {
  person: Person;
  topWins: number;
  rawSimilarities: number[];
  calibrated: number[];
}

function runPass(profiles: number, seedOffset = 0): { aggs: Map<string, PersonAgg>; allTop: RankedMatch[] } {
  const aggs = new Map<string, PersonAgg>();
  for (const p of ELIGIBLE) aggs.set(p.id, { person: p, topWins: 0, rawSimilarities: [], calibrated: [] });
  const allTop: RankedMatch[] = [];

  for (let i = 0; i < profiles; i++) {
    const user: UserProfile = simulateQuizProfile(seedOffset + i + 1);
    const ranked = rankMatches(user, SEED_PEOPLE);
    for (const r of ranked) {
      const agg = aggs.get(r.personId)!;
      agg.rawSimilarities.push(r.rawSimilarity);
      agg.calibrated.push(r.overallMatch);
    }
    const top = ranked[0];
    if (top) {
      aggs.get(top.personId)!.topWins++;
      allTop.push(top);
    }
  }
  return { aggs, allTop };
}

function mean(xs: readonly number[]): number {
  return xs.reduce((s, v) => s + v, 0) / Math.max(1, xs.length);
}

/* -------------------------------------------------------------- baseline */

function runBaseline(profiles: number): void {
  process.stdout.write(`\n=== STAGE 7D — BASELINE MATCHING REVALIDATION: ${profiles} profiles vs ${ELIGIBLE.length} eligible people ===\n\n`);
  const { aggs, allTop } = runPass(profiles);

  const ranked = [...aggs.values()].sort((a, b) => b.topWins - a.topWins || a.person.id.localeCompare(b.person.id));
  process.stdout.write("--- #1 match frequency, full eligible roster (Stage 7D item 1) ---\n");
  for (const a of ranked) {
    process.stdout.write(`  ${a.person.id.padEnd(24)} ${pct(a.topWins / profiles)}  (n=${a.topWins})\n`);
  }

  const max = ranked[0]!;
  process.stdout.write(`\nmax #1 frequency (item 2): ${max.person.id} ${pct(max.topWins / profiles)}\n`);
  process.stdout.write(`20%-at-n>=30 alert threshold: ${max.topWins / profiles > 0.2 ? "EXCEEDED" : "not exceeded"}\n`);

  process.stdout.write("\ntop five most common winners (item 3):\n");
  for (const a of ranked.slice(0, 5)) {
    process.stdout.write(`  ${a.person.id.padEnd(24)} ${pct(a.topWins / profiles)}\n`);
  }

  const zeroWins = ranked.filter((a) => a.topWins === 0);
  process.stdout.write(`\nprofiles with zero #1 wins (item 4): ${zeroWins.length === 0 ? "none" : zeroWins.map((a) => a.person.id).join(", ")}\n`);

  process.stdout.write(`\nfull-roster reachability (item 5): ${zeroWins.length === 0 ? `all ${ELIGIBLE.length} eligible people won at least once` : `${ELIGIBLE.length - zeroWins.length}/${ELIGIBLE.length} won at least once`}\n`);

  process.stdout.write("\nmean raw similarity by person (item 6, sorted desc):\n");
  const byMeanSim = [...aggs.values()].sort((a, b) => mean(b.rawSimilarities) - mean(a.rawSimilarities));
  for (const a of byMeanSim) {
    process.stdout.write(`  ${a.person.id.padEnd(24)} meanRaw=${mean(a.rawSimilarities).toFixed(4)}  meanCalibrated=${mean(a.calibrated).toFixed(1)}\n`);
  }

  const allRaw = [...aggs.values()].flatMap((a) => a.rawSimilarities);
  const allCalibrated = [...aggs.values()].flatMap((a) => a.calibrated);
  const topCalibrated = allTop.map((r) => r.overallMatch);
  process.stdout.write("\nsimilarity distribution (item 7):\n");
  const showDist = (label: string, d: Distribution) =>
    process.stdout.write(
      `  ${label.padEnd(22)} n=${d.n}  min=${d.min}  p10=${d.p10}  p25=${d.p25}  med=${d.median}  p75=${d.p75}  p90=${d.p90}  max=${d.max}  mean=${d.mean}  sd=${d.sd}\n`,
    );
  showDist("raw (all pairs)", describe(allRaw));
  showDist("calibrated (all pairs)", describe(allCalibrated));
  showDist("calibrated (top 1)", describe(topCalibrated));

  process.stdout.write("\nuser-profile score distributions (item 8): unaffected by dispersion/matching — identical to Stage 6's trait-diagnostic.ts table (user scoring depends only on quiz_v2 + reference_v3, neither touched this stage). See that table for per-attribute simMean/simSd.\n\n");
}

/* ---------------------------------------------------------- coverage stress */

function runCoverageStress(profiles: number): void {
  process.stdout.write(`\n=== STAGE 7E — MISSINGNESS / COVERAGE STRESS TEST: ${profiles} profiles ===\n\n`);
  const { aggs } = runPass(profiles);

  const rows = [...aggs.values()].map((a) => {
    const elig = evaluateMatchEligibility(a.person);
    return {
      id: a.person.id,
      coverage: elig.coverage,
      newTraitCoverage: newTraitCoverage(a.person),
      winRate: a.topWins / profiles,
      meanRaw: mean(a.rawSimilarities),
      ownScatter: personOwnScatter(a.person),
    };
  });

  process.stdout.write("attribute                coverage newTraits winRate  meanRaw ownScatter\n");
  for (const r of [...rows].sort((a, b) => b.winRate - a.winRate)) {
    process.stdout.write(
      `${r.id.padEnd(24)} ${r.coverage.toFixed(3)}    ${r.newTraitCoverage}         ${pct(r.winRate).padStart(6)}  ${r.meanRaw.toFixed(4)}   ${r.ownScatter.toFixed(2)}\n`,
    );
  }

  const coverages = rows.map((r) => r.coverage);
  const newTraitCovs = rows.map((r) => r.newTraitCoverage);
  const winRates = rows.map((r) => r.winRate);
  const meanRaws = rows.map((r) => r.meanRaw);
  const ownScatters = rows.map((r) => r.ownScatter);

  process.stdout.write("\n--- correlations (Pearson r across the 34 eligible people) ---\n");
  process.stdout.write(`  1. winner frequency  vs total coverage:      r=${pearson(coverages, winRates).toFixed(3)}\n`);
  process.stdout.write(`  2. winner frequency  vs new-trait coverage:  r=${pearson(newTraitCovs, winRates).toFixed(3)}\n`);
  process.stdout.write(`  3. mean similarity   vs total coverage:      r=${pearson(coverages, meanRaws).toFixed(3)}\n`);
  process.stdout.write(`  4. mean similarity   vs new-trait coverage:  r=${pearson(newTraitCovs, meanRaws).toFixed(3)}\n`);
  process.stdout.write(`  5. mean similarity   vs own scatter:         r=${pearson(ownScatters, meanRaws).toFixed(3)}\n`);
  process.stdout.write(`  6. winner frequency  vs own scatter:         r=${pearson(ownScatters, winRates).toFixed(3)}\n`);

  process.stdout.write("\n--- new-trait coverage buckets: mean win rate / mean similarity ---\n");
  for (let k = 0; k <= 4; k++) {
    const bucket = rows.filter((r) => r.newTraitCoverage === k);
    if (bucket.length === 0) continue;
    process.stdout.write(
      `  ${k} new traits scored (n=${bucket.length} people): meanWinRate=${pct(mean(bucket.map((r) => r.winRate)))}  meanRawSim=${mean(bucket.map((r) => r.meanRaw)).toFixed(4)}\n`,
    );
  }
  process.stdout.write("\n");
}

/* ------------------------------------------------------------- new-trait */

const ORIGINAL_30: AttributeId[] = ATTRIBUTE_IDS.filter((id) => !NEW_ATTRS.includes(id));

function makeAttr(attributeId: AttributeId, score: number): Person["attributes"][number] {
  return { attributeId, score, confidence: 0.75, evidenceType: "strong_inference", impact: "neutral", sourceIds: [] };
}

function makeSyntheticPerson(id: string, includeNewTraits: boolean): Person {
  const base: Person["attributes"] = ORIGINAL_30.map((attrId, i) =>
    makeAttr(attrId, 55 + ((i * 7) % 30)), // a fixed, varied-but-deterministic pattern, identical across both variants
  );
  const extra: Person["attributes"] = includeNewTraits
    ? NEW_ATTRS.map((attrId, i) => makeAttr(attrId, 60 + i * 5))
    : [];
  return {
    id,
    slug: id,
    canonicalName: id,
    aliases: [],
    isLiving: false,
    era: "contemporary",
    nationalityCodes: [],
    regionCode: "test",
    occupationIds: [],
    fieldIds: [],
    impactDomains: [],
    tagIds: [],
    archetypeIds: [],
    attributes: [...base, ...extra],
    status: "published",
    isMatchEligible: true,
    overallProfileConfidence: 0.75,
    sources: [],
    doNotCopyKeys: [],
  };
}

function runNewTraitIsolation(profiles: number): void {
  process.stdout.write(`\n=== STAGE 7E (isolation) — SYNTHETIC 0-vs-4-NEW-TRAITS COMPARISON: ${profiles} profiles ===\n\n`);
  const withNone = makeSyntheticPerson("synthetic_0_new", false);
  const withAll = makeSyntheticPerson("synthetic_4_new", true);
  process.stdout.write(
    `synthetic_0_new: ${withNone.attributes.length} attrs scored (30 original, 0 new)\nsynthetic_4_new: ${withAll.attributes.length} attrs scored (30 original + all 4 new)\n\n`,
  );

  const rawNone: number[] = [];
  const rawAll: number[] = [];
  const calNone: number[] = [];
  const calAll: number[] = [];
  for (let i = 0; i < profiles; i++) {
    const user = simulateQuizProfile(i + 1);
    const rNone = rankMatches(user, [withNone]).find((r) => r.personId === withNone.id);
    const rAll = rankMatches(user, [withAll]).find((r) => r.personId === withAll.id);
    if (rNone) {
      rawNone.push(rNone.rawSimilarity);
      calNone.push(rNone.overallMatch);
    }
    if (rAll) {
      rawAll.push(rAll.rawSimilarity);
      calAll.push(rAll.overallMatch);
    }
  }
  process.stdout.write(
    `synthetic_0_new (0/4 new traits): meanRaw=${mean(rawNone).toFixed(4)}  meanCalibrated=${mean(calNone).toFixed(1)}  coverage=${evaluateMatchEligibility(withNone).coverage.toFixed(3)}\n`,
  );
  process.stdout.write(
    `synthetic_4_new (4/4 new traits): meanRaw=${mean(rawAll).toFixed(4)}  meanCalibrated=${mean(calAll).toFixed(1)}  coverage=${evaluateMatchEligibility(withAll).coverage.toFixed(3)}\n`,
  );
  process.stdout.write(
    `\ndelta (0-new minus 4-new): rawDelta=${(mean(rawNone) - mean(rawAll)).toFixed(4)}  calibratedDelta=${(mean(calNone) - mean(calAll)).toFixed(1)}\n\n`,
  );
}

/* ------------------------------------------------------------- ablation */

/** Person list with the given attribute(s) stripped from EVERY person's
 *  `attributes` array — in-memory only, never touches seed.ts/roster2.ts.
 *  Sufficient to fully ablate an attribute from matching_v2: buildTerms()
 *  requires the PERSON side to have the attribute for a term to exist at
 *  all, so removing it person-side excludes it regardless of user side. */
function peopleWithoutAttributes(ids: readonly AttributeId[]): Person[] {
  const exclude = new Set(ids);
  return SEED_PEOPLE.map((p) => ({
    ...p,
    attributes: p.attributes.filter((a) => !exclude.has(a.attributeId)),
  }));
}

function spearman(baseline: readonly string[], other: readonly string[]): number {
  const rankOf = new Map(other.map((id, i) => [id, i]));
  const n = baseline.length;
  let d2 = 0;
  for (let i = 0; i < n; i++) {
    const j = rankOf.get(baseline[i]!) ?? i;
    d2 += (i - j) ** 2;
  }
  return 1 - (6 * d2) / (n * (n * n - 1));
}

const ABLATIONS: Array<[string, readonly AttributeId[]]> = [
  ["baseline (full taxonomy_v1.1)", []],
  ["without opportunity_sensing", ["opportunity_sensing"]],
  ["without resourcefulness", ["resourcefulness"]],
  ["without proactive_agency", ["proactive_agency"]],
  ["without belief_updating", ["belief_updating"]],
  ["without all four new traits", NEW_ATTRS],
];

function runAblation(profiles: number): void {
  process.stdout.write(`\n=== STAGE 7F — NEW-TRAIT INFLUENCE / ABLATION AUDIT: ${profiles} profiles ===\n\n`);

  // Same simulated users for every condition.
  const users: UserProfile[] = Array.from({ length: profiles }, (_, i) => simulateQuizProfile(i + 1));

  // Baseline ranked-id list and top match per user, computed once.
  const baselinePeople = SEED_PEOPLE;
  const baselineRankings: string[][] = [];
  const baselineTop: string[] = [];
  const baselineRawByPerson = new Map<string, number[]>();
  for (const p of ELIGIBLE) baselineRawByPerson.set(p.id, []);
  for (const user of users) {
    const ranked = rankMatches(user, baselinePeople);
    baselineRankings.push(ranked.map((r) => r.personId));
    baselineTop.push(ranked[0]?.personId ?? "");
    for (const r of ranked) baselineRawByPerson.get(r.personId)!.push(r.rawSimilarity);
  }

  for (const [label, ablateIds] of ABLATIONS) {
    const people = ablateIds.length === 0 ? baselinePeople : peopleWithoutAttributes(ablateIds);
    const topCount = new Map<string, number>();
    const rawByPerson = new Map<string, number[]>();
    for (const p of ELIGIBLE) rawByPerson.set(p.id, []);
    let topUnchanged = 0;
    let rhoSum = 0;
    let allRawShiftSum = 0;
    let allRawShiftN = 0;

    for (let i = 0; i < users.length; i++) {
      const ranked = rankMatches(users[i]!, people);
      const topId = ranked[0]?.personId ?? "";
      topCount.set(topId, (topCount.get(topId) ?? 0) + 1);
      if (topId === baselineTop[i]) topUnchanged++;
      rhoSum += spearman(
        baselineRankings[i]!,
        ranked.map((r) => r.personId),
      );
      for (const r of ranked) {
        rawByPerson.get(r.personId)!.push(r.rawSimilarity);
        // baselineRawByPerson[personId] was appended once per person per
        // user, in the same user order, so index i is that same user's
        // baseline value for this person.
        const base = baselineRawByPerson.get(r.personId)![i]!;
        allRawShiftSum += Math.abs(r.rawSimilarity - base);
        allRawShiftN++;
      }
    }

    const sorted = [...topCount.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const [first] = sorted;
    const top5 = sorted.slice(0, 5);
    process.stdout.write(`--- ${label} ---\n`);
    process.stdout.write(
      `  max #1 freq:        ${first ? `${first[0]} ${pct(first[1] / users.length)}` : "n/a"}\n`,
    );
    process.stdout.write(`  top 5:              ${top5.map(([id, c]) => `${id.replace("p_", "")}=${pct(c / users.length)}`).join(", ")}\n`);
    process.stdout.write(`  top-match stability: ${pct(topUnchanged / users.length)} of users kept the same #1 person\n`);
    process.stdout.write(`  rank stability:      mean Spearman rho vs baseline = ${(rhoSum / users.length).toFixed(4)}\n`);
    process.stdout.write(`  avg |raw sim shift|: ${(allRawShiftSum / allRawShiftN).toFixed(5)}\n\n`);
  }
}

/* ----------------------------------------------------------------- CLI */

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2] ?? "baseline";
  const profiles = Number(process.argv[3] ?? 10000);
  if (mode === "baseline") runBaseline(profiles);
  else if (mode === "coverage") runCoverageStress(profiles);
  else if (mode === "newtrait") runNewTraitIsolation(profiles);
  else if (mode === "ablate") runAblation(profiles);
  else process.stdout.write(`unknown mode "${mode}"; use baseline|coverage|newtrait|ablate\n`);
}
