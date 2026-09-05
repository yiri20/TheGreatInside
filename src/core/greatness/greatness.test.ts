import { describe, expect, it } from "vitest";
import { ATTRIBUTE_IDS, TAXONOMY_VERSION, type AttributeId } from "../attributes/attributes.js";
import type { UserProfile } from "../types.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import {
  bandFor,
  calibrateGreatness,
  coherence,
  computeGreatnessPotential,
  engineTraitPlateau,
  GREATNESS_BANDS,
  GREATNESS_CALIBRATION_ANCHORS,
} from "./greatness.js";
import { deriveArchetypeCentroids } from "./archetypes.js";
import { rankMatches } from "../matching/similarity.js";
import { buildResultSet } from "../matching/selectors.js";
import { t } from "../i18n/index.js";

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

const gp = (user: UserProfile) => computeGreatnessPotential(user, { people: SEED_PEOPLE });

describe("greatness calibration", () => {
  it("is monotone", () => {
    for (let i = 1; i < GREATNESS_CALIBRATION_ANCHORS.length; i++) {
      expect(GREATNESS_CALIBRATION_ANCHORS[i]![0]).toBeGreaterThan(
        GREATNESS_CALIBRATION_ANCHORS[i - 1]![0],
      );
      expect(GREATNESS_CALIBRATION_ANCHORS[i]![1]).toBeGreaterThan(
        GREATNESS_CALIBRATION_ANCHORS[i - 1]![1],
      );
    }
    let last = -1;
    for (let raw = 0; raw <= 1.0001; raw += 0.005) {
      const value = calibrateGreatness(raw);
      expect(value).toBeGreaterThanOrEqual(last);
      last = value;
    }
  });

  it("covers 0-100 with contiguous, non-overlapping bands", () => {
    for (let score = 0; score <= 100; score++) expect(bandFor(score)).toBeDefined();
    for (let i = 1; i < GREATNESS_BANDS.length; i++) {
      expect(GREATNESS_BANDS[i]!.min).toBe(GREATNESS_BANDS[i - 1]!.max + 1);
    }
  });

  /** Phase 6.6 Stage 8 (calibration_v3 regeneration) — see the matching
   *  calibration curve's identical tests for the rationale. */
  it("produces no discontinuity or inversion exactly at an anchor boundary", () => {
    const EPSILON = 1e-6;
    for (const [rawX] of GREATNESS_CALIBRATION_ANCHORS) {
      if (rawX <= 0 || rawX >= 1) continue;
      const just_before = calibrateGreatness(rawX - EPSILON);
      const at = calibrateGreatness(rawX);
      const just_after = calibrateGreatness(rawX + EPSILON);
      expect(just_before).toBeLessThanOrEqual(at);
      expect(at).toBeLessThanOrEqual(just_after);
    }
  });

  it("preserves the raw-score ordering of an arbitrary sample of raw values", () => {
    const rawSamples = [0.56, 0.65, 0.7, 0.73, 0.75, 0.77, 0.79, 0.81, 0.83, 0.85, 0.87, 0.89, 0.92, 0.95, 0.97];
    const byRaw = [...rawSamples].sort((a, b) => a - b);
    const byCalibrated = [...rawSamples].sort((a, b) => calibrateGreatness(a) - calibrateGreatness(b));
    expect(byCalibrated).toEqual(byRaw);
  });
});

describe("greatness determinism", () => {
  const user = profile({ curiosity: 88, persistence: 84, discipline: 80 });

  it("returns the same score for the same vector", () => {
    expect(gp(user).score).toBe(gp(user).score);
  });

  it("is unaffected by person metadata", () => {
    const rewritten = SEED_PEOPLE.map((p) => ({
      ...p,
      canonicalName: "Anon",
      nationalityCodes: ["ZZ"],
      regionCode: "elsewhere",
      impactDomains: ["wealth_creation" as const],
      tagIds: ["trending"],
      aliases: ["Rewritten Alias"],
      historicalPolityKey: "polity.rewritten",
      externalIdentity: { wikidataId: "Q1" },
      portrait: { url: "https://example.com/x.jpg", source: "x", license: "CC0" },
    }));
    expect(computeGreatnessPotential(user, { people: rewritten }).score).toBe(gp(user).score);
  });

  it("stamps its scoring version so old results stay interpretable", () => {
    expect(gp(user).greatnessScoringVersion).toBe("greatness_v1");
  });

  it("moves predictably when a relevant attribute moves", () => {
    const low = gp(profile({ persistence: 20, discipline: 20, curiosity: 20, mastery_orientation: 20 }));
    const high = gp(profile({ persistence: 85, discipline: 85, curiosity: 85, mastery_orientation: 85 }));
    expect(high.score).toBeGreaterThan(low.score);
  });
});

describe("greatness must not encode 'higher is always better'", () => {
  it("does not award the maximum to a profile pinned at 100 on everything", () => {
    const maxed = gp(profile({}, 100));
    expect(maxed.score).toBeLessThan(99);
  });

  it("rates a coherent, pattern-shaped profile above an all-100s profile", () => {
    // An all-100s profile claims both sides of every trade-off at once. A
    // profile that actually looks like an observed achievement pattern should
    // beat it — this is the property a plain average of trait scores destroys.
    const maxed = gp(profile({}, 100));
    const shaped = gp(
      profile({
        curiosity: 92,
        analytical_rigor: 86,
        systems_abstraction: 84,
        persistence: 88,
        deep_focus: 86,
        mastery_orientation: 88,
        ambiguity_tolerance: 78,
        discipline: 84,
        adaptability: 76,
        execution_speed: 45,
        competitiveness: 40,
        leadership_drive: 35,
        collaboration: 45,
      }),
    );
    expect(shaped.score).toBeGreaterThan(maxed.score);
  });

  it("penalises claiming both sides of a tension pair", () => {
    const contradictory = coherence(
      profile({ perfectionism: 100, execution_speed: 100, autonomy_need: 100, collaboration: 100 })
        .scores,
    );
    const consistent = coherence(
      profile({ perfectionism: 90, execution_speed: 40, autonomy_need: 88, collaboration: 35 }).scores,
    );
    expect(contradictory).toBeLessThan(consistent);
  });

  it("rolls the engine-trait curve over past 90 rather than rewarding extremity", () => {
    expect(engineTraitPlateau(80)).toBe(1);
    expect(engineTraitPlateau(100)).toBeLessThan(engineTraitPlateau(80));
    expect(engineTraitPlateau(40)).toBeLessThan(engineTraitPlateau(80));
  });

  it("offers more than one route to a high score", () => {
    const scientist = gp(
      profile({
        curiosity: 92,
        analytical_rigor: 88,
        systems_abstraction: 84,
        persistence: 88,
        deep_focus: 88,
        mastery_orientation: 88,
        ambiguity_tolerance: 80,
        discipline: 84,
      }),
    );
    const builder = gp(
      profile({
        risk_tolerance: 84,
        decisiveness: 82,
        execution_speed: 82,
        persuasiveness: 78,
        leadership_drive: 80,
        adaptability: 80,
        achievement_drive: 86,
        ambiguity_tolerance: 80,
      }),
    );
    expect(scientist.score).toBeGreaterThan(55);
    expect(builder.score).toBeGreaterThan(55);
    expect(scientist.primaryArchetypeId).not.toBe(builder.primaryArchetypeId);
  });
});

describe("greatness and profile match are independent questions", () => {
  it("allows a high individual match alongside a moderate potential score", () => {
    // Mirror da Vinci exactly: a ~99% match by construction.
    const daVinci = SEED_PEOPLE.find((p) => p.slug === "leonardo-da-vinci")!;
    const scores: Partial<Record<AttributeId, number>> = {};
    for (const a of daVinci.attributes) scores[a.attributeId] = a.score;
    const user = profile(scores);

    const top = rankMatches(user, SEED_PEOPLE)[0]!;
    expect(top.overallMatch).toBe(99);
    // The two numbers are produced by different mechanisms and must not be equal
    // or derived from one another.
    expect(gp(user).score).not.toBe(top.overallMatch);
  });

  it("can produce a high potential score without any close individual match", () => {
    const user = profile({
      curiosity: 90,
      cross_domain_range: 90,
      adaptability: 84,
      creative_originality: 82,
      systems_abstraction: 82,
      experimentation: 82,
      ambiguity_tolerance: 80,
      persistence: 84,
      discipline: 82,
      mastery_orientation: 84,
    });
    const result = gp(user);
    const top = rankMatches(user, SEED_PEOPLE)[0]!;
    expect(result.score).toBeGreaterThan(60);
    expect(top.overallMatch).toBeLessThan(result.score + 40);
  });
});

describe("archetype centroids", () => {
  it("shrinks toward observed dataset profiles rather than trusting priors blindly", () => {
    const priors = deriveArchetypeCentroids([]);
    const derived = deriveArchetypeCentroids(SEED_PEOPLE);
    const priorBand = priors.competitive_performer.signature.find(
      (b) => b.attributeId === "competitiveness",
    )!;
    const derivedBand = derived.competitive_performer.signature.find(
      (b) => b.attributeId === "competitiveness",
    )!;
    expect(derivedBand.target).not.toBe(priorBand.target);
  });

  it("is deterministic for a given dataset", () => {
    expect(deriveArchetypeCentroids(SEED_PEOPLE)).toEqual(deriveArchetypeCentroids(SEED_PEOPLE));
  });

  it("keeps deliberately low targets low, so no archetype implies 'max everything'", () => {
    // Threshold tracks the shrinkage-blended centroid over SEED_PEOPLE, which
    // shifts slightly as new, honestly-scored independent_creator-tagged
    // people are added (e.g. roster16's Charles Dickens, leadership_drive
    // 68 at confidence 0.5) — this is a real recomputation over more real
    // data, not a change to the archetype's low prior (35) or to any score.
    // Re-check this margin if the archetype's population grows further.
    const derived = deriveArchetypeCentroids(SEED_PEOPLE);
    const leadership = derived.independent_creator.signature.find(
      (b) => b.attributeId === "leadership_drive",
    )!;
    expect(leadership.target).toBeLessThan(65);
  });
});

describe("category potential", () => {
  it("reports every category and keeps them on the 0-100 scale", () => {
    const result = gp(profile({ creative_originality: 90, aesthetic_sensitivity: 88 }));
    const values = Object.values(result.categoryPotential);
    expect(values).toHaveLength(5);
    for (const v of values) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    }
  });

  it("scores a creative profile higher on creative than on leadership potential", () => {
    const result = gp(
      profile({
        creative_originality: 92,
        aesthetic_sensitivity: 90,
        deep_focus: 86,
        perfectionism: 82,
        independent_thinking: 86,
        persistence: 84,
        experimentation: 78,
        leadership_drive: 25,
        persuasiveness: 30,
        social_assertiveness: 28,
      }),
    );
    expect(result.categoryPotential.creative).toBeGreaterThan(result.categoryPotential.leadership);
  });
});

/**
 * Phase 6 (results page): the page composes `buildResultSet` and
 * `computeGreatnessPotential` together and feeds the SAME UserProfile into
 * both. These pin the properties the page's structure depends on, at the
 * composition level rather than the individual-function level.
 */
describe("Phase 6: full result composition", () => {
  const user = profile({
    curiosity: 88,
    analytical_rigor: 40,
    creative_originality: 84,
    collaboration: 30,
    autonomy_need: 86,
  });

  it("closest match is always rank #1 of the ranked list", () => {
    const results = buildResultSet(user, SEED_PEOPLE);
    expect(results.closest).toBe(results.ranked[0]);
  });

  it("is unaffected by which locale the i18n layer was last asked for", () => {
    const before = {
      results: buildResultSet(user, SEED_PEOPLE),
      greatness: computeGreatnessPotential(user, { people: SEED_PEOPLE }),
    };
    t("ko-KR", "attribute.curiosity");
    t("ko-KR", "greatness.band.strong_pattern");
    const after = {
      results: buildResultSet(user, SEED_PEOPLE),
      greatness: computeGreatnessPotential(user, { people: SEED_PEOPLE }),
    };
    expect(after.results.closest?.overallMatch).toBe(before.results.closest?.overallMatch);
    expect(after.results.closest?.personId).toBe(before.results.closest?.personId);
    expect(after.results.categoryMatches).toEqual(before.results.categoryMatches);
    expect(after.greatness.score).toBe(before.greatness.score);
    expect(after.greatness.primaryArchetypeId).toBe(before.greatness.primaryArchetypeId);
  });

  it("is fully deterministic for the same profile and dataset", () => {
    const a = buildResultSet(user, SEED_PEOPLE);
    const b = buildResultSet(user, SEED_PEOPLE);
    expect(a.closest?.personId).toBe(b.closest?.personId);
    expect(a.opposite?.personId).toBe(b.opposite?.personId);
    expect(a.categoryMatches).toEqual(b.categoryMatches);
    expect(computeGreatnessPotential(user, { people: SEED_PEOPLE }).score).toBe(
      computeGreatnessPotential(user, { people: SEED_PEOPLE }).score,
    );
  });
});
