"use client";

/**
 * Small client island on an otherwise server-rendered person page: offers
 * "Compare yourself with this person" when a valid, CURRENT-version result
 * token was saved by a previous results-page visit (see
 * `results/SaveLastResult.tsx`), or "Take the quiz to compare" otherwise.
 * No account, no server round-trip — the same localStorage-token mechanism
 * Phase 6 already established, just read from a different page.
 */
import { useEffect, useState } from "react";
import { QUIZ } from "@core/quiz/bank";
import { decodeResultToken } from "@core/quiz/serialize";
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { Button } from "@ui/index";
import { LAST_RESULT_KEY } from "../../results/SaveLastResult.js";

export function CompareCta({ locale, slug }: { locale: Locale; slug: string }) {
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LAST_RESULT_KEY);
      setToken(stored && decodeResultToken(stored, QUIZ) ? stored : null);
    } catch {
      setToken(null);
    }
  }, []);

  // undefined = not yet resolved (first client paint) — render nothing
  // rather than flash the wrong CTA before localStorage has been read.
  if (token === undefined) return null;

  return token ? (
    <Button href={`/${locale}/compare/${slug}?r=${encodeURIComponent(token)}`}>
      {t(locale, "compare.cta.has_result")}
    </Button>
  ) : (
    <Button variant="secondary" href={`/${locale}/quiz`}>
      {t(locale, "compare.cta.no_result")}
    </Button>
  );
}
