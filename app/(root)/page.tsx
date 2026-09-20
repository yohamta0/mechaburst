import { langs, site, pageUrl } from "@/lib/site";

// Picks the visitor's language the same way the game does, then lands on /<lang>/.
const redirect = `(function () {
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
  location.replace("/" + pick + "/" + location.search + location.hash);
})();`;

export default function Root() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${pageUrl("en", "")}`} />
        <p>
          {langs.map((l, i) => (
            <span key={l}>
              {i > 0 ? " · " : ""}
              <a href={pageUrl(l, "")} hrefLang={l} lang={l} style={{ color: "#94fabd" }}>
                {site.langName[l]}
              </a>
            </span>
          ))}
        </p>
      </noscript>
    </>
  );
}
