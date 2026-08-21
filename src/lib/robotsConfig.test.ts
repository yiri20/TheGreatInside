import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { buildRobotsConfig } from "./robotsConfig";

describe("buildRobotsConfig", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://thegreatinside.example";
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("allows normal public crawling", () => {
    const result = buildRobotsConfig();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rule?.userAgent).toBe("*");
    expect(rule?.allow).toBe("/");
  });

  it("does not disallow Results/Compare/Account/Saved Result — those are page-level noindex, not robots-blocked", () => {
    const result = buildRobotsConfig();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    const disallow = ([] as string[]).concat(rule?.disallow ?? []);
    for (const path of ["/results", "/compare", "/account", "/en-US/results", "/en-US/compare", "/en-US/account"]) {
      expect(disallow).not.toContain(path);
    }
  });

  it("disallows the auth callback infrastructure route", () => {
    const result = buildRobotsConfig();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    const disallow = ([] as string[]).concat(rule?.disallow ?? []);
    expect(disallow).toContain("/auth/callback");
  });

  it("references the sitemap via siteUrl(), never a hardcoded host", () => {
    const result = buildRobotsConfig();
    expect(result.sitemap).toBe("https://thegreatinside.example/sitemap.xml");
  });

  it("never hardcodes a Vercel preview hostname — derives from VERCEL_PROJECT_PRODUCTION_URL when NEXT_PUBLIC_SITE_URL is unset", () => {
    process.env.NEXT_PUBLIC_SITE_URL = undefined;
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "the-great-inside.vercel.app";
    const result = buildRobotsConfig();
    expect(result.sitemap).toBe("https://the-great-inside.vercel.app/sitemap.xml");
  });

  it("references the sitemap on the real production domain (thegreatinside.com), never the old Vercel hostname (2026-08 domain migration)", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://thegreatinside.com";
    const result = buildRobotsConfig();
    expect(result.sitemap).toBe("https://thegreatinside.com/sitemap.xml");
  });
});
