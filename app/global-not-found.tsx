import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { en } from "@/content/en";
import { NotFoundBody } from "@/components/NotFoundBody";
import { themeScript } from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = { title: `${en.notFound.title}: Knut Barka` };

// Shown for any URL that matches no route at all, for example /xyz.
export default function GlobalNotFound() {
  return (
    <html lang="en-GB" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <header className="border-b border-line/60">
          <div className="mx-auto flex h-12 max-w-[1080px] items-center px-4 sm:px-6">
            <a href="/en" className="inline-flex min-h-11 items-center text-[15px] font-semibold tracking-tight">
              Knut Barka
            </a>
          </div>
        </header>
        <main id="main">
          <NotFoundBody title={en.notFound.title} text={en.notFound.text} back={en.notFound.back} href="/en" />
        </main>
      </body>
    </html>
  );
}
