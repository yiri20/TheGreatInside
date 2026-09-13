/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 123 match-eligible seed profiles.
 * meanSd = 11.995
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0102,
  analytical_rigor: 1.0005,
  intuitive_synthesis: 0.9666,
  systems_abstraction: 0.9926,
  independent_thinking: 0.8446,
  belief_updating: 1.1330,
  creative_originality: 1.0121,
  experimentation: 1.0497,
  cross_domain_range: 1.0878,
  aesthetic_sensitivity: 1.2613,
  discipline: 0.8808,
  deep_focus: 0.9078,
  detail_orientation: 0.9515,
  perfectionism: 1.0750,
  execution_speed: 1.2623,
  planning_orientation: 1.0781,
  persistence: 0.8605,
  adaptability: 0.9406,
  risk_tolerance: 1.0073,
  ambiguity_tolerance: 0.9994,
  decisiveness: 0.9555,
  social_assertiveness: 1.1521,
  collaboration: 1.0430,
  leadership_drive: 1.1214,
  persuasiveness: 0.9358,
  conflict_tolerance: 1.0228,
  mastery_orientation: 0.9610,
  achievement_drive: 0.9143,
  competitiveness: 1.2211,
  autonomy_need: 0.8871,
  impact_motivation: 0.9248,
  opportunity_sensing: 0.8809,
  resourcefulness: 0.8834,
  proactive_agency: 0.7757,
};
