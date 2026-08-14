import { ImageResponse } from "next/og";
import { ogFontData, OG_FONT_FAMILY } from "@lib/og/font";

/**
 * GENERIC FALLBACK OG — Stage B Part 1. Universal (not per-locale, per the
 * approved decision — a generic brand card doesn't need translated copy the
 * way a page's own metadata description does; a locale-aware version isn't
 * precluded later, just not needed for v1). Inherited by every route that
 * doesn't define its own more specific `opengraph-image` (Next's normal
 * metadata-inheritance behavior) — today that's every page except Person
 * (Part 6), including Results/Compare, which deliberately use this same
 * generic card rather than a dynamic per-token image (see
 * `docs/phase10-stageB-sharing-og-audit.md` Section E — explicitly deferred,
 * not a gap).
 *
 * Statically optimized at build time (no request-time API used here), same
 * as any other file-convention OG image with no dynamic input.
 *
 * Visual direction, approved: warm paper background, strong typography, one
 * restrained purple accent rule (never a gradient), the TGI wordmark,
 * minimal text, real whitespace. Explicitly avoids gradients, glassmorphism,
 * bento composition, pill badges, and fake stats — the same tells this
 * project's "Anti-AI-template" principle (CLAUDE.md) names everywhere else.
 *
 * Copy reused verbatim from already-approved product strings
 * (`site.name`, `landing.title` in `src/core/i18n/en.ts`) — no new marketing
 * claim invented for this card.
 */
export const alt = "The Great Inside";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#faf8f4";
const INK = "#1c1a17";
const INK_SECONDARY = "#55504a";
const ACCENT = "#4a3f6b";

export default async function Image() {
  const fontData = await ogFontData();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: PAPER,
          padding: "96px",
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            color: INK,
            lineHeight: 1.1,
          }}
        >
          The Great Inside
        </div>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 4,
            backgroundColor: ACCENT,
            marginTop: 36,
            marginBottom: 36,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: INK_SECONDARY,
            maxWidth: 820,
          }}
        >
          Who in history thinks like you?
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: OG_FONT_FAMILY, data: fontData, style: "normal", weight: 400 }],
    },
  );
}
