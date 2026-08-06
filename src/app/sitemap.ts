import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content/site";
import { spaces } from "@/lib/content/spaces";
import { articles } from "@/lib/content/news";

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
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const spaceRoutes = spaces.map((space) => ({
    url: `${siteConfig.url}/spaces/${space.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${siteConfig.url}/news/${article.slug}`,
    lastModified: new Date(article.publishedAt),
  }));

  return [...staticRoutes, ...spaceRoutes, ...articleRoutes];
}
