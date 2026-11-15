/**
 * Raw attribute-id leak detection for user-visible editorial prose.
 *
 * Roster67 QA found trait ids such as `conflict_tolerance` rendered in profile prose. The per-roster audits
 * (Roster42 onward) carried a duplicated guard regex whose `\b` word boundaries had been corrupted into literal
 * 0x08 backspace characters by an authoring-tool escape collapse, so those guards never matched. This module is
 * the canonical replacement: it is built from the real attribute-id list and uses plain string scanning with NO
 * regular expressions, so there is no escape sequence that tooling can corrupt.
 *
 * Pure and dependency-light on purpose (types + the attribute list only): usable from tests and dev tooling.
 */
import { ATTRIBUTE_IDS } from "../attributes/attributes.js";

/** Attribute ids that contain an underscore (the only ones that can leak as snake_case prose). */
const SNAKE_CASE_IDS: readonly string[] = ATTRIBUTE_IDS.filter((id) => id.includes("_"));

function isIdCharacter(ch: string | undefined): boolean {
  if (ch === undefined) return false;
  return (ch >= "a" && ch <= "z") || ch === "_";
}

/** Returns each raw snake_case attribute id that appears in `text` as a whole token (not inside a longer word). */
export function findRawAttributeIds(text: string): string[] {
  const found: string[] = [];
  for (const id of SNAKE_CASE_IDS) {
    let from = 0;
    for (;;) {
      const at = text.indexOf(id, from);
      if (at < 0) break;
      const before = at === 0 ? undefined : text[at - 1];
      const after = text[at + id.length];
      if (!isIdCharacter(before) && !isIdCharacter(after)) {
        found.push(id);
        break;
      }
      from = at + 1;
    }
  }
  return found;
}

export interface RawIdLeak {
  slug: string;
  key: string;
  locale: "en-US" | "ko-KR";
  id: string;
}

export interface EditorialItemLike {
  textKey: string;
  interpretationKey?: string | undefined;
}

export interface EditorialSubject {
  slug: string;
  editorial?:
    | {
        achievements?: readonly EditorialItemLike[] | undefined;
        moments?: readonly EditorialItemLike[] | undefined;
        turningPoints?: readonly EditorialItemLike[] | undefined;
      }
    | undefined;
}

const LOCALES = ["en-US", "ko-KR"] as const;

/**
 * Every raw-id occurrence in the RESOLVED text (what the profile page and trait-explanation popover render via
 * `editorialText(locale, key)`) of every person's achievements, moments and turning points, fact and interpretation.
 */
export function collectRawIdLeaks(
  people: readonly EditorialSubject[],
  textFor: (locale: "en-US" | "ko-KR", key: string) => string | undefined,
): RawIdLeak[] {
  const leaks: RawIdLeak[] = [];
  for (const person of people) {
    const items = [
      ...(person.editorial?.achievements ?? []),
      ...(person.editorial?.moments ?? []),
      ...(person.editorial?.turningPoints ?? []),
    ];
    for (const item of items) {
      for (const key of [item.textKey, ...(item.interpretationKey ? [item.interpretationKey] : [])]) {
        for (const locale of LOCALES) {
          const text = textFor(locale, key);
          if (!text) continue;
          for (const id of findRawAttributeIds(text)) leaks.push({ slug: person.slug, key, locale, id });
        }
      }
    }
  }
  return leaks;
}

export interface RatchetResult {
  /** Leaks belonging to people NOT on the frozen baseline: any entry is a failure. */
  newLeaks: RawIdLeak[];
  /** Distinct (key, locale) texts that leak, counting only baseline people. */
  baselineTextCount: number;
  baselinePeopleWithLeaks: number;
  /** True when baseline people now leak in more texts than the frozen maximum (a regression inside the baseline). */
  baselineGrew: boolean;
}

/**
 * Ratchet: the baseline may shrink but never grow. A person not on `baselinePeople` must have zero leaks, and
 * the baseline people's total leaking texts must not exceed `maxBaselineTexts`.
 */
export function applyRawIdRatchet(leaks: readonly RawIdLeak[], baselinePeople: ReadonlySet<string>, maxBaselineTexts: number): RatchetResult {
  const newLeaks = leaks.filter((l) => !baselinePeople.has(l.slug));
  const baselineLeaks = leaks.filter((l) => baselinePeople.has(l.slug));
  const texts = new Set(baselineLeaks.map((l) => `${l.key}|${l.locale}`));
  const people = new Set(baselineLeaks.map((l) => l.slug));
  return { newLeaks, baselineTextCount: texts.size, baselinePeopleWithLeaks: people.size, baselineGrew: texts.size > maxBaselineTexts };
}
