import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { getCurrentUser } from "@lib/supabase/getUser";
import { createClient } from "@lib/supabase/server";
import { fetchSavedResult } from "@lib/results/fetchSavedResult";
import { resolveSavedResultPageState } from "@lib/results/savedResultPageState";
import { SavedResultView } from "@ui/savedResult/SavedResultView";
import { NOINDEX_NOFOLLOW } from "@lib/seo";
import { GoogleSignInCta } from "../../GoogleSignInCta";
import { Button, Cluster, Eyebrow, Heading, Stack, Text } from "@ui/index";

/**
 * SAVED RESULT — the immutable reopen view. Phase 10C, extended for
 * historical parity in the Phase 10D-3 follow-up.
 *
 * All actual rendering lives in `SavedResultView` (`@ui/savedResult/
 * SavedResultView.tsx`) — a pure component taking only a `ResultSnapshotV1`
 * + `locale`, with zero Supabase/auth/`src/core/quiz|matching|greatness|
 * interpretation` coupling. This file owns ONLY the auth/lookup state
 * machine (auth-required / not-found / unavailable / ok) and hands the
 * resolved snapshot to that component — the same "parity is structural,
 * not merely conventional" split `resultView.ts` established for
 * `computeResultView` in Phase 10C, applied here to the PRESENTATION layer
 * so it can also be exercised by `src/dev/savedResultPreview.tsx` (a
 * `gallery.tsx`-style static renderer used by the Playwright suite) without
 * ever touching Supabase. See `SavedResultView.tsx`'s own doc comment for
 * the full historical-fidelity rule it enforces.
 *
 * Ownership is enforced by RLS alone: `.eq("id", id)` against the
 * authenticated server client returns zero rows for an id that exists but
 * belongs to someone else (never an error, never a leak of "this id exists
 * but isn't yours" vs. "this id doesn't exist at all") — both render the
 * same not-found state below, deliberately indistinguishable.
 *
 * AUTH STATE is checked FIRST and kept entirely separate from that
 * lookup — a real production bug (found during Stage 10C's own human
 * E2E, not simulated): an earlier version returned this page's generic
 * not-found state for a signed-out visitor too (e.g. immediately after
 * clicking Sign out while already on this page), which is secure (never
 * leaks row existence) but semantically false — it told the user their
 * OWN real result "doesn't exist or belongs to someone else." `!user`
 * now short-circuits to a distinct `auth_required` state BEFORE
 * `fetchSavedResult` is ever called — see `savedResultPageState.ts`'s own
 * doc comment for the exact invariant this preserves: "unauthenticated"
 * vs. "authenticated-but-unavailable" is safe to distinguish;
 * "nonexistent id" vs. "someone else's id" is NOT, and remains
 * undistinguished below, unchanged.
 */
interface PageParams {
  locale: string;
  id: string;
}

/**
 * POST-10D STAGE A: converted to locale-aware `generateMetadata` with an
 * explicit `noindex, nofollow` — same reasoning as Account. Never includes
 * a canonical/hreflang: a saved-result reopen view has no public
 * indexable identity, and its `id` is not a value that should ever be
 * advertised to crawlers.
 */
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = LAUNCH_LOCALES.includes(localeParam as Locale) ? (localeParam as Locale) : "en-US";
  return {
    title: t(locale, "meta.account_result.title"),
    robots: NOINDEX_NOFOLLOW,
  };
}

export default async function SavedResultPage({ params }: { params: Promise<PageParams> }) {
  const { locale: localeParam, id } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  function AuthRequiredState() {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Heading level={1}>{t(locale, "account.results.auth_required.title")}</Heading>
          <Text tone="secondary">{t(locale, "account.results.auth_required.body")}</Text>
          <div>
            <GoogleSignInCta locale={locale} returnPath={`/${locale}/account/results/${id}`} />
          </div>
        </Stack>
      </main>
    );
  }

  function NotFoundState() {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Heading level={1}>{t(locale, "account.results.not_found.title")}</Heading>
          <Text tone="secondary">{t(locale, "account.results.not_found.body")}</Text>
          <div>
            <Button href={`/${locale}/account`}>{t(locale, "account.back")}</Button>
          </div>
        </Stack>
      </main>
    );
  }

  function UnavailableState() {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Heading level={1}>{t(locale, "account.results.unavailable.title")}</Heading>
          <Text tone="secondary">{t(locale, "account.results.unavailable.body")}</Text>
          <Cluster gap={3}>
            <Button href={`/${locale}/quiz`}>{t(locale, "account.results.cta.retake")}</Button>
            <Button variant="quiet" href={`/${locale}/account`}>
              {t(locale, "account.back")}
            </Button>
          </Cluster>
        </Stack>
      </main>
    );
  }

  const user = await getCurrentUser();

  // Checked FIRST, before any DB call — see the module doc comment above
  // for the production bug this prevents from recurring.
  if (!user) return <AuthRequiredState />;

  const supabase = await createClient();
  // Explicit cast (not structural inference) through the full Supabase
  // client's deeply-generic query-builder type — matching it structurally
  // against `FetchSavedResultDeps`'s narrower chained shape triggers a
  // TS2589 "excessively deep" instantiation error. Same reason
  // `saveCompletedResult.ts`'s deps type stays deliberately narrow and its
  // one real caller passes the client straight through unchanged for a
  // SHALLOWER chain (just `.upsert`) that doesn't hit this.
  const outcome = await fetchSavedResult(supabase as unknown as Parameters<typeof fetchSavedResult>[0], id);
  const state = resolveSavedResultPageState(true, outcome);

  if (state.kind === "auth_required") return <AuthRequiredState />; // unreachable given signedIn=true above; satisfies exhaustive narrowing
  if (state.kind === "not_found") return <NotFoundState />;
  if (state.kind === "unavailable") return <UnavailableState />;

  return <SavedResultView snapshot={state.snapshot} locale={locale} />;
}
