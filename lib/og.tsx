import { readFile } from "node:fs/promises";
import path from "node:path";
import { screenshot, type ProjectSlug } from "./site";

export const ogSize = { width: 1200, height: 630 };

// Screenshots as data URLs, because the image renderer cannot fetch files by path.
export async function shotDataUrl(slug: ProjectSlug) {
  const file = await readFile(path.join(process.cwd(), "public", screenshot(slug, "light")));
  return `data:image/png;base64,${file.toString("base64")}`;
}
