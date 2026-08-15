/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 69 match-eligible seed profiles.
 * meanSd = 12.672
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0198,
  analytical_rigor: 0.9946,
  intuitive_synthesis: 0.9269,
  systems_abstraction: 0.9731,
  independent_thinking: 0.8127,
  belief_updating: 1.2174,
  creative_originality: 0.9870,
  experimentation: 1.0352,
  cross_domain_range: 1.1119,
  aesthetic_sensitivity: 1.3431,
  discipline: 0.8705,
  deep_focus: 0.8866,
  detail_orientation: 0.9694,
  perfectionism: 1.0756,
  execution_speed: 1.1855,
  planning_orientation: 1.0855,
  persistence: 0.8243,
  adaptability: 0.9612,
  risk_tolerance: 1.0413,
  ambiguity_tolerance: 0.8859,
  decisiveness: 0.9269,
  social_assertiveness: 1.2220,
  collaboration: 1.0445,
  leadership_drive: 1.1940,
  persuasiveness: 1.0366,
  conflict_tolerance: 1.0779,
  mastery_orientation: 0.9411,
  achievement_drive: 0.8556,
  competitiveness: 1.2524,
  autonomy_need: 0.9016,
  impact_motivation: 0.9057,
  opportunity_sensing: 0.8245,
  resourcefulness: 0.8451,
  proactive_agency: 0.7651,
};
