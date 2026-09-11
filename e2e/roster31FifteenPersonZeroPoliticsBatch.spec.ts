import { test, expect } from "@playwright/test";
import { captureConsole } from "./utils/visualChecks";

/**
 * Roster31 fourteen-person zero-politics production batch (2026-09): shared
 * coverage for all promoted candidates, table-driven rather than
 * near-identical spec files. See
 * docs/checkpoints/roster31-fifteen-person-zero-politics-batch.md (filename
 * preserved from the freeze; fourteen shipped -- Booker T. Washington was
 * reverted to `held` before merge on a direct Roster30 zero-politics
 * precedent conflict, same pattern as Roster30's own Hippocrates reversion).
 *
 * All fourteen are evidence_approved/non-match-eligible (published,
 * directory-visible, honestly under eligibility_v2's confidence/coverage
 * floors). Continues Roster30's rule: this batch deliberately contains ZERO
 * people whose primary historical significance is political leadership,
 * state rule, military command, or political/civil-rights activism.
 * Prioritized existing evidence viability first; the pool this cycle turned
 * out heavily concentrated in science/medicine (12 of 14) rather than an
 * even spread across all four interest-area categories -- a mechanically
 * verified fact about which non-political held candidates currently clear a
 * reasonable evidence-richness bar, not a selection preference (see the
 * checkpoint doc's full explanation).
 */

const CANDIDATES = [
  {
    slug: "linus-pauling",
    portraitUrl: "/portraits/linus-pauling-pragher-1977.jpg",
    attributionSnippet: "Pragher",
    achievementSnippetEn: "unshared",
    koName: "라이너스 폴링",
    koAchievementSnippet: "단독으로",
  },
  {
    slug: "robert-falcon-scott",
    portraitUrl: "/portraits/robert-falcon-scott-loc-bain-1900.jpg",
    attributionSnippet: "Bain",
    achievementSnippetEn: "bucket brigades",
    koName: "로버트 팰컨 스콧",
    koAchievementSnippet: "양동이",
  },
  {
    slug: "luis-alvarez",
    portraitUrl: "/portraits/luis-alvarez-lbnl-doe-1969.jpg",
    attributionSnippet: "Berkeley",
    achievementSnippetEn: "spectacularly",
    koName: "루이스 앨버레즈",
    koAchievementSnippet: "터무니없이",
  },
  {
    slug: "ahmed-zewail",
    portraitUrl: "/portraits/ahmed-zewail-sfu-2010.jpg",
    attributionSnippet: "Fraser",
    achievementSnippetEn: "femtochemistry",
    koName: "아메드 즈웨일",
    koAchievementSnippet: "펨토화학",
  },
  {
    slug: "gregor-mendel",
    portraitUrl: "/portraits/gregor-mendel-1862.jpg",
    attributionSnippet: "1862",
    achievementSnippetEn: "28,000",
    koName: "그레고어 멘델",
    koAchievementSnippet: "28,000",
  },
  {
    slug: "emilio-segre",
    portraitUrl: "/portraits/emilio-segre-nobel-1959.jpg",
    attributionSnippet: "Nobel Foundation",
    achievementSnippetEn: "technetium",
    koName: "에밀리오 세그레",
    koAchievementSnippet: "테크네튬",
    // "Emilio Segrè" contains the accented letter "è", so the ASCII naive
    // slug.replace(/-/g, " ") search term ("emilio segre") doesn't
    // substring-match the actual canonicalName string.
    searchTerm: "emilio",
  },
  {
    slug: "taha-hussein",
    portraitUrl: "/portraits/taha-hussein-ahram.jpg",
    attributionSnippet: "Al-Ahram",
    achievementSnippetEn: "Al-Ayyam",
    koName: "타하 후세인",
    koAchievementSnippet: "알아이얌",
  },
  {
    slug: "sofia-kovalevskaya",
    portraitUrl: "/portraits/sofia-kovalevskaya-1888.jpg",
    attributionSnippet: "1888",
    achievementSnippetEn: "Weierstrass",
    koName: "소피야 코발렙스카야",
    koAchievementSnippet: "바이어슈트라스",
  },
  {
    slug: "maria-goeppert-mayer",
    portraitUrl: "/portraits/maria-goeppert-mayer-nobel-1963.jpg",
    attributionSnippet: "Nobel Foundation",
    achievementSnippetEn: "Fermi",
    koName: "마리아 괴퍼트메이어",
    koAchievementSnippet: "페르미",
  },
  {
    slug: "michael-faraday",
    portraitUrl: "/portraits/michael-faraday-1850s.jpg",
    attributionSnippet: "1850s",
    achievementSnippetEn: "bookbinding",
    koName: "마이클 패러데이",
    koAchievementSnippet: "제본",
  },
  {
    slug: "homi-bhabha",
    portraitUrl: "/portraits/homi-bhabha-oberwolfach.jpg",
    attributionSnippet: "Jacobs",
    achievementSnippetEn: "Tata Institute",
    koName: "호미 바바",
    koAchievementSnippet: "타타 기초연구소",
    // "Homi J. Bhabha" has a middle initial with a period, so the naive
    // slug.replace(/-/g, " ") search term ("homi bhabha") doesn't
    // substring-match the actual canonicalName string.
    searchTerm: "bhabha",
  },
  {
    slug: "rosalyn-yalow",
    portraitUrl: "/portraits/rosalyn-yalow-usia-1977.jpg",
    attributionSnippet: "Information Agency",
    achievementSnippetEn: "radioimmunoassay",
    koName: "로절린 얠로",
    koAchievementSnippet: "방사면역측정법",
  },
  {
    slug: "enrico-fermi",
    portraitUrl: "/portraits/enrico-fermi-nara-1940s.jpg",
    attributionSnippet: "Archives",
    achievementSnippetEn: "Chicago Pile",
    koName: "엔리코 페르미",
    koAchievementSnippet: "시카고 파일",
  },
  {
    slug: "dorothy-hodgkin",
    portraitUrl: "/portraits/dorothy-hodgkin-pragher-1970.jpg",
    attributionSnippet: "Pragher",
    achievementSnippetEn: "penicillin",
    koName: "도러시 호지킨",
    koAchievementSnippet: "페니실린",
  },
] as const;

for (const c of CANDIDATES) {
  test.describe(`roster31: ${c.slug}`, () => {
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

test("roster31: people directory default (unfiltered) view contains all fourteen shipped candidates exactly once (en-US)", async ({
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
