/**
 * ACCOUNT PAGE STATE — Phase 10C (post-E2E hardening companion to
 * savedResultPageState.ts). `/account` already kept "not authenticated"
 * separate from "authenticated, empty history" correctly before this
 * change — extracted into a pure function anyway, for the same reason as
 * the saved-result page: a directly testable regression guard against
 * this exact class of bug (conflating auth state with content state)
 * recurring here too, and to use the identical authentication-state
 * contract consistently across both account routes, as required.
 */
export type AccountPageState = { kind: "signed_out" } | { kind: "empty" } | { kind: "list" };

export function resolveAccountPageState(signedIn: boolean, rowCount: number): AccountPageState {
  if (!signedIn) return { kind: "signed_out" };
  return rowCount === 0 ? { kind: "empty" } : { kind: "list" };
}
