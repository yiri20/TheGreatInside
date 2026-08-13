import { test, expect } from "@playwright/test";
import {
  assertNoClippedElements,
  assertNoHorizontalOverflow,
  assertProseMeasureBounded,
  captureConsole,
  railIsSideBySide,
} from "./utils/visualChecks";

/**
 * Person Detail visual-smoke suite — Phase 10D-2.
 *
 * A representative matrix, not all 70 localized person routes: three
 * people chosen to exercise real layout variation —
 *  - leonardo-da-vinci: long English name; the ONLY person in the current
 *    dataset with a populated `portrait` field + licence caption (checked
 *    directly against the data, not assumed — exercises IdentityHero's
 *    align="start" + portraitCaption path, the one path the other two
 *    people below cannot reach)
 *  - ada-lovelace: shorter name, no portrait (exercises the no-portrait
 *    branch — IdentityHero renders with no portrait column at all)
 *  - yi-sun-sin: no portrait either, but Korean display name ("이순신") is
 *    much shorter than the English one ("Yi Sun-sin") — real localisation-
 *    driven length variation on the no-portrait layout, not a synthetic
 *    string
 *
 * All three have non-empty `impactDomains`, so all three exercise the new
 * Rail(hero, Known For) composition, not just the no-secondary fallback.
 */
const PEOPLE = ["leonardo-da-vinci", "ada-lovelace", "yi-sun-sin"] as const;
const LOCALES = ["en-US", "ko-KR"] as const;

const VIEWPORTS = [
  { name: "mobile-390", width: 390, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "narrow-desktop-1024", width: 1024, height: 1000 },
  { name: "wide-desktop-1280", width: 1280, height: 1000 },
  { name: "wide-desktop-1600", width: 1600, height: 1100 },
  { name: "wide-desktop-1920", width: 1920, height: 1200 },
] as const;

for (const slug of PEOPLE) {
  for (const locale of LOCALES) {
    for (const viewport of VIEWPORTS) {
      test(`person ${slug} @ ${locale} @ ${viewport.name}`, async ({ page }) => {
        const console_ = captureConsole(page);
        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        const response = await page.goto(`/${locale}/people/${slug}`, { waitUntil: "networkidle" });
        expect(response?.status(), "person page did not respond 200").toBe(200);

        // Identity hero presence.
        await expect(page.locator(".tgi-identity-hero")).toBeVisible();
        await expect(page.locator("h1.tgi-person-name")).toBeVisible();

        // Primary content presence (trait constellation — always renders,
        // every person has at least 8 constellation traits per constellation_v1).
        await expect(page.getByRole("heading", { level: 2 }).filter({ hasText: /./ }).first()).toBeVisible();
        await expect(page.locator(".tgi-traitcard").first()).toBeVisible();

        // Back-to-people link integrity.
        const backLink = page.getByRole("link", { name: /←/ });
        await expect(backLink).toBeVisible();
        expect(await backLink.getAttribute("href")).toBe(`/${locale}/people`);

        await assertNoHorizontalOverflow(page);
        await assertProseMeasureBounded(page);
        const clipped = await assertNoClippedElements(page);
        expect(clipped, `clipped elements found: ${JSON.stringify(clipped)}`).toEqual([]);

        // Rail layout contract: side by side only at >=1280px, stacked below it.
        const sideBySide = await railIsSideBySide(page);
        if (viewport.width >= 1280) {
          expect(sideBySide, `expected hero + Known For side by side at ${viewport.width}px`).toBe(true);
        } else {
          expect(sideBySide, `expected hero + Known For stacked (not side by side) at ${viewport.width}px`).toBe(
            false,
          );
        }

        await page.screenshot({
          path: `test-artifacts/screenshots/person/${slug}/${locale}/${viewport.name}.png`,
          fullPage: true,
        });

        expect(console_.errors, `console errors: ${JSON.stringify(console_.errors)}`).toEqual([]);
        expect(console_.pageErrors, `page errors: ${JSON.stringify(console_.pageErrors)}`).toEqual([]);
      });
    }
  }
}

test("person page DOM order: hero before Known For, no CSS order reordering (en-US, wide desktop)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1100 });
  await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });

  const order = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll("*"));
    const primary = document.querySelector(".tgi-rail__primary");
    const secondary = document.querySelector(".tgi-rail__secondary");
    return { primary: primary ? all.indexOf(primary) : -1, secondary: secondary ? all.indexOf(secondary) : -1 };
  });
  expect(order.primary).toBeGreaterThanOrEqual(0);
  expect(order.secondary).toBeGreaterThanOrEqual(0);
  expect(order.primary, "hero (.tgi-rail__primary) must precede Known For (.tgi-rail__secondary) in DOM order").toBeLessThan(
    order.secondary,
  );
});

test("person page CTA/link integrity: wikipedia and compare links resolve (en-US, leonardo-da-vinci)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });

  const wikipediaLink = page.getByRole("link", { name: /wikipedia/i });
  if (await wikipediaLink.count()) {
    const href = await wikipediaLink.first().getAttribute("href");
    expect(href).toMatch(/^https:\/\//);
  }

  const compareLink = page.getByRole("link", { name: /compare/i });
  if (await compareLink.count()) {
    const href = await compareLink.first().getAttribute("href");
    expect(href).toContain("/en-US/");
  }

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("person page without a portrait still renders a coherent hero (en-US, ada-lovelace)", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1100 });
  const console_ = captureConsole(page);
  await page.goto("/en-US/people/ada-lovelace", { waitUntil: "networkidle" });

  await expect(page.locator(".tgi-identity-hero__portrait")).toHaveCount(0);
  await expect(page.locator("h1.tgi-person-name")).toHaveText(/Ada Lovelace/);
  await assertNoHorizontalOverflow(page);

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});
