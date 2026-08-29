import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/content";

/** Paths that must never be locale-prefixed (metadata routes, well-known files). */
const RESERVED = [
  "/icon",
  "/apple-icon",
  "/opengraph-image",
  "/twitter-image",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
];

function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const tag of preferred) {
    const base = tag.split("-")[0];
    if ((locales as readonly string[]).includes(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (RESERVED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, files with an extension, and metadata routes.
  matcher: [
    "/((?!_next/|icon|apple-icon|opengraph-image|twitter-image|.*\\.).*)",
  ],
};
