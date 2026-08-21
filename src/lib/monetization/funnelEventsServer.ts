import "server-only";

/**
 * Real wiring for `logFunnelEvent` — uses the ORDINARY cookie-bound client
 * (never the admin client): the RLS policy on `analytics_events`
 * (`analytics_events_insert_allowlisted`) already restricts inserts to the
 * three client-loggable event names, and a signed-out visitor must still
 * be able to log `deep_report_result_viewed`/`deep_report_cta_clicked`, so
 * this deliberately does not require authentication.
 */
import { createClient } from "@lib/supabase/server";
import { logFunnelEvent, type LogFunnelEventOutcome } from "./funnelEvents";

export async function logFunnelEventServer(input: {
  eventType: string;
  locale: string;
  resultToken: string | undefined;
}): Promise<LogFunnelEventOutcome> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return logFunnelEvent(
    {
      async insertEvent(row) {
        const { error } = await supabase.from("analytics_events").insert({
          name: row.name,
          locale: row.locale,
          properties: { userId: row.userId ?? null, resultToken: row.resultToken ?? null },
        });
        if (error) {
          console.error("[deep-inside] failed to log funnel event:", { code: error.code, message: error.message });
          return { ok: false };
        }
        return { ok: true };
      },
    },
    { eventType: input.eventType, userId: user?.id, locale: input.locale, resultToken: input.resultToken },
  );
}
