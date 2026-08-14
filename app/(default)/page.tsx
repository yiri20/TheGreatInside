import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@core/types";

/**
 * True root. Phase 6 built the real landing experience at
 * `app/[locale]/page.tsx` (quiz CTA + explorer CTA), so "/" no longer needs
 * its own stub content — it just sends visitors to the default locale.
 * Locale auto-detection (Accept-Language, geo) is Phase 8 scope; a fixed
 * redirect is the correct minimal behaviour until then.
 */
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
