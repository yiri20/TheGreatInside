import { test, expect } from "@playwright/test";
import { captureConsole } from "./utils/visualChecks";

/**
 * Roster25 fast production batch (2026-09): shared coverage for all six
 * promoted candidates, table-driven rather than six near-identical spec
 * files. See docs/checkpoints/roster25-fast-production-batch.md.
 *
 * Nellie Bly and Carl Jung are pre-existing qa_passed/match-eligible.
 * Vera Rubin, Subrahmanyan Chandrasekhar, Fridtjof Nansen, and Isabella
 * Bird are evidence_approved/non-match-eligible (published,
 * directory-visible, honestly under eligibility_v2's floors).
 */

const CANDIDATES = [
  {
    slug: "nellie-bly",
    portraitUrl: "/portraits/nellie-bly-loc-myers-1890.jpg",
    attributionSnippet: "H. J. Myers",
    achievementSnippetEn: "Blackwell's Island",
    koName: "넬리 블라이",
    koAchievementSnippet: "블랙웰스 아일랜드",
    matchEligible: true,
  },
  {
    slug: "carl-jung",
    portraitUrl: "/portraits/carl-jung-eth-bib-1935.jpg",
    attributionSnippet: "ETH-Bibliothek",
    achievementSnippetEn: "Freud",
    koName: "카를 융",
    koAchievementSnippet: "프로이트",
    matchEligible: true,
  },
  {
    slug: "vera-rubin",
    portraitUrl: "/portraits/vera-rubin-godfrey-aip-1985.jpg",
    attributionSnippet: "Mark Godfrey",
    achievementSnippetEn: "flat rotation curves",
    koName: "베라 루빈",
    koAchievementSnippet: "회전 곡선",
    matchEligible: false,
  },
  {
    slug: "subrahmanyan-chandrasekhar",
    portraitUrl: "/portraits/subrahmanyan-chandrasekhar-aip.jpg",
    attributionSnippet: "AIP Emilio Segrè Visual Archives",
    achievementSnippetEn: "white dwarf",
    koName: "수브라마니안 찬드라세카르",
    koAchievementSnippet: "백색왜성",
    matchEligible: false,
  },
  {
    slug: "fridtjof-nansen",
    portraitUrl: "/portraits/fridtjof-nansen-loc-vanderweyde-1915.jpg",
    attributionSnippet: "Henry van der Weyde",
    achievementSnippetEn: "Fram",
    koName: "프리드쇼프 난센",
    koAchievementSnippet: "프람",
    matchEligible: false,
  },
  {
    slug: "isabella-bird",
    portraitUrl: "/portraits/isabella-bird-nypl-1899.jpg",
    attributionSnippet: "The Yangtze Valley",
    achievementSnippetEn: "Unbeaten Tracks",
    koName: "이사벨라 버드",
    koAchievementSnippet: "일본 오지 기행",
    matchEligible: false,
  },
] as const;

for (const c of CANDIDATES) {
  test.describe(`roster25: ${c.slug}`, () => {
    test(`directory card appears exactly once, is clickable, and its portrait renders (en-US)`, async ({ page }) => {
      await page.goto("/en-US/people", { waitUntil: "networkidle" });
      const link = page.locator(`a.tgi-personcard__link[href="/en-US/people/${c.slug}"]`);
      await expect(link).toHaveCount(1);

      const card = page.locator(`.tgi-personcard:has(a.tgi-personcard__link[href="/en-US/people/${c.slug}"])`);
      const portrait = card.locator("img.tgi-personcard__portrait");
      await expect(portrait).toHaveCount(1);
      await expect(portrait).toHaveAttribute("src", c.portraitUrl);

      const response = await page.goto(`/en-US/people/${c.slug}`, { waitUntil: "networkidle" });
      expect(response?.status(), `${c.slug} detail route did not respond 200`).toBe(200);
    });

    test(`is findable via Directory search by name (en-US)`, async ({ page }) => {
      await page.goto("/en-US/people", { waitUntil: "networkidle" });
      const searchBox = page.getByPlaceholder("Search by name or occupation");
      await searchBox.fill(c.slug.replace(/-/g, " "));
      const link = page.locator(`a.tgi-personcard__link[href="/en-US/people/${c.slug}"]`);
      await expect(link).toHaveCount(1);
    });

    test(`detail page renders a real portrait with correct attribution, not the initials fallback (en-US)`, async ({ page }) => {
      const console_ = captureConsole(page);
      await page.goto(`/en-US/people/${c.slug}`, { waitUntil: "networkidle" });

      await expect(page.locator(".tgi-identity-hero__portrait img")).toHaveCount(1);
      await expect(page.locator(".tgi-identity-hero__placeholder")).toHaveCount(0);

      const credit = page.locator(".tgi-portrait-credit__prose");
      await expect(credit).toContainText(c.attributionSnippet);

      expect(console_.errors).toEqual([]);
      expect(console_.pageErrors).toEqual([]);
    });

    test(`detail page renders meaningful editorial content with no raw i18n keys (en-US)`, async ({ page }) => {
      await page.goto(`/en-US/people/${c.slug}`, { waitUntil: "networkidle" });

      await expect(page.getByRole("heading", { name: "Key Achievements" })).toBeVisible();
      await expect(page.getByText(new RegExp(c.achievementSnippetEn, "i")).first()).toBeVisible();
      await expect(page.getByRole("heading", { name: "Moments That Reveal Them" })).toBeVisible();

      const bodyText = (await page.locator("main").textContent())!;
      expect(bodyText).not.toMatch(new RegExp(`${c.slug}\\.(achievement|moment|turning_point|interpretation)\\.`));
    });

    test(`detail page renders meaningful editorial content in Korean with correct display name, no raw i18n keys (ko-KR)`, async ({ page }) => {
      const console_ = captureConsole(page);
      await page.goto(`/ko-KR/people/${c.slug}`, { waitUntil: "networkidle" });

      await expect(page.getByRole("heading", { name: c.koName })).toBeVisible();
      await expect(page.getByText(new RegExp(c.koAchievementSnippet)).first()).toBeVisible();

      const bodyText = (await page.locator("main").textContent())!;
      expect(bodyText).not.toMatch(new RegExp(`${c.slug}\\.(achievement|moment|turning_point|interpretation)\\.`));
      expect(bodyText).not.toContain(`person.name.${c.slug}`);

      expect(console_.errors).toEqual([]);
      expect(console_.pageErrors).toEqual([]);
    });

    test(`Compare route reflects isMatchEligible correctly (en-US)`, async ({ page }) => {
      await page.goto(`/en-US/compare/${c.slug}`, { waitUntil: "networkidle" });
      const bodyText = (await page.locator("main").textContent())!;
      if (c.matchEligible) {
        // A match-eligible person's own compare route requires a real quiz
        // result to compare against; it must not show the honest
        // not-in-matching message meant for non-eligible profiles, nor
        // silently 404 -- either the normal compare flow or a graceful
        // "no result yet" state is acceptable, but never the
        // not-in-matching copy.
        expect(bodyText).not.toContain("isn't included in matching yet");
      } else {
        expect(bodyText).toContain("isn't included in matching yet");
        expect(bodyText).not.toContain("We couldn't find that person");
      }
    });

    test(`person page's Compare CTA matches isMatchEligible (en-US)`, async ({ page }) => {
      await page.goto(`/en-US/people/${c.slug}`, { waitUntil: "networkidle" });
      const notInMatching = page.getByText("Not yet included in personality matching");
      if (c.matchEligible) {
        await expect(notInMatching).toHaveCount(0);
      } else {
        await expect(notInMatching).toHaveCount(1);
      }
    });
  });
}

test("roster25: people directory default (unfiltered) view shows exactly 132 people, all six new candidates present exactly once (en-US)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/people", { waitUntil: "networkidle" });

  await expect(page.getByText(/^132 people$/)).toBeVisible();

  for (const c of CANDIDATES) {
    const cards = page.locator(`a.tgi-personcard__link[href="/en-US/people/${c.slug}"]`);
    await expect(cards, `${c.slug} should appear exactly once`).toHaveCount(1);
  }

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("roster25: a genuinely nonexistent slug still shows the honest not-found message, distinct from non-match-eligible copy", async ({
  page,
}) => {
  await page.goto("/en-US/compare/nonexistent-roster25-test-slug", { waitUntil: "networkidle" });
  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).toContain("We couldn't find that person");
});
