/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 124 match-eligible seed profiles.
 * meanSd = 12.066
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0137,
  analytical_rigor: 0.9901,
  intuitive_synthesis: 0.9467,
  systems_abstraction: 0.9813,
  independent_thinking: 0.8498,
  belief_updating: 1.1426,
  creative_originality: 1.0101,
  experimentation: 1.0475,
  cross_domain_range: 1.0863,
  aesthetic_sensitivity: 1.2602,
  discipline: 0.8850,
  deep_focus: 0.9157,
  detail_orientation: 0.9562,
  perfectionism: 1.0772,
  execution_speed: 1.2458,
  planning_orientation: 1.0764,
  persistence: 0.8614,
  adaptability: 0.9455,
  risk_tolerance: 0.9988,
  ambiguity_tolerance: 0.9966,
  decisiveness: 0.9493,
  social_assertiveness: 1.1568,
  collaboration: 1.0496,
  leadership_drive: 1.1333,
  persuasiveness: 0.9607,
  conflict_tolerance: 1.0212,
  mastery_orientation: 0.9726,
  achievement_drive: 0.9122,
  competitiveness: 1.2087,
  autonomy_need: 0.9016,
  impact_motivation: 0.9140,
  opportunity_sensing: 0.8752,
  resourcefulness: 0.8830,
  proactive_agency: 0.7751,
};
