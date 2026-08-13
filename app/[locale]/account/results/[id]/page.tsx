import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { personDisplayName, t, type MessageKey } from "@core/i18n/index";
import type { ResultSnapshotV1 } from "@core/results/snapshot";
import { SEED_PEOPLE } from "@data/people/seed";
import { getCurrentUser } from "@lib/supabase/getUser";
import { createClient } from "@lib/supabase/server";
import { fetchSavedResult } from "@lib/results/fetchSavedResult";
import {
  Button,
  Card,
  Cluster,
  ComparisonBar,
  Display,
  Divider,
  Eyebrow,
  formatMatch,
  formatPotential,
  Grid,
  Heading,
  Numeric,
  PersonCard,
  Stack,
  Text,
  TraitChip,
} from "@ui/index";

/**
 * SAVED RESULT — the immutable reopen view. Phase 10C.
 *
 * HARD RULE, load-bearing for the whole historical-fidelity design: this
 * page renders EXCLUSIVELY from the parsed `result_snapshot` JSON. It
 * imports NOTHING from `src/core/quiz`, `src/core/matching`,
 * `src/core/greatness`, or `src/core/interpretation` — no `scoreQuiz`, no
 * `buildResultSet`, no `computeGreatnessPotential`, no selection/template
 * function of any kind. The only "live" reads here are presentational:
 * localized attribute/person display strings and portrait URLs looked up
 * by stable id, which cannot change a NUMBER, only how it's labelled. A
 * "reopen" that quietly recomputed would defeat the entire point of this
 * design — see `src/core/results/snapshot.ts`'s own doc comment.
 *
 * Ownership is enforced by RLS alone: `.eq("id", id)` against the
 * authenticated server client returns zero rows for an id that exists but
 * belongs to someone else (never an error, never a leak of "this id exists
 * but isn't yours" vs. "this id doesn't exist at all") — both render the
 * same not-found state below, deliberately indistinguishable.
 */
interface PageParams {
  locale: string;
  id: string;
}

export const metadata: Metadata = {
  title: "Saved Result — The Great Inside",
};

/** Trivial, timeless i18n lookup — deliberately NOT imported from
 *  `rules.ts`'s `attributeName`, even though it does the same thing, to
 *  keep this file's import graph unambiguously free of anything living in
 *  `src/core/interpretation` (where the actual, versioned SELECTION logic
 *  this page must never re-run lives). */
function attrLabel(locale: Locale, attributeId: string): string {
  return t(locale, `attribute.${attributeId}` as MessageKey);
}

function occupationLabel(locale: Locale, occupationId: string | undefined): string | undefined {
  return occupationId ? t(locale, `occupation.${occupationId}` as MessageKey) : undefined;
}

/** A person referenced in an old snapshot may no longer exist in the live
 *  roster (a future `inclusion_v1`-style removal) — falls back to the
 *  snapshot's own frozen `personNames` entry (canonical/English name,
 *  unlocalised) rather than becoming unrenderable. The smallest fallback
 *  necessary, not a substitute for live localisation in the normal case. */
function resolvePerson(personId: string, snapshot: ResultSnapshotV1) {
  const live = SEED_PEOPLE.find((p) => p.id === personId);
  return {
    live,
    name: (locale: Locale) => (live ? personDisplayName(locale, live) : snapshot.personNames[personId] ?? personId),
    href: (locale: Locale) => (live ? `/${locale}/people/${live.slug}` : undefined),
  };
}

export default async function SavedResultPage({ params }: { params: Promise<PageParams> }) {
  const { locale: localeParam, id } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

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
  if (!user) return <NotFoundState />;

  const supabase = await createClient();
  // Explicit cast (not structural inference) through the full Supabase
  // client's deeply-generic query-builder type — matching it structurally
  // against `FetchSavedResultDeps`'s narrower chained shape triggers a
  // TS2589 "excessively deep" instantiation error. Same reason
  // `saveCompletedResult.ts`'s deps type stays deliberately narrow and its
  // one real caller passes the client straight through unchanged for a
  // SHALLOWER chain (just `.upsert`) that doesn't hit this.
  const outcome = await fetchSavedResult(supabase as unknown as Parameters<typeof fetchSavedResult>[0], id);

  if (outcome.status === "not_found") return <NotFoundState />;
  if (outcome.status === "unavailable") return <UnavailableState />;
  const snapshot = outcome.snapshot;

  const closestPerson = snapshot.closest ? resolvePerson(snapshot.closest.personId, snapshot) : undefined;

  return (
    <main className="tgi-container" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
      <Stack gap={7}>
        <Stack gap={5} className="tgi-measure-stack" as="section">
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Display>{t(locale, "results.hero.title")}</Display>
          <Stack gap={2}>
            <Text tone="secondary">{t(locale, "label.greatness_potential")}</Text>
            <div className="tgi-hero-score">
              <Numeric>
                <span className="tgi-hero-score__value">{formatPotential(snapshot.greatness.score)}</span>
              </Numeric>
            </div>
          </Stack>
          {snapshot.resultArchetype ? (
            <Card variant="sunken">
              <Stack gap={1}>
                <Text tone="secondary">
                  <strong>{t(locale, `archetype_result.${snapshot.resultArchetype}` as MessageKey)}</strong>
                </Text>
                <Text tone="muted">{t(locale, `archetype_result.${snapshot.resultArchetype}.body` as MessageKey)}</Text>
              </Stack>
            </Card>
          ) : null}
        </Stack>

        <Divider />

        {snapshot.closest && closestPerson ? (
          <Stack gap={4} as="section">
            <Heading level={2}>{t(locale, "label.closest_match")}</Heading>
            <Card variant="feature">
              <Stack gap={3}>
                <Heading level={3} className="tgi-person-name">
                  {closestPerson.name(locale)}
                </Heading>
                {closestPerson.live ? (
                  <Text tone="muted">{occupationLabel(locale, closestPerson.live.occupationIds[0])}</Text>
                ) : null}
                <div>
                  <span className="tgi-personcard__match-value tgi-numeric">{formatMatch(snapshot.closest.overallMatch)}</span>{" "}
                  <span className="tgi-text--muted">{t(locale, "label.profile_match")}</span>
                </div>
                {closestPerson.href(locale) ? (
                  <div>
                    <Button href={closestPerson.href(locale)!}>{t(locale, "results.cta.view_profile")}</Button>
                  </div>
                ) : null}
              </Stack>
            </Card>
          </Stack>
        ) : null}

        {snapshot.signature ? (
          <Stack gap={3} className="tgi-measure-stack" as="section">
            <Heading level={2}>{t(locale, "label.signature_trait")}</Heading>
            <TraitChip
              label={attrLabel(locale, snapshot.signature.attributeId)}
              score={snapshot.signature.score}
              locale={locale}
            />
          </Stack>
        ) : null}

        <Divider />

        {snapshot.highlights.length > 0 ? (
          <Stack gap={3} className="tgi-measure-stack" as="section">
            <Heading level={2}>{t(locale, "results.trait_profile.highlights")}</Heading>
            <Cluster gap={2}>
              {snapshot.highlights.map((id) => (
                <TraitChip key={id} label={attrLabel(locale, id)} score={snapshot.traits[id]?.score ?? 50} locale={locale} />
              ))}
            </Cluster>
          </Stack>
        ) : null}

        {snapshot.categoryMatches.length > 0 ? (
          <Stack gap={4} as="section">
            <Heading level={2}>{t(locale, "results.section.category_matches")}</Heading>
            <Grid min="14rem">
              {snapshot.categoryMatches.map((cm) => {
                const p = resolvePerson(cm.personId, snapshot);
                return (
                  <PersonCard
                    key={cm.facet}
                    name={p.name(locale)}
                    subtitle={t(locale, `facet.match.${cm.facet}` as MessageKey)}
                    match={cm.match}
                    locale={locale}
                    {...(p.href(locale) ? { href: p.href(locale)! } : {})}
                  />
                );
              })}
            </Grid>
          </Stack>
        ) : null}

        {snapshot.closest && closestPerson && snapshot.comparison.closestTraits.length > 0 ? (
          <Stack gap={5} className="tgi-measure-stack" as="section">
            <Heading level={2}>
              {t(locale, "results.section.comparison", { person: closestPerson.name(locale) })}
            </Heading>
            <Stack gap={3}>
              <Heading level={3}>{t(locale, "label.you_both")}</Heading>
              <Stack gap={4}>
                {snapshot.comparison.closestTraits.map((c) => (
                  <ComparisonBar
                    key={c.attributeId}
                    label={attrLabel(locale, c.attributeId)}
                    userScore={c.userScore}
                    personScore={c.personScore}
                    personName={closestPerson.name(locale)}
                    locale={locale}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        ) : null}

        <Cluster gap={3}>
          <Button variant="secondary" href={`/${locale}/account`}>
            {t(locale, "account.back")}
          </Button>
        </Cluster>
      </Stack>
    </main>
  );
}
