import { test, expect } from "@playwright/test";
import { captureConsole } from "./utils/visualChecks";

/**
 * Roster29 fifteen-person fast production batch (2026-09): shared coverage
 * for all fifteen promoted candidates, table-driven rather than fifteen
 * near-identical spec files. See
 * docs/checkpoints/roster29-fifteen-person-fast-batch.md.
 *
 * All fifteen are evidence_approved/non-match-eligible (published,
 * directory-visible, honestly under eligibility_v2's confidence/coverage
 * floors). Prioritized existing evidence viability first, then broad public
 * recognizability: literature, philosophy, science, visual art, performing
 * arts, sports, social reform/activism, business, and politics.
 */

const CANDIDATES = [
  {
    slug: "gabriel-garcia-marquez",
    portraitUrl: "/portraits/gabriel-garcia-marquez-2009.jpg",
    attributionSnippet: "2009",
    achievementSnippetEn: "One Hundred Years of Solitude",
    koName: "가브리엘 가르시아 마르케스",
    koAchievementSnippet: "백년의 고독",
    // "Gabriel García Márquez" has accented characters (í, á) the naive
    // ASCII slug.replace(/-/g, " ") search term doesn't reproduce, so it
    // doesn't substring-match the actual canonicalName string.
    searchTerm: "gabriel",
  },
  {
    slug: "murasaki-shikibu",
    portraitUrl: "/portraits/murasaki-shikibu-tosa-mitsuoki.jpg",
    attributionSnippet: "Mitsuoki",
    achievementSnippetEn: "Tale of Genji",
    koName: "무라사키 시키부",
    koAchievementSnippet: "겐지 이야기",
  },
  {
    slug: "zora-neale-hurston",
    portraitUrl: "/portraits/zora-neale-hurston-vanvechten-1938.jpg",
    attributionSnippet: "1938",
    achievementSnippetEn: "Barnard College",
    koName: "조라 닐 허스턴",
    koAchievementSnippet: "바너드",
  },
  {
    slug: "seneca",
    portraitUrl: "/portraits/seneca-wawel.jpg",
    attributionSnippet: "Wawel",
    achievementSnippetEn: "Letters to Lucilius",
    koName: "세네카",
    koAchievementSnippet: "루킬리우스",
  },
  {
    slug: "jean-piaget",
    portraitUrl: "/portraits/jean-piaget-anefo-1972.jpg",
    attributionSnippet: "1972",
    achievementSnippetEn: "cognitive development",
    koName: "장 피아제",
    koAchievementSnippet: "인지 발달",
  },
  {
    slug: "ibn-al-haytham",
    portraitUrl: "/portraits/ibn-al-haytham-hevelius-1647.jpg",
    attributionSnippet: "Hevelius",
    achievementSnippetEn: "Book of Optics",
    koName: "이븐 알하이삼",
    koAchievementSnippet: "광학의 서",
    // "Ibn al-Haytham" has a hyphen as part of the name itself, so the naive
    // slug.replace(/-/g, " ") search term doesn't substring-match the
    // actual canonicalName string.
    searchTerm: "haytham",
  },
  {
    slug: "dorothea-lange",
    portraitUrl: "/portraits/dorothea-lange-1936.jpg",
    attributionSnippet: "1936",
    achievementSnippetEn: "Farm Security Administration",
    koName: "도로시아 랭",
    koAchievementSnippet: "농업안정국",
  },
  {
    slug: "katherine-dunham",
    portraitUrl: "/portraits/katherine-dunham-vanvechten-1940.jpg",
    attributionSnippet: "1940",
    achievementSnippetEn: "Dunham Technique",
    koName: "캐서린 던햄",
    koAchievementSnippet: "던햄 테크닉",
  },
  {
    slug: "wilma-rudolph",
    portraitUrl: "/portraits/wilma-rudolph-1961.jpg",
    attributionSnippet: "1961",
    achievementSnippetEn: "Rome",
    koName: "윌마 루돌프",
    koAchievementSnippet: "로마",
  },
  {
    slug: "william-wilberforce",
    portraitUrl: "/portraits/william-wilberforce-russell.jpg",
    attributionSnippet: "Russell",
    achievementSnippetEn: "scandal",
    koName: "윌리엄 윌버포스",
    koAchievementSnippet: "노예무역",
  },
  {
    slug: "desmond-tutu",
    portraitUrl: "/portraits/desmond-tutu-gool.jpg",
    attributionSnippet: "Gool",
    achievementSnippetEn: "Truth and Reconciliation",
    koName: "데즈먼드 투투",
    koAchievementSnippet: "진실화해위원회",
  },
  {
    slug: "ratan-tata",
    portraitUrl: "/portraits/ratan-tata-2024.jpg",
    attributionSnippet: "Puralekh",
    achievementSnippetEn: "Jaguar Land Rover",
    koName: "라탄 타타",
    koAchievementSnippet: "재규어 랜드로버",
  },
  {
    slug: "indira-gandhi",
    portraitUrl: "/portraits/indira-gandhi-official-1983.jpg",
    attributionSnippet: "1983",
    achievementSnippetEn: "1971",
    koName: "인디라 간디",
    koAchievementSnippet: "1971",
  },
  {
    slug: "ulysses-s-grant",
    portraitUrl: "/portraits/ulysses-s-grant-1860.jpg",
    attributionSnippet: "1860",
    achievementSnippetEn: "Appomattox",
    koName: "율리시스 S. 그랜트",
    koAchievementSnippet: "애퍼매톡스",
    // "Ulysses S. Grant" has a period after the middle initial, so the naive
    // slug.replace(/-/g, " ") search term doesn't substring-match the
    // actual canonicalName string.
    searchTerm: "grant",
  },
  {
    slug: "suleiman-the-magnificent",
    portraitUrl: "/portraits/suleiman-the-magnificent-lorck-1562.jpg",
    attributionSnippet: "Lorck",
    achievementSnippetEn: "Kanunname",
    koName: "술레이만 대제",
    koAchievementSnippet: "카눈나메",
  },
] as const;

for (const c of CANDIDATES) {
  test.describe(`roster29: ${c.slug}`, () => {
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

test("roster29: people directory default (unfiltered) view shows exactly 184 people, all fifteen new candidates present exactly once (en-US)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/people", { waitUntil: "networkidle" });

  await expect(page.getByText(/^184 people$/)).toBeVisible();

  for (const c of CANDIDATES) {
    const cards = page.locator(`a.tgi-personcard__link[href="/en-US/people/${c.slug}"]`);
    await expect(cards, `${c.slug} should appear exactly once`).toHaveCount(1);
  }

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("roster29: a genuinely nonexistent slug still shows the honest not-found message, distinct from non-match-eligible copy", async ({
  page,
}) => {
  await page.goto("/en-US/compare/nonexistent-roster29-test-slug", { waitUntil: "networkidle" });
  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).toContain("We couldn't find that person");
});
