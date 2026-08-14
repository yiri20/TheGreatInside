import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * STAGE B PART 9 — Saved Result and Account are owner-only, RLS-gated
 * routes and must NEVER gain a public Share action (`docs/
 * phase10-stageB-sharing-og-audit.md` Section A — a shared link to either
 * route is useless to anyone but its owner, since `fetchSavedResult.ts`
 * doesn't even select `result_token`, and ownership is enforced entirely by
 * RLS). Locked as a permanent structural guarantee — the same
 * import-boundary strategy `resultLinkSideEffectBoundary.test.ts` and
 * `SavedResultView.boundary.test.ts` already use — rather than trusting
 * "nobody added it" to hold forever by convention alone.
 */
const here = dirname(fileURLToPath(import.meta.url));

const FILES_TO_CHECK = [
  resolve(here, "../../../app/[locale]/account/page.tsx"),
  resolve(here, "../../../app/[locale]/account/results/[id]/page.tsx"),
  resolve(here, "../../../src/ui/savedResult/SavedResultView.tsx"),
];

describe("Saved Result / Account: no public Share control", () => {
  for (const file of FILES_TO_CHECK) {
    it(`${file.split(/[\\/]/).slice(-4).join("/")} never imports ShareButton`, () => {
      const source = readFileSync(file, "utf8");
      expect(source).not.toMatch(/ShareButton/);
      expect(source).not.toMatch(/from ["'][^"']*components\/share/);
    });
  }
});
