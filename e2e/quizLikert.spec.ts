import { test, expect, type Page } from "@playwright/test";
import { assertNoHorizontalOverflow, captureConsole } from "./utils/visualChecks";

/**
 * Mobile quiz Likert-scale wrapping regression (formerly the standing
 * blocker documented in docs/context/CURRENT_STATE.md). Seven 44px circles
 * + six 8px gaps need 356px, but the quiz's content width is only
 * ~288-358px across real phone viewports (container padding eats the
 * rest) — the row used to wrap into an orphaned split (6+1 at 375px, 5+2
 * at 320px) instead of rendering one even row. Fixed in
 * src/ui/styles/components.css by shrinking the visible circle and gap
 * under the existing 640px breakpoint, while keeping the invisible tap
 * target close to 44px via a small negative `inset` on the input that
 * meets its neighbour's exactly at the gap midpoint (no dead zone, no
 * overlap). `ChoiceGroup` (multi-choice cards) was never affected — this
 * file also guards that it stays that way.
 */
const START_LABEL: Record<string, string> = {
  "en-US": "Start the Quiz",
  "ko-KR": "설문 시작하기",
};
const NEXT_LABEL: Record<string, string> = {
  "en-US": "Next",
  "ko-KR": "다음",
};

async function startQuiz(page: Page, locale: string): Promise<void> {
  await page.goto(`/${locale}/quiz`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: START_LABEL[locale] }).click();
}

/** Answers whatever is on the current screen (first option of every group)
 *  and advances, until `selector` is visible or `maxScreens` is exhausted.
 *  Generic across screen-grouping/reordering so it doesn't hardcode a
 *  question index. */
async function advanceUntilVisible(page: Page, locale: string, selector: string, maxScreens = 25): Promise<boolean> {
  for (let i = 0; i < maxScreens; i++) {
    if ((await page.locator(selector).count()) > 0) return true;

    // The invisible input is stacked ABOVE the visible label (z-index:1) so
    // it — not the label — is the actual tap target real users hit; click
    // it directly rather than the label, which Playwright can't otherwise
    // reach (the input intercepts pointer events at the label's coordinates).
    const likertGroups = await page.locator(".tgi-likert").all();
    for (const g of likertGroups) {
      await g.locator(".tgi-likert__input").first().click();
    }
    const choiceGroups = await page.locator(".tgi-choicegroup").all();
    for (const g of choiceGroups) {
      await g.locator(".tgi-choicecard__input").first().click();
    }

    const nextBtn = page.getByRole("button", { name: NEXT_LABEL[locale] });
    if (!(await nextBtn.isEnabled())) return false;
    await nextBtn.click();
  }
  return false;
}

const NARROW_WIDTHS = [320, 328, 360, 375, 390];
const WIDE_WIDTHS = [768, 1280];

for (const width of NARROW_WIDTHS) {
  test(`quiz Likert: 7 options render in a single unwrapped row at ${width}px (en-US)`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const console_ = captureConsole(page);
    await startQuiz(page, "en-US");

    const options = page.locator(".tgi-likert__option");
    await expect(options).toHaveCount(7);
    const tops = await options.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top)));
    expect(new Set(tops).size, `expected all 7 options on one row at ${width}px, got tops: ${tops.join(",")}`).toBe(1);

    await assertNoHorizontalOverflow(page);
    expect(console_.errors, `console errors: ${JSON.stringify(console_.errors)}`).toEqual([]);
    expect(console_.pageErrors, `page errors: ${JSON.stringify(console_.pageErrors)}`).toEqual([]);
  });
}

test("quiz Likert: invisible tap targets stay >=36px, touch, and never overlap at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await startQuiz(page, "en-US");

  const boxes = await page
    .locator(".tgi-likert__input")
    .evaluateAll((els) => els.map((el) => el.getBoundingClientRect()).map((r) => ({ left: r.left, right: r.right, width: r.width, height: r.height })));
  expect(boxes).toHaveLength(7);
  for (const box of boxes) {
    expect(box.width, "invisible tap target width dropped below 36px").toBeGreaterThanOrEqual(36);
    expect(box.height, "invisible tap target height dropped below 36px").toBeGreaterThanOrEqual(36);
  }
  for (let i = 1; i < boxes.length; i++) {
    expect(boxes[i]!.left, `tap targets ${i - 1} and ${i} overlap`).toBeGreaterThanOrEqual(boxes[i - 1]!.right - 0.5);
  }
});

for (const width of WIDE_WIDTHS) {
  test(`quiz Likert: full 44px circle, unwrapped, above the mobile breakpoint at ${width}px (no regression)`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await startQuiz(page, "en-US");

    const options = page.locator(".tgi-likert__option");
    const tops = await options.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top)));
    expect(new Set(tops).size, `expected one row at ${width}px, got tops: ${tops.join(",")}`).toBe(1);

    const size = await page.locator(".tgi-likert__label").first().evaluate((el) => el.getBoundingClientRect().width);
    expect(size, `expected the full 44px circle at ${width}px`).toBeGreaterThanOrEqual(43);
    await assertNoHorizontalOverflow(page);
  });
}

test("quiz Likert: selected state changes both border-weight and fill (not colour alone), unselected options stay default", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await startQuiz(page, "en-US");

  const unselectedStyle = await page
    .locator(".tgi-likert__label")
    .first()
    .evaluate((el) => {
      const cs = getComputedStyle(el);
      return { bg: cs.backgroundColor, borderWidth: cs.borderTopWidth };
    });

  await page.locator(".tgi-likert__input").nth(4).click();

  const checkedInput = page.locator(".tgi-likert__input:checked");
  await expect(checkedInput).toHaveCount(1);
  await expect(checkedInput).toHaveAttribute("aria-label", "5");

  const selectedStyle = await page
    .locator(".tgi-likert__input:checked + .tgi-likert__label")
    .evaluate((el) => {
      const cs = getComputedStyle(el);
      return { bg: cs.backgroundColor, borderWidth: cs.borderTopWidth };
    });

  expect(selectedStyle.borderWidth, "selected option should render a heavier border than an unselected one").not.toBe(
    unselectedStyle.borderWidth,
  );
  expect(selectedStyle.bg, "selected option should render a different fill than an unselected one").not.toBe(
    unselectedStyle.bg,
  );
});

test("quiz Likert: keyboard focus reaches an option and shows a visible focus ring", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await startQuiz(page, "en-US");

  let reachedLikertInput = false;
  for (let i = 0; i < 15 && !reachedLikertInput; i++) {
    await page.keyboard.press("Tab");
    reachedLikertInput = await page.evaluate(
      () => document.activeElement?.classList.contains("tgi-likert__input") ?? false,
    );
  }
  expect(reachedLikertInput, "keyboard Tab never reached a Likert option").toBe(true);

  const focusedLabelBoxShadow = await page.evaluate(() => {
    const input = document.activeElement as HTMLInputElement;
    const label = input.nextElementSibling as HTMLElement;
    return getComputedStyle(label).boxShadow;
  });
  expect(focusedLabelBoxShadow, "focus-visible should render a visible box-shadow ring").not.toBe("none");
});

test("quiz: ChoiceGroup multi-choice cards are unaffected by the Likert fix — single column, no overflow at 320px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await startQuiz(page, "en-US");
  const reached = await advanceUntilVisible(page, "en-US", ".tgi-choicegroup__grid");
  expect(reached, "never reached a ChoiceGroup screen within the screen budget").toBe(true);

  const columns = await page
    .locator(".tgi-choicegroup__grid")
    .first()
    .evaluate((el) => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length);
  expect(columns, "ChoiceGroup should render a single column at 320px").toBe(1);
  await assertNoHorizontalOverflow(page);
});

test("quiz Likert @ ko-KR: 7 options render in a single unwrapped row at 320px (EN/KO parity)", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await startQuiz(page, "ko-KR");

  const options = page.locator(".tgi-likert__option");
  await expect(options).toHaveCount(7);
  const tops = await options.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top)));
  expect(new Set(tops).size, `expected all 7 options on one row at 320px (ko-KR), got tops: ${tops.join(",")}`).toBe(1);
  await assertNoHorizontalOverflow(page);
});
