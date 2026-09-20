import { langs, site, pageUrl, type Lang } from "@/lib/site";

type Slug = "" | "support" | "privacy";

// The pages all live under a language prefix. An unprefixed URL, typed or
// linked without one, lands here and is sent to the visitor's language the
// same way the game picks it. Rendered as raw markup so it runs before React.
export function LanguageRedirect({ slug }: { slug: Slug }) {
  const tail = slug ? `${slug}/` : "";
  const script = `(function () {
  var supported = ${JSON.stringify(langs)};
  var pick = "en";
  var prefs = (navigator.languages || []).concat([navigator.language]);
  for (var i = 0; i < prefs.length; i++) {
    if (!prefs[i]) continue;
    var parts = prefs[i].toLowerCase().split("-");
    if (parts[0] === "zh") {
      var hant = parts.some(function (p) { return ["hant", "tw", "hk", "mo"].indexOf(p) >= 0; });
      pick = parts.indexOf("hans") >= 0 ? "zh-Hans" : hant ? "zh-Hant" : "zh-Hans";
      break;
    }
    if (supported.indexOf(parts[0]) >= 0) { pick = parts[0]; break; }
  }
  location.replace("/" + pick + "/${tail}" + location.search + location.hash);
})();`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${pageUrl("en", slug)}`} />
        <p>
          {langs.map((l, i) => (
            <span key={l}>
              {i > 0 ? " · " : ""}
              <a href={pageUrl(l, slug)} hrefLang={l} lang={l} style={{ color: "#94fabd" }}>
                {site.langName[l]}
              </a>
            </span>
          ))}
        </p>
      </noscript>
    </>
  );
}

// Canonical + hreflang for an unprefixed entry point: it is not itself a page,
// so it points at the language versions and stays out of the index.
export function redirectMeta(slug: Slug) {
  const languages: Record<string, string> = {};
  for (const l of langs) languages[l] = pageUrl(l, slug);
  languages["x-default"] = pageUrl("en", slug);
  return {
    metadataBase: new URL(site.origin),
    title: site.name,
    robots: { index: false, follow: true },
    alternates: { languages },
  } satisfies import("next").Metadata;
}

export type { Lang };
