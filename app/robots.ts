import type { MetadataRoute } from "next";
import { buildRobotsConfig } from "@lib/robotsConfig";

/** Thin Next.js convention-file wrapper — see `src/lib/robotsConfig.ts` for
 *  the actual logic and its Vitest coverage. */
export default function robots(): MetadataRoute.Robots {
  return buildRobotsConfig();
}
