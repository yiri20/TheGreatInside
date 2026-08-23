"use client";

import { useMemo, useState } from "react";
import { ATTRIBUTES, type AttributeId } from "@core/attributes/attributes";
import type { Era, Locale } from "@core/types";
import { personDisplayName, t, type MessageKey } from "@core/i18n/index";
// Compact, client-safe projection of SEED_PEOPLE — never the full dataset
// (sources, doNotCopyKeys, explanation keys, ...) in this client bundle.
// See src/core/people/personIndex.ts for the full architectural reasoning.
import { PEOPLE_INDEX } from "@data/people/peopleIndex.generated";
import { expandPeopleIndex } from "@core/people/personIndex";
import { availableFilterOptions, explorePeople, type PeopleFilter, type PeopleSortKey } from "@core/people/explorer";
import {
  DIRECTORY_TRAIT_MIN_CONFIDENCE,
  DIRECTORY_TRAIT_MIN_Z,
  PERSONALITY_TAXONOMY,
  PROFESSION_CATEGORIES,
} from "@core/people/directoryTaxonomy";
import {
  Cluster,
  Eyebrow,
  formatLifespan,
  Grid,
  Heading,
  PersonCard,
  Select,
  Stack,
  Text,
  TextField,
  VisuallyHidden,
} from "@ui/index";

const SORT_KEYS: readonly PeopleSortKey[] = [
  "name_asc",
  "name_desc",
  "birth_year_asc",
  "birth_year_desc",
  "confidence_desc",
];

const ALL_VALUE = "";

/** One entry per selected taxonomy chip, for the selected-filter summary
 *  row (Part G) — carries enough to render a label and to remove itself. */
interface SelectedChip {
  key: string;
  labelKey: MessageKey;
  onRemove: () => void;
}

/**
 * POST-10D STAGE A: extracted from `page.tsx` unchanged (interactive
 * search/filter/sort state can't live in a Server Component) so `page.tsx`
 * can become a thin Server Component that owns `generateMetadata` —
 * `export const metadata`/`generateMetadata` are only legal in Server
 * Components, which a `"use client"` page structurally can never be. `locale`
 * is now a prop instead of `useParams()`, since the server parent already
 * resolves and validates it. No UI, behavior, or route-shape change.
 *
 * DIRECTORY TAXONOMY REDESIGN (2026-08, `directory_taxonomy_v1`): the old
 * single flat `tagIds` checklist (hidden in a `<details>` dropdown) is
 * replaced by two always-visible sections driven by
 * `src/core/people/directoryTaxonomy.ts` — Profession/Activity (grouped
 * `fieldIds`) and Personality/Trait (grouped canonical attributes). See
 * that module's doc comment for the full derivation rationale. `tagIds`
 * itself is untouched and still powers search.
 */
export function PeopleDirectoryClient({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const [era, setEra] = useState<string>(ALL_VALUE);
  const [region, setRegion] = useState<string>(ALL_VALUE);
  const [sort, setSort] = useState<PeopleSortKey>("name_asc");
  const [fieldIds, setFieldIds] = useState<readonly string[]>([]);
  const [traitIds, setTraitIds] = useState<readonly AttributeId[]>([]);

  // Expands the compact, tuple-encoded PEOPLE_INDEX (small on the wire) back
  // into the object-shaped attributes explorer.ts's existing, already-tested
  // logic expects — once per mount, never per keystroke. See
  // src/core/people/personIndex.ts's doc comment for the full reasoning.
  const people = useMemo(() => expandPeopleIndex(PEOPLE_INDEX), []);

  const options = useMemo(() => availableFilterOptions(people), [people]);

  // Selected personality chips OR within the facet they belong to, AND
  // across different facets: partition the flat selection by
  // ATTRIBUTES[id].facet (the canonical facet assignment — not a second,
  // directory-specific grouping) into one traitScoreGroups entry per
  // facet that has >=1 selection. A single-facet selection reproduces
  // plain OR; multiple facets is what makes it AND across them.
  const traitScoreGroups = useMemo(() => {
    if (traitIds.length === 0) return [];
    const byFacet = new Map<string, AttributeId[]>();
    for (const id of traitIds) {
      const facet = ATTRIBUTES[id].facet;
      const group = byFacet.get(facet);
      if (group) group.push(id);
      else byFacet.set(facet, [id]);
    }
    return [...byFacet.values()].map((attributeIds) => ({
      attributeIds,
      minZ: DIRECTORY_TRAIT_MIN_Z,
      minConfidence: DIRECTORY_TRAIT_MIN_CONFIDENCE,
    }));
  }, [traitIds]);

  const filter: PeopleFilter = useMemo(
    () => ({
      ...(era !== ALL_VALUE ? { eras: [era as Era] } : {}),
      ...(region !== ALL_VALUE ? { regionCodes: [region] } : {}),
      ...(fieldIds.length > 0 ? { fieldIds } : {}),
      ...(traitScoreGroups.length > 0 ? { traitScoreGroups } : {}),
    }),
    [era, region, fieldIds, traitScoreGroups],
  );

  const results = useMemo(() => explorePeople(people, { query, filter, sort }), [people, query, filter, sort]);

  const isFiltered =
    query.trim() !== "" || era !== ALL_VALUE || region !== ALL_VALUE || fieldIds.length > 0 || traitIds.length > 0;

  function toggleField(id: string) {
    setFieldIds((current) => (current.includes(id) ? current.filter((f) => f !== id) : [...current, id]));
  }

  function toggleTrait(id: AttributeId) {
    setTraitIds((current) => (current.includes(id) ? current.filter((t) => t !== id) : [...current, id]));
  }

  function clearAll() {
    setQuery("");
    setEra(ALL_VALUE);
    setRegion(ALL_VALUE);
    setFieldIds([]);
    setTraitIds([]);
  }

  // Only taxonomy chip selections appear in the summary row — era/region
  // already show their own state in their own <select>, and the search box
  // shows its own text; repeating them here would be redundant, not helpful.
  const selectedChips: SelectedChip[] = [
    ...fieldIds.map(
      (id): SelectedChip => ({
        key: `field-${id}`,
        labelKey: `field.${id}` as MessageKey,
        onRemove: () => toggleField(id),
      }),
    ),
    ...traitIds.map(
      (id): SelectedChip => ({
        key: `trait-${id}`,
        labelKey: `attribute.${id}` as MessageKey,
        onRemove: () => toggleTrait(id),
      }),
    ),
  ];

  const visibleFieldIds = new Set(options.fieldIds);
  const visibleAttributeIds = new Set(people.flatMap((p) => p.attributes.map((a) => a.attributeId)));

  return (
    <main className="tgi-container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
      <Stack gap={7}>
        <Stack gap={3}>
          <Eyebrow>The Great Inside</Eyebrow>
          <Heading level={1}>{t(locale, "people.directory.title")}</Heading>
          <Text tone="secondary">{t(locale, "people.directory.intro")}</Text>
        </Stack>

        <Stack gap={5}>
          <Cluster gap={3} className="tgi-filter-bar">
            <TextField
              value={query}
              onChange={setQuery}
              placeholder={t(locale, "people.directory.search_placeholder")}
              ariaLabel={t(locale, "people.directory.search_placeholder")}
              className="tgi-field--grow"
            />
            <Select
              value={era}
              onChange={setEra}
              ariaLabel={t(locale, "people.directory.era_label")}
              options={[
                { value: ALL_VALUE, label: `${t(locale, "people.directory.era_label")}: ${t(locale, "people.directory.all")}` },
                ...options.eras.map((e) => ({ value: e, label: t(locale, `era.${e}` as MessageKey) })),
              ]}
            />
            <Select
              value={region}
              onChange={setRegion}
              ariaLabel={t(locale, "people.directory.region_label")}
              options={[
                {
                  value: ALL_VALUE,
                  label: `${t(locale, "people.directory.region_label")}: ${t(locale, "people.directory.all")}`,
                },
                ...options.regionCodes.map((r) => ({ value: r, label: t(locale, `region.${r}` as MessageKey) })),
              ]}
            />
            <Select
              value={sort}
              onChange={setSort}
              ariaLabel={t(locale, "people.directory.sort_label")}
              options={SORT_KEYS.map((key) => ({ value: key, label: t(locale, `sort.${key}` as MessageKey) }))}
            />
          </Cluster>

          <div className="tgi-taxonomy-columns">
            <Stack gap={3} as="section">
              <Heading level={2} visualLevel={3}>
                {t(locale, "people.directory.section.profession")}
              </Heading>
              <div className="tgi-taxonomy-section">
                {PROFESSION_CATEGORIES.filter((category) =>
                  category.fieldIds.some((id) => visibleFieldIds.has(id)),
                ).map((category) => (
                  <div className="tgi-taxonomy-category" key={category.id}>
                    <Text tone="muted" className="tgi-taxonomy-category__heading">
                      {t(locale, category.labelKey)}
                    </Text>
                    <Cluster gap={2} className="tgi-taxonomy-chip-row">
                      {category.fieldIds
                        .filter((id) => visibleFieldIds.has(id))
                        .map((id) => {
                          const inputId = `field-filter-${id}`;
                          return (
                            <div className="tgi-taxonomy-chip" key={id}>
                              <input
                                id={inputId}
                                type="checkbox"
                                checked={fieldIds.includes(id)}
                                onChange={() => toggleField(id)}
                                className="tgi-taxonomy-chip__input"
                              />
                              <label htmlFor={inputId} className="tgi-taxonomy-chip__label">
                                <span className="tgi-taxonomy-chip__check" aria-hidden="true">
                                  ✓
                                </span>
                                <span>{t(locale, `field.${id}` as MessageKey)}</span>
                              </label>
                            </div>
                          );
                        })}
                    </Cluster>
                  </div>
                ))}
              </div>
            </Stack>

            <Stack gap={3} as="section">
              <Heading level={2} visualLevel={3}>
                {t(locale, "people.directory.section.personality")}
              </Heading>
              <div className="tgi-taxonomy-section">
                {PERSONALITY_TAXONOMY.filter((group) =>
                  group.attributeIds.some((id) => visibleAttributeIds.has(id)),
                ).map((group) => (
                  <div className="tgi-taxonomy-category" key={group.facet}>
                    <Text tone="muted" className="tgi-taxonomy-category__heading">
                      {t(locale, group.labelKey)}
                    </Text>
                    <Cluster gap={2} className="tgi-taxonomy-chip-row">
                      {group.attributeIds
                        .filter((id) => visibleAttributeIds.has(id))
                        .map((id) => {
                          const inputId = `trait-filter-${id}`;
                          return (
                            <div className="tgi-taxonomy-chip" key={id}>
                              <input
                                id={inputId}
                                type="checkbox"
                                checked={traitIds.includes(id)}
                                onChange={() => toggleTrait(id)}
                                className="tgi-taxonomy-chip__input"
                              />
                              <label htmlFor={inputId} className="tgi-taxonomy-chip__label">
                                <span className="tgi-taxonomy-chip__check" aria-hidden="true">
                                  ✓
                                </span>
                                <span>{t(locale, `attribute.${id}` as MessageKey)}</span>
                              </label>
                            </div>
                          );
                        })}
                    </Cluster>
                  </div>
                ))}
              </div>
            </Stack>
          </div>

          {selectedChips.length > 0 && (
            <Cluster gap={2} className="tgi-selected-filters">
              <Text tone="muted" className="tgi-taxonomy-category__heading">
                {t(locale, "people.directory.selected_label")}
              </Text>
              {selectedChips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  className="tgi-selected-chip"
                  onClick={chip.onRemove}
                  aria-label={t(locale, "people.directory.remove_filter", { label: t(locale, chip.labelKey) })}
                >
                  <span>{t(locale, chip.labelKey)}</span>
                  <span className="tgi-selected-chip__x" aria-hidden="true">
                    ×
                  </span>
                </button>
              ))}
              <button type="button" className="tgi-selected-clear-all" onClick={clearAll}>
                {t(locale, "people.directory.clear_all")}
              </button>
            </Cluster>
          )}

          <Text tone="muted">
            {isFiltered
              ? t(locale, "people.directory.count_filtered", { count: results.length, total: people.length })
              : t(locale, "people.directory.count", { count: results.length })}
          </Text>
        </Stack>

        <VisuallyHidden>
          <Heading level={2}>{t(locale, "people.directory.results_heading")}</Heading>
        </VisuallyHidden>

        {results.length === 0 ? (
          <Text tone="muted">{t(locale, "people.directory.empty")}</Text>
        ) : (
          <Grid min="14rem" className="tgi-results-discovery-grid">
            {results.map((person) => (
              <PersonCard
                key={person.id}
                name={personDisplayName(locale, person)}
                subtitle={[
                  person.occupationIds[0] ? t(locale, `occupation.${person.occupationIds[0]}` as MessageKey) : undefined,
                  t(locale, `era.${person.era}` as MessageKey),
                ]
                  .filter(Boolean)
                  .join(" · ")}
                lifespan={formatLifespan(person.birthYear, person.deathYear, person.isLiving)}
                href={`/${locale}/people/${person.slug}`}
                locale={locale}
                {...(person.portraitUrl ? { portraitUrl: person.portraitUrl } : {})}
              />
            ))}
          </Grid>
        )}
      </Stack>
    </main>
  );
}
