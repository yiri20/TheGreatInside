import { describe, expect, it } from "vitest";
import { TRAIT_SCORE_BANDS, traitScoreBandFor } from "./traitScoreBands.js";
import { GREATNESS_BANDS } from "../greatness/greatness.js";

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
    expect(traitScoreBandFor(39).id).toBe("very_low");
    expect(traitScoreBandFor(40).id).toBe("low");
    expect(traitScoreBandFor(59).id).toBe("low");
    expect(traitScoreBandFor(60).id).toBe("moderate");
    expect(traitScoreBandFor(74).id).toBe("moderate");
    expect(traitScoreBandFor(75).id).toBe("high");
    expect(traitScoreBandFor(89).id).toBe("high");
    expect(traitScoreBandFor(90).id).toBe("very_high");
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

  // Deliberate design choice, not a coincidence — see this file's header
  // comment: reusing GREATNESS_BANDS' exact cutoffs keeps one "how far along
  // a 0-100 dimension is this" mental model across the app. If a future
  // change to either bank of bands breaks this, that's a decision to make
  // consciously, not silently.
  it("reuses the exact same cutoffs as GREATNESS_BANDS", () => {
    expect(TRAIT_SCORE_BANDS.map((b) => [b.min, b.max])).toEqual(
      GREATNESS_BANDS.map((b) => [b.min, b.max]),
    );
  });
});
