import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { PRIVACY_POLICY } from "@core/i18n/legal";
import { localizedAlternates } from "@lib/seo";
import { LegalDocumentView } from "../LegalDocumentView";

interface PageParams {
  locale: string;
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = LAUNCH_LOCALES.includes(localeParam as Locale) ? (localeParam as Locale) : "en-US";
  return {
    title: t(locale, "meta.privacy.title"),
    description: t(locale, "meta.privacy.description"),
    alternates: localizedAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage({ params }: { params: Promise<PageParams> }) {
  const { locale: localeParam } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  return <LegalDocumentView locale={locale} doc={PRIVACY_POLICY[locale as "en-US" | "ko-KR"]} />;
}
