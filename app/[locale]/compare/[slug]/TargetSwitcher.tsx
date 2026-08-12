"use client";

/**
 * Switches the comparison target WITHOUT retaking the quiz — the token stays
 * in the URL, only `slug` changes. Client-side because it needs live text
 * filtering; the actual switch is a plain navigation (no state carried in
 * memory), so a refresh/bookmark of the resulting URL works exactly like any
 * other comparison link.
 */
import { useMemo, useState } from "react";
import { searchPeople } from "@core/people/explorer";
import type { Locale, Person } from "@core/types";
import { personDisplayName, t } from "@core/i18n/index";
import { Card, Stack, Text, TextField } from "@ui/index";

export function TargetSwitcher({
  locale,
  token,
  currentSlug,
  people,
}: {
  locale: Locale;
  token: string;
  currentSlug: string;
  people: readonly Person[];
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    if (query.trim() === "") return [];
    return searchPeople(people, query)
      .filter((p) => p.isMatchEligible && p.slug !== currentSlug)
      .slice(0, 6);
  }, [query, people, currentSlug]);

  return (
    <Card variant="sunken">
      <Stack gap={3}>
        <Text>
          <strong>{t(locale, "compare.switch.title")}</strong>
        </Text>
        <TextField
          value={query}
          onChange={setQuery}
          placeholder={t(locale, "compare.switch.placeholder")}
          ariaLabel={t(locale, "compare.switch.placeholder")}
        />
        {query.trim() !== "" ? (
          results.length === 0 ? (
            <Text tone="muted">{t(locale, "compare.switch.empty")}</Text>
          ) : (
            <Stack gap={2} as="ul">
              {results.map((p) => (
                <li key={p.id}>
                  <a href={`/${locale}/compare/${p.slug}?r=${encodeURIComponent(token)}`}>
                    {personDisplayName(locale, p)}
                  </a>
                </li>
              ))}
            </Stack>
          )
        ) : null}
      </Stack>
    </Card>
  );
}
