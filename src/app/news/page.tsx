import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { MediaFrame } from "@/components/ui/media-frame";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/content/news";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "News & insights",
  description: "Announcements, insights and updates from Midpoint Tech in Midrand.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <Section className="pt-32">
      <Container>
        <Heading as="h1" eyebrow="News & insights">
          Updates from Midpoint Tech
        </Heading>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <article key={article.slug} className="flex flex-col gap-4">
              <Link href={`/news/${article.slug}`}>
                <MediaFrame src={article.coverImage.src} alt={article.coverImage.alt} width={800} height={500} className="aspect-[16/10]" sizes="(min-width:768px) 480px, 100vw" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <Badge tone="sample">Sample article</Badge>
                  <time dateTime={article.publishedAt} className="text-xs text-[var(--color-ink-soft)]">
                    {formatDate(article.publishedAt)}
                  </time>
                </div>
                <h2 className="mt-2 font-[var(--font-display)] text-xl font-medium">
                  <Link href={`/news/${article.slug}`} className="hover:underline">
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
