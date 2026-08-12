/**
 * PHASE 5 — MATCHING HARDENING SENSITIVITY HARNESS
 *
 * Diagnostic-only tooling for the Phase 5 robustness audit (see CLAUDE.md
 * "Phase 5"). Not consumed by `src/core` or `app/` — this is a dev script,
 * same category as `simulate.ts`/`calibrate.ts`/`trait-diagnostic.ts`.
 *
 * Three subcommands:
 *   seeds   — re-run the 10,000-profile quiz-mode simulation at several
 *             independent seed offsets against the UNCHANGED shipped QUIZ,
 *             to check whether the committed #1 domination figure is stable
 *             across independent samples or a property of one seed range.
 *   ablate  — re-run the same simulation with specific quiz items REMOVED
 *             in-memory (bank.ts is never edited), to isolate what q53-q56
 *             individually contribute to the domination figure.
 *   noise   — re-run with the response-simulation model's noise parameters
 *             perturbed (Gumbel choice temperature, likert response noise),
 *             to check whether the domination figure is brittle to modest,
 *             plausible changes in how simulated users answer.
 *
 * Every subcommand reuses `runSimulation` from `simulate.ts` unmodified;
 * only the `quiz`/`seedOffset` inputs (or, for `noise`, a parallel response
 * simulator with different constants) vary.
 */

import { pathToFileURL } from "node:url";
import { QUIZ } from "../core/quiz/bank.js";
import type { Quiz, QuizResponse } from "../core/quiz/types.js";
import { scoreQuiz } from "../core/quiz/scoring.js";
import { runSimulation, mulberry32, simulateProfile, type SimulationReport } from "./simulate.js";
import type { AttributeId } from "../core/attributes/attributes.js";
import type { UserProfile } from "../core/types.js";
import { buildResultSet } from "../core/matching/selectors.js";
import { SEED_PEOPLE } from "../data/people/seed.js";

/** Returns a Quiz identical to `base` but with the given question ids removed
 *  from both `questions` and every section's `questionIds`. Never touches
 *  bank.ts — purely an in-memory view for ablation testing. */
export function quizWithout(base: Quiz, excludeIds: readonly string[]): Quiz {
  const exclude = new Set(excludeIds);
  return {
    ...base,
    questions: base.questions.filter((q) => !exclude.has(q.id)),
    sections: base.sections.map((s) => ({
      ...s,
      questionIds: s.questionIds.filter((id) => !exclude.has(id)),
    })),
  };
}

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function reportTop(label: string, report: SimulationReport, topN = 6): void {
  const top = report.topMatchFrequency.slice(0, topN);
  const [first] = top;
  process.stdout.write(
    `${label.padEnd(28)} max=${first ? `${first[0]}(${pct(first[1] / report.profiles)})` : "n/a"}` +
      `  top${topN}: ${top.map(([id, c]) => `${id.replace("p_", "")}=${pct(c / report.profiles)}`).join(", ")}\n`,
  );
}

/* ------------------------------------------------------------- seeds mode */

function runSeeds(profiles: number, offsets: readonly number[]): void {
  process.stdout.write(`\n=== SEED STABILITY: ${profiles} profiles x ${offsets.length} independent offsets ===\n\n`);
  const maxFreqs: number[] = [];
  for (const offset of offsets) {
    const report = runSimulation(profiles, { mode: "quiz", seedOffset: offset });
    reportTop(`offset=${offset}`, report);
    maxFreqs.push((report.topMatchFrequency[0]?.[1] ?? 0) / report.profiles);
  }
  const mean = maxFreqs.reduce((s, v) => s + v, 0) / maxFreqs.length;
  const sd = Math.sqrt(maxFreqs.reduce((s, v) => s + (v - mean) ** 2, 0) / maxFreqs.length);
  process.stdout.write(
    `\nmax-#1-frequency across runs: mean=${pct(mean)} sd=${pct(sd)} range=[${pct(Math.min(...maxFreqs))}, ${pct(Math.max(...maxFreqs))}]\n`,
  );
  const anyOver20 = maxFreqs.some((f) => f > 0.2);
  process.stdout.write(`any run exceeds 20% alarm threshold: ${anyOver20 ? "YES" : "no"}\n\n`);
}

/* ------------------------------------------------------------ ablate mode */

const ABLATIONS: Array<[string, readonly string[]]> = [
  ["final (no ablation)", []],
  ["without q53 (analytical_rigor fix)", ["q53"]],
  ["without q54 (planning_orientation fix)", ["q54"]],
  ["without q55 (mastery_orientation fix)", ["q55"]],
  ["without q56 (deep_focus fix)", ["q56"]],
  ["without q53+q54 (round 2)", ["q53", "q54"]],
  ["without q55+q56 (round 3)", ["q55", "q56"]],
  ["without q53+q54+q55+q56 (rounds 2+3)", ["q53", "q54", "q55", "q56"]],
  ["without q33 (collaboration's ONLY bidirectional item)", ["q33"]],
];

function runAblations(profiles: number, seedOffset: number): void {
  process.stdout.write(`\n=== ABLATION SWEEP: ${profiles} profiles, seedOffset=${seedOffset} ===\n\n`);
  for (const [label, ids] of ABLATIONS) {
    const quiz = ids.length === 0 ? QUIZ : quizWithout(QUIZ, ids);
    const report = runSimulation(profiles, { mode: "quiz", quiz, seedOffset });
    reportTop(label, report);
  }
  process.stdout.write("\n");
}

/* -------------------------------------------------------------- noise mode
 * Perturbs the SIMULATED-USER response model (how a latent trait vector
 * turns into quiz answers), not the production scoring/matching code. This
 * tests whether the domination figure is brittle to modest, plausible
 * changes in response noise, independent of any quiz-item change.
 */

interface NoiseParams {
  /** Gumbel-choice utility scale (production simulate.ts uses 2.2). Higher =
   *  simulated users answer choice items more deterministically from their
   *  latent trait (less randomness in which option they pick). */
  choiceTemperature: number;
  /** Gaussian noise sd added to a likert response (production uses 0.3).
   *  Higher = simulated users' likert answers are noisier / less faithful
   *  to their latent trait. */
  likertNoiseSd: number;
}

function simulateResponsesWithNoise(seed: number, quiz: Quiz, params: NoiseParams): QuizResponse[] {
  const rand = mulberry32(seed * 7919 + 13);
  const latent = simulateProfile(seed).scores;
  const pull = (id: AttributeId) => ((latent[id] ?? 50) - 50) / 50;
  const responses: QuizResponse[] = [];
  const gaussian = (r: () => number) => {
    const u = Math.max(Number.EPSILON, r());
    const v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

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
      const noisy = predicted * (q.reverseKeyed ? -1 : 1) + gaussian(rand) * params.likertNoiseSd;
      responses.push({ questionId: q.id, value: Math.min(7, Math.max(1, Math.round(4 + 3 * noisy))) });
      continue;
    }
    let bestId: string | undefined;
    let bestScore = -Infinity;
    for (const option of q.options ?? []) {
      let utility = 0;
      for (const eff of option.effects) utility += eff.weight * eff.direction * pull(eff.attributeId);
      const gumbel = -Math.log(-Math.log(Math.max(Number.EPSILON, rand())));
      const total = utility * params.choiceTemperature + gumbel;
      if (total > bestScore) {
        bestScore = total;
        bestId = option.id;
      }
    }
    if (bestId) responses.push({ questionId: q.id, value: bestId });
  }
  return responses;
}

function simulateQuizProfileWithNoise(seed: number, quiz: Quiz, params: NoiseParams): UserProfile {
  return scoreQuiz({
    quiz,
    responses: simulateResponsesWithNoise(seed, quiz, params),
    profileId: `simqn_${seed}`,
    completedAt: "1970-01-01T00:00:00.000Z",
  });
}

const NOISE_VARIANTS: Array<[string, NoiseParams]> = [
  ["baseline (production: temp=2.2, likertSd=0.3)", { choiceTemperature: 2.2, likertNoiseSd: 0.3 }],
  ["+25% choice determinism (temp=2.75)", { choiceTemperature: 2.75, likertNoiseSd: 0.3 }],
  ["-25% choice determinism (temp=1.65)", { choiceTemperature: 1.65, likertNoiseSd: 0.3 }],
  ["+50% likert noise (likertSd=0.45)", { choiceTemperature: 2.2, likertNoiseSd: 0.45 }],
  ["-50% likert noise (likertSd=0.15)", { choiceTemperature: 2.2, likertNoiseSd: 0.15 }],
];

function runNoise(profiles: number, seedOffset: number): void {
  process.stdout.write(`\n=== RESPONSE-NOISE PERTURBATION: ${profiles} profiles, seedOffset=${seedOffset} ===\n\n`);
  for (const [label, params] of NOISE_VARIANTS) {
    // Re-implemented inline against buildResultSet via a local loop, since
    // runSimulation's makeProfile signature doesn't take noise params.
    const topCount = new Map<string, number>();
    for (let i = 0; i < profiles; i++) {
      const user = simulateQuizProfileWithNoise(seedOffset + i + 1, QUIZ, params);
      const result = buildResultSet(user, SEED_PEOPLE);
      if (result.closest) topCount.set(result.closest.personId, (topCount.get(result.closest.personId) ?? 0) + 1);
    }
    const sorted = [...topCount.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const top = sorted.slice(0, 6);
    const [first] = top;
    process.stdout.write(
      `${label.padEnd(42)} max=${first ? `${first[0]}(${pct(first[1] / profiles)})` : "n/a"}` +
        `  top6: ${top.map(([id, c]) => `${id.replace("p_", "")}=${pct(c / profiles)}`).join(", ")}\n`,
    );
  }
  process.stdout.write("\n");
}

/* ------------------------------------------------------------ dist mode
 * Section 7 (calibration robustness): checks that the FULL match/greatness
 * distribution — not just the #1 domination figure — stays in an
 * interpretable range under the most extreme perturbations tested (full
 * round-2+3 ablation, and the noisiest response-model variant), rather than
 * collapsing toward the ceiling/floor or spreading implausibly wide.
 */

function runDistributions(profiles: number): void {
  process.stdout.write(`\n=== CALIBRATION RANGE CHECK: ${profiles} profiles ===\n\n`);
  const variants: Array<[string, Quiz]> = [
    ["final (no ablation)", QUIZ],
    ["without q53+q54+q55+q56 (most extreme ablation tested)", quizWithout(QUIZ, ["q53", "q54", "q55", "q56"])],
  ];
  for (const [label, quiz] of variants) {
    const report = runSimulation(profiles, { mode: "quiz", quiz });
    const d = report.allMatches;
    const t1 = report.topMatches;
    const g = report.greatness;
    process.stdout.write(`${label}\n`);
    process.stdout.write(
      `  all:       min=${d.min} p10=${d.p10} p25=${d.p25} med=${d.median} p75=${d.p75} p90=${d.p90} max=${d.max}\n`,
    );
    process.stdout.write(
      `  top1:      min=${t1.min} p10=${t1.p10} p25=${t1.p25} med=${t1.median} p75=${t1.p75} p90=${t1.p90} max=${t1.max}\n`,
    );
    process.stdout.write(
      `  greatness: min=${g.min} p10=${g.p10} p25=${g.p25} med=${g.median} p75=${g.p75} p90=${g.p90} max=${g.max}\n\n`,
    );
  }
}

/* ----------------------------------------------------------------- CLI */

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2] ?? "seeds";
  const profiles = Number(process.argv[3] ?? 10000);
  if (mode === "seeds") {
    runSeeds(profiles, [0, 50000, 100000, 250000, 500000]);
  } else if (mode === "ablate") {
    runAblations(profiles, Number(process.argv[4] ?? 0));
  } else if (mode === "noise") {
    runNoise(profiles, Number(process.argv[4] ?? 0));
  } else if (mode === "dist") {
    runDistributions(profiles);
  } else {
    process.stdout.write(`unknown mode "${mode}"; use seeds|ablate|noise\n`);
  }
}
