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
      // .tgi-taxonomy-chip__check (People Directory chip redesign, 2026-08):
      // a decorative, aria-hidden checkmark glyph deliberately collapsed to
      // width:0/overflow:hidden while its chip is unchecked, expanding to
      // its natural width only on selection (see components.css's directory
      // taxonomy chip block) — the same "deliberately clipped, not a
      // defect" shape as .tgi-visually-hidden above, just for a decorative
      // state indicator instead of sr-only text. Excluding by class (not a
      // blanket aria-hidden exclusion) keeps this check strict for any
      // OTHER aria-hidden element that gets accidentally, visibly clipped.
      if (el.closest(".tgi-taxonomy-chip__check")) continue;
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
 *  Person page; Phase 10D-3 reuses it for Results, which has MULTIPLE
 *  `.tgi-rail` instances on one page — `withinSelector` scopes the query to
 *  a specific ancestor so each Rail on the page can be checked
 *  independently instead of always matching the first one in the DOM).
 *  Compares vertical position rather than trusting the CSS breakpoint
 *  blindly, so a test using this actually observes the rendered layout.
 *  Returns `undefined` if either region isn't present (e.g. no secondary
 *  content for a given person, or the scope selector doesn't match). */
export async function railIsSideBySide(page: Page, withinSelector?: string): Promise<boolean | undefined> {
  return page.evaluate((scopeSelector) => {
    const scope = scopeSelector ? document.querySelector(scopeSelector) : document;
    if (!scope) return undefined;
    const primary = scope.querySelector(".tgi-rail__primary");
    const secondary = scope.querySelector(".tgi-rail__secondary");
    if (!primary || !secondary) return undefined;
    const p = primary.getBoundingClientRect();
    const s = secondary.getBoundingClientRect();
    // Side by side: vertical ranges overlap substantially. Stacked:
    // secondary starts at or after primary's bottom.
    const verticalOverlap = Math.min(p.bottom, s.bottom) - Math.max(p.top, s.top);
    return verticalOverlap > Math.min(p.height, s.height) * 0.3;
  }, withinSelector);
}

/** Generic side-by-side check for any two elements (not necessarily a
 *  `Rail`) — Phase 10D-3's Signature+Dual-Edged pairing uses a plain equal-
 *  width grid (`.tgi-results-trait-pair`), not `Rail`, since the two
 *  children are peers rather than a primary/secondary pair. Same vertical-
 *  overlap heuristic as `railIsSideBySide`. */
export async function elementsAreSideBySide(page: Page, selectorA: string, selectorB: string): Promise<boolean | undefined> {
  return page.evaluate(
    ([selA, selB]) => {
      const a = document.querySelector(selA as string);
      const b = document.querySelector(selB as string);
      if (!a || !b) return undefined;
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      const verticalOverlap = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
      return verticalOverlap > Math.min(ra.height, rb.height) * 0.3;
    },
    [selectorA, selectorB],
  );
}

/**
 * Direct geometry assertion for the "spotlight card" defect class (Person's
 * Opposite Profile, Results' Unexpected Match/Opposite Profile) — a single
 * PersonCard expanding to the available container width, then its 4:5
 * portrait aspect-ratio amplifying that into an absurdly tall block.
 * Deliberately scoped to the first `count` matches of `baseSelector` in
 * DOCUMENT order (Playwright's `.nth()`, not the CSS `:nth-of-type`
 * pseudo-class — the latter counts per sibling-group under its own parent,
 * which silently does the wrong thing here since each spotlight PersonCard
 * has a different parent, not a broad "any tall element" heuristic, which
 * would false-positive on legitimately tall content (a long trait-profile
 * breakdown, a long comparison list) — see the Phase 10D-3 audit for why a
 * global heuristic was rejected in favour of this targeted one.
 */
export async function assertSpotlightCardsConstrained(
  page: Page,
  baseSelector: string,
  count: number,
  maxWidthPx = 420,
): Promise<void> {
  const boxes = await page.locator(baseSelector).evaluateAll(
    (els, n) =>
      els.slice(0, n).map((el) => {
        const r = el.getBoundingClientRect();
        return { width: r.width, height: r.height };
      }),
    count,
  );
  for (const box of boxes) {
    if (box.width === 0 && box.height === 0) continue; // not present on this fixture
    expect(
      box.width,
      `${baseSelector} width ${box.width}px exceeds the ${maxWidthPx}px spotlight-card cap`,
    ).toBeLessThanOrEqual(maxWidthPx);
    expect(
      box.height / box.width,
      `${baseSelector} height:width ratio ${box.height / box.width} suggests the aspect-ratio-amplification bug has recurred`,
    ).toBeLessThan(2.2);
  }
}

/**
 * Public Beta Finish Line heading-hierarchy guard. Walks h1-h6 in DOM
 * order and asserts: exactly one h1, and no level ever jumps DEEPER by
 * more than 1 from the previous heading (e.g. h1 -> h3 is a violation;
 * h3 -> h1, or h2 -> h2, or h2 -> h3 -> h2, are all fine — shallowing
 * back up is never a skip). Counts a heading wherever it sits in the DOM,
 * including inside `.tgi-visually-hidden` — an sr-only heading is exactly
 * the mechanism this project uses to fix a real skip without a visual
 * change (see Person's Known For, People's results-heading), so it must
 * count toward the outline the same as a visible one.
 */
export async function assertHeadingHierarchy(page: Page): Promise<void> {
  const levels = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((el) =>
      Number(el.tagName.slice(1)),
    ),
  );
  const h1Count = levels.filter((l) => l === 1).length;
  expect(h1Count, `expected exactly one h1, found ${h1Count} (levels: ${levels.join(",")})`).toBe(1);

  for (let i = 1; i < levels.length; i++) {
    const prev = levels[i - 1];
    const cur = levels[i];
    expect(
      cur - prev,
      `heading level skipped from h${prev} to h${cur} at position ${i} (full sequence: ${levels.join(",")})`,
    ).toBeLessThanOrEqual(1);
  }
}
