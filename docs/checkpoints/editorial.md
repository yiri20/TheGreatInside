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

## Coverage by evidence tier (as of Batch 6 close)

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | **8** | **0** |
| B (`qa_passed` candidate JSON) | 52 | **52** | **0** |
| C (inline `//` roster-file comments only) | 35 | 6 | 29 |
| **Total** | **95** | **66** | **29** |

359 total items (159 achievements, 136 moments, 64 turning points), 122
with an interpretation, 481 EN / 481 KO keys (100% Korean coverage).

**Tier A and Tier B are both fully editorialized.** The 29 remaining
people are all Tier C — the original `seed.ts` (10 people) +
`roster2.ts` (25 people) roster, whose only evidence source is inline
roster-file comments (no separate candidate JSON or evidence ledger).

## Status: Tier C intentionally NOT started

Per the governing instruction at Batch 6's close, Tier C backfill is
explicitly deferred pending a **product decision** on whether Tier A + B
coverage (66/95, all the people with committed research evidence beyond
bare inline comments) is already sufficient before scoping Tier C work.
This is not a resource/time gap — it's a pending decision.

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
