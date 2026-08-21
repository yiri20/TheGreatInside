/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 94 match-eligible seed profiles.
 * meanSd = 12.570
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0404,
  analytical_rigor: 0.9743,
  intuitive_synthesis: 0.9288,
  systems_abstraction: 0.9620,
  independent_thinking: 0.8328,
  belief_updating: 1.2590,
  creative_originality: 1.0051,
  experimentation: 1.0373,
  cross_domain_range: 1.1160,
  aesthetic_sensitivity: 1.3208,
  discipline: 0.8849,
  deep_focus: 0.8874,
  detail_orientation: 0.9592,
  perfectionism: 1.0618,
  execution_speed: 1.2237,
  planning_orientation: 1.0610,
  persistence: 0.8517,
  adaptability: 0.9515,
  risk_tolerance: 1.0299,
  ambiguity_tolerance: 0.8727,
  decisiveness: 0.9028,
  social_assertiveness: 1.1867,
  collaboration: 1.0269,
  leadership_drive: 1.1743,
  persuasiveness: 0.9971,
  conflict_tolerance: 1.0465,
  mastery_orientation: 0.9956,
  achievement_drive: 0.9069,
  competitiveness: 1.2299,
  autonomy_need: 0.8875,
  impact_motivation: 0.9052,
  opportunity_sensing: 0.8321,
  resourcefulness: 0.8596,
  proactive_agency: 0.7889,
};
