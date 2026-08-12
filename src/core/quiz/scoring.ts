/**
 * SCORING ENGINE — scoring_v1
 *
 * Deterministic, order-independent, locale-independent, pure.
 *
 *   For each attribute a:
 *     avg_a  = sum(direction_i * weight_i) / sum(weight_i)      over items loading on a
 *     score_a = clamp(0, 100, 50 + GAIN * 50 * avg_a)
 *     conf_a  = clamp(MIN_CONF, 1, sum(weight_i) / TARGET_WEIGHT)
 *
 * WHY A WEIGHTED MEAN: it is commutative, so question order and section order
 * cannot change the result (tested). It also keeps the score bounded without
 * needing a per-question normalisation constant that would drift as the bank
 * grows.
 *
 * WHY GAIN: a plain weighted mean regresses hard toward 50, which compresses
 * every user into a narrow band and destroys match spread. GAIN expands the
 * usable range while clamping preserves the 0-100 contract. GAIN is part of the
 * scoring version — changing it requires a version bump because it changes
 * every historical result.
 *
 * UNANSWERED ATTRIBUTES: fall back to the neutral midpoint with floor
 * confidence. Because matching multiplies by user confidence, an unmeasured
 * attribute contributes very little rather than faking a real 50.
 */

import {
  ATTRIBUTES,
  ATTRIBUTE_IDS,
  TAXONOMY_VERSION,
  type AttributeId,
} from "../attributes/attributes.js";
import type { UserProfile } from "../types.js";
import type { AttributeEffect, Quiz, QuizResponse } from "./types.js";

export const SCORING_VERSION = "scoring_v1";

export const SCORING_CONSTANTS = {
  GAIN: 1.25,
  /** Total item weight at which an attribute is considered fully measured. */
  TARGET_WEIGHT: 2.5,
  MIN_CONFIDENCE: 0.2,
  /** Score assigned when an attribute received no responses at all. */
  NEUTRAL_SCORE: 50,
} as const;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Likert 1..7 -> [-1, 1]. 4 is exactly neutral. */
export function likertToDirection(value: number): number {
  return clamp((value - 4) / 3, -1, 1);
}

interface Accumulator {
  weightedSum: number;
  totalWeight: number;
}

function applyEffects(
  acc: Map<AttributeId, Accumulator>,
  effects: readonly AttributeEffect[],
  scale: number,
): void {
  for (const effect of effects) {
    const entry = acc.get(effect.attributeId) ?? { weightedSum: 0, totalWeight: 0 };
    entry.weightedSum += effect.direction * scale * effect.weight;
    entry.totalWeight += effect.weight;
    acc.set(effect.attributeId, entry);
  }
}

export interface ScoreQuizInput {
  quiz: Quiz;
  responses: readonly QuizResponse[];
  profileId: string;
  completedAt: string;
}

export function scoreQuiz({
  quiz,
  responses,
  profileId,
  completedAt,
}: ScoreQuizInput): UserProfile {
  const questions = new Map(quiz.questions.map((q) => [q.id, q]));
  const acc = new Map<AttributeId, Accumulator>();

  // Deduplicate: last response for a question wins, so resuming or changing an
  // answer via back-navigation cannot double-count.
  const latest = new Map<string, QuizResponse>();
  for (const r of responses) latest.set(r.questionId, r);

  for (const response of latest.values()) {
    const question = questions.get(response.questionId);
    if (!question) continue;

    if (question.format === "likert7") {
      if (typeof response.value !== "number" || !question.effects) continue;
      const scale = likertToDirection(response.value) * (question.reverseKeyed ? -1 : 1);
      applyEffects(acc, question.effects, scale);
    } else {
      if (typeof response.value !== "string" || !question.options) continue;
      const option = question.options.find((o) => o.id === response.value);
      if (!option) continue;
      applyEffects(acc, option.effects, 1);
    }
  }

  const scores = {} as Record<AttributeId, number>;
  const confidence = {} as Record<AttributeId, number>;

  for (const id of ATTRIBUTE_IDS) {
    const entry = acc.get(id);
    if (!entry || entry.totalWeight === 0) {
      scores[id] = SCORING_CONSTANTS.NEUTRAL_SCORE;
      confidence[id] = SCORING_CONSTANTS.MIN_CONFIDENCE;
      continue;
    }
    const avg = entry.weightedSum / entry.totalWeight;
    scores[id] = Math.round(clamp(50 + SCORING_CONSTANTS.GAIN * 50 * avg, 0, 100));
    confidence[id] = clamp(
      entry.totalWeight / SCORING_CONSTANTS.TARGET_WEIGHT,
      SCORING_CONSTANTS.MIN_CONFIDENCE,
      1,
    );
  }

  return {
    id: profileId,
    quizVersion: quiz.version,
    scoringVersion: SCORING_VERSION,
    taxonomyVersion: TAXONOMY_VERSION,
    scores,
    confidence,
    completedAt,
  };
}

/* ------------------------------------------------------- authoring guards */

export interface CoverageReport {
  attributeId: AttributeId;
  itemCount: number;
  totalWeight: number;
  /** Largest share of the attribute's total weight held by any one item. */
  maxSingleItemShare: number;
}

/**
 * Static analysis of a question bank. Used by tests and by the admin quiz
 * editor to prevent a bank where one item determines an attribute or where an
 * attribute is never measured.
 */
export function analyseCoverage(quiz: Quiz): CoverageReport[] {
  const buckets = new Map<AttributeId, number[]>();
  for (const q of quiz.questions) {
    if (q.format === "likert7") {
      for (const e of q.effects ?? []) {
        buckets.set(e.attributeId, [...(buckets.get(e.attributeId) ?? []), e.weight]);
      }
    } else {
      // A choice question measures an attribute once, however many options
      // touch it: take the maximum weight any single option can contribute.
      const perAttr = new Map<AttributeId, number>();
      for (const o of q.options ?? []) {
        for (const e of o.effects) {
          perAttr.set(e.attributeId, Math.max(perAttr.get(e.attributeId) ?? 0, e.weight));
        }
      }
      for (const [attributeId, weight] of perAttr) {
        buckets.set(attributeId, [...(buckets.get(attributeId) ?? []), weight]);
      }
    }
  }

  return ATTRIBUTE_IDS.map((attributeId) => {
    const weights = buckets.get(attributeId) ?? [];
    const totalWeight = weights.reduce((s, w) => s + w, 0);
    return {
      attributeId,
      itemCount: weights.length,
      totalWeight,
      maxSingleItemShare: totalWeight === 0 ? 1 : Math.max(0, ...weights) / totalWeight,
    };
  });
}

export interface DirectionBalanceReport {
  attributeId: AttributeId;
  totalWeight: number;
  /** Weight from likert items — bidirectional by construction (the 1..7 scale
   *  itself carries the negative pole; a low answer genuinely subtracts). */
  likertWeight: number;
  /** Weight from choice items where >=2 options load this attribute with
   *  opposite-sign direction — i.e. a real trade-off, not just presence. */
  choiceBidirectionalWeight: number;
  /** Weight from choice items where this attribute is loaded by SOME option(s)
   *  but every one of them carries the SAME sign. Selecting the option adds
   *  signal; selecting anything else contributes nothing (not a negative) —
   *  see CLAUDE.md "Phase 4" for why this structurally biases the mean upward. */
  oneSidedWeight: number;
  /** oneSidedWeight / totalWeight — the diagnostic used to find and fix the
   *  Phase 2 issue 2b mean-shift bias. */
  oneSidedShare: number;
}

/**
 * Distinguishes genuinely bidirectional measurement (a likert scale, or a
 * forced choice where opposing options represent opposite poles of the SAME
 * attribute) from "one-sided" choice measurement, where an attribute is only
 * ever added-to when its option is picked and never subtracted-from when it
 * isn't. A weighted mean over one-sided items has no mechanism to pull back
 * toward the reference midpoint — only ever up — which is what actually
 * produced the Phase 2 issue 2b mean-shift (confirmed by correlating this
 * metric against simulated mean deviation; see `trait-diagnostic.ts`).
 */
export function analyseDirectionBalance(quiz: Quiz): DirectionBalanceReport[] {
  const likert = new Map<AttributeId, number>();
  const bidirectional = new Map<AttributeId, number>();
  const oneSided = new Map<AttributeId, number>();
  const add = (m: Map<AttributeId, number>, id: AttributeId, w: number) => m.set(id, (m.get(id) ?? 0) + w);

  for (const q of quiz.questions) {
    if (q.format === "likert7") {
      for (const e of q.effects ?? []) add(likert, e.attributeId, e.weight);
      continue;
    }
    // Per attribute touched anywhere in this question, collect every sign it
    // appears with across all options, and the max weight it's given.
    const signs = new Map<AttributeId, Set<number>>();
    const maxWeight = new Map<AttributeId, number>();
    for (const o of q.options ?? []) {
      for (const e of o.effects) {
        const sign = Math.sign(e.direction) || 1;
        if (!signs.has(e.attributeId)) signs.set(e.attributeId, new Set());
        signs.get(e.attributeId)!.add(sign);
        maxWeight.set(e.attributeId, Math.max(maxWeight.get(e.attributeId) ?? 0, e.weight));
      }
    }
    for (const [attributeId, seenSigns] of signs) {
      const w = maxWeight.get(attributeId)!;
      if (seenSigns.size > 1) add(bidirectional, attributeId, w);
      else add(oneSided, attributeId, w);
    }
  }

  return ATTRIBUTE_IDS.map((attributeId) => {
    const likertWeight = likert.get(attributeId) ?? 0;
    const choiceBidirectionalWeight = bidirectional.get(attributeId) ?? 0;
    const oneSidedWeight = oneSided.get(attributeId) ?? 0;
    const totalWeight = likertWeight + choiceBidirectionalWeight + oneSidedWeight;
    return {
      attributeId,
      totalWeight,
      likertWeight,
      choiceBidirectionalWeight,
      oneSidedWeight,
      oneSidedShare: totalWeight === 0 ? 0 : oneSidedWeight / totalWeight,
    };
  });
}

/** Every canonical attribute must exist in the taxonomy the quiz targets. */
export function validateQuiz(quiz: Quiz): string[] {
  const errors: string[] = [];
  const ids = new Set(quiz.questions.map((q) => q.id));
  if (ids.size !== quiz.questions.length) errors.push("duplicate question ids");
  for (const section of quiz.sections) {
    for (const qid of section.questionIds) {
      if (!ids.has(qid)) errors.push(`section ${section.id} references missing question ${qid}`);
    }
  }
  for (const q of quiz.questions) {
    if (q.format === "likert7" && !q.effects?.length) errors.push(`${q.id}: likert with no effects`);
    if (q.format !== "likert7" && !q.options?.length) errors.push(`${q.id}: choice with no options`);
    for (const e of [...(q.effects ?? []), ...(q.options ?? []).flatMap((o) => o.effects)]) {
      if (!ATTRIBUTES[e.attributeId]) errors.push(`${q.id}: unknown attribute ${e.attributeId}`);
      if (e.direction < -1 || e.direction > 1) errors.push(`${q.id}: direction out of range`);
      if (e.weight <= 0) errors.push(`${q.id}: non-positive weight`);
    }
  }
  return errors;
}
