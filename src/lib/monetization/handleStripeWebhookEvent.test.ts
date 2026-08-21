import { describe, expect, it, vi } from "vitest";
import { handleStripeWebhookEvent, type HandleWebhookDeps, type WebhookStripeEvent } from "./handleStripeWebhookEvent";
import { DEEP_INSIDE_PRODUCT_KEY } from "@core/monetization/product";

function completedSession(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    id: "cs_test_123",
    client_reference_id: "user-1",
    payment_status: "paid",
    payment_intent: "pi_test_123",
    amount_total: 699,
    currency: "usd",
    metadata: { userId: "user-1", productKey: DEEP_INSIDE_PRODUCT_KEY, resultToken: "quiz_v2.abc", locale: "en-US" },
    ...overrides,
  };
}

function baseDeps(overrides: Partial<HandleWebhookDeps> = {}): HandleWebhookDeps {
  return {
    upsertPurchase: vi.fn(async () => ({ ok: true as const, purchaseId: "purchase-1", wasNew: true })),
    grantEntitlement: vi.fn(async () => ({ ok: true })),
    recordPurchaseCompletedEvent: vi.fn(async () => {}),
    markPurchaseRefundedByPaymentIntent: vi.fn(async () => ({ ok: false as const })),
    revokeEntitlementForPurchase: vi.fn(async () => {}),
    ...overrides,
  };
}

describe("handleStripeWebhookEvent", () => {
  it("grants the entitlement and records the funnel event for a valid, new completion", async () => {
    const deps = baseDeps();
    const event: WebhookStripeEvent = { type: "checkout.session.completed", data: { object: completedSession() } };
    const result = await handleStripeWebhookEvent(deps, event);
    expect(result).toEqual({ ok: true, action: "granted" });
    expect(deps.grantEntitlement).toHaveBeenCalledWith("user-1", DEEP_INSIDE_PRODUCT_KEY, "purchase-1");
    expect(deps.recordPurchaseCompletedEvent).toHaveBeenCalledWith({ userId: "user-1", resultToken: "quiz_v2.abc" });
  });

  it("also handles async_payment_succeeded the same way", async () => {
    const deps = baseDeps();
    const event: WebhookStripeEvent = {
      type: "checkout.session.async_payment_succeeded",
      data: { object: completedSession() },
    };
    const result = await handleStripeWebhookEvent(deps, event);
    expect(result).toEqual({ ok: true, action: "granted" });
  });

  it("is idempotent: a duplicate delivery of the same session grants without double-recording the funnel event", async () => {
    const deps = baseDeps({ upsertPurchase: vi.fn(async () => ({ ok: true as const, purchaseId: "purchase-1", wasNew: false })) });
    const event: WebhookStripeEvent = { type: "checkout.session.completed", data: { object: completedSession() } };
    const result = await handleStripeWebhookEvent(deps, event);
    expect(result).toEqual({ ok: true, action: "already_processed" });
    // Entitlement grant still runs (self-healing) — only the analytics
    // event is skipped, so the funnel isn't double-counted.
    expect(deps.grantEntitlement).toHaveBeenCalledTimes(1);
    expect(deps.recordPurchaseCompletedEvent).not.toHaveBeenCalled();
  });

  it("does not grant an entitlement for a payment of an unknown product", async () => {
    const deps = baseDeps();
    const event: WebhookStripeEvent = {
      type: "checkout.session.completed",
      data: { object: completedSession({ metadata: { userId: "user-1", productKey: "some_other_product" } }) },
    };
    const result = await handleStripeWebhookEvent(deps, event);
    expect(result).toEqual({ ok: false, reason: "malformed_metadata" });
    expect(deps.grantEntitlement).not.toHaveBeenCalled();
  });

  it("does not grant an entitlement when metadata is missing entirely", async () => {
    const deps = baseDeps();
    const event: WebhookStripeEvent = {
      type: "checkout.session.completed",
      data: { object: completedSession({ metadata: null }) },
    };
    const result = await handleStripeWebhookEvent(deps, event);
    expect(result).toEqual({ ok: false, reason: "malformed_metadata" });
    expect(deps.grantEntitlement).not.toHaveBeenCalled();
  });

  it("does not grant an entitlement when metadata userId disagrees with client_reference_id", async () => {
    const deps = baseDeps();
    const event: WebhookStripeEvent = {
      type: "checkout.session.completed",
      data: {
        object: completedSession({
          client_reference_id: "user-2",
          metadata: { userId: "user-1", productKey: DEEP_INSIDE_PRODUCT_KEY },
        }),
      },
    };
    const result = await handleStripeWebhookEvent(deps, event);
    expect(result).toEqual({ ok: false, reason: "metadata_mismatch" });
    expect(deps.grantEntitlement).not.toHaveBeenCalled();
  });

  it("does not grant an entitlement when payment_status is not paid", async () => {
    const deps = baseDeps();
    const event: WebhookStripeEvent = {
      type: "checkout.session.completed",
      data: { object: completedSession({ payment_status: "unpaid" }) },
    };
    const result = await handleStripeWebhookEvent(deps, event);
    expect(result).toEqual({ ok: false, reason: "not_paid" });
    expect(deps.grantEntitlement).not.toHaveBeenCalled();
  });

  it("ignores unrelated event types without error", async () => {
    const deps = baseDeps();
    const event: WebhookStripeEvent = { type: "customer.created", data: { object: {} } };
    const result = await handleStripeWebhookEvent(deps, event);
    expect(result).toEqual({ ok: true, action: "ignored" });
    expect(deps.upsertPurchase).not.toHaveBeenCalled();
  });

  it("surfaces a purchase-upsert DB failure without granting an entitlement", async () => {
    const deps = baseDeps({ upsertPurchase: vi.fn(async () => ({ ok: false as const, error: "db down" })) });
    const event: WebhookStripeEvent = { type: "checkout.session.completed", data: { object: completedSession() } };
    const result = await handleStripeWebhookEvent(deps, event);
    expect(result).toEqual({ ok: false, reason: "db_error" });
    expect(deps.grantEntitlement).not.toHaveBeenCalled();
  });

  describe("refunds", () => {
    it("revokes the entitlement for the purchase a refunded charge belongs to", async () => {
      const deps = baseDeps({
        markPurchaseRefundedByPaymentIntent: vi.fn(async () => ({ ok: true as const, purchaseId: "purchase-1", userId: "user-1" })),
      });
      const event: WebhookStripeEvent = { type: "charge.refunded", data: { object: { payment_intent: "pi_test_123" } } };
      const result = await handleStripeWebhookEvent(deps, event);
      expect(result).toEqual({ ok: true, action: "refunded" });
      expect(deps.revokeEntitlementForPurchase).toHaveBeenCalledWith("user-1", DEEP_INSIDE_PRODUCT_KEY, "purchase-1");
    });

    it("ignores a refund for a payment_intent this app has no purchase record for", async () => {
      const deps = baseDeps();
      const event: WebhookStripeEvent = { type: "charge.refunded", data: { object: { payment_intent: "pi_unknown" } } };
      const result = await handleStripeWebhookEvent(deps, event);
      expect(result).toEqual({ ok: true, action: "ignored" });
      expect(deps.revokeEntitlementForPurchase).not.toHaveBeenCalled();
    });

    it("ignores a refund event with no payment_intent at all", async () => {
      const deps = baseDeps();
      const event: WebhookStripeEvent = { type: "charge.refunded", data: { object: { payment_intent: null } } };
      const result = await handleStripeWebhookEvent(deps, event);
      expect(result).toEqual({ ok: true, action: "ignored" });
    });
  });
});
