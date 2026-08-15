import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { LAUNCH_LOCALES } from "@core/types";
import { SEED_PEOPLE } from "@data/people/seed";
import { buildSitemapEntries } from "./sitemapEntries";

describe("buildSitemapEntries", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://thegreatinside.example";
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("produces exactly 80 URLs: 2 Landing + 2 People + 2 Quiz + 2 Privacy + 2 Terms + 70 Person", () => {
    const entries = buildSitemapEntries();
    expect(entries).toHaveLength(80);
  });

  it("includes both launch locales for Landing", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    for (const locale of LAUNCH_LOCALES) {
      expect(urls).toContain(`https://thegreatinside.example/${locale}`);
    }
  });

  it("includes both launch locales for the People directory", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    for (const locale of LAUNCH_LOCALES) {
      expect(urls).toContain(`https://thegreatinside.example/${locale}/people`);
    }
  });

  it("includes Quiz for both launch locales", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    for (const locale of LAUNCH_LOCALES) {
      expect(urls).toContain(`https://thegreatinside.example/${locale}/quiz`);
    }
  });

  it("includes Privacy for both launch locales (Broader Public Launch Finish Line)", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    for (const locale of LAUNCH_LOCALES) {
      expect(urls).toContain(`https://thegreatinside.example/${locale}/privacy`);
    }
  });

  it("includes Terms for both launch locales (Broader Public Launch Finish Line)", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    for (const locale of LAUNCH_LOCALES) {
      expect(urls).toContain(`https://thegreatinside.example/${locale}/terms`);
    }
  });

  it("includes every current person for every launch locale, including match-ineligible ones (e.g. Zheng He)", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    for (const locale of LAUNCH_LOCALES) {
      for (const person of SEED_PEOPLE) {
        expect(urls).toContain(`https://thegreatinside.example/${locale}/people/${person.slug}`);
      }
    }
    expect(urls).toContain("https://thegreatinside.example/en-US/people/zheng-he");
  });

  it("scales the person-URL count to exactly SEED_PEOPLE.length x LAUNCH_LOCALES.length", () => {
    const entries = buildSitemapEntries();
    const personUrls = entries.filter((e) => /\/people\/[^/]+$/.test(e.url) && !e.url.endsWith("/people"));
    expect(personUrls).toHaveLength(SEED_PEOPLE.length * LAUNCH_LOCALES.length);
  });

  it("excludes bare / (no locale prefix)", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    expect(urls).not.toContain("https://thegreatinside.example");
    expect(urls).not.toContain("https://thegreatinside.example/");
  });

  it("excludes Results", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    expect(urls.some((u) => u.includes("/results"))).toBe(false);
  });

  it("excludes Compare", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    expect(urls.some((u) => u.includes("/compare"))).toBe(false);
  });

  it("excludes Account (including Saved Result)", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    expect(urls.some((u) => u.includes("/account"))).toBe(false);
  });

  it("excludes the auth callback route", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    expect(urls.some((u) => u.includes("/auth"))).toBe(false);
  });

  it("never embeds a result token", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    expect(urls.some((u) => u.includes("?r="))).toBe(false);
  });

  it("builds every URL from siteUrl(), never a hardcoded host", () => {
    process.env.NEXT_PUBLIC_SITE_URL = undefined;
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "the-great-inside.vercel.app";
    const urls = buildSitemapEntries().map((e) => e.url);
    expect(urls.every((u) => u.startsWith("https://the-great-inside.vercel.app"))).toBe(true);
  });
});
