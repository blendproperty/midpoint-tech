import { newsArticleSchema, type NewsArticle } from "./schema";

/** SAMPLE DATA — replace with real announcements before launch. */
const raw: NewsArticle[] = [
  {
    slug: "midpoint-tech-announced",
    title: "Introducing Midpoint Tech, a new technology campus in Midrand",
    category: "announcement",
    publishedAt: "2026-06-02",
    excerpt:
      "Midpoint Tech opens a dedicated environment for technology businesses at 300 Janadel Avenue, extending the Midpoint commercial portfolio.",
    body: [
      "Midpoint Tech has been created as a distinct environment within the broader Midpoint commercial portfolio, built specifically around the needs of technology businesses, from early-stage startups to established engineering teams.",
      "The campus sits at 300 Janadel Avenue, Halfway House, Midrand — a position on the business corridor between Johannesburg and Pretoria.",
      "Full leasing information, available spaces and a tour booking form are live on this site now.",
    ],
    cover: { src: "https://images.unsplash.com/photo-1602578984228-c98a9b995f3e?auto=format&fit=crop&w=1600&q=80", alt: "Illustrative stock photo of a city skyline under a blue sky" },
    isSample: true,
  },
  {
    slug: "why-technology-teams-choose-midrand",
    title: "Why technology teams are choosing Midrand",
    category: "insight",
    publishedAt: "2026-07-14",
    excerpt:
      "A look at the practical reasons operations leaders are shortlisting Midrand for their next office move.",
    body: [
      "Midrand's position between Johannesburg and Pretoria continues to make it a practical base for teams that need to serve both metros without committing to either.",
      "This piece will be replaced with a verified, sourced article ahead of launch — treat the current text as a placeholder.",
    ],
    cover: { src: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?auto=format&fit=crop&w=1600&q=80", alt: "Illustrative aerial stock photo of an urban city skyline during daytime" },
    isSample: true,
  },
];

export const newsArticles: NewsArticle[] = raw.map((a) => newsArticleSchema.parse(a));

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
