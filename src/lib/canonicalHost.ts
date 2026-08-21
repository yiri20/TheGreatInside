/**
 * DOMAIN MIGRATION (2026-08). Vercel's project-domain UI is the intended
 * place to redirect `www.thegreatinside.com` and the former production
 * hostname `the-great-inside.vercel.app` to the canonical apex domain —
 * this file is NOT meant to duplicate that as a matter of course. It
 * exists only because runtime verification (live `curl` against both
 * hostnames, 2026-08) found neither was actually being redirected at the
 * edge: both served the app directly with `200 OK`, and the
 * `Age` response header on the Vercel-hostname response (~5 days) ruled
 * out DNS/edge-cache propagation delay as an explanation. Per CLAUDE.md's
 * "Domain Migration" section, this is a deliberate belt-and-suspenders
 * safety net at the application layer, not a replacement for fixing the
 * Vercel dashboard's own domain-redirect configuration.
 *
 * Deliberately an ALLOWLIST of exactly the two known alternate hostnames,
 * never a blanket "anything that isn't the canonical host" rule — that
 * would incorrectly redirect local dev (`localhost:3000`) and every
 * Vercel preview deployment (`*-git-*.vercel.app`) to production, which
 * is never the intended behavior. Pure and host-string-only (no request
 * object dependency) so it has direct Vitest coverage — same "logic in
 * src/lib, thin middleware wrapper" convention as `localeNegotiation.ts`.
 */
export const CANONICAL_HOST = "thegreatinside.com";

const REDIRECT_HOSTS = new Set(["www.thegreatinside.com", "the-great-inside.vercel.app"]);

/**
 * Returns the absolute canonical URL to redirect to, or `undefined` if
 * `host` is not one of the known non-canonical aliases (including the
 * canonical host itself, `localhost`, and any preview deployment host —
 * none of these should ever redirect here).
 */
export function canonicalRedirectUrl(host: string | null | undefined, pathname: string, search: string): string | undefined {
  if (!host) return undefined;
  // Strip a port if present (e.g. a misconfigured client sending
  // "www.thegreatinside.com:443") — none of the real hostnames above
  // carry a port, so this only ever narrows, never broadens, a match.
  const bareHost = host.split(":")[0];
  if (!bareHost || !REDIRECT_HOSTS.has(bareHost)) return undefined;
  return `https://${CANONICAL_HOST}${pathname}${search}`;
}
