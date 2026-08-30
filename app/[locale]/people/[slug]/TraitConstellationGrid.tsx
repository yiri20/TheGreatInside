"use client";

/**
 * Mobile progressive disclosure for the Trait Constellation (2026-08 Person
 * Profile UX polish). Human visual review of the Profile V2 pilot found
 * mobile person pages excessively long: 8-12 trait cards, always rendered as
 * a single vertical stack, pushed Life Arc/Key Achievements/Life Scenes/
 * Turning Points/Legacy far below the fold. `traitConstellation()` already
 * orders its result by distinctiveness (most characteristic first, see
 * `src/core/interpretation/constellation.ts`), so "the strongest 4" is
 * simply the array's own first 4 entries — no re-ranking here, no trait/
 * scoring change, local UI state only.
 *
 * Desktop/tablet (>640px) must render byte-identically to before this
 * change. Rather than branch on a JS-detected viewport, the collapse
 * itself is CSS media-query-gated (`.tgi-trait-grid--collapsed` only hides
 * anything below 640px, and the toggle control only becomes visible below
 * 640px) — every trait card is always present in the DOM, so desktop layout,
 * SEO, and no-JS degradation all fall out of plain CSS rather than a
 * client-only viewport check that could mismatch on hydration.
 *
 * Reuses the existing `.tgi-button--quiet` treatment (already the
 * project's "quiet disclosure action" pattern — see the Landing secondary
 * CTA and the person-page Share button) rather than inventing a new control
 * style, and a plain toggle button rather than a floating popover/`<details>`
 * repurposing, since the show/hide state here needs to be forced open at
 * desktop widths regardless of the toggle's own state — a native `<details>`
 * doesn't support "ignore my own state above this breakpoint" without the
 * same media-query trick anyway, so a controlled button is the more direct
 * of two equally-CSS-dependent options.
 *
 * PROFILE TRAIT EXPLANATION UX (2026-08): clicking/tapping a trait card
 * opens an explanation surface for that attribute (name, score + band,
 * definition, and — only when this person's own editorial content ties that
 * attribute to a concrete episode — a person-specific paragraph; see
 * `src/core/interpretation/traitExplanation.ts`). This state (`activeId`,
 * the shared `<dialog>` ref) is completely independent of the mobile
 * `expanded` collapse state above — opening/closing an explanation never
 * touches, and is never touched by, Show all/Show fewer.
 *
 * MODALITY SPLITS BY BREAKPOINT (semantic/accessibility audit, 2026-08):
 * desktop (>640px) uses non-modal `.show()`; mobile (<=640px) uses modal
 * `.showModal()`. This was NOT the original design — the first version used
 * `.show()` everywhere, reasoning that `showModal()`'s inert background
 * makes "click a different trait card while one is open" (a real desktop
 * requirement, confirmed via an actual failing Playwright run) structurally
 * impossible. That reasoning is still correct FOR DESKTOP. It does not
 * transfer to mobile: the mobile bottom sheet never claims to support
 * switching traits by tapping a card behind it (that was always a desktop-
 * only interaction in the spec), and a follow-up accessibility audit found
 * the non-modal mobile sheet let Tab/Shift+Tab reach trait cards still
 * visible above the sheet — a real focus-containment defect a screen-reader
 * or keyboard user could hit, not a theoretical one. `showModal()` on
 * mobile fixes this for free (native inert background + native focus
 * containment), which is exactly why the spec prefers it over hand-rolling
 * a focus trap. Escape/outside-click stay hand-rolled for BOTH modes for
 * one shared code path (harmless redundancy on mobile: native Escape/
 * backdrop-click already work there too) rather than forking the listener
 * logic by breakpoint as well as the open-call itself.
 */
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { Locale } from "@core/types";
import { t, type MessageKey } from "@core/i18n/index";
import type { ConstellationTrait } from "@core/interpretation/constellation";
import type { AttributeId } from "@core/attributes/attributes";
import { Grid, TraitCard } from "@ui/index";
import { TraitExplanationDialog } from "./TraitExplanationDialog";

const MOBILE_DEFAULT_COUNT = 4;
/** This project's one mobile-collapse breakpoint (matches the CSS below,
 *  and `.tgi-filter-bar`/`.tgi-results-discovery-grid` elsewhere) — below
 *  it, the explanation renders as a bottom sheet, not an anchored popover,
 *  and the parent stops computing/settings a desktop anchor position. */
const MOBILE_BREAKPOINT_PX = 640;

const EXPLANATION_WIDTH_PX = 360;
const EXPLANATION_EST_HEIGHT_PX = 260;
const VIEWPORT_MARGIN_PX = 12;

function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT_PX;
}

/** First-pass anchor guess (before the dialog has real dimensions to
 *  measure) — placed just below the card, flipped above if it would run
 *  off the bottom, clamped horizontally within the viewport. Corrected
 *  after the dialog actually renders (see the effect below), since only
 *  then is its real measured size known. */
function anchorPosition(rect: DOMRect): { top: number; left: number } {
  let top = rect.bottom + 8;
  if (top + EXPLANATION_EST_HEIGHT_PX > window.innerHeight - VIEWPORT_MARGIN_PX) {
    top = Math.max(VIEWPORT_MARGIN_PX, rect.top - EXPLANATION_EST_HEIGHT_PX - 8);
  }
  const left = Math.min(
    Math.max(VIEWPORT_MARGIN_PX, rect.left),
    window.innerWidth - EXPLANATION_WIDTH_PX - VIEWPORT_MARGIN_PX,
  );
  return { top, left };
}

export function TraitConstellationGrid({
  locale,
  traits,
  personTraitContext = {},
}: {
  locale: Locale;
  traits: readonly ConstellationTrait[];
  /** attributeId -> resolved (locale-specific) person-specific interpretation
   *  text, already computed server-side (page.tsx). Absent for most
   *  attributes on most people — that's the expected, evidence-gated norm,
   *  not a gap; TraitExplanationDialog falls back to definition + score +
   *  band alone when a given attribute has no entry. */
  personTraitContext?: Partial<Record<AttributeId, string>>;
}) {
  const [expanded, setExpanded] = useState(false);
  const gridId = useId();

  const [activeId, setActiveId] = useState<AttributeId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogDomId = useId();
  const headingId = useId();

  // Nothing to disclose — desktop and mobile already show the same thing.
  const canCollapse = traits.length > MOBILE_DEFAULT_COUNT;

  function openExplanation(attributeId: AttributeId, trigger: HTMLButtonElement) {
    const dialog = dialogRef.current;
    if (!dialog) return;
    triggerRef.current = trigger;
    setActiveId(attributeId);
    const mobile = isMobileViewport();
    if (!mobile) {
      const pos = anchorPosition(trigger.getBoundingClientRect());
      dialog.style.top = `${pos.top}px`;
      dialog.style.left = `${pos.left}px`;
    } else {
      // Let the mobile stylesheet's `inset` shorthand control position with
      // ordinary specificity — an inline top/left would otherwise win over
      // it even under the @media rule (inline styles always beat a
      // stylesheet rule for the same longhand property).
      dialog.style.removeProperty("top");
      dialog.style.removeProperty("left");
    }
    // Only call the opening method when NOT already open — `.show()` on an
    // already-open dialog is a documented no-op (safe to call every time),
    // but `.showModal()` on an already-open dialog THROWS regardless of its
    // current modality (HTML spec: "if this has an open attribute, then
    // throw an InvalidStateError"). Switching between two already-open
    // traits on the SAME breakpoint (the common case) skips this entirely —
    // the dialog stays open and only its content changes underneath it. A
    // mode mismatch (viewport crossed the breakpoint while open) is instead
    // handled by the resize effect below, which closes the dialog first —
    // by the time a fresh `openExplanation` call reaches here, `dialog.open`
    // is reliably false in that case too.
    if (!dialog.open) {
      if (mobile) dialog.showModal();
      else dialog.show();
    }
    // Move focus into the new content every time, including a straight
    // switch from one trait to another — a mouse user won't notice (their
    // attention already moved with the click), and a keyboard/AT user gets
    // consistent, correct focus placement regardless of which trigger
    // opened it. `tabIndex={-1}` on the dialog (TraitExplanationDialog.tsx)
    // is what makes a plain, non-interactive element focusable for this.
    // Called directly, not wrapped in requestAnimationFrame — an open
    // <dialog> is focusable immediately, no frame needed (rAF was tried
    // here first and found, via manual QA in an automation-driven browser
    // context, to sometimes never fire at all in a non-compositing/
    // headless-style environment — the position-correction effect below
    // hit the exact same issue and no longer depends on it).
    dialog.focus();
  }

  function closeExplanation() {
    setActiveId(null);
    triggerRef.current?.focus();
  }

  // Escape and outside-click, hand-rolled for BOTH modes even though
  // `.showModal()` (mobile) provides native Escape-to-cancel — one shared
  // code path, harmless redundancy on mobile (closing an already-closed
  // dialog is a no-op) rather than forking listener logic by breakpoint on
  // top of the open-call already being forked in `openExplanation`. A click
  // on ANOTHER trigger is deliberately excluded from "outside" — that
  // trigger's own onClick already calls `openExplanation` and switches the
  // content; treating it as an outside-click-to-close too would just close
  // what that same click had just opened. Desktop only, in practice: mobile
  // triggers are inert while the modal sheet is open, so they can never be
  // the click target there in the first place.
  useEffect(() => {
    if (!activeId) return;
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") dialogRef.current?.close();
    }
    function handleClick(e: MouseEvent) {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const target = e.target as Node;
      // A click that lands on the <dialog> element ITSELF (not a
      // descendant) is a backdrop click — native `showModal()` targets the
      // dialog for a backdrop hit, and `Node.contains()` would otherwise
      // treat "target === dialog" as "inside" (a node contains itself),
      // silently swallowing this exact case.
      if (target === dialog) {
        dialog.close();
        return;
      }
      if (dialog.contains(target)) return;
      if (target instanceof Element && target.closest(".tgi-traitcard-trigger")) return;
      dialog.close();
    }
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("click", handleClick);
    };
  }, [activeId]);

  // Two-pass positioning: `anchorPosition` above is a pre-render estimate
  // (the dialog has no real size until its real content is on screen); once
  // that content IS on screen, re-measure its true rendered box and correct
  // top/left against the real viewport-edge case rather than the estimate.
  // Desktop only — see `openExplanation`, which never sets an inline
  // position on mobile.
  //
  // `useLayoutEffect`, measuring synchronously with no `requestAnimationFrame`
  // wrapper — tried first with rAF (matching the "wait a frame, then
  // measure" idiom used elsewhere for animation timing) and found, via
  // manual QA, that rAF can simply never fire in some automation/headless-
  // style browser contexts, silently freezing the popover at its rough
  // first-pass guess forever. `useLayoutEffect` doesn't have that problem:
  // React guarantees it runs synchronously after the DOM has already been
  // updated with this trait's real content and before the browser paints,
  // so `getBoundingClientRect()` here (which itself forces a layout flush)
  // reads the real box on the very first call — no frame to wait for.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !activeId || isMobileViewport()) return;
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const box = dialog.getBoundingClientRect();
    let top = rect.bottom + 8;
    if (top + box.height > window.innerHeight - VIEWPORT_MARGIN_PX) {
      top = Math.max(VIEWPORT_MARGIN_PX, rect.top - box.height - 8);
    }
    const left = Math.min(
      Math.max(VIEWPORT_MARGIN_PX, rect.left),
      window.innerWidth - box.width - VIEWPORT_MARGIN_PX,
    );
    dialog.style.top = `${top}px`;
    dialog.style.left = `${left}px`;
  }, [activeId]);

  // Keeps the anchor sane across a resize/rotation while open. A mode
  // mismatch (e.g. a phone rotated to landscape crosses the 640px
  // breakpoint while the sheet is open) closes the dialog outright rather
  // than trying to reopen it in the new mode in place — native <dialog>
  // has no "convert modal <-> non-modal without closing" operation, and
  // `.showModal()` on an already-open dialog throws regardless of its
  // current modality (see `openExplanation`). Closing is a reasonable,
  // unsurprising response to a mid-read orientation change; the trait
  // stays one tap away again.
  useEffect(() => {
    if (!activeId) return;
    function handleResize() {
      const dialog = dialogRef.current;
      const trigger = triggerRef.current;
      if (!dialog || !trigger) return;
      const mobile = isMobileViewport();
      if (dialog.open && mobile !== dialog.matches(":modal")) {
        dialog.close();
        return;
      }
      if (mobile) {
        dialog.style.removeProperty("top");
        dialog.style.removeProperty("left");
        return;
      }
      const pos = anchorPosition(trigger.getBoundingClientRect());
      dialog.style.top = `${pos.top}px`;
      dialog.style.left = `${pos.left}px`;
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeId]);

  // Background-scroll lock while the explanation is open — a plain
  // overflow toggle, not a scroll-position change, so it cannot itself
  // cause the "return to the same scroll position" requirement to fail.
  useEffect(() => {
    if (!activeId) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [activeId]);

  return (
    <>
      <div
        id={gridId}
        className={
          canCollapse && !expanded ? "tgi-trait-grid tgi-trait-grid--collapsed" : "tgi-trait-grid"
        }
      >
        <Grid min="15rem">
          {traits.map((trait) => (
            <TraitCard
              key={trait.attributeId}
              label={t(locale, `attribute.${trait.attributeId}` as MessageKey)}
              score={trait.score}
              impact={trait.impact}
              confidence={trait.confidence}
              locale={locale}
              explain={{
                expanded: activeId === trait.attributeId,
                controls: dialogDomId,
                onActivate: (trigger) => openExplanation(trait.attributeId, trigger),
              }}
            />
          ))}
        </Grid>
      </div>
      {canCollapse ? (
        <button
          type="button"
          className="tgi-button tgi-button--quiet tgi-trait-grid__toggle"
          aria-expanded={expanded}
          aria-controls={gridId}
          onClick={() => setExpanded((value) => !value)}
        >
          {t(locale, expanded ? "person.traits.show_fewer" : "person.traits.show_all")}
        </button>
      ) : null}
      <TraitExplanationDialog
        locale={locale}
        id={dialogDomId}
        headingId={headingId}
        dialogRef={dialogRef}
        activeAttributeId={activeId}
        traits={traits}
        personTraitContext={personTraitContext}
        onRequestClose={closeExplanation}
      />
    </>
  );
}
