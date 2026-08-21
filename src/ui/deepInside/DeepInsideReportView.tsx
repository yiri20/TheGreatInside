import { personDisplayName, t, type MessageKey } from "../../core/i18n/index.js";
import type { Locale } from "../../core/types.js";
import type { DeepInsideReportV1 } from "../../core/monetization/deepInsideSnapshot.js";
import { developmentGuide } from "../../core/interpretation/development.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import {
  Card,
  Cluster,
  ComparisonBar,
  Divider,
  Grid,
  Heading,
  PersonCard,
  Stack,
  Text,
  formatMatch,
} from "../index.js";

/**
 * DEEP INSIDE REPORT — pure presentation layer, same "snapshot in, HTML
 * out, no algorithm import" boundary `SavedResultView.tsx` established for
 * the free result (see that file's own doc comment for the full
 * reasoning). This component imports NOTHING from `src/core/quiz`,
 * `src/core/matching`, or `src/core/greatness` — no scoring/matching
 * function of any kind — only `developmentGuide` (a static, reviewed
 * lookup table, not a computation) for Strengths & Trade-offs' authored
 * copy. Every number here was already computed once by
 * `buildDeepInsideReport` and frozen into the snapshot this component
 * receives; rendering it a second time can never silently recompute
 * anything.
 */

function attrLabel(locale: Locale, attributeId: string): string {
  return t(locale, `attribute.${attributeId}` as MessageKey);
}

function occupationLabel(locale: Locale, occupationId: string | undefined): string | undefined {
  return occupationId ? t(locale, `occupation.${occupationId}` as MessageKey) : undefined;
}

/** Same fallback-to-frozen-name pattern `SavedResultView.tsx` already
 *  established — a person referenced in an old report may no longer exist
 *  in the live roster. */
function resolvePerson(personId: string, personNames: Record<string, string>) {
  const live = SEED_PEOPLE.find((p) => p.id === personId);
  return {
    live,
    name: (locale: Locale) => (live ? personDisplayName(locale, live) : (personNames[personId] ?? personId)),
    href: (locale: Locale) => (live ? `/${locale}/people/${live.slug}` : undefined),
  };
}

export function DeepInsideReportView({ report, locale }: { report: DeepInsideReportV1; locale: Locale }) {
  return (
    <Stack gap={7}>
      {/* ============================================= A. Why Your Matches Fit */}
      <Stack gap={4} as="section">
        <Heading level={2}>{t(locale, "deepinside.section.why_matches_fit")}</Heading>
        <Text tone="muted">{t(locale, "deepinside.section.why_matches_fit.intro")}</Text>
        <Stack gap={5}>
          {report.whyMatchesFit.map((m) => {
            const person = resolvePerson(m.personId, report.personNames);
            return (
              <Card key={m.personId} variant="feature">
                <Stack gap={4}>
                  <Cluster gap={3} between>
                    <Stack gap={1}>
                      <Text tone="muted">{t(locale, "deepinside.match.rank", { rank: m.rank })}</Text>
                      <Heading level={3} className="tgi-person-name">
                        {person.href(locale) ? (
                          <a href={person.href(locale)}>{person.name(locale)}</a>
                        ) : (
                          person.name(locale)
                        )}
                      </Heading>
                    </Stack>
                    <Text tone="secondary">
                      <strong>{formatMatch(m.overallMatch)}</strong>
                    </Text>
                  </Cluster>
                  {m.alignedTraits.length > 0 ? (
                    <Stack gap={2}>
                      <Text tone="secondary">{t(locale, "deepinside.match.aligned")}</Text>
                      <Stack gap={3}>
                        {m.alignedTraits.map((c) => (
                          <ComparisonBar
                            key={c.attributeId}
                            label={attrLabel(locale, c.attributeId)}
                            userScore={c.userScore}
                            personScore={c.personScore}
                            personName={person.name(locale)}
                            locale={locale}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}
                  {m.differingTraits.length > 0 ? (
                    <Stack gap={2}>
                      <Text tone="secondary">{t(locale, "deepinside.match.differing")}</Text>
                      <Stack gap={3}>
                        {m.differingTraits.map((c) => (
                          <ComparisonBar
                            key={c.attributeId}
                            label={attrLabel(locale, c.attributeId)}
                            userScore={c.userScore}
                            personScore={c.personScore}
                            personName={person.name(locale)}
                            locale={locale}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}
                </Stack>
              </Card>
            );
          })}
        </Stack>
      </Stack>

      <Divider />

      {/* =============================================== B. Historical Circle */}
      <Stack gap={4} as="section">
        <Heading level={2}>{t(locale, "deepinside.section.historical_circle")}</Heading>
        <Text tone="muted">{t(locale, "deepinside.section.historical_circle.intro")}</Text>
        <Grid min="14rem">
          {report.historicalCircle.map((m) => {
            const person = resolvePerson(m.personId, report.personNames);
            const occupationId = person.live?.occupationIds[0];
            return person.live ? (
              <PersonCard
                key={m.personId}
                name={person.name(locale)}
                {...(occupationId ? { subtitle: occupationLabel(locale, occupationId) as string } : {})}
                href={person.href(locale)!}
                match={m.overallMatch}
                locale={locale}
                {...(person.live.portrait ? { portraitUrl: person.live.portrait.url } : {})}
              />
            ) : (
              <Card key={m.personId} variant="sunken">
                <Text tone="secondary">{person.name(locale)}</Text>
              </Card>
            );
          })}
        </Grid>
      </Stack>

      <Divider />

      {/* =========================================== C. Signature Combination */}
      {report.signatureCombination.length > 0 ? (
        <Stack gap={4} as="section">
          <Heading level={2}>{t(locale, "deepinside.section.signature_combination")}</Heading>
          <Stack gap={3}>
            {report.signatureCombination.map((combo, i) => (
              <Card key={i} variant="sunken">
                <Text tone="secondary">
                  {t(locale, combo.kind === "combination" ? "deepinside.combination.body" : "deepinside.tension.body", {
                    traitA: attrLabel(locale, combo.attributeIds[0]),
                    traitB: attrLabel(locale, combo.attributeIds[1]),
                    scoreA: Math.round(combo.userScores[0]),
                    scoreB: Math.round(combo.userScores[1]),
                  })}
                </Text>
              </Card>
            ))}
          </Stack>
        </Stack>
      ) : null}

      <Divider />

      {/* ===================================================== D. Counterpart */}
      {report.counterpart ? (
        (() => {
          const person = resolvePerson(report.counterpart.personId, report.personNames);
          return (
            <Stack gap={4} as="section">
              <Heading level={2}>{t(locale, "deepinside.section.counterpart")}</Heading>
              <Card variant="feature">
                <Stack gap={4}>
                  <Cluster gap={3} between>
                    <Heading level={3} className="tgi-person-name">
                      {person.href(locale) ? <a href={person.href(locale)}>{person.name(locale)}</a> : person.name(locale)}
                    </Heading>
                    <Text tone="secondary">
                      <strong>{formatMatch(report.counterpart.overallMatch)}</strong>
                    </Text>
                  </Cluster>
                  {report.counterpart.differingTraits.length > 0 ? (
                    <Stack gap={2}>
                      <Text tone="secondary">{t(locale, "deepinside.counterpart.differing")}</Text>
                      <Stack gap={3}>
                        {report.counterpart.differingTraits.map((c) => (
                          <ComparisonBar
                            key={c.attributeId}
                            label={attrLabel(locale, c.attributeId)}
                            userScore={c.userScore}
                            personScore={c.personScore}
                            personName={person.name(locale)}
                            locale={locale}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}
                  {report.counterpart.sharedTraits.length > 0 ? (
                    <Stack gap={2}>
                      <Text tone="secondary">{t(locale, "deepinside.counterpart.shared")}</Text>
                      <Stack gap={3}>
                        {report.counterpart.sharedTraits.map((c) => (
                          <ComparisonBar
                            key={c.attributeId}
                            label={attrLabel(locale, c.attributeId)}
                            userScore={c.userScore}
                            personScore={c.personScore}
                            personName={person.name(locale)}
                            locale={locale}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}
                </Stack>
              </Card>
            </Stack>
          );
        })()
      ) : null}

      <Divider />

      {/* ========================================== E. Strengths & Trade-offs */}
      {report.strengthsTradeoffs.length > 0 ? (
        <Stack gap={4} as="section">
          <Heading level={2}>{t(locale, "deepinside.section.strengths_tradeoffs")}</Heading>
          <Stack gap={4}>
            {report.strengthsTradeoffs.map((s) => {
              const guide = developmentGuide(s.attributeId);
              const bandGuide = guide?.[s.band];
              const experimentKey = bandGuide?.experimentKeys[0];
              const cautionKey = bandGuide?.cautionKeys[0];
              return (
                <Card key={s.attributeId} variant="sunken">
                  <Stack gap={2}>
                    <Heading level={3}>{attrLabel(locale, s.attributeId)}</Heading>
                    {experimentKey ? (
                      <Text tone="secondary">{t(locale, experimentKey as MessageKey)}</Text>
                    ) : null}
                    {cautionKey ? <Text tone="muted">{t(locale, cautionKey as MessageKey)}</Text> : null}
                  </Stack>
                </Card>
              );
            })}
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
}
