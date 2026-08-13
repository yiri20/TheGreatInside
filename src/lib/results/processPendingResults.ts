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
import {
  clearPendingOwnResult,
  quarantineDriftedPendingResult,
  quarantineIncompatiblePendingResult,
  readIncompatibleLegacyResultTokens,
  readPendingOwnResults,
  type PendingResultStorage,
} from "./pendingOwnResults.js";
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

/**
 * Failure reasons that can never resolve on retry for the SAME queued
 * entry — the token/provenance/timestamp are fixed at enqueue time, so if
 * one of these fires, no future retry of this exact entry will ever
 * succeed. Cleared (permanently deleted from the active queue) rather than
 * left to occupy a queue slot forever — correct here because every one of
 * these reasons means the token/input itself was malformed or internally
 * inconsistent (an undecodable token, a provenance combination the app has
 * never shipped, a provenance/token quiz-version mismatch, an implausible
 * timestamp): never a real, well-formed anonymous completion whose only
 * problem is that time passed. `unauthenticated` and `db_error` are
 * deliberately excluded — both can genuinely resolve on a later attempt (a
 * session that expires mid-call, a transient DB error) and must leave the
 * entry queued for retry.
 *
 * `provenance_drift` is DELIBERATELY NOT in this set (hardened after a
 * third review) — unlike the reasons above, it means the entry WAS a real,
 * well-formed completion, genuinely submitted to `saveCompletedResult`,
 * which correctly rejected it because current server state has moved on.
 * Deleting the client-side record of that would destroy the only surviving
 * trace of a real anonymous completion for no better reason than "the user
 * happened to sign in after the app moved on" — so it is quarantined, not
 * cleared, via its own dedicated branch below (`quarantineDriftedPendingResult`),
 * using exactly the same preserve-not-delete architecture as legacy-format
 * entries (see the `legacyTokens` loop and `IncompatibleReason` in
 * pendingOwnResults.ts).
 */
type FailureReason = Extract<SaveCompletedResultOutcome, { ok: false }>["reason"];
const PERMANENT_FAILURE_REASONS: ReadonlySet<FailureReason> = new Set([
  "invalid_token",
  "noncanonical_token",
  "incomplete_token",
  "unknown_version_provenance",
  "version_mismatch",
  "invalid_completed_at",
]);

export interface PendingResultProcessed {
  resultToken: string;
  outcome: SaveCompletedResultOutcome;
}

/**
 * Returns one entry per queued item actually attempted (empty if signed out
 * or the queue was already empty) — additive over the original `void`
 * return: existing callers (`PendingResultsSync`, `quiz/page.tsx`'s
 * fire-and-forget `goNext()` call) already ignore the resolved value and
 * only `.catch()` the promise, so this is not a breaking change for them.
 * Added (Phase 10C) so a caller that cares about ONE specific token — the
 * `/results` signed-out CTA's saved-state indicator — can observe whether
 * THAT token was actually saved, drifted, or left pending, without
 * reimplementing this loop or its queue-mutation rules a second time
 * (the "one canonical save path" rule this module's own header describes).
 */
export async function processPendingResults(
  action: SaveCompletedResultAction,
  storage?: PendingResultStorage,
  auth: AuthCheck = browserAuthCheck(),
): Promise<PendingResultProcessed[]> {
  const pending = readPendingOwnResults(storage);
  const legacyTokens = readIncompatibleLegacyResultTokens(storage);
  if (pending.length === 0 && legacyTokens.length === 0) return [];

  if (!(await auth.isSignedIn())) return [];

  const processed: PendingResultProcessed[] = [];

  // Phase 10C backward compatibility (hardened after a second review): an
  // entry written by code from BEFORE personDataVersion existed can never
  // be safely drift-checked — there is no way to know what the person
  // roster looked like when it was written. It is NEVER sent to `action`
  // (no fabricated/guessed personDataVersion), NEVER cleared/deleted, and
  // NEVER reported as a success. `quarantineIncompatiblePendingResult`
  // MOVES it (verified-safe ordering, see that function's own doc comment)
  // out of the active queue into a separate, permanent store — preserved
  // indefinitely, not destroyed, exactly because signing in is not, on its
  // own, a decision the user actually made about this specific unverifiable
  // completion. This is also what stops it from being reported again on
  // every subsequent run: once moved, `readIncompatibleLegacyResultTokens`
  // no longer finds it in the active queue — the entry itself still exists,
  // in the quarantine store, until an explicit future user action removes
  // it (`dismissIncompatiblePendingResult`, not called from anywhere yet).
  for (const resultToken of legacyTokens) {
    quarantineIncompatiblePendingResult(resultToken, storage);
    processed.push({
      resultToken,
      outcome: {
        ok: false,
        reason: "provenance_drift",
        detail: "legacy_format: predates Phase 10C provenance fields entirely; preserved for manual recovery, not deleted",
      },
    });
  }

  for (const entry of pending) {
    try {
      const outcome = await action({
        resultToken: entry.resultToken,
        completedAt: entry.completedAt,
        provenance: entry.provenance,
        personDataVersion: entry.personDataVersion,
      });
      processed.push({ resultToken: entry.resultToken, outcome });
      if (outcome.ok) {
        clearPendingOwnResult(entry.resultToken, storage);
      } else if (outcome.reason === "provenance_drift") {
        // A real completion, genuinely rejected by the server because
        // current state has moved on — quarantine, never delete. See the
        // module-level comment above PERMANENT_FAILURE_REASONS.
        quarantineDriftedPendingResult(entry.resultToken, storage);
      } else if (PERMANENT_FAILURE_REASONS.has(outcome.reason)) {
        clearPendingOwnResult(entry.resultToken, storage);
      }
      // else: transient (unauthenticated, db_error) — left queued for retry.
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
  return processed;
}
