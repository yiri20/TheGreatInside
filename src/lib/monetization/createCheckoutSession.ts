/**
 * DEEP INSIDE CHECKOUT SESSION CREATION — Monetization v1.
 *
 * Dependency-injected core logic, same pattern as `saveCompletedResult.ts`:
 * no `next/headers`/`server-only`/direct Stripe SDK import here, so every
 * branch is unit-testable with plain mocks. The real wiring (auth cookies,
 * the real Stripe client, the real price-verification call) lives in
 * `createCheckoutSessionServer.ts`.
 *
 * The client may only ever request "start a Deep Inside checkout" plus an
 * optional result token for return-context — it can never choose a price,
 * an amount, or a Stripe Price ID. Every one of those is decided here,
 * server-side, from `deps.priceId` (which itself only ever comes from the
 * `STRIPE_DEEP_INSIDE_PRICE_ID` env var — see `createCheckoutSessionServer.ts`).
 */
import type { Locale } from "@core/types";
import { DEEP_INSIDE_PRODUCT_KEY } from "@core/monetization/product";

export interface CreateCheckoutSessionInput {
  locale: Locale;
  /** The result the user was viewing when they started checkout, if any —
   *  threaded through so the post-purchase redirect can return them to the
   *  exact report they were looking at. Optional: purchasing is still
   *  meaningful even with no specific result in view. */
  resultToken?: string;
}

export type CreateCheckoutSessionOutcome =
  | { ok: true; url: string }
  | { ok: false; reason: "unauthenticated" }
  | { ok: false; reason: "already_entitled" }
  | { ok: false; reason: "price_misconfigured"; detail: string }
  | { ok: false; reason: "stripe_error"; detail?: string };

export interface CreateCheckoutSessionDeps {
  auth: {
    getUser(): Promise<{ data: { user: { id: string } | null }; error: unknown }>;
  };
  hasActiveEntitlement(userId: string): Promise<boolean>;
  verifyPrice(priceId: string): Promise<{ ok: true } | { ok: false; reason: string }>;
  createStripeCheckoutSession(params: {
    priceId: string;
    userId: string;
    resultToken: string | undefined;
    locale: Locale;
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ url: string | null }>;
  priceId: string;
  siteUrl: string;
}

function buildSuccessUrl(siteUrl: string, locale: Locale, resultToken: string | undefined): string {
  const base = `${siteUrl}/${locale}/deep-inside/processing?session_id={CHECKOUT_SESSION_ID}`;
  return resultToken ? `${base}&r=${encodeURIComponent(resultToken)}` : base;
}

function buildCancelUrl(siteUrl: string, locale: Locale, resultToken: string | undefined): string {
  const base = `${siteUrl}/${locale}/results`;
  return resultToken ? `${base}?r=${encodeURIComponent(resultToken)}` : base;
}

export async function createDeepInsideCheckoutSession(
  deps: CreateCheckoutSessionDeps,
  input: CreateCheckoutSessionInput,
): Promise<CreateCheckoutSessionOutcome> {
  const { data, error } = await deps.auth.getUser();
  const userId = data.user?.id;
  if (error || !userId) return { ok: false, reason: "unauthenticated" };

  if (await deps.hasActiveEntitlement(userId)) {
    return { ok: false, reason: "already_entitled" };
  }

  const priceCheck = await deps.verifyPrice(deps.priceId);
  if (!priceCheck.ok) return { ok: false, reason: "price_misconfigured", detail: priceCheck.reason };

  try {
    const session = await deps.createStripeCheckoutSession({
      priceId: deps.priceId,
      userId,
      resultToken: input.resultToken,
      locale: input.locale,
      successUrl: buildSuccessUrl(deps.siteUrl, input.locale, input.resultToken),
      cancelUrl: buildCancelUrl(deps.siteUrl, input.locale, input.resultToken),
    });
    if (!session.url) return { ok: false, reason: "stripe_error", detail: "Stripe returned no Checkout URL" };
    return { ok: true, url: session.url };
  } catch (err) {
    return { ok: false, reason: "stripe_error", detail: err instanceof Error ? err.message : "unknown Stripe error" };
  }
}

export { DEEP_INSIDE_PRODUCT_KEY };
