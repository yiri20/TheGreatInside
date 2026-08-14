import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "@lib/sitemapEntries";

/** Thin Next.js convention-file wrapper — see `src/lib/sitemapEntries.ts`
 *  for the actual logic and its Vitest coverage. */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
