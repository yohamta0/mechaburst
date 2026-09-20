import type { Metadata } from "next";
import { langs, site, pageUrl, type Lang } from "./site";

type Slug = "" | "support" | "privacy";

// Canonical + hreflang + Open Graph for one page in one language.
export function pageMeta(lang: Lang, slug: Slug, title: string, description: string): Metadata {
  const languages: Record<string, string> = {};
  for (const l of langs) languages[l] = pageUrl(l, slug);
  languages["x-default"] = pageUrl("en", slug);
  return {
    title,
    description,
    alternates: { canonical: pageUrl(lang, slug), languages },
    openGraph: {
      title,
      description,
      url: pageUrl(lang, slug),
      siteName: site.name,
      locale: site.ogLocale[lang],
      type: "website",
      images: [{ url: "/img/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/img/og.png"] },
  };
}
