/**
 * Shared presentational shell for `/privacy` and `/terms` — Broader Public
 * Launch Finish Line, Part 5. The two routes are structurally identical
 * (title, "last updated" line, intro paragraphs, a flat list of heading +
 * paragraph sections), so this is the one place that shape is rendered,
 * not two near-duplicate page bodies.
 *
 * Deliberately plain: `.tgi-measure-stack` (the same narrow, readable-width
 * pattern quiz/account/error states already use) for prose, `Heading`
 * level 2 per section (never a `Card` per section — a wall of bordered
 * boxes around plain paragraphs is exactly the "box everything" AI-tell
 * this project's own design principle warns against). No table of
 * contents, no sticky sidebar, no accordion — a document this short reads
 * fine as a plain scroll.
 */
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";
import type { LegalDocument } from "@core/i18n/legal";
import { Display, Eyebrow, Heading, Stack, Text } from "@ui/index";

export function LegalDocumentView({ locale, doc }: { locale: Locale; doc: LegalDocument }) {
  return (
    <main className="tgi-container" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
      <Stack gap={6} className="tgi-measure-stack">
        <Stack gap={2}>
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Display>{doc.title}</Display>
          <Text tone="muted">{doc.lastUpdated}</Text>
        </Stack>

        <Stack gap={3}>
          {doc.intro.map((paragraph, i) => (
            <Text key={i} tone="secondary">
              {paragraph}
            </Text>
          ))}
        </Stack>

        {doc.sections.map((section) => (
          <Stack gap={2} key={section.heading}>
            <Heading level={2}>{section.heading}</Heading>
            {section.paragraphs.map((paragraph, i) => (
              <Text key={i} tone="secondary">
                {paragraph}
              </Text>
            ))}
          </Stack>
        ))}
      </Stack>
    </main>
  );
}
