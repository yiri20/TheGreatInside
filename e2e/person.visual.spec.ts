import { test, expect } from "@playwright/test";
import {
  assertHeadingHierarchy,
  assertNoClippedElements,
  assertNoHorizontalOverflow,
  assertProseMeasureBounded,
  captureConsole,
  elementsAreSideBySide,
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
 *  - coco-chanel: no portrait, two-word name in both locales ("Coco
 *    Chanel" / "코코 샤넬") — real localisation-driven layout on the
 *    no-portrait hero. Was socrates until the Final No-Portrait Coverage
 *    batch (2026-08) gave Socrates a real portrait (the Louvre's Roman-era
 *    bust, Ma 59 — a later copy within the ancient portrait tradition, not
 *    a lifetime likeness), so he no longer exercises the no-portrait
 *    branch. Also the fixture for the dedicated "no portrait" hero test
 *    below. Verified live against current repo state before the swap: no
 *    remaining no-portrait person has a single-word display name in both
 *    locales (Rumi's English display falls back to the full multi-word
 *    canonicalName "Jalal ad-Din Muhammad Rumi" — there's no `en.ts`
 *    override shortening it — so it doesn't reproduce socrates's
 *    single-grapheme case either). Coco Chanel was chosen instead: firmly
 *    HOLD after three separate rounds of sourcing research (Batch 1, this
 *    session's Final-17 triage, and this session's 5-person sourcing pass
 *    all declined her for the same unresolved resolution/rights gap), so
 *    she's a stable long-term no-portrait fixture, and both her English
 *    and Korean display names are two whitespace-separated words, giving
 *    deterministic two-grapheme initials ("CC" / "코샤") via the shared
 *    `initialsFromName` helper (`src/ui/lib/display.ts`) — asserted
 *    directly below rather than assumed.
 *
 * All three have non-empty `impactDomains`, so all three exercise the new
 * Rail(hero, Known For) composition, not just the no-secondary fallback.
 */
const PEOPLE = ["leonardo-da-vinci", "ada-lovelace", "coco-chanel"] as const;
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

        // Profile Hero polish (2026-08): the old Rail(hero, Known For)
        // composition -- two independent regions, side by side only at the
        // wide-desktop >=1280px breakpoint -- was replaced by a single
        // IdentityHero flex-wrap row (portrait | identity info, Known For
        // now living INSIDE the identity info block, not beside it as its
        // own region). `.tgi-rail__primary`/`.tgi-rail__secondary` no
        // longer exist on this page at all, so this now checks the actual
        // two flex children (`.tgi-identity-hero__portrait` and
        // `.tgi-identity-hero__info`) with the same reusable side-by-side
        // heuristic `railIsSideBySide` used, applied via the generic
        // `elementsAreSideBySide` helper (already used elsewhere for
        // non-Rail pairings, e.g. Results' Signature+Dual-Edged). The
        // layout is a fluid `flex-wrap`, not a hard-coded breakpoint
        // switch, so the actual wrap point was measured live rather than
        // assumed to still be 1280px: side by side from 768px up, stacked
        // only at the 390px mobile viewport, confirmed on both a person
        // with a real portrait and the no-portrait (initials) fixture.
        const sideBySide = await elementsAreSideBySide(
          page,
          ".tgi-identity-hero__portrait",
          ".tgi-identity-hero__info",
        );
        if (viewport.width >= 768) {
          expect(sideBySide, `expected portrait + identity info side by side at ${viewport.width}px`).toBe(true);
        } else {
          expect(
            sideBySide,
            `expected portrait + identity info stacked (not side by side) at ${viewport.width}px`,
          ).toBe(false);
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

test("person page DOM order: portrait before identity info (incl. Known For), no CSS order reordering (en-US, wide desktop)", async ({
  page,
}) => {
  // Profile Hero polish (2026-08): `.tgi-rail__primary`/`.tgi-rail__secondary`
  // no longer exist on this page (see the per-viewport test above) -- Known
  // For now renders inside `.tgi-identity-hero__info` alongside the name/
  // dates/confidence, not as its own Rail-secondary region. The invariant
  // this test actually guards -- a keyboard/reading-order user reaches the
  // portrait before the identity content, never reordered ahead of it via
  // CSS `order` -- still applies to the new two-element composition.
  await page.setViewportSize({ width: 1600, height: 1100 });
  await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });

  const order = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll("*"));
    const portrait = document.querySelector(".tgi-identity-hero__portrait");
    const info = document.querySelector(".tgi-identity-hero__info");
    return { portrait: portrait ? all.indexOf(portrait) : -1, info: info ? all.indexOf(info) : -1 };
  });
  expect(order.portrait).toBeGreaterThanOrEqual(0);
  expect(order.info).toBeGreaterThanOrEqual(0);
  expect(
    order.portrait,
    "portrait (.tgi-identity-hero__portrait) must precede identity info (.tgi-identity-hero__info) in DOM order",
  ).toBeLessThan(order.info);
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

test("person page without a portrait still renders a coherent hero (en-US, coco-chanel)", async ({ page }) => {
  // Was socrates until the Final No-Portrait Coverage batch (2026-08) gave
  // him a real portrait (see PEOPLE comment above for the full rationale
  // and the verification that no single-word-in-both-locales replacement
  // currently exists in the roster). coco-chanel is portrait-less and was
  // already part of this suite's own matrix above.
  //
  // Missing-portrait fallback (added after this test previously asserted
  // .tgi-identity-hero__portrait had COUNT 0 — that was pinning the bug:
  // IdentityHero rendered no visual identity element at all when the
  // portrait was absent, unlike PersonCard's initials placeholder. The
  // portrait column now always renders, holding either the image or the
  // same initials-on-sunken-surface fallback PersonCard already used.
  await page.setViewportSize({ width: 1600, height: 1100 });
  const console_ = captureConsole(page);
  await page.goto("/en-US/people/coco-chanel", { waitUntil: "networkidle" });

  await expect(page.locator(".tgi-identity-hero__portrait")).toHaveCount(1);
  await expect(page.locator(".tgi-identity-hero__portrait img")).toHaveCount(0);
  const placeholder = page.locator(".tgi-identity-hero__placeholder");
  await expect(placeholder).toBeVisible();
  // "Coco Chanel" is two whitespace-separated words, so the shared
  // initials helper takes one leading grapheme from each: "C" + "C".
  await expect(placeholder).toHaveText("CC");
  await expect(placeholder).toHaveAttribute("aria-hidden", "true");
  // Decorative only — no accessible name of its own, so the h1 right next
  // to it remains the single thing assistive tech announces as "the name".
  await expect(placeholder).not.toHaveAttribute("aria-label");
  await expect(placeholder).not.toHaveAttribute("role", "img");
  await expect(page.locator("h1.tgi-person-name")).toHaveText(/Coco Chanel/);
  await assertNoHorizontalOverflow(page);

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("person page without a portrait renders the Korean initials fallback too (ko-KR, coco-chanel)", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1100 });
  const console_ = captureConsole(page);
  await page.goto("/ko-KR/people/coco-chanel", { waitUntil: "networkidle" });

  const placeholder = page.locator(".tgi-identity-hero__placeholder");
  await expect(placeholder).toBeVisible();
  // "코코 샤넬" is two whitespace-separated words, so the shared initials
  // helper takes one leading grapheme from each: "코" + "샤" — same rule as
  // the English case above, just a different (still two-grapheme) result.
  await expect(placeholder).toHaveText("코샤");
  await expect(page.locator("h1.tgi-person-name")).toHaveText("코코 샤넬");
  await assertNoHorizontalOverflow(page);

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("missing-portrait fallback occupies the same column width as a real portrait would, at every viewport (coco-chanel)", async ({
  page,
}) => {
  for (const width of [320, 328, 390, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/en-US/people/coco-chanel", { waitUntil: "networkidle" });
    const box = await page.locator(".tgi-identity-hero__portrait").boundingBox();
    expect(box, `portrait column missing at ${width}px`).not.toBeNull();
    // Person page passes portraitWidth="12rem" (192px) regardless of
    // portrait presence — the column must hold that width, not collapse.
    // Profile Hero polish (2026-08): also passes portraitWidthLg="15rem"
    // (240px), applied only at the >=1280px breakpoint (see
    // .tgi-identity-hero__portrait in components.css) so the portrait reads
    // larger once there's room for the full 2-column composition — the
    // no-portrait fallback must track that same widened column, not stay
    // pinned to the base width.
    const expectedWidth = width >= 1280 ? 240 : 192;
    expect(box!.width, `portrait column width at ${width}px`).toBeCloseTo(expectedWidth, 0);
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

/**
 * Editorial non-likeness UI, Portrait Completion Phase 2D-2 — the first
 * production `kind: "editorial_nonlikeness"` person is ibn-khaldun. Real
 * production data throughout (not a mocked fixture, unlike the component
 * -level tests in src/ui/ui.test.ts): genghis-khan (`historical_depiction`)
 * and leonardo-da-vinci (unclassified `kind`) confirm the label stays
 * scoped to editorial_nonlikeness only, against real roster entries.
 */
test("editorial-nonlikeness label renders on ibn-khaldun's hero, above the attribution caption (en-US)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/people/ibn-khaldun", { waitUntil: "networkidle" });

  await expect(page.locator(".tgi-portrait-credit__nonlikeness")).toHaveText("Editorial visual · Not a likeness");
  await expect(page.locator(".tgi-portrait-credit__prose")).toContainText("folio 7a");

  const box = await page.locator(".tgi-portrait-credit__nonlikeness").boundingBox();
  const creditBox = await page.locator(".tgi-portrait-credit").boundingBox();
  expect(box, "label must be present").not.toBeNull();
  expect(creditBox, "attribution caption must be present").not.toBeNull();
  expect(box!.y).toBeLessThan(creditBox!.y);

  await assertNoHorizontalOverflow(page);
  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("editorial-nonlikeness label renders in Korean on ibn-khaldun's hero (ko-KR)", async ({ page }) => {
  const console_ = captureConsole(page);
  await page.goto("/ko-KR/people/ibn-khaldun", { waitUntil: "networkidle" });

  await expect(page.locator(".tgi-portrait-credit__nonlikeness")).toHaveText("편집용 이미지 · 실제 초상 아님");

  await assertNoHorizontalOverflow(page);
  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("editorial-nonlikeness label survives at 390px mobile without wrapping the caption awkwardly (en-US, ibn-khaldun)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  const console_ = captureConsole(page);
  await page.goto("/en-US/people/ibn-khaldun", { waitUntil: "networkidle" });

  await expect(page.locator(".tgi-portrait-credit__nonlikeness")).toBeVisible();
  await expect(page.locator(".tgi-identity-hero__img")).toBeVisible();
  await assertNoHorizontalOverflow(page);
  await assertNoClippedElements(page);

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("editorial-nonlikeness label does NOT render for a historical_depiction person (en-US, genghis-khan)", async ({
  page,
}) => {
  await page.goto("/en-US/people/genghis-khan", { waitUntil: "networkidle" });
  await expect(page.locator(".tgi-portrait-credit__nonlikeness")).toHaveCount(0);
  await expect(page.locator(".tgi-portrait-credit__prose")).toContainText("Yuan dynasty");
});

test("editorial-nonlikeness label does NOT render for an unclassified portrait (en-US, leonardo-da-vinci)", async ({
  page,
}) => {
  await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });
  await expect(page.locator(".tgi-portrait-credit__nonlikeness")).toHaveCount(0);
  await expect(page.locator(".tgi-identity-hero__img")).toBeVisible();
});
