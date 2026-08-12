/**
 * QUIZ PRESENTATION GROUPING — Phase 6.6 Stage 10A
 *
 * PRESENTATION ONLY. Groups the 64 authored `quiz_v2` questions (unchanged —
 * wording, mappings, weights, order, `src/core/quiz/bank.ts` itself) into
 * SCREENS so short Likert items don't each force a separate page-turn. Never
 * touches scoring: a screen is just a UI grouping of question IDs, computed
 * once from the existing `Quiz` structure. `scoreQuiz` still reads the flat
 * `QuizResponse[]` exactly as before — this module has no scoring dependents.
 *
 * Lives in `src/ui`, not `src/core`, specifically because grouping reads
 * canonical English prompt LENGTH as its "is this short" signal — a
 * presentation concern, not a scoring one. `src/core/quiz/bank.ts` is
 * completely unmodified by this file.
 *
 * ALGORITHM (single left-to-right pass over `orderedQuestions`, never
 * reorders — rule 5's "preserve authored order" is satisfied by construction,
 * not by a post-hoc check):
 *   1. `situational` / `forced_choice` / `ranking` questions always get their
 *      own screen (rule 1).
 *   2. `likert7` questions above `SHORT_MAX` characters (long/scenario-style)
 *      also always get their own screen — grouping is only for genuinely
 *      short items.
 *   3. Short `likert7` items accumulate into a buffer, up to 2 per screen by
 *      default (rule 2); a 3rd is allowed only when EVERY item in the buffer
 *      (including the candidate) is under the stricter `VERY_SHORT_MAX`.
 *   4. A candidate is never added to a buffer whose primary attribute matches
 *      the candidate's (rule 3), or falls in the same `RELATED_CLUSTERS`
 *      entry (rule 4) — closing the current screen and starting a new one
 *      instead.
 */
import type { Quiz, QuizQuestion } from "../../core/quiz/types.js";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { orderedQuestions } from "../../core/quiz/bank.js";
import { en } from "../../core/i18n/en.js";

export interface QuizScreen {
  questionIds: readonly string[];
}

const SHORT_MAX = 110;
const VERY_SHORT_MAX = 85;
const DEFAULT_MAX_PER_SCREEN = 2;
const EXTENDED_MAX_PER_SCREEN = 3;

/**
 * Attribute clusters documented as conceptually adjacent or co-loading
 * elsewhere in this project (CLAUDE.md "Attribute taxonomy" merges history,
 * and `docs/phase6.5-taxonomy-audit.md` §1 "Overlap and redundancy" /
 * facet-level reads) — not a new judgment call invented for this grouping
 * pass. Two questions whose primary attribute falls in the same cluster
 * never share a screen (rule 4): seeing both at once would make the
 * measurement intent legible in a way a single-question flow does not.
 */
const RELATED_CLUSTERS: readonly (readonly AttributeId[])[] = [
  ["analytical_rigor", "intuitive_synthesis"], // built as literal opposite poles
  ["perfectionism", "detail_orientation"], // co-load in q12/q14/q48, strongest redundancy signal in the bank
  ["persistence", "adaptability"], // q21/q39 adjacency already flagged as the bank's clearest repetition risk
  ["social_assertiveness", "leadership_drive", "persuasiveness"], // co-load in q22/q24/q25/q52
  ["achievement_drive", "competitiveness", "mastery_orientation", "impact_motivation"], // motivation facet, similar "push yourself" framing
  ["curiosity", "cross_domain_range", "opportunity_sensing"], // "explores broadly" / "notices things" overlap
  ["risk_tolerance", "ambiguity_tolerance"], // superficially similar names, real but adjacent constructs
  ["belief_updating", "independent_thinking"], // Phase 6.5's "the taxonomy cannot tell these two apart" pairing
];

function clusterIndex(id: AttributeId): number {
  return RELATED_CLUSTERS.findIndex((cluster) => cluster.includes(id));
}

function primaryAttribute(q: QuizQuestion): AttributeId | undefined {
  const effects = q.effects && q.effects.length > 0 ? q.effects : (q.options ?? []).flatMap((o) => o.effects);
  if (effects.length === 0) return undefined;
  return [...effects].sort((a, b) => b.weight - a.weight)[0]!.attributeId;
}

function promptLength(q: QuizQuestion): number {
  const raw = (en as Record<string, string | undefined>)[q.promptKey];
  // Unknown prompt key -> treat as long, so grouping only ever gets safer,
  // never over-eager, if a key is ever missing.
  return raw ? raw.length : Number.MAX_SAFE_INTEGER;
}

function hasConflict(buffer: readonly QuizQuestion[], candidate: QuizQuestion): boolean {
  const candidateAttr = primaryAttribute(candidate);
  if (!candidateAttr) return false;
  const candidateCluster = clusterIndex(candidateAttr);
  for (const existing of buffer) {
    const existingAttr = primaryAttribute(existing);
    if (!existingAttr) continue;
    if (existingAttr === candidateAttr) return true; // rule 3
    if (candidateCluster >= 0 && clusterIndex(existingAttr) === candidateCluster) return true; // rule 4
  }
  return false;
}

export function buildQuizScreens(quiz: Quiz): QuizScreen[] {
  const ordered = orderedQuestions(quiz);
  const screens: QuizScreen[] = [];
  let buffer: QuizQuestion[] = [];

  const flush = () => {
    if (buffer.length > 0) {
      screens.push({ questionIds: buffer.map((q) => q.id) });
      buffer = [];
    }
  };

  for (const q of ordered) {
    if (q.format !== "likert7" || promptLength(q) > SHORT_MAX) {
      flush();
      screens.push({ questionIds: [q.id] });
      continue;
    }

    if (buffer.length === 0) {
      buffer.push(q);
      continue;
    }

    const candidateVeryShort = promptLength(q) <= VERY_SHORT_MAX;
    const bufferAllVeryShort = buffer.every((b) => promptLength(b) <= VERY_SHORT_MAX);
    const maxAllowed = candidateVeryShort && bufferAllVeryShort ? EXTENDED_MAX_PER_SCREEN : DEFAULT_MAX_PER_SCREEN;

    if (buffer.length < maxAllowed && !hasConflict(buffer, q)) {
      buffer.push(q);
    } else {
      flush();
      buffer.push(q);
    }
  }
  flush();
  return screens;
}
