import { describe, expect, it } from "vitest";
import { ATTRIBUTES, ATTRIBUTE_IDS, TAXONOMY_VERSION, type AttributeId } from "../attributes/attributes.js";
import type { Person, UserProfile } from "../types.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import {
  ELIGIBILITY,
  ELIGIBILITY_VERSION,
  evaluateMatchEligibility,
  facetSimilarity,
  matchUserToPerson,
  rankMatches,
} from "./similarity.js";
import { calibrateMatch, MATCH_CALIBRATION_ANCHORS } from "./calibration.js";
import { buildResultSet, contextualDistance, selectCategoryMatches } from "./selectors.js";
import { discriminativeWeight } from "./dispersion.js";
import { t } from "../i18n/index.js";

const person = (slug: string): Person => {
  const p = SEED_PEOPLE.find((x) => x.slug === slug);
  if (!p) throw new Error(`missing seed person ${slug}`);
  return p;
};

function profile(scores: Partial<Record<AttributeId, number>>, fill = 50): UserProfile {
  const full = {} as Record<AttributeId, number>;
  const confidence = {} as Record<AttributeId, number>;
  for (const id of ATTRIBUTE_IDS) {
    full[id] = scores[id] ?? fill;
    confidence[id] = 1;
  }
  return {
    id: "u",
    quizVersion: "test",
    scoringVersion: "test",
    taxonomyVersion: TAXONOMY_VERSION,
    scores: full,
    confidence,
    completedAt: "2026-01-01T00:00:00.000Z",
  };
}

/** A user whose vector is exactly a person's vector. */
function mirrorOf(p: Person): UserProfile {
  const scores: Partial<Record<AttributeId, number>> = {};
  for (const a of p.attributes) scores[a.attributeId] = a.score;
  return profile(scores);
}

/** A user who is the numeric inverse of a person on every scored trait. */
function inverseOf(p: Person): UserProfile {
  const scores: Partial<Record<AttributeId, number>> = {};
  for (const a of p.attributes) scores[a.attributeId] = 100 - a.score;
  return profile(scores);
}

describe("calibration curve", () => {
  it("is strictly monotone, so it can never reorder matches", () => {
    for (let i = 1; i < MATCH_CALIBRATION_ANCHORS.length; i++) {
      const prev = MATCH_CALIBRATION_ANCHORS[i - 1]!;
      const cur = MATCH_CALIBRATION_ANCHORS[i]!;
      expect(cur[0]).toBeGreaterThan(prev[0]);
      expect(cur[1]).toBeGreaterThan(prev[1]);
    }
    let last = -1;
    for (let raw = 0; raw <= 1.0001; raw += 0.005) {
      const value = calibrateMatch(raw);
      expect(value).toBeGreaterThanOrEqual(last);
      last = value;
    }
  });

  it("never claims a perfect 100", () => {
    expect(calibrateMatch(1)).toBe(99);
    expect(calibrateMatch(2)).toBe(99);
  });

  /**
   * Phase 6.6 Stage 8 (calibration_v3 regeneration): the existing
   * monotonicity sweep above already mathematically guarantees rank
   * preservation and boundary continuity, but locks it as an explicit,
   * readable mechanism test too — same discipline as testing "level vs
   * pattern precedence" directly rather than trusting it follows from the
   * formula. Runs against whatever anchor table is currently committed, so
   * it re-validates automatically on any future anchor refit.
   */
  it("produces no discontinuity or inversion exactly at an anchor boundary", () => {
    const EPSILON = 1e-6;
    for (const [rawX] of MATCH_CALIBRATION_ANCHORS) {
      if (rawX <= 0 || rawX >= 1) continue;
      const just_before = calibrateMatch(rawX - EPSILON);
      const at = calibrateMatch(rawX);
      const just_after = calibrateMatch(rawX + EPSILON);
      expect(just_before).toBeLessThanOrEqual(at);
      expect(at).toBeLessThanOrEqual(just_after);
    }
  });

  it("preserves the raw-similarity ordering of an arbitrary sample of raw values", () => {
    const rawSamples = [0.32, 0.38, 0.4, 0.42, 0.45, 0.47, 0.48, 0.5, 0.53, 0.56, 0.58, 0.6, 0.63, 0.67, 0.72];
    const byRaw = [...rawSamples].sort((a, b) => a - b);
    const byCalibrated = [...rawSamples].sort((a, b) => calibrateMatch(a) - calibrateMatch(b));
    expect(byCalibrated).toEqual(byRaw);
  });
});

describe("similarity behaviour", () => {
  it("scores an identical vector at the top of the scale", () => {
    // Uses Benjamin Franklin, not Marie Curie: taxonomy_v1.1 (Phase 6.6)
    // added 4 attributes, and this property only holds for a profile with
    // FULL current-taxonomy coverage (34/34) — Marie Curie has 32/34
    // (2 of the 4 new attributes are genuinely unscored for her, per the
    // Stage 5 evidence-first scoring discipline; not invented to keep this
    // test on the same person). Franklin is the one seed profile with
    // complete 34/34 coverage.
    const p = person("benjamin-franklin");
    const result = matchUserToPerson(mirrorOf(p), p);
    expect(result.rawSimilarity).toBeCloseTo(1, 10);
    expect(result.overallMatch).toBe(99);
  });

  it("scores an inverted vector far lower than an identical one", () => {
    const p = person("steve-jobs");
    const same = matchUserToPerson(mirrorOf(p), p).overallMatch;
    const opposite = matchUserToPerson(inverseOf(p), p).overallMatch;
    expect(opposite).toBeLessThan(same - 50);
  });

  it("puts an identical vector first in the ranking", () => {
    const p = person("alan-turing");
    const ranked = rankMatches(mirrorOf(p), SEED_PEOPLE);
    expect(ranked[0]?.personId).toBe(p.id);
  });

  it("reports every facet for a full comparison", () => {
    const result = matchUserToPerson(profile({}), person("frida-kahlo"));
    for (const value of Object.values(result.facetMatches)) {
      expect(value).toBeGreaterThan(0);
    }
  });
});

describe("metadata must never influence matching", () => {
  const p = person("steve-jobs");
  const user = profile({ curiosity: 80, leadership_drive: 70 });
  const baseline = matchUserToPerson(user, p);

  const variants: Array<[string, Partial<Person>]> = [
    ["nationality", { nationalityCodes: ["KR", "JP"], regionCode: "east_asia" }],
    ["occupation", { occupationIds: ["poet"], fieldIds: ["literature"] }],
    ["era", { era: "ancient", birthYear: -400 }],
    ["impact domains (wealth/fame proxy)", { impactDomains: ["wealth_creation"] }],
    ["tags", { tagIds: ["trending", "most_searched"] }],
    ["name", { canonicalName: "Someone Else", slug: "someone-else" }],
    ["archetype assignment", { archetypeIds: [] }],
    ["aliases", { aliases: ["Some Other Name", "다른 이름"] }],
    ["historical polity", { historicalPolityKey: "polity.made_up_for_test" }],
    [
      "external identity (Wikidata/Wikipedia)",
      {
        externalIdentity: {
          wikidataId: "Q999999",
          wikipediaUrls: { "en-US": "https://en.wikipedia.org/wiki/Nonexistent_Test_Page" },
        },
      },
    ],
    [
      "portrait",
      {
        portrait: {
          url: "https://example.com/portrait.jpg",
          source: "Test Source",
          license: "CC0",
          attribution: "Someone",
          // Visual Provenance Schema (2026-08): kind is presentation-only,
          // same as every other portrait field — confirm it too never
          // reaches scoring.
          kind: "historical_depiction",
        },
      },
    ],
  ];

  for (const [label, patch] of variants) {
    it(`ignores a change to ${label}`, () => {
      const mutated = matchUserToPerson(user, { ...p, ...patch });
      expect(mutated.rawSimilarity).toBe(baseline.rawSimilarity);
      expect(mutated.overallMatch).toBe(baseline.overallMatch);
    });
  }

  it("keeps the whole ranking unchanged when metadata changes across the dataset", () => {
    const before = rankMatches(user, SEED_PEOPLE).map((m) => m.personId);
    const rewritten = SEED_PEOPLE.map((x) => ({
      ...x,
      nationalityCodes: ["US"],
      regionCode: "north_america",
      era: "contemporary" as const,
      impactDomains: ["wealth_creation" as const],
      aliases: ["Rewritten Alias"],
      historicalPolityKey: "polity.rewritten",
      externalIdentity: { wikidataId: "Q1" },
      portrait: { url: "https://example.com/x.jpg", source: "x", license: "CC0" },
    }));
    expect(rankMatches(user, rewritten).map((m) => m.personId)).toEqual(before);
  });
});

describe("confidence and missing data", () => {
  const base = person("ada-lovelace");
  const user = profile({});

  it("gives a low-confidence person trait less influence than a high-confidence one", () => {
    // Put a large gap on one trait, then vary only that trait's confidence.
    const withGap = (confidence: number): Person => ({
      ...base,
      attributes: base.attributes.map((a) =>
        a.attributeId === "systems_abstraction" ? { ...a, score: 100, confidence } : a,
      ),
    });
    const strong = matchUserToPerson(user, withGap(1)).rawSimilarity;
    const weak = matchUserToPerson(user, withGap(0.1)).rawSimilarity;
    expect(weak).toBeGreaterThan(strong);
  });

  it("does not penalise a person for an unscored attribute", () => {
    const trimmed: Person = {
      ...base,
      attributes: base.attributes.filter((a) => a.attributeId !== "aesthetic_sensitivity"),
    };
    const full = matchUserToPerson(user, base);
    const partial = matchUserToPerson(user, trimmed);
    expect(partial.coverage).toBeLessThan(full.coverage);
    // Removing a trait changes coverage, but must not systematically tank the score.
    expect(Math.abs(partial.rawSimilarity - full.rawSimilarity)).toBeLessThan(0.05);
  });

  it("excludes under-evidenced profiles from matching", () => {
    const thin: Person = { ...base, attributes: base.attributes.slice(0, 5) };
    const report = evaluateMatchEligibility(thin);
    expect(report.eligible).toBe(false);
    expect(report.reasons.join(" ")).toMatch(/scored attributes/);
  });

  it("excludes unpublished profiles from matching", () => {
    expect(evaluateMatchEligibility({ ...base, status: "draft" }).eligible).toBe(false);
  });

  it("marks every seed profile eligible except Zheng He under taxonomy_v1.1", () => {
    // Was "every seed profile" under taxonomy_v1 (30 attributes). Stage 5
    // (Phase 6.6) evidence-first scoring of the 4 new attributes found no
    // defensible basis to score Zheng He on any of them (surviving sources
    // are administrative/court records, not personal ones — see
    // docs/phase6.6-taxonomy-v1.1-implementation.md) — his coverage denominator
    // grew from 30 to 34 with no corresponding new-attribute scores, and he
    // now falls below the 0.6 coverage floor (0.53). This is a confirmed,
    // evidence-driven migration result, not a threshold change: no score
    // was manufactured and ELIGIBILITY.minCoverage is untouched.
    for (const p of SEED_PEOPLE) {
      if (p.slug === "zheng-he") {
        expect(evaluateMatchEligibility(p).eligible, p.slug).toBe(false);
        continue;
      }
      expect(evaluateMatchEligibility(p).eligible, p.slug).toBe(true);
    }
  });
});

describe("eligibility_v2 (Roster-1000 session 10)", () => {
  const base = person("ada-lovelace");

  /** A fully synthetic profile: `rows` controls exactly which attributes
   *  are scored and at what confidence, letting each boundary be tested in
   *  isolation without depending on any real person's specific data. */
  function syntheticPerson(rows: { attributeId: AttributeId; confidence: number }[]): Person {
    return {
      ...base,
      attributes: rows.map((r) => ({
        attributeId: r.attributeId,
        score: 60,
        confidence: r.confidence,
        evidenceType: "strong_inference" as const,
        impact: "neutral" as const,
        sourceIds: base.sources.map((s) => s.id),
      })),
    };
  }

  it("ELIGIBILITY_VERSION is eligibility_v2", () => {
    expect(ELIGIBILITY_VERSION).toBe("eligibility_v2");
  });

  it("v1 behavior locked: minScoredAttributes and minCoverage are UNCHANGED from the historical rule", () => {
    expect(ELIGIBILITY.minScoredAttributes).toBe(18);
    expect(ELIGIBILITY.minCoverage).toBe(0.6);
  });

  it("total scored attributes < 18 fails, independent of confidence", () => {
    // 17 attributes, all high-confidence -- would clear every OTHER gate.
    const p = syntheticPerson(ATTRIBUTE_IDS.slice(0, 17).map((attributeId) => ({ attributeId, confidence: 0.9 })));
    const report = evaluateMatchEligibility(p);
    expect(report.eligible).toBe(false);
    expect(report.reasons.join(" ")).toMatch(/scored attributes/);
  });

  it("full weighted coverage < 0.60 fails, even with 18+ scored attributes all at high confidence", () => {
    // The 18 LOWEST-baseWeight attributes -- deliberately computed from the
    // real taxonomy table, not a hardcoded list, so this stays correct if
    // baseWeights are ever retuned. Self-verifying: asserts the coverage
    // precondition explicitly rather than assuming it.
    const lowestWeight = [...ATTRIBUTE_IDS].sort((a, b) => ATTRIBUTES[a].baseWeight - ATTRIBUTES[b].baseWeight);
    const p = syntheticPerson(lowestWeight.slice(0, 18).map((attributeId) => ({ attributeId, confidence: 0.9 })));
    const report = evaluateMatchEligibility(p);
    expect(report.coverage).toBeLessThan(0.6);
    expect(report.eligible).toBe(false);
    expect(report.reasons.join(" ")).toMatch(/coverage/);
  });

  it("high-confidence count of 11 fails (need >= 12)", () => {
    // 11 at confidence 0.9 (high-confidence subset), 23 more at confidence
    // 0.3 (below the 0.5 threshold, so excluded from the subset) -- 34
    // scored total, full coverage, isolating the count gate specifically.
    const hc = ATTRIBUTE_IDS.slice(0, 11).map((attributeId) => ({ attributeId, confidence: 0.9 }));
    const lc = ATTRIBUTE_IDS.slice(11).map((attributeId) => ({ attributeId, confidence: 0.3 }));
    const report = evaluateMatchEligibility(syntheticPerson([...hc, ...lc]));
    expect(report.highConfidenceCount).toBe(11);
    expect(report.eligible).toBe(false);
    expect(report.reasons.join(" ")).toMatch(/confidence >= 0\.5/);
  });

  it("high-confidence count of exactly 12 passes the count boundary", () => {
    const hc = ATTRIBUTE_IDS.slice(0, 12).map((attributeId) => ({ attributeId, confidence: 0.9 }));
    const lc = ATTRIBUTE_IDS.slice(12).map((attributeId) => ({ attributeId, confidence: 0.3 }));
    const report = evaluateMatchEligibility(syntheticPerson([...hc, ...lc]));
    expect(report.highConfidenceCount).toBe(12);
    // scored=34 (>=18) and coverage=1.0 (full taxonomy) both trivially
    // clear their own floors, isolating this assertion to the count gate.
    expect(report.eligible).toBe(true);
  });

  it("confidence exactly 0.5 belongs to the high-confidence subset (>=, not >)", () => {
    const exactlyHalf = ATTRIBUTE_IDS.slice(0, 12).map((attributeId) => ({ attributeId, confidence: 0.5 }));
    const filler = ATTRIBUTE_IDS.slice(12, 20).map((attributeId) => ({ attributeId, confidence: 0.3 }));
    const report = evaluateMatchEligibility(syntheticPerson([...exactlyHalf, ...filler]));
    // Counted, regardless of whether the AVERAGE gate separately passes.
    expect(report.highConfidenceCount).toBe(12);
    expect(report.highConfidenceAverage).toBeCloseTo(0.5, 10);
  });

  it("high-confidence average just below 0.55 fails", () => {
    // 12 attributes averaging 0.549: 11 at 0.55 exactly, 1 at 0.5312 --
    // (11*0.55 + 0.5312) / 12 = 0.549766..., i.e. just under 0.55.
    const hc = [
      ...ATTRIBUTE_IDS.slice(0, 11).map((attributeId) => ({ attributeId, confidence: 0.55 })),
      { attributeId: ATTRIBUTE_IDS[11]!, confidence: 0.5312 },
    ];
    const filler = ATTRIBUTE_IDS.slice(12, 20).map((attributeId) => ({ attributeId, confidence: 0.3 }));
    const report = evaluateMatchEligibility(syntheticPerson([...hc, ...filler]));
    expect(report.highConfidenceAverage).toBeLessThan(0.55);
    expect(report.eligible).toBe(false);
    expect(report.reasons.join(" ")).toMatch(/average confidence among high-confidence/);
  });

  it("high-confidence average of exactly 0.55 passes", () => {
    // A SINGLE attribute at confidence 0.55 -- `0.55 / 1 === 0.55` exactly
    // in IEEE-754, with no floating-point summation drift (confirmed:
    // summing 0.55 twelve times and dividing by 12 lands at
    // 0.5499999999999999, just under the boundary -- a floating-point
    // artifact of repeated addition, not a production defect; the
    // production code uses plain `<` with no epsilon, consistent with
    // every other threshold check in this file, so the fixture is
    // responsible for landing exactly on the boundary, not the code).
    const report = evaluateMatchEligibility(syntheticPerson([{ attributeId: ATTRIBUTE_IDS[0]!, confidence: 0.55 }]));
    expect(report.highConfidenceAverage).toBe(0.55);
    expect(report.reasons.join(" ")).not.toMatch(/average confidence among high-confidence/);
    // scored=1 < 18 and highConfidenceCount=1 < 12, so this specific
    // fixture is still ineligible overall -- this test isolates the
    // AVERAGE gate only, not the full pass/fail outcome.
    expect(report.reasons.join(" ")).toMatch(/scored attributes/);
  });

  it("many additional low-confidence rows do NOT mechanically lower the high-confidence average", () => {
    const hc = ATTRIBUTE_IDS.slice(0, 12).map((attributeId) => ({ attributeId, confidence: 0.7 }));
    const withoutPadding = evaluateMatchEligibility(syntheticPerson(hc));
    const padded = ATTRIBUTE_IDS.slice(12, 30).map((attributeId) => ({ attributeId, confidence: 0.21 }));
    const withPadding = evaluateMatchEligibility(syntheticPerson([...hc, ...padded]));
    expect(withPadding.highConfidenceCount).toBe(withoutPadding.highConfidenceCount);
    expect(withPadding.highConfidenceAverage).toBeCloseTo(withoutPadding.highConfidenceAverage, 10);
  });

  it("low-confidence rows still contribute to full coverage exactly as before (v1's coverage computation, untouched)", () => {
    const hc = ATTRIBUTE_IDS.slice(0, 12).map((attributeId) => ({ attributeId, confidence: 0.7 }));
    const withoutLowConf = evaluateMatchEligibility(syntheticPerson(hc));
    const lowConf = ATTRIBUTE_IDS.slice(12, 20).map((attributeId) => ({ attributeId, confidence: 0.2 }));
    const withLowConf = evaluateMatchEligibility(syntheticPerson([...hc, ...lowConf]));
    // The low-confidence rows are excluded from the HC subset but their
    // baseWeight still counts toward the full-profile coverage statistic --
    // adding them can only raise (never lower) coverage, exactly like v1.
    expect(withLowConf.coverage).toBeGreaterThan(withoutLowConf.coverage);
  });

  it("low-confidence rows remain fully present in actual matching (buildTerms), unaffected by the admission-rule change", () => {
    const target = person("marie-curie");
    const lowConfAttr = target.attributes.find((a) => a.attributeId !== "curiosity");
    if (!lowConfAttr) throw new Error("fixture requires at least one non-curiosity attribute");
    const withLowConfidence: Person = {
      ...target,
      attributes: target.attributes.map((a) =>
        a.attributeId === lowConfAttr.attributeId ? { ...a, confidence: 0.3 } : a,
      ),
    };
    const user = mirrorOf(target);
    const result = matchUserToPerson(user, withLowConfidence);
    const term = [...result.closestTraits, ...result.largestDifferences, ...result.userHigherTraits, ...result.personHigherTraits].find(
      (t) => t.attributeId === lowConfAttr.attributeId,
    );
    // Confidence 0.3 is well below eligibility_v2's 0.5 high-confidence
    // threshold, yet the attribute still carries a real, nonzero weight in
    // matching -- admission and matching read the same data through
    // deliberately different, independent lenses.
    if (term) expect(term.effectiveWeight).toBeGreaterThan(0);
    // Directly confirm the attribute is not silently dropped from buildTerms'
    // input by checking it still moves the raw similarity relative to a
    // variant with the SAME attribute entirely removed.
    const withoutAttribute: Person = {
      ...target,
      attributes: target.attributes.filter((a) => a.attributeId !== lowConfAttr.attributeId),
    };
    const withResult = matchUserToPerson(user, withLowConfidence);
    const withoutResult = matchUserToPerson(user, withoutAttribute);
    expect(withResult.coverage).toBeGreaterThan(withoutResult.coverage);
  });

  it("REGRESSION: evaluateMatchEligibility (v2) has zero effect on matchUserToPerson's computation for the same inputs", () => {
    const target = person("marie-curie");
    const originalAttributes = JSON.parse(JSON.stringify(target.attributes));
    const user = mirrorOf(target);
    const before = matchUserToPerson(user, target);
    const eligibility = evaluateMatchEligibility(target); // exercises the new v2 admission logic
    expect(eligibility.eligible).toBe(true);
    const after = matchUserToPerson(user, target);
    expect(after).toEqual(before);
    // The eligibility check must never mutate the person object it reads.
    expect(target.attributes).toEqual(originalAttributes);
  });

  it("marks every currently-eligible seed profile eligible under eligibility_v2 too (reproduces session 9's finding: 0 regressions)", () => {
    for (const p of SEED_PEOPLE) {
      if (p.slug === "zheng-he") {
        expect(evaluateMatchEligibility(p).eligible, p.slug).toBe(false);
        continue;
      }
      expect(evaluateMatchEligibility(p).eligible, p.slug).toBe(true);
    }
  });
});

describe("result selectors", () => {
  const user = profile({ curiosity: 88, creative_originality: 84, autonomy_need: 86 });

  it("ranks deterministically across repeated runs", () => {
    const a = rankMatches(user, SEED_PEOPLE).map((m) => [m.personId, m.overallMatch]);
    const b = rankMatches(user, [...SEED_PEOPLE].reverse()).map((m) => [m.personId, m.overallMatch]);
    expect(b).toEqual(a);
  });

  it("never returns the closest match as the unexpected match", () => {
    const result = buildResultSet(user, SEED_PEOPLE);
    if (result.unexpected) expect(result.unexpected.personId).not.toBe(result.closest?.personId);
  });

  it("only surfaces an unexpected match from a genuinely different context", () => {
    const result = buildResultSet(user, SEED_PEOPLE);
    if (result.unexpected && result.closest) {
      expect(contextualDistance(result.closest.person, result.unexpected.person)).toBeGreaterThanOrEqual(
        0.45,
      );
    }
  });

  it("returns the least similar eligible person as the opposite profile", () => {
    const result = buildResultSet(user, SEED_PEOPLE);
    const lowest = [...result.ranked].sort((a, b) => a.rawSimilarity - b.rawSimilarity)[0];
    expect(result.opposite?.personId).toBe(lowest?.personId);
  });

  it("produces one category match per facet", () => {
    // 7 since taxonomy_v1.1 (Phase 6.6) added the world_sense facet.
    expect(selectCategoryMatches(user, SEED_PEOPLE)).toHaveLength(7);
  });
});

/**
 * Phase 6: category-match diversity. selectCategoryMatches must not touch
 * facetSimilarity's numbers — it only decides, among near-ties, which person
 * to surface for a facet whose true best is already used elsewhere.
 */
describe("category match diversity (Phase 6)", () => {
  const attrFull = (attributeId: AttributeId, score: number): Person["attributes"][number] => ({
    attributeId,
    score,
    confidence: 0.9,
    evidenceType: "documented",
    impact: "neutral",
    sourceIds: [],
  });

  const makeFullPerson = (id: string, scoreFor: (attributeId: AttributeId) => number): Person => ({
    id,
    slug: id,
    canonicalName: id,
    aliases: [],
    isLiving: false,
    era: "contemporary",
    nationalityCodes: [],
    regionCode: "test",
    occupationIds: [],
    fieldIds: [],
    impactDomains: [],
    tagIds: [],
    archetypeIds: [],
    attributes: ATTRIBUTE_IDS.map((id_) => attrFull(id_, scoreFor(id_))),
    status: "published",
    isMatchEligible: true,
    overallProfileConfidence: 0.9,
    sources: [],
    doNotCopyKeys: [],
  });

  const CREATIVITY_IDS = new Set<AttributeId>([
    "creative_originality",
    "experimentation",
    "cross_domain_range",
    "aesthetic_sensitivity",
  ]);

  const user = profile(Object.fromEntries(ATTRIBUTE_IDS.map((id) => [id, 70])));
  // A near-perfect match on EVERY facet.
  const personA = makeFullPerson("a-generalist", () => 70);
  // Near-perfect ONLY on creativity (a tiny, cheap-to-prefer gap there);
  // far off everywhere else, so diversifying away from A elsewhere would be
  // expensive.
  const personB = makeFullPerson("b-creative-specialist", (id) => (CREATIVITY_IDS.has(id) ? 69 : 20));

  it("prefers a close-second person over repeating the facet's true best when the cost is small", () => {
    const matches = selectCategoryMatches(user, [personA, personB]);
    const creativity = matches.find((m) => m.facet === "creativity");
    expect(creativity?.personId).toBe(personB.id);
  });

  it("still prefers the true best (accepts repetition) when diversifying would cost a lot", () => {
    const matches = selectCategoryMatches(user, [personA, personB]);
    const resilience = matches.find((m) => m.facet === "resilience");
    expect(resilience?.personId).toBe(personA.id);
  });

  it("never changes a facet's reported match percentage to manufacture variety", () => {
    // The creativity pick changes to personB, but its displayed match must be
    // personB's OWN facetSimilarity-derived number, not personA's borrowed one.
    const matches = selectCategoryMatches(user, [personA, personB]);
    const creativity = matches.find((m) => m.facet === "creativity")!;
    const direct = calibrateMatch(facetSimilarity(user, personB, "creativity"));
    expect(creativity.match).toBe(direct);
  });
});

/**
 * Regression tests for the two matching_v2 fixes (see similarity.ts header and
 * CLAUDE.md "matching_v1 -> v2"). Both are deterministic unit tests, not
 * simulation-based — the simulator caught the original bugs, but a fixed
 * scenario is what should catch a silent reintroduction.
 */
describe("matching_v2 regression: flat profiles must not get a free pass", () => {
  const TEN_ATTRS: AttributeId[] = [
    "curiosity",
    "analytical_rigor",
    "creative_originality",
    "discipline",
    "persistence",
    "risk_tolerance",
    "social_assertiveness",
    "collaboration",
    "mastery_orientation",
    "impact_motivation",
  ];

  const attr = (attributeId: AttributeId, score: number): Person["attributes"][number] => ({
    attributeId,
    score,
    confidence: 0.9,
    evidenceType: "documented",
    impact: "neutral",
    sourceIds: [],
  });

  const makePerson = (id: string, scores: number[]): Person => ({
    id,
    slug: id,
    canonicalName: id,
    aliases: [],
    isLiving: false,
    era: "contemporary",
    nationalityCodes: [],
    regionCode: "test",
    occupationIds: [],
    fieldIds: [],
    impactDomains: [],
    tagIds: [],
    archetypeIds: [],
    attributes: TEN_ATTRS.map((id_, i) => attr(id_, scores[i]!)),
    status: "published",
    isMatchEligible: true,
    overallProfileConfidence: 0.9,
    sources: [],
    doNotCopyKeys: [],
  });

  // Same average level (~65), radically different internal shape.
  const personFlat = makePerson("flat", [65, 65, 65, 65, 65, 65, 65, 65, 65, 65]);
  const personPeaked = makePerson("peaked", [95, 90, 85, 40, 35, 30, 90, 85, 80, 40]);

  const userSameShape = profile(
    Object.fromEntries(TEN_ATTRS.map((id, i) => [id, [88, 82, 78, 45, 40, 35, 84, 80, 75, 45][i]])),
  );
  const userOppositeShape = profile(
    Object.fromEntries(TEN_ATTRS.map((id, i) => [id, [35, 40, 45, 84, 88, 82, 40, 45, 50, 80][i]])),
  );

  it("a real pattern match beats a flat profile for a user who shares that pattern", () => {
    const toFlat = matchUserToPerson(userSameShape, personFlat).rawSimilarity;
    const toPeaked = matchUserToPerson(userSameShape, personPeaked).rawSimilarity;
    expect(toPeaked).toBeGreaterThan(toFlat);
  });

  it("a flat profile does not out-score a genuine shape match for its own matching user", () => {
    const matchingUser = matchUserToPerson(userSameShape, personPeaked).rawSimilarity;
    const oppositeUser = matchUserToPerson(userOppositeShape, personPeaked).rawSimilarity;
    expect(matchingUser).toBeGreaterThan(oppositeUser);
  });

  it("a flat profile's similarity to an arbitrary user is not systematically inflated", () => {
    // Under v1's conflated shape term this was close to 1 regardless of user
    // shape, because it collapsed to the user's own variance. It should now
    // sit at a middling, non-extreme value for a user with real structure.
    const toFlat = matchUserToPerson(userOppositeShape, personFlat).rawSimilarity;
    expect(toFlat).toBeLessThan(0.85);
  });
});

describe("matching_v2 regression: coverage shrinkage tempers thin-profile confidence", () => {
  const ALL_ATTRS = ATTRIBUTE_IDS;
  const attr = (attributeId: AttributeId, score: number): Person["attributes"][number] => ({
    attributeId,
    score,
    confidence: 0.7,
    evidenceType: "strong_inference",
    impact: "neutral",
    sourceIds: [],
  });

  // A person whose full 30-attribute profile is a strong, genuine match for
  // `matchingUser` (small, consistent offset on every trait).
  const matchingUser = profile(Object.fromEntries(ALL_ATTRS.map((id) => [id, 60])));
  const fullScores = ALL_ATTRS.map((_, i) => 60 + (i % 3 === 0 ? 5 : -3));

  const makePerson = (id: string, ids: readonly AttributeId[], scores: number[]): Person => ({
    id,
    slug: id,
    canonicalName: id,
    aliases: [],
    isLiving: false,
    era: "contemporary",
    nationalityCodes: [],
    regionCode: "test",
    occupationIds: [],
    fieldIds: [],
    impactDomains: [],
    tagIds: [],
    archetypeIds: [],
    attributes: ids.map((id_, i) => attr(id_, scores[i]!)),
    status: "published",
    isMatchEligible: true,
    overallProfileConfidence: 0.7,
    sources: [],
    doNotCopyKeys: [],
  });

  const personFull = makePerson("full", ALL_ATTRS, fullScores);
  // Same underlying values, but only the first 18 attributes are "scored" —
  // exactly the eligibility floor, mirroring a thin ancient/medieval profile.
  const personThin = makePerson("thin", ALL_ATTRS.slice(0, 18), fullScores.slice(0, 18));

  it("pulls a thin profile's raw similarity toward the neutral baseline relative to the full profile", () => {
    const fullRaw = matchUserToPerson(matchingUser, personFull).rawSimilarity;
    const thinRaw = matchUserToPerson(matchingUser, personThin).rawSimilarity;
    expect(fullRaw).toBeGreaterThan(0.45); // sanity: this is a good match to begin with
    expect(thinRaw).toBeLessThan(fullRaw);
    expect(thinRaw).toBeGreaterThan(0.45); // shrunk toward neutral, not past it
  });

  it("leaves a full-coverage profile's similarity unshrunk", () => {
    const coverage = matchUserToPerson(matchingUser, personFull).coverage;
    expect(coverage).toBeCloseTo(1, 1);
  });
});

/**
 * Phase 5 (matching hardening): explicit re-verification of every matching
 * failure mode previously found and fixed, plus one previously-undiagnosed
 * mechanism audited this phase (high-vs-low-dispersion omission). These are
 * mechanism-level regressions, not percentage snapshots — see CLAUDE.md
 * "Phase 5" for the simulation-based sensitivity findings this complements.
 */
describe("Phase 5: known failure modes, explicitly re-verified", () => {
  const TEN_ATTRS: AttributeId[] = [
    "curiosity",
    "analytical_rigor",
    "creative_originality",
    "discipline",
    "persistence",
    "risk_tolerance",
    "social_assertiveness",
    "collaboration",
    "mastery_orientation",
    "impact_motivation",
  ];

  const attr10 = (attributeId: AttributeId, score: number): Person["attributes"][number] => ({
    attributeId,
    score,
    confidence: 0.9,
    evidenceType: "documented",
    impact: "neutral",
    sourceIds: [],
  });

  const makePerson10 = (id: string, scores: number[]): Person => ({
    id,
    slug: id,
    canonicalName: id,
    aliases: [],
    isLiving: false,
    era: "contemporary",
    nationalityCodes: [],
    regionCode: "test",
    occupationIds: [],
    fieldIds: [],
    impactDomains: [],
    tagIds: [],
    archetypeIds: [],
    attributes: TEN_ATTRS.map((id_, i) => attr10(id_, scores[i]!)),
    status: "published",
    isMatchEligible: true,
    overallProfileConfidence: 0.9,
    sources: [],
    doNotCopyKeys: [],
  });

  describe("level/elevation domination: pattern must outweigh level proximity", () => {
    // User's own shape on TEN_ATTRS.
    const userShape = [88, 82, 78, 45, 40, 35, 84, 80, 75, 45];
    const user = profile(Object.fromEntries(TEN_ATTRS.map((id, i) => [id, userShape[i]!])));

    // Same shape as the user, uniformly shifted down 20 points (real level gap,
    // near-zero pattern gap).
    const sameShapeDifferentLevel = makePerson10(
      "same-shape",
      userShape.map((v) => v - 20),
    );
    // Same overall level as the user (mirrored around the mean, so the average
    // is preserved), but an anti-correlated shape (real pattern gap, near-zero
    // level gap).
    const mean = userShape.reduce((s, v) => s + v, 0) / userShape.length;
    const sameLevelDifferentShape = makePerson10(
      "same-level",
      userShape.map((v) => Math.round(2 * mean - v)),
    );

    it("a real shape match beats a level-only match, even though LEVEL_WEIGHT is nonzero", () => {
      const shapeMatch = matchUserToPerson(user, sameShapeDifferentLevel).rawSimilarity;
      const levelMatch = matchUserToPerson(user, sameLevelDifferentShape).rawSimilarity;
      expect(shapeMatch).toBeGreaterThan(levelMatch);
      // Not just "greater than" — this is the mechanism the v1->v2 fix protects
      // (PATTERN_WEIGHT=0.5 > LEVEL_WEIGHT=0.3), so the margin should be
      // substantial, not a coincidence of these particular numbers.
      expect(shapeMatch - levelMatch).toBeGreaterThan(0.15);
    });
  });

  describe("unreachable profiles: every eligible person must be able to rank #1", () => {
    it("every match-eligible seed person ranks first for a user who mirrors them exactly", () => {
      for (const p of SEED_PEOPLE.filter((x) => x.isMatchEligible)) {
        const ranked = rankMatches(mirrorOf(p), SEED_PEOPLE);
        expect(ranked[0]?.personId, p.slug).toBe(p.id);
      }
    });
  });

  describe("high-variance omission advantage: which attributes survive shouldn't matter much", () => {
    // Same causal family as coverage shrinkage (2b): does a thin profile gain
    // an unwarranted advantage specifically from omitting the MOST
    // discriminating (highest-dispersion) attributes, keeping only the ones
    // where the dataset barely varies? If coverage shrinkage only accounts for
    // HOW MUCH is missing (not WHICH attributes), a person who happens to keep
    // only low-dispersion attributes could look artificially more "typical".
    const sortedByDispersion = [...ATTRIBUTE_IDS].sort(
      (a, b) => discriminativeWeight(b) - discriminativeWeight(a),
    );
    const highDispersionIds = sortedByDispersion.slice(0, 18);
    const lowDispersionIds = sortedByDispersion.slice(-18);

    const attrAt = (attributeId: AttributeId): Person["attributes"][number] => {
      const i = ATTRIBUTE_IDS.indexOf(attributeId);
      return {
        attributeId,
        score: 60 + (i % 3 === 0 ? 5 : -3),
        confidence: 0.7,
        evidenceType: "strong_inference",
        impact: "neutral",
        sourceIds: [],
      };
    };
    const makeThinPerson = (id: string, ids: readonly AttributeId[]): Person => ({
      id,
      slug: id,
      canonicalName: id,
      aliases: [],
      isLiving: false,
      era: "contemporary",
      nationalityCodes: [],
      regionCode: "test",
      occupationIds: [],
      fieldIds: [],
      impactDomains: [],
      tagIds: [],
      archetypeIds: [],
      attributes: ids.map(attrAt),
      status: "published",
      isMatchEligible: true,
      overallProfileConfidence: 0.7,
      sources: [],
      doNotCopyKeys: [],
    });

    const user = profile(Object.fromEntries(ATTRIBUTE_IDS.map((id) => [id, 60])));
    const personHighOnly = makeThinPerson("high-dispersion-only", highDispersionIds);
    const personLowOnly = makeThinPerson("low-dispersion-only", lowDispersionIds);

    it("omitting high-dispersion attributes does not grant a large advantage over omitting low-dispersion ones", () => {
      const high = matchUserToPerson(user, personHighOnly).rawSimilarity;
      const low = matchUserToPerson(user, personLowOnly).rawSimilarity;
      // Both are thin (18/30) profiles built from the same underlying offset
      // pattern; only WHICH attributes survived differs. A meaningful residual
      // advantage would show up as a large gap. Empirically this is ~0.006 raw
      // (see CLAUDE.md "Phase 5") — bounded generously here so the test tracks
      // "no large brittle gap", not the exact figure.
      expect(Math.abs(high - low)).toBeLessThan(0.05);
    });
  });

  describe("locale immunity: matching never takes a locale as input", () => {
    it("is unaffected by which locale the i18n layer was last asked for", () => {
      const p = SEED_PEOPLE.find((x) => x.slug === "marie-curie")!;
      const user = profile({ curiosity: 80, analytical_rigor: 75 });
      const before = matchUserToPerson(user, p);
      t("ko-KR", "attribute.curiosity");
      const after = matchUserToPerson(user, p);
      expect(after.rawSimilarity).toBe(before.rawSimilarity);
      expect(after.overallMatch).toBe(before.overallMatch);
    });
  });
});

/**
 * Phase 6.6 Stage 7 (taxonomy_v1.1 dispersion regeneration + matching
 * revalidation): a durable invariant found during Stage 7E's coverage-stress
 * diagnostics (`src/dev/stage7-diagnostics.ts newtrait`), locked here so a
 * future change cannot silently reintroduce a sparse-new-trait advantage or
 * penalty. Full simulation-based evidence (real-roster correlations, the
 * belief_updating ablation finding) is in
 * `docs/phase6.6-taxonomy-v1.1-implementation.md` "Stage 7" — this test
 * pins the SAME mechanism deterministically, without simulation.
 */
describe("Phase 6.6 Stage 7: new-trait sparse coverage does not create an accidental advantage or penalty", () => {
  const NEW_TRAITS: AttributeId[] = [
    "opportunity_sensing",
    "resourcefulness",
    "proactive_agency",
    "belief_updating",
  ];
  const ORIGINAL_30 = ATTRIBUTE_IDS.filter((id) => !NEW_TRAITS.includes(id));

  const attrAt = (attributeId: AttributeId, score: number): Person["attributes"][number] => ({
    attributeId,
    score,
    confidence: 0.75,
    evidenceType: "strong_inference",
    impact: "neutral",
    sourceIds: [],
  });

  const makeSynthetic = (id: string, includeNewTraits: boolean): Person => ({
    id,
    slug: id,
    canonicalName: id,
    aliases: [],
    isLiving: false,
    era: "contemporary",
    nationalityCodes: [],
    regionCode: "test",
    occupationIds: [],
    fieldIds: [],
    impactDomains: [],
    tagIds: [],
    archetypeIds: [],
    attributes: [
      ...ORIGINAL_30.map((attrId, i) => attrAt(attrId, 55 + ((i * 7) % 30))),
      ...(includeNewTraits ? NEW_TRAITS.map((attrId, i) => attrAt(attrId, 60 + i * 5)) : []),
    ],
    status: "published",
    isMatchEligible: true,
    overallProfileConfidence: 0.75,
    sources: [],
    doNotCopyKeys: [],
  });

  it("a person with 0 of 4 new traits scored is not accidentally advantaged over an identical person with all 4", () => {
    const withNone = makeSynthetic("synthetic-0-new", false);
    const withAll = makeSynthetic("synthetic-4-new", true);
    // Same user, several different shapes, so this isn't one lucky vector.
    const users = [
      profile(Object.fromEntries(ATTRIBUTE_IDS.map((id, i) => [id, 50 + ((i * 11) % 40)]))),
      profile(Object.fromEntries(ATTRIBUTE_IDS.map((id) => [id, 70]))),
      profile(Object.fromEntries(ATTRIBUTE_IDS.map((id, i) => [id, 30 + ((i * 5) % 50)]))),
    ];
    for (const user of users) {
      const none = matchUserToPerson(user, withNone).rawSimilarity;
      const all = matchUserToPerson(user, withAll).rawSimilarity;
      // The only defensible source of a gap here is coverage shrinkage
      // (withNone's coverage is structurally lower) — bounded generously so
      // this tracks "no large, disproportionate swing", not an exact figure.
      expect(Math.abs(none - all)).toBeLessThan(0.05);
    }
  });

  it("new-trait coverage does not change which person an exact mirror-user ranks #1", () => {
    // A person who scores 0 of the 4 new traits must still be reachable as a
    // #1 match for a user who mirrors their 30 scored attributes exactly —
    // absence of the new traits must not disqualify or demote them.
    const withNone = makeSynthetic("synthetic-0-new-mirror", false);
    const mirrorUser = profile(
      Object.fromEntries(withNone.attributes.map((a) => [a.attributeId, a.score])),
    );
    const ranked = rankMatches(mirrorUser, [withNone]);
    expect(ranked[0]?.personId).toBe(withNone.id);
  });
});
