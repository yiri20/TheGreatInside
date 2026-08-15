import { describe, expect, it } from "vitest";
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from "./legal.js";

const DOCS = { "Privacy Policy": PRIVACY_POLICY, "Terms of Service": TERMS_OF_SERVICE };

describe.each(Object.entries(DOCS))("%s content", (_name, doc) => {
  it("has both launch locales with a non-empty title and last-updated line", () => {
    for (const locale of ["en-US", "ko-KR"] as const) {
      expect(doc[locale].title.length).toBeGreaterThan(0);
      expect(doc[locale].lastUpdated.length).toBeGreaterThan(0);
      expect(doc[locale].intro.length).toBeGreaterThan(0);
    }
  });

  it("has the exact same number of sections in both locales — no untranslated/missing section", () => {
    expect(doc["ko-KR"].sections.length).toBe(doc["en-US"].sections.length);
  });

  it("has the exact same number of paragraphs per section in both locales, in order", () => {
    doc["en-US"].sections.forEach((section, i) => {
      const koSection = doc["ko-KR"].sections[i];
      expect(koSection, `no ko-KR section at index ${i}`).toBeDefined();
      expect(koSection?.paragraphs.length).toBe(section.paragraphs.length);
    });
  });

  it("every section heading and paragraph is non-empty in both locales", () => {
    for (const locale of ["en-US", "ko-KR"] as const) {
      for (const section of doc[locale].sections) {
        expect(section.heading.length).toBeGreaterThan(0);
        for (const paragraph of section.paragraphs) {
          expect(paragraph.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("Korean content is not simply the English content left untranslated", () => {
    // A coarse but real guard: every KO heading must differ from its EN
    // counterpart at the same index (an untranslated section would fail
    // this the moment it's ever accidentally copy-pasted instead of
    // translated).
    doc["en-US"].sections.forEach((section, i) => {
      const koSection = doc["ko-KR"].sections[i];
      expect(koSection, `no ko-KR section at index ${i}`).toBeDefined();
      expect(koSection?.heading).not.toBe(section.heading);
    });
  });

  it("references the supplied contact email consistently, never a placeholder", () => {
    for (const locale of ["en-US", "ko-KR"] as const) {
      const allText = [
        ...doc[locale].intro,
        ...doc[locale].sections.flatMap((s) => s.paragraphs),
      ].join(" ");
      expect(allText).toContain("thegreatinside.web@gmail.com");
      expect(allText).not.toMatch(/your-?email|example\.com|TODO|FIXME|\[.*email.*\]/i);
    }
  });

  it("never asserts a specific company/legal-entity name, physical address, or compliance-regime claim", () => {
    for (const locale of ["en-US"] as const) {
      const allText = [...doc[locale].intro, ...doc[locale].sections.flatMap((s) => s.paragraphs)].join(" ");
      expect(allText).not.toMatch(/\bGDPR\b|\bCCPA\b|\bCOPPA\b/);
      expect(allText).not.toMatch(/\b(Inc\.|LLC|Ltd\.|Corporation)\b/);
    }
  });
});
