import { ImageResponse } from "next/og";
import { ogSize, shotDataUrl } from "@/lib/og";
import { locales, projects, projectSlugs, type ProjectSlug } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Project screenshot";
export const generateStaticParams = () => locales.flatMap((lang) => projectSlugs.map((slug) => ({ lang, slug })));

// Project preview: name over the dashboard screenshot.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = projects[slug as ProjectSlug];
  const src = await shotDataUrl(slug as ProjectSlug);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "#f5f5f7", paddingTop: 56 }}>
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2, color: "#1d1d1f" }}>{meta.name}</div>
        <div style={{ fontSize: 28, color: meta.accent.light, marginTop: 6 }}>Knut Barka</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={880} height={550} alt="" style={{ marginTop: 36, borderRadius: 16, border: "1px solid #d2d2d7" }} />
      </div>
    ),
    size,
  );
}
