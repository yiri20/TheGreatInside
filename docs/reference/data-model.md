# Data model — reference

Points to source; does not reproduce it. Read `src/core/types.ts`
directly for exact field shapes — this is an orientation map.

## `Person` (`src/core/types.ts`)

Core identity + scored attributes + metadata. Key groups:

- **Identity**: `id`, `slug`, `canonicalName`, `aliases`, era, sources.
  `isMatchEligible` is **computed** (`evaluateMatchEligibility`), never
  hand-set.
- **Scored attributes** (`PersonAttribute[]`): four fields per attribute
  — `score` (0-100), `confidence` (0-1), `evidenceType` (`documented` |
  `strong_inference` | `inference`), `impact` (`advantage` | `dual_edged`
  | `risk` | `neutral`). See
  [`docs/scoring-rubric-v1.md`](../scoring-rubric-v1.md) for how these
  four fields get populated from evidence.
- **Presentation/search metadata** (must never influence matching —
  enforced by mutation tests): `nationalityCodes`, `regionCode`,
  `tagIds`, `occupationIds`, `historicalPolityKey`, `externalIdentity`
  (Wikidata QID + Wikipedia links), `portrait`, `impactDomains`.
- **Editorial** (`Person.editorial?`, `PersonEditorial`): optional —
  merged in from the `PERSON_EDITORIAL` side-table (see below), not
  stored inline on the roster files.
- **`doNotCopyKeys?`**: curated caution-content keys, deterministic
  fallback exists for people without a curated key.

## Roster storage — where a person actually lives

`src/data/people/`:
- `builder.ts` — `PersonSeed` type + `build()`, the authoring/validation
  layer every roster file uses.
- `seed.ts` — original 10 people + composes `ALL_ROSTERS` (imports
  `roster2.ts`...`roster10.ts`) + merges `PERSON_EDITORIAL` onto the
  result.
- `roster2.ts`...`roster10.ts` — sequential batches, each added by a
  `generateRosterN.ts` script promoting `qa_passed` candidates from
  `data-pipeline/candidates/*.json`.
- `editorial.ts` — `PERSON_EDITORIAL`, keyed by slug. A **side-table**,
  never edited inline into the roster files — see
  [`docs/editorial-content.md`](../editorial-content.md) for why.

## Editorial content types

`PersonEditorialItem` / `PersonEditorial` (`src/core/types.ts`) — three
independently-optional arrays (`achievements`/`moments`/`turningPoints`),
each item structurally separating `textKey` (historical fact) from
`interpretationKey` (calibrated interpretation, optional). Prose itself
lives in `src/core/i18n/editorial.ts` (`EDITORIAL_EN`/`EDITORIAL_KO`),
not inline in the types or the side-table.

## Source-of-truth for evidence

- `data-pipeline/candidates/<slug>.json` — pre-promotion candidate
  research (per-trait `rationale` + `sources` array). Exists for
  roster3–roster10 people.
- `src/dev/roster1000/production/<session>/<slug>/evidenceLedger.json` —
  the richest evidence source where it exists (a handful of the most
  recent sessions only) — discrete, source-cited, trait-blind episodes.
- Inline `//` comments above each scored trait in `seed.ts`/`roster2.ts`
  — the *only* evidence source for the original 35 people (no separate
  JSON exists for them).

**Why source ids are person-scoped, not global**: each person's
`sources` array is the only valid set `editorial.ts`'s `sourceIds` may
reference for that person — never invent or borrow a source id across
people. Enforced by `validateEditorial()`.

## Database (`db/schema.sql` + `db/migrations/`)

Only `user_profiles` is actually read/written by application code today
(RLS: owner-scoped, `user_id = auth.uid()`). Several other tables
(`saved_people`, `user_quiz_sessions`, etc.) exist with RLS defined but
are dormant — schema-only, not part of what actually happens. See
[`docs/checkpoints/production.md`](../checkpoints/production.md) for
what's actually stored per saved result, and
[`docs/reference/matching.md`](matching.md) for why the saved snapshot
is immutable.
