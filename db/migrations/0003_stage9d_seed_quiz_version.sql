-- =============================================================================
-- Stage 9D — seed the one quiz_versions row user_profiles' FK requires
-- (Phase 9, 2026-08)
--
-- ROOT CAUSE, confirmed live (not guessed): the first successful end-to-end
-- OAuth + pending-result save attempt failed at the very last step —
-- exchangeCodeForSession, RLS, and the auth pipeline all worked correctly —
-- with Postgres error 23503 (foreign_key_violation):
--
--   insert or update on table "user_profiles" violates foreign key
--   constraint "user_profiles_quiz_version_fkey"
--   Key is not present in table "quiz_versions".
--
-- `quiz_versions` has existed in db/schema.sql since Stage 9A/9B (it
-- predates Phase 9 — user_profiles.quiz_version has always referenced it),
-- but — like every other canonical-data table (attributes, people,
-- quiz_questions, ...) — it was never seeded, by design: this project
-- deliberately keeps canonical quiz/attribute/people data in TypeScript,
-- not the DB (see CLAUDE.md "People explorer" / "Static generation, no DB
-- yet"). Phase 9's account tables are the first thing that actually
-- INSERTS into `user_profiles`, so this is the first time the FK's absence
-- became reachable at all — not a regression, not a skipped step.
--
-- This is the ONE exception to "no seed data in schema.sql": not seeding
-- canonical business data (that stays deferred, unchanged), but satisfying
-- a structural FK dependency Phase 9's own save path requires to function.
-- Values below are read directly from source, not invented:
--   QUIZ_VERSION      = "quiz_v2"        (src/core/quiz/bank.ts)
--   TAXONOMY_VERSION  = "taxonomy_v1.1"  (src/core/attributes/attributes.ts)
--   SCORING_VERSION   = "scoring_v1"     (src/core/quiz/scoring.ts)
-- `published_at` has no TS-side equivalent for this project's dataset, so
-- it's deliberately left NULL rather than fabricating a timestamp.
-- =============================================================================

-- ON CONFLICT DO UPDATE (not DO NOTHING): idempotent for a safe rerun, AND
-- keeps this row aligned with the canonical source values above if this
-- file is ever rerun after they change, rather than silently leaving a
-- stale row in place. published_at is deliberately left out of the SET
-- clause — untouched either way, since it isn't derived from any TS source.
insert into quiz_versions (version, taxonomy_version, scoring_version, is_active)
values ('quiz_v2', 'taxonomy_v1.1', 'scoring_v1', true)
on conflict (version) do update set
  taxonomy_version = excluded.taxonomy_version,
  scoring_version  = excluded.scoring_version,
  is_active        = excluded.is_active;
