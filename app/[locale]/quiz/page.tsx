import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { localizedAlternates } from "@lib/seo";
import { QuizClient } from "./QuizClient";

interface PageParams {
  locale: string;
}

/**
 * POST-10D STAGE A, refinement 2: Quiz is a real public, indexable
 * destination (localized title/description, self canonical, hreflang
 * alternates, sitemap inclusion) — same treatment as Landing/People/Person.
 * Thin Server Component wrapper for the same reason as
 * `people/page.tsx` — `generateMetadata` requires a Server Component, and
 * the interactive quiz flow (state, localStorage, navigation) genuinely
 * cannot be one. `QuizClient.tsx` carries the entire previous
 * `"use client"` implementation unchanged.
 */
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = LAUNCH_LOCALES.includes(localeParam as Locale) ? (localeParam as Locale) : "en-US";
  return {
    title: t(locale, "meta.quiz.title"),
    description: t(locale, "meta.quiz.description"),
    alternates: localizedAlternates(locale, "/quiz"),
  };
}

export default async function QuizPage({ params }: { params: Promise<PageParams> }) {
  const { locale: localeParam } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  return <QuizClient locale={locale} />;
}
