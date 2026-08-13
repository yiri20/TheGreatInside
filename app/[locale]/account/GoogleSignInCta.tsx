"use client";

/**
 * Shared inline sign-in CTA — Phase 10C post-E2E fix. Used by BOTH
 * `/account`'s signed-out state and `/account/results/[id]`'s
 * auth-required state (moved here, to the shared `/account` route
 * segment, specifically so it's one component instead of two identical
 * copies). A Server Component can't call `signInWithOAuth` itself, so
 * this is the one client island either state needs.
 *
 * Reuses the EXACT SAME return-path mechanism `AuthControls.tsx` and
 * `SignInCta.tsx` already established (`buildOAuthReturnPath` +
 * `OAUTH_NEXT_COOKIE`) — no second redirect mechanism. `returnPath` is
 * passed in from the server (the exact current URL for this locale/route),
 * not derived from `window.location`, since the server already knows it
 * precisely.
 */
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { Button } from "@ui/index";
import { createClient } from "@lib/supabase/client";
import { buildOAuthReturnPath, OAUTH_NEXT_COOKIE } from "@lib/supabase/oauthNext";

export function GoogleSignInCta({ locale, returnPath }: { locale: Locale; returnPath: string }) {
  function handleSignIn() {
    const supabase = createClient();
    document.cookie = `${OAUTH_NEXT_COOKIE}=${encodeURIComponent(
      buildOAuthReturnPath(returnPath, ""),
    )}; path=/; max-age=300; SameSite=Lax`;
    void supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return <Button onClick={handleSignIn}>{t(locale, "auth.sign_in_with_google")}</Button>;
}
