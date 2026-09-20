import type { Metadata } from "next";
import { langs, site, pageUrl } from "@/lib/site";

// Root layout for "/" only; the localized pages have their own root layout under app/[lang].
const languages: Record<string, string> = Object.fromEntries(langs.map((l) => [l, pageUrl(l, "")]));
languages["x-default"] = pageUrl("en", "");

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: site.name,
  robots: { index: false, follow: true },
  alternates: { languages },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#07111c", color: "#f0faf5", font: "16px/1.6 system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
