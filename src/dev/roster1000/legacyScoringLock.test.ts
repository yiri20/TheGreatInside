import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import type { Person } from "../../core/types.js";
import { checkLegacyScoringLock } from "./checkScoringLockIntegrity.js";
import { LEGACY_SCORING_BASELINE, type LegacyRowFingerprint } from "./audits/legacyScoringLock.generated.js";
import { hasCandidateFile } from "./audits/matchPoolIntegrityAudit.js";

function fakePerson(overrides: Partial<Person> & { slug: string; attributes: Person["attributes"] }): Person {
  return {
    id: `p_${overrides.slug}`,
    canonicalName: overrides.slug,
    aliases: [],
    isLiving: false,
    era: "20th_century",
    nationalityCodes: [],
    regionCode: "western_europe",
    occupationIds: [],
    fieldIds: [],
    impactDomains: [],
    tagIds: [],
    archetypeIds: [],
    status: "published",
    isMatchEligible: false,
    isDirectoryVisible: true,
    overallProfileConfidence: 0.5,
    sources: [],
    doNotCopyKeys: [],
    ...overrides,
  } as Person;
}

const ROW: Person["attributes"][number] = {
  attributeId: "curiosity",
  score: 80,
  confidence: 0.6,
  evidenceType: "strong_inference",
  impact: "advantage",
  sourceIds: [],
};

function baselineRow(overrides: Partial<LegacyRowFingerprint> = {}): LegacyRowFingerprint {
  const { attributeId, score, confidence, evidenceType, impact } = ROW;
  return { attributeId, score, confidence, evidenceType, impact, ...overrides };
}

describe("legacy scoring lock: coverage of the real baseline", () => {
  it("covers every current production person lacking a candidate JSON file", () => {
    const noJsonSlugs = SEED_PEOPLE.filter((p) => !hasCandidateFile(p.slug)).map((p) => p.slug).sort();
    const baselineSlugs = Object.keys(LEGACY_SCORING_BASELINE).sort();
    expect(baselineSlugs).toEqual(noJsonSlugs);
  });

  it("has no duplicate slugs", () => {
    const slugs = Object.keys(LEGACY_SCORING_BASELINE);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has no orphan baseline slugs (every baseline slug exists in current SEED_PEOPLE)", () => {
    const violations = checkLegacyScoringLock();
    expect(violations.filter((v) => v.kind === "missing_from_production")).toEqual([]);
  });

  it("attribute sets match exactly for every covered person (no drift against itself)", () => {
    expect(checkLegacyScoringLock()).toEqual([]);
  });

  it("the real baseline generator's output is internally well-formed (every entry has all 5 fields)", () => {
    for (const rows of Object.values(LEGACY_SCORING_BASELINE)) {
      for (const r of rows) {
        expect(r.attributeId).toBeTruthy();
        expect(typeof r.score).toBe("number");
        expect(typeof r.confidence).toBe("number");
        expect(typeof r.evidenceType).toBe("string");
        expect(typeof r.impact).toBe("string");
      }
    }
  });
});

describe("legacy scoring lock: drift detection (synthetic baseline/person, real data untouched)", () => {
  it("detects score drift", () => {
    const baseline = { x: [baselineRow()] };
    const current = [fakePerson({ slug: "x", attributes: [{ ...ROW, score: 55, sourceIds: [] }] })];
    const violations = checkLegacyScoringLock(baseline, current);
    expect(violations).toEqual([{ slug: "x", kind: "row_drifted", detail: "curiosity: score 80->55" }]);
  });

  it("detects confidence drift", () => {
    const baseline = { x: [baselineRow()] };
    const current = [fakePerson({ slug: "x", attributes: [{ ...ROW, confidence: 0.9, sourceIds: [] }] })];
    const violations = checkLegacyScoringLock(baseline, current);
    expect(violations).toEqual([{ slug: "x", kind: "row_drifted", detail: "curiosity: confidence 0.6->0.9" }]);
  });

  it("detects evidenceType drift", () => {
    const baseline = { x: [baselineRow()] };
    const current = [fakePerson({ slug: "x", attributes: [{ ...ROW, evidenceType: "documented", sourceIds: [] }] })];
    const violations = checkLegacyScoringLock(baseline, current);
    expect(violations).toEqual([{ slug: "x", kind: "row_drifted", detail: "curiosity: evidenceType strong_inference->documented" }]);
  });

  it("detects impact drift", () => {
    const baseline = { x: [baselineRow()] };
    const current = [fakePerson({ slug: "x", attributes: [{ ...ROW, impact: "risk", sourceIds: [] }] })];
    const violations = checkLegacyScoringLock(baseline, current);
    expect(violations).toEqual([{ slug: "x", kind: "row_drifted", detail: "curiosity: impact advantage->risk" }]);
  });

  it("detects a removed row (in baseline, gone from production)", () => {
    const baseline = { x: [baselineRow()] };
    const current = [fakePerson({ slug: "x", attributes: [] })];
    const violations = checkLegacyScoringLock(baseline, current);
    expect(violations).toEqual([{ slug: "x", kind: "row_removed", detail: "curiosity present in baseline, absent from production" }]);
  });

  it("detects an added row (in production, absent from baseline)", () => {
    const baseline = { x: [baselineRow()] };
    const current = [
      fakePerson({ slug: "x", attributes: [{ ...ROW, sourceIds: [] }, { ...ROW, attributeId: "discipline", sourceIds: [] }] }),
    ];
    const violations = checkLegacyScoringLock(baseline, current);
    expect(violations).toEqual([{ slug: "x", kind: "row_added", detail: "discipline present in production, absent from baseline" }]);
  });

  it("flags a baseline slug that no longer exists in production", () => {
    const baseline = { ghost: [baselineRow()] };
    const violations = checkLegacyScoringLock(baseline, []);
    expect(violations).toEqual([{ slug: "ghost", kind: "missing_from_production", detail: "baseline slug no longer exists in SEED_PEOPLE" }]);
  });

  it("reports zero violations when baseline and production agree exactly", () => {
    const baseline = { x: [baselineRow()] };
    const current = [fakePerson({ slug: "x", attributes: [{ ...ROW, sourceIds: [] }] })];
    expect(checkLegacyScoringLock(baseline, current)).toEqual([]);
  });
});

describe("legacy scoring lock: read-only", () => {
  it("never mutates SEED_PEOPLE or the real baseline", () => {
    const peopleBefore = JSON.stringify(SEED_PEOPLE);
    const baselineBefore = JSON.stringify(LEGACY_SCORING_BASELINE);
    checkLegacyScoringLock();
    checkLegacyScoringLock({ x: [baselineRow()] }, [fakePerson({ slug: "x", attributes: [{ ...ROW, sourceIds: [] }] })]);
    expect(JSON.stringify(SEED_PEOPLE)).toBe(peopleBefore);
    expect(JSON.stringify(LEGACY_SCORING_BASELINE)).toBe(baselineBefore);
  });
});
