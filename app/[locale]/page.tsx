import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { localizedAlternates } from "@lib/seo";
import { SEED_PEOPLE } from "@data/people/seed";
import { Button, Card, Display, Eyebrow, Rail, Stack, Text } from "@ui/index";

/**
 * The landing subtitle's "N extraordinary people" figure is computed live
 * from the roster (match-eligible count — the pool the quiz actually ranks
 * against) rather than hardcoded, specifically so a future roster batch
 * can never leave this copy stale again (found stuck at a pre-expansion
 * "35" during the 95-person launch-readiness audit, 2026-08).
 */
const MATCH_ELIGIBLE_PEOPLE_COUNT = SEED_PEOPLE.filter((p) => p.isMatchEligible).length;

interface PageParams {
  locale: string;
}

/**
 * POST-10D STAGE A: Landing had no `generateMetadata` at all before this —
 * it inherited only the generic `app/(default)/layout.tsx` title/
 * description. Self canonical + hreflang alternates via `localizedAlternates`
 * (pathSuffix `""`, since Landing's URL is exactly `/{locale}`).
 */
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = LAUNCH_LOCALES.includes(localeParam as Locale) ? (localeParam as Locale) : "en-US";
  return {
    title: t(locale, "meta.landing.title"),
    description: t(locale, "meta.landing.description"),
    alternates: localizedAlternates(locale, ""),
  };
}

/**
 * Locale-scoped landing page (Phase 6; wide-desktop rail composition added
 * Phase 10D-1). Replaces the placeholder root stub at `app/page.tsx` now
 * that there is a real quiz + results experience to send people to — see
 * that file's comment for why it stayed minimal until now.
 *
 * Phase 10D-1: below 1280px this renders exactly as before (a single
 * centered `.tgi-measure-stack` column — `Rail` collapses to one column and
 * the CSS scoped to `.tgi-rail__primary .tgi-measure-stack` only activates
 * at the wide breakpoint, see components.css). At >=1280px the AI/no-
 * generative-scoring disclaimer — previously the smallest, most easily
 * skipped line on the page, trailing after two buttons — gets its own
 * secondary region instead of being invented filler: it is real,
 * already-authored content (`landing.ai_disclaimer`, CLAUDE.md's own "one
 * rule") that is arguably underserved by its current bottom-of-stack
 * position given how central it is to what this product actually is.
 *
 * Phase 10D-1 mobile-polish follow-up: three narrow-viewport-only
 * refinements (headline size, secondary-CTA weight, How It Works
 * treatment), each via a Landing-scoped class that does nothing at
 * >=1280px — see components.css's "Landing mobile polish" block for the
 * full reasoning. Content, DOM order, and the wide-desktop composition are
 * all unchanged; this is presentation-only, narrow-viewport rhythm work.
 *
 * CTA hierarchy polish (2026-08): the secondary CTA's "loses chrome below
 * 1280px" treatment above is now how it looks at every width, not just
 * mobile — a full outlined pill next to the filled primary CTA read as two
 * competing actions at wide desktop specifically. Demoted to this project's
 * own established `variant="quiet"` (the same text-link treatment already
 * used for every subordinate action elsewhere — Results' "back to people",
 * Compare's "closest match", Account's row actions), stacked directly
 * below the primary CTA (`Stack`, not `Cluster`) so the two are never
 * side-by-side at any width. Primary CTA, copy, and page structure
 * otherwise unchanged.
 */
export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  return (
    <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
      <Rail
        className="tgi-rail--tight"
        primary={
          <Stack gap={5} className="tgi-measure-stack">
            <Eyebrow>{t(locale, "landing.eyebrow")}</Eyebrow>
            <Display className="tgi-landing-headline">{t(locale, "landing.title")}</Display>
            <Text tone="secondary">
              {t(locale, "landing.subtitle", { count: MATCH_ELIGIBLE_PEOPLE_COUNT })}
            </Text>
            <Stack gap={2} className="tgi-landing-cta-stack">
              <Button href={`/${locale}/quiz`} size="lg" className="tgi-landing-cta-primary">
                {t(locale, "landing.cta_primary")}
              </Button>
              <Button href={`/${locale}/people`} variant="quiet" className="tgi-landing-cta-secondary">
                {t(locale, "landing.cta_secondary")}
                <span aria-hidden="true" className="tgi-landing-cta-secondary__arrow">
                  {" "}
                  →
                </span>
              </Button>
            </Stack>
          </Stack>
        }
        secondary={
          <Card variant="sunken" className="tgi-landing-howitworks">
            <Stack gap={2}>
              <Eyebrow>{t(locale, "landing.method.eyebrow")}</Eyebrow>
              <Text tone="secondary">{t(locale, "landing.ai_disclaimer")}</Text>
            </Stack>
          </Card>
        }
      />
    </main>
  );
}
