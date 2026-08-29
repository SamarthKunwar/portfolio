import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Inter_Tight } from "next/font/google";
import { getDict, isLocale, locales, siteMeta } from "@/lib/content";
import "../globals.css";

const display = Inter_Tight({
  variable: "--font-display-src",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const body = Inter({
  variable: "--font-sans-src",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    metadataBase: new URL(siteMeta.url),
    title: { default: t.meta.title, template: `%s · ${siteMeta.name}` },
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", de: "/de" },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `${siteMeta.url}/${lang}`,
      siteName: siteMeta.name,
      locale: lang === "de" ? "de_DE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
