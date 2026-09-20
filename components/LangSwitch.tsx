"use client";

import { usePathname } from "next/navigation";
import { langs, site, type Lang } from "@/lib/site";

// Swaps the language prefix of the current path; the rest of the URL is shared by every language.
export function LangSwitch({ lang, label }: { lang: Lang; label: string }) {
  const pathname = usePathname() || `/${lang}/`;
  const rest = pathname.replace(/^\/[^/]+/, "");
  return (
    <details className="lang">
      <summary aria-label={label}>{site.langName[lang]}</summary>
      <ul>
        {langs.map((l) => (
          <li key={l}>
            <a href={`/${l}${rest || "/"}`} hrefLang={l} lang={l} aria-current={l === lang ? "page" : undefined}>
              {site.langName[l]}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
