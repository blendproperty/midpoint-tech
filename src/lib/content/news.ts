import { articlesCollectionSchema, type Article } from "./news.schema";

/**
 * SAMPLE DATA — placeholder news/insight content. Replace with real
 * announcements before launch. No events, tenants or programmes are named
 * here beyond generic, non-committal placeholders.
 */
const rawArticles: Article[] = [
  {
    slug: "welcome-to-midpoint-tech",
    sample: true,
    title: "Introducing Midpoint Tech at 300 Janadel Avenue",
    excerpt:
      "A new technology-focused destination is taking shape in Midrand, built for startups, scale-ups and established technology teams.",
    body: [
      "Midpoint Tech is a new addition to the Midpoint portfolio, focused specifically on the needs of technology businesses in Midrand. Located at 300 Janadel Avenue, Halfway House, the destination is being developed for companies that need a credible, connected base between Johannesburg and Pretoria.",
      "Further detail on availability, specification and the community programme will be published here as it is confirmed. In the meantime, prospective tenants and brokers are welcome to enquire directly with the leasing team.",
    ],
    category: "announcement",
    publishedAt: "2026-06-01",
    coverImage: { src: "/images/news/placeholder-announcement-1.svg", alt: "Placeholder cover image for the Midpoint Tech introduction article" },
  },
  {
    slug: "what-technology-teams-look-for-in-a-workspace",
    sample: true,
    title: "What technology teams actually look for in a workspace",
    excerpt:
      "Beyond desks and Wi-Fi: the practical, cultural and operational factors that shape where growing technology companies choose to work.",
    body: [
      "Technology teams weighing up a move increasingly ask about more than square metreage and rental rate. Questions about backup power, connectivity, security, flexibility and the surrounding business community all factor into the decision.",
      "This piece will be expanded with Midpoint Tech-specific detail once building specifications and infrastructure information have been confirmed by the project team.",
    ],
    category: "insight",
    publishedAt: "2026-06-15",
    coverImage: { src: "/images/news/placeholder-insight-1.svg", alt: "Placeholder cover image for the technology workspace insight article" },
  },
];

export const articles: Article[] = articlesCollectionSchema.parse(rawArticles);

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
