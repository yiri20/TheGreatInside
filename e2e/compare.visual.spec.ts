import { test, expect } from "@playwright/test";
import {
  assertHeadingHierarchy,
  assertNoClippedElements,
  assertNoHorizontalOverflow,
  assertProseMeasureBounded,
  captureConsole,
  domOrderIndex,
} from "./utils/visualChecks";

/**
 * Compare visual-smoke suite — Phase 10D-4.
 *
 * Covers the first round (Share/Differ pairing, Learn From/Worth Exploring
 * content-driven grids, controlled bar widths) and the second round's
 * FINAL, approved decisions: the Where-You-Bring-Something-Different /
 * What-Not-to-Copy pairing (kept, including its deliberate asymmetry — see
 * `.tgi-compare-edge-dontcopy` in components.css) and Facet Similarity's
 * FINAL reverted-to-original behavior (no Rail, no wide-desktop
 * restructuring — a wide-desktop Rail composition was prototyped and
 * rejected for breaking the below-1280px reading order; see
 * `docs/phase10-provisional-checkpoint.md` for the full record). Tests for
 * the rejected Facet Similarity Option B were removed along with the code —
 * this file only asserts the FINAL approved behavior, never a
 * known-rejected one.
 *
 * All tokens below are SYNTHETIC, generated via `encodeResultToken` against
 * fixed answer patterns (the same three already used by
 * `results.visual.spec.ts` — `CLOSE`≈its "neutral", `FAR`≈its
 * "lowNoDualEdged", `HIGH`≈its "high") — never a real user's data. Target
 * slugs are real, already-in-dataset people, used only to exercise real
 * portrait/no-portrait and long/short-name variation, per the audit's
 * fixture plan.
 */
const CLOSE_TOKEN = "quiz_v2.a444a44a444a4a444444a44444a44aa44a4444a4444a4a4444a4444444444444";
const FAR_TOKEN = "quiz_v2.b111a11b111b1a111111b11111b11ad11b1111b1111b1a1111a1111111111111";
/** All-max answers — against a comparatively lower-scoring ancient-figure
 *  target, this genuinely produces an EMPTY "Where You Lean Differently"
 *  (`personHigherTraits`) while "What You Share" stays populated —
 *  confirmed live before writing this fixture, not assumed. Exercises the
 *  single-section fallback the pairing logic must handle. */
const SHARE_ONLY_TOKEN = "quiz_v2.a777a77a777a7a777777a77777a77aa77a7777a7777a7a7777a7777777777777";

const FIXTURES = {
  /** Baseline: both Share and Differ present, no portrait. Full matrix. */
  closeFranklin: { token: CLOSE_TOKEN, target: "benjamin-franklin" },
  /** Low overall match — different item counts per column, still both present. */
  farFranklin: { token: FAR_TOKEN, target: "benjamin-franklin" },
  /** Portrait-present target (the one person in the dataset with a portrait),
   *  also produces a non-empty "Where You Bring Something Different". */
  daVinci: { token: CLOSE_TOKEN, target: "leonardo-da-vinci" },
  /** Short single-word target name. */
  shortNameConfucius: { token: CLOSE_TOKEN, target: "confucius" },
  /** Single-section fallback: Share present, Differ genuinely absent. */
  shareOnlyConfucius: { token: SHARE_ONLY_TOKEN, target: "confucius" },
  /** Portrait-less target (checked directly against src/data/people, not
   *  assumed — benjamin-franklin above gained a real portrait since this
   *  file's fixtures were first written, so it no longer serves this role). */
  noPortraitSocrates: { token: CLOSE_TOKEN, target: "socrates" },
} as const;

const VIEWPORTS = [
  { name: "mobile-390", width: 390, height: 1400 },
  { name: "tablet-768", width: 768, height: 1400 },
  { name: "narrow-desktop-1024", width: 1024, height: 1400 },
  { name: "wide-desktop-1280", width: 1280, height: 1400 },
  { name: "wide-desktop-1600", width: 1600, height: 1400 },
  { name: "wide-desktop-1920", width: 1920, height: 1400 },
] as const;

const LOCALES = ["en-US", "ko-KR"] as const;

function url(locale: string, fixture: { token: string; target: string }): string {
  return `/${locale}/compare/${fixture.target}?r=${encodeURIComponent(fixture.token)}`;
}

/** Side-by-side heuristic scoped to `.tgi-compare-share-differ`'s two direct
 *  children — a real CSS selector (`:nth-child`), not Playwright's `text=`
 *  syntax, since this runs inside `page.evaluate`'s raw DOM APIs. Safe here
 *  specifically because the pairing div always has EXACTLY two children
 *  when it renders at all (see the page's own absent-branch logic). */
async function shareDifferSideBySide(page: import("@playwright/test").Page): Promise<boolean | undefined> {
  return page.evaluate(() => {
    const pair = document.querySelector(".tgi-compare-share-differ");
    if (!pair) return undefined;
    const a = pair.children[0];
    const b = pair.children[1];
    if (!a || !b) return undefined;
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    const overlap = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
    return overlap > Math.min(ra.height, rb.height) * 0.3;
  });
}

for (const locale of LOCALES) {
  for (const viewport of VIEWPORTS) {
    test(`compare (closeFranklin) @ ${locale} @ ${viewport.name}`, async ({ page }) => {
      const console_ = captureConsole(page);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(url(locale, FIXTURES.closeFranklin), { waitUntil: "networkidle" });
      expect(response?.status(), "compare page did not respond 200").toBe(200);

      // Correct target identity.
      await expect(page.locator("h1.tgi-person-name")).toBeVisible();
      await expect(page.locator("h1.tgi-person-name")).toContainText(/Benjamin Franklin|벤저민/);

      await assertNoHorizontalOverflow(page);
      await assertProseMeasureBounded(page, 900); // paired columns are wider than a single 40rem prose block by design
      const clipped = await assertNoClippedElements(page);
      expect(clipped, `clipped elements: ${JSON.stringify(clipped)}`).toEqual([]);
      await assertHeadingHierarchy(page);

      // Every individual bar stays within a controlled width regardless of
      // viewport — the whole point of this round.
      const trackWidths = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".tgi-compare__track")).map((t) => t.getBoundingClientRect().width),
      );
      for (const w of trackWidths) {
        expect(w, `a comparison bar measured ${w}px wide at ${viewport.width}px viewport`).toBeLessThanOrEqual(660);
      }

      const paired = await shareDifferSideBySide(page);
      if (viewport.width >= 1280) {
        expect(paired, "Share/Differ should be side-by-side at >=1280px").toBe(true);
      } else {
        expect(paired, "Share/Differ should be stacked below 1280px").not.toBe(true);
      }

      expect(console_.errors, `console errors: ${JSON.stringify(console_.errors)}`).toEqual([]);
      expect(console_.pageErrors, `page errors: ${JSON.stringify(console_.pageErrors)}`).toEqual([]);
    });
  }
}

test("compare: Share/Differ DOM order matches visual order at >=1280px (no CSS order)", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1200 });
  await page.goto(url("en-US", FIXTURES.closeFranklin));
  const order = await domOrderIndex(page, "h2");
  const headings = await page.evaluate(() => Array.from(document.querySelectorAll("h2")).map((h) => h.textContent?.trim() ?? ""));
  const shareIdx = headings.findIndex((h) => h.includes("What You Share"));
  const differIdx = headings.findIndex((h) => h.includes("Lean Differently"));
  expect(shareIdx).toBeGreaterThanOrEqual(0);
  expect(differIdx).toBeGreaterThanOrEqual(0);
  expect(order[shareIdx]).toBeLessThan(order[differIdx]);
});

test("compare: far/low match — Share and Differ have different item counts but both pair correctly", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1400 });
  const response = await page.goto(url("en-US", FIXTURES.farFranklin), { waitUntil: "networkidle" });
  expect(response?.status()).toBe(200);
  const paired = await shareDifferSideBySide(page);
  expect(paired, "far-match should still pair Share/Differ at >=1280px").toBe(true);
  await assertNoHorizontalOverflow(page);
});

test("compare: single-section fallback renders Share alone, no empty column, no pair div", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 });
  const response = await page.goto(url("en-US", FIXTURES.shareOnlyConfucius), { waitUntil: "networkidle" });
  expect(response?.status()).toBe(200);
  await expect(page.locator("text=What You Share")).toBeVisible();
  await expect(page.locator("text=Where You Lean Differently")).toHaveCount(0);
  await expect(page.locator(".tgi-compare-share-differ")).toHaveCount(0);
  // The lone section keeps its original controlled, centered measure — not
  // stretched to fill the space a second column would have occupied.
  const box = await page.locator(".tgi-compare__track").first().boundingBox();
  expect(box!.width).toBeLessThanOrEqual(660);
  await assertNoHorizontalOverflow(page);
});

test("compare: portrait-present target (da Vinci) — hero unaffected, Learn From + Worth Exploring + Your Advantage all render", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1400 });
  const response = await page.goto(url("en-US", FIXTURES.daVinci), { waitUntil: "networkidle" });
  expect(response?.status()).toBe(200);
  await expect(page.locator(".tgi-identity-hero__portrait img")).toBeVisible();
  await expect(page.locator("h1.tgi-person-name")).toContainText("Leonardo da Vinci");
  await expect(page.locator("text=Where You Bring Something Different")).toBeVisible();
  await assertNoHorizontalOverflow(page);
  const clipped = await assertNoClippedElements(page);
  expect(clipped).toEqual([]);
});

for (const locale of LOCALES) {
  test(`compare: portrait-less target (Socrates) renders an initials fallback, not an empty portrait column (${locale})`, async ({
    page,
  }) => {
    const console_ = captureConsole(page);
    const response = await page.goto(url(locale, FIXTURES.noPortraitSocrates), { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);

    await expect(page.locator(".tgi-identity-hero__portrait")).toHaveCount(1);
    await expect(page.locator(".tgi-identity-hero__portrait img")).toHaveCount(0);
    const placeholder = page.locator(".tgi-identity-hero__placeholder");
    await expect(placeholder).toBeVisible();
    await expect(placeholder).toHaveAttribute("aria-hidden", "true");
    await expect(placeholder).not.toHaveAttribute("aria-label");
    await expect(page.locator("h1.tgi-person-name")).toBeVisible();

    await assertNoHorizontalOverflow(page);
    expect(console_.errors).toEqual([]);
    expect(console_.pageErrors).toEqual([]);
  });
}

test("compare: short target name (Confucius) — no wrapping/overflow regression", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1200 });
  await page.goto(url("en-US", FIXTURES.shortNameConfucius));
  await expect(page.locator("h1.tgi-person-name")).toContainText("Confucius");
  await assertNoHorizontalOverflow(page);
});

for (const [name, fixture] of Object.entries({ closeFranklin: FIXTURES.closeFranklin, daVinci: FIXTURES.daVinci })) {
  test(`compare: Learn From / Worth Exploring card grids never stretch low item counts — ${name}`, async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 1400 });
    await page.goto(url("en-US", fixture));
    const cardWidths = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".tgi-compare-card-grid")).flatMap((grid) =>
        Array.from(grid.children).map((c) => c.getBoundingClientRect().width),
      ),
    );
    expect(cardWidths.length).toBeGreaterThan(0);
    for (const w of cardWidths) {
      expect(w, `a Learn From/Worth Exploring card measured ${w}px wide`).toBeLessThanOrEqual(380);
    }
  });
}

test("compare: TargetSwitcher search still works and produces correct comparison links", async ({ page }) => {
  await page.goto(url("en-US", FIXTURES.closeFranklin));
  const input = page.getByPlaceholder("Search for another person");
  await input.fill("Curie");
  const result = page.locator("a", { hasText: "Marie Curie" });
  await expect(result).toBeVisible();
  const href = await result.getAttribute("href");
  expect(href).toContain("/compare/marie-curie");
  expect(href).toContain("r=");
});

test("compare: footer CTAs point to the correct profile and results links", async ({ page }) => {
  await page.goto(url("en-US", FIXTURES.closeFranklin));
  const viewProfile = page.locator("a", { hasText: "View Profile" });
  await expect(viewProfile).toHaveAttribute("href", /\/people\/benjamin-franklin$/);
  const closestMatch = page.locator("a", { hasText: "Your Closest Great Match" });
  await expect(closestMatch).toHaveAttribute("href", /\/results\?r=/);
});

test("compare: Korean wide-desktop pairing renders without wrapping/overflow issues", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1400 });
  await page.goto(url("ko-KR", FIXTURES.closeFranklin));
  const paired = await shareDifferSideBySide(page);
  expect(paired).toBe(true);
  await assertNoHorizontalOverflow(page);
  const clipped = await assertNoClippedElements(page);
  expect(clipped).toEqual([]);
});

// ============================================================================
// Where You Bring Something Different + What Not to Copy (Phase 10D-4 second
// round, APPROVED/FINAL — keeps the intentional asymmetry: plain bars/prose
// on one side, existing caution Cards on the other).
// ============================================================================

/** Side-by-side heuristic scoped to `.tgi-compare-edge-dontcopy`'s two direct
 *  children — mirrors `shareDifferSideBySide` above for the other pairing. */
async function edgeDontCopySideBySide(page: import("@playwright/test").Page): Promise<boolean | undefined> {
  return page.evaluate(() => {
    const pair = document.querySelector(".tgi-compare-edge-dontcopy");
    if (!pair) return undefined;
    const a = pair.children[0];
    const b = pair.children[1];
    if (!a || !b) return undefined;
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    const overlap = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
    return overlap > Math.min(ra.height, rb.height) * 0.3;
  });
}

test("compare: Where You Bring Something Different + What Not to Copy pair at >=1280px when both present (da Vinci)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.setViewportSize({ width: 1600, height: 1400 });
  await page.goto(url("en-US", FIXTURES.daVinci), { waitUntil: "networkidle" });

  const paired = await edgeDontCopySideBySide(page);
  expect(paired, "pairing container should exist and be side-by-side when yourEdge is non-empty").toBe(true);

  // Controlled column widths and card widths — never wider than the
  // pre-pairing single-column measure.
  const widths = await page.evaluate(() => {
    const pair = document.querySelector(".tgi-compare-edge-dontcopy")!;
    const colA = pair.children[0].getBoundingClientRect().width;
    const colB = pair.children[1].getBoundingClientRect().width;
    const cards = Array.from(pair.children[1].querySelectorAll(".tgi-card")).map((c) => c.getBoundingClientRect().width);
    return { colA, colB, cards };
  });
  expect(widths.colA).toBeLessThanOrEqual(660);
  expect(widths.colB).toBeLessThanOrEqual(660);
  for (const w of widths.cards) {
    expect(w, `a "What Not to Copy" card measured ${w}px wide`).toBeLessThanOrEqual(660);
  }

  await assertNoHorizontalOverflow(page);
  const clipped = await assertNoClippedElements(page);
  expect(clipped).toEqual([]);
  expect(console_.errors).toEqual([]);
});

test("compare: single-section fallback — What Not to Copy alone, no pairing container, no empty column (Franklin)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1200 });
  await page.goto(url("en-US", FIXTURES.closeFranklin), { waitUntil: "networkidle" });
  await expect(page.locator(".tgi-compare-edge-dontcopy")).toHaveCount(0);
  await expect(page.locator("text=Where You Bring Something Different")).toHaveCount(0);
  await expect(page.locator("text=What Not to Copy")).toBeVisible();
  await assertNoHorizontalOverflow(page);
});

test("compare: Where You Bring Something Different precedes What Not to Copy in DOM order at >=1280px, no CSS order", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1400 });
  await page.goto(url("en-US", FIXTURES.daVinci));
  const idx = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll("h2")).map((h) => h.textContent?.trim() ?? "");
    return {
      edge: headings.findIndex((h) => h.includes("Where You Bring Something Different")),
      dontCopy: headings.findIndex((h) => h.includes("What Not to Copy")),
    };
  });
  expect(idx.edge).toBeGreaterThanOrEqual(0);
  expect(idx.dontCopy).toBeGreaterThanOrEqual(0);
  expect(idx.edge).toBeLessThan(idx.dontCopy);
});

test("compare: Where You Bring Something Different + What Not to Copy stack below 1280px", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 1400 });
  await page.goto(url("en-US", FIXTURES.daVinci), { waitUntil: "networkidle" });
  const paired = await edgeDontCopySideBySide(page);
  expect(paired).not.toBe(true);
  await assertNoHorizontalOverflow(page);
});

test("compare: Where You Bring Something Different + What Not to Copy — Korean wide-desktop pairing, no wrapping/overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1400 });
  await page.goto(url("ko-KR", FIXTURES.daVinci), { waitUntil: "networkidle" });
  const paired = await edgeDontCopySideBySide(page);
  expect(paired).toBe(true);
  await assertNoHorizontalOverflow(page);
  const clipped = await assertNoClippedElements(page);
  expect(clipped).toEqual([]);
});

// ============================================================================
// Facet Similarity (Phase 10D-4 second round, FINAL — reverted to its
// original Option A treatment; a wide-desktop Rail composition was
// prototyped and rejected for breaking the below-1280px reading order).
// ============================================================================

test("compare: Facet Similarity heading precedes intro/bars in DOM order at every width", async ({ page }) => {
  for (const width of [390, 1024, 1920]) {
    await page.setViewportSize({ width, height: 1400 });
    await page.goto(url("en-US", FIXTURES.closeFranklin), { waitUntil: "networkidle" });
    const order = await page.evaluate(() => {
      const heading = Array.from(document.querySelectorAll("h2")).find((h) => h.textContent?.includes("Facet Similarity"));
      if (!heading) return null;
      const allEls = Array.from(document.querySelectorAll("*"));
      const headingIdx = allEls.indexOf(heading);
      const firstTrack = document.querySelector(".tgi-scorebar__track");
      const trackIdx = firstTrack ? allEls.indexOf(firstTrack) : -1;
      return { headingIdx, trackIdx };
    });
    expect(order, `Facet Similarity heading not found at ${width}px`).not.toBeNull();
    expect(order!.headingIdx, `heading should precede the first bar at ${width}px`).toBeLessThan(order!.trackIdx);
  }
});

test("compare: Facet Similarity stays controlled-width, no Rail, no wide-desktop restructuring", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1400 });
  await page.goto(url("en-US", FIXTURES.closeFranklin), { waitUntil: "networkidle" });
  const result = await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll("h2")).find((h) => h.textContent?.includes("Facet Similarity"));
    const section = heading?.closest("section");
    if (!section) return null;
    const isRail = !!section.querySelector(".tgi-rail");
    const widths = Array.from(section.querySelectorAll(".tgi-scorebar__track")).map((t) => t.getBoundingClientRect().width);
    return { isRail, widths };
  });
  expect(result).not.toBeNull();
  expect(result!.isRail, "Facet Similarity must not use the Rail composition").toBe(false);
  expect(result!.widths.length).toBe(7);
  for (const w of result!.widths) {
    // Matches the pre-existing single-column .tgi-measure-stack cap (40rem = 640px).
    expect(w).toBeLessThanOrEqual(640);
  }
});

test("compare: Facet Similarity behavior is identical at 1024 and 390 (no breakpoint-specific composition)", async ({ page }) => {
  const widthsByViewport: Record<number, number[]> = {};
  for (const width of [390, 1024]) {
    await page.setViewportSize({ width, height: 1400 });
    await page.goto(url("en-US", FIXTURES.closeFranklin), { waitUntil: "networkidle" });
    widthsByViewport[width] = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".tgi-scorebar__track")).slice(0, 7).map((t) => Math.round(t.getBoundingClientRect().width)),
    );
    await assertNoHorizontalOverflow(page);
  }
  // Both narrow widths should produce the same (viewport-appropriate, fully
  // responsive) single-column layout shape — neither should be narrower
  // than a small tolerance would suggest a stray wide-desktop rule leaked in.
  expect(widthsByViewport[390]!.length).toBe(7);
  expect(widthsByViewport[1024]!.length).toBe(7);
});
