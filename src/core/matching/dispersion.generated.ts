/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 120 match-eligible seed profiles.
 * meanSd = 11.869
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0137,
  analytical_rigor: 1.0111,
  intuitive_synthesis: 0.9686,
  systems_abstraction: 0.9987,
  independent_thinking: 0.8432,
  belief_updating: 1.1397,
  creative_originality: 1.0131,
  experimentation: 1.0647,
  cross_domain_range: 1.0884,
  aesthetic_sensitivity: 1.2664,
  discipline: 0.8827,
  deep_focus: 0.8967,
  detail_orientation: 0.9416,
  perfectionism: 1.0671,
  execution_speed: 1.2695,
  planning_orientation: 1.0679,
  persistence: 0.8629,
  adaptability: 0.9356,
  risk_tolerance: 1.0118,
  ambiguity_tolerance: 1.0039,
  decisiveness: 0.9618,
  social_assertiveness: 1.1479,
  collaboration: 1.0518,
  leadership_drive: 1.1079,
  persuasiveness: 0.9104,
  conflict_tolerance: 1.0219,
  mastery_orientation: 0.9518,
  achievement_drive: 0.9230,
  competitiveness: 1.2264,
  autonomy_need: 0.8828,
  impact_motivation: 0.9245,
  opportunity_sensing: 0.8849,
  resourcefulness: 0.8784,
  proactive_agency: 0.7791,
};
