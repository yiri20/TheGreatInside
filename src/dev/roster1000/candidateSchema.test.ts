/**
 * Candidate → production promotion path — integration tests for
 * `checkPromotionReadiness()` / `preparePersonSeedForPromotion()`. Proves
 * the candidate PIPELINE can actually CREATE the published/
 * non-match-eligible/directory-visible state, not just that the rendering/
 * filter layer can represent it (see `profilePublicationSeparation.test.ts`
 * for that side). Synthetic candidates only — no real candidate JSON file
 * is read, mutated, or promoted.
 */
import { describe, expect, it } from "vitest";
import { build } from "../../data/people/builder.js";
import {
  checkPromotionReadiness,
  preparePersonSeedForPromotion,
  toPersonSeed,
  type Candidate,
} from "./candidateSchema.js";

function thinCandidate(overrides: Partial<Candidate> = {}): Candidate {
  return {
    schemaVersion: "candidate_v1",
    processingVersion: "scoring_rubric_v1",
    slug: "synthetic-candidate",
    status: "evidence_approved",
    identity: {
      canonicalName: "Synthetic Candidate",
      wikidataId: "Q0",
      isLiving: false,
      era: "contemporary",
      nationalityCodes: [],
      regionCode: "north_america",
    },
    classification: {
      occupationIds: [],
      fieldIds: [],
      impactDomains: [],
      tagIds: [],
      archetypeIds: [],
    },
    sources: [{ id: "src_synthetic", kind: "wikipedia", title: "Synthetic Candidate" }],
    // Deliberately thin: 3 rows, well under eligibility_v2's 18-attribute
    // and 0.6-coverage floors, so real build()+evaluateMatchEligibility
    // honestly computes isMatchEligible: false — this is not a mocked
    // eligibility result, it is a genuinely under-evidenced profile.
    rows: {
      curiosity: { score: 60, confidence: 0.4, evidenceType: "inference", impact: "neutral", rationale: "Synthetic test row, not real evidence." },
      discipline: { score: 55, confidence: 0.4, evidenceType: "inference", impact: "neutral", rationale: "Synthetic test row, not real evidence." },
      persistence: { score: 58, confidence: 0.4, evidenceType: "inference", impact: "neutral", rationale: "Synthetic test row, not real evidence." },
    },
    portrait: {
      status: "found",
      url: "https://example.test/portrait.jpg",
      source: "Test Source",
      license: "Public Domain",
      sourcePageUrl: "https://example.test/source-page",
    },
    // Cached snapshot deliberately says not eligible — Case E proves this
    // is irrelevant to promotion readiness.
    computedEligibility: {
      scoredAttributeCount: 3,
      averageConfidence: 0.4,
      coverage: 0.1,
      eligible: false,
      computedAt: "2026-01-01T00:00:00.000Z",
    },
    provenance: {
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
      processedBy: "agent",
    },
    ...overrides,
  };
}

describe("Case A — evidence-approved, non-match-eligible, ordinary publication", () => {
  const candidate = thinCandidate();

  it("promotion preparation succeeds", () => {
    expect(() => preparePersonSeedForPromotion(candidate)).not.toThrow();
  });

  it("the prepared seed defaults directoryVisible to true", () => {
    const seed = preparePersonSeedForPromotion(candidate);
    expect(seed.directoryVisible).toBe(true);
  });

  it("build() honestly computes isMatchEligible: false for this thin profile (not mocked)", () => {
    const seed = preparePersonSeedForPromotion(candidate);
    const person = build(seed);
    expect(person.isMatchEligible).toBe(false);
  });

  it("the final Person is published, non-match-eligible, and directory-visible — the central architecture case", () => {
    const seed = preparePersonSeedForPromotion(candidate);
    const person = build(seed);
    expect(person.status).toBe("published");
    expect(person.isMatchEligible).toBe(false);
    expect(person.isDirectoryVisible).toBe(true);
  });
});

describe("Case B — explicit direct-only promotion", () => {
  const candidate = thinCandidate();

  it("build() produces a published, non-match-eligible, non-directory-visible Person", () => {
    const seed = preparePersonSeedForPromotion(candidate, { directoryVisible: false });
    const person = build(seed);
    expect(person.status).toBe("published");
    expect(person.isMatchEligible).toBe(false);
    expect(person.isDirectoryVisible).toBe(false);
  });
});

describe("Case C — qa_passed remains promotable", () => {
  it("checkPromotionReadiness succeeds for a qa_passed candidate with valid identity/portrait", () => {
    const candidate = thinCandidate({ status: "qa_passed" });
    expect(checkPromotionReadiness(candidate).ready).toBe(true);
    expect(() => preparePersonSeedForPromotion(candidate)).not.toThrow();
  });
});

describe("Case D — held/scored candidates fail closed", () => {
  it("checkPromotionReadiness refuses a held candidate", () => {
    const candidate = thinCandidate({ status: "held", holdReason: "test hold reason" });
    const readiness = checkPromotionReadiness(candidate);
    expect(readiness.ready).toBe(false);
    expect(readiness.reasons.some((r) => r.includes("evidence-approved review outcome"))).toBe(true);
  });

  it("checkPromotionReadiness refuses a merely-scored candidate", () => {
    const candidate = thinCandidate({ status: "scored" });
    expect(checkPromotionReadiness(candidate).ready).toBe(false);
  });

  it("preparePersonSeedForPromotion throws (fails closed) rather than silently promoting", () => {
    const candidate = thinCandidate({ status: "held", holdReason: "test hold reason" });
    expect(() => preparePersonSeedForPromotion(candidate)).toThrow(/not ready for promotion/);
  });

  it("toPersonSeed() itself still works on a held candidate — it is a neutral reshaper the validator legitimately uses for diagnostic reporting, not a gate", () => {
    const candidate = thinCandidate({ status: "held", holdReason: "test hold reason" });
    expect(() => toPersonSeed(candidate)).not.toThrow();
  });
});

describe("Case E — eligibility is NOT a promotion gate", () => {
  it("a valid evidence_approved candidate with computedEligibility.eligible === false still passes promotion readiness", () => {
    const candidate = thinCandidate(); // computedEligibility.eligible is false, per the fixture above
    expect(candidate.computedEligibility?.eligible).toBe(false);
    expect(checkPromotionReadiness(candidate).ready).toBe(true);
  });

  it("even a cached eligible: true snapshot changes nothing about readiness (readiness never reads this field either way)", () => {
    const candidate = thinCandidate({
      computedEligibility: {
        scoredAttributeCount: 3,
        averageConfidence: 0.4,
        coverage: 0.1,
        eligible: true,
        computedAt: "2026-01-01T00:00:00.000Z",
      },
    });
    expect(checkPromotionReadiness(candidate).ready).toBe(true);
  });
});

describe("checkPromotionReadiness — missing preconditions", () => {
  it("refuses a candidate missing a wikidataId", () => {
    const base = thinCandidate();
    const { wikidataId: _omit, ...identityWithoutQid } = base.identity;
    const candidate = thinCandidate({ identity: identityWithoutQid });
    const readiness = checkPromotionReadiness(candidate);
    expect(readiness.ready).toBe(false);
    expect(readiness.reasons.some((r) => r.includes("wikidataId"))).toBe(true);
  });

  it("refuses a candidate with no product-ready portrait", () => {
    const candidate = thinCandidate({ portrait: { status: "held", reason: "not sourced yet" } });
    const readiness = checkPromotionReadiness(candidate);
    expect(readiness.ready).toBe(false);
    expect(readiness.reasons.some((r) => r.includes("portrait"))).toBe(true);
  });
});
