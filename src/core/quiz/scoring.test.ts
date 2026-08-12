import { describe, expect, it } from "vitest";
import { ATTRIBUTE_IDS, TAXONOMY_VERSION } from "../attributes/attributes.js";
import { orderedQuestions, QUIZ } from "./bank.js";
import { analyseCoverage, analyseDirectionBalance, likertToDirection, scoreQuiz, validateQuiz } from "./scoring.js";
import type { Quiz, QuizResponse } from "./types.js";
import { t } from "../i18n/index.js";

const answers: QuizResponse[] = [
  { questionId: "q01", value: "a" },
  { questionId: "q02", value: "a" },
  { questionId: "q03", value: 6 },
  { questionId: "q04", value: 7 },
  { questionId: "q05", value: "c" },
  { questionId: "q06", value: 5 },
  { questionId: "q07", value: "a" },
  { questionId: "q08", value: 3 },
  { questionId: "q09", value: "a" },
  { questionId: "q10", value: 6 },
  { questionId: "q11", value: 6 },
  { questionId: "q12", value: "b" },
  { questionId: "q13", value: 7 },
  { questionId: "q14", value: 2 },
  { questionId: "q15", value: "b" },
  { questionId: "q16", value: 5 },
  { questionId: "q17", value: "b" },
  { questionId: "q18", value: 6 },
  { questionId: "q19", value: 7 },
  { questionId: "q20", value: "a" },
  { questionId: "q21", value: 3 },
  { questionId: "q22", value: 4 },
  { questionId: "q23", value: "b" },
  { questionId: "q24", value: 3 },
  { questionId: "q25", value: "a" },
  { questionId: "q26", value: 5 },
  { questionId: "q27", value: "a" },
  { questionId: "q28", value: 2 },
  { questionId: "q29", value: 6 },
  { questionId: "q30", value: 5 },
];

const score = (responses: QuizResponse[]) =>
  scoreQuiz({ quiz: QUIZ, responses, profileId: "u1", completedAt: "2026-01-01T00:00:00.000Z" });

describe("question bank integrity", () => {
  it("has no structural errors", () => {
    expect(validateQuiz(QUIZ)).toEqual([]);
  });

  it("measures every canonical attribute with at least two independent items", () => {
    for (const report of analyseCoverage(QUIZ)) {
      expect(report.itemCount, `${report.attributeId} item count`).toBeGreaterThanOrEqual(2);
    }
  });

  it("never lets one item determine an attribute", () => {
    for (const report of analyseCoverage(QUIZ)) {
      expect(report.maxSingleItemShare, `${report.attributeId} single-item share`).toBeLessThanOrEqual(
        0.55,
      );
    }
  });

  it("has canonical English copy for every prompt and option", () => {
    for (const q of QUIZ.questions) {
      expect(t("en-US", q.promptKey as never), q.id).not.toBe(q.promptKey);
      for (const o of q.options ?? []) {
        expect(t("en-US", o.labelKey as never), o.id).not.toBe(o.labelKey);
      }
    }
  });

  it("references only questions that exist from its sections", () => {
    const ids = new Set(QUIZ.questions.map((q) => q.id));
    const referenced = QUIZ.sections.flatMap((s) => s.questionIds);
    expect(referenced.sort()).toEqual([...ids].sort());
  });
});

/**
 * Phase 6 regression: the quiz UI presents questions in `orderedQuestions`
 * (section-grouped) order, NOT `QUIZ.questions` (raw authoring-order) —
 * found when the real UI showed "Section 1" content resuming after already
 * having moved on to Section 2+, because later phases' items are appended to
 * the array rather than inserted at their section's position.
 */
describe("orderedQuestions (Phase 6 quiz UI ordering)", () => {
  it("groups every question under its own section, contiguously", () => {
    const ordered = orderedQuestions(QUIZ);
    const sectionSeq = ordered.map((q) => q.sectionId);
    const firstSeenAt = new Map<string, number>();
    for (let i = 0; i < sectionSeq.length; i++) {
      const id = sectionSeq[i]!;
      if (!firstSeenAt.has(id)) firstSeenAt.set(id, i);
    }
    // A section is contiguous iff every occurrence of it sits within
    // [firstSeenAt, firstSeenAt + count) with no other section's id between.
    let i = 0;
    for (const section of QUIZ.sections) {
      const start = firstSeenAt.get(section.id);
      expect(start, section.id).toBe(i);
      for (let j = 0; j < section.questionIds.length; j++) {
        expect(sectionSeq[i + j], `${section.id}[${j}]`).toBe(section.id);
      }
      i += section.questionIds.length;
    }
  });

  it("includes every question exactly once", () => {
    const ordered = orderedQuestions(QUIZ);
    expect(ordered.map((q) => q.id).sort()).toEqual(QUIZ.questions.map((q) => q.id).sort());
    expect(new Set(ordered.map((q) => q.id)).size).toBe(ordered.length);
  });

  it("matches each section's own questionIds order within that section", () => {
    const ordered = orderedQuestions(QUIZ);
    for (const section of QUIZ.sections) {
      const got = ordered.filter((q) => q.sectionId === section.id).map((q) => q.id);
      expect(got).toEqual(section.questionIds);
    }
  });
});

describe("scoring determinism", () => {
  it("produces the same vector for the same answers", () => {
    expect(score(answers).scores).toEqual(score(answers).scores);
  });

  it("is unaffected by question order", () => {
    const shuffled = [...answers].reverse();
    expect(score(shuffled).scores).toEqual(score(answers).scores);
  });

  it("takes no locale input at all, so language cannot alter the vector", () => {
    // The signature is the guarantee: scoreQuiz has no locale parameter. This
    // asserts the property behaviourally too, by scoring the same responses
    // while the i18n layer is asked for a different language in between.
    const before = score(answers).scores;
    t("ko-KR", "attribute.curiosity");
    expect(score(answers).scores).toEqual(before);
  });

  it("uses the last response when a question is answered twice", () => {
    const changed = score([...answers, { questionId: "q28", value: 7 }]);
    const direct = score(answers.map((a) => (a.questionId === "q28" ? { ...a, value: 7 } : a)));
    expect(changed.scores).toEqual(direct.scores);
    expect(changed.scores.competitiveness).toBeGreaterThan(score(answers).scores.competitiveness);
  });

  it("stamps the versions needed to reinterpret the result later", () => {
    const profile = score(answers);
    expect(profile.quizVersion).toBe(QUIZ.version);
    expect(profile.taxonomyVersion).toBe(TAXONOMY_VERSION);
    expect(profile.scoringVersion).toMatch(/^scoring_/);
  });
});

describe("scoring output shape", () => {
  it("returns every canonical attribute within 0-100", () => {
    const profile = score(answers);
    for (const id of ATTRIBUTE_IDS) {
      expect(profile.scores[id], id).toBeGreaterThanOrEqual(0);
      expect(profile.scores[id], id).toBeLessThanOrEqual(100);
    }
  });

  it("marks unanswered attributes neutral with floor confidence rather than a fake 50", () => {
    const profile = score([]);
    for (const id of ATTRIBUTE_IDS) {
      expect(profile.scores[id]).toBe(50);
      expect(profile.confidence[id]).toBe(0.2);
    }
  });

  it("raises confidence when more items load on an attribute", () => {
    const partial = score([{ questionId: "q11", value: 7 }]);
    const full = score(answers);
    expect(full.confidence.discipline).toBeGreaterThan(partial.confidence.discipline);
  });

  it("maps the likert midpoint to exactly neutral", () => {
    expect(likertToDirection(4)).toBe(0);
    expect(likertToDirection(7)).toBe(1);
    expect(likertToDirection(1)).toBe(-1);
  });

  it("moves an attribute in the direction the answer indicates", () => {
    const high = score([{ questionId: "q18", value: 7 }]);
    const low = score([{ questionId: "q18", value: 1 }]);
    expect(high.scores.risk_tolerance).toBeGreaterThan(80);
    expect(low.scores.risk_tolerance).toBeLessThan(20);
  });

  it("ignores unknown questions and unknown option ids", () => {
    const withJunk = score([...answers, { questionId: "nope", value: "x" }, { questionId: "q01", value: "zz" }]);
    const baseline = score(answers.filter((a) => a.questionId !== "q01"));
    expect(withJunk.scores).toEqual(baseline.scores);
  });
});

/**
 * Phase 4 "known open issue 2b" regression coverage: a weighted mean over
 * items that only ever ADD to an attribute (never subtract, when the
 * attribute-naming option isn't picked) has no mechanism to pull back toward
 * the reference midpoint — see CLAUDE.md "Phase 4" and the header comment on
 * `analyseDirectionBalance`. These tests pin the classifier's behaviour on
 * small fixture quizzes, independent of whatever `bank.ts` looks like later.
 */
describe("analyseDirectionBalance (one-sided-measurement diagnostic)", () => {
  const fixtureQuiz = (questions: Quiz["questions"]): Quiz => ({
    version: "fixture",
    taxonomyVersion: "fixture",
    sections: [{ id: "s", titleKey: "s", questionIds: questions.map((q) => q.id) }],
    questions,
  });

  const reportFor = (quiz: Quiz, attributeId: string) =>
    analyseDirectionBalance(quiz).find((r) => r.attributeId === attributeId)!;

  it("classifies a likert item's weight as bidirectional, regardless of its effect direction", () => {
    const quiz = fixtureQuiz([
      {
        id: "L1",
        sectionId: "s",
        format: "likert7",
        promptKey: "p",
        effects: [{ attributeId: "curiosity", direction: 1, weight: 1 }],
        skippable: true,
      },
    ]);
    const report = reportFor(quiz, "curiosity");
    expect(report.likertWeight).toBe(1);
    expect(report.oneSidedWeight).toBe(0);
    expect(report.oneSidedShare).toBe(0);
  });

  it("classifies a 2-way choice as ONE-SIDED when only one option touches the attribute", () => {
    const quiz = fixtureQuiz([
      {
        id: "C1",
        sectionId: "s",
        format: "forced_choice",
        promptKey: "p",
        skippable: true,
        options: [
          { id: "a", labelKey: "a", effects: [{ attributeId: "discipline", direction: 1, weight: 1 }] },
          { id: "b", labelKey: "b", effects: [{ attributeId: "curiosity", direction: 1, weight: 1 }] },
        ],
      },
    ]);
    const report = reportFor(quiz, "discipline");
    expect(report.choiceBidirectionalWeight).toBe(0);
    expect(report.oneSidedWeight).toBe(1);
    expect(report.oneSidedShare).toBe(1);
  });

  it("classifies a 2-way choice as BIDIRECTIONAL when both options load the same attribute with opposite signs", () => {
    const quiz = fixtureQuiz([
      {
        id: "C2",
        sectionId: "s",
        format: "forced_choice",
        promptKey: "p",
        skippable: true,
        options: [
          { id: "a", labelKey: "a", effects: [{ attributeId: "discipline", direction: 1, weight: 1 }] },
          { id: "b", labelKey: "b", effects: [{ attributeId: "discipline", direction: -1, weight: 0.6 }] },
        ],
      },
    ]);
    const report = reportFor(quiz, "discipline");
    expect(report.oneSidedWeight).toBe(0);
    expect(report.choiceBidirectionalWeight).toBe(1); // takes the max weight seen, not the sum
    expect(report.oneSidedShare).toBe(0);
  });

  it("classifies a multi-way (3+) choice as one-sided per attribute when that attribute appears under only one sign", () => {
    const quiz = fixtureQuiz([
      {
        id: "S1",
        sectionId: "s",
        format: "situational",
        promptKey: "p",
        skippable: true,
        options: [
          { id: "a", labelKey: "a", effects: [{ attributeId: "collaboration", direction: 1, weight: 1 }] },
          { id: "b", labelKey: "b", effects: [{ attributeId: "autonomy_need", direction: 1, weight: 1 }] },
          { id: "c", labelKey: "c", effects: [{ attributeId: "leadership_drive", direction: 1, weight: 1 }] },
        ],
      },
    ]);
    // collaboration only ever appears in option "a" — picking "b" or "c" contributes
    // nothing toward it (not a negative), so it is one-sided even though the item as a
    // whole offers three choices.
    expect(reportFor(quiz, "collaboration").oneSidedShare).toBe(1);
  });

  it("computes oneSidedShare as a weighted mix across an attribute's items, not just item count", () => {
    const quiz = fixtureQuiz([
      {
        id: "L1",
        sectionId: "s",
        format: "likert7",
        promptKey: "p",
        effects: [{ attributeId: "curiosity", direction: 1, weight: 3 }],
        skippable: true,
      },
      {
        id: "C1",
        sectionId: "s",
        format: "forced_choice",
        promptKey: "p",
        skippable: true,
        options: [
          { id: "a", labelKey: "a", effects: [{ attributeId: "curiosity", direction: 1, weight: 1 }] },
          { id: "b", labelKey: "b", effects: [{ attributeId: "discipline", direction: 1, weight: 1 }] },
        ],
      },
    ]);
    // 3 bidirectional (likert) + 1 one-sided (choice) = 25% one-sided by weight,
    // even though it's 1 of 2 items (50%) by count.
    expect(reportFor(quiz, "curiosity").oneSidedShare).toBeCloseTo(0.25, 6);
  });

  it("the shipped quiz_v1 bank no longer has any 100%-one-sided attribute", () => {
    // Phase 2 (intuitive_synthesis, autonomy_need) and Phase 4 (six more
    // attributes) both fixed specific attributes that were entirely one-sided.
    // This is a coarse regression guard against a future item edit silently
    // reintroducing a fully one-sided attribute, without pinning to today's
    // exact per-attribute percentages (which are expected to keep moving as
    // the bank grows).
    for (const report of analyseDirectionBalance(QUIZ)) {
      expect(report.oneSidedShare, report.attributeId).toBeLessThan(1);
    }
  });
});
