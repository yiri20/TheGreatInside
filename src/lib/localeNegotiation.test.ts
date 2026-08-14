import { describe, expect, it } from "vitest";
import {
  LOCALE_COOKIE_MAX_AGE_SECONDS,
  LOCALE_COOKIE_NAME,
  localeCookieString,
  parseAcceptLanguage,
  resolveEntryLocale,
} from "./localeNegotiation";

describe("parseAcceptLanguage", () => {
  it("resolves ko to ko-KR", () => {
    expect(parseAcceptLanguage("ko")).toBe("ko-KR");
  });

  it("resolves ko-KR to ko-KR", () => {
    expect(parseAcceptLanguage("ko-KR")).toBe("ko-KR");
  });

  it("resolves lowercase ko-kr to ko-KR", () => {
    expect(parseAcceptLanguage("ko-kr")).toBe("ko-KR");
  });

  it("resolves en to en-US", () => {
    expect(parseAcceptLanguage("en")).toBe("en-US");
  });

  it("resolves an unsupported English variant (en-GB) to en-US", () => {
    expect(parseAcceptLanguage("en-GB")).toBe("en-US");
  });

  it("resolves en-US directly to en-US", () => {
    expect(parseAcceptLanguage("en-US")).toBe("en-US");
  });

  it("respects q-values, picking the highest-priority supported language", () => {
    expect(parseAcceptLanguage("fr;q=0.9, ko;q=0.8, en;q=0.5")).toBe("ko-KR");
  });

  it("falls through unsupported languages to find a supported one further down the list", () => {
    expect(parseAcceptLanguage("fr-FR,de;q=0.9,ko;q=0.8")).toBe("ko-KR");
  });

  it("returns undefined for a completely unsupported language with no fallback match", () => {
    expect(parseAcceptLanguage("fr-FR,de-DE")).toBeUndefined();
  });

  it("returns undefined for a null header", () => {
    expect(parseAcceptLanguage(null)).toBeUndefined();
  });

  it("returns undefined for an undefined header", () => {
    expect(parseAcceptLanguage(undefined)).toBeUndefined();
  });

  it("returns undefined for an empty string header", () => {
    expect(parseAcceptLanguage("")).toBeUndefined();
  });

  it("fails safely (undefined) on a malformed header rather than throwing", () => {
    expect(() => parseAcceptLanguage(";;;q=,,,garbage===")).not.toThrow();
    expect(parseAcceptLanguage(";;;q=,,,garbage===")).toBeUndefined();
  });

  it("skips a bare wildcard entry rather than force-matching it", () => {
    expect(parseAcceptLanguage("*")).toBeUndefined();
  });

  it("handles a wildcard mixed with a real supported language", () => {
    expect(parseAcceptLanguage("*;q=0.1,ko;q=0.9")).toBe("ko-KR");
  });

  it("handles garbage q-values by treating them as the lowest priority, not throwing", () => {
    expect(parseAcceptLanguage("ko;q=notanumber,en;q=0.5")).toBe("en-US");
  });
});

describe("resolveEntryLocale", () => {
  it("prefers the explicit cookie over Accept-Language", () => {
    expect(
      resolveEntryLocale({ cookieValue: "en-US", acceptLanguageHeader: "ko-KR" }),
    ).toBe("en-US");
    expect(
      resolveEntryLocale({ cookieValue: "ko-KR", acceptLanguageHeader: "en-US" }),
    ).toBe("ko-KR");
  });

  it("ignores an invalid cookie value and falls through to Accept-Language", () => {
    expect(
      resolveEntryLocale({ cookieValue: "fr-FR", acceptLanguageHeader: "ko-KR" }),
    ).toBe("ko-KR");
  });

  it("falls back to Accept-Language when no cookie is present", () => {
    expect(resolveEntryLocale({ acceptLanguageHeader: "ko" })).toBe("ko-KR");
  });

  it("falls back to en-US (DEFAULT_LOCALE) when neither cookie nor Accept-Language resolve", () => {
    expect(resolveEntryLocale({})).toBe("en-US");
    expect(resolveEntryLocale({ acceptLanguageHeader: "fr-FR" })).toBe("en-US");
    expect(resolveEntryLocale({ cookieValue: null, acceptLanguageHeader: null })).toBe("en-US");
  });

  it("never produces a value outside LAUNCH_LOCALES, for any input", () => {
    const result = resolveEntryLocale({ cookieValue: "garbage", acceptLanguageHeader: "zz-ZZ" });
    expect(["en-US", "ko-KR"]).toContain(result);
  });
});

describe("LOCALE_COOKIE_NAME", () => {
  it("is the stable, shared cookie name", () => {
    expect(LOCALE_COOKIE_NAME).toBe("tgi_locale");
  });
});

describe("localeCookieString", () => {
  it("includes Path=/, the correct name/value, and SameSite=Lax", () => {
    const cookie = localeCookieString("ko-KR", { secure: false });
    expect(cookie).toContain("tgi_locale=ko-KR");
    expect(cookie).toContain("Path=/");
    expect(cookie).toContain("SameSite=Lax");
  });

  it("includes a long but reasonable Max-Age", () => {
    const cookie = localeCookieString("en-US", { secure: false });
    expect(cookie).toContain(`Max-Age=${LOCALE_COOKIE_MAX_AGE_SECONDS}`);
    // Long-lived (weeks+) but not absurd (not multiple decades).
    expect(LOCALE_COOKIE_MAX_AGE_SECONDS).toBeGreaterThan(60 * 60 * 24 * 30);
    expect(LOCALE_COOKIE_MAX_AGE_SECONDS).toBeLessThan(60 * 60 * 24 * 365 * 5);
  });

  it("adds Secure only when requested", () => {
    expect(localeCookieString("en-US", { secure: true })).toContain("Secure");
    expect(localeCookieString("en-US", { secure: false })).not.toContain("Secure");
  });

  it("never includes HttpOnly — this is a client-set preference, not an auth cookie", () => {
    expect(localeCookieString("en-US", { secure: true })).not.toContain("HttpOnly");
  });

  it("only ever encodes a real LAUNCH_LOCALES value passed to it", () => {
    const cookie = localeCookieString("ko-KR", { secure: true });
    expect(cookie.startsWith("tgi_locale=ko-KR;")).toBe(true);
  });
});
