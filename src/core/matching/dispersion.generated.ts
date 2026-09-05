/* GENERATED FILE — do not edit by hand. Regenerate with: pnpm calibrate */
import type { AttributeId } from "../attributes/attributes.js";

export const DISPERSION_VERSION = "dispersion_v1";

/**
 * discriminative_i = clamp((1 - L) + L * sd_i / meanSd)
 * Derived from 125 match-eligible seed profiles.
 * meanSd = 12.083
 */
export const DISPERSION_TABLE: Record<AttributeId, number> = {
  curiosity: 1.0156,
  analytical_rigor: 0.9941,
  intuitive_synthesis: 0.9399,
  systems_abstraction: 0.9836,
  independent_thinking: 0.8478,
  belief_updating: 1.1417,
  creative_originality: 1.0071,
  experimentation: 1.0468,
  cross_domain_range: 1.0967,
  aesthetic_sensitivity: 1.2591,
  discipline: 0.8831,
  deep_focus: 0.9212,
  detail_orientation: 0.9556,
  perfectionism: 1.0764,
  execution_speed: 1.2532,
  planning_orientation: 1.0756,
  persistence: 0.8613,
  adaptability: 0.9471,
  risk_tolerance: 0.9963,
  ambiguity_tolerance: 0.9947,
  decisiveness: 0.9478,
  social_assertiveness: 1.1532,
  collaboration: 1.0516,
  leadership_drive: 1.1319,
  persuasiveness: 0.9601,
  conflict_tolerance: 1.0204,
  mastery_orientation: 0.9740,
  achievement_drive: 0.9130,
  competitiveness: 1.2078,
  autonomy_need: 0.9010,
  impact_motivation: 0.9115,
  opportunity_sensing: 0.8745,
  resourcefulness: 0.8825,
  proactive_agency: 0.7734,
};
