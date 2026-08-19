/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 103 match-eligible seed profiles.
 * meanSd = 13.119
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0338,
  analytical_rigor: 0.9476,
  intuitive_synthesis: 0.9123,
  systems_abstraction: 0.9390,
  independent_thinking: 0.8877,
  belief_updating: 1.1626,
  creative_originality: 1.0198,
  experimentation: 1.0225,
  cross_domain_range: 1.0777,
  aesthetic_sensitivity: 1.3093,
  discipline: 0.9009,
  deep_focus: 0.9589,
  detail_orientation: 0.9828,
  perfectionism: 1.0421,
  execution_speed: 1.1709,
  planning_orientation: 1.0357,
  persistence: 0.8654,
  adaptability: 0.9546,
  risk_tolerance: 1.0588,
  ambiguity_tolerance: 1.0462,
  decisiveness: 0.8973,
  social_assertiveness: 1.1389,
  collaboration: 0.9581,
  leadership_drive: 1.1307,
  persuasiveness: 0.9902,
  conflict_tolerance: 1.0392,
  mastery_orientation: 1.0174,
  achievement_drive: 0.8585,
  competitiveness: 1.2230,
  autonomy_need: 0.9312,
  impact_motivation: 0.9278,
  opportunity_sensing: 0.8934,
  resourcefulness: 0.8787,
  proactive_agency: 0.7870,
};
