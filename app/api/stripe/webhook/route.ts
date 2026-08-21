/**
 * STRIPE WEBHOOK ENDPOINT — Monetization v1.
 *
 * Verifies the signature using STRIPE_WEBHOOK_SECRET before anything else
 * runs — an unverified payload is NEVER processed, regardless of what it
 * claims. Uses `request.text()` for the raw body: Stripe's signature is
 * computed over the exact bytes it sent, and any JSON re-serialization
 * (parse then stringify) would break verification even for a genuine
 * event.
 *
 * `export const runtime = "nodejs"` — the Stripe SDK's webhook signature
 * verification uses Node's `crypto` module, not available in the Edge
 * runtime.
 */
import { NextResponse, type NextRequest } from "next/server";
import { isMonetizationEnabled, stripeWebhookSecret } from "@lib/stripe/env";
import { getStripeClient } from "@lib/stripe/client";
import { handleStripeWebhookEventServer } from "@lib/monetization/handleStripeWebhookEventServer";
import type { WebhookStripeEvent } from "@lib/monetization/handleStripeWebhookEvent";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isMonetizationEnabled()) {
    return NextResponse.json({ error: "monetization_disabled" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing stripe-signature header" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: WebhookStripeEvent;
  try {
    event = getStripeClient().webhooks.constructEvent(
      rawBody,
      signature,
      stripeWebhookSecret(),
    ) as unknown as WebhookStripeEvent;
  } catch (err) {
    console.error("[stripe webhook] signature verification failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  const outcome = await handleStripeWebhookEventServer(event);
  // Always 200 once the signature is verified and the handler ran without
  // throwing — Stripe retries on non-2xx, and every failure branch inside
  // handleStripeWebhookEvent is already a deliberate, logged no-op (bad
  // metadata, unknown product, etc.), not a transient error worth a retry.
  return NextResponse.json({ received: true, outcome });
}
