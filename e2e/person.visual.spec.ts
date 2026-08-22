import { test, expect } from "@playwright/test";
import {
  assertHeadingHierarchy,
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
 *  - ada-lovelace: shorter name; gained a real portrait in roster-1000
 *    session 5 (2026-08, Chalon 1840 watercolor) — no longer a no-portrait
 *    fixture, but still exercises IdentityHero's align="start" +
 *    portraitCaption path alongside leonardo-da-vinci
 *  - yi-sun-sin: no portrait, and Korean display name ("이순신") is much
 *    shorter than the English one ("Yi Sun-sin") — real localisation-driven
 *    length variation on the no-portrait layout, not a synthetic string.
 *    Also the fixture for the dedicated "no portrait" hero test below,
 *    since ada-lovelace can no longer serve that role.
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
        // Public Beta Finish Line: Known For was h3 directly under h1 with
        // no h2 in between (see CLAUDE.md "Public Beta Finish Line") — now
        // level={2}/visualLevel={3}, real h2 tag, unchanged h3 visual size.
        await assertHeadingHierarchy(page);

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

test("person page without a portrait still renders a coherent hero (en-US, yi-sun-sin)", async ({ page }) => {
  // Was ada-lovelace, swapped roster-1000 session 5 (2026-08): Ada Lovelace
  // gained a real, verified portrait this session (Chalon 1840 watercolor),
  // so she no longer exercises the no-portrait branch. yi-sun-sin remains
  // portrait-less and was already part of this suite's own matrix above.
  //
  // Missing-portrait fallback (added after this test previously asserted
  // .tgi-identity-hero__portrait had COUNT 0 — that was pinning the bug:
  // IdentityHero rendered no visual identity element at all when the
  // portrait was absent, unlike PersonCard's initials placeholder. The
  // portrait column now always renders, holding either the image or the
  // same initials-on-sunken-surface fallback PersonCard already used.
  await page.setViewportSize({ width: 1600, height: 1100 });
  const console_ = captureConsole(page);
  await page.goto("/en-US/people/yi-sun-sin", { waitUntil: "networkidle" });

  await expect(page.locator(".tgi-identity-hero__portrait")).toHaveCount(1);
  await expect(page.locator(".tgi-identity-hero__portrait img")).toHaveCount(0);
  const placeholder = page.locator(".tgi-identity-hero__placeholder");
  await expect(placeholder).toBeVisible();
  await expect(placeholder).toHaveText("YS");
  await expect(placeholder).toHaveAttribute("aria-hidden", "true");
  // Decorative only — no accessible name of its own, so the h1 right next
  // to it remains the single thing assistive tech announces as "the name".
  await expect(placeholder).not.toHaveAttribute("aria-label");
  await expect(placeholder).not.toHaveAttribute("role", "img");
  await expect(page.locator("h1.tgi-person-name")).toHaveText(/Yi Sun-sin/);
  await assertNoHorizontalOverflow(page);

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("person page without a portrait renders the Korean initials fallback too (ko-KR, yi-sun-sin)", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1100 });
  const console_ = captureConsole(page);
  await page.goto("/ko-KR/people/yi-sun-sin", { waitUntil: "networkidle" });

  const placeholder = page.locator(".tgi-identity-hero__placeholder");
  await expect(placeholder).toBeVisible();
  // "이순신" has no internal whitespace, so the shared initials helper
  // takes its single leading grapheme — same rule as the English case
  // above, just a different (correct) result for a single-word name.
  await expect(placeholder).toHaveText("이");
  await expect(page.locator("h1.tgi-person-name")).toHaveText("이순신");
  await assertNoHorizontalOverflow(page);

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("missing-portrait fallback occupies the same column width as a real portrait would, at every viewport (yi-sun-sin)", async ({
  page,
}) => {
  for (const width of [320, 328, 390, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/en-US/people/yi-sun-sin", { waitUntil: "networkidle" });
    const box = await page.locator(".tgi-identity-hero__portrait").boundingBox();
    expect(box, `portrait column missing at ${width}px`).not.toBeNull();
    // Person page passes portraitWidth="12rem" (192px) regardless of
    // portrait presence — the column must hold that width, not collapse.
    expect(box!.width, `portrait column width at ${width}px`).toBeCloseTo(192, 0);
    await assertNoHorizontalOverflow(page);
  }
});

// ============================================================================
// Phase 10D Stage 5 (cross-page consistency micro-polish): Similar People's
// mobile discovery-grid density, and the divider preceding Sources.
// ============================================================================

for (const [slug, locale] of [
  ["leonardo-da-vinci", "en-US"],
  ["leonardo-da-vinci", "ko-KR"],
  ["ada-lovelace", "en-US"],
] as const) {
  test(`Similar People grid uses the discovery-grid class and renders 2 columns at 390px (${slug}, ${locale})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 1400 });
    const console_ = captureConsole(page);
    await page.goto(`/${locale}/people/${slug}`, { waitUntil: "networkidle" });

    const grid = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll("h2"));
      const heading = headings.find((h) => h.textContent?.includes("Similar People") || h.textContent?.includes("비슷한 인물"));
      const section = heading?.parentElement;
      const g = section?.querySelector(".tgi-grid");
      if (!g) return null;
      return {
        hasClass: g.classList.contains("tgi-results-discovery-grid"),
        columns: getComputedStyle(g).gridTemplateColumns.trim().split(/\s+/).length,
      };
    });
    expect(grid, "Similar People grid not found").not.toBeNull();
    expect(grid!.hasClass, "Similar People Grid should carry the shared discovery-grid class").toBe(true);
    expect(grid!.columns, "Similar People should render exactly 2 columns at 390px").toBe(2);

    await assertNoHorizontalOverflow(page);
    const clipped = await assertNoClippedElements(page);
    expect(clipped).toEqual([]);
    expect(console_.errors).toEqual([]);
    expect(console_.pageErrors).toEqual([]);
  });
}

test("Similar People grid is NOT forced to 2 columns at 768px+ (discovery-grid only overrides <=640px)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 1000 });
  await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });
  const columns = await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll("h2")).find((h) => h.textContent?.includes("Similar People"));
    const grid = heading?.parentElement?.querySelector(".tgi-grid");
    return grid ? getComputedStyle(grid).gridTemplateColumns.trim().split(/\s+/).length : null;
  });
  // 6 cards at 14rem min inside a 1024px container naturally fit more than 2
  // columns via the untouched auto-fit `Grid` behavior — this only fails if
  // the discovery-grid override leaked past its intended <=640px scope.
  expect(columns).not.toBeNull();
  expect(columns!, "Similar People must not be pinned to 2 columns above the discovery-grid breakpoint").toBeGreaterThan(2);
});

for (const [slug, hasContent] of [
  ["leonardo-da-vinci", true],
  ["ada-lovelace", true],
] as const) {
  test(`Sources is preceded by exactly one Divider, section order and divider count otherwise unchanged (${slug})`, async ({
    page,
  }) => {
    await page.goto(`/en-US/people/${slug}`, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll("h2, h3")).map((h) => h.textContent?.trim() ?? "");
      const similarIdx = headings.findIndex((h) => h.includes("Similar People"));
      const oppositeIdx = headings.findIndex((h) => h.includes("Opposite Profile"));
      const sourcesHeading = Array.from(document.querySelectorAll("h3")).find((h) => h.textContent?.includes("Sources"));
      const sourcesCard = sourcesHeading?.closest(".tgi-card");
      const dividerImmediatelyBefore = sourcesCard?.previousElementSibling?.classList.contains("tgi-divider") ?? false;
      // Editorial-depth session: each present editorial section (Key
      // Achievements / Moments That Reveal Them / Turning Points) is its own
      // divided block, same pattern as every other section on this page.
      const editorialHeadings = ["Key Achievements", "Moments That Reveal Them", "Turning Points"];
      const editorialSectionCount = editorialHeadings.filter((h) => headings.includes(h)).length;
      return {
        similarIdx,
        oppositeIdx,
        hasSources: !!sourcesCard,
        dividerImmediatelyBeforeSources: dividerImmediatelyBefore,
        totalDividers: document.querySelectorAll(".tgi-divider").length,
        editorialSectionCount,
      };
    });
    if (!result.hasSources) return; // this person has no sources; nothing to assert
    expect(result.similarIdx, "Similar People should precede Opposite Profile").toBeLessThan(result.oppositeIdx);
    expect(result.dividerImmediatelyBeforeSources, "exactly one Divider should immediately precede the Sources card").toBe(
      true,
    );
    // 2 original dividers (after hero, after Trait Constellation) + 1 new one
    // before Sources + one per present editorial section (each editorial
    // section is its own divided block). Guards against accidentally adding
    // more dividers than that, including between Similar People and
    // Opposite Profile, while correctly allowing for pilot people (this
    // fixture's own da Vinci/Lovelace) that legitimately carry editorial
    // content.
    expect(
      result.totalDividers,
      "expected 3 base dividers + 1 per present editorial section",
    ).toBe(3 + result.editorialSectionCount);
  });
}
