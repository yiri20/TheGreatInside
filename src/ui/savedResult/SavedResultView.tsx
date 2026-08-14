import { ATTRIBUTES_BY_FACET, FACETS } from "../../core/attributes/attributes.js";
import { personDisplayName, t, type MessageKey } from "../../core/i18n/index.js";
import type { Locale } from "../../core/types.js";
import type { ResultSnapshotV1 } from "../../core/results/snapshot.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import {
  Button,
  Card,
  Cluster,
  ComparisonBar,
  ConfidenceIndicator,
  Display,
  Divider,
  Eyebrow,
  formatMatch,
  formatPotential,
  Grid,
  Heading,
  Numeric,
  PersonCard,
  Rail,
  ScoreBar,
  Stack,
  Text,
  TraitCard,
  TraitChip,
} from "../index.js";

/**
 * SAVED RESULT — pure presentation layer. Phase 10C, extended for
 * historical parity in the Phase 10D-3 follow-up.
 *
 * Extracted from `app/[locale]/account/results/[id]/page.tsx` specifically
 * so it can be exercised two ways from the SAME source, the same "parity
 * is structural, not merely conventional" reasoning `resultView.ts`
 * (Phase 10C) already established for `computeResultView`:
 *   1. the real page, after auth + `fetchSavedResult` resolve a snapshot
 *      from a live, RLS-protected Supabase row;
 *   2. `src/dev/savedResultPreview.tsx` (a `gallery.tsx`-style static
 *      renderer), fed handcrafted synthetic `ResultSnapshotV1` fixtures —
 *      no Supabase, no auth, no network — so this component's rendering
 *      logic can be verified by Playwright without a real authenticated
 *      session.
 *
 * HARD RULE, load-bearing for the whole historical-fidelity design: this
 * component takes ONLY a `ResultSnapshotV1` (plus `locale`) as input. It
 * imports NOTHING from `src/core/quiz`, `src/core/matching`,
 * `src/core/greatness`, or `src/core/interpretation` — no `scoreQuiz`, no
 * `buildResultSet`, no `computeGreatnessPotential`, no selection/template
 * function of any kind. This specifically includes `renderComparison`/
 * `selectComparisonTemplate`, which pick a template key from the CURRENT
 * `DIFFERENCE_THRESHOLDS` — a live, versioned interpretation constant, not
 * frozen snapshot data; the closest-match "explanation trait" below is
 * therefore rendered as a `ComparisonBar`, the same safe, pure-formatting
 * component every other comparison section on this page already uses,
 * never as the templated prose sentence Live Results shows for the same
 * field. `ATTRIBUTES_BY_FACET`/`FACETS` (used for the Trait Profile
 * breakdown's grouping) are taxonomy STRUCTURE, the same presentational
 * category as an `attribute.*`/`occupation.*` i18n label lookup — not a
 * value this component computes or interprets. The only "live" reads here
 * are presentational: localized attribute/person/facet display strings
 * and portrait/href lookups by stable id, which cannot change a NUMBER,
 * only how it's labelled, grouped, or linked. See
 * `src/core/results/snapshot.ts`'s own doc comment for why a "reopen"
 * that quietly recomputed would defeat the entire point of this design.
 *
 * PARITY CONTRACT (Phase 10D-3 follow-up): reproduces every canonical
 * user-visible Live Results interpretation that (a) is actually part of
 * the Live Results UI today and (b) is reproducible entirely from
 * `ResultSnapshotV1` plus presentation-only lookups. Deliberately does
 * NOT expose `greatness.components`/`secondaryArchetypeId` (stored in the
 * snapshot, but never rendered on Live Results — snapshot storage is not
 * automatically a UI contract) and deliberately does NOT reconstruct
 * Unexpected Match / Opposite Profile / Top Matches (never stored in the
 * snapshot at all — see `resultView.ts`'s own scoping note).
 */

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

export function SavedResultView({ snapshot, locale }: { snapshot: ResultSnapshotV1; locale: Locale }) {
  const closestPerson = snapshot.closest ? resolvePerson(snapshot.closest.personId, snapshot) : undefined;
  const dualEdged = snapshot.greatness.dualEdged;

  return (
    <main className="tgi-container" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
      <Stack gap={7}>
        {/* ============================================================ 1. hero */}
        {/* Mirrors Live Results' Phase 10D-3 hero composition (score/band
            primary, archetype note + explainer secondary via `Rail`) using
            only frozen snapshot fields. `greatness.components` and
            `secondaryArchetypeId` are deliberately never read here — Live
            Results itself never renders them (verified directly against
            `app/[locale]/results/page.tsx`), so exposing them here would
            be a snapshot-storage leak, not a parity fix. */}
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
                      <span className="tgi-hero-score__value">{formatPotential(snapshot.greatness.score)}</span>
                    </Numeric>
                  </div>
                  <Text tone="muted">{t(locale, `greatness.band.${snapshot.greatness.bandId}` as MessageKey)}</Text>
                </Stack>
              </Stack>
            }
            secondary={
              <Stack gap={4}>
                {snapshot.resultArchetype ? (
                  <div style={{ borderLeft: "3px solid var(--tgi-accent)", paddingLeft: "var(--tgi-space-4)" }}>
                    <Stack gap={1}>
                      <Text tone="secondary">
                        <strong>{t(locale, `archetype_result.${snapshot.resultArchetype}` as MessageKey)}</strong>
                      </Text>
                      <Text tone="muted">{t(locale, `archetype_result.${snapshot.resultArchetype}.body` as MessageKey)}</Text>
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
                {/* `closest.explanationTrait` is frozen in the snapshot and IS
                    part of Live Results' Closest Match presentation, but Live
                    renders it via `renderComparison`/`selectComparisonTemplate`
                    — a CURRENT-`DIFFERENCE_THRESHOLDS`-dependent selection
                    function from `src/core/interpretation`, forbidden here.
                    Rendered instead as a `ComparisonBar` — the same safe,
                    pure-formatting component the Comparison section below
                    already uses for every other trait pairing on this page. */}
                {snapshot.closest.explanationTrait ? (
                  // Width-constrained (Phase 10D-3 follow-up), NOT via the
                  // shared `.tgi-measure-stack` (which centers itself —
                  // this bar must stay LEFT-ALIGNED inside the full-width
                  // Card, matching the identity/text/button content above
                  // it). `.tgi-savedresult-explanation` is a small,
                  // page-scoped cap (~40rem, same scale as
                  // `.tgi-measure-stack`) with no `margin-inline`, so a
                  // block-level div simply stays flush-left by default.
                  // Naturally responsive below desktop since it's only a
                  // max-width, never a fixed width.
                  <div className="tgi-savedresult-explanation">
                    <ComparisonBar
                      label={attrLabel(locale, snapshot.closest.explanationTrait.attributeId)}
                      userScore={snapshot.closest.explanationTrait.userScore}
                      personScore={snapshot.closest.explanationTrait.personScore}
                      personName={closestPerson.name(locale)}
                      locale={locale}
                    />
                  </div>
                ) : null}
                {closestPerson.href(locale) ? (
                  <div>
                    <Button href={closestPerson.href(locale)!}>{t(locale, "results.cta.view_profile")}</Button>
                  </div>
                ) : null}
              </Stack>
            </Card>
          </Stack>
        ) : null}

        {/* ============================================== 3. signature + dual */}
        {/* Mirrors Live Results' Phase 10D-3 Signature/Dual-Edged peer pairing
            (`.tgi-results-trait-pair`) when both exist, falling through to a
            single `.tgi-measure-stack` otherwise — same absent-branch rule.

            REFINEMENT 1 (historical safety): Live Results' Signature `context`
            interpolates `ATTRIBUTES[id].reference.mean` — CURRENT taxonomy
            metadata that a future reference revision could change, silently
            altering the prose shown for an old saved result. This component
            never reads `.reference` at all; `context` here is built ONLY from
            two already-existing, already-static i18n strings
            (`label.signature_trait.support` + `results.signature_trait.
            not_inherently_positive`) that need no interpolated data — no new
            i18n content was authored to make this safe. */}
        {(() => {
          const signatureBlock = snapshot.signature ? (
            <Stack gap={3} className="tgi-measure-stack" as="section">
              <Heading level={2}>{t(locale, "label.signature_trait")}</Heading>
              <TraitCard
                label={attrLabel(locale, snapshot.signature.attributeId)}
                score={snapshot.signature.score}
                impact="neutral"
                confidence={snapshot.signature.confidence}
                locale={locale}
                context={`${t(locale, "label.signature_trait.support")} ${t(locale, "results.signature_trait.not_inherently_positive")}`}
              />
            </Stack>
          ) : null;
          const dualEdgedBlock = dualEdged ? (
            <Stack gap={3} className="tgi-measure-stack" as="section">
              <Heading level={2}>{t(locale, "label.dual_edged_trait")}</Heading>
              <TraitCard
                label={attrLabel(locale, dualEdged.attributeId)}
                score={dualEdged.score}
                impact="dual_edged"
                confidence={snapshot.traits[dualEdged.attributeId]?.confidence ?? 0.2}
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

        {/* ============================================= 4. category matches */}
        {/* Reordered (Phase 10D-3 follow-up) to precede Trait Profile,
            matching Live Results' canonical section order (Category Matches
            → Trait Profile → Comparison) — presentation ordering only, no
            data/snapshot semantics changed. */}
        {snapshot.categoryMatches.length > 0 ? (
          <Stack gap={4} as="section">
            <Heading level={2}>{t(locale, "results.section.category_matches")}</Heading>
            <Grid min="14rem" className="tgi-results-discovery-grid">
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

        <Divider />

        {/* ================================================ 5. trait profile */}
        {/* Mirrors Live Results' section structure and progressive-disclosure
            pattern. The "All Traits" breakdown sorts by the FROZEN `z` stored
            per-attribute in the snapshot — never recomputed from current
            `reference.mean`/`reference.sd`. `ATTRIBUTES_BY_FACET`/`FACETS`
            supply grouping structure only (which section a trait appears
            under); every score/confidence/z value rendered is frozen. */}
        <Stack gap={4} as="section">
          <Heading level={2}>{t(locale, "results.section.trait_profile")}</Heading>
          <Text tone="muted">{t(locale, "results.section.trait_profile.intro")}</Text>

          {snapshot.highlights.length > 0 ? (
            <Stack gap={3}>
              <Heading level={3}>{t(locale, "results.trait_profile.highlights")}</Heading>
              <Cluster gap={2}>
                {snapshot.highlights.map((id) => (
                  <TraitChip key={id} label={attrLabel(locale, id)} score={snapshot.traits[id]?.score ?? 50} locale={locale} />
                ))}
              </Cluster>
            </Stack>
          ) : null}

          <details>
            <summary>
              <Text tone="secondary">{t(locale, "results.trait_profile.all")}</Text>
            </summary>
            <Stack gap={6} className="tgi-details-body">
              {FACETS.map((facet) => {
                const ids = [...ATTRIBUTES_BY_FACET[facet]]
                  .filter((id) => snapshot.traits[id] !== undefined)
                  .sort((a, b) => Math.abs(snapshot.traits[b]!.z) - Math.abs(snapshot.traits[a]!.z));
                if (ids.length === 0) return null;
                return (
                  <Stack gap={3} key={facet}>
                    <Heading level={3}>{t(locale, `facet.${facet}` as MessageKey)}</Heading>
                    <Stack gap={3}>
                      {ids.map((id) => (
                        <ScoreBar
                          key={id}
                          label={attrLabel(locale, id)}
                          score={snapshot.traits[id]!.score}
                          locale={locale}
                          trailing={<ConfidenceIndicator confidence={snapshot.traits[id]!.confidence} locale={locale} showLabel={false} />}
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

        {/* ==================================================== 6. comparison */}
        {/* Mirrors Live Results' Phase 10D-3 comparison composition: You Both
            + Your Advantage paired via `Rail` when Advantage exists, You-Both
            -only otherwise; Where You Differ as its own full-width section
            afterward. All three read only frozen `snapshot.comparison.*`
            arrays, already sliced to the same lengths Live Results uses. */}
        {snapshot.closest && closestPerson && snapshot.comparison.closestTraits.length > 0 ? (
          <Stack gap={5} className="tgi-measure-stack" as="section">
            <Heading level={2}>{t(locale, "results.section.comparison", { person: closestPerson.name(locale) })}</Heading>

            {(() => {
              const youBothBlock = (
                <Stack gap={3} className="tgi-measure-stack">
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
              );

              const advantageBlock =
                snapshot.comparison.advantage.length > 0 ? (
                  <Stack gap={3} className="tgi-measure-stack">
                    <Heading level={3}>{t(locale, "label.your_advantage")}</Heading>
                    <Stack gap={2}>
                      {snapshot.comparison.advantage.map((c) => (
                        <Text tone="secondary" key={c.attributeId}>
                          {t(locale, "tpl.advantage_intro", {
                            trait: attrLabel(locale, c.attributeId),
                            person: closestPerson.name(locale),
                          })}
                        </Text>
                      ))}
                    </Stack>
                  </Stack>
                ) : null;

              if (advantageBlock) {
                return <Rail className="tgi-rail--tight" primary={youBothBlock} secondary={advantageBlock} />;
              }
              return youBothBlock;
            })()}

            {snapshot.comparison.userHigherTraits.length > 0 || snapshot.comparison.personHigherTraits.length > 0 ? (
              <Stack gap={4}>
                <Heading level={3}>{t(locale, "label.where_you_differ")}</Heading>
                <Grid min="18rem">
                  {snapshot.comparison.userHigherTraits.length > 0 ? (
                    <Stack gap={3}>
                      <Text tone="secondary">{t(locale, "results.comparison.user_higher")}</Text>
                      <Stack gap={4}>
                        {snapshot.comparison.userHigherTraits.map((c) => (
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
                  ) : null}
                  {snapshot.comparison.personHigherTraits.length > 0 ? (
                    <Stack gap={3}>
                      <Text tone="secondary">
                        {t(locale, "results.comparison.person_higher", { person: closestPerson.name(locale) })}
                      </Text>
                      <Stack gap={4}>
                        {snapshot.comparison.personHigherTraits.map((c) => (
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
                  ) : null}
                </Grid>
                <Text tone="muted">{t(locale, "results.comparison.reassurance")}</Text>
              </Stack>
            ) : null}
          </Stack>
        ) : null}

        <Divider />

        {/* ============================================== 7. how calculated */}
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
          <Button variant="secondary" href={`/${locale}/account`}>
            {t(locale, "account.back")}
          </Button>
        </Cluster>
      </Stack>
    </main>
  );
}
