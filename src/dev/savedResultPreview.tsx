/**
 * Saved Result static preview renderer — Phase 10D-3 follow-up.
 *
 * Same pattern as `gallery.tsx`: renders the REAL `SavedResultView`
 * component (no mock, no stub) with HANDCRAFTED synthetic
 * `ResultSnapshotV1` fixtures to static HTML files, so Playwright can
 * verify Saved Result's rendering logic — section presence/absence, DOM
 * order, responsive composition, overflow — WITHOUT a real authenticated
 * Supabase session. `SavedResultView` itself has zero Supabase/auth/
 * `src/core/quiz|matching|greatness|interpretation` coupling (see its own
 * doc comment), so this script's only job is supplying locale + a frozen
 * snapshot and letting React render.
 *
 * Each (fixture × locale) pair is wrapped in the same `<div lang={locale}>`
 * structure `app/[locale]/layout.tsx` uses (so the `:lang(ko)` Korean
 * typography rule in `components.css` applies correctly) — deliberately
 * WITHOUT the real `<Header>`/`<PendingResultsSync>`, since both require a
 * live Supabase session to render meaningfully and are unrelated to what
 * this suite verifies (Saved Result's own composition, already covered by
 * every other Playwright suite for the header itself). Known, disclosed
 * limitation: `next/font`'s self-hosted Noto Serif KR is a Next.js build
 * artifact this plain script cannot reproduce, so Korean person-name
 * headings fall back to a generic serif here rather than the exact
 * production font — irrelevant to what this suite checks (DOM structure,
 * section presence, responsive composition, overflow), and the font
 * pipeline itself is already proven working by Live Results' own suite,
 * which runs through a real Next.js server.
 *
 * Run: corepack pnpm@10 exec tsx src/dev/savedResultPreview.tsx
 * Out: test-artifacts/saved-result-preview/{fixture}-{locale}.html
 *      (gitignored, regenerated per run — never committed)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import { SavedResultView } from "../ui/savedResult/SavedResultView.js";
import { SAVED_RESULT_FIXTURES } from "./savedResultFixtures.js";
import type { Locale } from "../core/types.js";

const here = dirname(fileURLToPath(import.meta.url));
const LOCALES: Locale[] = ["en-US", "ko-KR"];

const tokens = readFileSync(resolve(here, "../ui/styles/tokens.css"), "utf8");
const components = readFileSync(resolve(here, "../ui/styles/components.css"), "utf8");

const outDir = resolve(here, "../../test-artifacts/saved-result-preview");
mkdirSync(outDir, { recursive: true });

let count = 0;
for (const [name, snapshot] of Object.entries(SAVED_RESULT_FIXTURES)) {
  for (const locale of LOCALES) {
    const html = `<!doctype html>
<html lang="${locale === "ko-KR" ? "ko" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Saved Result preview — ${name} (${locale})</title>
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0}
${tokens}
${components}
</style>
</head>
<body class="tgi-root">
<div lang="${locale}">
${renderToStaticMarkup(<SavedResultView snapshot={snapshot} locale={locale} />)}
</div>
</body>
</html>
`;
    const outFile = resolve(outDir, `${name}-${locale}.html`);
    writeFileSync(outFile, html, "utf8");
    count++;
  }
}

process.stdout.write(`wrote ${count} saved-result preview files to ${outDir}\n`);
