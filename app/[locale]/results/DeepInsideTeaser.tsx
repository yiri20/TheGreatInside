"use client";

/**
 * DEEP INSIDE TEASER — Monetization v1. Renders on `/results`, a restrained
 * upsell card (never a modal, never a countdown) showing price/value
 * bullets and one link into `/deep-inside`, which owns the actual
 * locked-preview-or-full-report experience and the Buy button itself —
 * this component never starts checkout directly, keeping that logic in
 * one place.
 *
 * Entitlement is resolved server-side via `checkDeepInsideEntitlementAction`
 * (never inferred from localStorage/URL state) so the CTA never shows "Buy"
 * to someone who already owns it. `deep_report_result_viewed` fires once on
 * mount (this teaser IS the surface a user "sees the result" through);
 * `deep_report_cta_clicked` fires on click, fire-and-forget, before
 * navigation — never blocking the link.
 */
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { Card, Cluster, Heading, Stack, Text } from "@ui/index";
import { checkDeepInsideEntitlementAction, logDeepInsideFunnelEventAction } from "../../actions/monetization.js";

type TeaserState = "unresolved" | "locked" | "unlocked";

const BULLET_KEYS = [
  "deepinside.teaser.bullet.matches_fit",
  "deepinside.teaser.bullet.circle",
  "deepinside.teaser.bullet.combination",
  "deepinside.teaser.bullet.counterpart",
  "deepinside.teaser.bullet.tradeoffs",
] as const;

export function DeepInsideTeaser({
  locale,
  resultToken,
  monetizationEnabled,
}: {
  locale: Locale;
  resultToken: string;
  /** Computed server-side (`isMonetizationEnabled()`) by the Results page
   *  and passed down — "fail closed, not open": a deployment with no/
   *  incomplete Stripe configuration renders no upsell at all, rather than
   *  a Buy button that would only fail once clicked. */
  monetizationEnabled: boolean;
}) {
  const [state, setState] = useState<TeaserState>("unresolved");
  const viewedLogged = useRef(false);

  useEffect(() => {
    if (!monetizationEnabled) return;
    let cancelled = false;

    if (!viewedLogged.current) {
      viewedLogged.current = true;
      void logDeepInsideFunnelEventAction({ eventType: "deep_report_result_viewed", locale, resultToken });
    }

    checkDeepInsideEntitlementAction()
      .then(({ entitled }) => {
        if (!cancelled) setState(entitled ? "unlocked" : "locked");
      })
      .catch(() => {
        if (!cancelled) setState("locked");
      });

    return () => {
      cancelled = true;
    };
  }, [locale, resultToken, monetizationEnabled]);

  function handleCtaClick() {
    void logDeepInsideFunnelEventAction({ eventType: "deep_report_cta_clicked", locale, resultToken });
  }

  if (!monetizationEnabled || state === "unresolved") return null;

  const href = `/${locale}/deep-inside?r=${encodeURIComponent(resultToken)}`;

  return (
    <Card variant="feature" className="tgi-measure-stack">
      <Stack gap={3}>
        <Cluster gap={3} between>
          <Heading level={2}>{t(locale, "deepinside.teaser.title")}</Heading>
          {state === "locked" ? <Text tone="secondary">{t(locale, "deepinside.teaser.price")}</Text> : null}
        </Cluster>
        {state === "locked" ? (
          <>
            <Text tone="muted">{t(locale, "deepinside.teaser.no_subscription")}</Text>
            <Text tone="secondary">{t(locale, "deepinside.teaser.body")}</Text>
            <Stack gap={1} as="ul">
              {BULLET_KEYS.map((key) => (
                <li key={key}>
                  <Text tone="secondary">{t(locale, key)}</Text>
                </li>
              ))}
            </Stack>
            <div>
              {/* A plain anchor, not the shared `Button` primitive: `Button`
                  deliberately ignores `onClick` whenever `href` is set
                  ("navigation is not an action") — this link genuinely
                  needs both, to fire the funnel event without blocking
                  navigation. Same visual classes `Button` itself renders. */}
              <a className="tgi-button tgi-button--primary" href={href} onClick={handleCtaClick}>
                {t(locale, "deepinside.teaser.cta")}
              </a>
            </div>
          </>
        ) : (
          <>
            <Text tone="secondary">{t(locale, "deepinside.teaser.cta.unlocked")}</Text>
            <div>
              <a className="tgi-button tgi-button--primary" href={href} onClick={handleCtaClick}>
                {t(locale, "deepinside.teaser.cta.view")}
              </a>
            </div>
          </>
        )}
      </Stack>
    </Card>
  );
}
