import type { Content } from "@/lib/content";
import { langs, site, pageUrl, type Lang } from "@/lib/site";

export function Footer({ lang, c }: { lang: Lang; c: Content }) {
  return (
    <footer className="ftr">
      <div className="wrap ftr__grid">
        <div>
          <div className="ftr__brand">MECHA BURST</div>
          <p className="ftr__note">{c.footer.note}</p>
        </div>
        <nav aria-label={c.nav.language} className="ftr__langs">
          {langs.map((l) => (
            <a key={l} href={pageUrl(l, "")} hrefLang={l} lang={l} aria-current={l === lang ? "page" : undefined}>
              {site.langName[l]}
            </a>
          ))}
        </nav>
        <nav aria-label="Site" className="ftr__links">
          <a href={pageUrl(lang, "support")}>{c.nav.support}</a>
          <a href={pageUrl(lang, "privacy")}>{c.nav.privacy}</a>
        </nav>
        <p className="ftr__copy">
          © 2026 {site.developer}. {c.footer.rights}
        </p>
      </div>
    </footer>
  );
}
