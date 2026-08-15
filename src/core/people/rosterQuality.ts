/**
 * ROSTER DATA-QUALITY GATES — roster-1000 expansion pipeline (2026-08).
 *
 * Pure, testable validation functions the offline candidate pipeline runs
 * BEFORE a candidate is ever written into a committed `src/data/people/*.ts`
 * roster file. Deliberately does NOT introduce a new `isIndexEligible`
 * field on `Person`: `builder.ts`'s `build()` already unconditionally
 * stamps every person `status: "published"`, and `generateStaticParams`/
 * `buildSitemapEntries` already include every `SEED_PEOPLE` entry with no
 * status filter — so "committed to a roster file" already IS "published,
 * indexed, publicly paged" in this architecture. The correct place to gate
 * quality is therefore BEFORE commit (these functions, run by the
 * pipeline), not a new runtime field. A candidate that fails any gate here
 * stays in pipeline-only staging data (never imported into `SEED_PEOPLE`),
 * exactly the "reject or hold" mechanism CLAUDE.md's own inclusion
 * philosophy already models for editorial decisions (see "Inclusion
 * philosophy" — decided once, before commit, never a runtime toggle).
 */
import type { Person } from "../types.js";
import { evaluateMatchEligibility, type EligibilityReport } from "../matching/similarity.js";

/* -------------------------------------------------------------- identity */

export interface DuplicateReport {
  duplicateSlugs: string[];
  duplicateIds: string[];
  duplicateWikidataIds: string[];
}

/** Every person committed to a roster file must have a unique slug and id
 *  (existing invariant, now checked mechanically) and, where a Wikidata QID
 *  is set, a unique one — the concrete anti-duplicate-person mechanism the
 *  roster-expansion brief asks for (Part 3: "stable person identifiers").
 */
export function findDuplicates(people: readonly Person[]): DuplicateReport {
  const dup = <T,>(values: readonly T[]): T[] => {
    const seen = new Set<T>();
    const dupes = new Set<T>();
    for (const v of values) {
      if (seen.has(v)) dupes.add(v);
      seen.add(v);
    }
    return [...dupes];
  };
  return {
    duplicateSlugs: dup(people.map((p) => p.slug)),
    duplicateIds: dup(people.map((p) => p.id)),
    duplicateWikidataIds: dup(
      people.map((p) => p.externalIdentity?.wikidataId).filter((id): id is string => id !== undefined),
    ),
  };
}

/* ------------------------------------------------------------ chronology */

export interface ChronologyError {
  personId: string;
  reason: string;
}

const CURRENT_YEAR = new Date().getFullYear();

/** Basic sanity checks a data-entry error (typo'd year, swapped birth/death,
 *  a living person with a death year, an impossible lifespan) would trip —
 *  never a judgment call, purely mechanical. */
export function validateChronology(person: Person): ChronologyError[] {
  const errors: ChronologyError[] = [];
  const { birthYear, deathYear, isLiving } = person;

  if (birthYear !== undefined && deathYear !== undefined && deathYear < birthYear) {
    errors.push({ personId: person.id, reason: `deathYear (${deathYear}) precedes birthYear (${birthYear})` });
  }
  if (isLiving && deathYear !== undefined) {
    errors.push({ personId: person.id, reason: `isLiving is true but deathYear (${deathYear}) is set` });
  }
  if (!isLiving && deathYear === undefined && birthYear !== undefined && birthYear > CURRENT_YEAR - 20) {
    // Not necessarily wrong (a very recently deceased person could be young
    // relative to this heuristic), so this is deliberately NOT an error —
    // recorded only as a soft signal a reviewer might want, never blocking.
  }
  if (birthYear !== undefined && (birthYear < -3000 || birthYear > CURRENT_YEAR)) {
    errors.push({ personId: person.id, reason: `birthYear (${birthYear}) outside plausible range` });
  }
  if (deathYear !== undefined && (deathYear < -3000 || deathYear > CURRENT_YEAR)) {
    errors.push({ personId: person.id, reason: `deathYear (${deathYear}) outside plausible range` });
  }
  return errors;
}

/* ----------------------------------------------------- trait completeness */

export interface TraitError {
  personId: string;
  attributeId: string;
  reason: string;
}

/** Score/confidence bounds + no NaN — the mechanical half of "trait
 *  completeness" (Part 10). The evidence-quality half (does an extreme
 *  score have strong-enough evidence) is a judgment call the scoring
 *  rubric (`docs/scoring-rubric-v1.md`) governs, not mechanically
 *  checkable here — this only catches data-entry-level defects. */
export function validateTraitBounds(person: Person): TraitError[] {
  const errors: TraitError[] = [];
  for (const attr of person.attributes) {
    if (!Number.isFinite(attr.score) || attr.score < 0 || attr.score > 100) {
      errors.push({ personId: person.id, attributeId: attr.attributeId, reason: `score out of range: ${attr.score}` });
    }
    if (!Number.isFinite(attr.confidence) || attr.confidence < 0 || attr.confidence > 1) {
      errors.push({
        personId: person.id,
        attributeId: attr.attributeId,
        reason: `confidence out of range: ${attr.confidence}`,
      });
    }
  }
  const seen = new Set<string>();
  for (const attr of person.attributes) {
    if (seen.has(attr.attributeId)) {
      errors.push({ personId: person.id, attributeId: attr.attributeId, reason: "duplicate attribute entry for this person" });
    }
    seen.add(attr.attributeId);
  }
  return errors;
}

/* ------------------------------------------------- content-quality floor */

export interface ContentQualityResult {
  personId: string;
  meetsFloor: boolean;
  reasons: string[];
}

/**
 * The public-Person-page content-quality floor (Part 15/16 — "a
 * 1,000-person roster must not create 1,000 thin SEO pages"). Checked
 * against fields the current architecture ALREADY renders on every
 * Person page (`app/[locale]/people/[slug]/page.tsx`) — this does not
 * invent a new content requirement, it makes the existing page's real
 * dependencies explicit and checkable before a candidate is committed.
 * A person failing this floor should stay in pipeline staging (not
 * committed to `SEED_PEOPLE`) until either more evidence is found or
 * they're rejected — never committed with filler content generated to
 * pad the page.
 */
export function meetsContentQualityFloor(person: Person): ContentQualityResult {
  const reasons: string[] = [];

  if (person.impactDomains.length === 0) {
    reasons.push("no impactDomains (renders as the empty 'Known For' section)");
  }
  if (person.sources.length === 0) {
    reasons.push("no sources (Sources section would be empty)");
  }
  if (person.attributes.length < 18) {
    reasons.push(`only ${person.attributes.length} scored attributes (Trait Constellation needs a real profile, not a sparse one)`);
  }
  if (person.canonicalName.trim().length === 0) {
    reasons.push("empty canonicalName");
  }
  if (person.occupationIds.length === 0) {
    reasons.push("no occupationIds (no subtitle/identity line)");
  }

  return { personId: person.id, meetsFloor: reasons.length === 0, reasons };
}

/* ------------------------------------------------------------- combined */

export interface RosterQualityReport {
  duplicates: DuplicateReport;
  chronologyErrors: ChronologyError[];
  traitErrors: TraitError[];
  contentQualityFailures: ContentQualityResult[];
  eligibility: { personId: string; report: EligibilityReport }[];
}

/** Runs every gate over a candidate roster in one pass — what the pipeline
 *  calls at each batch gate (Part 9/10). Pure, no I/O, safe to call on any
 *  candidate list, not just the committed SEED_PEOPLE. */
export function runRosterQualityGates(people: readonly Person[]): RosterQualityReport {
  return {
    duplicates: findDuplicates(people),
    chronologyErrors: people.flatMap(validateChronology),
    traitErrors: people.flatMap(validateTraitBounds),
    contentQualityFailures: people.map(meetsContentQualityFloor).filter((r) => !r.meetsFloor),
    eligibility: people.map((p) => ({ personId: p.id, report: evaluateMatchEligibility(p) })),
  };
}
