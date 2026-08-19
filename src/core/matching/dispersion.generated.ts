/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 86 match-eligible seed profiles.
 * meanSd = 12.735
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0399,
  analytical_rigor: 0.9753,
  intuitive_synthesis: 0.9248,
  systems_abstraction: 0.9593,
  independent_thinking: 0.8427,
  belief_updating: 1.2118,
  creative_originality: 1.0065,
  experimentation: 1.0458,
  cross_domain_range: 1.1131,
  aesthetic_sensitivity: 1.3337,
  discipline: 0.8866,
  deep_focus: 0.8933,
  detail_orientation: 0.9631,
  perfectionism: 1.0584,
  execution_speed: 1.1911,
  planning_orientation: 1.0489,
  persistence: 0.8556,
  adaptability: 0.9587,
  risk_tolerance: 1.0209,
  ambiguity_tolerance: 0.8824,
  decisiveness: 0.9212,
  social_assertiveness: 1.1921,
  collaboration: 1.0035,
  leadership_drive: 1.1761,
  persuasiveness: 1.0116,
  conflict_tolerance: 1.0399,
  mastery_orientation: 0.9936,
  achievement_drive: 0.8868,
  competitiveness: 1.2448,
  autonomy_need: 0.8961,
  impact_motivation: 0.9184,
  opportunity_sensing: 0.8486,
  resourcefulness: 0.8640,
  proactive_agency: 0.7913,
};
