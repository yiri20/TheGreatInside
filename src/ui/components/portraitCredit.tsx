/**
 * Portrait credit block for the Person detail page hero — Portrait
 * Completion Phase 2D-1.
 *
 * Extracted out of `app/[locale]/people/[slug]/page.tsx` (the only current
 * caller) purely so this small piece of i18n-aware presentation logic has
 * somewhere to live that vitest can reach directly (test include is
 * `src/**\/*.test.ts`; nothing under `app/` is discovered). Deliberately
 * NOT added to `layout.tsx` — that file's own doc comment declares itself
 * `src/core`-import-free, which this component (it calls `t()`) cannot be.
 * `data.tsx` already crosses that same boundary for `PersonCard`, so this
 * sits alongside it instead.
 *
 * `kind === "editorial_nonlikeness"` gets one extra standalone line above
 * the existing attribution/license caption: see `PersonPortrait.kind`'s doc
 * comment in `core/types.ts` for the full three-value provenance contract.
 * `historical_depiction` and unclassified (`undefined`) portraits render
 * exactly what this block already rendered before this component existed —
 * no visible change for either.
 */
import type { ReactElement } from "react";
import type { Locale, PersonPortrait } from "../../core/types.js";
import { t } from "../../core/i18n/index.js";
import { Stack, Text } from "./primitives.js";

export function PortraitCredit({ locale, portrait }: { locale: Locale; portrait: PersonPortrait }): ReactElement {
  return (
    <Stack gap={1}>
      {portrait.kind === "editorial_nonlikeness" ? (
        <Text className="tgi-portrait-credit__nonlikeness">{t(locale, "portrait.editorial_nonlikeness")}</Text>
      ) : null}
      <Text tone="muted" className="tgi-portrait-credit">
        {portrait.attribution ? (
          <span className="tgi-portrait-credit__prose" title={portrait.attribution}>
            {portrait.attribution}
          </span>
        ) : null}
        <span>
          {portrait.attribution ? " · " : ""}
          {portrait.source} ·{" "}
          {portrait.licenseUrl ? (
            <a href={portrait.licenseUrl} target="_blank" rel="noreferrer">
              {portrait.license}
            </a>
          ) : (
            portrait.license
          )}
        </span>
      </Text>
    </Stack>
  );
}
