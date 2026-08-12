/**
 * PENDING OWN-COMPLETION QUEUE — Phase 9 Stage 9C.
 *
 * `tgi_last_result_v1` (results/SaveLastResult.tsx) means "the last result
 * this browser VIEWED" — it fires on every successful /results visit,
 * including one reached via someone else's shared link. It must never be
 * treated as proof of ownership: automatically migrating it into account
 * history on sign-in could silently claim a DIFFERENT person's viewed
 * result as the signed-in user's own.
 *
 * `tgi_pending_own_results_v1` is the provenance-safe alternative: written
 * ONLY from the single real completion point in the app (see
 * app/[locale]/quiz/page.tsx's goNext(), right where the token is first
 * produced from this browser's own just-submitted answers). A bounded,
 * deduplicated QUEUE rather than a single marker — a visitor can complete
 * the quiz more than once before ever signing in, and none of those
 * completions should be silently lost. No cloud sync: this queue only ever
 * exists in localStorage until a future (Stage 9D) migration reads and
 * clears it. `tgi_quiz_draft_v1` (the IN-PROGRESS draft) is a separate,
 * unrelated mechanism and stays untouched by this module.
 */
import { CURRENT_VERSIONS, type VersionSnapshot } from "@core/versions";

export const PENDING_OWN_RESULTS_KEY = "tgi_pending_own_results_v1";

/** Defensive bound against unlimited anonymous retakes accumulating before
 *  a first sign-in — not a claim that older attempts matter less. */
const MAX_PENDING = 5;

export interface PendingOwnResult {
  resultToken: string;
  /** ISO 8601, snapshotted client-side at completion. Informational
   *  provenance only — see saveCompletedResult.ts's own validation of this
   *  same value once it reaches the server; never trusted for anything here. */
  completedAt: string;
  /** Snapshotted from CURRENT_VERSIONS at completion time — NOT re-read
   *  from current code at migration time, so a completion produced under
   *  an older version combination keeps describing itself accurately even
   *  after the app has moved on (see src/core/versions.ts). */
  provenance: VersionSnapshot;
}

/** Narrow, injectable storage surface — matches the subset of
 *  window.localStorage this module actually uses, so tests can supply a
 *  plain in-memory fake under Vitest's Node environment without jsdom. */
export interface PendingResultStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function browserStorage(): PendingResultStorage | undefined {
  return typeof window === "undefined" ? undefined : window.localStorage;
}

function isVersionSnapshot(v: unknown): v is VersionSnapshot {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.quizVersion === "string" &&
    typeof o.scoringVersion === "string" &&
    typeof o.taxonomyVersion === "string" &&
    typeof o.greatnessScoringVersion === "string" &&
    typeof o.matchingVersion === "string" &&
    typeof o.calibrationVersion === "string"
  );
}

function isPendingOwnResult(v: unknown): v is PendingOwnResult {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.resultToken === "string" &&
    o.resultToken.length > 0 &&
    typeof o.completedAt === "string" &&
    isVersionSnapshot(o.provenance)
  );
}

function readQueue(storage: PendingResultStorage | undefined): PendingOwnResult[] {
  if (!storage) return [];
  let raw: string | null;
  try {
    raw = storage.getItem(PENDING_OWN_RESULTS_KEY);
  } catch {
    return [];
  }
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isPendingOwnResult) : [];
  } catch {
    return [];
  }
}

function writeQueue(storage: PendingResultStorage | undefined, queue: PendingOwnResult[]): void {
  if (!storage) return;
  try {
    storage.setItem(PENDING_OWN_RESULTS_KEY, JSON.stringify(queue));
  } catch {
    // Private-browsing/quota failures are non-fatal — same rationale as
    // saveDraft in app/[locale]/quiz/page.tsx.
  }
}

/** Called ONLY from the single real quiz-completion point. Deduplicates by
 *  resultToken (a retake with identical answers doesn't grow the queue) and
 *  caps at MAX_PENDING, dropping the OLDEST entry first on overflow. */
export function enqueuePendingOwnResult(
  resultToken: string,
  storage: PendingResultStorage | undefined = browserStorage(),
): void {
  const queue = readQueue(storage).filter((e) => e.resultToken !== resultToken);
  queue.push({ resultToken, completedAt: new Date().toISOString(), provenance: CURRENT_VERSIONS });
  while (queue.length > MAX_PENDING) queue.shift();
  writeQueue(storage, queue);
}

/** Unused until Stage 9D's sign-in/migration flow reads it. */
export function readPendingOwnResults(
  storage: PendingResultStorage | undefined = browserStorage(),
): PendingOwnResult[] {
  return readQueue(storage);
}

/** Unused until Stage 9D calls this after a successful account save.
 *  Idempotent: clearing a token not present in the queue is a no-op. */
export function clearPendingOwnResult(
  resultToken: string,
  storage: PendingResultStorage | undefined = browserStorage(),
): void {
  writeQueue(
    storage,
    readQueue(storage).filter((e) => e.resultToken !== resultToken),
  );
}
