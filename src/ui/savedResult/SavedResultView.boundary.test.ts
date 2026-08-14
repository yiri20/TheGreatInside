import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * HISTORICAL-FIDELITY IMPORT BOUNDARY — Phase 10D-3 follow-up.
 *
 * `SavedResultView.tsx` (and the real page that renders it) must never
 * import anything from `src/core/quiz`, `src/core/matching`,
 * `src/core/greatness`, or `src/core/interpretation`'s selection logic —
 * see both files' own doc comments for why. This project has no
 * jsdom/@testing-library/react component-rendering infrastructure (see
 * `savedResultPageState.ts`'s own doc comment), so the strongest available
 * automated guard is a direct source-text check: fails loudly the moment a
 * future edit adds a forbidden import, rather than relying on code review
 * alone to catch a historical-fidelity regression.
 */
const here = dirname(fileURLToPath(import.meta.url));

const FORBIDDEN_IMPORT_PATTERNS = [
  /from ["'][^"']*core\/quiz\//,
  /from ["'][^"']*core\/matching\//,
  /from ["'][^"']*core\/greatness\//,
  /from ["'][^"']*core\/interpretation\//,
  /scoreQuiz/,
  /buildResultSet/,
  /computeGreatnessPotential/,
  /computeResultView/,
  /renderComparison/,
  /selectComparisonTemplate/,
];

const FILES_TO_CHECK = [
  resolve(here, "SavedResultView.tsx"),
  resolve(here, "../../../app/[locale]/account/results/[id]/page.tsx"),
];

describe("Saved Result historical-fidelity import boundary", () => {
  for (const file of FILES_TO_CHECK) {
    it(`${file.split(/[\\/]/).slice(-4).join("/")} imports nothing from the forbidden src/core surfaces`, () => {
      const source = readFileSync(file, "utf8");
      // Scoped to actual `import ... from "...";` statement BLOCKS (which
      // may span multiple lines) only — several of these identifiers (e.g.
      // `computeResultView`) are deliberately NAMED in doc-comment prose
      // explaining why this file does NOT call them, which would
      // otherwise false-positive against a naive whole-file scan.
      const importBlocks = source.match(/import\s+[\s\S]*?from\s+["'][^"']+["'];/g) ?? [];
      const importText = importBlocks.join("\n");
      expect(importBlocks.length, `expected to find at least one import statement in ${file}`).toBeGreaterThan(0);
      for (const pattern of FORBIDDEN_IMPORT_PATTERNS) {
        expect(pattern.test(importText), `forbidden pattern ${pattern} matched an import statement in ${file}`).toBe(false);
      }
    });
  }
});
