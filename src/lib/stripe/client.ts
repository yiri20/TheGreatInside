import "server-only";

/**
 * Shared Stripe SDK client — module-level singleton is safe here (unlike
 * the Supabase server client) since the Stripe client carries no
 * per-request state (no cookies, no session); it's a plain HTTP wrapper
 * keyed by one static secret key for this deployment's whole lifetime.
 */
import Stripe from "stripe";
import { stripeSecretKey } from "./env";

let _stripe: Stripe | undefined;

export function getStripeClient(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(stripeSecretKey(), {
      // Pinned to the exact version this installed SDK release (22.5.0)
      // ships as its own `ApiVersion` constant — matching, not guessing.
      apiVersion: "2026-07-29.dahlia",
    });
  }
  return _stripe;
}
