import { test, expect } from "@playwright/test";
import { captureConsole } from "./utils/visualChecks";

/**
 * Roster27 twelve-person fast production batch (2026-09): shared coverage
 * for all twelve promoted candidates, table-driven rather than twelve
 * near-identical spec files. See
 * docs/checkpoints/roster27-twelve-person-fast-batch.md.
 *
 * All twelve are evidence_approved/non-match-eligible (published,
 * directory-visible, honestly under eligibility_v2's high-confidence
 * sub-gate — several clear raw coverage but not the confidence floor).
 * Deliberately diversified away from roster26's politics-heavy batch:
 * writers, scientists, an explorer, an architect, a philosopher, an
 * actor/inventor, a musician, and civil-rights figures.
 */

const CANDIDATES = [
  {
    slug: "lu-xun",
    portraitUrl: "/portraits/lu-xun-1930.jpg",
    attributionSnippet: "1930",
    achievementSnippetEn: "Diary of a Madman",
    koName: "루쉰",
    koAchievementSnippet: "광인일기",
  },
  {
    slug: "amelia-earhart",
    portraitUrl: "/portraits/amelia-earhart-smithsonian-1937.jpg",
    attributionSnippet: "Underwood",
    achievementSnippetEn: "transatlantic",
    koName: "아멜리아 에어하트",
    koAchievementSnippet: "대서양",
  },
  {
    slug: "zaha-hadid",
    portraitUrl: "/portraits/zaha-hadid-baku-2013.jpg",
    attributionSnippet: "Ternovoy",
    achievementSnippetEn: "Pritzker",
    koName: "자하 하디드",
    koAchievementSnippet: "프리츠커",
  },
  {
    slug: "jorge-luis-borges",
    portraitUrl: "/portraits/jorge-luis-borges-stern-1951.jpg",
    attributionSnippet: "Grete Stern",
    achievementSnippetEn: "Pierre Menard",
    koName: "호르헤 루이스 보르헤스",
    koAchievementSnippet: "피에르 메나르",
  },
  {
    slug: "norman-borlaug",
    portraitUrl: "/portraits/norman-borlaug-usaid-2004.jpg",
    attributionSnippet: "USAID",
    achievementSnippetEn: "shuttle breeding",
    koName: "노먼 볼로그",
    koAchievementSnippet: "셔틀 육종",
  },
  {
    slug: "marie-tharp",
    portraitUrl: "/portraits/marie-tharp-aip-1968.jpg",
    attributionSnippet: "AIP",
    achievementSnippetEn: "rift valley",
    koName: "마리 사프",
    koAchievementSnippet: "열곡",
  },
  {
    slug: "jean-jacques-rousseau",
    portraitUrl: "/portraits/jean-jacques-rousseau-latour-1753.jpg",
    attributionSnippet: "La Tour",
    achievementSnippetEn: "Confessions",
    koName: "장자크 루소",
    koAchievementSnippet: "고백록",
    // "Jean-Jacques" has a hyphen as part of the name itself, so the naive
    // slug.replace(/-/g, " ") search term ("jean jacques rousseau") doesn't
    // substring-match the actual canonicalName string ("Jean-Jacques Rousseau").
    searchTerm: "rousseau",
  },
  {
    slug: "al-biruni",
    portraitUrl: "/portraits/al-biruni-ussr-stamp-1973.jpg",
    attributionSnippet: "1973",
    achievementSnippetEn: "146 known works",
    koName: "알비루니",
    koAchievementSnippet: "146편",
    // "Al-Biruni" has a hyphen as part of the name itself; see the
    // jean-jacques-rousseau entry above for why this needs an override.
    searchTerm: "biruni",
  },
  {
    slug: "hedy-lamarr",
    portraitUrl: "/portraits/hedy-lamarr-extase-1933.jpg",
    attributionSnippet: "Extase",
    achievementSnippetEn: "frequency-hopping",
    koName: "헤디 라마",
    koAchievementSnippet: "주파수 도약",
  },
  {
    slug: "rosa-parks",
    portraitUrl: "/portraits/rosa-parks-loc-1956.jpg",
    attributionSnippet: "Library of Congress",
    achievementSnippetEn: "bus seat",
    koName: "로자 파크스",
    koAchievementSnippet: "버스 좌석",
  },
  {
    slug: "ken-saro-wiwa",
    portraitUrl: "/portraits/ken-saro-wiwa-memorial-sculpture.jpg",
    attributionSnippet: "Sokari Douglas-Camp",
    achievementSnippetEn: "Basi and Company",
    koName: "켄 사로위와",
    koAchievementSnippet: "바시 앤 컴퍼니",
    // "Saro-Wiwa" has a hyphen as part of the surname itself; see the
    // jean-jacques-rousseau entry above for why this needs an override.
    searchTerm: "saro-wiwa",
  },
  {
    slug: "bob-marley",
    portraitUrl: "/portraits/bob-marley-nyamsterdamnews-1976.jpg",
    attributionSnippet: "Amsterdam News",
    achievementSnippetEn: "Catch a Fire",
    koName: "밥 말리",
    koAchievementSnippet: "캐치 어 파이어",
  },
] as const;

for (const c of CANDIDATES) {
  test.describe(`roster27: ${c.slug}`, () => {
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

test("roster27: people directory default (unfiltered) view contains all twelve roster27 candidates exactly once (en-US)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/people", { waitUntil: "networkidle" });

  for (const c of CANDIDATES) {
    const cards = page.locator(`a.tgi-personcard__link[href="/en-US/people/${c.slug}"]`);
    await expect(cards, `${c.slug} should appear exactly once`).toHaveCount(1);
  }

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("roster27: a genuinely nonexistent slug still shows the honest not-found message, distinct from non-match-eligible copy", async ({
  page,
}) => {
  await page.goto("/en-US/compare/nonexistent-roster27-test-slug", { waitUntil: "networkidle" });
  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).toContain("We couldn't find that person");
});
