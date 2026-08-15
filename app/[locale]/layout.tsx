import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { notoSerifKR } from "@lib/fonts";
import { siteUrl } from "@lib/env";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PendingResultsSync } from "./PendingResultsSync";
import "../../src/ui/styles/tokens.css";
import "../../src/ui/styles/components.css";

/** Only launch locales get real routes; other supported locales 404 until
 *  their structural translation coverage is ready (see i18n/index.ts). */
export function generateStaticParams() {
  return LAUNCH_LOCALES.map((locale) => ({ locale }));
}

/**
 * THE SECOND OF TWO PARALLEL ROOT LAYOUTS — see `app/(default)/layout.tsx`'s
 * doc comment for why two exist. This one owns every `/[locale]/*` route and
 * is what makes a correct per-locale `<html lang>` possible: `params.locale`
 * IS available here (this segment IS the `[locale]` route param), whereas
 * the true document root never had access to it at all. `generateStaticParams`
 * still drives static generation for every route beneath this layout exactly
 * as before — rendering `<html>`/`<body>` here instead of one level up does
 * NOT make this layout itself dynamic; it's still evaluated once per locale
 * at build time for every statically-generated child route (confirmed by
 * the production build's route table showing an unchanged static/dynamic
 * split — see the `<html lang>` investigation for the full verification).
 * `metadataBase` is re-declared here (not inherited from a shared parent
 * anymore, since there is no longer a single shared parent above both root
 * layouts) so every page under `/[locale]/*` still resolves relative
 * metadata URLs correctly.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
};

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
    <html lang={locale} className={notoSerifKR.variable}>
      <body className="tgi-root">
        <Header locale={locale as Locale} />
        <PendingResultsSync />
        {children}
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
