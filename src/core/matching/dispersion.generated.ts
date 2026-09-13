/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 117 match-eligible seed profiles.
 * meanSd = 11.769
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0072,
  analytical_rigor: 1.0062,
  intuitive_synthesis: 0.9656,
  systems_abstraction: 1.0060,
  independent_thinking: 0.8394,
  belief_updating: 1.1516,
  creative_originality: 1.0207,
  experimentation: 1.0778,
  cross_domain_range: 1.0921,
  aesthetic_sensitivity: 1.2722,
  discipline: 0.8813,
  deep_focus: 0.8962,
  detail_orientation: 0.9370,
  perfectionism: 1.0518,
  execution_speed: 1.2906,
  planning_orientation: 1.0677,
  persistence: 0.8634,
  adaptability: 0.9386,
  risk_tolerance: 1.0188,
  ambiguity_tolerance: 1.0035,
  decisiveness: 0.9593,
  social_assertiveness: 1.1529,
  collaboration: 1.0597,
  leadership_drive: 1.1054,
  persuasiveness: 0.9026,
  conflict_tolerance: 1.0237,
  mastery_orientation: 0.9446,
  achievement_drive: 0.9114,
  competitiveness: 1.2138,
  autonomy_need: 0.8805,
  impact_motivation: 0.9269,
  opportunity_sensing: 0.8721,
  resourcefulness: 0.8816,
  proactive_agency: 0.7777,
};
