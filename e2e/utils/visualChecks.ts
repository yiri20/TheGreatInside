import { expect, type Page } from "@playwright/test";

/**
 * Reusable visual-smoke assertions (Phase 10D-1). Deliberately generic — not
 * page-specific — so later Phase 10D stages (Person, Results, Compare) can
 * reuse these against their own pages instead of every stage reinventing
 * overflow/console/tab-order checks.
 */

export interface ConsoleCapture {
  errors: string[];
  pageErrors: string[];
}

/** Attach console/pageerror listeners BEFORE navigating, so nothing is missed. */
export function captureConsole(page: Page): ConsoleCapture {
  const capture: ConsoleCapture = { errors: [], pageErrors: [] };
  page.on("console", (msg) => {
    if (msg.type() === "error") capture.errors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    capture.pageErrors.push(err.message);
  });
  return capture;
}

/** No stray wide element may open a horizontal scrollbar — the same
 *  invariant `.tgi-root { overflow-x: hidden }` is meant to guarantee, this
 *  actually measures it. Small tolerance for subpixel rounding. */
export async function assertNoHorizontalOverflow(page: Page, toleranceProseX = 1): Promise<void> {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(
    scrollWidth,
    `document.documentElement.scrollWidth (${scrollWidth}) exceeds clientWidth (${clientWidth}) — horizontal overflow`,
  ).toBeLessThanOrEqual(clientWidth + toleranceProseX);
}

/** `.tgi-text`'s prose measure is 68ch — verify no rendered instance exceeds
 *  a generous pixel ceiling for the current viewport (68ch at the base font
 *  size is well under 700px; this is a coarse regression guard, not a
 *  pixel-perfect check). */
export async function assertProseMeasureBounded(page: Page, maxPx = 720): Promise<void> {
  const widths = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".tgi-text")).map((el) => el.getBoundingClientRect().width),
  );
  for (const w of widths) {
    expect(w, `a .tgi-text element measured ${w}px wide, exceeding the ${maxPx}px prose-measure ceiling`).toBeLessThanOrEqual(
      maxPx,
    );
  }
}

/** Coarse clipped-text/button detector: any element whose own scrollWidth
 *  exceeds its clientWidth is overflowing its own box (as opposed to the
 *  page-level check above, which only catches page-level horizontal
 *  scroll). Scoped to interactive/text elements, not every DOM node. */
export async function assertNoClippedElements(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const offenders: string[] = [];
    const els = document.querySelectorAll<HTMLElement>("a, button, h1, h2, h3, p, span, .tgi-button");
    for (const el of els) {
      // .tgi-visually-hidden is the project's deliberate sr-only pattern
      // (clip-rect to 1x1px, see components.css) — its whole job is to be
      // visually clipped while remaining in the accessibility tree, so
      // scrollWidth > clientWidth there is correct, not a defect. Excluding
      // it (and anything inside it) is what makes this check meaningful for
      // ImpactBadge/ConfidenceIndicator/ScoreBar's real sr-only text, which
      // the Person page exercises far more than Landing did.
      if (el.closest(".tgi-visually-hidden")) continue;
      if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== "visible") {
        offenders.push(`${el.tagName}.${el.className || "(no class)"}: "${(el.textContent ?? "").slice(0, 40)}"`);
      }
    }
    return offenders;
  });
}

/** Walks Tab focus order and returns the sequence of elements focused, so a
 *  test can assert it matches DOM/source order — the project's own
 *  requirement that a wide-desktop rail must never use CSS `order` to jump
 *  a visually-secondary region ahead of primary content for keyboard users. */
export async function tabOrderSequence(page: Page, steps: number): Promise<string[]> {
  const sequence: string[] = [];
  for (let i = 0; i < steps; i++) {
    await page.keyboard.press("Tab");
    const label = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return "(body)";
      return `${el.tagName.toLowerCase()}:${(el.textContent ?? el.getAttribute("aria-label") ?? "").trim().slice(0, 30)}`;
    });
    sequence.push(label);
  }
  return sequence;
}

/** DOM order of a set of selectors, to compare against tabOrderSequence's
 *  focus order — a rail using `order:` would make these diverge. */
export async function domOrderIndex(page: Page, selector: string): Promise<number[]> {
  return page.evaluate((sel) => {
    const all = Array.from(document.querySelectorAll("*"));
    const matches = Array.from(document.querySelectorAll(sel));
    return matches.map((m) => all.indexOf(m));
  }, selector);
}

/** Whether a Rail's primary/secondary regions are laid out side by side
 *  (wide-desktop split) or stacked (single column) — reusable across any
 *  page using the `Rail` primitive (Phase 10D-2 introduced this for the
 *  Person page; later stages can reuse it for Results/Compare). Compares
 *  vertical position rather than trusting the CSS breakpoint blindly, so a
 *  test using this actually observes the rendered layout. Returns
 *  `undefined` if either region isn't present (e.g. no secondary content
 *  for a given person). */
export async function railIsSideBySide(page: Page): Promise<boolean | undefined> {
  return page.evaluate(() => {
    const primary = document.querySelector(".tgi-rail__primary");
    const secondary = document.querySelector(".tgi-rail__secondary");
    if (!primary || !secondary) return undefined;
    const p = primary.getBoundingClientRect();
    const s = secondary.getBoundingClientRect();
    // Side by side: vertical ranges overlap substantially. Stacked:
    // secondary starts at or after primary's bottom.
    const verticalOverlap = Math.min(p.bottom, s.bottom) - Math.max(p.top, s.top);
    return verticalOverlap > Math.min(p.height, s.height) * 0.3;
  });
}
