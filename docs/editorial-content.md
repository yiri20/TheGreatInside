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
   turning_point}.{n}` (1-indexed per category). Follow **"Editorial
   Writing Standard v1" below** — concrete, specific, economical (2-3
   sentences), no generic "this shows their determination"-style filler,
   and the fact/interpretation/causality discipline that section spells
   out in detail. If you write an interpretation, key it
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

## Editorial Writing Standard v1

Formalized 2026-08 after a full item-by-item QA pass over the 10-person
pilot (`feat/editorial-qa-pilot`) found the episode SELECTION was sound
throughout, but roughly a third of the pilot's interpretation sentences,
and two of its bare facts, blurred fact and interpretation or overstated
causality. Every rule below traces to a real thing found and fixed in
that pass, not a hypothetical concern. This standard governs the
remaining 85-person backfill — read it before writing new content, and
re-read it before reviewing someone else's.

**The central risk is not fabricated dates. It is overinterpretation** —
a documented event quietly becoming a confident personality-causal
claim. Watch specifically for "his stubbornness caused…", "the same
trait that produced X also caused Y…", "this proves she was…". These
read as elegant, satisfying prose. That is exactly why they're risky:
elegance is not evidence.

### Historical fact (`textKey`)

- Source-grounded, concrete, concise (2–3 sentences).
- Must remain fully defensible **even if its interpretation were
  deleted**. If a fact sentence only makes sense alongside its
  interpretation, the interpretive clause has leaked into the fact —
  move it out. (Found and fixed in the pilot: a da Vinci moment whose
  fact text asserted "the same restlessness that fed his range also
  left his output unfinished" with no `interpretationKey` at all — a
  personality-causal claim presented as bare fact.)
- State the SOURCE TYPE honestly when it matters to how much weight the
  claim can bear. "Recorded in contemporary chronicles" and "recorded in
  testimony given twenty-five years later at a rehabilitation trial" are
  different claims — say which one it actually is. (Found and fixed: a
  Joan of Arc moment mis-described 1455–56 Nullification Trial testimony
  as "contemporary chronicles.")
- When the underlying trait score's own rationale flags an episode as
  lower-confidence or tradition-based rather than firmly documented, the
  editorial fact should carry the same hedge — "Biographical accounts
  describe…" — not silently upgrade to unqualified certainty. (Found and
  fixed: a Frida Kahlo moment stated flatly what the person's own
  attribute-score rationale had flagged as "more biographical tradition
  than firmly documented.")

### Interpretation (`interpretationKey`)

- Explicitly interpretive, calibrated ("is consistent with", "helps
  explain", "illustrates", "offers one example of", "sits alongside") —
  never "proves", "shows he was", or any diagnostic phrasing.
- No unsupported causality. Before writing "the same X that helped Y
  also caused Z," check: is X actually evidenced in BOTH episodes, or is
  this stitching two only-loosely-related life events into a
  rhetorically neat story? A historian should be able to read the
  sentence as one reasonable interpretation among others, not as an
  established causal chain. When the underlying history is genuinely
  contested or multi-causal (a military career and a later political
  crackdown, say), say so explicitly rather than reducing it to one
  trait. (Found and fixed: an Atatürk turning point whose FACT text
  itself asserted his Gallipoli decisiveness "drove" a later political
  crackdown — the single most serious violation found in the pilot,
  rewritten to frame the connection explicitly as this profile's own
  reading, alongside the other real historical factors, not as a proven
  mechanism.)
- Get the underlying subject-matter facts right before interpreting them.
  A "kept him from engaging with X" framing is only fair if the person
  in fact didn't engage with X — check this like any other factual claim.
  (Found and fixed: an early draft implied Einstein was simply "kept
  from" quantum mechanics by his own convictions, when he co-founded
  quantum theory and his later objections, especially the 1935 EPR
  paper, were themselves foundational to the field. Corrected to state
  what's actually true: he never accepted its probabilistic account as
  *complete*, which is a narrower and more accurate claim.)
- Not every item needs one. A lower interpretation percentage is fine —
  the pilot sits at 15/53 (28%), and several of the strongest items
  (Marie Curie's radioactive notebooks, Pavlova's pet swan) carry no
  interpretation at all because the fact speaks for itself.
- Vary the opening construction. "This is consistent with the profile's…"
  and "This helps explain the profile's…" are both legitimate, but using
  only those two across every interpretation in a profile — or across
  every profile — reads as template voice rather than a considered read
  of this specific person. The pilot now spreads 15 interpretations
  across 9 distinct openers, none repeated more than 3 times.

### Anecdotes / moments

- Must be character-revealing, not trivia. Test: if the interpretation
  line were deleted, is the episode still interesting on its own? Every
  pilot moment passed this test after QA — none needed to be cut, only
  reframed.
- Provenance-sensitive: a famous, oft-repeated anecdote is fine to use,
  but state what kind of source it actually rests on (see "Historical
  fact" above) rather than implying stronger contemporaneity than the
  citation supports.

### Turning points

- Require a real shift — in trajectory, role, worldview, standing,
  method, relationships, opportunity, or constraint. Not every dramatic
  event qualifies. A thin candidate (Ada Lovelace's meeting with Babbage
  at 17) was kept but tightened to make the actual "before → after"
  shift explicit, rather than left as a vague origin note.

### Strength / trade-off framing

- No forced symmetry. "The same intensity that drove her performance
  also showed up as jealousy" sounds good but often imports a general
  characterization ("decades of excellence") to prop up one isolated
  episode that doesn't, on its own, demonstrate the positive half of the
  claim. Prefer letting the single episode stand on its own dual-edged
  terms rather than reaching for an external claim to pair it with.
  (Found and fixed: Anna Pavlova's stage-partner slap no longer claims
  to be driven by "the same intensity" behind her career; it's now
  interpreted as a moment where that intensity showed up as jealousy
  *rather than* channeling into performance — asymmetric, and more
  honest.)
- Where a symmetric claim IS well-supported — both halves independently
  evidenced from the same specific record, not stitched from distant
  events — it's fine to keep (Joan of Arc's resistance-to-pressure
  reading both her interrogation and her clothing charge, both drawn
  from the same trial record, survived QA essentially unchanged).

### Localization

- Semantic parity, not literal translation: EN and KO must agree on the
  historical claim, degree of certainty, causality, interpretation, and
  chronology — they do not need sentence-for-sentence equivalence.
  Every causality fix made during this QA pass was applied to BOTH
  languages in the same edit, never English-only.
- Natural Korean over transplanted English sentence shape — watch
  specifically for em-dash-interrupted asides breaking a Korean
  particle's attachment to its noun, which reads as translated rather
  than composed. A consistent, deliberate choice to use "그" rather than
  "그녀" for every pilot subject regardless of gender was reviewed and
  kept — it's coherent throughout, matches a real, legitimate
  contemporary Korean style option, and is not a translation artifact.

### Deletion rule

Weak or redundant content should be deleted, not padded to hit a quota.
In practice, this pilot's QA pass found the episode selection itself was
already sound in all 53 items — every fix was a rewrite (tightening a
causal claim, correcting a provenance description, moving an
interpretation to its correct anchor, diversifying an opening phrase),
not a deletion. That is a real, checked outcome, not an assumption: if a
future QA pass finds an item that fails the "still interesting without
its interpretation" test, or a turning point with no real trajectory
shift, remove it rather than keep it for the count.

## Automated QA guardrails

`src/core/people/editorialValidation.ts`'s `validateEditorial()` checks,
in addition to the structural guards described above:

- **Banned diagnostic language** (`findBannedLanguageIssues`) — a short,
  deliberately narrow regex list ("this proves…", "was diagnosed with…",
  "suffered from depression…", clinical/personality-disorder phrasing)
  applied to every fact and interpretation string. This is NOT an
  attempt to score prose quality or historical truth with keywords —
  it's a tripwire for the one class of language CLAUDE.md's "Safety"
  section already says must never appear anywhere in this product.
- **Forced-symmetry-in-a-bare-fact** — flags a `"the same X that…
  [caused/drove/produced/led to/enabled/prevented/kept … from/made …]"`
  construction landing in an item's fact text when that item has NO
  `interpretationKey`. This is the exact, specific bug class found twice
  in the pilot (da Vinci, Atatürk) — a personality-causal claim smuggled
  into what's presented as plain historical fact. It deliberately does
  NOT fire on interpretation text, where the same phrase is a legitimate
  (if worth using sparingly) interpretive device.

**Deliberately NOT automated, and not attempted**: whether an
interpretation is semantically well-matched to the episode it's attached
to (the Ada Lovelace bug this QA pass found — an `interpretationKey`
describing a different episode than the item it was attached to — was
caught by a human reading every item closely, not by any tool); whether
a causal claim is historically well-supported; whether prose reads as
generic or template-voiced. These require actual judgment. Budget a full
human read-through, item by item, before trusting a pilot or a backfill
batch as a template — the tooling catches structural regressions, not
editorial quality.

## Coverage today

Run `corepack pnpm@10 exec tsx src/dev/editorialCoverageAudit.ts` for the
current, live count — this file intentionally does not restate a number
that will go stale. As of this session's close, 10 of 95 people have
editorial content authored (a representative pilot spanning eras,
professions, regions, and evidence-source tiers — see CLAUDE.md's
editorial-content section for exactly which and why).
