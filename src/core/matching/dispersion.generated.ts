/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 126 match-eligible seed profiles.
 * meanSd = 12.017
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0112,
  analytical_rigor: 0.9950,
  intuitive_synthesis: 0.9550,
  systems_abstraction: 0.9868,
  independent_thinking: 0.8499,
  belief_updating: 1.1318,
  creative_originality: 1.0120,
  experimentation: 1.0543,
  cross_domain_range: 1.0848,
  aesthetic_sensitivity: 1.2531,
  discipline: 0.8832,
  deep_focus: 0.9158,
  detail_orientation: 0.9478,
  perfectionism: 1.0714,
  execution_speed: 1.2506,
  planning_orientation: 1.0764,
  persistence: 0.8633,
  adaptability: 0.9451,
  risk_tolerance: 1.0033,
  ambiguity_tolerance: 0.9913,
  decisiveness: 0.9489,
  social_assertiveness: 1.1539,
  collaboration: 1.0536,
  leadership_drive: 1.1257,
  persuasiveness: 0.9616,
  conflict_tolerance: 1.0192,
  mastery_orientation: 0.9737,
  achievement_drive: 0.9145,
  competitiveness: 1.2113,
  autonomy_need: 0.9005,
  impact_motivation: 0.9193,
  opportunity_sensing: 0.8785,
  resourcefulness: 0.8845,
  proactive_agency: 0.7727,
};
