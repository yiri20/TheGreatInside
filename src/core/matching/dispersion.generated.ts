/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 96 match-eligible seed profiles.
 * meanSd = 12.596
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0393,
  analytical_rigor: 0.9733,
  intuitive_synthesis: 0.9279,
  systems_abstraction: 0.9611,
  independent_thinking: 0.8383,
  belief_updating: 1.2574,
  creative_originality: 1.0090,
  experimentation: 1.0362,
  cross_domain_range: 1.1116,
  aesthetic_sensitivity: 1.3191,
  discipline: 0.8833,
  deep_focus: 0.8893,
  detail_orientation: 0.9596,
  perfectionism: 1.0607,
  execution_speed: 1.2222,
  planning_orientation: 1.0566,
  persistence: 0.8495,
  adaptability: 0.9485,
  risk_tolerance: 1.0254,
  ambiguity_tolerance: 0.8719,
  decisiveness: 0.9065,
  social_assertiveness: 1.1868,
  collaboration: 1.0211,
  leadership_drive: 1.1682,
  persuasiveness: 0.9927,
  conflict_tolerance: 1.0402,
  mastery_orientation: 0.9943,
  achievement_drive: 0.9295,
  competitiveness: 1.2284,
  autonomy_need: 0.9133,
  impact_motivation: 0.8999,
  opportunity_sensing: 0.8314,
  resourcefulness: 0.8589,
  proactive_agency: 0.7888,
};
