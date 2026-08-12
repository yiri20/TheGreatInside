import type { AttributeId, Facet } from "./attributes/attributes.js";

/* ------------------------------------------------------------------ shared */

/** Score on a canonical attribute dimension. 0-100 intensity, never goodness. */
export type Score = number;
/** Evidential confidence in a score. 0..1. */
export type Confidence = number;

export type Locale = "en-US" | "ko-KR" | "ja-JP" | "zh-CN" | "zh-TW";
export const SUPPORTED_LOCALES: readonly Locale[] = ["en-US", "ko-KR", "ja-JP", "zh-CN", "zh-TW"];
export const LAUNCH_LOCALES: readonly Locale[] = ["en-US", "ko-KR"];
export const DEFAULT_LOCALE: Locale = "en-US";

/* --------------------------------------------------------- trait semantics */

export type EvidenceType = "documented" | "strong_inference" | "inference";

/**
 * Contextual reading of a trait FOR A SPECIFIC PERSON. Never a global property
 * of the attribute itself: curiosity is not permanently "green".
 * Scope is always person x attribute x context.
 */
export type TraitImpact = "advantage" | "dual_edged" | "risk" | "neutral";

/* ----------------------------------------------------------------- vectors */

/** Sparse by design: an absent attribute means "not scored", never "zero". */
export type AttributeVector = Partial<Record<AttributeId, Score>>;
export type ConfidenceVector = Partial<Record<AttributeId, Confidence>>;

/* ------------------------------------------------------------------ people */

export type PersonStatus =
  | "draft"
  | "needs_evidence"
  | "needs_review"
  | "approved"
  | "published"
  | "needs_update";

export type Era =
  | "ancient"
  | "medieval"
  | "early_modern"
  | "19th_century"
  | "20th_century"
  | "contemporary";

// PHASE 8: promoted from a bare union to a const array + derived type (same
// pattern as ATTRIBUTE_IDS/AttributeId in attributes.ts) so
// `missingImpactDomainCoverage()` (core/people/explorer.ts) can iterate the
// full set at runtime — a plain union type has no runtime representation to
// check localisation coverage against.
export const IMPACT_DOMAINS = [
  "scientific",
  "technological",
  "entrepreneurial",
  "cultural",
  "artistic",
  "literary",
  "athletic",
  "historical",
  "engineering",
  "medical",
  "educational",
  "social",
  "industrial",
  "innovation",
  "wealth_creation",
] as const;
export type ImpactDomain = (typeof IMPACT_DOMAINS)[number];

export interface PersonAttribute {
  attributeId: AttributeId;
  score: Score;
  confidence: Confidence;
  evidenceType: EvidenceType;
  impact: TraitImpact;
  /** Editorial, reviewed, localised via translation keys in the DB layer. */
  benefitExplanationKey?: string;
  costExplanationKey?: string;
  contextExplanationKey?: string;
  sourceIds: string[];
}

export interface PersonSource {
  id: string;
  kind: "wikipedia" | "wikidata" | "biography" | "institution" | "award_body" | "press" | "archive";
  title: string;
  url?: string;
}

/**
 * Canonical cross-references to external identity systems — the anchor for
 * SEO structured data, admin/data-pipeline tooling, and "read more" links.
 * Presentation/SEO metadata only; see the note on `Person` below.
 */
export interface PersonExternalIdentity {
  /** Wikidata QID, e.g. "Q762" for Leonardo da Vinci. */
  wikidataId?: string;
  /**
   * Localised Wikipedia article URL per UI locale. Sparse by design — most
   * people will not have an article in every launch locale. A missing locale
   * falls back to whichever English article exists in `sources`, if any, at
   * render time; it is never treated as an error.
   */
  wikipediaUrls?: Partial<Record<Locale, string>>;
}

/**
 * A portrait and its licence chain. Optional: most historical figures have no
 * portrait available under a free licence, and `PersonCard`/person pages fall
 * back to an initials placeholder when this is absent — that fallback is the
 * expected common case, not a degraded one.
 *
 * `license` + `attribution` are stored as plain, unlocalised strings
 * deliberately: most free-licence terms (e.g. CC BY-SA) require reproducing
 * the credit line as given, not a translated paraphrase of it.
 */
export interface PersonPortrait {
  url: string;
  width?: number;
  height?: number;
  /** e.g. "Wikimedia Commons". */
  source: string;
  /** e.g. "Public Domain", "CC BY-SA 4.0". Never inferred — set only from a verified source page. */
  license: string;
  licenseUrl?: string;
  /** Creator/photographer credit line, reproduced as the source requires. */
  attribution?: string;
  attributionUrl?: string;
}

/**
 * Language-independent canonical record. All matching operates ONLY on this.
 * Localised names/summaries live in `person_translations` (DB) and are joined
 * at presentation time.
 */
export interface Person {
  id: string;
  slug: string;
  /** Canonical (usually native or most-recognised Latin) name; display name is localised. */
  canonicalName: string;
  /**
   * Known alternate names, spellings, romanisations and native-script forms
   * (e.g. "Yi Sun-sin" / "이순신" / "李舜臣") — a fact about the person's
   * identity across writing systems, not a per-locale UI string, so it is
   * flat and locale-independent rather than keyed like `wikipediaUrls`.
   * Powers alias/native-script search (product spec item 46). Presentation
   * metadata only — see the note below.
   */
  aliases: string[];
  birthYear?: number;
  deathYear?: number;
  isLiving: boolean;
  era: Era;
  /** Metadata only. MUST NOT influence similarity. */
  nationalityCodes: string[];
  regionCode: string;
  /**
   * The historical polity this person actually lived under (e.g. "Ptolemaic
   * Kingdom of Egypt", "Ming dynasty"), as a message key resolved via
   * `t(locale, key)` — the SAME localisation mechanism attribute names and
   * era labels already use, so a polity shared by multiple people (e.g. two
   * Ming-dynasty figures) is authored once. This exists because modern ISO
   * `nationalityCodes` are frequently anachronistic for historical figures
   * (Zheng He was never a citizen of the modern PRC) and would misrepresent
   * history if used as the only geographic label on a person page.
   * `nationalityCodes`/`regionCode` are UNCHANGED and keep their existing
   * job — modern-day-mapped filtering/SEO metadata — this is an additional,
   * purely presentational field, not a replacement.
   */
  historicalPolityKey?: string;
  occupationIds: string[];
  fieldIds: string[];
  impactDomains: ImpactDomain[];
  tagIds: string[];
  /**
   * Reviewed archetype assignments. Used ONLY to derive archetype centroids for
   * the Greatness Potential model — never as an input to profile similarity.
   */
  archetypeIds: string[];
  attributes: PersonAttribute[];
  status: PersonStatus;
  /** Gate for inclusion in matching. Computed by `evaluateMatchEligibility`. */
  isMatchEligible: boolean;
  overallProfileConfidence: Confidence;
  sources: PersonSource[];
  /** Reviewed editorial content, keyed for localisation. */
  doNotCopyKeys: string[];
  /**
   * Wikidata/Wikipedia cross-references and portrait metadata (see
   * `PersonExternalIdentity` / `PersonPortrait` above) — presentation/SEO
   * metadata only, exactly like `aliases`, `historicalPolityKey`,
   * `nationalityCodes`, `regionCode` and `tagIds` elsewhere on this type.
   * MUST NOT influence similarity — enforced by tests that mutate every
   * field named in this note and assert byte-identical match scores, the
   * same pattern already used for every other metadata field on this type.
   */
  externalIdentity?: PersonExternalIdentity;
  portrait?: PersonPortrait;
}

/* ------------------------------------------------------------------- users */

export interface UserProfile {
  id: string;
  quizVersion: string;
  scoringVersion: string;
  taxonomyVersion: string;
  scores: Record<AttributeId, Score>;
  /** Per-attribute measurement confidence, driven by how many items loaded on it. */
  confidence: Record<AttributeId, Confidence>;
  completedAt: string;
  /** Locale is presentation only. It MUST NOT appear in any scoring input. */
}

/* ----------------------------------------------------------------- results */

export interface FacetScores {
  thinking: number;
  creativity: number;
  work_style: number;
  resilience: number;
  social: number;
  motivation: number;
  world_sense: number;
}

export interface TraitComparison {
  attributeId: AttributeId;
  userScore: Score;
  personScore: Score;
  /** personScore - userScore. Positive => person higher. */
  delta: number;
  absDelta: number;
  effectiveWeight: number;
  impact: TraitImpact;
  confidence: Confidence;
}

export interface MatchResult {
  personId: string;
  /** Calibrated 0-100 display value. */
  overallMatch: number;
  /** Uncalibrated similarity in [0,1]; kept for debugging and re-calibration. */
  rawSimilarity: number;
  /** Share of total base weight actually compared (missing traits reduce this). */
  coverage: number;
  facetMatches: FacetScores;
  closestTraits: TraitComparison[];
  largestDifferences: TraitComparison[];
  userHigherTraits: TraitComparison[];
  personHigherTraits: TraitComparison[];
  matchingVersion: string;
}

export type { AttributeId, Facet };
