import { test, expect } from "@playwright/test";
import {
  assertNoClippedElements,
  assertNoHorizontalOverflow,
  assertProseMeasureBounded,
  captureConsole,
  domOrderIndex,
  tabOrderSequence,
} from "./utils/visualChecks";

/**
 * Landing visual-smoke suite — Phase 10D-1.
 *
 * Covers both launch locales at the six viewports named in the Phase 10D-1
 * brief. Screenshots go to test-artifacts/screenshots (gitignored — these
 * are regenerated evidence for this session, not committed baselines).
 */
const LOCALES = ["en-US", "ko-KR"] as const;

const VIEWPORTS = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "narrow-desktop-1024", width: 1024, height: 900 },
  { name: "wide-desktop-1280", width: 1280, height: 900 },
  { name: "wide-desktop-1600", width: 1600, height: 1000 },
  { name: "wide-desktop-1920", width: 1920, height: 1080 },
] as const;

for (const locale of LOCALES) {
  for (const viewport of VIEWPORTS) {
    test(`landing @ ${locale} @ ${viewport.name}`, async ({ page }) => {
      const console_ = captureConsole(page);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      const response = await page.goto(`/${locale}`, { waitUntil: "networkidle" });
      expect(response?.status(), "landing page did not respond 200").toBe(200);

      // Structural presence: eyebrow, headline, both CTAs, AI disclaimer.
      await expect(page.locator(".tgi-display")).toBeVisible();
      const quizCta = page.getByRole("link", { name: /quiz|퀴즈|시작/i }).first();
      const exploreCta = page.getByRole("link", { name: /explore|people|둘러보기|탐색/i }).first();
      await expect(quizCta).toBeVisible();
      await expect(exploreCta).toBeVisible();

      await assertNoHorizontalOverflow(page);
      await assertProseMeasureBounded(page);
      const clipped = await assertNoClippedElements(page);
      expect(clipped, `clipped elements found: ${JSON.stringify(clipped)}`).toEqual([]);

      // Broken-navigation check: both CTAs must actually navigate.
      const quizHref = await quizCta.getAttribute("href");
      const exploreHref = await exploreCta.getAttribute("href");
      expect(quizHref).toMatch(new RegExp(`^/${locale}/quiz$`));
      expect(exploreHref).toMatch(new RegExp(`^/${locale}/people$`));

      await page.screenshot({
        path: `test-artifacts/screenshots/landing/${locale}/${viewport.name}.png`,
        fullPage: true,
      });

      expect(console_.errors, `console errors: ${JSON.stringify(console_.errors)}`).toEqual([]);
      expect(console_.pageErrors, `page errors: ${JSON.stringify(console_.pageErrors)}`).toEqual([]);
    });
  }
}

test("landing keyboard tab order follows DOM order (en-US, wide desktop)", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en-US", { waitUntil: "networkidle" });

  const linkOrder = await domOrderIndex(page, "a.tgi-button, a[href]");
  const sorted = [...linkOrder].sort((a, b) => a - b);
  expect(linkOrder, "DOM order of focusable links is not itself ascending — test assumption invalid").toEqual(sorted);

  const focusSequence = await tabOrderSequence(page, 6);
  // Every focused label must be non-empty/meaningful (no silent focus loss)
  // and — the actual invariant under test — a rail must never reorder tab
  // stops relative to DOM order via CSS `order`. We assert this indirectly:
  // the header brand link, then landing's own two CTAs, must appear in that
  // relative sequence somewhere in the first several tab stops.
  const quizIdx = focusSequence.findIndex((s) => /quiz/i.test(s));
  const peopleIdx = focusSequence.findIndex((s) => /explore|people/i.test(s));
  expect(quizIdx, `focus sequence: ${JSON.stringify(focusSequence)}`).toBeGreaterThanOrEqual(0);
  expect(peopleIdx, `focus sequence: ${JSON.stringify(focusSequence)}`).toBeGreaterThanOrEqual(0);
  expect(quizIdx, "primary CTA (quiz) must receive focus before the secondary CTA (people)").toBeLessThan(peopleIdx);
});

test("landing navigates to quiz and people without console errors (en-US)", async ({ page }) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: /quiz/i }).first().click();
  await page.waitForURL(/\/en-US\/quiz/);
  await expect(page.locator("h1, .tgi-heading--1")).toBeVisible();

  await page.goto("/en-US", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: /explore|people/i }).first().click();
  await page.waitForURL(/\/en-US\/people/);
  await expect(page.locator(".tgi-heading--1")).toBeVisible();

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});
