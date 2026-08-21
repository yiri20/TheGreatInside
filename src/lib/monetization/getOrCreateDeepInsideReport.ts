/**
 * DEEP INSIDE REPORT — get-or-create (Monetization v1).
 *
 * Dependency-injected, same reason as everywhere else: the real Supabase
 * query lives in `getOrCreateDeepInsideReportServer.ts`. This is the ONLY
 * place `buildDeepInsideReport` is ever called from a real request path —
 * and only when no snapshot exists yet for this (user, result) pair. Once
 * generated, a report is frozen forever; a later roster/algorithm change
 * can never silently alter an already-purchased report.
 */
import type { Person } from "@core/types";
import { buildDeepInsideReport } from "@core/monetization/deepInsideReport";
import { parseDeepInsideReport, type DeepInsideReportV1 } from "@core/monetization/deepInsideSnapshot";
import { reconstructUserProfileFromResultSnapshot } from "@core/monetization/reconstructUserProfile";
import { parseResultSnapshot } from "@core/results/snapshot";

export interface SavedResultRow {
  quizVersion: string;
  scoringVersion: string;
  taxonomyVersion: string;
  completedAt: string;
  resultSnapshot: unknown;
  deepReportSnapshot: unknown;
}

export interface GetOrCreateDeepInsideReportDeps {
  fetchResultRow(userId: string, resultToken: string): Promise<SavedResultRow | undefined>;
  saveDeepReportSnapshot(
    userId: string,
    resultToken: string,
    snapshot: DeepInsideReportV1,
  ): Promise<{ ok: boolean }>;
  people: readonly Person[];
  /** Injected clock — `src/lib` may call `Date.now()`, this is just the
   *  same "narrow the interface so tests can control it" discipline every
   *  other DI'd module in this project already uses. */
  now(): string;
}

export type GetOrCreateDeepInsideReportOutcome =
  | { ok: true; report: DeepInsideReportV1 }
  | { ok: false; reason: "not_found" | "invalid_free_snapshot" | "db_error" };

export async function getOrCreateDeepInsideReport(
  deps: GetOrCreateDeepInsideReportDeps,
  userId: string,
  resultToken: string,
): Promise<GetOrCreateDeepInsideReportOutcome> {
  const row = await deps.fetchResultRow(userId, resultToken);
  if (!row) return { ok: false, reason: "not_found" };

  const existing = parseDeepInsideReport(row.deepReportSnapshot);
  if (existing) return { ok: true, report: existing };

  const freeSnapshot = parseResultSnapshot(row.resultSnapshot);
  if (!freeSnapshot) return { ok: false, reason: "invalid_free_snapshot" };

  const user = reconstructUserProfileFromResultSnapshot(freeSnapshot, {
    quizVersion: row.quizVersion,
    scoringVersion: row.scoringVersion,
    taxonomyVersion: row.taxonomyVersion,
    completedAt: row.completedAt,
  });

  const report = buildDeepInsideReport(user, deps.people, deps.now());

  const saved = await deps.saveDeepReportSnapshot(userId, resultToken, report);
  if (!saved.ok) return { ok: false, reason: "db_error" };

  return { ok: true, report };
}
