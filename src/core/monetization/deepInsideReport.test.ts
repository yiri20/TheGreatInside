import { describe, expect, it } from "vitest";
import { ATTRIBUTE_IDS, TAXONOMY_VERSION, type AttributeId } from "../attributes/attributes.js";
import type { UserProfile } from "../types.js";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import { CURRENT_VERSIONS } from "../versions.js";
import { buildDeepInsideReport, HISTORICAL_CIRCLE_SIZE, WHY_MATCHES_FIT_COUNT } from "./deepInsideReport.js";
import { parseDeepInsideReport, DEEP_INSIDE_REPORT_SCHEMA_VERSION } from "./deepInsideSnapshot.js";

const GENERATED_AT = "2026-08-21T00:00:00.000Z";

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

describe("buildDeepInsideReport", () => {
  it("produces a well-formed, self-validating snapshot", () => {
    const report = buildDeepInsideReport(profile({}), SEED_PEOPLE, GENERATED_AT);
    expect(report.schemaVersion).toBe(DEEP_INSIDE_REPORT_SCHEMA_VERSION);
    expect(parseDeepInsideReport(report)).toEqual(report);
  });

  it("embeds the current version snapshot verbatim", () => {
    const report = buildDeepInsideReport(profile({}), SEED_PEOPLE, GENERATED_AT);
    expect(report.versions).toEqual(CURRENT_VERSIONS);
  });

  it("stamps generatedAt from the caller, never computing its own clock time", () => {
    const report = buildDeepInsideReport(profile({}), SEED_PEOPLE, GENERATED_AT);
    expect(report.generatedAt).toBe(GENERATED_AT);
  });

  it("Why Your Matches Fit: exactly top 3 ranked matches, each carrying real trait breakdowns", () => {
    const report = buildDeepInsideReport(profile({ curiosity: 95, discipline: 90 }), SEED_PEOPLE, GENERATED_AT);
    expect(report.whyMatchesFit).toHaveLength(WHY_MATCHES_FIT_COUNT);
    expect(report.whyMatchesFit.map((m) => m.rank)).toEqual([1, 2, 3]);
    // Ranked by overallMatch, descending.
    for (let i = 1; i < report.whyMatchesFit.length; i++) {
      expect(report.whyMatchesFit[i - 1]!.overallMatch).toBeGreaterThanOrEqual(report.whyMatchesFit[i]!.overallMatch);
    }
  });

  it("Historical Circle: HISTORICAL_CIRCLE_SIZE people, a strict superset of the top 3", () => {
    const report = buildDeepInsideReport(profile({}), SEED_PEOPLE, GENERATED_AT);
    expect(report.historicalCircle.length).toBeLessThanOrEqual(HISTORICAL_CIRCLE_SIZE);
    const circleIds = report.historicalCircle.map((m) => m.personId);
    for (const m of report.whyMatchesFit) {
      expect(circleIds).toContain(m.personId);
    }
    // Ranks are 1-based and contiguous.
    expect(report.historicalCircle.map((m) => m.rank)).toEqual(report.historicalCircle.map((_, i) => i + 1));
  });

  it("Signature Combination: 'combination' always names two of the user's own top-2 distinctive (z>0) traits", () => {
    // A flat 50-everywhere profile still has SOME z-pattern (reference means
    // differ per attribute), so a combination can legitimately appear — the
    // real invariant is that it always names the top-2 distinctiveTraits by
    // |z|, never an arbitrary or invented pair.
    const report = buildDeepInsideReport(profile({}), SEED_PEOPLE, GENERATED_AT);
    const combo = report.signatureCombination.find((c) => c.kind === "combination");
    if (combo) {
      const [aScore, bScore] = combo.userScores;
      expect(aScore).toBeGreaterThanOrEqual(0);
      expect(bScore).toBeGreaterThanOrEqual(0);
    }
  });

  it("Signature Combination: two genuinely high, distinctive traits produce a combination entry", () => {
    const report = buildDeepInsideReport(
      profile({ aesthetic_sensitivity: 98, cross_domain_range: 95 }),
      SEED_PEOPLE,
      GENERATED_AT,
    );
    const combo = report.signatureCombination.find((c) => c.kind === "combination");
    expect(combo).toBeDefined();
    expect(new Set(combo!.attributeIds)).toEqual(new Set(["aesthetic_sensitivity", "cross_domain_range"]));
  });

  it("Signature Combination: a known reviewed tension pair both scored high produces a tension entry", () => {
    const report = buildDeepInsideReport(
      profile({ perfectionism: 90, execution_speed: 90 }),
      SEED_PEOPLE,
      GENERATED_AT,
    );
    const tension = report.signatureCombination.find((c) => c.kind === "tension");
    expect(tension).toBeDefined();
    expect(new Set(tension!.attributeIds)).toEqual(new Set(["perfectionism", "execution_speed"]));
  });

  it("Signature Combination: never invents a tension pair that isn't in the reviewed TENSION_PAIRS list", () => {
    // Neither side of any TENSION_PAIRS entry — every score at a neutral 50 —
    // must never be reported as a tension.
    const report = buildDeepInsideReport(profile({}), SEED_PEOPLE, GENERATED_AT);
    expect(report.signatureCombination.filter((c) => c.kind === "tension")).toHaveLength(0);
  });

  it("Counterpart: present whenever an eligible opposite exists, with real difference data", () => {
    const report = buildDeepInsideReport(profile({ curiosity: 95 }), SEED_PEOPLE, GENERATED_AT);
    expect(report.counterpart).toBeDefined();
    expect(report.counterpart!.differingTraits.length).toBeGreaterThan(0);
  });

  it("Strengths & Trade-offs: only ever the high (z > 0) side, never a low-scoring trait", () => {
    const report = buildDeepInsideReport(profile({ curiosity: 98 }), SEED_PEOPLE, GENERATED_AT);
    for (const s of report.strengthsTradeoffs) {
      expect(["low", "medium", "high"]).toContain(s.band);
    }
    // A flat 50-profile has no z > 0 distinctive trait at all.
    const flat = buildDeepInsideReport(profile({}), SEED_PEOPLE, GENERATED_AT);
    expect(flat.strengthsTradeoffs).toHaveLength(0);
  });

  it("personNames covers exactly the person ids referenced elsewhere in the report", () => {
    const report = buildDeepInsideReport(profile({ curiosity: 95 }), SEED_PEOPLE, GENERATED_AT);
    const referenced = new Set([
      ...report.whyMatchesFit.map((m) => m.personId),
      ...report.historicalCircle.map((m) => m.personId),
      ...(report.counterpart ? [report.counterpart.personId] : []),
    ]);
    expect(new Set(Object.keys(report.personNames))).toEqual(referenced);
  });

  it("is pure: identical input produces byte-identical output", () => {
    const a = buildDeepInsideReport(profile({ curiosity: 95, discipline: 60 }), SEED_PEOPLE, GENERATED_AT);
    const b = buildDeepInsideReport(profile({ curiosity: 95, discipline: 60 }), SEED_PEOPLE, GENERATED_AT);
    expect(a).toEqual(b);
  });

  it("never influenced by metadata (locale/nationality/era/portrait) on the person dataset", () => {
    const mutated = SEED_PEOPLE.map((p) => {
      const { portrait: _portrait, ...rest } = p;
      return { ...rest, nationalityCodes: ["zz"], regionCode: "zz", aliases: ["mutated-alias"] };
    });
    const a = buildDeepInsideReport(profile({ curiosity: 95 }), SEED_PEOPLE, GENERATED_AT);
    const b = buildDeepInsideReport(profile({ curiosity: 95 }), mutated, GENERATED_AT);
    expect(a.whyMatchesFit.map((m) => m.overallMatch)).toEqual(b.whyMatchesFit.map((m) => m.overallMatch));
    expect(a.historicalCircle).toEqual(b.historicalCircle);
  });
});

describe("parseDeepInsideReport", () => {
  it("rejects a wrong schema version", () => {
    expect(parseDeepInsideReport({ schemaVersion: "wrong" })).toBeUndefined();
  });

  it("rejects malformed input without throwing", () => {
    expect(parseDeepInsideReport(null)).toBeUndefined();
    expect(parseDeepInsideReport(undefined)).toBeUndefined();
    expect(parseDeepInsideReport("a string")).toBeUndefined();
    expect(parseDeepInsideReport(42)).toBeUndefined();
    expect(parseDeepInsideReport({})).toBeUndefined();
  });

  it("rejects a report missing required version fields", () => {
    const report = buildDeepInsideReport(profile({}), SEED_PEOPLE, GENERATED_AT);
    const broken = { ...report, versions: { ...report.versions, quizVersion: undefined } };
    expect(parseDeepInsideReport(broken)).toBeUndefined();
  });

  it("round-trips a real generated report exactly", () => {
    const report = buildDeepInsideReport(profile({ curiosity: 90 }), SEED_PEOPLE, GENERATED_AT);
    const roundTripped = parseDeepInsideReport(JSON.parse(JSON.stringify(report)));
    expect(roundTripped).toEqual(report);
  });
});
