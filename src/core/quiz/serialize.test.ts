import { describe, expect, it } from "vitest";
import { QUIZ } from "./bank.js";
import {
  answeredCount,
  decodeResponses,
  decodeResultToken,
  encodeResponses,
  encodeResultToken,
} from "./serialize.js";
import { scoreQuiz } from "./scoring.js";
import type { QuizResponse } from "./types.js";

/** One deterministic answer per question, exercising both formats. */
function fullAnswers(): QuizResponse[] {
  return QUIZ.questions.map((q, i) =>
    q.format === "likert7"
      ? { questionId: q.id, value: (((i * 3) % 7) + 1) as number }
      : { questionId: q.id, value: q.options![i % q.options!.length]!.id },
  );
}

describe("quiz response serialization", () => {
  it("round-trips a full answer set exactly, in scoreQuiz terms", () => {
    const answers = fullAnswers();
    const encoded = encodeResponses(answers, QUIZ);
    const decoded = decodeResponses(encoded, QUIZ);
    expect(scoreQuiz({ quiz: QUIZ, responses: decoded, profileId: "u", completedAt: "2026-01-01T00:00:00.000Z" }).scores).toEqual(
      scoreQuiz({ quiz: QUIZ, responses: answers, profileId: "u", completedAt: "2026-01-01T00:00:00.000Z" }).scores,
    );
  });

  it("encodes to exactly one character per question", () => {
    expect(encodeResponses(fullAnswers(), QUIZ)).toHaveLength(QUIZ.questions.length);
  });

  it("marks unanswered questions distinctly and decodes them as absent", () => {
    const encoded = encodeResponses([], QUIZ);
    expect(answeredCount(encoded)).toBe(0);
    expect(decodeResponses(encoded, QUIZ)).toEqual([]);
  });

  it("is order-independent on the input responses array", () => {
    const answers = fullAnswers();
    const reversed = [...answers].reverse();
    expect(encodeResponses(answers, QUIZ)).toBe(encodeResponses(reversed, QUIZ));
  });

  it("ignores a response to an unknown question id", () => {
    const withJunk = encodeResponses([...fullAnswers(), { questionId: "not-real", value: 5 }], QUIZ);
    expect(withJunk).toBe(encodeResponses(fullAnswers(), QUIZ));
  });

  it("decodes an out-of-range likert value or unknown option id as unanswered rather than throwing", () => {
    const q = QUIZ.questions.find((x) => x.format === "likert7")!;
    const bad = encodeResponses([{ questionId: q.id, value: 99 }], QUIZ);
    expect(() => decodeResponses(bad, QUIZ)).not.toThrow();
    expect(decodeResponses(bad, QUIZ)).toEqual([]);
  });

  describe("versioned result token", () => {
    it("round-trips through encode/decode", () => {
      const answers = fullAnswers();
      const token = encodeResultToken(answers, QUIZ);
      const decoded = decodeResultToken(token, QUIZ);
      expect(decoded?.quizVersion).toBe(QUIZ.version);
      expect(decoded?.responses).toEqual(decodeResponses(encodeResponses(answers, QUIZ), QUIZ));
    });

    it("refuses to decode a token from a different quiz version rather than reinterpreting it", () => {
      const token = encodeResultToken(fullAnswers(), QUIZ);
      const rewritten = token.replace(QUIZ.version, "quiz_v0_seed2");
      expect(decodeResultToken(rewritten, QUIZ)).toBeUndefined();
    });

    it("returns undefined for a malformed token instead of throwing", () => {
      expect(decodeResultToken("not-a-valid-token", QUIZ)).toBeUndefined();
      expect(decodeResultToken("", QUIZ)).toBeUndefined();
    });
  });
});
