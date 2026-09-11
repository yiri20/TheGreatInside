import { test, expect, type Page } from "@playwright/test";

/**
 * Interest-area viewing preference (optional): Landing copy simplification
 * + optional quiz-intro category picker + Results category-first display.
 * One focused spec per this feature's own "do not create four or five
 * redundant spec files" instruction — see
 * src/core/matching/interestScope.ts and docs/checkpoints/ (if a checkpoint
 * doc exists) for the underlying "viewing preference only, never an input
 * into scoring" architecture.
 *
 * The `?r=` token below is the SAME synthetic `neutral` fixture already
 * committed for `share.spec.ts` (generated via `encodeResultToken` against a
 * fixed answer pattern) — never a real user's result. For this exact token,
 * empirically confirmed against a real dev build: the true global closest
 * match is Ibn Khaldun (historian); Science & Knowledge reproduces him
 * (duplicate case); Building & Discovery (Wilbur Wright) and Leadership &
 * Society (Marcus Aurelius) do not (non-duplicate case).
 */
const SYNTHETIC_TOKEN = "quiz_v2.a444a44a444a4a444444a44444a44aa44a4444a4444a4a4444a4444444444444";
const resultsUrl = (locale: string, scope?: string) =>
  `/${locale}/results?r=${encodeURIComponent(SYNTHETIC_TOKEN)}${scope ? `&scope=${scope}` : ""}`;

const START_LABEL: Record<string, string> = { "en-US": "Start", "ko-KR": "시작하기" };
const NEXT_LABEL: Record<string, string> = { "en-US": "Next", "ko-KR": "다음" };
const SEE_RESULTS_LABEL: Record<string, string> = { "en-US": "See My Results", "ko-KR": "결과 보기" };

/** Answers whatever is on the current quiz screen (first option of every
 *  group on it) and advances until the browser navigates to `/results`.
 *  Mirrors `quizLikert.spec.ts`'s own `advanceUntilVisible` pattern -- no
 *  explicit inter-click wait is needed because every locator query below
 *  (and the final `toHaveURL` assertion) already auto-waits. The route
 *  never changes mid-quiz (only screenIndex/stage state does), so waiting
 *  on the URL itself during the loop would resolve trivially/instantly. */
async function completeQuiz(page: Page, locale: string): Promise<void> {
  // 64 questions, grouped multiple-per-screen -- comfortably fewer than 80
  // screens even in the worst case (one question per screen).
  for (let i = 0; i < 80; i++) {
    if (/\/results\?/.test(page.url())) return;
    try {
      const likertGroups = await page.locator(".tgi-likert").all();
      for (const g of likertGroups) await g.locator(".tgi-likert__input").first().click({ timeout: 3000 });
      const choiceGroups = await page.locator(".tgi-choicegroup").all();
      for (const g of choiceGroups) await g.locator(".tgi-choicecard__input").first().click({ timeout: 3000 });

      const nextBtn = page.getByRole("button", { name: new RegExp(`^(${NEXT_LABEL[locale]}|${SEE_RESULTS_LABEL[locale]})$`) });
      await nextBtn.click({ timeout: 3000 });
    } catch {
      // The final "See My Results" click triggers a real route change
      // (router.push), unlike every other screen-to-screen transition
      // (internal state only) -- a click can legitimately throw if it
      // lands mid-navigation. Fall through to the url check below instead
      // of treating that as a hard failure.
      if (/\/results\?/.test(page.url())) return;
    }
  }
  await expect(page).toHaveURL(/\/results\?/, { timeout: 5000 });
}

test.describe("Landing: roster count removed", () => {
  test("en-US: new subtitle, no person-count interpolation", async ({ page }) => {
    await page.goto("/en-US", { waitUntil: "networkidle" });
    await expect(
      page.getByText("Discover which extraordinary people from history think and work most like you."),
    ).toBeVisible();
    const bodyText = (await page.locator("main").textContent())!;
    expect(bodyText).not.toMatch(/\d+\s+extraordinary/i);
  });

  test("ko-KR: new subtitle, no person-count interpolation", async ({ page }) => {
    await page.goto("/ko-KR", { waitUntil: "networkidle" });
    await expect(
      page.getByText("당신의 사고방식과 행동 패턴을 바탕으로, 역사 속 비범한 인물 중 누구와 가장 닮았는지 찾아보세요."),
    ).toBeVisible();
    const bodyText = (await page.locator("main").textContent())!;
    expect(bodyText).not.toMatch(/\d+명의/);
  });
});

test.describe("Quiz intro: optional interest-area picker", () => {
  for (const locale of ["en-US", "ko-KR"] as const) {
    test(`defaults to All and renders (${locale})`, async ({ page }) => {
      await page.goto(`/${locale}/quiz`, { waitUntil: "networkidle" });
      await expect(page.locator('.tgi-choicecard__input[value="all"]')).toBeChecked();
      await expect(page.getByRole("button", { name: START_LABEL[locale] })).toBeEnabled();
    });
  }

  test("selection is optional -- Start advances without touching the picker (en-US)", async ({ page }) => {
    await page.goto("/en-US/quiz", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: START_LABEL["en-US"] }).click();
    await expect(page.locator(".tgi-likert, .tgi-choicegroup").first()).toBeVisible();
  });

  test("selecting a category and completing the quiz appends &scope= to the Results URL (en-US)", async ({ page }) => {
    await page.goto("/en-US/quiz", { waitUntil: "networkidle" });
    // The invisible radio input is stacked above its visible label (same
    // z-index pattern as the Likert scale, see quizLikert.spec.ts) -- click
    // the input directly by its `value`, not the label text.
    await page.locator('.tgi-choicecard__input[value="arts_culture"]').click();
    await page.getByRole("button", { name: START_LABEL["en-US"] }).click();
    await completeQuiz(page, "en-US");
    expect(page.url()).toContain("scope=arts_culture");
    expect(page.url()).toMatch(/[?&]r=/);
  });

  test("leaving the picker at All completes to the plain Results URL, no &scope= (en-US)", async ({ page }) => {
    await page.goto("/en-US/quiz", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: START_LABEL["en-US"] }).click();
    await completeQuiz(page, "en-US");
    expect(page.url()).not.toContain("scope=");
    expect(page.url()).toMatch(/[?&]r=/);
  });
});

test.describe("Quiz draft: interest scope persists through refresh, backward-compatible", () => {
  test("selecting a category, answering one question, then refreshing keeps the scope (en-US)", async ({ page }) => {
    await page.goto("/en-US/quiz", { waitUntil: "networkidle" });
    await page.locator('.tgi-choicecard__input[value="building_discovery"]').click();
    await page.getByRole("button", { name: START_LABEL["en-US"] }).click();
    // Answer whatever is on the first real question screen so a draft exists.
    const likert = page.locator(".tgi-likert__input").first();
    const choice = page.locator(".tgi-choicecard__input").first();
    if (await likert.count()) await likert.click();
    else await choice.click();

    await page.reload({ waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Continue|계속/ }).click();
    // Finish the quiz from wherever resume left off and confirm the scope survived.
    await completeQuiz(page, "en-US");
    expect(page.url()).toContain("scope=building_discovery");
  });

  test("an old-format draft with no interestScope field still resumes normally (en-US)", async ({ page }) => {
    await page.goto("/en-US/quiz", { waitUntil: "networkidle" });
    // Simulate a draft saved before this feature existed: quizVersion +
    // responses only, no interestScope key at all.
    await page.evaluate(() => {
      window.localStorage.setItem(
        "tgi_quiz_draft_v1",
        JSON.stringify({ quizVersion: "quiz_v2", responses: [{ questionId: "q1", value: 4 }] }),
      );
    });
    await page.reload({ waitUntil: "networkidle" });
    await expect(page.getByRole("button", { name: /Continue|계속/ })).toBeVisible();
  });
});

test.describe("Results: category-first display, global always honest", () => {
  test("scope=all preserves the original single-card experience (en-US)", async ({ page }) => {
    await page.goto(resultsUrl("en-US"), { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: "Your Closest Great Match" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Your closest match (in|overall)/ })).toHaveCount(0);
  });

  test("a selected category with a DIFFERENT global closest shows both, category first (en-US)", async ({ page }) => {
    await page.goto(resultsUrl("en-US", "building_discovery"), { waitUntil: "networkidle" });
    const categoryHeading = page.getByRole("heading", { name: "Your closest match in Building & Discovery" });
    const globalHeading = page.getByRole("heading", { name: "Your closest match overall" });
    await expect(categoryHeading).toBeVisible();
    await expect(globalHeading).toBeVisible();
    // Category heading physically precedes the global one.
    const [catBox, globalBox] = await Promise.all([categoryHeading.boundingBox(), globalHeading.boundingBox()]);
    expect(catBox && globalBox).toBeTruthy();
    expect(catBox!.y).toBeLessThan(globalBox!.y);
    // Exactly one Share control on the whole page, attached to the primary card.
    await expect(page.locator(".tgi-share")).toHaveCount(1);
  });

  test("a selected category whose match IS the global closest renders the person once, with a duplicate note (en-US)", async ({ page }) => {
    await page.goto(resultsUrl("en-US", "science_knowledge"), { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: "Your closest match in Science & Knowledge" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your closest match overall" })).toHaveCount(0);
    await expect(page.getByText("This is also your closest match overall.")).toBeVisible();
    // Only one full match card -- the person's name/portrait region appears once.
    await expect(page.locator(".tgi-identity-hero")).toHaveCount(1);
    await expect(page.locator(".tgi-share")).toHaveCount(1);
  });

  test("an invalid scope value safely falls back to All, no error, no 404 (en-US)", async ({ page }) => {
    const response = await page.goto(resultsUrl("en-US", "totally_bogus"), { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "Your Closest Great Match" })).toBeVisible();
  });

  test("KO renders the category-first headings using the existing category labels", async ({ page }) => {
    await page.goto(resultsUrl("ko-KR", "leadership_society"), { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: "리더십과 사회에서 가장 닮은 인물" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "전체에서 가장 닮은 인물" })).toBeVisible();
  });
});

test.describe("Results: scope switcher (no quiz retake)", () => {
  test("switching category preserves the exact r token and changes only scope (en-US)", async ({ page }) => {
    await page.goto(resultsUrl("en-US"), { waitUntil: "networkidle" });
    await page.getByRole("link", { name: "Leadership & Society" }).click();
    await page.waitForURL(/scope=leadership_society/);
    expect(page.url()).toContain(`r=${encodeURIComponent(SYNTHETIC_TOKEN)}`);
    await expect(page.getByRole("heading", { name: "Your closest match in Leadership & Society" })).toBeVisible();

    // Switch again, directly to a different category -- no quiz recomputation,
    // just another link navigation with the same r.
    await page.getByRole("link", { name: "Arts & Culture" }).click();
    await page.waitForURL(/scope=arts_culture/);
    expect(page.url()).toContain(`r=${encodeURIComponent(SYNTHETIC_TOKEN)}`);
    expect(page.url()).not.toContain("leadership_society");

    // Switching back to All drops the scope param entirely and works with
    // normal browser back navigation too.
    await page.getByRole("link", { name: "All", exact: true }).click();
    await page.waitForURL((url) => !url.search.includes("scope="));
    await page.goBack();
    await page.waitForURL(/scope=arts_culture/);
  });

  test("no horizontal overflow at 375px (en-US)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(resultsUrl("en-US", "arts_culture"), { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `page overflows horizontally by ${overflow}px at 375px`).toBeLessThanOrEqual(1);
  });
});

test.describe("Results: Share URL includes the current scope", () => {
  async function stubClipboardSuccess(page: Page) {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
      (window as unknown as { __clipboardCalls: string[] }).__clipboardCalls = [];
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: (text: string) => {
          (window as unknown as { __clipboardCalls: string[] }).__clipboardCalls.push(text);
          return Promise.resolve();
        } },
      });
    });
  }

  test("scope=all: Share URL has no scope param", async ({ page }) => {
    await stubClipboardSuccess(page);
    await page.goto(resultsUrl("en-US"), { waitUntil: "networkidle" });
    await page.locator(".tgi-share button").click();
    const calls = await page.evaluate(() => (window as unknown as { __clipboardCalls: string[] }).__clipboardCalls);
    expect(calls[0]).toContain(encodeURIComponent(SYNTHETIC_TOKEN));
    expect(calls[0]).not.toContain("scope=");
  });

  test("a selected category: Share URL includes &scope=", async ({ page }) => {
    await stubClipboardSuccess(page);
    await page.goto(resultsUrl("en-US", "building_discovery"), { waitUntil: "networkidle" });
    await page.locator(".tgi-share button").first().click();
    const calls = await page.evaluate(() => (window as unknown as { __clipboardCalls: string[] }).__clipboardCalls);
    expect(calls[0]).toContain(encodeURIComponent(SYNTHETIC_TOKEN));
    expect(calls[0]).toContain("scope=building_discovery");
  });
});
