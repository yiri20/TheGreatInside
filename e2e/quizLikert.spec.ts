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
// Entry-flow polish (2026-08): the intro CTA is deliberately just "Start" /
// "시작하기" now — the outcome-oriented wording ("Find My Historical Match" /
// "나와 닮은 인물 찾기") lives on Landing's own CTA (landing.cta_primary), so
// this second screen doesn't repeat it. See CLAUDE.md governing principle:
// "the first CTA chooses the experience; the second CTA begins it."
const START_LABEL: Record<string, string> = {
  "en-US": "Start",
  "ko-KR": "시작하기",
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

/**
 * Quiz intro time/sign-in cue (2026-08 quick win, body copy trimmed further
 * in the 2026-08 entry-flow polish pass): a restrained metadata line near
 * the Start button — question count, time estimate, and confirmation that
 * no sign-in is required for the free quiz/result path. The body copy
 * (`quiz.intro.body`) used to ALSO restate the count and duration inline
 * ("64 short questions... Most people finish in around 10-15 minutes"),
 * which is exactly the duplication this metadata line was meant to replace
 * — trimmed once the metadata line existed to carry that information, so
 * the count/duration now appears exactly once on the screen, not twice.
 */
const META_LOCALES: Record<string, RegExp> = {
  "en-US": /^\d+ questions · about \d+–\d+ min · no sign-in required$/,
  "ko-KR": /^\d+문항 · 약 \d+–\d+분 · 로그인 필요 없음$/,
};

for (const [locale, pattern] of Object.entries(META_LOCALES)) {
  test(`quiz intro @ ${locale}: shows question count / time / no-sign-in cue near Start, not duplicated in body`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/quiz`, { waitUntil: "networkidle" });
    const startButton = page.getByRole("button", { name: START_LABEL[locale] });
    await expect(startButton).toBeVisible();

    const meta = page.getByText(pattern);
    await expect(meta).toBeVisible();
    const metaText = (await meta.textContent())!;
    const count = Number(metaText.match(/\d+/)![0]);
    expect(count).toBeGreaterThan(0);

    // The body copy must NOT also restate the count/duration inline — that
    // redundancy is exactly what this metadata line replaced.
    const bodyText = (await page.locator("main").textContent())!;
    const metaLessBody = bodyText.replace(metaText, "");
    expect(metaLessBody).not.toMatch(/\d+\s*(short questions|questions|문항)/);
    expect(metaLessBody).not.toMatch(/\d+[-–]\d+\s*(minutes|min|분)/);

    // Physically near the Start button, not buried elsewhere on the screen.
    const startBox = await startButton.boundingBox();
    const metaBox = await meta.boundingBox();
    expect(startBox && metaBox).toBeTruthy();
    expect(Math.abs(metaBox!.y - startBox!.y)).toBeLessThan(120);
  });
}

/**
 * Endpoint-clarity hotfix (2026-08): a real user reported that the left/
 * right endpoint descriptions were impossible to associate with the
 * correct end of the 1-7 scale — because the anchors used to flank the
 * options row in a flex row that became a COLUMN below 640px, stacking
 * "left anchor ABOVE the row, right anchor BELOW it" with no tie to either
 * end. Fixed by moving both anchors into their own row directly beneath
 * the options, at every viewport, space-between so the left one sits under
 * "1" and the right one under "7". This locks in: (a) an instruction line
 * exists, (b) both anchors share one row (never stacked vertically) at
 * both a narrow and a wide viewport, (c) that row sits BELOW the options
 * row, (d) the left anchor is left of the right anchor (still the correct
 * 1<->left / 7<->right order), and (e) the no-wrap fix from the prior
 * session still holds.
 */
const ENDPOINT_WIDTHS = [320, 390, 1280];

for (const width of ENDPOINT_WIDTHS) {
  for (const locale of ["en-US", "ko-KR"] as const) {
    test(`quiz Likert endpoint clarity @ ${locale} @ ${width}px: instruction shown, both anchors in one row below the scale, left<->1 / right<->7 order preserved`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await startQuiz(page, locale);

      const instruction = page.locator(".tgi-likert__instruction").first();
      await expect(instruction, "instruction line must be present and visible").toBeVisible();
      const instructionText = (await instruction.textContent())!.trim();
      expect(instructionText.length, "instruction text must not be empty").toBeGreaterThan(0);

      const group = page.locator(".tgi-likert").first();
      const leftAnchor = group.locator(".tgi-likert__anchor--left");
      const rightAnchor = group.locator(".tgi-likert__anchor--right");
      await expect(leftAnchor).toBeVisible();
      await expect(rightAnchor).toBeVisible();

      const [leftBox, rightBox, optionsBox, firstOptionBox, lastOptionBox] = await Promise.all([
        leftAnchor.boundingBox(),
        rightAnchor.boundingBox(),
        group.locator(".tgi-likert__options").boundingBox(),
        group.locator(".tgi-likert__option").first().boundingBox(),
        group.locator(".tgi-likert__option").last().boundingBox(),
      ]);
      expect(leftBox && rightBox && optionsBox && firstOptionBox && lastOptionBox).toBeTruthy();

      // (b) Both anchors share one row — never one above/one below the other.
      expect(
        Math.abs(leftBox!.y - rightBox!.y),
        `left/right anchors must be in the same row, got left.y=${leftBox!.y} right.y=${rightBox!.y}`,
      ).toBeLessThan(2);

      // (c) The anchor row sits below the 1-7 options row, never above or
      // interleaved with it (the exact bug: anchor ABOVE the row on mobile).
      expect(leftBox!.y, "anchor row must render below the options row").toBeGreaterThanOrEqual(optionsBox!.y + optionsBox!.height - 1);

      // (d) Left anchor stays left of right anchor (1<->left, 7<->right),
      // and each sits on the correct side of the options row's horizontal
      // centre — "left under 1, right under 7", not swapped or centred.
      expect(leftBox!.x, "left anchor must start left of the right anchor").toBeLessThan(rightBox!.x);
      const optionsCenter = optionsBox!.x + optionsBox!.width / 2;
      expect(leftBox!.x, "left anchor must sit left of the scale's horizontal centre").toBeLessThan(optionsCenter);
      expect(rightBox!.x + rightBox!.width, "right anchor must sit right of the scale's horizontal centre").toBeGreaterThan(
        optionsCenter,
      );

      // (e) Still exactly one row of 7 unwrapped options (no-wrap fix intact).
      const optionTops = await group
        .locator(".tgi-likert__option")
        .evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top)));
      expect(optionTops).toHaveLength(7);
      expect(new Set(optionTops).size, `options must render on one row, got tops: ${optionTops.join(",")}`).toBe(1);
      expect(firstOptionBox!.x).toBeLessThan(lastOptionBox!.x);

      await assertNoHorizontalOverflow(page);
    });
  }
}
