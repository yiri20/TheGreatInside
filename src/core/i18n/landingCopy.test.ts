import { describe, expect, it } from "vitest";
import { en } from "./en.js";
import { ko } from "./ko.js";
import { t } from "./index.js";

/**
 * 95-person launch-readiness pass (2026-08): `landing.subtitle` was found
 * hardcoding a stale "35 extraordinary people" figure from before the
 * roster grew to 95 (94 match-eligible) — the page never re-derives it, so
 * every future roster batch would silently re-break this copy again unless
 * something keeps it honest. Guards the two properties that make it
 * self-correcting: the source string stays a template (never a literal
 * digit baked back in), and `t()`'s interpolation actually substitutes it.
 */
describe("landing.subtitle stays a live count, not a hardcoded figure", () => {
  it("en-US source string carries the {count} placeholder, not a literal number", () => {
    expect(en["landing.subtitle"]).toContain("{count}");
    expect(en["landing.subtitle"]).not.toMatch(/\b\d+\b/);
  });

  it("ko-KR source string carries the {count} placeholder, not a literal number", () => {
    expect(ko["landing.subtitle"]).toContain("{count}");
    expect(ko["landing.subtitle"]).not.toMatch(/\d+명/);
  });

  it("t() substitutes a live count into both locales", () => {
    expect(t("en-US", "landing.subtitle", { count: 94 })).toContain("94 extraordinary people");
    expect(t("ko-KR", "landing.subtitle", { count: 94 })).toContain("94명의 비범한 인물들");
  });
});
