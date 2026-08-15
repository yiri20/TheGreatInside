import { test, expect } from "@playwright/test";
import { assertHeadingHierarchy, assertNoHorizontalOverflow, captureConsole } from "./utils/visualChecks";

/**
 * Privacy Policy / Terms of Service — Broader Public Launch Finish Line.
 * Both routes are structurally identical (see LegalDocumentView.tsx), so
 * this suite exercises the same checks against both rather than
 * duplicating them per-document.
 */
const ROUTES = [
  { path: "privacy", titleMatch: /Privacy Policy|개인정보처리방침/ },
  { path: "terms", titleMatch: /Terms of Service|이용약관/ },
] as const;
const LOCALES = ["en-US", "ko-KR"] as const;

for (const route of ROUTES) {
  for (const locale of LOCALES) {
    test(`${route.path} @ ${locale}: 200, one h1, no heading skip, correct metadata, no auth wall`, async ({
      page,
    }) => {
      const console_ = captureConsole(page);
      const response = await page.goto(`/${locale}/${route.path}`, { waitUntil: "networkidle" });
      expect(response?.status(), `${route.path}@${locale} did not respond 200`).toBe(200);

      // Never gated behind sign-in — a real Google account should never be
      // required to read a legal disclosure page.
      expect(page.url()).toContain(`/${locale}/${route.path}`);

      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toHaveText(route.titleMatch);
      await assertHeadingHierarchy(page);
      await assertNoHorizontalOverflow(page);

      // Contact email present and correct — the one fact this content
      // depends on that was supplied directly, not inferred.
      await expect(page.getByText("thegreatinside.web@gmail.com").first()).toBeVisible();

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toContain(`/${locale}/${route.path}`);

      const hreflangKo = await page.locator('link[rel="alternate"][hreflang="ko-KR"]').getAttribute("href");
      const hreflangEn = await page.locator('link[rel="alternate"][hreflang="en-US"]').getAttribute("href");
      expect(hreflangKo).toContain(`/ko-KR/${route.path}`);
      expect(hreflangEn).toContain(`/en-US/${route.path}`);

      expect(console_.errors, `console errors: ${JSON.stringify(console_.errors)}`).toEqual([]);
      expect(console_.pageErrors, `page errors: ${JSON.stringify(console_.pageErrors)}`).toEqual([]);
    });
  }
}

test("privacy/terms are NOT noindex — no robots meta override present (Stage A default index,follow)", async ({
  page,
}) => {
  await page.goto("/en-US/privacy", { waitUntil: "networkidle" });
  const robots = await page.locator('meta[name="robots"]').count();
  // Stage A's convention: pages that ARE indexed carry no explicit
  // override at all (the framework default is already index,follow) —
  // only noindex surfaces (Results/Compare/Account/Saved Result) add one.
  expect(robots).toBe(0);
});

test("footer renders Privacy/Terms links on an unrelated page (Landing) and they resolve correctly", async ({
  page,
}) => {
  await page.goto("/en-US", { waitUntil: "networkidle" });
  const privacyLink = page.locator('footer a[href="/en-US/privacy"]');
  const termsLink = page.locator('footer a[href="/en-US/terms"]');
  await expect(privacyLink).toBeVisible();
  await expect(termsLink).toBeVisible();

  await privacyLink.click();
  await page.waitForURL(/\/en-US\/privacy/);
  await expect(page.locator("h1")).toHaveText(/Privacy Policy/);
});

test("footer renders on the Korean locale with Korean labels", async ({ page }) => {
  await page.goto("/ko-KR", { waitUntil: "networkidle" });
  await expect(page.locator('footer a[href="/ko-KR/privacy"]')).toHaveText("개인정보처리방침");
  await expect(page.locator('footer a[href="/ko-KR/terms"]')).toHaveText("이용약관");
});

test("footer presence does not break existing static generation — Person page still renders correctly with the footer", async ({
  page,
}) => {
  await page.goto("/en-US/people/leonardo-da-vinci", { waitUntil: "networkidle" });
  await expect(page.locator('footer a[href="/en-US/privacy"]')).toBeVisible();
  await assertNoHorizontalOverflow(page);
});
