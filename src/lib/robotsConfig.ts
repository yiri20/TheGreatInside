import type { MetadataRoute } from "next";
import { siteUrl } from "./env";

/**
 * POST-10D STAGE A, refinement 1: `robots.txt` and page-level `noindex` are
 * NOT interchangeable. Results/Compare/Account/Saved Result are kept fully
 * crawlable here — they are excluded from the index via their own
 * `generateMetadata`'s `robots: { index: false, ... }` (see
 * `src/lib/seo.ts`'s `NOINDEX_FOLLOW`/`NOINDEX_NOFOLLOW`), which requires
 * the HTML to actually be fetched so the directive can be observed.
 * Blocking those routes here instead would hide the noindex tag from
 * crawlers entirely and is explicitly the wrong tool for this job.
 *
 * The one route disallowed here is `/auth/callback` — pure infrastructure
 * (a PKCE OAuth exchange that immediately redirects) where crawling the
 * route itself serves no purpose and could only ever produce a stray
 * expired-code error page.
 *
 * `sitemap` is built from `siteUrl()`, never a hardcoded or Vercel preview
 * hostname, so this can never point crawlers at a throwaway deployment.
 *
 * Pure function, kept in `src/lib` (not `app/robots.ts` directly) so it has
 * direct Vitest coverage — this project's test runner only collects
 * `src/**\/*.test.ts`, matching the "logic in src/lib, thin app/ wrapper"
 * convention already used for `savedResultPageState.ts`/`accountPageState.ts`.
 */
export function buildRobotsConfig(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth/callback"],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
