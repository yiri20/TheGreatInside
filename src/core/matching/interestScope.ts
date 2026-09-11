/**
 * INTEREST-AREA VIEWING PREFERENCE.
 *
 * A user may optionally choose a broad interest area (the existing
 * `ProfessionCategoryId` taxonomy, `people/directoryTaxonomy.ts`) to see
 * who they match within that field first. This is a VIEWING/SURFACING
 * preference only — it is never an input into personality similarity.
 * Selecting a category cannot add a score bonus, apply a penalty, change
 * raw similarity, calibrated match %, trait scores, greatness, confidence,
 * or eligibility, and it never changes the global ranking.
 *
 * The model: `results.ranked` (`matching/selectors.ts`'s `ResultSet`) is
 * already the honest, match-eligible-only, fully-ranked list. This module
 * only chooses which already-ranked entry to surface first when a category
 * is selected — the exact same "select, don't re-score" rule every other
 * function in `selectors.ts` follows (see that file's own doc comment).
 * No new similarity calculation, no new calibration call, no alternate
 * matching version.
 */
import { PROFESSION_CATEGORIES, type ProfessionCategoryId } from "../people/directoryTaxonomy.js";
import type { RankedMatch } from "./similarity.js";

export type InterestScope = ProfessionCategoryId | "all";

const VALID_SCOPE_IDS: ReadonlySet<string> = new Set(PROFESSION_CATEGORIES.map((c) => c.id));

/**
 * Parses a raw scope value (URL query param, stored quiz-draft field) into
 * a valid `InterestScope`. Missing or unrecognized values safely default to
 * `"all"` — never an error, never a 404, since this is a viewing preference
 * layered on top of the actual quiz result, not a required input.
 */
export function parseInterestScope(raw: string | undefined | null): InterestScope {
  return raw !== undefined && raw !== null && VALID_SCOPE_IDS.has(raw) ? (raw as ProfessionCategoryId) : "all";
}

/**
 * Walks `ranked` (already honest, already match-eligible-only, already in
 * rank order) and returns the first person whose `fieldIds` intersects the
 * selected category's `fieldIds` — the highest-ranked person in that
 * subset. Returns `undefined` for `scope: "all"` (callers should use the
 * existing global closest match instead) or when no ranked person belongs
 * to the category. The returned `RankedMatch` is exactly the entry already
 * present in `ranked` — same `overallMatch`, same `closestTraits`, same
 * everything; this function only chooses WHICH existing entry to surface,
 * it never recomputes one.
 */
export function selectInterestMatch(
  ranked: readonly RankedMatch[],
  scope: InterestScope,
): RankedMatch | undefined {
  if (scope === "all") return undefined;
  const category = PROFESSION_CATEGORIES.find((c) => c.id === scope);
  if (!category) return undefined;
  const fieldSet = new Set(category.fieldIds);
  return ranked.find((m) => m.person.fieldIds.some((f) => fieldSet.has(f)));
}
