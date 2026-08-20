/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 89 match-eligible seed profiles.
 * meanSd = 12.654
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0401,
  analytical_rigor: 0.9748,
  intuitive_synthesis: 0.9217,
  systems_abstraction: 0.9623,
  independent_thinking: 0.8389,
  belief_updating: 1.2255,
  creative_originality: 1.0051,
  experimentation: 1.0467,
  cross_domain_range: 1.1239,
  aesthetic_sensitivity: 1.3270,
  discipline: 0.8861,
  deep_focus: 0.8912,
  detail_orientation: 0.9632,
  perfectionism: 1.0620,
  execution_speed: 1.1997,
  planning_orientation: 1.0617,
  persistence: 0.8541,
  adaptability: 0.9553,
  risk_tolerance: 1.0183,
  ambiguity_tolerance: 0.8795,
  decisiveness: 0.9167,
  social_assertiveness: 1.1914,
  collaboration: 1.0069,
  leadership_drive: 1.1687,
  persuasiveness: 1.0074,
  conflict_tolerance: 1.0445,
  mastery_orientation: 0.9924,
  achievement_drive: 0.8892,
  competitiveness: 1.2456,
  autonomy_need: 0.8910,
  impact_motivation: 0.9141,
  opportunity_sensing: 0.8447,
  resourcefulness: 0.8624,
  proactive_agency: 0.7879,
};
