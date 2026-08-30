/**
 * PERSON-SPECIFIC TRAIT EXPLANATION — trait_explanation_v1
 *
 * Profile Trait Explanation UX (product spec: trait click/tap -> explanation
 * popover/sheet). Finds, for a given person and attribute, the existing
 * editorial item — achievement / moment / turning point / complexity — that
 * already ties that specific trait to a concrete episode via its
 * `attributeId` + `interpretationKey` fields (`PersonEditorialItem`,
 * `docs/editorial-content.md`).
 *
 * Deliberately NOT a new content store: every string this can possibly
 * surface already exists in `PERSON_EDITORIAL`/`EDITORIAL_EN`/`EDITORIAL_KO`,
 * authored under the Editorial Writing Standard (calibrated language, no
 * diagnostic claims, no unsupported causality). This module only SELECTS
 * which existing item to show, one per attribute — it never generates or
 * paraphrases text, and it never infers anything from the score itself. If
 * no item ties this attribute to a concrete episode, the caller gets
 * `undefined` and the explanation UI falls back to the generic
 * definition + score + band only (see `traitScoreBands.ts`).
 *
 * Category order (achievements -> moments -> turning points ->
 * complexities) is an arbitrary but STABLE tie-break for the rare case where
 * more than one item on the same profile references the same attribute —
 * not a claim that achievements are more evidentially important.
 */
import type { AttributeId } from "../attributes/attributes.js";
import type { Person, PersonEditorialItem } from "../types.js";

const CATEGORY_ORDER = ["achievements", "moments", "turningPoints", "complexities"] as const;

/**
 * The first editorial item on this person's profile whose `attributeId`
 * matches and which carries an `interpretationKey` — i.e. an item with
 * person-specific interpretive text actually attached, not just a fact.
 * Returns `undefined` when no such item exists (a normal, expected outcome
 * for most attribute/person pairs, not an error).
 */
export function personTraitExplanationItem(
  person: Person,
  attributeId: AttributeId,
): PersonEditorialItem | undefined {
  const editorial = person.editorial;
  if (!editorial) return undefined;
  for (const category of CATEGORY_ORDER) {
    const items = editorial[category];
    if (!items) continue;
    const match = items.find((item) => item.attributeId === attributeId && item.interpretationKey);
    if (match) return match;
  }
  return undefined;
}
