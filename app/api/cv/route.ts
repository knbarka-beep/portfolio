import { get } from "@vercel/blob";
import { handleCvRequest, type CvLang, type PdfBody } from "@/lib/cv";

// Path of each CV inside the private Blob store, for example cv/Knut-Barka-CV-DA.pdf.
const blobPath = (lang: CvLang) => `cv/Knut-Barka-CV-${lang.toUpperCase()}.pdf`;

async function readPdf(lang: CvLang): Promise<PdfBody | null> {
  // Local testing only: in `next dev`, read private/cv-<lang>.pdf. Never used in production,
  // and next.config.ts keeps private/ out of the build trace.
  if (process.env.NODE_ENV === "development") {
    const { readFile } = await import("node:fs/promises");
    try {
      return new Uint8Array(await readFile(`${process.cwd()}/private/cv-${lang}.pdf`));
    } catch {
      return null;
    }
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const result = await get(blobPath(lang), { access: "private", useCache: false });
    return result?.statusCode === 200 ? result.stream : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  return handleCvRequest(request, { passcode: process.env.CV_PASSCODE, readPdf });
}
