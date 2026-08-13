import { defineConfig } from "@playwright/test";

/**
 * Minimal visual-smoke harness (Phase 10D-1). Chromium only, deliberately —
 * this exists to let an agent verify responsive layout work itself (overflow,
 * wrapping, console errors, screenshots) rather than asking for manual
 * per-viewport checks, not to be a cross-browser compatibility suite.
 *
 * Runs against the SAME `next dev --webpack` command `pnpm dev` uses (this
 * project's build must never run under Turbopack — see CLAUDE.md "Stack") on
 * a dedicated port so it never collides with a developer's own running dev
 * server.
 */
const PORT = 3177;

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-artifacts/playwright-output",
  fullyParallel: true,
  retries: 0,
  // next dev's cold first-compile per route can take 10s+ (webpack, not
  // Turbopack — see CLAUDE.md "Stack"); the default 30s test timeout is too
  // tight for a test that navigates across several not-yet-compiled routes.
  timeout: 60_000,
  reporter: [["list"], ["html", { outputFolder: "./test-artifacts/playwright-report", open: "never" }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `corepack pnpm@10 exec next dev --webpack -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
