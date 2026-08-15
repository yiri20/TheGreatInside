import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Broader Public Launch Finish Line, Part 6 — locks the deliberate scope
 * decision as a permanent structural guarantee, not just a one-time audit
 * claim. Full identity/account deletion (removing the `auth.users` row
 * itself) would require the service-role/`SUPABASE_SECRET_KEY` admin
 * client — introducing a privileged server secret into a live code path
 * for the first time. Per the explicit instruction that governed this
 * feature ("if implementation would require introducing privileged
 * server secrets... STOP and report it as a decision/blocker rather than
 * improvising insecurely"), only the SMALL, non-privileged piece was
 * built: deleting a user's own `user_profiles` rows via their own
 * authenticated session, which RLS already permits with no service-role
 * involved at all. This test fails loudly if a future edit quietly
 * escalates that scope.
 */
const here = dirname(fileURLToPath(import.meta.url));
const FILES = [
  resolve(here, "./deleteSavedResults.ts"),
  resolve(here, "./deleteSavedResultsServer.ts"),
];

const FORBIDDEN_PATTERNS = [
  /SUPABASE_SECRET_KEY/,
  /service_role/i,
  /auth\.admin/,
  /deleteUser/,
  /supabaseAdmin/i,
];

/** Strips `/* ... *\/` and `// ...` comments before scanning — this file's
 *  own doc comments legitimately NAME `SUPABASE_SECRET_KEY` in prose while
 *  explaining that it's deliberately NOT used; only real code should ever
 *  fail this check. */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

describe("deleteSavedResults*: never introduces a service-role/admin Supabase client", () => {
  for (const file of FILES) {
    it(`${file.split(/[\\/]/).pop()} contains no service-role/admin usage in real code`, () => {
      const code = stripComments(readFileSync(file, "utf8"));
      for (const pattern of FORBIDDEN_PATTERNS) {
        expect(pattern.test(code), `forbidden pattern ${pattern} matched in ${file} (outside comments)`).toBe(false);
      }
    });
  }
});
