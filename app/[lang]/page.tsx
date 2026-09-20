import type { Metadata } from "next";
import { loadContent } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { site, type Lang } from "@/lib/site";
import { Hero } from "@/components/Hero";
import { Phone } from "@/components/Phone";
import { Badge } from "@/components/Badge";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const c = await loadContent(lang);
  return pageMeta(lang, "", c.meta.title, c.meta.description);
}

export default async function Landing({ params }: Props) {
  const { lang } = await params;
  const c = await loadContent(lang);
  return (
    <main>
      <Hero lang={lang} c={c} />

      <section className="story" aria-label={c.story.label}>
        <div className="wrap story__grid">
          <div className="kicker">{c.story.label}</div>
          {c.story.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="story__tail">{c.story.tail}</p>
        </div>
      </section>

      <section className="wrap" id="features">
        {c.features.map((f) => (
          <article className="feature" key={f.label}>
            <div className="feature__text">
              <div className="kicker">{f.label}</div>
              <h2>{f.title}</h2>
              <p>{f.body}</p>
              <ul className="tags">
                {f.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="feature__shot">
              <Phone>
                <img src={`/img/shots/${lang}/${f.shot}.webp`} alt={f.alt} width={640} height={1386} loading="lazy" decoding="async" />
              </Phone>
            </div>
          </article>
        ))}
      </section>

      <section className="wrap">
        <ul className="facts">
          {c.facts.map((f) => (
            <li className="fact" key={f.label}>
              <span className="fact__n">{f.n}</span>
              <span className="fact__l">{f.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="sec wrap" id="screenshots">
        <div className="kicker">{c.shots.label}</div>
        <h2 className="sec__title">{c.shots.title}</h2>
        <div className="rail" role="list">
          {c.shots.items.map((s, i) => (
            <img
              key={s.alt}
              role="listitem"
              src={`/img/store/${lang}/${String(i + 1).padStart(2, "0")}.webp`}
              alt={s.alt}
              width={720}
              height={1560}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </section>

      <section className="sec wrap" id="principles">
        <div className="kicker">{c.principles.label}</div>
        <h2 className="sec__title">{c.principles.title}</h2>
        <div className="grid3">
          {c.principles.items.map((p) => (
            <div className="cell" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="wrap cta__inner">
          <h2>{c.cta.title}</h2>
          <p>{c.cta.body}</p>
          <Badge lang={lang} c={c} />
          <p className="hero__note">{c.hero.note}</p>
        </div>
      </section>
      {site.app.storeId ? null : <span hidden data-app-store="pending" />}
    </main>
  );
}
