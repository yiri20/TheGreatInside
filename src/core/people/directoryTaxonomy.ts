/**
 * PEOPLE DIRECTORY TAXONOMY — directory_taxonomy_v1
 *
 * Centralizes what the People Directory's filter UI shows and how each
 * filter chip maps to underlying `Person` data. Written after a mechanical
 * audit of the pre-existing filter system (2026-08): the only detailed
 * filter control before this module was a flat `tagIds` checklist mixing
 * profession-like tags (`founder`, `strategist`), personality-like tags
 * (`self_taught`, `nonconformist`, `perfectionist`), reputation tags
 * (`nobel_laureate`, `prolific`), and circumstance tags
 * (`overcame_adversity`, `endured_imprisonment`) in one undifferentiated
 * list — conceptually clean at the level of "things worth knowing about a
 * person," but not structured as "explore by profession" vs. "explore by
 * personality," which is what this taxonomy adds. `tagIds` itself is
 * untouched (still full EN/KO coverage, still feeds search) — this module
 * does not replace it, it replaces what the Directory's FILTER UI is built
 * from.
 *
 * TWO AXES, DELIBERATELY FROM TWO DIFFERENT EXISTING DATA SOURCES:
 *
 * 1. PROFESSION / ACTIVITY — built from `Person.fieldIds`, not
 *    `occupationIds` or `tagIds`. `fieldIds` (`src/core/types.ts`) is
 *    already the broader "domain of activity" vocabulary (`philosophy`,
 *    `natural_science`, `politics`, `business`, ...) that sits one level
 *    above the specific job-title granularity of `occupationIds`
 *    (`writer`, `mathematician`, ...) — the right level for a handful of
 *    scannable category rows. It had ZERO EN/KO labels and no filter UI
 *    before this module (`explorer.ts`'s docstring explicitly called it
 *    "search/filter-only data... deliberately excluded" from the coverage
 *    guard pattern the way `tagIds`/`occupationIds` already had). Adding
 *    real labels + grouping here, and `field.*` message keys in
 *    `src/core/i18n/{en,ko}.ts`, is what turns it into a real filter axis.
 *
 * 2. PERSONALITY / TRAIT — built from the EXISTING canonical 34-attribute /
 *    7-facet taxonomy (`taxonomy_v1.1`, `src/core/attributes/attributes.ts`)
 *    that every person is already scored against. This is a hard product
 *    requirement (CLAUDE.md "Data principle": "Directory filtering may
 *    organize existing personality data; it must not create a second
 *    personality model") — so this module does NOT invent new trait labels
 *    or thresholds from scratch. "Person exhibits trait X" reuses the EXACT
 *    z-score-against-`reference_v3` + `confidence >= 0.5` convention already
 *    established twice in this codebase for the same "is this trait
 *    characteristic of this person" question — `signatureTrait`/
 *    `distinctiveTraits` (`interpretation/rules.ts`) and `traitConstellation`
 *    (`interpretation/constellation.ts`, `CONSTELLATION_CONFIG.minConfidence
 *    = 0.5`). See `DIRECTORY_TRAIT_MIN_Z`/`DIRECTORY_TRAIT_MIN_CONFIDENCE`.
 *
 * CURATION RULE (why only a subset of 41 fieldIds / 34 attributes are
 * exposed as chips, not all of them):
 *
 * - Profession/Activity: a `fieldIds` value is only surfaced as a filter
 *   chip if at least 2 people in the roster carry it. 18 of the 41 distinct
 *   values used in the roster occur for exactly 1 person — a filter chip
 *   that can only ever match one result doesn't help someone EXPLORE a
 *   95-person roster (that person is already reachable by name/occupation
 *   search), and 41 chips would blow well past Part H's "compact, not
 *   enormous" bar. This is a UI-curation threshold, not a data change —
 *   `fieldIds` itself is untouched, and the excluded values still work for
 *   search (`explorer.ts`'s `personSearchHaystack` includes all of
 *   `fieldIds`, not just the curated subset).
 * - Personality/Trait: an attribute is only surfaced as a filter chip if,
 *   against the LIVE roster, the z>=1.0 & confidence>=0.5 test yields
 *   between 10% and 60% of match-eligible people (`MIN_QUALIFYING_SHARE`/
 *   `MAX_QUALIFYING_SHARE`) with at least `MIN_CONFIDENT_N` confidently-
 *   scored people to test against. This roster is 95 people already
 *   selected for extraordinary achievement, so several attributes
 *   (`independent_thinking` ~91%, `persistence` ~89%, `discipline` ~73%,
 *   `proactive_agency` ~72%) are near-universal in it — a filter chip
 *   nearly everyone matches has no discriminating value for exploration,
 *   the same reasoning as the fieldIds floor above, just applied to a
 *   ceiling instead. `belief_updating` (confident_n 18) is excluded for
 *   being too sparsely scored across the roster to trust as a browsable
 *   filter. This selection is verified live against `SEED_PEOPLE`, not
 *   hand-maintained, by `directoryTaxonomy.test.ts` — a roster change that
 *   pushes a currently-excluded attribute into the qualifying band, or a
 *   currently-included one out of it, is caught there, not silently stale.
 *
 * NEITHER AXIS TOUCHES MATCHING/SCORING. Both read already-computed,
 * already-frozen data (`fieldIds`, `PersonAttribute.score`/`.confidence`,
 * `ATTRIBUTES` reference constants) and derive a browsing label from it;
 * nothing here is written back to `Person`, and nothing here is a new
 * scored dimension.
 */

import { ATTRIBUTES, FACETS, type AttributeId, type Facet } from "../attributes/attributes.js";
import type { MessageKey } from "../i18n/en.js";
import type { Person } from "../types.js";

export const DIRECTORY_TAXONOMY_VERSION = "directory_taxonomy_v1";

/* ============================================================ profession */

export type ProfessionCategoryId =
  | "science_knowledge"
  | "arts_culture"
  | "leadership_society"
  | "building_discovery";

export interface ProfessionCategory {
  id: ProfessionCategoryId;
  labelKey: MessageKey;
  /** `Person.fieldIds` values grouped under this category, ordered by how
   *  common each is in the live roster (most common first) at authoring
   *  time — see the module doc comment for the >=2-people curation rule. */
  fieldIds: readonly string[];
}

/**
 * Derived from a live audit of `SEED_PEOPLE.fieldIds` (2026-08). Every
 * fieldId below occurs for >=2 people in the roster; every fieldId used by
 * only 1 person is deliberately omitted (see module doc). Categories follow
 * the roster's actual shape, not a predetermined symmetry — "Building &
 * Discovery" has fewer members than "Science & Knowledge" because that's
 * what the 95-person dataset actually contains.
 */
export const PROFESSION_CATEGORIES: readonly ProfessionCategory[] = [
  {
    id: "science_knowledge",
    labelKey: "people.directory.profession_category.science_knowledge",
    fieldIds: ["philosophy", "natural_science", "mathematics", "physics", "engineering", "medicine", "environmental_science"],
  },
  {
    id: "arts_culture",
    labelKey: "people.directory.profession_category.arts_culture",
    fieldIds: ["literature", "music", "art", "film", "design"],
  },
  {
    id: "leadership_society",
    labelKey: "people.directory.profession_category.leadership_society",
    fieldIds: ["politics", "civil_rights", "military", "education", "law", "social_reform"],
  },
  {
    id: "building_discovery",
    labelKey: "people.directory.profession_category.building_discovery",
    fieldIds: ["business", "technology", "computing", "sport", "exploration"],
  },
];

/** Every fieldId this taxonomy surfaces as a filter chip, in display order. */
export const DIRECTORY_FIELD_IDS: readonly string[] = PROFESSION_CATEGORIES.flatMap((c) => c.fieldIds);

/**
 * `field.*` EN/KO coverage guard, scoped to the curated set this taxonomy
 * actually renders — deliberately NOT "every fieldId used anywhere in the
 * roster" the way `missingTagCoverage`/`missingOccupationCoverage`
 * (`explorer.ts`) check their vocabularies, because 18 of the roster's 41
 * fieldId values are intentionally never rendered (see module doc's
 * curation rule) and authoring translations for text that's never shown
 * would be dead content, not coverage.
 */
export function missingProfessionFieldCoverage(
  en: Readonly<Partial<Record<string, string>>>,
  ko: Readonly<Partial<Record<string, string>>>,
): string[] {
  return DIRECTORY_FIELD_IDS.filter((id) => en[`field.${id}`] === undefined || ko[`field.${id}`] === undefined).sort();
}

/* ============================================================ personality */

export const DIRECTORY_TRAIT_MIN_Z = 1.0;
export const DIRECTORY_TRAIT_MIN_CONFIDENCE = 0.5;
/** Curation band applied when selecting which attributes qualify as chips —
 *  see module doc's "Personality/Trait" curation rule. */
export const MIN_QUALIFYING_SHARE = 0.1;
export const MAX_QUALIFYING_SHARE = 0.6;
export const MIN_CONFIDENT_N = 20;

export interface PersonalityGroup {
  facet: Facet;
  labelKey: MessageKey;
  /** Curated `AttributeId`s from this facet — see module doc. Ordered by
   *  qualifying-share at authoring time (most selective/rare first). */
  attributeIds: readonly AttributeId[];
}

/**
 * Curated per the live-roster band test in the module doc comment
 * (verified by `directoryTaxonomy.test.ts`, not hand-trusted). Excluded
 * from all 34: `independent_thinking`, `persistence`, `discipline`,
 * `proactive_agency` (all >60% of match-eligible people — near-universal in
 * this roster of extraordinary achievers, so not discriminating as a
 * filter) and `belief_updating` (confident_n 18, below the 20-person floor).
 */
export const PERSONALITY_TAXONOMY: readonly PersonalityGroup[] = [
  {
    facet: "thinking",
    labelKey: "facet.thinking",
    attributeIds: ["curiosity", "analytical_rigor", "intuitive_synthesis", "systems_abstraction"],
  },
  {
    facet: "creativity",
    labelKey: "facet.creativity",
    attributeIds: ["experimentation", "cross_domain_range", "aesthetic_sensitivity"],
  },
  {
    facet: "work_style",
    labelKey: "facet.work_style",
    attributeIds: ["detail_orientation", "perfectionism", "execution_speed", "planning_orientation"],
  },
  {
    facet: "resilience",
    labelKey: "facet.resilience",
    attributeIds: ["adaptability", "ambiguity_tolerance", "decisiveness"],
  },
  {
    facet: "social",
    labelKey: "facet.social",
    attributeIds: ["social_assertiveness", "collaboration", "leadership_drive"],
  },
  {
    facet: "motivation",
    labelKey: "facet.motivation",
    attributeIds: ["mastery_orientation", "achievement_drive", "competitiveness", "autonomy_need"],
  },
  {
    facet: "world_sense",
    labelKey: "facet.world_sense",
    attributeIds: ["opportunity_sensing", "resourcefulness"],
  },
];

/** Every AttributeId this taxonomy surfaces as a filter chip, in facet order
 *  (matches `FACETS`, `attributes.ts`). */
export const DIRECTORY_TRAIT_ATTRIBUTE_IDS: readonly AttributeId[] = PERSONALITY_TAXONOMY.flatMap(
  (g) => g.attributeIds,
);

/** Pure: does this person's own scored data put them >= the curated
 *  z/confidence bar for `attributeId`? Same rule as `signatureTrait`
 *  (`interpretation/rules.ts`) and `traitConstellation`
 *  (`interpretation/constellation.ts`) apply for "is this trait
 *  characteristic of this person" — no new statistical model introduced. */
export function personExhibitsTrait(
  person: Pick<Person, "attributes">,
  attributeId: AttributeId,
): boolean {
  const attr = person.attributes.find((a) => a.attributeId === attributeId);
  if (!attr || attr.confidence < DIRECTORY_TRAIT_MIN_CONFIDENCE) return false;
  const ref = ATTRIBUTES[attributeId].reference;
  return (attr.score - ref.mean) / ref.sd >= DIRECTORY_TRAIT_MIN_Z;
}

/**
 * Recomputes, live against whatever roster is passed in, the qualifying
 * share (fraction of match-eligible people exhibiting the trait) and
 * confidently-scored count for one attribute — the exact test used to
 * decide `PERSONALITY_TAXONOMY`'s membership. Exported so
 * `directoryTaxonomy.test.ts` can independently re-derive "is this
 * curation still valid" against the live roster rather than mirroring the
 * constants back at themselves.
 */
export function traitQualification(
  people: readonly Person[],
  attributeId: AttributeId,
): { qualifyingShare: number; confidentN: number } {
  const eligible = people.filter((p) => p.isMatchEligible);
  let confidentN = 0;
  let qualifying = 0;
  for (const person of eligible) {
    const attr = person.attributes.find((a) => a.attributeId === attributeId);
    if (!attr || attr.confidence < DIRECTORY_TRAIT_MIN_CONFIDENCE) continue;
    confidentN++;
    if (personExhibitsTrait(person, attributeId)) qualifying++;
  }
  return { qualifyingShare: eligible.length > 0 ? qualifying / eligible.length : 0, confidentN };
}

export { FACETS };
