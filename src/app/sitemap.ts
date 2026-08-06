import type { MetadataRoute } from "next";
import { spaces } from "@/content/spaces";
import { newsArticles } from "@/content/news";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/spaces",
    "/experience",
    "/location",
    "/community",
    "/news",
    "/contact",
    "/privacy",
    "/terms",
    "/paia",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const spaceRoutes = spaces.map((s) => ({
    url: absoluteUrl(`/spaces/${s.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const newsRoutes = newsArticles.map((a) => ({
    url: absoluteUrl(`/news/${a.slug}`),
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...spaceRoutes, ...newsRoutes];
}
