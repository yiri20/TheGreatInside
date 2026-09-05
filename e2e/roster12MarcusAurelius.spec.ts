import { test, expect } from "@playwright/test";
import { captureConsole } from "./utils/visualChecks";

/**
 * Roster-12 new-intake batch (2026-09): Marcus Aurelius promotion coverage.
 *
 * Marcus Aurelius was the sole product-ready promotion from a 15-candidate
 * frozen intake batch (2 crossed eligibility_v2 honestly on first score —
 * Marcus Aurelius and Che Guevara — but Che Guevara's promotion is deferred
 * pending a rights-clear portrait). This suite locks the same product-
 * completeness bar the Miriam Makeba corrective fix established: portrait,
 * working detail route, and complete EN/KO editorial content, verified
 * directly in the browser rather than assumed from data-layer counts alone.
 */

test("people directory default (unfiltered) view shows exactly 125 people, and Marcus Aurelius appears exactly once (en-US)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/people", { waitUntil: "networkidle" });

  // Total updated 96->107 (roster-14 coverage-aware intake, 11 people
  // promoted via roster14.ts, all match-eligible), then 107->115
  // (roster-15 coverage-aware intake, 8 people promoted via roster15.ts,
  // all match-eligible), then 115->124 (roster-16 final intake, 9 people
  // promoted via roster16.ts, all match-eligible), then 124->125
  // (roster-17 intake, 1 person promoted via roster17.ts, match-eligible)
  // — Marcus Aurelius's own presence and count are unaffected.
  await expect(page.getByText(/^125 people$/)).toBeVisible();

  const cards = page.locator('a.tgi-personcard__link[href="/en-US/people/marcus-aurelius"]');
  await expect(cards).toHaveCount(1);

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("Marcus Aurelius's directory card is clickable and its portrait image renders (en-US)", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });

  const link = page.locator('a.tgi-personcard__link[href="/en-US/people/marcus-aurelius"]');
  await expect(link).toBeVisible();

  const card = page.locator('.tgi-personcard:has(a.tgi-personcard__link[href="/en-US/people/marcus-aurelius"])');
  const portrait = card.locator("img.tgi-personcard__portrait");
  await expect(portrait).toHaveCount(1);
  await expect(portrait).toHaveAttribute("src", "/portraits/marcus-aurelius-louvre-bust.jpg");

  const response = await page.goto("/en-US/people/marcus-aurelius", { waitUntil: "networkidle" });
  expect(response?.status(), "Marcus Aurelius's detail route did not respond 200").toBe(200);
});

test("Marcus Aurelius's detail page renders a real portrait with attribution, not the initials fallback (en-US)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/people/marcus-aurelius", { waitUntil: "networkidle" });

  await expect(page.locator(".tgi-identity-hero__portrait img")).toHaveCount(1);
  await expect(page.locator(".tgi-identity-hero__placeholder")).toHaveCount(0);

  const credit = page.locator(".tgi-portrait-credit__prose");
  await expect(credit).toContainText("Marie-Lan Nguyen");
  await expect(credit).toContainText("Louvre");
  await expect(page.getByRole("link", { name: /CC BY 2\.5/i })).toHaveAttribute(
    "href",
    "https://commons.wikimedia.org/wiki/File:Marcus_Aurelius_Louvre_MR561_n02.jpg",
  );

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("Marcus Aurelius's detail page renders meaningful editorial content (Key Achievements, Moments, Turning Points), not an empty profile (en-US)", async ({
  page,
}) => {
  await page.goto("/en-US/people/marcus-aurelius", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Key Achievements" })).toBeVisible();
  await expect(page.getByText(/never intended for publication/)).toBeVisible();

  await expect(page.getByRole("heading", { name: "Moments That Reveal Them" })).toBeVisible();
  await expect(page.getByText(/Avidius Cassius declared himself emperor/)).toBeVisible();

  await expect(page.getByRole("heading", { name: "Turning Points" })).toBeVisible();
  await expect(page.getByText(/Danube frontier for years/)).toBeVisible();

  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).not.toMatch(/marcus-aurelius\.(achievement|moment|turning_point|interpretation)\./);
});

test("Marcus Aurelius's detail page renders meaningful editorial content in Korean, with no raw i18n keys (ko-KR)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/ko-KR/people/marcus-aurelius", { waitUntil: "networkidle" });

  await expect(page.getByText(/명상록/).first()).toBeVisible();
  await expect(page.getByText(/아비디우스 카시우스/)).toBeVisible();
  await expect(page.getByText(/다뉴브강의 위험한 전선/)).toBeVisible();

  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).not.toMatch(/marcus-aurelius\.(achievement|moment|turning_point|interpretation)\./);
  expect(bodyText).not.toContain("person.name.marcus-aurelius");

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});
