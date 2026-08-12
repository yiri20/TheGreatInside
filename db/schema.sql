-- =============================================================================
-- THE GREAT INSIDE — PostgreSQL / Supabase schema (schema_v1)
--
-- DESIGN RULES
--  1. ONE canonical person -> ONE attribute profile -> MANY localised
--     presentations. There is never a "Korean Leonardo" row with different
--     facts. Matching reads canonical tables only; no translation table is ever
--     joined into a scoring query.
--  2. Every user-visible string lives in a *_translations table keyed by locale.
--  3. Scores and interpretation are versioned so historical results stay
--     readable after an algorithm change.
--  4. Metadata (nationality, era, occupation, tags, popularity) exists for
--     filtering and SEO only. It is structurally impossible for it to reach the
--     matching engine because the engine consumes person_attributes alone.
-- =============================================================================

create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;      -- fuzzy name search
create extension if not exists unaccent;     -- romanised name search

-- ============================================================ enumerations ==
create type evidence_type  as enum ('documented', 'strong_inference', 'inference');
create type trait_impact   as enum ('advantage', 'dual_edged', 'risk', 'neutral');
create type person_status  as enum ('draft', 'needs_evidence', 'needs_review',
                                    'approved', 'published', 'needs_update');
create type era_type       as enum ('ancient', 'medieval', 'early_modern',
                                    '19th_century', '20th_century', 'contemporary');
create type attribute_facet as enum ('thinking', 'creativity', 'work_style',
                                     'resilience', 'social', 'motivation',
                                     'world_sense');
create type contribution_shape as enum ('higher_can_help', 'lower_can_help',
                                        'balanced', 'contextual', 'cluster_dependent');

-- ================================================================= locales ==
create table locales (
  code          text primary key,               -- 'en-US', 'ko-KR', ...
  is_active     boolean not null default false,
  fallback_code text references locales(code),
  sort_order    int not null default 0
);

-- ============================================================== attributes ==
-- The canonical taxonomy. Source of truth is src/core/attributes/attributes.ts;
-- this table mirrors it so admin tooling and SQL reporting can join against it.
create table attributes (
  id                 text primary key,          -- 'curiosity'
  facet              attribute_facet not null,
  base_weight        numeric(4,2) not null default 1.00 check (base_weight > 0),
  contribution_shape contribution_shape not null,
  reference_mean     numeric(5,2) not null check (reference_mean between 0 and 100),
  reference_sd       numeric(5,2) not null check (reference_sd > 0),
  taxonomy_version   text not null,
  sort_order         int not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create table attribute_translations (
  attribute_id text not null references attributes(id) on delete cascade,
  locale       text not null references locales(code) on delete cascade,
  name         text not null,
  short_description text,
  high_meaning      text,          -- "what a high score means"
  potential_advantages text,
  potential_costs      text,
  primary key (attribute_id, locale)
);

-- =================================================== taxonomy / metadata ====
create table tags (
  id text primary key,
  category text not null           -- 'trait_pattern' | 'career' | 'background'
);
create table tag_translations (
  tag_id text not null references tags(id) on delete cascade,
  locale text not null references locales(code) on delete cascade,
  name   text not null,
  primary key (tag_id, locale)
);

create table occupations (id text primary key);
create table occupation_translations (
  occupation_id text not null references occupations(id) on delete cascade,
  locale text not null references locales(code) on delete cascade,
  name   text not null,
  primary key (occupation_id, locale)
);

create table fields (id text primary key);
create table field_translations (
  field_id text not null references fields(id) on delete cascade,
  locale   text not null references locales(code) on delete cascade,
  name     text not null,
  primary key (field_id, locale)
);

-- ================================================================== people ==
create table people (
  id                uuid primary key default uuid_generate_v4(),
  slug              text not null unique,
  canonical_name    text not null,
  -- Alternate names/spellings/native-script forms (e.g. '이순신' / 'Yi
  -- Sun-sin' / '李舜臣'), flat and locale-independent — a fact about the
  -- person's identity across writing systems, used for universal alias
  -- search regardless of current UI locale. Distinct from
  -- person_translations.aliases below, which is per-locale DISPLAY curation
  -- ("known as" text shown specifically in that locale's UI) — a different,
  -- complementary concern, not a duplicate of this column.
  aliases           text[] not null default '{}',
  -- Wikidata QID (e.g. 'Q762'), the canonical cross-reference for structured
  -- data and future admin/data-pipeline tooling. Presentation/SEO metadata
  -- only, same as everything else in this comment block.
  wikidata_id       text,
  -- The historical polity this person actually lived under, as a message key
  -- (e.g. 'polity.ming_dynasty') resolved the same way attribute names and
  -- era labels are — shared across people who lived under the same polity.
  -- Exists because nationality_codes below is a MODERN, ISO-mapped field and
  -- is frequently anachronistic for historical figures (Zheng He was never a
  -- citizen of the modern PRC); this is an additional presentational field,
  -- not a replacement for nationality_codes/region_code, which keep their
  -- existing job as modern-day-mapped filtering metadata.
  historical_polity_key text,
  birth_year        int,
  death_year        int,
  is_living         boolean not null,
  era               era_type not null,
  region_code       text not null,
  nationality_codes text[] not null default '{}',
  status            person_status not null default 'draft',

  -- Gate for the matching engine. Set by the eligibility evaluator, never by
  -- hand: an under-evidenced profile must not be able to opt itself in.
  is_match_eligible boolean not null default false,
  overall_profile_confidence numeric(3,2) not null default 0
    check (overall_profile_confidence between 0 and 1),
  scored_attribute_count int not null default 0,

  -- Popularity may influence browse ordering and homepage curation. It is
  -- deliberately isolated in its own column and MUST NOT appear in any query
  -- that computes similarity.
  popularity_rank   int,

  taxonomy_version  text not null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  published_at      timestamptz,

  constraint death_after_birth check (death_year is null or birth_year is null
                                      or death_year >= birth_year),
  constraint living_has_no_death check (not is_living or death_year is null)
);

create index people_status_idx        on people(status) where status = 'published';
create index people_eligible_idx      on people(is_match_eligible) where is_match_eligible;
create index people_era_idx           on people(era);
create index people_region_idx        on people(region_code);
create index people_nationality_idx   on people using gin(nationality_codes);
create index people_aliases_idx       on people using gin(aliases);
create unique index people_wikidata_id_idx on people(wikidata_id) where wikidata_id is not null;

-- Localised Wikipedia article URL per person per locale. A missing locale
-- means no known article there, not an error — rendered as an absent link,
-- never a broken one.
create table person_wikipedia_links (
  person_id uuid not null references people(id) on delete cascade,
  locale    text not null references locales(code) on delete cascade,
  url       text not null,
  primary key (person_id, locale)
);

-- At most one portrait per person for now (MVP scope; extend to a ranked
-- list only if a real curation need appears). license/attribution are stored
-- as given, not translated — most free-licence terms (e.g. CC BY-SA) require
-- reproducing the credit line as-is, not a localised paraphrase of it.
create table person_portraits (
  person_id        uuid primary key references people(id) on delete cascade,
  url              text not null,
  width            int,
  height           int,
  source           text not null,
  license          text not null,
  license_url      text,
  attribution      text,
  attribution_url  text,
  -- Never inferred: only set once a human has actually verified the source
  -- page's licence terms, same discipline as trait evidence review.
  verified_by      uuid,
  verified_at      timestamptz
);

create table person_translations (
  person_id     uuid not null references people(id) on delete cascade,
  locale        text not null references locales(code) on delete cascade,
  display_name  text not null,
  -- Aliases power search: native script, romanisation, historical names.
  -- '이순신' / 'Yi Sun-sin' / '李舜臣' must all resolve to one canonical row.
  aliases       text[] not null default '{}',
  short_summary text,
  why_they_stand_out text,
  career_pattern     text,
  what_you_can_learn text,
  seo_title       text,
  seo_description text,
  primary key (person_id, locale)
);

create index person_translations_name_trgm on person_translations
  using gin (display_name gin_trgm_ops);
create index person_translations_aliases   on person_translations using gin (aliases);

create table person_occupations (
  person_id uuid not null references people(id) on delete cascade,
  occupation_id text not null references occupations(id) on delete cascade,
  primary key (person_id, occupation_id)
);
create table person_fields (
  person_id uuid not null references people(id) on delete cascade,
  field_id text not null references fields(id) on delete cascade,
  primary key (person_id, field_id)
);
create table person_tags (
  person_id uuid not null references people(id) on delete cascade,
  tag_id text not null references tags(id) on delete cascade,
  primary key (person_id, tag_id)
);

-- ================================================================ sources ==
create table sources (
  id         uuid primary key default uuid_generate_v4(),
  kind       text not null,
  title      text not null,
  url        text,
  publisher  text,
  published_year int,
  retrieved_at timestamptz
);

create table person_sources (
  person_id uuid not null references people(id) on delete cascade,
  source_id uuid not null references sources(id) on delete cascade,
  note      text,
  primary key (person_id, source_id)
);

-- ====================================================== person attributes ==
-- The only table the matching engine reads. Note what is absent: no locale, no
-- nationality, no popularity.
create table person_attributes (
  person_id    uuid not null references people(id) on delete cascade,
  attribute_id text not null references attributes(id) on delete restrict,

  score        smallint not null check (score between 0 and 100),
  confidence   numeric(3,2) not null check (confidence between 0 and 1),
  evidence_type evidence_type not null,
  impact       trait_impact not null,

  -- Editorial, reviewed, localised via person_attribute_translations.
  reviewed_by  uuid,
  reviewed_at  timestamptz,
  updated_at   timestamptz not null default now(),

  primary key (person_id, attribute_id)
);

create index person_attributes_attr_score_idx on person_attributes(attribute_id, score desc);
create index person_attributes_impact_idx     on person_attributes(attribute_id, impact);

create table person_attribute_translations (
  person_id    uuid not null,
  attribute_id text not null,
  locale       text not null references locales(code) on delete cascade,
  benefit_explanation text,
  cost_explanation    text,
  context_explanation text,
  primary key (person_id, attribute_id, locale),
  foreign key (person_id, attribute_id)
    references person_attributes(person_id, attribute_id) on delete cascade
);

create table person_attribute_sources (
  person_id    uuid not null,
  attribute_id text not null,
  source_id    uuid not null references sources(id) on delete cascade,
  primary key (person_id, attribute_id, source_id),
  foreign key (person_id, attribute_id)
    references person_attributes(person_id, attribute_id) on delete cascade
);

-- "What not to copy" — reviewed editorial content, never generated at runtime.
create table person_cautions (
  id        uuid primary key default uuid_generate_v4(),
  person_id uuid not null references people(id) on delete cascade,
  attribute_id text references attributes(id) on delete set null,
  sort_order int not null default 0
);
create table person_caution_translations (
  caution_id uuid not null references person_cautions(id) on delete cascade,
  locale text not null references locales(code) on delete cascade,
  body   text not null,
  primary key (caution_id, locale)
);

create table achievements (
  id uuid primary key default uuid_generate_v4(),
  person_id uuid not null references people(id) on delete cascade,
  year int,
  impact_domain text not null,
  sort_order int not null default 0
);
create table achievement_translations (
  achievement_id uuid not null references achievements(id) on delete cascade,
  locale text not null references locales(code) on delete cascade,
  title  text not null,
  description text,
  primary key (achievement_id, locale)
);

-- ============================================================== archetypes ==
create table archetypes (
  id text primary key,
  archetypes_version text not null
);
create table archetype_translations (
  archetype_id text not null references archetypes(id) on delete cascade,
  locale text not null references locales(code) on delete cascade,
  name text not null,
  description text,
  primary key (archetype_id, locale)
);
-- Reviewed assignments. Feed archetype centroid derivation ONLY; never similarity.
create table person_archetypes (
  person_id uuid not null references people(id) on delete cascade,
  archetype_id text not null references archetypes(id) on delete cascade,
  primary key (person_id, archetype_id)
);

-- ==================================================================== quiz ==
create table quiz_versions (
  version          text primary key,          -- 'quiz_v1'
  taxonomy_version text not null,
  scoring_version  text not null,
  is_active        boolean not null default false,
  published_at     timestamptz
);

-- Stage 9D (2026-08): the ONE exception to "no seed data in schema.sql" —
-- every other canonical-data table (attributes, people, quiz_questions, ...)
-- is deliberately left unseeded, since canonical data lives in TypeScript,
-- not the DB (see CLAUDE.md). But user_profiles.quiz_version FKs into this
-- table, and Phase 9's account-history save path is the first thing that
-- actually inserts into user_profiles — so a fresh project needs at least
-- this one row for that FK to ever succeed. Values read directly from
-- source (src/core/quiz/bank.ts, attributes.ts, scoring.ts), not invented.
-- Idempotent (ON CONFLICT DO UPDATE, not DO NOTHING): safe to rerun, and
-- keeps this row aligned with the canonical source values if they ever
-- change, rather than silently leaving a stale row in place.
insert into quiz_versions (version, taxonomy_version, scoring_version, is_active)
values ('quiz_v2', 'taxonomy_v1.1', 'scoring_v1', true)
on conflict (version) do update set
  taxonomy_version = excluded.taxonomy_version,
  scoring_version  = excluded.scoring_version,
  is_active        = excluded.is_active;

create table quiz_questions (
  id           text primary key,
  quiz_version text not null references quiz_versions(version) on delete cascade,
  section_id   text not null,
  format       text not null check (format in ('likert7','forced_choice','situational','ranking')),
  reverse_keyed boolean not null default false,
  skippable    boolean not null default true,
  sort_order   int not null default 0
);

create table quiz_question_translations (
  question_id text not null references quiz_questions(id) on delete cascade,
  locale      text not null references locales(code) on delete cascade,
  prompt      text not null,
  helper_text text,
  primary key (question_id, locale)
);

create table quiz_options (
  id          text primary key,
  question_id text not null references quiz_questions(id) on delete cascade,
  sort_order  int not null default 0
);
create table quiz_option_translations (
  option_id text not null references quiz_options(id) on delete cascade,
  locale    text not null references locales(code) on delete cascade,
  label     text not null,
  primary key (option_id, locale)
);

-- One row per attribute an answer loads on. For likert items option_id is null
-- and the load applies to the question itself.
create table quiz_answer_mappings (
  id           uuid primary key default uuid_generate_v4(),
  question_id  text not null references quiz_questions(id) on delete cascade,
  option_id    text references quiz_options(id) on delete cascade,
  attribute_id text not null references attributes(id) on delete restrict,
  direction    numeric(3,2) not null check (direction between -1 and 1),
  weight       numeric(3,2) not null check (weight > 0),
  unique (question_id, option_id, attribute_id)
);

-- ================================================================== users ==
-- Stage 9B (2026-08): every row here represents ONE COMPLETED quiz result
-- owned by ONE signed-in user. The anonymous flow (quiz-taking, results,
-- comparison) never writes to this table at all — it is URL-token +
-- localStorage only (Phase 6) — so user_id is a real, required FK, not an
-- optional one, and there is no separate anonymous-session identity to track
-- here (the anonymous_key column this table originally shipped with was
-- provisioned for that concept and was dropped once Phase 9 confirmed it was
-- never going to be built).
create table user_profiles (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  quiz_version     text not null references quiz_versions(version),
  scoring_version  text not null,
  taxonomy_version text not null,
  greatness_scoring_version text,
  matching_version text,
  calibration_version text,
  -- Presentation locale at completion time. Recorded for analytics ONLY.
  locale      text references locales(code),
  -- Content-addressable result token (src/core/quiz/serialize.ts,
  -- `encodeResultToken`) — the exact string already used for the `?r=` URL
  -- param and the `tgi_last_result_v1` localStorage value. Same answers ->
  -- same token, always, by construction, which makes (user_id, result_token)
  -- the natural migration-dedup key: a repeated sign-in or a repeated
  -- migration of the same completed result can never create a duplicate row.
  result_token text not null,
  -- Actual quiz-completion time (browser clock, snapshotted client-side at
  -- completion — see src/lib/results/pendingOwnResults.ts), distinct from
  -- created_at below (Postgres server clock, row-insertion time). No CHECK
  -- constraint ties the two together — client/server clock skew could fail
  -- it even for a legitimate immediate save; plausibility is validated in
  -- application code instead (src/lib/results/saveCompletedResult.ts).
  -- Provenance metadata only, never used for authorization/scoring/matching.
  completed_at timestamptz not null default now(),
  created_at  timestamptz not null default now(),
  deleted_at  timestamptz
);
create index user_profiles_user_idx on user_profiles(user_id);
create unique index user_profiles_user_dedup_idx on user_profiles(user_id, result_token);

create table user_attribute_scores (
  profile_id   uuid not null references user_profiles(id) on delete cascade,
  attribute_id text not null references attributes(id) on delete restrict,
  score        smallint not null check (score between 0 and 100),
  confidence   numeric(3,2) not null check (confidence between 0 and 1),
  primary key (profile_id, attribute_id)
);

-- Raw responses are private. They are never exposed through a share URL and are
-- stored separately so they can be deleted independently of the derived vector.
create table user_quiz_sessions (
  id          uuid primary key default uuid_generate_v4(),
  profile_id  uuid references user_profiles(id) on delete cascade,
  quiz_version text not null references quiz_versions(version),
  started_at  timestamptz not null default now(),
  completed_at timestamptz,
  last_section_id text
);

create table user_quiz_responses (
  session_id  uuid not null references user_quiz_sessions(id) on delete cascade,
  question_id text not null references quiz_questions(id) on delete cascade,
  option_id   text references quiz_options(id) on delete set null,
  likert_value smallint check (likert_value between 1 and 7),
  answered_at timestamptz not null default now(),
  primary key (session_id, question_id),
  constraint one_answer_kind check (num_nonnulls(option_id, likert_value) = 1)
);

-- Cached derived results. Recomputing is cheap, but caching keeps the result
-- page a pure database read at scale.
create table match_results (
  profile_id uuid not null references user_profiles(id) on delete cascade,
  person_id  uuid not null references people(id) on delete cascade,
  overall_match smallint not null check (overall_match between 0 and 100),
  raw_similarity numeric(6,5) not null,
  coverage       numeric(4,3) not null,
  facet_matches  jsonb not null,
  rank           int not null,
  matching_version    text not null,
  calibration_version text not null,
  computed_at    timestamptz not null default now(),
  primary key (profile_id, person_id)
);
create index match_results_rank_idx on match_results(profile_id, rank);

create table greatness_results (
  profile_id uuid primary key references user_profiles(id) on delete cascade,
  score      smallint not null check (score between 0 and 100),
  raw_score  numeric(6,5) not null,
  band_id    text not null,
  components jsonb not null,
  category_potential jsonb not null,
  primary_archetype_id  text references archetypes(id),
  secondary_archetype_id text references archetypes(id),
  greatness_scoring_version text not null,
  archetypes_version text not null,
  computed_at timestamptz not null default now()
);

create table saved_people (
  user_id   uuid not null references auth.users(id) on delete cascade,
  person_id uuid not null references people(id) on delete cascade,
  kind      text not null check (kind in ('favorite','target','saved')),
  created_at timestamptz not null default now(),
  primary key (user_id, person_id, kind)
);

-- ============================================ interpretation & development ==
create table interpretation_templates (
  key     text primary key,        -- 'tpl.match_extremely_close'
  version text not null
);
create table interpretation_template_translations (
  template_key text not null references interpretation_templates(key) on delete cascade,
  locale text not null references locales(code) on delete cascade,
  body   text not null,            -- may contain {trait} / {person}
  primary key (template_key, locale)
);

create table development_guides (
  id           uuid primary key default uuid_generate_v4(),
  attribute_id text not null references attributes(id) on delete cascade,
  band         text not null check (band in ('low','medium','high')),
  version      text not null,
  unique (attribute_id, band, version)
);
create table development_guide_translations (
  guide_id uuid not null references development_guides(id) on delete cascade,
  locale   text not null references locales(code) on delete cascade,
  experiments text[] not null default '{}',
  cautions    text[] not null default '{}',
  primary key (guide_id, locale)
);

-- ================================================================= review ==
create table profile_reviews (
  id         uuid primary key default uuid_generate_v4(),
  person_id  uuid not null references people(id) on delete cascade,
  reviewer_id uuid,
  from_status person_status,
  to_status   person_status not null,
  notes      text,
  -- AI may assist admins with drafting. Anything it touched is flagged and
  -- cannot reach 'published' without a human transition recorded here.
  ai_assisted boolean not null default false,
  created_at timestamptz not null default now()
);
create index profile_reviews_person_idx on profile_reviews(person_id, created_at desc);

-- =============================================================== analytics ==
create table analytics_events (
  id         bigserial primary key,
  name       text not null,
  profile_id uuid,
  locale     text,
  properties jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index analytics_events_name_time_idx on analytics_events(name, created_at desc);

-- ========================================= row level security (Stage 9B) ==
-- Every user_* table and saved_people, scoped to auth.uid(). A single
-- `for all` policy per table: `using` gates which existing rows are
-- visible/mutable, `with check` gates what a write is allowed to produce,
-- and for every table here both conditions reduce to the identical "this
-- row belongs to me" test — a split per-verb policy set would only repeat
-- the same rule four times. The secret key (service role) bypasses RLS by
-- Supabase design, for the one still-undefined future admin/import task
-- noted in docs/phase9-provisional-checkpoint.md; no policy needed for that
-- case. attributes/people/quiz_* and every other non-user_* table stay
-- world-readable (no RLS) — they hold no per-user data.

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
-- independently of a derived profile) — a null-profile_id row is visible to
-- no one under RLS except the secret-key client, the correct default until
-- a real use for that state is designed.
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
