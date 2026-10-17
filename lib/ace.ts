import type { Metadata } from "next";
import type { Faq, PolicySection } from "./content";
import { site } from "./site";

// ACE SURVIVOR, the MECHA BURST spin-off, lives under /ace-survivor/<lang>/
// in its own two languages. Its badge links to the App Store once released.
export const aceLangs = ["en", "ja"] as const;
export type AceLang = (typeof aceLangs)[number];

export const ace = {
  name: "ACE SURVIVOR",
  app: { released: false, storeId: "6823578453", storeCountry: { en: "us", ja: "jp" } as Record<AceLang, string> },
  ogLocale: { en: "en_US", ja: "ja_JP" } as Record<AceLang, string>,
  langName: { en: "English", ja: "日本語" } as Record<AceLang, string>,
};

export type AceSlug = "" | "support" | "privacy";

export function isAceLang(s: string): s is AceLang {
  return (aceLangs as readonly string[]).includes(s);
}

export function acePageUrl(lang: AceLang, slug: AceSlug): string {
  return `/ace-survivor/${lang}/${slug ? `${slug}/` : ""}`;
}

export function aceStoreUrl(lang: AceLang): string | null {
  if (!ace.app.released) return null;
  return `https://apps.apple.com/${ace.app.storeCountry[lang]}/app/id${ace.app.storeId}`;
}

// Canonical + hreflang + Open Graph for one ACE SURVIVOR page in one language.
export function acePageMeta(lang: AceLang, slug: AceSlug, title: string, description: string): Metadata {
  const languages: Record<string, string> = {};
  for (const l of aceLangs) languages[l] = acePageUrl(l, slug);
  languages["x-default"] = acePageUrl("en", slug);
  const image = { url: "/img/ace-survivor/icon-256.png", width: 256, height: 256, alt: ace.name };
  return {
    metadataBase: new URL(site.origin),
    title,
    description,
    alternates: { canonical: acePageUrl(lang, slug), languages },
    openGraph: { title, description, url: acePageUrl(lang, slug), siteName: ace.name, locale: ace.ogLocale[lang], type: "website", images: [image] },
    twitter: { card: "summary", title, description, images: [image.url] },
  };
}

export type AceContent = {
  meta: { title: string; description: string; supportTitle: string; supportDescription: string; privacyTitle: string; privacyDescription: string };
  nav: { home: string; support: string; privacy: string; language: string; appStore: string; comingSoon: string };
  home: { kicker: string; headline: string; sub: string; facts: { n: string; label: string }[] };
  footer: { note: string; rights: string };
  support: {
    lead: string;
    contact: { label: string; title: string; body: string; button: string; subject: string; includeTitle: string; include: string[] };
    faqLabel: string;
    faq: Faq[];
  };
  privacy: { updated: string; intro: string[]; sections: PolicySection[]; contactTitle: string; contactBody: string };
};

const files: Record<AceLang, () => Promise<{ default: AceContent }>> = {
  en: () => import("@/content/ace-survivor/en.json"),
  ja: () => import("@/content/ace-survivor/ja.json"),
};

export async function loadAceContent(lang: AceLang): Promise<AceContent> {
  return (await files[lang]()).default;
}
