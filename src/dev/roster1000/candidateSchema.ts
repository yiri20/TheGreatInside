/**
 * Roster-1000 candidate staging schema — `candidate_v1`.
 *
 * A candidate is a person under consideration for the real roster
 * (`src/data/people/*.ts`) that has NOT been committed there yet. This type
 * is deliberately NOT `Person` and NOT `PersonSeed` (`src/data/people/
 * builder.ts`) — it's a superset that also carries pipeline state (status,
 * hold/reject reasons, per-attribute evidence rationale, portrait sourcing
 * status, a cached eligibility computation) that has no place on a real,
 * committed `Person`. `toPersonSeed()` below is the one-way conversion used
 * only once a candidate is fully approved and ready to promote into a real
 * roster file — see `docs/scoring-rubric-v1.md` and
 * `docs/roster-1000-checkpoint.md` §4 for the full workflow this schema
 * supports.
 *
 * One JSON file per candidate (`data-pipeline/candidates/<slug>.json`),
 * never a monolithic array file — git-diffable (a change to one candidate
 * touches one file), independently resumable (any candidate can be
 * re-opened and re-processed without touching others), and avoids merge
 * conflicts a shared array file would invite.
 */
import type {
  Era,
  EvidenceType,
  ImpactDomain,
  Locale,
  PersonExternalIdentity,
  PersonSource,
  TraitImpact,
} from "../../core/types.js";
import type { AttributeId } from "../../core/attributes/attributes.js";
import type { PersonSeed, Row, Ev, Im } from "../../data/people/builder.js";

export const CANDIDATE_SCHEMA_VERSION = "candidate_v1";

export type CandidateStatus =
  | "draft"
  | "researching"
  | "scored"
  /** Localization (Korean display name, etc.) is complete or in progress
   *  for this candidate. Pre-dates the evidence/match-eligibility
   *  separation below; unchanged. */
  | "localized"
  /** Portrait sourcing is in progress or blocking for this candidate.
   *  Pre-dates the evidence/match-eligibility separation below;
   *  unchanged. */
  | "portrait_pending"
  /**
   * Evidence/profile-approval review complete — see
   * `docs/checkpoints/profile-publication-vs-match-eligibility.md`.
   * Meaning: identity is verified, sources were actually read (not merely
   * found), provenance is honestly represented, every scored row is
   * semantically supported (unsupported/duplicative rows removed), and
   * scoring is locked before any downstream eligibility computation.
   * Deliberately says nothing about whether the candidate clears
   * `eligibility_v2` — `computedEligibility` (below) is checked
   * independently, AFTER this status is reached, never as a condition of
   * reaching it. This is NOT an easier numeric version of `eligibility_v2`
   * (no invented trait-count/coverage/confidence threshold) — it is a
   * review-outcome status, same in kind as `qa_passed` but decoupled from
   * the match-eligibility result. A candidate at this status is ready for
   * product-readiness work (portrait/editorial/localization) and eventual
   * promotion REGARDLESS of `computedEligibility.eligible` — promotion
   * gates on evidence approval, matching gates on `isMatchEligible`
   * (computed independently by `build()`), and these are never the same
   * check. Use this status (not `qa_passed`) for a candidate whose
   * evidence is genuinely publication-ready but who may end up
   * `isMatchEligible: false` in production — `qa_passed` retains its
   * established, narrower historical meaning below.
   */
  | "evidence_approved"
  /**
   * Historical/established meaning across every roster cycle to date
   * (roster11-23): evidence-approved AND `computedEligibility.eligible ===
   * true`. Kept unchanged for backward compatibility with every existing
   * committed candidate file using this convention — do NOT retroactively
   * relabel past `qa_passed` candidates, and do not newly apply this label
   * to a candidate that fails `eligibility_v2`; use `evidence_approved`
   * for that case instead (see its own doc comment above). A `qa_passed`
   * candidate is always also, implicitly, evidence-approved.
   */
  | "qa_passed"
  | "held"
  | "rejected"
  | "committed";

/**
 * Per-attribute row, extending the committed roster's compact
 * `[score, confidence, evidenceType, impact]` `Row` with a concise, reviewable
 * rationale. `rationale` is a short (1-3 sentence) audit summary of WHAT
 * evidence supports this score, not a chain-of-thought transcript — the same
 * "concise audit provenance, never chain-of-thought" instruction that
 * governs every other part of this pipeline. When a candidate is promoted
 * into a real roster file, `rationale` becomes the inline `//` comment
 * `seed.ts`/`roster2.ts` already use next to each `Row` — the two are the
 * same information in two different homes, not a new convention.
 */
export interface CandidateAttributeRow {
  score: number;
  confidence: number;
  evidenceType: EvidenceType;
  impact: TraitImpact;
  rationale: string;
}

export interface CandidatePortraitStatus {
  status: "found" | "held" | "rejected" | "not_available";
  url?: string;
  width?: number;
  height?: number;
  source?: string;
  license?: string;
  licenseUrl?: string;
  attribution?: string;
  attributionUrl?: string;
  creator?: string;
  date?: string;
  /** Mirrors `PersonPortrait.kind` (`src/core/types.ts`) — kept identical
   *  so the intake pipeline and the committed roster's type cannot drift.
   *  Optional; undefined means unclassified, same semantics as on `Person`. */
  kind?: "likeness" | "historical_depiction" | "editorial_nonlikeness";
  /** The Commons file page (or equivalent) actually checked — required
   *  whenever status is "found", so licensing can be re-verified later
   *  without re-searching from scratch. */
  sourcePageUrl?: string;
  /** Required when status is "held" or "rejected". */
  reason?: string;
}

export interface CandidateLocalization {
  /** Keyed by locale so future launch locales beyond ko-KR slot in the same
   *  shape — mirrors `person.name.{slug}`'s own per-locale i18n key. */
  displayNames?: Partial<Record<Locale, string>>;
}

/** A cached, informational snapshot only — never authoritative. Always
 *  recomputed fresh by `validateCandidates.ts` against the live
 *  `evaluateMatchEligibility` logic before any gating decision is made. */
export interface CandidateEligibilitySnapshot {
  scoredAttributeCount: number;
  averageConfidence: number;
  coverage: number;
  eligible: boolean;
  computedAt: string;
}

export interface Candidate {
  schemaVersion: typeof CANDIDATE_SCHEMA_VERSION;
  /** Matches `docs/scoring-rubric-v1.md`'s own version tag at authoring
   *  time, so a future rubric revision can identify which candidates were
   *  scored under an older methodology and may need re-review. */
  processingVersion: string;
  slug: string;
  status: CandidateStatus;

  identity: {
    canonicalName: string;
    aliases?: string[];
    /** Wikidata QID, e.g. "Q1001". Strongly preferred — the stable
     *  cross-reference every later dedup/verification step keys on. */
    wikidataId?: string;
    birthYear?: number;
    deathYear?: number;
    isLiving: boolean;
    era: Era;
    nationalityCodes: string[];
    /** Must be one of the 11 controlled region ids — validated live
     *  against the real `region.*` i18n keys, never hardcoded twice. */
    regionCode: string;
    historicalPolityKey?: string;
  };

  classification: {
    occupationIds: string[];
    fieldIds: string[];
    impactDomains: ImpactDomain[];
    /** Must be drawn from the existing tag vocabulary — see
     *  `newTagProposals` below for the only sanctioned way to add a new
     *  one. Validated live against the real `tag.*` i18n keys. */
    tagIds: string[];
    /** A new tag id this candidate genuinely needs that doesn't exist yet.
     *  Surfaced by the validator as a warning, never silently accepted —
     *  a human decides whether to add EN+KO text for it (same discipline
     *  as every other closed vocabulary in this project) before the
     *  candidate can move past "scored". */
    newTagProposals?: string[];
    archetypeIds: string[];
  };

  sources: PersonSource[];
  rows: Partial<Record<AttributeId, CandidateAttributeRow>>;
  doNotCopyKeys?: string[];
  externalIdentity?: PersonExternalIdentity;
  portrait?: CandidatePortraitStatus;
  localization?: CandidateLocalization;

  /** Required when status is "held". Why this candidate is NOT YET
   *  evidence_approved / publication-safe — an evidence-quality concern,
   *  e.g. attribution uncertainty, an unresolved factual/source-integrity
   *  issue, a profile too misleadingly narrow to publish responsibly,
   *  insufficient individually-attributable behavioral evidence, an
   *  identity/provenance problem, or another unresolved evidence-quality
   *  defect. See docs/checkpoints/profile-publication-vs-match-eligibility.md:
   *  publication approval and `eligibility_v2` are independently computed,
   *  so a numeric `eligibility_v2` shortfall ALONE is a MATCH diagnostic
   *  to record separately (e.g. once assessed, in `provenance.notes`) —
   *  never by itself the reason a publication-ready candidate stays
   *  `held`. A candidate whose evidence is otherwise publication-safe but
   *  merely narrow should be promoted via `evidence_approved`, not kept
   *  `held` on breadth alone. */
  holdReason?: string;
  /** Required when status is "rejected". Why this candidate will not be
   *  included — e.g. "primary distinction is an inherited title;
   *  fails the inclusion_v1 counterfactual test." */
  rejectReason?: string;

  computedEligibility?: CandidateEligibilitySnapshot;

  provenance: {
    createdAt: string;
    updatedAt: string;
    processedBy: "agent" | "human";
    /** Short, e.g. "diversity pick: North Africa, athletics, thin
     *  evidence deliberately included to stress-test the coverage floor."
     *  Never a chain-of-thought log. */
    notes?: string;
  };
}

const EV_CODE: Record<EvidenceType, Ev> = {
  documented: "d",
  strong_inference: "s",
  inference: "i",
};
const IM_CODE: Record<TraitImpact, Im> = {
  advantage: "A",
  dual_edged: "D",
  risk: "R",
  neutral: "N",
};

/**
 * Promotion readiness check — deliberately NOT a numeric gate, and
 * deliberately NOT the complete product-readiness gate either. This is a
 * **candidate-data promotion precondition** only: it checks what is
 * knowable from the candidate JSON alone (review status, identity, a
 * product-ready portrait record). See
 * `docs/checkpoints/profile-publication-vs-match-eligibility.md` for the
 * full architectural rationale.
 *
 * Checks ONLY: the candidate reached an evidence-approved review outcome
 * (`"evidence_approved"` or `"qa_passed"` — see `CandidateStatus`'s own
 * doc comments for the distinction), required identity fields are present,
 * and a product-ready portrait record exists on the candidate. Deliberately
 * does NOT check `computedEligibility.eligible` — every generator through
 * roster16 hard-required `eligible === true` before writing ANY candidate
 * to production, which is exactly the coupling this architecture
 * separates. Whether a promoted candidate ends up `isMatchEligible: true`
 * or `false` in production is decided independently and automatically by
 * `build()` via `evaluateMatchEligibility` — this function never reads or
 * overrides that computation, and callers must not add their own
 * eligibility check on top of it.
 *
 * What this does NOT verify (and never should, without adding fake
 * candidate-JSON fields to check things that live elsewhere): the final
 * rendered EN/KO editorial content, the Korean display name actually
 * resolving on a live page, the portrait file actually existing on disk
 * and rendering, the person's Directory card, or the working profile
 * route. Those remain established the existing way — by the production
 * build, i18n coverage audit, and manual/Playwright browser verification
 * described in `docs/adding-a-person.md` — after this check passes, not
 * instead of it.
 */
export interface PromotionReadiness {
  ready: boolean;
  reasons: string[];
}

export function checkPromotionReadiness(candidate: Candidate): PromotionReadiness {
  const reasons: string[] = [];
  if (candidate.status !== "evidence_approved" && candidate.status !== "qa_passed") {
    reasons.push(
      `status "${candidate.status}" is not an evidence-approved review outcome (need "evidence_approved" or "qa_passed")`,
    );
  }
  if (!candidate.identity?.canonicalName) reasons.push("missing identity.canonicalName");
  if (!candidate.identity?.wikidataId) reasons.push("missing identity.wikidataId");
  // Identity-integrity: if both the reviewed candidate identity and a
  // pre-existing externalIdentity carry a QID, they must agree. A silent
  // pick-one would be an unnoticed identity error, not a value to merge —
  // fail closed instead. See `toPersonSeed()` for the (non-conflicting)
  // QID-propagation this guards.
  if (
    candidate.identity?.wikidataId &&
    candidate.externalIdentity?.wikidataId &&
    candidate.identity.wikidataId !== candidate.externalIdentity.wikidataId
  ) {
    reasons.push(
      `identity.wikidataId ("${candidate.identity.wikidataId}") disagrees with externalIdentity.wikidataId ("${candidate.externalIdentity.wikidataId}")`,
    );
  }
  if (!candidate.portrait || candidate.portrait.status !== "found") {
    reasons.push("no product-ready portrait (portrait.status must be \"found\")");
  } else {
    if (!candidate.portrait.url) reasons.push("portrait.status is \"found\" but portrait.url is missing");
    if (!candidate.portrait.source) reasons.push("portrait.status is \"found\" but portrait.source is missing");
    if (!candidate.portrait.license) reasons.push("portrait.status is \"found\" but portrait.license is missing");
    if (!candidate.portrait.sourcePageUrl) {
      reasons.push("portrait.status is \"found\" but portrait.sourcePageUrl is missing");
    }
  }
  return { ready: reasons.length === 0, reasons };
}

/**
 * Neutral, one-way reshaping from the candidate-pipeline `Candidate` shape
 * to the `PersonSeed` shape `builder.ts`'s `build()` consumes. Deliberately
 * NOT a gate of any kind — it does not determine evidence approval, does
 * not determine match eligibility, and does not check `candidate.status`
 * at all. `validateCandidates.ts` calls this on every scoreable candidate
 * regardless of status (including `held` and merely `scored` ones) purely
 * to compute a diagnostic `eligibility_v2` snapshot for reporting — that is
 * a legitimate, intentional use and this function must keep working for it.
 *
 * Production generators promoting a candidate into a real roster file
 * should normally call `preparePersonSeedForPromotion()` below instead of
 * this function directly — that is where promotion readiness is actually
 * checked and directory visibility is explicitly decided. Calling this
 * function directly is appropriate for evaluation/reporting tooling, not
 * for deciding whether a candidate may be promoted.
 */
export function toPersonSeed(candidate: Candidate): PersonSeed {
  const rows: Partial<Record<AttributeId, Row>> = {};
  for (const [attributeId, row] of Object.entries(candidate.rows) as Array<
    [AttributeId, CandidateAttributeRow]
  >) {
    rows[attributeId] = [row.score, row.confidence, EV_CODE[row.evidenceType], IM_CODE[row.impact]];
  }

  // Preserve the verified candidate identity QID into production
  // externalIdentity — `checkPromotionReadiness()` requires
  // `identity.wikidataId`, but until this merge it was only ever carried
  // forward when a candidate happened to also have an `externalIdentity`
  // object already, silently dropping the QID otherwise. Any existing
  // `externalIdentity` fields (e.g. `wikipediaUrls`) are preserved as-is;
  // `identity.wikidataId` wins only when set, and never overwrites an
  // agreeing existing value with a different one (readiness already fails
  // closed on disagreement).
  const externalIdentity =
    candidate.identity.wikidataId !== undefined || candidate.externalIdentity !== undefined
      ? {
          ...candidate.externalIdentity,
          ...(candidate.identity.wikidataId !== undefined ? { wikidataId: candidate.identity.wikidataId } : {}),
        }
      : undefined;

  return {
    id: `p_${candidate.slug.replace(/-/g, "_")}`,
    slug: candidate.slug,
    canonicalName: candidate.identity.canonicalName,
    ...(candidate.identity.aliases ? { aliases: candidate.identity.aliases } : {}),
    birthYear: candidate.identity.birthYear ?? 0,
    ...(candidate.identity.deathYear !== undefined ? { deathYear: candidate.identity.deathYear } : {}),
    isLiving: candidate.identity.isLiving,
    era: candidate.identity.era,
    nationalityCodes: candidate.identity.nationalityCodes,
    regionCode: candidate.identity.regionCode,
    ...(candidate.identity.historicalPolityKey !== undefined
      ? { historicalPolityKey: candidate.identity.historicalPolityKey }
      : {}),
    occupationIds: candidate.classification.occupationIds,
    fieldIds: candidate.classification.fieldIds,
    impactDomains: candidate.classification.impactDomains,
    tagIds: candidate.classification.tagIds,
    archetypeIds: candidate.classification.archetypeIds,
    sources: candidate.sources,
    ...(candidate.doNotCopyKeys ? { doNotCopyKeys: candidate.doNotCopyKeys } : {}),
    ...(externalIdentity ? { externalIdentity } : {}),
    ...(candidate.portrait?.status === "found" && candidate.portrait.url && candidate.portrait.source && candidate.portrait.license
      ? {
          portrait: {
            url: candidate.portrait.url,
            source: candidate.portrait.source,
            license: candidate.portrait.license,
            ...(candidate.portrait.width !== undefined ? { width: candidate.portrait.width } : {}),
            ...(candidate.portrait.height !== undefined ? { height: candidate.portrait.height } : {}),
            ...(candidate.portrait.licenseUrl !== undefined ? { licenseUrl: candidate.portrait.licenseUrl } : {}),
            ...(candidate.portrait.attribution !== undefined ? { attribution: candidate.portrait.attribution } : {}),
            ...(candidate.portrait.attributionUrl !== undefined
              ? { attributionUrl: candidate.portrait.attributionUrl }
              : {}),
            ...(candidate.portrait.kind !== undefined ? { kind: candidate.portrait.kind } : {}),
          },
        }
      : {}),
    rows,
  };
}

export interface PromotionOptions {
  /**
   * Whether the promoted person should appear in the default People
   * Directory listing (`Person.isDirectoryVisible`). Defaults to `true` —
   * a future evidence-approved candidate promoted through this function is
   * a fully product-ready, published profile and should be a normal
   * directory-visible publication REGARDLESS of whether `build()` ends up
   * computing `isMatchEligible: true` or `false` for it (that computation
   * is independent — see `docs/checkpoints/
   * profile-publication-vs-match-eligibility.md`). Pass `false` only for a
   * deliberately direct-only promotion: the direct profile route remains
   * available, but the person is excluded from the default People
   * Directory listing AND its search (the Directory applies
   * `PeopleFilter.directoryVisibleOnly`, which filters search results too,
   * not just the listing) — and, separately, excluded from matching
   * whenever `isMatchEligible === false`. Mirrors Zheng He's existing
   * pattern. This default is intentionally different from raw `build()`'s
   * own fallback (which mirrors `isMatchEligible` for backward
   * compatibility with every pre-existing seed) — see `PersonSeed.
   * directoryVisible`'s own doc comment in `builder.ts` for why the two
   * defaults differ on purpose.
   */
  directoryVisible?: boolean;
}

/**
 * The actual future candidate → production promotion path. A
 * `generateRosterN.ts` written after this architecture should call this
 * (not `toPersonSeed()` directly) for every allowlisted candidate.
 *
 * - Calls `checkPromotionReadiness(candidate)` and FAILS CLOSED (throws)
 *   if it is not ready — a generator should never silently promote a
 *   candidate that isn't.
 * - NEVER checks `computedEligibility.eligible` — promotion readiness and
 *   match eligibility are, by design, never the same check. `build()`
 *   computes `isMatchEligible` on the returned seed independently, same as
 *   for any other person.
 * - Explicitly sets the intended directory visibility (default `true` —
 *   see `PromotionOptions.directoryVisible`'s own doc comment for why this
 *   default differs from raw `build()`'s backward-compatible fallback).
 *
 * Historical `generateRoster1.ts` through `generateRoster16.ts` predate
 * this function and this architecture; they call `toPersonSeed()` directly
 * and hard-require `status === "qa_passed"` and
 * `computedEligibility.eligible`. They are historical, already-run,
 * already-committed snapshots of the cycles that produced them and are
 * deliberately NOT rewritten to use this function — do not copy their
 * gating logic into a new generator. See `docs/adding-a-person.md` for the
 * full future-generator pattern this function is meant to be used in.
 */
export function preparePersonSeedForPromotion(
  candidate: Candidate,
  { directoryVisible = true }: PromotionOptions = {},
): PersonSeed {
  const readiness = checkPromotionReadiness(candidate);
  if (!readiness.ready) {
    throw new Error(
      `Candidate "${candidate.slug}" is not ready for promotion: ${readiness.reasons.join("; ")}`,
    );
  }
  return { ...toPersonSeed(candidate), directoryVisible };
}
