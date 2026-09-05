/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 107 match-eligible seed profiles.
 * meanSd = 12.465
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0211,
  analytical_rigor: 0.9846,
  intuitive_synthesis: 0.9324,
  systems_abstraction: 0.9659,
  independent_thinking: 0.8422,
  belief_updating: 1.2333,
  creative_originality: 1.0066,
  experimentation: 1.0321,
  cross_domain_range: 1.0947,
  aesthetic_sensitivity: 1.3125,
  discipline: 0.8846,
  deep_focus: 0.9024,
  detail_orientation: 0.9563,
  perfectionism: 1.0740,
  execution_speed: 1.2220,
  planning_orientation: 1.0601,
  persistence: 0.8599,
  adaptability: 0.9437,
  risk_tolerance: 1.0064,
  ambiguity_tolerance: 0.9764,
  decisiveness: 0.9456,
  social_assertiveness: 1.1671,
  collaboration: 1.0346,
  leadership_drive: 1.1487,
  persuasiveness: 0.9732,
  conflict_tolerance: 1.0199,
  mastery_orientation: 0.9818,
  achievement_drive: 0.9205,
  competitiveness: 1.2139,
  autonomy_need: 0.9063,
  impact_motivation: 0.8956,
  opportunity_sensing: 0.8388,
  resourcefulness: 0.8619,
  proactive_agency: 0.7810,
};
