/**
 * Minimal global header — Phase 9 Stage 9D. Deliberately NOT a full site
 * navigation redesign: brand/home link + persistent auth-state visibility
 * + a compact locale switcher only. Non-sticky (position: static — nothing
 * yet justifies fixed/sticky behavior). See `.tgi-header` in
 * components.css for the compact, mobile-conscious sizing.
 *
 * Deliberately a plain, static component — NOT async, does not read
 * `cookies()`/call `getCurrentUser()`. An earlier draft resolved sign-in
 * state server-side here; that turned out to force EVERY page under
 * `[locale]` (including the 70 statically-generated person pages, the
 * directory, and the quiz) from static generation to per-request dynamic
 * rendering, since this component sits in the shared layout every page
 * renders through — `cookies()` anywhere in that tree opts the whole route
 * out of static rendering. `AuthControls` resolves sign-in state
 * CLIENT-SIDE instead (the same "undefined = not yet resolved, render
 * nothing rather than flash the wrong state" pattern
 * `people/[slug]/CompareCta.tsx` already established), keeping every
 * anonymous, SEO-relevant page statically generated exactly as before.
 *
 * `LocaleSwitcher` reads `useSearchParams()`, which Next.js requires to sit
 * under a `<Suspense>` boundary wherever the surrounding page might
 * otherwise be statically prerendered — omitting this is the same class of
 * static-generation mistake as the `cookies()` regression above, just
 * triggered a different way, so it's wrapped here rather than left as an
 * implicit assumption.
 */
import { Suspense } from "react";
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { AuthControls } from "./AuthControls";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header({ locale }: { locale: Locale }) {
  return (
    <header className="tgi-header">
      <div className="tgi-container tgi-header__inner">
        <a className="tgi-header__brand" href={`/${locale}`}>
          {t(locale, "site.name")}
        </a>
        <div className="tgi-header__controls">
          <Suspense fallback={null}>
            <LocaleSwitcher locale={locale} />
          </Suspense>
          <AuthControls locale={locale} />
        </div>
      </div>
    </header>
  );
}
