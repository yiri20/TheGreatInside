import { test, expect } from "@playwright/test";
import { captureConsole } from "./utils/visualChecks";

/**
 * Roster28 fifteen-person fast production batch (2026-09): shared coverage
 * for all fifteen promoted candidates, table-driven rather than fifteen
 * near-identical spec files. See
 * docs/checkpoints/roster28-fifteen-person-fast-batch.md.
 *
 * All fifteen are evidence_approved/non-match-eligible (published,
 * directory-visible, honestly under eligibility_v2's confidence/coverage
 * floors). Deliberately prioritized broad public recognizability among
 * evidence-viable held candidates: literature, politics, film, business,
 * diplomacy, physics, visual art, journalism, exploration, music,
 * activism, and economics.
 */

const CANDIDATES = [
  {
    slug: "agatha-christie",
    portraitUrl: "/portraits/agatha-christie-anefo-1964.jpg",
    attributionSnippet: "1964",
    achievementSnippetEn: "Roger Ackroyd",
    koName: "애거사 크리스티",
    koAchievementSnippet: "애크로이드",
  },
  {
    slug: "winston-churchill",
    portraitUrl: "/portraits/winston-churchill-yalta-1945.jpg",
    attributionSnippet: "National Archives",
    achievementSnippetEn: "Nobel Prize in Literature",
    koName: "윈스턴 처칠",
    koAchievementSnippet: "노벨 문학상",
  },
  {
    slug: "thomas-jefferson",
    portraitUrl: "/portraits/thomas-jefferson-peale-1800.jpg",
    attributionSnippet: "Peale",
    achievementSnippetEn: "Monticello",
    koName: "토머스 제퍼슨",
    koAchievementSnippet: "몬티첼로",
  },
  {
    slug: "sun-yat-sen",
    portraitUrl: "/portraits/sun-yat-sen-standard-portrait-1922.jpg",
    attributionSnippet: "1922",
    achievementSnippetEn: "Revive China Society",
    koName: "쑨원",
    koAchievementSnippet: "흥중회",
    // "Sun Yat-sen" has a hyphen as part of the name itself, so the naive
    // slug.replace(/-/g, " ") search term doesn't substring-match the
    // actual canonicalName string.
    searchTerm: "yat-sen",
  },
  {
    slug: "katharine-hepburn",
    portraitUrl: "/portraits/katharine-hepburn-mgm-1941.jpg",
    attributionSnippet: "Metro-Goldwyn-Mayer",
    achievementSnippetEn: "Philadelphia Story",
    koName: "캐서린 헵번",
    koAchievementSnippet: "필라델피아 스토리",
  },
  {
    slug: "henry-ford",
    portraitUrl: "/portraits/henry-ford-1915.jpg",
    attributionSnippet: "1915",
    achievementSnippetEn: "assembly line",
    koName: "헨리 포드",
    koAchievementSnippet: "조립 라인",
  },
  {
    slug: "eleanor-roosevelt",
    portraitUrl: "/portraits/eleanor-roosevelt-un-1946.jpg",
    attributionSnippet: "FDR Presidential Library",
    achievementSnippetEn: "Universal Declaration of Human Rights",
    koName: "엘리너 루스벨트",
    koAchievementSnippet: "세계인권선언",
  },
  {
    slug: "stephen-hawking",
    portraitUrl: "/portraits/stephen-hawking-nasa-2008.jpg",
    attributionSnippet: "NASA",
    achievementSnippetEn: "ALS diagnosis",
    koName: "스티븐 호킹",
    koAchievementSnippet: "ALS",
  },
  {
    slug: "diego-rivera",
    portraitUrl: "/portraits/diego-rivera-blue-house-1957.jpg",
    attributionSnippet: "Frida Kahlo",
    achievementSnippetEn: "Mexican Muralism",
    koName: "디에고 리베라",
    koAchievementSnippet: "멕시코 벽화 운동",
  },
  {
    slug: "naguib-mahfouz",
    portraitUrl: "/portraits/naguib-mahfouz-statue-cairo-2008.jpg",
    attributionSnippet: "Bertramz",
    achievementSnippetEn: "modern Arabic novel",
    koName: "나기브 마흐푸즈",
    koAchievementSnippet: "아랍 소설",
  },
  {
    slug: "ida-b-wells",
    portraitUrl: "/portraits/ida-b-wells-garrity-1893.jpg",
    attributionSnippet: "Garrity",
    achievementSnippetEn: "Southern Horrors",
    koName: "아이다 B. 웰스",
    koAchievementSnippet: "남부의 참상",
    // "Ida B. Wells" has a period after the middle initial, so the naive
    // slug.replace(/-/g, " ") search term ("ida b wells") doesn't
    // substring-match the actual canonicalName string ("Ida B. Wells").
    searchTerm: "wells",
  },
  {
    slug: "junko-tabei",
    portraitUrl: "/portraits/junko-tabei-kunnap-1985.jpg",
    attributionSnippet: "1985",
    achievementSnippetEn: "Mount Everest",
    koName: "다베이 준코",
    koAchievementSnippet: "에베레스트",
  },
  {
    slug: "ravi-shankar",
    portraitUrl: "/portraits/ravi-shankar-woodstock-1969.jpg",
    attributionSnippet: "Woodstock",
    achievementSnippetEn: "Allauddin Khan",
    koName: "라비 샹카르",
    koAchievementSnippet: "알라우딘 칸",
  },
  {
    slug: "winnie-madikizela-mandela",
    portraitUrl: "/portraits/winnie-madikizela-mandela-1996.jpg",
    attributionSnippet: "1996",
    achievementSnippetEn: "anti-apartheid",
    koName: "위니 마디키젤라만델라",
    koAchievementSnippet: "반아파르트헤이트",
    // "Winnie Madikizela-Mandela" has a hyphen as part of the surname
    // itself; see the sun-yat-sen entry above for why this needs an
    // override.
    searchTerm: "madikizela",
  },
  {
    slug: "amartya-sen",
    portraitUrl: "/portraits/amartya-sen-cologne-2007.jpg",
    attributionSnippet: "Wetzig",
    achievementSnippetEn: "capability approach",
    koName: "아마르티아 센",
    koAchievementSnippet: "역량 접근법",
  },
] as const;

for (const c of CANDIDATES) {
  test.describe(`roster28: ${c.slug}`, () => {
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
      await searchBox.fill("searchTerm" in c ? c.searchTerm : c.slug.replace(/-/g, " "));
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

    test(`Compare route shows the honest non-match-eligible state (en-US)`, async ({ page }) => {
      await page.goto(`/en-US/compare/${c.slug}`, { waitUntil: "networkidle" });
      const bodyText = (await page.locator("main").textContent())!;
      expect(bodyText).toContain("isn't included in matching yet");
      expect(bodyText).not.toContain("We couldn't find that person");
    });

    test(`person page's Compare CTA shows the non-match-eligible note (en-US)`, async ({ page }) => {
      await page.goto(`/en-US/people/${c.slug}`, { waitUntil: "networkidle" });
      const notInMatching = page.getByText("Not yet included in personality matching");
      await expect(notInMatching).toHaveCount(1);
    });
  });
}

test("roster28: people directory default (unfiltered) view shows exactly 169 people, all fifteen new candidates present exactly once (en-US)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/people", { waitUntil: "networkidle" });

  await expect(page.getByText(/^169 people$/)).toBeVisible();

  for (const c of CANDIDATES) {
    const cards = page.locator(`a.tgi-personcard__link[href="/en-US/people/${c.slug}"]`);
    await expect(cards, `${c.slug} should appear exactly once`).toHaveCount(1);
  }

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("roster28: a genuinely nonexistent slug still shows the honest not-found message, distinct from non-match-eligible copy", async ({
  page,
}) => {
  await page.goto("/en-US/compare/nonexistent-roster28-test-slug", { waitUntil: "networkidle" });
  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).toContain("We couldn't find that person");
});
