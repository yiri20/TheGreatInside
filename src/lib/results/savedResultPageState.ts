/**
 * SAVED-RESULT PAGE STATE — Phase 10C (post-E2E hardening).
 *
 * Extracted so the auth-vs-lookup distinction is a directly testable, pure
 * decision — this project has no component-rendering test infrastructure
 * (no jsdom/@testing-library/react), so page.tsx itself can only be
 * verified by direct code inspection plus live E2E; this function carries
 * the actual branching logic that inspection/E2E is checking.
 *
 * Root-cause bug this exists to prevent from recurring: an earlier version
 * of `/account/results/[id]/page.tsx` returned the SAME "not found" state
 * for "not signed in" as for "signed in, but RLS returned no row" — secure
 * (never leaked row existence), but semantically wrong: a signed-out
 * visitor (e.g. someone who just clicked Sign out while viewing this page)
 * was told their own real result "doesn't exist or belongs to someone
 * else," which is false and confusing. `signedIn` is checked FIRST and
 * unconditionally short-circuits to `auth_required` — the not-found/
 * unavailable states are only ever reachable once authentication is
 * already established, exactly matching the required security invariant:
 * "unauthenticated" and "authenticated-but-row-unavailable" are safe to
 * distinguish; "nonexistent id" and "someone else's id" are NOT (both
 * still collapse into the same `not_found` state below, unchanged).
 */
import type { FetchSavedResultOutcome } from "./fetchSavedResult.js";
import type { ResultSnapshotV1 } from "@core/results/snapshot";

export type SavedResultPageState =
  | { kind: "auth_required" }
  | { kind: "not_found" }
  | { kind: "unavailable" }
  | { kind: "ok"; snapshot: ResultSnapshotV1 };

export function resolveSavedResultPageState(
  signedIn: boolean,
  outcome: FetchSavedResultOutcome | undefined,
): SavedResultPageState {
  if (!signedIn) return { kind: "auth_required" };
  switch (outcome?.status) {
    case "ok":
      return { kind: "ok", snapshot: outcome.snapshot };
    case "unavailable":
      return { kind: "unavailable" };
    default:
      return { kind: "not_found" };
  }
}
