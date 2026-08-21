import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { NOINDEX_NOFOLLOW } from "@lib/seo";
import { ProcessingClient } from "./ProcessingClient";

interface PageParams {
  locale: string;
}
interface PageSearchParams {
  session_id?: string;
  r?: string;
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = LAUNCH_LOCALES.includes(localeParam as Locale) ? (localeParam as Locale) : "en-US";
  return { title: t(locale, "deepinside.processing.title"), robots: NOINDEX_NOFOLLOW };
}

/**
 * STRIPE CHECKOUT RETURN TARGET — Monetization v1. Reached via Checkout's
 * `success_url`, which carries `?session_id=...` — that parameter is
 * NEVER treated as proof of anything (the whole point of this page): it is
 * only used, client-side, to know a purchase attempt just happened, not to
 * grant access. Access is unlocked exclusively once
 * `checkDeepInsideEntitlementAction` reports an active entitlement,
 * confirmed against the database the verified Stripe webhook already
 * populated (or will shortly). `ProcessingClient` owns the poll/retry UX.
 */
export default async function DeepInsideProcessingPage({
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

  return <ProcessingClient locale={locale} resultToken={r} />;
}
