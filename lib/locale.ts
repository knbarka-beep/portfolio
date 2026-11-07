// Picks the start language from the browser's Accept-Language header.
// Danish gives /da, any Norwegian (nb, nn, no) gives /no, everything else /en.

export function pickLocale(acceptLanguage: string | null): "en" | "da" | "no" {
  if (!acceptLanguage) return "en";
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { base: tag.split("-")[0], q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((item) => item.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { base } of ranked) {
    if (base === "da") return "da";
    if (base === "nb" || base === "nn" || base === "no") return "no";
    if (base === "en") return "en";
  }
  return "en";
}
