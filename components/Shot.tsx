import Image from "next/image";
import { screenshot, screenshotSize, type ProjectSlug } from "@/lib/site";

type Props = { slug: ProjectSlug; alt: string; priority?: boolean; sizes: string };

// A dashboard screenshot in a rounded frame. Both themes are in the HTML; CSS shows the one that matches.
export function Shot({ slug, alt, priority = false, sizes }: Props) {
  return (
    <div className="shot">
      <Image
        className="shot-light"
        src={screenshot(slug, "light")}
        alt={alt}
        {...screenshotSize}
        sizes={sizes}
        priority={priority}
      />
      <Image className="shot-dark" src={screenshot(slug, "dark")} alt={alt} {...screenshotSize} sizes={sizes} />
    </div>
  );
}
