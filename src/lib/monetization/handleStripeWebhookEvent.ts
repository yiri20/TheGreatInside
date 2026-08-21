/**
 * STRIPE WEBHOOK — verified-event handling (Monetization v1).
 *
 * Dependency-injected, same reason as everywhere else in this module: the
 * signature-verification step itself (which genuinely needs the raw
 * request body and the Stripe SDK) lives in the Route Handler
 * (`app/api/stripe/webhook/route.ts`); everything AFTER "this event is
 * authentically from Stripe" is pure decision logic over already-verified
 * data, fully unit-testable here with plain mocks.
 *
 * Idempotency: `upsertPurchase` reports whether it inserted a genuinely
 * NEW row (Postgres unique-violation on `stripe_checkout_session_id` means
 * "already processed", per db/migrations/0005_monetization_v1.sql's
 * unique index). Entitlement granting is a separate, ALWAYS-safe-to-repeat
 * upsert (`ON CONFLICT (user_id, entitlement_key) DO UPDATE`) run
 * regardless of whether the purchase row was new — this makes the whole
 * handler self-healing: even if a previous delivery inserted the purchase
 * row but crashed before granting the entitlement, the next retry still
 * completes the grant. Only the analytics event is skipped on a repeat
 * delivery, to avoid double-counting the funnel.
 */
import { DEEP_INSIDE_PRODUCT_KEY } from "@core/monetization/product";

export interface WebhookCheckoutSession {
  id: string;
  client_reference_id: string | null;
  payment_status: string;
  payment_intent: string | null;
  amount_total: number | null;
  currency: string | null;
  metadata: Record<string, string> | null;
}

export interface WebhookRefundedCharge {
  payment_intent: string | null;
}

export type WebhookStripeEvent =
  | { type: "checkout.session.completed" | "checkout.session.async_payment_succeeded"; data: { object: WebhookCheckoutSession } }
  | { type: "charge.refunded"; data: { object: WebhookRefundedCharge } }
  | { type: string; data: { object: unknown } };

export type UpsertPurchaseResult =
  | { ok: true; purchaseId: string; wasNew: boolean }
  | { ok: false; error: string };

export interface HandleWebhookDeps {
  upsertPurchase(row: {
    userId: string;
    stripeCheckoutSessionId: string;
    stripePaymentIntentId: string | undefined;
    productKey: string;
    amount: number;
    currency: string;
  }): Promise<UpsertPurchaseResult>;
  grantEntitlement(userId: string, entitlementKey: string, purchaseId: string): Promise<{ ok: boolean }>;
  recordPurchaseCompletedEvent(props: { userId: string; resultToken: string | undefined }): Promise<void>;
  markPurchaseRefundedByPaymentIntent(paymentIntentId: string): Promise<{ ok: true; purchaseId: string; userId: string } | { ok: false }>;
  revokeEntitlementForPurchase(userId: string, entitlementKey: string, purchaseId: string): Promise<void>;
}

export type WebhookOutcome =
  | { ok: true; action: "granted" | "already_processed" | "ignored" | "refunded" }
  | { ok: false; reason: string };

async function handleCheckoutCompleted(deps: HandleWebhookDeps, session: WebhookCheckoutSession): Promise<WebhookOutcome> {
  const metadata = session.metadata ?? {};
  const userId = metadata.userId;
  const productKey = metadata.productKey;

  if (!userId || productKey !== DEEP_INSIDE_PRODUCT_KEY) {
    return { ok: false, reason: "malformed_metadata" };
  }
  // Defense in depth: metadata is set by OUR OWN checkout-creation code, so
  // this should always agree — a mismatch means something is genuinely
  // wrong (a tampered or reused session object) and must not proceed.
  if (session.client_reference_id && session.client_reference_id !== userId) {
    return { ok: false, reason: "metadata_mismatch" };
  }
  if (session.payment_status !== "paid") {
    return { ok: false, reason: "not_paid" };
  }

  const purchase = await deps.upsertPurchase({
    userId,
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId: session.payment_intent ?? undefined,
    productKey,
    amount: session.amount_total ?? 0,
    currency: (session.currency ?? "").toLowerCase(),
  });
  if (!purchase.ok) return { ok: false, reason: "db_error" };

  const grant = await deps.grantEntitlement(userId, DEEP_INSIDE_PRODUCT_KEY, purchase.purchaseId);
  if (!grant.ok) return { ok: false, reason: "db_error" };

  if (purchase.wasNew) {
    await deps.recordPurchaseCompletedEvent({ userId, resultToken: metadata.resultToken || undefined });
    return { ok: true, action: "granted" };
  }
  return { ok: true, action: "already_processed" };
}

async function handleChargeRefunded(deps: HandleWebhookDeps, charge: WebhookRefundedCharge): Promise<WebhookOutcome> {
  if (!charge.payment_intent) return { ok: true, action: "ignored" };
  const found = await deps.markPurchaseRefundedByPaymentIntent(charge.payment_intent);
  if (!found.ok) return { ok: true, action: "ignored" };
  await deps.revokeEntitlementForPurchase(found.userId, DEEP_INSIDE_PRODUCT_KEY, found.purchaseId);
  return { ok: true, action: "refunded" };
}

export async function handleStripeWebhookEvent(deps: HandleWebhookDeps, event: WebhookStripeEvent): Promise<WebhookOutcome> {
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      return handleCheckoutCompleted(deps, event.data.object as WebhookCheckoutSession);
    case "charge.refunded":
      return handleChargeRefunded(deps, event.data.object as WebhookRefundedCharge);
    default:
      return { ok: true, action: "ignored" };
  }
}
