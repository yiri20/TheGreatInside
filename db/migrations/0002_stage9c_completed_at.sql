-- =============================================================================
-- Stage 9C — completion-time provenance column (Phase 9, 2026-08)
--
-- Run this against a project that already has 0001_stage9b_accounts.sql
-- applied. db/schema.sql is updated in the same change to include this
-- column directly, so a brand-new project only ever needs that one file.
-- =============================================================================

-- completed_at is the ACTUAL quiz-completion time, snapshotted client-side
-- (browser clock) at the moment a result was produced — distinct from
-- created_at (Postgres server clock, row-insertion time, possibly much
-- later if an anonymous completion sat in the local pending queue before
-- the user signed in). Deliberately NOT constrained against created_at:
-- an earlier draft of this migration proposed
-- `check (completed_at <= created_at)`, rejected because completed_at
-- comes from a different clock (the browser's) than created_at (the
-- database server's) — ordinary client/server clock skew could fail that
-- constraint even for a genuinely immediate, legitimate save. Plausibility
-- (valid ISO-8601, parseable, not absurdly far in the future) is validated
-- in application code instead — see
-- src/lib/results/saveCompletedResult.ts's `invalid_completed_at` outcome.
-- completed_at is provenance metadata only: never used for authorization,
-- scoring, or matching.
alter table user_profiles
  add column completed_at timestamptz not null default now();
