import { Noto_Serif_KR } from "next/font/google";

/**
 * Shared between the two parallel root layouts this project needs
 * (`app/(default)/layout.tsx` for routes outside `/[locale]/*`, and
 * `app/[locale]/layout.tsx` itself, once it renders `<html>`/`<body>` so
 * `lang` can vary per locale — see the `<html lang>` investigation in
 * CLAUDE.md/the Stage A checkpoint for why two root layouts exist at all).
 * `next/font/google` calls are a build-time optimization keyed by the font
 * config, not a runtime "load twice" cost — importing the SAME call from
 * two files is the documented way to share one font across multiple root
 * layouts, not a duplication.
 */
export const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-noto-serif-kr",
  display: "swap",
});
