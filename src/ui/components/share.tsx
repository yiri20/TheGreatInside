"use client";

/**
 * SHARE BUTTON — Stage B Part 2. The one reusable presentation/behavior
 * primitive Results, Compare, and Person all use — not a generic
 * social-media menu, one quiet action with progressive enhancement,
 * exactly per the approved decision (`docs/phase10-stageB-sharing-og-audit.md`
 * Section C, now APPROVED not just recommended):
 *
 *   1. `navigator.share` available -> native Web Share.
 *   2. Otherwise -> copy the URL to the clipboard.
 *
 * Never both a permanent "Share" and a permanent "Copy Link" control —
 * exactly one visible `variant="quiet"` `Button`, matching this project's
 * existing tertiary-action convention (the same weight "Compare With
 * {person}" already uses on Results). The feedback region is always
 * present in the DOM (empty when idle) so its `aria-live="polite"`
 * announcement fires correctly the moment it gets real text — an
 * aria-live region that doesn't exist yet when content is inserted is not
 * reliably announced by screen readers.
 *
 * Cancelling the native share sheet (`AbortError`) is explicitly NOT an
 * error — quiet no-op, no feedback shown, per instruction. A genuine
 * `navigator.share` failure (any other thrown error) shows an accessible
 * failure message. `navigator.clipboard.writeText` success/failure both
 * get their own accessible feedback. No `alert()`, no external share SDK,
 * no per-network share buttons, no new icon dependency — a plain text
 * button, consistent with every other action already on these pages.
 */
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { Button } from "./primitives.js";

type ShareFeedback = "idle" | "copied" | "copy_failed" | "share_failed";

const FEEDBACK_DURATION_MS = 3000;

export function ShareButton({
  locale,
  label,
  url,
  shareTitle,
}: {
  locale: Locale;
  /** Visible button text — e.g. "Share result" / "결과 공유". */
  label: string;
  /** The exact URL to share/copy — callers are responsible for including
   *  every query param (result token, etc.) that makes the link work. */
  url: string;
  /** Passed to `navigator.share({ title })` only — the OS share sheet's
   *  own title, distinct from the button's own visible label. */
  shareTitle: string;
}) {
  const [feedback, setFeedback] = useState<ShareFeedback>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  function flash(next: ShareFeedback) {
    setFeedback(next);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFeedback("idle"), FEEDBACK_DURATION_MS);
  }

  async function copyToClipboard() {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      flash("copy_failed");
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      flash("copied");
    } catch {
      flash("copy_failed");
    }
  }

  async function handleClick() {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ url, title: shareTitle });
        // The native share sheet closing IS the user-visible confirmation —
        // no redundant in-app message on success.
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        flash("share_failed");
      }
      return;
    }
    await copyToClipboard();
  }

  const feedbackText =
    feedback === "copied"
      ? t(locale, "share.feedback.copied")
      : feedback === "copy_failed"
        ? t(locale, "share.feedback.copy_failed")
        : feedback === "share_failed"
          ? t(locale, "share.feedback.share_failed")
          : "";

  return (
    <span className="tgi-share">
      <Button variant="quiet" onClick={handleClick}>
        {label}
      </Button>
      <span aria-live="polite" className="tgi-share__feedback tgi-text--muted">
        {feedbackText}
      </span>
    </span>
  );
}
