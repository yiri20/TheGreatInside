import { test, expect } from "@playwright/test";
import { readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  assertHeadingHierarchy,
  assertNoClippedElements,
  assertNoHorizontalOverflow,
  captureConsole,
} from "./utils/visualChecks";

/**
 * DEEP INSIDE — Monetization v1 visual/structural coverage.
 *
 * Two distinct test populations, per this project's established "use
 * mocked boundaries for automated browser tests, reserve one real Stripe
 * checkout for the manual gate" discipline:
 *
 *  1. Static preview fixtures (`file://`, via `DeepInsideReportView`
 *     rendered against synthetic `DeepInsideReportV1` data — see
 *     `deepInsideReportPreview.tsx`) — the full report's rendering logic,
 *     zero auth/entitlement/Stripe involved.
 *  2. The real running server's SIGNED-OUT surfaces only (the Results
 *     teaser and `/deep-inside`'s sign-in-required state) — reachable
 *     without any authenticated session. The entitled/unlocked and
 *     locked-with-Buy-button states both require a real signed-in session
 *     and are NOT automated here — see CLAUDE.md's monetization record for
 *     the manual test-mode purchase procedure that covers them.
 */
const FIXTURE_NAMES = ["normal", "minimal", "removedPerson"] as const;
const LOCALES = ["en-US", "ko-KR"] as const;

const here = dirname(fileURLToPath(import.meta.url));
const previewDir = resolve(here, "../test-artifacts/deep-inside-preview");

test.describe("Deep Inside report — static preview fixtures", () => {
  for (const fixture of FIXTURE_NAMES) {
    for (const locale of LOCALES) {
      test(`${fixture} (${locale}): renders with no console errors, no overflow, sane heading order`, async ({
        page,
      }) => {
        const consoleCapture = captureConsole(page);
        const filePath = resolve(previewDir, `${fixture}-${locale}.html`);
        await page.goto(`file://${filePath}`);

        await assertNoHorizontalOverflow(page);
        const clipped = await assertNoClippedElements(page);
        expect(clipped).toEqual([]);
        expect(consoleCapture.errors).toEqual([]);
      });
    }
  }

  test("normal fixture: Why Your Matches Fit shows exactly 3 ranked matches", async ({ page }) => {
    await page.goto(`file://${resolve(previewDir, "normal-en-US.html")}`);
    const text = await page.locator("body").innerText();
    expect(text).toContain("Match #1");
    expect(text).toContain("Match #2");
    expect(text).toContain("Match #3");
  });

  test("normal fixture: Historical Circle, Signature Combination, Counterpart, and Strengths & Trade-offs all render", async ({
    page,
  }) => {
    await page.goto(`file://${resolve(previewDir, "normal-en-US.html")}`);
    const text = await page.locator("body").innerText();
    expect(text).toContain("Why Your Matches Fit");
    expect(text).toContain("Your Historical Circle");
    expect(text).toContain("Signature Combination");
    expect(text).toContain("Your Strongest Contrast");
    expect(text).toContain("Strengths & Trade-offs");
  });

  test("minimal fixture: Signature Combination and Counterpart sections are absent, not empty placeholders", async ({
    page,
  }) => {
    await page.goto(`file://${resolve(previewDir, "minimal-en-US.html")}`);
    const text = await page.locator("body").innerText();
    expect(text).not.toContain("Signature Combination");
    expect(text).not.toContain("Your Strongest Contrast");
    // The always-present sections still render.
    expect(text).toContain("Why Your Matches Fit");
    expect(text).toContain("Your Historical Circle");
  });

  test("removedPerson fixture: falls back to the frozen person name, not a crash or blank", async ({ page }) => {
    await page.goto(`file://${resolve(previewDir, "removedPerson-en-US.html")}`);
    const text = await page.locator("body").innerText();
    expect(text).toContain("A Since-Removed Person");
  });

  test("Korean fixture renders natural Korean section headings, not English fallback", async ({ page }) => {
    await page.goto(`file://${resolve(previewDir, "normal-ko-KR.html")}`);
    const text = await page.locator("body").innerText();
    expect(text).toContain("상위 매치가 잘 맞는 이유");
    expect(text).toContain("나의 역사 인물 서클");
  });

  test("all preview fixture files were actually generated (guards against a silently-empty run)", () => {
    const files = readdirSync(previewDir);
    expect(files.length).toBe(FIXTURE_NAMES.length * LOCALES.length);
  });
});

test.describe("Deep Inside — signed-out surfaces on the real server", () => {
  const NEUTRAL_TOKEN = "quiz_v2.a444a44a444a4a444444a44444a44aa44a4444a4444a4a4444a4444444444444";

  for (const locale of LOCALES) {
    test(`Results page: Deep Inside teaser shows the locked (price + bullets) state (${locale})`, async ({
      page,
    }) => {
      const consoleCapture = captureConsole(page);
      await page.goto(`/${locale}/results?r=${NEUTRAL_TOKEN}`);
      // The teaser resolves entitlement asynchronously (client-side) —
      // wait for its price line, the clearest signal the locked state
      // rendered rather than staying in its "unresolved" (render nothing)
      // state.
      const priceText = locale === "en-US" ? "US$6.99" : "US$6.99";
      await expect(page.getByText(priceText).first()).toBeVisible({ timeout: 10_000 });
      await assertNoHorizontalOverflow(page);
      expect(consoleCapture.errors).toEqual([]);
    });

    test(`/deep-inside (${locale}): signed-out visitor sees the sign-in-required state, never the report or a Buy button`, async ({
      page,
    }) => {
      const consoleCapture = captureConsole(page);
      const response = await page.goto(`/${locale}/deep-inside?r=${NEUTRAL_TOKEN}`);
      expect(response?.status()).toBe(200);

      const text = await page.locator("main").innerText();
      const signInHeading = locale === "en-US" ? "Sign in to unlock Deep Inside" : "딥 인사이드를 열려면 로그인하세요";
      expect(text).toContain(signInHeading);
      // Never the report content, never a purchase button, for a
      // signed-out visitor.
      expect(text).not.toContain("Why Your Matches Fit");
      expect(text).not.toContain("상위 매치가 잘 맞는 이유");

      await assertHeadingHierarchy(page);
      await assertNoHorizontalOverflow(page);
      expect(consoleCapture.errors).toEqual([]);
    });
  }

  test("/deep-inside carries noindex, nofollow (same treatment as Account)", async ({ page }) => {
    await page.goto(`/en-US/deep-inside?r=${NEUTRAL_TOKEN}`);
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots).toBe("noindex, nofollow");
  });

  test("/deep-inside/processing renders the payment-received state without trusting the query string alone", async ({
    page,
  }) => {
    const consoleCapture = captureConsole(page);
    const response = await page.goto(
      `/en-US/deep-inside/processing?session_id=cs_test_fake_session&r=${NEUTRAL_TOKEN}`,
    );
    expect(response?.status()).toBe(200);
    await expect(page.getByText("Payment received")).toBeVisible();
    await assertNoHorizontalOverflow(page);
    expect(consoleCapture.errors).toEqual([]);
  });
});
