/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 127 match-eligible seed profiles.
 * meanSd = 12.006
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0099,
  analytical_rigor: 0.9925,
  intuitive_synthesis: 0.9489,
  systems_abstraction: 0.9837,
  independent_thinking: 0.8500,
  belief_updating: 1.1324,
  creative_originality: 1.0126,
  experimentation: 1.0503,
  cross_domain_range: 1.0838,
  aesthetic_sensitivity: 1.2582,
  discipline: 0.8852,
  deep_focus: 0.9178,
  detail_orientation: 0.9556,
  perfectionism: 1.0801,
  execution_speed: 1.2496,
  planning_orientation: 1.0763,
  persistence: 0.8635,
  adaptability: 0.9444,
  risk_tolerance: 1.0025,
  ambiguity_tolerance: 0.9917,
  decisiveness: 0.9496,
  social_assertiveness: 1.1519,
  collaboration: 1.0515,
  leadership_drive: 1.1281,
  persuasiveness: 0.9597,
  conflict_tolerance: 1.0185,
  mastery_orientation: 0.9754,
  achievement_drive: 0.9143,
  competitiveness: 1.2067,
  autonomy_need: 0.9010,
  impact_motivation: 0.9178,
  opportunity_sensing: 0.8788,
  resourcefulness: 0.8849,
  proactive_agency: 0.7729,
};
