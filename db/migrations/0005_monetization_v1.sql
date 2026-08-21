-- =============================================================================
-- Monetization v1 — Deep Inside.
--
-- Adds the two new tables the entitlement model needs (user_entitlements,
-- purchases) and turns on RLS for the pre-existing, previously-unused
-- analytics_events table so it can safely carry the Deep Inside funnel
-- events without becoming a world-readable/writable table.
--
-- SECURITY MODEL, stated once here since it governs every RLS choice below:
-- the only two writers of purchases/user_entitlements are (1) the Stripe
-- webhook handler, which uses the SECRET-KEY Supabase client (bypasses RLS
-- entirely, by Supabase design — the same "for the one still-undefined
-- future admin task" escape hatch db/schema.sql already documents), and
-- (2) nobody else. Neither table gets an INSERT/UPDATE policy for the
-- anon/authenticated roles at all — a signed-in user may only ever SELECT
-- their own rows. This is deliberate, not an oversight: "the server/
-- database entitlement is authoritative" only holds if the client-facing
-- publishable-key role has no path to write these tables directly.
-- =============================================================================

-- ===================================================== user_entitlements ==
-- One row per (user, entitlement). `deep_inside_lifetime_v1` is the only
-- entitlement_key this project grants today; the column is free-form text
-- (not an enum) so a future second product needs no migration to add one.
create table if not exists user_entitlements (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  entitlement_key text not null,
  status         text not null default 'active' check (status in ('active', 'revoked')),
  granted_at     timestamptz not null default now(),
  revoked_at     timestamptz,
  -- How this entitlement was granted — 'stripe_checkout' today; a manual
  -- support grant or a future different product would use a different
  -- value, never overloading this one string with structured meaning.
  source         text not null,
  purchase_id    uuid,
  created_at     timestamptz not null default now(),
  constraint user_entitlements_status_dates check (
    (status = 'active' and revoked_at is null)
    or (status = 'revoked' and revoked_at is not null)
  )
);
-- One entitlement per (user, key) — the webhook's grant upsert relies on
-- this to be idempotent under retry (ON CONFLICT (user_id, entitlement_key)).
create unique index if not exists user_entitlements_user_key_idx
  on user_entitlements(user_id, entitlement_key);

alter table user_entitlements enable row level security;
drop policy if exists user_entitlements_select_own on user_entitlements;
create policy user_entitlements_select_own on user_entitlements
  for select
  using (user_id = auth.uid());
-- No insert/update/delete policy for anon/authenticated — see the module
-- doc comment above. Only the secret-key (service-role) client, used
-- exclusively by the webhook handler, can write this table.

-- ================================================================ purchases ==
-- A minimal, auditable purchase record — enough for idempotency, support,
-- and refund handling, never card details (Stripe holds those).
create table if not exists purchases (
  id                          uuid primary key default uuid_generate_v4(),
  user_id                     uuid not null references auth.users(id) on delete cascade,
  product_key                 text not null,
  stripe_checkout_session_id  text not null,
  stripe_payment_intent_id    text,
  amount                      integer not null,
  currency                    text not null,
  status                      text not null default 'pending'
                                 check (status in ('pending', 'completed', 'refunded')),
  created_at                  timestamptz not null default now(),
  completed_at                timestamptz,
  refunded_at                 timestamptz
);
-- The idempotency key the webhook's upsert conflicts on — Stripe may retry
-- the same checkout.session.completed event any number of times, and this
-- is what makes a second delivery a no-op rather than a duplicate row.
create unique index if not exists purchases_checkout_session_idx
  on purchases(stripe_checkout_session_id);
create index if not exists purchases_user_idx on purchases(user_id);
-- Looked up by the refund handler (charge.refunded carries a payment_intent,
-- not a checkout session id) — not unique, since Stripe does not guarantee
-- one payment_intent maps to exactly one of OUR rows in every edge case,
-- but in practice always will for this single-product, quantity-1 design.
create index if not exists purchases_payment_intent_idx
  on purchases(stripe_payment_intent_id) where stripe_payment_intent_id is not null;

alter table purchases enable row level security;
drop policy if exists purchases_select_own on purchases;
create policy purchases_select_own on purchases
  for select
  using (user_id = auth.uid());
-- No insert/update/delete policy for anon/authenticated — same reasoning
-- as user_entitlements above.

-- Now that purchase_id has a real table to point at, wire the FK (left
-- loose above only because purchases didn't exist yet at that point in
-- this file).
alter table user_entitlements
  add constraint user_entitlements_purchase_fk
  foreign key (purchase_id) references purchases(id) on delete set null;

-- =========================================================== analytics_events ==
-- This table has existed in db/schema.sql since the original Stage 9A
-- provisioning run but has never had RLS enabled and has never been
-- written to by any code path — a real, currently-live gap (fully open to
-- the anon/authenticated roles under the publishable key) this migration
-- closes as a side effect of finally putting the table to use. `if not
-- exists` here is defensive: if a given project's live database somehow
-- never got the original schema.sql run for this specific table, this
-- creates it fresh with the same shape db/schema.sql declares.
create table if not exists analytics_events (
  id         bigserial primary key,
  name       text not null,
  profile_id uuid,
  locale     text,
  properties jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index if not exists analytics_events_name_time_idx on analytics_events(name, created_at desc);

alter table analytics_events enable row level security;
-- Allowlisted at the DB layer, not just in application code: an insert for
-- any event name outside this exact set is rejected regardless of what
-- application code does or doesn't validate. `deep_report_purchase_completed`
-- is DELIBERATELY EXCLUDED from this client-facing policy — it must only
-- ever be written by the webhook's secret-key client (which bypasses RLS
-- entirely), never by an authenticated or anonymous browser session, so
-- that a forged client-side "purchase completed" event is rejected at the
-- database layer even if some future application-code change forgot to
-- guard it.
drop policy if exists analytics_events_insert_allowlisted on analytics_events;
create policy analytics_events_insert_allowlisted on analytics_events
  for insert
  with check (
    name in (
      'deep_report_result_viewed',
      'deep_report_cta_clicked',
      'deep_report_checkout_started'
    )
  );
-- No select/update/delete policy for anon/authenticated — funnel counts are
-- read via a service-role/SQL-editor query (see docs/monetization-v1.md),
-- never through the client-facing publishable key.

-- ============================================= user_profiles: deep report ==
-- The Deep Inside report snapshot — same "Strategy A" immutable-snapshot
-- pattern Phase 10C's result_snapshot column already established, reusing
-- the SAME (user_id, result_token) row rather than a new table: Deep
-- Inside is generated for a SPECIFIC saved result, and that row already
-- exists once the free result has been saved (which, per the purchase
-- flow, always happens before checkout can even start — see
-- docs/monetization-v1.md). Computed once, on first entitled view of a
-- given result, never recomputed after — a future roster/algorithm change
-- must not silently alter an already-generated report.
--
-- Unlike result_snapshot (which reuses the row's existing nine *_version
-- columns, populated at quiz-completion time), the Deep Inside report
-- embeds its OWN full VersionSnapshot directly inside the JSONB blob
-- (src/core/monetization/deepInsideSnapshot.ts) — it may be generated much
-- later than quiz completion (at purchase or first-view time), so it needs
-- independently-timestamped provenance rather than reusing a column set
-- that records a different moment in time.
alter table user_profiles
  add column if not exists deep_report_snapshot jsonb,
  add column if not exists deep_report_generated_at timestamptz;

alter table user_profiles
  add constraint deep_report_snapshot_schema_check check (
    deep_report_snapshot is null
    or (
      jsonb_typeof(deep_report_snapshot) = 'object'
      and deep_report_snapshot ? 'schemaVersion'
      and deep_report_snapshot ->> 'schemaVersion' = 'deep_inside_report_v1'
    )
  );
