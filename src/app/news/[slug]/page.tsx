import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { MediaFrame } from "@/components/ui/media-frame";
import { RichText } from "@/components/ui/rich-text";
import { articles, getArticleBySlug } from "@/lib/content/news";
import { formatDate } from "@/lib/utils";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({ title: article.title, description: article.excerpt, path: `/news/${article.slug}` });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleJsonLd({ title: article.title, description: article.excerpt, path: `/news/${article.slug}`, publishedAt: article.publishedAt, image: article.coverImage.src }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "News", path: "/news" },
              { name: article.title, path: `/news/${article.slug}` },
            ]),
          ]),
        }}
      />
      <Section className="pt-32">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }, { label: article.title }]} />
          <p className="mt-6 text-xs text-[var(--color-ink-soft)]">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </p>
          <Heading as="h1" className="mt-2">{article.title}</Heading>
          <div className="mt-8">
            <MediaFrame src={article.coverImage.src} alt={article.coverImage.alt} width={1200} height={750} className="aspect-[16/10]" sizes="(min-width:768px) 768px, 100vw" priority />
          </div>
          <div className="mt-8">
            <RichText paragraphs={article.body} />
          </div>
        </Container>
      </Section>
    </>
  );
}
