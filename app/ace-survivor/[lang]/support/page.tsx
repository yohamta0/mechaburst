import type { Metadata } from "next";
import { acePageMeta, acePageUrl, loadAceContent, type AceLang } from "@/lib/ace";
import { site } from "@/lib/site";
import { linkify } from "@/components/ace/AceChrome";

type Props = { params: Promise<{ lang: AceLang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const c = await loadAceContent(lang);
  return acePageMeta(lang, "support", c.meta.supportTitle, c.meta.supportDescription);
}

export default async function AceSupport({ params }: Props) {
  const { lang } = await params;
  const c = await loadAceContent(lang);
  const s = c.support;
  const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(s.contact.subject)}`;
  return (
    <main className="wrap doc">
      <div className="kicker">SUPPORT</div>
      <h1>{c.nav.support}</h1>
      <p className="lead">{s.lead}</p>

      <section className="card" id="contact">
        <div className="kicker">{s.contact.label}</div>
        <h2>{s.contact.title}</h2>
        <p>{s.contact.body}</p>
        <p>
          <a className="btn btn--mint" href={mailto}>
            {s.contact.button}
          </a>
          <span className="card__mail">{site.contactEmail}</span>
        </p>
        <h3>{s.contact.includeTitle}</h3>
        <ul>
          {s.contact.include.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </section>

      <section id="faq">
        <div className="kicker">{s.faqLabel}</div>
        <div className="faq">
          {s.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{linkify(f.a)}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="doc__foot">
        <a href={acePageUrl(lang, "privacy")}>{c.nav.privacy}</a>
      </p>
    </main>
  );
}
