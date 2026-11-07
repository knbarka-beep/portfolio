import type { Metadata } from "next";
import { getContent } from "@/content";
import { ExternalLink } from "@/components/ExternalLink";
import { alternates, ogLocale } from "@/lib/meta";
import { isLocale, links, type Locale } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  const t = getContent(lang as Locale);
  const title = `${t.privacy.title}: ${t.meta.projectTitleSuffix}`;
  return {
    title,
    description: t.privacy.description,
    alternates: alternates(lang as Locale, "/privacy"),
    openGraph: { title, description: t.privacy.description, url: `/${lang}/privacy`, locale: ogLocale[lang as Locale] },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = getContent(lang);

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-16 sm:px-6 md:py-24">
      <h1 className="text-[40px] font-semibold md:text-[52px]">{t.privacy.title}</h1>
      <ul className="mt-8 max-w-[680px] list-disc space-y-3 pl-5 text-[19px] leading-relaxed">
        {t.privacy.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <p className="mt-8 max-w-[680px] text-[19px]">
        {t.privacy.contact}{" "}
        <ExternalLink href={links.linkedin} newTabLabel={t.nav.newTab} className="inline-flex items-center gap-1 text-link hover:underline">
          LinkedIn
        </ExternalLink>
        .
      </p>
    </div>
  );
}
