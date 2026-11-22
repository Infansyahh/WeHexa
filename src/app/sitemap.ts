import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wehexa.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: base,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
