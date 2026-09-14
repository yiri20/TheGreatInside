/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 114 match-eligible seed profiles.
 * meanSd = 11.704
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0130,
  analytical_rigor: 1.0071,
  intuitive_synthesis: 0.9838,
  systems_abstraction: 0.9945,
  independent_thinking: 0.8464,
  belief_updating: 1.1553,
  creative_originality: 1.0234,
  experimentation: 1.0899,
  cross_domain_range: 1.1011,
  aesthetic_sensitivity: 1.2892,
  discipline: 0.8766,
  deep_focus: 0.8955,
  detail_orientation: 0.9394,
  perfectionism: 1.0571,
  execution_speed: 1.2976,
  planning_orientation: 1.0731,
  persistence: 0.8603,
  adaptability: 0.9313,
  risk_tolerance: 1.0229,
  ambiguity_tolerance: 1.0181,
  decisiveness: 0.9445,
  social_assertiveness: 1.1488,
  collaboration: 1.0648,
  leadership_drive: 1.1015,
  persuasiveness: 0.8999,
  conflict_tolerance: 1.0189,
  mastery_orientation: 0.9409,
  achievement_drive: 0.8911,
  competitiveness: 1.1753,
  autonomy_need: 0.8847,
  impact_motivation: 0.9212,
  opportunity_sensing: 0.8790,
  resourcefulness: 0.8837,
  proactive_agency: 0.7702,
};
