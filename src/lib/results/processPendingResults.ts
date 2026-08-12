/**
 * PENDING-RESULT MIGRATION — Phase 9 Stage 9D.
 *
 * The single routine both real trigger points call — "signed-in quiz
 * completion" (right after `enqueuePendingOwnResult` in
 * `app/[locale]/quiz/page.tsx`'s `goNext()`) and "post-sign-in migration"
 * (once on mount from `app/[locale]/PendingResultsSync.tsx`, a layout-level
 * client island) are literally the same function call, not two divergent
 * code paths — per Phase 9's "one canonical save path" rule.
 *
 * No-ops silently when signed out or when the queue is empty — never a
 * login wall, and background housekeeping the user never needs to see fail.
 *
 * Dependency-injected (the Server Action, the storage backend, the
 * sign-in check) for the same reason `saveCompletedResult.ts` is: it makes
 * the real branching logic here — which failure reasons mean "never going
 * to succeed, stop retrying" vs. "transient, leave it queued" — testable
 * without Next.js/Supabase machinery.
 */
import { createClient } from "@lib/supabase/client";
import { clearPendingOwnResult, readPendingOwnResults, type PendingResultStorage } from "./pendingOwnResults.js";
import type { SaveCompletedResultInput, SaveCompletedResultOutcome } from "./saveCompletedResult.js";

export type SaveCompletedResultAction = (input: SaveCompletedResultInput) => Promise<SaveCompletedResultOutcome>;

export interface AuthCheck {
  isSignedIn(): Promise<boolean>;
}

function browserAuthCheck(): AuthCheck {
  return {
    async isSignedIn() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      return data.user != null;
    },
  };
}

/** Failure reasons that can never resolve on retry for the SAME queued
 *  entry — the token/provenance/timestamp are fixed at enqueue time, so if
 *  one of these fires, no future retry of this exact entry will ever
 *  succeed. Cleared rather than left to occupy a queue slot forever.
 *  `unauthenticated` and `db_error` are deliberately excluded — both can
 *  genuinely resolve on a later attempt (a session that expires mid-call, a
 *  transient DB error) and must leave the entry queued for retry. */
type FailureReason = Extract<SaveCompletedResultOutcome, { ok: false }>["reason"];
const PERMANENT_FAILURE_REASONS: ReadonlySet<FailureReason> = new Set([
  "invalid_token",
  "noncanonical_token",
  "incomplete_token",
  "unknown_version_provenance",
  "version_mismatch",
  "invalid_completed_at",
]);

export async function processPendingResults(
  action: SaveCompletedResultAction,
  storage?: PendingResultStorage,
  auth: AuthCheck = browserAuthCheck(),
): Promise<void> {
  const pending = readPendingOwnResults(storage);
  if (pending.length === 0) return;

  if (!(await auth.isSignedIn())) return;

  for (const entry of pending) {
    try {
      const outcome = await action({
        resultToken: entry.resultToken,
        completedAt: entry.completedAt,
        provenance: entry.provenance,
      });
      if (outcome.ok || PERMANENT_FAILURE_REASONS.has(outcome.reason)) {
        clearPendingOwnResult(entry.resultToken, storage);
      }
    } catch (err) {
      // Retained permanently (not stripped with the rest of the Stage 9D
      // debugging instrumentation): without this, an unexpected throw here
      // (e.g. the Server Action call itself failing) becomes a silent
      // unhandled promise rejection — no trace, no queue mutation, nothing
      // visible unless devtools happens to be open. Sanitized: a short
      // token fingerprint (prefix + length) and the error message only —
      // never the full token, cookies, or credentials. The entry stays
      // queued (never cleared) on an unexpected throw, same as any other
      // non-permanent outcome.
      console.error(
        `[processPendingResults] unexpected error saving ${entry.resultToken.slice(0, 12)}…(${entry.resultToken.length} chars):`,
        err instanceof Error ? err.message : String(err),
      );
    }
  }
}
