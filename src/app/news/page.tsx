import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { newsArticles } from "@/content/news";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News & insights",
  description: "Announcements, insights and events from Midpoint Tech in Midrand.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <Section tone="stone" className="pt-14">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News" }]} />
        <div className="mt-8 max-w-2xl">
          <Eyebrow>News</Eyebrow>
          <h1 className="mt-4 text-step-4 font-display font-semibold text-ink-900">News and insights</h1>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="group flex flex-col border border-ink-900/12 bg-white">
              <MediaFrame media={article.cover} className="aspect-[16/10]" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
              <div className="flex flex-1 flex-col gap-2 p-6">
                <p className="tick-label text-brass-600">{article.category}</p>
                <h2 className="font-display text-lg font-semibold text-ink-900 group-hover:text-teal-600">{article.title}</h2>
                <p className="text-sm text-ink-700">{article.excerpt}</p>
                <p className="mt-auto pt-3 text-xs text-ink-600">{formatDate(article.publishedAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
