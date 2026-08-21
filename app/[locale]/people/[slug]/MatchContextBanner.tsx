"use client";

/**
 * Item 20 (Results -> profile connection): when a visitor arrives from
 * their quiz Results page via the Closest Match card, this renders one
 * line explaining why they're here — "your quiz result showed a close
 * match here, especially in {trait}." Deliberately reads only two plain,
 * human-readable query params Results already computed server-side
 * (`why`, `trait`) — it never decodes a result token or recomputes a
 * match on this page, so:
 *   - this page never needs `src/core/matching`/`src/core/quiz` bundled
 *     client-side (see CLAUDE.md "Post-10D Stage A"/performance notes on
 *     keeping client bundles small), and
 *   - the person page stays fully independent of any result token for
 *     normal browsing, per the editorial-depth brief's explicit
 *     instruction — a direct visit, a directory click-through, or a link
 *     from search all render the exact same page with no banner.
 * Renders nothing until the params are resolved client-side (avoids a
 * flash of missing content) and nothing at all when they're absent.
 */
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { AttributeId } from "@core/attributes/attributes";
import { ATTRIBUTE_IDS } from "@core/attributes/attributes";
import type { Locale } from "@core/types";
import { t, type MessageKey } from "@core/i18n/index";
import { Text } from "@ui/index";

const ATTRIBUTE_ID_SET = new Set<string>(ATTRIBUTE_IDS);

function isAttributeId(value: string | null): value is AttributeId {
  return value !== null && ATTRIBUTE_ID_SET.has(value);
}

function MatchContextBannerInner({ locale }: { locale: Locale }) {
  const params = useSearchParams();
  const why = params.get("why");
  const traitParam = params.get("trait");

  if (why !== "match" || !isAttributeId(traitParam)) return null;

  return (
    <Text tone="muted">
      {t(locale, "person.match_context.banner", {
        trait: t(locale, `attribute.${traitParam}` as MessageKey),
      })}
    </Text>
  );
}

export function MatchContextBanner({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={null}>
      <MatchContextBannerInner locale={locale} />
    </Suspense>
  );
}
