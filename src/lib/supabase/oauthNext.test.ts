import { describe, expect, it } from "vitest";
import { buildOAuthReturnPath } from "./oauthNext.js";

describe("buildOAuthReturnPath", () => {
  it("preserves the locale-bearing pathname and the full query string through the OAuth round-trip", () => {
    expect(buildOAuthReturnPath("/ko-KR/results", "?r=quiz_v2.abcd")).toBe("/ko-KR/results?r=quiz_v2.abcd");
    expect(buildOAuthReturnPath("/en-US/quiz", "")).toBe("/en-US/quiz");
  });

  it("preserves multiple query parameters as-is, not just a single ?r=", () => {
    expect(buildOAuthReturnPath("/en-US/compare/leonardo-da-vinci", "?r=quiz_v2.abcd&foo=bar")).toBe(
      "/en-US/compare/leonardo-da-vinci?r=quiz_v2.abcd&foo=bar",
    );
  });

  it("preserves exact locale + saved-result id for GoogleSignInCta's return path from /account/results/[id] (Phase 10C post-E2E fix) — no query string on this route", () => {
    const locale = "ko-KR";
    const id = "800d073e-c4ee-4b36-a811-eb406ca0f123";
    // Mirrors exactly how app/[locale]/account/results/[id]/page.tsx
    // constructs `returnPath` and how GoogleSignInCta.tsx feeds it through
    // buildOAuthReturnPath before setting the cookie.
    expect(buildOAuthReturnPath(`/${locale}/account/results/${id}`, "")).toBe(
      "/ko-KR/account/results/800d073e-c4ee-4b36-a811-eb406ca0f123",
    );
  });

  it("preserves exact locale for GoogleSignInCta's return path from /account itself (signed-out inline CTA, Phase 10C post-E2E)", () => {
    expect(buildOAuthReturnPath("/en-US/account", "")).toBe("/en-US/account");
  });
});
