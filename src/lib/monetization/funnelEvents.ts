/**
 * DEEP INSIDE FUNNEL EVENTS — Monetization v1.
 *
 * Reuses `analytics_events` (in `db/schema.sql` since the original Stage
 * 9A provisioning run, previously unused by any code path) rather than a
 * new table. Answers exactly one question: "of users who see the result,
 * how many click, start checkout, and purchase?" — not a general
 * analytics platform.
 *
 * `deep_report_purchase_completed` is DELIBERATELY ABSENT from
 * `CLIENT_LOGGABLE_EVENT_TYPES` — it is written ONLY from the verified
 * webhook path (`handleStripeWebhookEventServer.ts`), never from this
 * client-facing function, so "purchase completion cannot be forged
 * client-side" holds at the application layer too, not just via the DB's
 * own RLS policy (db/migrations/0005_monetization_v1.sql).
 */
export const CLIENT_LOGGABLE_EVENT_TYPES = [
  "deep_report_result_viewed",
  "deep_report_cta_clicked",
  "deep_report_checkout_started",
] as const;

export type ClientLoggableEventType = (typeof CLIENT_LOGGABLE_EVENT_TYPES)[number];

export interface LogFunnelEventDeps {
  insertEvent(row: { name: string; userId: string | undefined; locale: string; resultToken: string | undefined }): Promise<{ ok: boolean }>;
}

export type LogFunnelEventOutcome = { ok: true } | { ok: false; reason: "unknown_event_type" | "db_error" };

export async function logFunnelEvent(
  deps: LogFunnelEventDeps,
  input: { eventType: string; userId: string | undefined; locale: string; resultToken: string | undefined },
): Promise<LogFunnelEventOutcome> {
  if (!(CLIENT_LOGGABLE_EVENT_TYPES as readonly string[]).includes(input.eventType)) {
    return { ok: false, reason: "unknown_event_type" };
  }
  const result = await deps.insertEvent({
    name: input.eventType,
    userId: input.userId,
    locale: input.locale,
    resultToken: input.resultToken,
  });
  return result.ok ? { ok: true } : { ok: false, reason: "db_error" };
}
