import type { Content } from "@/lib/content";
import { appStoreUrl, type Lang } from "@/lib/site";

// Apple's official localized badge. Without a store id yet, it is shown unlinked with a "coming soon" tag.
export function Badge({ lang, c }: { lang: Lang; c: Content }) {
  const url = appStoreUrl(lang);
  const img = <img src={`/img/badge/${lang}.svg`} alt={c.nav.appStore} height={54} width={162} />;
  if (url) {
    return (
      <a className="badge" href={url} rel="noopener">
        {img}
      </a>
    );
  }
  return (
    <span className="badge badge--soon">
      {img}
      <span className="badge__soon">{c.nav.comingSoon}</span>
    </span>
  );
}
