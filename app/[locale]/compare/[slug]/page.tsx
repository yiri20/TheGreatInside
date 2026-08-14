import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ATTRIBUTES, ATTRIBUTES_BY_FACET, FACETS } from "@core/attributes/attributes";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { personDisplayName, t, type MessageKey } from "@core/i18n/index";
import { QUIZ } from "@core/quiz/bank";
import { decodeResultToken } from "@core/quiz/serialize";
import { scoreQuiz } from "@core/quiz/scoring";
import { SEED_PEOPLE } from "@data/people/seed";
import { matchUserToPerson } from "@core/matching/similarity";
import { advantageTraits, attributeName } from "@core/interpretation/rules";
import {
  helpsWhenKey,
  selectDoNotCopy,
  selectLearnFromSuggestions,
  selectWorthExploring,
} from "@core/interpretation/targetComparison";
import {
  Button,
  Card,
  Cluster,
  ComparisonBar,
  Divider,
  Eyebrow,
  formatLifespan,
  formatMatch,
  formatScore,
  Heading,
  IdentityHero,
  ScoreBar,
  Stack,
  Text,
} from "@ui/index";
import { TargetSwitcher } from "./TargetSwitcher";

interface PageParams {
  locale: string;
  slug: string;
}
interface PageSearchParams {
  r?: string;
}

/** PHASE 8: replaces the old `humanize(id)` placeholder — see
 *  results/page.tsx's `occupationLabel` for the full rationale. */
function occupationLabel(locale: Locale, occupationId: string | undefined): string | undefined {
  return occupationId ? t(locale, `occupation.${occupationId}` as MessageKey) : undefined;
}

function personBySlug(slug: string) {
  return SEED_PEOPLE.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = LAUNCH_LOCALES.includes(localeParam as Locale) ? (localeParam as Locale) : "en-US";
  const person = personBySlug(slug);
  return {
    title: person ? `You × ${personDisplayName(locale, person)} — The Great Inside` : "Compare — The Great Inside",
  };
}

export default async function ComparePage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<PageSearchParams>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!LAUNCH_LOCALES.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;

  const target = personBySlug(slug);
  if (!target || !target.isMatchEligible) {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Heading level={1}>{t(locale, "compare.person_not_found.title")}</Heading>
          <div>
            <Button size="lg" href={`/${locale}/people`}>
              {t(locale, "compare.person_not_found.cta")}
            </Button>
          </div>
        </Stack>
      </main>
    );
  }

  // PHASE 8K: presentation-only localized name — used everywhere `target`'s
  // name is shown or interpolated below. Never affects matching/selectors,
  // which all still read `target` itself untouched.
  const targetName = personDisplayName(locale, target);

  const { r } = await searchParams;
  const decoded = r ? decodeResultToken(decodeURIComponent(r), QUIZ) : undefined;

  if (!decoded) {
    return (
      <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Heading level={1}>{t(locale, "compare.invalid.title", { person: targetName })}</Heading>
          <Text tone="secondary">{t(locale, "compare.invalid.body")}</Text>
          <div>
            <Button size="lg" href={`/${locale}/quiz`}>
              {t(locale, "compare.invalid.cta")}
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

  // Phase 7 human-review Stage: `breakdownSize` raised from the 5-item
  // default. Found live, not assumed: `largestDifferences` mixes BOTH
  // directions into one top-N-by-contribution list, while
  // `personHigherTraits`/`userHigherTraits` each get their OWN top-N
  // *within* their direction — so a real, meaningfully-scored attribute
  // (e.g. Benjamin Franklin's resourcefulness, a genuine 25-point gap) could
  // appear in section 2 ("Where You Lean Differently", built from
  // `personHigherTraits`) while being silently crowded out of
  // `largestDifferences` by unrelated, larger-contribution differences —
  // and therefore invisible to `selectLearnFromSuggestions`/
  // `selectWorthExploring`/`advantageTraits`, which all read
  // `largestDifferences` specifically. 15 gives those selectors enough room
  // to find genuine candidates without turning "largest differences" into
  // "every difference" (34 attributes total, `MEANINGFUL_DELTA`=12 is a
  // fairly low bar). Every display-facing array here still slices to 3-4 in
  // JSX/selector `limit` params, so the TOP entries shown are unchanged —
  // this only recovers entries that were being cut off before reaching any
  // selector, confirmed by reproducing the Franklin case live before this
  // fix and confirming it resolves after.
  const result = matchUserToPerson(user, target, { breakdownSize: 15 });
  const learnFrom = selectLearnFromSuggestions(result.largestDifferences, 3);
  // Phase 7 human-review Stage (Issue 1): the non-prescriptive fallback for
  // `contextual`-shaped differences `learnFrom` structurally can't surface.
  const worthExploring = selectWorthExploring(result.largestDifferences, 2);
  // Phase 7 human-review Stage (Issue 3): 3 -> 2. With trait-specific cost
  // content now attached (`costKey`, see below), 2 well-differentiated
  // cautions read as more credible/curated than 3 that risked repeating the
  // same generic sentence when several attributes independently qualified
  // as "extreme" for one exceptional person.
  // Phase 7 human-review Stage (Issue 3): now takes the user's own scores —
  // extreme_score/shape_mismatch items only fire when the target is
  // MEANINGFULLY on the extreme side relative to the user (see
  // targetComparison.ts for the full rationale: a trait the user already
  // matches or exceeds isn't something to "copy" from the target).
  const doNotCopy = selectDoNotCopy(target, user.scores, 2);
  // Stage 7B: the same shape-gated selector the results page already uses
  // for "label.your_advantage" ("Where You Bring Something Different") —
  // not the raw `userHigherTraits`, so a numeric edge on a `contextual`-
  // shaped attribute (where "higher" carries no general claim) never gets
  // framed as something to celebrate. Keeps this section's semantics
  // identical to the results page's use of the same heading.
  const yourEdge = advantageTraits(result.largestDifferences, 3);
  const eligiblePeople = SEED_PEOPLE.filter((p) => p.isMatchEligible);

  return (
    <main className="tgi-container" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
      <Stack gap={7}>
        {/* ==================================================================== hero */}
        <Stack gap={5} as="section">
          <Eyebrow>{t(locale, "compare.hero.eyebrow", { person: targetName })}</Eyebrow>
          {/* Phase 10D-1: extracted into IdentityHero — see that file's doc
              comment. Rendered output unchanged. */}
          <IdentityHero {...(target.portrait ? { portraitUrl: target.portrait.url } : {})}>
            <Stack gap={2}>
              <Heading level={1} className="tgi-person-name">{targetName}</Heading>
              <Text tone="muted">
                {[occupationLabel(locale, target.occupationIds[0]), t(locale, `era.${target.era}` as MessageKey)]
                  .filter(Boolean)
                  .join(" · ")}
                {" · "}
                {formatLifespan(target.birthYear, target.deathYear, target.isLiving)}
              </Text>
              <div>
                <span className="tgi-numeric tgi-hero-score__value" style={{ fontSize: "var(--tgi-text-2xl)" }}>
                  {formatMatch(result.overallMatch)}
                </span>{" "}
                <span className="tgi-text--muted">{t(locale, "label.profile_match")}</span>
              </div>
            </Stack>
          </IdentityHero>
        </Stack>

        <Divider />

        {/* ================================== 1-2. what you share / where you lean differently */}
        {/* Phase 10D-4 first round: these two are adjacent, identical-shape
            peer sections (both a heading + a list of ComparisonBars) — paired
            as equal-width columns via `.tgi-compare-share-differ` at
            >=1280px, single column below (no CSS `order`, source order
            preserved). Only paired when BOTH exist; when either is
            independently empty, the other renders alone in its original
            `.tgi-measure-stack` treatment so there's never a half-empty
            column. */}
        {(() => {
          const shareBlock =
            result.closestTraits.length > 0 ? (
              <Stack gap={4} className="tgi-measure-stack" as="section">
                <Heading level={2}>{t(locale, "compare.section.share")}</Heading>
                <Stack gap={4}>
                  {result.closestTraits.slice(0, 4).map((c) => (
                    <ComparisonBar
                      key={c.attributeId}
                      label={attributeName(locale, c.attributeId)}
                      userScore={c.userScore}
                      personScore={c.personScore}
                      personName={targetName}
                      locale={locale}
                    />
                  ))}
                </Stack>
              </Stack>
            ) : null;

          const differBlock =
            result.personHigherTraits.length > 0 ? (
              <Stack gap={4} className="tgi-measure-stack" as="section">
                <Heading level={2}>{t(locale, "compare.section.differ")}</Heading>
                <Stack gap={4}>
                  {result.personHigherTraits.slice(0, 4).map((c) => (
                    <ComparisonBar
                      key={c.attributeId}
                      label={attributeName(locale, c.attributeId)}
                      userScore={c.userScore}
                      personScore={c.personScore}
                      personName={targetName}
                      locale={locale}
                    />
                  ))}
                </Stack>
                <Text tone="muted">{t(locale, "results.comparison.reassurance")}</Text>
              </Stack>
            ) : null;

          if (shareBlock && differBlock) {
            return <div className="tgi-compare-share-differ">{shareBlock}{differBlock}</div>;
          }
          return (
            <>
              {shareBlock}
              {differBlock}
            </>
          );
        })()}

        <Divider />

        {/* ============================================== 3. what you could learn from them */}
        {/* Phase 10D-4 first round: no longer one blanket `.tgi-measure-stack`
            wrapping the whole section — the heading/intro/empty-state prose
            stays at a readable measure (each individually classed), while
            the two card collections below get `.tgi-compare-card-grid`
            instead, so they can use the wider container at >=1280px without
            the surrounding prose becoming full-width too. */}
        <Stack gap={4} as="section">
          <Stack gap={4} className="tgi-measure-stack">
            <Heading level={2}>{t(locale, "compare.section.learn")}</Heading>
            <Text tone="muted">{t(locale, "compare.learn.intro", { person: targetName })}</Text>
          </Stack>
          {learnFrom.length === 0 && worthExploring.length === 0 ? (
            <Stack className="tgi-measure-stack">
              <Text tone="secondary">{t(locale, "compare.learn.none")}</Text>
            </Stack>
          ) : (
            <Stack gap={4} className="tgi-compare-card-grid">
              {learnFrom.map((s) => (
                <Card key={s.attributeId}>
                  <Stack gap={3}>
                    <Text>
                      <strong>{attributeName(locale, s.attributeId)}</strong>
                    </Text>
                    <ComparisonBar
                      label={attributeName(locale, s.attributeId)}
                      userScore={s.userScore}
                      personScore={s.targetScore}
                      personName={targetName}
                      locale={locale}
                    />
                    <Stack gap={1}>
                      <Text tone="secondary">{t(locale, "compare.learn.try")}</Text>
                      <Stack gap={1} as="ul">
                        {s.guide.experimentKeys.map((key) => (
                          <li key={key}>
                            <Text tone="secondary">{t(locale, key as MessageKey)}</Text>
                          </li>
                        ))}
                      </Stack>
                    </Stack>
                    {s.guide.cautionKeys.length > 0 ? (
                      <Stack gap={1}>
                        <Text tone="muted">{t(locale, "compare.learn.watch_for")}</Text>
                        <Text tone="muted">{t(locale, s.guide.cautionKeys[0] as MessageKey)}</Text>
                      </Stack>
                    ) : null}
                  </Stack>
                </Card>
              ))}
            </Stack>
          )}
          {/* Phase 7 human-review Stage (Issue 1): "Worth Exploring" —
              non-prescriptive, for `contextual`-shaped differences `learnFrom`
              structurally excludes. Deliberately a distinct sub-block, not
              blended into the cards above: it answers a different question
              ("this difference exists and is worth noticing") than the
              prescriptive "Try:" cards above ("here's an experiment"), and
              keeping them visually separate preserves that distinction for
              the reader instead of quietly merging two different kinds of
              claim. See targetComparison.ts's selectWorthExploring for the
              full rationale on why only the caution (never the experiments)
              is shown. */}
          {worthExploring.length > 0 ? (
            <Stack gap={3}>
              <Stack gap={3} className="tgi-measure-stack">
                <Text>
                  <strong>{t(locale, "compare.explore.title")}</strong>
                </Text>
                <Text tone="muted">{t(locale, "compare.explore.intro")}</Text>
              </Stack>
              <Stack gap={4} className="tgi-compare-card-grid">
                {worthExploring.map((s) => (
                  <Card key={s.attributeId} variant="sunken">
                    <Stack gap={3}>
                      <Text>
                        <strong>{attributeName(locale, s.attributeId)}</strong>
                      </Text>
                      <ComparisonBar
                        label={attributeName(locale, s.attributeId)}
                        userScore={s.userScore}
                        personScore={s.targetScore}
                        personName={targetName}
                        locale={locale}
                      />
                      <Text tone="secondary">
                        {t(locale, "compare.explore.note", {
                          trait: attributeName(locale, s.attributeId),
                          person: targetName,
                        })}
                      </Text>
                      {/* Phase 7 human-review Stage, revised again (Issue 5
                          second pass): two-sided, deterministic — what the
                          target's higher pole can enable (helpsWhenKey)
                          paired with what the user's own current, lower pole
                          genuinely protects (preservesKey — a dedicated
                          content set, not the dev-guide caution corpus,
                          which answered the wrong question here: it's banded
                          by absolute score for a different purpose, and its
                          MEDIUM-band text in particular was never written to
                          defend a low pole. See PRESERVES_ATTRIBUTE_IDS in
                          targetComparison.ts). Neither recommends the user
                          raise the trait. */}
                      <Stack gap={1}>
                        <Text tone="muted">{t(locale, "compare.explore.helps_when_label")}</Text>
                        <Text tone="muted">{t(locale, s.helpsWhenKey as MessageKey)}</Text>
                      </Stack>
                      <Stack gap={1}>
                        <Text tone="muted">{t(locale, "compare.explore.preserves_label")}</Text>
                        <Text tone="muted">{t(locale, s.preservesKey as MessageKey)}</Text>
                      </Stack>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Stack>
          ) : null}
        </Stack>

        <Divider />

        {/* ================== 4-5. where you bring something different / what not to copy */}
        {/* Phase 10D-4 second round, Experiment 1: pair these two secondary
            reflective sections at >=1280px when BOTH are meaningfully
            present. Unlike Share/Differ, "What Not to Copy" is never fully
            absent (it falls back to an empty-state sentence rather than
            disappearing) — so the only real absent case is `yourEdge`; when
            that's empty, "What Not to Copy" renders alone in its ORIGINAL
            single-column treatment, exactly as before. Deliberately does
            NOT flatten the caution `Card`s here — this experiment is
            testing whether the natural asymmetry (plain bars+prose on one
            side, cards on the other) already reads as a coherent pair
            before touching either side's internal treatment. */}
        {(() => {
          const yourEdgeBlock =
            yourEdge.length > 0 ? (
              <Stack gap={4} className="tgi-measure-stack" as="section">
                <Heading level={2}>{t(locale, "label.your_advantage")}</Heading>
                <Stack gap={4}>
                  {yourEdge.map((c) => (
                    <Stack gap={2} key={c.attributeId}>
                      <ComparisonBar
                        label={attributeName(locale, c.attributeId)}
                        userScore={c.userScore}
                        personScore={c.personScore}
                        personName={targetName}
                        locale={locale}
                      />
                      {/* Phase 7 human-review Stage, revised (Issue 2): the
                          generic "may work in your favour" sentence (reused from
                          tpl.advantage_intro) still read as advantage framing and
                          repeated near-identically across every trait. Replaced
                          with the SAME per-attribute helpsWhenKey content
                          "Worth Exploring" uses (Issue 5) — one concise,
                          trait-specific, deterministic sentence naming the
                          CONDITION under which the tendency helps, not a claim
                          that having it is simply better. */}
                      <Text tone="secondary">{t(locale, helpsWhenKey(c.attributeId) as MessageKey)}</Text>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            ) : null;

          const dontCopyBlock = (
            <Stack gap={4} className="tgi-measure-stack" as="section">
              <Heading level={2}>{t(locale, "compare.section.dont_copy")}</Heading>
              <Text tone="muted">{t(locale, "compare.dontcopy.intro")}</Text>
              {doNotCopy.length === 0 ? (
                <Text tone="secondary">{t(locale, "compare.dontcopy.none")}</Text>
              ) : (
                <Stack gap={3}>
                  {doNotCopy.map((item, i) => (
                    <Card key={`${item.reason}-${item.attributeId ?? i}`} variant="sunken">
                      <Stack gap={2}>
                        {/* Phase 7 human-review Stage, revised (Issue 3/4): when
                            a neutral, trait-specific `tradeoffKey` exists, it IS
                            the primary content — the generic "sits at an
                            extreme... carries real costs" preamble is dropped
                            entirely rather than shown alongside it, per the
                            explicit instruction that the trait-specific caution
                            should be primary, not a second line after a generic
                            one. `tradeoffKey` content is deliberately NEUTRAL and
                            THIRD-PERSON (a separate authored set from the
                            second-person dev-guide captions, which read as an
                            accusation about the historical person on this
                            surface — see targetComparison.ts). Falls back to the
                            generic sentence only when no tradeoff content is
                            authored yet, or for editorial/risk/dual_edged items,
                            which never carry a tradeoffKey. */}
                        <Text tone="secondary">
                          {item.tradeoffKey
                            ? t(locale, item.tradeoffKey as MessageKey)
                            : item.reason === "editorial"
                              ? t(locale, item.key as MessageKey)
                              : t(locale, item.key as MessageKey, {
                                  trait: attributeName(locale, item.attributeId!),
                                  person: targetName,
                                  score: Math.round(item.score ?? 0),
                                })}
                        </Text>
                        {item.confidence !== undefined && item.confidence < 0.5 ? (
                          <Text tone="muted">{t(locale, "compare.dontcopy.low_confidence_note")}</Text>
                        ) : null}
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              )}
            </Stack>
          );

          if (yourEdgeBlock) {
            return <div className="tgi-compare-edge-dontcopy">{yourEdgeBlock}{dontCopyBlock}</div>;
          }
          return dontCopyBlock;
        })()}

        <Divider />

        {/* ================================================================ facets */}
        {/* Phase 10D-4 second round: a wide-desktop Rail composition (bars
            primary, heading+intro secondary) was prototyped and rejected —
            it broke the "heading precedes its own content" reading order
            below 1280px (Rail always renders primary before secondary in
            DOM order regardless of breakpoint), and the dead space here at
            wide desktop was judged an acceptable, even preferable, trade-off
            against that regression. Deliberately kept exactly as it always
            was — no Rail, no wide-desktop restructuring. */}
        <Stack gap={4} as="section">
          <Heading level={2}>{t(locale, "compare.section.facets")}</Heading>
          {/* Phase 7 human-review Stage (Issue 4): verified via similarity.ts
              before wording this — facetMatches[facet] is
              calibrateMatch(similarityFrom(facetTerms)), a USER<->TARGET
              similarity percentage per facet, NOT a trait-quality/ability
              score. This line and the renamed heading above make that
              explicit; ScoreBar's own rendering (no "%", per CLAUDE.md's
              formatScore-only convention) is intentionally left unchanged
              per "preserve current visual structure". */}
          <Text tone="muted">{t(locale, "compare.facets.intro", { person: targetName })}</Text>
          <Stack gap={3} className="tgi-measure-stack">
            {FACETS.map((facet) => (
              <ScoreBar
                key={facet}
                label={t(locale, `facet.${facet}` as MessageKey)}
                score={result.facetMatches[facet]}
                locale={locale}
              />
            ))}
          </Stack>
        </Stack>

        {/* ======================================================= detailed comparison */}
        <Stack gap={3} className="tgi-measure-stack" as="section">
          <details>
            <summary>
              <Heading level={3} className="tgi-inline-heading">
                {t(locale, "compare.section.detailed")}
              </Heading>
            </summary>
            <Stack gap={6} className="tgi-details-body">
              {FACETS.map((facet) => {
                const ids = ATTRIBUTES_BY_FACET[facet].filter((id) =>
                  target.attributes.some((a) => a.attributeId === id),
                );
                if (ids.length === 0) return null;
                return (
                  <Stack gap={3} key={facet}>
                    <Heading level={3}>{t(locale, `facet.${facet}` as MessageKey)}</Heading>
                    <Stack gap={4}>
                      {ids.map((id) => {
                        const targetAttr = target.attributes.find((a) => a.attributeId === id)!;
                        return (
                          <ComparisonBar
                            key={id}
                            label={attributeName(locale, id)}
                            userScore={user.scores[id]}
                            personScore={targetAttr.score}
                            personName={targetName}
                            locale={locale}
                          />
                        );
                      })}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </details>
        </Stack>

        <Divider />

        <TargetSwitcher locale={locale} token={r!} currentSlug={target.slug} people={eligiblePeople} />

        <Cluster gap={3}>
          <Button variant="secondary" href={`/${locale}/people/${target.slug}`}>
            {t(locale, "results.cta.view_profile")}
          </Button>
          <Button variant="quiet" href={`/${locale}/results?r=${encodeURIComponent(r!)}`}>
            {t(locale, "label.closest_match")}
          </Button>
        </Cluster>
      </Stack>
    </main>
  );
}
