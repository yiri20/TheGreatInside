/**
 * EN/KO DETERMINISM CHECK — Phase 8.
 *
 * Confirms the localisation pass introduced no scoring dependency on
 * locale: runs a fixed synthetic response set through scoreQuiz ->
 * matchUserToPerson -> computeGreatnessPotential and prints a hash of the
 * numeric output, plus the question/screen counts. There is no locale
 * parameter anywhere in this call chain (scoring.ts reads only
 * response.value/question.effects/reverseKeyed, never promptKey/labelKey
 * text) — this script is a concrete, reproducible witness of that
 * structural guarantee, not a locale-switching A/B test.
 *
 *   corepack pnpm@10 exec tsx src/dev/i18n-identity-check.ts
 */
import { QUIZ, orderedQuestions } from "../core/quiz/bank.js";
import { buildQuizScreens } from "../ui/lib/quizScreens.js";
import { scoreQuiz } from "../core/quiz/scoring.js";
import { matchUserToPerson } from "../core/matching/similarity.js";
import { computeGreatnessPotential } from "../core/greatness/greatness.js";
import { SEED_PEOPLE } from "../data/people/seed.js";
import type { QuizResponse } from "../core/quiz/types.js";

const ordered = orderedQuestions(QUIZ);
console.log(`Question count: ${ordered.length} (expect 64)`);

const screens = buildQuizScreens(QUIZ);
console.log(`Screen count: ${screens.length} (expect 53)`);

// Deterministic synthetic answer set: alternate response pattern, one per question.
const responses: QuizResponse[] = ordered.map((q, i) => {
  if (q.format === "likert7") {
    return { questionId: q.id, value: ((i % 7) + 1) as QuizResponse["value"] };
  }
  const opts = q.options ?? [];
  return { questionId: q.id, value: opts[i % opts.length]!.id };
});

const scored = scoreQuiz({
  quiz: QUIZ,
  responses,
  profileId: "identity-check",
  completedAt: "2026-01-01T00:00:00.000Z",
});

const target = SEED_PEOPLE.find((p) => p.slug === "benjamin-franklin")!;
const match = matchUserToPerson(scored, target);
const greatness = computeGreatnessPotential(scored, { people: SEED_PEOPLE });

console.log("Scores (attribute -> value), sample:", Object.entries(scored.scores).slice(0, 5));
console.log("overallMatch:", match.overallMatch);
console.log("greatness:", greatness.score);
console.log(
  "SCORES_HASH:",
  JSON.stringify(scored.scores) + "|" + JSON.stringify(scored.confidence) + "|" + match.overallMatch + "|" + greatness.score,
);
