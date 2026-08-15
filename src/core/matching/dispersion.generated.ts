/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 66 match-eligible seed profiles.
 * meanSd = 12.726
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0160,
  analytical_rigor: 1.0019,
  intuitive_synthesis: 0.9251,
  systems_abstraction: 0.9732,
  independent_thinking: 0.8157,
  belief_updating: 1.2407,
  creative_originality: 0.9893,
  experimentation: 1.0360,
  cross_domain_range: 1.1044,
  aesthetic_sensitivity: 1.3395,
  discipline: 0.8695,
  deep_focus: 0.8803,
  detail_orientation: 0.9727,
  perfectionism: 1.0731,
  execution_speed: 1.1825,
  planning_orientation: 1.0981,
  persistence: 0.8137,
  adaptability: 0.9573,
  risk_tolerance: 1.0491,
  ambiguity_tolerance: 0.8842,
  decisiveness: 0.9251,
  social_assertiveness: 1.2298,
  collaboration: 1.0466,
  leadership_drive: 1.2023,
  persuasiveness: 1.0343,
  conflict_tolerance: 1.0756,
  mastery_orientation: 0.9312,
  achievement_drive: 0.8527,
  competitiveness: 1.2492,
  autonomy_need: 0.8971,
  impact_motivation: 0.9026,
  opportunity_sensing: 0.8135,
  resourcefulness: 0.8523,
  proactive_agency: 0.7653,
};
