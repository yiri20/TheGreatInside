"use client";

/**
 * Compact EN / 한국어 header control — Phase 9 Stage 9D follow-up. Preserves
 * the current page AND its exact query string when switching locale
 * (critical for `/results?r=...` / `/compare/[slug]?r=...` — the result
 * token must survive unchanged): only the `[locale]` URL segment changes,
 * everything else about the path and every query param is carried over
 * verbatim. Locale stays presentation-only — this component never touches
 * scoring, matching, or any stored token value, only which URL a plain
 * `<a>` points at.
 *
 * `useSearchParams()` requires a Suspense boundary around any component
 * that calls it inside a page Next.js can otherwise statically prerender —
 * see Header.tsx's `<Suspense>` wrapper. Omitting it is the same class of
 * mistake as the earlier `cookies()`-in-the-shared-layout regression this
 * stage already fixed once: getting this wrong silently threatens the
 * static-generation split again, so it's called out explicitly here too.
 *
 * A full `<a href>` navigation, not a client-side route push: locale
 * affects server-rendered content (all translated copy), so a real
 * navigation is correct and simplest, and — since cookies aren't tied to
 * client router state — it does not sign the user out or touch the
 * session either way.
 *
 * POST-10D STAGE A, item 7: an explicit click also persists `tgi_locale`
 * (`localeCookieString`, `src/lib/localeNegotiation.ts`) so a later visit
 * to bare `/` honours this choice ahead of `Accept-Language` (see
 * `proxy.ts`). Written via `onClick` on the real `<a>` — synchronous, so
 * the cookie is set before the browser's default navigation follows the
 * `href`, with no `preventDefault`/client-side redirect needed. This never
 * changes where THIS click navigates to (still the direct target URL,
 * exactly as before) — it only affects a future bare-`/` visit.
 */
import { usePathname, useSearchParams } from "next/navigation";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { localeCookieString } from "@lib/localeNegotiation";

function persistLocalePreference(locale: Locale): void {
  if (typeof document === "undefined") return;
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = localeCookieString(locale, { secure });
}

/** Language names are shown in their OWN script, self-referentially — the
 *  universal convention for locale switchers ("한국어" reads "한국어"
 *  whether the current page is English or Korean). Deliberately NOT
 *  `MessageKey` lookups: these two literal labels ARE the correct value in
 *  every locale by definition, not translated content. */
const LOCALE_LABELS: Record<Locale, string> = {
  "en-US": "EN",
  "ko-KR": "한국어",
  // Not launch locales yet (LAUNCH_LOCALES gates what actually renders) —
  // present so this record satisfies Locale's full union without a
  // fallback branch, and already correct for whenever they do launch.
  "ja-JP": "日本語",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
};

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const query = useSearchParams().toString();

  function pathForLocale(target: Locale): string {
    const segments = pathname.split("/");
    // segments[0] === "" (leading slash), segments[1] === the current
    // locale segment — the only part of the path this ever changes.
    segments[1] = target;
    const path = segments.join("/") || `/${target}`;
    return query ? `${path}?${query}` : path;
  }

  return (
    <nav aria-label={t(locale, "locale_switcher.label")} className="tgi-locale-switcher">
      {LAUNCH_LOCALES.map((l, i) => (
        <span key={l}>
          {i > 0 ? <span aria-hidden="true"> / </span> : null}
          <a
            href={pathForLocale(l)}
            onClick={() => persistLocalePreference(l)}
            aria-current={l === locale ? "true" : undefined}
            className={l === locale ? "tgi-locale-switcher__link tgi-locale-switcher__link--active" : "tgi-locale-switcher__link"}
          >
            {LOCALE_LABELS[l]}
          </a>
        </span>
      ))}
    </nav>
  );
}
