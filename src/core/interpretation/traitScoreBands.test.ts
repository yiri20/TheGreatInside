import { describe, expect, it } from "vitest";
import { TRAIT_SCORE_BANDS, traitScoreBandFor } from "./traitScoreBands.js";

describe("traitScoreBandFor", () => {
  it("covers the full 0-100 range with no gaps or overlaps", () => {
    const sorted = [...TRAIT_SCORE_BANDS].sort((a, b) => a.min - b.min);
    expect(sorted[0]!.min).toBe(0);
    expect(sorted.at(-1)!.max).toBe(100);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i]!.min).toBe(sorted[i - 1]!.max + 1);
    }
  });

  it("picks the correct band at every boundary", () => {
    expect(traitScoreBandFor(0).id).toBe("very_low");
    expect(traitScoreBandFor(29).id).toBe("very_low");
    expect(traitScoreBandFor(30).id).toBe("low");
    expect(traitScoreBandFor(44).id).toBe("low");
    expect(traitScoreBandFor(45).id).toBe("moderate");
    expect(traitScoreBandFor(55).id).toBe("moderate");
    expect(traitScoreBandFor(56).id).toBe("high");
    expect(traitScoreBandFor(70).id).toBe("high");
    expect(traitScoreBandFor(71).id).toBe("very_high");
    expect(traitScoreBandFor(100).id).toBe("very_high");
  });

  it("degrades to the lowest band for an out-of-contract input rather than throwing", () => {
    expect(traitScoreBandFor(-5).id).toBe("very_low");
    expect(traitScoreBandFor(500).id).toBe("very_high");
  });

  it("every band has a distinct labelKey and meaningKey", () => {
    const labelKeys = new Set(TRAIT_SCORE_BANDS.map((b) => b.labelKey));
    const meaningKeys = new Set(TRAIT_SCORE_BANDS.map((b) => b.meaningKey));
    expect(labelKeys.size).toBe(TRAIT_SCORE_BANDS.length);
    expect(meaningKeys.size).toBe(TRAIT_SCORE_BANDS.length);
  });

  // The specific regression this audit exists to prevent: a score of 50 is
  // `docs/scoring-rubric-v1.md` §4's own explicit "SAFE DEFAULT... no strong
  // signal either way" center point, not a low reading. An earlier version
  // of this file mirrored GREATNESS_BANDS' cutoffs instead (0-39 as the
  // bottom band), which put 50 in the SECOND band from the bottom, close
  // enough to "Low" territory to risk exactly this mislabelling. Locking
  // the center band's exact bounds here ties this file to the rubric
  // document rather than to a numerically-tidy-but-unrelated scheme.
  it("keeps score 50 -- the rubric's own explicit center point -- inside the Moderate band, never Low or High", () => {
    expect(traitScoreBandFor(50).id).toBe("moderate");
  });

  it("matches docs/scoring-rubric-v1.md §4's own center band exactly (45-55)", () => {
    const moderate = TRAIT_SCORE_BANDS.find((b) => b.id === "moderate")!;
    expect(moderate.min).toBe(45);
    expect(moderate.max).toBe(55);
  });

  it("widens asymmetrically outward from center, matching the rubric's evidence-bar logic (not evenly-spaced bands)", () => {
    const byId = Object.fromEntries(TRAIT_SCORE_BANDS.map((b) => [b.id, b.max - b.min + 1]));
    // moderate (11) < low/high (15 each) < very_low/very_high (30 each) --
    // strictly widening outward, not a flat 20-points-per-band scheme.
    expect(byId["moderate"]).toBe(11);
    expect(byId["low"]).toBe(15);
    expect(byId["high"]).toBe(15);
    expect(byId["very_low"]).toBe(30);
    expect(byId["very_high"]).toBe(30);
  });
});
