// Beta finish-line: offline favicon/icon asset generation. One-time
// asset-preparation tool, same category as `ogGlyphSet.ts`/the OG font
// subsetting workflow — not a runtime dependency of the deployed app.
// Renders the TGI monogram deterministically via `next/og`'s `ImageResponse`
// (Satori + resvg, the same renderer Stage B's OG images already use),
// reusing the existing OG font asset (`src/lib/og/font.ts`) so no new font
// file is needed — the mark is Latin-only and that subset already covers
// full Latin "for headroom" (see `assets/og/README.md`).
//
// Regenerate with: corepack pnpm@10 exec tsx src/dev/generateIcons.tsx
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og.js";
import { ogFontData, OG_FONT_FAMILY } from "../lib/og/font.js";

const PAPER = "#faf8f4";
const INK = "#1c1a17";
const ACCENT = "#4a3f6b";

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, "assets", "icons");

type MarkSize = { name: string; size: number; radiusPct: number };

// 16/32 are the two favicon.ico entries; 180 is the Apple touch icon size;
// 512 is a general-purpose larger PNG icon (headroom for any future
// manifest use — a manifest itself is out of Public Beta Finish Line scope,
// this is just the source asset in case one is added later).
const SIZES: MarkSize[] = [
  { name: "icon-16", size: 16, radiusPct: 22 },
  { name: "icon-32", size: 32, radiusPct: 22 },
  { name: "icon-180", size: 180, radiusPct: 22 }, // Apple touch icons must be opaque; PAPER has no transparency
  { name: "icon-512", size: 512, radiusPct: 22 },
];

async function renderMark(size: number, radiusPct: number): Promise<Buffer> {
  const fontData = await ogFontData();
  const radius = Math.round((size * radiusPct) / 100);
  // Proportions tuned by direct visual inspection at 16px — a 3-letter
  // "TGI" monogram (the initially preferred mark) collapses to an
  // illegible blob at favicon size, so the shipped mark is a single bold
  // serif "T" — see `assets/icons/README.md` for the record of why "TGI"
  // was tried first and replaced with the "similarly minimal typographic
  // mark" alternative CLAUDE.md's brief explicitly allowed for.
  const glyphSize = Math.round(size * 0.56);
  const barWidth = Math.round(size * 0.34);
  const barHeight = Math.max(1, Math.round(size * 0.045));

  const res = new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: PAPER,
          borderRadius: radius,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", fontFamily: OG_FONT_FAMILY, fontSize: glyphSize, color: INK, lineHeight: 1 }}>
            T
          </div>
          <div
            style={{
              display: "flex",
              width: barWidth,
              height: barHeight,
              backgroundColor: ACCENT,
              marginTop: Math.max(1, Math.round(size * 0.06)),
            }}
          />
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [{ name: OG_FONT_FAMILY, data: fontData, style: "normal", weight: 400 }],
    },
  );

  return Buffer.from(await res.arrayBuffer());
}

// Minimal, dependency-free ICO container packer. Modern ICO format (since
// Windows Vista) allows embedding PNG data directly per entry instead of
// requiring raw BMP bitmap encoding — this constructs exactly that, with
// no image-processing library needed. Format: 6-byte ICONDIR header, one
// 16-byte ICONDIRENTRY per image, then each image's raw PNG bytes appended
// in the same order as its entry.
function buildIco(images: { size: number; png: Buffer }[]): Buffer {
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset0 = headerSize + entrySize * images.length;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(images.length, 4); // image count

  const entries: Buffer[] = [];
  const dataBufs: Buffer[] = [];
  let offset = dataOffset0;
  for (const { size, png } of images) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8); // data size
    entry.writeUInt32LE(offset, 12); // data offset
    entries.push(entry);
    dataBufs.push(png);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...dataBufs]);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const rendered = new Map<number, Buffer>();
  for (const spec of SIZES) {
    const png = await renderMark(spec.size, spec.radiusPct);
    rendered.set(spec.size, png);
    await writeFile(join(OUT_DIR, `${spec.name}.png`), png);
    console.log(`wrote assets/icons/${spec.name}.png (${png.length} bytes)`);
  }

  const ico = buildIco([
    { size: 16, png: rendered.get(16)! },
    { size: 32, png: rendered.get(32)! },
  ]);
  await writeFile(join(OUT_DIR, "favicon.ico"), ico);
  console.log(`wrote assets/icons/favicon.ico (${ico.length} bytes, 16+32 embedded PNG entries)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
