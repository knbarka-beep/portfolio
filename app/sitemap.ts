import type { MetadataRoute } from "next";
import { hreflang, locales, projectSlugs, siteUrl } from "@/lib/site";

// Every public page in every language, each with links to its translations.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projectSlugs.map((slug) => `/projects/${slug}`), "/privacy"];
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [hreflang[l], `${siteUrl}/${l}${path}`])),
      },
    })),
  );
}
