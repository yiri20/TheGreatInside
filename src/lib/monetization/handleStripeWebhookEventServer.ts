import "server-only";

/**
 * Real Supabase wiring for `handleStripeWebhookEvent` — uses the
 * secret-key admin client exclusively (see `@lib/supabase/admin.ts`):
 * `purchases`/`user_entitlements` have no client-writable RLS policy at
 * all, and a webhook request carries no user session to act as anyway.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@lib/supabase/admin";
import {
  handleStripeWebhookEvent,
  type HandleWebhookDeps,
  type UpsertPurchaseResult,
  type WebhookOutcome,
  type WebhookStripeEvent,
} from "./handleStripeWebhookEvent";

/** Postgres unique_violation. */
const UNIQUE_VIOLATION = "23505";

async function upsertPurchase(
  supabase: SupabaseClient,
  row: {
    userId: string;
    stripeCheckoutSessionId: string;
    stripePaymentIntentId: string | undefined;
    productKey: string;
    amount: number;
    currency: string;
  },
): Promise<UpsertPurchaseResult> {
  const insert = await supabase
    .from("purchases")
    .insert({
      user_id: row.userId,
      stripe_checkout_session_id: row.stripeCheckoutSessionId,
      stripe_payment_intent_id: row.stripePaymentIntentId ?? null,
      product_key: row.productKey,
      amount: row.amount,
      currency: row.currency,
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (!insert.error) return { ok: true, purchaseId: insert.data.id as string, wasNew: true };

  if (insert.error.code === UNIQUE_VIOLATION) {
    const existing = await supabase
      .from("purchases")
      .select("id")
      .eq("stripe_checkout_session_id", row.stripeCheckoutSessionId)
      .maybeSingle();
    if (existing.error || !existing.data) {
      return { ok: false, error: existing.error?.message ?? "purchase row not found after conflict" };
    }
    return { ok: true, purchaseId: existing.data.id as string, wasNew: false };
  }

  console.error("[deep-inside webhook] purchase upsert failed:", {
    code: insert.error.code,
    message: insert.error.message,
  });
  return { ok: false, error: insert.error.message };
}

async function grantEntitlement(
  supabase: SupabaseClient,
  userId: string,
  entitlementKey: string,
  purchaseId: string,
): Promise<{ ok: boolean }> {
  // Idempotent: safe under webhook retry, and self-heals a prior partial
  // failure between the purchase insert and this grant. Reactivating on
  // conflict is intentional — a later legitimate purchase (or a refund
  // reversal) must be able to bring a previously-revoked row back to
  // active.
  const { error } = await supabase.from("user_entitlements").upsert(
    {
      user_id: userId,
      entitlement_key: entitlementKey,
      status: "active",
      revoked_at: null,
      source: "stripe_checkout",
      purchase_id: purchaseId,
      granted_at: new Date().toISOString(),
    },
    { onConflict: "user_id,entitlement_key" },
  );
  if (error) {
    console.error("[deep-inside webhook] entitlement grant failed:", { code: error.code, message: error.message });
    return { ok: false };
  }
  return { ok: true };
}

async function recordPurchaseCompletedEvent(
  supabase: SupabaseClient,
  props: { userId: string; resultToken: string | undefined },
): Promise<void> {
  // Uses the admin client — this is the one event type client code is
  // never allowed to write (see the RLS policy in
  // db/migrations/0005_monetization_v1.sql); only this verified-webhook
  // path may record it.
  const { error } = await supabase.from("analytics_events").insert({
    name: "deep_report_purchase_completed",
    properties: { userId: props.userId, resultToken: props.resultToken ?? null },
  });
  if (error) {
    console.error("[deep-inside webhook] failed to record purchase_completed event:", error.message);
  }
}

async function markPurchaseRefundedByPaymentIntent(
  supabase: SupabaseClient,
  paymentIntentId: string,
): Promise<{ ok: true; purchaseId: string; userId: string } | { ok: false }> {
  const { data, error } = await supabase
    .from("purchases")
    .update({ status: "refunded", refunded_at: new Date().toISOString() })
    .eq("stripe_payment_intent_id", paymentIntentId)
    .select("id, user_id")
    .maybeSingle();
  if (error || !data) return { ok: false };
  return { ok: true, purchaseId: data.id as string, userId: data.user_id as string };
}

async function revokeEntitlementForPurchase(
  supabase: SupabaseClient,
  userId: string,
  entitlementKey: string,
  purchaseId: string,
): Promise<void> {
  // Only revoke if THIS purchase is the one that granted the entitlement
  // currently on record — never revoke an entitlement a later, different
  // purchase re-granted.
  const { error } = await supabase
    .from("user_entitlements")
    .update({ status: "revoked", revoked_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("entitlement_key", entitlementKey)
    .eq("purchase_id", purchaseId);
  if (error) {
    console.error("[deep-inside webhook] entitlement revocation failed:", error.message);
  }
}

export async function handleStripeWebhookEventServer(event: WebhookStripeEvent): Promise<WebhookOutcome> {
  const supabase = createAdminClient();
  const deps: HandleWebhookDeps = {
    upsertPurchase: (row) => upsertPurchase(supabase, row),
    grantEntitlement: (userId, entitlementKey, purchaseId) => grantEntitlement(supabase, userId, entitlementKey, purchaseId),
    recordPurchaseCompletedEvent: (props) => recordPurchaseCompletedEvent(supabase, props),
    markPurchaseRefundedByPaymentIntent: (paymentIntentId) => markPurchaseRefundedByPaymentIntent(supabase, paymentIntentId),
    revokeEntitlementForPurchase: (userId, entitlementKey, purchaseId) =>
      revokeEntitlementForPurchase(supabase, userId, entitlementKey, purchaseId),
  };
  return handleStripeWebhookEvent(deps, event);
}
