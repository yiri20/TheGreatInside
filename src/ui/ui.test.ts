import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement, type ReactElement } from "react";
import {
  ComparisonBar,
  ConfidenceIndicator,
  IdentityHero,
  ImpactBadge,
  PersonCard,
  PortraitCredit,
  ScoreBar,
  Select,
  TextField,
  TraitCard,
  TraitChip,
} from "./index.js";
import type { PersonPortrait } from "../core/types.js";
import {
  ALL_IMPACTS,
  clampScore,
  confidenceLevel,
  confidencePips,
  formatLifespan,
  formatMatch,
  formatPotential,
  formatScore,
  gapGeometry,
  impactPresentation,
  initialsFromName,
} from "./lib/display.js";
import { en } from "../core/i18n/en.js";
import { t } from "../core/i18n/index.js";

/** Generic so each call site is checked against the component's real props. */
function render<P extends object>(component: (props: P) => ReactElement, props: P): string {
  return renderToStaticMarkup(createElement(component, props));
}

const css = (name: string) =>
  readFileSync(fileURLToPath(new URL(`./styles/${name}`, import.meta.url)), "utf8");

/* ------------------------------------------------------------------ tokens */

describe("design tokens", () => {
  const tokens = css("tokens.css");
  const components = css("components.css");

  it("defines every semantic impact colour in both themes", () => {
    for (const impact of ["advantage", "dual-edged", "risk", "neutral"]) {
      const occurrences = tokens.split(`--tgi-impact-${impact}:`).length - 1;
      // :root, the prefers-color-scheme block, and [data-theme="dark"].
      expect(occurrences, impact).toBe(3);
    }
  });

  it("lets the explicit theme attribute override the media query in both directions", () => {
    expect(tokens).toContain(':root:not([data-theme="light"])');
    expect(tokens).toContain(':root[data-theme="dark"]');
  });

  it("contains no malformed colour values", () => {
    for (const match of tokens.matchAll(/--tgi-[\w-]+:\s*([^;]+);/g)) {
      const value = match[1]!.trim();
      if (!value.startsWith("#")) continue;
      expect(value, match[0]).toMatch(/^#[0-9a-fA-F]{3,8}$/);
    }
  });

  it("keeps raw colours out of component styles", () => {
    // rgba() is allowed only inside shadow tokens, which live in tokens.css.
    expect(components).not.toMatch(/#[0-9a-fA-F]{3,8}/);
    expect(components).not.toMatch(/\brgba?\(/);
  });

  it("respects reduced-motion", () => {
    expect(tokens).toContain("prefers-reduced-motion");
  });

  it("gives controls a thumb-friendly minimum target", () => {
    expect(components).toMatch(/\.tgi-button\s*\{[^}]*min-height:\s*2\.75rem/);
  });
});

/* ------------------------------------------------------------ pure helpers */

describe("display helpers", () => {
  it("clamps scores into the 0-100 contract", () => {
    expect(clampScore(-20)).toBe(0);
    expect(clampScore(140)).toBe(100);
    expect(clampScore(Number.NaN)).toBe(0);
  });

  it("renders a trait score with no percent sign", () => {
    // A score is a location on a dimension, not a percentage.
    expect(formatScore(91)).toBe("91");
    expect(formatScore(91)).not.toContain("%");
  });

  it("renders Profile Match as a percentage", () => {
    expect(formatMatch(84)).toBe("84%");
  });

  it("renders Greatness Potential as N / 100, never a percentage", () => {
    expect(formatPotential(82)).toBe("82 / 100");
    expect(formatPotential(82)).not.toContain("%");
  });

  it("computes the gap segment symmetrically", () => {
    expect(gapGeometry(40, 80)).toEqual({ left: "40%", width: "40%" });
    expect(gapGeometry(80, 40)).toEqual(gapGeometry(40, 80));
    expect(gapGeometry(55, 55)).toEqual({ left: "55%", width: "0%" });
  });

  it("bands confidence into three coarse buckets", () => {
    expect(confidenceLevel(0.3)).toBe("low");
    expect(confidenceLevel(0.6)).toBe("moderate");
    expect(confidenceLevel(0.92)).toBe("high");
    expect(confidencePips(0.92)).toBe(3);
    expect(confidencePips(0.3)).toBe(1);
  });

  it("formats lifespans including BCE and living people", () => {
    expect(formatLifespan(1452, 1519, false)).toBe("1452–1519");
    expect(formatLifespan(1941, undefined, true)).toBe("b. 1941");
    expect(formatLifespan(-551, -479, false)).toBe("551 BCE–479 BCE");
  });

  it("has a distinct presentation for every impact value", () => {
    const glyphs = new Set(ALL_IMPACTS.map((i) => impactPresentation(i).glyph));
    const modifiers = new Set(ALL_IMPACTS.map((i) => impactPresentation(i).modifier));
    expect(glyphs.size).toBe(4);
    expect(modifiers.size).toBe(4);
  });
});

/* -------------------------------------------------------------- rendering */

describe("colour is never the only signal", () => {
  for (const impact of ALL_IMPACTS) {
    it(`renders a text label alongside the ${impact} colour`, () => {
      const html = render(ImpactBadge, { impact, locale: "en-US" });
      const label = t("en-US", impactPresentation(impact).labelKey);
      expect(html).toContain(label);
      // The glyph is redundant decoration, so it must be hidden from AT.
      expect(html).toContain('aria-hidden="true"');
    });
  }

  it("labels impact in Korean too", () => {
    expect(render(ImpactBadge, { impact: "dual_edged", locale: "ko-KR" })).toContain("양날의 특성");
  });
});

describe("accessible data display", () => {
  it("exposes a score bar as a progressbar with a spoken value", () => {
    const html = render(ScoreBar, { label: "Curiosity", score: 91, locale: "en-US" });
    expect(html).toContain('role="progressbar"');
    expect(html).toContain('aria-valuenow="91"');
    expect(html).toContain('aria-valuetext="Curiosity 91 / 100"');
    expect(html).toContain("width:91%");
  });

  it("clamps an out-of-range score before it reaches the DOM", () => {
    const html = render(ScoreBar, { label: "Curiosity", score: 250, locale: "en-US" });
    expect(html).toContain("width:100%");
    expect(html).toContain('aria-valuenow="100"');
  });

  it("describes a comparison as one sentence rather than two loose bars", () => {
    const html = render(ComparisonBar, {
      label: "Collaboration",
      userScore: 82,
      personScore: 48,
      personName: "Steve Jobs",
      locale: "en-US",
    });
    expect(html).toContain('role="img"');
    expect(html).toContain("Collaboration. You 82, Steve Jobs 48, out of 100.");
    // Legend duplicates the same information visually, so it is hidden from AT.
    expect(html).toContain('class="tgi-compare__legend" aria-hidden="true"');
  });

  it("gives the confidence pips a text alternative", () => {
    const html = render(ConfidenceIndicator, { confidence: 0.9, locale: "en-US" });
    expect(html).toContain('role="img"');
    expect(html).toContain("Well documented");
  });

  it("renders a decorative portrait placeholder without an image role", () => {
    const html = render(PersonCard, { name: "Yi Sun-sin", locale: "en-US" });
    expect(html).toContain("YS");
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain("<img");
  });

  it("gives a real portrait an empty alt because the name is adjacent", () => {
    const html = render(PersonCard, {
      name: "Marie Curie",
      portraitUrl: "/p/curie.jpg",
      locale: "en-US",
    });
    expect(html).toContain('alt=""');
  });

  it("exposes exactly one focusable target per linked person card", () => {
    const html = render(PersonCard, {
      name: "Ada Lovelace",
      href: "/en-US/people/ada-lovelace",
      match: 84,
      locale: "en-US",
    });
    expect(html.match(/<a /g)).toHaveLength(1);
    expect(html).toContain("84%");
  });
});

describe("initialsFromName", () => {
  it("takes the first grapheme of up to two words", () => {
    expect(initialsFromName("Yi Sun-sin")).toBe("YS");
    expect(initialsFromName("Marie Curie")).toBe("MC");
  });

  it("degrades to a single grapheme for a single-word display name (e.g. Korean)", () => {
    expect(initialsFromName("이순신")).toBe("이");
  });
});

describe("IdentityHero", () => {
  // Results/Person/Compare hero — the reported defect was that this
  // component rendered NOTHING for the portrait column when `portraitUrl`
  // was absent (unlike PersonCard, which already had an initials
  // fallback). These tests pin the fixed contract directly against the
  // shared component, ahead of the Playwright coverage per surface.

  it("renders the portrait image unchanged when a portrait is present", () => {
    const html = render(IdentityHero, {
      name: "Marie Curie",
      portraitUrl: "/p/curie.jpg",
      children: createElement("h1", null, "Marie Curie"),
    });
    expect(html).toContain("<img");
    expect(html).toContain('src="/p/curie.jpg"');
    expect(html).toContain('alt=""');
    expect(html).not.toContain("tgi-identity-hero__placeholder");
  });

  it("renders a decorative initials placeholder instead of nothing when the portrait is absent", () => {
    const html = render(IdentityHero, {
      name: "Ibn Khaldun",
      children: createElement("h1", null, "Ibn Khaldun"),
    });
    expect(html).not.toContain("<img");
    expect(html).toContain("tgi-identity-hero__placeholder");
    expect(html).toContain("IK");
    expect(html).toContain('aria-hidden="true"');
  });

  it("gives the initials placeholder no accessible name of its own, so the adjacent heading is the only name announced", () => {
    const html = render(IdentityHero, {
      name: "Socrates",
      children: createElement("h1", null, "Socrates"),
    });
    const placeholder = html.match(/<div class="tgi-identity-hero__placeholder"[^>]*>/)?.[0];
    expect(placeholder).toBeDefined();
    expect(placeholder).not.toContain("aria-label");
    expect(placeholder).not.toContain('role="img"');
  });

  it("keeps the portrait column at the same instance-specific width whether or not a portrait exists", () => {
    const withPortrait = render(IdentityHero, {
      name: "A",
      portraitUrl: "/x.jpg",
      portraitWidth: "12rem",
      children: "A",
    });
    const without = render(IdentityHero, { name: "B", portraitWidth: "12rem", children: "B" });
    // The wrapper's actual `width` comes from the stylesheet
    // (.tgi-identity-hero__portrait { width: var(--tgi-hero-portrait-w) },
    // components.css) resolving this custom property, not a direct inline
    // `width` — see the Profile Hero polish (2026-08) note in layout.tsx for
    // why: it's what lets a page opt into a larger width at >=1280px only
    // (portraitWidthLg) without a plain inline `width` winning over any
    // stylesheet media query unconditionally.
    expect(withPortrait).toContain("--tgi-hero-portrait-w:12rem");
    expect(without).toContain("--tgi-hero-portrait-w:12rem");
  });

  it("derives Korean initials the same way for the fallback as for the portrait-present heading path", () => {
    const html = render(IdentityHero, {
      name: "이순신",
      children: createElement("h1", null, "이순신"),
    });
    expect(html).toContain("이");
    expect(html).not.toContain("<img");
  });
});

describe("PortraitCredit", () => {
  // Portrait Completion Phase 2D-1: the "not a likeness" label must appear
  // for editorial_nonlikeness ONLY. No production person carries this kind
  // yet, so these fixtures are fabricated PersonPortrait objects rather than
  // a real roster entry — see the task's own instruction not to repurpose a
  // real person's provenance just to exercise this UI path.
  const basePortrait: PersonPortrait = {
    url: "/portraits/fixture.jpg",
    source: "Test Source",
    license: "Public Domain",
    attribution: "A fixture attribution string",
  };

  it("shows the editorial-visual label, above the unchanged attribution caption, when kind is editorial_nonlikeness", () => {
    const html = render(PortraitCredit, {
      locale: "en-US",
      portrait: { ...basePortrait, kind: "editorial_nonlikeness" },
    });
    expect(html).toContain("Editorial visual");
    expect(html).toContain("Not a likeness");
    expect(html).toContain("A fixture attribution string");
    // The label must precede the attribution caption in DOM order (a
    // standalone line ABOVE it, not folded into the same clamped block).
    expect(html.indexOf("Editorial visual")).toBeLessThan(html.indexOf("A fixture attribution string"));
    // Not clamped: the label's own <p> must never carry the single-line-clamp
    // class that the attribution prose <span> (a different element) uses.
    expect(html).toContain('<p class="tgi-text tgi-portrait-credit__nonlikeness">');
  });

  it("does NOT show the label for historical_depiction", () => {
    const html = render(PortraitCredit, {
      locale: "en-US",
      portrait: { ...basePortrait, kind: "historical_depiction" },
    });
    expect(html).not.toContain("Editorial visual");
    expect(html).not.toContain("Not a likeness");
    expect(html).toContain("A fixture attribution string");
  });

  it("does NOT show the label for an unclassified (kind undefined) portrait", () => {
    const html = render(PortraitCredit, { locale: "en-US", portrait: basePortrait });
    expect(html).not.toContain("Editorial visual");
    expect(html).not.toContain("Not a likeness");
    expect(html).toContain("A fixture attribution string");
  });

  it("does NOT show the label for a likeness portrait", () => {
    const html = render(PortraitCredit, {
      locale: "en-US",
      portrait: { ...basePortrait, kind: "likeness" },
    });
    expect(html).not.toContain("Editorial visual");
    expect(html).not.toContain("Not a likeness");
  });

  it("resolves the Korean label text for editorial_nonlikeness, not the English fallback", () => {
    const html = render(PortraitCredit, {
      locale: "ko-KR",
      portrait: { ...basePortrait, kind: "editorial_nonlikeness" },
    });
    expect(html).toContain("편집용 이미지");
    expect(html).toContain("실제 초상 아님");
    expect(html).not.toContain("Editorial visual");
  });

  it("EN and KO bundles both carry a non-empty portrait.editorial_nonlikeness string", () => {
    expect(t("en-US", "portrait.editorial_nonlikeness").length).toBeGreaterThan(0);
    expect(t("ko-KR", "portrait.editorial_nonlikeness").length).toBeGreaterThan(0);
    expect(en["portrait.editorial_nonlikeness"]).toBe(t("en-US", "portrait.editorial_nonlikeness"));
  });
});

describe("trait card", () => {
  it("degrades to score and impact when no editorial copy exists", () => {
    const html = render(TraitCard, {
      label: "Perfectionism",
      score: 88,
      impact: "dual_edged",
      locale: "en-US",
    });
    expect(html).toContain("Perfectionism");
    expect(html).toContain("88");
    expect(html).toContain(en["impact.dual_edged"]);
    expect(html).not.toContain(en["label.the_edge"]);
  });

  it("shows both sides when dual-edged copy is present", () => {
    const html = render(TraitCard, {
      label: "Perfectionism",
      score: 88,
      impact: "dual_edged",
      confidence: 0.8,
      locale: "en-US",
      edge: "Exceptionally demanding standards can increase quality.",
      cost: "The same standards can slow completion.",
    });
    expect(html).toContain(en["label.the_edge"]);
    expect(html).toContain(en["label.the_cost"]);
  });

  // Profile Trait Explanation UX (2026-08) — TraitCard's `explain` prop.
  it("renders as a plain non-interactive article when `explain` is omitted (Results page, unaffected)", () => {
    const html = render(TraitCard, { label: "Curiosity", score: 91, impact: "advantage", locale: "en-US" });
    expect(html).toContain("<article");
    expect(html).not.toContain("<button");
    expect(html).not.toContain("aria-haspopup");
  });

  it("renders as a single interactive button when `explain` is provided, with no duplicate interactive nesting", () => {
    const html = render(TraitCard, {
      label: "Curiosity",
      score: 91,
      impact: "advantage",
      locale: "en-US",
      explain: { expanded: false, controls: "trait-explain-dialog", onActivate: () => {} },
    });
    expect(html).toContain("<button");
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-controls="trait-explain-dialog"');
    // No nested <button>/<a> inside the trigger — the internal score bar and
    // confidence pips stay non-interactive presentational markup.
    expect((html.match(/<button/g) ?? []).length).toBe(1);
    expect(html).not.toContain("<a ");
  });

  it("reflects `explain.expanded` in aria-expanded and does not regress the visible trait name/score", () => {
    const html = render(TraitCard, {
      label: "Curiosity",
      score: 91,
      impact: "advantage",
      confidence: 0.7,
      locale: "en-US",
      explain: { expanded: true, controls: "trait-explain-dialog", onActivate: () => {} },
    });
    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain("Curiosity");
    expect(html).toContain("91");
    // The score bar's own accessible text is untouched by the explain wrapper.
    expect(html).toContain("Curiosity 91 / 100");
  });

  it("renders a trait chip without a percent sign", () => {
    const html = render(TraitChip, { label: "Curiosity", score: 94, locale: "en-US" });
    expect(html).toContain("94");
    expect(html).not.toContain("%");
  });
});

describe("form fields", () => {
  it("labels a text field for assistive tech even without a visible label", () => {
    const html = render(TextField, {
      value: "",
      onChange: () => {},
      ariaLabel: "Search by name, field, or tag",
      placeholder: "Search",
    });
    expect(html).toContain('aria-label="Search by name, field, or tag"');
    expect(html).toContain('type="search"');
  });

  it("renders every option and marks the current value selected", () => {
    const html = render(Select, {
      value: "b",
      onChange: () => {},
      ariaLabel: "Sort",
      options: [
        { value: "a", label: "A" },
        { value: "b", label: "B" },
      ],
    });
    expect(html).toContain(">A<");
    expect(html).toContain(">B<");
    expect(html).toContain('value="b" selected');
  });
});
