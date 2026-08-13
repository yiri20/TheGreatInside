/** @type {import('next').NextConfig} */
const nextConfig = {
  // Full SEO/perf tuning (image domains, redirects, headers) is Phase 10 scope.
  // Phase 3 only needs the app to build and serve the people explorer.

  // Next 16's dev server otherwise silently appends an "agent rules" block
  // to CLAUDE.md on every `next dev`/`next build` run (see
  // node_modules/next/dist/server/lib/generate-agent-files.js) — discovered
  // Phase 10D-1 when it showed up as an uncommitted diff to this project's
  // hand-curated decision record. That file is edited deliberately and
  // reviewed line by line (see its own header); an auto-injected block is
  // exactly the kind of change this project's own conventions guard against.
  agentRules: false,

  // src/core and src/ui import each other with explicit .js specifiers
  // pointing at .ts files (required for tsx/vitest's Node-native ESM
  // resolution, which 150+ tests and the dev tooling depend on). Next's
  // webpack build resolves this automatically; Turbopack (the Next 16
  // default) does not, and neither of the config knobs below was enough to
  // fix that on its own when tested against Turbopack directly. `dev`/`build`
  // therefore pass `--webpack` explicitly (see package.json) until Turbopack
  // supports this resolution pattern. Left here in case a future Turbopack
  // release picks either of these up.
  turbopack: {
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
  },
  experimental: {
    extensionAlias: {
      ".js": [".ts", ".tsx", ".js"],
    },
  },
};

export default nextConfig;
