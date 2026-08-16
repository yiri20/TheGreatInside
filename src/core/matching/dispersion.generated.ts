/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 74 match-eligible seed profiles.
 * meanSd = 12.678
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0287,
  analytical_rigor: 0.9917,
  intuitive_synthesis: 0.9267,
  systems_abstraction: 0.9674,
  independent_thinking: 0.8169,
  belief_updating: 1.2188,
  creative_originality: 0.9785,
  experimentation: 1.0392,
  cross_domain_range: 1.1028,
  aesthetic_sensitivity: 1.3427,
  discipline: 0.8933,
  deep_focus: 0.8998,
  detail_orientation: 0.9672,
  perfectionism: 1.0614,
  execution_speed: 1.1851,
  planning_orientation: 1.0735,
  persistence: 0.8362,
  adaptability: 0.9601,
  risk_tolerance: 1.0383,
  ambiguity_tolerance: 0.8888,
  decisiveness: 0.9187,
  social_assertiveness: 1.2113,
  collaboration: 1.0284,
  leadership_drive: 1.1885,
  persuasiveness: 1.0289,
  conflict_tolerance: 1.0621,
  mastery_orientation: 0.9653,
  achievement_drive: 0.8591,
  competitiveness: 1.2520,
  autonomy_need: 0.8945,
  impact_motivation: 0.9117,
  opportunity_sensing: 0.8144,
  resourcefulness: 0.8631,
  proactive_agency: 0.7848,
};
