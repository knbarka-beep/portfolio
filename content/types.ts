// One shape for all three languages. If da.ts or no.ts misses a field, the type check fails.

export type TimelineItem = {
  place: string;
  title: string;
  dates: string;
  points: string[];
};

export type ProjectContent = {
  oneLiner: string;
  forWhom: string;
  cardFinding: string;
  problem: string;
  shows: string[];
  findings: string[];
  ai: string[];
  limits: string[];
  stack: string;
  dataNote: string;
};

export type Content = {
  meta: { title: string; description: string; projectTitleSuffix: string };
  nav: { cv: string; menu: string; close: string; language: string; themeLight: string; themeDark: string; skip: string };
  hero: { tagline: string; location: string; seeProjects: string; fullCv: string; linkedin: string };
  projectStrip: { heading: string; forWhom: string };
  profile: { heading: string; text: string[] };
  education: { heading: string; items: TimelineItem[] };
  experience: { heading: string; items: TimelineItem[] };
  skills: { heading: string; rows: { label: string; value: string }[] };
  languages: { heading: string; rows: { label: string; value: string }[] };
  other: { heading: string; items: { name: string; text: string }[] };
  contact: { heading: string; text: string; onRequest: string };
  cvDialog: {
    title: string;
    intro: string;
    label: string;
    submit: string;
    checking: string;
    wrong: string;
    done: string;
    error: string;
    unavailable: string;
    close: string;
  };
  project: {
    openLive: string;
    viewCode: string;
    caseSheet: string;
    forWhom: string;
    englishNote: string;
    problem: string;
    shows: string;
    findings: string;
    ai: string;
    limits: string;
    built: string;
    builtWith: string;
    previous: string;
    next: string;
    screenshotAlt: string;
  };
  projects: Record<"variance-cockpit" | "startup-runway" | "aml-queue", ProjectContent>;
  footer: { built: string; code: string };
  notFound: { title: string; text: string; back: string };
};
