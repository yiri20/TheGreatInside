import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Stage B OG font loader — reads the OG-only, offline-subsetted Noto Serif
 * KR asset (`assets/og/NotoSerifKR-OG-Subset.ttf`, see `assets/og/README.md`
 * for provenance/regeneration/measurement) once, at module scope, per the
 * Next.js docs' own "doesn't depend on request data, read it once" guidance
 * for `ImageResponse` custom fonts. Shared by every OG route (generic +
 * Person) so the read only happens once per server instance, not once per
 * route file.
 *
 * This is a SEPARATE asset from the live site's own self-hosted
 * `next/font/google` Noto Serif KR (`src/lib/fonts.ts`) — that font is
 * completely untouched by this file; OG image generation never touches the
 * live site's typography pipeline in either direction.
 */
const fontPromise = readFile(join(process.cwd(), "assets/og/NotoSerifKR-OG-Subset.ttf"));

export async function ogFontData(): Promise<Buffer> {
  return fontPromise;
}

export const OG_FONT_FAMILY = "Noto Serif KR OG";
