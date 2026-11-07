import { NextResponse, type NextRequest } from "next/server";
import { pickLocale } from "@/lib/locale";

// Only "/" runs through here: it sends the visitor to /en, /da or /no.
export function proxy(request: NextRequest) {
  const locale = pickLocale(request.headers.get("accept-language"));
  return NextResponse.redirect(new URL(`/${locale}`, request.url), 307);
}

export const config = { matcher: "/" };
