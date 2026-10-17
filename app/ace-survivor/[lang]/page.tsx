import type { Metadata } from "next";
import { acePageMeta, acePageUrl, aceStoreUrl, loadAceContent, type AceLang } from "@/lib/ace";

type Props = { params: Promise<{ lang: AceLang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const c = await loadAceContent(lang);
  return acePageMeta(lang, "", c.meta.title, c.meta.description);
}

export default async function AceHome({ params }: Props) {
  const { lang } = await params;
  const c = await loadAceContent(lang);
  const store = aceStoreUrl(lang);
  return (
    <main className="wrap doc">
      <div className="kicker">{c.home.kicker}</div>
      <h1>{c.home.headline}</h1>
      <p className="lead">{c.home.sub}</p>
      <p>
        {store ? (
          <a className="btn btn--mint" href={store} rel="noopener">
            {c.nav.appStore}
          </a>
        ) : (
          <span className="btn btn--ghost" aria-disabled="true">
            {c.nav.comingSoon}
          </span>
        )}
      </p>
      <ul className="facts">
        {c.home.facts.map((f) => (
          <li className="fact" key={f.label}>
            <span className="fact__n">{f.n}</span>
            <span className="fact__l">{f.label}</span>
          </li>
        ))}
      </ul>
      <p className="doc__foot">
        <a href={acePageUrl(lang, "support")}>{c.nav.support}</a> · <a href={acePageUrl(lang, "privacy")}>{c.nav.privacy}</a>
      </p>
    </main>
  );
}
