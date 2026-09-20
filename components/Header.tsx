import type { Content } from "@/lib/content";
import { pageUrl, appStoreUrl, type Lang } from "@/lib/site";
import { LangSwitch } from "./LangSwitch";

export function Header({ lang, c }: { lang: Lang; c: Content }) {
  const store = appStoreUrl(lang);
  return (
    <header className="hdr">
      <div className="wrap hdr__row">
        <a className="hdr__brand" href={pageUrl(lang, "")} aria-label={c.nav.home}>
          <img src="/img/icon-256.webp" alt="" width={28} height={28} />
          <span>MECHA BURST</span>
        </a>
        <nav className="hdr__nav" aria-label="Site">
          <a href={pageUrl(lang, "support")}>{c.nav.support}</a>
          <a href={pageUrl(lang, "privacy")}>{c.nav.privacy}</a>
        </nav>
        <div className="hdr__tools">
          <LangSwitch lang={lang} label={c.nav.language} />
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
