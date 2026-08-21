import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isMonetizationEnabled, stripeDeepInsidePriceId, stripeSecretKey, stripeWebhookSecret } from "./env";

describe("isMonetizationEnabled", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is true only when the flag AND all three Stripe env vars are set", () => {
    vi.stubEnv("MONETIZATION_ENABLED", "true");
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_123");
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_123");
    vi.stubEnv("STRIPE_DEEP_INSIDE_PRICE_ID", "price_123");
    expect(isMonetizationEnabled()).toBe(true);
  });

  it("fails closed when the flag is unset, even with all Stripe env vars present", () => {
    vi.stubEnv("MONETIZATION_ENABLED", "");
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_123");
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_123");
    vi.stubEnv("STRIPE_DEEP_INSIDE_PRICE_ID", "price_123");
    expect(isMonetizationEnabled()).toBe(false);
  });

  it("fails closed when the flag is true but STRIPE_SECRET_KEY is missing", () => {
    vi.stubEnv("MONETIZATION_ENABLED", "true");
    vi.stubEnv("STRIPE_SECRET_KEY", "");
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_123");
    vi.stubEnv("STRIPE_DEEP_INSIDE_PRICE_ID", "price_123");
    expect(isMonetizationEnabled()).toBe(false);
  });

  it("fails closed when the flag is true but STRIPE_WEBHOOK_SECRET is missing", () => {
    vi.stubEnv("MONETIZATION_ENABLED", "true");
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_123");
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "");
    vi.stubEnv("STRIPE_DEEP_INSIDE_PRICE_ID", "price_123");
    expect(isMonetizationEnabled()).toBe(false);
  });

  it("fails closed when the flag is true but STRIPE_DEEP_INSIDE_PRICE_ID is missing", () => {
    vi.stubEnv("MONETIZATION_ENABLED", "true");
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_123");
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_123");
    vi.stubEnv("STRIPE_DEEP_INSIDE_PRICE_ID", "");
    expect(isMonetizationEnabled()).toBe(false);
  });

  it("fails closed when the flag is a non-'true' truthy-looking string", () => {
    vi.stubEnv("MONETIZATION_ENABLED", "1");
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_123");
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_123");
    vi.stubEnv("STRIPE_DEEP_INSIDE_PRICE_ID", "price_123");
    expect(isMonetizationEnabled()).toBe(false);
  });
});

describe("Stripe env accessors", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("throws an actionable error when STRIPE_SECRET_KEY is missing", () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "");
    expect(() => stripeSecretKey()).toThrow(/STRIPE_SECRET_KEY/);
  });

  it("throws an actionable error when STRIPE_WEBHOOK_SECRET is missing", () => {
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", "");
    expect(() => stripeWebhookSecret()).toThrow(/STRIPE_WEBHOOK_SECRET/);
  });

  it("throws an actionable error when STRIPE_DEEP_INSIDE_PRICE_ID is missing", () => {
    vi.stubEnv("STRIPE_DEEP_INSIDE_PRICE_ID", "");
    expect(() => stripeDeepInsidePriceId()).toThrow(/STRIPE_DEEP_INSIDE_PRICE_ID/);
  });

  it("returns the configured value when set", () => {
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_abc");
    expect(stripeSecretKey()).toBe("sk_test_abc");
  });
});
