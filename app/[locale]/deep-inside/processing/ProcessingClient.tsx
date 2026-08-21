"use client";

/**
 * `?session_id=...` on this page is never trusted as proof of payment —
 * the ONLY thing that unlocks anything is `checkDeepInsideEntitlementAction`
 * reporting an active entitlement, which reads the database row the
 * verified Stripe webhook writes. Polls a bounded number of times (webhook
 * delivery is normally near-instant but not guaranteed synchronous with
 * the browser's own redirect back from Stripe) and always offers a manual
 * "check again" retry — never a dead end.
 */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { Button, Eyebrow, Heading, Stack, Text } from "@ui/index";
import { checkDeepInsideEntitlementAction } from "../../../actions/monetization.js";

const POLL_INTERVAL_MS = 2000;
const MAX_POLLS = 8; // ~16 seconds of automatic polling before asking for a manual retry.

export function ProcessingClient({ locale, resultToken }: { locale: Locale; resultToken: string | undefined }) {
  const router = useRouter();
  const [attempts, setAttempts] = useState(0);
  const [checking, setChecking] = useState(false);
  const cancelledRef = useRef(false);

  const reportHref = `/${locale}/deep-inside${resultToken ? `?r=${encodeURIComponent(resultToken)}` : ""}`;

  useEffect(() => {
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function poll() {
      setChecking(true);
      const { entitled } = await checkDeepInsideEntitlementAction().catch(() => ({ signedIn: false, entitled: false }));
      if (cancelledRef.current) return;
      setChecking(false);

      if (entitled) {
        router.replace(reportHref);
        return;
      }

      if (attempts < MAX_POLLS) {
        timer = setTimeout(() => setAttempts((n) => n + 1), POLL_INTERVAL_MS);
      }
    }

    void poll();
    return () => {
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempts]);

  function handleManualRetry() {
    setAttempts(0);
  }

  return (
    <main className="tgi-container" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
      <Stack gap={5} className="tgi-measure-stack">
        <Eyebrow>{t(locale, "deepinside.teaser.title")}</Eyebrow>
        <Heading level={1}>{t(locale, "deepinside.processing.title")}</Heading>
        <Text tone="secondary">
          {attempts >= MAX_POLLS ? t(locale, "deepinside.processing.still_waiting") : t(locale, "deepinside.processing.body")}
        </Text>
        <div>
          <Button onClick={handleManualRetry} disabled={checking}>
            {t(locale, "deepinside.processing.retry")}
          </Button>
        </div>
      </Stack>
    </main>
  );
}
