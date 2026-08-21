/**
 * DEEP INSIDE REPORT SNAPSHOT — Monetization v1, same "Strategy A" pattern
 * Phase 10C established for `ResultSnapshotV1` (`src/core/results/
 * snapshot.ts`): plain numbers and stable person ids only, computed once,
 * frozen forever after. Deep Inside is a SEPARATE snapshot rather than an
 * extension of `ResultSnapshotV1` because it depends on more of the roster
 * (a top-12 "Historical Circle", full per-person trait breakdowns for the
 * top 3 matches) than the free snapshot stores — reusing the same "compute
 * once, from `computeResultView`, then never recompute" discipline, applied
 * to a wider set of the same underlying, already-versioned computation.
 *
 * Embeds its OWN full `VersionSnapshot` (every field it declares) directly in the
 * JSON, rather than relying on `user_profiles`'s existing nine version
 * columns — those columns record provenance for the FREE snapshot at
 * completion time; the Deep Inside report is generated later (at purchase
 * or first-view time, potentially after the roster has grown), so it needs
 * its OWN, independently timestamped provenance record. This is a smaller,
 * simpler variant of the same reproducibility principle: a wide new DB
 * migration wasn't needed since the provenance travels inside the JSONB
 * blob itself, exactly like `snapshotSchemaVersion` already does.
 *
 * Never recomputed once written — `getOrCreateDeepInsideReport.ts` is the
 * ONLY place that ever calls `buildDeepInsideReport`, and only when no
 * snapshot exists yet for a given (user, result_token) pair. A purchased
 * report stays interpretable and reproducible after any future roster
 * expansion or algorithm change, exactly like the free result.
 */
import type { AttributeId } from "../attributes/attributes.js";
import type { VersionSnapshot } from "../versions.js";
import type { SnapshotTraitComparison } from "../results/snapshot.js";

export const DEEP_INSIDE_REPORT_SCHEMA_VERSION = "deep_inside_report_v1";

export interface DeepInsideMatchExplanation {
  personId: string;
  /** 1-based rank among match-eligible people. */
  rank: number;
  overallMatch: number;
  /** Traits where the user and this person align closely. */
  alignedTraits: SnapshotTraitComparison[];
  /** Traits with the largest meaningful gaps, either direction. */
  differingTraits: SnapshotTraitComparison[];
}

export interface DeepInsideCircleMember {
  personId: string;
  rank: number;
  overallMatch: number;
}

/** "combination": the user's own two strongest distinctive traits, both on
 *  the high side — presented together, not as two separate facts.
 *  "tension": one of `TENSION_PAIRS` (`greatness.ts`, the SAME reviewed
 *  list Greatness's own coherence component uses) where the user scores
 *  high on both sides — reusing already-reviewed data rather than
 *  inventing a new claim about which traits "should" pull against each
 *  other. */
export interface DeepInsideCombination {
  kind: "combination" | "tension";
  attributeIds: [AttributeId, AttributeId];
  userScores: [number, number];
}

export interface DeepInsideCounterpart {
  personId: string;
  overallMatch: number;
  /** The largest meaningful gaps between the user and this person. */
  differingTraits: SnapshotTraitComparison[];
  /** What the user still shares with their most distant match — the "even
   *  opposites share something" point. Empty, not omitted, when nothing
   *  qualifies. */
  sharedTraits: SnapshotTraitComparison[];
}

/** `band` is `bandForScore(score)` (`development.ts`) — the view resolves
 *  the actual `dev.{attributeId}.{band}.{experiment|caution}.*` copy via
 *  `t()` at render time, in whichever locale is active. No authored prose
 *  is ever baked into the snapshot itself, so this stays fully bilingual
 *  forever without needing to be regenerated. */
export interface DeepInsideStrengthTradeoff {
  attributeId: AttributeId;
  score: number;
  band: "low" | "medium" | "high";
}

export interface DeepInsideReportV1 {
  schemaVersion: "deep_inside_report_v1";
  versions: VersionSnapshot;
  generatedAt: string;
  whyMatchesFit: DeepInsideMatchExplanation[];
  historicalCircle: DeepInsideCircleMember[];
  signatureCombination: DeepInsideCombination[];
  counterpart: DeepInsideCounterpart | undefined;
  strengthsTradeoffs: DeepInsideStrengthTradeoff[];
  /** Same fallback-name mechanism as `ResultSnapshotV1.personNames` — used
   *  only when a referenced person id no longer resolves against the live
   *  roster at render time. */
  personNames: Record<string, string>;
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}
function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}
function isString(v: unknown): v is string {
  return typeof v === "string";
}

function isTraitComparison(v: unknown): v is SnapshotTraitComparison {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return isNonEmptyString(o.attributeId) && isFiniteNumber(o.userScore) && isFiniteNumber(o.personScore);
}
function isTraitComparisonArray(v: unknown): v is SnapshotTraitComparison[] {
  return Array.isArray(v) && v.every(isTraitComparison);
}

function isVersionSnapshot(v: unknown): v is VersionSnapshot {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  // Mirrors the exact field set of `VersionSnapshot` (`../versions.ts`) on
  // THIS branch — kept as an explicit list (not derived from the type,
  // which has no runtime representation) so it never silently drifts from
  // whatever `VersionSnapshot` actually declares.
  const fields = [
    "quizVersion",
    "scoringVersion",
    "taxonomyVersion",
    "referenceVersion",
    "dispersionVersion",
    "greatnessScoringVersion",
    "archetypesVersion",
    "matchingVersion",
    "calibrationVersion",
    "interpretationVersion",
  ];
  return fields.every((f) => isNonEmptyString(o[f]));
}

function isMatchExplanation(v: unknown): v is DeepInsideMatchExplanation {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    isNonEmptyString(o.personId) &&
    isFiniteNumber(o.rank) &&
    isFiniteNumber(o.overallMatch) &&
    isTraitComparisonArray(o.alignedTraits) &&
    isTraitComparisonArray(o.differingTraits)
  );
}

function isCircleMember(v: unknown): v is DeepInsideCircleMember {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return isNonEmptyString(o.personId) && isFiniteNumber(o.rank) && isFiniteNumber(o.overallMatch);
}

function isCombination(v: unknown): v is DeepInsideCombination {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  if (o.kind !== "combination" && o.kind !== "tension") return false;
  if (!Array.isArray(o.attributeIds) || o.attributeIds.length !== 2 || !o.attributeIds.every(isNonEmptyString)) {
    return false;
  }
  if (!Array.isArray(o.userScores) || o.userScores.length !== 2 || !o.userScores.every(isFiniteNumber)) {
    return false;
  }
  return true;
}

function isCounterpart(v: unknown): v is DeepInsideCounterpart {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    isNonEmptyString(o.personId) &&
    isFiniteNumber(o.overallMatch) &&
    isTraitComparisonArray(o.differingTraits) &&
    isTraitComparisonArray(o.sharedTraits)
  );
}

function isStrengthTradeoff(v: unknown): v is DeepInsideStrengthTradeoff {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    isNonEmptyString(o.attributeId) &&
    isFiniteNumber(o.score) &&
    (o.band === "low" || o.band === "medium" || o.band === "high")
  );
}

/**
 * Never throws — returns `undefined` for anything that doesn't strictly
 * match, the same convention `parseResultSnapshot`/`decodeResultToken`
 * already use throughout this codebase. Deliberately does NOT validate
 * attribute/person ids against the CURRENT taxonomy/roster — shape only,
 * exactly like `parseResultSnapshot`'s own doc comment explains.
 */
export function parseDeepInsideReport(value: unknown): DeepInsideReportV1 | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const o = value as Record<string, unknown>;

  if (o.schemaVersion !== DEEP_INSIDE_REPORT_SCHEMA_VERSION) return undefined;
  if (!isVersionSnapshot(o.versions)) return undefined;
  if (!isString(o.generatedAt)) return undefined;

  if (!Array.isArray(o.whyMatchesFit) || !o.whyMatchesFit.every(isMatchExplanation)) return undefined;
  if (!Array.isArray(o.historicalCircle) || !o.historicalCircle.every(isCircleMember)) return undefined;
  if (!Array.isArray(o.signatureCombination) || !o.signatureCombination.every(isCombination)) return undefined;

  if (o.counterpart !== undefined && !isCounterpart(o.counterpart)) return undefined;

  if (!Array.isArray(o.strengthsTradeoffs) || !o.strengthsTradeoffs.every(isStrengthTradeoff)) return undefined;

  if (typeof o.personNames !== "object" || o.personNames === null) return undefined;
  for (const name of Object.values(o.personNames as Record<string, unknown>)) {
    if (typeof name !== "string") return undefined;
  }

  return value as DeepInsideReportV1;
}
