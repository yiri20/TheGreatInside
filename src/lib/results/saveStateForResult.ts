/**
 * Pure decision logic for `SignInCta.tsx`'s signed-out/saved-state display,
 * extracted so it's unit-testable without jsdom/DOM rendering — this
 * project has no component-rendering test infrastructure (no
 * `@testing-library/react`, no jsdom in `vitest.config.ts`), same
 * established boundary Phase 6/7's own checkpoints already documented
 * ("verification was unit tests plus a live manual browser walkthrough").
 *
 * "saved" is deliberately only reachable when `wasPending` is true AND the
 * save actually succeeded — never inferred from mere absence, since
 * absence is ambiguous (already saved earlier vs. never this browser's own
 * completion, e.g. a signed-in user viewing someone else's shared link).
 * See `SignInCta.tsx`'s own doc comment for the full reasoning.
 */
import type { SaveCompletedResultOutcome } from "./saveCompletedResult.js";

export type SaveCtaState = "signed_out" | "saved" | "neutral";

export function saveStateForResult(
  signedIn: boolean,
  wasPending: boolean,
  outcome: SaveCompletedResultOutcome | undefined,
): SaveCtaState {
  if (!signedIn) return "signed_out";
  if (!wasPending) return "neutral";
  return outcome?.ok ? "saved" : "neutral";
}
