/**
 * OG GLYPH SET — Stage B. Prints the exact Unicode character set the Person
 * (and any future) OG images need to render correctly, derived directly from
 * live repository data (person display names, occupations, era labels,
 * lifespan formatting, the fixed brand wordmark) — never a manually guessed
 * Korean character sample. This is what `assets/og/NotoSerifKR-OG-Subset.ttf`
 * was subsetted from (see `assets/og/README.md`), and what any future
 * re-subset after a roster change should be regenerated from.
 *
 * `next/og`'s `ImageResponse` needs one complete `.ttf`/`.otf`/`.woff` font
 * buffer under a 500KB total bundle budget — the self-hosted `next/font/
 * google` Noto Serif KR asset (124 browser-oriented `.woff2` chunks, ~3.28MB
 * total) is architecturally unusable for this (see
 * `docs/phase10-stageB-sharing-og-audit.md` Section G). The fix is an
 * OG-only, offline-subsetted `.ttf` built with `fonttools`' `pyftsubset`
 * against exactly this character list — a one-time, build-time asset-prep
 * step with zero runtime dependency on the deployed app (Python/fonttools
 * are never installed or invoked at request time).
 *
 * Usage: `corepack pnpm@10 exec tsx src/dev/ogGlyphSet.ts > charset.txt`
 * then feed the `CHARS_START`/`CHARS_END` block to
 * `python -m fontTools.subset <source>.ttf --text-file=charset.txt ...`
 * (full command recorded in `assets/og/README.md`).
 */
import { SEED_PEOPLE } from "../data/people/seed.js";
import { personDisplayName, t } from "../core/i18n/index.js";
import type { MessageKey } from "../core/i18n/en.js";
import { formatLifespan } from "../ui/lib/display.js";

const chars = new Set<string>();
function add(s: string | undefined) {
  if (!s) return;
  for (const ch of s) chars.add(ch);
}

// Brand wordmark — always Latin, even on ko-KR (existing project convention:
// "The Great Inside" is never translated, e.g. compare page titles).
add("The Great Inside");

for (const locale of ["en-US", "ko-KR"] as const) {
  for (const person of SEED_PEOPLE) {
    add(personDisplayName(locale, person));
    const occId = person.occupationIds[0];
    if (occId) add(t(locale, `occupation.${occId}` as MessageKey));
    add(t(locale, `era.${person.era}` as MessageKey));
    add(formatLifespan(person.birthYear, person.deathYear, person.isLiving));
  }
}

// Punctuation/separators already used in the join patterns Person pages use
// (" · " between occupation and era; formatLifespan's en dash/parentheses),
// plus full Latin coverage (safe, tiny glyph-count cost) so a future
// English person/occupation string can't silently hit a missing glyph.
add(" ·–—.,()'\"’‘0123456789");
add("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");

const sorted = [...chars].sort((a, b) => a.codePointAt(0)! - b.codePointAt(0)!);
const hangul = sorted.filter((c) => c.codePointAt(0)! >= 0xac00 && c.codePointAt(0)! <= 0xd7a3);

console.log(`TOTAL_UNIQUE_CHARS ${sorted.length} (Hangul: ${hangul.length}, other: ${sorted.length - hangul.length})`);
console.log("CHARS_START");
console.log(sorted.join(""));
console.log("CHARS_END");
