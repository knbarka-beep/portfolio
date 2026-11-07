import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/content";
import type { TimelineItem } from "@/content/types";
import { CvButton } from "@/components/CvButton";
import { ExternalLink } from "@/components/ExternalLink";
import { HeroShots } from "@/components/HeroShots";
import { Shot } from "@/components/Shot";
import { alternates, cvAvailable, ogLocale } from "@/lib/meta";
import { isLocale, links, projects, projectSlugs, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const t = getContent(lang as Locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternates(lang as Locale),
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}`,
      type: "profile",
      locale: ogLocale[lang as Locale],
    },
  };
}

function Section({
  id,
  title,
  alt = false,
  children,
}: {
  id: string;
  title: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={alt ? "bg-bg-alt" : "bg-bg"}>
      <div data-reveal className="mx-auto grid max-w-[1080px] gap-6 px-4 py-16 sm:px-6 md:grid-cols-[200px_1fr] md:gap-12 md:py-24">
        <h2 id={`${id}-title`} className="text-[28px] font-semibold md:text-[32px]">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l border-line">
      {items.map((item) => (
        <li key={item.place + item.dates} className="relative pb-10 pl-6 last:pb-0">
          <span className="absolute -left-[5px] top-[9px] h-[9px] w-[9px] rounded-full bg-text" aria-hidden="true" />
          <p className="text-[14px] text-muted tabular-nums">{item.dates}</p>
          <h3 className="mt-1 text-[21px] font-semibold leading-snug">{item.title}</h3>
          <p className="mt-0.5 text-muted">{item.place}</p>
          {item.points.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

function Rows({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[170px_1fr] sm:gap-6">
          <dt className="font-semibold">{row.label}</dt>
          <dd className="text-text">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function CvPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = getContent(lang);
  const available = cvAvailable();

  return (
    <>
      {/* Hero */}
      <section className="bg-bg">
        <div className="mx-auto grid max-w-[1080px] items-center gap-12 px-4 pb-16 pt-16 sm:px-6 md:pb-24 md:pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-12">
          <div>
            <h1 data-reveal className="text-[52px] font-semibold sm:text-[72px] lg:text-[80px]">
              Knut Barka
            </h1>
            <p data-reveal className="mt-4 max-w-[640px] text-[21px] leading-snug sm:text-[26px]">
              {t.hero.line1}
            </p>
            <p data-reveal className="mt-2 max-w-[640px] text-[17px] leading-snug text-muted sm:text-[19px]">
              {t.hero.line2}
            </p>
            <p data-reveal className="mt-4 flex items-center gap-1.5 text-[15px] text-muted">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              {t.hero.location}
            </p>
            <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#projects" className="pill pill-primary">
                {t.hero.seeProjects}
              </a>
              <CvButton lang={lang} labels={t.cvDialog} buttonLabel={t.hero.fullCv} available={available} linkedin={links.linkedin} newTabLabel={t.nav.newTab} />
              <ExternalLink
                href={links.linkedin}
                newTabLabel={t.nav.newTab}
                icon={false}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text hover:bg-bg-alt"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
                <span className="sr-only">{t.hero.linkedin}</span>
              </ExternalLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[460px] lg:max-w-none">
            <HeroShots lang={lang} />
          </div>
        </div>
      </section>

      {/* Project strip */}
      <section id="projects" aria-labelledby="projects-title" className="bg-bg-alt">
        <div className="mx-auto max-w-[1080px] px-4 py-16 sm:px-6 md:py-24">
          <h2 id="projects-title" data-reveal className="text-[28px] font-semibold md:text-[32px]">
            {t.projectStrip.heading}
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {projectSlugs.map((slug) => {
              const p = t.projects[slug];
              return (
                <li key={slug} data-reveal>
                  <Link href={`/${lang}/projects/${slug}`} className="card group flex h-full flex-col overflow-hidden p-3">
                    <Shot slug={slug} alt="" sizes="(min-width: 768px) 340px, 92vw" />
                    <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                      <h3 className="text-[21px] font-semibold">{projects[slug].name}</h3>
                      <p className="mt-1 text-[14px] text-muted">
                        {t.projectStrip.forWhom}: {p.forWhom}
                      </p>
                      <p className="mt-3 text-[15px] tabular-nums">{p.cardFinding}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Section id="profile" title={t.profile.heading}>
        {t.profile.text.map((paragraph) => (
          <p key={paragraph} className="max-w-[680px] text-[21px] leading-relaxed">
            {paragraph}
          </p>
        ))}
      </Section>

      <Section id="education" title={t.education.heading} alt>
        <Timeline items={t.education.items} />
      </Section>

      <Section id="experience" title={t.experience.heading}>
        <Timeline items={t.experience.items} />
      </Section>

      <Section id="skills" title={t.skills.heading} alt>
        <Rows rows={t.skills.rows} />
      </Section>

      <Section id="languages" title={t.languages.heading}>
        <Rows rows={t.languages.rows} />
      </Section>

      <Section id="other" title={t.other.heading} alt>
        <ul className="space-y-4">
          {t.other.items.map((item) => (
            <li key={item.name}>
              <span className="font-semibold">{item.name}.</span> {item.text}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="contact" title={t.contact.heading}>
        <p className="text-[21px]">{t.contact.text}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <ExternalLink href={links.linkedin} newTabLabel={t.nav.newTab} className="pill pill-primary">
            LinkedIn
          </ExternalLink>
          <CvButton lang={lang} labels={t.cvDialog} buttonLabel={t.hero.fullCv} available={available} linkedin={links.linkedin} newTabLabel={t.nav.newTab} />
          <p className="text-[15px] text-muted">{t.contact.onRequest}</p>
        </div>
      </Section>
    </>
  );
}
