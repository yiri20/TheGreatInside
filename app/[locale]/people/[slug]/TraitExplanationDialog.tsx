"use client";

/**
 * TRAIT EXPLANATION DIALOG — Profile Trait Explanation UX (2026-08).
 *
 * The content surface a trait card's click/tap opens. One native <dialog>,
 * rendered once per Trait Constellation (not once per card) and reused for
 * whichever trait is currently active — this is what makes "opening another
 * trait replaces the first" and "only one open at a time" automatic rather
 * than something to coordinate by hand.
 *
 * Native <dialog>, driven by the parent (TraitConstellationGrid, which owns
 * the ref/open state) via `.show()` on desktop and `.showModal()` on mobile
 * — see that file's own header comment for the full modality rationale
 * (a semantic/accessibility audit found the original all-`.show()` version
 * let mobile Tab/Shift+Tab reach trait cards behind the sheet). This
 * component doesn't know or care which mode is active; it renders the same
 * markup either way and lets `dialogRef`'s owner decide how to open it.
 * A real `<dialog>` rather than a plain `<div>`: it carries the correct
 * implicit ARIA dialog role and the `close` event regardless of modality,
 * and this project's own documented convention is "no modal component
 * exists anywhere else in the product" (see app/[locale]/account/
 * DeleteSavedResultsButton.tsx's doc comment) — a real popover/bottom-sheet
 * requirement (this spec) is the first place that inline-disclosure
 * convention genuinely doesn't fit, so this reaches for the platform
 * primitive rather than adding a dependency, not for a bespoke one.
 *
 * DESKTOP vs MOBILE is the same DOM/markup, styled two ways by a single
 * `.tgi-trait-explain` rule set at this project's existing 640px mobile
 * breakpoint (same one the mobile progressive-disclosure trait grid already
 * uses) — never a second component or a JS viewport branch in what gets
 * RENDERED. The only JS-computed part is the desktop anchor position
 * (`top`/`left` inline style), which the parent simply doesn't set at all
 * below 640px, so the mobile stylesheet rule applies with normal
 * specificity — no `!important`, no inline/media-query fight.
 */
import { useEffect, useRef, type RefObject } from "react";
import type { Locale } from "@core/types";
import { t, type MessageKey } from "@core/i18n/index";
import type { AttributeId } from "@core/attributes/attributes";
import type { ConstellationTrait } from "@core/interpretation/constellation";
import { traitScoreBandFor } from "@core/interpretation/traitScoreBands";
import { Button, Cluster, Divider, formatScore, Heading, Numeric, Text } from "@ui/index";

export interface TraitExplanationDialogProps {
  locale: Locale;
  id: string;
  headingId: string;
  dialogRef: RefObject<HTMLDialogElement | null>;
  /** The trait currently shown — stays populated through the close
   *  transition (the dialog just isn't visible while closed), so there is
   *  never a frame of empty content while `<dialog>` is animating shut. */
  activeAttributeId: AttributeId | null;
  traits: readonly ConstellationTrait[];
  /** attributeId -> already-resolved (locale-specific) interpretation text,
   *  computed server-side in page.tsx via `personTraitExplanationItem` +
   *  `editorialText`. Absent = no person-specific explanation exists (a
   *  normal outcome, not an error) — the dialog falls back to definition +
   *  score + band only. */
  personTraitContext: Partial<Record<AttributeId, string>>;
  onRequestClose: () => void;
}

export function TraitExplanationDialog({
  locale,
  id,
  headingId,
  dialogRef,
  activeAttributeId,
  traits,
  personTraitContext,
  onRequestClose,
}: TraitExplanationDialogProps) {
  const active = activeAttributeId ? traits.find((tr) => tr.attributeId === activeAttributeId) : undefined;

  // Fires for Escape and outside-click alike (both call dialogRef.current
  // .close() in the parent) AND for a plain `.close()` from this file's own
  // close button — one listener keeps React state in sync no matter which
  // path closed it.
  const onRequestCloseRef = useRef(onRequestClose);
  onRequestCloseRef.current = onRequestClose;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onRequestCloseRef.current();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [dialogRef]);

  // `active` can be undefined (nothing has ever been opened yet) — the
  // <dialog> below is ALWAYS returned (never swapped for a differently-
  // shaped tree), on purpose. An early-return that returned a structurally
  // different tree depending on `active` was tried first and found, via an
  // actual failing Playwright run, to break the very next open: React sees
  // a different tree shape and remounts a FRESH <dialog> DOM node on the
  // state-driven re-render that follows a click, discarding the `open`
  // attribute/modality `dialog.show()`/`.showModal()` had just set on the
  // old node a moment earlier. Keeping the outer shape constant and only
  // branching the INNER content keeps the same DOM node (and the same ref,
  // and the same open/modal state) across every open/close/switch.
  const label = active ? t(locale, `attribute.${active.attributeId}` as MessageKey) : "";
  const definition = active ? t(locale, `attribute.description.${active.attributeId}` as MessageKey) : "";
  const band = active ? traitScoreBandFor(active.score) : undefined;
  const bandLabel = band ? t(locale, band.labelKey) : "";
  const bandMeaning = band ? t(locale, band.meaningKey) : "";
  const personContext = active ? personTraitContext[active.attributeId] : undefined;

  return (
    <dialog ref={dialogRef} id={id} tabIndex={-1} className="tgi-trait-explain" aria-labelledby={headingId}>
      {active ? (
        <div className="tgi-trait-explain__body">
          <Cluster between>
            <Heading level={3} className="tgi-trait-explain__heading" id={headingId}>
              {label}
            </Heading>
            <Button variant="quiet" onClick={() => dialogRef.current?.close()}>
              {t(locale, "person.traits.explanation.close")}
            </Button>
          </Cluster>

          <Text tone="secondary" className="tgi-trait-explain__meta">
            <Numeric>{formatScore(active.score)}</Numeric> · {bandLabel} — {bandMeaning}
          </Text>

          <Text>{definition}</Text>

          {personContext ? (
            <>
              <Divider />
              <Text tone="muted">{personContext}</Text>
            </>
          ) : null}
        </div>
      ) : null}
    </dialog>
  );
}
