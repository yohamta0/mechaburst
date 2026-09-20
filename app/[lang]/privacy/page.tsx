import type { Metadata } from "next";
import { loadContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { site, pageUrl, type Lang } from "@/lib/site";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const c = await loadContent(lang);
  return pageMeta(lang, "privacy", c.meta.privacyTitle, c.meta.privacyDescription);
}

export default async function Privacy({ params }: Props) {
  const { lang } = await params;
  const c = await loadContent(lang);
  const p = c.privacy;
  return (
    <main className="wrap doc">
      <div className="kicker">PRIVACY POLICY</div>
      <h1>{c.nav.privacy}</h1>
      <p className="doc__updated">{p.updated}</p>
      {p.intro.map((t) => (
        <p className="lead" key={t}>
          {t}
        </p>
      ))}
      {p.sections.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          {s.paragraphs.map((t) => (
            <p key={t}>{t}</p>
          ))}
          {s.bullets ? (
            <ul>
              {s.bullets.map((b) => (
                <li key={b}>{linkify(b)}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      <section>
        <h2>{p.contactTitle}</h2>
        <p>
          {p.contactBody} <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
        </p>
      </section>
      <p className="doc__foot">
        <a href={pageUrl(lang, "support")}>{c.nav.support}</a>
      </p>
    </main>
  );
}

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
