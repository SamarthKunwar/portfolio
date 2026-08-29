import type { MetadataRoute } from "next";
import { locales, projectMeta, siteMeta } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homes = locales.map((lang) => ({
    url: `${siteMeta.url}/${lang}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteMeta.url}/${l}`]),
      ),
    },
  }));

  const projects = locales.flatMap((lang) =>
    projectMeta.map((p) => ({
      url: `${siteMeta.url}/${lang}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [...homes, ...projects];
}
