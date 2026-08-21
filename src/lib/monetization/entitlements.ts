/**
 * ENTITLEMENT CHECK — Monetization v1.
 *
 * Dependency-injected, same reason as `saveCompletedResult.ts`: kept free
 * of `next/headers`/`server-only` so the (trivial) decision logic here is
 * directly unit-testable, with the real Supabase wiring isolated in
 * `entitlementsServer.ts`. "Active" is the ONLY thing that unlocks Deep
 * Inside — never a localStorage flag, a URL query parameter, or anything
 * else client-supplied. The server/database entitlement is authoritative.
 */
export interface EntitlementDeps {
  /** Returns the row's status if one exists, or "none" if it doesn't —
   *  never throws for "not found", only for a genuine query failure. */
  fetchEntitlementStatus(userId: string, entitlementKey: string): Promise<"active" | "revoked" | "none">;
}

export async function hasActiveEntitlement(
  deps: EntitlementDeps,
  userId: string,
  entitlementKey: string,
): Promise<boolean> {
  return (await deps.fetchEntitlementStatus(userId, entitlementKey)) === "active";
}
