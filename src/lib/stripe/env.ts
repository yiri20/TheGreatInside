/**
 * Stripe/monetization environment configuration — same "read the env var,
 * throw an actionable message rather than an opaque library error" pattern
 * as `@lib/supabase/env.ts`.
 *
 * `isMonetizationEnabled()` is the one fail-closed gate every monetization
 * entry point (checkout creation, the webhook route, the Deep Inside CTA)
 * checks FIRST: deliberately a plain server-only env var, not
 * `NEXT_PUBLIC_*` — every place that needs to know whether monetization is
 * live is a Server Component/Action/Route Handler, so there is no reason to
 * inline this into the client bundle, and keeping it server-only means a
 * client can never even observe why the feature is off. Missing Stripe
 * configuration must never grant premium access ("fail closed, not open");
 * this function is the single place that decision is made, so every caller
 * defers to it rather than separately checking its own subset of env vars.
 */
export function isMonetizationEnabled(): boolean {
  return (
    process.env.MONETIZATION_ENABLED === "true" &&
    Boolean(process.env.STRIPE_SECRET_KEY) &&
    Boolean(process.env.STRIPE_WEBHOOK_SECRET) &&
    Boolean(process.env.STRIPE_DEEP_INSIDE_PRICE_ID)
  );
}

export function stripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set — see .env.local");
  return key;
}

export function stripeWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not set — see .env.local");
  return secret;
}

export function stripeDeepInsidePriceId(): string {
  const id = process.env.STRIPE_DEEP_INSIDE_PRICE_ID;
  if (!id) throw new Error("STRIPE_DEEP_INSIDE_PRICE_ID is not set — see .env.local");
  return id;
}
