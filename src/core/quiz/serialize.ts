/**
 * QUIZ RESPONSE SERIALIZATION — for a URL-shareable, DB-free results flow.
 *
 * Phase 6 needs a way to go from "user finished the quiz" to "see results"
 * without an account or a server round-trip: `scoreQuiz` is already pure, so
 * the only missing piece is a compact, versioned encoding of the raw answers
 * that can live in a URL query string and be decoded back into exactly the
 * `QuizResponse[]` `scoreQuiz` expects.
 *
 * FORMAT: one character per question, in `quiz.questions` order (fixed by the
 * quiz definition, so no separator is needed) —
 *   - likert7:            the digit '1'-'7'
 *   - forced_choice/situational: a letter 'a'.. encoding the option's INDEX
 *     in `question.options` (not its authored `id`) — decoupled from
 *     whatever id string the bank happens to use, so a future bank edit that
 *     renames an option id (but keeps the same order) can't silently corrupt
 *     old links.
 *   - unanswered:          '-'
 *
 * A full 56-item quiz encodes to exactly 56 characters. This is intentionally
 * NOT wired to allow submission with unanswered items in the production
 * flow (the UI requires every question before enabling "See results"), but
 * decode tolerates '-' anyway so a partial/malformed link degrades to a
 * partial profile (scoring's existing "unanswered = neutral" rule) instead
 * of throwing.
 *
 * The caller is responsible for checking `quiz.version` against the version
 * a result string was encoded under before decoding — this module does not
 * silently reinterpret an answer string against a DIFFERENT quiz's item
 * order, since a version mismatch will parse into garbage rather than an
 * error. `encodeResultToken`/`decodeResultToken` below bundle the version
 * into the token itself for exactly this reason.
 */
import type { Quiz, QuizResponse } from "./types.js";

const UNANSWERED = "-";

export function encodeResponses(responses: readonly QuizResponse[], quiz: Quiz): string {
  const byId = new Map(responses.map((r) => [r.questionId, r]));
  let out = "";
  for (const q of quiz.questions) {
    const r = byId.get(q.id);
    if (!r) {
      out += UNANSWERED;
      continue;
    }
    if (q.format === "likert7") {
      const v = typeof r.value === "number" ? r.value : NaN;
      out += Number.isInteger(v) && v >= 1 && v <= 7 ? String(v) : UNANSWERED;
    } else {
      const idx = (q.options ?? []).findIndex((o) => o.id === r.value);
      out += idx >= 0 && idx < 26 ? String.fromCharCode(97 + idx) : UNANSWERED;
    }
  }
  return out;
}

export function decodeResponses(encoded: string, quiz: Quiz): QuizResponse[] {
  const out: QuizResponse[] = [];
  for (let i = 0; i < quiz.questions.length; i++) {
    const ch = encoded[i];
    const q = quiz.questions[i]!;
    if (!ch || ch === UNANSWERED) continue;
    if (q.format === "likert7") {
      const v = Number(ch);
      if (Number.isInteger(v) && v >= 1 && v <= 7) out.push({ questionId: q.id, value: v });
    } else {
      const idx = ch.charCodeAt(0) - 97;
      const option = (q.options ?? [])[idx];
      if (option) out.push({ questionId: q.id, value: option.id });
    }
  }
  return out;
}

/** How many of the quiz's questions have a real (non '-') answer encoded. */
export function answeredCount(encoded: string): number {
  let n = 0;
  for (const ch of encoded) if (ch !== UNANSWERED) n++;
  return n;
}

const TOKEN_SEPARATOR = ".";

/** Bundles the quiz version with the encoded answers into one URL-safe token. */
export function encodeResultToken(responses: readonly QuizResponse[], quiz: Quiz): string {
  return `${quiz.version}${TOKEN_SEPARATOR}${encodeResponses(responses, quiz)}`;
}

export interface DecodedResultToken {
  quizVersion: string;
  responses: QuizResponse[];
}

/**
 * Returns `undefined` — never throws — when the token's version does not
 * match `quiz.version`. The caller (the results page) is expected to show an
 * explicit "this link used an older version of the quiz" state rather than
 * silently scoring a mismatched answer string against the wrong item order.
 */
export function decodeResultToken(token: string, quiz: Quiz): DecodedResultToken | undefined {
  const sep = token.indexOf(TOKEN_SEPARATOR);
  if (sep < 0) return undefined;
  const quizVersion = token.slice(0, sep);
  if (quizVersion !== quiz.version) return undefined;
  const encoded = token.slice(sep + 1);
  return { quizVersion, responses: decodeResponses(encoded, quiz) };
}
