import { beforeEach, describe, expect, it } from "vitest";
import type Stripe from "stripe";
import { verifyDeepInsidePrice, resetVerifyDeepInsidePriceCacheForTests } from "./verifyPrice";

function mockStripe(price: Partial<Stripe.Price>): Stripe {
  return {
    prices: {
      retrieve: async () => price as Stripe.Price,
    },
  } as unknown as Stripe;
}

describe("verifyDeepInsidePrice", () => {
  beforeEach(() => {
    resetVerifyDeepInsidePriceCacheForTests();
  });

  it("passes when the Price matches the expected amount/currency exactly", async () => {
    const stripe = mockStripe({ unit_amount: 699, currency: "usd", active: true });
    const result = await verifyDeepInsidePrice(stripe, "price_ok");
    expect(result).toEqual({ ok: true });
  });

  it("is case-insensitive on currency", async () => {
    const stripe = mockStripe({ unit_amount: 699, currency: "USD", active: true });
    const result = await verifyDeepInsidePrice(stripe, "price_ok");
    expect(result).toEqual({ ok: true });
  });

  it("fails when the amount does not match ($6.99 expected, something else configured)", async () => {
    const stripe = mockStripe({ unit_amount: 999, currency: "usd", active: true });
    const result = await verifyDeepInsidePrice(stripe, "price_wrong_amount");
    expect(result.ok).toBe(false);
  });

  it("fails when the currency does not match", async () => {
    const stripe = mockStripe({ unit_amount: 699, currency: "eur", active: true });
    const result = await verifyDeepInsidePrice(stripe, "price_wrong_currency");
    expect(result.ok).toBe(false);
  });

  it("fails when the configured Price is inactive", async () => {
    const stripe = mockStripe({ unit_amount: 699, currency: "usd", active: false });
    const result = await verifyDeepInsidePrice(stripe, "price_inactive");
    expect(result.ok).toBe(false);
  });

  it("fails, not throws, when the Stripe API call itself errors", async () => {
    const stripe = {
      prices: {
        retrieve: async () => {
          throw new Error("Stripe API unreachable");
        },
      },
    } as unknown as Stripe;
    const result = await verifyDeepInsidePrice(stripe, "price_boom");
    expect(result.ok).toBe(false);
  });

  it("caches a result per priceId — a second call with the same id does not hit Stripe again", async () => {
    let calls = 0;
    const stripe = {
      prices: {
        retrieve: async () => {
          calls++;
          return { unit_amount: 699, currency: "usd", active: true } as Stripe.Price;
        },
      },
    } as unknown as Stripe;
    await verifyDeepInsidePrice(stripe, "price_cached");
    await verifyDeepInsidePrice(stripe, "price_cached");
    expect(calls).toBe(1);
  });
});
