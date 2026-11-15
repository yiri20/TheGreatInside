/**
 * Registry-derived roster membership for the cumulative "deliberately directory-visible but not match-eligible"
 * assertions.
 *
 * `profilePublicationSeparation.test.ts` and `matching.test.ts` used to carry hand-maintained ~700-slug literals
 * that every roster extended. Their meaning is: every person added by the new-candidate cycles (roster24 onward)
 * is published but, by honest evidence-based scoring, not match-eligible -- except a short list of explicit
 * exceptions -- plus a short explicit list of legacy people whose remediation made them non-eligible. The roster
 * part is now derived from the lineage registry (`NAMED_ROSTERS`), the exceptions stay explicit and reviewable.
 *
 * The derived sets were proven identical to the old literals when this module was introduced (see
 * docs/checkpoints/roster-maintenance-after-67.md). A future roster person who IS match-eligible must be added to
 * RECENT_ROSTER_ELIGIBLE_EXCEPTIONS deliberately: the assertions fail until a human decides.
 */
import { buildLineageMap } from "./audits/matchPoolIntegrityAudit.js";

/** First roster number of the new-candidate (portrait-gated, publication-independent) cycles. */
export const FIRST_NEW_CANDIDATE_ROSTER = 24;

/** People from roster24+ that ARE match-eligible (genuine evidence produced eligibility), so they are not in the set. */
export const RECENT_ROSTER_ELIGIBLE_EXCEPTIONS: readonly string[] = ["carl-jung", "nellie-bly", "che-guevara"];

/** Legacy people made non-eligible by the legacy-integrity remediation batches (directory-visible, not eligible). */
export const LEGACY_REMEDIATED_NON_ELIGIBLE_SLUGS: readonly string[] = [
  "akira-kurosawa",
  "bruce-lee",
  "ludwig-van-beethoven",
  "nikola-tesla",
  "srinivasa-ramanujan",
  "toni-morrison",
  "hayao-miyazaki",
  "richard-feynman",
  "simone-biles",
  "steve-jobs",
  "genghis-khan",
  "serena-williams",
  "oprah-winfrey",
];

/** `rosterN` label -> N, or undefined for labels that are not numbered rosters. */
export function rosterNumber(label: string): number | undefined {
  if (!label.startsWith("roster")) return undefined;
  const digits = label.slice("roster".length);
  if (digits.length === 0) return undefined;
  for (const ch of digits) if (ch < "0" || ch > "9") return undefined;
  return Number(digits);
}

/** Slugs of every person registered in rosters 24 and later (from the lineage registry). */
export function recentRosterSlugs(): string[] {
  const out: string[] = [];
  for (const [slug, label] of buildLineageMap()) {
    const n = rosterNumber(label);
    if (n !== undefined && n >= FIRST_NEW_CANDIDATE_ROSTER) out.push(slug);
  }
  return out;
}

/** The set the cumulative "published but not match-eligible" assertions iterate: recent rosters minus exceptions, plus legacy. */
export function knownDirectoryVisibleNonEligibleSlugs(): Set<string> {
  const exceptions = new Set(RECENT_ROSTER_ELIGIBLE_EXCEPTIONS);
  const set = new Set(recentRosterSlugs().filter((s) => !exceptions.has(s)));
  for (const s of LEGACY_REMEDIATED_NON_ELIGIBLE_SLUGS) set.add(s);
  return set;
}
