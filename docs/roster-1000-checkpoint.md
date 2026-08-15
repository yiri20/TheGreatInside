# Roster 1,000 expansion — checkpoint

**Read this file, plus `CLAUDE.md`, before doing any further roster-1000
work in a fresh session.** This is the durable resume point per the
workstream's own resumability requirement — a new session should be able
to continue from here without repeating finished work or re-deriving
already-made decisions.

**Branch: `scale/roster-1000`.** Never merged to `main`. Do not merge
without explicit user approval.

**Status as of this checkpoint (2026-08): infrastructure phase complete.
Zero new people have been sourced or scored yet.** This is stated
plainly and is not a partial/hidden result — see "What has NOT been
done yet" below for exactly why, and "Exact next steps" for how to
continue.

## Commits on this branch so far

1. `b9c2492` — Compact client-safe people index (bundle-size architecture
   fix). See "1. Bundle-size architecture fix" below.
2. (this checkpoint's own commit, see the end of this session) — scoring
   rubric, data-quality gates, this checkpoint file.

## 0. Baseline audit (verified directly from source, not assumed)

At branch creation, HEAD was `5f7b7f1` (production `main` after the
Google Search Console verification tag). Confirmed directly:

- **35 people** (`src/data/people/seed.ts`: 10, `roster2.ts`: 25).
- **34 traits, 7 facets** (`ATTRIBUTE_IDS.length`, `FACETS.length` in
  `src/core/attributes/attributes.ts`).
- Versions: `taxonomy_v1.1`, `quiz_v2`, `reference_v3`, `dispersion_v1`,
  `matching_v2`, `calibration_v3`, `greatness_v1`, `scoring_v1`,
  `archetypes_v1`, `interpretation_v1` — every one confirmed by grepping
  the actual exported constants, matching the expected baseline exactly.
- **80 sitemap URLs, 70 Person pages, all SSG** — confirmed via
  `sitemapEntries.test.ts` and a production build.
- `Person.externalIdentity.wikidataId` **already exists** in the schema
  (`src/core/types.ts`) — Part 3's "stable identifiers" requirement is
  already structurally supported; 5 of 35 people currently have it
  populated (verified external identity, per `CLAUDE.md`'s "External
  identity & media metadata" section).
- `evaluateMatchEligibility` (`src/core/matching/similarity.ts`) is
  **already computed, not hand-set**: min 18 scored attributes, min
  average confidence 0.55, min coverage 0.6, status in
  `{"approved","published"}`. This gate applies automatically to any
  new candidate — nothing new needed here.
- `PersonStatus` exists on the type but `builder.ts`'s `build()`
  **unconditionally stamps `status: "published"`** — i.e., in this
  architecture, "committed to a `src/data/people/*.ts` roster file"
  already IS "published, statically paged, sitemap-indexed." There is
  no separate runtime index-eligibility toggle, and this checkpoint
  deliberately does not add one — see §4 below for why staging outside
  `SEED_PEOPLE` is the correct mechanism instead.

## 1. Bundle-size architecture fix (DONE, commit `b9c2492`)

**Real finding, not theoretical**: `SEED_PEOPLE` (the full `Person[]` —
every trait, source, and editorial string) was imported directly into
two `"use client"` components (`PeopleDirectoryClient.tsx`,
`QuizClient.tsx`). Measured on a production build: a **54.6KB** client
chunk at 35 people, scaling roughly linearly — a naive 1,000-person
roster would have shipped roughly **1.5MB** to every visitor of the
People directory and the Quiz.

**Fixed**: `src/core/people/personIndex.ts` defines `PersonIndexEntry`,
a strict subset of `Person` containing only what `explorer.ts`'s
search/filter/sort and `personDataFingerprint`'s provenance hashing
actually read — never `sources`, `doNotCopyKeys`, explanation keys,
`externalIdentity`, or the portrait license chain.
`src/dev/generatePeopleIndex.ts` regenerates the frozen, committed
`src/data/people/peopleIndex.generated.ts` snapshot (same discipline as
`dispersion.generated.ts` — **regenerate this after every roster
change**, nothing does it automatically). The two client components now
import `PEOPLE_INDEX` instead of `SEED_PEOPLE`.

**A real sub-bug was found and fixed during this same work**: an
initial draft encoded each person's 34 attributes as verbose objects
(`{attributeId, score, confidence, impact}`) and measured **93.5KB** —
LARGER than the original 54.6KB — because object property-name strings
cannot be minified by terser. Fixed by tuple-encoding attributes
(`[attributeId, score, confidence, impact]`, matching this project's
own existing `Row` tuple convention in `builder.ts`). Final measured
chunk: **56.5KB**, with zero leak of full-detail-only fields (verified
directly against the minified build output, not assumed) — now
essentially flat regardless of `sources`/editorial-content growth,
which is the property that matters for scaling to 1,000.

Locked by `src/core/people/personIndex.test.ts` (7 tests, including a
structural grep-the-real-source guard that both client files never
import the full dataset).

**Person detail pages, Results, Compare, the sitemap, and OG image
generation are all Server Components and were never affected** — they
continue to import the full `SEED_PEOPLE` directly, zero client-bundle
cost.

Verified: `tsc` clean, `vitest` 508/508 (501 baseline + 7 new), full
Playwright 215/215, production build clean, all 70 Person pages +
People + Quiz still SSG, route table unchanged.

## 2. Scoring rubric (DONE — `docs/scoring-rubric-v1.md`)

Formalizes the scoring methodology already implicit in how the current
35 people were built (visible in `seed.ts`/`roster2.ts`'s inline
evidence comments). Covers: why score and confidence are separate
fields; what counts as evidence per `evidenceType`; confidence bands;
score bands with an explicit "the more extreme the score, the stronger
the evidence must be" rule (a single anecdote caps at the 71-84/16-29
band, never 85+); how to handle contradictory evidence; the concrete
anti-patterns named in the roster-expansion brief (halo effect, fame=
high score, success=high score, eccentric-anecdote=extreme score, one
quote determines a trait, occupational stereotype, biography-tone
determines score) with the fix for each; the ancient/medieval
evidence-discipline exception (unchanged from the existing 18-22/30
pattern); and the exact shape of a completed evidence-manifest entry a
future pipeline batch should produce.

**Not yet exercised against a real candidate** — this is the written
methodology, ready for the next session's actual sourcing work to
follow.

## 3. Data-quality gates (DONE — `src/core/people/rosterQuality.ts` +
## `rosterQuality.test.ts`)

Pure, testable gate functions, run against the CURRENT 35 as a baseline
(all pass cleanly, confirming the gates aren't miscalibrated against
known-good data) and against deliberately-broken fixtures (confirming
they actually catch real defects):

- `findDuplicates` — duplicate slug/id/Wikidata-QID detection.
- `validateChronology` — deathYear-before-birthYear, isLiving+deathYear
  contradictions, implausible year ranges.
- `validateTraitBounds` — score/confidence range checks, duplicate
  attribute entries.
- `meetsContentQualityFloor` — the Part 15/16 "no thin SEO pages" gate:
  non-empty `impactDomains`, at least one source, at least 18 scored
  attributes, non-empty name/occupation. Checked against fields the
  Person page ALREADY renders — not an invented new requirement.
- `runRosterQualityGates` — runs everything in one pass, the function a
  future pipeline batch step should call.

**Deliberately does NOT add a new `isIndexEligible` field to `Person`.**
Because `build()` always stamps `status: "published"` and page/sitemap
generation has no status filter, "committed to `SEED_PEOPLE`" already
means "publicly paged and indexed." The correct gate mechanism is
therefore: **a candidate must pass every gate in `rosterQuality.ts`
BEFORE it is ever written into a committed roster file** — held/
rejected candidates stay in pipeline-only staging data (see §4), never
imported into `SEED_PEOPLE`. This needed no schema change.

13/13 tests passing.

## 4. What has NOT been done yet (honest, explicit)

- **Zero new candidates sourced.** No candidate list, no evidence
  manifests, no new person committed anywhere on this branch.
- **No candidate staging file/directory format has been created yet** —
  the next session's first job (see "Exact next steps") is to decide
  and create this (e.g. `data-pipeline/candidates/` or similar,
  gitignored for raw source caches but NOT gitignored for the
  structured, reviewed candidate/evidence JSON itself, matching Part 5's
  "temporary source caches should be gitignored" instruction precisely
  — the STRUCTURED data is not a temporary cache and should be
  committed for resumability).
- **No portrait sourcing has started** (§7 below covers the Part 17
  audit that WAS done; actual sourcing is separate, not started).
- **No candidate-discovery pass has been run** — no list of ~1,200-1,500
  candidate names/QIDs exists yet, so diversity-gap analysis (Part 4)
  has not been performed against anything concrete yet (only the
  EXISTING 35's composition is known, from the already-published
  "Seed dataset" section of `CLAUDE.md`).

This is a deliberate, honest stopping point, not an oversight: sourcing
and scoring real historical figures with genuine evidence rigor (per
the rubric above) is real, non-mechanical work that deserves focused
sessions of its own, not a rushed tail-end of the infrastructure work.
Given the workstream's own explicit resumability requirement and
"quality outranks an arbitrary count" instruction, building solid
infrastructure first and honestly reporting zero fabricated people is
the correct choice over any shortcut that would produce faster-looking
but lower-quality output.

## 5. Baseline statistics at n=35 (Part 11's own required first step)

Fresh 10,000-profile simulation, run this session
(`corepack pnpm@10 exec tsx src/dev/simulate.ts 10000 quiz`):

```
Profile Match (all)    n=340000  min=5  p10=23 p25=32 med=44 p75=57 p90=69 max=94  mean=45.05 sd=17.33
Profile Match (top 1)  n=10000   min=44 p10=64 p25=70 med=78 p75=84 p90=89 max=94  mean=76.8  sd=9.3
Greatness Potential    n=10000   min=7  p10=34 p25=46 med=58 p75=70 p90=80 max=98  mean=57.37 sd=17.4

#1 match frequency (domination check), top entries:
  p_warren_buffett      17.0%
  p_rosalind_franklin   14.0%
  p_benjamin_franklin   10.8%
  p_leonardo_da_vinci    5.6%
  ...
  p_rumi                 0.0%
```

Matches `CLAUDE.md`'s already-documented Phase 6.6 Stage 7 figures
exactly (max #1 frequency 17.0%, Warren Buffett) — confirms nothing has
silently drifted since that record was written. **This is the
"establish baseline statistics at 35" step Part 11 requires before any
new-roster dominance analysis can be meaningfully compared.** Re-run
this exact command at every future gate (100/250/500/1,000) and compare
against this snapshot — do not guess whether dominance/concentration
changed, measure it.

No guardrail thresholds are set yet beyond the existing, already-
justified 20%-at-n>=30 rule (Phase 0's own threshold, still the only
one with real justification behind it). Part 11 explicitly says not to
hardcode a new arbitrary threshold before inspecting a larger
population — correctly deferred until real data exists at n=100+.

## 6. `matching_v2`/`reference_v3`/`dispersion_v1`/`calibration_v3` — NOT
## touched, correctly not re-versioned yet

Per Part 12: do not assume these need new versions, audit empirically.
**No empirical audit against a larger population has happened yet**
(there is no larger population yet) — so no version bump decision has
been made, correctly. When real candidate data exists at the 100-person
gate, re-run `dispersion-audit.ts`/`sensitivity.ts`/`calibrate.ts` and
decide THEN whether `reference_v4`/`dispersion_v2`/`calibration_v4` are
actually warranted, based on measured drift — never preemptively.

## 7. Portrait architecture audit (Part 17A — DONE, this session)

Audited the CURRENT portrait architecture directly from source (not
assumed):

- **Coverage**: exactly 1 of 35 people (Leonardo da Vinci) has a
  populated `portrait` field (`grep -c "portrait: {" seed.ts
  roster2.ts` → 1, 0).
- **Schema** (`PersonPortrait`, `src/core/types.ts`): `url`, optional
  `width`/`height`, `source`, `license`, optional `licenseUrl`/
  `attribution`/`attributionUrl`. Already has a full provenance chain —
  no schema change needed for Part 17B's provenance requirements.
- **Rendering**: plain `<img>` tags (NOT `next/image`) in both
  `PersonCard` (`src/ui/components/data.tsx`) and `IdentityHero`
  (`src/ui/components/layout.tsx`) — confirmed by grep, and confirmed
  `next.config.mjs` has no `images.remotePatterns` config at all, since
  it's never needed for plain `<img>`. This means remote hosting (e.g.
  Wikimedia Commons) already works today with zero additional Next.js
  configuration.
- **Alt text**: deliberately `alt=""` on both — the person's name is
  already announced by the adjacent heading, so the portrait is treated
  as decorative per standard accessibility guidance for redundant
  images. Confirmed intentional (matches the existing pattern
  consistently), not a defect.
- **No-portrait fallback — already well-designed, satisfies Part 17G
  without any change**: `PersonCard` shows a subtle two-letter initials
  placeholder (`aria-hidden`, plain editorial typography, not a "SaaS
  avatar circle"). `IdentityHero` simply omits the entire portrait
  column when absent — the info column takes full width, no broken-
  image box, no generic silhouette. Both are the existing, already-
  shipped, human-approved (Phase 1/Phase 10D) editorial treatment.
- **OG images**: confirmed portrait-independent already — Person OG
  (`app/[locale]/people/[slug]/opengraph-image.tsx`, Stage B) never
  reads `person.portrait`, by design (documented in `CLAUDE.md`'s Stage
  B record specifically because only 1/35 has one). **No change needed
  or made** — Part 17J's "Person-specific OG remains portrait-
  independent unless separately approved" is already satisfied.
- **Client-bundle impact**: `PersonIndexEntry.portraitUrl` (added this
  session, see §1) already carries ONLY the URL, never the license
  chain — Part 17's future portrait expansion will not need any further
  client-bundle work; the architecture from §1 already accounts for it.

**Not yet done** (Part 17A's own "attempt to obtain a defensible
portrait for every existing person" pilot): sourcing/verifying
portraits for the remaining 34 people. This is real per-person research
work (checking Wikimedia Commons license status, identity, resolution,
composition per Part 17D's quality gate) — not started this session,
explicitly deferred to a future session alongside the person-data
pipeline itself, per Part 17H's own "portrait sourcing runs in the same
progression as the roster, does not block roster expansion" framing.

## 8. Exact next steps for a fresh session

1. Read this file, then `CLAUDE.md`, then `docs/scoring-rubric-v1.md`.
2. Confirm branch: `git checkout scale/roster-1000` (do NOT create a
   new branch; do NOT merge to `main`).
3. Decide and create the candidate-staging data format/location (not
   yet decided — see §4). Recommended: a `data-pipeline/candidates/`
   directory, one JSON file per candidate (id, QID if known, discovery
   status, evidence manifest entries as they're produced, gate
   results) — structured data, committed (not gitignored); any raw
   downloaded source HTML/text used only transiently during research
   SHOULD be gitignored.
4. Build a candidate discovery list (target ~1,200-1,500, per Part 4),
   auditing diversity against era/region/domain/gender coverage —
   report gaps honestly rather than forcing quotas.
5. Source and score a first real, modest batch (quality over speed —
   do not rush toward "100" at the expense of evidence rigor) following
   `docs/scoring-rubric-v1.md` exactly, producing real evidence-manifest
   entries per §9 of that document.
6. Run `runRosterQualityGates` (`src/core/people/rosterQuality.ts`)
   against the batch before committing anything to `SEED_PEOPLE`.
7. Only once a batch passes every gate: commit it to a new roster file
   (e.g. `src/data/people/roster3.ts`, following `roster2.ts`'s
   existing pattern), regenerate `peopleIndex.generated.ts`
   (`corepack pnpm@10 exec tsx src/dev/generatePeopleIndex.ts`), re-run
   `simulate.ts 10000 quiz` and compare against §5's baseline, run the
   full test suite + a production build, and commit at that gate.
8. Update this checkpoint file with the new counts/findings before
   ending the session, whether or not the "100" milestone was fully
   reached — an honest partial update is correct; do not leave this
   file stale.

## 9. Known blockers / open questions for a future session

- Candidate-staging file format/location is not yet decided (see step
  3 above) — this is a small, mechanical decision, not a methodology
  question, safe for a future session to make unilaterally following
  the "structured data committed, raw caches gitignored" principle
  already stated.
- No paid data/AI spend has been used or is planned, per the brief's
  own instruction — if this materially limits candidate quality at
  some point, that should be reported honestly (per Part 19), not
  worked around.
- Portrait sourcing (Part 17) has not started; no blocker, just not
  yet begun — see §7.
