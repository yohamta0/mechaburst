export const langs = ["ja", "en", "de", "fr", "zh-Hans", "zh-Hant"] as const;
export type Lang = (typeof langs)[number];

// Site-wide facts. app.storeId is empty until the App Store listing is live;
// the badge then links to the listing instead of showing "coming soon".
export const site = {
  origin: "https://mechaburst.pages.dev",
  name: "MECHA BURST",
  developer: "Yota Hamada",
  contactEmail: "yohamta@gmail.com",
  policyUpdated: "2026-09-20",
  app: { storeId: "", storeCountry: { ja: "jp", en: "us", de: "de", fr: "fr", "zh-Hans": "cn", "zh-Hant": "tw" } as Record<Lang, string> },
  video: { ja: "ja", en: "en", de: "en", fr: "en", "zh-Hans": "en", "zh-Hant": "en" } as Record<Lang, "ja" | "en">,
  ogLocale: { ja: "ja_JP", en: "en_US", de: "de_DE", fr: "fr_FR", "zh-Hans": "zh_CN", "zh-Hant": "zh_TW" } as Record<Lang, string>,
  langName: { ja: "日本語", en: "English", de: "Deutsch", fr: "Français", "zh-Hans": "简体中文", "zh-Hant": "繁體中文" } as Record<Lang, string>,
};

export function isLang(s: string): s is Lang {
  return (langs as readonly string[]).includes(s);
}

export function appStoreUrl(lang: Lang): string | null {
  if (!site.app.storeId) return null;
  return `https://apps.apple.com/${site.app.storeCountry[lang]}/app/id${site.app.storeId}`;
}

export function pageUrl(lang: Lang, slug: "" | "support" | "privacy"): string {
  return `/${lang}/${slug ? `${slug}/` : ""}`;
}
