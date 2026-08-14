import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { localizedAlternates, NOINDEX_FOLLOW, NOINDEX_NOFOLLOW } from "./seo";

describe("localizedAlternates", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://thegreatinside.example";
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("builds a self-referential canonical for the current locale", () => {
    const result = localizedAlternates("en-US", "/people");
    expect(result.canonical).toBe("https://thegreatinside.example/en-US/people");
  });

  it("swaps locale in canonical for the other launch locale", () => {
    const result = localizedAlternates("ko-KR", "/people");
    expect(result.canonical).toBe("https://thegreatinside.example/ko-KR/people");
  });

  it("includes both launch locales in the hreflang languages map", () => {
    const result = localizedAlternates("en-US", "/quiz");
    expect(result.languages).toMatchObject({
      "en-US": "https://thegreatinside.example/en-US/quiz",
      "ko-KR": "https://thegreatinside.example/ko-KR/quiz",
    });
  });

  it("sets x-default to bare siteUrl(), never a localized URL", () => {
    const result = localizedAlternates("en-US", "/people/leonardo-da-vinci");
    expect(result.languages?.["x-default"]).toBe("https://thegreatinside.example");
  });

  it("handles an empty path suffix for locale-root pages (Landing)", () => {
    const result = localizedAlternates("ko-KR", "");
    expect(result.canonical).toBe("https://thegreatinside.example/ko-KR");
    expect(result.languages).toMatchObject({
      "en-US": "https://thegreatinside.example/en-US",
      "ko-KR": "https://thegreatinside.example/ko-KR",
    });
  });

  it("never embeds a result token in the canonical or any language URL", () => {
    const result = localizedAlternates("en-US", "/results");
    const allUrls = [result.canonical, ...Object.values(result.languages ?? {})];
    for (const url of allUrls) {
      expect(String(url)).not.toContain("?r=");
    }
  });
});

describe("robots directive constants", () => {
  it("NOINDEX_FOLLOW blocks indexing but allows link traversal", () => {
    expect(NOINDEX_FOLLOW).toEqual({ index: false, follow: true });
  });

  it("NOINDEX_NOFOLLOW blocks both indexing and link traversal", () => {
    expect(NOINDEX_NOFOLLOW).toEqual({ index: false, follow: false });
  });
});
