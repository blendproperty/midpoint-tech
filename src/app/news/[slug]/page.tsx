import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { newsArticles, getArticleBySlug } from "@/content/news";
import { formatDate, absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: { title: article.title, description: article.excerpt, url: absoluteUrl(`/news/${article.slug}`), type: "article" },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.publishedAt,
    description: article.excerpt,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section tone="stone" className="pt-14 pb-8">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }, { label: article.title }]} />
          <div className="mt-8 max-w-2xl">
            <p className="tick-label text-brass-600">{article.category} · {formatDate(article.publishedAt)}</p>
            <h1 className="mt-4 text-step-4 font-display font-semibold text-ink-900">{article.title}</h1>
          </div>
        </Container>
      </Section>
      <Section tone="raised" className="pt-0">
        <Container>
          <MediaFrame media={article.cover} className="aspect-[16/9] max-w-4xl" priority />
          <div className="mt-10 max-w-2xl space-y-5 text-lg text-ink-800">
            {article.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
