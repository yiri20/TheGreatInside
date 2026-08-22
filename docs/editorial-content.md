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
that will go stale. As of this session's close, 20 of 95 people have
editorial content authored: the original 10-person pilot (see CLAUDE.md's
editorial-content section for exactly which and why) plus a first 10-person
Tier-B backfill batch (`feat/editorial-backfill-batch-1`) — Isaac Newton,
Harriet Tubman, Wu Zetian, Averroes, Julius Caesar, Jane Austen, Benito
Juárez, Ernest Shackleton, Wole Soyinka, and Elizabeth Blackwell, selected
by ranking the audit tool's `Rich`-tier candidates for episode/word-count
richness first, then choosing for era/region/domain/gender diversity among
the evidence-strongest candidates rather than by fame — see
`docs/roster-1000-checkpoint.md`-style precedent in the batch's own commit
history for the full selection rationale. No new rule was added to Writing
Standard v1 this batch — the pattern that needed correcting (over-repeating
"This is consistent with the profile's X score" as an interpretation
opener) was already covered by the existing "vary the opening construction"
rule above; it was simply under-applied in this batch's first draft and was
caught and fixed during self-review before commit, which is exactly what
that rule anticipates a future author will need to do.

**Correction (Batch 2 session):** this section previously stated "52
Tier-B people remain unbackfilled." That was wrong — 52 is the Tier-B
**total**, not the remaining count; it did not subtract the 12 Tier-B
people already covered by the pilot (2: Albert Einstein, Joan of Arc) and
this batch (10: the nine listed above plus Averroes). The correct,
mechanically-computed figures, cross-referenced by evidence tier (see
`src/dev/editorialCoverageAudit.ts`'s "Editorial-content coverage by
evidence tier" section, added specifically so this can't silently recur):

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | 2 | 6 |
| B (qa_passed candidate JSON) | 52 | 12 | 40 |
| C (inline TS comments only) | 35 | 6 | 29 |
| **Total** | **95** | **20** | **75** |

Tier-C is untouched (6 of its 35 covered, all by the pilot); Tier-A has
6 of 8 remaining. Re-run the audit tool for the current live numbers
rather than trusting this table once it goes stale.

**Batch 2 (`feat/editorial-backfill-batch-2`).** A second 10-person
Tier-B backfill: Charles Darwin, Frederick Douglass, Ibn Sina, Martin
Luther King Jr., Rachel Carson, Hildegard of Bingen, Florence
Nightingale, Umm Kulthum, Sor Juana Inés de la Cruz, and Emmy Noether —
selected the same way as Batch 1 (rank the remaining Tier-B people by
evidence richness, then choose among similarly-strong candidates for
era/region/profession/gender diversity), with a deliberate correction
this round: the top 10 by pure richness were all male, so 6 of the 10
selected instead trade a modest amount of richness (still comfortably
inside the `Rich` bucket, 546-723 words) for real gender/geography/
profession balance — see the batch's own commit history for the full
per-person rationale. All content drawn entirely from each person's
existing `data-pipeline/candidates/*.json` rationale and sources — no
external research. Structural validation clean (0 issues), Korean
coverage 100%, matching/scoring untouched (confirmed: `git diff` against
`src/core/matching`, `src/core/attributes`, and every roster/db file is
empty). Opener diversity was checked DURING authoring, not only at the
end — two internal near-duplicate openers (MLK's and Sor Juana's; Florence
Nightingale's and Emmy Noether's) were caught and rewritten before commit;
the final batch introduces zero repeated interpretation openers of its own
(39 of its 44 distinct 4-word opener prefixes are used exactly once — the
only reused openers in the full 30-person corpus are all pre-existing,
from the pilot/Batch 1).

Corrected, mechanically-computed figures after Batch 2:

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | 2 | 6 |
| B (qa_passed candidate JSON) | 52 | 22 | 30 |
| C (inline TS comments only) | 35 | 6 | 29 |
| **Total** | **95** | **30** | **65** |

171 total items (79 achievements, 61 moments, 31 turning points), 57 with
an interpretation. Re-run the audit tool for the current live numbers.

**Interpretation-count discrepancy, found and resolved before Batch 3
(2026-08).** This section had stated "57 with an interpretation" for the
Batch 2 close, but the individual batch deltas reported along the way
(pilot 15, Batch 1 "+18", Batch 2 "+25") sum to 58, not 57 — an internal
inconsistency in prior reporting, not a live discrepancy in the data
itself. Reconstructed directly from git history
(`git show <commit>:src/data/people/editorial.ts | grep -c
"interpretationKey:"` at each batch's closing commit) rather than
guessed: pilot close = 15 (matches), Batch 1 close = **32** (so Batch 1
actually added **+17**, not +18 as previously reported), Batch 2 close =
57 (so Batch 2's own "+25" was correct, 32+25=57). The one-item error was
in Batch 1's reported delta, not in any count derived from the live code
— `editorialCoverageStats(SEED_PEOPLE).itemsWithInterpretation` has been
57 all along, both before and after this investigation. No content was
altered to make arithmetic match; only this historical narration was
corrected. `editorialCoverageAudit.ts` now also prints `EN editorial
keys`/`KO editorial keys` (distinct `textKey`/`interpretationKey` counts)
alongside the existing item-level stats, and both `editorialCoverageAudit.ts`
and `editorialCoverageStats()` carry internal consistency assertions
(achievement+moment+turningPoint sums to totalItems, interpretation count
never exceeds totalItems, KO key count never exceeds EN key count) so a
future silent arithmetic drift like this one would surface immediately
rather than needing a git-archaeology pass to catch.

**Batch 3 (`feat/editorial-backfill-batch-3`).** A third 10-person Tier-B
backfill: Franz Kafka, Vincent van Gogh, Thomas Aquinas, Maimonides,
Sequoyah, Sojourner Truth, B. R. Ambedkar, Katherine Johnson, Muhammad
Ali, and Mary Wollstonecraft — selected by ranking the audit tool's
remaining Tier-B people by evidence richness first (all ten comfortably
inside the `Rich` bucket, 536-699 words), then choosing among the
richest candidates for era/region/profession/gender/life-trajectory
diversity rather than taking the top 10 by pure word count alone — the
unadjusted top 10 skewed entirely male and heavily Western-European
(Kafka, van Gogh, Wittgenstein, Edison, Aquinas, Michelangelo, Malcolm X,
Wilbur Wright, Maimonides, Copernicus); Sequoyah (the roster's only
Indigenous American profile), Sojourner Truth, B. R. Ambedkar (South
Asia), Katherine Johnson, and Mary Wollstonecraft were selected instead
of Wittgenstein/Edison/Michelangelo/Wilbur Wright/Copernicus for real
diversity gains at only a modest richness cost (still all ≥536 words,
well clear of the 500-word/10-episode Rich threshold). All content drawn
entirely from each person's existing `data-pipeline/candidates/*.json`
rationale and sources — no external research — with one narrow exception
for Thomas Aquinas: his well-known mystical-experience/"straw" turning
point (why the Summa is unfinished) is not stated verbatim in the
candidate JSON's rationale strings (which only note he "left the Summa
unfinished"), but is uncontested general biographical knowledge directly
consistent with, and explaining, that already-cited fact, sourced to his
own cited Wikipedia/SEP entries and hedged as "a widely documented
account holds" — the same "well-established general knowledge" allowance
Writing Standard v1 already carves out, not new research. Opener
diversity was checked mechanically before and after drafting (not just
at the end): of Batch 3's 20 new interpretations, none repeats another
Batch-3 opener, and the only overlaps with the pre-existing 57-item
corpus are four 2-time reuses of a short "The profile's X score" phrase
shape with a different attribute name each time (never a full-sentence
duplicate) — the corpus's actual most-reused near-identical opener,
"This is consistent with the profile's..." (6 uses), belongs entirely to
the pilot/Batch 1/Batch 2 and was not touched or added to by Batch 3.
Structural validation clean (0 issues), Korean coverage 100%, matching
health unaffected (`simulate.ts 10000 quiz` still shows Warren Buffett's
unchanged 12.0% #1 frequency), and `git diff` against
`src/core/matching`, `src/core/attributes`, `db/`, and every roster file
is empty — only `src/core/i18n/editorial.ts`,
`src/data/people/editorial.ts`, `src/core/people/editorialValidation.ts`
(the two new coverage-stat fields), and `src/dev/editorialCoverageAudit.ts`
(the printed fields + consistency assertions) changed.

Corrected, mechanically-computed figures after Batch 3:

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | 2 | 6 |
| B (qa_passed candidate JSON) | 52 | 32 | 20 |
| C (inline TS comments only) | 35 | 6 | 29 |
| **Total** | **95** | **40** | **55** |

232 total items (109 achievements, 85 moments, 38 turning points), 77
with an interpretation, 309 distinct EN keys / 309 KO keys (100%
coverage).

**Batch 4 (`feat/editorial-backfill-batch-4`) — Tier-A editorial coverage
now COMPLETE (8/8).** Unlike Batches 1-3, this batch deliberately did not
simply take the next 10 Tier-B people: it finished all 6 remaining Tier-A
people first (the highest-evidence category, sourced from full
`src/dev/roster1000/production/<session>/<slug>/evidenceLedger.json`
episode ledgers rather than `data-pipeline/candidates/*.json` rationale),
then used the remaining 4 slots on the strongest available Tier-B `Rich`
candidates by the same richness-first selection rule as earlier batches.

Six Tier-A people: Fyodor Dostoevsky, Louis Pasteur, Louis Armstrong,
Akio Morita, Oscar Niemeyer, Aung San Suu Kyi (990-2215 words, 23-45
ledger episodes each — several times richer than any Tier-B/C source).
Four Tier-B people (ranked richest-first among the 20 remaining, all
comfortably `Rich`, 612-674 words): Ludwig Wittgenstein, Thomas Edison,
Michelangelo, Malcolm X — the unadjusted top 4, kept as-is this round
since (unlike Batch 3, which traded richness for diversity) Tier-A's own
six people already delivered the batch's real diversity (three
continents, four professions, two living-memory 20th-century political
figures, the roster's first Southeast Asian and first Japanese
entrepreneurial-builder editorial profiles).

**A real per-episode provenance constraint, not previously encountered at
this scale, shaped every Tier-A item.** Evidence-ledger episodes carry
their own granular `sourceIds` tags (e.g. `"ENCYC"`, `"SEARCH-AGG"`,
`"WIKI"`) that do NOT always correspond to an entry in that person's own
`Person.sources` array — several of the most famous, richest episodes in
the ledgers (Aung San Suu Kyi's Danubyu rifle-walking moment, several of
Oscar Niemeyer's Wikipedia-only-tagged episodes) were found, checked, and
deliberately excluded for exactly this reason: `SEARCH-AGG` and bare
`WIKI` tags on a per-episode basis don't reliably map to a citable,
committed source id, and inventing a citation to keep a good episode
would have violated the same evidence discipline the Aquinas check (below)
enforces. Every item actually authored traces to a `sourceIds` value that
is a real, verified subset of that person's own committed `sources` array
— checked person-by-person against the roster file, not assumed.

**Aung San Suu Kyi's later-life turning point (2015 State Counsellor
tenure through the 2017 Rohingya crisis, her 2019 ICJ defense, and her
2021 arrest) was written with deliberate additional restraint**, given
the subject: every claim traces to an institutional or press source
already in her `Person.sources` (Human Rights Watch, Journal of
Democracy, Al Jazeera's ICJ transcript, Asia Times), her own actions and
words are reported as exactly that (not moralized), no interpretation
sentence was attached to this specific item (permitted — "not every item
needs one"), and where an interpretation WAS attached to her *other*
turning point (the 1988 return), it deliberately mirrors language already
present, reviewed, and approved in her own canonical `conflict_tolerance`
row rationale in `roster10.ts`, rather than introducing a new causal
claim. Omitting this period of her life entirely was considered and
rejected — her own scored attribute rows (`leadership_drive`,
`conflict_tolerance`, `belief_updating`) already draw directly on this
period, so a profile silent about it would be a less complete, not a
safer, account of a documented public record.

**Thomas Aquinas provenance check (before Batch 4 proper began).** Batch
3's closing note flagged the "straw" turning point (his December 1273
mystical experience and cessation of writing) as resting on general
historical knowledge rather than a rationale-string-cited episode. A
narrow check — fetching the one repository-preserved source with a real
URL, `src_aquinas_wikipedia` — found the episode fully supported,
including the same hedging language ("reportedly," "is said to have")
already used in the shipped copy. One real, minor inaccuracy was found
and fixed: the copy stated Aquinas died "four months" after the event;
the source's own stated dates (6 December 1273 to 7 March 1274) put it
at roughly three months. Fixed in both `EDITORIAL_EN` and `EDITORIAL_KO`.
No broader Aquinas research was performed, per instruction.

Corrected, mechanically-computed figures after Batch 4:

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | **8** | **0** |
| B (qa_passed candidate JSON) | 52 | 36 | 16 |
| C (inline TS comments only) | 35 | 6 | 29 |
| **Total** | **95** | **50** | **45** |

286 total items (128 achievements, 108 moments, 50 turning points), 97
with an interpretation, 383 distinct EN keys / 383 KO keys (100%
coverage). Structural validation clean (0 issues,
`validateEditorial(SEED_PEOPLE)`). Matching health unaffected
(`simulate.ts 10000 quiz`: Warren Buffett #1 frequency 12.0%, unchanged
from the pre-batch baseline) — editorial content is presentation-only and
touches no `src/core/matching`/`src/core/attributes`/roster file, confirmed
by `git diff` scope (only `src/core/i18n/editorial.ts` and
`src/data/people/editorial.ts` changed).

**Batch 5 (`feat/editorial-backfill-batch-5`).** An eighth 8-person Tier-B
backfill (a bounded batch, not the full 16 remaining): Wilbur Wright,
Nicolaus Copernicus, Susan B. Anthony, Galileo Galilei, Niels Bohr,
Immanuel Kant, Octavia Butler, and Rabindranath Tagore — selected as the
top 8 of the 16 remaining Tier-B people by the audit tool's own
evidence-richness ranking (612-558 words, all in the `Rich` bucket,
comfortably above ranks 9-16's 501-442 words), a clean cut that happens
to fall exactly on the audit's own Rich/Adequate bucket boundary. Unlike
Batch 3, no richness was traded for diversity this round — the top 8
already spans 6 geographies (US×3, Poland, Italy, Denmark, Germany,
Bengal/British Raj), 5 domains (aviation, astronomy, activism, physics,
philosophy, literature×2), the Renaissance through the 20th century, and
2 women among 8, so no swap was needed. All content drawn entirely from
each person's existing `data-pipeline/candidates/*.json` rationale and
`sources` array (cross-checked against each person's live `roster*.ts`
`sources` field before writing, not assumed identical) — no external
research. Octavia Butler deliberately shipped with an asymmetric shape (1
achievement, 3 moments, 0 turning points) rather than a forced turning
point: her strongest evidence (day-job years, dated notebook
affirmations, the Clarion workshop) never resolves into one specific,
dated before/after trajectory shift, so no turning point was written for
her, per the "some profiles may deserve fewer items" instruction. Opener
diversity was checked mechanically before commit: of Batch 5's 15
interpretations, all 15 use a distinct 4-word opening phrase, with zero
overlap against the pre-existing corpus's own most-reused openers ("This
is consistent with", 6 uses corpus-wide, unchanged and not added to by
Batch 5). Structural validation clean (0 issues), Korean coverage 100%,
matching health unaffected (`simulate.ts 10000 quiz`: Warren Buffett #1
frequency 12.0%, unchanged), and `git diff` against `src/core/matching`,
`src/core/attributes`, `db/`, and every roster file is empty — only
`src/core/i18n/editorial.ts` and `src/data/people/editorial.ts` changed.

Corrected, mechanically-computed figures after Batch 5:

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | **8** | **0** |
| B (qa_passed candidate JSON) | 52 | **44** | **8** |
| C (inline TS comments only) | 35 | 6 | 29 |
| **Total** | **95** | **58** | **37** |

326 total items (143 achievements, 126 moments, 57 turning points), 112
with an interpretation, 438 distinct EN keys / 438 KO keys (100%
coverage). The 8 remaining Tier-B people (Aristotle, Simón Bolívar, Grace
Hopper, C. V. Raman, Benjamin Banneker, Fela Kuti, Toussaint Louverture,
Chinua Achebe — Aristotle/Bolívar in the `Rich` bucket, the other 6 in
`Adequate`) are the natural Batch 6 pool. Re-run the audit tool for the
current live numbers rather than trusting this table once it goes stale.
