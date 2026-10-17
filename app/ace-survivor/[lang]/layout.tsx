import { M_PLUS_1p } from "next/font/google";
import { notFound } from "next/navigation";
import "../../globals.css";
import { aceLangs, isAceLang, loadAceContent } from "@/lib/ace";
import { AceHeader, AceFooter } from "@/components/ace/AceChrome";

const mplus = M_PLUS_1p({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mplus",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return aceLangs.map((lang) => ({ lang }));
}

export const viewport = { themeColor: "#07111c" };

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export default async function AceLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isAceLang(lang)) notFound();
  const c = await loadAceContent(lang);
  return (
    <html lang={lang} className={mplus.variable}>
      <body>
        <AceHeader lang={lang} c={c} />
        {children}
        <AceFooter lang={lang} c={c} />
      </body>
    </html>
  );
}
