/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 115 match-eligible seed profiles.
 * meanSd = 12.272
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0173,
  analytical_rigor: 0.9881,
  intuitive_synthesis: 0.9392,
  systems_abstraction: 0.9732,
  independent_thinking: 0.8487,
  belief_updating: 1.1986,
  creative_originality: 1.0065,
  experimentation: 1.0384,
  cross_domain_range: 1.0866,
  aesthetic_sensitivity: 1.2715,
  discipline: 0.8844,
  deep_focus: 0.9088,
  detail_orientation: 0.9554,
  perfectionism: 1.0733,
  execution_speed: 1.2333,
  planning_orientation: 1.0693,
  persistence: 0.8586,
  adaptability: 0.9437,
  risk_tolerance: 1.0007,
  ambiguity_tolerance: 1.0048,
  decisiveness: 0.9467,
  social_assertiveness: 1.1592,
  collaboration: 1.0362,
  leadership_drive: 1.1446,
  persuasiveness: 0.9672,
  conflict_tolerance: 1.0147,
  mastery_orientation: 0.9750,
  achievement_drive: 0.9119,
  competitiveness: 1.2042,
  autonomy_need: 0.9056,
  impact_motivation: 0.9042,
  opportunity_sensing: 0.8704,
  resourcefulness: 0.8799,
  proactive_agency: 0.7798,
};
