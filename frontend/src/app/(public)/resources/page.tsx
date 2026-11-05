import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { publicApi } from '@/lib/api';
import { ArticleCard } from '@/components/public/ArticleCard';
import { FIRM_ARTICLES } from '@/lib/articlesData';
import { Article } from '@/types';
import { Scale, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Legal Resources & Explainers | Justice Alliance Associates & Law Firm',
  description:
    'Educational legal articles, procedural explainers, and statutory updates authored for public literacy across Criminal, Cyber, Family, Civil, and Taxation laws.',
};

interface Props {
  searchParams: { category?: string };
}

export default async function ResourcesPage({ searchParams }: Props) {
  const categoryFilter = searchParams.category;

  // Fetch backend articles, fallback to curated FIRM_ARTICLES
  let articles: Article[] = [];
  try {
    const backendArticles = await publicApi.getArticles(categoryFilter).catch(() => []);
    if (backendArticles && backendArticles.length > 0) {
      articles = backendArticles;
    } else {
      articles = FIRM_ARTICLES;
      if (categoryFilter && categoryFilter !== 'All Categories') {
        articles = articles.filter(
          (a) => a.category.toLowerCase() === categoryFilter.toLowerCase()
        );
      }
    }
  } catch {
    articles = FIRM_ARTICLES;
    if (categoryFilter && categoryFilter !== 'All Categories') {
      articles = articles.filter(
        (a) => a.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
  }

  const categories = [
    'All Categories',
    'Criminal Law',
    'Cyber Law',
    'Family Law',
    'Civil Litigation',
    'Taxation & GST',
  ];

  return (
    <div className="py-16 sm:py-24 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-bone-dark pb-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 border border-brass/40 text-oxblood text-xs font-mono uppercase tracking-editorial rounded-xs">
            <BookOpen size={12} className="text-brass" />
            <span>Legal Literacy & Insights</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-oxblood">
            Legal Resources & Explainers
          </h1>

          <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-normal">
            Statutory commentaries, procedural checklists, and practical legal explainers published by <strong>Justice Alliance Associates & Law Firm</strong> to promote informed understanding of statutory rights and judicial processes.
          </p>
        </div>
      </section>

      {/* Categories Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap gap-2.5 border-b border-bone-dark pb-6">
          {categories.map((cat) => {
            const isAll = cat === 'All Categories';
            const isActive = isAll ? !categoryFilter : categoryFilter === cat;
            const href = isAll ? '/resources' : `/resources?category=${encodeURIComponent(cat)}`;

            return (
              <Link
                key={cat}
                href={href}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all border rounded-xs ${
                  isActive
                    ? 'bg-oxblood text-brass border-brass shadow-sm'
                    : 'bg-white text-charcoal/70 border-bone-dark hover:border-brass hover:text-oxblood'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-bone-dark p-12 text-center space-y-3 rounded-xs">
            <h3 className="font-serif text-xl font-bold text-oxblood">
              No Articles Found
            </h3>
            <p className="text-xs text-charcoal/60">
              There are currently no published articles in this category.
            </p>
            <div className="pt-2">
              <Link
                href="/resources"
                className="text-xs font-bold uppercase tracking-wider text-brass hover:underline"
              >
                View All Categories
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
