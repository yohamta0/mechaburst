import { ace, aceLangs, acePageUrl, aceStoreUrl, type AceContent, type AceLang } from "@/lib/ace";
import { site } from "@/lib/site";

export function AceHeader({ lang, c }: { lang: AceLang; c: AceContent }) {
  const store = aceStoreUrl(lang);
  return (
    <header className="hdr">
      <div className="wrap hdr__row">
        <a className="hdr__brand" href={acePageUrl(lang, "")} aria-label={c.nav.home}>
          <img src="/img/ace-survivor/icon-256.png" alt="" width={28} height={28} />
          <span>{ace.name}</span>
        </a>
        <nav className="hdr__nav" aria-label="Site">
          <a href={acePageUrl(lang, "support")}>{c.nav.support}</a>
          <a href={acePageUrl(lang, "privacy")}>{c.nav.privacy}</a>
        </nav>
        <div className="hdr__tools">
          {store ? (
            <a className="btn btn--mint btn--sm" href={store} rel="noopener">
              {c.nav.appStore}
            </a>
          ) : (
            <span className="btn btn--ghost btn--sm" aria-disabled="true">
              {c.nav.comingSoon}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export function AceFooter({ lang, c }: { lang: AceLang; c: AceContent }) {
  return (
    <footer className="ftr">
      <div className="wrap ftr__grid">
        <div>
          <div className="ftr__brand">{ace.name}</div>
          <p className="ftr__note">{c.footer.note}</p>
        </div>
        <nav aria-label={c.nav.language} className="ftr__langs">
          {aceLangs.map((l) => (
            <a key={l} href={acePageUrl(l, "")} hrefLang={l} lang={l} aria-current={l === lang ? "page" : undefined}>
              {ace.langName[l]}
            </a>
          ))}
        </nav>
        <nav aria-label="Site" className="ftr__links">
          <a href={acePageUrl(lang, "support")}>{c.nav.support}</a>
          <a href={acePageUrl(lang, "privacy")}>{c.nav.privacy}</a>
          <a href="/">MECHA BURST</a>
        </nav>
        <p className="ftr__copy">
          © 2026 {site.developer}. {c.footer.rights}
        </p>
      </div>
    </footer>
  );
}

// Turns bare https URLs inside text into links.
export function linkify(text: string) {
  const parts = text.split(/(https:\/\/[^\s)）。、]+)/g);
  return parts.map((p, i) =>
    p.startsWith("https://") ? (
      <a key={i} href={p} rel="noopener">
        {p}
      </a>
    ) : (
      p
    ),
  );
}
