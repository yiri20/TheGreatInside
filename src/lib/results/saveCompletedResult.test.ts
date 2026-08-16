import { describe, expect, it } from "vitest";
import { QUIZ } from "@core/quiz/bank";
import { encodeResultToken } from "@core/quiz/serialize";
import type { QuizResponse } from "@core/quiz/types";
import { CURRENT_VERSIONS, type VersionSnapshot } from "@core/versions";
import { personDataFingerprint } from "@core/people/dataVersion";
import { parseResultSnapshot } from "@core/results/snapshot";
import type { Person } from "@core/types";
import { saveCompletedResult, type SaveCompletedResultDeps, type SaveCompletedResultInput } from "./saveCompletedResult.js";

function makePerson(id: string): Person {
  return {
    id,
    slug: id,
    canonicalName: id,
    aliases: [],
    isLiving: false,
    era: "contemporary",
    nationalityCodes: [],
    regionCode: "test",
    occupationIds: [],
    fieldIds: [],
    impactDomains: [],
    tagIds: [],
    archetypeIds: [],
    attributes: [
      { attributeId: "curiosity", score: 80, confidence: 0.9, evidenceType: "documented", impact: "neutral", sourceIds: [] },
      { attributeId: "discipline", score: 40, confidence: 0.9, evidenceType: "documented", impact: "neutral", sourceIds: [] },
    ],
    status: "published",
    isMatchEligible: true,
    overallProfileConfidence: 0.9,
    sources: [],
    doNotCopyKeys: [],
  };
}

const TEST_PEOPLE: Person[] = [makePerson("p_test")];

/** Same pattern as src/core/quiz/serialize.test.ts's fullAnswers(). */
function fullAnswers(): QuizResponse[] {
  return QUIZ.questions.map((q, i) =>
    q.format === "likert7"
      ? { questionId: q.id, value: (((i * 3) % 7) + 1) as number }
      : { questionId: q.id, value: q.options![i % q.options!.length]!.id },
  );
}

function validToken(): string {
  return encodeResultToken(fullAnswers(), QUIZ);
}

function validInput(overrides: Partial<SaveCompletedResultInput> = {}): SaveCompletedResultInput {
  return {
    resultToken: validToken(),
    completedAt: "2026-08-01T00:00:00.000Z",
    provenance: CURRENT_VERSIONS,
    personDataVersion: personDataFingerprint(TEST_PEOPLE),
    ...overrides,
  };
}

interface UpsertCall {
  row: Record<string, unknown>;
  options: { onConflict: string; ignoreDuplicates: boolean };
}

/** A stateful in-memory double simulating the live (user_id, result_token)
 *  unique index's ON CONFLICT DO NOTHING behavior — the closest this test
 *  suite comes to a real DB without a network integration test, per
 *  instruction. `userId: null` simulates no active session. */
function makeDeps(userId: string | null) {
  const store = new Map<string, Record<string, unknown>>();
  const calls: UpsertCall[] = [];
  const deps: SaveCompletedResultDeps = {
    auth: {
      async getUser() {
        return userId ? { data: { user: { id: userId } }, error: null } : { data: { user: null }, error: new Error("no session") };
      },
    },
    from() {
      return {
        async upsert(row: Record<string, unknown>, options: { onConflict: string; ignoreDuplicates: boolean }) {
          calls.push({ row, options });
          const key = `${row.user_id as string}:${row.result_token as string}`;
          if (!store.has(key)) store.set(key, row);
          return { error: null };
        },
      };
    },
  };
  return { deps, calls, store };
}

describe("saveCompletedResult", () => {
  it("rejects a malformed token", async () => {
    const { deps } = makeDeps("user-1");
    const result = await saveCompletedResult(deps, validInput({ resultToken: "not-a-valid-token" }), TEST_PEOPLE);
    expect(result).toEqual({ ok: false, reason: "invalid_token" });
  });

  it("rejects an incomplete token", async () => {
    const { deps } = makeDeps("user-1");
    const incompleteToken = encodeResultToken(fullAnswers().slice(0, -1), QUIZ);
    const result = await saveCompletedResult(deps, validInput({ resultToken: incompleteToken }), TEST_PEOPLE);
    expect(result).toEqual({ ok: false, reason: "incomplete_token" });
  });

  it("rejects a noncanonical token (decodes fine, but isn't the canonical re-encoding) rather than silently normalizing it", async () => {
    const { deps } = makeDeps("user-1");
    const withTrailingJunk = `${validToken()}z`; // decode ignores the extra char, but it's not canonical
    const result = await saveCompletedResult(deps, validInput({ resultToken: withTrailingJunk }), TEST_PEOPLE);
    expect(result).toEqual({ ok: false, reason: "noncanonical_token" });
  });

  it("rejects an unknown version provenance snapshot", async () => {
    const { deps } = makeDeps("user-1");
    const bogusProvenance: VersionSnapshot = { ...CURRENT_VERSIONS, matchingVersion: "matching_v999" };
    const result = await saveCompletedResult(deps, validInput({ provenance: bogusProvenance }), TEST_PEOPLE);
    expect(result).toEqual({ ok: false, reason: "unknown_version_provenance" });
  });

  it("rejects a KNOWN provenance snapshot when its quizVersion doesn't match the token's (version_mismatch, distinct from unknown_version_provenance)", async () => {
    const { deps } = makeDeps("user-1");
    const olderSnapshot: VersionSnapshot = { ...CURRENT_VERSIONS, quizVersion: "quiz_v1_hypothetical", matchingVersion: "matching_v1" };
    const registryWithBothEras = [olderSnapshot, CURRENT_VERSIONS];

    const result = await saveCompletedResult(
      deps,
      validInput({ provenance: olderSnapshot }), // token is a real quiz_v2 token; provenance claims a different, still-known quiz version
      TEST_PEOPLE,
      registryWithBothEras,
    );
    expect(result).toEqual({ ok: false, reason: "version_mismatch" });
  });

  // ------------------------------------------------ Phase 10C drift guard
  it("rejects a claim whose provenance is a KNOWN but no-longer-CURRENT combination (provenance_drift) — a real future version bump, not garbage input", async () => {
    const { deps, calls } = makeDeps("user-1");
    const staleButKnown: VersionSnapshot = { ...CURRENT_VERSIONS, matchingVersion: "matching_v1" };
    const registry = [staleButKnown, CURRENT_VERSIONS];

    // The token must actually decode under this stale provenance's quizVersion
    // to get past version_mismatch and reach the drift check.
    const result = await saveCompletedResult(deps, validInput({ provenance: staleButKnown }), TEST_PEOPLE, registry);

    expect(result).toEqual({ ok: false, reason: "provenance_drift" });
    expect(calls).toHaveLength(0); // never silently recomputed-and-saved under current state
  });

  it("rejects a claim whose person-data fingerprint no longer matches the current roster (provenance_drift) — the roster changed since completion", async () => {
    const { deps, calls } = makeDeps("user-1");
    const completionTimeRoster = [makePerson("p_only_at_completion")];
    const input = validInput({ personDataVersion: personDataFingerprint(completionTimeRoster) });

    // TEST_PEOPLE (the CURRENT roster at claim time) differs from
    // completionTimeRoster (what the fingerprint was computed against).
    const result = await saveCompletedResult(deps, input, TEST_PEOPLE);

    expect(result).toEqual({ ok: false, reason: "provenance_drift" });
    expect(calls).toHaveLength(0);
  });

  it("Roster-1000 session 10: rejects a claim whose provenance was recorded under eligibility_v1 (pre-session-10), even though every OTHER field still matches CURRENT_VERSIONS exactly — the new field participates in the drift guard like any other", async () => {
    const { deps, calls } = makeDeps("user-1");
    const eligibilityV1Snapshot: VersionSnapshot = { ...CURRENT_VERSIONS, eligibilityVersion: "eligibility_v1" };
    const registry = [eligibilityV1Snapshot, CURRENT_VERSIONS];

    const result = await saveCompletedResult(deps, validInput({ provenance: eligibilityV1Snapshot }), TEST_PEOPLE, registry);

    expect(result).toEqual({ ok: false, reason: "provenance_drift" });
    expect(calls).toHaveLength(0);
  });

  it("Roster-1000 session 10: a claim under the real, current eligibility_v2 provenance succeeds normally — the new field does not itself introduce a spurious rejection", async () => {
    const { deps, calls } = makeDeps("user-1");
    expect(CURRENT_VERSIONS.eligibilityVersion).toBe("eligibility_v2");

    const result = await saveCompletedResult(deps, validInput(), TEST_PEOPLE);

    expect(result).toEqual({ ok: true });
    expect(calls).toHaveLength(1);
  });

  it("accepts a claim whose provenance and person-data fingerprint both still equal current state", async () => {
    const { deps } = makeDeps("user-1");
    const result = await saveCompletedResult(deps, validInput(), TEST_PEOPLE);
    expect(result).toEqual({ ok: true });
  });

  it.each([
    ["missing time component", "2026-08-01"],
    ["not a date at all", "not-a-date"],
    ["unreasonably far in the future", "2999-01-01T00:00:00.000Z"],
  ])("rejects an implausible completedAt (%s)", async (_label, completedAt) => {
    const { deps } = makeDeps("user-1");
    const result = await saveCompletedResult(deps, validInput({ completedAt }), TEST_PEOPLE);
    expect(result).toEqual({ ok: false, reason: "invalid_completed_at" });
  });

  it("performs no write when there is no authenticated user", async () => {
    const { deps, calls } = makeDeps(null);
    const result = await saveCompletedResult(deps, validInput(), TEST_PEOPLE);
    expect(result).toEqual({ ok: false, reason: "unauthenticated" });
    expect(calls).toHaveLength(0);
  });

  it("takes the persisted user identity only from the auth dependency, never from the input", async () => {
    const { deps, calls } = makeDeps("user-from-auth-42");
    await saveCompletedResult(deps, validInput(), TEST_PEOPLE);
    expect(calls[0]!.row.user_id).toBe("user-from-auth-42");
  });

  it("persists the canonical token", async () => {
    const { deps, calls } = makeDeps("user-1");
    const token = validToken();
    await saveCompletedResult(deps, validInput({ resultToken: token }), TEST_PEOPLE);
    expect(calls[0]!.row.result_token).toBe(token);
  });

  it("persists the full completion-time version metadata — all ten *_version fields plus person_data_version — with quiz_version taken from the decoded token", async () => {
    const { deps, calls } = makeDeps("user-1");
    await saveCompletedResult(deps, validInput(), TEST_PEOPLE);
    expect(calls[0]!.row).toMatchObject({
      quiz_version: QUIZ.version,
      scoring_version: CURRENT_VERSIONS.scoringVersion,
      taxonomy_version: CURRENT_VERSIONS.taxonomyVersion,
      reference_version: CURRENT_VERSIONS.referenceVersion,
      dispersion_version: CURRENT_VERSIONS.dispersionVersion,
      greatness_scoring_version: CURRENT_VERSIONS.greatnessScoringVersion,
      archetypes_version: CURRENT_VERSIONS.archetypesVersion,
      matching_version: CURRENT_VERSIONS.matchingVersion,
      calibration_version: CURRENT_VERSIONS.calibrationVersion,
      interpretation_version: CURRENT_VERSIONS.interpretationVersion,
      person_data_version: personDataFingerprint(TEST_PEOPLE),
      completed_at: "2026-08-01T00:00:00.000Z",
    });
  });

  // ---------------------------------------------- Phase 10C result_snapshot
  it("computes and persists a valid, schema-tagged result_snapshot only once provenance has been confirmed fresh", async () => {
    const { deps, calls } = makeDeps("user-1");
    await saveCompletedResult(deps, validInput(), TEST_PEOPLE);
    const snapshot = calls[0]!.row.result_snapshot;
    expect(parseResultSnapshot(snapshot)).toBeDefined();
    expect((snapshot as { snapshotSchemaVersion: string }).snapshotSchemaVersion).toBe("result_snapshot_v1");
  });

  it("the persisted snapshot reflects the real closest match computed from the injected roster", async () => {
    const { deps, calls } = makeDeps("user-1");
    await saveCompletedResult(deps, validInput(), TEST_PEOPLE);
    const snapshot = parseResultSnapshot(calls[0]!.row.result_snapshot)!;
    expect(snapshot.closest?.personId).toBe("p_test");
  });

  it("always upserts with ON CONFLICT DO NOTHING semantics on (user_id, result_token)", async () => {
    const { deps, calls } = makeDeps("user-1");
    await saveCompletedResult(deps, validInput(), TEST_PEOPLE);
    expect(calls[0]!.options).toEqual({ onConflict: "user_id,result_token", ignoreDuplicates: true });
  });

  it("is idempotent: repeated saves of the same result resolve to a single stored attempt", async () => {
    const { deps, store } = makeDeps("user-1");
    const input = validInput();
    const first = await saveCompletedResult(deps, input, TEST_PEOPLE);
    const second = await saveCompletedResult(deps, input, TEST_PEOPLE);
    expect(first).toEqual({ ok: true });
    expect(second).toEqual({ ok: true });
    expect(store.size).toBe(1);
  });

  it("does not overwrite the original row's historical metadata OR its immutable snapshot on a duplicate save", async () => {
    const { deps, store } = makeDeps("user-1");
    const token = validToken();

    await saveCompletedResult(deps, validInput({ resultToken: token, completedAt: "2026-08-01T00:00:00.000Z" }), TEST_PEOPLE);
    // A second "save" attempt with a DIFFERENT roster (simulating a person-data
    // edit between the two calls) must never replace the first snapshot —
    // proving ON CONFLICT DO NOTHING protects result_snapshot too, not just
    // the version metadata columns.
    const differentRoster = [makePerson("p_test"), makePerson("p_new")];
    await saveCompletedResult(
      deps,
      validInput({ resultToken: token, completedAt: "2026-08-05T00:00:00.000Z" }),
      differentRoster,
    );

    expect(store.size).toBe(1);
    const stored = store.get(`user-1:${token}`)!;
    expect(stored.completed_at).toBe("2026-08-01T00:00:00.000Z");
  });

  it("surfaces a DB error without throwing", async () => {
    const deps: SaveCompletedResultDeps = {
      auth: {
        async getUser() {
          return { data: { user: { id: "user-1" } }, error: null };
        },
      },
      from() {
        return {
          async upsert() {
            return { error: { message: "boom" } };
          },
        };
      },
    };
    const result = await saveCompletedResult(deps, validInput(), TEST_PEOPLE);
    expect(result).toEqual({ ok: false, reason: "db_error", detail: "boom" });
  });
});
