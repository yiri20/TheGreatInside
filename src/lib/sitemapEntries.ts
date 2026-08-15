import type { MetadataRoute } from "next";
import { LAUNCH_LOCALES } from "@core/types";
import { SEED_PEOPLE } from "@data/people/seed";
import { siteUrl } from "./env";

/**
 * POST-10D STAGE A, refinement 2 (Quiz policy): Quiz is a real public,
 * indexable destination — localized title/description, self canonical,
 * hreflang alternates, and sitemap inclusion, same as Landing/People/
 * Person. Generated from the canonical sources of truth (`LAUNCH_LOCALES`,
 * `SEED_PEOPLE`), not a hand-maintained list, so a future roster change
 * can never silently drift out of sync with what actually has a page.
 *
 * Every current SEED_PEOPLE entry gets a Person URL, not only match-
 * eligible ones — matching `people/[slug]/page.tsx`'s own
 * `generateStaticParams` (`SEED_PEOPLE.map(...)`, no eligibility filter):
 * "every published person is browsable, not only match-eligible ones"
 * (that file's own comment). Zheng He (the one current match-ineligible
 * person) is therefore included here too, same as any other person.
 *
 * Broader Public Launch Finish Line: `/privacy` and `/terms` added
 * alongside People/Quiz — real, static, publicly indexable content (no
 * compelling reason to noindex a legal-disclosure page a user or a
 * regulator might specifically want to find), same locale/canonical/
 * hreflang treatment as every other indexed page.
 *
 * Deliberately excluded, per the approved Stage A policy: bare `/` (no
 * content of its own, only a locale-negotiation redirect — see
 * `src/lib/seo.ts`'s x-default reasoning), Results/Compare/Account/Saved
 * Result (all page-level `noindex`), and `/auth/callback` (infrastructure,
 * disallowed in `robots.ts` instead). Never includes a result token of any
 * kind.
 *
 * Pure function, kept in `src/lib` for direct Vitest coverage — see
 * `robotsConfig.ts` for the same "logic in src/lib, thin app/ wrapper"
 * convention.
 */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LAUNCH_LOCALES) {
    entries.push({ url: `${base}/${locale}` });
    entries.push({ url: `${base}/${locale}/people` });
    entries.push({ url: `${base}/${locale}/quiz` });
    entries.push({ url: `${base}/${locale}/privacy` });
    entries.push({ url: `${base}/${locale}/terms` });
  }

  for (const locale of LAUNCH_LOCALES) {
    for (const person of SEED_PEOPLE) {
      entries.push({ url: `${base}/${locale}/people/${person.slug}` });
    }
  }

  return entries;
}
