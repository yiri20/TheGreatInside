import "server-only";

/**
 * Real wiring for `createDeepInsideCheckoutSession`: the cookie-bound
 * Supabase client (to resolve the signed-in user and check their own
 * entitlement), the real Stripe client, and `siteUrl()` — never a
 * client-supplied origin, so the Checkout return URLs always point at this
 * project's own canonical domain.
 *
 * `isMonetizationEnabled()` is checked FIRST, before anything else runs —
 * "missing Stripe configuration must never grant premium access, fail
 * closed not open" — so a misconfigured or deliberately-disabled
 * deployment returns a clean, typed outcome instead of throwing or (worse)
 * silently proceeding with an undefined price id.
 */
import { createClient } from "@lib/supabase/server";
import { siteUrl } from "@lib/env";
import { isMonetizationEnabled, stripeDeepInsidePriceId } from "@lib/stripe/env";
import { getStripeClient } from "@lib/stripe/client";
import { verifyDeepInsidePrice } from "@lib/stripe/verifyPrice";
import { hasActiveEntitlementServer } from "./entitlementsServer";
import {
  createDeepInsideCheckoutSession,
  DEEP_INSIDE_PRODUCT_KEY,
  type CreateCheckoutSessionDeps,
  type CreateCheckoutSessionInput,
  type CreateCheckoutSessionOutcome,
} from "./createCheckoutSession";

export async function createDeepInsideCheckoutSessionServer(
  input: CreateCheckoutSessionInput,
): Promise<CreateCheckoutSessionOutcome | { ok: false; reason: "monetization_disabled" }> {
  if (!isMonetizationEnabled()) return { ok: false, reason: "monetization_disabled" };

  const supabase = await createClient();
  const stripe = getStripeClient();
  const priceId = stripeDeepInsidePriceId();

  const deps: CreateCheckoutSessionDeps = {
    auth: { getUser: () => supabase.auth.getUser() },
    hasActiveEntitlement: (userId) => hasActiveEntitlementServer(userId, DEEP_INSIDE_PRODUCT_KEY),
    verifyPrice: (id) => verifyDeepInsidePrice(stripe, id),
    createStripeCheckoutSession: async (params) => {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{ price: params.priceId, quantity: 1 }],
        client_reference_id: params.userId,
        metadata: {
          userId: params.userId,
          productKey: DEEP_INSIDE_PRODUCT_KEY,
          resultToken: params.resultToken ?? "",
          locale: params.locale,
        },
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
      });
      return { url: session.url };
    },
    priceId,
    siteUrl: siteUrl(),
  };

  return createDeepInsideCheckoutSession(deps, input);
}
