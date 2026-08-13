/**
 * RESULT SNAPSHOT — Phase 10C, Strategy A (immutable final result snapshot).
 *
 * The historical-fidelity design audit found that `/results` recomputes
 * live against the CURRENT quiz bank, taxonomy, reference table, dispersion
 * table, matching formula, calibration anchors, greatness formula,
 * archetype target-shrinkage, interpretation rules, AND the current person
 * roster — none of which are safe to re-run later and still call "the
 * result the user actually saw" once any of them has moved on. Rather than
 * build a historical-replay archive of every past code/data combination
 * (Strategy B, rejected — see the design audit), this snapshot stores the
 * already-computed, already-selected OUTPUT of one deterministic run: plain
 * numbers and stable person ids, never biography, never anything that
 * requires re-running a selection/scoring function to reproduce.
 *
 * `/account/results/[id]` must render EXCLUSIVELY from a parsed snapshot —
 * never fall through to a live recompute (that would defeat the entire
 * point: a "reopen" that quietly recalculates is exactly the silent-drift
 * failure mode this design exists to prevent). This module owns the type,
 * the schema-version tag, and a STRICT runtime validator — arbitrary JSONB
 * from the database is untrusted input, exactly like a URL query string,
 * and must never be assumed to already match this shape.
 *
 * Deliberately does NOT validate attribute/person ids against the CURRENT
 * taxonomy/roster: an old snapshot may legitimately reference an attribute
 * or person that a LATER taxonomy/roster revision removed. Validation here
 * checks SHAPE (is this well-formed `result_snapshot_v1` JSON), never
 * CONTENT currency — the renderer is responsible for the per-field "still
 * resolves against the live roster/taxonomy, or falls back gracefully"
 * question, not this parser.
 */
import type { AttributeId } from "../attributes/attributes.js";

export const RESULT_SNAPSHOT_SCHEMA_VERSION = "result_snapshot_v1";

export interface SnapshotTraitComparison {
  attributeId: AttributeId;
  userScore: number;
  personScore: number;
}

export interface SnapshotPersonMatch {
  personId: string;
  overallMatch: number;
}

export interface ResultSnapshotV1 {
  snapshotSchemaVersion: "result_snapshot_v1";
  /** The user's own full scored vector at completion time — needed to
   *  render the trait-profile highlights without re-deriving anything from
   *  a (possibly since-changed) reference table. `z` is pre-computed
   *  against `reference_v3`-as-of-save-time, frozen. */
  traits: Record<string, { score: number; confidence: number; z: number }>;
  /** Attribute ids, in original selection order — `distinctiveTraits`'s
   *  output at save time. */
  highlights: AttributeId[];
  // `field: T | undefined` (required, explicitly nullable) rather than
  // `field?: T` throughout this interface — the same idiom
  // `GreatnessResult.secondaryArchetypeId` already uses in greatness.ts,
  // required under this project's `exactOptionalPropertyTypes` setting to
  // assign `undefined` directly rather than conditionally spreading every
  // optional field at every construction site. Has no effect on the actual
  // stored JSON shape: `JSON.stringify`/Postgres jsonb already omit an
  // `undefined`-valued key exactly as an absent optional key would be.
  signature: { attributeId: AttributeId; score: number; confidence: number } | undefined;
  greatness: {
    score: number;
    rawScore: number;
    bandId: string;
    components: {
      archetypeAffinity: number;
      distinctiveness: number;
      coherence: number;
      engineTraits: number;
    };
    primaryArchetypeId: string;
    secondaryArchetypeId: string | undefined;
    dualEdged: { attributeId: AttributeId; score: number } | undefined;
  };
  resultArchetype: string | undefined;
  closest: (SnapshotPersonMatch & { explanationTrait: SnapshotTraitComparison | undefined }) | undefined;
  comparison: {
    closestTraits: SnapshotTraitComparison[];
    userHigherTraits: SnapshotTraitComparison[];
    personHigherTraits: SnapshotTraitComparison[];
    advantage: SnapshotTraitComparison[];
  };
  categoryMatches: { facet: string; personId: string; match: number }[];
  /**
   * Fallback display names (canonical/English, unlocalised) for every
   * person id referenced above, captured at save time. Used ONLY when a
   * person id no longer resolves against the live roster at render time
   * (removed, per a future `inclusion_v1`-style audit) — "the smallest
   * display fallback necessary so an old saved result does not become
   * unrenderable", not a substitute for live localisation in the normal
   * case where the person still exists.
   */
  personNames: Record<string, string>;
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}
function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

function isTraitComparison(v: unknown): v is SnapshotTraitComparison {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return isNonEmptyString(o.attributeId) && isFiniteNumber(o.userScore) && isFiniteNumber(o.personScore);
}

function isTraitComparisonArray(v: unknown): v is SnapshotTraitComparison[] {
  return Array.isArray(v) && v.every(isTraitComparison);
}

function isPersonMatch(v: unknown): v is SnapshotPersonMatch {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return isNonEmptyString(o.personId) && isFiniteNumber(o.overallMatch);
}

/**
 * Never throws — returns `undefined` for anything that doesn't strictly
 * match, the same convention `decodeResultToken`/`isPendingOwnResult`
 * already use throughout this codebase. The caller (the saved-result page)
 * is expected to render an explicit "not available" state on `undefined`,
 * never a partial/best-effort render of malformed data.
 */
export function parseResultSnapshot(value: unknown): ResultSnapshotV1 | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const o = value as Record<string, unknown>;

  if (o.snapshotSchemaVersion !== RESULT_SNAPSHOT_SCHEMA_VERSION) return undefined;

  if (typeof o.traits !== "object" || o.traits === null) return undefined;
  for (const t of Object.values(o.traits as Record<string, unknown>)) {
    if (typeof t !== "object" || t === null) return undefined;
    const to = t as Record<string, unknown>;
    if (!isFiniteNumber(to.score) || !isFiniteNumber(to.confidence) || !isFiniteNumber(to.z)) return undefined;
  }

  if (!Array.isArray(o.highlights) || !o.highlights.every((h) => isNonEmptyString(h))) return undefined;

  if (o.signature !== undefined) {
    if (typeof o.signature !== "object" || o.signature === null) return undefined;
    const s = o.signature as Record<string, unknown>;
    if (!isNonEmptyString(s.attributeId) || !isFiniteNumber(s.score) || !isFiniteNumber(s.confidence)) {
      return undefined;
    }
  }

  if (typeof o.greatness !== "object" || o.greatness === null) return undefined;
  const g = o.greatness as Record<string, unknown>;
  if (
    !isFiniteNumber(g.score) ||
    !isFiniteNumber(g.rawScore) ||
    !isNonEmptyString(g.bandId) ||
    !isNonEmptyString(g.primaryArchetypeId) ||
    typeof g.components !== "object" ||
    g.components === null
  ) {
    return undefined;
  }
  const gc = g.components as Record<string, unknown>;
  if (
    !isFiniteNumber(gc.archetypeAffinity) ||
    !isFiniteNumber(gc.distinctiveness) ||
    !isFiniteNumber(gc.coherence) ||
    !isFiniteNumber(gc.engineTraits)
  ) {
    return undefined;
  }
  if (g.secondaryArchetypeId !== undefined && !isNonEmptyString(g.secondaryArchetypeId)) return undefined;
  if (g.dualEdged !== undefined) {
    if (typeof g.dualEdged !== "object" || g.dualEdged === null) return undefined;
    const de = g.dualEdged as Record<string, unknown>;
    if (!isNonEmptyString(de.attributeId) || !isFiniteNumber(de.score)) return undefined;
  }

  if (o.resultArchetype !== undefined && !isNonEmptyString(o.resultArchetype)) return undefined;

  if (o.closest !== undefined) {
    if (!isPersonMatch(o.closest)) return undefined;
    const c = o.closest as unknown as Record<string, unknown>;
    if (c.explanationTrait !== undefined && !isTraitComparison(c.explanationTrait)) return undefined;
  }

  if (typeof o.comparison !== "object" || o.comparison === null) return undefined;
  const cmp = o.comparison as Record<string, unknown>;
  if (
    !isTraitComparisonArray(cmp.closestTraits) ||
    !isTraitComparisonArray(cmp.userHigherTraits) ||
    !isTraitComparisonArray(cmp.personHigherTraits) ||
    !isTraitComparisonArray(cmp.advantage)
  ) {
    return undefined;
  }

  if (!Array.isArray(o.categoryMatches)) return undefined;
  for (const cm of o.categoryMatches) {
    if (typeof cm !== "object" || cm === null) return undefined;
    const cmo = cm as Record<string, unknown>;
    if (!isNonEmptyString(cmo.facet) || !isNonEmptyString(cmo.personId) || !isFiniteNumber(cmo.match)) {
      return undefined;
    }
  }

  if (typeof o.personNames !== "object" || o.personNames === null) return undefined;
  for (const name of Object.values(o.personNames as Record<string, unknown>)) {
    if (typeof name !== "string") return undefined;
  }

  return value as ResultSnapshotV1;
}
