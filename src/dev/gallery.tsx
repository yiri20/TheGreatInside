/**
 * Design-system gallery — renders every component to a static HTML file so the
 * visual language can be reviewed without a running app or a build pipeline.
 *
 * It renders the REAL components with REAL seed data, so it doubles as a smoke
 * test: if a component throws, this script fails.
 *
 * Run: corepack pnpm@10 exec tsx src/dev/gallery.tsx
 * Out: preview/design-system.html
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";

import {
  Button,
  Card,
  Cluster,
  ComparisonBar,
  ConfidenceIndicator,
  Display,
  Divider,
  Eyebrow,
  Grid,
  Heading,
  ImpactBadge,
  PersonCard,
  ScoreBar,
  Stack,
  Text,
  TraitCard,
  TraitChip,
  formatLifespan,
  formatPotential,
} from "../ui/index.js";
import { ALL_IMPACTS } from "../ui/lib/display.js";
import { SEED_PEOPLE } from "../data/people/seed.js";
import { t } from "../core/i18n/index.js";
import type { Locale } from "../core/types.js";

const here = dirname(fileURLToPath(import.meta.url));
const locale: Locale = "en-US";

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <Stack gap={4} as="section">
      <Stack gap={1}>
        <Heading level={2}>{title}</Heading>
        {note ? <Text tone="muted">{note}</Text> : null}
      </Stack>
      {children}
      <Divider />
    </Stack>
  );
}

const daVinci = SEED_PEOPLE.find((p) => p.slug === "leonardo-da-vinci")!;
const attr = (slug: string, id: string) => {
  const person = SEED_PEOPLE.find((p) => p.slug === slug)!;
  return person.attributes.find((a) => a.attributeId === id)!;
};

function Gallery() {
  return (
    <Stack gap={7} className="tgi-gallery">
      <Stack gap={3}>
        <Eyebrow>The Great Inside — design system v1</Eyebrow>
        <Display>Who in history thinks like you?</Display>
        <Text tone="secondary">
          Foundational components only. No result pages yet — the numerical system is validated
          first.
        </Text>
        <Cluster gap={3}>
          <Button variant="primary" size="lg">
            Find My Matches
          </Button>
          <Button variant="secondary" size="lg">
            Explore Great Minds
          </Button>
        </Cluster>
      </Stack>
      <Divider />

      <Section title="Typography" note="Editorial serif for voice, sans for interface, tabular figures for data.">
        <Stack gap={3}>
          <Display>Display · 3.5rem</Display>
          <Heading level={1}>Heading 1 · 2.5rem</Heading>
          <Heading level={2}>Heading 2 · 1.875rem</Heading>
          <Heading level={3}>Heading 3 · 1.375rem</Heading>
          <Eyebrow>Eyebrow · uppercase label</Eyebrow>
          <Text>
            Body copy sits on a constrained measure so long-form explanation stays readable. The
            product is editorial before it is a dashboard.
          </Text>
          <Text tone="secondary">Secondary body copy.</Text>
          <Text tone="muted">Muted caption copy.</Text>
        </Stack>
      </Section>

      <Section title="Buttons">
        <Cluster gap={3}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="quiet">Quiet</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </Cluster>
      </Section>

      <Section title="Cards">
        <Grid min="15rem">
          <Card>
            <Stack gap={2}>
              <Heading level={3}>Default</Heading>
              <Text tone="secondary">Standard surface.</Text>
            </Stack>
          </Card>
          <Card variant="sunken">
            <Stack gap={2}>
              <Heading level={3}>Sunken</Heading>
              <Text tone="secondary">Recedes behind content.</Text>
            </Stack>
          </Card>
          <Card variant="feature">
            <Stack gap={2}>
              <Heading level={3}>Feature</Heading>
              <Text tone="secondary">For the closest-match card.</Text>
            </Stack>
          </Card>
        </Grid>
      </Section>

      <Section
        title="ImpactBadge"
        note="Impact is scoped to person x attribute x context. Colour never carries meaning alone — every badge has a label and a glyph."
      >
        <Cluster gap={3}>
          {ALL_IMPACTS.map((impact) => (
            <ImpactBadge key={impact} impact={impact} locale={locale} />
          ))}
        </Cluster>
      </Section>

      <Section title="ConfidenceIndicator" note="Three coarse bands. Person profiles are inferred, so a decimal would imply false precision.">
        <Cluster gap={5}>
          <ConfidenceIndicator confidence={0.35} locale={locale} />
          <ConfidenceIndicator confidence={0.62} locale={locale} />
          <ConfidenceIndicator confidence={0.93} locale={locale} />
        </Cluster>
      </Section>

      <Section title="TraitChip">
        <Cluster gap={2}>
          <TraitChip label={t(locale, "attribute.curiosity")} score={97} locale={locale} />
          <TraitChip
            label={t(locale, "attribute.perfectionism")}
            score={88}
            impact="dual_edged"
            locale={locale}
          />
          <TraitChip label={t(locale, "attribute.collaboration")} score={48} impact="risk" locale={locale} />
          <TraitChip label={t(locale, "attribute.execution_speed")} score={32} locale={locale} />
        </Cluster>
      </Section>

      <Section title="ScoreBar" note="Scores render without a percent sign — a score is a location on a dimension, not a percentage.">
        <Card>
          <Stack gap={4}>
            <ScoreBar label={t(locale, "attribute.curiosity")} score={97} impact="advantage" locale={locale} />
            <ScoreBar label={t(locale, "attribute.perfectionism")} score={88} impact="dual_edged" locale={locale} />
            <ScoreBar label={t(locale, "attribute.execution_speed")} score={32} impact="risk" locale={locale} />
            <ScoreBar label={t(locale, "attribute.planning_orientation")} score={45} impact="neutral" locale={locale} />
          </Stack>
        </Card>
      </Section>

      <Section title="ComparisonBar" note="The gap itself is drawn, because the difference is the subject of the comparison.">
        <Card>
          <Stack gap={5}>
            <ComparisonBar
              label={t(locale, "attribute.collaboration")}
              userScore={82}
              personScore={48}
              personName="Steve Jobs"
              locale={locale}
            />
            <ComparisonBar
              label={t(locale, "attribute.competitiveness")}
              userScore={44}
              personScore={88}
              personName="Steve Jobs"
              locale={locale}
            />
            <ComparisonBar
              label={t(locale, "attribute.curiosity")}
              userScore={91}
              personScore={82}
              personName="Steve Jobs"
              locale={locale}
            />
          </Stack>
        </Card>
      </Section>

      <Section title="TraitCard" note="Degrades gracefully: with no editorial copy it still shows score, impact and confidence.">
        <Grid min="18rem">
          <TraitCard
            label={t(locale, "attribute.perfectionism")}
            score={attr("hayao-miyazaki", "perfectionism").score}
            impact="dual_edged"
            confidence={attr("hayao-miyazaki", "perfectionism").confidence}
            locale={locale}
            edge="Exceptionally demanding standards can raise the quality of the finished work."
            cost="The same standards can slow completion and increase friction with collaborators."
          />
          <TraitCard
            label={t(locale, "attribute.curiosity")}
            score={attr("leonardo-da-vinci", "curiosity").score}
            impact="advantage"
            confidence={attr("leonardo-da-vinci", "curiosity").confidence}
            locale={locale}
            edge="Sustained interest across many fields fed an unusually wide body of work."
          />
          <TraitCard
            label={t(locale, "attribute.execution_speed")}
            score={attr("leonardo-da-vinci", "execution_speed").score}
            impact="dual_edged"
            confidence={attr("leonardo-da-vinci", "execution_speed").confidence}
            locale={locale}
            context="Many commissions were left unfinished. Biographical accounts connect this to breadth of interest rather than lack of skill."
          />
        </Grid>
      </Section>

      <Section title="PersonCard" note="Portrait placeholders use initials — most historical figures have no free-licence portrait, and that must look deliberate.">
        <Grid min="13rem">
          {SEED_PEOPLE.slice(0, 5).map((person, index) => (
            <PersonCard
              key={person.id}
              name={person.canonicalName}
              {...(person.occupationIds[0]
                ? { subtitle: person.occupationIds[0].replace(/_/g, " ") }
                : {})}
              lifespan={formatLifespan(person.birthYear, person.deathYear, person.isLiving)}
              href={`/en-US/people/${person.slug}`}
              match={[87, 81, 76, 71, 64][index] ?? 60}
              locale={locale}
            />
          ))}
        </Grid>
      </Section>

      <Section title="Numeric formats" note="Three different things that must never be confused.">
        <Cluster gap={6}>
          <Stack gap={1}>
            <Eyebrow>Trait score</Eyebrow>
            <span className="tgi-traitcard__score">97</span>
          </Stack>
          <Stack gap={1}>
            <Eyebrow>{t(locale, "label.profile_match")}</Eyebrow>
            <span className="tgi-traitcard__score">84%</span>
          </Stack>
          <Stack gap={1}>
            <Eyebrow>{t(locale, "label.greatness_potential")}</Eyebrow>
            <span className="tgi-traitcard__score">{formatPotential(82)}</span>
          </Stack>
        </Cluster>
        <Text tone="muted">{t(locale, "result.greatness.explainer")}</Text>
      </Section>

      <Section title="Korean" note="Same components, same numbers. Locale changes presentation only.">
        <Card>
          <Stack gap={4}>
            <Cluster gap={3}>
              {ALL_IMPACTS.map((impact) => (
                <ImpactBadge key={impact} impact={impact} locale="ko-KR" />
              ))}
            </Cluster>
            <ScoreBar
              label={t("ko-KR", "attribute.perfectionism")}
              score={88}
              impact="dual_edged"
              locale="ko-KR"
            />
            <ComparisonBar
              label={t("ko-KR", "attribute.collaboration")}
              userScore={82}
              personScore={48}
              personName="스티브 잡스"
              locale="ko-KR"
            />
            <Text tone="muted">{t("ko-KR", "result.profile_match.explainer")}</Text>
          </Stack>
        </Card>
      </Section>

      <Stack gap={2}>
        <Eyebrow>Reference profile</Eyebrow>
        <Text tone="muted">
          {daVinci.canonicalName} · {daVinci.attributes.length} scored attributes · profile
          confidence {daVinci.overallProfileConfidence.toFixed(2)}
        </Text>
      </Stack>
    </Stack>
  );
}

const tokens = readFileSync(resolve(here, "../ui/styles/tokens.css"), "utf8");
const components = readFileSync(resolve(here, "../ui/styles/components.css"), "utf8");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The Great Inside — Design System</title>
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0}
${tokens}
${components}
.tgi-page{max-width:64rem;margin:0 auto;padding:var(--tgi-space-7) var(--tgi-space-5) var(--tgi-space-9)}
</style>
</head>
<body class="tgi-root">
<main class="tgi-page">
${renderToStaticMarkup(<Gallery />)}
</main>
</body>
</html>
`;

const outDir = resolve(here, "../../preview");
mkdirSync(outDir, { recursive: true });
const outFile = resolve(outDir, "design-system.html");
writeFileSync(outFile, html, "utf8");
process.stdout.write(`wrote ${outFile} (${(html.length / 1024).toFixed(1)} kB)\n`);
