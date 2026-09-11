import { test, expect } from "@playwright/test";
import { captureConsole } from "./utils/visualChecks";

/**
 * Roster30 twenty-person zero-politics fast production batch (2026-09):
 * shared coverage for all promoted candidates, table-driven rather than
 * near-identical spec files. See
 * docs/checkpoints/roster30-twenty-person-zero-politics-batch.md.
 *
 * Nineteen candidates below (of the twenty originally promoted): Hippocrates
 * was returned to `held` on post-PR evidence-attribution review (see the
 * checkpoint doc) and is deliberately absent from both this list and
 * production -- a dedicated negative-presence check below confirms this.
 *
 * All nineteen are evidence_approved/non-match-eligible (published,
 * directory-visible, honestly under eligibility_v2's confidence/coverage
 * floors). This batch deliberately contains ZERO people whose primary
 * historical significance is political leadership, state rule, military
 * command, or political/civil-rights activism — see the checkpoint doc's
 * zero-politics confirmation. Prioritized existing evidence viability
 * first, then broad public recognizability: science, mathematics,
 * medicine, literature, philosophy, visual art, architecture, photography,
 * business/entrepreneurship, athletics, and exploration.
 */

const CANDIDATES = [
  {
    slug: "barbara-mcclintock",
    portraitUrl: "/portraits/barbara-mcclintock-gotfryd-1981.jpg",
    attributionSnippet: "1981",
    achievementSnippetEn: "transposable",
    koName: "바버라 매클린톡",
    koAchievementSnippet: "점핑 유전자",
  },
  {
    slug: "chien-shiung-wu",
    portraitUrl: "/portraits/chien-shiung-wu-1963.jpg",
    attributionSnippet: "1963",
    achievementSnippetEn: "parity",
    koName: "우젠슝",
    koAchievementSnippet: "홀짝성",
    // "Chien-Shiung Wu" has a hyphen as part of the name itself, so the
    // naive slug.replace(/-/g, " ") search term doesn't substring-match
    // the actual canonicalName string.
    searchTerm: "wu",
  },
  {
    slug: "frederick-sanger",
    portraitUrl: "/portraits/frederick-sanger-nlm.jpg",
    attributionSnippet: "Medicine",
    achievementSnippetEn: "twice",
    koName: "프레더릭 생어",
    koAchievementSnippet: "두 차례",
  },
  {
    slug: "hypatia",
    portraitUrl: "/portraits/hypatia-engraving-1850.jpg",
    attributionSnippet: "1850",
    achievementSnippetEn: "Neoplatonist",
    koName: "히파티아",
    koAchievementSnippet: "신플라톤주의",
  },
  {
    slug: "jean-francois-champollion",
    portraitUrl: "/portraits/jean-francois-champollion-cogniet-1831.jpg",
    attributionSnippet: "Cogniet",
    achievementSnippetEn: "hieroglyphs",
    koName: "장프랑수아 샹폴리옹",
    koAchievementSnippet: "상형문자",
    // "Jean-Francois Champollion" has a hyphen as part of the name itself,
    // so the naive slug.replace(/-/g, " ") search term doesn't
    // substring-match the actual canonicalName string.
    searchTerm: "champollion",
  },
  {
    slug: "mary-shelley",
    portraitUrl: "/portraits/mary-shelley-rothwell-1840.jpg",
    attributionSnippet: "Rothwell",
    achievementSnippetEn: "Frankenstein",
    koName: "메리 셸리",
    koAchievementSnippet: "프랑켄슈타인",
  },
  {
    slug: "omar-khayyam",
    portraitUrl: "/portraits/omar-khayyam-venediktov.jpg",
    attributionSnippet: "Venediktov",
    achievementSnippetEn: "cubic",
    koName: "오마르 하이얌",
    koAchievementSnippet: "삼차방정식",
  },
  {
    slug: "mary-anning",
    portraitUrl: "/portraits/mary-anning-painting.jpg",
    attributionSnippet: "1842",
    achievementSnippetEn: "ichthyosaur",
    koName: "메리 애닝",
    koAchievementSnippet: "어룡",
  },
  {
    slug: "al-khwarizmi",
    portraitUrl: "/portraits/al-khwarizmi-saleh.jpg",
    attributionSnippet: "Saleh",
    achievementSnippetEn: "algebra",
    koName: "알콰리즈미",
    koAchievementSnippet: "대수학",
    // "Al-Khwarizmi" has a hyphen as part of the name itself, so the naive
    // slug.replace(/-/g, " ") search term doesn't substring-match the
    // actual canonicalName string.
    searchTerm: "khwarizmi",
  },
  {
    slug: "baruch-spinoza",
    portraitUrl: "/portraits/baruch-spinoza-1665.jpg",
    attributionSnippet: "1665",
    achievementSnippetEn: "Theological",
    koName: "바뤼흐 스피노자",
    koAchievementSnippet: "신학정치론",
  },
  {
    slug: "sebastiao-salgado",
    portraitUrl: "/portraits/sebastiao-salgado-2016.jpg",
    attributionSnippet: "2016",
    achievementSnippetEn: "economist",
    koName: "세바스티앙 살가두",
    koAchievementSnippet: "경제학자",
  },
  {
    slug: "jrr-tolkien",
    portraitUrl: "/portraits/jrr-tolkien-1911.jpg",
    attributionSnippet: "Whitlock",
    achievementSnippetEn: "invented",
    koName: "J. R. R. 톨킨",
    koAchievementSnippet: "인공 언어",
    // "J. R. R. Tolkien" has periods/spaces between initials, so the naive
    // slug.replace(/-/g, " ") search term ("jrr tolkien") doesn't
    // substring-match the actual canonicalName string.
    searchTerm: "tolkien",
  },
  {
    slug: "antoni-gaudi",
    portraitUrl: "/portraits/antoni-gaudi-1878.jpg",
    attributionSnippet: "1878",
    achievementSnippetEn: "catenary",
    koName: "안토니 가우디",
    koAchievementSnippet: "현수선",
  },
  {
    slug: "georgia-okeeffe",
    portraitUrl: "/portraits/georgia-okeeffe-vanvechten-1950.jpg",
    attributionSnippet: "Vechten",
    achievementSnippetEn: "abstract",
    koName: "조지아 오키프",
    koAchievementSnippet: "추상",
    // "Georgia O'Keeffe" has an apostrophe as part of the name itself, so
    // the naive slug.replace(/-/g, " ") search term ("georgia okeeffe")
    // doesn't substring-match the actual canonicalName string.
    searchTerm: "georgia",
  },
  {
    slug: "andrew-carnegie",
    portraitUrl: "/portraits/andrew-carnegie-1895.jpg",
    attributionSnippet: "1895",
    achievementSnippetEn: "telegraph",
    koName: "앤드루 카네기",
    koAchievementSnippet: "전신",
  },
  {
    slug: "madam-cj-walker",
    portraitUrl: "/portraits/madam-cj-walker-scurlock-1914.jpg",
    attributionSnippet: "Scurlock",
    achievementSnippetEn: "washerwoman",
    koName: "마담 C.J. 워커",
    koAchievementSnippet: "세탁부",
    // "Madam C.J. Walker" has periods as part of the name itself, so the
    // naive slug.replace(/-/g, " ") search term ("madam cj walker")
    // doesn't substring-match the actual canonicalName string.
    searchTerm: "madam",
  },
  {
    slug: "jesse-owens",
    portraitUrl: "/portraits/jesse-owens-1936.jpg",
    attributionSnippet: "1936",
    achievementSnippetEn: "Big Ten",
    koName: "제시 오언스",
    koAchievementSnippet: "빅텐",
  },
  {
    slug: "roald-amundsen",
    portraitUrl: "/portraits/roald-amundsen-1913.jpg",
    attributionSnippet: "1913",
    achievementSnippetEn: "Northwest Passage",
    koName: "로알 아문센",
    koAchievementSnippet: "북서항로",
  },
  {
    slug: "paul-erdos",
    portraitUrl: "/portraits/paul-erdos-1992.jpg",
    attributionSnippet: "Kmhkmh",
    achievementSnippetEn: "1,525",
    koName: "폴 에르되시",
    koAchievementSnippet: "1,525",
    // "Paul Erdős" contains the Hungarian letter "ő", so the ASCII naive
    // slug.replace(/-/g, " ") search term ("paul erdos") doesn't
    // substring-match the actual canonicalName string.
    searchTerm: "paul",
  },
] as const;

for (const c of CANDIDATES) {
  test.describe(`roster30: ${c.slug}`, () => {
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

test("roster30: people directory default (unfiltered) view shows exactly 203 people, all nineteen shipped candidates present exactly once (en-US)", async ({
  page,
}) => {
  const console_ = captureConsole(page);
  await page.goto("/en-US/people", { waitUntil: "networkidle" });

  await expect(page.getByText(/^203 people$/)).toBeVisible();

  for (const c of CANDIDATES) {
    const cards = page.locator(`a.tgi-personcard__link[href="/en-US/people/${c.slug}"]`);
    await expect(cards, `${c.slug} should appear exactly once`).toHaveCount(1);
  }

  expect(console_.errors).toEqual([]);
  expect(console_.pageErrors).toEqual([]);
});

test("roster30: Hippocrates was returned to held on post-PR review and is NOT exposed as a shipped profile", async ({
  page,
}) => {
  await page.goto("/en-US/people", { waitUntil: "networkidle" });
  const card = page.locator(`a.tgi-personcard__link[href="/en-US/people/hippocrates"]`);
  await expect(card).toHaveCount(0);

  const response = await page.goto("/en-US/people/hippocrates", { waitUntil: "networkidle" });
  expect(response?.status()).not.toBe(200);
});

test("roster30: a genuinely nonexistent slug still shows the honest not-found message, distinct from non-match-eligible copy", async ({
  page,
}) => {
  await page.goto("/en-US/compare/nonexistent-roster30-test-slug", { waitUntil: "networkidle" });
  const bodyText = (await page.locator("main").textContent())!;
  expect(bodyText).toContain("We couldn't find that person");
});
