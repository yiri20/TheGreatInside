# People Directory taxonomy — reference

Points to source; does not reproduce it. Read
[`src/core/people/directoryTaxonomy.ts`](../../src/core/people/directoryTaxonomy.ts)
directly for the full derivation rationale — this is an orientation map for
"how do I add or move a Directory filter."

## What it is

`directory_taxonomy_v1` (2026-08). The People Directory's filter UI is built
from two axes, kept deliberately separate:

- **Profession/Activity** — `Person.fieldIds` (not `occupationIds` or
  `tagIds`), grouped into `PROFESSION_CATEGORIES`. Only fieldIds used by
  >=2 people in the roster are surfaced as chips.
- **Personality/Trait** — the existing canonical 34-attribute/7-facet
  taxonomy (`src/core/attributes/attributes.ts`), grouped by
  `PERSONALITY_TAXONOMY`. "Person exhibits trait X" reuses the z-score-vs-
  `reference_v3` + `confidence >= 0.5` rule already established by
  `signatureTrait`/`traitConstellation` — this module invents no new
  personality model, only a curated, roster-verified subset of the existing
  one (`traitQualification`, checked live by
  `directoryTaxonomy.test.ts` on every test run, not hand-trusted).

`tagIds` (the old flat, mixed profession/personality/reputation/circumstance
tag list) is untouched — it still powers search, it just no longer backs a
filter control.

## How filtering combines

`src/core/people/explorer.ts`'s `filterPeople`: selections within one axis
OR (`fieldIds` filter, or the new `traitScoreAny` — OR across attributes,
unlike `minAttributeScores`, which ANDs), selections across the two axes
AND, exactly like every other pair of filter facets in that module
(era AND region AND profession AND personality, etc.).

## Where to add or move a filter

1. Add/move the id in `PROFESSION_CATEGORIES` or `PERSONALITY_TAXONOMY`
   (`directoryTaxonomy.ts`).
2. Add the `field.*` (profession) EN/KO label pair in
   `src/core/i18n/{en,ko}.ts` — `attribute.*`/`facet.*` labels already exist
   for every personality trait, nothing to add there.
3. Run `vitest run src/core/people/directoryTaxonomy.test.ts` — it verifies
   completeness, no duplicates, EN/KO coverage, and (for personality) that
   the attribute is still within the live-roster qualifying band.

No UI file (`app/[locale]/people/PeopleDirectoryClient.tsx`) needs to change
for a same-shape addition — it renders both taxonomies generically.
