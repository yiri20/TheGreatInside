"use client";

/**
 * Signed-out save-to-account CTA — Phase 10C. Renders on `/results`, right
 * after the top hero/closest-match summary and before the deeper match
 * sections, per the approved design. Results themselves are NEVER gated —
 * this renders alongside the full result, never in place of any of it.
 *
 * Resolves sign-in state client-side, same reason as `AuthControls.tsx`:
 * `/results` is already a dynamic (`ƒ`) route, so there's no Header-style
 * static-generation regression risk here, but reusing the exact same
 * "undefined = not yet resolved, render nothing" pattern keeps this
 * component consistent with the rest of the app rather than introducing a
 * second convention.
 *
 * "Saved to your account" is deliberately only ever shown after THIS
 * component itself observed the pending-queue entry for THIS token
 * transition from present to absent as a direct result of a save call it
 * made — never inferred from the entry's mere absence. Absence alone is
 * ambiguous (already saved in an earlier session vs. never this browser's
 * own completion at all, e.g. a signed-in user viewing someone else's
 * shared link) — claiming "saved" from ambiguous evidence would be exactly
 * the kind of false claim `saveCompletedResult`'s whole Phase 10C hardening
 * exists to prevent one layer down. See `evaluate()` below.
 */
import { useEffect, useState } from "react";
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { Button, Card, Stack, Text } from "@ui/index";
import { createClient } from "@lib/supabase/client";
import { buildOAuthReturnPath, OAUTH_NEXT_COOKIE } from "@lib/supabase/oauthNext";
import { readPendingOwnResults } from "@lib/results/pendingOwnResults";
import { processPendingResults } from "@lib/results/processPendingResults";
import { saveStateForResult, type SaveCtaState } from "@lib/results/saveStateForResult";
import { saveCompletedResultAction } from "../../actions/results.js";

type SaveState = "unresolved" | "checking" | SaveCtaState;

export function SignInCta({ locale, resultToken }: { locale: Locale; resultToken: string }) {
  const [state, setState] = useState<SaveState>("unresolved");

  useEffect(() => {
    let cancelled = false;

    async function evaluate(signedIn: boolean) {
      // Only a token THIS browser itself queued as its own completion is
      // eligible to ever show "Saved" — see the module doc comment above,
      // and saveStateForResult.ts's own doc comment for the full reasoning.
      const wasPending = readPendingOwnResults().some((e) => e.resultToken === resultToken);

      if (!signedIn || !wasPending) {
        if (!cancelled) setState(saveStateForResult(signedIn, wasPending, undefined));
        return;
      }

      if (!cancelled) setState("checking");
      const processed = await processPendingResults(saveCompletedResultAction).catch(() => []);
      if (cancelled) return;
      const outcome = processed.find((p) => p.resultToken === resultToken)?.outcome;
      setState(saveStateForResult(signedIn, wasPending, outcome));
    }

    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => evaluate(data.user !== null));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      void evaluate(session !== null);
    });
    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, [resultToken]);

  function handleSignIn() {
    const supabase = createClient();
    // Same return-path mechanism AuthControls.tsx already established — a
    // short-lived first-party cookie, not a redirectTo query parameter (see
    // that file's comment for why). Preserves locale + the exact current
    // `/${locale}/results?r=...` path through the OAuth round-trip.
    document.cookie = `${OAUTH_NEXT_COOKIE}=${encodeURIComponent(
      buildOAuthReturnPath(window.location.pathname, window.location.search),
    )}; path=/; max-age=300; SameSite=Lax`;
    void supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  if (state === "unresolved" || state === "checking" || state === "neutral") return null;

  if (state === "saved") {
    return (
      <Card variant="sunken">
        <Text tone="secondary">{t(locale, "results.save_cta.saved")}</Text>
      </Card>
    );
  }

  return (
    <Card variant="sunken">
      <Stack gap={3}>
        <Stack gap={1}>
          <Text tone="secondary">
            <strong>{t(locale, "results.save_cta.title")}</strong>
          </Text>
          <Text tone="muted">{t(locale, "results.save_cta.body")}</Text>
        </Stack>
        <div>
          <Button onClick={handleSignIn}>{t(locale, "results.save_cta.action")}</Button>
        </div>
      </Stack>
    </Card>
  );
}
