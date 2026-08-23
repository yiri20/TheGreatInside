/**
 * PEOPLE EXPLORER — explorer_v1
 *
 * Pure search, filter and sort over the canonical `Person[]` dataset. No I/O,
 * no React, no randomness — this runs identically whether it backs a static
 * directory page today or a paginated database query later.
 *
 * SCOPE NOTE: search matches `canonicalName`, `tagIds`, `occupationIds` and
 * `fieldIds` only. Alias / native-script / romanised-name search (item 46 of
 * the product spec — "이순신" / "Yi Sun-sin" / "李舜臣" resolving to one
 * entity) belongs to `person_translations.aliases` in the DB layer
 * (db/schema.sql) and is Phase 8 work; this module has no localised name data
 * to search yet.
 *
 * FACETING RULE: values *within* one filter field are OR'd (era: ["ancient",
 * "medieval"] means either), values *across* fields are AND'd (era AND
 * region AND ...) — the standard faceted-search convention and what "allow
 * multi-filter" means in the product spec.
 *
 * This module intentionally does not hardcode named presets ("Highly
 * Curious", "Perfectionists", "Self-taught") — those are UI-level
 * compositions of `minAttributeScores` / `attributeImpacts` / `tagIds` and
 * belong with the presentation layer, not the core selector.
 */

import { ATTRIBUTES, type AttributeId } from "../attributes/attributes.js";
import { IMPACT_DOMAINS, type Era, type ImpactDomain, type Person, type TraitImpact } from "../types.js";
import { en } from "../i18n/en.js";
import { ko } from "../i18n/ko.js";
import type { MessageKey } from "../i18n/en.js";

export const EXPLORER_VERSION = "explorer_v1";

/**
 * Structural subset of `Person` — exactly the fields this module's search/
 * filter/sort logic reads, nothing else (no `sources`, `doNotCopyKeys`,
 * explanation keys, `externalIdentity`, ...). Roster-scale note (2026-08,
 * see `src/data/people/personIndex.ts`): a full `Person` already satisfies
 * this interface (it's a strict superset), so this change is purely
 * additive — every existing caller passing `Person[]`/`SEED_PEOPLE`
 * continues to typecheck and behave identically. It exists so a CLIENT
 * component can instead pass the much smaller generated `PersonIndexEntry[]`
 * (see `personIndex.ts`) without this module ever importing or depending on
 * that narrower type — `explorer.ts` stays the single source of truth for
 * search/filter/sort logic regardless of which shape calls it.
 */
export interface ExplorablePerson {
  id: string;
  slug: string;
  canonicalName: string;
  aliases: string[];
  birthYear?: number;
  deathYear?: number;
  isLiving: boolean;
  era: Era;
  regionCode: string;
  occupationIds: string[];
  fieldIds: string[];
  impactDomains: ImpactDomain[];
  tagIds: string[];
  archetypeIds: string[];
  isMatchEligible: boolean;
  overallProfileConfidence: number;
  attributes: { attributeId: AttributeId; score: number; confidence: number; impact: TraitImpact }[];
}

/* ------------------------------------------------------------------ search */

function normalise(text: string): string {
  return text.toLowerCase().trim();
}

function personSearchHaystack(person: ExplorablePerson): string {
  return normalise(
    [
      person.canonicalName,
      // Alternate names/spellings/native-script forms — e.g. "이순신" should
      // find Yi Sun-sin regardless of the current UI locale, per product spec
      // item 46. `aliases` is presentation/search metadata; it never touches
      // matching (see the "metadata must never influence matching" tests).
      ...person.aliases,
      ...person.tagIds.map((t) => t.replace(/_/g, " ")),
      ...person.occupationIds.map((o) => o.replace(/_/g, " ")),
      ...person.fieldIds.map((f) => f.replace(/_/g, " ")),
    ].join(" · "),
  );
}

/** Case-insensitive substring search. Empty/whitespace query matches everyone. */
export function searchPeople<T extends ExplorablePerson>(people: readonly T[], query: string): T[] {
  const q = normalise(query);
  if (q === "") return [...people];
  return people.filter((p) => personSearchHaystack(p).includes(q));
}

/* ----------------------------------------------------------------- filter */

export interface PeopleFilter {
  eras?: readonly Era[];
  regionCodes?: readonly string[];
  occupationIds?: readonly string[];
  fieldIds?: readonly string[];
  tagIds?: readonly string[];
  impactDomains?: readonly ImpactDomain[];
  archetypeIds?: readonly string[];
  isLiving?: boolean;
  /** Excludes profiles the matching engine would exclude. Default true: the
   *  explorer's filter controls describe matchable people by default, but
   *  under-evidenced profiles stay independently browsable via search. */
  matchEligibleOnly?: boolean;
  /** e.g. { curiosity: 80 } => curiosity score >= 80. All keys AND'd. */
  minAttributeScores?: Readonly<Partial<Record<AttributeId, number>>>;
  /** e.g. { perfectionism: "dual_edged" }. All keys AND'd. Attribute must be
   *  scored with that exact impact for this specific person — impact is
   *  never global, so this filter is inherently person x attribute. */
  attributeImpacts?: Readonly<Partial<Record<AttributeId, TraitImpact>>>;
  /** OR semantics across `attributeIds` (unlike `minAttributeScores`, which
   *  ANDs): a person passes if they clear `minZ` standard deviations above
   *  `reference_v3`'s mean, with confidence >= `minConfidence`, on ANY ONE
   *  of the listed attributes. This is the general-purpose primitive the
   *  People Directory's Personality/Trait filter chips are built from
   *  (`src/core/people/directoryTaxonomy.ts` decides WHICH attributes are
   *  exposed as chips and with what labels; this module only knows how to
   *  evaluate the query, deliberately staying unaware of "directory"
   *  concerns — see explorer.ts's own module doc on not hardcoding named
   *  presets). Selecting multiple trait chips is "match any of these",
   *  mirroring how multiple `tagIds` selections already OR via `intersects`. */
  traitScoreAny?: {
    attributeIds: readonly AttributeId[];
    minZ: number;
    minConfidence: number;
  };
}

function intersects<T>(values: readonly T[] | undefined, has: (value: T) => boolean): boolean {
  if (!values || values.length === 0) return true;
  return values.some(has);
}

function passesAttributeFilters(person: ExplorablePerson, filter: PeopleFilter): boolean {
  const byId = new Map(person.attributes.map((a) => [a.attributeId, a]));

  if (filter.minAttributeScores) {
    for (const [attributeId, min] of Object.entries(filter.minAttributeScores)) {
      const attr = byId.get(attributeId as AttributeId);
      if (!attr || attr.score < (min as number)) return false;
    }
  }
  if (filter.attributeImpacts) {
    for (const [attributeId, impact] of Object.entries(filter.attributeImpacts)) {
      const attr = byId.get(attributeId as AttributeId);
      if (!attr || attr.impact !== impact) return false;
    }
  }
  return true;
}

function passesTraitScoreAny(person: ExplorablePerson, query: PeopleFilter["traitScoreAny"]): boolean {
  if (!query || query.attributeIds.length === 0) return true;
  return query.attributeIds.some((attributeId) => {
    const attr = person.attributes.find((a) => a.attributeId === attributeId);
    if (!attr || attr.confidence < query.minConfidence) return false;
    const ref = ATTRIBUTES[attributeId].reference;
    return (attr.score - ref.mean) / ref.sd >= query.minZ;
  });
}

export function filterPeople<T extends ExplorablePerson>(people: readonly T[], filter: PeopleFilter): T[] {
  const eligibleOnly = filter.matchEligibleOnly ?? true;
  return people.filter((p) => {
    if (eligibleOnly && !p.isMatchEligible) return false;
    if (filter.isLiving !== undefined && p.isLiving !== filter.isLiving) return false;
    if (!intersects(filter.eras, (v) => p.era === v)) return false;
    if (!intersects(filter.regionCodes, (v) => p.regionCode === v)) return false;
    if (!intersects(filter.occupationIds, (v) => p.occupationIds.includes(v))) return false;
    if (!intersects(filter.fieldIds, (v) => p.fieldIds.includes(v))) return false;
    if (!intersects(filter.tagIds, (v) => p.tagIds.includes(v))) return false;
    if (!intersects(filter.impactDomains, (v) => p.impactDomains.includes(v))) return false;
    if (!intersects(filter.archetypeIds, (v) => p.archetypeIds.includes(v))) return false;
    if (!passesAttributeFilters(p, filter)) return false;
    if (!passesTraitScoreAny(p, filter.traitScoreAny)) return false;
    return true;
  });
}

/* ------------------------------------------------------------------- sort */

export type PeopleSortKey =
  | "name_asc"
  | "name_desc"
  | "birth_year_asc"
  | "birth_year_desc"
  | "confidence_desc";

/** Stable regardless of sort key: ties break on id, never popularity or recency. */
export function sortPeople<T extends ExplorablePerson>(people: readonly T[], sortKey: PeopleSortKey): T[] {
  const withFallback = (a: ExplorablePerson, b: ExplorablePerson) => a.id.localeCompare(b.id);
  const byBirthYear = (p: ExplorablePerson) => p.birthYear ?? Number.NEGATIVE_INFINITY;

  const comparators: Record<PeopleSortKey, (a: ExplorablePerson, b: ExplorablePerson) => number> = {
    name_asc: (a, b) => a.canonicalName.localeCompare(b.canonicalName) || withFallback(a, b),
    name_desc: (a, b) => b.canonicalName.localeCompare(a.canonicalName) || withFallback(a, b),
    birth_year_asc: (a, b) => byBirthYear(a) - byBirthYear(b) || withFallback(a, b),
    birth_year_desc: (a, b) => byBirthYear(b) - byBirthYear(a) || withFallback(a, b),
    confidence_desc: (a, b) =>
      b.overallProfileConfidence - a.overallProfileConfidence || withFallback(a, b),
  };
  return [...people].sort(comparators[sortKey]);
}

/* ---------------------------------------------------------------- combined */

export interface ExplorePeopleOptions {
  query?: string;
  filter?: PeopleFilter;
  sort?: PeopleSortKey;
}

export function explorePeople<T extends ExplorablePerson>(
  people: readonly T[],
  { query = "", filter = {}, sort = "name_asc" }: ExplorePeopleOptions = {},
): T[] {
  const searched = searchPeople(people, query);
  const filtered = filterPeople(searched, filter);
  return sortPeople(filtered, sort);
}

/* ------------------------------------------------------- facet inventory */

export interface FacetOptions {
  eras: Era[];
  regionCodes: string[];
  occupationIds: string[];
  fieldIds: string[];
  tagIds: string[];
  impactDomains: ImpactDomain[];
  archetypeIds: string[];
}

function distinctSorted<T extends string>(values: Iterable<T>): T[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b)) as T[];
}

/** Distinct values actually present in the dataset, for driving filter UI controls. */
export function availableFilterOptions(people: readonly ExplorablePerson[]): FacetOptions {
  return {
    eras: distinctSorted(people.map((p) => p.era)),
    regionCodes: distinctSorted(people.map((p) => p.regionCode)),
    occupationIds: distinctSorted(people.flatMap((p) => p.occupationIds)),
    fieldIds: distinctSorted(people.flatMap((p) => p.fieldIds)),
    tagIds: distinctSorted(people.flatMap((p) => p.tagIds)),
    impactDomains: distinctSorted(people.flatMap((p) => p.impactDomains)),
    archetypeIds: distinctSorted(people.flatMap((p) => p.archetypeIds)),
  };
}

/* --------------------------------------------- localisation coverage guards */

/**
 * PHASE 8: regression guard mirroring `missingDevelopmentGuides()`/
 * `missingTradeoffCoverage()`'s pattern (`interpretation/development.ts`,
 * `interpretation/targetComparison.ts`) — a live check against the actual
 * roster, not a hardcoded id list, so a future person introducing a new
 * `occupationIds[0]` value with no authored `occupation.*` key is caught
 * here rather than silently falling back to a raw, untranslated id on a
 * production Korean page. Checks BOTH `en`/`ko` have the key — a gap in
 * either locale is real, not just a Korean-specific concern. Only
 * `occupationIds[0]` is checked: it's the one slot actually rendered
 * anywhere in `app/` (verified directly, not assumed) — `fieldIds` is
 * still search/filter-only data, deliberately excluded rather than
 * over-covered. `tagIds` WAS in that same excluded category until the
 * roster-1000 People Directory UX rework added a real Tags filter
 * control — see `missingTagCoverage` below for its own coverage guard.
 */
export function missingOccupationCoverage(people: readonly Person[]): string[] {
  const used = new Set(people.map((p) => p.occupationIds[0]).filter((id): id is string => id !== undefined));
  return [...used]
    .filter(
      (id) =>
        en[`occupation.${id}` as MessageKey] === undefined || ko[`occupation.${id}` as MessageKey] === undefined,
    )
    .sort();
}

/**
 * `ImpactDomain` is a closed union (`IMPACT_DOMAINS`, `core/types.ts`), so
 * this is complete by construction whenever it returns `[]` — not
 * roster-dependent the way occupation coverage is, but checked the same
 * way for the same reason: a future 16th domain value must be caught here,
 * not discovered as an untranslated chip in production.
 */
export function missingImpactDomainCoverage(): ImpactDomain[] {
  return IMPACT_DOMAINS.filter(
    (id) =>
      en[`impact_domain.${id}` as MessageKey] === undefined ||
      ko[`impact_domain.${id}` as MessageKey] === undefined,
  );
}

/**
 * Roster-1000 People Directory UX rework: `tagIds` is now rendered as
 * real filter-chip labels (the new Tags disclosure control), so it needs
 * the same live-roster-audit coverage guard `missingOccupationCoverage`
 * already established — a future person introducing a new tag with no
 * authored `tag.*` key is caught here, not discovered as a raw
 * underscored id in production. Unlike `region.*` (a small, closed,
 * roster-1000-pipeline-enforced vocabulary), tags are expected to keep
 * growing, so this checks against whatever the roster actually contains
 * right now rather than a fixed list.
 */
export function missingTagCoverage(people: readonly Person[]): string[] {
  const used = new Set(people.flatMap((p) => p.tagIds));
  return [...used]
    .filter((id) => en[`tag.${id}` as MessageKey] === undefined || ko[`tag.${id}` as MessageKey] === undefined)
    .sort();
}

/**
 * `regionCode` controlled-vocabulary coverage guard — same pattern,
 * checking the closed set the roster-1000 pipeline is required to reuse
 * (Part 3 of the roster-expansion brief: "do not allow arbitrary
 * per-person free-text region labels"). A future person introducing an
 * unauthored `regionCode` value is caught here.
 */
export function missingRegionCoverage(people: readonly Person[]): string[] {
  const used = new Set(people.map((p) => p.regionCode));
  return [...used]
    .filter((id) => en[`region.${id}` as MessageKey] === undefined || ko[`region.${id}` as MessageKey] === undefined)
    .sort();
}
