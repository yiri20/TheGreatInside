/**
 * SYNTHETIC `ResultSnapshotV1` FIXTURES — Phase 10D-3 follow-up (Saved
 * Result historical parity).
 *
 * Every value below is HANDCRAFTED, never derived from a real user's quiz
 * responses and never read from Supabase — the whole point is to exercise
 * `SavedResultView`'s rendering branches (and, transitively, prove it never
 * needs a live DB row) with plain, inspectable data. Same "synthetic,
 * documented, never committed as real user data" discipline
 * `e2e/results.visual.spec.ts`'s own `FIXTURES` comment already established
 * for Live Results' token fixtures.
 *
 * Five named fixtures cover the six conditions the follow-up brief asked
 * for, with deliberate overlap — the same efficient pattern
 * `results.visual.spec.ts` itself uses (one baseline fixture covers several
 * "present" conditions at once; only genuinely divergent branches get their
 * own dedicated fixture):
 *
 *   - `normal`            — baseline: closest + signature + dual-edged +
 *                            category matches + You Both + Where You Differ
 *                            all PRESENT, Advantage ABSENT. Covers checklist
 *                            items 1 ("normal snapshot"), 2 ("Dual-Edged
 *                            present"), and 5 ("Advantage absent").
 *   - `dualEdgedAbsent`   — identical to `normal` except `greatness.
 *                            dualEdged` is `undefined`. Covers item 3.
 *   - `advantagePresent`  — identical to `normal` except `comparison.
 *                            advantage` is non-empty. Covers item 4.
 *   - `removedClosestPerson` — `closest.personId` and one category-match
 *                            `personId` reference ids that do NOT exist in
 *                            the live `SEED_PEOPLE` roster, exercising the
 *                            `personNames` frozen-fallback path (a future
 *                            `inclusion_v1`-style removal). Covers item 6.
 *   - `minimal`           — no signature, no dual-edged, no category
 *                            matches, no closest match at all (comparison
 *                            section therefore also absent). Not explicitly
 *                            requested, but cheap and valuable: proves every
 *                            section's `? … : null` absent-branch renders
 *                            cleanly with almost nothing present, and that
 *                            no section leaves stray empty chrome behind.
 *
 * Real `AttributeId`s and real `SEED_PEOPLE` ids are used throughout (except
 * `removedClosestPerson`'s deliberately-fake ids) so `attrLabel`/
 * `resolvePerson` exercise their normal, non-fallback paths in every other
 * fixture — only `removedClosestPerson` is meant to hit the fallback.
 */
import { ATTRIBUTE_IDS, type AttributeId } from "../core/attributes/attributes.js";
import { RESULT_SNAPSHOT_SCHEMA_VERSION, type ResultSnapshotV1 } from "../core/results/snapshot.js";

/** Deterministic, varied score/confidence/z per attribute — not meant to be
 *  psychometrically meaningful, just spread out enough to produce a
 *  realistic-looking, differently-sorted Trait Profile breakdown. */
function baseTraits(): ResultSnapshotV1["traits"] {
  const traits: ResultSnapshotV1["traits"] = {};
  ATTRIBUTE_IDS.forEach((id, i) => {
    const score = 35 + ((i * 13) % 55); // spread across ~35-90
    const confidence = 0.4 + ((i * 7) % 6) / 10; // spread across 0.4-0.9
    const z = (score - 50) / 17;
    traits[id] = { score, confidence, z };
  });
  return traits;
}

function comparisonPair(attributeId: AttributeId, userScore: number, personScore: number) {
  return { attributeId, userScore, personScore };
}

const CLOSEST_PERSON_ID = "p_benjamin_franklin";
const CATEGORY_MATCH_PEOPLE: Record<string, string> = {
  thinking: "p_richard_feynman",
  creativity: "p_leonardo_da_vinci",
  work_style: "p_marie_curie",
  resilience: "p_alan_turing",
  social: "p_nelson_mandela",
  motivation: "p_warren_buffett",
  world_sense: "p_rosalind_franklin",
};

function categoryMatches(): ResultSnapshotV1["categoryMatches"] {
  return Object.entries(CATEGORY_MATCH_PEOPLE).map(([facet, personId], i) => ({
    facet,
    personId,
    match: 55 + i * 4,
  }));
}

const HIGHLIGHT_IDS: AttributeId[] = [
  "deep_focus",
  "curiosity",
  "risk_tolerance",
  "cross_domain_range",
  "persistence",
  "systems_abstraction",
];

const normalTraits = baseTraits();

const normal: ResultSnapshotV1 = {
  snapshotSchemaVersion: RESULT_SNAPSHOT_SCHEMA_VERSION,
  traits: normalTraits,
  highlights: HIGHLIGHT_IDS,
  signature: { attributeId: "deep_focus", score: normalTraits.deep_focus!.score, confidence: normalTraits.deep_focus!.confidence },
  greatness: {
    score: 68,
    rawScore: 0.61,
    bandId: "strong_pattern",
    components: { archetypeAffinity: 0.6, distinctiveness: 0.55, coherence: 0.7, engineTraits: 0.5 },
    primaryArchetypeId: "scientific_explorer",
    secondaryArchetypeId: "scholarly_specialist",
    dualEdged: { attributeId: "risk_tolerance", score: normalTraits.risk_tolerance!.score },
  },
  resultArchetype: "strong_match",
  closest: {
    personId: CLOSEST_PERSON_ID,
    overallMatch: 74,
    explanationTrait: comparisonPair("curiosity", 88, 91),
  },
  comparison: {
    closestTraits: [
      comparisonPair("curiosity", 88, 91),
      comparisonPair("deep_focus", 82, 79),
      comparisonPair("persistence", 70, 74),
      comparisonPair("systems_abstraction", 65, 68),
    ],
    userHigherTraits: [comparisonPair("risk_tolerance", 80, 40), comparisonPair("experimentation", 75, 45)],
    personHigherTraits: [comparisonPair("discipline", 45, 85), comparisonPair("planning_orientation", 40, 82)],
    advantage: [],
  },
  categoryMatches: categoryMatches(),
  personNames: { [CLOSEST_PERSON_ID]: "Benjamin Franklin", ...Object.fromEntries(Object.values(CATEGORY_MATCH_PEOPLE).map((id) => [id, id])) },
};

const dualEdgedAbsent: ResultSnapshotV1 = {
  ...normal,
  greatness: { ...normal.greatness, dualEdged: undefined },
};

const advantagePresent: ResultSnapshotV1 = {
  ...normal,
  comparison: {
    ...normal.comparison,
    advantage: [comparisonPair("aesthetic_sensitivity", 85, 55), comparisonPair("adaptability", 78, 50)],
  },
};

const REMOVED_PERSON_ID = "p_test_fixture_removed_person";
const removedClosestPerson: ResultSnapshotV1 = {
  ...normal,
  closest: {
    personId: REMOVED_PERSON_ID,
    overallMatch: 61,
    explanationTrait: comparisonPair("curiosity", 88, 70),
  },
  categoryMatches: [...categoryMatches().slice(0, 6), { facet: "world_sense", personId: REMOVED_PERSON_ID, match: 61 }],
  personNames: { ...normal.personNames, [REMOVED_PERSON_ID]: "A Removed Test Fixture Person" },
};

const minimal: ResultSnapshotV1 = {
  snapshotSchemaVersion: RESULT_SNAPSHOT_SCHEMA_VERSION,
  traits: normalTraits,
  highlights: [],
  signature: undefined,
  greatness: {
    score: 22,
    rawScore: 0.12,
    bandId: "uncommon_alignment",
    components: { archetypeAffinity: 0.2, distinctiveness: 0.3, coherence: 0.4, engineTraits: 0.2 },
    primaryArchetypeId: "independent_creator",
    secondaryArchetypeId: undefined,
    dualEdged: undefined,
  },
  resultArchetype: undefined,
  closest: undefined,
  comparison: { closestTraits: [], userHigherTraits: [], personHigherTraits: [], advantage: [] },
  categoryMatches: [],
  personNames: {},
};

export const SAVED_RESULT_FIXTURES = {
  normal,
  dualEdgedAbsent,
  advantagePresent,
  removedClosestPerson,
  minimal,
} as const satisfies Record<string, ResultSnapshotV1>;

export type SavedResultFixtureName = keyof typeof SAVED_RESULT_FIXTURES;
