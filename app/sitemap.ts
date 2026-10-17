import type { MetadataRoute } from "next";
import { langs, site, pageUrl } from "@/lib/site";
import { aceLangs, acePageUrl } from "@/lib/ace";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = ["", "support", "privacy"] as const;
  const ace = slugs.flatMap((slug) =>
    aceLangs.map((lang) => {
      const languages: Record<string, string> = {};
      for (const l of aceLangs) languages[l] = site.origin + acePageUrl(l, slug);
      return {
        url: site.origin + acePageUrl(lang, slug),
        lastModified: "2026-10-17",
        changeFrequency: "monthly" as const,
        priority: slug === "" ? 0.8 : 0.5,
        alternates: { languages },
      };
    }),
  );
  return [...mechaburst(slugs), ...ace];
}

function mechaburst(slugs: readonly ("" | "support" | "privacy")[]): MetadataRoute.Sitemap {
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
