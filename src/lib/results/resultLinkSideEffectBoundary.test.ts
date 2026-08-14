import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * STAGE B PART 9 — crawler/privacy safety, locked as a permanent structural
 * guarantee, not just a one-time audit claim (`docs/
 * phase10-stageB-sharing-og-audit.md` Section F). A GET to `/results?r=...`
 * or `/compare/[slug]?r=...` — the exact request a social-media link-preview
 * crawler makes when a shared link is posted — must never create a Supabase
 * row, modify a Saved Result, require authentication, or mutate account
 * state.
 *
 * Same "direct source-text import check" strategy `SavedResultView.
 * boundary.test.ts` already established for a different invariant (this
 * project has no jsdom/@testing-library/react component-rendering
 * infrastructure — see that file's own doc comment) — fails loudly the
 * moment a future edit adds a forbidden import, rather than relying on code
 * review alone to catch a regression.
 *
 * Deliberately checks the PAGE files themselves, not `SignInCta.tsx`/
 * `SaveLastResult.tsx` — those are legitimate, already-audited `"use
 * client"` islands that only ever act on an explicit signed-in user
 * action or a real browser's own `useEffect` (never triggered by a
 * non-JS-executing crawler fetching raw HTML) — see the audit's Section F
 * for the full reasoning. This test's job is narrower and stronger: prove
 * the SERVER-RENDERED page component itself — the part that unconditionally
 * runs for every GET, crawler or human — has no way to reach Supabase at
 * all.
 */
const here = dirname(fileURLToPath(import.meta.url));

const FORBIDDEN_IMPORT_PATTERNS = [
  /from ["'][^"']*@lib\/supabase\//,
  /from ["'][^"']*lib\/supabase\//,
  /createClient/,
  /createServerClient/,
];

const FILES_TO_CHECK = [
  resolve(here, "../../../app/[locale]/results/page.tsx"),
  resolve(here, "../../../app/[locale]/compare/[slug]/page.tsx"),
];

describe("Results/Compare page: no server-side Supabase reachability from a bare GET", () => {
  for (const file of FILES_TO_CHECK) {
    it(`${file.split(/[\\/]/).slice(-4).join("/")} imports nothing from src/lib/supabase and calls no Supabase client factory`, () => {
      const source = readFileSync(file, "utf8");
      const importBlocks = source.match(/import\s+[\s\S]*?from\s+["'][^"']+["'];/g) ?? [];
      const importText = importBlocks.join("\n");
      expect(importBlocks.length, `expected to find at least one import statement in ${file}`).toBeGreaterThan(0);
      for (const pattern of FORBIDDEN_IMPORT_PATTERNS) {
        expect(pattern.test(importText), `forbidden pattern ${pattern} matched an import statement in ${file}`).toBe(false);
      }
      // Belt-and-suspenders: the identifiers themselves must not appear
      // ANYWHERE in the file (not just import statements) — proves no
      // dynamic `await import("@lib/supabase/...")` workaround exists
      // either.
      expect(source.includes("createServerClient")).toBe(false);
      expect(source).not.toMatch(/@lib\/supabase/);
    });
  }
});
