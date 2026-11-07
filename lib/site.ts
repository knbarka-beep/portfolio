// Fixed facts about the site: languages, links, project accents and screenshots.
// Text lives in content/*.ts; this file holds only what is the same in every language.

export const locales = ["en", "da", "no"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// The html lang attribute and hreflang code. Norwegian bokmål is "nb"; the URL stays /no.
export const htmlLang: Record<Locale, string> = { en: "en-GB", da: "da", no: "nb" };
export const hreflang: Record<Locale, string> = { en: "en", da: "da", no: "nb" };

// The live address, used for metadataBase, og:url, the sitemap and robots.txt. SITE_URL overrides it.
export const siteUrl = process.env.SITE_URL ?? "https://knutbarka.vercel.app";

export const links = {
  linkedin: "https://www.linkedin.com/in/knutbarka",
  repo: "https://github.com/knbarka-beep/portfolio",
};

export const projectSlugs = ["variance-cockpit", "startup-runway", "aml-queue"] as const;
export type ProjectSlug = (typeof projectSlugs)[number];

export const isProjectSlug = (value: string): value is ProjectSlug =>
  (projectSlugs as readonly string[]).includes(value);

type ProjectMeta = {
  name: string;
  live: string;
  repo: string;
  caseSheet: string;
  // Accent colours copied from each repo's web/styles/tokens.css (--accent, --on-accent).
  accent: { light: string; dark: string; onLight: string; onDark: string };
};

const gh = "https://github.com/knbarka-beep";

export const projects: Record<ProjectSlug, ProjectMeta> = {
  "variance-cockpit": {
    name: "Variance cockpit",
    live: "https://variance-cockpit.vercel.app",
    repo: `${gh}/variance-cockpit`,
    caseSheet: `${gh}/variance-cockpit/blob/main/docs/case-sheet.md`,
    accent: { light: "#1f5f6b", dark: "#6fb0bb", onLight: "#ffffff", onDark: "#141412" },
  },
  "startup-runway": {
    name: "Startup runway",
    live: "https://nordlys-runway.vercel.app",
    repo: `${gh}/startup-runway`,
    caseSheet: `${gh}/startup-runway/blob/main/docs/case-sheet.md`,
    accent: { light: "#2a5788", dark: "#7fa6d6", onLight: "#ffffff", onDark: "#141412" },
  },
  "aml-queue": {
    name: "AML queue",
    live: "https://lysbro-aml.vercel.app",
    repo: `${gh}/aml-queue`,
    caseSheet: `${gh}/aml-queue/blob/main/docs/case-sheet.md`,
    accent: { light: "#5e6b2a", dark: "#a9b86a", onLight: "#ffffff", onDark: "#141412" },
  },
};

// Screenshots are cropped to 1440 x 900 from each repo's docs/screenshots/ (see docs/decisions.md).
export const screenshot = (slug: ProjectSlug, theme: "light" | "dark") => `/projects/${slug}-${theme}.png`;
export const screenshotSize = { width: 1440, height: 900 };
