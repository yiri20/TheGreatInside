import { ImageResponse } from "next/og";
import { LAUNCH_LOCALES, type Locale } from "@core/types";
import { personDisplayName, t, type MessageKey } from "@core/i18n/index";
import { SEED_PEOPLE } from "@data/people/seed";
import { formatLifespan } from "@ui/index";
import { ogFontData, OG_FONT_FAMILY } from "@lib/og/font";

/**
 * PERSON OG — Stage B Part 6. The clean, in-scope OG case (Section E of the
 * audit): fully static-parameter-driven (`params.slug`), no query-string
 * dependency at all, so this is a real file-convention `opengraph-image`
 * route, not a hand-built Route Handler like a future dynamic Results OG
 * would need.
 *
 * Approved content hierarchy, exactly: person name (dominant) → localized
 * occupation/domain + era/lifespan (restrained secondary line) → The Great
 * Inside branding (present, smaller than the name). No quiz score, no trait
 * score, no match percentage, no unrelated result data — this card is
 * canonical dataset content, identical for every visitor, same as the page
 * itself.
 *
 * NO portrait dependency — deliberately, not merely by omission. Only 1 of
 * 35 people (Leonardo da Vinci) has a populated `portrait` field; a
 * portrait-dependent design would need its own separate fallback for the
 * other 34, and would also mean fetching a remote image at render time,
 * which this file never does. Da Vinci is not a special visual case: this
 * component reads nothing from `person.portrait` at all.
 *
 * Localized EN/KO via the OG-only Noto Serif KR subset (`src/lib/og/font.ts`
 * — see `assets/og/README.md` for the subset's exact glyph coverage,
 * verified against every string this component can render).
 *
 * Static-optimization-eligible (marked `●` in the build output, same as
 * the Person pages themselves) — `params.slug`/`params.locale` are the
 * only inputs, both fully enumerable via `generateStaticParams` below, and
 * the function reads no request-time API. **Measured behavior differs
 * from the Person pages' own eager per-path prerendering, though**: build
 * output shows only ONE compiled `route.js` for this segment (not 70
 * individual pre-rendered image files the way `page.tsx` produces 70
 * `.html` files) — confirmed live against a production server: the first
 * request for a given locale×slug is `x-nextjs-cache: MISS` (generated
 * on demand), every subsequent request is `HIT` (served from cache
 * thereafter). This is Next's standard ISR-style caching for this route
 * type, not a defect — no per-request recomputation occurs on repeat
 * views, which is the actual invariant that matters here — but it is
 * genuinely NOT "every combination pre-rendered during `next build`" the
 * way the sibling pages are, and should not be described that way.
 */
export const alt = "Person profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Metadata route files do not automatically inherit a sibling
 *  `page.tsx`'s `generateStaticParams` — without its own, this route
 *  builds as `ƒ` dynamic despite having no request-time dependency
 *  (confirmed empirically: build output showed `ƒ` before this was
 *  added). Same enumeration `page.tsx` already uses. */
export function generateStaticParams() {
  return SEED_PEOPLE.map((p) => ({ slug: p.slug }));
}

const PAPER = "#faf8f4";
const INK = "#1c1a17";
const INK_SECONDARY = "#55504a";
const INK_MUTED = "#7d766d";
const ACCENT = "#4a3f6b";

function personBySlug(slug: string) {
  return SEED_PEOPLE.find((p) => p.slug === slug);
}

function occupationLabel(locale: Locale, occupationId: string | undefined): string | undefined {
  return occupationId ? t(locale, `occupation.${occupationId}` as MessageKey) : undefined;
}

interface PageParams {
  locale: string;
  slug: string;
}

export default async function Image({ params }: { params: Promise<PageParams> }) {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = LAUNCH_LOCALES.includes(localeParam as Locale) ? (localeParam as Locale) : "en-US";
  const person = personBySlug(slug);
  const fontData = await ogFontData();

  const name = person ? personDisplayName(locale, person) : "The Great Inside";
  const metaLine = person
    ? [occupationLabel(locale, person.occupationIds[0]), t(locale, `era.${person.era}` as MessageKey)]
        .filter(Boolean)
        .join(" · ")
    : "";
  const lifespan = person ? formatLifespan(person.birthYear, person.deathYear, person.isLiving) : "";

  // Long names (e.g. "Jalal ad-Din Muhammad Rumi", "볼프강 아마데우스
  // 모차르트") get a smaller size so they wrap to at most two lines within
  // the fixed 1200x630 canvas rather than overflowing or clipping.
  const nameFontSize = name.length > 20 ? 56 : 76;

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
            fontSize: nameFontSize,
            color: INK,
            lineHeight: 1.15,
            maxWidth: 1008,
          }}
        >
          {name}
        </div>
        {metaLine || lifespan ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
            }}
          >
            {metaLine ? (
              <div style={{ display: "flex", fontSize: 32, color: INK_SECONDARY }}>{metaLine}</div>
            ) : null}
            {lifespan ? (
              <div style={{ display: "flex", fontSize: 28, color: INK_MUTED, marginTop: 8 }}>{lifespan}</div>
            ) : null}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            left: 96,
            bottom: 72,
          }}
        >
          <div style={{ display: "flex", width: 28, height: 3, backgroundColor: ACCENT, marginRight: 16 }} />
          <div style={{ display: "flex", fontSize: 24, color: INK_MUTED }}>The Great Inside</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: OG_FONT_FAMILY, data: fontData, style: "normal", weight: 400 }],
    },
  );
}
