import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notoSerifKR } from "@lib/fonts";
import { siteUrl } from "@lib/env";
import { GOOGLE_SITE_VERIFICATION } from "@lib/seo";
import "../../src/ui/styles/tokens.css";
import "../../src/ui/styles/components.css";

/**
 * ONE OF TWO PARALLEL ROOT LAYOUTS (Next.js "multiple root layouts via route
 * groups" — the only SSG-safe way to give `/[locale]/*` routes their own
 * correct `<html lang>` without a request-time root layout, since the true
 * root previously had no access to the `[locale]` route param at all — see
 * the `<html lang>` investigation for the full reasoning). This one covers
 * every route OUTSIDE `/[locale]/*` — today, only bare `/` (a redirect with
 * no visible content of its own). `app/layout.tsx` no longer exists — a
 * single top-level root layout AND two route-group/segment root layouts
 * would conflict; Next.js requires exactly one root per route family when
 * using this pattern.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "The Great Inside",
  description: "Who in history thinks like you?",
  verification: { google: GOOGLE_SITE_VERIFICATION },
};

export default function DefaultRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={notoSerifKR.variable}>
      <body className="tgi-root">{children}</body>
    </html>
  );
}
