import { execSync } from "node:child_process";

/**
 * Regenerates the Saved Result static preview fixtures (Phase 10D-3
 * follow-up) before every Playwright run, so `savedResult.visual.spec.ts`
 * never runs against stale output — same "never trust a manually-run,
 * possibly-forgotten generation step" discipline as running a full
 * `next build` before `next start` in `playwright.config.ts`'s own
 * `webServer.command`. Cheap (well under a second) and side-effect-free
 * beyond writing into the gitignored `test-artifacts/` directory.
 */
export default function globalSetup(): void {
  execSync("corepack pnpm@10 exec tsx src/dev/savedResultPreview.tsx", { stdio: "inherit" });
}
