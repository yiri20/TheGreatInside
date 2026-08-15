/**
 * PERSON-DATA FINGERPRINT — Phase 10C, widened Roster-1000 session 4.
 *
 * The historical-result-fidelity design audit found that the roster/person
 * dataset (`SEED_PEOPLE`) is an output-affecting dependency of `/results`
 * with NO version representation anywhere in the codebase — not even an
 * unused constant like `REFERENCE_VERSION`/`DISPERSION_VERSION` had. Unlike
 * those, a HAND-MAINTAINED "bump this string when you edit a person"
 * constant would be failure-prone by this project's own history: individual
 * trait-score corrections (e.g. the Phase 6.6 Buffett `opportunity_sensing`
 * fix) have always shipped with no version bump at all, because they're
 * normal editorial review, not a taxonomy/algorithm release. A COMPUTED
 * fingerprint removes that discipline requirement entirely — it is
 * definitionally always current, by construction, and can never be
 * forgotten.
 *
 * **Widened (session 4, real provenance audit, not a hypothetical
 * concern): `dispersion.generated.ts`'s `DISPERSION_TABLE` is exactly the
 * same category of dependency `personDataFingerprint` was invented to
 * cover, and was missing from it.** `DISPERSION_VERSION` is a hand-written
 * literal (`"dispersion_v1"`) that has never been bumped, including across
 * the roster-1000 session-3 batch, which regenerated every one of
 * `DISPERSION_TABLE`'s 34 weights (confirmed directly via `git show` on
 * that commit — e.g. `belief_updating` moved 0.8296 -> 1.2186) with the
 * version string held constant. Those weights are multiplied directly into
 * `similarity.ts`'s per-attribute distance term, so a saved result's
 * displayed Match% is a real function of this table, not merely of the
 * person roster. Before this widening, an old anonymous pending result
 * completed under a stale dispersion table would have passed
 * `saveCompletedResult`'s drift guard cleanly (`dispersionVersion` string
 * and `personDataFingerprint` both byte-identical to current), and been
 * saved as if it were still faithful to what the user actually saw — the
 * exact failure mode this whole fingerprinting mechanism exists to
 * prevent. Folding `DISPERSION_TABLE` into this SAME fingerprint (rather
 * than inventing a second, parallel computed-fingerprint plus a new DB
 * column) is the smaller, more consistent fix: one fingerprint already
 * threaded through the client capture, the server drift check, and the
 * `person_data_version` DB column: covers both dependencies now the
 * doc comment always claimed only the first one had. The DB column's name
 * and shape are unchanged — it already stores an opaque, algorithm-tagged
 * string, so widening what that string covers needed no migration.
 *
 * This is a drift *detector*, not a security boundary or a historical
 * archive key: it only ever answers "does this match the roster AND
 * dispersion table RIGHT NOW", compared directly against a value captured
 * at anonymous quiz completion. It is deliberately NOT part of
 * `VersionSnapshot` — that type models "a known, shipped CODE version
 * combination" (checked against an append-only allowlist); this models
 * "the live data's current shape" (checked for plain equality against
 * right now, never against a list of historically-known values, since
 * there is no such list and none is needed for this purpose — see
 * `versions.ts`'s own doc comment).
 *
 * Only output-affecting fields are hashed: which people exist and are
 * match-eligible (roster membership/eligibility drift), each person's
 * archetype assignments (feeds Greatness's target-shrinkage in
 * `archetypes.ts`), every scored attribute's score/confidence/impact
 * (feeds matching directly and impact feeds displayed trait cards), and
 * now every attribute's discriminative dispersion weight (feeds matching's
 * distance computation directly). Everything else on `Person` (name,
 * biography, portrait, tags, era, region, sources, ...) is presentation/
 * filtering metadata that already MUST NOT influence similarity per this
 * project's own hard rule, so it is deliberately excluded here too — this
 * fingerprint changing should mean "a result could plausibly differ now",
 * never "someone fixed a typo in a bio".
 */
import type { AttributeId } from "../attributes/attributes.js";
import type { TraitImpact } from "../types.js";
import { DISPERSION_TABLE } from "../matching/dispersion.js";

/**
 * Structural subset of `Person` — exactly the fields this fingerprint
 * reads, nothing else. Roster-scale note (2026-08): a full `Person`
 * already satisfies this (strict superset), so this is purely additive;
 * it also lets `enqueuePendingOwnResult` (the one caller reachable from a
 * `"use client"` component, `QuizClient.tsx`) pass the much smaller
 * generated `PersonIndexEntry[]` instead of the full dataset — see
 * `src/core/people/personIndex.ts` for the full architectural reasoning.
 */
export interface FingerprintablePerson {
  id: string;
  isMatchEligible: boolean;
  archetypeIds: string[];
  attributes: { attributeId: AttributeId; score: number; confidence: number; impact: TraitImpact }[];
}

/**
 * Small, non-cryptographic, order-independent string hash (FNV-1a, 32-bit).
 * This only needs to reliably detect "the input string changed" for a
 * roster on the order of thousands of people, not resist adversarial
 * collision — a drift detector, not a security boundary — so a
 * lightweight, zero-dependency hash is the right tool, not `crypto`.
 */
function fnv1a(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

/**
 * Bumped v1 -> v2 (session 4) because the hash's INPUT DOMAIN changed (now
 * includes the dispersion table) — this guarantees a v1-computed
 * fingerprint can never coincidentally equal a v2 one even in the case
 * where the dispersion table happens not to have changed, giving a clean,
 * deliberate one-time transition rather than a silently-sometimes-matching
 * value. `saveCompletedResult.ts`'s drift check is plain string equality
 * against a freshly-recomputed CURRENT value, so any pre-existing stored
 * `person_data_version` (necessarily v1-tagged) will correctly read as
 * drifted the next time that historical row's own save path is exercised
 * — there is no such path today (a save happens once, at first sign-in),
 * so this has no live behavioral effect beyond closing the gap
 * documented above.
 */
const PERSON_DATA_FINGERPRINT_ALGORITHM = "person_data_v2";

/**
 * Canonical-serialization form (pre-migration hardening review, 2026-08):
 * previously built an ad-hoc pipe/comma-delimited string by hand. Correct
 * in practice (person/attribute ids are closed-set, code-authored slugs
 * that can never contain a delimiter character), but replaced with an
 * explicit, literally-constructed plain-object shape run through
 * `JSON.stringify` — categorically removes any delimiter-collision
 * concern rather than relying on identifier ids staying delimiter-free by
 * convention, and reads more obviously as "canonical serialization" on
 * review. `JSON.stringify`'s key order is determined by THIS function's
 * own object-literal construction, not by the input `Person` object's own
 * key order — so unrelated to and unaffected by any of the three ordering
 * concerns this fingerprint must be immune to:
 *   1. `people` array order — fixed by the final `.sort()` on `id`.
 *   2. `person.attributes` array order — fixed by the per-person `.sort()`
 *      on `attributeId` before mapping.
 *   3. `person.archetypeIds` array order — fixed by its own `.sort()`.
 *   4. The dispersion table's key order — fixed by its own `.sort()` below.
 *   5. Any JS object property INSERTION order, on any object anywhere in
 *      this computation — moot by construction, since every object here is
 *      built as a fresh literal with an explicit, fixed key order, never
 *      derived by iterating `Object.keys()`/`JSON.stringify` on the raw
 *      `Person` object itself.
 *
 * `dispersionTable` defaults to the real, live `DISPERSION_TABLE` so every
 * existing call site (`personDataFingerprint(SEED_PEOPLE)` /
 * `personDataFingerprint(PEOPLE_INDEX)`-derived) picks it up automatically
 * with no call-site change — "always current by construction" is exactly
 * the property this whole mechanism exists for. The parameter exists so a
 * test can inject a synthetic table and prove the fingerprint actually
 * responds to it, the same dependency-injection discipline
 * `saveCompletedResult.ts` already uses for testability.
 */
export function personDataFingerprint(
  people: readonly FingerprintablePerson[],
  dispersionTable: Readonly<Partial<Record<AttributeId, number>>> = DISPERSION_TABLE,
): string {
  const canonical = [...people]
    .map((p) => ({
      id: p.id,
      isMatchEligible: p.isMatchEligible,
      archetypeIds: [...p.archetypeIds].sort(),
      attributes: [...p.attributes]
        .map((a) => ({ attributeId: a.attributeId, score: a.score, confidence: a.confidence, impact: a.impact }))
        .sort((a, b) => a.attributeId.localeCompare(b.attributeId)),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
  const canonicalDispersion = (Object.keys(dispersionTable) as AttributeId[])
    .sort()
    .map((id) => ({ attributeId: id, weight: dispersionTable[id] }));
  return `${PERSON_DATA_FINGERPRINT_ALGORITHM}:${fnv1a(JSON.stringify({ people: canonical, dispersion: canonicalDispersion }))}`;
}
