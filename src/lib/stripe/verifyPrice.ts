/**
 * Guard against "the UI shows $6.99 but Stripe is configured to charge
 * something else" — validates the CONFIGURED `STRIPE_DEEP_INSIDE_PRICE_ID`
 * actually resolves to a Stripe Price matching this project's own expected
 * amount/currency (`DEEP_INSIDE_PRICE`, `src/core/monetization/product.ts`)
 * before ever creating a Checkout Session. Checked against Stripe directly,
 * not merely assumed from the env var's name.
 *
 * Deliberately NOT `server-only`-guarded, unlike `client.ts`/`env.ts`: this
 * function takes an already-constructed `Stripe` client as a parameter
 * (dependency injection) rather than constructing its own, so it's already
 * safe and useful to unit-test directly with a mock client — the same
 * reasoning every other DI'd module in this project (`saveCompletedResult.ts`
 * etc.) follows. Only ever actually called from server code in practice
 * (`createCheckoutSessionServer.ts`).
 *
 * Cached for the life of the server process (a config mismatch would be a
 * deployment-time error, not something that changes request-to-request) —
 * same "module-level cache, not a security/correctness concern either way"
 * reasoning `siteUrl()`'s warn-once flag already uses in this codebase.
 */
import type Stripe from "stripe";
import { DEEP_INSIDE_PRICE } from "@core/monetization/product";

export type PriceVerification = { ok: true } | { ok: false; reason: string };

let cached: { priceId: string; result: PriceVerification } | undefined;

export async function verifyDeepInsidePrice(stripe: Stripe, priceId: string): Promise<PriceVerification> {
  if (cached && cached.priceId === priceId) return cached.result;

  let result: PriceVerification;
  try {
    const price = await stripe.prices.retrieve(priceId);
    if (price.unit_amount !== DEEP_INSIDE_PRICE.amountCents) {
      result = { ok: false, reason: `expected unit_amount ${DEEP_INSIDE_PRICE.amountCents}, got ${price.unit_amount}` };
    } else if (price.currency.toLowerCase() !== DEEP_INSIDE_PRICE.currency) {
      result = { ok: false, reason: `expected currency ${DEEP_INSIDE_PRICE.currency}, got ${price.currency}` };
    } else if (price.active === false) {
      result = { ok: false, reason: "configured Price is not active" };
    } else {
      result = { ok: true };
    }
  } catch (err) {
    result = { ok: false, reason: err instanceof Error ? err.message : "unknown Stripe error retrieving Price" };
  }

  cached = { priceId, result };
  return result;
}

/** Test-only escape hatch — the module-level cache above would otherwise
 *  leak between unrelated test cases exercising different price ids. */
export function resetVerifyDeepInsidePriceCacheForTests(): void {
  cached = undefined;
}
