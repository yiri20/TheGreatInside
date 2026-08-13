/**
 * PERSON-DATA FINGERPRINT — Phase 10C.
 *
 * The historical-result-fidelity design audit found that the roster/person
 * dataset (`SEED_PEOPLE`) is the one output-affecting dependency of
 * `/results` with NO version representation anywhere in the codebase — not
 * even an unused constant like `REFERENCE_VERSION`/`DISPERSION_VERSION`
 * had. Unlike those, a HAND-MAINTAINED "bump this string when you edit a
 * person" constant would be failure-prone by this project's own history:
 * individual trait-score corrections (e.g. the Phase 6.6 Buffett
 * `opportunity_sensing` fix) have always shipped with no version bump at
 * all, because they're normal editorial review, not a taxonomy/algorithm
 * release. A COMPUTED fingerprint removes that discipline requirement
 * entirely — it is definitionally always current, by construction, and
 * can never be forgotten.
 *
 * This is a drift *detector*, not a security boundary or a historical
 * archive key: it only ever answers "does this match the roster RIGHT
 * NOW", compared directly against a value captured at anonymous quiz
 * completion. It is deliberately NOT part of `VersionSnapshot` — that type
 * models "a known, shipped CODE version combination" (checked against an
 * append-only allowlist); this models "the live data's current shape"
 * (checked for plain equality against right now, never against a list of
 * historically-known values, since there is no such list and none is
 * needed for this purpose — see `versions.ts`'s own doc comment).
 *
 * Only output-affecting fields are hashed: which people exist and are
 * match-eligible (roster membership/eligibility drift), each person's
 * archetype assignments (feeds Greatness's target-shrinkage in
 * `archetypes.ts`), and every scored attribute's score/confidence/impact
 * (feeds matching directly and impact feeds displayed trait cards).
 * Everything else on `Person` (name, biography, portrait, tags, era,
 * region, sources, ...) is presentation/filtering metadata that already
 * MUST NOT influence similarity per this project's own hard rule, so it is
 * deliberately excluded here too — this fingerprint changing should mean
 * "a result could plausibly differ now", never "someone fixed a typo in a
 * bio".
 */
import type { Person } from "../types.js";

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

const PERSON_DATA_FINGERPRINT_ALGORITHM = "person_data_v1";

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
 *   4. Any JS object property INSERTION order, on any object anywhere in
 *      this computation — moot by construction, since every object here is
 *      built as a fresh literal with an explicit, fixed key order, never
 *      derived by iterating `Object.keys()`/`JSON.stringify` on the raw
 *      `Person` object itself.
 */
export function personDataFingerprint(people: readonly Person[]): string {
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
  return `${PERSON_DATA_FINGERPRINT_ALGORITHM}:${fnv1a(JSON.stringify(canonical))}`;
}
