import "server-only";

/**
 * Real Supabase wiring for `hasActiveEntitlement` — uses the ordinary
 * cookie-bound, RLS-scoped client (NOT the admin/secret-key client): a
 * user checking their OWN entitlement is exactly what `user_entitlements_
 * select_own`'s RLS policy already permits, so no privilege escalation is
 * needed here. Only the webhook's GRANT path needs the secret-key client.
 */
import { createClient } from "@lib/supabase/server";
import { hasActiveEntitlement, type EntitlementDeps } from "./entitlements";

async function fetchEntitlementStatusServer(
  userId: string,
  entitlementKey: string,
): Promise<"active" | "revoked" | "none"> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_entitlements")
    .select("status")
    .eq("user_id", userId)
    .eq("entitlement_key", entitlementKey)
    .maybeSingle();
  if (error || !data) return "none";
  return data.status === "active" ? "active" : "revoked";
}

const deps: EntitlementDeps = { fetchEntitlementStatus: fetchEntitlementStatusServer };

export async function hasActiveEntitlementServer(userId: string, entitlementKey: string): Promise<boolean> {
  return hasActiveEntitlement(deps, userId, entitlementKey);
}
