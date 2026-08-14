import { test, expect, type Page } from "@playwright/test";

/**
 * Stage B sharing behavior suite. The `?r=` token below is the SAME
 * synthetic `neutral` fixture already committed in `results.visual.spec.ts`
 * (generated via `encodeResultToken` against a fixed answer pattern) —
 * never a real user's result.
 */
const SYNTHETIC_TOKEN = "quiz_v2.a444a44a444a4a444444a44444a44aa44a4444a4444a4a4444a4444444444444";

/** Stubs `navigator.share` to resolve successfully and records the call. */
async function stubShareSuccess(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __shareCalls: unknown[] }).__shareCalls = [];
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: (data: unknown) => {
        (window as unknown as { __shareCalls: unknown[] }).__shareCalls.push(data);
        return Promise.resolve();
      },
    });
  });
}

/** Stubs `navigator.share` to reject with AbortError (user cancelled). */
async function stubShareCancelled(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: () => Promise.reject(new DOMException("cancelled", "AbortError")),
    });
  });
}

/** Stubs `navigator.share` to reject with a real, non-abort error. */
async function stubShareFailure(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: () => Promise.reject(new Error("boom")),
    });
  });
}

/** Removes `navigator.share` entirely (unsupported-browser branch). */
async function stubShareUnavailable(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
  });
}

/** Stubs `navigator.clipboard.writeText` to succeed and records the call. */
async function stubClipboardSuccess(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    (window as unknown as { __clipboardCalls: string[] }).__clipboardCalls = [];
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: (text: string) => {
          (window as unknown as { __clipboardCalls: string[] }).__clipboardCalls.push(text);
          return Promise.resolve();
        },
      },
    });
  });
}

/** Stubs clipboard to reject (write failure). */
async function stubClipboardFailure(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error("denied")) },
    });
  });
}

const shareButton = (page: Page) => page.locator(".tgi-share button");
const feedback = (page: Page) => page.locator(".tgi-share__feedback");

test.describe("Results Share", () => {
  for (const locale of ["en-US", "ko-KR"] as const) {
    const url = `/${locale}/results?r=${encodeURIComponent(SYNTHETIC_TOKEN)}`;
    const label = locale === "en-US" ? "Share result" : "결과 공유";
    const disclosure =
      locale === "en-US"
        ? "Anyone with this link can view this result."
        : "이 링크를 가진 사람은 누구나 이 결과를 볼 수 있어요.";

    test(`Share control + disclosure present (${locale})`, async ({ page }) => {
      await page.goto(url);
      await expect(shareButton(page)).toHaveText(label);
      await expect(page.getByText(disclosure)).toBeVisible();
    });

    test(`native share receives the exact current URL including the token (${locale})`, async ({ page }) => {
      await stubShareSuccess(page);
      await page.goto(url);
      await shareButton(page).click();
      const calls = await page.evaluate(() => (window as unknown as { __shareCalls: { url: string }[] }).__shareCalls);
      expect(calls).toHaveLength(1);
      expect(calls[0]!.url).toContain(`/${locale}/results`);
      expect(calls[0]!.url).toContain(encodeURIComponent(SYNTHETIC_TOKEN));
    });

    test(`cancelling native share shows no error feedback (${locale})`, async ({ page }) => {
      await stubShareCancelled(page);
      await page.goto(url);
      await shareButton(page).click();
      await page.waitForTimeout(300);
      await expect(feedback(page)).toHaveText("");
    });

    test(`a real native share failure shows accessible failure feedback (${locale})`, async ({ page }) => {
      await stubShareFailure(page);
      await page.goto(url);
      await shareButton(page).click();
      const expected = locale === "en-US" ? "Couldn't share — try again" : "공유하지 못했어요 — 다시 시도해주세요";
      await expect(feedback(page)).toHaveText(expected);
    });

    test(`fallback (no Web Share) copies the exact current URL (${locale})`, async ({ page }) => {
      await stubClipboardSuccess(page);
      await page.goto(url);
      await shareButton(page).click();
      const calls = await page.evaluate(() => (window as unknown as { __clipboardCalls: string[] }).__clipboardCalls);
      expect(calls).toHaveLength(1);
      expect(calls[0]).toContain(`/${locale}/results`);
      expect(calls[0]).toContain(encodeURIComponent(SYNTHETIC_TOKEN));
      const expected = locale === "en-US" ? "Copied!" : "복사됨!";
      await expect(feedback(page)).toHaveText(expected);
    });

    test(`clipboard failure shows accessible failure feedback (${locale})`, async ({ page }) => {
      await stubClipboardFailure(page);
      await page.goto(url);
      await shareButton(page).click();
      const expected = locale === "en-US" ? "Couldn't copy — try again" : "복사하지 못했어요 — 다시 시도해주세요";
      await expect(feedback(page)).toHaveText(expected);
    });
  }

  test("no dynamic Results-specific OG data appears in metadata (uses the generic image)", async ({ page }) => {
    await page.goto(`/en-US/results?r=${encodeURIComponent(SYNTHETIC_TOKEN)}`);
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toContain("/opengraph-image");
    expect(ogImage).not.toContain("results");
    expect(ogImage).not.toContain(encodeURIComponent(SYNTHETIC_TOKEN));
  });
});

test.describe("Compare Share", () => {
  for (const locale of ["en-US", "ko-KR"] as const) {
    const url = `/${locale}/compare/leonardo-da-vinci?r=${encodeURIComponent(SYNTHETIC_TOKEN)}`;
    const label = locale === "en-US" ? "Share comparison" : "비교 공유";
    const disclosure =
      locale === "en-US"
        ? "Anyone with this link can view this comparison."
        : "이 링크를 가진 사람은 누구나 이 비교 결과를 볼 수 있어요.";

    test(`correct label + disclosure (${locale})`, async ({ page }) => {
      await page.goto(url);
      await expect(shareButton(page)).toHaveText(label);
      await expect(page.getByText(disclosure)).toBeVisible();
    });

    test(`exact target slug + result token + locale preserved (${locale})`, async ({ page }) => {
      await stubClipboardSuccess(page);
      await page.goto(url);
      await shareButton(page).click();
      const calls = await page.evaluate(() => (window as unknown as { __clipboardCalls: string[] }).__clipboardCalls);
      expect(calls[0]).toContain(`/${locale}/compare/leonardo-da-vinci`);
      expect(calls[0]).toContain(encodeURIComponent(SYNTHETIC_TOKEN));
    });

    test(`native share path receives the exact URL (${locale})`, async ({ page }) => {
      await stubShareSuccess(page);
      await page.goto(url);
      await shareButton(page).click();
      const calls = await page.evaluate(() => (window as unknown as { __shareCalls: { url: string }[] }).__shareCalls);
      expect(calls[0]!.url).toContain(`/${locale}/compare/leonardo-da-vinci`);
    });
  }
});

test.describe("Person Share", () => {
  for (const locale of ["en-US", "ko-KR"] as const) {
    const url = `/${locale}/people/leonardo-da-vinci`;
    const label = locale === "en-US" ? "Share" : "공유";

    test(`Share control present, no privacy disclosure (${locale})`, async ({ page }) => {
      await page.goto(url);
      await expect(shareButton(page)).toHaveText(label);
      await expect(page.getByText("Anyone with this link")).toHaveCount(0);
      await expect(page.getByText("링크를 가진 사람은")).toHaveCount(0);
    });

    test(`exact localized Person URL, no user-derived query data (${locale})`, async ({ page }) => {
      await stubClipboardSuccess(page);
      await page.goto(url);
      await shareButton(page).click();
      const calls = await page.evaluate(() => (window as unknown as { __clipboardCalls: string[] }).__clipboardCalls);
      expect(calls[0]).toContain(`/${locale}/people/leonardo-da-vinci`);
      expect(calls[0]).not.toContain("?");
    });

    test(`native share path works (${locale})`, async ({ page }) => {
      await stubShareSuccess(page);
      await page.goto(url);
      await shareButton(page).click();
      const calls = await page.evaluate(() => (window as unknown as { __shareCalls: { url: string }[] }).__shareCalls);
      expect(calls).toHaveLength(1);
      expect(calls[0]!.url).toContain(`/${locale}/people/leonardo-da-vinci`);
    });
  }

  test("Person OG image referenced, not the generic fallback", async ({ page }) => {
    await page.goto("/en-US/people/leonardo-da-vinci");
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toContain("/people/leonardo-da-vinci/opengraph-image");
  });
});

test.describe("Negative: no public Share control on private routes", () => {
  test("Account has no Share control", async ({ page }) => {
    await page.goto("/en-US/account");
    await expect(page.locator(".tgi-share")).toHaveCount(0);
  });

  test("Saved Result (unauthenticated) has no Share control", async ({ page }) => {
    await page.goto("/en-US/account/results/smoke-test-nonexistent-id");
    await expect(page.locator(".tgi-share")).toHaveCount(0);
  });
});
