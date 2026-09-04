/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 95 match-eligible seed profiles.
 * meanSd = 12.566
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0430,
  analytical_rigor: 0.9744,
  intuitive_synthesis: 0.9289,
  systems_abstraction: 0.9622,
  independent_thinking: 0.8314,
  belief_updating: 1.2592,
  creative_originality: 1.0045,
  experimentation: 1.0375,
  cross_domain_range: 1.1171,
  aesthetic_sensitivity: 1.3210,
  discipline: 0.8862,
  deep_focus: 0.8912,
  detail_orientation: 0.9606,
  perfectionism: 1.0620,
  execution_speed: 1.2239,
  planning_orientation: 1.0612,
  persistence: 0.8500,
  adaptability: 0.9488,
  risk_tolerance: 1.0293,
  ambiguity_tolerance: 0.8728,
  decisiveness: 0.9029,
  social_assertiveness: 1.1884,
  collaboration: 1.0242,
  leadership_drive: 1.1711,
  persuasiveness: 0.9938,
  conflict_tolerance: 1.0445,
  mastery_orientation: 0.9982,
  achievement_drive: 0.9102,
  competitiveness: 1.2301,
  autonomy_need: 0.8888,
  impact_motivation: 0.9031,
  opportunity_sensing: 0.8322,
  resourcefulness: 0.8598,
  proactive_agency: 0.7874,
};
