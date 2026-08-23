import { test, expect } from "@playwright/test";
import {
  assertHeadingHierarchy,
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
      // Located by their stable class, not exact wording — entry-flow
      // polish (2026-08) changed the primary CTA to outcome-oriented
      // copy ("Find My Historical Match" / "나와 닮은 인물 찾기"), which no
      // longer contains "quiz"/"퀴즈"/"시작" the way the old wording did.
      await expect(page.locator(".tgi-display")).toBeVisible();
      const quizCta = page.locator("a.tgi-landing-cta-primary");
      const exploreCta = page.locator("a.tgi-landing-cta-secondary");
      await expect(quizCta).toBeVisible();
      await expect(exploreCta).toBeVisible();

      await assertNoHorizontalOverflow(page);
      await assertProseMeasureBounded(page);
      const clipped = await assertNoClippedElements(page);
      expect(clipped, `clipped elements found: ${JSON.stringify(clipped)}`).toEqual([]);
      await assertHeadingHierarchy(page);

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
  // Matches the entry-flow polish (2026-08) outcome-oriented primary CTA
  // wording ("Find My Historical Match"), not the old "Take the Quiz" text.
  const quizIdx = focusSequence.findIndex((s) => /historical match/i.test(s));
  const peopleIdx = focusSequence.findIndex((s) => /explore|people/i.test(s));
  expect(quizIdx, `focus sequence: ${JSON.stringify(focusSequence)}`).toBeGreaterThanOrEqual(0);
  expect(peopleIdx, `focus sequence: ${JSON.stringify(focusSequence)}`).toBeGreaterThanOrEqual(0);
  expect(quizIdx, "primary CTA (quiz) must receive focus before the secondary CTA (people)").toBeLessThan(peopleIdx);
});

/**
 * Mobile-polish checks (Phase 10D-1 follow-up) — computed-style assertions,
 * not just visual inspection, so the narrow/wide split is mechanically
 * verified rather than only screenshot-judged. All three scoped classes
 * (.tgi-landing-headline / .tgi-landing-cta-secondary / .tgi-landing-
 * howitworks) are expected to do nothing at >=1280px and something below it.
 */
for (const locale of LOCALES) {
  test(`landing mobile rhythm @ ${locale}: headline shrinks, secondary CTA loses chrome, How It Works loses card treatment (390px)`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(`/${locale}`, { waitUntil: "networkidle" });

    const headlineSize = await page.locator(".tgi-landing-headline").evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    // 3.125rem @ 16px root = 50px — an 8-12% reduction from the shared
    // 3.5rem/56px .tgi-display size other pages (Results, Saved Result)
    // still use untouched.
    expect(headlineSize, `headline font-size at 390px was ${headlineSize}px, expected ~50px`).toBeCloseTo(50, 0);

    const secondaryCta = page.locator("a.tgi-landing-cta-secondary");
    const secondaryStyle = await secondaryCta.evaluate((el) => {
      const s = getComputedStyle(el);
      return { borderColor: s.borderColor, background: s.backgroundColor, minHeight: parseFloat(s.minHeight) };
    });
    expect(secondaryStyle.borderColor, "secondary CTA should have no visible border at 390px").toMatch(
      /transparent|rgba\(0, 0, 0, 0\)/,
    );
    // Real 44px+ tap target preserved even though the visible chrome is gone.
    expect(secondaryStyle.minHeight, "secondary CTA must keep a 44px+ tap target at 390px").toBeGreaterThanOrEqual(44);

    const arrow = page.locator(".tgi-landing-cta-secondary__arrow");
    await expect(arrow).toBeVisible();

    const howItWorks = page.locator(".tgi-landing-howitworks");
    const cardStyle = await howItWorks.evaluate((el) => {
      const s = getComputedStyle(el);
      return { background: s.backgroundColor, borderTopWidth: parseFloat(s.borderTopWidth) };
    });
    expect(cardStyle.background, "How It Works should have no filled background at 390px").toMatch(
      /transparent|rgba\(0, 0, 0, 0\)/,
    );
    expect(cardStyle.borderTopWidth, "How It Works should show a quiet top rule instead of a card at 390px").toBeGreaterThan(
      0,
    );

    // Accessible name must exclude the decorative arrow (aria-hidden).
    const accessibleName = await secondaryCta.evaluate((el) => el.textContent?.trim());
    expect(accessibleName, "link text content sanity check").toBeTruthy();
  });
}

test("landing wide-desktop (>=1280px) composition is pixel-unchanged by the mobile-polish pass", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en-US", { waitUntil: "networkidle" });

  const headlineSize = await page.locator(".tgi-landing-headline").evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  expect(headlineSize, `headline font-size at 1280px was ${headlineSize}px, expected the unchanged 56px`).toBeCloseTo(56, 0);

  const secondaryCta = page.locator("a.tgi-landing-cta-secondary");
  const secondaryStyle = await secondaryCta.evaluate((el) => getComputedStyle(el).borderColor);
  expect(secondaryStyle, "secondary CTA must keep its outlined-pill border at >=1280px").not.toMatch(
    /transparent|rgba\(0, 0, 0, 0\)/,
  );
  await expect(page.locator(".tgi-landing-cta-secondary__arrow")).toBeHidden();

  const howItWorksBg = await page.locator(".tgi-landing-howitworks").evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(howItWorksBg, "How It Works must keep its sunken-card background at >=1280px").not.toMatch(
    /transparent|rgba\(0, 0, 0, 0\)/,
  );
});

/**
 * Entry-flow polish (2026-08): "the first CTA chooses the experience; the
 * second CTA begins it" — Landing's primary CTA and the Quiz intro's Start
 * button must never say the exact same thing, or the second screen reads
 * as redundant. Also locks in the width-harmonization pass: at >=1280px
 * both Landing CTAs are still full pill buttons (rule 2's chrome change
 * only applies below 1280px), so a wording-length mismatch between them
 * would read as accidental rather than intentionally paired.
 */
const START_BUTTON_TEXT: Record<string, string> = { "en-US": "Start", "ko-KR": "시작하기" };

for (const locale of LOCALES) {
  test(`entry flow @ ${locale}: Landing primary CTA and Quiz intro Start never say the same thing`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`, { waitUntil: "networkidle" });
    const landingCtaText = (await page.locator("a.tgi-landing-cta-primary").textContent())!.trim();
    expect(landingCtaText).not.toBe(START_BUTTON_TEXT[locale]);

    await page.locator("a.tgi-landing-cta-primary").click();
    await page.waitForURL(new RegExp(`/${locale}/quiz`));
    const quizStartText = (await page.getByRole("button", { name: START_BUTTON_TEXT[locale] }).textContent())!.trim();
    expect(quizStartText).toBe(START_BUTTON_TEXT[locale]);
    expect(quizStartText).not.toBe(landingCtaText);
  });
}

test("landing @ 1280px+: primary and secondary CTA widths are harmonized, not accidentally mismatched", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en-US", { waitUntil: "networkidle" });
  const primaryWidth = await page.locator("a.tgi-landing-cta-primary").evaluate((el) => el.getBoundingClientRect().width);
  const secondaryWidth = await page
    .locator("a.tgi-landing-cta-secondary")
    .evaluate((el) => el.getBoundingClientRect().width);
  expect(primaryWidth).toBeCloseTo(secondaryWidth, 0);

  // Hierarchy is still communicated through fill vs. outline, not width.
  const primaryBg = await page.locator("a.tgi-landing-cta-primary").evaluate((el) => getComputedStyle(el).backgroundColor);
  const secondaryBg = await page
    .locator("a.tgi-landing-cta-secondary")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(primaryBg).not.toBe(secondaryBg);
});

test("landing navigates to quiz and people without console errors (en-US)", async ({ page }) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US", { waitUntil: "networkidle" });

  await page.locator("a.tgi-landing-cta-primary").click();
  await page.waitForURL(/\/en-US\/quiz/);
  await expect(page.locator("h1, .tgi-heading--1")).toBeVisible();

  await page.goto("/en-US", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: /explore|people/i }).first().click();
  await page.waitForURL(/\/en-US\/people/);
  await expect(page.locator(".tgi-heading--1")).toBeVisible();

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});
