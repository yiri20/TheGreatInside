"use client";

/**
 * DEEP INSIDE CHECKOUT BUTTON — Monetization v1. The ONE place Checkout is
 * actually started from. Fires `deep_report_checkout_started` before
 * calling the server action (fire-and-forget — a funnel-logging failure
 * must never block a real purchase attempt), then redirects the whole page
 * to Stripe's own hosted Checkout URL. Every failure path (already
 * entitled, price misconfigured, Stripe error, monetization disabled) is
 * shown as plain, non-alarming text — never a silent failure, never a
 * client-side assumption that payment succeeded.
 */
import { useState } from "react";
import type { Locale } from "@core/types";
import { t, type MessageKey } from "@core/i18n/index";
import { Button, Text } from "@ui/index";
import { startDeepInsideCheckoutAction, logDeepInsideFunnelEventAction } from "../../actions/monetization.js";

function errorKeyFor(reason: string): MessageKey {
  switch (reason) {
    case "already_entitled":
      return "deepinside.error.already_entitled";
    case "monetization_disabled":
      return "deepinside.error.monetization_disabled";
    default:
      return "deepinside.error.generic";
  }
}

export function DeepInsideCheckoutButton({
  locale,
  resultToken,
  label,
}: {
  locale: Locale;
  resultToken: string | undefined;
  label: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [errorKey, setErrorKey] = useState<MessageKey | undefined>();

  async function handleClick() {
    setState("loading");
    setErrorKey(undefined);
    void logDeepInsideFunnelEventAction({
      eventType: "deep_report_checkout_started",
      locale,
      ...(resultToken !== undefined ? { resultToken } : {}),
    });

    const result = await startDeepInsideCheckoutAction({ locale, ...(resultToken !== undefined ? { resultToken } : {}) });
    if (result.ok) {
      window.location.href = result.url;
      return;
    }
    setState("error");
    setErrorKey(errorKeyFor(result.reason));
  }

  return (
    <>
      <Button onClick={handleClick} disabled={state === "loading"}>
        {label}
      </Button>
      {errorKey ? (
        <div role="alert">
          <Text tone="secondary">{t(locale, errorKey)}</Text>
        </div>
      ) : null}
    </>
  );
}
