import { describe, expect, it, vi } from "vitest";
import { createDeepInsideCheckoutSession, type CreateCheckoutSessionDeps } from "./createCheckoutSession";

function baseDeps(overrides: Partial<CreateCheckoutSessionDeps> = {}): CreateCheckoutSessionDeps {
  return {
    auth: { getUser: async () => ({ data: { user: { id: "user-1" } }, error: null }) },
    hasActiveEntitlement: async () => false,
    verifyPrice: async () => ({ ok: true }),
    createStripeCheckoutSession: async () => ({ url: "https://checkout.stripe.com/session-123" }),
    priceId: "price_abc123",
    siteUrl: "https://thegreatinside.com",
    ...overrides,
  };
}

describe("createDeepInsideCheckoutSession", () => {
  it("rejects an unauthenticated request", async () => {
    const deps = baseDeps({ auth: { getUser: async () => ({ data: { user: null }, error: null }) } });
    const result = await createDeepInsideCheckoutSession(deps, { locale: "en-US" });
    expect(result).toEqual({ ok: false, reason: "unauthenticated" });
  });

  it("rejects when auth.getUser() itself errors", async () => {
    const deps = baseDeps({ auth: { getUser: async () => ({ data: { user: null }, error: new Error("boom") }) } });
    const result = await createDeepInsideCheckoutSession(deps, { locale: "en-US" });
    expect(result).toEqual({ ok: false, reason: "unauthenticated" });
  });

  it("succeeds for an authenticated, non-entitled user, returning the Stripe Checkout URL", async () => {
    const deps = baseDeps();
    const result = await createDeepInsideCheckoutSession(deps, { locale: "en-US", resultToken: "quiz_v2.abc" });
    expect(result).toEqual({ ok: true, url: "https://checkout.stripe.com/session-123" });
  });

  it("refuses to start a second checkout for an already-entitled user", async () => {
    const deps = baseDeps({ hasActiveEntitlement: async () => true });
    const create = vi.fn(async () => ({ url: "https://checkout.stripe.com/should-not-be-called" }));
    const result = await createDeepInsideCheckoutSession(
      { ...deps, createStripeCheckoutSession: create },
      { locale: "en-US" },
    );
    expect(result).toEqual({ ok: false, reason: "already_entitled" });
    expect(create).not.toHaveBeenCalled();
  });

  it("refuses to create a session when the configured Price fails verification", async () => {
    const deps = baseDeps({ verifyPrice: async () => ({ ok: false, reason: "amount mismatch" }) });
    const create = vi.fn(async () => ({ url: "https://checkout.stripe.com/should-not-be-called" }));
    const result = await createDeepInsideCheckoutSession(
      { ...deps, createStripeCheckoutSession: create },
      { locale: "en-US" },
    );
    expect(result).toEqual({ ok: false, reason: "price_misconfigured", detail: "amount mismatch" });
    expect(create).not.toHaveBeenCalled();
  });

  it("passes only the server-decided priceId to Stripe, never anything from the client input", async () => {
    let capturedPriceId: string | undefined;
    const deps = baseDeps({
      createStripeCheckoutSession: async (params) => {
        capturedPriceId = params.priceId;
        return { url: "https://checkout.stripe.com/session-123" };
      },
    });
    // CreateCheckoutSessionInput has no price/amount field at all — this
    // is a structural guarantee, not just a runtime check, but we also
    // confirm the actual value passed through is deps.priceId.
    await createDeepInsideCheckoutSession(deps, { locale: "en-US" });
    expect(capturedPriceId).toBe("price_abc123");
  });

  it("attaches userId, productKey, resultToken, and locale as Stripe metadata via server-controlled params", async () => {
    let captured: unknown;
    const deps = baseDeps({
      createStripeCheckoutSession: async (params) => {
        captured = params;
        return { url: "https://checkout.stripe.com/session-123" };
      },
    });
    await createDeepInsideCheckoutSession(deps, { locale: "ko-KR", resultToken: "quiz_v2.xyz" });
    expect(captured).toMatchObject({
      userId: "user-1",
      resultToken: "quiz_v2.xyz",
      locale: "ko-KR",
    });
  });

  it("builds success/cancel URLs on the server-supplied siteUrl, preserving the result token", async () => {
    let captured: { successUrl: string; cancelUrl: string } | undefined;
    const deps = baseDeps({
      createStripeCheckoutSession: async (params) => {
        captured = params;
        return { url: "https://checkout.stripe.com/session-123" };
      },
    });
    await createDeepInsideCheckoutSession(deps, { locale: "en-US", resultToken: "quiz_v2.abc" });
    expect(captured!.successUrl).toBe(
      "https://thegreatinside.com/en-US/deep-inside/processing?session_id={CHECKOUT_SESSION_ID}&r=quiz_v2.abc",
    );
    expect(captured!.cancelUrl).toBe("https://thegreatinside.com/en-US/results?r=quiz_v2.abc");
  });

  it("omits the result-token query param entirely when none was supplied", async () => {
    let captured: { successUrl: string; cancelUrl: string } | undefined;
    const deps = baseDeps({
      createStripeCheckoutSession: async (params) => {
        captured = params;
        return { url: "https://checkout.stripe.com/session-123" };
      },
    });
    await createDeepInsideCheckoutSession(deps, { locale: "en-US" });
    expect(captured!.successUrl).toBe("https://thegreatinside.com/en-US/deep-inside/processing?session_id={CHECKOUT_SESSION_ID}");
    expect(captured!.cancelUrl).toBe("https://thegreatinside.com/en-US/results");
  });

  it("surfaces a Stripe API failure as a typed outcome, never throwing", async () => {
    const deps = baseDeps({
      createStripeCheckoutSession: async () => {
        throw new Error("Stripe API is down");
      },
    });
    const result = await createDeepInsideCheckoutSession(deps, { locale: "en-US" });
    expect(result).toEqual({ ok: false, reason: "stripe_error", detail: "Stripe API is down" });
  });

  it("surfaces a missing Checkout URL as a typed error", async () => {
    const deps = baseDeps({ createStripeCheckoutSession: async () => ({ url: null }) });
    const result = await createDeepInsideCheckoutSession(deps, { locale: "en-US" });
    expect(result).toEqual({ ok: false, reason: "stripe_error", detail: "Stripe returned no Checkout URL" });
  });
});
