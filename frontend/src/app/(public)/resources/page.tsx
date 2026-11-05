import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { publicApi } from '@/lib/api';
import { ArticleCard } from '@/components/public/ArticleCard';

export const metadata: Metadata = {
  title: 'Legal Resources & Explainers | Advocate Shivansh Kumar Pandey',
  description:
    'Educational articles, statutory explainers, and legal updates authored for public legal literacy on Civil, Family, and Taxation laws.',
};

interface Props {
  searchParams: { category?: string };
}

export default async function ResourcesPage({ searchParams }: Props) {
  const categoryFilter = searchParams.category;
  const articles = await publicApi.getArticles(categoryFilter).catch(() => []);

  const categories = [
    'All Categories',
    'Civil Litigation',
    'Taxation & GST',
    'Family Law',
    'Business Registration',
  ];

  return (
    <div className="py-16 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-ivory-dark pb-10 space-y-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Knowledge & Updates
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
            Legal Resources & Explainers
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
            Educational articles and practical legal explainers provided to promote public awareness regarding statutory rights, judicial procedures, and compliance best practices.
          </p>
        </div>
      </section>

      {/* Categories Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap gap-2 border-b border-ivory-dark pb-4">
          {categories.map((cat) => {
            const isAll = cat === 'All Categories';
            const isActive = isAll ? !categoryFilter : categoryFilter === cat;
            const href = isAll ? '/resources' : `/resources?category=${encodeURIComponent(cat)}`;

            return (
              <Link
                key={cat}
                href={href}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border ${
                  isActive
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-charcoal/70 border-ivory-dark hover:border-gold hover:text-navy'
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
          <div className="bg-white border border-ivory-dark p-12 text-center space-y-3">
            <h3 className="font-serif text-xl font-bold text-navy">
              No Articles Found
            </h3>
            <p className="text-xs text-charcoal/60">
              There are currently no published articles in this category.
            </p>
            <div className="pt-2">
              <Link
                href="/resources"
                className="text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
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
