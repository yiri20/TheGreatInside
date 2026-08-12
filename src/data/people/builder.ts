/**
 * Shared profile builder for the seed dataset.
 *
 * Profiles are authored in a compact tuple form so a reviewer can scan a whole
 * person in one screen and see the SHAPE of the profile rather than 30 screens
 * of object literals. Shape is what the matching engine actually compares.
 *
 *   [score, confidence, evidenceType, impact]
 *
 * SCORING DISCIPLINE (applies to every roster file)
 * - Scores are inferred from documented biographical accounts. They are not
 *   psychological assessments; `confidence` + `evidenceType` say so per trait.
 * - `impact` is always PERSON x ATTRIBUTE x CONTEXT. A LOW score can be an
 *   advantage — Buffett's low risk tolerance is marked `advantage` because in
 *   value investing it was one. Never give an attribute a global colour.
 * - Living people: only tendencies published accounts describe directly. No
 *   inference about health, relationships, orientation, or clinical labels.
 * - Metadata exists for filtering and for the Unexpected Match selector. It
 *   NEVER enters similarity.
 */

import type {
  EvidenceType,
  Person,
  PersonAttribute,
  PersonExternalIdentity,
  PersonPortrait,
  PersonSource,
  TraitImpact,
} from "../../core/types.js";
import type { AttributeId } from "../../core/attributes/attributes.js";
import { evaluateMatchEligibility } from "../../core/matching/similarity.js";

export type Ev = "d" | "s" | "i";
export type Im = "A" | "D" | "R" | "N";
/** [score, confidence, evidenceType, impact] */
export type Row = [number, number, Ev, Im];

const EVIDENCE: Record<Ev, EvidenceType> = {
  d: "documented",
  s: "strong_inference",
  i: "inference",
};

const IMPACT: Record<Im, TraitImpact> = {
  A: "advantage",
  D: "dual_edged",
  R: "risk",
  N: "neutral",
};

export interface PersonSeed {
  id: string;
  slug: string;
  canonicalName: string;
  /** Alternate names/spellings/native-script forms. Optional at authoring
   *  time — most people don't need one, so it isn't required busywork. */
  aliases?: string[];
  birthYear: number;
  deathYear?: number;
  isLiving: boolean;
  era: Person["era"];
  nationalityCodes: string[];
  regionCode: string;
  /** See `Person.historicalPolityKey` — set only when nationalityCodes would
   *  otherwise be anachronistic (a modern country that didn't exist yet). */
  historicalPolityKey?: string;
  occupationIds: string[];
  fieldIds: string[];
  impactDomains: Person["impactDomains"];
  tagIds: string[];
  archetypeIds: string[];
  sources: PersonSource[];
  doNotCopyKeys?: string[];
  externalIdentity?: PersonExternalIdentity;
  portrait?: PersonPortrait;
  rows: Partial<Record<AttributeId, Row>>;
}

export function build(seed: PersonSeed): Person {
  const attributes: PersonAttribute[] = (
    Object.entries(seed.rows) as Array<[AttributeId, Row]>
  ).map(([attributeId, [score, confidence, ev, im]]) => ({
    attributeId,
    score,
    confidence,
    evidenceType: EVIDENCE[ev],
    impact: IMPACT[im],
    sourceIds: seed.sources.map((s) => s.id),
  }));

  const overallProfileConfidence =
    attributes.reduce((s, a) => s + a.confidence, 0) / Math.max(1, attributes.length);

  const person: Person = {
    id: seed.id,
    slug: seed.slug,
    canonicalName: seed.canonicalName,
    aliases: seed.aliases ?? [],
    birthYear: seed.birthYear,
    ...(seed.deathYear !== undefined ? { deathYear: seed.deathYear } : {}),
    isLiving: seed.isLiving,
    era: seed.era,
    nationalityCodes: seed.nationalityCodes,
    regionCode: seed.regionCode,
    ...(seed.historicalPolityKey !== undefined
      ? { historicalPolityKey: seed.historicalPolityKey }
      : {}),
    occupationIds: seed.occupationIds,
    fieldIds: seed.fieldIds,
    impactDomains: seed.impactDomains,
    tagIds: seed.tagIds,
    archetypeIds: seed.archetypeIds,
    attributes,
    status: "published",
    isMatchEligible: false,
    overallProfileConfidence,
    sources: seed.sources,
    doNotCopyKeys: seed.doNotCopyKeys ?? [],
    ...(seed.externalIdentity !== undefined ? { externalIdentity: seed.externalIdentity } : {}),
    ...(seed.portrait !== undefined ? { portrait: seed.portrait } : {}),
  };

  // Eligibility is computed, never hand-set — an under-evidenced profile must
  // not be able to opt itself into matching.
  person.isMatchEligible = evaluateMatchEligibility(person).eligible;
  return person;
}

export const wiki = (id: string, title: string): PersonSource => ({
  id: `src_${id}_wikipedia`,
  kind: "wikipedia",
  title,
  url: `https://en.wikipedia.org/wiki/${title.replace(/ /g, "_")}`,
});

export const bio = (id: string, title: string): PersonSource => ({
  id: `src_${id}_biography`,
  kind: "biography",
  title,
});
