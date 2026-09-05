import { test, expect } from "@playwright/test";
import { captureConsole } from "./utils/visualChecks";

/**
 * Corrective coverage for the Miriam Makeba live-profile fix (2026-09).
 *
 * The prior roster11 promotion was declared production-complete on the
 * strength of data-layer checks alone (SEED_PEOPLE/peopleIndex counts,
 * validator/typecheck/unit-test passes). It had not actually been checked
 * against the browser-rendered product, and three real gaps existed there:
 * no portrait, no editorial narrative content, and an unverified claim
 * about the user-visible roster count. This suite locks the corrected,
 * browser-verified state directly, rather than trusting data-layer counts
 * to imply UI correctness.
 *
 * Count semantics (see docs/checkpoints/roster11-miriam-makeba-profile-fix.md
 * for the full writeup): the People Directory's default (unfiltered) view
 * excludes non-match-eligible people (`matchEligibleOnly` defaults to true
 * in `filterPeople` — pre-existing, intentional behavior, not something
 * this fix changed). Zheng He (`isMatchEligible: false`) has always been
 * excluded from that default view, which is why the user-visible default
 * count moved 94->95 (not 95->96, which is the internal SEED_PEOPLE/
 * peopleIndex total) when Miriam Makeba — who IS match-eligible — was
 * promoted. Both numbers are simultaneously correct; they measure
 * different things.
 */

test("people directory default (unfiltered) view shows exactly 125 people, and Miriam Makeba appears exactly once (en-US)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/people", { waitUntil: "networkidle" });

  // Total updated 95->96 (roster-12 new-intake batch, Marcus Aurelius
  // promoted via roster12.ts), then 96->107 (roster-14 coverage-aware
  // intake, 11 people promoted via roster14.ts, all match-eligible), then
  // 107->115 (roster-15 coverage-aware intake, 8 people promoted via
  // roster15.ts, all match-eligible), then 115->124 (roster-16 final
  // intake, 9 people promoted via roster16.ts, all match-eligible), then
  // 124->125 (roster-17 intake, 1 person promoted via roster17.ts, match-
  // eligible) — Miriam Makeba's own presence and count are unaffected; see
  // e2e/roster12MarcusAurelius.spec.ts for the roster-12-specific coverage.
  await expect(page.getByText(/^125 people$/)).toBeVisible();

  const cards = page.locator('a.tgi-personcard__link[href="/en-US/people/miriam-makeba"]');
  await expect(cards).toHaveCount(1);

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("Miriam Makeba's directory card is clickable and its portrait image renders (en-US)", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });

  const link = page.locator('a.tgi-personcard__link[href="/en-US/people/miriam-makeba"]');
  await expect(link).toBeVisible();

  const card = page.locator('.tgi-personcard:has(a.tgi-personcard__link[href="/en-US/people/miriam-makeba"])');
  const portrait = card.locator("img.tgi-personcard__portrait");
  await expect(portrait).toHaveCount(1);
  await expect(portrait).toHaveAttribute("src", "/portraits/miriam-makeba-grand-gala-1969.jpg");

  const response = await page.goto("/en-US/people/miriam-makeba", { waitUntil: "networkidle" });
  expect(response?.status(), "Miriam Makeba's detail route did not respond 200").toBe(200);
});

test("Miriam Makeba's detail page renders a real portrait with attribution, not the initials fallback (en-US)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/people/miriam-makeba", { waitUntil: "networkidle" });

  await expect(page.locator(".tgi-identity-hero__portrait img")).toHaveCount(1);
  await expect(page.locator(".tgi-identity-hero__placeholder")).toHaveCount(0);

  const credit = page.locator(".tgi-portrait-credit__prose");
  await expect(credit).toContainText("Rob Mieremet");
  await expect(credit).toContainText("Nationaal Archief");
  await expect(page.getByRole("link", { name: /CC0/i })).toHaveAttribute(
    "href",
    "https://commons.wikimedia.org/wiki/File:Miriam_Makeba,_Bestanddeelnr_922-1835_(cropped).jpg",
  );

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("Miriam Makeba's detail page renders meaningful editorial content (Key Achievements, Moments, Turning Points), not an empty profile (en-US)", async ({
  page,
}) => {
  await page.goto("/en-US/people/miriam-makeba", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Key Achievements" })).toBeVisible();
  await expect(page.getByText(/United Nations Special Committee on Apartheid/)).toBeVisible();

  await expect(page.getByRole("heading", { name: "Moments That Reveal Them" })).toBeVisible();
  await expect(page.getByText(/My concerts are being canceled left and right/)).toBeVisible();

  await expect(page.getByRole("heading", { name: "Turning Points" })).toBeVisible();
  await expect(page.getByText(/relocate to Guinea/)).toBeVisible();

  const bodyText = (await page.locator("main").textContent())!;
  // No raw i18n/editorial key should ever be visible — editorialText() is
  // locale-strict and omits an item rather than leaking its key.
  expect(bodyText).not.toMatch(/miriam-makeba\.(achievement|moment|turning_point|interpretation)\./);
});

test("Miriam Makeba's detail page renders meaningful editorial content in Korean, with no raw i18n keys (ko-KR)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/ko-KR/people/miriam-makeba", { waitUntil: "networkidle" });

  await expect(page.getByText(/유엔 반\(反\)아파르트헤이트 특별위원회/)).toBeVisible();
  await expect(page.getByText(/스토클리 카마이클/)).toBeVisible();
  await expect(page.getByText(/기니로 거처를 옮겼다/)).toBeVisible();

  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).not.toMatch(/miriam-makeba\.(achievement|moment|turning_point|interpretation)\./);
  expect(bodyText).not.toContain("person.name.miriam-makeba");

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});
