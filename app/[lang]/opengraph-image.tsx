import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { ogSize, shotDataUrl } from "@/lib/og";
import { locales, projectSlugs, type Locale } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Knut Barka";
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

// Start page preview: name, one line, and the three project screenshots.
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getContent(lang as Locale);
  const shots = await Promise.all(projectSlugs.map(shotDataUrl));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#ffffff", padding: "72px 72px 0" }}>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, color: "#1d1d1f" }}>Knut Barka</div>
        <div style={{ fontSize: 36, color: "#6e6e73", marginTop: 12 }}>{t.hero.tagline}</div>
        <div style={{ display: "flex", gap: 24, marginTop: "auto" }}>
          {shots.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src.slice(-32)} src={src} width={336} height={210} alt="" style={{ flexShrink: 0, borderRadius: "12px 12px 0 0", border: "1px solid #d2d2d7", borderBottom: "none" }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
