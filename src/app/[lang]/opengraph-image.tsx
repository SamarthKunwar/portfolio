import { ImageResponse } from "next/og";
import { getDict, isLocale, locales, siteMeta } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteMeta.name} — portfolio`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getDict(isLocale(lang) ? lang : "en");
  const headline = t.hero.headline.replace(/­/g, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#0e0e0e",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#2563eb" }} />
          {siteMeta.name}
        </div>

        <div
          style={{
            fontSize: 92,
            fontWeight: 600,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            maxWidth: 980,
          }}
        >
          {headline}
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#6b6b6b" }}>
          {t.location} · {siteMeta.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
