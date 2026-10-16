import type { Content } from "./content";
import { site, appStoreUrl, pageUrl, type Lang } from "./site";

// The storefront currency each language's App Store link lands in.
const currency: Record<Lang, string> = { ja: "JPY", en: "USD", de: "EUR", fr: "EUR", "zh-Hans": "CNY", "zh-Hant": "TWD" };

const developer = { "@type": "Person", name: site.developer };

// gameSchema describes the game: what it is, where it runs, what it costs.
export function gameSchema(lang: Lang, c: Content) {
  const url = site.origin + pageUrl(lang, "");
  const store = appStoreUrl(lang);
  return {
    "@context": "https://schema.org",
    "@type": ["VideoGame", "MobileApplication"],
    "@id": `${url}#game`,
    name: site.name,
    url,
    description: c.meta.description,
    inLanguage: lang,
    image: site.origin + "/img/og.png",
    screenshot: c.shots.items.map((_, i) => `${site.origin}/img/store/${lang}/${String(i + 1).padStart(2, "0")}.webp`),
    genre: ["Shoot 'em up", "Action", "Mecha"],
    gamePlatform: ["iPhone", "iPad"],
    operatingSystem: "iOS",
    applicationCategory: "GameApplication",
    playMode: "SinglePlayer",
    availableLanguage: ["en", "ja", "de", "fr", "zh-Hans", "zh-Hant"],
    author: developer,
    publisher: developer,
    ...(store
      ? {
          installUrl: store,
          sameAs: [store],
          offers: { "@type": "Offer", price: "0", priceCurrency: currency[lang], availability: "https://schema.org/InStock", url: store },
        }
      : {}),
  };
}

// faqSchema mirrors the support page's questions and answers.
export function faqSchema(c: Content) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.support.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
