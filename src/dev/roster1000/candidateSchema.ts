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
  | "localized"
  | "portrait_pending"
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

  /** Required when status is "held". Why this candidate is paused — e.g.
   *  "only 14 scoreable attributes found across 3 biography sources,
   *  below the 18-attribute floor; needs a source with more behavioral
   *  detail before continuing." */
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
 * One-way conversion from an approved candidate to the `PersonSeed` shape
 * `builder.ts`'s `build()` consumes — the exact moment a candidate stops
 * being pipeline data and becomes a real, committed person. Only ever call
 * this after `validateCandidates.ts` reports the candidate passes every
 * gate; this function itself does not gate anything, it only reshapes data.
 */
export function toPersonSeed(candidate: Candidate): PersonSeed {
  const rows: Partial<Record<AttributeId, Row>> = {};
  for (const [attributeId, row] of Object.entries(candidate.rows) as Array<
    [AttributeId, CandidateAttributeRow]
  >) {
    rows[attributeId] = [row.score, row.confidence, EV_CODE[row.evidenceType], IM_CODE[row.impact]];
  }

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
    ...(candidate.externalIdentity ? { externalIdentity: candidate.externalIdentity } : {}),
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
          },
        }
      : {}),
    rows,
  };
}
