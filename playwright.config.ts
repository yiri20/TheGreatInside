import { defineConfig } from "@playwright/test";

/**
 * Minimal visual-smoke harness (Phase 10D-1). Chromium only, deliberately —
 * this exists to let an agent verify responsive layout work itself (overflow,
 * wrapping, console errors, screenshots) rather than asking for manual
 * per-viewport checks, not to be a cross-browser compatibility suite.
 *
 * Phase 10D-2: runs against a PRODUCTION build (`next build --webpack &&
 * next start`), not `next dev`. Originally used dev mode; under this
 * suite's real parallelism (91+ tests across ~11 workers as the suite
 * grew past Landing alone) `next dev`'s on-demand, serialized route
 * compilation caused genuine transient flakes — two different full-suite
 * runs each failed one DIFFERENT test, and both passed cleanly every time
 * when re-run alone, which is the signature of compile contention, not a
 * real bug in either test or in the page under test. Bumping the test
 * timeout further didn't fix it (still flaked at 90s, just on a different
 * test) because the problem isn't "not enough time," it's "the dev
 * compiler serializes work under concurrent load." A production server has
 * no on-demand compilation at all — every route is already built — which
 * removes the whole class of flake structurally rather than papering over
 * it, and is also a more accurate test of what actually ships. Trade-off:
 * the webServer command now runs a full build before starting (~15-20s),
 * paid once per harness invocation, not per test. Still uses `--webpack`
 * (this project's build must never run under Turbopack — see CLAUDE.md
 * "Stack") on a dedicated port so it never collides with a developer's own
 * dev server.
 */
const PORT = 3177;

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-artifacts/playwright-output",
  // Phase 10D-3 follow-up: regenerates the Saved Result static preview
  // fixtures (see savedResultPreview.tsx) once before the whole run.
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: true,
  retries: 0,
  timeout: 30_000,
  reporter: [["list"], ["html", { outputFolder: "./test-artifacts/playwright-report", open: "never" }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `corepack pnpm@10 exec next build --webpack && corepack pnpm@10 exec next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 180_000,
    stdout: "pipe",
    stderr: "pipe",
    // Monetization v1: clearly-fake, non-functional test values — just
    // enough for `isMonetizationEnabled()` to report true so the
    // signed-out-reachable UI (the Results teaser, /deep-inside's
    // sign-in-required state) can be exercised. No test in this suite
    // ever reaches a real Stripe API call (that would need a real test
    // secret key) — see e2e/deepInside.visual.spec.ts's own doc comment.
    env: {
      MONETIZATION_ENABLED: "true",
      STRIPE_SECRET_KEY: "sk_test_e2e_fake_not_a_real_key",
      STRIPE_WEBHOOK_SECRET: "whsec_e2e_fake_not_a_real_secret",
      STRIPE_DEEP_INSIDE_PRICE_ID: "price_e2e_fake_not_a_real_price",
    },
  },
});
