import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { personDisplayName, t, tOptional, type MessageKey } from "@core/i18n/index";
import { SEED_PEOPLE } from "@data/people/seed";
import { traitConstellation } from "@core/interpretation/constellation";
import { rankSimilarPeople, selectOppositePerson } from "@core/matching/personSimilarity";
import {
  Button,
  Card,
  Cluster,
  ConfidenceIndicator,
  Divider,
  Eyebrow,
  formatLifespan,
  Grid,
  Heading,
  PersonCard,
  Stack,
  Text,
  TraitCard,
} from "@ui/index";
import { CompareCta } from "./CompareCta";

interface PageParams {
  locale: string;
  slug: string;
}

function personBySlug(slug: string) {
  return SEED_PEOPLE.find((p) => p.slug === slug);
}

/** PHASE 8: replaces the old `humanize(id)` placeholder — see
 *  results/page.tsx's `occupationLabel` for the full rationale. */
function occupationLabel(locale: Locale, occupationId: string | undefined): string | undefined {
  return occupationId ? t(locale, `occupation.${occupationId}` as MessageKey) : undefined;
}

/** Locale's own article, falling back to English, falling back to whatever a
 *  `sources` entry already cites — never a broken assumption that one exists. */
function wikipediaUrlFor(person: NonNullable<ReturnType<typeof personBySlug>>, locale: Locale): string | undefined {
  return (
    person.externalIdentity?.wikipediaUrls?.[locale] ??
    person.externalIdentity?.wikipediaUrls?.["en-US"] ??
    person.sources.find((s) => s.kind === "wikipedia")?.url
  );
}

/** Every published person is browsable, not only match-eligible ones — an
 *  under-evidenced profile stays visitable but is excluded from matching. */
export function generateStaticParams() {
  return SEED_PEOPLE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = LAUNCH_LOCALES.includes(localeParam as Locale) ? (localeParam as Locale) : "en-US";
  const person = personBySlug(slug);
  if (!person) return {};
  const name = personDisplayName(locale, person);
  return {
    title: `${name} — The Great Inside`,
    description: `${name}'s trait profile on The Great Inside — see how your own profile compares.`,
  };
}

export default async function PersonPage({ params }: { params: Promise<PageParams> }) {
  const { locale: localeParam, slug } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  const person = personBySlug(slug);
  if (!person) notFound();

  const constellation = traitConstellation(person);
  const similar = rankSimilarPeople(person, SEED_PEOPLE).slice(0, 6);
  const opposite = selectOppositePerson(person, SEED_PEOPLE);
  const wikipediaUrl = wikipediaUrlFor(person, locale);
  // Absent until authored in the message bundles (see CLAUDE.md "External
  // identity & media metadata") — render nothing rather than a raw,
  // untranslated key.
  const polityText = person.historicalPolityKey
    ? tOptional(locale, person.historicalPolityKey)
    : undefined;

  return (
    <main className="tgi-container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
      <Stack gap={7}>
        <Button variant="quiet" href={`/${locale}/people`}>
          ← {t(locale, "person.back_to_people")}
        </Button>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--tgi-space-5)", alignItems: "flex-start" }}>
          {person.portrait ? (
            // Fixed to the image's own width and never allowed to shrink below
            // it (flexShrink: 0) or grow past it (flex-basis pinned to the
            // wrapper's own width). Without this, the portrait column had no
            // width tie to its 192px image at all: `.tgi-text`'s 68ch prose
            // measure let the attribution caption size the whole column up to
            // ~487px — nearly 2.5x the image — silently stealing the space the
            // name column needed. See CLAUDE.md for the full diagnosis.
            <div style={{ width: "12rem", maxWidth: "100%", flexShrink: 0 }}>
              <Stack gap={2}>
                {/* eslint-disable-next-line @next/next/no-img-element -- external,
                    license-attributed image; next/image's optimiser can't proxy
                    arbitrary third-party licensed sources without its own config. */}
                <img
                  src={person.portrait.url}
                  alt=""
                  {...(person.portrait.width ? { width: person.portrait.width } : {})}
                  {...(person.portrait.height ? { height: person.portrait.height } : {})}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "var(--tgi-radius-lg)",
                    display: "block",
                  }}
                />
                {/* Required by most free licences (e.g. CC BY-SA): the credit
                    line is reproduced as given, not translated or paraphrased.
                    Now wraps within the 12rem column instead of ballooning past
                    it, since the wrapper above constrains the available width
                    before `.tgi-text`'s own (much wider) max-width ever applies. */}
                <Text tone="muted">
                  {person.portrait.source}
                  {person.portrait.attribution ? ` · ${person.portrait.attribution}` : ""} ·{" "}
                  {person.portrait.licenseUrl ? (
                    <a href={person.portrait.licenseUrl} target="_blank" rel="noreferrer">
                      {person.portrait.license}
                    </a>
                  ) : (
                    person.portrait.license
                  )}
                </Text>
              </Stack>
            </div>
          ) : null}

          {/* flex: 1 claims whatever width the row actually has (rather than
              being sized by its own content, which is what let the portrait
              column push it down to 310px); minWidth: 0 is the standard fix
              for flex items refusing to shrink below their content's
              min-content — needed for the name to wrap properly instead of
              forcing the row wider than the container. */}
          <div style={{ flex: "1 1 16rem", minWidth: 0 }}>
            <Stack gap={3}>
              <Eyebrow>
                {[occupationLabel(locale, person.occupationIds[0]), t(locale, `era.${person.era}` as MessageKey)]
                  .filter(Boolean)
                  .join(" · ")}
              </Eyebrow>
              <Heading level={1} className="tgi-person-name">{personDisplayName(locale, person)}</Heading>
              <Text tone="muted" className="tgi-numeric">
                {formatLifespan(person.birthYear, person.deathYear, person.isLiving)}
              </Text>
              {polityText ? <Text tone="muted">{polityText}</Text> : null}
              <ConfidenceIndicator confidence={person.overallProfileConfidence} locale={locale} />
              {wikipediaUrl || person.externalIdentity?.wikidataId ? (
                <Cluster gap={3}>
                  {wikipediaUrl ? (
                    <a href={wikipediaUrl} target="_blank" rel="noreferrer">
                      {t(locale, "person.wikipedia_link")}
                    </a>
                  ) : null}
                  {person.externalIdentity?.wikidataId ? (
                    <a
                      href={`https://www.wikidata.org/wiki/${person.externalIdentity.wikidataId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t(locale, "person.wikidata_link")}
                    </a>
                  ) : null}
                </Cluster>
              ) : null}
              {/* Stage 7E: gated on isMatchEligible so an under-evidenced
                  profile (e.g. Zheng He) never offers a "Compare Yourself"
                  CTA that would just dead-end on /compare's own eligibility
                  check — the person stays fully browsable per this
                  project's "browsable but not matchable" rule, it just
                  doesn't advertise an action that can't complete. */}
              {person.isMatchEligible ? <CompareCta locale={locale} slug={person.slug} /> : null}
            </Stack>
          </div>
        </div>

        {person.impactDomains.length > 0 ? (
          <Stack gap={2}>
            <Heading level={3}>{t(locale, "person.known_for")}</Heading>
            <Cluster gap={2}>
              {person.impactDomains.map((domain) => (
                <span key={domain} className="tgi-chip">
                  {t(locale, `impact_domain.${domain}` as MessageKey)}
                </span>
              ))}
            </Cluster>
          </Stack>
        ) : null}

        <Divider />

        <Stack gap={4}>
          <Heading level={2}>{t(locale, "person.trait_constellation")}</Heading>
          <Grid min="15rem">
            {constellation.map((trait) => (
              <TraitCard
                key={trait.attributeId}
                label={t(locale, `attribute.${trait.attributeId}` as MessageKey)}
                score={trait.score}
                impact={trait.impact}
                confidence={trait.confidence}
                locale={locale}
              />
            ))}
          </Grid>
        </Stack>

        <Divider />

        {similar.length > 0 ? (
          <Stack gap={4}>
            <Heading level={2}>{t(locale, "person.similar_people")}</Heading>
            <Grid min="14rem">
              {similar.map((s) => (
                <PersonCard
                  key={s.personId}
                  name={personDisplayName(locale, s.person)}
                  {...(s.person.occupationIds[0]
                    ? { subtitle: t(locale, `occupation.${s.person.occupationIds[0]}` as MessageKey) }
                    : {})}
                  lifespan={formatLifespan(s.person.birthYear, s.person.deathYear, s.person.isLiving)}
                  href={`/${locale}/people/${s.person.slug}`}
                  match={s.overallMatch}
                  locale={locale}
                  {...(s.person.portrait ? { portraitUrl: s.person.portrait.url } : {})}
                />
              ))}
            </Grid>
          </Stack>
        ) : (
          <Text tone="muted">{t(locale, "person.no_similar_people")}</Text>
        )}

        {opposite ? (
          <Stack gap={4}>
            <Heading level={2}>{t(locale, "person.opposite_profile")}</Heading>
            <Grid min="14rem">
              <PersonCard
                name={personDisplayName(locale, opposite.person)}
                {...(opposite.person.occupationIds[0]
                  ? { subtitle: t(locale, `occupation.${opposite.person.occupationIds[0]}` as MessageKey) }
                  : {})}
                lifespan={formatLifespan(
                  opposite.person.birthYear,
                  opposite.person.deathYear,
                  opposite.person.isLiving,
                )}
                href={`/${locale}/people/${opposite.person.slug}`}
                match={opposite.overallMatch}
                locale={locale}
                {...(opposite.person.portrait ? { portraitUrl: opposite.person.portrait.url } : {})}
              />
            </Grid>
          </Stack>
        ) : null}

        {person.sources.length > 0 ? (
          <Card variant="sunken">
            <Stack gap={3}>
              <Heading level={3}>{t(locale, "person.sources")}</Heading>
              <Stack gap={1} as="ul">
                {person.sources.map((source) => (
                  <li key={source.id}>
                    {source.url ? (
                      <a href={source.url} target="_blank" rel="noreferrer">
                        {source.title}
                      </a>
                    ) : (
                      source.title
                    )}
                  </li>
                ))}
              </Stack>
            </Stack>
          </Card>
        ) : null}
      </Stack>
    </main>
  );
}
