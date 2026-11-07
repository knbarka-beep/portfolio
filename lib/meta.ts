import type { Metadata } from "next";
import { hreflang, locales, type Locale } from "./site";

// Canonical URL and hreflang links for one page in all three languages.
export function alternates(lang: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = { "x-default": `/en${path}` };
  for (const l of locales) languages[hreflang[l]] = `/${l}${path}`;
  return { canonical: `/${lang}${path}`, languages };
}

export const ogLocale: Record<Locale, string> = { en: "en_GB", da: "da_DK", no: "nb_NO" };

// True when the passcode download can work. Read at build time; the value itself never reaches the browser.
export const cvAvailable = () =>
  Boolean(
    process.env.CV_PASSCODE &&
      (process.env.BLOB_READ_WRITE_TOKEN || process.env.NODE_ENV === "development"),
  );
