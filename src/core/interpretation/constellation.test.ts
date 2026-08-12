import { describe, expect, it } from "vitest";
import type { Person } from "../types.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import {
  constellationImpactCounts,
  CONSTELLATION_CONFIG,
  traitConstellation,
} from "./constellation.js";

const person = (slug: string): Person => {
  const p = SEED_PEOPLE.find((x) => x.slug === slug);
  if (!p) throw new Error(`missing seed person ${slug}`);
  return p;
};

describe("traitConstellation", () => {
  it("returns 8-12 traits for every currently eligible seed person", () => {
    for (const p of SEED_PEOPLE.filter((x) => x.isMatchEligible)) {
      const result = traitConstellation(p);
      expect(result.length, p.slug).toBeGreaterThanOrEqual(CONSTELLATION_CONFIG.minSize);
      expect(result.length, p.slug).toBeLessThanOrEqual(CONSTELLATION_CONFIG.maxSize);
    }
  });

  it("degrades honestly for a thin profile rather than inventing traits", () => {
    // Confucius-style ancient figures are deliberately scored on 18-22 of 30.
    const thin = SEED_PEOPLE.find((p) => p.isMatchEligible && p.attributes.length < 25);
    expect(thin).toBeDefined();
    const result = traitConstellation(thin!);
    expect(result.length).toBeLessThanOrEqual(thin!.attributes.length);
    expect(result.every((t) => thin!.attributes.some((a) => a.attributeId === t.attributeId))).toBe(
      true,
    );
  });

  it("is NOT simply the highest raw scores", () => {
    const daVinci = person("leonardo-da-vinci");
    const constellation = traitConstellation(daVinci);
    const topByRawScore = [...daVinci.attributes]
      .sort((a, b) => b.score - a.score)
      .slice(0, constellation.length)
      .map((a) => a.attributeId)
      .sort();
    const selected = constellation.map((t) => t.attributeId).sort();
    expect(selected).not.toEqual(topByRawScore);
  });

  it("ranks by distance from the reference mean, not raw score", () => {
    const daVinci = person("leonardo-da-vinci");
    const constellation = traitConstellation(daVinci);
    for (let i = 1; i < constellation.length; i++) {
      expect(Math.abs(constellation[i - 1]!.z)).toBeGreaterThanOrEqual(Math.abs(constellation[i]!.z));
    }
  });

  it("excludes low-confidence attributes even if their score is extreme", () => {
    const withFakeLowConfidence: Person = {
      ...person("marie-curie"),
      attributes: person("marie-curie").attributes.map((a) =>
        a.attributeId === "curiosity" ? { ...a, score: 100, confidence: 0.2 } : a,
      ),
    };
    const result = traitConstellation(withFakeLowConfidence);
    expect(result.some((t) => t.attributeId === "curiosity")).toBe(false);
  });

  it("never lets one impact type exceed the configured cap UNLESS the other types genuinely can't fill the remaining slots", () => {
    // "distinct impact types exist" is not by itself enough alternative supply
    // — a person can have 3 impact types present and still need to draw past
    // the cap on the dominant one if the other two only contribute a handful
    // of candidates combined (Ibn Khaldun: 16 advantage vs. 3 dual_edged + 1
    // neutral at a target of 12 and a cap of 6 — 6 + 3 + 1 = 10 < 12, so 2 of
    // the 12 must legitimately come from advantage's overflow). The real
    // invariant is capacity-based, not presence-based.
    for (const p of SEED_PEOPLE.filter((x) => x.isMatchEligible)) {
      const result = traitConstellation(p);
      const counts = constellationImpactCounts(result);
      const target = Math.min(
        CONSTELLATION_CONFIG.maxSize,
        p.attributes.filter((a) => a.confidence >= CONSTELLATION_CONFIG.minConfidence).length,
      );
      const cap = Math.ceil(result.length * CONSTELLATION_CONFIG.maxImpactShare);

      const availableByImpact = new Map<string, number>();
      for (const a of p.attributes) {
        if (a.confidence < CONSTELLATION_CONFIG.minConfidence) continue;
        availableByImpact.set(a.impact, (availableByImpact.get(a.impact) ?? 0) + 1);
      }
      const achievableWithinCap = [...availableByImpact.values()].reduce(
        (sum, available) => sum + Math.min(available, cap),
        0,
      );

      if (achievableWithinCap >= target) {
        for (const count of Object.values(counts)) {
          expect(count, p.slug).toBeLessThanOrEqual(cap);
        }
      } else {
        // The mix genuinely can't be capped — assert the honest-fallback
        // behaviour actually ran, i.e. the constellation still reached its
        // target size instead of silently coming back short.
        expect(result.length, p.slug).toBe(target);
      }
    }
  });

  it("produces a genuine mix of impact types for a well-documented profile", () => {
    const counts = constellationImpactCounts(traitConstellation(person("leonardo-da-vinci")));
    const distinctTypesPresent = Object.values(counts).filter((n) => n > 0).length;
    expect(distinctTypesPresent).toBeGreaterThanOrEqual(2);
  });

  it("falls back to whatever is available when one impact type dominates the eligible pool", () => {
    // Construct a person whose only confidently-scored attributes are all
    // "advantage" — the cap can't be honoured, so the fallback pass must still
    // fill the constellation instead of returning a short list.
    const base = person("marie-curie");
    const singleImpact: Person = {
      ...base,
      attributes: base.attributes.map((a) => ({ ...a, impact: "advantage" as const })),
    };
    const result = traitConstellation(singleImpact);
    expect(result.length).toBeGreaterThanOrEqual(CONSTELLATION_CONFIG.minSize);
    expect(result.every((t) => t.impact === "advantage")).toBe(true);
  });

  it("is deterministic", () => {
    const p = person("alan-turing");
    expect(traitConstellation(p)).toEqual(traitConstellation(p));
  });

  it("is unaffected by person metadata", () => {
    const p = person("frida-kahlo");
    const baseline = traitConstellation(p);
    const mutated = traitConstellation({
      ...p,
      canonicalName: "Someone Else",
      nationalityCodes: ["ZZ"],
      tagIds: ["trending"],
      era: "ancient",
    });
    expect(mutated).toEqual(baseline);
  });

  it("respects a custom size within the candidate pool", () => {
    const p = person("richard-feynman");
    const result = traitConstellation(p, 8);
    expect(result.length).toBeLessThanOrEqual(8);
  });
});

describe("constellationImpactCounts", () => {
  it("sums to the constellation length and covers all four impact keys", () => {
    const result = traitConstellation(person("serena-williams"));
    const counts = constellationImpactCounts(result);
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    expect(total).toBe(result.length);
    expect(Object.keys(counts).sort()).toEqual(["advantage", "dual_edged", "neutral", "risk"].sort());
  });
});
