/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 50 match-eligible seed profiles.
 * meanSd = 12.982
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 0.9443,
  analytical_rigor: 1.0190,
  intuitive_synthesis: 0.9167,
  systems_abstraction: 0.9822,
  independent_thinking: 0.8262,
  belief_updating: 1.2186,
  creative_originality: 1.0168,
  experimentation: 1.0241,
  cross_domain_range: 1.1700,
  aesthetic_sensitivity: 1.3361,
  discipline: 0.8661,
  deep_focus: 0.8635,
  detail_orientation: 0.9274,
  perfectionism: 1.0706,
  execution_speed: 1.1691,
  planning_orientation: 1.1162,
  persistence: 0.8014,
  adaptability: 0.9573,
  risk_tolerance: 1.0640,
  ambiguity_tolerance: 0.8766,
  decisiveness: 0.9307,
  social_assertiveness: 1.2370,
  collaboration: 1.0785,
  leadership_drive: 1.2306,
  persuasiveness: 1.0764,
  conflict_tolerance: 1.1038,
  mastery_orientation: 0.8801,
  achievement_drive: 0.8520,
  competitiveness: 1.2326,
  autonomy_need: 0.8838,
  impact_motivation: 0.9118,
  opportunity_sensing: 0.8130,
  resourcefulness: 0.8207,
  proactive_agency: 0.7827,
};
