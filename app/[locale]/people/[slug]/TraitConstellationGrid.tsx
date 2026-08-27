"use client";

/**
 * Mobile progressive disclosure for the Trait Constellation (2026-08 Person
 * Profile UX polish). Human visual review of the Profile V2 pilot found
 * mobile person pages excessively long: 8-12 trait cards, always rendered as
 * a single vertical stack, pushed Life Arc/Key Achievements/Life Scenes/
 * Turning Points/Legacy far below the fold. `traitConstellation()` already
 * orders its result by distinctiveness (most characteristic first, see
 * `src/core/interpretation/constellation.ts`), so "the strongest 4" is
 * simply the array's own first 4 entries — no re-ranking here, no trait/
 * scoring change, local UI state only.
 *
 * Desktop/tablet (>640px) must render byte-identically to before this
 * change. Rather than branch on a JS-detected viewport, the collapse
 * itself is CSS media-query-gated (`.tgi-trait-grid--collapsed` only hides
 * anything below 640px, and the toggle control only becomes visible below
 * 640px) — every trait card is always present in the DOM, so desktop layout,
 * SEO, and no-JS degradation all fall out of plain CSS rather than a
 * client-only viewport check that could mismatch on hydration.
 *
 * Reuses the existing `.tgi-button--quiet` treatment (already the
 * project's "quiet disclosure action" pattern — see the Landing secondary
 * CTA and the person-page Share button) rather than inventing a new control
 * style, and a plain toggle button rather than a floating popover/`<details>`
 * repurposing, since the show/hide state here needs to be forced open at
 * desktop widths regardless of the toggle's own state — a native `<details>`
 * doesn't support "ignore my own state above this breakpoint" without the
 * same media-query trick anyway, so a controlled button is the more direct
 * of two equally-CSS-dependent options.
 */
import { useId, useState } from "react";
import type { Locale } from "@core/types";
import { t, type MessageKey } from "@core/i18n/index";
import type { ConstellationTrait } from "@core/interpretation/constellation";
import { Grid, TraitCard } from "@ui/index";

const MOBILE_DEFAULT_COUNT = 4;

export function TraitConstellationGrid({
  locale,
  traits,
}: {
  locale: Locale;
  traits: readonly ConstellationTrait[];
}) {
  const [expanded, setExpanded] = useState(false);
  const gridId = useId();

  // Nothing to disclose — desktop and mobile already show the same thing.
  const canCollapse = traits.length > MOBILE_DEFAULT_COUNT;

  return (
    <>
      <div
        id={gridId}
        className={
          canCollapse && !expanded ? "tgi-trait-grid tgi-trait-grid--collapsed" : "tgi-trait-grid"
        }
      >
        <Grid min="15rem">
          {traits.map((trait) => (
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
      </div>
      {canCollapse ? (
        <button
          type="button"
          className="tgi-button tgi-button--quiet tgi-trait-grid__toggle"
          aria-expanded={expanded}
          aria-controls={gridId}
          onClick={() => setExpanded((value) => !value)}
        >
          {t(locale, expanded ? "person.traits.show_fewer" : "person.traits.show_all")}
        </button>
      ) : null}
    </>
  );
}
