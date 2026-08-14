# OG font asset — `NotoSerifKR-OG-Subset.ttf`

Stage B (sharing UX + Open Graph). Used only by `next/og`'s `ImageResponse`
calls (`app/opengraph-image.tsx`, `app/[locale]/people/[slug]/opengraph-image.tsx`)
— never loaded by the live website, which keeps using its own self-hosted
`next/font/google` Noto Serif KR exactly as before (see `src/lib/fonts.ts`).

## Why this exists

`ImageResponse` needs one complete `.ttf`/`.otf`/`.woff` font buffer under a
500KB total bundle budget. The site's own Noto Serif KR asset ships as 124
browser-oriented `.woff2` chunks (~3.28MB total, `next/font/google`'s own
Unicode-range subsetting for lazy `@font-face` loading) — architecturally
unusable here: wrong format, and far over budget even if reformatted. See
`docs/phase10-stageB-sharing-og-audit.md` Section G for the full audit.

## Provenance

- Source: the official variable-weight `Noto Serif KR` TTF from Google's
  public font repository (`google/fonts`, `ofl/notoserifkr/`) — the same
  upstream source `next/font/google` itself downloads from at build time.
- Instantiated at a static weight of 400 (Regular) — the same weight
  `src/lib/fonts.ts` uses for the live site — via
  `fontTools.varLib.instancer`.
- Subsetted to the character set `src/dev/ogGlyphSet.ts` derives from
  live repository data (all `person.name.*` display names, the occupation/
  era labels actually used by the current roster, `formatLifespan`'s
  output characters, the fixed "The Great Inside" wordmark, plus full Latin
  + common punctuation for headroom) — **227 unique characters at build
  time** (152 Hangul syllables + 75 Latin/digit/punctuation). The script
  was trimmed by one unused defensive candidate string shortly after the
  font was built; the live script now reports **226** (151 Hangul + 75
  other) — the committed subset is a strict superset (1 harmless unused
  glyph) and still covers 100% of what the live script requires, reverified
  2026-08 (see "Verification performed" below).

## Regenerating after a roster change

```bash
# 1. Regenerate the exact character list from current data:
corepack pnpm@10 exec tsx src/dev/ogGlyphSet.ts

# 2. Fetch the source variable font (one-time, or re-use a cached copy):
curl -sL -o NotoSerifKR-Regular.ttf \
  "https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifkr/NotoSerifKR%5Bwght%5D.ttf"

# 3. Pin to static weight 400:
python -m fontTools.varLib.instancer NotoSerifKR-Regular.ttf wght=400 \
  -o NotoSerifKR-400-full.ttf

# 4. Subset to the character list printed in step 1 (paste the
#    CHARS_START/CHARS_END block into charset.txt first):
python -m fontTools.subset NotoSerifKR-400-full.ttf \
  --text-file=charset.txt \
  --output-file=NotoSerifKR-OG-Subset.ttf \
  --flavor= --layout-features='*' --glyph-names --symbol-cmap \
  --legacy-cmap --notdef-glyph --notdef-outline --recommended-glyphs \
  --name-IDs='*' --name-legacy --name-languages='*'
```

`fontTools`/Python are offline, build-time, asset-preparation tools only —
neither is a runtime dependency of the deployed Next.js app, and the
subset output is committed as a static file, not generated at request time.

## Verification performed (2026-08, reconfirmed at Stage B closeout)

- Every one of the 226 characters the live `src/dev/ogGlyphSet.ts` script
  currently requires resolves to a real glyph in the committed subset
  (`font.getBestCmap()` checked programmatically against the file on disk)
  — **0 missing**, both at initial build and reconfirmed at closeout.
- Output size: **149,020 bytes (~145.5KB)**, comfortably under
  `ImageResponse`'s 500KB total bundle budget, vs. ~3.28MB for the
  unusable full web asset — not merely smaller, categorically different.
- Rendered and visually inspected: da Vinci (EN, the one portrait-present
  case — portrait not used in the OG image), Mozart (KO, longest Korean
  display name), Rumi (EN, longest English display name), Ada Lovelace
  (EN, no portrait), Marie Curie (KO, short name) — zero missing-glyph
  boxes, zero clipping, correct line wrapping at every size tested.

## License

`Noto Serif KR` is licensed under the SIL Open Font License, Version 1.1
(`NotoSerifKR-OFL.txt` in this directory, fetched from the same upstream
`google/fonts` source). The OFL explicitly permits creating and
redistributing modified/subsetted versions; this subset is not
redistributed as "Noto Serif KR" itself, only used internally by this
project's own OG image generation.
