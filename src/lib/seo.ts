import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { siteUrl } from "./env";

/**
 * POST-10D STAGE A. The smallest shared helper needed to stop every
 * `generateMetadata` from hand-building canonical/hreflang URLs and
 * inevitably drifting (a locale swapped for the wrong one, `siteUrl()`
 * forgotten in favour of a relative path, etc.).
 *
 * `pathSuffix` is the locale-INDEPENDENT remainder of a page's path — `""`
 * for a page whose URL is exactly `/{locale}` (Landing), or e.g.
 * `"/people"`, `"/quiz"`, `"/people/leonardo-da-vinci"`. This function
 * only ever builds URLs from `siteUrl()` (never a request-derived origin,
 * never a hardcoded Vercel preview hostname), so a canonical/hreflang tag
 * can never accidentally point at a throwaway preview deployment.
 *
 * `x-default` points at bare `/` — the language-negotiation entry point
 * this stage's `proxy.ts` locale logic implements (explicit `tgi_locale`
 * cookie -> `Accept-Language` -> `en-US` fallback). This is a deliberate,
 * documented hreflang pattern (Google Search Central explicitly allows
 * `x-default` to target a redirecting entry URL rather than one specific
 * localized page) and matches the Stage A directive's own stated
 * preference. Bare `/` itself is never added to the sitemap and never
 * receives its own canonical/localized metadata — it has no content of
 * its own, only a redirect.
 */
export function localizedAlternates(locale: Locale, pathSuffix: string): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of LAUNCH_LOCALES) {
    languages[l] = `${siteUrl()}/${l}${pathSuffix}`;
  }
  languages["x-default"] = siteUrl();
  return {
    canonical: `${siteUrl()}/${locale}${pathSuffix}`,
    languages,
  };
}

/**
 * Robots directives for the two noindex page families this stage
 * introduces (CLAUDE.md's Stage A refinement 1 — noindex and `robots.txt`
 * are NOT interchangeable; these pages stay fully crawlable, `robots.txt`
 * never disallows them, only this page-level directive keeps them out of
 * the index). `follow: true` lets crawlers still traverse outbound links
 * from Results/Compare (e.g. to a Person page) even though the page
 * itself isn't indexed; Account/Saved Result additionally set
 * `follow: false` since every link on those pages is session-specific
 * navigation with nothing worth a crawler following.
 */
export const NOINDEX_FOLLOW: NonNullable<Metadata["robots"]> = { index: false, follow: true };
export const NOINDEX_NOFOLLOW: NonNullable<Metadata["robots"]> = { index: false, follow: false };
