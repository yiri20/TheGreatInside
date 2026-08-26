/**
 * Editorial layout composition primitives — Phase 10D-1.
 *
 * Distinct from primitives.tsx's atomic layout helpers (Stack/Cluster/Grid):
 * these two exist specifically to give wide-desktop pages an asymmetric
 * composition option without inventing a page-specific pattern each time.
 * Purely presentational — no state, no data fetching, no `src/core` imports,
 * no cookies()/auth of any kind. Safe to import from a statically-generated
 * page (person detail) exactly as safely as from a dynamic one (results,
 * compare).
 */
import type { ReactNode } from "react";
import { cx, initialsFromName } from "../lib/display.js";
import { Stack } from "./primitives.js";

/* -------------------------------------------------------------------- Rail */

/**
 * Asymmetric primary/secondary composition for wide desktop. Single column
 * below the wide breakpoint (see `.tgi-rail` in components.css for the exact
 * value and the reasoning for choosing it). `secondary` is deliberately
 * restrained — a supporting column, not a second primary column — capped at
 * a fixed max width in CSS rather than sharing the fluid `1fr` primary gets.
 *
 * Accessibility contract: `primary` renders before `secondary` in the DOM,
 * and CSS never reorders them (`.tgi-rail` uses grid auto-placement, not
 * `order`) — so tab order and screen-reader reading order match the visual
 * left-to-right order on wide desktop AND match the stacked order on
 * mobile/tablet. Do not add an `order` rule to either region.
 */
export function Rail({
  primary,
  secondary,
  className,
}: {
  primary: ReactNode;
  secondary: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("tgi-rail", className)}>
      <div className="tgi-rail__primary">{primary}</div>
      <div className="tgi-rail__secondary">{secondary}</div>
    </div>
  );
}

/* -------------------------------------------------------------- IdentityHero */

/**
 * Shared "portrait + identity column" composition, extracted from three
 * places that had independently hand-written the same flex-row pattern
 * (results' closest-match card, the person detail page hero, the compare
 * page hero) — including the portrait-column width-tie fix documented in
 * CLAUDE.md ("Layout regression from the portrait hero"), which had to be
 * discovered and fixed once per call site before this extraction existed.
 *
 * Deliberately does NOT prescribe what goes in the info column — each of the
 * three call sites shows a different mix of eyebrow/heading level/meta line/
 * links/CTA, and that content difference is real, not incidental duplication.
 * Only the structural shell (portrait sizing/shrink behaviour + the flex
 * row + the info column's flex-basis/min-width fix) is shared.
 *
 * Missing-portrait fallback: when `portraitUrl` is absent (most of the
 * roster — see `PersonPortrait`'s doc comment in `core/types.ts`), this
 * used to render NOTHING for the portrait column at all — the one visual
 * identity element of the product's highest-visibility hero silently
 * disappearing, unlike `PersonCard`'s initials placeholder. Now renders the
 * same initials-on-sunken-surface treatment as `PersonCard`, scaled to
 * `portraitWidth`, so the column always occupies its real width and every
 * hero reads as intentionally designed rather than broken.
 */
export function IdentityHero({
  name,
  portraitUrl,
  portraitWidth = "8rem",
  portraitWidthLg,
  /** Intrinsic dimensions (CLS prevention) — only the person page currently
   *  has this data on `Person.portrait`; results/compare pass neither. */
  portraitImgWidth,
  portraitImgHeight,
  portraitCaption,
  align = "center",
  children,
}: {
  /** Display name (already localised by the caller) — feeds the initials
   *  fallback only; the visible name heading itself lives in `children`. */
  name: string;
  portraitUrl?: string;
  /** Matches each call site's existing value (person: 12rem, results/compare: 8rem). */
  portraitWidth?: string;
  /** Optional larger width applied only at the >=1280px desktop breakpoint
   *  (see .tgi-identity-hero__portrait in components.css) — mobile/tablet
   *  always render at `portraitWidth`. Omitted by results/compare, which
   *  keep one fixed size at every viewport. */
  portraitWidthLg?: string;
  portraitImgWidth?: number;
  portraitImgHeight?: number;
  /** Licence/attribution text shown under the portrait (person page only). */
  portraitCaption?: ReactNode;
  /** "start" when a caption makes the portrait column taller than a single text line (person page); "center" otherwise. */
  align?: "start" | "center";
  children: ReactNode;
}) {
  const img = portraitUrl ? (
    // eslint-disable-next-line @next/next/no-img-element -- external, licence-attributed portraits; see person/results/compare pages' own prior comments.
    <img
      className="tgi-identity-hero__img"
      src={portraitUrl}
      alt=""
      {...(portraitImgWidth ? { width: portraitImgWidth } : {})}
      {...(portraitImgHeight ? { height: portraitImgHeight } : {})}
    />
  ) : (
    // Decorative: the adjacent heading in `children` already names this
    // person, so an accessible name here would be redundant, not additive.
    // Font-size is driven purely by CSS now (calc() off the same
    // --tgi-hero-portrait-w custom property the box width uses, inherited
    // from the portrait wrapper below) so it tracks whichever width is
    // active at the current breakpoint, including the >=1280px lg override,
    // without needing a second JS-computed value here.
    <div className="tgi-identity-hero__placeholder" aria-hidden="true">
      {initialsFromName(name)}
    </div>
  );
  return (
    <div className={cx("tgi-identity-hero", align === "start" && "tgi-identity-hero--align-start")}>
      <div
        className="tgi-identity-hero__portrait"
        style={{
          ["--tgi-hero-portrait-w" as string]: portraitWidth,
          ...(portraitWidthLg ? { ["--tgi-hero-portrait-w-lg" as string]: portraitWidthLg } : {}),
        }}
      >
        {portraitCaption ? (
          <Stack gap={2}>
            {img}
            {portraitCaption}
          </Stack>
        ) : (
          img
        )}
      </div>
      <div className="tgi-identity-hero__info">{children}</div>
    </div>
  );
}
