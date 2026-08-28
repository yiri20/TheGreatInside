import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LAUNCH_LOCALES, type Locale, type PersonEditorialItem, type LifeArcBeat } from "@core/types";
import { personDisplayName, t, tOptional, type MessageKey } from "@core/i18n/index";
import { editorialText } from "@core/i18n/editorial";
import { localizedAlternates } from "@lib/seo";
import { siteUrl } from "@lib/env";
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
  IdentityHero,
  PersonCard,
  PortraitCredit,
  ShareButton,
  Stack,
  Text,
} from "@ui/index";
import { CompareCta } from "./CompareCta";
import { MatchContextBanner } from "./MatchContextBanner";
import { TraitConstellationGrid } from "./TraitConstellationGrid";

/**
 * Resolves each item's fact text (and, if present, its interpretation text)
 * for the CURRENT locale only — `editorialText()` never falls back to
 * English (see src/core/i18n/editorial.ts), so an item without a
 * translation for this locale is simply dropped from the result rather
 * than rendered untranslated. This is also why an editorial section can
 * legitimately have a different item count on /en-US vs /ko-KR: presence
 * is per-translation, not per-item.
 */
function resolveEditorialItems(locale: Locale, items: readonly PersonEditorialItem[]) {
  return items
    .map((item) => ({
      item,
      text: editorialText(locale, item.textKey),
      interpretation: item.interpretationKey ? editorialText(locale, item.interpretationKey) : undefined,
    }))
    .filter((r): r is { item: PersonEditorialItem; text: string; interpretation: string | undefined } => r.text !== undefined);
}

/** Life Arc beats resolve like editorial items but never carry an
 *  interpretation — chronological orientation only, see `LifeArcBeat`. */
function resolveLifeArc(locale: Locale, beats: readonly LifeArcBeat[]) {
  return beats
    .map((beat) => ({ beat, text: editorialText(locale, beat.textKey) }))
    .filter((r): r is { beat: LifeArcBeat; text: string } => r.text !== undefined);
}

/**
 * One editorial section (achievements / moments / turning points). Fact and
 * interpretation are rendered as two visually distinct elements — a plain
 * fact statement followed by a muted-tone interpretation paragraph, spaced
 * apart by the surrounding Stack — itself written in calibrated language
 * ("is consistent with", "helps explain") rather than a diagnostic claim,
 * per CLAUDE.md "Safety". Profile Hero polish (2026-08): the interpretation
 * line previously carried a visible "What this reveals:" / "이것이 보여주는
 * 것:" label ahead of the text; human visual review asked for it removed
 * without a replacement label, leaving tone + spacing to carry the
 * distinction (the muted tone is a real typographic difference, not a
 * colour-only one, so this isn't a color-alone distinction either). The
 * `person.editorial.interpretation_label` message key is unused as of this
 * change but left in place in en.ts/ko.ts rather than deleted, since
 * removing it isn't part of this task's scope.
 */
function EditorialSection({
  locale,
  heading,
  resolved,
}: {
  locale: Locale;
  heading: string;
  resolved: ReturnType<typeof resolveEditorialItems>;
}) {
  if (resolved.length === 0) return null;
  return (
    <Stack gap={4}>
      <Heading level={2}>{heading}</Heading>
      <Stack gap={3}>
        {resolved.map(({ item, text, interpretation }) => (
          <Card key={item.id} className="tgi-measure-stack">
            <Stack gap={2}>
              <Text>{text}</Text>
              {interpretation ? (
                <Text tone="muted">
                  {interpretation}
                  {item.attributeId ? (
                    <>
                      {" "}
                      <span className="tgi-chip">{t(locale, `attribute.${item.attributeId}` as MessageKey)}</span>
                    </>
                  ) : null}
                </Text>
              ) : null}
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}

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
    description: t(locale, "meta.person.description", { name }),
    alternates: localizedAlternates(locale, `/people/${slug}`),
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
    <main className="tgi-container tgi-person-main" style={{ paddingBottom: "5rem" }}>
      <Button variant="quiet" href={`/${locale}/people`} className="tgi-person-back-link">
        ← {t(locale, "person.back_to_people")}
      </Button>

      <Stack gap={7}>
        {/* Phase 10D-1: extracted into IdentityHero (src/ui/components/layout.tsx)
            — was a hand-written flex row duplicated across this page, results,
            and compare. See CLAUDE.md's "Layout regression from the portrait
            hero" for why the width-tie fix inside it matters.

            Profile Hero polish (2026-08): Phase 10D-2 had paired the hero
            with Known For as a `Rail` secondary column at >=1280px, to fill
            the "large visually unused region" the original flat hero left.
            Human visual review found that fix read as three disconnected
            regions instead (portrait / identity text / Known For) rather
            than one composition. Known For now lives INSIDE the identity
            column below (a Stack child, same as the name/dates/confidence
            it sits among) instead of beside the whole hero, so there's
            exactly one primary column split — portrait, identity — not
            three. `portraitWidthLg` (see IdentityHero) gives the portrait
            itself more of the freed-up width at >=1280px rather than
            leaving it fixed while a now-larger identity column absorbs all
            the gain alone. */}
        <IdentityHero
          name={personDisplayName(locale, person)}
          {...(person.portrait ? { portraitUrl: person.portrait.url } : {})}
          portraitWidth="12rem"
          portraitWidthLg="15rem"
          align="start"
          {...(person.portrait?.width ? { portraitImgWidth: person.portrait.width } : {})}
          {...(person.portrait?.height ? { portraitImgHeight: person.portrait.height } : {})}
          {...(person.portrait
            ? {
                // Concise, legally-sufficient credit line (name/source/
                // licence), not the full provenance sentence — human visual
                // review found the previous full-attribution prose too
                // heavy directly under the hero image. The complete
                // attribution text is preserved verbatim (required by most
                // free licences, e.g. CC BY-SA, to reproduce as given, not
                // paraphrase) — CSS-clamped to one line rather than dropped,
                // so it's still fully present for screen readers, page
                // search and copy/paste, and available on hover via
                // `title`; only the visual rendering is shortened. Source
                // and the licence link itself are never clamped. Extracted
                // to `PortraitCredit` (Phase 2D-1) so the standalone
                // "not a likeness" line for `kind === "editorial_nonlikeness"`
                // has somewhere testable to live — see that component's own
                // doc comment for why it isn't in `layout.tsx` instead.
                portraitCaption: <PortraitCredit locale={locale} portrait={person.portrait} />,
              }
            : {})}
        >
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
            {person.impactDomains.length > 0 ? (
              <Stack gap={2}>
                <Heading level={2} visualLevel={3}>{t(locale, "person.known_for")}</Heading>
                <Cluster gap={2}>
                  {person.impactDomains.map((domain) => (
                    <span key={domain} className="tgi-chip">
                      {t(locale, `impact_domain.${domain}` as MessageKey)}
                    </span>
                  ))}
                </Cluster>
              </Stack>
            ) : null}
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
            <Cluster gap={3}>
              {person.isMatchEligible ? <CompareCta locale={locale} slug={person.slug} /> : null}
              {/* Stage B Part 5: priority #3 Share surface — peer
                  action to CompareCta, not gated on match eligibility
                  (every published person stays fully shareable, same
                  "browsable but not matchable" rule). Public dataset
                  content, no privacy disclosure needed (Section B of
                  the audit). */}
              <ShareButton
                locale={locale}
                label={t(locale, "share.person.label")}
                shareTitle={`${personDisplayName(locale, person)} — The Great Inside`}
                url={`${siteUrl()}/${locale}/people/${person.slug}`}
              />
            </Cluster>
          </Stack>
        </IdentityHero>

        {/* Client island, reads a plain `?why=match&trait=...` query param
            already computed and passed by Results' Closest Match link —
            no result-token decoding or re-computation happens here, so this
            page stays independent of any result token for normal browsing.
            Renders nothing when the params are absent (direct visits,
            navigation from the directory, etc). */}
        <MatchContextBanner locale={locale} />

        <Divider />

        <Stack gap={4}>
          <Heading level={2}>{t(locale, "person.trait_constellation")}</Heading>
          <TraitConstellationGrid locale={locale} traits={constellation} />
        </Stack>

        {(() => {
          const editorial = person.editorial;
          if (!editorial) return null;
          const lifeArc = resolveLifeArc(locale, editorial.lifeArc ?? []);
          const achievements = resolveEditorialItems(locale, editorial.achievements);
          const moments = resolveEditorialItems(locale, editorial.moments);
          const turningPoints = resolveEditorialItems(locale, editorial.turningPoints);
          const complexities = resolveEditorialItems(locale, editorial.complexities ?? []);
          const legacyText = editorial.legacy ? editorialText(locale, editorial.legacy.textKey) : undefined;
          if (
            lifeArc.length === 0 &&
            achievements.length === 0 &&
            moments.length === 0 &&
            turningPoints.length === 0 &&
            complexities.length === 0 &&
            legacyText === undefined
          ) {
            return null;
          }
          return (
            <>
              {lifeArc.length > 0 ? (
                <>
                  <Divider />
                  <Stack gap={4}>
                    <Heading level={2}>{t(locale, "person.life_arc_heading")}</Heading>
                    <Stack gap={2}>
                      {lifeArc.map(({ beat, text }) => (
                        <Text key={beat.textKey}>
                          <strong className="tgi-numeric">{beat.year}</strong> — {text}
                        </Text>
                      ))}
                    </Stack>
                  </Stack>
                </>
              ) : null}
              {achievements.length > 0 ? (
                <>
                  <Divider />
                  <EditorialSection locale={locale} heading={t(locale, "person.achievements_heading")} resolved={achievements} />
                </>
              ) : null}
              {moments.length > 0 ? (
                <>
                  <Divider />
                  <EditorialSection locale={locale} heading={t(locale, "person.moments_heading")} resolved={moments} />
                </>
              ) : null}
              {turningPoints.length > 0 ? (
                <>
                  <Divider />
                  <EditorialSection locale={locale} heading={t(locale, "person.turning_points_heading")} resolved={turningPoints} />
                </>
              ) : null}
              {complexities.length > 0 ? (
                <>
                  <Divider />
                  <EditorialSection locale={locale} heading={t(locale, "person.complexities_heading")} resolved={complexities} />
                </>
              ) : null}
              {legacyText !== undefined ? (
                <>
                  <Divider />
                  <Stack gap={4}>
                    <Heading level={2}>{t(locale, "person.legacy_heading")}</Heading>
                    <Text className="tgi-measure-stack">{legacyText}</Text>
                  </Stack>
                </>
              ) : null}
            </>
          );
        })()}

        <Divider />

        {similar.length > 0 ? (
          <Stack gap={4}>
            <Heading level={2}>{t(locale, "person.similar_people")}</Heading>
            <Text tone="muted">{t(locale, "person.similar_people.subtitle")}</Text>
            {/* Phase 10D Stage 5: reuses the exact mobile-density class
                Results/Saved Result already established for the same
                multi-PersonCard content shape (see components.css,
                "@media (max-width: 640px) .tgi-results-discovery-grid") —
                below 640px this was a single 356px-wide column of cards
                measured 609.5px tall each; the shared class forces 2
                columns at that width, same as every other PersonCard grid
                of this shape in the product. No new CSS, `Grid`/
                `PersonCard` themselves untouched, wide-desktop/tablet
                behavior unaffected (the class only overrides
                `grid-template-columns` at <=640px). */}
            <Grid min="14rem" className="tgi-results-discovery-grid">
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
            <Text tone="muted">{t(locale, "person.opposite_profile.subtitle")}</Text>
            {/* Phase 10D-2: this section always renders exactly ONE card
                (selectOppositePerson returns at most one person) — `Grid`'s
                auto-fit sizes its single column to 1fr when there's only
                one item total, which at wide viewports stretched the card
                to the full container width and, via PersonCard's fixed
                4:5 portrait aspect-ratio, produced an enormous placeholder
                block far taller than the rest of the page. Found by
                inspecting a real wide-desktop screenshot, not assumed.
                `Grid` was never the right primitive for a single item; a
                plain width cap (matching the ~20rem a card naturally takes
                in the multi-item grids elsewhere on this page) fixes it
                without touching the shared `Grid`/`PersonCard` components
                Results/Compare/the directory also use. */}
            <div style={{ maxWidth: "20rem" }}>
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
            </div>
          </Stack>
        ) : null}

        {person.sources.length > 0 ? (
          // Phase 10D Stage 5: a `<Divider />` immediately precedes Sources —
          // every other page in the product divides before its own
          // supporting/citation-type content (Results'/Saved Result's
          // methodology panel, Compare's TargetSwitcher); Sources is the
          // one content-category transition on this page (from person-card
          // sections to citations) that previously had no divider, relying
          // only on the outer Stack's gap. Deliberately NOT added between
          // Similar People and Opposite Profile — those two remain one
          // undivided "other people" cluster, unchanged.
          <>
            <Divider />
            {/* Phase 10D-2: a citation list is inherently narrow content — at
                >=1280px this was previously a sunken Card stretched to the
                full 1280px container, one of the "giant empty card" cases the
                Phase 10D audit named. Capped with the same .tgi-measure-stack
                every other narrow block in the app already uses (quiz,
                account, error states), not a new pattern. */}
            <Card variant="sunken" className="tgi-measure-stack">
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
          </>
        ) : null}
      </Stack>
    </main>
  );
}
