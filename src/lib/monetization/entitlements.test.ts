import { describe, expect, it } from "vitest";
import { hasActiveEntitlement, type EntitlementDeps } from "./entitlements";

describe("hasActiveEntitlement", () => {
  it("is true only for an 'active' status", async () => {
    const deps: EntitlementDeps = { fetchEntitlementStatus: async () => "active" };
    expect(await hasActiveEntitlement(deps, "user-1", "deep_inside_lifetime_v1")).toBe(true);
  });

  it("is false for a revoked entitlement", async () => {
    const deps: EntitlementDeps = { fetchEntitlementStatus: async () => "revoked" };
    expect(await hasActiveEntitlement(deps, "user-1", "deep_inside_lifetime_v1")).toBe(false);
  });

  it("is false when no entitlement row exists", async () => {
    const deps: EntitlementDeps = { fetchEntitlementStatus: async () => "none" };
    expect(await hasActiveEntitlement(deps, "user-1", "deep_inside_lifetime_v1")).toBe(false);
  });

  it("passes through the exact userId/entitlementKey requested", async () => {
    let seen: [string, string] | undefined;
    const deps: EntitlementDeps = {
      fetchEntitlementStatus: async (userId, key) => {
        seen = [userId, key];
        return "none";
      },
    };
    await hasActiveEntitlement(deps, "user-42", "deep_inside_lifetime_v1");
    expect(seen).toEqual(["user-42", "deep_inside_lifetime_v1"]);
  });
});
