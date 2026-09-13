/**
 * Manual row-classification ledger for the match-pool integrity audit
 * (post-Roster32). Read-only data: classifying already-scored rows against
 * their OWN repository-stated rationale, not re-scoring or fetching new
 * evidence. See docs/checkpoints/match-pool-integrity-post-roster32.md.
 *
 * Coverage rule: every entry here is EVERY scored attribute
 * (`Person.attributes`) for the frozen 16 eligible sample + frozen 8
 * recent non-eligible controls -- verified by
 * `matchPoolIntegrityAuditManual.test.ts` against the live built people,
 * so this file cannot silently drift out of sync with an added/removed
 * row.
 *
 * Classification is deliberately stricter than the underlying data's own
 * `evidenceType` tag: `documented` is NOT auto-mapped to
 * `supported_as_written` here. Two systematic, repository-verifiable
 * patterns drove most non-SAW calls:
 *
 * 1. Roster1/Roster2 (the 34-person hand-authored, pre-candidate-pipeline
 *    cohort -- see the audit script's `hasCandidateFile()`): their
 *    original ~30 base rows carry a score/confidence/evidenceType/impact
 *    tuple but literally NO per-row rationale text anywhere in the
 *    repository (only the file's 2-4 top-level `sources` entries, plus,
 *    for some people, later `taxonomy_v1.1` ADDITION rows that DO carry a
 *    full paragraph rationale each -- those additions are classified
 *    normally). Classified `unsupported_from_available_provenance`: the
 *    specific number cannot be reconstructed from anything the repository
 *    states, independent of whether a real historical basis plausibly
 *    exists.
 * 2. A recurring self-flagged pattern across candidate-JSON files: a
 *    row's own rationale explicitly says "inferred from results/outcome
 *    rather than specific documented behavior," "scored at the safe
 *    default," or "thin evidence." These are honest admissions by the
 *    original scorer, used here as the primary signal for
 *    `outcome_based_inference` / `unsupported_from_available_provenance`
 *    rather than a fresh, independent re-litigation of every row's
 *    underlying facts.
 *
 * `attribution_uncertain` is used for rows resting on secondhand/
 * compiled-after-the-fact sourcing (Confucius's one taxonomy addition;
 * Aung San Suu Kyi/Hildegard rows drawing a trait from an adjacent but
 * not directly-on-point fact) or explicit dating/individual-attribution
 * hedges in the row's own text. `duplicated_behavior` is used only where
 * the row's own rationale discloses reusing the same underlying episode
 * as another row (Woolf's `autonomy_need`, explicitly flagged "overlap
 * with the resourcefulness row above").
 *
 * `support_but_overstated` and `provenance_not_reconstructable` are not
 * used in this sample: no row was found with a real, present-but-thin
 * source overclaimed as strong evidence text (the closest candidates,
 * Roster1/2's base rows, have no row text at all, which is the more
 * severe `unsupported_from_available_provenance`), and no row cited a
 * source that could not be identified at all (every file's sources are
 * named and mostly live-linked).
 */
import { fileURLToPath } from "node:url";
import type { AttributeId } from "../../../core/attributes/attributes.js";
import { SEED_PEOPLE } from "../../../data/people/seed.js";

export type RowClassification =
  | "supported_as_written"
  | "support_but_overstated"
  | "outcome_based_inference"
  | "duplicated_behavior"
  | "attribution_uncertain"
  | "unsupported_from_available_provenance"
  | "provenance_not_reconstructable";

export interface ManualLedgerEntry {
  slug: string;
  attributeId: AttributeId;
  classification: RowClassification;
  note?: string;
}

/**
 * The 16 people who were match-eligible WHEN PR #35 FROZE THIS SAMPLE
 * (2026-09). "Frozen" means the sample membership never re-draws itself
 * against the live roster -- it is NOT a claim that these 16 are
 * match-eligible right now. Akira Kurosawa is the concrete case: he was
 * eligible at freeze time and is a permanent member of this sample for
 * that reason, even though the legacy integrity remediation cycle
 * (2026-09-12, docs/checkpoints/legacy-integrity-kurosawa-remediation.md)
 * has since made him honestly non-match-eligible. Do not replace him, do
 * not re-sample, and do not read "candidate-JSON-backed eligible sample"
 * (or similar labels below) as evidence about the CURRENT eligible
 * population -- that population is the live `SEED_PEOPLE.filter(p =>
 * p.isMatchEligible)`, computed fresh by matchPoolIntegrityAudit.ts, not
 * this frozen list. See SUPERSEDED_AUDIT_SLUGS below for how this file
 * reconciles "sample is frozen" with "Kurosawa's live data legitimately
 * changed."
 */
export const FROZEN_16_ELIGIBLE: readonly string[] = [
  "ada-lovelace", "akira-kurosawa", "benjamin-franklin", "alan-turing",
  "albert-einstein", "anna-pavlova", "aung-san-suu-kyi", "akio-morita",
  "bertrand-russell", "bette-davis", "abraham-lincoln", "alexander-hamilton",
  "aristotle", "hildegard-of-bingen", "confucius", "ernest-shackleton",
];

export const FROZEN_8_CONTROLS: readonly string[] = [
  "george-bernard-shaw", "pablo-neruda", "pele", "virginia-woolf",
  "james-baldwin", "ahmed-zewail", "antoni-gaudi", "andrew-carnegie",
];

/**
 * Slugs whose ledger entries below are PR #35's ORIGINAL frozen
 * classification, preserved as history and reproducible from this file
 * alone -- even though the person's CURRENT live production data has
 * since intentionally changed for a documented, individually-authorized
 * reason. This is the one narrow exception to "this file tracks live
 * data": restoring history for a superseded slug necessarily means its
 * ledger rows no longer match that person's current attribute set. That
 * mismatch is expected and by design for exactly these slugs (see
 * `findOrphanLedgerRows`/`findMissingLedgerRows`, both superseded-aware),
 * not silently-ignored drift -- every entry here names the remediation
 * cycle responsible and what now guarantees that person's CURRENT
 * integrity instead of this ledger.
 */
export const SUPERSEDED_AUDIT_SLUGS: ReadonlySet<string> = new Set([
  // Legacy integrity remediation, 2026-09-12
  // (docs/checkpoints/legacy-integrity-kurosawa-remediation.md):
  // re-researched from scratch, 30 undocumented rows -> 10
  // evidence-supported ones. Current integrity guaranteed instead by
  // data-pipeline/candidates/akira-kurosawa.json,
  // akiraKurosawaRemediation.test.ts, and checkScoringLockIntegrity.ts
  // (he now has a real candidate JSON, so the legacy-lock baseline no
  // longer needs to cover him either).
  "akira-kurosawa",
]);

const NO_RATIONALE_NOTE =
  "Roster1/2 base row: score/confidence/evidenceType tuple only, no per-row rationale text anywhere in the repository.";

function bulk(slug: string, ids: readonly AttributeId[], classification: RowClassification, note?: string): ManualLedgerEntry[] {
  return ids.map((attributeId) => ({ slug, attributeId, classification, ...(note ? { note } : {}) }));
}

export const MANUAL_ROW_LEDGER: readonly ManualLedgerEntry[] = [
  // ---- ada-lovelace (roster1, 31) ----
  ...bulk("ada-lovelace", [
    "achievement_drive", "adaptability", "aesthetic_sensitivity", "ambiguity_tolerance",
    "analytical_rigor", "autonomy_need", "collaboration", "competitiveness",
    "conflict_tolerance", "creative_originality", "cross_domain_range", "curiosity",
    "decisiveness", "deep_focus", "detail_orientation", "discipline", "execution_speed",
    "experimentation", "impact_motivation", "independent_thinking", "intuitive_synthesis",
    "leadership_drive", "mastery_orientation", "perfectionism", "persistence",
    "persuasiveness", "planning_orientation", "risk_tolerance", "social_assertiveness",
    "systems_abstraction",
  ], "unsupported_from_available_provenance", NO_RATIONALE_NOTE),
  { slug: "ada-lovelace", attributeId: "opportunity_sensing", classification: "supported_as_written", note: "Her Notes on the Analytical Engine documented as articulating a broader significance Babbage himself hadn't emphasized." },

  // ---- akira-kurosawa (roster2, 30) -- SUPERSEDED (see
  // SUPERSEDED_AUDIT_SLUGS above). This is PR #35's ORIGINAL frozen
  // finding, preserved exactly: all 30 base rows, zero taxonomy_v1.1
  // additions, zero per-row rationale anywhere in the repository at
  // audit time -- the most exposed of the 5 flagged people, unlike
  // ada-lovelace/benjamin-franklin/alan-turing/confucius above and below,
  // he has no exception row at all. His LIVE production data has since
  // been intentionally replaced by the legacy integrity remediation cycle
  // (2026-09-12, docs/checkpoints/legacy-integrity-kurosawa-remediation.md):
  // 30 undocumented rows -> 10 evidence-supported ones. This ledger entry
  // deliberately does NOT track that live change -- it is the historical
  // snapshot this file's denominators (396/88/484) depend on.
  ...bulk("akira-kurosawa", [
    "achievement_drive", "adaptability", "aesthetic_sensitivity", "ambiguity_tolerance",
    "analytical_rigor", "autonomy_need", "collaboration", "competitiveness",
    "conflict_tolerance", "creative_originality", "cross_domain_range", "curiosity",
    "decisiveness", "deep_focus", "detail_orientation", "discipline", "execution_speed",
    "experimentation", "impact_motivation", "independent_thinking", "intuitive_synthesis",
    "leadership_drive", "mastery_orientation", "perfectionism", "persistence",
    "persuasiveness", "planning_orientation", "risk_tolerance", "social_assertiveness",
    "systems_abstraction",
  ], "unsupported_from_available_provenance", NO_RATIONALE_NOTE),

  // ---- benjamin-franklin (roster2, 34) ----
  ...bulk("benjamin-franklin", [
    "achievement_drive", "adaptability", "aesthetic_sensitivity", "ambiguity_tolerance",
    "analytical_rigor", "autonomy_need", "collaboration", "competitiveness",
    "conflict_tolerance", "creative_originality", "cross_domain_range", "curiosity",
    "decisiveness", "deep_focus", "detail_orientation", "discipline", "execution_speed",
    "experimentation", "impact_motivation", "independent_thinking", "intuitive_synthesis",
    "leadership_drive", "mastery_orientation", "perfectionism", "persistence",
    "persuasiveness", "planning_orientation", "risk_tolerance", "social_assertiveness",
    "systems_abstraction",
  ], "unsupported_from_available_provenance", NO_RATIONALE_NOTE),
  { slug: "benjamin-franklin", attributeId: "opportunity_sensing", classification: "supported_as_written", note: "1754 Albany Plan of Union, specific and dated." },
  { slug: "benjamin-franklin", attributeId: "resourcefulness", classification: "supported_as_written", note: "Arrived in Philadelphia penniless, built printing business -- his own Autobiography." },
  { slug: "benjamin-franklin", attributeId: "proactive_agency", classification: "supported_as_written", note: "Founded Junto/Library Company/fire department/APS, self-initiated." },
  { slug: "benjamin-franklin", attributeId: "belief_updating", classification: "supported_as_written", note: "Documented loyalist-to-independence reversal tied to the 1774 Cockpit hearing." },

  // ---- alan-turing (roster1, 31) ----
  ...bulk("alan-turing", [
    "achievement_drive", "adaptability", "aesthetic_sensitivity", "ambiguity_tolerance",
    "analytical_rigor", "autonomy_need", "collaboration", "competitiveness",
    "conflict_tolerance", "creative_originality", "cross_domain_range", "curiosity",
    "decisiveness", "deep_focus", "detail_orientation", "discipline", "execution_speed",
    "experimentation", "impact_motivation", "independent_thinking", "intuitive_synthesis",
    "leadership_drive", "mastery_orientation", "perfectionism", "persistence",
    "persuasiveness", "planning_orientation", "risk_tolerance", "social_assertiveness",
    "systems_abstraction",
  ], "unsupported_from_available_provenance", NO_RATIONALE_NOTE),
  { slug: "alan-turing", attributeId: "proactive_agency", classification: "supported_as_written", note: "1941 letter to Churchill (Bletchley resources), surviving letter." },

  // ---- confucius (roster2, 21) ----
  ...bulk("confucius", [
    "achievement_drive", "analytical_rigor", "collaboration", "competitiveness",
    "conflict_tolerance", "curiosity", "deep_focus", "detail_orientation", "discipline",
    "impact_motivation", "independent_thinking", "leadership_drive", "mastery_orientation",
    "perfectionism", "persistence", "persuasiveness", "planning_orientation", "risk_tolerance",
    "social_assertiveness", "systems_abstraction",
  ], "unsupported_from_available_provenance", NO_RATIONALE_NOTE),
  { slug: "confucius", attributeId: "proactive_agency", classification: "attribution_uncertain", note: "Sourced only to the Analects, a secondhand compilation 'not until many years after his death' per the file's own note." },

  // ---- albert-einstein (candidate JSON, 23, all specific/2 real sources) ----
  ...bulk("albert-einstein", [
    "analytical_rigor", "autonomy_need", "belief_updating", "collaboration", "conflict_tolerance",
    "creative_originality", "cross_domain_range", "curiosity", "deep_focus", "discipline",
    "execution_speed", "experimentation", "impact_motivation", "independent_thinking",
    "intuitive_synthesis", "mastery_orientation", "persistence", "persuasiveness",
    "planning_orientation", "proactive_agency", "risk_tolerance", "social_assertiveness",
    "systems_abstraction",
  ], "supported_as_written"),

  // ---- anna-pavlova (candidate JSON, 25, per-episode-ID ledger) ----
  ...bulk("anna-pavlova", [
    "achievement_drive", "adaptability", "aesthetic_sensitivity", "autonomy_need", "collaboration",
    "competitiveness", "conflict_tolerance", "creative_originality", "cross_domain_range",
    "curiosity", "decisiveness", "deep_focus", "detail_orientation", "discipline",
    "experimentation", "impact_motivation", "independent_thinking", "leadership_drive",
    "mastery_orientation", "opportunity_sensing", "perfectionism", "persistence",
    "proactive_agency", "resourcefulness", "risk_tolerance",
  ], "supported_as_written"),

  // ---- aung-san-suu-kyi (candidate JSON, 25, per-episode-ID ledger) ----
  ...bulk("aung-san-suu-kyi", [
    "achievement_drive", "adaptability", "ambiguity_tolerance", "analytical_rigor", "autonomy_need",
    "belief_updating", "collaboration", "conflict_tolerance", "decisiveness", "deep_focus",
    "detail_orientation", "discipline", "execution_speed", "impact_motivation",
    "independent_thinking", "leadership_drive", "mastery_orientation", "opportunity_sensing",
    "persistence", "persuasiveness", "planning_orientation", "proactive_agency",
    "resourcefulness", "risk_tolerance", "social_assertiveness",
  ], "supported_as_written"),

  // ---- akio-morita (candidate JSON, 26, per-episode-ID ledger) ----
  ...bulk("akio-morita", [
    "achievement_drive", "adaptability", "ambiguity_tolerance", "autonomy_need", "belief_updating",
    "collaboration", "competitiveness", "conflict_tolerance", "cross_domain_range", "decisiveness",
    "detail_orientation", "discipline", "experimentation", "impact_motivation",
    "independent_thinking", "intuitive_synthesis", "leadership_drive", "mastery_orientation",
    "opportunity_sensing", "persistence", "persuasiveness", "planning_orientation",
    "proactive_agency", "resourcefulness", "risk_tolerance", "social_assertiveness",
  ], "supported_as_written"),

  // ---- bertrand-russell (candidate JSON, 22, cross-corroborated) ----
  ...bulk("bertrand-russell", [
    "achievement_drive", "ambiguity_tolerance", "analytical_rigor", "autonomy_need",
    "belief_updating", "collaboration", "conflict_tolerance", "cross_domain_range", "curiosity",
    "discipline", "impact_motivation", "independent_thinking", "leadership_drive",
    "mastery_orientation", "persistence", "persuasiveness", "proactive_agency",
    "risk_tolerance", "social_assertiveness",
  ], "supported_as_written"),
  { slug: "bertrand-russell", attributeId: "decisiveness", classification: "attribution_uncertain", note: "Own rationale: 'inferred rather than directly evidenced as decisiveness specifically.'" },
  { slug: "bertrand-russell", attributeId: "opportunity_sensing", classification: "outcome_based_inference", note: "Inferred from a book's commercial/critical success, not from a documented antecedent choice." },
  { slug: "bertrand-russell", attributeId: "competitiveness", classification: "unsupported_from_available_provenance", note: "Own rationale: 'no sustained, well-corroborated personal rivalry pattern... scored at the safe default.'" },

  // ---- bette-davis (candidate JSON, 22, cross-corroborated from Crawford's side) ----
  ...bulk("bette-davis", [
    "achievement_drive", "autonomy_need", "collaboration", "competitiveness", "conflict_tolerance",
    "decisiveness", "detail_orientation", "discipline", "independent_thinking", "leadership_drive",
    "mastery_orientation", "opportunity_sensing", "persistence", "proactive_agency",
    "resourcefulness", "risk_tolerance", "social_assertiveness",
  ], "supported_as_written"),
  { slug: "bette-davis", attributeId: "persuasiveness", classification: "outcome_based_inference", note: "Own rationale: 'inferred persuasive leverage from the documented change in her subsequent casting.'" },
  { slug: "bette-davis", attributeId: "belief_updating", classification: "outcome_based_inference", note: "Inferred from a shift in role choices, not a documented statement of revised belief." },
  { slug: "bette-davis", attributeId: "impact_motivation", classification: "unsupported_from_available_provenance", note: "Own rationale: 'Thin direct evidence... scored at the safe default.'" },
  { slug: "bette-davis", attributeId: "cross_domain_range", classification: "unsupported_from_available_provenance", note: "Own rationale: 'scored at the safe default rather than extended without evidence.'" },
  { slug: "bette-davis", attributeId: "aesthetic_sensitivity", classification: "unsupported_from_available_provenance", note: "Own rationale: 'Thin direct evidence... scored at the safe default.'" },

  // ---- abraham-lincoln (candidate JSON, 22, named scholarly biographies + own Collected Works) ----
  ...bulk("abraham-lincoln", [
    "achievement_drive", "adaptability", "ambiguity_tolerance", "analytical_rigor", "autonomy_need",
    "collaboration", "conflict_tolerance", "creative_originality", "curiosity", "decisiveness",
    "deep_focus", "discipline", "impact_motivation", "independent_thinking", "leadership_drive",
    "mastery_orientation", "persistence", "persuasiveness", "planning_orientation",
    "proactive_agency", "risk_tolerance", "social_assertiveness",
  ], "supported_as_written"),

  // ---- alexander-hamilton (candidate JSON, 22) ----
  ...bulk("alexander-hamilton", [
    "achievement_drive", "analytical_rigor", "autonomy_need", "competitiveness",
    "conflict_tolerance", "cross_domain_range", "curiosity", "decisiveness", "discipline",
    "execution_speed", "impact_motivation", "independent_thinking", "leadership_drive",
    "mastery_orientation", "persistence", "persuasiveness", "planning_orientation",
    "proactive_agency", "risk_tolerance", "social_assertiveness",
  ], "supported_as_written"),
  { slug: "alexander-hamilton", attributeId: "aesthetic_sensitivity", classification: "unsupported_from_available_provenance", note: "Own rationale: 'Little direct documented evidence either way... scored at the safe default.'" },
  { slug: "alexander-hamilton", attributeId: "opportunity_sensing", classification: "attribution_uncertain", note: "Own rationale: 'inferred from the pattern of timing rather than a single documented statement of intent.'" },

  // ---- aristotle (candidate JSON, 20, primary self-authored corpus) ----
  ...bulk("aristotle", [
    "analytical_rigor", "autonomy_need", "belief_updating", "creative_originality",
    "cross_domain_range", "curiosity", "deep_focus", "detail_orientation", "discipline",
    "experimentation", "impact_motivation", "independent_thinking", "leadership_drive",
    "mastery_orientation", "persistence", "planning_orientation", "risk_tolerance",
    "social_assertiveness", "systems_abstraction",
  ], "supported_as_written"),
  { slug: "aristotle", attributeId: "achievement_drive", classification: "outcome_based_inference", note: "Inferred from continued output/influence, not a specific documented drive-episode." },

  // ---- hildegard-of-bingen (candidate JSON, 21, primary self-authored letters/compositions) ----
  ...bulk("hildegard-of-bingen", [
    "aesthetic_sensitivity", "autonomy_need", "conflict_tolerance", "creative_originality",
    "cross_domain_range", "curiosity", "detail_orientation", "discipline", "independent_thinking",
    "leadership_drive", "mastery_orientation", "persistence", "persuasiveness",
    "planning_orientation", "proactive_agency", "risk_tolerance", "social_assertiveness",
    "systems_abstraction",
  ], "supported_as_written"),
  { slug: "hildegard-of-bingen", attributeId: "intuitive_synthesis", classification: "attribution_uncertain", note: "Rests on interpreting the nature of a visionary text, one step removed from a concrete behavioral claim." },
  { slug: "hildegard-of-bingen", attributeId: "collaboration", classification: "attribution_uncertain", note: "Own rationale: 'sources describe more about the output than the collaborative dynamic itself.'" },
  { slug: "hildegard-of-bingen", attributeId: "achievement_drive", classification: "outcome_based_inference", note: "Inferred from a pattern of progressively larger undertakings, not a single documented drive-episode." },

  // ---- ernest-shackleton (candidate JSON, 21, 2 sources incl. crew-diary-based biography) ----
  ...bulk("ernest-shackleton", [
    "adaptability", "collaboration", "competitiveness", "conflict_tolerance", "creative_originality",
    "cross_domain_range", "decisiveness", "detail_orientation", "discipline", "execution_speed",
    "independent_thinking", "leadership_drive", "opportunity_sensing", "perfectionism",
    "persistence", "persuasiveness", "planning_orientation", "proactive_agency",
    "resourcefulness", "risk_tolerance", "social_assertiveness",
  ], "supported_as_written"),

  // ================= FROZEN 8 CONTROLS =================

  // ---- george-bernard-shaw (Roster32 evidence_approved, 16) ----
  ...bulk("george-bernard-shaw", [
    "adaptability", "autonomy_need", "conflict_tolerance", "detail_orientation", "discipline",
    "independent_thinking", "leadership_drive", "persistence", "persuasiveness",
    "planning_orientation", "risk_tolerance", "social_assertiveness", "systems_abstraction",
  ], "supported_as_written"),
  { slug: "george-bernard-shaw", attributeId: "achievement_drive", classification: "outcome_based_inference", note: "Own rationale: 'Inferred from a sustained... career culminating in the 1925 Nobel Prize.'" },
  { slug: "george-bernard-shaw", attributeId: "creative_originality", classification: "outcome_based_inference", note: "Own rationale: 'the underlying originality itself is inferred rather than itemized incident by incident.'" },
  { slug: "george-bernard-shaw", attributeId: "belief_updating", classification: "unsupported_from_available_provenance", note: "Own rationale: 'thin evidence base, kept at inference level.'" },

  // ---- pablo-neruda (Roster32 evidence_approved, 21) ----
  ...bulk("pablo-neruda", [
    "achievement_drive", "adaptability", "aesthetic_sensitivity", "autonomy_need",
    "conflict_tolerance", "creative_originality", "cross_domain_range", "detail_orientation",
    "impact_motivation", "independent_thinking", "leadership_drive", "mastery_orientation",
    "persistence", "persuasiveness", "planning_orientation", "resourcefulness", "risk_tolerance",
    "social_assertiveness",
  ], "supported_as_written"),
  { slug: "pablo-neruda", attributeId: "curiosity", classification: "attribution_uncertain", note: "Inferred from thematic content of his poetry rather than a specific documented act." },
  { slug: "pablo-neruda", attributeId: "deep_focus", classification: "outcome_based_inference", note: "Inferred from sustained large output volume, not a documented focus episode." },
  { slug: "pablo-neruda", attributeId: "discipline", classification: "outcome_based_inference", note: "Inferred from prolific output while sustaining a second career, an outcome proxy." },

  // ---- pele (Roster32 evidence_approved, 6) ----
  { slug: "pele", attributeId: "achievement_drive", classification: "supported_as_written", note: "Specific childhood vow to his father, [NEW_EVIDENCE, Roster32]." },
  { slug: "pele", attributeId: "resourcefulness", classification: "supported_as_written", note: "Specific childhood-poverty episodes, [NEW_EVIDENCE, Roster32]." },
  { slug: "pele", attributeId: "planning_orientation", classification: "supported_as_written", note: "Two specific documented instances, [NEW_EVIDENCE, Roster32]." },
  { slug: "pele", attributeId: "decisiveness", classification: "supported_as_written", note: "Specific multi-month Cosmos-negotiation episode, [NEW_EVIDENCE, Roster32]." },
  { slug: "pele", attributeId: "competitiveness", classification: "outcome_based_inference", note: "Own rationale: 'inferred substantially from results rather than specific documented personal behavior.'" },
  { slug: "pele", attributeId: "discipline", classification: "outcome_based_inference", note: "Own rationale: 'sourcing documents match outcomes and statistics far more thoroughly than his personal working habits.'" },

  // ---- virginia-woolf (Roster32 evidence_approved, 12) ----
  ...bulk("virginia-woolf", [
    "belief_updating", "conflict_tolerance", "creative_originality", "discipline",
    "independent_thinking", "leadership_drive", "perfectionism", "persistence", "resourcefulness",
  ], "supported_as_written"),
  { slug: "virginia-woolf", attributeId: "autonomy_need", classification: "duplicated_behavior", note: "Own rationale: 'scored cautiously given overlap with the resourcefulness row above' -- same Hogarth Press founding-purpose fact reused." },
  { slug: "virginia-woolf", attributeId: "risk_tolerance", classification: "attribution_uncertain", note: "Own rationale: 'a joint decision with her husband, not a documented instance of her acting alone.'" },
  { slug: "virginia-woolf", attributeId: "competitiveness", classification: "attribution_uncertain", note: "Own rationale: 'the exact date could not be independently confirmed this cycle.'" },

  // ---- james-baldwin (Roster32 evidence_approved, 10) ----
  ...bulk("james-baldwin", [
    "autonomy_need", "conflict_tolerance", "cross_domain_range", "curiosity", "discipline",
    "independent_thinking", "mastery_orientation", "persistence", "persuasiveness", "risk_tolerance",
  ], "supported_as_written"),

  // ---- ahmed-zewail (Roster31 evidence_approved, 12) ----
  ...bulk("ahmed-zewail", [
    "analytical_rigor", "creative_originality", "cross_domain_range", "impact_motivation",
    "independent_thinking", "leadership_drive", "mastery_orientation", "persistence",
    "proactive_agency", "risk_tolerance",
  ], "supported_as_written"),
  { slug: "ahmed-zewail", attributeId: "curiosity", classification: "outcome_based_inference", note: "Own rationale: 'inferred as sustained intellectual range from the documented breadth of applications' -- outcome/breadth used as proxy." },
  { slug: "ahmed-zewail", attributeId: "achievement_drive", classification: "outcome_based_inference", note: "Own rationale: 'inferred as sustained exceptional achievement drive from the documented arc of this career trajectory.'" },

  // ---- antoni-gaudi (Roster30-era evidence_approved, 6) ----
  ...bulk("antoni-gaudi", [
    "autonomy_need", "creative_originality", "discipline", "impact_motivation",
    "independent_thinking", "persistence",
  ], "supported_as_written"),

  // ---- andrew-carnegie (Roster30-era evidence_approved, 5) ----
  ...bulk("andrew-carnegie", [
    "achievement_drive", "conflict_tolerance", "impact_motivation", "independent_thinking",
    "resourcefulness",
  ], "supported_as_written"),
];

/* ------------------------------------------------------------ aggregation */

export const ALL_CLASSIFICATIONS: readonly RowClassification[] = [
  "supported_as_written",
  "support_but_overstated",
  "outcome_based_inference",
  "duplicated_behavior",
  "attribution_uncertain",
  "unsupported_from_available_provenance",
  "provenance_not_reconstructable",
];

export type ClassificationCounts = Record<RowClassification, number> & { total: number };
export type ClassificationRates = Record<RowClassification, number>;

export function countClassifications(entries: readonly ManualLedgerEntry[]): ClassificationCounts {
  const counts = Object.fromEntries(ALL_CLASSIFICATIONS.map((c) => [c, 0])) as ClassificationCounts;
  counts.total = 0;
  for (const e of entries) {
    counts[e.classification] += 1;
    counts.total += 1;
  }
  return counts;
}

export function ratesFromCounts(counts: ClassificationCounts): ClassificationRates {
  const rates = {} as ClassificationRates;
  for (const c of ALL_CLASSIFICATIONS) {
    rates[c] = counts.total === 0 ? 0 : counts[c] / counts.total;
  }
  return rates;
}

export function ledgerFor(slugs: readonly string[]): ManualLedgerEntry[] {
  const set = new Set(slugs);
  return MANUAL_ROW_LEDGER.filter((e) => set.has(e.slug));
}

/** Cross-check: every ledger row must map to a real, currently-scored
 *  attribute on that person in the live built data. Returns violations
 *  (empty array = clean). `SUPERSEDED_AUDIT_SLUGS` are skipped by design
 *  (their ledger rows are an intentionally-preserved historical snapshot,
 *  not a live mirror -- see that constant's own doc comment); every other
 *  slug is still checked against live data, so this does not silently
 *  swallow real drift. Pure/read-only -- never mutates SEED_PEOPLE. */
export function findOrphanLedgerRows(entries: readonly ManualLedgerEntry[]): ManualLedgerEntry[] {
  const bySlug = new Map(SEED_PEOPLE.map((p) => [p.slug, new Set(p.attributes.map((a) => a.attributeId))]));
  return entries.filter(
    (e) => !SUPERSEDED_AUDIT_SLUGS.has(e.slug) && !bySlug.get(e.slug)?.has(e.attributeId),
  );
}

/** Cross-check: every scored attribute on the target people must have
 *  exactly one ledger row. Returns missing (person, attributeId) pairs.
 *  `SUPERSEDED_AUDIT_SLUGS` are skipped for the same reason as
 *  `findOrphanLedgerRows` above. */
export function findMissingLedgerRows(slugs: readonly string[]): Array<{ slug: string; attributeId: AttributeId }> {
  const covered = new Set(MANUAL_ROW_LEDGER.map((e) => `${e.slug}::${e.attributeId}`));
  const missing: Array<{ slug: string; attributeId: AttributeId }> = [];
  for (const slug of slugs) {
    if (SUPERSEDED_AUDIT_SLUGS.has(slug)) continue;
    const p = SEED_PEOPLE.find((x) => x.slug === slug);
    if (!p) continue;
    for (const a of p.attributes) {
      if (!covered.has(`${slug}::${a.attributeId}`)) missing.push({ slug, attributeId: a.attributeId });
    }
  }
  return missing;
}

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

function report(label: string, entries: readonly ManualLedgerEntry[]): void {
  const counts = countClassifications(entries);
  const rates = ratesFromCounts(counts);
  console.log(`\n=== ${label} (denominator = ${counts.total}) ===`);
  for (const c of ALL_CLASSIFICATIONS) {
    console.log(`${c}: ${counts[c]} (${pct(rates[c])})`);
  }
}

function main(): void {
  const eligibleEntries = ledgerFor(FROZEN_16_ELIGIBLE);
  const controlEntries = ledgerFor(FROZEN_8_CONTROLS);

  report("FROZEN 16 ELIGIBLE", eligibleEntries);
  report("FROZEN 8 CONTROLS", controlEntries);
  report("COMBINED 24", MANUAL_ROW_LEDGER);

  const orphans = findOrphanLedgerRows(MANUAL_ROW_LEDGER);
  const missing = [...findMissingLedgerRows(FROZEN_16_ELIGIBLE), ...findMissingLedgerRows(FROZEN_8_CONTROLS)];
  console.log("\n=== INTEGRITY CHECKS ===");
  console.log("orphan ledger rows (no matching live attribute):", orphans.length);
  console.log("missing ledger rows (scored attribute with no ledger entry):", missing.length);
  if (orphans.length) console.log(JSON.stringify(orphans, null, 2));
  if (missing.length) console.log(JSON.stringify(missing, null, 2));

  // Decomposition referenced in the checkpoint doc: roster1/2 vs
  // candidate-JSON-backed within the FROZEN eligible sample, as it stood
  // at PR #35 freeze time. akira-kurosawa is included here: he had no
  // candidate JSON at freeze time (a real one was added only later, by
  // the legacy integrity remediation cycle) -- this decomposition is
  // historical, like the rest of this file, so it classifies him by his
  // lineage AT FREEZE TIME, not his current one.
  const ROSTER1_2 = ["ada-lovelace", "akira-kurosawa", "benjamin-franklin", "alan-turing", "confucius"];
  const jsonBackedEligible = ledgerFor(FROZEN_16_ELIGIBLE.filter((s) => !ROSTER1_2.includes(s)));
  report("ELIGIBLE SAMPLE, JSON-BACKED LINEAGE ONLY (11 people)", jsonBackedEligible);
}

const isDirectRun = (() => {
  try {
    return process.argv[1] !== undefined && fileURLToPath(import.meta.url) === process.argv[1];
  } catch {
    return false;
  }
})();

if (isDirectRun) {
  main();
}
