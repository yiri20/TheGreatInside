/**
 * Deep Inside Report static preview renderer — Monetization v1. Same
 * `gallery.tsx`/`savedResultPreview.tsx` pattern: renders the REAL
 * `DeepInsideReportView` component with handcrafted synthetic
 * `DeepInsideReportV1` fixtures to static HTML, so Playwright can verify
 * its rendering (section presence/absence, EN/KO, responsive composition,
 * overflow) WITHOUT a real authenticated+entitled Supabase session or a
 * real Stripe purchase.
 *
 * Run: corepack pnpm@10 exec tsx src/dev/deepInsideReportPreview.tsx
 * Out: test-artifacts/deep-inside-preview/{fixture}-{locale}.html
 *      (gitignored, regenerated per run — never committed)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import { DeepInsideReportView } from "../ui/deepInside/DeepInsideReportView.js";
import { DEEP_INSIDE_REPORT_FIXTURES } from "./deepInsideReportFixtures.js";
import type { Locale } from "../core/types.js";

const here = dirname(fileURLToPath(import.meta.url));
const LOCALES: Locale[] = ["en-US", "ko-KR"];

const tokens = readFileSync(resolve(here, "../ui/styles/tokens.css"), "utf8");
const components = readFileSync(resolve(here, "../ui/styles/components.css"), "utf8");

const outDir = resolve(here, "../../test-artifacts/deep-inside-preview");
mkdirSync(outDir, { recursive: true });

let count = 0;
for (const [name, report] of Object.entries(DEEP_INSIDE_REPORT_FIXTURES)) {
  for (const locale of LOCALES) {
    const html = `<!doctype html>
<html lang="${locale === "ko-KR" ? "ko" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Deep Inside preview — ${name} (${locale})</title>
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0}
${tokens}
${components}
</style>
</head>
<body class="tgi-root">
<div lang="${locale}" class="tgi-container" style="padding-top:3rem;padding-bottom:6rem">
${renderToStaticMarkup(<DeepInsideReportView report={report} locale={locale} />)}
</div>
</body>
</html>
`;
    const outFile = resolve(outDir, `${name}-${locale}.html`);
    writeFileSync(outFile, html, "utf8");
    count++;
  }
}

process.stdout.write(`wrote ${count} deep-inside preview files to ${outDir}\n`);
