import type { Metadata } from "next";
import { loadContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { site, pageUrl, type Lang } from "@/lib/site";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const c = await loadContent(lang);
  return pageMeta(lang, "support", c.meta.supportTitle, c.meta.supportDescription);
}

export default async function Support({ params }: Props) {
  const { lang } = await params;
  const c = await loadContent(lang);
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
        <a href={pageUrl(lang, "privacy")}>{c.nav.privacy}</a>
      </p>
    </main>
  );
}

// Turns bare https URLs inside answer text into links.
function linkify(text: string) {
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
