/**
 * Layout, typography and control primitives.
 *
 * These are presentational only — no state, no data fetching, no core imports
 * beyond types. Everything visual comes from tokens.css via class names.
 */
import type { ReactNode } from "react";
import { cx } from "../lib/display.js";

type Space = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/* ---------------------------------------------------------------- layout */

export function Stack({
  gap = 4,
  as: Tag = "div",
  className,
  children,
}: {
  gap?: Space;
  as?: "div" | "section" | "article" | "li" | "ul";
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cx("tgi-stack", `tgi-stack--${gap}`, className)}>{children}</Tag>;
}

export function Cluster({
  gap = 2,
  between = false,
  className,
  children,
}: {
  gap?: Space;
  between?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("tgi-cluster", `tgi-cluster--${gap}`, between && "tgi-cluster--between", className)}>
      {children}
    </div>
  );
}

export function Grid({
  min = "16rem",
  className,
  children,
}: {
  /** Minimum column width before the grid reflows. */
  min?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("tgi-grid", className)} style={{ ["--tgi-grid-min" as string]: min }}>
      {children}
    </div>
  );
}

export function Divider() {
  return <hr className="tgi-divider" />;
}

/* ------------------------------------------------------------ typography */

export function Display({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cx("tgi-display", className)}>{children}</h1>;
}

export function Heading({
  level = 2,
  visualLevel,
  children,
  className,
  id,
}: {
  level?: 1 | 2 | 3;
  /**
   * Decouples the rendered tag (document outline, `level`) from the
   * `tgi-heading--N` size class. Beta finish-line heading-hierarchy fix
   * (see CLAUDE.md "Public Beta Finish Line"): lets a section render at
   * the correct outline depth without a visual size change, when the two
   * would otherwise conflict. Defaults to `level`, so every pre-existing
   * call site is unaffected.
   */
  visualLevel?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  /** For `aria-labelledby` (e.g. a dialog naming itself by its own heading) — optional, every pre-existing call site is unaffected. */
  id?: string;
}) {
  const Tag = (["h1", "h2", "h3"] as const)[level - 1] ?? "h2";
  return (
    <Tag id={id} className={cx("tgi-heading", `tgi-heading--${visualLevel ?? level}`, className)}>
      {children}
    </Tag>
  );
}

/** Small uppercase label above a section. Decorative only — never the heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx("tgi-eyebrow", className)}>{children}</p>;
}

export function Text({
  tone = "default",
  children,
  className,
}: {
  tone?: "default" | "secondary" | "muted";
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cx("tgi-text", tone !== "default" && `tgi-text--${tone}`, className)}>{children}</p>
  );
}

/** Wraps numerals so scores use tabular figures and stop jittering. */
export function Numeric({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx("tgi-numeric", className)}>{children}</span>;
}

export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="tgi-visually-hidden">{children}</span>;
}

/* --------------------------------------------------------------- controls */

export function Button({
  variant = "primary",
  size = "md",
  block = false,
  type = "button",
  disabled,
  href,
  onClick,
  children,
  className,
}: {
  variant?: "primary" | "secondary" | "quiet";
  size?: "md" | "lg";
  block?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Renders an anchor instead of a button. Navigation is not an action. */
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  const classes = cx(
    "tgi-button",
    `tgi-button--${variant}`,
    size === "lg" && "tgi-button--lg",
    block && "tgi-button--block",
    className,
  );
  if (href !== undefined) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export function TextField({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <input
      className={cx("tgi-field", className)}
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  );
}

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

export function Select<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: ReadonlyArray<SelectOption<T>>;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <select
      className={cx("tgi-field", className)}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      aria-label={ariaLabel}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Card({
  variant = "default",
  interactive = false,
  as: Tag = "div",
  className,
  children,
}: {
  variant?: "default" | "flush" | "sunken" | "feature";
  interactive?: boolean;
  as?: "div" | "article" | "section" | "li";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cx(
        "tgi-card",
        variant !== "default" && `tgi-card--${variant}`,
        interactive && "tgi-card--interactive",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
