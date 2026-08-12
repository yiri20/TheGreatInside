import type { AttributeId } from "../attributes/attributes.js";

export type QuestionFormat = "likert7" | "forced_choice" | "situational" | "ranking";

/**
 * A single attribute load produced by an answer.
 *
 * `direction` is the signed load in [-1, 1]: +1 means the answer indicates the
 * high end of the dimension, -1 the low end, 0.4 a weak nudge upward, etc.
 * `weight` is how much this item counts toward the attribute (item reliability).
 *
 * No single item should carry enough weight to determine an attribute on its
 * own — enforced by `analyseCoverage` and asserted in tests.
 */
export interface AttributeEffect {
  attributeId: AttributeId;
  direction: number;
  weight: number;
}

export interface QuizOption {
  id: string;
  /** Localisation key; canonical English lives in the en bundle. */
  labelKey: string;
  effects: AttributeEffect[];
}

export interface QuizQuestion {
  id: string;
  sectionId: string;
  format: QuestionFormat;
  promptKey: string;
  /** Present for forced_choice / situational. */
  options?: QuizOption[];
  /**
   * Present for likert7. The scale value (1..7) is converted to [-1,1] and
   * multiplied by each effect's direction.
   */
  effects?: AttributeEffect[];
  /** Reverse-keyed items guard against acquiescence bias. */
  reverseKeyed?: boolean;
  /**
   * Optional per-item scale-anchor overrides (Phase 6.6 Stage 10C-B),
   * likert7 only. When absent, `LikertScale` falls back to the global
   * "Strongly disagree" / "Strongly agree" anchors — this is purely
   * presentational, never read by `scoreQuiz`, which only ever sees
   * `response.value` (1..7). Localisation keys, not raw strings, matching
   * every other quiz text field.
   */
  leftAnchorKey?: string;
  rightAnchorKey?: string;
  skippable: boolean;
}

export interface QuizSection {
  id: string;
  titleKey: string;
  questionIds: string[];
}

export interface Quiz {
  version: string;
  taxonomyVersion: string;
  sections: QuizSection[];
  questions: QuizQuestion[];
}

/** What the client submits. Order is irrelevant to scoring. */
export interface QuizResponse {
  questionId: string;
  /** For likert7: 1..7. For choice formats: the selected option id. */
  value: number | string;
}
