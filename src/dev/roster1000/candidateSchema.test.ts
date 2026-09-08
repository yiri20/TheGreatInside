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
import { meetsContentQualityFloor, runRosterQualityGates } from "../../core/people/rosterQuality.js";
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
      occupationIds: ["occ_synthetic"],
      fieldIds: [],
      impactDomains: ["cultural"],
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

/**
 * Mechanical public-page content-quality floor, run end-to-end on the real
 * promotion path (2026-09,
 * `feat/separate-profile-publication-match-eligibility`). Proves the
 * candidate pipeline can produce a published/directory-visible/
 * non-match-eligible Person that ALSO clears
 * `meetsContentQualityFloor()`/`runRosterQualityGates()` — the true
 * end-to-end architectural proof, not just that promotion succeeds in
 * isolation.
 */
describe("Case F — a mechanically-valid, far-below-18-attribute candidate promotes to a Person that passes the content-quality floor", () => {
  const candidate = thinCandidate(); // 3 rows, non-empty occupationIds/impactDomains/sources/canonicalName

  it("promotion succeeds and produces published + directory-visible + non-match-eligible", () => {
    const seed = preparePersonSeedForPromotion(candidate);
    const person = build(seed);
    expect(person.status).toBe("published");
    expect(person.isDirectoryVisible).toBe(true);
    expect(person.isMatchEligible).toBe(false);
  });

  it("the resulting Person passes meetsContentQualityFloor() despite having only 3 scored attributes", () => {
    const seed = preparePersonSeedForPromotion(candidate);
    const person = build(seed);
    const floor = meetsContentQualityFloor(person);
    expect(floor.meetsFloor).toBe(true);
    expect(floor.reasons).toEqual([]);
  });

  it("runRosterQualityGates reports zero content-quality failures for this person", () => {
    const seed = preparePersonSeedForPromotion(candidate);
    const person = build(seed);
    const report = runRosterQualityGates([person]);
    expect(report.contentQualityFailures).toEqual([]);
    expect(report.eligibility[0]!.report.eligible).toBe(false);
  });
});

/**
 * Wikidata identity propagation through promotion (2026-09, Part D of the
 * hidden-coupling cleanup). `checkPromotionReadiness()` requires
 * `identity.wikidataId`, but before this fix `toPersonSeed()` only copied
 * `candidate.externalIdentity` when that optional object already existed —
 * silently dropping a verified QID for any candidate that never set
 * `externalIdentity` directly.
 */
describe("toPersonSeed — Wikidata identity propagation", () => {
  it("identity.wikidataId with no candidate.externalIdentity still produces PersonSeed.externalIdentity.wikidataId", () => {
    const candidate = thinCandidate(); // has identity.wikidataId, no externalIdentity
    expect(candidate.externalIdentity).toBeUndefined();
    const seed = toPersonSeed(candidate);
    expect(seed.externalIdentity?.wikidataId).toBe("Q0");
  });

  it("an existing externalIdentity.wikipediaUrls is preserved while the QID is carried through", () => {
    const candidate = thinCandidate({
      externalIdentity: { wikipediaUrls: { "en-US": "https://en.wikipedia.org/wiki/Synthetic" } },
    });
    const seed = toPersonSeed(candidate);
    expect(seed.externalIdentity?.wikidataId).toBe("Q0");
    expect(seed.externalIdentity?.wikipediaUrls?.["en-US"]).toBe("https://en.wikipedia.org/wiki/Synthetic");
  });

  it("conflicting QIDs between identity and externalIdentity fail promotion readiness closed", () => {
    const candidate = thinCandidate({ externalIdentity: { wikidataId: "Q999999" } });
    const readiness = checkPromotionReadiness(candidate);
    expect(readiness.ready).toBe(false);
    expect(readiness.reasons.some((r) => r.includes("disagrees"))).toBe(true);
  });

  it("agreeing QIDs on both identity and externalIdentity do not trip the conflict check", () => {
    const candidate = thinCandidate({ externalIdentity: { wikidataId: "Q0" } });
    expect(checkPromotionReadiness(candidate).ready).toBe(true);
  });
});

/**
 * Portrait metadata readiness (2026-09, Part E). The candidate portrait
 * schema keeps most fields optional, so `{ status: "found" }` alone used to
 * pass `checkPromotionReadiness()` and then `toPersonSeed()` would silently
 * omit the portrait entirely — contradicting "product-ready portrait."
 */
describe("checkPromotionReadiness — portrait metadata completeness", () => {
  it("the existing valid synthetic portrait (url/source/license/sourcePageUrl) still passes", () => {
    expect(checkPromotionReadiness(thinCandidate()).ready).toBe(true);
  });

  it("fails when status is \"found\" but url is missing", () => {
    const candidate = thinCandidate({
      portrait: { status: "found", source: "Test Source", license: "Public Domain", sourcePageUrl: "https://example.test/source-page" },
    });
    const readiness = checkPromotionReadiness(candidate);
    expect(readiness.ready).toBe(false);
    expect(readiness.reasons.some((r) => r.includes("portrait.url"))).toBe(true);
  });

  it("fails when status is \"found\" but source is missing", () => {
    const candidate = thinCandidate({
      portrait: { status: "found", url: "https://example.test/portrait.jpg", license: "Public Domain", sourcePageUrl: "https://example.test/source-page" },
    });
    const readiness = checkPromotionReadiness(candidate);
    expect(readiness.ready).toBe(false);
    expect(readiness.reasons.some((r) => r.includes("portrait.source"))).toBe(true);
  });

  it("fails when status is \"found\" but license is missing", () => {
    const candidate = thinCandidate({
      portrait: { status: "found", url: "https://example.test/portrait.jpg", source: "Test Source", sourcePageUrl: "https://example.test/source-page" },
    });
    const readiness = checkPromotionReadiness(candidate);
    expect(readiness.ready).toBe(false);
    expect(readiness.reasons.some((r) => r.includes("portrait.license"))).toBe(true);
  });

  it("fails when status is \"found\" but sourcePageUrl is missing", () => {
    const candidate = thinCandidate({
      portrait: { status: "found", url: "https://example.test/portrait.jpg", source: "Test Source", license: "Public Domain" },
    });
    const readiness = checkPromotionReadiness(candidate);
    expect(readiness.ready).toBe(false);
    expect(readiness.reasons.some((r) => r.includes("portrait.sourcePageUrl"))).toBe(true);
  });
});
