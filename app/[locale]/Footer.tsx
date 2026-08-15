/**
 * Minimal global footer — Broader Public Launch Finish Line, Part 5.
 * Deliberately NOT a SaaS-style multi-column footer (no "Product/Company/
 * Resources" link groups, no social icons, no newsletter signup) — this
 * project's own "Anti-AI-template" principle (CLAUDE.md) names exactly
 * that pattern as a tell to avoid. The smallest reusable legal-links
 * treatment that fits the existing editorial design: one quiet row,
 * mirroring `Header`'s own restraint (plain text, a thin top rule, no new
 * component or CSS pattern beyond what `.tgi-header` already established).
 *
 * A plain, static Server Component — no `cookies()`, no client state — so
 * adding it to the shared `[locale]` layout does not affect any page's
 * static/dynamic split, the same reasoning `Header`'s own doc comment
 * already established for itself.
 */
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="tgi-footer">
      <div className="tgi-container tgi-footer__inner">
        <span className="tgi-footer__brand">{t(locale, "site.name")}</span>
        <nav aria-label={t(locale, "footer.legal_nav_label")} className="tgi-footer__links">
          <a href={`/${locale}/privacy`}>{t(locale, "footer.privacy")}</a>
          <a href={`/${locale}/terms`}>{t(locale, "footer.terms")}</a>
        </nav>
      </div>
    </footer>
  );
}
