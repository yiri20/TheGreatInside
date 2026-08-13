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
import { cx } from "../lib/display.js";
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
 */
export function IdentityHero({
  portraitUrl,
  portraitWidth = "8rem",
  /** Intrinsic dimensions (CLS prevention) — only the person page currently
   *  has this data on `Person.portrait`; results/compare pass neither. */
  portraitImgWidth,
  portraitImgHeight,
  portraitCaption,
  align = "center",
  children,
}: {
  portraitUrl?: string;
  /** Matches each call site's existing value (person: 12rem, results/compare: 8rem). */
  portraitWidth?: string;
  portraitImgWidth?: number;
  portraitImgHeight?: number;
  /** Licence/attribution text shown under the portrait (person page only). */
  portraitCaption?: ReactNode;
  /** "start" when a caption makes the portrait column taller than a single text line (person page); "center" otherwise. */
  align?: "start" | "center";
  children: ReactNode;
}) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- external, licence-attributed portraits; see person/results/compare pages' own prior comments.
    <img
      className="tgi-identity-hero__img"
      src={portraitUrl}
      alt=""
      {...(portraitImgWidth ? { width: portraitImgWidth } : {})}
      {...(portraitImgHeight ? { height: portraitImgHeight } : {})}
    />
  );
  return (
    <div className={cx("tgi-identity-hero", align === "start" && "tgi-identity-hero--align-start")}>
      {portraitUrl ? (
        <div className="tgi-identity-hero__portrait" style={{ width: portraitWidth }}>
          {portraitCaption ? (
            <Stack gap={2}>
              {img}
              {portraitCaption}
            </Stack>
          ) : (
            img
          )}
        </div>
      ) : null}
      <div className="tgi-identity-hero__info">{children}</div>
    </div>
  );
}
