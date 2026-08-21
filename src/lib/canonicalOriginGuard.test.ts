import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * DOMAIN MIGRATION (2026-08) — regression guard. `thegreatinside.com` is
 * the official public origin (see CLAUDE.md's "Domain Migration"
 * section); the former Vercel-assigned hostname
 * (`the-great-inside.vercel.app`) must never again be emitted as a
 * canonical/public/share/SEO origin. The entire app already resolves
 * every public URL through `siteUrl()` (`src/lib/env.ts`) rather than any
 * hardcoded host, by design — this test locks that property in place: it
 * statically scans `app/` and `src/` for a literal occurrence of the old
 * hostname OUTSIDE test files, so a future change can't silently
 * reintroduce it as a hardcoded fallback or copy-pasted example.
 *
 * Test files are deliberately excluded — several legitimately use the old
 * hostname as an arbitrary example value to exercise the generic
 * `VERCEL_PROJECT_PRODUCTION_URL`-fallback mechanism in `siteUrl()`, not
 * to assert anything about the real canonical origin (see `env.test.ts`,
 * `seo.test.ts`, `sitemapEntries.test.ts`, `robotsConfig.test.ts`).
 */
const OLD_HOSTNAME = "the-great-inside.vercel.app";

const here = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(here, "../..");
const SCAN_DIRS = ["app", "src"];
const EXCLUDED_DIR_NAMES = new Set(["node_modules", ".next", "test-artifacts"]);

function isTestFile(path: string): boolean {
  return /\.test\.(ts|tsx)$/.test(path);
}

function collectSourceFiles(dir: string, out: string[]): void {
  for (const entry of readdirSync(dir)) {
    if (EXCLUDED_DIR_NAMES.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      collectSourceFiles(full, out);
    } else if (/\.(ts|tsx|js|jsx|mjs)$/.test(entry) && !isTestFile(entry)) {
      out.push(full);
    }
  }
}

describe("no source file hardcodes the former Vercel production hostname", () => {
  const files: string[] = [];
  for (const dir of SCAN_DIRS) {
    collectSourceFiles(resolve(REPO_ROOT, dir), files);
  }

  it("scanned at least one file (guards against a silently-empty scan)", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it(`contains zero occurrences of "${OLD_HOSTNAME}" in app/ or src/ (excluding *.test.ts)`, () => {
    const offenders = files.filter((f) => readFileSync(f, "utf8").includes(OLD_HOSTNAME));
    expect(offenders).toEqual([]);
  });
});
