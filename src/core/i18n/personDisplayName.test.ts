import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import { personDisplayName } from "./index.js";

/**
 * PHASE 8K: regression guard for the person-name localisation boundary.
 * `personDisplayName` is presentation-only — these tests exist specifically
 * to catch a future change that accidentally lets display-name resolution
 * leak into canonical identity (id/slug/matching), not just to check the
 * lookup/fallback mechanics in isolation.
 */
describe("personDisplayName", () => {
  it("falls back to canonicalName for en-US, for any person", () => {
    for (const person of SEED_PEOPLE) {
      expect(personDisplayName("en-US", person)).toBe(person.canonicalName);
    }
  });

  it("falls back to canonicalName for ko-KR when no localized entry exists for the slug", () => {
    const unauthored = { slug: "not-a-real-person-slug", canonicalName: "Someone Unauthored" };
    expect(personDisplayName("ko-KR", unauthored)).toBe("Someone Unauthored");
  });

  it("falls back to canonicalName for locales with an empty bundle (ja-JP/zh-CN/zh-TW)", () => {
    const person = SEED_PEOPLE.find((p) => p.slug === "genghis-khan")!;
    expect(personDisplayName("ja-JP", person)).toBe(person.canonicalName);
    expect(personDisplayName("zh-CN", person)).toBe(person.canonicalName);
    expect(personDisplayName("zh-TW", person)).toBe(person.canonicalName);
  });

  it("returns the authored Korean name for a known slug, never the raw canonicalName", () => {
    const spotChecks: Array<[string, string]> = [
      ["genghis-khan", "칭기즈 칸"],
      ["benjamin-franklin", "벤저민 프랭클린"],
      ["yi-sun-sin", "이순신"],
      ["confucius", "공자"],
      ["zheng-he", "정화"],
    ];
    for (const [slug, expected] of spotChecks) {
      const person = SEED_PEOPLE.find((p) => p.slug === slug)!;
      const name = personDisplayName("ko-KR", person);
      expect(name).toBe(expected);
      expect(name).not.toBe(person.canonicalName);
    }
  });

  it("has a Korean display name authored for every current-roster person — regression guard", () => {
    // Mirrors missingDevelopmentGuides()/missingTradeoffCoverage()'s pattern:
    // a live check against the actual roster, not a hardcoded count (the
    // count itself was previously and incorrectly pinned to 35 here — fixed
    // during ROSTER-1000's first real expansion batch, roster3.ts, since a
    // hardcoded length is exactly the kind of guard a genuine roster
    // addition should not have to fight), so a future person added without
    // a Korean name is caught here rather than silently rendering their raw
    // canonicalName in the Korean product.
    expect(SEED_PEOPLE.length).toBeGreaterThan(0);
    const missing = SEED_PEOPLE.filter((p) => personDisplayName("ko-KR", p) === p.canonicalName);
    expect(missing.map((p) => p.slug)).toEqual([]);
  });

  it("never reads score, confidence, or any matching-relevant field — presentation only", () => {
    // personDisplayName's own signature only accepts {slug, canonicalName} —
    // this test documents that boundary structurally: passing a person-like
    // object that lacks every other Person field still works correctly,
    // proving no other field is consulted.
    const minimal = { slug: "benjamin-franklin", canonicalName: "Benjamin Franklin" };
    expect(personDisplayName("ko-KR", minimal)).toBe("벤저민 프랭클린");
  });
});
