-- =============================================================================
-- Stage 10C: historical result fidelity.
--
-- The Phase 10C design audit found the original six Stage 9B/9C provenance
-- columns (quiz/scoring/taxonomy/greatness_scoring/matching/calibration
-- _version) covered most, but not all, of what can change a rendered
-- `/results` output: `ATTRIBUTES[id].reference` (z-scoring), the dispersion
-- table (feeds matching's discriminative weighting), archetype
-- target-shrinkage, and `rules.ts`'s selection functions are all real, live
-- dependencies with their own code-level version constants that were never
-- threaded into `user_profiles`. This migration adds the four missing
-- fixed-code-version columns for completeness/audit-trail (same reasoning
-- as the original six), plus two Phase-10C-specific additions that solve
-- the actual fidelity problem:
--
--  - person_data_version: a computed fingerprint of the person roster
--    (see src/core/people/dataVersion.ts) — NOT a "known shipped version"
--    the way every *_version column above is (there is no allowlist of
--    historical roster hashes), just a live equality check against
--    completion-time state. The roster itself has no version constant
--    anywhere in the codebase; this closes that gap without requiring one.
--  - result_snapshot: the immutable Strategy-A output snapshot (src/core/
--    results/snapshot.ts) — everything /account/results/[id] needs to
--    render WITHOUT ever calling scoreQuiz/buildResultSet/
--    computeGreatnessPotential/the interpretation selectors again. Only
--    ever written once, by src/lib/results/saveCompletedResult.ts's
--    existing `ON CONFLICT (user_id, result_token) DO NOTHING` upsert —
--    there is no UPDATE path anywhere in the application that could
--    overwrite a stored snapshot.
--
-- All seven new columns are additive and nullable: existing rows (written
-- before this migration) get NULL throughout. No backfill is performed by
-- this migration — see docs/phase10-provisional-checkpoint.md's Stage 10C
-- record for the explicit, separately-confirmed one-time backfill plan for
-- the rows that predate this migration.
-- =============================================================================

alter table user_profiles
  add column reference_version text,
  add column dispersion_version text,
  add column archetypes_version text,
  add column interpretation_version text,
  add column person_data_version text,
  add column result_snapshot jsonb;

-- Hardened (2026-08, pre-migration review): CHECK constraints treat NULL as
-- PASS, not fail — the original `result_snapshot ->> 'key' = 'x'` form is
-- unsafe because `->>` on a non-object jsonb value (an array, string,
-- number) or on an object missing the key returns SQL NULL, and
-- `NULL = 'x'` is NULL, which a CHECK constraint accepts. A malformed
-- object missing snapshotSchemaVersion entirely, or a non-object jsonb
-- value, would silently pass the original constraint. Fixed by requiring
-- jsonb_typeof = 'object' AND explicit key existence (the `?` operator,
-- which returns a real boolean, never NULL) before comparing the value.
alter table user_profiles
  add constraint result_snapshot_schema_check check (
    result_snapshot is null
    or (
      jsonb_typeof(result_snapshot) = 'object'
      and result_snapshot ? 'snapshotSchemaVersion'
      and result_snapshot ->> 'snapshotSchemaVersion' = 'result_snapshot_v1'
    )
  );

-- Whenever a result_snapshot is present, it was written by
-- saveCompletedResult.ts's single write path, which ALWAYS populates all
-- five of these alongside it (never one without the others) — this check
-- enforces that real application invariant at the database layer too, so a
-- future code regression that wrote a snapshot without full provenance
-- would fail loudly at write time instead of silently shipping a
-- snapshot nothing can be honestly cross-checked against. Legacy rows
-- (result_snapshot IS NULL) are completely unaffected — the OR short-
-- circuits true for every row written before this migration.
alter table user_profiles
  add constraint result_snapshot_provenance_check check (
    result_snapshot is null
    or (
      reference_version is not null
      and dispersion_version is not null
      and archetypes_version is not null
      and interpretation_version is not null
      and person_data_version is not null
    )
  );
