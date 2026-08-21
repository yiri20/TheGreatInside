import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { DEEP_INSIDE_PRODUCT_KEY, DEEP_INSIDE_PRICE } from "@core/monetization/product";
import { NOINDEX_NOFOLLOW } from "@lib/seo";
import { isMonetizationEnabled } from "@lib/stripe/env";
import { createClient } from "@lib/supabase/server";
import { hasActiveEntitlementServer } from "@lib/monetization/entitlementsServer";
import { getOrCreateDeepInsideReportServer } from "@lib/monetization/getOrCreateDeepInsideReportServer";
import { Button, Card, Eyebrow, Heading, Stack, Text } from "@ui/index";
import { DeepInsideReportView } from "@ui/deepInside/DeepInsideReportView";
import { GoogleSignInCta } from "../account/GoogleSignInCta";
import { DeepInsideCheckoutButton } from "./DeepInsideCheckoutButton";

interface PageParams {
  locale: string;
}
interface PageSearchParams {
  r?: string;
}

/**
 * DEEP INSIDE — Monetization v1's report page. Owns all three states
 * (sign-in required / locked preview / full report) so the Results-page
 * teaser (`DeepInsideTeaser.tsx`) can stay a thin link into here, never
 * duplicating this logic.
 *
 * SERVER-AUTHORITATIVE GATING: this is a Server Component, and the locked
 * branch below never even constructs, fetches, or imports the actual
 * report data — `getOrCreateDeepInsideReportServer` is only ever called
 * once entitlement is already confirmed. A locked visitor's HTML/RSC
 * payload genuinely never contains the premium payload; this is not CSS
 * hiding data that's already present.
 */
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = LAUNCH_LOCALES.includes(localeParam as Locale) ? (localeParam as Locale) : "en-US";
  return {
    title: t(locale, "deepinside.meta.title"),
    description: t(locale, "deepinside.meta.description"),
    robots: NOINDEX_NOFOLLOW,
  };
}

const SECTION_KEYS = [
  "deepinside.section.why_matches_fit",
  "deepinside.section.historical_circle",
  "deepinside.section.signature_combination",
  "deepinside.section.counterpart",
  "deepinside.section.strengths_tradeoffs",
] as const;

export default async function DeepInsidePage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<PageSearchParams>;
}) {
  const { locale: localeParam } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const { r } = await searchParams;

  if (!isMonetizationEnabled()) {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "deepinside.teaser.title")}</Eyebrow>
          <Heading level={1}>{t(locale, "deepinside.error.monetization_disabled")}</Heading>
          <div>
            <Button href={`/${locale}/results${r ? `?r=${encodeURIComponent(r)}` : ""}`}>
              {t(locale, "deepinside.error.back_to_results")}
            </Button>
          </div>
        </Stack>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const returnPath = `/${locale}/deep-inside${r ? `?r=${encodeURIComponent(r)}` : ""}`;

  if (!user) {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "deepinside.teaser.title")}</Eyebrow>
          <Heading level={1}>{t(locale, "deepinside.signin_required.title")}</Heading>
          <Text tone="secondary">{t(locale, "deepinside.signin_required.body")}</Text>
          <div>
            <GoogleSignInCta locale={locale} returnPath={returnPath} />
          </div>
        </Stack>
      </main>
    );
  }

  const entitled = await hasActiveEntitlementServer(user.id, DEEP_INSIDE_PRODUCT_KEY);

  if (!entitled) {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "deepinside.teaser.title")}</Eyebrow>
          <Heading level={1}>{t(locale, "deepinside.locked.title")}</Heading>
          <Text tone="secondary">{t(locale, "deepinside.locked.body")}</Text>
          <Card variant="sunken">
            <Stack gap={2}>
              <Text tone="muted">{t(locale, "deepinside.locked.preview.title")}</Text>
              <Stack gap={1} as="ul">
                {SECTION_KEYS.map((key) => (
                  <li key={key}>
                    <Text tone="secondary">{t(locale, key)}</Text>
                  </li>
                ))}
              </Stack>
            </Stack>
          </Card>
          <Text tone="muted">{`${DEEP_INSIDE_PRICE.displayPrice} · ${t(locale, "deepinside.teaser.no_subscription")}`}</Text>
          <div>
            <DeepInsideCheckoutButton locale={locale} resultToken={r} label={t(locale, "deepinside.locked.cta")} />
          </div>
        </Stack>
      </main>
    );
  }

  if (!r) {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "deepinside.teaser.title")}</Eyebrow>
          <Heading level={1}>{t(locale, "results.invalid.title")}</Heading>
          <Text tone="secondary">{t(locale, "results.invalid.body")}</Text>
          <div>
            <Button href={`/${locale}/quiz`}>{t(locale, "results.invalid.cta")}</Button>
          </div>
        </Stack>
      </main>
    );
  }

  const outcome = await getOrCreateDeepInsideReportServer(user.id, decodeURIComponent(r));

  if (!outcome.ok) {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "deepinside.teaser.title")}</Eyebrow>
          <Heading level={1}>{t(locale, "results.invalid.title")}</Heading>
          <Text tone="secondary">{t(locale, "results.invalid.body")}</Text>
          <div>
            <Button href={`/${locale}/results?r=${encodeURIComponent(r)}`}>{t(locale, "results.cta.retake")}</Button>
          </div>
        </Stack>
      </main>
    );
  }

  return (
    <main className="tgi-container" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
      <Stack gap={5}>
        <Stack gap={2} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Heading level={1}>{t(locale, "deepinside.teaser.title")}</Heading>
        </Stack>
        <DeepInsideReportView report={outcome.report} locale={locale} />
      </Stack>
    </main>
  );
}
