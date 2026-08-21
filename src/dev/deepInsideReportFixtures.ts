/**
 * Synthetic `DeepInsideReportV1` fixtures — Monetization v1. Handcrafted,
 * never a real user's data, same discipline as `savedResultFixtures.ts`.
 * Person ids are drawn from the real `SEED_PEOPLE` roster (so
 * `DeepInsideReportView`'s live-person resolution path is exercised for
 * real), plus one deliberately-unknown id to exercise the frozen-
 * `personNames`-fallback path a future roster removal would hit.
 */
import { CURRENT_VERSIONS } from "../core/versions.js";
import type { DeepInsideReportV1 } from "../core/monetization/deepInsideSnapshot.js";
import { DEEP_INSIDE_REPORT_SCHEMA_VERSION } from "../core/monetization/deepInsideSnapshot.js";

const GENERATED_AT = "2026-08-21T00:00:00.000Z";

const normal: DeepInsideReportV1 = {
  schemaVersion: DEEP_INSIDE_REPORT_SCHEMA_VERSION,
  versions: CURRENT_VERSIONS,
  generatedAt: GENERATED_AT,
  whyMatchesFit: [
    {
      personId: "p_leonardo_da_vinci",
      rank: 1,
      overallMatch: 88,
      alignedTraits: [
        { attributeId: "curiosity", userScore: 92, personScore: 95 },
        { attributeId: "cross_domain_range", userScore: 85, personScore: 88 },
      ],
      differingTraits: [{ attributeId: "collaboration", userScore: 70, personScore: 40 }],
    },
    {
      personId: "p_marie_curie",
      rank: 2,
      overallMatch: 79,
      alignedTraits: [{ attributeId: "discipline", userScore: 90, personScore: 92 }],
      differingTraits: [{ attributeId: "risk_tolerance", userScore: 60, personScore: 85 }],
    },
    {
      personId: "p_richard_feynman",
      rank: 3,
      overallMatch: 74,
      alignedTraits: [{ attributeId: "curiosity", userScore: 92, personScore: 90 }],
      differingTraits: [{ attributeId: "social_assertiveness", userScore: 40, personScore: 80 }],
    },
  ],
  historicalCircle: [
    { personId: "p_leonardo_da_vinci", rank: 1, overallMatch: 88 },
    { personId: "p_marie_curie", rank: 2, overallMatch: 79 },
    { personId: "p_richard_feynman", rank: 3, overallMatch: 74 },
    { personId: "p_ada_lovelace", rank: 4, overallMatch: 71 },
  ],
  signatureCombination: [
    { kind: "combination", attributeIds: ["curiosity", "cross_domain_range"], userScores: [92, 85] },
    { kind: "tension", attributeIds: ["perfectionism", "execution_speed"], userScores: [80, 82] },
  ],
  counterpart: {
    personId: "p_genghis_khan",
    overallMatch: 22,
    differingTraits: [{ attributeId: "conflict_tolerance", userScore: 45, personScore: 95 }],
    sharedTraits: [{ attributeId: "leadership_drive", userScore: 60, personScore: 65 }],
  },
  strengthsTradeoffs: [
    { attributeId: "curiosity", score: 92, band: "high" },
    { attributeId: "cross_domain_range", score: 85, band: "high" },
  ],
  personNames: {
    p_leonardo_da_vinci: "Leonardo da Vinci",
    p_marie_curie: "Marie Curie",
    p_richard_feynman: "Richard Feynman",
    p_ada_lovelace: "Ada Lovelace",
    p_genghis_khan: "Genghis Khan",
  },
};

/** No signature combination and no counterpart — the "narrow the section
 *  rather than inventing" absent-branch case. */
const minimal: DeepInsideReportV1 = {
  ...normal,
  signatureCombination: [],
  counterpart: undefined,
  strengthsTradeoffs: [],
};

/** A person referenced in the report no longer resolves against the live
 *  roster — exercises the frozen-`personNames`-fallback path. */
const removedPerson: DeepInsideReportV1 = {
  ...normal,
  whyMatchesFit: [
    {
      personId: "p_someone_removed",
      rank: 1,
      overallMatch: 80,
      alignedTraits: [{ attributeId: "curiosity", userScore: 90, personScore: 88 }],
      differingTraits: [],
    },
  ],
  historicalCircle: [{ personId: "p_someone_removed", rank: 1, overallMatch: 80 }],
  personNames: { p_someone_removed: "A Since-Removed Person" },
};

export const DEEP_INSIDE_REPORT_FIXTURES = { normal, minimal, removedPerson };
