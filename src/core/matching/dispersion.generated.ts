/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 34 match-eligible seed profiles.
 * meanSd = 12.734
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 0.9779,
  analytical_rigor: 1.0493,
  intuitive_synthesis: 0.9475,
  systems_abstraction: 1.0020,
  independent_thinking: 0.7555,
  belief_updating: 0.8296,
  creative_originality: 1.0643,
  experimentation: 1.0195,
  cross_domain_range: 1.1342,
  aesthetic_sensitivity: 1.3849,
  discipline: 0.8867,
  deep_focus: 0.8358,
  detail_orientation: 0.9583,
  perfectionism: 1.0522,
  execution_speed: 1.1736,
  planning_orientation: 1.1809,
  persistence: 0.7863,
  adaptability: 0.9860,
  risk_tolerance: 1.0731,
  ambiguity_tolerance: 0.8887,
  decisiveness: 0.9443,
  social_assertiveness: 1.1847,
  collaboration: 1.0604,
  leadership_drive: 1.2940,
  persuasiveness: 1.1457,
  conflict_tolerance: 1.1352,
  mastery_orientation: 0.8784,
  achievement_drive: 0.8668,
  competitiveness: 1.2601,
  autonomy_need: 0.8833,
  impact_motivation: 0.9358,
  opportunity_sensing: 0.8340,
  resourcefulness: 0.7958,
  proactive_agency: 0.7951,
};
