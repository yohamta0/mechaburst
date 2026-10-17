import type { Metadata } from "next";
import { acePageMeta, acePageUrl, loadAceContent, type AceLang } from "@/lib/ace";
import { site } from "@/lib/site";
import { linkify } from "@/components/ace/AceChrome";

type Props = { params: Promise<{ lang: AceLang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const c = await loadAceContent(lang);
  return acePageMeta(lang, "privacy", c.meta.privacyTitle, c.meta.privacyDescription);
}

export default async function AcePrivacy({ params }: Props) {
  const { lang } = await params;
  const c = await loadAceContent(lang);
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
        <a href={acePageUrl(lang, "support")}>{c.nav.support}</a>
      </p>
    </main>
  );
}
