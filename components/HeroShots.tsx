import Link from "next/link";
import { Shot } from "./Shot";
import { projects, type Locale, type ProjectSlug } from "@/lib/site";

// The three dashboards as a layered stack. Each one links to its project page.
// Listed front to back, so Tab reaches the front one first; z-index does the visual stacking.
// Positions are percentages of the box, so the stack scales with the column.
const layers: { slug: ProjectSlug; className: string }[] = [
  { slug: "variance-cockpit", className: "right-[22%] top-[36%] z-20 [animation-delay:350ms]" },
  { slug: "startup-runway", className: "right-[11%] top-[18%] z-10 [animation-delay:250ms]" },
  { slug: "aml-queue", className: "right-0 top-0 z-0 [animation-delay:150ms]" },
];

export function HeroShots({ lang }: { lang: Locale }) {
  return (
    <div className="relative aspect-[5/4] w-full">
      {layers.map(({ slug, className }) => (
        <Link
          key={slug}
          href={`/${lang}/projects/${slug}`}
          aria-label={projects[slug].name}
          className={`hero-shot absolute block w-[78%] rounded-[14px] ${className}`}
        >
          <Shot slug={slug} alt="" sizes="(min-width: 1024px) 400px, 72vw" priority={slug === "variance-cockpit"} />
        </Link>
      ))}
    </div>
  );
}
