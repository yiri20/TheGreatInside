/**
 * COMPACT PEOPLE INDEX — roster-scale-expansion architecture (2026-08).
 *
 * Found during the 1,000-person roster-expansion audit: `SEED_PEOPLE` (the
 * full `Person[]` — every trait, every source, every editorial string) is
 * imported directly into two `"use client"` components
 * (`PeopleDirectoryClient.tsx`, `QuizClient.tsx`), so the ENTIRE dataset
 * ships as browser JS. Measured directly in a production build at the
 * pre-expansion 35-person roster: **54.6KB** in one client chunk. That
 * scales roughly linearly with roster size (it's overwhelmingly array-of-
 * objects data, not fixed overhead) — a naive 1,000-person roster would
 * project to roughly **1.5MB** of person data shipped to every visitor of
 * the People directory and the Quiz, most of which (`sources`,
 * `doNotCopyKeys`, unused explanation keys, `externalIdentity`, full
 * portrait license chains) neither client component ever reads.
 *
 * This module defines the compact shape and the pure transform that
 * produces it — deliberately including ONLY fields actually read by
 * `src/core/people/explorer.ts` (search/filter/sort), `PeopleDirectoryClient`
 * (rendering `PersonCard`s), and `personDataFingerprint` (quiz-completion
 * provenance hashing, via `enqueuePendingOwnResult`). Every Person page,
 * Results, Compare, the sitemap, and OG image generation are all Server
 * Components — they continue to import the FULL `SEED_PEOPLE` from
 * `src/data/people/*.ts` directly, completely unaffected by this module
 * (zero client-bundle cost for a Server Component's own imports).
 *
 * `PersonIndexEntry` is a strict subset of `Person` — every field on it
 * has the exact same name and type as the corresponding `Person` field, so
 * `toIndexEntry` is a plain, uncontroversial narrowing projection, not a
 * data transformation. A `Person` already structurally satisfies
 * `ExplorablePerson` (`explorer.ts`'s own narrow interface), and so does
 * `PersonIndexEntry` — both shapes work with the exact same search/filter/
 * sort logic, by construction, with no duplicated logic anywhere.
 *
 * The actual generated artifact (`src/data/people/peopleIndex.generated.ts`)
 * is produced by `src/dev/generatePeopleIndex.ts`, following the exact same
 * "frozen, committed snapshot, not computed live" discipline this project
 * already uses for `dispersion.generated.ts` — regenerate deliberately
 * after any roster change, never computed at request/build time from the
 * full dataset (that would re-import the full dataset into whatever
 * evaluates it, defeating the entire point for a client bundle).
 */
import type { AttributeId } from "../attributes/attributes.js";
import type { Era, ImpactDomain, Person, TraitImpact } from "../types.js";

export const PERSON_INDEX_VERSION = "person_index_v1";

/**
 * `[attributeId, score, confidence, impact]` — a tuple, not
 * `{attributeId, score, confidence, impact}`. Measured, not theoretical:
 * an earlier draft of this module used the verbose object form and
 * produced a LARGER minified client chunk than the original full
 * `Person[]` data it was replacing (93.5KB vs. 54.6KB at 35 people,
 * apples-to-apples on the same build) — object property name strings
 * cannot be minified by terser the way variable names can, so repeating
 * "attributeId"/"score"/"confidence"/"impact" as literal JSON keys 34
 * times per person (1,190 times at 35 people) cost more than every field
 * this module strips out (`sources`, `doNotCopyKeys`, explanation keys,
 * ...) saved. A tuple has no key names to repeat — matching this
 * project's own existing `Row = [score, confidence, evidenceType,
 * impact]` authoring-format convention in `src/data/people/builder.ts`,
 * the same lesson already applied there for the same reason.
 */
export type IndexedAttribute = readonly [AttributeId, number, number, TraitImpact];

export interface PersonIndexEntry {
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
  /** Only the values `explorer.ts`'s filters and `personDataFingerprint`
   *  actually read — never `evidenceType`, `sourceIds`, or the (currently
   *  unpopulated) explanation keys. Tuple-encoded — see `IndexedAttribute`. */
  attributes: readonly IndexedAttribute[];
  /** Just the URL — never the license chain (`source`/`license`/
   *  `licenseUrl`/`attribution`), which only the Person detail page (a
   *  Server Component) ever renders. */
  portraitUrl?: string;
}

export function toIndexEntry(person: Person): PersonIndexEntry {
  return {
    id: person.id,
    slug: person.slug,
    canonicalName: person.canonicalName,
    aliases: person.aliases,
    ...(person.birthYear !== undefined ? { birthYear: person.birthYear } : {}),
    ...(person.deathYear !== undefined ? { deathYear: person.deathYear } : {}),
    isLiving: person.isLiving,
    era: person.era,
    regionCode: person.regionCode,
    occupationIds: person.occupationIds,
    fieldIds: person.fieldIds,
    impactDomains: person.impactDomains,
    tagIds: person.tagIds,
    archetypeIds: person.archetypeIds,
    isMatchEligible: person.isMatchEligible,
    overallProfileConfidence: person.overallProfileConfidence,
    attributes: person.attributes.map((a): IndexedAttribute => [a.attributeId, a.score, a.confidence, a.impact]),
    ...(person.portrait ? { portraitUrl: person.portrait.url } : {}),
  };
}

export function buildPeopleIndex(people: readonly Person[]): readonly PersonIndexEntry[] {
  return people.map(toIndexEntry);
}

/**
 * `explorer.ts`'s `ExplorablePerson` (and `dataVersion.ts`'s
 * `FingerprintablePerson`) expect OBJECT-shaped attributes
 * (`{attributeId, score, confidence, impact}`) — the same shape their
 * existing, already-tested logic and test fixtures use, deliberately
 * left untouched so `Person`'s own real `PersonAttribute[]` keeps
 * satisfying them with zero changes. `PersonIndexEntry.attributes` is
 * tuple-encoded instead, purely for the ON-DISK/bundled representation's
 * sake (see `IndexedAttribute`'s doc comment for the measured reason).
 * This expands ONE index entry's tuples back into that object shape —
 * cheap (34 tiny object literals), meant to run ONCE per component
 * mount/memo, never per keystroke — so the compactness lives entirely in
 * what's downloaded and parsed, not in a permanent, awkward second data
 * shape `explorer.ts` would otherwise need to learn about.
 */
export interface ExpandedPersonIndexEntry extends Omit<PersonIndexEntry, "attributes"> {
  attributes: { attributeId: AttributeId; score: number; confidence: number; impact: TraitImpact }[];
}

export function expandIndexEntry(entry: PersonIndexEntry): ExpandedPersonIndexEntry {
  return {
    ...entry,
    attributes: entry.attributes.map(([attributeId, score, confidence, impact]) => ({
      attributeId,
      score,
      confidence,
      impact,
    })),
  };
}

export function expandPeopleIndex(index: readonly PersonIndexEntry[]): ExpandedPersonIndexEntry[] {
  return index.map(expandIndexEntry);
}
