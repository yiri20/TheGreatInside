import { test, expect, type Page } from "@playwright/test";
import { assertHeadingHierarchy, assertNoHorizontalOverflow, captureConsole } from "./utils/visualChecks";

/**
 * Progressive-disclosure helpers (2026-08): Profession/Activity and
 * Personality/Trait are each their own native `<details>`, collapsed by
 * default, so any test that needs to touch a chip inside one must open it
 * first — closed `<details>` content isn't visible/interactable. Locate by
 * the disclosure's own heading text rather than by index, so these helpers
 * work identically for both locales and don't care which one is first.
 */
function disclosureFor(page: Page, headingName: string | RegExp) {
  return page.locator(".tgi-taxonomy-disclosure").filter({ has: page.getByRole("heading", { name: headingName }) });
}

async function isSectionOpen(page: Page, headingName: string | RegExp): Promise<boolean> {
  return disclosureFor(page, headingName).evaluate((el) => (el as HTMLDetailsElement).open);
}

async function openSection(page: Page, headingName: string | RegExp): Promise<void> {
  if (!(await isSectionOpen(page, headingName))) {
    await disclosureFor(page, headingName).locator("summary").click();
  }
}

async function collapseSection(page: Page, headingName: string | RegExp): Promise<void> {
  if (await isSectionOpen(page, headingName)) {
    await disclosureFor(page, headingName).locator("summary").click();
  }
}

/**
 * People Directory — Public Beta Finish Line heading-hierarchy coverage
 * (see CLAUDE.md "Public Beta Finish Line"). Before this fix, the page had
 * only an h1 ("Explore Great Minds") with no h2 at all, then every
 * `PersonCard` rendered an h3 directly beneath it — a skipped level. Fixed
 * with a visually-hidden h2 ("Results" / "결과") immediately before the
 * results grid; `PersonCard`'s own `<h3>` is unchanged (shared across
 * Results/Compare/Person, not safe to alter globally).
 */
const LOCALES = ["en-US", "ko-KR"] as const;

for (const locale of LOCALES) {
  test(`people directory @ ${locale}: renders, correct heading hierarchy, no overflow`, async ({ page }) => {
    const console_ = captureConsole(page);
    const response = await page.goto(`/${locale}/people`, { waitUntil: "networkidle" });
    expect(response?.status(), "people directory did not respond 200").toBe(200);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator(".tgi-personcard").first()).toBeVisible();

    // The new sr-only heading must be present in the accessibility tree
    // (real h2 element) but not visually occupy layout space.
    const hidden = page.locator(".tgi-visually-hidden h2");
    await expect(hidden).toHaveCount(1);
    const box = await hidden.boundingBox();
    // A clip-rect sr-only element still reports a bounding box in most
    // browsers, but it must not be large enough to visibly displace layout.
    if (box) {
      expect(box.width).toBeLessThanOrEqual(2);
    }

    await assertHeadingHierarchy(page);
    await assertNoHorizontalOverflow(page);

    expect(console_.errors, `console errors: ${JSON.stringify(console_.errors)}`).toEqual([]);
    expect(console_.pageErrors, `page errors: ${JSON.stringify(console_.pageErrors)}`).toEqual([]);
  });
}

test("people directory: heading hierarchy still holds with an active search filter (en-US)", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await page.getByPlaceholder(/search/i).fill("da vinci");
  await page.waitForTimeout(150);
  await assertHeadingHierarchy(page);
});

test("people directory: heading hierarchy still holds on the empty-results state (en-US)", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await page.getByPlaceholder(/search/i).fill("zzzzzzzznotarealperson");
  await page.waitForTimeout(150);
  await expect(page.getByText(/no one matches/i)).toBeVisible();
  await assertHeadingHierarchy(page);
});

/**
 * 95-person launch-readiness pass (2026-08): the directory's full-roster
 * grid never got the mobile discovery-grid density treatment Results/Saved
 * Result/Person's Similar People already had (Phase 10D-3/Stage 5) — at 94
 * match-eligible cards, a single mobile column measured ~53,000px tall.
 * Same shared `.tgi-results-discovery-grid` class, same pattern as
 * `person.visual.spec.ts`'s Similar People pair below.
 */
test("people directory grid uses the discovery-grid class and renders 2 columns at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1400 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const grid = await page.evaluate(() => {
    const g = document.querySelector(".tgi-grid");
    if (!g) return null;
    return {
      hasClass: g.classList.contains("tgi-results-discovery-grid"),
      columns: getComputedStyle(g).gridTemplateColumns.trim().split(/\s+/).length,
    };
  });
  expect(grid, "directory grid not found").not.toBeNull();
  expect(grid!.hasClass, "directory Grid should carry the shared discovery-grid class").toBe(true);
  expect(grid!.columns, "directory should render exactly 2 columns at 390px").toBe(2);
  await assertNoHorizontalOverflow(page);
});

test("people directory grid is NOT forced to 2 columns at 1024px+ (discovery-grid only overrides <=640px)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 1000 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const columns = await page.evaluate(() => {
    const g = document.querySelector(".tgi-grid");
    return g ? getComputedStyle(g).gridTemplateColumns.trim().split(/\s+/).length : null;
  });
  expect(columns).not.toBeNull();
  expect(columns!, "directory grid must not be pinned to 2 columns above the discovery-grid breakpoint").toBeGreaterThan(2);
});

/**
 * Mobile UI refinement (2026-09, product-owner mobile review). Structural/
 * behavioral assertions only, per this file's own established style — no
 * pixel-perfect layout checks, which would be brittle to future roster/
 * copy changes. The specific numeric bound below is a loose regression
 * guard (the pre-refinement measurement was ~785px at this viewport),
 * not a target to optimize toward.
 */
test("people directory @ 390px: first results row appears materially sooner than the pre-refinement baseline", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 1400 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const gridTop = await page.evaluate(() => {
    const g = document.querySelector(".tgi-results-discovery-grid");
    return g ? Math.round(g.getBoundingClientRect().top) : null;
  });
  expect(gridTop).not.toBeNull();
  expect(gridTop!, "results grid should appear well before the pre-refinement ~785px baseline").toBeLessThan(750);
});

test("people directory: Era/Region/Sort selects use the custom chevron wrapper and remain fully functional", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });

  // Structural: the native <select> arrow is suppressed and a decorative,
  // non-interactive chevron sibling takes its place -- but the combobox
  // role/name (what selectOption below relies on) is completely unaffected.
  const wrappers = page.locator(".tgi-select");
  await expect(wrappers).toHaveCount(3); // Era, Region, Sort
  const appearance = await wrappers
    .first()
    .locator(".tgi-select__control")
    .evaluate((el) => getComputedStyle(el).appearance || getComputedStyle(el).webkitAppearance);
  expect(appearance, "native select arrow should be suppressed").toBe("none");
  await expect(wrappers.first().locator(".tgi-select__chevron")).toHaveCount(1);
  const chevronClickable = await wrappers
    .first()
    .locator(".tgi-select__chevron")
    .evaluate((el) => getComputedStyle(el).pointerEvents);
  expect(chevronClickable, "chevron must not intercept clicks meant for the select").toBe("none");

  // Behavioral: filtering still works exactly as before the wrapper change.
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();
  const before = Number((await countText())!.match(/^\d+/)![0]);
  await page.getByRole("combobox", { name: "Era" }).selectOption({ label: "19th Century" });
  const after = Number((await countText())!.match(/^\d+/)![0]);
  expect(after, "selecting an Era option must still filter results").toBeLessThan(before);
});

test("people directory: result count renders as a divider between filters and the results grid", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const count = page.locator(".tgi-directory-count");
  await expect(count).toHaveCount(1);
  await expect(count).toContainText(/people/);
  const borderTop = await count.evaluate((el) => getComputedStyle(el).borderTopStyle);
  expect(borderTop, "result count should have a visible top divider").toBe("solid");
});

test("people directory @ 390px: card metadata line does not wrap across multiple lines", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1400 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const meta = page.locator(".tgi-personcard__meta").first();
  const { whiteSpace, lineHeightPx, heightPx } = await meta.evaluate((el) => {
    const cs = getComputedStyle(el);
    return {
      whiteSpace: cs.whiteSpace,
      lineHeightPx: parseFloat(cs.lineHeight),
      heightPx: el.getBoundingClientRect().height,
    };
  });
  expect(whiteSpace, "metadata should truncate rather than wrap").toBe("nowrap");
  // A wrapped 2-line label would render at ~2x the single-line height.
  expect(heightPx).toBeLessThan(lineHeightPx * 1.5);
});

test("people directory @ 1280px: filter-section headings keep their full (non-mobile-compacted) size", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const fontSize = await page
    .locator(".tgi-taxonomy-disclosure > summary .tgi-heading")
    .first()
    .evaluate((el) => getComputedStyle(el).fontSize);
  // The mobile-only heading-dominance reduction (Part 4) must not leak
  // above the 640px breakpoint -- this is the same 1.375rem/22px size
  // this heading has always rendered at above that breakpoint.
  expect(fontSize).toBe("22px");
});

/**
 * Directory taxonomy redesign (directory_taxonomy_v1, 2026-08) — Part J/M
 * browser QA for the Profession/Activity + Personality/Trait sections
 * (src/core/people/directoryTaxonomy.ts). Both are real <label><input
 * type=checkbox>> controls driven with role-based locators exactly like any
 * other form control, not JS-evaluated state.
 *
 * PROGRESSIVE DISCLOSURE (2026-08 follow-up): both sections are now their
 * own native <details>, collapsed by default — the opposite of the
 * "always-visible, no <details>" assertion this test used to make. The
 * headings themselves are still visible without expanding anything (that's
 * the whole point of a <summary>); the chips inside are not, until opened.
 */
test("people directory: taxonomy disclosures render collapsed by default — headings visible, chips hidden until expanded", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Profession & Activity" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Personality & Traits" })).toBeVisible();

  // Exactly the two taxonomy sections use <details>, and both start closed.
  const disclosures = page.locator(".tgi-taxonomy-disclosure");
  await expect(disclosures).toHaveCount(2);
  const openStates = await disclosures.evaluateAll((els) => els.map((el) => (el as HTMLDetailsElement).open));
  for (const isOpen of openStates) {
    expect(isOpen, "taxonomy disclosures must start collapsed").toBe(false);
  }

  await expect(page.getByRole("checkbox", { name: "Philosophy" })).not.toBeVisible();
  await expect(page.getByRole("checkbox", { name: "Curiosity" })).not.toBeVisible();

  await openSection(page, "Profession & Activity");
  await expect(page.getByRole("checkbox", { name: "Philosophy" })).toBeVisible();
  await openSection(page, "Personality & Traits");
  await expect(page.getByRole("checkbox", { name: "Curiosity" })).toBeVisible();
});

test("people directory: a section's <summary> is keyboard-reachable and toggles with Enter, with a visible focus ring", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const summary = disclosureFor(page, "Profession & Activity").locator("summary");
  await summary.focus();
  const boxShadow = await summary.evaluate((el) => getComputedStyle(el).boxShadow);
  expect(boxShadow, "focused summary must show a visible focus ring").not.toBe("none");

  expect(await isSectionOpen(page, "Profession & Activity")).toBe(false);
  await page.keyboard.press("Enter");
  expect(await isSectionOpen(page, "Profession & Activity")).toBe(true);
  await expect(page.getByRole("checkbox", { name: "Philosophy" })).toBeVisible();
});

/**
 * Chip visual/accessibility polish pass (2026-08): replaced the earlier
 * <label><input></label> + :has() treatment with this project's OWN
 * established accessible custom-control pattern (quiz.tsx's ChoiceGroup —
 * a real input, invisible via opacity:0 but stretched to cover the whole
 * chip, styled via the adjacent-sibling combinator on its <label>). This
 * locks in that the swap didn't regress anything: the checkbox is still a
 * real, keyboard-focusable, checked/unchecked-announced control, and the
 * selected state is shown via BOTH a fill/border change AND a checkmark
 * glyph that expands in — never colour alone (CLAUDE.md design invariant).
 */
test("people directory: chip selected state is a real checkbox, shown via fill+checkmark, not colour alone", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Profession & Activity");
  const checkbox = page.getByRole("checkbox", { name: "Philosophy" });
  const label = page.locator('label[for="field-filter-philosophy"]');
  const checkGlyph = label.locator(".tgi-taxonomy-chip__check");

  const bgBefore = await label.evaluate((el) => getComputedStyle(el).backgroundColor);
  const checkWidthBefore = await checkGlyph.evaluate((el) => getComputedStyle(el).width);
  expect(parseFloat(checkWidthBefore)).toBe(0);

  await checkbox.check();
  await expect(checkbox).toBeChecked();

  const bgAfter = await label.evaluate((el) => getComputedStyle(el).backgroundColor);
  const checkWidthAfter = await checkGlyph.evaluate((el) => getComputedStyle(el).width);
  expect(bgAfter, "background must change on selection, not stay identical").not.toBe(bgBefore);
  expect(parseFloat(checkWidthAfter), "checkmark glyph must become visible on selection").toBeGreaterThan(0);

  // Keyboard: the real input is reachable and toggleable via Space, exactly
  // like any native checkbox — no custom-control keyboard regression.
  await checkbox.uncheck();
  await checkbox.focus();
  await page.keyboard.press("Space");
  await expect(checkbox).toBeChecked();
});

test("people directory: chip checkbox shows a visible focus ring on the label when tabbed to", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  // Open via keyboard (focus the summary, press Enter) rather than
  // openSection()'s mouse click — Chromium's :focus-visible heuristic
  // attributes a later programmatic .focus() to whichever input modality
  // (mouse/keyboard) most recently touched the page, so an intervening
  // mouse click here would make the checkbox's focus ring assertion below
  // fail even though a real keyboard user (Tab to summary, Enter, Tab to
  // the chip) would see the ring exactly as expected.
  const summary = disclosureFor(page, "Profession & Activity").locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  const checkbox = page.getByRole("checkbox", { name: "Philosophy" });
  const label = page.locator('label[for="field-filter-philosophy"]');
  await checkbox.focus();
  const boxShadow = await label.evaluate((el) => getComputedStyle(el).boxShadow);
  expect(boxShadow, "focused chip label must show a visible focus ring").not.toBe("none");
});

test("people directory: selecting two chips in the same taxonomy group ORs (either qualifies)", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Profession & Activity");
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();

  await page.getByRole("checkbox", { name: "Mathematics" }).check();
  const mathOnly = Number((await countText())!.match(/^\d+/)![0]);

  await page.getByRole("checkbox", { name: "Physics" }).check();
  const mathOrPhysics = Number((await countText())!.match(/^\d+/)![0]);

  // OR can only add matches, never remove — selecting a second profession
  // chip must not shrink the result set.
  expect(mathOrPhysics).toBeGreaterThanOrEqual(mathOnly);
});

test("people directory: two personality chips in the SAME facet OR (Curiosity + Analytical Rigour, both Thinking)", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Personality & Traits");
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();

  await page.getByRole("checkbox", { name: "Curiosity" }).check();
  const curiosityOnly = Number((await countText())!.match(/^\d+/)![0]);

  await page.getByRole("checkbox", { name: "Analytical Rigour" }).check();
  const eitherThinkingTrait = Number((await countText())!.match(/^\d+/)![0]);

  // Same-facet selections OR — adding a second Thinking chip can only add
  // matches, never shrink the result set.
  expect(eitherThinkingTrait).toBeGreaterThanOrEqual(curiosityOnly);
});

test("people directory: two personality chips in DIFFERENT facets AND (Curiosity/Thinking + Collaboration/Social) — the cross-facet fix", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Personality & Traits");
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();

  await page.getByRole("checkbox", { name: "Curiosity" }).check();
  const curiosityOnly = Number((await countText())!.match(/^\d+/)![0]);
  await page.getByRole("checkbox", { name: "Collaboration" }).check();
  const both = Number((await countText())!.match(/^\d+/)![0]);
  await page.getByRole("checkbox", { name: "Curiosity" }).uncheck();
  const collaborationOnly = Number((await countText())!.match(/^\d+/)![0]);

  // Cross-facet AND can only narrow, never exceed either single-facet result
  // — this is the exact behavior that was broken (previously a flat OR
  // across every selected personality attribute regardless of facet).
  expect(both).toBeLessThanOrEqual(Math.min(curiosityOnly, collaborationOnly));
  expect(both).toBeGreaterThan(0);

  // Recheck curiosity and verify every visible result is a real person card
  // (i.e. the narrowed set is non-trivial, not an accidental empty state).
  await page.getByRole("checkbox", { name: "Curiosity" }).check();
  await expect(page.locator(".tgi-personcard").first()).toBeVisible();
});

test("people directory: profession OR-group + 2 personality facets ANDs all three conditions (full example from spec)", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Profession & Activity");
  await openSection(page, "Personality & Traits");
  // Profession/Activity OR-group: Mathematics OR Physics.
  await page.getByRole("checkbox", { name: "Mathematics" }).check();
  await page.getByRole("checkbox", { name: "Physics" }).check();
  // Personality: Experimentation (Creativity facet) + Adaptability (Resilience facet).
  await page.getByRole("checkbox", { name: "Experimentation" }).check();
  await page.getByRole("checkbox", { name: "Adaptability" }).check();

  const cards = page.locator(".tgi-personcard");
  const count = await cards.count();
  expect(count).toBeGreaterThanOrEqual(0); // may legitimately be 0 — the assertion below is what matters

  // Verify every returned person actually satisfies every condition by
  // cross-checking against the person detail page's own rendered data would
  // be excessive here; instead assert the algebraic invariant: this 4-
  // condition result can never exceed any single condition's own count.
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();
  const combined = Number((await countText())!.match(/^\d+/)![0]);

  await page.getByRole("checkbox", { name: "Experimentation" }).uncheck();
  await page.getByRole("checkbox", { name: "Adaptability" }).uncheck();
  const professionOnly = Number((await countText())!.match(/^\d+/)![0]);

  expect(combined).toBeLessThanOrEqual(professionOnly);
});

test("people directory ko-KR: cross-facet personality AND gives the same result as en-US (locale-independent semantics)", async ({
  page,
}) => {
  await page.goto("/ko-KR/people", { waitUntil: "networkidle" });
  await openSection(page, "성격과 성향");
  await page.getByRole("checkbox", { name: "호기심" }).check(); // Curiosity (Thinking)
  await page.getByRole("checkbox", { name: "협업 성향" }).check(); // Collaboration (Social)
  // "전체 {total}명 중 {count}명" — independently confirmed (via a direct
  // SEED_PEOPLE check) that exactly 5 people satisfy curiosity AND
  // collaboration: Abraham Lincoln, Benjamin Franklin, Charles Darwin, Jane
  // Goodall, Oprah Winfrey. This regression-locks the cross-facet AND fix in
  // the locale that renders count text in a different word order than en-US.
  // Total updated 95->96 (roster-expansion-125, Miriam Makeba promoted via
  // roster11.ts), then 96->97 (roster-12 new-intake batch, Marcus Aurelius
  // promoted via roster12.ts) — the filtered count of 4 was unchanged by
  // either addition. Total updated 97->108 (roster-14 coverage-aware
  // intake, 11 people promoted via roster14.ts) — Abraham Lincoln (scored
  // curiosity 78, collaboration 75, both "advantage") newly satisfies this
  // specific combination, raising the filtered count to 5. Total updated
  // 108->116 (roster-15 coverage-aware intake, 8 people promoted via
  // roster15.ts) — none of the 8 new people satisfy this specific
  // curiosity+collaboration combination, so the filtered count of 5 is
  // unchanged. Total updated 116->125 (roster-16 final intake, 9 people
  // promoted via roster16.ts) — verified directly against the real
  // traitScoreGroups z-score filter (minZ=1.0, minConfidence=0.5) that
  // none of the 9 new people cross both thresholds simultaneously, so the
  // filtered count of 5 is unchanged. Total updated 125->126 (roster-17
  // intake, 1 person promoted via roster17.ts) — John von Neumann (scored
  // curiosity 90/confidence 0.7, collaboration 78/confidence 0.55) newly
  // crosses both z-score thresholds simultaneously, raising the filtered
  // count to 6.
  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).toMatch(/전체\s*126명\s*중\s*6명/);
});

test("people directory: era + region compose correctly with cross-facet personality AND", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Personality & Traits");
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();

  await page.getByRole("checkbox", { name: "Curiosity" }).check();
  await page.getByRole("checkbox", { name: "Collaboration" }).check();
  const traitOnly = Number((await countText())!.match(/^\d+/)![0]);

  await page.getByRole("combobox", { name: "Era" }).selectOption({ label: "19th Century" });
  const traitAndEra = Number((await countText())!.match(/^\d+/)![0]);

  // Adding an era filter on top can only narrow further.
  expect(traitAndEra).toBeLessThanOrEqual(traitOnly);

  // Every visible card must actually be 19th Century.
  const subtitles = await page.locator(".tgi-personcard").allTextContents();
  for (const text of subtitles) {
    if (text.trim().length === 0) continue;
    expect(text).toContain("19th Century");
  }
});

test("people directory: a profession chip AND a personality chip ANDs across the two axes", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Profession & Activity");
  await openSection(page, "Personality & Traits");
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();

  await page.getByRole("checkbox", { name: "Philosophy" }).check();
  const professionOnly = Number((await countText())!.match(/^\d+/)![0]);

  await page.getByRole("checkbox", { name: "Curiosity" }).check();
  const both = Number((await countText())!.match(/^\d+/)![0]);

  // AND across axes can only narrow the result set, never widen it.
  expect(both).toBeLessThanOrEqual(professionOnly);

  // Selected-filter summary shows both chips with working remove controls.
  await expect(page.getByRole("button", { name: "Remove Philosophy filter" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Remove Curiosity filter" })).toBeVisible();

  await page.getByRole("button", { name: "Clear all" }).click();
  await expect(page.getByRole("checkbox", { name: "Philosophy" })).not.toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Curiosity" })).not.toBeChecked();
  await expect(page.getByRole("button", { name: "Clear all" })).toHaveCount(0);
});

/**
 * Progressive disclosure: a collapsed section with an active selection must
 * say so in its own heading, and re-opening it must show the exact same
 * selection that was there before it collapsed — collapsing is presentation
 * only, never a reset of `fieldIds`/`traitIds` state.
 */
test("people directory: collapsing a section with an active filter shows the count in its heading, and the selection survives collapse/reopen", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Personality & Traits");
  await page.getByRole("checkbox", { name: "Curiosity" }).check();
  await page.getByRole("checkbox", { name: "Collaboration" }).check();
  const countText = () => page.getByText(/^\d+ (of \d+ )?people$/).textContent();
  const beforeCollapse = (await countText())!;

  await collapseSection(page, "Personality & Traits");
  await expect(page.getByRole("heading", { name: "Personality & Traits · 2 selected" })).toBeVisible();
  // The chips themselves are no longer interactable while collapsed, but the
  // outside-the-accordion selected-filter summary still shows both.
  await expect(page.getByRole("button", { name: "Remove Curiosity filter" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Remove Collaboration filter" })).toBeVisible();
  expect(await countText()).toBe(beforeCollapse);

  await openSection(page, "Personality & Traits");
  await expect(page.getByRole("checkbox", { name: "Curiosity" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Collaboration" })).toBeChecked();
  expect(await countText()).toBe(beforeCollapse);
});

test("people directory: one section can be expanded while the other stays collapsed, independently", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Profession & Activity");
  expect(await isSectionOpen(page, "Profession & Activity")).toBe(true);
  expect(await isSectionOpen(page, "Personality & Traits")).toBe(false);
  await expect(page.getByRole("checkbox", { name: "Philosophy" })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "Curiosity" })).not.toBeVisible();
});

test("people directory: search composes with taxonomy filters and the empty state recovers", async ({ page }) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Profession & Activity");
  await page.getByRole("checkbox", { name: "Sport" }).check();
  await page.getByPlaceholder(/search/i).fill("zzzzzzzznotarealperson");
  await page.waitForTimeout(150);
  await expect(page.getByText(/no one matches/i)).toBeVisible();
  // Taxonomy stays visible and scannable even on the empty state.
  await expect(page.getByRole("heading", { name: "Profession & Activity" })).toBeVisible();

  await page.getByPlaceholder(/search/i).fill("");
  await page.waitForTimeout(150);
  await expect(page.getByText(/no one matches/i)).toHaveCount(0);
});

test("people directory @ 328px: taxonomy stays visible collapsed, no horizontal scroll, chips wrap once expanded", async ({
  page,
}) => {
  await page.setViewportSize({ width: 328, height: 1200 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Profession & Activity" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Personality & Traits" })).toBeVisible();
  expect(await page.locator(".tgi-taxonomy-disclosure").count()).toBe(2);
  await assertNoHorizontalOverflow(page);

  await openSection(page, "Profession & Activity");
  await openSection(page, "Personality & Traits");
  await assertNoHorizontalOverflow(page);
});

test("people directory ko-KR: taxonomy section headings and chip labels are localized, not raw ids", async ({
  page,
}) => {
  await page.goto("/ko-KR/people", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "직업과 활동 분야" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "성격과 성향" })).toBeVisible();
  await openSection(page, "직업과 활동 분야");
  await openSection(page, "성격과 성향");
  await expect(page.getByRole("checkbox", { name: "철학" })).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "호기심" })).toBeVisible();
  // No raw underscored ids leaking into the UI (e.g. "natural_science").
  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).not.toMatch(/[a-z]+_[a-z]+/);
});

/**
 * Density polish pass (2026-08): Profession/Activity and Personality/Trait
 * sit side by side at the wide-desktop breakpoint (>=1280px, this project's
 * one intentional breakpoint), and each category row collapses from a
 * label-left/chips-right layout to stacked below 640px (matching the
 * existing .tgi-filter-bar/.tgi-results-discovery-grid mobile threshold).
 * Structural checks, not pixel-exact height assertions — those would be
 * brittle to future roster/taxonomy growth; the point under test is that
 * the layout mechanism is actually active at each breakpoint.
 */
test("people directory @ 1280px: Profession/Activity and Personality/Trait render as two columns", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Profession & Activity");
  await openSection(page, "Personality & Traits");
  const columns = await page
    .locator(".tgi-taxonomy-columns")
    .evaluate((el) => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length);
  expect(columns, "two-column layout should be active at 1280px").toBe(2);
  await assertNoHorizontalOverflow(page);
});

test("people directory @ 768px: category rows use a label-left/chips-right layout, sections stay stacked", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await openSection(page, "Profession & Activity");
  const columnsDisplay = await page.locator(".tgi-taxonomy-columns").evaluate((el) => getComputedStyle(el).display);
  expect(columnsDisplay, "Profession/Personality sections should be stacked below 1280px").toBe("flex");

  const categoryColumns = await page
    .locator(".tgi-taxonomy-category")
    .first()
    .evaluate((el) => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length);
  expect(categoryColumns, "category rows should be a 2-column label/chips grid at 768px").toBe(2);
  await assertNoHorizontalOverflow(page);
});

test("people directory @ 390px: category rows collapse to a single stacked column, taxonomy still visible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Profession & Activity" })).toBeVisible();
  expect(await page.locator(".tgi-taxonomy-disclosure").count()).toBe(2);
  await openSection(page, "Profession & Activity");
  const categoryColumns = await page
    .locator(".tgi-taxonomy-category")
    .first()
    .evaluate((el) => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length);
  expect(categoryColumns, "category rows should collapse to 1 column below 640px").toBe(1);
  await expect(page.getByRole("checkbox", { name: "Philosophy" })).toBeVisible();
  await assertNoHorizontalOverflow(page);
});
