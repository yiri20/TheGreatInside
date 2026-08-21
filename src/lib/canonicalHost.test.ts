import { describe, expect, it } from "vitest";
import { canonicalRedirectUrl, CANONICAL_HOST } from "./canonicalHost";

describe("canonicalRedirectUrl", () => {
  it("redirects www.thegreatinside.com to the canonical apex, preserving path and query", () => {
    expect(canonicalRedirectUrl("www.thegreatinside.com", "/en-US/people", "?foo=bar")).toBe(
      "https://thegreatinside.com/en-US/people?foo=bar",
    );
  });

  it("redirects the former Vercel production hostname to the canonical apex", () => {
    expect(canonicalRedirectUrl("the-great-inside.vercel.app", "/ko-KR/quiz", "")).toBe(
      "https://thegreatinside.com/ko-KR/quiz",
    );
  });

  it("does not redirect the canonical host itself (no loop)", () => {
    expect(canonicalRedirectUrl("thegreatinside.com", "/en-US", "")).toBeUndefined();
  });

  it("does not redirect localhost (local dev must never be sent to production)", () => {
    expect(canonicalRedirectUrl("localhost:3000", "/en-US", "")).toBeUndefined();
  });

  it("does not redirect an arbitrary Vercel preview deployment hostname", () => {
    expect(canonicalRedirectUrl("the-great-inside-git-pr-123.vercel.app", "/en-US", "")).toBeUndefined();
  });

  it("does not redirect a missing/empty host", () => {
    expect(canonicalRedirectUrl(null, "/en-US", "")).toBeUndefined();
    expect(canonicalRedirectUrl(undefined, "/en-US", "")).toBeUndefined();
    expect(canonicalRedirectUrl("", "/en-US", "")).toBeUndefined();
  });

  it("strips a port before matching, without ever broadening a match", () => {
    expect(canonicalRedirectUrl("www.thegreatinside.com:443", "/en-US", "")).toBe("https://thegreatinside.com/en-US");
  });

  it("CANONICAL_HOST is the exact production domain", () => {
    expect(CANONICAL_HOST).toBe("thegreatinside.com");
  });
});
