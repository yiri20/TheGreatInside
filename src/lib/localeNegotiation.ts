import { DEFAULT_LOCALE, LAUNCH_LOCALES, type Locale } from "@core/types";

/**
 * POST-10D STAGE A, item 6/7. Shared between `proxy.ts` (bare `/`
 * negotiation) and `LocaleSwitcher.tsx` (writing the preference), so the
 * cookie name/shape can never drift between the writer and the reader.
 * Deliberately NOT `HttpOnly` — this is a client-set, non-sensitive UI
 * preference (which language to show), never an auth/security cookie.
 */
export const LOCALE_COOKIE_NAME = "tgi_locale";

/** ~1 year — "long but reasonable," per the Stage A directive; not
 *  effectively-permanent (no multi-year value), not session-only. */
export const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function isLaunchLocale(value: string): value is Locale {
  return (LAUNCH_LOCALES as readonly string[]).includes(value);
}

function primarySubtag(tag: string): string {
  return tag.split("-")[0]!.toLowerCase();
}

/**
 * `Accept-Language` parsing with q-value support, scoped only to
 * `LAUNCH_LOCALES`. Matches on primary subtag, so `ko`/`ko-KR`/`ko-kr` all
 * resolve to `ko-KR`, and `en`/`en-GB`/any other English variant resolves
 * to `en-US` (Stage A's explicit requirement — this product ships one
 * English variant, not per-region English copy). A bare wildcard (`*`) is
 * skipped rather than force-matched to the first supported locale — with
 * only two supported locales and an `en-US` fallback already in place,
 * treating `*` as "no strong preference" and falling through to that
 * fallback produces the same practical result with simpler semantics.
 *
 * Never throws: any malformed header (stray characters, garbage q-values,
 * empty segments) is filtered out or caught, and the function simply
 * returns `undefined` — the caller's fallback to `DEFAULT_LOCALE` is what
 * makes "malformed headers fail safely to en-US" true, not this function
 * refusing to fail.
 */
export function parseAcceptLanguage(header: string | null | undefined): Locale | undefined {
  if (!header) return undefined;
  try {
    const entries = header
      .split(",")
      .map((part) => {
        const [rawTag, ...params] = part.trim().split(";");
        const tag = (rawTag ?? "").trim();
        const qParam = params.find((p) => p.trim().toLowerCase().startsWith("q="));
        const parsedQ = qParam ? Number.parseFloat(qParam.split("=")[1] ?? "") : 1;
        const q = Number.isFinite(parsedQ) ? parsedQ : 0;
        return { tag, q };
      })
      .filter((e) => e.tag.length > 0 && e.tag !== "*")
      .sort((a, b) => b.q - a.q);

    for (const { tag } of entries) {
      const primary = primarySubtag(tag);
      const match = LAUNCH_LOCALES.find((locale) => primarySubtag(locale) === primary);
      if (match) return match;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * The bare-`/` entry-point decision, precedence: explicit saved locale
 * preference (`tgi_locale` cookie) -> `Accept-Language` -> `DEFAULT_LOCALE`.
 * No IP/geolocation input of any kind. Pure function — `proxy.ts` supplies
 * the two raw inputs it reads from the request; this has no knowledge of
 * `NextRequest`/`NextResponse` at all, so it's directly unit-testable
 * without constructing a fake request object.
 */
/**
 * The literal `Set-Cookie`/`document.cookie` string for persisting an
 * EXPLICIT locale choice (`LocaleSwitcher.tsx`). Pure string-building, no
 * DOM/`document` dependency, so it's directly unit-testable — the actual
 * `document.cookie =` write happens at the one client call site.
 * `SameSite=Lax` (not `Strict`): this is a simple UI preference, not an
 * auth cookie, and `Lax` is the standard safe default. Never `HttpOnly` —
 * this is set by client JS, which cannot set `HttpOnly` cookies at all, so
 * that requirement holds structurally, not just by convention. `secure`
 * is the caller's responsibility (checked against `window.location.protocol`
 * at the call site) so this function stays framework/DOM-free.
 */
export function localeCookieString(locale: Locale, opts: { secure: boolean }): string {
  const attrs = [
    `${LOCALE_COOKIE_NAME}=${locale}`,
    "Path=/",
    `Max-Age=${LOCALE_COOKIE_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
  ];
  if (opts.secure) attrs.push("Secure");
  return attrs.join("; ");
}

export function resolveEntryLocale(opts: {
  cookieValue?: string | null | undefined;
  acceptLanguageHeader?: string | null | undefined;
}): Locale {
  if (opts.cookieValue && isLaunchLocale(opts.cookieValue)) {
    return opts.cookieValue;
  }
  return parseAcceptLanguage(opts.acceptLanguageHeader) ?? DEFAULT_LOCALE;
}
