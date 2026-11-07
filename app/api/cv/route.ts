import { get } from "@vercel/blob";
import { handleCvRequest, type PdfBody } from "@/lib/cv";

// Path of the CV inside the private Blob store (uploaded in Part B).
const BLOB_PATH = "cv/Knut-Barka-CV.pdf";

async function readPdf(): Promise<PdfBody | null> {
  // Local testing only: in `next dev`, CV_DEV_FILE can point to a dummy PDF. Never used in production.
  if (process.env.NODE_ENV === "development" && process.env.CV_DEV_FILE) {
    const { readFile } = await import("node:fs/promises");
    return new Uint8Array(await readFile(process.env.CV_DEV_FILE));
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const result = await get(BLOB_PATH, { access: "private", useCache: false });
    return result?.statusCode === 200 ? result.stream : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  return handleCvRequest(request, { passcode: process.env.CV_PASSCODE, readPdf });
}
