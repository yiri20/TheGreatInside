/**
 * DEVELOPMENT GUIDES — development_v1
 *
 * Guides belong to ATTRIBUTES, not to celebrities. A comparison selects guides
 * by numeric gap, which keeps the advice consistent no matter which person the
 * user compared against, and avoids implying "become more like this person".
 *
 * Every band has content, including the high band — and high-band content is
 * deliberately NOT "get even more of this". That is the mechanism enforcing
 * "higher is not automatically better" at the advice layer.
 *
 * Suggestions are framed as experiments to try, never as fixes for defects.
 *
 * SCOPE: Phase 0 authored 10 of 30 attributes, chosen to cover every
 * contribution shape and the traits the seed comparisons surfaced most
 * often. Phase 7 (first pass) completed the remaining 20 of the original
 * `taxonomy_v1` 30. Phase 6.6 (`taxonomy_v1.1`) then added 4 new
 * attributes (`opportunity_sensing`, `resourcefulness`, `proactive_agency`,
 * `belief_updating`) with no content yet — deliberately deferred at Stage 9
 * rather than authored mid-migration (see that stage's compatibility
 * repair, below). **Phase 7 Stage 7C authored all 4** — `DEVELOPMENT_GUIDES`
 * now covers the full live `ATTRIBUTE_IDS` (34), same low/medium/high
 * schema and "high band is never just 'get more of this'" discipline as
 * the original 30. `missingDevelopmentGuides()` is kept as a live
 * regression guard so a future attribute added to the taxonomy without
 * matching guide content is caught immediately instead of silently falling
 * back to "no guide".
 *
 * Phase 6.6 Stage 9 history, kept for the record: `DEVELOPMENT_GUIDES` was
 * temporarily built from `AUTHORED_ATTRIBUTE_IDS` (the original 30 only),
 * NOT the live `ATTRIBUTE_IDS` (34) — building it from the full taxonomy
 * before content existed would have auto-generated a structurally-valid-
 * looking guide whose i18n keys (`dev.belief_updating.low.exp.1` etc.)
 * didn't actually exist, defeating the `if (!entry) continue` guard in
 * `selectLearnFromSuggestions` (targetComparison.ts) and crashing `t()` at
 * render time for any new attribute with a `HELPS_WHEN_HIGHER_SHAPES`-
 * qualifying shape (`belief_updating`, shape `balanced`) — confirmed by
 * direct reproduction during that stage's compatibility audit, not a
 * hypothetical. That temporary gate is now removed: all 34 attributes have
 * real content, so `DEVELOPMENT_GUIDES` is built from `ATTRIBUTE_IDS`
 * directly again.
 */

import { ATTRIBUTE_IDS, type AttributeId } from "../attributes/attributes.js";

export const DEVELOPMENT_VERSION = "development_v1";

export type ScoreBand = "low" | "medium" | "high";

export interface BandGuide {
  /** Localisation keys resolved at render time. */
  experimentKeys: string[];
  cautionKeys: string[];
}

export interface AttributeDevelopmentGuide {
  attributeId: AttributeId;
  low: BandGuide;
  medium: BandGuide;
  high: BandGuide;
}

export const BAND_BOUNDARIES = { lowMax: 39, mediumMax: 69 } as const;

export function bandForScore(score: number): ScoreBand {
  if (score <= BAND_BOUNDARIES.lowMax) return "low";
  if (score <= BAND_BOUNDARIES.mediumMax) return "medium";
  return "high";
}

const g = (
  attributeId: AttributeId,
  low: [string[], string[]],
  medium: [string[], string[]],
  high: [string[], string[]],
): AttributeDevelopmentGuide => ({
  attributeId,
  low: { experimentKeys: low[0], cautionKeys: low[1] },
  medium: { experimentKeys: medium[0], cautionKeys: medium[1] },
  high: { experimentKeys: high[0], cautionKeys: high[1] },
});

const k = (attributeId: string, band: string, kind: string, n: number) =>
  `dev.${attributeId}.${band}.${kind}.${n}`;

const guide = (attributeId: AttributeId): AttributeDevelopmentGuide =>
  g(
    attributeId,
    [[k(attributeId, "low", "exp", 1), k(attributeId, "low", "exp", 2)], [k(attributeId, "low", "caution", 1)]],
    [[k(attributeId, "medium", "exp", 1), k(attributeId, "medium", "exp", 2)], [k(attributeId, "medium", "caution", 1)]],
    [[k(attributeId, "high", "exp", 1), k(attributeId, "high", "exp", 2)], [k(attributeId, "high", "caution", 1)]],
  );

export const DEVELOPMENT_GUIDES: readonly AttributeDevelopmentGuide[] = ATTRIBUTE_IDS.map((id) => guide(id));

const GUIDES_BY_ID = new Map(DEVELOPMENT_GUIDES.map((x) => [x.attributeId, x]));

export function developmentGuide(attributeId: AttributeId): AttributeDevelopmentGuide | undefined {
  return GUIDES_BY_ID.get(attributeId);
}

export function missingDevelopmentGuides(): AttributeId[] {
  return ATTRIBUTE_IDS.filter((id) => !GUIDES_BY_ID.has(id));
}

export interface SelectedGuide {
  attributeId: AttributeId;
  band: ScoreBand;
  guide: BandGuide;
}

/**
 * Selects guides from the user's own score band. Note it keys off the USER's
 * score, not the gap to the person: the advice is about where the user is, not
 * about closing a distance to someone else's profile.
 */
export function selectDevelopmentGuides(
  userScores: Readonly<Partial<Record<AttributeId, number>>>,
  attributeIds: readonly AttributeId[],
  limit = 3,
): SelectedGuide[] {
  const out: SelectedGuide[] = [];
  for (const attributeId of attributeIds) {
    const entry = GUIDES_BY_ID.get(attributeId);
    const score = userScores[attributeId];
    if (!entry || score === undefined) continue;
    const band = bandForScore(score);
    out.push({ attributeId, band, guide: entry[band] });
    if (out.length >= limit) break;
  }
  return out;
}
