import { test, expect } from "@playwright/test";
import { assertHeadingHierarchy, assertNoHorizontalOverflow, captureConsole } from "./utils/visualChecks";

/**
 * People Directory — Public Beta Finish Line heading-hierarchy coverage
 * (see CLAUDE.md "Public Beta Finish Line"). Before this fix, the page had
 * only an h1 ("Explore Great Minds") with no h2 at all, then every
 * `PersonCard` rendered an h3 directly beneath it — a skipped level. Fixed
 * with a visually-hidden h2 ("Results" / "결과") immediately before the
 * results grid; `PersonCard`'s own `<h3>` is unchanged (shared across
 * Results/Compare/Person, not safe to alter globally).
 */
const LOCALES = ["en-US", "ko-KR"] as const;

for (const locale of LOCALES) {
  test(`people directory @ ${locale}: renders, correct heading hierarchy, no overflow`, async ({ page }) => {
    const console_ = captureConsole(page);
    const response = await page.goto(`/${locale}/people`, { waitUntil: "networkidle" });
    expect(response?.status(), "people directory did not respond 200").toBe(200);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".tgi-personcard").first()).toBeVisible();

    // The new sr-only heading must be present in the accessibility tree
    // (real h2 element) but not visually occupy layout space.
    const hidden = page.locator(".tgi-visually-hidden h2");
    await expect(hidden).toHaveCount(1);
    const box = await hidden.boundingBox();
    // A clip-rect sr-only element still reports a bounding box in most
    // browsers, but it must not be large enough to visibly displace layout.
    if (box) {
      expect(box.width).toBeLessThanOrEqual(2);
    }

    await assertHeadingHierarchy(page);
    await assertNoHorizontalOverflow(page);

    expect(console_.errors, `console errors: ${JSON.stringify(console_.errors)}`).toEqual([]);
    expect(console_.pageErrors, `page errors: ${JSON.stringify(console_.pageErrors)}`).toEqual([]);
  });
}

test("people directory: heading hierarchy still holds with an active search filter (en-US)", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await page.getByPlaceholder(/search/i).fill("da vinci");
  await page.waitForTimeout(150);
  await assertHeadingHierarchy(page);
});

test("people directory: heading hierarchy still holds on the empty-results state (en-US)", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await page.getByPlaceholder(/search/i).fill("zzzzzzzznotarealperson");
  await page.waitForTimeout(150);
  await expect(page.getByText(/no one matches/i)).toBeVisible();
  await assertHeadingHierarchy(page);
});

/**
 * 95-person launch-readiness pass (2026-08): the directory's full-roster
 * grid never got the mobile discovery-grid density treatment Results/Saved
 * Result/Person's Similar People already had (Phase 10D-3/Stage 5) — at 94
 * match-eligible cards, a single mobile column measured ~53,000px tall.
 * Same shared `.tgi-results-discovery-grid` class, same pattern as
 * `person.visual.spec.ts`'s Similar People pair below.
 */
test("people directory grid uses the discovery-grid class and renders 2 columns at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1400 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const grid = await page.evaluate(() => {
    const g = document.querySelector(".tgi-grid");
    if (!g) return null;
    return {
      hasClass: g.classList.contains("tgi-results-discovery-grid"),
      columns: getComputedStyle(g).gridTemplateColumns.trim().split(/\s+/).length,
    };
  });
  expect(grid, "directory grid not found").not.toBeNull();
  expect(grid!.hasClass, "directory Grid should carry the shared discovery-grid class").toBe(true);
  expect(grid!.columns, "directory should render exactly 2 columns at 390px").toBe(2);
  await assertNoHorizontalOverflow(page);
});

test("people directory grid is NOT forced to 2 columns at 1024px+ (discovery-grid only overrides <=640px)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 1000 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const columns = await page.evaluate(() => {
    const g = document.querySelector(".tgi-grid");
    return g ? getComputedStyle(g).gridTemplateColumns.trim().split(/\s+/).length : null;
  });
  expect(columns).not.toBeNull();
  expect(columns!, "directory grid must not be pinned to 2 columns above the discovery-grid breakpoint").toBeGreaterThan(2);
});
