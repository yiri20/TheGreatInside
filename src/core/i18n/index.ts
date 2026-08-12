import type { Locale } from "../types.js";
import { en, type MessageKey } from "./en.js";
import { ko } from "./ko.js";

/**
 * Locale resolution with English fallback.
 *
 * Bundles are static objects, not runtime-generated translations: nothing here
 * calls a model, and a given key resolves to the same string every time.
 */
const BUNDLES: Record<Locale, Partial<Record<MessageKey, string>>> = {
  "en-US": en,
  "ko-KR": ko,
  // Phase 8 targets. Empty bundles fall back to English, which is correct
  // behaviour for a partially-translated locale.
  "ja-JP": {},
  "zh-CN": {},
  "zh-TW": {},
};

export type Interpolations = Record<string, string | number>;

export function t(locale: Locale, key: MessageKey, vars: Interpolations = {}): string {
  const raw = BUNDLES[locale]?.[key] ?? en[key];
  return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match,
  );
}

/**
 * Safe lookup for free-form, data-driven keys that are NOT part of the closed
 * `MessageKey` union — e.g. `Person.historicalPolityKey`, authored per-person
 * and not guaranteed to exist in either bundle yet. `t()` intentionally can't
 * be called with these: its `key: MessageKey` parameter is what makes every
 * *known* key's presence in `en` a compile-time guarantee, so weakening it to
 * `string` would silently drop that guarantee for every other call site too.
 * Returns `undefined` — never throws — when the key is missing everywhere,
 * so callers can render nothing rather than crash on an unauthored key.
 */
export function tOptional(
  locale: Locale,
  key: string,
  vars: Interpolations = {},
): string | undefined {
  const raw = BUNDLES[locale]?.[key as MessageKey] ?? en[key as MessageKey];
  if (raw === undefined) return undefined;
  return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match,
  );
}

/** Keys a locale still falls back to English for. Surfaced in the admin UI. */
export function missingKeys(locale: Locale): MessageKey[] {
  const bundle = BUNDLES[locale] ?? {};
  return (Object.keys(en) as MessageKey[]).filter((k) => bundle[k] === undefined);
}

export function translationCoverage(locale: Locale): number {
  const total = Object.keys(en).length;
  return (total - missingKeys(locale).length) / total;
}

/**
 * PHASE 8K: presentation-only localized display name for a person.
 * `person.name.{slug}` (`ko.ts`) is resolved through `tOptional` — the
 * same free-form/not-guaranteed-to-exist mechanism `historicalPolityKey`
 * already uses — falling back to `canonicalName` when no localized form is
 * authored for this person (currently: any locale other than `ko-KR`, and
 * any future person added to the roster before a Korean name is authored
 * for them). This function is the ONLY thing that should decide what name
 * to display; it has no effect on `id`/`slug`/matching/`externalIdentity` —
 * none of those ever read this. See `personDisplayName.test.ts` for the
 * regression guard on that boundary.
 */
export function personDisplayName(
  locale: Locale,
  person: { readonly slug: string; readonly canonicalName: string },
): string {
  return tOptional(locale, `person.name.${person.slug}`) ?? person.canonicalName;
}

export { en, ko };
export type { MessageKey };
