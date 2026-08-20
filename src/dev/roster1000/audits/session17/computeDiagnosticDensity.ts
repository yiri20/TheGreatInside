/**
 * Session 17 diagnostic-density calculator.
 *
 * Pure, deterministic reader of the four locked `episodes.*.json` files in
 * this directory. Computes per-candidate and per-group (Session 13:
 * Borges+Sankara vs. Session 15: Fermi+Baldwin) diagnostic-density
 * statistics exactly as specified by the session's own instruction 12 --
 * arithmetic is computed here, not manually approximated, and this script
 * makes zero classification judgment calls itself: every number is a
 * count/percentage over the classifications already locked in the JSON
 * files (see CLASSIFICATION_LOCK.md).
 *
 * Run with: corepack pnpm@10 exec tsx src/dev/roster1000/audits/session17/computeDiagnosticDensity.ts
 *
 * This is a diagnostic/audit-only dev script, same category as
 * calibrate.ts/simulate.ts -- it is not part of the production candidate
 * pipeline and reads only files inside this audit directory.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type DiagnosticClass = "A" | "B" | "C" | "D";
type Structure = "one_time_behavior" | "repeated_behavior_pattern" | "longitudinal_pattern_across_years";

interface Episode {
  id: string;
  text: string;
  class: DiagnosticClass;
  contexts: string[];
  structure: Structure[];
  highStakes: boolean;
  evidenceForm: string;
  explicitMotive: boolean;
  explicitEmotionalReaction: boolean;
  explicitReasoningProcess: boolean;
  observableBehaviorOnly: boolean;
  redundantWith: string[];
}

interface EpisodeFile {
  candidate: string;
  sessionGroup: number;
  episodes: Episode[];
}

const DIR = join(process.cwd(), "src/dev/roster1000/audits/session17");

function load(file: string): EpisodeFile {
  return JSON.parse(readFileSync(join(DIR, file), "utf8")) as EpisodeFile;
}

const files = [
  load("episodes.borges.json"),
  load("episodes.sankara.json"),
  load("episodes.fermi.json"),
  load("episodes.baldwin.json"),
];

function pct(n: number, total: number): number {
  return total === 0 ? 0 : Math.round((n / total) * 1000) / 10;
}

function candidateStats(f: EpisodeFile) {
  const eps = f.episodes;
  const total = eps.length;
  const countClass = (c: DiagnosticClass) => eps.filter((e) => e.class === c).length;
  const a = countClass("A");
  const b = countClass("B");
  const c = countClass("C");
  const d = countClass("D");
  const ab = a + b;

  const distinctContexts = new Set<string>();
  for (const e of eps) for (const ctx of e.contexts) distinctContexts.add(ctx);

  const repeatedOrLongitudinal = eps.filter(
    (e) => e.structure.includes("repeated_behavior_pattern") || e.structure.includes("longitudinal_pattern_across_years"),
  ).length;

  const highStakes = eps.filter((e) => e.highStakes).length;

  const explicitMotiveOrReasoningOrEmotion = eps.filter(
    (e) => e.explicitMotive || e.explicitReasoningProcess || e.explicitEmotionalReaction,
  ).length;
  const explicitReaction = eps.filter((e) => e.explicitEmotionalReaction).length;
  const explicitMotiveOrReasoning = eps.filter((e) => e.explicitMotive || e.explicitReasoningProcess).length;

  // "primarily achievement/career chronology without additional behavioral
  // signal" -- episodes classed C that carry the career_achievement context
  // tag (every C-classed episode in this locked set does; asserted, not
  // assumed).
  const careerChronologyNoSignal = eps.filter((e) => e.class === "C" && e.contexts.includes("career_achievement")).length;

  return {
    candidate: f.candidate,
    sessionGroup: f.sessionGroup,
    totalEpisodes: total,
    A: a,
    B: b,
    C: c,
    D: d,
    Apct: pct(a, total),
    Bpct: pct(b, total),
    Cpct: pct(c, total),
    Dpct: pct(d, total),
    ABcount: ab,
    ABpct: pct(ab, total),
    distinctContextCount: distinctContexts.size,
    distinctContexts: Array.from(distinctContexts).sort(),
    repeatedOrLongitudinalCount: repeatedOrLongitudinal,
    repeatedOrLongitudinalPct: pct(repeatedOrLongitudinal, total),
    highStakesCount: highStakes,
    highStakesPct: pct(highStakes, total),
    explicitMotiveReasoningEmotionCount: explicitMotiveOrReasoningOrEmotion,
    explicitMotiveReasoningEmotionPct: pct(explicitMotiveOrReasoningOrEmotion, total),
    explicitReactionCount: explicitReaction,
    explicitMotiveOrReasoningCount: explicitMotiveOrReasoning,
    careerChronologyNoSignalCount: careerChronologyNoSignal,
    careerChronologyNoSignalPct: pct(careerChronologyNoSignal, total),
  };
}

const perCandidate = files.map(candidateStats);

function groupStats(group: number, label: string) {
  const members = perCandidate.filter((c) => c.sessionGroup === group);
  if (members.length !== 2) {
    throw new Error(`Session 17 audit expects exactly 2 candidates per group, got ${members.length} for group ${group}`);
  }
  const [m0, m1] = members as [(typeof members)[number], (typeof members)[number]];
  const totalEpisodes = members.reduce((s, m) => s + m.totalEpisodes, 0);
  const totalA = members.reduce((s, m) => s + m.A, 0);
  const totalB = members.reduce((s, m) => s + m.B, 0);
  const totalC = members.reduce((s, m) => s + m.C, 0);
  const totalD = members.reduce((s, m) => s + m.D, 0);
  const totalAB = totalA + totalB;

  // Pooled (episode-weighted) percentages, and mean-of-candidate-percentages
  // (unweighted across the two candidates in the group) -- both reported,
  // since with n=2 per group either could be read as "the" figure and the
  // session's own instructions call for treating any relationship as
  // illustrative, not statistically established.
  return {
    group,
    label,
    candidates: members.map((m) => m.candidate),
    n: members.length,
    totalEpisodes,
    pooled: {
      Apct: pct(totalA, totalEpisodes),
      Bpct: pct(totalB, totalEpisodes),
      Cpct: pct(totalC, totalEpisodes),
      Dpct: pct(totalD, totalEpisodes),
      ABpct: pct(totalAB, totalEpisodes),
    },
    meanOfCandidatePct: {
      Apct: Math.round(((m0.Apct + m1.Apct) / 2) * 10) / 10,
      Bpct: Math.round(((m0.Bpct + m1.Bpct) / 2) * 10) / 10,
      Cpct: Math.round(((m0.Cpct + m1.Cpct) / 2) * 10) / 10,
      Dpct: Math.round(((m0.Dpct + m1.Dpct) / 2) * 10) / 10,
      ABpct: Math.round(((m0.ABpct + m1.ABpct) / 2) * 10) / 10,
    },
    distinctContextUnion: Array.from(new Set(members.flatMap((m) => m.distinctContexts))).sort().length,
    meanDistinctContextsPerCandidate: Math.round(((m0.distinctContextCount + m1.distinctContextCount) / 2) * 10) / 10,
    totalRepeatedOrLongitudinal: members.reduce((s, m) => s + m.repeatedOrLongitudinalCount, 0),
    repeatedOrLongitudinalPooledPct: pct(members.reduce((s, m) => s + m.repeatedOrLongitudinalCount, 0), totalEpisodes),
    totalHighStakes: members.reduce((s, m) => s + m.highStakesCount, 0),
    highStakesPooledPct: pct(members.reduce((s, m) => s + m.highStakesCount, 0), totalEpisodes),
    totalExplicitMotiveReasoningEmotion: members.reduce((s, m) => s + m.explicitMotiveReasoningEmotionCount, 0),
    explicitMotiveReasoningEmotionPooledPct: pct(
      members.reduce((s, m) => s + m.explicitMotiveReasoningEmotionCount, 0),
      totalEpisodes,
    ),
    totalCareerChronologyNoSignal: members.reduce((s, m) => s + m.careerChronologyNoSignalCount, 0),
  };
}

const session13Group = groupStats(13, "Session 13 (Borges + Sankara)");
const session15Group = groupStats(15, "Session 15 (Fermi + Baldwin)");

const result = {
  generatedBy: "src/dev/roster1000/audits/session17/computeDiagnosticDensity.ts",
  perCandidate,
  session13Group,
  session15Group,
  densityDeltaPooledABpct: Math.round((session13Group.pooled.ABpct - session15Group.pooled.ABpct) * 10) / 10,
  densityDeltaPooledApct: Math.round((session13Group.pooled.Apct - session15Group.pooled.Apct) * 10) / 10,
};

const outPath = join(DIR, "results.json");
writeFileSync(outPath, JSON.stringify(result, null, 2) + "\n", "utf8");

console.log(JSON.stringify(result, null, 2));
console.log(`\nWrote ${outPath}`);
