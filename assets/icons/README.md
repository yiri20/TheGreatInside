# Favicon / browser-identity icon assets

Public Beta Finish Line, Part 2 (see `CLAUDE.md`'s "Public Beta Finish
Line" section). Same offline, deterministic asset-preparation discipline
as `assets/og/` (Stage B's OG font subset) — generated once by a script,
committed as static output, never rendered at request time by the
deployed app.

## Mark

A single bold serif "T" (for "The Great Inside"), warm paper background
(`#faf8f4`), dark ink glyph (`#1c1a17`), one restrained purple accent bar
beneath it (`#4a3f6b`) — no gradient, no glassmorphism, no icon-library
glyph, no mascot. Same palette as the Stage B OG images
(`app/opengraph-image.tsx`), rendered with the same font
(`src/lib/og/font.ts`'s `Noto Serif KR` OG subset — already covers full
Latin, so no new font asset was needed for a Latin-only mark).

**A three-letter "TGI" monogram was tried first** (per the initial brief)
and rejected after direct visual inspection at 16×16 — three serif glyphs
collapse into an illegible blob at favicon size. A single "T" reads
clearly at all three required sizes (16, 32, 180) and was approved as the
"similarly minimal typographic mark" alternative the brief allowed for.

## Generation

```bash
corepack pnpm@10 exec tsx src/dev/generateIcons.tsx
```

Renders the mark via `next/og`'s `ImageResponse` (Satori + resvg, the same
renderer Stage B's OG images use) at 16, 32, 180, and 512px, writes each
PNG to this directory, and packs the 16+32 PNGs into a real multi-image
`favicon.ico` (a small, dependency-free ICO container packer embedded in
the script — modern ICO format allows embedding PNG data per entry
directly, no raw-bitmap encoding needed). Confirmed a genuine ICO
resource via `file favicon.ico`, not a renamed PNG.

## Where these are used

Copied (not symlinked — the same convention `assets/og`'s single subset
file follows) into Next.js's App Router icon file-convention paths:

- `assets/icons/favicon.ico` → `app/favicon.ico` (16+32 combined, legacy
  `/favicon.ico` request path)
- `assets/icons/icon-512.png` → `app/icon.png` (general `<link
  rel="icon">`, browsers/OS select and downscale as needed — this is a
  static-file convention, not `app/icon.tsx`, so it needs no runtime file
  read and no `outputFileTracingIncludes` entry)
- `assets/icons/icon-180.png` → `app/apple-icon.png` (Apple touch icon,
  opaque background as Apple requires — `#faf8f4` paper has no
  transparency)

Re-run the script and re-copy after any palette change to `PAPER`/`INK`/
`ACCENT` in `app/opengraph-image.tsx` (kept in sync by eye, not by a
shared constant, since the two files serve different rendering contexts —
OG images vs. static icon files — and Next's file-convention icons cannot
themselves read a shared TS module at request time without becoming
dynamic routes, which this deliberately avoids for something this static).
