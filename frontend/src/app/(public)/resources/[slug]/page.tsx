import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publicApi } from '@/lib/api';
import { getArticleBySlug, FIRM_ARTICLES } from '@/lib/articlesData';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, Tag, UserCheck, ShieldAlert, Scale } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return FIRM_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let article = await publicApi.getArticleBySlug(params.slug).catch(() => null);
  if (!article) {
    article = getArticleBySlug(params.slug) || null;
  }
  if (!article) return { title: 'Article Not Found | Justice Alliance Associates' };

  return {
    title: article.meta_title || `${article.title} | Justice Alliance Associates`,
    description: article.meta_description || article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  let article = await publicApi.getArticleBySlug(params.slug).catch(() => null);
  if (!article) {
    article = getArticleBySlug(params.slug) || null;
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="py-16 sm:py-24 space-y-12">
      {/* Article Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <Link
          href="/resources"
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-charcoal/70 hover:text-oxblood transition-colors mb-6"
        >
          <ArrowLeft size={14} className="mr-1.5 text-brass" />
          <span>Back to Legal Resources</span>
        </Link>

        <div className="space-y-4 border-b border-bone-dark pb-8">
          <div className="flex items-center space-x-3 text-xs text-charcoal/60 font-mono">
            <span className="inline-flex items-center text-brass font-bold uppercase tracking-wider">
              <Tag size={12} className="mr-1 text-brass" />
              {article.category}
            </span>
            <span>&bull;</span>
            <span className="inline-flex items-center text-charcoal/70">
              <Calendar size={12} className="mr-1" />
              {formatDate(article.published_at || article.created_at)}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-oxblood leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-charcoal/80 italic leading-relaxed border-l-3 border-brass pl-4 py-1">
            {article.excerpt}
          </p>

          <div className="flex items-center space-x-2 pt-2 text-xs text-charcoal/70 font-mono">
            <UserCheck size={14} className="text-brass" />
            <span>Authored by <strong>Justice Alliance Associates & Law Firm</strong></span>
          </div>
        </div>
      </section>

      {/* Article Body Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div
          className="prose max-w-none text-xs sm:text-sm text-charcoal/85 leading-relaxed space-y-6 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-oxblood [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:font-serif [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-oxblood [&>h3]:mt-6 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Disclaimer Notice */}
        <div className="mt-14 p-6 bg-white border-l-4 border-brass shadow-subtle flex items-start space-x-3 text-xs text-charcoal/75 rounded-xs">
          <ShieldAlert size={22} className="text-brass shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <strong className="text-oxblood block">Educational Purpose Disclaimer:</strong>
            The commentary, statutory analysis, and procedural insights contained in this article are provided solely for general legal literacy and informational edification. They do not constitute formal legal counsel and must not be treated as a substitute for professional legal advice tailored to specific dispute proceedings.
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-oxblood text-brass text-xs uppercase tracking-wider font-bold hover:bg-wine transition-colors border border-brass rounded-xs shadow-md"
          >
            Schedule Chamber Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
