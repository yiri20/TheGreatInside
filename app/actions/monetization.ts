"use server";

/**
 * Monetization v1 Server Actions — thin pass-throughs to the already-built,
 * already-tested `src/lib/monetization/*Server.ts` wrappers, matching this
 * project's existing `app/actions/results.ts` convention (no logic lives
 * here).
 */
import type { Locale } from "@core/types";
import { createClient } from "@lib/supabase/server";
import { createDeepInsideCheckoutSessionServer } from "@lib/monetization/createCheckoutSessionServer";
import type { CreateCheckoutSessionOutcome } from "@lib/monetization/createCheckoutSession";
import { logFunnelEventServer } from "@lib/monetization/funnelEventsServer";
import type { LogFunnelEventOutcome } from "@lib/monetization/funnelEvents";
import { hasActiveEntitlementServer } from "@lib/monetization/entitlementsServer";
import { DEEP_INSIDE_PRODUCT_KEY } from "@core/monetization/product";

export async function startDeepInsideCheckoutAction(input: {
  locale: Locale;
  resultToken?: string;
}): Promise<CreateCheckoutSessionOutcome | { ok: false; reason: "monetization_disabled" }> {
  return createDeepInsideCheckoutSessionServer(input);
}

export async function logDeepInsideFunnelEventAction(input: {
  eventType: string;
  locale: string;
  resultToken?: string;
}): Promise<LogFunnelEventOutcome> {
  return logFunnelEventServer({ eventType: input.eventType, locale: input.locale, resultToken: input.resultToken });
}

/** Used by the results-page CTA to decide whether to show "Buy Deep
 *  Inside" or "Deep Inside unlocked" — resolves the signed-in user
 *  server-side, never trusting a client-supplied user id. Returns `false`
 *  for a signed-out visitor without error (there is nothing to check yet). */
export async function checkDeepInsideEntitlementAction(): Promise<{ signedIn: boolean; entitled: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { signedIn: false, entitled: false };
  const entitled = await hasActiveEntitlementServer(user.id, DEEP_INSIDE_PRODUCT_KEY);
  return { signedIn: true, entitled };
}
