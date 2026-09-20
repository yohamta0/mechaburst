import type { Content } from "@/lib/content";
import { site, type Lang } from "@/lib/site";
import { Phone } from "./Phone";
import { Badge } from "./Badge";

export function Hero({ lang, c }: { lang: Lang; c: Content }) {
  const v = site.video[lang];
  // Rendered as raw HTML so the `muted` attribute reaches the markup; React drops it, and autoplay needs it before hydration.
  const video = `<video autoplay muted loop playsinline preload="metadata" poster="/img/shots/${lang}/title.webp" aria-label="${c.hero.videoLabel.replace(/"/g, "&quot;")}"><source src="/media/preview-${v}.mp4" type="video/mp4"></video>`;
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__scrim" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div className="hero__text">
          <div className="kicker">{c.hero.kicker}</div>
          <img className="hero__mark" src="/img/wordmark.webp" alt="MECHA BURST" width={1100} height={1028} fetchPriority="high" />
          <h1>{c.hero.headline}</h1>
          <p className="hero__sub">{c.hero.sub}</p>
          <div className="hero__actions">
            <Badge lang={lang} c={c} />
            <a className="btn btn--ghost" href="#features">
              {c.nav.menu}
            </a>
          </div>
          <p className="hero__note">{c.hero.note}</p>
        </div>
        <div className="hero__phone">
          <Phone>
            <div dangerouslySetInnerHTML={{ __html: video }} />
          </Phone>
        </div>
      </div>
    </section>
  );
}
