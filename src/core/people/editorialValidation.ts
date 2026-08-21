/**
 * Structural validation for `Person.editorial` content — the deterministic
 * guards item 26 of the editorial-depth brief asks for. Checked against
 * whatever the live roster actually contains, same "live audit, not a
 * hardcoded list" pattern as `missingDevelopmentGuides()`/
 * `missingOccupationCoverage()` elsewhere in `src/core`.
 *
 * Deliberately does NOT assert exact prose (per instruction) — only
 * structural properties: uniqueness, referential integrity, non-emptiness,
 * and English-text presence. Korean coverage is reported separately as a
 * percentage, not enforced as a hard failure — a person may legitimately
 * have English-only editorial content while translation catches up (see
 * `editorialText()`'s locale-strict, no-fallback design).
 */
import type { Person, PersonEditorialItem } from "../types.js";
import { ATTRIBUTE_IDS } from "../attributes/attributes.js";
import { EDITORIAL_EN, EDITORIAL_KO } from "../i18n/editorial.js";

export interface EditorialIssue {
  personSlug: string;
  itemId: string;
  problem: string;
}

const ATTRIBUTE_ID_SET = new Set<string>(ATTRIBUTE_IDS);

function checkItem(
  personSlug: string,
  category: "achievements" | "moments" | "turningPoints",
  item: PersonEditorialItem,
  seenIds: Map<string, string>,
  validSourceIds: Set<string>,
  issues: EditorialIssue[],
): void {
  if (!item.id || item.id.trim().length === 0) {
    issues.push({ personSlug, itemId: item.id || "(empty)", problem: `${category}: item has an empty id` });
  } else {
    const owner = seenIds.get(item.id);
    if (owner && owner !== personSlug) {
      issues.push({ personSlug, itemId: item.id, problem: `duplicate editorial item id also used by "${owner}"` });
    } else if (owner === personSlug) {
      issues.push({ personSlug, itemId: item.id, problem: "duplicate editorial item id within the same person" });
    }
    seenIds.set(item.id, personSlug);
  }

  if (!item.textKey || item.textKey.trim().length === 0) {
    issues.push({ personSlug, itemId: item.id, problem: `${category}: empty textKey` });
  } else {
    const resolved = EDITORIAL_EN[item.textKey];
    if (resolved === undefined) {
      issues.push({ personSlug, itemId: item.id, problem: `textKey "${item.textKey}" has no EDITORIAL_EN entry` });
    } else if (resolved.trim().length === 0) {
      issues.push({ personSlug, itemId: item.id, problem: `textKey "${item.textKey}" resolves to an empty string` });
    }
  }

  if (item.interpretationKey !== undefined) {
    const resolved = EDITORIAL_EN[item.interpretationKey];
    if (resolved === undefined) {
      issues.push({
        personSlug,
        itemId: item.id,
        problem: `interpretationKey "${item.interpretationKey}" has no EDITORIAL_EN entry`,
      });
    } else if (resolved.trim().length === 0) {
      issues.push({ personSlug, itemId: item.id, problem: `interpretationKey "${item.interpretationKey}" resolves to an empty string` });
    }
  }

  if (item.attributeId !== undefined && !ATTRIBUTE_ID_SET.has(item.attributeId)) {
    issues.push({ personSlug, itemId: item.id, problem: `unknown attributeId "${item.attributeId}"` });
  }

  for (const sourceId of item.sourceIds ?? []) {
    if (!validSourceIds.has(sourceId)) {
      issues.push({ personSlug, itemId: item.id, problem: `sourceId "${sourceId}" is not one of this person's own Person.sources ids` });
    }
  }
}

/**
 * Every structural issue found across the whole roster's editorial content.
 * Empty array = clean. Never throws — a validation function that can only
 * ever report or pass, so it composes safely into a build/test step.
 */
export function validateEditorial(people: readonly Person[]): EditorialIssue[] {
  const issues: EditorialIssue[] = [];
  const seenIds = new Map<string, string>();

  for (const person of people) {
    if (!person.editorial) continue;
    const validSourceIds = new Set(person.sources.map((s) => s.id));
    const { achievements, moments, turningPoints } = person.editorial;
    for (const item of achievements) checkItem(person.slug, "achievements", item, seenIds, validSourceIds, issues);
    for (const item of moments) checkItem(person.slug, "moments", item, seenIds, validSourceIds, issues);
    for (const item of turningPoints) checkItem(person.slug, "turningPoints", item, seenIds, validSourceIds, issues);
  }

  return issues;
}

export interface EditorialCoverageStats {
  totalPeople: number;
  peopleWithEditorial: number;
  totalItems: number;
  achievementCount: number;
  momentCount: number;
  turningPointCount: number;
  itemsWithInterpretation: number;
  /** Share of authored English item text keys that also have a Korean entry. */
  koreanCoverage: number;
}

/** Aggregate coverage stats — used by the audit report and by tests. */
export function editorialCoverageStats(people: readonly Person[]): EditorialCoverageStats {
  let peopleWithEditorial = 0;
  let achievementCount = 0;
  let momentCount = 0;
  let turningPointCount = 0;
  let itemsWithInterpretation = 0;
  const allKeys: string[] = [];

  for (const person of people) {
    if (!person.editorial) continue;
    peopleWithEditorial++;
    const { achievements, moments, turningPoints } = person.editorial;
    achievementCount += achievements.length;
    momentCount += moments.length;
    turningPointCount += turningPoints.length;
    for (const item of [...achievements, ...moments, ...turningPoints]) {
      allKeys.push(item.textKey);
      if (item.interpretationKey) {
        itemsWithInterpretation++;
        allKeys.push(item.interpretationKey);
      }
    }
  }

  const withKorean = allKeys.filter((k) => EDITORIAL_KO[k] !== undefined).length;

  return {
    totalPeople: people.length,
    peopleWithEditorial,
    totalItems: achievementCount + momentCount + turningPointCount,
    achievementCount,
    momentCount,
    turningPointCount,
    itemsWithInterpretation,
    koreanCoverage: allKeys.length === 0 ? 1 : withKorean / allKeys.length,
  };
}
