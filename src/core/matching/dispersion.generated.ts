/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 83 match-eligible seed profiles.
 * meanSd = 12.645
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0166,
  analytical_rigor: 0.9821,
  intuitive_synthesis: 0.9278,
  systems_abstraction: 0.9653,
  independent_thinking: 0.8330,
  belief_updating: 1.2168,
  creative_originality: 0.9780,
  experimentation: 1.0497,
  cross_domain_range: 1.1100,
  aesthetic_sensitivity: 1.3396,
  discipline: 0.8876,
  deep_focus: 0.8862,
  detail_orientation: 0.9662,
  perfectionism: 1.0624,
  execution_speed: 1.1869,
  planning_orientation: 1.0504,
  persistence: 0.8588,
  adaptability: 0.9651,
  risk_tolerance: 1.0272,
  ambiguity_tolerance: 0.8851,
  decisiveness: 0.9160,
  social_assertiveness: 1.2032,
  collaboration: 1.0153,
  leadership_drive: 1.1901,
  persuasiveness: 1.0222,
  conflict_tolerance: 1.0458,
  mastery_orientation: 0.9642,
  achievement_drive: 0.8892,
  competitiveness: 1.2539,
  autonomy_need: 0.8984,
  impact_motivation: 0.9284,
  opportunity_sensing: 0.8156,
  resourcefulness: 0.8695,
  proactive_agency: 0.7934,
};
