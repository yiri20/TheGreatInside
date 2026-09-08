/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 126 match-eligible seed profiles.
 * meanSd = 12.026
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0112,
  analytical_rigor: 0.9917,
  intuitive_synthesis: 0.9482,
  systems_abstraction: 0.9829,
  independent_thinking: 0.8494,
  belief_updating: 1.1313,
  creative_originality: 1.0117,
  experimentation: 1.0493,
  cross_domain_range: 1.0836,
  aesthetic_sensitivity: 1.2570,
  discipline: 0.8859,
  deep_focus: 0.9171,
  detail_orientation: 0.9550,
  perfectionism: 1.0791,
  execution_speed: 1.2483,
  planning_orientation: 1.0783,
  persistence: 0.8641,
  adaptability: 0.9459,
  risk_tolerance: 0.9994,
  ambiguity_tolerance: 0.9947,
  decisiveness: 0.9516,
  social_assertiveness: 1.1534,
  collaboration: 1.0530,
  leadership_drive: 1.1297,
  persuasiveness: 0.9601,
  conflict_tolerance: 1.0194,
  mastery_orientation: 0.9755,
  achievement_drive: 0.9119,
  competitiveness: 1.2055,
  autonomy_need: 0.9014,
  impact_motivation: 0.9182,
  opportunity_sensing: 0.8782,
  resourcefulness: 0.8842,
  proactive_agency: 0.7737,
};
