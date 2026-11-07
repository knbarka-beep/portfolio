import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/content";
import { ExternalLink } from "@/components/ExternalLink";
import { Shot } from "@/components/Shot";
import { alternates, ogLocale } from "@/lib/meta";
import { isLocale, isProjectSlug, projects, projectSlugs, type Locale, type ProjectSlug } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => projectSlugs.map((slug) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const t = getContent(lang as Locale);
  const p = t.projects[slug as ProjectSlug];
  const title = `${projects[slug as ProjectSlug].name}: ${t.meta.projectTitleSuffix}`;
  return {
    title,
    description: p.oneLiner,
    alternates: alternates(lang as Locale, `/projects/${slug}`),
    openGraph: {
      title,
      description: p.oneLiner,
      url: `/${lang}/projects/${slug}`,
      type: "article",
      locale: ogLocale[lang as Locale],
    },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-reveal className="grid gap-4 border-t border-line py-12 md:grid-cols-[240px_1fr] md:gap-12 md:py-16">
      <h2 className="text-[24px] font-semibold md:text-[28px]">{title}</h2>
      <div className="max-w-[680px]">{children}</div>
    </section>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={item} className="relative pl-5">
        <span className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        {item}
      </li>
    ))}
  </ul>
);

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !isProjectSlug(slug)) notFound();

  const t = getContent(lang);
  const p = t.projects[slug];
  const meta = projects[slug];
  const index = projectSlugs.indexOf(slug);
  const prev = projectSlugs[(index + projectSlugs.length - 1) % projectSlugs.length];
  const next = projectSlugs[(index + 1) % projectSlugs.length];

  const accentVars = {
    "--accent-light": meta.accent.light,
    "--accent-dark": meta.accent.dark,
    "--on-accent-light": meta.accent.onLight,
    "--on-accent-dark": meta.accent.onDark,
  } as React.CSSProperties;

  return (
    <article className="accent-scope" style={accentVars}>
      <header className="mx-auto max-w-[1080px] px-4 pt-16 sm:px-6 md:pt-24">
        <p data-reveal className="text-[14px] font-medium uppercase tracking-wider text-accent">
          {t.projectStrip.heading}
        </p>
        <h1 data-reveal className="mt-3 text-[44px] font-semibold sm:text-[64px]">
          {meta.name}
        </h1>
        <p data-reveal className="mt-4 max-w-[760px] text-[21px] leading-snug sm:text-[24px]">
          {p.oneLiner}
        </p>
        <p data-reveal className="mt-4 text-muted">
          {t.project.forWhom}: {p.forWhom}
        </p>
        <p data-reveal className="mt-5 inline-block rounded-full bg-bg-alt px-4 py-1.5 text-[14px] text-muted">
          {p.dataNote}
          {t.project.englishNote && ` ${t.project.englishNote}`}
        </p>
        <div data-reveal className="mt-8 flex flex-wrap items-center gap-3">
          <ExternalLink href={meta.live} newTabLabel={t.nav.newTab} className="pill pill-accent">
            {t.project.openLive}
          </ExternalLink>
          <ExternalLink href={meta.repo} newTabLabel={t.nav.newTab} className="pill pill-outline">
            {t.project.viewCode}
          </ExternalLink>
          <ExternalLink href={meta.caseSheet} newTabLabel={t.nav.newTab} className="chevron-link is-external ml-1">
            {t.project.caseSheet}
          </ExternalLink>
        </div>
      </header>

      <div data-reveal className="mx-auto mt-12 max-w-[1180px] px-4 sm:px-6 md:mt-16">
        <Shot slug={slug} alt={`${t.project.screenshotAlt}: ${meta.name}`} priority sizes="(min-width: 1180px) 1132px, 94vw" />
      </div>

      <div className="mx-auto mt-16 max-w-[1080px] px-4 sm:px-6 md:mt-24">
        <Block title={t.project.problem}>
          <p className="text-[19px] leading-relaxed">{p.problem}</p>
        </Block>
        <Block title={t.project.shows}>
          <List items={p.shows} />
        </Block>
        <Block title={t.project.findings}>
          <ol className="space-y-4">
            {p.findings.map((finding) => (
              <li key={finding} className="rounded-2xl bg-bg-alt p-5 text-[19px] leading-snug">
                {finding}
              </li>
            ))}
          </ol>
        </Block>
        <Block title={t.project.ai}>
          <div className="space-y-4">
            {p.ai.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Block>
        <Block title={t.project.limits}>
          <List items={p.limits} />
        </Block>
        <Block title={t.project.built}>
          <p>{p.stack}</p>
          <p className="mt-2 text-muted">{t.project.builtWith}</p>
        </Block>
      </div>

      <nav aria-label={`${t.project.previous} / ${t.project.next}`} className="mt-8 border-t border-line bg-bg-alt">
        <div className="mx-auto grid max-w-[1080px] grid-cols-2 gap-4 px-4 py-10 sm:px-6">
          <Link href={`/${lang}/projects/${prev}`} className="group flex min-h-11 flex-col">
            <span className="text-[14px] text-muted">{t.project.previous}</span>
            <span className="text-[21px] font-semibold group-hover:underline">{projects[prev].name}</span>
          </Link>
          <Link href={`/${lang}/projects/${next}`} className="group flex min-h-11 flex-col items-end text-right">
            <span className="text-[14px] text-muted">{t.project.next}</span>
            <span className="text-[21px] font-semibold group-hover:underline">{projects[next].name}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
