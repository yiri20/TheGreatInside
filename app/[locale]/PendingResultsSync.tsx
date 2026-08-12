"use client";

/**
 * Invisible layout-level client island — Phase 9 Stage 9D. Runs once per
 * full page load (layouts persist across client-side navigation within the
 * same locale segment, so this deliberately does NOT fire on every route
 * change — only on the kind of full navigation `/auth/callback`'s redirect
 * produces, which is exactly the "just signed in" moment this exists to
 * catch). The OTHER real trigger — "already signed in, just finished the
 * quiz" — is handled separately in `quiz/page.tsx`'s `goNext()`, since that
 * case never causes a fresh layout mount at all.
 */
import { useEffect } from "react";
import { processPendingResults } from "@lib/results/processPendingResults";
import { saveCompletedResultAction } from "../actions/results.js";

export function PendingResultsSync() {
  useEffect(() => {
    // Belt-and-suspenders: processPendingResults already catches errors
    // from the per-entry action() call internally, but readPendingOwnResults/
    // auth.isSignedIn() are not — this ensures NOTHING here can become a
    // silent, untraceable unhandled promise rejection.
    processPendingResults(saveCompletedResultAction).catch((err: unknown) => {
      console.error(
        "[PendingResultsSync] processPendingResults threw before completing:",
        err instanceof Error ? err.message : String(err),
      );
    });
  }, []);
  return null;
}
