# Localization — reference

## The rule

One canonical person → one attribute profile → many localized
presentations. Never a separate factual record per language. Template
*selection* happens on numbers alone (same locale-independent ranking
for every user); the locale only decides which *string* that selected
key maps to. This is what makes localization safe.

## Semantic adaptation, not translation

English fixes *meaning*; each locale expresses that meaning natively,
not the English metaphor. Korean is the reference implementation
(`src/core/i18n/ko.ts`) — e.g. "Trait Constellation" (an astronomy
metaphor that works in English) became "핵심 특성" ("core traits"), not
a literal translation of the metaphor. A future locale should translate
the *concept*, informed by both the English definition and Korean's
editorial choice, not mechanically translate Korean.

## Two different localization systems in this codebase — do not conflate

| System | Fallback behavior | Used for |
|---|---|---|
| `t(locale, key)` / `MessageKey` bundles (`en.ts`/`ko.ts`) | English-fallback — an untranslated key still renders (in English) rather than crashing | UI chrome, quiz copy, dev guides, most product strings |
| `editorialText(locale, key)` (`src/core/i18n/editorial.ts`) | **Locale-strict, no fallback** — a missing Korean translation is simply omitted from `/ko-KR`, never shown untranslated | Achievement/moment/turning-point editorial content only |

Do not port the English-fallback pattern onto editorial content, and do
not make `t()` locale-strict — both are deliberate, different choices for
different content types.

## Quiz-specific localization disciplines

- **Evaluative symmetry**: a quiz item should describe two defensible
  operating tendencies, not a virtue and its deficient opposite — even a
  statistically bidirectional item can still bias self-report via
  framing. Applies to new items and to translations (a literal Korean
  rendering can reintroduce framing the English wording avoided).
- **Response-anchor symmetry**: even neutral statement wording can read
  as evaluative purely from a plain "disagree ↔ agree" scale, if the
  statement uses one-directional capability language. `leftAnchorKey`/
  `rightAnchorKey` on `QuizQuestion` (presentation-only, never read by
  `scoreQuiz`) fix this for a small, deliberately selective set of items.
- 100% Korean coverage is a locked regression guard
  (`translationCoverage("ko-KR") === 1`) for the `t()`/`MessageKey`
  system. `src/dev/i18n-audit.ts` reports the live number.

## Presentation-metadata that must never influence matching

`aliases`, `historicalPolityKey`, `externalIdentity` (Wikidata/Wikipedia
links), `portrait`, localized `person.name.{slug}` display names — all
presentation/search/SEO only. Enforced the same way as every other
metadata field: tests mutate them and assert byte-identical scores.

## Korean typography

Headings use the sans stack under `:lang(ko)` (the editorial serif read
as historical/traditional-print for plain UI labels); a
`.tgi-person-name` escape hatch keeps the serif specifically for bare
person-name display (person page H1, results closest-match, compare
hero). Self-hosted `Noto Serif KR` via `next/font/google`.

## Where to look for more

- Full worked examples and the East-Asian editorial-reference-chain
  design: `docs/archive/completed-phases/claude-md-phase-history-2026-08.md`
  ("Localisation" section).
- Editorial-content-specific localization rules (semantic parity, not
  sentence-for-sentence equivalence): `docs/editorial-content.md`.
