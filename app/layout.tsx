import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Serif_KR } from "next/font/google";
import { siteUrl } from "@lib/env";
import "../src/ui/styles/tokens.css";
import "../src/ui/styles/components.css";

/**
 * PHASE 8 visual fix (2026-08): the Korean display-serif fallback names in
 * `--tgi-font-display` (`tokens.css`) — "Source Han Serif KR"/"Noto Serif
 * KR" — were never actually loaded anywhere (no `next/font`, no `<link>`,
 * no `@font-face` existed in this project before this change). Those names
 * only work if pre-installed on the visitor's OS, which they typically
 * aren't (Adobe/Google webfonts, not OS-bundled) — so every Hangul heading
 * silently fell through the whole stack to the bare `serif` keyword, which
 * on Windows resolves to Batang, a traditional/calligraphic system font
 * that clashes with this product's editorial Latin serif. Self-hosted via
 * `next/font/google` (fetched once at build time, served from this origin
 * afterward — no runtime request to Google, works offline, same category
 * as a self-hosted `@font-face`). `weight: "400"` only: every selector that
 * reads `--tgi-font-display` in `components.css` uses regular weight, so a
 * heavier cut would be dead weight in the bundle. The generated CSS
 * variable is consumed by `--tgi-font-display` in `tokens.css`, positioned
 * in the SAME slot the non-functional system-font names occupied — Latin
 * headings still resolve through `ui-serif`/`Georgia`/`"Iowan Old Style"`
 * exactly as before (byte-identical for English), and only Hangul glyphs
 * (which those three fonts don't contain, so were always skipped) now land
 * on this loaded font instead of the OS default.
 */
const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-noto-serif-kr",
  display: "swap",
});

/**
 * True document root. Kept deliberately thin: locale validation and
 * locale-scoped chrome live in app/[locale]/layout.tsx, which is the layout
 * every real route renders under.
 *
 * `lang` is a static "en" for now — per-locale `<html lang>` and hreflang are
 * Phase 10 (SEO) work; getting them right requires the localised routes to
 * exist first, which is what this phase builds.
 */
export const metadata: Metadata = {
  // Phase 10A: without this, any future relative OG-image/canonical URL
  // would resolve against Next's own fallback (a bare "localhost:3000")
  // in production rather than the real origin. No build warning fires for
  // this today (nothing uses a relative metadata URL yet), but setting it
  // now is infrastructure, not the "full SEO pass" — no canonical URLs,
  // hreflang, or OG content is added here.
  metadataBase: new URL(siteUrl()),
  title: "The Great Inside",
  description: "Who in history thinks like you?",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={notoSerifKR.variable}>
      <body className="tgi-root">{children}</body>
    </html>
  );
}
