import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { localizedAlternates } from "@lib/seo";
import { PeopleDirectoryClient } from "./PeopleDirectoryClient";

interface PageParams {
  locale: string;
}

/**
 * POST-10D STAGE A: thin Server Component wrapper — `generateMetadata` can
 * only be exported from a Server Component, which this page previously
 * couldn't be (it was `"use client"` end-to-end). All interactive
 * search/filter/sort state now lives in `PeopleDirectoryClient.tsx`,
 * unchanged; this file only resolves/validates the locale and owns
 * metadata.
 */
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = LAUNCH_LOCALES.includes(localeParam as Locale) ? (localeParam as Locale) : "en-US";
  return {
    title: t(locale, "meta.people.title"),
    description: t(locale, "meta.people.description"),
    alternates: localizedAlternates(locale, "/people"),
  };
}

export default async function PeopleDirectoryPage({ params }: { params: Promise<PageParams> }) {
  const { locale: localeParam } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  return <PeopleDirectoryClient locale={locale} />;
}
