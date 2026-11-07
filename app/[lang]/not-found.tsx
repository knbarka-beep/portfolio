"use client";

import { useParams } from "next/navigation";
import { getContent } from "@/content";
import { NotFoundBody } from "@/components/NotFoundBody";
import { isLocale } from "@/lib/site";

// Shown for unknown project pages inside a language, for example /da/projects/nothing.
export default function NotFound() {
  const params = useParams<{ lang: string }>();
  const lang = isLocale(params.lang) ? params.lang : "en";
  const t = getContent(lang).notFound;
  return <NotFoundBody title={t.title} text={t.text} back={t.back} href={`/${lang}`} />;
}
