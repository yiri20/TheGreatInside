/**
 * DEEP INSIDE — product definition (Monetization v1).
 *
 * The ONE paid product this project sells: a one-time, lifetime, account-
 * level entitlement unlocking a deeper, still fully deterministic
 * (no generative AI) expansion of a user's own quiz result. Pure constants
 * only — no I/O, no environment reads (the actual Stripe Price ID lives in
 * an env var, read by `src/lib/stripe/env.ts`, since that's a deployment
 * concern, not a product fact) — so every price/copy reference in the app
 * reads from here rather than a scattered `$6.99`/`699` literal.
 */

/** Stable internal identifier — also the `entitlement_key` stored in
 *  `user_entitlements` and the `product_key` stored in `purchases`. Never
 *  renamed once shipped: it is the join key between Stripe metadata, the
 *  DB, and this file, forever. */
export const DEEP_INSIDE_PRODUCT_KEY = "deep_inside_lifetime_v1";

export const DEEP_INSIDE_PRICE = {
  currency: "usd",
  /** Stripe's own unit — smallest currency unit (cents for USD). */
  amountCents: 699,
  /** Precomputed display string, so no call site formats cents itself. */
  displayPrice: "US$6.99",
} as const;

/** The one entitlement this project currently grants. A future second
 *  product would add its own key here, never reuse this one. */
export const DEEP_INSIDE_ENTITLEMENT_KEY = DEEP_INSIDE_PRODUCT_KEY;
