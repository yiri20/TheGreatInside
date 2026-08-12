import { notFound } from "next/navigation";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { Button, Cluster, Display, Eyebrow, Stack, Text } from "@ui/index";

/**
 * Locale-scoped landing page (Phase 6). Replaces the placeholder root stub
 * at `app/page.tsx` now that there is a real quiz + results experience to
 * send people to — see that file's comment for why it stayed minimal until
 * now.
 */
export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  return (
    <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
      <Stack gap={5} className="tgi-measure-stack">
        <Eyebrow>{t(locale, "landing.eyebrow")}</Eyebrow>
        <Display>{t(locale, "landing.title")}</Display>
        <Text tone="secondary">{t(locale, "landing.subtitle")}</Text>
        <Cluster gap={3}>
          <Button href={`/${locale}/quiz`} size="lg">
            {t(locale, "landing.cta_primary")}
          </Button>
          <Button href={`/${locale}/people`} variant="secondary" size="lg">
            {t(locale, "landing.cta_secondary")}
          </Button>
        </Cluster>
        <Text tone="muted">{t(locale, "landing.ai_disclaimer")}</Text>
      </Stack>
    </main>
  );
}
