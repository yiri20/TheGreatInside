/**
 * DEVELOPER SIMULATION HARNESS
 *
 * Generates large numbers of hypothetical user profiles from a SEEDED PRNG (so
 * runs are reproducible) and reports the distributions that determine whether
 * the product feels right:
 *
 *   - Profile Match spread: is everyone landing in 82-94? is nobody above 60?
 *   - Greatness Potential spread: mean, median, sd, percentiles
 *   - Celebrity domination: does one person win most #1 slots?
 *   - Dead profiles: does anyone in the dataset never match anyone?
 *   - Signature trait frequency: does one attribute dominate?
 *
 * This is the tool that keeps calibration honest. Run: pnpm simulate
 */

import { pathToFileURL } from "node:url";
import { ATTRIBUTE_IDS, ATTRIBUTES, type AttributeId } from "../core/attributes/attributes.js";
import { computeGreatnessPotential } from "../core/greatness/greatness.js";
import { buildResultSet } from "../core/matching/selectors.js";
import { signatureTrait } from "../core/interpretation/rules.js";
import type { UserProfile } from "../core/types.js";
import { SEED_PEOPLE } from "../data/people/seed.js";
import { QUIZ, QUIZ_VERSION } from "../core/quiz/bank.js";
import { SCORING_VERSION, scoreQuiz } from "../core/quiz/scoring.js";
import type { Quiz, QuizResponse } from "../core/quiz/types.js";
import { TAXONOMY_VERSION } from "../core/attributes/attributes.js";

/* --------------------------------------------------------- seeded PRNG */

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Box-Muller, so simulated profiles are normally distributed rather than flat. */
function gaussian(rand: () => number): number {
  const u = Math.max(Number.EPSILON, rand());
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/**
 * A purely independent-normal profile is unrealistic — real people have
 * correlated traits. `personality` adds a shared latent factor per facet so
 * simulated profiles have internal structure, which matters because the
 * coherence component would otherwise be measuring noise.
 */
export function simulateProfile(seed: number): UserProfile {
  const rand = mulberry32(seed);
  const facetFactor = new Map<string, number>();

  const scores = {} as Record<AttributeId, number>;
  const confidence = {} as Record<AttributeId, number>;

  for (const id of ATTRIBUTE_IDS) {
    const def = ATTRIBUTES[id];
    if (!facetFactor.has(def.facet)) facetFactor.set(def.facet, gaussian(rand) * 0.55);
    const shared = facetFactor.get(def.facet)!;
    const z = shared + gaussian(rand) * 0.85;
    scores[id] = Math.round(Math.min(100, Math.max(0, def.reference.mean + z * def.reference.sd)));
    confidence[id] = 1;
  }

  return {
    id: `sim_${seed}`,
    quizVersion: QUIZ_VERSION,
    scoringVersion: SCORING_VERSION,
    taxonomyVersion: TAXONOMY_VERSION,
    scores,
    confidence,
    completedAt: "1970-01-01T00:00:00.000Z",
  };
}

/**
 * END-TO-END simulation: latent person -> plausible ANSWERS -> scoreQuiz.
 *
 * `simulateProfile` fabricates a trait vector directly, which is fine for
 * calibration but bypasses the questionnaire entirely — and the questionnaire
 * is what actually shapes real profiles. A 30-item bank with forced choices and
 * a 1.25 gain produces spikier, less balanced profiles than a smooth Gaussian,
 * which changes match behaviour. This path exercises the whole pipeline, so the
 * two can be compared.
 *
 * Response model: a latent trait vector decides which answers the simulated user
 * prefers; Gumbel noise makes the choice stochastic rather than deterministic,
 * standing in for real response inconsistency.
 */
export function simulateResponses(seed: number, quiz: Quiz = QUIZ): QuizResponse[] {
  const rand = mulberry32(seed * 7919 + 13);
  const latent = simulateProfile(seed).scores;
  const pull = (id: AttributeId) => ((latent[id] ?? 50) - 50) / 50;
  const responses: QuizResponse[] = [];

  for (const q of quiz.questions) {
    if (q.format === "likert7") {
      const effects = q.effects ?? [];
      let num = 0;
      let den = 0;
      for (const eff of effects) {
        num += eff.weight * eff.direction * pull(eff.attributeId);
        den += eff.weight;
      }
      const predicted = den === 0 ? 0 : num / den;
      const noisy = predicted * (q.reverseKeyed ? -1 : 1) + gaussian(rand) * 0.3;
      responses.push({
        questionId: q.id,
        value: Math.min(7, Math.max(1, Math.round(4 + 3 * noisy))),
      });
      continue;
    }

    let bestId: string | undefined;
    let bestScore = -Infinity;
    for (const option of q.options ?? []) {
      let utility = 0;
      for (const eff of option.effects) utility += eff.weight * eff.direction * pull(eff.attributeId);
      // Gumbel-max sampling == sampling from the softmax over utilities.
      const gumbel = -Math.log(-Math.log(Math.max(Number.EPSILON, rand())));
      const total = utility * 2.2 + gumbel;
      if (total > bestScore) {
        bestScore = total;
        bestId = option.id;
      }
    }
    if (bestId) responses.push({ questionId: q.id, value: bestId });
  }
  return responses;
}

export function simulateQuizProfile(seed: number, quiz: Quiz = QUIZ): UserProfile {
  return scoreQuiz({
    quiz,
    responses: simulateResponses(seed, quiz),
    profileId: `simq_${seed}`,
    completedAt: "1970-01-01T00:00:00.000Z",
  });
}

/* ------------------------------------------------------------ statistics */

export interface Distribution {
  n: number;
  min: number;
  p10: number;
  p25: number;
  median: number;
  p75: number;
  p90: number;
  max: number;
  mean: number;
  sd: number;
}

export function describe(values: readonly number[]): Distribution {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const at = (q: number) => sorted[Math.min(n - 1, Math.max(0, Math.floor(q * (n - 1))))] ?? 0;
  const mean = sorted.reduce((s, v) => s + v, 0) / Math.max(1, n);
  const variance = sorted.reduce((s, v) => s + (v - mean) ** 2, 0) / Math.max(1, n);
  return {
    n,
    min: sorted[0] ?? 0,
    p10: at(0.1),
    p25: at(0.25),
    median: at(0.5),
    p75: at(0.75),
    p90: at(0.9),
    max: sorted[n - 1] ?? 0,
    mean: Number(mean.toFixed(2)),
    sd: Number(Math.sqrt(variance).toFixed(2)),
  };
}

export interface SimulationReport {
  profiles: number;
  allMatches: Distribution;
  topMatches: Distribution;
  greatness: Distribution;
  topMatchFrequency: Array<[string, number]>;
  neverTopMatched: string[];
  signatureTraitFrequency: Array<[string, number]>;
  unexpectedMatchRate: number;
  primaryArchetypeFrequency: Array<[string, number]>;
}

export interface SimulationOptions {
  /** "vector" fabricates trait vectors; "quiz" runs answers through scoreQuiz. */
  mode?: "vector" | "quiz";
  /**
   * Alternate question bank for "quiz" mode — Phase 5 ablation/perturbation
   * testing (e.g. QUIZ with specific items removed). Defaults to the shipped
   * QUIZ. Has no effect in "vector" mode, which never reads the quiz.
   */
  quiz?: Quiz;
  /**
   * Shifts every simulated profile's PRNG seed by this amount, so a second
   * run with a different offset draws an independent sample from the same
   * generator rather than reproducing the first run — used to check whether
   * a result (e.g. #1 match domination) is stable across independent samples
   * or a property of one particular seed range. Default 0 reproduces the
   * exact seeds every prior simulation used (seeds 1..profiles).
   */
  seedOffset?: number;
}

export function runSimulation(profiles = 2000, options: SimulationOptions = {}): SimulationReport {
  const mode = options.mode ?? "vector";
  const quiz = options.quiz ?? QUIZ;
  const seedOffset = options.seedOffset ?? 0;
  const makeProfile = (seed: number) =>
    mode === "quiz" ? simulateQuizProfile(seed, quiz) : simulateProfile(seed);
  const allMatches: number[] = [];
  const topMatches: number[] = [];
  const greatness: number[] = [];
  const topCount = new Map<string, number>();
  const sigCount = new Map<string, number>();
  const archCount = new Map<string, number>();
  let unexpectedFound = 0;

  for (let i = 0; i < profiles; i++) {
    const user = makeProfile(seedOffset + i + 1);
    const result = buildResultSet(user, SEED_PEOPLE);
    for (const m of result.ranked) allMatches.push(m.overallMatch);
    if (result.closest) {
      topMatches.push(result.closest.overallMatch);
      topCount.set(result.closest.personId, (topCount.get(result.closest.personId) ?? 0) + 1);
    }
    if (result.unexpected) unexpectedFound++;

    const g = computeGreatnessPotential(user, { people: SEED_PEOPLE });
    greatness.push(g.score);
    archCount.set(g.primaryArchetypeId, (archCount.get(g.primaryArchetypeId) ?? 0) + 1);

    const sig = signatureTrait(user);
    if (sig) sigCount.set(sig.attributeId, (sigCount.get(sig.attributeId) ?? 0) + 1);
  }

  const desc = (m: Map<string, number>) =>
    [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  return {
    profiles,
    allMatches: describe(allMatches),
    topMatches: describe(topMatches),
    greatness: describe(greatness),
    topMatchFrequency: desc(topCount),
    neverTopMatched: SEED_PEOPLE.filter((p) => p.isMatchEligible && !topCount.has(p.id)).map((p) => p.id),
    signatureTraitFrequency: desc(sigCount),
    unexpectedMatchRate: unexpectedFound / profiles,
    primaryArchetypeFrequency: desc(archCount),
  };
}

/* ----------------------------------------------------------------- report */

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function printDistribution(label: string, d: Distribution): void {
  process.stdout.write(
    `${label.padEnd(22)} n=${String(d.n).padStart(6)}  min=${String(d.min).padStart(3)}  ` +
      `p10=${String(d.p10).padStart(3)}  p25=${String(d.p25).padStart(3)}  med=${String(d.median).padStart(3)}  ` +
      `p75=${String(d.p75).padStart(3)}  p90=${String(d.p90).padStart(3)}  max=${String(d.max).padStart(3)}  ` +
      `mean=${d.mean}  sd=${d.sd}\n`,
  );
}

// pathToFileURL, not string concatenation: on Windows a path is file:///C:/...
// with three slashes, so the naive comparison silently never fires.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = (process.argv[3] as "vector" | "quiz" | undefined) ?? "vector";
  const report = runSimulation(Number(process.argv[2] ?? 2000), { mode });
  process.stdout.write(
    `\n=== SIMULATION (${mode}): ${report.profiles} profiles vs ${SEED_PEOPLE.length} people ===\n\n`,
  );
  printDistribution("Profile Match (all)", report.allMatches);
  printDistribution("Profile Match (top 1)", report.topMatches);
  printDistribution("Greatness Potential", report.greatness);

  process.stdout.write(`\nUnexpected Match surfaced: ${pct(report.unexpectedMatchRate)} of profiles\n`);

  process.stdout.write("\n--- #1 match frequency (domination check) ---\n");
  for (const [id, count] of report.topMatchFrequency) {
    process.stdout.write(`  ${id.padEnd(24)} ${pct(count / report.profiles)}\n`);
  }
  if (report.neverTopMatched.length > 0) {
    process.stdout.write(`  NEVER #1: ${report.neverTopMatched.join(", ")}\n`);
  }

  process.stdout.write("\n--- primary archetype frequency ---\n");
  for (const [id, count] of report.primaryArchetypeFrequency) {
    process.stdout.write(`  ${id.padEnd(32)} ${pct(count / report.profiles)}\n`);
  }

  process.stdout.write("\n--- signature trait frequency (top 8) ---\n");
  for (const [id, count] of report.signatureTraitFrequency.slice(0, 8)) {
    process.stdout.write(`  ${id.padEnd(24)} ${pct(count / report.profiles)}\n`);
  }
  process.stdout.write("\n");
}
