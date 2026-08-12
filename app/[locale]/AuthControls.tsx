"use client";

/**
 * The interactive half of the Stage 9D header. Resolves sign-in state
 * CLIENT-SIDE, on mount — see Header.tsx's doc comment for why: a
 * server-side check here would force every page in the shared layout
 * (including the 70 statically-generated person pages) into per-request
 * dynamic rendering. `signedIn === undefined` (not yet resolved) renders
 * nothing, the same pattern `people/[slug]/CompareCta.tsx` already uses to
 * avoid flashing the wrong state before the check completes.
 *
 * Deliberately minimal, per Phase 9 Stage 9D's explicit scope: a subtle
 * Sign in control when signed out; an Account entry (a real link to
 * `/${locale}/account` — that route doesn't exist until Stage 9E, so this
 * is a known, honest, temporary 404 rather than a dead button with no
 * href) plus Sign out when signed in. No dropdown/menu component, no
 * account email shown in the header (avoids putting PII in persistent
 * chrome for no real benefit at this stage).
 */
import { useEffect, useState } from "react";
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { Button, Cluster } from "@ui/index";
import { createClient } from "@lib/supabase/client";
import { OAUTH_NEXT_COOKIE } from "@lib/supabase/oauthNext";

export function AuthControls({ locale }: { locale: Locale }) {
  const [signedIn, setSignedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!cancelled) setSignedIn(data.user !== null);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) setSignedIn(session !== null);
    });
    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, []);

  function handleSignIn() {
    const supabase = createClient();
    // The return path is carried via a short-lived, first-party cookie —
    // NOT a `?next=` query param on `redirectTo`. Supabase's Redirect URLs
    // allow-list is documented to reject a redirect_to carrying extra query
    // parameters unless the allow-listed entry uses a wildcard, falling
    // back to the Site URL (and losing both the return path AND the
    // locale) when validation fails — exactly the failure mode a live
    // human OAuth test surfaced. A bare `${origin}/auth/callback`, matching
    // the allow-list entry exactly, has no such dependency.
    document.cookie = `${OAUTH_NEXT_COOKIE}=${encodeURIComponent(
      `${window.location.pathname}${window.location.search}`,
    )}; path=/; max-age=300; SameSite=Lax`;
    void supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (signedIn === undefined) return null;

  if (!signedIn) {
    return (
      <Button variant="quiet" onClick={handleSignIn}>
        {t(locale, "auth.sign_in")}
      </Button>
    );
  }

  return (
    <Cluster gap={2}>
      <Button variant="quiet" href={`/${locale}/account`}>
        {t(locale, "auth.account")}
      </Button>
      <Button variant="quiet" onClick={handleSignOut}>
        {t(locale, "auth.sign_out")}
      </Button>
    </Cluster>
  );
}
