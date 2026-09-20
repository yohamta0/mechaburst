import type { Lang } from "./site";

export type Feature = { label: string; title: string; body: string; shot: string; alt: string; tags: string[] };
export type Faq = { q: string; a: string };
export type PolicySection = { title: string; paragraphs: string[]; bullets?: string[] };

export type Content = {
  meta: { title: string; description: string; supportTitle: string; supportDescription: string; privacyTitle: string; privacyDescription: string };
  nav: { home: string; support: string; privacy: string; language: string; appStore: string; comingSoon: string; menu: string };
  hero: { kicker: string; headline: string; sub: string; note: string; videoLabel: string };
  story: { label: string; lines: string[]; tail: string };
  features: Feature[];
  facts: { n: string; label: string }[];
  shots: { label: string; title: string; items: { alt: string }[] };
  principles: { label: string; title: string; items: { title: string; body: string }[] };
  cta: { title: string; body: string };
  footer: { note: string; rights: string };
  support: {
    lead: string;
    contact: { label: string; title: string; body: string; button: string; subject: string; includeTitle: string; include: string[] };
    faqLabel: string;
    faq: Faq[];
  };
  privacy: { updated: string; intro: string[]; sections: PolicySection[]; contactTitle: string; contactBody: string };
};

const files: Record<Lang, () => Promise<{ default: Content }>> = {
  ja: () => import("@/content/ja.json"),
  en: () => import("@/content/en.json"),
  de: () => import("@/content/de.json"),
  fr: () => import("@/content/fr.json"),
  "zh-Hans": () => import("@/content/zh-Hans.json"),
  "zh-Hant": () => import("@/content/zh-Hant.json"),
};

export async function loadContent(lang: Lang): Promise<Content> {
  return (await files[lang]()).default;
}
