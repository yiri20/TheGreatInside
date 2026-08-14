import { test, expect } from "@playwright/test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  assertNoClippedElements,
  assertNoHorizontalOverflow,
  assertProseMeasureBounded,
  captureConsole,
  domOrderIndex,
  elementsAreSideBySide,
  railIsSideBySide,
  tabOrderSequence,
} from "./utils/visualChecks";

/**
 * Saved Result visual-smoke suite — Phase 10D-3 follow-up (historical
 * parity). Unlike every other suite in `e2e/`, this one does NOT navigate
 * the live Next.js server for its main coverage — `/account/results/[id]`
 * requires a real authenticated Supabase session an agent cannot create,
 * so there is no way to reach the "ok" render state through the real
 * route. Instead it opens the STATIC preview files
 * `src/dev/savedResultPreview.tsx` generates from handcrafted
 * `ResultSnapshotV1` fixtures (`src/dev/savedResultFixtures.ts`) directly
 * via `file://` — the exact same `SavedResultView` component the real
 * route renders, with zero Supabase/auth/mocking involved. Regenerated
 * fresh before this run by `global-setup.ts`. The one test that DOES hit
 * the live server (`unauthenticated route still shows the sign-in gate`)
 * covers the one thing that's both real-route-testable AND doesn't need a
 * session: confirming the auth gate itself still works when signed out.
 */
const here = dirname(fileURLToPath(import.meta.url));
const previewDir = resolve(here, "../test-artifacts/saved-result-preview");
function previewUrl(fixture: string, locale: string): string {
  return `file://${resolve(previewDir, `${fixture}-${locale}.html`).replace(/\\/g, "/")}`;
}

const FIXTURES = ["normal", "dualEdgedAbsent", "advantagePresent", "removedClosestPerson", "minimal"] as const;
const LOCALES = ["en-US", "ko-KR"] as const;
const VIEWPORTS = [
  { name: "mobile-390", width: 390, height: 1400 },
  { name: "tablet-768", width: 768, height: 1400 },
  { name: "narrow-desktop-1024", width: 1024, height: 1400 },
  { name: "wide-desktop-1280", width: 1280, height: 1400 },
  { name: "wide-desktop-1600", width: 1600, height: 1400 },
  { name: "wide-desktop-1920", width: 1920, height: 1400 },
] as const;

/** Forbidden-import boundary guard: this is also enforced by a dedicated
 *  Vitest test (`SavedResultView.boundary.test.ts`) that greps the actual
 *  source text — kept here too as a coarse belt-and-braces DOM check that
 *  no live-scoring artifact ever leaks into rendered text. */
const FORBIDDEN_TEXT = [
  "Scientific Explorer", // greatness.primaryArchetypeId's label — never read
  "Deep Specialist", // greatness.secondaryArchetypeId's label — never read
  "Your Unexpected Match",
  "Your Opposite Profile",
  "More People Worth Meeting",
];

for (const locale of LOCALES) {
  for (const viewport of VIEWPORTS) {
    test(`saved result (normal) @ ${locale} @ ${viewport.name}`, async ({ page }) => {
      const console_ = captureConsole(page);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(previewUrl("normal", locale));
      expect(response?.status(), "preview file did not load").toBe(200);

      // Frozen Greatness score/band.
      await expect(page.locator(".tgi-hero-score__value")).toHaveText(/68\s*\/\s*100/);

      // No internal Greatness component / discovery-section leakage.
      const bodyText = await page.locator("body").innerText();
      for (const forbidden of FORBIDDEN_TEXT) {
        expect(bodyText, `forbidden text "${forbidden}" found on the page`).not.toContain(forbidden);
      }

      // ComparisonBars on the `normal` fixture: 1 closest-match explanation
      // trait + 4 You Both + 2 Where-You-Differ (userHigher) + 2 (personHigher).
      await expect(page.locator(".tgi-compare__track")).toHaveCount(1 + 4 + 2 + 2);

      // Category Matches: 7 for `normal`.
      await expect(page.locator(".tgi-personcard")).toHaveCount(7);

      // Full Trait Profile breakdown: all 34 attributes inside <details>.
      await expect(page.locator("details .tgi-scorebar__label")).toHaveCount(34);

      // Methodology disclosure always present.
      await expect(page.locator("details summary", { hasText: /How this was calculated|계산/ })).toHaveCount(1);

      await assertNoHorizontalOverflow(page);
      await assertProseMeasureBounded(page);
      const clipped = await assertNoClippedElements(page);
      expect(clipped, `clipped elements found: ${JSON.stringify(clipped)}`).toEqual([]);

      const heroSideBySide = await railIsSideBySide(page, "section:has(.tgi-hero-score)");
      const traitPairSideBySide = await elementsAreSideBySide(
        page,
        ".tgi-results-trait-pair > *:nth-child(1)",
        ".tgi-results-trait-pair > *:nth-child(2)",
      );
      if (viewport.width >= 1280) {
        expect(heroSideBySide, "hero Rail should be side-by-side at >=1280px").toBe(true);
        expect(traitPairSideBySide, "signature/dual-edged pair should be side-by-side at >=1280px").toBe(true);
      } else {
        expect(heroSideBySide, "hero Rail should be stacked below 1280px").not.toBe(true);
        expect(traitPairSideBySide, "signature/dual-edged pair should be stacked below 1280px").not.toBe(true);
      }

      expect(console_.errors, `console errors: ${JSON.stringify(console_.errors)}`).toEqual([]);
      expect(console_.pageErrors, `page errors: ${JSON.stringify(console_.pageErrors)}`).toEqual([]);
    });
  }
}

test("saved result: dual-edged absent falls back to single-column signature", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1400 });
  await page.goto(previewUrl("dualEdgedAbsent", "en-US"));
  await expect(page.locator("text=Your Signature Trait")).toBeVisible();
  await expect(page.locator("text=Your Strongest Dual-Edged Trait")).toHaveCount(0);
  await expect(page.locator(".tgi-results-trait-pair")).toHaveCount(0);
  await assertNoHorizontalOverflow(page);
});

test("saved result: advantage present pairs with You Both via Rail at >=1280px", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1400 });
  await page.goto(previewUrl("advantagePresent", "en-US"));
  await expect(page.locator("text=Where You Bring Something Different")).toBeVisible();
  // Two `.tgi-rail`s exist on this fixture: the hero (1st) and the
  // comparison section's You-Both+Advantage pairing (2nd). Indexed
  // directly via `document.querySelectorAll` (not `:nth-of-type`, which
  // counts by tag among ALL sibling divs, not by class — the exact
  // landmine `assertSpotlightCardsConstrained`'s own doc comment warns
  // about) and not via `text=` (a Playwright-locator-only pseudo-selector
  // that raw `document.querySelector`, which the shared `elementsAreSideBySide`/
  // `railIsSideBySide` helpers use internally, cannot parse).
  const sideBySide = await page.evaluate(() => {
    const rail = document.querySelectorAll(".tgi-rail")[1];
    if (!rail) return undefined;
    const primary = rail.querySelector(".tgi-rail__primary");
    const secondary = rail.querySelector(".tgi-rail__secondary");
    if (!primary || !secondary) return undefined;
    const p = primary.getBoundingClientRect();
    const s = secondary.getBoundingClientRect();
    const overlap = Math.min(p.bottom, s.bottom) - Math.max(p.top, s.top);
    return overlap > Math.min(p.height, s.height) * 0.3;
  });
  expect(sideBySide, "You Both + Advantage should pair via Rail at >=1280px").toBe(true);
  await assertNoHorizontalOverflow(page);
});

test("saved result: advantage absent renders You Both alone (no empty Rail)", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1400 });
  await page.goto(previewUrl("normal", "en-US"));
  await expect(page.locator("text=Where You Bring Something Different")).toHaveCount(0);
  // Exactly one Rail on the page: the hero's. The comparison section must
  // not create a second, half-empty Rail when Advantage is absent.
  await expect(page.locator(".tgi-rail")).toHaveCount(1);
});

test("saved result: removed-person fallback renders frozen name, no crash, no link", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 1400 });
  const response = await page.goto(previewUrl("removedClosestPerson", "en-US"));
  expect(response?.status()).toBe(200);
  await expect(page.locator("h3.tgi-person-name").first()).toHaveText("A Removed Test Fixture Person");
  // No live profile to link to for a removed person.
  await expect(page.locator("text=View Profile")).toHaveCount(0);
  await assertNoHorizontalOverflow(page);
});

test("saved result: minimal fixture renders every absent-branch cleanly, no crash", async ({ page }) => {
  const response = await page.goto(previewUrl("minimal", "en-US"));
  expect(response?.status()).toBe(200);
  await expect(page.locator("text=Your Closest Great Match")).toHaveCount(0);
  await expect(page.locator("text=Your Signature Trait")).toHaveCount(0);
  await expect(page.locator("text=Your Strongest Dual-Edged Trait")).toHaveCount(0);
  await expect(page.locator("text=Your Closest Match, By Category")).toHaveCount(0);
  await expect(page.locator("text=Compared With")).toHaveCount(0);
  // Static content still renders even with almost nothing else present.
  await expect(page.locator("text=How this was calculated")).toBeVisible();
  await expect(page.locator(".tgi-hero-score__value")).toHaveText(/22\s*\/\s*100/);
  await assertNoHorizontalOverflow(page);
  const clipped = await assertNoClippedElements(page);
  expect(clipped).toEqual([]);
});

test("saved result: You Both / Where You Differ split matches frozen comparison arrays exactly", async ({ page }) => {
  await page.goto(previewUrl("normal", "en-US"));
  await expect(page.locator("text=You Both").locator("..").locator(".tgi-compare__track")).toHaveCount(4);
  const userHigherHeading = page.locator("text=Where You Lean Higher");
  const personHigherHeading = page.locator("text=Where Benjamin Franklin Leans Higher");
  await expect(userHigherHeading).toBeVisible();
  await expect(personHigherHeading).toBeVisible();
});

test("saved result: Signature context is built only from static copy (no interpolated reference number)", async ({ page }) => {
  await page.goto(previewUrl("normal", "en-US"));
  const context = await page.locator(".tgi-traitcard > .tgi-text").first().innerText();
  expect(context).toBe(
    "One of the most distinctive features of your profile. Standing out here isn't automatically good or bad — it depends entirely on the situation you're in.",
  );
});

test("saved result: DOM order matches tab order at >=1280px (no CSS `order` trick)", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1400 });
  await page.goto(previewUrl("normal", "en-US"));
  const heroOrder = await domOrderIndex(page, ".tgi-rail__primary, .tgi-rail__secondary");
  expect(heroOrder[0]).toBeLessThan(heroOrder[1] ?? Infinity);
  // Basic keyboard traversal sanity: focusable elements reachable in order,
  // no thrown errors, no focus trap.
  const sequence = await tabOrderSequence(page, 5);
  expect(sequence.length).toBe(5);
});

test("saved result: Category Matches precedes Trait Profile in DOM order, matching Live Results' canonical section order", async ({
  page,
}) => {
  for (const locale of LOCALES) {
    await page.goto(previewUrl("normal", locale));
    // Resolved via a direct DOM query (not `domOrderIndex`'s CSS-selector
    // signature, and not Playwright's `text=` pseudo-syntax, neither of
    // which cleanly expresses "find the h2 whose text contains X") —
    // walks the real rendered <h2> elements in document order.
    const headingOrder = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll("h2")).map((h) => h.textContent?.trim() ?? "");
      const categoryIdx = headings.findIndex((t) => t.includes("By Category") || t.includes("영역별"));
      const traitProfileIdx = headings.findIndex((t) => t.includes("Trait Profile") || t.includes("특성 프로필"));
      return { categoryIdx, traitProfileIdx };
    });
    expect(headingOrder.categoryIdx, `Category Matches heading not found (${locale})`).toBeGreaterThanOrEqual(0);
    expect(headingOrder.traitProfileIdx, `Trait Profile heading not found (${locale})`).toBeGreaterThanOrEqual(0);
    expect(
      headingOrder.categoryIdx,
      `Category Matches (h2 #${headingOrder.categoryIdx}) should precede Trait Profile (h2 #${headingOrder.traitProfileIdx}) — ${locale}`,
    ).toBeLessThan(headingOrder.traitProfileIdx);
  }
});

for (const locale of LOCALES) {
  test(`saved result: Closest Match explanation bar is width-constrained at wide desktop @ ${locale}`, async ({ page }) => {
    for (const width of [1280, 1600, 1920]) {
      await page.setViewportSize({ width, height: 1400 });
      await page.goto(previewUrl("normal", locale));
      const box = await page.locator(".tgi-savedresult-explanation").first().boundingBox();
      expect(box, `.tgi-savedresult-explanation not found at ${width}px (${locale})`).not.toBeNull();
      expect(box!.width, `explanation bar measured ${box!.width}px wide at ${width}px viewport — expected <=~40rem`).toBeLessThanOrEqual(
        700, // 40rem at the project's base font size, plus slack
      );
      // Left-aligned inside the Closest Match Card, not centered: its left
      // edge should closely match the closest-match name heading's left
      // edge, both sitting inside the same Card's padding — not floating
      // in the middle of the (much wider) container the way a centered
      // `.tgi-measure-stack` block would.
      const nameBox = await page.locator("h3.tgi-person-name").first().boundingBox();
      expect(nameBox, `closest-match name heading not found at ${width}px (${locale})`).not.toBeNull();
      expect(Math.abs(box!.x - nameBox!.x), `explanation bar left edge (${box!.x}) not aligned with card content (${nameBox!.x})`).toBeLessThan(4);
    }
    await assertNoHorizontalOverflow(page);
  });

  test(`saved result: Closest Match explanation bar stays responsive below desktop @ ${locale}`, async ({ page }) => {
    for (const width of [390, 768, 1024]) {
      await page.setViewportSize({ width, height: 1400 });
      await page.goto(previewUrl("normal", locale));
      await expect(page.locator(".tgi-savedresult-explanation").first()).toBeVisible();
      await assertNoHorizontalOverflow(page);
      const clipped = await assertNoClippedElements(page);
      expect(clipped, `clipped at ${width}px (${locale}): ${JSON.stringify(clipped)}`).toEqual([]);
    }
  });
}

test("saved result: mobile category grid uses the compact 2-column class", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1400 });
  await page.goto(previewUrl("normal", "en-US"));
  await expect(page.locator(".tgi-results-discovery-grid")).toBeVisible();
  await assertNoHorizontalOverflow(page);
});

/**
 * The ONE test in this file that hits the real, live Next.js server rather
 * than a static preview — confirms the actual `/account/results/[id]`
 * route still shows its `auth_required` state (never a crash, never a
 * false "not found") for a signed-out visitor, which needs no Supabase
 * session to verify since "signed out" is simply the default state.
 */
test("saved result: real unauthenticated route shows the sign-in gate, not a crash", async ({ page }) => {
  const response = await page.goto("/en-US/account/results/00000000-0000-0000-0000-000000000000");
  expect(response?.status()).toBe(200);
  await expect(page.locator("text=Sign in with Google")).toBeVisible();
  const clipped = await assertNoClippedElements(page);
  expect(clipped).toEqual([]);
});
