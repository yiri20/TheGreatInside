/**
 * ACHIEVEMENT ARCHETYPES — archetypes_v1
 *
 * There is deliberately NO single "ideal successful person" vector. Extraordinary
 * people reach their positions through structurally different trait patterns, so
 * the model carries several of them and a user may align with more than one.
 *
 * An archetype is defined by SIGNATURE ATTRIBUTES WITH TARGET BANDS, not by
 * maxima. A band encodes "this range is characteristic of the pattern" — scoring
 * above the band is not extra credit. This is the mechanism that stops the
 * engine from asserting "more of a trait is always better".
 *
 * TARGETS ARE PRIORS, NOT DOGMA. `deriveArchetypeCentroids` shrinks the prior
 * toward the observed mean of dataset people assigned to that archetype:
 *
 *     target = (n * observedMean + K * prior) / (n + K)
 *
 * With few people the prior dominates; as the dataset grows toward 1,000 the
 * data takes over. K is the shrinkage constant and is part of the version.
 *
 * These are ANALYTICAL CLUSTERS, not validated psychological types, and the UI
 * must never present them as a personality diagnosis.
 */

import type { AttributeId } from "../attributes/attributes.js";
import type { Person } from "../types.js";

export const ARCHETYPES_VERSION = "archetypes_v1";
export const SHRINKAGE_K = 4;

export const ARCHETYPE_IDS = [
  "creative_creator",
  "scientific_explorer",
  "entrepreneurial_builder",
  "technical_innovator",
  "organizational_leader",
  "independent_creator",
  "competitive_performer",
  "scholarly_specialist",
  "cross_disciplinary_generalist",
  "social_influencer",
] as const;

export type ArchetypeId = (typeof ARCHETYPE_IDS)[number];

export interface SignatureBand {
  attributeId: AttributeId;
  /** Centre of the characteristic band, 0-100. */
  target: number;
  /** Half-width of the band. Inside the band costs nothing. */
  tolerance: number;
  /** Relative importance of this attribute to the archetype. */
  weight: number;
}

export interface ArchetypeDefinition {
  id: ArchetypeId;
  labelKey: string;
  signature: SignatureBand[];
}

const b = (attributeId: AttributeId, target: number, tolerance: number, weight = 1): SignatureBand => ({
  attributeId,
  target,
  tolerance,
  weight,
});

export const ARCHETYPES: readonly ArchetypeDefinition[] = [
  {
    id: "creative_creator",
    labelKey: "archetype.creative_creator",
    signature: [
      b("creative_originality", 88, 10, 1.3),
      b("aesthetic_sensitivity", 84, 12, 1.1),
      b("deep_focus", 80, 14, 1.0),
      b("perfectionism", 78, 16, 0.9),
      b("independent_thinking", 80, 14, 1.0),
      b("persistence", 82, 13, 1.0),
      b("experimentation", 74, 16, 0.8),
    ],
  },
  {
    id: "scientific_explorer",
    labelKey: "archetype.scientific_explorer",
    signature: [
      b("curiosity", 92, 8, 1.3),
      b("analytical_rigor", 86, 11, 1.2),
      b("systems_abstraction", 82, 13, 1.1),
      b("persistence", 85, 11, 1.1),
      b("ambiguity_tolerance", 76, 15, 0.9),
      b("deep_focus", 84, 12, 1.0),
      b("mastery_orientation", 84, 12, 0.9),
    ],
  },
  {
    id: "entrepreneurial_builder",
    signature: [
      b("risk_tolerance", 82, 13, 1.2),
      b("decisiveness", 80, 13, 1.0),
      b("execution_speed", 80, 14, 1.1),
      b("persuasiveness", 76, 15, 1.0),
      b("leadership_drive", 78, 15, 1.0),
      b("adaptability", 78, 14, 0.9),
      b("achievement_drive", 84, 12, 1.0),
      b("ambiguity_tolerance", 78, 14, 0.9),
    ],
    labelKey: "archetype.entrepreneurial_builder",
  },
  {
    id: "technical_innovator",
    labelKey: "archetype.technical_innovator",
    signature: [
      b("systems_abstraction", 88, 10, 1.3),
      b("analytical_rigor", 82, 13, 1.1),
      b("experimentation", 84, 12, 1.1),
      b("deep_focus", 86, 11, 1.1),
      b("curiosity", 84, 12, 1.0),
      b("detail_orientation", 76, 16, 0.8),
      b("autonomy_need", 74, 17, 0.7),
    ],
  },
  {
    id: "organizational_leader",
    labelKey: "archetype.organizational_leader",
    signature: [
      b("leadership_drive", 88, 9, 1.3),
      b("decisiveness", 84, 12, 1.1),
      b("persuasiveness", 82, 13, 1.1),
      b("social_assertiveness", 80, 14, 1.0),
      b("conflict_tolerance", 76, 16, 0.9),
      b("planning_orientation", 76, 15, 0.9),
      b("impact_motivation", 82, 13, 1.0),
    ],
  },
  {
    id: "independent_creator",
    labelKey: "archetype.independent_creator",
    signature: [
      b("autonomy_need", 88, 10, 1.3),
      b("independent_thinking", 88, 10, 1.2),
      b("creative_originality", 82, 13, 1.1),
      b("deep_focus", 84, 12, 1.0),
      b("discipline", 80, 14, 1.0),
      // Characteristically LOW: wanting to direct others is not part of this pattern.
      b("leadership_drive", 35, 20, 0.8),
      b("collaboration", 42, 20, 0.7),
    ],
  },
  {
    id: "competitive_performer",
    labelKey: "archetype.competitive_performer",
    signature: [
      b("competitiveness", 90, 9, 1.3),
      b("discipline", 90, 8, 1.3),
      b("persistence", 88, 10, 1.2),
      b("mastery_orientation", 86, 11, 1.1),
      b("achievement_drive", 88, 10, 1.1),
      b("deep_focus", 80, 14, 0.9),
      b("conflict_tolerance", 70, 18, 0.7),
    ],
  },
  {
    id: "scholarly_specialist",
    labelKey: "archetype.scholarly_specialist",
    signature: [
      b("mastery_orientation", 90, 8, 1.3),
      b("deep_focus", 90, 8, 1.3),
      b("detail_orientation", 84, 12, 1.1),
      b("analytical_rigor", 86, 11, 1.1),
      b("discipline", 86, 11, 1.1),
      b("persistence", 86, 11, 1.0),
      // Characteristically LOW: breadth is not the mechanism here.
      b("cross_domain_range", 38, 20, 0.7),
    ],
  },
  {
    id: "cross_disciplinary_generalist",
    labelKey: "archetype.cross_disciplinary_generalist",
    signature: [
      b("cross_domain_range", 92, 8, 1.4),
      b("curiosity", 90, 9, 1.3),
      b("adaptability", 82, 13, 1.0),
      b("creative_originality", 80, 14, 1.0),
      b("systems_abstraction", 80, 14, 1.0),
      b("experimentation", 80, 14, 0.9),
      b("ambiguity_tolerance", 78, 15, 0.8),
    ],
  },
  {
    id: "social_influencer",
    labelKey: "archetype.social_influencer",
    signature: [
      b("persuasiveness", 90, 9, 1.3),
      b("social_assertiveness", 86, 11, 1.2),
      b("impact_motivation", 88, 10, 1.2),
      b("collaboration", 76, 16, 0.9),
      b("adaptability", 78, 15, 0.9),
      b("conflict_tolerance", 74, 17, 0.8),
      b("persistence", 80, 14, 0.9),
    ],
  },
];

export const ARCHETYPE_BY_ID: Readonly<Record<ArchetypeId, ArchetypeDefinition>> = Object.freeze(
  Object.fromEntries(ARCHETYPES.map((a) => [a.id, a])) as Record<ArchetypeId, ArchetypeDefinition>,
);

/**
 * Blends the hand-specified prior targets with the observed means of dataset
 * people assigned to each archetype. Pure: same people in, same centroids out.
 */
export function deriveArchetypeCentroids(
  people: readonly Person[],
  k: number = SHRINKAGE_K,
): Record<ArchetypeId, ArchetypeDefinition> {
  const result = {} as Record<ArchetypeId, ArchetypeDefinition>;

  for (const archetype of ARCHETYPES) {
    const members = people.filter(
      (p) => p.isMatchEligible && p.archetypeIds.includes(archetype.id),
    );

    const signature = archetype.signature.map((band) => {
      const observed: number[] = [];
      for (const person of members) {
        const attr = person.attributes.find((a) => a.attributeId === band.attributeId);
        // Low-confidence person scores should not drag a centroid around.
        if (attr && attr.confidence >= 0.5) observed.push(attr.score);
      }
      if (observed.length === 0) return band;
      const n = observed.length;
      const mean = observed.reduce((s, v) => s + v, 0) / n;
      return { ...band, target: (n * mean + k * band.target) / (n + k) };
    });

    result[archetype.id] = { ...archetype, signature };
  }
  return result;
}
