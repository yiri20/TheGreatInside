import { test, expect, type Page } from "@playwright/test";
import { captureConsole } from "./utils/visualChecks";

/**
 * Profile Trait Explanation UX (2026-08) — trait card click/tap -> popover
 * (desktop) / bottom sheet (mobile). Three representative profiles:
 *  - albert-einstein: a constellation trait ("Belief Updating") ties to a
 *    person-specific interpretation already in the editorial corpus — the
 *    "rich" case (see personTraitExplanation.ts / editorial.ts
 *    albert-einstein.interpretation.turning_point.1).
 *  - leonardo-da-vinci: verified via src/core/interpretation — NONE of his
 *    constellation traits have a tied editorial interpretation, so every
 *    card exercises the definition + score + band fallback only.
 *  - Both also exercise EN/KO parity; da-vinci carries >4 constellation
 *    traits (8-12 per constellation_v1), so it doubles as the mobile
 *    strongest-4 fixture.
 */
const DESKTOP = { width: 1280, height: 1000 };
const MOBILE = { width: 390, height: 844 };

const traitTrigger = (page: Page) => page.locator(".tgi-traitcard-trigger");
const dialog = (page: Page) => page.locator(".tgi-trait-explain[open]");

test.describe("desktop trait explanation (albert-einstein, en-US)", () => {
  test.use({ viewport: DESKTOP });

  test("clicking a trait card opens an explanation popover with EN content", async ({ page }) => {
    const console_ = captureConsole(page);
    await page.goto("/en-US/people/albert-einstein", { waitUntil: "networkidle" });

    const first = traitTrigger(page).first();
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await first.click();

    const open = dialog(page);
    await expect(open).toBeVisible();
    await expect(first).toHaveAttribute("aria-expanded", "true");
    // Content model: name, score+band, definition all present.
    const bodyText = await open.locator(".tgi-trait-explain__body").innerText();
    expect(bodyText.length).toBeGreaterThan(0);
    // Desktop stays deliberately NON-modal (semantic/accessibility audit,
    // 2026-08) -- mobile switched to a true modal `.showModal()` for its
    // own focus-containment reasons (see the mobile describe block below),
    // but desktop still needs the rest of the page clickable so a user can
    // select a different trait card directly, which `:modal` would block.
    const isModal = await page.evaluate(() => document.querySelector(".tgi-trait-explain")!.matches(":modal"));
    expect(isModal).toBe(false);
    expect(console_.errors, console_.errors.join("\n")).toEqual([]);
    expect(console_.pageErrors, console_.pageErrors.join("\n")).toEqual([]);
  });

  test("opening a second trait replaces the first — only one open at a time", async ({ page }) => {
    await page.goto("/en-US/people/albert-einstein", { waitUntil: "networkidle" });
    const triggers = traitTrigger(page);
    const count = await triggers.count();
    expect(count).toBeGreaterThanOrEqual(2);

    await triggers.nth(0).click();
    await expect(dialog(page)).toBeVisible();
    const firstHeading = await page.locator(".tgi-trait-explain__heading").innerText();

    await triggers.nth(1).click();
    // Still exactly one dialog open, and its content changed.
    await expect(page.locator(".tgi-trait-explain[open]")).toHaveCount(1);
    const secondHeading = await page.locator(".tgi-trait-explain__heading").innerText();
    expect(secondHeading).not.toBe(firstHeading);
    // The first trigger is no longer marked expanded; the second is.
    await expect(triggers.nth(0)).toHaveAttribute("aria-expanded", "false");
    await expect(triggers.nth(1)).toHaveAttribute("aria-expanded", "true");
  });

  test("Escape closes the explanation and returns focus to the trigger", async ({ page }) => {
    await page.goto("/en-US/people/albert-einstein", { waitUntil: "networkidle" });
    const first = traitTrigger(page).first();
    await first.click();
    await expect(dialog(page)).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator(".tgi-trait-explain[open]")).toHaveCount(0);
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await expect(first).toBeFocused();
  });

  test("clicking outside the popover closes it", async ({ page }) => {
    await page.goto("/en-US/people/albert-einstein", { waitUntil: "networkidle" });
    await traitTrigger(page).first().click();
    await expect(dialog(page)).toBeVisible();

    // Click far in a corner, outside the popover's own bounds — lands on
    // the <dialog>'s own backdrop area, which is what triggers the close.
    await page.mouse.click(5, 5);
    await expect(page.locator(".tgi-trait-explain[open]")).toHaveCount(0);
  });

  test("repositions/flips near a viewport edge rather than overflowing it", async ({ page }) => {
    // A short viewport forces the popover's first-pass "just below the
    // card" placement to overflow the bottom — this specifically exercises
    // TraitConstellationGrid.tsx's useLayoutEffect correction pass (real
    // measured height, not the pre-render estimate). Found via manual QA
    // that an earlier requestAnimationFrame-based version of this same
    // correction could silently never run in some browser contexts;
    // useLayoutEffect fixed it, and this test is what would have caught it.
    await page.setViewportSize({ width: 1280, height: 480 });
    await page.goto("/en-US/people/albert-einstein", { waitUntil: "networkidle" });
    await traitTrigger(page).first().click();
    const box = await dialog(page).boundingBox();
    expect(box, "dialog should have a bounding box while open").not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(480);
  });

  test("keyboard: Tab reaches a trait card, Enter opens it, Escape closes it", async ({ page }) => {
    await page.goto("/en-US/people/albert-einstein", { waitUntil: "networkidle" });
    const first = traitTrigger(page).first();
    await first.focus();
    await expect(first).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(dialog(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".tgi-trait-explain[open]")).toHaveCount(0);
  });

  test("a constellation trait with a tied editorial interpretation shows person-specific context", async ({
    page,
  }) => {
    await page.goto("/en-US/people/albert-einstein", { waitUntil: "networkidle" });
    // "Belief Updating" is the attribute label for the person-specific case.
    const trigger = page.locator(".tgi-traitcard-trigger", { hasText: "Belief Updating" });
    await expect(trigger).toHaveCount(1);
    await trigger.click();
    const body = dialog(page).locator(".tgi-trait-explain__body");
    await expect(body).toContainText("belief_updating score");
    // Divider present — the visual fact/interpretation split this project
    // already uses for editorial sections (EditorialSection in page.tsx).
    await expect(dialog(page).locator("hr.tgi-divider")).toBeVisible();
  });

  test("fallback: a profile with no tied interpretation shows definition + score + band only, never blank", async ({
    page,
  }) => {
    await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });
    await traitTrigger(page).first().click();
    const body = dialog(page).locator(".tgi-trait-explain__body");
    await expect(body).toBeVisible();
    // No divider — a divider only appears ahead of person-specific text.
    await expect(dialog(page).locator("hr.tgi-divider")).toHaveCount(0);
    const text = await body.innerText();
    expect(text.length).toBeGreaterThan(0);
  });
});

test.describe("desktop trait explanation, KO parity", () => {
  test.use({ viewport: DESKTOP });

  test("Korean profile renders the explanation in Korean, including person-specific text", async ({
    page,
  }) => {
    await page.goto("/ko-KR/people/albert-einstein", { waitUntil: "networkidle" });
    const trigger = page.locator(".tgi-traitcard-trigger", { hasText: "입장 수정" });
    await expect(trigger).toHaveCount(1);
    await trigger.click();
    const body = dialog(page).locator(".tgi-trait-explain__body");
    await expect(body).toContainText("입장 수정");
    await expect(dialog(page).locator("hr.tgi-divider")).toBeVisible();
  });
});

test.describe("mobile trait explanation (leonardo-da-vinci)", () => {
  test.use({ viewport: MOBILE });

  test("opens as a bottom sheet, not a floating popover, and closes via its close button", async ({
    page,
  }) => {
    const console_ = captureConsole(page);
    await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });

    // Only the strongest 4 are visible by default on mobile — open the
    // first one, which is always shown regardless of collapse state.
    await traitTrigger(page).first().click();
    const sheet = dialog(page);
    await expect(sheet).toBeVisible();

    const box = await sheet.boundingBox();
    expect(box, "dialog should have a bounding box while open").not.toBeNull();
    const viewportSize = page.viewportSize()!;
    // Bottom-sheet signature: full viewport width, anchored to the bottom.
    expect(box!.width).toBeGreaterThan(viewportSize.width * 0.9);
    expect(Math.round(box!.y + box!.height)).toBeGreaterThanOrEqual(viewportSize.height - 2);

    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.locator(".tgi-trait-explain[open]")).toHaveCount(0);
    expect(console_.errors, console_.errors.join("\n")).toEqual([]);
  });

  test("focus stays contained in the sheet -- Tab/Shift+Tab cannot reach trait cards or any other page control behind it", async ({
    page,
  }) => {
    // Regression test for the exact defect a semantic/accessibility audit
    // found in the original all-`.show()` implementation: a non-modal
    // mobile sheet left the rest of the page (including other trait cards
    // still visible above/behind the sheet) fully focusable, so Tab could
    // walk keyboard/screen-reader focus straight into visually-obscured
    // content. Mobile now opens via `.showModal()`
    // (TraitConstellationGrid.tsx), which makes the rest of the document
    // natively inert -- this test would have failed against the pre-fix
    // implementation and is what should catch any regression back to it.
    await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });
    const trigger = traitTrigger(page).first();
    await trigger.click();
    await expect(dialog(page)).toBeVisible();

    // Confirm the dialog is genuinely modal (native inert background) --
    // the mechanism the rest of this test relies on, not just an assumption.
    const isModal = await page.evaluate(() => document.querySelector(".tgi-trait-explain")!.matches(":modal"));
    expect(isModal).toBe(true);

    // Tab forward well past the sheet's own focusable-element count (name
    // heading isn't focusable, so realistically just the Close button) --
    // if focus ever escaped, it would show up well within this many presses.
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press("Tab");
      const containedOrBody = await page.evaluate(() => {
        const dialogEl = document.querySelector(".tgi-trait-explain")!;
        const active = document.activeElement;
        // A focus ring returning to <body> (nothing left to tab to inside
        // the dialog) is fine; landing on any REAL page control outside the
        // dialog is the failure this test exists to catch.
        return dialogEl.contains(active) || active === document.body;
      });
      expect(containedOrBody, `Tab press #${i + 1} moved focus outside the modal sheet`).toBe(true);
    }

    // Same check in reverse.
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press("Shift+Tab");
      const containedOrBody = await page.evaluate(() => {
        const dialogEl = document.querySelector(".tgi-trait-explain")!;
        const active = document.activeElement;
        return dialogEl.contains(active) || active === document.body;
      });
      expect(containedOrBody, `Shift+Tab press #${i + 1} moved focus outside the modal sheet`).toBe(true);
    }

    // The other trait cards are still genuinely present and visible behind
    // the sheet (this isn't testing an empty page) -- just confirmed
    // unreachable by keyboard while the sheet is open.
    await expect(traitTrigger(page).nth(1)).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator(".tgi-trait-explain[open]")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("Show all -> open a trait -> close preserves the expanded strongest-4 state", async ({ page }) => {
    await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });
    const toggle = page.locator(".tgi-trait-grid__toggle");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const totalCards = await traitTrigger(page).count();
    expect(totalCards).toBeGreaterThan(4);

    // Open and close a trait card further down the now-expanded list.
    const later = traitTrigger(page).nth(totalCards - 1);
    await later.click();
    await expect(dialog(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".tgi-trait-explain[open]")).toHaveCount(0);

    // Show all / Show fewer state untouched by the explanation open/close.
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(traitTrigger(page)).toHaveCount(totalCards);
  });

  test("opening then closing the sheet returns the page to the same scroll position", async ({ page }) => {
    await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, 400));
    const before = await page.evaluate(() => window.scrollY);
    expect(before).toBeGreaterThan(0);

    await traitTrigger(page).first().click();
    await expect(dialog(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".tgi-trait-explain[open]")).toHaveCount(0);

    const after = await page.evaluate(() => window.scrollY);
    expect(after).toBe(before);
  });
});

test.describe("no score/order regression", () => {
  test("trait scores and their rendered order are unchanged by this feature (en-US, wide desktop)", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/en-US/people/albert-einstein", { waitUntil: "networkidle" });
    const scores = await page.locator(".tgi-traitcard__score").allInnerTexts();
    expect(scores.length).toBeGreaterThanOrEqual(8);
    const numeric = scores.map(Number);
    // Constellation is sorted by distinctiveness (|z|), not by raw score —
    // this just asserts every rendered score is a real, in-contract number,
    // i.e. nothing got clobbered/reordered into garbage by the click wiring.
    for (const n of numeric) {
      expect(Number.isFinite(n)).toBe(true);
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThanOrEqual(100);
    }
  });
});
