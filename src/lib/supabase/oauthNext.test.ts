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
});
