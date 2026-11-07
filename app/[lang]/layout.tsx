import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getContent } from "@/content";
import { Nav } from "@/components/Nav";
import { RevealObserver } from "@/components/Reveal";
import { ThemeSync, themeScript } from "@/components/ThemeToggle";
import { htmlLang, isLocale, links, locales, siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getContent(lang);

  return (
    <html lang={htmlLang[lang]} className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeSync />
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-btn px-4 py-2 text-on-btn focus:not-sr-only focus:fixed focus:left-4 focus:top-2"
        >
          {t.nav.skip}
        </a>
        <Nav lang={lang} labels={t.nav} />
        <main id="main">{children}</main>
        <footer className="border-t border-line bg-bg-alt">
          <div className="mx-auto flex max-w-[1080px] flex-col gap-1 px-4 py-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>{t.footer.built}</p>
            <div className="flex gap-5">
              <a href={links.repo} className="inline-flex min-h-11 items-center hover:text-text hover:underline" rel="noopener">
                {t.footer.code}
              </a>
              <a href={links.linkedin} className="inline-flex min-h-11 items-center hover:text-text hover:underline" rel="noopener">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
        <RevealObserver />
      </body>
    </html>
  );
}
