import "server-only";

/**
 * Real Supabase wiring for `getOrCreateDeepInsideReport` — the ordinary
 * cookie-bound, RLS-scoped client (NOT the admin client): reading and
 * updating a user's OWN `user_profiles` row is exactly what
 * `user_profiles_own`'s existing `for all` RLS policy already permits, no
 * elevated privilege needed. The entitlement check itself happens
 * separately, one layer up (the caller must already have confirmed an
 * active entitlement before calling this at all — see
 * `app/[locale]/deep-inside/page.tsx`).
 */
import { createClient } from "@lib/supabase/server";
import { SEED_PEOPLE } from "@data/people/seed";
import {
  getOrCreateDeepInsideReport,
  type GetOrCreateDeepInsideReportDeps,
  type GetOrCreateDeepInsideReportOutcome,
  type SavedResultRow,
} from "./getOrCreateDeepInsideReport";

export async function getOrCreateDeepInsideReportServer(
  userId: string,
  resultToken: string,
): Promise<GetOrCreateDeepInsideReportOutcome> {
  const supabase = await createClient();

  const deps: GetOrCreateDeepInsideReportDeps = {
    async fetchResultRow(uid, token): Promise<SavedResultRow | undefined> {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("quiz_version, scoring_version, taxonomy_version, completed_at, result_snapshot, deep_report_snapshot")
        .eq("user_id", uid)
        .eq("result_token", token)
        .maybeSingle();
      if (error || !data) return undefined;
      return {
        quizVersion: data.quiz_version,
        scoringVersion: data.scoring_version,
        taxonomyVersion: data.taxonomy_version,
        completedAt: data.completed_at,
        resultSnapshot: data.result_snapshot,
        deepReportSnapshot: data.deep_report_snapshot,
      };
    },
    async saveDeepReportSnapshot(uid, token, snapshot) {
      const { error } = await supabase
        .from("user_profiles")
        .update({ deep_report_snapshot: snapshot, deep_report_generated_at: new Date().toISOString() })
        .eq("user_id", uid)
        .eq("result_token", token);
      if (error) {
        console.error("[deep-inside] failed to persist report snapshot:", { code: error.code, message: error.message });
        return { ok: false };
      }
      return { ok: true };
    },
    people: SEED_PEOPLE,
    now: () => new Date().toISOString(),
  };

  return getOrCreateDeepInsideReport(deps, userId, resultToken);
}
