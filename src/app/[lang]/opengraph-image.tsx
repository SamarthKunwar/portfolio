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

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf6ef",
          color: "#241d15",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#b5551f",
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#766857",
            }}
          >
            {t.hero.role}
          </div>
        </div>

        <div
          style={{
            fontSize: 132,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {siteMeta.name}
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#766857" }}>
          {t.location} · {siteMeta.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
