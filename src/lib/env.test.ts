import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// siteUrl() now has module-level state (a "warned once" flag) to avoid
// spamming a real build log — resetModules + a fresh dynamic import per
// test gives each test its own module instance, so that state can never
// leak between test cases.
async function freshSiteUrl() {
  const mod = await import("./env.js");
  return mod.siteUrl;
}

describe("siteUrl", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("prefers NEXT_PUBLIC_SITE_URL when set, even alongside a Vercel production URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://custom-domain.example");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "some-project.vercel.app");
    const siteUrl = await freshSiteUrl();
    expect(siteUrl()).toBe("https://custom-domain.example");
  });

  it("falls back to VERCEL_PROJECT_PRODUCTION_URL, with https://, when no explicit site URL is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "the-great-inside.vercel.app");
    const siteUrl = await freshSiteUrl();
    expect(siteUrl()).toBe("https://the-great-inside.vercel.app");
  });

  it("never uses VERCEL_URL (which also covers preview deployments) as the canonical origin", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    // Simulates a preview deployment: only the per-deployment VERCEL_URL is
    // set, not the stable production alias. Must NOT resolve to this.
    vi.stubEnv("VERCEL_URL", "the-great-inside-git-pr-123.vercel.app");
    const siteUrl = await freshSiteUrl();
    expect(siteUrl()).not.toContain("pr-123");
  });

  it("falls back to localhost silently in local dev, with no warning", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const siteUrl = await freshSiteUrl();
    expect(siteUrl()).toBe("http://localhost:3000");
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("falls back to localhost in production too, but logs a loud warning rather than failing silently", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const siteUrl = await freshSiteUrl();
    expect(siteUrl()).toBe("http://localhost:3000");
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls[0]?.[0]).toContain("NEXT_PUBLIC_SITE_URL is not set");
  });

  it("warns only once per module instance, not on every call (avoids spamming a real build log across many pages)", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const siteUrl = await freshSiteUrl();
    siteUrl();
    siteUrl();
    siteUrl();
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("does not throw — a metadata-only concern must never crash the whole app", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    vi.spyOn(console, "error").mockImplementation(() => {});
    const siteUrl = await freshSiteUrl();
    expect(() => siteUrl()).not.toThrow();
  });
});
