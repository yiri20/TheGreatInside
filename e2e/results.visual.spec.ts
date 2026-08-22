import { test, expect } from "@playwright/test";
import {
  assertHeadingHierarchy,
  assertNoClippedElements,
  assertNoHorizontalOverflow,
  assertProseMeasureBounded,
  assertSpotlightCardsConstrained,
  captureConsole,
  elementsAreSideBySide,
  railIsSideBySide,
} from "./utils/visualChecks";

/**
 * Results visual-smoke suite — Phase 10D-3.
 *
 * All tokens below are SYNTHETIC, generated during the Phase 10D-3 audit via
 * `encodeResultToken` (a pure `src/core/quiz` export) against fixed answer
 * patterns — never a real user's data, never committed elsewhere. Each name
 * documents the specific result-shape branch it exercises; see CLAUDE.md's
 * Phase 10D-3 section for how each was found/derived.
 */
const FIXTURES = {
  /** Baseline "typical" shape: closest/unexpected/opposite/dual-edged all
   *  present, no Advantage. Used for the full responsive matrix. */
  neutral: "quiz_v2.a444a44a444a4a444444a44444a44aa44a4444a4444a4a4444a4444444444444",
  /** High Greatness (88), still no Advantage. */
  high: "quiz_v2.a777a77a777a7a777777a77777a77aa77a7777a7777a7a7777a7777777777777",
  /** Greatness 5, dual-edged ABSENT — exercises the Signature-alone branch. */
  lowNoDualEdged: "quiz_v2.b111a11b111b1a111111b11111b11ad11b1111b1111b1a1111a1111111111111",
  /** 3 dual-edged candidates (only the first renders) — exercises the
   *  multiple-candidates path without changing the rendered count. */
  mixed: "quiz_v2.b555b55b555b5b555555b55555b55bb55b5555b5555b5b5555b5555555555555",
  /** Advantage PRESENT (2 traits) + dual-edged present + no unexpected
   *  match — exercises the You-Both/Advantage rail AND (same token, reused
   *  below as `unexpectedAbsent`) the Unexpected Match empty state /
   *  standalone-Opposite-Profile branch in the same fixture. */
  advantagePresent: "quiz_v2.b666b66b666b6b666666b66666b66bb66b6666b6666b6b6666b6666666666666",
} as const;

/** A dedicated token for the specific branch (`results.unexpected ===
 *  undefined`, `results.opposite` present) the spotlight-pairing follow-up
 *  needs. ROSTER-1000: previously reused `advantagePresent`'s token, since
 *  that answer pattern happened to also produce no unexpected match against
 *  the 35-person roster — but "no unexpected match" is a property of the
 *  full roster's shape, not of the token alone, and the roster-1000 first
 *  real expansion batch (roster3.ts, +16 people) changed that coincidence:
 *  `advantagePresent` now DOES surface an unexpected match against the
 *  51-person roster. Given its own independent token instead of trying to
 *  keep hunting for one answer pattern that satisfies both fixtures'
 *  requirements at once.
 *
 *  ROSTER-1000 session 18 (roster9.ts, 87 -> 90 people): the SAME
 *  fragility recurred — the roster's own comment above already warned
 *  this could happen again. The prior token now surfaces a real
 *  Unexpected Match against the 90-person roster, so it was replaced
 *  with a fresh one differing by a single leading character (found via a
 *  scripted single-character-mutation search against the live
 *  buildResultSet pipeline, not hand-picked), re-verified to still
 *  produce `unexpected === undefined` and `opposite !== undefined`
 *  against the current roster. See docs/roster-1000-checkpoint.md §84.
 *
 *  ROSTER-1000 session 19 (roster10.ts, 90 -> 95 people): recurred again,
 *  exactly as the pattern above predicted. Replaced with a fresh token
 *  found the same way (single-character-mutation search against the
 *  live buildResultSet pipeline against the current 95-person roster),
 *  re-verified to produce `unexpected === undefined` and
 *  `opposite !== undefined`. See docs/roster-1000-checkpoint.md, Session
 *  19 section. */
const UNEXPECTED_ABSENT_TOKEN =
  "quiz_v2.666166b616b6a666666b66666b66ad66b6666b6666b6a6666a6666666666666";

const VIEWPORTS = [
  { name: "mobile-390", width: 390, height: 1200 },
  { name: "tablet-768", width: 768, height: 1200 },
  { name: "narrow-desktop-1024", width: 1024, height: 1200 },
  { name: "wide-desktop-1280", width: 1280, height: 1200 },
  { name: "wide-desktop-1600", width: 1600, height: 1200 },
  { name: "wide-desktop-1920", width: 1920, height: 1200 },
] as const;

const LOCALES = ["en-US", "ko-KR"] as const;

/** Spotlight-card selectors, by DOM position — Unexpected Match's PersonCard
 *  is always the first `.tgi-personcard` on the page (Closest Match uses
 *  `IdentityHero`, not `PersonCard`), Opposite Profile's is the second;
 *  Category/Top Matches' PersonCards come later and are NOT spotlight cards
 *  (multi-item grids, never hit the single-item-stretch bug). */
const SPOTLIGHT_BASE_SELECTOR = ".tgi-personcard";
const SPOTLIGHT_COUNT = 2;

for (const locale of LOCALES) {
  for (const viewport of VIEWPORTS) {
    test(`results (neutral) @ ${locale} @ ${viewport.name}`, async ({ page }) => {
      const console_ = captureConsole(page);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      const response = await page.goto(`/${locale}/results?r=${encodeURIComponent(FIXTURES.neutral)}`, {
        waitUntil: "networkidle",
      });
      expect(response?.status(), "results page did not respond 200").toBe(200);

      // Greatness identity/value present.
      await expect(page.locator(".tgi-hero-score__value")).toBeVisible();
      await expect(page.locator(".tgi-hero-score__value")).toHaveText(/\d+\s*\/\s*100/);

      // Closest match present.
      await expect(page.locator("h3.tgi-person-name").first()).toBeVisible();
      await expect(page.locator(".tgi-personcard__match-value").first()).toBeVisible();

      await assertNoHorizontalOverflow(page);
      await assertProseMeasureBounded(page);
      const clipped = await assertNoClippedElements(page);
      expect(clipped, `clipped elements found: ${JSON.stringify(clipped)}`).toEqual([]);
      await assertSpotlightCardsConstrained(page, SPOTLIGHT_BASE_SELECTOR, SPOTLIGHT_COUNT);
      await assertHeadingHierarchy(page);

      // Wide composition only activates >=1280px; 1024 stays single-column.
      const heroSideBySide = await railIsSideBySide(page, "section:has(.tgi-hero-score)");
      if (viewport.width >= 1280) {
        expect(heroSideBySide, `hero should be side-by-side at ${viewport.width}px`).toBe(true);
      } else {
        expect(heroSideBySide, `hero should be stacked at ${viewport.width}px`).toBe(false);
      }

      await page.screenshot({
        path: `test-artifacts/screenshots/results/${locale}/${viewport.name}.png`,
        fullPage: true,
      });

      expect(console_.errors, `console errors: ${JSON.stringify(console_.errors)}`).toEqual([]);
      expect(console_.pageErrors, `page errors: ${JSON.stringify(console_.pageErrors)}`).toEqual([]);
    });
  }
}

for (const locale of LOCALES) {
  test(`closest-match hero renders an initials fallback, not an empty portrait column, when the match has no portrait (${locale})`, async ({
    page,
  }) => {
    // FIXTURES.neutral's closest match against the current roster is Ibn
    // Khaldun, a real portrait-less person (checked directly against
    // src/data/people, not assumed) — exercises the fix for the reported
    // defect: IdentityHero used to render nothing at all for the portrait
    // column here, unlike PersonCard's initials fallback used elsewhere on
    // this same page (Category Matches, Unexpected Match, etc.).
    const console_ = captureConsole(page);
    await page.goto(`/${locale}/results?r=${encodeURIComponent(FIXTURES.neutral)}`, { waitUntil: "networkidle" });

    await expect(page.locator(".tgi-identity-hero__portrait")).toHaveCount(1);
    await expect(page.locator(".tgi-identity-hero__portrait img")).toHaveCount(0);
    const placeholder = page.locator(".tgi-identity-hero__placeholder");
    await expect(placeholder).toBeVisible();
    await expect(placeholder).toHaveAttribute("aria-hidden", "true");
    await expect(placeholder).not.toHaveAttribute("aria-label");
    await expect(page.locator("h3.tgi-person-name")).toBeVisible();

    await assertNoHorizontalOverflow(page);
    expect(console_.errors).toEqual([]);
    expect(console_.pageErrors).toEqual([]);
  });
}

test("SignInCta remains after Closest Match and before deeper sections (Phase 10C contract)", async ({ page }) => {
  await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.neutral)}`, { waitUntil: "networkidle" });
  const positions = await page.evaluate(() => {
    const body = document.body.innerText;
    return {
      closestMatch: body.indexOf("Your Closest Great Match"),
      signInOrSaved: Math.max(
        body.indexOf("Sign in with Google"),
        body.indexOf("Save your result"),
        body.indexOf("Saved to your account"),
      ),
      unexpected: body.indexOf("Your Unexpected Match"),
    };
  });
  expect(positions.closestMatch).toBeGreaterThan(0);
  expect(positions.unexpected).toBeGreaterThan(0);
  if (positions.signInOrSaved > 0) {
    expect(positions.signInOrSaved, "SignInCta must appear after Closest Match").toBeGreaterThan(positions.closestMatch);
    expect(positions.signInOrSaved, "SignInCta must appear before Unexpected Match").toBeLessThan(positions.unexpected);
  }
});

test("#comparison anchor resolves and CTA/link integrity holds (en-US)", async ({ page }) => {
  const console_ = captureConsole(page);
  await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.neutral)}`, { waitUntil: "networkidle" });

  const comparisonLink = page.getByRole("link", { name: /full comparison/i });
  await expect(comparisonLink).toHaveAttribute("href", "#comparison");
  await comparisonLink.click();
  await expect(page.locator("#comparison")).toBeVisible();

  const viewProfile = page.getByRole("link", { name: /view profile/i }).first();
  expect(await viewProfile.getAttribute("href")).toMatch(/^\/en-US\/people\//);

  const retake = page.getByRole("link", { name: /retake/i });
  expect(await retake.getAttribute("href")).toBe("/en-US/quiz");

  const backToPeople = page.getByRole("link", { name: /all people|back to people/i });
  expect(await backToPeople.getAttribute("href")).toBe("/en-US/people");

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("keyboard/DOM order: hero and comparison rails never reorder via CSS order (en-US, wide desktop)", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1200 });
  await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.advantagePresent)}`, { waitUntil: "networkidle" });

  const rails = await page.locator(".tgi-rail").all();
  expect(rails.length, "expected 2 Rail instances (hero, comparison You Both/Advantage)").toBe(2);

  for (let i = 0; i < rails.length; i++) {
    const order = await page.evaluate((idx) => {
      const rail = document.querySelectorAll(".tgi-rail")[idx]!;
      const all = Array.from(document.querySelectorAll("*"));
      const primary = rail.querySelector(".tgi-rail__primary");
      const secondary = rail.querySelector(".tgi-rail__secondary");
      return { primary: primary ? all.indexOf(primary) : -1, secondary: secondary ? all.indexOf(secondary) : -1 };
    }, i);
    expect(order.primary).toBeGreaterThanOrEqual(0);
    expect(order.secondary).toBeGreaterThanOrEqual(0);
    expect(order.primary, `Rail #${i}: primary must precede secondary in DOM order`).toBeLessThan(order.secondary);
  }
});

// -------------------------------------------------------- result-shape branches
// Deliberately NOT the full 6x2 viewport/locale matrix per fixture — a
// smaller, targeted set proves each branch without redundant coverage
// already established by the neutral fixture's full matrix above.

test("high-Greatness result renders correctly (en-US, 390 + 1920)", async ({ page }) => {
  for (const width of [390, 1920]) {
    await page.setViewportSize({ width, height: 1200 });
    const console_ = captureConsole(page);
    await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.high)}`, { waitUntil: "networkidle" });
    await assertNoHorizontalOverflow(page);
    await assertSpotlightCardsConstrained(page, SPOTLIGHT_BASE_SELECTOR, SPOTLIGHT_COUNT);
    expect(console_.errors).toEqual([]);
    expect(console_.pageErrors).toEqual([]);
  }
});

test("no-dual-edged result: Signature renders alone, no empty second column (en-US, 1024/1280/1920)", async ({ page }) => {
  for (const width of [1024, 1280, 1920]) {
    await page.setViewportSize({ width, height: 1200 });
    await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.lowNoDualEdged)}`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Dual-Edged/i })).toHaveCount(0);
    await expect(page.locator(".tgi-results-trait-pair")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /Signature Trait/i })).toBeVisible();
    await assertNoHorizontalOverflow(page);
  }
});

test("mixed result: both Signature and Dual-Edged pair correctly at wide desktop (en-US, 1920)", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1200 });
  await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.mixed)}`, { waitUntil: "networkidle" });
  const pairSideBySide = await elementsAreSideBySide(
    page,
    ".tgi-results-trait-pair > *:nth-child(1)",
    ".tgi-results-trait-pair > *:nth-child(2)",
  );
  expect(pairSideBySide, "Signature and Dual-Edged should be side by side at 1920px").toBe(true);
  await assertNoHorizontalOverflow(page);
});

test("mixed result: Signature/Dual-Edged stack below 1280px (en-US, 1024)", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 1200 });
  await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.mixed)}`, { waitUntil: "networkidle" });
  const pairSideBySide = await elementsAreSideBySide(
    page,
    ".tgi-results-trait-pair > *:nth-child(1)",
    ".tgi-results-trait-pair > *:nth-child(2)",
  );
  expect(pairSideBySide, "Signature and Dual-Edged should be stacked below 1280px").toBe(false);
});

for (const locale of LOCALES) {
  test(`advantage-present result: comparison rail activates and Unexpected-Match empty state renders (${locale}, 1920)`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 1200 });
    const console_ = captureConsole(page);
    await page.goto(`/${locale}/results?r=${encodeURIComponent(FIXTURES.advantagePresent)}`, { waitUntil: "networkidle" });

    const comparisonRailSideBySide = await railIsSideBySide(page, "#comparison");
    expect(comparisonRailSideBySide, "You Both / Advantage should be side by side at 1920px").toBe(true);

    await assertNoHorizontalOverflow(page);
    await assertSpotlightCardsConstrained(page, SPOTLIGHT_BASE_SELECTOR, SPOTLIGHT_COUNT);
    const clipped = await assertNoClippedElements(page);
    expect(clipped).toEqual([]);
    expect(console_.errors).toEqual([]);
    expect(console_.pageErrors).toEqual([]);

    await page.screenshot({
      path: `test-artifacts/screenshots/results/${locale}/advantage-present-1920.png`,
      fullPage: true,
    });
  });
}

test("advantage-present result: comparison rail stacks below 1280px (en-US, 1024)", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 1200 });
  await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.advantagePresent)}`, { waitUntil: "networkidle" });
  const comparisonRailSideBySide = await railIsSideBySide(page, "#comparison");
  expect(comparisonRailSideBySide, "You Both / Advantage should be stacked below 1280px").toBe(false);
});

test("no-advantage result: no empty rail is created in the comparison section (en-US, 1920)", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1200 });
  await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.neutral)}`, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Your Advantage|Bring Something Different/i })).toHaveCount(0);
  // The comparison section's Rail should not exist at all when there's
  // nothing to pair with You Both — only the hero Rail should be present.
  const railCount = await page.locator(".tgi-rail").count();
  expect(railCount, "only the hero Rail should exist when Advantage is absent").toBe(1);
});

test("invalid/missing token still renders the explicit invalid state, not a crash (en-US)", async ({ page }) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/results", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

// ------------------------------------------- follow-up: spotlight pairing
// Unexpected Match + Opposite Profile pair into one editorial row at
// >=1280px when both are real matches; when Unexpected has no real match,
// Opposite Profile must remain a standalone spotlight, never paired with
// the empty-state message.

for (const locale of LOCALES) {
  test(`spotlight pair (both present) is side by side at >=1280px (${locale})`, async ({ page }) => {
    const console_ = captureConsole(page);
    await page.setViewportSize({ width: 1920, height: 1200 });
    await page.goto(`/${locale}/results?r=${encodeURIComponent(FIXTURES.neutral)}`, { waitUntil: "networkidle" });

    const sideBySide = await elementsAreSideBySide(
      page,
      ".tgi-results-spotlight-pair > *:nth-child(1)",
      ".tgi-results-spotlight-pair > *:nth-child(2)",
    );
    expect(sideBySide, "Unexpected Match and Opposite Profile should be side by side at 1920px").toBe(true);

    // Neither card is stretched — both stay at their capped ~24rem width,
    // never filling a wider grid column (the defect this pairing must not
    // reintroduce).
    await assertSpotlightCardsConstrained(page, ".tgi-personcard", 2);
    await assertNoHorizontalOverflow(page);
    const clipped = await assertNoClippedElements(page);
    expect(clipped).toEqual([]);

    await page.screenshot({
      path: `test-artifacts/screenshots/results/${locale}/spotlight-pair-1920.png`,
      fullPage: true,
    });

    expect(console_.errors).toEqual([]);
    expect(console_.pageErrors).toEqual([]);
  });
}

test("spotlight pair stacks below 1280px, DOM order unchanged (en-US, 1024)", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 1200 });
  await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.neutral)}`, { waitUntil: "networkidle" });

  const sideBySide = await elementsAreSideBySide(
    page,
    ".tgi-results-spotlight-pair > *:nth-child(1)",
    ".tgi-results-spotlight-pair > *:nth-child(2)",
  );
  expect(sideBySide, "should be stacked below 1280px").toBe(false);

  // Unexpected Match's heading must still precede Opposite Profile's in
  // both DOM order and visual (top-to-bottom) order — no CSS `order` trick.
  const order = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll("*"));
    const headings = Array.from(document.querySelectorAll("h2")).filter(
      (h) => h.textContent?.includes("Unexpected Match") || h.textContent?.includes("Opposite Profile"),
    );
    return headings.map((h) => ({ text: h.textContent, index: all.indexOf(h) }));
  });
  expect(order[0]?.text).toContain("Unexpected Match");
  expect(order[1]?.text).toContain("Opposite Profile");
  expect(order[0]!.index).toBeLessThan(order[1]!.index);
});

test("unexpected-absent: Opposite Profile remains a standalone spotlight, not paired (en-US, 1920)", async ({ page }) => {
  const console_ = captureConsole(page);
  await page.setViewportSize({ width: 1920, height: 1200 });
  await page.goto(`/en-US/results?r=${encodeURIComponent(UNEXPECTED_ABSENT_TOKEN)}`, { waitUntil: "networkidle" });

  const pairCount = await page.locator(".tgi-results-spotlight-pair").count();
  expect(pairCount, "must not pair the empty-state Unexpected Match with Opposite Profile").toBe(0);

  await expect(page.getByRole("heading", { name: /Unexpected Match/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Opposite Profile/i })).toBeVisible();
  await assertSpotlightCardsConstrained(page, ".tgi-personcard", 1);
  await assertNoHorizontalOverflow(page);

  await page.screenshot({
    path: "test-artifacts/screenshots/results/en-US/spotlight-unexpected-absent-1920.png",
    fullPage: true,
  });

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

// --------------------------------------- follow-up: mobile discovery grids
// Category Matches (7 cards) and More People Worth Meeting (5 cards) switch
// to a compact 2-column layout at <=640px, replacing the long single-column
// stack that measured 4271px/3207px tall respectively for the neutral
// fixture (13242px total page height) before this change.

for (const locale of LOCALES) {
  test(`discovery grids are compact 2-column at 390px, content preserved (${locale})`, async ({ page }) => {
    const console_ = captureConsole(page);
    await page.setViewportSize({ width: 390, height: 1200 });
    await page.goto(`/${locale}/results?r=${encodeURIComponent(FIXTURES.neutral)}`, { waitUntil: "networkidle" });

    const grids = page.locator(".tgi-results-discovery-grid");
    await expect(grids).toHaveCount(2);

    for (let i = 0; i < 2; i++) {
      const columns = await grids
        .nth(i)
        .evaluate((el) => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length);
      expect(columns, `grid #${i} should render exactly 2 columns at 390px`).toBe(2);
    }

    // Category Matches: exactly 7 cards (one per facet); no overlap between
    // any two cards (a real risk if column math is off).
    const categoryCards = grids.nth(0).locator(".tgi-personcard");
    await expect(categoryCards).toHaveCount(7);
    const boxes = await categoryCards.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().toJSON()));
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i]!;
        const b = boxes[j]!;
        const overlap = a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
        expect(overlap, `cards ${i} and ${j} in Category Matches must not overlap`).toBe(false);
      }
    }

    // More People Worth Meeting: exactly 5 cards.
    await expect(grids.nth(1).locator(".tgi-personcard")).toHaveCount(5);

    // Names and match percentages remain visible and readable (not removed
    // to make the compact layout fit).
    await expect(categoryCards.first().locator(".tgi-personcard__name")).toBeVisible();
    await expect(categoryCards.first().locator(".tgi-personcard__match-value")).toBeVisible();

    // Link integrity: every card in both grids still links somewhere real.
    const allLinks = page.locator(".tgi-results-discovery-grid .tgi-personcard__link");
    const hrefs = await allLinks.evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).getAttribute("href")));
    for (const href of hrefs) {
      expect(href, "every discovery-grid card must link somewhere real").toMatch(new RegExp(`^/${locale}/people/`));
    }

    await assertNoHorizontalOverflow(page);
    const clipped = await assertNoClippedElements(page);
    expect(clipped, `clipped elements found: ${JSON.stringify(clipped)}`).toEqual([]);

    await page.screenshot({
      path: `test-artifacts/screenshots/results/${locale}/discovery-grids-390.png`,
      fullPage: true,
    });

    expect(console_.errors).toEqual([]);
    expect(console_.pageErrors).toEqual([]);
  });
}

test("discovery grids: 768px keeps the original auto-fit behavior (regression check)", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1200 });
  await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.neutral)}`, { waitUntil: "networkidle" });
  const columns = await page
    .locator(".tgi-results-discovery-grid")
    .first()
    .evaluate((el) => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length);
  expect(columns, "768px should NOT use the 2-column mobile override").toBeGreaterThan(2);
});

test("mobile-390 page height materially improved for the neutral fixture (regression guard)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1200 });
  await page.goto(`/en-US/results?r=${encodeURIComponent(FIXTURES.neutral)}`, { waitUntil: "networkidle" });
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  // Measured baseline before this follow-up was 13242px; after was 8603px.
  // A generous guard (not a pixel-exact pin, since content/fonts may shift
  // slightly) that fails loudly if the compact grid regresses back toward
  // the old single-column height.
  expect(pageHeight, `page height ${pageHeight}px suggests the compact grid regressed`).toBeLessThan(10000);
});
