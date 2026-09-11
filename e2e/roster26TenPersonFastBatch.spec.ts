import { test, expect } from "@playwright/test";
import { captureConsole } from "./utils/visualChecks";

/**
 * Roster26 ten-person fast production batch (2026-09): shared coverage for
 * all ten promoted candidates, table-driven rather than ten near-identical
 * spec files. See docs/checkpoints/roster26-ten-person-fast-batch.md.
 *
 * Che Guevara is pre-existing qa_passed/match-eligible. The other nine
 * (Fidel Castro, Jawaharlal Nehru, Ho Chi Minh, Salvador Allende, Corazon
 * Aquino, Muhammad Ali Jinnah, Nawal El Saadawi, Puyi, King Hussein of
 * Jordan) are evidence_approved/non-match-eligible (published,
 * directory-visible, honestly under eligibility_v2's floors).
 */

const CANDIDATES = [
  {
    slug: "che-guevara",
    portraitUrl: "/portraits/che-guevara-burri-1963.jpg",
    attributionSnippet: "René Burri",
    achievementSnippetEn: "La Guerra de Guerrillas",
    koName: "체 게바라",
    koAchievementSnippet: "게릴라 전쟁론",
    matchEligible: true,
  },
  {
    slug: "fidel-castro",
    portraitUrl: "/portraits/fidel-castro-loc-gotfryd-1979.jpg",
    attributionSnippet: "Bernard Gotfryd",
    achievementSnippetEn: "Sierra Maestra",
    koName: "피델 카스트로",
    koAchievementSnippet: "시에라 마에스트라",
    matchEligible: false,
  },
  {
    slug: "jawaharlal-nehru",
    portraitUrl: "/portraits/jawaharlal-nehru-netherlands-1957.jpg",
    attributionSnippet: "Harry Pot",
    achievementSnippetEn: "Discovery of India",
    koName: "자와할랄 네루",
    koAchievementSnippet: "인도의 발견",
    matchEligible: false,
  },
  {
    slug: "ho-chi-minh",
    portraitUrl: "/portraits/ho-chi-minh-1946-portrait.jpg",
    attributionSnippet: "1947",
    achievementSnippetEn: "Declaration of Independence",
    koName: "호찌민",
    koAchievementSnippet: "독립 선언",
    matchEligible: false,
  },
  {
    slug: "salvador-allende",
    portraitUrl: "/portraits/salvador-allende-bcn.jpg",
    attributionSnippet: "Biblioteca del Congreso",
    achievementSnippetEn: "path to socialism",
    koName: "살바도르 아옌데",
    koAchievementSnippet: "사회주의로 가는 길",
    matchEligible: false,
  },
  {
    slug: "corazon-aquino",
    portraitUrl: "/portraits/corazon-aquino-andrews-afb-1986.jpg",
    attributionSnippet: "Gerald B. Johnson",
    achievementSnippetEn: "plain housewife",
    koName: "코라손 아키노",
    koAchievementSnippet: "평범한 주부",
    matchEligible: false,
  },
  {
    slug: "muhammad-ali-jinnah",
    portraitUrl: "/portraits/muhammad-ali-jinnah-1945.jpg",
    attributionSnippet: "1945",
    achievementSnippetEn: "Bombay",
    koName: "무함마드 알리 진나",
    koAchievementSnippet: "봄베이",
    matchEligible: false,
  },
  {
    slug: "nawal-el-saadawi",
    portraitUrl: "/portraits/nawal-el-saadawi-tahrir-2012.jpg",
    attributionSnippet: "Gigi Ibrahim",
    achievementSnippetEn: "Women's Prison",
    koName: "나왈 엘 사다위",
    koAchievementSnippet: "여성 감옥",
    matchEligible: false,
  },
  {
    slug: "puyi",
    portraitUrl: "/portraits/puyi-manchukuo-period.jpg",
    attributionSnippet: "Manchukuo",
    achievementSnippetEn: "Reginald Johnston",
    koName: "푸이",
    koAchievementSnippet: "존스턴",
    matchEligible: false,
  },
  {
    slug: "king-hussein-jordan",
    portraitUrl: "/portraits/king-hussein-jordan-pentagon-1997.jpg",
    attributionSnippet: "Stikkel",
    achievementSnippetEn: "46 years",
    koName: "후세인 1세",
    koAchievementSnippet: "46년",
    matchEligible: false,
    // Slug doesn't literally contain "of" ("King Hussein OF Jordan"), unlike
    // every other slug here which is a direct hyphenated form of the name.
    searchTerm: "king hussein",
  },
] as const;

for (const c of CANDIDATES) {
  test.describe(`roster26: ${c.slug}`, () => {
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

test("roster26: people directory default (unfiltered) view contains all ten roster26 candidates exactly once (en-US)", async ({
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

test("roster26: a genuinely nonexistent slug still shows the honest not-found message, distinct from non-match-eligible copy", async ({
  page,
}) => {
  await page.goto("/en-US/compare/nonexistent-roster26-test-slug", { waitUntil: "networkidle" });
  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).toContain("We couldn't find that person");
});
