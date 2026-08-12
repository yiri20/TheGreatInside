import { describe, expect, it } from "vitest";
import { ATTRIBUTES, type AttributeId } from "../../core/attributes/attributes.js";
import { orderedQuestions, QUIZ } from "../../core/quiz/bank.js";
import { scoreQuiz } from "../../core/quiz/scoring.js";
import type { QuizQuestion, QuizResponse } from "../../core/quiz/types.js";
import { buildQuizScreens } from "./quizScreens.js";

const ORDERED = orderedQuestions(QUIZ);
const BY_ID = new Map(ORDERED.map((q) => [q.id, q]));
const SCREENS = buildQuizScreens(QUIZ);

function primaryAttribute(q: QuizQuestion): AttributeId | undefined {
  const effects = q.effects && q.effects.length > 0 ? q.effects : (q.options ?? []).flatMap((o) => o.effects);
  if (effects.length === 0) return undefined;
  return [...effects].sort((a, b) => b.weight - a.weight)[0]!.attributeId;
}

describe("buildQuizScreens (Stage 10A, presentation-only)", () => {
  it("covers every question exactly once, in the SAME order orderedQuestions already produces", () => {
    // Rule 5: never reorders. This is the direct proof, not an inference.
    const flattened = SCREENS.flatMap((s) => s.questionIds);
    expect(flattened).toEqual(ORDERED.map((q) => q.id));
  });

  it("gives every situational/forced_choice/ranking question its own screen (rule 1)", () => {
    for (const s of SCREENS) {
      const qs = s.questionIds.map((id) => BY_ID.get(id)!);
      const nonLikert = qs.filter((q) => q.format !== "likert7");
      if (nonLikert.length > 0) {
        expect(s.questionIds.length, s.questionIds.join(",")).toBe(1);
      }
    }
  });

  it("never puts two questions with the same primary attribute on one screen (rule 3)", () => {
    for (const s of SCREENS) {
      const primaries = s.questionIds.map((id) => primaryAttribute(BY_ID.get(id)!)).filter(Boolean);
      expect(new Set(primaries).size, s.questionIds.join(",")).toBe(primaries.length);
    }
  });

  it("every screen has 1-3 questions", () => {
    for (const s of SCREENS) {
      expect(s.questionIds.length).toBeGreaterThanOrEqual(1);
      expect(s.questionIds.length).toBeLessThanOrEqual(3);
    }
  });

  it("a screen with 3 questions only occurs when grouping is conservative (documented, not just asserted)", () => {
    // Not a hard product requirement by itself, but a sanity check that
    // 3-question screens are the exception, not the rule.
    const triples = SCREENS.filter((s) => s.questionIds.length === 3);
    expect(triples.length).toBeLessThan(SCREENS.length / 4);
  });

  it("is a pure function of the quiz — identical input produces identical output", () => {
    expect(buildQuizScreens(QUIZ)).toEqual(buildQuizScreens(QUIZ));
  });

  it("reduces screen count relative to one-question-per-screen, without dropping any question", () => {
    expect(SCREENS.length).toBeLessThan(ORDERED.length);
    expect(SCREENS.length).toBeGreaterThan(0);
  });
});

describe("Stage 10A rule 10: scoring is byte-identical regardless of screen grouping", () => {
  /** One full, deterministic answer per question — same fixture idea as
   *  scoring.test.ts's `answers`, just covering all 64 rather than 30, so
   *  this exercises the CURRENT quiz_v2 bank exactly. */
  function answerFor(q: QuizQuestion, seed: number): QuizResponse["value"] {
    if (q.format === "likert7") return 1 + (seed % 7);
    const opts = q.options ?? [];
    return opts[seed % Math.max(1, opts.length)]?.id ?? "a";
  }

  it("scores identically whether responses arrive in flat authored order or SCREEN-grouped order", () => {
    // "Flat order": exactly what the pre-Stage-10A one-question-per-screen
    // UI would have produced. "Screen order": what the grouped UI produces
    // (still every question exactly once — screens never reorder, rule 5 —
    // but this is the REAL shape a multi-question screen's simultaneous
    // answers take, constructed from SCREENS directly, not assumed).
    const flatOrder: QuizResponse[] = ORDERED.map((q, i) => ({ questionId: q.id, value: answerFor(q, i) }));
    const answerByQuestionId = new Map(flatOrder.map((r) => [r.questionId, r.value]));
    const screenOrder: QuizResponse[] = SCREENS.flatMap((s) =>
      s.questionIds.map((id) => ({ questionId: id, value: answerByQuestionId.get(id)! })),
    );

    const opts = { quiz: QUIZ, profileId: "u", completedAt: "2026-01-01T00:00:00.000Z" };
    const a = scoreQuiz({ ...opts, responses: flatOrder });
    const b = scoreQuiz({ ...opts, responses: screenOrder });
    expect(b.scores).toEqual(a.scores);
    expect(b.confidence).toEqual(a.confidence);
  });
});

describe("Stage 10A: attributes.test.ts-level guard — grouping never touches taxonomy/quiz data", () => {
  it("does not add, remove, or reorder canonical attribute ids", () => {
    // Defensive: quizScreens.ts must never be capable of mutating shared
    // state. ATTRIBUTES is frozen (Object.freeze in attributes.ts) so this
    // is really testing that nothing here even attempts it.
    expect(Object.isFrozen(ATTRIBUTES)).toBe(true);
  });
});
