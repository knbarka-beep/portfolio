"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales, projects, projectSlugs, type Locale } from "@/lib/site";
import type { Content } from "@/content/types";
import { ThemeToggle } from "./ThemeToggle";

type Props = { lang: Locale; labels: Content["nav"] };

export function Nav({ lang, labels }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu after navigating.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const items = [
    { href: `/${lang}`, label: labels.cv },
    ...projectSlugs.map((slug) => ({ href: `/${lang}/projects/${slug}`, label: projects[slug].name })),
  ];
  // Same page in another language: swap the first path segment.
  const inLang = (l: Locale) => pathname.replace(/^\/(en|da|no)(?=\/|$)/, `/${l}`);

  const linkClass = (href: string) =>
    `inline-flex min-h-11 items-center px-2 text-[13px] transition-colors hover:text-text ${
      pathname === href ? "text-text" : "text-muted"
    }`;

  const languageSwitch = (
    <div role="group" aria-label={labels.language} className="flex items-center">
      {locales.map((l) => (
        <Link
          key={l}
          href={inLang(l)}
          hrefLang={l === "no" ? "nb" : l}
          aria-current={l === lang ? "true" : undefined}
          className={`inline-flex h-11 min-w-9 items-center justify-center text-[12px] font-medium uppercase tracking-wide ${
            l === lang ? "text-text" : "text-muted hover:text-text"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex h-12 max-w-[1080px] items-center justify-between px-4 sm:px-6">
        <Link href={`/${lang}`} className="inline-flex min-h-11 items-center text-[15px] font-semibold tracking-tight">
          Knut Barka
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass(item.href)} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="h-4 w-px bg-line" aria-hidden="true" />
          {languageSwitch}
          <ThemeToggle labels={labels} />
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 px-1 text-[15px] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? labels.close : labels.menu}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 9h16M4 15h16" strokeLinecap="round" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line/60 bg-bg lg:hidden">
          <ul className="mx-auto max-w-[1080px] px-4 py-3 sm:px-6">
            {items.map((item) => (
              <li key={item.href} className="border-b border-line/50 last:border-0">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex min-h-12 items-center text-[22px] font-semibold tracking-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto flex max-w-[1080px] items-center justify-between px-4 pb-4 sm:px-6">
            {languageSwitch}
            <ThemeToggle labels={labels} />
          </div>
        </div>
      )}
    </header>
  );
}
