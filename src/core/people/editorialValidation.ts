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
import type { Person, PersonEditorialItem, LifeArcBeat, PersonLegacy } from "../types.js";
import { ATTRIBUTE_IDS } from "../attributes/attributes.js";
import { EDITORIAL_EN, EDITORIAL_KO } from "../i18n/editorial.js";

export interface EditorialIssue {
  personSlug: string;
  itemId: string;
  problem: string;
}

const ATTRIBUTE_ID_SET = new Set<string>(ATTRIBUTE_IDS);

/**
 * Narrow, high-precision guards against two specific, previously-real
 * mistakes found during the 2026-08 pilot QA pass — NOT an attempt to
 * automate prose quality or historical accuracy (both genuinely require
 * human judgment; see docs/editorial-content.md's Writing Standard v1).
 *
 * 1. DIAGNOSTIC_PATTERNS — the "Safety" rule in CLAUDE.md ("never fabricate
 *    or infer mental illness... personality disorders") applied to editorial
 *    prose specifically. A short, deliberately narrow list of phrasings that
 *    are never legitimate here, not a general sentiment/tone scanner.
 * 2. FORCED_SYMMETRY_IN_FACT — catches a "the same trait that helped X also
 *    caused Y" construction landing in a FACT-only item (no
 *    `interpretationKey`), which is structurally where the fact/
 *    interpretation boundary blurs: a personality-causal claim with no
 *    interpretive framing at all, presented as bare historical fact. This
 *    exact pattern was found and fixed in two pilot items (da Vinci's
 *    Mona Lisa moment, Ataturk's 1925 turning point) during that pass. It
 *    deliberately does NOT fire on interpretation text, where "the same X
 *    that..." is a legitimate (if worth using sparingly) interpretive
 *    device — only on text asserted as plain fact.
 */
const DIAGNOSTIC_PATTERNS: RegExp[] = [
  /\bthis proves\b/i,
  /\bproves (that|she|he|they) (was|were|is|are)\b/i,
  /\bwas (a |an )?narcissist/i,
  /\b(diagnosed|diagnosis) with\b/i,
  /\bsuffered from (depression|anxiety|bipolar|schizophrenia|a personality disorder)\b/i,
  /\bhad (a |an )?personality disorder\b/i,
  /\bclearly (was|suffered|had)\b/i,
];

const CAUSAL_VERB = /\b(caused|drove|produced|led to|enabled|prevented|kept (him|her|them) from|made (him|her|them))\b/i;
const FORCED_SYMMETRY = /\bthe same\b[^.]{0,120}?\bthat\b[^.]{0,120}?/i;

/**
 * Pure, directly-testable text check — the actual pattern-matching logic,
 * decoupled from item/EDITORIAL_EN lookup so a test can exercise it with
 * synthetic strings without needing to inject fake entries into the real
 * content maps. `isBareFact` should be true only for text with no
 * accompanying `interpretationKey` (see `checkBannedLanguage` below).
 */
export function findBannedLanguageIssues(text: string, isBareFact: boolean): string[] {
  const found: string[] = [];
  for (const pattern of DIAGNOSTIC_PATTERNS) {
    if (pattern.test(text)) {
      found.push(`matches a banned diagnostic-language pattern (${pattern}) — never assert a diagnosis, per CLAUDE.md "Safety"`);
    }
  }
  if (isBareFact && FORCED_SYMMETRY.test(text) && CAUSAL_VERB.test(text)) {
    found.push(
      `contains a "the same X that... [caused/drove/produced/...]" personality-causal construction with no ` +
        `interpretive framing — either strip the causal claim from the fact, or move it into a properly hedged interpretationKey`,
    );
  }
  return found;
}

function checkBannedLanguage(
  personSlug: string,
  item: PersonEditorialItem,
  issues: EditorialIssue[],
): void {
  const factText = EDITORIAL_EN[item.textKey];
  const interpText = item.interpretationKey ? EDITORIAL_EN[item.interpretationKey] : undefined;

  if (factText) {
    for (const problem of findBannedLanguageIssues(factText, item.interpretationKey === undefined)) {
      issues.push({ personSlug, itemId: item.id, problem: `fact text ${problem}` });
    }
  }
  if (interpText) {
    for (const problem of findBannedLanguageIssues(interpText, false)) {
      issues.push({ personSlug, itemId: item.id, problem: `interpretation text ${problem}` });
    }
  }
}

function checkItem(
  personSlug: string,
  category: "achievements" | "moments" | "turningPoints" | "complexities",
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

  checkBannedLanguage(personSlug, item, issues);
}

/** Life Arc beats never carry an interpretation, so this is a narrower check
 *  than `checkItem` — textKey resolution and sourceId validity only, plus a
 *  banned-language scan on the fact text itself (a beat is still a
 *  historical claim, even a one-line one). */
function checkLifeArcBeat(
  personSlug: string,
  beat: LifeArcBeat,
  index: number,
  validSourceIds: Set<string>,
  issues: EditorialIssue[],
): void {
  const label = `lifeArc[${index}] (${beat.year || "(empty year)"})`;
  if (!beat.year || beat.year.trim().length === 0) {
    issues.push({ personSlug, itemId: label, problem: "lifeArc: empty year" });
  }
  if (!beat.textKey || beat.textKey.trim().length === 0) {
    issues.push({ personSlug, itemId: label, problem: "lifeArc: empty textKey" });
  } else {
    const resolved = EDITORIAL_EN[beat.textKey];
    if (resolved === undefined) {
      issues.push({ personSlug, itemId: label, problem: `textKey "${beat.textKey}" has no EDITORIAL_EN entry` });
    } else {
      for (const problem of findBannedLanguageIssues(resolved, true)) {
        issues.push({ personSlug, itemId: label, problem: `fact text ${problem}` });
      }
    }
  }
  for (const sourceId of beat.sourceIds ?? []) {
    if (!validSourceIds.has(sourceId)) {
      issues.push({ personSlug, itemId: label, problem: `sourceId "${sourceId}" is not one of this person's own Person.sources ids` });
    }
  }
}

/** Legacy is a single closing paragraph, not a fact/interpretation pair (it's
 *  already synthesis) — checked for resolution, sourcing, and banned
 *  language, same as any other published claim. */
function checkLegacy(personSlug: string, legacy: PersonLegacy, validSourceIds: Set<string>, issues: EditorialIssue[]): void {
  const label = "legacy";
  if (!legacy.textKey || legacy.textKey.trim().length === 0) {
    issues.push({ personSlug, itemId: label, problem: "legacy: empty textKey" });
    return;
  }
  const resolved = EDITORIAL_EN[legacy.textKey];
  if (resolved === undefined) {
    issues.push({ personSlug, itemId: label, problem: `textKey "${legacy.textKey}" has no EDITORIAL_EN entry` });
  } else {
    for (const problem of findBannedLanguageIssues(resolved, true)) {
      issues.push({ personSlug, itemId: label, problem: `fact text ${problem}` });
    }
  }
  for (const sourceId of legacy.sourceIds ?? []) {
    if (!validSourceIds.has(sourceId)) {
      issues.push({ personSlug, itemId: label, problem: `sourceId "${sourceId}" is not one of this person's own Person.sources ids` });
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
    const { achievements, moments, turningPoints, lifeArc, complexities, legacy } = person.editorial;
    for (const item of achievements) checkItem(person.slug, "achievements", item, seenIds, validSourceIds, issues);
    for (const item of moments) checkItem(person.slug, "moments", item, seenIds, validSourceIds, issues);
    for (const item of turningPoints) checkItem(person.slug, "turningPoints", item, seenIds, validSourceIds, issues);
    for (const item of complexities ?? []) checkItem(person.slug, "complexities", item, seenIds, validSourceIds, issues);
    (lifeArc ?? []).forEach((beat, index) => checkLifeArcBeat(person.slug, beat, index, validSourceIds, issues));
    if (legacy) checkLegacy(person.slug, legacy, validSourceIds, issues);
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
  complexitiesCount: number;
  peopleWithLifeArc: number;
  peopleWithLegacy: number;
  itemsWithInterpretation: number;
  /** Share of authored English item text keys that also have a Korean entry. */
  koreanCoverage: number;
  /** Distinct EN keys actually referenced (textKey + interpretationKey) across all editorial items. */
  enKeyCount: number;
  /** Of those, how many also resolve in EDITORIAL_KO. */
  koKeyCount: number;
}

/** Aggregate coverage stats — used by the audit report and by tests. */
export function editorialCoverageStats(people: readonly Person[]): EditorialCoverageStats {
  let peopleWithEditorial = 0;
  let achievementCount = 0;
  let momentCount = 0;
  let turningPointCount = 0;
  let complexitiesCount = 0;
  let peopleWithLifeArc = 0;
  let peopleWithLegacy = 0;
  let itemsWithInterpretation = 0;
  const allKeys: string[] = [];

  for (const person of people) {
    if (!person.editorial) continue;
    peopleWithEditorial++;
    const { achievements, moments, turningPoints, lifeArc, complexities, legacy } = person.editorial;
    achievementCount += achievements.length;
    momentCount += moments.length;
    turningPointCount += turningPoints.length;
    complexitiesCount += complexities?.length ?? 0;
    if (lifeArc && lifeArc.length > 0) peopleWithLifeArc++;
    if (legacy) peopleWithLegacy++;
    for (const item of [...achievements, ...moments, ...turningPoints, ...(complexities ?? [])]) {
      allKeys.push(item.textKey);
      if (item.interpretationKey) {
        itemsWithInterpretation++;
        allKeys.push(item.interpretationKey);
      }
    }
    for (const beat of lifeArc ?? []) allKeys.push(beat.textKey);
    if (legacy) allKeys.push(legacy.textKey);
  }

  const distinctKeys = new Set(allKeys);
  const withKorean = allKeys.filter((k) => EDITORIAL_KO[k] !== undefined).length;
  const distinctWithKorean = [...distinctKeys].filter((k) => EDITORIAL_KO[k] !== undefined).length;

  return {
    totalPeople: people.length,
    peopleWithEditorial,
    totalItems: achievementCount + momentCount + turningPointCount,
    achievementCount,
    momentCount,
    turningPointCount,
    complexitiesCount,
    peopleWithLifeArc,
    peopleWithLegacy,
    itemsWithInterpretation,
    koreanCoverage: allKeys.length === 0 ? 1 : withKorean / allKeys.length,
    enKeyCount: distinctKeys.size,
    koKeyCount: distinctWithKorean,
  };
}
