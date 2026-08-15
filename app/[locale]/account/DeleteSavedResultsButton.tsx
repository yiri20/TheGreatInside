"use client";

/**
 * DELETE-ALL-SAVED-RESULTS — Broader Public Launch, Part 6. The one
 * self-service data-deletion action this product currently offers (see
 * CLAUDE.md "Broader Public Launch Finish Line" for the full account/
 * data-deletion decision record — full identity/account deletion is a
 * separate, not-yet-made decision, not implemented here).
 *
 * Two-step INLINE confirmation, not a native `window.confirm()` dialog —
 * consistent with this project's editorial UI (no modal component exists
 * anywhere else in the product) and easier to verify automatically. First
 * click reveals a plain-text confirmation question plus Confirm/Cancel;
 * only the second, explicit Confirm click calls the Server Action.
 *
 * Feedback follows the exact `aria-live="polite"` pattern `ShareButton`
 * already established — a region always present in the DOM (empty when
 * idle) so screen readers reliably announce success/failure text the
 * moment it's inserted.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { Button, Cluster, Text } from "@ui/index";
import { deleteSavedResultsAction } from "../../actions/results.js";

type Step = "idle" | "confirming" | "deleting" | "done" | "error";

export function DeleteSavedResultsButton({ locale }: { locale: Locale }) {
  const [step, setStep] = useState<Step>("idle");
  const router = useRouter();

  async function handleConfirm() {
    setStep("deleting");
    const outcome = await deleteSavedResultsAction();
    if (outcome.ok) {
      setStep("done");
      router.refresh();
    } else {
      setStep("error");
    }
  }

  if (step === "confirming" || step === "deleting") {
    return (
      <Cluster gap={3}>
        <Text tone="secondary">{t(locale, "account.delete.confirm")}</Text>
        <Button variant="quiet" onClick={handleConfirm} disabled={step === "deleting"}>
          {t(locale, "account.delete.confirm_action")}
        </Button>
        <Button variant="quiet" onClick={() => setStep("idle")} disabled={step === "deleting"}>
          {t(locale, "account.delete.cancel")}
        </Button>
      </Cluster>
    );
  }

  return (
    <Cluster gap={3}>
      <Button variant="quiet" onClick={() => setStep("confirming")}>
        {t(locale, "account.delete.button")}
      </Button>
      <span aria-live="polite" className="tgi-text--muted">
        {step === "done" ? t(locale, "account.delete.success") : null}
        {step === "error" ? t(locale, "account.delete.error") : null}
      </span>
    </Cluster>
  );
}
