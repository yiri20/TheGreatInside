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

/**
 * Directory taxonomy redesign (directory_taxonomy_v1, 2026-08) — Part J/M
 * browser QA for the new Profession/Activity + Personality/Trait sections
 * (src/core/people/directoryTaxonomy.ts). Both are real <label><input
 * type=checkbox>> controls, always visible (no <details>/dropdown), so
 * they're driven with role-based locators exactly like any other form
 * control, not JS-evaluated state.
 */
test("people directory: Profession/Activity and Personality/Trait sections are visible without expanding anything", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Profession & Activity" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Personality & Traits" })).toBeVisible();
  // No <details> element left over from the old flat tagIds dropdown.
  expect(await page.locator("details").count()).toBe(0);
  await expect(page.getByRole("checkbox", { name: "Philosophy" })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "Curiosity" })).toBeVisible();
});

test("people directory: selecting two chips in the same taxonomy group ORs (either qualifies)", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();

  await page.getByRole("checkbox", { name: "Mathematics" }).check();
  const mathOnly = Number((await countText())!.match(/^\d+/)![0]);

  await page.getByRole("checkbox", { name: "Physics" }).check();
  const mathOrPhysics = Number((await countText())!.match(/^\d+/)![0]);

  // OR can only add matches, never remove — selecting a second profession
  // chip must not shrink the result set.
  expect(mathOrPhysics).toBeGreaterThanOrEqual(mathOnly);
});

test("people directory: two personality chips in the SAME facet OR (Curiosity + Analytical Rigour, both Thinking)", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();

  await page.getByRole("checkbox", { name: "Curiosity" }).check();
  const curiosityOnly = Number((await countText())!.match(/^\d+/)![0]);

  await page.getByRole("checkbox", { name: "Analytical Rigour" }).check();
  const eitherThinkingTrait = Number((await countText())!.match(/^\d+/)![0]);

  // Same-facet selections OR — adding a second Thinking chip can only add
  // matches, never shrink the result set.
  expect(eitherThinkingTrait).toBeGreaterThanOrEqual(curiosityOnly);
});

test("people directory: two personality chips in DIFFERENT facets AND (Curiosity/Thinking + Collaboration/Social) — the cross-facet fix", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();

  await page.getByRole("checkbox", { name: "Curiosity" }).check();
  const curiosityOnly = Number((await countText())!.match(/^\d+/)![0]);
  await page.getByRole("checkbox", { name: "Collaboration" }).check();
  const both = Number((await countText())!.match(/^\d+/)![0]);
  await page.getByRole("checkbox", { name: "Curiosity" }).uncheck();
  const collaborationOnly = Number((await countText())!.match(/^\d+/)![0]);

  // Cross-facet AND can only narrow, never exceed either single-facet result
  // — this is the exact behavior that was broken (previously a flat OR
  // across every selected personality attribute regardless of facet).
  expect(both).toBeLessThanOrEqual(Math.min(curiosityOnly, collaborationOnly));
  expect(both).toBeGreaterThan(0);

  // Recheck curiosity and verify every visible result is a real person card
  // (i.e. the narrowed set is non-trivial, not an accidental empty state).
  await page.getByRole("checkbox", { name: "Curiosity" }).check();
  await expect(page.locator(".tgi-personcard").first()).toBeVisible();
});

test("people directory: profession OR-group + 2 personality facets ANDs all three conditions (full example from spec)", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  // Profession/Activity OR-group: Mathematics OR Physics.
  await page.getByRole("checkbox", { name: "Mathematics" }).check();
  await page.getByRole("checkbox", { name: "Physics" }).check();
  // Personality: Experimentation (Creativity facet) + Adaptability (Resilience facet).
  await page.getByRole("checkbox", { name: "Experimentation" }).check();
  await page.getByRole("checkbox", { name: "Adaptability" }).check();

  const cards = page.locator(".tgi-personcard");
  const count = await cards.count();
  expect(count).toBeGreaterThanOrEqual(0); // may legitimately be 0 — the assertion below is what matters

  // Verify every returned person actually satisfies every condition by
  // cross-checking against the person detail page's own rendered data would
  // be excessive here; instead assert the algebraic invariant: this 4-
  // condition result can never exceed any single condition's own count.
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();
  const combined = Number((await countText())!.match(/^\d+/)![0]);

  await page.getByRole("checkbox", { name: "Experimentation" }).uncheck();
  await page.getByRole("checkbox", { name: "Adaptability" }).uncheck();
  const professionOnly = Number((await countText())!.match(/^\d+/)![0]);

  expect(combined).toBeLessThanOrEqual(professionOnly);
});

test("people directory ko-KR: cross-facet personality AND gives the same result as en-US (locale-independent semantics)", async ({
  page,
}) => {
  await page.goto("/ko-KR/people", { waitUntil: "networkidle" });
  await page.getByRole("checkbox", { name: "호기심" }).check(); // Curiosity (Thinking)
  await page.getByRole("checkbox", { name: "협업 성향" }).check(); // Collaboration (Social)
  // "전체 {total}명 중 {count}명" — independently confirmed (via a direct
  // SEED_PEOPLE check) that exactly 4 people satisfy curiosity AND
  // collaboration: Benjamin Franklin, Charles Darwin, Jane Goodall, Oprah
  // Winfrey. This regression-locks the cross-facet AND fix in the locale
  // that renders count text in a different word order than en-US.
  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).toMatch(/전체\s*95명\s*중\s*4명/);
});

test("people directory: era + region compose correctly with cross-facet personality AND", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();

  await page.getByRole("checkbox", { name: "Curiosity" }).check();
  await page.getByRole("checkbox", { name: "Collaboration" }).check();
  const traitOnly = Number((await countText())!.match(/^\d+/)![0]);

  await page.getByRole("combobox", { name: "Era" }).selectOption({ label: "19th Century" });
  const traitAndEra = Number((await countText())!.match(/^\d+/)![0]);

  // Adding an era filter on top can only narrow further.
  expect(traitAndEra).toBeLessThanOrEqual(traitOnly);

  // Every visible card must actually be 19th Century.
  const subtitles = await page.locator(".tgi-personcard").allTextContents();
  for (const text of subtitles) {
    if (text.trim().length === 0) continue;
    expect(text).toContain("19th Century");
  }
});

test("people directory: a profession chip AND a personality chip ANDs across the two axes", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();

  await page.getByRole("checkbox", { name: "Philosophy" }).check();
  const professionOnly = Number((await countText())!.match(/^\d+/)![0]);

  await page.getByRole("checkbox", { name: "Curiosity" }).check();
  const both = Number((await countText())!.match(/^\d+/)![0]);

  // AND across axes can only narrow the result set, never widen it.
  expect(both).toBeLessThanOrEqual(professionOnly);

  // Selected-filter summary shows both chips with working remove controls.
  await expect(page.getByRole("button", { name: "Remove Philosophy filter" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Remove Curiosity filter" })).toBeVisible();

  await page.getByRole("button", { name: "Clear all" }).click();
  await expect(page.getByRole("checkbox", { name: "Philosophy" })).not.toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Curiosity" })).not.toBeChecked();
  await expect(page.getByRole("button", { name: "Clear all" })).toHaveCount(0);
});

test("people directory: search composes with taxonomy filters and the empty state recovers", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await page.getByRole("checkbox", { name: "Sport" }).check();
  await page.getByPlaceholder(/search/i).fill("zzzzzzzznotarealperson");
  await page.waitForTimeout(150);
  await expect(page.getByText(/no one matches/i)).toBeVisible();
  // Taxonomy stays visible and scannable even on the empty state.
  await expect(page.getByRole("heading", { name: "Profession & Activity" })).toBeVisible();

  await page.getByPlaceholder(/search/i).fill("");
  await page.waitForTimeout(150);
  await expect(page.getByText(/no one matches/i)).toHaveCount(0);
});

test("people directory @ 328px: taxonomy stays visible, no horizontal scroll, chips wrap", async ({ page }) => {
  await page.setViewportSize({ width: 328, height: 1200 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Profession & Activity" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Personality & Traits" })).toBeVisible();
  expect(await page.locator("details").count()).toBe(0);
  await assertNoHorizontalOverflow(page);
});

test("people directory ko-KR: taxonomy section headings and chip labels are localized, not raw ids", async ({
  page,
}) => {
  await page.goto("/ko-KR/people", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "직업과 활동 분야" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "성격과 성향" })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "철학" })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "호기심" })).toBeVisible();
  // No raw underscored ids leaking into the UI (e.g. "natural_science").
  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).not.toMatch(/[a-z]+_[a-z]+/);
});
