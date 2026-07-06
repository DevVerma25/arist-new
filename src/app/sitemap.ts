import type { MetadataRoute } from "next";

const siteUrl =
  process.env.SITE_URL?.trim() ||
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "http://localhost:3000";

const routes = ["/", "/library", "/telvas"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = new URL(siteUrl);

  return routes.map((path) => ({
    url: new URL(path, baseUrl).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
