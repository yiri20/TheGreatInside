/**
 * PENDING OWN-COMPLETION QUEUE — Phase 9 Stage 9C.
 *
 * `tgi_last_result_v1` (results/SaveLastResult.tsx) means "the last result
 * this browser VIEWED" — it fires on every successful /results visit,
 * including one reached via someone else's shared link. It must never be
 * treated as proof of ownership: automatically migrating it into account
 * history on sign-in could silently claim a DIFFERENT person's viewed
 * result as the signed-in user's own.
 *
 * `tgi_pending_own_results_v1` is the provenance-safe alternative: written
 * ONLY from the single real completion point in the app (see
 * app/[locale]/quiz/page.tsx's goNext(), right where the token is first
 * produced from this browser's own just-submitted answers). A bounded,
 * deduplicated QUEUE rather than a single marker — a visitor can complete
 * the quiz more than once before ever signing in, and none of those
 * completions should be silently lost. No cloud sync: this queue only ever
 * exists in localStorage until a future (Stage 9D) migration reads and
 * clears it. `tgi_quiz_draft_v1` (the IN-PROGRESS draft) is a separate,
 * unrelated mechanism and stays untouched by this module.
 */
import { CURRENT_VERSIONS, type VersionSnapshot } from "@core/versions";
import { personDataFingerprint, type FingerprintablePerson } from "@core/people/dataVersion";

export const PENDING_OWN_RESULTS_KEY = "tgi_pending_own_results_v1";

/**
 * Phase 10C hardening (2026-08, third review): an entry — legacy-format OR
 * a current-format entry whose provenance genuinely drifted before it
 * could be claimed — must be PRESERVED, never deleted, merely because the
 * user signed in. Both represent a real anonymous completion whose exact
 * historical replay can no longer be confirmed; deleting either would
 * destroy the one record of it. This is the single permanent, separate
 * store either kind is MOVED into (never copied, never left duplicated in
 * both places) the first time `processPendingResults` encounters it
 * post-sign-in — quarantined, not cleared, and tagged with WHY (see
 * `IncompatibleReason`). Entries here are recoverable/inspectable
 * indefinitely; nothing in this module ever removes one automatically.
 * `dismissIncompatiblePendingResult` is the one explicit, user-initiated
 * removal path, reserved for a future retake/acknowledge UI action this
 * stage deliberately does not build yet.
 */
export const INCOMPATIBLE_PENDING_RESULTS_KEY = "tgi_incompatible_pending_results_v1";

/** Defensive bound against unlimited anonymous retakes accumulating before
 *  a first sign-in — not a claim that older attempts matter less. */
const MAX_PENDING = 5;

export interface PendingOwnResult {
  resultToken: string;
  /** ISO 8601, snapshotted client-side at completion. Informational
   *  provenance only — see saveCompletedResult.ts's own validation of this
   *  same value once it reaches the server; never trusted for anything here. */
  completedAt: string;
  /** Snapshotted from CURRENT_VERSIONS at completion time — NOT re-read
   *  from current code at migration time, so a completion produced under
   *  an older version combination keeps describing itself accurately even
   *  after the app has moved on (see src/core/versions.ts). */
  provenance: VersionSnapshot;
  /**
   * Phase 10C: `personDataFingerprint(SEED_PEOPLE)` at the moment this
   * browser actually completed the quiz — a SIBLING field to `provenance`,
   * not part of it (see `src/core/people/dataVersion.ts`'s doc comment on
   * why person-data drift is a different kind of check than "is this a
   * known code version"). Compared for plain equality against the CURRENT
   * roster at claim time; any difference means the person dataset changed
   * between completion and sign-in, and the claim must not silently
   * recompute-and-save under the new data as though it were the original.
   */
  personDataVersion: string;
}

/**
 * A queue entry written by code from BEFORE Phase 10C added
 * `personDataVersion` (and before `VersionSnapshot` grew from 6 to 10
 * fields) — recognizably a real, well-formed completion record, just one
 * this browser produced under an app version that predates the fields the
 * claim-time drift guard now requires. There is no way to retroactively
 * know what the person roster looked like when it was written, so it can
 * never be safely evaluated for drift — but it must still be handled
 * EXPLICITLY (see `processPendingResults.ts`), not silently dropped by a
 * read-side filter the way genuine garbage is. See `isLegacyPendingOwnResult`.
 */
export interface LegacyPendingOwnResult {
  resultToken: string;
  completedAt: string;
  provenance: VersionSnapshot;
}

/**
 * Phase 10C (third review). WHY an entry was quarantined — the two cases
 * are genuinely different in kind, not just in code path:
 *  - "legacy_format": the entry predates the provenance fields entirely;
 *    it was NEVER checked against a live save attempt at all.
 *  - "provenance_drift": the entry WAS a real, well-formed Phase-10C-era
 *    completion, actually submitted to `saveCompletedResult`, which
 *    confirmed its completion-time provenance no longer matches current
 *    server state (a real version bump or roster edit happened in
 *    between). The save was correctly rejected — nothing was ever written
 *    to the database — but the client-side record of the attempt is kept
 *    for the same reason a legacy entry is: it's still the only surviving
 *    trace of a real anonymous completion.
 */
export type IncompatibleReason = "legacy_format" | "provenance_drift";

/**
 * The quarantine store's entry shape — a legacy entry's fields plus the
 * `reason` discriminator, and (only for `provenance_drift`) the
 * `personDataVersion` a legacy entry never had to begin with.
 */
export interface QuarantinedPendingResult {
  resultToken: string;
  completedAt: string;
  provenance: VersionSnapshot;
  personDataVersion?: string;
  reason: IncompatibleReason;
}

/** Narrow, injectable storage surface — matches the subset of
 *  window.localStorage this module actually uses, so tests can supply a
 *  plain in-memory fake under Vitest's Node environment without jsdom. */
export interface PendingResultStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function browserStorage(): PendingResultStorage | undefined {
  return typeof window === "undefined" ? undefined : window.localStorage;
}

/** The CURRENT (Roster-1000 session 10, 11-field) `VersionSnapshot` shape —
 *  used to validate `PendingOwnResult.provenance`. Deliberately stricter
 *  than either legacy check below: a provenance object missing
 *  `eligibilityVersion` (added this session) or any of the four Phase 10C
 *  fields before it must NOT be accepted as a fully-current entry, even if
 *  `personDataVersion` happens to be present. */
function isCurrentVersionSnapshot(v: unknown): v is VersionSnapshot {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.quizVersion === "string" &&
    typeof o.scoringVersion === "string" &&
    typeof o.taxonomyVersion === "string" &&
    typeof o.referenceVersion === "string" &&
    typeof o.dispersionVersion === "string" &&
    typeof o.greatnessScoringVersion === "string" &&
    typeof o.archetypesVersion === "string" &&
    typeof o.matchingVersion === "string" &&
    typeof o.calibrationVersion === "string" &&
    typeof o.interpretationVersion === "string" &&
    typeof o.eligibilityVersion === "string"
  );
}

/** The pre-Phase-10C (6-field) `VersionSnapshot` shape — deliberately the
 *  ONLY thing that distinguishes a genuine legacy entry from garbage. */
function isLegacySixFieldProvenance(v: unknown): v is VersionSnapshot {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.quizVersion === "string" &&
    typeof o.scoringVersion === "string" &&
    typeof o.taxonomyVersion === "string" &&
    typeof o.greatnessScoringVersion === "string" &&
    typeof o.matchingVersion === "string" &&
    typeof o.calibrationVersion === "string"
  );
}

/** The Phase-10C-through-session-9 (10-field, pre-`eligibilityVersion`)
 *  `VersionSnapshot` shape — a SECOND legacy tier, added Roster-1000
 *  session 10, exactly parallel to `isLegacySixFieldProvenance` above: a
 *  browser-stored entry written by code from before this session added
 *  `eligibilityVersion` is a real, well-formed completion record under an
 *  app version that predates the field the claim-time drift guard now
 *  requires — recognizable, not garbage, but (like the 6-field case)
 *  never safe to drift-check, since there is no way to retroactively know
 *  which eligibility rule was live when it was written. This is literally
 *  the same migration this file already went through once, for the
 *  6-field -> 10-field Phase 10C expansion — same shape of fix, applied a
 *  second time. */
function isLegacyTenFieldProvenance(v: unknown): v is VersionSnapshot {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.quizVersion === "string" &&
    typeof o.scoringVersion === "string" &&
    typeof o.taxonomyVersion === "string" &&
    typeof o.referenceVersion === "string" &&
    typeof o.dispersionVersion === "string" &&
    typeof o.greatnessScoringVersion === "string" &&
    typeof o.archetypesVersion === "string" &&
    typeof o.matchingVersion === "string" &&
    typeof o.calibrationVersion === "string" &&
    typeof o.interpretationVersion === "string"
  );
}

function isPendingOwnResult(v: unknown): v is PendingOwnResult {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.resultToken === "string" &&
    o.resultToken.length > 0 &&
    typeof o.completedAt === "string" &&
    isCurrentVersionSnapshot(o.provenance) &&
    typeof o.personDataVersion === "string" &&
    o.personDataVersion.length > 0
  );
}

/** Accepts EITHER legacy provenance shape (the pre-Phase-10C 6-field form,
 *  or the pre-session-10 10-field form missing only `eligibilityVersion`)
 *  as long as it is NOT the current, fully-current shape — either way,
 *  this entry cannot be safely drift-checked and must be routed to the
 *  explicit incompatible path, never silently treated as current. */
function isLegacyPendingOwnResult(v: unknown): v is LegacyPendingOwnResult {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  if (typeof o.resultToken !== "string" || o.resultToken.length === 0) return false;
  if (typeof o.completedAt !== "string") return false;
  if (!isLegacySixFieldProvenance(o.provenance) && !isLegacyTenFieldProvenance(o.provenance)) return false;
  return !isCurrentVersionSnapshot(o.provenance);
}

/** Validates a quarantine-store entry against its OWN declared `reason` —
 *  a `legacy_format` entry must have the 6-field shape and no
 *  `personDataVersion`; a `provenance_drift` entry must have the full
 *  10-field shape AND a real `personDataVersion`. Never accepts a mismatch
 *  between the two (e.g. a `reason: "legacy_format"` entry carrying a
 *  full current-shape provenance) — that combination cannot arise from
 *  this module's own write path and is therefore treated as corrupted. */
function isQuarantinedPendingResult(v: unknown): v is QuarantinedPendingResult {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  if (typeof o.resultToken !== "string" || o.resultToken.length === 0) return false;
  if (typeof o.completedAt !== "string") return false;
  if (o.reason === "legacy_format") {
    return (
      (isLegacySixFieldProvenance(o.provenance) || isLegacyTenFieldProvenance(o.provenance)) &&
      !isCurrentVersionSnapshot(o.provenance) &&
      o.personDataVersion === undefined
    );
  }
  if (o.reason === "provenance_drift") {
    return isCurrentVersionSnapshot(o.provenance) && typeof o.personDataVersion === "string" && o.personDataVersion.length > 0;
  }
  return false;
}

interface ParsedQueue {
  current: PendingOwnResult[];
  legacy: LegacyPendingOwnResult[];
}

/** Single parse pass, splitting into current-shape entries (safe to
 *  drift-check and save) and legacy entries (recognizable, but never
 *  safe to drift-check — see `LegacyPendingOwnResult`'s doc comment).
 *  Anything matching NEITHER shape is genuine garbage and is dropped here,
 *  exactly as before this Phase 10C hardening pass. */
function readRawQueue(storage: PendingResultStorage | undefined): ParsedQueue {
  if (!storage) return { current: [], legacy: [] };
  let raw: string | null;
  try {
    raw = storage.getItem(PENDING_OWN_RESULTS_KEY);
  } catch {
    return { current: [], legacy: [] };
  }
  if (!raw) return { current: [], legacy: [] };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { current: [], legacy: [] };
  }
  if (!Array.isArray(parsed)) return { current: [], legacy: [] };

  const current: PendingOwnResult[] = [];
  const legacy: LegacyPendingOwnResult[] = [];
  for (const item of parsed) {
    if (isPendingOwnResult(item)) current.push(item);
    else if (isLegacyPendingOwnResult(item)) legacy.push(item);
  }
  return { current, legacy };
}

/**
 * Writes back BOTH current and legacy entries, always — this is what
 * actually closes the "silently cleared" gap: an earlier version of this
 * module's `readQueue` returned only current-shape entries, and every
 * write-back round-tripped through that filtered list, so any co-existing
 * legacy entry would have silently vanished from storage the next time
 * ANY unrelated entry was enqueued or cleared, as a side effect nobody
 * decided on explicitly. Now, an entry is only ever removed from the
 * active queue by an explicit call naming its own token — either
 * `clearPendingOwnResult` (a real save succeeded, or the entry was
 * genuine garbage) or a move into quarantine (see below).
 */
function writeQueue(
  storage: PendingResultStorage | undefined,
  current: PendingOwnResult[],
  legacy: LegacyPendingOwnResult[],
): void {
  if (!storage) return;
  try {
    storage.setItem(PENDING_OWN_RESULTS_KEY, JSON.stringify([...current, ...legacy]));
  } catch {
    // Private-browsing/quota failures are non-fatal — same rationale as
    // saveDraft in app/[locale]/quiz/page.tsx.
  }
}

function readQuarantineStore(storage: PendingResultStorage | undefined): QuarantinedPendingResult[] {
  if (!storage) return [];
  let raw: string | null;
  try {
    raw = storage.getItem(INCOMPATIBLE_PENDING_RESULTS_KEY);
  } catch {
    return [];
  }
  if (!raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  return Array.isArray(parsed) ? parsed.filter(isQuarantinedPendingResult) : [];
}

function writeQuarantineStore(storage: PendingResultStorage | undefined, entries: QuarantinedPendingResult[]): void {
  if (!storage) return;
  try {
    storage.setItem(INCOMPATIBLE_PENDING_RESULTS_KEY, JSON.stringify(entries));
  } catch {
    // Private-browsing/quota failures are non-fatal, same as writeQueue —
    // see the two quarantine-move functions' own doc comments for how
    // their callers stay safe even if this particular write silently
    // fails (the entry is verified present before being removed from the
    // active queue, never removed speculatively).
  }
}

/**
 * Adds `entry` to the quarantine store (deduplicated by resultToken,
 * idempotent) and returns whether it is CONFIRMED present there
 * afterward — read back from storage, not merely assumed from the write
 * having been attempted. Callers use this return value to decide whether
 * it is safe to remove the original from the active queue; see
 * `quarantineIncompatiblePendingResult`/`quarantineDriftedPendingResult`.
 */
function moveIntoQuarantine(storage: PendingResultStorage | undefined, entry: QuarantinedPendingResult): boolean {
  const quarantined = readQuarantineStore(storage);
  if (!quarantined.some((e) => e.resultToken === entry.resultToken)) {
    writeQuarantineStore(storage, [...quarantined, entry]);
  }
  return readQuarantineStore(storage).some((e) => e.resultToken === entry.resultToken);
}

/**
 * Called ONLY from the single real quiz-completion point. Deduplicates by
 * resultToken (a retake with identical answers doesn't grow the queue) and
 * caps at MAX_PENDING (current-shape entries only — see below), dropping
 * the OLDEST entry first on overflow.
 *
 * `people` (Phase 10C) is the roster as it exists RIGHT NOW, at the moment
 * this browser completed the quiz — the caller passes `SEED_PEOPLE`
 * directly, the same static import `/results` itself reads. Fingerprinting
 * it here, not at claim time, is the whole point: it captures what was
 * true at completion, independent of how long the browser waits before an
 * eventual sign-in.
 */
export function enqueuePendingOwnResult(
  resultToken: string,
  people: readonly FingerprintablePerson[],
  storage: PendingResultStorage | undefined = browserStorage(),
): void {
  const { current, legacy } = readRawQueue(storage);
  const nextCurrent = current.filter((e) => e.resultToken !== resultToken);
  nextCurrent.push({
    resultToken,
    completedAt: new Date().toISOString(),
    provenance: CURRENT_VERSIONS,
    personDataVersion: personDataFingerprint(people),
  });
  // MAX_PENDING bounds only the current-shape queue — a defensive cap
  // against unlimited anonymous retakes accumulating, unrelated to the
  // (at most transitional, never-growing-after-this-deploy) legacy list.
  while (nextCurrent.length > MAX_PENDING) nextCurrent.shift();
  writeQueue(storage, nextCurrent, legacy);
}

/** Current-shape entries only — safe to drift-check and save. See
 *  `readIncompatibleLegacyResultTokens` for the pre-Phase-10C entries this
 *  deliberately excludes. */
export function readPendingOwnResults(
  storage: PendingResultStorage | undefined = browserStorage(),
): PendingOwnResult[] {
  return readRawQueue(storage).current;
}

/**
 * Phase 10C. Result tokens for legacy entries STILL SITTING IN THE ACTIVE
 * QUEUE — i.e. not yet quarantined. Once `processPendingResults` has
 * quarantined one (see `quarantineIncompatiblePendingResult` below), this
 * list no longer includes it — that is what stops it from being detected
 * and reported again on every subsequent run. The entry itself is NOT
 * gone; see `readIncompatiblePendingResults` for where it now lives.
 */
export function readIncompatibleLegacyResultTokens(
  storage: PendingResultStorage | undefined = browserStorage(),
): string[] {
  return readRawQueue(storage).legacy.map((e) => e.resultToken);
}

/** Idempotent: clearing a token not present in the queue (current OR
 *  legacy) is a no-op. Only ever removes the ONE named token — see
 *  `writeQueue`'s doc comment for why this no longer has a side effect on
 *  unrelated entries. Deliberately NEVER called for an entry headed to
 *  quarantine (legacy-format, or a current-format entry that came back
 *  `provenance_drift`) — those leave the active queue only through the two
 *  quarantine-move functions below, never through this one. */
export function clearPendingOwnResult(
  resultToken: string,
  storage: PendingResultStorage | undefined = browserStorage(),
): void {
  const { current, legacy } = readRawQueue(storage);
  writeQueue(
    storage,
    current.filter((e) => e.resultToken !== resultToken),
    legacy.filter((e) => e.resultToken !== resultToken),
  );
}

/**
 * The permanent home for a quarantined entry (either reason) once
 * `processPendingResults` has moved it — full entries, not just tokens,
 * tagged with `reason` so a future recovery UI can tell the two cases
 * apart, so it has everything it needs without any additional lookup.
 * Currently unread by any UI (per instruction: no recovery flow yet) —
 * exposed so that future stage doesn't need to touch this module's
 * storage format again.
 */
export function readIncompatiblePendingResults(
  storage: PendingResultStorage | undefined = browserStorage(),
): QuarantinedPendingResult[] {
  return readQuarantineStore(storage);
}

/**
 * MOVES (never copies, never deletes-without-relocating) a legacy-format
 * entry from the active queue into the permanent quarantine store, tagged
 * `reason: "legacy_format"`. Called ONLY from `processPendingResults.ts`,
 * only once signed in — matching every other queue mutation in this
 * module never touching storage anonymously.
 *
 * Ordered deliberately for safety under a private-browsing/quota failure:
 * the entry is written to quarantine and CONFIRMED present there (via
 * `moveIntoQuarantine`'s read-back) BEFORE being removed from the active
 * queue. If the quarantine write silently fails, the entry simply stays in
 * the active queue — still fully intact, to be quarantined again on a
 * later run — rather than risking the one outcome this function must never
 * produce: the token existing in neither place. A no-op if `resultToken`
 * isn't currently a legacy entry in the active queue (already quarantined,
 * or never existed) — idempotent, safe to call more than once.
 *
 * Builds the quarantined record from EXPLICITLY NAMED fields
 * (`resultToken`/`completedAt`/`provenance`/`reason`) rather than
 * `{ ...toQuarantine, reason: "legacy_format" }` — `toQuarantine` is typed
 * `LegacyPendingOwnResult` (no `personDataVersion` field), but TypeScript's
 * type narrowing does not strip extra properties from the underlying
 * object at runtime: the session-10 legacy tier (a real, well-formed
 * 10-field entry, unlike the 6-field tier, DOES carry a genuine
 * `personDataVersion` in its raw stored JSON) would otherwise leak that
 * field into the quarantine store, where `isQuarantinedPendingResult`
 * correctly expects `legacy_format` entries to have none (the entire
 * point of that reason is "never safe to drift-check", which
 * `personDataVersion`'s presence would misleadingly suggest otherwise) —
 * found and fixed via the new 10-field-tier tests, not merely theoretical.
 */
export function quarantineIncompatiblePendingResult(
  resultToken: string,
  storage: PendingResultStorage | undefined = browserStorage(),
): void {
  const { current, legacy } = readRawQueue(storage);
  const toQuarantine = legacy.find((e) => e.resultToken === resultToken);
  if (!toQuarantine) return;

  const record: QuarantinedPendingResult = {
    resultToken: toQuarantine.resultToken,
    completedAt: toQuarantine.completedAt,
    provenance: toQuarantine.provenance,
    reason: "legacy_format",
  };
  if (moveIntoQuarantine(storage, record)) {
    writeQueue(storage, current, legacy.filter((e) => e.resultToken !== resultToken));
  }
}

/**
 * MOVES a current-format entry from the active queue into the permanent
 * quarantine store, tagged `reason: "provenance_drift"`. Called ONLY from
 * `processPendingResults.ts`, and ONLY after `saveCompletedResult` has
 * ITSELF returned `{ ok: false, reason: "provenance_drift" }` for this
 * exact entry — i.e. a real save was attempted and correctly rejected
 * because completion-time provenance no longer matches current server
 * state. Never called speculatively or merely because a version bump is
 * suspected; the drift determination always comes from the server, never
 * from client-side guessing.
 *
 * Same confirmed-before-remove ordering as
 * `quarantineIncompatiblePendingResult` above, for the same reason. A
 * no-op if `resultToken` isn't currently a current-shape entry in the
 * active queue.
 */
export function quarantineDriftedPendingResult(
  resultToken: string,
  storage: PendingResultStorage | undefined = browserStorage(),
): void {
  const { current, legacy } = readRawQueue(storage);
  const toQuarantine = current.find((e) => e.resultToken === resultToken);
  if (!toQuarantine) return;

  if (moveIntoQuarantine(storage, { ...toQuarantine, reason: "provenance_drift" })) {
    writeQueue(storage, current.filter((e) => e.resultToken !== resultToken), legacy);
  }
}

/**
 * The ONE explicit, user-initiated removal path for a quarantined entry —
 * per the historical-fidelity contract, a quarantined entry (either
 * reason) may only ever be removed by the user's own explicit choice (e.g.
 * a future "retake" or "dismiss" action), never automatically. NOT called
 * from anywhere in this codebase yet — deliberately: this stage builds the
 * preservation mechanism only, not the recovery UI that would call this.
 */
export function dismissIncompatiblePendingResult(
  resultToken: string,
  storage: PendingResultStorage | undefined = browserStorage(),
): void {
  writeQuarantineStore(
    storage,
    readQuarantineStore(storage).filter((e) => e.resultToken !== resultToken),
  );
}
