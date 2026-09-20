import type { MetadataRoute } from "next";
import { langs, site, pageUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = ["", "support", "privacy"] as const;
  return slugs.flatMap((slug) =>
    langs.map((lang) => {
      const languages: Record<string, string> = {};
      for (const l of langs) languages[l] = site.origin + pageUrl(l, slug);
      return {
        url: site.origin + pageUrl(lang, slug),
        lastModified: site.policyUpdated,
        changeFrequency: "monthly" as const,
        priority: slug === "" ? 1 : 0.6,
        alternates: { languages },
      };
    }),
  );
}
