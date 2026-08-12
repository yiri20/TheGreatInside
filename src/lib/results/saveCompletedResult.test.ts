import { describe, expect, it } from "vitest";
import { QUIZ } from "@core/quiz/bank";
import { encodeResultToken } from "@core/quiz/serialize";
import type { QuizResponse } from "@core/quiz/types";
import { CURRENT_VERSIONS, type VersionSnapshot } from "@core/versions";
import { saveCompletedResult, type SaveCompletedResultDeps, type SaveCompletedResultInput } from "./saveCompletedResult.js";

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
    const result = await saveCompletedResult(deps, validInput({ resultToken: "not-a-valid-token" }));
    expect(result).toEqual({ ok: false, reason: "invalid_token" });
  });

  it("rejects an incomplete token", async () => {
    const { deps } = makeDeps("user-1");
    const incompleteToken = encodeResultToken(fullAnswers().slice(0, -1), QUIZ);
    const result = await saveCompletedResult(deps, validInput({ resultToken: incompleteToken }));
    expect(result).toEqual({ ok: false, reason: "incomplete_token" });
  });

  it("rejects a noncanonical token (decodes fine, but isn't the canonical re-encoding) rather than silently normalizing it", async () => {
    const { deps } = makeDeps("user-1");
    const withTrailingJunk = `${validToken()}z`; // decode ignores the extra char, but it's not canonical
    const result = await saveCompletedResult(deps, validInput({ resultToken: withTrailingJunk }));
    expect(result).toEqual({ ok: false, reason: "noncanonical_token" });
  });

  it("rejects an unknown version provenance snapshot", async () => {
    const { deps } = makeDeps("user-1");
    const bogusProvenance: VersionSnapshot = { ...CURRENT_VERSIONS, matchingVersion: "matching_v999" };
    const result = await saveCompletedResult(deps, validInput({ provenance: bogusProvenance }));
    expect(result).toEqual({ ok: false, reason: "unknown_version_provenance" });
  });

  it("rejects a KNOWN provenance snapshot when its quizVersion doesn't match the token's (version_mismatch, distinct from unknown_version_provenance)", async () => {
    const { deps } = makeDeps("user-1");
    const olderSnapshot: VersionSnapshot = { ...CURRENT_VERSIONS, quizVersion: "quiz_v1_hypothetical", matchingVersion: "matching_v1" };
    const registryWithBothEras = [olderSnapshot, CURRENT_VERSIONS];

    const result = await saveCompletedResult(
      deps,
      validInput({ provenance: olderSnapshot }), // token is a real quiz_v2 token; provenance claims a different, still-known quiz version
      registryWithBothEras,
    );
    expect(result).toEqual({ ok: false, reason: "version_mismatch" });
  });

  it.each([
    ["missing time component", "2026-08-01"],
    ["not a date at all", "not-a-date"],
    ["unreasonably far in the future", "2999-01-01T00:00:00.000Z"],
  ])("rejects an implausible completedAt (%s)", async (_label, completedAt) => {
    const { deps } = makeDeps("user-1");
    const result = await saveCompletedResult(deps, validInput({ completedAt }));
    expect(result).toEqual({ ok: false, reason: "invalid_completed_at" });
  });

  it("performs no write when there is no authenticated user", async () => {
    const { deps, calls } = makeDeps(null);
    const result = await saveCompletedResult(deps, validInput());
    expect(result).toEqual({ ok: false, reason: "unauthenticated" });
    expect(calls).toHaveLength(0);
  });

  it("takes the persisted user identity only from the auth dependency, never from the input", async () => {
    const { deps, calls } = makeDeps("user-from-auth-42");
    await saveCompletedResult(deps, validInput());
    expect(calls[0]!.row.user_id).toBe("user-from-auth-42");
  });

  it("persists the canonical token", async () => {
    const { deps, calls } = makeDeps("user-1");
    const token = validToken();
    await saveCompletedResult(deps, validInput({ resultToken: token }));
    expect(calls[0]!.row.result_token).toBe(token);
  });

  it("persists the approved completion-time version metadata, with quiz_version taken from the decoded token", async () => {
    const { deps, calls } = makeDeps("user-1");
    await saveCompletedResult(deps, validInput());
    expect(calls[0]!.row).toMatchObject({
      quiz_version: QUIZ.version,
      scoring_version: CURRENT_VERSIONS.scoringVersion,
      taxonomy_version: CURRENT_VERSIONS.taxonomyVersion,
      greatness_scoring_version: CURRENT_VERSIONS.greatnessScoringVersion,
      matching_version: CURRENT_VERSIONS.matchingVersion,
      calibration_version: CURRENT_VERSIONS.calibrationVersion,
      completed_at: "2026-08-01T00:00:00.000Z",
    });
  });

  it("always upserts with ON CONFLICT DO NOTHING semantics on (user_id, result_token)", async () => {
    const { deps, calls } = makeDeps("user-1");
    await saveCompletedResult(deps, validInput());
    expect(calls[0]!.options).toEqual({ onConflict: "user_id,result_token", ignoreDuplicates: true });
  });

  it("is idempotent: repeated saves of the same result resolve to a single stored attempt", async () => {
    const { deps, store } = makeDeps("user-1");
    const input = validInput();
    const first = await saveCompletedResult(deps, input);
    const second = await saveCompletedResult(deps, input);
    expect(first).toEqual({ ok: true });
    expect(second).toEqual({ ok: true });
    expect(store.size).toBe(1);
  });

  it("does not overwrite the original row's historical metadata on a duplicate save", async () => {
    const { deps, store } = makeDeps("user-1");
    const token = validToken();

    await saveCompletedResult(deps, validInput({ resultToken: token, completedAt: "2026-08-01T00:00:00.000Z" }));
    await saveCompletedResult(deps, validInput({ resultToken: token, completedAt: "2026-08-05T00:00:00.000Z" }));

    expect(store.size).toBe(1);
    expect(store.get(`user-1:${token}`)?.completed_at).toBe("2026-08-01T00:00:00.000Z");
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
    const result = await saveCompletedResult(deps, validInput());
    expect(result).toEqual({ ok: false, reason: "db_error", detail: "boom" });
  });
});
