import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ATTRIBUTES, ATTRIBUTES_BY_FACET, FACETS } from "@core/attributes/attributes";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { personDisplayName, t, type MessageKey } from "@core/i18n/index";
import { QUIZ } from "@core/quiz/bank";
import { decodeResultToken } from "@core/quiz/serialize";
import { scoreQuiz } from "@core/quiz/scoring";
import { SEED_PEOPLE } from "@data/people/seed";
import { computeResultView } from "@core/results/resultView";
import { attributeName, renderComparison } from "@core/interpretation/rules";
import type { TraitComparison } from "@core/types";
import {
  Button,
  Card,
  Cluster,
  ComparisonBar,
  ConfidenceIndicator,
  Display,
  Divider,
  Eyebrow,
  formatLifespan,
  formatMatch,
  formatPotential,
  Grid,
  Heading,
  IdentityHero,
  Numeric,
  PersonCard,
  Rail,
  ScoreBar,
  Stack,
  Text,
  TraitCard,
  TraitChip,
} from "@ui/index";
import { SaveLastResult } from "./SaveLastResult";
import { SignInCta } from "./SignInCta";

interface PageParams {
  locale: string;
}
interface PageSearchParams {
  r?: string;
}

export const metadata: Metadata = {
  title: "Your Results — The Great Inside",
  description: "Your Greatness Profile: closest historical match, signature trait, and full trait comparison.",
};

/** PHASE 8: replaces the old `humanize(id)` placeholder (raw id with
 *  underscores swapped for spaces, always English regardless of locale) —
 *  every occupation actually rendered has a real `occupation.*` key
 *  (`missingOccupationCoverage()` in `core/people/explorer.ts` guards this
 *  against a future person introducing an unauthored one). */
function occupationLabel(locale: Locale, occupationId: string | undefined): string | undefined {
  return occupationId ? t(locale, `occupation.${occupationId}` as MessageKey) : undefined;
}

/** Compact, deterministic one-line explanation for the closest match: the
 *  single closest-scoring shared trait, phrased with the SAME template
 *  machinery every other trait comparison in the product uses. */
function closestMatchExplanation(locale: Locale, closestTraits: readonly TraitComparison[], personName: string): string | undefined {
  const top = closestTraits[0];
  return top ? renderComparison(locale, top, personName) : undefined;
}

export default async function ResultsPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<PageSearchParams>;
}) {
  const { locale: localeParam } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  const { r } = await searchParams;
  const decoded = r ? decodeResultToken(decodeURIComponent(r), QUIZ) : undefined;

  if (!decoded) {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Heading level={1}>{t(locale, "results.invalid.title")}</Heading>
          <Text tone="secondary">{t(locale, "results.invalid.body")}</Text>
          <div>
            <Button size="lg" href={`/${locale}/quiz`}>
              {t(locale, "results.invalid.cta")}
            </Button>
          </div>
        </Stack>
      </main>
    );
  }

  const user = scoreQuiz({
    quiz: QUIZ,
    responses: decoded.responses,
    profileId: `web_${r}`,
    completedAt: new Date(0).toISOString(),
  });

  // Shared with buildResultSnapshot.ts (Phase 10C) — see resultView.ts's own
  // doc comment for why this is now ONE orchestration both callers use,
  // rather than two independently-written call sequences that merely
  // happened to agree.
  const { results, greatness, signature, highlights, resultArchetype, advantage } = computeResultView(user, SEED_PEOPLE);
  const closest = results.closest;
  const peopleById = new Map(SEED_PEOPLE.map((p) => [p.id, p]));

  return (
    <main className="tgi-container" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
      {/* Stage 7E: mirrors this valid, successfully-decoded token to
          localStorage so a later visit to any person page can offer
          "Compare yourself with this person" — see SaveLastResult.tsx and
          CompareCta.tsx. Written but never rendered anywhere at Phase 7's
          provisional checkpoint; this is that wiring. Invisible, no layout
          effect. */}
      <SaveLastResult token={r!} />
      <Stack gap={7}>
        {/* ============================================================ 1. hero */}
        {/* Phase 10D-3: at >=1280px the score/band identity pairs with the
            archetype interpretation + explainer as a restrained secondary
            column (same `.tgi-rail--tight` pattern Landing/Person already
            use), instead of the whole thing sitting alone in a 40rem column
            with nothing beside it. Below 1280px, `Rail` collapses and this
            renders in the exact same top-to-bottom order as before. The
            archetype callout is deliberately NOT a Card here — tried as a
            plain accent-rule note first (typography/spacing, per the
            project's anti-AI-template principle), confirmed sufficient by
            screenshot inspection; see CLAUDE.md's Phase 10D-3 section for
            the reasoning if this is ever reconsidered. */}
        <section>
          <Rail
            className="tgi-rail--tight"
            primary={
              <Stack gap={5} className="tgi-measure-stack">
                <Eyebrow>{t(locale, "site.name")}</Eyebrow>
                <Display>{t(locale, "results.hero.title")}</Display>
                <Stack gap={2}>
                  <Text tone="secondary">{t(locale, "label.greatness_potential")}</Text>
                  <div className="tgi-hero-score">
                    <Numeric>
                      <span className="tgi-hero-score__value">{formatPotential(greatness.score)}</span>
                    </Numeric>
                  </div>
                  <Text tone="muted">{t(locale, `greatness.band.${greatness.bandId}` as MessageKey)}</Text>
                </Stack>
              </Stack>
            }
            secondary={
              <Stack gap={4}>
                {resultArchetype ? (
                  <div
                    style={{
                      borderLeft: "3px solid var(--tgi-accent)",
                      paddingLeft: "var(--tgi-space-4)",
                    }}
                  >
                    <Stack gap={1}>
                      <Text tone="secondary">
                        <strong>{t(locale, `archetype_result.${resultArchetype}` as MessageKey)}</strong>
                      </Text>
                      <Text tone="muted">{t(locale, `archetype_result.${resultArchetype}.body` as MessageKey)}</Text>
                    </Stack>
                  </div>
                ) : null}
                <Text tone="muted">{t(locale, "result.greatness.explainer")}</Text>
              </Stack>
            }
          />
        </section>

        <Divider />

        {/* ================================================ 2. closest match */}
        {closest ? (
          <Stack gap={4} as="section">
            <Heading level={2}>{t(locale, "label.closest_match")}</Heading>
            <Card variant="feature">
              <Stack gap={4}>
                {/* Phase 10D-1: extracted into IdentityHero — see that
                    file's doc comment. Rendered output unchanged. */}
                <IdentityHero {...(closest.person.portrait ? { portraitUrl: closest.person.portrait.url } : {})}>
                  <Stack gap={2}>
                    <Heading level={3} className="tgi-person-name">{personDisplayName(locale, closest.person)}</Heading>
                    <Text tone="muted">
                      {[
                        occupationLabel(locale, closest.person.occupationIds[0]),
                        t(locale, `era.${closest.person.era}` as MessageKey),
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </Text>
                    <div>
                      <span className="tgi-personcard__match-value tgi-numeric">{formatMatch(closest.overallMatch)}</span>{" "}
                      <span className="tgi-text--muted">{t(locale, "label.profile_match")}</span>
                    </div>
                  </Stack>
                </IdentityHero>
                {(() => {
                  const line = closestMatchExplanation(locale, closest.closestTraits, personDisplayName(locale, closest.person));
                  return line ? <Text tone="secondary">{line}</Text> : null;
                })()}
                <Cluster gap={3}>
                  <Button href={`/${locale}/people/${closest.person.slug}`}>
                    {t(locale, "results.cta.view_profile")}
                  </Button>
                  <Button variant="secondary" href={`#comparison`}>
                    {t(locale, "results.cta.full_comparison")}
                  </Button>
                  {/* Stage 7E: the Phase 7 "You x [Person]" comparison route.
                      `compare.cta.from_results` was authored provisionally
                      but never rendered anywhere — this is that wiring. */}
                  <Button
                    variant="quiet"
                    href={`/${locale}/compare/${closest.person.slug}?r=${encodeURIComponent(r!)}`}
                  >
                    {t(locale, "compare.cta.from_results", { person: personDisplayName(locale, closest.person) })}
                  </Button>
                </Cluster>
              </Stack>
            </Card>
          </Stack>
        ) : null}

        {/* Phase 10C: signed-out save-to-account CTA. After the top hero +
            closest-match summary, before the deeper match sections below —
            per the approved design. Never gates any result; renders
            alongside the full page regardless of sign-in state. */}
        <div className="tgi-measure-stack">
          <SignInCta locale={locale} resultToken={r!} />
        </div>

        {/* ==================================== 3/4. unexpected + opposite */}
        {/* Phase 10D-3: `Card` here previously had no width constraint, so
            the single PersonCard inside it filled the whole container
            (measured 1148px wide at 1920px before the width-cap fix) and
            its 4:5 portrait/placeholder aspect-ratio scaled into a
            1435px-tall block — the same defect class as Person's Opposite
            Profile bug. `PersonCard`/`Card` themselves are unchanged; only
            this page's own wrapper caps each card, so Person/Compare/the
            directory are unaffected.

            Follow-up (same stage, after visual review): once both cards
            were individually capped at ≥1280px, each left a large unused
            region beside it — Unexpected Match and Opposite Profile are
            semantic peers (both single-person spotlight moments), so they
            now pair into one shared row via `.tgi-results-spotlight-pair`
            ONLY when BOTH are real matches. Each card stays capped at its
            own 24rem width inside the pair — the row uses `minmax(0,24rem)`
            tracks, never `1fr`, specifically so pairing them never stretches
            either card to fill a column. Below 1280px this class does
            nothing, so both sections stack in their original order.

            When Unexpected has no real match (the "no unexpected match"
            empty state), it is NOT paired with Opposite Profile — pairing a
            short empty-state message against a full PersonCard would be
            exactly the "awkward empty half-column" the review flagged.
            Opposite Profile instead renders as the same controlled single
            spotlight it already was before pairing existed. */}
        {(() => {
          const unexpectedBlock = (
            <Stack gap={4} as="section">
              <Heading level={2}>{t(locale, "label.unexpected_match")}</Heading>
              {results.unexpected ? (
                <div style={{ maxWidth: "24rem" }}>
                  <Card>
                    <Stack gap={3}>
                      <PersonCard
                        name={personDisplayName(locale, results.unexpected.person)}
                        {...(results.unexpected.person.occupationIds[0]
                          ? { subtitle: t(locale, `occupation.${results.unexpected.person.occupationIds[0]}` as MessageKey) }
                          : {})}
                        lifespan={formatLifespan(
                          results.unexpected.person.birthYear,
                          results.unexpected.person.deathYear,
                          results.unexpected.person.isLiving,
                        )}
                        href={`/${locale}/people/${results.unexpected.person.slug}`}
                        match={results.unexpected.overallMatch}
                        locale={locale}
                        {...(results.unexpected.person.portrait
                          ? { portraitUrl: results.unexpected.person.portrait.url }
                          : {})}
                      />
                      <Text tone="secondary">{t(locale, "result.unexpected.framing")}</Text>
                    </Stack>
                  </Card>
                </div>
              ) : (
                <Card variant="sunken" className="tgi-measure-stack">
                  <Stack gap={2}>
                    <Text tone="secondary">{t(locale, "results.unexpected.none.title")}</Text>
                    <Text tone="muted">{t(locale, "results.unexpected.none.body")}</Text>
                  </Stack>
                </Card>
              )}
            </Stack>
          );

          const oppositeBlock = results.opposite ? (
            <Stack gap={4} as="section">
              <Heading level={2}>{t(locale, "label.opposite_profile")}</Heading>
              <div style={{ maxWidth: "24rem" }}>
                <Card>
                  <Stack gap={3}>
                    <PersonCard
                      name={personDisplayName(locale, results.opposite.person)}
                      {...(results.opposite.person.occupationIds[0]
                        ? { subtitle: t(locale, `occupation.${results.opposite.person.occupationIds[0]}` as MessageKey) }
                        : {})}
                      lifespan={formatLifespan(
                        results.opposite.person.birthYear,
                        results.opposite.person.deathYear,
                        results.opposite.person.isLiving,
                      )}
                      href={`/${locale}/people/${results.opposite.person.slug}`}
                      match={results.opposite.overallMatch}
                      locale={locale}
                      {...(results.opposite.person.portrait ? { portraitUrl: results.opposite.person.portrait.url } : {})}
                    />
                    <Text tone="muted">{t(locale, "result.opposite.framing")}</Text>
                  </Stack>
                </Card>
              </div>
            </Stack>
          ) : null;

          if (results.unexpected && oppositeBlock) {
            return (
              <div className="tgi-results-spotlight-pair">
                {unexpectedBlock}
                {oppositeBlock}
              </div>
            );
          }
          return (
            <>
              {unexpectedBlock}
              {oppositeBlock}
            </>
          );
        })()}

        <Divider />

        {/* ======================================= 5/6. signature + dual-edged */}
        {/* Phase 10D-3: these are two peer TraitCards (same component, same
            visual weight), not a primary/secondary relationship — deliberately
            NOT `Rail` (whose secondary column is capped narrow specifically to
            look subordinate) but a small Results-scoped equal-width pairing,
            `.tgi-results-trait-pair`, active only at >=1280px and only when
            BOTH sections exist. When only one exists, it falls through to the
            exact original single `.tgi-measure-stack` treatment — already a
            controlled width, so there is no "empty second column" or
            "stretched card" case to guard against; the absent branch simply
            never enters the paired layout. Below 1280px both branches render
            identically to the pre-10D-3 stacked flow. */}
        {(() => {
          const dualEdged = greatness.dualEdgedContributors[0];
          const signatureBlock = signature ? (
            <Stack gap={3} className="tgi-measure-stack" as="section">
              <Heading level={2}>{t(locale, "label.signature_trait")}</Heading>
              <TraitCard
                label={attributeName(locale, signature.attributeId)}
                score={signature.score}
                impact="neutral"
                confidence={user.confidence[signature.attributeId]}
                locale={locale}
                context={`${t(locale, "results.signature_trait.explain", {
                  refMean: Math.round(ATTRIBUTES[signature.attributeId].reference.mean),
                  score: Math.round(signature.score),
                })} ${t(locale, "results.signature_trait.not_inherently_positive")}`}
              />
            </Stack>
          ) : null;
          const dualEdgedBlock = dualEdged ? (
            <Stack gap={3} className="tgi-measure-stack" as="section">
              <Heading level={2}>{t(locale, "label.dual_edged_trait")}</Heading>
              <TraitCard
                label={attributeName(locale, dualEdged.attributeId)}
                score={dualEdged.score}
                impact="dual_edged"
                confidence={user.confidence[dualEdged.attributeId]}
                locale={locale}
                edge={t(locale, "results.dual_edged.powerful_when")}
                cost={t(locale, "results.dual_edged.watch_for")}
              />
            </Stack>
          ) : null;

          if (signatureBlock && dualEdgedBlock) {
            return (
              <div className="tgi-results-trait-pair">
                {signatureBlock}
                {dualEdgedBlock}
              </div>
            );
          }
          return (
            <>
              {signatureBlock}
              {dualEdgedBlock}
            </>
          );
        })()}

        <Divider />

        {/* ============================================= 7. category matches */}
        {/* Phase 10D-3 mobile follow-up: `.tgi-results-discovery-grid`
            switches to 2 columns below 480px (see components.css) — at
            390px the default `Grid min="14rem"` auto-fit collapses to 1
            column, and with 7 cards that measured 4271px tall on its own
            (of a 13242px total page height for the neutral fixture). All
            person metadata (name/subtitle/lifespan/match%) is preserved;
            only the column count and internal card padding change. `Grid`
            itself is untouched — this is a page-scoped modifier class, so
            Person/Compare/the directory's use of `Grid` is unaffected. */}
        <Stack gap={4} as="section">
          <Heading level={2}>{t(locale, "results.section.category_matches")}</Heading>
          <Grid min="14rem" className="tgi-results-discovery-grid">
            {FACETS.map((facet) => {
              const cm = results.categoryMatches.find((c) => c.facet === facet);
              const p = cm ? peopleById.get(cm.personId) : undefined;
              if (!cm || !p) return null;
              return (
                <PersonCard
                  key={facet}
                  name={personDisplayName(locale, p)}
                  subtitle={t(locale, `facet.match.${facet}` as MessageKey)}
                  href={`/${locale}/people/${p.slug}`}
                  match={cm.match}
                  locale={locale}
                  {...(p.portrait ? { portraitUrl: p.portrait.url } : {})}
                />
              );
            })}
          </Grid>
        </Stack>

        <Divider />

        {/* ================================================= 8. trait profile */}
        <Stack gap={4} as="section">
          <Heading level={2}>{t(locale, "results.section.trait_profile")}</Heading>
          <Text tone="muted">{t(locale, "results.section.trait_profile.intro")}</Text>

          <Stack gap={3}>
            <Heading level={3}>{t(locale, "results.trait_profile.highlights")}</Heading>
            <Cluster gap={2}>
              {highlights.map((h) => (
                <TraitChip key={h.attributeId} label={attributeName(locale, h.attributeId)} score={h.score} locale={locale} />
              ))}
            </Cluster>
          </Stack>

          <details>
            <summary>
              <Text tone="secondary">{t(locale, "results.trait_profile.all")}</Text>
            </summary>
            <Stack gap={6} className="tgi-details-body">
              {FACETS.map((facet) => {
                const ids = [...ATTRIBUTES_BY_FACET[facet]].sort((a, b) => {
                  const za = Math.abs((user.scores[a] - ATTRIBUTES[a].reference.mean) / ATTRIBUTES[a].reference.sd);
                  const zb = Math.abs((user.scores[b] - ATTRIBUTES[b].reference.mean) / ATTRIBUTES[b].reference.sd);
                  return zb - za;
                });
                return (
                  <Stack gap={3} key={facet}>
                    <Heading level={3}>{t(locale, `facet.${facet}` as MessageKey)}</Heading>
                    <Stack gap={3}>
                      {ids.map((id) => (
                        <ScoreBar
                          key={id}
                          label={attributeName(locale, id)}
                          score={user.scores[id]}
                          locale={locale}
                          trailing={<ConfidenceIndicator confidence={user.confidence[id]} locale={locale} showLabel={false} />}
                        />
                      ))}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </details>
        </Stack>

        <Divider />

        {/* ======================================== 9. closest-match comparison */}
        {/* Phase 10D-3: `#comparison` (linked from the closest-match card's
            "See Full Comparison" button) stays on the outermost wrapper,
            unchanged. Below the wide breakpoint, `.tgi-measure-stack` on
            each block keeps every part of this section centered exactly as
            before, in the same source order as before. At >=1280px, You
            Both pairs with Your Advantage (when it exists) via the same
            equal-weight `.tgi-results-trait-pair`... actually these two are
            NOT peers (You Both is the primary comparison, Your Advantage is
            a shorter supporting note), so this reuses `Rail` instead —
            `.tgi-rail--tight`, same as the hero. When Your Advantage is
            absent, You Both renders alone at its normal controlled width;
            no empty rail is ever created. Where You Differ becomes its own
            wider section afterward — it already lays out two columns
            internally (`Grid`) and benefits from the extra room a capped
            measure-stack was denying it. This reorders Your Advantage to
            sit right after You Both instead of last — a deliberate editorial
            grouping ("what you share, where you lead" before the more
            detailed differences), applied at every width since a real DOM
            reorder can't be conditional on viewport without either
            duplicating content or faking it with CSS `order` (which this
            project's Rail contract already rules out). */}
        {closest ? (
          <div id="comparison">
          <Stack gap={5} as="section">
            <Heading level={2}>{t(locale, "results.section.comparison", { person: personDisplayName(locale, closest.person) })}</Heading>

            {(() => {
              const youBothBlock =
                closest.closestTraits.length > 0 ? (
                  <Stack gap={3} className="tgi-measure-stack">
                    <Heading level={3}>{t(locale, "label.you_both")}</Heading>
                    <Stack gap={4}>
                      {closest.closestTraits.slice(0, 4).map((c) => (
                        <ComparisonBar
                          key={c.attributeId}
                          label={attributeName(locale, c.attributeId)}
                          userScore={c.userScore}
                          personScore={c.personScore}
                          personName={personDisplayName(locale, closest.person)}
                          locale={locale}
                        />
                      ))}
                    </Stack>
                  </Stack>
                ) : null;

              const advantageBlock =
                advantage.length > 0 ? (
                  <Stack gap={3} className="tgi-measure-stack">
                    <Heading level={3}>{t(locale, "label.your_advantage")}</Heading>
                    <Stack gap={2}>
                      {advantage.map((c) => (
                        <Text tone="secondary" key={c.attributeId}>
                          {t(locale, "tpl.advantage_intro", {
                            trait: attributeName(locale, c.attributeId),
                            person: personDisplayName(locale, closest.person),
                          })}
                        </Text>
                      ))}
                    </Stack>
                  </Stack>
                ) : null;

              if (youBothBlock && advantageBlock) {
                return <Rail className="tgi-rail--tight" primary={youBothBlock} secondary={advantageBlock} />;
              }
              return (
                <>
                  {youBothBlock}
                  {advantageBlock}
                </>
              );
            })()}

            {closest.userHigherTraits.length > 0 || closest.personHigherTraits.length > 0 ? (
              <Stack gap={4}>
                <Heading level={3}>{t(locale, "label.where_you_differ")}</Heading>
                <Grid min="18rem">
                  {closest.userHigherTraits.length > 0 ? (
                    <Stack gap={3}>
                      <Text tone="secondary">{t(locale, "results.comparison.user_higher")}</Text>
                      <Stack gap={4}>
                        {closest.userHigherTraits.slice(0, 3).map((c) => (
                          <ComparisonBar
                            key={c.attributeId}
                            label={attributeName(locale, c.attributeId)}
                            userScore={c.userScore}
                            personScore={c.personScore}
                            personName={personDisplayName(locale, closest.person)}
                            locale={locale}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}
                  {closest.personHigherTraits.length > 0 ? (
                    <Stack gap={3}>
                      <Text tone="secondary">
                        {t(locale, "results.comparison.person_higher", { person: personDisplayName(locale, closest.person) })}
                      </Text>
                      <Stack gap={4}>
                        {closest.personHigherTraits.slice(0, 3).map((c) => (
                          <ComparisonBar
                            key={c.attributeId}
                            label={attributeName(locale, c.attributeId)}
                            userScore={c.userScore}
                            personScore={c.personScore}
                            personName={personDisplayName(locale, closest.person)}
                            locale={locale}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}
                </Grid>
                <Text tone="muted">{t(locale, "results.comparison.reassurance")}</Text>
              </Stack>
            ) : null}
          </Stack>
          </div>
        ) : null}

        <Divider />

        {/* ===================================================== 10. top matches */}
        {results.top10.length > 1 ? (
          <Stack gap={4} as="section">
            <Heading level={2}>{t(locale, "results.section.top_matches")}</Heading>
            <Grid min="14rem" className="tgi-results-discovery-grid">
              {results.top10.slice(1, 6).map((m) => (
                <PersonCard
                  key={m.personId}
                  name={personDisplayName(locale, m.person)}
                  {...(m.person.occupationIds[0]
                    ? { subtitle: t(locale, `occupation.${m.person.occupationIds[0]}` as MessageKey) }
                    : {})}
                  lifespan={formatLifespan(m.person.birthYear, m.person.deathYear, m.person.isLiving)}
                  href={`/${locale}/people/${m.person.slug}`}
                  match={m.overallMatch}
                  locale={locale}
                  {...(m.person.portrait ? { portraitUrl: m.person.portrait.url } : {})}
                />
              ))}
            </Grid>
          </Stack>
        ) : null}

        <Divider />

        {/* ============================================== 11. how calculated */}
        <Stack gap={3} className="tgi-measure-stack" as="section">
          <details>
            <summary>
              <Heading level={3} className="tgi-inline-heading">
                {t(locale, "results.method.toggle")}
              </Heading>
            </summary>
            <Stack gap={3} className="tgi-details-body">
              <Text tone="secondary">{t(locale, "results.method.intro")}</Text>
              <Stack gap={2} as="ul">
                <li>
                  <Text tone="secondary">{t(locale, "results.method.step1")}</Text>
                </li>
                <li>
                  <Text tone="secondary">{t(locale, "results.method.step2")}</Text>
                </li>
                <li>
                  <Text tone="secondary">{t(locale, "results.method.step3")}</Text>
                </li>
                <li>
                  <Text tone="secondary">{t(locale, "results.method.step4")}</Text>
                </li>
                <li>
                  <Text tone="secondary">{t(locale, "results.method.step5")}</Text>
                </li>
              </Stack>
            </Stack>
          </details>
        </Stack>

        <Cluster gap={3}>
          <Button variant="secondary" href={`/${locale}/quiz`}>
            {t(locale, "results.cta.retake")}
          </Button>
          <Button variant="quiet" href={`/${locale}/people`}>
            {t(locale, "person.back_to_people")}
          </Button>
        </Cluster>
      </Stack>
    </main>
  );
}
