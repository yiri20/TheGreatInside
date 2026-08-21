# Editorial content — achievements, moments, turning points

Operational guide for adding/editing per-person editorial narrative
content on `/people/[slug]`. Distinct from `docs/adding-a-person.md`
(which is about adding a NEW person to the roster) — this is about
deepening a person ALREADY in the roster. Full design rationale lives in
`CLAUDE.md`'s editorial-content section; this file is the mechanical,
"which file do I edit" side.

## What this system is

Three optional, independently-sized content categories per person,
rendered on their profile page when present:

- **Achievements** — what they did, and why it mattered.
- **Moments** — concrete episodes that reveal character, working style,
  or values ("revealing moments" / anecdotes).
- **Turning points** — failures, pivots, or reversals, and what changed
  afterward.

Each item optionally carries an **interpretation** — a short sentence
connecting the historical episode to the person's trait profile, in
calibrated language ("is consistent with", "helps explain") never a
diagnostic claim. Interpretation is a structurally SEPARATE field from
the fact itself (`textKey` vs `interpretationKey`) — never blended into
one string — so interpretive language can never be mistaken for a
sourced historical claim. See `CLAUDE.md` "Safety" for why this
separation is a hard rule, not a style preference.

**Presence is per-person and per-locale, not a fixed template.** A
person may have 3 achievements and 0 turning points, or 1 achievement
and 2 moments — whatever the evidence actually supports. Do not pad a
thin profile to match a richer one's item count. An empty category is
simply omitted from the page — never rendered as an empty card or
heading with no content under it.

## Files involved

| File | What it holds |
|---|---|
| `src/core/types.ts` | `PersonEditorialItem` / `PersonEditorial` types, `Person.editorial?` field |
| `src/core/i18n/editorial.ts` | The actual prose — `EDITORIAL_EN`/`EDITORIAL_KO`, keyed `{slug}.{category}.{n}` |
| `src/data/people/editorial.ts` | `PERSON_EDITORIAL`, keyed by slug — which items exist for which person, referencing the keys above + `sourceIds` |
| `src/data/people/seed.ts` | Merges `PERSON_EDITORIAL` onto `SEED_PEOPLE` by slug (no change needed here per-person) |
| `src/core/people/editorialValidation.ts` | Structural guards — run these before committing |
| `app/[locale]/people/[slug]/page.tsx` | Renders the three sections when present |

**Why a separate file instead of editing `seed.ts`/`roster2.ts`/etc.
directly:** editorial content is a new, cross-cutting concern touching a
small subset of the roster at a time. A side-table merged by slug at
build time means editing/adding editorial content can never touch (or
risk breaking) the 11 roster files that `matching_v2`/scoring/
eligibility actually depend on.

## Adding editorial content for a person

1. **Find the evidence first — check the repository before researching
   anything new.** For most of the roster, real evidence already exists:
   - `data-pipeline/candidates/<slug>.json` (`status: "qa_passed"` or
     later) — per-trait `rationale` strings describing concrete episodes,
     plus a `sources` array with real URLs. Covers roster3–roster10.
   - `src/dev/roster1000/production/<session>/<slug>/evidenceLedger.json`
     — the richest source where it exists: dozens of discrete, source-cited
     narrative episodes, trait-blind (written before any trait was
     assigned). Only exists for a handful of the most recent sessions —
     check before assuming it's there.
   - The relevant roster file's own inline `//` comments above each
     scored trait (`seed.ts`, `roster2.ts`, and every `rosterN.ts`) —
     always present, sometimes the ONLY source (the original 10 + the 25
     in `roster2.ts` have no separate JSON at all).

   Run `corepack pnpm@10 exec tsx src/dev/editorialCoverageAudit.ts` for a
   mechanical read on how much material already exists for a given person
   before deciding whether writing content for them is cheap or expensive.

2. **Write the English prose** in `EDITORIAL_EN`
   (`src/core/i18n/editorial.ts`), keyed `{slug}.{achievement|moment|
   turning_point}.{n}` (1-indexed per category). Follow the writing
   standard in `CLAUDE.md`: concrete, specific, economical (2-3
   sentences), no generic "this shows their determination"-style filler.
   If you write an interpretation, key it
   `{slug}.interpretation.{category}.{n}` and keep it in calibrated
   language.

3. **Write the Korean translation** in `EDITORIAL_KO`, same keys. This is
   a strong goal, not a hard requirement — an item with only an English
   entry is simply omitted from `/ko-KR` (see `editorialText()`'s
   locale-strict, no-fallback design: it never shows untranslated English
   text on a Korean page). But don't claim a person is "done" until both
   locales exist for every item you add. Translate the MEANING, not the
   words — see CLAUDE.md's "Localisation is semantic adaptation" section;
   the same discipline used for the quiz and results copy applies here.

4. **Add the structural entry** in `PERSON_EDITORIAL`
   (`src/data/people/editorial.ts`): one `PersonEditorialItem` per key,
   with a stable, globally-unique `id` (`{slug}-{category}-{n}`), the
   `textKey`/`interpretationKey` you just wrote, an optional
   `attributeId` (must be a real `AttributeId`) if there's an
   interpretation, and `sourceIds` — a real subset of that person's own
   `Person.sources` ids (check the person's roster file for what those
   are; never invent a new source id here).

5. **Validate.** Either:
   ```bash
   corepack pnpm@10 exec vitest run src/core/people/editorialValidation.test.ts
   ```
   or call `validateEditorial(SEED_PEOPLE)` directly — it checks: no
   duplicate item ids (roster-wide), every `textKey`/`interpretationKey`
   resolves to real, non-empty `EDITORIAL_EN` text, every `attributeId`
   is real, every `sourceId` is one of that person's own sources. Zero
   issues = clean. `editorialCoverageStats(SEED_PEOPLE)` reports
   aggregate counts including Korean-translation coverage.

6. **Check it renders.** `pnpm dev` (or `next build --webpack && next
   start`), visit `/en-US/people/<slug>` and `/ko-KR/people/<slug>`.
   Confirm: sections appear in the right order (Achievements → Moments →
   Turning Points, each its own divided block), fact and interpretation
   read as clearly distinct, no section renders when it has zero items in
   the current locale.

## What NOT to do

- Don't invent facts not supported by the repository's own evidence for
  that person (`data-pipeline/candidates/`, evidence ledgers, or the
  roster file's own comments) — or, for very well-established figures,
  facts that are uncontested general knowledge consistent with the
  biography already cited in that person's `sources` array. If neither
  applies, leave the person without editorial content rather than guess.
- Don't force a uniform item count across people. Three genuinely strong
  moments beats three achievements + three moments + three turning
  points where half are filler.
- Don't blend interpretation into the fact text. If you find yourself
  writing "which shows he was persistent" inside an achievement sentence,
  move that clause into a separate `interpretationKey`.
- Don't write a diagnostic claim ("this proves she was a perfectionist").
  Use calibrated language: "is consistent with", "helps explain".
- Don't touch `matching_v2`, scoring, `dispersion.generated.ts`,
  calibration anchors, or eligibility to make a profile "more dramatic."
  Editorial content is presentation-only and must never influence
  similarity — same rule as every other metadata field on `Person`.

## Coverage today

Run `corepack pnpm@10 exec tsx src/dev/editorialCoverageAudit.ts` for the
current, live count — this file intentionally does not restate a number
that will go stale. As of this session's close, 10 of 95 people have
editorial content authored (a representative pilot spanning eras,
professions, regions, and evidence-source tiers — see CLAUDE.md's
editorial-content section for exactly which and why).
