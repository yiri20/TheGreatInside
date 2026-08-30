# Editorial content checkpoint

Compact current status. For "how do I add editorial content for a
person," see [`docs/editorial-content.md`](../editorial-content.md)
(the workflow doc + Editorial Writing Standard v1) — this file is state,
not workflow. For per-batch selection rationale and QA findings, see
[`docs/archive/session-history/editorial-batch-history.md`](../archive/session-history/editorial-batch-history.md).

**Authority for the live number**: run
`corepack pnpm@10 exec tsx src/dev/editorialCoverageAudit.ts` — this
file's numbers are a snapshot as of the Remaining-19 Editorial
Completion program's close (`main` `37bfc23`, 2026-08-30), not
guaranteed current.

## Coverage by evidence tier — COMPLETE (95/95)

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | **8** | **0** |
| B (`qa_passed` candidate JSON) | 52 | **52** | **0** |
| C (inline `//` roster-file comments only) | 35 | **35** | **0** |
| **Total** | **95** | **95** | **0** |

**Every roster person now has editorial content.** 504 total items (222
achievements, 187 moments, 95 turning points), 151 with an
interpretation, 834 distinct EN editorial keys, **100% Korean
coverage**. Run `corepack pnpm@10 exec tsx
src/dev/editorialCoverageAudit.ts` for the live number.

Profile V2 sections (`lifeArc`/`complexities`/`legacy`) remain
evidence-gated and asymmetric by design — a section is omitted, not
padded, when the record doesn't support it (e.g. most people have no
`complexities`; a few, like Rumi, have a single `moments` item rather
than the typical 2–3). This is expected, not a gap.

## Remaining-19 Editorial Completion (2026-08, `main` `37bfc23`)

Closed out Tier C — the last 19 people with zero editorial content —
in two exposure-ranked batches, merged as a fast-forward from
`integration/editorial-remaining-19` (5 commits, none squashed:
`c1ed67c` Kusama factual correction, `194d6f3` Batch 1, `fdae862`
Kusama stale-comment cleanup, `cafebd4` Batch 2, `37bfc23` closure
provenance fix).

- **Batch 1** (10): Feynman, Ibn Khaldun, Confucius, Beethoven, Tesla,
  Kurosawa, Biles, S. Williams, Kusama, Miyazaki.
- **Batch 2** (9): Steve Jobs, Socrates, Coco Chanel, Genghis Khan,
  Malala Yousafzai, Bruce Lee, Toni Morrison, Zheng He, Rumi.
- Same evidence discipline as every prior batch: every claim traces to
  a dated, person-specific rationale comment in `roster2.ts`/`seed.ts`,
  verified via a direct fetch of that person's own source — never
  inferred from a source URL's mere presence.
- Bundled in the same lineage: a pre-existing roster-data correction
  (Yayoi Kusama's `isLiving`/`deathYear`, now `1929–2026` — she died
  2026-08-14, independently confirmed via CNN/NPR/Washington Post/ABC
  News/her official site) — a factual fix, not editorial content.
- No `rows` (scored attributes), matching/scoring code, portraits, or
  monetization touched by this program.

**Batch 7 provenance closure (2026-08, same day as Batch 7 itself):** a
follow-up review found Batch 7 had leaned on an "uncontested general
knowledge consistent with cited sources" exception that was too loose —
several items stated specifics (dates, named actors/places, outcomes)
that were not actually in the person's own roster-file rationale, the
only repository-preserved evidence Tier-C people have. Every one of the
29 Batch 7 items was re-verified directly against that rationale text
(via `grep`, not memory): 6 items with no supporting rationale at all
were deleted outright (Turing's two achievements, R. Franklin's
achievement and turning point, Ramanujan's taxicab-1729 moment,
Mozart's child-prodigy achievement); the remaining items were narrowed
to drop invented specifics while keeping what the rationale actually
supports (e.g. Turing's Churchill-letter quote corrected to match the
rationale's own "action this day" wording; B. Franklin's "Cockpit
hearing" claim kept because it's directly named, "Privy Council"/
"Hutchinson letters" dropped because neither is). Item counts above are
post-closure. No Batch 7 claim now relies on outside knowledge alone —
every fact traces to this repository's own preserved rationale text.

## Key Achievements Correction Batch 1 (2026-08, merged to `main`)

A roster-wide semantic audit of the `achievements` category (does each
item genuinely belong there vs. Life Scene/Turning Point/Legacy/
Complexity, and is any career-level achievement missing) flagged the
10 highest-severity/highest-exposure profiles for correction: Jane
Goodall, Mahatma Gandhi, Benjamin Franklin, Srinivasa Ramanujan, Louis
Armstrong, Louis Pasteur, Oprah Winfrey, Wangari Maathai, Julius
Caesar, and Mustafa Kemal Atatürk. For each: misplaced items were
moved to the correct category (e.g. Julius Caesar's and Atatürk's
single-event achievements moved to Turning Points; Louis Pasteur's
career-pivot item moved to a new Turning Point), and missing core
achievements were added, each newly-verified against a directly
inspected, person-specific source (a live Wikipedia fetch already
cited in that person's own `sources` array, or this project's own
`src/dev/roster1000/production/session*/` research files) — never
general knowledge alone. A same-batch follow-up found and fixed a
release-blocking provenance error (Atatürk's Gallipoli item had
carried over a sourceId for an unrelated 1908 episode). Net effect:
382→409 total editorial items (168→183 achievements, 142→149 moments,
72→77 turning points), 100% Korean coverage maintained. Full
per-person disposition, evidence citations, and rejected-claim record:
this session's own transcript (not re-summarized into a separate
archive file, since the branch's own commit messages already carry
the detail — see `git log` on the merge commits for
`feat/editorial-achievements-correction-batch-1`).

## Status: Tier C — CLOSED (was exposure-priority selective, not roster-order)

Batch 6's close deferred Tier C pending a product decision on scope. A
subsequent product audit found non-editorial profiles accounted for
~49% of simulated #1-match outcomes and ~55% of all "Similar People"
recommendation slots — concentrated in the founding roster (`seed.ts` +
`roster2.ts`), which happens to include some of the most recognizable
names in the dataset (Buffett, B. Franklin, Turing, etc.), not obscure
ones. The resulting decision: **rank remaining Tier-C people by
measured quiz-simulation exposure (top-1/top-3 match frequency +
Similar-People in-degree), not fame or roster order, and backfill in
exposure-ranked batches** rather than either "all 29" or "none."

**Batch 7 (2026-08)** backfilled the top 10 by this ranking: Alan
Turing, Warren Buffett, Rosalind Franklin, Jane Goodall, Benjamin
Franklin, Srinivasa Ramanujan, Oprah Winfrey, Wangari Maathai, Wolfgang
Amadeus Mozart, Mahatma Gandhi. Effect (same simulation basis,
before → after): non-editorial #1-match exposure ~49.3% → ~9.9%;
Similar-People-rail slots pointing to a thin profile ~55% → ~27%. The
remaining 19 were all low-exposure (highest single #1-match frequency
~2.15%, Simone Biles) — closed in two further batches (see "Remaining-19
Editorial Completion" above), by the same Similar-People-rail
in-degree signal where #1-frequency alone was flat: Beethoven (24),
Yayoi Kusama (20), Nikola Tesla (19), Toni Morrison (18), and Hayao
Miyazaki (16) among the highest. **Tier C is now 35/35 — this whole
section is historical record, not an open status.**

## Architecture invariants (durable, see `docs/editorial-content.md` for the full version)

- Editorial content is a side-table (`src/data/people/editorial.ts`),
  merged onto `SEED_PEOPLE` by slug — never edits the 11 roster files
  `matching_v2`/scoring/eligibility depend on.
- Fact (`textKey`) and interpretation (`interpretationKey`) are
  structurally separate fields, never blended into one string.
- Korean localization is **locale-strict** (`editorialText()`), unlike
  most of this codebase's English-fallback pattern — an item without a
  Korean translation is simply omitted on `/ko-KR`, never shown
  untranslated.
- Editorial content is presentation-only and must never influence
  `matching_v2`/scoring/eligibility — verified every batch via
  `git diff` scope against `src/core/matching`/`src/core/attributes`/
  every roster file (must be empty).

## Next recommended step

None outstanding — editorial coverage is complete (95/95). Any further
editorial work (e.g. a normalization/consistency pass across
achievement wording, or broader Complexity coverage) is a new,
separately-scoped initiative, not a continuation of this program.
