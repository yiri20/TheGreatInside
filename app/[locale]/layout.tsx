import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { Header } from "./Header";
import { PendingResultsSync } from "./PendingResultsSync";

/** Only launch locales get real routes; other supported locales 404 until
 *  their structural translation coverage is ready (see i18n/index.ts). */
export function generateStaticParams() {
  return LAUNCH_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LAUNCH_LOCALES.includes(locale as Locale)) notFound();
  return (
    // `lang` here (not on the root `<html>`, which stays a static "en" per
    // app/layout.tsx's own comment — full per-locale <html lang>/hreflang
    // is deliberately still Phase 10 SEO scope, untouched by this) scopes
    // the `:lang(ko)` CSS rules in components.css that make Korean UI
    // headings render sans instead of the editorial serif (Phase 9 Stage
    // 9D follow-up, 2026-08) — a plain block-level wrapper, no layout
    // effect of its own (.tgi-root's own styles are all on <body>, not
    // dependent on a specific direct-child structure).
    <div lang={locale}>
      <Header locale={locale as Locale} />
      <PendingResultsSync />
      {children}
    </div>
  );
}
