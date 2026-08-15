"use client";

import { useMemo, useState } from "react";
import type { Era, Locale } from "@core/types";
import { personDisplayName, t, type MessageKey } from "@core/i18n/index";
// Compact, client-safe projection of SEED_PEOPLE — never the full dataset
// (sources, doNotCopyKeys, explanation keys, ...) in this client bundle.
// See src/core/people/personIndex.ts for the full architectural reasoning.
import { PEOPLE_INDEX } from "@data/people/peopleIndex.generated";
import { expandPeopleIndex } from "@core/people/personIndex";
import {
  availableFilterOptions,
  explorePeople,
  type PeopleFilter,
  type PeopleSortKey,
} from "@core/people/explorer";
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

/**
 * POST-10D STAGE A: extracted from `page.tsx` unchanged (interactive
 * search/filter/sort state can't live in a Server Component) so `page.tsx`
 * can become a thin Server Component that owns `generateMetadata` —
 * `export const metadata`/`generateMetadata` are only legal in Server
 * Components, which a `"use client"` page structurally can never be. `locale`
 * is now a prop instead of `useParams()`, since the server parent already
 * resolves and validates it. No UI, behavior, or route-shape change.
 */
export function PeopleDirectoryClient({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");
  const [era, setEra] = useState<string>(ALL_VALUE);
  const [region, setRegion] = useState<string>(ALL_VALUE);
  const [sort, setSort] = useState<PeopleSortKey>("name_asc");

  // Expands the compact, tuple-encoded PEOPLE_INDEX (small on the wire) back
  // into the object-shaped attributes explorer.ts's existing, already-tested
  // logic expects — once per mount, never per keystroke. See
  // src/core/people/personIndex.ts's doc comment for the full reasoning.
  const people = useMemo(() => expandPeopleIndex(PEOPLE_INDEX), []);

  const options = useMemo(() => availableFilterOptions(people), [people]);

  const filter: PeopleFilter = useMemo(
    () => ({
      ...(era !== ALL_VALUE ? { eras: [era as Era] } : {}),
      ...(region !== ALL_VALUE ? { regionCodes: [region] } : {}),
    }),
    [era, region],
  );

  const results = useMemo(
    () => explorePeople(people, { query, filter, sort }),
    [people, query, filter, sort],
  );

  return (
    <main className="tgi-container" style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
      <Stack gap={7}>
        <Stack gap={3}>
          <Eyebrow>The Great Inside</Eyebrow>
          <Heading level={1}>{t(locale, "people.directory.title")}</Heading>
          <Text tone="secondary">{t(locale, "people.directory.intro")}</Text>
        </Stack>

        <Stack gap={4}>
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
                ...options.regionCodes.map((r) => ({ value: r, label: humanize(r) })),
              ]}
            />
            <Select
              value={sort}
              onChange={setSort}
              ariaLabel={t(locale, "people.directory.sort_label")}
              options={SORT_KEYS.map((key) => ({ value: key, label: t(locale, `sort.${key}` as MessageKey) }))}
            />
          </Cluster>
          <Text tone="muted">{t(locale, "people.directory.count", { count: results.length })}</Text>
        </Stack>

        <VisuallyHidden>
          <Heading level={2}>{t(locale, "people.directory.results_heading")}</Heading>
        </VisuallyHidden>

        {results.length === 0 ? (
          <Text tone="muted">{t(locale, "people.directory.empty")}</Text>
        ) : (
          <Grid min="14rem">
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

function humanize(id: string): string {
  return id.replace(/_/g, " ");
}
