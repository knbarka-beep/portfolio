// The CV passcode check, kept free of Next.js and Blob imports so tests can run it with a fake PDF.
import { createHash, timingSafeEqual } from "node:crypto";

export type PdfBody = ReadableStream<Uint8Array> | Uint8Array;
export type CvLang = "en" | "da" | "no";

const cvLangs: readonly string[] = ["en", "da", "no"];
export const toCvLang = (value: unknown): CvLang =>
  typeof value === "string" && cvLangs.includes(value) ? (value as CvLang) : "en";

type Options = {
  passcode: string | undefined;
  readPdf: (lang: CvLang) => Promise<PdfBody | null>;
  wrongCodeDelayMs?: number;
};

const baseHeaders = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

const text = (body: string, status: number) =>
  new Response(body, { status, headers: { ...baseHeaders, "Content-Type": "text/plain; charset=utf-8" } });

// Hash both sides first, so the compare always runs on two 32-byte values and takes the same time
// whether the code is right, wrong, short or long.
export function codesMatch(given: string, expected: string): boolean {
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function handleCvRequest(request: Request, options: Options): Promise<Response> {
  const { passcode, readPdf, wrongCodeDelayMs = 1000 } = options;
  if (!passcode) return text("The full CV is available on request.", 503);

  let code = "";
  let lang: CvLang = "en";
  let checkOnly = false;
  try {
    const body = (await request.json()) as { code?: unknown; lang?: unknown; check?: unknown };
    if (typeof body.code === "string" && body.code.length <= 200) code = body.code;
    lang = toCvLang(body.lang);
    checkOnly = body.check === true;
  } catch {
    // A body that is not JSON counts as a wrong code.
  }

  if (!code || !codesMatch(code, passcode)) {
    await new Promise((resolve) => setTimeout(resolve, wrongCodeDelayMs));
    return text("Wrong code", 401);
  }

  // The dialog first checks the code alone, then shows one download button per language.
  if (checkOnly) return new Response(null, { status: 204, headers: baseHeaders });

  // If the chosen language is missing, serve the English CV.
  let pdf = await readPdf(lang);
  if (!pdf && lang !== "en") {
    lang = "en";
    pdf = await readPdf(lang);
  }
  if (!pdf) return text("The full CV is available on request.", 503);

  return new Response(pdf as BodyInit, {
    status: 200,
    headers: {
      ...baseHeaders,
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Knut-Barka-CV-${lang.toUpperCase()}.pdf"`,
    },
  });
}
