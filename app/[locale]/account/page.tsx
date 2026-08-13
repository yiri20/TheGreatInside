import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { getCurrentUser } from "@lib/supabase/getUser";
import { createClient } from "@lib/supabase/server";
import { fetchSavedResults } from "@lib/results/fetchSavedResults";
import { Button, Card, Cluster, Display, Eyebrow, Heading, Stack, Text } from "@ui/index";

/**
 * ACCOUNT — SAVED RESULTS LIST. Phase 10C.
 *
 * Genuinely per-request dynamic (reads `cookies()` via `getCurrentUser`) —
 * unlike `Header.tsx`, this page was never a static-generation candidate in
 * the first place (it shows per-user data), so there is no Stage 9D-style
 * regression risk in resolving auth server-side here.
 *
 * Deliberately restrained: a plain list of completion dates, never a
 * generic dashboard. Ownership is enforced entirely by the existing
 * `user_profiles_own` RLS policy — no explicit `.eq("user_id", ...)`
 * filter is added here, since RLS is the authoritative gate, not an
 * application-level check layered on top of it.
 */
interface PageParams {
  locale: string;
}

export const metadata: Metadata = {
  title: "Your Saved Results — The Great Inside",
};

function formatCompletedAt(locale: Locale, iso: string): string {
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function AccountPage({ params }: { params: Promise<PageParams> }) {
  const { locale: localeParam } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Heading level={1}>{t(locale, "account.signed_out.title")}</Heading>
          <Text tone="secondary">{t(locale, "account.signed_out.body")}</Text>
        </Stack>
      </main>
    );
  }

  const supabase = await createClient();
  // See the matching comment in account/results/[id]/page.tsx — an explicit
  // cast avoids a TS2589 "excessively deep" instantiation error from
  // structurally matching the full Supabase client against this narrower
  // chained deps shape.
  const rows = await fetchSavedResults(supabase as unknown as Parameters<typeof fetchSavedResults>[0]);

  return (
    <main className="tgi-container" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
      <Stack gap={6} className="tgi-measure-stack">
        <Stack gap={2}>
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Display>{t(locale, "account.title")}</Display>
        </Stack>

        {rows.length === 0 ? (
          <Card variant="sunken">
            <Stack gap={2}>
              <Text tone="secondary">{t(locale, "account.empty.title")}</Text>
              <Text tone="muted">{t(locale, "account.empty.body")}</Text>
            </Stack>
          </Card>
        ) : (
          <Stack gap={3}>
            {rows.map((row) => (
              <Card key={row.id}>
                <Cluster gap={3} between>
                  <Text tone="secondary">
                    {t(locale, "account.list.completed_at", { date: formatCompletedAt(locale, row.completedAt) })}
                  </Text>
                  {row.hasSnapshot ? (
                    <Button variant="quiet" href={`/${locale}/account/results/${row.id}`}>
                      {t(locale, "account.list.view")}
                    </Button>
                  ) : (
                    <Text tone="muted">{t(locale, "account.list.unavailable")}</Text>
                  )}
                </Cluster>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </main>
  );
}
