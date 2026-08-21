import { test, expect } from "@playwright/test";
import { assertHeadingHierarchy, assertNoHorizontalOverflow, captureConsole } from "./utils/visualChecks";

/**
 * Editorial-depth pilot suite. Covers the 3 new person-page sections
 * (Key Achievements / Moments That Reveal Them / Turning Points), the
 * fact-vs-interpretation distinction, graceful omission for people with no
 * editorial content yet, locale-strict (no English-fallback) behavior, and
 * the Results -> Profile "why you're here" banner. Not a full 10-person
 * matrix — person.visual.spec.ts already covers responsive/overflow/DOM
 * order broadly; this suite is scoped to the NEW editorial behavior itself.
 */

test.describe("Editorial sections — present for a pilot person", () => {
  test("da Vinci (en-US) renders all three editorial sections in order, valid heading hierarchy", async ({ page }) => {
    const errors = captureConsole(page);
    await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });

    const headings = await page.locator("h1, h2, h3").allTextContents();
    const idx = (needle: string) => headings.findIndex((h) => h.includes(needle));
    expect(idx("Trait Constellation")).toBeGreaterThanOrEqual(0);
    expect(idx("Key Achievements")).toBeGreaterThan(idx("Trait Constellation"));
    expect(idx("Moments That Reveal Them")).toBeGreaterThan(idx("Key Achievements"));
    expect(idx("Turning Points")).toBeGreaterThan(idx("Moments That Reveal Them"));
    expect(idx("Similar People")).toBeGreaterThan(idx("Turning Points"));

    await assertHeadingHierarchy(page);
    expect(errors.errors, "no console errors").toEqual([]);
    expect(errors.pageErrors, "no page errors").toEqual([]);
  });

  test("fact and interpretation are textually distinguished, not color-only", async ({ page }) => {
    await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });
    const bodyText = await page.locator("main").innerText();
    // The interpretation label itself is real, visible text — not merely a
    // CSS class — so a screen reader or a colorblind reader gets the same
    // distinction a sighted reader gets from the muted tone.
    expect(bodyText).toContain("What this reveals:");
    // Calibrated language, never a diagnostic claim.
    expect(bodyText).toMatch(/is consistent with|helps explain/);
  });

  test("an interpretation with an attributeId renders a trait reference chip", async ({ page }) => {
    await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });
    // leonardo-da-vinci-moment-1's interpretation is tied to opportunity_sensing.
    const chip = page.locator(".tgi-chip", { hasText: /Opportunity/i });
    await expect(chip.first()).toBeVisible();
  });
});

test.describe("Editorial sections — graceful absence for a non-pilot person", () => {
  test("richard-feynman (no editorial content yet) shows none of the three headings and no orphan dividers", async ({
    page,
  }) => {
    await page.goto("/en-US/people/richard-feynman", { waitUntil: "networkidle" });
    const headings = await page.locator("h2").allTextContents();
    expect(headings.some((h) => h.includes("Key Achievements"))).toBe(false);
    expect(headings.some((h) => h.includes("Moments That Reveal Them"))).toBe(false);
    expect(headings.some((h) => h.includes("Turning Points"))).toBe(false);
    // Base page still has exactly 3 dividers (hero, constellation, sources) —
    // no empty editorial block was rendered, per the "no awkward blank
    // sections for missing optional fields" requirement.
    const dividerCount = await page.locator(".tgi-divider").count();
    expect(dividerCount).toBe(3);
  });
});

test.describe("Editorial sections — locale-strict, no silent English fallback", () => {
  test("Korean page shows real Korean editorial prose, not the English text", async ({ page }) => {
    await page.goto("/ko-KR/people/leonardo-da-vinci", { waitUntil: "networkidle" });
    const bodyText = await page.locator("main").innerText();
    expect(bodyText).toContain("주요 업적"); // Key Achievements heading, Korean
    expect(bodyText).toContain("이것이 보여주는 것:"); // interpretation label, Korean
    // The specific English achievement sentence must not leak onto the
    // Korean page for an item that has a real Korean translation.
    expect(bodyText).not.toContain("Left behind thousands of notebook pages");
  });

  test("no horizontal overflow on the Korean pilot page at narrow and wide widths", async ({ page }) => {
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/ko-KR/people/marie-curie", { waitUntil: "networkidle" });
      await assertNoHorizontalOverflow(page);
    }
  });
});

test.describe("Results -> Profile connection (MatchContextBanner)", () => {
  test("banner renders the trait name when why=match&trait=... is present", async ({ page }) => {
    await page.goto("/en-US/people/leonardo-da-vinci?why=match&trait=persistence", { waitUntil: "networkidle" });
    const bodyText = await page.locator("main").innerText();
    expect(bodyText).toMatch(/close match here.*Persistence/s);
  });

  test("banner renders nothing on a direct visit with no query params", async ({ page }) => {
    await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });
    const bodyText = await page.locator("main").innerText();
    expect(bodyText).not.toContain("You're looking at this profile because");
  });

  test("banner ignores an invalid/unknown trait id rather than crashing", async ({ page }) => {
    const errors = captureConsole(page);
    await page.goto("/en-US/people/leonardo-da-vinci?why=match&trait=not_a_real_trait", { waitUntil: "networkidle" });
    const bodyText = await page.locator("main").innerText();
    expect(bodyText).not.toContain("You're looking at this profile because");
    expect(errors.errors).toEqual([]);
    expect(errors.pageErrors).toEqual([]);
  });

  test("Results' Closest Match link to the person page carries why=match&trait=...", async ({ page }) => {
    // Reuses results.visual.spec.ts's own "neutral" synthetic, deterministic
    // fixture (encodeResultToken against a fixed answer pattern) — never
    // real user data, never a token invented for this test.
    const NEUTRAL_FIXTURE = "quiz_v2.a444a44a444a4a444444a44444a44aa44a4444a4444a4a4444a4444444444444";
    await page.goto(`/en-US/results?r=${encodeURIComponent(NEUTRAL_FIXTURE)}`, { waitUntil: "networkidle" });
    const href = await page.locator('a:has-text("View Profile")').first().getAttribute("href");
    expect(href).not.toBeNull();
    expect(href).toContain("why=match");
    expect(href).toMatch(/trait=[a-z_]+/);
  });
});
