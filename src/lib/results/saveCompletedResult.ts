/**
 * CANONICAL COMPLETED-RESULT PERSISTENCE — Phase 9 Stage 9C.
 *
 * The ONE function both real entry points must call: a signed-in user
 * finishing the quiz, and migrating an already-completed anonymous result
 * (from the tgi_pending_own_results_v1 queue — see pendingOwnResults.ts)
 * after sign-in. Neither Stage 9D caller exists yet; this module is the
 * primitive both will use.
 *
 * Deliberately dependency-injected rather than importing
 * `@lib/supabase/server`'s `createClient()` directly: that keeps this file
 * free of `next/headers`/`server-only`, so the full validation and
 * record-building logic is unit-testable in isolation (see
 * saveCompletedResult.test.ts). The real, server-only entry point that
 * constructs the actual cookie-bound client is
 * `saveCompletedResultServer.ts` — a thin wrapper, not this file.
 *
 * No `user_id` parameter exists anywhere in this module. Identity is
 * resolved exclusively through `deps.auth.getUser()`.
 */
import { QUIZ } from "@core/quiz/bank";
import { decodeResultToken, encodeResultToken } from "@core/quiz/serialize";
import { scoreQuiz } from "@core/quiz/scoring";
import { isKnownVersionSnapshot, KNOWN_VERSION_SNAPSHOTS, snapshotsEqual, CURRENT_VERSIONS, type VersionSnapshot } from "@core/versions";
import { personDataFingerprint } from "@core/people/dataVersion";
import { buildResultSnapshot } from "@core/results/buildResultSnapshot";
import type { Person } from "@core/types";

export interface SaveCompletedResultInput {
  resultToken: string;
  /** ISO 8601, snapshotted client-side at the moment the quiz was actually
   *  completed — see pendingOwnResults.ts. Provenance metadata only: never
   *  used for authorization, scoring, or matching. */
  completedAt: string;
  /** Completion-time version snapshot — NOT re-derived from whichever
   *  versions happen to be current when this function runs, since a
   *  pending anonymous completion may be saved long after a later
   *  deployment moved matching/calibration/scoring/etc forward. */
  provenance: VersionSnapshot;
  /** Phase 10C: `personDataFingerprint(SEED_PEOPLE)` at completion time —
   *  see pendingOwnResults.ts's doc comment. A sibling of `provenance`, not
   *  part of it. */
  personDataVersion: string;
}

export type SaveCompletedResultOutcome =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "invalid_token"
        | "incomplete_token"
        | "noncanonical_token"
        | "unknown_version_provenance"
        | "version_mismatch"
        | "provenance_drift"
        | "invalid_completed_at"
        | "unauthenticated"
        | "db_error";
      detail?: string;
    };

/** The minimal Supabase surface this function needs — narrower than the
 *  full `SupabaseClient` type so tests can supply a plain mock without
 *  satisfying the library's entire interface. The real server client
 *  (`@lib/supabase/server`'s `createClient()`, called from
 *  `saveCompletedResultServer.ts`) structurally satisfies this already; no
 *  adapter needed at the real call site. */
export interface SaveCompletedResultDeps {
  auth: {
    getUser(): Promise<{ data: { user: { id: string } | null }; error: unknown }>;
  };
  from(table: "user_profiles"): {
    upsert(
      row: Record<string, unknown>,
      options: { onConflict: string; ignoreDuplicates: boolean },
      // `code`/`details`/`hint` mirror PostgrestError's real shape (Postgres
      // error code, e.g. '42501' insufficient_privilege / RLS, '23502'
      // not_null_violation, '42703' undefined_column) — optional so
      // existing test mocks that only ever supplied `message` stay valid,
      // but populated by the real client so a genuine DB failure can be
      // diagnosed by code, not just a free-text message.
    ): PromiseLike<{ error: { message: string; code?: string; details?: string; hint?: string } | null }>;
  };
}

const ISO_8601_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,9})?(Z|[+-]\d{2}:\d{2})$/;
/** Generous tolerance for ordinary browser/server clock skew — a
 *  plausibility check, not a security boundary (see saveCompletedResult's
 *  own doc comment on `completedAt`'s status as provenance, not authority). */
const MAX_FUTURE_SKEW_MS = 24 * 60 * 60 * 1000;

function isPlausibleCompletedAt(value: string): boolean {
  if (typeof value !== "string" || !ISO_8601_RE.test(value)) return false;
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return false;
  return parsed <= Date.now() + MAX_FUTURE_SKEW_MS;
}

/**
 * `knownSnapshots` defaults to the real, live `KNOWN_VERSION_SNAPSHOTS` —
 * exposed as a parameter purely so tests can exercise the append-only
 * design (an older-but-still-known snapshot correctly rejected when paired
 * with a token from a different quiz version) without needing a second
 * real historical entry to exist yet.
 *
 * `people` (Phase 10C) is the CURRENT roster — the caller passes
 * `SEED_PEOPLE`. Used for two things, both only reached once every prior
 * check has passed: (1) the claim-time drift guard below, comparing
 * `input.provenance`/`input.personDataVersion` (what was true at
 * completion) against `CURRENT_VERSIONS`/`personDataFingerprint(people)`
 * (what's true right now); (2) building the immutable `result_snapshot`,
 * which is only ever computed AFTER that guard has confirmed current state
 * equals completion-time state — so "freshly computed now" and "faithful
 * to what the user originally saw" are provably the same thing at that
 * point, never an assumption.
 */
export async function saveCompletedResult(
  deps: SaveCompletedResultDeps,
  input: SaveCompletedResultInput,
  people: readonly Person[],
  knownSnapshots: readonly VersionSnapshot[] = KNOWN_VERSION_SNAPSHOTS,
): Promise<SaveCompletedResultOutcome> {
  const decoded = decodeResultToken(input.resultToken, QUIZ);
  if (!decoded) return { ok: false, reason: "invalid_token" };

  if (decoded.responses.length !== QUIZ.questions.length) {
    return { ok: false, reason: "incomplete_token" };
  }

  // Strict, not normalizing: a client-supplied string that merely DECODES
  // successfully (e.g. carries harmless trailing characters past the
  // expected length) is rejected rather than silently persisted in
  // normalized form — the dedup guarantee ("same answers -> same token,
  // always, by construction") depends on only ever storing tokens that are
  // already exactly canonical.
  const canonicalToken = encodeResultToken(decoded.responses, QUIZ);
  if (canonicalToken !== input.resultToken) {
    return { ok: false, reason: "noncanonical_token" };
  }

  if (!isKnownVersionSnapshot(input.provenance, knownSnapshots)) {
    return { ok: false, reason: "unknown_version_provenance" };
  }

  // A known snapshot is not automatically the RIGHT snapshot for this
  // token: once KNOWN_VERSION_SNAPSHOTS holds more than one entry (a real
  // legacy version), a token from one quiz version must not be paired with
  // a provenance snapshot recorded under a different one.
  if (input.provenance.quizVersion !== decoded.quizVersion) {
    return { ok: false, reason: "version_mismatch" };
  }

  // PHASE 10C CLAIM-TIME DRIFT GUARD. Distinct from the two checks above:
  // those ask "is this a combination we've ever shipped / internally
  // consistent with the token" — this asks "is completion-time provenance
  // STILL what's current, right now". A completion recorded under an
  // older-but-still-KNOWN combination (e.g. after a future, legitimate
  // version bump) correctly passes `isKnownVersionSnapshot` above but must
  // still fail HERE: recomputing under the new current state and saving it
  // as though it were the original would silently misrepresent what the
  // user actually saw at completion. Never a silent recompute-and-save.
  const currentPersonDataVersion = personDataFingerprint(people);
  if (
    !snapshotsEqual(input.provenance, CURRENT_VERSIONS) ||
    input.personDataVersion !== currentPersonDataVersion
  ) {
    return { ok: false, reason: "provenance_drift" };
  }

  if (!isPlausibleCompletedAt(input.completedAt)) {
    return { ok: false, reason: "invalid_completed_at" };
  }

  const { data, error: authError } = await deps.auth.getUser();
  const userId = data.user?.id;
  if (authError || !userId) return { ok: false, reason: "unauthenticated" };

  // Only reached once current state has just been confirmed identical to
  // completion-time state (the drift guard above) — so this computation IS
  // the faithful original result, not a later approximation of it. Reuses
  // the exact same scoring/selection functions `/results` calls on every
  // anonymous render; see buildResultSnapshot.ts's own doc comment.
  const user = scoreQuiz({ quiz: QUIZ, responses: decoded.responses, profileId: canonicalToken, completedAt: input.completedAt });
  const resultSnapshot = buildResultSnapshot(user, people);

  const { error } = await deps.from("user_profiles").upsert(
    {
      user_id: userId,
      result_token: canonicalToken,
      completed_at: input.completedAt,
      // quiz_version comes from the TOKEN (re-validated above), not from
      // input.provenance — the token is the more authoritative source for
      // this one field, and using it avoids a second, potentially
      // inconsistent source of truth for the same fact.
      quiz_version: decoded.quizVersion,
      scoring_version: input.provenance.scoringVersion,
      taxonomy_version: input.provenance.taxonomyVersion,
      reference_version: input.provenance.referenceVersion,
      dispersion_version: input.provenance.dispersionVersion,
      greatness_scoring_version: input.provenance.greatnessScoringVersion,
      archetypes_version: input.provenance.archetypesVersion,
      matching_version: input.provenance.matchingVersion,
      calibration_version: input.provenance.calibrationVersion,
      interpretation_version: input.provenance.interpretationVersion,
      person_data_version: input.personDataVersion,
      result_snapshot: resultSnapshot,
    },
    // ON CONFLICT DO NOTHING: a repeat save of an already-stored
    // (user_id, result_token) pair must leave the ORIGINAL row — and its
    // original historical version metadata AND its immutable snapshot —
    // untouched, never overwritten with whatever happens to be current at
    // the time of the repeat call. There is deliberately no UPDATE path
    // anywhere in this module that could replace a stored result_snapshot.
    { onConflict: "user_id,result_token", ignoreDuplicates: true },
  );

  if (error) {
    // Retained permanently (not stripped with the rest of the Stage 9D
    // debugging instrumentation): a real DB-write failure here — RLS,
    // FK, schema drift — is genuinely worth being able to diagnose without
    // re-adding logging from scratch. Sanitized: code/message/details/hint
    // only (Postgrest's real error shape, never credentials), and only a
    // short token fingerprint (prefix + length), never the full token, the
    // row values, or any quiz answer.
    console.error(`[saveCompletedResult] upsert failed for ${canonicalToken.slice(0, 12)}…(${canonicalToken.length} chars):`, {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return { ok: false, reason: "db_error", detail: error.message };
  }
  return { ok: true };
}
