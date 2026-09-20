import type { Metadata } from "next";
import { M_PLUS_1p } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { langs, isLang, site } from "@/lib/site";
import { loadContent } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionGuard } from "@/components/MotionGuard";

const mplus = M_PLUS_1p({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mplus",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport = { themeColor: "#07111c" };

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = await loadContent(lang);
  return (
    <html lang={lang} className={mplus.variable}>
      <body>
        <Header lang={lang} c={c} />
        {children}
        <Footer lang={lang} c={c} />
        <MotionGuard />
      </body>
    </html>
  );
}
