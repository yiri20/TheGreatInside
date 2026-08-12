-- =============================================================================
-- Stage 9B — accounts foundation migration (Phase 9, 2026-08)
--
-- Run this ONCE against a project that already has db/schema.sql's original
-- DDL applied (as opposed to a brand-new project, which should just run the
-- current db/schema.sql directly — that file has been updated in the same
-- change to already include everything below, so the two never drift).
--
-- Completes the FK/RLS/dedup design db/schema.sql's user_* tables already
-- anticipated. See docs/phase9-provisional-checkpoint.md ("Existing data
-- model") for the plan this migration implements.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- user_profiles: real FK, dead anonymous column dropped, dedup column added.
--
-- Every row from here forward represents ONE COMPLETED quiz result owned by
-- ONE signed-in user. Per the corrected Phase 9 migration rule, in-progress
-- drafts (tgi_quiz_draft_v1) never reach the DB, and there is no
-- anonymous-write path anywhere in this product's actual design (the entire
-- anonymous flow is URL-token + localStorage, built in Phase 6). anonymous_key
-- was provisioned for a server-side anonymous-session concept this project
-- never built and, under Phase 9's actual scope, never will — dropped rather
-- than kept as permanent dead weight (this table has zero rows at the time
-- this migration runs, so the drop is lossless).
-- ---------------------------------------------------------------------------
alter table user_profiles drop column anonymous_key;

alter table user_profiles
  alter column user_id set not null,
  add constraint user_profiles_user_id_fkey
    foreign key (user_id) references auth.users(id) on delete cascade;

drop index if exists user_profiles_user_idx;
create index user_profiles_user_idx on user_profiles(user_id);

-- The content-addressable result token (src/core/quiz/serialize.ts,
-- `encodeResultToken` — "{quizVersion}.{encodedAnswers}") IS the natural
-- dedup key: same answers -> same token, always, by construction. Storing
-- the EXACT string already used everywhere else in the app (the `?r=` query
-- param, the `tgi_last_result_v1` localStorage value) rather than
-- re-deriving a compound key avoids any risk of divergent dedup semantics
-- between the client and the DB. The token already embeds quiz_version as
-- its own prefix, so (user_id, result_token) alone is a strictly stricter
-- dedup key than the checkpoint's conceptual (user_id, quiz_version,
-- encoded_token) — quiz_version stays as its own column regardless, for
-- cheap filtering/reporting without decoding the token.
alter table user_profiles
  add column result_token text not null;

create unique index user_profiles_user_dedup_idx
  on user_profiles(user_id, result_token);

-- ---------------------------------------------------------------------------
-- saved_people: never had an FK to any auth table. Added now for the same
-- reason user_profiles.user_id got one — referential integrity on account
-- deletion (a future Stage 9F cascade-delete depends on this), not just RLS.
-- RLS alone (below) is sufficient for row-level access control without the
-- FK, but without it a deleted auth.users row would leave orphaned
-- saved_people rows forever.
-- ---------------------------------------------------------------------------
alter table saved_people
  add constraint saved_people_user_id_fkey
    foreign key (user_id) references auth.users(id) on delete cascade;

-- =============================================================================
-- Row Level Security — every user_* table and saved_people, scoped to
-- auth.uid(). A single `for all` policy per table: `using` gates which
-- existing rows are visible/mutable, `with check` gates what a write is
-- allowed to produce, and for every table here both conditions reduce to the
-- identical "this row belongs to me" test — a split per-verb policy set
-- would only repeat the same rule four times. The secret key (service role)
-- bypasses RLS by Supabase design, for the one still-undefined future
-- admin/import task noted in the checkpoint; no policy needed for that case.
-- =============================================================================

alter table user_profiles enable row level security;
create policy user_profiles_own on user_profiles
  for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

alter table user_attribute_scores enable row level security;
create policy user_attribute_scores_own on user_attribute_scores
  for all
  using (exists (
    select 1 from user_profiles up
    where up.id = profile_id and up.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from user_profiles up
    where up.id = profile_id and up.user_id = auth.uid()
  ));

-- profile_id is nullable on this table (raw responses can be stored
-- independently of a derived profile) — a null profile_id row is visible to
-- no one under RLS except the secret-key client, which is the correct
-- default until a real use for that state is designed.
alter table user_quiz_sessions enable row level security;
create policy user_quiz_sessions_own on user_quiz_sessions
  for all
  using (profile_id is not null and exists (
    select 1 from user_profiles up
    where up.id = profile_id and up.user_id = auth.uid()
  ))
  with check (profile_id is not null and exists (
    select 1 from user_profiles up
    where up.id = profile_id and up.user_id = auth.uid()
  ));

alter table user_quiz_responses enable row level security;
create policy user_quiz_responses_own on user_quiz_responses
  for all
  using (exists (
    select 1 from user_quiz_sessions uqs
    join user_profiles up on up.id = uqs.profile_id
    where uqs.id = session_id and up.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from user_quiz_sessions uqs
    join user_profiles up on up.id = uqs.profile_id
    where uqs.id = session_id and up.user_id = auth.uid()
  ));

alter table match_results enable row level security;
create policy match_results_own on match_results
  for all
  using (exists (
    select 1 from user_profiles up
    where up.id = profile_id and up.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from user_profiles up
    where up.id = profile_id and up.user_id = auth.uid()
  ));

alter table greatness_results enable row level security;
create policy greatness_results_own on greatness_results
  for all
  using (exists (
    select 1 from user_profiles up
    where up.id = profile_id and up.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from user_profiles up
    where up.id = profile_id and up.user_id = auth.uid()
  ));

alter table saved_people enable row level security;
create policy saved_people_own on saved_people
  for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
