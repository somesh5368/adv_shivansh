import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publicApi } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, Tag, UserCheck, ShieldAlert } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await publicApi.getArticleBySlug(params.slug).catch(() => null);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.meta_title || `${article.title} | Legal Resources`,
    description: article.meta_description || article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const article = await publicApi.getArticleBySlug(params.slug).catch(() => null);

  if (!article) {
    notFound();
  }

  return (
    <div className="py-16 space-y-12">
      {/* Article Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <Link
          href="/resources"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-charcoal/70 hover:text-navy transition-colors mb-6"
        >
          <ArrowLeft size={14} className="mr-1.5" />
          <span>Back to Legal Resources</span>
        </Link>

        <div className="space-y-4 border-b border-ivory-dark pb-8">
          <div className="flex items-center space-x-3 text-xs text-charcoal/60">
            <span className="inline-flex items-center text-gold font-medium uppercase tracking-wider">
              <Tag size={12} className="mr-1" />
              {article.category}
            </span>
            <span>•</span>
            <span className="inline-flex items-center">
              <Calendar size={12} className="mr-1" />
              {formatDate(article.published_at || article.created_at)}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-navy leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-charcoal/75 italic leading-relaxed border-l-2 border-gold pl-4 py-1">
            {article.excerpt}
          </p>

          <div className="flex items-center space-x-2 pt-2 text-xs text-charcoal/70">
            <UserCheck size={14} className="text-gold" />
            <span>Authored by <strong>Advocate Shivansh Kumar Pandey</strong></span>
          </div>
        </div>
      </section>

      {/* Article Body Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div
          className="prose prose-navy max-w-none text-xs sm:text-sm text-charcoal/85 leading-relaxed space-y-6 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-navy [&>h2]:mt-8 [&>h2]:mb-3 [&>h3]:font-serif [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-navy [&>h3]:mt-6 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Disclaimer Notice */}
        <div className="mt-14 p-6 bg-white border-l-4 border-gold shadow-subtle flex items-start space-x-3 text-xs text-charcoal/75">
          <ShieldAlert size={20} className="text-gold shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <strong className="text-navy block">Educational Purpose Disclaimer:</strong>
            The analysis and statutory commentary contained in this article are intended solely for general legal literacy and informational edification. They do not constitute formal legal counsel and should not be relied upon as a substitute for professional legal consultation concerning specific facts or proceedings.
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-navy text-white text-xs uppercase tracking-wider font-semibold hover:bg-navy-800 transition-colors"
          >
            Chamber Inquiries
          </Link>
        </div>
      </section>
    </div>
  );
}
