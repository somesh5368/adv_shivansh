import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group bg-white border border-ivory-dark p-6 flex flex-col justify-between hover:border-gold/60 transition-all duration-300 shadow-subtle hover:shadow-card-hover">
      <div>
        <div className="flex items-center space-x-3 text-[11px] text-charcoal/60 mb-3">
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

        <h3 className="font-serif text-lg font-bold text-navy group-hover:text-gold transition-colors mb-2.5 line-clamp-2 leading-snug">
          <Link href={`/resources/${article.slug}`}>{article.title}</Link>
        </h3>

        <p className="text-xs text-charcoal/70 leading-relaxed mb-6 line-clamp-3">
          {article.excerpt}
        </p>
      </div>

      <div className="pt-4 border-t border-ivory-dark">
        <Link
          href={`/resources/${article.slug}`}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-navy group-hover:text-gold transition-colors"
        >
          <span>Read Explainer</span>
          <ArrowRight size={14} className="ml-1.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
