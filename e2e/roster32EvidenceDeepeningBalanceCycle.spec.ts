import { test, expect } from "@playwright/test";
import { captureConsole } from "./utils/visualChecks";

/**
 * Roster32 evidence-deepening + match-pool-balance cycle (2026-09): shared
 * coverage for the seven candidates promoted this cycle via an
 * ELIGIBILITY-BLIND publication review (never gated on eligibility_v2 --
 * see docs/checkpoints/profile-publication-vs-match-eligibility.md). Unlike
 * every prior roster cycle, these were NOT selected for existing evidence
 * richness -- all eight frozen candidates (Pele, Fahrelnissa Zeid, Virginia
 * Woolf, Matsuo Basho, James Baldwin, Al-Farabi, George Bernard Shaw, Pablo
 * Neruda) were deepened with genuinely NEW behavioral research from a
 * shared `held` starting point. Al-Farabi is deliberately absent from both
 * this list and production: a concrete, unrelated attribution defect on an
 * existing row (see his candidate file's holdReason) kept him held after
 * publication review -- a dedicated negative-presence check below confirms
 * this, matching Roster30's own Hippocrates precedent.
 *
 * All seven are evidence_approved/non-match-eligible (published,
 * directory-visible, honestly under eligibility_v2's confidence/coverage
 * floors -- none were rescued). See
 * docs/checkpoints/roster32-evidence-deepening-balance-cycle.md for the
 * full per-candidate publication rationale and the mechanically-derived
 * row-change ledger.
 */

const CANDIDATES = [
  {
    slug: "pele",
    portraitUrl: "/portraits/pele-anefo-schiphol-1962.jpg",
    attributionSnippet: "1962",
    achievementSnippetEn: "World Cups",
    koName: "펠레",
    koAchievementSnippet: "월드컵",
    // "Pelé" has an accented character the ASCII naive
    // slug.replace(/-/g, " ") search term doesn't reproduce, and the
    // search matcher does not normalize accents -- search his alias instead.
    searchTerm: "edson",
  },
  {
    slug: "fahrelnissa-zeid",
    portraitUrl: "/portraits/fahrelnissa-zeid-family-1937.jpg",
    attributionSnippet: "1937",
    achievementSnippetEn: "Op-art",
    koName: "파흐렐니사 제이드",
    koAchievementSnippet: "옵아트",
  },
  {
    slug: "virginia-woolf",
    portraitUrl: "/portraits/virginia-woolf-beresford-1902.jpg",
    attributionSnippet: "Beresford",
    achievementSnippetEn: "Hogarth",
    koName: "버지니아 울프",
    koAchievementSnippet: "호가스",
  },
  {
    slug: "matsuo-basho",
    portraitUrl: "/portraits/matsuo-basho-kyoriku.jpg",
    attributionSnippet: "Kyoriku",
    achievementSnippetEn: "Oku no Hosomichi",
    koName: "마쓰오 바쇼",
    koAchievementSnippet: "오쿠노호소미치",
  },
  {
    slug: "james-baldwin",
    portraitUrl: "/portraits/james-baldwin-vanvechten-1955.jpg",
    attributionSnippet: "1955",
    achievementSnippetEn: "Fire Next Time",
    koName: "제임스 볼드윈",
    koAchievementSnippet: "다음엔 불을",
  },
  {
    slug: "george-bernard-shaw",
    portraitUrl: "/portraits/george-bernard-shaw-bain-1909.jpg",
    attributionSnippet: "1909",
    achievementSnippetEn: "Academy Award",
    koName: "조지 버나드 쇼",
    koAchievementSnippet: "아카데미상",
  },
  {
    slug: "pablo-neruda",
    portraitUrl: "/portraits/pablo-neruda-loc-1966.jpg",
    attributionSnippet: "1966",
    achievementSnippetEn: "Isla Negra",
    koName: "파블로 네루다",
    koAchievementSnippet: "이슬라네그라",
  },
] as const;

for (const c of CANDIDATES) {
  test.describe(`roster32: ${c.slug}`, () => {
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

test("roster32: people directory default (unfiltered) view contains all seven shipped candidates exactly once (en-US)", async ({
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

test("roster32: Al-Farabi remains held on a concrete attribution defect and is NOT exposed as a shipped profile", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const card = page.locator(`a.tgi-personcard__link[href="/en-US/people/al-farabi"]`);
  await expect(card).toHaveCount(0);

  const response = await page.goto("/en-US/people/al-farabi", { waitUntil: "networkidle" });
  expect(response?.status()).not.toBe(200);
});

test("roster32: a genuinely nonexistent slug still shows the honest not-found message, distinct from non-match-eligible copy", async ({
  page,
}) => {
  await page.goto("/en-US/compare/nonexistent-roster32-test-slug", { waitUntil: "networkidle" });
  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).toContain("We couldn't find that person");
});
