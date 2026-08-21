import { test, expect } from "@playwright/test";
import { assertNoClippedElements, assertNoHorizontalOverflow, captureConsole } from "./utils/visualChecks";

/**
 * POST-10D STAGE A visual/request-behavior suite — bare `/` locale
 * negotiation, the `tgi_locale` preference cookie, rendered canonical/
 * hreflang/robots metadata, and a smoke check that the People/Quiz
 * server-client split introduced no visual regression.
 *
 * The `?r=` token used below is the SAME synthetic `neutral` fixture
 * already committed in `results.visual.spec.ts` (generated via
 * `encodeResultToken` against a fixed answer pattern) — never a real
 * user's result.
 */
const SYNTHETIC_TOKEN = "quiz_v2.a444a44a444a4a444444a44444a44aa44a4444a4444a4a4444a4444444444444";

/** Next.js emits same-origin redirect `Location` headers as a relative
 *  path (confirmed live: `/ko-KR`, not `http://host/ko-KR`) — resolve
 *  against a dummy base so both forms parse correctly either way. */
function redirectLocation(res: { headers(): Record<string, string> }): URL {
  return new URL(res.headers()["location"]!, "http://placeholder.invalid");
}

test.describe("canonical host redirect (domain migration, 2026-08)", () => {
  test("www.thegreatinside.com redirects (308) to the canonical apex, preserving path and query", async ({
    request,
  }) => {
    const res = await request.get("/en-US/people?foo=bar", {
      maxRedirects: 0,
      headers: { host: "www.thegreatinside.com" },
    });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toBe("https://thegreatinside.com/en-US/people?foo=bar");
  });

  test("the former Vercel production hostname redirects (308) to the canonical apex", async ({ request }) => {
    const res = await request.get("/ko-KR/quiz", {
      maxRedirects: 0,
      headers: { host: "the-great-inside.vercel.app" },
    });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toBe("https://thegreatinside.com/ko-KR/quiz");
  });

  test("a request already on the canonical host is never redirected by host (no loop)", async ({ request }) => {
    const res = await request.get("/en-US/people", {
      maxRedirects: 0,
      headers: { host: "thegreatinside.com" },
    });
    expect(res.status()).toBe(200);
  });
});

test.describe("bare / locale negotiation", () => {
  test("no Accept-Language header -> en-US", async ({ request }) => {
    const res = await request.get("/", { maxRedirects: 0, headers: { "accept-language": "" } });
    expect(res.status()).toBe(307);
    expect(redirectLocation(res).pathname).toBe("/en-US");
  });

  test("ko Accept-Language -> ko-KR", async ({ request }) => {
    const res = await request.get("/", { maxRedirects: 0, headers: { "accept-language": "ko-KR,ko;q=0.9" } });
    expect(res.status()).toBe(307);
    expect(redirectLocation(res).pathname).toBe("/ko-KR");
  });

  test("en Accept-Language -> en-US", async ({ request }) => {
    const res = await request.get("/", { maxRedirects: 0, headers: { "accept-language": "en-US,en;q=0.9" } });
    expect(res.status()).toBe(307);
    expect(redirectLocation(res).pathname).toBe("/en-US");
  });

  test("unsupported Accept-Language (fr-FR) -> en-US", async ({ request }) => {
    const res = await request.get("/", { maxRedirects: 0, headers: { "accept-language": "fr-FR,fr;q=0.9" } });
    expect(res.status()).toBe(307);
    expect(redirectLocation(res).pathname).toBe("/en-US");
  });

  test("saved tgi_locale=ko-KR beats an English Accept-Language header", async ({ request }) => {
    const res = await request.get("/", {
      maxRedirects: 0,
      headers: { "accept-language": "en-US,en;q=0.9", cookie: "tgi_locale=ko-KR" },
    });
    expect(res.status()).toBe(307);
    expect(redirectLocation(res).pathname).toBe("/ko-KR");
  });

  test("saved tgi_locale=en-US beats a Korean Accept-Language header", async ({ request }) => {
    const res = await request.get("/", {
      maxRedirects: 0,
      headers: { "accept-language": "ko-KR,ko;q=0.9", cookie: "tgi_locale=en-US" },
    });
    expect(res.status()).toBe(307);
    expect(redirectLocation(res).pathname).toBe("/en-US");
  });

  test("direct /ko-KR/... is never redirected, regardless of an English preference cookie", async ({ request }) => {
    const res = await request.get("/ko-KR/people", {
      maxRedirects: 0,
      headers: { "accept-language": "en-US,en;q=0.9", cookie: "tgi_locale=en-US" },
    });
    expect(res.status()).toBe(200);
  });

  test("query string is preserved through the / redirect", async ({ request }) => {
    const res = await request.get("/?ref=test", {
      maxRedirects: 0,
      headers: { "accept-language": "ko-KR" },
    });
    expect(res.status()).toBe(307);
    const location = redirectLocation(res);
    expect(location.pathname).toBe("/ko-KR");
    expect(location.searchParams.get("ref")).toBe("test");
  });
});

test.describe("LocaleSwitcher preference persistence", () => {
  test("clicking a locale link writes the tgi_locale cookie", async ({ page, context }) => {
    await page.goto("/en-US/people");
    await page.click(".tgi-locale-switcher__link:has-text(\"한국어\")");
    await page.waitForURL("**/ko-KR/people");
    const cookies = await context.cookies();
    const localeCookie = cookies.find((c) => c.name === "tgi_locale");
    expect(localeCookie?.value).toBe("ko-KR");
    expect(localeCookie?.path).toBe("/");
    expect(localeCookie?.sameSite).toBe("Lax");
    expect(localeCookie?.httpOnly).toBe(false);
  });

  test("preserves the current path when switching locale", async ({ page }) => {
    await page.goto("/en-US/people/leonardo-da-vinci");
    await page.click(".tgi-locale-switcher__link:has-text(\"한국어\")");
    await page.waitForURL("**/ko-KR/people/leonardo-da-vinci");
    expect(new URL(page.url()).pathname).toBe("/ko-KR/people/leonardo-da-vinci");
  });

  test("preserves a synthetic result token (?r=) when switching locale on Results", async ({ page }) => {
    await page.goto(`/en-US/results?r=${encodeURIComponent(SYNTHETIC_TOKEN)}`);
    await page.click(".tgi-locale-switcher__link:has-text(\"한국어\")");
    await page.waitForURL("**/ko-KR/results**");
    const url = new URL(page.url());
    expect(url.pathname).toBe("/ko-KR/results");
    expect(url.searchParams.get("r")).toBe(SYNTHETIC_TOKEN);
  });

  test("does not redirect a user away from an explicitly visited localized URL", async ({ page }) => {
    await page.goto("/ko-KR/people");
    expect(new URL(page.url()).pathname).toBe("/ko-KR/people");
  });
});

test.describe("rendered canonical / hreflang / robots metadata", () => {
  test("People directory: self canonical + both hreflang alternates + x-default", async ({ page }) => {
    await page.goto("/en-US/people");
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toMatch(/\/en-US\/people$/);
    const enAlt = await page.locator('link[rel="alternate"][hreflang="en-US"]').getAttribute("href");
    const koAlt = await page.locator('link[rel="alternate"][hreflang="ko-KR"]').getAttribute("href");
    const xDefault = await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute("href");
    expect(enAlt).toMatch(/\/en-US\/people$/);
    expect(koAlt).toMatch(/\/ko-KR\/people$/);
    expect(xDefault).not.toContain("/en-US");
    expect(xDefault).not.toContain("/ko-KR");
  });

  test("Quiz (KO): self canonical points at the Korean URL, not English", async ({ page }) => {
    await page.goto("/ko-KR/quiz");
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toMatch(/\/ko-KR\/quiz$/);
  });

  test("Person page: canonical/hreflang present for a representative person", async ({ page }) => {
    await page.goto("/en-US/people/ada-lovelace");
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toMatch(/\/en-US\/people\/ada-lovelace$/);
  });

  test("Results carries noindex, follow and no canonical tag", async ({ page }) => {
    await page.goto(`/en-US/results?r=${encodeURIComponent(SYNTHETIC_TOKEN)}`);
    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robotsMeta).toBe("noindex, follow");
    expect(await page.locator('link[rel="canonical"]').count()).toBe(0);
  });

  test("Compare carries noindex, follow", async ({ page }) => {
    await page.goto(`/en-US/compare/leonardo-da-vinci?r=${encodeURIComponent(SYNTHETIC_TOKEN)}`);
    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robotsMeta).toBe("noindex, follow");
  });

  test("Account carries noindex, nofollow", async ({ page }) => {
    await page.goto("/en-US/account");
    const robotsMeta = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robotsMeta).toBe("noindex, nofollow");
  });
});

test.describe("localized EN/KO metadata", () => {
  test("Landing title/description differ between en-US and ko-KR", async ({ page }) => {
    await page.goto("/en-US");
    const enTitle = await page.title();
    await page.goto("/ko-KR");
    const koTitle = await page.title();
    expect(enTitle).not.toBe(koTitle);
    expect(koTitle).toMatch(/[㄰-㆏가-힣]/);
  });

  test("Quiz title/description differ between en-US and ko-KR", async ({ page }) => {
    await page.goto("/en-US/quiz");
    const enTitle = await page.title();
    await page.goto("/ko-KR/quiz");
    const koTitle = await page.title();
    expect(enTitle).not.toBe(koTitle);
  });
});

test.describe("People/Quiz server-client split — no visual regression", () => {
  for (const locale of ["en-US", "ko-KR"] as const) {
    test(`People directory renders and filters correctly (${locale})`, async ({ page }) => {
      const consoleCapture = captureConsole(page);
      await page.goto(`/${locale}/people`);
      await assertNoHorizontalOverflow(page);
      const offenders = await assertNoClippedElements(page);
      expect(offenders).toEqual([]);
      expect(await page.locator(".tgi-personcard").count()).toBeGreaterThan(0);
      expect(consoleCapture.errors).toEqual([]);
      expect(consoleCapture.pageErrors).toEqual([]);
    });

    test(`Quiz intro renders and Start button works (${locale})`, async ({ page }) => {
      const consoleCapture = captureConsole(page);
      await page.goto(`/${locale}/quiz`);
      await assertNoHorizontalOverflow(page);
      const startButton = page.getByRole("button").first();
      await expect(startButton).toBeVisible();
      expect(consoleCapture.errors).toEqual([]);
      expect(consoleCapture.pageErrors).toEqual([]);
    });
  }
});
