# Editorial content checkpoint

Compact current status. For "how do I add editorial content for a
person," see [`docs/editorial-content.md`](../editorial-content.md)
(the workflow doc + Editorial Writing Standard v1) — this file is state,
not workflow. For per-batch selection rationale and QA findings, see
[`docs/archive/session-history/editorial-batch-history.md`](../archive/session-history/editorial-batch-history.md).

**Authority for the live number**: run
`corepack pnpm@10 exec tsx src/dev/editorialCoverageAudit.ts` — this
file's numbers are a snapshot as of the end of
`feat/editorial-backfill-batch-6`, not guaranteed current.

## Coverage by evidence tier (as of Batch 7 close)

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | **8** | **0** |
| B (`qa_passed` candidate JSON) | 52 | **52** | **0** |
| C (inline `//` roster-file comments only) | 35 | 16 | 19 |
| **Total** | **95** | **76** | **19** |

388 total items (172 achievements, 143 moments, 73 turning points), 136
with an interpretation, 524 distinct EN editorial keys (100% Korean
coverage maintained). Run
`corepack pnpm@10 exec tsx src/dev/editorialCoverageAudit.ts` for the
live number.

## Status: Tier C is exposure-priority selective, not roster-order

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
19 remaining Tier-C people are now all low-exposure (highest single
#1-match frequency ~2.15%, Simone Biles) — a full second exposure batch
on the same #1-frequency criterion is not obviously justified; if a
further pass happens, the next-strongest remaining signal is
Similar-People-rail in-degree, concentrated in Beethoven (24),
Yayoi Kusama (20), Nikola Tesla (19), Toni Morrison (18), and Hayao
Miyazaki (16) despite their own low direct #1-match frequency.

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

A product decision on Tier C scope, before any further editorial
authoring session.
